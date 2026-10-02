const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/web/app/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/web/components/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/web/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0d17',
        surface: '#131726',
        surfaceHover: '#1b2034',
        borderDark: '#262d42',
        accentGold: '#d4af37',
        mysticPurple: '#7c3aed',
      },
    },
  },
  plugins: [],
};
