import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native original worker scheduled mount is closed without schedule and HTTP remains unavailable',async()=>{
 const b=await build({entryPoints:['worker/mcp-own/index.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:b.outputFiles[0].text,bindings:{AFW_DELEGATED_OAUTH_ENABLED:'false',AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED:'false',AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:'https://private.invalid/mcp'}}));
 try{const worker=await mf.getWorker();await worker.scheduled({scheduledTime:Date.now(),cron:'* * * * *'});assert.equal((await mf.dispatchFetch('https://private.invalid/mcp')).status,404);}finally{await mf.dispose();}
});
