const defaultTheme = require('tailwindcss/defaultTheme')
const navy = {
  50: '#E7E9EF',
  100: '#C2C9D6',
  200: '#A3ADC2',
  300: '#697A9B',
  400: '#5C6B8A',
  500: '#384766',
  600: '#313E59',
  700: '#26334D',
  800: '#202B40',
  900: '#192132',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        navy
      }
    },
  },
  plugins: [
  ],
}
