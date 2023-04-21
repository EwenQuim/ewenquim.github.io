import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function get(context: { site: string }) {
  const posts = await getCollection("articles");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    })),
  });
}
