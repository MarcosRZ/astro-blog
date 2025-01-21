/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        'h1': '36px',
        'h2': '30px',
        'h3': '24px',
        'h4': '20px',
        'h5': '16px',
        'h6': '12px',
      },
      colors: {
        'background': 'var(--background)',
        'text-regular': 'var(--text-regular)',
        'highlight': 'var(--highlight)',
        'primary': {
          '50': 'var(--primary-50)',
          '100': 'var(--primary-100)',
          '200': 'var(--primary-200)',
          '300': 'var(--primary-300)',
          '400': 'var(--primary-400)',
          '500': 'var(--primary-500)',
          '600': 'var(--primary-600)',
          '700': 'var(--primary-700)',
          '800': 'var(--primary-800)',
          '900': 'var(--primary-900)',
          '950': 'var(--primary-950)',
        },
        'secondary': {
          '50': 'var(--secondary-50)',
          '100': 'var(--secondary-100)',
          '200': 'var(--secondary-200)',
          '300': 'var(--secondary-300)',
          '400': 'var(--secondary-400)',
          '500': 'var(--secondary-500)',
          '600': 'var(--secondary-600)',
          '700': 'var(--secondary-700)',
          '800': 'var(--secondary-800)',
          '900': 'var(--secondary-900)',
          '950': 'var(--secondary-950)',
        },
        // ...
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
