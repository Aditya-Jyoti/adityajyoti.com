// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import Gruvbox from "./gruvbox-theme.json";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: Gruvbox,
    },
  },
  site: "https://adityajyoti.com",
  integrations: [mdx(), sitemap(), tailwind()],
});
