import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewCopilotOutput } from '../lib/intake-copilot.mjs';

test('a generic business description is not proposed as the organization name', () => {
  for (const phrase of ['una empresa de servicios profesionales', 'a professional services company', 'uma empresa de serviços profissionais']) {
    assert.deepEqual(reviewCopilotOutput({ suggestions: [{ field: 'organization', value: phrase, sourceExcerpt: phrase }] }, phrase).suggestions, []);
  }
  assert.equal(reviewCopilotOutput({ suggestions: [{ field: 'organization', value: 'Museo Sur', sourceExcerpt: 'Nos llamamos Museo Sur' }] }, 'Nos llamamos Museo Sur').suggestions[0].value, 'Museo Sur');
});

test('the provider context includes bounded owner declarations and excludes identities, notes and unknown goal codes', async () => {
  const implementation = await import('../lib/copilot-context.mjs').catch(() => ({}));
  assert.equal(typeof implementation.buildCopilotContext, 'function');
  const result = implementation.buildCopilotContext({ revision: 7, organization: 'Museo Sur', goalsJson: '["content","legacy"]', notes: 'private conversation', ownerEmail: 'private@example.invalid', cms: 'Drupal', control: 'origin' });
  assert.equal(result.basedOnRevision, 7);
  assert.deepEqual(result.ownerDeclared.goals, ['content']);
  assert.equal(result.ownerDeclared.organization, 'Museo Sur');
  assert.equal(JSON.stringify(result).includes('private'), false);
  assert.equal(implementation.buildCopilotContext({ organization: 'x'.repeat(401) }).ownerDeclared.organization, undefined);
  assert.equal(implementation.buildCopilotContext({ cms: 'password is secret' }).ownerDeclared.cms, undefined);
});
