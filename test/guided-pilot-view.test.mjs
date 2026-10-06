import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { isGuidedPilotView } from '../lib/guided-pilot-view.mjs';

test('the brief view is only available in a loaded, authenticated exact pilot', () => {
  const ready = { pilot: true, loaded: true, requested: true, conflict: false, sessionRequired: false };
  assert.equal(isGuidedPilotView(ready), true);
  for (const field of ['pilot', 'loaded', 'requested']) assert.equal(isGuidedPilotView({ ...ready, [field]: false }), false);
  assert.equal(isGuidedPilotView({ ...ready, conflict: true }), true);
  assert.equal(isGuidedPilotView({ ...ready, sessionRequired: true }), true);
});

test('the pilot interface preserves full dossier, local no-AI guide, explicit save and conflicts', async () => {
  const ui = await readFile('app/components/intake-workspace.tsx', 'utf8');
  assert.match(ui, /isGuidedPilotView\(/);
  assert.match(ui, /hidden=\{guidedView\}/);
  assert.match(ui, /open=\{!guidedView \|\| !pilotCopilot\}/);
  assert.match(ui, /setGuidedViewRequested\(!guidedViewRequested\)/);
  assert.match(ui, /<IntakeAssistantPrototype/);
  assert.match(ui, /<IntakeIntelligentCopilot/);
  assert.match(ui, /<IntakeConflictReview/);
  assert.match(ui, /onClick=\{saveReviewedDraft\}/);
});

test('an opted-in brief entry works without enabling the AI pilot',()=>{
  assert.equal(isGuidedPilotView({pilot:false,guidedEntry:true,loaded:true,requested:true}),true);
  assert.equal(isGuidedPilotView({pilot:false,guidedEntry:true,loaded:false,requested:true}),false);
  assert.equal(isGuidedPilotView({pilot:false,guidedEntry:true,loaded:true,requested:false}),false);
});
