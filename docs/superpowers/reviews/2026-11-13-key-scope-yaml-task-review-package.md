# Task1 review package — strict decoded YAML key-scope qualification

## Review authority and exact delta

Read-only task spec+quality review, not final whole-unit review. Brief docs/superpowers/briefs/2026-11-13-key-scope-yaml-task1.md in this docs revision is full requirements. No subagents or Source execution/files/deps/commands. Root owns releases; no run/branch/key/runtime action authorized by this package.

NEW task's reviewed corrected dependency seedb5646538bb9f2d119e8943896990ac657d7bd518/F7be579ea23392d5df063458356765e2969244ee38. This prior keyless source did NOT qualify Native; carried FF-I2 is exactly this task's repair. New executed head afed5ff612fc8618962f8b372ad054672175077e/tree d61c882f5b2bdead9890f873a6e8c02291521289/F7f8a3cac1977745f2998981abc1db22ae1d0d0152/355548B/SHA7d3edfa4657ccf0b3adc4954419aa3d4dcbcdcbe3f893571fb8166336b3f70e2. Root full protected-tree and complete reverse Source projection establishes ONLY shown changes from b564 (adapter/controls, actualcontracts hook,2keylessjobs/install,triggerguards/runname), all Native commands/caps/pins plus verifier/SafeZIP unchanged. Final net diff is report-only because exact F7 restoration is required; reviewing only final net report would omit the temporary executed code. The complete immutable scoped diff below is the change under review; hunkcontext includes entire newlychangedfunctions. Source file is available for one focused concrete-risk check if a function is cut off.

Current Sourcebase beforeunit72c108/report224620; after run all10 terminal, restoreb3f4 exactpreunittreec6f985; finalclosedSourcec0c65836a677b23949624bc9afc14f4c59012a62/tree7b8922952555441abf96e8fe83f94c30e4de7f19/report7096ec150ea9a4285930d96da85224b4f62b1e61,234732chars. Prior3195leaves/all62WF/main0c9/originalF7/prefixexact, branchfiveactive0/closed0runs independentlyRootverified. No localSource execution or real key/Native/provider action.

## Implementer report and Root findings

Preparation report docs/superpowers/reviews/2026-11-13-key-scope-yaml-task1-report.md contains full45-field96-form registry/356-occurrence initialinventory. Its body is historical prep; appended current correction/gate metadata supersedes firstcandidateIDs. You need NOT read 356 repeated inventory rows: complete fixed registry is in adapter diff, Root actualcurrent run/Source evidence below and current actual report appendix supersede prep test-not-run state.

PREP-I1 Important missing builtin imports caught byRoot before anyrun, fixedimport-onlyb2d40. Conservativefixround1/5. This exactrun's actualpositive/provenance confirms repaired loader function executes with yaml2.9checkout/lock36a8. Full task stillFAILED below; do not call it qualified orcloseFF-I2.

Root concrete passive hypothesis for observedfailure: new expectMutationRejected(text,'positive_prepare',null,'    env:\\n','    env: &outer\\n',...) has8 substringmatches inwholejob (onejobenv +sevenstepenv). mutateActual asserts exactlyone BEFORE calling validator. Root counted exactexecutedSource publictext, no Sourcefunctionexecutedlocally. Review this as a concrete correctness risk. No per-inner-assertion runtime witness identifies this as first failure; it is independently a deterministic invalid fixture setup. Do not invent broader parser failure or current security leak. Keep any additional findings tied to complete diff with exactSource file/line.

Upstream currentlogs include actions/v4 Node20→24 forced-runtime warnings and punycode/url.parse deprecations; scriptNode is22.23.4. Preserve scope; record whether relevant, do not silently ignore nor demand unrelated unapproved Action upgrades by default.

## Root independent actual evidence

{
  "run": 43459300386,
  "source": "afed5ff612fc8618962f8b372ad054672175077e",
  "attempt": 1,
  "conclusion": "failure",
  "all10Terminal": true,
  "old8Skipped": true,
  "actualPositiveAndProvenanceVerified": true,
  "completedFamilies": 2,
  "passedFamilies": 1,
  "failedFamily": "key_scope",
  "subcasesPassed": 5,
  "subcasesFailed": 1,
  "subcasesNotExecuted": 26,
  "failingSubcase": "secret_run_and_ambiguous_context_references_rejected",
  "receiverControlsPassed": 16,
  "currentSAFEIndependentStrictVerified": true,
  "artifact": {
    "id": 14056095996,
    "zipBytes": 1402,
    "sha256": "b02fce117243a4bdac3057ba19015416d207bbfb5096db2473ea27c8608cd0e8"
  },
  "accepted": false,
  "operationalReadiness": false,
  "PCoff": false
}

Actualpositiveparserline:
{"version":"2.9.0","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","checkoutResolved":true,"positiveSourceValidated":true,"source":"afed5ff612fc8618962f8b372ad054672175077e","workflowBlob":"f8a3cac1977745f2998981abc1db22ae1d0d0152"}

StrictcurrentSMALLSAFE14056095996 raw1402B/SHA b02fce117243a4bdac3057ba19015416d207bbfb5096db2473ea27c8608cd0e8, exactlyresult.json1697B/SHA2092eb27275b596f85ac2bb77f4d9d2962e093d2c057442b17ffd3911188081e +manifest.json265B/SHA5f1dab6cbf03796f3030ee357eee51369756890ed7d2869c486aba7cec2addc2. Root rawZIP complete2entry/ranges/EOF/CRCknownvector+allCRC/fatalUTF8/canonical+manifest+fulltypedfailedDTO/currentctx/pins/4hashes verified independently; Root never private/pure archives/logs/key. Independent receiver16controls passed and currentpairstrict, producerfailed =>acceptedfalse. This is correct rejection, not qualification.

## Complete immutable changed-source diff (seed → actually executed head)

```diff
@@ -1,13 +1,16 @@
 name: AFW finite budget qualification
-run-name: AFW coherent suite qualification HELD ${{ github.sha }}
+run-name: AFW decoded key-scope qualification ${{ github.sha }}
 on:
   workflow_dispatch:
+  push:
+    branches:
+      - feat/finite-native-cleanup-20261101
 permissions:
   contents: read
   actions: read
 concurrency:
   group: afw-finite-budget-qualification
   cancel-in-progress: false
 # PREPARATION ONLY. Every job remains literally false pending Root review.
 # PREPARATION ONLY: all eight actual jobs are literally false; actual Native suite remains HELD.
 jobs:
@@ -47,21 +50,23 @@
           node-version: '22.23.4'
       - name: Preserve the four immutable Source helper bodies
         shell: bash
         run: |
           if false; then
           cat >"$RUNNER_TEMP/afw-suite-adapter.mjs" <<'NODE_SUITE_ADAPTER'
           import assert from 'node:assert/strict';
           import {createHash} from 'node:crypto';
           import {readFile,writeFile,readdir,mkdir,lstat} from 'node:fs/promises';
+          import {readFileSync,realpathSync} from 'node:fs';
+          import {createRequire} from 'node:module';
           import {execFileSync} from 'node:child_process';
           import {inflateRawSync} from 'node:zlib';
-          import {join} from 'node:path';
+          import {join,sep} from 'node:path';
           export const sha=b=>createHash('sha256').update(b).digest('hex');
           const binding=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-suite-binding.json'),'utf8'));
           export const CONTEXT=Object.freeze(binding.context),PINS=Object.freeze(binding.sourcePins),PROGRAM_HASHES=Object.freeze(binding.programHashes);
           export const FLAGS=Object.freeze({operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
           export const LEGACY=Object.freeze(['contracts','positive_prepare','positive_consume','reduction_prepare','reduction_consume_a','readonly','reduction_consume_b']);
           export const PRIVATE_PEERS=Object.freeze([{job:'positive_prepare',kind:'checkpoint'},{job:'positive_consume',kind:'positive-result'},{job:'reduction_prepare',kind:'reduction-checkpoint'},{job:'reduction_consume_a',kind:'reduction-result-a'},{job:'readonly',kind:'readonly-result'}]);
           export const SOURCE_PINS=Object.freeze({pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'});
           export const IDS=Object.freeze(['dag_peer_inventory','key_scope','fixed_case_counts','metadata_custody_binding','incomplete_or_contradictory','coherent_current_pair']);
           export const need=(ok)=>assert(ok,'suite_evidence_rejected'),same=(a,b)=>assert.deepEqual(a,b,'suite_evidence_rejected');
@@ -139,82 +144,171 @@
            for(const [name,expected]of Object.entries(deps)){
             need(typeof b[name]==='string');const dep=b[name].match(/^    needs: \[([^\]]*)\]$/m);
             same(dep?dep[1].split(',').map(x=>x.trim()):null,expected);
             same(Number(b[name].match(/^    timeout-minutes: (\d+)$/m)?.[1]),name==='contracts'||name==='verify'?2:name==='readonly'?7:15);
            }
            const peer=fixedStep(b.reduction_consume_b,'peer_download').text;
            need(peer.includes("'/actions/runs/'+e.GITHUB_RUN_ID+'/attempts/1/jobs?per_page=100'"));
            return true;
           }
-          function inspectStructuralYaml(text){
-           let scalarIndent=null;
-           for(const line of text.split('\n')){
-            const indent=line.match(/^ */)[0].length,blank=line.trim()==='';
-            if(scalarIndent!==null){
-             if(blank||indent>scalarIndent)continue;
-             scalarIndent=null;
-            }
-            if(blank||line.trimStart().startsWith('#'))continue;
-            need(!line.includes('\t'));
-            need(!/[&*][A-Za-z_]/.test(line)&&!/^ *<<\s*:/.test(line));
-            if(/:\s*[|>][+-]?\s*(?:#.*)?$/.test(line))scalarIndent=indent;
-           }
-          }
-          function fixedStepEnvironment(step){
-           const headers=[...step.text.matchAll(/^        env:([^\n]*)\n/gm)];same(headers.length,1);same(headers[0][1],'');
-           const start=headers[0].index+headers[0][0].length,entries=new Map();let offset=start;
-           for(const line of step.text.slice(start).split('\n')){
-            if(line===''){offset++;continue;}
-            if(!line.startsWith('          '))break;
-            const match=/^          ([A-Z_][A-Z0-9_]*): (.+)$/.exec(line);need(match&&!entries.has(match[1]));
-            entries.set(match[1],{value:match[2],valueStart:offset+10+match[1].length+2});offset+=line.length+1;
-           }
-           return entries;
-          }
-          export function validateKeyScopes(text){
-           inspectStructuralYaml(text);
-           const blocks=jobBlocks(text),expected=new Set(),open='$'+'{{',close='}'+'}',context=['se','crets'].join(''),body=' '+context+'.AFW_SYN_CHECKPOINT_KEY ',canonical=open+body+close;
-           for(const job of LEGACY.slice(1)){
-            for(const id of ['custody','seal','own_open'])expected.add(job+':'+id);
-            if(['positive_consume','reduction_consume_a','reduction_consume_b'].includes(job))expected.add(job+':producer_open');
-           }
-           for(const {job}of PRIVATE_PEERS)expected.add('reduction_consume_b:peer_open_'+job);
-           same(expected.size,26);
-           const root=[...text.matchAll(/^jobs:\n/gm)];same(root.length,1);
-           const sectionStart=root[0].index+root[0][0].length,positions=new Map([...text.slice(sectionStart).matchAll(/^  ([a-z_]+):\n/gm)].map(match=>[match[1],sectionStart+match.index]));
-           const seen=new Set(),approved=new Map(),environments=[];
-           for(const [job,block]of Object.entries(blocks)){
-            need([...LEGACY,'verify','keyless_controls','keyless_verify'].includes(job));same(text.slice(positions.get(job),positions.get(job)+block.length),block);
-            const first=block.indexOf('      - '),header=block.slice(0,first<0?block.length:first);
-            need(!/^\s+AFW_SYN_CHECKPOINT_KEY:/m.test(header));
-            const association=header.match(/^    environment: (.+)$/m);if(association)environments.push([job,association[1]]);
-            for(const step of jobSteps(block)){
-             const keyLines=[...step.text.matchAll(/^(\s+)AFW_SYN_CHECKPOINT_KEY: (.+)$/gm)];
-             if(keyLines.length===0)continue;
-             same(keyLines.length,1);same(keyLines[0][1].length,10);same(keyLines[0][2],canonical);
-             const identity=job+':'+step.id;need(expected.has(identity)&&!seen.has(identity));seen.add(identity);
-             need(step.text.startsWith('      - name: Generic custody '));
-             need(!/\b(?:fetch|npm|copyFile|execFileSync|World|finite-budget-world|cp\(|node --test|GITHUB_TOKEN|GH_ARTIFACT_TOKEN)\b/.test(step.text));need(step.text.includes('finite-checkpoint-custody.mjs'));
-             const entry=fixedStepEnvironment(step).get('AFW_SYN_CHECKPOINT_KEY');need(entry);same(entry.value,canonical);
-             const position=positions.get(job)+step.start+entry.valueStart;need(!approved.has(position));approved.set(position,{identity,end:position+canonical.length});
-            }
-           }
-           same(environments,LEGACY.slice(1).map(job=>[job,'afw-finite-syn-checkpoint']));same([...seen].sort(),[...expected].sort());same(approved.size,26);
-           let cursor=0,secretReferences=0;const matched=new Set();
+          // Fixed reviewed seed field policy. These forms never come from the text under validation.
+          export const KEY_SCOPE_FORMS=Object.freeze(Object.fromEntries(Object.entries({"run-name":["github.sha"],"job.if":["false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1","false && always() && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1","github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1","always() && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1","github.event_name == 'push' && github.event.head_commit.message == '@ROOT_MESSAGE' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1","false && github.event_name == 'push' && github.event.head_commit.message == '@ROOT_MESSAGE' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1","always() && github.event_name == 'push' && github.event.head_commit.message == '@ROOT_MESSAGE' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1","false && always() && github.event_name == 'push' && github.event.head_commit.message == '@ROOT_MESSAGE' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1"],"outputs.artifact-id":["steps.upload.outputs.artifact-id"],"outputs.artifact-digest":["steps.upload.outputs.artifact-digest"],"with.ref":["github.sha"],"step.if":["steps.pure_test.outcome == 'success'","always() && !cancelled() && steps.pure_test.outcome == 'success'","always() && !cancelled() && steps.scope.outcome == 'success'","always() && !cancelled() && steps.pure_seal.outcome == 'success'","always() && !cancelled() && steps.upload.outcome == 'success' && steps.upload.outputs.artifact-id != ''","always() && !cancelled() && steps.pure_receipt_1.outcome == 'failure'","always() && !cancelled() && steps.pure_receipt_wait2.outcome == 'success' && steps.pure_receipt_1.outcome == 'failure'","always() && !cancelled() && steps.pure_receipt_2.outcome == 'failure'","always() && !cancelled() && steps.pure_receipt_wait3.outcome == 'success' && steps.pure_receipt_2.outcome == 'failure'","always() && !cancelled() && steps.upload.outcome == 'success'","always() && !cancelled() && steps.pure_verified.outcome == 'success'","always() && !cancelled()","always() && !cancelled() && steps.custody.outcome == 'success'","always() && !cancelled() && steps.seal_prepare.outcome == 'success'","always() && !cancelled() && steps.seal.outcome == 'success'","always() && !cancelled() && steps.own_metadata.outcome == 'success'","always() && !cancelled() && steps.own_open.outcome == 'success'","steps.native.outcome == 'success'","steps.peer_download.outcome == 'success'","always() && !cancelled() && steps.suite_bootstrap.outcome == 'success' && steps.native.outcome == 'success'","always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'","always() && !cancelled() && steps.summary_pair.outcome == 'success'","always() && !cancelled() && steps.pair_written.outcome == 'success'"],"env.PURE_COMPLETE":["steps.pure_test.outcome == 'success' && steps.controls.outcome == 'success' && steps.preflight.outputs.all-passed == 'true'"],"env.PURE_TEST_OUTCOME":["steps.pure_test.outcome"],"env.CONTROLS_OUTCOME":["steps.controls.outcome"],"env.PREFLIGHT_OUTCOME":["steps.preflight.outcome"],"with.name":["github.sha","github.run_id"],"with.path":["runner.temp"],"with.github-token":["github.token"],"with.repository":["github.repository"],"with.run-id":["github.run_id"],"with.artifact-ids":["steps.upload.outputs.artifact-id","needs.contracts.outputs.artifact-id"],"env.ARTIFACT_ID":["steps.upload.outputs.artifact-id"],"env.DOWNLOADED":["steps.pure_receipt_1.outcome == 'success' || steps.pure_receipt_2.outcome == 'success' || steps.pure_receipt_3.outcome == 'success'"],"env.READBACK":["runner.temp"],"run":["steps.pure_test.outcome","steps.controls.outcome","steps.preflight.outputs.all-passed","steps.pure_verified.outcome","steps.pure_seal.outcome","steps.native.outcome","steps.own_verified.outcome","steps.peer_download.outcome","steps.peer_open_positive_prepare.outcome","steps.peer_open_positive_consume.outcome","steps.peer_open_reduction_prepare.outcome","steps.peer_open_reduction_consume_a.outcome","steps.peer_open_readonly.outcome","steps.aggregate.outcome","steps.summary_pair.outputs.status","steps.summary_upload.outcome","steps.pair_written.outputs.status"],"outputs.kind":["steps.seal.outputs.kind"],"env.PURE_ID":["needs.contracts.outputs.artifact-id"],"env.PURE_DIGEST":["needs.contracts.outputs.artifact-digest"],"env.PURE_MANIFEST_SHA":["needs.contracts.outputs.manifest-sha256"],"env.GH_ARTIFACT_TOKEN":["github.token"],"env.COMMAND_OK":["steps.native.outcome == 'success'","steps.native.outcome == 'success' && steps.aggregate.outcome == 'success'"],"env.OWN_ARTIFACT_ID":["steps.upload.outputs.artifact-id"],"env.OWN_DIGEST":["steps.upload.outputs.artifact-digest"],"env.OWN_KIND":["steps.seal.outputs.kind"],"env.PRODUCER_ID":["needs.positive_prepare.outputs.artifact-id","needs.reduction_prepare.outputs.artifact-id"],"env.PRODUCER_DIGEST":["needs.positive_prepare.outputs.artifact-digest","needs.reduction_prepare.outputs.artifact-digest"],"env.PRODUCER_KIND":["needs.positive_prepare.outputs.kind","needs.reduction_prepare.outputs.kind"],"outputs.safe-id":["steps.summary_upload.outputs.artifact-id"],"outputs.safe-digest":["steps.summary_upload.outputs.artifact-digest"],"env.PURE_BINDING_OUTCOME":["steps.pure_binding.outcome"],"env.NATIVE_OUTCOME":["steps.native.outcome"],"env.AGGREGATE_OUTCOME":["steps.aggregate.outcome"],"env.OWN_METADATA_OUTCOME":["steps.own_metadata.outcome"],"env.OWN_OPEN_OUTCOME":["steps.own_open.outcome"],"env.OWN_VERIFIED_OUTCOME":["steps.own_verified.outcome"],"env.NATIVE_ID":["steps.upload.outputs.artifact-id"],"env.NATIVE_DIGEST":["steps.upload.outputs.artifact-digest"],"env.NATIVE_KIND":["steps.seal.outputs.kind"],"env.AFW_SUITE_NEEDS":["toJSON(needs)"],"outputs.manifest-sha256":["steps.pure_verified.outputs.manifest-sha256"]}).map(([field,forms])=>[field,Object.freeze(forms)])));
+          export const KEY_SCOPE_PRECHECK="set -euo pipefail\numask 077\ntest -z \"${AFW_SYN_CHECKPOINT_KEY+x}\"\nnode --input-type=module <<'NODE_KEY_SCOPE_PRECHECK'\nimport {readFile} from 'node:fs/promises';\ntry{const A=await import(process.env.RUNNER_TEMP+'/afw-suite-adapter.mjs');if(A.validateKeyScopes(await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8'))!==true)throw Error();}catch{console.log('key_scope_precheck_rejected');process.exitCode=1;}\nNODE_KEY_SCOPE_PRECHECK\n";
+          const YAML_INTEGRITY='sha512-2AvhNX3mb8zd6Zy7INTtSpl1F15HW6Wnqj0srWlkKLcpYl/gMIMJiyuGq2KeI2YFxUPjdlB+3Lc10seMLtL4cA==';
+          function loadKeyScopeYaml(){
+           requireKeyless();
+           need(typeof process.env.GITHUB_WORKSPACE==='string'&&process.env.GITHUB_WORKSPACE.length>0);
+           const checkout=realpathSync(process.env.GITHUB_WORKSPACE);same(realpathSync(process.cwd()),checkout);
+           const packagePath=join(checkout,'package.json'),lockPath=join(checkout,'package-lock.json'),moduleRoot=join(checkout,'node_modules','yaml');
+           same(realpathSync(packagePath),packagePath);same(realpathSync(lockPath),lockPath);same(realpathSync(moduleRoot),moduleRoot);
+           const packageJSON=JSON.parse(readFileSync(packagePath,'utf8'));same(packageJSON.name,'agent-friendly-web');same(packageJSON.devDependencies.yaml,'2.9.0');
+           const bytes=readFileSync(lockPath),lockBlob=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');same(lockBlob,SOURCE_PINS.lockBlob);
+           const lock=JSON.parse(bytes.toString('utf8'));same(lock.packages['node_modules/yaml'].version,'2.9.0');same(lock.packages['node_modules/yaml'].integrity,YAML_INTEGRITY);
+           const metadataPath=join(moduleRoot,'package.json');same(realpathSync(metadataPath),metadataPath);
+           const metadata=JSON.parse(readFileSync(metadataPath,'utf8'));same(metadata.name,'yaml');same(metadata.version,'2.9.0');
+           const checkoutRequire=createRequire(packagePath),resolved=checkoutRequire.resolve('./node_modules/yaml');
+           same(realpathSync(resolved),resolved);need(resolved.startsWith(moduleRoot+sep));
+           const YAML=checkoutRequire(resolved);for(const method of ['parseAllDocuments','isMap','isSeq','isScalar','isAlias','isPair'])same(typeof YAML[method],'function');
+           return YAML;
+          }
+          function expressionTokens(value){
+           need(typeof value==='string'&&value.length>0);const tokens=[];
+           for(let at=0;at<value.length;){
+            if(/\s/.test(value[at])){at++;continue;}
+            if(value[at]==="'"){
+             let literal='',closed=false;at++;
+             while(at<value.length){if(value[at]==="'"){if(value[at+1]==="'"){literal+="'";at+=2;continue;}at++;closed=true;break;}literal+=value[at++];}
+             need(closed);tokens.push(['string',literal]);continue;
+            }
+            const word=/^[A-Za-z_][A-Za-z0-9_-]*/.exec(value.slice(at));if(word){tokens.push(['word',word[0]]);at+=word[0].length;continue;}
+            const number=/^(?:0|[1-9][0-9]*)(?:\.[0-9]+)?/.exec(value.slice(at));if(number){tokens.push(['number',number[0]]);at+=number[0].length;continue;}
+            const operator=/^(?:&&|\|\||==|!=|<=|>=|[!().,\[\]<>])/.exec(value.slice(at));need(operator);tokens.push(['operator',operator[0]]);at+=operator[0].length;
+           }
+           need(tokens.length>0);
+           for(const [kind,token]of tokens){
+            if(kind==='word')need(!/^secrets$/i.test(token)&&!/^AFW_SYN_CHECKPOINT_KEY$/i.test(token));
+            if(kind==='string')need(!/^AFW_SYN_CHECKPOINT_KEY$/i.test(token));
+           }
+           return tokens;
+          }
+          function expressionForm(value,field){
+           const tokens=expressionTokens(value);
+           // Only the message literal in an already fixed complete job guard is opaque.
+           if(field==='job.if')for(let n=0;n+8<tokens.length;n++){
+            const words=tokens.slice(n,n+9).map(x=>x[1]);
+            if(words.join(' ')==='github . event . head_commit . message == '+tokens[n+8][1]&&tokens[n+8][0]==='string')tokens[n+8]=['string','@ROOT_MESSAGE'];
+           }
+           return JSON.stringify(tokens);
+          }
+          const FIXED_SCOPE_FORMS=new Map(Object.entries(KEY_SCOPE_FORMS).map(([field,forms])=>[field,new Set(forms.map(value=>expressionForm(value,field)))]));
+          function expressionField(path){
+           if(path.length===1&&path[0]==='run-name')return 'run-name';
+           if(path[0]!=='jobs')return null;
+           if(path.length===3&&path[2]==='if')return 'job.if';
+           if(path.length===4&&path[2]==='outputs')return 'outputs.'+path[3];
+           if(path[2]!=='steps'||typeof path[3]!=='number')return null;
+           if(path.length===5&&path[4]==='if')return 'step.if';
+           if(path.length===5&&path[4]==='run')return 'run';
+           if(path.length===6&&['with','env'].includes(path[4]))return path[4]+'.'+path[5];
+           return null;
+          }
+          function inspectActionsString(value,path,isKey=false,approved=false){
+           const open='$'+'{{',close='}'+'}';need(typeof value==='string');
+           if(isKey){need(!value.includes(open));return 0;}
+           if(approved)return 1;
+           const field=expressionField(path),implicit=field==='job.if'||field==='step.if';let cursor=0,count=0;
            for(;;){
-            const start=text.indexOf(open,cursor);if(start<0)break;
-            const end=text.indexOf(close,start+open.length);need(end>=0);const expression=text.slice(start+open.length,end);need(!expression.includes(open));
-            if(/secrets/i.test(expression)){
-             same(expression,body);const slot=approved.get(start);need(slot&&!matched.has(start));same(slot.end,end+close.length);matched.add(start);secretReferences++;
+            const start=value.indexOf(open,cursor);if(start<0)break;
+            let at=start+open.length,quoted=false,end=-1;
+            for(;at<value.length;at++){
+             need(!value.startsWith(open,at));
+             if(value[at]==="'"){if(quoted&&value[at+1]==="'"){at++;continue;}quoted=!quoted;continue;}
+             if(!quoted&&value.startsWith(close,at)){end=at;break;}
             }
-            cursor=end+close.length;
+            need(end>=0&&!quoted);const body=value.slice(start+open.length,end);need(field&&FIXED_SCOPE_FORMS.get(field)?.has(expressionForm(body,field)));
+            if(implicit)need(start===0&&end+close.length===value.length);
+            cursor=end+close.length;count++;
            }
-           same(secretReferences,26);same(matched.size,approved.size);return true;
+           if(implicit&&count===0)need(FIXED_SCOPE_FORMS.get(field)?.has(expressionForm(value,field)));
+           return 0;
+          }
+          export function validateKeyScopes(text){
+           try{
+            requireKeyless();need(typeof text==='string'&&Buffer.byteLength(text,'utf8')<=524288);need(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.from(text,'utf8'))===text);
+            const YAML=loadKeyScopeYaml(),documents=YAML.parseAllDocuments(text,{version:'1.2',schema:'core',strict:true,uniqueKeys:true,stringKeys:false,merge:false,customTags:[],prettyErrors:false,logLevel:'silent'});
+            same(documents.length,1);const document=documents[0];same(document.errors.length,0);same(document.warnings.length,0);
+            need(document.directives&&document.directives.yaml?.explicit===false&&document.directives.yaml.version==='1.2');need(document.directives.docStart!==true);
+            same(Object.keys(document.directives.tags),['!!']);same(document.directives.tags['!!'],'tag:yaml.org,2002:');need(!/^\uFEFF?%/m.test(text));
+            const records=[];let nodes=0;
+            const walk=(node,path,depth,isKey=false)=>{
+             need(depth<=64);need(++nodes<=20000);
+             if(node===null){need(path.length===2&&path[0]==='on'&&path[1]==='workflow_dispatch');return;}
+             need(node&&typeof node==='object'&&!YAML.isAlias(node)&&!node.anchor&&!node.tag);
+             if(YAML.isScalar(node)){
+              need(node.value===null||typeof node.value==='string'||typeof node.value==='boolean'||typeof node.value==='number'&&Number.isFinite(node.value));
+              if(isKey)need(typeof node.value==='string');
+              if(typeof node.value==='string')records.push({node,path,isKey});
+              else need(!['job.if','step.if'].includes(expressionField(path)));
+              return;
+             }
+             if(YAML.isMap(node)){
+              const keys=new Set();for(const pair of node.items){need(++nodes<=20000&&YAML.isPair(pair)&&YAML.isScalar(pair.key)&&typeof pair.key.value==='string');const key=pair.key.value;need(!keys.has(key)&&key!=='<<'&&!/^secrets$/i.test(key));keys.add(key);walk(pair.key,path.concat(key),depth+1,true);walk(pair.value,path.concat(key),depth+1);}
+              return;
+             }
+             if(YAML.isSeq(node)){for(let n=0;n<node.items.length;n++)walk(node.items[n],path.concat(n),depth+1);return;}
+             need(false);
+            };
+            walk(document.contents,[],0);
+            const map=node=>{need(YAML.isMap(node));return node;},pairs=node=>map(node).items,get=(node,key)=>pairs(node).find(pair=>pair.key.value===key)?.value;
+            const scalar=node=>{need(YAML.isScalar(node)&&typeof node.value==='string');return node.value;};
+            const plain=(node,value)=>{same(scalar(node),value);same(node.type,'PLAIN');need(Array.isArray(node.range)&&node.range.length===3);same(text.slice(node.range[0],node.range[1]),value);};
+            const jobs=map(get(document.contents,'jobs')),names=pairs(jobs).map(pair=>pair.key.value),qualifier=names.includes('keyless_controls')||names.includes('keyless_verify');
+            same(names,[...LEGACY,'verify',...(qualifier?['keyless_controls','keyless_verify']:[])]);
+            const expected=new Set();for(const job of LEGACY.slice(1)){for(const id of ['custody','seal','own_open'])expected.add(job+':'+id);if(['positive_consume','reduction_consume_a','reduction_consume_b'].includes(job))expected.add(job+':producer_open');}
+            for(const {job}of PRIVATE_PEERS)expected.add('reduction_consume_b:peer_open_'+job);same(expected.size,26);
+            const approvedKeys=new Set(),approvedValues=new Set(),seen=new Set(),environments=[],stepTables=new Map(),open='$'+'{{',close='}'+'}',canonical=open+' '+['se','crets'].join('')+'.AFW_SYN_CHECKPOINT_KEY '+close;
+            for(const pair of pairs(jobs)){
+             const job=pair.key.value,body=map(pair.value),environment=get(body,'environment');if(environment!==undefined){plain(environment,'afw-finite-syn-checkpoint');environments.push([job,environment.value]);}
+             const sequence=get(body,'steps');need(YAML.isSeq(sequence));const ids=new Set(),steps=[];
+             for(let index=0;index<sequence.items.length;index++){
+              const step=map(sequence.items[index]),idNode=get(step,'id'),id=idNode===undefined?null:scalar(idNode);for(const field of ['name','run','uses','shell','if']){const value=get(step,field);if(value!==undefined)scalar(value);}if(id!==null){need(/^[a-z_][a-z_0-9]*$/.test(id)&&!ids.has(id));ids.add(id);}steps.push({step,id,index});
+              const env=get(step,'env');if(env===undefined)continue;
+              for(const entry of pairs(env)){
+               if(!/^AFW_SYN_CHECKPOINT_KEY$/i.test(entry.key.value))continue;
+               plain(entry.key,'AFW_SYN_CHECKPOINT_KEY');plain(entry.value,canonical);
+               const identity=job+':'+id;need(expected.has(identity)&&!seen.has(identity));seen.add(identity);approvedKeys.add(entry.key);approvedValues.add(entry.value);
+               const name=scalar(get(step,'name')),run=scalar(get(step,'run'));need(name.startsWith('Generic custody ')&&run.includes('finite-checkpoint-custody.mjs'));
+               const decoded=records.filter(record=>record.path[0]==='jobs'&&record.path[1]===job&&record.path[2]==='steps'&&record.path[3]===index).map(record=>record.node.value).join('\n');
+               need(!/\b(?:fetch|npm|copyFile|execFileSync|World|finite-budget-world|cp\(|node --test|GITHUB_TOKEN|GH_ARTIFACT_TOKEN)\b/.test(decoded));
+              }
+             }
+             stepTables.set(job,steps);
+             if(LEGACY.slice(1).includes(job)){const needs=get(body,'needs');need(YAML.isSeq(needs)&&needs.items.some(node=>scalar(node)==='contracts'));const condition=scalar(get(body,'if'));need(!expressionTokens(condition.startsWith(open)&&condition.endsWith(close)?condition.slice(open.length,-close.length):condition).some(([kind,word])=>kind==='word'&&word==='always'));}
+            }
+            same(environments,LEGACY.slice(1).map(job=>[job,'afw-finite-syn-checkpoint']));same([...seen].sort(),[...expected].sort());same(approvedValues.size,26);
+            let references=0;for(const record of records){
+             if(record.isKey&&/^AFW_SYN_CHECKPOINT_KEY$/i.test(record.node.value))need(approvedKeys.has(record.node));
+             references+=inspectActionsString(record.node.value,record.path,record.isKey,approvedValues.has(record.node));
+            }
+            same(references,26);
+            const contracts=stepTables.get('contracts'),hook=contracts.filter(entry=>entry.id==='key_scope_precheck');same(hook.length,1);
+            const install=contracts.filter(entry=>get(entry.step,'name')!==undefined&&scalar(get(entry.step,'name'))==='Install the locked fixture dependencies');same(install.length,1);need(scalar(get(install[0].step,'run')).includes('npm ci --ignore-scripts --no-audit --no-fund'));
+            same(hook[0].index,install[0].index+1);need(hook[0].index<contracts.find(entry=>entry.id==='pure_test')?.index);
+            for(const key of ['if','continue-on-error','env','environment'])same(get(hook[0].step,key),undefined);
+            same(scalar(get(hook[0].step,'shell')),'bash');same(scalar(get(hook[0].step,'run')),KEY_SCOPE_PRECHECK);
+            return true;
+           }catch{throw Error('key_scope_rejected');}
+          }
+          export function keyScopeParserProvenance(text){
+           need(validateKeyScopes(text)===true);hex(CONTEXT.source,40);hex(CONTEXT.workflowBlob,40);
+           const bytes=Buffer.from(text,'utf8'),blob=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');same(blob,CONTEXT.workflowBlob);
+           const value={version:'2.9.0',lockBlob:SOURCE_PINS.lockBlob,checkoutResolved:true,positiveSourceValidated:true,source:CONTEXT.source,workflowBlob:CONTEXT.workflowBlob};
+           const line='AFW_KEY_SCOPE_PARSER/1 '+JSON.stringify(value);need(Buffer.byteLength(line,'utf8')<=1024);return line;
           }
           const NATIVE_HASHES={positive_prepare:'a5fb9018a15148200d9f974d88fceddd7b969dd1da34aec5d1d177e627a4bb1f',positive_consume:'04372215e782289cf9f9369deb3e41b692c78c7ba69db390170edee7eeb5f1b5',reduction_prepare:'0884130dfd71b58991ab0a5810d45ceb86140ba1037eb3e69a61199bc813f3f5',reduction_consume_a:'cafaa1cfe677ea408c3bd0430d87aefbac615ec55ceb621f85f1b161d3354fe4',readonly:'b5fa881c10523d636b77a787b7e92bcc14bc64e13d658bd34476f00e1d4e9f0c',reduction_consume_b:'c0566bba404f2a61b8d22f0b80272e2b1322f4799ef14f248e28736511a1d378'};
           export function validateFixedCases(text){
            const blocks=jobBlocks(text);
            for(const [job,h]of Object.entries(NATIVE_HASHES)){
             const match=blocks[job].match(/      - name: Execute fixed [^\n]+\n[\s\S]*?(?=\n      - name:)/);need(match);same(sha(match[0]),h);
            }
            for(const [job,cases]of Object.entries({positive_prepare:['P1'],positive_consume:['P1'],reduction_prepare:['D1','D2','D3','D4'],reduction_consume_a:['D1','D2'],readonly:['R1','R2','R3'],reduction_consume_b:['D3','D4']}))same(blocks[job].match(/^      FIXED_CASES: '([^']+)'$/m)?.[1],JSON.stringify(cases));
            const seal=fixedStep(blocks.contracts,'pure_seal'),upload=fixedStep(blocks.contracts,'upload');need(seal.start<upload.start);const full=seal.text+upload.text;same(Buffer.byteLength(full),19458);same(sha(full),'8b239b4a5e7e4d5f424fef645a464e006c039a47763224902c4221bba2666231');return true;
@@ -385,19 +479,19 @@
            }
            let pure=null,proof=null;
            if(outcomes.pureBinding==='success')pure=parseProjectionReceipt(await io.read(join(process.env.RUNNER_TEMP,'afw-native-private/pure-assignment.json')));
            if(outcomes.ownValidation==='success'&&assignment?.kind==='reduction-result-b'&&outcomes.native==='success'&&outcomes.aggregate==='success')proof=parseProjectionReceipt(await io.read(join(process.env.RUNNER_TEMP,'afw-native-private/suite-proof.json')));
            return {pure,assignment,proof};
           }
           NODE_SUITE_ADAPTER
           cat >"$RUNNER_TEMP/afw-suite-controls.mjs" <<'NODE_SUITE_CONTROLS'
           import assert from 'node:assert/strict';
-          import {readFile,mkdir,readdir} from 'node:fs/promises';
+          import {readFile,mkdir,readdir,writeFile,symlink} from 'node:fs/promises';
           import {spawnSync} from 'node:child_process';
           import * as A from './afw-suite-adapter.mjs';
           import {validatePair,verifyRoute,verifySeven,reconcileSuite,receiverControlsGuard,captureNeeds,routeCapturedNeeds} from './afw-suite-verifier.mjs';
           export const CONTROL_IDS=Object.freeze(['dag_peer_inventory','key_scope','fixed_case_counts','metadata_custody_binding','incomplete_or_contradictory','coherent_current_pair']);
           const clone=v=>structuredClone(v),reject=f=>assert.throws(f),H='a'.repeat(64),id=n=>String(100+n);
           function jobs(){return A.LEGACY.map((name,n)=>({id:100+n,name,status:n===6?'in_progress':'completed',conclusion:n===6?null:'success',started_at:new Date(1700000000000+n*10000).toISOString(),completed_at:n===6?null:new Date(1700000009000+n*10000).toISOString()}));}
           function meta(job,kind,artifactId,digest){return {id:Number(artifactId),name:A.artifactName(job),expired:false,digest:'sha256:'+digest,size_in_bytes:300,expires_at:new Date(Date.now()+86400000).toISOString(),workflow_run:{id:Number(A.CONTEXT.run),head_sha:A.CONTEXT.source,head_branch:A.CONTEXT.ref.slice(11)}};}
           function pureFixture(){
            const files=new Map(),put=(n,v)=>files.set(n,Buffer.from(JSON.stringify(v))),common={source:A.CONTEXT.source,run:A.CONTEXT.run,attempt:'1'};
@@ -495,18 +589,33 @@
            const args={...fixture.args,id,uploaded},route=await verifyRoute(args,io);
            assert.equal(route.valid,null);assert.equal(route.readback.status,'unavailable');assert.equal(route.readback.reason,reason);assert.equal(route.readback.proof,'absent');assert.equal(route.readback.artifactId,artifactId);
            assert.equal(counts.safeMetadata,metadataStatus===null?0:1);assert.equal(counts.safeZip,0);assert.equal(counts.jobs,0);assert.deepEqual(counts.direct,[]);
            const reconciled=await reconcileSuite({route,jobInventory:null,needs:fixture.needs},io);
            assert.equal(reconciled.valid,null);assert.deepEqual(reconciled.readback,{...route.readback,upstream:'all_seven_success',accepted:false});
            assert.equal(counts.jobs,1);assert.equal(counts.safeMetadata,metadataStatus===null?0:1);assert.equal(counts.safeZip,0);
            assert.deepEqual(counts.direct.sort(),A.LEGACY.map(name=>fixture.needs[name].outputs['artifact-id']).sort());
            for(const key of ['rawZipBytes','rawZipSha256','resultBytes','resultSha256','manifestBytes','manifestSha256'])assert.equal(reconciled.readback[key],null);
           }
+          function parserRejectionControls(text){
+           const base=process.env.RUNNER_TEMP+'/afw-yaml-loader-controls',script="import {readFile} from 'node:fs/promises';const A=await import(process.env.RUNNER_TEMP+'/afw-suite-adapter.mjs');const text=await readFile(process.env.AFW_SCOPE_SOURCE,'utf8');let rejected=false;try{A.validateKeyScopes(text);}catch(e){rejected=e instanceof Error&&e.message==='key_scope_rejected';}if(!rejected)process.exitCode=1;";
+           return (async()=>{
+            await mkdir(base,{mode:0o700});
+            for(const kind of ['missing','wrong_version','temp_resolved','unexpected_api']){
+             const root=base+'/'+kind;await mkdir(root,{mode:0o700});await writeFile(root+'/package.json',await readFile('package.json'));await writeFile(root+'/package-lock.json',await readFile('package-lock.json'));
+             if(kind!=='missing'){
+              await mkdir(root+'/node_modules',{mode:0o700});
+              if(kind==='temp_resolved')await symlink(process.cwd()+'/node_modules/yaml',root+'/node_modules/yaml','dir');
+              else{await mkdir(root+'/node_modules/yaml',{mode:0o700});await writeFile(root+'/node_modules/yaml/package.json',JSON.stringify({name:'yaml',version:kind==='wrong_version'?'2.8.0':'2.9.0',main:'index.cjs'}));await writeFile(root+'/node_modules/yaml/index.cjs','module.exports = {};\n');}
+             }
+             const result=spawnSync(process.execPath,['--input-type=module','-e',script],{cwd:root,env:{...process.env,GITHUB_WORKSPACE:root,AFW_SCOPE_SOURCE:process.cwd()+'/.github/workflows/afw-finite-budget-qualification.yml'},stdio:'pipe',timeout:10000,maxBuffer:4096});assert.equal(result.status,0,'parser_loader_control_rejected');assert.equal(result.error,undefined);
+            }
+           })();
+          }
           function secretFixture(style='canonical'){
            const open='$'+'{{',close='}'+'}',context=['se','crets'].join(''),key='AFW_SYN_CHECKPOINT_KEY';
            let body=context+'.'+key;
            if(style==='bracket')body=context+"['"+key+"']";
            if(style==='dynamic')body=context+'[env.KEY_NAME]';
            if(style==='case')body=context.toUpperCase()+'.'+key;
            if(style==='object')body='toJSON('+context+')';
            return open+' '+body+' '+close;
           }
@@ -538,18 +647,19 @@
            assert.equal(captured.valid,expected.contextValid);assert.equal(route.valid,null);
            assert.equal(route.readback.marker,'AFW_COHERENT_SUITE_READBACK/1');assert.equal(route.readback.status,'unavailable');assert.equal(route.readback.reason,expected.reason);assert.equal(route.readback.proof,'absent');assert.equal(route.readback.accepted,false);
            assert.equal(route.readback.upstream,kind==='controls'?'not_applicable':'unverified');
            assert.equal(route.readback.artifactId,expected.id??null);assert.equal(route.readback.uploadedDigest,expected.digest??null);
            assert.deepEqual(counts,{metadata:expected.httpStatus?1:0,zip:0,source:0,jobs:0});
            for(const key of ['metadataBytes','metadataDigest','rawZipBytes','rawZipSha256','resultBytes','resultSha256','manifestBytes','manifestSha256','expiresAt','producerStatus'])assert.equal(route.readback[key],null);
            const line=JSON.stringify(route.readback)+'\n';assert(Buffer.byteLength(line)<=4096);assert.equal(line.split('\n').length,2);
           }
           export async function runControls(){
+           const currentSource=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');assert.equal(A.validateKeyScopes(currentSource),true);console.log(A.keyScopeParserProvenance(currentSource));
            const inventory=CONTROL_IDS.map(id=>({id,status:'not_executed'})),expected={context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES};
            let firstFailure=null,currentFamily=null;
            const sub=async(id,fn)=>{
             console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'start',...A.FLAGS}));
             try{await fn();console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'passed',...A.FLAGS}));}
             catch{console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'failed',...A.FLAGS}));throw Error('fixed_subcase_failed');}
            };
            const cases=[
            async()=>{
@@ -595,18 +705,64 @@
              expectMutationRejected(text,'positive_prepare','custody',keyLine,keyLine+'\n          OTHER_KEY: '+expression,A.validateKeyScopes);
              expectMutationRejected(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive','      OUTER_ALIAS: '+expression+'\n      AFW_BUDGET_GROUP: positive',A.validateKeyScopes);
              const changed=mutatePreamble(text,'permissions:\n','env:\n  WORKFLOW_ALIAS: '+expression+'\npermissions:\n');expectTextRejected(changed,A.validateKeyScopes);
             });
             await sub('secret_run_and_ambiguous_context_references_rejected',async()=>{
              const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8'),normal=secretFixture(),keyLine='          AFW_SYN_CHECKPOINT_KEY: '+normal;
              expectMutationRejected(text,'positive_prepare','install','          umask 077\n','          umask 077\n          printf '+secretFixture()+'\n',A.validateKeyScopes);
              for(const style of ['bracket','dynamic','case','object'])expectMutationRejected(text,'positive_prepare','custody',keyLine,'          AFW_SYN_CHECKPOINT_KEY: '+secretFixture(style),A.validateKeyScopes);
              expectMutationRejected(text,'positive_prepare','custody','        env:\n','        env: &custody_alias\n',A.validateKeyScopes);
+          
+                       // New key-scope regression assertions: written before the parser repair; not run during preparation.
+                       const extra=body=>'      EXTRA_SCOPE: '+body+'\n      AFW_BUDGET_GROUP: positive',open='$'+'{{',close='}'+'}',secret=['se','crets'].join(''),key='AFW_SYN_CHECKPOINT_KEY',expr=body=>open+' '+body+' '+close;
+                       const hidden=[
+                        expr("format('"+close+"', "+secret+'.'+key+')'),
+                        expr("format('it''s "+close+"', "+secret+'.'+key+')'),
+                        expr(secret.toUpperCase()+'.'+key),
+                        expr(secret+"['"+key+"']"),
+                        expr('fromJSON(toJSON('+secret+'))'),
+                        expr("env['"+key+"']"),
+                        expr('env.'+key),
+                        expr("format('"+close+"', github.token)"),
+                        open+' github.sha',
+                        expr('github.sha '+open+' github.token '+close)
+                       ];
+                       for(const value of hidden)expectMutationRejected(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive',extra(value),A.validateKeyScopes);
+                       expectMutationRejected(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive','      "\\x41FW_SYN_CHECKPOINT_KEY": exposed\n      AFW_BUDGET_GROUP: positive',A.validateKeyScopes);
+                       expectMutationRejected(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive','      EXTRA_SCOPE: "'+expr(secret+'.'+key).replace('$','\\x24')+'"\n      AFW_BUDGET_GROUP: positive',A.validateKeyScopes);
+                       expectMutationRejected(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive','      "'+expr(secret+'.'+key)+'": ignored\n      AFW_BUDGET_GROUP: positive',A.validateKeyScopes);
+                       const ifLine=actualRegion(text,'positive_prepare','seal').text.match(/^        if: .+$/m)[0];
+                       for(const condition of [secret+'.'+key,"contains('"+close+"', "+secret+'.'+key+')','github.unknown == true',expr("format('it''s "+close+"', "+secret+'.'+key+')')])expectMutationRejected(text,'positive_prepare','seal',ifLine,'        if: '+condition,A.validateKeyScopes);
+                       expectMutationRejected(text,'positive_prepare','seal',ifLine,'        if: >-\n          '+secret+'.'+key,A.validateKeyScopes);
+                       for(const value of ['"'+normal+'"','!!str '+normal,'&bound '+normal])expectMutationRejected(text,'positive_prepare','custody',keyLine,'          '+key+': '+value,A.validateKeyScopes);
+                       expectMutationRejected(text,'positive_prepare','custody','          '+key+': ','          "\\x41FW_SYN_CHECKPOINT_KEY": ',A.validateKeyScopes);
+                       expectMutationRejected(text,'positive_prepare','install','        id: install','        id: custody',A.validateKeyScopes);
+                       expectMutationRejected(text,'positive_prepare','custody','        env:\n','        env:\n          DUPLICATE: one\n          DUPLICATE: two\n',A.validateKeyScopes);
+                       expectMutationRejected(text,'positive_prepare',null,'    env:\n','    env: &outer\n',A.validateKeyScopes);
+                       for(const addition of ['x-scope: &scope {ok: value}\nx-alias: *scope\n','x-scope: {<<: {ok: value}}\n','x-scope: !!str ignored\n','x-scope: {1: value}\n','x-scope: {? [a, b]: value}\n','x-scope: [\n','permissions: {}\n','se'+'crets: inherit\n']){
+                        expectTextRejected(mutatePreamble(text,'permissions:\n',addition+'permissions:\n'),A.validateKeyScopes);
+                       }
+                       for(const prefix of ['%YAML 1.2\n---\n','%TAG !e! tag:example.invalid,2026:\n---\n','%TAG !! tag:yaml.org,2002:\n---\n'])expectTextRejected(prefix+text,A.validateKeyScopes);
+                       expectTextRejected(text+'\n---\nx: other\n',A.validateKeyScopes);
+                       expectTextRejected(mutatePreamble(text,'permissions:\n','x-depth: '+'['.repeat(65)+'x'+']'.repeat(65)+'\npermissions:\n'),A.validateKeyScopes);
+                       expectTextRejected(mutatePreamble(text,'permissions:\n','x-nodes: ['+Array(20001).fill('x').join(',')+']\npermissions:\n'),A.validateKeyScopes);
+                       expectTextRejected(text+'#'+'x'.repeat(524289),A.validateKeyScopes);
+                       const hook=actualRegion(text,'contracts','key_scope_precheck').text;
+                       expectMutationRejected(text,'contracts','key_scope_precheck',hook,'',A.validateKeyScopes);
+                       expectMutationRejected(text,'contracts','key_scope_precheck','        shell: bash','        continue-on-error: true\n        shell: bash',A.validateKeyScopes);
+                       expectMutationRejected(text,'contracts','key_scope_precheck','        shell: bash','        if: false\n        shell: bash',A.validateKeyScopes);
+                       const misplaced=mutateActual(text,'contracts','key_scope_precheck',hook,'');const first=actualRegion(misplaced,'contracts','scope');expectTextRejected(misplaced.slice(0,first.start)+hook+misplaced.slice(first.start),A.validateKeyScopes);
+                       const installStep=actualRegion(text,'positive_prepare','install').text,installName=installStep.match(/^      - name: .+$/m)[0],installRun=installStep.slice(installStep.indexOf('        run:'));
+                       expectMutationRejected(text,'positive_prepare','install',installName,'      - name: [unsupported]',A.validateKeyScopes);
+                       expectMutationRejected(text,'positive_prepare','install',installRun,'        run: [unsupported]\n',A.validateKeyScopes);
+                       for(const invalid of [null,undefined,1,{},Buffer.from('invalid')])reject(()=>A.validateKeyScopes(invalid));
+                       await parserRejectionControls(text);
+          
              const preamble=text.slice(0,[...text.matchAll(/^jobs:\n/gm)][0].index),runName=preamble.match(/^run-name: .+$/m)[0],changed=mutatePreamble(text,runName,'run-name: '+secretFixture());expectTextRejected(changed,A.validateKeyScopes);
             });
             await sub('inert_parent_environment_is_restored',async()=>{
              const before=process.env.AFW_SYN_CHECKPOINT_KEY;
              try{process.env.AFW_SYN_CHECKPOINT_KEY='INERT_SCOPE';reject(()=>A.requireKeyless());}
              finally{if(before===undefined)delete process.env.AFW_SYN_CHECKPOINT_KEY;else process.env.AFW_SYN_CHECKPOINT_KEY=before;}
              A.requireKeyless();
             });
            },
@@ -1144,18 +1300,29 @@
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
           NODE_SUITE_BOOTSTRAP
       - name: Install the locked fixture dependencies
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-locked-install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+      - name: Validate decoded key scope before any orchestration
+        id: key_scope_precheck
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module <<'NODE_KEY_SCOPE_PRECHECK'
+          import {readFile} from 'node:fs/promises';
+          try{const A=await import(process.env.RUNNER_TEMP+'/afw-suite-adapter.mjs');if(A.validateKeyScopes(await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8'))!==true)throw Error();}catch{console.log('key_scope_precheck_rejected');process.exitCode=1;}
+          NODE_KEY_SCOPE_PRECHECK
       - name: Check fixed fixture syntax, lint, inactive module and eight contracts
         id: pure_test
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           test "$(node -v)" = v22.23.4
           test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
@@ -3147,17 +3314,143 @@
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
+
+  keyless_controls:
+    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW DECODED KEY SCOPE QUALIFICATION 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
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
+      - name: Install the locked parser dependencies before validation
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-keyless-locked-install.log" 2>&1 || { echo locked_install_failed; exit 1; }
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
+    if: ${{ always() && github.event_name == 'push' && github.event.head_commit.message == 'AFW DECODED KEY SCOPE QUALIFICATION 20261113-R1' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
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

## Actual Source report appendix (factual outcomes and closure)



## 2026-11-13 — decoded YAML key-scope R1: FAILED / CLOSED; no qualification

Root's exact one-use release is docs ref7a441fa4b191f558a098e296d20ac97918425012, reviews/2026-11-13-key-scope-yaml-exact-keyless-release.md. This is a new structural key-scope unit; the previous coherent unit's historical disposition remains unchanged. Preparation claims were not test execution. The exact R1 attempt below has now executed on GitHub-hosted runners and FAILED; no Native acceptance or new runtime authority is established.

### Source, gate and single activation

- Existing Source feature branch: feat/finite-native-cleanup-20261101; main remained0c9c475b3ebaa970fc11d628b40e50a90cceb727.
- Inactive reviewed Source: b2d40d2c72cd6c29e8d0ba3d87306eac78587b1b after EOF normalization and PREP-I1's missing builtin imports. Root inactive gate is docs d639cc50bf2ab91d684fc5b1198459b39570f514.
- Exact active Source: afed5ff612fc8618962f8b372ad054672175077e, tree d61c882f5b2bdead9890f873a6e8c02291521289, F7 f8a3cac1977745f2998981abc1db22ae1d0d0152,355548 UTF-8 bytes,SHA2567d3edfa4657ccf0b3adc4954419aa3d4dcbcdcbe3f893571fb8166336b3f70e2.
- Exact one-use commit message: AFW DECODED KEY SCOPE QUALIFICATION 20261113-R1.
- One activation CAS, no force/no retry: expected72c10833654aa7226d8376e95d767455e1c144b2 -> exactafed5ff, success at2026-11-13 16:06:14UTC.
- Original eight job guards remained byte-exact false. All six afw-finite-syn-checkpoint associations and26 canonical AFW secret expressions remained only in those disabled jobs. Executed keyless_controls/keyless_verify had no AFW environment/key bindings. All four helper bodies, protected files, Native commands and scripts were frozen by the Root gate.
- Complete fixed45-field/96-form policy and passive expression inventory preparation report remains GitDB blob22ae185536fffc03f7e0c472fe0cc83bea4a4fa3 in this repository, read with fetch_blob; apply the subsequently reviewed EOF/PREP-I1/overlay metadata, not its superseded candidate identity. Complete tiny overlay patch is GitDB blob74f77164d33867f21682b5a472a9bd2d4f982760. No new Source leaf was added for either object.

| Helper | Bytes | SHA256 |
| --- | ---: | --- |
| NODE_SUITE_ADAPTER | 61225 | `ad4c08de403c02b10140245c46143b2fd83872aa44401e877a369a6a1485dea6` |
| NODE_SUITE_CONTROLS | 58832 | `3627dafe53c6b1c6d930cc8c6f747e5d9678ecc54438e6ae03213ee1f7f44ece` |
| NODE_SUITE_VERIFIER | 15099 | `94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf` |
| NODE_SAFE_ZIP | 13305 | `b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d` |

Both current keyless jobs emitted those exact program hashes. All five readiness flags remained false. No Source program ran on the PC; only authorized current keyless job logs and public metadata were read. No private/pure archive, private/pure log or actual AFW key was fetched.

### Actual current attempt and terminal freeze

[Run43459300386/attempt1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43459300386): repository1347578006, push, exact Source branch/path/head/message. Created2026-11-13T16:06:16Z; terminal failure recorded2026-11-13T16:07:15Z. This was the only current head run and only attempt1. No rerun/autofix/new active overlay was performed.

| Job | ID | Status | Conclusion |
| --- | ---: | --- | --- |
| keyless_controls | 132001628683 | completed | failure |
| reduction_prepare | 132001631039 | completed | skipped |
| positive_prepare | 132001631052 | completed | skipped |
| contracts | 132001631806 | completed | skipped |
| readonly | 132001631903 | completed | skipped |
| reduction_consume_b | 132001631914 | completed | skipped |
| positive_consume | 132001632093 | completed | skipped |
| reduction_consume_a | 132001632145 | completed | skipped |
| verify | 132001633467 | completed | skipped |
| keyless_verify | 132002082733 | completed | failure |

All ten declared identities were reconciled and terminal before restoration. The original eight were skipped; both keyless jobs failed. Terminal gate was read at2026-11-13 16:07:53UTC. The contracts key_scope_precheck was SKIPPED: Source wiring/control inspection is separate from observed execution of that actual contracts step.

### Positive parser evidence before every negative

The locked parser install completed. At2026-11-13T16:06:59.0133970Z, the actual current Source positive produced exactly one bounded line:

```text
AFW_KEY_SCOPE_PARSER/1 {"version":"2.9.0","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","checkoutResolved":true,"positiveSourceValidated":true,"source":"afed5ff612fc8618962f8b372ad054672175077e","workflowBlob":"f8a3cac1977745f2998981abc1db22ae1d0d0152"}
```

This precedes the first dag subcase start at16:06:59.0138663Z, and therefore every counted negative fixture. It binds yaml2.9.0/exact lock/checkout resolution/current source/workflowBlob; missing-library rejection did not masquerade as a passed negative. PREP-I1's mandatory current-positive covering seam executed successfully. This positive is not full qualification.

### Controls failure and receiver result

Six families: completed2, passed1, failed1; firstFailure=key_scope. dag_peer_inventory passed; key_scope failed; fixed_case_counts,metadata_custody_binding,incomplete_or_contradictory,coherent_current_pair were not_executed.

Of the required32 subcases,6 started,5 passed,1 failed,26 were not executed. Actual observed results:

| Family | Subcase | Phase |
| --- | --- | --- |
| dag_peer_inventory | b_inventory_optional_nonexecuting_receiver | passed |
| dag_peer_inventory | mutation_setup_failure_cannot_count_as_validator_rejection | passed |
| dag_peer_inventory | actual_b_dependency_and_attempt_endpoint_targets | passed |
| key_scope | all_twenty_six_exact_crypto_step_bindings | passed |
| key_scope | global_secret_alias_and_outer_scope_references_rejected | passed |
| key_scope | secret_run_and_ambiguous_context_references_rejected | failed |

The failure is bounded to secret_run_and_ambiguous_context_references_rejected. The sanitized logs do not identify which assertion within that subcase failed. No parser-defect, mutation-setup or fixture cause is inferred and no fix was attempted under this consumed run authorization.

The independent receiver executed16/16 controls, all passed. It fetched and strictly verified the assigned SMALLSAFE pair but observed producerStatus=failed and correctly kept accepted=false; its job failed. Strict ZIP/schema/provenance validity does not convert failed producer controls into qualification.

Assigned current artifact (metadata only inspected by this worker): id14056095996, nameafw-coherent-suite-controls-safe-43459300386-1,1402 bytes, digestsha256:b02fce117243a4bdac3057ba19015416d207bbfb5096db2473ea27c8608cd0e8, expired=false, exact current run/head/branch. Root separately owns independent assigned SMALLSAFE inspection; this worker did not download it.

Receiver's bounded current readback:

```json
{
  "marker": "AFW_COHERENT_SUITE_READBACK/1",
  "kind": "controls",
  "source": "afed5ff612fc8618962f8b372ad054672175077e",
  "run": "43459300386",
  "attempt": 1,
  "artifactId": "14056095996",
  "uploadedDigest": "b02fce117243a4bdac3057ba19015416d207bbfb5096db2473ea27c8608cd0e8",
  "status": "verified",
  "reason": "none",
  "proof": "strict_current_safe_pair",
  "metadataBytes": 1402,
  "metadataDigest": "sha256:b02fce117243a4bdac3057ba19015416d207bbfb5096db2473ea27c8608cd0e8",
  "rawZipBytes": 1402,
  "rawZipSha256": "b02fce117243a4bdac3057ba19015416d207bbfb5096db2473ea27c8608cd0e8",
  "resultBytes": 1697,
  "resultSha256": "2092eb27275b596f85ac2bb77f4d9d2962e093d2c057442b17ffd3911188081e",
  "manifestBytes": 265,
  "manifestSha256": "5f1dab6cbf03796f3030ee357eee51369756890ed7d2869c486aba7cec2addc2",
  "expiresAt": "2026-11-20T16:07:00Z",
  "producerStatus": "failed",
  "upstream": "not_applicable",
  "accepted": false,
  "programHashes": {
    "adapter": "ad4c08de403c02b10140245c46143b2fd83872aa44401e877a369a6a1485dea6",
    "controls": "3627dafe53c6b1c6d930cc8c6f747e5d9678ecc54438e6ae03213ee1f7f44ece",
    "verifier": "94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf",
    "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
  },
  "operationalReadiness": false,
  "completePackage": false,
  "PCoff": false,
  "globalNativeDrainVerified": false,
  "sdkNamespaceEmptyVerified": false
}
```

### Any-outcome restoration and prefix preservation

After all10 terminal, one restoration CAS moved afed5ff -> b3f4f736b44c570e2b9c2900be2d0928d3a79d10 at2026-11-13 16:07:57UTC. Restoration commit points to the EXACT preunit treec6f985fa5dea6771442e835e38ed6754031dd7c1. Full F7 readback is byte-exact original blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc,126209B,SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a.

Full tree readback was untruncated3196 leaves/62 workflows and exactly preunitc6f985. Its original3195 leaves plus SAME report are preserved. The complete SAME report was still exact ac1b323410baa2319ada28c32b4a153e8fddd21c,224620 characters/224684 UTF-8 bytes,SHA25675e775709e5dd61087622b19f122fcac4eb6d5f038a606d2845d1b63c75b3e75 before this append. This section is appended after that entire unchanged prefix; no historical text is overwritten.

Pre-append reads confirm Source=b3f4f736b44c570e2b9c2900be2d0928d3a79d10, main0c9c475b3ebaa970fc11d628b40e50a90cceb727, restored-head runs0, and branch-active in_progress/queued/waiting/requested/pending each0. This append changes only this SAME report, on the closed Source tree; final head/tree/report/prefix/five-active/current-attempt readbacks are supplied to Root separately to avoid self-referential commit metadata.

R1 is CONSUMED / FAILED / CLOSED. Root's independent review remains pending. Actual Native/key/SDK/MF/Cloudflare/runtime/OAuth/OTP/permission/client/mail/Max/main/PR/chat/automation actions remain HELD; operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified remain false. No automatic retry or repeat is authorized. STOP.


## Root closure auditor result

{
  "source": "c0c65836a677b23949624bc9afc14f4c59012a62",
  "tree": "7b8922952555441abf96e8fe83f94c30e4de7f19",
  "prior3195LeavesExact": true,
  "leaves": 3196,
  "soleNewReport": "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
  "reportSha": "7096ec150ea9a4285930d96da85224b4f62b1e61",
  "reportChars": 234732,
  "F7exact": true,
  "mainUnchanged": true,
  "runId": "43459300386",
  "runSource": "afed5ff612fc8618962f8b372ad054672175077e",
  "runCompleted": true,
  "allDeclaredJobsTerminal": true,
  "declaredJobs": 10,
  "fiveBranchActiveStatusesZero": true,
  "all62WorkflowBlobsExact": true,
  "providerRuntimeRead": false,
  "operationalReadiness": false,
  "PCoff": false
}

Review return both spec compliance andcodequality withCritical/Important/Minor findings, exactsourcefile:line, strengths/evidence, noexecution. Tests alreadyrunfailed asabove; do not rerun. Recommend smallest correction for deterministicfixturecause and anyotherload-bearingnewdiffdefect, withoutalteringfrozenNative/caps or source/runtime authority. Root thenownsboundedfixloopandseparatecurrentcoveringrun.
