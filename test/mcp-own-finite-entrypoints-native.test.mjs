import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
// Actual compiled Worker/DO entrypoints under workerd. No provider, credentials,
// Container or grant is provisioned; all trap instrumentation is fixture-only.
test('native finite legacy delivery and schedule cannot enter any host capability',async()=>{
 const contents=`
 import worker,{AfwOwnEventNode} from './worker/mcp-own/index.mjs';
 export class Native extends AfwOwnEventNode{
  constructor(ctx,env){const touches=[];super(ctx,new Proxy(env,{get(_v,k){touches.push(String(k));throw Error('host forbidden');}}));this.touches=touches;}
  async fixture(method){try{await this[method]('old-event','old-subscription');return {denied:false,touches:this.touches};}catch{return {denied:true,touches:this.touches};}}
 }
 export default{async fetch(request,env){const method=new URL(request.url).pathname.slice(1);
  if(method==='schedule'){const touches=[];const result=await worker.scheduled({scheduledTime:Date.now()},new Proxy(env,{get(_v,k){touches.push(String(k));throw Error('host forbidden');}}));return Response.json({result,touches});}
  return Response.json(await env.NODE.get(env.NODE.idFromName('receiver')).fixture(method));
 }};
 `;
 const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':'"finite_trial_event"'}});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{NODE:{className:'Native',useSQLite:true}}}));
 try{
  for(const method of ['deliverOwnSaved','deliverSaved'])assert.deepEqual(await (await mf.dispatchFetch('https://fixture.invalid/'+method)).json(),{denied:true,touches:[]});
  assert.deepEqual(await (await mf.dispatchFetch('https://fixture.invalid/schedule')).json(),{result:null,touches:[]});
 }finally{await mf.dispose();}
});
