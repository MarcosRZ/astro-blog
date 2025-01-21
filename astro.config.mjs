// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://marcosrz-astro-blog.netlify.app/",
  integrations: [preact(), tailwind(), sitemap({lastmod: new Date()})]
});