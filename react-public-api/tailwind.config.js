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
        eva00: "url('assets/images/eva/eva-00.jpg')",
        eva01: "url('assets/images/eva/eva-01.jpg')",
        eva02: "url('assets/images/eva/eva-02.jpg')",
        eva08: "url('assets/images/eva/eva-08.jpg')",
        eva06: "url('assets/images/eva/eva-06.jpg')",
      },
      dropShadow: {
        custom: '0px 0px 5px #aeaeae',
        ['custom-xl']: '10px 10px 5px #aeaeae',
      },
      backgroundColor: {
        'custom-eva00': '#f58507',
        'custom-eva01': '#804cf7',
        'custom-eva02': '#f4081c',
        'custom-eva08': '#f5a5c8',
        'custom-eva06': '#001e4d',
      },
    },
  },
  plugins: [],
};
