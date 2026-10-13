import React, { useState, useRef, useEffect } from 'react';
import { PhoneCall, AlertOctagon, CheckCircle2, MapPin, Share2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const HoldEmergencyButton = ({ onTriggered }) => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const [coords, setCoords] = useState(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const { showToast } = useToast();

  const HOLD_DURATION = 2500; // 2.5 seconds hold threshold

  // Get GPS coords on mount so it's instantaneous when triggered
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setCoords(null),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  const playSiren = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.2, ctx.currentTime);

      // Pitch sweep siren
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1100, ctx.currentTime + 0.3);
      osc.frequency.linearRampToValueAtTime(700, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch {}
  };

  const handleStartHold = () => {
    if (triggered) return;
    setHolding(true);
    setProgress(0);

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / HOLD_DURATION) * 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(intervalRef.current);
        activateEmergency();
      }
    }, 40);
  };

  const handleCancelHold = () => {
    if (triggered) return;
    setHolding(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const activateEmergency = () => {
    setHolding(false);
    setTriggered(true);
    playSiren();
    if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 500]);

    showToast('🚨 EMERGENCY ALERT ACTIVATED! Medical dispatch alerted.', 'error');
    if (onTriggered) onTriggered(coords);
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-red-50/60 to-white rounded-2xl border border-red-200 shadow-sm relative overflow-hidden">
      {/* Radar pulse background ring */}
      <div className="relative flex items-center justify-center my-4">
        {!triggered && (
          <div className="absolute w-36 h-36 rounded-full bg-red-400/20 animate-radar pointer-events-none" />
        )}
        {!triggered && (
          <div className="absolute w-28 h-28 rounded-full bg-red-400/30 animate-ping pointer-events-none" />
        )}

        {/* SVG Circular Progress Meter */}
        <div className="relative">
          <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#fee2e2"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#dc2626"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
          </svg>

          {/* Interactive Core Button */}
          <button
            onMouseDown={handleStartHold}
            onMouseUp={handleCancelHold}
            onMouseLeave={handleCancelHold}
            onTouchStart={(e) => {
              handleStartHold();
            }}
            onTouchEnd={handleCancelHold}
            onTouchCancel={handleCancelHold}
            style={{ WebkitTouchCallout: 'none', userSelect: 'none', touchAction: 'manipulation' }}
            className={`absolute inset-2 m-auto w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95 select-none ${
              triggered
                ? 'bg-emerald-600 text-white shadow-glow'
                : holding
                ? 'bg-red-700 text-white scale-95 shadow-emergencyGlow'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {triggered ? (
              <CheckCircle2 size={36} className="animate-bounce" />
            ) : (
              <>
                <AlertOctagon size={30} className={holding ? 'animate-spin' : ''} />
                <span className="text-[11px] font-bold tracking-wider mt-1 uppercase">
                  {holding ? `${Math.round((progress / 100) * 2.5)}s` : 'HOLD SOS'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      <p className="font-semibold text-gray-800 text-base mt-2">
        {triggered ? 'Emergency Alert Sent!' : 'Press & Hold for 2.5s for Instant SOS'}
      </p>
      <p className="text-xs text-gray-500 max-w-xs mt-1">
        {triggered
          ? 'Health workers & local response teams have received your coordinates.'
          : 'Hold to trigger alarm and broadcast your village GPS coordinates to local responders.'}
      </p>

      {triggered && (
        <div className="mt-4 w-full bg-white rounded-xl p-3 border border-red-200 text-left shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-700">
            <span className="flex items-center gap-1 font-medium text-red-600">
              <MapPin size={14} /> GPS Location:
            </span>
            <span className="font-mono text-gray-600">
              {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'Captured (Approx)'}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <a
              href="tel:108"
              className="flex-1 bg-red-600 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 hover:bg-red-700 transition"
            >
              <PhoneCall size={14} /> Call 108 Ambulance
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `🚨 MEDICAL EMERGENCY ALERT! I need immediate help. Location: ${
                  coords ? `https://maps.google.com/?q=${coords.lat},${coords.lng}` : 'Village area'
                }`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white text-xs font-semibold px-3 py-2.5 rounded-lg flex items-center justify-center gap-1 hover:bg-emerald-700 transition"
            >
              <Share2 size={14} /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoldEmergencyButton;
