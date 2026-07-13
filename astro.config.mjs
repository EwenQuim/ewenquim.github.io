import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
	site: "https://ewen.quimerch.com",
	prefetch: true,
	image: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "miro.medium.com" },
			{ protocol: "https", hostname: "media.tenor.com" },
			{ protocol: "https", hostname: "images.theconversation.com" },
			{ protocol: "https", hostname: "cdn.pixabay.com" },
			{ protocol: "https", hostname: "i.guim.co.uk" },
			{ protocol: "https", hostname: "raw.githubusercontent.com" },
			{ protocol: "https", hostname: "cdn4.telegram-cdn.org" },
			{ protocol: "https", hostname: "play-lh.googleusercontent.com" },
		],
	},
	integrations: [
		mdx(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
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
				return item;
			}
		}),
		react(),
		robotsTxt({
			policy: [{ userAgent: "*", allow: "/" }],
			sitemap: true
		}),
		pagefind(),
		AstroPWA({
			mode: "production",
			base: "/",
			scope: "/",
			includeAssets: ["favicon.svg"],
			registerType: "autoUpdate",
			manifest: {
				name: "Ewen Quimerc'h - Blog",
				short_name: "Ewen's Blog",
				description: "Personal blog about software development, technology, and thoughts",
				theme_color: "#faf6ef",
				background_color: "#faf6ef",
				display: "standalone",
				orientation: "portrait",
				scope: "/",
				start_url: "/",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png"
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any"
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable"
					}
				]
			},
			workbox: {
				navigateFallback: "/404",
				globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"]
			},
			devOptions: {
				enabled: false,
				navigateFallbackAllowlist: [/^\/$/]
			},
			experimental: {
				directoryAndTrailingSlashHandler: true
			}
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		build: {
			sourcemap: true,
		},
	},
});
