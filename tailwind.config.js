/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        text: "var(--text)",
        background: "var(--background)",
        gray: "var(--gray)",
        
      },
    },
  },
  plugins: [],
};
