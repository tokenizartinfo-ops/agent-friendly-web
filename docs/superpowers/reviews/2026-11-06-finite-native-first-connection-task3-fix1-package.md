# Task3 fix round1/5 scoped re-review package

Repository tokenizartinfo-ops/agent-friendly-web; branch feat/finite-native-cleanup-20261101.
FIX_BASE df20c0f8b8e2fc1b03cdd7e122302c5dc8a62f4e / treef7229e5c4c323b147120d001baa1183a874728da.
HEAD 9989b83d7a2935752d5cef335b6d63af9d1b6b51 / tree6c2bff8ff4c239944377c4250672178141088f77.
Qualified code checkout7ebe843a69a6434d11670de4cab5482a1c931799 / treeafc2a93653f91ee262f9df9f9e32aef07e044dcb.
Complete U10 fix diff (not HEAD~1),12commits,4netfiles. Controller generated in memory from pinned connector text, no local git/tests/build. Source stopped after complete finalhandoff.

## Finding under verification, verbatim

Required native publication chronology is not asserted. Native test:71 reads telemetry but only checks counters and HTTP settlement; line105 logs further measurements. The fixture records keyed transaction/sync/readback events and native results (fixture:238,256,272), but no T3 assertion checks their sequence. The implementation presently orders these operations correctly; nevertheless, the mandated test would not detect removal/reordering of an upload/activation SEND durability boundary merely from successful final rows. Add passive native-invocation markers and assert, per effect, SEND commit→sync→readback→invocation→result→ACK commit→sync→readback, plus receipt durability before success. Qualify the focused principal; the existing T1 enrollment chronology does not answer this new coordinator requirement.

## Scope and verified evidence

Root complete recursive comparison: ONLY T3/F1 and report/progress changed. F2 and ALL product paths identical FIX_BASE/D11; temporary qualifier absent. All seven HEAD+workingblobs before/after the qualification match actual7ebe; actual QA observer bundle is SYN instrumentation, positive M unchanged. This review is I1+new fix breakage only; no full-task re-review or reopening unrelated code. Original static callback exception, TDD chronology, composite167 and warnings/livefeasibility remain disclosed and challengeable in final wholebranch gate, not silently closed.

Root primary readback run42248678046/job127997568910:1exactprincipal PASS/0fail-cancel-skip-todo/exit0 (runner64546ms/native63789ms),lint2exit0/2637ms. Actualcheckout7ebe vsworkflowtriggerfc0c3b04110fb01adfae887eaf53b84dbeb1d069 distinguished. PositiveM c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/1988061B;QAe4861bf5d2af5248b651f440514a0ca3b5d131d892f0a0e40918ae4e7efb7d7b/2368172B;negativeMutation=null. Five DATA-copy assertion-discrimination checks are not injected native failures, not extra tests or historicalTDD. Existing167 product positives remain labelled D11, not this fixture HEAD.

Root read native proof: upload put22/commit25/sync27/completedROread33(tx11)/invoke69/headers70/result71/ACKput78/commit79/sync80/completedROread86(tx17); activation199/202/204/210(tx31)/246/247/248/255/256/257/263(tx37); receipt340/341/342/349(tx47)<actualQA200return415. Evaluate assertion code, not just these numbers.
Artifact13519737504,1225837B,digestf40e631bdeae57bf9cce4479cb74360d716c4a5b3dda2b2ac3a107b04f7de05e,expires13Nov16:04:21UTC; primary metadata/uploaddigest verified, no localZIP.

First qualification42247056350 at efb FAILED1test on expected directstorage.get readback. Corrected qualification is NOT blind rerun. Root+writer inspected protectedjournal6e3de33d: read116 uses transact(...false), transact26–35 andstate40–47 use tx.get in readonly native transaction. Ruling: require actual native readonlytransaction NORMAL FULFILLMENT aftersync/beforenextboundary, paired with exacthash reads/nativeTxnID; unfinished tx.get not sufficient. Preserve genuine directget support. No requirement relaxation, product changes, extra reads or expanded clocks. Cost if wrong: premature audit marker could launder a pending readback. First failed run had trace-write AFTERassert and thus no archived native-ordertrace; fixed trace capture BEFOREassert, and report says so. Review may challenge measurement correctness.

## Pinned report append

Report at HEAD: docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md, blob3f273f15451de3364dc2b36da628802b1c53a7f1. Fix appendix starts line614; exact covering command and output included there and in full diff below. Brief unchanged at BASEffe25a1e77a1d93d5c03018ada36355b19c91564.

## Commits

- f3fca20cb71b839735611bb25663cf257ecbd648 test: passively observe keyed native publication invocation and durability
- f3bf10200339e30865baa5199ad347a75c4ca6ae test: assert actual publication durability order before successful response
- efb92819f3cb7d977ac06c440bca27f1d927d920 test: retain native order proof and passive trace as scoped CI evidence
- 274a14f4b6026ffcd6da92c88b6922d5e2adf362 ci: qualify only Task3 fix1 native chronology principal and two-file lint
- d56f9fb9ce27bcd36229645bf3adc24b52acc429 ci: preserve failed chronology qualification before correcting native readback observation
- 1821d3a21f584d3f56a152e0ec5bb92a54c629da test: observe exact readback only after actual read-only native transaction fulfillment
- eb43d27ff8ec5ccbe160a8420080c11f68e9fd39 test: require completed keyed readback transaction and retain failure trace before assertions
- 7ebe843a69a6434d11670de4cab5482a1c931799 test: keep original observed get promise while capturing readback values
- fc0c3b04110fb01adfae887eaf53b84dbeb1d069 ci: qualify corrected completed native readback chronology and two-file lint
- ab96b2a1d22731eef3fb02f1615c2f276058dd0f ci: remove Task3 fix1 qualifier after focused native order verification
- fde91ba07881e4576429c52a19b39114f259e76f docs: append Task3 fix1 actual native chronology proof and scoped qualification
- 9989b83d7a2935752d5cef335b6d63af9d1b6b51 docs: record Task3 fix1 focused chronology evidence and pending re-review

## Complete changed blob map

- docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md: a1ae93956e0757a5dc9999ab2b738354dcc540ae -> dd1cd80434ae8c63ca4adb70a8d00b35674d26fe
- docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md: 99e3a4c1251bf3c88694afd71c61859b9dcf7f42 -> 3f273f15451de3364dc2b36da628802b1c53a7f1
- test/fixtures/finite-first-connection-publication.mjs: 2cda37157bc0d1c9622784c33aa3b0fd94dc0e48 -> 6a6950bbe7e956d3b7f19e1a04c5aa6f6ca7b379
- test/mcp-qa-finite-first-connection-publication-native.test.mjs: bc9f717d79e6e1ad60a40f358351093371331bee -> 1298bb5b67749df0d7ee20c863b691562e6a81b9

## Full fix diff

```diff
diff --git a/test/fixtures/finite-first-connection-publication.mjs b/test/fixtures/finite-first-connection-publication.mjs
--- a/test/fixtures/finite-first-connection-publication.mjs
+++ b/test/fixtures/finite-first-connection-publication.mjs
@@ -128,24 +128,27 @@
   // Literal actor is asserted in the product forwards, never selected by input.
   if(!finiteNativeActor)throw Error('SYN missing actor');
   return finite.fetch(request,prepared,ctx);
  }};
  `;
  const spyOptions={...options,stdin:{contents:source,resolveDir:process.cwd()},plugins:[{name:'negative-only-ordinary-spy',setup(b){b.onLoad({filter:/worker\/mcp-own\/index\.mjs$/},async args=>{const text=await readFile(args.path,'utf8'),needle='const worker={fetch(request,env,ctx){';assert.equal(text.split(needle).length,2);return {contents:text.replace(needle,needle+'globalThis.__firstConnectionOrdinary++;'),loader:'js'};});}}]};
  const spy=await build(spyOptions),wrong=negativeProfile?await build({...spyOptions,define:{...define,'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('ordinary')}}):null;
  return {script:m.outputFiles[0].text,bytes,program:node.program,resident,metafile:m.metafile,spyScript:spy.outputFiles[0].text,spyHash:digest(spy.outputFiles[0].contents),wrongProfileScript:wrong?.outputFiles[0].text??null,wrongProfileHash:wrong?digest(wrong.outputFiles[0].contents):null};
 }
 export function extendFirstConnectionPublication(entry){
- return "import {createFinitePolicyEffectJournal as firstJournal} from './lib/mcp-qa-finite-policy-journal.mjs';\nimport {hashFinitePreparationRecord as firstPrepHash,encodeFinitePreparationRecord as firstPrepEncode,decodeFinitePreparationRecord as firstPrepDecode,hashFinitePolicyEffectIdentity as firstIdentityHash} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {readPrivateQaFiniteOwnerContext as firstConnectionContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',String.raw` export class Initial extends FiniteClosure{
+ return "import {createHash as firstTraceHash} from 'node:crypto';\nimport {createFinitePolicyEffectJournal as firstJournal} from './lib/mcp-qa-finite-policy-journal.mjs';\nimport {hashFinitePreparationRecord as firstPrepHash,encodeFinitePreparationRecord as firstPrepEncode,decodeFinitePreparationRecord as firstPrepDecode,hashFinitePolicyEffectIdentity as firstIdentityHash} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {readPrivateQaFiniteOwnerContext as firstConnectionContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',String.raw` export class Initial extends FiniteClosure{
  async fetch(request){
-  try{this.firstBoundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));}catch{this.firstBoundary=null;}this.firstOriginalMethod=request.headers.get('x-afw-finite-original-method');this.firstConnectionCalls??=[];this.firstConnectionCalls.push({boundary:this.firstBoundary,url:request.url,method:request.method,version:request.headers.get('x-afw-finite-version')});
-  return super.fetch(request);
+  try{this.firstBoundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));}catch{this.firstBoundary=null;}this.firstOriginalMethod=request.headers.get('x-afw-finite-original-method');this.firstRequestId=request.headers.get('x-afw-finite-request-id');globalThis.__t3NativeTraceRequestId=this.firstRequestId;this.firstConnectionCalls??=[];this.firstConnectionCalls.push({boundary:this.firstBoundary,url:request.url,method:request.method,originalMethod:this.firstOriginalMethod,requestId:this.firstRequestId,version:request.headers.get('x-afw-finite-version')});
+  const originalMethod=this.firstOriginalMethod,requestId=this.firstRequestId,target=request.url,trace=this.firstState?.trace,actual=super.fetch(request);
+  const observed=response=>{if(originalMethod==='POST'&&target==='https://afw-private.invalid/_finite-owner/choice')trace?.push({kind:'native-response-return',requestId,originalMethod,target,status:response.status,at:Date.now()});};
+  if(actual&&typeof actual.then==='function')actual.then(observed,()=>{}).catch(()=>{});else observed(actual);
+  return actual;
  }
 
 
 
 
  async firstConnectionTicketFault(variant){
   const s=this.ctx.storage;
   if(variant==='restore'){for(const [key,raw]of this.firstTicketOriginal??[])await s.put(key,raw);this.firstTicketOriginal=null;await s.sync();return {restored:true};}
   if(this.firstTicketOriginal)throw Error('SYN ticket corruption not restored');
   const rows=[...await s.list()],ticketRow=rows.find(([key])=>key.startsWith('owner-ticket:')&&!key.endsWith(':use'));if(!ticketRow)throw Error('SYN actual choice ticket absent');
@@ -222,61 +225,62 @@
  }
  async firstConnectionAvailability(){
   const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/live-root')),entered=Date.now();
   try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({available:true,live:true,entered}));}
   catch{return {available:false,live:!root.lease.signal.aborted,entered};}finally{root.finish();}
  }
  async firstConnectionRestore(){this.firstRestore?.();this.firstRestore=null;}
  async firstConnectionState(){return {...(this.firstState??{trace:[]}),http:globalThis.__t3Http??[]};}
  async firstConnectionRelease(which='work'){if(this.firstRelease)this.firstRelease[which]=true;}
  async firstConnectionConfigure(mode='normal'){
-  this.firstRestore?.();this.firstState={mode,trace:[],fetchHeld:false,fetchSettled:false,readHeld:false,readSettled:false,cancelHeld:false,cancelSettled:false};this.firstRelease={};
+  this.firstRestore?.();this.firstState={mode,trace:[],fetchHeld:false,fetchSettled:false,readHeld:false,readSettled:false,cancelHeld:false,cancelSettled:false};globalThis.__t3NativeTrace=this.firstState.trace;this.firstRelease={};
   const owner=this,state=this.firstState,s=this.ctx.storage,env=this.env,native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},fetcher=globalThis.fetch,wall=Date.now;
-  let writes=[],receiptRead=false,shift=0;const originalMetadata=env.AFW_QA_VERSION,originalQaId=originalMetadata.id,originalPrepare=env.RELEASE_DB.prepare,originalNode=env.AFW_RELEASE_EVENTS_NODE,nodeName=originalNode.idFromName,originalSelf=env.AFW_INDEPENDENT_CLOSURE,selfGet=originalSelf.get,originalKv=env.AFW_FINITE_OWNER_OAUTH_KV,kvGet=originalKv.get,originalReader=env.AFW_MCP_CLOSURE_READ_TOKEN;state.afterDriftIo={get:0,list:0,db:0,node:0,self:0,kv:0,fetch:0};const afterDrift=kind=>{if(state.holderChanged)state.afterDriftIo[kind]++;};state.counts={get:0,list:0,transaction:0,sync:0,firstPrimary:0,sql:0};const db=env.RELEASE_DB,withSession=db.withSession;
+  let writes=[],receiptRead=false,shift=0;const committedValues=new Map();const originalMetadata=env.AFW_QA_VERSION,originalQaId=originalMetadata.id,originalPrepare=env.RELEASE_DB.prepare,originalNode=env.AFW_RELEASE_EVENTS_NODE,nodeName=originalNode.idFromName,originalSelf=env.AFW_INDEPENDENT_CLOSURE,selfGet=originalSelf.get,originalKv=env.AFW_FINITE_OWNER_OAUTH_KV,kvGet=originalKv.get,originalReader=env.AFW_MCP_CLOSURE_READ_TOKEN;state.afterDriftIo={get:0,list:0,db:0,node:0,self:0,kv:0,fetch:0};const afterDrift=kind=>{if(state.holderChanged)state.afterDriftIo[kind]++;};state.counts={get:0,list:0,transaction:0,sync:0,firstPrimary:0,sql:0};const db=env.RELEASE_DB,withSession=db.withSession;
   db.withSession=(...args)=>{afterDrift('db');if(args[0]==='first-primary')state.counts.firstPrimary++;const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=(...a)=>{state.counts.sql++;const statement=Reflect.apply(prepare,session,a);if(mode==='source-sql-held'&&String(a[0]).includes('site_projects')){const bind=statement.bind;statement.bind=(...values)=>{const bound=Reflect.apply(bind,statement,values),first=bound.first;bound.first=async(...params)=>{const actual=Reflect.apply(first,bound,params),value=await actual;if(state.sqlHeld)return value;state.sqlHeld=true;return held('work',value);};return bound;};}return statement;};return session;};
   s.list=(...args)=>{afterDrift('list');state.counts.list++;return Reflect.apply(native.list,s,args);};
   const target=key=>typeof key==='string'&&(key.startsWith('afw.finite-preparation-cleanup.v1:')||key.startsWith('afw.finite-policy-effect.v1:'));
-  const note=(kind,key)=>{if(target(key))state.trace.push({kind,key,at:Date.now()});};
+  const rawHash=value=>typeof value==='string'?firstTraceHash('sha256').update(value).digest('hex'):null;
+  const note=(kind,key,value,scope,transactionId=null)=>{if(target(key))state.trace.push({kind,key,valueHash:rawHash(value),scope,transactionId,requestId:owner.firstRequestId,at:Date.now()});};
   const held=(name,value)=>{const deadline=owner.firstBoundary.deadline;state[name+'Boundary']={...owner.firstBoundary,originalMethod:owner.firstOriginalMethod,enteredAt:Date.now()};state[name+'Held']=true;return new Promise((resolve,reject)=>{const tick=()=>{const remaining=deadline-Date.now();if(!Number.isSafeInteger(remaining)||remaining<=0){state[name+'Settled']=true;reject(Error('SYN original request deadline'));return;}if(owner.firstRelease[name]===true){state[name+'Settled']=true;resolve(value);return;}setTimeout(tick,Math.min(10,remaining));};tick();});};
-  const get=async(method,holder,args)=>{
-   afterDrift('get');state.counts.get++;const value=await Reflect.apply(method,holder,args),key=args[0];note('get-settled',key);
+  const get=async(method,holder,args,scope='storage',transactionId=null,transactionReads=null)=>{
+   afterDrift('get');state.counts.get++;const value=await Reflect.apply(method,holder,args),key=args[0];note('get-settled',key,value,scope,transactionId);if(transactionReads&&target(key))transactionReads.push([key,value]);
    if(mode==='clock-backward'&&owner.firstBoundary&&!state.backward){shift-=100;state.backward=true;}
    if(mode==='source-holder-drift'&&owner.firstBoundary&&!state.holderChanged){env.AFW_QA_VERSION={id:originalMetadata.id};state.holderChanged=true;}
    if(mode==='access-expiry-held'&&state.jwkFetched&&!state.workHeld)return held('work',value);
    if(mode==='receipt-readback-lost'&&key.endsWith(':receipt')&&key.startsWith('afw.finite-policy-effect.v1:')&&value!==undefined)throw Error('SYN receipt readback unknown');
    if(mode==='final-pair-owner-drift'&&receiptRead&&key.endsWith(':capsule'))await env.RELEASE_DB.prepare("UPDATE site_projects SET user_id='SYN-negative-owner'").run();
    if(target(key)&&key.endsWith(':receipt')&&value!==undefined)receiptRead=true;
    return value;
   };
   s.get=(...a)=>get(native.get,s,a);
   s.transaction=fn=>{
-   state.counts.transaction++;const currentWrites=[];
+   const transactionId=++state.counts.transaction,currentWrites=[],currentValues=new Map(),currentReads=[];
    const actual=Reflect.apply(native.transaction,s,[async tx=>{
-    const result=await fn({get:(...a)=>get(tx.get,tx,a),list:tx.list.bind(tx),put:async(k,v)=>{note('put-enter',k);const out=await tx.put(k,v);note('put-settled',k);currentWrites.push(k);return out;}});
+    const result=await fn({get:(...a)=>get(tx.get,tx,a,'transaction',transactionId,currentReads),list:tx.list.bind(tx),put:async(k,v)=>{note('put-enter',k,v,'transaction',transactionId);const out=await tx.put(k,v);note('put-settled',k,v,'transaction',transactionId);currentValues.set(k,v);currentWrites.push(k);return out;}});
     return result;
-   }]).then(value=>{writes=currentWrites;for(const key of writes)note('transaction-settled',key);return value;});
+   }]).then(value=>{writes=currentWrites;for(const key of writes){const raw=currentValues.get(key);if(target(key))committedValues.set(key,raw);note('transaction-settled',key,raw,'transaction',transactionId);}if(currentWrites.length===0)for(const [key,raw]of currentReads)note('readback-transaction-settled',key,raw,'transaction',transactionId);return value;});
    return actual.then(async value=>{
     if(mode==='enrollment-transaction-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='upload-send-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':send'))||mode==='receipt-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native transaction result lost');
     if(mode==='enrollment-transaction-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='upload-ack-held'&&writes.some(key=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':ack'))||mode==='receipt-transaction-held'&&writes.some(key=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':receipt')))return held('work',value);
     return value;
    });
   };
   s.sync=async(...args)=>{
-   state.counts.sync++;const value=await Reflect.apply(native.sync,s,args);for(const key of writes)note('sync-settled',key);
+   state.counts.sync++;const syncing=writes.map(key=>[key,committedValues.get(key)]),value=await Reflect.apply(native.sync,s,args);for(const [key,raw]of syncing)note('sync-settled',key,raw,'storage');
    if(mode==='enrollment-sync-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='receipt-sync-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native sync result lost');
    if(mode==='enrollment-sync-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment'))return held('work',value);
    return value;
   };
   globalThis.fetch=async(...args)=>{
    const url=String(args[0]),method=args[1]?.method??'GET',effect=method==='POST'?(url.endsWith('/versions?deploy=false')?'upload':url.endsWith('/deployments')?'activation':null):null;
-   afterDrift('fetch');if(effect)state[effect+'Admission']={...owner.firstBoundary,originalMethod:owner.firstOriginalMethod,enteredAt:Date.now()};const response=await Reflect.apply(fetcher,globalThis,args);if(url.endsWith('/cdn-cgi/access/certs'))state.jwkFetched=true;if(!effect)return response;
-   state.trace.push({kind:'native-result-enter',effect,at:Date.now()});
+   afterDrift('fetch');if(effect){state[effect+'Admission']={...owner.firstBoundary,originalMethod:owner.firstOriginalMethod,enteredAt:Date.now()};state.trace.push({kind:'native-invocation',effect,requestId:owner.firstRequestId,method,url,bodyHash:rawHash(args[1]?.body),at:Date.now()});}const response=await Reflect.apply(fetcher,globalThis,args);if(url.endsWith('/cdn-cgi/access/certs'))state.jwkFetched=true;if(!effect)return response;
+   state.trace.push({kind:'native-result-enter',effect,requestId:owner.firstRequestId,status:response.status,at:Date.now()});
    if(effect==='upload'){
     if(mode==='upload-metadata-id-drift'){originalMetadata.id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';state.holderChanged=true;}
     if(mode==='upload-db-method-drift'){db.withSession=(...args)=>{afterDrift('db');return Reflect.apply(withSession,db,args);};state.holderChanged=true;}
     if(mode==='upload-db-prepare-drift'){db.prepare=(...args)=>{afterDrift('db');return Reflect.apply(originalPrepare,db,args);};state.holderChanged=true;}
     if(mode==='upload-node-method-drift'){originalNode.idFromName=(...args)=>{afterDrift('node');return Reflect.apply(nodeName,originalNode,args);};state.holderChanged=true;}
     if(mode==='upload-self-method-drift'){originalSelf.get=(...args)=>{afterDrift('self');return Reflect.apply(selfGet,originalSelf,args);};state.holderChanged=true;}
     if(mode==='upload-kv-method-drift'){originalKv.get=(...args)=>{afterDrift('kv');return Reflect.apply(kvGet,originalKv,args);};state.holderChanged=true;}
     if(mode==='upload-fetch-drift'){globalThis.fetch=(...args)=>{afterDrift('fetch');return Reflect.apply(fetcher,globalThis,args);};state.holderChanged=true;}
     if(mode==='upload-credential-drift'){env.AFW_MCP_CLOSURE_READ_TOKEN='SYN-negative-changed-reader';state.holderChanged=true;}
    }
@@ -388,14 +392,19 @@
  const loop="for(;;){const part=await retain(stream.read());current(l);";
  once(loop,"for(;;){const part=await retain(stream.read());io.reads++;io.bytes+=part.value?.byteLength??0;current(l);");
  const ending="}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}";
  once(ending,"}finally{if(stream){io.cancelCalls++;await retain(stream.cancel()).then(()=>{io.cancelSettled++;},()=>{});}else if(response?.body&&!response.body.locked){io.cancelCalls++;await retain(response.body.cancel()).then(()=>{io.cancelSettled++;},()=>{});}io.settled=true;}");
  return source;
 }
 export function instrumentFirstConnectionEngine(source){
  const once=(needle,next)=>{assert.equal(source.split(needle).length,2,'passive fixed engine HTTP marker');source=source.replace(needle,()=>next);};
  once("async function http(method,path,body,c){\n  check(c);","async function http(method,path,body,c){\n  const io={kind:'engine',method,bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};(globalThis.__t3Http??=[]).push(io);check(c);");
  once("for(;;){const part=await retain(reader.read());check(c);","for(;;){const part=await retain(reader.read());io.reads++;io.bytes+=part.value?.byteLength??0;check(c);");
+
+ for(const [method,effect]of [['upload','upload'],['activate','activation']]){
+  const describe=method==='upload'?'describeUpload':'describeActivation',needle=method+"(input,c){return invoke(c,async()=>{const request="+describe+"(input);return result(await http(request.method,request.path,request.body,c));});}";
+  once(needle,method+"(input,c){const trace=globalThis.__t3NativeTrace,requestId=globalThis.__t3NativeTraceRequestId,actual=invoke(c,async()=>{const request="+describe+"(input);return result(await http(request.method,request.path,request.body,c));});actual.then(value=>{trace?.push({kind:'native-operation-settled',effect:'"+effect+"',resourceId:value.id,requestId,at:Date.now()});},()=>{}).catch(()=>{});return actual;}");
+ }
  const ending="finally{if(reader)await retain(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}";
  once(ending,"finally{if(reader){io.cancelCalls++;await retain(reader.cancel()).then(()=>{io.cancelSettled++;},()=>{});}else if(response?.body&&!response.body.locked){io.cancelCalls++;await retain(response.body.cancel()).then(()=>{io.cancelSettled++;},()=>{});}io.settled=true;}");
  return source;
 }

diff --git a/test/mcp-qa-finite-first-connection-publication-native.test.mjs b/test/mcp-qa-finite-first-connection-publication-native.test.mjs
--- a/test/mcp-qa-finite-first-connection-publication-native.test.mjs
+++ b/test/mcp-qa-finite-first-connection-publication-native.test.mjs
@@ -1,15 +1,18 @@
 import {createHash} from 'node:crypto';
 import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {gunzipSync} from 'node:zlib';
+import {mkdir,writeFile} from 'node:fs/promises';
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {hashFinitePreparationRecord,hashFinitePolicyEffectIdentity} from '../lib/mcp-qa-finite-preparation-records.mjs';
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
@@ -44,38 +47,96 @@
  for(const path of ['/authorize','/monitoring','/monitoring/grant']){const r=await f.call(path,path.endsWith('/grant')?{method:'POST'}:{});assert.notEqual(r.status,200);await r.body?.cancel();}
  const p=await readFirstConnectionProbe(f);assert.equal(p.native.calls.length,before.native.calls.length,'closed OAuth/notice denied before QA');assert.equal(p.effects,0);assert.deepEqual(p.native.business,[]);assert.equal(p.uploads,1);assert.equal(p.activations,1);
  const rows=p.rows,capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);assert.equal(p.native.alarm,capsule.C0);assert.equal(capsule.C0,capsule.I0+900000);assert.equal(capsule.C1,capsule.C0+180000);
  const plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);assert.equal(plan.configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text,'false');
  assert.equal(f.phaseCurrent,undefined);assert.equal(f.firstConnectionBuild.M.sha256,f.resident.module.sha256);
  assert(f.firstConnectionBuild.M.inputs.includes('worker/mcp-own/finite.mjs'));assert(!f.firstConnectionBuild.M.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
  assert(f.firstConnectionBuild.QA.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
  console.info('T2 initial native build',JSON.stringify({...f.firstConnectionBuild,residency:{...f.resident,content:undefined},M:{...f.firstConnectionBuild.M,inputs:f.firstConnectionBuild.M.inputs.length},QA:{...f.firstConnectionBuild.QA,inputs:f.firstConnectionBuild.QA.inputs.length},requests:p.providerRequests.length}));
 });
 
+
+/** Node assertion over passive actual native observations; never product authority. */
+function assertNativePublicationOrder(trace,rows,requests){
+ const sha=value=>createHash('sha256').update(value).digest('hex'),prefix='native publication order: ';
+ const indexed=trace.map((event,index)=>({...event,index}));
+ const one=(values,label)=>{assert.equal(values.length,1,prefix+label+' must be unique');return values[0];};
+ const response=one(indexed.filter(e=>e.kind==='native-response-return'&&e.originalMethod==='POST'&&e.status===200),'actual successful QA response');
+ assert.equal(typeof response.requestId,'string');assert(response.requestId.length>0,prefix+'original request ID');
+ const events=indexed.filter(e=>e.requestId===response.requestId);
+ const records=rows.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:'));
+ const readRow=key=>{const row=one(records.filter(([k])=>k===key),key);return {key,raw:row[1],value:JSON.parse(row[1]),valueHash:sha(row[1])};};
+ const sendFor=effect=>{const row=one(records.filter(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect===effect),effect+' own SEND');return readRow(row[0]);};
+ const uploadSend=sendFor('upload'),activationSend=sendFor('activation');
+ const receipt=readRow(activationSend.key.slice(0,-4)+'receipt');
+ const durability=(record,label,before)=>{
+  const matches=kind=>events.filter(e=>e.kind===kind&&e.key===record.key&&e.valueHash===record.valueHash);
+  const put=one(matches('put-settled'),label+' actual native put'),commit=one(matches('transaction-settled'),label+' actual native commit');
+  assert(put.index<commit.index&&commit.index<before,prefix+label+' put/commit before next boundary');
+  const sync=matches('sync-settled').find(e=>e.index>commit.index&&e.index<before);assert(sync,prefix+label+' settled sync before next boundary');
+  const direct=matches('get-settled').find(e=>e.scope==='storage'&&e.index>sync.index&&e.index<before),transaction=matches('readback-transaction-settled').find(e=>e.index>sync.index&&e.index<before&&matches('get-settled').some(g=>g.scope==='transaction'&&g.transactionId===e.transactionId&&g.index>sync.index&&g.index<e.index)),read=direct??transaction;assert(read,prefix+label+' exact completed native readback after sync before next boundary');
+  return {key:record.key,valueHash:record.valueHash,put:put.index,commit:commit.index,sync:sync.index,read:read.index,readApi:direct?'storage.get':'read-only storage.transaction',readTransactionId:direct?null:transaction.transactionId};
+ };
+ const flows=[];
+ for(const [effect,send]of [['upload',uploadSend],['activation',activationSend]]){
+  const ack=readRow(send.key.slice(0,-4)+'ack'),identity={kind:'connection',preconnectionId:send.value.preconnectionId,sourceRevision:send.value.sourceRevision,stage:'connection',effect};
+  assert.equal(send.key,'afw.finite-policy-effect.v1:'+hashFinitePolicyEffectIdentity(identity)+':send',prefix+effect+' original journal identity');
+  assert.equal(ack.value.sendHash,hashFinitePreparationRecord('ConnectionSend',send.value),prefix+effect+' ACK links actual own SEND');
+  const invocation=one(events.filter(e=>e.kind==='native-invocation'&&e.effect===effect),effect+' actual fetch invocation');
+  const wire=one(requests.filter(r=>r.method==='POST'&&r.url===invocation.url),effect+' actual provider request');
+  assert.equal(invocation.method,wire.method,prefix+effect+' actual method');assert.equal(invocation.bodyHash,sha(wire.body),prefix+effect+' actual body hash');
+  assert.equal(send.value.requestHash,initialHash('afw.finite-policy-request.v1',{method:wire.method,path:wire.url,body:JSON.parse(wire.body),baselineVersionId:send.value.baselineVersionId,baselineDeploymentId:send.value.baselineDeploymentId}),prefix+effect+' SEND binds actual wire');
+  const headers=one(events.filter(e=>e.kind==='native-result-enter'&&e.effect===effect),effect+' captured native response');
+  const result=one(events.filter(e=>e.kind==='native-operation-settled'&&e.effect===effect),effect+' fulfilled original operation');
+  assert(invocation.index<headers.index&&headers.index<result.index,prefix+effect+' invocation then response then body/cancel/result settlement');
+  assert.equal(result.resourceId,ack.value.resourceId,prefix+effect+' ACK resource from actual normal result');
+  const next=effect==='upload'?one(events.filter(e=>e.kind==='transaction-settled'&&e.key===activationSend.key&&e.valueHash===activationSend.valueHash),'activation SEND commit').index:one(events.filter(e=>e.kind==='transaction-settled'&&e.key===receipt.key&&e.valueHash===receipt.valueHash),'receipt commit').index;
+  const sendOrder=durability(send,effect+' SEND',invocation.index),ackOrder=durability(ack,effect+' ACK',next);
+  assert(result.index<ackOrder.put,prefix+effect+' actual result before ACK put');
+  flows.push({effect,sendHash:hashFinitePreparationRecord('ConnectionSend',send.value),send:sendOrder,invocation:invocation.index,headers:headers.index,result:result.index,resourceId:result.resourceId,ack:ackOrder});
+ }
+ assert(flows[0].ack.read<flows[1].send.put,prefix+'upload ACK durability before activation SEND');
+ assert.equal(receipt.value.versionId,flows[0].resourceId,prefix+'receipt upload ID');assert.equal(receipt.value.deploymentId,flows[1].resourceId,prefix+'receipt deployment ID');
+ assert.equal(receipt.value.baselineVersionId,uploadSend.value.baselineVersionId,prefix+'receipt original baseline');assert.equal(receipt.value.baselineDeploymentId,activationSend.value.baselineDeploymentId,prefix+'receipt original deployment');
+ const receiptOrder=durability(receipt,'receipt',response.index);
+ assert(flows[1].ack.read<receiptOrder.put,prefix+'activation ACK durability before receipt put');
+ return {requestId:response.requestId,flows,receipt:receiptOrder,success:response.index,status:response.status};
+}
+function assertPublicationOrderDataSensitivity(trace,rows,requests,actual){
+ const checked=[],reject=(name,copy)=>{assert.throws(()=>assertNativePublicationOrder(copy,rows,requests),/native publication order:/,name+' must fail the Node order predicate');checked.push(name);};
+ const upload=actual.flows[0],activation=actual.flows[1];
+ reject('missing upload SEND sync',trace.filter(e=>!(e.kind==='sync-settled'&&e.key===upload.send.key)));
+ const moved=trace.slice(),[invoke]=moved.splice(activation.invocation,1);moved.splice(activation.send.read,0,invoke);reject('activation invocation before SEND readback',moved);
+ reject('missing activation ACK sync',trace.filter(e=>!(e.kind==='sync-settled'&&e.key===activation.ack.key)));
+ reject('incomplete upload SEND transaction get',trace.filter(e=>!(e.kind==='readback-transaction-settled'&&e.key===upload.send.key)));
+ const late=trace.filter(e=>!(['get-settled','readback-transaction-settled'].includes(e.kind)&&e.key===actual.receipt.key));late.push(trace[actual.receipt.read]);reject('receipt readback only after success',late);
+ return {kind:'assertion discrimination on DATA copies only',nativeFailureInjected:false,checked};
+}
+
 test('T3 same initial bytes produce connection and downstream',{timeout:120000},async t=>{
- const f=await fixture(t),before=await readFirstConnectionProbe(f);assert.equal(f.firstConnectionBuild.negativeMutation,null,'positive principal is unmutated');await f.stub.firstConnectionConfigure('normal');
+ const f=await fixture(t),before=await readFirstConnectionProbe(f);assert.equal(f.firstConnectionBuild.negativeMutation,null,'positive principal is unmutated');assert.equal(f.firstConnectionBuild.M.sha256,'c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32','positive initial M stays exact D11');assert.equal(f.firstConnectionBuild.M.bytes,1988061);await f.stub.firstConnectionConfigure('normal');
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
- const connectionTelemetry=await plain(f.stub.firstConnectionState());assert(connectionTelemetry.counts?.get>0);assert(connectionTelemetry.http.length>0);assert(connectionTelemetry.http.every(io=>io.settled&&io.cancelCalls===io.cancelSettled),'success retains every actual native body/cancel settlement');const receipt=JSON.parse(receiptRows[0][1]),originalRows=before.rows.filter(([k])=>!k.startsWith('owner-ticket:')&&!k.startsWith('owner-project-ref:')&&!k.startsWith('connection-preparation:'));
+ const connectionTelemetry=await plain(f.stub.firstConnectionState());assert(connectionTelemetry.counts?.get>0);assert(connectionTelemetry.http.length>0);assert(connectionTelemetry.http.every(io=>io.settled&&io.cancelCalls===io.cancelSettled),'success retains every actual native body/cancel settlement');const orderRequests=p.providerRequests.slice(before.providerRequests.length),orderBuild={testRevision:process.env.GITHUB_SHA,negativeMutation:f.firstConnectionBuild.negativeMutation,M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes}};await mkdir('output/task3',{recursive:true});await writeFile('output/task3/native-publication-order.json',JSON.stringify({...orderBuild,stage:'captured before assertions',passiveTrace:connectionTelemetry.trace},null,2));const nativeOrder=assertNativePublicationOrder(connectionTelemetry.trace,p.rows,orderRequests),orderSensitivity=assertPublicationOrderDataSensitivity(connectionTelemetry.trace,p.rows,orderRequests,nativeOrder);console.info('T3 native publication chronology',JSON.stringify(nativeOrder));console.info('T3 chronology DATA sensitivity',JSON.stringify(orderSensitivity));console.info('T3 principal build provenance',JSON.stringify(orderBuild));await writeFile('output/task3/native-publication-order.json',JSON.stringify({...orderBuild,order:nativeOrder,assertionDiscrimination:orderSensitivity,passiveTrace:connectionTelemetry.trace},null,2));const receipt=JSON.parse(receiptRows[0][1]),originalRows=before.rows.filter(([k])=>!k.startsWith('owner-ticket:')&&!k.startsWith('owner-project-ref:')&&!k.startsWith('connection-preparation:'));
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

diff --git a/docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md b/docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md
--- a/docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md
+++ b/docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md
@@ -603,10 +603,89 @@
 
 b6a81590276503926e7fe10564add26150fc1f5f → 9a7502f94b23e777ab5b195278c75e1207132555; tree 764110b8beb6f35c4901a6f4ff462b0b73e0931d; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob c41b55139cb8695b1a9169b5e368d78fdec4c377; docs: preserve incomplete gate and freeze corrected live-observation qualification
 
 9a7502f94b23e777ab5b195278c75e1207132555 → a61142aea40cb4e7880a34e5ffa39ab14ee4fdf5; tree 6f3b7308bf8d73418baa8ab1f91ee5900d89b89a; docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md; blob b6a5810d8e70b7b737b6588f59ea7bdd82835a15; docs: checkpoint corrected Task3 observation and revised exact three-job gate
 
 a61142aea40cb4e7880a34e5ffa39ab14ee4fdf5 → d11dff63b0d693b89ac6ef8d6ec6c60ca01af751; tree 4e30df2ae4abe2bf087b123823185fa6ab082fa8; .github/workflows/afw-first-connection-qualification.yml; blob c3bf62cd04769c1d43abe3ff13784f59e3b351c7; ci: qualify revised exact native matrix under independent original request observations
 
 d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 → f29804abe54f1d618c859c2642b48f90b5677fb7; tree 4f7b1b5ff6296fa6220d09d8d8636f28b26a907a; .github/workflows/afw-first-connection-qualification.yml; blob b9fe3400416e990bb451a17ff21f6999bebe65e4; ci: complete only remaining controls and lint at exact qualified source checkout
 
 f29804abe54f1d618c859c2642b48f90b5677fb7 → 5e28e70b7833fcd4a17fecebe320b0365b6c4d2f; tree 6f3b7308bf8d73418baa8ab1f91ee5900d89b89a; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove completed scoped qualifier and freeze Task3 source handoff
+
+## FIX ROUND1/5 — I1 native chronology assertion, 2026-11-06 16:09 UTC
+
+**IMPLEMENTED AND FOCALLY QUALIFIED; scoped Root re-review pending.** Fresh reviewer returned Spec❌/QualityNeedsfixes,0Critical/1Important. I1 identified a real test-contract gap: the implementation already orders native publication correctly, but T3 only asserted final state/counters/HTTP settlement and did not prove its coordinator's SEND/ACK/receipt durability sequence. The existing T1 enrollment chronology was not evidence for this new coordinator. This appendix supersedes any implication that the earlier D11 test dynamically asserted that order. No product-order defect was observed; no product change was made.
+
+FIX_BASE df20c0f8b8e2fc1b03cdd7e122302c5dc8a62f4e/treef7229e5c4c323b147120d001baa1183a874728da. Tested code7ebe843a69a6434d11670de4cab5482a1c931799/treeafc2a93653f91ee262f9df9f9e32aef07e044dcb; qualifier triggerfc0c3b04110fb01adfae887eaf53b84dbeb1d069. Qualifier-free checkpointab96b2a1d22731eef3fb02f1615c2f276058dd0f/treeafc2a93653f91ee262f9df9f9e32aef07e044dcb. Only T3 and passive F1 instrumentation changed; F2 was unnecessary. P8/P9/P10/P1/P2, schemas/store/journals, SDK, build/profile/bootstrap/source and every other product path remain FIX_BASE-identical.
+
+### What now proves actual native order
+
+F1 captures original request ID, exact keyed raw-value SHA256 from existing native put/get results, native transaction commit/settled sync events, actual captured-fetch invocation+wire-body hash, header response, fixed engine operation's normal fulfillment after body/cancel, and actual QA fetch response return. Audit hashing is synchronous on captured immutable DATA, not asynchronous work that could reorder observations. There are no additional backend reads/calls, authority predicates, grants, callback approvals, seeded rows or new clocks. Engine/response side observers attach to original operation Promises and return those original Promises/values; rejection semantics stay with originals, not the observation branch. Synchronous QA responses also preserve their original return path.
+
+The principal correlates actual own journal keys to effect identities, raw values and ACK→SEND codec hashes; SEND requestHash binds the actual provider method/URL/JSON body plus original baselines. Actual normal result IDs bind the ACKs and receipt. It requires native put→commit→sync→completed exact readback before invocation, header response→body/cancel/result settlement before ACK put, ACK commit→sync→completed exact readback before next effect, and receipt durability before the actual QA200 return. It additionally checks upload ACK durability before activation SEND and activation ACK durability before receipt. The trace never supplies product authority.
+
+Protected journal blob6e3de33d04075740fb57e5f9afcf87dd9f68ee79 read() uses transact(...,false), state() performs tx.get inside a read-only native storage.transaction. Therefore a completed readback is not assumed to be direct storage.get. Passive RO transaction events carry transactionID and hashes of the exact values actually read and are emitted ONLY after that original native transaction Promise fulfills normally. Predicate pairs those fulfilled events with the same transaction's actual get values after sync/before the next boundary; an incomplete tx.get does not qualify. Genuine direct storage.get is still supported. No pending readback was relabelled settled.
+
+Actual primary event indices (strict trace sequence, not coarse wall-clock sorting), requestc6f64333-d308-4427-82c7-fc24909741a4:
+
+| Effect | put / commit | sync settled | completed exact readback | native invocation | headers / normal result | ACK put / commit | ACK sync | ACK completed readback |
+| --- | --- | --- | --- | --- | --- | --- | --- | --- |
+| upload | 22 / 25 | 27 | 33 (RO tx11) | 69 | 70 / 71 | 78 / 79 | 80 | 86 (RO tx17) |
+| activation | 199 / 202 | 204 | 210 (RO tx31) | 246 | 247 / 248 | 255 / 256 | 257 | 263 (RO tx37) |
+
+Receipt put340→commit341→sync342→completed RO readback349(tx47)→actual successful QA response415,status200. All events correlate exact own keys/hashes and the original POST. Full sanitized hashed passive trace and selected proof are preserved in output/task3/native-publication-order.json. Trace is captured BEFORE order assertions for failure diagnosis, then augmented with the passing proof.
+
+### Covering qualification and assertion discrimination
+
+Exact command:
+```text
+node --test --test-concurrency=1 --test-reporter=spec --test-reporter=tap --test-reporter-destination=stdout --test-reporter-destination=output/task3/fix1-principal.tap --test-name-pattern=^(?:T3 same initial bytes produce connection and downstream)$ test/mcp-qa-finite-first-connection-publication-native.test.mjs
+npx eslint --max-warnings=0 test/mcp-qa-finite-first-connection-publication-native.test.mjs test/fixtures/finite-first-connection-publication.mjs
+```
+The runner passes arguments as a structured argv array; the displayed regex above is not a shell-quoting recipe.
+
+[Run42248678046](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42248678046)/job127997568910 SUCCESS16:02:52–16:04:26UTC(94s), exactly1job timeout15min,Node22,contents:read,persist-credentials:false,no secrets,npmci --ignore-scripts --no-audit --no-fund. Actual checkout7ebe/treeafc2 is distinct from triggerfc0c3b04; child fixture testRevision explicitly names actual verified checkout. Before/after actual HEAD/tree, tracked cleanliness and all7HEAD+working-file hashes match. Expected/executed1/1,top1/sub0,PASS1,FAIL0,CANCEL0,SKIP0,TODO0,commandExit0,signalnull; runner64546ms/native test63789.314432ms. lint2exit0/2637ms. Exact name equality prevents zero-match/file pseudo-PASS. No other native case/suite was rerun.
+
+Five copied-DATA checks rejected missing/reordered/incomplete observations while leaving the actual native flow untouched: missing upload SEND sync; activation invocation before SEND readback; missing activation ACK sync; incomplete upload SEND transaction get; receipt readback only after success. They are assertion-discrimination checks over copies, nativeFailureInjected=false, not dynamic product/native mutation evidence or historical TDD RED. No product mutation was needed for this reviewer finding.
+
+Positive initial M remains EXACT D11: SHA256c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/1988061bytes, explicitly asserted before approval. Principal negativeMutation=null. QA-only passive instrumentation SHA256e4861bf5d2af5248b651f440514a0ca3b5d131d892f0a0e40918ae4e7efb7d7b/2368172bytes; it does not replace/wrap the positive M or change product files. Root/child deadlines, body/cancel retention, source C0/C1 and native positive lineage/downstream remain unchanged. Audit additions have measured native flow63789ms aggregate across separate requests, not an asserted speed improvement; CI hardware/timing differ. Existing167positive product evidence remains at D11, NOT all167tested at this new fixture checkout.
+
+Artifact ID13519737504,task3-fix1-source-7ebe843a-trigger-fc0c3b04110fb01adfae887eaf53b84dbeb1d069; ZIP1225837bytes; sha256:f40e631bdeae57bf9cce4479cb74360d716c4a5b3dda2b2ac3a107b04f7de05e; expiry2026-11-13T16:04:21Z. Source/metafiles, M/QA scripts, spec+TAP/counts/manifests/provenance and sanitized native-order trace are retained7days. Digest is verified GitHub metadata/primary upload value, not a local ZIP rehash/download.
+
+### Failed first qualification and correction
+
+Run42247056350/job127991910162 at actualefb92819/tree8dd17328 (trigger274a14f4) remains FAILED:1executed/0PASS/1FAIL/0CANCEL/0SKIP/0TODO/exit1 at “upload SEND exact storage readback after sync before next boundary”; actual connection response had already returned200, exact M unchanged, lint2exit0. This was a passive-observer/predicate API classification defect, not a pre-fix product RED or observed product chronology violation. The predicate had incorrectly accepted only direct storage.get while the protected journal uses actual read-only native transaction/tx.get. Root independently verified the native API and explicitly approved the corrected completed-transaction observation before redispatch. First failed qualification did NOT save native-publication-order.json because its write was after the failed assertion; no captured trace is claimed for that run.
+
+Failed artifact13518022372/sha256:3e3a9f24adc96fc4e7c5af35c353594a6718381a45cd1fbd7c5494896de4034e/expiry2026-11-13T15:53:25Z is preserved. The correction records actual RO transaction normal fulfillment, not mere get invocation/result, and saves trace before assertions. No readback requirement, guard or clock was weakened. No blind rerun, backend replacement, extra read, product edit or new fix round occurred.
+
+### Before/after blobs, scope and handoff
+
+| Path | FIX_BASE blob | Qualified blob |
+| --- | --- | --- |
+| test/mcp-qa-finite-first-connection-publication-native.test.mjs | bc9f717d79e6e1ad60a40f358351093371331bee | 1298bb5b67749df0d7ee20c863b691562e6a81b9 |
+| test/fixtures/finite-first-connection-publication.mjs | 2cda37157bc0d1c9622784c33aa3b0fd94dc0e48 | 6a6950bbe7e956d3b7f19e1a04c5aa6f6ca7b379 |
+
+All other five Task3 paths match FIX_BASE/D11 exactly; all product paths including protected P1/P2 match FIX_BASE. Final scope will contain only these2test files plus appended report/progress; temporary qualifier removed before this appendix. Artifact provenance binds tested code7ebe, not later documentation commits. Source ownership ends after final readback/handoff; Root will create the FIX_BASEdf20→HEAD review package. I1 implementation is ready for scoped re-review; it is not self-accepted as closed. M2/toolchain/RPC warnings, semantic callback-retry exception, post-implementation negative chronology and live-provider/~1.877GB SYN feasibility limits remain as disclosed, outside this fix. No Minor fix wave or runtime/auth/token/provider/deploy action occurred. All operationalReadiness/completePackage/PCoff remain false; Nov3 source ceiling stays expired.
+
+Verified sequential FIX ROUND1 writes through qualifier removal (each single-parent/path/file-CAS/ref/blob read back):
+
+- df20c0f8b8e2fc1b03cdd7e122302c5dc8a62f4e → f3fca20cb71b839735611bb25663cf257ecbd648; tree5f3f3878130d1e06de32356e930c213ba2f09b79; test/fixtures/finite-first-connection-publication.mjs; blob86dffd281c04d4404c9c257c588e7be1afa24a2c; test: passively observe keyed native publication invocation and durability
+
+- f3fca20cb71b839735611bb25663cf257ecbd648 → f3bf10200339e30865baa5199ad347a75c4ca6ae; tree6a12bc22fbccfccbb13ac29697bce44a660bd24f; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob379b1b64686d6882f04269b146c5a294d5bd7734; test: assert actual publication durability order before successful response
+
+- f3bf10200339e30865baa5199ad347a75c4ca6ae → efb92819f3cb7d977ac06c440bca27f1d927d920; tree8dd17328e892f34528c7bb5c4ea10715df78dbda; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob0f6c87ddce517098bf4a16191e64cc381157802e; test: retain native order proof and passive trace as scoped CI evidence
+
+- efb92819f3cb7d977ac06c440bca27f1d927d920 → 274a14f4b6026ffcd6da92c88b6922d5e2adf362; treed23aa0cbb8769502431dc9c022ecca0679dea121; .github/workflows/afw-first-connection-qualification.yml; blobae4a2cffc12a79ac268ffb62fe8d0e47117ef013; ci: qualify only Task3 fix1 native chronology principal and two-file lint
+
+- 274a14f4b6026ffcd6da92c88b6922d5e2adf362 → d56f9fb9ce27bcd36229645bf3adc24b52acc429; tree8dd17328e892f34528c7bb5c4ea10715df78dbda; .github/workflows/afw-first-connection-qualification.yml; blobABSENT; ci: preserve failed chronology qualification before correcting native readback observation
+
+- d56f9fb9ce27bcd36229645bf3adc24b52acc429 → 1821d3a21f584d3f56a152e0ec5bb92a54c629da; tree73d733f122177a132b8fe96e1ee148bab41fa1ac; test/fixtures/finite-first-connection-publication.mjs; blob2fd1f95a917f4987dbc8b6425a2847e40a8f8878; test: observe exact readback only after actual read-only native transaction fulfillment
+
+- 1821d3a21f584d3f56a152e0ec5bb92a54c629da → eb43d27ff8ec5ccbe160a8420080c11f68e9fd39; treea2696d58eb0118b7214601985f8c0cf6436cf201; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob1298bb5b67749df0d7ee20c863b691562e6a81b9; test: require completed keyed readback transaction and retain failure trace before assertions
+
+- eb43d27ff8ec5ccbe160a8420080c11f68e9fd39 → 7ebe843a69a6434d11670de4cab5482a1c931799; treeafc2a93653f91ee262f9df9f9e32aef07e044dcb; test/fixtures/finite-first-connection-publication.mjs; blob6a6950bbe7e956d3b7f19e1a04c5aa6f6ca7b379; test: keep original observed get promise while capturing readback values
+
+- 7ebe843a69a6434d11670de4cab5482a1c931799 → fc0c3b04110fb01adfae887eaf53b84dbeb1d069; tree48b3fcf8b99373888a1871f4ba608fa005ded211; .github/workflows/afw-first-connection-qualification.yml; blob7f1baea5578278b317d8264be9da6b597e0a93d5; ci: qualify corrected completed native readback chronology and two-file lint
+
+- fc0c3b04110fb01adfae887eaf53b84dbeb1d069 → ab96b2a1d22731eef3fb02f1615c2f276058dd0f; treeafc2a93653f91ee262f9df9f9e32aef07e044dcb; .github/workflows/afw-first-connection-qualification.yml; blobABSENT; ci: remove Task3 fix1 qualifier after focused native order verification
+
+The next report/progress commits only append this fix receipt and are delivered by their final handoff SHA rather than a self-referential content hash.
[Source lacks final newline: before=true, after=false; exact blob references control.]

diff --git a/docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md b/docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md
--- a/docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md
+++ b/docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md
@@ -85,10 +85,13 @@
 Task3 checkpoint2026-11-06 13:57UTC: IN PROGRESS, codea4ae401; holder causal RED5+metadataACK1→fix→14GREEN atcd4d6c1; deferred invocation/zero-next-read guard run42229397747 active. Native matrix now60 with8actual upload/activation readback variants pending. Final exact3jobs≤15min, full mapping/report/protected readback/qualifier removal remain. See Task3 report; all readiness/completePackage/PCoff=false.
 
 
 Task3 freeze2026-11-06 14:09UTC: code31ede7d2/tree49ef7824, qualifier absent; direct native readback8PASS(run42229788438); source-holder0+six ticket codec/correlator negatives2PASS(run42231129828/job127936986325). Exact final native60=A24+B25+C11, scoped positive107,total167,2expected-fail mutants,lint7. Bounded3jobs15min estimated847/850/852s; no fit/completion claim until terminal primary logs. Full frozen per-variant/native-vs-compositional mapping and parent/blob log in Task3 report. All readiness/completePackage/PCoff=false.
 
 
 Task3 2026-11-06 14:44UTC: primer gate42232085255 NO aceptado global: A24PASS/C118PASS+controles+lint,B23/25fallan observacion de dos boundaries tardios. Causa probada: reloj de observacionNode30s abarcaba GET+POST separados; producto no se relaja. Focal42235796244/job1279529300612PASS, entradasPOST19.67/20.44s<30s reales; cancelacion tardia separada de admision I/O viva. Codigo sourceb6a81590 sinqualifier; P8/P9/P10 intactos, F1/T3 medicion corregida. Final60=A23+B23+C14;167positive+2controles,3jobs15min,est776/783/665s; falta primaria terminal. Excepcioncallbackretry semantica explicita aprobadaRoot, noPASSdinamico inventado. Todos readiness=false.
 
 
 Task3 cierre implementer2026-11-06 15:18UTC — DONE_WITH_CONCERNS/SOURCE-SYN, pendiente revision frescaRoot. Checkout calificadoD11dff63/tree4e30,7blobs congelados; primera ConnectionReceipt nativa real+downstream QAauthorize/Mtoken/MCP-D04/timestamp/noticeGETPOST/Link sinseed.167/167positivos(60native,137top+30subtests) en42236775067: A23/B23/C121, todos comandos exit0; run permaneceCANCELLED por15min durante control restante. Excepcioncompositiva aprobadaRoot:42240487416/job127969155895SUCCESS,checkoutEXACTOD11 desde triggerf29804ab,2controles1expectedFAILcada uno/targettrue/exit1 +lint7exit0,7hashesHEAD/workingbeforeafter exactos. Full42232085255 sigueFAILED, no single-rungreen inventado. Qualifier retirado5e28e70b/tree6f3b7308; reporte final completo incluye REDcausal, matrizporvariante/nivelesdeprueba, excepcioncallbackestatica, padres/blobs/artefactos7d,~1.877GB JSONSYN yfeasibilidadlivecondicional; M1/M2deferred,ningunoptimizador/runtimemutation. AlloperationalReadiness=false/completePackage=false/PCoff=false; techo3Novvencido. Codigo7paths identicoD11; commitsreporte/progreso solo docs, artefactos no se atribuyen a HEAD posterior. Implementer entregaSHAfinal separado trasreadback y cesaSourcewrites.
+
+
+FIX ROUND1/5 — 2026-11-06 16:09UTC: I1 de reviewer (faltaba asercion de cronologia nativa, sin defecto de orden observado) corregido solo en T3/F1. Codigo calificado7ebe843a/treeafc2; run42248678046/job1279975689101principalPASS/0FAIL-CANCEL-SKIP-TODO/exit0 +lint2exit0,94sjob. Aserta por efecto commitSEND→sync→readbackROtransaction normalfulfill→invocacion→resultado completo→commitACK→sync→readback; receipt349<QA200return415.5checksDATAcopias distinguen omisiones/reorden/pending, nofallosnativosinyectados. MpositivoexactoD11c49303be/1988061B;QAinstrumentadoe4861bf5/2368172B. Primer focal42247056350 permaneceFAILEDporclasificacionincorrecta(storageget vs ROtxn), sintraceguardado; corregidoobservadorcontraAPIreal, sin relajarreadback/producto/clocks. Artefacto13519737504/digestf40e631bdeae57bf9cce4479cb74360d716c4a5b3dda2b2ac3a107b04f7de05e exp13Nov16:04:21. Qualifier retiradoab96b2a1.167anteriores siguenD11,noatribuirlos alfixtureHEADnuevo. Re-reviewRootpendiente;I1noautoaceptado. Productotodo/F2/P1/P2/P8/P9/P10exactos,Minorsdeferred,no runtime. VerapendiceFIXROUND1en reporte, SHAfinalentregadoapartetrasreadback.Sourcewritescesantrasentrega.


```
