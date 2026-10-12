import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native workerd SQLite transaction scope supports nested custody reads and original write ACK',async()=>{
 const contents=`import {createInvocationStorage} from './lib/mcp-invocation-storage.mjs';
 export class Own{constructor(ctx){this.ctx=ctx;}async fetch(){const scope=createInvocationStorage(this.ctx.storage);let rejected=false,late;await scope.storage.transaction(async tx=>{await tx.put('k',1);await scope.storage.transaction(async read=>{late=read;if(await read.get('k')!==1)throw Error('missing original');try{await read.put('k',2);}catch{rejected=true;}});try{await late.get('k');throw Error('late reference');}catch(e){if(e.message==='late reference')throw e;}});scope.assertOutside();return Response.json({rejected,value:await scope.storage.transaction(tx=>tx.get('k'))});}}
 export default{fetch(request,env){return env.QA.get(env.QA.idFromName('same')).fetch(request);}};`;
 const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*']});const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:b.outputFiles[0].text,durableObjects:{QA:{className:'Own',useSQLite:true}}}));
 try{const r=await runtime.dispatchFetch('https://synthetic.invalid/check');assert.equal(r.status,200);assert.deepEqual(await r.json(),{rejected:true,value:1});}finally{await runtime.dispose();}
});
