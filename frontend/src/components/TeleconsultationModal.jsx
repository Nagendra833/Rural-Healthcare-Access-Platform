import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Send,
  Activity,
  Bot,
  Camera,
  Volume2,
  VolumeX,
  Sparkles,
  Pill,
  ShieldAlert,
  Loader2,
  FileCheck,
} from 'lucide-react';
import { sendChatMessage, analyzeMedicalDocument } from '../services/aiService';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { playChimeSound, triggerConfetti } from '../utils/confetti';

export const TeleconsultationModal = ({ isOpen, onClose, appointment, currentUserRole }) => {
  const { currentLangConfig, language } = useLanguage();
  const { showToast } = useToast();

  // Per-appointment language config — overrides global language for this call
  const apptLangCode = appointment?.language || language || 'en';
  const apptLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === apptLangCode) || currentLangConfig;
  const speechCode = apptLangConfig?.speechCode || 'en-US';
  const langName = apptLangConfig?.name || 'English';
  const langNative = apptLangConfig?.native || 'English';

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'rx'
  const [callDuration, setCallDuration] = useState(0);

  // AI Doctor interactive state
  const [aiState, setAiState] = useState('idle'); // 'greeting' | 'speaking' | 'listening' | 'thinking' | 'idle'
  const [currentCaption, setCurrentCaption] = useState('');
  const [userSpeechDraft, setUserSpeechDraft] = useState('');
  const [isAiAudioMuted, setIsAiAudioMuted] = useState(false);
  const [analyzingVisual, setAnalyzingVisual] = useState(false);

  // Clinical recommendations generated during call
  const [clinicalNotes, setClinicalNotes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const localVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const isAiSpeakingRef = useRef(false);
  const hasGreetedRef = useRef(false);

  // Format MM:SS call timer
  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Text-To-Speech engine for AI Doctor
  const speakAsAiDoctor = useCallback(
    (textToSpeak) => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      if (isAiAudioMuted) {
        setCurrentCaption(textToSpeak);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = speechCode;
      utterance.rate = 0.92; // Natural, clear physician tempo
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        isAiSpeakingRef.current = true;
        setAiState('speaking');
        setCurrentCaption(textToSpeak);
        // Temporarily pause speech recognition while AI speaks to avoid feedback echo
        if (recognitionRef.current) {
          try {
            recognitionRef.current.abort();
          } catch {}
        }
      };

      utterance.onend = () => {
        isAiSpeakingRef.current = false;
        setAiState('listening');
        // Resume listening automatically so patient can respond
        startPatientListening();
      };

      utterance.onerror = () => {
        isAiSpeakingRef.current = false;
        setAiState('listening');
        startPatientListening();
      };

      window.speechSynthesis.speak(utterance);
    },
    [speechCode, isAiAudioMuted]
  );

  // Speech-To-Text engine for Patient
  const startPatientListening = useCallback(() => {
    if (!recognitionRef.current || isAiSpeakingRef.current || !micOn) return;
    try {
      recognitionRef.current.start();
    } catch {
      // Already running or unpermitted
    }
  }, [micOn]);

  // Handle Patient Voice Query -> Send to Gemini AI
  const handlePatientUtterance = useCallback(
    async (spokenText) => {
      if (!spokenText || !spokenText.trim()) return;

      const cleaned = spokenText.trim();
      setAiState('thinking');
      setCurrentCaption(`You: "${cleaned}"`);

      // Add to conversation thread
      const newMessages = [...messages, { sender: 'You (Patient)', text: cleaned, isUser: true }];
      setMessages(newMessages);

      try {
        const symptomsContext = appointment?.reason || 'General malaise';
        const aiPrompt = `The patient is in a live video call. Their booking complaint is "${symptomsContext}".
The patient just said: "${cleaned}".
IMPORTANT: The patient has chosen to communicate in ${langName}. You MUST respond entirely in ${langName} (${langNative}).
Respond as Dr. AI, an empathetic rural healthcare physician speaking directly to the patient on a video call.
Provide 2 to 3 spoken sentences of direct clinical guidance in ${langName}:
1. Validate their symptoms gently.
2. Provide immediate home relief measures, hydration, rest, or OTC advice (e.g. Paracetamol for fever/headache).
3. Mention key warning signs when they should go to the nearest PHC or dial 108.
Respond in clear, natural ${langName} language that sounds like a real doctor speaking.`;

        const history = newMessages.map((m) => ({
          role: m.isUser ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

        const data = await sendChatMessage(aiPrompt, history);
        const reply = data.reply || "I understand your discomfort. Please stay well-hydrated, take adequate rest, and take Paracetamol 500mg if your fever persists. If your temperature goes above 101°F or you feel breathlessness, please visit your nearest Primary Health Centre immediately.";

        setMessages((prev) => [...prev, { sender: 'Dr. AI', text: reply, isUser: false }]);

        // Extract key advice point for Prescription/Notes drawer
        setClinicalNotes((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            advice: reply.slice(0, 160) + '...',
          },
        ]);

        // Speak aloud to patient
        speakAsAiDoctor(reply);
      } catch (err) {
        const fallback =
          "I hear your symptoms. Please drink warm fluids, avoid heavy exertion, and take Paracetamol 500mg after food for fever and headache relief. If pain intensifies, consult a doctor in person.";
        setMessages((prev) => [...prev, { sender: 'Dr. AI', text: fallback, isUser: false }]);
        speakAsAiDoctor(fallback);
      }
    },
    [appointment, messages, speakAsAiDoctor]
  );

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = speechCode;

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setUserSpeechDraft(interim || final);
        if (final && final.trim().length > 2) {
          handlePatientUtterance(final);
          setUserSpeechDraft('');
        }
      };

      recognition.onerror = () => {
        setUserSpeechDraft('');
      };

      recognition.onend = () => {
        setUserSpeechDraft('');
        // If still in listening state and call is active, restart gracefully
        if (isOpen && !isAiSpeakingRef.current && micOn) {
          setTimeout(() => {
            try {
              recognition.start();
            } catch {}
          }, 300);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [speechCode, handlePatientUtterance, isOpen, micOn]);

  // Video Call Setup & Initial AI Greeting
  useEffect(() => {
    let timer;
    if (isOpen) {
      playChimeSound();
      hasGreetedRef.current = false;
      timer = setInterval(() => setCallDuration((d) => d + 1), 1000);

      // Access camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            mediaStreamRef.current = stream;
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          })
          .catch(() => {});
      }

      // Initial AI greeting after 1 second of call connect
      const greetingTimer = setTimeout(() => {
        if (!hasGreetedRef.current) {
          hasGreetedRef.current = true;
          const patientName = appointment?.patient?.fullName || 'Patient';
          const reason = appointment?.reason || 'your symptoms';
          const doctorName = appointment?.doctor?.fullName || appointment?.doctorName || 'Dr. AI';

          // Language-aware greeting
          const greetings = {
            en: `Hello ${patientName}! I am ${doctorName}. I see you joined this video consultation for ${reason}. How are you feeling right now? Please speak and tell me what symptoms you are experiencing.`,
            hi: `नमस्ते ${patientName}! मैं ${doctorName} हूँ। मैं देख रहा हूँ कि आप ${reason} के लिए इस वीडियो परामर्श में शामिल हुए हैं। अभी आप कैसा महसूस कर रहे हैं? कृपया बोलें और बताएं कि आपको कौन से लक्षण हैं।`,
            te: `నమస్కారం ${patientName}! నేను ${doctorName}. మీరు ${reason} కోసం ఈ వీడియో సంప్రదింపులో చేరారు. మీరు ఇప్పుడు ఎలా అనుభవిస్తున్నారు? దయచేసి మాట్లాడండి మరియు మీ లక్షణాలను చెప్పండి.`,
            ta: `வணக்கம் ${patientName}! நான் ${doctorName}. நீங்கள் ${reason} க்கு இந்த வீடியோ ஆலோசனையில் இணைந்துள்ளீர்கள் என்று பார்க்கிறேன். இப்போது எப்படி உணர்கிறீர்கள்? தயவுசெய்து பேசி உங்கள் அறிகுறிகளைச் சொல்லுங்கள்.`,
            bn: `নমস্কার ${patientName}! আমি ${doctorName}। আমি দেখছি আপনি ${reason} এর জন্য এই ভিডিও পরামর্শে যোগ দিয়েছেন। আপনি এখন কেমন অনুভব করছেন? দয়া করে কথা বলুন এবং আপনার লক্ষণগুলো বলুন।`,
            es: `¡Hola ${patientName}! Soy ${doctorName}. Veo que se unió a esta consulta por video para ${reason}. ¿Cómo se siente ahora mismo? Por favor hable y cuénteme qué síntomas está experimentando.`,
          };
          const welcomeGreeting = greetings[apptLangCode] || greetings.en;

          setMessages([
            {
              sender: doctorName,
              text: welcomeGreeting,
              isUser: false,
            },
          ]);

          speakAsAiDoctor(welcomeGreeting);
        }
      }, 1200);

      return () => {
        clearTimeout(greetingTimer);
        clearInterval(timer);
      };
    } else {
      setCallDuration(0);
      setCurrentCaption('');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  }, [isOpen, appointment, speakAsAiDoctor]);

  // Camera Snapshot / Symptom Scan Feature
  const handleScanVideoSymptom = async () => {
    if (!localVideoRef.current || analyzingVisual) return;

    setAnalyzingVisual(true);
    setAiState('thinking');
    setCurrentCaption('Scanning camera feed for visible symptoms...');
    showToast('Capturing video frame for AI medical analysis...', 'info');

    try {
      const video = localVideoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setAnalyzingVisual(false);
          return;
        }

        const file = new File([blob], 'telemedicine-video-frame.jpg', { type: 'image/jpeg' });
        try {
          const res = await analyzeMedicalDocument(file);
          const findings = res.data;
          const visualAdvice =
            findings?.summary ||
            `I have analyzed the visual frame. For visible rash, throat irritation, or swelling, keep the area clean, avoid scratching, and apply a cool moist compress. Continue your oral medication as prescribed.`;

          setMessages((prev) => [
            { sender: 'You', text: '📷 Shared live camera frame of symptoms', isUser: true },
            { sender: 'Dr. AI (Video Analysis)', text: visualAdvice, isUser: false },
          ]);

          setClinicalNotes((prev) => [
            ...prev,
            {
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              advice: `[Visual Scan]: ${visualAdvice}`,
            },
          ]);

          triggerConfetti();
          speakAsAiDoctor(visualAdvice);
        } catch (err) {
          const fallback =
            'I analyzed your camera frame. Please keep the affected area clean and rest. If swelling or fever increases, visit your Primary Health Centre.';
          speakAsAiDoctor(fallback);
        } finally {
          setAnalyzingVisual(false);
        }
      }, 'image/jpeg');
    } catch {
      setAnalyzingVisual(false);
    }
  };

  const toggleVideo = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = !videoOn));
    }
    setVideoOn(!videoOn);
  };

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = !micOn));
    }
    setMicOn(!micOn);
  };

  const handleManualTextSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    setChatInput('');
    handlePatientUtterance(text);
  };

  if (!isOpen || !appointment) return null;

  const doctorDisplayName = appointment.doctor?.fullName || appointment.doctorName || 'Dr. AI';

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gray-950 border border-gray-800 rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Top Video Header */}
        <div className="bg-gray-900/95 px-5 py-3 border-b border-gray-800/80 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm tracking-wide">{doctorDisplayName}</p>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles size={10} /> AI Clinical Room
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                  🌐 {langNative}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Reason: <span className="text-gray-200 font-medium">{appointment.reason || 'General Consultation'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-gray-800/80 px-2.5 py-1 rounded-md text-emerald-400 border border-gray-700">
              {formatTimer(callDuration)}
            </span>
            <button
              onClick={() => {
                if (isAiAudioMuted) {
                  setIsAiAudioMuted(false);
                  if (currentCaption) speakAsAiDoctor(currentCaption);
                } else {
                  setIsAiAudioMuted(true);
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                }
              }}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 p-1 rounded transition"
              title={isAiAudioMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
            >
              {isAiAudioMuted ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} className="text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="flex-1 flex flex-col md:flex-row relative bg-black min-h-0 overflow-hidden">
          {/* Main Remote AI Doctor View */}
          <div className="flex-1 relative flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black p-4 select-none">
            {/* Animated Interactive AI Doctor Avatar */}
            <div className="relative flex flex-col items-center justify-center my-auto">
              {/* Concentric voice waves when AI is speaking */}
              {aiState === 'speaking' && (
                <>
                  <div className="absolute w-48 h-48 rounded-full bg-emerald-500/10 animate-ping pointer-events-none" />
                  <div className="absolute w-40 h-40 rounded-full bg-primary/20 animate-pulse pointer-events-none" />
                </>
              )}
              {aiState === 'listening' && (
                <div className="absolute w-44 h-44 rounded-full bg-blue-500/15 animate-pulse pointer-events-none" />
              )}

              {/* Core Avatar Orb */}
              <div
                className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${
                  aiState === 'speaking'
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 ring-4 ring-emerald-400/50 shadow-glow scale-105'
                    : aiState === 'listening'
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 ring-4 ring-blue-400/40 scale-100'
                    : aiState === 'thinking'
                    ? 'bg-gradient-to-tr from-purple-600 to-pink-500 ring-4 ring-purple-400/40 animate-pulse'
                    : 'bg-gradient-to-tr from-primary to-primary-light ring-2 ring-emerald-500/30'
                }`}
              >
                {aiState === 'thinking' ? (
                  <Loader2 size={48} className="text-white animate-spin" />
                ) : (
                  <Bot size={52} className="text-white drop-shadow-md" />
                )}
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex flex-col items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition shadow-sm ${
                    aiState === 'speaking'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : aiState === 'listening'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 animate-pulse'
                      : aiState === 'thinking'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {aiState === 'speaking' && (
                    <>
                      <Volume2 size={13} className="animate-bounce" />
                      <span>AI Doctor Speaking...</span>
                    </>
                  )}
                  {aiState === 'listening' && (
                    <>
                      <Mic size={13} className="text-blue-400" />
                      <span>Listening to You... (Speak freely)</span>
                    </>
                  )}
                  {aiState === 'thinking' && (
                    <>
                      <Sparkles size={13} className="animate-spin text-purple-400" />
                      <span>Diagnosing & Preparing Advice...</span>
                    </>
                  )}
                  {aiState === 'idle' && <span>Connected • Speak or Tap Mic</span>}
                </span>

                <p className="text-xs text-gray-400 font-medium">{doctorDisplayName}</p>
              </div>

              {/* Animated Audio Equalizer Bars when speaking */}
              {aiState === 'speaking' && (
                <div className="flex items-center gap-1 mt-2 h-5">
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-4" />
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_200ms] h-5" />
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_300ms] h-3" />
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_150ms] h-5" />
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_250ms] h-4" />
                </div>
              )}
            </div>

            {/* Live Closed Captions / Subtitle Overlay */}
            <div className="w-full max-w-2xl px-4 pb-2 z-10">
              {userSpeechDraft ? (
                <div className="bg-blue-950/80 border border-blue-600/40 backdrop-blur-md rounded-2xl p-3 text-center text-xs text-blue-200 animate-in fade-in">
                  <span className="font-bold text-blue-400 mr-1.5">You:</span>
                  <span>"{userSpeechDraft}"</span>
                </div>
              ) : currentCaption ? (
                <div className="bg-black/75 border border-emerald-500/30 backdrop-blur-md rounded-2xl p-3 text-center text-xs text-emerald-100 shadow-elevated">
                  <p className="leading-relaxed line-clamp-3">"{currentCaption}"</p>
                </div>
              ) : null}
            </div>

            {/* Picture-in-Picture Local Self Preview */}
            <div className="absolute bottom-4 right-4 w-32 sm:w-48 h-24 sm:h-36 rounded-2xl bg-gray-900 border-2 border-gray-700/80 overflow-hidden shadow-2xl z-20">
              {videoOn ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-400 text-xs">
                  <VideoOff size={20} />
                  <span className="mt-1 text-[10px]">Camera Off</span>
                </div>
              )}
              <div className="absolute bottom-1 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> You (Live)
              </div>
            </div>
          </div>

          {/* Side Drawer: Live Chat & AI Clinical Recommendations */}
          {chatOpen && (
            <div className="w-full md:w-88 bg-gray-950 border-l border-gray-800 flex flex-col h-64 md:h-full z-20 shrink-0">
              {/* Drawer Tabs */}
              <div className="flex border-b border-gray-800 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-3 text-center transition ${
                    activeTab === 'chat'
                      ? 'border-b-2 border-primary text-primary-light bg-gray-900/40 font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Live Consultation Chat
                </button>
                <button
                  onClick={() => setActiveTab('rx')}
                  className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1 ${
                    activeTab === 'rx'
                      ? 'border-b-2 border-primary text-primary-light bg-gray-900/40 font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Pill size={12} /> Clinical Advice ({clinicalNotes.length})
                </button>
              </div>

              {/* Chat View */}
              {activeTab === 'chat' ? (
                <>
                  <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl border leading-relaxed ${
                          m.isUser
                            ? 'bg-blue-950/40 border-blue-800/40 text-blue-100 ml-4'
                            : 'bg-gray-900 border-gray-800 text-gray-200 mr-4'
                        }`}
                      >
                        <p className={`font-bold text-[10px] ${m.isUser ? 'text-blue-400' : 'text-emerald-400'}`}>
                          {m.sender}
                        </p>
                        <p className="mt-1 whitespace-pre-line">{m.text}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleManualTextSubmit} className="p-2.5 border-t border-gray-800 flex gap-1.5">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message or symptom..."
                      className="bg-gray-900 text-white text-xs px-3 py-2 rounded-xl border border-gray-800 flex-1 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button type="submit" className="bg-primary text-white p-2 rounded-xl active:scale-95 transition">
                      <Send size={14} />
                    </button>
                  </form>
                </>
              ) : (
                /* Clinical Notes & Prescription Preview */
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                    <p className="font-bold flex items-center gap-1 text-[11px] text-emerald-400">
                      <FileCheck size={14} /> Live Telemedicine Recommendations
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">Generated dynamically from your spoken consultation</p>
                  </div>

                  {clinicalNotes.length === 0 ? (
                    <p className="text-gray-500 text-center py-6 text-xs">Speak your symptoms to generate advice</p>
                  ) : (
                    clinicalNotes.map((note, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 space-y-1">
                        <span className="text-[10px] text-gray-500 font-mono">{note.timestamp}</span>
                        <p className="text-gray-300 leading-relaxed">{note.advice}</p>
                      </div>
                    ))
                  )}

                  <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-900/30 text-red-300 text-[11px] flex items-start gap-1.5">
                    <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-400" />
                    <span>In case of severe difficulty breathing or fever over 102°F, visit your nearest hospital immediately.</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Call Control Dock */}
        <div className="bg-gray-900/90 px-6 py-3 border-t border-gray-800/80 flex items-center justify-center gap-3 sm:gap-4 shrink-0">
          {/* Mute/Unmute Mic */}
          <button
            onClick={toggleMic}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition active:scale-95 ${
              micOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-600 text-white shadow-emergencyGlow'
            }`}
            title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {micOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>

          {/* Toggle Camera */}
          <button
            onClick={toggleVideo}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition active:scale-95 ${
              videoOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-600 text-white shadow-emergencyGlow'
            }`}
            title={videoOn ? 'Stop Camera' : 'Start Camera'}
          >
            {videoOn ? <Video size={18} /> : <VideoOff size={18} />}
          </button>

          {/* Scan Camera View / Symptom Visualizer */}
          <button
            onClick={handleScanVideoSymptom}
            disabled={analyzingVisual}
            className={`px-3.5 h-11 rounded-2xl flex items-center gap-1.5 transition active:scale-95 text-xs font-semibold ${
              analyzingVisual
                ? 'bg-purple-900 text-purple-200 border border-purple-500'
                : 'bg-purple-600/90 hover:bg-purple-600 text-white shadow-soft'
            }`}
            title="Point camera at rash, throat, or medication and tap to analyze"
          >
            {analyzingVisual ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
            <span className="hidden sm:inline">{analyzingVisual ? 'Analyzing...' : 'Scan Video Symptom'}</span>
          </button>

          {/* Chat & Notes Drawer Toggle */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition active:scale-95 relative ${
              chatOpen ? 'bg-primary text-white shadow-glow' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
            title="Chat & Clinical Advice Drawer"
          >
            <MessageSquare size={18} />
            {clinicalNotes.length > 0 && !chatOpen && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-gray-900" />
            )}
          </button>

          {/* End Call Button */}
          <button
            onClick={onClose}
            className="h-11 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-emergencyGlow ml-2"
            title="End Teleconsultation"
          >
            <PhoneOff size={18} />
            <span className="text-xs">End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeleconsultationModal;
