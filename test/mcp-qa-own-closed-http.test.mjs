import test from 'node:test';
import assert from 'node:assert/strict';
const api=await import('../lib/mcp-qa-own-closed-api.mjs').catch(()=>({}));
const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',QA='agent-friendly-web-independent-closure-qa',PATH=ROOT+'/workers/scripts/'+QA+'/subdomain',TOKEN='PRIVATE-synthetic-cf-token-readonly';
function fixture(){const f={at:Date.now(),calls:[],change:()=>{}};f.fetch=async(url,init)=>{f.calls.push({url,init});const r={status:200,headers:{date:new Date(f.at).toUTCString(),'content-type':'application/json'},body:{success:true,errors:[],messages:[],result:{enabled:false,previews_enabled:false}}};f.change(r);return new Response(typeof r.body==='string'?r.body:JSON.stringify(r.body),{status:r.status,headers:r.headers});};f.make=()=>{assert.equal(typeof api.createOwnClosedReadbackApi,'function');return api.createOwnClosedReadbackApi({credential:TOKEN,fetchImpl:f.fetch,now:()=>f.at});};return f;}
test('fixed GET has no-store/no-follow/abort and bounded plain envelope only',async()=>{const f=fixture(),c=f.make();try{const r=await c.request({method:'GET',path:PATH});assert.equal(r.success,true);assert.equal(f.calls.length,1);assert.equal(f.calls[0].init.method,'GET');assert.equal(f.calls[0].init.redirect,'error');assert.equal(f.calls[0].init.cache,'no-store');assert.ok(f.calls[0].init.signal instanceof AbortSignal);assert.equal(f.calls[0].init.headers.Authorization,'Bearer '+TOKEN);}finally{c.close();}});
for(const [name,options]of Object.entries({
 POST:{method:'POST',path:PATH},foreign:{method:'GET',path:'https://example.com'},other:{method:'GET',path:ROOT+'/workers/scripts/other-project/subdomain'},
 candidate:{method:'GET',path:ROOT+'/workers/workers/'+QA+'/versions/0771c5f5-88b1-428a-b700-d51aa726b35f',query:{include:'modules'}},
 query:{method:'GET',path:PATH,query:{include:'secrets'}},body:{method:'GET',path:PATH,body:'PRIVATE'},
 traversal:{method:'GET',path:ROOT+'/workers/scripts/'+QA+'/../other/subdomain'}
}))test('transport rejects '+name+' before fetch',async()=>{const f=fixture(),c=f.make();try{await assert.rejects(c.request(options));assert.equal(f.calls.length,0);}finally{c.close();}});
for(const [name,change]of Object.entries({
 redirect:r=>{r.status=302;r.headers.location='https://example.com';},http403:r=>{r.status=403;r.body={PRIVATE:TOKEN};},date:r=>{r.headers.date=new Date(0).toUTCString();},
 cache:r=>{r.headers.age='1';},stale:r=>{r.headers['cf-cache-status']='STALE';},media:r=>{r.headers['content-type']='text/html';},
 size:r=>{r.headers['content-length']='1048577';},stream:r=>{r.body='x'.repeat(1048577);},json:r=>{r.body='PRIVATE invalidJSON';},
 envelope:r=>{r.body.errors=[{PRIVATE:TOKEN}];},false_success:r=>{r.body.success=false;}
}))test('transport fails sanitized without retries: '+name,async()=>{const f=fixture();f.change=change;const c=f.make();try{await assert.rejects(c.request({method:'GET',path:PATH}),e=>!String(e).includes('PRIVATE'));assert.equal(f.calls.length,1);}finally{c.close();}});
test('only exact namespace GET accepts legacy null envelope diagnostics',async()=>{for(const legacy of [true,false]){const f=fixture();f.change=r=>{r.body.errors=null;r.body.messages=null;};const c=f.make();try{const call=c.request({method:'GET',path:legacy?ROOT+'/workers/durable_objects/namespaces':PATH,...legacy?{query:{page:1,per_page:1000}}:{}});if(legacy)assert.equal((await call).success,true);else await assert.rejects(call);}finally{c.close();}}});
test('one original global deadline and rollback clock fence remain after await',async()=>{for(const delta of [-1,120001]){const f=fixture();f.change=()=>{f.at+=delta;};const c=f.make();try{await assert.rejects(c.request({method:'GET',path:PATH}));assert.equal(f.calls.length,1);}finally{c.close();}}});
test('explicit close aborts an unresolved fetch and never retries',async()=>{const f=fixture();f.fetch=async()=>{f.calls.push({});return new Promise(()=>{});};const c=f.make();const p=c.request({method:'GET',path:PATH});c.close();await assert.rejects(p);assert.equal(f.calls.length,1);});
