import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

import { crawlerCatalogPayload } from '../lib/crawler-catalog.mjs';
import { compareReadinessSnapshots, normalizeReadinessSnapshot } from '../lib/readiness-comparison.mjs';
import { SECTOR_CONTENT } from '../lib/sector-content.mjs';

test('sector guidance is available in Spanish, English and Portuguese', () => {
  for (const locale of ['es', 'en', 'pt']) {
    const content = SECTOR_CONTENT[locale];
    assert.ok(content, `missing ${locale} content`);
    assert.ok(content.title.length > 30);
    assert.ok(content.sectors.length >= 5);
    assert.ok(content.sectors.every((sector) => sector.audience && sector.value && sector.firstStep));
  }
});

test('crawler catalog publishes an explicit source review window', () => {
  const payload = crawlerCatalogPayload();
  assert.equal(payload.sourceReview.status, 'current');
  assert.equal(payload.sourceReview.cadenceDays, 30);
  assert.match(payload.sourceReview.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(payload.sourceReview.nextReviewAt, /^\d{4}-\d{2}-\d{2}$/);
});

test('readiness comparison stays bounded and separates evidence from ranking', () => {
  const baseline = normalizeReadinessSnapshot({ score: -8, evidenceCount: 2, observedAt: '2026-08-01' });
  const current = normalizeReadinessSnapshot({ score: 114, evidenceCount: 9, observedAt: '2026-08-27' });
  const result = compareReadinessSnapshots(baseline, current);

  assert.equal(baseline.score, 0);
  assert.equal(current.score, 100);
  assert.equal(result.scoreDelta, 100);
  assert.equal(result.evidenceDelta, 7);
  assert.equal(result.claimType, 'evidence_comparison');
  assert.equal(result.guaranteesRanking, false);
  assert.equal(result.persistsInput, false);
});

test('Block 2 public routes and machine contract exist', async () => {
  const files = [
    'app/sectores/page.tsx',
    'app/en/sectors/page.tsx',
    'app/pt/setores/page.tsx',
    'app/medir-mejora/page.tsx',
    'public/.well-known/readiness-comparison-contract.json',
  ];

  for (const file of files) {
    assert.equal(await stat(file).then(() => true).catch(() => false), true, `${file} must exist`);
  }

  const sitemap = await readFile('app/sitemap.ts', 'utf8');
  for (const route of ['/sectores', '/en/sectors', '/pt/setores', '/medir-mejora']) {
    assert.ok(sitemap.includes(route), `sitemap is missing ${route}`);
  }
});
