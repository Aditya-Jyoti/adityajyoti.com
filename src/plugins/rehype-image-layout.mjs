/**
 * rehype-image-layout
 * -------------------
 * Gives markdown posts real control over how images sit in the text, without
 * needing MDX or any component imports. Everything is driven by a `{...}`
 * marker at the end of the alt text, which is stripped before it reaches the
 * HTML so alt stays clean for screen readers and search engines.
 *
 *   ![a plate of dal bafle](./x.jpg)                 → default, centred, height-capped
 *   ![the plan {right}](./x.jpg)                     → floats right, text wraps around it
 *   ![the plan {left}](./x.jpg)                      → floats left
 *   ![the spread {wide}](./x.jpg)                    → forced to full column width
 *   ![a receipt {small}](./x.jpg)                    → 55% width, centred
 *   ![a long screenshot {tall}](./x.jpg)             → hard height cap for very tall images
 *   ![a plate](./x.jpg "the dal bafle thali")        → title becomes a caption
 *
 * Two or more images in the *same* markdown paragraph are tiled into a grid:
 *
 *   ![one](./1.jpg) ![two](./2.jpg) ![three](./3.jpg)
 *
 * On top of that it does two mechanical chores for images living in `public/`
 * (which Astro's asset pipeline never touches): it stamps intrinsic
 * width/height so they can't shift the layout while loading, and it upgrades
 * them to a <picture> when a sibling .webp exists.
 *
 * Runs before Astro's own rehypeImages(), so collection-relative images are
 * still plain <img> nodes here. Moving those nodes around is fine; adding
 * classes to them is not (rehypeImages hoists every property into a JSON blob),
 * which is why all styling hooks live on the wrapping <figure>.
 */
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MARKER_RE = /\s*\{([^{}]+)\}\s*$/;

/** Markers understood in alt text. Anything else is left alone as real alt. */
const LAYOUTS = new Set(["left", "right", "wide", "full", "small", "tall", "plain"]);

const PUBLIC_DIR = path.resolve("public");

/** Depth-first walk over hast element nodes. Kept local so the plugin has no
    dependency beyond what Astro already installs. */
function walk(node, visitor, parent = null, index = null) {
  if (node.type === "element" || node.type === "root") {
    if (node.type === "element") visitor(node, index, parent);
    const children = node.children ?? [];
    for (let i = 0; i < children.length; i++) {
      walk(children[i], visitor, node, i);
    }
  }
}

/** Cache probes across the whole build, since the same image often repeats. */
const dimensionCache = new Map();

function probe(src) {
  if (dimensionCache.has(src)) return dimensionCache.get(src);

  const promise = (async () => {
    // Only local, root-relative paths point at public/.
    if (!src.startsWith("/") || src.startsWith("//")) return null;
    const file = path.join(PUBLIC_DIR, decodeURI(src).split("?")[0]);
    if (!file.startsWith(PUBLIC_DIR) || !existsSync(file)) return null;
    try {
      const { width, height } = await sharp(file).metadata();
      if (!width || !height) return null;
      return { width, height };
    } catch {
      return null;
    }
  })();

  dimensionCache.set(src, promise);
  return promise;
}

/** A sibling .webp next to a .png/.jpg in public/ is used as a <source>. */
function webpSibling(src) {
  if (!/\.(png|jpe?g)$/i.test(src)) return null;
  const webp = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const file = path.join(PUBLIC_DIR, decodeURI(webp));
  if (!file.startsWith(PUBLIC_DIR) || !existsSync(file)) return null;
  try {
    return statSync(file).isFile() ? webp : null;
  } catch {
    return null;
  }
}

function parseAlt(raw) {
  const alt = typeof raw === "string" ? raw : "";
  const match = MARKER_RE.exec(alt);
  if (!match) return { alt, layouts: [] };

  const tokens = match[1]
    .split(/[\s,|]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  // A stray `{...}` that isn't a layout marker is part of the alt text.
  if (tokens.length === 0 || !tokens.every((t) => LAYOUTS.has(t))) {
    return { alt, layouts: [] };
  }

  return { alt: alt.slice(0, match.index).trim(), layouts: tokens };
}

const el = (tagName, properties, children = []) => ({
  type: "element",
  tagName,
  properties,
  children,
});

const isBlank = (node) =>
  node.type === "text" ? node.value.trim() === "" : node.type === "comment";

const isImage = (node) => node.type === "element" && node.tagName === "img";

/**
 * Wrap one <img> in a <figure>, pulling the caption out of the title attribute
 * and swapping in a <picture> when a webp sibling is available.
 */
/**
 * How wide the image actually renders, so the browser can pick the smallest
 * file that still looks sharp. Mirrors the widths in post.css.
 */
function sizesFor(layouts, tiled) {
  if (tiled) return "(min-width: 1024px) 270px, 45vw";
  if (layouts.includes("left") || layouts.includes("right")) {
    return "(min-width: 1024px) 350px, 100vw";
  }
  if (layouts.includes("small")) return "(min-width: 1024px) 420px, 75vw";
  return "(min-width: 1024px) 840px, 100vw";
}

/** Collection-relative images go through Astro's pipeline; public/ ones don't. */
const isPipelineImage = (src) =>
  Boolean(src) && !src.startsWith("/") && !/^[a-z]+:/i.test(src);

function buildFigure(img, { extraClass = "" } = {}) {
  const { alt, layouts } = parseAlt(img.properties?.alt);
  img.properties.alt = alt;

  const caption = img.properties.title;
  delete img.properties.title;

  img.properties.loading ??= "lazy";
  img.properties.decoding ??= "async";

  const src = typeof img.properties.src === "string" ? img.properties.src : "";

  // These reach getImage() via Astro's rehypeImages, which turns them into a
  // real srcset. Meaningless for public/ images, which skip the pipeline.
  if (isPipelineImage(src)) {
    img.properties.widths = [400, 800, 1200];
    img.properties.sizes = sizesFor(layouts, extraClass === "tile-figure");
  }

  const webp = webpSibling(src);
  const media = webp
    ? el("picture", {}, [
        el("source", { srcset: webp, type: "image/webp" }),
        img,
      ])
    : img;

  const classNames = [
    "post-figure",
    ...layouts.map((l) => `fig-${l}`),
    extraClass,
  ].filter(Boolean);

  const children = [media];
  if (caption) {
    children.push(el("figcaption", {}, [{ type: "text", value: caption }]));
  }

  return {
    figure: el("figure", { className: classNames }, children),
    layouts,
  };
}

export default function rehypeImageLayout() {
  return async function transformer(tree) {
    const pending = [];
    const replacements = [];

    walk(tree, (node, index, parent) => {
      if (node.tagName !== "p" || !parent || index === null) return;

      const meaningful = node.children.filter((c) => !isBlank(c));
      if (meaningful.length === 0 || !meaningful.every(isImage)) return;

      if (meaningful.length === 1) {
        const { figure } = buildFigure(meaningful[0]);
        replacements.push({ parent, index, nodes: [figure] });
        return;
      }

      // Several images in one paragraph → a tile grid.
      const figures = meaningful.map(
        (img) => buildFigure(img, { extraClass: "tile-figure" }).figure
      );
      const count = Math.min(figures.length, 3);
      replacements.push({
        parent,
        index,
        nodes: [
          el("div", { className: ["img-tile", `img-tile-${count}`] }, figures),
        ],
      });
    });

    // Apply back-to-front so earlier indices stay valid.
    for (const { parent, index, nodes } of replacements.reverse()) {
      parent.children.splice(index, 1, ...nodes);
    }

    // Images that weren't in an image-only paragraph still want their alt
    // markers stripped and their public/ dimensions filled in.
    walk(tree, (node) => {
      if (!isImage(node)) return;
      if (typeof node.properties?.alt === "string") {
        node.properties.alt = parseAlt(node.properties.alt).alt;
      }
      const src = node.properties?.src;
      if (typeof src !== "string") return;
      if (node.properties.width && node.properties.height) return;
      pending.push(
        probe(src).then((dim) => {
          if (!dim) return;
          node.properties.width = dim.width;
          node.properties.height = dim.height;
        })
      );
    });

    await Promise.all(pending);
  };
}
