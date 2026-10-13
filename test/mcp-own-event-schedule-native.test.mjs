import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
test('native original worker scheduled mount is closed without schedule and HTTP remains unavailable',async()=>{
 const b=await build({entryPoints:['worker/mcp-own/index.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:b.outputFiles[0].text,bindings:{AFW_DELEGATED_OAUTH_ENABLED:'false',AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED:'false',AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:'https://private.invalid/mcp'}}));
 try{const worker=await mf.getWorker();await worker.scheduled({scheduledTime:Date.now(),cron:'* * * * *'});assert.equal((await mf.dispatchFetch('https://private.invalid/mcp')).status,404);}finally{await mf.dispose();}
});

test('native closed minute emits only the bounded public witness with no private bindings',()=>{
 const runner=fileURLToPath(new URL('./fixtures/mcp-own-closed-witness-runner.mjs',import.meta.url)),out=execFileSync(process.execPath,[runner],{encoding:'utf8',timeout:20000,stdio:['ignore','pipe','pipe']});
 const records=out.split(/\r?\n/).filter(l=>l.startsWith('{')).map(l=>JSON.parse(l)),r=records.find(x=>x.type==='afw.closed.scheduled'),done=records.find(x=>x.type==='fixture.finished');
 assert.ok(r,'actual Worker console witness observed');assert.ok(done);assert.equal(done.status,404);assert.deepEqual(Object.keys(r),['type','sourceRevision','cron','scheduledAt','observedAt']);assert.equal(r.sourceRevision,'a'.repeat(40));assert.equal(r.scheduledAt,done.scheduledAt);
});
