import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      animation: {
        gradient: 'gradient 5s ease infinite',
        gentleRotate: 'gentleRotate 4s ease-in-out infinite',
      },
      colors: {
        mark: 'rgb(221,217,121)',
        markDark: 'rgba(221,217,121,0.4)',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        gentleRotate: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      fontFamily: {
        sourceSerif4: ['"Source Serif 4"', ...defaultTheme.fontFamily.sans],
        code: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      maxWidth: {
        blogMaxWidth: '640px',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
} satisfies Config;
