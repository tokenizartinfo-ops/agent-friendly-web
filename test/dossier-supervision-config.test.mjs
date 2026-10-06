import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('producer deployment cannot replace server-custodied enrollment with a plain variable',async()=>{
 const config=JSON.parse(await readFile('wrangler.dossier-supervision-producer.jsonc','utf8'));
 for(const name of ['AFW_DOSSIER_ENROLLMENTS','AFW_DOSSIER_SIGNING_SECRET'])
  assert.equal(Object.hasOwn(config.vars||{},name),false,`${name} belongs in server secret custody`);
 assert.equal(config.vars.AFW_DOSSIER_SUPERVISION_ENABLED,'false');
 assert.deepEqual(config.triggers.crons,[]);
 assert.equal(Object.hasOwn(config.vars,'AFW_OPERATIONS_WINDOW_EXPIRES_AT'),false);
});
