# ONE scoped re-review — consolidated final whole-review fix wave

Read-only AFW ONLY. No subagents/tests/Sourceexecution/localfiles/clones/VM/deps, no private/purearchives oroldlogs/key, noNative/SDK/World/MF/CF/runtime/permissions/mail/mutation. ThisisSCOPEDFINALre-review, notanotherbroadwholeunitreview. Verdict eachI1/I2/I3andM1/M2, inspectnewbreakageinTHISfixdiffonly, outsideobservationsnonblockingseparate. ExactlyonefinalwaveandoneScopedrereview; Rootadjudicatesresidualafterthis, noautofixsecondwave.

## Authority/findings
Brief docs/superpowers/briefs/2026-11-13-custody-postmortem-final-wave.md; updatedSPEC docs/superpowers/specs/2026-11-13-custody-postmortem-design.md (includingactualdriverload-ordersettlement), originalfinalreview docs/superpowers/reviews/2026-11-13-custody-postmortem-whole-review.md. Baseoffinalwavef1a3d456dd4118edf155c7ecb60479d0881526bc; temporarycodebaseabb416f684a6d8e310876435566325e03fa53291; newinactive87ed16664d4acdfa5f3c59e957514415bd5fd6d3/actualc26aad47c44ded1dbf7c14ba743fcb22aebc7602; finalSource72c10833654aa7226d8376e95d767455e1c144b2.

- PM-F-I1Important: states[r.stage] coercesarraysbeforecheckingprimitiveSTRING/ownclosedenum; reachedDecisionstrictcan disagree. Addstrictguardandactualvalid-manifestpairarraynegative;Rootownobserverneedsanalogousindependentfix.
- PM-F-I2Important: drivercatchthrowsawayalreadyverifiedObserver+5hashesandmislabelsreceivercontrolfailureobserver_unavailable. Keepverifiedexpectedafterbootstrap;postbootstrapfaultinvalid_evidence+identity/nullraw/unsuccessful/zeroartifactread. Testbothactualbootstrap-nullandknown-postbootstrapfaultseams, no copiedoracle/importbeforeverification.
- PM-F-I3Important: originalAString(meta.workflow_run.id) permitswrongtypesbeforearchive. KeepAunchanged;safeintegermatchinghistoricruninmetadataBound; zeroarchivecounterstring/array/unsafe/mismatchnegative.
- PM-F-M1Minor: run-nameINACTIVE/commentbothfalsemisleadactivevariant; neutraltextsapprovedforbothphases.
- PM-F-M2Minor: metadata10s vswhole-download30sincludingheaders wording; clarifySPECwithoutchangingtransport.

## COMPLETE scoped Source fix diff,10hunks/fullcontext10/roundtripped
```diff
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -1,21 +1,21 @@
 name: AFW custody postmortem ZERO key
-run-name: AFW custody postmortem INACTIVE ${{ github.sha }}
+run-name: AFW custody postmortem ${{ github.sha }}
 on:
   workflow_dispatch:
 permissions:
   contents: read
   actions: read
 concurrency:
   group: afw-finite-budget-qualification
   cancel-in-progress: false
-# PREPARATION ONLY. Both jobs are literally false. Root gate is required before any run.
+# Execution requires the reviewed one-use Source trigger and guards.
 jobs:
   custody_inspect:
     if: ${{ false }}
     runs-on: ubuntu-24.04
     timeout-minutes: 7
     env:
       GH_ARTIFACT_TOKEN: ${{ github.token }}
     outputs:
       safe-id: ${{ steps.upload.outputs.artifact-id }}
       safe-digest: ${{ steps.upload.outputs.artifact-digest }}
@@ -383,20 +383,21 @@
            A.fields(t,['job','kind','artifactId','expectedBytes','expectedSha256','name','expiresAt']);const fixed=TARGETS.find(x=>x.job===t.job);need(fixed&&t.kind===fixed.kind&&t.artifactId===fixed.artifactId&&t.name===fixed.name&&t.expiresAt===fixed.expiresAt);need(Number.isSafeInteger(t.expectedBytes)&&t.expectedBytes>0&&t.expectedBytes<=136314880);A.hex(t.expectedSha256);return t;
           }
           function assertFixedTarget(t){validateDescriptor(t);assert.deepEqual(t,TARGETS.find(x=>x.job===t.job),'postmortem_fixed_target_rejected');}
           const fixedTargetIO=Object.freeze({
            metadata:async t=>{A.requireKeyless();assertFixedTarget(t);return A.metadata(t.artifactId);},
            raw:async t=>{A.requireKeyless();assertFixedTarget(t);return A.rawAssigned(t.artifactId,'generic-private');}
           });
           function blank(t){return {job:t.job,kind:t.kind,artifactId:t.artifactId,expectedBytes:t.expectedBytes,expectedSha256:t.expectedSha256,outcome:'unavailable',stage:'metadata_http',metadataVerified:false,rawVerified:false,zipVerified:false,fileCount:null,totalBytes:null,successReceiptCapAccepted:null};}
           function finish(r,stage,outcome){r.stage=stage;r.outcome=outcome;return r;}
           function metadataBound(meta,t){
+           need(meta&&typeof meta==='object'&&meta.workflow_run&&Number.isSafeInteger(meta.workflow_run.id)&&String(meta.workflow_run.id)===SUBJECT.run);
            A.validateAssignedMetadata(meta,{job:t.job,kind:t.kind,id:t.artifactId,zipSha256:t.expectedSha256},'generic-private');need(meta.size_in_bytes===t.expectedBytes&&meta.expires_at===t.expiresAt&&meta.name===t.name);
            for(const k of ['repository_id','head_repository_id'])if(Object.hasOwn(meta.workflow_run,k))need(Number.isSafeInteger(meta.workflow_run[k])&&meta.workflow_run[k]===1347578006);
           }
           function countsValid(r){return r&&typeof r==='object'&&!Array.isArray(r)&&Number.isSafeInteger(r.fileCount)&&r.fileCount>=1&&r.fileCount<=4096&&Number.isSafeInteger(r.totalBytes)&&r.totalBytes>=0&&r.totalBytes<=536870912;}
           export async function inspectTarget(target,io=fixedTargetIO){
            A.requireKeyless();validateDescriptor(target);const r=blank(target);let response;
            try{A.requireKeyless();response=await io.metadata(target);}catch{return r;}
            if(!response||response.status!==200)return r;
            try{metadataBound(response.value,target);}catch{return finish(r,'metadata_binding','rejected');}
            r.metadataVerified=true;let bytes;
@@ -420,21 +421,21 @@
             metadata_binding:['rejected',false,false,false,false,null],
             raw_download:['unavailable',true,false,false,false,null],
             raw_size:['rejected',true,false,false,false,null],
             raw_digest:['rejected',true,false,false,false,null],
             zip_decode:['rejected',true,true,false,false,null],
             receipt_json:['rejected',true,true,true,false,null],
             receipt_counts:['rejected',true,true,true,false,null],
             receipt_caps:['rejected',true,true,true,true,false],
             complete:['accepted',true,true,true,true,true]
            };
-           const s=states[r.stage];need(s&&r.outcome===s[0]&&r.metadataVerified===s[1]&&r.rawVerified===s[2]&&r.zipVerified===s[3]&&r.successReceiptCapAccepted===s[5]);
+           need(typeof r.stage==='string'&&Object.hasOwn(states,r.stage));const s=states[r.stage];need(s&&r.outcome===s[0]&&r.metadataVerified===s[1]&&r.rawVerified===s[2]&&r.zipVerified===s[3]&&r.successReceiptCapAccepted===s[5]);
            if(s[4]){need(countsValid(r));const inOriginal=r.fileCount<=512&&r.totalBytes<=134217728;need(inOriginal===s[5]);}else need(r.fileCount===null&&r.totalBytes===null);return r;
           }
           export function validateControls(v){
            A.fields(v,['diagnostic','zip','receiver']);
            for(const [key,ids]of Object.entries(CONTROL_IDS)){
             const g=v[key];A.fields(g,['expected','completed','passed','failed','inventory']);need(g.expected===ids.length&&Array.isArray(g.inventory)&&g.inventory.length===ids.length);
             let completed=0,passed=0,failed=0;g.inventory.forEach((x,n)=>{A.fields(x,['id','status']);need(x.id===ids[n]&&['passed','failed','not_executed'].includes(x.status));if(x.status!=='not_executed')completed++;if(x.status==='passed')passed++;if(x.status==='failed')failed++;});
             need(g.completed===completed&&g.passed===passed&&g.failed===failed&&g.completed===ids.length&&g.passed===ids.length&&g.failed===0);
            }
            return v;
@@ -446,20 +447,23 @@
           }
           export function makeResult(expected,targets,controls){
            const v={purpose:'afw.custody-postmortem.safe.v1',observer:expected.observer,subject:SUBJECT,programHashes:expected.programHashes,targets,controls,inspectionComplete:targets.every(reachedDecision),historicalCauseProven:false,receiptAuthenticated:false,...FLAGS};return validateResult(v,expected);
           }
           export function makeManifest(resultBytes,observer){
            validateContext(observer);need(Buffer.isBuffer(resultBytes)&&resultBytes.length>0&&resultBytes.length<=65536);return {purpose:'afw.custody-postmortem-manifest.safe.v1',source:observer.source,run:observer.run,attempt:1,files:[{path:'result.json',bytes:resultBytes.length,sha256:A.sha(resultBytes)}]};
           }
           NODE_POSTMORTEM_INSPECTOR
           cat >"$RUNNER_TEMP/afw-postmortem-controls.mjs" <<'NODE_POSTMORTEM_CONTROLS'
           import assert from 'node:assert/strict';
+          import {readFile} from 'node:fs/promises';
+          import {spawnSync} from 'node:child_process';
+          import {join} from 'node:path';
           import * as A from './afw-postmortem-adapter.mjs';
           import * as I from './afw-postmortem-inspector.mjs';
           import * as R from './afw-postmortem-receiver.mjs';
           import * as Z from './afw-postmortem-safe-zip.mjs';
           export const DIAGNOSTIC_IDS=Object.freeze(['postmortem_original_prefix_binding','postmortem_subject_observer_separation','postmortem_original_receipt_cap_boundaries','postmortem_stage_sequence','postmortem_metadata_failure_blocks_archive','postmortem_target_null_and_cap_coherence','postmortem_error_redaction']);
           export const RECEIVER_IDS=Object.freeze(['postmortem_pair_schema_manifest_binding','postmortem_route_direct_output_binding']);
           export const CONTROL_FAILURE_PREFIX='AFW_CUSTODY_POSTMORTEM_CONTROL_FAILURE/1';
           const FAILURE_GROUP_IDS=Object.freeze({diagnostic:DIAGNOSTIC_IDS,zip:Z.ZIP_CONTROL_IDS,receiver:RECEIVER_IDS});
           export function normalizeControlFailure(name,error){
            try{
@@ -479,20 +483,27 @@
            }catch{return null;}
           }
           export async function invokeControlGroup(name,callback,emit=()=>{}){
            if(typeof name!=='string'||!Object.hasOwn(FAILURE_GROUP_IDS,name)||typeof callback!=='function'||typeof emit!=='function')throw new Error('postmortem_controls_failed');
            try{return await callback();}
            catch(error){
             const summary=normalizeControlFailure(name,error);if(summary){const line=CONTROL_FAILURE_PREFIX+' '+JSON.stringify(summary);try{emit(line);}catch{}}
             throw new Error('postmortem_controls_failed');
            }
           }
+          let bootstrapFaultFixtureRuns=0;
+          async function checkCurrentDriverBootstrapFault(expected,fixture){
+           A.requireKeyless();I.validateExpected(expected);A.fields(fixture,['file','bytes','sha256','source','workflowBlob']);assert.equal(fixture.file,join(process.env.RUNNER_TEMP,'afw-postmortem-receiver-driver-fixture.mjs'));assert.equal(fixture.source,expected.observer.source);assert.equal(fixture.workflowBlob,expected.observer.workflowBlob);assert(Number.isSafeInteger(fixture.bytes)&&fixture.bytes>0&&fixture.bytes<=131072);A.hex(fixture.sha256);
+           const bytes=await readFile(fixture.file);assert.equal(bytes.length,fixture.bytes);assert.equal(A.sha(bytes),fixture.sha256);assert.equal(bootstrapFaultFixtureRuns,0);bootstrapFaultFixtureRuns++;
+           const env={GITHUB_REPOSITORY:'afw-inert-wrong-repository',RUNNER_TEMP:process.env.RUNNER_TEMP};assert.equal(Object.hasOwn(env,'GH_ARTIFACT_TOKEN'),false);assert.equal(Object.hasOwn(env,'AFW_SYN_CHECKPOINT_KEY'),false);A.requireKeyless();
+           const child=spawnSync(process.execPath,[fixture.file],{cwd:process.cwd(),env,stdio:['ignore','pipe','ignore'],timeout:5000,maxBuffer:16384,killSignal:'SIGKILL'});assert.equal(child.error,undefined);assert.equal(child.signal,null);assert(Number.isInteger(child.status)&&child.status!==0);assert(Buffer.isBuffer(child.stdout)&&child.stdout.length>0&&child.stdout.length<=16384);return I.parseCanonical(child.stdout,4096);
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
@@ -529,21 +540,21 @@
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
-            async()=>{const f=targetFixture();for(const change of [m=>{m.size_in_bytes++;},m=>{m.expires_at='2099-01-01T00:00:00Z';},m=>{m.workflow_run.repository_id=1;},m=>{m.workflow_run.head_repository_id=1;},m=>{m.digest='sha256:'+'0'.repeat(64);}]){let archiveCalls=0;const meta=structuredClone(f.meta);change(meta);const r=await I.inspectTarget(f.target,inertIO(f,{metadata:async()=>({status:200,value:meta}),raw:async()=>{archiveCalls++;return f.bytes;}}));assert.equal(r.stage,'metadata_binding');assert.equal(archiveCalls,0);}},
+            async()=>{const f=targetFixture();for(const change of [m=>{m.size_in_bytes++;},m=>{m.expires_at='2099-01-01T00:00:00Z';},m=>{m.workflow_run.repository_id=1;},m=>{m.workflow_run.head_repository_id=1;},m=>{m.digest='sha256:'+'0'.repeat(64);},m=>{m.workflow_run.id=I.SUBJECT.run;},m=>{m.workflow_run.id=[Number(I.SUBJECT.run)];},m=>{m.workflow_run.id=Number.MAX_SAFE_INTEGER+1;},m=>{m.workflow_run.id=Number(I.SUBJECT.run)+1;}]){let archiveCalls=0;const meta=structuredClone(f.meta);change(meta);const r=await I.inspectTarget(f.target,inertIO(f,{metadata:async()=>({status:200,value:meta}),raw:async()=>{archiveCalls++;return f.bytes;}}));assert.equal(r.stage,'metadata_binding');assert.equal(r.outcome,'rejected');assert.equal(r.fileCount,null);assert.equal(r.totalBytes,null);assert.equal(r.successReceiptCapAccepted,null);assert.equal(archiveCalls,0);}},
             ()=>{const t=completeTarget(I.TARGETS[0]);I.validateTargetRecord(t,I.TARGETS[0]);for(const change of [x=>{x.fileCount=null;},x=>{x.successReceiptCapAccepted=false;},x=>{x.rawVerified=false;},x=>{x.fileCount='512';},x=>{x.totalBytes=536870913;},x=>{x.extra=true;}]){const x=structuredClone(t);change(x);assert.throws(()=>I.validateTargetRecord(x,I.TARGETS[0]));}const rejected={...t,stage:'receipt_caps',outcome:'rejected',fileCount:513,successReceiptCapAccepted:false};I.validateTargetRecord(rejected,I.TARGETS[0]);assert.throws(()=>I.validateTargetRecord({...rejected,fileCount:1},I.TARGETS[0]));},
             async()=>{
              const f=targetFixture();for(const seam of ['metadata','raw']){const text='PRIVATE_ERROR_DO_NOT_PRINT';const r=await I.inspectTarget(f.target,inertIO(f,{[seam]:async()=>{throw Error(text);}}));assert(!JSON.stringify(r).includes(text));assert.equal(r.outcome,'unavailable');assert.equal(r.stage,seam==='metadata'?'metadata_http':'raw_download');I.validateTargetRecord(r,f.target);const extra={...r,extra:true};assert.throws(()=>I.validateTargetRecord(extra,f.target));const missing={...r};delete missing.fileCount;assert.throws(()=>I.validateTargetRecord(missing,f.target));}
              const idsByGroup={diagnostic:DIAGNOSTIC_IDS,zip:Z.ZIP_CONTROL_IDS,receiver:RECEIVER_IDS},flags=['historicalCauseProven','receiptAuthenticated',...Object.keys(I.FLAGS)];
              const failureGroup=(ids,index)=>group(ids,ids.map((id,n)=>({id,status:n<index?'passed':n===index?'failed':'not_executed'})));
              const exercise=async(name,error,shouldEmit)=>{
               const lines=[];await assert.rejects(()=>invokeControlGroup(name,async()=>{throw error;},line=>lines.push(line)),e=>e instanceof Error&&e.message==='postmortem_controls_failed'&&!Object.hasOwn(e,'controlGroup')&&!Object.hasOwn(e,'results'));
               assert.equal(lines.length,shouldEmit?1:0);if(!shouldEmit)return null;const line=lines[0];assert(line.startsWith(CONTROL_FAILURE_PREFIX+' '));assert(Buffer.byteLength(line)<=4096);assert(!line.includes('PRIVATE_ERROR_DO_NOT_PRINT'));const summary=JSON.parse(line.slice(CONTROL_FAILURE_PREFIX.length+1));A.fields(summary,['group','expected','completed','passed','failed','inventory',...flags]);assert.equal(summary.group,name);assert.equal(summary.expected,idsByGroup[name].length);assert.equal(summary.failed,1);assert.equal(summary.completed,summary.passed+1);for(const k of flags)assert.equal(summary[k],false);assert.deepEqual(summary,normalizeControlFailure(name,error));return summary;
              };
              for(const [name,ids]of Object.entries(idsByGroup)){
@@ -575,46 +586,56 @@
               await exercise(name,{controlGroup:good,results:good.inventory.slice(0,1)},false);
               if(name!=='zip')await exercise(name,{results:good.inventory.slice(0,1)},false);
               const lines=[];assert.equal(await invokeControlGroup(name,async()=>123,line=>lines.push(line)),123);assert.deepEqual(lines,[]);
              }
              const zipFull=failureGroup(Z.ZIP_CONTROL_IDS,1),zipPrefix=zipFull.inventory.slice(0,2);
              for(const mutate of [x=>{x[0].id='unknown';},x=>{x.reverse();},x=>{x[1].status='passed';},x=>{x[0].status='failed';},x=>{x[1].extra='PRIVATE_ERROR_DO_NOT_PRINT';},x=>{x.length=0;},x=>{x.push({id:Z.ZIP_CONTROL_IDS[2],status:'not_executed'});}]){const rows=structuredClone(zipPrefix);mutate(rows);await exercise('zip',{results:rows},false);}
              await exercise('unknown',{controlGroup:failureGroup(DIAGNOSTIC_IDS,0)},false);
             }
            ]);
           }
-          export async function runReceiverControls(){
+          export async function runReceiverControls(currentExpected,receiverDriver){
            return checks(RECEIVER_IDS,[
             ()=>{
              const {expected,result,files}=pairFixture();assert.deepEqual(R.validatePostmortemPair(files,expected),result);
              const mutate=change=>{const r=structuredClone(result);change(r);const rb=I.canonical(r),m=I.makeManifest(rb,expected.observer);assert.throws(()=>R.validatePostmortemPair(new Map([['result.json',rb],['manifest.json',I.canonical(m)]]),expected));};
              for(const change of [x=>{x.observer.source=I.SUBJECT.source;},x=>{x.targets[0].artifactId='999';},x=>{x.targets[0].fileCount='512';},x=>{x.targets[0].fileCount=null;},x=>{x.targets[0].successReceiptCapAccepted=null;},x=>{x.extra=true;},x=>{x.PCoff=true;},x=>{x.controls.zip.expected=16;}])mutate(change);
+             for(const stage of [['complete'],[],{},0,null,true,'toString','__proto__','constructor','unknown'])mutate(x=>{x.targets[0].stage=stage;x.inspectionComplete=false;});
+             mutate(x=>{Object.assign(x.targets[0],{stage:['receipt_caps'],outcome:'rejected',fileCount:513,successReceiptCapAccepted:false});x.inspectionComplete=false;});
              const bad=JSON.parse(files.get('manifest.json'));bad.files[0].sha256='0'.repeat(64);assert.throws(()=>R.validatePostmortemPair(new Map([['result.json',files.get('result.json')],['manifest.json',I.canonical(bad)]]),expected));assert.throws(()=>R.validatePostmortemPair(new Map([['result.json',files.get('result.json')]]),expected));
             },
             async()=>{
              const p=pairFixture(),bytes=fixtureZip(p.files),id='123',digest=A.sha(bytes),meta=currentMeta(p.expected,id,digest,bytes.length),good={custody_inspect:{result:'success',outputs:{'safe-id':id,'safe-digest':digest}}};let downloads=0;
              const io={metadata:async()=>({status:200,value:meta}),raw:async()=>{downloads++;return bytes;}};const read=await R.verifyPostmortemRoute(good,p.expected,io);assert.equal(read.status,'verified');assert.equal(read.inspectionComplete,true);assert.equal(downloads,1);assert.equal(read.historicalCauseProven,false);
              const unavailable=async(needs,reason,patch={})=>{downloads=0;const m=await R.verifyPostmortemRoute(needs,p.expected,{...io,...patch});assert.equal(m.status,'unavailable');assert.equal(m.reason,reason);assert.equal(m.inspectionComplete,false);assert.equal(m.resultSha256,null);assert(Buffer.byteLength(JSON.stringify(m))<=4096);return downloads;};
              assert.equal(await unavailable({},'invalid_evidence'),0);
              assert.equal(await unavailable({custody_inspect:{result:'failure',outputs:{}}},'needs_unsuccessful'),0);
              assert.equal(await unavailable({custody_inspect:{result:'success',outputs:{}}},'publication_unavailable'),0);
              assert.equal(await unavailable({custody_inspect:{result:'success',outputs:{'safe-id':id}}},'invalid_evidence'),0);
              assert.equal(await unavailable(good,'publication_unavailable',{metadata:async()=>({status:404,value:null})}),0);
              for(const bad of [{...meta,name:'afw-custody-postmortem-safe-'+I.SUBJECT.run+'-1'},{...meta,digest:'sha256:'+'0'.repeat(64)},{...meta,workflow_run:{...meta.workflow_run,head_sha:I.SUBJECT.source}}])assert.equal(await unavailable(good,'invalid_evidence',{metadata:async()=>({status:200,value:bad})}),0);
              await unavailable(good,'invalid_evidence',{raw:async()=>{const b=Buffer.from(bytes);b[0]^=1;return b;}});
              const corrupt=new Map(p.files);corrupt.set('manifest.json',Buffer.from('{}\n'));const badBytes=fixtureZip(corrupt),badDigest=A.sha(badBytes);await unavailable({custody_inspect:{result:'success',outputs:{'safe-id':id,'safe-digest':badDigest}}},'invalid_evidence',{metadata:async()=>({status:200,value:currentMeta(p.expected,id,badDigest,badBytes.length)}),raw:async()=>badBytes});
              const m=await R.verifyPostmortemRoute(good,null,io);assert.equal(m.reason,'observer_unavailable');
+             const assertUnavailable=(m,expected,reason)=>{A.fields(m,['marker','observer','programHashes','producerResult','artifactId','uploadedDigest','status','reason','inspectionComplete','rawZipBytes','rawZipSha256','resultSha256','manifestSha256','historicalCauseProven','receiptAuthenticated',...Object.keys(I.FLAGS)]);assert.equal(m.marker,'AFW_CUSTODY_POSTMORTEM_READBACK/1');assert.equal(m.status,'unavailable');assert.equal(m.reason,reason);assert.deepEqual(m.observer,expected?.observer??null);assert.deepEqual(m.programHashes,expected?.programHashes??null);for(const k of ['producerResult','artifactId','uploadedDigest','rawZipBytes','rawZipSha256','resultSha256','manifestSha256'])assert.equal(m[k],null);for(const k of ['inspectionComplete','historicalCauseProven','receiptAuthenticated',...Object.keys(I.FLAGS)])assert.equal(m[k],false);assert(Buffer.byteLength(JSON.stringify(m))<=4096);};
+             let needsCalls=0,metadataCalls=0,rawCalls=0;const blockedIO={metadata:async()=>{metadataCalls++;throw Error('PRIVATE_ERROR_DO_NOT_PRINT');},raw:async()=>{rawCalls++;throw Error('PRIVATE_ERROR_DO_NOT_PRINT');}};
+             const summaryLines=[],failedGroup=group(RECEIVER_IDS,RECEIVER_IDS.map((id,n)=>({id,status:n===0?'failed':'not_executed'})));
+             const knownFault=await R.orchestratePostmortemReceiver(currentExpected,{runControls:()=>invokeControlGroup('receiver',async()=>{throw Object.assign(new Error('PRIVATE_ERROR_DO_NOT_PRINT'),{controlGroup:failedGroup});},line=>summaryLines.push(line)),readNeeds:()=>{needsCalls++;return good;},io:blockedIO});
+             assertUnavailable(knownFault,currentExpected,'invalid_evidence');assert.equal(summaryLines.length,1);assert(!JSON.stringify(knownFault).includes('PRIVATE_ERROR_DO_NOT_PRINT'));assert.equal(needsCalls,0);assert.equal(metadataCalls,0);assert.equal(rawCalls,0);
+             const needsFault=await R.orchestratePostmortemReceiver(currentExpected,{runControls:async()=>{},readNeeds:()=>{throw Error('PRIVATE_ERROR_DO_NOT_PRINT');},io:blockedIO});assertUnavailable(needsFault,currentExpected,'invalid_evidence');assert.equal(metadataCalls,0);assert.equal(rawCalls,0);
+             downloads=0;const orchestrated=await R.orchestratePostmortemReceiver(p.expected,{runControls:async()=>{},readNeeds:()=>good,io});assert.equal(orchestrated.status,'verified');assert.equal(downloads,1);
+             const bootstrapFault=await checkCurrentDriverBootstrapFault(currentExpected,receiverDriver);assertUnavailable(bootstrapFault,null,'observer_unavailable');
             }
            ]);
           }
-          export async function runAllControls(expected,provenance,emit=()=>{}){
-           A.requireKeyless();const diagnostic=await invokeControlGroup('diagnostic',()=>runDiagnosticControls(expected,provenance),emit);A.requireKeyless();const zipInventory=await invokeControlGroup('zip',()=>Z.runZipControls(),emit);const zip=group(Z.ZIP_CONTROL_IDS,zipInventory);A.requireKeyless();const receiver=await invokeControlGroup('receiver',()=>runReceiverControls(),emit);return {diagnostic,zip,receiver};
+          export async function runAllControls(expected,provenance,emit=()=>{},receiverDriver){
+           A.requireKeyless();const diagnostic=await invokeControlGroup('diagnostic',()=>runDiagnosticControls(expected,provenance),emit);A.requireKeyless();const zipInventory=await invokeControlGroup('zip',()=>Z.runZipControls(),emit);const zip=group(Z.ZIP_CONTROL_IDS,zipInventory);A.requireKeyless();const receiver=await invokeControlGroup('receiver',()=>runReceiverControls(expected,receiverDriver),emit);return {diagnostic,zip,receiver};
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
@@ -745,20 +766,25 @@
           function knownDigest(v){return typeof v==='string'&&/^[a-f0-9]{64}$/.test(v)?v:null;}
           function closed(m){
            need(Buffer.byteLength(JSON.stringify(m))<=4096);return m;
           }
           function marker(expected,producerResult=null,artifactId=null,uploadedDigest=null){
            return {marker:'AFW_CUSTODY_POSTMORTEM_READBACK/1',observer:expected?.observer??null,programHashes:expected?.programHashes??null,producerResult,artifactId,uploadedDigest,status:'unavailable',reason:'invalid_evidence',inspectionComplete:false,rawZipBytes:null,rawZipSha256:null,resultSha256:null,manifestSha256:null,historicalCauseProven:false,receiptAuthenticated:false,...I.FLAGS};
           }
           export function unavailableMarker(){
            const m=marker(null);m.reason='observer_unavailable';return closed(m);
           }
+          export async function orchestratePostmortemReceiver(expected,{runControls,readNeeds,io=fixedReceiverIO}){
+           A.requireKeyless();I.validateExpected(expected);
+           try{need(typeof runControls==='function'&&typeof readNeeds==='function');await runControls();const needs=await readNeeds();return await verifyPostmortemRoute(needs,expected,io);}
+           catch{return closed(marker(expected));}
+          }
           export async function verifyPostmortemRoute(needs,expected,io=fixedReceiverIO){
            A.requireKeyless();try{I.validateExpected(expected);}catch{return unavailableMarker();}
            const m=marker(expected);let producer,outputs;
            try{A.fields(needs,['custody_inspect']);producer=needs.custody_inspect;A.fields(producer,['result','outputs']);need(['success','failure','cancelled','skipped'].includes(producer.result));m.producerResult=producer.result;need(producer.outputs&&typeof producer.outputs==='object'&&!Array.isArray(producer.outputs));outputs=producer.outputs;for(const key of Object.keys(outputs))need(['safe-id','safe-digest'].includes(key));m.artifactId=knownId(outputs['safe-id']);m.uploadedDigest=knownDigest(outputs['safe-digest']);}catch{return closed(m);}
            if(producer.result!=='success'){m.reason='needs_unsuccessful';return closed(m);}
            const absent=x=>x===undefined||x==='';
            if(absent(outputs['safe-id'])&&absent(outputs['safe-digest'])){m.reason='publication_unavailable';return closed(m);}
            if(m.artifactId===null||m.uploadedDigest===null)return closed(m);
            let response;
            try{A.requireKeyless();response=await io.metadata(m.artifactId);}catch{return closed(m);}
@@ -786,43 +812,46 @@
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
-           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"b902864ec21f0d2eeb5b555f6988f3991646fc54e3ffd3a1130211017cb656ed","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},programHashes={},programs={},provenance={},lines=source.split('\n');
+           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"8238fc7b78a729600b3dc5a8a6c1d5c68f88a9dcbe51c458a9902a54809b289b","inspector":"918da72545766a44d72d22b0b86ff04873edde73888653bbc366d70ce6585be8","receiver":"0b200c9e2ae1ab89baf361f2fc8de6da6a841ce6de570d3cc9532941d4accb4f"},programHashes={},programs={},provenance={},lines=source.split('\n');
            for(const [k,[marker,file]]of Object.entries(map)){
             const header='          cat >'+'"$RUNNER_TEMP/'+file+'" '+'<'+'<'+"'"+marker+"'",positions=lines.flatMap((s,n)=>s===header?[n]:[]);assert.equal(positions.length,1);const begin=positions[0]+1,ending=lines.flatMap((s,n)=>s==='          '+marker?[n]:[]);assert.equal(ending.length,1);assert(ending[0]>begin);const body=lines.slice(begin,ending[0]).map(s=>{assert(s.startsWith('          '));return s.slice(10);}).join('\n')+'\n';programs[k]=body;programHashes[k]=hash(body);assert.equal(programHashes[k],expectedHashes[k]);provenance[k]={bytes:Buffer.byteLength(body),sha256:programHashes[k]};
            }
            assert.equal(Object.keys(programHashes).length,5);assert.equal(new Set(Object.values(programHashes)).size,5);assert.equal(provenance.adapter.bytes,43451);assert.equal(programHashes.adapter,'a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3');assert.equal(provenance.safeZip.bytes,13305);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');
            const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);provenance.zip3={bytes:Buffer.byteLength(zip3),sha256:hash(zip3)};assert.equal(provenance.zip3.bytes,3380);assert.equal(provenance.zip3.sha256,'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
            const observer={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node},expected={observer,programHashes};
+           const driverTag='NODE_'+'POSTMORTEM_VERIFY',driverHeader='          node --input-type=module 2>/dev/null '+'<'+'<'+"'"+driverTag+"'",driverStarts=lines.flatMap((s,n)=>s===driverHeader?[n]:[]),driverEnds=lines.flatMap((s,n)=>s==='          '+driverTag?[n]:[]);assert.equal(driverStarts.length,1);assert.equal(driverEnds.length,1);assert(driverEnds[0]>driverStarts[0]+1);const driverSource=lines.slice(driverStarts[0]+1,driverEnds[0]).map(s=>{assert(s.startsWith('          '));return s.slice(10);}).join('\n')+'\n';
+           const receiverDriver={file:join(e.RUNNER_TEMP,'afw-postmortem-receiver-driver-fixture.mjs'),bytes:Buffer.byteLength(driverSource),sha256:hash(driverSource),source:observer.source,workflowBlob};
            const historicalBinding={"bindingRole":"historical-subject-reused-component-pins","context":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"b8497734abe5f6afdcc7c518e82a591438353f14","tree":"1c0e1a87fa759ea07dc117931c37258067d3b1c0","workflowBlob":"5eaf4f5e5497711e219999fa14c51501a82f94d2","run":"43414661211","attempt":1,"node":"22.23.4"},"sourcePins":{"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","controls":"afe050bdb5a35a0c727a2b949fba4a58a7e222f4ef12c8e86756d0e24f21d6b0","verifier":"c6fac92623809ee41b69ee77260b32d50c1149ba5716ca0a39b8b024d7dfb849","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}};
            keyless();for(const [k,[,file]]of Object.entries(map))await writeFile(join(e.RUNNER_TEMP,file),programs[k],{flag:'wx',mode:0o600});
            await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify(historicalBinding)+'\n',{flag:'wx',mode:0o600});await writeFile(join(e.RUNNER_TEMP,'afw-postmortem-observer.json'),JSON.stringify(expected)+'\n',{flag:'wx',mode:0o600});
-           return {expected,provenance};
+           await writeFile(receiverDriver.file,driverSource,{flag:'wx',mode:0o600});
+           return {expected,provenance,receiverDriver};
           }
           let phase='bootstrap';
           try{
-           const {expected,provenance}=await bootstrap();
+           const {expected,provenance,receiverDriver}=await bootstrap();
            const url=file=>pathToFileURL(join(process.env.RUNNER_TEMP,file)).href;
            const A=await import(url('afw-postmortem-adapter.mjs'));
            const I=await import(url('afw-postmortem-inspector.mjs'));
            const Z=await import(url('afw-postmortem-safe-zip.mjs'));
            const R=await import(url('afw-postmortem-receiver.mjs'));
            const C=await import(url('afw-postmortem-controls.mjs'));
            A.requireKeyless();I.validateExpected(expected);assert.deepEqual(A.CONTEXT,I.SUBJECT);phase='controls';
-           const controls=await C.runAllControls(expected,provenance,line=>console.log(line));
+           const controls=await C.runAllControls(expected,provenance,line=>console.log(line),receiverDriver);
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
@@ -884,39 +913,40 @@
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
-           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"b902864ec21f0d2eeb5b555f6988f3991646fc54e3ffd3a1130211017cb656ed","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},programHashes={},programs={},provenance={},lines=source.split('\n');
+           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"8238fc7b78a729600b3dc5a8a6c1d5c68f88a9dcbe51c458a9902a54809b289b","inspector":"918da72545766a44d72d22b0b86ff04873edde73888653bbc366d70ce6585be8","receiver":"0b200c9e2ae1ab89baf361f2fc8de6da6a841ce6de570d3cc9532941d4accb4f"},programHashes={},programs={},provenance={},lines=source.split('\n');
            for(const [k,[marker,file]]of Object.entries(map)){
             const header='          cat >'+'"$RUNNER_TEMP/'+file+'" '+'<'+'<'+"'"+marker+"'",positions=lines.flatMap((s,n)=>s===header?[n]:[]);assert.equal(positions.length,1);const begin=positions[0]+1,ending=lines.flatMap((s,n)=>s==='          '+marker?[n]:[]);assert.equal(ending.length,1);assert(ending[0]>begin);const body=lines.slice(begin,ending[0]).map(s=>{assert(s.startsWith('          '));return s.slice(10);}).join('\n')+'\n';programs[k]=body;programHashes[k]=hash(body);assert.equal(programHashes[k],expectedHashes[k]);provenance[k]={bytes:Buffer.byteLength(body),sha256:programHashes[k]};
            }
            assert.equal(Object.keys(programHashes).length,5);assert.equal(new Set(Object.values(programHashes)).size,5);assert.equal(provenance.adapter.bytes,43451);assert.equal(programHashes.adapter,'a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3');assert.equal(provenance.safeZip.bytes,13305);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');
            const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);provenance.zip3={bytes:Buffer.byteLength(zip3),sha256:hash(zip3)};assert.equal(provenance.zip3.bytes,3380);assert.equal(provenance.zip3.sha256,'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
            const observer={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node},expected={observer,programHashes};
+           const driverTag='NODE_'+'POSTMORTEM_VERIFY',driverHeader='          node --input-type=module 2>/dev/null '+'<'+'<'+"'"+driverTag+"'",driverStarts=lines.flatMap((s,n)=>s===driverHeader?[n]:[]),driverEnds=lines.flatMap((s,n)=>s==='          '+driverTag?[n]:[]);assert.equal(driverStarts.length,1);assert.equal(driverEnds.length,1);assert(driverEnds[0]>driverStarts[0]+1);const driverSource=lines.slice(driverStarts[0]+1,driverEnds[0]).map(s=>{assert(s.startsWith('          '));return s.slice(10);}).join('\n')+'\n';
+           const receiverDriver={file:join(e.RUNNER_TEMP,'afw-postmortem-receiver-driver-fixture.mjs'),bytes:Buffer.byteLength(driverSource),sha256:hash(driverSource),source:observer.source,workflowBlob};
            const historicalBinding={"bindingRole":"historical-subject-reused-component-pins","context":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"b8497734abe5f6afdcc7c518e82a591438353f14","tree":"1c0e1a87fa759ea07dc117931c37258067d3b1c0","workflowBlob":"5eaf4f5e5497711e219999fa14c51501a82f94d2","run":"43414661211","attempt":1,"node":"22.23.4"},"sourcePins":{"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","controls":"afe050bdb5a35a0c727a2b949fba4a58a7e222f4ef12c8e86756d0e24f21d6b0","verifier":"c6fac92623809ee41b69ee77260b32d50c1149ba5716ca0a39b8b024d7dfb849","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}};
            keyless();for(const [k,[,file]]of Object.entries(map))await writeFile(join(e.RUNNER_TEMP,file),programs[k],{flag:'wx',mode:0o600});
            await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify(historicalBinding)+'\n',{flag:'wx',mode:0o600});await writeFile(join(e.RUNNER_TEMP,'afw-postmortem-observer.json'),JSON.stringify(expected)+'\n',{flag:'wx',mode:0o600});
-           return {expected,provenance};
+           await writeFile(receiverDriver.file,driverSource,{flag:'wx',mode:0o600});
+           return {expected,provenance,receiverDriver};
           }
-          let output=null;
+          let output=null,verifiedExpected=null;
           try{
-           const {expected}=await bootstrap(),url=file=>pathToFileURL(join(process.env.RUNNER_TEMP,file)).href;
+           const {expected,receiverDriver}=await bootstrap();verifiedExpected=expected;const url=file=>pathToFileURL(join(process.env.RUNNER_TEMP,file)).href;
            const A=await import(url('afw-postmortem-adapter.mjs'));
            const I=await import(url('afw-postmortem-inspector.mjs'));
            const Z=await import(url('afw-postmortem-safe-zip.mjs'));
            const R=await import(url('afw-postmortem-receiver.mjs'));
            const C=await import(url('afw-postmortem-controls.mjs'));
            A.requireKeyless();I.validateExpected(expected);assert.deepEqual(A.CONTEXT,I.SUBJECT);
-           const receiverControls=await C.invokeControlGroup('receiver',()=>C.runReceiverControls(),line=>console.log(line));assert.equal(receiverControls.passed,2);
-           let needs;try{needs=JSON.parse(process.env.AFW_POSTMORTEM_NEEDS);}catch{needs=null;}
-           A.requireKeyless();output=await R.verifyPostmortemRoute(needs,expected);
+           output=await R.orchestratePostmortemReceiver(expected,{runControls:async()=>{const receiverControls=await C.invokeControlGroup('receiver',()=>C.runReceiverControls(expected,receiverDriver),line=>console.log(line));assert.equal(receiverControls.passed,2);},readNeeds:()=>JSON.parse(process.env.AFW_POSTMORTEM_NEEDS)});
           }catch{
-           output={marker:'AFW_CUSTODY_POSTMORTEM_READBACK/1',observer:null,programHashes:null,producerResult:null,artifactId:null,uploadedDigest:null,status:'unavailable',reason:'observer_unavailable',inspectionComplete:false,rawZipBytes:null,rawZipSha256:null,resultSha256:null,manifestSha256:null,historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+           output={marker:'AFW_CUSTODY_POSTMORTEM_READBACK/1',observer:verifiedExpected?.observer??null,programHashes:verifiedExpected?.programHashes??null,producerResult:null,artifactId:null,uploadedDigest:null,status:'unavailable',reason:verifiedExpected===null?'observer_unavailable':'invalid_evidence',inspectionComplete:false,rawZipBytes:null,rawZipSha256:null,resultSha256:null,manifestSha256:null,historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
           }
           const line=JSON.stringify(output);if(Buffer.byteLength(line)>4096)process.exitCode=1;else{console.log(line);process.exitCode=output.status==='verified'?0:1;}
           NODE_POSTMORTEM_VERIFY
```

## COMPLETE inactive→actualguard-onlydelta,roundtripped
```diff
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -1,24 +1,28 @@
 name: AFW custody postmortem ZERO key
 run-name: AFW custody postmortem ${{ github.sha }}
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
 # Execution requires the reviewed one-use Source trigger and guards.
 jobs:
   custody_inspect:
-    if: ${{ false }}
+    if: ${{ github.event_name == 'push' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.repository_id == '1347578006' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.workflow_ref == 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 && github.event.head_commit.message == 'AFW custody postmortem ZERO KEY final one use 20261113-87ed16664d4acdfa-01' }}
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
@@ -861,21 +865,21 @@
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
+    if: ${{ always() && github.event_name == 'push' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.repository_id == '1347578006' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.workflow_ref == 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 && github.event.head_commit.message == 'AFW custody postmortem ZERO KEY final one use 20261113-87ed16664d4acdfa-01' }}
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

## Actual covering evidence and independent Root observations

ONEnewrun43443934728/1/exactsourcec26:completedSUCCESS/exacttwojobsSUCCESS;all23namedcontrolspassed. RuntimecommandsSourceproducerC.runAllControls/currentreceiverR.orchestrate(C.invokeControlGroup→C.runReceiverControls);3extendedactualseamsandactualSource-derivedbootstrapfaultchildincluded. ChildstdoutvalidatedINMEMORYnotseparatelylogged; no fabricatedrealproductionfailureline. Source-deriveddriver9129B/fa6c...;max2hostedchildren/5s16KB/minimalwrongrepoenv/noGitHubtoken-noAFWkey/noNetwork/absoluteNode/fixedcwd/ignoredstdin-stderr/pre-importfailure. Nativeexecutions0. Currentstrict4150BSMALLSAFE14046442140/rawSHAb6444996..,2JSON+currentObserver/5bodyhashes/metadata-upload-bodydigesttriple/manifest/CRC/ranges/UTF8/canonical independentlyRootverified. ActualdeclaredOUTER103/354960272and96/344974155stilloriginal128MiBcaprejected; diagnosticcompletebutNOTAEAD/historyfirstcause/fullNative/AFW/PCoff. OriginalOTHERFF-I2openkey/Nativeholdunchanged.
```json
{
  "observation": {
    "source": "c26aad47c44ded1dbf7c14ba743fcb22aebc7602",
    "run": "43443934728",
    "artifactId": "14046442140",
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
    "closedReadback": {
      "source": "c26aad47c44ded1dbf7c14ba743fcb22aebc7602",
      "run": "43443934728",
      "artifactId": "14046442140",
      "status": "verified",
      "reason": "none",
      "transportVerified": true,
      "inspectionComplete": true,
      "historicalCauseProven": false,
      "receiptAuthenticated": false,
      "operationalReadiness": false,
      "PCoff": false
    },
    "controlLogEqualsSafe": true,
    "currentRunConclusion": "success",
    "all23ControlsPassed": true,
    "actualDriverFaultAndSharedKnownFaultCasesCovered": true,
    "actualNativeReleased": false,
    "NativeExecutions": 0,
    "hostedFaultFixtureChildrenMaximum": 2
  },
  "producer": {
    "jobId": 131948359112,
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
    "jobId": 131948494258,
    "markers": [
      {
        "marker": "AFW_CUSTODY_POSTMORTEM_READBACK/1",
        "observer": {
          "repository": "tokenizartinfo-ops/agent-friendly-web",
          "repositoryId": "1347578006",
          "ref": "refs/heads/feat/finite-native-cleanup-20261101",
          "source": "c26aad47c44ded1dbf7c14ba743fcb22aebc7602",
          "tree": "fb2e4eda5064278baa895912ef5b3aab01377398",
          "workflowBlob": "0c6555885685013c5f58d971736dd01bd5dc826d",
          "run": "43443934728",
          "attempt": 1,
          "node": "22.23.4"
        },
        "programHashes": {
          "adapter": "a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3",
          "inspector": "918da72545766a44d72d22b0b86ff04873edde73888653bbc366d70ce6585be8",
          "controls": "8238fc7b78a729600b3dc5a8a6c1d5c68f88a9dcbe51c458a9902a54809b289b",
          "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
          "receiver": "0b200c9e2ae1ab89baf361f2fc8de6da6a841ce6de570d3cc9532941d4accb4f"
        },
        "producerResult": "success",
        "artifactId": "14046442140",
        "uploadedDigest": "b6444996cc635eae507543736840fc043ce7785cfa8db9babe5e56b02d88f12b",
        "status": "verified",
        "reason": "none",
        "inspectionComplete": true,
        "rawZipBytes": 4150,
        "rawZipSha256": "b6444996cc635eae507543736840fc043ce7785cfa8db9babe5e56b02d88f12b",
        "resultSha256": "b3a27ef6953f1219bea22b80f4d99871887cafc0fcc4572352056f060f5c053c",
        "manifestSha256": "cbcfe3cc95ae3d134e5674205f74519faaa20dd2c0dc9f6413db93e3a3320575",
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
  "safe": {
    "id": "14046442140",
    "zipBytes": 4150,
    "zipSha256": "b6444996cc635eae507543736840fc043ce7785cfa8db9babe5e56b02d88f12b",
    "completeInventory": true,
    "crcKnownVector": true,
    "files": [
      {
        "name": "manifest.json",
        "bytes": 260,
        "sha256": "cbcfe3cc95ae3d134e5674205f74519faaa20dd2c0dc9f6413db93e3a3320575",
        "crc32": "c4f08f38",
        "value": {
          "purpose": "afw.custody-postmortem-manifest.safe.v1",
          "source": "c26aad47c44ded1dbf7c14ba743fcb22aebc7602",
          "run": "43443934728",
          "attempt": 1,
          "files": [
            {
              "path": "result.json",
              "bytes": 3636,
              "sha256": "b3a27ef6953f1219bea22b80f4d99871887cafc0fcc4572352056f060f5c053c"
            }
          ]
        }
      },
      {
        "name": "result.json",
        "bytes": 3636,
        "sha256": "b3a27ef6953f1219bea22b80f4d99871887cafc0fcc4572352056f060f5c053c",
        "crc32": "c76cf48e",
        "value": {
          "purpose": "afw.custody-postmortem.safe.v1",
          "observer": {
            "repository": "tokenizartinfo-ops/agent-friendly-web",
            "repositoryId": "1347578006",
            "ref": "refs/heads/feat/finite-native-cleanup-20261101",
            "source": "c26aad47c44ded1dbf7c14ba743fcb22aebc7602",
            "tree": "fb2e4eda5064278baa895912ef5b3aab01377398",
            "workflowBlob": "0c6555885685013c5f58d971736dd01bd5dc826d",
            "run": "43443934728",
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
            "inspector": "918da72545766a44d72d22b0b86ff04873edde73888653bbc366d70ce6585be8",
            "controls": "8238fc7b78a729600b3dc5a8a6c1d5c68f88a9dcbe51c458a9902a54809b289b",
            "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
            "receiver": "0b200c9e2ae1ab89baf361f2fc8de6da6a841ce6de570d3cc9532941d4accb4f"
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
  "artifactMetadata": {
    "artifacts": [
      {
        "id": 14046442140,
        "name": "afw-custody-postmortem-safe-43443934728-1",
        "size_in_bytes": 4150,
        "url": "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/14046442140",
        "archive_download_url": "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/14046442140/zip",
        "expired": false,
        "created_at": "2026-11-13T14:34:17Z",
        "expires_at": "2026-11-20T14:34:16Z",
        "updated_at": "2026-11-13T14:34:17Z",
        "digest": "sha256:b6444996cc635eae507543736840fc043ce7785cfa8db9babe5e56b02d88f12b",
        "workflow_run": {
          "id": 43443934728,
          "repository_id": 1347578006,
          "head_repository_id": 1347578006,
          "head_branch": "feat/finite-native-cleanup-20261101",
          "head_sha": "c26aad47c44ded1dbf7c14ba743fcb22aebc7602"
        }
      }
    ]
  },
  "bodyHashes": {
    "source": {
      "bytes": 129774,
      "sha256": "f2c99adfa0182e0b6fa026054c7ef7f8b8106f735da2bb3f5ee28e6c44f35a70",
      "gitBlob": "a417f040f2c191d69834e7a46014d61337a2da03"
    },
    "programs": {
      "adapter": {
        "bytes": 43451,
        "sha256": "a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3"
      },
      "inspector": {
        "bytes": 10797,
        "sha256": "918da72545766a44d72d22b0b86ff04873edde73888653bbc366d70ce6585be8"
      },
      "controls": {
        "bytes": 24974,
        "sha256": "8238fc7b78a729600b3dc5a8a6c1d5c68f88a9dcbe51c458a9902a54809b289b"
      },
      "safeZip": {
        "bytes": 13305,
        "sha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
      },
      "receiver": {
        "bytes": 5949,
        "sha256": "0b200c9e2ae1ab89baf361f2fc8de6da6a841ce6de570d3cc9532941d4accb4f"
      }
    },
    "driver": {
      "bytes": 9129,
      "sha256": "fa6c078dcaa4a42fc37a68316de1f7ae992c1c9209528df8dec87219d8a38ef7"
    }
  },
  "closure": {
    "source": "72c10833654aa7226d8376e95d767455e1c144b2",
    "tree": "c6f985fa5dea6771442e835e38ed6754031dd7c1",
    "prior3195LeavesExact": true,
    "leaves": 3196,
    "soleNewReport": "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
    "reportSha": "ac1b323410baa2319ada28c32b4a153e8fddd21c",
    "reportChars": 224620,
    "F7exact": true,
    "mainUnchanged": true,
    "runId": "43443934728",
    "runSource": "c26aad47c44ded1dbf7c14ba743fcb22aebc7602",
    "runCompleted": true,
    "allDeclaredJobsTerminal": true,
    "declaredJobs": 2,
    "fiveBranchActiveStatusesZero": true,
    "all62WorkflowBlobsExact": true,
    "providerRuntimeRead": false,
    "operationalReadiness": false,
    "PCoff": false,
    "preWaveTreeExact": true,
    "oneCurrentAttempt": true,
    "closedCommitRuns": 0,
    "prefixChars": 204637
  },
  "reportHashes": {
    "bytes": 224684,
    "sha256": "75e775709e5dd61087622b19f122fcac4eb6d5f038a606d2845d1b63c75b3e75",
    "gitBlob": "ac1b323410baa2319ada28c32b4a153e8fddd21c"
  },
  "RootObserverFixTests": {
    "oldCounterexampleConfirmed": true,
    "currentStrictSafePositive": 1,
    "negativeRejected": 6,
    "metadataFixturesOnly": true,
    "SourceExecuted": false,
    "actualEvidenceUnchanged": true
  }
}
```

## Root-owned metadata observer correction (notSourceimplementation)

Whole-reviewfoundanalogousstagecoercionRootacknowledged: oldtypedmetadatafixturearraymetadata_httpaccepted; strictstringguardaddedandtestedCURRENTactualSAFEpositive+6invalidstagecasesreject. NoSourceexecutedforthese; allcurrentobservationsunchanged. Exactownfunctionchange:
```diff
-must(Object.hasOwn(patterns,t.stage),'stage enum');
+must(typeof t.stage==='string'&&Object.hasOwn(patterns,t.stage),'stage enum');
```

## COMPLETE appended covering-report andclosure diff,8context/roundtripped
```diff
--- a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
+++ b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
@@ -1554,8 +1554,134 @@
 Mandatory any-outcome restoration and prefix preservation:
 - Source remained frozen at b1f124c69344df7d2abe79e573583f23205fe24e through completed run and both terminal success jobs. Frozen lease, original rollback and SAME-report prefix were freshly rechecked.
 - Restoration commit31b8291ed89b85f198ffadabfd712028292ce264 has parent b1f124c69344df7d2abe79e573583f23205fe24e and EXACT pre-fix closed tree d58bae6436fb6d8dd690bff05eec1caa22cc38d6. CAS used expected tip and no force. Original F7 read back exact at f7a71f1a0fa4f5ddf069ff411f008a098455e5cc,126209 bytes,SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a.
 - Pre-append closure reads confirmed restoration commit0runs, one exact current attempt1, main0c9c475b3ebaa970fc11d628b40e50a90cceb727 unchanged, and queued/in_progress/waiting/requested/pending totals0.
 - This appends only the SAME report. ENTIRE prior189509 characters/189569 bytes remain an exact prefix, blob ab60f6a6f3f7a09b62c79630ae4cf8fd91e90e7f, SHA256578ce3586718472f4b74c19260aa8d21f021c908f1c11da3dd195ee93ad7c12a. Final3196 leaves/62 workflows; all other3195 original type/mode/blob identities, including original F7 and R1 report, remain exact.
 - Final append commit/tree/report blob/hash and fresh post-publication closure readbacks are returned to Root separately, avoiding self-referential hashes.
 
 Disposition: DONE_WITH_CONCERNS. The 23 controls and current diagnostic package verification passed; both actual retained OUTER receipts were rejected by the unchanged original success cap. inspectionComplete:true records completion of those two decisions. historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false. No Native/key/Cloudflare/runtime authority, repaired historical suite, PC-off acceptance or fix2 follows. STOP after final closure; no further Source work is released.
+
+
+## 2026-11-13 — Single final whole-review wave: ONE covering run, 23 passes, actual receiver-boundary fixtures and exact restoration
+
+Evidence dated 2026-11-13 14:37:21 UTC. The single final-wave covering run completed successfully with the existing23 controls, including the actual current-driver bootstrap child and shared post-bootstrap fault path. The current diagnostic package was independently verified. Both retained OUTER receipts again reached an unchanged original success-cap rejection. All seven nonclaims remain false: historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified. This is not Native/coherent-suite/AEAD/inner-inventory/drain/PC-off acceptance. Original FF-I2 and key-bearing Native holds remain OPEN.
+
+Authority and Source:
+- Whole-review final batch/spec/brief at Root docs d2ef8d9690ddda533855c6d62cef7e1c78e075d9; PM-F-I2 load-order/child settlement at f97ab711f3bbf5c6a604ef6bf571a391f0273753; inactive gate 3016a2d5575d9f5dd1135a46af0feea7eb2de250; exact ONE-run release12da5256505137cb22837a0d0b0d4cfd1f8d8e6a, docs/superpowers/briefs/2026-11-13-custody-postmortem-final-wave-one-run-release.md.
+- PROJECT AFW; repo tokenizartinfo-ops/agent-friendly-web ID1347578006; Source feat/finite-native-cleanup-20261101; GitHub API/GitDB/Actions only. Pre-wave closed Source f1a3d456dd4118edf155c7ecb60479d0881526bc/tree5c91e72178287f079607234f2a546641c014a7cc.
+- Inactive final-wave candidate87ed16664d4acdfa5f3c59e957514415bd5fd6d3/tree081b53b7920c5c9781ec03991a787df259145189/F7a417f040f2c191d69834e7a46014d61337a2da03,129774B,SHA256f2c99adfa0182e0b6fa026054c7ef7f8b8106f735da2bb3f5ee28e6c44f35a70. Root reviewed the entire scoped diff against prior inactive abb416f and all current Source/context/hash/scalar/expression boundaries. Only F7 changed in the new commit; entire report204637-character prefix and all other3195 leaves stayed exact.
+- Active overlay c26aad47c44ded1dbf7c14ba743fcb22aebc7602, parent87ed16664d4acdfa5f3c59e957514415bd5fd6d3, treefb2e4eda5064278baa895912ef5b3aab01377398, F70c6555885685013c5f58d971736dd01bd5dc826d,130908B,SHA25641f74889f7eee5d9c601405917ccf950fd8e7d26844ae5f78c5d0d69e84b6c87.
+- Exact consumed message: AFW custody postmortem ZERO KEY final one use 20261113-87ed16664d4acdfa-01. Whole active delta was only fixed Source-branch/self-F7 push trigger and the two complete one-use guards. Five bodies, inline code/driver fixture/neutral texts and all other bytes stayed exact.
+- Main remained0c9c475b3ebaa970fc11d628b40e50a90cceb727; no main/PR/merge, Cloudflare/runtime, OAuth/OTP/token/permission, AFW-environment, real-key, Native, World/SDK/MF or owner-data action was performed.
+
+Five current Source body hashes (adapter43451B; inspector10797B; controls24974B; safeZip13305B; receiver5949B):
+
+| Body | SHA256 |
+|---|---|
+| adapter | a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3 |
+| inspector | 918da72545766a44d72d22b0b86ff04873edde73888653bbc366d70ce6585be8 |
+| controls | 8238fc7b78a729600b3dc5a8a6c1d5c68f88a9dcbe51c458a9902a54809b289b |
+| safeZip | b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d |
+| receiver | 0b200c9e2ae1ab89baf361f2fc8de6da6a841ce6de570d3cc9532941d4accb4f |
+
+Original adapter43451B/a1e7, SAFEZIP13305B/b36 and embedded ZIP3 3380B/SHA2564ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8 remain byte-exact. Public schemas remain13 TargetRecord/14 Result/20 ReadbackMarker/9 Context; programHashes has exactlyfive keys. Historical Subject stays b8497734abe5f6afdcc7c518e82a591438353f14/tree1c0e1a87fa759ea07dc117931c37258067d3b1c0/F75eaf4f5e5497711e219999fa14c51501a82f94d2/run43414661211/attempt1/Node22.23.4. Current Observer is the exact c26aad47.../fb2e4eda.../0c655588.../run43443934728/attempt1/Node22.23.4 in the closed marker below. No Subject/current-Observer identity spoofing.
+
+Actual run/commands/output:
+- [Run43443934728](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43443934728), push/attempt1/exact Source/ref/path; created2026-11-13T14:34:04Z, completed/success, updated2026-11-13T14:34:28Z. Exactly one run for this activation commit; no retry or extra attempt.
+- custody_inspect job131948359112 completed/success, including fixed-keyless Source, checkout, Node22.23.4, body preservation, controls/inspection and upload. verify job131948494258 completed/success, including its independent receiver. Source stayed frozen through both terminal jobs and completed run.
+- Actual producer Node driver invoked C.runAllControls(expected,provenance,line=>console.log(line),receiverDriver). Complete controls marker at2026-11-13T14:34:12.7785914Z reported diagnostic7/7/7 failed0, ZIP14/14/14 failed0, receiver2/2/2 failed0 with exact23 ordered IDs passed. Only then were the two fixed retained archives inspected sequentially.
+- Actual independent receiver invoked R.orchestratePostmortemReceiver(expected,{runControls,readNeeds}), whose runControls invokes C.invokeControlGroup('receiver',()=>C.runReceiverControls(expected,receiverDriver),line=>console.log(line)) and asserts passed2. The same shared Receiver entry is exercised by the post-bootstrap fault fixture; production does not use a duplicate fixture oracle.
+- Collection marker at2026-11-13T14:34:16.1945384Z reported inspectionComplete:true and positive_prepare/reduction_prepare both receipt_caps/rejected, with all seven nonclaims false. No real control-failure summary was emitted. Successful process/job status proves collection/current package validation, not original-cap acceptance.
+
+Actual23 inventory (unchanged7+14+2; new covering cases remain inside existing IDs):
+
+| Group | Fixed ID | Status |
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
+Exact complete controls JSON from the bounded current producer marker:
+
+```json
+{"diagnostic":{"expected":7,"completed":7,"passed":7,"failed":0,"inventory":[{"id":"postmortem_original_prefix_binding","status":"passed"},{"id":"postmortem_subject_observer_separation","status":"passed"},{"id":"postmortem_original_receipt_cap_boundaries","status":"passed"},{"id":"postmortem_stage_sequence","status":"passed"},{"id":"postmortem_metadata_failure_blocks_archive","status":"passed"},{"id":"postmortem_target_null_and_cap_coherence","status":"passed"},{"id":"postmortem_error_redaction","status":"passed"}]},"zip":{"expected":14,"completed":14,"passed":14,"failed":0,"inventory":[{"id":"zip_valid_store_crc_vector","status":"passed"},{"id":"zip_valid_deflate","status":"passed"},{"id":"zip_signed_unsigned_descriptors","status":"passed"},{"id":"zip_wrong_size","status":"passed"},{"id":"zip_wrong_upload_sha","status":"passed"},{"id":"zip_wrong_metadata_sha","status":"passed"},{"id":"zip_extra_entry","status":"passed"},{"id":"zip_duplicate_entry","status":"passed"},{"id":"zip_traversal_entry","status":"passed"},{"id":"zip_symlink","status":"passed"},{"id":"zip_bad_crc","status":"passed"},{"id":"zip_noncontiguous_ranges","status":"passed"},{"id":"zip_declared_and_inflate_caps","status":"passed"},{"id":"download_stream_redirect_auth_bounds","status":"passed"}]},"receiver":{"expected":2,"completed":2,"passed":2,"failed":0,"inventory":[{"id":"postmortem_pair_schema_manifest_binding","status":"passed"},{"id":"postmortem_route_direct_output_binding","status":"passed"}]}}
+```
+
+Consolidated final batch covering evidence:
+
+1. PM-F-I1 primitive stage/own enum: actual validateTargetRecord now requires typeof stage==='string' and Object.hasOwn(states,stage) before lookup. The passed postmortem_pair_schema_manifest_binding control rebuilt a valid result+manifest for one-element array stages and other invalid types/unknown or inherited enum names. Array fixtures set inspectionComplete:false and keep the other old-coercion state fields coherent, so the negative is not masked by a downstream inspection-flag inconsistency. It also checks a receipt_caps-array rejected record with valid counts and rebuilt manifest. No extra target field was invented, and no cap/schema was loosened. Prior Source was not executed to claim a synthetic RED result.
+
+2. PM-F-I3 historic metadata run ID: the new wrapper requires Number.isSafeInteger(meta.workflow_run.id) and exact String(id)===SUBJECT.run before original A.validateAssignedMetadata and before raw access. The passed postmortem_metadata_failure_blocks_archive control exercised string ID, one-element array ID, unsafe number and mismatched number through actual inspectTarget fixture I/O. Each required metadata_binding/rejected, null fileCount/totalBytes/cap flag, and archive counter0. Original Adapter bytes were unchanged.
+
+3. PM-F-I2 actual bootstrap-unavailable branch: both existing verified bootstraps extracted the EXACT CURRENT receiver JS driver from its existing NODE_POSTMORTEM_VERIFY block, using unique Source markers/10-space depad/LF after full workflow Gitblob/current context/five-body verification. They wrote a runner-temp .mjs copy and returned private source-derived byte/hash provenance. Current driver body9129B/SHA256fa6c078dcaa4a42fc37a68316de1f7ae992c1c9209528df8dec87219d8a38ef7 stayed identical across inactive/active overlays; no sixth Source body/heredoc/public hash key was added.
+   The existing postmortem_route_direct_output_binding callback re-read and verified written driver bytes/hash against that private provenance, Source/WorkflowBlob and actual current expected; then called the exact current driver through this Source-bound API command:
+
+```text
+spawnSync(process.execPath,[fixture.file],{
+  cwd:process.cwd(),
+  env:{GITHUB_REPOSITORY:'afw-inert-wrong-repository',RUNNER_TEMP:process.env.RUNNER_TEMP},
+  stdio:['ignore','pipe','ignore'],
+  timeout:5000,
+  maxBuffer:16384,
+  killSignal:'SIGKILL'
+})
+```
+
+   Absolute Node/current checkout cwd were used; stdin and stderr ignored; stdout bounded16384B; timeout5s. The minimal two-entry allowlist omitted GH_ARTIFACT_TOKEN and AFW_SYN_CHECKPOINT_KEY. The known wrong repository fails the first repo assertion immediately after key absence, before Git/file reads, dynamic Source-helper imports or API requests. The passed callback required no child.error, null signal, nonzero exit, and exactly one canonical closed marker<=4096B. That parsed marker had observer_unavailable/null identity, hashes, producer outcome, IDs and raw claims, inspectionComplete:false and all seven nonclaims:false.
+   One-per-process guard and the two actual receiver-controls invocation paths permit exactlytwo hosted children here: one in producer controls, one in the successful independent receiver controls. The child itself fails before helper imports and cannot recurse into controls. Child stdout was validated in memory and was not separately persisted/logged; evidence is the passed existing control/current Source-bound driver and successful independent receiver, not an invented extra test ID/count. No Source ran on Root/actor/MCP/PC.
+
+4. PM-F-I2 known post-bootstrap branch: actual driver retains verifiedExpected outside its catch; any later outer failure selects invalid_evidence with that verified Observer/five hashes, while only absence of verified bootstrap expected uses null observer_unavailable. The same production R.orchestratePostmortemReceiver function was called in the existing receiver fixture with actual current verified expected and a throwing control callback through the shared bounded invocation wrapper. It required retained exact Observer/fivehashes, unavailable/invalid_evidence, inspectionComplete:false, null artifact/raw/result/manifest claims, seven false nonclaims, one captured sanitized fixed control summary, lazy-needs calls0, artifact-metadata calls0 and raw calls0. A lazy-needs exception also retained known identity and zero artifact I/O; an inert valid route exercised the shared success path. These fixtures do not construct a replacement receiver oracle.
+
+5. PM-F-M1: run-name is phase-neutral AFW custody postmortem plus existing github.sha expression; comment exactly Execution requires the reviewed one-use Source trigger and guards. Root approved these two outside-run text changes before the separate activation delta.
+6. PM-F-M2: documentation clarified the existing budgets: metadata HTTP request10s; one whole generic-private download deadline30s INCLUDING archive-response headers. There is no separate archive-header10s deadline. Original transport code, raw/expanded/JSON caps and timeouts stayed exact; this wave introduced no transport change.
+7. Root's separate metadata-only observer type fix was Root-owned; Source actor did not edit Root docs. Original CP-I1/CP-I2 closed-schema/redacted-failure inventory behavior remains covered inside the passed controls.
+
+Current typed target facts:
+
+| Target | Artifact ID | Stage | Outcome | Unauthenticated OUTER fileCount | Unauthenticated OUTER totalBytes | Original success cap accepted |
+|---|---:|---|---|---:|---:|---|
+| positive_prepare | 14032036855 | receipt_caps | rejected | 103 | 354960272 | false |
+| reduction_prepare | 14032480638 | receipt_caps | rejected | 96 | 344974155 | false |
+
+For both current records metadataVerified/rawVerified/zipVerified are true. Fixed exact historical metadata, safe-integer run identity, expected raw sizes/digest triple and unchanged ZIP3 checks completed; compact fatal-UTF8 receipt syntax/numeric bounds were checked before original success-kind cap validation. Counts103/96 are within the unchanged512-file success cap, but observed totalBytes354960272/344974155 exceed unchanged134217728 bytes/128MiB. Both cap decisions are rejected; counts are preserved truthfully. These are unauthenticated OUTER receipt observations after retained encrypted ZIP integrity/CRC checks, not decrypted inner inventory or AEAD proof. No plaintext, private members/listing, key, SDK/World/MF/Native or namespace/drain operation was exposed/performed.
+
+The repeated present cap rejection is a current compatibility blocker. It does not prove the first historical exception, the historical immediate-postupload HTTP/metadata/ZIP behavior, a repaired old suite, or readonly's separate seal/missing-artifact cause. Earlier failed run43433569894 and its unknown first failed callback remain immutable evidence; no historical rerun was made.
+
+Current bounded SMALLSAFE:
+- Sole artifact14046442140/exact name afw-custody-postmortem-safe-43443934728-1/raw4150B, uploaded/API/body SHA256b6444996cc635eae507543736840fc043ce7785cfa8db9babe5e56b02d88f12b, created2026-11-13T14:34:17Z/expires2026-11-20T14:34:16Z/expired:false; current Sourcec26aad47.../run43443934728/repository IDs1347578006.
+- Exactly result.json3636B/SHA256b3a27ef6953f1219bea22b80f4d99871887cafc0fcc4572352056f060f5c053c and manifest.json260B/SHA256cbcfe3cc95ae3d134e5674205f74519faaa20dd2c0dc9f6413db93e3a3320575, combined3896B. Independent current receiver verified direct assignment, exact current metadata/name/provenance, strict ZIP/ranges/CRC, canonical pair/schema/typed targets/controls and full manifest.
+- Root independently downloaded ONLY this current4150B SAFE and validated the whole current pair, context/fivehashes/target facts and closed receiver. Actor downloaded no artifact. Metadata-only reconstruction from current controls/closed context+hashes and Root's typed numeric facts reproduced exact3636B/result hash and260B/manifest hash. No Source function was evaluated/imported on Root/actor/MCP/PC. No historical private/pure archive bytes, members, logs or keys were retrieved there; retained target cipher bytes stayed on hosted runner.
+
+Exact closed current receiver:
+
+```json
+{"marker":"AFW_CUSTODY_POSTMORTEM_READBACK/1","observer":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"c26aad47c44ded1dbf7c14ba743fcb22aebc7602","tree":"fb2e4eda5064278baa895912ef5b3aab01377398","workflowBlob":"0c6555885685013c5f58d971736dd01bd5dc826d","run":"43443934728","attempt":1,"node":"22.23.4"},"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","inspector":"918da72545766a44d72d22b0b86ff04873edde73888653bbc366d70ce6585be8","controls":"8238fc7b78a729600b3dc5a8a6c1d5c68f88a9dcbe51c458a9902a54809b289b","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","receiver":"0b200c9e2ae1ab89baf361f2fc8de6da6a841ce6de570d3cc9532941d4accb4f"},"producerResult":"success","artifactId":"14046442140","uploadedDigest":"b6444996cc635eae507543736840fc043ce7785cfa8db9babe5e56b02d88f12b","status":"verified","reason":"none","inspectionComplete":true,"rawZipBytes":4150,"rawZipSha256":"b6444996cc635eae507543736840fc043ce7785cfa8db9babe5e56b02d88f12b","resultSha256":"b3a27ef6953f1219bea22b80f4d99871887cafc0fcc4572352056f060f5c053c","manifestSha256":"cbcfe3cc95ae3d134e5674205f74519faaa20dd2c0dc9f6413db93e3a3320575","historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Mandatory restoration and Source preservation:
+- After completed run and both terminal-success jobs, frozen Sourcec26aad47c44ded1dbf7c14ba743fcb22aebc7602, original rollback and unchanged full report prefix were freshly checked.
+- Restoration e6d3d9420613ac30f10a1dccb472fce486f858d4 has parentc26aad47c44ded1dbf7c14ba743fcb22aebc7602 and EXACT pre-wave tree5c91e72178287f079607234f2a546641c014a7cc. CAS used expected tip/no force. Original F7 read back byte-exact f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209B/SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a.
+- Pre-append closure snapshot: restoration0runs, current activation exactlyone attempt1/completed run, main0c9c475b3ebaa970fc11d628b40e50a90cceb727 unchanged, queued/in_progress/waiting/requested/pending all0.
+- This appends ONLY the SAME report, preserving ENTIRE prior204637 characters/204699B exact prefix, prior blob68ae6784afe4cc05a55b737a564e8ca07a0b58b6/SHA25616975ae51a8ca2f0fd357500ff89def3aab8bc836284c1ad0ef94315b5fad62b. Final3196 leaves/62 workflows; all other3195 original type/mode/blob identities, including original F7/R1, remain exact.
+- Final append commit/tree/report blob/hash and fresh post-publication closure readbacks are returned separately to Root to avoid self-referential hashes.
+
+Disposition: DONE_WITH_CONCERNS. Single final-wave covering run passed23 controls and current package verification; two original-cap rejections remain valid current OUTER observations. inspectionComplete:true denotes those two decisions completed. All seven nonclaims stayfalse; key/Native/FF-I2 holds unchanged. ONE scoped final re-review is pending Root; no second final fix wave, retry, autofix, broad suite, Native/key/Cloudflare action or PC-off claim is authorized. STOP after final closure.
```

Rootconfirmedrestoree6d3d9420613ac30f10a1dccb472fce486f858d4EXACTpre-wavetree5c91; final72c108/treec6f985/reportac1b323/224620chars224684B/SHA75e77570. Entire204637prefix/main0c9/original3195/62WF/F7/R1exact,fiveactive0,current1attempt,closedcommit0runs. SourceactorSTOP; nofurtherSourcework.

Return EACHfindingADDRESSED|NOTADDRESSEDwithcurrentF7lineevidence; newbreakageinfixdiffbyseverity; out-of-scopeobservationsseparate/nonblocking; finalone-waveverdict. No tests rerun, no wholeoldSource/broadcrawl. Fullnewcodehunks/commands+actualoutputs arepresent.
