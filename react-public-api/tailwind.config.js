/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['naruto-font', 'sans-serif'],
      },
      backgroundImage: {
        'sky-blue': "url('assets/images/sky-blue.jpg')",
        akane: "url('assets/images/airi_band.webp')",
      },
    },
  },
  plugins: [],
};
