import {createHash} from 'node:crypto';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import test from 'node:test';
import assert from 'node:assert/strict';
import {gunzipSync} from 'node:zlib';
import {mkdir,writeFile} from 'node:fs/promises';
import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import {hashFinitePreparationRecord,hashFinitePolicyEffectIdentity} from '../lib/mcp-qa-finite-preparation-records.mjs';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {plain,approveFirstConnection,readFirstConnectionProbe,setFirstConnectionFault} from './fixtures/finite-first-connection-publication.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev';
async function fixture(t,options){
 const f=await initialEntryHarness('first-connection-publication',options);
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


/** Node assertion over passive actual native observations; never product authority. */
function assertNativePublicationOrder(trace,rows,requests){
 const sha=value=>createHash('sha256').update(value).digest('hex'),prefix='native publication order: ';
 const indexed=trace.map((event,index)=>({...event,index}));
 const one=(values,label)=>{assert.equal(values.length,1,prefix+label+' must be unique');return values[0];};
 const response=one(indexed.filter(e=>e.kind==='native-response-return'&&e.originalMethod==='POST'&&e.status===200),'actual successful QA response');
 assert.equal(typeof response.requestId,'string');assert(response.requestId.length>0,prefix+'original request ID');
 const events=indexed.filter(e=>e.requestId===response.requestId);
 const records=rows.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:'));
 const readRow=key=>{const row=one(records.filter(([k])=>k===key),key);return {key,raw:row[1],value:JSON.parse(row[1]),valueHash:sha(row[1])};};
 const sendFor=effect=>{const row=one(records.filter(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect===effect),effect+' own SEND');return readRow(row[0]);};
 const uploadSend=sendFor('upload'),activationSend=sendFor('activation');
 const receipt=readRow(activationSend.key.slice(0,-4)+'receipt');
 const durability=(record,label,before)=>{
  const matches=kind=>events.filter(e=>e.kind===kind&&e.key===record.key&&e.valueHash===record.valueHash);
  const put=one(matches('put-settled'),label+' actual native put'),commit=one(matches('transaction-settled'),label+' actual native commit');
  assert(put.index<commit.index&&commit.index<before,prefix+label+' put/commit before next boundary');
  const sync=matches('sync-settled').find(e=>e.index>commit.index&&e.index<before);assert(sync,prefix+label+' settled sync before next boundary');
  const read=matches('get-settled').find(e=>e.scope==='storage'&&e.index>sync.index&&e.index<before);assert(read,prefix+label+' exact storage readback after sync before next boundary');
  return {key:record.key,valueHash:record.valueHash,put:put.index,commit:commit.index,sync:sync.index,read:read.index};
 };
 const flows=[];
 for(const [effect,send]of [['upload',uploadSend],['activation',activationSend]]){
  const ack=readRow(send.key.slice(0,-4)+'ack'),identity={kind:'connection',preconnectionId:send.value.preconnectionId,sourceRevision:send.value.sourceRevision,stage:'connection',effect};
  assert.equal(send.key,'afw.finite-policy-effect.v1:'+hashFinitePolicyEffectIdentity(identity)+':send',prefix+effect+' original journal identity');
  assert.equal(ack.value.sendHash,hashFinitePreparationRecord('ConnectionSend',send.value),prefix+effect+' ACK links actual own SEND');
  const invocation=one(events.filter(e=>e.kind==='native-invocation'&&e.effect===effect),effect+' actual fetch invocation');
  const wire=one(requests.filter(r=>r.method==='POST'&&r.url===invocation.url),effect+' actual provider request');
  assert.equal(invocation.method,wire.method,prefix+effect+' actual method');assert.equal(invocation.bodyHash,sha(wire.body),prefix+effect+' actual body hash');
  assert.equal(send.value.requestHash,initialHash('afw.finite-policy-request.v1',{method:wire.method,path:wire.url,body:JSON.parse(wire.body),baselineVersionId:send.value.baselineVersionId,baselineDeploymentId:send.value.baselineDeploymentId}),prefix+effect+' SEND binds actual wire');
  const headers=one(events.filter(e=>e.kind==='native-result-enter'&&e.effect===effect),effect+' captured native response');
  const result=one(events.filter(e=>e.kind==='native-operation-settled'&&e.effect===effect),effect+' fulfilled original operation');
  assert(invocation.index<headers.index&&headers.index<result.index,prefix+effect+' invocation then response then body/cancel/result settlement');
  assert.equal(result.resourceId,ack.value.resourceId,prefix+effect+' ACK resource from actual normal result');
  const next=effect==='upload'?one(events.filter(e=>e.kind==='transaction-settled'&&e.key===activationSend.key&&e.valueHash===activationSend.valueHash),'activation SEND commit').index:one(events.filter(e=>e.kind==='transaction-settled'&&e.key===receipt.key&&e.valueHash===receipt.valueHash),'receipt commit').index;
  const sendOrder=durability(send,effect+' SEND',invocation.index),ackOrder=durability(ack,effect+' ACK',next);
  assert(result.index<ackOrder.put,prefix+effect+' actual result before ACK put');
  flows.push({effect,sendHash:hashFinitePreparationRecord('ConnectionSend',send.value),send:sendOrder,invocation:invocation.index,headers:headers.index,result:result.index,resourceId:result.resourceId,ack:ackOrder});
 }
 assert(flows[0].ack.read<flows[1].send.put,prefix+'upload ACK durability before activation SEND');
 assert.equal(receipt.value.versionId,flows[0].resourceId,prefix+'receipt upload ID');assert.equal(receipt.value.deploymentId,flows[1].resourceId,prefix+'receipt deployment ID');
 assert.equal(receipt.value.baselineVersionId,uploadSend.value.baselineVersionId,prefix+'receipt original baseline');assert.equal(receipt.value.baselineDeploymentId,activationSend.value.baselineDeploymentId,prefix+'receipt original deployment');
 const receiptOrder=durability(receipt,'receipt',response.index);
 assert(flows[1].ack.read<receiptOrder.put,prefix+'activation ACK durability before receipt put');
 return {requestId:response.requestId,flows,receipt:receiptOrder,success:response.index,status:response.status};
}
function assertPublicationOrderDataSensitivity(trace,rows,requests,actual){
 const checked=[],reject=(name,copy)=>{assert.throws(()=>assertNativePublicationOrder(copy,rows,requests),/native publication order:/,name+' must fail the Node order predicate');checked.push(name);};
 const upload=actual.flows[0],activation=actual.flows[1];
 reject('missing upload SEND sync',trace.filter(e=>!(e.kind==='sync-settled'&&e.key===upload.send.key)));
 const moved=trace.slice(),[invoke]=moved.splice(activation.invocation,1);moved.splice(activation.send.read,0,invoke);reject('activation invocation before SEND readback',moved);
 reject('missing activation ACK sync',trace.filter(e=>!(e.kind==='sync-settled'&&e.key===activation.ack.key)));
 const late=trace.filter(e=>!(e.kind==='get-settled'&&e.key===actual.receipt.key));late.push(trace[actual.receipt.read]);reject('receipt readback only after success',late);
 return {kind:'assertion discrimination on DATA copies only',nativeFailureInjected:false,checked};
}

test('T3 same initial bytes produce connection and downstream',{timeout:120000},async t=>{
 const f=await fixture(t),before=await readFirstConnectionProbe(f);assert.equal(f.firstConnectionBuild.negativeMutation,null,'positive principal is unmutated');assert.equal(f.firstConnectionBuild.M.sha256,'c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32','positive initial M stays exact D11');assert.equal(f.firstConnectionBuild.M.bytes,1988061);await f.stub.firstConnectionConfigure('normal');
 const owner=(await plain(f.stub.capsuleFacts())).material.ownerSelection,originalToken=await f.firstConnectionToken(owner,{expiresAt:Math.floor((Date.now()+120000)/1000)}),choiceHeaders={'Cf-Access-Jwt-Assertion':originalToken};
 const foreignUrl='https://foreign.invalid/connections/finite-prepare',foreign=await f.mf.dispatchFetch(foreignUrl,{headers:choiceHeaders});assert.notEqual(foreign.status,200);await foreign.body?.cancel();
 const foreignSpy=await f.negative.fetch(foreignUrl,{headers:choiceHeaders});assert.notEqual(foreignSpy.status,200);await foreignSpy.body?.cancel();
 const originProbe=await readFirstConnectionProbe(f);assert.equal(originProbe.native.calls.length,0,'valid signed foreign URL never reaches QA');assert.equal(originProbe.negative.forwarded,0);assert.equal(originProbe.negative.ordinary,0);assert.equal(originProbe.negative.sql,0);assert.equal(effectRows(originProbe).length,0);
 const response=await approveFirstConnection(f,{token:originalToken});
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
 const connectionTelemetry=await plain(f.stub.firstConnectionState());assert(connectionTelemetry.counts?.get>0);assert(connectionTelemetry.http.length>0);assert(connectionTelemetry.http.every(io=>io.settled&&io.cancelCalls===io.cancelSettled),'success retains every actual native body/cancel settlement');const orderRequests=p.providerRequests.slice(before.providerRequests.length),nativeOrder=assertNativePublicationOrder(connectionTelemetry.trace,p.rows,orderRequests),orderSensitivity=assertPublicationOrderDataSensitivity(connectionTelemetry.trace,p.rows,orderRequests,nativeOrder),orderBuild={testRevision:process.env.GITHUB_SHA,negativeMutation:f.firstConnectionBuild.negativeMutation,M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes}};console.info('T3 native publication chronology',JSON.stringify(nativeOrder));console.info('T3 chronology DATA sensitivity',JSON.stringify(orderSensitivity));console.info('T3 principal build provenance',JSON.stringify(orderBuild));await mkdir('output/task3',{recursive:true});await writeFile('output/task3/native-publication-order.json',JSON.stringify({...orderBuild,order:nativeOrder,assertionDiscrimination:orderSensitivity,passiveTrace:connectionTelemetry.trace},null,2));const receipt=JSON.parse(receiptRows[0][1]),originalRows=before.rows.filter(([k])=>!k.startsWith('owner-ticket:')&&!k.startsWith('owner-project-ref:')&&!k.startsWith('connection-preparation:'));
 for(const row of originalRows)assert.deepEqual(p.rows.find(([k])=>k===row[0]),row);
 const closedVersion=f.providerRegistry.versions[receipt.baselineVersionId],connectionVersion=f.providerRegistry.versions[receipt.versionId];
 assert.equal(connectionVersion.modules[0].content_base64,closedVersion.modules[0].content_base64);
 const configOnly=structuredClone(closedVersion);configOnly.id=receipt.versionId;configOnly.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(connectionVersion,configOnly);
 // Adoption follows actual POST completion/body settlement and uses only the
 // provider registry's real upload/pointer. QA script and physical references stay.
 await f.adoptConnectionConfiguration();assert.equal(f.transportNormalized,false);
 const postAdoptionBefore=await readFirstConnectionProbe(f),postAdoptionForeign=await f.mf.dispatchFetch(foreignUrl,{headers:choiceHeaders});assert.notEqual(postAdoptionForeign.status,200);await postAdoptionForeign.body?.cancel();assert.equal((await readFirstConnectionProbe(f)).native.calls.length,postAdoptionBefore.native.calls.length);
 await f.adoptConnectionConfiguration({upstream:true});assert.equal(f.transportNormalized,true);
 const normalBefore=await readFirstConnectionProbe(f),foreignOrigin=await f.negative.fetch(O+'/connections/finite-prepare',{headers:{...choiceHeaders,Origin:'https://foreign.invalid'}});assert.notEqual(foreignOrigin.status,200);await foreignOrigin.body?.cancel();const normalAfter=await readFirstConnectionProbe(f);assert.equal(normalAfter.native.calls.length,normalBefore.native.calls.length,'foreign Origin remains denied before QA under native upstream');assert.equal(normalAfter.negative.forwarded,normalBefore.negative.forwarded);assert.equal(normalAfter.negative.ordinary,0);assert.equal(normalAfter.negative.sql,0);
 const actualPrep=p.rows.find(([key])=>key==='connection-preparation:'+receipt.preconnectionId+':record');assert(actualPrep);const narrowed=JSON.parse(actualPrep[1]);assert(narrowed.owner.accessExpiresAt<narrowed.expiresAt+1);assert(narrowed.expiresAt<JSON.parse(before.rows.find(([key])=>key.endsWith(':capsule'))[1]).C0,'valid shorter signed identity narrows original approval');
 f.providerPhase='verification context after connection';const current=await plain(f.stub.firstConnectionContext());assert.equal(current.source?.phase,'read_consent',JSON.stringify(current));f.source=current.source;
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
 try{await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(O).host}},fetch:(url,options)=>{f.providerPhase='MCP';return f.mf.dispatchFetch(String(url),options);}}));const tools=await client.listTools();assert.deepEqual(tools.tools.map(t=>t.name).sort(),['read_project_summary','read_saved_evidence']);const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.source.project.projectId);}finally{await client.close();}
 const originalActivation=effectRows(p).filter(([key])=>key.endsWith(':send')).map(([,raw])=>JSON.parse(raw)).find(send=>send.effect==='activation');assert(Date.now()>=originalActivation.deadline,'completed history is observed beyond its original effect window');
 f.providerPhase='verification context after exchange';const actualCurrent=await plain(f.stub.firstConnectionContext());assert.equal(actualCurrent.source?.phase,'read_consent');const afterExchange=await plain(f.stub.snapshot());assert.deepEqual(afterExchange.find(([k])=>k===grantAck[0]),grantAck,'immutable original grant ACK');
 const grant=(await f.db.prepare("SELECT exchanged_at FROM delegated_access_grants WHERE id=?").bind(JSON.parse(beforeExchange.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]).identity.grantId).first());assert.notEqual(grant.exchanged_at,'','real native exchange timestamp');
 const noticeGet=await f.call('/monitoring',{headers});assert.equal(noticeGet.status,200);const noticeHtml=await noticeGet.text(),noticeHandle=/name="handle" value="([^"]+)"/.exec(noticeHtml)?.[1],noticeCookie=noticeGet.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(noticeHandle&&noticeCookie);
 const noticePost=await f.call('/monitoring/grant',{method:'POST',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+noticeCookie},body:new URLSearchParams({handle:noticeHandle})});assert.equal(noticePost.status,200);await noticePost.body?.cancel();
 const final=await readFirstConnectionProbe(f),link=final.rows.find(([k])=>k==='connection-preparation:'+current.preconnectionId+':notice');assert(link,'actual native NoticeLink follows actual GET/POST');
 const unsupported=await f.call('/connections/finite-prepare',{headers});assert.notEqual(unsupported.status,200);await unsupported.body?.cancel();assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);
 assert.equal(final.negative.ordinary,0);assert.equal(final.negative.sql,0);
 const telemetry=connectionTelemetry,sends=effectRows(final).filter(([k])=>k.endsWith(':send')).map(([,v])=>JSON.parse(v));console.info('T3 original clock and IO',JSON.stringify({counts:telemetry.counts,http:telemetry.http.reduce((out,io)=>{const key=io.kind+' '+io.method,row=out[key]??={requests:0,bytes:0,reads:0,cancelCalls:0,cancelSettled:0};row.requests++;for(const field of ['bytes','reads','cancelCalls','cancelSettled'])row[field]+=io[field];return out;},{}),originalRoots:p.native.calls.map(c=>({method:c.method,windowMs:c.boundary.deadline-c.boundary.startedAt})),pairs:p.native.observation.filter(v=>v.kind==='pair').map(v=>v.elapsedMs),providerRequests:final.providerRequests.length,providerByPhase:final.providerRequests.reduce((out,r)=>{const key=r.phase+' '+new URL(r.url).host;out[key]=(out[key]??0)+1;return out;},{}),providerResponseBytes:f.providerRegistry.responses.reduce((out,r)=>{const path=r.path.includes('/versions/')?r.path.replace(/\/versions\/[^/]+$/,'/versions/:id'):r.path,key=r.phase+' '+r.host+' '+r.method+' '+path,row=out[key]??={responses:0,bytes:0};row.responses++;row.bytes+=r.bytes;return out;},{}),providerByHost:final.providerRequests.reduce((out,r)=>{const host=new URL(r.url).host;out[host]=(out[host]??0)+1;return out;},{}),providerByEndpoint:final.providerRequests.reduce((out,r)=>{const u=new URL(r.url),path=u.pathname.includes('/versions/')?u.pathname.replace(/\/versions\/[^/]+$/,'/versions/:id'):u.pathname,key=u.host+' '+r.method+' '+path;out[key]=(out[key]??0)+1;return out;},{}),sends:sends.map(s=>({effect:s.effect,windowMs:s.deadline-s.issuedAt})),receiptInsideActivation:receipt.completedAt<sends.find(s=>s.effect==='activation').deadline}));
 console.info('T3 native closure SYN',JSON.stringify({sourceRevision:f.source.sourceRevision,testRevision:process.env.GITHUB_SHA,receiptHash:receipt.receiptHash,grantTimestampNative:true,noticeLink:true,seededConnection:false,completePackage:false,operationalReadiness:false}));

});

const effectRows=p=>p.rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:'));
const ticketUses=p=>p.rows.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use'));
const receipts=p=>effectRows(p).filter(([k])=>k.endsWith(':receipt'));
async function waitFirstState(f,predicate,label,observePost=false){
 let end=performance.now()+30000,waitingPost=observePost,last;
 for(;;){
  // GET and POST have separate actual incoming roots. Observe the root whose
  // native boundary is requested; this DATA timestamp never reaches the product.
  if(waitingPost&&Number.isFinite(f.choicePostStarted)){end=f.choicePostStarted+30000;waitingPost=false;}
  if(performance.now()>=end)break;
  last=await plain(f.stub.firstConnectionState());if(predicate(last))return last;
  if(waitingPost&&f.failedChoiceState)break;
  await new Promise(r=>setTimeout(r,10));
 }
 const probe=await plain(f.stub.firstConnectionProbe());console.info('T3 missing boundary SYN',JSON.stringify({label,observePost,postObserved:observePost&&!waitingPost,choicePostStarted:f.choicePostStarted,state:{...last,http:undefined,trace:last?.trace?.slice(-12)},failures:probe.observation.filter(v=>['failure','connection-failure'].includes(v.kind)).slice(-8)}));
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
 const state=f.failedChoiceState??await plain(f.stub.firstConnectionState()),probe=await readFirstConnectionProbe(f);assert.equal(receipts(probe).length,0,mode);return {f,probe,state};
}
for(const mode of ['enrollment-transaction-lost','enrollment-sync-lost'])test('T3 enrollment unknown cannot upload: '+mode,{timeout:120000},async t=>{
 const {f,probe,state}=await failureCase(t,mode);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert(state.trace.some(v=>v.key==='afw.finite-preparation-cleanup.v1:enrollment'&&v.kind==='put-settled'));assert(probe.rows.some(([k])=>k==='afw.finite-preparation-cleanup.v1:enrollment'));assert.equal(effectRows(probe).length,0);const factual=await plain(f.stub.firstConnectionContext());assert.equal(factual.source?.phase,'closed_ui');assert.equal(factual.source.currentPublication.stage,null);const source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,fresh=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':await f.enrollmentToken(source)}});assert.notEqual(fresh.status,200,'genuinely fresh signed choice cannot resume enrollment');await fresh.body?.cancel();assert.equal(f.uploads.length,1);assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0);
});
for(const mode of ['upload-send-transaction-lost','upload-lost','upload-malformed','upload-cached','upload-oversize'])test('T3 upload uncertainty cannot activate: '+mode,{timeout:120000},async t=>{
 const {f,probe,state}=await failureCase(t,mode);assert.equal(f.activations.length,1);assert(state.trace.some(v=>v.key?.endsWith(':send')&&v.kind==='put-settled'));assert(!effectRows(probe).some(([k,v])=>k.endsWith(':send')&&JSON.parse(v).effect==='activation'));const context=await plain(f.stub.firstConnectionContext()),publicProbe=await plain(f.stub.firstConnectionProbe());assert(publicProbe.observation.some(v=>v.kind==='public-partial-target'),'valid private partial pair reaches public denial predicate');assert.equal(context.status,'unavailable','public partial connection cannot appear closed_ui');assert.equal(f.uploads.length,mode==='upload-send-transaction-lost'?1:2);
});
for(const mode of ['activation-lost','activation-malformed','activation-cached'])test('T3 activation uncertainty cannot finish: '+mode,{timeout:120000},async t=>{
 const {f,probe,state}=await failureCase(t,mode);assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);assert(state.trace.some(v=>v.effect==='activation'&&v.kind==='native-result-enter'));assert(!effectRows(probe).some(([k,v])=>k.endsWith(':ack')&&JSON.parse(v).resourceId==='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'));assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
});
for(const mode of ['receipt-transaction-lost','receipt-sync-lost','receipt-readback-lost','final-pair-owner-drift'])test('T3 final readback cannot turn uncertainty into success: '+mode,{timeout:120000},async t=>{
 const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);const response=await approveFirstConnection(f);assert.notEqual(response.status,200);await response.body?.cancel();const probe=await readFirstConnectionProbe(f);assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);assert.equal(receipts(probe).length,1,'durable own receipt preserved despite failed response');const state=await plain(f.stub.firstConnectionState());assert(state.trace.some(v=>v.key?.endsWith(':receipt')&&v.kind==='put-settled'));
});
for(const mode of ['upload-held','activation-held','upload-read-held','upload-cancel-held','source-sql-held','enrollment-transaction-held','enrollment-sync-held','upload-ack-held','receipt-transaction-held'])test('T3 retained work blocks a different live root: '+mode,{timeout:120000},async t=>{
 const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);const pending=approveFirstConnection(f);
 const which=['upload-held','activation-held'].includes(mode)?'fetch':mode==='upload-read-held'?'read':mode==='upload-cancel-held'?'cancel':'work';
 const heldState=await waitFirstState(f,s=>s[which+'Held'],'held '+which,true),boundary=which==='cancel'?heldState.uploadAdmission:heldState[which+'Boundary'];assert.equal(boundary.originalMethod,mode==='source-sql-held'?'GET':'POST');assert(boundary.enteredAt>=boundary.startedAt&&boundary.enteredAt<boundary.deadline,'original business IO entered while its original request lease was live');console.info('T3 actual held entry',JSON.stringify({mode,originalIo:boundary,heldBoundary:heldState[which+'Boundary'],cleanupMayOutliveOriginal:which==='cancel'}));
 const response=await pending;assert.notEqual(response.status,200);await response.body?.cancel();
 const other=await plain(f.stub.firstConnectionAvailability());assert.equal(other.live,true,'different root is genuinely still live');assert.equal(other.available,false,'actual retained native work owns scope');
 assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
 await f.stub.firstConnectionRelease(which);
 if(which==='read'){await waitFirstState(f,s=>s.cancelHeld,'late read reached real cancel');assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false);await f.stub.firstConnectionRelease('cancel');}
 await firstSettled(f);const state=await plain(f.stub.firstConnectionState());assert.equal(state[which+'Settled'],true,'actual native settlement observed');if(which==='read')assert.equal(state.cancelSettled,true);if(['read','cancel'].includes(which))console.info('T3 retained cleanup settled',JSON.stringify({mode,originalIo:boundary,cancelBoundary:state.cancelBoundary,cancelSettled:state.cancelSettled,logicalResponse:response.status}));
 const probe=await readFirstConnectionProbe(f);assert.equal(f.activations.length,['activation-held','receipt-transaction-held'].includes(mode)?2:1);assert.equal(receipts(probe).length,mode==='receipt-transaction-held'?1:0);assert.equal(effectRows(probe).filter(([k])=>k.endsWith(':ack')).length,mode==='receipt-transaction-held'?2:['activation-held','upload-ack-held'].includes(mode)?1:0);
});
for(const effect of ['upload','activation'])for(const variant of ['ack','context'])test('T3 resealed foreign publication is not own completion: '+effect+' '+variant,{timeout:120000},async t=>{
 const f=await fixture(t);await f.stub.firstConnectionConfigure(effect+'-held');const pending=approveFirstConnection(f);await waitFirstState(f,s=>s.fetchHeld,'actual '+effect+' result held',true);
 assert.deepEqual(await plain(f.stub.firstConnectionReseal(effect,variant)),{codecRoundtrip:true,journalValid:true});
 await f.stub.firstConnectionRelease('fetch');const response=await pending;assert.notEqual(response.status,200);await response.body?.cancel();await firstSettled(f);
 const probe=await readFirstConnectionProbe(f);assert.equal(receipts(probe).length,0);assert.equal(f.activations.length,effect==='upload'?1:2);assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
});

async function actualChoice(f,token){
 const response=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.equal(response.status,200);
 const html=await response.text(),handle=/name="handle" value="([a-f0-9]{64})"/.exec(html)?.[1],projectRef=/name="projectRef" value="([a-f0-9]{64})"/.exec(html)?.[1],cookie=response.headers.get('set-cookie')?.split(';')[0];assert(handle&&projectRef&&cookie);return {handle,projectRef,cookie};
}
const choicePost=(f,form,token,{body=new URLSearchParams({handle:form.handle,projectRef:form.projectRef,decision:'approve'}).toString(),headers={},url='/connections/finite-prepare'}={})=>f.call(url,{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':token,Cookie:form.cookie,...headers},body});
test('T3 identity and choice cannot mint admission',{timeout:120000},async t=>{
 const f=await fixture(t),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,valid=await f.firstConnectionToken(source),parts=valid.split('.'),signature=parts[2],badSignature=parts[0]+'.'+parts[1]+'.'+(signature[0]==='A'?'B':'A')+signature.slice(1);
 const invalid=[['signature',badSignature],['issuer',await f.firstConnectionToken(source,{issuer:'https://foreign.invalid'})],['audience',await f.firstConnectionToken(source,{audience:'SYN-foreign-audience'})],['subject',await f.firstConnectionToken(source,{subject:'SYN-foreign-owner'})],['expiry',await f.firstConnectionToken(source,{expiresAt:Math.floor(Date.now()/1000)-1})]];
 for(const [label,token]of invalid){const r=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.notEqual(r.status,200,label);await r.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0,label);assert.equal(effectRows(p).length,0,label);}
 const form=await actualChoice(f,valid),normal=new URLSearchParams({handle:form.handle,projectRef:form.projectRef,decision:'approve'}).toString();
 const cases=[['Origin',{headers:{Origin:'https://foreign.invalid'}}],['cookie repeat',{headers:{Cookie:form.cookie+'; '+form.cookie}}],['cookie list',{headers:{Cookie:form.cookie+'; bad name=x'}}],['handle',{body:normal.replace(form.handle,'f'.repeat(64))}],['projectRef',{body:normal.replace(form.projectRef,'e'.repeat(64))}],['decision',{body:normal.replace('approve','deny')}],['extra',{body:normal+'&extra=x'}],['duplicate',{body:normal+'&decision=approve'}],['escape',{body:normal+'&x=%ZZ'}],['oversize',{body:normal+'x'.repeat(1025)}],['UTF8',{body:new Uint8Array([0xff])}]];
 for(const [label,patch]of cases){const r=await choicePost(f,form,valid,patch);assert.notEqual(r.status,200,label);await r.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0,label);assert.equal(effectRows(p).length,0,label);}
 const ticketBaseline=(await readFirstConnectionProbe(f)).rows;
 for(const variant of ['action','preconnection','source','subject-realm','project-map','snapshot']){
  const altered=await plain(f.stub.firstConnectionTicketFault(variant));assert.equal(altered.codecRoundtrip,true,variant+' passes actual record codec');
  const observedBefore=(await plain(f.stub.firstConnectionProbe())).observation.length;const r=await choicePost(f,form,valid);assert.notEqual(r.status,200,'persisted ticket correlation '+variant);await r.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0,variant);assert.equal(effectRows(p).length,0,variant);assert(!p.rows.some(([key])=>key.startsWith('connection-approval:')),variant+' cannot approve');assert(p.native.observation.slice(observedBefore).some(v=>v.kind==='correlator'&&v.name===(variant==='snapshot'?'source-snapshot':'ticket-map')),variant+' reaches actual complete-snapshot correlator');
  await f.stub.firstConnectionTicketFault('restore');assert.deepEqual((await readFirstConnectionProbe(f)).rows,ticketBaseline,'original history restored after negative '+variant);
  console.info('T3 actual ticket correlation',JSON.stringify({variant,codecRoundtrip:true,ticketUse:0,approval:0,effects:0}));
 }
 const accepted=await choicePost(f,form,valid);assert.equal(accepted.status,200,'same actual ticket and current owner remain usable after invalid inputs');await accepted.body?.cancel();assert.equal(receipts(await readFirstConnectionProbe(f)).length,1);
});
test('T3 source and rollback must be recoverable',{timeout:120000},async t=>{
 const f=await fixture(t),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,token=await f.firstConnectionToken(source),headers={'Cf-Access-Jwt-Assertion':token};
 for(const fault of ['module','configuration','qa-module','qa-namespace','sdk-alias','sdk-extra']){f.ownerFault=fault;const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,fault);await r.body?.cancel();f.ownerFault=null;assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0);}
 for(const fault of ['missing-backup','missing-receipt','missing-chunk','tamper-chunk']){await f.stub.firstConnectionBackupFault(fault);const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,fault);await r.body?.cancel();assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0);await f.stub.firstConnectionBackupFault('restore');}

 const originalProviderVersion=structuredClone(f.uploaded);
 const configFaults=[
  ['extra binding',v=>v.bindings.push({name:'SYN_UNAPPROVED_BINDING',type:'plain_text',text:'false'})],
  ['ordinary monitoring flag',v=>{v.bindings.find(b=>b.name==='AFW_DOSSIER_MONITORING_OWNER_ENABLED').text='true';}],
  ['events flag',v=>{v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true';}],
  ['nonempty policy',v=>{v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY').text='{"SYN":"not empty"}';}],
  ['physical namespace',v=>{v.bindings.find(b=>b.name==='AFW_FINITE_TRIAL_CONTROL').namespace_id='f'.repeat(32);}],
  ['limiter',v=>{v.bindings.find(b=>b.name==='DELEGATED_RATE_LIMITER').namespace_id='99199';}],
  ['secret value',v=>{v.bindings.find(b=>b.type==='secret_text').text='SYN NEGATIVE NEVER AUTHORITY';}]
 ];
 for(const [label,mutate]of configFaults){mutate(f.uploaded);const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,label);await r.body?.cancel();assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0,label);assert.equal(ticketUses(await readFirstConnectionProbe(f)).length,0,label);f.uploaded=structuredClone(originalProviderVersion);}
 const original=(await f.db.prepare('SELECT id,user_id,revision FROM site_projects WHERE id=?').bind(source.project.projectId).first());
 for(const field of ['user_id','revision']){if(field==='user_id')await f.db.prepare("UPDATE site_projects SET user_id='SYN-owner-drift' WHERE id=?").bind(original.id).run();else await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(original.id).run();const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,field);await r.body?.cancel();await f.db.prepare('UPDATE site_projects SET user_id=?,revision=? WHERE id=?').bind(original.user_id,original.revision,original.id).run();}
 const form=await actualChoice(f,token);assert(form.handle);const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0);assert.equal(effectRows(p).length,0);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
});
test('T3 original deadline fences each native boundary: shorter signed Access before TicketUse',{timeout:120000},async t=>{
 const f=await fixture(t),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,expiresAt=Math.floor((Date.now()+5000)/1000),token=await f.firstConnectionToken(source,{expiresAt});assert(Date.now()<expiresAt*1000);
 await f.stub.firstConnectionConfigure('access-expiry-held');const pending=f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});const state=await waitFirstState(f,s=>s.jwkFetched&&s.workHeld,'actual signed verification followed by retained factual read');assert.equal(state.workSettled,undefined);
 await new Promise(resolve=>setTimeout(resolve,Math.max(1,expiresAt*1000-Date.now()+1)));await f.stub.firstConnectionRelease('work');const response=await pending;assert.equal(response.status,401,'current signed expiry crosses before ticket/admission');await response.body?.cancel();await firstSettled(f);const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0);assert.equal(effectRows(p).length,0);assert.equal(f.uploads.length,1);
});
test('T3 admission cannot cross lineage or resume',{timeout:120000},async t=>{
 const {f,probe}=await failureCase(t,'upload-lost');await firstSettled(f);const before=probe.rows,source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,token=await f.firstConnectionToken(source);await f.stub.firstConnectionRestore();
 const replay=()=>choicePost(f,f.choice,token);
 for(const step of ['new root','actual actor restart']){
  if(step==='actual actor restart'){const instance=await f.stub.firstConnectionInstance();await assert.rejects(async()=>{await f.stub.firstConnectionRestart();});const bindings=await f.mf.getBindings('qa-first-connection');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));assert.notEqual(await f.stub.firstConnectionInstance(),instance);}
  const r=await replay();assert.notEqual(r.status,200,step);await r.body?.cancel();assert.equal(f.uploads.length,2);assert.equal(f.activations.length,1);assert.deepEqual((await readFirstConnectionProbe(f)).rows,before,'consumed history and unrelated rows preserved');
 }
});

test('T3 resealed completed owner baseline physical and receipt facts remain correlated',{timeout:120000},async t=>{
 const f=await fixture(t),response=await approveFirstConnection(f);assert.equal(response.status,200);await response.body?.cancel();
 const baseline=await readFirstConnectionProbe(f),posts=baseline.providerRequests.filter(r=>r.method==='POST').length;
 const variants=['owner','source','context','baseline','preconnection','module','configuration','version','deployment','writer-head','receipt-links','receipt-time'];
 for(const variant of variants){
  assert.equal((await plain(f.stub.firstConnectionContext())).source?.phase,'read_consent','valid produced baseline before '+variant);
  assert.deepEqual(await plain(f.stub.firstConnectionCorruptCompleted(variant)),{codecRoundtrip:true,journalValid:true},variant);

  const observedBefore=(await plain(f.stub.firstConnectionProbe())).observation.length;
  const r=await plain(f.stub.firstConnectionContext());assert.equal(r.status,'unavailable',variant+' must fail current correlation after valid codecs/journals');
  const newObservations=(await plain(f.stub.firstConnectionProbe())).observation.slice(observedBefore),target={owner:'preparation',source:'preparation',context:'connection-history',baseline:'connection-history',module:'receipt-physical-hash',configuration:'receipt-physical-hash',version:'publication-pointer',deployment:'publication-pointer','writer-head':'writer-head'}[variant];
  if(target)assert(newObservations.some(v=>v.kind==='correlator'&&v.name===target),variant+' reaches intended '+target+' correlator');
  else assert(newObservations.some(v=>v.frames?.some(frame=>frame.includes('qualifyFiniteOwnerInstalledStage'))),variant+' reaches installed-stage receipt link/time correlator');

  const probe=await readFirstConnectionProbe(f),observations=probe.native.observation.filter(v=>v.kind==='public-reader-rejected');assert(observations.length,variant);console.info('T3 completed correlator',JSON.stringify({variant,codecRoundtrip:true,journalValid:true,frames:observations.at(-1).frames}));
  assert.equal(probe.providerRequests.filter(r=>r.method==='POST').length,posts,'no next provider effect for '+variant);
  await f.stub.firstConnectionCorruptCompleted('restore');assert.deepEqual((await readFirstConnectionProbe(f)).rows,baseline.rows,'foreign/original rows preserved for '+variant);
 }
});
test('T3 own completion requires genuinely recorded original ACK even when foreign bytes match',{timeout:120000},async t=>{
 const f=await fixture(t);await f.stub.firstConnectionConfigure('upload-held');const pending=approveFirstConnection(f);await waitFirstState(f,s=>s.fetchHeld,'actual upload result held',true);
 assert.deepEqual(await plain(f.stub.firstConnectionReseal('upload','ack-matched')),{codecRoundtrip:true,journalValid:true});
 await f.stub.firstConnectionRelease('fetch');const response=await pending,status=response.status;await response.body?.cancel();await firstSettled(f);const before=await readFirstConnectionProbe(f);assert(before.native.observation.some(v=>v.kind==='journal-mutation'&&v.recordKind==='ConnectionAck'&&v.status==='existing'),'exact valid foreign bytes reach the own-recorded guard');console.info('T3 recorded ACK target',JSON.stringify({status,activations:before.activations,mutant:f.firstConnectionBuild.negativeMutation??null}));assert.notEqual(status,200,'existing foreign ACK cannot be accepted by own continuation');assert.equal(f.activations.length,1);assert.equal(receipts(before).length,0);
});

for(const mode of ['clock-backward','source-holder-drift','upload-holder-drift','activation-holder-drift','upload-metadata-id-drift','upload-db-method-drift','upload-db-prepare-drift','upload-node-method-drift','upload-self-method-drift','upload-kv-method-drift','upload-fetch-drift','upload-credential-drift'])test('T3 original deadline and holder references remain original: '+mode,{timeout:120000},async t=>{
 const {f,probe,state}=await failureCase(t,mode);assert.equal(mode==='clock-backward'?state.backward:state.holderChanged,true,'actual native guard boundary reached');if(mode!=='clock-backward')assert.deepEqual(state.afterDriftIo,{get:0,list:0,db:0,node:0,self:0,kv:0,fetch:0},'changed original holder cannot invoke the next native factual read');
 assert.equal(f.uploads.length,['clock-backward','source-holder-drift'].includes(mode)?1:2);assert.equal(f.activations.length,mode==='activation-holder-drift'?2:1);
 assert.equal(effectRows(probe).filter(([key])=>key.endsWith(':ack')).length,mode==='activation-holder-drift'?1:0,'changed original holder cannot produce ACK');if(mode!=='activation-holder-drift')assert(!effectRows(probe).some(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect==='activation'),'changed original holder denies activation SEND');if(['clock-backward','source-holder-drift'].includes(mode))assert.equal(ticketUses(probe).length,0);
});
test('T3 original parent expires before first native IO',{timeout:120000},async t=>{
 const f=await fixture(t),before=await readFirstConnectionProbe(f);const result=await plain(f.stub.firstConnectionExpiredEntry());assert.notEqual(result.status,200);const after=await readFirstConnectionProbe(f);assert.equal(after.providerRequests.length,before.providerRequests.length,'expired original boundary admits no provider IO');assert.deepEqual(after.rows,before.rows);assert.equal(ticketUses(after).length,0);assert.equal(effectRows(after).length,0);
});
for(const kind of ['overflow','read'])test('T3 original body retains real read and cancellation: '+kind,{timeout:120000},async t=>{
 const f=await fixture(t),before=await readFirstConnectionProbe(f),pending=plain(f.stub.firstConnectionBodyStart(kind));
 const until=async predicate=>{const end=performance.now()+10000;while(performance.now()<end){const state=await plain(f.stub.firstConnectionBodyState());if(predicate(state))return state;await new Promise(r=>setTimeout(r,10));}assert.fail('actual body boundary absent '+kind);};
 await until(s=>kind==='read'?s.readHeld:s.cancelHeld);
 if(kind==='read')await f.stub.firstConnectionBodyControl('abort');
 const response=await pending;assert.notEqual(response.status,200);const competing=await plain(f.stub.firstConnectionAvailability());assert.equal(competing.live,true);assert.equal(competing.available,false);
 if(kind==='read'){await f.stub.firstConnectionBodyControl('read');await until(s=>s.cancelHeld);assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false);}
 await f.stub.firstConnectionBodyControl('cancel');await until(s=>s.cancelSettled);await firstSettled(f);
 const state=await plain(f.stub.firstConnectionBodyState());assert.equal(state.logicalFinished,true);assert.equal(state.cancelSettled,true);if(kind==='read')assert.equal(state.readSettled,true);
 const after=await readFirstConnectionProbe(f);assert.equal(after.providerRequests.length,before.providerRequests.length);assert.deepEqual(after.rows,before.rows);assert.equal(ticketUses(after).length,0);assert.equal(effectRows(after).length,0);
});

test('T3 fixed protocol and genuinely compiled foreign profile cannot mint choice',{timeout:120000},async t=>{
 const f=await fixture(t,{negativeProfile:true}),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,token=await f.firstConnectionToken(source),initial=await readFirstConnectionProbe(f);
 assert.equal(typeof f.firstConnectionBuild.wrongProfileHash,'string');assert.notEqual(f.firstConnectionBuild.wrongProfileHash,f.firstConnectionBuild.M.sha256);
 const wrong=await f.wrongProfile.fetch(O+'/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.notEqual(wrong.status,200);await wrong.body?.cancel();
 const wrongProbe=await (await f.wrongProfile.fetch(O+'/_fixture/probe')).json();assert.equal(wrongProbe.ordinary,0);assert.equal(wrongProbe.sql,0);assert.equal(wrongProbe.forwarded,0);assert.equal((await readFirstConnectionProbe(f)).native.calls.length,0);
 const transport=()=>{const at=Date.now();return new Headers({'x-afw-finite-boundary':JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:30000}),'x-afw-finite-original-method':'GET','x-afw-finite-original-url':O+'/connections/finite-prepare','x-afw-finite-version':'55555555-5555-4555-8555-555555555555','x-afw-finite-request-id':crypto.randomUUID(),'Cf-Access-Jwt-Assertion':token});};
 const cases=[['extra protocol',h=>h.set('x-afw-finite-extra','SYN unknown')],['duplicate version',h=>h.append('x-afw-finite-version',h.get('x-afw-finite-version'))],['duplicate request ID',h=>h.append('x-afw-finite-request-id',h.get('x-afw-finite-request-id'))],['duplicate original method',h=>h.append('x-afw-finite-original-method','GET')],['duplicate boundary',h=>h.append('x-afw-finite-boundary',h.get('x-afw-finite-boundary'))]];
 for(const [label,change]of cases){const headers=transport();change(headers);const response=await f.stub.fetch('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers});assert.notEqual(response.status,200,label);await response.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(p.providerRequests.length,initial.providerRequests.length,label+' denies before factual IO');assert.equal(ticketUses(p).length,0);assert.equal(p.native.business.length,0);assert.equal(effectRows(p).length,0);}
 const headers=transport();headers.set('X-SYN-Unrelated-Trace','ignored input, never permission');const counterpart=await f.stub.fetch('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers});assert.equal(counterpart.status,200,'same signed fixed protocol otherwise reaches real choice');await counterpart.body?.cancel();const p=await readFirstConnectionProbe(f);assert(p.native.business.some(key=>key.startsWith('owner-ticket:')));assert.equal(ticketUses(p).length,0);assert.equal(effectRows(p).length,0);
 console.info('T3 compiled profile negative',JSON.stringify({positiveM:f.firstConnectionBuild.M.sha256,negativeProfileM:f.firstConnectionBuild.wrongProfileHash,protocolVariants:cases.length,ignoredUnrelatedHeader:true}));
});

for(const fault of ['upload-module','upload-config','upload-pointer','activation-pointer','activation-percentage','activation-version','activation-config','activation-secret'])test('T3 actual publication readback denies next effect: '+fault,{timeout:120000},async t=>{
 const f=await fixture(t);f.connectionReadbackFault=fault;
 const response=await approveFirstConnection(f);assert.notEqual(response.status,200,fault);await response.body?.cancel();
 assert(f.connectionReadbackHits>0,'actual fixed provider readback reached '+fault);
 const probe=await readFirstConnectionProbe(f);assert.equal(f.uploads.length,2,'actual original upload was applied');
 assert.equal(f.activations.length,fault.startsWith('upload-')?1:2,'invalid upload readback cannot activate');
 assert.equal(receipts(probe).length,0,'invalid activation readback cannot issue receipt');
 assert(!effectRows(probe).some(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect==='activation')||fault.startsWith('activation-'),'invalid upload readback denies activation SEND');
 assert.equal(effectRows(probe).filter(([key])=>key.endsWith(':ack')).length,fault.startsWith('upload-')?1:2,'original native ACKs preserved without compensation');
 console.info('T3 actual readback target',JSON.stringify({fault,hits:f.connectionReadbackHits,uploads:f.uploads.length,activations:f.activations.length,receipt:0}));
});
