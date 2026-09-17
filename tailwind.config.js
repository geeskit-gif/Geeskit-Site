/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        geeskit: {
          black: '#050507',
          panel: '#0E0E13',
          red: '#E11D33',
        }
      }
    },
  },
  plugins: [],
}
