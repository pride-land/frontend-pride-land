const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default{
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      'primary': '#2B673B',
      'secondary': '#F8EE53',
      'tertiary': '#56CD75',
      'brown': '#582f0e',
      'secondary-800': '#de9e36',
    },
    extend: {
      backgroundImage: {
        'pudding-background': "url('/prideland.png')",
        'volunteer-background': "url('/volunteer.jpg')",
        'aboutus-background': "url('/aboutus.jpg')",
        'contact-background': "url('/contact.jpg')",
      }
    },
    fontFamily: {
      'roboto' : ['Roboto', 'sans-serif']
    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}