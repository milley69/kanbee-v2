/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue', './app.vue', './error.vue'],
  darkMode: ['class', '[data-theme]'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#491eff',
          secondary: '#ff41c7',
          accent: '#00cfbd',
          neutral: '#2b3440',
          'base-100': '#f8f8f8',
          'base-200': '#f3f3f3',
          info: '#00b3f0',
          success: '#00ca92',
          warning: '#ffc22d',
          error: '#ff6f70',
        },
        dark: {
          primary: '#7582ff',
          secondary: '#ff71cf',
          accent: '#00c7b5',
          neutral: '#2a323c',
          'base-100': '#1d232a',
          'base-200': '#191e24',
          info: '#00b3f0',
          success: '#00ca92',
          warning: '#ffc22d',
          error: '#ff6f70',
        },
      },
    ],
    logs: false,
  },
}
