# Complete scoped workflow fix — b0dfcf50..cf223f03

All11hunks/lines/gaps/tail independentlyappliedandmatchedfullafter, noomission. Productionhelper/Core/ZIP/bootstrap/pairunchanged.

````diff
@@ -1,5 +1,5 @@
-name: AFW reference stage boundaries QUALIFIED_INACTIVE
-run-name: AFW reference stage boundaries INACTIVE ${{ github.sha }}
+name: AFW reference stage FIX1 QUALIFIED_INACTIVE
+run-name: AFW reference stage FIX1 INACTIVE ${{ github.sha }}
 on:
   workflow_dispatch:
 permissions:
@@ -824,7 +824,7 @@ jobs:
           NODE_REFERENCE
           cat >"$RUNNER_TEMP/afw-reference-controls-current.mjs" <<'NODE_REFERENCE_TESTS'
           import assert from 'node:assert/strict';
-          import {mkdtemp,mkdir,writeFile,symlink,link,rm,truncate} from 'node:fs/promises';
+          import {mkdtemp,mkdir,writeFile,symlink,link,rm,truncate,lstat} from 'node:fs/promises';
           import {join,resolve} from 'node:path';
           import {createHash} from 'node:crypto';
           import * as S from './afw-reference-supplement-current.mjs';
@@ -872,8 +872,8 @@ jobs:
            nested_identity:()=>{for(const f of [r=>r.inspector.source='1'.repeat(40),r=>r.inspector.run='2',r=>r.originalContext.sourceSha='1'.repeat(40),r=>r.artifact.id=1,r=>r.authentication.fileCount=127,r=>r.authentication.totalBytes=298888336,r=>r.fixtures.checks=1,r=>r.tap.recordedCaseCount=2]){const v=value();f(v.inspection);const b=Buffer.from(JSON.stringify(v)),m={purpose:S.MANIFEST,inspectorSource:process.env.GITHUB_SHA,inspectorRun:process.env.GITHUB_RUN_ID,attempt:1,files:[{path:'result.json',bytes:b.length,sha256:hash(b)}]};mustReject(()=>S.validateSupplementPair(new Map([['result.json',b],['manifest.json',Buffer.from(JSON.stringify(m))]])));}},
            complete_partial:()=>{for(const rowStatus of ['missing','invalid','oversize']){const v=value();v.ownerReference[1]=S.unknownReference('R2',rowStatus);v.lastChild=S.unknownLastChild();v.status='partial';const partial=pair(v);if(rowStatus==='oversize'){assert.equal(S.producerTransportAccepted(partial),false);mustReject(()=>S.validateSupplementPair(partial));}else{assert.equal(S.producerTransportAccepted(partial),true);assert.equal(S.validateSupplementPair(partial).status,'partial');}v.status='complete';const complete=pair(v);assert.equal(S.producerTransportAccepted(complete),false);mustReject(()=>S.validateSupplementPair(complete));}},
            strict_envelope:()=>{const rejected=value();rejected.status='rejected';rejected.failure={stage:'projection',reason:'project_failed'};rejected.inspection=baseResult();mustReject(()=>S.validateSupplementResult(rejected));const published=S.publicationResult(rejected);assert.equal(published.status,'rejected');assert.deepEqual(published.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));const constructed=S.makeSupplement(baseResult(),value().ownerReference,{stage:'projection',reason:'basis_rejected'});assert.deepEqual(constructed.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));S.validateSupplementResult(constructed);for(const f of [v=>v.extra=true,v=>v.ownerReference.reverse(),v=>v.PCoff=true,v=>v.ownerReference[0].basic.extra='PRIVATE_CANARY',v=>v.ownerReference[0].children.count=null,v=>v.failure={stage:'PRIVATE_CANARY',reason:'PRIVATE_CANARY'}]){const v=value();f(v);mustReject(()=>S.validateSupplementResult(v));}},
-           producer_transport:()=>{for(const v of [value(),S.makeSupplement(basis(),[S.unknownReference('R1','missing'),S.unknownReference('R2','invalid')],null)])assert.equal(S.producerTransportAccepted(S.encodeSupplement(v)),true);const bad=value();bad.status='partial';bad.ownerReference[0]=S.unknownReference('R1','oversize');assert.equal(S.producerTransportAccepted(S.encodeSupplement(bad)),false);const v=value();v.status='rejected';v.failure={stage:'projection',reason:'project_failed'};assert.equal(S.producerTransportAccepted(S.encodeSupplement(v)),false);},
-           verifier_transport:()=>{for(const v of [value(),S.makeSupplement(basis(),[S.unknownReference('R1','invalid'),S.unknownReference('R2','missing')],null)])assert.equal(S.validateSupplementPair(S.encodeSupplement(v)).status,v.status);const bad=value();bad.status='partial';bad.ownerReference[0]=S.unknownReference('R1','oversize');mustReject(()=>S.validateSupplementPair(S.encodeSupplement(bad)));const p=pair();p.set('third.json',Buffer.from('{}'));mustReject(()=>S.validateSupplementPair(p));},
+           producer_transport:()=>{for(const v of [value(),S.makeSupplement(basis(),[S.unknownReference('R1','missing'),S.unknownReference('R2','invalid')],null)])assert.equal(S.producerTransportAccepted(S.encodeSupplement(v)),true);for(const rowStatus of ['missing','invalid','oversize']){const variant=value();variant.status='partial';variant.ownerReference[0]=S.unknownReference('R1',rowStatus);variant.referenceStage.r1FirstRejectedGroup='unknown';S.validateReferenceRow(variant.ownerReference[0],'R1');S.validateLastChild(variant.lastChild,variant.ownerReference[1]);S.validateReferenceStage(variant.referenceStage,variant.ownerReference,variant.lastChild);const currentPair=pair(variant);assert.equal(S.producerTransportAccepted(currentPair),rowStatus!=='oversize');if(rowStatus==='oversize')mustReject(()=>S.validateSupplementPair(currentPair));else assert.deepEqual(S.validateSupplementPair(currentPair),variant);}const v=value();v.status='rejected';v.failure={stage:'projection',reason:'project_failed'};assert.equal(S.producerTransportAccepted(S.encodeSupplement(v)),false);},
+           verifier_transport:()=>{for(const v of [value(),S.makeSupplement(basis(),[S.unknownReference('R1','invalid'),S.unknownReference('R2','missing')],null)])assert.equal(S.validateSupplementPair(S.encodeSupplement(v)).status,v.status);for(const rowStatus of ['missing','invalid','oversize']){const variant=value();variant.status='partial';variant.ownerReference[0]=S.unknownReference('R1',rowStatus);variant.referenceStage.r1FirstRejectedGroup='unknown';S.validateReferenceRow(variant.ownerReference[0],'R1');S.validateLastChild(variant.lastChild,variant.ownerReference[1]);S.validateReferenceStage(variant.referenceStage,variant.ownerReference,variant.lastChild);const currentPair=pair(variant);assert.equal(S.producerTransportAccepted(currentPair),rowStatus!=='oversize');if(rowStatus==='oversize')mustReject(()=>S.validateSupplementPair(currentPair));else assert.deepEqual(S.validateSupplementPair(currentPair),variant);}const p=pair();p.set('third.json',Buffer.from('{}'));mustReject(()=>S.validateSupplementPair(p));},
           
            lc_pair:()=>{const r=receipt('R2');r.children=[{actualElapsedMs:5018,aborted:true,position:'settled',steps:[{operation:'source-pair',elapsedMs:6000}]},{actualElapsedMs:12,aborted:false,position:'sdk-pending',endPosition:'settled',steps:[{operation:'source-pair',elapsedMs:20.5}]}];const v=boundaryValue(r);assert.equal(v.ownerReference[1].children.maxElapsedMs,5018);assert.equal(v.ownerReference[1].children.abortedCount,1);assert.deepEqual(v.lastChild,{case:'R2',status:'present',childCount:2,ordinal:2,position:'sdk-pending',endPosition:'settled',elapsedMs:12,aborted:false,stepCount:1,lastStep:'source-pair',lastStepElapsedMs:20.5});assert.equal(S.validateSupplementPair(pair(v)).status,'complete');},
            lc_last:()=>{const r=receipt('R2');r.children=[{startedAt:99999,actualElapsedMs:900,aborted:true,position:'issuer-ack'},{startedAt:1,actualElapsedMs:3.25,aborted:false,position:'baseline',steps:[]}];const v=boundaryValue(r);assert.equal(v.lastChild.ordinal,2);assert.equal(v.lastChild.elapsedMs,3.25);assert.equal(v.lastChild.position,'baseline');assert.equal(v.lastChild.lastStep,'none');assert.equal(v.lastChild.aborted,false);assert.equal(v.lastChild.lastStepElapsedMs,null);S.validateSupplementPair(pair(v));},
@@ -906,7 +906,26 @@ jobs:
             v=>{v.purpose='afw.readonly-owner-reference-supplement.safe.v1';}
            ];for(const change of corrupt){const v=value();change(v);assert.equal(S.producerTransportAccepted(pair(v)),false);mustReject(()=>S.validateSupplementPair(pair(v)));const out=await simulate({referenceSet:{ownerReference:v.ownerReference,lastChild:v.lastChild,referenceStage:v.referenceStage}});if(v.purpose===S.PURPOSE){assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));assert.deepEqual(out.result.lastChild,S.unknownLastChild());}}
            const rejected=S.makeSupplement(baseResult(),value().ownerReference,{stage:'cleanup',reason:'cleanup_failed'},value().lastChild);S.validateSupplementPair(pair(rejected),{allowRejected:true});assert.equal(S.producerTransportAccepted(pair(rejected)),false);},
-           lc_bounds:()=>{const r=receipt('R2');r.children=Array.from({length:256},()=>({actualElapsedMs:0,aborted:false}));r.children[255].steps=Array(1000000).fill(null);const v=boundaryValue(r);assert.equal(v.lastChild.childCount,256);assert.equal(v.lastChild.ordinal,256);assert.equal(v.lastChild.stepCount,1000000);S.validateSupplementPair(pair(v));r.children[255].steps.push({operation:'source-pair',elapsedMs:3});assert.equal(boundaryValue(r).lastChild.stepCount,null);const q=pair();q.set('result.json',Buffer.alloc(65536));mustReject(()=>S.validateSupplementPair(q));for(const passed of [true,false]){
+           lc_bounds:()=>{const r=receipt('R2');r.children=Array.from({length:256},()=>({actualElapsedMs:0,aborted:false}));r.children[255].steps=Array(1000000).fill(null);const v=boundaryValue(r);assert.equal(v.lastChild.childCount,256);assert.equal(v.lastChild.ordinal,256);assert.equal(v.lastChild.stepCount,1000000);S.validateSupplementPair(pair(v));r.children[255].steps.push({operation:'source-pair',elapsedMs:3});assert.equal(boundaryValue(r).lastChild.stepCount,null);const q=pair();q.set('result.json',Buffer.alloc(65536));mustReject(()=>S.validateSupplementPair(q));for(const passed of [true,false]){const inventory=IDS.map((id,i)=>({id,status:passed?'passed':i===0?'failed':'not_executed'})),record={marker:'REFERENCE_CONTROLS/1',expected:40,completed:passed?40:1,pass:passed?40:0,fail:passed?0:1,inventory,firstFailure:passed?null:IDS[0]};assert(Buffer.byteLength(JSON.stringify(record)+'\n')<=2048);}for(const firstFailure of ['setup',...IDS]){const inventory=IDS.map(id=>({id,status:'not_executed'})),worst={marker:'REFERENCE_CONTROLS/1',expected:40,completed:0,pass:0,fail:0,inventory,firstFailure};assert(Buffer.byteLength(JSON.stringify(worst)+'\n')<=2048);}assert.equal(IDS.length,40);}
+          };
+          
+          const EXPECTED_EXPANSION_IDS=Object.freeze(['two_valid','identities_flags','required_bounds','optional_types','array_bounds','private_canary','file_missing_bad','file_bound_links','gate_no_read','timeout_cleanup','uncertain_no_cleanup','strict_envelope','lc_pair','lc_last','lc_unknown','lc_ops','lc_steps','lc_schema','lc_clean','lc_clock','lc_manifest','lc_bounds']);
+          function createExpansionHarness(expected,callbacks){
+           assert.deepEqual(Object.keys(callbacks),expected);
+           const tokens=new Map(expected.map(id=>[id,Symbol(id)])),completed=new Map(expected.map(id=>[id,0]));
+           return {
+            wrap(id,original){
+             assert(expected.includes(id));assert.equal(typeof original,'function');assert.equal(typeof callbacks[id],'function');
+             return async()=>{
+              assert.equal(completed.get(id),0);await original();let issued=0;
+              const result=await callbacks[id](()=>{issued++;assert.equal(issued,1);return tokens.get(id);});
+              assert.equal(issued,1);assert.equal(result,tokens.get(id));assert.equal(completed.get(id),0);completed.set(id,1);
+             };
+            },
+            barrier(){assert.equal(completed.size,expected.length);for(const id of expected)assert.equal(completed.get(id),1);return expected.map(id=>({id,count:completed.get(id)}));}
+           };
+          }
+          
           // Expand the same forty named controls: these call current production projection/coordinator/transport, never a mirror.
           function group(raw,expected){const p=S.projectReferenceBoundary(raw,'R1');assert.equal(p.referenceStage.r1FirstRejectedGroup,expected);assert.equal(p.referenceStage.r2LastNonPairOperation,'unknown');return p;}
           function fullExpectedRow(caseName){return {case:caseName,status:'present',basic:{completeWrites:1,completeNormal:0,lists:2,gets:0,peak:2,referenceRows:0,responseStatus:200},lookup:{status:'present',budgetMs:5000,actualElapsedMs:0.25,aborted:false},children:{status:'present',count:1,knownDurationCount:1,maxElapsedMs:0.5,knownAbortCount:1,abortedCount:0},roots:{status:'present',count:1,knownWindowCount:1,minWindowMs:1.25,maxWindowMs:1.25},http:{status:'present',count:1,knownElapsedCount:1,maxElapsedMs:0.75,recordedGuardCount:1,maxBodyGuardMs:0}};}
@@ -921,7 +940,7 @@ jobs:
            S.validateSupplementResult(result);assert.equal(S.producerTransportAccepted(pair(result)),false);
           }
           const expansions={
-           two_valid:async()=>temporary(async root=>{
+           two_valid:async(done)=>temporary(async root=>{
             const dir=join(root,'output','owner-reference');await mkdir(dir,{recursive:true});
             for(const operation of ['consume','grant']){
              const r1=receipt('R1'),r2=receipt('R2');Object.assign(r2.children[0],{position:'settled',endPosition:'issuer-ack',steps:[{operation},{operation:'source-pair',elapsedMs:0.75}]});
@@ -933,8 +952,8 @@ jobs:
              assert.deepEqual(out.result.lastChild,expectedChild);assert.deepEqual(out.result.referenceStage,expectedStage);
              assert.deepEqual(S.validateSupplementPair(pair(out.result)),out.result);assert.equal(S.producerTransportAccepted(pair(out.result)),true);
             }
-           }),
-           identities_flags:()=>{
+           return done();}),
+           identities_flags:(done)=>{
             assert.deepEqual(S.R1_GROUPS,['none','file_policy','utf8_json','identity','syn_flags','basic','lookup','children','roots','http','unknown']);
             group(receipt(),'none');
             for(const raw of [null,[],{},false,1,'PRIVATE_CANARY'])group(raw,'identity');
@@ -950,14 +969,14 @@ jobs:
             for(const key of ['children','roots','httpSpans']){const r=receipt();const primary=new TypeError('file_policy');r[key]=[{get actualElapsedMs(){throw primary;},get windowMs(){throw primary;},get elapsedMs(){throw primary;}}];group(r,'unknown');}
             const bad=receipt();bad.children=false;assert.equal(group(bad,'children').referenceStage.r1FirstRejectedGroup,'children');
             const r2=S.projectReferenceBoundary({...receipt('R2'),PCoff:true},'R2');assert.deepEqual(r2.referenceStage,S.unknownReferenceStage());group(receipt(),'none');
-           },
-           required_bounds:()=>{for(const key of ['completeWrites','completeNormal','lists','gets','peak','referenceRows','responseStatus']){const r=receipt();r[key]=-1;group(r,'basic');}},
-           optional_types:()=>{
+           return done();},
+           required_bounds:(done)=>{for(const key of ['completeWrites','completeNormal','lists','gets','peak','referenceRows','responseStatus']){const r=receipt();r[key]=-1;group(r,'basic');}return done();},
+           optional_types:(done)=>{
             for(const [key,raw,expected]of [['lookupChild',false,'lookup'],['lookupChild',{budgetMs:'1'},'lookup'],['lookupChild',{actualElapsedMs:-1},'lookup'],['lookupChild',{aborted:0},'lookup'],['children',[null],'children'],['children',[{aborted:0}],'children'],['children',[{actualElapsedMs:-1}],'children'],['roots',[{windowMs:-1}],'roots'],['httpSpans',[{elapsedMs:-1}],'http'],['httpSpans',[{bodyGuardMs:'0'}],'http']]){const r=receipt();r[key]=raw;group(r,expected);}
-           },
-           array_bounds:()=>{for(const [key,expected]of [['children','children'],['roots','roots'],['httpSpans','http']])for(const bad of [{},Array(257).fill({})]){const r=receipt();r[key]=bad;group(r,expected);}},
-           private_canary:()=>{const r=receipt();r.trace=r.reason=r.subject=r.url='PRIVATE_CANARY';const p=group(r,'none');assert(!JSON.stringify(p).includes('PRIVATE_CANARY'));},
-           file_missing_bad:async()=>temporary(async root=>{
+           return done();},
+           array_bounds:(done)=>{for(const [key,expected]of [['children','children'],['roots','roots'],['httpSpans','http']])for(const bad of [{},Array(257).fill({})]){const r=receipt();r[key]=bad;group(r,expected);}return done();},
+           private_canary:(done)=>{const r=receipt();r.trace=r.reason=r.subject=r.url='PRIVATE_CANARY';const p=group(r,'none');assert(!JSON.stringify(p).includes('PRIVATE_CANARY'));return done();},
+           file_missing_bad:async(done)=>temporary(async root=>{
             let set=await S.readActualReferences(root);assert.deepEqual(set.referenceStage,S.unknownReferenceStage());assert.deepEqual(set.ownerReference,['R1','R2'].map(c=>S.unknownReference(c,'missing')));
             const dir=join(root,'output','owner-reference');await mkdir(dir,{recursive:true});const file=join(dir,'budget-R1.json');
             await writeFile(join(dir,'budget-R2.json'),JSON.stringify(receipt('R2')));
@@ -969,20 +988,23 @@ jobs:
             }
             // Read R2 alone after malformed R1 cannot inherit its classification; a later clean read resets locally.
             await writeFile(file,'{');unknown(await S.readReference(root,'R1'));assert.equal((await S.readReference(root,'R2')).status,'present');await writeFile(file,JSON.stringify(receipt()));assert.equal((await S.readActualReferences(root)).referenceStage.r1FirstRejectedGroup,'none');
-           }),
-           file_bound_links:async()=>temporary(async root=>{
+           return done();}),
+           file_bound_links:async(done)=>temporary(async root=>{
             const dir=join(root,'output','owner-reference');await mkdir(dir,{recursive:true});const file=join(dir,'budget-R1.json'),r2=join(dir,'budget-R2.json'),target=join(root,'target');
             await writeFile(r2,JSON.stringify(receipt('R2')));await writeFile(target,JSON.stringify(receipt()));
             await symlink(target,file);let set=await S.readActualReferences(root);assert.equal(set.referenceStage.r1FirstRejectedGroup,'file_policy');assert.equal(set.ownerReference[0].status,'invalid');await rm(file);
             await link(target,file);set=await S.readActualReferences(root);assert.equal(set.referenceStage.r1FirstRejectedGroup,'file_policy');await rm(file);
             await mkdir(file);set=await S.readActualReferences(root);assert.equal(set.referenceStage.r1FirstRejectedGroup,'file_policy');await rm(file,{recursive:true});
             // ENOTDIR retains the pre-existing invalid mapping and is scoped to the selected read.
             await rm(join(root,'output'),{recursive:true});await writeFile(join(root,'output'),'not a directory');set=await S.readActualReferences(root);assert.equal(set.ownerReference[0].status,'invalid');assert.equal(set.referenceStage.r1FirstRejectedGroup,'file_policy');
-           }),
-           gate_no_read:async()=>{const out=await simulate({mutate:r=>r.authentication.authenticated=false,references:()=>{throw Error('unreachable');}});assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());},
-           timeout_cleanup:async()=>{for(const options of [{projectTime:10001},{lateValidation:true},{cleanupTime:15000}]){const out=await simulate(options);assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());}},
-           uncertain_no_cleanup:async()=>{const out=await simulate({fail:'reference-child',settled:false});assert.equal(out.result.inspection.phases.cleanup,'unknown');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());},
-           strict_envelope:async()=>{
+            const belowFile=join(root,'output','plain');await assert.rejects(()=>lstat(belowFile),e=>e.code==='ENOTDIR');
+            set=await S.readActualReferences(belowFile);assert.deepEqual(set.ownerReference,['R1','R2'].map(c=>S.unknownReference(c,'invalid')));assert.deepEqual(set.lastChild,S.unknownLastChild());assert.deepEqual(set.referenceStage,{r1FirstRejectedGroup:'file_policy',r2LastNonPairOperation:'unknown'});
+          
+           return done();}),
+           gate_no_read:async(done)=>{const out=await simulate({mutate:r=>r.authentication.authenticated=false,references:()=>{throw Error('unreachable');}});assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());return done();},
+           timeout_cleanup:async(done)=>{for(const options of [{projectTime:10001},{lateValidation:true},{cleanupTime:15000}]){const out=await simulate(options);assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());}return done();},
+           uncertain_no_cleanup:async(done)=>{const out=await simulate({fail:'reference-child',settled:false});assert.equal(out.result.inspection.phases.cleanup,'unknown');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());return done();},
+           strict_envelope:async(done)=>{
             const mutations=[v=>delete v.referenceStage,v=>v.referenceStage=null,v=>v.referenceStage=[],v=>v.referenceStage='unknown',v=>v.referenceStage.extra=true,v=>delete v.referenceStage.r1FirstRejectedGroup,v=>delete v.referenceStage.r2LastNonPairOperation];
             for(const key of ['r1FirstRejectedGroup','r2LastNonPairOperation'])for(const bad of [null,false,0,{},[],'PRIVATE_CANARY','consume-private','NONE'])mutations.push(v=>v.referenceStage[key]=bad);
             for(const change of mutations){const v=value();change(v);await rejectedEverywhere(v);}
@@ -991,13 +1013,13 @@ jobs:
              const coherent=status==='present'?['none','unknown'].includes(g):status==='invalid'?g!=='none':g==='unknown';
              if(coherent&&!['not_examined','oversize'].includes(status)){assert.equal(S.producerTransportAccepted(pair(v)),true);S.validateSupplementPair(pair(v));}else{assert.equal(S.producerTransportAccepted(pair(v)),false);mustReject(()=>S.validateSupplementPair(pair(v)));}
             }
-           },
-           lc_pair:()=>{for(const operation of ['consume','grant']){const v=entryValue([{operation},{operation:'source-pair',elapsedMs:0.75}]);assert.equal(v.referenceStage.r2LastNonPairOperation,operation);assert.deepEqual(v.ownerReference,[fullExpectedRow('R1'),fullExpectedRow('R2')]);assert.deepEqual(v.lastChild,expectedPairChild());S.validateSupplementPair(pair(v));}},
-           lc_last:()=>{const raw=receipt('R2');raw.children=[{actualElapsedMs:900,aborted:true,steps:[{operation:'consume'}]},{actualElapsedMs:0.5,aborted:false,steps:[{operation:'grant'},{operation:'source-pair'}]}];const v=boundaryValue(raw);assert.equal(v.referenceStage.r2LastNonPairOperation,'grant');assert.equal(v.lastChild.ordinal,2);assert.equal(v.ownerReference[1].children.maxElapsedMs,900);},
-           lc_unknown:()=>{for(const item of [null,{},false,'PRIVATE_CANARY',{operation:'PRIVATE_CANARY'},{operation:'source-pair-private'},{operation:'Consume'},{operation:'authorization'},{operation:'GrantLink'},{operation:'open_fence'}]){const v=entryValue([{operation:'consume'},item,{operation:'source-pair'}]);assert.equal(v.referenceStage.r2LastNonPairOperation,'unknown');assert(!JSON.stringify(v).includes('PRIVATE_CANARY'));S.validateSupplementPair(pair(v));}},
-           lc_ops:()=>{assert.deepEqual(S.R2_ENTRIES,['consume','grant','unknown']);for(const operation of S.OPERATIONS){const v=entryValue([{operation:'grant'},{operation}]);assert.equal(v.referenceStage.r2LastNonPairOperation,operation==='source-pair'?'grant':['consume','grant'].includes(operation)?operation:'unknown');S.validateSupplementPair(pair(v));}},
-           lc_steps:()=>{for(const steps of [undefined,null,{},'PRIVATE_CANARY',3,[],[{operation:'source-pair'}],[{operation:'source-pair'},{operation:'source-pair'}]]){const v=entryValue(steps);assert.equal(v.referenceStage.r2LastNonPairOperation,'unknown');S.validateSupplementPair(pair(v));}},
-           lc_schema:async()=>{
+           return done();},
+           lc_pair:(done)=>{for(const operation of ['consume','grant']){const v=entryValue([{operation},{operation:'source-pair',elapsedMs:0.75}]);assert.equal(v.referenceStage.r2LastNonPairOperation,operation);assert.deepEqual(v.ownerReference,[fullExpectedRow('R1'),fullExpectedRow('R2')]);assert.deepEqual(v.lastChild,expectedPairChild());S.validateSupplementPair(pair(v));}return done();},
+           lc_last:(done)=>{const raw=receipt('R2');raw.children=[{actualElapsedMs:900,aborted:true,steps:[{operation:'consume'}]},{actualElapsedMs:0.5,aborted:false,steps:[{operation:'grant'},{operation:'source-pair'}]}];const v=boundaryValue(raw);assert.equal(v.referenceStage.r2LastNonPairOperation,'grant');assert.equal(v.lastChild.ordinal,2);assert.equal(v.ownerReference[1].children.maxElapsedMs,900);return done();},
+           lc_unknown:(done)=>{for(const item of [null,{},false,'PRIVATE_CANARY',{operation:'PRIVATE_CANARY'},{operation:'source-pair-private'},{operation:'Consume'},{operation:'authorization'},{operation:'GrantLink'},{operation:'open_fence'}]){const v=entryValue([{operation:'consume'},item,{operation:'source-pair'}]);assert.equal(v.referenceStage.r2LastNonPairOperation,'unknown');assert(!JSON.stringify(v).includes('PRIVATE_CANARY'));S.validateSupplementPair(pair(v));}return done();},
+           lc_ops:(done)=>{assert.deepEqual(S.R2_ENTRIES,['consume','grant','unknown']);for(const operation of S.OPERATIONS){const v=entryValue([{operation:'grant'},{operation}]);assert.equal(v.referenceStage.r2LastNonPairOperation,operation==='source-pair'?'grant':['consume','grant'].includes(operation)?operation:'unknown');S.validateSupplementPair(pair(v));}return done();},
+           lc_steps:(done)=>{for(const steps of [undefined,null,{},'PRIVATE_CANARY',3,[],[{operation:'source-pair'}],[{operation:'source-pair'},{operation:'source-pair'}]]){const v=entryValue(steps);assert.equal(v.referenceStage.r2LastNonPairOperation,'unknown');S.validateSupplementPair(pair(v));}return done();},
+           lc_schema:async(done)=>{
             const singleton=entryValue([{operation:'source-pair',elapsedMs:0.75}]);assert.deepEqual(singleton.lastChild,expectedPairChild(1));assert.equal(singleton.referenceStage.r2LastNonPairOperation,'unknown');
             assert.equal(S.producerTransportAccepted(pair(singleton)),true);S.validateSupplementPair(pair(singleton));const positive=await simulate({referenceSet:{ownerReference:singleton.ownerReference,lastChild:singleton.lastChild,referenceStage:singleton.referenceStage}});assert.equal(positive.result.status,'complete');
             for(const operation of ['consume','grant']){const v=structuredClone(singleton);v.referenceStage.r2LastNonPairOperation=operation;await rejectedEverywhere(v);}
@@ -1007,26 +1029,34 @@ jobs:
              const v=entryValue([{operation}]);for(const wrong of ['unknown',operation==='consume'?'grant':'consume']){const bad=structuredClone(v);bad.referenceStage.r2LastNonPairOperation=wrong;await rejectedEverywhere(bad);}
             }
             for(const lastStep of ['authorization','unknown','none']){const v=entryValue(lastStep==='none'?[]:[{operation:lastStep}]);for(const operation of ['consume','grant']){v.referenceStage.r2LastNonPairOperation=operation;await rejectedEverywhere(v);}}
-           },
-           lc_clean:async()=>{for(const options of [{cleanupOk:false},{fail:'cleanup-child'},{fail:'reference-child',settled:false},{cleanupUnsettled:true}]){const {result}=await simulate(options);assert.equal(result.status,'rejected');assert.deepEqual(result.referenceStage,S.unknownReferenceStage());}const v=value();v.status='rejected';v.failure={stage:'projection',reason:'project_failed'};v.ownerReference=['R1','R2'].map(c=>S.unknownReference(c));v.lastChild=S.unknownLastChild();mustReject(()=>S.validateSupplementResult(v));assert.deepEqual(S.publicationResult(v).referenceStage,S.unknownReferenceStage());},
-           lc_clock:async()=>{const v=entryValue([{operation:'grant'},{operation:'source-pair'}]);const set={ownerReference:v.ownerReference,lastChild:v.lastChild,referenceStage:v.referenceStage};const out=await simulate({referenceSet:set,cleanupTime:15000});assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());},
-           lc_manifest:()=>{
+           return done();},
+           lc_clean:async(done)=>{for(const options of [{cleanupOk:false},{fail:'cleanup-child'},{fail:'reference-child',settled:false},{cleanupUnsettled:true}]){const {result}=await simulate(options);assert.equal(result.status,'rejected');assert.deepEqual(result.referenceStage,S.unknownReferenceStage());}const v=value();v.status='rejected';v.failure={stage:'projection',reason:'project_failed'};v.ownerReference=['R1','R2'].map(c=>S.unknownReference(c));v.lastChild=S.unknownLastChild();mustReject(()=>S.validateSupplementResult(v));assert.deepEqual(S.publicationResult(v).referenceStage,S.unknownReferenceStage());return done();},
+           lc_clock:async(done)=>{const v=entryValue([{operation:'grant'},{operation:'source-pair'}]);const set={ownerReference:v.ownerReference,lastChild:v.lastChild,referenceStage:v.referenceStage};const out=await simulate({referenceSet:set,cleanupTime:15000});assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());return done();},
+           lc_manifest:(done)=>{
             const v=value(),p=pair(v),m=JSON.parse(p.get('manifest.json'));assert.equal(m.files[0].sha256,hash(p.get('result.json')));
             const changed=structuredClone(v);changed.referenceStage.r1FirstRejectedGroup='unknown';p.set('result.json',Buffer.from(JSON.stringify(changed)));mustReject(()=>S.validateSupplementPair(p));
             assert.equal(S.validateSupplementPair(pair(changed)).referenceStage.r1FirstRejectedGroup,'unknown');
             for(const f of [v=>v.purpose='afw.readonly-reference-boundaries.safe.v1',v=>v.inspection.inspector.source=ORIGINAL.sourceSha,v=>v.inspection.inspector.run=ORIGINAL.runId]){const q=value();f(q);mustReject(()=>S.validateSupplementPair(pair(q)));assert.equal(S.producerTransportAccepted(pair(q)),false);}
-           },
-           lc_bounds:()=>{
+           return done();},
+           lc_bounds:async(done)=>{
             const raw=receipt('R2'),steps=Array(1000001).fill(null);Object.defineProperty(steps,0,{get(){throw Error('must not peek over bound');}});raw.children[0].steps=steps;const v=boundaryValue(raw);assert.equal(v.lastChild.stepCount,null);assert.equal(v.referenceStage.r2LastNonPairOperation,'unknown');
             raw.children[0].steps=Array(1000000).fill({operation:'source-pair'});assert.equal(boundaryValue(raw).referenceStage.r2LastNonPairOperation,'unknown');
-           }
-          };
-          for(const [id,extra]of Object.entries(expansions)){assert(IDS.includes(id));const original=checks[id];checks[id]=async()=>{await original();await extra();};}
+            // The SAME harness must reject missing, skipped, no-op, forged, unreturned and duplicate completion.
+            const expected=['two_valid'];mustReject(()=>createExpansionHarness(expected,{}));
+            const skipped=createExpansionHarness(expected,{two_valid:async done=>done()});mustReject(()=>skipped.barrier());
+            for(const callback of [async()=>undefined,async()=>Symbol('forged'),async done=>{done();},async done=>{done();return done();},async done=>{assert.fail('inert assertion failure');return done();}]){
+             const failed=createExpansionHarness(expected,{two_valid:callback});await assert.rejects(()=>failed.wrap('two_valid',async()=>{})());mustReject(()=>failed.barrier());
+            }
+            const successful=createExpansionHarness(expected,{two_valid:async done=>{assert.equal(1,1);return done();}}),once=successful.wrap('two_valid',async()=>{});
+            await once();assert.deepEqual(successful.barrier(),[{id:'two_valid',count:1}]);await assert.rejects(()=>once());
           
-          const inventory=IDS.map((id,i)=>({id,status:passed?'passed':i===0?'failed':'not_executed'})),record={marker:'REFERENCE_CONTROLS/1',expected:40,completed:passed?40:1,pass:passed?40:0,fail:passed?0:1,inventory,firstFailure:passed?null:IDS[0]};assert(Buffer.byteLength(JSON.stringify(record)+'\n')<=2048);}for(const firstFailure of ['setup',...IDS]){const inventory=IDS.map(id=>({id,status:'not_executed'})),worst={marker:'REFERENCE_CONTROLS/1',expected:40,completed:0,pass:0,fail:0,inventory,firstFailure};assert(Buffer.byteLength(JSON.stringify(worst)+'\n')<=2048);}assert.equal(IDS.length,40);}
+           return done();}
           };
+          const expansionHarness=createExpansionHarness(EXPECTED_EXPANSION_IDS,expansions);
+          for(const id of EXPECTED_EXPANSION_IDS){assert(IDS.includes(id));checks[id]=expansionHarness.wrap(id,checks[id]);}
+          
           const inventory=IDS.map(id=>({id,status:'not_executed'}));let firstFailure=null;
-          try{assert.equal(process.env.GITHUB_SHA,'0'.repeat(40));assert.equal(process.env.GITHUB_RUN_ID,'1');assert(!Object.hasOwn(process.env,'AFW_SYN_CHECKPOINT_KEY'));assert.deepEqual(Object.keys(checks),IDS);for(const row of inventory){try{await checks[row.id]();row.status='passed';}catch{row.status='failed';firstFailure=row.id;break;}}}catch{firstFailure='setup';}
+          try{assert.equal(process.env.GITHUB_SHA,'0'.repeat(40));assert.equal(process.env.GITHUB_RUN_ID,'1');assert(!Object.hasOwn(process.env,'AFW_SYN_CHECKPOINT_KEY'));assert.deepEqual(Object.keys(checks),IDS);for(const row of inventory){try{await checks[row.id]();row.status='passed';}catch{row.status='failed';firstFailure=row.id;break;}}if(firstFailure===null){const witness={marker:'REFERENCE_EXPANSIONS/1',expected:22,completed:22,inventory:expansionHarness.barrier()},line=JSON.stringify(witness)+'\n';assert(Buffer.byteLength(line)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-reference-expansions-safe.json'),line,{flag:'wx',mode:0o600});}}catch{firstFailure='setup';}
           const pass=inventory.filter(x=>x.status==='passed').length,fail=inventory.filter(x=>x.status==='failed').length,record={marker:'REFERENCE_CONTROLS/1',expected:IDS.length,completed:pass+fail,pass,fail,inventory,firstFailure};
           const line=JSON.stringify(record);assert(Buffer.byteLength(line)+1<=2048);process.stdout.write(line+'\n');if(firstFailure!==null||pass!==IDS.length)process.exitCode=1;
           NODE_REFERENCE_TESTS
@@ -1276,7 +1306,7 @@ jobs:
           
           function inline(tag){const opener="<<'"+tag+"'\n",ending="          "+tag+"\n";need(wf.split(opener).length===2);const a=wf.indexOf(opener)+opener.length,b=wf.indexOf(ending,a);need(b>a);const rows=wf.slice(a,b).split('\n');need(rows.pop()==='');return rows.map(x=>{need(x.startsWith('          '));return x.slice(10);}).join('\n')+'\n';}
           const reference=inline('NODE_REFERENCE'),referenceTests=inline('NODE_REFERENCE_TESTS'),referenceBootstrap=inline('NODE_REFERENCE_BOOTSTRAP');
-          need(hash(reference)==='cc2026e03bb7bf62e81d1c504e922694183e4aac37015f28263bfdb20bfb7653'&&hash(referenceTests)==='6d40c3e2f7ea2aacd3b0a8b4d8480240dd95201fb1151f5195ca646ca5242b2f'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
+          need(hash(reference)==='cc2026e03bb7bf62e81d1c504e922694183e4aac37015f28263bfdb20bfb7653'&&hash(referenceTests)==='4b531da6b1ac707b0042562a39eb95ee752dfa5eac7f242fb93fcc903e0ac9bc'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
           for(const[name,body]of [['afw-readonly-inspector-current.mjs',core],['afw-reference-supplement-current.mjs',reference],['afw-reference-controls-current.mjs',referenceTests],['afw-reference-bootstrap-current.mjs',referenceBootstrap]])await writeFile(join(resolve(process.env.RUNNER_TEMP),name),body,{flag:'wx',mode:0o600});
           const referenceImports="\nimport {validateSupplementPair,validateControlProof} from './afw-reference-supplement-current.mjs';\nconst SOURCE_REFERENCE_SHA="+JSON.stringify(hash(reference))+",SOURCE_REFERENCE_TESTS_SHA="+JSON.stringify(hash(referenceTests))+",SOURCE_REFERENCE_BOOTSTRAP_SHA="+JSON.stringify(hash(referenceBootstrap))+";\n";
           
````
