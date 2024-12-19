const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
 content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/flowbite/**/*.js",
 ],
 theme: {
  colors: {
   primary: "#2B673B",
   secondary: "#F8EE53",
   tertiary: "#56CD75",
   brown: "#582f0e",
   "secondary-800": "#de9e36",
  },
  extend: {
   backgroundImage: {
    "pudding-background": "url('/prideland.png')",
    "volunteer-background": "url('/volunteer.jpg')",
    "aboutus-background": "url('/aboutus.jpg')",
    "contact-background": "url('/contact.jpg')",
   },
   animation: {
    "infinite-scroll": "infinite-scroll 45s linear infinite",
    slidein: "slidein 2s ease-out forwards",
   },
   keyframes: {
    "infinite-scroll": {
     from: { transform: "translateX(0)" },
     to: { transform: "translateX(-50%)" },
    },
    slidein: {
     "0%": { transform: "translateY(50%)", opacity: 0 },
     "100%": { transform: "translateY(0)", opacity: 1 },
    },
   },
  },
 },
 fontFamily: {
  roboto: ["Roboto", "sans-serif"],
 },
 plugins: [require("flowbite/plugin")],
};
