import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { validateDeliveryPlan, deliveryPlanAccess, saveDeliveryPlan, readDeliveryPlan } from '../lib/delivery-plan.mjs';

const project = { id: 'p', userId: 'owner', maintainerEmail: 'maintainer@example.invalid' };
const capsule = { id: 'c', projectId: 'p', manifestSha256: 'a'.repeat(64), status: 'approved_for_manual_handoff', expiresAt: '2099-01-01T00:00:00.000Z' };
const input = { capability: 'hosting_files', responsible: 'maintainer', revision: 0, mutationKey: 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa', manifestSha256: capsule.manifestSha256 };
function storage() {
  const sql = new DatabaseSync(':memory:');
  sql.exec(readFileSync('drizzle/0013_ancient_darwin.sql','utf8'));
  return { close: () => sql.close(), prepare(query) { return { bind(...args) { const statement = sql.prepare(query); return { async first() { return statement.get(...args) || null; } }; } }; } };
}
test('only exact owner and matching capsule can access a delivery plan', () => {
  assert.equal(deliveryPlanAccess({ userId: 'owner' }, project, capsule), true);
  for (const [user, p, c] of [[null, project, capsule], [{ userId: 'other' }, project, capsule], [{ userId: 'maintainer' }, project, capsule], [{ userId: 'owner' }, project, { ...capsule, projectId: 'other' }], [{ userId: 'owner' }, null, capsule]]) assert.equal(deliveryPlanAccess(user,p,c), false);
});
test('client cannot assert verification, authorization, secrets or arbitrary capabilities', () => {
  assert.equal(validateDeliveryPlan(input).ok, true);
  for (const bad of [{ ...input, accessVerified: true }, { ...input, secret: 'x' }, { ...input, capability: 'cPanel' }, { ...input, responsible: 'admin' }, { ...input, revision: -1 }, { ...input, manifestSha256: 'x' }]) assert.equal(validateDeliveryPlan(bad).ok, false);
});
test('durable save reopens exact capsule scope and rejects conflicting or stale writes', async () => {
  const db = storage();
  try {
    const scope = { project, capsule, userId: 'owner' };
    const first = await saveDeliveryPlan(db, scope, input);
    assert.equal(first.status, 200);
    assert.equal(first.plan.revision, 1);
    assert.equal(first.plan.accessStatus, 'not_verified');
    assert.equal(first.plan.authorization, 'none');
    assert.equal(first.plan.responsible, 'maintainer');
    assert.equal(first.plan.maintainerStatus, 'contact_declared');
    assert.equal(JSON.stringify(first.plan).includes(project.maintainerEmail), false);
    assert.deepEqual(await readDeliveryPlan(db, scope), first.plan);
    assert.equal((await saveDeliveryPlan(db, scope, input)).replayed, true);
    assert.equal((await saveDeliveryPlan(db, scope, { ...input, capability: 'cms_plugin' })).status, 409);
    assert.equal((await saveDeliveryPlan(db, scope, { ...input, mutationKey: 'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb' })).status, 409);
    const next = { ...input, revision: 1, capability: 'repository', mutationKey: 'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb' };
    assert.equal((await saveDeliveryPlan(db, scope, next)).plan.revision, 2);
    assert.equal(await readDeliveryPlan(db, { ...scope, userId: 'other' }), null);
    assert.equal(await readDeliveryPlan(db, { ...scope, project: { ...project, id: 'other' } }), null);
  } finally { db.close(); }
});
test('changed, rejected and expired capsules cannot receive a new plan', async () => {
  const db = storage();
  try {
    for (const changed of [{ ...capsule, manifestSha256: 'b'.repeat(64) }, { ...capsule, status: 'rejected' }, { ...capsule, expiresAt: '2000-01-01T00:00:00.000Z' }]) assert.equal((await saveDeliveryPlan(db,{project,capsule:changed,userId:'owner'},input)).status,409);
  } finally { db.close(); }
});
