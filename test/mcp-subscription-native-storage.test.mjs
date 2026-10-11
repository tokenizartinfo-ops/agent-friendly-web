import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdtempSync,rmSync,realpathSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname,basename} from 'node:path';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
for(const mode of ['local','node','node-lost-ack'])test('native workerd SQLite DO retains phase budget across restart: '+mode,async()=>{
const persist=mkdtempSync(join(tmpdir(),'afw-mcp-global-'));
const contents=`
import {createMcpSubscriptionController} from './lib/mcp-subscription-lifecycle.mjs';
export class Fixture{
 constructor(ctx){this.storage=ctx.storage;}
 async fetch(request){
  const path=new URL(request.url).pathname,p=request.method==='POST'?await request.json():{};
  const enabled=(await this.storage.get('enabled'))!==false;
  const receive=async message=>{await this.storage.put('sends',(await this.storage.get('sends')??0)+1);return {status:200,body:JSON.stringify({challenge:JSON.parse(message.body).challenge})};};
  let controller;const nodeHost=${mode !== 'local'}?{processGeneration:'f'.repeat(64),readReadiness:async()=>({purpose:'afw.mcp-node-readiness.v1',processGeneration:'f'.repeat(64),ready:true,expiresAt:Date.now()+600000}),readIdentity:async()=>({purpose:'afw.mcp-native-dispatch.v1',processGeneration:'f'.repeat(64),verified:true,expiresAt:Date.now()+600000}),send:async ref=>{const h=await controller.consumeNodeDispatch(ref);return receive(h.envelope);}}:undefined;
  let lose=${mode === 'node-lost-ack'};const journal={transaction:fn=>this.storage.transaction(fn).then(value=>{if(lose&&value?.version===2&&value.nodeStartedAt!==null){lose=false;throw Error('synthetic lost native ACK');}return value;})};
  controller=createMcpSubscriptionController({storage:journal,custodyKey:Buffer.alloc(32,1),readAuthorization:async()=>({principalRef:'a'.repeat(64),resourceRef:'b'.repeat(64),projectRef:'c'.repeat(64),permissionRef:'d'.repeat(64),enabled,expiresAt:Date.now()+600000}),send:async(_,message)=>receive(message),nodeHost});
  try{let value;if(path==='/subscribe')value=await controller.subscribe(p);else if(path==='/deliver')value=await controller.deliver(p.id,p.signal);else if(path==='/unsubscribe')value=await controller.unsubscribe(p);else if(path==='/disable'){await this.storage.put('enabled',false);value={};}else value={sends:await this.storage.get('sends')??0,transports:[...(await this.storage.list({prefix:'afw-mcp-subscription/v1:transport:'})).values()].map(r=>({phase:r.phase,digest:r.digest,consumed:r.consumedAt!==null,nodeStarted:r.nodeStartedAt??null,nodeProcess:r.nodeProcessGeneration??null}))};return Response.json({value});}catch{return Response.json({code:'unavailable'}, {status:409});}
 }
}
export default{fetch(request,env){return env.QA.get(env.QA.idFromName('single-own-qa')).fetch(request);}};
`;
const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*']});
const options=convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,durableObjects:{QA:{className:'Fixture',useSQLite:true}},resourcePersistencePath:persist});
let runtime=new Miniflare(options);
const call=async(path,body,status=200)=>{const r=await runtime.dispatchFetch('https://synthetic.invalid'+path,body?{method:'POST',body:JSON.stringify(body)}:undefined);assert.equal(r.status,status);return r.json();};
const p={name:'afw.dossier.changed',arguments:{projectRef:'c'.repeat(64)},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/synthetic',secret:'whsec_'+Buffer.alloc(32,2).toString('base64')}};
try{
 if(mode==='node-lost-ack'){await call('/subscribe',p,409);const spent=(await call('/status')).value;assert.equal(spent.sends,0);assert.equal(spent.transports.length,1);assert.notEqual(spent.transports[0].nodeStarted,null);await runtime.dispose();runtime=new Miniflare(options);await call('/subscribe',p,409);assert.deepEqual((await call('/status')).value,spent);return;}
 const first=(await call('/subscribe',p)).value;const firstStatus=(await call('/status')).value;assert.equal(firstStatus.sends,1);assert.equal(firstStatus.transports.length,1);assert.equal(firstStatus.transports[0].phase,'verification');assert.equal(firstStatus.transports[0].consumed,true);
 await runtime.dispose();runtime=new Miniflare(options);
 assert.equal((await call('/subscribe',p)).value.id,first.id);assert.equal((await call('/status')).value.sends,1);
 assert.deepEqual((await call('/status')).value.transports,firstStatus.transports);
 await call('/subscribe',{...p,delivery:{...p.delivery,url:'https://callback.agentfriendlyweb.dev/second'}},409);
 const signal={version:'afw-dossier-event-v1',eventId:'e'.repeat(64),projectRef:'c'.repeat(64),revision:1,kind:'project_updated',observedAt:new Date().toISOString()};
 assert.equal((await call('/deliver',{id:first.id,signal})).value.cloudReviewConfirmed,false);await call('/deliver',{id:first.id,signal},409);assert.equal((await call('/status')).value.sends,2);
 const delivered=(await call('/status')).value;assert.deepEqual(delivered.transports.map(r=>r.phase).sort(),['delivery','verification']);assert.ok(delivered.transports.every(r=>r.consumed));if(mode==='node')assert.ok(delivered.transports.every(r=>r.nodeStarted!==null&&r.nodeProcess==='f'.repeat(64)));else assert.ok(delivered.transports.every(r=>r.nodeStarted===null));
 await runtime.dispose();runtime=new Miniflare(options);assert.deepEqual((await call('/status')).value,delivered);await call('/deliver',{id:first.id,signal},409);
 await call('/disable',{});await call('/unsubscribe',{name:p.name,arguments:p.arguments,delivery:{mode:'webhook',url:p.delivery.url}});await call('/subscribe',p,409);

}finally{await runtime.dispose();const target=realpathSync(persist);assert.equal(dirname(target),realpathSync(tmpdir()));assert.ok(basename(target).startsWith('afw-mcp-global-'));rmSync(target,{recursive:true});}
});
