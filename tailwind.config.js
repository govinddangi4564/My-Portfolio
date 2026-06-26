/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        dimmed: 'var(--dimmed)',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-gradient': 'var(--mesh-gradient)',
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
