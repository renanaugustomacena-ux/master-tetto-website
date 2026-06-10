import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mastertetto.it',
  base: '/',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/privacy/') && !page.includes('/cookie/') && !page.includes('/404'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    assetsInclude: ['**/*.glsl'],
  },
});
