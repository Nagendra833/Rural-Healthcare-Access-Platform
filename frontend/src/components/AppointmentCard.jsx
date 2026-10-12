import React, { useState } from 'react';
import { X, Edit2, Video, Bot, Sparkles, Globe, Trash2, CheckCircle2, ChevronDown } from 'lucide-react';
import { statusColor } from '../utils/formatters';
import { SUPPORTED_LANGUAGES } from '../context/LanguageContext';

const LANG_FLAGS = { en: '🇬🇧', hi: '🇮🇳', te: '🇮🇳', ta: '🇮🇳', bn: '🇮🇳', es: '🇪🇸' };

const AppointmentCard = ({
  appointment,
  viewerRole,
  onCancel,
  onDelete,
  onComplete,
  onReschedule,
  onJoinCall,
  onUpdateLanguage,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const canJoinCall = ['confirmed', 'rescheduled', 'pending'].includes(appointment.status);
  const isFinished = ['cancelled', 'completed'].includes(appointment.status);
  const langCode = appointment.language || 'en';
  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === langCode) || SUPPORTED_LANGUAGES[0];

  const handleLangSelect = (code) => {
    setShowLangMenu(false);
    if (onUpdateLanguage && code !== langCode) {
      onUpdateLanguage(appointment._id, code);
    }
  };

  return (
    <div className={`card card-hover border transition-all duration-200 ${
      appointment.status === 'cancelled'
        ? 'border-red-100 bg-red-50/20 opacity-80'
        : appointment.status === 'completed'
        ? 'border-emerald-100 bg-emerald-50/20'
        : 'border-gray-100 hover:border-primary/40'
    }`}>
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            appointment.status === 'cancelled'
              ? 'bg-red-100 text-red-500'
              : appointment.status === 'completed'
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-gradient-to-br from-primary/10 to-blue-100 text-primary'
          }`}>
            <Bot size={18} />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              AI Health Consultation
              <Sparkles size={12} className="text-amber-500" />
            </p>
            <p className="text-xs text-gray-500">Powered by AI Doctor Assistant</p>
          </div>
        </div>

        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${statusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      {/* Symptoms */}
      <p className="text-xs text-gray-600 mt-3 bg-surface p-2.5 rounded-lg border border-gray-100">
        <span className="font-medium text-gray-700">Symptoms:</span> {appointment.reason || 'General Health Consultation'}
      </p>

      {/* Status & Language Bar */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500 relative">
        <span className="flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Instant Call (24×7 Available)
        </span>

        {/* Quick Language Switcher Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/60 text-indigo-700 font-bold text-[11px] transition"
            title="Click to change consultation language"
          >
            <Globe size={11} />
            <span>{LANG_FLAGS[langCode] || '🌐'} {langConfig.native}</span>
            <ChevronDown size={11} className="text-indigo-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 bottom-full mb-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-30 animate-in fade-in zoom-in-95">
              <p className="px-2.5 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Select Language:
              </p>
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleLangSelect(l.code)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs flex items-center justify-between transition ${
                    l.code === langCode
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{LANG_FLAGS[l.code]}</span>
                    <span>{l.native}</span>
                  </span>
                  <span className="text-[10px] text-gray-400">{l.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
        {canJoinCall && onJoinCall ? (
          <button
            onClick={() => onJoinCall(appointment)}
            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-sm"
          >
            <Video size={13} /> Start AI Call
          </button>
        ) : (
          <div className="text-[11px] text-gray-400">
            {appointment.status === 'cancelled' ? 'Consultation cancelled' : 'Consultation completed'}
          </div>
        )}

        <div className="flex items-center gap-2.5 text-xs">
          {/* Mark Complete (Active appointments) */}
          {canJoinCall && onComplete && (
            <button
              onClick={() => onComplete(appointment._id)}
              className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
              title="Move to Completed block"
            >
              <CheckCircle2 size={13} /> Complete
            </button>
          )}

          {/* Edit Symptoms (Active appointments) */}
          {onReschedule && !isFinished && (
            <button
              onClick={() => onReschedule(appointment)}
              className="flex items-center gap-1 text-primary hover:underline font-medium"
            >
              <Edit2 size={13} /> Update
            </button>
          )}

          {/* Cancel (Active appointments) */}
          {onCancel && !isFinished && (
            <button
              onClick={() => onCancel(appointment._id)}
              className="flex items-center gap-1 text-amber-600 hover:underline font-medium"
            >
              <X size={13} /> Cancel
            </button>
          )}

          {/* Permanent Delete (For finished or any card user wants to remove completely) */}
          {onDelete && (
            <button
              onClick={() => onDelete(appointment._id)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:underline font-medium px-1 py-0.5 rounded hover:bg-red-50"
              title="Permanently remove from list"
            >
              <Trash2 size={13} /> Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
