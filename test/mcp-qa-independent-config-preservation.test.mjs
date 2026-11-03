import test from 'node:test';
import assert from 'node:assert/strict';

const module = await import('../lib/mcp-qa-independent-config-preservation.mjs').catch(() => ({}));
test('separately verifies unchanged active-version and script settings and rejects drift', () => {
  assert.equal(typeof module.assertIndependentConfigPreserved, 'function');
  const active = { bindings: [{name:'AFW_TEST_ENABLED',type:'plain_text',text:'false'}], compatibility_date:'2026-09-07' };
  const settings = structuredClone(active);
  assert.doesNotThrow(() => module.assertIndependentConfigPreserved({activeBefore:active,settingsBefore:settings,activeAfter:structuredClone(active),settingsAfter:structuredClone(settings)}));
  const changed = structuredClone(settings); changed.bindings[0].text='true';
  assert.throws(() => module.assertIndependentConfigPreserved({activeBefore:active,settingsBefore:settings,activeAfter:active,settingsAfter:changed}));
  assert.throws(() => module.assertIndependentConfigPreserved({activeBefore:active,settingsBefore:changed,activeAfter:active,settingsAfter:changed}));
});
