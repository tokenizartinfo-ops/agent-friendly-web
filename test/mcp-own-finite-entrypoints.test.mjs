import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
// Actual source class, isolated bundled module. Only the platform base-class
// constructors are synthetic here; workerd composition is qualified separately.
async function source(profile){
 const result=await build({entryPoints:['worker/mcp-own/index.mjs'],bundle:true,write:false,format:'esm',platform:'node',define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify(profile)},plugins:[{name:'synthetic-platform-base',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'base',namespace:'synthetic'}));b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:'export class DurableObject{constructor(ctx,env){this.ctx=ctx;this.env=env;}} export class WorkerEntrypoint{constructor(ctx,env){this.ctx=ctx;this.env=env;}}'}));}}]});
 return import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text+'\n// '+profile).toString('base64'));
}
test('compiled finite receiver denies legacy delivery before every host capability',async()=>{
 const {AfwOwnEventNode}=await source('finite_trial_event');
 for(const [method,args] of [['deliverOwnSaved',['old-event']],['deliverSaved',['old-subscription','old-event']]]){
  const touches=[],trap=new Proxy({},{get(_o,key){touches.push(String(key));throw Error('must not touch host');}});
  const node=new AfwOwnEventNode(trap,trap);
  await assert.rejects(node[method](...args));
  assert.deepEqual(touches,[],method+' touched a host capability');
 }
});
test('finite scheduled legacy event route stops before policy, storage or transport',async()=>{
 const {default:worker}=await source('finite_trial_event'),touches=[];
 const env=new Proxy({},{get(_o,key){touches.push(String(key));throw Error('must not inspect policy');}});
 assert.equal(await worker.scheduled({scheduledTime:Date.now()},env),null);
 assert.deepEqual(touches,[]);
});
