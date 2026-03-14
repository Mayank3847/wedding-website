/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage:   { 50:'#f4f7f4', 100:'#e8f0e8', 200:'#c8dbc8', 300:'#9abf9a', 400:'#6a9e6a', 500:'#4a7c59', 600:'#3a6147', 700:'#2e4d38', 800:'#243d2c', 900:'#1a2e20' },
        rose:   { 50:'#fdf4f5', 100:'#fbe8eb', 200:'#f5c8cf', 300:'#eca0ac', 400:'#e07080', 500:'#c94f62', 600:'#a83a4d', 700:'#8a2d3d', 800:'#72242f', 900:'#5e1d27' },
        ivory:  { 50:'#fefdfb', 100:'#fdf9f3', 200:'#f9f1e4', 300:'#f3e4cc', 400:'#e8d0ac', 500:'#d9b887', 600:'#c49a60', 700:'#a67e45', 800:'#876537', 900:'#6e522d' },
        stone:  { 50:'#fafaf9', 100:'#f5f5f4', 200:'#e7e5e4', 300:'#d6d3d1', 400:'#a8a29e', 500:'#78716c', 600:'#57534e', 700:'#44403c', 800:'#292524', 900:'#1c1917' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        heading: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        accent:  ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'sage-mesh': 'radial-gradient(at 20% 30%, #c8dbc8 0px, transparent 50%), radial-gradient(at 80% 70%, #f9f1e4 0px, transparent 50%), radial-gradient(at 50% 50%, #fdf4f5 0px, transparent 60%)',
      },
    },
  },
  plugins: [],
}