import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function showcaseWorker() {
  return {
    name: 'showcase-worker',
    apply: 'build',
    async generateBundle(_, bundle) {
      const worker = await readFile(new URL('./scripts/showcase-worker.js', import.meta.url), 'utf8');
      const publicPaths = [
        'manifest.webmanifest', 'sankofa-icon-192.png', 'sankofa-icon-512.png', 'sankofa-digital-hero.webp',
        'docs/introduction.html', 'docs/installation.html', 'docs/security-boundaries.html',
      ];
      const paths = [...new Set([...Object.keys(bundle), 'index.html', ...publicPaths])].sort();
      const hash = createHash('sha256').update(worker);
      for (const file of Object.values(bundle)) hash.update(file.type === 'chunk' ? file.code : file.source);
      for (const path of publicPaths) hash.update(await readFile(new URL('./public/' + path, import.meta.url)));
      const version = hash.digest('hex').slice(0, 16);
      this.emitFile({
        type: 'asset', fileName: 'service-worker.js',
        source: 'const BUILD = ' + JSON.stringify({ paths, version }) + ';\n' + worker,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), showcaseWorker()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  server: {
    port: 5174,
  },
});
