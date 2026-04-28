/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#131313',
        text: '#EAEAEA',
        muted: '#666666',
        border: '#FFFFFF',
      },
      fontFamily: {
        serif: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        caps: '0.18em',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

