/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**/*.{html,jsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "lime-400": "#48fb00",
      },
    },
  },
  plugins: [],
};
