import assert from 'node:assert/strict';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {createDropDiagnostic} from './test/fixtures/finite-first-connection-publication.mjs';

// Small separate workers, real service -> DO transport and host dispatch.
// The only input is the hardcoded scenario path of this private local lab.
export async function nativeControls(fixture){
 const factory=createDropDiagnostic.toString();
 const setup="import {createHash} from 'node:crypto';const make="+factory+";const diag=make(v=>createHash('sha256').update(v).digest('hex'));";
 const id=JSON.stringify(fixture.defaults.uuid);
 const calibrate="function dropFrame(){const prefix='é💧';return Error('calibration');}\nfunction dropCaller(){return dropFrame();}\n";
 const qa=setup+calibrate+"import {DurableObject} from 'cloudflare:workers';export class Probe extends DurableObject{async fetch(r){const mode=new URL(r.url).pathname.slice(1);if(mode==='calibrate'){const f=String(dropCaller().stack).split('\\n').filter(v=>/^\\s+at\\s/.test(v));const markers=f.slice(0,2).map(v=>{const x=/([^ ()]+):([0-9]+):([0-9]+)\\)?$/.exec(v);return x?[x[1],+x[2],+x[3]]:null;});return Response.json(markers);}const e=diag.arm('qa.js');diag.enter(e,r,"+id+",'fixture-handle-A');const q=new Response('inner',{status:403,headers:{'x-original':'q'}});diag.register(r,q,[]);if(mode==='qa-substitute')return new Response('inner',{status:403,headers:{'x-original':'q'}});if(mode==='late-qa'){const early=new Response(q.body,{status:q.status,headers:q.headers});diag.qaEnd(e,r,q);return early;}if(mode==='qa-collision')q.headers.set('x-afw-lab-qa-denial','collision');if(mode==='qa-stale'||mode==='qa-restored-late'){diag.revoke(e);if(mode==='qa-restored-late')diag.arm('qa.js');}if(mode==='qa-copied-all'){diag.qaEnd(e,r,q);return new Response(q.body,{status:q.status,headers:q.headers});}if(mode==='qa-cross')diag.qaEnd(e,new Request(r.url),q);else{const actual=Promise.resolve(q);actual.then(v=>diag.qaEnd(e,r,v),()=>{}).catch(()=>{});return actual;}return q;}}export default{fetch(){return new Response(null,{status:404});}};";
 const outer=setup+"export default{fetch(p,env){const mode=new URL(p.url).pathname.slice(1),c=diag.cell(p),l={},d=new Error('stub denied');diag.bind(p,l);diag.assign(p,"+id+");if(mode==='calibrate')return env.Q.get(env.Q.idFromName('only')).fetch(new Request(p.url));const operation=(async()=>{try{const r=await env.Q.get(env.Q.idFromName('only')).fetch(new Request(p.url,{method:'POST'}));if(r.ok||await r.clone().text()!=='inner'||r.headers.get('x-original')!=='q')throw Error('inner transport');diag.denied(p,mode==='wrong-lease'?{}:l,r,d);throw d;}catch(error){if(error!==d)throw error;const b=new Response('outer',{status:503,headers:{'x-original':'m'}});diag.caught(p,l,error,b);if(mode==='outer-copied-all'){const original=Promise.resolve(b);diag.tap(c,p,original);return original.then(x=>new Response(x.body,{status:x.status,headers:x.headers}));}if(mode==='outer-copy'){const early=new Response(b.body,{status:b.status,headers:b.headers});return early;}if(mode==='outer-collision')b.headers.set('x-afw-lab-m-denial','collision');return b;}finally{if(mode==='finish-throw')throw Error('fixed-finish');}})();if(mode==='late-m'){const early=operation.then(b=>new Response(b.body,{status:b.status,headers:b.headers}));diag.tap(c,p,operation);return early;}if(mode==='m-cross')diag.tap(diag.cell(new Request(p.url)),p,operation);else diag.tap(c,p,operation);return operation;}};";
 const opts={compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],modules:true};
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[{...opts,name:'m',script:outer,durableObjects:{Q:{className:'Probe',scriptName:'qa',useSQLite:true,uniqueKey:'drop-wire-only'}}},{...opts,name:'qa',script:qa,durableObjects:{Q:{className:'Probe',useSQLite:true,uniqueKey:'drop-wire-only'}}}]}));
 const scenarios=['positive','qa-substitute','late-qa','qa-collision','qa-stale','qa-cross','outer-copy','outer-collision','late-m','m-cross','qa-restored-late','wrong-lease','outer-copied-all','qa-copied-all','finish-throw'];
 const expected=fixture.rows[0].expected.mMarker, stub=expected.replace('.V.403','.S.0');
 try{
   const calibration=await (await mf.dispatchFetch('https://wire.fixture.invalid/calibrate')).json();
   assert.equal(calibration.length,2);assert.ok(calibration[0]&&calibration[1]&&calibration[0][0]===calibration[1][0]);
   for(const [i,token] of ['Error(','dropFrame('].entries()){
     const [,line,col]=calibration[i];assert.ok(qa.split('\n')[line-1]?.slice(col-1).startsWith(token),'native frame base/UTF16 calibration');
   }
   for(const mode of scenarios){
     let r;try{r=await mf.dispatchFetch('https://wire.fixture.invalid/'+mode,{method:'POST'});}catch(error){if(mode==='finish-throw' && error?.message?.includes('fixed-finish'))continue;throw error;}
     if(mode==='finish-throw'){assert.equal(r.status,500);assert.equal(r.headers.get('x-afw-lab-m-denial'),null);continue;}
     assert.equal(r.status,503);assert.equal(await r.text(),'outer');assert.equal(r.headers.get('x-original'),'m');
     const got=r.headers.get('x-afw-lab-m-denial');
     if(['positive','qa-copied-all','outer-copied-all'].includes(mode))assert.equal(got,expected);
     else if(mode==='wrong-lease')assert.equal(got,expected.replace('.V.403','.U.0'));
     else if(['late-qa','qa-collision','qa-stale','qa-cross','qa-substitute','qa-restored-late'].includes(mode))assert.equal(got,stub);
     else if(mode==='outer-collision')assert.equal(got,'collision');
     else assert.equal(got,null);
   }
   return scenarios.length+1;
 }finally{await mf.dispose();}
}
