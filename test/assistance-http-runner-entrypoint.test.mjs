import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,copyFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync,spawn} from 'node:child_process';

async function fixture(){
 const dir=await mkdtemp(join(tmpdir(),'afw-http-cli-'));
 await mkdir(join(dir,'scripts'));await mkdir(join(dir,'lib'));
 await copyFile(new URL('../scripts/afw-run-http-occurrence.mjs',import.meta.url),join(dir,'scripts/afw-run-http-occurrence.mjs'));
 for(const name of ['assistance-occurrence-host-bridge','assistance-http-occurrence','operations-http-transport','assistance-occurrence-transport-budget','assistance-supervision-contract'])await copyFile(new URL('../lib/'+name+'.mjs',import.meta.url),join(dir,'lib',name+'.mjs'));
 const git=(...args)=>execFileSync('git',args,{cwd:dir,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 git('init');git('config','user.name','Synthetic QA');git('config','user.email','qa@example.invalid');git('add','.');git('commit','-m','fixture');git('remote','add','origin','https://github.com/tokenizartinfo-ops/agent-friendly-web.git');
 const t=Date.now(),uuid='12345678-1234-4234-8234-123456789abc';
 const signal={version:'afw-assistance-event-v1',eventId:'a'.repeat(64),projectRef:'b'.repeat(64),revision:10,kind:'assistance_requested',topic:'orientation',observedAt:new Date(t).toISOString()};
 const manifest={occurrenceId:uuid,requestId:uuid,signal,sourceRevision:git('rev-parse','HEAD'),configId:'cecfg_test',publicationId:'cecfgver_test',startAt:t,deadline:t+180000,tokenExpiresAt:t+180000,serverDeadline:t+180000};
 // Both files are outside the Git checkout: readiness is real, HTTP synthetic.
 const input=dir+'.json',preload=dir+'.mjs';const planDigest='d'.repeat(64);
 await writeFile(input,JSON.stringify({manifest,planDigest}));
 await writeFile(preload,`const manifest=${JSON.stringify(manifest)},planDigest=${JSON.stringify(planDigest)};let n=0;globalThis.fetch=async req=>{n++;const path=new URL(req.url).pathname;const phase=path.endsWith('admit-claim')?'admitClaim':path.endsWith('admit-finish')?'admitFinish':path.split('/').at(-1);const result=phase==='list'?[manifest.signal]:phase==='claim'?{eventId:manifest.signal.eventId,requestId:manifest.requestId,runId:manifest.requestId,expiresAt:manifest.deadline}:phase==='finish'?'intervention_required':phase==='stop'?'stopped':'accepted';return Response.json({version:'afw-occurrence-http-v1',occurrenceId:manifest.occurrenceId,phase,sequence:n,planDigest,result});};`);
 return {dir,input,preload,manifest,cleanup:async()=>{await rm(dir,{recursive:true,force:true,maxRetries:3,retryDelay:100});await rm(input,{force:true});await rm(preload,{force:true});}};
}
async function run(f,{patch={},file=f.input}={}){
 const child=spawn(process.execPath,['--import',pathToFileURL(f.preload).href,join(f.dir,'scripts/afw-run-http-occurrence.mjs'),file],{cwd:tmpdir(),env:{...process.env,AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic'},stdio:['pipe','pipe','pipe']});
 let buffer='',stderr='';const frames=[];child.stderr.on('data',c=>{stderr+=c;});
 child.stdout.on('data',c=>{buffer+=c;let i;while((i=buffer.indexOf('\n'))>=0){const frame=JSON.parse(buffer.slice(0,i));buffer=buffer.slice(i+1);frames.push(frame);if(frame.type==='observe')child.stdin.write(JSON.stringify({version:frame.version,type:'observation',id:frame.id,nonce:frame.nonce,cloud:{configId:f.manifest.configId,publicationId:f.manifest.publicationId,configurationRevision:1,observationRevision:1,observationsCurrent:true,networkMode:'restricted',networkEnforced:true,operationsBindingsReady:true,...patch}})+'\n');}});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});return {code,stderr,frames};
}
test('real process runner completes six synthetic HTTP phases with six host exchanges',async()=>{
 const f=await fixture();try{const r=await run(f);assert.equal(r.code,0);assert.equal(r.stderr,'');assert.equal(r.frames.filter(x=>x.type==='observe').length,6);const last=r.frames.at(-1);assert.equal(last.type,'occurrenceResult');assert.equal(last.result.status,'completed');assert.equal(last.result.total,6);assert.equal(JSON.stringify(r.frames).includes('synthetic'),false);}finally{await f.cleanup();}
});
test('incongruent host observation denies before HTTP, with bounded sanitized result',async()=>{
 const f=await fixture();try{const r=await run(f,{patch:{networkEnforced:false}});assert.equal(r.code,1);assert.equal(r.stderr,'');assert.equal(r.frames.length,2);assert.equal(r.frames.at(-1).result.total,0);assert.equal(r.frames.at(-1).result.status,'stopped');}finally{await f.cleanup();}
});
test('invalid metadata, extra credential fields, missing path and oversized files fail before any frame',async()=>{
 const f=await fixture();try{for(const data of ['{',JSON.stringify({manifest:f.manifest,planDigest:'d'.repeat(64),secret:'never-print-this'}),' '.repeat(8193)]){await writeFile(f.input,data);const r=await run(f);assert.equal(r.code,1);assert.equal(r.stderr,'');assert.deepEqual(r.frames,[{version:'afw-host-observe-v1',type:'occurrenceResult',result:{status:'unavailable'}}]);}const r=await run(f,{file:f.input+'.absent'});assert.equal(r.code,1);assert.equal(r.stderr,'');assert.equal(r.frames.length,1);}finally{await f.cleanup();}
});
