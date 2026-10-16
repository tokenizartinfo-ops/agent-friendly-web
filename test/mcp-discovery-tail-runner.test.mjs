import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn,spawnSync} from 'node:child_process';
import {mkdtempSync,readFileSync,writeFileSync,unlinkSync,rmdirSync,existsSync,mkdirSync,copyFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import * as runner from '../lib/mcp-discovery-tail-runner.mjs';

const revision='a'.repeat(40);
function fixture(t){
 const dir=mkdtempSync(join(tmpdir(),'afw-discovery-runner-')),file=join(dir,'safe.ndjson');
 t.after(()=>{if(existsSync(file))unlinkSync(file);rmdirSync(dir);});return file;
}
const child=code=>()=>spawn(process.execPath,['-e',code],{stdio:['ignore','pipe','pipe']});
function args(file,extra={}){const n=Date.now();return {sourceRevision:revision,startAt:n-100,expiresAt:n+10000,outputFile:file,...extra};}

test('saves sanitized evidence while discarding private tail fields and stderr',async t=>{
 assert.equal(typeof runner.runDiscoveryTailCapture,'function');
 const file=fixture(t),a=args(file),row={event:'afw.mcp_discovery_diagnostic',sourceRevision:revision,at:new Date().toISOString(),method:'events/list',stage:'catalog',count:1};
 const frame={scriptName:'agent-friendly-web-delegated-canary',event:{headers:{authorization:'PRIVATE_SECRET'}},exceptions:[{message:'PRIVATE_SECRET'}],logs:[{message:[JSON.stringify(row)]}]};
 const result=await runner.runDiscoveryTailCapture({...a,createChild:child(`process.stderr.write('PRIVATE_SECRET');process.stdout.write(${JSON.stringify(JSON.stringify(frame))});`)});
 assert.equal(result.reason,'eof');assert.equal(result.streamValid,true);assert.equal(result.recordCount,1);assert.equal(result.remoteClosureVerified,false);
 const saved=readFileSync(file,'utf8');assert.ok(!saved.includes('PRIVATE_SECRET'));assert.deepEqual(JSON.parse(saved.split('\n')[0]),{invocation:1,...row});
 assert.deepEqual(JSON.parse(saved.trim().split('\n').at(-1)),result);
});

test('absolute deadline stops a live child without claiming remote closure',async t=>{
 assert.equal(typeof runner.runDiscoveryTailCapture,'function');
 const file=fixture(t),n=Date.now(),before=n;
 const result=await runner.runDiscoveryTailCapture({sourceRevision:revision,startAt:n-500,expiresAt:n+900,outputFile:file,createChild:child('setInterval(()=>{},10000)')});
 assert.equal(result.reason,'deadline');assert.equal(result.remoteClosureVerified,false);assert.ok(Date.now()-before<7000);
});

test('expired or future windows do not create files or start a child',async t=>{
 assert.equal(typeof runner.runDiscoveryTailCapture,'function');
 const file=fixture(t),n=Date.now();let started=0;
 for(const times of [{startAt:n-2000,expiresAt:n-1000},{startAt:n+10000,expiresAt:n+20000}]){
  await assert.rejects(runner.runDiscoveryTailCapture({...args(file),...times,createChild:()=>{started++;}}),/^Error: AFW capture unavailable$/);
 }
 assert.equal(started,0);assert.equal(existsSync(file),false);
});

test('refuses to overwrite earlier evidence and never starts the child',async t=>{
 assert.equal(typeof runner.runDiscoveryTailCapture,'function');
 const file=fixture(t);writeFileSync(file,'earlier evidence');let started=false;
 await assert.rejects(runner.runDiscoveryTailCapture({...args(file),createChild:()=>{started=true;}}),/^Error: AFW capture unavailable$/);
 assert.equal(started,false);assert.equal(readFileSync(file,'utf8'),'earlier evidence');
});

test('malformed output persists a safe inconclusive result',async t=>{
 assert.equal(typeof runner.runDiscoveryTailCapture,'function');
 const file=fixture(t);
 const result=await runner.runDiscoveryTailCapture({...args(file),createChild:child("process.stdout.write('PRIVATE_SECRET invalid JSON');setInterval(()=>{},10000)")});
 assert.equal(result.reason,'invalid_stream');assert.equal(result.streamValid,false);assert.equal(result.recordCount,0);assert.ok(!readFileSync(file,'utf8').includes('PRIVATE_SECRET'));
});

test('nonzero child exit does not masquerade as a valid empty capture',async t=>{
 const file=fixture(t);
 const result=await runner.runDiscoveryTailCapture({...args(file),createChild:child("process.stderr.write('PRIVATE_SECRET');process.exitCode=7")});
 assert.equal(result.reason,'child_error');assert.equal(result.streamValid,false);assert.equal(result.recordCount,0);assert.ok(!readFileSync(file,'utf8').includes('PRIVATE_SECRET'));
});

test('cancellation stops the child and still requires remote cleanup',async t=>{
 const file=fixture(t),controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),300);t.after(()=>clearTimeout(timer));
 const result=await runner.runDiscoveryTailCapture({...args(file),signal:controller.signal,createChild:child('setInterval(()=>{},10000)')});
 assert.equal(result.reason,'cancelled');assert.equal(result.remoteClosureVerified,false);
});

test('stderr pipe failure is contained without an uncaught private error',async t=>{
 const file=fixture(t),n=Date.now();
 const result=await runner.runDiscoveryTailCapture({...args(file),expiresAt:n+900,createChild:()=>{
  const c=child('setInterval(()=>{},10000)')();setTimeout(()=>c.stderr.destroy(Error('PRIVATE_SECRET')),100);return c;
 }});
 assert.equal(result.reason,'invalid_stream');assert.equal(result.streamValid,false);assert.ok(!readFileSync(file,'utf8').includes('PRIVATE_SECRET'));
});

test('real CLI rejects expired arguments before opening a transport',()=>{
 const result=spawnSync(process.execPath,['scripts/capture-mcp-discovery-tail.mjs',revision,'0','1'],{encoding:'utf8',timeout:5000});
 assert.equal(result.status,2);assert.equal(result.stdout,'');assert.equal(result.stderr,'AFW capture unavailable\n');
});

test('CLI supervises the actual Wrangler entrypoint instead of a wrapper that spawns an untracked child',t=>{
 const dir=mkdtempSync(join(tmpdir(),'afw-discovery-cli-')),root=fileURLToPath(new URL('../',import.meta.url));
 assert.ok(resolve(dir).startsWith(resolve(tmpdir())+sep));
 t.after(()=>rmSync(dir,{recursive:true,force:true}));
 for(const part of ['scripts','lib','node_modules/wrangler/wrangler-dist'])mkdirSync(join(dir,part),{recursive:true});
 for(const part of ['scripts/capture-mcp-discovery-tail.mjs','lib/mcp-discovery-tail-runner.mjs','lib/mcp-discovery-capture.mjs'])copyFileSync(join(root,part),join(dir,part));
 const row={event:'afw.mcp_discovery_diagnostic',sourceRevision:revision,at:new Date().toISOString(),method:'events/list',stage:'catalog',count:1};
 const frame={scriptName:'agent-friendly-web-delegated-canary',logs:[{message:[JSON.stringify(row)]}]};
 writeFileSync(join(dir,'node_modules/wrangler/wrangler-dist/cli.js'),`process.stderr.write('PRIVATE_SECRET');process.stdout.write(${JSON.stringify(JSON.stringify(frame))});`);
 const n=Date.now(),r=spawnSync(process.execPath,[join(dir,'scripts/capture-mcp-discovery-tail.mjs'),revision,String(n-1000),String(n+10000)],{encoding:'utf8',timeout:15000});
 assert.equal(r.status,0,r.stderr);const result=JSON.parse(r.stdout);assert.equal(result.reason,'eof');assert.equal(result.recordCount,1);
 assert.ok(!readFileSync(result.outputFile,'utf8').includes('PRIVATE_SECRET'));assert.equal(result.remoteClosureVerified,false);
});
