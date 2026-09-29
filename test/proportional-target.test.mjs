import assert from 'node:assert/strict';
import test from 'node:test';
import { proportionalTargetGuide } from '../lib/proportional-target.mjs';

test('an informational site can stop after discovery and clear answers', () => {
  const guide = proportionalTargetGuide({ goals: ['discovery', 'content'], contentSources: ['faq'], control: 'origin' });
  assert.equal(guide.stage, 'content_horizon');
  assert.match(guide.steps.join(' '), /puede ser suficiente/);
  assert.doesNotMatch(guide.steps.join(' '), /MCP|AF-4|AF-5/);
  assert.equal(guide.questions.length, 0);
  assert.equal(guide.next.href, '#dossier-publication');
});

test('selected technologies alone do not imply an advanced target or deployed capability', () => {
  const guide = proportionalTargetGuide({ authorizedResources: ['mcp', 'skills'] });
  assert.equal(guide.stage, 'undecided');
  assert.match(guide.steps[0], /qué deberían poder descubrir o hacer/);
  assert.match(guide.limit, /no los publica/);
  assert.equal(guide.next.href, '#dossier-goals');
});

test('tool interest adds a use-case question but never mandates MCP', () => {
  const guide = proportionalTargetGuide({ goals: ['tools'], contentSources: ['faq'], control: 'provider' }, 'en');
  assert.equal(guide.stage, 'tool_exploration');
  assert.match(guide.steps.join(' '), /MCP is not required/);
  assert.match(guide.steps.join(' '), /confirm who can do so/);
  assert.equal(guide.questions.length, 1);
  assert.equal(guide.next.href, '#dossier-control');
});

test('transaction interest keeps AF-4 and AF-5 conditional and asks for controls', () => {
  const guide = proportionalTargetGuide({ goals: ['payments'], contentSources: ['services', 'tool_docs'], control: 'origin' }, 'pt');
  assert.equal(guide.stage, 'transaction_exploration');
  assert.match(guide.steps.join(' '), /AF-1\/AF-2/);
  assert.match(guide.steps.join(' '), /AF-4/);
  assert.match(guide.steps.join(' '), /AF-5/);
  assert.equal(guide.questions.length, 2);
  assert.equal(guide.next.href, '#dossier-content');
});

test('missing public sources take priority over technical implementation choices', () => {
  const guide = proportionalTargetGuide({ goals: ['payments'], control: 'origin' });
  assert.equal(guide.next.href, '#dossier-content');
  assert.match(guide.next.label, /fuentes públicas/);
});
