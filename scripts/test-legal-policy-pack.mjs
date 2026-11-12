import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const out = resolve(root, 'examples/legal-policy-pack');
const config = JSON.parse(await readFile(resolve(out, 'config.json'), 'utf8'));
const markdown = await readFile(resolve(out, 'legal-policy-handbook.md'), 'utf8');
const html = await readFile(resolve(out, 'legal-policy-handbook.html'), 'utf8');

for (const field of ['projectName', 'websiteUrl', 'legalEntityName', 'contactEmail', 'address', 'effectiveDate', 'version', 'governingLaw', 'privacyContact']) {
  assert.ok(config[field], `missing required field: ${field}`);
}
for (const heading of ['Privacy Policy and POPIA Notice', 'Terms and Conditions', 'E-commerce, Payments, Delivery, Returns and Refunds', 'Cookie Policy', 'Website Disclaimer', 'Accessibility Statement', 'Contact and Complaints', 'PAIA Information Access']) {
  assert.match(markdown, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(html, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}
assert.match(markdown, /Legal review required/);
assert.match(html, /viewport/);
assert.match(markdown, /# Example South African Store Legal Policy Handbook/);
console.log('Legal policy pack checks passed.');
