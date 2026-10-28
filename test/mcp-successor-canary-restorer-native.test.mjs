import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {restorationFixture} from './fixtures/canary-restoration.mjs';
// Real private DO storage, synthetic provider/handoff/clock: not deployment or
// original consent/Container/withdrawal acceptance.
test('native private restoration journal survives concurrency recreation and both unknown ACK boundaries',async()=>{
 const compiled=await build({stdin:{contents:`
 import {DurableObject} from 'cloudflare:workers';
 import {createSuccessorCanaryRestorer} from './lib/mcp-successor-canary-restorer.mjs';
 import {restorationFixture} from './test/fixtures/canary-restoration.mjs';
 export class Original extends DurableObject {fetch(){return new Response(null,{status:404});}}
 export class Coordinator extends DurableObject {
  async fetch(){
   const f=restorationFixture({at:Number(this.env.AT),containerId:this.env.NODE.idFromName('afw-own-event-first-successor-v1').toString()});
   let calls=0;
   const storage={transaction:async fn=>{const r=await this.ctx.storage.transaction(fn);if(this.env.LOSE_ISSUED==='true'&&++calls===2)throw Error('CI-only lost committed storage ACK');return r;}};
   const runner=createSuccessorCanaryRestorer({...f.options,storage,namespace:this.env.NODE,request:async x=>{const u=new URL('https://api.cloudflare.com/client/v4'+x.path);for(const[k,v]of Object.entries(x.query??{}))u.searchParams.set(k,String(v));const r=await fetch(u,{method:x.method,body:x.body?JSON.stringify(x.body):undefined,signal:x.signal,redirect:'manual',headers:{'Content-Type':'application/json'}});return{...await r.json(),status:r.status};}});
   return Response.json(await runner.advance());
  }
 }
 export default{fetch(r,e){return e.JOURNAL.get(e.JOURNAL.idFromName('own-synthetic')).fetch(r);}};
 `,resolveDir:process.cwd(),sourcefile:'canary-restorer-native-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 for(const mode of ['normal','issued-ack','provider-ack']){
  const at=Date.now(),provider=restorationFixture({at});
  const options=(revision,lose)=>convertV4MiniflareOptions({workers:[{name:'restorer',modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AT:String(at),REV:revision,LOSE_ISSUED:lose?'true':'false'},durableObjects:{NODE:{className:'Original',useSQLite:true,uniqueKey:'afw-restorer-original-'+mode},JOURNAL:{className:'Coordinator',useSQLite:true,uniqueKey:'afw-restorer-journal-'+mode}},outboundService:async request=>{const url=new URL(request.url),x={method:request.method,path:url.pathname.replace('/client/v4',''),query:Object.fromEntries(url.searchParams),body:request.method==='POST'?await request.json():undefined};const r=await provider.request(x);if(mode==='provider-ack'&&request.method==='POST')return new Response(null,{status:503});const{status,...body}=r;return Response.json(body,{status});}}]});
  const mf=new Miniflare(options('first',mode==='issued-ack'));
  try{
   if(mode==='normal'){
    const both=await Promise.all([mf.dispatchFetch('https://fixture.invalid/advance').then(r=>r.json()),mf.dispatchFetch('https://fixture.invalid/advance').then(r=>r.json())]);assert.ok(both.some(r=>r.status==='restored_observed'));assert.equal(provider.posts,1);
    await mf.setOptions(options('recreated',false));assert.equal((await(await mf.dispatchFetch('https://fixture.invalid/advance')).json()).status,'restored_observed');assert.equal(provider.posts,1);
   }else{
    assert.equal((await(await mf.dispatchFetch('https://fixture.invalid/advance')).json()).status,'uncertain');assert.equal(provider.posts,mode==='issued-ack'?0:1);
    await mf.setOptions(options('recreated',false));const r=await(await mf.dispatchFetch('https://fixture.invalid/advance')).json();assert.equal(r.status,mode==='issued-ack'?'uncertain':'closed_observed_uncertain');assert.equal(provider.posts,mode==='issued-ack'?0:1);
   }
  }finally{await mf.dispose();}
 }
});
