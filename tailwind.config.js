/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Terminal and theme palette
        'terminal-bg': '#0a0a0a',
        'terminal-green': '#00ff00',
        'terminal-blue': '#00aaff',
        'terminal-yellow': '#ffff00',
        'terminal-red': '#ff0000',
        'terminal-purple': '#aa00ff',
        'terminal-orange': '#ff8800',
        'terminal-gray': '#666666',

        'dark-bg': '#111111',
        'dark-card': '#1a1a1a',
        'dark-border': '#333333',
        'dark-text': '#e0e0e0',
        'dark-muted': '#888888',

        'light-bg': '#ffffff',
        'light-card': '#f8f9fa',
        'light-border': '#e9ecef',
        'light-text': '#212529',
        'light-muted': '#6c757d',
        terminal: {
          bg: '#0a0a0a',
          green: '#00ff00',
          blue: '#00aaff',
          yellow: '#ffff00',
          red: '#ff0000',
          purple: '#aa00ff',
          orange: '#ff8800',
          gray: '#666666',
        },
        dark: {
          bg: '#111111',
          card: '#1a1a1a',
          border: '#333333',
          text: '#e0e0e0',
          muted: '#888888',
        },
        light: {
          bg: '#ffffff',
          card: '#f8f9fa',
          border: '#e9ecef',
          text: '#212529',
          muted: '#6c757d',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'typing': 'typing 3s steps(30, end) forwards',
        'blink': 'blink 1s infinite',
        'fade-in': 'fade-in 0.5s ease-in',
        'slide-up': 'slide-up 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 255, 0, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}
