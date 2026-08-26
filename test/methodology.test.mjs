import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildRoadmap,
  calculateReadiness,
  normalizePublicUrl,
} from '../lib/methodology.mjs';

test('normalizePublicUrl accepts public HTTP origins and normalizes the path', () => {
  assert.equal(normalizePublicUrl('tokenizart.com/docs'), 'https://tokenizart.com/docs');
  assert.equal(normalizePublicUrl('https://example.org/a?b=1'), 'https://example.org/a?b=1');
});

test('normalizePublicUrl rejects local, private and unsupported targets', () => {
  for (const value of [
    'file:///tmp/private',
    'http://localhost:3000',
    'http://127.0.0.1',
    'http://10.0.0.4',
    'http://192.168.1.20',
    'http://169.254.2.1',
    'https://user:secret@example.org',
    'https://example.org:8443',
  ]) {
    assert.throws(() => normalizePublicUrl(value), /publica|public/i);
  }
});

test('calculateReadiness keeps evidence separate from experimental capabilities', () => {
  const result = calculateReadiness({
    robots: true,
    sitemap: true,
    structuredData: true,
    llms: false,
    markdown: false,
    mcp: false,
    webmcp: false,
    payments: false,
  });

  assert.equal(result.score, 32);
  assert.equal(result.categories.discovery.score, 18);
  assert.equal(result.categories.answerability.score, 14);
  assert.equal(result.categories.tools.status, 'not_detected');
  assert.equal(result.categories.experimental.status, 'not_detected');
});

test('buildRoadmap recommends an external dossier when the owner controls neither origin nor DNS', () => {
  const roadmap = buildRoadmap({
    control: 'none',
    siteType: 'museum',
    goals: ['discovery', 'tools'],
  });

  assert.equal(roadmap[0].id, 'evidence-dossier');
  assert.match(roadmap[0].reason, /no reemplaza/i);
  assert.ok(roadmap.some((item) => item.id === 'request-access'));
});

test('buildRoadmap prioritizes native implementation when origin access exists', () => {
  const roadmap = buildRoadmap({
    control: 'origin',
    siteType: 'gallery',
    goals: ['discovery', 'content'],
  });

  assert.equal(roadmap[0].id, 'origin-baseline');
  assert.ok(roadmap.some((item) => item.id === 'answer-ready-content'));
});
