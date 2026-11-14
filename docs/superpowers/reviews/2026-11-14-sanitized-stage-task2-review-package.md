# Task2 combined task review package

Base 03680f05dcf051d3b2d3d2bd9829c9ac17592d2a; final 77cff1a07df0d2b41145137dd1cdd1b5627463b6; finaltreeed8f813bd4cac718733c75043127a68da4c721e3. Read-only task review, not whole-plan/final merge review. Full recursive Root proof:3199→3201leaves,62WF exact, only new D/tests +SAME report intentional. Task1 files unchanged; original F7restored; Source final0runs/consumedb07 exactly1run43606148496attempt1/twojobssuccess/fiveactive0/main0c9 exact. Sourcepreparation followed brief; two pre-gate fixes from real CustodyError and GHtoken exclusion incorporated before this one run. No failures/reruns/CF effects. Allsevenflagsfalse; Native/business/PCoff not accepted.

## Commit inventory

- candidate2c390b18 parentbase: Native8 DATA, neverattached/run; tree735c6818/F753d97321.
- inactive4ccd9606 parentbase: D/tests+zero-keyqualificationF7+reportproposal.
- activeb07d1b65 parent4ccd9606: ONLY2falseguards removed; exactmessageAFW-STAGE-TASK2-ONEUSE-20261114.
- restorebe55a74e parentb07d: originalF7restored, deliberateD/tests/reportretained.
- final77cff1a0 parentbe55: ONLYreportappend actualoutcomes.

## Independently consumed actual evidence

Run43606148496/1, qualify132481098711 success14:41:14–14:41:43UTC, verify132481232642 success14:41:44–14:41:50UTC. OnlyassignedSMALLSAFE14118088928/5494B/SHA63bc4be3d26ba55cd5f24eab96244694deeaf4af4aca55bcae50ee81ddab2f54. Root OWN strictZIP/ranges/EOF/CRCknownvector/fatalUTF8/canonical/closedpair/context/pins/candidate/IDs/manifest and exact16fieldVreceipt/API-uploader-rawtriple PASS. ActualNodeRED33/pass32/fail1, realGREEN33pass/fail0, integration16/receiver6=55logicalchecks; allcancel/skip/todo0. Root downloaded no private archives or Native/contracts/producerlogs. ZipControls14 remain priorfrozenqualification, not repeated/newcount.

Root parsed pair audit:

```json
{
  "context": {
    "repository": "tokenizartinfo-ops/agent-friendly-web",
    "repositoryId": "1347578006",
    "ref": "refs/heads/feat/finite-native-cleanup-20261101",
    "source": "b07d1b65d6e448eb353f79e31bffc3ccecdb1182",
    "tree": "2f2241728455aa43774082fb0f36a3f88c295023",
    "workflowBlob": "e3419cde630aeabb72f0d8d2e45a1f6f22f73750",
    "run": "43606148496",
    "attempt": 1,
    "node": "22.23.4"
  },
  "resultBytes": 4692,
  "resultSha256": "629798df5567bb1a99ab37da968685b6591ab78928eb4553165308a96ee6991e",
  "manifestBytes": 548,
  "manifestSha256": "cc27659c8de242ce21789700ccf177603516ad5a6dd910d1dedf700c44d7babc",
  "tests": {
    "red": {
      "exit": 1,
      "tests": 33,
      "pass": 32,
      "fail": 1,
      "cancelled": 0,
      "skipped": 0,
      "todo": 0
    },
    "green": {
      "exit": 0,
      "tests": 33,
      "pass": 33,
      "fail": 0,
      "cancelled": 0,
      "skipped": 0,
      "todo": 0
    }
  },
  "integration": 16,
  "receiver": 6,
  "logicalChecks": 55,
  "allNonclaimsFalse": true
}
```

## Permanent diff — exact full task base→final

diff --git a/test/fixtures/finite-budget-stage-observer.mjs b/test/fixtures/finite-budget-stage-observer.mjs
new file mode100644
--- /dev/null
+++ b/test/fixtures/finite-budget-stage-observer.mjs
@@ -0,0 +1,168 @@
+import assert from 'node:assert/strict';
+import * as fs from 'node:fs/promises';
+import {constants} from 'node:fs';
+import {createHash} from 'node:crypto';
+import {join,resolve,parse,sep,isAbsolute} from 'node:path';
+
+// Source-only observations are unauthenticated location hints. A pending stage can
+// also be caused by process termination; it never establishes a business cause.
+export const STAGES=Object.freeze(['metadata_get','metadata_validation','raw_download','raw_binding','zip_decode','receipt_caps','mkdir','write_files']);
+export const JOBS=Object.freeze(['positive_prepare','reduction_prepare','readonly']);
+export const NEEDS=Object.freeze(['contracts','positive_prepare','positive_consume','reduction_prepare','reduction_consume_a','readonly','reduction_consume_b']);
+export const NONCLAIMS=Object.freeze({historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
+const FILES=Object.freeze([['command','command-output.log'],['seal','seal-custody.log'],['metadata','own-metadata.log'],['count','tap-check.log']]);
+const AVAILABILITY=Object.freeze(['available','missing','oversized','unsafe','racing','malformed','truncated','unavailable']);
+const OUTCOMES=Object.freeze(['success','failure','skipped','cancelled','not_observed']);
+const COUNT=Object.freeze(['not_observed','coded_assertion','unknown']);
+const CONTEXT_KEYS=['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node'];
+const sha=b=>createHash('sha256').update(b).digest('hex');
+const canonical=v=>Buffer.from(JSON.stringify(v)+'\n');
+const same=(a,b)=>assert.deepEqual(a,b,'stage_evidence_rejected');
+const fields=(v,keys)=>{assert(v!==null&&typeof v==='object'&&!Array.isArray(v),'stage_evidence_rejected');same(Object.keys(v),keys);};
+const unknown=()=>({code:'unknown',site:'unknown'});
+const noStage=()=>({state:'not_observed',stage:null});
+const unknownStage=()=>({state:'unknown',stage:null});
+function marker(line,prefix,keys){
+ assert(line.startsWith(prefix+' '),'stage_evidence_rejected');
+ const raw=line.slice(prefix.length+1),v=JSON.parse(raw);fields(v,keys);same(JSON.stringify(v),raw);return v;
+}
+function linesOf(text){
+ assert(typeof text==='string'&&Buffer.byteLength(text)<=65536,'stage_evidence_rejected');
+ assert(text===''||text.endsWith('\n'),'stage_evidence_rejected');
+ const lines=text===''?[]:text.slice(0,-1).split('\n');
+ assert(lines.length<=4096&&lines.every(l=>Buffer.byteLength(l)<=1024&&!l.includes('\r')),'stage_evidence_rejected');return lines;
+}
+function stages(lines){
+ let next=0,pending=false,status=null,seen=false;
+ try{
+  for(const line of lines){
+   if(line.includes('AFW_SYN_STAGE/1')){
+    seen=true;const v=marker(line,'AFW_SYN_STAGE/1',['stage','state']);
+    assert(next<STAGES.length&&v.stage===STAGES[next],'stage_evidence_rejected');
+    if(v.state==='start'){assert(!pending,'stage_evidence_rejected');pending=true;}
+    else{same(v.state,'complete');assert(pending,'stage_evidence_rejected');pending=false;next++;}
+   }else if(line.includes('AFW_SYN_HTTP/1')){
+    const v=marker(line,'AFW_SYN_HTTP/1',['status']);
+    assert(next===0&&pending&&status===null&&Number.isInteger(v.status)&&v.status>=100&&v.status<=599,'stage_evidence_rejected');status=v.status;
+   }
+  }
+  if(!seen)return {stage:noStage(),http:null};
+  if(pending)return {stage:{state:'pending',stage:STAGES[next]},http:status};
+  if(next===STAGES.length)return {stage:{state:'complete',stage:STAGES.at(-1)},http:status};
+  return {stage:unknownStage(),http:null};
+ }catch{return {stage:unknownStage(),http:null};}
+}
+function legacy(lines,P){
+ const codes=P.FIXED_BUDGET_FAILURE_CODES;
+ const observations=[];
+ for(let n=0;n<lines.length;n++){
+  const line=lines[n],header=/^(Error|AssertionError|CustodyError)(?: \[(ERR_ASSERTION|EEXIST|ENOENT|EACCES|ENOSPC|ETIMEDOUT)\])?: (.*)$/.exec(line);
+  if(!header)continue;
+  const message=header[3];let code=header[2]??null,custody=null;
+  if(codes.includes(message)&&message.startsWith('custody_'))custody=message;
+  const system=/^(EEXIST|ENOENT|EACCES|ENOSPC|ETIMEDOUT): /.exec(message);if(system){if(code&&code!==system[1])return {value:unknown(),count:2};code=system[1];}
+  if(header[1]==='CustodyError'&&(!custody||code!==null))continue;
+  if(header[1]==='AssertionError'&&code===null)code='ERR_ASSERTION';
+  if(!code&&!custody)continue;
+  const frames=[];let unrecognizedSourceFrame=false;
+  for(let k=n+1;k<lines.length&&/^ {4}at /.test(lines[k]);k++){
+   const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(lines[k]);
+   if(!match){if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>lines[k].includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;continue;}
+   const path=match[1]??match[4],root='/home/runner/work/agent-friendly-web/agent-friendly-web/';
+   if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>[s.path,root+s.path,'file://'+root+s.path].includes(path)))frames.push(lines[k]);else if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>path.includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;
+  }
+  // This is an owned Error with DATA properties, never an Error from a private log.
+  const owned=new Error();Object.defineProperties(owned,{message:{value:custody??'',configurable:true},code:{value:code??undefined,configurable:true},stack:{value:'Error\n'+(unrecognizedSourceFrame?'':frames.join('\n')),configurable:true}});
+  observations.push(P.projectFixedBudgetFailure(owned));
+ }
+ return {value:observations.length===1?observations[0]:unknown(),count:observations.length};
+}
+export function projectLogText(text,P){
+ try{
+  const lines=linesOf(text),observation=stages(lines),canonicalMarkers=lines.filter(l=>l.includes('AFW_SYN_FAILURE/1'));
+  const old=legacy(lines,P);let failure=old.value;
+  if(canonicalMarkers.length){failure=P.projectFixedBudgetLog(text);if(old.count>1||old.count===1&&JSON.stringify(old.value)!==JSON.stringify(failure))failure=unknown();}
+  return {failure,stage:observation.stage,http:observation.http};
+ }catch{return {failure:unknown(),stage:unknownStage(),http:null};}
+}
+function identity(st){return [st.dev,st.ino,st.mode,st.nlink,st.size,st.mtimeMs,st.ctimeMs];}
+function regular(st){return st.isFile()&&st.nlink===1&&Number.isSafeInteger(st.size)&&st.size>=0;}
+async function controlledRoot(root,io){
+ assert(typeof root==='string'&&isAbsolute(root)&&resolve(root)===root,'stage_evidence_rejected');
+ const base=parse(root).root,parts=root.slice(base.length).split(sep).filter(Boolean),identities=[];let current=base;
+ for(const part of parts){current=join(current,part);const st=await io.lstat(current);assert(st.isDirectory()&&!st.isSymbolicLink(),'stage_evidence_rejected');same(await io.realpath(current),current);identities.push([st.dev,st.ino,st.mode]);}return identities;
+}
+async function readOwned(root,name,io){
+ let fd;const path=join(root,name);
+ try{
+  const parents=await controlledRoot(root,io),before=await io.lstat(path);if(!regular(before)||before.isSymbolicLink())return {availability:'unsafe'};
+  if(before.size>1048576)return {availability:'oversized'};
+  fd=await io.open(path,constants.O_RDONLY|constants.O_NOFOLLOW);const initial=await fd.stat();
+  if(!regular(initial)||JSON.stringify(identity(initial))!==JSON.stringify(identity(before)))return {availability:'racing'};
+  const size=Math.min(initial.size,65536),bytes=Buffer.alloc(size),read=await fd.read(bytes,0,size,initial.size-size);
+  const after=await fd.stat(),pathAfter=await io.lstat(path);let parentStable=false;try{parentStable=JSON.stringify(parents)===JSON.stringify(await controlledRoot(root,io));}catch{}
+  if(!parentStable||read.bytesRead!==size||JSON.stringify(identity(initial))!==JSON.stringify(identity(after))||JSON.stringify(identity(after))!==JSON.stringify(identity(pathAfter)))return {availability:'racing'};
+  if(initial.size>65536)return {availability:'truncated'};
+  if(size&&bytes[size-1]!==10)return {availability:'truncated'};
+  let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(text).equals(bytes));linesOf(text);}catch{return {availability:'malformed'};}
+  // A partial marker at either edge is unavailable, including an initial prefix.
+  for(const line of text.split('\n'))for(const prefix of ['AFW_SYN_STAGE/1','AFW_SYN_HTTP/1','AFW_SYN_FAILURE/1'])if(line&&prefix.startsWith(line)&&line!==prefix)return {availability:'truncated'};
+  return {availability:'available',text};
+ }catch(error){const code=Object.getOwnPropertyDescriptor(error??{},'code')?.value;return {availability:code==='ENOENT'?'missing':['ELOOP','ENOTDIR'].includes(code)?'unsafe':'unavailable'};}
+ finally{if(fd)try{await fd.close();}catch{}}
+}
+// Explicit library-only test boundary: an owned synthetic root/IO can be passed
+// here. Production collection below exposes no root, IO, argv or env path override.
+export async function collectOwnedLogRoot(root,P,io=fs){
+ let safe=true;try{await controlledRoot(root,io);}catch{safe=false;}
+ const logs=[],observations=[];
+ for(const [log,name]of FILES){
+  const read=safe?await readOwned(root,name,io):{availability:'unsafe'},v=read.availability==='available'?projectLogText(read.text,P):{failure:unknown(),stage:unknownStage(),http:null};
+  logs.push({log,availability:read.availability,code:v.failure.code,site:v.failure.site});observations.push(v);
+ }
+ const metadata=observations[2],count=logs[3];
+ return {logs,stage:logs[2].availability==='available'?metadata.stage:unknownStage(),http:logs[2].availability==='available'?metadata.http:null,countCheck:count.availability==='missing'||count.availability==='available'&&count.code==='unknown'&&observations[3].stage.state==='not_observed'?'not_observed':count.availability==='available'&&count.code==='assertion'?'coded_assertion':'unknown'};
+}
+async function projector(){
+ const bytes=await fs.readFile(join(process.cwd(),'test/fixtures/finite-budget-failure-diagnostic.mjs'));
+ same(bytes.length,7927);same(sha(bytes),'97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2');
+ same(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),'6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f');
+ return import('data:text/javascript;base64,'+bytes.toString('base64'));
+}
+export async function collectFixedStagePair({context,job,rawOutcome}){
+ const e=process.env;assert(e.NODE_OPTIONS===undefined&&e.AFW_SYN_CHECKPOINT_KEY===undefined&&e.GH_ARTIFACT_TOKEN===undefined,'stage_evidence_rejected');
+ assert(typeof e.RUNNER_TEMP==='string'&&isAbsolute(e.RUNNER_TEMP),'stage_evidence_rejected');
+ const P=await projector(),pair=makeStagePair({context,job,rawOutcome,observation:await collectOwnedLogRoot(join(e.RUNNER_TEMP,'afw-native-private','logs'),P)});validateStagePairWithProjector(pair,context,job,P);return pair;
+}
+function validateContext(v){fields(v,CONTEXT_KEYS);same(v.repository,'tokenizartinfo-ops/agent-friendly-web');same(v.repositoryId,'1347578006');same(v.ref,'refs/heads/feat/finite-native-cleanup-20261101');for(const k of ['source','tree','workflowBlob'])assert(/^[a-f0-9]{40}$/.test(v[k]));assert(/^[1-9][0-9]*$/.test(v.run));same(v.attempt,1);same(v.node,'22.23.4');}
+function validateValue(v,context,job,P){
+ fields(v,['purpose','context','job','rawOutcome','logs','stage','http','countCheck','nonclaims']);same(v.purpose,'afw.sanitized-stage-observations.syn.v1');validateContext(v.context);same(v.context,context);same(v.job,job);assert(JOBS.includes(v.job)&&OUTCOMES.includes(v.rawOutcome));
+ same(v.logs.length,4);for(const [n,row]of v.logs.entries()){fields(row,['log','availability','code','site']);same(row.log,FILES[n][0]);assert(AVAILABILITY.includes(row.availability));assert(typeof row.code==='string'&&P.FIXED_BUDGET_FAILURE_CODES.includes(row.code));assert(row.site==='unknown'||P.FIXED_BUDGET_FAILURE_SITES.some(s=>s.id===row.site));if(row.availability!=='available')same({code:row.code,site:row.site},unknown());}
+ fields(v.stage,['state','stage']);assert(['not_observed','unknown','pending','complete'].includes(v.stage.state));if(['unknown','not_observed'].includes(v.stage.state))same(v.stage.stage,null);else assert(STAGES.includes(v.stage.stage));if(v.stage.state==='complete')same(v.stage.stage,'write_files');
+ assert(v.http===null||Number.isInteger(v.http)&&v.http>=100&&v.http<=599);assert(COUNT.includes(v.countCheck));if(job!=='readonly')same(v.countCheck,'not_observed');same(v.nonclaims,NONCLAIMS);
+}
+export function makeStagePair({context,job,rawOutcome,observation}){
+ validateContext(context);assert(JOBS.includes(job)&&OUTCOMES.includes(rawOutcome));
+ const value={purpose:'afw.sanitized-stage-observations.syn.v1',context,job,rawOutcome,logs:observation.logs,stage:observation.stage,http:observation.http,countCheck:job==='readonly'?observation.countCheck:'not_observed',nonclaims:NONCLAIMS};
+ const bytes=canonical(value),manifest=canonical({purpose:'afw.sanitized-stage-observations.manifest.syn.v1',context,job,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]});
+ assert(bytes.length+manifest.length<=16384,'stage_evidence_rejected');return new Map([['result.json',bytes],['manifest.json',manifest]]);
+}
+export async function validateStagePair(files,context,job){
+ return validateStagePairWithProjector(files,context,job,await projector());
+}
+export function validateStagePairWithProjector(files,context,job,P){
+ validateContext(context);assert(files instanceof Map);same([...files.keys()],['result.json','manifest.json']);assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=16384);
+ const read=b=>{const s=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(s);assert(canonical(v).equals(b));return v;};
+ const value=read(files.get('result.json')),manifest=read(files.get('manifest.json'));validateValue(value,context,job,P);
+ fields(manifest,['purpose','context','job','files']);same(manifest.purpose,'afw.sanitized-stage-observations.manifest.syn.v1');same(manifest.context,context);same(manifest.job,job);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;
+}
+const unavailableAssignments=()=>JOBS.map(job=>({job,state:'unavailable',artifactId:null,zipSha256:null}));
+export function projectAssignments(text){
+ const unavailable=unavailableAssignments();
+ try{
+  assert(typeof text==='string'&&Buffer.byteLength(text)<=65536);const needs=JSON.parse(text);assert(needs&&typeof needs==='object'&&!Array.isArray(needs));same(Object.keys(needs).sort(),NEEDS.slice().sort());
+  const result=JOBS.map(job=>{const v=needs[job];assert(v&&typeof v==='object'&&!Array.isArray(v));same(Object.keys(v).sort(),['outputs','result']);assert(OUTCOMES.includes(v.result));assert(v.outputs!==null&&typeof v.outputs==='object'&&!Array.isArray(v.outputs));const id=v.outputs['safe-id'],digest=v.outputs['safe-digest'];if(typeof id!=='string'||!/^[1-9][0-9]*$/.test(id)||!Number.isSafeInteger(Number(id))||String(Number(id))!==id||typeof digest!=='string'||!/^[a-f0-9]{64}$/.test(digest))return unavailable.find(x=>x.job===job);return {job,state:'assigned',artifactId:id,zipSha256:digest};});
+  const ids=result.filter(x=>x.state==='assigned').map(x=>x.artifactId);if(new Set(ids).size!==ids.length)return unavailable;return result;
+ }catch{return unavailable;}
+}
+export function assignmentLine(text){return 'AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS '+JSON.stringify(projectAssignments(text));}
diff --git a/test/finite-budget-stage-observer.test.mjs b/test/finite-budget-stage-observer.test.mjs
new file mode100644
--- /dev/null
+++ b/test/finite-budget-stage-observer.test.mjs
@@ -0,0 +1,50 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import * as fs from 'node:fs/promises';
+import {join} from 'node:path';
+import {tmpdir} from 'node:os';
+import * as D from './fixtures/finite-budget-stage-observer.mjs';
+import * as P from './fixtures/finite-budget-failure-diagnostic.mjs';
+
+const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/feat/finite-native-cleanup-20261101',source:'a'.repeat(40),tree:'b'.repeat(40),workflowBlob:'c'.repeat(40),run:'123',attempt:1,node:'22.23.4'};
+const stage=(s,state)=>'AFW_SYN_STAGE/1 '+JSON.stringify({stage:s,state})+'\n';
+const http=n=>'AFW_SYN_HTTP/1 '+JSON.stringify({status:n})+'\n';
+const failure=(code='EACCES',site='custody_20')=>'AFW_SYN_FAILURE/1 '+JSON.stringify({code,site})+'\n';
+const chain=()=>D.STAGES.map((s,i)=>stage(s,'start')+(i===0?http(403):'')+stage(s,'complete')).join('');
+const text=s=>D.projectLogText(s,P);
+const unknown={code:'unknown',site:'unknown'};
+async function owned(fn){const root=await fs.mkdtemp(join(tmpdir(),'afw-stage-owned-'));try{return await fn(root);}finally{assert(root.startsWith(join(tmpdir(),'afw-stage-owned-')));await fs.rm(root,{recursive:true,force:true});}}
+const collect=(root,io)=>D.collectOwnedLogRoot(root,P,io);
+test('s01_exact_stage_chain',()=>assert.deepEqual(text(chain()).stage,{state:'complete',stage:'write_files'}));
+test('s02_one_pending_stage',()=>assert.deepEqual(text(stage('metadata_get','start')).stage,{state:'pending',stage:'metadata_get'}));
+test('s03_every_pending_stage',()=>{for(let i=0;i<D.STAGES.length;i++){const s=D.STAGES.slice(0,i).map(x=>stage(x,'start')+stage(x,'complete')).join('')+stage(D.STAGES[i],'start');assert.deepEqual(text(s).stage,{state:'pending',stage:D.STAGES[i]});}});
+test('s04_no_observations',()=>{assert.deepEqual(text('private unrelated text\n').stage,{state:'not_observed',stage:null});assert.deepEqual(text('').failure,unknown);});
+test('s05_sequence_gap',()=>assert.equal(text(stage('raw_download','start')).stage.state,'unknown'));
+test('s06_duplicate_stage',()=>assert.equal(text(stage('metadata_get','start').repeat(2)).stage.state,'unknown'));
+test('s07_conflicting_completion',()=>assert.equal(text(stage('metadata_get','complete')).stage.state,'unknown'));
+test('s08_marker_canonical_schema',()=>{for(const s of ['AFW_SYN_STAGE/1 {"state":"start","stage":"metadata_get"}\n','AFW_SYN_STAGE/1 {"stage":"metadata_get","state":"start","secret":"PRIVATE"}\n','AFW_SYN_STAGE/1 {"stage":"metadata_get","stage":"metadata_get","state":"start"}\n','AFW_SYN_STAGE/1 {"stage":"other","state":"start"}\n'])assert.equal(text(s).stage.state,'unknown');});
+test('s09_http_bounded_only',()=>{for(const n of [100,200,403,599])assert.equal(text(stage('metadata_get','start')+http(n)).http,n);for(const n of [99,600,200.5])assert.equal(text(stage('metadata_get','start')+http(n)).http,null);});
+test('s10_http_conflicts',()=>{for(const s of [http(200),stage('metadata_get','start')+http(200)+http(403),stage('metadata_get','start')+'AFW_SYN_HTTP/1 {"status":200,"body":"PRIVATE"}\n']){assert.equal(text(s).http,null);assert.equal(text(s).stage.state,'unknown');}});
+test('s11_canonical_failure_only',()=>assert.deepEqual(text(failure()).failure,{code:'EACCES',site:'custody_20'}));
+test('s12_legacy_system_code',()=>assert.deepEqual(text("Error: EEXIST: PRIVATE\n    at seal (test/fixtures/finite-checkpoint-custody.mjs:20:1)\n").failure,{code:'EEXIST',site:'custody_20'}));
+test('s13_legacy_custody_enum',()=>{for(const code of P.FIXED_BUDGET_FAILURE_CODES.filter(x=>x.startsWith('custody_')))assert.equal(text('CustodyError: '+code+'\n').failure.code,code);});
+test('s14_legacy_assertion',()=>assert.deepEqual(text("AssertionError [ERR_ASSERTION]: PRIVATE\n    at test/fixtures/finite-owner-cleanup-persistence.mjs:100:1\n").failure,{code:'assertion',site:'persistence_100'}));
+test('s15_legacy_private_frame_rejected',()=>assert.deepEqual(text('Error: EACCES: PRIVATE\n    at seal (/private/finite-checkpoint-custody.mjs:20:1)\n').failure,{code:'EACCES',site:'unknown'}));
+test('s16_failure_conflict',()=>assert.deepEqual(text(failure()+failure('ENOSPC')).failure,unknown));
+test('s17_no_message_or_path_echo',()=>{const value=text('Error: EACCES: SECRET_PRIVATE_URL_TOKEN\n    at seal (/private/secret.mjs:20:1)\n');const s=JSON.stringify(value);for(const needle of ['SECRET','PRIVATE','URL','TOKEN','secret.mjs','message','stack'])assert(!s.includes(needle));});
+test('s18_code_token_not_substring',()=>{for(const s of ['Error: myEACCES: PRIVATE\n','Error: custody_format_suffix\n','private EACCES\n'])assert.deepEqual(text(s).failure,unknown);});
+test('s19_missing_logs',async()=>owned(async root=>{const v=await collect(root);assert(v.logs.every(x=>x.availability==='missing'));}));
+test('s20_real_files_and_closed_pair',async()=>owned(async root=>{await fs.writeFile(join(root,'own-metadata.log'),chain());await fs.writeFile(join(root,'command-output.log'),failure());const observation=await collect(root),pair=D.makeStagePair({context,job:'positive_prepare',rawOutcome:'failure',observation});assert(pair instanceof Map);const v=D.validateStagePairWithProjector(pair,context,'positive_prepare',P);assert.equal(v.http,403);assert.equal(v.rawOutcome,'failure');assert.deepEqual(Object.keys(v),['purpose','context','job','rawOutcome','logs','stage','http','countCheck','nonclaims']);assert([...pair.values()].reduce((n,b)=>n+b.length,0)<=16384);}));
+test('s21_symlink_file',async()=>owned(async root=>{await fs.writeFile(join(root,'target'),'PRIVATE\n');await fs.symlink(join(root,'target'),join(root,'command-output.log'));assert.equal((await collect(root)).logs[0].availability,'unsafe');}));
+test('s22_symlink_parent',async()=>owned(async root=>{await fs.mkdir(join(root,'real'));await fs.symlink(join(root,'real'),join(root,'alias'));assert((await collect(join(root,'alias'))).logs.every(x=>x.availability==='unsafe'));}));
+test('s23_hardlink_rejected',async()=>owned(async root=>{await fs.writeFile(join(root,'target'),'PRIVATE\n');await fs.link(join(root,'target'),join(root,'command-output.log'));assert.equal((await collect(root)).logs[0].availability,'unsafe');}));
+test('s24_file_bound',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),Buffer.alloc(1048577,10));assert.equal((await collect(root)).logs[0].availability,'oversized');}));
+test('s25_tail_truncation_and_marker_prefix',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),'AFW_SYN_STA');assert.equal((await collect(root)).logs[0].availability,'truncated');await fs.writeFile(join(root,'command-output.log'),'x\n'.repeat(40000)+failure());assert.equal((await collect(root)).logs[0].availability,'truncated');}));
+test('s26_malformed_utf8_and_lines',async()=>owned(async root=>{for(const b of [Buffer.from([255,10]),Buffer.from('x'.repeat(1025)+'\n'),Buffer.from('\n'.repeat(4097)),Buffer.from('x\r\n')]){await fs.writeFile(join(root,'command-output.log'),b);assert.equal((await collect(root)).logs[0].availability,'malformed');}}));
+test('s27_fd_path_race',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),failure());let once=false;const io={...fs,lstat:async p=>{const value=await fs.lstat(p);if(p===join(root,'command-output.log')&&!once){once=true;await fs.rename(p,join(root,'previous'));await fs.writeFile(p,'replacement\n');}return value;}};assert.equal((await collect(root,io)).logs[0].availability,'racing');}));
+test('s28_fd_mutation_race',async()=>owned(async root=>{const path=join(root,'command-output.log');await fs.writeFile(path,failure());const io={...fs,open:async(...args)=>{const fd=await fs.open(...args);return {stat:()=>fd.stat(),read:async(...a)=>{const value=await fd.read(...a);await fs.appendFile(path,'changed\n');return value;},close:()=>fd.close()};}};assert.equal((await collect(root,io)).logs[0].availability,'racing');}));
+test('s29_readonly_aggregate_truth',async()=>owned(async root=>{await fs.writeFile(join(root,'tap-check.log'),"AssertionError [ERR_ASSERTION]: PRIVATE\n");const obs=await collect(root),v=D.validateStagePairWithProjector(D.makeStagePair({context,job:'readonly',rawOutcome:'failure',observation:obs}),context,'readonly',P);assert.equal(v.rawOutcome,'failure');assert.equal(v.countCheck,'coded_assertion');assert(!JSON.stringify(v).includes('nodeTestFailed'));}));
+test('s30_pair_fail_closed',async()=>owned(async root=>{const p=D.makeStagePair({context,job:'readonly',rawOutcome:'success',observation:await collect(root)});for(const mutate of [v=>v.nonclaims.PCoff=true,v=>v.privateId='123',v=>v.rawOutcome='node_failed',v=>v.logs[0].code='PRIVATE']){const q=new Map(p),v=JSON.parse(q.get('result.json'));mutate(v);q.set('result.json',Buffer.from(JSON.stringify(v)+'\n'));assert.throws(()=>D.validateStagePairWithProjector(q,context,'readonly',P));}assert.throws(()=>D.makeStagePair({context,job:'positive_consume',rawOutcome:'success',observation:{}}));}));
+test('s31_exact_assignment_projection',()=>{const needs=Object.fromEntries(D.NEEDS.map(job=>[job,{result:'failure',outputs:{}}]));for(const [i,job]of D.JOBS.entries())needs[job].outputs={'safe-id':String(i+1),'safe-digest':'a'.repeat(64)};const v=D.projectAssignments(JSON.stringify(needs));assert.deepEqual(v,D.JOBS.map((job,i)=>({job,state:'assigned',artifactId:String(i+1),zipSha256:'a'.repeat(64)})));assert(D.assignmentLine(JSON.stringify(needs)).startsWith('AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS '));});
+test('s32_assignment_unavailability_no_borrow',()=>{for(const s of ['PRIVATE','{}','x'.repeat(65537)])assert(D.projectAssignments(s).every(x=>x.state==='unavailable'));const needs=Object.fromEntries(D.NEEDS.map(job=>[job,{result:'success',outputs:{'artifact-id':'999','artifact-digest':'b'.repeat(64)}}]));assert(D.projectAssignments(JSON.stringify(needs)).every(x=>x.state==='unavailable'));for(const job of D.JOBS)needs[job].outputs={'safe-id':'1','safe-digest':'a'.repeat(64)};assert(D.projectAssignments(JSON.stringify(needs)).every(x=>x.state==='unavailable'));});
+test('s33_production_token_not_inherited',async()=>{const previous=process.env.GH_ARTIFACT_TOKEN;process.env.GH_ARTIFACT_TOKEN='SYN_INERT';try{await assert.rejects(()=>D.collectFixedStagePair({context,job:'readonly',rawOutcome:'failure'}));}finally{if(previous===undefined)delete process.env.GH_ARTIFACT_TOKEN;else process.env.GH_ARTIFACT_TOKEN=previous;}});
diff --git a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
--- a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
+++ b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
@@ -3156,8 +3156,180 @@
 
 Complete recursive mode/type/blob comparison between pre-FIX1 closed tree68225f5b43fe39a33171ffa2b418d99df6a306b1 and restoration13d70e proved both responses untruncated,3198→3199 leaves, ALL62 workflows unchanged, ZERO workflow changes and ZERO undeclared changes. Exactly five deliberate paths differ: new runtime8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd, helper6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f, tests8b1580b5cd46e29da2006ab21921f84cc50e8aec, World43aad5bddd844d591572c5868b73697dfd3463f9 and this SAME report. World has only first import+catch, exactly+1 line; every other preunit source leaf/mode/type/blob is exact. New runtime is deliberate, not an undeclared restoration exception.
 
 Full pre-append report fetch exactly0951e40a96b230b37f55b9e9c88b1a31888eb696,358935chars/359048B/SHAe08410135541cc2f408310b87a4d3f3b4f1695f3e723a26cc6a9e195b4401b0c was verified before this append. This preserves its full prefix, including original341981B report before FIX1 and all older checkpoint/failure evidence. No history is rewritten.
 
 Pre-append inventories positively proved consumed dc58 head exactly1 completed success run43511398408/attempt1; restorationd034 head0runs; current artifact inventory exactly assigned14079075483; main0c9c475b3ebaa970fc11d628b40e50a90cceb727; in_progress,pending,queued,requested,waiting each0. Final SAME-report-only append is followed by full Source/ref/tree/prefix/62-workflow/head1run/closed0run/fiveactive0 readbacks. No runtime resources, credentials, grants, subscription, notice/review/withdrawal/autoclose, repair, deployment or owner action were introduced.
 
 Executor self-review found no additional unresolved concern within this fixed Source qualification scope; before-capture substitution/compromised-process limitation remains explicit. Combined Task1 review belongs to Root and is pending; no Task2 or Native attempt begins from this paragraph. All historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified remain false.
+
+
+## 2026-11-14 — Task2 integrated stage observations: INACTIVE PREPARATION; READY for independent Root gate
+
+Authority: Rootdocs `b70af1ed140f499f78478c9b948bd45144f8063c`, binding `docs/superpowers/briefs/2026-11-13-sanitized-stage-observations-task2.md`. Preparation permits GitDB blobs/trees/unattached commits/proposals only. Attaching Source, qualification, Native, runtime and provider effects remain HELD. This section reports authored Source DATA and readbacks, not passing tests. Task1 and all consumed qualifications remain closed and were not repeated. No local Source files, clone, imports/evaluation, tests, npm or build were used; in-memory builtin hashing operated only on literal fetched/authored text.
+
+Identity: PROJECT AFW; repository `tokenizartinfo-ops/agent-friendly-web` / `1347578006`; environment GitHub Source preparation; origin GitHub plugin; resource type unattached Git objects; authorized action preparation only. Sole Source branch `feat/finite-native-cleanup-20261101` remains at base `03680f05dcf051d3b2d3d2bd9829c9ac17592d2a`, tree `0ae2a53a251613137180592c5685986ca37c54e3`. Main readback remains `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. Original F7 rollback is blob `f7a71f1a0fa4f5ddf069ff411f008a098455e5cc`,126209B. Root alone owns Rootdocs. This SAME Source report is append-only.
+
+### Exact immutable candidate and zero-key proposal
+
+Integrated eight-job candidate DATA commit `2c390b182f6889e79480e7b1618f41af8d1e0d22`, tree `735c681809f4b53e3d8d675ca04b39c441a0e219`, F7 blob `53d9732130e96e75aa5e26038ac8b162c6032b30`, 367124B/SHA256 `70ebdecad41f59b12f4057aa5607b715e75b1f828c38368c7c960fa1617e0553`. All eight registered job guards contain literal false. The candidate is never attached or invoked by Task2; the two-job qualifier reads its ONE fixed same-repository contents endpoint at the above commit, validates Gitblob/bytes/SHA/fatal UTF8 and treats the result as DATA. Its 367124B body is below the frozen parser cap524288B. Candidate is linked by exact commit/blob instead of a base64 report copy.
+
+Two-job inactive F7 blob `9eed3689ac4a8c12dfe734b115f09b5a31c7a8ab`, 54468B/SHA256 `bc98f0153a687d6f53a8cd68769854325b94072f559bc3595136457286b313d4`; qualify and verify each have literal false job guards. A resulting unattached proposal commit/tree is assigned in READY_FOR_ROOT_GATE and independently read back. Proposed NEW activation message is exactly `AFW-STAGE-TASK2-ONEUSE-20261114`. Root must first exact-read this inactive proposal, then separately exact-gate an active proposal before a one-use Source CAS is released; this appendix grants no attach authority. There is no workflow_dispatch, no AFW secret expression or environment, no Native/World/SDK/AES invocation in the qualifier. Standard github.token is scoped only to the fixed candidate contents read and current assigned artifact transfer; Q/D tests and diagnostic collector do not inherit it.
+
+Source module pins (all100644/blob):
+
+| Role | Path | Gitblob | Bytes | SHA256 |
+|---|---|---|---:|---|
+|runtime|`test/fixtures/finite-budget-failure-runtime.mjs`|`8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd`|5863|`34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9`|
+|helper|`test/fixtures/finite-budget-failure-diagnostic.mjs`|`6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f`|7927|`97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2`|
+|observer|`test/fixtures/finite-budget-stage-observer.mjs`|`0197111834354a1e911b977a765b161591d48b18`|15604|`1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851`|
+|tests|`test/finite-budget-stage-observer.test.mjs`|`57dfbcfae29c8492acd1767693cc6fccdde45f7e`|10425|`f206f685401be501cb9320286dea7638baa8d8f2cac5c6f796b5851da073bf8c`|
+|World,unchanged|`test/fixtures/finite-budget-world.mjs`|`43aad5bddd844d591572c5868b73697dfd3463f9`|243656|`05e50e17420c42f65f8c8c450efc6dd37f9ae429a32a070c9043ab0a50548238`|
+
+Integrated program pins:
+
+| Program | Gitblob | Bytes | SHA256 |
+|---|---|---:|---|
+|adapter|`d815dc64d2a1dab5804bae3ca5578c2ee6cad3d6`|63917|`3c36b155aab486f82fb9b89f55e0b61ffe01be4a7502350391784195e552b6d0`|
+|controls|`026ceb8ac0135abbd84eefdc853a21d7e5d0351a`|63195|`1f2d53a7ae00b215634c0d6c9aaa40134e725d561d4334ef827ca54a418df261`|
+|verifier|`d2b64db1ff7d4b916bc20902f268b806c0341e73`|15099|`94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf`|
+|safeZip|`5450dec2ffb37a90c9454fc802453ea50cd31278`|13305|`b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d`|
+
+Frozen original A62999B/d76ca29a35725fcee1b8858ebfafce003679a6b62362f76a34fe288c5a7a24d9 and C63195B/a41c417ea624e1a277f326356c8c95184ed7e24cfa42dab32decd731b970f612 were extracted as DATA from9927aea624c9269e293e644934423e88aa88f109. V15099B and Z13305B remain byte-exact. A differs only in the World pin literal and assignedPrivate observations; C differs only in the World pin literal. The complete frozen decoded key-scope parser/forms region remains20587B/SHA2564ab84021b6fcd0afdeb8b3875fa513b31a78c335c5856c9c3811e71b98fb1b7c. SOURCE_PINS remains its original five blob pins plus sdkVersion, with only World changing to the already qualified43aad5bd. Runtime/helper/observer validation is a separate bootstrap pin set. All six Native command bodies, fixed cases, eight jobs/needs/timeouts, caps, clocks and concurrency are preserved as candidate DATA; actual A.validateKeyScopes and A.validateFixedCases will run only after authorized cloud release.
+
+Task2 carrier program pins (Q/S/V/Z):
+
+| Program | Gitblob | Bytes | SHA256 |
+|---|---|---:|---|
+|Q|`7586325fead17a2d62e0e4398e3c3ca60470dd57`|13680|`7288879518302a5626aec57337f623e567cae9e500af5a8ffd8d9ed762bbc72d`|
+|S|`08a1b03b9a221ebb9fb192e6dc81ec86db20290e`|8165|`dcfe48047a1ee6538caf902c8f277ab813dd894efa8a1a8992a44ad928319dfc`|
+|V|`417977e8eed76854d803d983abd29e9561fc6119`|4481|`23da5dc25ec0b091588bf24de3ef6f492b8bcc9f6d97b018c296589e7c79fc21`|
+|Z|`5450dec2ffb37a90c9454fc802453ea50cd31278`|13305|`b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d`|
+
+### Observation contract and boundaries
+
+A.assignedPrivate emits constant canonical `AFW_SYN_STAGE/1 {"stage":...,"state":...}` only for destination own and job positive_prepare/reduction_prepare. Ordered stages are metadata_get,metadata_validation,raw_download,raw_binding,zip_decode,receipt_caps,mkdir,write_files; state is exactly start/complete. Complete is emitted only after the original operation returns, with no change to its order/caps or thrown error. Marker output failure is nonthrowing. Immediately after metadata() returns, the same eligible calls emit `AFW_SYN_HTTP/1 {"status":integer100..599}`; this never authenticates a credential or explains an error. Because metadata() includes JSON decode, a200 decode exception leaves metadata_get pending and HTTPnull. No marker is added to other destinations/jobs.
+
+D uses builtins only; it never imports World/SDK/runtime/AES or opens a network. Production entry `collectFixedStagePair` fixes RUNNER_TEMP/afw-native-private/logs and the four names command-output.log,seal-custody.log,own-metadata.log,tap-check.log. It rejects inherited GH_ARTIFACT_TOKEN, AFW_SYN_CHECKPOINT_KEY or NODE_OPTIONS. Explicit library-only `collectOwnedLogRoot(root,P,io)` admits an owned synthetic root/IO for focused tests; production exposes no argv/env free-path override. Reads verify absolute controlled realpath parents before/after, no symlink, regular nlink1, O_NOFOLLOW FD, FD/path dev/ino/mode/nlink/size/mtime/ctime identities. File cap1MiB; read tail cap65536B; line cap1024B; line count4096. A file larger than the tail is conservatively typed truncated; incomplete final lines/initial marker prefixes, malformed UTF8/lines, races, links and absent files produce typed unavailability/unknown without retries or private text. These conservative omissions are not diagnoses.
+
+Exact per-log availability enum: available,missing,oversized,unsafe,racing,malformed,truncated,unavailable. Rows use only fixed aliases command,seal,metadata,count. code uses the unchanged helper14 enum; site uses unknown or one of its631 fixed public site IDs. The collector accepts exactly canonical one-record AFW_SYN_FAILURE/1 via the pure helper. Explicit bounded legacy recognizers accept Error/AssertionError and the REAL exact CustodyError header for existing custody_* messages only; finite codes and normal approved public frames are projected through an owned Error with DATA message/code/stack, without any native reader/private error/getter. Unknown/conflicting observations return unknown; no message,actual,expected,stack,path,input,ID,URL,header,body,token or private text survives.
+
+Stage sequencing requires the exact ordered start+complete chain, allowing only one pending final start. Gaps, duplicates or conflicts yield unknown. Pending is an unauthenticated location hint that can be left by process termination. The readonly rawOutcome retains the literal aggregate steps.native.outcome: that step includes Node --test, count assertions and business-counts write. It never becomes a claim that Node test failed. countCheck enum is exactly not_observed,coded_assertion,unknown; an optional recognized assertion in the fixed count log is only a coded assertion observation. No new SEAL_OUTCOME expression is introduced.
+
+The production canonical two-JSON pair has COMBINED cap16384B. Exact result key order:
+
+```json
+["purpose","context","job","rawOutcome","logs","stage","http","countCheck","nonclaims"]
+```
+
+purpose=`afw.sanitized-stage-observations.syn.v1`; context exact nine keys repository,repositoryId,ref,source,tree,workflowBlob,run,attempt,node, with fixed AFW repo/ID/ref,40lowerhex source/tree/workflowBlob,positive canonical run,attempt1,node22.23.4. job exactly positive_prepare,reduction_prepare,readonly; rawOutcome success,failure,skipped,cancelled,not_observed. logs exactly four ordered `{log,availability,code,site}` rows as above. stage exact `{state,stage}` with state not_observed/unknown/pending/complete; stage null for unknown/not_observed, one of eight stages for pending, write_files for complete. http integer100..599 or null. countCheck as above, forced not_observed for other jobs. nonclaims exact seven false values below. Manifest exact keys purpose,context,job,files; purpose=`afw.sanitized-stage-observations.manifest.syn.v1`; files exactly[{path:'result.json',bytes:actualResultBytes,sha256:actualResultSHA}]. Canonical JSON requires exact key order and a single trailing LF, fatal UTF8 and no extra file/field. Payload contains no artifact ID/private artifact name.
+
+Three new summary_pair/summary_upload sequences precede the unchanged original truth assertions and use existing registered always&&!cancelled/suite_bootstrap success guards. Only safe-id/safe-digest outputs are added. Artifact names have fixed job slug+github.sha/run_id, never github.job. Each of the8 bootstraps verifies exact Gitblob+bytes+SHA for runtime/helper/D before later World work; relevant imports use the checked bytes as data URLs, independently from the original five-pin binding. Frozen V remains untouched. A separate final registered always step in verify uses AFW_SUITE_NEEDS/toJSON(needs) and D's pure helper to print exactly one `AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS ` canonical line. Its three ordered rows are `{job,state,artifactId,zipSha256}`: assigned canonical positive safe ID+64hex digest, or unavailable/null/null. Missing/invalid/duplicate IDs yield unavailable; no artifact-id fallback, raw needs log or borrowed output. Root may consume that future fixed metadata line only; Native activation remains outside Task2.
+
+### Planned authorized cloud qualification and fixed IDs; NOT EXECUTED
+
+Controlled Node22.23.4, no NODE_OPTIONS/preloads. Locked `npm ci --ignore-scripts --no-audit --no-fund` is only in the future GitHub qualify job with the existing lock. Q command is `node "$RUNNER_TEMP/afw-stage-qualify.mjs"`; child commands are `node --test --test-reporter=tap <owned RED copy of exact test>` and `node --test --test-reporter=tap test/finite-budget-stage-observer.test.mjs`. The privacy RED stub reexports the real verified D bytes and intentionally adds a fixed private canary only to projectLogText; expected RED33tests/32pass/1fail/exit1. Real GREEN expects33/33/0/exit0; both cancelled/skipped/todo0. These are expectations, not observed results. Original Task1 tests,32key-scope cases,14frozen generic ZIP controls and old runs are not repeated.
+
+Q imports the exact extracted A bytes and directly calls its EXISTING assignedPrivate export, with synthetic fixed-endpoint fetch, inert ZIP3 bytes and owned filesystem. There is no A export addition or executable source transformation. Focused controls cover both eligible producers, metadata JSON-decode exception (pending/HTTPnull),403 observation (pending metadata_validation), each later pending stage, preserved sentinel identity, silent ineligible destinations/jobs and nonthrowing observation sink. A builtin filesystem write stub is restored immediately, with synthetic paths only. The parser negative control inserts a secret reference in the diagnostic env as DATA and requires the unchanged A parser to reject it. No real private archive is fetched.
+
+Focused D test IDs:
+
+```json
+["s01_exact_stage_chain","s02_one_pending_stage","s03_every_pending_stage","s04_no_observations","s05_sequence_gap","s06_duplicate_stage","s07_conflicting_completion","s08_marker_canonical_schema","s09_http_bounded_only","s10_http_conflicts","s11_canonical_failure_only","s12_legacy_system_code","s13_legacy_custody_enum","s14_legacy_assertion","s15_legacy_private_frame_rejected","s16_failure_conflict","s17_no_message_or_path_echo","s18_code_token_not_substring","s19_missing_logs","s20_real_files_and_closed_pair","s21_symlink_file","s22_symlink_parent","s23_hardlink_rejected","s24_file_bound","s25_tail_truncation_and_marker_prefix","s26_malformed_utf8_and_lines","s27_fd_path_race","s28_fd_mutation_race","s29_readonly_aggregate_truth","s30_pair_fail_closed","s31_exact_assignment_projection","s32_assignment_unavailability_no_borrow","s33_production_token_not_inherited"]
+```
+
+Integration IDs:
+
+```json
+["i01_integrated_key_scope","i02_exact_fixed_cases","i03_diagnostic_key_reference_rejected","i04_actual_assigned_success","i05_metadata_decode_pending","i06_http_status_observation","i07_raw_download_pending","i08_raw_binding_pending","i09_zip_decode_pending","i10_receipt_caps_pending","i11_mkdir_pending","i12_write_files_pending","i13_other_destinations_silent","i14_observation_sink_nonthrowing","i15_frozen_parser_and_programs","i16_eight_job_dag_and_bootstrap"]
+```
+
+Task2 receiver IDs:
+
+```json
+["r01_task2_closed_pair","r02_integrated_candidate_pin","r03_current_test_inventory","r04_all_seven_nonclaims","r05_current_context","r06_manifest_byte_binding"]
+```
+
+Qualifier result exact ordered keys purpose,role,context,pins,candidate,programs,tests,controls,nonclaims; purpose=`afw.sanitized-stage-observations.task2.qualification.syn.v1`; role=`independent-zero-afw-key-stage-qualification`; context current qualification's nine-field provenance; pins/candidate/programs exactly the tables above. tests={red,green}, each exact{exit,tests,pass,fail,cancelled,skipped,todo}; tests counts fixed33, RED exit1/mixed pass+fail, GREEN exit0/pass33/fail0, all cancelled/skipped/todo0. controls exact{testIds,integration,receiver}; IDs fixed inventories above, all16+6 statuses must be passed. Manifest purpose=`afw.sanitized-stage-observations.task2.manifest.syn.v1`, keys purpose,context,files, one exact result.json byte/hash binding. Pair/raw caps65536. Frozen Z supplies strict two-entry ZIP/CRC/ranges/EOF decoding and assigned transport; current uploader/API/raw digest triple, metadata workflow provenance/expiry and current context/pins must all match. Standard token never enters the diagnostic role. Only assigned stage-task2-SMALLSAFE-<current source>-<current run> can be consumed; no name/history fallback. Root independently verifies the assigned SMALLSAFE after any released run.
+
+Fixed qualification failure line: `AFW_STAGE_QUALIFICATION_FAILED/1 {"stage":...,"failedIds":[...]}`. Stage enum pins,red_tests,green_tests,integration,receiver,pair,candidate_fetch,locked_install; failedIds are filtered to the33focused or16integration IDs only. Q never prints child TAP, assertions, errors or private values. Root may extract this typed line only from the zero-key qualify role. V success metadata prefix is AFW_STAGE_SMALLSAFE/1; V failure is fixed AFW_STAGE_RECEIVER_FAILED/1. No artifact exists and no red/green count, outcome or upload success is claimed at preparation.
+
+### Preservation, readbacks and remaining gate
+
+Before this append, the ENTIRE SAME report text was fetched and builtin-hashed: blob890a0d5ce244713ab04515087dcddb4181d2dbfb,368869B/SHA256344d81629a5a8860ef685d8b9fb12b123b9935dfbf21bcb66596d716ba681626. The new text is exactly that full prefix plus this appendix. Source/main refs, Source head0runs and all five in_progress,pending,queued,requested,waiting inventories0 were read via GitHub plugin immediately before proposal creation. Complete baseline/candidate recursive trees were untruncated,3360→3362entries; baseline leaves3199; all62workflows present. Candidate changes exactly F7 plus the new D/test paths, each100644/blob. Qualification proposal additionally changes only this SAME report; a full tree diff/readback is required before READY and after any future restoration. Original rollbackF7 remains baseline; no branch was moved during preparation.
+
+The preliminary unreferenced candidatec035d551b44607af0a01c0a54c657743fc1cca82 and old D/test pinsc79cbb09/e2988494 were preparation-only and superseded before any attach by Root's concrete CustodyError/token-inheritance corrections. Only candidate2c390b182f6889e79480e7b1618f41af8d1e0d22 and the new01971118/57dfbcfa pins above belong to this proposal. None ran. These identifiers record authorship history only, not authority.
+
+Self-review so far is Source/DATA inspection only: schema is closed, production and explicit synthetic-root boundaries are distinguished, all real header/token constraints are included, clocks/commands/parser/V/Z preserve their pins, and no unapproved destination or effect was introduced. Actual Node22 filesystem behavior, builtin stub synchronization, RED/GREEN, actual A parser/fixed cases/markers and current upload/receiver outcomes remain UNVERIFIED until a separately gated one-use cloud run. If cloud fails, record only the fixed stage/IDs, freeze until BOTH jobs terminal, and seek a fresh scoped correction/release; do not silently weaken gates or rerun. Following any released run, restore originalF7 and every undeclared leaf, keep intentional D/tests, append actual test command/counts/IDs/current provenance/artifact metadata and full Source/main/62workflow/head-run/fiveactive/prefix readbacks here. Task2 combined review belongs to Root; no broad review is claimed here.
+
+All seven nonclaims stay exactly:
+
+```json
+{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+
+## 2026-11-14 — Task2 zero-key qualification SUCCESS; original F7 restored and Source closed
+
+Status: actual Task2 pure Node/source qualification and independent current SMALLSAFE verification succeeded. This establishes the declared observer/privacy/filesystem/parser/synthetic adapter controls only. Task2 combined spec/quality review remains a separate Root gate. Task3/Native, provider/runtime, business acceptance and PC-off remain HELD; all seven nonclaims remain false.
+
+### Exact one-use release and two terminal jobs
+
+Root inactive gate is preserved in Rootdocs1adad35eebd2339b6dd35c82182327f27a773d18; the exact active gate/ONE-USE RELEASE is preserved in Rootdocsfbfe3929142da695511eed8a60357fbbe4b18b2b and its ledger. Only the authorized two false&& qualifiers were removed from inactive4ccd96065037f6adb9cb5e890212f63dbe4928b1 to prepare activeb07d1b65d6e448eb353f79e31bffc3ccecdb1182; every Q/S/V/Z byte, source/candidate/program pin, schema,33+16+6 inventory and report stayed unchanged. Native candidate2c390b182f6889e79480e7b1618f41af8d1e0d22 remained unattached DATA throughout.
+
+After fresh exact Source/main/active0run/fiveactive0 and F7 readbacks, sole executor issued ONE no-force expected-head activation CAS03680f05dcf051d3b2d3d2bd9829c9ac17592d2a→b07d1b65d6e448eb353f79e31bffc3ccecdb1182, exact message AFW-STAGE-TASK2-ONEUSE-20261114. GitHub returned success:true and independent ref readback reconciled the ACK. Initial run inventory0 was propagation only; no second CAS/dispatch/rerun/overlay was attempted. Source remained frozen until BOTH declared jobs were positively terminal.
+
+Activated tree2f2241728455aa43774082fb0f36a3f88c295023; F7e3419cde630aeabb72f0d8d2e45a1f6f22f73750,54450B/SHA256ae6754ac0b0c4123e450d4a62975f8762010154e91babc29f36b638b8075e805. Unique run43606148496/attempt1, push, repo/headRepo1347578006, exact Source branch and .github/workflows/afw-finite-budget-qualification.yml, created/started2026-11-14T14:41:11Z, completed success with final run update14:41:51Z.
+
+| Job | Exact ID | Started UTC | Completed UTC | Conclusion |
+|---|---:|---|---|---|
+|qualify|132481098711|2026-11-14T14:41:14Z|2026-11-14T14:41:43Z|success|
+|verify|132481232642|2026-11-14T14:41:44Z|2026-11-14T14:41:50Z|success|
+
+The current jobs actually completed source-role assertions, exact checkout, controlled Node22.23.4, four-carrier hash materialization, fixed candidate DATA fetch, locked npm ci --ignore-scripts --no-audit --no-fund, Q qualification and current SMALLSAFE upload. V actually completed same-carrier extraction/hash, assigned metadata/raw ZIP/canonical pair/current provenance checks. These are cloud results, not local or inferred operational acceptance.
+
+### Actual RED/GREEN and integration outcome
+
+Current Q was exactly13680B/SHA2567288879518302a5626aec57337f623e567cae9e500af5a8ffd8d9ed762bbc72d, command node "$RUNNER_TEMP/afw-stage-qualify.mjs". It executed node --test --test-reporter=tap against the owned privacy-RED copy of the exact33-ID test file and the actual test/finite-budget-stage-observer.test.mjs. The RED stub reexported SAME verified D bytes and deliberately added the fixed private canary to projectLogText; the GREEN used the actual observer. Raw child TAP/assertions/errors/private text were captured only internally and were never emitted or copied here.
+
+| Current invocation/control family | Tests/checks | Pass | Fail | Exit / acceptance |
+|---|---:|---:|---:|---|
+| privacy RED |33|32|1|exit1, expected privacy deficit|
+| real D GREEN |33|33|0|exit0|
+| candidate/actual adapter integration |16|16|0|all fixed statuses passed|
+| Task2 receiver |6|6|0|all fixed statuses passed|
+
+Both RED/GREEN had cancelled0,skipped0,todo0. Exact33 focused IDs,16 integration IDs and6 receiver IDs are the complete fixed inventories in the preceding inactive proposal and current immutable carrier S. Root independently verified their exact inventories/statuses. GREEN33+integration16+receiver6=55 logical checks; this does not count the intentional RED failure as a failed real implementation. Task1 tests, previous keyscope cases and frozen generic ZIP control suite were not rerun.
+
+The real cloud results cover actual filesystem regular/link/size/tail/malformed/race handling, privacy projection and canonical schema, conservative stage/HTTP sequences, readonly aggregate outcome/count observation and ID-only assignment behavior. The production collector's GH_ARTIFACT_TOKEN rejection and real CustodyError custody_* header tests passed. Actual unchanged A.assignedPrivate export was invoked directly with synthetic fetch/ZIP/filesystem only: both eligible producer success cases, JSON-decode pending/HTTPnull, bounded403 metadata-validation observation, raw-download/raw-binding/ZIP/receipt/mkdir/write pending cases, original sentinel error preservation, other destination/job silence and nonthrowing observation sink passed. Temporary builtin write stub was restored. No real private archive, World/Native/SDK/AES or provider process was executed.
+
+Actual frozen A.validateKeyScopes and A.validateFixedCases accepted the exact367124B integrated candidate DATA; diagnostic key-reference negative control was rejected. The original decoded parser/forms region and frozen V/Z pins passed; eight-job DAG/timeouts, six exact Native command bodies and the separate eight-bootstrap diagnostic source pins were checked as DATA only. No Native command was invoked. These outcomes qualify the authored source under fixed test conditions; they do not prove arbitrary process compromise resistance or historical business failure cause.
+
+### Independent Root SMALLSAFE and assigned artifact binding
+
+Root independently completed SMALLSAFE verification at2026-11-14T14:43:44UTC, reading ONLY assigned artifact14118088928 and fixed verifier metadata. Executor read artifact METADATA ONLY and did not download any ZIP. No private/producer/Native/contracts log or archive was consumed.
+
+Unique current artifact name stage-task2-SMALLSAFE-b07d1b65d6e448eb353f79e31bffc3ccecdb1182-43606148496; expiredfalse; created2026-11-14T14:41:39Z; expires2026-11-21T14:41:38Z. Metadata workflow_run is43606148496/repository1347578006/headRepository1347578006/headBranchfeat/finite-native-cleanup-20261101/headSourceb07d1b65d6e448eb353f79e31bffc3ccecdb1182. Root independently matched the literal current uploader assignment, API metadata and raw ZIP digest triple; no historical/name fallback or borrowed output was used.
+
+| Assigned item | Exact bytes | SHA256 | CRC32 |
+|---|---:|---|---|
+| raw ZIP14118088928 |5494|63bc4be3d26ba55cd5f24eab96244694deeaf4af4aca55bcae50ee81ddab2f54|ZIP container|
+|result.json|4692|629798df5567bb1a99ab37da968685b6591ab78928eb4553165308a96ee6991e|332ac7c4|
+|manifest.json|548|cc27659c8de242ce21789700ccf177603516ad5a6dd910d1dedf700c44d7babc|53f12cee|
+
+Combined expanded pair5240B and raw5494B are within65536. Root's independent strict two-entry ZIP/ranges/EOF/CRC known-vector/fatalUTF8/canonical closed result/manifest checks passed. All nine current context fields, complete source pins, immutable candidate pin, four integrated program pins,33+16+6 inventories, manifest result byte/hash binding, seven false nonclaims and exact16-field fixed verify receipt passed. Artifact transport integrity is separate from historical custody authentication; receiptAuthenticated remains false.
+
+Qualified current context is exactly repository tokenizartinfo-ops/agent-friendly-web; repositoryId"1347578006"; ref refs/heads/feat/finite-native-cleanup-20261101; sourceb07d1b65d6e448eb353f79e31bffc3ccecdb1182; tree2f2241728455aa43774082fb0f36a3f88c295023; workflowBlobe3419cde630aeabb72f0d8d2e45a1f6f22f73750; run"43606148496"; attempt1; node"22.23.4". Qualified D0197111834354a1e911b977a765b161591d48b18/tests57dfbcfae29c8492acd1767693cc6fccdde45f7e and runtime/helper/World/candidate/A/C/V/Z/Q/S/V pins are exactly the preceding immutable proposal. The integrated candidate was never attached or executed.
+
+### Full restoration, report prefix and closure evidence
+
+After fresh exact active-source lease and two completed-success job readbacks, restoration commitbe55a74e7a940b754132e7337624cad3f947170e, parentb07d1b65d6e448eb353f79e31bffc3ccecdb1182, tree9924b772ca2493157ab72e2f20aaf15821732b99 restored only F7 to original blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc. A no-force expected-head restoration CAS returned success:true and exact branch readback reconciled it. The complete restored F7 was fetched, byte-equal126209B/SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a, with its original closed manual/no-push configuration.
+
+Full recursive baseline/restored tree responses were untruncated,3360→3362entries; all62workflow blobs/modes/types were exact to the baseline, with ZERO workflow or undeclared leaf changes. Exactly three deliberate paths remained different: new D01971118, new tests57dfbcfa and this SAME report. Existing runtime/helper/World and every other baseline leaf/mode/type remained byte-exact. Source was not rewritten while either job was running.
+
+The entire pre-append SAME report was fetched as blob7251670fc93353c591cfcf8ee7837b5f0f2d3d65,388105B/SHA256334036cdad55beaaf09200ede9f2a09d9ee1d468c3fa5dff5019d5564aa7a752 and confirmed byte-equal after restoration. This append preserves that ENTIRE388105B prefix, including the complete368869B earlier history and inactive Task2 proposal. No earlier result or authorization was overwritten.
+
+Pre-append fresh primary inventories proved consumed qualifierheadb07d exactlyONE completed success run43606148496/attempt1; restoredheadbe55 zero runs; candidate2c390 zero runs; main exact0c9c475b3ebaa970fc11d628b40e50a90cceb727; in_progress,pending,queued,requested,waiting each0. This final report-only commit is followed by exact Source/ref/tree/full report-prefix/F7/62workflow/consumed-head1/current-head0/candidate0/fiveactive0 readbacks. Any unexpected change would be reported before DONE, without overwriting another writer.
+
+Executor self-review checked authorization/CAS reconciliation and freeze, exact pin/schema/test inventories, actual cloud evidence versus nonclaims, fixed artifact assignment and independent Root verification, full original F7 restoration, complete baseline-tree preservation and append-only historical prefix. No additional unresolved concern was identified within this bounded Task2 source qualification. Conservative unavailability, unauthenticated location hints and process-compromise/historical-cause limitations remain explicit. Root owns the pending combined Task2 review. No Task3/Native, deployment, permission/key/OAuth, runtime, private data or PC-off authority follows from this result.
+
+All historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified remain false.

## Transient Native8 DATA candidate diff — full original9927→candidate2c390, not final Source F7

The original whole suite is a historical Source template, not the closed baseline F7. This transient diff includes EVERY candidate change with context. Root separately compared allsixNativecommandbytes/eightorderedjobs/needs/timeouts; A entireprefix/suffix exact after World substitution, onlyassignedPrivate changed; C onlyWorldpin; V/Z byte-exact; decodedparser/forms exact. Bootstrap wrappers verify runtime/helper/D; handed-off D bytes rehashed before samebytesdataURLimport. Qualification below ran actualA.validateKeyScopes+validateFixedCases on exact pinned candidate. No Native candidate execution.

```diff
@@ -11,17 +11,17 @@
   actions: read
 concurrency:
   group: afw-finite-budget-qualification
   cancel-in-progress: false
 # ONE FINITE ATTEMPT. These eight jobs require the fixed Source push and exact commit message.
 # ONE FINITE ATTEMPT. Job guards admit only attempt 1.
 jobs:
   contracts:
-    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW FRESH WHOLE SYN NATIVE 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     runs-on: ubuntu-24.04
     timeout-minutes: 2
     env:
       AFW_BUDGET_GROUP: positive
     outputs:
       artifact-id: ${{ steps.upload.outputs.artifact-id }}
       artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
       manifest-sha256: ${{ steps.pure_verified.outputs.manifest-sha256 }}
@@ -63,17 +63,17 @@
           import {inflateRawSync} from 'node:zlib';
           import {join,sep} from 'node:path';
           export const sha=b=>createHash('sha256').update(b).digest('hex');
           const binding=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-suite-binding.json'),'utf8'));
           export const CONTEXT=Object.freeze(binding.context),PINS=Object.freeze(binding.sourcePins),PROGRAM_HASHES=Object.freeze(binding.programHashes);
           export const FLAGS=Object.freeze({operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
           export const LEGACY=Object.freeze(['contracts','positive_prepare','positive_consume','reduction_prepare','reduction_consume_a','readonly','reduction_consume_b']);
           export const PRIVATE_PEERS=Object.freeze([{job:'positive_prepare',kind:'checkpoint'},{job:'positive_consume',kind:'positive-result'},{job:'reduction_prepare',kind:'reduction-checkpoint'},{job:'reduction_consume_a',kind:'reduction-result-a'},{job:'readonly',kind:'readonly-result'}]);
-          export const SOURCE_PINS=Object.freeze({pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'});
+          export const SOURCE_PINS=Object.freeze({pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'});
           export const IDS=Object.freeze(['dag_peer_inventory','key_scope','fixed_case_counts','metadata_custody_binding','incomplete_or_contradictory','coherent_current_pair']);
           export const need=(ok)=>assert(ok,'suite_evidence_rejected'),same=(a,b)=>assert.deepEqual(a,b,'suite_evidence_rejected');
           export function fields(v,keys){need(v&&typeof v==='object'&&!Array.isArray(v));const d=Object.getOwnPropertyDescriptors(v);same(Reflect.ownKeys(d).sort(),keys.slice().sort());for(const k of keys)need(Object.hasOwn(d[k],'value')&&d[k].enumerable);}
           export function canonical(v){return Buffer.from(JSON.stringify(v)+'\n');}
           export function parseCanonical(b){need(Buffer.isBuffer(b)&&b.length>0&&b.length<=65536);const s=new TextDecoder('utf-8',{fatal:true}).decode(b);need(Buffer.from(s).equals(b));const v=JSON.parse(s);need(canonical(v).equals(b));return v;}
           export function canonicalId(v){need(typeof v==='string'&&/^[1-9][0-9]*$/.test(v)&&Number.isSafeInteger(Number(v))&&String(Number(v))===v);return v;}
           export function hex(v,n=64){need(typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v));return v;}
           export function requireKeyless(){need(process.env.AFW_SYN_CHECKPOINT_KEY===undefined);}
@@ -384,17 +384,30 @@
            same(cursor,end);same(remaining.size,0);members.sort((a,b)=>a.local-b.local);let last=0,total=0;const result=new Map();
            for(const m of members){const {local,raw,flags,method,sizes}=m;same(last,local);rangeEnd(local,30,central);need(u32(local)===0x04034b50&&u16(local+4)===m.version&&u16(local+6)===flags&&u16(local+8)===method&&u32(local+10)===m.time);const ls=tuple(local+14),descriptor=(flags&8)!==0;need(ls.every((v,i)=>v===sizes[i]||(descriptor&&v===0)));const a=local+30,b=rangeEnd(a,u16(local+26),central);need(bytes.subarray(a,b).equals(raw));const start=rangeEnd(b,u16(local+28),central);extras(b,start);last=rangeEnd(start,sizes[1],central);
            if(descriptor){rangeEnd(last,12,central);const bare=eq(tuple(last),sizes),signed=central-last>=16&&u32(last)===0x08074b50&&eq(tuple(last+4),sizes);need(bare!==signed);last=rangeEnd(last,signed?16:12,central);}
            const input=bytes.subarray(start,start+sizes[1]),data=method===0?input:inflateRawSync(input,{maxOutputLength:m.name==='envelope.bin'?128*MiB:4096});same(data.length,sizes[2]);same(crc32(data),sizes[0]);total+=data.length;need(total<=EXPANDED_CAP);result.set(m.name,data);}
            same(last,central);return result;
           }
           
           export async function assignedPrivate(binding,destination){
-           requireKeyless();const fixed={producer:'afw-producer-envelope',own:'afw-native-readback',...Object.fromEntries(PRIVATE_PEERS.map(x=>[x.job,'afw-qualification-peer-proof/'+x.job+'-sealed']))};need(Object.hasOwn(fixed,destination));const r=await metadata(binding.id);same(r.status,200);validateAssignedMetadata(r.value,binding,'generic-private');const bytes=await rawAssigned(binding.id,'generic-private');same(bytes.length,r.value.size_in_bytes);same(sha(bytes),binding.zipSha256);const files=decodePrivateZip(bytes);validatePrivateReceiptCaps(files,binding.kind);const dir=join(process.env.RUNNER_TEMP,fixed[destination]);await mkdir(dir,{mode:0o700});for(const [n,b]of files)await writeFile(join(dir,n),b,{flag:'wx',mode:0o600});return {binding,metadata:r.value,rawZipBytes:bytes.length,rawZipSha256:sha(bytes)};
+           requireKeyless();const fixed={producer:'afw-producer-envelope',own:'afw-native-readback',...Object.fromEntries(PRIVATE_PEERS.map(x=>[x.job,'afw-qualification-peer-proof/'+x.job+'-sealed']))};need(Object.hasOwn(fixed,destination));
+           const eligible=destination==='own'&&['positive_prepare','reduction_prepare'].includes(binding.job);
+           const observe=(stage,state)=>{if(eligible)try{console.log('AFW_SYN_STAGE/1 '+JSON.stringify({stage,state}));}catch{}};
+           observe('metadata_get','start');const r=await metadata(binding.id);
+           if(eligible&&Number.isInteger(r.status)&&r.status>=100&&r.status<=599)try{console.log('AFW_SYN_HTTP/1 '+JSON.stringify({status:r.status}));}catch{}
+           observe('metadata_get','complete');
+           observe('metadata_validation','start');same(r.status,200);validateAssignedMetadata(r.value,binding,'generic-private');observe('metadata_validation','complete');
+           observe('raw_download','start');const bytes=await rawAssigned(binding.id,'generic-private');observe('raw_download','complete');
+           observe('raw_binding','start');same(bytes.length,r.value.size_in_bytes);same(sha(bytes),binding.zipSha256);observe('raw_binding','complete');
+           observe('zip_decode','start');const files=decodePrivateZip(bytes);observe('zip_decode','complete');
+           observe('receipt_caps','start');validatePrivateReceiptCaps(files,binding.kind);observe('receipt_caps','complete');
+           const dir=join(process.env.RUNNER_TEMP,fixed[destination]);observe('mkdir','start');await mkdir(dir,{mode:0o700});observe('mkdir','complete');
+           observe('write_files','start');for(const [n,b]of files)await writeFile(join(dir,n),b,{flag:'wx',mode:0o600});observe('write_files','complete');
+           return {binding,metadata:r.value,rawZipBytes:bytes.length,rawZipSha256:sha(bytes)};
           }
           const JOB_CONFIG={positive_prepare:{role:'producer',group:'positive',lane:'positive',kind:'checkpoint',cases:['P1']},positive_consume:{role:'consumer',group:'positive',lane:'positive',kind:'positive-result',cases:['P1']},reduction_prepare:{role:'producer',group:'reduction_a',lane:'reduction',kind:'reduction-checkpoint',cases:['D1','D2','D3','D4']},reduction_consume_a:{role:'consumer',group:'reduction_a',lane:'reduction_a',kind:'reduction-result-a',cases:['D1','D2']},readonly:{role:'consumer',group:'readonly',lane:'readonly',kind:'readonly-result',cases:['R1','R2','R3']},reduction_consume_b:{role:'consumer',group:'reduction_b',lane:'reduction_b',kind:'reduction-result-b',cases:['D3','D4']}};
           export function manifestIdentity(job,kind){const cfg=JOB_CONFIG[job];return {purpose:'afw.fixed-budget-job.syn.v1',repository:CONTEXT.repository,ref:CONTEXT.ref,source:CONTEXT.source,sourceTree:CONTEXT.tree,run:CONTEXT.run,attempt:1,job,role:cfg.role,kind,group:cfg.group,lane:cfg.lane,cases:cfg.cases,commandSucceeded:kind===cfg.kind,jobStarted:1,sealedAt:2,...FLAGS};}
           export function validateInnerManifest(manifest,binding){
            const cfg=JOB_CONFIG[binding.job];need(cfg);fields(manifest,['purpose','repository','ref','source','sourceTree','run','attempt','job','role','kind','group','lane','cases','commandSucceeded','jobStarted','sealedAt',...Object.keys(FLAGS)]);
            const success=binding.kind===cfg.kind;need(success||binding.kind===(cfg.role==='producer'?'producer-failure':'consumer-failure'));const expected=manifestIdentity(binding.job,binding.kind);for(const k of Object.keys(expected).filter(k=>!['jobStarted','sealedAt'].includes(k)))same(manifest[k],expected[k]);need(Number.isSafeInteger(manifest.jobStarted)&&manifest.jobStarted>0&&Number.isSafeInteger(manifest.sealedAt)&&manifest.sealedAt>=manifest.jobStarted);return success;
           }
           export function validateReopenedSuite({proofBytes,originalProofBytes,originalManifestBytes,reopenedManifestBytes,ownBinding,expectedContext,expectedPeers}){
@@ -843,17 +856,17 @@
              reject(()=>A.bindPure({...r,rawZipSha256:'b'.repeat(64)},p.assignment,p.manifestSha256));reject(()=>A.bindPure(r,p.assignment,'b'.repeat(64)));
              const changed=new Map(p.files);changed.set('preflight.json',Buffer.from('{}'));reject(()=>A.bindPure({...r,files:changed},p.assignment,p.manifestSha256));
             });
             await sub('generic_aead_zip3_and_reopened_proof_bytes',async()=>{
              await cryptoControl();const input=proofInput();assert.equal(A.validateReopenedSuite(input).counts.tests,16);
              reject(()=>A.validateReopenedSuite({...input,proofBytes:Buffer.from('{}')}));reject(()=>A.decodePrivateZip(Buffer.from('invalid')));
             });
             await sub('whole_job_outer_receipt_accepts_multiple_synthetic_copies',async()=>{
-             await A.validateSourcePins();assert.equal(A.PINS.worldBlob,'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b');
+             await A.validateSourcePins();assert.equal(A.PINS.worldBlob,'43aad5bddd844d591572c5868b73697dfd3463f9');
              const syntheticCopies=[{fileCount:300,totalBytes:70*1048576},{fileCount:300,totalBytes:70*1048576}],ancillary={fileCount:4,totalBytes:2*1048576};
              const totals=syntheticCopies.reduce((sum,row)=>({fileCount:sum.fileCount+row.fileCount,totalBytes:sum.totalBytes+row.totalBytes}),ancillary);
              assert(totals.fileCount>512&&totals.totalBytes>128*1048576);
              const files=new Map([['receipt.json',Buffer.from(JSON.stringify(totals))]]);
              assert.deepEqual(A.validatePrivateReceiptCaps(files,'reduction-result-b'),totals);
             });
             await sub('whole_job_generic_receipt_boundaries_and_partial_zero',async()=>{
              const files=value=>new Map([['receipt.json',Buffer.from(JSON.stringify(value))]]);
@@ -1340,23 +1353,24 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install the locked fixture dependencies
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-locked-install.log" 2>&1 || { echo locked_install_failed; exit 1; }
       - name: Validate decoded key scope before any orchestration
@@ -1649,22 +1663,24 @@
         shell: bash
         run: |
           test '${{ steps.pure_test.outcome }}' = success
           test '${{ steps.controls.outcome }}' = success
           test '${{ steps.preflight.outputs.all-passed }}' = true
           test '${{ steps.pure_verified.outcome }}' = success
           test '${{ steps.pure_seal.outcome }}' = success
   positive_prepare:
-    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW FRESH WHOLE SYN NATIVE 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
     environment: afw-finite-syn-checkpoint
     outputs:
+      safe-id: ${{ steps.summary_upload.outputs.artifact-id }}
+      safe-digest: ${{ steps.summary_upload.outputs.artifact-digest }}
       artifact-id: ${{ steps.upload.outputs.artifact-id }}
       artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
       kind: ${{ steps.seal.outputs.kind }}
     env:
       AFW_BUDGET_GROUP: positive
       FIXED_ROLE: producer
       FIXED_LANE: positive
       FIXED_CASES: '["P1"]'
@@ -1700,23 +1716,24 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           test "$(node -v)" = v22.23.4
@@ -1857,26 +1874,51 @@
           import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
           import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
           const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
           const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
           const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs'),manifest=JSON.parse(restored),binding={job:e.GITHUB_JOB,kind:e.OWN_KIND,id:e.OWN_ARTIFACT_ID,zipSha256:e.OWN_DIGEST};if(A.validateInnerManifest(manifest,binding))validateFixedBudgetJobManifest(manifest,{job:e.GITHUB_JOB,sourceTree:A.CONTEXT.tree,artifactId:e.OWN_ARTIFACT_ID,digest:e.OWN_DIGEST,context});
           NODE
           printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
           
+      - name: Publish bounded stage observations before original truth assertions
+        id: summary_pair
+        if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
+        env:
+          NATIVE_OUTCOME: ${{ steps.native.outcome }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module <<'NODE_STAGE_PAIR' >"$RUNNER_TEMP/afw-native-private/logs/stage-publication.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,15604);assert.equal(createHash('sha256').update(checked).digest('hex'),'1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedStagePair({context,job:'positive_prepare',rawOutcome:e.NATIVE_OUTCOME});
+          const root=e.RUNNER_TEMP+'/afw-stage-positive_prepare-safe';await mkdir(root,{mode:0o700});for(const [name,bytes]of files)await writeFile(root+'/'+name,bytes,{flag:'wx',mode:0o600});
+          NODE_STAGE_PAIR
+      - name: Upload fixed positive_prepare diagnostic pair only
+        id: summary_upload
+        if: always() && !cancelled() && steps.summary_pair.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-stage-positive_prepare-safe-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-stage-positive_prepare-safe/
+          retention-days: 7
+          if-no-files-found: error
       - name: Preserve actual command and custody outcome
         id: actual_outcome
         if: always() && !cancelled()
         shell: bash
         run: |
           set -euo pipefail
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   positive_consume:
-    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW FRESH WHOLE SYN NATIVE 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts, positive_prepare]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
     environment: afw-finite-syn-checkpoint
     outputs:
       artifact-id: ${{ steps.upload.outputs.artifact-id }}
       artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
       kind: ${{ steps.seal.outputs.kind }}
@@ -1917,23 +1959,24 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           test "$(node -v)" = v22.23.4
@@ -2141,22 +2184,24 @@
         id: actual_outcome
         if: always() && !cancelled()
         shell: bash
         run: |
           set -euo pipefail
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   reduction_prepare:
-    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW FRESH WHOLE SYN NATIVE 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
     environment: afw-finite-syn-checkpoint
     outputs:
+      safe-id: ${{ steps.summary_upload.outputs.artifact-id }}
+      safe-digest: ${{ steps.summary_upload.outputs.artifact-digest }}
       artifact-id: ${{ steps.upload.outputs.artifact-id }}
       artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
       kind: ${{ steps.seal.outputs.kind }}
     env:
       AFW_BUDGET_GROUP: reduction_a
       FIXED_ROLE: producer
       FIXED_LANE: reduction
       FIXED_CASES: '["D1","D2","D3","D4"]'
@@ -2192,23 +2237,24 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           test "$(node -v)" = v22.23.4
@@ -2349,26 +2395,51 @@
           import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
           import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
           const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
           const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
           const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs'),manifest=JSON.parse(restored),binding={job:e.GITHUB_JOB,kind:e.OWN_KIND,id:e.OWN_ARTIFACT_ID,zipSha256:e.OWN_DIGEST};if(A.validateInnerManifest(manifest,binding))validateFixedBudgetJobManifest(manifest,{job:e.GITHUB_JOB,sourceTree:A.CONTEXT.tree,artifactId:e.OWN_ARTIFACT_ID,digest:e.OWN_DIGEST,context});
           NODE
           printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
           
+      - name: Publish bounded stage observations before original truth assertions
+        id: summary_pair
+        if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
+        env:
+          NATIVE_OUTCOME: ${{ steps.native.outcome }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module <<'NODE_STAGE_PAIR' >"$RUNNER_TEMP/afw-native-private/logs/stage-publication.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,15604);assert.equal(createHash('sha256').update(checked).digest('hex'),'1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedStagePair({context,job:'reduction_prepare',rawOutcome:e.NATIVE_OUTCOME});
+          const root=e.RUNNER_TEMP+'/afw-stage-reduction_prepare-safe';await mkdir(root,{mode:0o700});for(const [name,bytes]of files)await writeFile(root+'/'+name,bytes,{flag:'wx',mode:0o600});
+          NODE_STAGE_PAIR
+      - name: Upload fixed reduction_prepare diagnostic pair only
+        id: summary_upload
+        if: always() && !cancelled() && steps.summary_pair.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-stage-reduction_prepare-safe-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-stage-reduction_prepare-safe/
+          retention-days: 7
+          if-no-files-found: error
       - name: Preserve actual command and custody outcome
         id: actual_outcome
         if: always() && !cancelled()
         shell: bash
         run: |
           set -euo pipefail
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   reduction_consume_a:
-    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW FRESH WHOLE SYN NATIVE 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts, reduction_prepare]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
     environment: afw-finite-syn-checkpoint
     outputs:
       artifact-id: ${{ steps.upload.outputs.artifact-id }}
       artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
       kind: ${{ steps.seal.outputs.kind }}
@@ -2409,23 +2480,24 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           test "$(node -v)" = v22.23.4
@@ -2633,22 +2705,24 @@
         id: actual_outcome
         if: always() && !cancelled()
         shell: bash
         run: |
           set -euo pipefail
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   readonly:
-    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW FRESH WHOLE SYN NATIVE 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts]
     runs-on: ubuntu-24.04
     timeout-minutes: 7
     environment: afw-finite-syn-checkpoint
     outputs:
+      safe-id: ${{ steps.summary_upload.outputs.artifact-id }}
+      safe-digest: ${{ steps.summary_upload.outputs.artifact-digest }}
       artifact-id: ${{ steps.upload.outputs.artifact-id }}
       artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
       kind: ${{ steps.seal.outputs.kind }}
     env:
       AFW_BUDGET_GROUP: readonly
       FIXED_ROLE: consumer
       FIXED_LANE: readonly
       FIXED_CASES: '["R1","R2","R3"]'
@@ -2684,23 +2758,24 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           test "$(node -v)" = v22.23.4
@@ -2847,26 +2922,51 @@
           import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
           import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
           const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
           const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
           const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs'),manifest=JSON.parse(restored),binding={job:e.GITHUB_JOB,kind:e.OWN_KIND,id:e.OWN_ARTIFACT_ID,zipSha256:e.OWN_DIGEST};if(A.validateInnerManifest(manifest,binding))validateFixedBudgetJobManifest(manifest,{job:e.GITHUB_JOB,sourceTree:A.CONTEXT.tree,artifactId:e.OWN_ARTIFACT_ID,digest:e.OWN_DIGEST,context});
           NODE
           printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
           
+      - name: Publish bounded stage observations before original truth assertions
+        id: summary_pair
+        if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
+        env:
+          NATIVE_OUTCOME: ${{ steps.native.outcome }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module <<'NODE_STAGE_PAIR' >"$RUNNER_TEMP/afw-native-private/logs/stage-publication.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,15604);assert.equal(createHash('sha256').update(checked).digest('hex'),'1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedStagePair({context,job:'readonly',rawOutcome:e.NATIVE_OUTCOME});
+          const root=e.RUNNER_TEMP+'/afw-stage-readonly-safe';await mkdir(root,{mode:0o700});for(const [name,bytes]of files)await writeFile(root+'/'+name,bytes,{flag:'wx',mode:0o600});
+          NODE_STAGE_PAIR
+      - name: Upload fixed readonly diagnostic pair only
+        id: summary_upload
+        if: always() && !cancelled() && steps.summary_pair.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-stage-readonly-safe-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-stage-readonly-safe/
+          retention-days: 7
+          if-no-files-found: error
       - name: Preserve actual command and custody outcome
         id: actual_outcome
         if: always() && !cancelled()
         shell: bash
         run: |
           set -euo pipefail
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
   reduction_consume_b:
-    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW FRESH WHOLE SYN NATIVE 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts, readonly, reduction_prepare]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
     environment: afw-finite-syn-checkpoint
     outputs:
       artifact-id: ${{ steps.upload.outputs.artifact-id }}
       artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
       kind: ${{ steps.seal.outputs.kind }}
@@ -2909,23 +3009,24 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           test "$(node -v)" = v22.23.4
@@ -3333,17 +3434,17 @@
         run: |
           set -euo pipefail
           test '${{ steps.native.outcome }}' = success
           test '${{ steps.aggregate.outcome }}' = success
           test '${{ steps.own_verified.outcome }}' = success
           test '${{ steps.summary_pair.outputs.status }}' = passed
           test '${{ steps.summary_upload.outcome }}' = success
   verify:
-    if: ${{ always() && github.event_name == 'push' && github.event.head_commit.message == 'AFW FRESH WHOLE SYN NATIVE 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    if: ${{ false && always() && github.event_name == 'push' && github.event.head_commit.message == 'AFW STAGE OBSERVATIONS NATIVE HELD 20261114' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts, positive_prepare, positive_consume, reduction_prepare, reduction_consume_a, readonly, reduction_consume_b]
     runs-on: ubuntu-24.04
     timeout-minutes: 2
     steps:
       - uses: actions/checkout@v4
         with:
           repository: tokenizartinfo-ops/agent-friendly-web
           ref: ${{ github.sha }}
@@ -3359,26 +3460,40 @@
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Verify all seven current direct outputs and the current SAFE pair
         env:
           GH_ARTIFACT_TOKEN: ${{ github.token }}
           AFW_SUITE_NEEDS: ${{ toJSON(needs) }}
         shell: bash
         run: |
           set -euo pipefail
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node "$RUNNER_TEMP/afw-suite-verifier.mjs"
 
+      - name: Project only the three declared diagnostic assignments
+        if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
+        env:
+          AFW_SUITE_NEEDS: ${{ toJSON(needs) }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module <<'NODE_STAGE_ASSIGNMENTS'
+          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,15604);assert.equal(createHash('sha256').update(checked).digest('hex'),'1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          console.log(D.assignmentLine(e.AFW_SUITE_NEEDS));
+          NODE_STAGE_ASSIGNMENTS
```

## Transient zero-key qualification — full changed Q/S/V source

The frozen generic Z13305B/b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d is unchanged/reused, not rewritten/retested. ActualactiveF7e3419cde/54450B/SHAae6754ac… differs from inspectedinactive9eed3689 by only2falseguards removed; allprogrambodies unchanged. Contents/actionsread; qualifier4min,receiver3min; no environment/AFWsecretreferences/World/SDK/Native/AES/provider invocation. FixedcontentsDATA fetch1same-repocandidate367124B; lockednpm no scripts beforeactualparser. Q/S/V follow:

### Q

```javascript
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,mkdtemp,rm} from 'node:fs/promises';
import fsDefault from 'node:fs/promises';
import {join} from 'node:path';
import {syncBuiltinESMExports} from 'node:module';
import {execFileSync,spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import * as S from './afw-stage-receiver.mjs';
const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
const blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
let stage='pins',failedIds=[];
async function main(){
 const e=process.env;assert.equal(process.versions.node,'22.23.4');assert.equal(e.NODE_OPTIONS,undefined);assert.equal(e.GH_ARTIFACT_TOKEN,undefined);assert.equal(e.AFW_SYN_CHECKPOINT_KEY,undefined);assert.deepEqual(process.execArgv,[]);assert.equal(e.GITHUB_JOB,'qualify');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');
 const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);
 const checked={};for(const [key,pin]of Object.entries(S.PINS)){const b=await readFile(pin.path);assert.equal(b.length,pin.bytes);assert.equal(blob(b),pin.blob);assert.equal(S.sha(b),pin.sha256);checked[key]=b;}
 const candidateBytes=await readFile(join(e.RUNNER_TEMP,'afw-stage-integrated-candidate.yml'));assert.equal(candidateBytes.length,S.CANDIDATE.bytes);assert.equal(blob(candidateBytes),S.CANDIDATE.blob);assert.equal(S.sha(candidateBytes),S.CANDIDATE.sha256);assert(candidateBytes.length<=524288);
 const candidate=new TextDecoder('utf-8',{fatal:true}).decode(candidateBytes);assert(Buffer.from(candidate).equals(candidateBytes));
 const programs={};for(const [key,marker]of Object.entries({adapter:'NODE_SUITE_ADAPTER',controls:'NODE_SUITE_CONTROLS',verifier:'NODE_SUITE_VERIFIER',safeZip:'NODE_SAFE_ZIP'})){const open="<<'"+marker+"'\n",parts=candidate.split(open);assert.equal(parts.length,2);const tails=parts[1].split('\n          '+marker+'\n');assert.equal(tails.length,2);const lines=tails[0].split('\n');assert(lines.every(l=>l.startsWith('          ')));programs[key]=Buffer.from(lines.map(l=>l.slice(10)).join('\n')+'\n');assert.equal(programs[key].length,S.PROGRAMS[key].bytes);assert.equal(S.sha(programs[key]),S.PROGRAMS[key].sha256);}
 const P=await import('data:text/javascript;base64,'+checked.helper.toString('base64')),D=await import('data:text/javascript;base64,'+checked.observer.toString('base64'));
 stage='red_tests';
 const redRoot=join(e.RUNNER_TEMP,'afw-stage-task2-red'),fixtures=join(redRoot,'test','fixtures');await mkdir(fixtures,{recursive:true,mode:0o700});
 const url='data:text/javascript;base64,'+checked.observer.toString('base64');
 const stub="export * from "+JSON.stringify(url)+";\nimport * as real from "+JSON.stringify(url)+";\nexport function projectLogText(...args){return {...real.projectLogText(...args),leak:'SECRET_PRIVATE_URL_TOKEN'};}\n";
 await writeFile(join(fixtures,'finite-budget-stage-observer.mjs'),stub,{flag:'wx',mode:0o600});await writeFile(join(fixtures,'finite-budget-failure-diagnostic.mjs'),checked.helper,{flag:'wx',mode:0o600});await writeFile(join(redRoot,'test','finite-budget-stage-observer.test.mjs'),checked.tests,{flag:'wx',mode:0o600});
 const childEnv={...e};delete childEnv.GH_ARTIFACT_TOKEN;delete childEnv.AFW_SYN_CHECKPOINT_KEY;delete childEnv.NODE_OPTIONS;
 const run=(file,real=false)=>{const child=spawnSync(process.execPath,['--test','--test-reporter=tap',file],{env:childEnv,encoding:'utf8',timeout:60000,maxBuffer:1048576});if(real&&typeof child.stdout==='string'){const failed=new Set([...child.stdout.matchAll(/^not ok \d+ - (s\d+_[^\n]+)$/gm)].map(m=>m[1]));failedIds=S.TEST_IDS.filter(id=>failed.has(id));}assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.stderr,'');const v={exit:child.status};for(const k of ['tests','pass','fail','cancelled','skipped','todo']){const m=[...child.stdout.matchAll(new RegExp('^# '+k+' (\\d+)$','gm'))];assert.equal(m.length,1);v[k]=Number(m[0][1]);}assert.deepEqual([...child.stdout.matchAll(/^(?:not )?ok \d+ - (s\d+_[^\n]+)$/gm)].map(m=>m[1]),S.TEST_IDS);return v;};
 const red=run(join(redRoot,'test','finite-budget-stage-observer.test.mjs'));assert.equal(red.exit,1);assert.equal(red.fail,1);assert.equal(red.pass,S.TEST_IDS.length-1);
 stage='green_tests';const green=run(S.PINS.tests.path,true);assert.equal(green.exit,0);assert.equal(green.fail,0);assert.equal(green.pass,S.TEST_IDS.length);
 stage='integration';const integration=[],record=async(id,fn)=>{failedIds=[id];await fn();integration.push({id,status:'passed'});failedIds=[];};
 await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins:{pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},programHashes:Object.fromEntries(Object.entries(S.PROGRAMS).map(([k,v])=>[k,v.sha256]))})+'\n',{flag:'wx',mode:0o600});
 // Import the exact extracted adapter bytes and call its existing assignedPrivate
 // export directly. No export addition or executable source transformation.
 const A=await import('data:text/javascript;base64,'+programs.adapter.toString('base64'));
 await record(S.INTEGRATION_IDS[0],()=>assert.equal(A.validateKeyScopes(candidate),true));
 await record(S.INTEGRATION_IDS[1],()=>assert.equal(A.validateFixedCases(candidate),true));
 await record(S.INTEGRATION_IDS[2],()=>{const token='$'+'{{ '+'se'+'crets.AFW_SYN_CHECKPOINT_KEY '+'}}',needle='          NATIVE_OUTCOME: ';const index=candidate.indexOf(needle);assert(index>=0);const end=candidate.indexOf('\n',index),negative=candidate.slice(0,end)+'\n          DIAG_KEY: '+token+candidate.slice(end);assert.throws(()=>A.validateKeyScopes(negative));});
 const crc32=b=>{let c=0xffffffff;for(const x of b){c^=x;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;}return(c^0xffffffff)>>>0;};
 function zip(receipt={fileCount:1,totalBytes:0}){
  const locals=[],central=[];let offset=0;for(const [name,b]of [['envelope.bin',Buffer.from('INERT_SYN')],['manifest.json',Buffer.from('{}')],['receipt.json',Buffer.from(JSON.stringify(receipt))]]){
   const n=Buffer.from(name),crc=crc32(b),l=Buffer.alloc(30),c=Buffer.alloc(46);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(20,4);l.writeUInt32LE(crc,14);l.writeUInt32LE(b.length,18);l.writeUInt32LE(b.length,22);l.writeUInt16LE(n.length,26);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt32LE(crc,16);c.writeUInt32LE(b.length,20);c.writeUInt32LE(b.length,24);c.writeUInt16LE(n.length,28);c.writeUInt32LE(offset,42);locals.push(l,n,b);central.push(c,n);offset+=l.length+n.length+b.length;
  }const dir=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(3,8);end.writeUInt16LE(3,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...locals,dir,end]);
 }
 async function assigned({job='positive_prepare',destination='own',scenario='success',expectedStage=null,expectedHttp=200}={}){
  const originalTemp=e.RUNNER_TEMP,root=await mkdtemp(join(originalTemp,'afw-stage-synthetic-')),originalFetch=globalThis.fetch,originalLog=console.log,originalWrite=fsDefault.writeFile,sentinel=new Error('owned sentinel');const observations=[];let error=null,result=null;
  const bytes=scenario==='zip_decode'?Buffer.from('invalid SYN ZIP'):zip(scenario==='receipt_caps'?{fileCount:4097,totalBytes:0}:undefined),digest=scenario==='raw_binding'?'a'.repeat(64):A.sha(bytes),kind='checkpoint',binding={job,kind,id:'123',zipSha256:digest};
  const meta={id:123,name:A.artifactName(job),expired:false,digest:'sha256:'+digest,size_in_bytes:bytes.length,expires_at:new Date(Date.now()+60000).toISOString(),workflow_run:{id:Number(context.run),head_sha:context.source,head_branch:'feat/finite-native-cleanup-20261101'}};
  try{
   e.RUNNER_TEMP=root;console.log=scenario==='sink_throw'?()=>{throw sentinel;}:value=>observations.push(value);
   globalThis.fetch=async(url)=>{assert.equal(typeof url,'string');if(url==='https://api.github.com/repos/'+context.repository+'/actions/artifacts/123'){if(scenario==='metadata_decode')return {status:200,json:async()=>{throw sentinel;}};if(scenario==='http')return new Response(null,{status:403});return new Response(JSON.stringify(meta),{status:200,headers:{'content-type':'application/json'}});}assert.equal(url,'https://api.github.com/repos/'+context.repository+'/actions/artifacts/123/zip');if(scenario==='raw_download')throw sentinel;return new Response(bytes,{status:200});};
   if(scenario==='mkdir')await mkdir(join(root,'afw-native-readback'),{mode:0o700});
   if(scenario==='write_files'){fsDefault.writeFile=async(path,...args)=>{if(String(path).startsWith(join(root,'afw-native-readback')+'/'))throw sentinel;return originalWrite(path,...args);};syncBuiltinESMExports();}
   try{result=await A.assignedPrivate(binding,destination);}catch(caught){error=caught;}
   const observed=D.projectLogText(observations.join('\n')+(observations.length?'\n':''),P);
   if(expectedStage!==null){assert(error);assert.equal(result,null);assert.deepEqual(observed.stage,{state:'pending',stage:expectedStage});assert.equal(observed.http,expectedHttp);if(['metadata_decode','raw_download','write_files'].includes(scenario))assert.equal(error,sentinel);}
   else{assert.equal(error,null);assert(result);if(scenario==='sink_throw'||destination!=='own'||!['positive_prepare','reduction_prepare'].includes(job))assert.deepEqual(observations,[]);else{assert.deepEqual(observed.stage,{state:'complete',stage:'write_files'});assert.equal(observed.http,200);assert.equal(observations.length,17);}}
  }finally{e.RUNNER_TEMP=originalTemp;globalThis.fetch=originalFetch;console.log=originalLog;fsDefault.writeFile=originalWrite;syncBuiltinESMExports();assert(root.startsWith(join(originalTemp,'afw-stage-synthetic-')));await rm(root,{recursive:true,force:true});}
 }
 await record(S.INTEGRATION_IDS[3],async()=>{await assigned();await assigned({job:'reduction_prepare'});});
 await record(S.INTEGRATION_IDS[4],()=>assigned({scenario:'metadata_decode',expectedStage:'metadata_get',expectedHttp:null}));
 await record(S.INTEGRATION_IDS[5],()=>assigned({scenario:'http',expectedStage:'metadata_validation',expectedHttp:403}));
 await record(S.INTEGRATION_IDS[6],()=>assigned({scenario:'raw_download',expectedStage:'raw_download'}));
 await record(S.INTEGRATION_IDS[7],()=>assigned({scenario:'raw_binding',expectedStage:'raw_binding'}));
 await record(S.INTEGRATION_IDS[8],()=>assigned({scenario:'zip_decode',expectedStage:'zip_decode'}));
 await record(S.INTEGRATION_IDS[9],()=>assigned({scenario:'receipt_caps',expectedStage:'receipt_caps'}));
 await record(S.INTEGRATION_IDS[10],()=>assigned({scenario:'mkdir',expectedStage:'mkdir'}));
 await record(S.INTEGRATION_IDS[11],()=>assigned({scenario:'write_files',expectedStage:'write_files'}));
 await record(S.INTEGRATION_IDS[12],async()=>{await assigned({destination:'producer'});await assigned({job:'readonly'});await assigned({job:'positive_consume'});});
 await record(S.INTEGRATION_IDS[13],()=>assigned({scenario:'sink_throw'}));
 await record(S.INTEGRATION_IDS[14],()=>{const source=programs.adapter.toString('utf8'),start=source.indexOf('// Fixed reviewed seed field policy.'),end=source.indexOf('export function keyScopeParserProvenance');assert(start>=0&&end>start);assert.equal(S.sha(Buffer.from(source.slice(start,end))),'4ab84021b6fcd0afdeb8b3875fa513b31a78c335c5856c9c3811e71b98fb1b7c');assert.equal(S.sha(programs.verifier),'94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf');assert.equal(S.sha(programs.safeZip),'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');});
 await record(S.INTEGRATION_IDS[15],()=>{assert.equal(A.validateWorkflow(candidate),true);assert.equal([...candidate.matchAll(/^    if: \$\{\{ false &&/gm)].length,8);assert.equal([...candidate.matchAll(/id: summary_pair/g)].length,4);assert.equal([...candidate.matchAll(/id: summary_upload/g)].length,4);assert.equal([...candidate.matchAll(/const diagnosticPins=/g)].length,8);});
 stage='receiver';const receiver=S.runReceiverControls(context);
 stage='pins';for(const [key,pin]of Object.entries(S.PINS)){const b=await readFile(pin.path);assert.equal(S.sha(b),pin.sha256);assert(b.equals(checked[key]));}
 stage='pair';const value={purpose:'afw.sanitized-stage-observations.task2.qualification.syn.v1',role:'independent-zero-afw-key-stage-qualification',context,pins:S.PINS,candidate:S.CANDIDATE,programs:S.PROGRAMS,tests:{red,green},controls:{testIds:S.TEST_IDS,integration,receiver},nonclaims:S.NONCLAIMS},files=S.pair(value);S.validatePair(files,context);
 const output=join(e.RUNNER_TEMP,'afw-stage-task2-SMALLSAFE');await mkdir(output,{mode:0o700});for(const [name,b]of files)await writeFile(join(output,name),b,{flag:'wx',mode:0o600});
 console.log('AFW_STAGE_QUALIFIED/1 '+JSON.stringify({tests:green.tests,redFail:red.fail,integration:integration.length,receiver:receiver.length}));
}
main().catch(()=>{console.error('AFW_STAGE_QUALIFICATION_FAILED/1 '+JSON.stringify({stage,failedIds:failedIds.filter(id=>[...S.TEST_IDS,...S.INTEGRATION_IDS].includes(id))}));process.exitCode=1;});
```

### S

```javascript
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
export const PINS={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"},"tests":{"path":"test/finite-budget-stage-observer.test.mjs","bytes":10425,"sha256":"f206f685401be501cb9320286dea7638baa8d8f2cac5c6f796b5851da073bf8c","blob":"57dfbcfae29c8492acd1767693cc6fccdde45f7e"},"world":{"path":"test/fixtures/finite-budget-world.mjs","bytes":243656,"sha256":"05e50e17420c42f65f8c8c450efc6dd37f9ae429a32a070c9043ab0a50548238","blob":"43aad5bddd844d591572c5868b73697dfd3463f9"}};
export const CANDIDATE={"commit":"2c390b182f6889e79480e7b1618f41af8d1e0d22","tree":"735c681809f4b53e3d8d675ca04b39c441a0e219","blob":"53d9732130e96e75aa5e26038ac8b162c6032b30","bytes":367124,"sha256":"70ebdecad41f59b12f4057aa5607b715e75b1f828c38368c7c960fa1617e0553"};
export const PROGRAMS={"adapter":{"bytes":63917,"sha256":"3c36b155aab486f82fb9b89f55e0b61ffe01be4a7502350391784195e552b6d0"},"controls":{"bytes":63195,"sha256":"1f2d53a7ae00b215634c0d6c9aaa40134e725d561d4334ef827ca54a418df261"},"verifier":{"bytes":15099,"sha256":"94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf"},"safeZip":{"bytes":13305,"sha256":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}};
export const TEST_IDS=Object.freeze(["s01_exact_stage_chain","s02_one_pending_stage","s03_every_pending_stage","s04_no_observations","s05_sequence_gap","s06_duplicate_stage","s07_conflicting_completion","s08_marker_canonical_schema","s09_http_bounded_only","s10_http_conflicts","s11_canonical_failure_only","s12_legacy_system_code","s13_legacy_custody_enum","s14_legacy_assertion","s15_legacy_private_frame_rejected","s16_failure_conflict","s17_no_message_or_path_echo","s18_code_token_not_substring","s19_missing_logs","s20_real_files_and_closed_pair","s21_symlink_file","s22_symlink_parent","s23_hardlink_rejected","s24_file_bound","s25_tail_truncation_and_marker_prefix","s26_malformed_utf8_and_lines","s27_fd_path_race","s28_fd_mutation_race","s29_readonly_aggregate_truth","s30_pair_fail_closed","s31_exact_assignment_projection","s32_assignment_unavailability_no_borrow","s33_production_token_not_inherited"]);
export const INTEGRATION_IDS=Object.freeze(["i01_integrated_key_scope","i02_exact_fixed_cases","i03_diagnostic_key_reference_rejected","i04_actual_assigned_success","i05_metadata_decode_pending","i06_http_status_observation","i07_raw_download_pending","i08_raw_binding_pending","i09_zip_decode_pending","i10_receipt_caps_pending","i11_mkdir_pending","i12_write_files_pending","i13_other_destinations_silent","i14_observation_sink_nonthrowing","i15_frozen_parser_and_programs","i16_eight_job_dag_and_bootstrap"]);
export const RECEIVER_IDS=Object.freeze(["r01_task2_closed_pair","r02_integrated_candidate_pin","r03_current_test_inventory","r04_all_seven_nonclaims","r05_current_context","r06_manifest_byte_binding"]);
export const NONCLAIMS=Object.freeze({historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
export const sha=b=>createHash('sha256').update(b).digest('hex');
export const canonical=v=>Buffer.from(JSON.stringify(v)+'\n');
const same=(a,b)=>assert.deepEqual(a,b,'task2_evidence_rejected');
const fields=(v,k)=>{assert(v&&typeof v==='object'&&!Array.isArray(v));same(Object.keys(v),k);};
const statuses=ids=>ids.map(id=>({id,status:'passed'}));
export function validateContext(v){fields(v,['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node']);same(v.repository,'tokenizartinfo-ops/agent-friendly-web');same(v.repositoryId,'1347578006');same(v.ref,'refs/heads/feat/finite-native-cleanup-20261101');for(const k of ['source','tree','workflowBlob'])assert.match(v[k],/^[a-f0-9]{40}$/);assert.match(v.run,/^[1-9][0-9]*$/);same(v.attempt,1);same(v.node,'22.23.4');}
function counts(v,red){fields(v,['exit','tests','pass','fail','cancelled','skipped','todo']);for(const n of Object.values(v))assert(Number.isSafeInteger(n)&&n>=0);same(v.tests,TEST_IDS.length);same(v.pass+v.fail,v.tests);for(const k of ['cancelled','skipped','todo'])same(v[k],0);same(v.exit,red?1:0);if(red){assert(v.fail>0&&v.pass>0);}else{same(v.fail,0);same(v.pass,v.tests);}}
function result(v,context){fields(v,['purpose','role','context','pins','candidate','programs','tests','controls','nonclaims']);same(v.purpose,'afw.sanitized-stage-observations.task2.qualification.syn.v1');same(v.role,'independent-zero-afw-key-stage-qualification');validateContext(v.context);same(v.context,context);same(v.pins,PINS);same(v.candidate,CANDIDATE);same(v.programs,PROGRAMS);fields(v.tests,['red','green']);counts(v.tests.red,true);counts(v.tests.green,false);fields(v.controls,['testIds','integration','receiver']);same(v.controls.testIds,TEST_IDS);same(v.controls.integration,statuses(INTEGRATION_IDS));same(v.controls.receiver,statuses(RECEIVER_IDS));same(v.nonclaims,NONCLAIMS);}
function parse(b){assert(Buffer.isBuffer(b)&&b.length>0&&b.length<=65536);const s=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(s);assert(canonical(v).equals(b));return v;}
export function pair(v){const b=canonical(v);return new Map([['result.json',b],['manifest.json',canonical({purpose:'afw.sanitized-stage-observations.task2.manifest.syn.v1',context:v.context,files:[{path:'result.json',bytes:b.length,sha256:sha(b)}]})]]);}
export function validatePair(files,context){validateContext(context);assert(files instanceof Map);same([...files.keys()].sort(),['manifest.json','result.json']);assert([...files.values()].reduce((n,b)=>n+b.length,0)<=65536);const v=parse(files.get('result.json')),m=parse(files.get('manifest.json'));result(v,context);fields(m,['purpose','context','files']);same(m.purpose,'afw.sanitized-stage-observations.task2.manifest.syn.v1');same(m.context,context);same(m.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return v;}
export function runReceiverControls(context){
 const out=[],record=(id,fn)=>{fn();out.push({id,status:'passed'});},clone=v=>JSON.parse(JSON.stringify(v));
 const fixture={purpose:'afw.sanitized-stage-observations.task2.qualification.syn.v1',role:'independent-zero-afw-key-stage-qualification',context,pins:PINS,candidate:CANDIDATE,programs:PROGRAMS,tests:{red:{exit:1,tests:TEST_IDS.length,pass:TEST_IDS.length-1,fail:1,cancelled:0,skipped:0,todo:0},green:{exit:0,tests:TEST_IDS.length,pass:TEST_IDS.length,fail:0,cancelled:0,skipped:0,todo:0}},controls:{testIds:TEST_IDS,integration:statuses(INTEGRATION_IDS),receiver:statuses(RECEIVER_IDS)},nonclaims:NONCLAIMS};
 const reject=mutate=>{const v=clone(fixture);mutate(v);assert.throws(()=>validatePair(pair(v),context));};
 record(RECEIVER_IDS[0],()=>{same(validatePair(pair(fixture),context),fixture);const f=pair(fixture);f.set('result.json',Buffer.from(JSON.stringify(fixture,null,2)+'\n'));assert.throws(()=>validatePair(f,context));});
 record(RECEIVER_IDS[1],()=>reject(v=>{v.candidate.blob='a'.repeat(40);}));
 record(RECEIVER_IDS[2],()=>{reject(v=>{v.controls.testIds.push('unknown');});reject(v=>{v.tests.green.fail=1;v.tests.green.pass--;});});
 record(RECEIVER_IDS[3],()=>reject(v=>{v.nonclaims.receiptAuthenticated=true;}));
 record(RECEIVER_IDS[4],()=>reject(v=>{v.context.run=context.run==='1'?'2':'1';}));
 record(RECEIVER_IDS[5],()=>{const f=pair(fixture),m=JSON.parse(f.get('manifest.json'));m.files[0].bytes++;f.set('manifest.json',canonical(m));assert.throws(()=>validatePair(f,context));});
 return out;
}
```

### V

```javascript
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import * as S from './afw-stage-receiver.mjs';
import * as Z from './afw-suite-safe-zip.mjs';

const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
async function main(){
 const env=process.env;assert.equal(process.versions.node,'22.23.4');assert.equal(env.NODE_OPTIONS,undefined);assert.equal(env.GITHUB_JOB,'verify');assert.equal(env.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(env.GITHUB_RUN_ATTEMPT,'1');
 const context={repository:env.GITHUB_REPOSITORY,repositoryId:env.GITHUB_REPOSITORY_ID,ref:env.GITHUB_REF,source:env.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:env.GITHUB_RUN_ID,attempt:Number(env.GITHUB_RUN_ATTEMPT),node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);assert.equal(env.QUALIFY_RESULT,'success');
 for(const pin of Object.values(S.PINS)){const bytes=await readFile(pin.path);assert.equal(bytes.length,pin.bytes);assert.equal(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),pin.blob);assert.equal(S.sha(bytes),pin.sha256);}
 
 const id=env.QUALIFY_ARTIFACT_ID,digest=env.QUALIFY_ARTIFACT_DIGEST,token=env.GH_ARTIFACT_TOKEN;assert.match(id,/^[1-9][0-9]*$/);assert.match(digest,/^[a-f0-9]{64}$/);assert(typeof token==='string'&&token.length>0);
 async function json(path){const response=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web'+path,{redirect:'error',headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});assert.equal(response.status,200);assert(response.body);const parts=[],reader=response.body.getReader();let size=0;try{for(;;){const item=await reader.read();if(item.done)break;size+=item.value.byteLength;assert(size<=65536);parts.push(Buffer.from(item.value));}}catch(error){try{await reader.cancel();}catch{}throw error;}return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(parts)));}
 const run=await json('/actions/runs/'+context.run);assert.equal(run.id,Number(context.run));assert.equal(run.run_attempt,1);assert.equal(run.head_sha,context.source);assert.equal(run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(run.event,env.GITHUB_EVENT_NAME);assert.equal(run.path,'.github/workflows/afw-finite-budget-qualification.yml');assert.equal(run.repository.id,1347578006);assert.equal(run.head_repository.id,1347578006);
 const metadata=await json('/actions/artifacts/'+id),name='stage-task2-SMALLSAFE-'+context.source+'-'+context.run;
 assert.equal(metadata.id,Number(id));assert.equal(metadata.name,name);assert.equal(metadata.expired,false);assert.equal(metadata.digest,'sha256:'+digest);assert(Number.isSafeInteger(metadata.size_in_bytes)&&metadata.size_in_bytes>0&&metadata.size_in_bytes<=65536);
 assert.equal(metadata.workflow_run.id,Number(context.run));assert.equal(metadata.workflow_run.repository_id,1347578006);assert.equal(metadata.workflow_run.head_repository_id,1347578006);assert.equal(metadata.workflow_run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(metadata.workflow_run.head_sha,context.source);
 const created=Date.parse(metadata.created_at),expires=Date.parse(metadata.expires_at);assert(Number.isFinite(created)&&Number.isFinite(expires)&&created<=Date.now()+60000&&expires>Date.now()&&expires-created<=604860000);
 const bytes=await Z.downloadAssignedZip(id,token);assert(bytes.length<=65536);const rawSha=Z.bindRawZip(bytes,metadata.size_in_bytes,digest,metadata.digest),files=Z.decodeSafePair(bytes),value=S.validatePair(files,context);
 
 console.log('AFW_STAGE_SMALLSAFE/1 '+JSON.stringify({context,artifactId:id,uploadedDigest:digest,metadataSize:metadata.size_in_bytes,rawBytes:bytes.length,rawSha256:rawSha,resultBytes:files.get('result.json').length,resultSha256:S.sha(files.get('result.json')),manifestBytes:files.get('manifest.json').length,manifestSha256:S.sha(files.get('manifest.json')),tests:value.tests,candidate:value.candidate,programs:value.programs,integrationControls:value.controls.integration.length,receiverControls:value.controls.receiver.length,nonclaims:S.NONCLAIMS}));
}
main().catch(()=>{console.error('AFW_STAGE_RECEIVER_FAILED/1');process.exitCode=1;});
```

## Qualification wrapper operations checked by Root

Twojobs exactrepo/id/ref/attempt1/push/workflow/workflow_ref/message guards; shellsamechecks+NODE_OPTIONS/AFWkeyabsence; checkout exactsha,persistcredentialsfalse; Node22.23.4; hashgates Q/S/V/Z beforeimport. Fixedcandidatecontentsread withgithub.token occurs in its OWN step and verifies response bounds750000/UTF8/size/blob/SHA/base64canonical, no redirect. Only result+manifest upload path,retention7/compression0/nooverwrite. verify usescurrentassignedqualifyoutputs, reruns hashgates, V currentrun/metadata/strictZIP checks. See exactimmutable activeF7 for any named wrapper-risk outside diff; no otherSource changes. This is one taskreview; Task3 held, finalwholeplanreview later.
