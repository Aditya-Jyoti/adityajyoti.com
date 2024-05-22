/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                "custom-black": "#000000",
                "custom-dark-grey": "#525252",
                "custom-grey": "#8c8c8c",
                "custom-light-grey": "#b7b7b7",
                "custom-dark-white": "#e8e8e8",
                "custom-white": "#ffffff",
                "custom-light-white": "#f4f4f4",
            },
            fontFamily: {
                "custom-rounded": ["Nunito", "sans-serif"],
            }
        },
	},
	plugins: [],
}
