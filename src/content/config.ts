import { defineCollection, z } from "astro:content";

const articles = defineCollection({
	type: "content",
	schema: z
		.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
			categories: z.array(z.string()).optional(),
			lang: z.string().optional(),
			tags: z.array(z.string()).optional(),
			toc: z.boolean().optional(),
		})
		.transform((data) => ({
			...data,
			pubDate: data.pubDate || data.date,
		})),
});

const nouvelles = defineCollection({
	type: "content",
	schema: z
		.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
		})
		.transform((data) => ({
			...data,
			pubDate: data.pubDate || data.date,
		})),
});

const projects = defineCollection({
	type: "content",
	schema: z
		.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
			github: z.string().optional(),
			playstore: z.string().optional(),
			category: z.enum(["pro", "open-source"]).optional(),
			website: z.string().url().optional(),
			type: z.string().optional(),
			tags: z.array(z.string()).optional(),
			categories: z.array(z.string()).optional(),
			lastmod: z.coerce.date().optional(),
			slug: z.string().optional(),
		})
		.transform((data) => ({
			...data,
			pubDate: data.pubDate || data.date,
		})),
});

const thoughts = defineCollection({
	type: "content",
	schema: z
		.object({
			title: z.string(),
			description: z.string().optional(),
			date: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			lastmod: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
			draft: z.boolean().optional(),
			categories: z.array(z.string()).optional(),
			tags: z.array(z.string()).optional(),
		})
		.transform((data) => ({
			...data,
			pubDate: data.pubDate || data.date,
			updatedDate: data.updatedDate || data.lastmod,
		})),
});

export const collections = {
	articles,
	nouvelles,
	projects,
	thoughts,
};
