const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': 'Noto\\ Sans\\ KR, sans-serif', 
      'afMedium': 'afMedium, system-ui',
      'afBold': 'afBold, system-ui',
      'mono': defaultTheme.fontFamily.mono,
    }
  },
  plugins: [],
}
