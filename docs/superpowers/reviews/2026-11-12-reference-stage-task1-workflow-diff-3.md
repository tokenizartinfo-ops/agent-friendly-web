# Complete logical workflow delta — part 3/3

Logicalbasec7ed76a1..b0dfcf50. These orderedparts concatenate EXACT original61300-characterfullpatch; cutsatnewline maydividehunk, partsnotindividuallyapplicable. Rootappliedcombinedfullpatchallhunks/lines/counts/gaps/tail==FULLcandidate216100chars. GLOBALF59..b0workflowpatchomitted, usefullF7before/fullafter separately; thisdoesnotmisrepresentit.

````diff
+            for(const lastStep of ['authorization','unknown','none']){const v=entryValue(lastStep==='none'?[]:[{operation:lastStep}]);for(const operation of ['consume','grant']){v.referenceStage.r2LastNonPairOperation=operation;await rejectedEverywhere(v);}}
+           },
+           lc_clean:async()=>{for(const options of [{cleanupOk:false},{fail:'cleanup-child'},{fail:'reference-child',settled:false},{cleanupUnsettled:true}]){const {result}=await simulate(options);assert.equal(result.status,'rejected');assert.deepEqual(result.referenceStage,S.unknownReferenceStage());}const v=value();v.status='rejected';v.failure={stage:'projection',reason:'project_failed'};v.ownerReference=['R1','R2'].map(c=>S.unknownReference(c));v.lastChild=S.unknownLastChild();mustReject(()=>S.validateSupplementResult(v));assert.deepEqual(S.publicationResult(v).referenceStage,S.unknownReferenceStage());},
+           lc_clock:async()=>{const v=entryValue([{operation:'grant'},{operation:'source-pair'}]);const set={ownerReference:v.ownerReference,lastChild:v.lastChild,referenceStage:v.referenceStage};const out=await simulate({referenceSet:set,cleanupTime:15000});assert.equal(out.result.status,'rejected');assert.deepEqual(out.result.referenceStage,S.unknownReferenceStage());},
+           lc_manifest:()=>{
+            const v=value(),p=pair(v),m=JSON.parse(p.get('manifest.json'));assert.equal(m.files[0].sha256,hash(p.get('result.json')));
+            const changed=structuredClone(v);changed.referenceStage.r1FirstRejectedGroup='unknown';p.set('result.json',Buffer.from(JSON.stringify(changed)));mustReject(()=>S.validateSupplementPair(p));
+            assert.equal(S.validateSupplementPair(pair(changed)).referenceStage.r1FirstRejectedGroup,'unknown');
+            for(const f of [v=>v.purpose='afw.readonly-reference-boundaries.safe.v1',v=>v.inspection.inspector.source=ORIGINAL.sourceSha,v=>v.inspection.inspector.run=ORIGINAL.runId]){const q=value();f(q);mustReject(()=>S.validateSupplementPair(pair(q)));assert.equal(S.producerTransportAccepted(pair(q)),false);}
+           },
+           lc_bounds:()=>{
+            const raw=receipt('R2'),steps=Array(1000001).fill(null);Object.defineProperty(steps,0,{get(){throw Error('must not peek over bound');}});raw.children[0].steps=steps;const v=boundaryValue(raw);assert.equal(v.lastChild.stepCount,null);assert.equal(v.referenceStage.r2LastNonPairOperation,'unknown');
+            raw.children[0].steps=Array(1000000).fill({operation:'source-pair'});assert.equal(boundaryValue(raw).referenceStage.r2LastNonPairOperation,'unknown');
+           }
+          };
+          for(const [id,extra]of Object.entries(expansions)){assert(IDS.includes(id));const original=checks[id];checks[id]=async()=>{await original();await extra();};}
+          
+          const inventory=IDS.map((id,i)=>({id,status:passed?'passed':i===0?'failed':'not_executed'})),record={marker:'REFERENCE_CONTROLS/1',expected:40,completed:passed?40:1,pass:passed?40:0,fail:passed?0:1,inventory,firstFailure:passed?null:IDS[0]};assert(Buffer.byteLength(JSON.stringify(record)+'\n')<=2048);}for(const firstFailure of ['setup',...IDS]){const inventory=IDS.map(id=>({id,status:'not_executed'})),worst={marker:'REFERENCE_CONTROLS/1',expected:40,completed:0,pass:0,fail:0,inventory,firstFailure};assert(Buffer.byteLength(JSON.stringify(worst)+'\n')<=2048);}assert.equal(IDS.length,40);}
           };
           const inventory=IDS.map(id=>({id,status:'not_executed'}));let firstFailure=null;
           try{assert.equal(process.env.GITHUB_SHA,'0'.repeat(40));assert.equal(process.env.GITHUB_RUN_ID,'1');assert(!Object.hasOwn(process.env,'AFW_SYN_CHECKPOINT_KEY'));assert.deepEqual(Object.keys(checks),IDS);for(const row of inventory){try{await checks[row.id]();row.status='passed';}catch{row.status='failed';firstFailure=row.id;break;}}}catch{firstFailure='setup';}
@@ -1132,7 +1276,7 @@ jobs:
           
           function inline(tag){const opener="<<'"+tag+"'\n",ending="          "+tag+"\n";need(wf.split(opener).length===2);const a=wf.indexOf(opener)+opener.length,b=wf.indexOf(ending,a);need(b>a);const rows=wf.slice(a,b).split('\n');need(rows.pop()==='');return rows.map(x=>{need(x.startsWith('          '));return x.slice(10);}).join('\n')+'\n';}
           const reference=inline('NODE_REFERENCE'),referenceTests=inline('NODE_REFERENCE_TESTS'),referenceBootstrap=inline('NODE_REFERENCE_BOOTSTRAP');
-          need(hash(reference)==='4e9da59da45359ef320bb25600e539189612ea128cc0a53be3afd96171432843'&&hash(referenceTests)==='3fae5a02e5495bfdf34c9fee754021dee1f3449b28b230a9135b8504513d2001'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
+          need(hash(reference)==='cc2026e03bb7bf62e81d1c504e922694183e4aac37015f28263bfdb20bfb7653'&&hash(referenceTests)==='6d40c3e2f7ea2aacd3b0a8b4d8480240dd95201fb1151f5195ca646ca5242b2f'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
           for(const[name,body]of [['afw-readonly-inspector-current.mjs',core],['afw-reference-supplement-current.mjs',reference],['afw-reference-controls-current.mjs',referenceTests],['afw-reference-bootstrap-current.mjs',referenceBootstrap]])await writeFile(join(resolve(process.env.RUNNER_TEMP),name),body,{flag:'wx',mode:0o600});
           const referenceImports="\nimport {validateSupplementPair,validateControlProof} from './afw-reference-supplement-current.mjs';\nconst SOURCE_REFERENCE_SHA="+JSON.stringify(hash(reference))+",SOURCE_REFERENCE_TESTS_SHA="+JSON.stringify(hash(referenceTests))+",SOURCE_REFERENCE_BOOTSTRAP_SHA="+JSON.stringify(hash(referenceBootstrap))+";\n";
           
````
