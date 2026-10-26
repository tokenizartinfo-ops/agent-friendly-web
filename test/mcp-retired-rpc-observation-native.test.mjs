import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native retired-custody RPC lifecycle metadata does not become successor evidence',async()=>{
 const program='CI-only program',sourceRevision='c'.repeat(40),programHash=createHash('sha256').update(program).digest('hex');
 const now=Date.now(),window={startAt:now-1000,expiresAt:now+120000};
 const retired={purpose:'afw.node-retirement-observation.v1',processGeneration:'8'.repeat(64),programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40),image:'cloudflare/debian-trixie',createdAt:window.startAt-10000,expiresAt:window.startAt-5000,closedAt:window.startAt-3000,observedAt:window.startAt-2000,physicalStopVerified:false,mayStartSuccessor:false};
 const source=`import {DurableObject} from 'cloudflare:workers';import {readOwnSuccessorHost} from './lib/mcp-own-successor-host.mjs';
 export class Own extends DurableObject {observeRetired(){return {...JSON.parse(this.env.RETIRED),containerId:this.ctx.id.toString()};}}
 export default {async fetch(request,env){
  let calls=0,shape=null;const node=env.NODE;
  const namespace={idFromName:name=>node.idFromName(name),idFromString:id=>node.idFromString(id),get(id){const stub=node.get(id);return {async observeRetired(){calls++;const result=await stub.observeRetired(),d=Object.getOwnPropertyDescriptor(result,Symbol.dispose);shape={plain:Object.getPrototypeOf(result)===Object.prototype,strings:Object.keys(result).sort(),symbolKinds:Reflect.ownKeys(result).filter(k=>typeof k==='symbol').map(k=>k===Symbol.dispose?'dispose':'other'),disposer:d?{data:Object.hasOwn(d,'value'),kind:typeof d.value,enumerable:d.enumerable}:null};return result;}};}};
  const scope={accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',applicationId:'d6fc71552de7494a863aca20365a572d',ownerRef:'1'.repeat(64),projectRef:'2'.repeat(64),resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'};
  const original={containerId:node.idFromName('afw-own-event-one-occurrence-v1').toString(),applicationId:scope.applicationId,programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40)};
  const candidate={trialId:'e'.repeat(64),programHash:env.PROGRAM_HASH,sourceRevision:'c'.repeat(40),...JSON.parse(env.WINDOW),budget:1};
  const settings={DB:env.DB,AFW_DOSSIER_EVENTS_NODE:namespace,AFW_DOSSIER_SUCCESSOR_ENABLED:'true',AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication:{artifactKey:'a'.repeat(64),workerHash:'b'.repeat(64),activationKey:'d'.repeat(64)}}),AFW_DOSSIER_PROVIDER_READ_TOKEN:'synthetic_read_credential'};
  try{const host=readOwnSuccessorHost({env:settings,ctx:{id:node.idFromName('afw-own-event-first-successor-v1')},program:'CI-only program',sourceRevision:'c'.repeat(40),window:JSON.parse(env.WINDOW)});const r=await host.successor.readRetirement();return Response.json({status:'ok',calls,shape,purpose:r.purpose,physicalStopVerified:r.physicalStopVerified,mayStartSuccessor:r.mayStartSuccessor});}
  catch{return Response.json({status:'unavailable',calls,shape});}
 }};`;
 const compiled=await build({stdin:{contents:source,resolveDir:process.cwd(),sourcefile:'native-rpc-boundary.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false});
 let gets=0;const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{PROGRAM_HASH:programHash,RETIRED:JSON.stringify(retired),WINDOW:JSON.stringify(window)},durableObjects:{NODE:{className:'Own',useSQLite:true}},d1Databases:{DB:'native-rpc-observation'},outboundService:async request=>{
  assert.equal(request.method,'GET');assert.ok(request.url.startsWith('https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/containers/applications/d6fc71552de7494a863aca20365a572d/instances/'));assert.equal(request.headers.get('Authorization'),'Bearer synthetic_read_credential');gets++;
  return Response.json({success:true,errors:[],result:{id:request.url.split('/').at(-1),application_id:'d6fc71552de7494a863aca20365a572d',image:retired.image,started_at:new Date(window.startAt-9000).toISOString(),status:{state:'stopped',exit_code:0,updated_at:new Date(window.startAt-4000).toISOString()}}});
 }}));
 try{const r=await (await runtime.dispatchFetch('https://synthetic.invalid/')).json();assert.equal(r.status,'ok',JSON.stringify(r));assert.equal(r.calls,2);assert.equal(gets,2);assert.equal(r.shape.plain,true);assert.equal(r.shape.strings.length,12);assert.deepEqual(r.shape.symbolKinds,['dispose']);assert.equal(r.shape.disposer.data,true);assert.equal(r.shape.disposer.kind,'function');assert.equal(r.physicalStopVerified,true);assert.equal(r.mayStartSuccessor,false);}finally{await runtime.dispose();}
});
