/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f0f0f4',
          100: '#e0e0ec',
          200: '#c1c1d9',
          300: '#9393bc',
          400: '#6b6b9f',
          500: '#4a4a82',
          600: '#383868',
          700: '#27274d',
          800: '#161632',
          900: '#0a0a1a',
          950: '#05050d',
        },
        neon: {
          cyan: '#00f5d4',
          purple: '#9b5de5',
          pink: '#f15bb5',
          yellow: '#fee440',
          lime: '#a8ff3e',
        }
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'checker': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='8' height='8' fill='%23ccc'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23ccc'/%3E%3Crect x='8' width='8' height='8' fill='%23fff'/%3E%3Crect y='8' width='8' height='8' fill='%23fff'/%3E%3C/svg%3E\")",
        'checker-dark': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='8' height='8' fill='%23333'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23333'/%3E%3Crect x='8' width='8' height='8' fill='%23555'/%3E%3Crect y='8' width='8' height='8' fill='%23555'/%3E%3C/svg%3E\")",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0,245,212,0.4), 0 0 60px rgba(0,245,212,0.1)',
        'neon-purple': '0 0 20px rgba(155,93,229,0.4), 0 0 60px rgba(155,93,229,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-dark': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }
    },
  },
  plugins: [],
};
