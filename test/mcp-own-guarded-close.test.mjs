import test from 'node:test';
import assert from 'node:assert/strict';
import {setTimeout as delay} from 'node:timers/promises';
import {createOwnDurableEventHost} from '../lib/mcp-own-durable-host.mjs';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';

const deferred=()=>{let resolve;const promise=new Promise(r=>{resolve=r;});return{promise,resolve};};
function setup(){
 const f=fixture(),controller=new AbortController();let offset=0,allowed=true,reads=0,transactions=0,destroys=0;
 const now=()=>Date.now()+offset;
 const assertCurrent=()=>{if(!allowed)throw Error('withdrawn');};
 const destroy=f.config.ctx.container.destroy.bind(f.config.ctx.container);
 f.config.ctx.container.destroy=async()=>{destroys++;return destroy();};
 const originalTransaction=f.config.ctx.storage.transaction.bind(f.config.ctx.storage);
 f.config.ctx.storage.transaction=fn=>{transactions++;return originalTransaction(fn);};
 const originalDb=f.config.db;
 const db={prepare(sql){const statement=originalDb.prepare(sql);return{bind(...args){const q=statement.bind(...args);return{
 first:async()=>{if(sql.startsWith('SELECT * FROM dossier_node_process_closures'))reads++;return q.first();},
 run:()=>q.run()
 };}};}};
 const options=()=>({signal:controller.signal,assertCurrent,expiresAt:now()+3000});
 const host=()=>createOwnDurableEventHost({...f.config,db,now});
 return{f,db,host,options,controller,counts:()=>({reads,transactions,destroys}),
 withdraw:()=>{allowed=false;},expire:()=>{offset=4000;}};
}
for(const kind of ['abort','expiry','policy withdrawal']){
 test('guarded actual durable close starts no follow-up after '+kind+' during D1 write',async()=>{
  const s=setup(),entered=deferred(),release=deferred(),prepare=s.db.prepare;
  s.db.prepare=sql=>{const statement=prepare(sql);return{bind(...args){const q=statement.bind(...args);return{...q,run:async()=>{
   const answer=await q.run();if(sql.startsWith('INSERT OR IGNORE INTO dossier_node_process_closures')){entered.resolve();await release.promise;}return answer;
  }};}};};
  const result=s.host().close(s.options()).then(()=>({ok:true}),()=>({ok:false}));
  try{
   await entered.promise;
   if(kind==='abort')s.controller.abort();else if(kind==='expiry')s.expire();else s.withdraw();
   release.resolve();assert.equal((await result).ok,false);
   assert.deepEqual(s.counts(),{reads:0,transactions:0,destroys:0});
  }finally{release.resolve();await result;s.f.close();}
 });
}
test('guarded closure SQL does not commit after its deadline while provider request is pending',async()=>{
 const s=setup(),entered=deferred(),release=deferred(),prepare=s.db.prepare;
 s.db.prepare=sql=>{const statement=prepare(sql);return{bind(...args){const q=statement.bind(...args);return{...q,run:async()=>{
  if(sql.startsWith('INSERT OR IGNORE INTO dossier_node_process_closures')){entered.resolve();await release.promise;}return q.run();
 }};}};};
 const options={...s.options(),expiresAt:Date.now()+200},result=s.host().close(options).then(()=>true,()=>false);
 try{
  await entered.promise;await delay(Math.max(0,options.expiresAt-Date.now()+30));release.resolve();
  assert.equal(await result,false);
  await delay(20);
  assert.equal(s.f.db.prepare('SELECT COUNT(*) AS n FROM dossier_node_process_closures').get().n,0);
  assert.deepEqual(s.counts(),{reads:0,transactions:0,destroys:0});
 }finally{release.resolve();await result;s.f.close();}
});
test('guarded closure fences delayed storage entry and never starts destroy after withdrawal',async()=>{
 const s=setup(),entered=deferred(),release=deferred();let gets=0;
 const original=s.f.config.ctx.storage.transaction;
 s.f.config.ctx.storage.transaction=fn=>original(async tx=>{entered.resolve();await release.promise;return fn({...tx,get:async k=>{gets++;return tx.get(k);}});});
 const result=s.host().close(s.options()).then(()=>true,()=>false);
 try{
  await entered.promise;s.withdraw();release.resolve();assert.equal(await result,false);
  assert.equal(gets,0);assert.equal(s.counts().destroys,0);
 }finally{release.resolve();await result;s.f.close();}
});
test('guarded closure rejects a destroy ACK received after withdrawal',async()=>{
 const s=setup(),entered=deferred(),release=deferred();
 s.f.config.ctx.container.destroy=async()=>{entered.resolve();await release.promise;};
 const result=s.host().close(s.options()).then(()=>true,()=>false);
 try{await entered.promise;s.withdraw();release.resolve();assert.equal(await result,false);}
 finally{release.resolve();await result;s.f.close();}
});
test('guarded and legacy close remain successful within authority without starting a process',async()=>{
 for(const guarded of [true,false]){
  const s=setup();
  try{
   const result=guarded?await s.host().close(s.options()):await s.host().close();
   assert.deepEqual(result,{closed:true,runtimeStopRequested:true});
   assert.equal(s.f.boots(),0);assert.equal(s.counts().destroys,1);
   assert.equal(s.f.db.prepare('SELECT COUNT(*) AS n FROM dossier_node_process_closures').get().n,1);
  }finally{s.f.close();}
 }
});
