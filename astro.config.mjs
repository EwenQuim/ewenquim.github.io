import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import prefetch from "@astrojs/prefetch";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://reblog.quimerch.com",
	prefetch: true,
	integrations: [
		mdx(),
		sitemap(),
		react(),
		prefetch(),
		robotsTxt({ policy: [{ userAgent: "*", allow: "/" }] }),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
