/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B38F6F',
        'light-beige': '#FFF3E3',
        brown: '#71482D',
        base: '#F4EFE8',
        secondary: '#E6D8C6',
        'medium-gray': '#3A3A3A',
        'light-gray': '#9F9F9F',
        'bg-gray': '#F4F5F7',
        'sale-red': '#E97171',
        'new-green': '#2EC1AC',
      },
      fontFamily: {
        gotham: ['"Gotham"', '"Gotham A"', 'sans-serif'],
      },
      maxWidth: {
        'container': '1440px',
      },
      spacing: {
        '15': '60px',
      },
      keyframes: {
        'bounce-smooth': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        'bounce-smooth': 'bounce-smooth 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
