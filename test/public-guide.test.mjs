import assert from 'node:assert/strict';
import test from 'node:test';

import {
  PUBLIC_GUIDE_INITIAL_CONTEXT,
  PUBLIC_GUIDE_SOURCE_IDS,
  respondToPublicGuide,
} from '../lib/public-guide.mjs';

test('guide answers an explicit AF maturity question with public evidence', () => {
  const turn = respondToPublicGuide({
    message: 'Que significa pasar de AF-0 a AF-5?',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });

  assert.equal(turn.contract, 'agent-friendly-web.public-guide-turn.v1');
  assert.equal(turn.topic, 'af_levels');
  assert.equal(turn.mode, 'standard');
  assert.match(turn.answer, /AF-0/i);
  assert.match(turn.answer, /AF-5/i);
  assert.ok(turn.sources.some((source) => source.url === '/metodologia'));
  assert.ok(turn.sources.every((source) => PUBLIC_GUIDE_SOURCE_IDS.includes(source.id)));
  assert.ok(turn.quick_replies.length > 0 && turn.quick_replies.length <= 3);
});

test('guide answers a FAQ intent from the canonical catalog', () => {
  const turn = respondToPublicGuide({
    message: 'El cambio de AF-0 a AF-5 es automatico?',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });

  assert.equal(turn.topic, 'faq:automatic-progression');
  assert.match(turn.answer, /no.*autom[aá]tic/i);
  assert.ok(turn.sources.some((source) => source.url === '/preguntas-frecuentes'));
  assert.ok(turn.quick_replies.length <= 1);
});

test('guide preserves a FAQ topic when more detail is requested', () => {
  const first = respondToPublicGuide({
    message: 'Que es llms.txt?',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });
  const detailed = respondToPublicGuide({ message: 'Explicalo con mas detalle', context: first.next_context });

  assert.equal(first.topic, 'faq:llms-txt');
  assert.equal(detailed.topic, first.topic);
  assert.equal(detailed.mode, 'detailed');
  assert.ok(detailed.answer.length > first.answer.length);
});

test('guide resolves acknowledgement against the previous offered follow-up', () => {
  const first = respondToPublicGuide({
    message: 'Como empiezo a mejorar mi sitio?',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });
  assert.equal(first.next_context.pending_follow_up, 'audit_process');

  const continuation = respondToPublicGuide({
    message: 'Si, dale',
    context: first.next_context,
  });

  assert.equal(continuation.topic, 'audit_process');
  assert.match(continuation.answer, /auditor/i);
  assert.doesNotMatch(continuation.answer, /decime que tema/i);
});

test('guide keeps the topic when a visitor asks for a simpler explanation', () => {
  const first = respondToPublicGuide({
    message: 'Explicame AEO y las politicas de crawlers',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });
  const simpler = respondToPublicGuide({ message: 'Mas simple, sin tecnicismos', context: first.next_context });

  assert.equal(first.topic, 'aeo_crawlers');
  assert.equal(simpler.topic, 'aeo_crawlers');
  assert.equal(simpler.mode, 'simple');
  assert.ok(simpler.answer.length < first.answer.length);
});

test('guide can deepen the current topic without changing it', () => {
  const first = respondToPublicGuide({
    message: 'Que es OKF?',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });
  const detailed = respondToPublicGuide({ message: 'Profundiza un poco', context: first.next_context });

  assert.equal(detailed.topic, 'okf');
  assert.equal(detailed.mode, 'detailed');
  assert.ok(detailed.answer.length > first.answer.length);
});

test('guide asks a focused clarification when a reference has no anchor', () => {
  const turn = respondToPublicGuide({ message: 'Si, dale', context: PUBLIC_GUIDE_INITIAL_CONTEXT });

  assert.equal(turn.topic, 'clarification');
  assert.match(turn.answer, /que queres ver primero/i);
  assert.equal(turn.quick_replies.length, 3);
});

test('guide fails closed on likely credentials without echoing them', () => {
  const secret = 'sk-test-123456789-super-secret';
  const turn = respondToPublicGuide({
    message: `Mi API key es ${secret}, podes revisar el sitio?`,
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });

  assert.equal(turn.topic, 'security_block');
  assert.equal(turn.blocked, true);
  assert.match(turn.answer, /retira|elimina/i);
  assert.doesNotMatch(turn.answer, new RegExp(secret));
  assert.deepEqual(turn.sources, []);
});

test('guide explains credential safety when no credential value is present', () => {
  const turn = respondToPublicGuide({
    message: 'Que es una API key y como protejo mi contrasena?',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });

  assert.equal(turn.topic, 'security');
  assert.equal(turn.blocked, false);
  assert.match(turn.answer, /credenciales|contrasenas|tokens/i);
  assert.ok(turn.sources.length > 0);
});

test('guide explains action boundaries instead of claiming execution', () => {
  const turn = respondToPublicGuide({
    message: 'Publica los archivos en mi web y paga el servicio ahora',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });

  assert.equal(turn.topic, 'action_boundary');
  assert.match(turn.answer, /no ejecuta|no puede ejecutar/i);
  assert.match(turn.answer, /expediente|asistente/i);
  assert.equal(turn.next_context.pending_follow_up, 'intake_expediente');
});

test('guide distinguishes current capabilities from future protocols', () => {
  const turn = respondToPublicGuide({
    message: 'Ya tienen MCP, A2A, WebMCP y x402 funcionando?',
    context: PUBLIC_GUIDE_INITIAL_CONTEXT,
  });

  assert.equal(turn.topic, 'roadmap');
  assert.match(turn.answer, /no estan desplegados|todavia no/i);
  assert.doesNotMatch(turn.answer, /MCP disponible en produccion/i);
});

test('guide quick replies resolve to a concrete topic', () => {
  for (const question of [
    'Que significa pasar de AF-0 a AF-5?',
    'Explicame AEO y las politicas de crawlers',
    'Que es OKF?',
    'Como empiezo a mejorar mi sitio?',
  ]) {
    const turn = respondToPublicGuide({ message: question, context: PUBLIC_GUIDE_INITIAL_CONTEXT });
    for (const reply of turn.quick_replies) {
      const next = respondToPublicGuide({ message: reply, context: turn.next_context });
      assert.notEqual(next.topic, 'clarification', `quick reply must resolve: ${reply}`);
    }
  }
});
