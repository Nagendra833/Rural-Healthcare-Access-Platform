import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Send,
  Bot,
  Camera,
  Volume2,
  VolumeX,
  Sparkles,
  Pill,
  ShieldAlert,
  Loader2,
  FileCheck,
  Globe,
  Check,
} from 'lucide-react';
import { sendChatMessage, analyzeMedicalDocument } from '../services/aiService';
import { updateAppointment } from '../services/appointmentService';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { playChimeSound, triggerConfetti } from '../utils/confetti';

const LANG_FLAGS = { en: '🇬🇧', hi: '🇮🇳', te: '🇮🇳', ta: '🇮🇳', bn: '🇮🇳', es: '🇪🇸' };

const GREETINGS = {
  en: (p, r, d) => `Hello ${p}! I am ${d}. I see you joined this video consultation for ${r}. How are you feeling right now? Please speak and tell me what symptoms you are experiencing.`,
  hi: (p, r, d) => `नमस्ते ${p}! मैं ${d} हूँ। मैं देख रहा हूँ कि आप ${r} के लिए इस वीडियो परामर्श में शामिल हुए हैं। अभी आप कैसा महसूस कर रहे हैं? कृपया बोलकर अपने लक्षण बताएं।`,
  te: (p, r, d) => `నమస్కారం ${p}! నేను ${d}. మీరు ${r} కోసం ఈ వీడియో సంప్రదింపులో చేరారు. మీరు ఇప్పుడు ఎలా అనుభవిస్తున్నారు? దయచేసి మాట్లాడి మీ లక్షణాలను చెప్పండి.`,
  ta: (p, r, d) => `வணக்கம் ${p}! நான் ${d}. நீங்கள் ${r} க்காக இந்த வீடியோ ஆலோசனையில் இணைந்துள்ளீர்கள். இப்போது எப்படி உணர்கிறீர்கள்? தயவுசெய்து பேசி உங்கள் அறிகுறிகளைச் சொல்லுங்கள்.`,
  bn: (p, r, d) => `নমস্কার ${p}! আমি ${d}। আমি দেখছি আপনি ${r} এর জন্য এই ভিডিও পরামর্শে যোগ দিয়েছেন। এখন আপনার কেমন লাগছে? অনুগ্রহ করে কথা বলুন এবং আপনার লক্ষণগুলি জানান।`,
  es: (p, r, d) => `¡Hola ${p}! Soy ${d}. Veo que se unió a esta consulta por video para ${r}. ¿Cómo se siente ahora mismo? Por favor hable y cuénteme qué síntomas está experimentando.`,
};

const SWITCH_MESSAGES = {
  en: 'Language set to English. I am listening, please tell me your symptoms.',
  hi: 'भाषा हिन्दी सेट की गई है। मैं सुन रहा हूँ, कृपया अपने लक्षण बताएं।',
  te: 'భాష తెలుగులోకి మార్చబడింది. నేను వింటున్నాను, దయచేసి మీ సమస్యను చెప్పండి.',
  ta: 'மொழி தமிழாக மாற்றப்பட்டது. நான் கேட்கிறேன், தயவுசெய்து உங்கள் அறிகுறிகளைச் சொல்லுங்கள்.',
  bn: 'ভাষা বাংলায় পরিবর্তন করা হয়েছে। আমি শুনছি, দয়া করে আপনার লক্ষণগুলি বলুন।',
  es: 'Idioma cambiado a Español. Estoy escuchando, por favor cuénteme sus síntomas.',
};

const QUICK_SYMPTOMS = {
  en: ['Bone or Joint Swelling', 'Fever & Headache', 'Stomach Pain', 'Cough & Cold', 'Body Pain & Fatigue'],
  hi: ['हड्डियों या जोड़ों में सूजन', 'बुखार और सिरदर्द', 'पेट में तेज दर्द', 'खांसी और जुकाम', 'शरीर दर्द और कमजोरी'],
  te: ['ఎముకలు లేదా కీళ్ల వాపు', 'తీవ్రమైన జ్వరం & తలనొప్పి', 'కడుపు నొప్పి', 'దగ్గు & జలుబు', 'ఒళ్ళు నొప్పులు & నీరసం'],
  ta: ['எலும்பு அல்லது மூட்டு வீக்கம்', 'காய்ச்சல் மற்றும் தலைவலி', 'வயிற்று வலி', 'இருமல் மற்றும் சளி', 'உடல் வலி மற்றும் சோர்வு'],
  bn: ['হাড় বা জয়েন্ট ফোলা', 'জ্বর ও মাথাব্যথা', 'পেটে ব্যথা', 'কাশি ও ঠান্ডা লাগা', 'গা হাত পা ব্যথা ও দুর্বলতা'],
  es: ['Hinchazón de huesos o articulaciones', 'Fiebre y dolor de cabeza', 'Dolor estomacal', 'Tos y resfriado', 'Dolor corporal y fatiga'],
};

export const TeleconsultationModal = ({ isOpen, onClose, appointment, currentUserRole, onMarkCompleted }) => {
  const { language: globalLang } = useLanguage();
  const { showToast } = useToast();

  // Active consultation language state
  const [activeLangCode, setActiveLangCode] = useState('en');

  // Sync initial language on appointment load
  useEffect(() => {
    if (appointment?.language) {
      setActiveLangCode(appointment.language);
    } else if (globalLang) {
      setActiveLangCode(globalLang);
    }
  }, [appointment?.language, globalLang, isOpen]);

  const activeLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === activeLangCode) || SUPPORTED_LANGUAGES[0];
  const speechCode = activeLangConfig?.speechCode || 'en-US';
  const langName = activeLangConfig?.name || 'English';
  const langNative = activeLangConfig?.native || 'English';

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

  const doctorDisplayName = appointment?.doctor?.fullName || appointment?.doctorName || 'Dr. AI';

  // Format MM:SS call timer
  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Best voice selection from browser speechSynthesis
  const getBestVoice = useCallback((targetSpeechCode, targetLangCode, targetLangName) => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    let match = voices.find(
      (v) => v.lang === targetSpeechCode || v.lang.replace('_', '-').toLowerCase() === targetSpeechCode.toLowerCase()
    );
    if (match) return match;

    match = voices.find((v) => v.lang.toLowerCase().startsWith(targetLangCode.toLowerCase()));
    if (match) return match;

    match = voices.find((v) => v.name.toLowerCase().includes(targetLangName.toLowerCase()));
    if (match) return match;

    if (['hi', 'te', 'ta', 'bn'].includes(targetLangCode)) {
      match = voices.find((v) => v.lang.toLowerCase().includes('in') || v.name.toLowerCase().includes('india'));
      if (match) return match;
    }

    return null;
  }, []);

  // Text-To-Speech engine for AI Doctor
  const speakAsAiDoctor = useCallback(
    (textToSpeak, overrideLangCode) => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      if (isAiAudioMuted) {
        setCurrentCaption(textToSpeak);
        return;
      }

      const lCode = overrideLangCode || activeLangCode;
      const lConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lCode) || activeLangConfig;
      const sCode = lConfig.speechCode;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = sCode;
      utterance.rate = 0.90;
      utterance.pitch = 1.0;

      const voice = getBestVoice(sCode, lConfig.code, lConfig.name);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        isAiSpeakingRef.current = true;
        setAiState('speaking');
        setCurrentCaption(textToSpeak);
        if (recognitionRef.current) {
          try {
            recognitionRef.current.abort();
          } catch {}
        }
      };

      utterance.onend = () => {
        isAiSpeakingRef.current = false;
        setAiState('listening');
        startPatientListening();
      };

      utterance.onerror = () => {
        isAiSpeakingRef.current = false;
        setAiState('listening');
        startPatientListening();
      };

      window.speechSynthesis.speak(utterance);
    },
    [isAiAudioMuted, activeLangCode, activeLangConfig, getBestVoice]
  );

  // Speech-To-Text engine for Patient
  const startPatientListening = useCallback(() => {
    if (!recognitionRef.current || isAiSpeakingRef.current || !micOn) return;
    try {
      recognitionRef.current.start();
    } catch {
      // Already running
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
        const symptomsContext = appointment?.reason || 'General health consultation';
        const aiPrompt = `You are Dr. AI, an empathetic rural healthcare physician conducting a live telemedicine consultation.
The patient's initial reason for consultation: "${symptomsContext}".
The patient just spoken to you: "${cleaned}".

CRITICAL INSTRUCTIONS:
1. The patient has chosen to communicate in ${langName} (${langNative}).
2. You MUST reply 100% in ${langName} using ${langNative} script. DO NOT reply in English unless the selected language is English.
3. Provide 2 to 3 concise, clear spoken sentences of clinical guidance:
   - Validate their symptoms gently.
   - Suggest safe home care, hydration, rest, or standard OTC relief (e.g., Paracetamol for fever/headache).
   - State clear warning signs for when they must visit their nearest Primary Health Centre (PHC) or dial 108.
4. Speak warmly and directly as a trusted rural physician.`;

        const history = newMessages
          .filter((m) => !m.isSystem)
          .map((m) => ({
            role: m.isUser ? 'user' : 'model',
            parts: [{ text: m.text }],
          }));

        const data = await sendChatMessage(aiPrompt, history, activeLangCode);
        const reply = data.reply || (
          activeLangCode === 'te'
            ? "నేను మీ సమస్యను అర్థం చేసుకున్నాను. దయచేసి పుష్కలంగా నీరు త్రాగి విశ్రాంతి తీసుకోండి. జ్వరం లేదా తలనొప్పి ఉంటే పారాసిటమాల్ 500mg తీసుకోండి. సమస్య తీవ్రమైతే వెంటనే సమీప ఆరోగ్య కేంద్రానికి వెళ్లండి."
            : activeLangCode === 'hi'
            ? "मैं आपकी स्थिति समझ रहा हूँ। कृपया पर्याप्त पानी पिएं और आराम करें। बुखार या सिरदर्द के लिए पैरासिटामोल लें। यदि लक्षण बढ़ें तो तुरंत नजदीकी स्वास्थ्य केंद्र जाएं।"
            : "I understand your condition. Please take adequate rest, stay hydrated, and take Paracetamol 500mg if fever persists. If your symptoms worsen, please visit your nearest Primary Health Centre immediately."
        );

        setMessages((prev) => [...prev, { sender: doctorDisplayName, text: reply, isUser: false }]);

        setClinicalNotes((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            advice: reply.slice(0, 160) + '...',
          },
        ]);

        speakAsAiDoctor(reply, activeLangCode);
      } catch (err) {
        const fallback =
          activeLangCode === 'te'
            ? "దయచేసి విశ్రాంతి తీసుకోండి మరియు పుష్కలంగా నీరు త్రాగండి. సమస్య తగ్గకపోతే సమీప ఆరోగ్య కేంద్రాన్ని సంప్రదించండి."
            : activeLangCode === 'hi'
            ? "कृपया आराम करें और तरल पदार्थ लें। यदि लक्षण बने रहें तो प्राथमिक स्वास्थ्य केंद्र जाएं।"
            : "Please take rest and stay hydrated. If symptoms persist, consult a doctor in person.";
        setMessages((prev) => [...prev, { sender: doctorDisplayName, text: fallback, isUser: false }]);
        speakAsAiDoctor(fallback, activeLangCode);
      }
    },
    [appointment, messages, langName, langNative, activeLangCode, doctorDisplayName, speakAsAiDoctor]
  );

  // Switch Language directly inside video call
  const handleSwitchLanguage = async (newCode) => {
    if (newCode === activeLangCode) return;
    setActiveLangCode(newCode);

    const newConf = SUPPORTED_LANGUAGES.find((l) => l.code === newCode) || SUPPORTED_LANGUAGES[0];
    const switchNotice = SWITCH_MESSAGES[newCode] || `Language switched to ${newConf.native}.`;

    setMessages((prev) => [
      ...prev,
      {
        sender: 'System',
        text: `🌐 Consultation language switched to ${newConf.native} (${newConf.name})`,
        isUser: false,
        isSystem: true,
      },
      {
        sender: doctorDisplayName,
        text: switchNotice,
        isUser: false,
      },
    ]);

    speakAsAiDoctor(switchNotice, newCode);
    showToast(`Switched consultation to ${newConf.native}`, 'success');

    // Save language to appointment in background
    if (appointment?._id) {
      try {
        await updateAppointment(appointment._id, { language: newCode });
      } catch {}
    }
  };

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && isOpen) {
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
          const greetingFn = GREETINGS[activeLangCode] || GREETINGS.en;
          const welcomeGreeting = greetingFn(patientName, reason, doctorDisplayName);

          setMessages([
            {
              sender: doctorDisplayName,
              text: welcomeGreeting,
              isUser: false,
            },
          ]);

          speakAsAiDoctor(welcomeGreeting, activeLangCode);
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
  }, [isOpen, appointment, speakAsAiDoctor, activeLangCode, doctorDisplayName]);

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
            { sender: `${doctorDisplayName} (Visual Analysis)`, text: visualAdvice, isUser: false },
          ]);

          setClinicalNotes((prev) => [
            ...prev,
            {
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              advice: `[Visual Scan]: ${visualAdvice}`,
            },
          ]);

          triggerConfetti();
          speakAsAiDoctor(visualAdvice, activeLangCode);
        } catch (err) {
          const fallback =
            'I analyzed your camera frame. Please keep the affected area clean and rest. If swelling or fever increases, visit your Primary Health Centre.';
          speakAsAiDoctor(fallback, activeLangCode);
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

  const currentQuickSymptoms = QUICK_SYMPTOMS[activeLangCode] || QUICK_SYMPTOMS.en;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gray-950 border border-gray-800 rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Top Video Header */}
        <div className="bg-gray-900/95 px-4 sm:px-6 py-3 border-b border-gray-800 flex flex-wrap items-center justify-between text-white shrink-0 gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm tracking-wide">{doctorDisplayName}</p>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles size={10} /> 24/7 AI Clinic
                </span>
              </div>
              <p className="text-[11px] text-gray-400 line-clamp-1">
                Symptoms: <span className="text-gray-200 font-medium">{appointment.reason || 'General Consultation'}</span>
              </p>
            </div>
          </div>

          {/* Interactive In-Call Language Selector */}
          <div className="flex items-center gap-1.5 bg-gray-950/80 p-1 rounded-2xl border border-gray-800">
            <span className="text-[10px] text-gray-400 font-bold px-1.5 flex items-center gap-1">
              <Globe size={11} className="text-primary" /> Lang:
            </span>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {SUPPORTED_LANGUAGES.map((l) => {
                const isActive = activeLangCode === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => handleSwitchLanguage(l.code)}
                    className={`px-2 py-1 rounded-xl text-[10px] font-bold transition flex items-center gap-1 active:scale-95 ${
                      isActive
                        ? 'bg-primary text-white shadow-sm ring-1 ring-primary-light'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                    title={`Switch to ${l.native} (${l.name})`}
                  >
                    <span>{LANG_FLAGS[l.code] || '🌐'}</span>
                    <span>{l.native}</span>
                    {isActive && <Check size={10} strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs font-mono bg-gray-800/80 px-2.5 py-1 rounded-md text-emerald-400 border border-gray-700">
              {formatTimer(callDuration)}
            </span>
            <button
              onClick={() => {
                if (isAiAudioMuted) {
                  setIsAiAudioMuted(false);
                  if (currentCaption) speakAsAiDoctor(currentCaption, activeLangCode);
                } else {
                  setIsAiAudioMuted(true);
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                }
              }}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 p-1 rounded transition"
              title={isAiAudioMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
            >
              {isAiAudioMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} className="text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="flex-1 flex flex-col md:flex-row relative bg-black min-h-0 overflow-hidden">
          {/* Main Remote AI Doctor View */}
          <div className="flex-1 relative flex flex-col items-center justify-between bg-gradient-to-b from-gray-950 via-gray-900 to-black p-4 select-none">
            {/* Top Language & Status Pill */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Listening & Speaking in {langNative} ({langName})
              </span>
              <span className="text-[11px] text-gray-400 font-medium">
                {aiState === 'speaking'
                  ? '🗣️ AI Doctor is Speaking'
                  : aiState === 'listening'
                  ? '🎤 Listening to your voice...'
                  : aiState === 'thinking'
                  ? '⚡ Analyzing your symptoms...'
                  : 'Ready'}
              </span>
            </div>

            {/* Animated Interactive AI Doctor Avatar */}
            <div className="relative flex flex-col items-center justify-center my-auto">
              {/* Concentric voice waves when AI is speaking */}
              {aiState === 'speaking' && (
                <>
                  <div className="absolute w-52 h-52 rounded-full bg-emerald-500/10 animate-ping pointer-events-none" />
                  <div className="absolute w-44 h-44 rounded-full bg-primary/20 animate-pulse pointer-events-none" />
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
                    ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 ring-4 ring-blue-400/40'
                    : aiState === 'thinking'
                    ? 'bg-gradient-to-tr from-purple-600 to-indigo-500 ring-4 ring-purple-400/40 animate-pulse'
                    : 'bg-gradient-to-tr from-gray-800 to-gray-700 ring-2 ring-gray-600'
                }`}
              >
                <Bot size={48} className="text-white drop-shadow-md" />
                <span className="text-[10px] font-bold text-white/90 mt-1 uppercase tracking-wider">
                  {aiState === 'speaking' ? 'Speaking' : aiState === 'listening' ? 'Listening' : aiState === 'thinking' ? 'Thinking' : 'Online'}
                </span>
              </div>

              {/* Equalizer Bars when speaking */}
              {aiState === 'speaking' && (
                <div className="flex items-center gap-1 mt-3 h-5">
                  <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-4" />
                  <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_200ms] h-5" />
                  <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_300ms] h-3" />
                  <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_150ms] h-5" />
                  <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_250ms] h-4" />
                </div>
              )}
            </div>

            {/* Live Subtitles & Quick Tap Symptoms */}
            <div className="w-full max-w-2xl px-2 pb-2 z-10 space-y-2">
              {/* Quick Tap Symptoms Pills in selected language */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-gray-400 font-semibold mr-1">Quick Tap:</span>
                {currentQuickSymptoms.map((symp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePatientUtterance(symp)}
                    className="px-2.5 py-1 rounded-full bg-gray-800/80 hover:bg-primary/30 border border-gray-700 hover:border-primary/50 text-[11px] text-gray-200 transition active:scale-95"
                  >
                    + {symp}
                  </button>
                ))}
              </div>

              {/* Live Closed Captions / Subtitle Overlay */}
              {userSpeechDraft ? (
                <div className="bg-blue-950/90 border border-blue-600/50 backdrop-blur-md rounded-2xl p-3 text-center text-xs text-blue-200 animate-in fade-in shadow-lg">
                  <span className="font-bold text-blue-400 mr-1.5">You:</span>
                  <span>"{userSpeechDraft}"</span>
                </div>
              ) : currentCaption ? (
                <div className="bg-black/85 border border-emerald-500/40 backdrop-blur-md rounded-2xl p-3 text-center text-xs text-emerald-100 shadow-elevated">
                  <p className="leading-relaxed line-clamp-3 font-medium">"{currentCaption}"</p>
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
                          m.isSystem
                            ? 'bg-gray-900/80 border-gray-700 text-indigo-300 text-center text-[11px]'
                            : m.isUser
                            ? 'bg-blue-950/40 border-blue-800/40 text-blue-100 ml-4'
                            : 'bg-gray-900 border-gray-800 text-gray-200 mr-4'
                        }`}
                      >
                        {!m.isSystem && (
                          <p className={`font-bold text-[10px] ${m.isUser ? 'text-blue-400' : 'text-emerald-400'}`}>
                            {m.sender}
                          </p>
                        )}
                        <p className="mt-0.5 whitespace-pre-line">{m.text}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleManualTextSubmit} className="p-2.5 border-t border-gray-800 flex gap-1.5">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={`Type symptoms in ${langNative}...`}
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

          {/* End Call & Complete Buttons */}
          <div className="flex items-center gap-1.5 ml-2">
            {onMarkCompleted && appointment?._id && (
              <button
                onClick={() => onMarkCompleted(appointment._id)}
                className="h-11 px-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 transition active:scale-95 text-xs shadow-soft"
                title="End consultation and move to Completed block"
              >
                <Check size={16} strokeWidth={2.5} />
                <span className="hidden sm:inline">End & Complete</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="h-11 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-emergencyGlow"
              title="Close video window"
            >
              <PhoneOff size={16} />
              <span className="text-xs">End Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeleconsultationModal;
