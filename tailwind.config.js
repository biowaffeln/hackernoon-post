module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // "media" or "class"
  theme: {
    extend: {
      colors: {
        "hn-primary": "rgb(0, 255, 0)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
