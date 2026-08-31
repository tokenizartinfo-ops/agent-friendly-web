import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { PUBLIC_TOOLS_COPY } from '../lib/public-tools-copy.mjs';
import { PUBLIC_GUIDE_INITIAL_CONTEXT, respondToPublicGuide } from '../lib/public-guide.mjs';
import { analyzeIntakeNotes } from '../lib/intake-assistant.mjs';

test('comparison, intake and guide interfaces have complete ES EN PT copy', () => {
  for (const locale of ['es', 'en', 'pt']) {
    const copy = PUBLIC_TOOLS_COPY[locale];
    assert.ok(copy.measure.title.length > 20);
    assert.ok(copy.measure.method.length === 3);
    assert.ok(copy.comparison.baseline && copy.comparison.current && copy.comparison.disclaimer.length > 40);
    assert.ok(copy.assistant.title.length > 20 && copy.intake.secretWarning.length > 20);
    assert.ok(copy.guide.title.length > 20 && copy.guideUI.placeholder.length > 10);
  }
});

test('public guide answers and continues naturally in English', () => {
  const first = respondToPublicGuide({
    locale: 'en',
    message: 'How do I start improving my website?',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });
  assert.equal(first.topic, 'getting_started');
  assert.match(first.answer, /first step|audit/i);
  assert.ok(first.sources.some((source) => source.url === '/en#auditar'));

  const continuation = respondToPublicGuide({ locale: 'en', message: 'Yes, please', context: first.next_context });
  assert.equal(continuation.topic, 'audit_process');
  assert.match(continuation.answer, /auditor|public/i);
});

test('public guide keeps context and simplifies in Portuguese', () => {
  const first = respondToPublicGuide({
    locale: 'pt',
    message: 'O que significa AF-0 a AF-5?',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });
  const simpler = respondToPublicGuide({ locale: 'pt', message: 'Mais simples', context: first.next_context });
  assert.equal(first.topic, 'af_levels');
  assert.equal(simpler.topic, 'af_levels');
  assert.equal(simpler.mode, 'simple');
  assert.match(simpler.answer, /AF-0/i);
  assert.ok(simpler.sources.some((source) => source.url === '/pt/metodologia'));
});

test('intake analyzer understands English and Portuguese while preserving canonical fields', () => {
  const english = analyzeIntakeNotes('We are Museum North. Our website is museumnorth.org. We want collectors and researchers to find us. We use WordPress in English and Portuguese.', 'en');
  assert.equal(english.blocked, false);
  assert.ok(english.suggestions.some((item) => item.field === 'organization' && /Museum North/.test(item.value)));
  assert.ok(english.suggestions.some((item) => item.field === 'audience'));
  assert.match(english.warning, /review/i);

  const portuguese = analyzeIntakeNotes('Somos Museu Norte. Nosso site é museunorte.org. Queremos que colecionadores e pesquisadores nos encontrem. Usamos WordPress em português e espanhol.', 'pt');
  assert.equal(portuguese.blocked, false);
  assert.ok(portuguese.suggestions.some((item) => item.field === 'organization' && /Museu Norte/.test(item.value)));
  assert.ok(portuguese.suggestions.some((item) => item.field === 'audience'));
  assert.match(portuguese.warning, /revise/i);
});

test('interactive components receive locale without changing their contracts or APIs', () => {
  const files = [
    '../app/components/readiness-comparison.tsx',
    '../app/components/intake-assistant-prototype.tsx',
    '../app/components/public-guide-chat.tsx',
  ];
  for (const path of files) {
    const source = readFileSync(new URL(path, import.meta.url), 'utf8');
    assert.match(source, /locale\??:\s*Locale/);
  }
  const intake = readFileSync(new URL(files[1], import.meta.url), 'utf8');
  assert.match(intake, /intake-assistant-review\.v1/);
  const guide = readFileSync(new URL(files[2], import.meta.url), 'utf8');
  assert.match(guide, /respondToPublicGuide\(\{[^}]*locale/s);
});

test('Spanish tool pages expose the right language-switcher route keys', () => {
  const files = {
    measurement: '../app/medir-mejora/page.tsx',
    assistant: '../app/asistente/page.tsx',
    guide: '../app/guia/page.tsx',
  };
  for (const [routeKey, path] of Object.entries(files)) {
    const source = readFileSync(new URL(path, import.meta.url), 'utf8');
    assert.match(source, new RegExp(`<SiteHeader routeKey=["']${routeKey}["']`));
  }
});
