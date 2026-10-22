import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';import {join} from 'node:path';
import {build} from 'esbuild';import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const path=new URL('../lib/mcp-own-native-observer.mjs',import.meta.url);
const api=existsSync(path)?await import(path):null;
test('generated original wrapper preserves native private methods SQL data and default/named forwarding',{skip:!api,timeout:60000},async()=>{
 const original=`import {DurableObject,WorkerEntrypoint} from 'cloudflare:workers';
 export class AfwOwnEventNode extends DurableObject {#value=23;async seed(){await this.ctx.storage.put('keep',{version:7,answers:['retained']});return true;}async read(){return {privateValue:this.#value,row:await this.ctx.storage.get('keep')};}}
 export class AfwNodeControl extends WorkerEntrypoint {fetch(){return Response.json({control:'preserved'});}}
 export default {async fetch(request,env,ctx){const p=new URL(request.url).pathname;const node=env.AFW_DOSSIER_EVENTS_NODE.getByName(p==='/wrong'?'foreign-node':'afw-own-event-first-successor-v1');
 if(p==='/seed')return Response.json(await node.seed());if(p==='/read')return Response.json(await node.read());
 if(p==='/observe'||p==='/wrong')return Response.json(await node.observeNativeForControl());
 if(p==='/args')return Response.json(await node.observeNativeForControl({selector:'foreign'}));
 if(p==='/control')return ctx.exports.AfwNodeControl().fetch(request);
 return new Response('original-default-preserved',{status:404});}};`;
 const bundle=await build({stdin:{contents:api.createOriginalObservationWrapper(),resolveDir:process.cwd(),sourcefile:'observer-wrapper.mjs'},bundle:true,format:'esm',platform:'neutral',target:'es2022',write:false,external:['cloudflare:workers'],
  plugins:[{name:'ci-original-only',setup(b){b.onResolve({filter:/^\.\/frozen-original\.mjs$/},()=>({path:'original',namespace:'ci-original'}));b.onLoad({filter:/.*/,namespace:'ci-original'},()=>({contents:original,loader:'js'}));}}]});
 const root=await mkdtemp(join(tmpdir(),'afw-original-observe-')),start=Date.now()-1000,end=start+300000;
 const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
 const config=enabled=>({...convertV4MiniflareOptions({modules:true,script:bundle.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat','global_fetch_strictly_public'],
 durableObjects:{AFW_DOSSIER_EVENTS_NODE:{className:'AfwOwnEventNode',useSQLite:true}},
 bindings:{...Object.fromEntries(flags.map(k=>[k,'false'])),AFW_NATIVE_OBSERVATION_ENABLED:enabled,AFW_NATIVE_OBSERVATION_PLAN:'afw.original-native-observation.20261022.v1',AFW_NATIVE_OBSERVATION_START:String(start),AFW_NATIVE_OBSERVATION_END:String(end),AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1'}}),resourcePersistencePath:root});
 const mf=new Miniflare(config('false'));
 try{
 const call=async p=>{const r=await mf.dispatchFetch('http://fixture'+p);const body=await r.text();assert.equal(r.status,200,p+': '+body.slice(0,1000));return JSON.parse(body);};
 assert.equal(await (await mf.dispatchFetch('http://fixture/')).text(),'original-default-preserved');
 assert.deepEqual(await call('/control'),{control:'preserved'});await call('/seed');const before=await call('/read');
 assert.equal((await call('/observe')).stage,'observation_closed');await mf.setOptions(config('true'));
 const observation=await call('/observe');assert.equal(observation.stage,'native_context_observed');assert.equal(observation.present,false);
 assert.equal((await call('/wrong')).stage,'observation_closed');assert.equal((await call('/args')).stage,'observation_closed');
 assert.deepEqual(await call('/read'),before);assert.deepEqual(before,{privateValue:23,row:{version:7,answers:['retained']}});
 await mf.setOptions(config('false'));assert.equal((await call('/observe')).stage,'observation_closed');assert.deepEqual(await call('/read'),before);
 }finally{await mf.dispose();await rm(root,{recursive:true,force:true});}
});
