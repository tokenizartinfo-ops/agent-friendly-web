import {createHash} from 'node:crypto';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import test from 'node:test';
import assert from 'node:assert/strict';
import {gunzipSync} from 'node:zlib';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {plain,approveFirstConnection,readFirstConnectionProbe,setFirstConnectionFault} from './fixtures/finite-first-connection-publication.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev';
async function fixture(t){
 const f=await initialEntryHarness('first-connection-publication');
 t.after(async()=>{console.info('T2 native stage','teardown-start');try{if(!f.mountFailed){await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}console.info('T2 native stage','teardown-restored');}finally{await f.mf.dispose();console.info('T2 native stage','teardown-disposed');await f.cleanup();console.info('T2 native stage','teardown-done');}});
 await f.stub.configure('normal');
 console.info('T2 native stage','upstream-start');const initial=await plain(f.stub.invoke(f.refs));console.info('T2 native stage','upstream-done:'+initial.status);if(initial.status!=='material_recorded'){const seen=await plain(f.stub.snapshot());console.info('T2 upstream DATA inspection',JSON.stringify({requests:f.providerRegistry.requests.map(({url,method})=>({method,path:new URL(url).pathname})),responses:f.providerRegistry.responses,rows:seen.map(([key])=>key),stats:await plain(f.stub.stats()),M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes}}));}assert.equal(initial.status,'material_recorded',JSON.stringify(initial));await f.stub.restoreMethods();await f.mountFirstConnection();
 const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([key])=>key.endsWith(':capsule'))[1]);
 assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.phaseCurrent,undefined);
 assert.equal(capsule.moduleHash,f.firstConnectionBuild.residency.module.sha256);
 assert.equal(f.uploaded.modules[0].content_base64,gunzipSync(Buffer.from(f.resident.content,'base64')).toString('base64'));
 return f;
}
test('T2 finite dispatch never falls through ordinary',{timeout:120000},async t=>{
 const f=await fixture(t),spy=f.negative;
 const cases=[
  [O+'/connections/finite-prepare?x=1',{}],[O+'/connections/finite-prepare#bad',{}],
  ['https://other.invalid/connections/finite-prepare',{}],[O+'/connections/finite-prepare',{method:'DELETE'}],
  [O+'/connections',{}],[O+'/connections/revoke',{method:'POST'}],[O+'/monitoring/revoke',{method:'POST'}],
  [O+'/authorize?bad=1',{method:'DELETE'}],[O+'/monitoring?x=1',{}],[O+'/monitoring/grant',{method:'GET'}]
 ];
 for(const [url,options]of cases){const r=await spy.fetch(url,options);assert.notEqual(r.status,200,url);await r.body?.cancel();}
 for(const fault of ['qa-absent','version','actor','version-drift']){
  await setFirstConnectionFault(f,fault);const r=await spy.fetch(O+'/connections/finite-prepare');assert.notEqual(r.status,200,fault);await r.body?.cancel();
 }
 await setFirstConnectionFault(f,'oauth-open');
 for(const path of ['/authorize?bad=1','/monitoring','/monitoring/grant']){const r=await spy.fetch(O+path,path.endsWith('grant')?{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'},body:'handle='+'a'.repeat(43)}:{});assert.notEqual(r.status,200,path);await r.body?.cancel();}
 const probe=await readFirstConnectionProbe(f);assert.equal(probe.negative.ordinary,0,'finite paths never enter ordinary handler before SQL');assert.equal(probe.negative.sql,0,'zero ordinary SQL');assert.equal(probe.effects,0);assert.equal(probe.uploads,1);assert.equal(probe.activations,1);
 assert(probe.native.calls.some(c=>c.url==='https://afw-private.invalid/_finite-owner/monitoring'),'OAuth=true reaches QA without ordinary monitoring flag');
 const target='https://afw-private.invalid/_finite-owner/';
 for(const url of [target+'unknown',target+'choice?x=1',target+'monitoring/revoke']){const r=await f.stub.fetch(url,{method:'POST'});assert.notEqual(r.status,200);await r.body?.cancel();}
 console.info('T2 negative bundle',JSON.stringify({spyHash:f.firstConnectionBuild.spyHash,probe:{...probe,rows:undefined,providerRequests:undefined,native:{...probe.native,business:undefined}}}));
});
test('T2 closed mounted conduits cannot authorize business',{timeout:120000},async t=>{
 const f=await fixture(t);
 const response=await f.call('/connections/finite-prepare');assert.notEqual(response.status,200,'unsigned choice cannot approve');await response.body?.cancel();
 const before=await readFirstConnectionProbe(f);assert.equal(before.native.calls.filter(c=>c.url.endsWith('/choice')).length,1,'actual closed M dispatches to actual QA receiver');
 for(const path of ['/authorize','/monitoring','/monitoring/grant']){const r=await f.call(path,path.endsWith('/grant')?{method:'POST'}:{});assert.notEqual(r.status,200);await r.body?.cancel();}
 const p=await readFirstConnectionProbe(f);assert.equal(p.native.calls.length,before.native.calls.length,'closed OAuth/notice denied before QA');assert.equal(p.effects,0);assert.deepEqual(p.native.business,[]);assert.equal(p.uploads,1);assert.equal(p.activations,1);
 const rows=p.rows,capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);assert.equal(p.native.alarm,capsule.C0);assert.equal(capsule.C0,capsule.I0+900000);assert.equal(capsule.C1,capsule.C0+180000);
 const plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);assert.equal(plan.configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text,'false');
 assert.equal(f.phaseCurrent,undefined);assert.equal(f.firstConnectionBuild.M.sha256,f.resident.module.sha256);
 assert(f.firstConnectionBuild.M.inputs.includes('worker/mcp-own/finite.mjs'));assert(!f.firstConnectionBuild.M.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
 assert(f.firstConnectionBuild.QA.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
 console.info('T2 initial native build',JSON.stringify({...f.firstConnectionBuild,residency:{...f.resident,content:undefined},M:{...f.firstConnectionBuild.M,inputs:f.firstConnectionBuild.M.inputs.length},QA:{...f.firstConnectionBuild.QA,inputs:f.firstConnectionBuild.QA.inputs.length},requests:p.providerRequests.length}));
});

test('T3 same initial bytes produce connection and downstream',{timeout:120000},async t=>{
 const f=await fixture(t),before=await readFirstConnectionProbe(f);await f.stub.firstConnectionConfigure('normal');
 const response=await approveFirstConnection(f);
 if(response.status!==200)console.info('T3 failed continuation observation',JSON.stringify(await plain(f.stub.firstConnectionProbe())));
 assert.equal(response.status,200,'original signed choice must complete native ConnectionReceipt before success');
 await response.body?.cancel();
 const p=await readFirstConnectionProbe(f);
 assert.equal(p.uploads,before.uploads+1,'new native upload');
 assert.equal(p.activations,before.activations+1,'new native activation');
 const receiptRows=p.rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt'));
 assert.equal(receiptRows.length,1,'durable own connection receipt');
 assert.equal(JSON.parse(receiptRows[0][1]).moduleHash,f.firstConnectionBuild.M.sha256);
 assert.equal(f.phaseCurrent,undefined,'no seeded publication authority');
 const receipt=JSON.parse(receiptRows[0][1]),originalRows=before.rows.filter(([k])=>!k.startsWith('owner-ticket:')&&!k.startsWith('owner-project-ref:')&&!k.startsWith('connection-preparation:'));
 for(const row of originalRows)assert.deepEqual(p.rows.find(([k])=>k===row[0]),row);
 const closedVersion=f.providerRegistry.versions[receipt.baselineVersionId],connectionVersion=f.providerRegistry.versions[receipt.versionId];
 assert.equal(connectionVersion.modules[0].content_base64,closedVersion.modules[0].content_base64);
 const configOnly=structuredClone(closedVersion);configOnly.id=receipt.versionId;configOnly.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(connectionVersion,configOnly);
 // Adoption follows actual POST completion/body settlement and uses only the
 // provider registry's real upload/pointer. QA script and physical references stay.
 await f.adoptConnectionConfiguration();
 const current=await plain(f.stub.firstConnectionContext());assert.equal(current.source?.phase,'read_consent',JSON.stringify(current));f.source=current.source;
 const kv=await f.mf.getKVNamespace('OAUTH_KV','canary-first-connection');
 await kv.put('client:'+f.source.clientId,JSON.stringify({clientId:f.source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN native client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));
 const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
 const authorization=await f.call('/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:challenge,code_challenge_method:'S256'}),{redirect:'manual',headers});
 assert.equal(authorization.status,200);const authHtml=await authorization.text(),handle=/name="handle" value="([^"]+)"/.exec(authHtml)?.[1],sdkCookie=authorization.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&sdkCookie);
 const issued=await f.call('/authorize',{method:'POST',redirect:'manual',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+sdkCookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
 assert.equal(issued.status,302);const code=new URL(issued.headers.get('Location')).searchParams.get('code');assert(code);await issued.body?.cancel();
 const beforeExchange=await plain(f.stub.snapshot()),grantAck=beforeExchange.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':grant:ack'));
 assert(grantAck);
 const tokenResponse=await f.call('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code,code_verifier:verifier})});
 assert.equal(tokenResponse.status,200);const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');
 const client=new Client({name:'SYN-native-T3',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
 try{await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(O).host}},fetch:async(url,options)=>(await f.mf.getWorker('canary-first-connection')).fetch(String(url),options)}));const tools=await client.listTools();assert.deepEqual(tools.tools.map(t=>t.name).sort(),['read_project_summary','read_saved_evidence']);const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.source.project.projectId);}finally{await client.close();}
 const actualCurrent=await plain(f.stub.firstConnectionContext());assert.equal(actualCurrent.source?.phase,'read_consent');const afterExchange=await plain(f.stub.snapshot());assert.deepEqual(afterExchange.find(([k])=>k===grantAck[0]),grantAck,'immutable original grant ACK');
 const grant=(await f.db.prepare("SELECT exchanged_at FROM delegated_access_grants WHERE id=?").bind(JSON.parse(beforeExchange.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]).identity.grantId).first());assert.notEqual(grant.exchanged_at,'','real native exchange timestamp');
 const noticeGet=await f.call('/monitoring',{headers});assert.equal(noticeGet.status,200);const noticeHtml=await noticeGet.text(),noticeHandle=/name="handle" value="([^"]+)"/.exec(noticeHtml)?.[1],noticeCookie=noticeGet.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(noticeHandle&&noticeCookie);
 const noticePost=await f.call('/monitoring/grant',{method:'POST',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+noticeCookie},body:new URLSearchParams({handle:noticeHandle})});assert.equal(noticePost.status,200);await noticePost.body?.cancel();
 const final=await readFirstConnectionProbe(f),link=final.rows.find(([k])=>k==='connection-preparation:'+current.preconnectionId+':notice');assert(link,'actual native NoticeLink follows actual GET/POST');
 const unsupported=await f.call('/connections/finite-prepare',{headers});assert.notEqual(unsupported.status,200);await unsupported.body?.cancel();assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);
 assert.equal(final.negative.ordinary,0);assert.equal(final.negative.sql,0);
 const telemetry=await plain(f.stub.firstConnectionState()),sends=effectRows(final).filter(([k])=>k.endsWith(':send')).map(([,v])=>JSON.parse(v));console.info('T3 original clock and IO',JSON.stringify({counts:telemetry.counts,providerRequests:final.providerRequests.length,sends:sends.map(s=>({effect:s.effect,windowMs:s.deadline-s.issuedAt})),receiptInsideActivation:receipt.completedAt<sends.find(s=>s.effect==='activation').deadline}));
 console.info('T3 native closure SYN',JSON.stringify({sourceRevision:f.source.sourceRevision,testRevision:process.env.GITHUB_SHA,receiptHash:receipt.receiptHash,grantTimestampNative:true,noticeLink:true,seededConnection:false,completePackage:false,operationalReadiness:false}));

});

const effectRows=p=>p.rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:'));
const ticketUses=p=>p.rows.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use'));
const receipts=p=>effectRows(p).filter(([k])=>k.endsWith(':receipt'));
async function waitFirstState(f,predicate,label){
 const end=performance.now()+30000;
 while(performance.now()<end){const state=await plain(f.stub.firstConnectionState());if(predicate(state))return state;await new Promise(r=>setTimeout(r,10));}
 assert.fail('actual native boundary absent: '+label);
}
async function firstSettled(f){
 const end=performance.now()+5000;
 while(performance.now()<end){const probe=await plain(f.stub.firstConnectionAvailability());if(probe.available){assert.equal(probe.live,true);return;}await new Promise(r=>setTimeout(r,10));}
 assert.fail('actual retained work did not settle');
}
async function failureCase(t,mode){
 const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);
 const response=await approveFirstConnection(f);assert.notEqual(response.status,200,mode);await response.body?.cancel();
 const probe=await readFirstConnectionProbe(f);assert.equal(receipts(probe).length,0,mode);return {f,probe,state:await plain(f.stub.firstConnectionState())};
}
for(const mode of ['enrollment-transaction-lost','enrollment-sync-lost'])test('T3 enrollment unknown cannot upload: '+mode,{timeout:120000},async t=>{
 const {f,probe,state}=await failureCase(t,mode);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert(state.trace.some(v=>v.key==='afw.finite-preparation-cleanup.v1:enrollment'&&v.kind==='put-settled'));assert(probe.rows.some(([k])=>k==='afw.finite-preparation-cleanup.v1:enrollment'));assert.equal(effectRows(probe).length,0);assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
});
for(const mode of ['upload-send-transaction-lost','upload-lost','upload-malformed','upload-cached','upload-oversize'])test('T3 upload uncertainty cannot activate: '+mode,{timeout:120000},async t=>{
 const {f,probe,state}=await failureCase(t,mode);assert.equal(f.activations.length,1);assert(state.trace.some(v=>v.key?.endsWith(':send')&&v.kind==='put-settled'));assert(!effectRows(probe).some(([k,v])=>k.endsWith(':send')&&JSON.parse(v).effect==='activation'));assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');assert.equal(f.uploads.length,mode==='upload-send-transaction-lost'?1:2);
});
for(const mode of ['activation-lost','activation-malformed','activation-cached'])test('T3 activation uncertainty cannot finish: '+mode,{timeout:120000},async t=>{
 const {f,probe,state}=await failureCase(t,mode);assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);assert(state.trace.some(v=>v.effect==='activation'&&v.kind==='native-result-enter'));assert(!effectRows(probe).some(([k,v])=>k.endsWith(':ack')&&JSON.parse(v).resourceId==='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'));assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
});
for(const mode of ['receipt-transaction-lost','receipt-sync-lost','receipt-readback-lost','final-pair-owner-drift'])test('T3 final readback cannot turn uncertainty into success: '+mode,{timeout:120000},async t=>{
 const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);const response=await approveFirstConnection(f);assert.notEqual(response.status,200);await response.body?.cancel();const probe=await readFirstConnectionProbe(f);assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);assert.equal(receipts(probe).length,1,'durable own receipt preserved despite failed response');const state=await plain(f.stub.firstConnectionState());assert(state.trace.some(v=>v.key?.endsWith(':receipt')&&v.kind==='put-settled'));
});
for(const mode of ['upload-held','upload-read-held','upload-cancel-held','enrollment-transaction-held','enrollment-sync-held'])test('T3 retained work blocks a different live root: '+mode,{timeout:120000},async t=>{
 const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);const pending=approveFirstConnection(f);
 const which=mode==='upload-held'?'fetch':mode==='upload-read-held'?'read':mode==='upload-cancel-held'?'cancel':'work';
 await waitFirstState(f,s=>s[which+'Held'],'held '+which);
 const response=await pending;assert.notEqual(response.status,200);await response.body?.cancel();
 const other=await plain(f.stub.firstConnectionAvailability());assert.equal(other.live,true,'different root is genuinely still live');assert.equal(other.available,false,'actual retained native work owns scope');
 assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
 await f.stub.firstConnectionRelease(which);
 if(which==='read'){await waitFirstState(f,s=>s.cancelHeld,'late read reached real cancel');assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false);await f.stub.firstConnectionRelease('cancel');}
 await firstSettled(f);const state=await plain(f.stub.firstConnectionState());assert.equal(state[which+'Settled'],true,'actual native settlement observed');if(which==='read')assert.equal(state.cancelSettled,true);
 const probe=await readFirstConnectionProbe(f);assert.equal(f.activations.length,1);assert.equal(receipts(probe).length,0);assert.equal(effectRows(probe).filter(([k])=>k.endsWith(':ack')).length,0);
});
for(const effect of ['upload','activation'])for(const variant of ['ack','context'])test('T3 resealed foreign publication is not own completion: '+effect+' '+variant,{timeout:120000},async t=>{
 const f=await fixture(t);await f.stub.firstConnectionConfigure(effect+'-held');const pending=approveFirstConnection(f);await waitFirstState(f,s=>s.fetchHeld,'actual '+effect+' result held');
 assert.deepEqual(await plain(f.stub.firstConnectionReseal(effect,variant)),{codecRoundtrip:true});
 await f.stub.firstConnectionRelease('fetch');const response=await pending;assert.notEqual(response.status,200);await response.body?.cancel();await firstSettled(f);
 const probe=await readFirstConnectionProbe(f);assert.equal(receipts(probe).length,0);assert.equal(f.activations.length,effect==='upload'?1:2);assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
});
