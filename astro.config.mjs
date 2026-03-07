// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

const isCI = !!process.env.GITHUB_ACTIONS;

// https://astro.build/config
export default defineConfig({
  site: 'https://novagaia.github.io',
  // base actif uniquement en CI (GitHub Pages) — à supprimer quand un domaine custom sera configuré
  base: isCI ? '/luxe-website-rhc' : undefined,

  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), mdx()],
});
