import React from 'react';
import { Clock, X, Edit2, Video, Bot, Sparkles, Globe } from 'lucide-react';
import { statusColor } from '../utils/formatters';
import { SUPPORTED_LANGUAGES } from '../context/LanguageContext';

const LANG_FLAGS = { en: '🇬🇧', hi: '🇮🇳', te: '🇮🇳', ta: '🇮🇳', bn: '🇮🇳', es: '🇪🇸' };

const AppointmentCard = ({ appointment, viewerRole, onCancel, onReschedule, onJoinCall }) => {
  const canJoinCall = ['confirmed', 'rescheduled', 'pending'].includes(appointment.status);
  const langCode = appointment.language || 'en';
  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === langCode) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="card card-hover border border-gray-100 hover:border-primary/40 transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center">
            <Bot size={18} className="text-primary" />
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

      <p className="text-xs text-gray-600 mt-3 bg-surface p-2.5 rounded-lg border border-gray-100">
        <span className="font-medium text-gray-700">Symptoms:</span> {appointment.reason || 'General Health Consultation'}
      </p>

      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1 font-medium text-gray-700">
          <Clock size={13} /> {appointment.timeSlot}
        </span>
        {/* Language Badge */}
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-semibold text-[11px]">
          <Globe size={11} />
          {LANG_FLAGS[langCode] || '🌐'} {langConfig.native}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
        {canJoinCall && onJoinCall ? (
          <button
            onClick={() => onJoinCall(appointment)}
            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <Video size={13} /> Start AI Call
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3 text-xs">
          {onReschedule && appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            <button
              onClick={() => onReschedule(appointment)}
              className="flex items-center gap-1 text-primary hover:underline font-medium"
            >
              <Edit2 size={13} /> Update
            </button>
          )}
          {onCancel && appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            <button
              onClick={() => onCancel(appointment._id)}
              className="flex items-center gap-1 text-red-600 hover:underline font-medium"
            >
              <X size={13} /> Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
