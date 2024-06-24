/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx, html}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'sidebar': '300px auto', //for sidebar layout
        'sidebar-collapsed': '64px auto', //for sidebar layout
      },
      colors: {
        'light-red': 'rgba(255, 59, 48)',
        'dark-red': 'rgba(255, 69, 58)',
        'light-orange': 'rgba(255, 149, 0)',
        'dark-orange': 'rgba(255, 159, 10)',
        'light-yellow': 'rgba(255, 204, 0)',
        'dark-yellow': 'rgba(255, 214, 10)',
        'light-green': 'rgba(52, 199, 89)',
        'dark-green': 'rgba(48, 209, 88)',
        'light-mint': 'rgba(0, 199, 190)',
        'dark-mint': 'rgba(99, 230, 226)',
        'light-teal': 'rgba(48, 176, 199)',
        'dark-teal': 'rgba(64, 230, 226)',
        'light-cyan': 'rgba(50, 173, 230)',
        'dark-cyan': 'rgba(100, 210, 255)',
        'light-blue': 'rgba(0, 122, 255)',
        'dark-blue': 'rgba(10, 132, 255)',
        'light-indigo': 'rgba(88, 86, 214)',
        'dark-indigo': 'rgba(94, 92, 230)',
        'light-purple': 'rgba(175, 82, 222)',
        'dark-purple': 'rgba(191, 90, 242)',
        'light-pink': 'rgba(255, 45, 85)',
        'dark-pink': 'rgba(255, 55, 95)',
        'light-brown': 'rgba(162, 132, 94)',
        'dark-brown': 'rgba(172, 142, 104)',
        'mac-sidebar-light': 'rgba(206, 207, 210)',
        'mac-sidebar-light-select': 'rgba(182, 183, 185)',
        'mac-sidebar-dark': 'rgba(34, 36, 40)',
        'mac-sidebar-dark-select': 'rgba(61, 63, 64)',
        'mac-dark-card': 'rgba(51, 53, 55)',
        'mac-light-card': 'rgba(246, 247, 248)',
        'mac-dark-background': 'rgba(29, 31, 33)',
        'mac-light-background': 'rgba(255, 255, 255)',
        'mac-dark': 'rgba(29, 32, 37)',
        'mac-light': 'rgba(255, 255, 255)',
        'hyperlink-dark': 'rgba(10, 132, 255)',
        'hyperlink-light': 'rgba(0, 122, 255)',
        'primary-label': 'rgba(0, 0, 0, 1)',
        'secondary-label': 'rgba(60, 60, 67, 0.6)',
        'tertiary-label': 'rgba(60, 60, 67, 0.3)',
        'quaternary-label': 'rgba(60, 60, 67, 0.18)',
        'dark-primary-label': 'rgba(255, 255, 255, 1)',
        'dark-secondary-label': 'rgba(235, 235, 245, 0.6)',
        'dark-tertiary-label': 'rgba(235, 235, 245, 0.3)',
        'dark-quaternary-label': 'rgba(235, 235, 245, 0.18)'
      }
    }
  },
  plugins: [],
}
