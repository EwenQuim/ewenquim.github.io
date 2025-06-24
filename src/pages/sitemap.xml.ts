import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
	const articles = await getCollection("articles");
	const projects = await getCollection("projects");
	const nouvelles = await getCollection("nouvelles");
	const thoughts = await getCollection("thoughts");

	const siteUrl = (site?.toString() || "https://ewen.quimerch.com").replace(
		/\/$/,
		"",
	);

	// Static pages
	const staticPages = [
		"",
		"contact",
		"articles",
		"projects",
		"nouvelles",
		"thoughts",
		"tag",
	];

	// Get all tags from content
	const allTags = new Set<string>();
	for (const item of [...articles, ...projects, ...thoughts]) {
		if (item.data.tags) {
			for (const tag of item.data.tags) {
				allTags.add(tag);
			}
		}
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${siteUrl}${page ? `/${page}/` : ""}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" || page === "articles" || page === "projects" ? "0.9" : "0.7"}</priority>
  </url>`,
	)
	.join("\n")}
${articles
	.map(
		(article) => `  <url>
    <loc>${siteUrl}/articles/${article.slug}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
	)
	.join("\n")}
${projects
	.map(
		(project) => `  <url>
    <loc>${siteUrl}/projects/${project.slug}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
	)
	.join("\n")}
${nouvelles
	.map(
		(nouvelle) => `  <url>
    <loc>${siteUrl}/nouvelles/${nouvelle.slug}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
	)
	.join("\n")}
${thoughts
	.map(
		(thought) => `  <url>
    <loc>${siteUrl}/thoughts/${thought.slug}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
	)
	.join("\n")}
${Array.from(allTags)
	.map(
		(tag) => `  <url>
    <loc>${siteUrl}/tag/${encodeURIComponent(tag)}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
};
