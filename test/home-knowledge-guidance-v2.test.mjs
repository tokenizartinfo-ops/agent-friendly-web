import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const scanSource = readFileSync(new URL('../app/components/scan-workspace.tsx', import.meta.url), 'utf8');
const mapSource = readFileSync(new URL('../app/components/maturity-map.tsx', import.meta.url), 'utf8');
const demonstratorSource = readFileSync(new URL('../app/components/maturity-demonstrator.tsx', import.meta.url), 'utf8');
const evolutionSource = readFileSync(new URL('../app/evolucion-agentica/page.tsx', import.meta.url), 'utf8');
const comicIntro = readFileSync(new URL('../app/components/comic-home-intro.tsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

test('home reference is dated, accurate and bounded', async () => {
  const { PUBLIC_READINESS_REFERENCE } = await import('../lib/public-readiness-reference.mjs');

  assert.equal(PUBLIC_READINESS_REFERENCE.target, 'agentfriendlyweb.dev');
  assert.equal(PUBLIC_READINESS_REFERENCE.score, 95);
  assert.equal(PUBLIC_READINESS_REFERENCE.measuredAt, '2026-08-31');
  assert.equal(
    Object.values(PUBLIC_READINESS_REFERENCE.categories).reduce((sum, category) => sum + category.score, 0),
    PUBLIC_READINESS_REFERENCE.score,
  );
  assert.deepEqual(PUBLIC_READINESS_REFERENCE.categories.commerce, {
    score: 0,
    weight: 5,
    status: 'not_detected',
  });
  assert.match(PUBLIC_READINESS_REFERENCE.boundary.es, /pagos|comercio/i);
  assert.match(scanSource, /PUBLIC_READINESS_REFERENCE\.score/);
  assert.match(scanSource, /PUBLIC_READINESS_REFERENCE\.measuredAt/);
  assert.match(scanSource, /PUBLIC_READINESS_REFERENCE\.categories\[id\]/);
  assert.match(scanSource, /copy\.referenceBreakdown/);
  assert.doesNotMatch(scanSource, /result \? `\$\{category\.score\}\/\$\{category\.weight\}` : copy\.pending/);
  assert.doesNotMatch(scanSource, /:\s*'70'/);
});

test('maturity cards link to real AF anchors without preset completion', () => {
  assert.match(mapSource, /localizedPath\('evolution', locale, \{ hash: `af-\$\{index\}` \}\)/);
  assert.match(mapSource, /<a[^>]*href=\{stageHref\}/);
  assert.doesNotMatch(styles, /\.maturity-track li\[data-stage=['"]3['"]\]/);
  assert.doesNotMatch(mapSource, /index <= 3/);

  assert.ok(evolutionSource.includes('id={`af-${index}`}'));
  assert.match(evolutionSource, /no es automatic|not automatic|não é automátic/i);
});

test('comparison begins with the restaurant at AF-2', () => {
  assert.match(demonstratorSource, /useState<ScenarioId>\(['"]restaurant['"]\)/);
  assert.match(demonstratorSource, /const \[stageId, setStageId\] = useState\(2\)/);
});

test('hero renders the complete call illustration as semantic content', () => {
  assert.match(comicIntro, /<img[\s\S]*className="comic-call-art"/);
  assert.match(comicIntro, /src="\/images\/agent-friendly-call-robots\.webp"/);
  assert.match(comicIntro, /alt=\{copy\.heroAlt\}/);
  assert.doesNotMatch(styles, /\.comic-call-hero::before\s*\{/);
  assert.match(styles, /\.comic-call-art\s*\{[^}]*object-fit:\s*contain/s);
});
