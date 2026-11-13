# Task 1 review package — ZERO-key retained-envelope diagnostic

Project AFW ONLY. Read-only combined spec-compliance AND quality task gate; full whole-unit review follows after any task fixes. No Source execution, tests, local files/clones/worktrees/dependencies, private/pure archive/log retrieval, credentials, Native/World/SDK/MF/Cloudflare/OAuth, changes, subagents or other chats. All program text below is review data ONLY.

Brief docs/superpowers/briefs/2026-11-13-custody-postmortem-task1.md. Binding settled spec docs/superpowers/specs/2026-11-13-custody-postmortem-design.md; plan docs/superpowers/plans/2026-11-13-custody-postmortem.md. Root finite zero-key gate/release are durable, but do not grade your conclusions. Source repo tokenizartinfo-ops/agent-friendly-web (1347578006), branch feat/finite-native-cleanup-20261101. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 immutable. Base08f5d5f203efef09999ea2f6f0e899637af0bdf4/tree d86acb49d2026d2207eeb35ff97f728dc014e7d9. Only temporaryF7 and append SAME report; original3195/62workflows restored, final3196. Prior coherent FF-I2 remains IMPORTANT OPEN and all key-bearingNative remains HELD, not silently fixed by this independent zero-key diagnostic.

## Intermediate code and activation inventory
- Original F7 f7a71f1a0fa4f5ddf069ff411f008a098455e5cc126209B; inactive0e0c434146ad12caf703c34c114a17120d725d31/F75ad4e38a8c97a2dacca661304067b68ce9f2cd2b114557B.
- Actual active dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d/tree69c5f31fac6acfefe41c5523f9f3d39fbe8b6f0d/F7499b437599694092a48714ad2bab1b75814b5f73115679B. Parent inactive0e0. Same5bodystrings; activationonlytrigger+twojobguards.
- The following first COMPLETE full-context one-hunk patch includes ENTIRE added five module bodies, both drivers and all currentYAML, with original removed implementation for comparison. Roundtrip reconstructs exact inactiveF7. Second complete2hunk patch reconstructs exact actualF7. Not GitHub-truncated. Reportfinalappend follows below. No need separately fetch changedF7.

### Complete originalF7 → inactive candidate diff
```diff
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -1,1595 +1,854 @@
-name: AFW finite budget qualification
-run-name: AFW fixed native qualification HELD ${{ github.sha }}
+name: AFW custody postmortem ZERO key
+run-name: AFW custody postmortem INACTIVE ${{ github.sha }}
 on:
   workflow_dispatch:
 permissions:
   contents: read
   actions: read
 concurrency:
   group: afw-finite-budget-qualification
   cancel-in-progress: false
-# PREPARATION ONLY. Every job remains literally false pending Root review.
-# PREPARATION ONLY: all seven job gates remain false until separate Root release.
+# PREPARATION ONLY. Both jobs are literally false. Root gate is required before any run.
 jobs:
-  contracts:
-    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
-    runs-on: ubuntu-24.04
-    timeout-minutes: 2
-    env:
-      AFW_BUDGET_GROUP: positive
-    outputs:
-      artifact-id: ${{ steps.upload.outputs.artifact-id }}
-    steps:
-      - name: Require the fixed AFW source and first attempt
-        id: scope
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
-          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
-          test "$GITHUB_RUN_ATTEMPT" = 1
-          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
-          printf 'AFW_PURE_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
-          mkdir -m 700 "$RUNNER_TEMP/afw-pure-private"
-      - name: Checkout this exact revision
-        uses: actions/checkout@v4
-        with:
-          repository: tokenizartinfo-ops/agent-friendly-web
-          ref: ${{ github.sha }}
-          persist-credentials: false
-          fetch-depth: 1
-      - name: Use Node 22
-        uses: actions/setup-node@v4
-        with:
-          node-version: '22.23.4'
-      - name: Install the locked fixture dependencies
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-locked-install.log" 2>&1 || { echo locked_install_failed; exit 1; }
-      - name: Check fixed fixture syntax, lint, inactive module and eight contracts
-        id: pure_test
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
-          test "$(node -v)" = v22.23.4
-          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
-          files=(test/fixtures/finite-budget-world.mjs test/fixtures/finite-owner-cleanup.mjs test/mcp-qa-finite-budget-native.test.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-cleanup-persistence.mjs)
-          for file in "${files[@]}"; do node --check "$file" >>"$RUNNER_TEMP/afw-pure-private/syntax.log" 2>&1 || { echo syntax_failed; exit 1; }; done
-          npx --no-install eslint "${files[@]}" >"$RUNNER_TEMP/afw-pure-private/lint.log" 2>&1 || { echo lint_failed; exit 1; }
-          test ! -e output/finite-budget
-          env -u AFW_BUDGET_GROUP node --test --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-pure-private/inactive.tap" 2>&1 || { echo inactive_load_failed; exit 1; }
-          test ! -e output/finite-budget && test ! -e output/t2-native-graphs
-          if AFW_BUDGET_GROUP=invalid-fixed-group node --test --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-pure-private/invalid.tap" 2>&1; then echo invalid_group_accepted; exit 1; fi
-          test ! -e output/finite-budget && test ! -e output/t2-native-graphs
-          mkdir -p output/finite-budget/pure
-          node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs >"$RUNNER_TEMP/afw-pure-private/tests.tap" 2>&1 || { echo pure_contract_failed; exit 1; }
-          node --input-type=module <<'NODE'
-          import assert from 'node:assert/strict';import {readFileSync,writeFileSync} from 'node:fs';import {join} from 'node:path';
-          const root=join(process.env.RUNNER_TEMP,'afw-pure-private'),dest='output/finite-budget/pure';
-          function counts(file,expected){const text=readFileSync(join(root,file),'utf8'),actual={};for(const [name,value]of Object.entries(expected)){const matches=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(matches.length,1);actual[name]=Number(matches[0][1]);assert.equal(actual[name],value);}return actual;}
-          const business=counts('tests.tap',{tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0});
-          const inactive=counts('inactive.tap',{tests:1,pass:1,fail:0,cancelled:0,skipped:0,todo:0});
-          assert(readFileSync(join(root,'invalid.tap'),'utf8').includes('SYN budget group unsupported before I0'));
-          writeFileSync(join(dest,'q-counts.json'),JSON.stringify(business));
-          writeFileSync(join(dest,'inactive.json'),JSON.stringify({fileWrapper:inactive,businessCases:0,I0Opened:false,invalidGroupRejected:true}));
-          console.log('AFW_PURE '+JSON.stringify(business));console.log('inactive_file_wrapper_verified 1 business_cases 0 invalid_group_rejected');
-          NODE
-      - name: Execute all fixed preparation controls once without I0
-        id: controls
-        if: steps.pure_test.outcome == 'success'
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          result=0
-          AFW_BUDGET_CONTROL_PHASE=green env -u AFW_BUDGET_GROUP node --experimental-vm-modules test/fixtures/finite-budget-world.mjs verify-native-preparation-round1 >"$RUNNER_TEMP/afw-pure-private/controls.log" 2>&1 || result=$?
-          printf 'exit=%s\n' "$result" >>"$GITHUB_OUTPUT"
-          test "$result" = 0
-      - name: Strict three-profile preflight with safe failure DTO
-        id: preflight
-        if: always() && !cancelled() && steps.pure_test.outcome == 'success'
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-pure-private/preflight.log" 2>&1
-          import {createHash} from 'node:crypto';import {writeFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
-          const hash=value=>createHash('sha256').update(value).digest('hex'),root='output/finite-budget/pure';
-          const labels=["exact family native statement kind","D original return retain native unchanged","RO original native declaration unchanged","exact two queue statement kinds","original initial child block provenance","native continuation original guard adjacency","SDK declaration structural identity","eleven cleanup primary blocks plus work/wait subcounts",'single structural actual SDK settlement sequence','two distinct original revokeGrant receivers','SDK actual standalone await adjacency','SDK original check adjacency','SDK bounded metrics same-block adjacency','same existing named DO class','no SYN method collision','closed fixed adapter operation inventory','exact original emitted prefix','exact two original enqueue notifications after pinned baseline transform','single passive actual SDK settlement site','original SDK call and retain unchanged','composed QA entry bytes','composed QA entry pin','exact composed entry native member selectors','exact composed entry SQL/body selectors','complete role reader catalog before I0','closed prepared role input map','scope input raw pin','raw SHA256 pin','raw byte pin','exact prepared AST count','exact installed package selector','installed package byte pin','installed package hash pin','native prepared role hooks match exact prior pure preflight before I0','exact fixed SYN additional-emission provenance before I0'];
-          function data(value,key){try{for(let n=0;value&&n<4;n++,value=Object.getPrototypeOf(value)){const descriptor=Object.getOwnPropertyDescriptor(value,key);if(descriptor)return Object.hasOwn(descriptor,'value')?descriptor.value:undefined;}}catch{}return undefined;}
-          function safe(value){if(typeof value==='number'&&Number.isFinite(value)||typeof value==='boolean'||value===null)return value;if(typeof value==='string')return {type:'string',bytes:Buffer.byteLength(value),sha256:hash(value)};return {type:typeof value};}
-          const profiles=[];const availableMs=120000-(Date.now()-Number(process.env.AFW_PURE_STARTED_MS));if(!Number.isFinite(availableMs)||availableMs<45000)throw Error('finite_pure_profile_headroom');
-          for(const profile of ['positive','readonly','reduction_a']){
-            process.env.AFW_BUDGET_GROUP=profile;let stage='import';
-            try{const mod=await import('./test/fixtures/finite-budget-world.mjs');stage='preflight';const result=await mod.preflightBudgetCompilation();profiles.push({profile,stage:'complete',passed:true,I0Opened:result.I0Opened,nativeExecutionProduced:result.nativeExecutionProduced,additionalSYNCount:result.additionalSYN.length,additionalSYN:result.additionalSYN.map(x=>({path:x.path,family:x.family??null,sites:x.sites??null,sdkSettlementSites:x.sdkSettlementSites??null,baselineBytes:x.baselineBytes,baselineSha256:x.baselineSha256,literalBytes:x.literalBytes??null,literalSha256:x.literalSha256??null,emittedBytes:x.emittedBytes,emittedSha256:x.emittedSha256}))});}
-            catch(error){const message=data(error,'message'),name=data(error,'name'),code=data(error,'code'),operator=data(error,'operator');profiles.push({profile,stage,passed:false,error:{name:['Error','AssertionError','TypeError','SyntaxError','RangeError'].includes(name)?name:'other',code:['ERR_ASSERTION','ERR_MODULE_NOT_FOUND','ERR_INVALID_ARG_TYPE','ERR_UNKNOWN_FILE_EXTENSION','ERR_REQUIRE_ESM'].includes(code)?code:code===undefined?'absent':'other',operator:['strictEqual','deepStrictEqual','==','===','match','ok'].includes(operator)?operator:operator===undefined?'absent':'other',actual:safe(data(error,'actual')),expected:safe(data(error,'expected')),message:typeof message==='string'?{bytes:Buffer.byteLength(message),sha256:hash(message),publicLabel:labels.find(label=>message.includes(label))??'unmatched'}:{type:typeof message}}});}
-          }
-          const result={purpose:'afw.fixed-budget-pure-diagnostic.syn.v1',source:process.env.GITHUB_SHA,tree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:process.env.GITHUB_RUN_ID,attempt:1,profiles,allPassed:profiles.every(x=>x.passed),I0Opened:false,nativeExecutionProduced:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
-          const bytes=Buffer.from(JSON.stringify(result,null,2));if(bytes.length>65536)throw Error('safe_diagnostic_limit');
-          await writeFile(root+'/diagnostics.json',bytes);
-          await writeFile(root+'/diagnostic-manifest.json',JSON.stringify({purpose:'afw.fixed-budget-pure-diagnostic-manifest.syn.v1',source:result.source,run:result.run,attempt:1,files:[{path:'diagnostics.json',bytes:bytes.length,sha256:hash(bytes)}]}));
-          await writeFile(process.env.GITHUB_OUTPUT,'all-passed='+result.allPassed+'\n',{flag:'a'});
-          NODE
-      - name: Seal a closed pure evidence directory
-        id: pure_seal
-        if: always() && !cancelled() && steps.scope.outcome == 'success'
-        env:
-          PURE_COMPLETE: ${{ steps.pure_test.outcome == 'success' && steps.controls.outcome == 'success' && steps.preflight.outputs.all-passed == 'true' }}
-          PURE_TEST_OUTCOME: ${{ steps.pure_test.outcome }}
-          CONTROLS_OUTCOME: ${{ steps.controls.outcome }}
-          PREFLIGHT_OUTCOME: ${{ steps.preflight.outcome }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE'
-          import assert from 'node:assert/strict';
-          import {readFile,writeFile,mkdir,readdir,lstat} from 'node:fs/promises';
-          import {createHash} from 'node:crypto';
-          import {join} from 'node:path';
-          // AFW_CLOSED_PURE_SEALER_V2: standard Node only, also executed by fixed sandbox controls.
-          const sha=bytes=>createHash('sha256').update(bytes).digest('hex'),N=value=>assert(Number.isSafeInteger(value)&&value>=0&&value<=Number.MAX_SAFE_INTEGER),H=value=>assert(typeof value==='string'&&/^[a-f0-9]{64}$/.test(value)),B=value=>assert(typeof value==='boolean');
-          function object(value,keys){assert(value&&typeof value==='object'&&!Array.isArray(value));assert.deepEqual(Object.keys(value).sort(),keys.slice().sort());}
-          function same(value,expected){assert.deepEqual(value,expected);}
-          function numbers(value,keys){object(value,keys);for(const item of Object.values(value))N(item);}
-          function arr(value,max,visit){assert(Array.isArray(value)&&value.length<=max);value.forEach(visit);}
-          function identity(value){same(value.source,process.env.GITHUB_SHA);same(value.run,process.env.GITHUB_RUN_ID);assert(value.attempt===1||value.attempt==='1');}
-          function flags(value){for(const key of ['I0Opened','nativeExecutionProduced','operationalReadiness','completePackage','PCoff'])same(value[key],false);}
-          function digest(bytes){return {bytes:bytes.length,sha256:sha(bytes)};}
-          const descriptorBytes=await readFile('test/fixtures/finite-budget-descriptors.json'),descriptorBlob=createHash('sha1').update('blob '+descriptorBytes.length+'\0').update(descriptorBytes).digest('hex');same(descriptorBlob,'be695028e4c12c3cb7d3b7bf2c5f2e7508f3db15');const descriptors=JSON.parse(descriptorBytes);
-          function counts(value){numbers(value,['nativeCalls','identityEdges','bodyEdges','facadeEdges','scopeEdges','guardEdges']);}
-          const countKeys=['childBlocks','work','wait','selectReadonly','selectReduction','queueReadonly','queueReduction','capReadonlyList','capReadonlyGet','capReductionList','capReductionDelete','send','sdk'];
-          function additional(value,path){
-           const adapter=path==='<stdin>';
-           if(adapter){
-            object(value,['purpose','family','baselineBytes','baselineSha256','literalBytes','literalSha256','emittedBytes','emittedSha256','methods','operationInventory','nativeInputAndAckObservationsSeparate','businessAuthority','originalEntryBytes','originalEntrySha256']);
-            same(value.purpose,'afw.fixed-syn-prototype-adapter.v1');assert(['readonly','reduction'].includes(value.family));same(value.methods,['finiteBudgetReadonly','finiteBudgetReduction','finiteBudgetSignals','finiteBudgetRelease','finiteBudgetRestore']);
-            same(value.operationInventory,{'Reflect.apply(':23,'Object.defineProperty(':1,'Object.defineProperties(':1,'Promise.allSettled(':1,'new WeakMap(':3});same(value.nativeInputAndAckObservationsSeparate,true);same(value.originalEntryBytes,64800);same(value.originalEntrySha256,'89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257');N(value.literalBytes);H(value.literalSha256);
-           }else{
-            assert(['lib/mcp-qa-finite-owner-cleanup.mjs','lib/mcp-qa-finite-initial-lease.mjs'].includes(path));const cleanup=path.includes('owner-cleanup');
-            object(value,['purpose','baselineBytes','baselineSha256','emittedBytes','emittedSha256','primaryBlocks','counts','queueKinds','fields','businessAuthority',...(cleanup?['sdkDeclarationProvenance']:[])]);
-            same(value.purpose,'afw.fixed-syn-passive-observations.v2');same(value.primaryBlocks,cleanup?11:1);numbers(value.counts,countKeys);
-            same(value.counts,cleanup?{childBlocks:1,work:1,wait:1,selectReadonly:1,selectReduction:1,queueReadonly:1,queueReduction:1,capReadonlyList:1,capReadonlyGet:1,capReductionList:1,capReductionDelete:1,send:1,sdk:1}:{childBlocks:1,work:1,wait:1,selectReadonly:0,selectReduction:0,queueReadonly:0,queueReduction:0,capReadonlyList:0,capReadonlyGet:0,capReductionList:0,capReductionDelete:0,send:0,sdk:0});
-            same(value.queueKinds,cleanup?[{family:1,statementKind:'variable',originalCheckAdjacent:true,originalReceiver:'alias',originalArgs:'q.args'},{family:2,statementKind:'return',originalCheckAdjacent:true,originalReceiver:'alias',originalArgs:'q.args'}]:[]);
-            same(value.fields,['opaque-alias','child-ordinal','family','deadline','status','counter','limit','queue-length','active','time','send-record-hash']);
-            if(cleanup){
-             const proof=value.sdkDeclarationProvenance;object(proof,['original','protectedModuleBlob','originalStatementSha256']);same(proof.protectedModuleBlob,'1a5a2583d266179cdd89f799c64199f29044fec5');same(proof.originalStatementSha256,sha('const actual=retain(api.revokeGrant(selector,i.subject));'));
-             object(proof.original,['sites','sameNameReceivers','receiver','method','args','adjacency']);same(proof.original,{sites:1,sameNameReceivers:['api','store'],receiver:'api',method:'revokeGrant',args:['selector','i.subject'],adjacency:['const-actual-retain-api','await-actual','check','bounded-facts']});
-            }
-           }
-           for(const key of ['baselineBytes','emittedBytes'])N(value[key]);for(const key of ['baselineSha256','emittedSha256'])H(value[key]);same(value.businessAuthority,false);
-           if(adapter){same(value.baselineBytes,106772);same(value.baselineSha256,'f5458d1d7f94665c8b02915972c95614b3a3bd2125d6d6a89ef6bea737c999ec');}
-          }
-          function expectedInventory(role){
-           assert(['M','QA'].includes(role));const expected=new Set([...descriptors.sourceDescriptors,...descriptors.packages,...descriptors.implementationSupplement.scopeInputPins].filter(row=>row.roles.includes(role)).map(row=>row.path));if(role==='QA')expected.add('<stdin>');return [...expected];
-          }
-          function verifyExpectedInventory(records,role){same(records.map(record=>record.path).sort(),expectedInventory(role).sort());}
-          function preflight(value,group){
-           object(value,['purpose','group','additionalSYN','source','run','attempt','inputs','I0Opened','nativeExecutionProduced','operationalReadiness','completePackage','PCoff','observerChronology']);identity(value);flags(value);same(value.purpose,'afw.finite-budget-preflight.syn.v1');same(value.group,group);same(value.observerChronology,'afw.finite-budget-chronology.syn.v2');object(value.inputs,['M','QA']);
-           for(const role of ['M','QA']){
-            const expected=expectedInventory(role);
-            arr(value.inputs[role],512,record=>{
-             object(record,['role','path','rawBytes','rawSha256','preparedBytes','preparedSha256','emittedBytes','emittedSha256','counts','selectors','readerSites',...(record.additionalSYN?['additionalSYN']:[])]);
-             same(record.role,role);assert(expected.includes(record.path));for(const key of ['rawBytes','preparedBytes','emittedBytes'])N(record[key]);for(const key of ['rawSha256','preparedSha256','emittedSha256'])H(record[key]);counts(record.counts);
-             const source=descriptors.sourceDescriptors.find(row=>row.path===record.path),pkg=descriptors.packages.find(row=>row.path===record.path),pin=descriptors.implementationSupplement.scopeInputPins.find(row=>row.path===record.path);
-             if(source){same(record.rawBytes,source.rawBytes);same(record.rawSha256,source.rawSha256);same(record.selectors,source.selectors.map((row,selector)=>({selector,count:row.expectedCount})));}
-             else if(pkg){same(record.rawBytes,pkg.bytes);same(record.rawSha256,pkg.sha256);same(record.selectors,pkg.selectors);}
-             else if(pin){same(record.rawBytes,pin.rawBytes);same(record.rawSha256,pin.rawSha256);same(record.selectors,[]);}
-             else same(record.selectors,{reflect:descriptors.entry.reflectSelectors,members:descriptors.implementationSupplement.entryNativeMembers,extras:descriptors.implementationSupplement.entryAdditionalCounts});
-             arr(record.readerSites,256,site=>{object(site,['id','role','path','selector','occurrence','preparedLine','preparedColumn']);same(site.role,role);same(site.path,record.path);for(const key of ['id','occurrence','preparedLine','preparedColumn'])N(site[key]);assert(Number.isSafeInteger(site.selector)||site.selector==='readerFactory');});
-             if(record.additionalSYN){assert(role==='QA'&&group!=='positive');additional(record.additionalSYN,record.path);}
-            });
-            verifyExpectedInventory(value.inputs[role],role);
-           }
-           same(value.additionalSYN,value.inputs.QA.filter(row=>row.additionalSYN).map(row=>({path:row.path,...row.additionalSYN})));same(value.additionalSYN.length,group==='positive'?0:3);
-          }
-          function qcounts(value,expected){object(value,['tests','pass','fail','cancelled','skipped','todo']);numbers(value,Object.keys(value));if(expected!==null)same(value,{tests:expected,pass:expected,fail:0,cancelled:0,skipped:0,todo:0});}
-          function errorDTO(value){
-           if(value===null)return;
-           object(value,['name','nativeError','code','operator','actual','expected','message']);assert(['Error','AssertionError','TypeError','SyntaxError','RangeError','other'].includes(value.name));B(value.nativeError);assert(['ERR_ASSERTION','ERR_MODULE_NOT_FOUND','ERR_INVALID_ARG_TYPE','ERR_SCRIPT_EXECUTION_TIMEOUT','ERR_UNKNOWN_FILE_EXTENSION','ERR_REQUIRE_ESM','absent','other'].includes(value.code));assert(['==','===','strictEqual','deepStrictEqual','match','ok','throws','rejects','absent','other'].includes(value.operator));
-           for(const key of ['actual','expected']){const data=value[key];if(data===null||typeof data==='boolean'||typeof data==='number'){assert(data===null||typeof data!=='number'||Number.isFinite(data));continue;}assert(data&&typeof data==='object');assert(['undefined','object','function','symbol','bigint','string','sha256','fixed_counts'].includes(data.type));if(data.type==='string'){object(data,['type','bytes','sha256']);N(data.bytes);H(data.sha256);}else if(data.type==='sha256'){object(data,['type','value']);H(data.value);}else if(data.type==='fixed_counts'){object(data,['type','counts']);numbers(data.counts,countKeys);}else object(data,['type']);}
-           const message=value.message;if(Object.hasOwn(message,'sha256')){object(message,['bytes','sha256','publicLabel']);N(message.bytes);H(message.sha256);assert(typeof message.publicLabel==='string'&&message.publicLabel.length<256);}else{object(message,['type']);assert(['undefined','string','object'].includes(message.type));}
-          }
-          function safeError(value){errorDTO(value);if(value===null)return null;const result={...value,message:{...value.message}};if(Object.hasOwn(result.message,'publicLabel')){result.message.publicLabelSha256=sha(result.message.publicLabel);delete result.message.publicLabel;}return result;}
-          async function sealClosedPure(){
-           const dest=join(process.env.RUNNER_TEMP,'afw-pure-public');await mkdir(dest,{mode:0o700});same(await readdir(dest),[]);const files=[],observations=[],validationFailures=[];
-           const put=async(name,value)=>{const bytes=Buffer.from(JSON.stringify(value,null,2));assert(bytes.length<=2097152);await writeFile(join(dest,name),bytes);files.push({path:name,...digest(bytes)});};
-           const read=async path=>{const st=await lstat(path);assert(st.isFile()&&st.nlink===1&&st.size<=2097152);const bytes=await readFile(path);same(bytes.length,st.size);return bytes;};
-           const checked=async(name,validate)=>{let bytes;try{bytes=await read('output/finite-budget/pure/'+name);}catch(error){if(error.code==='ENOENT')return null;throw error;}try{const value=JSON.parse(bytes);validate(value);return value;}catch(error){validationFailures.push({file:name,input:digest(bytes),error:{name:['SyntaxError','AssertionError'].includes(error.name)?error.name:'other'}});return null;}};
-           // Raw materials are measured only. Neither names nor bytes are copied into public files.
-           for(const name of ['syntax.log','lint.log','tests.tap','inactive.tap','invalid.tap','controls.log','preflight.log']){
-            try{const bytes=await read(join(process.env.RUNNER_TEMP,'afw-pure-private',name));observations.push({file:name,...digest(bytes)});}catch(error){if(error.code!=='ENOENT')throw error;}
-           }
-           const q=await checked('q-counts.json',value=>qcounts(value,8));if(q)await put('q-counts.json',q);
-           const inactive=await checked('inactive.json',value=>{object(value,['fileWrapper','businessCases','I0Opened','invalidGroupRejected']);qcounts(value.fileWrapper,1);same(value.businessCases,0);same(value.I0Opened,false);same(value.invalidGroupRejected,true);});if(inactive)await put('inactive.json',inactive);
-           const control=await checked('controls.json',value=>{
-            object(value,['purpose','source','run','attempt','groups','passed','I0Opened','nativeExecutionProduced','businessCases']);identity(value);same(value.purpose,'afw.closed-pure-controls.syn.v2');same(value.I0Opened,false);same(value.nativeExecutionProduced,false);same(value.businessCases,0);B(value.passed);
-            arr(value.groups,8,group=>{object(group,['group','passed','caseCount','evidence','error']);assert(['F1','F2','F3','F4','F5','F6','F7','F8'].includes(group.group));B(group.passed);N(group.caseCount);object(group.evidence,['bytes','sha256']);N(group.evidence.bytes);H(group.evidence.sha256);errorDTO(group.error);});
-            same(new Set(value.groups.map(group=>group.group)).size,value.groups.length);same(value.passed,value.groups.length===8&&value.groups.every(group=>group.passed));
-           });if(control)await put('controls.json',{...control,groups:control.groups.map(group=>({...group,error:safeError(group.error)}))});
-           const failureDiagnostics=await checked('diagnostics.json',value=>{
-            object(value,['purpose','source','tree','run','attempt','profiles','allPassed','I0Opened','nativeExecutionProduced','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified']);identity(value);flags(value);same(value.purpose,'afw.fixed-budget-pure-diagnostic.syn.v1');assert(/^[a-f0-9]{40}$/.test(value.tree));same(value.globalNativeDrainVerified,false);same(value.sdkNamespaceEmptyVerified,false);B(value.allPassed);
-            arr(value.profiles,3,profile=>{
-             assert(['positive','readonly','reduction_a'].includes(profile.profile));B(profile.passed);
-             if(profile.passed){object(profile,['profile','stage','passed','I0Opened','nativeExecutionProduced','additionalSYNCount','additionalSYN']);same(profile.stage,'complete');same(profile.I0Opened,false);same(profile.nativeExecutionProduced,false);N(profile.additionalSYNCount);arr(profile.additionalSYN,3,row=>{object(row,['path','family','sites','sdkSettlementSites','baselineBytes','baselineSha256','literalBytes','literalSha256','emittedBytes','emittedSha256']);assert(['<stdin>','lib/mcp-qa-finite-owner-cleanup.mjs','lib/mcp-qa-finite-initial-lease.mjs'].includes(row.path));assert([null,'readonly','reduction'].includes(row.family));for(const key of ['sites','sdkSettlementSites','literalBytes'])assert(row[key]===null||Number.isSafeInteger(row[key])&&row[key]>=0);for(const key of ['baselineBytes','emittedBytes'])N(row[key]);for(const key of ['baselineSha256','emittedSha256'])H(row[key]);if(row.literalSha256!==null)H(row.literalSha256);});}
-             else{object(profile,['profile','stage','passed','error']);assert(['import','preflight'].includes(profile.stage));const error=profile.error;object(error,['name','code','operator','actual','expected','message']);errorDTO({...error,nativeError:false});}
-            });same(new Set(value.profiles.map(profile=>profile.profile)).size,value.profiles.length);same(value.allPassed,value.profiles.length===3&&value.profiles.every(profile=>profile.passed));
-           });
-           const profiles=[];for(const group of ['positive','readonly','reduction_a']){
-            const name='preflight-'+group+'.json',value=await checked(name,value=>preflight(value,group));
-            if(value){await put(name,value);if(group==='positive')await put('preflight.json',value);profiles.push({profile:group,stage:'complete',passed:true,I0Opened:false,nativeExecutionProduced:false,additionalSYNCount:value.additionalSYN.length});}
-            else{const failed=failureDiagnostics?.profiles.find(profile=>profile.profile===group&&!profile.passed);profiles.push({profile:group,stage:failed?.stage??'missing_or_invalid',passed:false,I0Opened:false,nativeExecutionProduced:false,additionalSYNCount:null,error:failed?safeError({...failed.error,nativeError:false}):null});}
-           }
-           const complete=process.env.PURE_COMPLETE==='true'&&q!==null&&inactive!==null&&control?.passed===true&&profiles.every(profile=>profile.passed)&&validationFailures.length===0;
-           const outcomes=Object.fromEntries(['PURE_TEST_OUTCOME','CONTROLS_OUTCOME','PREFLIGHT_OUTCOME'].map(key=>{const value=process.env[key]??'skipped';assert(['success','failure','cancelled','skipped'].includes(value));return [key,value];}));
-           const common={source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT};
-           await put('diagnostics.json',{purpose:'afw.closed-pure-diagnostic.syn.v2',...common,profiles,allPassed:profiles.every(profile=>profile.passed),I0Opened:false,nativeExecutionProduced:false});
-           await put('status.json',{purpose:'afw.closed-pure-status.syn.v2',...common,status:complete?'pure_passed':'pure_failed',rawPureRetention:'runner_only_until_runner_cleanup',outcomes,rawObservations:observations,validationFailures,I0Opened:false,nativeExecutionProduced:false});
-           await put('budget-artifact.json',{purpose:'afw.finite-budget-artifact.syn.v1',...common,kind:'pure',files:files.slice().sort((a,b)=>a.path.localeCompare(b.path)),operationalReadiness:false,completePackage:false,PCoff:false});
-           return {complete,validationFailures:validationFailures.length,files:await readdir(dest)};
-          }
-          try{const result=await sealClosedPure();if(process.env.PURE_COMPLETE==='true'&&!result.complete)process.exitCode=1;}catch{console.log('closed_pure_evidence_not_preserved');process.exitCode=1;}
-          NODE
-      - name: Upload finite-budget-pure only
-        id: upload
-        if: always() && !cancelled() && steps.pure_seal.outcome == 'success'
-        uses: actions/upload-artifact@v4
-        with:
-          name: finite-budget-fixed-preparation-${{ github.sha }}
-          path: ${{ runner.temp }}/afw-pure-public/
-          if-no-files-found: error
-          retention-days: 7
-      - name: Download pure_receipt by exact ID attempt 1
-        id: pure_receipt_1
-        if: always() && !cancelled() && steps.upload.outcome == 'success' && steps.upload.outputs.artifact-id != ''
-        continue-on-error: true
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-pure-receipt
-          merge-multiple: true
-      - name: Wait 2s before pure_receipt retrieval 2
-        id: pure_receipt_wait2
-        if: always() && !cancelled() && steps.pure_receipt_1.outcome == 'failure'
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          sleep 2
-      - name: Download pure_receipt by exact ID attempt 2
-        id: pure_receipt_2
-        if: always() && !cancelled() && steps.pure_receipt_wait2.outcome == 'success' && steps.pure_receipt_1.outcome == 'failure'
-        continue-on-error: true
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-pure-receipt
-          merge-multiple: true
-      - name: Wait 5s before pure_receipt retrieval 3
-        id: pure_receipt_wait3
-        if: always() && !cancelled() && steps.pure_receipt_2.outcome == 'failure'
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          sleep 5
-      - name: Download pure_receipt by exact ID attempt 3
-        id: pure_receipt_3
-        if: always() && !cancelled() && steps.pure_receipt_wait3.outcome == 'success' && steps.pure_receipt_2.outcome == 'failure'
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-pure-receipt
-          merge-multiple: true
-      - name: Verify exact same-ID pure inventory
-        id: pure_verified
-        if: always() && !cancelled() && steps.upload.outcome == 'success'
-        env:
-          ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
-          DOWNLOADED: ${{ steps.pure_receipt_1.outcome == 'success' || steps.pure_receipt_2.outcome == 'success' || steps.pure_receipt_3.outcome == 'success' }}
-          READBACK: ${{ runner.temp }}/afw-pure-receipt
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test -n "$ARTIFACT_ID"
-          test "$DOWNLOADED" = true || { echo evidence_not_preserved; exit 1; }
-          node --input-type=module <<'NODE'
-          import assert from 'node:assert/strict';import {readFile,readdir,lstat} from 'node:fs/promises';import {createHash} from 'node:crypto';import {join} from 'node:path';
-          const root=process.env.READBACK,bytes=await readFile(join(root,'budget-artifact.json')),manifest=JSON.parse(bytes),sha=bytes=>createHash('sha256').update(bytes).digest('hex');assert(/^[1-9][0-9]*$/.test(process.env.ARTIFACT_ID));assert.equal(manifest.source,process.env.GITHUB_SHA);assert.equal(manifest.run,process.env.GITHUB_RUN_ID);assert.equal(manifest.attempt,process.env.GITHUB_RUN_ATTEMPT);assert.equal(manifest.kind,'pure');assert.equal(manifest.purpose,'afw.finite-budget-artifact.syn.v1');for(const key of ['operationalReadiness','completePackage','PCoff'])assert.equal(manifest[key],false);
-          const files=[];for(const path of (await readdir(root)).sort()){assert(/^[a-z0-9_-]+\.json$/.test(path));const st=await lstat(join(root,path));assert(st.isFile()&&st.nlink===1);if(path!=='budget-artifact.json'){const value=await readFile(join(root,path));files.push({path,bytes:value.length,sha256:sha(value)});}}assert.deepEqual(files,manifest.files);
-          console.log('BUDGET SAME ID READBACK VERIFIED '+JSON.stringify({artifactId:process.env.ARTIFACT_ID,files:files.length+1,source:manifest.source,run:manifest.run,attempt:manifest.attempt,manifestBytes:bytes.length,manifestSha256:sha(bytes)}));
-          NODE
-          if ! cmp -s "$RUNNER_TEMP/afw-pure-public/budget-artifact.json" "$READBACK/budget-artifact.json"; then echo evidence_not_preserved; exit 1; fi
-          printf 'pure_verified artifact_id=%s\n' "$ARTIFACT_ID"
-      - name: Print verified closed profile diagnostic
-        if: always() && !cancelled() && steps.pure_verified.outcome == 'success'
-        shell: bash
-        run: |
-          node --input-type=module <<'NODE'
-          import {readFile} from 'node:fs/promises';for(const name of ['controls.json','diagnostics.json']){try{const raw=await readFile(process.env.RUNNER_TEMP+'/afw-pure-receipt/'+name,'utf8');if(Buffer.byteLength(raw)>65536)throw Error('safe_diagnostic_limit');console.log(name+' '+raw);}catch(error){if(error.code!=='ENOENT')throw error;}}
-          NODE
-      - name: Require all covering profiles and retained readback
-        if: always() && !cancelled()
-        shell: bash
-        run: |
-          test '${{ steps.pure_test.outcome }}' = success
-          test '${{ steps.controls.outcome }}' = success
-          test '${{ steps.preflight.outputs.all-passed }}' = true
-          test '${{ steps.pure_verified.outcome }}' = success
-          test '${{ steps.pure_seal.outcome }}' = success
-  positive_prepare:
-    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
-    needs: [contracts]
-    runs-on: ubuntu-24.04
-    timeout-minutes: 15
-    environment: afw-finite-syn-checkpoint
-    outputs:
-      artifact-id: ${{ steps.upload.outputs.artifact-id }}
-      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
-      kind: ${{ steps.seal.outputs.kind }}
-    env:
-      AFW_BUDGET_GROUP: positive
-      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
-      FIXED_ROLE: producer
-      FIXED_LANE: positive
-      FIXED_CASES: '["P1"]'
-    steps:
-      - name: Require fixed scope before any native work
-        id: scope
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
-          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
-          test "$GITHUB_RUN_ATTEMPT" = 1
-          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
-          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
-          
-      - uses: actions/checkout@v4
-        with:
-          repository: tokenizartinfo-ops/agent-friendly-web
-          ref: ${{ github.sha }}
-          persist-credentials: false
-          fetch-depth: 1
-      - uses: actions/setup-node@v4
-        with:
-          node-version: '22.23.4'
-      - name: Install exact lock and verify existing custody key
-        id: custody
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$(node -v)" = v22.23.4
-          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
-          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
-          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
-          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
-          
-      - name: Download exact contracts artifact
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-prior-pure
-          merge-multiple: true
-      - name: Verify prior pure inventory and select fixed graph profile
-        id: pure_binding
-        env:
-          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
-          NODE
-          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
-          
-      - name: Execute fixed positive_prepare once
-        id: native
-        continue-on-error: true
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node test/fixtures/finite-budget-world.mjs prepare-positive output/finite-budget/checkpoint >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
-          
-      - name: Encrypt complete private evidence on success or failure
-        id: seal
-        if: always() && !cancelled() && steps.custody.outcome == 'success'
-        env:
-          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
-          SUCCESS_KIND: checkpoint
-          FAILURE_KIND: producer-failure
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
-          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
-          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
-          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
-          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
-          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
-          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
-          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
-          NODE
-          
-      - name: Upload encrypted envelope and closed receipts only
-        id: upload
-        if: always() && !cancelled() && steps.seal.outcome == 'success'
-        uses: actions/upload-artifact@v4
-        with:
-          name: finite-budget-positive_prepare-${{ github.sha }}-${{ github.run_id }}
-          path: ${{ runner.temp }}/afw-native-public/
-          retention-days: 7
-          if-no-files-found: error
-      - name: Download own exact assigned artifact ID
-        id: own_download
-        if: always() && !cancelled() && steps.upload.outcome == 'success'
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-native-readback
-          merge-multiple: true
-      - name: Authenticate own same-ID inner inventory readback
-        id: own_verified
-        if: always() && !cancelled() && steps.own_download.outcome == 'success'
-        env:
-          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
-          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
-          OWN_KIND: ${{ steps.seal.outputs.kind }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
-          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
-          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
-          NODE
-          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
-          
-      - name: Preserve actual command and custody outcome
-        id: actual_outcome
-        if: always() && !cancelled()
-        shell: bash
-        run: |
-          set -euo pipefail
-          test '${{ steps.native.outcome }}' = success
-          test '${{ steps.own_verified.outcome }}' = success
-  positive_consume:
-    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
-    needs: [contracts, positive_prepare]
-    runs-on: ubuntu-24.04
-    timeout-minutes: 15
-    environment: afw-finite-syn-checkpoint
-    outputs:
-      artifact-id: ${{ steps.upload.outputs.artifact-id }}
-      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
-      kind: ${{ steps.seal.outputs.kind }}
-    env:
-      AFW_BUDGET_GROUP: positive
-      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
-      FIXED_ROLE: consumer
-      FIXED_LANE: positive
-      FIXED_CASES: '["P1"]'
-    steps:
-      - name: Require fixed scope before any native work
-        id: scope
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
-          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
-          test "$GITHUB_RUN_ATTEMPT" = 1
-          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
-          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
-          
-      - uses: actions/checkout@v4
-        with:
-          repository: tokenizartinfo-ops/agent-friendly-web
-          ref: ${{ github.sha }}
-          persist-credentials: false
-          fetch-depth: 1
-      - uses: actions/setup-node@v4
-        with:
-          node-version: '22.23.4'
-      - name: Install exact lock and verify existing custody key
-        id: custody
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$(node -v)" = v22.23.4
-          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
-          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
-          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
-          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
-          
-      - name: Download exact contracts artifact
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-prior-pure
-          merge-multiple: true
-      - name: Verify prior pure inventory and select fixed graph profile
-        id: pure_binding
-        env:
-          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
-          NODE
-          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
-          
-      - name: Download assigned original producer artifact
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ needs.positive_prepare.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-producer-envelope
-          merge-multiple: true
-      - name: Authenticate assigned producer before any cold mount
-        id: producer_binding
-        env:
-          PRODUCER_ID: ${{ needs.positive_prepare.outputs.artifact-id }}
-          PRODUCER_DIGEST: ${{ needs.positive_prepare.outputs.artifact-digest }}
-          PRODUCER_KIND: ${{ needs.positive_prepare.outputs.kind }}
-          EXPECTED_KIND: checkpoint
-          EXPECTED_GROUP: positive
-          EXPECTED_CASES: '["P1"]'
-          GH_ARTIFACT_TOKEN: ${{ github.token }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$PRODUCER_KIND" = "$EXPECTED_KIND"
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/input-binding.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
-          import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env;assert.match(e.PRODUCER_ID,/^[1-9][0-9]*$/);assert.match(e.PRODUCER_DIGEST,/^[a-f0-9]{64}$/);
-          const r=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+e.PRODUCER_ID,{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
-          assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),e.PRODUCER_ID);assert.equal(m.expired,false);assert.equal(m.digest,'sha256:'+e.PRODUCER_DIGEST);assert.equal(String(m.workflow_run.id),e.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,e.GITHUB_SHA);
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.EXPECTED_KIND};
-          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-producer-envelope',destinationDir:e.RUNNER_TEMP+'/afw-producer-open',context});
-          const manifest=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-producer-open/job-manifest.json','utf8'));
-          const {execFileSync}=await import('node:child_process');validateFixedBudgetJobManifest(manifest,{job:e.EXPECTED_KIND==='checkpoint'?'positive_prepare':'reduction_prepare',sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),artifactId:e.PRODUCER_ID,digest:e.PRODUCER_DIGEST,context});
-          await writeFile(e.RUNNER_TEMP+'/afw-native-private/producer-binding.json',JSON.stringify({artifactId:e.PRODUCER_ID,digest:e.PRODUCER_DIGEST,kind:e.EXPECTED_KIND,expectedProducerGroup:e.EXPECTED_GROUP,verified:true}));
-          NODE
-          printf 'AFW_BUDGET_PRODUCER_ARTIFACT_ID=%s\n' "$PRODUCER_ID" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_DIGEST=%s\n' "$PRODUCER_DIGEST" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_KIND=%s\n' "$EXPECTED_KIND" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_GROUP=%s\n' "$EXPECTED_GROUP" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_READBACK=verified\n' >>"$GITHUB_ENV"
-          
-      - name: Execute fixed positive_consume once
-        id: native
-        continue-on-error: true
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          AFW_BUDGET_CHECKPOINT="$RUNNER_TEMP/afw-producer-open/output/finite-budget/checkpoint" node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
-          AFW_EXPECTED_CASES=1 node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/tap-check.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
-          const e=process.env,text=await readFile(e.RUNNER_TEMP+'/afw-native-private/logs/command-output.log','utf8'),counts={};
-          for(const [name,expected]of Object.entries({tests:Number(e.AFW_EXPECTED_CASES),pass:Number(e.AFW_EXPECTED_CASES),fail:0,cancelled:0,skipped:0,todo:0})){const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(hits.length,1);counts[name]=Number(hits[0][1]);assert.equal(counts[name],expected);}
-          await writeFile(e.RUNNER_TEMP+'/afw-native-private/business-counts.json',JSON.stringify(counts));
-          NODE
-          
-      - name: Encrypt complete private evidence on success or failure
-        id: seal
-        if: always() && !cancelled() && steps.custody.outcome == 'success'
-        env:
-          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
-          SUCCESS_KIND: positive-result
-          FAILURE_KIND: consumer-failure
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
-          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
-          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
-          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
-          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
-          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
-          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
-          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
-          NODE
-          
-      - name: Upload encrypted envelope and closed receipts only
-        id: upload
-        if: always() && !cancelled() && steps.seal.outcome == 'success'
-        uses: actions/upload-artifact@v4
-        with:
-          name: finite-budget-positive_consume-${{ github.sha }}-${{ github.run_id }}
-          path: ${{ runner.temp }}/afw-native-public/
-          retention-days: 7
-          if-no-files-found: error
-      - name: Download own exact assigned artifact ID
-        id: own_download
-        if: always() && !cancelled() && steps.upload.outcome == 'success'
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-native-readback
-          merge-multiple: true
-      - name: Authenticate own same-ID inner inventory readback
-        id: own_verified
-        if: always() && !cancelled() && steps.own_download.outcome == 'success'
-        env:
-          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
-          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
-          OWN_KIND: ${{ steps.seal.outputs.kind }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
-          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
-          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
-          NODE
-          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
-          
-      - name: Preserve actual command and custody outcome
-        id: actual_outcome
-        if: always() && !cancelled()
-        shell: bash
-        run: |
-          set -euo pipefail
-          test '${{ steps.native.outcome }}' = success
-          test '${{ steps.own_verified.outcome }}' = success
-  reduction_prepare:
-    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
-    needs: [contracts]
-    runs-on: ubuntu-24.04
-    timeout-minutes: 15
-    environment: afw-finite-syn-checkpoint
-    outputs:
-      artifact-id: ${{ steps.upload.outputs.artifact-id }}
-      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
-      kind: ${{ steps.seal.outputs.kind }}
-    env:
-      AFW_BUDGET_GROUP: reduction_a
-      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
-      FIXED_ROLE: producer
-      FIXED_LANE: reduction
-      FIXED_CASES: '["D1","D2","D3","D4"]'
-    steps:
-      - name: Require fixed scope before any native work
-        id: scope
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
-          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
-          test "$GITHUB_RUN_ATTEMPT" = 1
-          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
-          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
-          
-      - uses: actions/checkout@v4
-        with:
-          repository: tokenizartinfo-ops/agent-friendly-web
-          ref: ${{ github.sha }}
-          persist-credentials: false
-          fetch-depth: 1
-      - uses: actions/setup-node@v4
-        with:
-          node-version: '22.23.4'
-      - name: Install exact lock and verify existing custody key
-        id: custody
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$(node -v)" = v22.23.4
-          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
-          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
-          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
-          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
-          
-      - name: Download exact contracts artifact
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-prior-pure
-          merge-multiple: true
-      - name: Verify prior pure inventory and select fixed graph profile
-        id: pure_binding
-        env:
-          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
-          NODE
-          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
-          
-      - name: Execute fixed reduction_prepare once
-        id: native
-        continue-on-error: true
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node test/fixtures/finite-budget-world.mjs prepare-reduction output/finite-budget/checkpoint >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
-          
-      - name: Encrypt complete private evidence on success or failure
-        id: seal
-        if: always() && !cancelled() && steps.custody.outcome == 'success'
-        env:
-          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
-          SUCCESS_KIND: reduction-checkpoint
-          FAILURE_KIND: producer-failure
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
-          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
-          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
-          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
-          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
-          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
-          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
-          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
-          NODE
-          
-      - name: Upload encrypted envelope and closed receipts only
-        id: upload
-        if: always() && !cancelled() && steps.seal.outcome == 'success'
-        uses: actions/upload-artifact@v4
-        with:
-          name: finite-budget-reduction_prepare-${{ github.sha }}-${{ github.run_id }}
-          path: ${{ runner.temp }}/afw-native-public/
-          retention-days: 7
-          if-no-files-found: error
-      - name: Download own exact assigned artifact ID
-        id: own_download
-        if: always() && !cancelled() && steps.upload.outcome == 'success'
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-native-readback
-          merge-multiple: true
-      - name: Authenticate own same-ID inner inventory readback
-        id: own_verified
-        if: always() && !cancelled() && steps.own_download.outcome == 'success'
-        env:
-          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
-          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
-          OWN_KIND: ${{ steps.seal.outputs.kind }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
-          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
-          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
-          NODE
-          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
-          
-      - name: Preserve actual command and custody outcome
-        id: actual_outcome
-        if: always() && !cancelled()
-        shell: bash
-        run: |
-          set -euo pipefail
-          test '${{ steps.native.outcome }}' = success
-          test '${{ steps.own_verified.outcome }}' = success
-  reduction_consume_a:
-    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
-    needs: [contracts, reduction_prepare]
-    runs-on: ubuntu-24.04
-    timeout-minutes: 15
-    environment: afw-finite-syn-checkpoint
-    outputs:
-      artifact-id: ${{ steps.upload.outputs.artifact-id }}
-      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
-      kind: ${{ steps.seal.outputs.kind }}
-    env:
-      AFW_BUDGET_GROUP: reduction_a
-      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
-      FIXED_ROLE: consumer
-      FIXED_LANE: reduction_a
-      FIXED_CASES: '["D1","D2"]'
-    steps:
-      - name: Require fixed scope before any native work
-        id: scope
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
-          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
-          test "$GITHUB_RUN_ATTEMPT" = 1
-          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
-          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
-          
-      - uses: actions/checkout@v4
-        with:
-          repository: tokenizartinfo-ops/agent-friendly-web
-          ref: ${{ github.sha }}
-          persist-credentials: false
-          fetch-depth: 1
-      - uses: actions/setup-node@v4
-        with:
-          node-version: '22.23.4'
-      - name: Install exact lock and verify existing custody key
-        id: custody
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$(node -v)" = v22.23.4
-          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
-          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
-          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
-          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
-          
-      - name: Download exact contracts artifact
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-prior-pure
-          merge-multiple: true
-      - name: Verify prior pure inventory and select fixed graph profile
-        id: pure_binding
-        env:
-          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
-          NODE
-          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
-          
-      - name: Download assigned original producer artifact
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ needs.reduction_prepare.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-producer-envelope
-          merge-multiple: true
-      - name: Authenticate assigned producer before any cold mount
-        id: producer_binding
-        env:
-          PRODUCER_ID: ${{ needs.reduction_prepare.outputs.artifact-id }}
-          PRODUCER_DIGEST: ${{ needs.reduction_prepare.outputs.artifact-digest }}
-          PRODUCER_KIND: ${{ needs.reduction_prepare.outputs.kind }}
-          EXPECTED_KIND: reduction-checkpoint
-          EXPECTED_GROUP: reduction_a
-          EXPECTED_CASES: '["D1","D2","D3","D4"]'
-          GH_ARTIFACT_TOKEN: ${{ github.token }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$PRODUCER_KIND" = "$EXPECTED_KIND"
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/input-binding.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
-          import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env;assert.match(e.PRODUCER_ID,/^[1-9][0-9]*$/);assert.match(e.PRODUCER_DIGEST,/^[a-f0-9]{64}$/);
-          const r=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+e.PRODUCER_ID,{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
-          assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),e.PRODUCER_ID);assert.equal(m.expired,false);assert.equal(m.digest,'sha256:'+e.PRODUCER_DIGEST);assert.equal(String(m.workflow_run.id),e.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,e.GITHUB_SHA);
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.EXPECTED_KIND};
-          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-producer-envelope',destinationDir:e.RUNNER_TEMP+'/afw-producer-open',context});
-          const manifest=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-producer-open/job-manifest.json','utf8'));
-          const {execFileSync}=await import('node:child_process');validateFixedBudgetJobManifest(manifest,{job:e.EXPECTED_KIND==='checkpoint'?'positive_prepare':'reduction_prepare',sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),artifactId:e.PRODUCER_ID,digest:e.PRODUCER_DIGEST,context});
-          await writeFile(e.RUNNER_TEMP+'/afw-native-private/producer-binding.json',JSON.stringify({artifactId:e.PRODUCER_ID,digest:e.PRODUCER_DIGEST,kind:e.EXPECTED_KIND,expectedProducerGroup:e.EXPECTED_GROUP,verified:true}));
-          NODE
-          printf 'AFW_BUDGET_PRODUCER_ARTIFACT_ID=%s\n' "$PRODUCER_ID" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_DIGEST=%s\n' "$PRODUCER_DIGEST" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_KIND=%s\n' "$EXPECTED_KIND" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_GROUP=%s\n' "$EXPECTED_GROUP" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_READBACK=verified\n' >>"$GITHUB_ENV"
-          
-      - name: Execute fixed reduction_consume_a once
-        id: native
-        continue-on-error: true
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          AFW_BUDGET_CHECKPOINT="$RUNNER_TEMP/afw-producer-open/output/finite-budget/checkpoint" node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
-          AFW_EXPECTED_CASES=2 node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/tap-check.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
-          const e=process.env,text=await readFile(e.RUNNER_TEMP+'/afw-native-private/logs/command-output.log','utf8'),counts={};
-          for(const [name,expected]of Object.entries({tests:Number(e.AFW_EXPECTED_CASES),pass:Number(e.AFW_EXPECTED_CASES),fail:0,cancelled:0,skipped:0,todo:0})){const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(hits.length,1);counts[name]=Number(hits[0][1]);assert.equal(counts[name],expected);}
-          await writeFile(e.RUNNER_TEMP+'/afw-native-private/business-counts.json',JSON.stringify(counts));
-          NODE
-          
-      - name: Encrypt complete private evidence on success or failure
-        id: seal
-        if: always() && !cancelled() && steps.custody.outcome == 'success'
-        env:
-          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
-          SUCCESS_KIND: reduction-result-a
-          FAILURE_KIND: consumer-failure
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
-          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
-          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
-          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
-          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
-          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
-          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
-          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
-          NODE
-          
-      - name: Upload encrypted envelope and closed receipts only
-        id: upload
-        if: always() && !cancelled() && steps.seal.outcome == 'success'
-        uses: actions/upload-artifact@v4
-        with:
-          name: finite-budget-reduction_consume_a-${{ github.sha }}-${{ github.run_id }}
-          path: ${{ runner.temp }}/afw-native-public/
-          retention-days: 7
-          if-no-files-found: error
-      - name: Download own exact assigned artifact ID
-        id: own_download
-        if: always() && !cancelled() && steps.upload.outcome == 'success'
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-native-readback
-          merge-multiple: true
-      - name: Authenticate own same-ID inner inventory readback
-        id: own_verified
-        if: always() && !cancelled() && steps.own_download.outcome == 'success'
-        env:
-          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
-          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
-          OWN_KIND: ${{ steps.seal.outputs.kind }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
-          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
-          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
-          NODE
-          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
-          
-      - name: Preserve actual command and custody outcome
-        id: actual_outcome
-        if: always() && !cancelled()
-        shell: bash
-        run: |
-          set -euo pipefail
-          test '${{ steps.native.outcome }}' = success
-          test '${{ steps.own_verified.outcome }}' = success
-  readonly:
-    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
-    needs: [contracts]
+  custody_inspect:
+    if: ${{ false }}
     runs-on: ubuntu-24.04
     timeout-minutes: 7
-    environment: afw-finite-syn-checkpoint
-    outputs:
-      artifact-id: ${{ steps.upload.outputs.artifact-id }}
-      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
-      kind: ${{ steps.seal.outputs.kind }}
     env:
-      AFW_BUDGET_GROUP: readonly
-      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
-      FIXED_ROLE: consumer
-      FIXED_LANE: readonly
-      FIXED_CASES: '["R1","R2","R3"]'
+      GH_ARTIFACT_TOKEN: ${{ github.token }}
+    outputs:
+      safe-id: ${{ steps.upload.outputs.artifact-id }}
+      safe-digest: ${{ steps.upload.outputs.artifact-digest }}
     steps:
-      - name: Require fixed scope before any native work
-        id: scope
+      - name: Require fixed keyless Source
         shell: bash
         run: |
           set -euo pipefail
           umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REPOSITORY_ID" = 1347578006
           test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
           test "$GITHUB_RUN_ATTEMPT" = 1
-          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
-          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
-          
-      - uses: actions/checkout@v4
+      - name: Checkout exact observer Source
+        uses: actions/checkout@v4
         with:
           repository: tokenizartinfo-ops/agent-friendly-web
           ref: ${{ github.sha }}
           persist-credentials: false
           fetch-depth: 1
-      - uses: actions/setup-node@v4
+      - name: Use exact Node
+        uses: actions/setup-node@v4
         with:
           node-version: '22.23.4'
-      - name: Install exact lock and verify existing custody key
-        id: custody
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$(node -v)" = v22.23.4
-          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
-          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
-          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
-          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
-          
-      - name: Download exact contracts artifact
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-prior-pure
-          merge-multiple: true
-      - name: Verify prior pure inventory and select fixed graph profile
-        id: pure_binding
-        env:
-          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
-          NODE
-          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
-          
-      - name: Execute fixed readonly once
-        id: native
-        continue-on-error: true
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
-          AFW_EXPECTED_CASES=3 node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/tap-check.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
-          const e=process.env,text=await readFile(e.RUNNER_TEMP+'/afw-native-private/logs/command-output.log','utf8'),counts={};
-          for(const [name,expected]of Object.entries({tests:Number(e.AFW_EXPECTED_CASES),pass:Number(e.AFW_EXPECTED_CASES),fail:0,cancelled:0,skipped:0,todo:0})){const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(hits.length,1);counts[name]=Number(hits[0][1]);assert.equal(counts[name],expected);}
-          await writeFile(e.RUNNER_TEMP+'/afw-native-private/business-counts.json',JSON.stringify(counts));
-          NODE
-          
-      - name: Encrypt complete private evidence on success or failure
-        id: seal
-        if: always() && !cancelled() && steps.custody.outcome == 'success'
-        env:
-          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
-          SUCCESS_KIND: readonly-result
-          FAILURE_KIND: consumer-failure
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
-          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
-          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
-          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
-          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
-          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
-          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
-          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
-          NODE
-          
-      - name: Upload encrypted envelope and closed receipts only
+      - name: Preserve five immutable function module bodies
+        shell: bash
+        run: |
+          set -euo pipefail
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          if false; then
+          cat >"$RUNNER_TEMP/afw-postmortem-adapter.mjs" <<'NODE_POSTMORTEM_ADAPTER'
+          import assert from 'node:assert/strict';
+          import {createHash} from 'node:crypto';
+          import {readFile,writeFile,readdir,mkdir,lstat} from 'node:fs/promises';
+          import {execFileSync} from 'node:child_process';
+          import {inflateRawSync} from 'node:zlib';
+          import {join} from 'node:path';
+          export const sha=b=>createHash('sha256').update(b).digest('hex');
+          const binding=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-suite-binding.json'),'utf8'));
+          export const CONTEXT=Object.freeze(binding.context),PINS=Object.freeze(binding.sourcePins),PROGRAM_HASHES=Object.freeze(binding.programHashes);
+          export const FLAGS=Object.freeze({operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
+          export const LEGACY=Object.freeze(['contracts','positive_prepare','positive_consume','reduction_prepare','reduction_consume_a','readonly','reduction_consume_b']);
+          export const PRIVATE_PEERS=Object.freeze([{job:'positive_prepare',kind:'checkpoint'},{job:'positive_consume',kind:'positive-result'},{job:'reduction_prepare',kind:'reduction-checkpoint'},{job:'reduction_consume_a',kind:'reduction-result-a'},{job:'readonly',kind:'readonly-result'}]);
+          export const SOURCE_PINS=Object.freeze({pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'});
+          export const IDS=Object.freeze(['dag_peer_inventory','key_scope','fixed_case_counts','metadata_custody_binding','incomplete_or_contradictory','coherent_current_pair']);
+          export const need=(ok)=>assert(ok,'suite_evidence_rejected'),same=(a,b)=>assert.deepEqual(a,b,'suite_evidence_rejected');
+          export function fields(v,keys){need(v&&typeof v==='object'&&!Array.isArray(v));const d=Object.getOwnPropertyDescriptors(v);same(Reflect.ownKeys(d).sort(),keys.slice().sort());for(const k of keys)need(Object.hasOwn(d[k],'value')&&d[k].enumerable);}
+          export function canonical(v){return Buffer.from(JSON.stringify(v)+'\n');}
+          export function parseCanonical(b){need(Buffer.isBuffer(b)&&b.length>0&&b.length<=65536);const s=new TextDecoder('utf-8',{fatal:true}).decode(b);need(Buffer.from(s).equals(b));const v=JSON.parse(s);need(canonical(v).equals(b));return v;}
+          export function canonicalId(v){need(typeof v==='string'&&/^[1-9][0-9]*$/.test(v)&&Number.isSafeInteger(Number(v))&&String(Number(v))===v);return v;}
+          export function hex(v,n=64){need(typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v));return v;}
+          export function requireKeyless(){need(process.env.AFW_SYN_CHECKPOINT_KEY===undefined);}
+          function git(...args){return execFileSync('git',args,{encoding:'utf8'}).trim();}
+          const PATHS={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          export async function validateSourcePins(){
+           requireKeyless();same(PINS,SOURCE_PINS);same(process.versions.node,'22.23.4');same(process.env.GITHUB_REPOSITORY,CONTEXT.repository);same(process.env.GITHUB_REPOSITORY_ID,CONTEXT.repositoryId);same(process.env.GITHUB_REF,CONTEXT.ref);same(process.env.GITHUB_RUN_ID,CONTEXT.run);same(process.env.GITHUB_RUN_ATTEMPT,'1');same(git('rev-parse','HEAD'),CONTEXT.source);same(git('rev-parse','HEAD^{tree}'),CONTEXT.tree);same(git('rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml'),CONTEXT.workflowBlob);
+           for(const [k,p]of Object.entries(PATHS))same(git('rev-parse','HEAD:'+p),PINS[k]);const lock=JSON.parse(await readFile('package-lock.json','utf8'));same(lock.packages['node_modules/@cloudflare/workers-oauth-provider'].version,PINS.sdkVersion);
+           const map={adapter:'afw-suite-adapter.mjs',controls:'afw-suite-controls.mjs',verifier:'afw-suite-verifier.mjs',safeZip:'afw-suite-safe-zip.mjs'};for(const [k,p]of Object.entries(map))same(sha(await readFile(join(process.env.RUNNER_TEMP,p))),PROGRAM_HASHES[k]);return {context:CONTEXT,sourcePins:PINS,programHashes:PROGRAM_HASHES};
+          }
+          export function artifactName(job){return job==='contracts'?'finite-budget-fixed-preparation-'+CONTEXT.source:job==='suite'||job==='controls'?'afw-coherent-suite-'+(job==='controls'?'controls-':'')+'safe-'+CONTEXT.run+'-1':'finite-budget-'+job+'-'+CONTEXT.source+'-'+CONTEXT.run;}
+          export function operationLimits(operation){
+           const limits={
+            'generic-private':{raw:136314880,timeout:30000},
+            'b-peer':{raw:134283264,timeout:20000},
+            pure:{raw:134283264,timeout:30000},
+            safe:{raw:131072,timeout:30000}
+           };
+           need(Object.hasOwn(limits,operation));return limits[operation];
+          }
+          export function validateAssignedMetadata(meta,expected,operation='generic-private'){
+           fields(expected,['job','kind','id','zipSha256']);canonicalId(expected.id);hex(expected.zipSha256);
+           need(['contracts',...LEGACY.slice(1),'suite','controls'].includes(expected.job));
+           const limits=operationLimits(operation);
+           same(String(meta.id),expected.id);need(Number.isSafeInteger(meta.id));same(meta.name,artifactName(expected.job));same(meta.expired,false);same(meta.digest,'sha256:'+expected.zipSha256);
+           same(String(meta.workflow_run.id),CONTEXT.run);same(meta.workflow_run.head_sha,CONTEXT.source);same(meta.workflow_run.head_branch,CONTEXT.ref.slice(11));
+           need(Number.isSafeInteger(meta.size_in_bytes)&&meta.size_in_bytes>0&&meta.size_in_bytes<=limits.raw);
+           need(typeof meta.expires_at==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(meta.expires_at)&&Number.isFinite(Date.parse(meta.expires_at))&&Date.parse(meta.expires_at)>Date.now());
+           return meta;
+          }
+          export async function metadata(id){
+           canonicalId(id);const r=await fetch('https://api.github.com/repos/'+CONTEXT.repository+'/actions/artifacts/'+id,{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
+           return {status:r.status,value:r.status===200?await r.json():null};
+          }
+          export function checkedDownloadSize(total,chunkBytes,operation){
+           need(Number.isSafeInteger(total)&&total>=0&&Number.isSafeInteger(chunkBytes)&&chunkBytes>=0);
+           const cap=operationLimits(operation).raw;need(total<=cap&&chunkBytes<=cap-total);return total+chunkBytes;
+          }
+          export async function collectPrivateBody(response,operation,signal){
+           const limits=operationLimits(operation);need(response.status===200&&response.body);
+           const reader=response.body.getReader(),parts=[];let total=0;
+           try{
+            for(;;){const item=await reader.read();if(item.done)break;need(item.value instanceof Uint8Array);total=checkedDownloadSize(total,item.value.byteLength,operation);parts.push(Buffer.from(item.value));}
+           }catch(error){await reader.cancel().catch(()=>{});throw error;}
+           need(!signal.aborted);return Buffer.concat(parts);
+          }
+          const fixedPrivateIO={fetch:(url,options)=>fetch(url,options),timeout:ms=>AbortSignal.timeout(ms)};
+          export async function rawAssigned(id,operation='generic-private',io=fixedPrivateIO){
+           canonicalId(id);const limits=operationLimits(operation),signal=io.timeout(limits.timeout);
+           const response=await io.fetch('https://api.github.com/repos/'+CONTEXT.repository+'/actions/artifacts/'+id+'/zip',{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal});
+           return collectPrivateBody(response,operation,signal);
+          }
+          export function validatePeerInventory(inventory,observedAt){
+           need(Number.isSafeInteger(observedAt)&&observedAt>0);same(inventory.total_count,inventory.jobs.length);need(inventory.jobs.length===7||inventory.jobs.length===8);const names=inventory.jobs.map(x=>x.name);same(new Set(names).size,names.length);same(new Set(inventory.jobs.map(x=>canonicalId(String(x.id)))).size,names.length);same(names.filter(x=>x!=='verify').sort(),LEGACY.slice().sort());const receiver=inventory.jobs.find(x=>x.name==='verify');if(receiver){need(['pending','queued','waiting','requested'].includes(receiver.status));same(receiver.conclusion,null);}
+           const peers=LEGACY.slice(0,6).map(n=>inventory.jobs.find(j=>j.name===n)),self=inventory.jobs.find(j=>j.name==='reduction_consume_b');for(const p of peers){same(p.status,'completed');same(p.conclusion,'success');}same(self.status,'in_progress');same(self.conclusion,null);for(const peer of peers){const start=Date.parse(peer.started_at),end=Date.parse(peer.completed_at);need(Number.isSafeInteger(start)&&Number.isSafeInteger(end)&&start>0&&end>=start&&end<=observedAt);}
+           const events=LEGACY.slice(1).flatMap(n=>{const j=inventory.jobs.find(x=>x.name===n),start=Date.parse(j.started_at),end=n==='reduction_consume_b'?observedAt:Date.parse(j.completed_at);need(Number.isSafeInteger(start)&&Number.isSafeInteger(end)&&start>0&&end>=start&&end<=observedAt);return [{at:start,delta:1},{at:end,delta:-1}];}).sort((a,b)=>a.at-b.at||a.delta-b.delta);let active=0,peak=0;for(const e of events){active+=e.delta;need(active>=0);peak=Math.max(peak,active);}same(active,0);need(peak>=1&&peak<=3);return {peerJobs:peers.map(x=>({name:x.name,jobId:String(x.id),status:x.status,conclusion:x.conclusion})),selfJob:{name:self.name,jobId:String(self.id),status:self.status,conclusion:self.conclusion},observedNativeJobPeak:peak};
+          }
+          function jobBlocks(text){
+           const headers=[...text.matchAll(/^jobs:\n/gm)];same(headers.length,1);const section=text.slice(headers[0].index+headers[0][0].length),matches=[...section.matchAll(/^  ([a-z_]+):\n/gm)];
+           return Object.fromEntries(matches.map((m,n)=>[m[1],section.slice(m.index,matches[n+1]?.index??section.length)]));
+          }
+          function jobSteps(block){
+           const matches=[...block.matchAll(/^      - /gm)];
+           return matches.map((m,n)=>{const text=block.slice(m.index,matches[n+1]?.index??block.length),id=text.match(/^        id: ([a-z_]+)$/m)?.[1]??null;return {text,id,start:m.index};});
+          }
+          function fixedStep(block,id){const matches=jobSteps(block).filter(x=>x.id===id);same(matches.length,1);return matches[0];}
+          export function validateWorkflow(text){
+           const b=jobBlocks(text),deps={contracts:null,positive_prepare:['contracts'],positive_consume:['contracts','positive_prepare'],reduction_prepare:['contracts'],reduction_consume_a:['contracts','reduction_prepare'],readonly:['contracts'],reduction_consume_b:['contracts','readonly','reduction_prepare'],verify:LEGACY};
+           for(const [name,expected]of Object.entries(deps)){
+            need(typeof b[name]==='string');const dep=b[name].match(/^    needs: \[([^\]]*)\]$/m);
+            same(dep?dep[1].split(',').map(x=>x.trim()):null,expected);
+            same(Number(b[name].match(/^    timeout-minutes: (\d+)$/m)?.[1]),name==='contracts'||name==='verify'?2:name==='readonly'?7:15);
+           }
+           const peer=fixedStep(b.reduction_consume_b,'peer_download').text;
+           need(peer.includes("'/actions/runs/'+e.GITHUB_RUN_ID+'/attempts/1/jobs?per_page=100'"));
+           return true;
+          }
+          export function validateKeyScopes(text){
+           const blocks=jobBlocks(text),expected=new Map();
+           for(const job of LEGACY.slice(1)){
+            for(const id of ['custody','seal','own_open'])expected.set(job+':'+id,true);
+            if(['positive_consume','reduction_consume_a','reduction_consume_b'].includes(job))expected.set(job+':producer_open',true);
+           }
+           for(const {job}of PRIVATE_PEERS)expected.set('reduction_consume_b:peer_open_'+job,true);
+           same(expected.size,26);
+           const seen=new Set(),environments=[];
+           for(const [job,block]of Object.entries(blocks)){
+            need([...LEGACY,'verify','keyless_controls','keyless_verify'].includes(job));
+            const first=block.indexOf('      - '),header=block.slice(0,first<0?block.length:first);
+            need(!/^\s+AFW_SYN_CHECKPOINT_KEY:/m.test(header));
+            const association=header.match(/^    environment: (.+)$/m);
+            if(association)environments.push([job,association[1]]);
+            for(const step of jobSteps(block)){
+             const keyLines=[...step.text.matchAll(/^(\s+)AFW_SYN_CHECKPOINT_KEY: (.+)$/gm)];
+             if(keyLines.length===0)continue;
+             same(keyLines.length,1);same(keyLines[0][1].length,10);same(keyLines[0][2],'$'+'{{ secrets.AFW_SYN_CHECKPOINT_KEY }}');
+             const identity=job+':'+step.id;need(expected.has(identity)&&!seen.has(identity));seen.add(identity);
+             need(step.text.startsWith('      - name: Generic custody '));
+             need(!/\b(?:fetch|npm|copyFile|execFileSync|World|finite-budget-world|cp\(|node --test|GITHUB_TOKEN|GH_ARTIFACT_TOKEN)\b/.test(step.text));
+             need(step.text.includes('finite-checkpoint-custody.mjs'));
+            }
+           }
+           same(environments,LEGACY.slice(1).map(job=>[job,'afw-finite-syn-checkpoint']));
+           same([...seen].sort(),[...expected.keys()].sort());return true;
+          }
+          const NATIVE_HASHES={positive_prepare:'a5fb9018a15148200d9f974d88fceddd7b969dd1da34aec5d1d177e627a4bb1f',positive_consume:'04372215e782289cf9f9369deb3e41b692c78c7ba69db390170edee7eeb5f1b5',reduction_prepare:'0884130dfd71b58991ab0a5810d45ceb86140ba1037eb3e69a61199bc813f3f5',reduction_consume_a:'cafaa1cfe677ea408c3bd0430d87aefbac615ec55ceb621f85f1b161d3354fe4',readonly:'b5fa881c10523d636b77a787b7e92bcc14bc64e13d658bd34476f00e1d4e9f0c',reduction_consume_b:'c0566bba404f2a61b8d22f0b80272e2b1322f4799ef14f248e28736511a1d378'};
+          export function validateFixedCases(text){
+           const blocks=jobBlocks(text);
+           for(const [job,h]of Object.entries(NATIVE_HASHES)){
+            const match=blocks[job].match(/      - name: Execute fixed [^\n]+\n[\s\S]*?(?=\n      - name:)/);need(match);same(sha(match[0]),h);
+           }
+           for(const [job,cases]of Object.entries({positive_prepare:['P1'],positive_consume:['P1'],reduction_prepare:['D1','D2','D3','D4'],reduction_consume_a:['D1','D2'],readonly:['R1','R2','R3'],reduction_consume_b:['D3','D4']}))same(blocks[job].match(/^      FIXED_CASES: '([^']+)'$/m)?.[1],JSON.stringify(cases));
+           const seal=fixedStep(blocks.contracts,'pure_seal'),upload=fixedStep(blocks.contracts,'upload');need(seal.start<upload.start);const full=seal.text+upload.text;same(Buffer.byteLength(full),19458);same(sha(full),'8b239b4a5e7e4d5f424fef645a464e006c039a47763224902c4221bba2666231');return true;
+          }
+          export function validatePublicationGates(text){
+           const b=jobBlocks(text).reduction_consume_b,pair=fixedStep(b,'summary_pair'),upload=fixedStep(b,'summary_upload'),truth=fixedStep(b,'actual_outcome'),aggregate=fixedStep(b,'aggregate');
+           same(pair.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'");
+           same(upload.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled() && steps.summary_pair.outcome == 'success'");
+           same(truth.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled()");
+           need(pair.start<upload.start&&upload.start<truth.start);
+           for(const statement of ["test '$"+"{{ steps.native.outcome }}' = success","test '$"+"{{ steps.aggregate.outcome }}' = success","test '$"+"{{ steps.own_verified.outcome }}' = success","test '$"+"{{ steps.summary_pair.outputs.status }}' = passed","test '$"+"{{ steps.summary_upload.outcome }}' = success"])need(truth.text.includes(statement));
+           need(pair.text.includes('A.projectSuiteOutcome('));need(!pair.text.includes('A.makeSuite('));const load=pair.text.indexOf('await A.loadProjectionReceipts('),project=pair.text.indexOf('A.projectSuiteOutcome(');need(load>=0&&load<project);need(!pair.text.includes('readOptional('));
+           same(aggregate.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled() && steps.suite_bootstrap.outcome == 'success' && steps.native.outcome == 'success'");
+           const world=aggregate.text.indexOf("from './test/fixtures/finite-budget-world.mjs'");
+           need(world>0);
+           for(const id of ['peer_download',...PRIVATE_PEERS.map(x=>'peer_open_'+x.job)]){
+            const check="test '$"+"{{ steps."+id+".outcome }}' = success";need(aggregate.text.indexOf(check)>=0&&aggregate.text.indexOf(check)<world);
+           }
+           return true;
+          }
+          export function validatePureBindingSteps(text){
+           const blocks=jobBlocks(text);
+           for(const job of LEGACY.slice(1)){
+            const body=fixedStep(blocks[job],'pure_binding').text,start=body.indexOf('await A.finalizePureBinding(binding,async()=>{'),verify=body.indexOf("await verifyBudgetArtifact(root,'pure',e.PURE_ID)"),copy=body.indexOf("await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json')"),end=body.indexOf('});',copy);
+            need(start>=0&&verify>start&&copy>verify&&end>copy);need(!body.includes('pure-assignment.json'));
+           }
+           const pair=fixedStep(blocks.reduction_consume_b,'summary_pair').text;
+           need(pair.includes('PURE_BINDING_OUTCOME: $'+'{{ steps.pure_binding.outcome }}'));
+           for(const [key,id]of Object.entries({NATIVE_OUTCOME:'native',AGGREGATE_OUTCOME:'aggregate',OWN_METADATA_OUTCOME:'own_metadata',OWN_OPEN_OUTCOME:'own_open',OWN_VERIFIED_OUTCOME:'own_verified'}))need(pair.includes(key+': $'+'{{ steps.'+id+'.outcome }}'));
+           return true;
+          }
+          export function bindPure(readback,assignment,manifestSha256){
+           validateAssignedMetadata(readback.metadata,assignment,'pure');same(assignment.job,'contracts');same(assignment.kind,'pure');hex(manifestSha256);same(readback.rawZipSha256,assignment.zipSha256);need(readback.files instanceof Map);const files=readback.files;for(const b of files.values())need(Buffer.isBuffer(b)&&b.length<=2097152);const get=n=>{const b=files.get(n);need(b);return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(b));},m=get('budget-artifact.json');same(sha(files.get('budget-artifact.json')),manifestSha256);same(m.purpose,'afw.finite-budget-artifact.syn.v1');same(m.kind,'pure');same(m.source,CONTEXT.source);same(m.run,CONTEXT.run);same(m.attempt,'1');for(const k of ['operationalReadiness','completePackage','PCoff'])same(m[k],false);same(m.files,[...files].filter(([p])=>p!=='budget-artifact.json').map(([path,b])=>({path,bytes:b.length,sha256:sha(b)})).sort((a,b)=>a.path.localeCompare(b.path)));
+           const status=get('status.json');same(status.status,'pure_passed');same(status.source,CONTEXT.source);same(status.run,CONTEXT.run);same(status.attempt,'1');same(status.validationFailures,[]);same(status.outcomes,{PURE_TEST_OUTCOME:'success',CONTROLS_OUTCOME:'success',PREFLIGHT_OUTCOME:'success'});same(get('q-counts.json'),{tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0});const controls=get('controls.json');same(controls.passed,true);same(controls.groups.map(x=>x.group),['F1','F2','F3','F4','F5','F6','F7','F8']);need(controls.groups.every(x=>x.passed===true));const d=get('diagnostics.json'),profiles=['positive','readonly','reduction_a'];same(d.allPassed,true);same(d.profiles.map(x=>x.profile),profiles);for(const [n,group]of profiles.entries()){const p=get('preflight-'+group+'.json'),diag=d.profiles[n];same(p.group,group);same(p.source,CONTEXT.source);same(p.run,CONTEXT.run);same(p.attempt,'1');same(p.additionalSYN.length,n?3:0);same(diag.additionalSYNCount,n?3:0);same(diag.passed,true);same(diag.stage,'complete');for(const x of [p,diag]){same(x.I0Opened,false);same(x.nativeExecutionProduced,false);}}for(const x of [status,controls,d]){same(x.I0Opened,false);same(x.nativeExecutionProduced,false);}need(files.get('preflight.json').equals(files.get('preflight-positive.json')));return {artifactId:assignment.id,zipSha256:assignment.zipSha256,manifestSha256,profiles,purePassed:true,beforeI0:true};
+          }
+          export async function bindPureCurrent(assignment,manifestSha256){
+           requireKeyless();const m=await metadata(assignment.id);same(m.status,200);validateAssignedMetadata(m.value,assignment,'pure');const raw=await rawAssigned(assignment.id,'pure');same(raw.length,m.value.size_in_bytes);same(sha(raw),assignment.zipSha256);const files=new Map(),root=join(process.env.RUNNER_TEMP,'afw-prior-pure');for(const n of (await readdir(root)).sort()){need(/^[a-z0-9_-]+\.json$/.test(n));const st=await lstat(join(root,n));need(st.isFile()&&st.nlink===1&&st.size<=2097152);files.set(n,await readFile(join(root,n)));}return bindPure({metadata:m.value,files,rawZipSha256:sha(raw)},assignment,manifestSha256);
+          }
+          const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;
+          function rangeEnd(start,length,limit){need(Number.isSafeInteger(limit)&&Number.isSafeInteger(start)&&Number.isSafeInteger(length)&&start>=0&&length>=0&&start<=limit&&length<=limit-start);return start+length;}
+          const crcTable=Uint32Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
+          const crc32=b=>{let c=0xffffffff;for(const x of b)c=crcTable[(c^x)&255]^(c>>>8);return(c^0xffffffff)>>>0;};
+          // Generic single-disk classic ZIP3 framing derived from the protected custody reader; no R2 model or CLI.
+          export function decodePrivateZip(bytes){
+           need(Buffer.isBuffer(bytes)&&bytes.length>=22&&bytes.length<=PRIVATE_CAP);const limit=bytes.length,end=limit-22,u16=n=>bytes.readUInt16LE(n),u32=n=>bytes.readUInt32LE(n),tuple=n=>[u32(n),u32(n+4),u32(n+8)],eq=(a,b)=>a.every((v,i)=>v===b[i]);
+           need(u32(end)===0x06054b50&&u16(end+4)===0&&u16(end+6)===0&&u16(end+8)===3&&u16(end+10)===3&&u16(end+20)===0);
+           const central=u32(end+16);same(rangeEnd(central,u32(end+12),end),end);let cursor=central;const members=[],remaining=new Set(['envelope.bin','manifest.json','receipt.json']);
+           const extras=(a,b)=>{while(a<b){rangeEnd(a,4,b);need(u16(a)!==1);a=rangeEnd(a+4,u16(a+2),b);}same(a,b);};
+           for(let i=0;i<3;i++){rangeEnd(cursor,46,end);need(u32(cursor)===0x02014b50);const a=cursor+46,b=rangeEnd(a,u16(cursor+28),end),c=rangeEnd(b,u16(cursor+30),end),finish=rangeEnd(c,u16(cursor+32),end),raw=bytes.subarray(a,b),name=new TextDecoder('utf-8',{fatal:true}).decode(raw);need(Buffer.from(name).equals(raw)&&remaining.delete(name)&&u16(cursor+32)===0&&u16(cursor+34)===0);
+           const flags=u16(cursor+8),method=u16(cursor+10),sizes=tuple(cursor+16),local=u32(cursor+42),attrs=u32(cursor+38),kind=attrs>>>16&0xf000;need((kind===0||kind===0x8000)&&(attrs&0x10)===0&&(method===0||method===8)&&(flags&~(method===8?0x080e:0x0808))===0&&sizes[1]!==0xffffffff&&sizes[2]!==0xffffffff&&local!==0xffffffff);need(sizes[2]<=(name==='envelope.bin'?128*MiB:4096));if(method===0)same(sizes[1],sizes[2]);extras(b,c);members.push({name,raw,flags,method,sizes,local,version:u16(cursor+6),time:u32(cursor+12)});cursor=finish;}
+           same(cursor,end);same(remaining.size,0);members.sort((a,b)=>a.local-b.local);let last=0,total=0;const result=new Map();
+           for(const m of members){const {local,raw,flags,method,sizes}=m;same(last,local);rangeEnd(local,30,central);need(u32(local)===0x04034b50&&u16(local+4)===m.version&&u16(local+6)===flags&&u16(local+8)===method&&u32(local+10)===m.time);const ls=tuple(local+14),descriptor=(flags&8)!==0;need(ls.every((v,i)=>v===sizes[i]||(descriptor&&v===0)));const a=local+30,b=rangeEnd(a,u16(local+26),central);need(bytes.subarray(a,b).equals(raw));const start=rangeEnd(b,u16(local+28),central);extras(b,start);last=rangeEnd(start,sizes[1],central);
+           if(descriptor){rangeEnd(last,12,central);const bare=eq(tuple(last),sizes),signed=central-last>=16&&u32(last)===0x08074b50&&eq(tuple(last+4),sizes);need(bare!==signed);last=rangeEnd(last,signed?16:12,central);}
+           const input=bytes.subarray(start,start+sizes[1]),data=method===0?input:inflateRawSync(input,{maxOutputLength:m.name==='envelope.bin'?128*MiB:4096});same(data.length,sizes[2]);same(crc32(data),sizes[0]);total+=data.length;need(total<=EXPANDED_CAP);result.set(m.name,data);}
+           same(last,central);return result;
+          }
+          
+          export async function assignedPrivate(binding,destination){
+           requireKeyless();const fixed={producer:'afw-producer-envelope',own:'afw-native-readback',...Object.fromEntries(PRIVATE_PEERS.map(x=>[x.job,'afw-qualification-peer-proof/'+x.job+'-sealed']))};need(Object.hasOwn(fixed,destination));const r=await metadata(binding.id);same(r.status,200);validateAssignedMetadata(r.value,binding,'generic-private');const bytes=await rawAssigned(binding.id,'generic-private');same(bytes.length,r.value.size_in_bytes);same(sha(bytes),binding.zipSha256);const files=decodePrivateZip(bytes);validatePrivateReceiptCaps(files,binding.kind);const dir=join(process.env.RUNNER_TEMP,fixed[destination]);await mkdir(dir,{mode:0o700});for(const [n,b]of files)await writeFile(join(dir,n),b,{flag:'wx',mode:0o600});return {binding,metadata:r.value,rawZipBytes:bytes.length,rawZipSha256:sha(bytes)};
+          }
+          const JOB_CONFIG={positive_prepare:{role:'producer',group:'positive',lane:'positive',kind:'checkpoint',cases:['P1']},positive_consume:{role:'consumer',group:'positive',lane:'positive',kind:'positive-result',cases:['P1']},reduction_prepare:{role:'producer',group:'reduction_a',lane:'reduction',kind:'reduction-checkpoint',cases:['D1','D2','D3','D4']},reduction_consume_a:{role:'consumer',group:'reduction_a',lane:'reduction_a',kind:'reduction-result-a',cases:['D1','D2']},readonly:{role:'consumer',group:'readonly',lane:'readonly',kind:'readonly-result',cases:['R1','R2','R3']},reduction_consume_b:{role:'consumer',group:'reduction_b',lane:'reduction_b',kind:'reduction-result-b',cases:['D3','D4']}};
+          export function manifestIdentity(job,kind){const cfg=JOB_CONFIG[job];return {purpose:'afw.fixed-budget-job.syn.v1',repository:CONTEXT.repository,ref:CONTEXT.ref,source:CONTEXT.source,sourceTree:CONTEXT.tree,run:CONTEXT.run,attempt:1,job,role:cfg.role,kind,group:cfg.group,lane:cfg.lane,cases:cfg.cases,commandSucceeded:kind===cfg.kind,jobStarted:1,sealedAt:2,...FLAGS};}
+          export function validateInnerManifest(manifest,binding){
+           const cfg=JOB_CONFIG[binding.job];need(cfg);fields(manifest,['purpose','repository','ref','source','sourceTree','run','attempt','job','role','kind','group','lane','cases','commandSucceeded','jobStarted','sealedAt',...Object.keys(FLAGS)]);
+           const success=binding.kind===cfg.kind;need(success||binding.kind===(cfg.role==='producer'?'producer-failure':'consumer-failure'));const expected=manifestIdentity(binding.job,binding.kind);for(const k of Object.keys(expected).filter(k=>!['jobStarted','sealedAt'].includes(k)))same(manifest[k],expected[k]);need(Number.isSafeInteger(manifest.jobStarted)&&manifest.jobStarted>0&&Number.isSafeInteger(manifest.sealedAt)&&manifest.sealedAt>=manifest.jobStarted);return success;
+          }
+          export function validateReopenedSuite({proofBytes,originalProofBytes,originalManifestBytes,reopenedManifestBytes,ownBinding,expectedContext,expectedPeers}){
+           same(expectedContext,CONTEXT);same(ownBinding.job,'reduction_consume_b');same(ownBinding.kind,'reduction-result-b');canonicalId(ownBinding.id);hex(ownBinding.zipSha256);need(Buffer.isBuffer(proofBytes)&&Buffer.isBuffer(originalProofBytes)&&proofBytes.equals(originalProofBytes));need(Buffer.isBuffer(originalManifestBytes)&&Buffer.isBuffer(reopenedManifestBytes)&&originalManifestBytes.equals(reopenedManifestBytes));validateInnerManifest(JSON.parse(reopenedManifestBytes),ownBinding);fields(expectedPeers,['pure','peers']);fields(expectedPeers.pure,['artifactId','zipSha256']);canonicalId(expectedPeers.pure.artifactId);hex(expectedPeers.pure.zipSha256);same(expectedPeers.peers.map(x=>({job:x.job,kind:x.kind})),PRIVATE_PEERS);for(const x of expectedPeers.peers){fields(x,['job','kind','artifactId','zipSha256']);canonicalId(x.artifactId);hex(x.zipSha256);}
+           const p=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(proofBytes));fields(p,['purpose','source','run','attempt','observedAt','businessCounts','Q','R','D','P','lineages','occurrenceProof','consumerOverlap','receipts','jobs','observedNativeJobPeak','nativeJobBound','miniflarePerJobBound','globalMiniflareBound','requiresRootAllTerminalReadback',...Object.keys(FLAGS)]);same(p.purpose,'afw.fixed-budget-coherent-private-proof.syn.v1');same(p.source,CONTEXT.source);same(p.run,CONTEXT.run);same(p.attempt,1);same(p.businessCounts,{tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0});same([p.Q,p.P,p.R,p.D],[8,1,3,4]);same(p.lineages.map(x=>x.kind),['positive','reduction','R1','R2','R3']);
+           for(const l of p.lineages){need(Number.isSafeInteger(l.I0)&&l.I0>0);same(l.C0,l.I0+900000);same(l.C1,l.C0+180000);hex(l.sdkRootHash);same(l.graphs.map(x=>x.role).sort(),['M','QA']);for(const x of l.graphs)hex(x.sha256);}
+           same(p.occurrenceProof.map(x=>x.caseName),['positive_producer','reduction_producer','R1','R2','R3']);same(p.occurrenceProof.length,5);for(const [n,o]of p.occurrenceProof.entries()){same(o.occurrence,n+1);need(typeof o.caseName==='string'&&o.caseName.length>0);need(Number.isSafeInteger(o.allocationOrdinal)&&o.allocationOrdinal>0);same(o.graphs.length,2);same(o.graphs.map(x=>x.role).sort(),['M','QA']);for(const g of o.graphs){same(g.mounted,true);same(g.sha256,p.lineages[n].graphs.find(x=>x.role===g.role).sha256);}}
+           const overlap=p.consumerOverlap;fields(overlap,['aStart','aEnd','bStart','bEnd','allFourReady','C0']);for(const n of Object.values(overlap))need(Number.isSafeInteger(n)&&n>0);need(overlap.aStart<overlap.aEnd&&overlap.bStart<overlap.bEnd&&Math.max(overlap.aStart,overlap.bStart)<Math.min(overlap.aEnd,overlap.bEnd));same(overlap.C0,p.lineages[1].C0);need(overlap.allFourReady<=overlap.C0-30000);
+           same(p.receipts.length,6);const wanted=[{job:'contracts',kind:'pure',...expectedPeers.pure},...expectedPeers.peers];for(const [n,r]of p.receipts.entries()){fields(r,['artifactId','digest','name','kind']);same(r.artifactId,wanted[n].artifactId);same(r.digest,'sha256:'+wanted[n].zipSha256);same(r.kind,wanted[n].kind);same(r.name,artifactName(wanted[n].job));}
+           const inventory={total_count:p.jobs.length,jobs:p.jobs.map(j=>{fields(j,['id','name','status','conclusion','startedAt','completedAt']);return {...j,started_at:j.startedAt,completed_at:j.completedAt};})};need(Number.isSafeInteger(p.observedAt)&&p.observedAt>0);const ownManifest=JSON.parse(reopenedManifestBytes),self=inventory.jobs.find(x=>x.name==='reduction_consume_b');need(Date.parse(self.started_at)<=p.observedAt&&p.observedAt<=ownManifest.sealedAt);const observation=validatePeerInventory(inventory,p.observedAt);same(p.observedNativeJobPeak,observation.observedNativeJobPeak);same([p.nativeJobBound,p.miniflarePerJobBound,p.globalMiniflareBound],[3,2,6]);same(p.requiresRootAllTerminalReadback,true);for(const k of Object.keys(FLAGS))same(p[k],false);
+           return {counts:{Q:p.Q,P:p.P,R:p.R,D:p.D,native:p.P+p.R+p.D,...p.businessCounts},cases:['P1','R1','R2','R3','D1','D2','D3','D4'],lineages:p.lineages.length,graphs:p.lineages.flatMap(x=>x.graphs).length,replicaOverlap:true,allFourReadyBeforeC0Minus30s:true,sharedReductionClock:true,C0MinusI0Ms:900000,C1MinusC0Ms:180000,observedNativeJobPeak:observation.observedNativeJobPeak,nativeJobBound:p.nativeJobBound,miniflarePerJobBound:p.miniflarePerJobBound,globalMiniflareBound:p.globalMiniflareBound,privateProofSha256:sha(proofBytes),peerJobs:observation.peerJobs,selfJob:observation.selfJob,peerArtifacts:expectedPeers.peers,requiresRootAllTerminalReadback:true};
+          }
+          function common(value,expected){
+           fields(value.context,['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node']);same(value.context,expected.context);same(value.context.repository,'tokenizartinfo-ops/agent-friendly-web');same(value.context.repositoryId,'1347578006');same(value.context.ref,'refs/heads/feat/finite-native-cleanup-20261101');same(value.context.attempt,1);same(value.context.node,'22.23.4');for(const k of ['source','tree','workflowBlob'])hex(value.context[k],40);canonicalId(value.context.run);fields(value.sourcePins,Object.keys(SOURCE_PINS));same(value.sourcePins,SOURCE_PINS);same(value.sourcePins,expected.sourcePins);fields(value.programHashes,['adapter','controls','verifier','safeZip']);same(value.programHashes,expected.programHashes);for(const h of Object.values(value.programHashes))hex(h);same(value.programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');same(new Set(Object.values(value.programHashes)).size,4);for(const f of Object.keys(FLAGS))same(value[f],false);
+          }
+          function validateProof(p){
+           fields(p,['counts','cases','lineages','graphs','replicaOverlap','allFourReadyBeforeC0Minus30s','sharedReductionClock','C0MinusI0Ms','C1MinusC0Ms','observedNativeJobPeak','nativeJobBound','miniflarePerJobBound','globalMiniflareBound','privateProofSha256','peerJobs','selfJob','peerArtifacts','requiresRootAllTerminalReadback']);same(p.counts,{Q:8,P:1,R:3,D:4,native:8,tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0});same(p.cases,['P1','R1','R2','R3','D1','D2','D3','D4']);same(p.lineages,5);same(p.graphs,10);for(const k of ['replicaOverlap','allFourReadyBeforeC0Minus30s','sharedReductionClock','requiresRootAllTerminalReadback'])same(p[k],true);same(p.C0MinusI0Ms,900000);same(p.C1MinusC0Ms,180000);need(Number.isSafeInteger(p.observedNativeJobPeak)&&p.observedNativeJobPeak>=1&&p.observedNativeJobPeak<=3);same([p.nativeJobBound,p.miniflarePerJobBound,p.globalMiniflareBound],[3,2,6]);hex(p.privateProofSha256);same(p.peerJobs.map(x=>x.name),LEGACY.slice(0,6));for(const j of p.peerJobs){fields(j,['name','jobId','status','conclusion']);canonicalId(j.jobId);same(j.status,'completed');same(j.conclusion,'success');}fields(p.selfJob,['name','jobId','status','conclusion']);same(p.selfJob.name,'reduction_consume_b');canonicalId(p.selfJob.jobId);same(p.selfJob.status,'in_progress');same(p.selfJob.conclusion,null);same(new Set([...p.peerJobs,p.selfJob].map(x=>x.jobId)).size,7);same(p.peerArtifacts.map(x=>({job:x.job,kind:x.kind})),PRIVATE_PEERS);for(const r of p.peerArtifacts){fields(r,['job','kind','artifactId','zipSha256']);canonicalId(r.artifactId);hex(r.zipSha256);}same(new Set(p.peerArtifacts.map(x=>x.artifactId)).size,5);
+          }
+          function deriveFailure(v){
+           if(v.command==='failed')return {stage:'native_b',reason:'command_failed'};
+           if(v.pure===null)return {stage:'pure',reason:'pure_unverified'};
+           if(v.command==='not_observed')return {stage:'native_b',reason:'not_observed'};
+           if(v.aggregate==='not_observed')return {stage:'aggregate',reason:'not_observed'};
+           if(v.aggregate==='unverified')return {stage:'aggregate',reason:'evidence_unverified'};
+           if(v.custody.state==='unavailable')return {stage:'custody',reason:'assignment_unverified'};
+           if(v.custody.state==='assigned'){need(v.failure?.stage==='custody'&&['assignment_unverified','reopen_unverified','proof_unverified'].includes(v.failure.reason));return v.failure;}
+           return null;
+          }
+          export function validateSuite(v,expected={context:CONTEXT,sourcePins:PINS,programHashes:PROGRAM_HASHES}){
+           fields(v,['purpose','context','sourcePins','programHashes','status','command','aggregate','pure','custody','proof','failure',...Object.keys(FLAGS)]);common(v,expected);same(v.purpose,'afw.coherent-suite.safe.v1');need(['passed','failed','unavailable'].includes(v.status));need(['not_observed','failed','passed'].includes(v.command));need(['not_observed','unverified','verified'].includes(v.aggregate));
+           if(v.pure!==null){fields(v.pure,['artifactId','zipSha256','manifestSha256','profiles','purePassed','beforeI0']);canonicalId(v.pure.artifactId);hex(v.pure.zipSha256);hex(v.pure.manifestSha256);same(v.pure.profiles,['positive','readonly','reduction_a']);same(v.pure.purePassed,true);same(v.pure.beforeI0,true);}else {same(v.command,'not_observed');same(v.aggregate,'not_observed');}
+           if(v.command!=='passed')same(v.aggregate,'not_observed');fields(v.custody,['state','artifact']);need(['unavailable','assigned','reopened'].includes(v.custody.state));if(v.custody.state==='unavailable')same(v.custody.artifact,null);else {const a=v.custody.artifact;fields(a,['id','zipSha256','kind']);canonicalId(a.id);hex(a.zipSha256);same(a.kind,v.command==='passed'&&v.aggregate==='verified'?'reduction-result-b':'consumer-failure');}
+           const pass=v.command==='passed'&&v.aggregate==='verified'&&v.pure!==null&&v.custody.state==='reopened'&&v.custody.artifact.kind==='reduction-result-b';same(v.status,pass?'passed':v.command==='failed'?'failed':'unavailable');if(pass){same(v.failure,null);validateProof(v.proof);same(new Set([v.pure.artifactId,...v.proof.peerArtifacts.map(x=>x.artifactId),v.custody.artifact.id]).size,7);}else {same(v.proof,null);fields(v.failure,['stage','reason']);same(v.failure,deriveFailure(v));}return v;
+          }
+          export function makeSuite({context,sourcePins,programHashes,command,aggregate,pure,custody,proof,failure}){
+           const v={purpose:'afw.coherent-suite.safe.v1',context,sourcePins,programHashes,status:command==='passed'&&aggregate==='verified'&&pure!==null&&custody.state==='reopened'&&custody.artifact.kind==='reduction-result-b'?'passed':command==='failed'?'failed':'unavailable',command,aggregate,pure,custody,proof,failure,...FLAGS};validateSuite(v);return v;
+          }
+          export function validateControls(v,expected={context:CONTEXT,sourcePins:PINS,programHashes:PROGRAM_HASHES}){
+           fields(v,['purpose','context','sourcePins','programHashes','status','expected','completed','passed','failed','inventory','firstFailure','realCustodyKeyBound','NativeExecuted','SDKImported','MFAllocated',...Object.keys(FLAGS)]);common(v,expected);same(v.purpose,'afw.coherent-suite.controls.safe.v1');same(v.expected,6);same(v.inventory.map(x=>x.id),IDS);for(const x of v.inventory){fields(x,['id','status']);need(['passed','failed','not_executed'].includes(x.status));}for(const k of ['realCustodyKeyBound','NativeExecuted','SDKImported','MFAllocated'])same(v[k],false);const first=v.inventory.findIndex(x=>x.status!=='passed');if(first===-1){same([v.status,v.completed,v.passed,v.failed,v.firstFailure],['passed',6,6,0,null]);}else {same(v.inventory[first].status,'failed');same(v.inventory.slice(first+1).map(x=>x.status),Array(5-first).fill('not_executed'));same([v.status,v.completed,v.passed,v.failed,v.firstFailure],['failed',first+1,first,1,IDS[first]]);}return v;
+          }
+          export function makeManifest(kind,resultBytes,context){need(kind==='suite'||kind==='controls');return {purpose:kind==='suite'?'afw.coherent-suite-manifest.safe.v1':'afw.coherent-suite.controls-manifest.safe.v1',source:context.source,run:context.run,attempt:1,files:[{path:'result.json',bytes:resultBytes.length,sha256:sha(resultBytes)}]};}
+          export async function publishPair(kind,result){
+           requireKeyless();(kind==='suite'?validateSuite:validateControls)(result);const bytes=canonical(result),manifest=canonical(makeManifest(kind,bytes,result.context));need(bytes.length+manifest.length<=65536);const files=new Map([['result.json',bytes],['manifest.json',manifest]]),root=join(process.env.RUNNER_TEMP,kind==='suite'?'afw-suite-safe':'afw-suite-controls-safe');await mkdir(root,{mode:0o700,recursive:true});same((await readdir(root)).filter(x=>!['manifest.json','result.json'].includes(x)),[]);for(const [n,b]of files)await writeFile(join(root,n),b,{mode:0o600});same((await readdir(root)).sort(),['manifest.json','result.json']);return files;
+          }
+          
+          export function validatePrivateReceiptCaps(files,kind){
+           const r=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(files.get('receipt.json'))),partial=['producer-failure','consumer-failure'].includes(kind);need(Number.isSafeInteger(r.fileCount)&&r.fileCount>=(partial?0:1)&&r.fileCount<=(partial?4096:512));need(Number.isSafeInteger(r.totalBytes)&&r.totalBytes>=0&&r.totalBytes<=(partial?512:128)*1048576);return r;
+          }
+          
+          function validatePureReceipt(receipt){
+           fields(receipt,['artifactId','zipSha256','manifestSha256','profiles','purePassed','beforeI0']);canonicalId(receipt.artifactId);hex(receipt.zipSha256);hex(receipt.manifestSha256);same(receipt.profiles,['positive','readonly','reduction_a']);same(receipt.purePassed,true);same(receipt.beforeI0,true);return receipt;
+          }
+          const fixedReceiptIO={write:(path,bytes,options)=>writeFile(path,bytes,options)};
+          export async function finalizePureBinding(receipt,originalWork,io=fixedReceiptIO){
+           requireKeyless();validatePureReceipt(receipt);need(typeof originalWork==='function');await originalWork();validatePureReceipt(receipt);
+           await io.write(join(process.env.RUNNER_TEMP,'afw-native-private/pure-assignment.json'),JSON.stringify(receipt)+'\n',{flag:'wx',mode:0o600});return receipt;
+          }
+          export function projectSuiteOutcome({outcomes,receipts}){
+           validateProjectionOutcomes(outcomes);
+           fields(receipts,['pure','assignment','proof']);
+           const observed=value=>value==='success'||value==='failure';
+           const pure=outcomes.pureBinding==='success'&&receipts.pure!==null?validatePureReceipt(receipts.pure):null;
+           if(pure===null)need(!observed(outcomes.native)&&!observed(outcomes.aggregate));
+           const command=pure===null||!observed(outcomes.native)?'not_observed':outcomes.native==='success'?'passed':'failed';
+           if(command!=='passed')need(!observed(outcomes.aggregate));
+           const aggregate=command!=='passed'?'not_observed':outcomes.aggregate==='success'?'verified':outcomes.aggregate==='failure'?'unverified':'not_observed';
+           let assignment=receipts.assignment;
+           if(assignment!==null){
+            fields(assignment,['id','zipSha256','kind']);canonicalId(assignment.id);hex(assignment.zipSha256);
+            same(assignment.kind,command==='passed'&&aggregate==='verified'?'reduction-result-b':'consumer-failure');
+           }
+           if(outcomes.ownMetadata==='success')need(assignment!==null);
+           if(outcomes.ownOpen==='success')same(outcomes.ownMetadata,'success');
+           if(outcomes.ownValidation==='success')same(outcomes.ownOpen,'success');
+           const custody=assignment===null?{state:'unavailable',artifact:null}:{state:outcomes.ownValidation==='success'?'reopened':'assigned',artifact:assignment};
+           let proof=null,failure=null;
+           if(command==='failed')failure={stage:'native_b',reason:'command_failed'};
+           else if(pure===null)failure={stage:'pure',reason:'pure_unverified'};
+           else if(command==='not_observed')failure={stage:'native_b',reason:'not_observed'};
+           else if(aggregate==='not_observed')failure={stage:'aggregate',reason:'not_observed'};
+           else if(aggregate==='unverified')failure={stage:'aggregate',reason:'evidence_unverified'};
+           else if(assignment===null||outcomes.ownMetadata!=='success')failure={stage:'custody',reason:'assignment_unverified'};
+           else if(outcomes.ownOpen!=='success')failure={stage:'custody',reason:'reopen_unverified'};
+           else if(outcomes.ownValidation!=='success')failure={stage:'custody',reason:'proof_unverified'};
+           else {need(receipts.proof!==null);proof=receipts.proof;}
+           return makeSuite({context:CONTEXT,sourcePins:PINS,programHashes:PROGRAM_HASHES,command,aggregate,pure,custody,proof,failure});
+          }
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
+          NODE_POSTMORTEM_ADAPTER
+          cat >"$RUNNER_TEMP/afw-postmortem-inspector.mjs" <<'NODE_POSTMORTEM_INSPECTOR'
+          import assert from 'node:assert/strict';
+          import * as A from './afw-postmortem-adapter.mjs';
+          const need=ok=>assert(ok,'postmortem_invariant_rejected');
+          export const FLAGS=Object.freeze({operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
+          export const SUBJECT=Object.freeze({repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/feat/finite-native-cleanup-20261101',source:'b8497734abe5f6afdcc7c518e82a591438353f14',tree:'1c0e1a87fa759ea07dc117931c37258067d3b1c0',workflowBlob:'5eaf4f5e5497711e219999fa14c51501a82f94d2',run:'43414661211',attempt:1,node:'22.23.4'});
+          export const TARGETS=Object.freeze([
+           Object.freeze({job:'positive_prepare',kind:'checkpoint',artifactId:'14032036855',expectedBytes:27586034,expectedSha256:'aa9c330d881abfe6ed352a52b87593b884743c6912497269a5f7202f545e2644',name:'finite-budget-positive_prepare-b8497734abe5f6afdcc7c518e82a591438353f14-43414661211',expiresAt:'2026-11-20T11:22:46Z'}),
+           Object.freeze({job:'reduction_prepare',kind:'reduction-checkpoint',artifactId:'14032480638',expectedBytes:27469695,expectedSha256:'201b4b831506a02966cc0d3af7bf067e138401fc15203e6363b926cdf85dd5d6',name:'finite-budget-reduction_prepare-b8497734abe5f6afdcc7c518e82a591438353f14-43414661211',expiresAt:'2026-11-20T11:22:53Z'})
+          ]);
+          const CONTEXT_KEYS=['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node'];
+          const HASH_KEYS=['adapter','inspector','controls','safeZip','receiver'];
+          const TARGET_KEYS=['job','kind','artifactId','expectedBytes','expectedSha256','outcome','stage','metadataVerified','rawVerified','zipVerified','fileCount','totalBytes','successReceiptCapAccepted'];
+          const RESULT_KEYS=['purpose','observer','subject','programHashes','targets','controls','inspectionComplete','historicalCauseProven','receiptAuthenticated',...Object.keys(FLAGS)];
+          const CONTROL_IDS=Object.freeze({
+           diagnostic:['postmortem_original_prefix_binding','postmortem_subject_observer_separation','postmortem_original_receipt_cap_boundaries','postmortem_stage_sequence','postmortem_metadata_failure_blocks_archive','postmortem_target_null_and_cap_coherence','postmortem_error_redaction'],
+           zip:['zip_valid_store_crc_vector','zip_valid_deflate','zip_signed_unsigned_descriptors','zip_wrong_size','zip_wrong_upload_sha','zip_wrong_metadata_sha','zip_extra_entry','zip_duplicate_entry','zip_traversal_entry','zip_symlink','zip_bad_crc','zip_noncontiguous_ranges','zip_declared_and_inflate_caps','download_stream_redirect_auth_bounds'],
+           receiver:['postmortem_pair_schema_manifest_binding','postmortem_route_direct_output_binding']
+          });
+          export function canonical(v){return Buffer.from(JSON.stringify(v)+'\n');}
+          export function parseCanonical(b,cap=65536){
+           need(Buffer.isBuffer(b)&&b.length>0&&b.length<=cap);const s=new TextDecoder('utf-8',{fatal:true}).decode(b);need(Buffer.from(s).equals(b));const value=JSON.parse(s);need(canonical(value).equals(b));return value;
+          }
+          export function validateContext(v){
+           A.fields(v,CONTEXT_KEYS);need(v.repository===SUBJECT.repository&&v.repositoryId===SUBJECT.repositoryId&&v.ref===SUBJECT.ref&&v.attempt===1&&v.node==='22.23.4');A.canonicalId(v.repositoryId);A.canonicalId(v.run);for(const k of ['source','tree','workflowBlob'])A.hex(v[k],40);return v;
+          }
+          export function validateExpected(expected){
+           A.fields(expected,['observer','programHashes']);validateContext(expected.observer);need(expected.observer.source!==SUBJECT.source&&expected.observer.run!==SUBJECT.run);A.fields(expected.programHashes,HASH_KEYS);for(const k of HASH_KEYS)A.hex(expected.programHashes[k]);return expected;
+          }
+          function validateDescriptor(t){
+           A.fields(t,['job','kind','artifactId','expectedBytes','expectedSha256','name','expiresAt']);const fixed=TARGETS.find(x=>x.job===t.job);need(fixed&&t.kind===fixed.kind&&t.artifactId===fixed.artifactId&&t.name===fixed.name&&t.expiresAt===fixed.expiresAt);need(Number.isSafeInteger(t.expectedBytes)&&t.expectedBytes>0&&t.expectedBytes<=136314880);A.hex(t.expectedSha256);return t;
+          }
+          function assertFixedTarget(t){validateDescriptor(t);assert.deepEqual(t,TARGETS.find(x=>x.job===t.job),'postmortem_fixed_target_rejected');}
+          const fixedTargetIO=Object.freeze({
+           metadata:async t=>{A.requireKeyless();assertFixedTarget(t);return A.metadata(t.artifactId);},
+           raw:async t=>{A.requireKeyless();assertFixedTarget(t);return A.rawAssigned(t.artifactId,'generic-private');}
+          });
+          function blank(t){return {job:t.job,kind:t.kind,artifactId:t.artifactId,expectedBytes:t.expectedBytes,expectedSha256:t.expectedSha256,outcome:'unavailable',stage:'metadata_http',metadataVerified:false,rawVerified:false,zipVerified:false,fileCount:null,totalBytes:null,successReceiptCapAccepted:null};}
+          function finish(r,stage,outcome){r.stage=stage;r.outcome=outcome;return r;}
+          function metadataBound(meta,t){
+           A.validateAssignedMetadata(meta,{job:t.job,kind:t.kind,id:t.artifactId,zipSha256:t.expectedSha256},'generic-private');need(meta.size_in_bytes===t.expectedBytes&&meta.expires_at===t.expiresAt&&meta.name===t.name);
+           for(const k of ['repository_id','head_repository_id'])if(Object.hasOwn(meta.workflow_run,k))need(Number.isSafeInteger(meta.workflow_run[k])&&meta.workflow_run[k]===1347578006);
+          }
+          function countsValid(r){return r&&typeof r==='object'&&!Array.isArray(r)&&Number.isSafeInteger(r.fileCount)&&r.fileCount>=1&&r.fileCount<=4096&&Number.isSafeInteger(r.totalBytes)&&r.totalBytes>=0&&r.totalBytes<=536870912;}
+          export async function inspectTarget(target,io=fixedTargetIO){
+           A.requireKeyless();validateDescriptor(target);const r=blank(target);let response;
+           try{A.requireKeyless();response=await io.metadata(target);}catch{return r;}
+           if(!response||response.status!==200)return r;
+           try{metadataBound(response.value,target);}catch{return finish(r,'metadata_binding','rejected');}
+           r.metadataVerified=true;let bytes;
+           try{A.requireKeyless();bytes=await io.raw(target);}catch{return finish(r,'raw_download','unavailable');}
+           if(!Buffer.isBuffer(bytes)||bytes.length!==target.expectedBytes)return finish(r,'raw_size','rejected');
+           if(A.sha(bytes)!==target.expectedSha256||response.value.digest!=='sha256:'+A.sha(bytes))return finish(r,'raw_digest','rejected');
+           r.rawVerified=true;let files;
+           try{files=A.decodePrivateZip(bytes);}catch{return finish(r,'zip_decode','rejected');}
+           r.zipVerified=true;let receipt;
+           try{const b=files.get('receipt.json');need(Buffer.isBuffer(b)&&b.length>0&&b.length<=4096);const text=new TextDecoder('utf-8',{fatal:true}).decode(b);need(Buffer.from(text).equals(b));receipt=JSON.parse(text);need(Buffer.from(JSON.stringify(receipt)).equals(b));}catch{return finish(r,'receipt_json','rejected');}
+           if(!countsValid(receipt))return finish(r,'receipt_counts','rejected');
+           r.fileCount=receipt.fileCount;r.totalBytes=receipt.totalBytes;
+           try{A.validatePrivateReceiptCaps(files,target.kind);}catch{r.successReceiptCapAccepted=false;return finish(r,'receipt_caps','rejected');}
+           r.successReceiptCapAccepted=true;return finish(r,'complete','accepted');
+          }
+          export function validateTargetRecord(r,t){
+           A.fields(r,TARGET_KEYS);for(const k of ['job','kind','artifactId','expectedBytes','expectedSha256'])need(r[k]===t[k]);
+           for(const k of ['metadataVerified','rawVerified','zipVerified'])need(typeof r[k]==='boolean');
+           const states={
+            metadata_http:['unavailable',false,false,false,false,null],
+            metadata_binding:['rejected',false,false,false,false,null],
+            raw_download:['unavailable',true,false,false,false,null],
+            raw_size:['rejected',true,false,false,false,null],
+            raw_digest:['rejected',true,false,false,false,null],
+            zip_decode:['rejected',true,true,false,false,null],
+            receipt_json:['rejected',true,true,true,false,null],
+            receipt_counts:['rejected',true,true,true,false,null],
+            receipt_caps:['rejected',true,true,true,true,false],
+            complete:['accepted',true,true,true,true,true]
+           };
+           const s=states[r.stage];need(s&&r.outcome===s[0]&&r.metadataVerified===s[1]&&r.rawVerified===s[2]&&r.zipVerified===s[3]&&r.successReceiptCapAccepted===s[5]);
+           if(s[4]){need(countsValid(r));const inOriginal=r.fileCount<=512&&r.totalBytes<=134217728;need(inOriginal===s[5]);}else need(r.fileCount===null&&r.totalBytes===null);return r;
+          }
+          export function validateControls(v){
+           A.fields(v,['diagnostic','zip','receiver']);
+           for(const [key,ids]of Object.entries(CONTROL_IDS)){
+            const g=v[key];A.fields(g,['expected','completed','passed','failed','inventory']);need(g.expected===ids.length&&Array.isArray(g.inventory)&&g.inventory.length===ids.length);
+            let completed=0,passed=0,failed=0;g.inventory.forEach((x,n)=>{A.fields(x,['id','status']);need(x.id===ids[n]&&['passed','failed','not_executed'].includes(x.status));if(x.status!=='not_executed')completed++;if(x.status==='passed')passed++;if(x.status==='failed')failed++;});
+            need(g.completed===completed&&g.passed===passed&&g.failed===failed&&g.completed===ids.length&&g.passed===ids.length&&g.failed===0);
+           }
+           return v;
+          }
+          export function reachedDecision(r){return r.stage==='complete'||r.stage==='receipt_caps';}
+          export function validateResult(v,expected){
+           validateExpected(expected);A.fields(v,RESULT_KEYS);need(v.purpose==='afw.custody-postmortem.safe.v1');validateContext(v.observer);validateContext(v.subject);assert.deepEqual(v.observer,expected.observer,'postmortem_observer_rejected');assert.deepEqual(v.subject,SUBJECT,'postmortem_subject_rejected');assert.deepEqual(v.programHashes,expected.programHashes,'postmortem_programs_rejected');
+           need(Array.isArray(v.targets)&&v.targets.length===2);v.targets.forEach((r,n)=>validateTargetRecord(r,TARGETS[n]));validateControls(v.controls);need(typeof v.inspectionComplete==='boolean'&&v.inspectionComplete===v.targets.every(reachedDecision));need(v.historicalCauseProven===false&&v.receiptAuthenticated===false);for(const k of Object.keys(FLAGS))need(v[k]===false);return v;
+          }
+          export function makeResult(expected,targets,controls){
+           const v={purpose:'afw.custody-postmortem.safe.v1',observer:expected.observer,subject:SUBJECT,programHashes:expected.programHashes,targets,controls,inspectionComplete:targets.every(reachedDecision),historicalCauseProven:false,receiptAuthenticated:false,...FLAGS};return validateResult(v,expected);
+          }
+          export function makeManifest(resultBytes,observer){
+           validateContext(observer);need(Buffer.isBuffer(resultBytes)&&resultBytes.length>0&&resultBytes.length<=65536);return {purpose:'afw.custody-postmortem-manifest.safe.v1',source:observer.source,run:observer.run,attempt:1,files:[{path:'result.json',bytes:resultBytes.length,sha256:A.sha(resultBytes)}]};
+          }
+          NODE_POSTMORTEM_INSPECTOR
+          cat >"$RUNNER_TEMP/afw-postmortem-controls.mjs" <<'NODE_POSTMORTEM_CONTROLS'
+          import assert from 'node:assert/strict';
+          import * as A from './afw-postmortem-adapter.mjs';
+          import * as I from './afw-postmortem-inspector.mjs';
+          import * as R from './afw-postmortem-receiver.mjs';
+          import * as Z from './afw-postmortem-safe-zip.mjs';
+          export const DIAGNOSTIC_IDS=Object.freeze(['postmortem_original_prefix_binding','postmortem_subject_observer_separation','postmortem_original_receipt_cap_boundaries','postmortem_stage_sequence','postmortem_metadata_failure_blocks_archive','postmortem_target_null_and_cap_coherence','postmortem_error_redaction']);
+          export const RECEIVER_IDS=Object.freeze(['postmortem_pair_schema_manifest_binding','postmortem_route_direct_output_binding']);
+          function crc(bytes){let c=0xffffffff;for(const b of bytes){c^=b;for(let j=0;j<8;j++)c=c&1?0xedb88320^(c>>>1):c>>>1;}return(c^0xffffffff)>>>0;}
+          function fixtureZip(files){
+           const chunks=[],rows=[];let offset=0;
+           for(const[name,value]of files){const n=Buffer.from(name),l=Buffer.alloc(30),c=Buffer.alloc(46),sum=crc(value);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(20,4);l.writeUInt32LE(sum,14);l.writeUInt32LE(value.length,18);l.writeUInt32LE(value.length,22);l.writeUInt16LE(n.length,26);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt32LE(sum,16);c.writeUInt32LE(value.length,20);c.writeUInt32LE(value.length,24);c.writeUInt16LE(n.length,28);c.writeUInt32LE(offset,42);chunks.push(l,n,value);rows.push(c,n);offset+=l.length+n.length+value.length;}
+           const dir=Buffer.concat(rows),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(files.size,8);end.writeUInt16LE(files.size,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...chunks,dir,end]);
+          }
+          function receipt(fileCount=512,totalBytes=134217728){return Buffer.from(JSON.stringify({fileCount,totalBytes}));}
+          function privateFixture(body=receipt()){
+           return fixtureZip(new Map([['envelope.bin',Buffer.from('INERT_NOT_A_CIPHER')],['manifest.json',Buffer.from('{}')],['receipt.json',body]]));
+          }
+          function historicalMeta(t){return {id:Number(t.artifactId),name:t.name,expired:false,digest:'sha256:'+t.expectedSha256,size_in_bytes:t.expectedBytes,expires_at:t.expiresAt,workflow_run:{id:Number(I.SUBJECT.run),head_sha:I.SUBJECT.source,head_branch:I.SUBJECT.ref.slice(11),repository_id:1347578006,head_repository_id:1347578006}};}
+          function targetFixture(body=receipt()){
+           const bytes=privateFixture(body),target={...I.TARGETS[0],expectedBytes:bytes.length,expectedSha256:A.sha(bytes)};
+           return {target,bytes,meta:historicalMeta(target)};
+          }
+          function inertIO(f,overrides={}){
+           return {metadata:async()=>({status:200,value:f.meta}),raw:async()=>f.bytes,...overrides};
+          }
+          function group(ids,inventory){return {expected:ids.length,completed:inventory.filter(x=>x.status!=='not_executed').length,passed:inventory.filter(x=>x.status==='passed').length,failed:inventory.filter(x=>x.status==='failed').length,inventory};}
+          async function checks(ids,callbacks){
+           const inventory=ids.map(id=>({id,status:'not_executed'}));
+           for(let n=0;n<ids.length;n++){A.requireKeyless();try{await callbacks[n]();inventory[n].status='passed';}catch{inventory[n].status='failed';const error=new Error('postmortem_controls_failed');error.controlGroup=group(ids,inventory);throw error;}}
+           return group(ids,inventory);
+          }
+          function fixtureExpected(){return {observer:{...I.SUBJECT,source:'1'.repeat(40),tree:'2'.repeat(40),workflowBlob:'3'.repeat(40),run:'123456789'},programHashes:Object.fromEntries(['adapter','inspector','controls','safeZip','receiver'].map((k,n)=>[k,String(n+1).repeat(64)]))};}
+          function completedControls(){return {diagnostic:group(DIAGNOSTIC_IDS,DIAGNOSTIC_IDS.map(id=>({id,status:'passed'}))),zip:group(Z.ZIP_CONTROL_IDS,Z.ZIP_CONTROL_IDS.map(id=>({id,status:'passed'}))),receiver:group(RECEIVER_IDS,RECEIVER_IDS.map(id=>({id,status:'passed'})))};}
+          function completeTarget(t){return {job:t.job,kind:t.kind,artifactId:t.artifactId,expectedBytes:t.expectedBytes,expectedSha256:t.expectedSha256,outcome:'accepted',stage:'complete',metadataVerified:true,rawVerified:true,zipVerified:true,fileCount:512,totalBytes:134217728,successReceiptCapAccepted:true};}
+          function pairFixture(expected=fixtureExpected()){
+           const result=I.makeResult(expected,I.TARGETS.map(completeTarget),completedControls()),r=I.canonical(result),manifest=I.makeManifest(r,expected.observer);
+           return {expected,result,files:new Map([['result.json',r],['manifest.json',I.canonical(manifest)]])};
+          }
+          function currentMeta(expected,id,hash,bytes){return {id:Number(id),name:R.safeName(expected.observer),expired:false,digest:'sha256:'+hash,size_in_bytes:bytes,expires_at:new Date(Date.now()+3600000).toISOString(),workflow_run:{id:Number(expected.observer.run),head_sha:expected.observer.source,head_branch:expected.observer.ref.slice(11),repository_id:1347578006,head_repository_id:1347578006}};}
+          export async function runDiagnosticControls(expected,provenance){
+           return checks(DIAGNOSTIC_IDS,[
+            ()=>{assert.equal(provenance.adapter.bytes,43451);assert.equal(provenance.adapter.sha256,'a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3');assert.equal(provenance.safeZip.bytes,13305);assert.equal(provenance.safeZip.sha256,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(provenance.zip3.bytes,3380);assert.equal(provenance.zip3.sha256,'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');assert.deepEqual(A.CONTEXT,I.SUBJECT);},
+            ()=>{I.validateExpected(expected);assert.notEqual(expected.observer.run,I.SUBJECT.run);assert.notEqual(expected.observer.source,I.SUBJECT.source);assert.throws(()=>I.validateExpected({...expected,observer:I.SUBJECT}));assert.equal(A.CONTEXT.run,'43414661211');},
+            ()=>{for(const kind of ['checkpoint','reduction-checkpoint']){assert.equal(A.validatePrivateReceiptCaps(new Map([['receipt.json',receipt()]]),kind).fileCount,512);for(const [n,b]of [[513,134217728],[512,134217729]])assert.throws(()=>A.validatePrivateReceiptCaps(new Map([['receipt.json',receipt(n,b)]]),kind));}},
+            async()=>{
+             const ok=targetFixture(),events=[];const r=await I.inspectTarget(ok.target,inertIO(ok,{metadata:async()=>{events.push('metadata');return{status:200,value:ok.meta};},raw:async()=>{events.push('raw');return ok.bytes;}}));assert.deepEqual(events,['metadata','raw']);assert.equal(r.stage,'complete');assert.equal(r.successReceiptCapAccepted,true);
+             for(const [count,bytes]of [[513,134217728],[512,134217729]]){const f=targetFixture(receipt(count,bytes)),x=await I.inspectTarget(f.target,inertIO(f));assert.equal(x.stage,'receipt_caps');assert.equal(x.successReceiptCapAccepted,false);assert.equal(x.fileCount,count);assert.equal(x.totalBytes,bytes);}
+             const cases=[
+              ['metadata_http',{metadata:async()=>({status:503,value:null})}],
+              ['metadata_binding',{metadata:async()=>({status:200,value:{...ok.meta,name:'inert-wrong'}})}],
+              ['raw_download',{raw:async()=>{throw Error('inert network');}}],
+              ['raw_size',{raw:async()=>Buffer.alloc(2)}],
+              ['raw_digest',{raw:async()=>{const b=Buffer.from(ok.bytes);b[0]^=1;return b;}}]
+             ];for(const [stage,patch]of cases)assert.equal((await I.inspectTarget(ok.target,inertIO(ok,patch))).stage,stage);
+             const broken={...ok,bytes:Buffer.alloc(ok.bytes.length)};broken.target={...ok.target,expectedSha256:A.sha(broken.bytes)};broken.meta=historicalMeta(broken.target);assert.equal((await I.inspectTarget(broken.target,inertIO(broken))).stage,'zip_decode');
+             for(const [body,stage]of [[Buffer.from('{"fileCount":1,"fileCount":2,"totalBytes":3}'),'receipt_json'],[Buffer.from('{"fileCount":1,"totalBytes":3}\n'),'receipt_json'],[Buffer.from([255]),'receipt_json'],[receipt(0,1),'receipt_counts'],[receipt(1,536870913),'receipt_counts']]){const f=targetFixture(body);assert.equal((await I.inspectTarget(f.target,inertIO(f))).stage,stage);}
+            },
+            async()=>{const f=targetFixture();for(const change of [m=>{m.size_in_bytes++;},m=>{m.expires_at='2099-01-01T00:00:00Z';},m=>{m.workflow_run.repository_id=1;},m=>{m.workflow_run.head_repository_id=1;},m=>{m.digest='sha256:'+'0'.repeat(64);}]){let archiveCalls=0;const meta=structuredClone(f.meta);change(meta);const r=await I.inspectTarget(f.target,inertIO(f,{metadata:async()=>({status:200,value:meta}),raw:async()=>{archiveCalls++;return f.bytes;}}));assert.equal(r.stage,'metadata_binding');assert.equal(archiveCalls,0);}},
+            ()=>{const t=completeTarget(I.TARGETS[0]);I.validateTargetRecord(t,I.TARGETS[0]);for(const change of [x=>{x.fileCount=null;},x=>{x.successReceiptCapAccepted=false;},x=>{x.rawVerified=false;},x=>{x.fileCount='512';},x=>{x.totalBytes=536870913;},x=>{x.extra=true;}]){const x=structuredClone(t);change(x);assert.throws(()=>I.validateTargetRecord(x,I.TARGETS[0]));}const rejected={...t,stage:'receipt_caps',outcome:'rejected',fileCount:513,successReceiptCapAccepted:false};I.validateTargetRecord(rejected,I.TARGETS[0]);assert.throws(()=>I.validateTargetRecord({...rejected,fileCount:1},I.TARGETS[0]));},
+            async()=>{const f=targetFixture();for(const seam of ['metadata','raw']){const text='PRIVATE_ERROR_DO_NOT_PRINT';const r=await I.inspectTarget(f.target,inertIO(f,{[seam]:async()=>{throw Error(text);}}));assert(!JSON.stringify(r).includes(text));assert.equal(r.outcome,'unavailable');assert.equal(r.stage,seam==='metadata'?'metadata_http':'raw_download');assert.equal(Object.keys(r).length,14);}}
+           ]);
+          }
+          export async function runReceiverControls(){
+           return checks(RECEIVER_IDS,[
+            ()=>{
+             const {expected,result,files}=pairFixture();assert.deepEqual(R.validatePostmortemPair(files,expected),result);
+             const mutate=change=>{const r=structuredClone(result);change(r);const rb=I.canonical(r),m=I.makeManifest(rb,expected.observer);assert.throws(()=>R.validatePostmortemPair(new Map([['result.json',rb],['manifest.json',I.canonical(m)]]),expected));};
+             for(const change of [x=>{x.observer.source=I.SUBJECT.source;},x=>{x.targets[0].artifactId='999';},x=>{x.targets[0].fileCount='512';},x=>{x.targets[0].fileCount=null;},x=>{x.targets[0].successReceiptCapAccepted=null;},x=>{x.extra=true;},x=>{x.PCoff=true;},x=>{x.controls.zip.expected=16;}])mutate(change);
+             const bad=JSON.parse(files.get('manifest.json'));bad.files[0].sha256='0'.repeat(64);assert.throws(()=>R.validatePostmortemPair(new Map([['result.json',files.get('result.json')],['manifest.json',I.canonical(bad)]]),expected));assert.throws(()=>R.validatePostmortemPair(new Map([['result.json',files.get('result.json')]]),expected));
+            },
+            async()=>{
+             const p=pairFixture(),bytes=fixtureZip(p.files),id='123',digest=A.sha(bytes),meta=currentMeta(p.expected,id,digest,bytes.length),good={custody_inspect:{result:'success',outputs:{'safe-id':id,'safe-digest':digest}}};let downloads=0;
+             const io={metadata:async()=>({status:200,value:meta}),raw:async()=>{downloads++;return bytes;}};const read=await R.verifyPostmortemRoute(good,p.expected,io);assert.equal(read.status,'verified');assert.equal(read.inspectionComplete,true);assert.equal(downloads,1);assert.equal(read.historicalCauseProven,false);
+             const unavailable=async(needs,reason,patch={})=>{downloads=0;const m=await R.verifyPostmortemRoute(needs,p.expected,{...io,...patch});assert.equal(m.status,'unavailable');assert.equal(m.reason,reason);assert.equal(m.inspectionComplete,false);assert.equal(m.resultSha256,null);assert(Buffer.byteLength(JSON.stringify(m))<=4096);return downloads;};
+             assert.equal(await unavailable({},'invalid_evidence'),0);
+             assert.equal(await unavailable({custody_inspect:{result:'failure',outputs:{}}},'needs_unsuccessful'),0);
+             assert.equal(await unavailable({custody_inspect:{result:'success',outputs:{}}},'publication_unavailable'),0);
+             assert.equal(await unavailable({custody_inspect:{result:'success',outputs:{'safe-id':id}}},'invalid_evidence'),0);
+             assert.equal(await unavailable(good,'publication_unavailable',{metadata:async()=>({status:404,value:null})}),0);
+             for(const bad of [{...meta,name:'afw-custody-postmortem-safe-'+I.SUBJECT.run+'-1'},{...meta,digest:'sha256:'+'0'.repeat(64)},{...meta,workflow_run:{...meta.workflow_run,head_sha:I.SUBJECT.source}}])assert.equal(await unavailable(good,'invalid_evidence',{metadata:async()=>({status:200,value:bad})}),0);
+             await unavailable(good,'invalid_evidence',{raw:async()=>{const b=Buffer.from(bytes);b[0]^=1;return b;}});
+             const corrupt=new Map(p.files);corrupt.set('manifest.json',Buffer.from('{}\n'));const badBytes=fixtureZip(corrupt),badDigest=A.sha(badBytes);await unavailable({custody_inspect:{result:'success',outputs:{'safe-id':id,'safe-digest':badDigest}}},'invalid_evidence',{metadata:async()=>({status:200,value:currentMeta(p.expected,id,badDigest,badBytes.length)}),raw:async()=>badBytes});
+             const m=await R.verifyPostmortemRoute(good,null,io);assert.equal(m.reason,'observer_unavailable');
+            }
+           ]);
+          }
+          export async function runAllControls(expected,provenance){
+           A.requireKeyless();const diagnostic=await runDiagnosticControls(expected,provenance);A.requireKeyless();const zipInventory=await Z.runZipControls();const zip=group(Z.ZIP_CONTROL_IDS,zipInventory);A.requireKeyless();const receiver=await runReceiverControls();return {diagnostic,zip,receiver};
+          }
+          NODE_POSTMORTEM_CONTROLS
+          cat >"$RUNNER_TEMP/afw-postmortem-safe-zip.mjs" <<'NODE_SAFE_ZIP'
+          import assert from 'node:assert/strict';
+          import {createHash} from 'node:crypto';
+          import {inflateRawSync,deflateRawSync} from 'node:zlib';
+          export class SafeZipRejected extends Error{constructor(reason){super(reason);this.reason=reason;}}
+          const Rejected=SafeZipRejected,need=(ok,reason)=>{if(!ok)throw new SafeZipRejected(reason);},NAMES=['result.json','manifest.json'],CAPS={'result.json':65536,'manifest.json':65536};
+          const utf8=b=>{const s=new TextDecoder('utf-8',{fatal:true}).decode(b);need(Buffer.from(s).equals(b),'zip_utf8');return s;};
+          export const zipSha=b=>createHash('sha256').update(b).digest('hex');
+          export function bindRawZip(bytes,size,uploaded,metadataDigest){
+           need(Buffer.isBuffer(bytes)&&Number.isSafeInteger(size)&&size>0&&size<=131072&&bytes.length===size,'zip_binding_size');
+           need(typeof uploaded==='string'&&/^[a-f0-9]{64}$/.test(uploaded)&&typeof metadataDigest==='string'&&/^sha256:[a-f0-9]{64}$/.test(metadataDigest),'zip_binding_digest');
+           const digest=zipSha(bytes);need(digest===uploaded&&'sha256:'+digest===metadataDigest,'zip_binding_digest');return digest;
+          }
+          const crcTable=Uint32Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
+          function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=crcTable[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
+          function extraFields(bytes){let n=0;while(n<bytes.length){need(n+4<=bytes.length,'zip_extra');const kind=bytes.readUInt16LE(n),size=bytes.readUInt16LE(n+2);need(kind!==1&&n+4+size<=bytes.length,'zip_extra');n+=4+size;}need(n===bytes.length,'zip_extra');}
+          export function decodeSafePair(bytes){
+           need(Buffer.isBuffer(bytes)&&bytes.length>=22&&bytes.length<=131072,'zip_bound');
+           const end=bytes.length-22;need(bytes.readUInt32LE(end)===0x06054b50&&bytes.readUInt16LE(end+20)===0,'zip_eocd');
+           need(bytes.readUInt16LE(end+4)===0&&bytes.readUInt16LE(end+6)===0&&bytes.readUInt16LE(end+8)===2&&bytes.readUInt16LE(end+10)===2,'zip_entries');
+           const directorySize=bytes.readUInt32LE(end+12),directory=bytes.readUInt32LE(end+16);need(directory>0&&directory+directorySize===end,'zip_directory');
+           const entries=[],seen=new Set();let cursor=directory;
+           for(let n=0;n<2;n++){
+            need(cursor+46<=end&&bytes.readUInt32LE(cursor)===0x02014b50,'zip_central');
+            const flags=bytes.readUInt16LE(cursor+8),method=bytes.readUInt16LE(cursor+10),crc=bytes.readUInt32LE(cursor+16),compressed=bytes.readUInt32LE(cursor+20),size=bytes.readUInt32LE(cursor+24),nameLength=bytes.readUInt16LE(cursor+28),extraLength=bytes.readUInt16LE(cursor+30),commentLength=bytes.readUInt16LE(cursor+32),disk=bytes.readUInt16LE(cursor+34),attributes=bytes.readUInt32LE(cursor+38),local=bytes.readUInt32LE(cursor+42);
+            need((flags&~0x0808)===0&&(method===0||method===8)&&disk===0&&nameLength>0&&nameLength<=32&&commentLength===0,'zip_flags');
+            need(cursor+46+nameLength+extraLength<=end,'zip_central_range');const rawName=bytes.subarray(cursor+46,cursor+46+nameLength),name=utf8(rawName);
+            need(NAMES.includes(name)&&!seen.has(name),'zip_paths');seen.add(name);
+            const kind=(attributes>>>16)&0xf000;need((kind===0||kind===0x8000)&&(attributes&0x10)===0,'zip_link');
+            need(size<=CAPS[name]&&compressed<=bytes.length&&local<directory,'zip_entry_bound');extraFields(bytes.subarray(cursor+46+nameLength,cursor+46+nameLength+extraLength));
+            need(local+30<=directory&&bytes.readUInt32LE(local)===0x04034b50,'zip_local');
+            const lf=bytes.readUInt16LE(local+6),lm=bytes.readUInt16LE(local+8),lc=bytes.readUInt32LE(local+14),lz=bytes.readUInt32LE(local+18),lu=bytes.readUInt32LE(local+22),ln=bytes.readUInt16LE(local+26),le=bytes.readUInt16LE(local+28),start=local+30+ln+le;
+            need(lf===flags&&lm===method&&ln===nameLength&&start<=directory,'zip_local_identity');
+            need(bytes.subarray(local+30,local+30+ln).equals(rawName),'zip_local_name');extraFields(bytes.subarray(local+30+ln,start));
+            need(start+compressed<=directory,'zip_data_range');let finish=start+compressed;
+            if(flags&8){
+             need((lc===0&&lz===0&&lu===0)||(lc===crc&&lz===compressed&&lu===size),'zip_local_sizes');
+             const ends=[];if(finish+12<=directory&&bytes.readUInt32LE(finish)===crc&&bytes.readUInt32LE(finish+4)===compressed&&bytes.readUInt32LE(finish+8)===size)ends.push(finish+12);
+             if(finish+16<=directory&&bytes.readUInt32LE(finish)===0x08074b50&&bytes.readUInt32LE(finish+4)===crc&&bytes.readUInt32LE(finish+8)===compressed&&bytes.readUInt32LE(finish+12)===size)ends.push(finish+16);
+             need(ends.length===1,'zip_descriptor');finish=ends[0];
+            }else need(lc===crc&&lz===compressed&&lu===size,'zip_local_sizes');
+            entries.push({name,method,crc,compressed,size,local,start,finish});cursor+=46+nameLength+extraLength;
+           }
+           need(cursor===end&&seen.size===2,'zip_directory');
+           const ranges=entries.slice().sort((a,b)=>a.local-b.local);need(ranges[0].local===0,'zip_ranges');for(let n=1;n<ranges.length;n++)need(ranges[n-1].finish===ranges[n].local,'zip_ranges');need(ranges.at(-1).finish===directory,'zip_ranges');
+           need(entries.reduce((n,e)=>n+e.size,0)<=65536,'zip_output_cap');const files=new Map();for(const e of entries){const input=bytes.subarray(e.start,e.start+e.compressed);let value;try{value=e.method===0?input:inflateRawSync(input,{maxOutputLength:CAPS[e.name]});}catch{throw new Rejected('zip_inflate');}need(value.length===e.size&&(e.method!==0||e.compressed===e.size),'zip_inflate');need(crc32(value)===e.crc,'zip_crc');files.set(e.name,value);}
+           return files;
+          }
+          
+          
+          export async function collectZipBody(response,signal){
+           need(response.status===200&&response.body!==null,'zip_http');const reader=response.body.getReader(),parts=[];let total=0;
+           try{for(;;){const item=await reader.read();if(item.done)break;total+=item.value.byteLength;need(total<=131072,'zip_download_cap');parts.push(Buffer.from(item.value));}}
+           catch(error){try{await reader.cancel();}catch{}throw error;}
+           need(!signal.aborted,'zip_download_timeout');return Buffer.concat(parts);
+          }
+          export function deliveryLocation(value){
+           need(typeof value==='string','zip_redirect');let next;try{next=new URL(value);}catch{throw new SafeZipRejected('zip_redirect');}
+           need(next.protocol==='https:'&&!next.username&&!next.password&&(!next.port||next.port==='443')&&!next.hash,'zip_redirect');return next.href;
+          }
+          export async function downloadAssignedZip(id,token){
+           need(typeof id==='string'&&/^[1-9][0-9]*$/.test(id)&&typeof token==='string'&&token.length>0,'zip_download_input');
+           const signal=AbortSignal.timeout(30000),seen=new Set();let url='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+id+'/zip';
+           for(let redirects=0;redirects<=3;redirects++){
+            need(!seen.has(url),'zip_redirect');seen.add(url);
+            const response=await fetch(url,{redirect:'manual',signal,headers:redirects===0?{Authorization:'Bearer '+token,Accept:'application/vnd.github+json'}:{}});
+            if(response.status===200)return await collectZipBody(response,signal);
+            need([301,302,303,307,308].includes(response.status)&&redirects<3,'zip_http');
+            const next=deliveryLocation(response.headers.get('location'));await response.body?.cancel();url=next;
+           }throw new SafeZipRejected('zip_redirect');
+          }
+          
+          function fixedZip({names=NAMES,method=0,descriptor=0,data={},declared={},gap=false}={}){
+           const locals=[],central=[];let offset=0;
+           for(let index=0;index<names.length;index++){
+            const name=names[index],n=Buffer.from(name),value=data[name]??Buffer.from(name==='result.json'?'{"fixture":true}':'{"fixture":"manifest"}'),packed=method===8?deflateRawSync(value):value,crc=crc32(value),size=declared[name]??value.length,local=Buffer.alloc(30),flags=descriptor?8:0;
+            local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(flags,6);local.writeUInt16LE(method,8);if(!descriptor){local.writeUInt32LE(crc,14);local.writeUInt32LE(packed.length,18);local.writeUInt32LE(size,22);}local.writeUInt16LE(n.length,26);
+            const tail=Buffer.alloc(descriptor===1?16:descriptor===2?12:0);if(descriptor){const at=descriptor===1?4:0;if(at)tail.writeUInt32LE(0x08074b50);tail.writeUInt32LE(crc,at);tail.writeUInt32LE(packed.length,at+4);tail.writeUInt32LE(size,at+8);}
+            const row=Buffer.alloc(46);row.writeUInt32LE(0x02014b50);row.writeUInt16LE(20,4);row.writeUInt16LE(20,6);row.writeUInt16LE(flags,8);row.writeUInt16LE(method,10);row.writeUInt32LE(crc,16);row.writeUInt32LE(packed.length,20);row.writeUInt32LE(size,24);row.writeUInt16LE(n.length,28);row.writeUInt32LE(offset,42);central.push(row,n);locals.push(local,n,packed,tail);offset+=local.length+n.length+packed.length+tail.length;if(gap&&index===0){locals.push(Buffer.from([0]));offset++;}
+           }
+           const dir=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(names.length,8);end.writeUInt16LE(names.length,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...locals,dir,end]);
+          }
+          export const ZIP_CONTROL_IDS=Object.freeze(['zip_valid_store_crc_vector','zip_valid_deflate','zip_signed_unsigned_descriptors','zip_wrong_size','zip_wrong_upload_sha','zip_wrong_metadata_sha','zip_extra_entry','zip_duplicate_entry','zip_traversal_entry','zip_symlink','zip_bad_crc','zip_noncontiguous_ranges','zip_declared_and_inflate_caps','download_stream_redirect_auth_bounds']);
+          export async function runZipControls(){
+           const results=[],decode=bytes=>{bindRawZip(bytes,bytes.length,zipSha(bytes),'sha256:'+zipSha(bytes));return decodeSafePair(bytes);},reject=(fn,reason)=>assert.throws(fn,e=>e instanceof SafeZipRejected&&e.reason===reason),check=async(id,fn)=>{try{await fn();results.push({id,status:'passed'});}catch{results.push({id,status:'failed'});throw Object.assign(new SafeZipRejected('zip_controls_failed'),{results});}};
+           await check(ZIP_CONTROL_IDS[0],()=>{assert.equal(crc32(Buffer.from('123456789')),0xcbf43926);assert.deepEqual([...decode(fixedZip()).keys()],NAMES);});
+           await check(ZIP_CONTROL_IDS[1],()=>assert.equal(decode(fixedZip({method:8})).get('result.json').toString(),'{"fixture":true}'));
+           await check(ZIP_CONTROL_IDS[2],()=>{for(const descriptor of [1,2])assert.equal(decode(fixedZip({method:8,descriptor})).size,2);});
+           await check(ZIP_CONTROL_IDS[3],()=>{const b=fixedZip();reject(()=>bindRawZip(b,b.length+1,zipSha(b),'sha256:'+zipSha(b)),'zip_binding_size');});
+           await check(ZIP_CONTROL_IDS[4],()=>{const b=fixedZip();reject(()=>bindRawZip(b,b.length,'a'.repeat(64),'sha256:'+zipSha(b)),'zip_binding_digest');});
+           await check(ZIP_CONTROL_IDS[5],()=>{const b=fixedZip();reject(()=>bindRawZip(b,b.length,zipSha(b),'sha256:'+'b'.repeat(64)),'zip_binding_digest');reject(()=>bindRawZip(b,b.length,zipSha(b),[zipSha(b)]),'zip_binding_digest');});
+           await check(ZIP_CONTROL_IDS[6],()=>reject(()=>decode(fixedZip({names:[...NAMES,'extra']})),'zip_entries'));
+           await check(ZIP_CONTROL_IDS[7],()=>reject(()=>decode(fixedZip({names:['result.json','result.json']})),'zip_paths'));
+           await check(ZIP_CONTROL_IDS[8],()=>reject(()=>decode(fixedZip({names:['../result.json','manifest.json']})),'zip_paths'));
+           await check(ZIP_CONTROL_IDS[9],()=>{const b=fixedZip(),at=b.readUInt32LE(b.length-6);b.writeUInt32LE(0xa0000000,at+38);reject(()=>decode(b),'zip_link');});
+           await check(ZIP_CONTROL_IDS[10],()=>{const b=fixedZip();b[30+Buffer.byteLength(NAMES[0])]^=1;reject(()=>decode(b),'zip_crc');});
+           await check(ZIP_CONTROL_IDS[11],()=>reject(()=>decode(fixedZip({gap:true})),'zip_ranges'));
+           await check(ZIP_CONTROL_IDS[12],()=>{reject(()=>decode(fixedZip({method:8,data:{'result.json':Buffer.alloc(40000),'manifest.json':Buffer.alloc(40000)}})),'zip_output_cap');reject(()=>decode(fixedZip({method:8,data:{'result.json':Buffer.alloc(70000,120)},declared:{'result.json':1}})),'zip_inflate');});
+           await check(ZIP_CONTROL_IDS[13],async()=>{
+            await assert.rejects(()=>collectZipBody(new Response(new Uint8Array(131073)),new AbortController().signal),e=>e instanceof SafeZipRejected&&e.reason==='zip_download_cap');
+            assert.equal(deliveryLocation('https://delivery.example.invalid/fixed'),'https://delivery.example.invalid/fixed');for(const value of ['http://delivery.example.invalid/','https://u:p@delivery.example.invalid/','https://delivery.example.invalid:444/','https://delivery.example.invalid/#x'])reject(()=>deliveryLocation(value),'zip_redirect');
+            const originalFetch=globalThis.fetch,calls=[];try{
+             globalThis.fetch=async(url,options)=>{calls.push({url,headers:options.headers});return calls.length===1?new Response(null,{status:302,headers:{location:'https://delivery.example.invalid/fixed'}}):new Response(Buffer.from('inert'));};
+             assert.equal((await downloadAssignedZip('123','INERT_SYN_TOKEN')).toString(),'inert');assert.equal(calls.length,2);assert.equal(calls[0].url,'https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/123/zip');assert.equal(calls[0].headers.Authorization,'Bearer INERT_SYN_TOKEN');assert.equal(Object.hasOwn(calls[1].headers,'Authorization'),false);
+            }finally{globalThis.fetch=originalFetch;}
+            let count=0;try{globalThis.fetch=async()=>new Response(null,{status:302,headers:{location:'https://delivery.example.invalid/fixed-'+(++count)}});await assert.rejects(()=>downloadAssignedZip('123','INERT_SYN_TOKEN'),e=>e instanceof SafeZipRejected&&e.reason==='zip_http');assert.equal(count,4);}finally{globalThis.fetch=originalFetch;}
+           });
+           return results;
+          }
+          NODE_SAFE_ZIP
+          cat >"$RUNNER_TEMP/afw-postmortem-receiver.mjs" <<'NODE_POSTMORTEM_RECEIVER'
+          import assert from 'node:assert/strict';
+          import * as A from './afw-postmortem-adapter.mjs';
+          import * as I from './afw-postmortem-inspector.mjs';
+          import * as Z from './afw-postmortem-safe-zip.mjs';
+          const need=ok=>assert(ok,'postmortem_receiver_rejected');
+          export function safeName(observer){I.validateContext(observer);return 'afw-custody-postmortem-safe-'+observer.run+'-1';}
+          export function validatePostmortemPair(files,expected){
+           A.requireKeyless();I.validateExpected(expected);need(files instanceof Map&&files.size===2&&files.has('result.json')&&files.has('manifest.json'));let total=0;for(const b of files.values()){need(Buffer.isBuffer(b));total+=b.length;}need(total<=65536);
+           const rb=files.get('result.json'),mb=files.get('manifest.json'),result=I.parseCanonical(rb),manifest=I.parseCanonical(mb);I.validateResult(result,expected);A.fields(manifest,['purpose','source','run','attempt','files']);
+           need(manifest.purpose==='afw.custody-postmortem-manifest.safe.v1'&&manifest.source===expected.observer.source&&manifest.run===expected.observer.run&&manifest.attempt===1);need(Array.isArray(manifest.files)&&manifest.files.length===1);const file=manifest.files[0];A.fields(file,['path','bytes','sha256']);need(file.path==='result.json'&&Number.isSafeInteger(file.bytes)&&file.bytes===rb.length&&file.sha256===A.sha(rb));return result;
+          }
+          function validateCurrentMeta(meta,expected,id,digest){
+           need(meta&&typeof meta==='object'&&Number.isSafeInteger(meta.id)&&String(meta.id)===id&&meta.name===safeName(expected.observer)&&meta.expired===false&&meta.digest==='sha256:'+digest);need(Number.isSafeInteger(meta.size_in_bytes)&&meta.size_in_bytes>0&&meta.size_in_bytes<=131072);
+           need(typeof meta.expires_at==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(meta.expires_at)&&Number.isFinite(Date.parse(meta.expires_at))&&Date.parse(meta.expires_at)>Date.now());
+           const w=meta.workflow_run;need(w&&Number.isSafeInteger(w.id)&&String(w.id)===expected.observer.run&&w.head_sha===expected.observer.source&&w.head_branch===expected.observer.ref.slice(11));for(const k of ['repository_id','head_repository_id'])if(Object.hasOwn(w,k))need(Number.isSafeInteger(w[k])&&w[k]===1347578006);return meta;
+          }
+          const fixedReceiverIO=Object.freeze({
+           metadata:async id=>{A.requireKeyless();A.canonicalId(id);const r=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+id,{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},redirect:'error',signal:AbortSignal.timeout(10000)});return {status:r.status,value:r.status===200?await r.json():null};},
+           raw:async id=>{A.requireKeyless();return Z.downloadAssignedZip(id,process.env.GH_ARTIFACT_TOKEN);}
+          });
+          function knownId(v){return typeof v==='string'&&/^[1-9][0-9]*$/.test(v)&&Number.isSafeInteger(Number(v))&&String(Number(v))===v?v:null;}
+          function knownDigest(v){return typeof v==='string'&&/^[a-f0-9]{64}$/.test(v)?v:null;}
+          function closed(m){
+           need(Buffer.byteLength(JSON.stringify(m))<=4096);return m;
+          }
+          function marker(expected,producerResult=null,artifactId=null,uploadedDigest=null){
+           return {marker:'AFW_CUSTODY_POSTMORTEM_READBACK/1',observer:expected?.observer??null,programHashes:expected?.programHashes??null,producerResult,artifactId,uploadedDigest,status:'unavailable',reason:'invalid_evidence',inspectionComplete:false,rawZipBytes:null,rawZipSha256:null,resultSha256:null,manifestSha256:null,historicalCauseProven:false,receiptAuthenticated:false,...I.FLAGS};
+          }
+          export function unavailableMarker(){
+           const m=marker(null);m.reason='observer_unavailable';return closed(m);
+          }
+          export async function verifyPostmortemRoute(needs,expected,io=fixedReceiverIO){
+           A.requireKeyless();try{I.validateExpected(expected);}catch{return unavailableMarker();}
+           const m=marker(expected);let producer,outputs;
+           try{A.fields(needs,['custody_inspect']);producer=needs.custody_inspect;A.fields(producer,['result','outputs']);need(['success','failure','cancelled','skipped'].includes(producer.result));m.producerResult=producer.result;need(producer.outputs&&typeof producer.outputs==='object'&&!Array.isArray(producer.outputs));outputs=producer.outputs;for(const key of Object.keys(outputs))need(['safe-id','safe-digest'].includes(key));m.artifactId=knownId(outputs['safe-id']);m.uploadedDigest=knownDigest(outputs['safe-digest']);}catch{return closed(m);}
+           if(producer.result!=='success'){m.reason='needs_unsuccessful';return closed(m);}
+           const absent=x=>x===undefined||x==='';
+           if(absent(outputs['safe-id'])&&absent(outputs['safe-digest'])){m.reason='publication_unavailable';return closed(m);}
+           if(m.artifactId===null||m.uploadedDigest===null)return closed(m);
+           let response;
+           try{A.requireKeyless();response=await io.metadata(m.artifactId);}catch{return closed(m);}
+           if(response?.status===404){m.reason='publication_unavailable';return closed(m);}
+           if(response?.status!==200)return closed(m);
+           try{validateCurrentMeta(response.value,expected,m.artifactId,m.uploadedDigest);}catch{return closed(m);}
+           let bytes,files,result;
+           try{A.requireKeyless();bytes=await io.raw(m.artifactId);Z.bindRawZip(bytes,response.value.size_in_bytes,m.uploadedDigest,response.value.digest);files=Z.decodeSafePair(bytes);result=validatePostmortemPair(files,expected);}catch{return closed(m);}
+           m.status='verified';m.reason='none';m.inspectionComplete=result.inspectionComplete;m.rawZipBytes=bytes.length;m.rawZipSha256=A.sha(bytes);m.resultSha256=A.sha(files.get('result.json'));m.manifestSha256=A.sha(files.get('manifest.json'));return closed(m);
+          }
+          NODE_POSTMORTEM_RECEIVER
+          fi
+      - name: Run controls then fixed retained envelope inspection
+        id: collect
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module 2>/dev/null <<'NODE_POSTMORTEM_PRODUCER'
+          import assert from 'node:assert/strict';
+          import {readFile,writeFile,mkdir} from 'node:fs/promises';
+          import {join} from 'node:path';
+          import {pathToFileURL} from 'node:url';
+          import {createHash} from 'node:crypto';
+          import {execFileSync} from 'node:child_process';
+          async function bootstrap(){
+           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml';
+           const keyless=()=>assert.equal(e.AFW_SYN_CHECKPOINT_KEY,undefined,'postmortem_key_present');
+           keyless();assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(e.GITHUB_EVENT_NAME,'push');assert.equal(process.versions.node,'22.23.4');assert(/^[a-f0-9]{40}$/.test(e.GITHUB_SHA));assert(/^[1-9][0-9]*$/.test(e.GITHUB_RUN_ID)&&Number.isSafeInteger(Number(e.GITHUB_RUN_ID))&&String(Number(e.GITHUB_RUN_ID))===e.GITHUB_RUN_ID);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
+           const git=(...a)=>execFileSync('git',a,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
+           assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path],{stdio:['ignore','pipe','pipe']}).equals(bytes));
+           const sourcePins={"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+           for(const [k,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[k]);assert.equal(blob(await readFile(p)),sourcePins[k]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
+           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"e724c18928f7fe21791165086d840333b0a1544109b8041b26966b801bbbcc3f","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},programHashes={},programs={},provenance={},lines=source.split('\n');
+           for(const [k,[marker,file]]of Object.entries(map)){
+            const header='          cat >'+'"$RUNNER_TEMP/'+file+'" '+'<'+'<'+"'"+marker+"'",positions=lines.flatMap((s,n)=>s===header?[n]:[]);assert.equal(positions.length,1);const begin=positions[0]+1,ending=lines.flatMap((s,n)=>s==='          '+marker?[n]:[]);assert.equal(ending.length,1);assert(ending[0]>begin);const body=lines.slice(begin,ending[0]).map(s=>{assert(s.startsWith('          '));return s.slice(10);}).join('\n')+'\n';programs[k]=body;programHashes[k]=hash(body);assert.equal(programHashes[k],expectedHashes[k]);provenance[k]={bytes:Buffer.byteLength(body),sha256:programHashes[k]};
+           }
+           assert.equal(Object.keys(programHashes).length,5);assert.equal(new Set(Object.values(programHashes)).size,5);assert.equal(provenance.adapter.bytes,43451);assert.equal(programHashes.adapter,'a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3');assert.equal(provenance.safeZip.bytes,13305);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');
+           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);provenance.zip3={bytes:Buffer.byteLength(zip3),sha256:hash(zip3)};assert.equal(provenance.zip3.bytes,3380);assert.equal(provenance.zip3.sha256,'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
+           const observer={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node},expected={observer,programHashes};
+           const historicalBinding={"bindingRole":"historical-subject-reused-component-pins","context":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"b8497734abe5f6afdcc7c518e82a591438353f14","tree":"1c0e1a87fa759ea07dc117931c37258067d3b1c0","workflowBlob":"5eaf4f5e5497711e219999fa14c51501a82f94d2","run":"43414661211","attempt":1,"node":"22.23.4"},"sourcePins":{"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","controls":"afe050bdb5a35a0c727a2b949fba4a58a7e222f4ef12c8e86756d0e24f21d6b0","verifier":"c6fac92623809ee41b69ee77260b32d50c1149ba5716ca0a39b8b024d7dfb849","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}};
+           keyless();for(const [k,[,file]]of Object.entries(map))await writeFile(join(e.RUNNER_TEMP,file),programs[k],{flag:'wx',mode:0o600});
+           await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify(historicalBinding)+'\n',{flag:'wx',mode:0o600});await writeFile(join(e.RUNNER_TEMP,'afw-postmortem-observer.json'),JSON.stringify(expected)+'\n',{flag:'wx',mode:0o600});
+           return {expected,provenance};
+          }
+          let phase='bootstrap';
+          try{
+           const {expected,provenance}=await bootstrap();
+           const url=file=>pathToFileURL(join(process.env.RUNNER_TEMP,file)).href;
+           const A=await import(url('afw-postmortem-adapter.mjs'));
+           const I=await import(url('afw-postmortem-inspector.mjs'));
+           const Z=await import(url('afw-postmortem-safe-zip.mjs'));
+           const R=await import(url('afw-postmortem-receiver.mjs'));
+           const C=await import(url('afw-postmortem-controls.mjs'));
+           A.requireKeyless();I.validateExpected(expected);assert.deepEqual(A.CONTEXT,I.SUBJECT);phase='controls';
+           const controls=await C.runAllControls(expected,provenance);
+           console.log('AFW_CUSTODY_POSTMORTEM_CONTROLS/1 '+JSON.stringify(controls));
+           A.requireKeyless();phase='inspection';const targets=[];
+           for(const target of I.TARGETS){A.requireKeyless();targets.push(await I.inspectTarget(target));}
+           phase='publication';const result=I.makeResult(expected,targets,controls),resultBytes=I.canonical(result),manifestBytes=I.canonical(I.makeManifest(resultBytes,expected.observer)),files=new Map([['result.json',resultBytes],['manifest.json',manifestBytes]]);
+           R.validatePostmortemPair(files,expected);assert(resultBytes.length+manifestBytes.length<=65536);
+           A.requireKeyless();const destination=join(process.env.RUNNER_TEMP,'afw-postmortem-safe');await mkdir(destination,{mode:0o700});for(const [file,bytes]of files)await writeFile(join(destination,file),bytes,{flag:'wx',mode:0o600});
+           console.log('AFW_CUSTODY_POSTMORTEM_COLLECTION/1 '+JSON.stringify({inspectionComplete:result.inspectionComplete,targetStages:targets.map(x=>({job:x.job,stage:x.stage,outcome:x.outcome})),historicalCauseProven:false,receiptAuthenticated:false,...I.FLAGS}));
+          }catch{
+           console.log('AFW_CUSTODY_POSTMORTEM_PRODUCER_UNAVAILABLE/1 '+JSON.stringify({stage:phase,historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}));process.exitCode=1;
+          }
+          NODE_POSTMORTEM_PRODUCER
+      - name: Upload only current bounded diagnostic pair
         id: upload
-        if: always() && !cancelled() && steps.seal.outcome == 'success'
+        if: ${{ success() && steps.collect.outcome == 'success' }}
         uses: actions/upload-artifact@v4
         with:
-          name: finite-budget-readonly-${{ github.sha }}-${{ github.run_id }}
-          path: ${{ runner.temp }}/afw-native-public/
-          retention-days: 7
+          name: afw-custody-postmortem-safe-${{ github.run_id }}-1
+          path: ${{ runner.temp }}/afw-postmortem-safe/
           if-no-files-found: error
-      - name: Download own exact assigned artifact ID
-        id: own_download
-        if: always() && !cancelled() && steps.upload.outcome == 'success'
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-native-readback
-          merge-multiple: true
-      - name: Authenticate own same-ID inner inventory readback
-        id: own_verified
-        if: always() && !cancelled() && steps.own_download.outcome == 'success'
-        env:
-          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
-          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
-          OWN_KIND: ${{ steps.seal.outputs.kind }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
-          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
-          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
-          NODE
-          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
-          
-      - name: Preserve actual command and custody outcome
-        id: actual_outcome
-        if: always() && !cancelled()
-        shell: bash
-        run: |
-          set -euo pipefail
-          test '${{ steps.native.outcome }}' = success
-          test '${{ steps.own_verified.outcome }}' = success
-  reduction_consume_b:
-    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
-    needs: [contracts, readonly, reduction_prepare]
+          retention-days: 7
+          compression-level: 0
+          include-hidden-files: false
+  verify:
+    if: ${{ false }}
+    needs: custody_inspect
     runs-on: ubuntu-24.04
-    timeout-minutes: 15
-    environment: afw-finite-syn-checkpoint
-    outputs:
-      artifact-id: ${{ steps.upload.outputs.artifact-id }}
-      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
-      kind: ${{ steps.seal.outputs.kind }}
+    timeout-minutes: 2
     env:
-      AFW_BUDGET_GROUP: reduction_b
-      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
-      FIXED_ROLE: consumer
-      FIXED_LANE: reduction_b
-      FIXED_CASES: '["D3","D4"]'
+      GH_ARTIFACT_TOKEN: ${{ github.token }}
     steps:
-      - name: Require fixed scope before any native work
-        id: scope
+      - name: Require fixed keyless Source
         shell: bash
         run: |
           set -euo pipefail
           umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REPOSITORY_ID" = 1347578006
           test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
           test "$GITHUB_RUN_ATTEMPT" = 1
-          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
-          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
-          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
-          
-      - uses: actions/checkout@v4
+      - name: Checkout exact observer Source
+        uses: actions/checkout@v4
         with:
           repository: tokenizartinfo-ops/agent-friendly-web
           ref: ${{ github.sha }}
           persist-credentials: false
           fetch-depth: 1
-      - uses: actions/setup-node@v4
+      - name: Use exact Node
+        uses: actions/setup-node@v4
         with:
           node-version: '22.23.4'
-      - name: Install exact lock and verify existing custody key
-        id: custody
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$(node -v)" = v22.23.4
-          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
-          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
-          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
-          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
-          
-      - name: Download exact contracts artifact
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-prior-pure
-          merge-multiple: true
-      - name: Verify prior pure inventory and select fixed graph profile
-        id: pure_binding
-        env:
-          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
-          NODE
-          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
-          
-      - name: Download assigned original producer artifact
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ needs.reduction_prepare.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-producer-envelope
-          merge-multiple: true
-      - name: Authenticate assigned producer before any cold mount
-        id: producer_binding
-        env:
-          PRODUCER_ID: ${{ needs.reduction_prepare.outputs.artifact-id }}
-          PRODUCER_DIGEST: ${{ needs.reduction_prepare.outputs.artifact-digest }}
-          PRODUCER_KIND: ${{ needs.reduction_prepare.outputs.kind }}
-          EXPECTED_KIND: reduction-checkpoint
-          EXPECTED_GROUP: reduction_a
-          EXPECTED_CASES: '["D1","D2","D3","D4"]'
-          GH_ARTIFACT_TOKEN: ${{ github.token }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          test "$PRODUCER_KIND" = "$EXPECTED_KIND"
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/input-binding.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
-          import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env;assert.match(e.PRODUCER_ID,/^[1-9][0-9]*$/);assert.match(e.PRODUCER_DIGEST,/^[a-f0-9]{64}$/);
-          const r=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+e.PRODUCER_ID,{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
-          assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),e.PRODUCER_ID);assert.equal(m.expired,false);assert.equal(m.digest,'sha256:'+e.PRODUCER_DIGEST);assert.equal(String(m.workflow_run.id),e.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,e.GITHUB_SHA);
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.EXPECTED_KIND};
-          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-producer-envelope',destinationDir:e.RUNNER_TEMP+'/afw-producer-open',context});
-          const manifest=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-producer-open/job-manifest.json','utf8'));
-          const {execFileSync}=await import('node:child_process');validateFixedBudgetJobManifest(manifest,{job:e.EXPECTED_KIND==='checkpoint'?'positive_prepare':'reduction_prepare',sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),artifactId:e.PRODUCER_ID,digest:e.PRODUCER_DIGEST,context});
-          await writeFile(e.RUNNER_TEMP+'/afw-native-private/producer-binding.json',JSON.stringify({artifactId:e.PRODUCER_ID,digest:e.PRODUCER_DIGEST,kind:e.EXPECTED_KIND,expectedProducerGroup:e.EXPECTED_GROUP,verified:true}));
-          NODE
-          printf 'AFW_BUDGET_PRODUCER_ARTIFACT_ID=%s\n' "$PRODUCER_ID" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_DIGEST=%s\n' "$PRODUCER_DIGEST" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_KIND=%s\n' "$EXPECTED_KIND" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_GROUP=%s\n' "$EXPECTED_GROUP" >>"$GITHUB_ENV"
-          printf 'AFW_BUDGET_PRODUCER_READBACK=verified\n' >>"$GITHUB_ENV"
-          
-      - name: Execute fixed reduction_consume_b once
-        id: native
-        continue-on-error: true
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          AFW_BUDGET_CHECKPOINT="$RUNNER_TEMP/afw-producer-open/output/finite-budget/checkpoint" node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
-          AFW_EXPECTED_CASES=2 node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/tap-check.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
-          const e=process.env,text=await readFile(e.RUNNER_TEMP+'/afw-native-private/logs/command-output.log','utf8'),counts={};
-          for(const [name,expected]of Object.entries({tests:Number(e.AFW_EXPECTED_CASES),pass:Number(e.AFW_EXPECTED_CASES),fail:0,cancelled:0,skipped:0,todo:0})){const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(hits.length,1);counts[name]=Number(hits[0][1]);assert.equal(counts[name],expected);}
-          await writeFile(e.RUNNER_TEMP+'/afw-native-private/business-counts.json',JSON.stringify(counts));
-          NODE
-          
-      - name: Verify coherent original sixteen-case evidence before sealing
-        id: aggregate
-        if: steps.native.outcome == 'success'
-        env:
-          GH_ARTIFACT_TOKEN: ${{ github.token }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/aggregate.log" 2>&1
-          
+      - name: Independently receive current bounded diagnostic pair
+        if: ${{ always() }}
+        shell: bash
+        env:
+          AFW_POSTMORTEM_NEEDS: ${{ toJSON(needs) }}
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module 2>/dev/null <<'NODE_POSTMORTEM_VERIFY'
           import assert from 'node:assert/strict';
-          import {mkdir,readFile,writeFile,readdir} from 'node:fs/promises';
-          import {execFileSync} from 'node:child_process';
+          import {readFile,writeFile,mkdir} from 'node:fs/promises';
+          import {join} from 'node:path';
+          import {pathToFileURL} from 'node:url';
           import {createHash} from 'node:crypto';
-          import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env,sha=value=>createHash('sha256').update(value).digest('hex'),repo='tokenizartinfo-ops/agent-friendly-web',root=e.RUNNER_TEMP+'/afw-qualification-peer-proof';
-          const fixed=[{job:'positive_prepare',kind:'checkpoint',role:'producer',group:'positive',cases:['P1']},{job:'positive_consume',kind:'positive-result',role:'consumer',group:'positive',cases:['P1']},{job:'reduction_prepare',kind:'reduction-checkpoint',role:'producer',group:'reduction_a',cases:['D1','D2','D3','D4']},{job:'reduction_consume_a',kind:'reduction-result-a',role:'consumer',group:'reduction_a',cases:['D1','D2']},{job:'readonly',kind:'readonly-result',role:'consumer',group:'readonly',cases:['R1','R2','R3']}];
-          let pollTimeoutMs=10000,pollQueryAttempts=0,pollPhase='source_ref',lastPollFacts=null;
-          const requests=[],pollPath=e.RUNNER_TEMP+'/afw-native-private/postnative-polls.json',pollDeadline=Number(e.AFW_JOB_STARTED_MS)+780000;
-          const persistPoll=async facts=>{if(facts)lastPollFacts=facts;await writeFile(pollPath,JSON.stringify({...lastPollFacts,attemptedPeerQueries:pollQueryAttempts,completedPeerQueries:lastPollFacts?.queries?.length??0,actualMetadataRequests:requests.filter(record=>record.enteredFetch).length,metadataRequests:requests,observedAt:Date.now()},null,2));};
-          const request=async path=>{
-           assert(path.startsWith('/actions/')||path==='/git/ref/heads/feat/finite-native-cleanup-20261101');
-           assert(requests.length<256,'finite postnative request records');
-           const remaining=pollDeadline-Date.now(),timeoutMs=Math.min(pollTimeoutMs,remaining);assert(timeoutMs>0,'postnative request sealing headroom');
-           const record={ordinal:requests.length+1,phase:pollPhase,query:pollQueryAttempts,startedAt:Date.now(),remainingAtEntry:remaining,timeoutMs,enteredFetch:false,outcome:'prepared',status:null,finishedAt:null};requests.push(record);await persistPoll();
-           let primary=null;
-           try{record.enteredFetch=true;record.outcome='in_progress';const r=await fetch('https://api.github.com/repos/'+repo+path,{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(timeoutMs)});record.status=r.status;assert.equal(r.status,200);const value=await r.json();record.outcome='fulfilled';return value;}
-           catch(error){primary=error;record.outcome='rejected';throw error;}
-           finally{record.finishedAt=Date.now();record.remainingAfter=pollDeadline-record.finishedAt;try{await persistPoll();}catch(error){if(!primary)throw error;}}
-          };
-          const sameRef=await request('/git/ref/heads/feat/finite-native-cleanup-20261101');assert.equal(sameRef.object.sha,e.GITHUB_SHA,'qualification Source stayed frozen');
-          await mkdir(root,{mode:0o700});let inventory,jobInventory;
-          await collectFixedBudgetPeers({startedAt:Number(e.AFW_JOB_STARTED_MS),read:async timeoutMs=>{
-           pollQueryAttempts++;pollPhase='peer_poll';pollTimeoutMs=timeoutMs;await persistPoll();inventory=await request('/actions/runs/'+e.GITHUB_RUN_ID+'/artifacts?per_page=100');assert(inventory.total_count<=100);
-           const expected=['finite-budget-fixed-preparation-'+e.GITHUB_SHA,...fixed.map(x=>'finite-budget-'+x.job+'-'+e.GITHUB_SHA+'-'+e.GITHUB_RUN_ID)];
-           jobInventory=await request('/actions/runs/'+e.GITHUB_RUN_ID+'/jobs?per_page=100');assert.equal(jobInventory.total_count,7);
-           const terminalPeers=jobInventory.jobs.filter(job=>job.name!=='reduction_consume_b'&&job.status==='completed'&&job.conclusion==='success').length;
-           return {ready:expected.every(name=>inventory.artifacts.filter(a=>a.name===name).length===1)&&terminalPeers===6,artifactCount:inventory.total_count,terminalPeers};
-          },sleep:ms=>new Promise(resolve=>setTimeout(resolve,ms)),persist:persistPoll});
-          pollPhase='peer_identity';
-          const opened=new Map(),receipts=[];
-          async function download(name,kind){
-           const matches=inventory.artifacts.filter(a=>a.name===name);assert.equal(matches.length,1);
-           const artifact=matches[0];assert.equal(artifact.expired,false);assert.match(artifact.digest,/^sha256:[a-f0-9]{64}$/);assert(artifact.size_in_bytes<=134283264);assert.equal(String(artifact.workflow_run.id),e.GITHUB_RUN_ID);assert.equal(artifact.workflow_run.head_sha,e.GITHUB_SHA);
-           const metadata=await request('/actions/artifacts/'+artifact.id);assert.equal(metadata.digest,artifact.digest);assert.equal(metadata.name,name);
-           const response=await fetch('https://api.github.com/repos/'+repo+'/actions/artifacts/'+artifact.id+'/zip',{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(20000)});assert.equal(response.status,200);
-           const reader=response.body.getReader(),chunks=[];let received=0;
-           for(;;){const part=await reader.read();if(part.done)break;received+=part.value.length;if(received>134283264){await reader.cancel();throw Error('bounded peer artifact exceeded');}chunks.push(Buffer.from(part.value));}
-           const bytes=Buffer.concat(chunks);assert.equal(bytes.length,artifact.size_in_bytes);assert.equal('sha256:'+sha(bytes),artifact.digest);
-           assert(Number.isSafeInteger(artifact.id)&&artifact.id>0);const zip=root+'/'+artifact.id+'.zip',directory=root+'/'+artifact.id,output=root+'/'+artifact.id+'-opened';await writeFile(zip,bytes);
-           const paths=execFileSync('unzip',['-Z1',zip],{encoding:'utf8'}).trim().split('\n');assert(paths.every(path=>/^[A-Za-z0-9_.-]+$/.test(path)));assert.equal(new Set(paths).size,paths.length);
-           if(kind!=='pure')assert.deepEqual([...paths].sort(),['envelope.bin','manifest.json','receipt.json']);
-           const listing=execFileSync('unzip',['-l',zip],{encoding:'utf8'}).trim().split('\n').at(-1),totals=/^\s*(\d+)\s+(\d+)\s+files?\s*$/.exec(listing);assert(totals&&Number(totals[1])<=134283264&&Number(totals[2])===paths.length,'bounded exact zip inventory before extraction');
-           await mkdir(directory,{mode:0o700});execFileSync('unzip',['-q',zip,'-d',directory]);
-           if(kind==='pure')await verifyBudgetArtifact(directory,'pure',String(artifact.id));
-           else await openDirectory({stagingDir:directory,destinationDir:output,context:{purpose:'afw.finite-checkpoint-custody.syn.v1',repository:repo,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind}});
-           receipts.push({artifactId:String(artifact.id),digest:artifact.digest,name,kind});return {directory:kind==='pure'?directory:output,artifact};
-          }
-          const pure=await download('finite-budget-fixed-preparation-'+e.GITHUB_SHA,'pure');
-          const counts=async file=>{const value=JSON.parse(await readFile(file,'utf8'));assert.equal(value.fail,0);assert.equal(value.cancelled,0);assert.equal(value.skipped,0);assert.equal(value.todo,0);assert.equal(value.tests,value.pass);return value;};
-          const pureCounts=JSON.parse(await readFile(pure.directory+'/q-counts.json','utf8'));assert.deepEqual(pureCounts,{tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0});
-          const pureDiagnostic=JSON.parse(await readFile(pure.directory+'/diagnostics.json','utf8'));assert.equal(pureDiagnostic.allPassed,true);assert(pureDiagnostic.profiles.every(profile=>profile.I0Opened===false&&profile.nativeExecutionProduced===false));assert.equal(pureDiagnostic.profiles.find(p=>p.profile==='positive').additionalSYNCount,0);
-          for(const cfg of fixed){
-           const proof=await download('finite-budget-'+cfg.job+'-'+e.GITHUB_SHA+'-'+e.GITHUB_RUN_ID,cfg.kind),manifest=JSON.parse(await readFile(proof.directory+'/job-manifest.json','utf8'));
-           validateFixedBudgetJobManifest(manifest,{job:cfg.job,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),artifactId:String(proof.artifact.id),digest:proof.artifact.digest.slice(7),context:{purpose:'afw.finite-checkpoint-custody.syn.v1',repository:repo,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:cfg.kind}});
-           opened.set(cfg.job,{...proof,manifest});
-          }
-          const positive=opened.get('positive_consume'),readonly=opened.get('readonly'),a=opened.get('reduction_consume_a'),producer=opened.get('reduction_prepare');
-          assert.equal((await counts(positive.directory+'/business-counts.json')).pass,1);assert.equal((await counts(readonly.directory+'/business-counts.json')).pass,3);assert.equal((await counts(a.directory+'/business-counts.json')).pass,2);assert.equal((await counts(e.RUNNER_TEMP+'/afw-native-private/business-counts.json')).pass,2);
-          const reductionCheckpoint=JSON.parse(await readFile(producer.directory+'/output/finite-budget/checkpoint/native/checkpoint.json','utf8')),positiveCheckpoint=JSON.parse(await readFile(opened.get('positive_prepare').directory+'/output/finite-budget/checkpoint/checkpoint.json','utf8'));
-          const readResult=async(directory,group,name)=>JSON.parse(await readFile(directory+'/output/finite-budget/'+group+'/'+name+'/full-result.json','utf8'));
-          const aResults=await Promise.all(['D1','D2'].map(name=>readResult(a.directory,'reduction',name))),bResults=await Promise.all(['D3','D4'].map(name=>readResult('.', 'reduction',name)));
-          const allD=[...aResults,...bResults];
-          for(const value of allD){
-           assert.equal(value.plan.I0,reductionCheckpoint.plan.I0);assert.equal(value.plan.C0,reductionCheckpoint.plan.C0);assert.equal(value.plan.C1,reductionCheckpoint.plan.C1);
-           assert(value.recovery.pairReady<=value.plan.C0-30000);assert.equal(value.recovery.pairSize,2);assert.equal(value.recovery.restart,false);
-           assert.equal(value.producer.artifactId,String(producer.artifact.id));assert.equal(value.producer.digest,producer.artifact.digest.slice(7));
-           assert.equal(value.producer.manifestSha256,sha(await readFile(producer.directory+'/output/finite-budget/checkpoint/native/manifest.json')));
-          }
-          const aStart=Math.min(...aResults.map(x=>x.recovery.pairEntered)),aEnd=Math.max(...aResults.map(x=>x.recovery.consumerFinished)),bStart=Math.min(...bResults.map(x=>x.recovery.pairEntered)),bEnd=Math.max(...bResults.map(x=>x.recovery.consumerFinished));
-          assert(Math.max(aStart,bStart)<Math.min(aEnd,bEnd),'actual consumer replica intervals overlap');
-          const rResults=await Promise.all(['R1','R2','R3'].map(name=>readResult(readonly.directory,'readonly',name)));
-          function checkpointLineage(data,kind){const rootRow=data.facts.rows.find(([key])=>key.startsWith('afw.finite-owner-issuer-provenance.v1:')&&key.endsWith(':root'));assert(rootRow);const sdk=JSON.parse(rootRow[1]);assert.equal(sdk.I0,data.plan.I0);assert.equal(sdk.C0,data.plan.C0);assert.equal(sdk.C1,data.plan.C1);return {kind,I0:sdk.I0,C0:sdk.C0,C1:sdk.C1,sdkRootHash:sdk.recordHash,graphs:[{role:'M',sha256:data.build.M.sha256},{role:'QA',sha256:data.build.QA.sha256}]};}
-          const lineages=[checkpointLineage(positiveCheckpoint,'positive'),checkpointLineage(reductionCheckpoint,'reduction'),...rResults.map(result=>{assert(result.lineage);return {...result.lineage,kind:result.caseName};})];
-          assert.equal(lineages.length,5);assert.deepEqual(lineages.map(x=>x.kind),['positive','reduction','R1','R2','R3']);assert.equal(lineages.flatMap(x=>x.graphs).length,10);
-          const positiveOwnership=JSON.parse(await readFile(opened.get('positive_prepare').directory+'/output/finite-budget/owned/positive_producer/ownership.json','utf8')),reductionOwnership=JSON.parse(await readFile(producer.directory+'/output/finite-budget/owned/reduction_producer/ownership.json','utf8'));
-          const occurrenceOwners=[positiveOwnership,reductionOwnership,...rResults.map(v=>v.ownership)];assert.equal(occurrenceOwners.length,5);
-          const occurrenceProof=occurrenceOwners.map((value,index)=>{assert.equal(value.complete,true);assert.equal(value.records.length,1);const record=value.records[0];assert.equal(record.kind,'initial');assert(record.events.includes('miniflare-attached'));assert(record.events.includes('fixture-attached'));assert.equal(record.graphs.length,2);assert.deepEqual(record.graphs.map(g=>g.role).sort(),['M','QA']);for(const graph of record.graphs){assert.equal(graph.mounted,true);assert.equal(graph.sha256,lineages[index].graphs.find(g=>g.role===graph.role).sha256);}return {occurrence:index+1,caseName:value.caseName,allocationOrdinal:record.ordinal,graphs:record.graphs};});assert.equal(occurrenceProof.flatMap(v=>v.graphs).length,10);
-
-          for(const l of lineages){assert.equal(l.C0,l.I0+900000);assert.equal(l.C1,l.C0+180000);assert.deepEqual(l.graphs.map(g=>g.role).sort(),['M','QA']);for(const graph of l.graphs)assert.match(graph.sha256,/^[a-f0-9]{64}$/);}
-          const jobs=jobInventory;assert.equal(jobs.total_count,7);assert(jobs.jobs.filter(job=>job.name!=='reduction_consume_b').every(job=>job.status==='completed'&&job.conclusion==='success'));
-          const intervals=jobs.jobs.filter(job=>job.name!=='contracts').flatMap(job=>[{at:Date.parse(job.started_at),delta:1},{at:job.completed_at?Date.parse(job.completed_at):Date.now(),delta:-1}]).sort((a,b)=>a.at-b.at||a.delta-b.delta);let nativeJobs=0,observedNativeJobPeak=0;for(const event of intervals){assert(Number.isSafeInteger(event.at));nativeJobs+=event.delta;observedNativeJobPeak=Math.max(observedNativeJobPeak,nativeJobs);}assert(observedNativeJobPeak<=3);
-          const summary={purpose:'afw.fixed-budget-coherent-private-proof.syn.v1',source:e.GITHUB_SHA,run:e.GITHUB_RUN_ID,attempt:1,businessCounts:{tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0},Q:8,R:3,D:4,P:1,lineages,occurrenceProof,consumerOverlap:{aStart,aEnd,bStart,bEnd,allFourReady:Math.max(...allD.map(x=>x.recovery.pairReady)),C0:reductionCheckpoint.plan.C0},receipts,jobs:jobs.jobs.map(job=>({id:job.id,name:job.name,status:job.status,conclusion:job.conclusion,startedAt:job.started_at,completedAt:job.completed_at})),observedNativeJobPeak,nativeJobBound:3,miniflarePerJobBound:2,globalMiniflareBound:6,requiresRootAllTerminalReadback:true,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
-          await writeFile(e.RUNNER_TEMP+'/afw-native-private/coherent-proof.json',JSON.stringify(summary,null,2));
-          await mkdir(e.RUNNER_TEMP+'/afw-qualification-safe',{mode:0o700});
-          await writeFile(e.RUNNER_TEMP+'/afw-qualification-safe/summary.json',JSON.stringify({purpose:'afw.fixed-budget-coherent-summary.syn.v1',source:e.GITHUB_SHA,run:e.GITHUB_RUN_ID,counts:summary.businessCounts,lineages:5,graphs:10,jobs:7,privateProofSha256:sha(Buffer.from(JSON.stringify(summary,null,2))),requiresRootAllTerminalReadback:true,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false},null,2));
-          
-          NODE
-      - name: Encrypt complete private evidence on success or failure
-        id: seal
-        if: always() && !cancelled() && steps.custody.outcome == 'success'
-        env:
-          COMMAND_OK: ${{ steps.native.outcome == 'success' && steps.aggregate.outcome == 'success' }}
-          SUCCESS_KIND: reduction-result-b
-          FAILURE_KIND: consumer-failure
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
-          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
-          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
-          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
-          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
-          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
-          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
-          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
-          NODE
-          
-      - name: Upload encrypted envelope and closed receipts only
-        id: upload
-        if: always() && !cancelled() && steps.seal.outcome == 'success'
-        uses: actions/upload-artifact@v4
-        with:
-          name: finite-budget-reduction_consume_b-${{ github.sha }}-${{ github.run_id }}
-          path: ${{ runner.temp }}/afw-native-public/
-          retention-days: 7
-          if-no-files-found: error
-      - name: Download own exact assigned artifact ID
-        id: own_download
-        if: always() && !cancelled() && steps.upload.outcome == 'success'
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-native-readback
-          merge-multiple: true
-      - name: Authenticate own same-ID inner inventory readback
-        id: own_verified
-        if: always() && !cancelled() && steps.own_download.outcome == 'success'
-        env:
-          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
-          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
-          OWN_KIND: ${{ steps.seal.outputs.kind }}
-        shell: bash
-        run: |
-          set -euo pipefail
-          umask 077
-          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
-          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
-          import {validateFixedBudgetJobManifest,collectFixedBudgetPeers} from './test/fixtures/finite-budget-world.mjs';
-          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
-          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
-          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
-          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
-          NODE
-          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
-          
-      - name: Preserve actual command and custody outcome
-        id: actual_outcome
-        if: always() && !cancelled()
-        shell: bash
-        run: |
-          set -euo pipefail
-          test '${{ steps.native.outcome }}' = success
-          test '${{ steps.aggregate.outcome }}' = success
-          test '${{ steps.own_verified.outcome }}' = success
-      - name: Bind closed summary to own verified native artifact
-        if: steps.aggregate.outcome == 'success' && steps.own_verified.outcome == 'success'
-        env:
-          NATIVE_ID: ${{ steps.upload.outputs.artifact-id }}
-          NATIVE_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
-        shell: bash
-        run: |
-          node --input-type=module <<'NODE'
-          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-qualification-safe',summary=JSON.parse(await readFile(root+'/summary.json','utf8'));assert.match(e.NATIVE_ID,/^[1-9][0-9]*$/);assert.match(e.NATIVE_DIGEST,/^[a-f0-9]{64}$/);
-          summary.consumerBArtifactId=e.NATIVE_ID;summary.consumerBArtifactDigest=e.NATIVE_DIGEST;summary.consumerBSameIdReadback=true;
-          const bytes=Buffer.from(JSON.stringify(summary,null,2));await writeFile(root+'/summary.json',bytes);await writeFile(root+'/manifest.json',JSON.stringify({source:e.GITHUB_SHA,run:e.GITHUB_RUN_ID,attempt:1,files:[{path:'summary.json',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}]}));
-          NODE
-      - name: Upload closed coherent counts and private-proof hash
-        id: summary_upload
-        if: steps.aggregate.outcome == 'success' && steps.own_verified.outcome == 'success'
-        uses: actions/upload-artifact@v4
-        with:
-          name: finite-budget-coherent-summary-${{ github.sha }}-${{ github.run_id }}
-          path: ${{ runner.temp }}/afw-qualification-safe/
-          retention-days: 7
-          if-no-files-found: error
-      - name: Download closed summary by its assigned ID
-        id: summary_download
-        if: steps.summary_upload.outcome == 'success'
-        uses: actions/download-artifact@v4
-        with:
-          github-token: ${{ github.token }}
-          repository: ${{ github.repository }}
-          run-id: ${{ github.run_id }}
-          artifact-ids: ${{ steps.summary_upload.outputs.artifact-id }}
-          path: ${{ runner.temp }}/afw-qualification-summary-readback
-          merge-multiple: true
-      - name: Verify closed summary exact-ID inventory
-        if: steps.summary_download.outcome == 'success'
-        env:
-          SUMMARY_ID: ${{ steps.summary_upload.outputs.artifact-id }}
-        shell: bash
-        run: |
-          node --input-type=module <<'NODE'
-          import assert from 'node:assert/strict';import {readFile,readdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-qualification-summary-readback';assert.match(e.SUMMARY_ID,/^[1-9][0-9]*$/);assert.deepEqual((await readdir(root)).sort(),['manifest.json','summary.json']);
-          const bytes=await readFile(root+'/summary.json'),manifest=JSON.parse(await readFile(root+'/manifest.json','utf8'));assert.equal(manifest.source,e.GITHUB_SHA);assert.equal(manifest.run,e.GITHUB_RUN_ID);assert.equal(manifest.attempt,1);assert.deepEqual(manifest.files,[{path:'summary.json',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}]);
-          for(const path of ['manifest.json','summary.json'])assert((await readFile(root+'/'+path)).equals(await readFile(e.RUNNER_TEMP+'/afw-qualification-safe/'+path)));
-          const summary=JSON.parse(bytes);assert.equal(summary.counts.pass,16);assert.equal(summary.requiresRootAllTerminalReadback,true);assert.equal(summary.operationalReadiness,false);console.log('CLOSED_SUMMARY_SAME_ID_VERIFIED '+e.SUMMARY_ID);
-          NODE
+          import {execFileSync} from 'node:child_process';
+          async function bootstrap(){
+           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml';
+           const keyless=()=>assert.equal(e.AFW_SYN_CHECKPOINT_KEY,undefined,'postmortem_key_present');
+           keyless();assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(e.GITHUB_EVENT_NAME,'push');assert.equal(process.versions.node,'22.23.4');assert(/^[a-f0-9]{40}$/.test(e.GITHUB_SHA));assert(/^[1-9][0-9]*$/.test(e.GITHUB_RUN_ID)&&Number.isSafeInteger(Number(e.GITHUB_RUN_ID))&&String(Number(e.GITHUB_RUN_ID))===e.GITHUB_RUN_ID);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
+           const git=(...a)=>execFileSync('git',a,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
+           assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path],{stdio:['ignore','pipe','pipe']}).equals(bytes));
+           const sourcePins={"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+           for(const [k,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[k]);assert.equal(blob(await readFile(p)),sourcePins[k]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
+           const map={adapter:['NODE_POSTMORTEM_ADAPTER','afw-postmortem-adapter.mjs'],inspector:['NODE_POSTMORTEM_INSPECTOR','afw-postmortem-inspector.mjs'],controls:['NODE_POSTMORTEM_CONTROLS','afw-postmortem-controls.mjs'],safeZip:['NODE_SAFE_ZIP','afw-postmortem-safe-zip.mjs'],receiver:['NODE_POSTMORTEM_RECEIVER','afw-postmortem-receiver.mjs']},expectedHashes={"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","controls":"e724c18928f7fe21791165086d840333b0a1544109b8041b26966b801bbbcc3f","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},programHashes={},programs={},provenance={},lines=source.split('\n');
+           for(const [k,[marker,file]]of Object.entries(map)){
+            const header='          cat >'+'"$RUNNER_TEMP/'+file+'" '+'<'+'<'+"'"+marker+"'",positions=lines.flatMap((s,n)=>s===header?[n]:[]);assert.equal(positions.length,1);const begin=positions[0]+1,ending=lines.flatMap((s,n)=>s==='          '+marker?[n]:[]);assert.equal(ending.length,1);assert(ending[0]>begin);const body=lines.slice(begin,ending[0]).map(s=>{assert(s.startsWith('          '));return s.slice(10);}).join('\n')+'\n';programs[k]=body;programHashes[k]=hash(body);assert.equal(programHashes[k],expectedHashes[k]);provenance[k]={bytes:Buffer.byteLength(body),sha256:programHashes[k]};
+           }
+           assert.equal(Object.keys(programHashes).length,5);assert.equal(new Set(Object.values(programHashes)).size,5);assert.equal(provenance.adapter.bytes,43451);assert.equal(programHashes.adapter,'a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3');assert.equal(provenance.safeZip.bytes,13305);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');
+           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);provenance.zip3={bytes:Buffer.byteLength(zip3),sha256:hash(zip3)};assert.equal(provenance.zip3.bytes,3380);assert.equal(provenance.zip3.sha256,'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
+           const observer={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node},expected={observer,programHashes};
+           const historicalBinding={"bindingRole":"historical-subject-reused-component-pins","context":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"b8497734abe5f6afdcc7c518e82a591438353f14","tree":"1c0e1a87fa759ea07dc117931c37258067d3b1c0","workflowBlob":"5eaf4f5e5497711e219999fa14c51501a82f94d2","run":"43414661211","attempt":1,"node":"22.23.4"},"sourcePins":{"pureTestBlob":"1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8","nativeTestBlob":"533dafb5df5f8e57442c5b9029dc8dec6dded434","worldBlob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b","custodyBlob":"4d05b5ec0f7b074be88ef9733a47c984b0212351","lockBlob":"36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b","sdkVersion":"1.2.1"},"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","controls":"afe050bdb5a35a0c727a2b949fba4a58a7e222f4ef12c8e86756d0e24f21d6b0","verifier":"c6fac92623809ee41b69ee77260b32d50c1149ba5716ca0a39b8b024d7dfb849","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}};
+           keyless();for(const [k,[,file]]of Object.entries(map))await writeFile(join(e.RUNNER_TEMP,file),programs[k],{flag:'wx',mode:0o600});
+           await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify(historicalBinding)+'\n',{flag:'wx',mode:0o600});await writeFile(join(e.RUNNER_TEMP,'afw-postmortem-observer.json'),JSON.stringify(expected)+'\n',{flag:'wx',mode:0o600});
+           return {expected,provenance};
+          }
+          let output=null;
+          try{
+           const {expected}=await bootstrap(),url=file=>pathToFileURL(join(process.env.RUNNER_TEMP,file)).href;
+           const A=await import(url('afw-postmortem-adapter.mjs'));
+           const I=await import(url('afw-postmortem-inspector.mjs'));
+           const Z=await import(url('afw-postmortem-safe-zip.mjs'));
+           const R=await import(url('afw-postmortem-receiver.mjs'));
+           const C=await import(url('afw-postmortem-controls.mjs'));
+           A.requireKeyless();I.validateExpected(expected);assert.deepEqual(A.CONTEXT,I.SUBJECT);
+           const receiverControls=await C.runReceiverControls();assert.equal(receiverControls.passed,2);
+           let needs;try{needs=JSON.parse(process.env.AFW_POSTMORTEM_NEEDS);}catch{needs=null;}
+           A.requireKeyless();output=await R.verifyPostmortemRoute(needs,expected);
+          }catch{
+           output={marker:'AFW_CUSTODY_POSTMORTEM_READBACK/1',observer:null,programHashes:null,producerResult:null,artifactId:null,uploadedDigest:null,status:'unavailable',reason:'observer_unavailable',inspectionComplete:false,rawZipBytes:null,rawZipSha256:null,resultSha256:null,manifestSha256:null,historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          }
+          const line=JSON.stringify(output);if(Buffer.byteLength(line)>4096)process.exitCode=1;else{console.log(line);process.exitCode=output.status==='verified'?0:1;}
+          NODE_POSTMORTEM_VERIFY
```

### Complete inactive → actual guard/trigger diff
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
+    if: ${{ github.event_name == 'push' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.repository_id == '1347578006' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.workflow_ref == 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 && github.event.head_commit.message == 'AFW custody postmortem ZERO KEY one use 20261113-0e0c434146ad12ca-01' }}
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
@@ -764,21 +768,21 @@
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
+    if: ${{ always() && github.event_name == 'push' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.repository_id == '1347578006' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.workflow_ref == 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 && github.event.head_commit.message == 'AFW custody postmortem ZERO KEY one use 20261113-0e0c434146ad12ca-01' }}
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

## Current actual evidence (NOT passing)
ONE run43433569894/attempt1/sourceDFD completedfailure; exacttwojobscustody_inspect131912851433andverify131912949800 terminalfailure. Setup/fixedSourcecheckout/exactNode/bodypreservationpassed. Producercollectionstepfailed, uploadskipped, artifacts[]. Producer fixed markercontrols, per-control statusunobserved. Targetarchivesnotreachedbycurrentcontrolflow. Receiver returned truthful unavailable/needs_unsuccessful, currentObserverand5hashesexact/all5flagsfalse; no numericaltargetcounts/SAFE/AEAD/historycause claims. RootonlycurrentKEYLESSmarkers; no oldprivate/purelogs/archivebytes. Evidence below.
```json
{
  "actual": {
    "run": "43433569894",
    "attempt": 1,
    "source": "dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d",
    "status": "completed",
    "conclusion": "failure",
    "jobs": [
      {
        "name": "custody_inspect",
        "conclusion": "failure"
      },
      {
        "name": "verify",
        "conclusion": "failure"
      }
    ],
    "artifactCount": 0,
    "stage": "controls",
    "perControlResults": "unobserved",
    "historicalTargets": "not_reached_by_current_control_flow",
    "record": {
      "source": "dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d",
      "run": "43433569894",
      "artifactId": null,
      "status": "unavailable",
      "reason": "needs_unsuccessful",
      "transportVerified": false,
      "inspectionComplete": false,
      "historicalCauseProven": false,
      "receiptAuthenticated": false,
      "operationalReadiness": false,
      "PCoff": false
    },
    "originalFailureCauseProven": false
  },
  "producer": {
    "jobId": 131912851433,
    "job": "custody_inspect",
    "markers": [
      {
        "marker": "AFW_CUSTODY_POSTMORTEM_PRODUCER_UNAVAILABLE/1",
        "payload": {
          "stage": "controls",
          "historicalCauseProven": false,
          "receiptAuthenticated": false,
          "operationalReadiness": false,
          "completePackage": false,
          "PCoff": false,
          "globalNativeDrainVerified": false,
          "sdkNamespaceEmptyVerified": false
        }
      }
    ],
    "boundedErrors": [
      "##[error]Process completed with exit code 1."
    ]
  },
  "receiver": {
    "jobId": 131912949800,
    "job": "verify",
    "markers": [
      {
        "marker": "AFW_CUSTODY_POSTMORTEM_READBACK/1",
        "observer": {
          "repository": "tokenizartinfo-ops/agent-friendly-web",
          "repositoryId": "1347578006",
          "ref": "refs/heads/feat/finite-native-cleanup-20261101",
          "source": "dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d",
          "tree": "69c5f31fac6acfefe41c5523f9f3d39fbe8b6f0d",
          "workflowBlob": "499b437599694092a48714ad2bab1b75814b5f73",
          "run": "43433569894",
          "attempt": 1,
          "node": "22.23.4"
        },
        "programHashes": {
          "adapter": "a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3",
          "inspector": "78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f",
          "controls": "e724c18928f7fe21791165086d840333b0a1544109b8041b26966b801bbbcc3f",
          "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
          "receiver": "4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"
        },
        "producerResult": "failure",
        "artifactId": null,
        "uploadedDigest": null,
        "status": "unavailable",
        "reason": "needs_unsuccessful",
        "inspectionComplete": false,
        "rawZipBytes": null,
        "rawZipSha256": null,
        "resultSha256": null,
        "manifestSha256": null,
        "historicalCauseProven": false,
        "receiptAuthenticated": false,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false,
        "globalNativeDrainVerified": false,
        "sdkNamespaceEmptyVerified": false
      }
    ],
    "boundedErrors": [
      "##[error]Process completed with exit code 1."
    ]
  },
  "rootRecordObserverTests": {
    "positive": 3,
    "negativeRejected": 17,
    "SourceExecuted": false,
    "privateBytesRead": false
  },
  "pairObserverTests": {
    "positive": 1,
    "negativeRejected": 14,
    "SourceExecuted": false,
    "NativeExecuted": false,
    "privateBytesRead": false
  },
  "diffRoundtrip": {
    "originalToInactive": true,
    "inactiveToActual": true,
    "fullImplementationHunks": 1,
    "activationHunks": 2,
    "completeNoTruncation": true
  }
}
```

## Reviewer contract
Return BOTH spec and quality verdicts, actionable Critical/Important/Minor findings with exact currentF7 file:line (or package lines), why/fix. Treat reports as claims. Failure is observed, missing per-control diagnostics is a reviewable implementation property, not permission to rerun or infer historical cause. Review new implementation/actualseams andclosure, no broadercrawl. Do not rerun tests; recommend a narrowly justified future cloudcontrol if essential. Name precise unavailableevidence rather than invent. No subagents. No corrections yourself.

## Final actual Source closure / complete report diff

Final dcd70e8905cc42beb03c871d00a95e0479c6292c; directparent restorea38d5969a0d52247008ba9a2c22620224446457d; restoretreeexactpreunitd86acb49d2026d2207eeb35ff97f728dc014e7d9. Base..final netSourcechange is ONLY appended SAMEreport, F7 restoredbyteexact. Temporaryimplementationdiffabove is intentionally included forfulltaskreview despite netSourcecleanup.
```json
{
  "closure": {
    "source": "dcd70e8905cc42beb03c871d00a95e0479c6292c",
    "tree": "d58bae6436fb6d8dd690bff05eec1caa22cc38d6",
    "prior3195LeavesExact": true,
    "leaves": 3196,
    "soleNewReport": "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
    "reportSha": "ab60f6a6f3f7a09b62c79630ae4cf8fd91e90e7f",
    "reportChars": 189509,
    "F7exact": true,
    "mainUnchanged": true,
    "runId": "43433569894",
    "runSource": "dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d",
    "runCompleted": true,
    "allDeclaredJobsTerminal": true,
    "declaredJobs": 2,
    "fiveBranchActiveStatusesZero": true,
    "all62WorkflowBlobsExact": true,
    "providerRuntimeRead": false,
    "operationalReadiness": false,
    "PCoff": false,
    "exactPreunitRestoreTree": true,
    "closedCommitRuns": 0,
    "currentSourceAttempts": 1,
    "prefixChars": 177489
  },
  "reportHashes": {
    "bytes": 189569,
    "sha256": "578ce3586718472f4b74c19260aa8d21f021c908f1c11da3dd195ee93ad7c12a",
    "gitBlob": "ab60f6a6f3f7a09b62c79630ae4cf8fd91e90e7f"
  }
}
```

Fullimplementerreportappend startsafter prior177489chars; complete8linecontextunifieddiffbelow. Fetch originalreport onlyif concrete missingevidence; no need readhistorical177k. This is actualreceivedreport, notRootrewritingclaims.
```diff
--- a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
+++ b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
@@ -1360,8 +1360,105 @@
 
 All five flags remain exactly false:
 
 ```json
 {"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
 ```
 
 **STOP after exact restoration, this prefix-preserving append and final readbacks. No second wave, extra qualification or Native retry.**
+
+
+## 2026-11-13 — ONE ZERO-key retained-envelope postmortem: controls failure, exact restoration
+
+Evidence recorded 2026-11-13 13:28:37 UTC. This independent diagnostic did not produce a target observation or a SMALLSAFE pair. It is not a coherent-suite pass, Native qualification, AEAD authentication, historical-cause proof or PC-off acceptance. All five readiness flags remain false. Coherent FF-I2 remains OPEN and actual-key/Native activation remains HELD.
+
+Authority and immutable Source:
+- Root preparation/spec/plan at docs commit 92f26ec8df110b190ef1a5a15f4988a77d4b26cf; fixed-template gate at ef63e2feb96180e8b494f2922f518f4d7bd2abf6; ONE-run release at dd71a4c1ecdc631d7ba6bb64a074ade6e96f55d9, docs/superpowers/briefs/2026-11-13-custody-postmortem-one-run-release.md.
+- PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web, ID 1347578006; Source feat/finite-native-cleanup-20261101; GitHub API/GitDB/Actions only.
+- Pre-unit closed Source 08f5d5f203efef09999ea2f6f0e899637af0bdf4, tree d86acb49d2026d2207eeb35ff97f728dc014e7d9. Inactive candidate 0e0c434146ad12caf703c34c114a17120d725d31, tree 27eede956a2cd4cb5b1f70d344741e7b002a8be5, F7 5ad4e38a8c97a2dacca661304067b68ce9f2cd2b, 114557 bytes, SHA256 b82fed697ff9c52f74ab2950510c221c83f68e5d69ba85f1c30d837a72935d6e.
+- Exact approved activation commit dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d, tree 69c5f31fac6acfefe41c5523f9f3d39fbe8b6f0d, F7 499b437599694092a48714ad2bab1b75814b5f73, 115679 bytes, SHA256 f5abd48536faaa633b56b5018b7bfe2a80a7301927496bb4bd736493b2e30eda; parent 0e0c434146ad12caf703c34c114a17120d725d31.
+- Exact consumed one-use message: AFW custody postmortem ZERO KEY one use 20261113-0e0c434146ad12ca-01.
+- Active delta contained only the self-F7-path/fixed-branch push trigger and two complete fixed guards. Root reviewed all 14 complete nonsecret expressions, canonical outside-literal-run YAML and five unchanged bodies. Both jobs used Node 22.23.4; no AFW environment or master-key binding. Main remained 0c9c475b3ebaa970fc11d628b40e50a90cceb727.
+
+Five full body hashes:
+
+| Body | Bytes | SHA256 |
+|---|---:|---|
+| adapter (original historical reuse) | 43451 | a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3 |
+| inspector | 10590 | 78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f |
+| controls | 13187 | e724c18928f7fe21791165086d840333b0a1544109b8041b26966b801bbbcc3f |
+| safeZip (original reuse) | 13305 | b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d |
+| receiver | 5570 | 4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1 |
+
+The actual current Observer in the receiver marker binds activation Source/tree/F7/run 43433569894/attempt 1/Node 22.23.4. Historical Subject remains separately b8497734abe5f6afdcc7c518e82a591438353f14/tree 1c0e1a87fa759ea07dc117931c37258067d3b1c0/F7 5eaf4f5e5497711e219999fa14c51501a82f94d2/run 43414661211/attempt 1. Subject program hashes are labeled historical reused-component pins; no environment identity was spoofed.
+
+Actual run and terminal evidence:
+- [Actions run 43433569894](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43433569894), event push, attempt 1, created 2026-11-13T13:25:49Z, completed/failure, updated 2026-11-13T13:26:10Z; exactly one run for the activation commit.
+- custody_inspect job 131912851433: completed/failure. Fixed-keyless Source check, checkout, exact Node and body-preservation steps succeeded. Run-controls/inspection step failed; upload was skipped.
+- verify job 131912949800: completed/failure. Fixed-keyless Source check, checkout and exact Node succeeded; independent receiver step failed with the closed needs_unsuccessful marker below.
+- Source remained frozen at activation through run completion and both declared jobs terminal. No rerun, additional attempt, extra qualification or new implementation was made.
+
+Actual commands and bounded outputs:
+1. Producer step invoked node --input-type=module (stderr discarded by the approved driver), bootstrapped current Source and imported the five pinned bodies, then invoked C.runAllControls(expected,provenance). Its phase was controls. No all-controls completion inventory was emitted; exact failing sub-control and arbitrary underlying error are UNKNOWN.
+2. Receiver step invoked node --input-type=module, bootstrapped independently, then C.runReceiverControls(); assert.equal(receiverControls.passed,2); followed by R.verifyPostmortemRoute(needs,expected). Reaching the needs_unsuccessful marker with valid current Observer means this receiver control-flow assertion returned; individual per-ID stdout was not emitted. This does not establish the producer's complete 23-control pass.
+3. No local Source evaluation/import, dependency install, build, SDK, World, MF, AES or Native invocation was used. Only current approved KEYLESS job logs were read and reduced to fixed markers. No historical/private/pure logs or archives were fetched to the actor, MCP or PC.
+
+Exact producer marker observed at 2026-11-13T13:25:59.6861454Z:
+
+```text
+AFW_CUSTODY_POSTMORTEM_PRODUCER_UNAVAILABLE/1 {"stage":"controls","historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Fixed 23-control inventory (7 diagnostic + 14 original ZIP + 2 receiver). The producer's per-ID status/counts were not published; these rows do not invent a failed ID or claim all 23 passed.
+
+| Group | Fixed ID | Observed status |
+|---|---|---|
+| diagnostic | postmortem_original_prefix_binding | Individual producer outcome unobserved |
+| diagnostic | postmortem_subject_observer_separation | Individual producer outcome unobserved |
+| diagnostic | postmortem_original_receipt_cap_boundaries | Individual producer outcome unobserved |
+| diagnostic | postmortem_stage_sequence | Individual producer outcome unobserved |
+| diagnostic | postmortem_metadata_failure_blocks_archive | Individual producer outcome unobserved |
+| diagnostic | postmortem_target_null_and_cap_coherence | Individual producer outcome unobserved |
+| diagnostic | postmortem_error_redaction | Individual producer outcome unobserved |
+| ZIP | zip_valid_store_crc_vector | Individual producer outcome unobserved |
+| ZIP | zip_valid_deflate | Individual producer outcome unobserved |
+| ZIP | zip_signed_unsigned_descriptors | Individual producer outcome unobserved |
+| ZIP | zip_wrong_size | Individual producer outcome unobserved |
+| ZIP | zip_wrong_upload_sha | Individual producer outcome unobserved |
+| ZIP | zip_wrong_metadata_sha | Individual producer outcome unobserved |
+| ZIP | zip_extra_entry | Individual producer outcome unobserved |
+| ZIP | zip_duplicate_entry | Individual producer outcome unobserved |
+| ZIP | zip_traversal_entry | Individual producer outcome unobserved |
+| ZIP | zip_symlink | Individual producer outcome unobserved |
+| ZIP | zip_bad_crc | Individual producer outcome unobserved |
+| ZIP | zip_noncontiguous_ranges | Individual producer outcome unobserved |
+| ZIP | zip_declared_and_inflate_caps | Individual producer outcome unobserved |
+| ZIP | download_stream_redirect_auth_bounds | Individual producer outcome unobserved |
+| receiver | postmortem_pair_schema_manifest_binding | Returned passed via receiver control flow; no individual stdout |
+| receiver | postmortem_route_direct_output_binding | Returned passed via receiver control flow; no individual stdout |
+
+Actual targets and numeric observations:
+
+| Fixed target | Artifact ID | Actual inspection stage | fileCount | totalBytes | successReceiptCapAccepted |
+|---|---:|---|---|---|---|
+| positive_prepare / checkpoint | 14032036855 | Not reached after producer controls failure | Unobserved | Unobserved | Unobserved |
+| reduction_prepare / reduction-checkpoint | 14032480638 | Not reached after producer controls failure | Unobserved | Unobserved | Unobserved |
+
+The source-bound actual-target loop follows successful completion of C.runAllControls. The producer marker's controls phase and skipped upload show that this loop/publication path was not reached. Inert controls use internal fixture I/O; this failure supplies no present retained-envelope metadata, raw ZIP digest, receipt count or cap decision. No actual private target archive read was reached by this diagnostic. No historical failure cause, wrong key, provider fault or repaired compatibility is inferred.
+
+Current SMALLSAFE and closed receiver:
+- Artifact list for this run is empty. No current result.json/manifest.json pair was uploaded; artifact ID, uploaded digest, raw ZIP size/hash and result/manifest hashes are null. No artifact download occurred.
+- inspectionComplete is false; historicalCauseProven and receiptAuthenticated are false; every readiness flag is false.
+- Exact closed marker at 2026-11-13T13:26:08.0342074Z (1233 bytes, below 4096 bytes):
+
+```json
+{"marker":"AFW_CUSTODY_POSTMORTEM_READBACK/1","observer":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d","tree":"69c5f31fac6acfefe41c5523f9f3d39fbe8b6f0d","workflowBlob":"499b437599694092a48714ad2bab1b75814b5f73","run":"43433569894","attempt":1,"node":"22.23.4"},"programHashes":{"adapter":"a1e7a28f356cafde6e9486a9bcdb69aaa3fc98e00b928df11f36052bb915d9f3","inspector":"78352e64e6b55c24ae21648907c835c684cbffaf26ecdd868c2b917bd8a6852f","controls":"e724c18928f7fe21791165086d840333b0a1544109b8041b26966b801bbbcc3f","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","receiver":"4d7bf001cef6979bf09bad2a2134ba21bbf4411c9957607439a2e015503ce7d1"},"producerResult":"failure","artifactId":null,"uploadedDigest":null,"status":"unavailable","reason":"needs_unsuccessful","inspectionComplete":false,"rawZipBytes":null,"rawZipSha256":null,"resultSha256":null,"manifestSha256":null,"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Mandatory restoration and preservation:
+- After completed run and both terminal jobs, frozen Source dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d, recoverable original F7 and unchanged report prefix were freshly checked.
+- Restoration commit a38d5969a0d52247008ba9a2c22620224446457d has parent dfd37bd06d8f73bb9d93f70cfb64c03a2f9ac05d and EXACT pre-unit closed tree d86acb49d2026d2207eeb35ff97f728dc014e7d9. Source was CAS-restored without force. Original F7 read back byte-exact at f7a71f1a0fa4f5ddf069ff411f008a098455e5cc, 126209 bytes, SHA256 1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a.
+- Before this append: restoration commit had zero runs; activation had exactly one attempt-1 run; queued/in_progress/waiting/requested/pending totals were all zero. Main remained exact 0c9c475b3ebaa970fc11d628b40e50a90cceb727.
+- This is an append to the SAME report only. The entire prior 177489 characters / 177547 bytes remain an exact prefix, prior blob a74aaaee7ac5ab5e3c42cc9d36e0c8395a17b1c6, SHA256 0f0de84240db9b600cc3e75efcbfed5b2cb1b24dba4e9d693bdf295fc4d5344f. All 3195 original leaf type/mode/blob identities other than this report, including original F7 and R1 report, must remain exact; final inventory 3196 leaves / 62 workflows.
+- The final append's immutable commit/tree/report blob and post-publication closure readbacks are returned separately to Root, avoiding self-referential report hashes. No further Source work is released.
+
+Disposition: DONE_WITH_CONCERNS. The ONE diagnostic failed at producer controls before actual target inspection; precise failed control/error remains unknown because only fixed redacted markers were emitted. Retained producer observations and historical causes remain unqualified. FF-I2 actual-key/Native hold is unchanged; no further run, code fix, promotion or PC-off claim follows from this receipt.
```
