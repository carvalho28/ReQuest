/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryblue: "#0998B7",
        primarygreen: "#32C487",
        contrast: "#845EC2",
        contrasthover: "#503182",
        black: "#1E1E1E",
      },
    },
  },
  plugins: [],
};
