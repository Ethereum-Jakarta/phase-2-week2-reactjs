/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['naruto-font', 'sans-serif'],
      },
      backgroundImage: {
        'sky-blue': "url('assets/images/sky-blue.png')",
        eva: "url('assets/images/all-eva.png')",
        akane: "url('assets/images/airi_band.webp')",
      },
      dropShadow: {
        custom: '0px 0px 5px #aeaeae',
        ['custom-xl']: '10px 10px 5px #aeaeae',
      },
    },
  },
  plugins: [],
};
