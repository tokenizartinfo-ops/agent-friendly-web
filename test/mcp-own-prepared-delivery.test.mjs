import test from 'node:test';
import assert from 'node:assert/strict';
import {syntheticSaveFixture} from './fixtures/mcp-own-synthetic-save.mjs';
import {saveOwnSyntheticGoal} from '../lib/mcp-own-synthetic-save.mjs';

test('prepared delivery resolves the original receipt after save without a caller subscription ID',async()=>{
 const f=await syntheticSaveFixture();
 try{
  const saved=await saveOwnSyntheticGoal(f.options,{expectedRevision:1,idempotencyKey:'11111111-1111-4111-8111-111111111111',goal:'discovery'});
  assert.equal(saved.status,200);
  await f.host.deliverOwnSaved(saved.eventId);
  assert.equal(f.sends(),2);assert.equal(f.boots(),1);
  await assert.rejects(f.host.deliverOwnSaved(saved.eventId));assert.equal(f.sends(),2);
 }finally{f.close();}
});

test('prepared delivery refuses absent events and revoked grants without sending or restarting',async()=>{
 const f=await syntheticSaveFixture();
 try{
  assert.equal(typeof f.host.deliverOwnSaved,'function');
  await assert.rejects(f.host.deliverOwnSaved('missing-event'));assert.equal(f.sends(),1);
  const saved=await saveOwnSyntheticGoal(f.options,{expectedRevision:1,idempotencyKey:'11111111-1111-4111-8111-111111111111',goal:'discovery'});
  assert.equal(saved.status,200);f.db.prepare("UPDATE delegated_access_grants SET revoked_at='withdrawn'").run();
  await assert.rejects(f.host.deliverOwnSaved(saved.eventId));assert.equal(f.sends(),1);assert.equal(f.boots(),1);
 }finally{f.close();}
});

test('prepared delivery rechecks withdrawal after reading the saved event',async()=>{
 const f=await syntheticSaveFixture();
 try{
  const saved=await saveOwnSyntheticGoal(f.options,{expectedRevision:1,idempotencyKey:'11111111-1111-4111-8111-111111111111',goal:'discovery'});
  assert.equal(saved.status,200);
  const prepare=f.config.db.prepare;
  f.config.db.prepare=sql=>{const statement=prepare(sql);return{bind(...args){const bound=statement.bind(...args);return{...bound,async first(){const result=await bound.first();if(sql.includes('project_events'))f.db.prepare("UPDATE delegated_access_grants SET revoked_at='withdrawn'").run();return result;}};}};};
  await assert.rejects(f.host.deliverOwnSaved(saved.eventId));assert.equal(f.sends(),1);assert.equal(f.boots(),1);
 }finally{f.close();}
});
