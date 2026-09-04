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
        sans: ["Outfit", "Inter", "sans-serif"],
        display: ["Black Ops One", "Saira Stencil One", "Bebas Neue", "sans-serif"],
        stencil: ["Black Ops One", "Saira Stencil One", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        teko: ["Teko", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        serif: ["Libre Baskerville", "serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
}