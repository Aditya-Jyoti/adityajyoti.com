import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

/**
 * One combined feed for Writes and Eats. Watches are left out on purpose,
 * they're a log rather than published posts.
 */
export async function GET(context) {
  const writes = await getCollection("blog");
  const eats = await getCollection("khana");

  const items = [
    ...writes.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/writes/${post.id}/`,
      categories: ["writes"],
    })),
    ...eats.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/eats/${post.id}/`,
      categories: ["eats", post.data.location].filter(Boolean),
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
    customData: [
      "<language>en-in</language>",
      "<managingEditor>website@adityajyoti.in (Aditya Jyoti)</managingEditor>",
      "<webMaster>website@adityajyoti.in (Aditya Jyoti)</webMaster>",
    ].join(""),
  });
}
