import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { defaultCopilotSelection } from '../lib/copilot-review-selection.mjs';

test('copilot initially selects only empty dossier fields', () => {
  const suggestions = [
    { field: 'organization', value: 'Museo Faro' },
    { field: 'cms', value: 'WordPress' },
    { field: 'hosting', value: 'Cloudflare' },
    { field: 'goals', value: ['discovery'] },
  ];
  const draft = { organization: 'Museo existente', cms: '  ', hosting: '', goals: ['answers'] };
  assert.deepEqual(defaultCopilotSelection(suggestions, draft), ['cms', 'hosting']);
  assert.equal(draft.organization, 'Museo existente');
  assert.deepEqual(draft.goals, ['answers']);
});

test('copilot leaves all replacement proposals unselected', () => {
  assert.deepEqual(defaultCopilotSelection([
    { field: 'organization', value: 'Otro nombre' },
    { field: 'languages', value: ['en'] },
  ], { organization: 'Museo', languages: ['es'] }), []);
});

test('private copilot uses the safe selection in the review UI', async () => {
  const source = await readFile('app/components/intake-intelligent-copilot.tsx', 'utf8');
  assert.match(source, /setSelected\(defaultCopilotSelection\(answer\.suggestions,draft\)\)/);
});
