/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        'primary-dark': '#1B5E20',
        secondary: '#FFFFFF',
        accent: '#E8F5E9',
        textmain: '#333333',
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        soft: '0 2px 10px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
