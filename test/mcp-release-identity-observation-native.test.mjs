import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

// Fails if the real operator cannot resolve fixed identities without starting
// an actor, touching a credential, reserving a successor or contacting a provider.
test('native operator resolves event identities before consent without actor or network IO',async()=>{
 const compiled=await build({stdin:{contents:`
import {DurableObject} from 'cloudflare:workers';
import original,{AfwReleaseWorkflow} from './worker/mcp-release/index.mjs';
export {AfwReleaseWorkflow};
export class Own extends DurableObject { constructor(...args){super(...args);throw Error('Forbidden actor activation');} }
export default {async fetch(r,e){
 const u=new URL(r.url);
 if(u.pathname==='/fixture/ids')return Response.json({original:e.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString(),successor:e.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()});
 if(u.pathname==='/fixture/create'){const b=await r.json(),v=await e.FLOW.create(b);return Response.json({id:v.id});}
 if(u.pathname==='/fixture/status')return Response.json(await(await e.FLOW.get(u.searchParams.get('id'))).status());
 return original.fetch(r,e);
}};
`,resolveDir:process.cwd(),sourcefile:'identity-preflight-native-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 let raw='',networkCalls=0;
 const options=()=>convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{
  AFW_RELEASE_IDENTITY_OBSERVATION_ENABLED:'true',AFW_RELEASE_IDENTITY_OBSERVATION_POLICY:raw,
  AFW_RELEASE_OPERATOR_ENABLED:'false',AFW_RELEASE_WORKFLOW_ENABLED:'false',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'false',AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED:'false'
 },durableObjects:{AFW_RELEASE_EVENTS_NODE:{className:'Own',useSQLite:true,uniqueKey:'afw-identity-preflight-native'}},workflows:{FLOW:{name:'afw-identity-preflight-fixture',className:'AfwReleaseWorkflow'}},outboundService:()=>{networkCalls++;throw Error('Forbidden network');}});
 const mf=new Miniflare(options());
 try{
  const call=async(path,body)=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{});assert.equal(r.status,200);return r.json();};
  const ids=await call('/fixture/ids'),at=Date.now();
  raw=JSON.stringify({startAt:at,expiresAt:at+60000,namespaceId:'d6fc71552de7494a863aca20365a572d',originalContainerId:ids.original});
  await mf.setOptions(options());
  const hash=createHash('sha256').update(raw).digest('hex'),id='afw-release-identity-'+hash;
  await call('/fixture/create',{id,params:{identityHash:hash}});
  let result;const end=Date.now()+10000;
  do{result=await call('/fixture/status?id='+id);if(['complete','errored'].includes(result.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
  assert.equal(result.status,'complete',JSON.stringify(result));
  assert.equal(result.output.status,'observed',JSON.stringify(result.output));
  assert.equal(result.output.originalContainerId,ids.original);
  assert.equal(result.output.successorContainerId,ids.successor);
  assert.notEqual(ids.original,ids.successor);
  assert.equal(result.output.mayBoot,false);assert.equal(result.output.mayReserve,false);assert.equal(result.output.operationalReadiness,false);
  assert.equal(networkCalls,0);
  assert.equal((await mf.dispatchFetch('https://fixture.invalid/identity')).status,404);
 }finally{await mf.dispose();}
});
