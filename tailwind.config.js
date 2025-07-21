/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ternary: "#FC5F07",
        "text-gray": "#747474",
        "text-light": "#ABABAB",
        "text-black": "#363636",
      },
    },
  },
  plugins: [],
};
