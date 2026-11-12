# Complete logical workflow patch — C4 to R2 certificate candidate

This full GitHub patch was applied in memory to the full immutable C4 workflow and exactly reproduced the full candidate1bc698f1. Every hunk, unchanged gap and tail compared. It is the logical actual-to-actual code delta, **not** a claim that GitHub returned the global F7-to-candidate patch; that global patch was omitted. Review the full global before/after workflows plus complete trees separately.

```diff
@@ -1,5 +1,5 @@
-name: AFW authenticated bound reference supplement QUALIFIED_INACTIVE
-run-name: AFW authenticated bound reference supplement INACTIVE ${{ github.sha }}
+name: AFW R2 last inserted child boundaries QUALIFIED_INACTIVE
+run-name: AFW R2 last inserted child boundaries INACTIVE ${{ github.sha }}
 on:
   workflow_dispatch:
 permissions:
@@ -553,7 +553,7 @@ jobs:
           import {spawn} from 'node:child_process';
           import {createHash} from 'node:crypto';
           import {validatePublic,inspectionAccepted,baseResult,FLAGS,ORIGINAL} from './afw-reference-v1-current.mjs';
-          export const PURPOSE='afw.readonly-owner-reference-supplement.safe.v1',MANIFEST='afw.readonly-owner-reference-supplement-manifest.safe.v1';
+          export const PURPOSE='afw.readonly-reference-boundaries.safe.v1',MANIFEST='afw.readonly-reference-boundaries-manifest.safe.v1';
           const BASIC=['completeWrites','completeNormal','lists','gets','peak','referenceRows','responseStatus'],CASES=['R1','R2'],MAX=298888337;
           const hash=b=>createHash('sha256').update(b).digest('hex'),obj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),count=v=>Number.isSafeInteger(v)&&v>=0&&v<=1000000,time=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0&&v<=900000;
           const need=(ok,reason='supplement_rejected')=>{if(!ok){const e=new Error(reason);e.reason=reason;throw e;}};
@@ -570,7 +570,7 @@ jobs:
            const elapsed=[],guards=[];for(const r of raw){const t=optional(r,'elapsedMs',time),g=optional(r,'bodyGuardMs',time);if(t!==null)elapsed.push(t);if(g!==null)guards.push(g);}
            return {status:'present',count:raw.length,knownElapsedCount:elapsed.length,maxElapsedMs:max(elapsed),recordedGuardCount:guards.length,maxBodyGuardMs:max(guards)};
           }
-          export function projectReferenceReceipt(raw,caseName){
+          function validatedReferenceRow(raw,caseName){
            need(CASES.includes(caseName));try{
             need(obj(raw)&&raw.label==='budget-'+caseName&&raw.testRevision===ORIGINAL.sourceSha);
             for(const k of ['completePackage','operationalReadiness','PCoff','custodyReal'])need(raw[k]===false);
@@ -581,6 +581,51 @@ jobs:
             return {case:caseName,status:'present',basic:Object.fromEntries(BASIC.map(k=>[k,k==='responseStatus'?status:raw[k]])),lookup,children:aggregate(raw.children,'children'),roots:aggregate(raw.roots,'roots'),http:aggregate(raw.httpSpans,'http')};
            }catch{return unknownReference(caseName,'invalid');}
           }
+          
+          export const POSITIONS=Object.freeze(['baseline','settled','sdk-send','sdk-pending','sdk-resolved','sdk-observed','issuer-send','issuer-pending','issuer-resolved','issuer-ack']);
+          export const OPERATIONS=Object.freeze(['open_fence','authorization','consume','grant','AuthorizationLink','GrantLink','source-pair']);
+          export function unknownLastChild(status='not_examined'){return {case:'R2',status,childCount:null,ordinal:null,position:'unknown',endPosition:'unknown',elapsedMs:null,aborted:null,stepCount:null,lastStep:'unknown',lastStepElapsedMs:null};}
+          export function projectReferenceBoundary(raw,caseName){
+           const row=validatedReferenceRow(raw,caseName);let lastChild=unknownLastChild();
+           if(caseName==='R2'&&row.status==='present'){
+            if(row.children.status==='absent')lastChild=unknownLastChild('unavailable');
+            else if(row.children.count===0)lastChild={...unknownLastChild('absent'),childCount:0};
+            else{
+             // Insertion order only. Protocol position and entry/emission are not native effect or ACK.
+             const child=raw.children[raw.children.length-1],steps=child.steps;
+             const known=Array.isArray(steps)&&count(steps.length),stepCount=known?steps.length:null;
+             const final=known&&steps.length?steps[steps.length-1]:null,operation=obj(final)&&OPERATIONS.includes(final.operation)?final.operation:'unknown';
+             lastChild={case:'R2',status:'present',childCount:row.children.count,ordinal:row.children.count,position:POSITIONS.includes(child.position)?child.position:'unknown',endPosition:POSITIONS.includes(child.endPosition)?child.endPosition:'unknown',elapsedMs:child.actualElapsedMs??null,aborted:child.aborted??null,stepCount,lastStep:stepCount===0?'none':operation,lastStepElapsedMs:operation==='source-pair'&&time(final.elapsedMs)?final.elapsedMs:null};
+             // source-pair finally attaches to activeMetric at emission, including error; no exclusive cause.
+            }
+           }
+           return {row,lastChild};
+          }
+          export function projectReferenceReceipt(raw,caseName){return projectReferenceBoundary(raw,caseName).row;}
+          export function validateLastChild(v,row){
+           exact(v,Object.keys(unknownLastChild()));need(v.case==='R2');validateReferenceRow(row,'R2');
+           if(row.status!=='present'){assert.deepEqual(v,unknownLastChild());return v;}
+           const a=row.children;
+           if(a.status==='absent'){assert.deepEqual(v,unknownLastChild('unavailable'));return v;}
+           need(a.status==='present');
+           if(a.count===0){assert.deepEqual(v,{...unknownLastChild('absent'),childCount:0});return v;}
+           need(v.status==='present'&&v.childCount===a.count&&v.ordinal===a.count);
+           need([...POSITIONS,'unknown'].includes(v.position)&&[...POSITIONS,'unknown'].includes(v.endPosition));
+           need(v.elapsedMs===null||time(v.elapsedMs));need(v.aborted===null||typeof v.aborted==='boolean');
+           if(v.elapsedMs===null)need(a.knownDurationCount<a.count);
+           else need(a.knownDurationCount>0&&v.elapsedMs<=a.maxElapsedMs&&(a.knownDurationCount!==1||v.elapsedMs===a.maxElapsedMs));
+           if(v.aborted===null)need(a.knownAbortCount<a.count);
+           else if(v.aborted)need(a.abortedCount>=1);
+           else need(a.knownAbortCount-a.abortedCount>=1);
+           need(v.stepCount===null||count(v.stepCount));need([...OPERATIONS,'unknown','none'].includes(v.lastStep));
+           if(v.stepCount===null)need(v.lastStep==='unknown'&&v.lastStepElapsedMs===null);
+           else if(v.stepCount===0)need(v.lastStep==='none'&&v.lastStepElapsedMs===null);
+           else{need(v.lastStep!=='none');need(v.lastStep==='source-pair'?(v.lastStepElapsedMs===null||time(v.lastStepElapsedMs)):v.lastStepElapsedMs===null);}
+           return v;
+          }
+          export function validateReferenceSet(v){exact(v,['ownerReference','lastChild']);validateActualReferenceRows(v.ownerReference);need(v.ownerReference.every(r=>r.status!=='not_examined'));validateLastChild(v.lastChild,v.ownerReference[1]);return v;}
+          const certificateComplete=(rows,lastChild)=>rows.every(r=>r.status==='present')&&['present','absent'].includes(lastChild.status);
+          
           function validateAggregate(v,kind,unknown){
            const template=aggregateUnknown(kind);exact(v,Object.keys(template));need(['present','absent','unknown'].includes(v.status));
            if(unknown||v.status!=='present'){assert.deepEqual(v,{...template,status:unknown?'unknown':'absent'});return;}
@@ -612,13 +657,17 @@ jobs:
            if(intermediate)need(v.phases.cleanup==='not_attempted'&&v.timings.parseCleanupMs===null,'inspection_intermediate');else need(inspectionAccepted(v),'inspection_rejected');return v;
           }
           const STAGES=['projection','cleanup','authentication','program'],REASONS=['project_failed','projection_deadline','termination_unverified','cleanup_failed','cleanup_deadline','basis_rejected','state_rejected','program_unavailable'];
-          export function makeSupplement(inspection,ownerReference,failure){if(failure!==null)ownerReference=CASES.map(c=>unknownReference(c));return {purpose:PURPOSE,status:failure===null?(ownerReference.every(r=>r.status==='present')?'complete':'partial'):'rejected',inspection,ownerReference,failure,...FLAGS};}
+          export function makeSupplement(inspection,ownerReference,failure,lastChild=unknownLastChild()){
+           if(failure!==null){ownerReference=CASES.map(c=>unknownReference(c));lastChild=unknownLastChild();}
+           return {purpose:PURPOSE,status:failure===null?(certificateComplete(ownerReference,lastChild)?'complete':'partial'):'rejected',inspection,ownerReference,lastChild,failure,...FLAGS};
+          }
           export function validateSupplementResult(v){
-           exact(v,['purpose','status','inspection','ownerReference','failure',...Object.keys(FLAGS)]);need(v.purpose===PURPOSE&&['complete','partial','rejected'].includes(v.status));for(const[k,x]of Object.entries(FLAGS))need(v[k]===x);
+           exact(v,['purpose','status','inspection','ownerReference','lastChild','failure',...Object.keys(FLAGS)]);need(v.purpose===PURPOSE&&['complete','partial','rejected'].includes(v.status));for(const[k,x]of Object.entries(FLAGS))need(v[k]===x);
            validatePublic(v.inspection);need(v.inspection.inspector.source===process.env.GITHUB_SHA&&v.inspection.inspector.run===process.env.GITHUB_RUN_ID,'inspection_identity');
            need(Array.isArray(v.ownerReference)&&v.ownerReference.length===2);CASES.forEach((c,i)=>validateReferenceRow(v.ownerReference[i],c));
+           validateLastChild(v.lastChild,v.ownerReference[1]);
            if(v.failure!==null){exact(v.failure,['stage','reason']);need(STAGES.includes(v.failure.stage)&&REASONS.includes(v.failure.reason));}
-           if(v.status==='rejected'){need(v.failure!==null);assert.deepEqual(v.ownerReference,CASES.map(c=>unknownReference(c)));}else{need(v.failure===null);validateInspectionBasis(v.inspection);validateActualReferenceRows(v.ownerReference);need(v.ownerReference.every(r=>r.status!=='not_examined'));need(v.status===(v.ownerReference.every(r=>r.status==='present')?'complete':'partial'));}
+           if(v.status==='rejected'){need(v.failure!==null);assert.deepEqual(v.ownerReference,CASES.map(c=>unknownReference(c)));}else{need(v.failure===null);validateInspectionBasis(v.inspection);validateActualReferenceRows(v.ownerReference);need(v.ownerReference.every(r=>r.status!=='not_examined'));need(v.status===(certificateComplete(v.ownerReference,v.lastChild)?'complete':'partial'));}
            return v;
           }
           export function encodeSupplement(v){
@@ -645,25 +694,26 @@ jobs:
            readerFault(fault,'open');const h=await open(path,FSC.O_RDONLY|FSC.O_NOFOLLOW);
            try{readerFault(fault,'file_stat');const before=await h.stat({bigint:true});referencePolicy(before.isFile()&&before.nlink===1n);referencePolicy(before.size<=BigInt(limit),'oversize');readerFault(fault,'file_read');const b=await h.readFile();const after=await h.stat({bigint:true});referencePolicy(sameStat(before,after)&&BigInt(b.length)===before.size);return b;}finally{await h.close();}
           }
-          export async function readReference(plain,caseName,testFault=null){
+          async function readBoundary(plain,caseName,testFault=null){
            need(CASES.includes(caseName));try{
             const dirs=[plain,join(plain,'output'),join(plain,'output','owner-reference')],identities=[];
             for(const d of dirs){readerFault(testFault,'directory_stat');const s=await lstat(d,{bigint:true});referencePolicy(s.isDirectory()&&!s.isSymbolicLink()&&await realpath(d)===d);identities.push(s);}
             const b=await stableFile(join(dirs[2],'budget-'+caseName+'.json'),MAX,testFault);
             for(let n=0;n<dirs.length;n++){readerFault(testFault,'directory_recheck');const s=await lstat(dirs[n],{bigint:true});referencePolicy(s.isDirectory()&&!s.isSymbolicLink()&&sameStat(s,identities[n])&&await realpath(dirs[n])===dirs[n]);}
             let raw;try{raw=JSON.parse(utf8(b));}catch(e){if(e instanceof SyntaxError||e?.code==='ERR_ENCODING_INVALID_ENCODED_DATA')throw new ReferencePolicyRejected();throw e;}
-            return projectReferenceReceipt(raw,caseName);
+            return projectReferenceBoundary(raw,caseName);
            }catch(e){
-            if(e?.code==='ENOENT')return unknownReference(caseName,'missing');
-            if(e instanceof ReferencePolicyRejected||['ELOOP','ENOTDIR'].includes(e?.code))return unknownReference(caseName,e?.reason==='oversize'?'oversize':'invalid');
+            if(e?.code==='ENOENT')return {row:unknownReference(caseName,'missing'),lastChild:unknownLastChild()};
+            if(e instanceof ReferencePolicyRejected||['ELOOP','ENOTDIR'].includes(e?.code))return {row:unknownReference(caseName,e?.reason==='oversize'?'oversize':'invalid'),lastChild:unknownLastChild()};
             throw e;
            }
           }
+          export async function readReference(plain,caseName,testFault=null){return (await readBoundary(plain,caseName,testFault)).row;}
           export function validateActualReferenceRows(rows){need(Array.isArray(rows)&&rows.length===2);CASES.forEach((c,i)=>validateReferenceRow(rows[i],c));need(rows.every(r=>r.status!=='oversize'));return rows;}
-          export async function readActualReferences(plain,testFault=null){const rows=[];for(const c of CASES)rows.push(await readReference(plain,c,testFault));return validateActualReferenceRows(rows);}
+          export async function readActualReferences(plain,testFault=null){const ownerReference=[];let lastChild=unknownLastChild();for(const c of CASES){const projected=await readBoundary(plain,c,testFault);ownerReference.push(projected.row);if(c==='R2')lastChild=projected.lastChild;}return validateReferenceSet({ownerReference,lastChild});}
           export async function coordinateSupplement(io){
            const start=io.now(),projectionEnd=start+10000,totalEnd=start+15000;
-           let inspection=io.base(),rows=CASES.map(c=>unknownReference(c)),failure=null,settled=true,cleanupComplete=false;
+           let inspection=io.base(),rows=CASES.map(c=>unknownReference(c)),lastChild=unknownLastChild(),failure=null,settled=true,cleanupComplete=false;
            const fail=(stage,reason)=>{if(failure===null)failure={stage,reason};};
            const run=async(mode,end)=>{const r=await io.run(mode,end);if(!r.settled){settled=false;fail(mode==='cleanup-child'?'cleanup':'projection','termination_unverified');}else if(!r.ok)fail(mode==='cleanup-child'?'cleanup':'projection',mode==='cleanup-child'?'cleanup_failed':'project_failed');return r.settled&&r.ok;};
            try{
@@ -673,7 +723,7 @@ jobs:
             if(io.now()>projectionEnd){fail('projection','projection_deadline');throw 0;}
             if(!await run('reference-child',projectionEnd))throw 0;
             if(io.now()>projectionEnd){fail('projection','projection_deadline');throw 0;}
-            rows=validateActualReferenceRows(await io.references());
+            const projected=validateReferenceSet(await io.references());rows=projected.ownerReference;lastChild=projected.lastChild;
             if(io.now()>projectionEnd)fail('projection','projection_deadline');
            }catch{fail('projection','basis_rejected');}
            finally{
@@ -686,7 +736,7 @@ jobs:
            }
            if(!cleanupComplete&&failure===null)fail('cleanup','cleanup_failed');
            if(failure===null)try{validateInspectionBasis(inspection);}catch{fail('projection','basis_rejected');}
-           const out=makeSupplement(inspection,rows,failure);validateSupplementResult(out);return out;
+           const out=makeSupplement(inspection,rows,failure,lastChild);validateSupplementResult(out);return out;
           }
           // A child is never reported settled from kill()/exit alone: close confirms all stdio/process handles closed.
           // Deadline is absolute and shared by the coordinator. No post-timeout cleanup window is renewed.
@@ -707,9 +757,9 @@ jobs:
            need(v.coreSha256==='d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246');
            for(const k of ['moduleSha256','testsSha256','bootstrapSha256'])need(typeof v[k]==='string'&&/^[a-f0-9]{64}$/.test(v[k]));
            const r=v.record;exact(r,['marker','expected','completed','pass','fail','inventory','firstFailure']);
-           const ids=["two_valid","zero_fraction_false","lookup_states","identities_flags","required_bounds","optional_types","array_bounds","empty_absent","writer_http","private_canary","file_missing_bad","file_bound_links","gate_no_read","one_cleanup","primary_cleanup","timeout_cleanup","uncertain_no_cleanup","cleanup_late_fail","whole_hash_bytes","nested_identity","complete_partial","strict_envelope","producer_transport","verifier_transport"];need(r.marker==='REFERENCE_CONTROLS/1'&&r.expected===24&&r.completed===24&&r.pass===24&&r.fail===0&&r.firstFailure===null&&Array.isArray(r.inventory)&&r.inventory.length===24);
+           const ids=["two_valid","zero_fraction_false","lookup_states","identities_flags","required_bounds","optional_types","array_bounds","empty_absent","writer_http","private_canary","file_missing_bad","file_bound_links","gate_no_read","one_cleanup","primary_cleanup","timeout_cleanup","uncertain_no_cleanup","cleanup_late_fail","whole_hash_bytes","nested_identity","complete_partial","strict_envelope","producer_transport","verifier_transport","lc_pair","lc_last","lc_pos","lc_unknown","lc_ops","lc_steps","lc_scalars","lc_absent","lc_guard","lc_invalid","lc_schema","lc_clean","lc_clock","lc_manifest","lc_transport","lc_bounds"];need(r.marker==='REFERENCE_CONTROLS/1'&&r.expected===40&&r.completed===40&&r.pass===40&&r.fail===0&&r.firstFailure===null&&Array.isArray(r.inventory)&&r.inventory.length===40);
            r.inventory.forEach((x,i)=>{exact(x,['id','status']);need(x.id===ids[i]&&x.status==='passed');});
-           need(Buffer.byteLength(JSON.stringify(r))<=2048);return v;
+           need(Buffer.byteLength(JSON.stringify(r))+1<=2048);return v;
           }
           const temp=()=>resolve(process.env.RUNNER_TEMP),path=name=>join(temp(),name);
           function scope(){need(process.env.GITHUB_REPOSITORY===ORIGINAL.repository&&process.env.GITHUB_REF===ORIGINAL.ref&&process.env.GITHUB_RUN_ATTEMPT==='1'&&/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')&&/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')&&process.versions.node==='22.23.4'&&!Object.hasOwn(process.env,'AFW_SYN_CHECKPOINT_KEY'));}
@@ -752,21 +802,23 @@ jobs:
           import {createHash} from 'node:crypto';
           import * as S from './afw-reference-supplement-current.mjs';
           import {baseResult,FLAGS,ORIGINAL} from './afw-reference-v1-current.mjs';
-          const IDS=["two_valid","zero_fraction_false","lookup_states","identities_flags","required_bounds","optional_types","array_bounds","empty_absent","writer_http","private_canary","file_missing_bad","file_bound_links","gate_no_read","one_cleanup","primary_cleanup","timeout_cleanup","uncertain_no_cleanup","cleanup_late_fail","whole_hash_bytes","nested_identity","complete_partial","strict_envelope","producer_transport","verifier_transport"],hash=b=>createHash('sha256').update(b).digest('hex');
+          const IDS=["two_valid","zero_fraction_false","lookup_states","identities_flags","required_bounds","optional_types","array_bounds","empty_absent","writer_http","private_canary","file_missing_bad","file_bound_links","gate_no_read","one_cleanup","primary_cleanup","timeout_cleanup","uncertain_no_cleanup","cleanup_late_fail","whole_hash_bytes","nested_identity","complete_partial","strict_envelope","producer_transport","verifier_transport","lc_pair","lc_last","lc_pos","lc_unknown","lc_ops","lc_steps","lc_scalars","lc_absent","lc_guard","lc_invalid","lc_schema","lc_clean","lc_clock","lc_manifest","lc_transport","lc_bounds"],hash=b=>createHash('sha256').update(b).digest('hex');
           function receipt(caseName='R1'){return {label:'budget-'+caseName,testRevision:ORIGINAL.sourceSha,completeWrites:1,completeNormal:0,referenceRows:0,lists:2,gets:0,peak:2,responseStatus:200,lookupChild:{budgetMs:5000,actualElapsedMs:0.25,aborted:false},children:[{actualElapsedMs:0.5,aborted:false,trace:'PRIVATE_CANARY'}],roots:[{method:'PRIVATE_CANARY',windowMs:1.25}],http:{requests:999,bytes:123},httpSpans:[{kind:'PRIVATE_CANARY',bytes:111,elapsedMs:0.75,bodyGuardMs:0,childStartedAt:1234567890}],completePackage:false,operationalReadiness:false,PCoff:false,custodyReal:false};}
           function basis(intermediate=false){const r=baseResult();r.status='inspected';r.artifact.verified=true;r.authentication={authenticated:true,innerInventoryVerified:true,fileCount:128,totalBytes:298888337};r.failureIdentity={verified:true,commandSucceeded:false,elapsedMs:1};r.phases={fixtures:'passed',download:'verified',authentication:'authenticated',identity:'verified',projection:'projected',cleanup:intermediate?'not_attempted':'complete'};r.timings={downloadMs:1,openMs:1,parseCleanupMs:intermediate?null:1};r.fixtures.checks=91;r.tap.status='present';r.tap.recordedCaseCount=3;for(const c of r.cases)c.tap.status='fail';return r;}
-          function value(){return S.makeSupplement(basis(),['R1','R2'].map(c=>S.projectReferenceReceipt(receipt(c),c)),null);}
+          function projectedSet(raw=receipt('R2')){const p=S.projectReferenceBoundary(raw,'R2');return {ownerReference:[S.projectReferenceReceipt(receipt('R1'),'R1'),p.row],lastChild:p.lastChild};}
+          function boundaryValue(raw=receipt('R2')){const p=projectedSet(raw);return S.makeSupplement(basis(),p.ownerReference,null,p.lastChild);}
+          function value(){return boundaryValue();}
           function pair(v=value()){return S.encodeSupplement(v);}
           function mustReject(fn){assert.throws(fn);}
           function unknown(row,status='invalid'){assert.deepEqual(row,S.unknownReference(row.case,status));}
           async function temporary(fn){const root=await mkdtemp(join(resolve(process.env.RUNNER_TEMP),'afw-supplement-fixture-'));try{return await fn(root);}finally{await rm(root,{recursive:true,force:true});}}
-          async function simulate({fail=null,settled=true,projectTime=1,cleanupTime=1,cleanupOk=true,lateValidation=false,mutate=null,cleanupUnsettled=false,referenceOperation=null}={}){
+          async function simulate({fail=null,settled=true,projectTime=1,cleanupTime=1,cleanupOk=true,lateValidation=false,mutate=null,cleanupUnsettled=false,referenceOperation=null,referenceSet=null}={}){
            let clock=0;const calls=[],r=basis(true);if(mutate)mutate(r);
            const result=await S.coordinateSupplement({
             now:()=>clock,base:()=>baseResult(),
             run:async(mode,deadline)=>{calls.push({mode,deadline});if(mode==='project-child')clock+=projectTime;if(mode==='reference-child'){clock+=1;if(referenceOperation)try{await referenceOperation();}catch{return {settled:true,ok:false};}}if(mode==='cleanup-child')clock+=cleanupTime;return {settled:mode==='cleanup-child'&&cleanupUnsettled?false:mode===fail?settled:true,ok:mode!==fail};},
             intermediate:async()=>{if(lateValidation)clock=10001;return r;},
-            references:async()=>['R1','R2'].map(c=>S.projectReferenceReceipt(receipt(c),c)),
+            references:async()=>referenceSet??projectedSet(),
             cleaned:async()=>cleanupOk
            });return {result,calls,clock};
           }
@@ -791,15 +843,48 @@ jobs:
            cleanup_late_fail:async()=>{for(const options of [{cleanupOk:false},{fail:'cleanup-child'},{cleanupTime:15000}]){const {result}=await simulate(options);assert.equal(result.status,'rejected');assert.notEqual(result.inspection.phases.cleanup,'complete');}},
            whole_hash_bytes:()=>{for(const f of [m=>m.files[0].bytes++,m=>m.files[0].sha256='0'.repeat(64)]){const p=pair(),m=JSON.parse(p.get('manifest.json'));f(m);p.set('manifest.json',Buffer.from(JSON.stringify(m)));mustReject(()=>S.validateSupplementPair(p));}const p=pair();p.set('result.json',Buffer.concat([p.get('result.json'),Buffer.from(' ')]));mustReject(()=>S.validateSupplementPair(p));},
            nested_identity:()=>{for(const f of [r=>r.inspector.source='1'.repeat(40),r=>r.inspector.run='2',r=>r.originalContext.sourceSha='1'.repeat(40),r=>r.artifact.id=1,r=>r.authentication.fileCount=127,r=>r.authentication.totalBytes=298888336,r=>r.fixtures.checks=1,r=>r.tap.recordedCaseCount=2]){const v=value();f(v.inspection);const b=Buffer.from(JSON.stringify(v)),m={purpose:S.MANIFEST,inspectorSource:process.env.GITHUB_SHA,inspectorRun:process.env.GITHUB_RUN_ID,attempt:1,files:[{path:'result.json',bytes:b.length,sha256:hash(b)}]};mustReject(()=>S.validateSupplementPair(new Map([['result.json',b],['manifest.json',Buffer.from(JSON.stringify(m))]])));}},
-           complete_partial:()=>{for(const status of ['missing','invalid']){const v=value();v.ownerReference[1]=S.unknownReference('R2',status);v.status='partial';assert.equal(S.validateSupplementPair(pair(v)).status,'partial');v.status='complete';mustReject(()=>S.validateSupplementPair(pair(v))); }const v=value();v.ownerReference[1]=S.unknownReference('R2','oversize');for(const status of ['complete','partial']){v.status=status;mustReject(()=>S.validateSupplementPair(pair(v)));}},
+           complete_partial:()=>{for(const status of ['missing','invalid']){const v=value();v.ownerReference[1]=S.unknownReference('R2',status);v.lastChild=S.unknownLastChild();v.status='partial';assert.equal(S.validateSupplementPair(pair(v)).status,'partial');v.status='complete';mustReject(()=>S.validateSupplementPair(pair(v))); }const v=value();v.ownerReference[1]=S.unknownReference('R2','oversize');for(const status of ['complete','partial']){v.status=status;mustReject(()=>S.validateSupplementPair(pair(v)));}},
            strict_envelope:()=>{const rejected=value();rejected.status='rejected';rejected.failure={stage:'projection',reason:'project_failed'};rejected.inspection=baseResult();mustReject(()=>S.validateSupplementResult(rejected));const published=S.publicationResult(rejected);assert.equal(published.status,'rejected');assert.deepEqual(published.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));const constructed=S.makeSupplement(baseResult(),value().ownerReference,{stage:'projection',reason:'basis_rejected'});assert.deepEqual(constructed.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));S.validateSupplementResult(constructed);for(const f of [v=>v.extra=true,v=>v.ownerReference.reverse(),v=>v.PCoff=true,v=>v.ownerReference[0].basic.extra='PRIVATE_CANARY',v=>v.ownerReference[0].children.count=null,v=>v.failure={stage:'PRIVATE_CANARY',reason:'PRIVATE_CANARY'}]){const v=value();f(v);mustReject(()=>S.validateSupplementResult(v));}},
            producer_transport:()=>{for(const v of [value(),S.makeSupplement(basis(),[S.unknownReference('R1','missing'),S.unknownReference('R2','invalid')],null)])assert.equal(S.producerTransportAccepted(S.encodeSupplement(v)),true);const bad=value();bad.status='partial';bad.ownerReference[0]=S.unknownReference('R1','oversize');assert.equal(S.producerTransportAccepted(S.encodeSupplement(bad)),false);const v=value();v.status='rejected';v.failure={stage:'projection',reason:'project_failed'};assert.equal(S.producerTransportAccepted(S.encodeSupplement(v)),false);},
-           verifier_transport:()=>{for(const v of [value(),S.makeSupplement(basis(),[S.unknownReference('R1','invalid'),S.unknownReference('R2','missing')],null)])assert.equal(S.validateSupplementPair(S.encodeSupplement(v)).status,v.status);const bad=value();bad.status='partial';bad.ownerReference[0]=S.unknownReference('R1','oversize');mustReject(()=>S.validateSupplementPair(S.encodeSupplement(bad)));const p=pair();p.set('third.json',Buffer.from('{}'));mustReject(()=>S.validateSupplementPair(p));}
+           verifier_transport:()=>{for(const v of [value(),S.makeSupplement(basis(),[S.unknownReference('R1','invalid'),S.unknownReference('R2','missing')],null)])assert.equal(S.validateSupplementPair(S.encodeSupplement(v)).status,v.status);const bad=value();bad.status='partial';bad.ownerReference[0]=S.unknownReference('R1','oversize');mustReject(()=>S.validateSupplementPair(S.encodeSupplement(bad)));const p=pair();p.set('third.json',Buffer.from('{}'));mustReject(()=>S.validateSupplementPair(p));},
+          
+           lc_pair:()=>{const r=receipt('R2');r.children=[{actualElapsedMs:5018,aborted:true,position:'settled',steps:[{operation:'source-pair',elapsedMs:6000}]},{actualElapsedMs:12,aborted:false,position:'sdk-pending',endPosition:'settled',steps:[{operation:'source-pair',elapsedMs:20.5}]}];const v=boundaryValue(r);assert.equal(v.ownerReference[1].children.maxElapsedMs,5018);assert.equal(v.ownerReference[1].children.abortedCount,1);assert.deepEqual(v.lastChild,{case:'R2',status:'present',childCount:2,ordinal:2,position:'sdk-pending',endPosition:'settled',elapsedMs:12,aborted:false,stepCount:1,lastStep:'source-pair',lastStepElapsedMs:20.5});assert.equal(S.validateSupplementPair(pair(v)).status,'complete');},
+           lc_last:()=>{const r=receipt('R2');r.children=[{startedAt:99999,actualElapsedMs:900,aborted:true,position:'issuer-ack'},{startedAt:1,actualElapsedMs:3.25,aborted:false,position:'baseline',steps:[]}];const v=boundaryValue(r);assert.equal(v.lastChild.ordinal,2);assert.equal(v.lastChild.elapsedMs,3.25);assert.equal(v.lastChild.position,'baseline');assert.equal(v.lastChild.lastStep,'none');assert.equal(v.lastChild.aborted,false);assert.equal(v.lastChild.lastStepElapsedMs,null);S.validateSupplementPair(pair(v));},
+           lc_pos:()=>{const expected=['baseline','settled','sdk-send','sdk-pending','sdk-resolved','sdk-observed','issuer-send','issuer-pending','issuer-resolved','issuer-ack'];assert.deepEqual(S.POSITIONS,expected);for(const position of expected){const r=receipt('R2');Object.assign(r.children[0],{position,endPosition:position});const v=boundaryValue(r);assert.equal(v.lastChild.position,position);assert.equal(v.lastChild.endPosition,position);S.validateSupplementPair(pair(v));}},
+           lc_unknown:()=>{for(const bad of ['sdk-send-private','SDK-send','PRIVATE_CANARY','https://private.invalid/owner',{},1,null]){const r=receipt('R2');Object.assign(r.children[0],{position:bad,endPosition:bad,steps:[{operation:bad,elapsedMs:123,at:1234567890,request:'PRIVATE_CANARY'}],trace:'PRIVATE_CANARY',key:'PRIVATE_CANARY',url:'PRIVATE_CANARY'});const v=boundaryValue(r);assert.equal(v.lastChild.position,'unknown');assert.equal(v.lastChild.endPosition,'unknown');assert.equal(v.lastChild.lastStep,'unknown');assert.equal(v.lastChild.lastStepElapsedMs,null);assert(!JSON.stringify(v).includes('PRIVATE_CANARY'));S.validateSupplementPair(pair(v));}},
+           lc_ops:()=>{const expected=['open_fence','authorization','consume','grant','AuthorizationLink','GrantLink','source-pair'];assert.deepEqual(S.OPERATIONS,expected);for(const operation of expected){const r=receipt('R2');r.children[0].steps=[{operation:'PRIVATE_CANARY',elapsedMs:99},{operation,elapsedMs:0.75,error:'PRIVATE_CANARY'}];const v=boundaryValue(r);assert.equal(v.lastChild.stepCount,2);assert.equal(v.lastChild.lastStep,operation);assert.equal(v.lastChild.lastStepElapsedMs,operation==='source-pair'?0.75:null);assert(!JSON.stringify(v).includes('PRIVATE_CANARY'));S.validateSupplementPair(pair(v));}for(const op of ['Reservation','SdkGrantReference','sdk_begin','sdk_approve','sdk_complete']){const r=receipt('R2');r.children[0].steps=[{operation:op}];assert.equal(boundaryValue(r).lastChild.lastStep,'unknown');}},
+           lc_steps:()=>{for(const steps of [undefined,null,{},'PRIVATE_CANARY',3]){const r=receipt('R2');r.children[0].steps=steps;const c=boundaryValue(r).lastChild;assert.equal(c.stepCount,null);assert.equal(c.lastStep,'unknown');assert.equal(c.lastStepElapsedMs,null);}for(const item of [null,{},false,'PRIVATE_CANARY']){const r=receipt('R2');r.children[0].steps=[{operation:'source-pair',elapsedMs:500},item];const c=boundaryValue(r).lastChild;assert.equal(c.stepCount,2);assert.equal(c.lastStep,'unknown');assert.equal(c.lastStepElapsedMs,null);}const r=receipt('R2');r.children[0].steps=[];assert.deepEqual(boundaryValue(r).lastChild,{case:'R2',status:'present',childCount:1,ordinal:1,position:'unknown',endPosition:'unknown',elapsedMs:0.5,aborted:false,stepCount:0,lastStep:'none',lastStepElapsedMs:null});},
+           lc_scalars:()=>{for(const d of [0,0.125,900000])for(const a of [false,true,null]){const r=receipt('R2');Object.assign(r.children[0],{actualElapsedMs:d,aborted:a,steps:[{operation:'source-pair',elapsedMs:d}]});const v=boundaryValue(r);assert.equal(v.lastChild.elapsedMs,d);assert.equal(v.lastChild.aborted,a);assert.equal(v.lastChild.lastStepElapsedMs,d);S.validateSupplementPair(pair(v));}for(const bad of [undefined,null,'1',-1,Infinity,NaN,900001]){const r=receipt('R2');r.children[0].steps=[{operation:'source-pair',elapsedMs:bad}];assert.equal(boundaryValue(r).lastChild.lastStepElapsedMs,null);}const r=receipt('R2');delete r.children[0].actualElapsedMs;delete r.children[0].aborted;const v=boundaryValue(r);assert.equal(v.lastChild.elapsedMs,null);assert.equal(v.lastChild.aborted,null);S.validateSupplementPair(pair(v));},
+           lc_absent:()=>{for(const children of [[],null,undefined]){const r=receipt('R2');r.children=children;const v=boundaryValue(r);assert.deepEqual(v.lastChild,children?.length===0?{...S.unknownLastChild('absent'),childCount:0}:S.unknownLastChild('unavailable'));assert.equal(v.status,Array.isArray(children)?'complete':'partial');S.validateSupplementPair(pair(v));const bad=structuredClone(v);bad.status=bad.status==='complete'?'partial':'complete';mustReject(()=>S.validateSupplementPair(pair(bad)));}const p=S.projectReferenceBoundary(receipt('R1'),'R1');assert.deepEqual(p.lastChild,S.unknownLastChild());},
+           lc_guard:async()=>{for(const k of ['label','testRevision','completePackage','operationalReadiness','PCoff','custodyReal','lists']){const r=receipt('R2');r[k]=k==='label'?'budget-R1':k==='testRevision'?'2'.repeat(40):k==='lists'?-1:true;const p=S.projectReferenceBoundary(r,'R2');unknown(p.row);assert.deepEqual(p.lastChild,S.unknownLastChild());assert.equal(boundaryValue(r).status,'partial');}for(const mutate of [r=>r.authentication.authenticated=false,r=>r.authentication.innerInventoryVerified=false,r=>r.authentication.totalBytes--,r=>r.inspector.source='1'.repeat(40),r=>r.inspector.run='3',r=>r.fixtures.checks--]){const out=await simulate({mutate});assert(!out.calls.some(x=>x.mode==='reference-child'));assert.deepEqual(out.result.lastChild,S.unknownLastChild());}},
+           lc_invalid:()=>{for(const children of [false,{},Array(257).fill({}),[null],[{actualElapsedMs:'12'}],[{aborted:0}],[{actualElapsedMs:900001}]]){const r=receipt('R2');r.children=children;const p=S.projectReferenceBoundary(r,'R2');unknown(p.row);assert.deepEqual(p.lastChild,S.unknownLastChild());}for(const status of ['missing','invalid']){const v=value();v.ownerReference[1]=S.unknownReference('R2',status);v.lastChild=S.unknownLastChild();v.status='partial';S.validateSupplementPair(pair(v));}},
+           lc_schema:async()=>{const contradictions=[
+            v=>v.lastChild.childCount++,v=>v.lastChild.ordinal=0,v=>v.lastChild.elapsedMs=0.25,v=>v.lastChild.elapsedMs=null,v=>v.lastChild.aborted=true,v=>v.lastChild.aborted=null,
+            v=>v.lastChild.position='sdk-send-private',v=>v.lastChild.endPosition='PRIVATE_CANARY',v=>v.lastChild.lastStep='sdk_complete',v=>v.lastChild.stepCount=0,
+            v=>v.lastChild.status='unavailable',v=>v.lastChild.case='R1',v=>v.lastChild.extra='PRIVATE_CANARY',v=>delete v.lastChild,
+            v=>{v.lastChild.stepCount=1;v.lastChild.lastStep='authorization';v.lastChild.lastStepElapsedMs=2;}
+           ];for(const mutate of contradictions){const v=value();mutate(v);mustReject(()=>S.validateSupplementResult(v));assert.equal(S.producerTransportAccepted(pair(v)),false);mustReject(()=>S.validateSupplementPair(pair(v)));const input={ownerReference:v.ownerReference,lastChild:v.lastChild},out=await simulate({referenceSet:input});assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));assert.deepEqual(out.result.lastChild,S.unknownLastChild());}
+           const multi=receipt('R2');multi.children=[{actualElapsedMs:20,aborted:true},{actualElapsedMs:12,aborted:false}];const v=boundaryValue(multi);v.lastChild.elapsedMs=21;mustReject(()=>S.validateSupplementPair(pair(v)));v.lastChild.elapsedMs=null;mustReject(()=>S.validateSupplementPair(pair(v)));
+           for(const r of [value(),boundaryValue(Object.assign(receipt('R2'),{children:[]})),boundaryValue(Object.assign(receipt('R2'),{children:null}))]){const q=structuredClone(r);q.lastChild={...S.unknownLastChild('not_examined'),elapsedMs:0};mustReject(()=>S.validateSupplementResult(q));}},
+           lc_clean:async()=>{for(const options of [{cleanupOk:false},{fail:'cleanup-child'},{fail:'reference-child',settled:false,projectTime:1},{fail:'project-child',settled:false,projectTime:15000},{cleanupUnsettled:true}]){const {result}=await simulate(options);assert.equal(result.status,'rejected');assert.deepEqual(result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));assert.deepEqual(result.lastChild,S.unknownLastChild());S.validateSupplementResult(result);assert.equal(S.producerTransportAccepted(pair(result)),false);}const v=value();v.status='rejected';v.failure={stage:'projection',reason:'project_failed'};v.ownerReference=['R1','R2'].map(c=>S.unknownReference(c));mustReject(()=>S.validateSupplementResult(v));assert.deepEqual(S.publicationResult(v).lastChild,S.unknownLastChild());const rejected=S.makeSupplement(baseResult(),value().ownerReference,{stage:'projection',reason:'basis_rejected'},value().lastChild);assert.deepEqual(rejected.lastChild,S.unknownLastChild());},
+           lc_clock:async()=>{for(const options of [{projectTime:10001},{lateValidation:true},{cleanupTime:15000}]){const {result,calls}=await simulate(options);assert.equal(result.status,'rejected');assert.deepEqual(result.lastChild,S.unknownLastChild());assert.equal(calls[0].deadline,10000);assert(calls.every(c=>c.deadline===(c.mode==='cleanup-child'?15000:10000)));}const {result}=await simulate({projectTime:9998,cleanupTime:1});assert.equal(result.status,'complete');assert.equal(result.inspection.timings.parseCleanupMs,10000);},
+           lc_manifest:()=>{const v=value();assert.equal(v.purpose,'afw.readonly-reference-boundaries.safe.v1');const p=pair(v),m=JSON.parse(p.get('manifest.json'));assert.equal(m.purpose,'afw.readonly-reference-boundaries-manifest.safe.v1');assert.equal(m.files[0].sha256,hash(p.get('result.json')));assert.equal(m.files[0].bytes,p.get('result.json').length);for(const change of [m=>m.purpose='afw.readonly-owner-reference-supplement-manifest.safe.v1',m=>m.inspectorSource='1'.repeat(40),m=>m.inspectorRun='2',m=>m.attempt=2,m=>m.files[0].bytes++,m=>m.files[0].sha256='0'.repeat(64)]){const q=pair(v),n=JSON.parse(q.get('manifest.json'));change(n);q.set('manifest.json',Buffer.from(JSON.stringify(n)));mustReject(()=>S.validateSupplementPair(q));}const q=pair(v),modified=JSON.parse(q.get('result.json'));modified.lastChild.position='baseline';q.set('result.json',Buffer.from(JSON.stringify(modified)));mustReject(()=>S.validateSupplementPair(q));},
+           lc_transport:async()=>{for(const raw of [receipt('R2'),Object.assign(receipt('R2'),{children:[]}),Object.assign(receipt('R2'),{children:null}),Object.assign(receipt('R2'),{label:'wrong'})]){const v=boundaryValue(raw);assert.equal(S.producerTransportAccepted(pair(v)),true);assert.deepEqual(S.validateSupplementPair(pair(v)),v);const out=await simulate({referenceSet:projectedSet(raw)});assert.equal(out.result.status,v.status);assert.deepEqual(out.result.lastChild,v.lastChild);}
+           const corrupt=[
+            v=>{v.ownerReference[1].children.knownDurationCount=0;v.ownerReference[1].children.maxElapsedMs=null;},
+            v=>{v.ownerReference[1].children.knownAbortCount=0;v.ownerReference[1].children.abortedCount=0;},
+            v=>{v.ownerReference[1].children.status='absent';for(const k of Object.keys(v.ownerReference[1].children))if(k!=='status')v.ownerReference[1].children[k]=null;},
+            v=>{v.ownerReference[1]=S.unknownReference('R2','missing');v.status='partial';},
+            v=>{v.lastChild.status='not_examined';},
+            v=>{v.purpose='afw.readonly-owner-reference-supplement.safe.v1';}
+           ];for(const change of corrupt){const v=value();change(v);assert.equal(S.producerTransportAccepted(pair(v)),false);mustReject(()=>S.validateSupplementPair(pair(v)));const out=await simulate({referenceSet:{ownerReference:v.ownerReference,lastChild:v.lastChild}});if(v.purpose===S.PURPOSE){assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));assert.deepEqual(out.result.lastChild,S.unknownLastChild());}}
+           const rejected=S.makeSupplement(baseResult(),value().ownerReference,{stage:'cleanup',reason:'cleanup_failed'},value().lastChild);S.validateSupplementPair(pair(rejected),{allowRejected:true});assert.equal(S.producerTransportAccepted(pair(rejected)),false);},
+           lc_bounds:()=>{const r=receipt('R2');r.children=Array.from({length:256},()=>({actualElapsedMs:0,aborted:false}));r.children[255].steps=Array(1000000).fill(null);const v=boundaryValue(r);assert.equal(v.lastChild.childCount,256);assert.equal(v.lastChild.ordinal,256);assert.equal(v.lastChild.stepCount,1000000);S.validateSupplementPair(pair(v));r.children[255].steps.push({operation:'source-pair',elapsedMs:3});assert.equal(boundaryValue(r).lastChild.stepCount,null);const q=pair();q.set('result.json',Buffer.alloc(65536));mustReject(()=>S.validateSupplementPair(q));for(const passed of [true,false]){const inventory=IDS.map((id,i)=>({id,status:passed?'passed':i===0?'failed':'not_executed'})),record={marker:'REFERENCE_CONTROLS/1',expected:40,completed:passed?40:1,pass:passed?40:0,fail:passed?0:1,inventory,firstFailure:passed?null:IDS[0]};assert(Buffer.byteLength(JSON.stringify(record)+'\n')<=2048);}for(const firstFailure of ['setup',...IDS]){const inventory=IDS.map(id=>({id,status:'not_executed'})),worst={marker:'REFERENCE_CONTROLS/1',expected:40,completed:0,pass:0,fail:0,inventory,firstFailure};assert(Buffer.byteLength(JSON.stringify(worst)+'\n')<=2048);}assert.equal(IDS.length,40);}
           };
           const inventory=IDS.map(id=>({id,status:'not_executed'}));let firstFailure=null;
           try{assert.equal(process.env.GITHUB_SHA,'0'.repeat(40));assert.equal(process.env.GITHUB_RUN_ID,'1');assert(!Object.hasOwn(process.env,'AFW_SYN_CHECKPOINT_KEY'));assert.deepEqual(Object.keys(checks),IDS);for(const row of inventory){try{await checks[row.id]();row.status='passed';}catch{row.status='failed';firstFailure=row.id;break;}}}catch{firstFailure='setup';}
           const pass=inventory.filter(x=>x.status==='passed').length,fail=inventory.filter(x=>x.status==='failed').length,record={marker:'REFERENCE_CONTROLS/1',expected:IDS.length,completed:pass+fail,pass,fail,inventory,firstFailure};
-          const line=JSON.stringify(record);assert(Buffer.byteLength(line)<=2048);process.stdout.write(line+'\n');if(firstFailure!==null||pass!==IDS.length)process.exitCode=1;
+          const line=JSON.stringify(record);assert(Buffer.byteLength(line)+1<=2048);process.stdout.write(line+'\n');if(firstFailure!==null||pass!==IDS.length)process.exitCode=1;
           NODE_REFERENCE_TESTS
           cat >"$RUNNER_TEMP/afw-reference-bootstrap-current.mjs" <<'NODE_REFERENCE_BOOTSTRAP'
           import {readFile,writeFile} from 'node:fs/promises';
@@ -1047,7 +1132,7 @@ jobs:
           
           function inline(tag){const opener="<<'"+tag+"'\n",ending="          "+tag+"\n";need(wf.split(opener).length===2);const a=wf.indexOf(opener)+opener.length,b=wf.indexOf(ending,a);need(b>a);const rows=wf.slice(a,b).split('\n');need(rows.pop()==='');return rows.map(x=>{need(x.startsWith('          '));return x.slice(10);}).join('\n')+'\n';}
           const reference=inline('NODE_REFERENCE'),referenceTests=inline('NODE_REFERENCE_TESTS'),referenceBootstrap=inline('NODE_REFERENCE_BOOTSTRAP');
-          need(hash(reference)==='cd5591be711f253a0f4269ece4abd9bf7ec5b39cc062c78aebd50d72a11c5778'&&hash(referenceTests)==='1503df1943d6bf28d59fbd57186ff565c3cce503342dc4c1db031666d047f631'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
+          need(hash(reference)==='4e9da59da45359ef320bb25600e539189612ea128cc0a53be3afd96171432843'&&hash(referenceTests)==='b2df07710669351cb41c7d19caf968e6d71aa5bc9799327dcaf9f2ae2ae66408'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
           for(const[name,body]of [['afw-readonly-inspector-current.mjs',core],['afw-reference-supplement-current.mjs',reference],['afw-reference-controls-current.mjs',referenceTests],['afw-reference-bootstrap-current.mjs',referenceBootstrap]])await writeFile(join(resolve(process.env.RUNNER_TEMP),name),body,{flag:'wx',mode:0o600});
           const referenceImports="\nimport {validateSupplementPair,validateControlProof} from './afw-reference-supplement-current.mjs';\nconst SOURCE_REFERENCE_SHA="+JSON.stringify(hash(reference))+",SOURCE_REFERENCE_TESTS_SHA="+JSON.stringify(hash(referenceTests))+",SOURCE_REFERENCE_BOOTSTRAP_SHA="+JSON.stringify(hash(referenceBootstrap))+";\n";
           
```
