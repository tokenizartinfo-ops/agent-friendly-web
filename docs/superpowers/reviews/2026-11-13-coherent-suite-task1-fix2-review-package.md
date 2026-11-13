# Task1 fix2 scoped review package

Scope: prior open F1/F4/F6 and new F8 plus regressionsINthisfix only. F2/F3/F5/F7 previously addressed and not reopened unless this diff breaks them. ActualTask2HELD.
Brief/findings/rulings: Rootdocs54e49edf6020a0d9f6194745239a679a6d20b95d docs/superpowers/briefs/2026-11-13-coherent-suite-task1-fix2.md and docs/superpowers/reviews/2026-11-13-coherent-suite-task1-fix1-review.md.
Latest SPEC/ruling56ae3fb5d8495ff196e3bf11ff9691116dd88574 docs/superpowers/specs/2026-11-13-coherent-suite-qualification-design.md (suite-vs-controls distinction included).
Full appended report Source715ac94e20126dc43846e3e77ac2045c68a9dd1a docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md:100977chars, old61240exactprefix, new39737 startingline515. Contains coverage correction, findings map, coveringcommands and actualoutputs.

## Commit sequence and independent evidence

FixBASE0ade3837c379eda3db5d327a2c8d8e1d06f5265a/tree7634f0eb/report7e92d4ef61240chars.
Previously reviewed implementation18183bd24aa3cbacb74119e54ef28d6671bd45d5.
Fixed inactive23bda9c98ebb9faa636c59d46b20ab40c50e38a9/tree29b02bf9/F767c3a7db105b4276a870ecebbdc71ba0e57a248d/304165B.
Single overlaya63e889951962c7591d91e5a9152887ac4273b2a/tree5a018318/F7a29777e3f9d19fa4ddbebf3bb047c99b7365b2d4.
Restoreced5946253825a97a04db21455cfc963a719a900 exactpreFix2tree7634f0eb, parenta63e.
Finalreport715ac94e20126dc43846e3e77ac2045c68a9dd1a/treec66911bd0bc2b229852b024dcb46cd28d6136b01/report6e1122942dcf1ee4c7b56f9bbe476fe7c7b960a1.

Root independently fetched candidate/overlay; recomputed fourbody hashes with builtincrypto, comparedexactoverlaybodies: adapter43451/a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3; controls43187/afe050bdb5a35a0c727a2b949fba4a58a7e222f4ef12c8e86756d0e24f21d6b0; verifier13786/c6fac92623809ee41b69ee77260b32d50c1149ba5716ca0a39b8b024d7dfb849; SAFEZIP13305/b36fixed; ZIP33380/4ff44fixed.

Onefix2run43404200555/attempt1 success, exact10terminal8disabledskip+2KEYLESSsuccess. Controls131814347825,verify131814422559. Current SAFE14025364645=1391B/SHA4919281bfe0287e4848c254162bf9fad82909b5b7f45a457b5a2151ee9fb944b,expiry2026-11-20T09:47:17Z. Result1666/f60f89c1916f42fc2d075635711c2d168887800b35c4862cc01b7bf554834cd0; manifest265/36d42052577bb7dcf0afcd3754247668f183a8ff016320cc3f9727788fb49871.
Root strictZIP/CRC/canonical/fullmanifest/context/pins/4hash/DTO PASSED6families;52closedphase records26start/pass pairs,0failed/open;110shell/63Node inspectiononly; ZIP16passed; actualreadbackverified/none/strict_current_safe_pair/producerpassed/acceptedtrue, digesttriplecurrent.SourceCodeNoPCexecution; actualNative/World/SDK/MF/realkey0.
Independent closedtree/ref/commit/reportprefix/main/62WF/fiveactive verified:3196all3195initialexact/F7f7a71/R1reportexact/main0c9/61240prefix/fiveactive0/closedcommit0runs. Source is closed, no additional run.

## Full scoped implementation delta18183→23bda

Root reconstructed context10 publictext diff and applied to full293584B prior candidate to reconstruct full304165B exactly. 11hunks/160added/47deleted; no truncatedpatch.

```diff
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -182,21 +182,21 @@
            for(const [job,cases]of Object.entries({positive_prepare:['P1'],positive_consume:['P1'],reduction_prepare:['D1','D2','D3','D4'],reduction_consume_a:['D1','D2'],readonly:['R1','R2','R3'],reduction_consume_b:['D3','D4']}))same(blocks[job].match(/^      FIXED_CASES: '([^']+)'$/m)?.[1],JSON.stringify(cases));
            const seal=fixedStep(blocks.contracts,'pure_seal'),upload=fixedStep(blocks.contracts,'upload');need(seal.start<upload.start);const full=seal.text+upload.text;same(Buffer.byteLength(full),19458);same(sha(full),'8b239b4a5e7e4d5f424fef645a464e006c039a47763224902c4221bba2666231');return true;
           }
           export function validatePublicationGates(text){
            const b=jobBlocks(text).reduction_consume_b,pair=fixedStep(b,'summary_pair'),upload=fixedStep(b,'summary_upload'),truth=fixedStep(b,'actual_outcome'),aggregate=fixedStep(b,'aggregate');
            same(pair.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'");
            same(upload.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled() && steps.summary_pair.outcome == 'success'");
            same(truth.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled()");
            need(pair.start<upload.start&&upload.start<truth.start);
            for(const statement of ["test '$"+"{{ steps.native.outcome }}' = success","test '$"+"{{ steps.aggregate.outcome }}' = success","test '$"+"{{ steps.own_verified.outcome }}' = success","test '$"+"{{ steps.summary_pair.outputs.status }}' = passed","test '$"+"{{ steps.summary_upload.outcome }}' = success"])need(truth.text.includes(statement));
-           need(pair.text.includes('A.projectSuiteOutcome('));need(!pair.text.includes('A.makeSuite('));
+           need(pair.text.includes('A.projectSuiteOutcome('));need(!pair.text.includes('A.makeSuite('));const load=pair.text.indexOf('await A.loadProjectionReceipts('),project=pair.text.indexOf('A.projectSuiteOutcome(');need(load>=0&&load<project);need(!pair.text.includes('readOptional('));
            same(aggregate.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled() && steps.suite_bootstrap.outcome == 'success' && steps.native.outcome == 'success'");
            const world=aggregate.text.indexOf("from './test/fixtures/finite-budget-world.mjs'");
            need(world>0);
            for(const id of ['peer_download',...PRIVATE_PEERS.map(x=>'peer_open_'+x.job)]){
             const check="test '$"+"{{ steps."+id+".outcome }}' = success";need(aggregate.text.indexOf(check)>=0&&aggregate.text.indexOf(check)<world);
            }
            return true;
           }
           export function validatePureBindingSteps(text){
            const blocks=jobBlocks(text);
@@ -293,24 +293,22 @@
           
           function validatePureReceipt(receipt){
            fields(receipt,['artifactId','zipSha256','manifestSha256','profiles','purePassed','beforeI0']);canonicalId(receipt.artifactId);hex(receipt.zipSha256);hex(receipt.manifestSha256);same(receipt.profiles,['positive','readonly','reduction_a']);same(receipt.purePassed,true);same(receipt.beforeI0,true);return receipt;
           }
           const fixedReceiptIO={write:(path,bytes,options)=>writeFile(path,bytes,options)};
           export async function finalizePureBinding(receipt,originalWork,io=fixedReceiptIO){
            requireKeyless();validatePureReceipt(receipt);need(typeof originalWork==='function');await originalWork();validatePureReceipt(receipt);
            await io.write(join(process.env.RUNNER_TEMP,'afw-native-private/pure-assignment.json'),JSON.stringify(receipt)+'\n',{flag:'wx',mode:0o600});return receipt;
           }
           export function projectSuiteOutcome({outcomes,receipts}){
-           fields(outcomes,['pureBinding','native','aggregate','ownMetadata','ownOpen','ownValidation']);
+           validateProjectionOutcomes(outcomes);
            fields(receipts,['pure','assignment','proof']);
-           const allowed=['success','failure','skipped','cancelled','not_observed'];
-           for(const value of Object.values(outcomes))need(allowed.includes(value));
            const observed=value=>value==='success'||value==='failure';
            const pure=outcomes.pureBinding==='success'&&receipts.pure!==null?validatePureReceipt(receipts.pure):null;
            if(pure===null)need(!observed(outcomes.native)&&!observed(outcomes.aggregate));
            const command=pure===null||!observed(outcomes.native)?'not_observed':outcomes.native==='success'?'passed':'failed';
            if(command!=='passed')need(!observed(outcomes.aggregate));
            const aggregate=command!=='passed'?'not_observed':outcomes.aggregate==='success'?'verified':outcomes.aggregate==='failure'?'unverified':'not_observed';
            let assignment=receipts.assignment;
            if(assignment!==null){
             fields(assignment,['id','zipSha256','kind']);canonicalId(assignment.id);hex(assignment.zipSha256);
             same(assignment.kind,command==='passed'&&aggregate==='verified'?'reduction-result-b':'consumer-failure');
@@ -324,20 +322,42 @@
            else if(pure===null)failure={stage:'pure',reason:'pure_unverified'};
            else if(command==='not_observed')failure={stage:'native_b',reason:'not_observed'};
            else if(aggregate==='not_observed')failure={stage:'aggregate',reason:'not_observed'};
            else if(aggregate==='unverified')failure={stage:'aggregate',reason:'evidence_unverified'};
            else if(assignment===null||outcomes.ownMetadata!=='success')failure={stage:'custody',reason:'assignment_unverified'};
            else if(outcomes.ownOpen!=='success')failure={stage:'custody',reason:'reopen_unverified'};
            else if(outcomes.ownValidation!=='success')failure={stage:'custody',reason:'proof_unverified'};
            else {need(receipts.proof!==null);proof=receipts.proof;}
            return makeSuite({context:CONTEXT,sourcePins:PINS,programHashes:PROGRAM_HASHES,command,aggregate,pure,custody,proof,failure});
           }
+          
+          function validateProjectionOutcomes(outcomes){
+           fields(outcomes,['pureBinding','native','aggregate','ownMetadata','ownOpen','ownValidation']);
+           const allowed=['success','failure','skipped','cancelled','not_observed'];
+           for(const value of Object.values(outcomes))need(allowed.includes(value));
+          }
+          const fixedProjectionIO={read:path=>readFile(path)};
+          function parseProjectionReceipt(value){
+           need(typeof value==='string'||Buffer.isBuffer(value));
+           const bytes=Buffer.isBuffer(value)?value:Buffer.from(value),text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
+           need(Buffer.from(text).equals(bytes));return JSON.parse(text);
+          }
+          export async function loadProjectionReceipts({outcomes,assignment},io=fixedProjectionIO){
+           requireKeyless();validateProjectionOutcomes(outcomes);
+           if(assignment!==null){
+            fields(assignment,['id','zipSha256','kind']);canonicalId(assignment.id);hex(assignment.zipSha256);need(['consumer-failure','reduction-result-b'].includes(assignment.kind));
+           }
+           let pure=null,proof=null;
+           if(outcomes.pureBinding==='success')pure=parseProjectionReceipt(await io.read(join(process.env.RUNNER_TEMP,'afw-native-private/pure-assignment.json')));
+           if(outcomes.ownValidation==='success'&&assignment?.kind==='reduction-result-b'&&outcomes.native==='success'&&outcomes.aggregate==='success')proof=parseProjectionReceipt(await io.read(join(process.env.RUNNER_TEMP,'afw-native-private/suite-proof.json')));
+           return {pure,assignment,proof};
+          }
           NODE_SUITE_ADAPTER
           cat >"$RUNNER_TEMP/afw-suite-controls.mjs" <<'NODE_SUITE_CONTROLS'
           import assert from 'node:assert/strict';
           import {readFile,mkdir,readdir} from 'node:fs/promises';
           import {spawnSync} from 'node:child_process';
           import * as A from './afw-suite-adapter.mjs';
           import {validatePair,verifyRoute,verifySeven,reconcileSuite,receiverControlsGuard} from './afw-suite-verifier.mjs';
           export const CONTROL_IDS=Object.freeze(['dag_peer_inventory','key_scope','fixed_case_counts','metadata_custody_binding','incomplete_or_contradictory','coherent_current_pair']);
           const clone=v=>structuredClone(v),reject=f=>assert.throws(f),H='a'.repeat(64),id=n=>String(100+n);
           function jobs(){return A.LEGACY.map((name,n)=>({id:100+n,name,status:n===6?'in_progress':'completed',conclusion:n===6?null:'success',started_at:new Date(1700000000000+n*10000).toISOString(),completed_at:n===6?null:new Date(1700000009000+n*10000).toISOString()}));}
@@ -381,22 +401,31 @@
            const re=new RegExp('^  '+job+':\\n','gm'),matches=[...text.matchAll(re)];assert.equal(matches.length,1);
            const begin=matches[0].index,next=/^  [a-z_]+:\n/gm;next.lastIndex=begin+matches[0][0].length;const end=next.exec(text)?.index??text.length;
            if(stepId===null)return {start:begin,end,text:text.slice(begin,end)};
            const block=text.slice(begin,end),parts=[...block.matchAll(/^      - /gm)],found=[];
            for(let n=0;n<parts.length;n++){const start=parts[n].index,finish=parts[n+1]?.index??block.length,s=block.slice(start,finish);if(new RegExp('^        id: '+stepId+'$','m').test(s))found.push({start:begin+start,end:begin+finish,text:s});}
            assert.equal(found.length,1);return found[0];
           }
           function mutateActual(text,job,stepId,from,to){
            const r=actualRegion(text,job,stepId);assert.notEqual(from,to);assert.equal(r.text.split(from).length-1,1);
            const changed=r.text.replace(from,to);assert.notEqual(changed,r.text);
-           const result=text.slice(0,r.start)+changed+text.slice(r.end),now=actualRegion(result,job,stepId);
-           assert.equal(result.slice(0,now.start),text.slice(0,r.start));assert.equal(result.slice(now.end),text.slice(r.end));assert.equal(now.text,changed);return result;
+           const result=text.slice(0,r.start)+changed+text.slice(r.end),newEnd=r.start+changed.length;
+           assert.equal(result.slice(0,r.start),text.slice(0,r.start));assert.equal(result.slice(newEnd),text.slice(r.end));assert.equal(result.slice(r.start,newEnd),changed);return result;
+          }
+          function expectMutationRejected(text,job,stepId,from,to,validator){
+           assert.equal(typeof validator,'function');
+           const changed=mutateActual(text,job,stepId,from,to);
+           let invocations=0;
+           const invoke=value=>{invocations++;return validator(value);};
+           assert.throws(()=>invoke(changed));
+           assert.equal(invocations,1);
+           return {changed,invocations};
           }
           function completeNeeds(g=golden()){
            return Object.fromEntries(A.LEGACY.map(name=>[name,{result:'success',outputs:name==='contracts'?{'artifact-id':g.pure.artifactId,'artifact-digest':g.pure.zipSha256,'manifest-sha256':g.pure.manifestSha256}:(()=>{const a=name==='reduction_consume_b'?{artifactId:g.custody.artifact.id,zipSha256:g.custody.artifact.zipSha256,kind:g.custody.artifact.kind}:g.proof.peerArtifacts.find(x=>x.job===name);return {'artifact-id':a.artifactId,'artifact-digest':a.zipSha256,kind:a.kind};})()}]));
           }
           function finalJobs(){
            const terminal=jobs().map(x=>({...x,status:'completed',conclusion:'success',completed_at:new Date(1700000070000).toISOString()}));
            return {total_count:8,jobs:[...terminal,{id:999,name:'verify',status:'in_progress',conclusion:null,started_at:new Date(1700000071000).toISOString(),completed_at:null}]};
           }
           function actualOutcomes(overrides={}){return {pureBinding:'success',native:'success',aggregate:'success',ownMetadata:'success',ownOpen:'success',ownValidation:'success',...overrides};}
           function actualReceipts(g=golden()){return {pure:g.pure,assignment:g.custody.artifact,proof:g.proof};}
@@ -407,67 +436,100 @@
           function routeFixture(result,kind='suite',needs=completeNeeds()){
            const bytes=A.canonical(result),files=new Map([['result.json',bytes],['manifest.json',A.canonical(A.makeManifest(kind,bytes,A.CONTEXT))]]),zip=fixtureZip(files),digest=A.sha(zip),safeMeta=meta(kind,kind,'777',digest);safeMeta.size_in_bytes=zip.length;
            const calls=[],io={
             metadata:async artifactId=>{calls.push(artifactId);if(artifactId==='777')return {status:200,value:safeMeta};for(const job of A.LEGACY){const o=needs[job].outputs;if(o['artifact-id']===artifactId)return {status:200,value:meta(job,job==='contracts'?'pure':o.kind,artifactId,o['artifact-digest'])};}return {status:404,value:null};},
             zip:async()=>zip,
             source:async()=>({object:{sha:A.CONTEXT.source}}),
             jobs:async path=>{assert.equal(path,'/actions/runs/'+A.CONTEXT.run+'/attempts/1/jobs?per_page=100');return finalJobs();}
            };
            return {args:{kind,id:'777',uploaded:digest,expected:{context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES}},io,calls,files,safeMeta,needs};
           }
+          async function unavailableSuiteCase({id,uploaded,reason,artifactId,metadataStatus=null}){
+           const fixture=routeFixture(golden()),counts={safeMetadata:0,safeZip:0,jobs:0,direct:[]};
+           const io={
+            ...fixture.io,
+            metadata:async currentId=>{
+             if(currentId==='777'){counts.safeMetadata++;if(metadataStatus!==null)return {status:metadataStatus,value:null};}
+             else counts.direct.push(currentId);
+             return fixture.io.metadata(currentId);
+            },
+            zip:async()=>{counts.safeZip++;throw Error('safe_zip_forbidden_in_unavailable_fixture');},
+            jobs:async path=>{counts.jobs++;return fixture.io.jobs(path);}
+           };
+           const args={...fixture.args,id,uploaded},route=await verifyRoute(args,io);
+           assert.equal(route.valid,null);assert.equal(route.readback.status,'unavailable');assert.equal(route.readback.reason,reason);assert.equal(route.readback.proof,'absent');assert.equal(route.readback.artifactId,artifactId);
+           assert.equal(counts.safeMetadata,metadataStatus===null?0:1);assert.equal(counts.safeZip,0);assert.equal(counts.jobs,0);assert.deepEqual(counts.direct,[]);
+           const reconciled=await reconcileSuite({route,jobInventory:null,needs:fixture.needs},io);
+           assert.equal(reconciled.valid,null);assert.deepEqual(reconciled.readback,{...route.readback,upstream:'all_seven_success',accepted:false});
+           assert.equal(counts.jobs,1);assert.equal(counts.safeMetadata,metadataStatus===null?0:1);assert.equal(counts.safeZip,0);
+           assert.deepEqual(counts.direct.sort(),A.LEGACY.map(name=>fixture.needs[name].outputs['artifact-id']).sort());
+           for(const key of ['rawZipBytes','rawZipSha256','resultBytes','resultSha256','manifestBytes','manifestSha256'])assert.equal(reconciled.readback[key],null);
+          }
           export async function runControls(){
            const inventory=CONTROL_IDS.map(id=>({id,status:'not_executed'})),expected={context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES};
            let firstFailure=null,currentFamily=null;
            const sub=async(id,fn)=>{
             console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'start',...A.FLAGS}));
             try{await fn();console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'passed',...A.FLAGS}));}
             catch{console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'failed',...A.FLAGS}));throw Error('fixed_subcase_failed');}
            };
            const cases=[
            async()=>{
             await sub('b_inventory_optional_nonexecuting_receiver',async()=>{
              const j=jobs(),at=1700000070000;assert.equal(A.validatePeerInventory({total_count:7,jobs:j},at).observedNativeJobPeak,1);
              for(const status of ['pending','queued','waiting','requested'])A.validatePeerInventory({total_count:8,jobs:[...j,{id:999,name:'verify',status,conclusion:null}]},at);
              const three=clone(j);three[0].completed_at=new Date(1700000069000).toISOString();
              for(const n of [1,2,3]){three[n].started_at=new Date(1700000010000).toISOString();three[n].completed_at=new Date(1700000040000).toISOString();}
              assert.equal(A.validatePeerInventory({total_count:7,jobs:three},at).observedNativeJobPeak,3);
              const four=clone(three);four[4].started_at=new Date(1700000020000).toISOString();reject(()=>A.validatePeerInventory({total_count:7,jobs:four},at));
              for(const list of [j.slice(1),[...j,j[0]],[...j,{id:999,name:'extra',status:'queued'}],[...j,{id:999,name:'verify',status:'in_progress',conclusion:null}]])reject(()=>A.validatePeerInventory({total_count:list.length,jobs:list},at));
              const bad=clone(j);bad[1].started_at='invalid';reject(()=>A.validatePeerInventory({total_count:7,jobs:bad},at));
             });
+            await sub('mutation_setup_failure_cannot_count_as_validator_rejection',async()=>{
+             const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');
+             for(const [job,stepId,from,to]of [['missing_actual_job',null,'x','y'],['reduction_consume_b',null,'          NODE\n','          CHANGED\n']]){
+              let invoked=0,setupFailed=false;
+              const validator=changed=>{invoked++;return A.validateWorkflow(changed);};
+              try{expectMutationRejected(text,job,stepId,from,to,validator);}catch{setupFailed=true;}
+              assert.equal(setupFailed,true);assert.equal(invoked,0);
+             }
+             const renamed=expectMutationRejected(text,'positive_prepare','custody','        id: custody','        id: renamed_custody',A.validateKeyScopes);
+             assert.equal(renamed.invocations,1);
+             assert(renamed.changed.includes('        id: renamed_custody\n'));
+            });
             await sub('actual_b_dependency_and_attempt_endpoint_targets',async()=>{
              const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateWorkflow(text);
-             reject(()=>A.validateWorkflow(mutateActual(text,'reduction_consume_b',null,'    needs: [contracts, readonly, reduction_prepare]','    needs: [contracts, readonly, reduction_prepare, reduction_consume_a]')));
-             reject(()=>A.validateWorkflow(mutateActual(text,'reduction_consume_b','peer_download',"/attempts/1/jobs?per_page=100","/jobs?per_page=100")));
+             expectMutationRejected(text,'reduction_consume_b',null,'    needs: [contracts, readonly, reduction_prepare]','    needs: [contracts, readonly, reduction_prepare, reduction_consume_a]',A.validateWorkflow);
+             expectMutationRejected(text,'reduction_consume_b','peer_download',"/attempts/1/jobs?per_page=100","/jobs?per_page=100",A.validateWorkflow);
             });
            },
            async()=>{
             await sub('all_twenty_six_exact_crypto_step_bindings',async()=>{
              const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateKeyScopes(text);
-             reject(()=>A.validateKeyScopes(mutateActual(text,'positive_prepare',null,'    environment: afw-finite-syn-checkpoint','    environment: changed')));
-             reject(()=>A.validateKeyScopes(mutateActual(text,'positive_prepare','custody','        id: custody','        id: install_key_leak')));
-             reject(()=>A.validateKeyScopes(mutateActual(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive','      AFW_SYN_CHECKPOINT_KEY: exposed\n      AFW_BUDGET_GROUP: positive')));
-             reject(()=>A.validateKeyScopes(mutateActual(text,'verify','suite_bootstrap','        shell: bash','        env:\n          AFW_SYN_CHECKPOINT_KEY: exposed\n        shell: bash')));
+             expectMutationRejected(text,'positive_prepare',null,'    environment: afw-finite-syn-checkpoint','    environment: changed',A.validateKeyScopes);
+             expectMutationRejected(text,'positive_prepare','custody','        id: custody','        id: install_key_leak',A.validateKeyScopes);
+             expectMutationRejected(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive','      AFW_SYN_CHECKPOINT_KEY: exposed\n      AFW_BUDGET_GROUP: positive',A.validateKeyScopes);
+             expectMutationRejected(text,'verify','suite_bootstrap','        shell: bash','        env:\n          AFW_SYN_CHECKPOINT_KEY: exposed\n        shell: bash',A.validateKeyScopes);
             });
             await sub('inert_parent_environment_is_restored',async()=>{
              const before=process.env.AFW_SYN_CHECKPOINT_KEY;
              try{process.env.AFW_SYN_CHECKPOINT_KEY='INERT_SCOPE';reject(()=>A.requireKeyless());}
              finally{if(before===undefined)delete process.env.AFW_SYN_CHECKPOINT_KEY;else process.env.AFW_SYN_CHECKPOINT_KEY=before;}
              A.requireKeyless();
             });
            },
            async()=>{
             await sub('fixed_pins_native_tap_cases_and_complete_f8_action',async()=>{
              await A.validateSourcePins();const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateFixedCases(text);
-             reject(()=>A.validateFixedCases(mutateActual(text,'readonly','native','AFW_EXPECTED_CASES=3','AFW_EXPECTED_CASES=4')));
-             reject(()=>A.validateFixedCases(mutateActual(text,'reduction_consume_b',null,"      FIXED_CASES: '[\"D3\",\"D4\"]'","      FIXED_CASES: '[\"D3\"]'")));
-             for(const [from,to]of [['uses: actions/upload-artifact@v4','uses: actions/upload-artifact@v3'],['retention-days: 7','retention-days: 1'],['if-no-files-found: error','if-no-files-found: warn'],['name: finite-budget-fixed-preparation-','name: changed-'],['path: $'+'{{ runner.temp }}/afw-pure-public/','path: $'+'{{ runner.temp }}/changed/']])reject(()=>A.validateFixedCases(mutateActual(text,'contracts','upload',from,to)));
+             expectMutationRejected(text,'readonly','native','AFW_EXPECTED_CASES=3','AFW_EXPECTED_CASES=4',A.validateFixedCases);
+             expectMutationRejected(text,'reduction_consume_b',null,"      FIXED_CASES: '[\"D3\",\"D4\"]'","      FIXED_CASES: '[\"D3\"]'",A.validateFixedCases);
+             for(const [from,to]of [['uses: actions/upload-artifact@v4','uses: actions/upload-artifact@v3'],['retention-days: 7','retention-days: 1'],['if-no-files-found: error','if-no-files-found: warn'],['name: finite-budget-fixed-preparation-','name: changed-'],['path: $'+'{{ runner.temp }}/afw-pure-public/','path: $'+'{{ runner.temp }}/changed/']])expectMutationRejected(text,'contracts','upload',from,to,A.validateFixedCases);
             });
             await sub('private_original_clocks_and_owned_case_identities',async()=>{
              const good=A.validateReopenedSuite(proofInput());assert.equal(good.observedNativeJobPeak,1);
              for(const mutate of [p=>p.lineages[0].C0++,p=>p.lineages[0].C1++,p=>p.occurrenceProof[0].caseName='positive',p=>p.occurrenceProof[1].caseName='reduction',p=>p.observedNativeJobPeak=2,p=>p.observedAt=1700000050000,p=>p.observedAt=1700000090000,p=>p.jobs[1].completedAt=new Date(1700000075000).toISOString(),p=>p.jobs[0].completedAt=new Date(1700000075000).toISOString(),p=>p.consumerOverlap.bStart=900000,p=>p.lineages[0].graphs.pop()]){
               const p=privateProof();mutate(p);reject(()=>A.validateReopenedSuite(proofInput(p)));
              }
             });
             await sub('all_rewritten_shell_and_node_bodies_compile_only',async()=>syntaxControls(await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8')));
            },
            async()=>{
@@ -496,43 +558,84 @@
            async()=>{
             await sub('pure_receipt_commits_after_original_stage_success_only',async()=>{
              const p=pureFixture(),receipt=A.bindPure({files:p.files,metadata:meta('contracts','pure','123',H),rawZipSha256:H},p.assignment,p.manifestSha256),writes=[];
              const io={write:async(...args)=>writes.push(args)};
              await assert.rejects(()=>A.finalizePureBinding(receipt,async()=>{throw Error('inert_original_stage_failure');},io));assert.equal(writes.length,0);
              await A.finalizePureBinding(receipt,async()=>{},io);assert.equal(writes.length,1);assert.equal(writes[0][0],process.env.RUNNER_TEMP+'/afw-native-private/pure-assignment.json');assert.equal(writes[0][1],JSON.stringify(receipt)+'\n');assert.deepEqual(writes[0][2],{flag:'wx',mode:0o600});
              const leftover=actualReceipts(),o=actualOutcomes({pureBinding:'failure',native:'skipped',aggregate:'skipped',ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'});leftover.assignment=null;leftover.proof=null;
              const unavailable=A.projectSuiteOutcome({outcomes:o,receipts:leftover});assert.equal(unavailable.pure,null);assert.deepEqual(unavailable.failure,{stage:'pure',reason:'pure_unverified'});
              reject(()=>A.projectSuiteOutcome({outcomes:{...o,native:'success'},receipts:leftover}));
             });
+            await sub('eligible_projection_receipts_load_and_parse_failures',async()=>{
+             const g=golden(),outcomes=actualOutcomes(),assignment=g.custody.artifact,purePath=process.env.RUNNER_TEMP+'/afw-native-private/pure-assignment.json',proofPath=process.env.RUNNER_TEMP+'/afw-native-private/suite-proof.json',reads=[];
+             const io={read:async path=>{reads.push(path);assert([purePath,proofPath].includes(path));return Buffer.from(JSON.stringify(path===purePath?g.pure:g.proof));}};
+             const receipts=await A.loadProjectionReceipts({outcomes,assignment},io);
+             assert.deepEqual(reads,[purePath,proofPath]);assert.equal(receipts.assignment,assignment);assert.equal(A.projectSuiteOutcome({outcomes,receipts}).status,'passed');
+             for(const brokenPath of [purePath,proofPath]){
+              const observed=[],brokenIO={read:async path=>{observed.push(path);assert([purePath,proofPath].includes(path));return path===brokenPath?'{':JSON.stringify(path===purePath?g.pure:g.proof);}};
+              await assert.rejects(()=>A.loadProjectionReceipts({outcomes,assignment},brokenIO));
+              assert.deepEqual(observed,brokenPath===purePath?[purePath]:[purePath,proofPath]);
+             }
+            });
+            await sub('failed_pure_receipt_write_is_not_read_and_retains_assignment',async()=>{
+             for(const mode of ['truncated','unreadable']){
+              const outcomes=actualOutcomes({pureBinding:'failure',native:'skipped',aggregate:'skipped',ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'}),assignment={id:'222',zipSha256:H,kind:'consumer-failure'},reads=[];
+              const io={read:async path=>{reads.push(path);if(mode==='unreadable')throw Error('inert_unreadable_receipt');return '{';}};
+              const receipts=await A.loadProjectionReceipts({outcomes,assignment},io),result=A.projectSuiteOutcome({outcomes,receipts});
+              assert.deepEqual(reads,[]);assert.equal(receipts.pure,null);assert.equal(receipts.proof,null);assert.equal(receipts.assignment,assignment);
+              assert.equal(result.pure,null);assert.deepEqual(result.failure,{stage:'pure',reason:'pure_unverified'});assert.equal(result.custody.artifact.id,'222');assert.equal(result.custody.artifact.zipSha256,H);
+             }
+            });
+            await sub('failed_proof_receipt_write_is_not_read_after_open',async()=>{
+             const g=golden(),purePath=process.env.RUNNER_TEMP+'/afw-native-private/pure-assignment.json',proofPath=process.env.RUNNER_TEMP+'/afw-native-private/suite-proof.json';
+             for(const mode of ['truncated','unreadable']){
+              const outcomes=actualOutcomes({ownValidation:'failure'}),assignment=g.custody.artifact,reads=[];
+              const io={read:async path=>{reads.push(path);if(path===purePath)return JSON.stringify(g.pure);assert.equal(path,proofPath);if(mode==='unreadable')throw Error('inert_unreadable_receipt');return '{';}};
+              const receipts=await A.loadProjectionReceipts({outcomes,assignment},io),result=A.projectSuiteOutcome({outcomes,receipts});
+              assert.deepEqual(reads,[purePath]);assert.equal(receipts.proof,null);assert.equal(receipts.assignment,assignment);
+              assert.deepEqual(result.failure,{stage:'custody',reason:'proof_unverified'});assert.equal(result.custody.state,'assigned');assert.equal(result.custody.artifact.id,'222');assert.equal(result.custody.artifact.zipSha256,H);
+             }
+            });
             await sub('shared_projection_observed_failures_and_retained_assignment',async()=>{
              const g=golden();assert.equal(A.projectSuiteOutcome({outcomes:actualOutcomes(),receipts:actualReceipts(g)}).status,'passed');
              for(const [field,reason]of [['ownMetadata','assignment_unverified'],['ownOpen','reopen_unverified'],['ownValidation','proof_unverified']]){
               const outcomes=actualOutcomes(),receipts=actualReceipts();outcomes[field]='failure';if(field==='ownMetadata'){outcomes.ownOpen='skipped';outcomes.ownValidation='skipped';}if(field==='ownOpen')outcomes.ownValidation='skipped';receipts.proof=null;
               const r=A.projectSuiteOutcome({outcomes,receipts});assert.equal(r.custody.artifact.id,'222');assert.equal(r.custody.state,'assigned');assert.equal(r.failure.reason,reason);
              }
              for(const native of ['skipped','cancelled','not_observed']){
               const receipts=actualReceipts();receipts.assignment.kind='consumer-failure';receipts.proof=null;
               const value=A.projectSuiteOutcome({outcomes:actualOutcomes({native,aggregate:'skipped',ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'}),receipts});assert.equal(value.command,'not_observed');assert.equal(value.aggregate,'not_observed');assert.equal(value.failure.reason,'not_observed');
              }
              for(const [aggregate,reason]of [['skipped','not_observed'],['failure','evidence_unverified']]){
               const receipts=actualReceipts();receipts.assignment.kind='consumer-failure';receipts.proof=null;
               const r=A.projectSuiteOutcome({outcomes:actualOutcomes({aggregate,ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'}),receipts});assert.equal(r.command,'passed');assert.equal(r.aggregate,aggregate==='failure'?'unverified':'not_observed');assert.equal(r.failure.reason,reason);assert.equal(r.custody.artifact.id,'222');
              }
              const receipts=actualReceipts();receipts.assignment.kind='consumer-failure';receipts.proof=null;const failed=A.projectSuiteOutcome({outcomes:actualOutcomes({native:'failure',aggregate:'skipped',ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'}),receipts});assert.equal(failed.status,'failed');assert.equal(failed.failure.reason,'command_failed');
              reject(()=>A.projectSuiteOutcome({outcomes:actualOutcomes({native:'skipped'}),receipts:actualReceipts()}));
             });
+            await sub('failure_kind_proof_remains_ineligible_after_validation',async()=>{
+             const g=golden(),purePath=process.env.RUNNER_TEMP+'/afw-native-private/pure-assignment.json';
+             for(const outcomes of [actualOutcomes({native:'failure',aggregate:'skipped'}),actualOutcomes({aggregate:'failure'})]){
+              const assignment={id:'222',zipSha256:H,kind:'consumer-failure'},reads=[];
+              const io={read:async path=>{reads.push(path);assert.equal(path,purePath);return JSON.stringify(g.pure);}};
+              const receipts=await A.loadProjectionReceipts({outcomes,assignment},io),result=A.projectSuiteOutcome({outcomes,receipts});
+              assert.deepEqual(reads,[purePath]);assert.equal(receipts.proof,null);assert.equal(result.proof,null);assert.equal(result.custody.artifact.id,'222');assert.equal(result.custody.artifact.kind,'consumer-failure');
+              assert.equal(result.status,outcomes.native==='failure'?'failed':'unavailable');
+             }
+            });
             await sub('actual_publication_guards_order_and_full_pure_gate',async()=>{
              const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validatePublicationGates(text);A.validatePureBindingSteps(text);
-             reject(()=>A.validatePublicationGates(mutateActual(text,'reduction_consume_b','summary_pair',"if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'","if: steps.aggregate.outcome == 'success'")));
-             reject(()=>A.validatePublicationGates(mutateActual(text,'reduction_consume_b','summary_upload',"steps.summary_pair.outcome == 'success'","steps.native.outcome == 'success'")));
-             reject(()=>A.validatePublicationGates(mutateActual(text,'reduction_consume_b','actual_outcome',"test '$"+"{{ steps.summary_pair.outputs.status }}' = passed","test true")));
-             reject(()=>A.validatePureBindingSteps(mutateActual(text,'reduction_consume_b','summary_pair',"PURE_BINDING_OUTCOME: $"+"{{ steps.pure_binding.outcome }}","PURE_BINDING_OUTCOME: success")));
+             expectMutationRejected(text,'reduction_consume_b','summary_pair',"if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'","if: steps.aggregate.outcome == 'success'",A.validatePublicationGates);
+             expectMutationRejected(text,'reduction_consume_b','summary_upload',"steps.summary_pair.outcome == 'success'","steps.native.outcome == 'success'",A.validatePublicationGates);
+             expectMutationRejected(text,'reduction_consume_b','actual_outcome',"test '$"+"{{ steps.summary_pair.outputs.status }}' = passed","test true",A.validatePublicationGates);
+             expectMutationRejected(text,'reduction_consume_b','summary_pair',"PURE_BINDING_OUTCOME: $"+"{{ steps.pure_binding.outcome }}","PURE_BINDING_OUTCOME: success",A.validatePureBindingSteps);
+             expectMutationRejected(text,'reduction_consume_b','summary_pair','await A.loadProjectionReceipts({outcomes,assignment})','await A.missingLoader({outcomes,assignment})',A.validatePublicationGates);
             });
             await sub('valid_failed_pair_and_receiver_self_control_failure_record',async()=>{
              const r={purpose:'afw.coherent-suite.controls.safe.v1',...expected,status:'failed',expected:6,completed:1,passed:0,failed:1,inventory:A.IDS.map((id,n)=>({id,status:n?'not_executed':'failed'})),firstFailure:A.IDS[0],realCustodyKeyBound:false,NativeExecuted:false,SDKImported:false,MFAllocated:false,...A.FLAGS},f=routeFixture(r,'controls'),route=await verifyRoute(f.args,f.io),closed=await reconcileSuite({route,jobInventory:null,needs:{keyless_controls:{result:'failure',outputs:{'safe-id':'777','safe-digest':f.args.uploaded}}}},f.io);
              assert.equal(closed.readback.status,'verified');assert.equal(closed.readback.reason,'none');assert.equal(closed.readback.proof,'strict_current_safe_pair');assert.equal(closed.readback.accepted,false);
              const guarded=await receiverControlsGuard(f.args,async()=>{throw Error('inert_self_control_failure');});
              assert.equal(guarded.passed,false);assert.equal(guarded.failure.artifactId,'777');assert.equal(guarded.failure.uploadedDigest,f.args.uploaded);assert.equal(guarded.failure.status,'unavailable');assert.equal(guarded.failure.reason,'invalid_evidence');assert.equal(guarded.failure.proof,'absent');assert.equal(guarded.failure.rawZipSha256,null);assert.equal(guarded.failure.accepted,false);assert(Buffer.byteLength(JSON.stringify(guarded.failure)+'\n')<=4096);
             });
            },
            async()=>{
             await sub('same_full_suite_route_projection_and_final_reconciliation',async()=>{
@@ -543,20 +646,30 @@
               const j=finalJobs();mutate(j);const rejected=await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:f.needs},f.io);assert.equal(rejected.readback.accepted,false);assert.equal(rejected.readback.upstream,'unverified');assert.equal(rejected.readback.reason,'none');
              }
             });
             await sub('nonpass_reconciles_all_available_assignments',async()=>{
              const g=golden(),needs=completeNeeds(g),receipts=actualReceipts(g);receipts.assignment.kind='consumer-failure';receipts.proof=null;needs.reduction_consume_b.result='failure';needs.reduction_consume_b.outputs.kind='consumer-failure';
              const suite=A.projectSuiteOutcome({outcomes:actualOutcomes({native:'failure',aggregate:'skipped',ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'}),receipts}),f=routeFixture(suite,'suite',needs),j=finalJobs();j.jobs.find(x=>x.name==='reduction_consume_b').conclusion='failure';
              const route=await verifyRoute(f.args,f.io),closed=await reconcileSuite({route,jobInventory:j,needs},f.io);
              assert.equal(closed.readback.accepted,false);assert.equal(closed.readback.upstream,'not_all_seven_success');assert.equal(closed.readback.reason,'none');assert.deepEqual(f.calls.slice(1).sort(),A.LEGACY.map(n=>needs[n].outputs['artifact-id']).sort());
              const noOutputs=clone(needs);noOutputs.positive_consume.outputs={};const missing=await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:noOutputs},f.io);assert.equal(missing.readback.accepted,false);
             });
+            await sub('missing_safe_observes_attempt1_jobs_and_all_direct_metadata',async()=>{
+             await unavailableSuiteCase({id:'',uploaded:'',reason:'publication_unavailable',artifactId:null});
+            });
+            await sub('id_only_safe_retains_id_without_safe_traffic',async()=>{
+             await unavailableSuiteCase({id:'777',uploaded:'',reason:'invalid_evidence',artifactId:'777'});
+            });
+            await sub('other_malformed_partial_and_http_safe_routes_reconcile',async()=>{
+             for(const fields of [{id:'',uploaded:H,artifactId:null},{id:'malformed',uploaded:H,artifactId:null},{id:'777',uploaded:'malformed',artifactId:'777'}])await unavailableSuiteCase({...fields,reason:'invalid_evidence'});
+             for(const metadataStatus of [404,403,500])await unavailableSuiteCase({id:'777',uploaded:H,reason:metadataStatus===404?'publication_unavailable':'invalid_evidence',artifactId:'777',metadataStatus});
+            });
             await sub('final_current_metadata_source_run_and_direct_needs_edges',async()=>{
              const g=golden(),f=routeFixture(g),j=finalJobs();
              for(const field of ['head_sha','id','head_branch']){
               const badIO={...f.io,metadata:async artifactId=>{const r=await f.io.metadata(artifactId);if(artifactId!=='777'){r.value.workflow_run[field]=field==='id'?1:field==='head_sha'?'b'.repeat(40):'main';}return r;}};
               const closed=await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:f.needs},badIO);assert.equal(closed.readback.accepted,false);assert.equal(closed.readback.upstream,'unverified');assert.equal(closed.readback.reason,'none');
              }
              const stale={...f.io,source:async()=>({object:{sha:'b'.repeat(40)}})};assert.equal((await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:f.needs},stale)).readback.upstream,'unverified');
              const changed=clone(f.needs);changed.positive_consume.outputs['artifact-digest']='b'.repeat(64);assert.equal((await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:changed},f.io)).readback.accepted,false);
              const wrongAttempt=clone(g);wrongAttempt.context.attempt=2;reject(()=>A.validateSuite(wrongAttempt,expected));
              for(const status of [404,403,500]){const r=await verifyRoute(f.args,{metadata:async()=>({status,value:null})});assert.equal(r.readback.artifactId,'777');assert.equal(r.readback.reason,status===404?'publication_unavailable':'invalid_evidence');assert.equal(r.readback.proof,'absent');}
@@ -626,27 +739,27 @@
           export function verifySeven(jobInventory,needs,result){
            A.same(jobInventory.total_count,8);A.same(jobInventory.jobs.length,8);
            const names=jobInventory.jobs.map(x=>x.name);A.same(new Set(names).size,8);
            A.same(new Set(jobInventory.jobs.map(x=>A.canonicalId(String(x.id)))).size,8);A.same(names.slice().sort(),[...A.LEGACY,'verify'].sort());
            const receiver=jobInventory.jobs.find(x=>x.name==='verify');A.same(receiver.status,'in_progress');A.same(receiver.conclusion,null);
            A.fields(needs,A.LEGACY);
            const legacy=A.LEGACY.map(name=>jobInventory.jobs.find(x=>x.name===name));
            for(const job of legacy){A.need(['success','failure','skipped','cancelled'].includes(needs[job.name]?.result));if(job.status==='completed'&&['success','failure','skipped','cancelled'].includes(job.conclusion))A.same(needs[job.name].result,job.conclusion);}
            const sevenTerminal=legacy.every(x=>x.status==='completed');
            const sevenSuccess=sevenTerminal&&legacy.every(x=>x.conclusion==='success'&&needs[x.name].result==='success');
-           if(result.proof)for(const j of [...result.proof.peerJobs,result.proof.selfJob])A.same(String(legacy.find(x=>x.name===j.name).id),j.jobId);
-           return {accepted:result.status==='passed'&&sevenSuccess,sevenTerminal,sevenSuccess};
+           if(result?.proof)for(const j of [...result.proof.peerJobs,result.proof.selfJob])A.same(String(legacy.find(x=>x.name===j.name).id),j.jobId);
+           return {accepted:result?.status==='passed'&&sevenSuccess,sevenTerminal,sevenSuccess};
           }
           function directAssignments(needs){
            const complete=[],byJob=new Map();let allComplete=true;
            for(const job of A.LEGACY){
-            const outputs=needs[job]?.outputs??{},id=outputs['artifact-id']??'',digest=outputs['artifact-digest']??'',kind=job==='contracts'?'pure':outputs.kind??'';
+            const outputs=needs?.[job]?.outputs??{},id=outputs['artifact-id']??'',digest=outputs['artifact-digest']??'',kind=job==='contracts'?'pure':outputs.kind??'';
             try{
              A.canonicalId(id);A.hex(digest);
              if(job==='contracts'){try{A.hex(outputs['manifest-sha256']);}catch{allComplete=false;}}
              else {
               const expected=job==='reduction_consume_b'?'reduction-result-b':A.PRIVATE_PEERS.find(x=>x.job===job).kind;
               const failure=['positive_prepare','reduction_prepare'].includes(job)?'producer-failure':'consumer-failure';
               A.need(kind===expected||kind===failure);
              }
              const assignment={job,kind,id,zipSha256:digest};complete.push(assignment);byJob.set(job,{...assignment,manifestSha256:outputs['manifest-sha256']??null});
             }catch{allComplete=false;}
@@ -656,42 +769,43 @@
           function publicRefsAligned(result,byJob){
            const refs=[];
            if(result.pure)refs.push({job:'contracts',id:result.pure.artifactId,zipSha256:result.pure.zipSha256,manifestSha256:result.pure.manifestSha256});
            if(result.proof)refs.push(...result.proof.peerArtifacts.map(x=>({job:x.job,id:x.artifactId,zipSha256:x.zipSha256,kind:x.kind})));
            if(result.custody.artifact)refs.push({job:'reduction_consume_b',...result.custody.artifact});
            let aligned=true;
            for(const ref of refs){const assigned=byJob.get(ref.job);if(!assigned||assigned.id!==ref.id||assigned.zipSha256!==ref.zipSha256||ref.job==='contracts'&&assigned.manifestSha256!==ref.manifestSha256||ref.job!=='contracts'&&assigned.kind!==ref.kind)aligned=false;}
            return aligned;
           }
           export async function reconcileSuite({route,jobInventory,needs},io=fixedGitHubIO){
-           const readback={...route.readback},valid=route.valid;
-           if(valid===null)return {readback,valid};
-           readback.accepted=false;
-           try{
-            const ref=await io.source(SOURCE_PATH);A.same(ref.object.sha,A.CONTEXT.source);
-            if(readback.kind==='controls'){
+           const readback={...route.readback},valid=route.valid;readback.accepted=false;
+           if(readback.kind==='controls'){
+            if(valid===null)return {readback,valid};
+            try{
+             const ref=await io.source(SOURCE_PATH);A.same(ref.object.sha,A.CONTEXT.source);
              const upstream=needs.keyless_controls;
              A.need(upstream&&upstream.outputs);A.same(upstream.outputs['safe-id'],readback.artifactId);A.same(upstream.outputs['safe-digest'],readback.uploadedDigest);
-             readback.accepted=valid.status==='passed'&&upstream.result==='success';return {readback,valid};
-            }
-            let observation=null;
-            try{const jobs=jobInventory??await io.jobs(JOBS_PATH);observation=verifySeven(jobs,needs,valid);}catch{}
-            readback.upstream=observation?.sevenTerminal?(observation.sevenSuccess?'all_seven_success':'not_all_seven_success'):'unverified';
-            const assignments=directAssignments(needs);let metadataAligned=true;
-            for(const assignment of assignments.complete){
-             try{const response=await io.metadata(assignment.id);A.same(response.status,200);A.validateAssignedMetadata(response.value,assignment,assignment.job==='contracts'?'pure':'generic-private');}
-             catch{metadataAligned=false;}
-            }
-            const aligned=publicRefsAligned(valid,assignments.byJob);
-            if(observation?.sevenSuccess&&(!assignments.allComplete||!metadataAligned||!aligned))readback.upstream='unverified';
-            readback.accepted=valid.status==='passed'&&observation?.accepted===true&&assignments.allComplete&&metadataAligned&&aligned;
-           }catch{readback.accepted=false;if(readback.kind==='suite')readback.upstream='unverified';}
+             readback.accepted=valid.status==='passed'&&upstream.result==='success';
+            }catch{readback.accepted=false;}
+            return {readback,valid};
+           }
+           let sourceAligned=false,observation=null;
+           try{const ref=await io.source(SOURCE_PATH);A.same(ref.object.sha,A.CONTEXT.source);sourceAligned=true;}catch{}
+           try{const jobs=jobInventory??await io.jobs(JOBS_PATH);observation=verifySeven(jobs,needs,valid);}catch{}
+           const assignments=directAssignments(needs);let metadataAligned=true;
+           for(const assignment of assignments.complete){
+            try{const response=await io.metadata(assignment.id);A.same(response.status,200);A.validateAssignedMetadata(response.value,assignment,assignment.job==='contracts'?'pure':'generic-private');}
+            catch{metadataAligned=false;}
+           }
+           const aligned=valid===null?true:publicRefsAligned(valid,assignments.byJob);
+           readback.upstream=observation?.sevenTerminal?(observation.sevenSuccess?'all_seven_success':'not_all_seven_success'):'unverified';
+           if(!sourceAligned||observation?.sevenSuccess&&(!assignments.allComplete||!metadataAligned||!aligned))readback.upstream='unverified';
+           readback.accepted=valid?.status==='passed'&&sourceAligned&&observation?.accepted===true&&assignments.allComplete&&metadataAligned&&aligned;
            return {readback,valid};
           }
           function fixtureZip(files){
            const crc=b=>{let c=0xffffffff;for(const v of b){c^=v;for(let n=0;n<8;n++)c=c&1?0xedb88320^(c>>>1):c>>>1;}return (c^0xffffffff)>>>0;},local=[],central=[];let offset=0;
            for(const [name,data]of files){const n=Buffer.from(name),l=Buffer.alloc(30),c=Buffer.alloc(46),h=crc(data);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(20,4);l.writeUInt32LE(h,14);l.writeUInt32LE(data.length,18);l.writeUInt32LE(data.length,22);l.writeUInt16LE(n.length,26);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt32LE(h,16);c.writeUInt32LE(data.length,20);c.writeUInt32LE(data.length,24);c.writeUInt16LE(n.length,28);c.writeUInt32LE(offset,42);local.push(l,n,data);central.push(c,n);offset+=30+n.length+data.length;}
            const dir=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(2,8);end.writeUInt16LE(2,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,dir,end]);
           }
           
           const RECEIVER_IDS=[...Z.ZIP_CONTROL_IDS,'receiver_capture_current_pair','receiver_rejection_no_zip_claim'];
           async function receiverControls(){
@@ -730,21 +844,21 @@
            return {passed:!failed,record,failure:failed?unavailableRecord(args):null};
           }
           export async function verify(){
            const kind=process.env.GITHUB_JOB==='keyless_verify'?'controls':'suite';let needs={};
            try{needs=JSON.parse(process.env.AFW_SUITE_NEEDS);}catch{}
            const upstream=needs[kind==='controls'?'keyless_controls':'reduction_consume_b'];
            const args={kind,id:upstream?.outputs?.['safe-id']??'',uploaded:upstream?.outputs?.['safe-digest']??'',expected:expectedCurrent()};
            try{
             await A.validateSourcePins();A.need(['verify','keyless_verify'].includes(process.env.GITHUB_JOB));
             const guarded=await receiverControlsGuard(args);console.log(JSON.stringify(guarded.record));
-            if(!guarded.passed)return guarded.failure;
+            if(!guarded.passed)return (await reconcileSuite({route:{readback:guarded.failure,valid:null},jobInventory:null,needs})).readback;
             const route=await verifyRoute(args);
             return (await reconcileSuite({route,jobInventory:null,needs})).readback;
            }catch{return unavailableRecord(args);}
           }
           if(process.argv[1]===import.meta.filename){
            const record=await verify(),line=JSON.stringify(record);
            if(Buffer.byteLength(line+'\n')<=4096){
             console.log(line);try{await writeFile(join(process.env.RUNNER_TEMP,'afw-suite-readback.json'),line+'\n',{mode:0o600});}catch{}
            }else console.log(JSON.stringify(unavailableRecord({kind:record.kind,id:record.artifactId??'',uploaded:record.uploadedDigest??'',expected:expectedCurrent()})));
            if(!record.accepted)process.exitCode=1;
@@ -2818,28 +2932,27 @@
           OWN_OPEN_OUTCOME: ${{ steps.own_open.outcome }}
           OWN_VERIFIED_OUTCOME: ${{ steps.own_verified.outcome }}
           NATIVE_ID: ${{ steps.upload.outputs.artifact-id }}
           NATIVE_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
           NATIVE_KIND: ${{ steps.seal.outputs.kind }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/safe-publication.log" 2>&1
-          import {readFile,writeFile} from 'node:fs/promises';
+          import {writeFile} from 'node:fs/promises';
           const e=process.env,A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');await A.validateSourcePins();
-          const readOptional=async name=>{try{return JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/'+name,'utf8'));}catch(error){if(error.code==='ENOENT')return null;throw error;}};
-          const pure=await readOptional('pure-assignment.json'),proof=await readOptional('suite-proof.json');
           let assignment=null;
           try{A.canonicalId(e.NATIVE_ID);A.hex(e.NATIVE_DIGEST);A.need(['reduction-result-b','consumer-failure'].includes(e.NATIVE_KIND));assignment={id:e.NATIVE_ID,zipSha256:e.NATIVE_DIGEST,kind:e.NATIVE_KIND};}catch{}
           const outcomes={pureBinding:e.PURE_BINDING_OUTCOME,native:e.NATIVE_OUTCOME,aggregate:e.AGGREGATE_OUTCOME,ownMetadata:e.OWN_METADATA_OUTCOME,ownOpen:e.OWN_OPEN_OUTCOME,ownValidation:e.OWN_VERIFIED_OUTCOME};
-          const result=A.projectSuiteOutcome({outcomes,receipts:{pure,assignment,proof}});
+          const receipts=await A.loadProjectionReceipts({outcomes,assignment});
+          const result=A.projectSuiteOutcome({outcomes,receipts});
           await A.publishPair('suite',result);await writeFile(e.GITHUB_OUTPUT,'status='+result.status+'\n',{flag:'a'});
           NODE
       - name: Upload current two-JSON suite SAFE only
         id: summary_upload
         if: always() && !cancelled() && steps.summary_pair.outcome == 'success'
         uses: actions/upload-artifact@v4
         with:
           name: afw-coherent-suite-safe-${{ github.run_id }}-1
           path: ${{ runner.temp }}/afw-suite-safe/
           retention-days: 7
```

## Full activation-only delta23bda→a63e

Roundtrip verified; samefourbodies/eightactualfalse.

```diff
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -1,14 +1,16 @@
 name: AFW finite budget qualification
-run-name: AFW coherent suite qualification HELD ${{ github.sha }}
+run-name: AFW coherent suite FIX2 KEYLESS qualification ${{ github.sha }}
 on:
-  workflow_dispatch:
+  push:
+    branches: [feat/finite-native-cleanup-20261101]
+    paths: [.github/workflows/afw-finite-budget-qualification.yml]
 permissions:
   contents: read
   actions: read
 concurrency:
   group: afw-finite-budget-qualification
   cancel-in-progress: false
 # PREPARATION ONLY. Every job remains literally false pending Root review.
 # PREPARATION ONLY: all eight actual jobs are literally false; actual Native suite remains HELD.
 jobs:
   contracts:
@@ -2997,18 +2999,136 @@
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
           const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
           NODE_SUITE_BOOTSTRAP
       - name: Verify all seven current direct outputs and the current SAFE pair
+        env:
+          GH_ARTIFACT_TOKEN: ${{ github.token }}
+          AFW_SUITE_NEEDS: ${{ toJSON(needs) }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node "$RUNNER_TEMP/afw-suite-verifier.mjs"
+  keyless_controls:
+    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW COHERENT SUITE FIX2 KEYLESS QUALIFICATION 20261113094641Z' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 7
+    outputs:
+      safe-id: ${{ steps.summary_upload.outputs.artifact-id }}
+      safe-digest: ${{ steps.summary_upload.outputs.artifact-digest }}
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Materialize current Source-bound suite programs before import
+        id: suite_bootstrap
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
+          const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
+          assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
+          const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
+          const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
+          for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
+          assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
+          const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
+          const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          NODE_SUITE_BOOTSTRAP
+      - name: Execute six direct shared-seam controls without Native
+        id: controls
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -euo pipefail
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          result=0
+          node "$RUNNER_TEMP/afw-suite-controls.mjs" || result=$?
+          printf 'exit=%s\n' "$result" >>"$GITHUB_OUTPUT"
+          test "$result" = 0
+      - name: Validate the truthful current controls pair before upload
+        id: pair_written
+        if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
+        shell: bash
+        run: |
+          set -euo pipefail
+          node --input-type=module <<'NODE'
+          import {readFile,writeFile} from 'node:fs/promises';
+          try{const A=await import(process.env.RUNNER_TEMP+'/afw-suite-adapter.mjs'),V=await import(process.env.RUNNER_TEMP+'/afw-suite-verifier.mjs'),root=process.env.RUNNER_TEMP+'/afw-suite-controls-safe',pair=new Map();for(const n of ['result.json','manifest.json'])pair.set(n,await readFile(root+'/'+n));const result=V.validatePair(pair,'controls',{context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES});await writeFile(process.env.GITHUB_OUTPUT,'status='+result.status+'\n',{flag:'a'});}catch{console.log('controls_pair_unavailable');process.exitCode=1;}
+          NODE
+      - name: Upload only the closed two-JSON controls SAFE
+        id: summary_upload
+        if: always() && !cancelled() && steps.pair_written.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-coherent-suite-controls-safe-${{ github.run_id }}-1
+          path: ${{ runner.temp }}/afw-suite-controls-safe/
+          retention-days: 7
+          if-no-files-found: error
+      - name: Require all six controls and their truthful publication
+        if: always() && !cancelled()
+        shell: bash
+        run: |
+          test '${{ steps.controls.outcome }}' = success
+          test '${{ steps.pair_written.outputs.status }}' = passed
+          test '${{ steps.summary_upload.outcome }}' = success
+  keyless_verify:
+    if: ${{ always() && github.event_name == 'push' && github.event.head_commit.message == 'AFW COHERENT SUITE FIX2 KEYLESS QUALIFICATION 20261113094641Z' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: [keyless_controls]
+    runs-on: ubuntu-24.04
+    timeout-minutes: 2
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Materialize current Source-bound suite programs before import
+        id: suite_bootstrap
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
+          const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
+          assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
+          const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
+          const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
+          for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
+          assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
+          const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
+          const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          NODE_SUITE_BOOTSTRAP
+      - name: Verify the current controls SAFE and all sixteen ZIP receiver controls
         env:
           GH_ARTIFACT_TOKEN: ${{ github.token }}
           AFW_SUITE_NEEDS: ${{ toJSON(needs) }}
         shell: bash
         run: |
           set -euo pipefail
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node "$RUNNER_TEMP/afw-suite-verifier.mjs"
```

## Full persistent delta0ade→715a reportappend

Exactrestoreprecedingtree, only existingreport appended. Root completeprefix/roundtripverified.

```diff
--- a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
+++ b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
@@ -503,10 +503,304 @@
 
 Fresh scoped re-review by the original task reviewer is the next gate. The covering run passed, but this writer does not adjudicate F1–F7 closed or release Task2. No actual eight-job run follows automatically. Original Native business cases executed in this unit: **0**. Planned original suite remains Q8+Native8=16 total, distinct from6 wrapper families,18 subcases and16 ZIP controls.
 
 All five flags remain exactly false:
 
 ```json
 {"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
 ```
 
 **STOP after exact restoration, this prefix-preserving append and final readbacks. Actual Task2 HELD; no auto-retry.**
+
+
+# Fix round 2/5 — scoped F1/F4/F6/F8 correction and one qualification
+
+Date: 2026-11-13 UTC. Result: **DONE; covering KEYLESS qualification PASSED; scoped re-review pending; actual Task2 HELD**.
+
+This is the separately released second fix round. It is not an automatic retry or permission to execute the actual eight-job suite. The preceding61240-character report, blob `7e92d4ef681772d912e6f8194011f28518883b5b`, is preserved in full as an exact prefix, including the original24731-character first-unit prefix and every prior record.
+
+## Required coverage correction
+
+FIX1's actual run43399028588/1, published6/6 result,36 phase records and18 paired subcases remain historical execution evidence. **The identity-rename assertion did not establish that validateKeyScopes was reached.** mutateActual tried to locate the renamed step through its old ID; that setup failure happened inside the expected-rejection assertion and was counted as validator rejection. The earlier claim that every such target reached its validator overstated that coverage. No old text or result is rewritten here.
+
+Likewise, FIX1's successful shared route coverage applied to valid SAFE DTOs, including valid nonpass. Its early null return left missing/partial SAFE outside the direct-assignment reconciliation path. This round restores and tests those explicit cases rather than treating the earlier6/6 record as proof of them.
+
+## Authority and scoped boundary
+
+Root released this round at immutable Rootdocs `54e49edf6020a0d9f6194745239a679a6d20b95d`: brief `docs/superpowers/briefs/2026-11-13-coherent-suite-task1-fix2.md`, latest binding SPEC and scoped review `docs/superpowers/reviews/2026-11-13-coherent-suite-task1-fix1-review.md`. That review marked F2/F3/F5/F7 addressed; F1/F4/F6 and new Important F8 were the only open correction scope. No finding was parked or adjudicated by this writer.
+
+Root's suite-vs-controls clarification is durable at `56ae3fb5d8495ff196e3bf11ff9691116dd88574`: final attempt1 exact8/seven-direct-assignment reconciliation applies to kind suite, including null B SAFE DTO. Controls keeps its separate keyless_controls-only needs in the ten-job qualification graph; no Native peer needs are invented there.
+
+PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web; repository ID1347578006; Source branch feat/finite-native-cleanup-20261101; origin https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web. Only temporary F7, append-only SAME report and one covering Actions run were authorized. Cloud GitDB/CAS/Actions only; Source strings/hashes/metadata in RAM. No local Source file/clone/worktree/dependency/build/eval/import/execution, no actual key/Native/World/SDK/Miniflare in qualification, no CF/runtime/OAuth/OTP/token/permission/Max/mail/main/PR operation.
+
+## Immutable preservation and review package
+
+| Fix2 checkpoint | Commit | Tree / F7 |
+| --- | --- | --- |
+| Closed BASE | `0ade3837c379eda3db5d327a2c8d8e1d06f5265a` | tree `7634f0eb194889b0869b40d8828e4cf99b3b50bb`;3196 leaves; report7e92d4ef |
+| Inactive candidate | `23bda9c98ebb9faa636c59d46b20ab40c50e38a9` | tree `29b02bf9cae918817234c19d176bc28c9032366e`; F7 `67c3a7db105b4276a870ecebbdc71ba0e57a248d` |
+| Sole KEYLESS overlay | `a63e889951962c7591d91e5a9152887ac4273b2a` | tree `5a018318140db149aa30fc6e437a783c24a98b31`; F7 `a29777e3f9d19fa4ddbebf3bb047c99b7365b2d4` |
+| Exact restoration | `ced5946253825a97a04db21455cfc963a719a900` | tree `7634f0eb194889b0869b40d8828e4cf99b3b50bb`; exact closed BASE and complete report prefix |
+
+Inactive candidate: 304165 bytes / SHA256 `cb5456433686e31bbfead88e7bd6d2dfc6ac554fed1d74e61c5818a959a53145`. It was fetched back from its immutable commit and compared exactly. Root independently recomputed all four actual heredoc body hashes before qualification.
+
+| Body | Bytes | SHA256 |
+| --- | ---: | --- |
+| adapter |43451| `a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3` |
+| controls |43187| `afe050bdb5a35a0c727a2b949fba4a58a7e222f4ef12c8e86756d0e24f21d6b0` |
+| verifier |13786| `c6fac92623809ee41b69ee77260b32d50c1149ba5716ca0a39b8b024d7dfb849` |
+| SAFEZIP |13305| `b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d` |
+
+Candidate and overlay use the exact same four bodies. Both KEYLESS bootstraps passed fixed repository/id/ref/attempt/Node/pins, current HEAD/tree/full workflow Git blob and four-body materialization checks. Qualified ZIP3 remains3380 bytes / `4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8`; SAFEZIP remains13305 bytes / `b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d`.
+
+Review references cover the complete scoped changes and preservation:
+
+- [Closed fix2 BASE through inactive candidate](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/0ade3837c379eda3db5d327a2c8d8e1d06f5265a...23bda9c98ebb9faa636c59d46b20ab40c50e38a9)
+- [Reviewed FIX1 candidate through FIX2 candidate](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/18183bd24aa3cbacb74119e54ef28d6671bd45d5...23bda9c98ebb9faa636c59d46b20ab40c50e38a9)
+- [Complete fixed inactive F7](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/23bda9c98ebb9faa636c59d46b20ab40c50e38a9/.github/workflows/afw-finite-budget-qualification.yml)
+- [Exact candidate-to-overlay diff](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/23bda9c98ebb9faa636c59d46b20ab40c50e38a9...a63e889951962c7591d91e5a9152887ac4273b2a)
+- [Overlay through exact restoration](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/a63e889951962c7591d91e5a9152887ac4273b2a...ced5946253825a97a04db21455cfc963a719a900)
+- [BASE through restoration, exact tree equality](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/0ade3837c379eda3db5d327a2c8d8e1d06f5265a...ced5946253825a97a04db21455cfc963a719a900)
+
+The final report commit/tree are delivered with the closing readback; they are not recursively embedded in this append.
+
+## Four findings mapped to actual fixes and covering code
+
+| Finding | Scoped correction | Actual covering subcases |
+| --- | --- | --- |
+| F1: setup exception counted as validator rejection | Selection, one-target check, transformation and unchanged-prefix/suffix/region proof all complete before assert.throws. Rename proof uses the original selected range and adjusted end; it never resolves the edited step through the old ID. The validator type is checked before the assertion; an instrumented invocation verifies exactly one actual validator call. | A missing job and ambiguous target fail setup while validator invocation stays0. Identity rename reaches validateKeyScopes once. Every actual job/step mutation is built outside its validator assertion; all prior DAG/key/F8/guard targets are retained. |
+| F4: null SAFE skipped jobs/assignments | Suite reconciliation no longer returns early for route.valid=null. It observes the final attempt1 inventory and checks every complete available direct needs assignment independently of pair validity, including on missing/partial/HTTP-failed SAFE. Source currentness, final job observation and assignment checks are independently bounded; pair classification/known SAFE ID stay unchanged and accepted remains false. No private bytes are read. | Missing outputs and ID-only each trigger exactly one attempt1 Jobs observation and all7 expected direct metadata calls, with zero SAFE metadata/ZIP calls. Other malformed/partial cases and404/403/500 retain the correct classifications and no ZIP requests while still reconciling all direct metadata. |
+| F6: absent/partial controls and real final path | Restored explicit no-output and ID-only verifyRoute cases, separate SAFE/direct call counters, known-ID retention, no false proof and real shared reconcileSuite final path. Actual verify routes an unavailable receiver-control result through the same reconciliation path as well. Controls-kind handling remains distinct, as Root ruled. | Dedicated missing, ID-only and other malformed/HTTP subcases exercise verifyRoute→reconcileSuite, not a duplicate model. Existing full valid-suite, nonpass, final metadata, Source/attempt and receiver-presence cases remain. Actual publisher wiring now checks loadProjectionReceipts precedes projectSuiteOutcome. |
+| F8: failed receipt write suppressed publication | Added adapter loadProjectionReceipts({outcomes,assignment},io=fixedProjectionIO), used by actual B before projectSuiteOutcome. Pure is read/parsed only after pureBinding success. Proof is read/parsed only after ownValidation success, success-kind assignment and Native+aggregate success. Otherwise ineligible bytes are untouched and complete assignment retained. | Eligible Buffer receipts load and project a pass. Unexpected malformed eligible receipts reject. Failed pure write with truncated/unreadable data is not read and projects pure_unverified while retaining assignment. Failed proof write after metadata/open is not read and projects proof_unverified with the known assignment. Failure-kind proof stays ineligible after validation. |
+
+These are implementation and covering-test claims, not this writer's re-review disposition. The original reviewer must assess the scoped delta before any actual suite release.
+
+The new production loading API returns only the existing internal receipt object:
+
+```text
+loadProjectionReceipts({outcomes,assignment}, io=fixedProjectionIO)
+  -> {pure,assignment,proof}
+```
+
+It validates the existing exact six outcome fields, requires keyless scope and uses only fixed runner-private pure-assignment.json and suite-proof.json paths in actual IO. No CLI/env/transport/path override is added. It accepts typed internal receipt bytes; fatal UTF8 decoding and JSON parsing occur only after eligibility. A parse failure after a claimed successful eligible write remains unexpected invalid evidence; it does not fabricate a command outcome or relax the DTO.
+
+Actual B publisher now captures the six outcomes and complete upload assignment first, calls this loader, then calls the existing shared projectSuiteOutcome and publishPair. It no longer eagerly parses optional receipt files. Assignment is independent of either file read.
+
+Suite final reconciliation can update upstream from actual job/assignment observations even when pair transport/schema is unavailable. It preserves unavailable/publication_unavailable or invalid_evidence/absent and known SAFE ID/digest; accepted staysfalse. It does not request SAFE metadata/ZIP for absent outputs, does not request SAFE ZIP for partial outputs, does not invent missing direct assignments and never decrypts peer artifacts. Current controls-kind routing remains separate in the ten-job graph.
+
+## Earlier addressed fixes and protected pipeline retained
+
+F2 finalizer still writes the verified pure receipt only after the fixed original World/profile/materialization closure succeeds and public projection still requires the real successful step outcome. F3 retains authenticated private observedAt, exact peak recomputation/equality, observation boundaries and positive_producer/reduction_producer/R1/R2/R3 ownership order. F5 retains strict-pair reason none on valid nonpass, closed self-control failure records and accepted/upstream separation. F7 retains operation caps and B's20000ms raw peer timeout, generic-private30000ms and unchanged qualified ZIP3/SAFEZIP.
+
+Source-string comparison still confirms every original Native+TAP step byte-exact. The entire original F8 sealer-through-upload block remains byte-exact19458 bytes / SHA256 `8b239b4a5e7e4d5f424fef645a464e006c039a47763224902c4221bba2666231`. Original tests/World/assertions/pins, all original DAG edges/timeouts, six environments, R120s/P-D300s, root30s/child5s and900000/180000 clocks remain unchanged. Legacy B private composite and separate public Native command outcome remain.
+
+Inactive candidate still has eight literal false actual guards and manual/no-input/no-push. Existing key remains in exactly26 generic crypto step scopes and zero job scopes. No actual Native case, World/SDK import, Miniflare allocation or actual key was used by this qualification.
+
+## Sole fix2 qualification and ten terminal jobs
+
+[Actions43404200555 / attempt1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43404200555)
+
+- Source `a63e889951962c7591d91e5a9152887ac4273b2a`.
+- Unique message `AFW COHERENT SUITE FIX2 KEYLESS QUALIFICATION 20261113094641Z`.
+- One fixed-branch F7 self-path push, attempt1;7+2minute KEYLESS limits.
+- Completed **success**; exactly10 materialized and terminal, **8 skipped + 2 success**.
+- Source stayed frozen through completed run and all10 terminal. No retry, rerun, actual eight-job activation, cap change or clock change occurred.
+
+| Job | Job ID | Outcome |
+| --- | --- | --- |
+| contracts | 131814349919 | skipped |
+| positive_prepare | 131814350016 | skipped |
+| positive_consume | 131814351100 | skipped |
+| reduction_prepare | 131814349699 | skipped |
+| reduction_consume_a | 131814350127 | skipped |
+| readonly | 131814349732 | skipped |
+| reduction_consume_b | 131814350514 | skipped |
+| verify | 131814351363 | skipped |
+| keyless_controls | 131814347825 | success |
+| keyless_verify | 131814422559 | success |
+
+Actual covering commands on GitHub-hosted Ubuntu:
+
+```text
+# Both jobs: checkout exact Source; setup Node22.23.4; fixed Source bootstrap.
+test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
+
+# keyless_controls:
+node "$RUNNER_TEMP/afw-suite-controls.mjs"
+# Captured exit; strict current pair validation; upload exactly2JSON; final truth guard.
+
+# Compile-only inspection inside fixed_case_counts:
+bash -n                         # each actual run body on stdin
+node --input-type=module --check # inline module bodies on stdin
+node --check "$RUNNER_TEMP/afw-suite-adapter.mjs"
+node --check "$RUNNER_TEMP/afw-suite-controls.mjs"
+node --check "$RUNNER_TEMP/afw-suite-verifier.mjs"
+node --check "$RUNNER_TEMP/afw-suite-safe-zip.mjs"
+
+# Generic custody fixture only:
+node --input-type=module -e <fixed inert generic-custody fixture program>
+# Fixed inert32-byte key only in isolated subprocess; seal/open/corruption rejection.
+
+# keyless_verify:
+node "$RUNNER_TEMP/afw-suite-verifier.mjs"
+# Unchanged14 ZIP controls +2 receiver seams; then actual current controls SAFE.
+```
+
+Amended controls were written first, followed by scoped implementation and Source-string/hash self-review. The one authorized cloud qualification is the executed covering evidence; no pre-implementation RED or extra test run is claimed. No npm/dependencies or unrelated project suite ran. Injected IO/callback fixtures stayed fixed and inert; Source business modules were not imported or replaced.
+
+## Actual outputs, phases and coverage
+
+Wrapper: **6 expected / 6 completed / 6 passed / 0 failed**, firstFailure null. Named subcases: **26 start / 26 passed / 0 failed/open**,52 phase records. Syntax inspection: **110 shell programs +63 Node programs**, inspection-only. Separate ZIP/receiver controls: **16/16 passed**,0 failed. Actual Native business cases: **0**.
+
+The fixed phase inventory is complete:
+
+| Family | Subcase | Observed |
+| --- | --- | --- |
+| dag_peer_inventory | b_inventory_optional_nonexecuting_receiver | start + passed |
+| dag_peer_inventory | mutation_setup_failure_cannot_count_as_validator_rejection | start + passed |
+| dag_peer_inventory | actual_b_dependency_and_attempt_endpoint_targets | start + passed |
+| key_scope | all_twenty_six_exact_crypto_step_bindings | start + passed |
+| key_scope | inert_parent_environment_is_restored | start + passed |
+| fixed_case_counts | fixed_pins_native_tap_cases_and_complete_f8_action | start + passed |
+| fixed_case_counts | private_original_clocks_and_owned_case_identities | start + passed |
+| fixed_case_counts | all_rewritten_shell_and_node_bodies_compile_only | start + passed |
+| metadata_custody_binding | metadata_current_identity_and_complete_pure_binding | start + passed |
+| metadata_custody_binding | generic_aead_zip3_and_reopened_proof_bytes | start + passed |
+| metadata_custody_binding | operation_raw_cap_edges_and_b_twenty_second_timeout | start + passed |
+| incomplete_or_contradictory | pure_receipt_commits_after_original_stage_success_only | start + passed |
+| incomplete_or_contradictory | eligible_projection_receipts_load_and_parse_failures | start + passed |
+| incomplete_or_contradictory | failed_pure_receipt_write_is_not_read_and_retains_assignment | start + passed |
+| incomplete_or_contradictory | failed_proof_receipt_write_is_not_read_after_open | start + passed |
+| incomplete_or_contradictory | shared_projection_observed_failures_and_retained_assignment | start + passed |
+| incomplete_or_contradictory | failure_kind_proof_remains_ineligible_after_validation | start + passed |
+| incomplete_or_contradictory | actual_publication_guards_order_and_full_pure_gate | start + passed |
+| incomplete_or_contradictory | valid_failed_pair_and_receiver_self_control_failure_record | start + passed |
+| coherent_current_pair | same_full_suite_route_projection_and_final_reconciliation | start + passed |
+| coherent_current_pair | nonpass_reconciles_all_available_assignments | start + passed |
+| coherent_current_pair | missing_safe_observes_attempt1_jobs_and_all_direct_metadata | start + passed |
+| coherent_current_pair | id_only_safe_retains_id_without_safe_traffic | start + passed |
+| coherent_current_pair | other_malformed_partial_and_http_safe_routes_reconcile | start + passed |
+| coherent_current_pair | final_current_metadata_source_run_and_direct_needs_edges | start + passed |
+| coherent_current_pair | closed_schema_flags_profiles_counts_and_extra_fields | start + passed |
+
+The mutation setup-prevention subcase proves setup failure cannot satisfy a validator assertion; the identity rename then proves one actual validator invocation. Missing/partial route subcases separately count forbidden SAFE operations and required direct metadata operations. Receipt-load subcases use the actual shared loader/projector with inert Buffer/string/unreadable fixtures; they do not call original World.
+
+Exact compile-only output:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_SYNTAX/1","shellPrograms":110,"nodePrograms":63,"inspectedBodiesExecuted":false,"NativeExecuted":false,"SDKImported":false,"MFAllocated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Exact six-control output:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_CONTROLS/1","status":"passed","expected":6,"completed":6,"passed":6,"failed":0,"inventory":[{"id":"dag_peer_inventory","status":"passed"},{"id":"key_scope","status":"passed"},{"id":"fixed_case_counts","status":"passed"},{"id":"metadata_custody_binding","status":"passed"},{"id":"incomplete_or_contradictory","status":"passed"},{"id":"coherent_current_pair","status":"passed"}],"firstFailure":null,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Exact52 bounded phase records:
+
+```jsonl
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"b_inventory_optional_nonexecuting_receiver","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"b_inventory_optional_nonexecuting_receiver","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"mutation_setup_failure_cannot_count_as_validator_rejection","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"mutation_setup_failure_cannot_count_as_validator_rejection","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"actual_b_dependency_and_attempt_endpoint_targets","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"actual_b_dependency_and_attempt_endpoint_targets","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"all_twenty_six_exact_crypto_step_bindings","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"all_twenty_six_exact_crypto_step_bindings","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"inert_parent_environment_is_restored","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"inert_parent_environment_is_restored","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"fixed_pins_native_tap_cases_and_complete_f8_action","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"fixed_pins_native_tap_cases_and_complete_f8_action","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"private_original_clocks_and_owned_case_identities","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"private_original_clocks_and_owned_case_identities","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"all_rewritten_shell_and_node_bodies_compile_only","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"all_rewritten_shell_and_node_bodies_compile_only","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"metadata_current_identity_and_complete_pure_binding","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"metadata_current_identity_and_complete_pure_binding","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"generic_aead_zip3_and_reopened_proof_bytes","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"generic_aead_zip3_and_reopened_proof_bytes","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"operation_raw_cap_edges_and_b_twenty_second_timeout","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"operation_raw_cap_edges_and_b_twenty_second_timeout","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"pure_receipt_commits_after_original_stage_success_only","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"pure_receipt_commits_after_original_stage_success_only","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"eligible_projection_receipts_load_and_parse_failures","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"eligible_projection_receipts_load_and_parse_failures","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failed_pure_receipt_write_is_not_read_and_retains_assignment","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failed_pure_receipt_write_is_not_read_and_retains_assignment","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failed_proof_receipt_write_is_not_read_after_open","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failed_proof_receipt_write_is_not_read_after_open","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"shared_projection_observed_failures_and_retained_assignment","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"shared_projection_observed_failures_and_retained_assignment","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failure_kind_proof_remains_ineligible_after_validation","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failure_kind_proof_remains_ineligible_after_validation","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"actual_publication_guards_order_and_full_pure_gate","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"actual_publication_guards_order_and_full_pure_gate","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"valid_failed_pair_and_receiver_self_control_failure_record","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"valid_failed_pair_and_receiver_self_control_failure_record","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"same_full_suite_route_projection_and_final_reconciliation","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"same_full_suite_route_projection_and_final_reconciliation","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"nonpass_reconciles_all_available_assignments","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"nonpass_reconciles_all_available_assignments","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"missing_safe_observes_attempt1_jobs_and_all_direct_metadata","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"missing_safe_observes_attempt1_jobs_and_all_direct_metadata","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"id_only_safe_retains_id_without_safe_traffic","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"id_only_safe_retains_id_without_safe_traffic","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"other_malformed_partial_and_http_safe_routes_reconcile","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"other_malformed_partial_and_http_safe_routes_reconcile","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"final_current_metadata_source_run_and_direct_needs_edges","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"final_current_metadata_source_run_and_direct_needs_edges","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"closed_schema_flags_profiles_counts_and_extra_fields","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"closed_schema_flags_profiles_counts_and_extra_fields","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Exact ZIP output:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_ZIP_CONTROLS/1","expected":16,"completed":16,"passed":16,"failed":0,"inventory":[{"id":"zip_valid_store_crc_vector","status":"passed"},{"id":"zip_valid_deflate","status":"passed"},{"id":"zip_signed_unsigned_descriptors","status":"passed"},{"id":"zip_wrong_size","status":"passed"},{"id":"zip_wrong_upload_sha","status":"passed"},{"id":"zip_wrong_metadata_sha","status":"passed"},{"id":"zip_extra_entry","status":"passed"},{"id":"zip_duplicate_entry","status":"passed"},{"id":"zip_traversal_entry","status":"passed"},{"id":"zip_symlink","status":"passed"},{"id":"zip_bad_crc","status":"passed"},{"id":"zip_noncontiguous_ranges","status":"passed"},{"id":"zip_declared_and_inflate_caps","status":"passed"},{"id":"download_stream_redirect_auth_bounds","status":"passed"},{"id":"receiver_capture_current_pair","status":"passed"},{"id":"receiver_rejection_no_zip_claim","status":"passed"}],"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+## Current SMALLSAFE and bounded readback
+
+Only one artifact was created in this run; no extra readback artifact. It consists exactly of result.json and manifest.json.
+
+| Field | Observed |
+| --- | --- |
+| Name |afw-coherent-suite-controls-safe-43404200555-1 |
+| Assigned ID | `14025364645` |
+| Uploaded/API/raw SHA256 | `4919281bfe0287e4848c254162bf9fad82909b5b7f45a457b5a2151ee9fb944b` |
+| ZIP bytes |1391 |
+| Result bytes/SHA256 |1666 / `f60f89c1916f42fc2d075635711c2d168887800b35c4862cc01b7bf554834cd0` |
+| Manifest bytes/SHA256 |265 / `36d42052577bb7dcf0afcd3754247668f183a8ff016320cc3f9727788fb49871` |
+| Expires |2026-11-20T09:47:17Z |
+| Producer / accepted |passed / true |
+| Pair status/reason/proof |verified / none / strict_current_safe_pair |
+| Upstream |not_applicable |
+
+Root independently checked current strict ZIP/canonical bytes/full manifest/context/four hashes/closed6/6 DTO, the exact readback tied to actual producer job success,52 paired phase records, syntax110/63, ZIP16 and exact10 terminal outcomes.
+
+Exact current <=4096B readback:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_READBACK/1","kind":"controls","source":"a63e889951962c7591d91e5a9152887ac4273b2a","run":"43404200555","attempt":1,"artifactId":"14025364645","uploadedDigest":"4919281bfe0287e4848c254162bf9fad82909b5b7f45a457b5a2151ee9fb944b","status":"verified","reason":"none","proof":"strict_current_safe_pair","metadataBytes":1391,"metadataDigest":"sha256:4919281bfe0287e4848c254162bf9fad82909b5b7f45a457b5a2151ee9fb944b","rawZipBytes":1391,"rawZipSha256":"4919281bfe0287e4848c254162bf9fad82909b5b7f45a457b5a2151ee9fb944b","resultBytes":1666,"resultSha256":"f60f89c1916f42fc2d075635711c2d168887800b35c4862cc01b7bf554834cd0","manifestBytes":265,"manifestSha256":"36d42052577bb7dcf0afcd3754247668f183a8ff016320cc3f9727788fb49871","expiresAt":"2026-11-20T09:47:17Z","producerStatus":"passed","upstream":"not_applicable","accepted":true,"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","controls":"afe050bdb5a35a0c727a2b949fba4a58a7e222f4ef12c8e86756d0e24f21d6b0","verifier":"c6fac92623809ee41b69ee77260b32d50c1149ba5716ca0a39b8b024d7dfb849","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"},"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Only approved current SAFE metadata and bounded KEYLESS records were returned. Inert custody fixture bytes remained runner-only. No actual private proof/model/plaintext/cipher, producer log, actual key or owner data was fetched.
+
+## Exact closure and next gate
+
+Completed success/all10 terminal and all five Source active status inventories0 were positively read before restoration. Source remained exactly a63e8899. The original rollback F7 was reread from immutable closed BASE and compared before mutation.
+
+Restoration commit `ced5946253825a97a04db21455cfc963a719a900` points exactly to tree `7634f0eb194889b0869b40d8828e4cf99b3b50bb`. F7 readback is exact `f7a71f1a0fa4f5ddf069ff411f008a098455e5cc`,126209 bytes/SHA256 `1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a`, original manual/no-input/no-push/seven false&& guards. Report was also read back as exact7e92d4ef/61240-character prefix before this append.
+
+The overlay recursive tree was positively read truncated:false/3196 leaves; original3195 leaves were unchanged except temporary F7 and the report prefix blob remained7e92d4ef. Restoration restores F7 exactly. This append changes only the existing suite-report leaf and preserves that complete prefix. Final target remains3196 leaves, all original3195 type/mode/blob and62 workflows exact; protected R1 report unchanged; main `0c9c475b3ebaa970fc11d628b40e50a90cceb727` unchanged. The final report CAS is followed by full tree/ref/F7/report-prefix/main/62WF/five-active readbacks, delivered to Root. Ref updates used expected-tip CAS, no force or uncertain retry.
+
+Fresh scoped re-review of F1/F4/F6/F8 and only regressions introduced by this correction is the next gate. F2/F3/F5/F7 fixes were retained and their controls passed. This writer does not release the actual suite or claim its business acceptance. Original planned Q8+Native8=16 remains separate from6 wrapper families,26 subcases,52 phase records and16 ZIP controls.
+
+All five readiness flags remain exactly false:
+
+```json
+{"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+**STOP after this prefix-preserving append and final readbacks. Actual Task2 HELD; no auto-retry.**
```
