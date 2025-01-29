/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
} satisfies Config;
