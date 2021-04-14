module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'hax-red': '#c13535',
        'hax-black': '#1A2125',
        // 'hax-black-trans': 'rgba(26,33,37,0.9)',
        'hax-black-trans': 'rgba(14,17,20,0.85)',
        'hax-team-red': '#E56E56',
        'hax-team-blue': '#5689E5',
      },
      gridTemplateColumns: {
        'teams': '4fr 1fr 4fr',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
