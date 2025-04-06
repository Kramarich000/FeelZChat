/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      textDecoration: ['responsive'],
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
};
