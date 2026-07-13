import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const articles = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/articles" }),
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
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/nouvelles" }),
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
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/projects" }),
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
			website: z.url().optional(),
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
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/thoughts" }),
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
