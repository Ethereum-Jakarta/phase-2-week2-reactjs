/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        costumGray : '#f4f4f5',
        costumFoot : '#1d242d',
        costumBar : '#1e252e'
      }
    },
  },
  plugins: [],
}