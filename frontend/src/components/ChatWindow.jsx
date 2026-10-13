import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Mic, MicOff, Volume2, VolumeX, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from '../services/aiService';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

const QUICK_PROMPTS = [
  '🤒 I have high fever and body pain since 2 days',
  '🩺 My blood pressure is high, what should I do?',
  '🤰 I am pregnant — what foods and vitamins do I need?',
  '🍬 I have diabetes — guide me on diet and medicines',
  '👶 My child has diarrhea and is not drinking water',
  '🦟 I may have malaria — what are the symptoms and treatment?',
  '💊 What are the doses for paracetamol and ibuprofen?',
  '🩹 I have a skin rash with itching — what could it be?',
];

const ChatWindow = ({ externalQuery, onExternalQueryConsumed }) => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hello! I am your Rural Health Assistant. You can describe symptoms, ask health questions, or tap the microphone to speak in your local language. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const { showToast } = useToast();
  const { currentLangConfig, speak, stopSpeaking, isSpeaking, t } = useLanguage();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  // Handle externally triggered queries from category chips
  useEffect(() => {
    if (externalQuery && !sending) {
      handleSend(externalQuery);
      if (onExternalQueryConsumed) onExternalQueryConsumed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalQuery]);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLangConfig.speechCode || 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
        showToast('Speech recognition could not detect audio. Try again.', 'info');
      };
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, [currentLangConfig, showToast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      showToast('Speech input is not supported in this browser. Please use Google Chrome or Edge.', 'error');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = currentLangConfig.speechCode;
        recognitionRef.current.start();
      } catch (err) {
        showToast('Microphone access failed. Please check permissions.', 'error');
      }
    }
  };

  const handleSend = async (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : input.trim();
    if (!text || sending) return;

    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setSending(true);

    try {
      const history = messages
        .filter((m) => m.role === 'user' || m.role === 'model')
        .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

      const data = await sendChatMessage(text, history, currentLangConfig.code);
      setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
    } catch (err) {
      showToast(err.response?.data?.message || 'The AI assistant is temporarily unavailable.', 'error');
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: "I couldn't process your request right now. In case of urgent discomfort, please visit your nearest Primary Health Centre or dial 108.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleToggleSpeak = (idx, text) => {
    if (speakingIndex === idx && isSpeaking) {
      stopSpeaking();
      setSpeakingIndex(null);
    } else {
      setSpeakingIndex(idx);
      speak(text);
    }
  };

  return (
    <div className="card flex flex-col h-[calc(100vh-215px)] min-h-[440px] sm:h-[650px] sm:max-h-[82vh] relative overflow-hidden border border-gray-100 shadow-elevated">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center text-white shadow-soft">
            <Bot size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm text-gray-900">AI Health Assistant</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles size={10} /> Online
              </span>
            </div>
            <p className="text-xs text-gray-500">Gemini 1.5 • Multi-lingual & Voice Enabled</p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                role: 'model',
                text: "Hello! How can I help you today? You can describe symptoms or ask for general wellness tips.",
              },
            ]);
            stopSpeaking();
          }}
          title="Reset conversation"
          className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition"
        >
          <RefreshCw size={15} />
        </button>
      </div>

      {/* Medical Advisory Banner */}
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg p-2.5 my-2.5 shrink-0">
        <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-600" />
        <span>Educational guidance only. Not a formal diagnosis. In serious emergencies, please contact 108 immediately.</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5 py-1">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0 mt-1">
                  <Bot size={14} className="text-primary" />
                </div>
              )}

              <div className="flex flex-col max-w-[80%]">
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-surface border border-gray-100 text-textmain rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                </div>

                {/* Read aloud action for AI replies */}
                {msg.role === 'model' && (
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <button
                      onClick={() => handleToggleSpeak(idx, msg.text)}
                      className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-primary transition"
                    >
                      {speakingIndex === idx && isSpeaking ? (
                        <>
                          <VolumeX size={13} className="text-red-500" />
                          <span className="text-red-500 font-medium">{t('stopSpeaking', 'Stop reading')}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={13} className="text-primary" />
                          <span>{t('readAloud', 'Read aloud')}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <User size={14} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Animated Typing Indicator */}
        {sending && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 items-center"
          >
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0">
              <Bot size={14} className="text-primary" />
            </div>
            <div className="bg-surface border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-500 flex items-center gap-1.5 shadow-sm">
              <span className="text-xs text-gray-400 mr-1 font-medium">Assistant is thinking</span>
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      {messages.length <= 2 && (
        <div className="py-2 shrink-0 border-t border-gray-50">
          <p className="text-[10px] text-gray-400 font-medium px-1 pb-1">Tap a question to get started:</p>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1.5 text-[11px] bg-gradient-to-r from-primary/5 to-accent hover:from-primary hover:to-primary-light hover:text-white rounded-xl border border-primary/15 text-gray-700 whitespace-nowrap transition-all active:scale-95 font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input bar with Voice and Send */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2.5 border-t border-gray-100 mt-1 shrink-0"
      >
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={toggleListening}
          className={`relative p-2.5 rounded-xl border flex items-center justify-center transition active:scale-95 ${
            isListening
              ? 'bg-red-500 text-white border-red-500 shadow-emergencyGlow'
              : 'bg-accent text-primary border-primary/20 hover:bg-accent/80'
          }`}
          title={isListening ? 'Listening... Tap to stop' : 'Tap to speak symptoms'}
        >
          {isListening ? (
            <>
              <MicOff size={18} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
            </>
          ) : (
            <Mic size={18} />
          )}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? 'Listening...' : 'Ask question or describe symptoms...'}
          className="input-field flex-1 text-xs sm:text-sm py-2"
          disabled={sending}
        />

        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="btn-primary flex items-center justify-center px-3 sm:px-4 py-2 shrink-0"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
