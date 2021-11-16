module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#a10863',
      secondary: '#faa900',
      pink: {
        100: '#a1086342',
        400: '#a1086385',
        800: '#a10863bd',
      },
      orange: {
        100: '#f8a50042',
        400: '#f8a50085',
        800: '#f8a500bd',
      },
      black: '#000',
      white: '#fff',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: 'rgba(43, 51, 63, 0.7)',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
      blue: {
        100: '#ebf8ff',
        200: '#bee3f8',
        300: '#90cdf4',
        400: '#63b3ed',
        500: '#4299e1',
        600: '#3182ce',
        700: '#2b6cb0',
        800: '#2c5282',
        900: '#2a4365',
      },
      green: {
        500: '#10B981'

      }
  },

    extend: {},
  },
  variants: {
    extend: {
      // border: ['disabled'],
      opacity: ['disabled'],
      backgroundColor: ['disabled','hover', 'focus', 'active'],
      borderColor: ['disabled','focus', 'hover'],
      textColor: ['disabled']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

