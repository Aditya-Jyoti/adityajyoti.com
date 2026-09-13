// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import Gruvbox from "./gruvbox-theme.json";
import rehypeImageLayout from "./src/plugins/rehype-image-layout.mjs";
import { contentLastmod } from "./src/lib/content-dates.mjs";

const postDates = contentLastmod();

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: Gruvbox,
    },
    rehypePlugins: [rehypeImageLayout],
  },
  site: "https://adityajyoti.in",
  // Warm the next page on hover so the view transition has something to
  // transition to, instead of a pause on a blank frame.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    mdx(),
    sitemap({
      // The résumé route is a noindex redirect shim, not a real page.
      filter: (page) => !page.includes("/resume"),
      changefreq: "weekly",
      serialize(item) {
        // Real dates for posts; nothing at all for pages we can't date, which
        // beats claiming everything changed at build time.
        const url = new URL(item.url);
        const lastmod = postDates.get(url.pathname);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
    tailwind(),
  ],
});
