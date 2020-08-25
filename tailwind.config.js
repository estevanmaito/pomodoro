const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: 'all',
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
}
