import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {restorationConfigurationHash as legacy} from '../lib/mcp-successor-canary-restorer.mjs';
import {restorationConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
test('legacy fingerprint export is the exact same pure function and preserves fixed vector',()=>{
 assert.equal(legacy,restorationConfigurationHash);
 const m={bindings:[{type:'secret_text',name:'SECRET'},{text:'false',type:'plain_text',name:'AFW_TEST_ENABLED'}],main_module:'index.mjs',compatibility_date:'2026-09-07'};
 const vector='afw.canary-restoration-configuration.v1\n{"bindings":[{"name":"AFW_TEST_ENABLED","text":"false","type":"plain_text"},{"name":"SECRET","type":"secret_text"}],"compatibility_date":"2026-09-07","main_module":"index.mjs"}';
 assert.equal(restorationConfigurationHash(m),createHash('sha256').update(vector).digest('hex'));
 assert.equal(restorationConfigurationHash({...m,bindings:[...m.bindings].reverse()}),restorationConfigurationHash(m));
});
test('pure fingerprint keeps data-only boundaries and ignores unrelated module transport',()=>{
 const m={bindings:[],main_module:'index.mjs'};Object.defineProperty(m,'modules',{get(){throw Error('unrelated module transport must not be read');},enumerable:true});
 assert.equal(typeof restorationConfigurationHash(m),'string');
 const getter={bindings:[]};Object.defineProperty(getter,'main_module',{get(){throw Error('never invoke a getter');},enumerable:true});assert.throws(()=>restorationConfigurationHash(getter),/Successor canary restoration unavailable/);
 assert.throws(()=>restorationConfigurationHash({bindings:[{name:'x',toJSON(){throw Error('must not execute');}}]}),/Successor canary restoration unavailable/);
});

import {qualifyFiniteWorkerVersion} from '../lib/mcp-finite-primary-inventory.mjs';
import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {qaClosedConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
import {RELEASE_TARGET} from '../lib/mcp-release-operator-policy.mjs';

for(const role of ['canary','operator'])test('the archived '+role+' uses the same configuration commitment as the closed QA archive',()=>{
 const isCanary=role==='canary',bytes=Buffer.from('export default {};');
 const module={name:'index.mjs',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};
 const metadata={
  id:QA_CLOUD_CLOSED_PINS[role].id,main_module:module.name,urls:[],
  modules:[{name:module.name,content_type:'application/javascript+module',content_base64:bytes.toString('base64')}],
  compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],
  bindings:[
   {name:isCanary?'DB':'RELEASE_DB',type:'d1',id:RELEASE_TARGET.databaseId},
   {name:isCanary?'AFW_DOSSIER_EVENTS_NODE':'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:RELEASE_TARGET.namespaceId,class_name:'AfwOwnEventNode'},
   {name:'AFW_TEST_ENABLED',type:'plain_text',text:'false'}
  ],
  ...(isCanary?{exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},containers:[]}:{}),
 };
 const pin={versionId:metadata.id,module,configurationHash:qaClosedConfigurationHash(metadata)};
 assert.equal(qualifyFiniteWorkerVersion({metadata,pin,role,closed:true}).configurationHash,pin.configurationHash);
 const legacyHash=restorationConfigurationHash(metadata);
 assert.throws(()=>qualifyFiniteWorkerVersion({metadata,pin:{...pin,configurationHash:legacyHash},role,closed:true}));
 const ordinary={...metadata,id:'12345678-1234-4234-8234-123456789abc'};
 const ordinaryPin={...pin,versionId:ordinary.id,configurationHash:legacyHash};
 assert.equal(qualifyFiniteWorkerVersion({metadata:ordinary,pin:ordinaryPin,role,closed:true}).configurationHash,legacyHash);
});
