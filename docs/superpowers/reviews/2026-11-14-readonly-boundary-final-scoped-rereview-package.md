# ONE scoped rereview of accepted four readonly-boundary final-review fixes

Scope: review only accepted I1–I4 and their regression tests/coupled qualifier/Native pins and actual evidence below. One aggregate final-fix wave, then this ONE scoped rereview. Do not perform a second broad review. No new feature/workstream or provider/runtime/PCoff assessment. Report Critical/Important/Minor residuals, exact finding→fix/repro mapping, declined-to-judge gaps, final scoped verdict. Do not edit Source, move refs, run Source locally or cloud, access secrets/Native private logs, or spawn subagents. You may read precise public GitHub pinned source/metadata to corroborate. Any unknown outside scope remains unknown, not a completion claim.

Base Source87bbab1ea53ade7d385aa58a72f1a3066260ddf3 has D ea30/28566, old test5ebe/19584 and accepted historical R1 pair. Current fixed D0c351/28993 preserves old16114B prefix exact; only readonly region changes. Current correctedtestdcd8/23473; R/P/World/Native/custody/lock/old36 immutable. No Native R1 rerun for telemetry fixes. Source stays isolated, no Main merge; business16/operationalReadiness/PCoff all unresolved. Root own receipt validator independently aligned commandunknown/custody implications and revalidated historicalR1 pair unchangedhash. Actual qualification after this package's code section will be appended when terminal/restored.

## Original aggregate final review and Root adjudication
# Whole-plan final review — readonly boundary observations

Reviewer gpt-6-astra/xhigh, read-only. Reviewed complete1503linepackage428b994d1e06b11ba0060acc9fccbed4a6ea7066/docs/superpowers/reviews/2026-11-14-readonly-boundary-plan-final-review-package.md plusplan/spec; onefocusedlegacyprojectorcheck. Source87bbab1ea53ade7d385aa58a72f1a3066260ddf3. Verdict diagnosticdelta NEEDS FIXES, C0/I4/M0. No runs/mutations.

## Strengths
RealNode22fixtures coverthreefailpoints/latefileordinal1/emptyfile; actual86positive+negative19 proof. Focused3active/8declaredrun43625982576 all8terminal beforeoriginalF7restore; literalR1not_ok/othersunknown/countsnull/all7false.

## Important findings — complete aggregate list
1. D test/fixtures/finite-budget-stage-observer.mjs:259 sendsFULLcommandTAP tooldprojectLogText. LFpropertyafterfirstfailure caninject literal AFW_SYN_FAILURE/1 {"code":"EACCES","site":"unknown"} andpublishfalse logs[0].code despitepureTAPstop. Readonlycommand mustretainavailabilitybutalwaysunknowncode/site, no fullTAPgeneralprojection. Validatorrequiresinvariant; realLFproperty/fullpairregression.
2. D:205 acceptsok1-native_file+details thennotok2-R2, exitsfirst_failurebeforefinalfileonlycheck. FalseR2attribution causesvalidatorrejectentirepair/independentobservationslost. Afterseeingnative_fileok rejectanylatercaserow→wholeTAPunknown beforeearlyreturn; addregression.
3. D:293 requiresMapkeysresultthenmanifest order. ValidZIPcentraldirectorymanifestfirst shouldwork. Validateexact2namesbyname/set/orderindependent; bothpermutationsidenticalbytesregression.
4. D:296 acceptssealavailable/codeEACCES withcustodyobservedguardrecord_bytes aftermanifestrepack, despiteproducerrequirescodecustody_limit. Enforceobserved⇒sealavailable+codecustody_limit; codecustody_limit⇒state≠not_observed. Allowunknownambiguousfail20only. Crossfieldregressions.

## Declined to judge
- R1businesscause: requiresadditionalevidence. Rootruling: preserveR1observation/causeunknown; nextcausespecificplanAFTERthisunitfix/review, no blindedbudget/cap/credentialchanges. Costifwrong: delaydiagnosis, no falsefix.
- Productreadiness/PCoff/globaldrain/realproviderstate: outsideclosedSYN. Rootruling: all7false/remainpending; actualfuturegatesseparate. Costifwrong: conservativeunderclaim, notunauthorizedactivation.

## Root adjudication / fix release
Acceptall4Important withconcreterepros; ONEaggregatefixworker, notper-finding. No parked/minorfindings. Fix ONLYnewreadonlyDregion/tests +Sourcequalifier/pinripples/SAMEappend; old16114BDprefix/old36/P/runtime/World/Native/custody/lock andbusinesscaps/commands unchanged. OnezeroAFWkeyqualificationafterRootgate, thenONEscopedrereview(no secondbroadreview/fixwave). CurrentR1receiptunknowncommandcode/site+custodyabsent remainsvalid/newinvariants; preservehashes/history, noNativeR1rerun justforthesefixes. Rootreceiverwillenforceinvariantstoo. NoMainmerge/provider/runtime/OAuth/permission/key/customer/Max release. Source87bbclosed.


## Exact D diff (new readonly region only)
```diff
@@ -197,9 +197,9 @@
    }
    if(line.startsWith('# Subtest: ')){assert(plan===null&&!announced&&!details);const id=tapId(line.slice(11));assert(id&&!seen.has(id));announced=id;details=false;continue;}
    const row=/^(ok|not ok) ([1-4]) - (.*?)(?: # (SKIP|TODO)(?: .*)?)?$/.exec(line);
    if(row){
-    assert(plan===null&&!details);const id=tapId(row[3]),ordinal=Number(row[2]),directive=row[4]?.toLowerCase()??'none';
+    assert(plan===null&&!details&&!seen.has('native_file'));const id=tapId(row[3]),ordinal=Number(row[2]),directive=row[4]?.toLowerCase()??'none';
     assert(id&&!seen.has(id)&&(announced===null||announced===id));
     const lateFile=id==='native_file'&&cases.slice(0,3).every(r=>r.result==='ok')&&seen.size===3&&row[1]==='not ok';
     assert(ordinal===next||lateFile&&ordinal===1);
     if(id==='native_file')assert(seen.size===0||lateFile);else same(id,'R'+next);
@@ -250,14 +250,15 @@
   return custodyUnknown();
  }catch{return custodyUnknown();}
 }
 // Explicit synthetic root/IO boundary. Each fixed log is opened ONCE, then the
-// same captured text supplies both old and new public observations.
+// same captured text supplies the public observations. Command TAP is only
+// interpreted by the pure prefix projector, never the general log projector.
 export async function collectOwnedReadonlyLogRoot(root,P,io=fs){
  let safe=true;try{await controlledRoot(root,io);}catch{safe=false;}
  const reads=[],logs=[],observations=[];
  for(const [log,name]of FILES){
-  const read=safe?await readOwned(root,name,io):{availability:'unsafe'},v=read.availability==='available'?projectLogText(read.text,P):{failure:unknown(),stage:unknownStage(),http:null};
+  const read=safe?await readOwned(root,name,io):{availability:'unsafe'},v=read.availability==='available'&&log!=='command'?projectLogText(read.text,P):{failure:unknown(),stage:unknownStage(),http:null};
   reads.push(read);logs.push({log,availability:read.availability,code:v.failure.code,site:v.failure.site});observations.push(v);
  }
  const project=(read,fn,absent,uncertain)=>read.availability==='missing'?absent():read.availability==='available'?fn(read.text):uncertain();
  const metadata=observations[2],count=logs[3];
@@ -289,10 +290,10 @@
  const P=await projector(),pair=makeReadonlyPair({context,job,rawOutcome,observation:await collectOwnedReadonlyLogRoot(join(e.RUNNER_TEMP,'afw-native-private','logs'),P)});validateFixedReadonlyPairWithProjector(pair,context,job,P);return pair;
 }
 export async function validateFixedReadonlyPair(files,context,job){return validateFixedReadonlyPairWithProjector(files,context,job,await projector());}
 export function validateFixedReadonlyPairWithProjector(files,context,job,P){
- validateContext(context);same(job,'readonly');assert(files instanceof Map);same([...files.keys()],['result.json','manifest.json']);assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=16384);
+ validateContext(context);same(job,'readonly');assert(files instanceof Map&&files.size===2&&files.has('result.json')&&files.has('manifest.json'));assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=16384);
  const read=b=>{const text=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(text);assert(canonical(v).equals(b));return v;};
  const value=read(files.get('result.json')),manifest=read(files.get('manifest.json'));fields(value,['purpose','context','job','rawOutcome','logs','stage','http','countCheck','tap','custodyLimit','nonclaims']);same(value.purpose,'afw.readonly-boundary-observations.syn.v1');
- const old={purpose:'afw.sanitized-stage-observations.syn.v1',context:value.context,job:value.job,rawOutcome:value.rawOutcome,logs:value.logs,stage:value.stage,http:value.http,countCheck:value.countCheck,nonclaims:value.nonclaims};validateValue(old,context,job,P);validateTap(value.tap);validateCustody(value.custodyLimit);for(const [index,key,absent,uncertain]of [[0,'tap',tapAbsent,tapUnknown],[1,'custodyLimit',custodyAbsent,custodyUnknown]]){if(value.logs[index].availability==='missing')same(value[key],absent());else if(value.logs[index].availability!=='available')same(value[key],uncertain());}
+ const old={purpose:'afw.sanitized-stage-observations.syn.v1',context:value.context,job:value.job,rawOutcome:value.rawOutcome,logs:value.logs,stage:value.stage,http:value.http,countCheck:value.countCheck,nonclaims:value.nonclaims};validateValue(old,context,job,P);same({code:value.logs[0].code,site:value.logs[0].site},unknown());validateTap(value.tap);validateCustody(value.custodyLimit);if(value.custodyLimit.state==='observed'){same(value.logs[1].availability,'available');same(value.logs[1].code,'custody_limit');}if(value.logs[1].code==='custody_limit')assert(value.custodyLimit.state!=='not_observed');for(const [index,key,absent,uncertain]of [[0,'tap',tapAbsent,tapUnknown],[1,'custodyLimit',custodyAbsent,custodyUnknown]]){if(value.logs[index].availability==='missing')same(value[key],absent());else if(value.logs[index].availability!=='available')same(value[key],uncertain());}
  fields(manifest,['purpose','context','job','files']);same(manifest.purpose,'afw.readonly-boundary-observations.manifest.syn.v1');same(manifest.context,context);same(manifest.job,job);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;
 }

```

## Exact test diff from accepted Task1 test
```diff
@@ -31,6 +31,7 @@
 if(mode==='before')throw new Error(canary);
 if(mode!=='empty')for(let n=1;n<=3;n++)await test('R'+n+' fixed original SDK readonly budget',()=>{
  if(mode==='fail'+n||mode==='failed_late'&&n===2)throw new Error(canary);
+ if(mode==='marker'&&n===2){const key='injected\nAFW_SYN_FAILURE/1 {"code":"EACCES","site":"unknown"}\ninert';throw new assert.AssertionError({actual:{[key]:canary},expected:null,operator:'fail',message:canary});}
  if(mode==='poison'&&n===2){const key='injected\n  code: PRIVATE\n  stack: |-\nnot ok 3 - R3 fixed original SDK readonly budget\n1..4';const e=new assert.AssertionError({actual:{[key]:canary},expected:{[key]:canary+'2'},operator:'deepStrictEqual',message:canary});Object.defineProperty(e,key,{value:canary,enumerable:true});throw e;}
 });
 if(mode==='late'||mode==='failed_late')setImmediate(()=>{throw new Error(canary);});
@@ -58,14 +59,18 @@
 test('b06_real_late_file_repeated_one',async()=>{const text=await real('late');assert.deepEqual([...text.matchAll(/^(?:not )?ok ([1-4]) - /gm)].map(m=>Number(m[1])),[1,2,3,1]);assert.match(text,/^1\.\.4$/m);const v=D.projectReadonlyTap(text);assert.equal(v.state,'first_failure');assert.deepEqual(v.cases,ids.map((id,n)=>row(id,n===3?'not_ok':'ok')));assert.equal(v.counts,null);});
 test('b07_real_failed_case_late_file_suppressed',async()=>{const text=await real('failed_late');assert(!new RegExp('^(?:not )?ok [1-4] - '+file.replaceAll('.','\\.')+'$','m').test(text));first(D.projectReadonlyTap(text),2);assert.equal(D.projectReadonlyTap(text).cases[3].result,'unknown');});
 test('b08_real_empty_file',async()=>{const v=D.projectReadonlyTap(await real('empty'));assert.equal(v.state,'complete');assert.equal(v.cases.slice(0,3).filter(r=>r.result==='ok').length,0);assert([0,1].includes(v.counts.tests));if(v.counts.tests===1){assert.equal(v.cases[3].result,'ok');assert.equal(v.counts.pass,1);}else assert(v.cases.every(r=>r.result==='not_observed'));});
-test('b09_real_multiline_enumerable_poison',async()=>{const text=await real('poison');assert(text.includes(canary));assert(text.includes('injected'));const v=D.projectReadonlyTap(text);first(v,2);assert(!JSON.stringify(v).includes(canary));assert(!JSON.stringify(v).includes('code'));assert(!JSON.stringify(v).includes('stack'));});
+test('b09_real_multiline_enumerable_poison',async()=>{
+ const poisoned=await real('poison');assert(poisoned.includes(canary));assert(poisoned.includes('injected'));const pure=D.projectReadonlyTap(poisoned);first(pure,2);assert(!JSON.stringify(pure).includes(canary));assert(!JSON.stringify(pure).includes('code'));assert(!JSON.stringify(pure).includes('stack'));
+ const text=await real('marker'),marker='AFW_SYN_FAILURE/1 {"code":"EACCES","site":"unknown"}';assert.equal(text.split('\n').filter(line=>line===marker).length,1);assert(text.indexOf('\n'+marker+'\n')>text.indexOf('not ok 2 - R2 fixed original SDK readonly budget\n'));assert.deepEqual(D.projectLogText(text,P).failure,{code:'EACCES',site:'unknown'});
+ await owned(async root=>{await fs.writeFile(join(root,'command-output.log'),text);await fs.writeFile(join(root,'seal-custody.log'),custody(150));await fs.writeFile(join(root,'own-metadata.log'),'AFW_SYN_STAGE/1 {"stage":"metadata_get","state":"start"}\nAFW_SYN_HTTP/1 {"status":200}\n');const p=pair(await collect(root)),v=validate(p);first(v.tap,2);assert.deepEqual(v.logs[0],{log:'command',availability:'available',code:'unknown',site:'unknown'});assert.deepEqual(v.custodyLimit,{state:'observed',guard:'record_bytes'});assert.deepEqual(v.stage,{state:'pending',stage:'metadata_get'});assert.equal(v.http,200);assert(!JSON.stringify(v).includes(canary));for(const mutate of [v=>v.logs[0].code='EACCES',v=>v.logs[0].site='custody_20']){const q=repack(p,mutate);assert.throws(()=>validate(q));await assert.rejects(()=>D.validateFixedReadonlyPair(q,context,'readonly'));}});
+});
 test('b10_suffix_never_interpreted',()=>{const base=failure(),expected=D.projectReadonlyTap(base);first(expected,2);for(const suffix of ['  ---\n1..4\nnot ok 1 - '+file+'\n','  expected:\n    x\nnot ok 3 - R3 fixed original SDK readonly budget\n# tests 4\n','garbage\nTAP version 14\n','not ok 2 - R2 fixed original SDK readonly budget\n'])assert.deepEqual(D.projectReadonlyTap(base+suffix),expected);});
 test('b11_no_coercion_and_absence',()=>{let calls=0;const value={toString(){calls++;throw Error('forbidden');}};for(const v of [null,undefined,1,value,Buffer.from('TAP version 13\n')])assert.deepEqual(D.projectReadonlyTap(v),uncertain);assert.equal(calls,0);assert.deepEqual(D.projectReadonlyTap(''),absent);});
 test('b12_whole_representation_caps',()=>{for(const suffix of ['x'.repeat(1025)+'\n','\n'.repeat(4097),'x\r\n','truncated','x\n'.repeat(33000)])assert.deepEqual(D.projectReadonlyTap(failure()+suffix),uncertain);assert.deepEqual(D.projectReadonlyTap('é'.repeat(32769)+'\n'),uncertain);});
 test('b13_prefix_structure_conflicts',()=>{for(const s of ['TAP version 14\n'+failure(),'TAP version 13\n'+failure(),'TAP version 13\nnot ok 2 - R2 fixed original SDK readonly budget\n',prefix(1)+'ok 1 - R1 fixed original SDK readonly budget\n',prefix(1)+'# Subtest: R3 fixed original SDK readonly budget\nnot ok 2 - R3 fixed original SDK readonly budget\n',prefix(1)+'  ---\n  error: PRIVATE\n  ...\n'+failure()])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});
 test('b14_complete_summary_coherence',()=>{const valid=prefix(3)+summary(3);assert.equal(D.projectReadonlyTap(valid).state,'complete');for(const s of [valid+summary(3),valid.replace('# pass 3','# pass 2'),valid.replace('1..3','1..4'),valid.replace('# tests 3','# tests 4'),valid.replace('# suites 0','# suites 1'),valid.replace('# fail 0','# fail 1'),prefix(3),valid.slice(0,-1)])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});
 test('b15_closed_directives_and_zero_plan',()=>{const s=(prefix(3)+summary(3,1,1,1)).replace('ok 2 - R2 fixed original SDK readonly budget\n','ok 2 - R2 fixed original SDK readonly budget # SKIP inert\n').replace('ok 3 - R3 fixed original SDK readonly budget\n','ok 3 - R3 fixed original SDK readonly budget # TODO inert\n');const v=D.projectReadonlyTap(s);assert.equal(v.state,'complete');assert.deepEqual(v.cases.slice(0,3).map(r=>r.directive),['none','skip','todo']);assert.deepEqual(D.projectReadonlyTap('TAP version 13\n'+summary(0)),{state:'complete',cases:ids.map(id=>row(id)),counts:{tests:0,pass:0,fail:0,cancelled:0,skipped:0,todo:0}});});
-test('b16_file_and_ordinal_allowlist',()=>{for(const path of [file,'/home/runner/work/agent-friendly-web/agent-friendly-web/'+file,'file:///home/runner/work/agent-friendly-web/agent-friendly-web/'+file])assert.equal(D.projectReadonlyTap('TAP version 13\nnot ok 1 - '+path+'\n').cases[3].result,'not_ok');for(const path of ['../'+file,'/private/'+file,'./'+file])assert.deepEqual(D.projectReadonlyTap('TAP version 13\nnot ok 1 - '+path+'\n'),uncertain);for(const s of [prefix(2)+'not ok 1 - '+file+'\n',prefix(3)+'not ok 1 - R1 fixed original SDK readonly budget\n',prefix(3)+'ok 1 - '+file+'\n'])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});
+test('b16_file_and_ordinal_allowlist',async()=>{for(const path of [file,'/home/runner/work/agent-friendly-web/agent-friendly-web/'+file,'file:///home/runner/work/agent-friendly-web/agent-friendly-web/'+file])assert.equal(D.projectReadonlyTap('TAP version 13\nnot ok 1 - '+path+'\n').cases[3].result,'not_ok');for(const path of ['../'+file,'/private/'+file,'./'+file])assert.deepEqual(D.projectReadonlyTap('TAP version 13\nnot ok 1 - '+path+'\n'),uncertain);for(const s of [prefix(2)+'not ok 1 - '+file+'\n',prefix(3)+'not ok 1 - R1 fixed original SDK readonly budget\n',prefix(3)+'ok 1 - '+file+'\n'])assert.deepEqual(D.projectReadonlyTap(s),uncertain);const impossible='TAP version 13\nok 1 - '+file+'\n'+details+'not ok 2 - R2 fixed original SDK readonly budget\n';assert.deepEqual(D.projectReadonlyTap(impossible),uncertain);await owned(async root=>{await fs.writeFile(join(root,'command-output.log'),impossible);await fs.writeFile(join(root,'seal-custody.log'),custody(135));const v=validate(pair(await collect(root)));assert.deepEqual(v.tap,uncertain);assert.deepEqual(v.custodyLimit,{state:'observed',guard:'inventory_files_or_bytes'});assert.equal(v.logs[0].availability,'available');});});
 test('b17_all_ten_public_custody_guards',()=>{for(const [line,name]of guards)assert.deepEqual(guard(custody(line)),{state:'observed',guard:name});});
 test('b18_first_real_guard_only',()=>{assert.deepEqual(guard(custody(135)+'    at outer ('+cpath+':101:4)\n'),{state:'observed',guard:'inventory_files_or_bytes'});assert.equal(guard(custody(188)).guard,'envelope_input_bounds');for(const caller of ['    at internal (node:internal/streams/pipeline:1:1)\n','    at external (/home/runner/work/agent-friendly-web/agent-friendly-web/lib/public-caller.mjs:2:3)\n'])assert.deepEqual(guard(custody(150)+caller),{state:'observed',guard:'record_bytes'});});
 test('b19_custody_generic_and_conflicts',()=>{for(const s of ['CustodyError: custody_limit\n    at fail ('+cpath+':20:24)\n',custody(999),custody()+custody(135),custody().replace('CustodyError: custody_limit','Error [ENOENT]: custody_limit'),custody()+'AFW_SYN_FAILURE/1 '+JSON.stringify({code:'EACCES',site:'custody_20'})+'\n'])assert.deepEqual(guard(s),{state:'unknown',guard:null});});
@@ -73,10 +78,17 @@
 test('b21_custody_absence_no_coercion_caps',()=>{let calls=0;const value={toString(){calls++;return custody();}};assert.deepEqual(guard(value),{state:'unknown',guard:null});assert.equal(calls,0);for(const s of ['','unrelated private text\n','Error [ENOENT]: PRIVATE\n'])assert.deepEqual(guard(s),{state:'not_observed',guard:null});for(const s of [custody()+'x'.repeat(1025)+'\n',custody()+'x\r\n',custody().slice(0,-1)])assert.deepEqual(guard(s),{state:'unknown',guard:null});});
 test('b22_read_once_coherent_projections',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),await real('fail2'));await fs.writeFile(join(root,'seal-custody.log'),custody(135));await fs.writeFile(join(root,'tap-check.log'),'AssertionError [ERR_ASSERTION]: '+canary+'\n');const reads=new Map(),io={...fs,open:async(path,...a)=>{reads.set(path,(reads.get(path)??0)+1);return fs.open(path,...a);}},v=validate(pair(await collect(root,io)));first(v.tap,2);assert.equal(v.custodyLimit.guard,'inventory_files_or_bytes');assert.equal(v.countCheck,'coded_assertion');assert([...reads.values()].every(n=>n===1));assert(!JSON.stringify(v).includes(canary));}));
 test('b23_missing_unsafe_and_truncated_logs',async()=>owned(async root=>{let v=validate(pair(await collect(root)));assert.deepEqual(v.tap,absent);assert.deepEqual(v.custodyLimit,{state:'not_observed',guard:null});await fs.writeFile(join(root,'target'),canary+'\n');await fs.symlink(join(root,'target'),join(root,'command-output.log'));await fs.writeFile(join(root,'seal-custody.log'),'partial');v=validate(pair(await collect(root)));assert.deepEqual(v.tap,uncertain);assert.deepEqual(v.custodyLimit,{state:'unknown',guard:null});}));
-test('b24_purpose_schema_and_canonicality',async()=>owned(async root=>{const p=pair(await collect(root)),v=validate(p);assert.deepEqual(Object.keys(v),['purpose','context','job','rawOutcome','logs','stage','http','countCheck','tap','custodyLimit','nonclaims']);assert.equal(v.purpose,'afw.readonly-boundary-observations.syn.v1');assert.throws(()=>D.validateStagePairWithProjector(p,context,'readonly',P));const old=D.makeStagePair({context,job:'readonly',rawOutcome:'failure',observation:await D.collectOwnedLogRoot(root,P)});assert.throws(()=>validate(old));const q=new Map(p);q.set('result.json',Buffer.from(JSON.stringify(v,null,2)+'\n'));assert.throws(()=>validate(q));}));
+test('b24_purpose_schema_and_canonicality',async()=>owned(async root=>{const p=pair(await collect(root)),v=validate(p),reversed=new Map([['manifest.json',p.get('manifest.json')],['result.json',p.get('result.json')]]);for(const files of [p,reversed]){for(const name of ['result.json','manifest.json'])assert(files.get(name).equals(p.get(name)));assert.deepEqual(validate(files),v);assert.deepEqual(await D.validateFixedReadonlyPair(files,context,'readonly'),v);}let coerced=0;const key={toString(){coerced++;throw Error('forbidden');}};for(const files of [new Map([['result.json',p.get('result.json')]]),new Map([...p,['extra',Buffer.from('')]]),new Map([['result.json','not_buffer'],['manifest.json',p.get('manifest.json')]]),new Map([[key,p.get('result.json')],['manifest.json',p.get('manifest.json')]])]){assert.throws(()=>validate(files));await assert.rejects(()=>D.validateFixedReadonlyPair(files,context,'readonly'));}assert.equal(coerced,0);assert.deepEqual(Object.keys(v),['purpose','context','job','rawOutcome','logs','stage','http','countCheck','tap','custodyLimit','nonclaims']);assert.equal(v.purpose,'afw.readonly-boundary-observations.syn.v1');assert.throws(()=>D.validateStagePairWithProjector(p,context,'readonly',P));const old=D.makeStagePair({context,job:'readonly',rawOutcome:'failure',observation:await D.collectOwnedLogRoot(root,P)});assert.throws(()=>validate(old));const q=new Map(p);q.set('result.json',Buffer.from(JSON.stringify(v,null,2)+'\n'));assert.throws(()=>validate(q));}));
 test('b25_context_job_manifest_and_limits',async()=>owned(async root=>{const p=pair(await collect(root));assert.throws(()=>D.validateFixedReadonlyPairWithProjector(p,{...context,run:'124'},'readonly',P));assert.throws(()=>D.validateFixedReadonlyPairWithProjector(p,context,'positive_prepare',P));for(const change of [m=>m.purpose='other',m=>m.files[0].bytes++,m=>m.files[0].path='other',m=>m.files[0].sha256='a'.repeat(64),m=>m.extra=true]){const q=new Map(p),m=JSON.parse(q.get('manifest.json'));change(m);q.set('manifest.json',canonical(m));assert.throws(()=>validate(q));}const q=new Map(p);q.set('manifest.json',Buffer.alloc(16385,32));assert.throws(()=>validate(q));q.set('extra',Buffer.from(''));assert.throws(()=>validate(q));}));
 test('b26_closed_enums_rows_and_nonclaims',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),await real('normal'));await fs.writeFile(join(root,'seal-custody.log'),custody());const p=pair(await collect(root));for(const mutate of [v=>v.tap.state='passed',v=>v.tap.cases[0].code='PRIVATE',v=>v.tap.cases[0].id='R4',v=>v.tap.cases[0].result='passed',v=>v.tap.cases[0].directive='other',v=>v.tap.counts.tests=4,v=>v.tap.counts.pass=2,v=>v.custodyLimit.guard='max_512',v=>v.custodyLimit.state='passed',v=>v.rawOutcome='passed',v=>v.nonclaims.PCoff=true,v=>v.private=canary])assert.throws(()=>validate(repack(p,mutate)));}));
-test('b27_availability_projection_truth',async()=>owned(async root=>{const p=pair(await collect(root));assert.throws(()=>validate(repack(p,v=>v.tap={state:'complete',cases:ids.map(id=>row(id)),counts:{tests:0,pass:0,fail:0,cancelled:0,skipped:0,todo:0}})));assert.throws(()=>validate(repack(p,v=>v.custodyLimit={state:'observed',guard:'record_bytes'})));}));
+test('b27_availability_projection_truth',async()=>owned(async root=>{
+ const p=pair(await collect(root));assert.throws(()=>validate(repack(p,v=>v.tap={state:'complete',cases:ids.map(id=>row(id)),counts:{tests:0,pass:0,fail:0,cancelled:0,skipped:0,todo:0}})));assert.throws(()=>validate(repack(p,v=>v.custodyLimit={state:'observed',guard:'record_bytes'})));
+ const observed=repack(p,v=>{v.logs[1]={log:'seal',availability:'available',code:'custody_limit',site:'custody_20'};v.custodyLimit={state:'observed',guard:'record_bytes'};});assert.deepEqual(validate(observed).custodyLimit,{state:'observed',guard:'record_bytes'});
+ const generic=repack(observed,v=>v.custodyLimit={state:'unknown',guard:null});assert.deepEqual(validate(generic).custodyLimit,{state:'unknown',guard:null});
+ const ambiguous=repack(generic,v=>v.logs[1].code='unknown');assert.deepEqual(validate(ambiguous).custodyLimit,{state:'unknown',guard:null});
+ for(const q of [repack(observed,v=>v.logs[1].code='EACCES'),repack(observed,v=>v.custodyLimit={state:'not_observed',guard:null}),repack(observed,v=>{v.logs[1]={log:'seal',availability:'missing',code:'unknown',site:'unknown'};})]){assert.throws(()=>validate(q));await assert.rejects(()=>D.validateFixedReadonlyPair(q,context,'readonly'));}
+ for(const q of [observed,generic,ambiguous])assert.deepEqual(await D.validateFixedReadonlyPair(q,context,'readonly'),validate(q));
+}));
 test('b28_production_role_keys_options',async()=>{const saved={...process.env};try{process.env.GITHUB_JOB='qualify';await assert.rejects(()=>D.collectFixedReadonlyPair({context,job:'readonly',rawOutcome:'failure'}));process.env.GITHUB_JOB='readonly';await assert.rejects(()=>D.collectFixedReadonlyPair({context,job:'positive_prepare',rawOutcome:'failure'}));for(const key of ['NODE_OPTIONS','AFW_SYN_CHECKPOINT_KEY','GH_ARTIFACT_TOKEN']){process.env[key]='SYN_INERT';await assert.rejects(()=>D.collectFixedReadonlyPair({context,job:'readonly',rawOutcome:'failure'}));delete process.env[key];}}finally{for(const key of Object.keys(process.env))if(!Object.hasOwn(saved,key))delete process.env[key];Object.assign(process.env,saved);}});
 test('b29_production_version_refusal',async()=>{const source="import assert from 'node:assert/strict';const D=await import(__D__);Object.defineProperty(process.versions,'node',{value:'22.0.0'});process.env.GITHUB_JOB='readonly';await assert.rejects(()=>D.collectFixedReadonlyPair({context:__CONTEXT__,job:'readonly',rawOutcome:'failure'}));".replace('__D__',JSON.stringify(new URL('./fixtures/finite-budget-stage-observer.mjs',import.meta.url).href)).replace('__CONTEXT__',JSON.stringify(context));const child=spawnSync(process.execPath,['--input-type=module'],{input:source,env:environment(),encoding:'utf8',timeout:5000,maxBuffer:65536});assert.equal(child.error,undefined);assert.equal(child.status,0);assert.equal(child.stdout,'');assert.equal(child.stderr,'');});
 test('b30_new_reader_hardlink_and_fd_race',async()=>owned(async root=>{const path=join(root,'command-output.log');await fs.writeFile(join(root,'target'),'PRIVATE\n');await fs.link(join(root,'target'),path);assert.equal((await collect(root)).logs[0].availability,'unsafe');await fs.unlink(path);await fs.writeFile(path,failure());const io={...fs,open:async(...a)=>{const fd=await fs.open(...a);return {stat:()=>fd.stat(),read:async(...args)=>{const value=await fd.read(...args);await fs.appendFile(path,'changed\n');return value;},close:()=>fd.close()};}};const v=await collect(root,io);assert.equal(v.logs[0].availability,'racing');assert.deepEqual(v.tap,uncertain);}));

```

## Complete current D (line-numbered literal DATA)
```js
   1 import assert from 'node:assert/strict';
   2 import * as fs from 'node:fs/promises';
   3 import {constants} from 'node:fs';
   4 import {createHash} from 'node:crypto';
   5 import {join,resolve,parse,sep,isAbsolute} from 'node:path';
   6 
   7 // Source-only observations are unauthenticated location hints. A pending stage can
   8 // also be caused by process termination; it never establishes a business cause.
   9 export const STAGES=Object.freeze(['metadata_get','metadata_validation','raw_download','raw_binding','zip_decode','receipt_caps','mkdir','write_files']);
  10 export const JOBS=Object.freeze(['positive_prepare','reduction_prepare','readonly']);
  11 export const NEEDS=Object.freeze(['contracts','positive_prepare','positive_consume','reduction_prepare','reduction_consume_a','readonly','reduction_consume_b']);
  12 export const NONCLAIMS=Object.freeze({historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
  13 const FILES=Object.freeze([['command','command-output.log'],['seal','seal-custody.log'],['metadata','own-metadata.log'],['count','tap-check.log']]);
  14 const AVAILABILITY=Object.freeze(['available','missing','oversized','unsafe','racing','malformed','truncated','unavailable']);
  15 const OUTCOMES=Object.freeze(['success','failure','skipped','cancelled','not_observed']);
  16 const COUNT=Object.freeze(['not_observed','coded_assertion','unknown']);
  17 const CONTEXT_KEYS=['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node'];
  18 const sha=b=>createHash('sha256').update(b).digest('hex');
  19 const canonical=v=>Buffer.from(JSON.stringify(v)+'\n');
  20 const same=(a,b)=>assert.deepEqual(a,b,'stage_evidence_rejected');
  21 const fields=(v,keys)=>{assert(v!==null&&typeof v==='object'&&!Array.isArray(v),'stage_evidence_rejected');same(Object.keys(v),keys);};
  22 const unknown=()=>({code:'unknown',site:'unknown'});
  23 const noStage=()=>({state:'not_observed',stage:null});
  24 const unknownStage=()=>({state:'unknown',stage:null});
  25 function marker(line,prefix,keys){
  26  assert(line.startsWith(prefix+' '),'stage_evidence_rejected');
  27  const raw=line.slice(prefix.length+1),v=JSON.parse(raw);fields(v,keys);same(JSON.stringify(v),raw);return v;
  28 }
  29 function linesOf(text){
  30  assert(typeof text==='string'&&Buffer.byteLength(text)<=65536,'stage_evidence_rejected');
  31  assert(text===''||text.endsWith('\n'),'stage_evidence_rejected');
  32  const lines=text===''?[]:text.slice(0,-1).split('\n');
  33  assert(lines.length<=4096&&lines.every(l=>Buffer.byteLength(l)<=1024&&!l.includes('\r')),'stage_evidence_rejected');return lines;
  34 }
  35 function stages(lines){
  36  let next=0,pending=false,status=null,seen=false;
  37  try{
  38   for(const line of lines){
  39    if(line.includes('AFW_SYN_STAGE/1')){
  40     seen=true;const v=marker(line,'AFW_SYN_STAGE/1',['stage','state']);
  41     assert(next<STAGES.length&&v.stage===STAGES[next],'stage_evidence_rejected');
  42     if(v.state==='start'){assert(!pending,'stage_evidence_rejected');pending=true;}
  43     else{same(v.state,'complete');assert(pending,'stage_evidence_rejected');pending=false;next++;}
  44    }else if(line.includes('AFW_SYN_HTTP/1')){
  45     const v=marker(line,'AFW_SYN_HTTP/1',['status']);
  46     assert(next===0&&pending&&status===null&&Number.isInteger(v.status)&&v.status>=100&&v.status<=599,'stage_evidence_rejected');status=v.status;
  47    }
  48   }
  49   if(!seen)return {stage:noStage(),http:null};
  50   if(pending)return {stage:{state:'pending',stage:STAGES[next]},http:status};
  51   if(next===STAGES.length)return {stage:{state:'complete',stage:STAGES.at(-1)},http:status};
  52   return {stage:unknownStage(),http:null};
  53  }catch{return {stage:unknownStage(),http:null};}
  54 }
  55 function legacy(lines,P){
  56  const codes=P.FIXED_BUDGET_FAILURE_CODES;
  57  const semantic=code=>code==='ERR_ASSERTION'||code==='assertion'?'assertion':codes.includes(code)&&code!=='unknown'?code:null;
  58  const conflict=()=>({value:unknown(),count:2});
  59  const observations=[];
  60  for(let n=0;n<lines.length;n++){
  61   const line=lines[n],header=/^(Error|AssertionError|CustodyError)(?: \[([^\]\r\n]*)\])?: (.*)$/.exec(line);
  62   if(!header)continue;
  63   const message=header[3],explicit=semantic(header[2]),exact=semantic(message),token=/^([A-Za-z_]+): /.exec(message),messageCode=exact??semantic(token?.[1]);
  64   if(header[2]!==undefined&&explicit===null)return conflict();
  65   const claims=[header[1]==='AssertionError'?'assertion':null,explicit,messageCode].filter(Boolean);
  66   if(header[1]==='CustodyError'&&(!exact?.startsWith('custody_')||header[2]!==undefined))return conflict();
  67   if(new Set(claims).size>1)return conflict();
  68   if(!claims.length)continue;
  69   const recognized=claims[0],custody=recognized.startsWith('custody_')?recognized:null,code=recognized==='assertion'?'ERR_ASSERTION':custody?null:recognized;
  70   const frames=[];let unrecognizedSourceFrame=false;
  71   for(let k=n+1;k<lines.length&&/^ {4}at /.test(lines[k]);k++){
  72    const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(lines[k]);
  73    if(!match){if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>lines[k].includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;continue;}
  74    const path=match[1]??match[4],root='/home/runner/work/agent-friendly-web/agent-friendly-web/';
  75    if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>[s.path,root+s.path,'file://'+root+s.path].includes(path)))frames.push(lines[k]);else if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>path.includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;
  76   }
  77   // This is an owned Error with DATA properties, never an Error from a private log.
  78   const owned=new Error();Object.defineProperties(owned,{message:{value:custody??'',configurable:true},code:{value:code??undefined,configurable:true},stack:{value:'Error\n'+(unrecognizedSourceFrame?'':frames.join('\n')),configurable:true}});
  79   observations.push(P.projectFixedBudgetFailure(owned));
  80  }
  81  return {value:observations.length===1?observations[0]:unknown(),count:observations.length};
  82 }
  83 export function projectLogText(text,P){
  84  try{
  85   const lines=linesOf(text),observation=stages(lines),canonicalMarkers=lines.filter(l=>l.includes('AFW_SYN_FAILURE/1'));
  86   const old=legacy(lines,P);let failure=old.value;
  87   if(canonicalMarkers.length){failure=P.projectFixedBudgetLog(text);if(old.count>1||old.count===1&&JSON.stringify(old.value)!==JSON.stringify(failure))failure=unknown();}
  88   return {failure,stage:observation.stage,http:observation.http};
  89  }catch{return {failure:unknown(),stage:unknownStage(),http:null};}
  90 }
  91 function identity(st){return [st.dev,st.ino,st.mode,st.nlink,st.size,st.mtimeMs,st.ctimeMs];}
  92 function regular(st){return st.isFile()&&st.nlink===1&&Number.isSafeInteger(st.size)&&st.size>=0;}
  93 async function controlledRoot(root,io){
  94  assert(typeof root==='string'&&isAbsolute(root)&&resolve(root)===root,'stage_evidence_rejected');
  95  const base=parse(root).root,parts=root.slice(base.length).split(sep).filter(Boolean),identities=[];let current=base;
  96  for(const part of parts){current=join(current,part);const st=await io.lstat(current);assert(st.isDirectory()&&!st.isSymbolicLink(),'stage_evidence_rejected');same(await io.realpath(current),current);identities.push([st.dev,st.ino,st.mode]);}return identities;
  97 }
  98 async function readOwned(root,name,io){
  99  let fd;const path=join(root,name);
 100  try{
 101   const parents=await controlledRoot(root,io),before=await io.lstat(path);if(!regular(before)||before.isSymbolicLink())return {availability:'unsafe'};
 102   if(before.size>1048576)return {availability:'oversized'};
 103   fd=await io.open(path,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);const initial=await fd.stat();
 104   if(!regular(initial)||JSON.stringify(identity(initial))!==JSON.stringify(identity(before)))return {availability:'racing'};
 105   const size=Math.min(initial.size,65536),bytes=Buffer.alloc(size),read=await fd.read(bytes,0,size,initial.size-size);
 106   const after=await fd.stat(),pathAfter=await io.lstat(path);let parentStable=false;try{parentStable=JSON.stringify(parents)===JSON.stringify(await controlledRoot(root,io));}catch{}
 107   if(!parentStable||read.bytesRead!==size||JSON.stringify(identity(initial))!==JSON.stringify(identity(after))||JSON.stringify(identity(after))!==JSON.stringify(identity(pathAfter)))return {availability:'racing'};
 108   if(initial.size>65536)return {availability:'truncated'};
 109   if(size&&bytes[size-1]!==10)return {availability:'truncated'};
 110   let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(text).equals(bytes));linesOf(text);}catch{return {availability:'malformed'};}
 111   // Physical first/last nonempty lines only; empty means exactly zero bytes.
 112   // Interior noise, including a partial prefix, is not evidence of truncation.
 113   const nonempty=text.slice(0,-1).split('\n').filter(line=>line!=='');
 114   for(const line of [nonempty[0],nonempty.at(-1)])for(const prefix of ['AFW_SYN_STAGE/1','AFW_SYN_HTTP/1','AFW_SYN_FAILURE/1'])if(line&&prefix.startsWith(line)&&line!==prefix)return {availability:'truncated'};
 115   return {availability:'available',text};
 116  }catch(error){const code=Object.getOwnPropertyDescriptor(error??{},'code')?.value;return {availability:code==='ENOENT'?'missing':['ELOOP','ENOTDIR'].includes(code)?'unsafe':'unavailable'};}
 117  finally{if(fd)try{await fd.close();}catch{}}
 118 }
 119 // Explicit library-only test boundary: an owned synthetic root/IO can be passed
 120 // here. Production collection below exposes no root, IO, argv or env path override.
 121 export async function collectOwnedLogRoot(root,P,io=fs){
 122  let safe=true;try{await controlledRoot(root,io);}catch{safe=false;}
 123  const logs=[],observations=[];
 124  for(const [log,name]of FILES){
 125   const read=safe?await readOwned(root,name,io):{availability:'unsafe'},v=read.availability==='available'?projectLogText(read.text,P):{failure:unknown(),stage:unknownStage(),http:null};
 126   logs.push({log,availability:read.availability,code:v.failure.code,site:v.failure.site});observations.push(v);
 127  }
 128  const metadata=observations[2],count=logs[3];
 129  return {logs,stage:logs[2].availability==='available'?metadata.stage:unknownStage(),http:logs[2].availability==='available'?metadata.http:null,countCheck:count.availability==='missing'||count.availability==='available'&&count.code==='unknown'&&observations[3].stage.state==='not_observed'?'not_observed':count.availability==='available'&&count.code==='assertion'?'coded_assertion':'unknown'};
 130 }
 131 async function projector(){
 132  const bytes=await fs.readFile(join(process.cwd(),'test/fixtures/finite-budget-failure-diagnostic.mjs'));
 133  same(bytes.length,7871);same(sha(bytes),'6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c');
 134  same(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),'62965a9d5836e54563550fe29dff23abe9a62054');
 135  return import('data:text/javascript;base64,'+bytes.toString('base64'));
 136 }
 137 export async function collectFixedStagePair({context,job,rawOutcome}){
 138  const e=process.env;assert(e.NODE_OPTIONS===undefined&&e.AFW_SYN_CHECKPOINT_KEY===undefined&&e.GH_ARTIFACT_TOKEN===undefined,'stage_evidence_rejected');
 139  assert(typeof e.RUNNER_TEMP==='string'&&isAbsolute(e.RUNNER_TEMP),'stage_evidence_rejected');
 140  const P=await projector(),pair=makeStagePair({context,job,rawOutcome,observation:await collectOwnedLogRoot(join(e.RUNNER_TEMP,'afw-native-private','logs'),P)});validateStagePairWithProjector(pair,context,job,P);return pair;
 141 }
 142 function validateContext(v){fields(v,CONTEXT_KEYS);same(v.repository,'tokenizartinfo-ops/agent-friendly-web');same(v.repositoryId,'1347578006');same(v.ref,'refs/heads/feat/finite-native-cleanup-20261101');for(const k of ['source','tree','workflowBlob'])assert(/^[a-f0-9]{40}$/.test(v[k]));assert(/^[1-9][0-9]*$/.test(v.run));same(v.attempt,1);same(v.node,'22.23.4');}
 143 function validateValue(v,context,job,P){
 144  fields(v,['purpose','context','job','rawOutcome','logs','stage','http','countCheck','nonclaims']);same(v.purpose,'afw.sanitized-stage-observations.syn.v1');validateContext(v.context);same(v.context,context);same(v.job,job);assert(JOBS.includes(v.job)&&OUTCOMES.includes(v.rawOutcome));
 145  same(v.logs.length,4);for(const [n,row]of v.logs.entries()){fields(row,['log','availability','code','site']);same(row.log,FILES[n][0]);assert(AVAILABILITY.includes(row.availability));assert(typeof row.code==='string'&&P.FIXED_BUDGET_FAILURE_CODES.includes(row.code));assert(row.site==='unknown'||P.FIXED_BUDGET_FAILURE_SITES.some(s=>s.id===row.site));if(row.availability!=='available')same({code:row.code,site:row.site},unknown());}
 146  fields(v.stage,['state','stage']);assert(['not_observed','unknown','pending','complete'].includes(v.stage.state));if(['unknown','not_observed'].includes(v.stage.state))same(v.stage.stage,null);else assert(STAGES.includes(v.stage.stage));if(v.stage.state==='complete')same(v.stage.stage,'write_files');
 147  assert(v.http===null||Number.isInteger(v.http)&&v.http>=100&&v.http<=599);assert(COUNT.includes(v.countCheck));if(job!=='readonly')same(v.countCheck,'not_observed');same(v.nonclaims,NONCLAIMS);
 148 }
 149 export function makeStagePair({context,job,rawOutcome,observation}){
 150  validateContext(context);assert(JOBS.includes(job)&&OUTCOMES.includes(rawOutcome));
 151  const value={purpose:'afw.sanitized-stage-observations.syn.v1',context,job,rawOutcome,logs:observation.logs,stage:observation.stage,http:observation.http,countCheck:job==='readonly'?observation.countCheck:'not_observed',nonclaims:NONCLAIMS};
 152  const bytes=canonical(value),manifest=canonical({purpose:'afw.sanitized-stage-observations.manifest.syn.v1',context,job,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]});
 153  assert(bytes.length+manifest.length<=16384,'stage_evidence_rejected');return new Map([['result.json',bytes],['manifest.json',manifest]]);
 154 }
 155 export async function validateStagePair(files,context,job){
 156  return validateStagePairWithProjector(files,context,job,await projector());
 157 }
 158 export function validateStagePairWithProjector(files,context,job,P){
 159  validateContext(context);assert(files instanceof Map);same([...files.keys()],['result.json','manifest.json']);assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=16384);
 160  const read=b=>{const s=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(s);assert(canonical(v).equals(b));return v;};
 161  const value=read(files.get('result.json')),manifest=read(files.get('manifest.json'));validateValue(value,context,job,P);
 162  fields(manifest,['purpose','context','job','files']);same(manifest.purpose,'afw.sanitized-stage-observations.manifest.syn.v1');same(manifest.context,context);same(manifest.job,job);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;
 163 }
 164 const unavailableAssignments=()=>JOBS.map(job=>({job,state:'unavailable',artifactId:null,zipSha256:null}));
 165 export function projectAssignments(text){
 166  const unavailable=unavailableAssignments();
 167  try{
 168   assert(typeof text==='string'&&Buffer.byteLength(text)<=65536);const needs=JSON.parse(text);assert(needs&&typeof needs==='object'&&!Array.isArray(needs));same(Object.keys(needs).sort(),NEEDS.slice().sort());
 169   const result=JOBS.map(job=>{const v=needs[job];assert(v&&typeof v==='object'&&!Array.isArray(v));same(Object.keys(v).sort(),['outputs','result']);assert(OUTCOMES.includes(v.result));assert(v.outputs!==null&&typeof v.outputs==='object'&&!Array.isArray(v.outputs));const id=v.outputs['safe-id'],digest=v.outputs['safe-digest'];if(typeof id!=='string'||!/^[1-9][0-9]*$/.test(id)||!Number.isSafeInteger(Number(id))||String(Number(id))!==id||typeof digest!=='string'||!/^[a-f0-9]{64}$/.test(digest))return unavailable.find(x=>x.job===job);return {job,state:'assigned',artifactId:id,zipSha256:digest};});
 170   const ids=result.filter(x=>x.state==='assigned').map(x=>x.artifactId);if(new Set(ids).size!==ids.length)return unavailable;return result;
 171  }catch{return unavailable;}
 172 }
 173 export function assignmentLine(text){return 'AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS '+JSON.stringify(projectAssignments(text));}
 174 
 175 // Readonly boundary v1. Representation caps are checked first; TAP interpretation
 176 // stops on the first literal failing result, before ANY of its error details.
 177 const READONLY_IDS=Object.freeze(['R1','R2','R3','native_file']);
 178 const NATIVE_PATH='test/mcp-qa-finite-budget-native.test.mjs';
 179 const RUNNER_ROOT='/home/runner/work/agent-friendly-web/agent-friendly-web/';
 180 const nativeNames=Object.freeze([NATIVE_PATH,RUNNER_ROOT+NATIVE_PATH,'file://'+RUNNER_ROOT+NATIVE_PATH]);
 181 const tapRows=(result='not_observed')=>READONLY_IDS.map(id=>({id,result,directive:'none'}));
 182 const tapUnknown=()=>({state:'unknown',cases:tapRows('unknown'),counts:null});
 183 const tapAbsent=()=>({state:'not_observed',cases:tapRows(),counts:null});
 184 const custodyUnknown=()=>({state:'unknown',guard:null});
 185 const custodyAbsent=()=>({state:'not_observed',guard:null});
 186 const GUARDS=Object.freeze({101:'regular_file_size_bounds',135:'inventory_files_or_bytes',150:'record_bytes',173:'header_bytes',177:'jsonl_bytes',179:'envelope_bytes',188:'envelope_input_bounds',215:'inspected_inventory',250:'expanded_jsonl_bytes',254:'inspected_record_bytes'});
 187 function tapId(name){for(const id of READONLY_IDS.slice(0,3))if(name===id+' fixed original SDK readonly budget')return id;return nativeNames.includes(name)?'native_file':null;}
 188 const duration=line=>/^ {2}duration_ms: [0-9]+(?:\.[0-9]+)?$/.test(line);
 189 export function projectReadonlyTap(text){
 190  try{
 191   const lines=linesOf(text);if(!lines.length)return tapAbsent();
 192   same(lines[0],'TAP version 13');const cases=tapRows(),seen=new Set();let announced=null,details=false,next=1,plan=null,summary=null;
 193   for(let i=1;i<lines.length;i++){
 194    const line=lines[i];
 195    if(line==='  ---'){
 196     assert(details);assert(duration(lines[++i]));same(lines[++i],"  type: 'test'");same(lines[++i],'  ...');details=false;continue;
 197    }
 198    if(line.startsWith('# Subtest: ')){assert(plan===null&&!announced&&!details);const id=tapId(line.slice(11));assert(id&&!seen.has(id));announced=id;details=false;continue;}
 199    const row=/^(ok|not ok) ([1-4]) - (.*?)(?: # (SKIP|TODO)(?: .*)?)?$/.exec(line);
 200    if(row){
 201     assert(plan===null&&!details&&!seen.has('native_file'));const id=tapId(row[3]),ordinal=Number(row[2]),directive=row[4]?.toLowerCase()??'none';
 202     assert(id&&!seen.has(id)&&(announced===null||announced===id));
 203     const lateFile=id==='native_file'&&cases.slice(0,3).every(r=>r.result==='ok')&&seen.size===3&&row[1]==='not ok';
 204     assert(ordinal===next||lateFile&&ordinal===1);
 205     if(id==='native_file')assert(seen.size===0||lateFile);else same(id,'R'+next);
 206     cases[READONLY_IDS.indexOf(id)]={id,result:row[1]==='ok'?'ok':'not_ok',directive};seen.add(id);next++;announced=null;
 207     if(row[1]==='not ok')return {state:'first_failure',cases:cases.map(r=>seen.has(r.id)?r:{...r,result:'unknown'}),counts:null};
 208     details=true;continue;
 209    }
 210    const p=/^1\.\.([0-4])$/.exec(line);
 211    if(p){assert(plan===null&&!announced&&!details);plan=Number(p[1]);same(plan,seen.size);details=false;continue;}
 212    if(line.startsWith('# tests ')){
 213     assert(plan!==null&&summary===null);summary={};
 214     for(const key of ['tests','suites','pass','fail','cancelled','skipped','todo']){
 215      const m=new RegExp('^# '+key+' ([0-4])$').exec(lines[i++]);assert(m);summary[key]=Number(m[1]);
 216     }
 217     assert(/^# duration_ms [0-9]+(?:\.[0-9]+)?$/.test(lines[i]));
 218     same(summary.tests,seen.size);same(summary.suites,0);same(summary.fail,0);same(summary.cancelled,0);
 219     same(summary.skipped,cases.filter(r=>r.directive==='skip').length);same(summary.todo,cases.filter(r=>r.directive==='todo').length);same(summary.pass,seen.size-summary.skipped-summary.todo);
 220     continue;
 221    }
 222    assert(!details&&line.startsWith('# ')&&!/^# (?:tests|suites|pass|fail|cancelled|skipped|todo|duration_ms)(?: |:)/.test(line)&&plan===null);
 223   }
 224   assert(plan!==null&&summary!==null&&!announced);if(seen.has('native_file'))same(seen.size,1);
 225   const {tests,pass,fail,cancelled,skipped,todo}=summary;
 226   return {state:'complete',cases,counts:{tests,pass,fail,cancelled,skipped,todo}};
 227  }catch{return tapUnknown();}
 228 }
 229 export function projectCustodyLimit(text,P){
 230  try{
 231   const lines=linesOf(text);if(!lines.length)return custodyAbsent();
 232   const headers=lines.map((line,i)=>({i,line,match:/^(Error|AssertionError|CustodyError)(?: \[([^\]\r\n]*)\])?: (.*)$/.exec(line)})).filter(v=>v.match);
 233   const projected=projectLogText(text,P).failure;
 234   const mentioned=lines.some(line=>line.includes('custody_limit'));
 235   if(projected.code!=='custody_limit')return mentioned?custodyUnknown():custodyAbsent();
 236   if(headers.length!==1)return custodyUnknown();
 237   const header=headers[0],claims=[header.match[2],header.match[3]].filter(Boolean);
 238   if(!claims.includes('custody_limit')||claims.some(v=>v!=='custody_limit'))return custodyUnknown();
 239   const approved=['test/fixtures/finite-checkpoint-custody.mjs',RUNNER_ROOT+'test/fixtures/finite-checkpoint-custody.mjs','file://'+RUNNER_ROOT+'test/fixtures/finite-checkpoint-custody.mjs'];
 240   // Validate the fixed throw chain and stop as soon as its first real guard
 241   // is known. Node/internal/external caller frames below it are not interpreted.
 242   let phase=0,constructorSeen=false;
 243   for(let n=header.i+1;n<lines.length&&/^ {4}at /.test(lines[n]);n++){
 244    const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(lines[n]);
 245    if(!match)return custodyUnknown();const path=match[1]??match[4],number=Number(match[2]??match[5]);if(!approved.includes(path))return custodyUnknown();
 246    if(phase===0){if(number===22&&!constructorSeen){constructorSeen=true;continue;}if(number!==20)return custodyUnknown();phase=1;continue;}
 247    if(phase===1&&number===24){phase=2;continue;}
 248    const guard=GUARDS[number];if(!guard)return custodyUnknown();return {state:'observed',guard};
 249   }
 250   return custodyUnknown();
 251  }catch{return custodyUnknown();}
 252 }
 253 // Explicit synthetic root/IO boundary. Each fixed log is opened ONCE, then the
 254 // same captured text supplies the public observations. Command TAP is only
 255 // interpreted by the pure prefix projector, never the general log projector.
 256 export async function collectOwnedReadonlyLogRoot(root,P,io=fs){
 257  let safe=true;try{await controlledRoot(root,io);}catch{safe=false;}
 258  const reads=[],logs=[],observations=[];
 259  for(const [log,name]of FILES){
 260   const read=safe?await readOwned(root,name,io):{availability:'unsafe'},v=read.availability==='available'&&log!=='command'?projectLogText(read.text,P):{failure:unknown(),stage:unknownStage(),http:null};
 261   reads.push(read);logs.push({log,availability:read.availability,code:v.failure.code,site:v.failure.site});observations.push(v);
 262  }
 263  const project=(read,fn,absent,uncertain)=>read.availability==='missing'?absent():read.availability==='available'?fn(read.text):uncertain();
 264  const metadata=observations[2],count=logs[3];
 265  return {logs,stage:logs[2].availability==='available'?metadata.stage:unknownStage(),http:logs[2].availability==='available'?metadata.http:null,countCheck:count.availability==='missing'||count.availability==='available'&&count.code==='unknown'&&observations[3].stage.state==='not_observed'?'not_observed':count.availability==='available'&&count.code==='assertion'?'coded_assertion':'unknown',tap:project(reads[0],projectReadonlyTap,tapAbsent,tapUnknown),custodyLimit:project(reads[1],s=>projectCustodyLimit(s,P),custodyAbsent,custodyUnknown)};
 266 }
 267 function validateTap(v){
 268  fields(v,['state','cases','counts']);assert(['not_observed','unknown','complete','first_failure'].includes(v.state));same(v.cases.length,4);
 269  for(const [n,row]of v.cases.entries()){fields(row,['id','result','directive']);same(row.id,READONLY_IDS[n]);assert(['ok','not_ok','not_observed','unknown'].includes(row.result));assert(['none','skip','todo'].includes(row.directive));if(['unknown','not_observed'].includes(row.result))same(row.directive,'none');}
 270  if(v.state==='not_observed'){same(v,tapAbsent());return;}if(v.state==='unknown'){same(v,tapUnknown());return;}
 271  if(v.state==='first_failure'){
 272   same(v.counts,null);const failed=v.cases.findIndex(r=>r.result==='not_ok');assert(failed>=0&&v.cases.filter(r=>r.result==='not_ok').length===1);
 273   if(failed===3)assert(v.cases.slice(0,3).every(r=>r.result==='ok')||v.cases.slice(0,3).every(r=>r.result==='unknown'));
 274   else assert(v.cases.slice(0,failed).every(r=>r.result==='ok')&&v.cases.slice(failed+1).every(r=>r.result==='unknown'));
 275   return;
 276  }
 277  fields(v.counts,['tests','pass','fail','cancelled','skipped','todo']);for(const n of Object.values(v.counts))assert(Number.isInteger(n)&&n>=0&&n<=4);
 278  assert(v.cases.every(r=>r.result==='ok'||r.result==='not_observed'));const seen=v.cases.filter(r=>r.result==='ok');
 279  if(v.cases[3].result==='ok')same(seen.length,1);else{let gap=false;for(const r of v.cases.slice(0,3)){if(r.result==='not_observed')gap=true;else assert(!gap);}}
 280  same(v.counts,{tests:seen.length,pass:seen.filter(r=>r.directive==='none').length,fail:0,cancelled:0,skipped:seen.filter(r=>r.directive==='skip').length,todo:seen.filter(r=>r.directive==='todo').length});
 281 }
 282 function validateCustody(v){fields(v,['state','guard']);assert(['not_observed','unknown','observed'].includes(v.state));if(v.state==='observed')assert(Object.values(GUARDS).includes(v.guard));else same(v.guard,null);}
 283 export function makeReadonlyPair({context,job,rawOutcome,observation}){
 284  validateContext(context);same(job,'readonly');assert(OUTCOMES.includes(rawOutcome));
 285  const value={purpose:'afw.readonly-boundary-observations.syn.v1',context,job,rawOutcome,logs:observation.logs,stage:observation.stage,http:observation.http,countCheck:observation.countCheck,tap:observation.tap,custodyLimit:observation.custodyLimit,nonclaims:NONCLAIMS};
 286  const bytes=canonical(value),manifest=canonical({purpose:'afw.readonly-boundary-observations.manifest.syn.v1',context,job,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]});assert(bytes.length+manifest.length<=16384,'stage_evidence_rejected');return new Map([['result.json',bytes],['manifest.json',manifest]]);
 287 }
 288 export async function collectFixedReadonlyPair({context,job,rawOutcome}){
 289  const e=process.env;same(process.versions.node,'22.23.4');same(e.GITHUB_JOB,'readonly');same(job,'readonly');assert(e.NODE_OPTIONS===undefined&&e.AFW_SYN_CHECKPOINT_KEY===undefined&&e.GH_ARTIFACT_TOKEN===undefined,'stage_evidence_rejected');assert(typeof e.RUNNER_TEMP==='string'&&isAbsolute(e.RUNNER_TEMP),'stage_evidence_rejected');
 290  const P=await projector(),pair=makeReadonlyPair({context,job,rawOutcome,observation:await collectOwnedReadonlyLogRoot(join(e.RUNNER_TEMP,'afw-native-private','logs'),P)});validateFixedReadonlyPairWithProjector(pair,context,job,P);return pair;
 291 }
 292 export async function validateFixedReadonlyPair(files,context,job){return validateFixedReadonlyPairWithProjector(files,context,job,await projector());}
 293 export function validateFixedReadonlyPairWithProjector(files,context,job,P){
 294  validateContext(context);same(job,'readonly');assert(files instanceof Map&&files.size===2&&files.has('result.json')&&files.has('manifest.json'));assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=16384);
 295  const read=b=>{const text=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(text);assert(canonical(v).equals(b));return v;};
 296  const value=read(files.get('result.json')),manifest=read(files.get('manifest.json'));fields(value,['purpose','context','job','rawOutcome','logs','stage','http','countCheck','tap','custodyLimit','nonclaims']);same(value.purpose,'afw.readonly-boundary-observations.syn.v1');
 297  const old={purpose:'afw.sanitized-stage-observations.syn.v1',context:value.context,job:value.job,rawOutcome:value.rawOutcome,logs:value.logs,stage:value.stage,http:value.http,countCheck:value.countCheck,nonclaims:value.nonclaims};validateValue(old,context,job,P);same({code:value.logs[0].code,site:value.logs[0].site},unknown());validateTap(value.tap);validateCustody(value.custodyLimit);if(value.custodyLimit.state==='observed'){same(value.logs[1].availability,'available');same(value.logs[1].code,'custody_limit');}if(value.logs[1].code==='custody_limit')assert(value.custodyLimit.state!=='not_observed');for(const [index,key,absent,uncertain]of [[0,'tap',tapAbsent,tapUnknown],[1,'custodyLimit',custodyAbsent,custodyUnknown]]){if(value.logs[index].availability==='missing')same(value[key],absent());else if(value.logs[index].availability!=='available')same(value[key],uncertain());}
 298  fields(manifest,['purpose','context','job','files']);same(manifest.purpose,'afw.readonly-boundary-observations.manifest.syn.v1');same(manifest.context,context);same(manifest.job,job);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;
 299 }
 300 
```

## Complete current readonly32 tests (line-numbered literal DATA)
```js
   1 import test from 'node:test';
   2 import assert from 'node:assert/strict';
   3 import * as fs from 'node:fs/promises';
   4 import {join} from 'node:path';
   5 import {tmpdir} from 'node:os';
   6 import {spawnSync} from 'node:child_process';
   7 import {createHash} from 'node:crypto';
   8 import * as D from './fixtures/finite-budget-stage-observer.mjs';
   9 import * as P from './fixtures/finite-budget-failure-diagnostic.mjs';
  10 
  11 const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/feat/finite-native-cleanup-20261101',source:'a'.repeat(40),tree:'b'.repeat(40),workflowBlob:'c'.repeat(40),run:'123',attempt:1,node:'22.23.4'};
  12 const ids=['R1','R2','R3','native_file'],file='test/mcp-qa-finite-budget-native.test.mjs',canary='PRIVATE_READONLY_BOUNDARY_CANARY';
  13 const row=(id,result='not_observed',directive='none')=>({id,result,directive});
  14 const absent={state:'not_observed',cases:ids.map(id=>row(id)),counts:null};
  15 const uncertain={state:'unknown',cases:ids.map(id=>row(id,'unknown')),counts:null};
  16 const allpass={tests:3,pass:3,fail:0,cancelled:0,skipped:0,todo:0};
  17 const details="  ---\n  duration_ms: 0.1\n  type: 'test'\n  ...\n";
  18 const prefix=n=>'TAP version 13\n'+Array.from({length:n},(_,i)=>'# Subtest: R'+(i+1)+' fixed original SDK readonly budget\nok '+(i+1)+' - R'+(i+1)+' fixed original SDK readonly budget\n'+details).join('');
  19 const summary=(n,pass=n,skip=0,todo=0)=>'1..'+n+'\n# tests '+n+'\n# suites 0\n# pass '+pass+'\n# fail 0\n# cancelled 0\n# skipped '+skip+'\n# todo '+todo+'\n# duration_ms 1.2\n';
  20 const failure=(n=2)=>prefix(n-1)+'# Subtest: R'+n+' fixed original SDK readonly budget\nnot ok '+n+' - R'+n+' fixed original SDK readonly budget\n';
  21 const canonical=v=>Buffer.from(JSON.stringify(v)+'\n');
  22 async function owned(fn){const root=await fs.mkdtemp(join(tmpdir(),'afw-readonly-owned-'));try{return await fn(root);}finally{assert(root.startsWith(join(tmpdir(),'afw-readonly-owned-')));await fs.rm(root,{recursive:true,force:true});}}
  23 function environment(){const e={...process.env};for(const key of ['NODE_OPTIONS','GH_ARTIFACT_TOKEN','AFW_SYN_CHECKPOINT_KEY','NODE_TEST_CONTEXT'])delete e[key];return e;}
  24 const realCache=new Map();
  25 async function real(mode){
  26  if(realCache.has(mode))return realCache.get(mode);assert.equal(process.versions.node,'22.23.4');
  27  const value=await owned(async root=>{
  28   await fs.mkdir(join(root,'test'));const code=String.raw`import test from 'node:test';
  29 import assert from 'node:assert/strict';
  30 const mode=__MODE__,canary=__CANARY__;
  31 if(mode==='before')throw new Error(canary);
  32 if(mode!=='empty')for(let n=1;n<=3;n++)await test('R'+n+' fixed original SDK readonly budget',()=>{
  33  if(mode==='fail'+n||mode==='failed_late'&&n===2)throw new Error(canary);
  34  if(mode==='marker'&&n===2){const key='injected\nAFW_SYN_FAILURE/1 {"code":"EACCES","site":"unknown"}\ninert';throw new assert.AssertionError({actual:{[key]:canary},expected:null,operator:'fail',message:canary});}
  35  if(mode==='poison'&&n===2){const key='injected\n  code: PRIVATE\n  stack: |-\nnot ok 3 - R3 fixed original SDK readonly budget\n1..4';const e=new assert.AssertionError({actual:{[key]:canary},expected:{[key]:canary+'2'},operator:'deepStrictEqual',message:canary});Object.defineProperty(e,key,{value:canary,enumerable:true});throw e;}
  36 });
  37 if(mode==='late'||mode==='failed_late')setImmediate(()=>{throw new Error(canary);});
  38 `.replace('__MODE__',JSON.stringify(mode)).replace('__CANARY__',JSON.stringify(canary));
  39   await fs.writeFile(join(root,file),code,{flag:'wx',mode:0o600});
  40   const fixtureEnv=environment();assert.equal(fixtureEnv.NODE_TEST_CONTEXT,undefined);
  41   const child=spawnSync(process.execPath,['--test','--test-reporter=tap',file],{cwd:root,env:fixtureEnv,encoding:'utf8',timeout:8000,maxBuffer:65536});assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.stderr,'');assert.equal(child.status,['normal','empty'].includes(mode)?0:1);return child.stdout;
  42  });realCache.set(mode,value);return value;
  43 }
  44 function first(v,n){assert.equal(v.state,'first_failure');assert.deepEqual(v.cases,ids.map((id,i)=>row(id,i<n-1?'ok':i===n-1?'not_ok':'unknown')));assert.equal(v.counts,null);}
  45 const guards=[[101,'regular_file_size_bounds'],[135,'inventory_files_or_bytes'],[150,'record_bytes'],[173,'header_bytes'],[177,'jsonl_bytes'],[179,'envelope_bytes'],[188,'envelope_input_bounds'],[215,'inspected_inventory'],[250,'expanded_jsonl_bytes'],[254,'inspected_record_bytes']];
  46 const cpath='test/fixtures/finite-checkpoint-custody.mjs';
  47 const custody=(line=101,path=cpath)=>'CustodyError: custody_limit\n    at fail ('+path+':20:24)\n    at requireValue ('+path+':24:48)\n    at publicGuard ('+path+':'+line+':4)\n';
  48 const guard=s=>D.projectCustodyLimit(s,P);
  49 const collect=(root,io)=>D.collectOwnedReadonlyLogRoot(root,P,io);
  50 const pair=(observation)=>D.makeReadonlyPair({context,job:'readonly',rawOutcome:'failure',observation});
  51 const validate=(files)=>D.validateFixedReadonlyPairWithProjector(files,context,'readonly',P);
  52 function repack(files,mutate){const value=JSON.parse(files.get('result.json'));mutate(value);const b=canonical(value),manifest=JSON.parse(files.get('manifest.json'));manifest.files=[{path:'result.json',bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')}];return new Map([['result.json',b],['manifest.json',canonical(manifest)]]);}
  53 
  54 test('b01_real_three_ok',async()=>{const v=D.projectReadonlyTap(await real('normal'));assert.equal(v.state,'complete');assert.deepEqual(v.counts,allpass);assert.deepEqual(v.cases,ids.map((id,n)=>row(id,n<3?'ok':'not_observed')));});
  55 test('b02_real_first_failure_R1',async()=>first(D.projectReadonlyTap(await real('fail1')),1));
  56 test('b03_real_first_failure_R2',async()=>first(D.projectReadonlyTap(await real('fail2')),2));
  57 test('b04_real_first_failure_R3',async()=>first(D.projectReadonlyTap(await real('fail3')),3));
  58 test('b05_real_file_before_cases',async()=>{const v=D.projectReadonlyTap(await real('before'));assert.equal(v.state,'first_failure');assert.deepEqual(v.cases,ids.map((id,n)=>row(id,n===3?'not_ok':'unknown')));assert.equal(v.counts,null);});
  59 test('b06_real_late_file_repeated_one',async()=>{const text=await real('late');assert.deepEqual([...text.matchAll(/^(?:not )?ok ([1-4]) - /gm)].map(m=>Number(m[1])),[1,2,3,1]);assert.match(text,/^1\.\.4$/m);const v=D.projectReadonlyTap(text);assert.equal(v.state,'first_failure');assert.deepEqual(v.cases,ids.map((id,n)=>row(id,n===3?'not_ok':'ok')));assert.equal(v.counts,null);});
  60 test('b07_real_failed_case_late_file_suppressed',async()=>{const text=await real('failed_late');assert(!new RegExp('^(?:not )?ok [1-4] - '+file.replaceAll('.','\\.')+'$','m').test(text));first(D.projectReadonlyTap(text),2);assert.equal(D.projectReadonlyTap(text).cases[3].result,'unknown');});
  61 test('b08_real_empty_file',async()=>{const v=D.projectReadonlyTap(await real('empty'));assert.equal(v.state,'complete');assert.equal(v.cases.slice(0,3).filter(r=>r.result==='ok').length,0);assert([0,1].includes(v.counts.tests));if(v.counts.tests===1){assert.equal(v.cases[3].result,'ok');assert.equal(v.counts.pass,1);}else assert(v.cases.every(r=>r.result==='not_observed'));});
  62 test('b09_real_multiline_enumerable_poison',async()=>{
  63  const poisoned=await real('poison');assert(poisoned.includes(canary));assert(poisoned.includes('injected'));const pure=D.projectReadonlyTap(poisoned);first(pure,2);assert(!JSON.stringify(pure).includes(canary));assert(!JSON.stringify(pure).includes('code'));assert(!JSON.stringify(pure).includes('stack'));
  64  const text=await real('marker'),marker='AFW_SYN_FAILURE/1 {"code":"EACCES","site":"unknown"}';assert.equal(text.split('\n').filter(line=>line===marker).length,1);assert(text.indexOf('\n'+marker+'\n')>text.indexOf('not ok 2 - R2 fixed original SDK readonly budget\n'));assert.deepEqual(D.projectLogText(text,P).failure,{code:'EACCES',site:'unknown'});
  65  await owned(async root=>{await fs.writeFile(join(root,'command-output.log'),text);await fs.writeFile(join(root,'seal-custody.log'),custody(150));await fs.writeFile(join(root,'own-metadata.log'),'AFW_SYN_STAGE/1 {"stage":"metadata_get","state":"start"}\nAFW_SYN_HTTP/1 {"status":200}\n');const p=pair(await collect(root)),v=validate(p);first(v.tap,2);assert.deepEqual(v.logs[0],{log:'command',availability:'available',code:'unknown',site:'unknown'});assert.deepEqual(v.custodyLimit,{state:'observed',guard:'record_bytes'});assert.deepEqual(v.stage,{state:'pending',stage:'metadata_get'});assert.equal(v.http,200);assert(!JSON.stringify(v).includes(canary));for(const mutate of [v=>v.logs[0].code='EACCES',v=>v.logs[0].site='custody_20']){const q=repack(p,mutate);assert.throws(()=>validate(q));await assert.rejects(()=>D.validateFixedReadonlyPair(q,context,'readonly'));}});
  66 });
  67 test('b10_suffix_never_interpreted',()=>{const base=failure(),expected=D.projectReadonlyTap(base);first(expected,2);for(const suffix of ['  ---\n1..4\nnot ok 1 - '+file+'\n','  expected:\n    x\nnot ok 3 - R3 fixed original SDK readonly budget\n# tests 4\n','garbage\nTAP version 14\n','not ok 2 - R2 fixed original SDK readonly budget\n'])assert.deepEqual(D.projectReadonlyTap(base+suffix),expected);});
  68 test('b11_no_coercion_and_absence',()=>{let calls=0;const value={toString(){calls++;throw Error('forbidden');}};for(const v of [null,undefined,1,value,Buffer.from('TAP version 13\n')])assert.deepEqual(D.projectReadonlyTap(v),uncertain);assert.equal(calls,0);assert.deepEqual(D.projectReadonlyTap(''),absent);});
  69 test('b12_whole_representation_caps',()=>{for(const suffix of ['x'.repeat(1025)+'\n','\n'.repeat(4097),'x\r\n','truncated','x\n'.repeat(33000)])assert.deepEqual(D.projectReadonlyTap(failure()+suffix),uncertain);assert.deepEqual(D.projectReadonlyTap('é'.repeat(32769)+'\n'),uncertain);});
  70 test('b13_prefix_structure_conflicts',()=>{for(const s of ['TAP version 14\n'+failure(),'TAP version 13\n'+failure(),'TAP version 13\nnot ok 2 - R2 fixed original SDK readonly budget\n',prefix(1)+'ok 1 - R1 fixed original SDK readonly budget\n',prefix(1)+'# Subtest: R3 fixed original SDK readonly budget\nnot ok 2 - R3 fixed original SDK readonly budget\n',prefix(1)+'  ---\n  error: PRIVATE\n  ...\n'+failure()])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});
  71 test('b14_complete_summary_coherence',()=>{const valid=prefix(3)+summary(3);assert.equal(D.projectReadonlyTap(valid).state,'complete');for(const s of [valid+summary(3),valid.replace('# pass 3','# pass 2'),valid.replace('1..3','1..4'),valid.replace('# tests 3','# tests 4'),valid.replace('# suites 0','# suites 1'),valid.replace('# fail 0','# fail 1'),prefix(3),valid.slice(0,-1)])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});
  72 test('b15_closed_directives_and_zero_plan',()=>{const s=(prefix(3)+summary(3,1,1,1)).replace('ok 2 - R2 fixed original SDK readonly budget\n','ok 2 - R2 fixed original SDK readonly budget # SKIP inert\n').replace('ok 3 - R3 fixed original SDK readonly budget\n','ok 3 - R3 fixed original SDK readonly budget # TODO inert\n');const v=D.projectReadonlyTap(s);assert.equal(v.state,'complete');assert.deepEqual(v.cases.slice(0,3).map(r=>r.directive),['none','skip','todo']);assert.deepEqual(D.projectReadonlyTap('TAP version 13\n'+summary(0)),{state:'complete',cases:ids.map(id=>row(id)),counts:{tests:0,pass:0,fail:0,cancelled:0,skipped:0,todo:0}});});
  73 test('b16_file_and_ordinal_allowlist',async()=>{for(const path of [file,'/home/runner/work/agent-friendly-web/agent-friendly-web/'+file,'file:///home/runner/work/agent-friendly-web/agent-friendly-web/'+file])assert.equal(D.projectReadonlyTap('TAP version 13\nnot ok 1 - '+path+'\n').cases[3].result,'not_ok');for(const path of ['../'+file,'/private/'+file,'./'+file])assert.deepEqual(D.projectReadonlyTap('TAP version 13\nnot ok 1 - '+path+'\n'),uncertain);for(const s of [prefix(2)+'not ok 1 - '+file+'\n',prefix(3)+'not ok 1 - R1 fixed original SDK readonly budget\n',prefix(3)+'ok 1 - '+file+'\n'])assert.deepEqual(D.projectReadonlyTap(s),uncertain);const impossible='TAP version 13\nok 1 - '+file+'\n'+details+'not ok 2 - R2 fixed original SDK readonly budget\n';assert.deepEqual(D.projectReadonlyTap(impossible),uncertain);await owned(async root=>{await fs.writeFile(join(root,'command-output.log'),impossible);await fs.writeFile(join(root,'seal-custody.log'),custody(135));const v=validate(pair(await collect(root)));assert.deepEqual(v.tap,uncertain);assert.deepEqual(v.custodyLimit,{state:'observed',guard:'inventory_files_or_bytes'});assert.equal(v.logs[0].availability,'available');});});
  74 test('b17_all_ten_public_custody_guards',()=>{for(const [line,name]of guards)assert.deepEqual(guard(custody(line)),{state:'observed',guard:name});});
  75 test('b18_first_real_guard_only',()=>{assert.deepEqual(guard(custody(135)+'    at outer ('+cpath+':101:4)\n'),{state:'observed',guard:'inventory_files_or_bytes'});assert.equal(guard(custody(188)).guard,'envelope_input_bounds');for(const caller of ['    at internal (node:internal/streams/pipeline:1:1)\n','    at external (/home/runner/work/agent-friendly-web/agent-friendly-web/lib/public-caller.mjs:2:3)\n'])assert.deepEqual(guard(custody(150)+caller),{state:'observed',guard:'record_bytes'});});
  76 test('b19_custody_generic_and_conflicts',()=>{for(const s of ['CustodyError: custody_limit\n    at fail ('+cpath+':20:24)\n',custody(999),custody()+custody(135),custody().replace('CustodyError: custody_limit','Error [ENOENT]: custody_limit'),custody()+'AFW_SYN_FAILURE/1 '+JSON.stringify({code:'EACCES',site:'custody_20'})+'\n'])assert.deepEqual(guard(s),{state:'unknown',guard:null});});
  77 test('b20_custody_path_and_frame_bounds',()=>{for(const s of [custody(101,'/private/'+cpath),custody().replace(':101:4',':101:0'),custody().replace('at publicGuard','at private path'),custody().replace('    at publicGuard','    at privateCall (/secret/hidden.mjs:1:1)\n    at publicGuard'),custody().replace(':20:24',':24:24')])assert.deepEqual(guard(s),{state:'unknown',guard:null});for(const p of ['/home/runner/work/agent-friendly-web/agent-friendly-web/'+cpath,'file:///home/runner/work/agent-friendly-web/agent-friendly-web/'+cpath])assert.equal(guard(custody(250,p)).guard,'expanded_jsonl_bytes');});
  78 test('b21_custody_absence_no_coercion_caps',()=>{let calls=0;const value={toString(){calls++;return custody();}};assert.deepEqual(guard(value),{state:'unknown',guard:null});assert.equal(calls,0);for(const s of ['','unrelated private text\n','Error [ENOENT]: PRIVATE\n'])assert.deepEqual(guard(s),{state:'not_observed',guard:null});for(const s of [custody()+'x'.repeat(1025)+'\n',custody()+'x\r\n',custody().slice(0,-1)])assert.deepEqual(guard(s),{state:'unknown',guard:null});});
  79 test('b22_read_once_coherent_projections',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),await real('fail2'));await fs.writeFile(join(root,'seal-custody.log'),custody(135));await fs.writeFile(join(root,'tap-check.log'),'AssertionError [ERR_ASSERTION]: '+canary+'\n');const reads=new Map(),io={...fs,open:async(path,...a)=>{reads.set(path,(reads.get(path)??0)+1);return fs.open(path,...a);}},v=validate(pair(await collect(root,io)));first(v.tap,2);assert.equal(v.custodyLimit.guard,'inventory_files_or_bytes');assert.equal(v.countCheck,'coded_assertion');assert([...reads.values()].every(n=>n===1));assert(!JSON.stringify(v).includes(canary));}));
  80 test('b23_missing_unsafe_and_truncated_logs',async()=>owned(async root=>{let v=validate(pair(await collect(root)));assert.deepEqual(v.tap,absent);assert.deepEqual(v.custodyLimit,{state:'not_observed',guard:null});await fs.writeFile(join(root,'target'),canary+'\n');await fs.symlink(join(root,'target'),join(root,'command-output.log'));await fs.writeFile(join(root,'seal-custody.log'),'partial');v=validate(pair(await collect(root)));assert.deepEqual(v.tap,uncertain);assert.deepEqual(v.custodyLimit,{state:'unknown',guard:null});}));
  81 test('b24_purpose_schema_and_canonicality',async()=>owned(async root=>{const p=pair(await collect(root)),v=validate(p),reversed=new Map([['manifest.json',p.get('manifest.json')],['result.json',p.get('result.json')]]);for(const files of [p,reversed]){for(const name of ['result.json','manifest.json'])assert(files.get(name).equals(p.get(name)));assert.deepEqual(validate(files),v);assert.deepEqual(await D.validateFixedReadonlyPair(files,context,'readonly'),v);}let coerced=0;const key={toString(){coerced++;throw Error('forbidden');}};for(const files of [new Map([['result.json',p.get('result.json')]]),new Map([...p,['extra',Buffer.from('')]]),new Map([['result.json','not_buffer'],['manifest.json',p.get('manifest.json')]]),new Map([[key,p.get('result.json')],['manifest.json',p.get('manifest.json')]])]){assert.throws(()=>validate(files));await assert.rejects(()=>D.validateFixedReadonlyPair(files,context,'readonly'));}assert.equal(coerced,0);assert.deepEqual(Object.keys(v),['purpose','context','job','rawOutcome','logs','stage','http','countCheck','tap','custodyLimit','nonclaims']);assert.equal(v.purpose,'afw.readonly-boundary-observations.syn.v1');assert.throws(()=>D.validateStagePairWithProjector(p,context,'readonly',P));const old=D.makeStagePair({context,job:'readonly',rawOutcome:'failure',observation:await D.collectOwnedLogRoot(root,P)});assert.throws(()=>validate(old));const q=new Map(p);q.set('result.json',Buffer.from(JSON.stringify(v,null,2)+'\n'));assert.throws(()=>validate(q));}));
  82 test('b25_context_job_manifest_and_limits',async()=>owned(async root=>{const p=pair(await collect(root));assert.throws(()=>D.validateFixedReadonlyPairWithProjector(p,{...context,run:'124'},'readonly',P));assert.throws(()=>D.validateFixedReadonlyPairWithProjector(p,context,'positive_prepare',P));for(const change of [m=>m.purpose='other',m=>m.files[0].bytes++,m=>m.files[0].path='other',m=>m.files[0].sha256='a'.repeat(64),m=>m.extra=true]){const q=new Map(p),m=JSON.parse(q.get('manifest.json'));change(m);q.set('manifest.json',canonical(m));assert.throws(()=>validate(q));}const q=new Map(p);q.set('manifest.json',Buffer.alloc(16385,32));assert.throws(()=>validate(q));q.set('extra',Buffer.from(''));assert.throws(()=>validate(q));}));
  83 test('b26_closed_enums_rows_and_nonclaims',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),await real('normal'));await fs.writeFile(join(root,'seal-custody.log'),custody());const p=pair(await collect(root));for(const mutate of [v=>v.tap.state='passed',v=>v.tap.cases[0].code='PRIVATE',v=>v.tap.cases[0].id='R4',v=>v.tap.cases[0].result='passed',v=>v.tap.cases[0].directive='other',v=>v.tap.counts.tests=4,v=>v.tap.counts.pass=2,v=>v.custodyLimit.guard='max_512',v=>v.custodyLimit.state='passed',v=>v.rawOutcome='passed',v=>v.nonclaims.PCoff=true,v=>v.private=canary])assert.throws(()=>validate(repack(p,mutate)));}));
  84 test('b27_availability_projection_truth',async()=>owned(async root=>{
  85  const p=pair(await collect(root));assert.throws(()=>validate(repack(p,v=>v.tap={state:'complete',cases:ids.map(id=>row(id)),counts:{tests:0,pass:0,fail:0,cancelled:0,skipped:0,todo:0}})));assert.throws(()=>validate(repack(p,v=>v.custodyLimit={state:'observed',guard:'record_bytes'})));
  86  const observed=repack(p,v=>{v.logs[1]={log:'seal',availability:'available',code:'custody_limit',site:'custody_20'};v.custodyLimit={state:'observed',guard:'record_bytes'};});assert.deepEqual(validate(observed).custodyLimit,{state:'observed',guard:'record_bytes'});
  87  const generic=repack(observed,v=>v.custodyLimit={state:'unknown',guard:null});assert.deepEqual(validate(generic).custodyLimit,{state:'unknown',guard:null});
  88  const ambiguous=repack(generic,v=>v.logs[1].code='unknown');assert.deepEqual(validate(ambiguous).custodyLimit,{state:'unknown',guard:null});
  89  for(const q of [repack(observed,v=>v.logs[1].code='EACCES'),repack(observed,v=>v.custodyLimit={state:'not_observed',guard:null}),repack(observed,v=>{v.logs[1]={log:'seal',availability:'missing',code:'unknown',site:'unknown'};})]){assert.throws(()=>validate(q));await assert.rejects(()=>D.validateFixedReadonlyPair(q,context,'readonly'));}
  90  for(const q of [observed,generic,ambiguous])assert.deepEqual(await D.validateFixedReadonlyPair(q,context,'readonly'),validate(q));
  91 }));
  92 test('b28_production_role_keys_options',async()=>{const saved={...process.env};try{process.env.GITHUB_JOB='qualify';await assert.rejects(()=>D.collectFixedReadonlyPair({context,job:'readonly',rawOutcome:'failure'}));process.env.GITHUB_JOB='readonly';await assert.rejects(()=>D.collectFixedReadonlyPair({context,job:'positive_prepare',rawOutcome:'failure'}));for(const key of ['NODE_OPTIONS','AFW_SYN_CHECKPOINT_KEY','GH_ARTIFACT_TOKEN']){process.env[key]='SYN_INERT';await assert.rejects(()=>D.collectFixedReadonlyPair({context,job:'readonly',rawOutcome:'failure'}));delete process.env[key];}}finally{for(const key of Object.keys(process.env))if(!Object.hasOwn(saved,key))delete process.env[key];Object.assign(process.env,saved);}});
  93 test('b29_production_version_refusal',async()=>{const source="import assert from 'node:assert/strict';const D=await import(__D__);Object.defineProperty(process.versions,'node',{value:'22.0.0'});process.env.GITHUB_JOB='readonly';await assert.rejects(()=>D.collectFixedReadonlyPair({context:__CONTEXT__,job:'readonly',rawOutcome:'failure'}));".replace('__D__',JSON.stringify(new URL('./fixtures/finite-budget-stage-observer.mjs',import.meta.url).href)).replace('__CONTEXT__',JSON.stringify(context));const child=spawnSync(process.execPath,['--input-type=module'],{input:source,env:environment(),encoding:'utf8',timeout:5000,maxBuffer:65536});assert.equal(child.error,undefined);assert.equal(child.status,0);assert.equal(child.stdout,'');assert.equal(child.stderr,'');});
  94 test('b30_new_reader_hardlink_and_fd_race',async()=>owned(async root=>{const path=join(root,'command-output.log');await fs.writeFile(join(root,'target'),'PRIVATE\n');await fs.link(join(root,'target'),path);assert.equal((await collect(root)).logs[0].availability,'unsafe');await fs.unlink(path);await fs.writeFile(path,failure());const io={...fs,open:async(...a)=>{const fd=await fs.open(...a);return {stat:()=>fd.stat(),read:async(...args)=>{const value=await fd.read(...args);await fs.appendFile(path,'changed\n');return value;},close:()=>fd.close()};}};const v=await collect(root,io);assert.equal(v.logs[0].availability,'racing');assert.deepEqual(v.tap,uncertain);}));
  95 
  96 test('b31_production_fixed_pair_and_async_validator',async()=>owned(async root=>{const saved={...process.env};try{process.env.GITHUB_JOB='readonly';process.env.RUNNER_TEMP=root;for(const key of ['NODE_OPTIONS','AFW_SYN_CHECKPOINT_KEY','GH_ARTIFACT_TOKEN'])delete process.env[key];await fs.mkdir(join(root,'afw-native-private','logs'),{recursive:true});const p=await D.collectFixedReadonlyPair({context,job:'readonly',rawOutcome:'failure'}),v=await D.validateFixedReadonlyPair(p,context,'readonly');assert.deepEqual(v.tap,absent);assert.equal(v.rawOutcome,'failure');assert.deepEqual(v.custodyLimit,{state:'not_observed',guard:null});}finally{for(const key of Object.keys(process.env))if(!Object.hasOwn(saved,key))delete process.env[key];Object.assign(process.env,saved);}}));
  97 test('b32_ok_details_closed_grammar',()=>{for(const s of [(prefix(1)+summary(1)).replace("  type: 'test'","  type: 'suite'"),(prefix(1)+summary(1)).replace('  duration_ms: 0.1','  duration_ms: PRIVATE'),(prefix(1)+summary(1)).replace('  ...','  code: PRIVATE\n  ...'),(prefix(1)+summary(1)).replace(details,'')])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});
  98 
```

## Frozen P used by injection and custody regressions (line-numbered)
```js
   1 import {types} from 'node:util';
   2 
   3 // Public source-site IDs are untrusted hints, never authenticated causes.
   4 export const FIXED_BUDGET_FAILURE_CODES=Object.freeze(["unknown","assertion","EEXIST","ENOENT","EACCES","ENOSPC","ETIMEDOUT","custody_format","custody_limit","custody_size","custody_destination","custody_authentication","custody_io","custody_cleanup"]);
   5 export const FIXED_BUDGET_FAILURE_SOURCES=Object.freeze([{"alias":"world","path":"test/fixtures/finite-budget-world.mjs","lines":[49,65,87,91,92,93,96,97,102,108,112,144,171,177,183,184,188,189,190,191,229,233,235,236,237,240,260,277,287,288,294,299,316,320,325,333,352,353,359,392,458,468,469,479,507,570,577,578,612,613,620,644,646,669,670,671,676,677,691,696,698,711,714,715,716,722,725,726,728,732,733,735,741,742,743,745,746,748,751,753,754,755,760,761,769,773,778,804,805,806,808,811,812,814,815,825,830,831,833,834,838,844,852,857,858,864,872,895,902,906,919,925,927,933,938,943,944,945,946,947,955,961,966,971,972,999,1005,1007,1014,1026,1028,1031,1040,1047,1050,1051,1052,1055,1056,1059,1060,1061,1062,1064,1072,1073,1074,1075,1076,1138,1139,1140,1145,1146,1150,1151,1152,1153,1158,1161,1168,1174,1176,1180,1181,1188,1190,1205,1214,1215,1217,1218,1219,1221,1222,1232,1236,1237,1242,1258,1265,1267,1269,1272,1275,1277,1282,1290,1300,1302,1303,1306,1308,1309,1310,1312,1313,1314,1315,1316,1317,1324,1334,1336,1344,1346,1349,1360,1365,1384,1396,1398,1409,1411,1413,1421,1422,1423,1424,1425,1436,1437,1442,1443,1457,1458,1459,1460,1461,1462,1463,1464,1466,1467,1473,1475,1476,1480,1481,1482,1483,1498,1499,1500,1501,1502,1506,1507,1508,1509,1510,1518,1520,1522,1529,1530,1531,1532,1543,1554,1558,1566,1567,1568,1575,1579,1585,1590,1591,1592,1593,1595,1596,1597,1599,1600,1613,1614,1616,1617,1618,1622,1626,1630,1633,1634,1638,1645,1647,1648,1649,1655,1682,1687,1688,1689,1699,1700,1706,1707,1713,1718,1727,1729,1744,1757,1779,1786,1788,1789,1790,1791,1796,1802,1805,1808,1811,1813,1814,1818,1820,1821,1822,1823,1825,1826,1828,1829,1830,1841,1844,1852,1853,1854,1855,1856,1859,1866,1879,1881,1885,1886,1889,1890,1891,1892,1893,1905,1912,1913,1931,1943,1948,1951,1953,1954,1956,1961,1965,1967,1969,1970,1971,1976,1978,1987,1988,1990,1994,1995,1996,1997,1998,1999,2000,2017,2035,2043,2044,2048,2053,2058,2059,2060,2061,2062,2063,2064,2065,2077,2079,2089,2090,2091]},{"alias":"native","path":"test/mcp-qa-finite-budget-native.test.mjs","lines":[11,15,26,29,58,62,77,78,79,80,81,82,83,86,88,89,94,95,96,106,107,108,109,110,111,112,113,115,116,117,118,120,129,130,131,132,133,134,135,136,137,138,139,141,142,143,145]},{"alias":"custody","path":"test/fixtures/finite-checkpoint-custody.mjs","lines":[20,22,51,76,293,302,310,321]},{"alias":"persistence","path":"test/fixtures/finite-owner-cleanup-persistence.mjs","lines":[18,20,25,26,27,28,29,31,32,35,36,37,39,40,41,42,43,45,46,47,48,49,50,52,53,54,55,56,59,64,65,66,71,72,73,78,80,88,90,97,98,100,104,108,113,114,115,121,124,128,131,139,141,145,146,147,151,153,165,166,167,169,174,178,183,188,191,192,193,194,195,199,201,211,212,213,218,220,221,222,223,225,226,227,229,230,237,243,244,251,252,257,261,262,264,265,271,272,295,296,297,298,299,300,301,302,303,304,309,319,321,323,324,325,327,331,372]},{"alias":"cleanup","path":"lib/mcp-qa-finite-owner-cleanup.mjs","lines":[41,42,49,609]},{"alias":"adapter","path":"test/fixtures/finite-owner-cleanup.mjs","lines":[15,19,34,73,96,97,101,104,106,107,108,110,111,112,117,118,119,120,121,122,126,128,133,134,138,144,147,150,153,154,156,157,160,174,178,182,183,184,187,189,193,202,203,204,205,206,208,209,211,212,213,219,220,222,225,231,235,274,290,302,303]}].map(row=>Object.freeze({...row,lines:Object.freeze(row.lines)})));
   6 export const FIXED_BUDGET_FAILURE_SITES=Object.freeze(FIXED_BUDGET_FAILURE_SOURCES.flatMap(source=>source.lines.map(line=>Object.freeze({id:source.alias+'_'+line,alias:source.alias,path:source.path,line}))));
   7 const codes=new Set(FIXED_BUDGET_FAILURE_CODES),sites=new Set(['unknown',...FIXED_BUDGET_FAILURE_SITES.map(row=>row.id)]);
   8 const root='/home/runner/work/agent-friendly-web/agent-friendly-web/';
   9 const locations=new Map(FIXED_BUDGET_FAILURE_SITES.flatMap(row=>[row.path,root+row.path,'file://'+root+row.path].map(path=>[path+':'+row.line,row.id])));
  10 const approvedPaths=new Set(FIXED_BUDGET_FAILURE_SOURCES.flatMap(row=>[row.path,root+row.path,'file://'+root+row.path]));
  11 const basenames=[...new Set(FIXED_BUDGET_FAILURE_SITES.map(row=>row.path.split('/').at(-1)))];
  12 const unavailable=()=>({code:'unknown',site:'unknown'});
  13 function stackValue(error,descriptor,readNativeStack){
  14  if(!descriptor)return undefined;
  15  if(Object.hasOwn(descriptor,'value'))return descriptor.value;
  16  // Decline every lazy representation, without calling even a supplied reader.
  17  throw null;
  18 }
  19 function boundedLines(text){
  20  if(typeof text!=='string'||text.length>65536||Buffer.byteLength(text,'utf8')>65536)return null;
  21  const lines=text.split('\n');if(lines.at(-1)==='')lines.pop();
  22  if(lines.length>4096||lines.some(line=>line.length>1024||Buffer.byteLength(line,'utf8')>1024||line.includes('\r')))return null;
  23  return lines;
  24 }
  25 function sourceSite(stack){
  26  const lines=boundedLines(stack);if(!lines||!lines.length||/^ {4}at /.test(lines[0]))return 'unknown';
  27  for(const line of lines.slice(1)){
  28   if(!/^ {4}at /.test(line))continue;
  29   const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(line);
  30   if(!match){if(basenames.some(name=>line.includes(name)))return 'unknown';continue;}
  31   const path=match[1]??match[4],number=match[2]??match[5],site=locations.get(path+':'+number);
  32   if(site)return site;
  33   if(!approvedPaths.has(path)&&basenames.some(name=>path.includes(name)))return 'unknown';
  34  }
  35  return 'unknown';
  36 }
  37 export function projectFixedBudgetFailure(error,readNativeStack){
  38  try{
  39   if(error===null||typeof error!=='object'||types.isProxy(error)||!types.isNativeError(error))return unavailable();
  40   const descriptors={};
  41   // Header fields are own DATA strings only. Multiline fields can forge frames.
  42   for(const key of ['name','message','code']){
  43    const descriptor=Object.getOwnPropertyDescriptor(error,key);
  44    if(descriptor&&!Object.hasOwn(descriptor,'value'))return unavailable();
  45    const value=descriptor?.value;
  46    if(value!==undefined&&(typeof value!=='string'||!boundedLines(value)||value.includes('\n')||value.includes('\r')))return unavailable();
  47    descriptors[key]=value;
  48   }
  49   const stack=stackValue(error,Object.getOwnPropertyDescriptor(error,'stack'),readNativeStack);
  50   if(stack!==undefined&&(typeof stack!=='string'||!boundedLines(stack)))return unavailable();
  51   const {code:rawCode,message}=descriptors;
  52   let code='unknown';
  53   if(rawCode==='ERR_ASSERTION')code='assertion';
  54   else if(['EEXIST','ENOENT','EACCES','ENOSPC','ETIMEDOUT'].includes(rawCode))code=rawCode;
  55   else if(['custody_format','custody_limit','custody_size','custody_destination','custody_authentication','custody_io','custody_cleanup'].includes(message))code=message;
  56   return {code,site:stack===undefined?'unknown':sourceSite(stack)};
  57  }catch{return unavailable();}
  58 }
  59 export function projectFixedBudgetLog(text){
  60  try{
  61   const lines=boundedLines(text);if(!lines||!text.endsWith('\n'))return unavailable();
  62   const markers=lines.filter(line=>line.includes('AFW_SYN_FAILURE/1'));
  63   if(markers.length!==1||!markers[0].startsWith('AFW_SYN_FAILURE/1 '))return unavailable();
  64   const source=markers[0].slice('AFW_SYN_FAILURE/1 '.length),value=JSON.parse(source);
  65   if(value===null||typeof value!=='object'||Array.isArray(value)||JSON.stringify(Object.keys(value))!=='["code","site"]'||JSON.stringify(value)!==source)return unavailable();
  66   if(!codes.has(value.code)||!sites.has(value.site))return unavailable();
  67   return {code:value.code,site:value.site};
  68  }catch{return unavailable();}
  69 }
  70 
```

## Current qualification Q, S and verifier V (literal DATA)
Q:
```js
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import * as S from './afw-readonly-finalfix-receiver.mjs';
const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
const blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
let stage='pins',failedIds=[];
async function main(){
 const e=process.env;assert.equal(process.versions.node,'22.23.4');for(const key of ['NODE_OPTIONS','GH_ARTIFACT_TOKEN','AFW_SYN_CHECKPOINT_KEY'])assert.equal(e[key],undefined);assert.deepEqual(process.execArgv,[]);assert.equal(e.GITHUB_JOB,'qualify');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');
 const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);
 const checked={};for(const [key,pin]of Object.entries(S.PINS)){const b=await readFile(pin.path);assert.equal(b.length,pin.bytes);assert.equal(blob(b),pin.blob);assert.equal(S.sha(b),pin.sha256);checked[key]=b;}
 const b=await readFile(join(e.RUNNER_TEMP,'afw-readonly-finalfix-integrated-candidate.yml'));assert.equal(b.length,S.CANDIDATE.bytes);assert.equal(blob(b),S.CANDIDATE.blob);assert.equal(S.sha(b),S.CANDIDATE.sha256);assert(b.length<=524288);const candidate=new TextDecoder('utf-8',{fatal:true}).decode(b);assert(Buffer.from(candidate).equals(b));
 const extract=(text,marker)=>{const opening="<<'"+marker+"'\n",closing='\n          '+marker+'\n';assert.equal(text.split(opening).length,2);const parts=text.split(opening)[1].split(closing);assert.equal(parts.length,2);const lines=parts[0].split('\n');assert(lines.every(l=>l.startsWith('          ')));return Buffer.from(lines.map(l=>l.slice(10)).join('\n')+'\n');};
 const programs={};for(const [key,marker]of Object.entries({adapter:'NODE_SUITE_ADAPTER',controls:'NODE_SUITE_CONTROLS',verifier:'NODE_SUITE_VERIFIER',safeZip:'NODE_SAFE_ZIP'})){const p=extract(candidate,marker);assert.equal(p.length,S.PROGRAMS[key].bytes);assert.equal(S.sha(p),S.PROGRAMS[key].sha256);programs[key]=p;}
 const D=await import('data:text/javascript;base64,'+checked.observer.toString('base64'));const childEnv={...e};for(const key of ['NODE_OPTIONS','GH_ARTIFACT_TOKEN','AFW_SYN_CHECKPOINT_KEY'])delete childEnv[key];
 function run(file,ids,expected){
  const child=spawnSync(process.execPath,['--test','--test-reporter=tap',file],{env:childEnv,encoding:'utf8',timeout:45000,maxBuffer:1048576});assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.stderr,'');
  assert.deepEqual([...child.stdout.matchAll(/^(?:not )?ok \d+ - ([bs]\d+_[^\n]+)$/gm)].map(m=>m[1]),ids);failedIds=[...child.stdout.matchAll(/^not ok \d+ - ([bs]\d+_[^\n]+)$/gm)].map(m=>m[1]);assert.deepEqual(failedIds,expected);
  const v={exit:child.status};for(const k of ['tests','pass','fail','cancelled','skipped','todo']){const m=[...child.stdout.matchAll(new RegExp('^# '+k+' (\\d+)$','gm'))];assert.equal(m.length,1);v[k]=Number(m[0][1]);}assert.equal(v.tests,ids.length);assert.equal(v.fail,expected.length);assert.equal(v.pass,ids.length-expected.length);for(const k of ['cancelled','skipped','todo'])assert.equal(v[k],0);assert.equal(v.exit,expected.length?1:0);failedIds=[];return v;
 }
 const roots=[];
 try{
  stage='old_four_red';const oldRoot=join(e.RUNNER_TEMP,'afw-readonly-finalfix-oldD'),oldFixtures=join(oldRoot,'test','fixtures');roots.push(oldRoot);await mkdir(oldFixtures,{recursive:true,mode:0o700});
  const oldD=await readFile(join(e.RUNNER_TEMP,'afw-readonly-finalfix-old-observer.mjs'));assert.equal(oldD.length,S.OLD_OBSERVER.bytes);assert.equal(blob(oldD),S.OLD_OBSERVER.blob);assert.equal(S.sha(oldD),S.OLD_OBSERVER.sha256);await writeFile(join(oldFixtures,'finite-budget-stage-observer.mjs'),oldD,{flag:'wx',mode:0o600});for(const key of ['runtime','helper'])await writeFile(join(oldFixtures,S.PINS[key].path.split('/').at(-1)),checked[key],{flag:'wx',mode:0o600});
  const source=checked.readonlyTests.toString('utf8'),anchors=[...source.matchAll(/^test\('(b\d\d_[^']+)',/gm)];assert.deepEqual(anchors.map(m=>m[1]),S.TEST_IDS);assert.equal(S.REGRESSION_IDS.length,4);const selected=anchors.filter(m=>S.REGRESSION_IDS.includes(m[1]));assert.deepEqual(selected.map(m=>m[1]),S.REGRESSION_IDS);const focused=source.slice(0,anchors[0].index)+selected.map(m=>{const n=anchors.indexOf(m);return source.slice(m.index,anchors[n+1]?.index??source.length);}).join('\n');assert.deepEqual([...focused.matchAll(/^test\('(b\d\d_[^']+)',/gm)].map(m=>m[1]),S.REGRESSION_IDS);const oldFile=join(oldRoot,'test','finite-budget-readonly-observer.test.mjs');await writeFile(oldFile,focused,{flag:'wx',mode:0o600});const oldFourRed=run(oldFile,S.REGRESSION_IDS,S.REGRESSION_IDS);
  stage='all_unknown';const root=join(e.RUNNER_TEMP,'afw-readonly-finalfix-allunknown'),fixtures=join(root,'test','fixtures');roots.push(root);await mkdir(fixtures,{recursive:true,mode:0o700});
  let stub=checked.observer.toString('utf8').replace('export function projectReadonlyTap(','function unusedCandidateReadonlyTap(').replace('export function projectCustodyLimit(','function unusedCandidateCustodyLimit(');assert(stub!==checked.observer.toString('utf8'));stub+="\nexport const projectReadonlyTap=()=>({state:'unknown',cases:['R1','R2','R3','native_file'].map(id=>({id,result:'unknown',directive:'none'})),counts:null});\nexport const projectCustodyLimit=()=>({state:'unknown',guard:null});\n";
  await writeFile(join(fixtures,'finite-budget-stage-observer.mjs'),stub,{flag:'wx',mode:0o600});for(const key of ['runtime','helper'])await writeFile(join(fixtures,S.PINS[key].path.split('/').at(-1)),checked[key],{flag:'wx',mode:0o600});await writeFile(join(root,'test','finite-budget-readonly-observer.test.mjs'),checked.readonlyTests,{flag:'wx',mode:0o600});
  const allUnknown=run(join(root,'test','finite-budget-readonly-observer.test.mjs'),S.TEST_IDS,S.NEGATIVE_IDS);
  stage='readonly';const readonly=run(S.PINS.readonlyTests.path,S.TEST_IDS,[]);
  stage='stage_regressions';const stageTests=run(S.PINS.tests.path,S.OLD_TEST_IDS,[]);const tests={oldFourRed,allUnknown,readonly,stage:stageTests};
  stage='integration';const integration=[],record=async(id,fn)=>{failedIds=[id];await fn();integration.push({id,status:'passed'});failedIds=[];};
  await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins:S.SOURCE_PINS,programHashes:Object.fromEntries(Object.entries(S.PROGRAMS).map(([k,v])=>[k,v.sha256]))})+'\n',{flag:'wx',mode:0o600});const A=await import('data:text/javascript;base64,'+programs.adapter.toString('base64'));
  const blocks=text=>{
   const roots=[...text.matchAll(/^jobs:\n/gm)];assert.equal(roots.length,1);
   const rest=text.slice(roots[0].index+roots[0][0].length),nextRoot=/^[^\s#]/m.exec(rest),body=nextRoot?rest.slice(0,nextRoot.index):rest;
   const rows=[...body.matchAll(/^  ([a-z_]+):\n/gm)];assert.deepEqual(rows.map(m=>m[1]),['contracts','positive_prepare','positive_consume','reduction_prepare','reduction_consume_a','readonly','reduction_consume_b','verify']);
   return Object.fromEntries(rows.map((m,i)=>[m[1],body.slice(m.index,rows[i+1]?.index??body.length)]));
  };
  const step=(block,id)=>{const all=[...block.matchAll(/^      - name: /gm)],matches=all.map((m,i)=>block.slice(m.index,all[i+1]?.index??block.length)).filter(s=>s.includes('\n        id: '+id+'\n'));assert.equal(matches.length,1);return matches[0];};
  await record(S.INTEGRATION_IDS[0],()=>assert.equal(A.validateKeyScopes(candidate),true));
  await record(S.INTEGRATION_IDS[1],()=>assert.equal(A.validateFixedCases(candidate),true));
  await record(S.INTEGRATION_IDS[2],()=>{const token='$'+'{{ '+'se'+'crets.AFW_SYN_CHECKPOINT_KEY '+'}}',i=candidate.indexOf('          NATIVE_OUTCOME: ');assert(i>=0);const end=candidate.indexOf('\n',i);assert.throws(()=>A.validateKeyScopes(candidate.slice(0,end)+'\n          DIAG_KEY: '+token+candidate.slice(end)));});
  await record(S.INTEGRATION_IDS[3],()=>{assert.equal(A.validateWorkflow(candidate),true);assert.equal([...candidate.matchAll(/^    if: \$\{\{ false &&/gm)].length,8);assert.equal([...candidate.matchAll(/const diagnosticPins=/g)].length,8);});
  await record(S.INTEGRATION_IDS[4],()=>{const source=programs.adapter.toString('utf8'),start=source.indexOf('// Fixed reviewed seed field policy.'),end=source.indexOf('export function keyScopeParserProvenance');assert(start>=0&&end>start);assert.equal(S.sha(Buffer.from(source.slice(start,end))),'4ab84021b6fcd0afdeb8b3875fa513b31a78c335c5856c9c3811e71b98fb1b7c');for(const key of ['adapter','controls','verifier','safeZip'])assert.equal(S.sha(programs[key]),S.PROGRAMS[key].sha256);});
  function publication(text){const b=blocks(text);for(const job of D.JOBS){const pair=step(b[job],'summary_pair'),upload=step(b[job],'summary_upload'),truth=step(b[job],'actual_outcome');for(const value of [pair,upload])assert.equal([...value.matchAll(/^        continue-on-error: true$/gm)].length,1);assert(pair.includes("\n        if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'\n"));assert(upload.includes("\n        if: always() && !cancelled() && steps.summary_pair.outcome == 'success'\n"));assert(b[job].includes('safe-id: $'+'{{ steps.summary_upload.outputs.artifact-id }}'));assert(b[job].includes('safe-digest: $'+'{{ steps.summary_upload.outputs.artifact-digest }}'));assert(truth.includes("test '$"+'{{ steps.native.outcome }}'+"' = success"));assert(!truth.includes('continue-on-error:'));}return true;}
  await record(S.INTEGRATION_IDS[5],()=>{assert(publication(candidate));assert.throws(()=>publication(candidate.replaceAll('        continue-on-error: true\n','')));});
  await record(S.INTEGRATION_IDS[6],()=>{let original=candidate.replaceAll('AFW-READONLY-BOUNDARY-FOCUSED-ONEUSE-20261114','AFW STAGE OBSERVATIONS NATIVE HELD 20261114').replaceAll(S.PINS.observer.blob,'cd0064870282d7d31509911a26d9936ebf3f5492').replaceAll(S.PINS.observer.sha256,'dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f').replaceAll(String(S.PINS.observer.bytes),'16114').replace("D.collectFixedReadonlyPair({context,job:'readonly'","D.collectFixedStagePair({context,job:'readonly'").replaceAll("          test -z \"\u0024{NODE_OPTIONS+x}\"\n          node --input-type=module <<'NODE_SUITE_BOOTSTRAP'","          node --input-type=module <<'NODE_SUITE_BOOTSTRAP'");const b=Buffer.from(original);assert.equal(b.length,S.BASIS.bytes);assert.equal(blob(b),S.BASIS.blob);assert.equal(S.sha(b),S.BASIS.sha256);});
  await record(S.INTEGRATION_IDS[7],()=>{const b=blocks(candidate);let focused=candidate;for(const name of ['contracts','readonly','verify']){const block=b[name],changed=block.replace('if: $'+'{{ false &&','if: $'+'{{');focused=focused.replace(block,()=>changed);}assert.equal([...focused.matchAll(/^    if: \$\{\{ false &&/gm)].length,5);assert.equal(A.validateKeyScopes(focused),true);assert.equal(A.validateWorkflow(focused),true);const verify=blocks(focused).verify;assert(verify.includes("if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'"));assert(verify.indexOf('node \"$RUNNER_TEMP/afw-suite-verifier.mjs\"')<verify.indexOf('console.log(D.assignmentLine'));const needs=Object.fromEntries(D.NEEDS.map(job=>[job,{result:['contracts','readonly'].includes(job)?'success':'skipped',outputs:{}}]));needs.readonly.outputs={'safe-id':'123','safe-digest':'a'.repeat(64)};assert.deepEqual(D.projectAssignments(JSON.stringify(needs)).find(r=>r.job==='readonly'),{job:'readonly',state:'assigned',artifactId:'123',zipSha256:'a'.repeat(64)});});
  function startups(text){const b=blocks(text),literal="          test -z \"\u0024{NODE_OPTIONS+x}\"\n          node --input-type=module <<'NODE_SUITE_BOOTSTRAP'";assert.equal(Object.keys(b).length,8);for(const block of Object.values(b))assert.equal(block.split(literal).length,2);assert(step(b.readonly,'summary_pair').includes("D.collectFixedReadonlyPair({context,job:'readonly'"));for(const job of ['positive_prepare','reduction_prepare'])assert(step(b[job],'summary_pair').includes('D.collectFixedStagePair('));}
  await record(S.INTEGRATION_IDS[8],()=>{startups(candidate);assert.throws(()=>startups(candidate.replaceAll('          test -z "\u0024{NODE_OPTIONS+x}"\n','')));});
  await record(S.INTEGRATION_IDS[9],async()=>{const paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};for(const [key,path]of Object.entries(paths))assert.equal(blob(await readFile(path)),S.SOURCE_PINS[key]);const source=(await readFile(paths.custodyBlob,'utf8')).split('\n');for(const line of [101,135,150,173,177,179,188,215,250,254])assert(source[line-1].includes("'limit'"));assert.equal(JSON.parse(await readFile(paths.lockBlob,'utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,S.SOURCE_PINS.sdkVersion);});
  stage='receiver';const receiver=S.runReceiverControls(context);stage='pins';for(const [key,pin]of Object.entries(S.PINS)){const bytes=await readFile(pin.path);assert.equal(S.sha(bytes),pin.sha256);assert(bytes.equals(checked[key]));}
  stage='pair';const value={purpose:'afw.readonly-boundary.finalfix.qualification.syn.v1',role:'independent-zero-afw-key-readonly-finalfix-qualification',context,pins:S.PINS,oldObserver:S.OLD_OBSERVER,sourcePins:S.SOURCE_PINS,candidate:S.CANDIDATE,basis:S.BASIS,programs:S.PROGRAMS,tests,controls:{oldRegressionFailIds:S.REGRESSION_IDS,negativeFailIds:S.NEGATIVE_IDS,readonlyIds:S.TEST_IDS,stageIds:S.OLD_TEST_IDS,integration,receiver},nonclaims:S.NONCLAIMS},files=S.pair(value);S.validatePair(files,context);const output=join(e.RUNNER_TEMP,'afw-readonly-finalfix-SMALLSAFE');await mkdir(output,{mode:0o700});for(const [name,bytes]of files)await writeFile(join(output,name),bytes,{flag:'wx',mode:0o600});console.log('AFW_READONLY_FINALFIX_BOUNDARY_QUALIFIED/1 '+JSON.stringify({oldFourFail:oldFourRed.fail,readonly:readonly.tests,stage:stageTests.tests,allUnknownFail:allUnknown.fail,integration:integration.length,receiver:receiver.length}));
 }finally{for(const root of roots){assert(root.startsWith(join(e.RUNNER_TEMP,'afw-readonly-finalfix-')));await rm(root,{recursive:true,force:true});}}
}
main().catch(()=>{console.error('AFW_READONLY_FINALFIX_BOUNDARY_QUALIFICATION_FAILED/1 '+JSON.stringify({stage,failedIds:failedIds.filter(id=>[...S.TEST_IDS,...S.OLD_TEST_IDS,...S.INTEGRATION_IDS].includes(id))}));process.exitCode=1;});

```
S:
```js
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
export const PINS=Object.freeze({"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"blob":"83db9cda42ae828998fbe1d3007071825dc31d0c","sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"blob":"62965a9d5836e54563550fe29dff23abe9a62054","sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","blob":"0c35147c79e26298a7778937b2a69641eabcba18","bytes":28993,"sha256":"59d3090130f7b7820f562d3843792aeddab3dc1ff6450127178e1e677565d385"},"tests":{"path":"test/finite-budget-stage-observer.test.mjs","bytes":13868,"blob":"28a9f114ef18e3e3faba6d75cc808f56bcc84eeb","sha256":"083806c3bbd2b86ead50b55c6c2138dfcd6f6aef02f02f496ac8c4a0bfd344db"},"readonlyTests":{"path":"test/finite-budget-readonly-observer.test.mjs","blob":"dcd8a8b31838e3b1baf34dfd8e7ccbbd26ba7fca","bytes":23473,"sha256":"b43cc35686d0cdac04816164a89fb6d80bfbd282f93f5edc8dbd67f2e935337c"},"world":{"path":"test/fixtures/finite-budget-world.mjs","bytes":243656,"blob":"1e18873791e0520fff611e353232e38786c51941","sha256":"125bfb65ebf5a87fb1301750ffeae4fe52f24dd6049828cf8c8557b94d886855"}});
export const OLD_OBSERVER=Object.freeze({"commit":"87bbab1ea53ade7d385aa58a72f1a3066260ddf3","path":"test/fixtures/finite-budget-stage-observer.mjs","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5"});
export const REGRESSION_IDS=Object.freeze(["b09_real_multiline_enumerable_poison","b16_file_and_ordinal_allowlist","b24_purpose_schema_and_canonicality","b27_availability_projection_truth"]);
export const SOURCE_PINS=Object.freeze({"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"1e18873791e0520fff611e353232e38786c51941","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"});
export const CANDIDATE=Object.freeze({"commit":"fc02dd4105512f0e29716f4c72e031d0910b1692","tree":"15d48bbac771b63173d9e89828b53773a0199057","bytes":367631,"blob":"4cf7e93ae0079bdbf9cab3f38c15e6ee179a8e10","sha256":"f4ef9ee1e40b282a1600d6d72f74dad231cc19467a1b47e22ed5d6707640714e"});
export const BASIS=Object.freeze({"commit":"32ca318743b26a8a6d54ef743c9f101609525491","tree":"c578f1b74ed69f99d22f4eef892a0d12e6257a75","bytes":367308,"blob":"79e3bdcaeaa729195a09897a36fca8053fbb7b13","sha256":"259a4274b315b760265f9f625914efe583a4988b901663aea537dc483674d278"});
export const PROGRAMS=Object.freeze({"adapter":{"bytes":63917,"sha256":"ae52aab0185c10e92fff9121411c1c9a782d0f8237b3d430016a283c048566f9"},"controls":{"bytes":63195,"sha256":"52823dc8a5c8259b9a4e4780afd33a5ce6bc97da351cd7aa8e4805aad4aaab71"},"verifier":{"bytes":15099,"sha256":"94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf"},"safeZip":{"bytes":13305,"sha256":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}});
export const TEST_IDS=Object.freeze(["b01_real_three_ok","b02_real_first_failure_R1","b03_real_first_failure_R2","b04_real_first_failure_R3","b05_real_file_before_cases","b06_real_late_file_repeated_one","b07_real_failed_case_late_file_suppressed","b08_real_empty_file","b09_real_multiline_enumerable_poison","b10_suffix_never_interpreted","b11_no_coercion_and_absence","b12_whole_representation_caps","b13_prefix_structure_conflicts","b14_complete_summary_coherence","b15_closed_directives_and_zero_plan","b16_file_and_ordinal_allowlist","b17_all_ten_public_custody_guards","b18_first_real_guard_only","b19_custody_generic_and_conflicts","b20_custody_path_and_frame_bounds","b21_custody_absence_no_coercion_caps","b22_read_once_coherent_projections","b23_missing_unsafe_and_truncated_logs","b24_purpose_schema_and_canonicality","b25_context_job_manifest_and_limits","b26_closed_enums_rows_and_nonclaims","b27_availability_projection_truth","b28_production_role_keys_options","b29_production_version_refusal","b30_new_reader_hardlink_and_fd_race","b31_production_fixed_pair_and_async_validator","b32_ok_details_closed_grammar"]);
export const NEGATIVE_IDS=Object.freeze(["b01_real_three_ok","b02_real_first_failure_R1","b03_real_first_failure_R2","b04_real_first_failure_R3","b05_real_file_before_cases","b06_real_late_file_repeated_one","b07_real_failed_case_late_file_suppressed","b08_real_empty_file","b09_real_multiline_enumerable_poison","b10_suffix_never_interpreted","b11_no_coercion_and_absence","b14_complete_summary_coherence","b15_closed_directives_and_zero_plan","b16_file_and_ordinal_allowlist","b17_all_ten_public_custody_guards","b18_first_real_guard_only","b20_custody_path_and_frame_bounds","b21_custody_absence_no_coercion_caps","b22_read_once_coherent_projections"]);
export const OLD_TEST_IDS=Object.freeze(["s01_exact_stage_chain","s02_one_pending_stage","s03_every_pending_stage","s04_no_observations","s05_sequence_gap","s06_duplicate_stage","s07_conflicting_completion","s08_marker_canonical_schema","s09_http_bounded_only","s10_http_conflicts","s11_canonical_failure_only","s12_legacy_system_code","s13_legacy_custody_enum","s14_legacy_assertion","s15_legacy_private_frame_rejected","s16_failure_conflict","s17_no_message_or_path_echo","s18_code_token_not_substring","s19_missing_logs","s20_real_files_and_closed_pair","s21_symlink_file","s22_symlink_parent","s23_hardlink_rejected","s24_file_bound","s25_tail_truncation_and_marker_prefix","s26_malformed_utf8_and_lines","s27_fd_path_race","s28_fd_mutation_race","s29_readonly_aggregate_truth","s30_pair_fail_closed","s31_exact_assignment_projection","s32_assignment_unavailability_no_borrow","s33_production_token_not_inherited","s34_legacy_conflicting_claims_poison_canonical","s35_real_fifo_swap_bounded_before_read","s36_partial_prefix_only_nonempty_edges"]);
export const INTEGRATION_IDS=Object.freeze(["i01_actual_key_scope_ast","i02_actual_fixed_cases","i03_diagnostic_secret_rejected","i04_actual_eight_job_workflow","i05_frozen_parser_programs","i06_six_coe_truth_assignments","i07_exact_reverse_basis","i08_focused_three_mask","i09_eight_startup_and_readonly_method","i10_source_and_guard_table"]);
export const RECEIVER_IDS=Object.freeze(["r01_closed_canonical_pair","r02_candidate_pin","r03_counts_and_inventory","r04_seven_nonclaims","r05_current_context","r06_manifest_binding","r07_purpose_and_extra_fields","r08_old_stage_pin"]);

export const NONCLAIMS=Object.freeze({historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
export const sha=b=>createHash('sha256').update(b).digest('hex');
export const canonical=v=>Buffer.from(JSON.stringify(v)+'\n');
const same=(a,b)=>assert.deepEqual(a,b,'readonly_qualification_rejected');
const fields=(v,k)=>{assert(v&&typeof v==='object'&&!Array.isArray(v));same(Object.keys(v),k);};
const statuses=ids=>ids.map(id=>({id,status:'passed'}));
export function validateContext(v){fields(v,['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node']);same(v.repository,'tokenizartinfo-ops/agent-friendly-web');same(v.repositoryId,'1347578006');same(v.ref,'refs/heads/feat/finite-native-cleanup-20261101');for(const k of ['source','tree','workflowBlob'])assert.match(v[k],/^[a-f0-9]{40}$/);assert.match(v.run,/^[1-9][0-9]*$/);same(v.attempt,1);same(v.node,'22.23.4');}
function counts(v,total,fail){fields(v,['exit','tests','pass','fail','cancelled','skipped','todo']);for(const n of Object.values(v))assert(Number.isSafeInteger(n)&&n>=0);same(v,{exit:fail?1:0,tests:total,pass:total-fail,fail,cancelled:0,skipped:0,todo:0});}
function result(v,context){fields(v,['purpose','role','context','pins','oldObserver','sourcePins','candidate','basis','programs','tests','controls','nonclaims']);same(v.purpose,'afw.readonly-boundary.finalfix.qualification.syn.v1');same(v.role,'independent-zero-afw-key-readonly-finalfix-qualification');validateContext(v.context);same(v.context,context);same(v.pins,PINS);same(v.oldObserver,OLD_OBSERVER);same(v.sourcePins,SOURCE_PINS);same(v.candidate,CANDIDATE);same(v.basis,BASIS);same(v.programs,PROGRAMS);fields(v.tests,['oldFourRed','allUnknown','readonly','stage']);counts(v.tests.oldFourRed,REGRESSION_IDS.length,REGRESSION_IDS.length);counts(v.tests.allUnknown,TEST_IDS.length,NEGATIVE_IDS.length);counts(v.tests.readonly,TEST_IDS.length,0);counts(v.tests.stage,OLD_TEST_IDS.length,0);fields(v.controls,['oldRegressionFailIds','negativeFailIds','readonlyIds','stageIds','integration','receiver']);same(v.controls.oldRegressionFailIds,REGRESSION_IDS);same(v.controls.negativeFailIds,NEGATIVE_IDS);same(v.controls.readonlyIds,TEST_IDS);same(v.controls.stageIds,OLD_TEST_IDS);same(v.controls.integration,statuses(INTEGRATION_IDS));same(v.controls.receiver,statuses(RECEIVER_IDS));same(v.nonclaims,NONCLAIMS);}
function parse(b){assert(Buffer.isBuffer(b)&&b.length>0&&b.length<=65536);const text=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(text);assert(canonical(v).equals(b));return v;}
export function pair(v){const b=canonical(v);return new Map([['result.json',b],['manifest.json',canonical({purpose:'afw.readonly-boundary.finalfix.qualification.manifest.syn.v1',context:v.context,files:[{path:'result.json',bytes:b.length,sha256:sha(b)}]})]]);}
export function validatePair(files,context){validateContext(context);assert(files instanceof Map);same([...files.keys()].sort(),['manifest.json','result.json']);assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=65536);const value=parse(files.get('result.json')),manifest=parse(files.get('manifest.json'));result(value,context);fields(manifest,['purpose','context','files']);same(manifest.purpose,'afw.readonly-boundary.finalfix.qualification.manifest.syn.v1');same(manifest.context,context);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;}
export function runReceiverControls(context){
 const out=[],record=(id,fn)=>{fn();out.push({id,status:'passed'});},clone=v=>JSON.parse(JSON.stringify(v));const count=(n,fail=0)=>({exit:fail?1:0,tests:n,pass:n-fail,fail,cancelled:0,skipped:0,todo:0});
 const fixture={purpose:'afw.readonly-boundary.finalfix.qualification.syn.v1',role:'independent-zero-afw-key-readonly-finalfix-qualification',context,pins:PINS,oldObserver:OLD_OBSERVER,sourcePins:SOURCE_PINS,candidate:CANDIDATE,basis:BASIS,programs:PROGRAMS,tests:{oldFourRed:count(REGRESSION_IDS.length,REGRESSION_IDS.length),allUnknown:count(TEST_IDS.length,NEGATIVE_IDS.length),readonly:count(TEST_IDS.length),stage:count(OLD_TEST_IDS.length)},controls:{oldRegressionFailIds:REGRESSION_IDS,negativeFailIds:NEGATIVE_IDS,readonlyIds:TEST_IDS,stageIds:OLD_TEST_IDS,integration:statuses(INTEGRATION_IDS),receiver:statuses(RECEIVER_IDS)},nonclaims:NONCLAIMS};
 const reject=mutate=>{const v=clone(fixture);mutate(v);assert.throws(()=>validatePair(pair(v),context));};
 record(RECEIVER_IDS[0],()=>{same(validatePair(pair(fixture),context),fixture);const f=pair(fixture);f.set('result.json',Buffer.from(JSON.stringify(fixture,null,2)+'\n'));assert.throws(()=>validatePair(f,context));});
 record(RECEIVER_IDS[1],()=>reject(v=>{v.candidate.blob='a'.repeat(40);}));
 record(RECEIVER_IDS[2],()=>{reject(v=>v.controls.readonlyIds.push('unknown'));reject(v=>v.tests.readonly.fail++);reject(v=>v.controls.negativeFailIds.pop());reject(v=>v.controls.oldRegressionFailIds.pop());reject(v=>v.tests.oldFourRed.fail--);});
 record(RECEIVER_IDS[3],()=>reject(v=>{v.nonclaims.receiptAuthenticated=true;}));
 record(RECEIVER_IDS[4],()=>reject(v=>{v.context.run=context.run==='1'?'2':'1';}));
 record(RECEIVER_IDS[5],()=>{const f=pair(fixture),m=JSON.parse(f.get('manifest.json'));m.files[0].bytes++;f.set('manifest.json',canonical(m));assert.throws(()=>validatePair(f,context));});
 record(RECEIVER_IDS[6],()=>{reject(v=>{v.purpose='afw.sanitized-stage-observations.finalfix.qualification.syn.v1';});reject(v=>{v.extra=true;});});
 record(RECEIVER_IDS[7],()=>{reject(v=>{v.pins.tests.blob='a'.repeat(40);});reject(v=>{v.oldObserver.blob='a'.repeat(40);});});return out;
}

```
V:
```js
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import * as S from './afw-readonly-finalfix-receiver.mjs';
import * as Z from './afw-suite-safe-zip.mjs';

const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
async function main(){
 const env=process.env;assert.equal(process.versions.node,'22.23.4');assert.equal(env.NODE_OPTIONS,undefined);assert.equal(env.AFW_SYN_CHECKPOINT_KEY,undefined);assert.equal(env.GITHUB_JOB,'verify');assert.equal(env.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(env.GITHUB_RUN_ATTEMPT,'1');
 const context={repository:env.GITHUB_REPOSITORY,repositoryId:env.GITHUB_REPOSITORY_ID,ref:env.GITHUB_REF,source:env.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:env.GITHUB_RUN_ID,attempt:Number(env.GITHUB_RUN_ATTEMPT),node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);assert.equal(env.QUALIFY_RESULT,'success');
 for(const pin of Object.values(S.PINS)){const bytes=await readFile(pin.path);assert.equal(bytes.length,pin.bytes);assert.equal(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),pin.blob);assert.equal(S.sha(bytes),pin.sha256);}
 
 const id=env.QUALIFY_ARTIFACT_ID,digest=env.QUALIFY_ARTIFACT_DIGEST,token=env.GH_ARTIFACT_TOKEN;assert.match(id,/^[1-9][0-9]*$/);assert.match(digest,/^[a-f0-9]{64}$/);assert(typeof token==='string'&&token.length>0);
 async function json(path){const response=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web'+path,{redirect:'error',headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});assert.equal(response.status,200);assert(response.body);const parts=[],reader=response.body.getReader();let size=0;try{for(;;){const item=await reader.read();if(item.done)break;size+=item.value.byteLength;assert(size<=65536);parts.push(Buffer.from(item.value));}}catch(error){try{await reader.cancel();}catch{}throw error;}return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(parts)));}
 const run=await json('/actions/runs/'+context.run);assert.equal(run.id,Number(context.run));assert.equal(run.run_attempt,1);assert.equal(run.head_sha,context.source);assert.equal(run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(run.event,env.GITHUB_EVENT_NAME);assert.equal(run.path,'.github/workflows/afw-finite-budget-qualification.yml');assert.equal(run.repository.id,1347578006);assert.equal(run.head_repository.id,1347578006);
 const metadata=await json('/actions/artifacts/'+id),name='readonly-boundary-finalfix-SMALLSAFE-'+context.source+'-'+context.run;
 assert.equal(metadata.id,Number(id));assert.equal(metadata.name,name);assert.equal(metadata.expired,false);assert.equal(metadata.digest,'sha256:'+digest);assert(Number.isSafeInteger(metadata.size_in_bytes)&&metadata.size_in_bytes>0&&metadata.size_in_bytes<=65536);
 assert.equal(metadata.workflow_run.id,Number(context.run));assert.equal(metadata.workflow_run.repository_id,1347578006);assert.equal(metadata.workflow_run.head_repository_id,1347578006);assert.equal(metadata.workflow_run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(metadata.workflow_run.head_sha,context.source);
 const created=Date.parse(metadata.created_at),expires=Date.parse(metadata.expires_at);assert(Number.isFinite(created)&&Number.isFinite(expires)&&created<=Date.now()+60000&&expires>Date.now()&&expires-created<=604860000);
 const bytes=await Z.downloadAssignedZip(id,token);assert(bytes.length<=65536);const rawSha=Z.bindRawZip(bytes,metadata.size_in_bytes,digest,metadata.digest),files=Z.decodeSafePair(bytes),value=S.validatePair(files,context);
 
 console.log('AFW_READONLY_FINALFIX_BOUNDARY_SMALLSAFE/1 '+JSON.stringify({context,artifactId:id,uploadedDigest:digest,metadataSize:metadata.size_in_bytes,rawBytes:bytes.length,rawSha256:rawSha,resultBytes:files.get('result.json').length,resultSha256:S.sha(files.get('result.json')),manifestBytes:files.get('manifest.json').length,manifestSha256:S.sha(files.get('manifest.json')),tests:value.tests,candidate:value.candidate,programs:value.programs,integrationControls:value.controls.integration.length,receiverControls:value.controls.receiver.length,nonclaims:S.NONCLAIMS}));
}
main().catch(()=>{console.error('AFW_READONLY_FINALFIX_BOUNDARY_RECEIVER_FAILED/1');process.exitCode=1;});

```

## Coupled Native DATA and whole-carrier proof
NativeDATAfc02dd4105512f0e29716f4c72e031d0910b1692/tree15d48bbac771b63173d9e89828b53773a0199057/F74cf7e93ae0079bdbf9cab3f38c15e6ee179a8e10/367631B/SHAf4ef9ee1e40b282a1600d6d72f74dad231cc19467a1b47e22ed5d6707640714e; all8false. Same F7 as initial fourfix Native, operator amendment changes only test. Root independently reconstructed whole367631B from priorqualified5f088 asONLY8Dblob/12Dsha/12Dbytes substitutions. A63917/ae52..., C63195/52823..., V15099/941355..., Z13305/b36c... exact. Native originalcommands/clocks/caps/keyscopes/business16/8startup/6COE/truthguards unchanged; qualifier i01..i10 checks realcandidate AST/integration/reversebasis.
Operator qualifier inactive3732024880e9732c4c596216fc7daf69b9c6d3b1/tree668c7f4e62c4e547a6191374591c5de22e8618a5/F72c24a016b5a091f9ab7a7c1c2c7507cc1fe44bc8/61333B. Root whole-text reconstructs prior61347carrier ONLYmessage/test/candidate/Ssha substitutions. Q/V/Z exact, S constants only. OLD_OBSERVER remains vulnerable87bb/ea30/28566, not currentfixedD. No old4 failures countedGREEN. Rootactive1a6ead04c8745ea59d885b513ab19efb381ccf17/treef6ab9d614a02c5c214a57986f9f931718d636ca6/F775940a26dbd6b241f0862fd013e81736c3441f60/61315B/SHA1da848c6c01337467de6e7b8ff0b8347efbad29ded6f877b971973004e122840 removesONLYtwofalse/directparent685; fulltree3202/62 onlytest/F7/SAME vsclosed685. NoSourcewritesuntilbothjobspositive terminal.

## Fixture failures and correction evidence
Consumed43630385506 and43631502691 failedGREENb09; no86accepted. OriginalgenericError LFproperty unwrapped away byNode22 TAP, corrected toAssertionErroractualONEkey. Boundeddiagnostic43632996599/1 job132563511133 then observedold_general assertion, markerExact1/mention2/oldcodeunknown; allothermessage/object values withheld. Root independently readNode22 assertion_error.js5dbf...46–49/190–193/232–235/269–273: deepStrictEqual custommessage stillgeneratesinspectedactualdiff, causingsecondarymentioninYAMLerror via tap.js217/227. Operatorfail usesexplicitmessage withoutdiff; TAPactual stillrawkey. Minimalmarkeroperator deepStrictEqual→fail, allrawcount/location/oldEACCES/fullpairassertions retained; poisonmode unchanged. Full primary report docs/superpowers/reviews/2026-11-14-readonly-boundary-operator-fixture-worker-report.md. Nodeprimary links: https://github.com/nodejs/node/blob/v22.23.4/lib/internal/assert/assertion_error.js#L269 and https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/reporter/tap.js#L217 . No rawNative/privateTAP disclosed. All7false.


## Actual qualification / Root strict receipt / restoration


## 2026-11-14 — Aggregate readonly-boundary four-fix qualification ACCEPTED (scoped rereview pending)

ONE fresh run43633743809/attempt1 atSource1a6ead04c8745ea59d885b513ab19efb381ccf17/treef6ab9d614a02c5c214a57986f9f931718d636ca6/F775940a26dbd6b241f0862fd013e81736c3441f60 completedSUCCESS. ExactmessageAFW-READONLY-B09-OPERATOR-FIX-ONEUSE-20261114. All declaredjobspositivelyterminalSUCCESS beforeSourcewrite:
```json
[
  {
    "id": 132565895848,
    "name": "qualify",
    "status": "completed",
    "conclusion": "success",
    "startedAt": "2026-11-14T19:44:47Z",
    "completedAt": "2026-11-14T19:45:17Z"
  },
  {
    "id": 132566038608,
    "name": "verify",
    "status": "completed",
    "conclusion": "success",
    "startedAt": "2026-11-14T19:45:19Z",
    "completedAt": "2026-11-14T19:45:29Z"
  }
]
```

ActualzeroAFWkeyqualification: oldFourRed4/0pass/4fail (separateNOTGREEN); allUnknown32/13pass/19fail; currentreadonly32PASS; frozenoldstage36PASS; integration10PASS andreceiver8PASS, total86GREEN. cancelled/skipped/todo0 throughout. EveryoldregressionfamilyfailsagainstfixedvulnerableoldObserver87bb/ea30; currentb09passesrawcanonicalcount/location/oldgeneralEACCES/fullpair/repackednegativeassertions, sooldb09negativeproofno longerrestsonthebrokenfixtureprecondition. Priorfailedqualifiersremainfailed/consumed; diagnosticcollectiondidnotcountGREEN.

Root independentlyconsumedONLYassignedartifact14128858806 fromliteralcurrentverifyline at2026-11-14T19:45:25.7941416Z. Qualifyuploaderprimarylogs: ID14128858806,size8542,uploadSHA90fafc25f3c4fb605ebe0715e4d055b95a65390b7568ec081ede8a3f9ed5e56c; currentrunartifactmetadataexactname/context/digest/size/expiredfalse corroborated. RawZIP8542B/SHA90fafc25f3c4fb605ebe0715e4d055b95a65390b7568ec081ede8a3f9ed5e56c; RootownboundedZIPreaderverifiedEOF/entrynames/ranges/method/caps/CRCknownvector/fatalUTF8/canonicalJSON. result.json7734B/SHA2f0fa51907acf486ebb7c163796e7f4742c7d112b79889f9c8f5552ad4c63e5a/CRCd74f4c30; manifest.json554B/SHA0821e8ccc55536df515b09ad1e7c49a77933f4c5f7a67fbcf8dc2a6fc8125ab7/CRCa9f699c1. Exactpurpose/role/context/pins/candidate/oldObserver/schema/counts/IDinventories/10integration/8receiver/manifesthash/all7false independentlyvalidated. No rawNativepayload/checkpoint/logsdownload.

Rootacceptedreceipt:
```json
{
  "context": {
    "repository": "tokenizartinfo-ops/agent-friendly-web",
    "repositoryId": "1347578006",
    "ref": "refs/heads/feat/finite-native-cleanup-20261101",
    "source": "1a6ead04c8745ea59d885b513ab19efb381ccf17",
    "tree": "f6ab9d614a02c5c214a57986f9f931718d636ca6",
    "workflowBlob": "75940a26dbd6b241f0862fd013e81736c3441f60",
    "run": "43633743809",
    "attempt": 1,
    "node": "22.23.4"
  },
  "resultBytes": 7734,
  "resultSha256": "2f0fa51907acf486ebb7c163796e7f4742c7d112b79889f9c8f5552ad4c63e5a",
  "manifestBytes": 554,
  "manifestSha256": "0821e8ccc55536df515b09ad1e7c49a77933f4c5f7a67fbcf8dc2a6fc8125ab7",
  "tests": {
    "oldFourRed": {
      "exit": 1,
      "tests": 4,
      "pass": 0,
      "fail": 4,
      "cancelled": 0,
      "skipped": 0,
      "todo": 0
    },
    "allUnknown": {
      "exit": 1,
      "tests": 32,
      "pass": 13,
      "fail": 19,
      "cancelled": 0,
      "skipped": 0,
      "todo": 0
    },
    "readonly": {
      "exit": 0,
      "tests": 32,
      "pass": 32,
      "fail": 0,
      "cancelled": 0,
      "skipped": 0,
      "todo": 0
    },
    "stage": {
      "exit": 0,
      "tests": 36,
      "pass": 36,
      "fail": 0,
      "cancelled": 0,
      "skipped": 0,
      "todo": 0
    }
  },
  "greenFamilies": 86,
  "oldFourRedFail": 4,
  "negativeFailures": 19,
  "nonclaims": {
    "historicalCauseProven": false,
    "receiptAuthenticated": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  }
}
```

NativeDATAfc02dd4105512f0e29716f4c72e031d0910b1692/tree15d48bbac771b63173d9e89828b53773a0199057/F74cf7e93ae0079bdbf9cab3f38c15e6ee179a8e10/367631B remainsDATA/all8false, neverexecutedforthesetelemetryfixes. D0c351/28993B; testdcd8/23473B. World/NativeR1/businesscommands/caps/clocks/keysunchanged. HistoricalR1pairwithcommandunknown/custodyabsentremainsvalidsamehashundernewRootreceiver; actualcauseunresolved. No86→business16/PCoffinference.

Onlyafterbothterminal, originalF7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209B/SHA1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a restored at6dff087a0eeb43df6f026ab7f232c64ba6543a60/tree3cec6e408c8b9423de9b4d864c777470f3d5da4c; fulltreevsclosed685onlynewtestandSAME,3202leaves62WF, undeclaredexact. ThisactualappendpreservesENTIRE506921BSAME7bc3711075e8ed304bdae607e150584312c25b92/SHA10e3204447f19c28e07c9cce19a30b055f4223376ec350ca270b52d51a07453e. Sourcefinalhead/readback/hashwillberecordedindependently. NextONEscopedrereviewofI1–I4/tests/qualifier+Nativepinripples; nosecondbroadreview/fixwave. Mainunchanged/all7false/R1causeheldforclosure. No realCF/provider/runtime/OAuth/cron/Containers/subscriptions/permissions/newkeys/customer/Max/mail/browseractions/localSourceexecution.

FinalclosedSourced42277a6963ee691ac176358e8396194f7dc32c9/tree91f33096426c965f2b0b3b61ae62949f815b81e1/SAME063bfcbf55f12aa985a1c554a16c0f6a15e21d7f/512097B/SHA5be9582d057d23d7012c434c8af6dea72e93ecbc1d5056f3fd7824d81894a697 readbackexact; fulltreevsTask2closed87bbONLYD/newtest/SAME,3202leaves62WF/originalF7. Main0c9/all5active0/finalhead0runs checked. Reviewcodebase87bb→d422; sourcefrozenclosedforreview.

Thispackagecomplete~130kcontainsallnewD/fulltest/frozenP/Q/S/V; no privateNativepayloads. Sourceexecutionprohibitedbyreviewer; evaluateobservedreceiptandstaticcode. If4fixesclear, scopedAPPROVEDonly, notbusinessreadiness. One scopedreview only; anyresidualrequiresRootadjudication, noautomaticsecondfixwave.
