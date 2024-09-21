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
        'main-blue': '#015DEC',
        'light-blue': '#60a5fa',
        'gray-tab': '#AAC3F3',
        'grey-light': '#EDEEF3'
      },

      fontFamily: {
        'Excon_regular': ['Excon_regular', 'sans-serif'],
        'Excon_bold': ['Excon_bold', 'sans-serif'],
        'Excon_thin': ['Excon_thin', 'sans-serif'],
        'Erode_regular': ['Erode_regular', 'sans-serif'],
        'Erode_medium': ['Erode_medium', 'sans-serif'],
        'Erode_bold': ['Erode_bold', 'sans-serif', 'bold'],
        
      },
    },
  },
  plugins: [],
}
