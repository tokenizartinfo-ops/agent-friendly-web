# Scoped Task1 fix1 review package

AFW ONLY. Read-only re-review of CP-I1 and CP-I2 and NEW breakage in fixdiff only; no subagents, Sourceexecution, tests, localSourcefiles/clones, private/purearchives or historicalprivatelogs, mutations/CF/key/Native/SDK/World/MF. Both earlierfindings Important; no new originaloutsidefindingsextendthisloop. Rootmayledgerout-of-scope forlaterwholeunitreview.

Brief docs/superpowers/briefs/2026-11-13-custody-postmortem-fix1.md; bindingSPEC docs/superpowers/specs/2026-11-13-custody-postmortem-design.md (13targetfield clarification/fixedfailurepayload). Report is appended to SAME docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md; completeNEWappend below. Priorhead reviewed dcd70e8905cc42beb03c871d00a95e0479c6292c restoredF7, oldtemporarycode0e0c434146ad12caf703c34c114a17120d725d31 (actualguardvariantdfd37). Fixinactiveabb416f684a6d8e310876435566325e03fa53291, actualb1f124c69344df7d2abe79e573583f23205fe24e. Thispackage includes ENTIRE scoped5hunk38628char temporarycodepatch0e0→abb (fullcontext12), complete2hunkactiveguardpatch, fullreportappend, independentrun/SAFE/marker/closure observations. No need rereadunchanged5bodies/fulloldNativecode.

## Findings under verification
- CP-I1: postmortem_error_redaction asserts Object.keys(r).length===14 while TARGET_KEYS/blank and explicit schema contain13; callback necessarilyfailsif reached. Replaceincorrectcount withactualclosed13-keyschemavalidation, retainmissing/extra rejection, noinventfield orfirsthistoricalcauseclaim.
- CP-I2: checks.error.controlGroup / originalZIPerror.results fixedinventories are discarded by producer barecatch/stderr suppression; emit only boundedvalidatedfixedgroup/ID/status/counters inventory atactualproducer/receivercontrolseams whilekeepingproducerunsuccessful, targetreadsblocked andSAFEnotpublishedoncontrolfailure. No arbitraryerrorvalues.

## Complete scoped inactive-code diff (roundtripped)
```diff
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -450,24 +450,51 @@
           export function makeManifest(resultBytes,observer){
            validateContext(observer);need(Buffer.isBuffer(resultBytes)&&resultBytes.length>0&&resultBytes.length<=65536);return {purpose:'afw.custody-postmortem-manifest.safe.v1',source:observer.source,run:observer.run,attempt:1,files:[{path:'result.json',bytes:resultBytes.length,sha256:A.sha(resultBytes)}]};
           }
           NODE_POSTMORTEM_INSPECTOR
           cat >"$RUNNER_TEMP/afw-postmortem-controls.mjs" <<'NODE_POSTMORTEM_CONTROLS'
           import assert from 'node:assert/strict';
           import * as A from './afw-postmortem-adapter.mjs';
           import * as I from './afw-postmortem-inspector.mjs';
           import * as R from './afw-postmortem-receiver.mjs';
           import * as Z from './afw-postmortem-safe-zip.mjs';
           export const DIAGNOSTIC_IDS=Object.freeze(['postmortem_original_prefix_binding','postmortem_subject_observer_separation','postmortem_original_receipt_cap_boundaries','postmortem_stage_sequence','postmortem_metadata_failure_blocks_archive','postmortem_target_null_and_cap_coherence','postmortem_error_redaction']);
           export const RECEIVER_IDS=Object.freeze(['postmortem_pair_schema_manifest_binding','postmortem_route_direct_output_binding']);
+          export const CONTROL_FAILURE_PREFIX='AFW_CUSTODY_POSTMORTEM_CONTROL_FAILURE/1';
+          const FAILURE_GROUP_IDS=Object.freeze({diagnostic:DIAGNOSTIC_IDS,zip:Z.ZIP_CONTROL_IDS,receiver:RECEIVER_IDS});
+          export function normalizeControlFailure(name,error){
+           try{
+            assert.equal(typeof name,'string');assert(Object.hasOwn(FAILURE_GROUP_IDS,name));const ids=FAILURE_GROUP_IDS[name];assert(error&&typeof error==='object'&&!Array.isArray(error));
+            const fullSlot=Object.getOwnPropertyDescriptor(error,'controlGroup'),prefixSlot=Object.getOwnPropertyDescriptor(error,'results');assert(Boolean(fullSlot)!==Boolean(prefixSlot));let input,full=null;
+            if(fullSlot){assert(Object.hasOwn(fullSlot,'value'));full=fullSlot.value;A.fields(full,['expected','completed','passed','failed','inventory']);input=full.inventory;assert(Array.isArray(input)&&input.length===ids.length);}
+            else{assert.equal(name,'zip');assert(Object.hasOwn(prefixSlot,'value'));input=prefixSlot.value;assert(Array.isArray(input)&&input.length>=1&&input.length<=ids.length);}
+            assert.deepEqual(Object.keys(input),Array.from({length:input.length},(_,n)=>String(n)));
+            let failedAt=-1;
+            for(let n=0;n<input.length;n++){const row=input[n];A.fields(row,['id','status']);assert.equal(row.id,ids[n]);assert(['passed','failed','not_executed'].includes(row.status));if(row.status==='failed'){assert.equal(failedAt,-1);failedAt=n;}}
+            assert(failedAt>=0);if(!full)assert.equal(failedAt,input.length-1);
+            const inventory=ids.map((id,n)=>({id,status:n<failedAt?'passed':n===failedAt?'failed':'not_executed'}));
+            for(let n=0;n<input.length;n++)assert.equal(input[n].status,inventory[n].status);
+            const counters={expected:ids.length,completed:failedAt+1,passed:failedAt,failed:1};
+            if(full)for(const [k,v]of Object.entries(counters)){assert(Number.isSafeInteger(full[k]));assert.equal(full[k],v);}
+            const summary={group:name,...counters,inventory,historicalCauseProven:false,receiptAuthenticated:false,...I.FLAGS};A.fields(summary,['group','expected','completed','passed','failed','inventory','historicalCauseProven','receiptAuthenticated',...Object.keys(I.FLAGS)]);assert(Buffer.byteLength(CONTROL_FAILURE_PREFIX+' '+JSON.stringify(summary))<=4096);return summary;
+           }catch{return null;}
+          }
+          export async function invokeControlGroup(name,callback,emit=()=>{}){
+           if(typeof name!=='string'||!Object.hasOwn(FAILURE_GROUP_IDS,name)||typeof callback!=='function'||typeof emit!=='function')throw new Error('postmortem_controls_failed');
+           try{return await callback();}
+           catch(error){
+            const summary=normalizeControlFailure(name,error);if(summary){const line=CONTROL_FAILURE_PREFIX+' '+JSON.stringify(summary);try{emit(line);}catch{}}
+            throw new Error('postmortem_controls_failed');
+           }
+          }
           function crc(bytes){let c=0xffffffff;for(const b of bytes){c^=b;for(let j=0;j<8;j++)c=c&1?0xedb88320^(c>>>1):c>>>1;}return(c^0xffffffff)>>>0;}
           function fixtureZip(files){
            const chunks=[],rows=[];let offset=0;
            for(const[name,value]of files){const n=Buffer.from(name),l=Buffer.alloc(30),c=Buffer.alloc(46),sum=crc(value);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(20,4);l.writeUInt32LE(sum,14);l.writeUInt32LE(value.length,18);l.writeUInt32LE(value.length,22);l.writeUInt16LE(n.length,26);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt32LE(sum,16);c.writeUInt32LE(value.length,20);c.writeUInt32LE(value.length,24);c.writeUInt16LE(n.length,28);c.writeUInt32LE(offset,42);chunks.push(l,n,value);rows.push(c,n);offset+=l.length+n.length+value.length;}
            const dir=Buffer.concat(rows),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(files.size,8);end.writeUInt16LE(files.size,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...chunks,dir,end]);
           }
           function receipt(fileCount=512,totalBytes=134217728){return Buffer.from(JSON.stringify({fileCount,totalBytes}));}
           function privateFixture(body=receipt()){
            return fixtureZip(new Map([['envelope.bin',Buffer.from('INERT_NOT_A_CIPHER')],['manifest.json',Buffer.from('{}')],['receipt.json',body]]));
           }
           function historicalMeta(t){return {id:Number(t.artifactId),name:t.name,expired:false,digest:'sha256:'+t.expectedSha256,size_in_bytes:t.expectedBytes,expires_at:t.expiresAt,workflow_run:{id:Number(I.SUBJECT.run),head_sha:I.SUBJECT.source,head_branch:I.SUBJECT.ref.slice(11),repository_id:1347578006,head_repository_id:1347578006}};}
           function targetFixture(body=receipt()){
@@ -502,25 +529,66 @@
              const cases=[
               ['metadata_http',{metadata:async()=>({status:503,value:null})}],
               ['metadata_binding',{metadata:async()=>({status:200,value:{...ok.meta,name:'inert-wrong'}})}],
               ['raw_download',{raw:async()=>{throw Error('inert network');}}],
               ['raw_size',{raw:async()=>Buffer.alloc(2)}],
               ['raw_digest',{raw:async()=>{const b=Buffer.from(ok.bytes);b[0]^=1;return b;}}]
              ];for(const [stage,patch]of cases)assert.equal((await I.inspectTarget(ok.target,inertIO(ok,patch))).stage,stage);
              const broken={...ok,bytes:Buffer.alloc(ok.bytes.length)};broken.target={...ok.target,expectedSha256:A.sha(broken.bytes)};broken.meta=historicalMeta(broken.target);assert.equal((await I.inspectTarget(broken.target,inertIO(broken))).stage,'zip_decode');
              for(const [body,stage]of [[Buffer.from('{"fileCount":1,"fileCount":2,"totalBytes":3}'),'receipt_json'],[Buffer.from('{"fileCount":1,"totalBytes":3}\n'),'receipt_json'],[Buffer.from([255]),'receipt_json'],[receipt(0,1),'receipt_counts'],[receipt(1,536870913),'receipt_counts']]){const f=targetFixture(body);assert.equal((await I.inspectTarget(f.target,inertIO(f))).stage,stage);}
             },
             async()=>{const f=targetFixture();for(const change of [m=>{m.size_in_bytes++;},m=>{m.expires_at='2099-01-01T00:00:00Z';},m=>{m.workflow_run.repository_id=1;},m=>{m.workflow_run.head_repository_id=1;},m=>{m.digest='sha256:'+'0'.repeat(64);}]){let archiveCalls=0;const meta=structuredClone(f.meta);change(meta);const r=await I.inspectTarget(f.target,inertIO(f,{metadata:async()=>({status:200,value:meta}),raw:async()=>{archiveCalls++;return f.bytes;}}));assert.equal(r.stage,'metadata_binding');assert.equal(archiveCalls,0);}},
             ()=>{const t=completeTarget(I.TARGETS[0]);I.validateTargetRecord(t,I.TARGETS[0]);for(const change of [x=>{x.fileCount=null;},x=>{x.successReceiptCapAccepted=false;},x=>{x.rawVerified=false;},x=>{x.fileCount='512';},x=>{x.totalBytes=536870913;},x=>{x.extra=true;}]){const x=structuredClone(t);change(x);assert.throws(()=>I.validateTargetRecord(x,I.TARGETS[0]));}const rejected={...t,stage:'receipt_caps',outcome:'rejected',fileCount:513,successReceiptCapAccepted:false};I.validateTargetRecord(rejected,I.TARGETS[0]);assert.throws(()=>I.validateTargetRecord({...rejected,fileCount:1},I.TARGETS[0]));},
-            async()=>{const f=targetFixture();for(const seam of ['metadata','raw']){const text='PRIVATE_ERROR_DO_NOT_PRINT';const r=await I.inspectTarget(f.target,inertIO(f,{[seam]:async()=>{throw Error(text);}}));assert(!JSON.stringify(r).includes(text));assert.equal(r.outcome,'unavailable');assert.equal(r.stage,seam==='metadata'?'metadata_http':'raw_download');assert.equal(Object.keys(r).length,14);}}
+            async()=>{
+             const f=targetFixture();for(const seam of ['metadata','raw']){const text='PRIVATE_ERROR_DO_NOT_PRINT';const r=await I.inspectTarget(f.target,inertIO(f,{[seam]:async()=>{throw Error(text);}}));assert(!JSON.stringify(r).includes(text));assert.equal(r.outcome,'unavailable');assert.equal(r.stage,seam==='metadata'?'metadata_http':'raw_download');I.validateTargetRecord(r,f.target);const extra={...r,extra:true};assert.throws(()=>I.validateTargetRecord(extra,f.target));const missing={...r};delete missing.fileCount;assert.throws(()=>I.validateTargetRecord(missing,f.target));}
+             const idsByGroup={diagnostic:DIAGNOSTIC_IDS,zip:Z.ZIP_CONTROL_IDS,receiver:RECEIVER_IDS},flags=['historicalCauseProven','receiptAuthenticated',...Object.keys(I.FLAGS)];
+             const failureGroup=(ids,index)=>group(ids,ids.map((id,n)=>({id,status:n<index?'passed':n===index?'failed':'not_executed'})));
+             const exercise=async(name,error,shouldEmit)=>{
+              const lines=[];await assert.rejects(()=>invokeControlGroup(name,async()=>{throw error;},line=>lines.push(line)),e=>e instanceof Error&&e.message==='postmortem_controls_failed'&&!Object.hasOwn(e,'controlGroup')&&!Object.hasOwn(e,'results'));
+              assert.equal(lines.length,shouldEmit?1:0);if(!shouldEmit)return null;const line=lines[0];assert(line.startsWith(CONTROL_FAILURE_PREFIX+' '));assert(Buffer.byteLength(line)<=4096);assert(!line.includes('PRIVATE_ERROR_DO_NOT_PRINT'));const summary=JSON.parse(line.slice(CONTROL_FAILURE_PREFIX.length+1));A.fields(summary,['group','expected','completed','passed','failed','inventory',...flags]);assert.equal(summary.group,name);assert.equal(summary.expected,idsByGroup[name].length);assert.equal(summary.failed,1);assert.equal(summary.completed,summary.passed+1);for(const k of flags)assert.equal(summary[k],false);assert.deepEqual(summary,normalizeControlFailure(name,error));return summary;
+             };
+             for(const [name,ids]of Object.entries(idsByGroup)){
+              for(const index of [...new Set([0,Math.floor(ids.length/2),ids.length-1])]){
+               const full=failureGroup(ids,index),error=Object.assign(new Error('PRIVATE_ERROR_DO_NOT_PRINT'),{controlGroup:full}),summary=await exercise(name,error,true);assert.deepEqual(summary.inventory,full.inventory);assert.equal(summary.completed,index+1);assert.equal(summary.passed,index);
+               if(name==='zip'){const prefix=Object.assign(new Error('PRIVATE_ERROR_DO_NOT_PRINT'),{results:full.inventory.slice(0,index+1)}),normalized=await exercise(name,prefix,true);assert.deepEqual(normalized,summary);}
+              }
+              const good=failureGroup(ids,0),mutations=[
+               x=>{x.inventory[0].id='PRIVATE_ERROR_DO_NOT_PRINT';},
+               x=>{[x.inventory[0],x.inventory[1]]=[x.inventory[1],x.inventory[0]];},
+               x=>{x.inventory[0].status='PRIVATE_ERROR_DO_NOT_PRINT';},
+               x=>{x.completed++;},
+               x=>{x.passed++;},
+               x=>{x.failed=0;},
+               x=>{x.expected=String(ids.length);},
+               x=>{x.expected++;},
+               x=>{x.inventory=null;},
+               x=>{x.inventory.pop();},
+               x=>{x.inventory[1].status='failed';},
+               x=>{x.inventory[1].status='passed';},
+               x=>{x.inventory[0].status='not_executed';},
+               x=>{x.inventory[0].extra='PRIVATE_ERROR_DO_NOT_PRINT';},
+               x=>{x.extra='PRIVATE_ERROR_DO_NOT_PRINT';},
+               x=>{delete x.passed;}
+              ];
+              for(const mutate of mutations){const malformed=structuredClone(good);mutate(malformed);await exercise(name,Object.assign(new Error('PRIVATE_ERROR_DO_NOT_PRINT'),{controlGroup:malformed}),false);}
+              await exercise(name,new Error('PRIVATE_ERROR_DO_NOT_PRINT'),false);
+              let getterCalls=0;const accessor=new Error('PRIVATE_ERROR_DO_NOT_PRINT');Object.defineProperty(accessor,'controlGroup',{get(){getterCalls++;throw Error('PRIVATE_ERROR_DO_NOT_PRINT');}});await exercise(name,accessor,false);assert.equal(getterCalls,0);
+              await exercise(name,{controlGroup:good,results:good.inventory.slice(0,1)},false);
+              if(name!=='zip')await exercise(name,{results:good.inventory.slice(0,1)},false);
+              const lines=[];assert.equal(await invokeControlGroup(name,async()=>123,line=>lines.push(line)),123);assert.deepEqual(lines,[]);
+             }
+             const zipFull=failureGroup(Z.ZIP_CONTROL_IDS,1),zipPrefix=zipFull.inventory.slice(0,2);
+             for(const mutate of [x=>{x[0].id='unknown';},x=>{x.reverse();},x=>{x[1].status='passed';},x=>{x[0].status='failed';},x=>{x[1].extra='PRIVATE_ERROR_DO_NOT_PRINT';},x=>{x.length=0;},x=>{x.push({id:Z.ZIP_CONTROL_IDS[2],status:'not_executed'});}]){const rows=structuredClone(zipPrefix);mutate(rows);await exercise('zip',{results:rows},false);}
+             await exercise('unknown',{controlGroup:failureGroup(DIAGNOSTIC_IDS,0)},false);
+            }
            ]);
           }
           export async function runReceiverControls(){
            return checks(RECEIVER_IDS,[
             ()=>{
              const {expected,result,files}=pairFixture();assert.deepEqual(R.validatePostmortemPair(files,expected),result);
              const mutate=change=>{const r=structuredClone(result);change(r);const rb=I.canonical(r),m=I.makeManifest(rb,expected.observer);assert.throws(()=>R.validatePostmortemPair(new Map([['result.json',rb],['manifest.json',I.canonical(m)]]),expected));};
              for(const change of [x=>{x.observer.source=I.SUBJECT.source;},x=>{x.targets[0].artifactId='999';},x=>{x.targets[0].fileCount='512';},x=>{x.targets[0].fileCount=null;},x=>{x.targets[0].successReceiptCapAccepted=null;},x=>{x.extra=true;},x=>{x.PCoff=true;},x=>{x.controls.zip.expected=16;}])mutate(change);
              const bad=JSON.parse(files.get('manifest.json'));bad.files[0].sha256='0'.repeat(64);assert.throws(()=>R.validatePostmortemPair(new Map([['result.json',files.get('result.json')],['manifest.json',I.canonical(bad)]]),expected));assert.throws(()=>R.validatePostmortemPair(new Map([['result.json',files.get('result.json')]]),expected));
             },
             async()=>{
              const p=pairFixture(),bytes=fixtureZip(p.files),id='123',digest=A.sha(bytes),meta=currentMeta(p.expected,id,digest,bytes.length),good={custody_inspect:{result:'success',outputs:{'safe-id':id,'safe-digest':digest}}};let downloads=0;
@@ -529,26 +597,26 @@
              assert.equal(await unavailable({},'invalid_evidence'),0);
              assert.equal(await unavailable({custody_inspect:{result:'failure',outputs:{}}},'needs_unsuccessful'),0);
              assert.equal(await unavailable({custody_inspect:{result:'success',outputs:{}}},'publication_unavailable'),0);
              assert.equal(await unavailable({custody_inspect:{result:'success',outputs:{'safe-id':id}}},'invalid_evidence'),0);
              assert.equal(await unavailable(good,'publication_unavailable',{metadata:async()=>({status:404,value:null})}),0);
              for(const bad of [{...meta,name:'afw-custody-postmortem-safe-'+I.SUBJECT.run+'-1'},{...meta,digest:'sha256:'+'0'.repeat(64)},{...meta,workflow_run:{...meta.workflow_run,head_sha:I.SUBJECT.source}}])assert.equal(await unavailable(good,'invalid_evidence',{metadata:async()=>({status:200,value:bad})}),0);
              await unavailable(good,'invalid_evidence',{raw:async()=>{const b=Buffer.from(bytes);b[0]^=1;return b;}});
              const corrupt=new Map(p.files);corrupt.set('manifest.json',Buffer.from('{}\n'));const badBytes=fixtureZip(corrupt),badDigest=A.sha(badBytes);await unavailable({custody_inspect:{result:'success',outputs:{'safe-id':id,'safe-digest':badDigest}}},'invalid_evidence',{metadata:async()=>({status:200,value:currentMeta(p.expected,id,badDigest,badBytes.length)}),raw:async()=>badBytes});
              const m=await R.verifyPostmortemRoute(good,null,io);assert.equal(m.reason,'observer_unavailable');
             }
            ]);
           }
-          export async function runAllControls(expected,provenance){
-           A.requireKeyless();const diagnostic=await runDiagnosticControls(expected,provenance);A.requireKeyless();const zipInventory=await Z.runZipControls();const zip=group(Z.ZIP_CONTROL_IDS,zipInventory);A.requireKeyless();const receiver=await runReceiverControls();return {diagnostic,zip,receiver};
+          export async function runAllControls(expected,provenance,emit=()=>{}){
+           A.requireKeyless();const diagnostic=await invokeControlGroup('diagnostic',()=>runDiagnosticControls(expected,provenance),emit);A.requireKeyless();const zipInventory=await invokeControlGroup('zip',()=>Z.runZipControls(),emit);const zip=group(Z.ZIP_CONTROL_IDS,zipInventory);A.requireKeyless();const receiver=await invokeControlGroup('receiver',()=>runReceiverControls(),emit);return {diagnostic,zip,receiver};
           }
           NODE_POSTMORTEM_CONTROLS
           cat >"$RUNNER_TEMP/afw-postmortem-safe-zip.mjs" <<'NODE_SAFE_ZIP'
           import assert from 'node:assert/strict';
           import {createHash} from 'node:crypto';
           import {inflateRawSync,deflateRawSync} from 'node:zlib';
           export class SafeZipRejected extends Error{constructor(reason){super(reason);this.reason=reason;}}
           const Rejected=SafeZipRejected,need=(ok,reason)=>{if(!ok)throw new SafeZipRejected(reason);},NAMES=['result.json','manifest.json'],CAPS={'result.json':65536,'manifest.json':65536};
           const utf8=b=>{const s=new TextDecoder('utf-8',{fatal:true}).decode(b);need(Buffer.from(s).equals(b),'zip_utf8');return s;};
           export const zipSha=b=>createHash('sha256').update(b).digest('hex');
           export function bindRawZip(bytes,size,uploaded,metadataDigest){
            need(Buffer.isBuffer(bytes)&&Number.isSafeInteger(size)&&size>0&&size<=131072&&bytes.length===size,'zip_binding_size');
@@ -716,47 +784,47 @@
           import {join} from 'node:path';
           import {pathToFileURL} from 'node:url';
           import {createHash} from 'node:crypto';
           import {execFileSync} from 'node:child_process';
           async function bootstrap(){
            const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml';
            const keyless=()=>assert.equal(e.AFW_SYN_CHECKPOINT_KEY,undefined,'postmortem_key_present');
            keyless();assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(e.GITHUB_EVENT_NAME,'push');assert.equal(process.versions.node,'22.23.4');assert(/^[a-f0-9]{40}$/.test(e.GITHUB_SHA));assert(/^[1-9][0-9]*$/.test(e.GITHUB_RUN_ID)&&Number.isSafeInteger(Number(e.GITHUB_RUN_ID))&&String(Number(e.GITHUB_RUN_ID))===e.GITHUB_RUN_ID);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
            const git=(...a)=>execFileSync('git',a,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
            assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path],{stdio:['ignore','pipe','pipe']}).equals(bytes));
            const sourcePins={"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
            for(const [k,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[k]);assert.equal(blob(await readFile(p)),sourcePins[k]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
-           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"e724c18928f7fe21791165086d840333b0a1544109b8041b26966b801bbbcc3f","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},programHashes={},programs={},provenance={},lines=source.split('\n');
+           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"b902864ec21f0d2eeb5b555f6988f3991646fc54e3ffd3a1130211017cb656ed","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},programHashes={},programs={},provenance={},lines=source.split('\n');
            for(const [k,[marker,file]]of Object.entries(map)){
             const header='          cat >'+'"$RUNNER_TEMP/'+file+'" '+'<'+'<'+"'"+marker+"'",positions=lines.flatMap((s,n)=>s===header?[n]:[]);assert.equal(positions.length,1);const begin=positions[0]+1,ending=lines.flatMap((s,n)=>s==='          '+marker?[n]:[]);assert.equal(ending.length,1);assert(ending[0]>begin);const body=lines.slice(begin,ending[0]).map(s=>{assert(s.startsWith('          '));return s.slice(10);}).join('\n')+'\n';programs[k]=body;programHashes[k]=hash(body);assert.equal(programHashes[k],expectedHashes[k]);provenance[k]={bytes:Buffer.byteLength(body),sha256:programHashes[k]};
            }
            assert.equal(Object.keys(programHashes).length,5);assert.equal(new Set(Object.values(programHashes)).size,5);assert.equal(provenance.adapter.bytes,43451);assert.equal(programHashes.adapter,'a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3');assert.equal(provenance.safeZip.bytes,13305);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');
            const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);provenance.zip3={bytes:Buffer.byteLength(zip3),sha256:hash(zip3)};assert.equal(provenance.zip3.bytes,3380);assert.equal(provenance.zip3.sha256,'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
            const observer={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node},expected={observer,programHashes};
            const historicalBinding={"bindingRole":"historical-subject-reused-component-pins","context":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"b8497734abe5f6afdcc7c518e82a591438353f14","tree":"1c0e1a87fa759ea07dc117931c37258067d3b1c0","workflowBlob":"5eaf4f5e5497711e219999fa14c51501a82f94d2","run":"43414661211","attempt":1,"node":"22.23.4"},"sourcePins":{"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","controls":"afe050bdb5a35a0c727a2b949fba4a58a7e222f4ef12c8e86756d0e24f21d6b0","verifier":"c6fac92623809ee41b69ee77260b32d50c1149ba5716ca0a39b8b024d7dfb849","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}};
            keyless();for(const [k,[,file]]of Object.entries(map))await writeFile(join(e.RUNNER_TEMP,file),programs[k],{flag:'wx',mode:0o600});
            await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify(historicalBinding)+'\n',{flag:'wx',mode:0o600});await writeFile(join(e.RUNNER_TEMP,'afw-postmortem-observer.json'),JSON.stringify(expected)+'\n',{flag:'wx',mode:0o600});
            return {expected,provenance};
           }
           let phase='bootstrap';
           try{
            const {expected,provenance}=await bootstrap();
            const url=file=>pathToFileURL(join(process.env.RUNNER_TEMP,file)).href;
            const A=await import(url('afw-postmortem-adapter.mjs'));
            const I=await import(url('afw-postmortem-inspector.mjs'));
            const Z=await import(url('afw-postmortem-safe-zip.mjs'));
            const R=await import(url('afw-postmortem-receiver.mjs'));
            const C=await import(url('afw-postmortem-controls.mjs'));
            A.requireKeyless();I.validateExpected(expected);assert.deepEqual(A.CONTEXT,I.SUBJECT);phase='controls';
-           const controls=await C.runAllControls(expected,provenance);
+           const controls=await C.runAllControls(expected,provenance,line=>console.log(line));
            console.log('AFW_CUSTODY_POSTMORTEM_CONTROLS/1 '+JSON.stringify(controls));
            A.requireKeyless();phase='inspection';const targets=[];
            for(const target of I.TARGETS){A.requireKeyless();targets.push(await I.inspectTarget(target));}
            phase='publication';const result=I.makeResult(expected,targets,controls),resultBytes=I.canonical(result),manifestBytes=I.canonical(I.makeManifest(resultBytes,expected.observer)),files=new Map([['result.json',resultBytes],['manifest.json',manifestBytes]]);
            R.validatePostmortemPair(files,expected);assert(resultBytes.length+manifestBytes.length<=65536);
            A.requireKeyless();const destination=join(process.env.RUNNER_TEMP,'afw-postmortem-safe');await mkdir(destination,{mode:0o700});for(const [file,bytes]of files)await writeFile(join(destination,file),bytes,{flag:'wx',mode:0o600});
            console.log('AFW_CUSTODY_POSTMORTEM_COLLECTION/1 '+JSON.stringify({inspectionComplete:result.inspectionComplete,targetStages:targets.map(x=>({job:x.job,stage:x.stage,outcome:x.outcome})),historicalCauseProven:false,receiptAuthenticated:false,...I.FLAGS}));
           }catch{
            console.log('AFW_CUSTODY_POSTMORTEM_PRODUCER_UNAVAILABLE/1 '+JSON.stringify({stage:phase,historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}));process.exitCode=1;
           }
           NODE_POSTMORTEM_PRODUCER
       - name: Upload only current bounded diagnostic pair
@@ -814,41 +882,41 @@
           import {join} from 'node:path';
           import {pathToFileURL} from 'node:url';
           import {createHash} from 'node:crypto';
           import {execFileSync} from 'node:child_process';
           async function bootstrap(){
            const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml';
            const keyless=()=>assert.equal(e.AFW_SYN_CHECKPOINT_KEY,undefined,'postmortem_key_present');
            keyless();assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(e.GITHUB_EVENT_NAME,'push');assert.equal(process.versions.node,'22.23.4');assert(/^[a-f0-9]{40}$/.test(e.GITHUB_SHA));assert(/^[1-9][0-9]*$/.test(e.GITHUB_RUN_ID)&&Number.isSafeInteger(Number(e.GITHUB_RUN_ID))&&String(Number(e.GITHUB_RUN_ID))===e.GITHUB_RUN_ID);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
            const git=(...a)=>execFileSync('git',a,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
            assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path],{stdio:['ignore','pipe','pipe']}).equals(bytes));
            const sourcePins={"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
            for(const [k,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[k]);assert.equal(blob(await readFile(p)),sourcePins[k]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
-           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"e724c18928f7fe21791165086d840333b0a1544109b8041b26966b801bbbcc3f","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},programHashes={},programs={},provenance={},lines=source.split('\n');
+           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"b902864ec21f0d2eeb5b555f6988f3991646fc54e3ffd3a1130211017cb656ed","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},programHashes={},programs={},provenance={},lines=source.split('\n');
            for(const [k,[marker,file]]of Object.entries(map)){
             const header='          cat >'+'"$RUNNER_TEMP/'+file+'" '+'<'+'<'+"'"+marker+"'",positions=lines.flatMap((s,n)=>s===header?[n]:[]);assert.equal(positions.length,1);const begin=positions[0]+1,ending=lines.flatMap((s,n)=>s==='          '+marker?[n]:[]);assert.equal(ending.length,1);assert(ending[0]>begin);const body=lines.slice(begin,ending[0]).map(s=>{assert(s.startsWith('          '));return s.slice(10);}).join('\n')+'\n';programs[k]=body;programHashes[k]=hash(body);assert.equal(programHashes[k],expectedHashes[k]);provenance[k]={bytes:Buffer.byteLength(body),sha256:programHashes[k]};
            }
            assert.equal(Object.keys(programHashes).length,5);assert.equal(new Set(Object.values(programHashes)).size,5);assert.equal(provenance.adapter.bytes,43451);assert.equal(programHashes.adapter,'a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3');assert.equal(provenance.safeZip.bytes,13305);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');
            const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);provenance.zip3={bytes:Buffer.byteLength(zip3),sha256:hash(zip3)};assert.equal(provenance.zip3.bytes,3380);assert.equal(provenance.zip3.sha256,'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
            const observer={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node},expected={observer,programHashes};
            const historicalBinding={"bindingRole":"historical-subject-reused-component-pins","context":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"b8497734abe5f6afdcc7c518e82a591438353f14","tree":"1c0e1a87fa759ea07dc117931c37258067d3b1c0","workflowBlob":"5eaf4f5e5497711e219999fa14c51501a82f94d2","run":"43414661211","attempt":1,"node":"22.23.4"},"sourcePins":{"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","controls":"afe050bdb5a35a0c727a2b949fba4a58a7e222f4ef12c8e86756d0e24f21d6b0","verifier":"c6fac92623809ee41b69ee77260b32d50c1149ba5716ca0a39b8b024d7dfb849","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}};
            keyless();for(const [k,[,file]]of Object.entries(map))await writeFile(join(e.RUNNER_TEMP,file),programs[k],{flag:'wx',mode:0o600});
            await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify(historicalBinding)+'\n',{flag:'wx',mode:0o600});await writeFile(join(e.RUNNER_TEMP,'afw-postmortem-observer.json'),JSON.stringify(expected)+'\n',{flag:'wx',mode:0o600});
            return {expected,provenance};
           }
           let output=null;
           try{
            const {expected}=await bootstrap(),url=file=>pathToFileURL(join(process.env.RUNNER_TEMP,file)).href;
            const A=await import(url('afw-postmortem-adapter.mjs'));
            const I=await import(url('afw-postmortem-inspector.mjs'));
            const Z=await import(url('afw-postmortem-safe-zip.mjs'));
            const R=await import(url('afw-postmortem-receiver.mjs'));
            const C=await import(url('afw-postmortem-controls.mjs'));
            A.requireKeyless();I.validateExpected(expected);assert.deepEqual(A.CONTEXT,I.SUBJECT);
-           const receiverControls=await C.runReceiverControls();assert.equal(receiverControls.passed,2);
+           const receiverControls=await C.invokeControlGroup('receiver',()=>C.runReceiverControls(),line=>console.log(line));assert.equal(receiverControls.passed,2);
            let needs;try{needs=JSON.parse(process.env.AFW_POSTMORTEM_NEEDS);}catch{needs=null;}
            A.requireKeyless();output=await R.verifyPostmortemRoute(needs,expected);
           }catch{
            output={marker:'AFW_CUSTODY_POSTMORTEM_READBACK/1',observer:null,programHashes:null,producerResult:null,artifactId:null,uploadedDigest:null,status:'unavailable',reason:'observer_unavailable',inspectionComplete:false,rawZipBytes:null,rawZipSha256:null,resultSha256:null,manifestSha256:null,historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
           }
           const line=JSON.stringify(output);if(Buffer.byteLength(line)>4096)process.exitCode=1;else{console.log(line);process.exitCode=output.status==='verified'?0:1;}
           NODE_POSTMORTEM_VERIFY
```

## Complete fix1 activation-only delta
```diff
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -1,24 +1,28 @@
 name: AFW custody postmortem ZERO key
 run-name: AFW custody postmortem INACTIVE ${{ github.sha }}
 on:
-  workflow_dispatch:
+  push:
+    branches:
+      - feat/finite-native-cleanup-20261101
+    paths:
+      - .github/workflows/afw-finite-budget-qualification.yml
 permissions:
   contents: read
   actions: read
 concurrency:
   group: afw-finite-budget-qualification
   cancel-in-progress: false
 # PREPARATION ONLY. Both jobs are literally false. Root gate is required before any run.
 jobs:
   custody_inspect:
-    if: ${{ false }}
+    if: ${{ github.event_name == 'push' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.repository_id == '1347578006' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.workflow_ref == 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 && github.event.head_commit.message == 'AFW custody postmortem ZERO KEY fix1 one use 20261113-abb416f684a6d8e3-01' }}
     runs-on: ubuntu-24.04
     timeout-minutes: 7
     env:
       GH_ARTIFACT_TOKEN: ${{ github.token }}
     outputs:
       safe-id: ${{ steps.upload.outputs.artifact-id }}
       safe-digest: ${{ steps.upload.outputs.artifact-digest }}
     steps:
       - name: Require fixed keyless Source
         shell: bash
@@ -832,21 +836,21 @@
         if: ${{ success() && steps.collect.outcome == 'success' }}
         uses: actions/upload-artifact@v4
         with:
           name: afw-custody-postmortem-safe-${{ github.run_id }}-1
           path: ${{ runner.temp }}/afw-postmortem-safe/
           if-no-files-found: error
           retention-days: 7
           compression-level: 0
           include-hidden-files: false
   verify:
-    if: ${{ false }}
+    if: ${{ always() && github.event_name == 'push' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.repository_id == '1347578006' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.workflow_ref == 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 && github.event.head_commit.message == 'AFW custody postmortem ZERO KEY fix1 one use 20261113-abb416f684a6d8e3-01' }}
     needs: custody_inspect
     runs-on: ubuntu-24.04
     timeout-minutes: 2
     env:
       GH_ARTIFACT_TOKEN: ${{ github.token }}
     steps:
       - name: Require fixed keyless Source
         shell: bash
         run: |
           set -euo pipefail
```

## Actual covering run and independent Root readbacks

ONEnewrun43437695014/1/b1f124completedSUCCESS, exactcustody_inspect+verify bothSUCCESS. Actualcommandscurrentdriver call C.runAllControls (7+14+2 includesextendedredaction/summaryfixtures) andactualreceiver C.invokeControlGroup(receiver...)+R.verifyPostmortemRoute. All23names/statuses arebelow, notselfclaimed fromstaticfixture. SAMEfixedtargetmetadata/rawZIP/outerreceiptcapinspectionthenpublish. Rootcheckedcurrentonly4150BSMALLSAFE, complete2files/CRC/ranges/canonical/manifest/current9fieldObserver/5hashes/assignedIDs/uploadAPIbodydigesttriple. No private/purearchivebytesorNative/key execution byRoot. Currentdiagnostictransportverified; actualoldcoherentsuitestillFAILED; originalFF-I2 remainsOPEN/key-bearingNativeheld.
```json
{
  "observation": {
    "source": "b1f124c69344df7d2abe79e573583f23205fe24e",
    "run": "43437695014",
    "artifactId": "14043724282",
    "strictMetadataVerified": true,
    "inspectionComplete": true,
    "targets": [
      {
        "job": "positive_prepare",
        "outcome": "rejected",
        "stage": "receipt_caps",
        "fileCount": 103,
        "totalBytes": 354960272,
        "originalCapAccepted": false
      },
      {
        "job": "reduction_prepare",
        "outcome": "rejected",
        "stage": "receipt_caps",
        "fileCount": 96,
        "totalBytes": 344974155,
        "originalCapAccepted": false
      }
    ],
    "controls": 23,
    "historicalCauseProven": false,
    "receiptAuthenticated": false,
    "operationalReadiness": false,
    "PCoff": false,
    "currentReadback": {
      "source": "b1f124c69344df7d2abe79e573583f23205fe24e",
      "run": "43437695014",
      "artifactId": "14043724282",
      "status": "verified",
      "reason": "none",
      "transportVerified": true,
      "inspectionComplete": true,
      "historicalCauseProven": false,
      "receiptAuthenticated": false,
      "operationalReadiness": false,
      "PCoff": false
    },
    "controlsLogEqualsSafe": true,
    "currentRunConclusion": "success",
    "all23ControlsPassed": true,
    "inspectionIsDiagnosticOnly": true,
    "oldOriginalFullSuiteStillFailed": true,
    "readonlySealCause": "unknown",
    "FFI2": "open; key-bearing Native held",
    "allCurrentCountsWithinCorrectedGeneric512MiBRange": true
  },
  "producer": {
    "jobId": 131926939980,
    "markers": [
      {
        "marker": "AFW_CUSTODY_POSTMORTEM_CONTROLS/1",
        "payload": {
          "diagnostic": {
            "expected": 7,
            "completed": 7,
            "passed": 7,
            "failed": 0,
            "inventory": [
              {
                "id": "postmortem_original_prefix_binding",
                "status": "passed"
              },
              {
                "id": "postmortem_subject_observer_separation",
                "status": "passed"
              },
              {
                "id": "postmortem_original_receipt_cap_boundaries",
                "status": "passed"
              },
              {
                "id": "postmortem_stage_sequence",
                "status": "passed"
              },
              {
                "id": "postmortem_metadata_failure_blocks_archive",
                "status": "passed"
              },
              {
                "id": "postmortem_target_null_and_cap_coherence",
                "status": "passed"
              },
              {
                "id": "postmortem_error_redaction",
                "status": "passed"
              }
            ]
          },
          "zip": {
            "expected": 14,
            "completed": 14,
            "passed": 14,
            "failed": 0,
            "inventory": [
              {
                "id": "zip_valid_store_crc_vector",
                "status": "passed"
              },
              {
                "id": "zip_valid_deflate",
                "status": "passed"
              },
              {
                "id": "zip_signed_unsigned_descriptors",
                "status": "passed"
              },
              {
                "id": "zip_wrong_size",
                "status": "passed"
              },
              {
                "id": "zip_wrong_upload_sha",
                "status": "passed"
              },
              {
                "id": "zip_wrong_metadata_sha",
                "status": "passed"
              },
              {
                "id": "zip_extra_entry",
                "status": "passed"
              },
              {
                "id": "zip_duplicate_entry",
                "status": "passed"
              },
              {
                "id": "zip_traversal_entry",
                "status": "passed"
              },
              {
                "id": "zip_symlink",
                "status": "passed"
              },
              {
                "id": "zip_bad_crc",
                "status": "passed"
              },
              {
                "id": "zip_noncontiguous_ranges",
                "status": "passed"
              },
              {
                "id": "zip_declared_and_inflate_caps",
                "status": "passed"
              },
              {
                "id": "download_stream_redirect_auth_bounds",
                "status": "passed"
              }
            ]
          },
          "receiver": {
            "expected": 2,
            "completed": 2,
            "passed": 2,
            "failed": 0,
            "inventory": [
              {
                "id": "postmortem_pair_schema_manifest_binding",
                "status": "passed"
              },
              {
                "id": "postmortem_route_direct_output_binding",
                "status": "passed"
              }
            ]
          }
        }
      },
      {
        "marker": "AFW_CUSTODY_POSTMORTEM_COLLECTION/1",
        "payload": {
          "inspectionComplete": true,
          "targetStages": [
            {
              "job": "positive_prepare",
              "stage": "receipt_caps",
              "outcome": "rejected"
            },
            {
              "job": "reduction_prepare",
              "stage": "receipt_caps",
              "outcome": "rejected"
            }
          ],
          "historicalCauseProven": false,
          "receiptAuthenticated": false,
          "operationalReadiness": false,
          "completePackage": false,
          "PCoff": false,
          "globalNativeDrainVerified": false,
          "sdkNamespaceEmptyVerified": false
        }
      }
    ]
  },
  "receiver": {
    "jobId": 131927049857,
    "markers": [
      {
        "marker": "AFW_CUSTODY_POSTMORTEM_READBACK/1",
        "observer": {
          "repository": "tokenizartinfo-ops/agent-friendly-web",
          "repositoryId": "1347578006",
          "ref": "refs/heads/feat/finite-native-cleanup-20261101",
          "source": "b1f124c69344df7d2abe79e573583f23205fe24e",
          "tree": "cdad701305b28affac29540fd226859efa04684c",
          "workflowBlob": "a03742d8850887b55999d8c72c6c6b25b091fd7f",
          "run": "43437695014",
          "attempt": 1,
          "node": "22.23.4"
        },
        "programHashes": {
          "adapter": "a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3",
          "inspector": "78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f",
          "controls": "b902864ec21f0d2eeb5b555f6988f3991646fc54e3ffd3a1130211017cb656ed",
          "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
          "receiver": "4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"
        },
        "producerResult": "success",
        "artifactId": "14043724282",
        "uploadedDigest": "b17cbdbadff1c9278646ad8f8bfa7927dcb7be41eabe9b48835c0ec84c76c543",
        "status": "verified",
        "reason": "none",
        "inspectionComplete": true,
        "rawZipBytes": 4150,
        "rawZipSha256": "b17cbdbadff1c9278646ad8f8bfa7927dcb7be41eabe9b48835c0ec84c76c543",
        "resultSha256": "d91bbece4ffe69cc194a5062ede3f0cd6fca10e09b74d5e0b1de725910ea9506",
        "manifestSha256": "53fda05d09ddf154f3fc0e8a866db245df869f6f919d57981b3a29a8820af0e1",
        "historicalCauseProven": false,
        "receiptAuthenticated": false,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false,
        "globalNativeDrainVerified": false,
        "sdkNamespaceEmptyVerified": false
      }
    ]
  },
  "safeMetadata": {
    "artifacts": [
      {
        "id": 14043724282,
        "name": "afw-custody-postmortem-safe-43437695014-1",
        "size_in_bytes": 4150,
        "url": "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/14043724282",
        "archive_download_url": "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/14043724282/zip",
        "expired": false,
        "created_at": "2026-11-13T13:54:05Z",
        "expires_at": "2026-11-20T13:54:05Z",
        "updated_at": "2026-11-13T13:54:05Z",
        "digest": "sha256:b17cbdbadff1c9278646ad8f8bfa7927dcb7be41eabe9b48835c0ec84c76c543",
        "workflow_run": {
          "id": 43437695014,
          "repository_id": 1347578006,
          "head_repository_id": 1347578006,
          "head_branch": "feat/finite-native-cleanup-20261101",
          "head_sha": "b1f124c69344df7d2abe79e573583f23205fe24e"
        }
      }
    ]
  },
  "safe": {
    "id": "14043724282",
    "zipBytes": 4150,
    "zipSha256": "b17cbdbadff1c9278646ad8f8bfa7927dcb7be41eabe9b48835c0ec84c76c543",
    "completeInventory": true,
    "crcKnownVector": true,
    "files": [
      {
        "name": "manifest.json",
        "bytes": 260,
        "sha256": "53fda05d09ddf154f3fc0e8a866db245df869f6f919d57981b3a29a8820af0e1",
        "crc32": "e63cc6f9",
        "value": {
          "purpose": "afw.custody-postmortem-manifest.safe.v1",
          "source": "b1f124c69344df7d2abe79e573583f23205fe24e",
          "run": "43437695014",
          "attempt": 1,
          "files": [
            {
              "path": "result.json",
              "bytes": 3636,
              "sha256": "d91bbece4ffe69cc194a5062ede3f0cd6fca10e09b74d5e0b1de725910ea9506"
            }
          ]
        }
      },
      {
        "name": "result.json",
        "bytes": 3636,
        "sha256": "d91bbece4ffe69cc194a5062ede3f0cd6fca10e09b74d5e0b1de725910ea9506",
        "crc32": "718188db",
        "value": {
          "purpose": "afw.custody-postmortem.safe.v1",
          "observer": {
            "repository": "tokenizartinfo-ops/agent-friendly-web",
            "repositoryId": "1347578006",
            "ref": "refs/heads/feat/finite-native-cleanup-20261101",
            "source": "b1f124c69344df7d2abe79e573583f23205fe24e",
            "tree": "cdad701305b28affac29540fd226859efa04684c",
            "workflowBlob": "a03742d8850887b55999d8c72c6c6b25b091fd7f",
            "run": "43437695014",
            "attempt": 1,
            "node": "22.23.4"
          },
          "subject": {
            "repository": "tokenizartinfo-ops/agent-friendly-web",
            "repositoryId": "1347578006",
            "ref": "refs/heads/feat/finite-native-cleanup-20261101",
            "source": "b8497734abe5f6afdcc7c518e82a591438353f14",
            "tree": "1c0e1a87fa759ea07dc117931c37258067d3b1c0",
            "workflowBlob": "5eaf4f5e5497711e219999fa14c51501a82f94d2",
            "run": "43414661211",
            "attempt": 1,
            "node": "22.23.4"
          },
          "programHashes": {
            "adapter": "a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3",
            "inspector": "78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f",
            "controls": "b902864ec21f0d2eeb5b555f6988f3991646fc54e3ffd3a1130211017cb656ed",
            "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
            "receiver": "4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"
          },
          "targets": [
            {
              "job": "positive_prepare",
              "kind": "checkpoint",
              "artifactId": "14032036855",
              "expectedBytes": 27586034,
              "expectedSha256": "aa9c330d881abfe6ed352a52b87593b884743c6912497269a5f7202f545e2644",
              "outcome": "rejected",
              "stage": "receipt_caps",
              "metadataVerified": true,
              "rawVerified": true,
              "zipVerified": true,
              "fileCount": 103,
              "totalBytes": 354960272,
              "successReceiptCapAccepted": false
            },
            {
              "job": "reduction_prepare",
              "kind": "reduction-checkpoint",
              "artifactId": "14032480638",
              "expectedBytes": 27469695,
              "expectedSha256": "201b4b831506a02966cc0d3af7bf067e138401fc15203e6363b926cdf85dd5d6",
              "outcome": "rejected",
              "stage": "receipt_caps",
              "metadataVerified": true,
              "rawVerified": true,
              "zipVerified": true,
              "fileCount": 96,
              "totalBytes": 344974155,
              "successReceiptCapAccepted": false
            }
          ],
          "controls": {
            "diagnostic": {
              "expected": 7,
              "completed": 7,
              "passed": 7,
              "failed": 0,
              "inventory": [
                {
                  "id": "postmortem_original_prefix_binding",
                  "status": "passed"
                },
                {
                  "id": "postmortem_subject_observer_separation",
                  "status": "passed"
                },
                {
                  "id": "postmortem_original_receipt_cap_boundaries",
                  "status": "passed"
                },
                {
                  "id": "postmortem_stage_sequence",
                  "status": "passed"
                },
                {
                  "id": "postmortem_metadata_failure_blocks_archive",
                  "status": "passed"
                },
                {
                  "id": "postmortem_target_null_and_cap_coherence",
                  "status": "passed"
                },
                {
                  "id": "postmortem_error_redaction",
                  "status": "passed"
                }
              ]
            },
            "zip": {
              "expected": 14,
              "completed": 14,
              "passed": 14,
              "failed": 0,
              "inventory": [
                {
                  "id": "zip_valid_store_crc_vector",
                  "status": "passed"
                },
                {
                  "id": "zip_valid_deflate",
                  "status": "passed"
                },
                {
                  "id": "zip_signed_unsigned_descriptors",
                  "status": "passed"
                },
                {
                  "id": "zip_wrong_size",
                  "status": "passed"
                },
                {
                  "id": "zip_wrong_upload_sha",
                  "status": "passed"
                },
                {
                  "id": "zip_wrong_metadata_sha",
                  "status": "passed"
                },
                {
                  "id": "zip_extra_entry",
                  "status": "passed"
                },
                {
                  "id": "zip_duplicate_entry",
                  "status": "passed"
                },
                {
                  "id": "zip_traversal_entry",
                  "status": "passed"
                },
                {
                  "id": "zip_symlink",
                  "status": "passed"
                },
                {
                  "id": "zip_bad_crc",
                  "status": "passed"
                },
                {
                  "id": "zip_noncontiguous_ranges",
                  "status": "passed"
                },
                {
                  "id": "zip_declared_and_inflate_caps",
                  "status": "passed"
                },
                {
                  "id": "download_stream_redirect_auth_bounds",
                  "status": "passed"
                }
              ]
            },
            "receiver": {
              "expected": 2,
              "completed": 2,
              "passed": 2,
              "failed": 0,
              "inventory": [
                {
                  "id": "postmortem_pair_schema_manifest_binding",
                  "status": "passed"
                },
                {
                  "id": "postmortem_route_direct_output_binding",
                  "status": "passed"
                }
              ]
            }
          },
          "inspectionComplete": true,
          "historicalCauseProven": false,
          "receiptAuthenticated": false,
          "operationalReadiness": false,
          "completePackage": false,
          "PCoff": false,
          "globalNativeDrainVerified": false,
          "sdkNamespaceEmptyVerified": false
        }
      }
    ]
  },
  "inactiveGate": {
    "source": "abb416f684a6d8e310876435566325e03fa53291",
    "parent": "dcd70e8905cc42beb03c871d00a95e0479c6292c",
    "tree": "61d1175111fa348988fc5544d12cd6b6cf167fdf",
    "F7": "5252ab790a09ae7df66af1ce09b858be39d91883",
    "hashes": {
      "sourceBytes": 122387,
      "sourceSha256": "3c2d288946d2cc365e07c795a2cf4ee3d9a498d4a3a05303d10c459c474aaba6",
      "sourceGitBlob": "5252ab790a09ae7df66af1ce09b858be39d91883",
      "controlsBytes": 20252,
      "controlsSha256": "b902864ec21f0d2eeb5b555f6988f3991646fc54e3ffd3a1130211017cb656ed"
    },
    "allOther3195Exact": true,
    "fourOtherBodiesExact": true,
    "completeExpressions": 14,
    "canonicalOutsideYamlUnchanged": true,
    "noKeyOrAFWEnvironment": true,
    "SourceExecuted": false,
    "candidateRuns": 0,
    "fiveActive0": true,
    "mainUnchanged": true,
    "newCodeStaticallyReviewed": true
  },
  "activeGate": {
    "commit": "b1f124c69344df7d2abe79e573583f23205fe24e",
    "parent": "abb416f684a6d8e310876435566325e03fa53291",
    "tree": "cdad701305b28affac29540fd226859efa04684c",
    "F7": "a03742d8850887b55999d8c72c6c6b25b091fd7f",
    "bytes": 123519,
    "sha256": "80ccbe2db623691cbd6b00b4333d371f5f316510b707dd44005ac90e75fa2cc6",
    "gitBlob": "a03742d8850887b55999d8c72c6c6b25b091fd7f",
    "entireExpectedTransformExact": true,
    "fiveBodiesExact": true,
    "allOther3195Exact": true,
    "canonicalReviewedNonsecretExpressions": 14,
    "SourceRefStillInactive": true,
    "runReleased": false
  }
}
```

Return CP-I1 ADDRESSED|NOT ADDRESSED and CP-I2 ADDRESSED|NOT ADDRESSED withexact currentF7lineevidence; newCritical/Important/Minor in fixdiff only; out-of-scope observations separate/nonblocking; finalroundverdict. Don'trerunexistingcoveringtest orfullsuite. Readclaimscritically; unknownfirsthistoricerror/AEAD/privateinnerinventory/readinessremainunknown/false.

## Exact final Source closure

Final f1a3d456dd4118edf155c7ecb60479d0881526bc/tree5c91e72178287f079607234f2a546641c014a7cc; parentrestore31b8291ed89b85f198ffadabfd712028292ce264 whose treeexactpre-fixd58. Rootindependentmetadata/fulltree/report/leases/counts/hashproof:
```json
{
  "closure": {
    "source": "f1a3d456dd4118edf155c7ecb60479d0881526bc",
    "tree": "5c91e72178287f079607234f2a546641c014a7cc",
    "prior3195LeavesExact": true,
    "leaves": 3196,
    "soleNewReport": "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
    "reportSha": "68ae6784afe4cc05a55b737a564e8ca07a0b58b6",
    "reportChars": 204637,
    "F7exact": true,
    "mainUnchanged": true,
    "runId": "43437695014",
    "runSource": "b1f124c69344df7d2abe79e573583f23205fe24e",
    "runCompleted": true,
    "allDeclaredJobsTerminal": true,
    "declaredJobs": 2,
    "fiveBranchActiveStatusesZero": true,
    "all62WorkflowBlobsExact": true,
    "providerRuntimeRead": false,
    "operationalReadiness": false,
    "PCoff": false,
    "preFixRestoreTreeExact": true,
    "oneSourceRun": true,
    "closedCommitRuns": 0,
    "reportPrefixChars": 189509
  },
  "reportHashes": {
    "bytes": 204699,
    "sha256": "16975ae51a8ca2f0fd357500ff89def3aab8bc836284c1ad0ef94315b5fad62b",
    "gitBlob": "68ae6784afe4cc05a55b737a564e8ca07a0b58b6"
  }
}
```

## Complete appended covering-test/closure report (fullcontext8, roundtripped)
```diff
--- a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
+++ b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
@@ -1457,8 +1457,105 @@
 Mandatory restoration and preservation:
 - After completed run and both terminal jobs, frozen Source dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d, recoverable original F7 and unchanged report prefix were freshly checked.
 - Restoration commit a38d5969a0d52247008ba9a2c22620224446457d has parent dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d and EXACT pre-unit closed tree d86acb49d2026d2207eeb35ff97f728dc014e7d9. Source was CAS-restored without force. Original F7 read back byte-exact at f7a71f1a0fa4f5ddf069ff411f008a098455e5cc, 126209 bytes, SHA256 1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a.
 - Before this append: restoration commit had zero runs; activation had exactly one attempt-1 run; queued/in_progress/waiting/requested/pending totals were all zero. Main remained exact 0c9c475b3ebaa970fc11d628b40e50a90cceb727.
 - This is an append to the SAME report only. The entire prior 177489 characters / 177547 bytes remain an exact prefix, prior blob a74aaaee7ac5ab5e3c42cc9d36e0c8395a17b1c6, SHA256 0f0de84240db9b600cc3e75efcbfed5b2cb1b24dba4e9d693bdf295fc4d5344f. All 3195 original leaf type/mode/blob identities other than this report, including original F7 and R1 report, must remain exact; final inventory 3196 leaves / 62 workflows.
 - The final append's immutable commit/tree/report blob and post-publication closure readbacks are returned separately to Root, avoiding self-referential report hashes. No further Source work is released.
 
 Disposition: DONE_WITH_CONCERNS. The ONE diagnostic failed at producer controls before actual target inspection; precise failed control/error remains unknown because only fixed redacted markers were emitted. Retained producer observations and historical causes remain unqualified. FF-I2 actual-key/Native hold is unchanged; no further run, code fix, promotion or PC-off claim follows from this receipt.
+
+
+## 2026-11-13 — Fix1 ONE ZERO-key retained-envelope diagnostic: 23 controls passed, both original receipt caps rejected, restored
+
+Evidence dated 2026-11-13 13:56:40 UTC. The fresh fix1 diagnostic completed collection and independent current SMALLSAFE verification. Both retained producer envelopes reached an original receipt-cap rejection. This is a diagnostic result, not a Native/coherent-suite qualification, AEAD authentication, historical-cause proof or PC-off acceptance. historicalCauseProven=false, receiptAuthenticated=false and all five readiness flags remain false. Coherent FF-I2 stays OPEN; actual-key/Native activation remains HELD.
+
+Scope, review and immutable Source:
+- Fix1 brief/spec/review at Root docs 875a155efa152f7908df16f5e24d30eca757c587; inactive Root gate 32d3b1829b72d102809e7581cde61a98a113c86c; exact ONE-run release ab690a21500218ac78ffa2eae94f487d71858b2d, docs/superpowers/briefs/2026-11-13-custody-postmortem-fix1-one-run-release.md.
+- PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web / ID 1347578006; Source feat/finite-native-cleanup-20261101; GitHub API/GitDB/Actions. Pre-fix closed Source dcd70e8905cc42beb03c871d00a95e0479c6292c/tree d58bae6436fb6d8dd690bff05eec1caa22cc38d6.
+- Inactive candidate abb416f684a6d8e310876435566325e03fa53291/tree 61d1175111fa348988fc5544d12cd6b6cf167fdf/F7 5252ab790a09ae7df66af1ce09b858be39d91883, 122387 bytes, SHA256 3c2d288946d2cc365e07c795a2cf4ee3d9a498d4a3a05303d10c459c474aaba6. CP-I1 replaced the incorrect numeric14 assertion with the unchanged actual closed13-name TargetRecord validator and missing/extra-field rejection. CP-I2 added the exact closed13-key bounded control-failure summary/normalizer and shared actual invocation wrapper, with covering fixtures inside the existing redaction control.
+- Only controls, its two bootstrap expected-hash pins and necessary producer/receiver invocation/emission seams changed relative to the first inactive template. The four other bodies, original ZIP3 and public DTO/cap/transport contracts remained exact. Control IDs stayed 7+14+2; no new ID or accepting threshold.
+- Active overlay b1f124c69344df7d2abe79e573583f23205fe24e, parent abb416f684a6d8e310876435566325e03fa53291, tree cdad701305b28affac29540fd226859efa04684c, F7 a03742d8850887b55999d8c72c6c6b25b091fd7f, 123519 bytes, SHA256 80ccbe2db623691cbd6b00b4333d371f5f316510b707dd44005ac90e75fa2cc6.
+- Exact consumed message: AFW custody postmortem ZERO KEY fix1 one use 20261113-abb416f684a6d8e3-01. Root checked the whole trigger/two-guard transform, complete known nonsecret expressions, five unchanged body identities and all other 3195 leaves before the exact CAS. No AFW environment or master-key binding; actual Node 22.23.4. Main remained 0c9c475b3ebaa970fc11d628b40e50a90cceb727.
+
+Current program hashes (adapter 43451B; inspector 10590B; controls 20252B; safeZip 13305B; receiver 5570B):
+
+| Body | SHA256 |
+|---|---|
+| adapter | a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3 |
+| inspector | 78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f |
+| controls | b902864ec21f0d2eeb5b555f6988f3991646fc54e3ffd3a1130211017cb656ed |
+| safeZip | b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d |
+| receiver | 4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1 |
+
+Original embedded ZIP3 remains 3380 bytes/SHA256 4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8. Current Observer is b1f124c.../tree cdad701.../F7 a03742d.../run 43437695014/attempt1/Node22.23.4; full exact context is in the closed marker below. Historical Subject remains explicitly b8497734abe5f6afdcc7c518e82a591438353f14/tree 1c0e1a87fa759ea07dc117931c37258067d3b1c0/F7 5eaf4f5e5497711e219999fa14c51501a82f94d2/run43414661211/attempt1/Node22.23.4. Subject and Observer bindings were separate; no GitHub environment identity spoofing.
+
+Actual one-run commands and outputs:
+- [Run 43437695014](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43437695014), event push, attempt1, exact Source/path/ref; created 2026-11-13T13:53:54Z, completed/success, updated 2026-11-13T13:54:18Z. Exactly one run for the activation commit; no rerun of this or 43433569894.
+- custody_inspect job131926939980 completed/success, including fixed-keyless Source/checkout/Node/body-preservation, controls/inspection and upload. verify job131927049857 completed/success, including its independent current receiver. Both declared jobs were terminal before restoration.
+- Source-bound producer Node driver invoked C.runAllControls(expected,provenance,line=>console.log(line)); its shared invocation wrapper covers diagnostic, original ZIP and receiver groups. The complete marker at 2026-11-13T13:54:01.6936955Z reported diagnostic expected/completed/passed7/7/7 failed0, ZIP14/14/14 failed0, receiver2/2/2 failed0, with all 23 fixed per-ID statuses passed. Only after this completion did the driver sequentially inspect the two fixed retained targets.
+- Source-bound receiver Node driver invoked C.invokeControlGroup('receiver',()=>C.runReceiverControls(),line=>console.log(line)); assert.equal(receiverControls.passed,2); followed by R.verifyPostmortemRoute(needs,expected). Current marker verified the direct producer assignment/metadata/raw ZIP/pair/manifest. No real failure-summary line was emitted; failure normalization/rethrow coverage ran as inert fixtures in the passed redaction control.
+- Producer collection marker at 2026-11-13T13:54:05.0973842Z reported inspectionComplete:true and both target stages receipt_caps/rejected, while all historical/authentication/readiness claims stayed false. Producer/receiver exit success means collection/current package verification, not acceptance by the old receipt cap.
+
+Actual fixed 23-control inventory:
+
+| Group | ID | Status |
+|---|---|---|
+| diagnostic | postmortem_original_prefix_binding | passed |
+| diagnostic | postmortem_subject_observer_separation | passed |
+| diagnostic | postmortem_original_receipt_cap_boundaries | passed |
+| diagnostic | postmortem_stage_sequence | passed |
+| diagnostic | postmortem_metadata_failure_blocks_archive | passed |
+| diagnostic | postmortem_target_null_and_cap_coherence | passed |
+| diagnostic | postmortem_error_redaction | passed |
+| zip | zip_valid_store_crc_vector | passed |
+| zip | zip_valid_deflate | passed |
+| zip | zip_signed_unsigned_descriptors | passed |
+| zip | zip_wrong_size | passed |
+| zip | zip_wrong_upload_sha | passed |
+| zip | zip_wrong_metadata_sha | passed |
+| zip | zip_extra_entry | passed |
+| zip | zip_duplicate_entry | passed |
+| zip | zip_traversal_entry | passed |
+| zip | zip_symlink | passed |
+| zip | zip_bad_crc | passed |
+| zip | zip_noncontiguous_ranges | passed |
+| zip | zip_declared_and_inflate_caps | passed |
+| zip | download_stream_redirect_auth_bounds | passed |
+| receiver | postmortem_pair_schema_manifest_binding | passed |
+| receiver | postmortem_route_direct_output_binding | passed |
+
+Exact current controls JSON:
+
+```json
+{"diagnostic":{"expected":7,"completed":7,"passed":7,"failed":0,"inventory":[{"id":"postmortem_original_prefix_binding","status":"passed"},{"id":"postmortem_subject_observer_separation","status":"passed"},{"id":"postmortem_original_receipt_cap_boundaries","status":"passed"},{"id":"postmortem_stage_sequence","status":"passed"},{"id":"postmortem_metadata_failure_blocks_archive","status":"passed"},{"id":"postmortem_target_null_and_cap_coherence","status":"passed"},{"id":"postmortem_error_redaction","status":"passed"}]},"zip":{"expected":14,"completed":14,"passed":14,"failed":0,"inventory":[{"id":"zip_valid_store_crc_vector","status":"passed"},{"id":"zip_valid_deflate","status":"passed"},{"id":"zip_signed_unsigned_descriptors","status":"passed"},{"id":"zip_wrong_size","status":"passed"},{"id":"zip_wrong_upload_sha","status":"passed"},{"id":"zip_wrong_metadata_sha","status":"passed"},{"id":"zip_extra_entry","status":"passed"},{"id":"zip_duplicate_entry","status":"passed"},{"id":"zip_traversal_entry","status":"passed"},{"id":"zip_symlink","status":"passed"},{"id":"zip_bad_crc","status":"passed"},{"id":"zip_noncontiguous_ranges","status":"passed"},{"id":"zip_declared_and_inflate_caps","status":"passed"},{"id":"download_stream_redirect_auth_bounds","status":"passed"}]},"receiver":{"expected":2,"completed":2,"passed":2,"failed":0,"inventory":[{"id":"postmortem_pair_schema_manifest_binding","status":"passed"},{"id":"postmortem_route_direct_output_binding","status":"passed"}]}}
+```
+
+Typed current retained-target observations:
+
+| Target | Artifact ID | Stage | Outcome | Outer fileCount | Outer totalBytes | Original success cap accepted |
+|---|---:|---|---|---:|---:|---|
+| positive_prepare | 14032036855 | receipt_caps | rejected | 103 | 354960272 | false |
+| reduction_prepare | 14032480638 | receipt_caps | rejected | 96 | 344974155 | false |
+
+For both targets metadataVerified=true, rawVerified=true and zipVerified=true; current metadata binding, exact known raw size/digest triple and unchanged qualified ZIP3 checks were passed before receipt numeric projection. The receipt JSON was fatal-UTF8/compact-byte-roundtrip checked. These are UNAUTHENTICATED OUTER receipt observations after retained cipher-ZIP integrity checks, not decrypted inner inventory or AEAD proof. No key, AEAD open, SDK/World/Native/namespace/drain operation ran. File counts103/96 are within the unchanged success limit512; each observed totalBytes exceeds its unchanged 134217728-byte (128MiB) success cap. The generic observation bounds were not widened. Both records legitimately retained counts with successReceiptCapAccepted:false and receipt_caps/rejected.
+
+This establishes a present retained-envelope receipt-cap compatibility blocker. It does not establish which exception occurred first in historical43414661211, prove the historical immediate-postupload HTTP/metadata/raw/ZIP response, repair that old run, or explain readonly's separate missing-artifact/seal failure. The previous controls-failed43433569894 and its unknown first failed callback remain immutable historical evidence.
+
+Current SMALLSAFE metadata and independent evidence:
+- Sole current artifact14043724282, exact name afw-custody-postmortem-safe-43437695014-1; raw4150 bytes; uploaded/API/body SHA256 b17cbdbadff1c9278646ad8f8bfa7927dcb7be41eabe9b48835c0ec84c76c543; created2026-11-13T13:54:05Z/expires2026-11-20T13:54:05Z/expired:false; current run43437695014/Sourceb1f124c.../repository IDs1347578006.
+- Exactly result.json (3636 bytes, SHA256 d91bbece4ffe69cc194a5062ede3f0cd6fca10e09b74d5e0b1de725910ea9506) and manifest.json (260 bytes, SHA256 53fda05d09ddf154f3fc0e8a866db245df869f6f919d57981b3a29a8820af0e1). Combined JSON3896 bytes. Current receiver verifies strict ZIP/CRC/ranges, canonical JSON, exact purpose/currentObserver/Subject/program hashes/typed targets/23 inventories and complete manifest.
+- Root independently downloaded and validated ONLY this current4150-byte SAFE, including full exact schema/context/hash/manifest/target observations, and relayed these typed numeric facts. Actor downloaded no artifact. As an additional metadata-only cross-check, reconstructing the public result from the actual controls marker, exact closed context/program hashes and Root's typed target facts produced exactly3636 bytes/the same result hash; the full canonical manifest reproduced260 bytes/the same manifest hash. No Source function was executed on Root/actor/MCP/PC for that cross-check. Neither private/pure archives nor their members/logs/keys left the runner; no local Source files/dependencies/builds were used.
+
+Closed current receiver marker (bounded below4096 bytes):
+
+```json
+{"marker":"AFW_CUSTODY_POSTMORTEM_READBACK/1","observer":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"b1f124c69344df7d2abe79e573583f23205fe24e","tree":"cdad701305b28affac29540fd226859efa04684c","workflowBlob":"a03742d8850887b55999d8c72c6c6b25b091fd7f","run":"43437695014","attempt":1,"node":"22.23.4"},"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","controls":"b902864ec21f0d2eeb5b555f6988f3991646fc54e3ffd3a1130211017cb656ed","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},"producerResult":"success","artifactId":"14043724282","uploadedDigest":"b17cbdbadff1c9278646ad8f8bfa7927dcb7be41eabe9b48835c0ec84c76c543","status":"verified","reason":"none","inspectionComplete":true,"rawZipBytes":4150,"rawZipSha256":"b17cbdbadff1c9278646ad8f8bfa7927dcb7be41eabe9b48835c0ec84c76c543","resultSha256":"d91bbece4ffe69cc194a5062ede3f0cd6fca10e09b74d5e0b1de725910ea9506","manifestSha256":"53fda05d09ddf154f3fc0e8a866db245df869f6f919d57981b3a29a8820af0e1","historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Mandatory any-outcome restoration and prefix preservation:
+- Source remained frozen at b1f124c69344df7d2abe79e573583f23205fe24e through completed run and both terminal success jobs. Frozen lease, original rollback and SAME-report prefix were freshly rechecked.
+- Restoration commit31b8291ed89b85f198ffadabfd712028292ce264 has parent b1f124c69344df7d2abe79e573583f23205fe24e and EXACT pre-fix closed tree d58bae6436fb6d8dd690bff05eec1caa22cc38d6. CAS used expected tip and no force. Original F7 read back exact at f7a71f1a0fa4f5ddf069ff411f008a098455e5cc,126209 bytes,SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a.
+- Pre-append closure reads confirmed restoration commit0runs, one exact current attempt1, main0c9c475b3ebaa970fc11d628b40e50a90cceb727 unchanged, and queued/in_progress/waiting/requested/pending totals0.
+- This appends only the SAME report. ENTIRE prior189509 characters/189569 bytes remain an exact prefix, blob ab60f6a6f3f7a09b62c79630ae4cf8fd91e90e7f, SHA256578ce3586718472f4b74c19260aa8d21f021c908f1c11da3dd195ee93ad7c12a. Final3196 leaves/62 workflows; all other3195 original type/mode/blob identities, including original F7 and R1 report, remain exact.
+- Final append commit/tree/report blob/hash and fresh post-publication closure readbacks are returned to Root separately, avoiding self-referential hashes.
+
+Disposition: DONE_WITH_CONCERNS. The 23 controls and current diagnostic package verification passed; both actual retained OUTER receipts were rejected by the unchanged original success cap. inspectionComplete:true records completion of those two decisions. historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false. No Native/key/Cloudflare/runtime authority, repaired historical suite, PC-off acceptance or fix2 follows. STOP after final closure; no further Source work is released.
```
