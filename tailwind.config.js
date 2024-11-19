/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        text: "var(--text)",
        background: "var(--background)",
        gray: "var(--gray)",
        lightgray: "var(--lightgray)",
        white: "var(--white)",
        lightblack: "var(--lightblack)",
      },
    },
  },
  plugins: [],
};
