/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-red': '#E50914',
        'brand-dark': '#141414', // Slightly different dark for more contrast
        'brand-light-gray': '#F5F5F1',
        'brand-gray': '#808080',
        'brand-black': '#000000', // Adding a true black for gradients if needed
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}