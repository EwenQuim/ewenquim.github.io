import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: "https://reblog.quimerch.com",
  integrations: [mdx(), sitemap(), react(), tailwind(), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), prefetch()]
});