/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#060610',
        surface: '#0d0d1a',
        card: '#111122',
        accent: '#7b6ff0',
        accent2: '#00f5d4',
        accent3: '#ff6b6b',
        text: '#eeeef8',
        muted: '#555570',
        dimmed: '#333350',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 35s linear infinite reverse',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2.5s ease-in-out infinite',
        'underline-grow': 'underline-grow 0.3s ease forwards',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        'scan': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.6)', opacity: '0.5' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'underline-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};
