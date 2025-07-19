/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Gaming dark theme colors
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Gaming purple accents
        gaming: {
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
          },
          dark: {
            900: '#0a0a0f',
            800: '#12121a',
            700: '#1a1a26',
            600: '#222233',
            500: '#2a2a40',
            400: '#32324d',
            300: '#3a3a5a',
            200: '#424267',
            100: '#4a4a74',
          },
          accent: {
            cyan: '#00d9ff',
            pink: '#ff0080',
            green: '#00ff88',
            yellow: '#ffff00',
          }
        },
        treasure: {
          gold: '#fbbf24',
          bronze: '#d97706',
          parchment: '#fef3c7',
          wood: '#92400e',
          map: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        reveal: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #a855f7, 0 0 10px #a855f7, 0 0 15px #a855f7' },
          '50%': { boxShadow: '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f7' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        reveal: 'reveal 0.5s ease-out forwards',
        glow: 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-gaming': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a26 50%, #2a2a40 100%)',
        'gradient-purple': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        'gradient-dark': 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
      },
    },
  },
  plugins: [],
};