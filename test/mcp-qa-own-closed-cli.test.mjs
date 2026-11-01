import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
test('actual CLI rechecks the original client lease after proof settlement and field consumption',async()=>{
 for(const mode of ['normal','late','getter']){
  const at=Date.now(),sha='a'.repeat(40),event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000001,body:'/afw-own-closed-readback v1 '+sha,created_at:new Date(at-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}};
  const c={at,exitCode:0,argv:['node','fixture'],env:{GITHUB_EVENT_PATH:'/virtual/event.json',GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/main',GITHUB_EVENT_NAME:'issue_comment',GITHUB_RUN_ID:'41200000001',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:sha,AFW_QA_CLOSED_TOKEN:'PRIVATE-synthetic-read-token'},files:[],logs:[],errors:[]};
  c.now=()=>c.at;c.log=x=>c.logs.push(x);c.error=x=>c.errors.push(x);
  c.fs={stat:async()=>({isFile:()=>true,size:Buffer.byteLength(JSON.stringify(event))}),readFile:async()=>JSON.stringify(event),writeFile:async(path,text)=>{assert.equal(path,'afw-own-closed-readback-result.json');c.files.push(JSON.parse(text));}};
  c.proof=async()=>{if(mode==='late')c.at+=120001;const p={purpose:'afw.own-closed-readback.v1',status:'closed',readOnly:true,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};if(mode==='getter')Object.defineProperty(p,'purpose',{enumerable:true,get(){c.at+=120001;return'afw.own-closed-readback.v1';}});return p;};
  globalThis.__AFW_READBACK_TEST_CLI__=c;
  try{
   const source=(await readFile('scripts/own-closed-readback.mjs','utf8')).replaceAll('process.env','context.env').replaceAll('process.argv','context.argv').replaceAll('process.exitCode','context.exitCode').replaceAll('console.log','context.log').replaceAll('console.error','context.error').replaceAll('Date.now','context.now');
   const built=await build({stdin:{contents:'const context=globalThis.__AFW_READBACK_TEST_CLI__;\n'+source,resolveDir:process.cwd()+'/scripts',sourcefile:'own-closed-readback.mjs'},bundle:true,write:false,format:'esm',platform:'node',plugins:[{name:'test-only-platform-and-proof',setup(b){b.onResolve({filter:/^node:fs\/promises$/},()=>({path:'fs',namespace:'cli-test'}));b.onResolve({filter:/mcp-qa-own-closed-readback\.mjs$/},()=>({path:'proof',namespace:'cli-test'}));b.onLoad({filter:/.*/,namespace:'cli-test'},a=>({contents:a.path==='fs'?'const f=globalThis.__AFW_READBACK_TEST_CLI__.fs;export const stat=f.stat,readFile=f.readFile,writeFile=f.writeFile;':'export async function readOwnClosedRuntime(){return globalThis.__AFW_READBACK_TEST_CLI__.proof();}',loader:'js'}));}}]});
   await import('data:text/javascript;base64,'+Buffer.from(built.outputFiles[0].text).toString('base64')+'#'+mode);
   assert.equal(c.files.length,1);assert.equal(c.files[0].status,mode==='normal'?'closed':'blocked');assert.equal(c.exitCode,mode==='normal'?0:1);assert.equal(JSON.stringify(c.files).includes('PRIVATE'),false);
  }finally{delete globalThis.__AFW_READBACK_TEST_CLI__;}
 }
});
