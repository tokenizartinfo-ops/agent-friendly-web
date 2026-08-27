import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Block 1 migration contains the registry boundary tables and private intake columns', async () => {
  const sql = await readFile('drizzle/0001_registry_block1.sql', 'utf8');

  for (const table of [
    'registry_sites',
    'domain_claims',
    'owner_attestations',
    'public_profiles',
    'scan_observations',
  ]) {
    assert.match(sql, new RegExp(`CREATE TABLE .${table}.`));
  }

  for (const column of [
    'maintainer_email',
    'publication_preference',
    'crawler_training_policy',
    'approver_email',
  ]) {
    assert.match(sql, new RegExp(column));
  }

  assert.doesNotMatch(sql, /^\s*(DROP|DELETE|UPDATE|RENAME)\b/im);
  assert.doesNotMatch(sql, /CREATE TABLE `__new_/i);
});

test('private project persistence maps expanded intake without storing event values', async () => {
  const route = await readFile('app/api/projects/route.ts', 'utf8');

  for (const field of [
    'maintainerEmail',
    'contentSourcesJson',
    'desiredCapabilitiesJson',
    'authorizedResourcesJson',
    'publicationPreference',
    'crawlerTrainingPolicy',
    'approverEmail',
  ]) {
    assert.match(route, new RegExp(field));
  }

  assert.match(route, /fields:\s*Object\.keys\(intake\)/);
  assert.doesNotMatch(route, /payloadJson:\s*JSON\.stringify\(intake\)/);
  assert.match(
    route,
    /where\(and\(eq\(siteProjects\.id, id\), eq\(siteProjects\.userId, user\.userId\)\)\)/,
  );
});
