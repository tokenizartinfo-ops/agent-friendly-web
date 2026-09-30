import test from 'node:test';
import assert from 'node:assert/strict';
import { changedDossierFields, latestDossierFieldHistory } from '../lib/dossier-field-history.mjs';

test('field history records only changed dossier field names, including corrections and clears', () => {
  const before = { organization: 'Museo Sur', languages: ['es'], cms: 'WordPress', notes: '' };
  const after = { organization: 'Museo Sur', languages: ['es', 'en'], cms: '', notes: 'Revisar contenido' };
  assert.deepEqual(changedDossierFields(before, after), ['languages', 'cms', 'notes']);
  assert.deepEqual(changedDossierFields(null, after), ['organization', 'languages', 'notes']);
});

test('history projection uses the latest event and ignores old ambiguous receipts', () => {
  const events = [
    { type: 'project_updated', createdAt: '2026-09-30T12:00:00Z', payloadJson: JSON.stringify({ changedFields: ['cms'], revision: 4, secret: 'never project this' }) },
    { type: 'project_updated', createdAt: '2026-09-29T12:00:00Z', payloadJson: JSON.stringify({ changedFields: ['cms', 'languages'], revision: 3 }) },
    { type: 'project_updated', createdAt: '2026-09-28T12:00:00Z', payloadJson: JSON.stringify({ fields: ['website'], revision: 2 }) },
    { type: 'project_updated', createdAt: '2026-09-27T12:00:00Z', payloadJson: 'not-json' },
  ];
  assert.deepEqual(latestDossierFieldHistory([...events].reverse()), {
    cms: { revision: 4, savedAt: '2026-09-30T12:00:00Z' },
    languages: { revision: 3, savedAt: '2026-09-29T12:00:00Z' },
  });
});
