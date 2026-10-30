import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {createHash} from 'node:crypto';
import {restorationFixture,ROOT} from './fixtures/canary-restoration.mjs';
// Native DO transaction rollback; injected corrupt rows/provider facts are
// synthetic. This is not a provider cancellation or remote runtime proof.
test('native fences roll back corruption introduced in each formerly direct transaction',async()=>{
 const entry=`import {DurableObject} from 'cloudflare:workers';
import {createPrivateCanaryRestorationHost} from './lib/mcp-hosted-canary-restoration.mjs';
import {restorationFixture} from './test/fixtures/canary-restoration.mjs';
import {createRetiredRpcReceipt} from './lib/mcp-retired-rpc-receipt.mjs';
const ORPHAN='afw.qa-generation-info.v2:'+'f'.repeat(64);
export class FenceFixture extends DurableObject{
 async commandFixture(kind,args,injectKey){
 const native=this.ctx.storage,storage={transaction:fn=>native.transaction(async t=>fn({
 get:async key=>{const value=await t.get(key);if(key===injectKey)await t.put(ORPHAN,{injected:true});return value;},
 put:(...values)=>t.put(...values),list:options=>t.list(options)}))};
 return createPrivateCanaryRestorationHost({env:this.env,ctx:{id:this.ctx.id,storage}})[kind](...args);
 }
 async rowsFixture(){return [...await this.ctx.storage.list()];}
 async clearFixture(){await this.ctx.storage.delete(ORPHAN);}
}
export class Original extends DurableObject{
 observeSuccessorRetiredReceipt(challenge){return createRetiredRpcReceipt({challenge,observe:async()=>({value:await this.observeFixture()})});}
 async observeFixture(){const at=Number(this.env.AT);return{purpose:'afw.node-retirement-observation.v1',containerId:this.ctx.id.toString(),programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40),processGeneration:'d'.repeat(64),image:'cloudflare/debian-trixie',createdAt:at-60000,expiresAt:at-10000,closedAt:at-20000,observedAt:Date.now(),physicalStopVerified:false,mayStartSuccessor:false};}
}
export default{async fetch(request,env){const body=await request.json(),stub=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
 if(body.kind==='policy')return Response.json(restorationFixture({at:Number(env.AT),containerId:env.AFW_MCP_CLOSURE_NODE.idFromName('afw-own-event-first-successor-v1').toString()}).policy);
 if(body.kind==='rows')return Response.json(await stub.rowsFixture());
 if(body.kind==='clear'){await stub.clearFixture();return Response.json({cleared:true});}
 return Response.json(await stub.commandFixture(body.kind,body.args,body.injectKey));
}};
`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'legacy-generation-fence-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 const at=Date.now();let raw='',provider=restorationFixture({at});
 const options=()=>convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AT:String(at),AFW_MCP_CLOSURE_ENABLED:'true',AFW_MCP_CLOSURE_POLICY:raw,AFW_MCP_CLOSURE_REDUCTION_ENABLED:'true',AFW_MCP_CLOSURE_REDUCTION_POLICY_HASH:'1'.repeat(64),AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-reader-token',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-publisher-token'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'FenceFixture',useSQLite:true,uniqueKey:'generation-legacy-fence'},AFW_MCP_CLOSURE_NODE:{className:'Original',useSQLite:true,uniqueKey:'generation-legacy-original'}},outboundService:async request=>{
 const u=new URL(request.url);assert.equal(u.origin,'https://api.cloudflare.com');
 if(u.pathname.includes('/instances/')&&!u.pathname.endsWith('/instances'))return Response.json({success:true,errors:[],result:{id:u.pathname.split('/').at(-1),application_id:provider.policy.candidate.applicationId,image:'cloudflare/debian-trixie',started_at:new Date(at-50000).toISOString(),status:{state:'stopped',exit_code:0,updated_at:new Date(at-21000).toISOString()}}});
 const reply=await provider.request({method:request.method,path:u.pathname.replace('/client/v4',''),query:Object.fromEntries([...u.searchParams].map(([k,v])=>[k,k==='per_page'?Number(v):v])),body:request.method==='POST'?await request.json():undefined});assert.ok(u.pathname.replace('/client/v4','').startsWith(ROOT+'/'));const{status,...body}=reply;return Response.json(body,{status});
 }});
 const mf=new Miniflare(options());try{
 const call=async(kind,args=[],injectKey='')=>{const response=await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,args,injectKey})});assert.equal(response.status,200);return response.json();};
 const p=await call('policy');raw=JSON.stringify(p);provider=restorationFixture({at,containerId:p.candidate.containerId});await mf.setOptions(options());const hash=createHash('sha256').update(raw).digest('hex');assert.equal((await call('arm',[hash])).status,'armed');const before=await call('rows');
 for(const [kind,args,key]of [['restore',[hash],'afw.successor-retirement-handoff.v1'],['reduce',[hash,'1'.repeat(64)],'afw.private-reduction-dispatch.v1']]){
 await call('clear');const result=await call(kind,args,key);assert.ok(['blocked','uncertain'].includes(result.status));assert.deepEqual(await call('rows'),before,'injected orphan and journal must roll back in '+kind);assert.equal(provider.posts,0);
 }
 }finally{await mf.dispose();}
});
