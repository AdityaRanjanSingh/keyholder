import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Exo 2", "sans-serif"],
    },
  },
  daisyui: {
    themes: ["dim"],
  },
  plugins: [require("@tailwindcss/typography"),daisyui],
};
