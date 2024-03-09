/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    fontFamily: {
      sans: "Roboto Mono,monospace",
    },
    extend: {
      height:{
        screen:'100dvh'
      }
    },
  },
  plugins: [nextui()],
};
