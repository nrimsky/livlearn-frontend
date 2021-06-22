// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        body: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors : {
        'gray-850': '#18212F'
      }
    },
    borderWidth: {
      DEFAULT: "1px",
      2: "1.5px",
      3: "3px",
      4: "4px",
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [],
};
