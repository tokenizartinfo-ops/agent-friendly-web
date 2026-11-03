import test from 'node:test';
import assert from 'node:assert/strict';
import {observeFiniteOwnerStageWork,continueFiniteOwnerStageWork,observeFiniteReadOnlyWork} from '../lib/mcp-qa-finite-stage-work.mjs';

test('continuation reuses only the original context, holders and live parent',async()=>{
 const controller=new AbortController(),otherController=new AbortController(),storage={},db={},ctx={storage},env={RELEASE_DB:db};
 const lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted)throw Error('expired');}});
 const otherLease=Object.freeze({signal:otherController.signal,assertCurrent(){}});
 const admission=Object.freeze({lease});
 let release;const held=new Promise(resolve=>{release=resolve;});
 const original=observeFiniteOwnerStageWork({ctx,env,admission,originalLease:lease},()=>held);
 try{
  await Promise.resolve();
  assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:otherLease},async()=>true));
  assert.throws(()=>continueFiniteOwnerStageWork({ctx:{storage},env,originalLease:lease},async()=>true));
  env.RELEASE_DB={};assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));env.RELEASE_DB=db;
  ctx.storage={};assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));ctx.storage=storage;
  assert.equal(await continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true),true);
  controller.abort();
  assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));
 }finally{controller.abort();otherController.abort();release();await original;}
});

test('read-only scope cannot substitute owner authority and excludes overlapping work',async()=>{
 const c=new AbortController(),storage={},db={},ctx={storage},env={RELEASE_DB:db};
 const lease=Object.freeze({signal:c.signal,assertCurrent(){if(c.signal.aborted)throw Error('expired');}});
 let release;const held=new Promise(resolve=>{release=resolve;});
 const op=observeFiniteReadOnlyWork({ctx,env,originalLease:lease},()=>held);
 try{
  await Promise.resolve();
  assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));
  assert.throws(()=>observeFiniteOwnerStageWork({ctx,env,admission:{lease},originalLease:lease},async()=>true));
  assert.throws(()=>observeFiniteReadOnlyWork({ctx,env,originalLease:lease},async()=>true));
  env.RELEASE_DB={};assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));env.RELEASE_DB=db;
  ctx.storage={};assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));ctx.storage=storage;
  c.abort();assert.throws(()=>observeFiniteReadOnlyWork({ctx,env,originalLease:lease},async()=>true));
 }finally{c.abort();release();await op;}
});
