/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}", // Añade aquí las rutas de tus componentes
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': '#1952BE',
        'light-blue': '#60a5fa',
        'gray-tab': '#AAC3F3',
        'gray-light': '#e5e7eb',
        'gray-input': '#EDEEF3',
        'dk-main-bg': '#121212',
        'dk-tab': '#1C1C1C',
        'dk-blue': '#5186EC',
        'dk-input': '#2A2A2A',
        'main-red': '#DB2B2B',
        'dk-red': '#BB2626',
 

        
      },

      fontFamily: {
        'Excon_regular': ['Excon_regular', 'sans-serif'],
        'Excon_bold': ['Excon_bold', 'sans-serif'],
        'Excon_thin': ['Excon_thin', 'sans-serif'],
        'Erode_regular': ['Erode_regular', 'sans-serif'],
        'Erode_medium': ['Erode_medium', 'sans-serif'],
        'Erode_bold': ['Erode_bold', 'sans-serif'],
        'Outfit-medium': ['Outfit-medium', 'sans-serif'],
        
      },
    },
  },
  plugins: [],
}
