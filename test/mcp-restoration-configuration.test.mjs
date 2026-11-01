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
