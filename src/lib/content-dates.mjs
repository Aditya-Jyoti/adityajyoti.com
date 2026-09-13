/**
 * Reads the real publish/update dates straight off the markdown frontmatter,
 * keyed by the URL Astro will generate for each entry.
 *
 * The sitemap integration runs outside the content collection API, so it can't
 * call getCollection(). Stamping every URL with the build time instead is
 * actively harmful: it tells Google the whole site changed on every deploy,
 * and it stops trusting lastmod entirely. Reading the files is the honest fix.
 *
 * Anything this can't resolve simply gets no lastmod, which is better than a
 * wrong one.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/** Matches Astro's glob loader, which slugifies the filename. */
function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function frontmatterDate(source, keys) {
  for (const key of keys) {
    const match = new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, "m").exec(
      source
    );
    if (!match) continue;
    const date = new Date(match[1].trim());
    if (!Number.isNaN(date.valueOf())) return date;
  }
  return null;
}

function collect(dir, urlPrefix, keys) {
  const dates = new Map();
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return dates;
  }

  for (const entry of entries) {
    if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue;
    if (entry.name === "README.md") continue;

    const source = readFileSync(path.join(dir, entry.name), "utf8");
    const date = frontmatterDate(source, keys);
    if (!date) continue;

    const slug = slugify(entry.name.replace(/\.mdx?$/, ""));
    dates.set(`${urlPrefix}${slug}/`, date.toISOString());
  }

  return dates;
}

const newest = (dates) =>
  dates.size > 0 ? [...dates.values()].sort().at(-1) : null;

export function contentLastmod() {
  const writes = collect("./src/content/blog", "/blog/writes/", [
    "updatedDate",
    "pubDate",
  ]);
  const eats = collect("./src/content/khana", "/blog/eats/", [
    "updatedDate",
    "pubDate",
  ]);

  const map = new Map([...writes, ...eats]);

  // An index page is as fresh as the newest thing on it.
  const newestWrites = newest(writes);
  const newestEats = newest(eats);
  const newestOverall = newest(map);

  if (newestWrites) map.set("/blog/writes/", newestWrites);
  if (newestEats) map.set("/blog/eats/", newestEats);
  if (newestOverall) {
    map.set("/blog/", newestOverall);
    map.set("/", newestOverall);
  }

  return map;
}
