# Complete logical workflow delta — part 2/3

Logicalbasec7ed76a1..b0dfcf50. These orderedparts concatenate EXACT original61300-characterfullpatch; cutsatnewline maydividehunk, partsnotindividuallyapplicable. Rootappliedcombinedfullpatchallhunks/lines/counts/gaps/tail==FULLcandidate216100chars. GLOBALF59..b0workflowpatchomitted, usefullF7before/fullafter separately; thisdoesnotmisrepresentit.

````diff
+          function projectedSet(raw=receipt('R2')){const r1=S.projectReferenceBoundary(receipt('R1'),'R1'),p=S.projectReferenceBoundary(raw,'R2');return {ownerReference:[r1.row,p.row],lastChild:p.lastChild,referenceStage:{r1FirstRejectedGroup:r1.referenceStage.r1FirstRejectedGroup,r2LastNonPairOperation:p.referenceStage.r2LastNonPairOperation}};}
+          function boundaryValue(raw=receipt('R2')){const p=projectedSet(raw);return S.makeSupplement(basis(),p.ownerReference,null,p.lastChild,p.referenceStage);}
           function value(){return boundaryValue();}
           function pair(v=value()){return S.encodeSupplement(v);}
           function mustReject(fn){assert.throws(fn);}
           function unknown(row,status='invalid'){assert.deepEqual(row,S.unknownReference(row.case,status));}
           async function temporary(fn){const root=await mkdtemp(join(resolve(process.env.RUNNER_TEMP),'afw-supplement-fixture-'));try{return await fn(root);}finally{await rm(root,{recursive:true,force:true});}}
-          async function simulate({fail=null,settled=true,projectTime=1,cleanupTime=1,cleanupOk=true,lateValidation=false,mutate=null,cleanupUnsettled=false,referenceOperation=null,referenceSet=null}={}){
+          async function simulate({fail=null,settled=true,projectTime=1,cleanupTime=1,cleanupOk=true,lateValidation=false,mutate=null,cleanupUnsettled=false,referenceOperation=null,referenceSet=null,references=null}={}){
            let clock=0;const calls=[],r=basis(true);if(mutate)mutate(r);
            const result=await S.coordinateSupplement({
             now:()=>clock,base:()=>baseResult(),
             run:async(mode,deadline)=>{calls.push({mode,deadline});if(mode==='project-child')clock+=projectTime;if(mode==='reference-child'){clock+=1;if(referenceOperation)try{await referenceOperation();}catch{return {settled:true,ok:false};}}if(mode==='cleanup-child')clock+=cleanupTime;return {settled:mode==='cleanup-child'&&cleanupUnsettled?false:mode===fail?settled:true,ok:mode!==fail};},
             intermediate:async()=>{if(lateValidation)clock=10001;return r;},
-            references:async()=>referenceSet??projectedSet(),
+            references:async()=>references?references():referenceSet??projectedSet(),
             cleaned:async()=>cleanupOk
            });return {result,calls,clock};
           }
@@ -863,12 +890,12 @@ jobs:
             v=>v.lastChild.position='sdk-send-private',v=>v.lastChild.endPosition='PRIVATE_CANARY',v=>v.lastChild.lastStep='sdk_complete',v=>v.lastChild.stepCount=0,
             v=>v.lastChild.status='unavailable',v=>v.lastChild.case='R1',v=>v.lastChild.extra='PRIVATE_CANARY',v=>delete v.lastChild,
             v=>{v.lastChild.stepCount=1;v.lastChild.lastStep='authorization';v.lastChild.lastStepElapsedMs=2;}
-           ];for(const mutate of contradictions){const v=value();mutate(v);mustReject(()=>S.validateSupplementResult(v));assert.equal(S.producerTransportAccepted(pair(v)),false);mustReject(()=>S.validateSupplementPair(pair(v)));const input={ownerReference:v.ownerReference,lastChild:v.lastChild},out=await simulate({referenceSet:input});assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));assert.deepEqual(out.result.lastChild,S.unknownLastChild());}
+           ];for(const mutate of contradictions){const v=value();mutate(v);mustReject(()=>S.validateSupplementResult(v));assert.equal(S.producerTransportAccepted(pair(v)),false);mustReject(()=>S.validateSupplementPair(pair(v)));const input={ownerReference:v.ownerReference,lastChild:v.lastChild,referenceStage:v.referenceStage},out=await simulate({referenceSet:input});assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));assert.deepEqual(out.result.lastChild,S.unknownLastChild());}
            const multi=receipt('R2');multi.children=[{actualElapsedMs:20,aborted:true},{actualElapsedMs:12,aborted:false}];const v=boundaryValue(multi);v.lastChild.elapsedMs=21;mustReject(()=>S.validateSupplementPair(pair(v)));v.lastChild.elapsedMs=null;mustReject(()=>S.validateSupplementPair(pair(v)));
            for(const r of [value(),boundaryValue(Object.assign(receipt('R2'),{children:[]})),boundaryValue(Object.assign(receipt('R2'),{children:null}))]){const q=structuredClone(r);q.lastChild={...S.unknownLastChild('not_examined'),elapsedMs:0};mustReject(()=>S.validateSupplementResult(q));}},
            lc_clean:async()=>{for(const options of [{cleanupOk:false},{fail:'cleanup-child'},{fail:'reference-child',settled:false,projectTime:1},{fail:'project-child',settled:false,projectTime:15000},{cleanupUnsettled:true}]){const {result}=await simulate(options);assert.equal(result.status,'rejected');assert.deepEqual(result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));assert.deepEqual(result.lastChild,S.unknownLastChild());S.validateSupplementResult(result);assert.equal(S.producerTransportAccepted(pair(result)),false);}const v=value();v.status='rejected';v.failure={stage:'projection',reason:'project_failed'};v.ownerReference=['R1','R2'].map(c=>S.unknownReference(c));mustReject(()=>S.validateSupplementResult(v));assert.deepEqual(S.publicationResult(v).lastChild,S.unknownLastChild());const rejected=S.makeSupplement(baseResult(),value().ownerReference,{stage:'projection',reason:'basis_rejected'},value().lastChild);assert.deepEqual(rejected.lastChild,S.unknownLastChild());},
            lc_clock:async()=>{for(const options of [{projectTime:10001},{lateValidation:true},{cleanupTime:15000}]){const {result,calls}=await simulate(options);assert.equal(result.status,'rejected');assert.deepEqual(result.lastChild,S.unknownLastChild());assert.equal(calls[0].deadline,10000);assert(calls.every(c=>c.deadline===(c.mode==='cleanup-child'?15000:10000)));}const {result}=await simulate({projectTime:9998,cleanupTime:1});assert.equal(result.status,'complete');assert.equal(result.inspection.timings.parseCleanupMs,10000);},
-           lc_manifest:()=>{const v=value();assert.equal(v.purpose,'afw.readonly-reference-boundaries.safe.v1');const p=pair(v),m=JSON.parse(p.get('manifest.json'));assert.equal(m.purpose,'afw.readonly-reference-boundaries-manifest.safe.v1');assert.equal(m.files[0].sha256,hash(p.get('result.json')));assert.equal(m.files[0].bytes,p.get('result.json').length);for(const change of [m=>m.purpose='afw.readonly-owner-reference-supplement-manifest.safe.v1',m=>m.inspectorSource='1'.repeat(40),m=>m.inspectorRun='2',m=>m.attempt=2,m=>m.files[0].bytes++,m=>m.files[0].sha256='0'.repeat(64)]){const q=pair(v),n=JSON.parse(q.get('manifest.json'));change(n);q.set('manifest.json',Buffer.from(JSON.stringify(n)));mustReject(()=>S.validateSupplementPair(q));}const q=pair(v),modified=JSON.parse(q.get('result.json'));modified.lastChild.position='baseline';q.set('result.json',Buffer.from(JSON.stringify(modified)));mustReject(()=>S.validateSupplementPair(q));},
+           lc_manifest:()=>{const v=value();assert.equal(v.purpose,'afw.readonly-reference-stage.safe.v1');const p=pair(v),m=JSON.parse(p.get('manifest.json'));assert.equal(m.purpose,'afw.readonly-reference-stage-manifest.safe.v1');assert.equal(m.files[0].sha256,hash(p.get('result.json')));assert.equal(m.files[0].bytes,p.get('result.json').length);for(const change of [m=>m.purpose='afw.readonly-owner-reference-supplement-manifest.safe.v1',m=>m.inspectorSource='1'.repeat(40),m=>m.inspectorRun='2',m=>m.attempt=2,m=>m.files[0].bytes++,m=>m.files[0].sha256='0'.repeat(64)]){const q=pair(v),n=JSON.parse(q.get('manifest.json'));change(n);q.set('manifest.json',Buffer.from(JSON.stringify(n)));mustReject(()=>S.validateSupplementPair(q));}const q=pair(v),modified=JSON.parse(q.get('result.json'));modified.lastChild.position='baseline';q.set('result.json',Buffer.from(JSON.stringify(modified)));mustReject(()=>S.validateSupplementPair(q));},
            lc_transport:async()=>{for(const raw of [receipt('R2'),Object.assign(receipt('R2'),{children:[]}),Object.assign(receipt('R2'),{children:null}),Object.assign(receipt('R2'),{label:'wrong'})]){const v=boundaryValue(raw);assert.equal(S.producerTransportAccepted(pair(v)),true);assert.deepEqual(S.validateSupplementPair(pair(v)),v);const out=await simulate({referenceSet:projectedSet(raw)});assert.equal(out.result.status,v.status);assert.deepEqual(out.result.lastChild,v.lastChild);}
            const corrupt=[
             v=>{v.ownerReference[1].children.knownDurationCount=0;v.ownerReference[1].children.maxElapsedMs=null;},
@@ -877,9 +904,126 @@ jobs:
             v=>{v.ownerReference[1]=S.unknownReference('R2','missing');v.status='partial';},
             v=>{v.lastChild.status='not_examined';},
             v=>{v.purpose='afw.readonly-owner-reference-supplement.safe.v1';}
-           ];for(const change of corrupt){const v=value();change(v);assert.equal(S.producerTransportAccepted(pair(v)),false);mustReject(()=>S.validateSupplementPair(pair(v)));const out=await simulate({referenceSet:{ownerReference:v.ownerReference,lastChild:v.lastChild}});if(v.purpose===S.PURPOSE){assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));assert.deepEqual(out.result.lastChild,S.unknownLastChild());}}
+           ];for(const change of corrupt){const v=value();change(v);assert.equal(S.producerTransportAccepted(pair(v)),false);mustReject(()=>S.validateSupplementPair(pair(v)));const out=await simulate({referenceSet:{ownerReference:v.ownerReference,lastChild:v.lastChild,referenceStage:v.referenceStage}});if(v.purpose===S.PURPOSE){assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));assert.deepEqual(out.result.lastChild,S.unknownLastChild());}}
            const rejected=S.makeSupplement(baseResult(),value().ownerReference,{stage:'cleanup',reason:'cleanup_failed'},value().lastChild);S.validateSupplementPair(pair(rejected),{allowRejected:true});assert.equal(S.producerTransportAccepted(pair(rejected)),false);},
-           lc_bounds:()=>{const r=receipt('R2');r.children=Array.from({length:256},()=>({actualElapsedMs:0,aborted:false}));r.children[255].steps=Array(1000000).fill(null);const v=boundaryValue(r);assert.equal(v.lastChild.childCount,256);assert.equal(v.lastChild.ordinal,256);assert.equal(v.lastChild.stepCount,1000000);S.validateSupplementPair(pair(v));r.children[255].steps.push({operation:'source-pair',elapsedMs:3});assert.equal(boundaryValue(r).lastChild.stepCount,null);const q=pair();q.set('result.json',Buffer.alloc(65536));mustReject(()=>S.validateSupplementPair(q));for(const passed of [true,false]){const inventory=IDS.map((id,i)=>({id,status:passed?'passed':i===0?'failed':'not_executed'})),record={marker:'REFERENCE_CONTROLS/1',expected:40,completed:passed?40:1,pass:passed?40:0,fail:passed?0:1,inventory,firstFailure:passed?null:IDS[0]};assert(Buffer.byteLength(JSON.stringify(record)+'\n')<=2048);}for(const firstFailure of ['setup',...IDS]){const inventory=IDS.map(id=>({id,status:'not_executed'})),worst={marker:'REFERENCE_CONTROLS/1',expected:40,completed:0,pass:0,fail:0,inventory,firstFailure};assert(Buffer.byteLength(JSON.stringify(worst)+'\n')<=2048);}assert.equal(IDS.length,40);}
+           lc_bounds:()=>{const r=receipt('R2');r.children=Array.from({length:256},()=>({actualElapsedMs:0,aborted:false}));r.children[255].steps=Array(1000000).fill(null);const v=boundaryValue(r);assert.equal(v.lastChild.childCount,256);assert.equal(v.lastChild.ordinal,256);assert.equal(v.lastChild.stepCount,1000000);S.validateSupplementPair(pair(v));r.children[255].steps.push({operation:'source-pair',elapsedMs:3});assert.equal(boundaryValue(r).lastChild.stepCount,null);const q=pair();q.set('result.json',Buffer.alloc(65536));mustReject(()=>S.validateSupplementPair(q));for(const passed of [true,false]){
+          // Expand the same forty named controls: these call current production projection/coordinator/transport, never a mirror.
+          function group(raw,expected){const p=S.projectReferenceBoundary(raw,'R1');assert.equal(p.referenceStage.r1FirstRejectedGroup,expected);assert.equal(p.referenceStage.r2LastNonPairOperation,'unknown');return p;}
+          function fullExpectedRow(caseName){return {case:caseName,status:'present',basic:{completeWrites:1,completeNormal:0,lists:2,gets:0,peak:2,referenceRows:0,responseStatus:200},lookup:{status:'present',budgetMs:5000,actualElapsedMs:0.25,aborted:false},children:{status:'present',count:1,knownDurationCount:1,maxElapsedMs:0.5,knownAbortCount:1,abortedCount:0},roots:{status:'present',count:1,knownWindowCount:1,minWindowMs:1.25,maxWindowMs:1.25},http:{status:'present',count:1,knownElapsedCount:1,maxElapsedMs:0.75,recordedGuardCount:1,maxBodyGuardMs:0}};}
+          function expectedPairChild(stepCount=2){return {case:'R2',status:'present',childCount:1,ordinal:1,position:'settled',endPosition:'issuer-ack',elapsedMs:0.5,aborted:false,stepCount,lastStep:'source-pair',lastStepElapsedMs:0.75};}
+          function entryValue(steps){const r=receipt('R2');Object.assign(r.children[0],{position:'settled',endPosition:'issuer-ack',steps});return boundaryValue(r);}
+          async function rejectedEverywhere(v){
+           // Real whole-envelope rehash, otherwise-coherent rows/certificate, and actual shared coordinator.
+           const p=pair(v);assert.equal(S.producerTransportAccepted(p),false);mustReject(()=>S.validateSupplementPair(p));
+           const {result}=await simulate({referenceSet:{ownerReference:v.ownerReference,lastChild:v.lastChild,referenceStage:v.referenceStage}});
+           assert.equal(result.status,'rejected');assert.deepEqual(result.ownerReference,['R1','R2'].map(c=>S.unknownReference(c)));
+           assert.deepEqual(result.lastChild,S.unknownLastChild());assert.deepEqual(result.referenceStage,S.unknownReferenceStage());
+           S.validateSupplementResult(result);assert.equal(S.producerTransportAccepted(pair(result)),false);
+          }
+          const expansions={
+           two_valid:async()=>temporary(async root=>{
+            const dir=join(root,'output','owner-reference');await mkdir(dir,{recursive:true});
+            for(const operation of ['consume','grant']){
+             const r1=receipt('R1'),r2=receipt('R2');Object.assign(r2.children[0],{position:'settled',endPosition:'issuer-ack',steps:[{operation},{operation:'source-pair',elapsedMs:0.75}]});
+             await writeFile(join(dir,'budget-R1.json'),JSON.stringify(r1));await writeFile(join(dir,'budget-R2.json'),JSON.stringify(r2));
+             const expectedRows=[fullExpectedRow('R1'),fullExpectedRow('R2')],expectedChild=expectedPairChild(),expectedStage={r1FirstRejectedGroup:'none',r2LastNonPairOperation:operation};
+             let readerCalls=0;
+             const out=await simulate({references:async()=>{readerCalls++;const projected=await S.readActualReferences(root);assert.deepEqual(projected,{ownerReference:expectedRows,lastChild:expectedChild,referenceStage:expectedStage});return projected;}});
+             assert.equal(readerCalls,1);assert.equal(out.result.status,'complete');assert.deepEqual(out.result.ownerReference,expectedRows);
+             assert.deepEqual(out.result.lastChild,expectedChild);assert.deepEqual(out.result.referenceStage,expectedStage);
+             assert.deepEqual(S.validateSupplementPair(pair(out.result)),out.result);assert.equal(S.producerTransportAccepted(pair(out.result)),true);
+            }
+           }),
+           identities_flags:()=>{
+            assert.deepEqual(S.R1_GROUPS,['none','file_policy','utf8_json','identity','syn_flags','basic','lookup','children','roots','http','unknown']);
+            group(receipt(),'none');
+            for(const raw of [null,[],{},false,1,'PRIVATE_CANARY'])group(raw,'identity');
+            for(const k of ['label','testRevision','completePackage','operationalReadiness','PCoff','custodyReal']){const r=receipt();r[k]=k==='label'?'budget-R2':k==='testRevision'?'1'.repeat(40):true;group(r,['label','testRevision'].includes(k)?'identity':'syn_flags');}
+            const defects=[['identity',r=>r.label='bad'],['syn_flags',r=>r.PCoff=true],['basic',r=>r.lists=-1],['lookup',r=>r.lookupChild=false],['children',r=>r.children=false],['roots',r=>r.roots=false],['http',r=>r.httpSpans=false]];
+            for(let first=0;first<defects.length;first++){const r=receipt();for(let n=first;n<defects.length;n++)defects[n][1](r);group(r,defects[first][0]);}
+            const r=receipt();r.label='bad';Object.defineProperty(r,'testRevision',{get(){throw Error('must short circuit');}});Object.defineProperty(r,'PCoff',{get(){throw Error('must not reach later guard');}});group(r,'identity');
+            for(const key of ['label','PCoff','lists','lookupChild','children','roots','httpSpans']){
+             const raw=receipt(),primary=new TypeError('supplement_rejected');primary.name='ReferencePolicyRejected';primary.reason='invalid';primary.code='ELOOP';
+             const before=Object.getOwnPropertyDescriptors(primary);let reads=0;Object.defineProperty(raw,key,{get(){reads++;throw primary;}});
+             const p=group(raw,'unknown');unknown(p.row);assert.equal(reads,1);assert.deepEqual(Object.getOwnPropertyDescriptors(primary),before);
+            }
+            for(const key of ['children','roots','httpSpans']){const r=receipt();const primary=new TypeError('file_policy');r[key]=[{get actualElapsedMs(){throw primary;},get windowMs(){throw primary;},get elapsedMs(){throw primary;}}];group(r,'unknown');}
+            const bad=receipt();bad.children=false;assert.equal(group(bad,'children').referenceStage.r1FirstRejectedGroup,'children');
+            const r2=S.projectReferenceBoundary({...receipt('R2'),PCoff:true},'R2');assert.deepEqual(r2.referenceStage,S.unknownReferenceStage());group(receipt(),'none');
+           },
+           required_bounds:()=>{for(const key of ['completeWrites','completeNormal','lists','gets','peak','referenceRows','responseStatus']){const r=receipt();r[key]=-1;group(r,'basic');}},
+           optional_types:()=>{
+            for(const [key,raw,expected]of [['lookupChild',false,'lookup'],['lookupChild',{budgetMs:'1'},'lookup'],['lookupChild',{actualElapsedMs:-1},'lookup'],['lookupChild',{aborted:0},'lookup'],['children',[null],'children'],['children',[{aborted:0}],'children'],['children',[{actualElapsedMs:-1}],'children'],['roots',[{windowMs:-1}],'roots'],['httpSpans',[{elapsedMs:-1}],'http'],['httpSpans',[{bodyGuardMs:'0'}],'http']]){const r=receipt();r[key]=raw;group(r,expected);}
+           },
+           array_bounds:()=>{for(const [key,expected]of [['children','children'],['roots','roots'],['httpSpans','http']])for(const bad of [{},Array(257).fill({})]){const r=receipt();r[key]=bad;group(r,expected);}},
+           private_canary:()=>{const r=receipt();r.trace=r.reason=r.subject=r.url='PRIVATE_CANARY';const p=group(r,'none');assert(!JSON.stringify(p).includes('PRIVATE_CANARY'));},
+           file_missing_bad:async()=>temporary(async root=>{
+            let set=await S.readActualReferences(root);assert.deepEqual(set.referenceStage,S.unknownReferenceStage());assert.deepEqual(set.ownerReference,['R1','R2'].map(c=>S.unknownReference(c,'missing')));
+            const dir=join(root,'output','owner-reference');await mkdir(dir,{recursive:true});const file=join(dir,'budget-R1.json');
+            await writeFile(join(dir,'budget-R2.json'),JSON.stringify(receipt('R2')));
+            for(const bytes of [Buffer.from([0xff]),Buffer.from('{')]){await writeFile(file,bytes);set=await S.readActualReferences(root);assert.equal(set.ownerReference[0].status,'invalid');assert.equal(set.referenceStage.r1FirstRejectedGroup,'utf8_json');assert.equal(set.referenceStage.r2LastNonPairOperation,'unknown');}
+            await writeFile(file,JSON.stringify(receipt()));assert.equal((await S.readActualReferences(root)).referenceStage.r1FirstRejectedGroup,'none');
+            for(const stage of ['directory_stat','open','file_stat','file_read','directory_recheck'])for(const code of ['EIO','EACCES']){
+             await assert.rejects(()=>S.readActualReferences(root,{stage,code}),e=>e.code===code&&e.message==='reader_unavailable'&&Object.keys(e).join(',')==='code');
+             const out=await simulate({references:()=>S.readActualReferences(root,{stage,code})});assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());
+            }
+            // Read R2 alone after malformed R1 cannot inherit its classification; a later clean read resets locally.
+            await writeFile(file,'{');unknown(await S.readReference(root,'R1'));assert.equal((await S.readReference(root,'R2')).status,'present');await writeFile(file,JSON.stringify(receipt()));assert.equal((await S.readActualReferences(root)).referenceStage.r1FirstRejectedGroup,'none');
+           }),
+           file_bound_links:async()=>temporary(async root=>{
+            const dir=join(root,'output','owner-reference');await mkdir(dir,{recursive:true});const file=join(dir,'budget-R1.json'),r2=join(dir,'budget-R2.json'),target=join(root,'target');
+            await writeFile(r2,JSON.stringify(receipt('R2')));await writeFile(target,JSON.stringify(receipt()));
+            await symlink(target,file);let set=await S.readActualReferences(root);assert.equal(set.referenceStage.r1FirstRejectedGroup,'file_policy');assert.equal(set.ownerReference[0].status,'invalid');await rm(file);
+            await link(target,file);set=await S.readActualReferences(root);assert.equal(set.referenceStage.r1FirstRejectedGroup,'file_policy');await rm(file);
+            await mkdir(file);set=await S.readActualReferences(root);assert.equal(set.referenceStage.r1FirstRejectedGroup,'file_policy');await rm(file,{recursive:true});
+            // ENOTDIR retains the pre-existing invalid mapping and is scoped to the selected read.
+            await rm(join(root,'output'),{recursive:true});await writeFile(join(root,'output'),'not a directory');set=await S.readActualReferences(root);assert.equal(set.ownerReference[0].status,'invalid');assert.equal(set.referenceStage.r1FirstRejectedGroup,'file_policy');
+           }),
+           gate_no_read:async()=>{const out=await simulate({mutate:r=>r.authentication.authenticated=false,references:()=>{throw Error('unreachable');}});assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());},
+           timeout_cleanup:async()=>{for(const options of [{projectTime:10001},{lateValidation:true},{cleanupTime:15000}]){const out=await simulate(options);assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());}},
+           uncertain_no_cleanup:async()=>{const out=await simulate({fail:'reference-child',settled:false});assert.equal(out.result.inspection.phases.cleanup,'unknown');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());},
+           strict_envelope:async()=>{
+            const mutations=[v=>delete v.referenceStage,v=>v.referenceStage=null,v=>v.referenceStage=[],v=>v.referenceStage='unknown',v=>v.referenceStage.extra=true,v=>delete v.referenceStage.r1FirstRejectedGroup,v=>delete v.referenceStage.r2LastNonPairOperation];
+            for(const key of ['r1FirstRejectedGroup','r2LastNonPairOperation'])for(const bad of [null,false,0,{},[],'PRIVATE_CANARY','consume-private','NONE'])mutations.push(v=>v.referenceStage[key]=bad);
+            for(const change of mutations){const v=value();change(v);await rejectedEverywhere(v);}
+            for(const status of ['present','invalid','missing','not_examined','oversize'])for(const g of S.R1_GROUPS){
+             const v=value();v.ownerReference[0]=status==='present'?fullExpectedRow('R1'):S.unknownReference('R1',status);v.referenceStage.r1FirstRejectedGroup=g;v.status=status==='present'?'complete':'partial';
+             const coherent=status==='present'?['none','unknown'].includes(g):status==='invalid'?g!=='none':g==='unknown';
+             if(coherent&&!['not_examined','oversize'].includes(status)){assert.equal(S.producerTransportAccepted(pair(v)),true);S.validateSupplementPair(pair(v));}else{assert.equal(S.producerTransportAccepted(pair(v)),false);mustReject(()=>S.validateSupplementPair(pair(v)));}
+            }
+           },
+           lc_pair:()=>{for(const operation of ['consume','grant']){const v=entryValue([{operation},{operation:'source-pair',elapsedMs:0.75}]);assert.equal(v.referenceStage.r2LastNonPairOperation,operation);assert.deepEqual(v.ownerReference,[fullExpectedRow('R1'),fullExpectedRow('R2')]);assert.deepEqual(v.lastChild,expectedPairChild());S.validateSupplementPair(pair(v));}},
+           lc_last:()=>{const raw=receipt('R2');raw.children=[{actualElapsedMs:900,aborted:true,steps:[{operation:'consume'}]},{actualElapsedMs:0.5,aborted:false,steps:[{operation:'grant'},{operation:'source-pair'}]}];const v=boundaryValue(raw);assert.equal(v.referenceStage.r2LastNonPairOperation,'grant');assert.equal(v.lastChild.ordinal,2);assert.equal(v.ownerReference[1].children.maxElapsedMs,900);},
+           lc_unknown:()=>{for(const item of [null,{},false,'PRIVATE_CANARY',{operation:'PRIVATE_CANARY'},{operation:'source-pair-private'},{operation:'Consume'},{operation:'authorization'},{operation:'GrantLink'},{operation:'open_fence'}]){const v=entryValue([{operation:'consume'},item,{operation:'source-pair'}]);assert.equal(v.referenceStage.r2LastNonPairOperation,'unknown');assert(!JSON.stringify(v).includes('PRIVATE_CANARY'));S.validateSupplementPair(pair(v));}},
+           lc_ops:()=>{assert.deepEqual(S.R2_ENTRIES,['consume','grant','unknown']);for(const operation of S.OPERATIONS){const v=entryValue([{operation:'grant'},{operation}]);assert.equal(v.referenceStage.r2LastNonPairOperation,operation==='source-pair'?'grant':['consume','grant'].includes(operation)?operation:'unknown');S.validateSupplementPair(pair(v));}},
+           lc_steps:()=>{for(const steps of [undefined,null,{},'PRIVATE_CANARY',3,[],[{operation:'source-pair'}],[{operation:'source-pair'},{operation:'source-pair'}]]){const v=entryValue(steps);assert.equal(v.referenceStage.r2LastNonPairOperation,'unknown');S.validateSupplementPair(pair(v));}},
+           lc_schema:async()=>{
+            const singleton=entryValue([{operation:'source-pair',elapsedMs:0.75}]);assert.deepEqual(singleton.lastChild,expectedPairChild(1));assert.equal(singleton.referenceStage.r2LastNonPairOperation,'unknown');
+            assert.equal(S.producerTransportAccepted(pair(singleton)),true);S.validateSupplementPair(pair(singleton));const positive=await simulate({referenceSet:{ownerReference:singleton.ownerReference,lastChild:singleton.lastChild,referenceStage:singleton.referenceStage}});assert.equal(positive.result.status,'complete');
+            for(const operation of ['consume','grant']){const v=structuredClone(singleton);v.referenceStage.r2LastNonPairOperation=operation;await rejectedEverywhere(v);}
+            for(const operation of ['consume','grant']){
+             const good=entryValue([{operation},{operation:'source-pair',elapsedMs:0.75}]);assert.equal(S.producerTransportAccepted(pair(good)),true);assert.equal(S.validateSupplementPair(pair(good)).referenceStage.r2LastNonPairOperation,operation);
+             for(const entry of ['consume','grant','unknown']){const two=structuredClone(good);two.referenceStage.r2LastNonPairOperation=entry;S.validateSupplementPair(pair(two));}
+             const v=entryValue([{operation}]);for(const wrong of ['unknown',operation==='consume'?'grant':'consume']){const bad=structuredClone(v);bad.referenceStage.r2LastNonPairOperation=wrong;await rejectedEverywhere(bad);}
+            }
````
