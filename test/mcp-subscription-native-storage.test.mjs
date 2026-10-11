import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdtempSync,rmSync,realpathSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname,basename} from 'node:path';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native workerd SQLite DO retains the global subscription and delivery budget across runtime restart',async()=>{
const persist=mkdtempSync(join(tmpdir(),'afw-mcp-global-'));
const contents=`
import {createMcpSubscriptionController} from './lib/mcp-subscription-lifecycle.mjs';
export class Fixture{
 constructor(ctx){this.storage=ctx.storage;}
 async fetch(request){
  const path=new URL(request.url).pathname,p=request.method==='POST'?await request.json():{};
  const enabled=(await this.storage.get('enabled'))!==false;
  const controller=createMcpSubscriptionController({storage:this.storage,custodyKey:Buffer.alloc(32,1),readAuthorization:async()=>({principalRef:'a'.repeat(64),resourceRef:'b'.repeat(64),projectRef:'c'.repeat(64),permissionRef:'d'.repeat(64),enabled,expiresAt:Date.now()+600000}),send:async(_,message)=>{await this.storage.put('sends',(await this.storage.get('sends')??0)+1);return {status:200,body:JSON.stringify({challenge:JSON.parse(message.body).challenge})};}});
  try{let value;if(path==='/subscribe')value=await controller.subscribe(p);else if(path==='/deliver')value=await controller.deliver(p.id,p.signal);else if(path==='/unsubscribe')value=await controller.unsubscribe(p);else if(path==='/disable'){await this.storage.put('enabled',false);value={};}else value={sends:await this.storage.get('sends')??0};return Response.json({value});}catch{return Response.json({code:'unavailable'}, {status:409});}
 }
}
export default{fetch(request,env){return env.QA.get(env.QA.idFromName('single-own-qa')).fetch(request);}};
`;
const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*']});
const options=convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,durableObjects:{QA:{className:'Fixture',useSQLite:true}},durableObjectsPersist:persist});
let runtime=new Miniflare(options);
const call=async(path,body,status=200)=>{const r=await runtime.dispatchFetch('https://synthetic.invalid'+path,body?{method:'POST',body:JSON.stringify(body)}:undefined);assert.equal(r.status,status);return r.json();};
const p={name:'afw.dossier.changed',arguments:{projectRef:'c'.repeat(64)},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/synthetic',secret:'whsec_'+Buffer.alloc(32,2).toString('base64')}};
try{
 const first=(await call('/subscribe',p)).value;assert.equal((await call('/status')).value.sends,1);
 await runtime.dispose();runtime=new Miniflare(options);
 assert.equal((await call('/subscribe',p)).value.id,first.id);assert.equal((await call('/status')).value.sends,1);
 await call('/subscribe',{...p,delivery:{...p.delivery,url:'https://callback.agentfriendlyweb.dev/second'}},409);
 const signal={version:'afw-dossier-event-v1',eventId:'e'.repeat(64),projectRef:'c'.repeat(64),revision:1,kind:'project_updated',observedAt:new Date().toISOString()};
 assert.equal((await call('/deliver',{id:first.id,signal})).value.cloudReviewConfirmed,false);await call('/deliver',{id:first.id,signal},409);assert.equal((await call('/status')).value.sends,2);
 await call('/disable',{});await call('/unsubscribe',{name:p.name,arguments:p.arguments,delivery:{mode:'webhook',url:p.delivery.url}});await call('/subscribe',p,409);

}finally{await runtime.dispose();const target=realpathSync(persist);assert.equal(dirname(target),realpathSync(tmpdir()));assert.ok(basename(target).startsWith('afw-mcp-global-'));rmSync(target,{recursive:true});}
});
