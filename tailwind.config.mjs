/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      // Brand design tokens — single source of truth for the luxury aesthetic.
      colors: {
        night: {
          DEFAULT: '#10131a', // deep mountain night
          800: '#1a1f2b',
          700: '#262d3d',
        },
        cream: {
          DEFAULT: '#f6f1e7', // warm paper
          200: '#efe7d6',
        },
        champagne: {
          DEFAULT: '#c7a16b', // gold accent
          600: '#b08c52',
        },
        mist: '#8a93a6',
      },
      fontFamily: {
        // Sans-serif display for headings; clean sans for body. Different families so the
        // hierarchy still reads as two voices, not one weight of the same typeface.
        display: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.18em',
      },
      maxWidth: {
        content: '76rem',
      },
    },
  },
  plugins: [],
};
