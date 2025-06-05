/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Trebuchet MS"', '"Lucida Sans Unicode"', '"Lucida Grande"', '"Lucida Sans"', 'Arial', 'sans-serif'],
        'mono': ['"Fira Code"', 'monospace'],
      },
      colors: {
        'bg-primary': '#000000',
        'text-primary': '#BBB',
        'text-heading': '#222',
        'text-link': '#888',
        'text-link-hover': '#557799',
        'text-article-link': 'blue',
        'text-visited': 'purple',
        'border-color': '#999',
        'code-bg': '#f2f2f2',
        'table-header-bg': '#eee',
      },
      maxWidth: {
        'content': '40rem',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
