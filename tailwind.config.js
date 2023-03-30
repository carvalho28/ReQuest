/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primaryblue: "#0998B7",
        primarygreen: "#32C487",
        contrast: "#845EC2",
        contrasthover: "#503182",
        black: "#1E1E1E",
        white2: "#FAFDFE",
        whitepages: "#F5F5F7",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0998B7",
          secondary: "#32C487",
          accent: "#845EC2",
          neutral: "#1E1E1E",
          "base-100": "#F5F5F7",
        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  blocklist: ["ProseMirror"],
};
