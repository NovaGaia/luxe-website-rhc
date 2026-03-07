// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { createReadStream, existsSync, statSync } from 'fs';
import { join, extname, resolve } from 'path';
import { fileURLToPath } from 'url';

const isCI = !!process.env.GITHUB_ACTIONS;
const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const assetsImagesDir = join(projectRoot, 'src', 'assets', 'images');

/**
 * Plugin Vite (dev uniquement) : sert src/assets/images/ à l'URL /images/
 * Permet à CustomImage.tsx (chemin dev/useTina) d'accéder aux images
 * stockées dans src/assets/ au lieu de public/.
 */
const devImagesPlugin = {
  name: 'dev-assets-images',
  apply: /** @type {'serve'} */ ('serve'),
  configureServer(/** @type {any} */ server) {
    server.middlewares.use('/images', (/** @type {any} */ req, /** @type {any} */ res, /** @type {any} */ next) => {
      const url = (req.url ?? '/').split('?')[0].replace(/^\//, '');
      const filePath = resolve(assetsImagesDir, url);
      // Sécurité : s'assurer que le chemin reste dans assetsImagesDir
      if (!filePath.startsWith(assetsImagesDir)) { next(); return; }
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const mimeTypes = /** @type {Record<string, string>} */ ({
          '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
          '.png': 'image/png', '.gif': 'image/gif',
          '.webp': 'image/webp', '.svg': 'image/svg+xml', '.avif': 'image/avif',
        });
        res.setHeader('Content-Type', mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream');
        createReadStream(filePath).pipe(res);
      } else {
        next();
      }
    });
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://novagaia.github.io',
  // base actif uniquement en CI (GitHub Pages) — à supprimer quand un domaine custom sera configuré
  base: isCI ? '/luxe-website-rhc' : undefined,

  output: 'static',

  vite: {
    plugins: [tailwindcss(), devImagesPlugin],
  },

  integrations: [react(), mdx()],
});
