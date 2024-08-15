/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        "source-sans-pro": ["Source Sans Pro", "sans-serif"],
      },
      padding: {
        4.5: "1.125rem",
      },
      margin: {
        18: "4.5rem",
      },
      colors: {
        primary: "#0d253f",
        secondary: "#01b4e4",
        tertiary: "#90cea1",
        gray: {
          ...colors,
          300: "#dbdbdb",
        },
      },
      aspectRatio: {
        "2/1": "2 / 1",
        "2/3": "2 / 3",
        "4/3": "4 / 3",
        "3/4": "3 / 4",
        "9/16": "9 / 16",
        "16/9": "16 / 9",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        primary: "9999px",
      },
      height: {
        4.5: "18px",
        13: "3.25rem",
        15: "3.75rem",
        90: "22.5rem",
        150: "37.5rem",
        "fit-layout": "calc(100vh - 80px)",
      },
      minHeight: {
        "fit-layout": "calc(100vh - 80px)",
        10: "2.5rem",
        13: "3.25rem",
        20: "5rem",
        52: "13rem",
      },
      maxHeight: {
        "fit-layout": "calc(100vh - 80px)",
      },
      inset: {
        22: "5.5rem",
        26.5: "6.625rem",
      },
      scale: {
        25: "0.25",
        120: "1.2",
        140: "1.4",
        160: "1.6",
        175: "1.75",
        180: "1.8",
        200: "2.00",
      },
      width: {
        13: "3.25rem",
        4.5: "18px",
        56: "14rem",
        128: "32rem",
        160: "40rem",
        200: "50rem",
        270: "67.5rem",
        "fit-layout": "calc(100% - 288px)",
      },
      minWidth: {
        16: "4rem",
        36: "9rem",
        48: "12rem",
      },
      maxWidth: {
        20: "5rem",
        48: "12rem",
        layout: "80rem",
      },
      spacing: {
        0.25: "0.0625rem",
        0.75: "0.1875rem",
        4.5: "1.125rem",
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        xl: "0px 5px 14px 0px rgba(100, 100, 111, 0.2)",
        left: "0px 2px 4px 0px rgba(14, 30, 37, 0.12) , 0px 2px 16px 0px rgba(14, 30, 37, 0.32)",
        inside: "inset 1px 1px 2px 0 rgba(100,100,111,0.1);",
      },
    },
    screens: {
      xs: "320px",
      ...defaultTheme.screens,
      "3xl": "1600px",
      "4xl": "1920px",
    },
  },

  plugins: [require("tailwind-scrollbar")],
};
