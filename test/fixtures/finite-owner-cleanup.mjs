import {persistBudgetEvidence} from './finite-budget-evidence.mjs';
import {build as buildCleanupComponent} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir,writeFile} from 'node:fs/promises';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {initialEntryHarness} from './finite-initial-entry-world.mjs';
import {plain,approveFirstConnection,readFirstConnectionProbe} from './finite-first-connection-publication.mjs';
import {sealFiniteOwnerIssuerProvenanceRecord as seal} from '../../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';
import {sealFinitePreparationIssuerRecord as issuerSeal} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
export const O='https://delegated-canary.agentfriendlyweb.dev';
export function extendFiniteOwnerCleanup(entry){
 const methods="\n async ownerReferenceConfigure(mode='normal'){\n  this.ownerReferenceRestore?.();const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,s=this.ctx.storage,native={get:kv.get,list:kv.list,put:kv.put,storageGet:s.get,sync:s.sync,transaction:s.transaction};\n  const state=this.ownerReferenceState={mode,completeWrites:0,completeNormal:0,lists:0,gets:0,active:0,peak:0,held:false,released:false,actualSettled:false,abort:false,referenceCommits:0,referenceSyncs:0,referenceReadbacks:0,requests:[],children:[],trace:[]};globalThis.__r1ReferenceState=state;let referencePending=false;\n  const held=value=>{state.held=true;return new Promise(resolve=>{const tick=()=>{if(state.released){state.actualSettled=true;resolve(value);return;}setTimeout(tick,10);};tick();});};\n  this.ownerReferenceRestore=()=>{kv.get=native.get;kv.list=native.list;kv.put=native.put;s.get=native.storageGet;s.sync=native.sync;s.transaction=native.transaction;globalThis.__r1ReferenceState=null;};\n  kv.put=async(key,raw,...more)=>{\n   if(!key.startsWith('grant:'))return Reflect.apply(native.put,kv,[key,raw,...more]);\n   state.completeWrites++;state.trace.push('actual-grant-put');\n   if(mode==='foreign-metadata'){const value=JSON.parse(raw);value.metadata={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:'f'.repeat(64)}};raw=JSON.stringify(value);}\n   const actual=Reflect.apply(native.put,kv,[key,raw,...more]),result=await actual;\n   if(mode==='duplicate'){const value=JSON.parse(raw),id=value.id==='AAAAAAAAAAAAAAAA'?'BBBBBBBBBBBBBBBB':'AAAAAAAAAAAAAAAA';value.id=id;await Reflect.apply(native.put,kv,[key.slice(0,key.lastIndexOf(':')+1)+id,JSON.stringify(value),...more]);}\n   return result;\n  };\n  for(const method of ['get','list'])kv[method]=async(...args)=>{\n   const grant=method==='get'?String(args[0]).startsWith('grant:'):String(args[0]?.prefix).startsWith('grant:');\n   if(!grant)return Reflect.apply(native[method],kv,args);\n   state[method==='get'?'gets':'lists']++;if(method==='list'){if(args[0].limit!==100)throw Error('SYN native list limit');state.nativeListLimit=args[0].limit;}state.active++;state.peak=Math.max(state.peak,state.active);\n   const actual=Reflect.apply(native[method],kv,args);let value;try{value=await actual;state.trace.push('actual-'+method+'-settled');}finally{state.active--;}\n   // Held outward ACK chain AFTER native settlement; not physical KV latency.\n   if(method==='list'&&mode==='hold-lookup-ack'&&!state.held)return held(value);\n   return value;\n  };\n  s.transaction=(callback,...args)=>{\n   let wrote=false;const actual=Reflect.apply(native.transaction,s,[async tx=>{\n    const put=tx.put;tx.put=async(key,raw,...rest)=>{const value=await Reflect.apply(put,tx,[key,raw,...rest]);if(String(key).endsWith(':reference')){referencePending=true;wrote=true;state.trace.push('reference-put-native-settled');}return value;};return callback(tx);\n   },...args]);\n   return actual.then(value=>{if(wrote){state.referenceCommits++;state.trace.push('reference-transaction-native-settled');}return value;});\n  };\n  s.get=async(...args)=>{const value=await Reflect.apply(native.storageGet,s,args);if(String(args[0]).endsWith(':reference')&&value!==undefined&&state.referenceSyncs){state.referenceReadbacks++;state.trace.push('reference-readback-native-settled');}return value;};\n  s.sync=async(...args)=>{const actual=Reflect.apply(native.sync,s,args),value=await actual;if(referencePending){referencePending=false;state.referenceSyncs++;state.trace.push('reference-sync-native-settled');if(mode==='unknown-reference')throw Error('SYN reference sync ACK unknown');if(mode==='abort-reference-sync-ack')return held(value);}return value;};\n }\n async ownerReferenceObserve(signalsOnly=false){if(typeof signalsOnly!=='boolean')throw Error('SYN fixed signal projection');const state=this.ownerReferenceState??{};if(signalsOnly)return {held:state.held===true,actualSettled:state.actualSettled===true};return {...state,rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})]};}\n async ownerReferenceControl(key){if(!['released','abort'].includes(key))throw Error('SYN control');this.ownerReferenceState[key]=true;}\n async ownerReferenceFetch(request,forward){\n  const state=this.ownerReferenceState;if(!state||request.url!=='https://afw-private.invalid/_finite-owner/authorize')return forward(request);\n  const began=performance.now(),startedAt=Date.now(),method=request.headers.get('x-afw-finite-original-method'),boundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));const controller=new AbortController(),abort=()=>controller.abort();request.signal.addEventListener('abort',abort,{once:true});let done=false,timer;\n  const tick=()=>{if(done)return;if(state.abort){controller.abort();return;}timer=setTimeout(tick,10);};tick();\n  try{const response=await forward(new Request(request,{signal:controller.signal}));state.trace.push('native-authorize-response:'+response.status);return response;}finally{state.requests.push({method,startedAt,elapsedMs:performance.now()-began,wallElapsedMs:Date.now()-startedAt,budgetMs:boundary.deadline-boundary.startedAt,aborted:controller.signal.aborted});done=true;clearTimeout(timer);request.signal.removeEventListener('abort',abort);}\n }\n";

 const cleanupMethods=String.raw`
 async ownerCleanupFault(mode){
  if(!['normal','grant-before-link','notice-before-link','fence-ack-lost','held-sdk-delete','paging-scope','inventory-drift'].includes(mode))throw Error('SYN fixed cleanup fault');
  this.ownerCleanupFaultRestore?.();
  const db=this.env.RELEASE_DB,session=db.withSession,kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,del=kv.delete,list=kv.list,get=kv.get;
  const state=this.cleanupFaultState={mode,sqlWrites:0,sqlCalls:0,sqlElapsedMs:0,reconciles:0,lists:0,deletes:0,grantReads:[],held:false,released:false,settled:false,scopeProbe:null,trace:[]};
  this.ownerCleanupFaultRestore=()=>{db.withSession=session;kv.delete=del;kv.list=list;kv.get=get;};
  db.withSession=(...a)=>{
   const s=Reflect.apply(session,db,a),prepare=s.prepare;
   s.prepare=(sql,...rest)=>{
    if(sql.includes('SELECT f.*'))state.reconciles++;
    const stmt=Reflect.apply(prepare,s,[sql,...rest]),bind=stmt.bind;
    stmt.bind=(...values)=>{
     const bound=Reflect.apply(bind,stmt,values),first=bound.first;
     bound.first=async(...args)=>{
      const target=mode==='grant-before-link'&&sql.includes('INSERT INTO delegated_access_grants')||mode==='notice-before-link'&&sql.includes('INSERT INTO dossier_monitoring_consent_events')||mode==='fence-ack-lost'&&sql.includes('INSERT INTO finite_preparation_issuer_fences');
      state.sqlCalls++;const started=performance.now(),actual=Reflect.apply(first,bound,args),value=await actual;state.sqlElapsedMs+=performance.now()-started;
      if(target){state.sqlWrites++;state.trace.push({kind:mode,at:Date.now(),actualRow:!!value});if(value)throw Error('SYN actual SQL result lost before link');}
      return value;
     };return bound;
    };return stmt;
   };return s;
  };
  kv.get=async(...args)=>{
   const actual=Reflect.apply(get,kv,args),value=await actual;
   if(String(args[0]).startsWith('grant:'))state.grantReads.push({at:Date.now(),present:value!==null,keyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(args[0])).then(b=>Buffer.from(b).toString('hex')),valueHash:value===null?null:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(typeof value==='string'?value:JSON.stringify(value))).then(b=>Buffer.from(b).toString('hex'))});
   return value;
  };
  kv.list=async options=>{
   state.lists++;state.trace.push({kind:'list',at:Date.now(),limit:options.limit,prefixHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(options.prefix)).then(b=>Buffer.from(b).toString('hex'))});
   const value=await Reflect.apply(list,kv,[options]);
   if(mode!=='paging-scope')return value;
   if(state.lists===1)return {keys:Array.from({length:100},(_,n)=>({name:options.prefix+'SYN-token-'+n})),list_complete:false,cursor:'SYN-second-page'};
   return {keys:[{name:'client:SYN-forbidden-extra-IO'}],list_complete:true};
  };
  kv.delete=async key=>{
   state.deletes++;state.trace.push({kind:'delete',at:Date.now(),scope:key.startsWith('token:')?'token':key.startsWith('grant:')?'grant':'foreign'});
   const actual=Reflect.apply(del,kv,[key]),value=await actual;
   if(mode==='inventory-drift'&&!state.held){
    state.held=true;state.heldAt=Date.now();state.trace.push({kind:'actual-native-delete-settled-brief-ACK-held',at:state.heldAt});
    await new Promise((resolve,reject)=>{const tick=()=>{if(state.released)return resolve();if(Date.now()-state.heldAt>=3500)return reject(Error('SYN brief hold release premise missed'));setTimeout(tick,25);};tick();});
    state.settled=true;state.settledAt=Date.now();state.trace.push({kind:'brief-ACK-released',at:state.settledAt});
   }
   if(mode==='held-sdk-delete'&&!state.held){
    state.held=true;state.trace.push({kind:'actual-native-delete-settled-ACK-held',at:Date.now()});
    await new Promise(resolve=>{this.releaseCleanupHeld=resolve;});state.settled=true;state.trace.push({kind:'held-ACK-released',at:Date.now()});
   }return value;
  };
 }
 // Explicit fixture entry reentry; not an additional scheduler delivery or authority.
 async ownerCleanupReenter(){return super.alarm();}
 async ownerCleanupReset(){this.ownerCleanupFaultRestore?.();}
 async ownerCleanupControl(){this.cleanupFaultState.released=true;this.releaseCleanupHeld?.();this.releaseCleanupHeld=null;}
 async ownerCleanupFaultSignal(){const s=this.cleanupFaultState;return s?{mode:s.mode,held:s.held,settled:s.settled,deletes:s.deletes,lists:s.lists,sqlWrites:s.sqlWrites,reconciles:s.reconciles}:null;}
 async ownerCleanupFaultFacts(){return this.cleanupFaultState??null;}
 async ownerCleanupScopeProbe(){
  const controller=new AbortController(),at=Date.now(),lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()-at>=5000)throw Error('SYN probe lifetime');}});
  try{await observeFiniteReadOnlyWork({ctx:this.ctx,env:this.env,originalLease:lease},async()=>true);return {available:true,at};}
  catch{return {available:false,at};}finally{controller.abort();}
 }
 async ownerCleanupNativeRows(){
  const rows=await this.ctx.storage.list({prefix:'afw.finite-preparation-issuer.v1:',limit:16}),reservation=[...rows].find(([k])=>k.endsWith(':reservation'));
  if(!reservation)return {fence:null,grant:null,notices:[]};
  const i=JSON.parse(reservation[1]).identity,db=this.env.RELEASE_DB;
  return {fence:await db.prepare('SELECT * FROM finite_preparation_issuer_fences WHERE preconnection_id=?').bind(i.preconnectionId).first(),grant:await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first(),notices:(await db.prepare('SELECT * FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence').bind(i.grantId).all()).results};
 }

 async alarm(){
  const signal=this.cleanupAlarmSignal??={entered:0,settled:0,status:null,at:null,finishedAt:null};
  signal.entered++;signal.at=Date.now();
  try{const result=await super.alarm();signal.status=result?.status??null;return result;}
  finally{signal.settled++;signal.finishedAt=Date.now();}
 }
 async ownerCleanupSignal(){return this.cleanupAlarmSignal??{entered:0,settled:0,status:null,at:null,finishedAt:null};}
 async ownerCleanupFacts(){
  const dbNow=await this.env.RELEASE_DB.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS now").first();
  return {dbNow:dbNow.now,wall:Date.now(),alarm:await this.ctx.storage.getAlarm(),rows:[...await this.ctx.storage.list()],signal:await this.ownerCleanupSignal(),failures:globalThis.__r2CleanupFailures??[],children:globalThis.__r2CleanupChildren??[],finalInventoryProof:globalThis.__r2FinalInventoryProof??null};
 }
 `;
 const marker=' export class Initial extends FiniteClosure{';assert.equal(entry.split(marker).length,2);
 const original='actual=super.fetch(request);';assert.equal(entry.split(original).length,2);
 return ("import {observeFiniteReadOnlyWork} from './lib/mcp-qa-finite-stage-work.mjs';\n"+entry).replace(marker,()=>marker+methods+cleanupMethods).replace(original,()=>'actual=this.ownerReferenceFetch(request,r=>super.fetch(r));');
}
export function instrumentFiniteOwnerCleanup(source){
 const marker="actualResult=await wait(actualPromise);settled=true;position='sdk-resolved';await recheckOwned();";assert.equal(source.split(marker).length,2);
 source=source.replace(marker,()=>marker+"if(op==='sdk_complete'&&globalThis.__r1ReferenceState){globalThis.__r1ReferenceState.completeNormal++;globalThis.__r1ReferenceState.trace.push('actual-sdk-complete-normal');}");
 const lookup="const summary=await withChild(l=>readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l));";
 if(source.includes(lookup)){assert.equal(source.split(lookup).length,2);source=source.replace(lookup,()=>"const summary=await withChild(async l=>{const state=globalThis.__r1ReferenceState,at=performance.now(),metric={budgetMs:5000};if(state)state.lookupChild=metric;try{return await readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l);}finally{metric.actualElapsedMs=performance.now()-at;metric.aborted=l.signal.aborted;}});");}
 const child="const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});";
 assert.equal(source.split(child).length,2);source=source.replace(child,()=>"const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const state=globalThis.__r1ReferenceState,at=performance.now(),metric={position,startedAt:Date.now(),deadline:until,steps:[]};if(state){state.children.push(metric);state.activeMetric=metric;}try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{metric.endPosition=position;metric.actualElapsedMs=performance.now()-at;metric.aborted=l.signal.aborted;if(state)state.activeMetric=null;activeChild=null;}});");
 for(const marker of ["async function issuerCall(op,window,call){","async function localPreparation(kind,record,call,readBack,rowName,inventorySuffix=null){"]){assert.equal(source.split(marker).length,2);const name=marker.includes('issuerCall')?'op':'kind';source=source.replace(marker,()=>marker+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:"+name+",at:performance.now()});");}
 const pair="(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});";assert.equal(source.split(pair).length,2);
 source=source.replace(pair,()=>pair+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:'source-pair',elapsedMs:performance.now()-observedAt,at:performance.now()});");
 const io="const io={kind:'observer',method:'GET',bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};";assert.equal(source.split(io).length,2);source=source.replace(io,()=>io+"io.enteredAt=performance.now();io.childStartedAt=globalThis.__r1ReferenceState?.activeMetric?.startedAt??null;");
 const guard="io.reads++;io.bytes+=part.value?.byteLength??0;current(l);";assert.equal(source.split(guard).length,2);source=source.replace(guard,()=>"io.reads++;io.bytes+=part.value?.byteLength??0;const guardAt=performance.now();try{current(l);}finally{io.bodyGuardMs=(io.bodyGuardMs??0)+performance.now()-guardAt;}");
 const settled="io.settled=true;}";assert.equal(source.split(settled).length,2);source=source.replace(settled,()=>"io.elapsedMs=performance.now()-io.enteredAt;io.settled=true;}");
 return source;
}
export async function ownerReferenceFixture(t,{cleanupCheckpoint=false,budgetQualification=false}={}){
 const f=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint,budgetQualification});f.cleanupQualification=cleanupCheckpoint;
 t.after(async()=>{try{await f.stub.ownerReferenceControl('released').catch(()=>{});await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}finally{try{if(f.captureBudgetEpoch)await f.captureBudgetEpoch('before-fixture-dispose');}finally{try{await f.mf.dispose();}finally{await f.cleanup();}}}});
 await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await f.mountFirstConnection();await f.stub.firstConnectionConfigure('normal');
 const initial=f.firstConnectionBuild.M;assert.equal(initial.sha256,f.resident.module.sha256);assert(initial.inputs.includes('worker/mcp-own/finite.mjs'));
 const connected=await approveFirstConnection(f);assert.equal(connected.status,200);await connected.body?.cancel();const probe=await readFirstConnectionProbe(f),receipt=JSON.parse(probe.rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt'))[1]);assert.equal(receipt.moduleHash,initial.sha256);
 const closed=f.providerRegistry.versions[receipt.baselineVersionId],installed=f.providerRegistry.versions[receipt.versionId];assert.equal(installed.modules[0].content_base64,closed.modules[0].content_base64,'initial and connection share actual current bytes');
 await f.adoptConnectionConfiguration({upstream:true});const context=await plain(f.stub.firstConnectionContext());assert.equal(context.source?.phase,'read_consent');f.source=context.source;
 f.kv=await f.mf.getKVNamespace('OAUTH_KV','canary-first-connection');await f.kv.put('client:'+f.source.clientId,JSON.stringify({clientId:f.source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN reference client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));return f;
}
export async function prepareOwnerReference(f,fault='normal'){
 await f.stub.ownerReferenceConfigure(fault);const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':f.cleanupOriginalIdentityToken??await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
 const screen=await f.call('/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-reference-state',code_challenge:challenge,code_challenge_method:'S256'}),{redirect:'manual',headers});
 assert.equal(screen.status,200);const text=await screen.text(),handle=/name="handle" value="([^"]+)"/.exec(text)?.[1],cookie=screen.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
 const issue=()=>f.call('/authorize',{method:'POST',redirect:'manual',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});return {issue,headers,verifier};
}
export async function assertActualComplete(f,{reference=false}={}){
 const observed=await plain(f.stub.ownerReferenceObserve()),rows=observed.rows;
 assert.equal(observed.completeWrites,1,'one actual SDK grant effect');assert.equal(observed.completeNormal,1,'actual SDK complete fulfilled normally');assert(rows.some(([k])=>k.endsWith(':sdk_complete:observed')),'actual complete observation durable');
 const ref=rows.find(([k])=>k.endsWith(':reference'));if(reference)assert(ref,'R1 missing durable SDK Reference AFTER actual completeAuthorization');return {observed,reference:ref?JSON.parse(ref[1]):null};
}
export async function recordOwnerReference(f,label,extra={}){
 const o=await plain(f.stub.ownerReferenceObserve()),state=await plain(f.stub.firstConnectionState());
 assert(o.lists<=2&&o.gets<=200&&o.peak<=2,'native KV calls stay within fixed budget');
 const result={label,testRevision:process.env.GITHUB_SHA??null,M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes},completeWrites:o.completeWrites,completeNormal:o.completeNormal,referenceRows:o.rows.filter(([k])=>k.endsWith(':reference')).length,lists:o.lists,gets:o.gets,peak:o.peak,listLimit:o.nativeListLimit??null,trace:o.trace,requests:o.requests,children:o.children,lookupChild:o.lookupChild??null,referenceReadbacks:o.referenceReadbacks,sdkSuffixes:o.rows.map(([key])=>key.split(':').slice(2).join(':')),roots:(await plain(f.stub.firstConnectionProbe())).calls.map(c=>({method:c.originalMethod,windowMs:c.boundary.deadline-c.boundary.startedAt})),httpSpans:state.http.filter(v=>Number.isSafeInteger(v.childStartedAt)).map(v=>({kind:v.kind,bytes:v.bytes,elapsedMs:v.elapsedMs,bodyGuardMs:v.bodyGuardMs??0,childStartedAt:v.childStartedAt})),http:state.http.reduce((a,v)=>({requests:a.requests+1,bytes:a.bytes+v.bytes}),{requests:0,bytes:0}),completePackage:false,operationalReadiness:false,PCoff:false,custodyReal:false,...extra};
 if(f.captureBudgetEpoch)result.diagnostics={purpose:'afw.finite-budget-diagnostics.syn.v1',testRevision:process.env.GITHUB_SHA,epochs:await f.captureBudgetEpoch('owner-reference-record')};
 const evidence=await persistBudgetEvidence({path:'output/owner-reference/'+label+'.json',full:result,testRevision:process.env.GITHUB_SHA??null,caseName:label,counts:{}});console.info('R1 sanitized native marker',evidence.summary);return result;
}
export async function downstreamOwnerReference(f,response,prepared,{cleanupPartial=false}={}){
 const code=new URL(response.headers.get('Location')).searchParams.get('code');assert(code);await response.body?.cancel();
 if(f.cleanupQualification){
  const rows=await plain(f.stub.ownerReferenceObserve()),ref=JSON.parse(rows.rows.find(([k])=>k.endsWith(':reference'))[1]),native=await plain(f.stub.ownerCleanupNativeRows()),key='grant:'+native.grant.user_id+':'+ref.sdkGrantId;
  const raw=JSON.parse(await f.kv.get(key)),listed=await f.kv.list({prefix:key,limit:1});assert.equal(listed.keys[0]?.name,key);assert(Number.isSafeInteger(listed.keys[0].expiration));assert.equal(raw.expiresAt,undefined);
  f.sdkBeforeExchange={referenceHash:ref.recordHash,grantExpiresAt:null,nativeKVExpiration:listed.keys[0].expiration,createdAt:raw.createdAt,observedAt:Date.now()};
 }
 const tokenResponse=await f.call('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code,code_verifier:prepared.verifier})});assert.equal(tokenResponse.status,200);const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');f.cleanupToken=token;
 if(f.cleanupQualification)f.sdkAfterExchange=await observeCleanupSdkExchange(f,token);
 const client=new Client({name:'SYN-owner-reference',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
 try{await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(O).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));const result=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(result.isError,undefined);assert.equal(result.structuredContent.data.id,f.source.project.projectId);}finally{await client.close();}
 const screen=await f.call('/monitoring',{headers:prepared.headers});assert.equal(screen.status,200);const html=await screen.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1],cookie=screen.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
 if(cleanupPartial)await f.stub.ownerCleanupFault('notice-before-link');
 const posted=await f.call('/monitoring/grant',{method:'POST',headers:{...prepared.headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+cookie},body:new URLSearchParams({handle})});if(cleanupPartial)assert.notEqual(posted.status,200);else assert.equal(posted.status,200);await posted.body?.cancel();
 const rows=await plain(f.stub.snapshot()),root=JSON.parse(rows.find(([key])=>key.endsWith(':root')&&key.startsWith('afw.finite-owner-issuer-provenance.v1:'))[1]);assert.equal(rows.some(([k])=>k==='connection-preparation:'+root.preconnectionId+':notice'),!cleanupPartial);
}
export async function waitReferenceState(f,predicate){
 const until=performance.now()+30000;for(;;){let v=await plain(f.stub.ownerReferenceObserve(true));if(predicate(v))return v;if(performance.now()>=until){v=await plain(f.stub.ownerReferenceObserve());const data={purpose:'afw.owner-reference-timeout-diagnostic.syn.v1',mode:v.mode,completeWrites:v.completeWrites,completeNormal:v.completeNormal,held:v.held,actualSettled:v.actualSettled,referenceCommits:v.referenceCommits,referenceSyncs:v.referenceSyncs,referenceReadbacks:v.referenceReadbacks,requests:v.requests,lookupChild:v.lookupChild??null,children:v.children,sdkSuffixes:v.rows.map(([key])=>key.split(':').slice(2).join(':')),lists:v.lists,gets:v.gets,peak:v.peak,trace:v.trace,operationalReadiness:false,completePackage:false,PCoff:false};await mkdir('output/owner-reference',{recursive:true});await writeFile('output/owner-reference/diagnostic-timeout-'+v.mode+'.json',JSON.stringify(data,null,2));console.info('R1 DIAGNOSTIC last collected state',JSON.stringify({...data,children:data.children?.map(c=>({ms:c.actualElapsedMs??null,aborted:c.aborted??null,operations:c.steps.filter(s=>s.operation!=='source-pair').map(s=>s.operation),sourcePairs:c.steps.filter(s=>s.operation==='source-pair').map(s=>s.elapsedMs)}))}));assert.fail('bounded native marker wait');}await new Promise(resolve=>setTimeout(resolve,20));}
}
export function syntheticSdkReferenceComponent(){
 const h=x=>x.repeat(64),I0=1800000000000,C0=I0+900000,C1=C0+180000,qa='11111111-1111-4111-8111-111111111111';
 const identity=issuerSeal('Identity',{preconnectionId:h('1'),enrollmentHash:h('2'),capsuleHash:h('3'),sourceRevision:'a'.repeat(40),qaVersionId:qa,actorId:h('4'),subject:'SYN-component-owner',accessRealmHash:h('5'),projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:O+'/mcp',authorizationHash:h('6'),grantId:'22222222-2222-4222-8222-222222222222',requestedScopes:['afw:project:read'],consentExpiresAt:new Date(C0).toISOString(),I0,C0,C1,reservedAt:I0+10});
 const root=seal('Root',{purpose:'afw.finite-owner-issuer-root.v1',preconnectionId:identity.preconnectionId,capsuleHash:identity.capsuleHash,enrollmentHash:identity.enrollmentHash,sourceRevision:identity.sourceRevision,actorId:identity.actorId,qaVersionId:qa,mVersionId:qa,originalConnectionReceiptHash:h('7'),I0,C0,C1,createdAt:I0});
 const makeSend=(operation,bindingHash,at)=>seal('SdkSend',{purpose:'afw.finite-owner-sdk-send.v1',rootHash:root.recordHash,operation,originalRequestId:qa,originalRequestHash:'9'.repeat(64),issuedAt:at,deadline:at+5000,bindingHash});
 const makeObserved=(send,at)=>seal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:h('9'),observedAt:at,outcome:'resolved'});
 const begin=makeSend('sdk_begin',h('9'),I0+1),beginObserved=makeObserved(begin,I0+2),approve=makeSend('sdk_approve',identity.authorizationHash,I0+20),approveObserved=makeObserved(approve,I0+21);
 const expectedGrant=seal('ExpectedGrant',{purpose:'afw.finite-owner-expected-grant.v1',rootHash:root.recordHash,identityHash:identity.identityHash,reservationHash:h('a'),authorizationHash:identity.authorizationHash,grantId:identity.grantId,approvedRequestHash:approveObserved.resultHash,scopes:identity.requestedScopes,createdAt:new Date(I0+22).toISOString(),expiresAt:new Date(C0).toISOString()});
 const completeSend=makeSend('sdk_complete',expectedGrant.recordHash,I0+23),completeObserved=makeObserved(completeSend,I0+24);return {identity,root,expectedGrant,completeSend,completeObserved,begin,beginObserved,approve,approveObserved};
}

// Explicit component program only: no producer/SDK/native-admission claim.
const monitoringCleanupComponent="\nimport {DurableObject} from 'cloudflare:workers';\nimport {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA,FINITE_PREPARATION_MONITORING_SCHEMA} from './lib/mcp-qa-finite-preparation-issuer-store.mjs';\nimport {sealFinitePreparationIssuerRecord as seal} from './lib/mcp-qa-finite-preparation-issuer-records.mjs';\nimport {sealFiniteOwnerCleanupRecord as cleanSeal} from './lib/mcp-qa-finite-owner-cleanup-records.mjs';\nimport {createFiniteOwnerCleanupJournal} from './lib/mcp-qa-finite-owner-cleanup-journal.mjs';\nconst U='11111111-1111-4111-8111-111111111111',F='22222222-2222-4222-8222-222222222222',R='33333333-3333-4333-8333-333333333333',H='a'.repeat(64);\nexport class MonitoringCleanup extends DurableObject {\n async fetch(request){\n  const {mode}=await request.json();if(!['normal','prior','revision','sequence','C1','window','unknown'].includes(mode))throw Error('SYN fixed mode');\n  const db=this.env.RELEASE_DB,exec=(sql,...v)=>db.prepare(sql).bind(...v).run(),events=[];\n  await exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER)');\n  await exec(\"CREATE TABLE delegated_consent_sessions(handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT)\");\n  await exec(\"CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT,exchanged_at TEXT)\");\n  for(const sql of [...FINITE_PREPARATION_ISSUER_SCHEMA,...FINITE_PREPARATION_MONITORING_SCHEMA])await exec(sql);\n  const at=(await db.prepare(\"SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms\").first()).ms,C1=mode==='C1'?at+1000:at+179900,C0=C1-180000,I0=C0-900000,reservedAt=I0+10;\n  const identity=seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read'],consentExpiresAt:new Date(C0).toISOString(),I0,C0,C1,reservedAt});\n  const grant={scopes:identity.requestedScopes,createdAt:new Date(reservedAt+20).toISOString(),expiresAt:new Date(C0).toISOString()};\n  await exec('INSERT INTO site_projects VALUES (?,?,1)',identity.projectId,identity.subject);\n  await exec(\"INSERT INTO delegated_consent_sessions VALUES (?,?,'authorize',?,?,?,?,?,?)\",identity.authorizationHash,identity.subject,identity.projectId,identity.clientId,identity.resource,JSON.stringify(identity.requestedScopes),identity.consentExpiresAt,grant.createdAt);\n  await exec(\"INSERT INTO delegated_access_grants VALUES (?,?,?,?,?,?,?,?,?,?)\",U,identity.subject,identity.clientId,identity.projectId,identity.resource,JSON.stringify(grant.scopes),grant.createdAt,grant.expiresAt,new Date(at-1).toISOString(),'');\n  const eventTime=C0-1000;\n  const eventSql=\"INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,1,?,'afw.dossier-monitoring.v1',?,?,?)\";\n  await exec(eventSql,'SYN-unrelated',identity.projectId,identity.subject,identity.clientId,identity.resource,'grant',U,eventTime,C0);\n  await exec(eventSql,U,identity.projectId,identity.subject,identity.clientId,identity.resource,'grant',F,eventTime,C0);\n  const consent=await db.prepare(\"SELECT * FROM dossier_monitoring_consent_events WHERE grant_id=?\").bind(U).first();\n  if(mode==='prior')await exec(eventSql,U,identity.projectId,identity.subject,identity.clientId,identity.resource,'revoke',U,at-1,at-1);\n  const before=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;\n  let sid=0,armed=false,writes=0;\n  const wrapper={withSession(type){const n=++sid,session=db.withSession(type);return {prepare(sql){events.push({sid:n,type,sql});const stmt=session.prepare(sql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{\n   if(armed&&sql.includes('INSERT INTO dossier_monitoring_consent_events')){\n    writes++;if(mode==='C1'||mode==='window')await new Promise(resolve=>setTimeout(resolve,mode==='C1'?1200:350));\n    const value=await bound[method]();if(mode==='unknown')throw Error('SYN actual revoke committed ACK lost');return value;\n   }return bound[method]();\n  };return {first:call('first'),all:call('all'),run:call('run')};}};}};}};\n  const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()>=at+30000)throw Error('SYN original component lifetime');}});\n  const options={ctx:{storage:this.ctx.storage,id:this.ctx.id},env:{RELEASE_DB:wrapper,AFW_QA_VERSION:{id:U},AFW_INDEPENDENT_CLOSURE:this.env.FIXTURE}};\n  const store=createFinitePreparationIssuerStore(options),window=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,C1)});\n  const barrier=await store.closeFence({identity,fenceRequestId:R,window:window()},lease);\n  if(mode==='revision')await exec('UPDATE site_projects SET revision=2 WHERE id=?',identity.projectId);\n  const ci=cleanSeal('Identity',{purpose:'afw.finite-owner-cleanup-identity.v1',planHash:H,capsuleHash:H,enrollmentHash:H,preconnectionId:H,sourceRevision:identity.sourceRevision,qaVersionId:U,actorId:identity.actorId,I0,C0,C1});\n  const journal=createFiniteOwnerCleanupJournal(options);await journal.appendIdentity(ci,lease);\n  const w=window();if(mode==='window')w.deadline=w.startedAt+200;\n  const send=cleanSeal('Send',{purpose:'afw.finite-owner-cleanup-send.v1',identityHash:ci.recordHash,operation:'monitoring_revoke',requestId:R,requestHash:H,issuedAt:w.startedAt,deadline:w.deadline});\n  await journal.appendSend({preconnectionId:H,record:send},lease);\n  const args={identity,barrier,expectedGrant:grant,expectedConsent:mode==='sequence'?{...consent,sequence:consent.sequence+1}:consent,requestId:R,window:w};\n  armed=true;let result=null,rejected=false;\n  try{result=await store.insertMonitoringRevocation(args,lease);\n   if(['applied','already_withdrawn'].includes(result.status))await journal.appendObserved({preconnectionId:H,operation:'monitoring_revoke',record:cleanSeal('Observed',{purpose:'afw.finite-owner-cleanup-observed.v1',sendHash:send.recordHash,resultHash:H,outcome:result.status,observedAt:Date.now()})},lease);\n  }catch{rejected=true;}\n  let retryDenied=null;if(mode==='unknown'){try{await store.insertMonitoringRevocation(args,lease);retryDenied=false;}catch{retryDenied=true;}}\n  const after=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results,records=await journal.read({preconnectionId:H},lease);\n  const noUpdate=await exec('UPDATE dossier_monitoring_consent_events SET expires_at=expires_at').then(()=>false,()=>true),noDelete=await exec('DELETE FROM dossier_monitoring_consent_events').then(()=>false,()=>true);\n  controller.abort();return Response.json({label:'SYN component input; real D1 SQL clock and results',at,C0,C1,before,after,result,rejected,retryDenied,writes,events,send:records.operations.monitoring_revoke.send,observed:records.operations.monitoring_revoke.observed,noUpdate,noDelete});\n }\n}\nexport default {fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('afw-own-successor-closure-v1')).fetch(request);}};\n";
export async function monitoringCleanupScenario(t,mode){
 const built=await buildCleanupComponent({stdin:{contents:monitoringCleanupComponent,resolveDir:process.cwd(),sourcefile:'SYN-monitoring-cleanup-component.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'SYN-monitoring-cleanup'},durableObjects:{FIXTURE:{className:'MonitoringCleanup',useSQLite:true,uniqueKey:'SYN-monitoring-cleanup'}}}));
 t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({mode})});assert.equal(response.status,200);return response.json();
}

export function instrumentCleanupConsumer(source){
 const fail=/const fail=\(\)=>\{throw Error\('([^']+)'\);\};/;
 assert(fail.test(source),'fixed cleanup fail marker');
 source=source.replace(fail,(_,message)=>"const fail=()=>{const error=Error("+JSON.stringify(message)+");(globalThis.__r2CleanupFailures??=[]).push({at:Date.now(),frames:String(error.stack).split('\\n').slice(0,7)});throw error;};");
 const child="async function child(work){";
 if(source.includes(child)){
  assert.equal(source.split(child).length,2);source=source.replace(child,child+"const childAt=Date.now(),childMono=performance.now();");
  const end="try{return await clock.wait(actual);}finally{originalLease.signal.removeEventListener('abort',stop);clock.close();}";
  assert.equal(source.split(end).length,2);source=source.replace(end,"try{return await clock.wait(actual);}finally{(globalThis.__r2CleanupChildren??=[]).push({startedAt:childAt,elapsedMs:performance.now()-childMono,aborted:clock.lease.signal.aborted});originalLease.signal.removeEventListener('abort',stop);clock.close();}");
 }
 const finalDigest="digest('afw.finite-owner-cleanup-final-facts.v1',";
 if(source.includes(finalDigest)){
  assert.equal(source.split(finalDigest).length,2);
  source=source.replace(finalDigest,"observeFinalInventoryDigest('afw.finite-owner-cleanup-final-facts.v1',");
  source+="\nfunction observeFinalInventoryDigest(domain,value){const committedHash=digest(domain,value),i=value.inventory;globalThis.__r2FinalInventoryProof={committedHash,inventoryHash:digest('SYN.final-inventory-proof.v1',i),enteredAt:i.enteredAt,observedAt:i.observedAt,workflow:i.workflow,container:i.container,schedulesAndTails:i.schedulesAndTails,operator:i.operator,baseline:i.baseline,sourceRevision:i.bootstrap.sourceRevision,sourceTree:i.bootstrap.sourceTree,requestTimes:i.requests.map(r=>({providerDate:r.providerDate,observedAt:r.observedAt}))};return committedHash;}\n";
 }
 return source;
}

/** Dated native facts after the real code exchange; never replaces the pre-302 Reference. */
export async function observeCleanupSdkExchange(f,token){
 const o=await plain(f.stub.ownerReferenceObserve()),referenceRaw=o.rows.find(([k])=>k.endsWith(':reference'))?.[1];assert(referenceRaw);
 const ref=JSON.parse(referenceRaw),native=await plain(f.stub.ownerCleanupNativeRows());assert(native.grant);
 const key='grant:'+native.grant.user_id+':'+ref.sdkGrantId,raw=await f.kv.get(key);assert.equal(typeof raw,'string');const grant=JSON.parse(raw);
 assert.equal(grant.id,ref.sdkGrantId);assert.equal(grant.userId,native.grant.user_id);assert.equal(grant.clientId,f.source.clientId);
 assert.equal(grant.metadata.afwFiniteCleanup.correlationHash,ref.correlationHash);assert(Number.isSafeInteger(grant.expiresAt));
 const rows=await plain(f.stub.snapshot()),plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);
 if(!f.cleanupSdkOnly)assert(grant.expiresAt*1000<=plan.C0,'actual post-exchange SDK expiry must not exceed original C0');
 assert.equal(token.refresh_token,undefined,'M refresh remains disabled');assert(Number.isSafeInteger(token.expires_in)&&token.expires_in>=60&&token.expires_in<=300);
 const hash=v=>createHash('sha256').update(v).digest('hex');
 const tokenId=hash(token.access_token),tokenRaw=await f.kv.get('token:'+grant.userId+':'+grant.id+':'+tokenId);assert.equal(typeof tokenRaw,'string');const nativeToken=JSON.parse(tokenRaw);
 assert.equal(nativeToken.grantId,grant.id);assert.equal(nativeToken.userId,grant.userId);
 assert.equal((await plain(f.stub.ownerReferenceObserve())).rows.find(([k])=>k.endsWith(':reference'))[1],referenceRaw,'historical Reference bytes unchanged');
 return {purpose:'afw.post-exchange-sdk-fact.syn.v1',referenceHash:ref.recordHash,referenceRawHash:hash(referenceRaw),referenceExpiresAt:ref.expiresAt,selectorHash:hash(ref.sdkGrantId),subjectHash:hash(grant.userId),clientHash:hash(grant.clientId),correlationHash:ref.correlationHash,metadataHash:hash(JSON.stringify(grant.metadata)),createdAt:grant.createdAt,expiresAt:grant.expiresAt,tokenExpiresAt:nativeToken.expiresAt,tokenHash:hash(token.access_token),advertisedExpiresIn:token.expires_in,D1ExpiresAt:Date.parse(native.grant.expires_at),observedAt:Date.now(),I0:plan.I0,C0:plan.C0,C1:plan.C1,operationalReadiness:false};
}
/** Fixed SYN ingress to the ordinary compiled M; routing is not AFW authority. */
export function cleanupMTransport(mf,{currentMountedOptions,expectedModuleHash}){
 const m=currentMountedOptions.workers.find(w=>w.name==='canary-first-connection');
 assert(m);assert.equal(currentMountedOptions.upstream,O);assert.equal(createHash('sha256').update(m.script).digest('hex'),expectedModuleHash);
 assert.equal(m.kvNamespaces.OAUTH_KV,'first-connection-oauth');assert.equal(m.bindings.AFW_DELEGATED_OAUTH_ENABLED,'true');assert.equal(m.bindings.AFW_OAUTH_REFRESH_ENABLED,'false');
 const identity={worker:'canary-first-connection',path:'/mcp',scriptHash:expectedModuleHash,namespaceId:'first-connection-oauth'},profile=cleanupMProfile(m,currentMountedOptions.upstream),profileHash=cleanupHash(JSON.stringify(profile));
 const assertProfileCurrent=()=>assert.equal(cleanupHash(JSON.stringify(cleanupMProfile(m,currentMountedOptions.upstream))),profileHash,'original M script/config/namespace unchanged');
 return Object.freeze({...identity,profile:Object.freeze(profile),assertProfileCurrent,fetch(input,init={}){
  assertProfileCurrent();
  assert(typeof input==='string'||input instanceof URL,'fixed SYN URL input');const url=new URL(String(input));assert.equal(url.href,O+'/mcp','fixed ordinary M origin/path only');
  const headers=new Headers(init.headers);headers.set('Host',new URL(O).host);headers.set('MF-Route-Override',identity.worker);
  return mf.dispatchFetch(url.href,{...init,headers});
 }});
}
export async function readCleanupM(worker,token,projectId){
 assert.equal(worker.worker,'canary-first-connection');assert.equal(worker.path,'/mcp');assert.match(worker.scriptHash,/^[a-f0-9]{64}$/);assert.equal(worker.namespaceId,'first-connection-oauth');
 const requests=[],client=new Client({name:'SYN-named-M-control',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
 try{
  await client.connect(new StreamableHTTPClientTransport(new URL(O+'/mcp'),{requestInit:{headers:{Authorization:'Bearer '+token,Host:new URL(O).host}},fetch:async(url,options)=>{const response=await worker.fetch(String(url),options);requests.push({method:options?.method??'GET',status:response.status});return response;}}));
  const result=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(result.isError,undefined);assert.equal(result.structuredContent.data.id,projectId);
  return {worker:worker.worker,path:worker.path,scriptHash:worker.scriptHash,namespaceId:worker.namespaceId,profile:worker.profile,at:Date.now(),requests,projectHash:createHash('sha256').update(projectId).digest('hex'),dataRead:true};
 }finally{await client.close();}
}

const cleanupMHash='c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32';
const cleanupMFlags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
const cleanupHash=value=>createHash('sha256').update(value).digest('hex');
export function cleanupMProfile(m,upstream){
 return {worker:m.name,path:'/mcp',scriptHash:cleanupHash(m.script),optionsHash:cleanupHash(JSON.stringify(m)),bindingsHash:cleanupHash(JSON.stringify(m.bindings)),namespaceId:m.kvNamespaces.OAUTH_KV,upstream,issuer:m.bindings.AFW_OAUTH_ISSUER,resource:m.bindings.AFW_OAUTH_RESOURCE,serviceMode:m.bindings.AFW_OAUTH_SERVICE_MODE,serviceExpiresAt:m.bindings.AFW_OAUTH_PILOT_EXPIRES_AT,flags:Object.fromEntries(Object.entries(m.bindings).filter(([k])=>k.endsWith('_ENABLED'))),guardBlob:'d979f395029c9b1e66a99222d06acf99eba4f358'};
}
function qualifiedCleanupMProfile(p,C0){
 return p?.worker==='canary-first-connection'&&p.path==='/mcp'&&p.scriptHash===cleanupMHash&&p.namespaceId==='first-connection-oauth'&&p.upstream===O&&p.issuer===O&&p.resource===O+'/mcp'&&p.serviceMode==='window'&&p.serviceExpiresAt===new Date(C0).toISOString()&&p.guardBlob==='d979f395029c9b1e66a99222d06acf99eba4f358'&&/^[a-f0-9]{64}$/.test(p.optionsHash)&&/^[a-f0-9]{64}$/.test(p.bindingsHash)&&JSON.stringify(Object.keys(p.flags??{}).sort())===JSON.stringify([...cleanupMFlags].sort())&&cleanupMFlags.every(k=>p.flags[k]===(k==='AFW_DELEGATED_OAUTH_ENABLED'?'true':'false'));
}
/** Interpretation only; fixture data cannot authorize or alter a worker. */
export function classifyCleanupMDenial(observation){
 const no={dataDenied:false,layer:'unproved',reason:'denial contract not established'},o=observation;
 if(!Number.isSafeInteger(o?.originalC0)||o.originalC0<1||o.originalC0>8640000000000000||!qualifiedCleanupMProfile(o.profile,o.originalC0)||o.profileCurrent!==true||o.operation!=='read_project_summary'||!Array.isArray(o.responses)||o.responses.some(r=>r.containsExpectedData||r.containsCredential||r.readFailed))return no;
 const rpc=o.responses.filter(r=>r.rpcMethod==='initialize'||r.rpcMethod==='tools/call'&&r.tool==='read_project_summary'),r=rpc.at(-1);
 if(!r||r.method!=='POST'||!Number.isSafeInteger(r.startedAt)||!Number.isSafeInteger(r.finishedAt)||r.finishedAt<r.startedAt||!Number.isSafeInteger(r.status)||!/^[a-f0-9]{64}$/.test(r.bodyHash))return no;
 if(r.status===404&&r.startedAt>=o.originalC0&&r.bodyKind==='html'&&r.closedWindowBody===true)
  return {dataDenied:true,layer:'service_window_closed',reason:'unchanged original M window expired before request',branch:'delegated-oauth-worker.mjs:143-158 -> connectionWindowNotice:29-30',D1DenialProved:false};
 if(r.startedAt>=o.originalC0)return no; // This fixed original window must close before SDK/MCP at C0.
 const challenge=r.oauthChallenge;
 if(r.status===401&&challenge?.bearer===true&&challenge.error==='invalid_token'&&challenge.metadata===O+'/.well-known/oauth-protected-resource/mcp'&&(r.bodyKind==='empty'||r.oauthError==='invalid_token'))
  return {dataDenied:true,layer:'sdk_token_rejection',reason:'native OAuth invalid_token challenge',D1DenialProved:false};
 if(r.status===403&&challenge?.bearer===true&&challenge.error==='insufficient_scope'&&challenge.metadata===O+'/.well-known/oauth-protected-resource/mcp'&&r.oauthError==='insufficient_scope')
  return {dataDenied:true,layer:'sdk_scope_rejection',reason:'native OAuth insufficient_scope challenge',D1DenialProved:false};
 const result=o.toolResult;
 if(r.rpcMethod==='tools/call'&&r.tool==='read_project_summary'&&r.status===200&&r.bodyKind==='json'&&r.jsonRpc?.version==='2.0'&&r.jsonRpc.kind==='result'&&result?.isError===true&&result.status===403&&result.code==='delegated_access_denied'&&result.hasData===false&&JSON.stringify(r.jsonRpc.result)===JSON.stringify(result))
  return {dataDenied:true,layer:'business_grant_denied',reason:'read_project_summary returned delegated_access_denied',branch:'delegated-project-read.mjs:63-68 via delegated-project-mcp.mjs:46-57',D1DenialProved:true};
 return no;
}
function cleanupSafeToolResult(value){
 const s=value?.structuredContent;
 return {isError:value?.isError===true,status:Number.isInteger(s?.status)?s.status:null,code:typeof s?.code==='string'&&/^[a-z_]{1,80}$/.test(s.code)?s.code:null,hasData:!!value&&Object.hasOwn(value,'data')||!!s&&Object.hasOwn(s,'data')};
}
async function cleanupResponseFact(response,{request,startedAt,projectId,token}){
 const reader=response.clone().body?.getReader(),chunks=[];let bytes=0;
 if(reader)for(;;){const r=await reader.read();if(r.done)break;bytes+=r.value.length;if(bytes>131072){await reader.cancel();throw Error('SYN bounded M response exceeded');}chunks.push(Buffer.from(r.value));}
 const body=Buffer.concat(chunks).toString('utf8'),type=response.headers.get('Content-Type')??'';let parsed=null;try{parsed=JSON.parse(body);}catch{}
 const www=response.headers.get('WWW-Authenticate')??'',bearer=www.startsWith('Bearer '),error=/error="([^"]+)"/.exec(www)?.[1],metadata=/resource_metadata="([^"]+)"/.exec(www)?.[1],challenge={bearer,error:['invalid_token','insufficient_scope'].includes(error)?error:null,metadata:metadata===O+'/.well-known/oauth-protected-resource/mcp'?metadata:null};
 const jsonRpc=parsed?.jsonrpc==='2.0'?{version:'2.0',kind:Object.hasOwn(parsed,'result')?'result':Object.hasOwn(parsed,'error')?'error':'unknown',idType:typeof parsed.id,errorCode:Number.isInteger(parsed.error?.code)?parsed.error.code:null,result:parsed.result?cleanupSafeToolResult(parsed.result):null}:null;
 return {method:request.method,rpcMethod:request.rpcMethod,tool:request.tool,startedAt,finishedAt:Date.now(),status:response.status,contentType:type.split(';')[0],bodyKind:body===''?'empty':parsed?'json':type.startsWith('text/html')?'html':'text',bodyBytes:bytes,bodyHash:cleanupHash(body),oauthChallenge:challenge,oauthError:['invalid_token','insufficient_scope'].includes(parsed?.error)?parsed.error:null,jsonRpc,closedWindowBody:type.startsWith('text/html')&&body.includes('<h1>Te acompaño a revisar la conexión</h1>')&&body.includes('No pude completar esta conexión.')&&body.includes('No puedo confirmar la causa desde esta pantalla.'),containsExpectedData:body.includes(projectId),containsCredential:body.includes(token),readFailed:false};
}
/** Same real protocol as positive control. Preserve facts before the test asserts. */
export async function observeCleanupMDenial(worker,token,projectId,{C0}){
 const responses=[],observation={label:'SYN real ordinary M data denial observation',operation:'read_project_summary',originalC0:C0,profile:worker.profile,profileCurrent:false,responses,toolCallAttempted:false,toolResult:null,error:null};
 const client=new Client({name:'SYN-named-M-denial',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
 try{
  worker.assertProfileCurrent();
  await client.connect(new StreamableHTTPClientTransport(new URL(O+'/mcp'),{requestInit:{headers:{Authorization:'Bearer '+token,Host:new URL(O).host}},fetch:async(url,options={})=>{
   let rpc;try{rpc=JSON.parse(options.body);}catch{}
   const request={method:options.method??'GET',rpcMethod:rpc?.method??null,tool:rpc?.method==='tools/call'?rpc.params?.name??null:null},startedAt=Date.now();
   const response=await worker.fetch(String(url),{...options,signal:options.signal?AbortSignal.any([options.signal,AbortSignal.timeout(5000)]):AbortSignal.timeout(5000)});
   try{responses.push(await cleanupResponseFact(response,{request,startedAt,projectId,token}));}catch(error){responses.push({...request,startedAt,finishedAt:Date.now(),status:response.status,readFailed:true,errorType:error.name});throw error;}
   return response;
  }}));
  observation.toolCallAttempted=true;
  observation.toolResult=cleanupSafeToolResult(await client.callTool({name:'read_project_summary',arguments:{}}));
 }catch(error){observation.error={type:error.name,messageHash:cleanupHash(String(error.message))};}
 finally{try{await client.close();}catch(error){observation.closeError={type:error.name,messageHash:cleanupHash(String(error.message))};}
  try{worker.assertProfileCurrent();observation.profileCurrent=true;}catch{observation.profileCurrent=false;}}
 observation.classification=classifyCleanupMDenial(observation);return observation;
}
