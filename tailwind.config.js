/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      textDecoration: ["responsive"],
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require('tailwindcss-important'),
    require('tailwindcss-custom-forms'),
    require('tailwindcss-gradients'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
