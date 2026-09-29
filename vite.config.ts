import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/content/site';
import { validateContent } from './scripts/content-validation';
import { parseContent, projectSchema, contributionSchema } from './src/lib/content-schema';

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

export default defineConfig(({ command, isPreview }) => {
  const customDomain = process.env.CUSTOM_DOMAIN === 'true';
  const base = (command === 'build' || isPreview) && !customDomain ? '/portfolio/' : '/';

  return {
    plugins: [
      react(),
      {
        name: 'portfolio-content',
        enforce: 'pre',
        // Validate on the server and emit plain data, with errors in Vite's overlay.
        load(id) {
          if (!/\/src\/content\/(projects|contributions)\/[^/]+\.md$/.test(id)) return null;
          validateContent();
          const schema = id.includes('/projects/') ? projectSchema : contributionSchema;
          const entry = parseContent(readFileSync(id, 'utf8'), id, schema);
          return `export default ${JSON.stringify(entry)};`;
        },
        transformIndexHtml(html) {
          return html.replace('%SITE_TITLE%', escapeHtml(site.pageTitle)).replace('%SITE_DESCRIPTION%', escapeHtml(site.description));
        },
        closeBundle() {
          if (command !== 'build') return;
          const target = resolve('dist/404.html');
          const segments = base.split('/').filter(Boolean).length;
          writeFileSync(target, readFileSync(target, 'utf8').replace('var pathSegmentsToKeep = 0;', `var pathSegmentsToKeep = ${segments};`));
        },
      },
    ],
    base,
    define: {
      'import.meta.env.VITE_CUSTOM_DOMAIN': JSON.stringify(customDomain ? 'true' : 'false'),
    },
  };
});
