/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
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
        }
      }
    },
    fontFamily: {

    }
  },
  plugins: [],
}
