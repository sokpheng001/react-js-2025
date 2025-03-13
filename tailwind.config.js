/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary color
        "primary-950": "#1a394e",
        "primary-800": "#1f445e",
        "primary-700": "#2a5b7d",
        "primary-600": "#2f678c",
        "primary-500": "#34729c",
        "primary-400": "#4880a6",
        "primary-300": "#5d8eb0",
        "primary-200": "#719cba",
        "primary-100": "#6cb1da",
        "primary-50": "#def3ff",
        // Secondary color
        "secondary-950": "#7e530c",
        "secondary-900": "#97630e",
        "secondary-800": "#b07311",
        "secondary-700": "#c98413",
        "secondary-600": "#e29516",
        "secondary-500": "#fba518",
        "secondary-400": "#fbae2f",
        "secondary-300": "#fcb746",
        "secondary-200": "#fcc05d",
        "secondary-100": "#fdc974",
        //color light mode
        "text-des-light-mode": "#666666",
        "bg-light-mode": "#F6FCFF",
        white: "#f1f1f1",
        // color dark mode
        "bg-dark-mode": "#111828",
        "text-des-dark-mode": "#A3B1CD",
        black: "#000000",
        //Accsents
        "accents-color" : "#FBA518",
      },
      fontSize: {
        // font size for heading
        "heading-1": "40px",
        "heading-2": "36px",
        "heading-3": "32px",
        "heading-4": "24px",
        "heading-5": "20px",
        "heading-6": "16px",

        // font size for description
        "des-1": "24px",
        "des-2": "20px",
        "des-3": "18px",
        "des-4": "16px",
        "des-5": "12px",
        "des-6": "10px",
      },
      fontFamily: {},
    },
  },
  plugins: [require("flowbite/plugin")],
};
