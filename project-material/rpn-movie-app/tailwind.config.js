/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-gray": "rgba(61, 61, 61, 0.386)",
        "base-color": "#020617",
        "blue-rpn" : "#43B2E2"
      },
      textColor: {
        "blue-rpn" : "#43B2E2"
      }
    },
  },
  plugins: [require("daisyui")],
}
