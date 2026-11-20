import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {qaClosedConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
import * as profile from '../lib/mcp-qa-finite-profile.mjs';

const historicalBindings={
 qaClosed:'69ee386c99509440ec3ca6bbf5e4296d04015e3f3fcd985b0c1afc09c4d04b0f',
 canaryClosed:'379f2f3e7f655675e30af08142fb38c30bae04624f6a2a79c2b64721d3ac4249',
 operatorClosed:'efeac7ce7d4eb2b3ca91321f502d3cbaf8394da5bde0a10bef4c035b4c3850bd'
};
test('historical source profiles pin each observed closed binding inventory',()=>{
 const receipts=Object.keys(historicalBindings).map(role=>{
  const receipt=profile.finitePublicStaticExpectation(role);
  assert.deepEqual(Object.keys(receipt).sort(),['bindingsHash','configurationHash','profileHash','purpose']);
  assert.equal(receipt.purpose,'afw.finite-public-static-profile.v1');
  assert.equal(receipt.bindingsHash,historicalBindings[role]);
  assert.match(receipt.configurationHash,/^[a-f0-9]{64}$/);
  assert.match(receipt.profileHash,/^[a-f0-9]{64}$/);
  assert(Object.isFrozen(receipt));
  return receipt;
 });
 assert.equal(new Set(receipts.map(receipt=>receipt.profileHash)).size,3);
 assert.throws(()=>profile.finitePublicStaticExpectation('foreign'));
});

test('closed proof refuses caller metadata and accessors before reading any private field',()=>{
 assert.equal(typeof profile.qualifyHistoricalClosedVersionProfile,'function');
 const claimed={id:'c570b60b-95dc-48e1-89f3-9c4651691dbc',main_module:'closed-rollback.mjs',
  urls:[],bindings:[{name:'AFW_QA_HTTP_ENABLED',type:'plain_text',text:'false'}]};
 assert.throws(()=>profile.qualifyHistoricalClosedVersionProfile('qaClosed',claimed),/unavailable/);
 assert.throws(()=>profile.qualifyHistoricalClosedVersionProfile('qaLive',claimed),/unavailable/);
 let reads=0;
 Object.defineProperty(claimed,'bindings',{enumerable:true,get(){reads++;return [];}});
 assert.throws(()=>profile.qualifyHistoricalClosedVersionProfile('qaClosed',claimed),/unavailable/);
 assert.equal(reads,0);
});

test('historical proof projects an exact verified binding inventory and rejects a pinned inventory mismatch',async()=>{
 const full={
  id:'11111111-1111-4111-8111-111111111111',urls:[],main_module:'closed-rollback.mjs',
  compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],
  bindings:[
   {name:'SYNTHETIC_SECRET',type:'secret_text'},
   {name:'AFW_SYNTHETIC_ENABLED',type:'plain_text',text:'false'},
   {name:'SYNTHETIC_NOTE',type:'plain_text',text:'synthetic private binding value'}
  ]
 };
 const secondary={...full,id:'22222222-2222-4222-8222-222222222222',main_module:'index.mjs'};
 const pin={
  name:'synthetic-qa',id:full.id,configurationHash:qaClosedConfigurationHash(full),
  module:{name:full.main_module,sha256:'e'.repeat(64),bytes:12},bindingCount:3,flagCount:1
 };
 const wrongInventoryPin={...pin,name:'synthetic-operator',id:secondary.id,
  configurationHash:qaClosedConfigurationHash(secondary),module:{...pin.module,name:secondary.main_module}};
 const normalized='[{"enabled":false,"name":"AFW_SYNTHETIC_ENABLED","type":"plain_text"},{"name":"SYNTHETIC_NOTE","type":"plain_text"},{"name":"SYNTHETIC_SECRET","type":"secret_text"}]';
 const digest=createHash('sha256').update('afw.finite-public-bindings.v1\n'+normalized).digest('hex');
 const fixturePins={...QA_CLOUD_CLOSED_PINS,qaClosed:pin,operator:wrongInventoryPin};
 const fixtureInventories={...historicalBindings,qaClosed:digest,operatorClosed:'f'.repeat(64)};
 const entry=fileURLToPath(new URL('../lib/mcp-qa-finite-profile.mjs',import.meta.url));
 const bundle=await build({entryPoints:[entry],bundle:true,write:false,format:'esm',platform:'node',
  plugins:[{name:'synthetic-historical-pins',setup(builder){
   builder.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({
    contents:'export const QA_CLOUD_CLOSED_PINS='+JSON.stringify(fixturePins)+';',loader:'js'
   }));
   builder.onLoad({filter:/mcp-qa-finite-closed-bindings\.mjs$/},()=>({
    contents:'export const HISTORICAL_CLOSED_BINDINGS='+JSON.stringify(fixtureInventories)+';',loader:'js'
   }));
  }}]
 });
 const api=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].contents).toString('base64'));
 Object.defineProperty(full,'modules',{enumerable:true,get(){assert.fail('unrelated provider bytes were read');}});
 const got=api.qualifyHistoricalClosedVersionProfile('qaClosed',full);
 assert.deepEqual(Object.keys(got).sort(),['bindingCount','closedFlagCount','configurationHash','moduleHash','publicStatic','versionId']);
 assert.equal(got.publicStatic.bindingsHash,digest);
 assert.equal(got.closedFlagCount,1);
 assert.equal(got.bindingCount,3);
 assert(!JSON.stringify(got).includes('synthetic private binding value'));
 assert.throws(()=>api.qualifyHistoricalClosedVersionProfile('canaryClosed',full),/unavailable/);
 assert.throws(()=>api.qualifyHistoricalClosedVersionProfile('operatorClosed',secondary),/Finite source authority unavailable/);
});
