/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#fff",
      "gray-dark": "#22272E",
      "gray-normal": "#373E47",
      "gray-light": "#444B55",
      "gray-medium": "#2D333B",
      "purple-light": "#AE51FF",
      "purple-neon": "#961EFF",
      "pale-yellow": "#FFD4A1",
      fadeBlack: "#00000080",
      black: "#000",
      slate: colors.slate,
      green: "#10b981",
      yellow: "#f59e0b",
    },
    extend: {},
  },
  darkMode: "class",

  plugins: [require("daisyui")],

  daisyui: {
    base: false,
    themes: [
      {
        tendon: {
          primary: "#961EFF",
        },
      },
      "dark",
      "cupcake",
    ],
  },
};
