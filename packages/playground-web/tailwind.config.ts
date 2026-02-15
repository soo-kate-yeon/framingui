import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times', 'serif'],
      },
    },
  },
  plugins: [animate],
};

export default config;
