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

      },
    },
  },
  plugins: [],
}
