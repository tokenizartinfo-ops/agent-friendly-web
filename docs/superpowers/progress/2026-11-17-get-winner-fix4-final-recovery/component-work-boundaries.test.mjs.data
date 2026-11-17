import test from 'node:test';
import assert from 'node:assert/strict';
import { componentBarriers,withOwnedComponentWork } from './component-work-boundaries.mjs';
const latch=()=>Promise.withResolvers();
for(const name of ['entry','cancel']) {
 test(name+' waits for its own gate and preserves successful order',{timeout:2000},async()=>{
  const entry=latch(),cancel=latch(),work=latch(),steps=[];
  const b=componentBarriers(entry,cancel);
  const promise=b[name](work.promise).then(()=>steps.push('accepted'));
  (name==='entry'?cancel:entry).resolve();
  await Promise.resolve();await Promise.resolve();
  assert.deepEqual(steps,[]);
  (name==='entry'?entry:cancel).resolve();
  await promise;
  assert.deepEqual(steps,['accepted']);
  work.resolve();
 });
 test(name+' early completion, rejection identity, all releases and owned settlement',{timeout:2000},async()=>{
  for(const outcome of ['fulfilled','error','undefined','null','false']) {
   const own=latch(),cleanupStarted=latch(),work=latch(),steps=[];
   const sentinel=outcome==='undefined'?undefined:outcome==='null'?null:outcome==='false'?false:new Error('work');
   const barriers=componentBarriers(latch(),latch());
   let complete=false;
   const completed=withOwnedComponentWork(()=>barriers[name](work.promise),[
    ()=>{steps.push('release-cancel');throw Error('secondary cleanup');},
    ()=>steps.push('release-operation'),()=>{steps.push('finish-parent');cleanupStarted.resolve();}
   ],()=>[own.promise,work.promise]).then(
    ()=>({fulfilled:true}),reason=>({fulfilled:false,reason})).finally(()=>{complete=true;});
   if(outcome==='fulfilled')work.resolve();else work.reject(sentinel);
   await cleanupStarted.promise;await Promise.resolve();
   assert.deepEqual(steps,['release-cancel','release-operation','finish-parent']);
   assert.equal(complete,false);
   own.resolve();const result=await completed;
   assert.equal(result.fulfilled,false);
   if(outcome==='fulfilled')assert.equal(result.reason?.message,'AFW_RETENTION_WORK_ENDED_BEFORE_BARRIER');
   else assert.equal(result.reason,sentinel);
  }
 });
}
test('cleanup failure on successful work is reported after every release',{timeout:2000},async()=>{
 const error=Error('cleanup'),seen=[];
 await assert.rejects(withOwnedComponentWork(async()=>true,[
  ()=>{seen.push(1);throw error;},()=>seen.push(2)],()=>[]),reason=>reason===error);
 assert.deepEqual(seen,[1,2]);
});
