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
        bronze: "#CD7F32",
        silver: "#d6d6d6",
        gold: "#FFD700",
      },
      screens: {
        lg2: "1440px",
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
      {
        mytheme2: {
          primary: "#84cbdb",
          secondary: "#a3e635",
          accent: "#FFD700",
          neutral: "#1E1E1E",
          "base-100": "#1e1e1e",
        },
      },
      {
        chat: {
          primary: "#845ec2",
          secondary: "#ECECEC",
          accent: "#121212",
          neutral: "#121212",
          "base-100": "#121212",
        },
      },

    ],
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  blocklist: ["ProseMirror"],
};
