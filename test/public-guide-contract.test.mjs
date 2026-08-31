import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import { PUBLIC_TOOLS_COPY } from '../lib/public-tools-copy.mjs';

test('public guide contract exposes a deployed deterministic ephemeral read-only guide', async () => {
  const path = 'public/.well-known/public-guide-contract.json';
  assert.equal(await stat(path).then(() => true).catch(() => false), true);
  const contract = JSON.parse(await readFile(path, 'utf8'));

  assert.equal(contract.contract, 'agent-friendly-web.public-guide.v1');
  assert.equal(contract.status, 'deployed');
  assert.equal(contract.mode, 'deterministic_client_side');
  assert.equal(contract.persistence, 'none');
  assert.equal(contract.external_model, false);
  assert.equal(contract.capabilities.conversationContinuity, true);
  assert.equal(contract.capabilities.citedPublicAnswers, true);
  assert.equal(contract.capabilities.faqCatalogAnswers, true);
  assert.ok(contract.knowledge_sources.includes('/preguntas-frecuentes'));
  assert.equal(contract.capabilities.websiteMutation, false);
  assert.equal(contract.capabilities.paymentExecution, false);
  assert.equal(contract.capabilities.privateProjectAccess, false);
});

test('public guide UI remains local, ephemeral and keyboard operable', async () => {
  const [page, component] = await Promise.all([
    readFile('app/guia/page.tsx', 'utf8'),
    readFile('app/components/public-guide-chat.tsx', 'utf8'),
  ]);

  assert.match(page, /PublicGuideChat/);
  assert.match(page, /<SiteFooter locale=\{locale\}\s*\/>/);
  assert.match(component, /respondToPublicGuide/);
  assert.match(component, /event\.key === 'Enter'/);
  assert.match(component, /event\.shiftKey/);
  assert.equal(PUBLIC_TOOLS_COPY.es.guideUI.reset, 'Reiniciar');
  assert.match(component, /quick_replies/);
  assert.match(component, /sources/);
  assert.match(component, /scrollTop/);
  assert.equal(PUBLIC_TOOLS_COPY.es.guideUI.blocked, 'Mensaje bloqueado por posible credencial.');
  assert.match(component, /nextMessageIdRef/);
  assert.doesNotMatch(component, /messages\.length \+ 1/);
  assert.doesNotMatch(component, /localStorage|sessionStorage|document\.cookie|fetch\(|\/api\//);
});
