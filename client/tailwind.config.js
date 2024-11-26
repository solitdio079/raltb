import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#3587DC',
          secondary: '#96c0ec',
          accent: '#ebdcdc',
          neutral: '#010506',
         
        },
      },
    ],
  },
}
