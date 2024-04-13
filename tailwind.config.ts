import { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['variant', [
    '@media (prefers-color-scheme: dark) { &:not(.light *) }',
    '&:is(.dark *)',
  ]],
  theme: {
    extend: {
      'padding': {
        '5px': '5000px'
      },
      colors: {
        black: '#000',
        white: '#fff',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.app-text-color': {
          '--tw-text-opacity': 1,
          color: 'rgb(0 0 0 / var(--tw-text-opacity))',
        },
        '.app-background-color': {
          '--tw-text-opacity': 1,
          color: 'rgb(255 255 255 / var(--tw-text-opacity))', // Set background color to white
        },
        /** this code need to be duplicated */
        '.dark': {
          ' .app-text-color': {
            '--tw-text-opacity': 1,
            color: 'rgb(255 255 255 / var(--tw-text-opacity))', // Set text color to white in dark mode
          },
          ' .app-background-color': {
            '--tw-text-opacity': 1,
            color: 'rgb(0 0 0 / var(--tw-text-opacity))',
          },
        },
      };
      addUtilities(newUtilities, ['dark']);
    },
  ],
} satisfies Config

