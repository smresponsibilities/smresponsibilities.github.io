// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://shivammahajan.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => {
        // Exclude paginated subpages (/2/, /3/ etc.) - canonical root pages are indexed
        if (/\/blog\/archive\/[^\/]+\/\d+\/?$/.test(page)) return false;
        // Exclude test previews and prototypes
        if (page.includes('/timelines')) return false;
        if (page.includes('/casing-proto')) return false;
        if (page.includes('/generation-device')) return false;
        return true;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
});
