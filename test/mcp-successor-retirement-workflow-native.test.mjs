import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
// Synthetic custody/provider authority ONLY. Real native Workflow and cross-script
// RPC serialization/lifecycle, not production D1/Container/consent acceptance.
test('native Workflow observes fixed successor RPC retirement while ordinary release and HTTP stay closed',async()=>{
 const sourceRevision='c'.repeat(40),programHash='b'.repeat(64),app='d6fc71552de7494a863aca20365a572d',now=Date.now(),createdAt=now-20000,expiresAt=now-10000,closedAt=now-9000;
 const own=`import {DurableObject} from 'cloudflare:workers';
 export class Own extends DurableObject{
 observeSuccessorRetired(...args){if(args.length)throw Error('Unexpected selector');return{purpose:'afw.node-retirement-observation.v1',containerId:this.ctx.id.toString(),processGeneration:'d'.repeat(64),programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40),image:'cloudflare/debian-trixie',...JSON.parse(this.env.TIMES),observedAt:Date.now(),physicalStopVerified:false,mayStartSuccessor:false};}
 close(){throw Error('Read-only fixture must not close');}
 }
 export default{fetch(){return new Response(null,{status:404});}};`;
 const compiled=await build({entryPoints:['worker/mcp-release/index.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false,define:{'globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__':'undefined'}});
 let gets=0;
 const bindNode={className:'Own',scriptName:'own',useSQLite:true,uniqueKey:'afw-retirement-native-fixture'};
 const settings=bindings=>convertV4MiniflareOptions({workers:[
 {name:'own',modules:true,script:own,compatibilityDate:'2026-09-07',durableObjects:{NODE:{className:'Own',useSQLite:true,uniqueKey:'afw-retirement-native-fixture'}},bindings:{TIMES:JSON.stringify({createdAt,expiresAt,closedAt})}},
 {name:'operator',modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings,
 durableObjects:{AFW_RELEASE_EVENTS_NODE:bindNode},workflows:{FLOW:{name:'afw-successor-retired-native',className:'AfwReleaseWorkflow'}},
 outboundService:async request=>{gets++;assert.equal(request.method,'GET');assert.ok(request.url.startsWith('https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/containers/applications/'+app+'/instances/'));assert.equal(request.headers.get('Authorization'),'Bearer synthetic_read_credential');
 return Response.json({success:true,errors:[],result:{id:request.url.split('/').at(-1),application_id:app,image:'cloudflare/debian-trixie',started_at:new Date(createdAt+1000).toISOString(),status:{state:'stopped',exit_code:0,updated_at:new Date(closedAt+1000).toISOString()}}});}}
 ]});
 const flags={AFW_RELEASE_OPERATOR_ENABLED:'false',AFW_RELEASE_WORKFLOW_ENABLED:'false',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'false',AFW_RELEASE_READ_TOKEN:'synthetic_read_credential'};
 const mf=new Miniflare(settings(flags));
 try{
 const first=await mf.getBindings('operator'),containerId=first.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString();
 const policy={startAt:Date.now()-1000,expiresAt:Date.now()+60000,candidate:{containerId,applicationId:app,programHash,sourceRevision}},raw=JSON.stringify(policy),observationHash=createHash('sha256').update(raw).digest('hex');
 await mf.setOptions(settings({...flags,AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED:'true',AFW_RELEASE_RETIREMENT_OBSERVATION_POLICY:raw}));
 const bindings=await mf.getBindings('operator');assert.equal(bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString(),containerId);
 assert.equal((await (await mf.getWorker('operator')).fetch('https://synthetic.invalid/')).status,404);
 const one=await bindings.FLOW.create({id:'afw-successor-retired-'+observationHash,params:{observationHash}});
 const end=Date.now()+12000;let state;
 do{state=await one.status();if(state.status==='complete')break;if(['errored','terminated'].includes(state.status))assert.fail('Read-only Workflow errored');await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
 assert.equal(state.status,'complete');assert.equal(state.output.status,'retired_verified',JSON.stringify(state.output));assert.equal(state.output.evidence.containerId,containerId);assert.equal(state.output.evidence.physicalStopVerified,true);assert.equal(state.output.mayRestoreAdministration,false);assert.equal(state.output.operationalReadiness,false);assert.equal(gets,2);
 }finally{await mf.dispose();}
});
