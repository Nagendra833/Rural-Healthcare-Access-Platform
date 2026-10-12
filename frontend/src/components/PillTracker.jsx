import React, { useState, useEffect } from 'react';
import { Sun, CloudSun, Moon, CheckCircle2, Flame, Bell, Sparkles } from 'lucide-react';
import { playChimeSound, triggerConfetti } from '../utils/confetti';
import { useLanguage } from '../context/LanguageContext';

const DEFAULT_SCHEDULE = [
  { id: 'morning', time: '8:00 AM', label: 'Morning', icon: Sun, color: 'text-amber-500 bg-amber-50', medicine: 'Paracetamol 500mg', instructions: 'After breakfast' },
  { id: 'afternoon', time: '1:30 PM', label: 'Afternoon', icon: CloudSun, color: 'text-orange-500 bg-orange-50', medicine: 'Multivitamin Syrup', instructions: 'After lunch' },
  { id: 'night', time: '9:00 PM', label: 'Night', icon: Moon, color: 'text-indigo-500 bg-indigo-50', medicine: 'Amoxicillin 250mg', instructions: 'Before sleep' },
];

export const PillTracker = () => {
  const { t } = useLanguage();
  const todayKey = `pills_${new Date().toISOString().slice(0, 10)}`;

  const [takenStatus, setTakenStatus] = useState(() => {
    try {
      const saved = localStorage.getItem(todayKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('pill_streak') || '4', 10);
  });

  const toggleDose = (id) => {
    const nextState = { ...takenStatus, [id]: !takenStatus[id] };
    setTakenStatus(nextState);
    localStorage.setItem(todayKey, JSON.stringify(nextState));

    if (!takenStatus[id]) {
      playChimeSound();
      const allTaken = DEFAULT_SCHEDULE.every((item) => (item.id === id ? true : nextState[item.id]));
      if (allTaken) {
        triggerConfetti();
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('pill_streak', newStreak.toString());
      }
    }
  };

  const takenCount = Object.values(takenStatus).filter(Boolean).length;
  const progressPct = Math.round((takenCount / DEFAULT_SCHEDULE.length) * 100);

  return (
    <div className="card border-primary/20 bg-gradient-to-br from-white to-accent/30 p-5">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bell size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-900">{t('pillReminder', 'Daily Pill Routine & Adherence')}</h3>
            <p className="text-xs text-gray-500">Track medication timings today</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
          <Flame size={14} className="text-amber-500 fill-amber-500 animate-pulse" />
          <span>{streak} Day Streak!</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="my-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Today's Adherence</span>
          <span className="font-semibold text-primary">{progressPct}% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Pill Slots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-2">
        {DEFAULT_SCHEDULE.map((slot) => {
          const Icon = slot.icon;
          const isTaken = !!takenStatus[slot.id];

          return (
            <button
              key={slot.id}
              onClick={() => toggleDose(slot.id)}
              className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all active:scale-[0.98] ${
                isTaken
                  ? 'bg-emerald-50/80 border-emerald-200 shadow-sm'
                  : 'bg-white border-gray-100 hover:border-gray-200 shadow-soft'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${slot.color}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-700">{slot.label}</span>
                    <span className="text-[10px] text-gray-400">({slot.time})</span>
                  </div>
                  <p className="text-xs font-medium text-gray-800 line-clamp-1 mt-0.5">{slot.medicine}</p>
                  <p className="text-[10px] text-gray-500">{slot.instructions}</p>
                </div>
              </div>

              <div className="mt-0.5">
                {isTaken ? (
                  <CheckCircle2 size={20} className="text-primary fill-accent animate-scaleIn" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-primary transition" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PillTracker;
