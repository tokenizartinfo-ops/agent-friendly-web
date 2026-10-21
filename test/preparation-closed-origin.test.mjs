import test from 'node:test';
import assert from 'node:assert/strict';
const checker=await import('../scripts/check-preparation-closed-origin.mjs').catch(()=>null);
const origin='https://preparation-canary.agentfriendlyweb.dev';
const human=new Set(['/authorize','/connections','/connections/revoke']);
const closed={code:'preparation_route_unavailable',executionAllowed:false,chargeAllowed:false,publicationAllowed:false};
const json=(value=closed,headers={})=>Response.json(value,{status:404,headers:{'Cache-Control':'no-store',...headers}});
const inspect=options=>{assert.equal(typeof checker?.inspectPreparationClosedOrigin,'function','Missing closed-origin checker');return checker.inspectPreparationClosedOrigin(options);};
function fixture(change=()=>null){
 const calls=[];return{calls,fetcher:async(url,options)=>{calls.push({url,options});const path=new URL(url).pathname;return change(path,options)??(human.has(path)?new Response('Denied',{status:403}):json());}};
}
test('checks only the fixed closed host without credentials, redirects, cookies or writes',async()=>{
 const f=fixture(),r=await inspect({fetcher:f.fetcher});
 assert.equal(r.contract,'afw.preparation.closed-origin.v1');assert.equal(r.origin,origin);
 assert.equal(r.closedSurfaceObserved,true);assert.equal(r.authenticatedIdentityAccepted,false);assert.equal(r.consentAccepted,false);assert.equal(r.operationalReadiness,false);
 assert.equal(f.calls.length,6);assert.equal(r.checks.length,6);
 for(const {url,options}of f.calls){assert.equal(new URL(url).origin,origin);assert.equal(options.method,'GET');assert.equal(options.redirect,'manual');assert.equal(options.credentials,'omit');assert.equal(options.cache,'no-store');assert.equal(options.body,undefined);assert.ok(options.signal instanceof AbortSignal);assert.deepEqual(Object.keys(options.headers),['Accept']);}
});
test('reports a team login redirect only as login, never as accepted identity',async()=>{
 const f=fixture(path=>human.has(path)?new Response(null,{status:302,headers:{Location:'https://tokenizart.cloudflareaccess.com/cdn-cgi/access/login/preparation-canary.agentfriendlyweb.dev?meta=private-value'}}):null);
 const r=await inspect({fetcher:f.fetcher});assert.equal(r.authenticatedIdentityAccepted,false);assert.ok(r.checks.some(x=>x.observation==='access_login_redirect_observed'));assert.ok(!JSON.stringify(r).includes('private-value'));
});
test('an off-host redirect is rejected without following it',async()=>{
 const f=fixture(path=>path==='/mcp'?new Response(null,{status:302,headers:{Location:'https://other.example/private'}}):null);
 await assert.rejects(inspect({fetcher:f.fetcher}),{message:'Closed preparation origin unavailable'});assert.equal(f.calls.length,2);
});
test('a foreign human login destination is not accepted as Access',async()=>{
 const f=fixture(path=>human.has(path)?new Response(null,{status:302,headers:{Location:'https://other.cloudflareaccess.com/cdn-cgi/access/login/preparation-canary.agentfriendlyweb.dev'}}):null);
 await assert.rejects(inspect({fetcher:f.fetcher}),{message:'Closed preparation origin unavailable'});
});
test('a successful human response cannot count as a closed rejection',async()=>{
 const f=fixture(path=>path==='/authorize'?new Response('Owner private content',{status:200}):null);
 await assert.rejects(inspect({fetcher:f.fetcher}),{message:'Closed preparation origin unavailable'});
});
test('agent JSON must retain the exact closed status, authority and safe shape',async()=>{
 for(const response of [()=>Response.json(closed),()=>json({...closed,publicationAllowed:true}),()=>json({...closed,owner:'private'}),()=>new Response('<h1>404</h1>',{status:404}),()=>json(closed,{'Cache-Control':'public,max-age=60'})]){
  const f=fixture(path=>path==='/mcp'?response():null);await assert.rejects(inspect({fetcher:f.fetcher}),{message:'Closed preparation origin unavailable'});
 }
});
test('oversized and invalid JSON bodies fail without exposing their content',async()=>{
 for(const response of [()=>new Response('x'.repeat(3000),{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}}),()=>new Response('{private',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}})]){
  const f=fixture(path=>path==='/mcp'?response():null);await assert.rejects(inspect({fetcher:f.fetcher}),{message:'Closed preparation origin unavailable'});
 }
});
test('provider errors are reduced to a static error',async()=>{
 await assert.rejects(inspect({fetcher:async()=>{throw Error('private credential and response');}}),{message:'Closed preparation origin unavailable'});
});
test('one original timeout stops a stalled fetch even if the client ignores abort',async()=>{
 let calls=0,signal;await assert.rejects(inspect({fetcher:(_url,opts)=>{calls++;signal=opts.signal;return new Promise(()=>{});},timeoutMs:100}),{message:'Closed preparation origin unavailable'});assert.equal(calls,1);assert.equal(signal.aborted,true);
});
test('the same original timeout also bounds a stalled response body',async()=>{
 const f=fixture(path=>path==='/mcp'?new Response(new ReadableStream({start(){}}),{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}}):null);
 await assert.rejects(inspect({fetcher:f.fetcher,timeoutMs:100}),{message:'Closed preparation origin unavailable'});assert.equal(f.calls.length,2);
});
test('callers cannot substitute another origin or unbounded timeout',async()=>{
 const f=fixture();for(const extra of [{origin:'https://other.example'},{timeoutMs:0},{timeoutMs:21000}])await assert.rejects(inspect({fetcher:f.fetcher,...extra}),{message:'Closed preparation origin unavailable'});assert.equal(f.calls.length,0);
});
