/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#fffbf0',
          100: '#fef3d6',
          200: '#fce3ab',
          300: '#f9cb76',
          400: '#f5ad42',
          500: '#ef8e1b',
          600: '#d96e10',
          700: '#b44e10',
          800: '#923d14',
          900: '#783315',
          gold: '#D4AF37',
          lightGold: '#F4E07D',
          darkGold: '#AA820A',
          crimson: '#8B0000',
          navy: '#0B132B',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
