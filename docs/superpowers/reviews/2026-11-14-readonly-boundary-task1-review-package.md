# Task1 scoped review package — readonly boundary

Base permanent source410b37018b184f632f661cab05e44887fb6eaf57. Final closed Source e8f7bc25e6af25e649cac606d74308b248ecba17/tree60a2f15986e17bde0506e014185eaeec829f76ae; Source F7 restored exact f7a71f1a0fa4f5ddf069ff411f008a098455e5cc. Actual qualification run43624083448/1 SUCCESS, both jobs success. This is a task review, not final whole-plan review. Read current diff once; do not execute tests, source, privateNative logs, browser/provider/OAuth or mutate refs. Immutable previous worker full publicpackage4001fd8fc4f62b990b1afda0f206ec43e5f731b0 is historical; its NOT_EXECUTED status is superseded only by explicit actual receipt below.

Binding scope: first-failure-only TAP prefix, whole-stringrepresentation caps first; NO failureYAML/code/site parsing; unreadcasesunknown; Node22.23.4 syntheticrealfixtures. Publiccustody10guards returnsfirst afterfixedthrowchain; private/unrecognizedbeforeguardunknown, callingsuffixafterguardignored. Exact11keynewpurpose+4keymanifest, same safe single-read ownedlogs,16KiBcap, canonicalLF, context9, jobreadonly, all7false. OldDprefix/old36 unchanged, no World/P/runtime/Native/custody/lock businesschanges. All8Nativejobs remain declared/held in data; A/C/V/Z/parser/Nativecommands/clocks/keys/artifact/truthbindings exact. Only8NODE_OPTIONSchecks beforebootstrap andreadonlycollector+Dpins/message ripples. Qualifier zeroAFWkeys/2jobs/Node22.23.4, futurefocusedactualrun NOT Task1. Corrected copiedfixturechild removesNODE_TEST_CONTEXT only; globalenv/flags/19negativeoracle unchanged. Q jobs() correction added later below.

## Permanent observer diff (oldD exact16114B prefix)
Path test/fixtures/finite-budget-stage-observer.mjs
```diff
@@ -170,4 +170,129 @@
   const ids=result.filter(x=>x.state==='assigned').map(x=>x.artifactId);if(new Set(ids).size!==ids.length)return unavailable;return result;
  }catch{return unavailable;}
 }
 export function assignmentLine(text){return 'AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS '+JSON.stringify(projectAssignments(text));}
+
+// Readonly boundary v1. Representation caps are checked first; TAP interpretation
+// stops on the first literal failing result, before ANY of its error details.
+const READONLY_IDS=Object.freeze(['R1','R2','R3','native_file']);
+const NATIVE_PATH='test/mcp-qa-finite-budget-native.test.mjs';
+const RUNNER_ROOT='/home/runner/work/agent-friendly-web/agent-friendly-web/';
+const nativeNames=Object.freeze([NATIVE_PATH,RUNNER_ROOT+NATIVE_PATH,'file://'+RUNNER_ROOT+NATIVE_PATH]);
+const tapRows=(result='not_observed')=>READONLY_IDS.map(id=>({id,result,directive:'none'}));
+const tapUnknown=()=>({state:'unknown',cases:tapRows('unknown'),counts:null});
+const tapAbsent=()=>({state:'not_observed',cases:tapRows(),counts:null});
+const custodyUnknown=()=>({state:'unknown',guard:null});
+const custodyAbsent=()=>({state:'not_observed',guard:null});
+const GUARDS=Object.freeze({101:'regular_file_size_bounds',135:'inventory_files_or_bytes',150:'record_bytes',173:'header_bytes',177:'jsonl_bytes',179:'envelope_bytes',188:'envelope_input_bounds',215:'inspected_inventory',250:'expanded_jsonl_bytes',254:'inspected_record_bytes'});
+function tapId(name){for(const id of READONLY_IDS.slice(0,3))if(name===id+' fixed original SDK readonly budget')return id;return nativeNames.includes(name)?'native_file':null;}
+const duration=line=>/^ {2}duration_ms: [0-9]+(?:\.[0-9]+)?$/.test(line);
+export function projectReadonlyTap(text){
+ try{
+  const lines=linesOf(text);if(!lines.length)return tapAbsent();
+  same(lines[0],'TAP version 13');const cases=tapRows(),seen=new Set();let announced=null,details=false,next=1,plan=null,summary=null;
+  for(let i=1;i<lines.length;i++){
+   const line=lines[i];
+   if(line==='  ---'){
+    assert(details);assert(duration(lines[++i]));same(lines[++i],"  type: 'test'");same(lines[++i],'  ...');details=false;continue;
+   }
+   if(line.startsWith('# Subtest: ')){assert(plan===null&&!announced&&!details);const id=tapId(line.slice(11));assert(id&&!seen.has(id));announced=id;details=false;continue;}
+   const row=/^(ok|not ok) ([1-4]) - (.*?)(?: # (SKIP|TODO)(?: .*)?)?$/.exec(line);
+   if(row){
+    assert(plan===null&&!details);const id=tapId(row[3]),ordinal=Number(row[2]),directive=row[4]?.toLowerCase()??'none';
+    assert(id&&!seen.has(id)&&(announced===null||announced===id));
+    const lateFile=id==='native_file'&&cases.slice(0,3).every(r=>r.result==='ok')&&seen.size===3&&row[1]==='not ok';
+    assert(ordinal===next||lateFile&&ordinal===1);
+    if(id==='native_file')assert(seen.size===0||lateFile);else same(id,'R'+next);
+    cases[READONLY_IDS.indexOf(id)]={id,result:row[1]==='ok'?'ok':'not_ok',directive};seen.add(id);next++;announced=null;
+    if(row[1]==='not ok')return {state:'first_failure',cases:cases.map(r=>seen.has(r.id)?r:{...r,result:'unknown'}),counts:null};
+    details=true;continue;
+   }
+   const p=/^1\.\.([0-4])$/.exec(line);
+   if(p){assert(plan===null&&!announced&&!details);plan=Number(p[1]);same(plan,seen.size);details=false;continue;}
+   if(line.startsWith('# tests ')){
+    assert(plan!==null&&summary===null);summary={};
+    for(const key of ['tests','suites','pass','fail','cancelled','skipped','todo']){
+     const m=new RegExp('^# '+key+' ([0-4])$').exec(lines[i++]);assert(m);summary[key]=Number(m[1]);
+    }
+    assert(/^# duration_ms [0-9]+(?:\.[0-9]+)?$/.test(lines[i]));
+    same(summary.tests,seen.size);same(summary.suites,0);same(summary.fail,0);same(summary.cancelled,0);
+    same(summary.skipped,cases.filter(r=>r.directive==='skip').length);same(summary.todo,cases.filter(r=>r.directive==='todo').length);same(summary.pass,seen.size-summary.skipped-summary.todo);
+    continue;
+   }
+   assert(!details&&line.startsWith('# ')&&!/^# (?:tests|suites|pass|fail|cancelled|skipped|todo|duration_ms)(?: |:)/.test(line)&&plan===null);
+  }
+  assert(plan!==null&&summary!==null&&!announced);if(seen.has('native_file'))same(seen.size,1);
+  const {tests,pass,fail,cancelled,skipped,todo}=summary;
+  return {state:'complete',cases,counts:{tests,pass,fail,cancelled,skipped,todo}};
+ }catch{return tapUnknown();}
+}
+export function projectCustodyLimit(text,P){
+ try{
+  const lines=linesOf(text);if(!lines.length)return custodyAbsent();
+  const headers=lines.map((line,i)=>({i,line,match:/^(Error|AssertionError|CustodyError)(?: \[([^\]\r\n]*)\])?: (.*)$/.exec(line)})).filter(v=>v.match);
+  const projected=projectLogText(text,P).failure;
+  const mentioned=lines.some(line=>line.includes('custody_limit'));
+  if(projected.code!=='custody_limit')return mentioned?custodyUnknown():custodyAbsent();
+  if(headers.length!==1)return custodyUnknown();
+  const header=headers[0],claims=[header.match[2],header.match[3]].filter(Boolean);
+  if(!claims.includes('custody_limit')||claims.some(v=>v!=='custody_limit'))return custodyUnknown();
+  const approved=['test/fixtures/finite-checkpoint-custody.mjs',RUNNER_ROOT+'test/fixtures/finite-checkpoint-custody.mjs','file://'+RUNNER_ROOT+'test/fixtures/finite-checkpoint-custody.mjs'];
+  // Validate the fixed throw chain and stop as soon as its first real guard
+  // is known. Node/internal/external caller frames below it are not interpreted.
+  let phase=0,constructorSeen=false;
+  for(let n=header.i+1;n<lines.length&&/^ {4}at /.test(lines[n]);n++){
+   const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(lines[n]);
+   if(!match)return custodyUnknown();const path=match[1]??match[4],number=Number(match[2]??match[5]);if(!approved.includes(path))return custodyUnknown();
+   if(phase===0){if(number===22&&!constructorSeen){constructorSeen=true;continue;}if(number!==20)return custodyUnknown();phase=1;continue;}
+   if(phase===1&&number===24){phase=2;continue;}
+   const guard=GUARDS[number];if(!guard)return custodyUnknown();return {state:'observed',guard};
+  }
+  return custodyUnknown();
+ }catch{return custodyUnknown();}
+}
+// Explicit synthetic root/IO boundary. Each fixed log is opened ONCE, then the
+// same captured text supplies both old and new public observations.
+export async function collectOwnedReadonlyLogRoot(root,P,io=fs){
+ let safe=true;try{await controlledRoot(root,io);}catch{safe=false;}
+ const reads=[],logs=[],observations=[];
+ for(const [log,name]of FILES){
+  const read=safe?await readOwned(root,name,io):{availability:'unsafe'},v=read.availability==='available'?projectLogText(read.text,P):{failure:unknown(),stage:unknownStage(),http:null};
+  reads.push(read);logs.push({log,availability:read.availability,code:v.failure.code,site:v.failure.site});observations.push(v);
+ }
+ const project=(read,fn,absent,uncertain)=>read.availability==='missing'?absent():read.availability==='available'?fn(read.text):uncertain();
+ const metadata=observations[2],count=logs[3];
+ return {logs,stage:logs[2].availability==='available'?metadata.stage:unknownStage(),http:logs[2].availability==='available'?metadata.http:null,countCheck:count.availability==='missing'||count.availability==='available'&&count.code==='unknown'&&observations[3].stage.state==='not_observed'?'not_observed':count.availability==='available'&&count.code==='assertion'?'coded_assertion':'unknown',tap:project(reads[0],projectReadonlyTap,tapAbsent,tapUnknown),custodyLimit:project(reads[1],s=>projectCustodyLimit(s,P),custodyAbsent,custodyUnknown)};
+}
+function validateTap(v){
+ fields(v,['state','cases','counts']);assert(['not_observed','unknown','complete','first_failure'].includes(v.state));same(v.cases.length,4);
+ for(const [n,row]of v.cases.entries()){fields(row,['id','result','directive']);same(row.id,READONLY_IDS[n]);assert(['ok','not_ok','not_observed','unknown'].includes(row.result));assert(['none','skip','todo'].includes(row.directive));if(['unknown','not_observed'].includes(row.result))same(row.directive,'none');}
+ if(v.state==='not_observed'){same(v,tapAbsent());return;}if(v.state==='unknown'){same(v,tapUnknown());return;}
+ if(v.state==='first_failure'){
+  same(v.counts,null);const failed=v.cases.findIndex(r=>r.result==='not_ok');assert(failed>=0&&v.cases.filter(r=>r.result==='not_ok').length===1);
+  if(failed===3)assert(v.cases.slice(0,3).every(r=>r.result==='ok')||v.cases.slice(0,3).every(r=>r.result==='unknown'));
+  else assert(v.cases.slice(0,failed).every(r=>r.result==='ok')&&v.cases.slice(failed+1).every(r=>r.result==='unknown'));
+  return;
+ }
+ fields(v.counts,['tests','pass','fail','cancelled','skipped','todo']);for(const n of Object.values(v.counts))assert(Number.isInteger(n)&&n>=0&&n<=4);
+ assert(v.cases.every(r=>r.result==='ok'||r.result==='not_observed'));const seen=v.cases.filter(r=>r.result==='ok');
+ if(v.cases[3].result==='ok')same(seen.length,1);else{let gap=false;for(const r of v.cases.slice(0,3)){if(r.result==='not_observed')gap=true;else assert(!gap);}}
+ same(v.counts,{tests:seen.length,pass:seen.filter(r=>r.directive==='none').length,fail:0,cancelled:0,skipped:seen.filter(r=>r.directive==='skip').length,todo:seen.filter(r=>r.directive==='todo').length});
+}
+function validateCustody(v){fields(v,['state','guard']);assert(['not_observed','unknown','observed'].includes(v.state));if(v.state==='observed')assert(Object.values(GUARDS).includes(v.guard));else same(v.guard,null);}
+export function makeReadonlyPair({context,job,rawOutcome,observation}){
+ validateContext(context);same(job,'readonly');assert(OUTCOMES.includes(rawOutcome));
+ const value={purpose:'afw.readonly-boundary-observations.syn.v1',context,job,rawOutcome,logs:observation.logs,stage:observation.stage,http:observation.http,countCheck:observation.countCheck,tap:observation.tap,custodyLimit:observation.custodyLimit,nonclaims:NONCLAIMS};
+ const bytes=canonical(value),manifest=canonical({purpose:'afw.readonly-boundary-observations.manifest.syn.v1',context,job,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]});assert(bytes.length+manifest.length<=16384,'stage_evidence_rejected');return new Map([['result.json',bytes],['manifest.json',manifest]]);
+}
+export async function collectFixedReadonlyPair({context,job,rawOutcome}){
+ const e=process.env;same(process.versions.node,'22.23.4');same(e.GITHUB_JOB,'readonly');same(job,'readonly');assert(e.NODE_OPTIONS===undefined&&e.AFW_SYN_CHECKPOINT_KEY===undefined&&e.GH_ARTIFACT_TOKEN===undefined,'stage_evidence_rejected');assert(typeof e.RUNNER_TEMP==='string'&&isAbsolute(e.RUNNER_TEMP),'stage_evidence_rejected');
+ const P=await projector(),pair=makeReadonlyPair({context,job,rawOutcome,observation:await collectOwnedReadonlyLogRoot(join(e.RUNNER_TEMP,'afw-native-private','logs'),P)});validateFixedReadonlyPairWithProjector(pair,context,job,P);return pair;
+}
+export async function validateFixedReadonlyPair(files,context,job){return validateFixedReadonlyPairWithProjector(files,context,job,await projector());}
+export function validateFixedReadonlyPairWithProjector(files,context,job,P){
+ validateContext(context);same(job,'readonly');assert(files instanceof Map);same([...files.keys()],['result.json','manifest.json']);assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=16384);
+ const read=b=>{const text=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(text);assert(canonical(v).equals(b));return v;};
+ const value=read(files.get('result.json')),manifest=read(files.get('manifest.json'));fields(value,['purpose','context','job','rawOutcome','logs','stage','http','countCheck','tap','custodyLimit','nonclaims']);same(value.purpose,'afw.readonly-boundary-observations.syn.v1');
+ const old={purpose:'afw.sanitized-stage-observations.syn.v1',context:value.context,job:value.job,rawOutcome:value.rawOutcome,logs:value.logs,stage:value.stage,http:value.http,countCheck:value.countCheck,nonclaims:value.nonclaims};validateValue(old,context,job,P);validateTap(value.tap);validateCustody(value.custodyLimit);for(const [index,key,absent,uncertain]of [[0,'tap',tapAbsent,tapUnknown],[1,'custodyLimit',custodyAbsent,custodyUnknown]]){if(value.logs[index].availability==='missing')same(value[key],absent());else if(value.logs[index].availability!=='available')same(value[key],uncertain());}
+ fields(manifest,['purpose','context','job','files']);same(manifest.purpose,'afw.readonly-boundary-observations.manifest.syn.v1');same(manifest.context,context);same(manifest.job,job);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;
+}

```

## New test file (complete current fixture-corrected version)
Path test/finite-budget-readonly-observer.test.mjs
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import * as D from './fixtures/finite-budget-stage-observer.mjs';
import * as P from './fixtures/finite-budget-failure-diagnostic.mjs';

const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/feat/finite-native-cleanup-20261101',source:'a'.repeat(40),tree:'b'.repeat(40),workflowBlob:'c'.repeat(40),run:'123',attempt:1,node:'22.23.4'};
const ids=['R1','R2','R3','native_file'],file='test/mcp-qa-finite-budget-native.test.mjs',canary='PRIVATE_READONLY_BOUNDARY_CANARY';
const row=(id,result='not_observed',directive='none')=>({id,result,directive});
const absent={state:'not_observed',cases:ids.map(id=>row(id)),counts:null};
const uncertain={state:'unknown',cases:ids.map(id=>row(id,'unknown')),counts:null};
const allpass={tests:3,pass:3,fail:0,cancelled:0,skipped:0,todo:0};
const details="  ---\n  duration_ms: 0.1\n  type: 'test'\n  ...\n";
const prefix=n=>'TAP version 13\n'+Array.from({length:n},(_,i)=>'# Subtest: R'+(i+1)+' fixed original SDK readonly budget\nok '+(i+1)+' - R'+(i+1)+' fixed original SDK readonly budget\n'+details).join('');
const summary=(n,pass=n,skip=0,todo=0)=>'1..'+n+'\n# tests '+n+'\n# suites 0\n# pass '+pass+'\n# fail 0\n# cancelled 0\n# skipped '+skip+'\n# todo '+todo+'\n# duration_ms 1.2\n';
const failure=(n=2)=>prefix(n-1)+'# Subtest: R'+n+' fixed original SDK readonly budget\nnot ok '+n+' - R'+n+' fixed original SDK readonly budget\n';
const canonical=v=>Buffer.from(JSON.stringify(v)+'\n');
async function owned(fn){const root=await fs.mkdtemp(join(tmpdir(),'afw-readonly-owned-'));try{return await fn(root);}finally{assert(root.startsWith(join(tmpdir(),'afw-readonly-owned-')));await fs.rm(root,{recursive:true,force:true});}}
function environment(){const e={...process.env};for(const key of ['NODE_OPTIONS','GH_ARTIFACT_TOKEN','AFW_SYN_CHECKPOINT_KEY','NODE_TEST_CONTEXT'])delete e[key];return e;}
const realCache=new Map();
async function real(mode){
 if(realCache.has(mode))return realCache.get(mode);assert.equal(process.versions.node,'22.23.4');
 const value=await owned(async root=>{
  await fs.mkdir(join(root,'test'));const code=String.raw`import test from 'node:test';
import assert from 'node:assert/strict';
const mode=__MODE__,canary=__CANARY__;
if(mode==='before')throw new Error(canary);
if(mode!=='empty')for(let n=1;n<=3;n++)await test('R'+n+' fixed original SDK readonly budget',()=>{
 if(mode==='fail'+n||mode==='failed_late'&&n===2)throw new Error(canary);
 if(mode==='poison'&&n===2){const key='injected\n  code: PRIVATE\n  stack: |-\nnot ok 3 - R3 fixed original SDK readonly budget\n1..4';const e=new assert.AssertionError({actual:{[key]:canary},expected:{[key]:canary+'2'},operator:'deepStrictEqual',message:canary});Object.defineProperty(e,key,{value:canary,enumerable:true});throw e;}
});
if(mode==='late'||mode==='failed_late')setImmediate(()=>{throw new Error(canary);});
`.replace('__MODE__',JSON.stringify(mode)).replace('__CANARY__',JSON.stringify(canary));
  await fs.writeFile(join(root,file),code,{flag:'wx',mode:0o600});
  const fixtureEnv=environment();assert.equal(fixtureEnv.NODE_TEST_CONTEXT,undefined);
  const child=spawnSync(process.execPath,['--test','--test-reporter=tap',file],{cwd:root,env:fixtureEnv,encoding:'utf8',timeout:8000,maxBuffer:65536});assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.stderr,'');assert.equal(child.status,['normal','empty'].includes(mode)?0:1);return child.stdout;
 });realCache.set(mode,value);return value;
}
function first(v,n){assert.equal(v.state,'first_failure');assert.deepEqual(v.cases,ids.map((id,i)=>row(id,i<n-1?'ok':i===n-1?'not_ok':'unknown')));assert.equal(v.counts,null);}
const guards=[[101,'regular_file_size_bounds'],[135,'inventory_files_or_bytes'],[150,'record_bytes'],[173,'header_bytes'],[177,'jsonl_bytes'],[179,'envelope_bytes'],[188,'envelope_input_bounds'],[215,'inspected_inventory'],[250,'expanded_jsonl_bytes'],[254,'inspected_record_bytes']];
const cpath='test/fixtures/finite-checkpoint-custody.mjs';
const custody=(line=101,path=cpath)=>'CustodyError: custody_limit\n    at fail ('+path+':20:24)\n    at requireValue ('+path+':24:48)\n    at publicGuard ('+path+':'+line+':4)\n';
const guard=s=>D.projectCustodyLimit(s,P);
const collect=(root,io)=>D.collectOwnedReadonlyLogRoot(root,P,io);
const pair=(observation)=>D.makeReadonlyPair({context,job:'readonly',rawOutcome:'failure',observation});
const validate=(files)=>D.validateFixedReadonlyPairWithProjector(files,context,'readonly',P);
function repack(files,mutate){const value=JSON.parse(files.get('result.json'));mutate(value);const b=canonical(value),manifest=JSON.parse(files.get('manifest.json'));manifest.files=[{path:'result.json',bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')}];return new Map([['result.json',b],['manifest.json',canonical(manifest)]]);}

test('b01_real_three_ok',async()=>{const v=D.projectReadonlyTap(await real('normal'));assert.equal(v.state,'complete');assert.deepEqual(v.counts,allpass);assert.deepEqual(v.cases,ids.map((id,n)=>row(id,n<3?'ok':'not_observed')));});
test('b02_real_first_failure_R1',async()=>first(D.projectReadonlyTap(await real('fail1')),1));
test('b03_real_first_failure_R2',async()=>first(D.projectReadonlyTap(await real('fail2')),2));
test('b04_real_first_failure_R3',async()=>first(D.projectReadonlyTap(await real('fail3')),3));
test('b05_real_file_before_cases',async()=>{const v=D.projectReadonlyTap(await real('before'));assert.equal(v.state,'first_failure');assert.deepEqual(v.cases,ids.map((id,n)=>row(id,n===3?'not_ok':'unknown')));assert.equal(v.counts,null);});
test('b06_real_late_file_repeated_one',async()=>{const text=await real('late');assert.deepEqual([...text.matchAll(/^(?:not )?ok ([1-4]) - /gm)].map(m=>Number(m[1])),[1,2,3,1]);assert.match(text,/^1\.\.4$/m);const v=D.projectReadonlyTap(text);assert.equal(v.state,'first_failure');assert.deepEqual(v.cases,ids.map((id,n)=>row(id,n===3?'not_ok':'ok')));assert.equal(v.counts,null);});
test('b07_real_failed_case_late_file_suppressed',async()=>{const text=await real('failed_late');assert(!new RegExp('^(?:not )?ok [1-4] - '+file.replaceAll('.','\\.')+'$','m').test(text));first(D.projectReadonlyTap(text),2);assert.equal(D.projectReadonlyTap(text).cases[3].result,'unknown');});
test('b08_real_empty_file',async()=>{const v=D.projectReadonlyTap(await real('empty'));assert.equal(v.state,'complete');assert.equal(v.cases.slice(0,3).filter(r=>r.result==='ok').length,0);assert([0,1].includes(v.counts.tests));if(v.counts.tests===1){assert.equal(v.cases[3].result,'ok');assert.equal(v.counts.pass,1);}else assert(v.cases.every(r=>r.result==='not_observed'));});
test('b09_real_multiline_enumerable_poison',async()=>{const text=await real('poison');assert(text.includes(canary));assert(text.includes('injected'));const v=D.projectReadonlyTap(text);first(v,2);assert(!JSON.stringify(v).includes(canary));assert(!JSON.stringify(v).includes('code'));assert(!JSON.stringify(v).includes('stack'));});
test('b10_suffix_never_interpreted',()=>{const base=failure(),expected=D.projectReadonlyTap(base);first(expected,2);for(const suffix of ['  ---\n1..4\nnot ok 1 - '+file+'\n','  expected:\n    x\nnot ok 3 - R3 fixed original SDK readonly budget\n# tests 4\n','garbage\nTAP version 14\n','not ok 2 - R2 fixed original SDK readonly budget\n'])assert.deepEqual(D.projectReadonlyTap(base+suffix),expected);});
test('b11_no_coercion_and_absence',()=>{let calls=0;const value={toString(){calls++;throw Error('forbidden');}};for(const v of [null,undefined,1,value,Buffer.from('TAP version 13\n')])assert.deepEqual(D.projectReadonlyTap(v),uncertain);assert.equal(calls,0);assert.deepEqual(D.projectReadonlyTap(''),absent);});
test('b12_whole_representation_caps',()=>{for(const suffix of ['x'.repeat(1025)+'\n','\n'.repeat(4097),'x\r\n','truncated','x\n'.repeat(33000)])assert.deepEqual(D.projectReadonlyTap(failure()+suffix),uncertain);assert.deepEqual(D.projectReadonlyTap('é'.repeat(32769)+'\n'),uncertain);});
test('b13_prefix_structure_conflicts',()=>{for(const s of ['TAP version 14\n'+failure(),'TAP version 13\n'+failure(),'TAP version 13\nnot ok 2 - R2 fixed original SDK readonly budget\n',prefix(1)+'ok 1 - R1 fixed original SDK readonly budget\n',prefix(1)+'# Subtest: R3 fixed original SDK readonly budget\nnot ok 2 - R3 fixed original SDK readonly budget\n',prefix(1)+'  ---\n  error: PRIVATE\n  ...\n'+failure()])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});
test('b14_complete_summary_coherence',()=>{const valid=prefix(3)+summary(3);assert.equal(D.projectReadonlyTap(valid).state,'complete');for(const s of [valid+summary(3),valid.replace('# pass 3','# pass 2'),valid.replace('1..3','1..4'),valid.replace('# tests 3','# tests 4'),valid.replace('# suites 0','# suites 1'),valid.replace('# fail 0','# fail 1'),prefix(3),valid.slice(0,-1)])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});
test('b15_closed_directives_and_zero_plan',()=>{const s=(prefix(3)+summary(3,1,1,1)).replace('ok 2 - R2 fixed original SDK readonly budget\n','ok 2 - R2 fixed original SDK readonly budget # SKIP inert\n').replace('ok 3 - R3 fixed original SDK readonly budget\n','ok 3 - R3 fixed original SDK readonly budget # TODO inert\n');const v=D.projectReadonlyTap(s);assert.equal(v.state,'complete');assert.deepEqual(v.cases.slice(0,3).map(r=>r.directive),['none','skip','todo']);assert.deepEqual(D.projectReadonlyTap('TAP version 13\n'+summary(0)),{state:'complete',cases:ids.map(id=>row(id)),counts:{tests:0,pass:0,fail:0,cancelled:0,skipped:0,todo:0}});});
test('b16_file_and_ordinal_allowlist',()=>{for(const path of [file,'/home/runner/work/agent-friendly-web/agent-friendly-web/'+file,'file:///home/runner/work/agent-friendly-web/agent-friendly-web/'+file])assert.equal(D.projectReadonlyTap('TAP version 13\nnot ok 1 - '+path+'\n').cases[3].result,'not_ok');for(const path of ['../'+file,'/private/'+file,'./'+file])assert.deepEqual(D.projectReadonlyTap('TAP version 13\nnot ok 1 - '+path+'\n'),uncertain);for(const s of [prefix(2)+'not ok 1 - '+file+'\n',prefix(3)+'not ok 1 - R1 fixed original SDK readonly budget\n',prefix(3)+'ok 1 - '+file+'\n'])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});
test('b17_all_ten_public_custody_guards',()=>{for(const [line,name]of guards)assert.deepEqual(guard(custody(line)),{state:'observed',guard:name});});
test('b18_first_real_guard_only',()=>{assert.deepEqual(guard(custody(135)+'    at outer ('+cpath+':101:4)\n'),{state:'observed',guard:'inventory_files_or_bytes'});assert.equal(guard(custody(188)).guard,'envelope_input_bounds');for(const caller of ['    at internal (node:internal/streams/pipeline:1:1)\n','    at external (/home/runner/work/agent-friendly-web/agent-friendly-web/lib/public-caller.mjs:2:3)\n'])assert.deepEqual(guard(custody(150)+caller),{state:'observed',guard:'record_bytes'});});
test('b19_custody_generic_and_conflicts',()=>{for(const s of ['CustodyError: custody_limit\n    at fail ('+cpath+':20:24)\n',custody(999),custody()+custody(135),custody().replace('CustodyError: custody_limit','Error [ENOENT]: custody_limit'),custody()+'AFW_SYN_FAILURE/1 '+JSON.stringify({code:'EACCES',site:'custody_20'})+'\n'])assert.deepEqual(guard(s),{state:'unknown',guard:null});});
test('b20_custody_path_and_frame_bounds',()=>{for(const s of [custody(101,'/private/'+cpath),custody().replace(':101:4',':101:0'),custody().replace('at publicGuard','at private path'),custody().replace('    at publicGuard','    at privateCall (/secret/hidden.mjs:1:1)\n    at publicGuard'),custody().replace(':20:24',':24:24')])assert.deepEqual(guard(s),{state:'unknown',guard:null});for(const p of ['/home/runner/work/agent-friendly-web/agent-friendly-web/'+cpath,'file:///home/runner/work/agent-friendly-web/agent-friendly-web/'+cpath])assert.equal(guard(custody(250,p)).guard,'expanded_jsonl_bytes');});
test('b21_custody_absence_no_coercion_caps',()=>{let calls=0;const value={toString(){calls++;return custody();}};assert.deepEqual(guard(value),{state:'unknown',guard:null});assert.equal(calls,0);for(const s of ['','unrelated private text\n','Error [ENOENT]: PRIVATE\n'])assert.deepEqual(guard(s),{state:'not_observed',guard:null});for(const s of [custody()+'x'.repeat(1025)+'\n',custody()+'x\r\n',custody().slice(0,-1)])assert.deepEqual(guard(s),{state:'unknown',guard:null});});
test('b22_read_once_coherent_projections',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),await real('fail2'));await fs.writeFile(join(root,'seal-custody.log'),custody(135));await fs.writeFile(join(root,'tap-check.log'),'AssertionError [ERR_ASSERTION]: '+canary+'\n');const reads=new Map(),io={...fs,open:async(path,...a)=>{reads.set(path,(reads.get(path)??0)+1);return fs.open(path,...a);}},v=validate(pair(await collect(root,io)));first(v.tap,2);assert.equal(v.custodyLimit.guard,'inventory_files_or_bytes');assert.equal(v.countCheck,'coded_assertion');assert([...reads.values()].every(n=>n===1));assert(!JSON.stringify(v).includes(canary));}));
test('b23_missing_unsafe_and_truncated_logs',async()=>owned(async root=>{let v=validate(pair(await collect(root)));assert.deepEqual(v.tap,absent);assert.deepEqual(v.custodyLimit,{state:'not_observed',guard:null});await fs.writeFile(join(root,'target'),canary+'\n');await fs.symlink(join(root,'target'),join(root,'command-output.log'));await fs.writeFile(join(root,'seal-custody.log'),'partial');v=validate(pair(await collect(root)));assert.deepEqual(v.tap,uncertain);assert.deepEqual(v.custodyLimit,{state:'unknown',guard:null});}));
test('b24_purpose_schema_and_canonicality',async()=>owned(async root=>{const p=pair(await collect(root)),v=validate(p);assert.deepEqual(Object.keys(v),['purpose','context','job','rawOutcome','logs','stage','http','countCheck','tap','custodyLimit','nonclaims']);assert.equal(v.purpose,'afw.readonly-boundary-observations.syn.v1');assert.throws(()=>D.validateStagePairWithProjector(p,context,'readonly',P));const old=D.makeStagePair({context,job:'readonly',rawOutcome:'failure',observation:await D.collectOwnedLogRoot(root,P)});assert.throws(()=>validate(old));const q=new Map(p);q.set('result.json',Buffer.from(JSON.stringify(v,null,2)+'\n'));assert.throws(()=>validate(q));}));
test('b25_context_job_manifest_and_limits',async()=>owned(async root=>{const p=pair(await collect(root));assert.throws(()=>D.validateFixedReadonlyPairWithProjector(p,{...context,run:'124'},'readonly',P));assert.throws(()=>D.validateFixedReadonlyPairWithProjector(p,context,'positive_prepare',P));for(const change of [m=>m.purpose='other',m=>m.files[0].bytes++,m=>m.files[0].path='other',m=>m.files[0].sha256='a'.repeat(64),m=>m.extra=true]){const q=new Map(p),m=JSON.parse(q.get('manifest.json'));change(m);q.set('manifest.json',canonical(m));assert.throws(()=>validate(q));}const q=new Map(p);q.set('manifest.json',Buffer.alloc(16385,32));assert.throws(()=>validate(q));q.set('extra',Buffer.from(''));assert.throws(()=>validate(q));}));
test('b26_closed_enums_rows_and_nonclaims',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),await real('normal'));await fs.writeFile(join(root,'seal-custody.log'),custody());const p=pair(await collect(root));for(const mutate of [v=>v.tap.state='passed',v=>v.tap.cases[0].code='PRIVATE',v=>v.tap.cases[0].id='R4',v=>v.tap.cases[0].result='passed',v=>v.tap.cases[0].directive='other',v=>v.tap.counts.tests=4,v=>v.tap.counts.pass=2,v=>v.custodyLimit.guard='max_512',v=>v.custodyLimit.state='passed',v=>v.rawOutcome='passed',v=>v.nonclaims.PCoff=true,v=>v.private=canary])assert.throws(()=>validate(repack(p,mutate)));}));
test('b27_availability_projection_truth',async()=>owned(async root=>{const p=pair(await collect(root));assert.throws(()=>validate(repack(p,v=>v.tap={state:'complete',cases:ids.map(id=>row(id)),counts:{tests:0,pass:0,fail:0,cancelled:0,skipped:0,todo:0}})));assert.throws(()=>validate(repack(p,v=>v.custodyLimit={state:'observed',guard:'record_bytes'})));}));
test('b28_production_role_keys_options',async()=>{const saved={...process.env};try{process.env.GITHUB_JOB='qualify';await assert.rejects(()=>D.collectFixedReadonlyPair({context,job:'readonly',rawOutcome:'failure'}));process.env.GITHUB_JOB='readonly';await assert.rejects(()=>D.collectFixedReadonlyPair({context,job:'positive_prepare',rawOutcome:'failure'}));for(const key of ['NODE_OPTIONS','AFW_SYN_CHECKPOINT_KEY','GH_ARTIFACT_TOKEN']){process.env[key]='SYN_INERT';await assert.rejects(()=>D.collectFixedReadonlyPair({context,job:'readonly',rawOutcome:'failure'}));delete process.env[key];}}finally{for(const key of Object.keys(process.env))if(!Object.hasOwn(saved,key))delete process.env[key];Object.assign(process.env,saved);}});
test('b29_production_version_refusal',async()=>{const source="import assert from 'node:assert/strict';const D=await import(__D__);Object.defineProperty(process.versions,'node',{value:'22.0.0'});process.env.GITHUB_JOB='readonly';await assert.rejects(()=>D.collectFixedReadonlyPair({context:__CONTEXT__,job:'readonly',rawOutcome:'failure'}));".replace('__D__',JSON.stringify(new URL('./fixtures/finite-budget-stage-observer.mjs',import.meta.url).href)).replace('__CONTEXT__',JSON.stringify(context));const child=spawnSync(process.execPath,['--input-type=module'],{input:source,env:environment(),encoding:'utf8',timeout:5000,maxBuffer:65536});assert.equal(child.error,undefined);assert.equal(child.status,0);assert.equal(child.stdout,'');assert.equal(child.stderr,'');});
test('b30_new_reader_hardlink_and_fd_race',async()=>owned(async root=>{const path=join(root,'command-output.log');await fs.writeFile(join(root,'target'),'PRIVATE\n');await fs.link(join(root,'target'),path);assert.equal((await collect(root)).logs[0].availability,'unsafe');await fs.unlink(path);await fs.writeFile(path,failure());const io={...fs,open:async(...a)=>{const fd=await fs.open(...a);return {stat:()=>fd.stat(),read:async(...args)=>{const value=await fd.read(...args);await fs.appendFile(path,'changed\n');return value;},close:()=>fd.close()};}};const v=await collect(root,io);assert.equal(v.logs[0].availability,'racing');assert.deepEqual(v.tap,uncertain);}));

test('b31_production_fixed_pair_and_async_validator',async()=>owned(async root=>{const saved={...process.env};try{process.env.GITHUB_JOB='readonly';process.env.RUNNER_TEMP=root;for(const key of ['NODE_OPTIONS','AFW_SYN_CHECKPOINT_KEY','GH_ARTIFACT_TOKEN'])delete process.env[key];await fs.mkdir(join(root,'afw-native-private','logs'),{recursive:true});const p=await D.collectFixedReadonlyPair({context,job:'readonly',rawOutcome:'failure'}),v=await D.validateFixedReadonlyPair(p,context,'readonly');assert.deepEqual(v.tap,absent);assert.equal(v.rawOutcome,'failure');assert.deepEqual(v.custodyLimit,{state:'not_observed',guard:null});}finally{for(const key of Object.keys(process.env))if(!Object.hasOwn(saved,key))delete process.env[key];Object.assign(process.env,saved);}}));
test('b32_ok_details_closed_grammar',()=>{for(const s of [(prefix(1)+summary(1)).replace("  type: 'test'","  type: 'suite'"),(prefix(1)+summary(1)).replace('  duration_ms: 0.1','  duration_ms: PRIVATE'),(prefix(1)+summary(1)).replace('  ...','  code: PRIVATE\n  ...'),(prefix(1)+summary(1)).replace(details,'')])assert.deepEqual(D.projectReadonlyTap(s),uncertain);});

```

## Inactive Native integration diff vs exact32ca NativeDATA basis
Path .github/workflows/afw-finite-budget-qualification.yml — separate INACTIVE DATA, not final restoredF7.
A/C/V/Z exact pins independently checked; unchanged programs need not be recrawled. Same fixed8DAG/needs/timeouts,6Nativecommands,26cryptorefs/6environments,originaldiagnostic6COE/truthbindings.
```diff
@@ -16,7 +16,7 @@
 # ONE FINITE ATTEMPT. Job guards admit only attempt 1.
 jobs:
   contracts:
-    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-FOCUSED-ONEUSE-20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     runs-on: ubuntu-24.04
     timeout-minutes: 2
     env:
@@ -1353,6 +1353,7 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          test -z "${NODE_OPTIONS+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
@@ -1365,7 +1366,7 @@
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install the locked fixture dependencies
         shell: bash
@@ -1668,7 +1669,7 @@
           test '${{ steps.pure_verified.outcome }}' = success
           test '${{ steps.pure_seal.outcome }}' = success
   positive_prepare:
-    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-FOCUSED-ONEUSE-20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
@@ -1716,6 +1717,7 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          test -z "${NODE_OPTIONS+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
@@ -1728,7 +1730,7 @@
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -1892,7 +1894,7 @@
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_STAGE_PAIR' >"$RUNNER_TEMP/afw-native-private/logs/stage-publication.log" 2>&1
           import assert from 'node:assert/strict';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,16114);assert.equal(createHash('sha256').update(checked).digest('hex'),'dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,28566);assert.equal(createHash('sha256').update(checked).digest('hex'),'52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
           const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedStagePair({context,job:'positive_prepare',rawOutcome:e.NATIVE_OUTCOME});
           const root=e.RUNNER_TEMP+'/afw-stage-positive_prepare-safe';await mkdir(root,{mode:0o700});for(const [name,bytes]of files)await writeFile(root+'/'+name,bytes,{flag:'wx',mode:0o600});
           NODE_STAGE_PAIR
@@ -1915,7 +1917,7 @@
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   positive_consume:
-    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-FOCUSED-ONEUSE-20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts, positive_prepare]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
@@ -1961,6 +1963,7 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          test -z "${NODE_OPTIONS+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
@@ -1973,7 +1976,7 @@
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -2191,7 +2194,7 @@
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   reduction_prepare:
-    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-FOCUSED-ONEUSE-20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
@@ -2239,6 +2242,7 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          test -z "${NODE_OPTIONS+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
@@ -2251,7 +2255,7 @@
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -2415,7 +2419,7 @@
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_STAGE_PAIR' >"$RUNNER_TEMP/afw-native-private/logs/stage-publication.log" 2>&1
           import assert from 'node:assert/strict';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,16114);assert.equal(createHash('sha256').update(checked).digest('hex'),'dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,28566);assert.equal(createHash('sha256').update(checked).digest('hex'),'52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
           const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedStagePair({context,job:'reduction_prepare',rawOutcome:e.NATIVE_OUTCOME});
           const root=e.RUNNER_TEMP+'/afw-stage-reduction_prepare-safe';await mkdir(root,{mode:0o700});for(const [name,bytes]of files)await writeFile(root+'/'+name,bytes,{flag:'wx',mode:0o600});
           NODE_STAGE_PAIR
@@ -2438,7 +2442,7 @@
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   reduction_consume_a:
-    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-FOCUSED-ONEUSE-20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts, reduction_prepare]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
@@ -2484,6 +2488,7 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          test -z "${NODE_OPTIONS+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
@@ -2496,7 +2501,7 @@
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -2714,7 +2719,7 @@
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   readonly:
-    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-FOCUSED-ONEUSE-20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts]
     runs-on: ubuntu-24.04
     timeout-minutes: 7
@@ -2762,6 +2767,7 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          test -z "${NODE_OPTIONS+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
@@ -2774,7 +2780,7 @@
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -2944,8 +2950,8 @@
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_STAGE_PAIR' >"$RUNNER_TEMP/afw-native-private/logs/stage-publication.log" 2>&1
           import assert from 'node:assert/strict';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,16114);assert.equal(createHash('sha256').update(checked).digest('hex'),'dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
-          const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedStagePair({context,job:'readonly',rawOutcome:e.NATIVE_OUTCOME});
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,28566);assert.equal(createHash('sha256').update(checked).digest('hex'),'52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedReadonlyPair({context,job:'readonly',rawOutcome:e.NATIVE_OUTCOME});
           const root=e.RUNNER_TEMP+'/afw-stage-readonly-safe';await mkdir(root,{mode:0o700});for(const [name,bytes]of files)await writeFile(root+'/'+name,bytes,{flag:'wx',mode:0o600});
           NODE_STAGE_PAIR
       - name: Upload fixed readonly diagnostic pair only
@@ -2967,7 +2973,7 @@
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   reduction_consume_b:
-    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-FOCUSED-ONEUSE-20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts, readonly, reduction_prepare]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
@@ -3015,6 +3021,7 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          test -z "${NODE_OPTIONS+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
@@ -3027,7 +3034,7 @@
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -3445,7 +3452,7 @@
           test '${{ steps.summary_pair.outputs.status }}' = passed
           test '${{ steps.summary_upload.outcome }}' = success
   verify:
-    if: ${{ false && always() && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && always() && github.event_name == 'push' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-FOCUSED-ONEUSE-20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts, positive_prepare, positive_consume, reduction_prepare, reduction_consume_a, readonly, reduction_consume_b]
     runs-on: ubuntu-24.04
     timeout-minutes: 2
@@ -3466,6 +3473,7 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          test -z "${NODE_OPTIONS+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
@@ -3478,7 +3486,7 @@
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Verify all seven current direct outputs and the current SAFE pair
         env:
@@ -3500,6 +3508,6 @@
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_STAGE_ASSIGNMENTS'
           import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,16114);assert.equal(createHash('sha256').update(checked).digest('hex'),'dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,28566);assert.equal(createHash('sha256').update(checked).digest('hex'),'52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
           console.log(D.assignmentLine(e.AFW_SUITE_NEEDS));
           NODE_STAGE_ASSIGNMENTS

```


## Current inactive qualifier (complete; transient F7 only)
Path .github/workflows/afw-finite-budget-qualification.yml
```yaml
name: AFW readonly boundary qualification
run-name: AFW readonly boundary ONEUSE ${{ github.sha }}
on:
  push:
    branches:
      - feat/finite-native-cleanup-20261101
    paths:
      - .github/workflows/afw-finite-budget-qualification.yml
permissions:
  contents: read
  actions: read
concurrency:
  group: afw-readonly-boundary-qualification
  cancel-in-progress: false
# INACTIVE UNATTACHED data. Separate Root gate and one-use release required.
# Fixed Native candidate is read as DATA, never imported or executed.
jobs:
  qualify:
    if: ${{ false && github.repository_id == '1347578006' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 && github.event_name == 'push' && github.workflow == 'AFW readonly boundary qualification' && github.workflow_ref == 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-JOBS-ROOT-ONEUSE-20261114' }}
    runs-on: ubuntu-24.04
    timeout-minutes: 4
    outputs:
      artifact-id: ${{ steps.upload.outputs.artifact-id }}
      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
    steps:
      - name: Require exact source role
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          test "$GITHUB_REPOSITORY_ID" = 1347578006
          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
          test "$GITHUB_RUN_ATTEMPT" = 1
          test "$GITHUB_EVENT_NAME" = push
          test "$GITHUB_WORKFLOW" = 'AFW readonly boundary qualification'
          test "$GITHUB_WORKFLOW_REF" = 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101'
          test -z "${NODE_OPTIONS+x}"
          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
          test -z "${GH_ARTIFACT_TOKEN+x}"
      - name: Checkout exact revision
        uses: actions/checkout@v4
        with:
          repository: tokenizartinfo-ops/agent-friendly-web
          ref: ${{ github.sha }}
          persist-credentials: false
          fetch-depth: 1
      - name: Use fixed Node
        uses: actions/setup-node@v4
        with:
          node-version: '22.23.4'
      - name: Materialize and hash fixed zero-key programs
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          cat >"$RUNNER_TEMP/afw-readonly-qualify.mjs" <<'AFW_READONLY_QUALIFY'
          import assert from 'node:assert/strict';
          import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
          import {join} from 'node:path';
          import {execFileSync,spawnSync} from 'node:child_process';
          import {createHash} from 'node:crypto';
          import * as S from './afw-readonly-receiver.mjs';
          const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
          const blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
          let stage='pins',failedIds=[];
          async function main(){
           const e=process.env;assert.equal(process.versions.node,'22.23.4');for(const key of ['NODE_OPTIONS','GH_ARTIFACT_TOKEN','AFW_SYN_CHECKPOINT_KEY'])assert.equal(e[key],undefined);assert.deepEqual(process.execArgv,[]);assert.equal(e.GITHUB_JOB,'qualify');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);
           const checked={};for(const [key,pin]of Object.entries(S.PINS)){const b=await readFile(pin.path);assert.equal(b.length,pin.bytes);assert.equal(blob(b),pin.blob);assert.equal(S.sha(b),pin.sha256);checked[key]=b;}
           const b=await readFile(join(e.RUNNER_TEMP,'afw-readonly-integrated-candidate.yml'));assert.equal(b.length,S.CANDIDATE.bytes);assert.equal(blob(b),S.CANDIDATE.blob);assert.equal(S.sha(b),S.CANDIDATE.sha256);assert(b.length<=524288);const candidate=new TextDecoder('utf-8',{fatal:true}).decode(b);assert(Buffer.from(candidate).equals(b));
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
            stage='all_unknown';const root=join(e.RUNNER_TEMP,'afw-readonly-allunknown'),fixtures=join(root,'test','fixtures');roots.push(root);await mkdir(fixtures,{recursive:true,mode:0o700});
            let stub=checked.observer.toString('utf8').replace('export function projectReadonlyTap(','function unusedCandidateReadonlyTap(').replace('export function projectCustodyLimit(','function unusedCandidateCustodyLimit(');assert(stub!==checked.observer.toString('utf8'));stub+="\nexport const projectReadonlyTap=()=>({state:'unknown',cases:['R1','R2','R3','native_file'].map(id=>({id,result:'unknown',directive:'none'})),counts:null});\nexport const projectCustodyLimit=()=>({state:'unknown',guard:null});\n";
            await writeFile(join(fixtures,'finite-budget-stage-observer.mjs'),stub,{flag:'wx',mode:0o600});for(const key of ['runtime','helper'])await writeFile(join(fixtures,S.PINS[key].path.split('/').at(-1)),checked[key],{flag:'wx',mode:0o600});await writeFile(join(root,'test','finite-budget-readonly-observer.test.mjs'),checked.readonlyTests,{flag:'wx',mode:0o600});
            const allUnknown=run(join(root,'test','finite-budget-readonly-observer.test.mjs'),S.TEST_IDS,S.NEGATIVE_IDS);
            stage='readonly';const readonly=run(S.PINS.readonlyTests.path,S.TEST_IDS,[]);
            stage='stage_regressions';const stageTests=run(S.PINS.tests.path,S.OLD_TEST_IDS,[]);const tests={allUnknown,readonly,stage:stageTests};
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
            stage='pair';const value={purpose:'afw.readonly-boundary.qualification.syn.v1',role:'independent-zero-afw-key-readonly-qualification',context,pins:S.PINS,sourcePins:S.SOURCE_PINS,candidate:S.CANDIDATE,basis:S.BASIS,programs:S.PROGRAMS,tests,controls:{negativeFailIds:S.NEGATIVE_IDS,readonlyIds:S.TEST_IDS,stageIds:S.OLD_TEST_IDS,integration,receiver},nonclaims:S.NONCLAIMS},files=S.pair(value);S.validatePair(files,context);const output=join(e.RUNNER_TEMP,'afw-readonly-SMALLSAFE');await mkdir(output,{mode:0o700});for(const [name,bytes]of files)await writeFile(join(output,name),bytes,{flag:'wx',mode:0o600});console.log('AFW_READONLY_BOUNDARY_QUALIFIED/1 '+JSON.stringify({readonly:readonly.tests,stage:stageTests.tests,allUnknownFail:allUnknown.fail,integration:integration.length,receiver:receiver.length}));
           }finally{for(const root of roots){assert(root.startsWith(join(e.RUNNER_TEMP,'afw-readonly-')));await rm(root,{recursive:true,force:true});}}
          }
          main().catch(()=>{console.error('AFW_READONLY_BOUNDARY_QUALIFICATION_FAILED/1 '+JSON.stringify({stage,failedIds:failedIds.filter(id=>[...S.TEST_IDS,...S.OLD_TEST_IDS,...S.INTEGRATION_IDS].includes(id))}));process.exitCode=1;});
          AFW_READONLY_QUALIFY
          cat >"$RUNNER_TEMP/afw-readonly-receiver.mjs" <<'AFW_READONLY_RECEIVER'
          import assert from 'node:assert/strict';
          import {createHash} from 'node:crypto';
          export const PINS=Object.freeze({"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"blob":"83db9cda42ae828998fbe1d3007071825dc31d0c","sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"blob":"62965a9d5836e54563550fe29dff23abe9a62054","sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","blob":"ea30fcb81389b295afcc33ed0a00496cdea81943","bytes":28566,"sha256":"52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5"},"tests":{"path":"test/finite-budget-stage-observer.test.mjs","bytes":13868,"blob":"28a9f114ef18e3e3faba6d75cc808f56bcc84eeb","sha256":"083806c3bbd2b86ead50b55c6c2138dfcd6f6aef02f02f496ac8c4a0bfd344db"},"readonlyTests":{"path":"test/finite-budget-readonly-observer.test.mjs","blob":"5ebe49398466bcd0d8c57ae54d5b4371075674c7","bytes":19584,"sha256":"b7e90cde88bad40b6731759728ed710277eabd2edb7403e0ff11ac11b4b91306"},"world":{"path":"test/fixtures/finite-budget-world.mjs","bytes":243656,"blob":"1e18873791e0520fff611e353232e38786c51941","sha256":"125bfb65ebf5a87fb1301750ffeae4fe52f24dd6049828cf8c8557b94d886855"}});
          export const SOURCE_PINS=Object.freeze({"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"1e18873791e0520fff611e353232e38786c51941","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"});
          export const CANDIDATE=Object.freeze({"commit":"83d84fe360b7b7a458d5a16ad475d2dc86f3f2d7","tree":"4708491c858e3a15dc38d9f9050d637a1983f541","bytes":367631,"blob":"5f088ffcb1803f505111c662eda890a5aad990bc","sha256":"0b9f19a0e83fec9507a9a58356e6f8244a55b574360d33092e02054bf103c118"});
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
          function result(v,context){fields(v,['purpose','role','context','pins','sourcePins','candidate','basis','programs','tests','controls','nonclaims']);same(v.purpose,'afw.readonly-boundary.qualification.syn.v1');same(v.role,'independent-zero-afw-key-readonly-qualification');validateContext(v.context);same(v.context,context);same(v.pins,PINS);same(v.sourcePins,SOURCE_PINS);same(v.candidate,CANDIDATE);same(v.basis,BASIS);same(v.programs,PROGRAMS);fields(v.tests,['allUnknown','readonly','stage']);counts(v.tests.allUnknown,TEST_IDS.length,NEGATIVE_IDS.length);counts(v.tests.readonly,TEST_IDS.length,0);counts(v.tests.stage,OLD_TEST_IDS.length,0);fields(v.controls,['negativeFailIds','readonlyIds','stageIds','integration','receiver']);same(v.controls.negativeFailIds,NEGATIVE_IDS);same(v.controls.readonlyIds,TEST_IDS);same(v.controls.stageIds,OLD_TEST_IDS);same(v.controls.integration,statuses(INTEGRATION_IDS));same(v.controls.receiver,statuses(RECEIVER_IDS));same(v.nonclaims,NONCLAIMS);}
          function parse(b){assert(Buffer.isBuffer(b)&&b.length>0&&b.length<=65536);const text=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(text);assert(canonical(v).equals(b));return v;}
          export function pair(v){const b=canonical(v);return new Map([['result.json',b],['manifest.json',canonical({purpose:'afw.readonly-boundary.qualification.manifest.syn.v1',context:v.context,files:[{path:'result.json',bytes:b.length,sha256:sha(b)}]})]]);}
          export function validatePair(files,context){validateContext(context);assert(files instanceof Map);same([...files.keys()].sort(),['manifest.json','result.json']);assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=65536);const value=parse(files.get('result.json')),manifest=parse(files.get('manifest.json'));result(value,context);fields(manifest,['purpose','context','files']);same(manifest.purpose,'afw.readonly-boundary.qualification.manifest.syn.v1');same(manifest.context,context);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;}
          export function runReceiverControls(context){
           const out=[],record=(id,fn)=>{fn();out.push({id,status:'passed'});},clone=v=>JSON.parse(JSON.stringify(v));const count=(n,fail=0)=>({exit:fail?1:0,tests:n,pass:n-fail,fail,cancelled:0,skipped:0,todo:0});
           const fixture={purpose:'afw.readonly-boundary.qualification.syn.v1',role:'independent-zero-afw-key-readonly-qualification',context,pins:PINS,sourcePins:SOURCE_PINS,candidate:CANDIDATE,basis:BASIS,programs:PROGRAMS,tests:{allUnknown:count(TEST_IDS.length,NEGATIVE_IDS.length),readonly:count(TEST_IDS.length),stage:count(OLD_TEST_IDS.length)},controls:{negativeFailIds:NEGATIVE_IDS,readonlyIds:TEST_IDS,stageIds:OLD_TEST_IDS,integration:statuses(INTEGRATION_IDS),receiver:statuses(RECEIVER_IDS)},nonclaims:NONCLAIMS};
           const reject=mutate=>{const v=clone(fixture);mutate(v);assert.throws(()=>validatePair(pair(v),context));};
           record(RECEIVER_IDS[0],()=>{same(validatePair(pair(fixture),context),fixture);const f=pair(fixture);f.set('result.json',Buffer.from(JSON.stringify(fixture,null,2)+'\n'));assert.throws(()=>validatePair(f,context));});
           record(RECEIVER_IDS[1],()=>reject(v=>{v.candidate.blob='a'.repeat(40);}));
           record(RECEIVER_IDS[2],()=>{reject(v=>v.controls.readonlyIds.push('unknown'));reject(v=>v.tests.readonly.fail++);reject(v=>v.controls.negativeFailIds.pop());});
           record(RECEIVER_IDS[3],()=>reject(v=>{v.nonclaims.receiptAuthenticated=true;}));
           record(RECEIVER_IDS[4],()=>reject(v=>{v.context.run=context.run==='1'?'2':'1';}));
           record(RECEIVER_IDS[5],()=>{const f=pair(fixture),m=JSON.parse(f.get('manifest.json'));m.files[0].bytes++;f.set('manifest.json',canonical(m));assert.throws(()=>validatePair(f,context));});
           record(RECEIVER_IDS[6],()=>{reject(v=>{v.purpose='afw.sanitized-stage-observations.finalfix.qualification.syn.v1';});reject(v=>{v.extra=true;});});
           record(RECEIVER_IDS[7],()=>reject(v=>{v.pins.tests.blob='a'.repeat(40);}));return out;
          }
          AFW_READONLY_RECEIVER
          cat >"$RUNNER_TEMP/afw-readonly-verify.mjs" <<'AFW_READONLY_VERIFY'
          import assert from 'node:assert/strict';
          import {readFile} from 'node:fs/promises';
          import {createHash} from 'node:crypto';
          import {execFileSync} from 'node:child_process';
          import * as S from './afw-readonly-receiver.mjs';
          import * as Z from './afw-suite-safe-zip.mjs';
          
          const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
          async function main(){
           const env=process.env;assert.equal(process.versions.node,'22.23.4');assert.equal(env.NODE_OPTIONS,undefined);assert.equal(env.AFW_SYN_CHECKPOINT_KEY,undefined);assert.equal(env.GITHUB_JOB,'verify');assert.equal(env.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(env.GITHUB_RUN_ATTEMPT,'1');
           const context={repository:env.GITHUB_REPOSITORY,repositoryId:env.GITHUB_REPOSITORY_ID,ref:env.GITHUB_REF,source:env.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:env.GITHUB_RUN_ID,attempt:Number(env.GITHUB_RUN_ATTEMPT),node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);assert.equal(env.QUALIFY_RESULT,'success');
           for(const pin of Object.values(S.PINS)){const bytes=await readFile(pin.path);assert.equal(bytes.length,pin.bytes);assert.equal(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),pin.blob);assert.equal(S.sha(bytes),pin.sha256);}
           
           const id=env.QUALIFY_ARTIFACT_ID,digest=env.QUALIFY_ARTIFACT_DIGEST,token=env.GH_ARTIFACT_TOKEN;assert.match(id,/^[1-9][0-9]*$/);assert.match(digest,/^[a-f0-9]{64}$/);assert(typeof token==='string'&&token.length>0);
           async function json(path){const response=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web'+path,{redirect:'error',headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});assert.equal(response.status,200);assert(response.body);const parts=[],reader=response.body.getReader();let size=0;try{for(;;){const item=await reader.read();if(item.done)break;size+=item.value.byteLength;assert(size<=65536);parts.push(Buffer.from(item.value));}}catch(error){try{await reader.cancel();}catch{}throw error;}return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(parts)));}
           const run=await json('/actions/runs/'+context.run);assert.equal(run.id,Number(context.run));assert.equal(run.run_attempt,1);assert.equal(run.head_sha,context.source);assert.equal(run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(run.event,env.GITHUB_EVENT_NAME);assert.equal(run.path,'.github/workflows/afw-finite-budget-qualification.yml');assert.equal(run.repository.id,1347578006);assert.equal(run.head_repository.id,1347578006);
           const metadata=await json('/actions/artifacts/'+id),name='readonly-boundary-SMALLSAFE-'+context.source+'-'+context.run;
           assert.equal(metadata.id,Number(id));assert.equal(metadata.name,name);assert.equal(metadata.expired,false);assert.equal(metadata.digest,'sha256:'+digest);assert(Number.isSafeInteger(metadata.size_in_bytes)&&metadata.size_in_bytes>0&&metadata.size_in_bytes<=65536);
           assert.equal(metadata.workflow_run.id,Number(context.run));assert.equal(metadata.workflow_run.repository_id,1347578006);assert.equal(metadata.workflow_run.head_repository_id,1347578006);assert.equal(metadata.workflow_run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(metadata.workflow_run.head_sha,context.source);
           const created=Date.parse(metadata.created_at),expires=Date.parse(metadata.expires_at);assert(Number.isFinite(created)&&Number.isFinite(expires)&&created<=Date.now()+60000&&expires>Date.now()&&expires-created<=604860000);
           const bytes=await Z.downloadAssignedZip(id,token);assert(bytes.length<=65536);const rawSha=Z.bindRawZip(bytes,metadata.size_in_bytes,digest,metadata.digest),files=Z.decodeSafePair(bytes),value=S.validatePair(files,context);
           
           console.log('AFW_READONLY_BOUNDARY_SMALLSAFE/1 '+JSON.stringify({context,artifactId:id,uploadedDigest:digest,metadataSize:metadata.size_in_bytes,rawBytes:bytes.length,rawSha256:rawSha,resultBytes:files.get('result.json').length,resultSha256:S.sha(files.get('result.json')),manifestBytes:files.get('manifest.json').length,manifestSha256:S.sha(files.get('manifest.json')),tests:value.tests,candidate:value.candidate,programs:value.programs,integrationControls:value.controls.integration.length,receiverControls:value.controls.receiver.length,nonclaims:S.NONCLAIMS}));
          }
          main().catch(()=>{console.error('AFW_READONLY_BOUNDARY_RECEIVER_FAILED/1');process.exitCode=1;});
          AFW_READONLY_VERIFY
          cat >"$RUNNER_TEMP/afw-suite-safe-zip.mjs" <<'AFW_READONLY_ZIP'
          import assert from 'node:assert/strict';
          import {createHash} from 'node:crypto';
          import {inflateRawSync,deflateRawSync} from 'node:zlib';
          export class SafeZipRejected extends Error{constructor(reason){super(reason);this.reason=reason;}}
          const Rejected=SafeZipRejected,need=(ok,reason)=>{if(!ok)throw new SafeZipRejected(reason);},NAMES=['result.json','manifest.json'],CAPS={'result.json':65536,'manifest.json':65536};
          const utf8=b=>{const s=new TextDecoder('utf-8',{fatal:true}).decode(b);need(Buffer.from(s).equals(b),'zip_utf8');return s;};
          export const zipSha=b=>createHash('sha256').update(b).digest('hex');
          export function bindRawZip(bytes,size,uploaded,metadataDigest){
           need(Buffer.isBuffer(bytes)&&Number.isSafeInteger(size)&&size>0&&size<=131072&&bytes.length===size,'zip_binding_size');
           need(typeof uploaded==='string'&&/^[a-f0-9]{64}$/.test(uploaded)&&typeof metadataDigest==='string'&&/^sha256:[a-f0-9]{64}$/.test(metadataDigest),'zip_binding_digest');
           const digest=zipSha(bytes);need(digest===uploaded&&'sha256:'+digest===metadataDigest,'zip_binding_digest');return digest;
          }
          const crcTable=Uint32Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
          function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=crcTable[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
          function extraFields(bytes){let n=0;while(n<bytes.length){need(n+4<=bytes.length,'zip_extra');const kind=bytes.readUInt16LE(n),size=bytes.readUInt16LE(n+2);need(kind!==1&&n+4+size<=bytes.length,'zip_extra');n+=4+size;}need(n===bytes.length,'zip_extra');}
          export function decodeSafePair(bytes){
           need(Buffer.isBuffer(bytes)&&bytes.length>=22&&bytes.length<=131072,'zip_bound');
           const end=bytes.length-22;need(bytes.readUInt32LE(end)===0x06054b50&&bytes.readUInt16LE(end+20)===0,'zip_eocd');
           need(bytes.readUInt16LE(end+4)===0&&bytes.readUInt16LE(end+6)===0&&bytes.readUInt16LE(end+8)===2&&bytes.readUInt16LE(end+10)===2,'zip_entries');
           const directorySize=bytes.readUInt32LE(end+12),directory=bytes.readUInt32LE(end+16);need(directory>0&&directory+directorySize===end,'zip_directory');
           const entries=[],seen=new Set();let cursor=directory;
           for(let n=0;n<2;n++){
            need(cursor+46<=end&&bytes.readUInt32LE(cursor)===0x02014b50,'zip_central');
            const flags=bytes.readUInt16LE(cursor+8),method=bytes.readUInt16LE(cursor+10),crc=bytes.readUInt32LE(cursor+16),compressed=bytes.readUInt32LE(cursor+20),size=bytes.readUInt32LE(cursor+24),nameLength=bytes.readUInt16LE(cursor+28),extraLength=bytes.readUInt16LE(cursor+30),commentLength=bytes.readUInt16LE(cursor+32),disk=bytes.readUInt16LE(cursor+34),attributes=bytes.readUInt32LE(cursor+38),local=bytes.readUInt32LE(cursor+42);
            need((flags&~0x0808)===0&&(method===0||method===8)&&disk===0&&nameLength>0&&nameLength<=32&&commentLength===0,'zip_flags');
            need(cursor+46+nameLength+extraLength<=end,'zip_central_range');const rawName=bytes.subarray(cursor+46,cursor+46+nameLength),name=utf8(rawName);
            need(NAMES.includes(name)&&!seen.has(name),'zip_paths');seen.add(name);
            const kind=(attributes>>>16)&0xf000;need((kind===0||kind===0x8000)&&(attributes&0x10)===0,'zip_link');
            need(size<=CAPS[name]&&compressed<=bytes.length&&local<directory,'zip_entry_bound');extraFields(bytes.subarray(cursor+46+nameLength,cursor+46+nameLength+extraLength));
            need(local+30<=directory&&bytes.readUInt32LE(local)===0x04034b50,'zip_local');
            const lf=bytes.readUInt16LE(local+6),lm=bytes.readUInt16LE(local+8),lc=bytes.readUInt32LE(local+14),lz=bytes.readUInt32LE(local+18),lu=bytes.readUInt32LE(local+22),ln=bytes.readUInt16LE(local+26),le=bytes.readUInt16LE(local+28),start=local+30+ln+le;
            need(lf===flags&&lm===method&&ln===nameLength&&start<=directory,'zip_local_identity');
            need(bytes.subarray(local+30,local+30+ln).equals(rawName),'zip_local_name');extraFields(bytes.subarray(local+30+ln,start));
            need(start+compressed<=directory,'zip_data_range');let finish=start+compressed;
            if(flags&8){
             need((lc===0&&lz===0&&lu===0)||(lc===crc&&lz===compressed&&lu===size),'zip_local_sizes');
             const ends=[];if(finish+12<=directory&&bytes.readUInt32LE(finish)===crc&&bytes.readUInt32LE(finish+4)===compressed&&bytes.readUInt32LE(finish+8)===size)ends.push(finish+12);
             if(finish+16<=directory&&bytes.readUInt32LE(finish)===0x08074b50&&bytes.readUInt32LE(finish+4)===crc&&bytes.readUInt32LE(finish+8)===compressed&&bytes.readUInt32LE(finish+12)===size)ends.push(finish+16);
             need(ends.length===1,'zip_descriptor');finish=ends[0];
            }else need(lc===crc&&lz===compressed&&lu===size,'zip_local_sizes');
            entries.push({name,method,crc,compressed,size,local,start,finish});cursor+=46+nameLength+extraLength;
           }
           need(cursor===end&&seen.size===2,'zip_directory');
           const ranges=entries.slice().sort((a,b)=>a.local-b.local);need(ranges[0].local===0,'zip_ranges');for(let n=1;n<ranges.length;n++)need(ranges[n-1].finish===ranges[n].local,'zip_ranges');need(ranges.at(-1).finish===directory,'zip_ranges');
           need(entries.reduce((n,e)=>n+e.size,0)<=65536,'zip_output_cap');const files=new Map();for(const e of entries){const input=bytes.subarray(e.start,e.start+e.compressed);let value;try{value=e.method===0?input:inflateRawSync(input,{maxOutputLength:CAPS[e.name]});}catch{throw new Rejected('zip_inflate');}need(value.length===e.size&&(e.method!==0||e.compressed===e.size),'zip_inflate');need(crc32(value)===e.crc,'zip_crc');files.set(e.name,value);}
           return files;
          }
          
          
          export async function collectZipBody(response,signal){
           need(response.status===200&&response.body!==null,'zip_http');const reader=response.body.getReader(),parts=[];let total=0;
           try{for(;;){const item=await reader.read();if(item.done)break;total+=item.value.byteLength;need(total<=131072,'zip_download_cap');parts.push(Buffer.from(item.value));}}
           catch(error){try{await reader.cancel();}catch{}throw error;}
           need(!signal.aborted,'zip_download_timeout');return Buffer.concat(parts);
          }
          export function deliveryLocation(value){
           need(typeof value==='string','zip_redirect');let next;try{next=new URL(value);}catch{throw new SafeZipRejected('zip_redirect');}
           need(next.protocol==='https:'&&!next.username&&!next.password&&(!next.port||next.port==='443')&&!next.hash,'zip_redirect');return next.href;
          }
          export async function downloadAssignedZip(id,token){
           need(typeof id==='string'&&/^[1-9][0-9]*$/.test(id)&&typeof token==='string'&&token.length>0,'zip_download_input');
           const signal=AbortSignal.timeout(30000),seen=new Set();let url='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+id+'/zip';
           for(let redirects=0;redirects<=3;redirects++){
            need(!seen.has(url),'zip_redirect');seen.add(url);
            const response=await fetch(url,{redirect:'manual',signal,headers:redirects===0?{Authorization:'Bearer '+token,Accept:'application/vnd.github+json'}:{}});
            if(response.status===200)return await collectZipBody(response,signal);
            need([301,302,303,307,308].includes(response.status)&&redirects<3,'zip_http');
            const next=deliveryLocation(response.headers.get('location'));await response.body?.cancel();url=next;
           }throw new SafeZipRejected('zip_redirect');
          }
          
          function fixedZip({names=NAMES,method=0,descriptor=0,data={},declared={},gap=false}={}){
           const locals=[],central=[];let offset=0;
           for(let index=0;index<names.length;index++){
            const name=names[index],n=Buffer.from(name),value=data[name]??Buffer.from(name==='result.json'?'{"fixture":true}':'{"fixture":"manifest"}'),packed=method===8?deflateRawSync(value):value,crc=crc32(value),size=declared[name]??value.length,local=Buffer.alloc(30),flags=descriptor?8:0;
            local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(flags,6);local.writeUInt16LE(method,8);if(!descriptor){local.writeUInt32LE(crc,14);local.writeUInt32LE(packed.length,18);local.writeUInt32LE(size,22);}local.writeUInt16LE(n.length,26);
            const tail=Buffer.alloc(descriptor===1?16:descriptor===2?12:0);if(descriptor){const at=descriptor===1?4:0;if(at)tail.writeUInt32LE(0x08074b50);tail.writeUInt32LE(crc,at);tail.writeUInt32LE(packed.length,at+4);tail.writeUInt32LE(size,at+8);}
            const row=Buffer.alloc(46);row.writeUInt32LE(0x02014b50);row.writeUInt16LE(20,4);row.writeUInt16LE(20,6);row.writeUInt16LE(flags,8);row.writeUInt16LE(method,10);row.writeUInt32LE(crc,16);row.writeUInt32LE(packed.length,20);row.writeUInt32LE(size,24);row.writeUInt16LE(n.length,28);row.writeUInt32LE(offset,42);central.push(row,n);locals.push(local,n,packed,tail);offset+=local.length+n.length+packed.length+tail.length;if(gap&&index===0){locals.push(Buffer.from([0]));offset++;}
           }
           const dir=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(names.length,8);end.writeUInt16LE(names.length,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...locals,dir,end]);
          }
          export const ZIP_CONTROL_IDS=Object.freeze(['zip_valid_store_crc_vector','zip_valid_deflate','zip_signed_unsigned_descriptors','zip_wrong_size','zip_wrong_upload_sha','zip_wrong_metadata_sha','zip_extra_entry','zip_duplicate_entry','zip_traversal_entry','zip_symlink','zip_bad_crc','zip_noncontiguous_ranges','zip_declared_and_inflate_caps','download_stream_redirect_auth_bounds']);
          export async function runZipControls(){
           const results=[],decode=bytes=>{bindRawZip(bytes,bytes.length,zipSha(bytes),'sha256:'+zipSha(bytes));return decodeSafePair(bytes);},reject=(fn,reason)=>assert.throws(fn,e=>e instanceof SafeZipRejected&&e.reason===reason),check=async(id,fn)=>{try{await fn();results.push({id,status:'passed'});}catch{results.push({id,status:'failed'});throw Object.assign(new SafeZipRejected('zip_controls_failed'),{results});}};
           await check(ZIP_CONTROL_IDS[0],()=>{assert.equal(crc32(Buffer.from('123456789')),0xcbf43926);assert.deepEqual([...decode(fixedZip()).keys()],NAMES);});
           await check(ZIP_CONTROL_IDS[1],()=>assert.equal(decode(fixedZip({method:8})).get('result.json').toString(),'{"fixture":true}'));
           await check(ZIP_CONTROL_IDS[2],()=>{for(const descriptor of [1,2])assert.equal(decode(fixedZip({method:8,descriptor})).size,2);});
           await check(ZIP_CONTROL_IDS[3],()=>{const b=fixedZip();reject(()=>bindRawZip(b,b.length+1,zipSha(b),'sha256:'+zipSha(b)),'zip_binding_size');});
           await check(ZIP_CONTROL_IDS[4],()=>{const b=fixedZip();reject(()=>bindRawZip(b,b.length,'a'.repeat(64),'sha256:'+zipSha(b)),'zip_binding_digest');});
           await check(ZIP_CONTROL_IDS[5],()=>{const b=fixedZip();reject(()=>bindRawZip(b,b.length,zipSha(b),'sha256:'+'b'.repeat(64)),'zip_binding_digest');reject(()=>bindRawZip(b,b.length,zipSha(b),[zipSha(b)]),'zip_binding_digest');});
           await check(ZIP_CONTROL_IDS[6],()=>reject(()=>decode(fixedZip({names:[...NAMES,'extra']})),'zip_entries'));
           await check(ZIP_CONTROL_IDS[7],()=>reject(()=>decode(fixedZip({names:['result.json','result.json']})),'zip_paths'));
           await check(ZIP_CONTROL_IDS[8],()=>reject(()=>decode(fixedZip({names:['../result.json','manifest.json']})),'zip_paths'));
           await check(ZIP_CONTROL_IDS[9],()=>{const b=fixedZip(),at=b.readUInt32LE(b.length-6);b.writeUInt32LE(0xa0000000,at+38);reject(()=>decode(b),'zip_link');});
           await check(ZIP_CONTROL_IDS[10],()=>{const b=fixedZip();b[30+Buffer.byteLength(NAMES[0])]^=1;reject(()=>decode(b),'zip_crc');});
           await check(ZIP_CONTROL_IDS[11],()=>reject(()=>decode(fixedZip({gap:true})),'zip_ranges'));
           await check(ZIP_CONTROL_IDS[12],()=>{reject(()=>decode(fixedZip({method:8,data:{'result.json':Buffer.alloc(40000),'manifest.json':Buffer.alloc(40000)}})),'zip_output_cap');reject(()=>decode(fixedZip({method:8,data:{'result.json':Buffer.alloc(70000,120)},declared:{'result.json':1}})),'zip_inflate');});
           await check(ZIP_CONTROL_IDS[13],async()=>{
            await assert.rejects(()=>collectZipBody(new Response(new Uint8Array(131073)),new AbortController().signal),e=>e instanceof SafeZipRejected&&e.reason==='zip_download_cap');
            assert.equal(deliveryLocation('https://delivery.example.invalid/fixed'),'https://delivery.example.invalid/fixed');for(const value of ['http://delivery.example.invalid/','https://u:p@delivery.example.invalid/','https://delivery.example.invalid:444/','https://delivery.example.invalid/#x'])reject(()=>deliveryLocation(value),'zip_redirect');
            const originalFetch=globalThis.fetch,calls=[];try{
             globalThis.fetch=async(url,options)=>{calls.push({url,headers:options.headers});return calls.length===1?new Response(null,{status:302,headers:{location:'https://delivery.example.invalid/fixed'}}):new Response(Buffer.from('inert'));};
             assert.equal((await downloadAssignedZip('123','INERT_SYN_TOKEN')).toString(),'inert');assert.equal(calls.length,2);assert.equal(calls[0].url,'https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/123/zip');assert.equal(calls[0].headers.Authorization,'Bearer INERT_SYN_TOKEN');assert.equal(Object.hasOwn(calls[1].headers,'Authorization'),false);
            }finally{globalThis.fetch=originalFetch;}
            let count=0;try{globalThis.fetch=async()=>new Response(null,{status:302,headers:{location:'https://delivery.example.invalid/fixed-'+(++count)}});await assert.rejects(()=>downloadAssignedZip('123','INERT_SYN_TOKEN'),e=>e instanceof SafeZipRejected&&e.reason==='zip_http');assert.equal(count,4);}finally{globalThis.fetch=originalFetch;}
           });
           return results;
          }
          AFW_READONLY_ZIP
          test -z "${NODE_OPTIONS+x}"
          node --input-type=module <<'AFW_READONLY_HASH_GATE'
          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
          try{for(const pin of [{"name":"afw-readonly-qualify.mjs","marker":"AFW_READONLY_QUALIFY","bytes":13321,"sha256":"cd00a7aebdab6c0fea55e236e23d9085fcddb470f7ed7eea53e195a2649cf90c"},{"name":"afw-readonly-receiver.mjs","marker":"AFW_READONLY_RECEIVER","bytes":11467,"sha256":"6966aca7fb75cd8d9f0da861b4b721f32b80da64d48276d5e9a23de928471c15"},{"name":"afw-readonly-verify.mjs","marker":"AFW_READONLY_VERIFY","bytes":4565,"sha256":"66288bf1648254e7e11ea33fb8a4520a40469fb06ce2456bdc4d73ae10f25847"},{"name":"afw-suite-safe-zip.mjs","marker":"AFW_READONLY_ZIP","bytes":13305,"sha256":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}]){const b=await readFile(process.env.RUNNER_TEMP+'/'+pin.name);assert.equal(b.length,pin.bytes);assert.equal(createHash('sha256').update(b).digest('hex'),pin.sha256);}}catch{console.error('AFW_READONLY_BOUNDARY_QUALIFICATION_FAILED/1 '+JSON.stringify({stage:'pins',failedIds:[]}));process.exitCode=1;}
          AFW_READONLY_HASH_GATE
      - name: Fetch the single fixed candidate as DATA only
        env:
          GH_ARTIFACT_TOKEN: ${{ github.token }}
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          test -z "${NODE_OPTIONS+x}"
          node --input-type=module <<'AFW_READONLY_CANDIDATE_DATA'
          import assert from 'node:assert/strict';
          import {writeFile} from 'node:fs/promises';
          import {createHash} from 'node:crypto';
          try{
           const pin={"commit":"83d84fe360b7b7a458d5a16ad475d2dc86f3f2d7","tree":"4708491c858e3a15dc38d9f9050d637a1983f541","bytes":367631,"blob":"5f088ffcb1803f505111c662eda890a5aad990bc","sha256":"0b9f19a0e83fec9507a9a58356e6f8244a55b574360d33092e02054bf103c118"},e=process.env;assert.equal(e.NODE_OPTIONS,undefined);assert.equal(e.AFW_SYN_CHECKPOINT_KEY,undefined);assert.equal(e.GITHUB_JOB,'qualify');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');
           const response=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/contents/.github/workflows/afw-finite-budget-qualification.yml?ref='+pin.commit,{redirect:'error',headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});assert.equal(response.status,200);assert(response.body);
           const reader=response.body.getReader(),parts=[];let count=0;try{for(;;){const item=await reader.read();if(item.done)break;count+=item.value.byteLength;assert(count<=750000);parts.push(Buffer.from(item.value));}}catch(error){try{await reader.cancel();}catch{}throw error;}
           const metadata=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(parts)));assert.equal(metadata.type,'file');assert.equal(metadata.path,'.github/workflows/afw-finite-budget-qualification.yml');assert.equal(metadata.sha,pin.blob);assert.equal(metadata.encoding,'base64');assert.equal(metadata.size,pin.bytes);
           assert(typeof metadata.content==='string');const encoded=metadata.content.replace(/\n/g,'');assert(/^[A-Za-z0-9+/]*={0,2}$/.test(encoded));const bytes=Buffer.from(encoded,'base64');assert.equal(bytes.toString('base64'),encoded);assert.equal(bytes.length,pin.bytes);assert(bytes.length<=524288);assert.equal(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),pin.blob);assert.equal(createHash('sha256').update(bytes).digest('hex'),pin.sha256);assert(Buffer.from(new TextDecoder('utf-8',{fatal:true}).decode(bytes)).equals(bytes));
           await writeFile(e.RUNNER_TEMP+'/afw-readonly-integrated-candidate.yml',bytes,{flag:'wx',mode:0o600});
          }catch{console.error('AFW_READONLY_BOUNDARY_QUALIFICATION_FAILED/1 '+JSON.stringify({stage:'candidate_fetch',failedIds:[]}));process.exitCode=1;}
          AFW_READONLY_CANDIDATE_DATA
      - name: Install existing lock without keys or scripts
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          test -z "${NODE_OPTIONS+x}"
          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
          test -z "${GH_ARTIFACT_TOKEN+x}"
          test "$(node -v)" = v22.23.4
          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-readonly-install.log" 2>&1 || { echo 'AFW_READONLY_BOUNDARY_QUALIFICATION_FAILED/1 {"stage":"locked_install","failedIds":[]}'; exit 1; }
      - name: Qualify real Node TAP pure observers and frozen source policy
        id: qualification
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          test -z "${NODE_OPTIONS+x}"
          node "$RUNNER_TEMP/afw-readonly-qualify.mjs"
      - name: Upload only the current two-JSON SMALLSAFE
        id: upload
        uses: actions/upload-artifact@v4
        with:
          name: readonly-boundary-SMALLSAFE-${{ github.sha }}-${{ github.run_id }}
          path: |
            ${{ runner.temp }}/afw-readonly-SMALLSAFE/result.json
            ${{ runner.temp }}/afw-readonly-SMALLSAFE/manifest.json
          compression-level: 0
          retention-days: 7
          if-no-files-found: error
          overwrite: false
  verify:
    if: ${{ false && always() && !cancelled() && github.repository_id == '1347578006' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 && github.event_name == 'push' && github.workflow == 'AFW readonly boundary qualification' && github.workflow_ref == 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101' && github.event.head_commit.message == 'AFW-READONLY-BOUNDARY-JOBS-ROOT-ONEUSE-20261114' && needs.qualify.result == 'success' }}
    needs: qualify
    runs-on: ubuntu-24.04
    timeout-minutes: 3
    steps:
      - name: Require exact source role
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          test "$GITHUB_REPOSITORY_ID" = 1347578006
          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
          test "$GITHUB_RUN_ATTEMPT" = 1
          test "$GITHUB_EVENT_NAME" = push
          test "$GITHUB_WORKFLOW" = 'AFW readonly boundary qualification'
          test "$GITHUB_WORKFLOW_REF" = 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101'
          test -z "${NODE_OPTIONS+x}"
          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
          test -z "${GH_ARTIFACT_TOKEN+x}"
      - name: Checkout exact revision
        uses: actions/checkout@v4
        with:
          repository: tokenizartinfo-ops/agent-friendly-web
          ref: ${{ github.sha }}
          persist-credentials: false
          fetch-depth: 1
      - name: Use fixed Node
        uses: actions/setup-node@v4
        with:
          node-version: '22.23.4'
      - name: Extract and hash the same fixed programs
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          test -z "${NODE_OPTIONS+x}"
          node --input-type=module <<'AFW_READONLY_EXTRACT'
          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
          try{
           const workflow=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');
           for(const pin of [{"name":"afw-readonly-qualify.mjs","marker":"AFW_READONLY_QUALIFY","bytes":13321,"sha256":"cd00a7aebdab6c0fea55e236e23d9085fcddb470f7ed7eea53e195a2649cf90c"},{"name":"afw-readonly-receiver.mjs","marker":"AFW_READONLY_RECEIVER","bytes":11467,"sha256":"6966aca7fb75cd8d9f0da861b4b721f32b80da64d48276d5e9a23de928471c15"},{"name":"afw-readonly-verify.mjs","marker":"AFW_READONLY_VERIFY","bytes":4565,"sha256":"66288bf1648254e7e11ea33fb8a4520a40469fb06ce2456bdc4d73ae10f25847"},{"name":"afw-suite-safe-zip.mjs","marker":"AFW_READONLY_ZIP","bytes":13305,"sha256":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}]){
            const opening='          cat >"$RUNNER_TEMP/'+pin.name+'" <<\''+pin.marker+'\'\n',closing='\n          '+pin.marker+'\n';
            assert.equal(workflow.split(opening).length,2);const tail=workflow.split(opening)[1];assert.equal(tail.split(closing).length,2);
            const lines=tail.split(closing)[0].split('\n');assert(lines.every(l=>l.startsWith('          ')));
            const b=Buffer.from(lines.map(l=>l.slice(10)).join('\n')+'\n');assert.equal(b.length,pin.bytes);assert.equal(createHash('sha256').update(b).digest('hex'),pin.sha256);
            await writeFile(process.env.RUNNER_TEMP+'/'+pin.name,b,{flag:'wx',mode:0o600});
           }
          }catch{console.error('AFW_READONLY_BOUNDARY_RECEIVER_FAILED/1');process.exitCode=1;}
          AFW_READONLY_EXTRACT
      - name: Verify the current assigned metadata raw ZIP and canonical pair
        env:
          QUALIFY_RESULT: ${{ needs.qualify.result }}
          QUALIFY_ARTIFACT_ID: ${{ needs.qualify.outputs.artifact-id }}
          QUALIFY_ARTIFACT_DIGEST: ${{ needs.qualify.outputs.artifact-digest }}
          GH_ARTIFACT_TOKEN: ${{ github.token }}
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          test -z "${NODE_OPTIONS+x}"
          node "$RUNNER_TEMP/afw-readonly-verify.mjs"
```


## Actual qualification + Root independent restoration/receipt report


## Readonly boundary Task1 qualification accepted by Root — 2026-11-14 18:01 UTC
Three separately gated one-use attempts:43621963158/1 consumedfixture-contextfailure;43623421313/1 consumedjobs-helperfailure;43624083448/1 SUCCESS at e8e7e5b905e93adb2951ee817daecf0082e127b7/tree6948a4a290e1e0b4fbe0068c0dac109201cbf210/F73b8d578222244cd90a1a3786959fde8a472228e9. No reruns. Corrections: copiedfixturechild removesNodeinternalcontext; qualificationblocks onlyrootjobs exact8. D/test/currentNativeDATA unchanged bylasthelperfix. Bothdeclaredjobs positivelySUCCESS: qualify132535976940/verify132536088602 before restoration.
Actual GitHub Node22.23.4 command node "$RUNNER_TEMP/afw-readonly-qualify.mjs" ran checked Node--test--test-reporter=tap for exact32newreadonly and36oldstage cases; realowned syntheticNodefixtures normal/fail1/2/3/before/late/failed_late/empty/poison, no repositoryNativefileexecution. allunknownstub exact32/13pass/19fail/exit1; GREEN32/32/exit0; oldstage36/36/exit0; integration10/10; receiver8/8 =86logicalGREEN. No cancelled/skipped/todo withinthese suites. Q/S/V/Z hashes checked, frozenA/C/V/Z and actualAST/focusedmask/reversebasis/startup/sourceguardcontrols passed. No repeatedold45P suite, no Native/World/SDK/AES/business16 execution.
Literal assigned SMALLSAFE14125870625/7993B/SHA66603d7564d93f789737aaa9045e14e3dfbb9d406e2f1082267ea4321b77aa3f. Root validated run/head/tree/blob/attemptcontext; uploaderdigest=API metadata=rawZIP SHA, exactbytes/canonicaltwoJSON/CRC/ranges/EOCD/UTF8/caps/schema/pins/inventory/context/manifest. result7194B/SHA4473154a764765252ed69785b14e5f4ed5cb5d749476d77346ef5113c6a40d3f/CRC6d9201b6; manifest545B/SHAc6440beadd709a28e5bdd4e288404a43fda61ee396433a9426ae90851dc3dff2/CRC2e268d1d. DownloadedONLYthisassignedsmallpair; no privateNativearchive/log. GenericconnectorGETartifact endpoint unsupported; normalrun-artifacts wrapper provided same literalassignedID metadata, not fallbackselection.
OriginalF7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc restored at0ccfafd45e0fb4933a44775bcacee1b85fef0e6c/treeb7727833646a328db89ff10e86518c8c82c743ac. Root fulltree3202/62WF: onlyD/newtest/SAME vs410b; main0c9unchanged, source/fiveactive/readbacks checked. Entire priorSAME472003B/blob6e58fac585001fa535d57a24a9173a8bedd91165/SHAc66c318c57580287c31f98f61707949dcf2a856030cac6eaacd1994770d5d476 andallolderprefixes preserved beforethisappend.
Current accepted INACTIVE NativeDATA83d84fe360b7b7a458d5a16ad475d2dc86f3f2d7/tree4708491c858e3a15dc38d9f9050d637a1983f541/F75f088ffcb1803f505111c662eda890a5aad990bc/367631B/SHA0b9f19a0e83fec9507a9a58356e6f8244a55b574360d33092e02054bf103c118. Task1 code requires scopedreview before Task2prep/release; Task2 actualfocusedtrialHELD. This acceptance is pure qualification only, NOT business16/currentprovider/receipt-authentication/PCoff. historicalCauseProven=false;receiptAuthenticated=false;operationalReadiness=false;completePackage=false;PCoff=false;globalNativeDrainVerified=false;sdkNamespaceEmptyVerified=false. No runtime/provider/OAuth/permissions/keys/browser/customer/Max change.


## Literal qualification receipt (all fields checked against Root-downloaded two-JSON)
```json
{
  "context": {
    "repository": "tokenizartinfo-ops/agent-friendly-web",
    "repositoryId": "1347578006",
    "ref": "refs/heads/feat/finite-native-cleanup-20261101",
    "source": "e8e7e5b905e93adb2951ee817daecf0082e127b7",
    "tree": "6948a4a290e1e0b4fbe0068c0dac109201cbf210",
    "workflowBlob": "3b8d578222244cd90a1a3786959fde8a472228e9",
    "run": "43624083448",
    "attempt": 1,
    "node": "22.23.4"
  },
  "artifactId": "14125870625",
  "uploadedDigest": "66603d7564d93f789737aaa9045e14e3dfbb9d406e2f1082267ea4321b77aa3f",
  "metadataSize": 7993,
  "rawBytes": 7993,
  "rawSha256": "66603d7564d93f789737aaa9045e14e3dfbb9d406e2f1082267ea4321b77aa3f",
  "resultBytes": 7194,
  "resultSha256": "4473154a764765252ed69785b14e5f4ed5cb5d749476d77346ef5113c6a40d3f",
  "manifestBytes": 545,
  "manifestSha256": "c6440beadd709a28e5bdd4e288404a43fda61ee396433a9426ae90851dc3dff2",
  "tests": {
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
  "candidate": {
    "commit": "83d84fe360b7b7a458d5a16ad475d2dc86f3f2d7",
    "tree": "4708491c858e3a15dc38d9f9050d637a1983f541",
    "bytes": 367631,
    "blob": "5f088ffcb1803f505111c662eda890a5aad990bc",
    "sha256": "0b9f19a0e83fec9507a9a58356e6f8244a55b574360d33092e02054bf103c118"
  },
  "programs": {
    "adapter": {
      "bytes": 63917,
      "sha256": "ae52aab0185c10e92fff9121411c1c9a782d0f8237b3d430016a283c048566f9"
    },
    "controls": {
      "bytes": 63195,
      "sha256": "52823dc8a5c8259b9a4e4780afd33a5ce6bc97da351cd7aa8e4805aad4aaab71"
    },
    "verifier": {
      "bytes": 15099,
      "sha256": "94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf"
    },
    "safeZip": {
      "bytes": 13305,
      "sha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
    }
  },
  "integrationControls": 10,
  "receiverControls": 8,
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

## Actual canonical result.json (Root strict schema/pins/inventory checked)
```json
{
  "purpose": "afw.readonly-boundary.qualification.syn.v1",
  "role": "independent-zero-afw-key-readonly-qualification",
  "context": {
    "repository": "tokenizartinfo-ops/agent-friendly-web",
    "repositoryId": "1347578006",
    "ref": "refs/heads/feat/finite-native-cleanup-20261101",
    "source": "e8e7e5b905e93adb2951ee817daecf0082e127b7",
    "tree": "6948a4a290e1e0b4fbe0068c0dac109201cbf210",
    "workflowBlob": "3b8d578222244cd90a1a3786959fde8a472228e9",
    "run": "43624083448",
    "attempt": 1,
    "node": "22.23.4"
  },
  "pins": {
    "runtime": {
      "path": "test/fixtures/finite-budget-failure-runtime.mjs",
      "bytes": 129,
      "blob": "83db9cda42ae828998fbe1d3007071825dc31d0c",
      "sha256": "922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9"
    },
    "helper": {
      "path": "test/fixtures/finite-budget-failure-diagnostic.mjs",
      "bytes": 7871,
      "blob": "62965a9d5836e54563550fe29dff23abe9a62054",
      "sha256": "6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c"
    },
    "observer": {
      "path": "test/fixtures/finite-budget-stage-observer.mjs",
      "blob": "ea30fcb81389b295afcc33ed0a00496cdea81943",
      "bytes": 28566,
      "sha256": "52e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5"
    },
    "tests": {
      "path": "test/finite-budget-stage-observer.test.mjs",
      "bytes": 13868,
      "blob": "28a9f114ef18e3e3faba6d75cc808f56bcc84eeb",
      "sha256": "083806c3bbd2b86ead50b55c6c2138dfcd6f6aef02f02f496ac8c4a0bfd344db"
    },
    "readonlyTests": {
      "path": "test/finite-budget-readonly-observer.test.mjs",
      "blob": "5ebe49398466bcd0d8c57ae54d5b4371075674c7",
      "bytes": 19584,
      "sha256": "b7e90cde88bad40b6731759728ed710277eabd2edb7403e0ff11ac11b4b91306"
    },
    "world": {
      "path": "test/fixtures/finite-budget-world.mjs",
      "bytes": 243656,
      "blob": "1e18873791e0520fff611e353232e38786c51941",
      "sha256": "125bfb65ebf5a87fb1301750ffeae4fe52f24dd6049828cf8c8557b94d886855"
    }
  },
  "sourcePins": {
    "pureTestBlob": "1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8",
    "nativeTestBlob": "533dafb5df5f8e57442c5b9029dc8dec6dded434",
    "worldBlob": "1e18873791e0520fff611e353232e38786c51941",
    "custodyBlob": "4d05b5ec0f7b074be88ef9733a47c984b0212351",
    "lockBlob": "36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b",
    "sdkVersion": "1.2.1"
  },
  "candidate": {
    "commit": "83d84fe360b7b7a458d5a16ad475d2dc86f3f2d7",
    "tree": "4708491c858e3a15dc38d9f9050d637a1983f541",
    "bytes": 367631,
    "blob": "5f088ffcb1803f505111c662eda890a5aad990bc",
    "sha256": "0b9f19a0e83fec9507a9a58356e6f8244a55b574360d33092e02054bf103c118"
  },
  "basis": {
    "commit": "32ca318743b26a8a6d54ef743c9f101609525491",
    "tree": "c578f1b74ed69f99d22f4eef892a0d12e6257a75",
    "bytes": 367308,
    "blob": "79e3bdcaeaa729195a09897a36fca8053fbb7b13",
    "sha256": "259a4274b315b760265f9f625914efe583a4988b901663aea537dc483674d278"
  },
  "programs": {
    "adapter": {
      "bytes": 63917,
      "sha256": "ae52aab0185c10e92fff9121411c1c9a782d0f8237b3d430016a283c048566f9"
    },
    "controls": {
      "bytes": 63195,
      "sha256": "52823dc8a5c8259b9a4e4780afd33a5ce6bc97da351cd7aa8e4805aad4aaab71"
    },
    "verifier": {
      "bytes": 15099,
      "sha256": "94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf"
    },
    "safeZip": {
      "bytes": 13305,
      "sha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
    }
  },
  "tests": {
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
  "controls": {
    "negativeFailIds": [
      "b01_real_three_ok",
      "b02_real_first_failure_R1",
      "b03_real_first_failure_R2",
      "b04_real_first_failure_R3",
      "b05_real_file_before_cases",
      "b06_real_late_file_repeated_one",
      "b07_real_failed_case_late_file_suppressed",
      "b08_real_empty_file",
      "b09_real_multiline_enumerable_poison",
      "b10_suffix_never_interpreted",
      "b11_no_coercion_and_absence",
      "b14_complete_summary_coherence",
      "b15_closed_directives_and_zero_plan",
      "b16_file_and_ordinal_allowlist",
      "b17_all_ten_public_custody_guards",
      "b18_first_real_guard_only",
      "b20_custody_path_and_frame_bounds",
      "b21_custody_absence_no_coercion_caps",
      "b22_read_once_coherent_projections"
    ],
    "readonlyIds": [
      "b01_real_three_ok",
      "b02_real_first_failure_R1",
      "b03_real_first_failure_R2",
      "b04_real_first_failure_R3",
      "b05_real_file_before_cases",
      "b06_real_late_file_repeated_one",
      "b07_real_failed_case_late_file_suppressed",
      "b08_real_empty_file",
      "b09_real_multiline_enumerable_poison",
      "b10_suffix_never_interpreted",
      "b11_no_coercion_and_absence",
      "b12_whole_representation_caps",
      "b13_prefix_structure_conflicts",
      "b14_complete_summary_coherence",
      "b15_closed_directives_and_zero_plan",
      "b16_file_and_ordinal_allowlist",
      "b17_all_ten_public_custody_guards",
      "b18_first_real_guard_only",
      "b19_custody_generic_and_conflicts",
      "b20_custody_path_and_frame_bounds",
      "b21_custody_absence_no_coercion_caps",
      "b22_read_once_coherent_projections",
      "b23_missing_unsafe_and_truncated_logs",
      "b24_purpose_schema_and_canonicality",
      "b25_context_job_manifest_and_limits",
      "b26_closed_enums_rows_and_nonclaims",
      "b27_availability_projection_truth",
      "b28_production_role_keys_options",
      "b29_production_version_refusal",
      "b30_new_reader_hardlink_and_fd_race",
      "b31_production_fixed_pair_and_async_validator",
      "b32_ok_details_closed_grammar"
    ],
    "stageIds": [
      "s01_exact_stage_chain",
      "s02_one_pending_stage",
      "s03_every_pending_stage",
      "s04_no_observations",
      "s05_sequence_gap",
      "s06_duplicate_stage",
      "s07_conflicting_completion",
      "s08_marker_canonical_schema",
      "s09_http_bounded_only",
      "s10_http_conflicts",
      "s11_canonical_failure_only",
      "s12_legacy_system_code",
      "s13_legacy_custody_enum",
      "s14_legacy_assertion",
      "s15_legacy_private_frame_rejected",
      "s16_failure_conflict",
      "s17_no_message_or_path_echo",
      "s18_code_token_not_substring",
      "s19_missing_logs",
      "s20_real_files_and_closed_pair",
      "s21_symlink_file",
      "s22_symlink_parent",
      "s23_hardlink_rejected",
      "s24_file_bound",
      "s25_tail_truncation_and_marker_prefix",
      "s26_malformed_utf8_and_lines",
      "s27_fd_path_race",
      "s28_fd_mutation_race",
      "s29_readonly_aggregate_truth",
      "s30_pair_fail_closed",
      "s31_exact_assignment_projection",
      "s32_assignment_unavailability_no_borrow",
      "s33_production_token_not_inherited",
      "s34_legacy_conflicting_claims_poison_canonical",
      "s35_real_fifo_swap_bounded_before_read",
      "s36_partial_prefix_only_nonempty_edges"
    ],
    "integration": [
      {
        "id": "i01_actual_key_scope_ast",
        "status": "passed"
      },
      {
        "id": "i02_actual_fixed_cases",
        "status": "passed"
      },
      {
        "id": "i03_diagnostic_secret_rejected",
        "status": "passed"
      },
      {
        "id": "i04_actual_eight_job_workflow",
        "status": "passed"
      },
      {
        "id": "i05_frozen_parser_programs",
        "status": "passed"
      },
      {
        "id": "i06_six_coe_truth_assignments",
        "status": "passed"
      },
      {
        "id": "i07_exact_reverse_basis",
        "status": "passed"
      },
      {
        "id": "i08_focused_three_mask",
        "status": "passed"
      },
      {
        "id": "i09_eight_startup_and_readonly_method",
        "status": "passed"
      },
      {
        "id": "i10_source_and_guard_table",
        "status": "passed"
      }
    ],
    "receiver": [
      {
        "id": "r01_closed_canonical_pair",
        "status": "passed"
      },
      {
        "id": "r02_candidate_pin",
        "status": "passed"
      },
      {
        "id": "r03_counts_and_inventory",
        "status": "passed"
      },
      {
        "id": "r04_seven_nonclaims",
        "status": "passed"
      },
      {
        "id": "r05_current_context",
        "status": "passed"
      },
      {
        "id": "r06_manifest_binding",
        "status": "passed"
      },
      {
        "id": "r07_purpose_and_extra_fields",
        "status": "passed"
      },
      {
        "id": "r08_old_stage_pin",
        "status": "passed"
      }
    ]
  },
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
