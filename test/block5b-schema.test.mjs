import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Block 5B adds only comparison and draft-plan tables with isolated idempotency', async () => {
  const schema = await readFile('db/schema.ts', 'utf8');
  const sql = await readFile('drizzle/0003_origin_comparisons_and_draft_pr_plans.sql', 'utf8');

  for (const table of ['capsule_origin_comparisons', 'draft_pr_plans']) {
    assert.ok(sql.includes(`CREATE TABLE \`${table}\``));
  }
  assert.match(schema, /export const capsuleOriginComparisons/);
  assert.match(schema, /export const draftPrPlans/);
  assert.match(sql, /capsule_origin_comparisons_idempotency_unique/);
  assert.match(sql, /draft_pr_plans_idempotency_unique/);
  assert.match(sql, /capsule_origin_comparisons_capsule_manifest_unique/);
  assert.match(sql, /draft_pr_plans_capsule_comparison_unique/);
  assert.doesNotMatch(sql, /ALTER TABLE|DROP TABLE|DROP COLUMN/i);
  assert.doesNotMatch(sql, /token|cookie|password|private_key|secret/i);
});
