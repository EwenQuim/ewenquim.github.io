import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://ewenquim.github.io",
	prefetch: true,
	integrations: [
		mdx(),
		sitemap(),
		react(),
		robotsTxt({ policy: [{ userAgent: "*", allow: "/" }] }),
	],
	vite: {
		plugins: [tailwindcss()],
		build: {
			sourcemap: true,
		},
	},
});
