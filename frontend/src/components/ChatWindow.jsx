import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle } from 'lucide-react';
import { sendChatMessage } from '../services/aiService';
import { useToast } from '../context/ToastContext';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hello! I'm your AI Health Assistant. You can describe symptoms, ask health questions, or ask for general diet and exercise tips. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const newMessages = [...messages, { role: 'user', text: trimmed }];
    setMessages(newMessages);
    setInput('');
    setSending(true);

    try {
      // Convert our simple message list into Gemini's expected history format
      const history = messages
        .filter((m) => m.role === 'user' || m.role === 'model')
        .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

      const data = await sendChatMessage(trimmed, history);
      setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
    } catch (err) {
      showToast(err.response?.data?.message || 'The AI assistant is unavailable right now.', 'error');
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: "Sorry, I couldn't process that right now. Please try again shortly." },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card flex flex-col h-[600px] max-h-[75vh]">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
          <Bot size={18} className="text-primary" />
        </div>
        <div>
          <p className="font-semibold">AI Health Assistant</p>
          <p className="text-xs text-gray-500">Powered by Google Gemini</p>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs rounded-lg p-2.5 my-3">
        <AlertTriangle size={14} className="shrink-0 mt-0.5" />
        <span>AI responses are for educational purposes only and are not a substitute for professional medical advice.</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Bot size={14} className="text-primary" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm ${
                msg.role === 'user' ? 'bg-primary text-white rounded-br-sm' : 'bg-accent text-textmain rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                <User size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {sending && (
          <div className="flex gap-2 justify-start">
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0">
              <Bot size={14} className="text-primary" />
            </div>
            <div className="bg-accent rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-gray-400">Typing...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your symptoms or ask a question..."
          className="input-field flex-1"
          disabled={sending}
        />
        <button type="submit" className="btn-primary flex items-center justify-center px-3" disabled={sending}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
