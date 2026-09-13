# adityajyoti.in

My personal site. Astro, Tailwind, no client framework, deployed static to
Cloudflare Pages.

It holds three blogs:

- **Aditya Writes** (`/blog/writes`) long-form posts
- **Aditya Eats** (`/blog/eats`) restaurant write-ups with ratings
- **Aditya Watches** (`/blog/watches`) a list-only media log, no per-item pages

## Commands

| Command        | What it does                          |
| :------------- | :------------------------------------ |
| `pnpm dev`     | Dev server on `localhost:4321`        |
| `pnpm build`   | Static build into `./dist/`           |
| `pnpm preview` | Serve the build locally               |

If you change anything under `src/plugins/`, run `rm -rf .astro` before
building. The content layer caches rendered markdown and only invalidates it
when `astro.config.mjs` or the content itself changes, so plugin edits are
silently ignored until you clear it.

## Layout

```
src/
  components/     shared UI (Header, Footer, Lightbox, LatestTicker, ...)
  content/        the three collections, see below
  layouts/        BlogPost (writes) and KhanaPost (eats)
  lib/            small build-time helpers
  pages/          routes
  plugins/        rehype-image-layout, the markdown image system
  styles/         global.css (site chrome) and post.css (article body)
public/           fonts, favicons, robots.txt, résumé. No post images.
docs/             authoring notes
```

## Adding a post

Every post is a folder whose name is its URL slug, containing `index.md` and
its own images. Nothing goes in `public/`.

```
src/content/blog/some-new-post/
  index.md
  hero.png
```

Frontmatter is validated by `src/content.config.ts`; the build fails loudly if
a field is missing or the wrong type. `heroImage` is a path relative to the
markdown, so it runs through Astro's asset pipeline and gets WebP conversion,
a `srcset` and intrinsic dimensions for free.

Eats posts additionally require `location`, `dateOfVisit` and `rating`, and can
declare a `gallery` list that renders as a grid at the bottom of the page.

Watches entries are one flat markdown file each in `src/content/watches/`, with
no body. See the README in that folder.

## Images inside a post

There is a small layout system for images in the article body: floats that text
wraps around, tiled rows, captions, height caps for very long screenshots, and
a click-to-zoom viewer. It is driven entirely by markdown, no MDX.

See [docs/images-in-posts.md](docs/images-in-posts.md).

## Things worth knowing

- **Fonts are self-hosted** in `public/fonts/`. Excalifont is the sketch face,
  Roboto the readable one. Posts have a toggle between them, remembered in
  `localStorage`.
- **Page transitions** use the native CSS View Transitions API, not Astro's
  client router, so every page stays a plain static document and per-page
  inline scripts keep working.
- **The contact form has no backend.** It builds a `mailto:` link and hands it
  to the visitor's mail client.
- **Card border shapes are seeded off the post slug** (`src/lib/handdrawn.ts`),
  so they stay stable across builds instead of reshuffling on every deploy.
- **Sitemap `lastmod`** comes from real frontmatter dates, read at build time by
  `src/lib/content-dates.mjs`.

## Credit

Originally based on the Astro blog starter, which in turn borrowed from
[Bear Blog](https://github.com/HermanMartinus/bearblog/). Very little of either
is left.
