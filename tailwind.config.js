/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cooper: ["'Cooper Black'", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#EFAF23",
      },
    },
  },
  plugins: [],
};
