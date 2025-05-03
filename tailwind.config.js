/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'xs': '400px',
      },
    },
  },
  // safelist: ['text-primary', 'text-light', 'text-black'],

  plugins: [
    // require("tailwindcss-textshadow"),
    require('tailwindcss-important'),
    // require('tailwindcss-custom-forms'),
    // require('tailwindcss-gradients'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
  variants: {
    extend: {
      animation: ['motion-safe', 'motion-reduce'],
      transitionProperty: ['motion-safe', 'motion-reduce'],
      transitionDuration: ['motion-safe', 'motion-reduce'],
    }
  }
};
