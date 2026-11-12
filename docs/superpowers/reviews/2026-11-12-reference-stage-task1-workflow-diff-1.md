# Complete logical workflow delta — part 1/3

Logicalbasec7ed76a1..b0dfcf50. These orderedparts concatenate EXACT original61300-characterfullpatch; cutsatnewline maydividehunk, partsnotindividuallyapplicable. Rootappliedcombinedfullpatchallhunks/lines/counts/gaps/tail==FULLcandidate216100chars. GLOBALF59..b0workflowpatchomitted, usefullF7before/fullafter separately; thisdoesnotmisrepresentit.

````diff
@@ -1,5 +1,5 @@
-name: AFW R2 last inserted child FIX1 boundaries QUALIFIED_INACTIVE
-run-name: AFW R2 last inserted child FIX1 boundaries INACTIVE ${{ github.sha }}
+name: AFW reference stage boundaries QUALIFIED_INACTIVE
+run-name: AFW reference stage boundaries INACTIVE ${{ github.sha }}
 on:
   workflow_dispatch:
 permissions:
@@ -553,40 +553,48 @@ jobs:
           import {spawn} from 'node:child_process';
           import {createHash} from 'node:crypto';
           import {validatePublic,inspectionAccepted,baseResult,FLAGS,ORIGINAL} from './afw-reference-v1-current.mjs';
-          export const PURPOSE='afw.readonly-reference-boundaries.safe.v1',MANIFEST='afw.readonly-reference-boundaries-manifest.safe.v1';
+          export const PURPOSE='afw.readonly-reference-stage.safe.v1',MANIFEST='afw.readonly-reference-stage-manifest.safe.v1';
           const BASIC=['completeWrites','completeNormal','lists','gets','peak','referenceRows','responseStatus'],CASES=['R1','R2'],MAX=298888337;
           const hash=b=>createHash('sha256').update(b).digest('hex'),obj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),count=v=>Number.isSafeInteger(v)&&v>=0&&v<=1000000,time=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0&&v<=900000;
           const need=(ok,reason='supplement_rejected')=>{if(!ok){const e=new Error(reason);e.reason=reason;throw e;}};
           const exact=(v,keys)=>need(obj(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k)));
           const utf8=b=>new TextDecoder('utf-8',{fatal:true}).decode(b),max=a=>a.length?Math.max(...a):null,min=a=>a.length?Math.min(...a):null;
           function aggregateUnknown(kind){if(kind==='children')return {status:'unknown',count:null,knownDurationCount:null,maxElapsedMs:null,knownAbortCount:null,abortedCount:null};if(kind==='roots')return {status:'unknown',count:null,knownWindowCount:null,minWindowMs:null,maxWindowMs:null};return {status:'unknown',count:null,knownElapsedCount:null,maxElapsedMs:null,recordedGuardCount:null,maxBodyGuardMs:null};}
           export function unknownReference(caseName,status='not_examined'){need(CASES.includes(caseName));return {case:caseName,status,basic:Object.fromEntries(BASIC.map(k=>[k,null])),lookup:{status:'unknown',budgetMs:null,actualElapsedMs:null,aborted:null},children:aggregateUnknown('children'),roots:aggregateUnknown('roots'),http:aggregateUnknown('http')};}
-          function optional(v,key,predicate){const x=v[key];need(x===undefined||x===null||predicate(x));return x===undefined?null:x;}
-          function aggregate(raw,kind){
+          function optional(v,key,predicate,guard=need){const x=v[key];guard(x===undefined||x===null||predicate(x));return x===undefined?null:x;}
+          function aggregate(raw,kind,guard=need){
            const unknown=aggregateUnknown(kind);if(raw===undefined||raw===null)return {...unknown,status:'absent'};
-           need(Array.isArray(raw)&&raw.length<=256);for(const row of raw)need(obj(row));
-           if(kind==='children'){const durations=[],aborts=[];for(const r of raw){const d=optional(r,'actualElapsedMs',time),a=optional(r,'aborted',v=>typeof v==='boolean');if(d!==null)durations.push(d);if(a!==null)aborts.push(a);}return {status:'present',count:raw.length,knownDurationCount:durations.length,maxElapsedMs:max(durations),knownAbortCount:aborts.length,abortedCount:aborts.filter(Boolean).length};}
-           if(kind==='roots'){const windows=[];for(const r of raw){const t=optional(r,'windowMs',time);if(t!==null)windows.push(t);}return {status:'present',count:raw.length,knownWindowCount:windows.length,minWindowMs:min(windows),maxWindowMs:max(windows)};}
-           const elapsed=[],guards=[];for(const r of raw){const t=optional(r,'elapsedMs',time),g=optional(r,'bodyGuardMs',time);if(t!==null)elapsed.push(t);if(g!==null)guards.push(g);}
+           guard(Array.isArray(raw)&&raw.length<=256);for(const row of raw)guard(obj(row));
+           if(kind==='children'){const durations=[],aborts=[];for(const r of raw){const d=optional(r,'actualElapsedMs',time,guard),a=optional(r,'aborted',v=>typeof v==='boolean',guard);if(d!==null)durations.push(d);if(a!==null)aborts.push(a);}return {status:'present',count:raw.length,knownDurationCount:durations.length,maxElapsedMs:max(durations),knownAbortCount:aborts.length,abortedCount:aborts.filter(Boolean).length};}
+           if(kind==='roots'){const windows=[];for(const r of raw){const t=optional(r,'windowMs',time,guard);if(t!==null)windows.push(t);}return {status:'present',count:raw.length,knownWindowCount:windows.length,minWindowMs:min(windows),maxWindowMs:max(windows)};}
+           const elapsed=[],guards=[];for(const r of raw){const t=optional(r,'elapsedMs',time,guard),g=optional(r,'bodyGuardMs',time,guard);if(t!==null)elapsed.push(t);if(g!==null)guards.push(g);}
            return {status:'present',count:raw.length,knownElapsedCount:elapsed.length,maxElapsedMs:max(elapsed),recordedGuardCount:guards.length,maxBodyGuardMs:max(guards)};
           }
+          export const R1_GROUPS=Object.freeze(['none','file_policy','utf8_json','identity','syn_flags','basic','lookup','children','roots','http','unknown']);
+          export const R2_ENTRIES=Object.freeze(['consume','grant','unknown']);
+          export function unknownReferenceStage(){return {r1FirstRejectedGroup:'unknown',r2LastNonPairOperation:'unknown'};}
           function validatedReferenceRow(raw,caseName){
-           need(CASES.includes(caseName));try{
-            need(obj(raw)&&raw.label==='budget-'+caseName&&raw.testRevision===ORIGINAL.sourceSha);
-            for(const k of ['completePackage','operationalReadiness','PCoff','custodyReal'])need(raw[k]===false);
-            for(const k of BASIC.filter(k=>k!=='responseStatus'))need(count(raw[k]));
-            const status=raw.responseStatus??null;need(status===null||Number.isSafeInteger(status)&&status>=100&&status<=599);
+           need(CASES.includes(caseName));let rejectedError=null,rejectedGroup='unknown';
+           // Associate only the actual error from a false legacy guard. Operand exceptions stay unbranded.
+           const guard=(ok,group)=>{try{need(ok);}catch(error){if(rejectedError===null){rejectedError=error;rejectedGroup=group;}throw error;}};
+           const grouped=group=>ok=>guard(ok,group);
+           try{
+            guard(obj(raw)&&raw.label==='budget-'+caseName&&raw.testRevision===ORIGINAL.sourceSha,'identity');
+            for(const k of ['completePackage','operationalReadiness','PCoff','custodyReal'])guard(raw[k]===false,'syn_flags');
+            for(const k of BASIC.filter(k=>k!=='responseStatus'))guard(count(raw[k]),'basic');
+            const status=raw.responseStatus??null;guard(status===null||Number.isSafeInteger(status)&&status>=100&&status<=599,'basic');
             let lookup={status:'absent',budgetMs:null,actualElapsedMs:null,aborted:null};
-            if(raw.lookupChild!==undefined&&raw.lookupChild!==null){need(obj(raw.lookupChild));const budgetMs=optional(raw.lookupChild,'budgetMs',time),actualElapsedMs=optional(raw.lookupChild,'actualElapsedMs',time),aborted=optional(raw.lookupChild,'aborted',v=>typeof v==='boolean');lookup={status:budgetMs!==null&&actualElapsedMs!==null&&aborted!==null?'present':'incomplete',budgetMs,actualElapsedMs,aborted};}
-            return {case:caseName,status:'present',basic:Object.fromEntries(BASIC.map(k=>[k,k==='responseStatus'?status:raw[k]])),lookup,children:aggregate(raw.children,'children'),roots:aggregate(raw.roots,'roots'),http:aggregate(raw.httpSpans,'http')};
-           }catch{return unknownReference(caseName,'invalid');}
+            if(raw.lookupChild!==undefined&&raw.lookupChild!==null){guard(obj(raw.lookupChild),'lookup');const budgetMs=optional(raw.lookupChild,'budgetMs',time,grouped('lookup')),actualElapsedMs=optional(raw.lookupChild,'actualElapsedMs',time,grouped('lookup')),aborted=optional(raw.lookupChild,'aborted',v=>typeof v==='boolean',grouped('lookup'));lookup={status:budgetMs!==null&&actualElapsedMs!==null&&aborted!==null?'present':'incomplete',budgetMs,actualElapsedMs,aborted};}
+            const row={case:caseName,status:'present',basic:Object.fromEntries(BASIC.map(k=>[k,k==='responseStatus'?status:raw[k]])),lookup,children:aggregate(raw.children,'children',grouped('children')),roots:aggregate(raw.roots,'roots',grouped('roots')),http:aggregate(raw.httpSpans,'http',grouped('http'))};
+            return {row,r1FirstRejectedGroup:caseName==='R1'?'none':'unknown'};
+           }catch(error){return {row:unknownReference(caseName,'invalid'),r1FirstRejectedGroup:caseName==='R1'&&error===rejectedError?rejectedGroup:'unknown'};}
           }
           
           export const POSITIONS=Object.freeze(['baseline','settled','sdk-send','sdk-pending','sdk-resolved','sdk-observed','issuer-send','issuer-pending','issuer-resolved','issuer-ack']);
           export const OPERATIONS=Object.freeze(['open_fence','authorization','consume','grant','AuthorizationLink','GrantLink','source-pair']);
           export function unknownLastChild(status='not_examined'){return {case:'R2',status,childCount:null,ordinal:null,position:'unknown',endPosition:'unknown',elapsedMs:null,aborted:null,stepCount:null,lastStep:'unknown',lastStepElapsedMs:null};}
           export function projectReferenceBoundary(raw,caseName){
-           const row=validatedReferenceRow(raw,caseName);let lastChild=unknownLastChild();
+           const validated=validatedReferenceRow(raw,caseName),row=validated.row,referenceStage={...unknownReferenceStage(),r1FirstRejectedGroup:validated.r1FirstRejectedGroup};let lastChild=unknownLastChild();
            if(caseName==='R2'&&row.status==='present'){
             if(row.children.status==='absent')lastChild=unknownLastChild('unavailable');
             else if(row.children.count===0)lastChild={...unknownLastChild('absent'),childCount:0};
@@ -596,10 +604,11 @@ jobs:
              const known=Array.isArray(steps)&&count(steps.length),stepCount=known?steps.length:null;
              const final=known&&steps.length?steps[steps.length-1]:null,operation=obj(final)&&OPERATIONS.includes(final.operation)?final.operation:'unknown';
              lastChild={case:'R2',status:'present',childCount:row.children.count,ordinal:row.children.count,position:POSITIONS.includes(child.position)?child.position:'unknown',endPosition:POSITIONS.includes(child.endPosition)?child.endPosition:'unknown',elapsedMs:child.actualElapsedMs??null,aborted:child.aborted??null,stepCount,lastStep:stepCount===0?'none':operation,lastStepElapsedMs:operation==='source-pair'&&time(final.elapsedMs)?final.elapsedMs:null};
-             // source-pair finally attaches to activeMetric at emission, including error; no exclusive cause.
+             // Both helper entries and source-pair emissions attach to activeMetric; neither certifies effect/ACK/cause.
+             if(known&&stepCount>0)for(let n=stepCount-1;n>=0;n--){const item=steps[n];if(obj(item)&&item.operation==='source-pair')continue;referenceStage.r2LastNonPairOperation=obj(item)&&['consume','grant'].includes(item.operation)?item.operation:'unknown';break;}
             }
            }
-           return {row,lastChild};
+           return {row,lastChild,referenceStage};
           }
           export function projectReferenceReceipt(raw,caseName){return projectReferenceBoundary(raw,caseName).row;}
           export function validateLastChild(v,row){
@@ -623,7 +632,21 @@ jobs:
            else{need(v.lastStep!=='none');need(v.lastStep==='source-pair'?(v.lastStepElapsedMs===null||time(v.lastStepElapsedMs)):v.lastStepElapsedMs===null);}
            return v;
           }
-          export function validateReferenceSet(v){exact(v,['ownerReference','lastChild']);validateActualReferenceRows(v.ownerReference);need(v.ownerReference.every(r=>r.status!=='not_examined'));validateLastChild(v.lastChild,v.ownerReference[1]);return v;}
+          export function validateReferenceStage(v,rows,lastChild){
+           exact(v,['r1FirstRejectedGroup','r2LastNonPairOperation']);need(R1_GROUPS.includes(v.r1FirstRejectedGroup)&&R2_ENTRIES.includes(v.r2LastNonPairOperation));
+           const group=v.r1FirstRejectedGroup,entry=v.r2LastNonPairOperation,row=rows[0];
+           if(group==='none')need(row.status==='present');
+           else if(group!=='unknown')need(row.status==='invalid');
+           if(row.status==='invalid')need(group!=='none');
+           if(row.status!=='present'&&row.status!=='invalid')need(group==='unknown');
+           if(entry!=='unknown')need(lastChild.status==='present'&&count(lastChild.stepCount)&&lastChild.stepCount>0);
+           if(lastChild.status==='present'&&['consume','grant'].includes(lastChild.lastStep))need(entry===lastChild.lastStep);
+           else if(lastChild.status!=='present'||lastChild.lastStep!=='source-pair')need(entry==='unknown');
+           if(lastChild.lastStep==='source-pair'&&lastChild.stepCount===1)need(entry==='unknown');
+           if(lastChild.lastStep==='source-pair'&&entry!=='unknown')need(lastChild.stepCount>=2);
+           return v;
+          }
+          export function validateReferenceSet(v){exact(v,['ownerReference','lastChild','referenceStage']);validateActualReferenceRows(v.ownerReference);need(v.ownerReference.every(r=>r.status!=='not_examined'));validateLastChild(v.lastChild,v.ownerReference[1]);validateReferenceStage(v.referenceStage,v.ownerReference,v.lastChild);return v;}
           const certificateComplete=(rows,lastChild)=>rows.every(r=>r.status==='present')&&['present','absent'].includes(lastChild.status);
           
           function validateAggregate(v,kind,unknown){
@@ -657,17 +680,17 @@ jobs:
            if(intermediate)need(v.phases.cleanup==='not_attempted'&&v.timings.parseCleanupMs===null,'inspection_intermediate');else need(inspectionAccepted(v),'inspection_rejected');return v;
           }
           const STAGES=['projection','cleanup','authentication','program'],REASONS=['project_failed','projection_deadline','termination_unverified','cleanup_failed','cleanup_deadline','basis_rejected','state_rejected','program_unavailable'];
-          export function makeSupplement(inspection,ownerReference,failure,lastChild=unknownLastChild()){
-           if(failure!==null){ownerReference=CASES.map(c=>unknownReference(c));lastChild=unknownLastChild();}
-           return {purpose:PURPOSE,status:failure===null?(certificateComplete(ownerReference,lastChild)?'complete':'partial'):'rejected',inspection,ownerReference,lastChild,failure,...FLAGS};
+          export function makeSupplement(inspection,ownerReference,failure,lastChild=unknownLastChild(),referenceStage=unknownReferenceStage()){
+           if(failure!==null){ownerReference=CASES.map(c=>unknownReference(c));lastChild=unknownLastChild();referenceStage=unknownReferenceStage();}
+           return {purpose:PURPOSE,status:failure===null?(certificateComplete(ownerReference,lastChild)?'complete':'partial'):'rejected',inspection,ownerReference,lastChild,referenceStage,failure,...FLAGS};
           }
           export function validateSupplementResult(v){
-           exact(v,['purpose','status','inspection','ownerReference','lastChild','failure',...Object.keys(FLAGS)]);need(v.purpose===PURPOSE&&['complete','partial','rejected'].includes(v.status));for(const[k,x]of Object.entries(FLAGS))need(v[k]===x);
+           exact(v,['purpose','status','inspection','ownerReference','lastChild','referenceStage','failure',...Object.keys(FLAGS)]);need(v.purpose===PURPOSE&&['complete','partial','rejected'].includes(v.status));for(const[k,x]of Object.entries(FLAGS))need(v[k]===x);
            validatePublic(v.inspection);need(v.inspection.inspector.source===process.env.GITHUB_SHA&&v.inspection.inspector.run===process.env.GITHUB_RUN_ID,'inspection_identity');
            need(Array.isArray(v.ownerReference)&&v.ownerReference.length===2);CASES.forEach((c,i)=>validateReferenceRow(v.ownerReference[i],c));
-           validateLastChild(v.lastChild,v.ownerReference[1]);
+           validateLastChild(v.lastChild,v.ownerReference[1]);validateReferenceStage(v.referenceStage,v.ownerReference,v.lastChild);
            if(v.failure!==null){exact(v.failure,['stage','reason']);need(STAGES.includes(v.failure.stage)&&REASONS.includes(v.failure.reason));}
-           if(v.status==='rejected'){need(v.failure!==null);assert.deepEqual(v.ownerReference,CASES.map(c=>unknownReference(c)));}else{need(v.failure===null);validateInspectionBasis(v.inspection);validateActualReferenceRows(v.ownerReference);need(v.ownerReference.every(r=>r.status!=='not_examined'));need(v.status===(certificateComplete(v.ownerReference,v.lastChild)?'complete':'partial'));}
+           if(v.status==='rejected'){need(v.failure!==null);assert.deepEqual(v.ownerReference,CASES.map(c=>unknownReference(c)));assert.deepEqual(v.referenceStage,unknownReferenceStage());}else{need(v.failure===null);validateInspectionBasis(v.inspection);validateActualReferenceRows(v.ownerReference);need(v.ownerReference.every(r=>r.status!=='not_examined'));need(v.status===(certificateComplete(v.ownerReference,v.lastChild)?'complete':'partial'));}
            return v;
           }
           export function encodeSupplement(v){
@@ -690,30 +713,34 @@ jobs:
            exact(fault,['stage','code']);need(['directory_stat','open','file_stat','file_read','directory_recheck'].includes(fault.stage)&&['EIO','EACCES'].includes(fault.code));
            if(fault.stage===stage){const error=new Error('reader_unavailable');error.code=fault.code;throw error;}
           }
-          async function stableFile(path,limit,fault=null){
+          async function stableFile(path,limit,fault=null,policy=referencePolicy){
            readerFault(fault,'open');const h=await open(path,FSC.O_RDONLY|FSC.O_NOFOLLOW);
-           try{readerFault(fault,'file_stat');const before=await h.stat({bigint:true});referencePolicy(before.isFile()&&before.nlink===1n);referencePolicy(before.size<=BigInt(limit),'oversize');readerFault(fault,'file_read');const b=await h.readFile();const after=await h.stat({bigint:true});referencePolicy(sameStat(before,after)&&BigInt(b.length)===before.size);return b;}finally{await h.close();}
+           try{readerFault(fault,'file_stat');const before=await h.stat({bigint:true});policy(before.isFile()&&before.nlink===1n);policy(before.size<=BigInt(limit),'oversize');readerFault(fault,'file_read');const b=await h.readFile();const after=await h.stat({bigint:true});policy(sameStat(before,after)&&BigInt(b.length)===before.size);return b;}finally{await h.close();}
           }
           async function readBoundary(plain,caseName,testFault=null){
-           need(CASES.includes(caseName));try{
+           need(CASES.includes(caseName));let rejectedError=null,rejectedGroup='unknown';
+           // This association exists only for one selected file; state/intermediate stableFile calls cannot label R1.
+           const policy=(ok,reason='invalid')=>{try{referencePolicy(ok,reason);}catch(error){rejectedError=error;rejectedGroup=reason==='oversize'?'unknown':'file_policy';throw error;}};
+           const unavailable=(status,group='unknown')=>({row:unknownReference(caseName,status),lastChild:unknownLastChild(),referenceStage:{...unknownReferenceStage(),r1FirstRejectedGroup:caseName==='R1'?group:'unknown'}});
+           try{
             const dirs=[plain,join(plain,'output'),join(plain,'output','owner-reference')],identities=[];
-            for(const d of dirs){readerFault(testFault,'directory_stat');const s=await lstat(d,{bigint:true});referencePolicy(s.isDirectory()&&!s.isSymbolicLink()&&await realpath(d)===d);identities.push(s);}
-            const b=await stableFile(join(dirs[2],'budget-'+caseName+'.json'),MAX,testFault);
-            for(let n=0;n<dirs.length;n++){readerFault(testFault,'directory_recheck');const s=await lstat(dirs[n],{bigint:true});referencePolicy(s.isDirectory()&&!s.isSymbolicLink()&&sameStat(s,identities[n])&&await realpath(dirs[n])===dirs[n]);}
-            let raw;try{raw=JSON.parse(utf8(b));}catch(e){if(e instanceof SyntaxError||e?.code==='ERR_ENCODING_INVALID_ENCODED_DATA')throw new ReferencePolicyRejected();throw e;}
+            for(const d of dirs){readerFault(testFault,'directory_stat');const s=await lstat(d,{bigint:true});policy(s.isDirectory()&&!s.isSymbolicLink()&&await realpath(d)===d);identities.push(s);}
+            const b=await stableFile(join(dirs[2],'budget-'+caseName+'.json'),MAX,testFault,policy);
+            for(let n=0;n<dirs.length;n++){readerFault(testFault,'directory_recheck');const s=await lstat(dirs[n],{bigint:true});policy(s.isDirectory()&&!s.isSymbolicLink()&&sameStat(s,identities[n])&&await realpath(dirs[n])===dirs[n]);}
+            let raw;try{raw=JSON.parse(utf8(b));}catch(e){if(e instanceof SyntaxError||e?.code==='ERR_ENCODING_INVALID_ENCODED_DATA'){const error=new ReferencePolicyRejected();rejectedError=error;rejectedGroup='utf8_json';throw error;}throw e;}
             return projectReferenceBoundary(raw,caseName);
            }catch(e){
-            if(e?.code==='ENOENT')return {row:unknownReference(caseName,'missing'),lastChild:unknownLastChild()};
-            if(e instanceof ReferencePolicyRejected||['ELOOP','ENOTDIR'].includes(e?.code))return {row:unknownReference(caseName,e?.reason==='oversize'?'oversize':'invalid'),lastChild:unknownLastChild()};
+            if(e?.code==='ENOENT')return unavailable('missing');
+            if(e instanceof ReferencePolicyRejected||['ELOOP','ENOTDIR'].includes(e?.code))return unavailable(e?.reason==='oversize'?'oversize':'invalid',e?.reason==='oversize'?'unknown':['ELOOP','ENOTDIR'].includes(e?.code)?'file_policy':e===rejectedError?rejectedGroup:'unknown');
             throw e;
            }
           }
           export async function readReference(plain,caseName,testFault=null){return (await readBoundary(plain,caseName,testFault)).row;}
           export function validateActualReferenceRows(rows){need(Array.isArray(rows)&&rows.length===2);CASES.forEach((c,i)=>validateReferenceRow(rows[i],c));need(rows.every(r=>r.status!=='oversize'));return rows;}
-          export async function readActualReferences(plain,testFault=null){const ownerReference=[];let lastChild=unknownLastChild();for(const c of CASES){const projected=await readBoundary(plain,c,testFault);ownerReference.push(projected.row);if(c==='R2')lastChild=projected.lastChild;}return validateReferenceSet({ownerReference,lastChild});}
+          export async function readActualReferences(plain,testFault=null){const ownerReference=[],referenceStage=unknownReferenceStage();let lastChild=unknownLastChild();for(const c of CASES){const projected=await readBoundary(plain,c,testFault);ownerReference.push(projected.row);if(c==='R1')referenceStage.r1FirstRejectedGroup=projected.referenceStage.r1FirstRejectedGroup;else{lastChild=projected.lastChild;referenceStage.r2LastNonPairOperation=projected.referenceStage.r2LastNonPairOperation;}}return validateReferenceSet({ownerReference,lastChild,referenceStage});}
           export async function coordinateSupplement(io){
            const start=io.now(),projectionEnd=start+10000,totalEnd=start+15000;
-           let inspection=io.base(),rows=CASES.map(c=>unknownReference(c)),lastChild=unknownLastChild(),failure=null,settled=true,cleanupComplete=false;
+           let inspection=io.base(),rows=CASES.map(c=>unknownReference(c)),lastChild=unknownLastChild(),referenceStage=unknownReferenceStage(),failure=null,settled=true,cleanupComplete=false;
            const fail=(stage,reason)=>{if(failure===null)failure={stage,reason};};
            const run=async(mode,end)=>{const r=await io.run(mode,end);if(!r.settled){settled=false;fail(mode==='cleanup-child'?'cleanup':'projection','termination_unverified');}else if(!r.ok)fail(mode==='cleanup-child'?'cleanup':'projection',mode==='cleanup-child'?'cleanup_failed':'project_failed');return r.settled&&r.ok;};
            try{
@@ -723,7 +750,7 @@ jobs:
             if(io.now()>projectionEnd){fail('projection','projection_deadline');throw 0;}
             if(!await run('reference-child',projectionEnd))throw 0;
             if(io.now()>projectionEnd){fail('projection','projection_deadline');throw 0;}
-            const projected=validateReferenceSet(await io.references());rows=projected.ownerReference;lastChild=projected.lastChild;
+            const projected=validateReferenceSet(await io.references());rows=projected.ownerReference;lastChild=projected.lastChild;referenceStage=projected.referenceStage;
             if(io.now()>projectionEnd)fail('projection','projection_deadline');
            }catch{fail('projection','basis_rejected');}
            finally{
@@ -736,7 +763,7 @@ jobs:
            }
            if(!cleanupComplete&&failure===null)fail('cleanup','cleanup_failed');
            if(failure===null)try{validateInspectionBasis(inspection);}catch{fail('projection','basis_rejected');}
-           const out=makeSupplement(inspection,rows,failure,lastChild);validateSupplementResult(out);return out;
+           const out=makeSupplement(inspection,rows,failure,lastChild,referenceStage);validateSupplementResult(out);return out;
           }
           // A child is never reported settled from kill()/exit alone: close confirms all stdio/process handles closed.
           // Deadline is absolute and shared by the coordinator. No post-timeout cleanup window is renewed.
@@ -805,20 +832,20 @@ jobs:
           const IDS=["two_valid","zero_fraction_false","lookup_states","identities_flags","required_bounds","optional_types","array_bounds","empty_absent","writer_http","private_canary","file_missing_bad","file_bound_links","gate_no_read","one_cleanup","primary_cleanup","timeout_cleanup","uncertain_no_cleanup","cleanup_late_fail","whole_hash_bytes","nested_identity","complete_partial","strict_envelope","producer_transport","verifier_transport","lc_pair","lc_last","lc_pos","lc_unknown","lc_ops","lc_steps","lc_scalars","lc_absent","lc_guard","lc_invalid","lc_schema","lc_clean","lc_clock","lc_manifest","lc_transport","lc_bounds"],hash=b=>createHash('sha256').update(b).digest('hex');
           function receipt(caseName='R1'){return {label:'budget-'+caseName,testRevision:ORIGINAL.sourceSha,completeWrites:1,completeNormal:0,referenceRows:0,lists:2,gets:0,peak:2,responseStatus:200,lookupChild:{budgetMs:5000,actualElapsedMs:0.25,aborted:false},children:[{actualElapsedMs:0.5,aborted:false,trace:'PRIVATE_CANARY'}],roots:[{method:'PRIVATE_CANARY',windowMs:1.25}],http:{requests:999,bytes:123},httpSpans:[{kind:'PRIVATE_CANARY',bytes:111,elapsedMs:0.75,bodyGuardMs:0,childStartedAt:1234567890}],completePackage:false,operationalReadiness:false,PCoff:false,custodyReal:false};}
           function basis(intermediate=false){const r=baseResult();r.status='inspected';r.artifact.verified=true;r.authentication={authenticated:true,innerInventoryVerified:true,fileCount:128,totalBytes:298888337};r.failureIdentity={verified:true,commandSucceeded:false,elapsedMs:1};r.phases={fixtures:'passed',download:'verified',authentication:'authenticated',identity:'verified',projection:'projected',cleanup:intermediate?'not_attempted':'complete'};r.timings={downloadMs:1,openMs:1,parseCleanupMs:intermediate?null:1};r.fixtures.checks=91;r.tap.status='present';r.tap.recordedCaseCount=3;for(const c of r.cases)c.tap.status='fail';return r;}
-          function projectedSet(raw=receipt('R2')){const p=S.projectReferenceBoundary(raw,'R2');return {ownerReference:[S.projectReferenceReceipt(receipt('R1'),'R1'),p.row],lastChild:p.lastChild};}
-          function boundaryValue(raw=receipt('R2')){const p=projectedSet(raw);return S.makeSupplement(basis(),p.ownerReference,null,p.lastChild);}
````
