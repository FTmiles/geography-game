/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors:  {
        base60: {

          500: '#F4EDEB',

        },
        primary30: {
          400: '#3A9843',
          500: '#358D3E',
          600: '#32853B',
        },
        accent10: {
          400: '#F4AED8',
          500: '#F3A5D4',
          600: '#F29CCF',
        }
      }
    },
  },
  plugins: [],
}

