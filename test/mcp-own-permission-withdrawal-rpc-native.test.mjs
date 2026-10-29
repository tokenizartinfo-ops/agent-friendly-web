import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('actual private DO RPC stays disabled and rejects caller selectors',async()=>{
 const contents=`
 import {AfwOwnEventNode} from './worker/mcp-own/index.mjs';
 export {AfwOwnEventNode};
 export default{async fetch(request,env){try{
  const stub=env.QA.get(env.QA.idFromName('afw-own-event-one-occurrence-v1'));
  const args=new URL(request.url).pathname==='/selector'?[{grantId:'foreign'}]:[];
  return Response.json(await (new URL(request.url).pathname==='/plan'?stub.withdrawPermissionsForPlan({policyHash:'a'.repeat(64),expiresAt:Date.now()+1000}):stub.withdrawPermissions(...args)));
 }catch{return Response.json({code:'unavailable'},{status:404});}}};
 `;
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:workers']});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,durableObjects:{QA:{className:'AfwOwnEventNode',useSQLite:true}}}));
 try{for(const path of ['/','/selector','/plan']){const r=await mf.dispatchFetch('https://synthetic.invalid'+path);assert.equal(r.status,404);assert.deepEqual(await r.json(),{code:'unavailable'});}}finally{await mf.dispose();}
});
