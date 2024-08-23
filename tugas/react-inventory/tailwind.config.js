/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{tsx,jsx}"
  ],
  plugins: [],
  theme: {
    extend: {
      animation: {
        slideup: "slideUp 1s ease-in-out",
        slidedown: "slideDown 1s ease-in-out"
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding"
      },
      fontFamily: {
        "comic": ["Caveat, cursive"]
      }
    },
  }
}

export default config;
