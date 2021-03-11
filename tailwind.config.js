const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        gray: colors.warmGray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
