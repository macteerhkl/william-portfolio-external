import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          soft: '#161616',
          muted: '#2B2B2B',
        },
        stone: {
          warm: '#F5F3EF',
          line: '#D9D4CC',
        },
        accent: {
          blue: '#5B6CFF',
          gold: '#C9A96E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(10, 10, 10, 0.08)',
      },
      maxWidth: {
        content: '84rem',
      },
      letterSpacing: {
        display: '-0.04em',
      },
    },
  },
  plugins: [typography],
}
