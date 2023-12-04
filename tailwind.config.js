const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#E2E957",
        "primary-darker": "#c6cc4b",
        "primary-lighter": "#f1f59f",
        "primary-light": "#fcffbf",
        "highlight": "#DF3817",
      },
      fontFamily: {
        header: ["'Arial Black'", "'Arial Black fallback'", "Arial"],
      }
    },
  },
  plugins: [],
  safelist: [
    "translate-x-2.5", // added dynamically in login primary button
  ],
}

