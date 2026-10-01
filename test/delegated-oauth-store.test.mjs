import assert from 'node:assert/strict';
import test from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { createDelegatedOAuthStore } from '../lib/delegated-oauth-store.mjs';

export function sqliteStore() {
  const sqlite=new DatabaseSync(':memory:');
  const migration=readdirSync('drizzle').filter(x=>/^0011_.*\.sql$/.test(x))[0];
  assert.ok(migration,'generated delegated OAuth migration');
  for(const name of readdirSync('drizzle').filter(x=>/^001[12]_.*\.sql$/.test(x)).sort())sqlite.exec(readFileSync('drizzle/'+name,'utf8'));
  const db={prepare(sql){const statement=sqlite.prepare(sql);return {bind(...args){return {
    first:async()=>statement.get(...args)??null,all:async()=>({results:statement.all(...args)}),run:async()=>{const r=statement.run(...args);return {meta:{changes:r.changes}};},
  };}};}};
  return {sqlite,db,store:createDelegatedOAuthStore(db)};
}
const NOW='2026-09-30T18:00:00.000Z';
test('grant storage isolates subjects and disconnect is authoritative and idempotent',async()=>{
  const f=sqliteStore();try {
    await f.store.createGrant({grantId:'g',subject:'a',clientId:'c',projectId:'p',resource:'https://example.invalid/mcp',scopes:['afw:project:read'],createdAt:NOW,expiresAt:'2026-09-30T18:10:00.000Z'});
    assert.equal((await f.store.getGrant('g')).status,'active');
    assert.deepEqual(await f.store.listGrants('b'),[]);
    await f.store.revokeGrant('g','b',NOW);assert.equal((await f.store.getGrant('g')).status,'active');
    await f.store.revokeGrant('g','a',NOW);await f.store.revokeGrant('g','a',NOW);
    assert.equal((await f.store.getGrant('g')).status,'revoked');
  } finally {f.sqlite.close();}
});
test('consent handle is atomically consumed once, bound to user and kind, and expires',async()=>{
  const f=sqliteStore();try {
    await f.store.createConsent({handleHash:'hash',subject:'a',kind:'authorize',projectId:'p',clientId:'c',resource:'r',scopes:['afw:project:read'],expiresAt:'2026-09-30T18:10:00.000Z'});
    assert.equal(await f.store.consumeConsent('hash','b','authorize',NOW),null);
    assert.equal(await f.store.consumeConsent('hash','a','revoke',NOW),null);
    const results=await Promise.all([f.store.consumeConsent('hash','a','authorize',NOW),f.store.consumeConsent('hash','a','authorize',NOW)]);
    assert.equal(results.filter(Boolean).length,1);assert.equal(results.find(Boolean).projectId,'p');
    await f.store.createConsent({handleHash:'expired',subject:'a',kind:'revoke',projectId:'',clientId:'',resource:'',scopes:[],expiresAt:NOW});
    assert.equal(await f.store.consumeConsent('expired','a','revoke',NOW),null);
  } finally {f.sqlite.close();}
});
