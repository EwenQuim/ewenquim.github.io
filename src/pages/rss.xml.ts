import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context: { site: string }) {
	// Get all content from different collections
	const articles = await getCollection("articles");
	const nouvelles = await getCollection("nouvelles");
	const projects = await getCollection("projects");

	// Combine all posts and add collection type to each
	const allPosts = [
		...articles.map((post) => ({ ...post, collection: "articles" })),
		...nouvelles.map((post) => ({ ...post, collection: "nouvelles" })),
		...projects.map((post) => ({ ...post, collection: "projects" })),
	];

	// Sort by publication date (newest first)
	const sortedPosts = allPosts
		.filter((post) => post.data.pubDate) // Only include posts with publication dates
		.sort((a, b) => {
			const dateA = a.data.pubDate ? new Date(a.data.pubDate) : new Date(0);
			const dateB = b.data.pubDate ? new Date(b.data.pubDate) : new Date(0);
			return dateB.getTime() - dateA.getTime();
		});

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			description:
				post.data.description || `${post.data.title} - ${post.collection}`,
			pubDate: post.data.pubDate,
			link: `/${post.collection}/${post.id.replace(/\.(md|mdx)$/, "")}/`,
		})),
		customData: "<language>fr-fr</language>",
	});
}
