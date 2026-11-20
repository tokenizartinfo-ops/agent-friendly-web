import test from 'node:test';
import assert from 'node:assert/strict';
import {finitePolicyConfigurationFixture} from './fixtures/finite-policy-configuration-data.mjs';
import {qualifyFiniteConnectionProfile} from '../lib/mcp-qa-finite-connection-profile.mjs';
import {projectFinitePublicConfiguration} from '../lib/mcp-qa-finite-profile.mjs';

let api;
try{api=await import('../lib/mcp-qa-finite-prearm-profile.mjs');}catch{/* Missing new module is the causal RED. */}
const fixture=()=>finitePolicyConfigurationFixture().prearmConfiguration;
const clone=x=>structuredClone(x);
const binding=(v,name)=>v.bindings.find(b=>b.name===name);

test('exact original closed prearm is detached frozen DATA',()=>{
 const metadata=fixture(),originalConfiguration=clone(metadata),before=clone(metadata);
 assert.equal(typeof api?.qualifyFinitePrearmConfiguration,'function','new closed-prearm qualifier required');
 const result=api.qualifyFinitePrearmConfiguration({metadata,originalConfiguration});
 assert.deepEqual(result,before);
 assert.notStrictEqual(result,metadata);
 assert(Object.isFrozen(result)&&Object.isFrozen(result.bindings)&&Object.isFrozen(result.bindings[0])&&Object.isFrozen(result.compatibility_flags)&&Object.isFrozen(binding(result,'DELEGATED_RATE_LIMITER').simple));
 binding(metadata,'ACCESS_AUD').text='changed';
 assert.deepEqual(result,before);
 for(const change of [
  v=>binding(v,'ACCESS_AUD').text='other-aud',
  v=>binding(v,'AFW_OAUTH_PILOT_EXPIRES_AT').text='2026-11-03T03:00:00.000Z',
  v=>binding(v,'DELEGATED_RATE_LIMITER').simple.limit=9,
  v=>binding(v,'AFW_OAUTH_PILOT_PROJECT_ID').text='different-project',
  v=>binding(v,'AFW_OAUTH_PILOT_CLIENT_ID').text='different-client'
 ]){const changed=fixture();change(changed);assert.throws(()=>api.qualifyFinitePrearmConfiguration({metadata:changed,originalConfiguration:fixture()}));}
});

test('closed prearm never passes the full projection',()=>{
 const metadata=fixture();
 assert.throws(()=>projectFinitePublicConfiguration({role:'canaryLive',metadata}));
 assert.throws(()=>qualifyFiniteConnectionProfile({phase:'finite_prearm',metadata}));
});

test('strict data rejects hidden capabilities without evaluating accessors',()=>{
 assert.equal(typeof api?.qualifyFinitePrearmConfiguration,'function','new closed-prearm qualifier required');
 const q=api.qualifyFinitePrearmConfiguration;
 const normal=()=>({metadata:fixture(),originalConfiguration:fixture()});
 const bad=[
  x=>{x.extra=true;},
  x=>{x.metadata.extra=true;},
  x=>{x.metadata.bindings[0].extra=true;},
  x=>{x.metadata.bindings[0].lease=()=>{};},
  x=>{x.metadata.env={};},
  x=>{x.metadata.bindings[0].name='x'.repeat(32769);},
  x=>{x.metadata.bindings[1]=()=>{};},
  x=>{Object.setPrototypeOf(x.metadata,{});},
  x=>{x.metadata.bindings.length++;},
  x=>{x.metadata[Symbol('capability')]=true;}
 ];
 for(const mutate of bad){const x=normal();mutate(x);assert.throws(()=>q(x));}
 let calls=0;
 for(const target of ['input','metadata','binding']){
  const x=normal(),v=target==='input'?x:target==='metadata'?x.metadata:x.metadata.bindings[0];
  Object.defineProperty(v,target==='input'?'metadata':target==='metadata'?'bindings':'name',{enumerable:true,get(){calls++;throw Error('getter ran');}});
  assert.throws(()=>q(x));assert.equal(calls,0);
 }
});
