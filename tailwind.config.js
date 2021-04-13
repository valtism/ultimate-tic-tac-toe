const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.warmGray,
      },
      fontFamily: {
        display: "YoungSerif",
      },
    },
  },
  variants: {},
  plugins: [],
};
