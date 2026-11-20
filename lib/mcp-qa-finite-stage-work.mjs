import {readFiniteOwnerRequestContext} from './mcp-qa-finite-owner-preparation.mjs';
import {AsyncLocalStorage} from 'node:async_hooks';
// INTERNAL factual retention only. This module neither issues nor validates a
// publication admission. Fixed callers supply the exact already-consumed native
// admission; another object/ctx lineage can only be denied, never authorised.
const scopes=new AsyncLocalStorage(),outstanding=new WeakMap(),requestEntries=new WeakMap();
const fail=()=>{throw Error('Finite stage work remains outstanding');};
function released(entry){
 if(entry.originalLease.signal.aborted&&entry.promises.size===0&&outstanding.get(entry.ctx)===entry){
  outstanding.delete(entry.ctx);
  if(requestEntries.get(entry.originalLease)===entry)requestEntries.delete(entry.originalLease);
  entry.originalLease.signal.removeEventListener('abort',entry.release);
 }
}
/** Retain the ACTUAL native operation, before a caller races its deadline. */
export function retainFiniteOwnerStagePromise(promise){
 if(!(promise instanceof Promise))fail();
 const entry=scopes.getStore();if(!entry)return promise;
 if(outstanding.get(entry.ctx)!==entry)fail();
 entry.promises.add(promise);
 const settled=()=>{entry.promises.delete(promise);released(entry);};
 promise.then(settled,settled);
 return promise;
}
/** Scope a fixed source-owned continuation; no capability is returned or minted.
 * Uses only run/getStore and native Promise chains. It does not cross an RPC or
 * isolate boundary and cannot substitute for T5 durable/all-path writer inventory.
 */
export function observeFiniteOwnerStageWork({ctx,env,admission,originalLease},operation){
 originalLease.assertCurrent();admission.lease.assertCurrent();
 if(originalLease.signal.aborted||admission.lease.signal.aborted)fail();
 let entry=outstanding.get(ctx);
 if(entry&&(entry.mode!=='owner'||entry.admission!==admission||entry.originalLease!==originalLease||entry.env!==env||entry.storage!==ctx.storage||entry.db!==env.RELEASE_DB))fail();
 if(!entry){
  entry={mode:'owner',ctx,env,storage:ctx.storage,db:env.RELEASE_DB,admission,originalLease,promises:new Set(),release:null};
  entry.release=()=>released(entry);
  outstanding.set(ctx,entry);
  originalLease.signal.addEventListener('abort',entry.release,{once:true});
 }
 return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
}

/** Continue only an already-owned source observation scope. No capability or
 * new admission is created; the exact original parent and holders must match. */
export function continueFiniteOwnerStageWork({ctx,env,originalLease},operation){
 const entry=outstanding.get(ctx);
 if(!entry||entry.mode!=='owner'||entry.originalLease!==originalLease||entry.env!==env||entry.storage!==ctx.storage||entry.db!==env.RELEASE_DB||typeof operation!=='function')fail();
 originalLease.assertCurrent();entry.admission.lease.assertCurrent();
 if(originalLease.signal.aborted||entry.admission.lease.signal.aborted)fail();
 return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
}

/** Internal retention scope only: does not create or validate an admission. */
export function observeFiniteReadOnlyWork({ctx,env,originalLease},operation){
 if(!ctx||!env||typeof operation!=='function'||outstanding.has(ctx))fail();
 originalLease.assertCurrent();
 if(originalLease.signal.aborted)fail();
 const entry={mode:'read-only',ctx,env,storage:ctx.storage,db:env.RELEASE_DB,originalLease,promises:new Set(),release:null};
 entry.release=()=>released(entry);
 outstanding.set(ctx,entry);
 originalLease.signal.addEventListener('abort',entry.release,{once:true});
 return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
}

const matching=(entry,ctx,env,root)=>entry.ctx===ctx&&entry.env===env&&entry.storage===ctx.storage&&entry.db===env.RELEASE_DB&&entry.originalLease===root;
/** Non-authorizing lifetime bookkeeping at actual native request entry. */
export function observeFiniteOwnerRequestWork({ctx,env,originalLease},operation){
 if(!ctx||!env||typeof operation!=='function')fail();
 const context=readFiniteOwnerRequestContext(originalLease);
 if(context.root!==originalLease||outstanding.has(ctx))fail();
 const entry={mode:'request',ctx,env,storage:ctx.storage,db:env.RELEASE_DB,originalLease,promises:new Set(),release:null};
 entry.release=()=>released(entry);outstanding.set(ctx,entry);requestEntries.set(originalLease,entry);
 originalLease.signal.addEventListener('abort',entry.release,{once:true});
 return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
}
/** Fixed factual reader borrows ONLY its ambient genuine request lineage.
 * The supplied readonly lease keeps its shortened/child guard. */
export function observeFiniteFactualReadWork({ctx,env,originalLease,requestLease},operation){
 if(typeof operation!=='function')fail();
 originalLease.assertCurrent();if(originalLease.signal.aborted)fail();
 const context=readFiniteOwnerRequestContext(requestLease),entry=outstanding.get(ctx);
 if(!entry){if(requestEntries.has(context.root))fail();return observeFiniteReadOnlyWork({ctx,env,originalLease},operation);}
 const check=()=>{
  originalLease.assertCurrent();const live=readFiniteOwnerRequestContext(requestLease);
  if(originalLease.signal.aborted||scopes.getStore()!==entry||outstanding.get(ctx)!==entry||!['request','owner'].includes(entry.mode)||live.root!==context.root||!matching(entry,ctx,env,context.root))fail();
  if(entry.mode==='owner'){entry.admission.lease.assertCurrent();if(entry.admission.lease.signal.aborted)fail();}
 };
 check();
 return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(()=>{check();return operation();})));
}
/** Bookkeeping only. Fixed transport MUST first consume its real one-use stage
 * admission. This helper cannot authenticate a business admission. */
export function adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease},operation){
 originalLease.assertCurrent();admission.lease.assertCurrent();
 if(originalLease.signal.aborted||admission.lease.signal.aborted||typeof operation!=='function')fail();
 const entry=outstanding.get(ctx);
 if(!entry)return observeFiniteOwnerStageWork({ctx,env,admission,originalLease},operation);
 const context=readFiniteOwnerRequestContext(originalLease);
 if(context.root!==originalLease||entry.mode!=='request'||scopes.getStore()!==entry||!matching(entry,ctx,env,originalLease))fail();
 entry.mode='owner';entry.admission=admission;
 return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
}

/** Original alarm lifetime only: exclusion and actual-promise bookkeeping.
 * This scope grants no admission and accepts no fabricated business capability. */
export function observeFiniteOwnerCleanupWork({ctx,env,originalLease},operation){
 if(!ctx||!env||typeof operation!=='function'||outstanding.has(ctx))fail();
 originalLease.assertCurrent();if(originalLease.signal.aborted)fail();
 const entry={mode:'cleanup',ctx,env,storage:ctx.storage,db:env.RELEASE_DB,originalLease,promises:new Set(),release:null};
 entry.release=()=>released(entry);outstanding.set(ctx,entry);
 originalLease.signal.addEventListener('abort',entry.release,{once:true});
 return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
}
