module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.tsx", "./stories/**/*.tsx", "./lib/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "berry-red": "#d22356",
        "barb-orange": "#f15f45",
        "golden-rod": "#faa73d",
        teal: "#24a5a9",
        indigo: "#202253",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
