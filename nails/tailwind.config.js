/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:      '#0A0A0A',
        charcoal: '#1C1C1C',
        smoke:    '#2D2D2D',
        ash:      '#4A4A4A',
        mist:     '#6B6B6B',
        silver:   '#9B9B9B',
        ghost:    '#D8D8D8',
        fog:      '#EFEFEF',
        snow:     '#F6F6F6',
        sidebar:  '#0C0C0C',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Raleway', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
}
