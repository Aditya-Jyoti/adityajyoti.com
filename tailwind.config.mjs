/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ["Excalifont", "sans-serif"],
      },
      colors: {
        background: "#fbf1c7",
        foreground: "#1d2021",
        purple: "#d3869b",
        blue: "#83a598",
        aqua: "#8ec07c",
        yellow: "#fabd2f",
        green: "#b8bb26",
        red: "#fb4934",
      },
    },
  },
  plugins: [],
};
