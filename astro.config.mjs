import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
	site: "https://ewenquim.github.io",
	prefetch: true,
	integrations: [
		mdx(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
			serialize(item) {
				// Set higher priority for main pages
				if (item.url.endsWith('/') || item.url.includes('/articles/') || item.url.includes('/projects/')) {
					item.priority = 0.9;
					item.changefreq = 'weekly';
				}
				// Lower priority for tag pages
				if (item.url.includes('/tag/')) {
					item.priority = 0.5;
					item.changefreq = 'monthly';
				}
				// Set lastmod for content pages
				if (item.url.includes('/articles/') || item.url.includes('/projects/') || item.url.includes('/nouvelles/') || item.url.includes('/thoughts/')) {
					item.lastmod = new Date().toISOString();
				}
				return item;
			}
		}),
		react(),
		robotsTxt({
			policy: [{ userAgent: "*", allow: "/" }],
			sitemap: true
		}),
		pagefind(),
	],
	vite: {
		plugins: [tailwindcss()],
		build: {
			sourcemap: true,
		},
	},
});
