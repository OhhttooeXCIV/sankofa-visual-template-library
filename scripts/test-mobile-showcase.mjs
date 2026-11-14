import assert from 'node:assert/strict';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve, sep } from 'node:path';
import { chromium } from 'playwright-core';
import { COMPONENT_REGISTRY } from '../src/library/docs/registry.js';

const directory = resolve('dist');
let workerVersion = 1;
const server = createServer(async (request, response) => {
  const { pathname } = new URL(request.url, 'http://localhost');
  const file = resolve(directory, '.' + (pathname === '/' ? '/index.html' : pathname));
  const contentTypes = { html: 'text/html', js: 'text/javascript', css: 'text/css',
    webmanifest: 'application/manifest+json', webp: 'image/webp', png: 'image/png' };
  try {
    if (!file.startsWith(directory + sep)) throw new Error('Invalid path');
    const content = await readFile(file);
    response.setHeader('Content-Type', contentTypes[file.split('.').at(-1)] ?? 'application/octet-stream');
    response.setHeader('Cache-Control', 'no-store');
    response.end(pathname === '/service-worker.js'
      ? String(content).replace(/"version":"([^"]+)"/, `"version":"$1-test-${workerVersion}"`)
      : content);
  } catch {
    response.statusCode = 404;
    response.end();
  }
}).listen(0, '127.0.0.1');

const browserPath = process.env.CHROMIUM_PATH;
let browser;
try {
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ executablePath: browserPath, headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({
    viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true,
    reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'],
  });
  context.setDefaultTimeout(10000);
  await context.route(/https:\/\//, (route) => route.abort());
  let page = await context.newPage();
  await page.goto(origin);
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await page.getByRole('link', { name: 'Components', exact: true }).click();
  await page.getByRole('searchbox').fill('scroll');
  let target = page.getByRole('link', { name: 'useScrollLock', exact: true });
  await target.waitFor();
  await page.getByRole('searchbox').fill('');
  await target.scrollIntoViewIfNeeded();
  const position = await page.evaluate(() => window.scrollY);
  assert.ok(position > 0, 'Test target should require scrolling');
  await target.click();
  await page.getByRole('tab', { name: /Export Code/ }).click();
  assert.match(page.url(), /component=use-scroll-lock.*tab=export/);
  await page.goBack();
  target = page.getByRole('link', { name: 'useScrollLock', exact: true });
  await target.waitFor();
  assert.equal(await target.evaluate((node) => node === document.activeElement), true);
  assert.ok(Math.abs((await page.evaluate(() => scrollY)) - position) < 40);
  await page.goForward();
  assert.equal(await page.getByRole('tab', { name: /Export Code/ }).getAttribute('aria-selected'), 'true');

  for (const { id } of COMPONENT_REGISTRY) {
    await page.goto(origin + '/?component=' + id);
    await page.getByRole('heading', { name: 'Interactive Playground' }).waitFor();
    await page.getByRole('status', { name: '' }).filter({ hasText: 'Loading preview…' }).waitFor({ state: 'hidden' });
    const width = await page.evaluate(() => ({ body: document.documentElement.scrollWidth, viewport: innerWidth }));
    assert.ok(width.body <= width.viewport + 1, `${id} overflows the mobile viewport (${width.body} > ${width.viewport})`);
  }
  console.log(`Checked all ${COMPONENT_REGISTRY.length} previews at 320px, plus browser history and scroll restoration.`);

  await page.goto(origin + '/?component=video-modal');
  await page.getByRole('button', { name: 'Save for offline' }).click();
  await page.getByText('Saved on this device.', { exact: true }).waitFor();
  await page.goto(origin + '/?component=button');
  await page.getByRole('button', { name: 'Save for offline' }).click();
  await page.getByText('Saved on this device.', { exact: true }).waitFor();
  await page.close();
  await context.setOffline(true);
  page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(origin + '/?view=saved');
  await page.getByRole('link', { name: 'Video Modal', exact: true }).click();
  await page.getByText(/this preview uses online media/i).waitFor();
  await page.getByRole('tab', { name: /Export Code/ }).click();
  await page.getByRole('button', { name: 'Copy Code' }).click();
  await page.getByRole('button', { name: 'Copied!' }).waitFor();
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /VideoModal/);
  await page.goto(origin + '/?component=button');
  await page.getByRole('button', { name: 'Primary action' }).waitFor();
  await page.goto(origin + '/?component=card');
  await page.getByText(/no offline copy of this component/i).waitFor();

  await context.setOffline(false);
  workerVersion = 2;
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    await registration.update();
    if (!registration.waiting) {
      await new Promise((complete) => {
        const worker = registration.installing;
        if (!worker) return complete();
        worker.addEventListener('statechange', () => {
          if (['installed', 'activated', 'redundant'].includes(worker.state)) complete();
        });
      });
    }
    if (!registration.waiting) throw new Error('Updated worker did not wait for open clients');
  });
  await page.goto('about:blank');
  await page.goto(origin + '/?view=saved');
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    if (registration.active.state !== 'activated') await new Promise((resolve) => {
      registration.active.addEventListener('statechange', resolve, { once: true });
    });
  });
  assert.ok((await page.evaluate(() => caches.keys())).some((key) => key.endsWith('-test-2')));
  await context.setOffline(true);
  await page.reload();
  await page.getByRole('link', { name: 'Video Modal', exact: true }).click();
  await page.getByRole('button', { name: 'Remove offline copy' }).click();
  await page.getByText('Offline copy removed.', { exact: true }).waitFor();
  await page.goto(origin + '/?view=saved');
  assert.equal(await page.getByRole('link', { name: 'Video Modal', exact: true }).count(), 0);
  await page.getByRole('link', { name: 'Button', exact: true }).click();
  await page.getByRole('button', { name: 'Remove offline copy' }).click();
  await page.getByText('Offline copy removed.', { exact: true }).waitFor();
  await page.goto(origin + '/?view=saved');
  await page.getByText(/saved copies will appear here/i).waitFor();
  assert.deepEqual(errors, []);
  console.log('Verified offline close and reopen, code copy, unsaved fallback, removal, and worker update with saved data.');
} finally {
  await browser?.close();
  server.close();
}
