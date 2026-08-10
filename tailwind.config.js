/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "#d4ff1e",
        orangeCustom: "#ff5c35",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Libre Baskerville", "serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
}