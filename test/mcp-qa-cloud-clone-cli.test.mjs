import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
async function execute(mode){
 let wall=Date.now(),mono=100,runs=0;const writes=[],logs=[],source='a'.repeat(40);
 const event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000199,body:'/afw-qa-deploy-observe-restore v1 '+source,created_at:new Date(wall-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}};
 if(mode==='badEvent')event.comment.body+=';echo PRIVATE_EVENT';
 const env={GITHUB_EVENT_PATH:'/synthetic/event.json',GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/main',GITHUB_EVENT_NAME:'issue_comment',GITHUB_RUN_ID:'41200000199',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:source,AFW_QA_CLOSED_TOKEN:'PRIVATE_CF_TOKEN_123456789012345',GITHUB_TOKEN:'PRIVATE_GH_TOKEN_123456789012345'};
 if(mode==='currentGitHubToken')env.GITHUB_TOKEN='ghs_SYNTHETIC_APPID_'+'a'.repeat(200)+'.'+'b'.repeat(280)+'.'+'c'.repeat(100);
 const process={env,exitCode:0};
 const built=await build({entryPoints:['scripts/qa-cloud-clone.mjs'],bundle:true,write:false,format:'esm',platform:'node',plugins:[{name:'actual-cli-synthetic-io',setup(b){
  b.onResolve({filter:/^node:fs\/promises$/},()=>({path:'fs',namespace:'entry-test'}));
  b.onResolve({filter:/^node:crypto$/},()=>({path:'crypto',namespace:'entry-test'}));
  b.onResolve({filter:/mcp-qa-cloud-clone\.mjs$/},()=>({path:'clone',namespace:'entry-test'}));
  b.onLoad({filter:/.*/,namespace:'entry-test'},a=>({contents:a.path==='fs'?'export const readFile=globalThis.__io.readFile,stat=globalThis.__io.stat,writeFile=globalThis.__io.writeFile;':a.path==='crypto'?'export const createHash=globalThis.__crypto.createHash;':'export const runQaClosedCloudClone=globalThis.__run;',loader:'js'}));
 }}]});
 const ClockDate=class extends Date{static now(){return wall;}};
 const context={process,Date:ClockDate,performance:{now:()=>mono},Buffer,Response,AbortController,TextDecoder,setTimeout,clearTimeout,fetch:async()=>{throw Error('Unexpected network');},console:{log:s=>logs.push(s),error:s=>logs.push(s)},__crypto:{createHash},__io:{readFile:async path=>{assert.equal(path,env.GITHUB_EVENT_PATH);return JSON.stringify(event);},stat:async()=>({size:Buffer.byteLength(JSON.stringify(event)),isFile:()=>true}),writeFile:async(path,text,options)=>writes.push({path,text,options})},__run:async({admission,credential,githubCredential})=>{
  runs++;if(mode==='controllerThrows')throw Error('PRIVATE_CONTROLLER');assert.equal(credential,env.AFW_QA_CLOSED_TOKEN);assert.equal(githubCredential,env.GITHUB_TOKEN);
  const r={purpose:'afw.qa-closed-cloud-clone.v1',status:'verified',intentId:admission.intentId,sourceRevision:mode==='wrongSource'?'b'.repeat(40):source,candidateVersionId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',finalClosedVerified:true,finalReadback:null,authorizesEffects:false,operationalReadiness:false,mayRetry:false};
  if(mode==='lateWall'||mode==='lateMono')Object.defineProperty(r,'settlement',{enumerable:true,get(){if(mode==='lateWall')wall=admission.cleanupExpiresAt;else mono+=480000;return 'captured';}});
  return r;
 }};
 await runInNewContext('(async()=>{'+built.outputFiles[0].text+'})()',context);return{process,writes,logs,runs};
}
test('actual CLI validates owner event, fixes result destination and never serializes credentials',async()=>{
 const r=await execute('normal');assert.equal(r.runs,1);assert.equal(r.process.exitCode,0);assert.equal(r.writes.length,1);assert.equal(r.writes[0].path,'afw-qa-closed-clone-result.json');assert.deepEqual(JSON.parse(JSON.stringify(r.writes[0].options)),{flag:'wx',mode:0o600});assert.equal(JSON.parse(r.writes[0].text).status,'verified');assert.equal(r.logs.some(s=>s.startsWith('AFW_QA_CLOSED_CLONE_RESULT ')),true);assert.equal(JSON.stringify(r.writes).includes('PRIVATE'),false);assert.equal(JSON.stringify(r.logs).includes('PRIVATE'),false);
});
for(const mode of ['lateWall','lateMono'])test('actual CLI retains IDs but rejects '+mode+' settlement without renewing cleanup',async()=>{
 const r=await execute(mode),out=JSON.parse(r.writes[0].text);assert.equal(r.process.exitCode,1);assert.equal(out.status,'uncertain');assert.equal(out.entrySettlementTimely,false);assert.equal(out.finalClosedVerified,false);assert.equal(out.candidateVersionId,'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');assert.equal(out.mayRetry,false);
});
for(const mode of ['badEvent','wrongSource'])test('actual CLI rejects '+mode+' without copying the event or secrets',async()=>{
 const r=await execute(mode);assert.equal(r.process.exitCode,1);assert.equal(r.runs,mode==='badEvent'?0:1);assert.equal(r.writes[0].path,'afw-qa-closed-clone-entry-failure.json');assert.equal(JSON.parse(r.writes[0].text).status,'blocked');assert.equal(JSON.parse(r.writes[0].text).stage,mode==='badEvent'?'admission':'settlement');const marker=r.logs.find(s=>s.startsWith('AFW_QA_CLOSED_CLONE_ENTRY_RESULT '));assert.ok(marker);assert.equal(JSON.parse(marker.slice('AFW_QA_CLOSED_CLONE_ENTRY_RESULT '.length)).stage,mode==='badEvent'?'admission':'settlement');assert.equal(JSON.stringify(r.writes).includes('PRIVATE'),false);assert.equal(JSON.stringify(r.logs).includes('PRIVATE'),false);
});

test('actual CLI transports a current-format opaque GitHub credential unchanged',async()=>{const r=await execute('currentGitHubToken');assert.equal(r.process.exitCode,0);assert.equal(r.runs,1);assert.equal(JSON.parse(r.writes[0].text).status,'verified');assert.equal(JSON.stringify(r.logs).includes('ghs_SYNTHETIC'),false);});
test('actual CLI controller exception emits only fixed entry-stage metadata',async()=>{const r=await execute('controllerThrows');assert.equal(r.process.exitCode,1);const out=JSON.parse(r.writes[0].text);assert.equal(out.stage,'controller');assert.equal(out.status,'blocked');const marker=r.logs.find(s=>s.startsWith('AFW_QA_CLOSED_CLONE_ENTRY_RESULT '));assert.ok(marker);assert.deepEqual(Object.keys(JSON.parse(marker.slice('AFW_QA_CLOSED_CLONE_ENTRY_RESULT '.length))).sort(),['purpose','status','stage','authorizesEffects','operationalReadiness','mayRetry'].sort());assert.equal(JSON.stringify(r.logs).includes('PRIVATE'),false);});
