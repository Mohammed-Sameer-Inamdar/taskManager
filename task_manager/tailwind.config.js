/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: 'var(--color-primary)',
          'light': 'var(--color-primary-light)'
        },
        'secondary': {
          DEFAULT: 'var(--color-secondary)',
          'light': 'var(--color-secondary-light)'
        },
        'danger': {
          DEFAULT: 'var(--color-danger)',
          light: 'var(--color-danger-light)'
        },
        'success': 'var(--color-success)'
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

