//** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Teal/Emerald Modern Tech Theme
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Primary teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Emerald shades
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Primary emerald
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b', // Dark emerald
        },
        // Base backgrounds
        'bg-light': '#f9fafb', // Off-white
        'bg-dark': '#111827', // Soft dark gray
        // Surface colors for glassmorphism
        'glass-light': 'rgba(249, 250, 251, 0.8)',
        'glass-dark': 'rgba(17, 24, 39, 0.8)',
        // Text colors
        'text-primary': '#111827', // Dark text for light mode
        'text-primary-dark': '#f9fafb', // Light text for dark mode
        'text-secondary': '#6b7280', // Muted text
        'text-accent': '#14b8a6', // Teal accent text
        // Accent gradients
        'aqua-from': '#06b6d4', // Cyan
        'aqua-to': '#14b8a6', // Teal
        'emerald-from': '#10b981',
        'emerald-to': '#059669',
        // Interactive states
        'hover-light': 'rgba(20, 184, 166, 0.1)',
        'hover-dark': 'rgba(20, 184, 166, 0.2)',
        // Card/container backgrounds
        surface: {
          light: 'rgba(255, 255, 255, 0.7)',
          dark: 'rgba(31, 41, 55, 0.7)',
        },
        // Border colors
        border: {
          light: 'rgba(229, 231, 235, 0.8)',
          dark: 'rgba(75, 85, 99, 0.8)',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'], // Bold, geometric headings
        body: ['Inter', 'system-ui', 'sans-serif'], // Clean, readable body text
        mono: ['JetBrains Mono', 'monospace'], // Tech/Stats
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(20, 184, 166, 0.15)',
        'teal-glow': '0 0 20px rgba(20, 184, 166, 0.3)',
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.3)',
        'pill': '0 4px 16px rgba(20, 184, 166, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(20, 184, 166, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
