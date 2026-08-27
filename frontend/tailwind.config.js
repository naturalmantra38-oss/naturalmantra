/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4F7F4',
          100: '#E2EBE2',
          200: '#C6D8C6',
          300: '#A0BEA0',
          400: '#759D75',
          500: '#4D7C4D',
          600: '#2D5A27', // Secondary Natural Green
          700: '#1E3F20', // Primary Forest Green
          800: '#152C16', // Dark Forest Green
          900: '#0E1D0F',
          gold: '#C5A059', // Muted Gold Accent
          goldHover: '#B28C45',
          cream: '#FDFBF7', // Warm Cream Background
          creamDark: '#F5F0E6',
          charcoal: '#1B281B',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(30, 63, 32, 0.05)',
        'card': '0 10px 30px -5px rgba(30, 63, 32, 0.08)',
        'modal': '0 25px 50px -12px rgba(14, 29, 15, 0.25)',
      }
    },
  },
  plugins: [],
}
