/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#434343",
        secondary: "#A6A6A6",
        offwhite: "#F2F2F2",
        accent: "#86C993",
        start: "#202020",
        end: "#343434",
      },
    },
  },
  plugins: [],
};
