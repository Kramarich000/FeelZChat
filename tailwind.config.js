/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: '#0e7490',
  //       dark: '#111827',
  //       light: '#f9fafb',
  //     },
  //   },
  // },
  // safelist: ['text-primary', 'text-light', 'text-black'],

  plugins: [
    // require("tailwindcss-textshadow"),
    // require('tailwindcss-important'),
    // require('tailwindcss-custom-forms'),
    // require('tailwindcss-gradients'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
