# R1 HTTP frontier — ONE final fix-wave scoped re-review package

Original final reviewer /root/r1_http_final_review resumes. Verify ONLY Important receiver-exposure finding, Minor signature wording, and new breakage in this fixdiff. No fresh fullreview; no secondwave. Requirements formalfixbrief at e6f1fcd62c6c34ef512a4dd61d1401313d0f0fe5/docs/superpowers/briefs/2026-11-13-r1-http-frontier-final-fix-wave.md. Completepreviousfindinglist docs/superpowers/reviews/2026-11-13-r1-http-frontier-final-review.md. No Sourceexecution/tests/mutations/localfiles/clones/privateOriginalcipher/plain/key/MODEL/privateactualproducerlogs/CF/Native/newagents/humansteps.

## Findings under verification

Important: active.callback() exposed privateactive(recordtoken+issued)asthis; issueridentityonlyinsidepostAssertion; ordinarycallbackcouldbypassprivateissuer. Existingbarecallbackarrowmissedreceiver. Fixno-receiverinvoke+ordinaryfunctionthroughrealharness; ensureallactual22+18mainonce and oldP4negativebranches preserved.
Minor: PLANsignedcurrentidentity overstatedindependentinspectorsignature; Rootcorrected Task2 text to currentidentityboundbywholemanifest/SHA256/authenticatedGitHubmetadata(noindependentinspectorsignature) at e6f1 before Sourcewave. VerifycurrentPLAN wording; historicalquotedfindingsarenotcurrentcontract.

## Code / current identities

OldINACTIVE8afd3ce450f168d3542d95b0f0fc6b90567fd432/F7d98fdf98→newINACTIVE039e42a2b53886addf8b99777f6133b3444f6ed3/F7blob78f1c5aa2f0210c58d650d5712b0a4570e20c620/248848B. OldKEYLESSd807928c→newKEYLESS96b8e05b84ce05d9835c90484afbb1fb336306ef/F7blobc1d80eb362fc9abd9afefaa4bf78673d03de3362/268841B. Sourcefixer fresh /root/r1_http_final_fix STOPPED.
Root independently rebuiltall7hashesasTEXT, noexecution; all8literalactualcandidatebodies matchqualifiedKEYLESS:

```json
{
  "NODE_CORE": {
    "bytes": 77002,
    "sha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246"
  },
  "NODE_REFERENCE": {
    "bytes": 34180,
    "sha256": "672b054312d8c23c38662719b5183e6e345a322e6db74c6f761719b9bfdf4e36"
  },
  "NODE_REFERENCE_TESTS": {
    "bytes": 75620,
    "sha256": "414d277617f675d5031f66273c2a84b7a4ec95fc9a66150d5527b13eb1293ae8"
  },
  "NODE_REFERENCE_BOOTSTRAP": {
    "bytes": 1370,
    "sha256": "2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1"
  },
  "NODE_SAFE_ZIP": {
    "bytes": 13305,
    "sha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
  },
  "NODE_MATERIALIZE": {
    "bytes": 21125,
    "sha256": "be54746438366563d4361e508f0f7e4f6e7519a1890fd4dc8b0c783dce3a93e0"
  },
  "GENERATED_VERIFIER": {
    "bytes": 41119,
    "sha256": "9ee395af73eda7b29a9b392905fd46584e7bc22780b907b4d9af69884e958134"
  }
}
```

OnlySelftests+necessaryMat/hashpins; Reference672b/CoreZIPBootstrapunchanged. Real22+18assertions/mainonce/P4old11rows remain. `callback=active.callback;await callback()` no exposed receiver. Existingbarecallbacknowordinary andassertsactualthisundefined beforeissuer; exactidentity/attempt1issued0/completed0/incompletebarrier. Focusedlegacydispatch test usesSAMEordinarycallback throughfixedprivateobject.receiver, actual intendedp4_private_receiverAssertionErrorbeforeissuer; thisisfocusedoldcall-patternRED, NOTwholelegacyharnessrun. SeparateboundedclosedprivateP4_RECEIVER_BOUNDARY/1 allowedbeforeSourcewrites, no publiccount/schema/qualifiedprogram/actual5+2driver expansion.

## Actual covering, independent Root audit

ONE KEYLESS43360779854/1 Source96b8e05b, producer131673505040SUCCESS / verifier131673575756SUCCESS. Core91/public40/stage22/http18/pair16/ZIP16 PASS. ExistingP4_WITNESS_NEGATIVES/1 elevenrows/invocations2 EXACTprioroutput. Actualnewreceiverrecord:

```json
{
  "marker": "P4_RECEIVER_BOUNDARY/1",
  "legacy": {
    "invoked": true,
    "receiverUndefined": false,
    "rejection": "p4_private_receiver",
    "issuerReached": false
  },
  "current": {
    "invoked": true,
    "receiverUndefined": true,
    "rejection": "identity",
    "attempts": 1,
    "issued": 0,
    "completed": 0,
    "barrier": "incomplete"
  }
}
```

Rootstrict2JSONSAFE14008645603/2936BZIP/SHA8cd8de5f06116f551e39fad683e7c081b79e90532a607da06d9d116d7618e861/expiry2026-11-20T03:43:02Z; result16884B/c2c627b14c1abbdb472fa3d75a164ee028a14366e128be4cd411fbdd6e14dc49; manifest335B/436359dc92afdf877ebebf0ac5b651862b228c9f24bf5e559c096f9c994319af. Fullmanifest/currentSourceRunAttempt/Core91exactIDs/40/22/18/current7hashes/digesttriple/closedmetadataHTTP200/pair16/ZIP16verified. Alloldcontrolfactsdeepequalexceptcurrentcontext/timings/changedpins. No actualRaw/Originaldownload/Native. Actualrecord_limit atprevious4e642/run43358557484 remains that source evidence, not retrospectivelyupdated; Referencealgorithmunchanged. No actualprojectionreplayreleasedbywave.

## Full INACTIVE workflow fix diff

```diff
@@ -1,5 +1,5 @@
-name: AFW R1 HTTP frontier P4 REVIEW1 PREPARED_INACTIVE
-run-name: AFW R1 HTTP frontier P4 REVIEW1 INACTIVE ${{ github.sha }}
+name: AFW R1 HTTP frontier P4 RECEIVER FINAL PREPARED_INACTIVE
+run-name: AFW R1 HTTP frontier P4 RECEIVER FINAL INACTIVE ${{ github.sha }}
 on:
   workflow_dispatch:
 permissions:
@@ -931,7 +931,7 @@ jobs:
           const WITNESS_REASONS=Object.freeze(['registration','wrapper_registration','identity','duplicate_issue','duplicate_completion','issuance_count','return_token','barrier_incomplete']);
           class WitnessRejected extends Error{constructor(reason){super(reason);this.reason=reason;}}
           function witnessNeed(ok,reason){assert(WITNESS_REASONS.includes(reason));if(!ok)throw new WitnessRejected(reason);}
-          let activeWitness=null,fixedWitnessCallbacks,p4FixtureInventory=null,p4FixtureInvocations=0;
+          let activeWitness=null,fixedWitnessCallbacks,p4FixtureInventory=null,p4FixtureInvocations=0,p4ReceiverBoundary=null;
           function postAssertion(id){
            const active=activeWitness;witnessNeed(active!==null,'identity');active.attempts++;
            const registered=Object.hasOwn(privateFixtureCallbacks,id)?privateFixtureCallbacks[id]:fixedWitnessCallbacks[id];
@@ -947,7 +947,7 @@ jobs:
              return async()=>{
               witnessNeed(completed.get(id)===0,'duplicate_completion');await original();
               const active={id,callback:callbacks[id],attempts:0,issued:0,received:0,token:Object.freeze({})},previous=activeWitness;let result;
-              states.set(id,active);activeWitness=active;try{result=await active.callback();}finally{activeWitness=previous;}
+              states.set(id,active);activeWitness=active;const callback=active.callback;try{result=await callback();}finally{activeWitness=previous;}
               witnessNeed(active.issued===1,'issuance_count');witnessNeed(result===active.token,'return_token');
               witnessNeed(completed.get(id)===0,'duplicate_completion');completed.set(id,1);
              };
@@ -986,10 +986,14 @@ jobs:
             const state=failed.snapshot(id);assert.deepEqual(state,{attempts,issued,received,completed:0});
             assertWitnessReason(()=>failed.barrier(),'barrier_incomplete');rows.push(row(id,observed,state,'incomplete'));
            }
-           let bareInvoked=false;const bareCompletion=()=>{bareInvoked=true;return postAssertion('p4_bare');};
+           let bareInvoked=false,bareReceiverUndefined=null;function bareCompletion(){bareInvoked=true;bareReceiverUndefined=this===undefined;assert(this===undefined,'p4_private_receiver');return postAssertion('p4_bare');}
+           // Focused legacy dispatch RED: same ordinary callback, fixed private receiver, no issuer invocation.
+           const legacyReceiver={callback:bareCompletion};let legacyReceiverRejected=false;assert.throws(()=>legacyReceiver.callback(),error=>{legacyReceiverRejected=error instanceof assert.AssertionError&&error.code==='ERR_ASSERTION'&&error.message==='p4_private_receiver';return legacyReceiverRejected;});assert.equal(bareInvoked,true);assert.equal(bareReceiverUndefined,false);assert.equal(legacyReceiverRejected,true);
+           bareInvoked=false;bareReceiverUndefined=null;
            const bare=createExpansionHarness(['p4_bare'],{p4_bare:bareCompletion});
-           const bareReason=await assertWitnessRejection(()=>bare.wrap('p4_bare',async()=>{})(),'identity');assert.equal(bareInvoked,true);
+           const bareReason=await assertWitnessRejection(()=>bare.wrap('p4_bare',async()=>{})(),'identity');assert.equal(bareInvoked,true);assert.equal(bareReceiverUndefined,true);
            const bareState=bare.snapshot('p4_bare');assert.deepEqual(bareState,{attempts:1,issued:0,received:0,completed:0});assertWitnessReason(()=>bare.barrier(),'barrier_incomplete');rows.push(row('p4_bare',bareReason,bareState,'incomplete'));
+           const receiverBoundary={marker:'P4_RECEIVER_BOUNDARY/1',legacy:{invoked:true,receiverUndefined:false,rejection:'p4_private_receiver',issuerReached:false},current:{invoked:true,receiverUndefined:true,rejection:bareReason,attempts:bareState.attempts,issued:bareState.issued,completed:bareState.completed,barrier:'incomplete'}};if(p4ReceiverBoundary===null)p4ReceiverBoundary=receiverBoundary;else assert.deepEqual(receiverBoundary,p4ReceiverBoundary);
            const inert=createExpansionHarness(['p4_inert_assertion'],{p4_inert_assertion:privateFixtureCallbacks.p4_inert_assertion});let inertObserved=false;
            await assert.rejects(()=>inert.wrap('p4_inert_assertion',async()=>{})(),error=>{inertObserved=error instanceof assert.AssertionError&&error.code==='ERR_ASSERTION'&&error.message==='p4_inert_assertion';return inertObserved;});
            assert.equal(inertObserved,true);assert.deepEqual(inert.snapshot('p4_inert_assertion'),zero);assertWitnessReason(()=>inert.barrier(),'barrier_incomplete');rows.push(row('p4_inert_assertion','inert_assertion',zero,'incomplete'));
@@ -1176,7 +1180,7 @@ jobs:
             const witness=witnessRecord('REFERENCE_EXPANSIONS/2',EXPECTED_EXPANSION_IDS,expansionHarness),line=JSON.stringify(witness)+'\n';assert(Buffer.byteLength(line)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-reference-expansions-safe.json'),line,{flag:'wx',mode:0o600});
             for(const id of HTTP_IDS){try{await frontierHarness.wrap(id,async()=>{})();}catch{httpFirstFailure=id;break;}}
             if(httpFirstFailure===null){const witness=witnessRecord('HTTP_FRONTIER_CONTROLS/1',HTTP_IDS,frontierHarness),line=JSON.stringify(witness)+'\n';assert(Buffer.byteLength(line)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-http-frontier-controls-safe.json'),line,{flag:'wx',mode:0o600});
-             assert.equal(p4FixtureInvocations,2);assert(Array.isArray(p4FixtureInventory)&&p4FixtureInventory.length===11);const p4={marker:'P4_WITNESS_NEGATIVES/1',invocations:p4FixtureInvocations,inventory:p4FixtureInventory},p4line=JSON.stringify(p4)+'\n';assert(Buffer.byteLength(p4line)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-p4-witness-negatives-safe.json'),p4line,{flag:'wx',mode:0o600});}
+             assert.equal(p4FixtureInvocations,2);assert(Array.isArray(p4FixtureInventory)&&p4FixtureInventory.length===11);const p4={marker:'P4_WITNESS_NEGATIVES/1',invocations:p4FixtureInvocations,inventory:p4FixtureInventory},p4line=JSON.stringify(p4)+'\n';assert(Buffer.byteLength(p4line)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-p4-witness-negatives-safe.json'),p4line,{flag:'wx',mode:0o600});const receiverLine=JSON.stringify(p4ReceiverBoundary)+'\n';assert(Buffer.byteLength(receiverLine)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-p4-receiver-boundary-safe.json'),receiverLine,{flag:'wx',mode:0o600});}
            }
           }catch{firstFailure='setup';}
           const pass=inventory.filter(x=>x.status==='passed').length,fail=inventory.filter(x=>x.status==='failed').length,record={marker:'REFERENCE_CONTROLS/1',expected:IDS.length,completed:pass+fail,pass,fail,inventory,firstFailure};
@@ -1430,7 +1434,7 @@ jobs:
           
           function inline(tag){const opener="<<'"+tag+"'\n",ending="          "+tag+"\n";need(wf.split(opener).length===2);const a=wf.indexOf(opener)+opener.length,b=wf.indexOf(ending,a);need(b>a);const rows=wf.slice(a,b).split('\n');need(rows.pop()==='');return rows.map(x=>{need(x.startsWith('          '));return x.slice(10);}).join('\n')+'\n';}
           const reference=inline('NODE_REFERENCE'),referenceTests=inline('NODE_REFERENCE_TESTS'),referenceBootstrap=inline('NODE_REFERENCE_BOOTSTRAP');
-          need(hash(reference)==='672b054312d8c23c38662719b5183e6e345a322e6db74c6f761719b9bfdf4e36'&&hash(referenceTests)==='c75f8610543dabfefb134462645769880f6fc78a0f5554667d9515584e5fff19'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
+          need(hash(reference)==='672b054312d8c23c38662719b5183e6e345a322e6db74c6f761719b9bfdf4e36'&&hash(referenceTests)==='414d277617f675d5031f66273c2a84b7a4ec95fc9a66150d5527b13eb1293ae8'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
           for(const[name,body]of [['afw-readonly-inspector-current.mjs',core],['afw-reference-supplement-current.mjs',reference],['afw-reference-controls-current.mjs',referenceTests],['afw-reference-bootstrap-current.mjs',referenceBootstrap]])await writeFile(join(resolve(process.env.RUNNER_TEMP),name),body,{flag:'wx',mode:0o600});
           const referenceImports="\nimport {validateSupplementPair,validateControlProof} from './afw-reference-supplement-current.mjs';\nconst SOURCE_REFERENCE_SHA="+JSON.stringify(hash(reference))+",SOURCE_REFERENCE_TESTS_SHA="+JSON.stringify(hash(referenceTests))+",SOURCE_REFERENCE_BOOTSTRAP_SHA="+JSON.stringify(hash(referenceBootstrap))+",SOURCE_MATERIALIZER_SHA="+JSON.stringify(hash(inline('NODE_MATERIALIZE')))+",SOURCE_SAFE_ZIP_SHA="+JSON.stringify(hash(inline('NODE_SAFE_ZIP')))+";\n";
           
```

## Full KEYLESS workflow fix diff

```diff
@@ -1,5 +1,5 @@
-name: AFW R1 HTTP frontier P4 REVIEW1 ONE KEYLESS qualification
-run-name: AFW R1 HTTP frontier P4 REVIEW1 ONE KEYLESS attempt1 ${{ github.sha }}
+name: AFW R1 HTTP frontier P4 RECEIVER FINAL ONE KEYLESS qualification
+run-name: AFW R1 HTTP frontier P4 RECEIVER FINAL ONE KEYLESS attempt1 ${{ github.sha }}
 on:
   push:
     branches: [feat/finite-native-cleanup-20261101]
@@ -988,7 +988,7 @@ jobs:
           const WITNESS_REASONS=Object.freeze(['registration','wrapper_registration','identity','duplicate_issue','duplicate_completion','issuance_count','return_token','barrier_incomplete']);
           class WitnessRejected extends Error{constructor(reason){super(reason);this.reason=reason;}}
           function witnessNeed(ok,reason){assert(WITNESS_REASONS.includes(reason));if(!ok)throw new WitnessRejected(reason);}
-          let activeWitness=null,fixedWitnessCallbacks,p4FixtureInventory=null,p4FixtureInvocations=0;
+          let activeWitness=null,fixedWitnessCallbacks,p4FixtureInventory=null,p4FixtureInvocations=0,p4ReceiverBoundary=null;
           function postAssertion(id){
            const active=activeWitness;witnessNeed(active!==null,'identity');active.attempts++;
            const registered=Object.hasOwn(privateFixtureCallbacks,id)?privateFixtureCallbacks[id]:fixedWitnessCallbacks[id];
@@ -1004,7 +1004,7 @@ jobs:
              return async()=>{
               witnessNeed(completed.get(id)===0,'duplicate_completion');await original();
               const active={id,callback:callbacks[id],attempts:0,issued:0,received:0,token:Object.freeze({})},previous=activeWitness;let result;
-              states.set(id,active);activeWitness=active;try{result=await active.callback();}finally{activeWitness=previous;}
+              states.set(id,active);activeWitness=active;const callback=active.callback;try{result=await callback();}finally{activeWitness=previous;}
               witnessNeed(active.issued===1,'issuance_count');witnessNeed(result===active.token,'return_token');
               witnessNeed(completed.get(id)===0,'duplicate_completion');completed.set(id,1);
              };
@@ -1043,10 +1043,14 @@ jobs:
             const state=failed.snapshot(id);assert.deepEqual(state,{attempts,issued,received,completed:0});
             assertWitnessReason(()=>failed.barrier(),'barrier_incomplete');rows.push(row(id,observed,state,'incomplete'));
            }
-           let bareInvoked=false;const bareCompletion=()=>{bareInvoked=true;return postAssertion('p4_bare');};
+           let bareInvoked=false,bareReceiverUndefined=null;function bareCompletion(){bareInvoked=true;bareReceiverUndefined=this===undefined;assert(this===undefined,'p4_private_receiver');return postAssertion('p4_bare');}
+           // Focused legacy dispatch RED: same ordinary callback, fixed private receiver, no issuer invocation.
+           const legacyReceiver={callback:bareCompletion};let legacyReceiverRejected=false;assert.throws(()=>legacyReceiver.callback(),error=>{legacyReceiverRejected=error instanceof assert.AssertionError&&error.code==='ERR_ASSERTION'&&error.message==='p4_private_receiver';return legacyReceiverRejected;});assert.equal(bareInvoked,true);assert.equal(bareReceiverUndefined,false);assert.equal(legacyReceiverRejected,true);
+           bareInvoked=false;bareReceiverUndefined=null;
            const bare=createExpansionHarness(['p4_bare'],{p4_bare:bareCompletion});
-           const bareReason=await assertWitnessRejection(()=>bare.wrap('p4_bare',async()=>{})(),'identity');assert.equal(bareInvoked,true);
+           const bareReason=await assertWitnessRejection(()=>bare.wrap('p4_bare',async()=>{})(),'identity');assert.equal(bareInvoked,true);assert.equal(bareReceiverUndefined,true);
            const bareState=bare.snapshot('p4_bare');assert.deepEqual(bareState,{attempts:1,issued:0,received:0,completed:0});assertWitnessReason(()=>bare.barrier(),'barrier_incomplete');rows.push(row('p4_bare',bareReason,bareState,'incomplete'));
+           const receiverBoundary={marker:'P4_RECEIVER_BOUNDARY/1',legacy:{invoked:true,receiverUndefined:false,rejection:'p4_private_receiver',issuerReached:false},current:{invoked:true,receiverUndefined:true,rejection:bareReason,attempts:bareState.attempts,issued:bareState.issued,completed:bareState.completed,barrier:'incomplete'}};if(p4ReceiverBoundary===null)p4ReceiverBoundary=receiverBoundary;else assert.deepEqual(receiverBoundary,p4ReceiverBoundary);
            const inert=createExpansionHarness(['p4_inert_assertion'],{p4_inert_assertion:privateFixtureCallbacks.p4_inert_assertion});let inertObserved=false;
            await assert.rejects(()=>inert.wrap('p4_inert_assertion',async()=>{})(),error=>{inertObserved=error instanceof assert.AssertionError&&error.code==='ERR_ASSERTION'&&error.message==='p4_inert_assertion';return inertObserved;});
            assert.equal(inertObserved,true);assert.deepEqual(inert.snapshot('p4_inert_assertion'),zero);assertWitnessReason(()=>inert.barrier(),'barrier_incomplete');rows.push(row('p4_inert_assertion','inert_assertion',zero,'incomplete'));
@@ -1233,7 +1237,7 @@ jobs:
             const witness=witnessRecord('REFERENCE_EXPANSIONS/2',EXPECTED_EXPANSION_IDS,expansionHarness),line=JSON.stringify(witness)+'\n';assert(Buffer.byteLength(line)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-reference-expansions-safe.json'),line,{flag:'wx',mode:0o600});
             for(const id of HTTP_IDS){try{await frontierHarness.wrap(id,async()=>{})();}catch{httpFirstFailure=id;break;}}
             if(httpFirstFailure===null){const witness=witnessRecord('HTTP_FRONTIER_CONTROLS/1',HTTP_IDS,frontierHarness),line=JSON.stringify(witness)+'\n';assert(Buffer.byteLength(line)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-http-frontier-controls-safe.json'),line,{flag:'wx',mode:0o600});
-             assert.equal(p4FixtureInvocations,2);assert(Array.isArray(p4FixtureInventory)&&p4FixtureInventory.length===11);const p4={marker:'P4_WITNESS_NEGATIVES/1',invocations:p4FixtureInvocations,inventory:p4FixtureInventory},p4line=JSON.stringify(p4)+'\n';assert(Buffer.byteLength(p4line)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-p4-witness-negatives-safe.json'),p4line,{flag:'wx',mode:0o600});}
+             assert.equal(p4FixtureInvocations,2);assert(Array.isArray(p4FixtureInventory)&&p4FixtureInventory.length===11);const p4={marker:'P4_WITNESS_NEGATIVES/1',invocations:p4FixtureInvocations,inventory:p4FixtureInventory},p4line=JSON.stringify(p4)+'\n';assert(Buffer.byteLength(p4line)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-p4-witness-negatives-safe.json'),p4line,{flag:'wx',mode:0o600});const receiverLine=JSON.stringify(p4ReceiverBoundary)+'\n';assert(Buffer.byteLength(receiverLine)<=2048);await writeFile(join(resolve(process.env.RUNNER_TEMP),'afw-p4-receiver-boundary-safe.json'),receiverLine,{flag:'wx',mode:0o600});}
            }
           }catch{firstFailure='setup';}
           const pass=inventory.filter(x=>x.status==='passed').length,fail=inventory.filter(x=>x.status==='failed').length,record={marker:'REFERENCE_CONTROLS/1',expected:IDS.length,completed:pass+fail,pass,fail,inventory,firstFailure};
@@ -1316,6 +1320,8 @@ jobs:
           const p4=await readJson('afw-p4-witness-negatives-safe.json',2048),expectedP4={"marker":"P4_WITNESS_NEGATIVES/1","invocations":2,"inventory":[{"id":"p4_missing","reason":"registration","attempts":0,"issued":0,"received":0,"barrier":"unavailable"},{"id":"p4_skipped","reason":"barrier_incomplete","attempts":0,"issued":0,"received":0,"barrier":"incomplete"},{"id":"p4_no_op","reason":"issuance_count","attempts":0,"issued":0,"received":0,"barrier":"incomplete"},{"id":"p4_forged_no_issue","reason":"issuance_count","attempts":0,"issued":0,"received":0,"barrier":"incomplete"},{"id":"p4_fabricated_return","reason":"return_token","attempts":1,"issued":1,"received":1,"barrier":"incomplete"},{"id":"p4_unreturned","reason":"return_token","attempts":1,"issued":1,"received":1,"barrier":"incomplete"},{"id":"p4_doubled","reason":"duplicate_issue","attempts":2,"issued":1,"received":1,"barrier":"incomplete"},{"id":"p4_bare","reason":"identity","attempts":1,"issued":0,"received":0,"barrier":"incomplete"},{"id":"p4_inert_assertion","reason":"inert_assertion","attempts":0,"issued":0,"received":0,"barrier":"incomplete"},{"id":"p4_positive","reason":"none","attempts":1,"issued":1,"received":1,"barrier":"complete"},{"id":"p4_positive","reason":"duplicate_completion","attempts":1,"issued":1,"received":1,"barrier":"complete"}]};
           if(JSON.stringify(p4)!==JSON.stringify(expectedP4))throw Error('p4_witness_fixture_rejected');
           const p4Line=JSON.stringify(p4)+'\n';if(Buffer.byteLength(p4Line)>2048)throw Error('p4_witness_fixture_bound');process.stdout.write(p4Line);
+          const receiver=await readJson('afw-p4-receiver-boundary-safe.json',2048),expectedReceiver={marker:'P4_RECEIVER_BOUNDARY/1',legacy:{invoked:true,receiverUndefined:false,rejection:'p4_private_receiver',issuerReached:false},current:{invoked:true,receiverUndefined:true,rejection:'identity',attempts:1,issued:0,completed:0,barrier:'incomplete'}};
+          if(JSON.stringify(receiver)!==JSON.stringify(expectedReceiver))throw Error('p4_receiver_fixture_rejected');const receiverLine=JSON.stringify(receiver)+'\n';if(Buffer.byteLength(receiverLine)>2048)throw Error('p4_receiver_fixture_bound');process.stdout.write(receiverLine);
           const dest=join(root,'afw-readonly-inspector-controls-public'),value=JSON.parse(await readFile(join(dest,'result.json'),'utf8'));
           value.referenceSupplement=referenceSupplement;
           const bytes=Buffer.from(JSON.stringify(value,null,2)),manifest=Buffer.from(JSON.stringify({purpose:'afw.readonly-receipt-inspector.CONTROLS.manifest.safe.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,files:[{path:'result.json',bytes:bytes.length,sha256:hash(bytes)}]},null,2));
@@ -1519,7 +1525,7 @@ jobs:
           
           function inline(tag){const opener="<<'"+tag+"'\n",ending="          "+tag+"\n";need(wf.split(opener).length===2);const a=wf.indexOf(opener)+opener.length,b=wf.indexOf(ending,a);need(b>a);const rows=wf.slice(a,b).split('\n');need(rows.pop()==='');return rows.map(x=>{need(x.startsWith('          '));return x.slice(10);}).join('\n')+'\n';}
           const reference=inline('NODE_REFERENCE'),referenceTests=inline('NODE_REFERENCE_TESTS'),referenceBootstrap=inline('NODE_REFERENCE_BOOTSTRAP');
-          need(hash(reference)==='672b054312d8c23c38662719b5183e6e345a322e6db74c6f761719b9bfdf4e36'&&hash(referenceTests)==='c75f8610543dabfefb134462645769880f6fc78a0f5554667d9515584e5fff19'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
+          need(hash(reference)==='672b054312d8c23c38662719b5183e6e345a322e6db74c6f761719b9bfdf4e36'&&hash(referenceTests)==='414d277617f675d5031f66273c2a84b7a4ec95fc9a66150d5527b13eb1293ae8'&&hash(referenceBootstrap)==='2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1');
           for(const[name,body]of [['afw-readonly-inspector-current.mjs',core],['afw-reference-supplement-current.mjs',reference],['afw-reference-controls-current.mjs',referenceTests],['afw-reference-bootstrap-current.mjs',referenceBootstrap]])await writeFile(join(resolve(process.env.RUNNER_TEMP),name),body,{flag:'wx',mode:0o600});
           const referenceImports="\nimport {validateSupplementPair,validateControlProof} from './afw-reference-supplement-current.mjs';\nconst SOURCE_REFERENCE_SHA="+JSON.stringify(hash(reference))+",SOURCE_REFERENCE_TESTS_SHA="+JSON.stringify(hash(referenceTests))+",SOURCE_REFERENCE_BOOTSTRAP_SHA="+JSON.stringify(hash(referenceBootstrap))+",SOURCE_MATERIALIZER_SHA="+JSON.stringify(hash(inline('NODE_MATERIALIZE')))+",SOURCE_SAFE_ZIP_SHA="+JSON.stringify(hash(inline('NODE_SAFE_ZIP')))+";\n";
           
```

## Final closure

Source d532c8309af30e0ab35d62fe400a5d392aac59b9/tree62a2d666a0e719360b8626f5982eafaf3565144b/reportf9def92f63519a73b2c0af63ec0c8ae15aaf31f3/877917chars/entire851729prefix. Root fullref/commit/nontruncatedtree3194/netreport-only/all3193nonreport+3192protected/F7f7a71/manual7false/main0c9/fiveactive0 independentlyverified. SourcewriterSTOPPED. All5readinessfalse; currentplan stillpendingyourSCOPEDverdict. No newgeneralrevieworNativecauseclaim.

## Full appended executor report / actual commands and output



## R1 HTTP frontier — ONE final P4 receiver fix and KEYLESS cover (2026-11-13 UTC)

Executed as sole Source fixer under immutable release e6f1fcd62c6c34ef512a4dd61d1401313d0f0fe5, plus Root's narrow acceptance of the focused legacy-receiver expression control and distinct closed P4_RECEIVER_BOUNDARY/1 channel. No subagents or reviewers were spawned. Root owns the separate signature-wording correction: current whole-manifest/SHA256 and authenticated GitHub metadata are integrity/provenance evidence, not an independent signature.

Preflight independently verified repository1347578006, full734-head lease, Source aa54c05b/tree d1ebdd1e, nontruncated3194 leaves, all3192 protected leaves/modes, main0c9c475b, all62 workflow blob identities and their complete on/event frames, held contracts2006beb4 and Nativebaa84420 manual-only, exact closedF7/manual/noinputs/nopush/sevenliteralfalse, full851729-character report prefix/blob1b0da91c, and queued/in_progress/waiting/pending/requested each0. Rollback was already recoverable as exact126209-byte F7/SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a. All other refs remained unchanged through preclosure; the only changed ref was the authorized Source branch.

The sole boundary fix copies active.callback into a local callable and invokes callback() with no receiver or arguments. It preserves private identity checks, token issuance, issuance_count, return_token, duplicate_issue, duplicate_completion, main-once wrappers and the final barriers. The existing p4_bare arrow was replaced by an ordinary function asserting this===undefined BEFORE postAssertion. The regression string was written before the dispatch fix (pre-fix regression SHA256e40fdc8c6f4259738882e9909a712a6fbf06e695f1cddcf4a27d7b9352bed5aa); this is authoring order, not a claim of local execution. No Source was evaluated/imported/executed on the PC; only public Source string extraction, replacement, JSON literal parsing and hashing occurred in RAM. No Source files/clones/dependencies/builds were created locally.

Within the SAME one finite cloud covering, the SAME ordinary callback first ran via the focused historical expression legacyReceiver.callback() on a fixed private receiver. It was actually invoked, observed receiverUndefined=false, and failed the exact ERR_ASSERTION/p4_private_receiver assertion before issuer invocation. This is a focused LEGACY DISPATCH RED, not execution of the complete historical harness. Then the REAL current createExpansionHarness invoked that callback with this===undefined; it reached postAssertion, was rejected for exact identity with attempts1/issued0/received0/completed0, and its barrier remained incomplete. This is CURRENT HARNESS GREEN for the boundary and intended rejection. The original eleven P4 rows and all forty/22/18 public proof IDs/counts remained unchanged; P4 counterexamples ran twice and retained every prior exact reason/counter. The separate closed auxiliary line is bounded to2048bytes and is KEYLESS-only evidence, not a SAFE field, public control ID, export or capability.

Only Selftests and its required Materializer test-hash pin changed among the eight literal bodies; Core77002/Reference34180/Bootstrap1370/ZIP13305/pinhelper/pairappendix stayed byte-for-byte equal. The HTTP predicate, guard order, schema and Reference algorithm672b0543 are unchanged. Seven qualified programs are distinct from heredoc count. GeneratedVerifier was independently framed from public strings WITHOUT executing the materializer: old41119bytes/1d7ddac4 matched the prior map, then current41119bytes/9ee395af matched across actualINACTIVE and pureKEYLESS frames. Both frames use the same new seven program bodies. Actual5+2 driver checkout, private producer semantics and budgets were preserved, remained manually inactive, and were NOT run.

An inactive actual5+2 commit was created and its full F7 read back exactly before activation; it is the parent of the KEYLESS commit and therefore recoverable in ancestry. ONE expected-head CAS moved aa54c05b to96b8e05b. Exactly one matching push/selfpath/run43360779854/attempt1 was observed; Source remained frozen through BOTH terminalSUCCESS jobs. Cloud executed Core91 fixed inert controls, Reference40 and actual stage22+HTTP18 post-assertion witnesses, the focused receiver RED/current GREEN, originalP4 eleven rows twice, pair16 and ZIP16. The current verifier authenticated assigned SMALLSAFE metadata, bounded2936-byte ZIP, whole-manifest/currentSource/run/attempt, exact twoJSON inventory, combined17219bytes (16884+335), raw digests and closed control schema; stagecomplete/reasonnone, core91. Actual closed output is preserved below. No Original artifact/privatecipher/plain/key/MODEL/actual-producer logs, Native/SDK/MF/I0/CF/runtime/OAuth/OTP/newaccess/Max/mail/main/PR/merge/publication action occurred. Only the CURRENT KEYLESS job logs were fetched; currentSAFE binary was not downloaded into tools/PC.

```json
{
  "release": "e6f1fcd62c6c34ef512a4dd61d1401313d0f0fe5",
  "closedBase": "aa54c05bd73c692b6da67871f47766a629f1a3b3",
  "baseTree": "d1ebdd1e2b4b0c78dec82c81c74f1f0cad695b84",
  "reportPrefix": {
    "characters": 851729,
    "blob": "1b0da91c8ba69888083750b786da57f89b0e172e",
    "entirePrefixPreserved": true
  },
  "inactiveActual5Plus2": {
    "commit": "039e42a2b53886addf8b99777f6133b3444f6ed3",
    "tree": "cde330646673ed94d9036ef3ad3beac35b33f7b5",
    "blob": "78f1c5aa2f0210c58d650d5712b0a4570e20c620",
    "bytes": 248848,
    "manualNoInputsNoPush": true,
    "bothLiteralFalse": true,
    "activated": false
  },
  "keylessActivation": {
    "source": "96b8e05b84ce05d9835c90484afbb1fb336306ef",
    "tree": "9f3f91841af715a2e313042a4b25302ab18d5481",
    "blob": "c1d80eb362fc9abd9afefaa4bf78673d03de3362",
    "bytes": 268841,
    "oneExpectedHeadCAS": true,
    "sourceFrozenUntilBothTerminal": true
  },
  "sevenPrograms": {
    "NODE_CORE": {
      "bytes": 77002,
      "sha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246"
    },
    "NODE_REFERENCE": {
      "bytes": 34180,
      "sha256": "672b054312d8c23c38662719b5183e6e345a322e6db74c6f761719b9bfdf4e36"
    },
    "NODE_REFERENCE_TESTS": {
      "bytes": 75620,
      "sha256": "414d277617f675d5031f66273c2a84b7a4ec95fc9a66150d5527b13eb1293ae8"
    },
    "NODE_REFERENCE_BOOTSTRAP": {
      "bytes": 1370,
      "sha256": "2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1"
    },
    "NODE_SAFE_ZIP": {
      "bytes": 13305,
      "sha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
    },
    "NODE_MATERIALIZE": {
      "bytes": 21125,
      "sha256": "be54746438366563d4361e508f0f7e4f6e7519a1890fd4dc8b0c783dce3a93e0"
    },
    "GENERATED_VERIFIER": {
      "bytes": 41119,
      "sha256": "9ee395af73eda7b29a9b392905fd46584e7bc22780b907b4d9af69884e958134"
    }
  },
  "run": {
    "id": 43360779854,
    "attempt": 1,
    "status": "completed",
    "conclusion": "success",
    "event": "push",
    "createdAt": "2026-11-13T03:42:53Z",
    "updatedAt": "2026-11-13T03:43:17Z"
  },
  "jobs": [
    {
      "id": 131673505040,
      "name": "producer",
      "status": "completed",
      "conclusion": "success",
      "allStepsTerminal": true,
      "allStepsSuccess": true
    },
    {
      "id": 131673575756,
      "name": "verifier",
      "status": "completed",
      "conclusion": "success",
      "allStepsTerminal": true,
      "allStepsSuccess": true
    }
  ],
  "safeArtifact": {
    "id": 14008645603,
    "name": "afw-readonly-receipt-inspection-43360779854-1",
    "zipBytes": 2936,
    "digest": "sha256:8cd8de5f06116f551e39fad683e7c081b79e90532a607da06d9d116d7618e861",
    "expired": false,
    "createdAt": "2026-11-13T03:43:03Z",
    "expiresAt": "2026-11-20T03:43:02Z",
    "workflowRun": {
      "id": 43360779854,
      "repository_id": 1347578006,
      "head_repository_id": 1347578006,
      "head_branch": "feat/finite-native-cleanup-20261101",
      "head_sha": "96b8e05b84ce05d9835c90484afbb1fb336306ef"
    }
  },
  "actualClosedOutputs": [
    {
      "job": 131673505040,
      "marker": "REFERENCE_CONTROLS/1",
      "expected": 40,
      "completed": 40,
      "pass": 40,
      "fail": 0,
      "inventory": [
        {
          "id": "two_valid",
          "status": "passed"
        },
        {
          "id": "zero_fraction_false",
          "status": "passed"
        },
        {
          "id": "lookup_states",
          "status": "passed"
        },
        {
          "id": "identities_flags",
          "status": "passed"
        },
        {
          "id": "required_bounds",
          "status": "passed"
        },
        {
          "id": "optional_types",
          "status": "passed"
        },
        {
          "id": "array_bounds",
          "status": "passed"
        },
        {
          "id": "empty_absent",
          "status": "passed"
        },
        {
          "id": "writer_http",
          "status": "passed"
        },
        {
          "id": "private_canary",
          "status": "passed"
        },
        {
          "id": "file_missing_bad",
          "status": "passed"
        },
        {
          "id": "file_bound_links",
          "status": "passed"
        },
        {
          "id": "gate_no_read",
          "status": "passed"
        },
        {
          "id": "one_cleanup",
          "status": "passed"
        },
        {
          "id": "primary_cleanup",
          "status": "passed"
        },
        {
          "id": "timeout_cleanup",
          "status": "passed"
        },
        {
          "id": "uncertain_no_cleanup",
          "status": "passed"
        },
        {
          "id": "cleanup_late_fail",
          "status": "passed"
        },
        {
          "id": "whole_hash_bytes",
          "status": "passed"
        },
        {
          "id": "nested_identity",
          "status": "passed"
        },
        {
          "id": "complete_partial",
          "status": "passed"
        },
        {
          "id": "strict_envelope",
          "status": "passed"
        },
        {
          "id": "producer_transport",
          "status": "passed"
        },
        {
          "id": "verifier_transport",
          "status": "passed"
        },
        {
          "id": "lc_pair",
          "status": "passed"
        },
        {
          "id": "lc_last",
          "status": "passed"
        },
        {
          "id": "lc_pos",
          "status": "passed"
        },
        {
          "id": "lc_unknown",
          "status": "passed"
        },
        {
          "id": "lc_ops",
          "status": "passed"
        },
        {
          "id": "lc_steps",
          "status": "passed"
        },
        {
          "id": "lc_scalars",
          "status": "passed"
        },
        {
          "id": "lc_absent",
          "status": "passed"
        },
        {
          "id": "lc_guard",
          "status": "passed"
        },
        {
          "id": "lc_invalid",
          "status": "passed"
        },
        {
          "id": "lc_schema",
          "status": "passed"
        },
        {
          "id": "lc_clean",
          "status": "passed"
        },
        {
          "id": "lc_clock",
          "status": "passed"
        },
        {
          "id": "lc_manifest",
          "status": "passed"
        },
        {
          "id": "lc_transport",
          "status": "passed"
        },
        {
          "id": "lc_bounds",
          "status": "passed"
        }
      ],
      "firstFailure": null
    },
    {
      "job": 131673505040,
      "marker": "REFERENCE_EXPANSIONS/2",
      "expected": 22,
      "completed": 22,
      "pass": 22,
      "fail": 0,
      "inventory": [
        {
          "id": "two_valid",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "identities_flags",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "required_bounds",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "optional_types",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "array_bounds",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "private_canary",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "file_missing_bad",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "file_bound_links",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "gate_no_read",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "timeout_cleanup",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "uncertain_no_cleanup",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "strict_envelope",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_pair",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_last",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_unknown",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_ops",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_steps",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_schema",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_clean",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_clock",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_manifest",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "lc_bounds",
          "count": 1,
          "postAssertion": true
        }
      ],
      "firstFailure": null
    },
    {
      "job": 131673505040,
      "marker": "HTTP_FRONTIER_CONTROLS/1",
      "expected": 18,
      "completed": 18,
      "pass": 18,
      "fail": 0,
      "inventory": [
        {
          "id": "present_http",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "absent_http",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "collection_type",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "collection_limit",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "boundary_256",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "row_type",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "elapsed_ms",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "body_guard_ms",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "ordered_fields",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "ordered_rows",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "earlier_basic",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "earlier_children",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "case_r2",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "unbranded_error",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "read_policy",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "public_schema",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "canary",
          "count": 1,
          "postAssertion": true
        },
        {
          "id": "no_op_registration",
          "count": 1,
          "postAssertion": true
        }
      ],
      "firstFailure": null
    },
    {
      "job": 131673505040,
      "marker": "P4_WITNESS_NEGATIVES/1",
      "invocations": 2,
      "inventory": [
        {
          "id": "p4_missing",
          "reason": "registration",
          "attempts": 0,
          "issued": 0,
          "received": 0,
          "barrier": "unavailable"
        },
        {
          "id": "p4_skipped",
          "reason": "barrier_incomplete",
          "attempts": 0,
          "issued": 0,
          "received": 0,
          "barrier": "incomplete"
        },
        {
          "id": "p4_no_op",
          "reason": "issuance_count",
          "attempts": 0,
          "issued": 0,
          "received": 0,
          "barrier": "incomplete"
        },
        {
          "id": "p4_forged_no_issue",
          "reason": "issuance_count",
          "attempts": 0,
          "issued": 0,
          "received": 0,
          "barrier": "incomplete"
        },
        {
          "id": "p4_fabricated_return",
          "reason": "return_token",
          "attempts": 1,
          "issued": 1,
          "received": 1,
          "barrier": "incomplete"
        },
        {
          "id": "p4_unreturned",
          "reason": "return_token",
          "attempts": 1,
          "issued": 1,
          "received": 1,
          "barrier": "incomplete"
        },
        {
          "id": "p4_doubled",
          "reason": "duplicate_issue",
          "attempts": 2,
          "issued": 1,
          "received": 1,
          "barrier": "incomplete"
        },
        {
          "id": "p4_bare",
          "reason": "identity",
          "attempts": 1,
          "issued": 0,
          "received": 0,
          "barrier": "incomplete"
        },
        {
          "id": "p4_inert_assertion",
          "reason": "inert_assertion",
          "attempts": 0,
          "issued": 0,
          "received": 0,
          "barrier": "incomplete"
        },
        {
          "id": "p4_positive",
          "reason": "none",
          "attempts": 1,
          "issued": 1,
          "received": 1,
          "barrier": "complete"
        },
        {
          "id": "p4_positive",
          "reason": "duplicate_completion",
          "attempts": 1,
          "issued": 1,
          "received": 1,
          "barrier": "complete"
        }
      ]
    },
    {
      "job": 131673505040,
      "marker": "P4_RECEIVER_BOUNDARY/1",
      "legacy": {
        "invoked": true,
        "receiverUndefined": false,
        "rejection": "p4_private_receiver",
        "issuerReached": false
      },
      "current": {
        "invoked": true,
        "receiverUndefined": true,
        "rejection": "identity",
        "attempts": 1,
        "issued": 0,
        "completed": 0,
        "barrier": "incomplete"
      }
    },
    {
      "job": 131673575756,
      "marker": "INSPECTION_PAIR_CONTROLS",
      "expected": 16,
      "completed": 16,
      "pass": 16,
      "fail": 0,
      "inventory": [
        {
          "id": "observed_pass",
          "status": "passed"
        },
        {
          "id": "observed_failure",
          "status": "passed"
        },
        {
          "id": "observed_skip_todo",
          "status": "passed"
        },
        {
          "id": "result_source",
          "status": "passed"
        },
        {
          "id": "result_run",
          "status": "passed"
        },
        {
          "id": "manifest_source",
          "status": "passed"
        },
        {
          "id": "manifest_run",
          "status": "passed"
        },
        {
          "id": "foreign_pair",
          "status": "passed"
        },
        {
          "id": "fixture_count",
          "status": "passed"
        },
        {
          "id": "unexamined",
          "status": "passed"
        },
        {
          "id": "two_records",
          "status": "passed"
        },
        {
          "id": "unknown_case",
          "status": "passed"
        },
        {
          "id": "wrapper_only",
          "status": "passed"
        },
        {
          "id": "manifest_bytes",
          "status": "passed"
        },
        {
          "id": "manifest_digest",
          "status": "passed"
        },
        {
          "id": "case_order",
          "status": "passed"
        }
      ],
      "firstFailure": null
    },
    {
      "job": 131673575756,
      "marker": "SAFE_ZIP_CONTROLS",
      "expected": 16,
      "completed": 16,
      "pass": 16,
      "fail": 0,
      "inventory": [
        {
          "id": "validator_capture_after_success",
          "status": "passed"
        },
        {
          "id": "validator_rejection_identity_no_capture",
          "status": "passed"
        },
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
      ],
      "failure": null
    },
    {
      "job": 131673575756,
      "marker": "AFW_SAFE_READBACK/1",
      "kind": "controls",
      "source": "96b8e05b84ce05d9835c90484afbb1fb336306ef",
      "run": "43360779854",
      "attempt": 1,
      "artifactId": "14008645603",
      "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
      "verifierSha256": "9ee395af73eda7b29a9b392905fd46584e7bc22780b907b4d9af69884e958134",
      "safeZipModuleSha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
      "producerCoreVerified": true,
      "sourceCoreVerified": true,
      "safeControlsPass": true,
      "metadataVerified": true,
      "rawZipVerified": true,
      "inventoryVerified": true,
      "producerControlCount": 91,
      "supplementStatus": null,
      "zipBytes": 2936,
      "metadataZipBytes": 2936,
      "uploadDigest": "8cd8de5f06116f551e39fad683e7c081b79e90532a607da06d9d116d7618e861",
      "metadataDigest": "sha256:8cd8de5f06116f551e39fad683e7c081b79e90532a607da06d9d116d7618e861",
      "rawZipSha256": "8cd8de5f06116f551e39fad683e7c081b79e90532a607da06d9d116d7618e861",
      "resultBytes": 16884,
      "resultSha256": "c2c627b14c1abbdb472fa3d75a164ee028a14366e128be4cd411fbdd6e14dc49",
      "manifestBytes": 335,
      "manifestSha256": "436359dc92afdf877ebebf0ac5b651862b228c9f24bf5e559c096f9c994319af",
      "stage": "complete",
      "reason": "none",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    }
  ],
  "rollback": {
    "F7": "f7a71f1a0fa4f5ddf069ff411f008a098455e5cc",
    "bytes": 126209,
    "sha256": "1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a",
    "manualNoInputsNoPush": true,
    "literalFalseJobCount": 7
  },
  "allReadinessFalse": true
}
```

Actual tool/command evidence: GitHub fetch_file at exact release/base/recovered frames; GET /git/ref/heads/<Source>, /git/refs/heads, /git/commits/<exact>, /git/trees/<exact>?recursive=1, /git/ref/heads/main and five fixed Source-branch active-state GETs; GitDB create_blob/create_tree/create_commit, full immutableF7 readback and expected_sha update_ref. GET /actions/runs?head_sha=96b8e05b84ce05d9835c90484afbb1fb336306ef found exactlyONE; fetch_workflow_run_jobs(43360779854), fetch_workflow_job_logs for ONLY currentKEYLESS131673505040/131673575756, fetch_workflow_run_artifacts for ONLY currentrun, GET /actions/runs/43360779854 and Source ref freeze check. Actual cloud commands retained the existing node --check programs, source-current materializer reconstruction, Core controls, timeout --kill-after=1s 45s env -i ... --no-experimental-fetch Selftests, NODE_REFERENCE_PROOF validation, strict closed sealing, pair16 and assigned ZIP16/current artifact verifier. No rerun/dispatch/secondcovering/actualRaw occurred.

ANYterminal closure restores exactF7f7a71 and appends this receipt in the same expected-head commit, preserving ENTIRE851729-character prefix. Independent full finalref/commit/nontruncatedtree/F7/report/main/full734refs/62workflowevents/heldframes/fiveactive0 readbacks follow; all3192protected leaves/modes and all3193non-report leaves must equal aa54. This append cannot self-record its eventual GitSHA/tree without circularity; the executor's final closure handoff records those primary identifiers. Net final change is report-only. Allfive readiness flags remainfalse. Prior actualR1 record_limit/source4e642/run43358557484 remains prior Source evidence; no replay or new actual projection was performed. This test boundary is not Source-author unforgeability or operational readiness. Success still requires ONE scoped review by the original final reviewer before any CLEAN claim. No automatic extra fix/run. After full closed readback the Source writer STOPs.
