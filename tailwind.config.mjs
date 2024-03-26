/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        custom_black: "#393532",
        custom_green: "#7FBD9E",
        custom_white: "#E6D0B7",
        custom_brown: "#E49D72",
        custom_orange: "#DA7A4E",
      },
      fontFamily: {
        "3D": ["Bungee Shade", "sans-serif"],
        newspaper: ["Newsreader", "serif"],
      },
    },
  },
  plugins: [],
};
