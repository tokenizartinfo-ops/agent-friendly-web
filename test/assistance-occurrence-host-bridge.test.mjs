import test,{afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {PassThrough} from 'node:stream';
import {mkdtemp,writeFile,rm,mkdir,copyFile,chmod} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync,spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
import {delimiter} from 'node:path';
const load=()=>import('../lib/assistance-occurrence-host-bridge.mjs');
const origin='https://github.com/tokenizartinfo-ops/agent-friendly-web.git';
const pins={sourceRevision:'a'.repeat(40),configId:'cecfg_test',publicationId:'cecfgver_test'};
const cloud={configId:pins.configId,publicationId:pins.publicationId,configurationRevision:1,observationRevision:1,observationsCurrent:true,networkMode:'restricted',networkEnforced:true,operationsBindingsReady:true};
const reply=(frame,patch={})=>JSON.stringify({version:frame.version,type:'observation',id:frame.id,nonce:frame.nonce,cloud:{...cloud},...patch})+'\n';
const temporary=[];
afterEach(async()=>{for(const dir of temporary.splice(0))await rm(dir,{recursive:true,force:true});});
// Load identical canonical files in a real temporary Git repository. No Git
// readiness mock, no alternate path selectable via IPC, no cloud proof.
async function fixture(options={}){
 const dir=await mkdtemp(join(tmpdir(),'afw-host-ipc-'));temporary.push(dir);await mkdir(join(dir,'lib'));await mkdir(join(dir,'scripts'));
 await copyFile(new URL('../scripts/afw-occurrence-host-bridge.mjs',import.meta.url),join(dir,'scripts/afw-occurrence-host-bridge.mjs'));
 for(const name of ['assistance-occurrence-host-bridge','assistance-http-occurrence','operations-http-transport','assistance-occurrence-transport-budget','assistance-supervision-contract'])await copyFile(new URL('../lib/'+name+'.mjs',import.meta.url),join(dir,'lib',name+'.mjs'));
 const git=(...args)=>execFileSync('git',args,{cwd:dir,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 git('init');git('config','user.name','Synthetic QA');git('config','user.email','qa@example.invalid');git('add','lib','scripts');git('commit','-m','fixture');git('remote','add','origin',origin);
 const api=await import(pathToFileURL(join(dir,'lib/assistance-occurrence-host-bridge.mjs'))),input=new PassThrough(),output=new PassThrough(),frames=[];
 output.on('data',chunk=>frames.push(JSON.parse(chunk.toString())));
 const sourceRevision=git('rev-parse','HEAD');
 const bridge=api.createOccurrenceHostBridge({input,output,pins:{...pins,sourceRevision},...options});
 return {...api,input,output,frames,bridge,pins:{...pins,sourceRevision},dir};
}
test('HOSTBRIDGE has an internal API wrapping the existing runner',async()=>{
 const api=await load();assert.equal(typeof api.createOccurrenceHostBridge,'function');assert.equal(typeof api.runAssistanceHttpOccurrenceWithHostBridge,'function');
});
test('EOF and stream error terminate pending observation without private error details',async()=>{
 for(const error of [false,true]){
  const f=await fixture(),p=f.bridge.preflight({});
  if(error)f.input.destroy(Error('private-error'));else f.input.end();
  await assert.rejects(p,/Host observation denied/);await assert.rejects(f.bridge.preflight({}),/Host observation denied/);f.bridge.close();
 }
});
test('bounded timeout aborts a pending read, with no retry or second frame',async()=>{
 const f=await fixture({timeoutMs:20}),p=f.bridge.preflight({});
 await assert.rejects(p,/Host observation denied/);assert.equal(f.frames.length,1);await assert.rejects(f.bridge.preflight({}),/Host observation denied/);f.bridge.close();
});
test('cancellation is sticky and ignores late metadata',async()=>{
 const f=await fixture(),abort=new AbortController(),p=f.bridge.preflight({signal:abort.signal});abort.abort();
 await assert.rejects(p,/Host observation denied/);if(f.frames[0])f.input.write(reply(f.frames[0]));
 await assert.rejects(f.bridge.preflight({}),/Host observation denied/);f.bridge.close();
});
test('unsolicited frames, correlation mismatch, extras, oversized and invalid UTF8 fail closed',async()=>{
 for(const kind of ['unsolicited','id','nonce','extra','bounds','utf8','cloudExtra','stale']){
  const f=await fixture();let p;
  if(kind==='unsolicited'){f.input.write(reply({version:'afw-host-observe-v1',id:1,nonce:'a'}));p=f.bridge.preflight({});}
  else {p=f.bridge.preflight({});await new Promise(r=>setImmediate(r));const frame=f.frames[0];
   const patch=kind==='id'?{id:2}:kind==='nonce'?{nonce:'bad'}:kind==='extra'?{privateText:'forbidden'}:kind==='cloudExtra'?{cloud:{...cloud,privateText:'forbidden'}}:kind==='stale'?{cloud:{...cloud,observationsCurrent:false}}:{};
   f.input.write(kind==='bounds'?'x'.repeat(2049):kind==='utf8'?Buffer.from([0xff,10]):reply(frame,patch));
  }
  await assert.rejects(p,/Host observation denied/);f.bridge.close();
 }
});
test('a second simultaneous preflight invalidates the first',async()=>{
 const f=await fixture(),p=f.bridge.preflight({});const second=f.bridge.preflight({});await assert.rejects(second,/Host observation denied/);await assert.rejects(p,/Host observation denied/);f.bridge.close();
});
test('pure cloud projection requires exact targets, current revisions and actual network policy',async()=>{
 const {projectEnvironmentStatus}=await load();
 const status={source_config_id:'namespace~cecfg_test',source_config_version_id:'namespace~cecfgver_test',spec_revision:'21',observed_spec_revision:'21',observations_current:true,network_policy:{mode:'restricted',state:'enforced'},secrets:['ID','SECRET'].map(x=>({name:'AFW_OPERATIONS_ACCESS_CLIENT_'+x,state:'ready',target:{environment_variable:'AFW_OPERATIONS_ACCESS_CLIENT_'+x,allowed_domains:['operations-manager.agentfriendlyweb.dev']}}))};
 assert.deepEqual(projectEnvironmentStatus(status),{...cloud,configurationRevision:21,observationRevision:21});
 for(const patch of [{observations_current:false},{observed_spec_revision:'20'},{network_policy:{mode:'unrestricted',state:'enforced'}},{secrets:[]},{source_config_id:'bad'}])assert.throws(()=>projectEnvironmentStatus({...status,...patch}),/Host observation denied/);
 const wrong=structuredClone(status);wrong.secrets[0].target.allowed_domains=['other.example'];assert.throws(()=>projectEnvironmentStatus(wrong),/Host observation denied/);
 assert.throws(()=>projectEnvironmentStatus({...status,failure:{code:'failed'}}),/Host observation denied/);
 assert.throws(()=>projectEnvironmentStatus({...status,source_config_version_id:'other~cecfgver_test'}),/Host observation denied/);
});
test('real Git reads the loaded module repo, exact source/origin, tracked and untracked dirt',async()=>{
 const {readOccurrenceModuleGit}=await load(),dir=await mkdtemp(join(tmpdir(),'afw-host-git-'));
 const git=(...args)=>execFileSync('git',args,{cwd:dir,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 try{
  git('init');git('config','user.name','Synthetic QA');git('config','user.email','qa@example.invalid');
  await writeFile(join(dir,'runner.mjs'),'// synthetic module\n');git('add','runner.mjs');git('commit','-m','fixture');git('remote','add','origin',origin);
  const head=git('rev-parse','HEAD'),moduleUrl=pathToFileURL(join(dir,'runner.mjs'));
  assert.deepEqual(await readOccurrenceModuleGit({moduleUrl,sourceRevision:head}),{sourceRevision:head,origin,checkoutClean:true});
  await assert.rejects(readOccurrenceModuleGit({moduleUrl,sourceRevision:'f'.repeat(40)}),/Host observation denied/);
  git('remote','set-url','origin','https://example.invalid/repo.git');await assert.rejects(readOccurrenceModuleGit({moduleUrl,sourceRevision:head}),/Host observation denied/);git('remote','set-url','origin',origin);
  await writeFile(join(dir,'unknown'),'dirty');await assert.rejects(readOccurrenceModuleGit({moduleUrl,sourceRevision:head}),/Host observation denied/);await rm(join(dir,'unknown'));
  await writeFile(join(dir,'runner.mjs'),'// tracked dirty\n');await assert.rejects(readOccurrenceModuleGit({moduleUrl,sourceRevision:head}),/Host observation denied/);
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('fragmented correlation succeeds with retrieval-start time, not a host timestamp',async()=>{
 let t=Date.now();const f=await fixture({now:()=>t}),started=t,p=f.bridge.preflight({});const frame=f.frames[0];
 assert.deepEqual(Object.keys(frame),['version','type','id','nonce','startedAt']);assert.equal(frame.startedAt,started);
 t+=25;const line=Buffer.from(reply(frame));f.input.write(line.subarray(0,19));f.input.write(line.subarray(19));
 const observed=await p;assert.equal(observed.observedAt,started);assert.equal(observed.checkoutClean,true);assert.equal(observed.sourceRevision,f.pins.sourceRevision);f.bridge.close();
});
test('replay of an earlier response invalidates the next observation',async()=>{
 const f=await fixture(),p=f.bridge.preflight({}),old=f.frames[0];f.input.write(reply(old));await p;
 const next=f.bridge.preflight({});f.input.write(reply(old));await assert.rejects(next,/Host observation denied/);assert.equal(f.frames.length,2);f.bridge.close();
});
test('duplicate response in one chunk rejects the pending observation',async()=>{
 const f=await fixture(),p=f.bridge.preflight({}),line=reply(f.frames[0]);f.input.write(line+line);await assert.rejects(p,/Host observation denied/);f.bridge.close();
});
test('six successful observations exhaust the bridge without a seventh request',async()=>{
 const f=await fixture();
 for(let i=0;i<6;i++){const p=f.bridge.preflight({});f.input.write(reply(f.frames[i]));await p;}
 await assert.rejects(f.bridge.preflight({}),/Host observation denied/);assert.equal(f.frames.length,6);f.bridge.close();
});
test('time reversal, wrong pins, and over-limit configuration cannot authorize',async()=>{
 let t=Date.now();const f=await fixture({now:()=>t}),p=f.bridge.preflight({});t--;f.input.write(reply(f.frames[0]));await assert.rejects(p,/Host observation denied/);f.bridge.close();
 const api=await load();for(const timeoutMs of [0,10001])assert.throws(()=>api.createOccurrenceHostBridge({input:new PassThrough(),output:new PassThrough(),pins,timeoutMs}),/Host observation denied/);
 const g=await fixture(),q=g.bridge.preflight({});g.input.write(reply(g.frames[0],{cloud:{...cloud,publicationId:'cecfgver_wrong'}}));await assert.rejects(q,/Host observation denied/);g.bridge.close();
});
test('unterminated oversize input rejects immediately instead of waiting for timeout',async()=>{
 const f=await fixture(),p=f.bridge.preflight({});f.input.write(Buffer.alloc(2049,120));
 const result=await Promise.race([p.then(()=>false,()=>true),new Promise(r=>setTimeout(()=>r(false),100))]);assert.equal(result,true);f.bridge.close();
});
test('the trusted wrapper runs the canonical six-phase runner, without a seventh send',async()=>{
 const f=await fixture(),t=Date.now(),uuid='12345678-1234-4234-8234-123456789abc',runId='87654321-1234-4234-8234-123456789abc',planDigest='d'.repeat(64);
 const signal={version:'afw-assistance-event-v1',eventId:'a'.repeat(64),projectRef:'b'.repeat(64),revision:1,kind:'assistance_requested',topic:'orientation',observedAt:new Date(t).toISOString()};
 const manifest={...f.pins,occurrenceId:uuid,requestId:uuid,signal,startAt:t,deadline:t+120000,tokenExpiresAt:t+120000,serverDeadline:t+120000};
 f.bridge.close();let observations=0,calls=0;const phases=['create','list','admitClaim','claim','admitFinish','finish'];
 const input=new PassThrough(),output=new PassThrough();output.on('data',line=>{observations++;input.write(reply(JSON.parse(line.toString())));});
 const result=await f.runAssistanceHttpOccurrenceWithHostBridge({manifest,planDigest,env:{AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic'},fetchImpl:async()=>{
  const phase=phases[calls++],result=phase==='list'?[signal]:phase==='claim'?{eventId:signal.eventId,requestId:uuid,runId,expiresAt:t+90000}:phase==='finish'?'intervention_required':'accepted';
  return Response.json({version:'afw-occurrence-http-v1',occurrenceId:uuid,phase,sequence:calls,planDigest,result});
 }},{input,output});
 assert.equal(result.status,'completed');assert.equal(result.operational,3);assert.equal(result.controls,3);assert.equal(calls,6);assert.equal(observations,6);
});
test('metadata-only process CLI completes one framed stdin response, without HTTP credentials',async()=>{
 const f=await fixture();f.bridge.close();
 const child=spawn(process.execPath,[join(f.dir,'scripts/afw-occurrence-host-bridge.mjs'),...Object.values(f.pins)],{cwd:tmpdir(),stdio:['pipe','pipe','pipe']});
 let buffer='',frames=[],stderr='';child.stderr.on('data',c=>{stderr+=c;});
 child.stdout.on('data',c=>{buffer+=c;let i;while((i=buffer.indexOf('\n'))>=0){const frame=JSON.parse(buffer.slice(0,i));buffer=buffer.slice(i+1);frames.push(frame);if(frame.type==='observe')child.stdin.write(reply(frame));}});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});
 assert.equal(code,0);assert.equal(stderr,'');assert.equal(frames.length,2);assert.deepEqual(frames[1],{version:'afw-host-observe-v1',type:'probeResult',accepted:true});
});
test('CLI broken stdout during final probe result exits denied with empty stderr',async()=>{
 const f=await fixture();f.bridge.close();
 const child=spawn(process.execPath,[join(f.dir,'scripts/afw-occurrence-host-bridge.mjs'),...Object.values(f.pins)],{stdio:['pipe','pipe','pipe']});
 let stderr='';child.stderr.on('data',c=>{stderr+=c;});
 child.stdout.once('data',()=>{child.stdout.destroy();child.stdin.end();});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});
 assert.equal(code,1);assert.equal(stderr,'');
});
test('synchronous stdout failure has no orphan promise or uncaught process error',async()=>{
 const f=await fixture();f.bridge.close();
 const script=`import {PassThrough} from 'node:stream';import {createOccurrenceHostBridge} from ${JSON.stringify(pathToFileURL(join(f.dir,'lib/assistance-occurrence-host-bridge.mjs')).href)};
 const output=new PassThrough();output.write=()=>{throw Error('private-output-failure');};
 const bridge=createOccurrenceHostBridge({input:new PassThrough(),output,pins:${JSON.stringify(f.pins)}});
 try{await bridge.preflight({});process.exitCode=2;}catch{}finally{bridge.close();}
 await new Promise(r=>setImmediate(r));`;
 const child=spawn(process.execPath,['--input-type=module','--eval',script],{stdio:['ignore','pipe','pipe']});let stderr='';child.stderr.on('data',c=>{stderr+=c;});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});assert.equal(code,0);assert.equal(stderr,'');
});
test('output error and output close reject pending observation with a fixed error',async()=>{
 for(const error of [false,true]){
  const f=await fixture(),p=f.bridge.preflight({});f.output.destroy(error?Error('private-output-error'):undefined);
  await assert.rejects(p,/Host observation denied/);f.bridge.close();
 }
});
test('concurrent clean commit between Git reads cannot return the old pinned HEAD', {skip:process.platform==='win32'?'POSIX executable Git shim; equivalent production checks are platform independent':false},async()=>{
 const f=await fixture();f.bridge.close();
 const realGit=process.env.PATH.split(delimiter).map(p=>join(p,'git')).find(p=>existsSync(p));assert.ok(realGit);
 const shim=await mkdtemp(join(tmpdir(),'afw-host-git-race-'));temporary.push(shim);
 const script=`#!${process.execPath}\nimport {execFileSync} from 'node:child_process';import {existsSync,writeFileSync} from 'node:fs';
 const args=process.argv.slice(2);if(args[0]==='remote'&&!existsSync(${JSON.stringify(join(shim,'once'))})){writeFileSync(${JSON.stringify(join(shim,'once'))},'');execFileSync(${JSON.stringify(realGit)},['commit','--allow-empty','-m','concurrent synthetic change'],{stdio:'ignore'});}
 process.stdout.write(execFileSync(${JSON.stringify(realGit)},args));`;
 await writeFile(join(shim,'git'),script);await chmod(join(shim,'git'),0o755);
 const runner=`import {readOccurrenceModuleGit} from ${JSON.stringify(pathToFileURL(join(f.dir,'lib/assistance-occurrence-host-bridge.mjs')).href)};
 try{await readOccurrenceModuleGit({sourceRevision:${JSON.stringify(f.pins.sourceRevision)}});process.exitCode=2;}catch{}`;
 const child=spawn(process.execPath,['--input-type=module','--eval',runner],{env:{...process.env,PATH:shim+delimiter+process.env.PATH},stdio:['ignore','pipe','pipe']});let stderr='';child.stderr.on('data',c=>{stderr+=c;});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});assert.equal(code,0);assert.equal(stderr,'');
 const actual=execFileSync(realGit,['rev-parse','HEAD'],{cwd:f.dir,encoding:'utf8'}).trim();assert.notEqual(actual,f.pins.sourceRevision);assert.equal(execFileSync(realGit,['status','--porcelain'],{cwd:f.dir,encoding:'utf8'}).trim(),'');
});
