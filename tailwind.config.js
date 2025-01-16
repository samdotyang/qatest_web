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
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        'primary-label': 'var(--color-primary-label)',
        'secondary-label': 'var(--color-secondary-label)',
        'sidebar': 'var(--color-sidebar)',
        'sidebar-select': 'var(--color-sidebar-select)',
        card: 'var(--color-card)',
        button: 'var(--color-button)',
        'button-destructive': 'rgba(255, 59, 48)',
        red: 'var(--color-red)',
        orange: 'var(--color-orange)',
        yellow: 'var(--color-yellow)',
        green: 'var(--color-green)',
        mint: 'var(--color-mint)',
        teal: 'var(--color-teal)',
        cyan: 'var(--color-cyan)',
        blue: 'var(--color-blue)',
        indigo: 'var(--color-indigo)',
        purple: 'var(--color-purple)',
        pink: 'var(--color-pink)',
        brown: 'var(--color-brown)',
        'mac-dark-card': 'rgba(51, 53, 55)',
        'mac-light-card': 'rgba(246, 247, 248)',
        'mac-dark-background': 'rgba(29, 31, 33)',
        'mac-light-background': 'rgba(255, 255, 255)',
        'mac-dark': 'rgba(29, 32, 37)',
        'mac-light': 'rgba(255, 255, 255)',
        'hyperlink-dark': 'rgba(10, 132, 255)',
        'hyperlink-light': 'rgba(0, 122, 255)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
