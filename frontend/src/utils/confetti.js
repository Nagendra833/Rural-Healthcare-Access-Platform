import confetti from 'canvas-confetti';

export const triggerConfetti = (originX = 0.5, originY = 0.6) => {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: originX, y: originY },
      colors: ['#2E7D32', '#4CAF50', '#81C784', '#FFD54F', '#4FC3F7'],
      disableForReducedMotion: true,
    });
  } catch (e) {
    // Graceful fallback
  }
};

export const playChimeSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // AudioContext might be restricted until user gesture
  }
};
