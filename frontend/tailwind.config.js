module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'hax-red': '#c13535',
        'hax-black': '#1A2125',
        'hax-team-red': '#E56E56',
        'hax-team-blue': '#5689E5',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
