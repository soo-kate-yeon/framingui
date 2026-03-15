import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['order-1', 'order-2', 'order-3', 'lg:order-none'],
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
