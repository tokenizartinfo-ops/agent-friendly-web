# AFW — complete scoped final-fix review package

2026-11-06 UTC. SOURCE/SYN ONLY. Read this FIX_BASE→HEAD package once; this is ONE scoped re-review of Important I1 and new breakage introduced in the fix, not a second whole-branch review.

PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web (public1347578006); Source feat/finite-native-cleanup-20261101; GitHub connector origin. Review/read-only. No source/runtime mutation, main/merge, secrets/permissions/OAuth, provider requests or local clone/dependencies/builds/tests.

- FIX_BASE: 8b2380c9bcc9c383ec46590df1403eed19fd2659; tree07079c8cc3670a6a1db51ca1daadbf3172c2d445.
- Final frozen HEAD: 7aab233741b09f8873bf04831ca2fa9a9c2b1c4d; tree6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3. Implementer STOPwrites, Root independently verified exact ref.
- Requirements: docs/superpowers/briefs/2026-11-06-finite-native-response-body-retention-fix.md at Rootdocs b2ee090b1d1a62059cb80b7601b140ca023cb08e; blobc8392e7647f65922c7758db97b6a0fa4ab49f1b8.
- Implementer report: docs/superpowers/reports/2026-11-06-finite-native-response-body-retention-fix.md at finalHEAD; blob76fcee4e8fb797ab0aaac6acf756037d36e1e8c5. Its complete addition is included below, no need refetch the same text.
- Prior whole-branch report: docs/superpowers/reviews/2026-11-06-finite-native-whole-branch.es.md at Rootdocs b5fca44808c5c9c345ea5693527280fda1bc9ddd. Final verdict0Critical/1Important/3Minor; sole fix wave scope only I1. Task3 chronology I1 was a distinct already addressed finding. M-I/M-II/M-III and historicalM1/M2 remain deferred, M4closed. No incidental Minor work.

## Complete finding under verification (verbatim)

### Important I1 — Retain acquired response bodies when validation fails before getReader()

Locations at reviewed HEAD:
- lib/mcp-qa-finite-bootstrap-native.mjs:37, cleanup44.
- lib/mcp-qa-finite-historical-source.mjs:210, cleanup219.
- lib/mcp-qa-finite-initial-material.mjs:45, cleanup52.

Problem: Each function awaits a response, checks the original lease and validates status/headers before assigning reader. Its finally cancels only when reader exists. An invalid response—or a response arriving after the original lease expires—therefore exits without retaining cancellation of its acquired body.

These are connected initial-lifecycle producers: initial-material.mjs:59–64 invokes the command, bootstrap and historical readers inside stage-work ownership. Once their retained promises settle and the original lease aborts, stage-work.mjs:8–22 can remove the outstanding entry while the abandoned body has no tracked settlement.

Impact: This breaks the explicit body/cancellation ownership guarantee and can allow a later observation scope after apparent drainage while earlier transport work remains unaccounted for. Durable one-shot fences still deny replayed publication. This is NOT an asserted authorization bypass. Aborting the fetch signal does not establish physical settlement.

Fix: Keep the acquired response in an enclosing variable. In every exit path, retain actual reader.cancel() or, when no reader was acquired, unlocked response.body.cancel(). Preserve prompt logical denial while retaining physical cleanup, following the established fixed-engine pattern.

Focused verification recommended: One parameterized native regression covering the three adapters with an invalid-header/status response and a late response, whose actual body cancellation remains held. Assert logical denial, cancellation entry, continued exclusion of another root until cancellation settles, and no subsequent IO/publication. Existing inspected tests cover malformed DATA, held fetches and storage continuations, not this pre-reader cancellation boundary. No test was run during review.

## Scope and Root verification

Full nontruncated recursive BASE/final trees:3166→3168 non-tree entries;3160 unchanged; exactly8 paths listed below including test fixture/report. No mode changes. All original protected blobs, including stage-work/fixed-engine/P8/P9/P10/enrollment/schemas/stores/SDK/profiles/entrypoints/build scripts/package locks, unchanged. Temporary qualifier absent in final tree. Main last verified0c9c475b3ebaa970fc11d628b40e50a90cceb727; no integration/merge asserted.

Root independently fetched complete terminal primary logs: RED42264969077/job128054380876/42473chars; GREEN42265404365/job128055890788/36009chars. RED exact3positive PASS and6regressions FAIL at missing cancellation entry (acquired1/readerCalls0/cancelEntered0/validAtFetchtrue/nativeResponse+Streamtrue). GREEN same3positive+6regressions PASS/0fail-cancel-skip-todo; all6 actualcancelEntered1/pendingExcludedtrue/settledtrue/releasedtrue/fetches1/storageUnchanged. Changed7file eslint exit0/no diagnostics. No broad suite rerun or new runtime fact. Actual GREEN checkout17c6f08f9e0b76a6ac239be05f5d887e37c49d8c differs from workflow trigger14a4a2557a3086a9ff7ebdbc43221d14b6d93daa; final product/test blobs identical to tested checkout. Artifact13525818787 metadata independently matches digest f5846d843cd1dbfb4e06e00393bd46d931f8a261aa9f7782eb3e467b465fc970, expires13Nov17:51:41UTC.

Source3Nov02:59UTC remains expired. Parent≤30000ms/child≤5000ms and original C0/C1/I0, identities/Access/authority unchanged. Physical cleanup remains retained after logical denial, not business permission renewal. Current full M/QA bundles were not rebuilt; old literal c493 is NOT asserted current after changed source. Native test bundles/metafiles192/206/216 inputs archived per report. Current operationalReadiness=false;completePackage=false;PCoff=false.

## All 11 fix-wave commits, chronological

- 461b8b3e82459374bbc6f142f5059d990baaaf97 (parent 8b2380c9bcc9c383ec46590df1403eed19fd2659) — test: add shared native acquired-body retention fixture
- c84057e036058671f356d533432c1d93a2dccd47 (parent 461b8b3e82459374bbc6f142f5059d990baaaf97) — test: cover bootstrap pre-reader native body cancellation
- 3ddacae636cd6c3d935932c12c10e06a445617d2 (parent c84057e036058671f356d533432c1d93a2dccd47) — test: cover historical-source pre-reader native body cancellation
- 85eee832e779df310f14423ceec637ef459b0dd2 (parent 3ddacae636cd6c3d935932c12c10e06a445617d2) — test: cover initial-material pre-reader native body cancellation
- f64d5d6467c9b43248f15055b6f2c30eb16b4f35 (parent 85eee832e779df310f14423ceec637ef459b0dd2) — test: qualify native acquired-body retention RED
- d50fb258b4f8e36f68033d79a18bf4b18bab0efe (parent f64d5d6467c9b43248f15055b6f2c30eb16b4f35) — fix: retain acquired mcp-qa-finite-bootstrap-native response cancellation
- f24f9fe50e9755026b8acf5f9b86df5918839a2a (parent d50fb258b4f8e36f68033d79a18bf4b18bab0efe) — fix: retain acquired mcp-qa-finite-historical-source response cancellation
- 17c6f08f9e0b76a6ac239be05f5d887e37c49d8c (parent f24f9fe50e9755026b8acf5f9b86df5918839a2a) — fix: retain acquired mcp-qa-finite-initial-material response cancellation
- 14a4a2557a3086a9ff7ebdbc43221d14b6d93daa (parent 17c6f08f9e0b76a6ac239be05f5d887e37c49d8c) — test: qualify native acquired-body retention GREEN
- 2d15512dbce193f71ddaddad3cb24268b1b2ba77 (parent 14a4a2557a3086a9ff7ebdbc43221d14b6d93daa) — test: remove completed native body retention qualifier
- 7aab233741b09f8873bf04831ca2fa9a9c2b1c4d (parent 2d15512dbce193f71ddaddad3cb24268b1b2ba77) — docs: record causal native response retention RED and GREEN

## Complete stat and blob manifest

| Path | Before | After | + | - |
| --- | --- | --- | ---: | ---: |
| lib/mcp-qa-finite-bootstrap-native.mjs | ac0d14ebb5a986e2611e9ddbd72592541c9a4c28 | 003b8cda2b723d3422f8f696302acc8f550b3477 | 3 | 3 |
| lib/mcp-qa-finite-historical-source.mjs | 3f0bf487efd72aa2356fd9982f98a938d328e72d | 855af60b2880d566f665a405cb3ab4fe8b9d369e | 3 | 3 |
| lib/mcp-qa-finite-initial-material.mjs | c0ee5315563764979ed2c681c71b2dbc5515203d | 8e2d3e4a75baabf1be5d12b6e2868ffc16599f78 | 3 | 3 |
| test/mcp-qa-finite-bootstrap-native.test.mjs | 1b871f097eb8c1dc67f4cb8ff174b6970c2cf4e4 | a92908b08417609ac5254645f131905368b4c141 | 10 | 1 |
| test/mcp-qa-finite-historical-source-native.test.mjs | a4464db2b94ad1b7825f032d3d54a8b990e881b8 | e3080f8cb55ae618c8c10d74446b3a5db4205045 | 14 | 1 |
| test/mcp-qa-finite-initial-material-native.test.mjs | 7f98bfe8cfe169ef1261f6c15ce9d08df9214d22 | 0482e11bfc875cc249d613e8c888a7fc6d55349b | 10 | 1 |
| docs/superpowers/reports/2026-11-06-finite-native-response-body-retention-fix.md | absent | 76fcee4e8fb797ab0aaac6acf756037d36e1e8c5 | 167 | 0 |
| test/fixtures/finite-native-body-retention.mjs | absent | 227b0009b5c48f205967621c924e4e3ffb72f105 | 107 | 0 |

## Full fix-range diff with 10 surrounding lines

### lib/mcp-qa-finite-bootstrap-native.mjs

```diff
diff --git a/lib/mcp-qa-finite-bootstrap-native.mjs b/lib/mcp-qa-finite-bootstrap-native.mjs
--- a/lib/mcp-qa-finite-bootstrap-native.mjs
+++ b/lib/mcp-qa-finite-bootstrap-native.mjs
@@ -22,33 +22,33 @@
   const actorId=Reflect.apply(stringify,actor,[]);if(!bootstrapHex(actorId)||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId)fail();
   const entered=Date.now(),origin=performance.now();let lastWall=entered,lastMono=origin,cfCount=0,ghCount=0,ghBytes=0,cfBytes=0;
   controller=new AbortController();stop=()=>controller.abort();signal.addEventListener('abort',stop,{once:true});if(signal.aborted)stop();timer=setTimeout(stop,30000);
   const check=()=>{
    assertCurrent();const at=Date.now(),mono=performance.now();
    if(finished||signal.aborted||controller.signal.aborted||!Number.isSafeInteger(at)||at<lastWall||at-entered>=30000||at>=effectiveExpiry||!Number.isFinite(mono)||mono<lastMono||mono-origin>=30000)fail();lastWall=at;lastMono=mono;
    if(options.ctx!==ctx||options.env!==env||originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent||ctx.id!==actor||actor.toString!==stringify||ctx.storage!==storage||Reflect.apply(stringify,actor,[])!==actorId||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||env.AFW_QA_VERSION!==version||version.id!==id||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetcher)fail();return at;
   };
   const request=async(service,path,cap=262144)=>{
    check();if(service==='cf'?++cfCount>3:++ghCount>11)fail();
-   const child=new AbortController(),began=Date.now(),mono=performance.now();let active=true,on,t,reader;
+   const child=new AbortController(),began=Date.now(),mono=performance.now();let active=true,on,t,reader,r;
    const current=()=>{check();if(!active||child.signal.aborted||Date.now()-began>=5000||performance.now()-mono>=5000)fail();};
    const stopped=new Promise((_,reject)=>{on=()=>{active=false;child.abort();reject(Error('Finite QA bootstrap native read stopped'));};controller.signal.addEventListener('abort',on,{once:true});t=setTimeout(on,5000);});
    const actual=retainFiniteOwnerStagePromise(Promise.resolve().then(async()=>{
     try{
-     current();const r=await fetcher((service==='cf'?CF:GH)+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:child.signal,headers:{Accept:'application/json','Cache-Control':'no-cache',...service==='cf'?{Authorization:'Bearer '+credential}:{'X-GitHub-Api-Version':'2022-11-28'}}});current();
+     current();r=await fetcher((service==='cf'?CF:GH)+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:child.signal,headers:{Accept:'application/json','Cache-Control':'no-cache',...service==='cf'?{Authorization:'Bearer '+credential}:{'X-GitHub-Api-Version':'2022-11-28'}}});current();
      const date=Date.parse(r?.headers?.get('date')??''),length=r?.headers?.get('content-length');
      if(!(r instanceof Response)||r.status!==200||!r.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||r.headers.has('age')&&r.headers.get('age')!=='0'||r.headers.has('retry-after')||r.headers.get('x-ratelimit-remaining')==='0'||r.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(r.headers.get('cf-cache-status')?.toUpperCase())||!(r.headers.get('content-type')??'').startsWith('application/json')||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
      reader=r.body.getReader();let size=0;const chunks=[];
      for(;;){current();const v=await reader.read();current();if(v.done)break;if(!(v.value instanceof Uint8Array)||(size+=v.value.length)>cap)fail();chunks.push(v.value);}
      if(length!==null&&Number(length)!==size)fail();if(service==='cf'?(cfBytes+=size)>262144:(ghBytes+=size)>2097152)fail();
      const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));current();return {value,date};
-    }finally{if(reader)retainFiniteOwnerStagePromise(reader.cancel()).catch(()=>{});}
+    }finally{if(reader)retainFiniteOwnerStagePromise(reader.cancel()).catch(()=>{});else if(r?.body&&!r.body.locked)retainFiniteOwnerStagePromise(r.body.cancel()).catch(()=>{});}
    }));
    try{const result=await Promise.race([actual,stopped]);current();return result;}finally{active=false;clearTimeout(t);controller.signal.removeEventListener('abort',on);child.abort();}
   };
   check();
   const token=finiteCfEnvelope((await request('cf','/tokens/verify',8192)).value);check();
   bootstrapFields(token,['id','status','expires_on',...Object.hasOwn(token,'not_before')?['not_before']:[]]);
   const expiry=Date.parse(token.expires_on);if(token.id!==TOKEN||token.status!=='active'||!Number.isSafeInteger(expiry)||expiry<=check()||token.not_before!=null&&(!Number.isSafeInteger(Date.parse(token.not_before))||Date.parse(token.not_before)>check()))fail();
   effectiveExpiry=Math.min(expiry,CEILING);check();
   const pointerPath='/workers/scripts/'+BOOTSTRAP.workerName+'/deployments?per_page=1',before=finiteQaPointer(await request('cf',pointerPath,65536));check();if(before.versionId!==id)fail();
   const get=async p=>(await request('gh',p)).value,refPath='/git/ref/tags/afw-finite-bootstrap/'+id,refName='refs/tags/afw-finite-bootstrap/'+id;
```

### lib/mcp-qa-finite-historical-source.mjs

```diff
diff --git a/lib/mcp-qa-finite-historical-source.mjs b/lib/mcp-qa-finite-historical-source.mjs
--- a/lib/mcp-qa-finite-historical-source.mjs
+++ b/lib/mcp-qa-finite-historical-source.mjs
@@ -199,31 +199,31 @@
    if(options.ctx!==ctx||options.env!==env||originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==selfName||env.AFW_QA_VERSION!==metadata||metadata.id!==versionId||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetcher||self.idFromName(SLOT).toString()!==actorId)fail('coherence');return at;
   };
   const child=async work=>{
    check();const start=Date.now(),mono=performance.now(),abort=new AbortController();let active=true,t,on;
    const current=()=>{check();if(!active||abort.signal.aborted||Date.now()-start>=5000||performance.now()-mono>=5000)fail('deadline');};
    const stopped=new Promise((_,reject)=>{on=()=>{active=false;abort.abort();reject(Error('Finite historical source unavailable:deadline'));};controller.signal.addEventListener('abort',on,{once:true});t=setTimeout(on,5000);});
    const actual=retainFiniteOwnerStagePromise(Promise.resolve().then(()=>{current();return work(abort.signal,current);}));
    try{const value=await Promise.race([actual,stopped]);current();return value;}finally{active=false;clearTimeout(t);controller.signal.removeEventListener('abort',on);abort.abort();}
   };
   const request=(path,cap)=>child(async(childSignal,current)=>{
-   let reader;try{
-    const response=await fetcher(ROOT+path,{method:'GET',redirect:'manual',cache:'no-store',signal:childSignal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Cache-Control':'no-cache'}});current();
+   let reader,response;try{
+    response=await fetcher(ROOT+path,{method:'GET',redirect:'manual',cache:'no-store',signal:childSignal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Cache-Control':'no-cache'}});current();
     if(!(response instanceof Response)||response.status!==200||!response.body||!(response.headers.get('content-type')??'').toLowerCase().startsWith('application/json'))fail('http');
     const date=Date.parse(response.headers.get('date')??''),length=response.headers.get('content-length');if(!time(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||['HIT','REVALIDATED','STALE','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail('http');
     reader=response.body.getReader();let size=0;const chunks=[];for(;;){current();const r=await reader.read();current();if(r.done)break;if(!(r.value instanceof Uint8Array)||(size+=r.value.byteLength)>cap)fail('http');chunks.push(r.value);}
     const body=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));current();
     fields(body,['success','errors','messages','result',...Object.hasOwn(body,'result_info')?['result_info']:[]],'http');
     if(body.success!==true||!Array.isArray(body.errors)||body.errors.length||!Array.isArray(body.messages)||body.messages.length>16)fail('http');
     for(const message of body.messages){fields(message,['code','message',...Object.hasOwn(message,'type')?['type']:[]],'http');if(!Number.isSafeInteger(message.code)||typeof message.message!=='string'||message.message.length>4096||message.type!==undefined&&message.type!==null&&typeof message.type!=='string')fail('http');}
     return body.result;
-   }finally{if(reader){const cancel=reader.cancel();retainFiniteOwnerStagePromise(cancel).catch(()=>{});}}
+   }finally{if(reader){const cancel=reader.cancel();retainFiniteOwnerStagePromise(cancel).catch(()=>{});}else if(response?.body&&!response.body.locked)retainFiniteOwnerStagePromise(response.body.cancel()).catch(()=>{});}
   });
   check();gate='custody';
   const token=await request('/tokens/verify',8192);check();fields(token,['id','status','expires_on',...Object.hasOwn(token,'not_before')?['not_before']:[]],'custody');
   const expiry=Date.parse(token.expires_on);if(token.id!==TOKEN||token.status!=='active'||!time(expiry)||expiry<=Date.now()||token.not_before!=null&&(!time(Date.parse(token.not_before))||Date.parse(token.not_before)>Date.now()))fail('custody');effectiveExpiry=Math.min(expiry,CEILING);check();
   gate='metadata';const path='/workers/workers/'+WORKER+'/versions/'+VERSION+'?include=modules',first=version(await request(path,3145728),node);check();
   const snapshot=()=>child(async(_signal,current)=>{
    const operation=Reflect.apply(transaction,storage,[async tx=>{
     const get=tx?.get;if(typeof get!=='function')fail('legacy');const rows=[];
     for(const key of KEYS){current();if(tx.get!==get)fail('coherence');const value=await tx.get(key);current();rows.push(value===undefined?undefined:own(value,65536));}
     return legacy(rows,first,check());
```

### lib/mcp-qa-finite-initial-material.mjs

```diff
diff --git a/lib/mcp-qa-finite-initial-material.mjs b/lib/mcp-qa-finite-initial-material.mjs
--- a/lib/mcp-qa-finite-initial-material.mjs
+++ b/lib/mcp-qa-finite-initial-material.mjs
@@ -34,29 +34,29 @@
     const lease=Object.freeze({signal:controller.signal,assertCurrent:check});narrow(end);
     const child=async work=>{
      check();const began=Date.now(),m0=performance.now(),childEnd=Math.min(end,began+5000),abort=new AbortController();let active=true,t,on;
      const current=()=>{check();if(!active||abort.signal.aborted||Date.now()>=childEnd||performance.now()-m0>=childEnd-began)fail();};
      const l=Object.freeze({signal:abort.signal,assertCurrent:current});
      const stopped=new Promise((_,reject)=>{on=()=>{active=false;abort.abort();reject(Error('Finite initial child expired'));};controller.signal.addEventListener('abort',on,{once:true});t=setTimeout(on,Math.max(1,childEnd-Date.now()));});
      const actual=track(Promise.resolve().then(()=>{current();return work(l);}));
      try{const value=await Promise.race([actual,stopped]);current();return value;}finally{active=false;clearTimeout(t);controller.signal.removeEventListener('abort',on);abort.abort();}
     };
     const command=()=>child(async l=>{
-     let reader;try{
-      const response=await fetcher(GH+'/issues/comments/'+commandId,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:l.signal,headers:{Accept:'application/json','Cache-Control':'no-cache','X-GitHub-Api-Version':'2022-11-28'}});l.assertCurrent();
+     let reader,response;try{
+      response=await fetcher(GH+'/issues/comments/'+commandId,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:l.signal,headers:{Accept:'application/json','Cache-Control':'no-cache','X-GitHub-Api-Version':'2022-11-28'}});l.assertCurrent();
       const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length'),remaining=response?.headers?.get('x-ratelimit-remaining');
       if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||!(response.headers.get('content-type')??'').startsWith('application/json')||length!==null&&(!/^\d+$/.test(length)||Number(length)>16384)||remaining!==null&&(!/^\d+$/.test(remaining)||Number(remaining)<1))fail();
       reader=response.body.getReader();let size=0;const chunks=[];for(;;){const v=await reader.read();l.assertCurrent();if(v.done)break;if(!(v.value instanceof Uint8Array)||(size+=v.value.length)>16384)fail();chunks.push(v.value);}
       const v=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),I0=Date.parse(v.created_at);
       if(v.id!==commandId||v.body!=='/afw-qa-finite-prepare v1 '+expected.sourceRevision+' '+qaVersionId||v.user?.id!==290715446||v.user.login!=='tokenizartinfo-ops'||v.user.type!=='User'||v.author_association!=='OWNER'||v.issue_url!==GH+'/issues/497'||!Number.isSafeInteger(I0)||I0<0||![new Date(I0).toISOString(),new Date(I0).toISOString().replace('.000Z','Z')].includes(v.created_at)||v.updated_at!==v.created_at||I0>check()||check()>=I0+300000)fail();
       return own({commandId,body:v.body,createdAt:I0,updatedAt:I0,ownerId:290715446,repository:'tokenizartinfo-ops/agent-friendly-web',issueNumber:497});
-     }finally{if(reader)track(reader.cancel()).catch(()=>{});}
+     }finally{if(reader)track(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)track(response.body.cancel()).catch(()=>{});}
     });
     const admission=Object.freeze({lease:originalLease});
     return await observeFiniteOwnerStageWork({ctx,env,admission,originalLease},async()=>{
      check();if(!await child(l=>store.available(l)))fail();
      const candidate=readPrivateQaFiniteCandidate();check();
      if(candidate.sourceRevision!==expected.sourceRevision||candidate.sourceTree!==expected.sourceTree)fail();
      const first=await command();narrow(first.createdAt+300000);
      const intent={purpose:'afw.finite-initial-intent.v1',repository:first.repository,commandId,sourceRevision:expected.sourceRevision,sourceTree:expected.sourceTree,qaVersionId,initialInstanceId:initialInstanceId({commandId,sourceRevision:expected.sourceRevision,qaVersionId}),I0:first.createdAt,initialDeadline:first.createdAt+300000,goal:'content'};
      const claim=await child(l=>store.claim(intent,hash('afw.finite-initial-command.v1',first),end,l));check();
      // Real factual producers, once. No whole-source DTO substitutes or cache.
```

### test/mcp-qa-finite-bootstrap-native.test.mjs

```diff
diff --git a/test/mcp-qa-finite-bootstrap-native.test.mjs b/test/mcp-qa-finite-bootstrap-native.test.mjs
--- a/test/mcp-qa-finite-bootstrap-native.test.mjs
+++ b/test/mcp-qa-finite-bootstrap-native.test.mjs
@@ -1,40 +1,45 @@
+import {retentionImports,retentionMethods,checkBodyRetention,captureRetentionBuild} from './fixtures/finite-native-body-retention.mjs';
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {readFile} from 'node:fs/promises';
 import {build} from 'esbuild';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 let api;try{api=await import('../lib/mcp-qa-finite-bootstrap-native.mjs');}catch{/* absent-product RED */}
 const REAL_CEILING=Date.parse('2026-11-03T02:59:00Z'),DECLARATION="CEILING=Date.parse('2026-11-03T02:59:00Z')";
 async function fixture({productionExpiry=false}={}){
  assert.equal(typeof api?.readPrivateQaFiniteBootstrap,'function');
  const {bootstrapWorld,UUID,GH,CF}=await import('./fixtures/finite-bootstrap-world.mjs'),w=await bootstrapWorld();
  let source=await readFile('lib/mcp-qa-finite-bootstrap-native.mjs','utf8');
  assert.equal(source.split(DECLARATION).length,2);
  const approval=Date.now()+86400000;
  if(productionExpiry){source=source.replaceAll('Date.now()',String(REAL_CEILING));assert.equal(source.split(DECLARATION).length,2);}
  else source=source.replace(DECLARATION,'CEILING='+approval);
  const entry=`
  import{DurableObject}from'cloudflare:workers';
  import{readPrivateQaFiniteBootstrap}from'./lib/mcp-qa-finite-bootstrap-native.mjs';
+${retentionImports}
  export class Check extends DurableObject{
+${retentionMethods("readPrivateQaFiniteBootstrap({ctx:this.ctx,env:this.env},parent.lease)")}
+
   async read(mode){
    const controller=new AbortController(),start=Date.now(),env=this.env,version=env.AFW_QA_VERSION;
    const lease={signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()-start>=30000||mode==='expired-parent')throw Error('parent');}};
    let timer;if(mode==='abort')controller.abort();if(mode==='held-abort')timer=setTimeout(()=>controller.abort(),25);
    if(mode==='holder-swap')timer=setTimeout(()=>{env.AFW_QA_VERSION={id:version.id};},0);
    try{return await readPrivateQaFiniteBootstrap({ctx:this.ctx,env},lease);}
    catch{return {denied:true};}finally{clearTimeout(timer);controller.abort();env.AFW_QA_VERSION=version;}
   }
  }export default{fetch(){return new Response(null,{status:404});}};
  `;
- const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':JSON.stringify(w.expected)},plugins:[{name:'explicit-SYN-custody-boundary',setup(b){b.onLoad({filter:/mcp-qa-finite-bootstrap-native\.mjs$/},()=>({contents:source,loader:'js'}));}}]});
+ const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':JSON.stringify(w.expected)},plugins:[{name:'explicit-SYN-custody-boundary',setup(b){b.onLoad({filter:/mcp-qa-finite-bootstrap-native\.mjs$/},()=>({contents:source,loader:'js'}));}}]});
+ await captureRetentionBuild('bootstrap',built);
  const f={w,mode:'normal',requests:[],pointerReads:0,held:null,approval};
  const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'SYN-native-token'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Check',useSQLite:true,uniqueKey:'bootstrap-c1'}},script:built.outputFiles[0].text,outboundService:async req=>{
   f.requests.push({url:req.url,authorization:req.headers.get('authorization')});assert.equal(req.method,'GET');
   if(f.mode==='held')await new Promise(resolve=>{f.held=resolve;});
   let value;
   if(req.url.startsWith(CF)){
    assert.equal(req.headers.get('authorization'),'Bearer SYN-native-token');
    if(req.url===CF+'/tokens/verify')value={success:true,errors:[],messages:[],result:{id:f.mode==='wrong-token'?'9db7901af95faf07e6f7ef378045328e':'9aa97ad1fc9afe3021cf69ea497d5190',status:'active',expires_on:new Date(f.mode==='expired-token'?0:approval+60000).toISOString(),not_before:null}};
    else{
     assert.equal(req.url,CF+'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1');
@@ -72,11 +77,15 @@
 test('actual namespace identity mismatch denies before HTTP',async t=>{
  const f=await fixture();t.after(()=>f.mf.dispose());assert.equal((await f.wrong.read('normal')).denied,true);assert.equal(f.requests.length,0);
 });
 test('held actual provider promise cannot renew original aborted parent or continue GH reads',async t=>{
  const f=await fixture();t.after(()=>f.mf.dispose());f.mode='held';
  const promise=f.stub.read('held-abort');const r=await promise;assert.equal(r.denied,true);assert.equal(f.requests.length,1);
  f.held?.();await new Promise(resolve=>setTimeout(resolve,50));assert.equal(f.requests.length,1);
 });
 test('unmodified production approval ceiling denies at expiry before all HTTP (SYN reader clock only)',async t=>{
  const f=await fixture({productionExpiry:true});t.after(()=>f.mf.dispose());assert.equal((await f.stub.read('normal')).denied,true);assert.equal(f.requests.length,0);
+});
+
+for(const mode of ['invalid-status','late-response'])test('I1 acquired bootstrap body retention '+mode,async()=>{
+ const f=await fixture();await checkBodyRetention(f,mode);
 });
```

### test/mcp-qa-finite-historical-source-native.test.mjs

```diff
diff --git a/test/mcp-qa-finite-historical-source-native.test.mjs b/test/mcp-qa-finite-historical-source-native.test.mjs
--- a/test/mcp-qa-finite-historical-source-native.test.mjs
+++ b/test/mcp-qa-finite-historical-source-native.test.mjs
@@ -1,10 +1,11 @@
+import {retentionImports,retentionMethods,checkBodyRetention,captureRetentionBuild} from './fixtures/finite-native-body-retention.mjs';
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {readFile} from 'node:fs/promises';
 import {build} from 'esbuild';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 import {restorationConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
 import {QA_CLOUD_CLOSED_PINS as REAL_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
 const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
 const ACCOUNT='85d0d5dadac3341a564f22ce885e9eec',APP='d6fc71552de7494a863aca20365a572d',VERSION='2607abae-cec3-4e35-89eb-8b8572262b54',QA='11111111-1111-4111-8111-111111111111';
@@ -57,21 +58,24 @@
   assert.equal(source.split(CEILING_DECLARATION).length,2,'production ceiling remains unchanged');
  }else{
   // Synthetic approval is renewed for the test bundle, never for production.
   // This also applies when historical pins remain real in the metadata negative.
   source=source.replace(CEILING_DECLARATION,'CEILING='+fixtureApproval);
   assert.equal(source.includes(CEILING_DECLARATION),false);
   assert.equal(source.split('CEILING='+fixtureApproval).length,2);
  }
  const entry=String.raw`import{DurableObject}from'cloudflare:workers';import{readPrivateQaFiniteHistoricalSource as read,qualifyFiniteInitialHistoricalBaseline as baseline}from'./lib/mcp-qa-finite-historical-source.mjs';import{createHash}from'node:crypto';import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';import{observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';
  export class Node extends DurableObject{}
+${retentionImports}
  export class History extends DurableObject{
+${retentionMethods("read({ctx:this.ctx,env:this.env},parent.lease)")}
+
  async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);return true;}
  async snapshot(){return[...await this.ctx.storage.list()];}
  async qualifyBaseline(metadata){
  try{const value=baseline(metadata);return{ok:true,keys:Object.keys(value).sort(),moduleHash:createHash('sha256').update(value.bytes).digest('hex'),moduleBytes:value.bytes.length,sourceRevision:value.sourceRevision,sourceTree:value.sourceTree,metadataProof:value.metadataProof};}
  catch(e){return{ok:false,message:e.message};}
  }
  async removeFixture(key){await this.ctx.storage.delete(key);}
  async read(mode='normal'){
  const controller=new AbortController(),parent=createFiniteOwnerRequestLease(new Request('https://fixture.invalid/',{signal:controller.signal}));let signalTimer;
  if(mode==='abort')signalTimer=setTimeout(()=>controller.abort(),5);
@@ -82,21 +86,22 @@
  // Test-only held continuation AFTER the REAL native transaction settles. This ctx
  // adapter is not a native source-identity fixture or permission witness.
  const actual=this.ctx.storage,ctx={id:this.ctx.id,storage:{transaction:async fn=>{const value=await actual.transaction(fn);await new Promise(resolve=>setTimeout(resolve,5500));return value;}}};
  const parent=createFiniteOwnerRequestLease(new Request('https://fixture.invalid/')),a={lease:parent.lease};
  try{await observeFiniteOwnerStageWork({ctx,env:this.env,admission:a,originalLease:parent.lease},()=>read({ctx,env:this.env},parent.lease));}catch{}finally{parent.finish();}
  async function tryEntry(env){const next=createFiniteOwnerRequestLease(new Request('https://fixture.invalid/'));let entered=false;try{await observeFiniteOwnerStageWork({ctx,env,admission:{lease:next.lease},originalLease:next.lease},async()=>{entered=true;});}catch{}finally{next.finish();}return entered;}
  const blocked=!(await tryEntry(this.env));await new Promise(resolve=>setTimeout(resolve,700));const released=await tryEntry(this.env);return JSON.stringify({blocked,released});
  }
  }export default{fetch(){return new Response(null,{status:404})}};`;
  const plugin={name:'explicit-synthetic-external-source-commitments',setup(b){b.onResolve({filter:/mcp-qa-finite-historical-source\.mjs$/},()=>({path:'historical-reader',namespace:'b2-source'}));b.onLoad({filter:/.*/,namespace:'b2-source'},()=>({contents:source,loader:'js',resolveDir:process.cwd()+'/lib'}));if(actualPins)return;b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...REAL_PINS,canary:x.pin})+';',loader:'js'}));}};
- const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin]});
+ const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin]});
+ await captureRetentionBuild('historical-source',built);
  const f={x,mf,requests:[],mode:'normal',delay:0,versionReads:0,fixtureApproval};
  await mf.setOptions(convertV4MiniflareOptions({...base,script:built.outputFiles[0].text,outboundService:async req=>{
  const u=new URL(req.url);f.requests.push(u.pathname);assert.equal(req.method,'GET');assert.equal(req.headers.get('Authorization'),'Bearer synthetic-native-reader');
  if(f.delay)await new Promise(r=>setTimeout(r,f.delay));
  let result;
  if(u.pathname.endsWith('/tokens/verify'))result={id:f.mode==='wrong-token'?'9db7901af95faf07e6f7ef378045328e':'9aa97ad1fc9afe3021cf69ea497d5190',status:'active',expires_on:f.mode==='expired-token'?'2020-01-01T00:00:00Z':new Date(fixtureApproval+60000).toISOString(),not_before:null};
  else{assert.equal(u.pathname,'/client/v4/accounts/'+ACCOUNT+'/workers/workers/'+x.pin.name+'/versions/'+VERSION);assert.equal(u.search,'?include=modules');result=structuredClone(x.metadata);f.versionReads++;
  if(f.mode==='defaults'||f.mode==='drift'&&f.versionReads%2===0){for(const e of Object.values(result.exports))e.state='created';result.exports.default.cache={enabled:false};result.cache_options={enabled:false,cross_version_cache:false};}
  if(f.mode==='transfer')result.exports.AfwOwnEventNode={...result.exports.AfwOwnEventNode,state:'expecting-transfer',transfer_from:'foreign'};
  if(f.mode==='cache-on')result.exports.default.cache={enabled:true};
@@ -211,11 +216,19 @@
   });
   assert.deepEqual(await f.stub.snapshot(),originalRows);
  }finally{await f.mf.dispose();}
 });
 for(const fault of ['receipt-version','source-link'])test('both historical consumers reject loaded '+fault+' commitment mismatch',async()=>{
  const f=await harness(false,null,fault);try{
   for(const response of [await f.stub.qualifyBaseline(f.x.metadata),await f.stub.read()]){
    assert.equal(response.ok,false);assert.equal(response.message,'Finite historical source unavailable:metadata');
   }
  }finally{await f.mf.dispose();}
+});
+
+for(const mode of ['invalid-status','late-response'])test('I1 acquired historical-source body retention '+mode,async()=>{
+ const f=await harness();await checkBodyRetention(f,mode);
+});
+
+test('B2 body retention positive baseline',async()=>{
+ const f=await harness();try{const r=await f.stub.read();assert.equal(r.ok,true,J(r));assert.equal(r.artifactBytes,Buffer.byteLength(f.x.script));assert.deepEqual(r.claims,[false,false,false,false]);}finally{await f.mf.dispose();}
 });
```

### test/mcp-qa-finite-initial-material-native.test.mjs

```diff
diff --git a/test/mcp-qa-finite-initial-material-native.test.mjs b/test/mcp-qa-finite-initial-material-native.test.mjs
--- a/test/mcp-qa-finite-initial-material-native.test.mjs
+++ b/test/mcp-qa-finite-initial-material-native.test.mjs
@@ -1,10 +1,11 @@
+import {retentionImports,retentionMethods,checkBodyRetention,captureRetentionBuild} from './fixtures/finite-native-body-retention.mjs';
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {gzipSync} from 'node:zlib';
 import {readFile} from 'node:fs/promises';
 import {build} from 'esbuild';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 import {bootstrapWorld,UUID,GH,CF} from './fixtures/finite-bootstrap-world.mjs';
 import {initialHistoryFixture,seedInitialHistory} from './fixtures/finite-initial-history-world.mjs';
 import {QA_CLOUD_CLOSED_PINS as realPins} from '../lib/mcp-qa-cloud-closed-pins.mjs';
@@ -22,21 +23,24 @@
  const created=new Date(Math.floor((Date.now()-1000)/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
  const approval=Date.now()+86400000;
  const f={mf,x,w,command,requests:[],mode,held:null,release:null,commandReads:0,approval};
  const entry=String.raw`
  import{DurableObject}from'cloudflare:workers';
  import{createPrivateQaFiniteInitialMaterial}from'./lib/mcp-qa-finite-initial-material.mjs';
  import{createFiniteInitialMaterialStore}from'./lib/mcp-qa-finite-initial-material-store.mjs';
  import{hashFiniteInitialMaterialRecord,initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';
  import{observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';
  export class Node extends DurableObject{}
+${retentionImports}
  export class Initial extends DurableObject{
+${retentionMethods("createPrivateQaFiniteInitialMaterial({ctx:this.ctx,env:this.env}).collect({commandId:9001},parent.lease)",true)}
+
  async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);}
  async snapshot(){return[...await this.ctx.storage.list()];}
  async run(mode='normal'){
   const abort=new AbortController(),entered=Date.now(),mono=performance.now(),end=entered+(mode==='held-parent'?120:30000);
   const lease=Object.freeze({signal:abort.signal,assertCurrent(){if(abort.signal.aborted||Date.now()>=end||performance.now()-mono>=end-entered)throw Error('parent expired');}});
   const timer=setTimeout(()=>abort.abort(),end-entered),storage=this.ctx.storage;
   const nativeTransaction=storage.transaction;
   if(mode==='held-parent')storage.transaction=(...args)=>Reflect.apply(nativeTransaction,storage,args).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));
   const producer=createPrivateQaFiniteInitialMaterial({ctx:this.ctx,env:this.env});
   let result;
@@ -118,21 +122,22 @@
   const s=await readFile('lib/'+p,'utf8');assert.equal(s.split(approvalDecl).length,2);sources.set(p,s.replace(approvalDecl,'CEILING='+approval));
  }
  const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
   b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
   b.onResolve({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({path:process.cwd()+'/lib/mcp-qa-finite-initial-material.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-(historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
   b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
   b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
   b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin})+';',loader:'js'}));
  }};
- const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
+ const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
+ await captureRetentionBuild('initial-material',built);
  await mf.setOptions(convertV4MiniflareOptions({...base,script:built.outputFiles[0].text,outboundService:async req=>{
   f.requests.push(req.url);assert.equal(req.method,'GET');
   let value;
   if(req.url.startsWith(GH)){
    assert.equal(req.headers.get('authorization'),null);value=structuredClone(await w.get(req.url.slice(GH.length)));
    if(req.url===GH+'/issues/comments/'+COMMAND){f.commandReads++;if(mode==='wrong-owner')value.user.id=1;if(mode==='wrong-repository')value.issue_url='https://api.github.com/repos/other/repo/issues/497';if(mode==='wrong-issue')value.issue_url=GH+'/issues/498';if(mode==='wrong-source')value.body=value.body.replace(M,'e'.repeat(40));if(mode==='wrong-qa')value.body=value.body.replace(UUID,'44444444-4444-4444-8444-444444444444');if(mode==='edited')value.updated_at=new Date(Date.parse(created)+1).toISOString();if(mode==='expired-command')value.created_at=value.updated_at=new Date(Date.now()-300001).toISOString();if(mode==='command-drift'&&f.commandReads===2)value.body+=' '; }
   }else{
    assert.equal(req.headers.get('authorization'),'Bearer synthetic-native-reader');
    let result;
    if(req.url===CF+'/tokens/verify')result={id:'9aa97ad1fc9afe3021cf69ea497d5190',status:'active',expires_on:new Date(approval+60000).toISOString(),not_before:null};
@@ -207,11 +212,15 @@
  }finally{await f.stub.releaseHold();await f.mf.dispose();}
 });
 
 test('T2 material native ownership keeps frozen script and mutable bytes fenced',async()=>{
  const f=await harness();try{
   const result=await f.stub.run();assert.equal(result.ok,true,J(result));
   for(const key of ['frozenOwnership','scriptWriteDenied','artifactWriteDenied','forgedScriptDenied','borrowedArtifactsDenied','sameOwnedContext','cloneDenied','otherDenied','otherLeaseDenied','mutatedDenied','expiredDenied'])assert.equal(result[key],true,key);
   assert.equal(result.scriptHash,f.resident.module.sha256);assert.equal(result.candidateBytes,f.resident.module.bytes);
   assert.deepEqual(result.claims,[false,false,false,false,false]);
  }finally{await f.mf.dispose();}
+});
+
+for(const mode of ['invalid-status','late-response'])test('I1 acquired initial-material body retention '+mode,async()=>{
+ const f=await harness();await checkBodyRetention(f,mode);
 });
```

### docs/superpowers/reports/2026-11-06-finite-native-response-body-retention-fix.md

```diff
diff --git a/docs/superpowers/reports/2026-11-06-finite-native-response-body-retention-fix.md b/docs/superpowers/reports/2026-11-06-finite-native-response-body-retention-fix.md
--- a/docs/superpowers/reports/2026-11-06-finite-native-response-body-retention-fix.md
+++ b/docs/superpowers/reports/2026-11-06-finite-native-response-body-retention-fix.md
@@ -0,0 +1,167 @@
+# Final whole-branch fix wave — acquired native response body retention
+
+Date: 2026-11-06 UTC. Status: DONE for Important I1 implementation and its bounded SOURCE/SYN qualification; Root's one scoped re-review remains the review gate. This report does not authorize merge or operation.
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=SOURCE/SYN GitHub+Actions; ORIGIN=GitHub connector; RESOURCE_TYPE=source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=one bounded final-review fix wave. ROLLBACK=only this wave's own commits with exact ref/blob checks, preserving all earlier evidence and history. No runtime effects, main merge, credentials, permissions, subscriptions, cron, Containers or support mail.
+
+## Frozen references and delivery
+
+- FIX_BASE: `8b2380c9bcc9c383ec46590df1403eed19fd2659`, tree `07079c8cc3670a6a1db51ca1daadbf3172c2d445`.
+- Requirements: `docs/superpowers/briefs/2026-11-06-finite-native-response-body-retention-fix.md` at Rootdocs `b2ee090b1d1a62059cb80b7601b140ca023cb08e`, blob `c8392e7647f65922c7758db97b6a0fa4ab49f1b8`.
+- Complete review: `docs/superpowers/reviews/2026-11-06-finite-native-whole-branch.es.md` at Rootdocs `b5fca44808c5c9c345ea5693527280fda1bc9ddd`, blob `5b7628e7effe5efbd440a9196d5f00a1167e67cf`.
+- RED checked-out Source: `85eee832e779df310f14423ceec637ef459b0dd2`, tree `75970081839ab9b494b49496928a45b6a563ed84`. Original three product blobs remained unchanged.
+- GREEN checked-out Source: `17c6f08f9e0b76a6ac239be05f5d887e37c49d8c`, tree `f25b309243efb17224e74ff342b39e959b7c55b5`.
+- Post-qualification cleanup HEAD (parent of this report's sole final commit): `2d15512dbce193f71ddaddad3cb24268b1b2ba77`, tree `907c6d9f20029359c942683c01cd1846ffd949da`. The temporary qualifier is absent.
+- Final delivered HEAD/tree are the commit/tree containing this report; their exact hashes are recorded in the final handoff after independent readback. A report cannot embed its own commit hash. No subsequent Source writes are planned.
+- Main independently re-read unchanged: `0c9c475b3ebaa970fc11d628b40e50a90cceb727`.
+
+Every Source write used the explicit existing branch and raw UTF-8 Contents API with the current file blob SHA. After every write: sole parent equals previous HEAD, exactly one changed path, independent exact content/blob readback, and branch ref equals new HEAD. Removal verified the entire untruncated tree and absence of the path. No unknown write, retry, force or alternate branch occurred. No Source writes occurred while either qualifier job was running.
+
+## Cause and minimal correction
+
+All three native initial readers acquired a Response, then checked the original lease/status/headers before assigning a reader. Their finally blocks only retained reader.cancel(), so a pre-reader rejection or late acquired response lost its body cancellation ownership.
+
+Each reader now holds the acquired response outside try and, if no reader exists and its acquired body is unlocked, passes the ACTUAL response.body.cancel() Promise to the existing stage-work retainer. Existing reader.cancel() tracking remains unchanged. The fallback does not call the expired business guard. Cancellation may start and settle after logical failure/abort; it grants no further business IO. The retainer tracks actual cancellation separately, so logical failure remains prompt and another root cannot enter the native ctx until pending physical work settles.
+
+Product diff: exactly three replaced lines in each of the three allowed modules; no other production path. No export, authority callback/factory, API, identity or stage-work change. The immutable script-SHA optimization, byte equality, schemas, profiles, entrypoints, native holders and success semantics remain intact.
+
+## Scope, exact blobs and protected comparison
+
+The additional test-only path `test/fixtures/finite-native-body-retention.mjs` avoids three copies of the same native cancel/root-exclusion orchestration. Root accepted this narrow fixture before writes. Three existing native harnesses import its generated DO methods and use their existing workerd/D1/DO setup. Build capture only records the exact test bundle/metafile when AFW_RETENTION_EVIDENCE is set. One small historical positive baseline was added; existing bootstrap and T2 material positives are reused.
+
+| Path | Before blob | After blob |
+| --- | --- | --- |
+| `lib/mcp-qa-finite-bootstrap-native.mjs` | `ac0d14ebb5a986e2611e9ddbd72592541c9a4c28` | `003b8cda2b723d3422f8f696302acc8f550b3477` |
+| `lib/mcp-qa-finite-historical-source.mjs` | `3f0bf487efd72aa2356fd9982f98a938d328e72d` | `855af60b2880d566f665a405cb3ab4fe8b9d369e` |
+| `lib/mcp-qa-finite-initial-material.mjs` | `c0ee5315563764979ed2c681c71b2dbc5515203d` | `8e2d3e4a75baabf1be5d12b6e2868ffc16599f78` |
+| `test/fixtures/finite-native-body-retention.mjs` | absent | `227b0009b5c48f205967621c924e4e3ffb72f105` |
+| `test/mcp-qa-finite-bootstrap-native.test.mjs` | `1b871f097eb8c1dc67f4cb8ff174b6970c2cf4e4` | `a92908b08417609ac5254645f131905368b4c141` |
+| `test/mcp-qa-finite-historical-source-native.test.mjs` | `a4464db2b94ad1b7825f032d3d54a8b990e881b8` | `e3080f8cb55ae618c8c10d74446b3a5db4205045` |
+| `test/mcp-qa-finite-initial-material-native.test.mjs` | `7f98bfe8cfe169ef1261f6c15ce9d08df9214d22` | `0482e11bfc875cc249d613e8c888a7fc6d55349b` |
+
+Complete recursive tree comparison at cleanup used every non-tree entry, SHA and mode, not a truncated compare: 3166 BASE entries, 3167 cleanup entries, 3160 unchanged, exactly the seven paths above changed/added. This report is the only subsequent addition. The protected set is the full BASE manifest minus the six existing modified paths; its complete path/blob mapping is reproducible at FIX_BASE and preserved in the qualification complete-tree manifests. No prior documentation/history was rewritten.
+
+Selected protected before=after blobs:
+
+- `lib/mcp-qa-finite-stage-work.mjs`: `a89baeb2578856dadedf700f9d66e180eb09120e`.
+- `lib/mcp-qa-finite-fixed-policy-engine.mjs`: `e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb`.
+- `lib/mcp-qa-finite-candidate-residency.mjs`: `29373312a0e60ed6ca87ca3952dba751186662a8`.
+- `lib/mcp-qa-finite-profile.mjs`: `547eb82f4ec83a2e7bcec88dd18622fc636dc477`.
+- `package.json`: `f4fd38ac380c46a149d8cf0f3bd828a28406f761`.
+- `package-lock.json`: `36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b`.
+
+Enrollment, P8/P9/P10, SDK, all other tests, schemas/stores/journals/records/profiles/build scripts/entrypoints/migrations are within the unchanged set.
+
+## Native causal qualification
+
+Both runs froze exactly three positive top-level tests and six negative/regression top-level tests, zero nested subtests. The runner verifies exact names/counts/exits, no skips/cancellations and, in RED, six cancellation-entry failure causes. A green expected-failure job is not a product GREEN result.
+
+Positive names:
+- actual workerd DO reader returns bounded bridge facts with direct/source authority false
+- B2 body retention positive baseline
+- T2 material native ownership keeps frozen script and mutable bytes fenced
+
+Regression names:
+- I1 acquired bootstrap body retention invalid-status
+- I1 acquired bootstrap body retention late-response
+- I1 acquired historical-source body retention invalid-status
+- I1 acquired historical-source body retention late-response
+- I1 acquired initial-material body retention invalid-status
+- I1 acquired initial-material body retention late-response
+
+Commands (Node v22.23.4, npm 10.9.9):
+
+```sh
+npm ci --ignore-scripts --no-audit --no-fund
+/opt/hostedtoolcache/node/22.23.4/x64/bin/node --test --test-concurrency=1 --test-reporter=tap '--test-name-pattern=^(actual workerd DO reader returns bounded bridge facts with direct/source authority false|B2 body retention positive baseline|T2 material native ownership keeps frozen script and mutable bytes fenced)$' test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs test/mcp-qa-finite-initial-material-native.test.mjs
+/opt/hostedtoolcache/node/22.23.4/x64/bin/node --test --test-concurrency=1 --test-reporter=tap '--test-name-pattern=^(I1 acquired bootstrap body retention invalid-status|I1 acquired bootstrap body retention late-response|I1 acquired historical-source body retention invalid-status|I1 acquired historical-source body retention late-response|I1 acquired initial-material body retention invalid-status|I1 acquired initial-material body retention late-response)$' test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs test/mcp-qa-finite-initial-material-native.test.mjs
+npx eslint lib/mcp-qa-finite-bootstrap-native.mjs lib/mcp-qa-finite-historical-source.mjs lib/mcp-qa-finite-initial-material.mjs test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs test/mcp-qa-finite-initial-material-native.test.mjs test/fixtures/finite-native-body-retention.mjs
+```
+
+The two Node commands are identical in RED/GREEN. Lint runs only in GREEN and exited 0 with empty diagnostic output. No package-wide/full-suite/167-case rerun was performed.
+
+| Run / group | Actual top-level tests | Pass | Fail | Exit | Actual UTC interval |
+| --- | ---: | ---: | ---: | ---: | --- |
+| RED positive | 3 | 3 | 0 | 0 | 2026-11-06T17:48:51.973Z → 2026-11-06T17:48:56.699Z |
+| RED regression | 6 | 0 | 6 | 1 | 2026-11-06T17:48:56.699Z → 2026-11-06T17:49:15.705Z |
+| GREEN positive | 3 | 3 | 0 | 0 | 2026-11-06T17:51:29.955Z → 2026-11-06T17:51:33.446Z |
+| GREEN regression | 6 | 6 | 0 | 0 | 2026-11-06T17:51:33.446Z → 2026-11-06T17:51:39.541Z |
+
+All four test command executions: suites0, nested subtests0, cancelled0, skipped0, todo0. TAP duration_ms: RED positive4687.763688; RED regression18961.192426; GREEN positive3466.280599; GREEN regression6067.714531. Nine behaviors per revision, not eighteen unique behaviors or six plus a fictitious parent. No zero-match/pseudo-file PASS.
+
+Each negative starts from a fresh native ctx. Valid original Root and production adapter validation reach the first fetch. No consumed positive lineage, forged source authority, signature/expiry rejection or seeded phase ACK serves as the positive premise. The material path uses its actual available/candidate path and its own production observation scope. Bootstrap/historical are wrapped in the same internal stage-work ownership semantics as their production composition. The probe is a different, currently LIVE native Root in the SAME ctx, with a new observation admission; it tests lifetime bookkeeping, never grants publication authority.
+
+A native workerd Response wraps a native ReadableStream. The stream's actual cancellation returns a held Promise. The test observes the actual body.cancel() return Promise and returns that exact Promise to production, without resolved substitutes. The late-response variant aborts/finishes the original Root while native acquisition is held, observes prompt logical denial before acquisition, then releases the response. Cleanup releases acquisition/cancel in finally and disposes Miniflare even if assertions fail. No real network/Cloudflare account request occurs; fetch timing and provider DATA are explicitly SYN.
+
+RED actual failure outputs, in the six frozen regression-name order:
+
+```text
+  error: 'required acquired-body cancellation entry: {"mode":"invalid-status","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true,"error":"Finite QA bootstrap native evidence unavailable"}'
+  error: 'required acquired-body cancellation entry: {"mode":"late-response","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true,"error":"Finite QA bootstrap native evidence unavailable"}'
+  error: 'required acquired-body cancellation entry: {"mode":"invalid-status","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true,"error":"Finite historical source unavailable:http"}'
+  error: 'required acquired-body cancellation entry: {"mode":"late-response","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true,"error":"Finite historical source unavailable:deadline"}'
+  error: 'required acquired-body cancellation entry: {"mode":"invalid-status","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true}'
+  error: 'required acquired-body cancellation entry: {"mode":"late-response","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true}'
+```
+
+Thus every original-code failure occurred after valid native entry and actual response acquisition, with readerCalls0 and cancelEntered0. The three positive baselines had passed first. These are causal I1 failures, not harness/import/setup failures.
+
+GREEN actual observations, in the same six-name order:
+
+```text
+# I1_NATIVE {"mode":"invalid-status","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
+# I1_NATIVE {"mode":"late-response","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
+# I1_NATIVE {"mode":"invalid-status","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
+# I1_NATIVE {"mode":"late-response","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
+# I1_NATIVE {"mode":"invalid-status","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
+# I1_NATIVE {"mode":"late-response","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
+```
+
+Each assertion sequence confirms logical denial, cancel entry, the actual cancel Promise still pending, rejection of another LIVE root specifically with `Finite stage work remains outstanding`, unchanged native storage, exactly one fetch/no subsequent business IO, actual cancellation settlement, then admission of a fresh root. The acquired-body cancel survives original Root abort. Disposal is not used as proof of physical settlement.
+
+## Clocks, graphs and source identity limits
+
+Production Root<=30000ms and child<=5000ms remain unchanged and clipped by original parent guards. Tests use createFiniteOwnerRequestLease and its actual native Root; late acquisition is induced by original Root finish/abort, not by renewing its clock. Cancellation polling cap2000ms; each Node command300000ms maximum; lint120000ms; job15min maximum. Actual groups completed within the intervals above.
+
+The pre-existing native harnesses replace only their test-bundle approval datum with an explicit SYN future ceiling; production source3Nov02:59UTC remains operationally expired. Source/Access/I0/C0/C1 receive no renewal. C0=I0+900000 and C1=C0+180000 remain unchanged. No Identity/Access/live custody validity is asserted.
+
+The test bundles compile the fixed current Source, not an older M/QA bundle. Full scripts and esbuild metafiles for all nine builds per revision are in the artifacts. Input graph sizes remain192/206/216 for bootstrap/historical/material respectively. Hashes below are SYN test bundle hashes, which also incorporate per-fixture clock/DATA; they are not a deterministic product-only M hash or deployed QA provenance.
+
+| Test | Inputs | RED bundle SHA256 | GREEN bundle SHA256 |
+| --- | ---: | --- | --- |
+| actual workerd DO reader returns bounded bridge facts with direct/source authority false | 192 | `31244ab6fbc862b31130d28a1f2bf4db274b671778df4864d60debd8c22d9083` | `e8ccadd43227b346ae06374f5da95b824ddac09b2f21a9704decac993ccbf540` |
+| B2 body retention positive baseline | 206 | `e8c68a129ae6ac3ea94139f8b4ae1d76278d854d49dfd2933a36d11e4cb349cf` | `21657b1c4fd05bdb6d11bce22576d5ae957da27a36c1ae81337baa4f0547be67` |
+| T2 material native ownership keeps frozen script and mutable bytes fenced | 216 | `6fa56646a3c293695f5910ac080698153cc8eee7c653690bfacade5efb6040a0` | `ccbc56b8222905745781d5e0522dde36340397c45ce91624d49bd748f29681ac` |
+| I1 acquired bootstrap body retention invalid-status | 192 | `766e5cb42347516b0114c0075c51a0782710428e9e532d1ed5ea2c3ba6a1ee22` | `d6a6190c9bcfe12eee073d720c8183abde668c0ce3bf03adb7fbb89a5533d78f` |
+| I1 acquired bootstrap body retention late-response | 192 | `ab99457be6b21f910955cf6481e15cc4b82a46cae5839c64841691346c8c9a77` | `b5809923f2d06e2a28475d1b3504bf1cd1b22fb1f80448b718f1deea784a15a4` |
+| I1 acquired historical-source body retention invalid-status | 206 | `7db8d83eaa417db049aec1aa547bd396025cc88e22259e712b019970886675e9` | `bd1c3b3acefcc52ca82a005a87a92c0d951b7bee4789d98db41835d996b2aae3` |
+| I1 acquired historical-source body retention late-response | 206 | `16155912c371c5e23f6e09e975e1503f0d50a033b8381bee6a671f588d29bcac` | `6eafb0fcc47e2a837c0e6e18f442cd79401277502ec1ced44dc29b89855f56de` |
+| I1 acquired initial-material body retention invalid-status | 216 | `1f6727a425f25485b247e8cbb2da735752d76eecdd76840771308875234332c0` | `7289f23d40d06fb8cca2e6a8da720e9124700275e141eaae95f91ffdd4186d7e` |
+| I1 acquired initial-material body retention late-response | 216 | `18457e67c5788232b84510030ee2aee5148edce6b1c086211383c33a43347c7e` | `4fb1e5dbc602b35dfd3cbb2f4a132fd13d51329acb3435d51be586538cf29c7b` |
+
+The three edited readers necessarily change any generated M/QA artifact that includes their bytes. No full M/QA distribution build or unrelated chronology assertion was run/modified; no claim that old literal c493 remains current. The bounded native graph evidence is the only new build qualification. Prior 167-positive evidence remains at its original D11 revision. Any later full candidate package must derive its own current graph/hash, never reuse the pre-fix bundle.
+
+## Workflow and artifacts
+
+Temporary path: `.github/workflows/afw-native-body-retention-qualification.yml`; push restricted to this existing Source branch and this workflow path; contents:read; persist-credentials:false; no project secrets; Node22; one bounded job per phase. No redistribution or rerun.
+
+- RED [run42264969077](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42264969077), job128054380876, trigger `f64d5d6467c9b43248f15055b6f2c30eb16b4f35`, workflow blob `b2305c4892f36bf8d7c74e563e8ee7fa970ac7ad`; checkout `85eee832e779df310f14423ceec637ef459b0dd2`. Job success means the six intended RED failures were verified.
+- GREEN [run42265404365](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42265404365), job128055890788, trigger `14a4a2557a3086a9ff7ebdbc43221d14b6d93daa`, workflow blob `07815676ac766e38183de0ad93ee614d24c436e7`; checkout `17c6f08f9e0b76a6ac239be05f5d887e37c49d8c`. Job success verifies3positive+6regression PASS and lint0.
+- RED [artifact13526886640](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42264969077/artifacts/13526886640):728959bytes; `sha256:e2f92d6fdaa95e41e7fccabe3948c6c7cc05ef269086afa71fa6e25d7b67a05b`; expires2026-11-13T17:49:15Z.
+- GREEN [artifact13525818787](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42265404365/artifacts/13525818787):729180bytes; `sha256:f5846d843cd1dbfb4e06e00393bd46d931f8a261aa9f7782eb3e467b465fc970`; expires2026-11-13T17:51:41Z.
+- Artifact contents include exact source revision/tree, complete Git tree manifest, affected/protected source copies, package locks, full test bundles/metafiles, executable qualifier, frozen spec, TAP, results, timestamps and SHA256SUMS. Digests/expiration were independently read from GitHub metadata. Artifacts were not downloaded or extracted locally.
+- Qualifier removal `2d15512dbce193f71ddaddad3cb24268b1b2ba77` independently verified sole parent `14a4a2557a3086a9ff7ebdbc43221d14b6d93daa`, sole removed path/blob and absence from its complete tree. Product/test blobs remain exactly GREEN-qualified.
+
+## Warnings, concerns and handoff
+
+Observed non-fatal dependency/runner warnings: @esbuild-kit/esm-loader2.6.5 and core-utils3.3.2 deprecated; eslint9.39.4 unsupported warning; Actions punycode DEP0040 and url.parse DEP0169; v4 Actions target Node20 and runner forces Node24. Project tests used Node22.23.4. No dependency upgrade or warning suppression was attempted.
+
+One read-only request for job logs while RED was still active returned404 BlobNotFound; no mutation/retry was inferred. Terminal logs and metadata were subsequently available and inspected. No qualification/setup failure or second RED/GREEN job occurred.
+
+The three Minor findings M-I/M-II/M-III and historical M1/M2 unknowns remain deferred exactly as ruled by Root. M4 remains closed by the prior review. I1 implementation has causal RED/GREEN evidence; this report does not pre-approve Root's scoped re-review. No extra helpers/reviewers were spawned and no incidental Minor was fixed. Root owns the complete FIX_BASE→finalHEAD package and ONE scoped re-review.
+
+Ruling applied: Root's existing final-review authorization permits the smallest three-reader correction despite prior Task3 isolation; shared test-only fixture accepted to avoid duplicated native orchestration. Cost if that scope judgment were wrong: a broader authority/clock/success change could escape the focused case; exact three-line product deltas, complete protected-tree comparison, unaffected positives and Root's scoped re-review constrain that risk. No new operational authority was inferred.
+
+All project read/edit/build/test work stayed in GitHub connector/Actions. Only small local skill metadata was read; no local checkout, dependency install, build, test, container or artifact download.
+
+operationalReadiness=false; completePackage=false; PCoff=false. This is closed SOURCE/SYN evidence, not live API, deployment, subscription, useful delivery, autonomous restoration or PC-off proof. Source writes STOP after the final report readback and handoff.
```

### test/fixtures/finite-native-body-retention.mjs

```diff
diff --git a/test/fixtures/finite-native-body-retention.mjs b/test/fixtures/finite-native-body-retention.mjs
--- a/test/fixtures/finite-native-body-retention.mjs
+++ b/test/fixtures/finite-native-body-retention.mjs
@@ -0,0 +1,107 @@
+import assert from 'node:assert/strict';
+import {mkdir,writeFile} from 'node:fs/promises';
+import {createHash} from 'node:crypto';
+let buildNumber=0;
+export async function captureRetentionBuild(kind,built){
+ if(!process.env.AFW_RETENTION_EVIDENCE)return;
+ const prefix=process.env.AFW_RETENTION_EVIDENCE+'/'+kind+'-'+process.pid+'-'+(++buildNumber);
+ await mkdir(process.env.AFW_RETENTION_EVIDENCE,{recursive:true});
+ await writeFile(prefix+'.metafile.json',JSON.stringify(built.metafile,null,2));
+ await writeFile(prefix+'.mjs',built.outputFiles[0].text);
+ console.log('I1_BUNDLE '+JSON.stringify({kind,sha256:createHash('sha256').update(built.outputFiles[0].text).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
+}
+
+
+// Test-only native workerd boundary. Provider timing/data are SYN; holders,
+// Root, Response/ReadableStream and cancellation promises remain actual native.
+export const retentionImports=`
+import {createFiniteOwnerRequestLease as retentionRoot} from './lib/mcp-qa-finite-owner-preparation.mjs';
+import {observeFiniteOwnerStageWork as retentionScope} from './lib/mcp-qa-finite-stage-work.mjs';
+`;
+export function retentionMethods(call,ownsScope=false){
+ return `
+ async bodyRetentionStart(mode){
+  if(!['invalid-status','late-response'].includes(mode))throw Error('SYN mode');
+  const parent=retentionRoot(new Request('https://fixture.invalid/'));
+  const s=this.retention={parent,mode,fetchEntered:0,acquired:0,readerCalls:0,cancelEntered:0,cancelSettled:false,logicalDenied:false,rootAborted:false};
+  const nativeFetch=globalThis.fetch;
+  s.nativeFetch=nativeFetch;
+  const held=new Promise(resolve=>{s.releaseCancel=resolve;});
+  globalThis.fetch=async()=>{
+   s.fetchEntered++;if(s.fetchEntered!==1)throw Error('Unexpected following IO');
+   parent.lease.assertCurrent();s.validAtFetch=true;
+   if(mode==='late-response')await new Promise(resolve=>{s.releaseAcquisition=resolve;});
+   const body=new ReadableStream({cancel(){s.cancelEntered++;return held;}});
+   const nativeCancel=body.cancel,nativeReader=body.getReader;
+   body.cancel=(...args)=>{const actual=Reflect.apply(nativeCancel,body,args);s.cancelPromise=actual;actual.then(()=>{s.cancelSettled=true;},()=>{s.cancelSettled=true;});return actual;};
+   body.getReader=(...args)=>{s.readerCalls++;return Reflect.apply(nativeReader,body,args);};
+   const response=new Response(body,{status:mode==='invalid-status'?503:200,headers:{'Content-Type':'application/json',Date:new Date().toUTCString()}});
+   s.nativeResponse=response instanceof Response;s.nativeStream=response.body===body;s.acquired++;
+   return response;
+  };
+  try{
+   const operation=()=>@CALL@;
+   const result=await @OPERATION@;
+   s.logicalDenied=result?.status==='admin_pending';
+  }catch(e){s.logicalDenied=true;s.error=e.message;}
+  finally{parent.finish();s.rootAborted=parent.lease.signal.aborted;}
+  return this.bodyRetentionState();
+ }
+ bodyRetentionState(){
+  const s=this.retention;if(!s)return null;
+  return Object.fromEntries(['mode','fetchEntered','acquired','readerCalls','cancelEntered','cancelSettled','logicalDenied','rootAborted','validAtFetch','nativeResponse','nativeStream','error'].filter(k=>s[k]!==undefined).map(k=>[k,s[k]]));
+ }
+ bodyRetentionAbort(){this.retention.parent.finish();}
+ bodyRetentionAcquire(){this.retention.releaseAcquisition?.();}
+ async bodyRetentionProbe(){
+  const parent=retentionRoot(new Request('https://fixture.invalid/'));let entered=false,error;
+  parent.lease.assertCurrent();const live=!parent.lease.signal.aborted;
+  try{await retentionScope({ctx:this.ctx,env:this.env,admission:{lease:parent.lease},originalLease:parent.lease},async()=>{entered=true;});}catch(e){error=e.message;}finally{parent.finish();}
+  return{live,entered,error};
+ }
+ async bodyRetentionRelease(){
+  const s=this.retention;if(!s)return null;
+  s.parent.finish();s.releaseAcquisition?.();s.releaseCancel();
+  if(s.cancelPromise)await s.cancelPromise;
+  await new Promise(resolve=>setTimeout(resolve,10));
+  globalThis.fetch=s.nativeFetch;
+  return this.bodyRetentionState();
+ }
+ async bodyRetentionRows(){return [...await this.ctx.storage.list()];}
+`.replace('@CALL@',()=>call).replace('@OPERATION@',()=>ownsScope?'operation()':'retentionScope({ctx:this.ctx,env:this.env,admission:{lease:parent.lease},originalLease:parent.lease},operation)');
+}
+
+async function until(stub,predicate,label){
+ const end=Date.now()+2000;let state;
+ do{state=await stub.bodyRetentionState();if(predicate(state))return state;await new Promise(r=>setTimeout(r,10));}while(Date.now()<end);
+ assert.fail(label+': '+JSON.stringify(state));
+}
+export async function checkBodyRetention(f,mode){
+ let running;const before=await f.stub.bodyRetentionRows();
+ try{
+  running=f.stub.bodyRetentionStart(mode);
+  const entered=await until(f.stub,s=>s?.fetchEntered===1,'valid native fetch entry');
+  assert.equal(entered.validAtFetch,true);
+  if(mode==='late-response'){
+   await f.stub.bodyRetentionAbort();
+   const denied=await running;assert.equal(denied.logicalDenied,true);assert.equal(denied.acquired,0);
+   const held=await f.stub.bodyRetentionProbe();assert.equal(held.live,true);assert.equal(held.entered,false);
+   await f.stub.bodyRetentionAcquire();
+  }else{assert.equal((await running).logicalDenied,true);}
+  const acquired=await until(f.stub,s=>s.acquired===1,'actual Response acquisition');
+  assert.equal(acquired.nativeResponse,true);assert.equal(acquired.nativeStream,true);
+  assert.equal(acquired.rootAborted,true);assert.equal(acquired.readerCalls,0);
+  const cancelled=await until(f.stub,s=>s.cancelEntered===1,'required acquired-body cancellation entry');
+  assert.equal(cancelled.logicalDenied,true);assert.equal(cancelled.cancelSettled,false);
+  const excluded=await f.stub.bodyRetentionProbe();
+  assert.equal(excluded.live,true);assert.equal(excluded.entered,false,'different LIVE root excluded until actual cancel settlement');
+  assert.equal(excluded.error,'Finite stage work remains outstanding');
+  assert.deepEqual(await f.stub.bodyRetentionRows(),before,'no publication or subsequent storage write');
+  assert.equal((await f.stub.bodyRetentionState()).fetchEntered,1,'no following business IO');
+  const settled=await f.stub.bodyRetentionRelease();assert.equal(settled.cancelSettled,true);
+  const released=await f.stub.bodyRetentionProbe();assert.equal(released.live,true);assert.equal(released.entered,true,'new scope only after actual cancellation settles');
+  console.log('I1_NATIVE '+JSON.stringify({mode,acquired:1,readerCalls:0,cancelEntered:1,logicalDenied:true,pendingExcluded:true,settled:true,released:true,fetches:1,storageUnchanged:true}));
+ }finally{
+  try{await f.stub.bodyRetentionRelease();if(running)await running;}finally{await f.mf.dispose();}
+ }
+}
```

