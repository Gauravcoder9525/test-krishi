/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        krishi: {
          50: '#f2f9f5',
          100: '#e1f2e9',
          200: '#c5e5d4',
          300: '#99d1b5',
          400: '#67b691',
          500: '#419a72',
          600: '#2f7c5a',
          700: '#276349',
          800: '#224f3c',
          900: '#1e4233',
          950: '#0c251c',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
