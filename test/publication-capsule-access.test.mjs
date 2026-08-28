import assert from 'node:assert/strict';
import test from 'node:test';

import { deriveCapsuleRole, maintainerApprovalRequired } from '../lib/capsule-access.mjs';

const project = {
  userId: 'owner-user-id',
  ownerEmail: 'owner@example.com',
  maintainerEmail: 'Maintainer@Example.com',
  control: 'provider',
};

test('capsule role is derived from authenticated identity and never from client input', () => {
  assert.equal(deriveCapsuleRole({ userId: 'owner-user-id', email: 'other@example.com' }, project), 'owner');
  assert.equal(deriveCapsuleRole({ userId: 'maintainer-user-id', email: 'maintainer@example.com' }, project), 'maintainer');
  assert.equal(deriveCapsuleRole({ userId: 'stranger', email: 'stranger@example.com' }, project), null);
});

test('maintainer approval is required only for a distinct external custodian', () => {
  assert.equal(maintainerApprovalRequired(project), true);
  assert.equal(maintainerApprovalRequired({ ...project, maintainerEmail: '' }), true);
  assert.equal(maintainerApprovalRequired({ ...project, control: 'origin', maintainerEmail: '' }), false);
  assert.equal(maintainerApprovalRequired({ ...project, maintainerEmail: 'OWNER@example.com' }), false);
});
