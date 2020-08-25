const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: 'all',
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '7xl': '5rem',
        '9xl': '7rem',
        '12xl': '10rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
