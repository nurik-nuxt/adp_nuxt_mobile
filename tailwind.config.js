/** @type {DefaultColors} */
const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    './vueform.config.js', // or where `vueform.config.js` is located
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js"
  ],
  theme: {
    screens: {
      'tablet': '640px'
    },
    extend: {
      colors: {
        gray: {
          50: '#E4E5E9',
          100: '#737B8C',
          150: '#F0F1F5',
          200: '#E4E5E8'
        },
        rose: {
          50: '#FF4D4D'
        },
        blue: {
          50: '#376FFF'
        },
        green: {
          50: '#AEDEA2',
          100: '#33A343'
        },
        "vtd-primary": colors.sky, // Light mode Datepicker color
        "vtd-primary-500": '#39B54A',
        "vtd-primary-400": '#39B54A',
        "vtd-primary-100": '#C1E6B8',
        "vtd-primary-600": '#39B54A',
        "vtd-primary-700": '#39B54A',
        "vtd-secondary-300": 'none',
        "vtd-secondary": '#FFFFF', // Dark mode Datepicker color
      }
    },
    fontFamily: {

    }
  },
  plugins: [
    require('@vueform/vueform/tailwind'),
    require('@tailwindcss/forms'),
  ],
}
