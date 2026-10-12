/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          light: '#4CAF50',
          dark: '#1B5E20',
        },
        secondary: '#FFFFFF',
        accent: '#E8F5E9',
        textmain: '#1F2937',
        surface: '#F9FAFB',
        emergency: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
          dark: '#991B1B',
        },
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0, 0, 0, 0.05)',
        elevated: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        glow: '0 0 20px rgba(46, 125, 50, 0.25)',
        emergencyGlow: '0 0 25px rgba(220, 38, 38, 0.4)',
      },
      animation: {
        radar: 'radar 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        shimmer: 'shimmer 1.8s infinite linear',
        breathe: 'breathe 3s ease-in-out infinite',
        pulseSlow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
};
