import test from 'node:test';
import assert from 'node:assert/strict';
import {createFiniteOwnerRequestLease,readFiniteOwnerRequestContext} from '../lib/mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteOwnerRequestWork,observeFiniteFactualReadWork,adoptFiniteOwnerRequestStageWork,continueFiniteOwnerStageWork,observeFiniteOwnerStageWork,observeFiniteReadOnlyWork,retainFiniteOwnerStagePromise} from '../lib/mcp-qa-finite-stage-work.mjs';
const world=()=>{const ctx={storage:{}},env={RELEASE_DB:{}},parent=createFiniteOwnerRequestLease(new Request('https://example.invalid'));return {ctx,env,parent};};
test('request scope rejects clone and foreign roots and never confers continuation authority',async()=>{
 const {ctx,env,parent}=world(),other=world();
 try{
  assert.throws(()=>readFiniteOwnerRequestContext({...parent.lease}));
  assert.throws(()=>observeFiniteOwnerRequestWork({ctx,env,originalLease:{...parent.lease}},async()=>true));
  await observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},async()=>{
   assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:parent.lease},async()=>true));
   assert.throws(()=>observeFiniteOwnerRequestWork({ctx,env,originalLease:other.parent.lease},async()=>true));
   assert.throws(()=>observeFiniteReadOnlyWork({ctx,env,originalLease:parent.lease},async()=>true));
   assert.throws(()=>observeFiniteOwnerStageWork({ctx,env,originalLease:parent.lease,admission:{lease:parent.lease}},async()=>true));
   const read=()=>observeFiniteFactualReadWork({ctx,env,originalLease:parent.lease,requestLease:parent.lease},async()=>42);
   assert.equal(await read(),42);
   ctx.storage={};assert.throws(read);ctx.storage=other.ctx.storage;assert.throws(read);
   assert.throws(()=>observeFiniteFactualReadWork({ctx,env,originalLease:parent.lease,requestLease:other.parent.lease},async()=>true));
  });
 }finally{parent.finish();other.parent.finish();}
 assert.throws(()=>readFiniteOwnerRequestContext(parent.lease));
});
test('request handoff preserves already-retained work and does not restart original clock',async()=>{
 const {ctx,env,parent}=world(),end=readFiniteOwnerRequestContext(parent.lease).deadline;let release;const held=new Promise(r=>{release=r;});
 try{
  await observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},async()=>{
   retainFiniteOwnerStagePromise(held);
   await adoptFiniteOwnerRequestStageWork({ctx,env,originalLease:parent.lease,admission:{lease:parent.lease}},async()=>assert.equal(await continueFiniteOwnerStageWork({ctx,env,originalLease:parent.lease},async()=>readFiniteOwnerRequestContext(parent.lease).deadline),end));
  });
  parent.finish();
  const other=world();
  try{assert.throws(()=>observeFiniteOwnerRequestWork({ctx,env,originalLease:other.parent.lease},async()=>true));release();await held;await Promise.resolve();assert.equal(await observeFiniteOwnerRequestWork({ctx,env,originalLease:other.parent.lease},async()=>true),true);}finally{other.parent.finish();}
 }finally{parent.finish();release();}
});
test('readonly cannot upgrade, separate ambient RPC cannot borrow, standalone observer stays compatible',async()=>{
 const {ctx,env,parent}=world();let release,enter;const entered=new Promise(r=>{enter=r;}),held=new Promise(r=>{release=r;});
 const op=observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},async()=>{enter();await held;});
 try{
  await entered;
  assert.throws(()=>observeFiniteFactualReadWork({ctx,env,originalLease:parent.lease,requestLease:parent.lease},async()=>true));
  assert.throws(()=>adoptFiniteOwnerRequestStageWork({ctx,env,originalLease:parent.lease,admission:{lease:parent.lease}},async()=>true));
 }finally{parent.finish();release();await op;}
 const w=world();
 try{await observeFiniteReadOnlyWork({ctx:w.ctx,env:w.env,originalLease:w.parent.lease},async()=>assert.throws(()=>adoptFiniteOwnerRequestStageWork({ctx:w.ctx,env:w.env,originalLease:w.parent.lease,admission:{lease:w.parent.lease}},async()=>true)));}finally{w.parent.finish();}
 const old=world();try{assert.equal(await adoptFiniteOwnerRequestStageWork({ctx:old.ctx,env:old.env,originalLease:old.parent.lease,admission:{lease:old.parent.lease}},async()=>true),true);}finally{old.parent.finish();}
});
