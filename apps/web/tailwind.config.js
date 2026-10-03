/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#111110', // Deep carbon paper / slate noir
        surface: '#161614',    // Tactile dark wood / archive surface
        surfaceHover: '#1E1E1B',
        borderDark: '#282724',  // Hairline architectural graticule
        borderLight: '#383631',
        parchment: '#EDEAE2',  // Primary human readable text (aged paper)
        stone: '#9E9B91',      // Muted metadata & secondary notes
        accentGold: '#BFA15F', // Antique brass / astrolabe gold
        cinnabar: '#BD3A2B',   // Vermilion red seal (used strictly < 5%)
        olive: '#4E7A58',      // Restrained positive indicator
        terracotta: '#A64235', // Restrained warning/error
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        '2xl': '8px',
        '3xl': '8px',
        full: '4px', // Eliminate bloated pills, keep restrained geometry
      },
    },
  },
  plugins: [],
};
