/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tv: "1201px",
        desk: "1025px",
        lap: "769px",
        ipad: "481px",
        mb: "320px",
      },
    },
  },
  plugins: [],
};
