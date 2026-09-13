# Images inside a post

Everything here works in plain `.md` files in `src/content/blog` (Writes) and
`src/content/khana` (Eats). No imports, no MDX. It is handled by
`src/plugins/rehype-image-layout.mjs`.

## The basics

```md
![what the picture shows](./imgs/thali.jpg)
```

By default an image is centred, never wider than the text column, and never
taller than 72% of the screen. That last bit is the fix for very long
screenshots: they used to shove the rest of the post off the bottom of the
page. Now they shrink, and clicking one opens it full size in a viewer you can
scroll.

## Captions

The quoted bit after the URL becomes a caption under the image:

```md
![dal bafle thali](./imgs/lunch.jpg "the thali at Rajhans, worth every rupee")
```

## Layouts

Add a `{...}` marker at the end of the alt text. It is stripped out before the
page is written, so the alt stays clean for screen readers and Google.

| Marker    | What it does                                                    |
| :-------- | :-------------------------------------------------------------- |
| `{right}` | Floats right at 42% width, text wraps around it                  |
| `{left}`  | Same, on the left                                                |
| `{wide}`  | Stretches to the full text column                                |
| `{small}` | 55% width, centred. Good for receipts, logos, tiny screenshots   |
| `{tall}`  | A harder height cap (60% of screen) for very long screenshots    |
| `{plain}` | Drops the border and rounded corners                             |

```md
![a list of things to try at Sarafa {right}](./imgs/sarafa.png "the shortlist")

This paragraph, and the ones after it, wrap around that image instead of
leaving a big empty gap next to it.
```

Markers can be combined: `{right small}`, `{wide plain}`.

Floats turn back into normal centred images below 720px wide, because wrapping
text around a 42% image on a phone is unreadable.

## Tiling

Put two or three images in the **same paragraph** (no blank line between them)
and they become a tiled row:

```md
![the starter](./imgs/1.jpg) ![the main](./imgs/2.jpg) ![the dessert](./imgs/3.jpg)
```

This also works with each image on its own line, as long as there is no blank
line separating them:

```md
![the starter](./imgs/1.jpg)
![the main](./imgs/2.jpg)
```

Tiles stay tiled on mobile. Three-up rows drop to two columns on narrow
screens, and the odd one out spans the full width.

A blank line between images means "these are separate images", and they stack
normally.

## Where the files go

Every post is a folder. The markdown is always `index.md`, and its images sit
right next to it:

```
src/content/blog/how-i-runied-a-startup/
  index.md
  hero.png
  architecture.png
  linkedin-post.png

src/content/khana/indore/
  index.md
  hero.jpeg
  plan.png
  breakfast.jpg
  lunch.jpg
  sarafa.png
  gallery/
    1.jpg ... 6.jpg
```

Rules that keep this predictable:

- **The folder name is the URL.** `how-i-runied-a-startup/` serves at
  `/blog/writes/how-i-runied-a-startup/`. Renaming the folder changes the URL
  and breaks every existing link to it, so don't, unless you also add a
  redirect.
- **The markdown is always `index.md`.** Astro strips `/index` from the slug.
- **The hero is always `hero.<ext>`**, referenced as `heroImage: "./hero.png"`.
- **Other images get descriptive names**, referenced as `./architecture.png`.
- **Gallery photos live in `gallery/`** (eats posts only), referenced as
  `./gallery/1.jpg`.

Because everything is inside the collection, Astro's asset pipeline handles it:
each image is converted to WebP, resized into a `srcset`, and given intrinsic
dimensions so nothing shifts while loading. Nothing belongs in `public/`
anymore; images there skip all of that.

## Alt text

Write what is actually in the picture, not the filename. `![linkedin_post]` is
worth nothing; `![LinkedIn post arguing a startup under $300K ARR running five
microservices is burning runway]` is what puts the image in Google Images and
what a screen reader reads out.
