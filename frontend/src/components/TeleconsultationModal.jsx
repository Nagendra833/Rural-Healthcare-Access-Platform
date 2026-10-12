import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Send, ShieldCheck, Activity, User, Wifi } from 'lucide-react';
import { playChimeSound } from '../utils/confetti';

export const TeleconsultationModal = ({ isOpen, onClose, appointment, currentUserRole }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'System', text: 'Encrypted telemedicine link established. Connection speed: Good (rural relay active).' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [callDuration, setCallDuration] = useState(0);

  const localVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isOpen) {
      playChimeSound();
      timer = setInterval(() => setCallDuration((d) => d + 1), 1000);

      // Attempt to access user webcam for self-preview
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            mediaStreamRef.current = stream;
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          })
          .catch(() => {
            // Camera not available or denied - fallback gracefully
          });
      }
    } else {
      setCallDuration(0);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }

    return () => {
      clearInterval(timer);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

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

  const sendMsg = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages((prev) => [...prev, { sender: 'You', text: chatInput.trim() }]);
    setChatInput('');
  };

  if (!isOpen || !appointment) return null;

  const partnerName =
    currentUserRole === 'doctor'
      ? appointment.patient?.fullName || 'Patient'
      : `Dr. ${appointment.doctor?.fullName || 'Doctor'}`;

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl h-[88vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Top Header Bar */}
        <div className="bg-gray-950/80 px-4 py-3 border-b border-gray-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="font-bold text-sm">{partnerName}</p>
              <p className="text-[11px] text-gray-400">Rural Teleconsultation • {appointment.reason || 'General Checkup'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-gray-800 px-2.5 py-1 rounded-md text-emerald-400">
              {formatTimer(callDuration)}
            </span>
            <span className="text-xs hidden sm:flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
              <Wifi size={12} /> Low-Bandwidth Mode
            </span>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="flex-1 flex flex-col md:flex-row relative bg-black min-h-0 overflow-hidden">
          {/* Main Remote Video Screen */}
          <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900">
            {/* Simulated Remote Feed */}
            <div className="text-center p-6">
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-primary-light mx-auto flex items-center justify-center text-white shadow-glow mb-4">
                <User size={54} />
              </div>
              <p className="font-bold text-lg text-white">{partnerName}</p>
              <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                <Activity size={13} className="text-emerald-400 animate-pulse" /> Live Tele-Consultation Stream
              </p>
            </div>

            {/* Picture-in-Picture Local Self Preview */}
            <div className="absolute bottom-4 right-4 w-32 sm:w-44 h-24 sm:h-32 rounded-xl bg-gray-800 border-2 border-gray-700 overflow-hidden shadow-elevated">
              {videoOn ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-400 text-xs">
                  <VideoOff size={20} />
                  <span className="mt-1 text-[10px]">Camera Off</span>
                </div>
              )}
              <span className="absolute bottom-1 left-2 text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-white font-medium">
                You
              </span>
            </div>
          </div>

          {/* Side Drawer Chat */}
          {chatOpen && (
            <div className="w-full md:w-80 bg-gray-950 border-l border-gray-800 flex flex-col h-48 md:h-full">
              <div className="p-3 border-b border-gray-800 text-white font-semibold text-xs flex justify-between">
                <span>In-Call Notes & Chat</span>
                <button onClick={() => setChatOpen(false)} className="text-gray-400 text-xs hover:text-white">✕</button>
              </div>
              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {messages.map((m, i) => (
                  <div key={i} className="bg-gray-900 border border-gray-800 p-2 rounded-lg text-gray-200">
                    <p className="font-bold text-[10px] text-primary-light">{m.sender}</p>
                    <p className="mt-0.5">{m.text}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMsg} className="p-2 border-t border-gray-800 flex gap-1">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a note..."
                  className="bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg border border-gray-800 flex-1 focus:outline-none"
                />
                <button type="submit" className="bg-primary text-white p-1.5 rounded-lg">
                  <Send size={13} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Control Dock */}
        <div className="bg-gray-950 px-6 py-3.5 border-t border-gray-800 flex items-center justify-center gap-4">
          <button
            onClick={toggleMic}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition active:scale-95 ${
              micOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-600 text-white shadow-emergencyGlow'
            }`}
            title={micOn ? 'Mute' : 'Unmute'}
          >
            {micOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>

          <button
            onClick={toggleVideo}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition active:scale-95 ${
              videoOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-600 text-white shadow-emergencyGlow'
            }`}
            title={videoOn ? 'Stop Camera' : 'Start Camera'}
          >
            {videoOn ? <Video size={18} /> : <VideoOff size={18} />}
          </button>

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition active:scale-95 ${
              chatOpen ? 'bg-primary text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
            title="Chat & Notes"
          >
            <MessageSquare size={18} />
          </button>

          <button
            onClick={onClose}
            className="w-12 h-11 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-emergencyGlow"
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
