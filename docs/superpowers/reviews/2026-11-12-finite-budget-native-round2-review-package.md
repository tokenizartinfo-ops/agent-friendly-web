# Task2 formal fix round2/5 · scoped re-review package

PROJECT AFW; Source-only keylessSYN preparation. Repository tokenizartinfo-ops/agent-friendly-web. Fix base d9b7ea752466ee6c5865b1529aeed28072a085ff; final head 2baae7652c450265a56acaf70aba772b0a12a727; final tree60dbb30172bab4513c51cb46804f741b0db3a984. Formal fix review after covering actualPASS, not native16 qualification. Prepared2026-11-12T13:02Z.

## Task / authority
Same task/plan docs/superpowers/plans/2026-11-07-finite-native-budget-qualification.md (bff30216564c1364deb8ba6eda03d83bacebe508). Binding same seven-job/16case/clock/custody/Root constraints unchanged. Original brief + round2PhaseB2f03afc3, GREEN5d9acc75 with producer_evidence ruling authorize ONLY seventh Node persistence notes in exact producer/recovery/evidence try/callback; no worker/SDK/12observer/pin/timer/defaultalgorithm changes. Additional minimal lint/framing/expected-inventory/VMArray harness fixes are included in this complete diff, not excluded from review. Stable rulings under Rootdocs briefs2026-11-12-finite-budget-native-*.md are linked from ledger; they do not justify code beyond scope.

## Findings under verification — VERBATIM
**F2 — NOT ADDRESSED, Important.** R3 y D4 ya seleccionan el hijo correcto y registran por separado su trabajo y su espera. El veredicto acepta, sin embargo, cualquier rechazo de `wait` y aborto del hijo en la ventana posterior al deadline con el padre vivo. El lease original también aborta en `finally` cuando termina por un error ordinario. El observador dispone de `workSettledAt`, `workPendingAtAbort` y `sameWorkWaitError`, pero el veredicto no los consulta. Por tanto, una lectura que muestre el mismo error de trabajo propagado por `wait` y un aborto de cierre puede contabilizarse como `denialAfterDeadline:true`. El control puro solo ejercita el caso en que el temporizador coincide con el rechazo y el trabajo sigue pendiente. La discriminación debe admitir los órdenes reales del SDK y conservar como indeterminada una causa que los datos no distinguen.

**F5 — NOT ADDRESSED, Important.** Se resolvieron la pérdida del callback antes de asignar `f`, la captura terminal en readonly y el orden del archivo en el camino exitoso. Queda un fallo reproducible por inspección del *caller*: el wrapper de `mf.dispose()` captura el rechazo del disposer original, marca `disposalUncertain` y **resuelve** la promesa. El productor protegido interpreta esa resolución como éxito, marca `disposedForCheckpoint=true`, copia `input.persist` a `checkpoint/state` y puede verificar un manifiesto sobre esa copia. El cierre exterior terminará clasificando el job como fallo e impedirá que un consumidor monte el artefacto, pero ya se habrá copiado una base cuya disposición era incierta. El control verde comprobó `beforeDelete()===false` y el bloqueo de una nueva asignación. Quedó sin cubrir la continuación del productor inmediatamente posterior a su `await`.

**Nuevo hallazgo — Important.** El sellado público del job puro copia `syntax.log`, `lint.log`, `tests.tap` e `inactive.tap` directamente desde el área privada, también cuando falla la comprobación. Un error de `node --check` puede incluir la línea fuente entera, y un TAP fallido puede incluir stack y valores de aserción. El filtro de 1 MiB solo limita el tamaño. Además, la primera de las dos copias de TAP ocurre antes de aplicar ese límite. Así, un error futuro puede publicar texto fuente o diagnóstico bruto en el artefacto público. El covering exitoso no recorrió esta rama.

Prior five findings remain closed unless this fix diff introduced breakage. Verify these three and new Critical/Important breakage in FULLfixdiff only. Do not broaden into unchanged code/ordinaryOwnImport/oldtests. Read-only; no Source/branch/code modifications, helperagents, newjobs/probes/localsetup or suite rerun. Specific unanswered doubts should be reported, not executed without Root ruling.

## Actual covering / report
Report docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md at final2baae7652c450265a56acaf70aba772b0a12a727, blob901479df4f9c11de3f681bac5671e881e6d62d69. Its complete append/change is included below; no need to fetch the full136515char report again. Root confirmed it names commands/files/output and preserved all prior history by exact prefix.
Covering Source8735e1b9/43222147327/1/contracts131196068335 actualSUCCESS: fixed5syntax/lint, unsetgroupinactive1/business0+invalidrejection, Q8exact8/8/0failcancelSkipTodo, F1–F8 allpass(F8sixcases), threeFULLvalidatedprofilespositive0/readonly3/reduction_a3 and12primaryblocks. Same-ID artifact13944719793/111851B/digest91a2ddba/firstretrieval/full10inventory retainedsevenDays. [Root primary proof](./2026-11-12-finite-budget-native-round2-green-primary.md). Old failed/skipped gates in append are historical and not falsely GREEN. Final reconciliation only workflow metadata/gates+appendreport; all code matches passing Source; COMPLETE7/FIXEDsealer/manual/allfalse. Actual16 stillHELD.

## Full snapshot map / scope
3190leaves/3183outsideprotected reported. All7authorizedpaths shown, only5changed.

| Path | Before blob | Final blob | Status |
| --- | --- | --- | --- |
| test/fixtures/finite-budget-world.mjs | 37de8696f086d1237609b262efa822961d3e30a2 | 5f349fdbece8a38f3dc78c82f57131b0efbd01da | changed |
| test/fixtures/finite-owner-cleanup.mjs | cda4ab10544fc8be127aa7a89f86b74141784dd3 | 2f5dad6c306fac1be2f11845bef640bb204ad572 | changed |
| test/fixtures/finite-initial-entry-world.mjs | a7b730dc9be336528f0971544099f79d05758b1a | a7b730dc9be336528f0971544099f79d05758b1a | unchanged |
| test/fixtures/finite-owner-cleanup-persistence.mjs | e317f58205b062adb6223a4dd5647b65e9c860b4 | e0dda1fd3d66c1864fd0b20f873c7fc0c452f6d8 | changed |
| test/mcp-qa-finite-budget-native.test.mjs | 533dafb5df5f8e57442c5b9029dc8dec6dded434 | 533dafb5df5f8e57442c5b9029dc8dec6dded434 | unchanged |
| .github/workflows/afw-finite-budget-qualification.yml | c72e31919d477280c9eef39b63ca46708acb82e7 | f7a71f1a0fa4f5ddf069ff411f008a098455e5cc | changed |
| docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md | 5f51286988613889c4981082c825e3f7a7063361 | 901479df4f9c11de3f681bac5671e881e6d62d69 | changed |

## All13commits
- 3b80befe98fad6be0d57a2afab02251db1049130 — test: add private round2 causal regressions and strict closed RED evidence
- 686a82358d52fa9c5bf493a891b8e605d7b55eca — docs: preserve round2 causal RED evidence and restore complete held workflow
- 0d8632f1f538bcd034f782d2678c3dd028fdde02 — chore(qa): preserve unqualified round2 fixed harness draft [skip ci]
- 7fc9e302de7423ea13de207915092e1f2230fdbe — fix(qa): cover causal deadline lifecycle and closed pure evidence
- 08698b8fb574f09c9bffe69b8da2e2505dee911b — chore(qa): preserve failed round2 covering and restore held workflow [skip ci]
- e40feceb66af157354fe6ea8247822f1d325bfa7 — chore(qa): collect one closed five-file lint diagnostic
- 9b01fe6a9d41afc17672ddd4d7acc653830d69ae — chore(qa): preserve structured lint findings and restore held workflow [skip ci]
- 2f79c17c1eba7b30bf4d7b9d199165a9574d2899 — fix(qa): rename four VM bindings and run one pure covering
- ad244d8c036a22b1c56725dd3f77dc4b902b4ba3 — chore(qa): retain failed F8 covering and restore exact held workflow [skip ci]
- 306188a8c432506f3c334aad70c936bed04b8a0f — fix(qa): frame current sealer and align unique expected inventory
- e498eeda0f2b36e5d945c5e2897769360e4f312e — chore(qa): preserve full preflights and F8 failure with held workflow [skip ci]
- 8735e1b975b9aad058c81f362cdfebc1c4dfbb84 — fix(qa): marshal fixed sandbox directory arrays into its VM realm
- 2baae7652c450265a56acaf70aba772b0a12a727 — chore(qa): reconcile covered fixed seven-job preparation inactive [skip ci]

## Full stat
- .github/workflows/afw-finite-budget-qualification.yml: +121/-23, statusmodified
- docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md: +1104/-0, statusmodified
- test/fixtures/finite-budget-world.mjs: +302/-23, statusmodified
- test/fixtures/finite-owner-cleanup-persistence.mjs: +3/-3, statusmodified
- test/fixtures/finite-owner-cleanup.mjs: +2/-1, statusmodified

## Complete validated U10 fix diff
Each GitHubU3 patch was matched against FULLbefore/after file lines, hunkcounts, tails and coverage, then context-expanded toU10. No hunk/commit/path elided. Fullappend report included. Unchanged authorized2files require no second review.
### .github/workflows/afw-finite-budget-qualification.yml

`````diff
diff --git a/.github/workflows/afw-finite-budget-qualification.yml b/.github/workflows/afw-finite-budget-qualification.yml
# before_blob=c72e31919d477280c9eef39b63ca46708acb82e7 after_blob=f7a71f1a0fa4f5ddf069ff411f008a098455e5cc
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -51,55 +51,50 @@
           npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-locked-install.log" 2>&1 || { echo locked_install_failed; exit 1; }
       - name: Check fixed fixture syntax, lint, inactive module and eight contracts
         id: pure_test
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           test "$(node -v)" = v22.23.4
           test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
-          files=(test/fixtures/finite-budget-world.mjs test/fixtures/finite-owner-cleanup.mjs test/mcp-qa-finite-budget-native.test.mjs test/fixtures/finite-initial-entry-world.mjs)
+          files=(test/fixtures/finite-budget-world.mjs test/fixtures/finite-owner-cleanup.mjs test/mcp-qa-finite-budget-native.test.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-cleanup-persistence.mjs)
           for file in "${files[@]}"; do node --check "$file" >>"$RUNNER_TEMP/afw-pure-private/syntax.log" 2>&1 || { echo syntax_failed; exit 1; }; done
           npx --no-install eslint "${files[@]}" >"$RUNNER_TEMP/afw-pure-private/lint.log" 2>&1 || { echo lint_failed; exit 1; }
           test ! -e output/finite-budget
           env -u AFW_BUDGET_GROUP node --test --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-pure-private/inactive.tap" 2>&1 || { echo inactive_load_failed; exit 1; }
           test ! -e output/finite-budget && test ! -e output/t2-native-graphs
           if AFW_BUDGET_GROUP=invalid-fixed-group node --test --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-pure-private/invalid.tap" 2>&1; then echo invalid_group_accepted; exit 1; fi
           test ! -e output/finite-budget && test ! -e output/t2-native-graphs
           mkdir -p output/finite-budget/pure
-          printf 'focused lint passed\n' > output/finite-budget/pure/lint.log
           node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs >"$RUNNER_TEMP/afw-pure-private/tests.tap" 2>&1 || { echo pure_contract_failed; exit 1; }
           node --input-type=module <<'NODE'
-          import assert from 'node:assert/strict';import {readFileSync,writeFileSync,copyFileSync} from 'node:fs';import {join} from 'node:path';
+          import assert from 'node:assert/strict';import {readFileSync,writeFileSync} from 'node:fs';import {join} from 'node:path';
           const root=join(process.env.RUNNER_TEMP,'afw-pure-private'),dest='output/finite-budget/pure';
           function counts(file,expected){const text=readFileSync(join(root,file),'utf8'),actual={};for(const [name,value]of Object.entries(expected)){const matches=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(matches.length,1);actual[name]=Number(matches[0][1]);assert.equal(actual[name],value);}return actual;}
           const business=counts('tests.tap',{tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0});
           const inactive=counts('inactive.tap',{tests:1,pass:1,fail:0,cancelled:0,skipped:0,todo:0});
           assert(readFileSync(join(root,'invalid.tap'),'utf8').includes('SYN budget group unsupported before I0'));
-          for(const file of ['tests.tap','inactive.tap'])copyFileSync(join(root,file),join(dest,file));
-          writeFileSync(join(dest,'tests.log'),'AFW_PURE '+JSON.stringify(business)+'\n');
+          writeFileSync(join(dest,'q-counts.json'),JSON.stringify(business));
           writeFileSync(join(dest,'inactive.json'),JSON.stringify({fileWrapper:inactive,businessCases:0,I0Opened:false,invalidGroupRejected:true}));
           console.log('AFW_PURE '+JSON.stringify(business));console.log('inactive_file_wrapper_verified 1 business_cases 0 invalid_group_rejected');
           NODE
       - name: Execute all fixed preparation controls once without I0
         id: controls
         if: steps.pure_test.outcome == 'success'
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           result=0
-          AFW_BUDGET_CONTROL_PHASE=green env -u AFW_BUDGET_GROUP node test/fixtures/finite-budget-world.mjs verify-native-preparation-round1 >"$RUNNER_TEMP/afw-pure-private/controls.log" 2>&1 || result=$?
-          cp output/finite-budget/round1-controls/result.json output/finite-budget/pure/controls.json
-          test ! -f output/finite-budget/round1-controls/progress.json || cp output/finite-budget/round1-controls/progress.json output/finite-budget/pure/control-progress.json
-          for family in readonly reduction; do test ! -f "output/finite-budget/round1-controls/utility-$family.json" || cp "output/finite-budget/round1-controls/utility-$family.json" "output/finite-budget/pure/utility-$family.json"; done
+          AFW_BUDGET_CONTROL_PHASE=green env -u AFW_BUDGET_GROUP node --experimental-vm-modules test/fixtures/finite-budget-world.mjs verify-native-preparation-round1 >"$RUNNER_TEMP/afw-pure-private/controls.log" 2>&1 || result=$?
           printf 'exit=%s\n' "$result" >>"$GITHUB_OUTPUT"
           test "$result" = 0
       - name: Strict three-profile preflight with safe failure DTO
         id: preflight
         if: always() && !cancelled() && steps.pure_test.outcome == 'success'
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-pure-private/preflight.log" 2>&1
@@ -118,37 +113,134 @@
           const bytes=Buffer.from(JSON.stringify(result,null,2));if(bytes.length>65536)throw Error('safe_diagnostic_limit');
           await writeFile(root+'/diagnostics.json',bytes);
           await writeFile(root+'/diagnostic-manifest.json',JSON.stringify({purpose:'afw.fixed-budget-pure-diagnostic-manifest.syn.v1',source:result.source,run:result.run,attempt:1,files:[{path:'diagnostics.json',bytes:bytes.length,sha256:hash(bytes)}]}));
           await writeFile(process.env.GITHUB_OUTPUT,'all-passed='+result.allPassed+'\n',{flag:'a'});
           NODE
       - name: Seal a closed pure evidence directory
         id: pure_seal
         if: always() && !cancelled() && steps.scope.outcome == 'success'
         env:
           PURE_COMPLETE: ${{ steps.pure_test.outcome == 'success' && steps.controls.outcome == 'success' && steps.preflight.outputs.all-passed == 'true' }}
+          PURE_TEST_OUTCOME: ${{ steps.pure_test.outcome }}
+          CONTROLS_OUTCOME: ${{ steps.controls.outcome }}
+          PREFLIGHT_OUTCOME: ${{ steps.preflight.outcome }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE'
-          import assert from 'node:assert/strict';import {mkdir,readdir,writeFile,lstat,copyFile} from 'node:fs/promises';import {join} from 'node:path';
-          import {sealBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
-          try{
-           const dest=join(process.env.RUNNER_TEMP,'afw-pure-public');await mkdir(dest,{mode:0o700});
-           for(const name of ['tests.tap','inactive.tap']){try{await copyFile(join(process.env.RUNNER_TEMP,'afw-pure-private',name),join(dest,name));}catch(error){if(error.code!=='ENOENT')throw error;}}
-           for(const name of ['syntax.log','lint.log','tests.tap','inactive.tap']){try{const path=join(process.env.RUNNER_TEMP,'afw-pure-private',name),st=await lstat(path);assert(st.size<=1048576);await copyFile(path,join(dest,name));}catch(error){if(error.code!=='ENOENT')throw error;}}
-           const safeNames=["syntax.log","control-progress.json","controls.json","utility-readonly.json","utility-reduction.json","tests.log","tests.tap","inactive.tap","inactive.json","lint.log","preflight.json","preflight-positive.json","preflight-readonly.json","preflight-reduction_a.json","diagnostics.json","diagnostic-manifest.json"];
-           for(const name of safeNames){const file=join('output/finite-budget/pure',name);let st;try{st=await lstat(file);}catch(error){if(error.code==='ENOENT')continue;throw error;}assert(st.isFile()&&st.nlink===1);await copyFile(file,join(dest,name));}
-           await writeFile(join(dest,'status.json'),JSON.stringify({status:process.env.PURE_COMPLETE==='true'?'pure_passed':'pure_failed',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT}));
-           await sealBudgetArtifact(dest,'pure');
-           const names=await readdir(dest);assert(names.every(name=>[...safeNames,'budget-artifact.json','status.json'].includes(name)));
-          }catch{console.log('evidence_not_preserved');process.exitCode=1;}
+          import assert from 'node:assert/strict';
+          import {readFile,writeFile,mkdir,readdir,lstat} from 'node:fs/promises';
+          import {createHash} from 'node:crypto';
+          import {join} from 'node:path';
+          // AFW_CLOSED_PURE_SEALER_V2: standard Node only, also executed by fixed sandbox controls.
+          const sha=bytes=>createHash('sha256').update(bytes).digest('hex'),N=value=>assert(Number.isSafeInteger(value)&&value>=0&&value<=Number.MAX_SAFE_INTEGER),H=value=>assert(typeof value==='string'&&/^[a-f0-9]{64}$/.test(value)),B=value=>assert(typeof value==='boolean');
+          function object(value,keys){assert(value&&typeof value==='object'&&!Array.isArray(value));assert.deepEqual(Object.keys(value).sort(),keys.slice().sort());}
+          function same(value,expected){assert.deepEqual(value,expected);}
+          function numbers(value,keys){object(value,keys);for(const item of Object.values(value))N(item);}
+          function arr(value,max,visit){assert(Array.isArray(value)&&value.length<=max);value.forEach(visit);}
+          function identity(value){same(value.source,process.env.GITHUB_SHA);same(value.run,process.env.GITHUB_RUN_ID);assert(value.attempt===1||value.attempt==='1');}
+          function flags(value){for(const key of ['I0Opened','nativeExecutionProduced','operationalReadiness','completePackage','PCoff'])same(value[key],false);}
+          function digest(bytes){return {bytes:bytes.length,sha256:sha(bytes)};}
+          const descriptorBytes=await readFile('test/fixtures/finite-budget-descriptors.json'),descriptorBlob=createHash('sha1').update('blob '+descriptorBytes.length+'\0').update(descriptorBytes).digest('hex');same(descriptorBlob,'be695028e4c12c3cb7d3b7bf2c5f2e7508f3db15');const descriptors=JSON.parse(descriptorBytes);
+          function counts(value){numbers(value,['nativeCalls','identityEdges','bodyEdges','facadeEdges','scopeEdges','guardEdges']);}
+          const countKeys=['childBlocks','work','wait','selectReadonly','selectReduction','queueReadonly','queueReduction','capReadonlyList','capReadonlyGet','capReductionList','capReductionDelete','send','sdk'];
+          function additional(value,path){
+           const adapter=path==='<stdin>';
+           if(adapter){
+            object(value,['purpose','family','baselineBytes','baselineSha256','literalBytes','literalSha256','emittedBytes','emittedSha256','methods','operationInventory','nativeInputAndAckObservationsSeparate','businessAuthority','originalEntryBytes','originalEntrySha256']);
+            same(value.purpose,'afw.fixed-syn-prototype-adapter.v1');assert(['readonly','reduction'].includes(value.family));same(value.methods,['finiteBudgetReadonly','finiteBudgetReduction','finiteBudgetSignals','finiteBudgetRelease','finiteBudgetRestore']);
+            same(value.operationInventory,{'Reflect.apply(':23,'Object.defineProperty(':1,'Object.defineProperties(':1,'Promise.allSettled(':1,'new WeakMap(':3});same(value.nativeInputAndAckObservationsSeparate,true);same(value.originalEntryBytes,64800);same(value.originalEntrySha256,'89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257');N(value.literalBytes);H(value.literalSha256);
+           }else{
+            assert(['lib/mcp-qa-finite-owner-cleanup.mjs','lib/mcp-qa-finite-initial-lease.mjs'].includes(path));const cleanup=path.includes('owner-cleanup');
+            object(value,['purpose','baselineBytes','baselineSha256','emittedBytes','emittedSha256','primaryBlocks','counts','queueKinds','fields','businessAuthority',...(cleanup?['sdkDeclarationProvenance']:[])]);
+            same(value.purpose,'afw.fixed-syn-passive-observations.v2');same(value.primaryBlocks,cleanup?11:1);numbers(value.counts,countKeys);
+            same(value.counts,cleanup?{childBlocks:1,work:1,wait:1,selectReadonly:1,selectReduction:1,queueReadonly:1,queueReduction:1,capReadonlyList:1,capReadonlyGet:1,capReductionList:1,capReductionDelete:1,send:1,sdk:1}:{childBlocks:1,work:1,wait:1,selectReadonly:0,selectReduction:0,queueReadonly:0,queueReduction:0,capReadonlyList:0,capReadonlyGet:0,capReductionList:0,capReductionDelete:0,send:0,sdk:0});
+            same(value.queueKinds,cleanup?[{family:1,statementKind:'variable',originalCheckAdjacent:true,originalReceiver:'alias',originalArgs:'q.args'},{family:2,statementKind:'return',originalCheckAdjacent:true,originalReceiver:'alias',originalArgs:'q.args'}]:[]);
+            same(value.fields,['opaque-alias','child-ordinal','family','deadline','status','counter','limit','queue-length','active','time','send-record-hash']);
+            if(cleanup){
+             const proof=value.sdkDeclarationProvenance;object(proof,['original','protectedModuleBlob','originalStatementSha256']);same(proof.protectedModuleBlob,'1a5a2583d266179cdd89f799c64199f29044fec5');same(proof.originalStatementSha256,sha('const actual=retain(api.revokeGrant(selector,i.subject));'));
+             object(proof.original,['sites','sameNameReceivers','receiver','method','args','adjacency']);same(proof.original,{sites:1,sameNameReceivers:['api','store'],receiver:'api',method:'revokeGrant',args:['selector','i.subject'],adjacency:['const-actual-retain-api','await-actual','check','bounded-facts']});
+            }
+           }
+           for(const key of ['baselineBytes','emittedBytes'])N(value[key]);for(const key of ['baselineSha256','emittedSha256'])H(value[key]);same(value.businessAuthority,false);
+           if(adapter){same(value.baselineBytes,106772);same(value.baselineSha256,'f5458d1d7f94665c8b02915972c95614b3a3bd2125d6d6a89ef6bea737c999ec');}
+          }
+          function expectedInventory(role){
+           assert(['M','QA'].includes(role));const expected=new Set([...descriptors.sourceDescriptors,...descriptors.packages,...descriptors.implementationSupplement.scopeInputPins].filter(row=>row.roles.includes(role)).map(row=>row.path));if(role==='QA')expected.add('<stdin>');return [...expected];
+          }
+          function verifyExpectedInventory(records,role){same(records.map(record=>record.path).sort(),expectedInventory(role).sort());}
+          function preflight(value,group){
+           object(value,['purpose','group','additionalSYN','source','run','attempt','inputs','I0Opened','nativeExecutionProduced','operationalReadiness','completePackage','PCoff','observerChronology']);identity(value);flags(value);same(value.purpose,'afw.finite-budget-preflight.syn.v1');same(value.group,group);same(value.observerChronology,'afw.finite-budget-chronology.syn.v2');object(value.inputs,['M','QA']);
+           for(const role of ['M','QA']){
+            const expected=expectedInventory(role);
+            arr(value.inputs[role],512,record=>{
+             object(record,['role','path','rawBytes','rawSha256','preparedBytes','preparedSha256','emittedBytes','emittedSha256','counts','selectors','readerSites',...(record.additionalSYN?['additionalSYN']:[])]);
+             same(record.role,role);assert(expected.includes(record.path));for(const key of ['rawBytes','preparedBytes','emittedBytes'])N(record[key]);for(const key of ['rawSha256','preparedSha256','emittedSha256'])H(record[key]);counts(record.counts);
+             const source=descriptors.sourceDescriptors.find(row=>row.path===record.path),pkg=descriptors.packages.find(row=>row.path===record.path),pin=descriptors.implementationSupplement.scopeInputPins.find(row=>row.path===record.path);
+             if(source){same(record.rawBytes,source.rawBytes);same(record.rawSha256,source.rawSha256);same(record.selectors,source.selectors.map((row,selector)=>({selector,count:row.expectedCount})));}
+             else if(pkg){same(record.rawBytes,pkg.bytes);same(record.rawSha256,pkg.sha256);same(record.selectors,pkg.selectors);}
+             else if(pin){same(record.rawBytes,pin.rawBytes);same(record.rawSha256,pin.rawSha256);same(record.selectors,[]);}
+             else same(record.selectors,{reflect:descriptors.entry.reflectSelectors,members:descriptors.implementationSupplement.entryNativeMembers,extras:descriptors.implementationSupplement.entryAdditionalCounts});
+             arr(record.readerSites,256,site=>{object(site,['id','role','path','selector','occurrence','preparedLine','preparedColumn']);same(site.role,role);same(site.path,record.path);for(const key of ['id','occurrence','preparedLine','preparedColumn'])N(site[key]);assert(Number.isSafeInteger(site.selector)||site.selector==='readerFactory');});
+             if(record.additionalSYN){assert(role==='QA'&&group!=='positive');additional(record.additionalSYN,record.path);}
+            });
+            verifyExpectedInventory(value.inputs[role],role);
+           }
+           same(value.additionalSYN,value.inputs.QA.filter(row=>row.additionalSYN).map(row=>({path:row.path,...row.additionalSYN})));same(value.additionalSYN.length,group==='positive'?0:3);
+          }
+          function qcounts(value,expected){object(value,['tests','pass','fail','cancelled','skipped','todo']);numbers(value,Object.keys(value));if(expected!==null)same(value,{tests:expected,pass:expected,fail:0,cancelled:0,skipped:0,todo:0});}
+          function errorDTO(value){
+           if(value===null)return;
+           object(value,['name','nativeError','code','operator','actual','expected','message']);assert(['Error','AssertionError','TypeError','SyntaxError','RangeError','other'].includes(value.name));B(value.nativeError);assert(['ERR_ASSERTION','ERR_MODULE_NOT_FOUND','ERR_INVALID_ARG_TYPE','ERR_SCRIPT_EXECUTION_TIMEOUT','ERR_UNKNOWN_FILE_EXTENSION','ERR_REQUIRE_ESM','absent','other'].includes(value.code));assert(['==','===','strictEqual','deepStrictEqual','match','ok','throws','rejects','absent','other'].includes(value.operator));
+           for(const key of ['actual','expected']){const data=value[key];if(data===null||typeof data==='boolean'||typeof data==='number'){assert(data===null||typeof data!=='number'||Number.isFinite(data));continue;}assert(data&&typeof data==='object');assert(['undefined','object','function','symbol','bigint','string','sha256','fixed_counts'].includes(data.type));if(data.type==='string'){object(data,['type','bytes','sha256']);N(data.bytes);H(data.sha256);}else if(data.type==='sha256'){object(data,['type','value']);H(data.value);}else if(data.type==='fixed_counts'){object(data,['type','counts']);numbers(data.counts,countKeys);}else object(data,['type']);}
+           const message=value.message;if(Object.hasOwn(message,'sha256')){object(message,['bytes','sha256','publicLabel']);N(message.bytes);H(message.sha256);assert(typeof message.publicLabel==='string'&&message.publicLabel.length<256);}else{object(message,['type']);assert(['undefined','string','object'].includes(message.type));}
+          }
+          function safeError(value){errorDTO(value);if(value===null)return null;const result={...value,message:{...value.message}};if(Object.hasOwn(result.message,'publicLabel')){result.message.publicLabelSha256=sha(result.message.publicLabel);delete result.message.publicLabel;}return result;}
+          async function sealClosedPure(){
+           const dest=join(process.env.RUNNER_TEMP,'afw-pure-public');await mkdir(dest,{mode:0o700});same(await readdir(dest),[]);const files=[],observations=[],validationFailures=[];
+           const put=async(name,value)=>{const bytes=Buffer.from(JSON.stringify(value,null,2));assert(bytes.length<=2097152);await writeFile(join(dest,name),bytes);files.push({path:name,...digest(bytes)});};
+           const read=async path=>{const st=await lstat(path);assert(st.isFile()&&st.nlink===1&&st.size<=2097152);const bytes=await readFile(path);same(bytes.length,st.size);return bytes;};
+           const checked=async(name,validate)=>{let bytes;try{bytes=await read('output/finite-budget/pure/'+name);}catch(error){if(error.code==='ENOENT')return null;throw error;}try{const value=JSON.parse(bytes);validate(value);return value;}catch(error){validationFailures.push({file:name,input:digest(bytes),error:{name:['SyntaxError','AssertionError'].includes(error.name)?error.name:'other'}});return null;}};
+           // Raw materials are measured only. Neither names nor bytes are copied into public files.
+           for(const name of ['syntax.log','lint.log','tests.tap','inactive.tap','invalid.tap','controls.log','preflight.log']){
+            try{const bytes=await read(join(process.env.RUNNER_TEMP,'afw-pure-private',name));observations.push({file:name,...digest(bytes)});}catch(error){if(error.code!=='ENOENT')throw error;}
+           }
+           const q=await checked('q-counts.json',value=>qcounts(value,8));if(q)await put('q-counts.json',q);
+           const inactive=await checked('inactive.json',value=>{object(value,['fileWrapper','businessCases','I0Opened','invalidGroupRejected']);qcounts(value.fileWrapper,1);same(value.businessCases,0);same(value.I0Opened,false);same(value.invalidGroupRejected,true);});if(inactive)await put('inactive.json',inactive);
+           const control=await checked('controls.json',value=>{
+            object(value,['purpose','source','run','attempt','groups','passed','I0Opened','nativeExecutionProduced','businessCases']);identity(value);same(value.purpose,'afw.closed-pure-controls.syn.v2');same(value.I0Opened,false);same(value.nativeExecutionProduced,false);same(value.businessCases,0);B(value.passed);
+            arr(value.groups,8,group=>{object(group,['group','passed','caseCount','evidence','error']);assert(['F1','F2','F3','F4','F5','F6','F7','F8'].includes(group.group));B(group.passed);N(group.caseCount);object(group.evidence,['bytes','sha256']);N(group.evidence.bytes);H(group.evidence.sha256);errorDTO(group.error);});
+            same(new Set(value.groups.map(group=>group.group)).size,value.groups.length);same(value.passed,value.groups.length===8&&value.groups.every(group=>group.passed));
+           });if(control)await put('controls.json',{...control,groups:control.groups.map(group=>({...group,error:safeError(group.error)}))});
+           const failureDiagnostics=await checked('diagnostics.json',value=>{
+            object(value,['purpose','source','tree','run','attempt','profiles','allPassed','I0Opened','nativeExecutionProduced','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified']);identity(value);flags(value);same(value.purpose,'afw.fixed-budget-pure-diagnostic.syn.v1');assert(/^[a-f0-9]{40}$/.test(value.tree));same(value.globalNativeDrainVerified,false);same(value.sdkNamespaceEmptyVerified,false);B(value.allPassed);
+            arr(value.profiles,3,profile=>{
+             assert(['positive','readonly','reduction_a'].includes(profile.profile));B(profile.passed);
+             if(profile.passed){object(profile,['profile','stage','passed','I0Opened','nativeExecutionProduced','additionalSYNCount','additionalSYN']);same(profile.stage,'complete');same(profile.I0Opened,false);same(profile.nativeExecutionProduced,false);N(profile.additionalSYNCount);arr(profile.additionalSYN,3,row=>{object(row,['path','family','sites','sdkSettlementSites','baselineBytes','baselineSha256','literalBytes','literalSha256','emittedBytes','emittedSha256']);assert(['<stdin>','lib/mcp-qa-finite-owner-cleanup.mjs','lib/mcp-qa-finite-initial-lease.mjs'].includes(row.path));assert([null,'readonly','reduction'].includes(row.family));for(const key of ['sites','sdkSettlementSites','literalBytes'])assert(row[key]===null||Number.isSafeInteger(row[key])&&row[key]>=0);for(const key of ['baselineBytes','emittedBytes'])N(row[key]);for(const key of ['baselineSha256','emittedSha256'])H(row[key]);if(row.literalSha256!==null)H(row.literalSha256);});}
+             else{object(profile,['profile','stage','passed','error']);assert(['import','preflight'].includes(profile.stage));const error=profile.error;object(error,['name','code','operator','actual','expected','message']);errorDTO({...error,nativeError:false});}
+            });same(new Set(value.profiles.map(profile=>profile.profile)).size,value.profiles.length);same(value.allPassed,value.profiles.length===3&&value.profiles.every(profile=>profile.passed));
+           });
+           const profiles=[];for(const group of ['positive','readonly','reduction_a']){
+            const name='preflight-'+group+'.json',value=await checked(name,value=>preflight(value,group));
+            if(value){await put(name,value);if(group==='positive')await put('preflight.json',value);profiles.push({profile:group,stage:'complete',passed:true,I0Opened:false,nativeExecutionProduced:false,additionalSYNCount:value.additionalSYN.length});}
+            else{const failed=failureDiagnostics?.profiles.find(profile=>profile.profile===group&&!profile.passed);profiles.push({profile:group,stage:failed?.stage??'missing_or_invalid',passed:false,I0Opened:false,nativeExecutionProduced:false,additionalSYNCount:null,error:failed?safeError({...failed.error,nativeError:false}):null});}
+           }
+           const complete=process.env.PURE_COMPLETE==='true'&&q!==null&&inactive!==null&&control?.passed===true&&profiles.every(profile=>profile.passed)&&validationFailures.length===0;
+           const outcomes=Object.fromEntries(['PURE_TEST_OUTCOME','CONTROLS_OUTCOME','PREFLIGHT_OUTCOME'].map(key=>{const value=process.env[key]??'skipped';assert(['success','failure','cancelled','skipped'].includes(value));return [key,value];}));
+           const common={source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT};
+           await put('diagnostics.json',{purpose:'afw.closed-pure-diagnostic.syn.v2',...common,profiles,allPassed:profiles.every(profile=>profile.passed),I0Opened:false,nativeExecutionProduced:false});
+           await put('status.json',{purpose:'afw.closed-pure-status.syn.v2',...common,status:complete?'pure_passed':'pure_failed',rawPureRetention:'runner_only_until_runner_cleanup',outcomes,rawObservations:observations,validationFailures,I0Opened:false,nativeExecutionProduced:false});
+           await put('budget-artifact.json',{purpose:'afw.finite-budget-artifact.syn.v1',...common,kind:'pure',files:files.slice().sort((a,b)=>a.path.localeCompare(b.path)),operationalReadiness:false,completePackage:false,PCoff:false});
+           return {complete,validationFailures:validationFailures.length,files:await readdir(dest)};
+          }
+          try{const result=await sealClosedPure();if(process.env.PURE_COMPLETE==='true'&&!result.complete)process.exitCode=1;}catch{console.log('closed_pure_evidence_not_preserved');process.exitCode=1;}
           NODE
       - name: Upload finite-budget-pure only
         id: upload
         if: always() && !cancelled() && steps.pure_seal.outcome == 'success'
         uses: actions/upload-artifact@v4
         with:
           name: finite-budget-fixed-preparation-${{ github.sha }}
           path: ${{ runner.temp }}/afw-pure-public/
           if-no-files-found: error
           retention-days: 7
@@ -209,38 +301,44 @@
         env:
           ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
           DOWNLOADED: ${{ steps.pure_receipt_1.outcome == 'success' || steps.pure_receipt_2.outcome == 'success' || steps.pure_receipt_3.outcome == 'success' }}
           READBACK: ${{ runner.temp }}/afw-pure-receipt
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           test -n "$ARTIFACT_ID"
           test "$DOWNLOADED" = true || { echo evidence_not_preserved; exit 1; }
-          if ! node --input-type=module -e "import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs'; await verifyBudgetArtifact(process.env.READBACK,'pure',process.env.ARTIFACT_ID);" >"$RUNNER_TEMP/afw-pure-private/readback.log" 2>&1; then echo evidence_not_preserved; exit 1; fi
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {readFile,readdir,lstat} from 'node:fs/promises';import {createHash} from 'node:crypto';import {join} from 'node:path';
+          const root=process.env.READBACK,bytes=await readFile(join(root,'budget-artifact.json')),manifest=JSON.parse(bytes),sha=bytes=>createHash('sha256').update(bytes).digest('hex');assert(/^[1-9][0-9]*$/.test(process.env.ARTIFACT_ID));assert.equal(manifest.source,process.env.GITHUB_SHA);assert.equal(manifest.run,process.env.GITHUB_RUN_ID);assert.equal(manifest.attempt,process.env.GITHUB_RUN_ATTEMPT);assert.equal(manifest.kind,'pure');assert.equal(manifest.purpose,'afw.finite-budget-artifact.syn.v1');for(const key of ['operationalReadiness','completePackage','PCoff'])assert.equal(manifest[key],false);
+          const files=[];for(const path of (await readdir(root)).sort()){assert(/^[a-z0-9_-]+\.json$/.test(path));const st=await lstat(join(root,path));assert(st.isFile()&&st.nlink===1);if(path!=='budget-artifact.json'){const value=await readFile(join(root,path));files.push({path,bytes:value.length,sha256:sha(value)});}}assert.deepEqual(files,manifest.files);
+          console.log('BUDGET SAME ID READBACK VERIFIED '+JSON.stringify({artifactId:process.env.ARTIFACT_ID,files:files.length+1,source:manifest.source,run:manifest.run,attempt:manifest.attempt,manifestBytes:bytes.length,manifestSha256:sha(bytes)}));
+          NODE
           if ! cmp -s "$RUNNER_TEMP/afw-pure-public/budget-artifact.json" "$READBACK/budget-artifact.json"; then echo evidence_not_preserved; exit 1; fi
           printf 'pure_verified artifact_id=%s\n' "$ARTIFACT_ID"
       - name: Print verified closed profile diagnostic
         if: always() && !cancelled() && steps.pure_verified.outcome == 'success'
         shell: bash
         run: |
           node --input-type=module <<'NODE'
           import {readFile} from 'node:fs/promises';for(const name of ['controls.json','diagnostics.json']){try{const raw=await readFile(process.env.RUNNER_TEMP+'/afw-pure-receipt/'+name,'utf8');if(Buffer.byteLength(raw)>65536)throw Error('safe_diagnostic_limit');console.log(name+' '+raw);}catch(error){if(error.code!=='ENOENT')throw error;}}
           NODE
       - name: Require all covering profiles and retained readback
         if: always() && !cancelled()
         shell: bash
         run: |
           test '${{ steps.pure_test.outcome }}' = success
           test '${{ steps.controls.outcome }}' = success
           test '${{ steps.preflight.outputs.all-passed }}' = true
           test '${{ steps.pure_verified.outcome }}' = success
+          test '${{ steps.pure_seal.outcome }}' = success
   positive_prepare:
     if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
     needs: [contracts]
     runs-on: ubuntu-24.04
     timeout-minutes: 15
     environment: afw-finite-syn-checkpoint
     outputs:
       artifact-id: ${{ steps.upload.outputs.artifact-id }}
       artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
       kind: ${{ steps.seal.outputs.kind }}
@@ -1331,21 +1429,21 @@
            const paths=execFileSync('unzip',['-Z1',zip],{encoding:'utf8'}).trim().split('\n');assert(paths.every(path=>/^[A-Za-z0-9_.-]+$/.test(path)));assert.equal(new Set(paths).size,paths.length);
            if(kind!=='pure')assert.deepEqual([...paths].sort(),['envelope.bin','manifest.json','receipt.json']);
            const listing=execFileSync('unzip',['-l',zip],{encoding:'utf8'}).trim().split('\n').at(-1),totals=/^\s*(\d+)\s+(\d+)\s+files?\s*$/.exec(listing);assert(totals&&Number(totals[1])<=134283264&&Number(totals[2])===paths.length,'bounded exact zip inventory before extraction');
            await mkdir(directory,{mode:0o700});execFileSync('unzip',['-q',zip,'-d',directory]);
            if(kind==='pure')await verifyBudgetArtifact(directory,'pure',String(artifact.id));
            else await openDirectory({stagingDir:directory,destinationDir:output,context:{purpose:'afw.finite-checkpoint-custody.syn.v1',repository:repo,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind}});
            receipts.push({artifactId:String(artifact.id),digest:artifact.digest,name,kind});return {directory:kind==='pure'?directory:output,artifact};
           }
           const pure=await download('finite-budget-fixed-preparation-'+e.GITHUB_SHA,'pure');
           const counts=async file=>{const value=JSON.parse(await readFile(file,'utf8'));assert.equal(value.fail,0);assert.equal(value.cancelled,0);assert.equal(value.skipped,0);assert.equal(value.todo,0);assert.equal(value.tests,value.pass);return value;};
-          const pureTap=await readFile(pure.directory+'/tests.tap','utf8');assert(/^# tests 8$/m.test(pureTap)&&/^# pass 8$/m.test(pureTap));
+          const pureCounts=JSON.parse(await readFile(pure.directory+'/q-counts.json','utf8'));assert.deepEqual(pureCounts,{tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0});
           const pureDiagnostic=JSON.parse(await readFile(pure.directory+'/diagnostics.json','utf8'));assert.equal(pureDiagnostic.allPassed,true);assert(pureDiagnostic.profiles.every(profile=>profile.I0Opened===false&&profile.nativeExecutionProduced===false));assert.equal(pureDiagnostic.profiles.find(p=>p.profile==='positive').additionalSYNCount,0);
           for(const cfg of fixed){
            const proof=await download('finite-budget-'+cfg.job+'-'+e.GITHUB_SHA+'-'+e.GITHUB_RUN_ID,cfg.kind),manifest=JSON.parse(await readFile(proof.directory+'/job-manifest.json','utf8'));
            validateFixedBudgetJobManifest(manifest,{job:cfg.job,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),artifactId:String(proof.artifact.id),digest:proof.artifact.digest.slice(7),context:{purpose:'afw.finite-checkpoint-custody.syn.v1',repository:repo,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:cfg.kind}});
            opened.set(cfg.job,{...proof,manifest});
           }
           const positive=opened.get('positive_consume'),readonly=opened.get('readonly'),a=opened.get('reduction_consume_a'),producer=opened.get('reduction_prepare');
           assert.equal((await counts(positive.directory+'/business-counts.json')).pass,1);assert.equal((await counts(readonly.directory+'/business-counts.json')).pass,3);assert.equal((await counts(a.directory+'/business-counts.json')).pass,2);assert.equal((await counts(e.RUNNER_TEMP+'/afw-native-private/business-counts.json')).pass,2);
           const reductionCheckpoint=JSON.parse(await readFile(producer.directory+'/output/finite-budget/checkpoint/native/checkpoint.json','utf8')),positiveCheckpoint=JSON.parse(await readFile(opened.get('positive_prepare').directory+'/output/finite-budget/checkpoint/checkpoint.json','utf8'));
           const readResult=async(directory,group,name)=>JSON.parse(await readFile(directory+'/output/finite-budget/'+group+'/'+name+'/full-result.json','utf8'));

`````

### docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md

`````diff
diff --git a/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md
# before_blob=5f51286988613889c4981082c825e3f7a7063361 after_blob=901479df4f9c11de3f681bac5671e881e6d62d69
--- a/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md
+++ b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md
@@ -314,10 +314,1114 @@
 
 Artefacto13929972887, nombre finite-budget-fixed-preparation-c61d38bce88baf5edcdf70e5a878600e44f3c40e,ZIP118162 bytes, SHA2561cc0d45097ea1e4a1376ac8bb232929baf328152d7df8417f3dd0caab5be4313, expires2026-11-19T09:16:50Z. Primer retrieval informó IDs no encontrados; la segunda recuperación DEL MISMO ID después de2s pasó. Esto es recuperación acotada de evidencia, no rerun del job/tests. Digest ZIP e inventario/manifiesto path-bytes-SHA exactos PASS; DTO controls/diagnostics completos leídos de log primario, counts/source/run/attempt corresponden. No descarga extra de artefactos al PC.
 
 Wiring final reconciliado desde borradorinert67486c24... +contrato puro actual: SIETE jobs contracts/positive_prepare/positive_consume/reduction_prepare/reduction_consume_a/readonly/reduction_consume_b. workflow_dispatch solamente, sininputs, TODOSliterallyfalse; tiempos2/15/15/15/15/7/15min. No activación/cron/push. Contracts ejecutará controles separados y perfiles antesdecualquierI0 deunfuturorunautorizado. Los seis nativejobs conservan sólo el ambiente/keycustodyexistente, límites2MF/job/3nativejobs/6MFglobal,NoCore/SDK/persistencealgorithmchange.
 F6 fullinneridentitypinned inclpurpose/repository/ref/source/tree/run/attempt/job/role/group/lane/kind/cases/commandSucceeded yAAD+ID/digest antesdemount ypeeraggregate:3producerinputs+1aggregatevalidator callsites. B permanece needs[contracts,readonly,reduction_prepare], sin A/P; resuelve sus resultados por same-run unique metadataID/digest y autentica inneridentity despuésdenative/dispose. No octavojob.
 F7 collector usa presupuesto15min−120sheadroom y120queriesmáximo; wiringrecalculatimeoutANTESdecadafetchmetadata secuencial ypreserva attemptedPeerQueries/completedPeerQueries/actualMetadataRequests+recordsphase/query/invocation/outcome/status/times/remaining,inclrequestfallidoantescompleted-row. Ningún refreshC0/C1. M2 verifica5ocurrenciasreales+10M/QAmountrecords; no requierehashes/timestampsúnicos; cuatroDcompartenlineageexacto. B sólo captura otros6terminal+Bselfinprogress/observedtime; requiereRootpost-runreadbackparacerrar7terminales/intervalos, sin endfuturofabricado.
 
 Validación estática inactiva:7jobs/7false/manual/noinputs/nopush;32heredocsNodeparseadossin ejecución; needs/roles/kinds/cases/lanes/mappedprofiles revisados; código world que pasó GREEN queda idéntico. Bytecomparison del transformBudgetPreparedSource protegido, bloqueP1 deltest yliteralWorkerentry original exacta; custodia14/persistence/rawlib/SDK/eightpurefile no cambios. Árbol completo3190leaves/3184otrosblobs+modos protegidos exactos; únicassixpathsformales modificadas. Mainleído0c9c475b3ebaa970fc11d628b40e50a90cceb727, no escritoporunidad. SourceCASnoforce/contenidos/readbacks alhand-off.
 
 **Preparación de código/pure-control/wiring INACTIVO terminada, pendiente SAME-reviewer scope3590f42f3c58d2c14f176230081c402c6b97bf93..final y cierreO4.** El wiring nativo NO fue ejecutado; noaporta16businessPASS,900sclock,Rootgenuino/SDKbehavior/drenajeprod. Native16/I0/MF/producers/RD/P1 siguenHELD hasta release separada deRoot trasre-review limpio+O4terminal/inactivo. operationalReadiness/completePackage/PCoff/globalNativeDrainVerified/sdkNamespaceEmptyVerified false. **STOP_WRITES/NO_NEW_JOBS tras finalreadbacks.**
+
+
+## Formal fix round2/5 — controles causales RED antes de corrección
+
+FIX_BASEd9b7ea752466ee6c5865b1529aeed28072a085ff/treef5f5a676415a5b92894e966d8876c9c8367beee2; review61bd0cbf dejóF2/F5/F8 abiertos y cincohallazgoscerrados. PhaseA f39595a8 y rulingPhaseB2f03afc37e2f132892939decb075cfc5d2d6ab2a @a2fe8bd9f0d6e6fd2a172bcfdf01f8019a865ec6 autorizan siete rutas/3183protegidas, no Native16/I0. Sólo se agregan regresiones/CLI fija en world, TEMPpuro y append reporte para este RED; ningún fix de comportamiento/veredicto/disposer/sealer se aplica todavía. Task1/custodia14/noO4jobs no se repiten.
+
+Comando único autorizado cloudNode22.23.4/Ubuntu24.04/lock: env -u AFW_BUDGET_GROUP node --experimental-vm-modules test/fixtures/finite-budget-world.mjs verify-round2-red, job≤2min. Sin MF, SDK real, Root, I0, clock900s, key ni APIs externas. Source queda congelado hasta terminal/artefacto/readbacks. Se esperan tres déficits observados, no failures por métodos faltantes/imports. No Q8/perfiles/custodia/broadnative en este RED.
+
+F2 usa el observer actual y facets originales ya extraídos por el compilador fijo. En VM inerte crea6getsfijos,2native/ACKholds/cola actual y MISMOchild. Las promesas modeladas producen ordinary workRejected→waitRejected con MISMOError→finallyabort, deadline datum ya pasado y padre vivo. Verifica exactamente ese orden/identidad antes de invocar el ACTUAL fixedChildDeadlineProof sin modificarlo. Déficit esperado: acepta denialAfterDeadline=true pese a workPendingAtAbort=false/mismoError/closeposterior. No se crea Root genuino ni se presenta el datum modelado como timer5s real.
+F5 extrae por AST la ÚNICA continuación exacta protegida de produceCheckpoint e317f58205b062adb6223a4dd5647b65e9c860b4: awaitf.mf.dispose→flagdisposedForCheckpoint→mkdir→cpstate, conserva bytes y ejecuta ese fragmento con f/MF/copy inertes. Normal arm primero; rejection arm último porque poison prohíbe nueva asignación. Mismo owned wrapper real, originaldisposer D rechaza una vez; se observa si su await outward resuelve y permite flag/copy. El copy es únicamente witnessinerto, no copia ninguna DB incierta. Se preservan nativefileSYN/uncertainty/outerErroridéntico/sinarchive. Los hooks de primary/unwind y sus controles completos quedan para el release posterior de fixes/GREEN, no RED fabricado por funciones inexistentes.
+F8 incluye literal EXACTO del Node body del step 'Seal a closed pure evidence directory' de workflowc72e31919d477280c9eef39b63ca46708acb82e7, líneas133–144,1831caracteres. Se ejecuta ESEbody vía SourceTextModule y linker cerrado de4imports; fsreal redirige sólo el sourcepathfijo a inputprivado y exige todos los destinos bajo RUNNER_TEMP/afw-round2-private/f8-sandbox. Se usa el ACTUAL sealBudgetArtifact unchanged. Cuatro logsSYN diminutos contienen canary/source/stack/assertion sólo en ese sandbox. El destino 'afw-pure-public' del sealer viejo está DENTROdelprivado y no coincide con el uploader real. Déficit esperado: cuatroarchivosconcanarycopiados pese a statuspure_failed; únicamente conteos/hash/sandboxbools salen al DTO. No reemplazo del algoritmo del sealer ni runner arbitrario.
+
+El uploader RED es NUEVO/INDEPENDIENTE, no usa el sealer inseguro. Publica EXACTAMENTE result.json+manifest.json, con schema cerrado/proyección de bool/counts/enums/hash/bytes/source-run-attempt y límites32KiB. No syntax/lint/TAP/Source/canary/rawError/stack ni log privado en artefacto. Fallo de import/setup produce closednot_entered +exit/loghash, sin inventar causa. Logs/rawsandbox quedan sólo runner-private y se pierden al retirarjob/runner, sin afirmar7d privada ni ampliar key/env/kind. Artefacto2JSON siete días, recuperación por MISMO ID con tresretrievalsmáximo(2s/5s) y manifest/inventory exactos. Nunca se sube output/ ni el sandboxprivado. Validación/preservación no convierte un déficit/setup en GREEN; el job conserva failureactual.
+
+Antes del publish: programa world+2Nodeheredocs revisados sintácticamente sin ejecución, literalbodyviejo comparado byteexact contra lectura primaria, uploaderpath único2JSON separado. Baselinecomplete7manualfalsec72e3191 preservado para rollback, NOecabe. Se verificará árbol3190/3183protected/CAS/noforce/contenidos/ref. Al concluir RED válido O inesperado se restaura EXACTOc72e31919d477280c9eef39b63ca46708acb82e7, appendfacts y STOP para primarycausalgateRoot. Ningún fix/GREEN/nuevojob hasta release explícito.
+
+
+### Round2 causal RED válido — restore completo y STOP
+
+[Run43211521905/1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43211521905), job131160054215, Source3b80befe98fad6be0d57a2afab02251db1049130/treecba0acf94ed985a895bd81fd8d5568cb576205f8/world77b49d1b/TEMPf95c2c9e: FAILURE **causal esperado**, CLIexit1/expectedCausalRed=true. Los tres grupos completaron sin error de setup; no se atribuye fallo por función/import/fixture ausente.
+
+F2: ACTUAL proof devolvió acceptedDeadline=true con workStatus=waitStatus=rejected, MISMOError=true, workPendingAtAbort=false, orden observado work→wait→abort. Dos native/ACKholds y cola real del facet actual se conservaron, genuineBusinessRoot=false. El defecto de clasificación se reprodujo con datos de orden ordinario/finally; no se presenta como timer5s genuino.
+F5: normal originalDispose1/outwardfulfilled/flagtrue/copy1/copiedAfterDispose=true/copyWhileUncertain=false/disposedtrue/archiveverified. Rejection: originalDrechazó1vez, outwardFULFILLED, flagtrue/copy1, copiedAfterDispose=false/copyWhileUncertain=true, disposedfalse/disposalUncertaintrue/archivedfalse/sourceRetainedtrue/outerError===D. Fue la continuación EXACTA await→flag→mkdir→cp protegida; cp era witnessinerto, no una copia de DB incierta real. Muestra que el fallo exterior posterior no impide esa continuación.
+F8: cuerpo ACTUAL delsealerbaselinec72e3191/SHA2562dcc743642af1202b799974bf729f7e4fd22279a5db94cb66044826db1e52c66 ejecutado sólo enprivado. Cuatrologs/4concanary llegaron a su destino sandbox pese a statuspure_failed. Nunca se usó ese destino para upload real; no salió canary/rawSource/stack/TAP/log por el artefacto RED.
+
+Artefacto13941287378, nombre finite-budget-round2-red-3b80befe98fad6be0d57a2afab02251db1049130,ZIP1275 bytes/SHA2563769b35663d9437500f89228f2a3452ef413f8c2959ff649ec2e6a68ffec874a, expires2026-11-19T11:43:22Z, no expirado al leer. Upload2JSON, segunda recuperación DEL MISMO ID tras primerartifact-not-found, digest/inventario/manifiesto completos PASS. No rerun de test/job. JSON primario leído completo: actualExit1/expectedCausalRedtrue/tresstagecomplete/erroresnull; privatecommand204bytes sólo SHA256938fb55375ac9ab1c73ca9a461e178be332d93695dd7a1029d4b1aa67f91e589/hashComplete=true. Artefacto contiene EXACTAMENTE result.json+manifest.json, sin Source/log/TAP/canary. Rawmaterial privado sólo vida del runner/job; no se afirma7d privada ni se habilita key.
+
+Se restaura EXACTAMENTE el workflowcompleto7manualfalsec72e31919d477280c9eef39b63ca46708acb82e7 (NOecabe); reporteappend y readbacks. El código existente de clasificación/disposer/publicsealer sigue sin corregir, protegido antes del bloque de regresiones, y los nuevos hooks no se implementaron. No GREEN, nuevo job, Native16, MF/I0/Root/SDK/clock900s. Root revisará esta evidencia causal primaria antes del siguiente release. F1/F3/F4/F6/F7 no se rerun ni se declaran nuevamente calificados; Task1/custodia intactos.
+
+Árbol3190/protected3183blobsmodes exactos, SourceCASnoforce/contenidos/ref ymainreadback al cierre; readiness/package/PCoff/globaldrain/SDKemptyfalse. **STOP_WRITES/NO_NEW_JOBS después de rollbackTEMP/reporte/readbacks**, tanto por causalRED válido como se exigía. Esperar gate primario deRoot; no resolver ni refreshpin por inferencia.
+
+
+## Round2 GREEN implementation checkpoint — UNQUALIFIED_DRAFT
+
+Root release 4b646625 / supplemental 5d9acc75; implementation start 686a8235, formal reviewed FIX_BASE d9b7ea75. This checkpoint preserves current RAM work before final self-review. NO GREEN candidate, job, MF or I0 has executed. Workflow remains complete seven jobs, manual-only, literal seven false. Source scope remains seven existing paths; protected 3183 leaves unchanged.
+
+Draft F2 conservative existing-facts classifier separates deadline race, ordinary SAME-error work propagation, finally-close, and indeterminate/missing observations. Original twelve SYN blocks and all raw/SDK/entry pins remain unchanged. Draft F5 outward await of owned disposal rejects SAME original disposer Error; budget-only Node primary notes in actual producer/recovery/callback/evidence unwind preserve E/F/A before D, retain ancillary identity/phase facts, and keep uncertainty poison. Seven fixed Node child controls use actual CURRENT AST producer continuation/catch/finally/recovery and actual CURRENT cleanup arrow with inert bindings/files; no MF/I0. Draft F8 removes both raw TAP copies/raw-file allowlists; actual standard-Node inline sealer validates closed JSON, measures private logs by byte count/hash, retains complete schema-validated compiler preflight, emits Q8 JSON and closed control evidence; aggregate uses Q8 JSON. Adversarial controls execute current exact workflow sealer in private fixed sandbox. Raw pure logs remain runner-private only until runner cleanup; no new secret/custody permissions.
+
+This is recoverable UNQUALIFIED source, pending final static self-review and the single already-authorized <=2min pure covering gate. No completion, correctness, native readiness or execution entitlement is implied. If that gate fails, restore EXACT baseline c72e3191 complete seven manual false, preserve closed actual evidence and STOP. If it passes, reconcile fixed sealer complete seven manual false and read back full scope/ref/tree for Root's same-reviewer gate. Native16 remains HELD.
+
+
+## Round2 single pure covering candidate — freeze pending terminal evidence
+
+This candidate applies Root GREEN release4b646625 and approved producer_evidence addendum5d9acc75. It is the only authorized covering attempt, <=2min; only contracts is runnable, all six native jobs remain literal false. No MF/I0/business execution. Source frozen through terminal and assigned same-ID artifact readbacks.
+
+Static self-review: persistence source reconstructs EXACT e317f582 after removing only the three approved budget-only catch-note insertions/import addition; cleanup fixture reconstructs EXACT cda4ab10 after removing only its Node import and callback catch-note. Original twelve SYN observation blocks and adapter/compiler emission are byte-identical to FIX_BASE. Current Node cleanup callback is AST-extracted from2f5dad6c, closed bindings f/budgetQualification/noteFixedBudgetOwnedFailure; no old callback provenance claimed. Seven fixed child processes preserve poison per fresh Node isolate, fixed case enum, <=8s child timeout/no retries; no MF constructors. F2 covers abort→wait→work, abort→different work rejection→wait, ordinary SAME-error propagation after deadline, SAME-error race, fulfilled-guard ambiguity, finally-close, missing and duplicate observation order. F5 covers actual current original awaitdispose→flag→copy and catch/finally/recovery/actual callback orders; normal, D, E+D, F+D, E+F+D, recoveryE+D, callbackA+D+independentB. F8 executes the current exact inline standard-Node sealer in a private fixed sandbox against syntax/lint/TAP/source/stack/assertion canaries, unknown fields and unknown strings; no actual uploader receives canaries.
+
+Covering commands: node --check and scoped eslint on amended Node fixtures/native test; explicitly-unset-group single native-file wrapper + invalid-group rejection before output/I0; unchanged Q8 diagnostics tests exact8/8 with fail/cancel/skip/todo0; verify-native-preparation-round1 now collects F1–F8 in one bounded pass, independent three compile profiles positive/readonly/reduction_a. No custody/fullnative/broad suite rerun. Pure raw syntax/lint/TAP/full control trace retained runner-private until runner cleanup only. Public artifact is schema-validated closed JSON, full validated compiler preflights, closed group counts/hash/status/failureDTO; raw logs measured by numeric bytes/SHA only. Both old TAP copies/raw file allowlists removed. Aggregate consumes closed q-counts.json. Failure publisher has no import of possibly broken world module, independent standard-Node same-ID manifest verification.
+
+Source/ref/tree/3183 protected proof and actual run/job/artifact/retention facts will be appended after terminal, not anticipated here. Allpass requires reconciliation to complete seven manual-only/allfalse with FIXED sealer. Any failure requires EXACT c72e3191 restoration + closed proof + STOP; no automatic repair/retry. Native16 remains HELD.
+
+
+## Round2 single GREEN covering FAILURE — preserved and STOP
+
+Source7fc9e302de7423ea13de207915092e1f2230fdbe / treebcbc37cfe9ff5de97bcf852615e771ca47718afb / world41be914c5c2133e6f25104ed63cd58047c7fbf0e / TEMP053ebded58145111dc2f3e84d4effc881695fe9b. Exactly ONE actual run43215549201 / attempt1 / contracts job131173738873; created12:10:50Z, job12:10:52..12:11:17Z, run terminal FAILURE12:11:18Z on2026-11-12. The six native jobs are terminal SKIPPED. No MF, I0 or Native16 opened.
+
+Actual gate facts: checkout exactSHA, Node22.23.4 and locked install succeeded. All five amended fixture/test node --check invocations returned before scoped eslint emitted closed literal lint_failed at12:11:11Z; pure_test exited1. Actual ESLint rule/location/diagnostic text is UNKNOWN: full lint.log was intentionally runner-private, not emitted publicly and not retained seven days. Do NOT infer a rule or business defect from the stage label/hash/absence. Inactive/invalid/Q8 were not reached; F1–F8 controls and all three preflight profiles were SKIPPED. None is claimed GREEN for this candidate. The earlier RED acceptance remains historical; no regression/control rerun or Source repair follows this failure without a new Root ruling.
+
+Failure publication succeeded despite the failing gate. Artifact13943496963, name finite-budget-fixed-preparation-7fc9e302de7423ea13de207915092e1f2230fdbe, ZIP1438B, SHA2568e3a0f0920a20686f243f4229e8194f74d82a6c9724708bfe569e4907c15c576; created2026-11-12T12:11:13Z, expires2026-11-19T12:11:12Z, expiredfalse. First assigned exact-ID download SUCCEEDED, digest matched; retrieval2/3 were SKIPPED. Independent standard-Node full same-ID downloaded inventory and local manifest byte comparison SUCCEEDED, three files total; manifest559B/SHA25676bc9bcdcbd107169c563b7aff02e52b08df5f4da12537a1971cd89ead282240. Readback verified source/run/attempt/kind and every path/bytes/hash; no world import was needed. No duplicate connector artifact download was performed by this implementer. Public sealer permits closed JSON only and no raw syntax/lint/TAP/source/stack/canary bytes. Raw pure material retention limit remains runner-only until runner cleanup, honestly distinct from native encrypted custody. Schema-valid compiler/control records are absent because those phases never executed, not evidence of a successful phase.
+
+Authorized failure closure restores EXACT baseline COMPLETE seven-job workflow blobc72e31919d477280c9eef39b63ca46708acb82e7: manual-only, no inputs/push, all seven literalfalse. This restores the historical unsafe sealer INACTIVE exactly as required; it is not a qualified fixed publication workflow and must not be activated. Latest unqualified FIXED-sealer seven-job draft remains recoverable from candidate TEMP053ebded (change only header to workflow_dispatch and contracts literalfalse), and earlier inactive draft324f3378 remains in checkpoint0d8632f1. All implementation changes remain preserved but UNQUALIFIED. Root must decide the next focused gate. Formal reviewer FIX_BASE staysd9b7ea75; implementation history686a→0d8632→7fc9 is preserved, no squashing or pin refresh.
+
+No automatic fix, retry, new job, custody rerun, Native16 activation or readiness claim. Final closure ref/tree/report/full3190-leaf/3183-protected proof and closureSHA0runs will be supplied by primary readback after this append. STOP.
+
+
+## Formal round2 — ONE focused structured lint diagnostic candidate
+
+Root release afce378aa19868609c57a2e972eb64e90dcc77cb @b4cd57a42b410d9afb178c3e031254fd1098e2d1. No lint fix or test retry. Exact failed/current five fixture inputs remain unchanged: world41be914c / cleanup2f5dad6c / native-test533dafb5 / initial-entry-worlda7b730dc / persistencee0dda1fd. Diagnostic changes only TEMP and this append; all other3183 protected leaves and all code fixtures unchanged.
+
+Single attempt1 job <=2min, Ubuntu24.04/Node22.23.4, same lock/install flags. Only locked npx --no-install eslint on the failed candidate's fixed five literal files with --format json; no --fix, tests, SDK, MF, I0 or native methods. Raw lint JSON/stderr/install logs remain private until runner cleanup, never printed/uploaded. Independent standard-Node TEMP validator verifies exact five Git blobs, bounds raw JSON2MiB/messages256/closed output128KiB, rejects unknown files/structural keys/invalid coordinates or counts using fixed closed reasons, and emits only fixed context, command exit, counts, predeclared relative file/ruleId/coordinates/severity/fatal plus message byte-count/SHA. Missing coordinates are explicitnull. Nonpublic known ESLint auxiliary fields source/fix/suggestions/deprecations stay private; none is promoted. No unqualified-world import, key or newSource path.
+
+Artifact exact two filenames result.json and manifest.json; purposes afw.round2-lint-diagnostic.safe.v1 and afw.round2-lint-diagnostic-manifest.safe.v1. Independent assigned same-ID complete inventory/context/hash/local byte-equality readback precedes safe DTO logging. A valid diagnostic with findings records actual ESLint nonzero without claiming code fixed; malformed/incomplete diagnostic remains failed. After the one run, restore EXACTc72e3191 COMPLETE7/manual/noinputs/nopush/allfalse, append actual facts/readbacks/zeroactive and STOP. No lint fixes/covering/native activation authorized by this diagnostic. Formal FIX_BASEd9b7 remains.
+
+
+## Focused lint diagnostic terminal proof and exact inactive restoration
+
+ONE diagnostic run43218146435/attempt1/Sourcee40feceb66af157354fe6ea8247822f1d325bfa7/treeb7bb949021fdb899678548ccc8bd31229ed3798d; job131182553508 terminal SUCCESS. Run created2026-11-12T12:28:06Z, terminalupdated2026-11-12T12:28:40Z; job2026-11-12T12:28:09Z..2026-11-12T12:28:40Z. This success means diagnostic/evidence completion only. Actual ESLint command exited1; code remains failing/unqualified. No project tests/SDK/MF/I0/Native16 executed, no lint fix or retry.
+
+Actual safe DTO purpose afw.round2-lint-diagnostic.safe.v1: status lint_findings / reason none, exact five pinned files, four severity2 errors, zero warnings/fatal/fixable. All four findings are @next/next/no-assign-module-variable in test/fixtures/finite-budget-world.mjs blob41be914c5c2133e6f25104ed63cd58047c7fbf0e: line1710 col99 through line1710 col267; line1711 col2 through line1711 col114; line1844 col351 through line1844 col516; line1845 col3 through line1845 col100. All fatalfalse, each message103B/SHA25660c60f0ae07706b888bb26566290520af6db9879b3f35baff98d838a577d1326. Other four fixed files report zero errors. No raw message/source/stack was emitted or retained publicly; raw JSON/stderr remain runner-private only until cleanup. Exact filename/rule/coordinates are evidence, not an implemented fix.
+
+Artifact13945435031, finite-budget-round2-lint-e40feceb66af157354fe6ea8247822f1d325bfa7, ZIP1399B/SHA2565dbfa0fb4eef852eec2aa79b9d0bf459ca669837fba23dceb0da52a854c35140; expires2026-11-19T12:28:36Z. Exact two JSON filenames: result.json / manifest.json; purposes afw.round2-lint-diagnostic.safe.v1 / afw.round2-lint-diagnostic-manifest.safe.v1. First assigned same-ID download SUCCEEDED and actual uploaded/downloaded digest matched; retries2/3 SKIPPED. Independent full two-file inventory/context/manifest SHA and local byte equality SUCCEEDED before closed DTO log. No duplicate connector download needed. Same-ID artifact/readback does not qualify F1–F8/Q8/profiles or Native16.
+
+Full actual safe DTO, copied from verified closed log (never raw lint JSON):
+
+```json
+{
+  "purpose": "afw.round2-lint-diagnostic.safe.v1",
+  "repository": "tokenizartinfo-ops/agent-friendly-web",
+  "ref": "refs/heads/feat/finite-native-cleanup-20261101",
+  "source": "e40feceb66af157354fe6ea8247822f1d325bfa7",
+  "run": "43218146435",
+  "attempt": 1,
+  "node": "22.23.4",
+  "inputs": [
+    {
+      "file": "test/fixtures/finite-budget-world.mjs",
+      "blob": "41be914c5c2133e6f25104ed63cd58047c7fbf0e"
+    },
+    {
+      "file": "test/fixtures/finite-owner-cleanup.mjs",
+      "blob": "2f5dad6c306fac1be2f11845bef640bb204ad572"
+    },
+    {
+      "file": "test/mcp-qa-finite-budget-native.test.mjs",
+      "blob": "533dafb5df5f8e57442c5b9029dc8dec6dded434"
+    },
+    {
+      "file": "test/fixtures/finite-initial-entry-world.mjs",
+      "blob": "a7b730dc9be336528f0971544099f79d05758b1a"
+    },
+    {
+      "file": "test/fixtures/finite-owner-cleanup-persistence.mjs",
+      "blob": "e0dda1fd3d66c1864fd0b20f873c7fc0c452f6d8"
+    }
+  ],
+  "commandExit": 1,
+  "status": "lint_findings",
+  "reason": "none",
+  "counts": {
+    "files": 5,
+    "messages": 4,
+    "errors": 4,
+    "warnings": 0,
+    "fatal": 0,
+    "fixableErrors": 0,
+    "fixableWarnings": 0
+  },
+  "fileCounts": [
+    {
+      "file": "test/fixtures/finite-budget-world.mjs",
+      "errors": 4,
+      "warnings": 0,
+      "fatal": 0,
+      "fixableErrors": 0,
+      "fixableWarnings": 0
+    },
+    {
+      "file": "test/fixtures/finite-initial-entry-world.mjs",
+      "errors": 0,
+      "warnings": 0,
+      "fatal": 0,
+      "fixableErrors": 0,
+      "fixableWarnings": 0
+    },
+    {
+      "file": "test/fixtures/finite-owner-cleanup-persistence.mjs",
+      "errors": 0,
+      "warnings": 0,
+      "fatal": 0,
+      "fixableErrors": 0,
+      "fixableWarnings": 0
+    },
+    {
+      "file": "test/fixtures/finite-owner-cleanup.mjs",
+      "errors": 0,
+      "warnings": 0,
+      "fatal": 0,
+      "fixableErrors": 0,
+      "fixableWarnings": 0
+    },
+    {
+      "file": "test/mcp-qa-finite-budget-native.test.mjs",
+      "errors": 0,
+      "warnings": 0,
+      "fatal": 0,
+      "fixableErrors": 0,
+      "fixableWarnings": 0
+    }
+  ],
+  "entries": [
+    {
+      "file": "test/fixtures/finite-budget-world.mjs",
+      "ruleId": "@next/next/no-assign-module-variable",
+      "line": 1710,
+      "column": 99,
+      "endLine": 1710,
+      "endColumn": 267,
+      "severity": 2,
+      "fatal": false,
+      "message": {
+        "bytes": 103,
+        "sha256": "60c60f0ae07706b888bb26566290520af6db9879b3f35baff98d838a577d1326"
+      }
+    },
+    {
+      "file": "test/fixtures/finite-budget-world.mjs",
+      "ruleId": "@next/next/no-assign-module-variable",
+      "line": 1711,
+      "column": 2,
+      "endLine": 1711,
+      "endColumn": 114,
+      "severity": 2,
+      "fatal": false,
+      "message": {
+        "bytes": 103,
+        "sha256": "60c60f0ae07706b888bb26566290520af6db9879b3f35baff98d838a577d1326"
+      }
+    },
+    {
+      "file": "test/fixtures/finite-budget-world.mjs",
+      "ruleId": "@next/next/no-assign-module-variable",
+      "line": 1844,
+      "column": 351,
+      "endLine": 1844,
+      "endColumn": 516,
+      "severity": 2,
+      "fatal": false,
+      "message": {
+        "bytes": 103,
+        "sha256": "60c60f0ae07706b888bb26566290520af6db9879b3f35baff98d838a577d1326"
+      }
+    },
+    {
+      "file": "test/fixtures/finite-budget-world.mjs",
+      "ruleId": "@next/next/no-assign-module-variable",
+      "line": 1845,
+      "column": 3,
+      "endLine": 1845,
+      "endColumn": 100,
+      "severity": 2,
+      "fatal": false,
+      "message": {
+        "bytes": 103,
+        "sha256": "60c60f0ae07706b888bb26566290520af6db9879b3f35baff98d838a577d1326"
+      }
+    }
+  ],
+  "rawRetention": "runner_only_until_runner_cleanup",
+  "I0Opened": false,
+  "nativeExecutionProduced": false,
+  "businessCases": 0,
+  "operationalReadiness": false,
+  "completePackage": false,
+  "PCoff": false
+}
+```
+
+Closure restores EXACTc72e31919d477280c9eef39b63ca46708acb82e7 complete seven-job workflow/manual-only/noinputs/nopush/all7false, no code fixes. All five failed fixture blobs stay exact and formal FIX_BASEd9b7 unchanged. Ref/tree/report and full3190/3183protected/zeroactive closure readbacks follow. STOP pending a separate Root ruling; no covering rerun or new diagnostic is authorized by this result.
+
+
+## Round2 minimal lint binding repair and ONE fresh full covering candidate
+
+Root release206d88364057a3b8961fde8b0d4bf83fcb34ca0d @648fdee49c3c35fb55ce9a95e8b8519261e5129f; implementation starts exact9b01fe6a closure. Minimal world-only repair renames four local VM bindings and exact references: legacy SyntheticModule local→legacySynthetic; legacy SourceTextModule local→legacySealerProgram; current SyntheticModule local→currentSynthetic; current SourceTextModule local→currentSealerProgram. Six exact replacement blocks; reversing those names/references reconstructs failed world41be914c byte-for-byte. String literals, historical old-sealer source, AST extraction, imports, errors, Promise/control flow, production/SDK/raw pins and all other code remain exact. No ESLint suppression/config/dependency change. Static grammar parsing only; no local project tests.
+
+Reuse exact latest fixed-sealer workflow053ebded from7fc9, unchanged: one contracts job <=2min/Node22.23.4/keyless, six native jobs literalfalse, full complete graph preserved. Sole new covering entitlement executes same fixed5 syntax/lint, inactive wrapper1/business0/no output, invalid-group pre-I0, unchanged Q8exact8/8 fail/cancel/skip/todo0, F1–F8 current controls including F2 causal order/F5 actual producer/evidence/recovery/callback unroll/F8 exact current sealer adversarial sandbox, and three strict positive/readonly/reduction_a compile profiles. No MF/business Root/I0/Native16. Full schema-valid preflights retained; raw pure logs runner-private only; fixed closed sealer and independent exact-ID inventory proof.
+
+Candidate Source freezes through actual terminal/readbacks. No skipped prior phase is qualified by history. Any failure preserves actual closed proof and restores EXACTc72 COMPLETE7/manual/allfalse/report/STOP without repair/retry. Allpass reconciles COMPLETE7 with FIXED sealer/manual/noinputs/nopush/allfalse and full wiring/readbacks; no Native16 release. Formal FIX_BASEd9b7 stays and full history retained for same reviewer. Actual run/job/artifact facts will be appended only after observed terminal.
+
+
+## Round2 renamed-binding covering FAILURE — exact safe evidence and STOP
+
+Sole authorized fresh covering run43218944283/attempt1/Source2f79c17c1eba7b30bf4d7b9d199165a9574d2899/treec41622fb60b4b1024d7be56a47d65d19c5f0157b, worlda66dedef192dcff4cbf55c1cbb9786afe8d468b1, TEMPexact053ebded. Contracts131185233664 terminalFAILURE; job2026-11-12T12:33:17Z..2026-11-12T12:33:56Z, runupdated2026-11-12T12:33:57Z. Six native jobs terminalSKIPPED; no MF/I0/business Root/Native16.
+
+Actual initial gate PASS: five node --check + scoped lint, inactive unset-group wrapper1/pass1/business0/nooutput, invalid-group rejected beforeoutput/I0, unchanged Q8exact8/pass8/fail0/cancelled0/skipped0/todo0. Controls command FAIL: closed groupsF1–F7passed, F8failed. This proves execution of those pure groups, not native/business coverage. F8 pure error safeDTO below; no raw message/source/stack retained publicly. Cause/location UNKNOWN from this DTO alone. Private full control records/trace retain only runner lifetime; public group evidence hash/bytes preserved as released. No repair/rerun follows failure.
+
+Strict3profile command step SUCCESS, but fixed public validator rejected all three actual preflight files with AssertionError; no individual validator location was recorded. Preflight qualification UNKNOWN, never claim compiled profiles complete from stepSUCCESS. Actual rejected-file bytes/SHA preserved in status.validationFailures below. Public diagnostics deliberately reports missing_or_invalid. All subsequent pure sealer/upload/readback steps succeeded; final require-covering gate FAILs.
+
+Artifact13945235907, finite-budget-fixed-preparation-2f79c17c1eba7b30bf4d7b9d199165a9574d2899, ZIP3415B/SHA2568d5c6711162276f7401d13f9dbbdb9f4713e2c9e056667741015d3487ad101f4; expires2026-11-19T12:33:49Z. First assigned same-ID retrieval actually NOTFOUND (continue-on-error step conclusion alone is misleading); after2s retrieval2 SUCCEEDED, retrieval3SKIPPED. Uploaded/downloaded digest matched; independent six-file inventory/context/manifest and local manifest byte equality SUCCEEDED. Manifest1001B/SHAd768c2fcdd9c5b55338d989175c70a665be7d8de4b2f2247302957fb58ee33b3. One tiny connector ZIP read in RAM only verified exact3415B/digest and actual sixJSON names/status facts at Root request; no files/project execution/raw material.
+
+Exact public inventory and validation failures (safe artifact fields only):
+
+```json
+{
+  "inventory": [
+    {
+      "name": "budget-artifact.json",
+      "bytes": 1001,
+      "sha256": "d768c2fcdd9c5b55338d989175c70a665be7d8de4b2f2247302957fb58ee33b3"
+    },
+    {
+      "name": "diagnostics.json",
+      "bytes": 915,
+      "sha256": "b6b480cce9545c77d0af6c80eda9af7a3d087e3271eff9cbbc2bb46466e5e6a7"
+    },
+    {
+      "name": "controls.json",
+      "bytes": 2621,
+      "sha256": "77429d814591f28e041ce54030769a907477bf4381e650023613479aefdd882f"
+    },
+    {
+      "name": "inactive.json",
+      "bytes": 199,
+      "sha256": "b45cfb6f89a79a1f15b842a71fff8b2003b8812ee5dd41e4a578d9037376b12c"
+    },
+    {
+      "name": "q-counts.json",
+      "bytes": 89,
+      "sha256": "a194a9895da45c53381b398c277e252ab18778d338ae51331a5800121510c6ae"
+    },
+    {
+      "name": "status.json",
+      "bytes": 2230,
+      "sha256": "732f32b015bd80e06ee3ad2afa61c29a981708e8f6ed97fc745fc0f28e3aa238"
+    }
+  ],
+  "validationFailures": [
+    {
+      "file": "preflight-positive.json",
+      "input": {
+        "bytes": 201677,
+        "sha256": "688b22b0da4638815bcefc6b423bfdf019690e1fdea3bb359aeff39a065c85e1"
+      },
+      "error": {
+        "name": "AssertionError"
+      }
+    },
+    {
+      "file": "preflight-readonly.json",
+      "input": {
+        "bytes": 210747,
+        "sha256": "527d2c6b6d243356b5cc8668e432952cad0cb0127d10faf1ccee79aee2f23be5"
+      },
+      "error": {
+        "name": "AssertionError"
+      }
+    },
+    {
+      "file": "preflight-reduction_a.json",
+      "input": {
+        "bytes": 210752,
+        "sha256": "23eef93783e0dd61c0bb6defcb83a0d7fb4c1db12a87bfa61ff8281f9650b0a5"
+      },
+      "error": {
+        "name": "AssertionError"
+      }
+    }
+  ]
+}
+```
+
+Exact closed controls result (safe projection only):
+
+```json
+{
+  "purpose": "afw.closed-pure-controls.syn.v2",
+  "source": "2f79c17c1eba7b30bf4d7b9d199165a9574d2899",
+  "run": "43218944283",
+  "attempt": "1",
+  "groups": [
+    {
+      "group": "F1",
+      "passed": true,
+      "caseCount": 2,
+      "evidence": {
+        "bytes": 904,
+        "sha256": "dcae1ea26b1b09c6f2eacc5fd66701bdb3c61d2ccd431281b3c5325827b0909f"
+      },
+      "error": null
+    },
+    {
+      "group": "F2",
+      "passed": true,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 3332,
+        "sha256": "dac450adc2e8566f01427d907b835f22a7e64301654f58a58cd9ef5557d12a21"
+      },
+      "error": null
+    },
+    {
+      "group": "F3",
+      "passed": true,
+      "caseCount": 4,
+      "evidence": {
+        "bytes": 5431,
+        "sha256": "195edd3960c3b9128194f2a06d95072fc6b1d54af09c3cdb50050de597c817a5"
+      },
+      "error": null
+    },
+    {
+      "group": "F4",
+      "passed": true,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 2528,
+        "sha256": "fde2eea49ef543f0d36347cda87d7035f10657716cc6cd418bff1fb4548bb33b"
+      },
+      "error": null
+    },
+    {
+      "group": "F5",
+      "passed": true,
+      "caseCount": 3,
+      "evidence": {
+        "bytes": 16098,
+        "sha256": "3f0739f932e0de2cb06b9023b99307bd7787508cfd53ac7847027c759a11a398"
+      },
+      "error": null
+    },
+    {
+      "group": "F6",
+      "passed": true,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 218,
+        "sha256": "0cf03851592354cf957c3248d37b1585d924dfc009b79704db924a8145070e5a"
+      },
+      "error": null
+    },
+    {
+      "group": "F7",
+      "passed": true,
+      "caseCount": 4,
+      "evidence": {
+        "bytes": 599,
+        "sha256": "7362a7cc15236bd1958794837bccc943ebf5ea87ef2f3db7c06b8d6382c08036"
+      },
+      "error": null
+    },
+    {
+      "group": "F8",
+      "passed": false,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 400,
+        "sha256": "92b22223f5e533d2802253a6c2223046609837aff4d9f319358af93cf77f35b3"
+      },
+      "error": {
+        "name": "other",
+        "nativeError": true,
+        "code": "absent",
+        "operator": "absent",
+        "actual": {
+          "type": "undefined"
+        },
+        "expected": {
+          "type": "undefined"
+        },
+        "message": {
+          "bytes": 19,
+          "sha256": "f64827765de7c62a07813e3df64f2a0dd123ffc205a014cfd41c8a916f1a256b",
+          "publicLabelSha256": "915c0f60e80855f6455a521d4d3df9e7a5f9c78452335b3deb332dbff239b594"
+        }
+      }
+    }
+  ],
+  "passed": false,
+  "I0Opened": false,
+  "nativeExecutionProduced": false,
+  "businessCases": 0
+}
+```
+
+Pure raw logs/TAP/stdout/stderr and rejected preflight bytes remain runner-private until runner cleanup, not seven-day encrypted-native custody. Public raw materials absent; only closed count/status/hash/error DTO and valid safe JSON published. Independent evidence completeness does not turn this failed covering GREEN.
+
+Failure closure restores EXACTbaselinec72e31919d477280c9eef39b63ca46708acb82e7 COMPLETE7/manual/noinputs/nopush/all7false. Historical unsafe sealer restored INACTIVE as required, not qualified foractivation. Latest fixed-sealer full7draft still exact053ebded recoverable from candidate, no completionclaim. Code/worlda66dedef and all F2/F5/F8 implementation preserved UNQUALIFIED, no further changes. Formal FIX_BASEd9b7 unchanged for later same review. Full ref/tree/3190leaves/3183protected/currentworld/closure0runs/branch0active readback follows this append. STOP; Root may inspect read-only and must rule separately before any Source repair, diagnostic, covering or native clock.
+
+
+## Round2 proven framing/inventory fixes — ONE fresh covering candidate
+
+Root release3d786776215f4f2d96d567e450bcfbb7804f7f3e @42b8881df596d53e82cc1810065cc8829515cb01; implementation starts exactad244d8c. Fixed only CURRENT sealer frame extraction and descriptor expected-inventory Set union, with focused current-path controls. Source twelve observer/adapter compiler bytes/raw/SDK/clock pins unchanged; four lint local-binding renames preserved; no other fixture/code/config changes.
+
+Private fixedCurrentSealerProgram validates one exact sealer heading/next-upload heading/opening/closing frame, closing newlineOR EOF, strict interior indentation, complete original interior lines, no trailing content/bare NODE and current marker identity. Actual current sandbox receives exact interior program. Focused framing controls compare EOF/newline interior equality, reject missing/duplicate/malformed closing and missing/duplicate opening. No dynamic imports/targets/exports/authority.
+
+CURRENT inline sealer expectedInventory builds SAME Set union as compiler from pinned descriptor roles and QA stdin once. Actual preflight still validates rawhashes/bytes/counts/selector/readers/additionalSYN/full schemas and exact inventory; verifyExpectedInventory compares ACTUAL array against unique expected paths, so actual duplicates, unknown and missing records fail. Focused fixed QA regression appended only inside private sandbox to SAME current module lexical helpers: pinned category overlap2 produces uniqueQA115/M61; valid record inventory accepted; duplicate/unknown/missing ACTUAL mutations all rejected. No copy of inventory algorithm. Reversing exactly helper/Set edits reconstructs prior053ebded workflow. No validator/pin relaxation or truncation. Previous first actual rejected profile assertion remains UNKNOWN; static duplicate defect was proven separately.
+
+After self-review one fresh attempt1 <=2min full covering: same5 syntax/lint; inactive1/business0/invalid pre-I0; Q8exact8; allF1–F8 including new current-frame/inventory and canary cases; three strict compile profiles positive/readonly/reduction_a with FULL validated outputs. Only contracts runnable/six nativefalse. No MF/SDKbusiness/I0/Native16/secrets. Public fixed JSON only; private raw runner lifetime. Source frozen through terminal/same-ID fullinventory proof. Failure exactc72/manual7false/report/STOP; allpass COMPLETE7latestFIXEDsealer/manual7false/currentwiring/readbacks/report/STOP. No automatic repair/retry/newdiagnostic. Formal FIX_BASEd9b7 and all history retained.
+
+
+## Round2 two-fix covering terminal FAILURE — valid full preflight evidence, F8 remains open
+
+ONE run43220608996/attempt1/Source306188a8c432506f3c334aad70c936bed04b8a0f/tree01698defdb0ce51d56125f401f682d5946483889/world122e74ace2b08f2791e63be2afbe87441c17d229/TEMP03a715eba7608b0026129b54790a2b86db8ac53c. Contracts131190870592 terminalFAILURE, job2026-11-12T12:44:06Z..2026-11-12T12:44:53Z, runupdated2026-11-12T12:44:54Z. All six native jobs terminalSKIPPED. No actualSDK/businessRoot/MF/I0/Native16.
+
+Actual initial PASS: same5 syntax/lint, inactive unset-group wrapper1/business0/nooutput, invalid rejection pre-I0/output, unchanged Q8exact8pass/fail0/cancelled0/skipped0/todo0. Actual closed controls F1–F7PASS again; F8FAIL typedAssertionError/codeERR_ASSERTION/operatorstrictEqual/actual1/expected0, message65B/SHA2569bc5ee0c3a036784a202eb6afe85019f0d6494796a67c0fcdb5cb1cdcc78bcb9, raw message/source/stack omitted. F8 control phase/cause not established by this DTO, no guessed attribution. Full safe groupDTO below. Individual F8 framing/inventory/canary subcases cannot be called qualified from a failed group.
+
+Strict three-profile command SUCCESS and CURRENT public validator now SUCCESSFULLY accepted full positive/readonly/reduction_a outputs. Closed diagnostics allPassedtrue, stagescomplete, positiveadditionalSYN0, readonly3, reduction_a3; allI0/nativefalse. Exact four full validated preflight JSONs are retained including positive alias; no rejected records and status.validationFailures exactempty. This is actual fixed pure compilation/provenance evidence, not native qualification or all-controls GREEN.
+
+Artifact13945287021 / finite-budget-fixed-preparation-306188a8c432506f3c334aad70c936bed04b8a0f, ZIP112100B/SHA256a2d38e39b9d6eeb677a5d3093d167e49dad3858cd867242f41dbc66c23af55ce, expires2026-11-19T12:44:46Z. First assigned ID retrieval actualNOTFOUND; second after2s SUCCEEDED, thirdSKIPPED. Uploaded/downloaded digest matched; independent full10fileinventory/context/hash and local manifest byte equality SUCCEEDED. Manifest1635B/SHA25602d57303d16ff350b5d009f22a11c7d0b5b219757a4be17dfdfb17450c7bc8a9. One bounded connector read112100B in RAM only verified actual ZIPdigest/names and safe status; no local files/project execution/raw Source/TAP/logs.
+
+Actual safe public inventory/status facts:
+
+```json
+{
+  "zipBytes": 112100,
+  "sha256": "a2d38e39b9d6eeb677a5d3093d167e49dad3858cd867242f41dbc66c23af55ce",
+  "rows": [
+    {
+      "name": "budget-artifact.json",
+      "bytes": 1635,
+      "sha256": "02d57303d16ff350b5d009f22a11c7d0b5b219757a4be17dfdfb17450c7bc8a9",
+      "files": [
+        {
+          "path": "controls.json",
+          "bytes": 2562,
+          "sha256": "980d4e435a3ee2303c9c9cfc9447137f7e50a3279faf5d2d725382dc64fdca1c"
+        },
+        {
+          "path": "diagnostics.json",
+          "bytes": 809,
+          "sha256": "c3ab7eb6aada5e2e62ebb3ada046c8bf08ad6ec4a1d53d6cd4b3fc5800d37811"
+        },
+        {
+          "path": "inactive.json",
+          "bytes": 199,
+          "sha256": "b45cfb6f89a79a1f15b842a71fff8b2003b8812ee5dd41e4a578d9037376b12c"
+        },
+        {
+          "path": "preflight-positive.json",
+          "bytes": 201677,
+          "sha256": "b095e851627e632f2653e9af9234b92dd29c3ac8ee5aeb8c996402df26253ed0"
+        },
+        {
+          "path": "preflight-readonly.json",
+          "bytes": 210747,
+          "sha256": "bf9914ca7e17df6e5565e91601b44912f15ed34462f043568dd5409df9db39d8"
+        },
+        {
+          "path": "preflight-reduction_a.json",
+          "bytes": 210752,
+          "sha256": "e1b1cea68919322becf969582e843c729b75589e93a532e768ff62e6f28fee87"
+        },
+        {
+          "path": "preflight.json",
+          "bytes": 201677,
+          "sha256": "b095e851627e632f2653e9af9234b92dd29c3ac8ee5aeb8c996402df26253ed0"
+        },
+        {
+          "path": "q-counts.json",
+          "bytes": 89,
+          "sha256": "a194a9895da45c53381b398c277e252ab18778d338ae51331a5800121510c6ae"
+        },
+        {
+          "path": "status.json",
+          "bytes": 1481,
+          "sha256": "64594c71b79153e7b1e190e68620166e98a7d1b6e0752c01d3de77a7e1d0ee4e"
+        }
+      ]
+    },
+    {
+      "name": "diagnostics.json",
+      "bytes": 809,
+      "sha256": "c3ab7eb6aada5e2e62ebb3ada046c8bf08ad6ec4a1d53d6cd4b3fc5800d37811"
+    },
+    {
+      "name": "controls.json",
+      "bytes": 2562,
+      "sha256": "980d4e435a3ee2303c9c9cfc9447137f7e50a3279faf5d2d725382dc64fdca1c"
+    },
+    {
+      "name": "inactive.json",
+      "bytes": 199,
+      "sha256": "b45cfb6f89a79a1f15b842a71fff8b2003b8812ee5dd41e4a578d9037376b12c"
+    },
+    {
+      "name": "preflight-positive.json",
+      "bytes": 201677,
+      "sha256": "b095e851627e632f2653e9af9234b92dd29c3ac8ee5aeb8c996402df26253ed0"
+    },
+    {
+      "name": "preflight-readonly.json",
+      "bytes": 210747,
+      "sha256": "bf9914ca7e17df6e5565e91601b44912f15ed34462f043568dd5409df9db39d8"
+    },
+    {
+      "name": "preflight-reduction_a.json",
+      "bytes": 210752,
+      "sha256": "e1b1cea68919322becf969582e843c729b75589e93a532e768ff62e6f28fee87"
+    },
+    {
+      "name": "preflight.json",
+      "bytes": 201677,
+      "sha256": "b095e851627e632f2653e9af9234b92dd29c3ac8ee5aeb8c996402df26253ed0"
+    },
+    {
+      "name": "q-counts.json",
+      "bytes": 89,
+      "sha256": "a194a9895da45c53381b398c277e252ab18778d338ae51331a5800121510c6ae"
+    },
+    {
+      "name": "status.json",
+      "bytes": 1481,
+      "sha256": "64594c71b79153e7b1e190e68620166e98a7d1b6e0752c01d3de77a7e1d0ee4e",
+      "status": "pure_failed",
+      "validationFailures": [],
+      "outcomes": {
+        "PURE_TEST_OUTCOME": "success",
+        "CONTROLS_OUTCOME": "failure",
+        "PREFLIGHT_OUTCOME": "success"
+      }
+    }
+  ]
+}
+```
+
+Actual closed controlDTO:
+
+```json
+{
+  "purpose": "afw.closed-pure-controls.syn.v2",
+  "source": "306188a8c432506f3c334aad70c936bed04b8a0f",
+  "run": "43220608996",
+  "attempt": "1",
+  "groups": [
+    {
+      "group": "F1",
+      "passed": true,
+      "caseCount": 2,
+      "evidence": {
+        "bytes": 904,
+        "sha256": "dcae1ea26b1b09c6f2eacc5fd66701bdb3c61d2ccd431281b3c5325827b0909f"
+      },
+      "error": null
+    },
+    {
+      "group": "F2",
+      "passed": true,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 3332,
+        "sha256": "dac450adc2e8566f01427d907b835f22a7e64301654f58a58cd9ef5557d12a21"
+      },
+      "error": null
+    },
+    {
+      "group": "F3",
+      "passed": true,
+      "caseCount": 4,
+      "evidence": {
+        "bytes": 5431,
+        "sha256": "5ccccc7bbfdbd01d5183c274ec1cbdab018aa0f165d3c42509b322d159147daf"
+      },
+      "error": null
+    },
+    {
+      "group": "F4",
+      "passed": true,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 2528,
+        "sha256": "fde2eea49ef543f0d36347cda87d7035f10657716cc6cd418bff1fb4548bb33b"
+      },
+      "error": null
+    },
+    {
+      "group": "F5",
+      "passed": true,
+      "caseCount": 3,
+      "evidence": {
+        "bytes": 16098,
+        "sha256": "3f0739f932e0de2cb06b9023b99307bd7787508cfd53ac7847027c759a11a398"
+      },
+      "error": null
+    },
+    {
+      "group": "F6",
+      "passed": true,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 218,
+        "sha256": "0cf03851592354cf957c3248d37b1585d924dfc009b79704db924a8145070e5a"
+      },
+      "error": null
+    },
+    {
+      "group": "F7",
+      "passed": true,
+      "caseCount": 4,
+      "evidence": {
+        "bytes": 599,
+        "sha256": "7362a7cc15236bd1958794837bccc943ebf5ea87ef2f3db7c06b8d6382c08036"
+      },
+      "error": null
+    },
+    {
+      "group": "F8",
+      "passed": false,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 383,
+        "sha256": "e9985577aa6e937bd6d6c4f56f2f1c17c4cb49831b339a88ffc5d18de092c896"
+      },
+      "error": {
+        "name": "AssertionError",
+        "nativeError": true,
+        "code": "ERR_ASSERTION",
+        "operator": "strictEqual",
+        "actual": 1,
+        "expected": 0,
+        "message": {
+          "bytes": 65,
+          "sha256": "9bc5ee0c3a036784a202eb6afe85019f0d6494796a67c0fcdb5cb1cdcc78bcb9",
+          "publicLabelSha256": "915c0f60e80855f6455a521d4d3df9e7a5f9c78452335b3deb332dbff239b594"
+        }
+      }
+    }
+  ],
+  "passed": false,
+  "I0Opened": false,
+  "nativeExecutionProduced": false,
+  "businessCases": 0
+}
+```
+
+Actual closed profileDTO:
+
+```json
+{
+  "purpose": "afw.closed-pure-diagnostic.syn.v2",
+  "source": "306188a8c432506f3c334aad70c936bed04b8a0f",
+  "run": "43220608996",
+  "attempt": "1",
+  "profiles": [
+    {
+      "profile": "positive",
+      "stage": "complete",
+      "passed": true,
+      "I0Opened": false,
+      "nativeExecutionProduced": false,
+      "additionalSYNCount": 0
+    },
+    {
+      "profile": "readonly",
+      "stage": "complete",
+      "passed": true,
+      "I0Opened": false,
+      "nativeExecutionProduced": false,
+      "additionalSYNCount": 3
+    },
+    {
+      "profile": "reduction_a",
+      "stage": "complete",
+      "passed": true,
+      "I0Opened": false,
+      "nativeExecutionProduced": false,
+      "additionalSYNCount": 3
+    }
+  ],
+  "allPassed": true,
+  "I0Opened": false,
+  "nativeExecutionProduced": false
+}
+```
+
+Required failure closure restores EXACTc72e31919d477280c9eef39b63ca46708acb82e7 COMPLETEseven/manual/noinputs/nopush/all7false. Old unsafe publisher restored INACTIVE exactly as required, never qualified foractivation. Latest FIXED-sealer complete7draft03a715eb and all code remain recoverable from306188a8, stillUNQUALIFIED becauseF8failed. No Source repair, new job, test/diagnostic retry or native release. Formalround2/FIX_BASEd9b7 remainopen; same reviewer gate pending an actual all-controls qualified covering. Full ref/tree/report/3183protected/3190leaves/closure0runs/zeroactive readback follows. STOP for Root ruling.
+
+
+## Round2 fixed CURRENT sandbox Array bridge — ONE fresh covering candidate
+
+Root release7e02164f5cdb4a212475a3f73b689dfb10f56e94 @e59314be2ab1698bdc3da2c3229a8412710ca9fa, start exacte498eeda. World-only private CURRENT VM bridge repair: capture THAT context's intrinsic Array and Array.from once; marshal only fs.readdir fulfilled string-array data through captured Array.from with VM Array receiver. Exact count/elements/order plus constructor/prototype identity checked. Original fs.readdir/map errors propagate through await unchanged. No JSON coercion, host prototype mutation, general object/error adapter or public sealer change; old historical sealer regression remains exact. Current public workflow/sealer byte-for-byte03a715eb unchanged; all raw/SDK/12observer/clock pins unchanged.
+
+Paired current predicate control uses actual Node22.23.4 host fs empty-directory Array: original hostempty REJECTS against VM[]; marshalledempty ACCEPTS; marshalled actual one-extra-entry REJECTS. Separate actual two-entry fs result verifies exact order/elements and all marshalled constructors/prototypes equal VM intrinsic. Same actual current sealer same()/deepStrictEqual; no weakened equality/canary/schema. Fixed source framing/inventory regressions and three existing failedlogs/unknownfield/unknownstring privacy cases remain. This paired proof diagnoses the deterministic realm defect; first historical innercatchsite remainsUNKNOWN.
+
+Single fresh attempt1 <=2min keyless fullcovering onlycontracts runnable/sixnativefalse: fixed5 syntax/lint; inactive1/business0/nooutput/invalid pre-I0; Q8exact8/0failcancelSkipTodo; allF1–F8 with paired actual realm + currentsealer tests; three FULL strictly validated profiles positive/readonly/reduction_a. No SDKbusiness/MF/I0/Native16/newsecret. Freeze through terminal/assignedsameID/fullinventory/digest. Failure exactc72/manual7false/report/readbacks/STOP/noautoretry. Allpass reconcile COMPLETE7 latestFIXEDsealer/manual/noinputs/nopush/all7false/currentwiring/readbacks/report/STOP. Formalround2/FIX_BASEd9b7 remains and same review pending.
+
+
+## Round2 covering ALL PASS — COMPLETE7 reconciled INACTIVE for same-reviewer gate
+
+Latest authorized pure covering run43222147327/attempt1/Source8735e1b975b9aad058c81f362cdfebc1c4dfbb84/treecb87e79b7ef4e8c65a6b3de53cfe69cc7b430581/world5f349fdbece8a38f3dc78c82f57131b0efbd01da/TEMPexact03a715eba7608b0026129b54790a2b86db8ac53c. Contracts131196068335 terminalSUCCESS, job2026-11-12T12:54:00Z..2026-11-12T12:54:38Z, runcreated2026-11-12T12:53:57Z/terminalupdated2026-11-12T12:54:39Z. Exactly one attempt1, no retries/rerun. Six native jobs terminalSKIPPED. No actualSDK/businessRoot/MF/I0/nativeclock/Native16.
+
+Executed validation: same five files node --check + locked scoped ESLint; explicitly unset AFW_BUDGET_GROUP single native-file module wrapper1/pass1/business0/no output; invalid fixed group rejected before output/I0; unchanged Q8exact8/pass8/fail0/cancelled0/skipped0/todo0. All F1–F8 pure groups PASS/errornull. F2 actual observer-order controls cover two conservative confirmed deadline orders, late ordinary SAME-error propagation, SAME-error race, fulfilled-guard ambiguity, finallyclose, missing and duplicate observations; these are pure models, not genuine native SDK timelines. F5 actual CURRENT producer continuation/catch/evidence/finally/recovery and exact current Node callback controls cover normal plus D/E+D/F+D/E+F+D/recoveryE+D/callbackA+D+siblingB; each fixed Node child preserves one disposer attempt, primary identity/ancillary errors/poison, no MF. F8 six fixed proof entries cover EOF/LF strict framing+invalidframes, CURRENT expectedSet/actualinventory mutations, paired actual22.23.4 realm arrays, and three current-sealer rawlog/canary/unknownfield/unknownstring sandbox cases. Public summary caseCount is its named-case-array count, NOT an additional8Q or native16 business count; F2 causal subcases/F5 seven child cases are bound by each full private group evidence bytes/SHA. Full private traces retained runner-only untilcleanup as released, no claim of seven-day raw pure logs.
+
+Three FULL compile profiles positive/readonly/reduction_a strictly validated and published. Unique M61/QA115 each; additionalSYN module records0/3/3. Original positive emitted entry106772B/SHAf5458d1d7f94665c8b02915972c95614b3a3bd2125d6d6a89ef6bea737c999ec; readonly/reduction preserve same baselineprefix before private extension. Rawentry64800B/SHA89ae285b... and SDK251149B/SHAbb2b8524... unchanged; readonly/reduction twelve PRIMARY observation blocks with work2/wait2 explicit subcounts, no addedpositive/default SYN. No descriptor refresh/rawlib/SDK/production/clock changes. First historical sealer catch attribution staysUNKNOWN; paired realm proof establishes deterministic defect+repair only.
+
+Artifact13944719793 / finite-budget-fixed-preparation-8735e1b975b9aad058c81f362cdfebc1c4dfbb84, ZIP111851B/SHA25691a2ddbac2115b8a047d47816e775cc79fe528ee12f31f43baa6c86d3234b1ca, expires2026-11-19T12:54:31Z. FIRST assigned exact-ID retrieval SUCCESS; retrieval2/3SKIPPED. Uploaded/downloaded digests match; independent full10file inventory/context/manifest/local byte equality SUCCESS, manifest1635B/SHA2562a6d021f64c260121712d40129bc2b56bc6a7224fcf46041a5a156e0fb35edb1. One bounded in-RAM connector read only verifies actualZIPdigest/inventory/status and metadata; no local files/project execution. status pure_passed / validationFailures[] / all three outcomes success. Public exactJSON only, no raw Source/log/TAP/stack/canary bytes; raw pure material runner-only untilcleanup. Native encrypted custody unchanged/notrerun.
+
+Exact safe artifact facts:
+
+```json
+{
+  "zipBytes": 111851,
+  "sha256": "91a2ddbac2115b8a047d47816e775cc79fe528ee12f31f43baa6c86d3234b1ca",
+  "inventory": [
+    {
+      "name": "budget-artifact.json",
+      "bytes": 1635,
+      "sha256": "2a6d021f64c260121712d40129bc2b56bc6a7224fcf46041a5a156e0fb35edb1"
+    },
+    {
+      "name": "diagnostics.json",
+      "bytes": 809,
+      "sha256": "ab2fbc629b3dd23f7adf0ffc3976bad214b997e4370e826644132eb8b7518d3f"
+    },
+    {
+      "name": "controls.json",
+      "bytes": 2141,
+      "sha256": "f87829e74cbeff7fe8c0e9e80f6e7d2f8141e69f59469d8e187e396bf0d14fa7"
+    },
+    {
+      "name": "inactive.json",
+      "bytes": 199,
+      "sha256": "b45cfb6f89a79a1f15b842a71fff8b2003b8812ee5dd41e4a578d9037376b12c"
+    },
+    {
+      "name": "preflight-positive.json",
+      "bytes": 201677,
+      "sha256": "ed02d96c0d496573380d1af7f3b2950a03b3066acb3e75e13675c6dfe5535767"
+    },
+    {
+      "name": "preflight-readonly.json",
+      "bytes": 210747,
+      "sha256": "476e922a2e91aabda9ff26d340fddf599a4198439792f00ce8ea786fe48b0004"
+    },
+    {
+      "name": "preflight-reduction_a.json",
+      "bytes": 210752,
+      "sha256": "6f5db1fcb961ee13dec1a99ba9c4a419d8329669ae2d74b0b677733a6b305042"
+    },
+    {
+      "name": "preflight.json",
+      "bytes": 201677,
+      "sha256": "ed02d96c0d496573380d1af7f3b2950a03b3066acb3e75e13675c6dfe5535767"
+    },
+    {
+      "name": "q-counts.json",
+      "bytes": 89,
+      "sha256": "a194a9895da45c53381b398c277e252ab18778d338ae51331a5800121510c6ae"
+    },
+    {
+      "name": "status.json",
+      "bytes": 1481,
+      "sha256": "dee5a76fca1b04774a22c23b3db75d48269a6f977818ffff1026bc5338342e4c"
+    }
+  ],
+  "status": "pure_passed",
+  "validationFailures": [],
+  "outcomes": {
+    "PURE_TEST_OUTCOME": "success",
+    "CONTROLS_OUTCOME": "success",
+    "PREFLIGHT_OUTCOME": "success"
+  },
+  "profiles": [
+    {
+      "group": "positive",
+      "source": "8735e1b975b9aad058c81f362cdfebc1c4dfbb84",
+      "run": "43222147327",
+      "attempt": "1",
+      "M": 61,
+      "uniqueM": 61,
+      "QA": 115,
+      "uniqueQA": 115,
+      "additionalSYN": 0,
+      "I0Opened": false,
+      "nativeExecutionProduced": false
+    },
+    {
+      "group": "readonly",
+      "source": "8735e1b975b9aad058c81f362cdfebc1c4dfbb84",
+      "run": "43222147327",
+      "attempt": "1",
+      "M": 61,
+      "uniqueM": 61,
+      "QA": 115,
+      "uniqueQA": 115,
+      "additionalSYN": 3,
+      "I0Opened": false,
+      "nativeExecutionProduced": false
+    },
+    {
+      "group": "reduction_a",
+      "source": "8735e1b975b9aad058c81f362cdfebc1c4dfbb84",
+      "run": "43222147327",
+      "attempt": "1",
+      "M": 61,
+      "uniqueM": 61,
+      "QA": 115,
+      "uniqueQA": 115,
+      "additionalSYN": 3,
+      "I0Opened": false,
+      "nativeExecutionProduced": false
+    }
+  ]
+}
+```
+
+Actual closed control proof:
+
+```json
+{
+  "purpose": "afw.closed-pure-controls.syn.v2",
+  "source": "8735e1b975b9aad058c81f362cdfebc1c4dfbb84",
+  "run": "43222147327",
+  "attempt": "1",
+  "groups": [
+    {
+      "group": "F1",
+      "passed": true,
+      "caseCount": 2,
+      "evidence": {
+        "bytes": 904,
+        "sha256": "dcae1ea26b1b09c6f2eacc5fd66701bdb3c61d2ccd431281b3c5325827b0909f"
+      },
+      "error": null
+    },
+    {
+      "group": "F2",
+      "passed": true,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 3332,
+        "sha256": "dac450adc2e8566f01427d907b835f22a7e64301654f58a58cd9ef5557d12a21"
+      },
+      "error": null
+    },
+    {
+      "group": "F3",
+      "passed": true,
+      "caseCount": 4,
+      "evidence": {
+        "bytes": 5431,
+        "sha256": "58a26c8fd64bdaf1dd9e116982e1ca80610b765aa8a816f214b73f4a1cda44fe"
+      },
+      "error": null
+    },
+    {
+      "group": "F4",
+      "passed": true,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 2528,
+        "sha256": "fde2eea49ef543f0d36347cda87d7035f10657716cc6cd418bff1fb4548bb33b"
+      },
+      "error": null
+    },
+    {
+      "group": "F5",
+      "passed": true,
+      "caseCount": 3,
+      "evidence": {
+        "bytes": 16098,
+        "sha256": "3f0739f932e0de2cb06b9023b99307bd7787508cfd53ac7847027c759a11a398"
+      },
+      "error": null
+    },
+    {
+      "group": "F6",
+      "passed": true,
+      "caseCount": 1,
+      "evidence": {
+        "bytes": 218,
+        "sha256": "0cf03851592354cf957c3248d37b1585d924dfc009b79704db924a8145070e5a"
+      },
+      "error": null
+    },
+    {
+      "group": "F7",
+      "passed": true,
+      "caseCount": 4,
+      "evidence": {
+        "bytes": 599,
+        "sha256": "7362a7cc15236bd1958794837bccc943ebf5ea87ef2f3db7c06b8d6382c08036"
+      },
+      "error": null
+    },
+    {
+      "group": "F8",
+      "passed": true,
+      "caseCount": 6,
+      "evidence": {
+        "bytes": 1532,
+        "sha256": "ac5c7c49185dc53cdd285c8e87294359d23d4fbcb31f60ba816c8fa2d3398d68"
+      },
+      "error": null
+    }
+  ],
+  "passed": true,
+  "I0Opened": false,
+  "nativeExecutionProduced": false,
+  "businessCases": 0
+}
+```
+
+Validated original entry/SDK and SYN counts:
+
+```json
+[
+  {
+    "group": "positive",
+    "entry": {
+      "rawBytes": 64800,
+      "rawSha256": "89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257",
+      "emittedBytes": 106772,
+      "emittedSha256": "f5458d1d7f94665c8b02915972c95614b3a3bd2125d6d6a89ef6bea737c999ec",
+      "baselineBytes": null,
+      "baselineSha256": null
+    },
+    "sdk": {
+      "bytes": 251149,
+      "sha256": "bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80"
+    },
+    "primaryBlocks": 0,
+    "work": 0,
+    "wait": 0
+  },
+  {
+    "group": "readonly",
+    "entry": {
+      "rawBytes": 64800,
+      "rawSha256": "89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257",
+      "emittedBytes": 124640,
+      "emittedSha256": "3b6ada1b5083ef8fe283829845c477badd715496429708e3df3e0f311948a4fa",
+      "baselineBytes": 106772,
+      "baselineSha256": "f5458d1d7f94665c8b02915972c95614b3a3bd2125d6d6a89ef6bea737c999ec"
+    },
+    "sdk": {
+      "bytes": 251149,
+      "sha256": "bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80"
+    },
+    "primaryBlocks": 12,
+    "work": 2,
+    "wait": 2
+  },
+  {
+    "group": "reduction_a",
+    "entry": {
+      "rawBytes": 64800,
+      "rawSha256": "89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257",
+      "emittedBytes": 124641,
+      "emittedSha256": "f2f0340445b8ab8be6c519864c20b546dbb12c7f8d5f55755f1623d0adec6948",
+      "baselineBytes": 106772,
+      "baselineSha256": "f5458d1d7f94665c8b02915972c95614b3a3bd2125d6d6a89ef6bea737c999ec"
+    },
+    "sdk": {
+      "bytes": 251149,
+      "sha256": "bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80"
+    },
+    "primaryBlocks": 12,
+    "work": 2,
+    "wait": 2
+  }
+]
+```
+
+Reconciliation after terminal/readbacks changes only workflow metadata/gates and this report; CODE REMAINS exact covering world5f349fdb + cleanup2f5dad6c + persistencee0dda1fd + unchanged initial-entrya7b730dc/nativetest533dafb5. COMPLETE seven-job latest FIXED publisher and original native body/wiring retained, MANUAL workflow_dispatch ONLY/noinputs/nopush/no schedule, ALL7 job guards literallyfalse. Original c72 unsafe raw publisher is NOT restored on this success. Fixed public sealer body remains byte-exact03a715eb; closed Q8 JSON replaces raw TAP aggregation; full preflight downloads remain current-schema guarded before I0. No actual native execution is authorized by reconciliation.
+
+Static full graph/role/case/timeouts (all literalfalse, acyclic; consumerB intentionally has no positive/A completion dependency):
+
+```json
+[
+  {
+    "job": "contracts",
+    "needs": "[]",
+    "group": "positive",
+    "role": null,
+    "lane": null,
+    "cases": null,
+    "timeout": "2",
+    "literalFalse": true
+  },
+  {
+    "job": "positive_prepare",
+    "needs": "[contracts]",
+    "group": "positive",
+    "role": "producer",
+    "lane": "positive",
+    "cases": "'[\"P1\"]'",
+    "timeout": "15",
+    "literalFalse": true
+  },
+  {
+    "job": "positive_consume",
+    "needs": "[contracts, positive_prepare]",
+    "group": "positive",
+    "role": "consumer",
+    "lane": "positive",
+    "cases": "'[\"P1\"]'",
+    "timeout": "15",
+    "literalFalse": true
+  },
+  {
+    "job": "reduction_prepare",
+    "needs": "[contracts]",
+    "group": "reduction_a",
+    "role": "producer",
+    "lane": "reduction",
+    "cases": "'[\"D1\",\"D2\",\"D3\",\"D4\"]'",
+    "timeout": "15",
+    "literalFalse": true
+  },
+  {
+    "job": "reduction_consume_a",
+    "needs": "[contracts, reduction_prepare]",
+    "group": "reduction_a",
+    "role": "consumer",
+    "lane": "reduction_a",
+    "cases": "'[\"D1\",\"D2\"]'",
+    "timeout": "15",
+    "literalFalse": true
+  },
+  {
+    "job": "readonly",
+    "needs": "[contracts]",
+    "group": "readonly",
+    "role": "consumer",
+    "lane": "readonly",
+    "cases": "'[\"R1\",\"R2\",\"R3\"]'",
+    "timeout": "7",
+    "literalFalse": true
+  },
+  {
+    "job": "reduction_consume_b",
+    "needs": "[contracts, readonly, reduction_prepare]",
+    "group": "reduction_b",
+    "role": "consumer",
+    "lane": "reduction_b",
+    "cases": "'[\"D3\",\"D4\"]'",
+    "timeout": "15",
+    "literalFalse": true
+  }
+]
+```
+
+Contracts remains2min; native protected limits unchanged. B starts with contracts/readonly/reductionproducer dependencies, resolves other terminal artifacts only after native/disposal under existing same-run unique role/kind/identity/digest policy. B self observation remains in-progress/currenttime until upload; Root must later supply all7terminal/interval proof, no fabricated future end/8thjob. Existing F7 remaining-time request checks/pollfacts retained; no new clockpoll/control execution during reconciliation. All four D cases share original fixed reduction producer lineage. These are static PREPARATION facts, not observed native clocks.
+
+F2/F5/F8 code and covering regressions are now ready for SAME reviewer on FULL formal FIX_BASEd9b7ea752466ee6c5865b1529aeed28072a085ff..final including all commits/seven authorized paths. Formal round2 remains open pending that review; five prior closed findings stay closed unless introduced breakage is found. Full3190 leaves/3183 outside-scope hashes+modes, currentref/tree/report/workflow exact content/closure0runs/branch0active readbacks follow. No main/Rootdocs/ORD/O4/production changes, no helpers, no localprojectsetup/deps/build/tests. Native16/finalTask2/GLOBAL296/realPCoff remain HELD/readinessfalse. STOP after closure; no extra test/job/native action without Root ruling.

`````

### test/fixtures/finite-budget-world.mjs

`````diff
diff --git a/test/fixtures/finite-budget-world.mjs b/test/fixtures/finite-budget-world.mjs
# before_blob=37de8696f086d1237609b262efa822961d3e30a2 after_blob=5f349fdbece8a38f3dc78c82f57131b0efbd01da
--- a/test/fixtures/finite-budget-world.mjs
+++ b/test/fixtures/finite-budget-world.mjs
@@ -612,21 +612,21 @@
 }
 
 const scopeInputPins=budgetNativeDescriptorProposal.implementationSupplement.scopeInputPins;
 function requireOrdinaryObserver(){
  assert.equal(process.env.AFW_BUDGET_DIAGNOSTIC_CANDIDATE,undefined,'deprecated diagnostic candidate rejected before I0');
 }
 
 
 
 const fixedControlCountKeys=['childBlocks','work','wait','selectReadonly','selectReduction','queueReadonly','queueReduction','capReadonlyList','capReadonlyGet','capReductionList','capReductionDelete','send','sdk'];
-const fixedControlStages=new Set(['start','complete','wrapper_readonly','wrapper_reduction','observer_child','observer_calls','read_raw','legacy_composition','prepared_validate','baseline_transform','syn_instrument','adjacency_ro','adjacency_d','syn_counts','body_extract','cached_assembly','vm_start','facet_setup','facet_cleanup','vm_hold','vm_boundary','queue_verdict','queue_mutator','ownership','f5_no_adapter','f5_callback_extract','f5_callback_setup','f5_callback_invoke','f5_callback_return','f5_callback_assert','f5_legacy_case','manifest','peer_wait']);
+const fixedControlStages=new Set(['start','complete','wrapper_readonly','wrapper_reduction','observer_child','observer_calls','read_raw','legacy_composition','prepared_validate','baseline_transform','syn_instrument','adjacency_ro','adjacency_d','syn_counts','body_extract','cached_assembly','vm_start','facet_setup','facet_cleanup','vm_hold','vm_boundary','queue_verdict','queue_mutator','ownership','f5_no_adapter','f5_callback_extract','f5_callback_setup','f5_callback_invoke','f5_callback_return','f5_callback_assert','f5_legacy_case','manifest','peer_wait','round2_owned_child','round2_sealer']);
 let fixedControlState=null;
 function fixedControlOwn(value,key){if(!value||typeof value!=='object'||fixedNodeTypes.isProxy(value))return undefined;const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;}
 function fixedControlSafe(value){
  if(value===null||typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value))return value;
  if(typeof value==='string')return /^[a-f0-9]{64}$/.test(value)?{type:'sha256',value}:{type:'string',bytes:Buffer.byteLength(value),sha256:hash(value)};
  if(value&&typeof value==='object'&&!fixedNodeTypes.isProxy(value)){
   const ds=Object.getOwnPropertyDescriptors(value),keys=Reflect.ownKeys(ds);
   if(keys.length===13&&fixedControlCountKeys.every(key=>keys.includes(key)&&Object.hasOwn(ds[key],'value')&&Number.isSafeInteger(ds[key].value)))return {type:'fixed_counts',counts:Object.fromEntries(fixedControlCountKeys.map(key=>[key,ds[key].value]))};
  }
  return {type:value===undefined?'undefined':typeof value};
@@ -815,51 +815,63 @@
 let fixedBudgetAllocationOrdinal=0;const fixedBudgetOwnedLive=new Set();
 function assertFixedBudgetAllocationSafe(){assert(![...fixedBudgetOwnedLive].some(record=>record.disposalUncertain),'SYN previous owned disposal uncertain before allocation');assert(fixedBudgetOwnedLive.size<2,'SYN fixed job maximum two owned MF');}
 function ownedFailure(record,phase,error){record.failures.push({phase,error});}
 function createFixedOwnedRecord(frame,kind){
  const record={ordinal:++fixedBudgetAllocationOrdinal,caseName:frame.caseName,kind,persist:null,mf:null,fixture:null,callbacks:[],failures:[],epochs:[],closing:null,disposed:false,archived:false,archive:null,terminalCapture:'not_available',events:[]};
  frame.records.push(record);
  record.attachPersist=path=>{assert.equal(record.persist,null);record.persist=path;record.events.push('persist-attached');};
  record.attachFixture=f=>{assert(!record.fixture||record.fixture===f);record.fixture=f;record.events.push('fixture-attached');};
  record.attachMiniflare=mf=>{
   assert(!record.mf||record.mf===mf);if(record.mf)return;assertFixedBudgetAllocationSafe();record.mf=mf;fixedBudgetOwnedLive.add(record);const original=mf.dispose;assert.equal(typeof original,'function');
-  mf.dispose=()=>record.dispose();record.originalDispose=()=>Reflect.apply(original,mf,[]);record.events.push('miniflare-attached');
+  mf.dispose=()=>record.outwardDisposal??=(async()=>{await record.dispose();if(record.disposeError)throw record.disposeError;})();record.originalDispose=()=>Reflect.apply(original,mf,[]);record.events.push('miniflare-attached');
  };
  record.dispose=()=>record.disposal??= (async()=>{
   const f=record.fixture;
   if(f?.firstConnectionBuild&&f.cleanupCheckpointInputs)try{const mounted=f.cleanupCheckpointInputs().currentMountedOptions;record.graphs=['M','QA'].map(role=>{const worker=mounted.workers.find(v=>v.name===(role==='M'?'canary-first-connection':'qa-first-connection'));assert(worker);assert.equal(hash(worker.script),f.firstConnectionBuild[role].sha256);return {role,worker:worker.name,sha256:hash(worker.script),bytes:Buffer.byteLength(worker.script),mounted:true};});}catch(error){ownedFailure(record,'mount_provenance',error);}
   if(f?.captureBudgetEpoch)try{const failureCount=record.failures.length;await f.captureBudgetEpoch('terminal-owned-before-dispose');record.terminalCapture=record.failures.length===failureCount?'captured':'failed';record.epochs=structuredClone(f.budgetEpochs);}catch(error){record.terminalCapture='failed';ownedFailure(record,'terminal_epoch',error);}
   else if(record.mf){record.terminalCapture='unavailable_partial_setup';ownedFailure(record,'terminal_epoch',Error('SYN partial setup has no epoch capture'));}
-  if(record.originalDispose)try{await record.originalDispose();record.disposed=true;fixedBudgetOwnedLive.delete(record);record.events.push('disposed');}catch(error){record.disposalUncertain=true;record.events.push('disposal-uncertain');ownedFailure(record,'dispose',error);}
+  if(record.originalDispose)try{await record.originalDispose();record.disposed=true;fixedBudgetOwnedLive.delete(record);record.events.push('disposed');}catch(error){record.disposeError=error;record.disposalUncertain=true;record.events.push('disposal-uncertain');ownedFailure(record,'dispose',error);}
   if(record.persist&&record.disposed)try{
    const destination=join(frame.root,'owned-native-'+record.ordinal);await mkdir(frame.root,{recursive:true});await cp(record.persist,destination,{recursive:true,errorOnExist:true,force:false});
    const source=await inventoryFiles(record.persist),copy=await inventoryFiles(destination);assert(source.length>0&&source.length<=512);assert(source.reduce((n,f)=>n+f.bytes,0)<=134217728);assert.deepEqual(copy,source,'owned cold native bytes exact');
    record.archive={path:destination,files:copy};record.archived=true;record.events.push('archived');
   }catch(error){ownedFailure(record,'cold_archive',error);}
  })();
  record.beforeDelete=async()=>{await record.dispose();if(!record.archived){record.events.push('delete-skipped-unsafe');return false;}record.events.push('delete-authorized');return true;};
  return record;
 }
 export function beginFixedBudgetOwnedAllocation(){
  const frame=fixedBudgetOwners.getStore();if(!frame)return null;assertFixedBudgetAllocationSafe();assert(!frame.records.some(r=>r.kind==='initial'),'one initial allocation per fixed occurrence');return createFixedOwnedRecord(frame,'initial');
 }
 export function attachFixedBudgetRecoveryOwner(f){
  const frame=fixedBudgetOwners.getStore();if(!frame)return;
  let record=frame.records.find(r=>r.kind==='recovery');if(!record)return;
  if(record.fixture){assert.equal(record.fixture,f);return;}record.attachFixture(f);
  assert(!Object.hasOwn(f,'mf'),'recovery hook precedes actual assignment');
  Object.defineProperty(f,'mf',{configurable:true,enumerable:true,set(mf){Object.defineProperty(f,'mf',{value:mf,writable:true,enumerable:true,configurable:true});record.attachMiniflare(mf);}});
 }
+
+export function noteFixedBudgetOwnedFailure(error,phase){
+ const frame=fixedBudgetOwners.getStore();if(!frame)return;
+ assert(['producer_operation','recovery_operation','fixture_callback','producer_evidence'].includes(phase),'fixed Node-owned failure phase');
+ frame.notes??=[];frame.notes.push({phase,error});
+ if(['producer_operation','recovery_operation','producer_evidence'].includes(phase))frame.operationPrimary??=error;
+ else if(phase==='fixture_callback')frame.cleanupPrimary??=error;
+}
+function noteFixedOwnedUnwind(frame,error){
+ const primary=frame.operationPrimary;if(primary&&error!==primary){frame.failures.push({phase:'operation_unwind',error});}return primary??error;
+}
 function registerFixedOwnedCleanup(fn){const frame=fixedBudgetOwners.getStore();assert(frame);frame.callbacks.push(fn);}
 async function closeFixedOwnedFrame(frame,primary){
  if(frame.closed)return frame.closed;
- frame.closed=(async()=>{
+ frame.closed=fixedBudgetOwners.run(frame,async()=>{
+  primary=frame.operationPrimary??primary??frame.cleanupPrimary??null;
   // SYN RPCs belong only to fixed R/D adapters before owned disposal begins.
   await Promise.allSettled(frame.records.map(async record=>{
    for(const phase of ['release','restore']){
     const applicable=['R1','R2','R3','D1','D2','D3','D4'].includes(frame.caseName),reason=!applicable?'case_identity':record.disposal||record.disposed||record.disposalUncertain?'disposal_started':!record.fixture?.stub?'fixture_unavailable':null;
     record.phases??=[];
     if(reason){record.phases.push({phase,status:'not_applicable',reason});record.events.push(phase+'-not-applicable');continue;}
     record.phases.push({phase,status:'attempted'});
     try{await record.fixture.stub[phase==='release'?'finiteBudgetRelease':'finiteBudgetRestore']();record.phases.push({phase,status:'fulfilled'});record.events.push(phase);}
     catch(error){record.phases.push({phase,status:'rejected'});ownedFailure(record,phase,error);}
    }
@@ -867,32 +879,33 @@
   // Original callbacks may still need live RPC and may dispose through our wrapper.
   for(const callback of frame.callbacks.reverse())try{await callback();}catch(error){frame.failures.push({phase:'registered_cleanup',error});}
   // Every partial/fulfilled allocation receives an idempotent fallback attempt.
   await Promise.allSettled(frame.records.map(async record=>{try{await record.dispose();}catch{}}));
   for(const record of frame.records){
    // A pre-assignment allocation can still own a persistence directory.
    if(record.persist&&!record.mf)try{
     const destination=join(frame.root,'owned-partial-'+record.ordinal);await mkdir(frame.root,{recursive:true});await cp(record.persist,destination,{recursive:true,errorOnExist:true,force:false});const files=await inventoryFiles(record.persist);assert.deepEqual(await inventoryFiles(destination),files);record.archive={path:destination,files};record.archived=true;
    }catch(error){ownedFailure(record,'partial_archive',error);}
   }
-  const failures=[...frame.failures,...frame.records.flatMap(r=>r.failures)];
+  primary=frame.operationPrimary??primary??frame.cleanupPrimary??null;
+  const phaseFacts=[...(frame.notes??[]),...frame.failures,...frame.records.flatMap(r=>r.failures)],failures=[];const identities=new Set();for(const fact of phaseFacts){if(fact.error!==primary&&!identities.has(fact.error)){identities.add(fact.error);failures.push(fact);}}
   const result={purpose:'afw.fixed-budget-owned-lifecycle.syn.v1',caseName:frame.caseName,records:frame.records.map(r=>({ordinal:r.ordinal,caseName:r.caseName,kind:r.kind,graphs:r.graphs??[],disposalUncertain:r.disposalUncertain===true,disposed:r.disposed,archived:r.archived,terminalCapture:r.terminalCapture,archive:r.archive,events:r.events,phases:r.phases??[],failures:r.failures.map(x=>({phase:x.phase,name:Object.getOwnPropertyDescriptor(x.error??{},'name')?.value??'Error'})),epochs:r.epochs})),callbackCount:frame.callbacks.length,ancillaryFailureCount:failures.length,primaryPreserved:primary!==null,complete:failures.length===0};
   try{await mkdir(frame.root,{recursive:true});await writeFile(join(frame.root,'ownership.json'),JSON.stringify(result,null,2));}catch(error){failures.push({phase:'ownership_preservation',error});result.complete=false;result.ancillaryFailureCount=failures.length;}
-  const error=primary??failures[0]?.error;if(error){fixedBudgetOwnerErrors.set(error,{primary,failures,result});throw error;}return result;
- })();return frame.closed;
+  const error=primary??failures[0]?.error;if(error){fixedBudgetOwnerErrors.set(error,{primary,failures,result,phaseFacts});throw error;}return result;
+ });return frame.closed;
 }
 async function withFixedBudgetOwner(caseName,root,operation,{recovery=false}={}){
  assert(['R1','R2','R3','D1','D2','D3','D4','P1','positive_producer','reduction_producer'].includes(caseName));
  const frame={caseName,root,records:[],callbacks:[],failures:[],closed:null};let value,primary=null;
  return fixedBudgetOwners.run(frame,async()=>{
   if(recovery){assertFixedBudgetAllocationSafe();const r=createFixedOwnedRecord(frame,'recovery');r.attachPersist(join('output','r2-native-'+(caseName==='P1'?'finite-budget-positive':'budget-'+caseName),'state'));}
-  try{value=await operation();}catch(error){primary=error;}
+  try{value=await operation();}catch(error){primary=noteFixedOwnedUnwind(frame,error);}
   const ownership=await closeFixedOwnedFrame(frame,primary);
   if(value&&typeof value==='object'){value.ownership=ownership;value.diagnostics??={};value.diagnostics.epochs=frame.records.flatMap(r=>r.epochs);if(value.caseName)await fixedBudgetPersist((caseName.startsWith('R')?'readonly/':'reduction/')+caseName,value);}
   return value;
  });
 }
 
 export function attachBudgetEpochCapture(f,{segment='producer',epochs=[],epoch=0}={}){
  assert(['producer','consumer'].includes(segment));let current=epoch;
  f.budgetEpochs=epochs;
  const frame=fixedBudgetOwners.getStore(),ownedRecord=frame?.records.find(record=>record.fixture===f);
@@ -1079,28 +1092,51 @@
 const fixedBudgetPause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 
 function fixedQueueCausality(value){
  const held=value.heldOperations??[];if(held.length!==2)return false;
  const [a,b]=held,child=a.childOrdinal;if(!Number.isSafeInteger(child)||child<1||b.childOrdinal!==child)return false;
  if(a.ordinal===b.ordinal||a.outwardSettledAt!==null||b.outwardSettledAt!==null)return false;
  if(!held.every(op=>op.sample?.childOrdinal===child&&op.sample.family===(value.caseName.startsWith('R')?1:2)&&op.sample.active===2&&op.sample.queued>0&&op.sample.method===op.method&&op.nativeSettledAt!==null&&op.heldSequence>op.sample.sequence))return false;
  const start=Math.min(a.sample.sequence,b.sample.sequence),end=Math.max(a.heldSequence,b.heldSequence);
  return !(value.observerEvents??[]).some(e=>e.kind==='outward_settled'&&e.sequence>start&&e.sequence<end);
 }
+
+function classifyFixedChildDeadline(before,after){
+ const indeterminate=reason=>({classification:'indeterminate',denialAfterDeadline:false,reason});
+ if(before.observerInvalid!==false||after.observerInvalid!==false||before.children?.length!==1)return indeterminate('invalid_or_missing_observation');
+ const child=before.children[0],last=after.children?.find(value=>value.childOrdinal===child.childOrdinal);
+ if(!last||last.family!==child.family||!Number.isSafeInteger(child.childOrdinal)||child.childOrdinal<1)return indeterminate('child_identity');
+ if(child.waitStatus!=='rejected'||last.waitStatus!=='rejected'||![child.deadline,child.waitSettledAt,child.abortAt].every(Number.isSafeInteger))return indeterminate('missing_wait_or_abort');
+ const events=(after.observerEvents??[]).filter(event=>event.childOrdinal===child.childOrdinal),select=kind=>events.filter(event=>event.kind===kind),aborts=select('child_abort'),waits=select('child_wait_rejected'),work=events.filter(event=>['child_work_rejected','child_work_fulfilled'].includes(event.kind));
+ if(aborts.length!==1||waits.length!==1||work.length>1||events.some(event=>!Number.isSafeInteger(event.sequence)||event.sequence<1)||new Set(events.map(event=>event.sequence)).size!==events.length)return indeterminate('missing_or_contradictory_order');
+ const abort=aborts[0],wait=waits[0],settled=work[0];
+ if(last.workStatus==='rejected'&&last.sameWorkWaitError===true&&settled&&settled.sequence<wait.sequence&&wait.sequence<abort.sequence)return {classification:'propagated_work',denialAfterDeadline:false,reason:'same_work_error_before_finally_abort'};
+ if(wait.sequence<abort.sequence)return {classification:'close_abort',denialAfterDeadline:false,reason:'wait_precedes_finally_abort'};
+ if(!(abort.sequence<wait.sequence)||child.parentAliveAtAbort!==true||child.workPendingAtAbort!==true)return indeterminate('abort_cause_not_proven');
+ if(child.abortAt<child.deadline||child.abortAt>=child.deadline+5000||child.waitSettledAt<child.abortAt||child.waitSettledAt>=child.deadline+5000)return indeterminate('deadline_window');
+ if(last.workStatus==='pending'){
+  if(last.workSettledAt!==null||settled)return indeterminate('pending_settlement_conflict');
+ }else if(last.workStatus==='rejected'){
+  if(!settled||settled.kind!=='child_work_rejected'||!Number.isSafeInteger(last.workSettledAt)||last.workSettledAt<child.abortAt||settled.sequence<abort.sequence||typeof last.sameWorkWaitError!=='boolean')return indeterminate('work_rejection_order');
+  if(last.sameWorkWaitError)return indeterminate('work_race_error_not_distinguished');
+ }else if(last.workStatus==='fulfilled'){
+  if(!settled||settled.kind!=='child_work_fulfilled'||!Number.isSafeInteger(last.workSettledAt)||last.workSettledAt<child.abortAt)return indeterminate('work_fulfillment_order');
+  if(settled.sequence<wait.sequence)return indeterminate('fulfilled_guard_cause_unknown');
+ }else return indeterminate('work_not_registered');
+ return {classification:'confirmed_deadline',denialAfterDeadline:true,reason:'abort_race_distinguished',childOrdinal:child.childOrdinal,deadline:child.deadline,waitSettledAt:child.waitSettledAt,abortAt:child.abortAt,workSettledAt:last.workSettledAt,workStatusAtHold:child.workStatus,workStatusAfterRelease:last.workStatus,waitStatus:last.waitStatus,parentAlive:true};
+}
 function fixedChildDeadlineProof(before,after){
- assert.equal(before.observerInvalid,false);assert.equal(after.observerInvalid,false);
- assert.equal(before.children.length,1,'same selected SDK child only');const child=before.children[0],last=after.children.find(c=>c.childOrdinal===child.childOrdinal);assert(last);
- assert.equal(child.waitStatus,'rejected','actual original child wait rejected');assert(Number.isSafeInteger(child.deadline)&&Number.isSafeInteger(child.waitSettledAt));assert(child.waitSettledAt>=child.deadline&&child.waitSettledAt<child.deadline+5000,'actual original deadline denial timing');
- assert.equal(child.parentAliveAtAbort,true);assert(child.abortAt>=child.deadline&&child.abortAt<child.deadline+5000);
+ const result=classifyFixedChildDeadline(before,after);assert.equal(result.classification,'confirmed_deadline','same selected child causal deadline required');
  assert.equal(before.outwardPending,2);assert.equal(before.heldNativeSettled,2);assert(fixedQueueCausality(before),'two actual held operations bound to same current queue');
- assert(after.released&&after.outwardPending===0&&after.nativeUnsettled===0);return {childOrdinal:child.childOrdinal,deadline:child.deadline,waitSettledAt:child.waitSettledAt,abortAt:child.abortAt,workStatusAtHold:child.workStatus,workStatusAfterRelease:last.workStatus,waitStatus:last.waitStatus,denialAfterDeadline:true,parentAlive:true,queueCausal:true};
+ assert(after.released&&after.outwardPending===0&&after.nativeUnsettled===0);return {...result,queueCausal:true};
 }
+
 function fixedNegativeBoundaryProof(value,family){
  const events=value.capEvents??[],method='list',childs=new Set(events.map(e=>e.childOrdinal));
  assert.equal(value.observerInvalid,false);assert.equal(events.length,1,'one actual reached final list cap');const e=events[0];assert.equal(e.family,family);assert(e.childOrdinal>0);assert.equal(childs.size,1);assert.equal(e.kind,'cap_'+method);assert.equal(e.counter,2);assert.equal(e.limit,2);assert.equal(value.lists,2);assert.equal(value.thirdListEntered,false);
  if(family===1)assert.equal(value.gets,200);else{assert.equal(value.gets,1);assert.equal(value.deletes,200);assert.equal(value.grantDeleteEntered,false);}
  return {method,childOrdinal:e.childOrdinal,counter:e.counter,limit:e.limit,exactPrecedingPages:2};
 }
 function fixedSendSdkProof(value,rows,{negative=false}={}){
  for(const name of ['sendCalls','sdkCalls']){const c=value[name];assert.equal(c.invoke,1,'actual single '+name+' invocation');assert.equal(c.sync_throw,0);assert.equal(c.fulfilled+c.rejected,1);}
  assert.equal(value.sendCalls.fulfilled,1,'original SEND ACK settled before SDK');assert.equal(value.sendCalls.sendHashes.length,1);
  const sendRows=rows.filter(([key])=>key.startsWith('afw.finite-owner-cleanup.v1:')&&key.endsWith(':sdk_revoke:send'));assert.equal(sendRows.length,1);
@@ -1365,26 +1401,26 @@
   for(const item of proof){const queueCausal=fixedQueueCausality(item.signals),expected=item.variant==='queued';fixedControlProgress('queue_verdict',{family:item.family,variant:item.variant,queueCausal,expected});assert.equal(queueCausal,expected,'actual facet native entry current queue bound');}
   const good=proof.find(item=>item.variant==='queued').signals,mutations=[x=>{x.heldOperations[0].sample.queued=0;},x=>{x.heldOperations[1].sample.active=1;},x=>{x.heldOperations[1].sample.family=3;},x=>{x.observerEvents.push({kind:'outward_settled',sequence:x.heldOperations[0].sample.sequence+0.5});},x=>{x.heldOperations[1].childOrdinal++;},x=>{x.heldOperations[0].outwardSettledAt=Date.now();}];
   for(let mutatorIndex=0;mutatorIndex<mutations.length;mutatorIndex++){const bad=structuredClone(good);mutations[mutatorIndex](bad);const queueCausal=fixedQueueCausality(bad);fixedControlProgress('queue_mutator',{mutatorIndex,queueCausal});assert.equal(queueCausal,false);}
  }
  return {queueInvariance:prepared.queueInvariance,queueKinds:prepared.proof.queueKinds,cases:proof.map(p=>p.signals?{family:p.family,variant:p.variant,currentQueueWithTwoHeld:fixedQueueCausality(p.signals),heldNativeSettled:p.signals.heldNativeSettled,outwardPending:p.signals.outwardPending,actualNativeInvocations:p.signals.nativeInvoked,genuineBusinessRoot:false}:p)};
 }
 
 
 
 async function fixedOriginalFixtureCleanup(){
- const source=await readFile('test/fixtures/finite-owner-cleanup.mjs','utf8'),blob=createHash('sha1').update('blob '+Buffer.byteLength(source)+'\0'+source).digest('hex');assert.equal(blob,'cda4ab10544fc8be127aa7a89f86b74141784dd3','fixed original cleanup fixture blob');
+ const source=await readFile('test/fixtures/finite-owner-cleanup.mjs','utf8'),blob=createHash('sha1').update('blob '+Buffer.byteLength(source)+'\0'+source).digest('hex');assert.equal(blob,'2f5dad6c306fac1be2f11845bef640bb204ad572','fixed current Node cleanup fixture blob');
  const ast=sourceAST(source,'fixed-original-owner-cleanup-callback'),owners=ast.statements.filter(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='ownerReferenceFixture');assert.equal(owners.length,1);
  const matches=[];const walk=node=>{if(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)&&node.expression.expression.getText(ast)==='t'&&node.expression.name.text==='after')matches.push(node);ts.forEachChild(node,walk);};walk(owners[0]);assert.equal(matches.length,1,'unique actual ownerReferenceFixture cleanup callback');
  const call=matches[0];assert.equal(call.arguments.length,1);const arrow=call.arguments[0];assert(ts.isArrowFunction(arrow)&&arrow.parameters.length===0&&arrow.modifiers?.some(m=>m.kind===ts.SyntaxKind.AsyncKeyword));
- const references=new Set();const refs=node=>{if(ts.isIdentifier(node)){const property=ts.isPropertyAccessExpression(node.parent)&&node.parent.name===node;if(!property)references.add(node.text);}ts.forEachChild(node,refs);};refs(arrow);assert.deepEqual([...references].sort(),['f'],'original cleanup callback f-only closure');
- return {source:arrow.getText(ast),proof:{blob,bytes:Buffer.byteLength(arrow.getText(ast)),sha256:hash(arrow.getText(ast)),matches:1,freeReferences:['f']}};
+ const references=new Set();const refs=node=>{if(ts.isIdentifier(node)){const property=ts.isPropertyAccessExpression(node.parent)&&node.parent.name===node;if(!property&&!(ts.isCatchClause(node.parent)&&node.parent.variableDeclaration?.name===node)&&node.text!=='error')references.add(node.text);}ts.forEachChild(node,refs);};refs(arrow);assert.deepEqual([...references].sort(),['budgetQualification','f','noteFixedBudgetOwnedFailure'],'current cleanup callback closed Node bindings');
+ return {source:arrow.getText(ast),proof:{blob,bytes:Buffer.byteLength(arrow.getText(ast)),sha256:hash(arrow.getText(ast)),matches:1,freeReferences:['budgetQualification','f','noteFixedBudgetOwnedFailure']}};
 }
 async function runFixedNoAdapterControls(){
  const cases=[];
  for(const identity of ['P1','positive_producer','reduction_producer']){
   fixedControlProgress('f5_no_adapter',{identity,step:'start'});
   const root='output/finite-budget/round1-controls/no-adapter-'+identity,persist=join(root,'source'),bytes=Buffer.from('SYN fixed no-adapter cold bytes');await mkdir(persist,{recursive:true});await writeFile(join(persist,'native.bin'),bytes);
   const trace=[];let touched=0,disposed=0,captured=0,cleaned=0,record;
   const value=await withFixedBudgetOwner(identity,join(root,'preserved'),async()=>{
    record=beginFixedBudgetOwnedAllocation();record.attachPersist(persist);
    const stub={};for(const method of ['finiteBudgetRelease','finiteBudgetRestore'])Object.defineProperty(stub,method,{get(){touched++;throw Error('SYN absent adapter touched');}});
@@ -1411,21 +1447,21 @@
     async finiteBudgetRelease(){assert(alive);trace.push('syn-release');},
     async finiteBudgetRestore(){assert(alive);trace.push('syn-restore');},
     async ownerReferenceControl(value){assert.equal(value,'released');assert(alive);trace.push('legacy-release');},
     async firstConnectionRestore(){assert(alive);trace.push('legacy-first-restore');if(scenario==='ancillary')throw rpcError;},
     async restoreMethods(){assert(alive);trace.push('legacy-methods-restore');}
    },async captureBudgetEpoch(reason){assert(alive);trace.push('capture:'+reason);fixture.budgetEpochs.push({reason,role:'QA',epoch:0});},
    async cleanup(){cleaned++;trace.push('cleanup');assert.equal(await record.beforeDelete(),true);assert(record.archived);trace.push('delete');await rm(persist,{recursive:true});}};
    record.attachFixture(fixture);const inertMF={async dispose(){assert(alive);disposed++;trace.push('dispose');alive=false;}};record.attachMiniflare(inertMF);fixture.mf=record.mf;
    const setup={sameMF:fixture.mf===record.mf&&fixture.mf===inertMF,sameWrappedDispose:fixture.mf.dispose===record.mf.dispose,ownerReferenceControl:typeof Object.getOwnPropertyDescriptor(fixture.stub,'ownerReferenceControl')?.value==='function',firstConnectionRestore:typeof Object.getOwnPropertyDescriptor(fixture.stub,'firstConnectionRestore')?.value==='function',restoreMethods:typeof Object.getOwnPropertyDescriptor(fixture.stub,'restoreMethods')?.value==='function',captureBudgetEpoch:typeof Object.getOwnPropertyDescriptor(fixture,'captureBudgetEpoch')?.value==='function',dispose:typeof Object.getOwnPropertyDescriptor(fixture.mf,'dispose')?.value==='function',cleanup:typeof Object.getOwnPropertyDescriptor(fixture,'cleanup')?.value==='function'};
    fixedControlProgress('f5_callback_setup',{scenario,step:'before_registration',setup});assert(Object.values(setup).every(Boolean),'fixed actual callback complete f member premise');
-   const context=createContext({__fixedOwnedFixture:fixture});const callback=new Script('(function(f){return '+extracted.source+';})(__fixedOwnedFixture)').runInContext(context,{timeout:1000});assert.equal(typeof callback,'function');
+   const context=createContext({__fixedOwnedFixture:fixture,budgetQualification:true,noteFixedBudgetOwnedFailure});const callback=new Script('(function(f){return '+extracted.source+';})(__fixedOwnedFixture)').runInContext(context,{timeout:1000});assert.equal(typeof callback,'function');
    registerFixedOwnedCleanup(async()=>{
     fixedControlProgress('f5_callback_invoke',{scenario,setup});let originalError=null,observerError=null;
     try{await callback();}catch(error){originalError=error;}
     const outcome={scenario,originalError:originalError===null?null:fixedControlError(originalError)};callbackOutcomes.push(outcome);
     try{fixedControlProgress('f5_callback_return',outcome);}catch(error){observerError=error;ownedFailure(record,'control_progress',error);}
     if(originalError!==null)throw originalError;if(observerError!==null)throw observerError;
    });
    if(scenario==='ancillary')registerFixedOwnedCleanup(async()=>{trace.push('independent-callback');throw callbackError;});
    if(scenario!=='normal')throw primary;return {};
   });}catch(error){actual=error;}
@@ -1483,29 +1519,32 @@
   try{await collectFixedBudgetPeers({startedAt,now:()=>time,read:async timeout=>{queries++;assert(timeout>0&&timeout<=10000);if(scenario==='request_failure')throw sentinel;return {ready:scenario==='after_30_seconds'&&time>=1035000,artifactCount:queries,terminalPeers:queries>7?6:4};},sleep:async ms=>{requested.push(ms);time+=ms;},persist:async facts=>{last=structuredClone(facts);}});}catch(error){actualError=error;}
   if(scenario==='after_30_seconds'){assert.equal(actualError,undefined);assert(time>=1035000);assert.equal(last.status,'ready');}
   else{assert(actualError);assert.equal(last.status,'failed');if(scenario==='headroom_exhausted')assert.equal(queries,0);if(scenario==='request_failure')assert.equal(actualError,sentinel);}
   assert(last.remaining>=0);assert(last.queries.every(q=>q.actualWaitMs===q.requestedWaitMs));results.push({scenario,queries,elapsed:time-1000000,preserved:true,headroom:last.remaining,requestedWaitMs:requested.reduce((n,v)=>n+v,0)});
  }return results;
 }
 
 
 async function verifyNativePreparationRound1(){
  const groups=[],failures=[],started=Date.now(),root='output/finite-budget/round1-controls';await mkdir(root,{recursive:true});
- const persist=async()=>{const passed=groups.length===7&&groups.every(g=>g.passed),result={purpose:'afw.native-preparation-round1-controls.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,phase:process.env.AFW_BUDGET_CONTROL_PHASE??'unspecified',stage:groups.length===7?'complete':'partial',groups,passed,started,observedAt:Date.now(),I0Opened:false,nativeExecutionProduced:false,businessCases:0,...budgetFixedFlags};await writeFile(join(root,'result.json'),JSON.stringify(result,null,2));return result;};
+ const persist=async()=>{const passed=groups.length===8&&groups.every(g=>g.passed),result={purpose:'afw.native-preparation-round1-controls.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,phase:process.env.AFW_BUDGET_CONTROL_PHASE??'unspecified',stage:groups.length===8?'complete':'partial',groups,passed,started,observedAt:Date.now(),I0Opened:false,nativeExecutionProduced:false,businessCases:0,...budgetFixedFlags};await writeFile(join(root,'result.json'),JSON.stringify(result,null,2));
+ const summary={purpose:'afw.closed-pure-controls.syn.v2',source:result.source,run:result.run,attempt:result.attempt,groups:groups.map(group=>{const bytes=Buffer.from(JSON.stringify(group));return {group:group.group,passed:group.passed,caseCount:Array.isArray(group.cases)?group.cases.length:group.group==='F5'?group.round2?.length??0:1,evidence:{bytes:bytes.length,sha256:hash(bytes)},error:group.error??null};}),passed:result.passed,I0Opened:false,nativeExecutionProduced:false,businessCases:0};
+ await mkdir('output/finite-budget/pure',{recursive:true});await writeFile('output/finite-budget/pure/controls.json',JSON.stringify(summary,null,2));return result;};
  const tests=[
   ['F1',async()=>{const cases=[];for(const family of ['readonly','reduction']){fixedControlProgress(family==='readonly'?'wrapper_readonly':'wrapper_reduction');cases.push(await runActualBudgetWrapperControl(family));}assert(cases.every(v=>v.held&&v.originalMethodsRestored&&v.baseReceiversPreserved&&v.outwardSettledAfterRelease===2));return {cases};}],
-  ['F2',async()=>({cases:await runFixedObserverControls('F2')})],
+  ['F2',async()=>({cases:await runFixedObserverControls('F2'),causalCases:await runRound2DeadlineControls()})],
   ['F3',()=>runFixedFacetControls('F3')],
   ['F4',async()=>({calls:await runFixedObserverControls('F4'),boundaries:await runFixedFacetControls('F4')})],
-  ['F5',async()=>{fixedControlProgress('ownership');await verifyFixedPairDisposer();const noAdapter=await runFixedNoAdapterControls(),actualCleanup=await runFixedActualCleanupControls();return {noAdapter,actualCleanup,cases:await runFixedOwnershipControls(),actualPairedDisposerControl:true};}],
+  ['F5',async()=>{fixedControlProgress('ownership');await verifyFixedPairDisposer();const noAdapter=await runFixedNoAdapterControls(),actualCleanup=await runFixedActualCleanupControls();return {noAdapter,actualCleanup,cases:await runFixedOwnershipControls(),actualPairedDisposerControl:true,round2:await runRound2OwnedControls()};}],
   ['F6',async()=>{fixedControlProgress('manifest');return {cases:await runFixedManifestControls()};}],
-  ['F7',async()=>{fixedControlProgress('peer_wait');return {cases:await runFixedPeerWaitControls()};}]
+  ['F7',async()=>{fixedControlProgress('peer_wait');return {cases:await runFixedPeerWaitControls()};}],
+  ['F8',async()=>({cases:await runRound2SealerControls()})]
  ];
  for(const [group,run]of tests){
   fixedControlState={group,stage:'start',trace:[]};fixedControlProgress('start');
   try{assert(Date.now()-started<45000,'SYN finite pure group headroom');const value=await run();fixedControlProgress('complete');groups.push({group,passed:true,...value,progress:fixedControlState});}
   catch(error){failures.push({group,error});groups.push({group,passed:false,error:fixedControlError(error),progress:fixedControlState});}
   await persist();
  }
  fixedControlState=null;const result=await persist();if(failures.length)throw failures[0].error;return result;
 }
 
@@ -1531,21 +1570,21 @@
  const verified=await verifyReductionCheckpoint(root,{consumer:true});
  const {recoverCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs'),{plain}=await import('./finite-first-connection-publication.mjs');
  const cases=group==='reduction_a'?['D1','D2']:['D3','D4'],fixtures=[],results=new Map(),shared={group,entered:Date.now(),pairReady:null,producerArtifactId:process.env.AFW_BUDGET_PRODUCER_ARTIFACT_ID,producerDigest:process.env.AFW_BUDGET_PRODUCER_DIGEST};
  let closing;
  const frames=new Map(cases.map(caseName=>{const frame={caseName,root:'output/finite-budget/reduction/'+caseName,records:[],callbacks:[],failures:[],closed:null};const record=createFixedOwnedRecord(frame,'recovery');record.attachPersist(join('output','r2-native-budget-'+caseName,'state'));return [caseName,frame];}));
  const dispose=()=>closing??=(async()=>{await Promise.allSettled([...results.values()]);const settled=await Promise.allSettled([...frames.values()].map(frame=>closeFixedOwnedFrame(frame,null)));const failure=settled.find(s=>s.status==='rejected');if(failure)throw failure.reason;})();
  try{
   // Register each fulfilled mount immediately, including a late sibling after a
   // partial rejection. No replica starts after its sibling passes C0.
   const mounts=await Promise.allSettled(cases.map(async caseName=>{
-   assertFixedBudgetAllocationSafe();const f=await fixedBudgetOwners.run(frames.get(caseName),()=>recoverCheckpoint(join(root,'native'),{label:'budget-'+caseName,restart:false,budgetQualification:true}));fixtures.push(f);f.budgetCase=caseName;
+   assertFixedBudgetAllocationSafe();const frame=frames.get(caseName),f=await fixedBudgetOwners.run(frame,async()=>{try{return await recoverCheckpoint(join(root,'native'),{label:'budget-'+caseName,restart:false,budgetQualification:true});}catch(error){throw noteFixedOwnedUnwind(frame,error);}});fixtures.push(f);f.budgetCase=caseName;
    f.budgetRootBefore=await plain(f.stub.firstConnectionAvailability());assert.equal(f.budgetRootBefore.available,true);
    const input=await plain(f.stub.finiteBudgetReduction(caseName));assert.equal(input.sameKvBinding,true);
    f.budgetInputReady=Date.now();assert(f.budgetInputReady<=f.plan.C0-30000);return f;
   }));
   const rejected=mounts.find(result=>result.status==='rejected');if(rejected)throw rejected.reason;
   shared.pairReady=Math.max(...fixtures.map(f=>f.budgetInputReady));assert(shared.pairReady<=verified.lineage.C0-30000,'both original cold replicas and input readbacks ready');
   assert.equal(fixtures.length,2);assert(fixtures.every(f=>f.recovery.manifestSha256===verified.lineage.nativeManifestSha256));
   for(const f of fixtures){const frame=frames.get(f.budgetCase),result=fixedBudgetOwners.run(frame,async()=>{let value,primary=null;try{value=await observeFixedReduction(f,f.budgetCase,shared);}catch(error){primary=error;}const ownership=await closeFixedOwnedFrame(frame,primary);value.ownership=ownership;value.diagnostics.epochs=frame.records.flatMap(r=>r.epochs);return fixedBudgetPersist('reduction/'+f.budgetCase,value);});result.catch(()=>{});results.set(f.budgetCase,result);}
   return {result(name){assert(cases.includes(name));return results.get(name);},dispose};
  }catch(error){try{await dispose();}catch(ancillary){fixedBudgetOwnerErrors.set(error,{primary:error,ancillary});}throw error;}
@@ -1595,24 +1634,264 @@
 export async function verifyBudgetArtifact(root,kind,artifactId){
  assert.match(artifactId??'',/^[1-9][0-9]*$/);
  const bytes=await readFile(join(root,'budget-artifact.json')),m=JSON.parse(bytes);
  assert.equal(m.purpose,'afw.finite-budget-artifact.syn.v1');assert.equal(m.kind,kind);assert.equal(m.source,process.env.GITHUB_SHA);assert.equal(m.run,process.env.GITHUB_RUN_ID);assert.equal(m.attempt,process.env.GITHUB_RUN_ATTEMPT);
  for(const flag of ['operationalReadiness','completePackage','PCoff'])assert.equal(m[flag],false);
  const files=await inventoryFiles(root);assert.deepEqual(files.filter(f=>f.path!=='budget-artifact.json'),m.files,'exact same-ID downloaded path/bytes/SHA inventory');
  console.info('BUDGET SAME ID READBACK VERIFIED',JSON.stringify({source:m.source,run:m.run,attempt:m.attempt,kind,artifactId,files:files.length,manifestBytes:bytes.length,manifestSha256:hash(bytes),operationalReadiness:false,completePackage:false,PCoff:false}));
  return m;
 }
 
+
+const ROUND2_OLD_PURE_SEALER="import assert from 'node:assert/strict';import {mkdir,readdir,writeFile,lstat,copyFile} from 'node:fs/promises';import {join} from 'node:path';\nimport {sealBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';\ntry{\n const dest=join(process.env.RUNNER_TEMP,'afw-pure-public');await mkdir(dest,{mode:0o700});\n for(const name of ['tests.tap','inactive.tap']){try{await copyFile(join(process.env.RUNNER_TEMP,'afw-pure-private',name),join(dest,name));}catch(error){if(error.code!=='ENOENT')throw error;}}\n for(const name of ['syntax.log','lint.log','tests.tap','inactive.tap']){try{const path=join(process.env.RUNNER_TEMP,'afw-pure-private',name),st=await lstat(path);assert(st.size<=1048576);await copyFile(path,join(dest,name));}catch(error){if(error.code!=='ENOENT')throw error;}}\n const safeNames=[\"syntax.log\",\"control-progress.json\",\"controls.json\",\"utility-readonly.json\",\"utility-reduction.json\",\"tests.log\",\"tests.tap\",\"inactive.tap\",\"inactive.json\",\"lint.log\",\"preflight.json\",\"preflight-positive.json\",\"preflight-readonly.json\",\"preflight-reduction_a.json\",\"diagnostics.json\",\"diagnostic-manifest.json\"];\n for(const name of safeNames){const file=join('output/finite-budget/pure',name);let st;try{st=await lstat(file);}catch(error){if(error.code==='ENOENT')continue;throw error;}assert(st.isFile()&&st.nlink===1);await copyFile(file,join(dest,name));}\n await writeFile(join(dest,'status.json'),JSON.stringify({status:process.env.PURE_COMPLETE==='true'?'pure_passed':'pure_failed',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT}));\n await sealBudgetArtifact(dest,'pure');\n const names=await readdir(dest);assert(names.every(name=>[...safeNames,'budget-artifact.json','status.json'].includes(name)));\n}catch{console.log('evidence_not_preserved');process.exitCode=1;}";
+async function round2F2Regression(){
+ const prepared=await prepareFixedFacetControls(),{Script,createContext}=await import('node:vm');
+ const context=createContext({setTimeout,clearTimeout,Date,performance,AbortController,Buffer});
+ const body=String.raw`
+ globalThis.__round2=(async()=>{
+  const kv={get:async()=>({}),list:async()=>({keys:[],list_complete:true}),put:async()=>{},delete:async()=>{}},owner=Object.assign(new Initial(),{env:{AFW_FINITE_OWNER_OAUTH_KV:kv},ctx:{storage:{}}}),state=__afwFiniteBudgetState(owner,'R3');
+  const subject='SYN-round2',id='AAAAAAAAAAAAAAAA',key='grant:'+subject+':'+id;state.grantKey=key;__afwFiniteBudgetInstall(owner,state);
+  const controller=new AbortController(),parent=new AbortController(),lease={signal:controller.signal},guard=()=>{},error=Error('SYN modeled ordinary work rejection');let rejectWork,rejectWait;
+  const work=new Promise((_,reject)=>{rejectWork=reject;}),wait=new Promise((_,reject)=>{rejectWait=reject;}),deadline=Date.now()-1;
+  __afwSynWork(lease,deadline,work,parent.signal);__afwSynWait(lease,wait);__afwSynSelectGuard(kv,lease,guard,1);
+  const facet=readonlyGrantKv(kv,{get:kv.get,list:kv.list},subject,guard),jobs=[];let before,after;
+  try{
+   for(let n=0;n<6;n++){const actual=facet.get(key,{type:'json'});actual.catch(()=>{});jobs.push(actual);}
+   for(let n=0;n<12;n++)await Promise.resolve();
+   rejectWork(error);for(let n=0;n<4;n++)await Promise.resolve();
+   rejectWait(error);for(let n=0;n<4;n++)await Promise.resolve();
+   controller.abort();for(let n=0;n<4;n++)await Promise.resolve();
+   before=JSON.parse(JSON.stringify(await owner.finiteBudgetSignals()));
+   await owner.finiteBudgetRelease();await Promise.allSettled(jobs);
+   after=JSON.parse(JSON.stringify(await owner.finiteBudgetSignals()));
+   return {before,after};
+  }finally{await owner.finiteBudgetRelease();await Promise.allSettled(jobs);await owner.finiteBudgetRestore();}
+ })();
+`;
+ new Script(prepared.prelude+'\n'+body).runInContext(context,{timeout:1000});const observed=await fixedControlBound(context.__round2),{before,after}=observed;
+ const child=before.children[0],events=before.observerEvents.filter(event=>event.childOrdinal===child?.childOrdinal),seq=kind=>events.find(event=>event.kind===kind)?.sequence;
+ assert.equal(child.sameWorkWaitError,true,'round2 ordinary error identity');assert.equal(child.workPendingAtAbort,false);assert(seq('child_work_rejected')<seq('child_wait_rejected')&&seq('child_wait_rejected')<seq('child_abort'),'round2 original finally order');
+ const actual=fixedChildDeadlineProof(before,after);
+ return {acceptedDeadline:actual.denialAfterDeadline===true,sameWorkWaitError:child.sameWorkWaitError,workPendingAtAbort:child.workPendingAtAbort,workStatus:child.workStatus,waitStatus:child.waitStatus,workBeforeWait:true,waitBeforeAbort:true,heldNative:before.heldNativeSettled,outwardAtDenial:before.outwardPending,originalQueue:fixedQueueCausality(before),genuineBusinessRoot:false};
+}
+async function round2ProducerContinuation(){
+ const source=await readFile('test/fixtures/finite-owner-cleanup-persistence.mjs','utf8'),blob=createHash('sha1').update('blob '+Buffer.byteLength(source)+'\0'+source).digest('hex');assert.equal(blob,'e317f58205b062adb6223a4dd5647b65e9c860b4','round2 protected producer blob');
+ const ast=sourceAST(source,'round2-protected-producer'),fn=ast.statements.filter(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='produceCheckpoint');assert.equal(fn.length,1);
+ const matches=[];const walk=node=>{if(ts.isBlock(node))for(let n=0;n+3<node.statements.length;n++){const rows=node.statements.slice(n,n+4);if(rows[0].getText(ast)==='await f.mf.dispose();'&&rows[1].getText(ast)==='f.disposedForCheckpoint=true;'){assert.equal(rows[2].getText(ast),'await mkdir(root,{recursive:true});');assert.equal(rows[3].getText(ast),"await cp(input.persist,join(root,'state'),{recursive:true,errorOnExist:true,force:false});");matches.push(source.slice(rows[0].getStart(ast),rows[3].end));}}ts.forEachChild(node,walk);};walk(fn[0]);assert.equal(matches.length,1,'round2 exact producer await continuation');
+ return matches[0];
+}
+async function round2F5Regression(){
+ const continuation=await round2ProducerContinuation(),{Script,createContext}=await import('node:vm'),cases={};
+ for(const arm of ['normal','rejection']){
+  const root=join(process.env.RUNNER_TEMP,'afw-round2-private','f5-'+arm),persist=join(root,'source');await mkdir(persist,{recursive:true});await writeFile(join(persist,'native.bin'),'SYN round2 retained inert bytes');
+  const expected=Error('SYN round2 original disposer rejection');let record,fixture,attempts=0,copies=0,outward='not_entered',outerError=null,originalRejected=false,copiedAfterDispose=false,copyWhileUncertain=false;
+  try{await withFixedBudgetOwner('positive_producer',join(root,'owned'),async()=>{
+   record=beginFixedBudgetOwnedAllocation();record.attachPersist(persist);fixture={budgetEpochs:[],stub:{},async captureBudgetEpoch(reason){fixture.budgetEpochs.push({reason,role:'QA',epoch:0});}};
+   record.attachFixture(fixture);const inertMF={async dispose(){attempts++;if(arm==='rejection'){originalRejected=true;throw expected;}}};record.attachMiniflare(inertMF);fixture.mf=record.mf;
+   const actualDispose=fixture.mf.dispose;fixture.mf.dispose=async()=>{try{const value=await Reflect.apply(actualDispose,fixture.mf,[]);outward='fulfilled';return value;}catch(error){outward='rejected';throw error;}};
+   const context=createContext({f:fixture,root:join(root,'checkpoint'),input:{persist},mkdir:async()=>{},cp:async()=>{copies++;copiedAfterDispose=record.disposed;copyWhileUncertain=record.disposalUncertain===true;},join});
+   await new Script('(async()=>{'+continuation+'})()').runInContext(context,{timeout:1000});return {};
+  });}catch(error){outerError=error;}
+  const sourceRetained=await readFile(join(persist,'native.bin')).then(()=>true,()=>false);
+  cases[arm]={originalRejected,outward,flag:fixture.disposedForCheckpoint===true,copies,copiedAfterDispose,copyWhileUncertain,disposed:record.disposed,uncertain:record.disposalUncertain===true,archived:record.archived,sourceRetained,originalAttempts:attempts,outerErrorSame:outerError===expected};
+  if(arm==='normal'){assert.equal(outerError,null);assert.equal(copies,1);assert.equal(record.disposed,true);assert.equal(record.archived,true);}
+  else{assert.equal(outerError,expected,'round2 original disposer retained as outer failure');assert.equal(attempts,1);assert.equal(record.disposalUncertain,true);assert.equal(record.archived,false);}
+ }
+ return cases;
+}
+async function round2F8Regression(){
+ const {SourceTextModule,SyntheticModule,createContext}=await import('node:vm'),fs=await import('node:fs/promises');
+ assert.equal(typeof SourceTextModule,'function','round2 SourceTextModule available');
+ const base=join(process.env.RUNNER_TEMP,'afw-round2-private','f8-sandbox');await mkdir(join(base,'afw-pure-private'),{recursive:true,mode:0o700});await mkdir(join(base,'input-pure'),{recursive:true,mode:0o700});
+ const canary='SYN_ROUND2_PRIVATE_CANARY_6a793d',raw='const sourceLine="'+canary+'";\nError: '+canary+'\n at privateStack ('+canary+')\n actual: '+canary+'\n';
+ const names=['syntax.log','lint.log','tests.tap','inactive.tap'];for(const name of names)await writeFile(join(base,'afw-pure-private',name),raw);
+ const processView={env:{RUNNER_TEMP:base,PURE_COMPLETE:'false',GITHUB_SHA:process.env.GITHUB_SHA,GITHUB_RUN_ID:process.env.GITHUB_RUN_ID,GITHUB_RUN_ATTEMPT:process.env.GITHUB_RUN_ATTEMPT},exitCode:0},context=createContext({process:processView,console:{log(){}}});
+ const map=path=>{assert.equal(typeof path,'string');if(path.startsWith('output/finite-budget/pure/'))return join(base,'input-pure',path.slice('output/finite-budget/pure/'.length));assert(resolve(path).startsWith(resolve(base)+'/'),'round2 sealer private sandbox boundary');return path;};
+ const fileExports={mkdir:(path,options)=>fs.mkdir(map(path),options),readdir:path=>fs.readdir(map(path)),writeFile:(path,data,options)=>fs.writeFile(map(path),data,options),lstat:path=>fs.lstat(map(path)),copyFile:(from,to)=>fs.copyFile(map(from),map(to))};
+ const modules=new Map(),synthetic=(name,exports)=>{if(modules.has(name))return modules.get(name);const legacySynthetic=new SyntheticModule(Object.keys(exports),function(){for(const [key,value]of Object.entries(exports))this.setExport(key,value);},{context,identifier:name});modules.set(name,legacySynthetic);return legacySynthetic;};
+ const legacySealerProgram=new SourceTextModule(ROUND2_OLD_PURE_SEALER,{context,identifier:'SYN-fixed-c72e3191-pure-sealer'});
+ await legacySealerProgram.link(specifier=>{
+  if(specifier==='node:assert/strict')return synthetic(specifier,{default:assert});
+  if(specifier==='node:fs/promises')return synthetic(specifier,fileExports);
+  if(specifier==='node:path')return synthetic(specifier,{join});
+  if(specifier==='./test/fixtures/finite-budget-world.mjs')return synthetic(specifier,{sealBudgetArtifact});
+  throw Error('round2 unknown fixed sealer import');
+ });
+ await legacySealerProgram.evaluate({timeout:1000});assert.equal(processView.exitCode,0,'round2 actual old sealer completed');
+ const destination=join(base,'afw-pure-public'),status=JSON.parse(await readFile(join(destination,'status.json'),'utf8'));let leaked=0;
+ for(const name of names){const value=await readFile(join(destination,name),'utf8');if(value.includes(canary))leaked++;}
+ return {baselineWorkflow:'c72e31919d477280c9eef39b63ca46708acb82e7',bodySha256:hash(ROUND2_OLD_PURE_SEALER),rawFiles:names.length,filesWithCanary:leaked,canaryReachedPrivateSandbox:leaked>0,sandboxOnly:true,baselineStatus:status.status};
+}
+async function verifyRound2CausalRed(){
+ const groups=[],tests=[['F2','observer_order',round2F2Regression],['F8','old_sealer_execute',round2F8Regression],['F5','producer_continuation',round2F5Regression]];
+ for(const [group,stage,run]of tests){
+  try{
+   const facts=await fixedControlBound(run()),causalDeficit=group==='F2'?facts.acceptedDeadline&&facts.sameWorkWaitError&&!facts.workPendingAtAbort&&facts.workBeforeWait&&facts.waitBeforeAbort:group==='F5'?facts.rejection.originalRejected&&facts.rejection.outward==='fulfilled'&&facts.rejection.flag&&facts.rejection.copies===1&&!facts.rejection.copiedAfterDispose&&facts.rejection.copyWhileUncertain&&facts.rejection.uncertain&&!facts.rejection.archived: facts.filesWithCanary===4&&facts.sandboxOnly;
+   groups.push({group,stage:'complete',causalDeficit,facts,error:null});
+  }catch(error){groups.push({group,stage,causalDeficit:false,facts:null,error:fixedControlError(error)});}
+ }
+ const result={purpose:'afw.round2-causal-red.safe.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,groups,expectedCausalRed:groups.length===3&&groups.every(group=>group.stage==='complete'&&group.causalDeficit),I0Opened:false,nativeExecutionProduced:false,businessCases:0,...budgetFixedFlags};
+ const root=join(process.env.RUNNER_TEMP,'afw-round2-private');await mkdir(root,{recursive:true,mode:0o700});await writeFile(join(root,'result.json'),JSON.stringify(result,null,2));
+ assert.equal(result.expectedCausalRed,true,'round2 each regression produced its named causal deficit');assert.equal(result.expectedCausalRed,false,'round2 actual causal deficits require fixes');return result;
+}
+
+
+async function runRound2DeadlineControls(){
+ const prepared=await prepareFixedFacetControls(),{Script,createContext}=await import('node:vm'),cases=[];
+ for(const variant of ['abort_wait_work','abort_work_wait','ordinary_work','same_error_race','fulfilled_guard','finally_close','missing_order','duplicate_order']){
+  const context=createContext({setTimeout,clearTimeout,Date,performance,AbortController,Buffer,__variant:variant});
+  const body=String.raw`
+  globalThis.__deadline=(async()=>{
+   const kv={get:async()=>null,list:async()=>null,put:async()=>null,delete:async()=>null},owner=Object.assign(new Initial(),{env:{AFW_FINITE_OWNER_OAUTH_KV:kv},ctx:{storage:{}}}),state=__afwFiniteBudgetState(owner,'R3'),controller=new AbortController(),parent=new AbortController(),lease={signal:controller.signal};
+   let resolveWork,rejectWork,rejectWait;const work=new Promise((resolve,reject)=>{resolveWork=resolve;rejectWork=reject;}),wait=new Promise((_,reject)=>{rejectWait=reject;}),E=Error('SYN fixed work'),D=Error('SYN fixed denial'),deadline=Date.now()-1;
+   const flush=async()=>{for(let n=0;n<5;n++)await Promise.resolve();};
+   if(__afwSynWork(lease,deadline,work,parent.signal)!==work||__afwSynWait(lease,wait)!==wait)throw Error('SYN deadline Promise identity');
+   __afwSynSelectGuard(kv,lease,()=>{},1);
+   let before,after;
+   try{
+    if(__variant==='ordinary_work'){rejectWork(E);await flush();rejectWait(E);await flush();controller.abort();await flush();}
+    else if(__variant==='finally_close'){rejectWait(D);await flush();controller.abort();await flush();}
+    else{
+     controller.abort();await flush();
+     if(__variant==='abort_work_wait'||__variant==='same_error_race'){rejectWork(E);await flush();rejectWait(__variant==='same_error_race'?E:D);await flush();}
+     else if(__variant==='fulfilled_guard'){resolveWork(null);await flush();rejectWait(D);await flush();}
+     else{rejectWait(D);await flush();}
+    }
+    before=JSON.parse(JSON.stringify(await owner.finiteBudgetSignals()));
+    resolveWork(null);await flush();after=JSON.parse(JSON.stringify(await owner.finiteBudgetSignals()));
+    return {before,after,promiseIdentity:true};
+   }finally{controller.abort();resolveWork(null);rejectWait(D);await Promise.allSettled([work,wait]);await owner.finiteBudgetRelease();await owner.finiteBudgetRestore();}
+  })();
+`;
+  new Script(prepared.prelude+'\n'+body).runInContext(context,{timeout:1000});const observed=await fixedControlBound(context.__deadline);
+  if(variant==='missing_order')observed.after.observerEvents=observed.after.observerEvents.filter(event=>event.kind!=='child_abort');
+  if(variant==='duplicate_order')observed.after.observerEvents.push({...observed.after.observerEvents.find(event=>event.kind==='child_abort')});
+  const actual=classifyFixedChildDeadline(observed.before,observed.after),expected=['abort_wait_work','abort_work_wait'].includes(variant)?'confirmed_deadline':variant==='ordinary_work'?'propagated_work':variant==='finally_close'?'close_abort':'indeterminate';
+  assert.equal(actual.classification,expected,'fixed child causal discriminator '+variant);
+  cases.push({variant,classification:actual.classification,denialAfterDeadline:actual.denialAfterDeadline,promiseIdentity:observed.promiseIdentity,genuineBusinessRoot:false});
+ }
+ return cases;
+}
+async function round2CurrentProducerParts(){
+ const source=await readFile('test/fixtures/finite-owner-cleanup-persistence.mjs','utf8'),ast=sourceAST(source,'round2-current-producer'),functions=name=>ast.statements.filter(node=>ts.isFunctionDeclaration(node)&&node.name?.text===name);
+ const producer=functions('produceCheckpoint');assert.equal(producer.length,1);const tries=producer[0].body.statements.filter(ts.isTryStatement);assert.equal(tries.length,1);const current=tries[0];assert(current.catchClause&&current.finallyBlock);
+ const rows=current.tryBlock.statements,matches=[];
+ for(let n=0;n+3<rows.length;n++)if(rows[n].getText(ast)==='await f.mf.dispose();'&&rows[n+1].getText(ast)==='f.disposedForCheckpoint=true;'){assert.equal(rows[n+2].getText(ast),'await mkdir(root,{recursive:true});');assert.equal(rows[n+3].getText(ast),"await cp(input.persist,join(root,'state'),{recursive:true,errorOnExist:true,force:false});");matches.push(source.slice(rows[n].getStart(ast),rows[n+3].end));}
+ assert.equal(matches.length,1,'current original producer continuation exactly once');
+ assert(current.catchClause.getText(ast).includes("noteFixedBudgetOwnedFailure(error,'producer_operation')"));assert(current.finallyBlock.getText(ast).includes("noteFixedBudgetOwnedFailure(error,'producer_evidence')"));
+ const recovery=functions('recoverCheckpoint');assert.equal(recovery.length,1);const recoveries=recovery[0].body.statements.filter(ts.isTryStatement);assert.equal(recoveries.length,1);const recoveryCatch=recoveries[0].catchClause.getText(ast);assert(recoveryCatch.includes("noteFixedBudgetOwnedFailure(error,'recovery_operation')"));
+ return {continuation:matches[0],catchText:current.catchClause.getText(ast),finallyText:current.finallyBlock.getText(ast),recoveryCatch,proof:{blob:createHash('sha1').update('blob '+Buffer.byteLength(source)+'\0'+source).digest('hex'),continuationSha256:hash(matches[0]),catchSha256:hash(current.catchClause.getText(ast)),finallySha256:hash(current.finallyBlock.getText(ast)),recoveryCatchSha256:hash(recoveryCatch),continuations:1}};
+}
+const round2OwnedCases=['normal','dispose_reject','operation_dispose','evidence_dispose','operation_evidence_dispose','recovery_dispose','callback_dispose_sibling'];
+async function runRound2OwnedCase(name){
+ assert(round2OwnedCases.includes(name));assert(process.env.RUNNER_TEMP&&process.env.GITHUB_SHA);const root=join(process.env.RUNNER_TEMP,'afw-round2-fixed-owned',name),persist=join(root,'source');await mkdir(persist,{recursive:true});await writeFile(join(persist,'native.bin'),'SYN fixed round2 inert bytes');
+ const parts=await round2CurrentProducerParts(),{Script,createContext}=await import('node:vm'),E=Error('SYN operation'),F=Error('SYN evidence'),D=Error('SYN disposer'),A=Error('SYN callback'),B=Error('SYN sibling');const trace=[];let record,fixture,actual=null,attempts=0,copies=0,afterDisposed=false,cleanupCalls=0;
+ const stage={subcase:name,stage:'setup',primary:null,cleanup:[]};const progress=async()=>writeFile(join(root,'progress.json'),JSON.stringify(stage));await progress();
+ try{await withFixedBudgetOwner(name==='callback_dispose_sibling'?'R1':'positive_producer',join(root,'owned'),async()=>{
+  record=beginFixedBudgetOwnedAllocation();record.attachPersist(persist);fixture={budgetEpochs:[],stub:{
+   async finiteBudgetRelease(){trace.push('syn_release');},async finiteBudgetRestore(){trace.push('syn_restore');},
+   async ownerReferenceControl(){trace.push('legacy_release');},async firstConnectionRestore(){trace.push('legacy_restore');if(name==='callback_dispose_sibling')throw A;},async restoreMethods(){trace.push('legacy_methods');}
+  },async captureBudgetEpoch(reason){trace.push('capture');fixture.budgetEpochs.push({reason,role:'QA',epoch:0});},
+  async cleanup(){cleanupCalls++;trace.push('cleanup');if(await record.beforeDelete()){trace.push('delete');await rm(persist,{recursive:true});}else trace.push('skip_unsafe');}};
+  record.attachFixture(fixture);record.attachMiniflare({async dispose(){attempts++;trace.push('dispose');if(name!=='normal')throw D;}});fixture.mf=record.mf;
+  if(name==='callback_dispose_sibling'){
+   const extracted=await fixedOriginalFixtureCleanup(),context=createContext({__fixedOwnedFixture:fixture,budgetQualification:true,noteFixedBudgetOwnedFailure}),callback=new Script('(function(f){return '+extracted.source+';})(__fixedOwnedFixture)').runInContext(context,{timeout:1000});
+   registerFixedOwnedCleanup(async()=>{trace.push('sibling');throw B;});registerFixedOwnedCleanup(async()=>{stage.stage='callback';await progress();try{await callback();}catch(error){stage.primary=fixedControlError(error);await progress();throw error;}});return {};
+  }
+  const evidenceFailure=['evidence_dispose','operation_evidence_dispose'].includes(name),context=createContext({f:fixture,mf:fixture.mf,E,budgetQualification:true,noteFixedBudgetOwnedFailure,root:join(root,'checkpoint'),input:{persist},process:{env:{GITHUB_SHA:process.env.GITHUB_SHA}},json:JSON.stringify,join,
+   mkdir:async path=>{if(evidenceFailure&&path==='output/finite-budget/producer'){trace.push('evidence_failure');throw F;}trace.push('mkdir');},
+   writeFile:async()=>{trace.push('evidence_write');},cp:async()=>{copies++;afterDisposed=record.disposed;trace.push('copy');}});
+  const body=name==='recovery_dispose'?'try{throw E;}'+parts.recoveryCatch:'try{'+(['operation_dispose','operation_evidence_dispose'].includes(name)?'throw E;':['normal','dispose_reject'].includes(name)?parts.continuation:'')+'}'+parts.catchText+'finally'+parts.finallyText;
+  stage.stage='actual_body';await progress();try{await new Script('(async()=>{'+body+'})()').runInContext(context,{timeout:1000});}catch(error){stage.primary=fixedControlError(error);await progress();throw error;}return {};
+ });}catch(error){actual=error;}
+ const expected=name==='normal'?null:name==='callback_dispose_sibling'?A:['operation_dispose','operation_evidence_dispose','recovery_dispose'].includes(name)?E:name==='evidence_dispose'?F:D,saved=actual?fixedBudgetOwnerErrors.get(actual):null,errors=saved?.failures.map(value=>value.error)??[];
+ stage.stage='assert';stage.primary=actual?fixedControlError(actual):null;stage.cleanup=saved?.failures.map(value=>({phase:value.phase,error:fixedControlError(value.error)}))??[];await progress();
+ assert.equal(actual,expected,'current exact Node primary identity '+name);assert.equal(attempts,1,'one original disposer attempt');assert.equal(copies,name==='normal'?1:0);assert.equal(fixture.disposedForCheckpoint===true,name==='normal');
+ if(name==='normal'){assert(afterDisposed);assert(record.disposed&&record.archived);assert.equal(saved,null);}
+ else{
+  assert(record.disposalUncertain&&!record.disposed&&!record.archived);assert.equal(await readFile(join(persist,'native.bin'),'utf8'),'SYN fixed round2 inert bytes');assert(!trace.includes('delete'));assert.throws(()=>assertFixedBudgetAllocationSafe(),'uncertainty blocks next allocation');
+  if(expected!==D){assert(errors.includes(D),'disposer retained ancillary');assert.equal(errors.filter(error=>error===D).length,1,'propagation deduplicated by identity');}
+  if(name==='operation_evidence_dispose')assert(errors.includes(F));if(name==='callback_dispose_sibling'){assert(errors.includes(B));assert(trace.includes('sibling'));assert(trace.indexOf('legacy_restore')<trace.indexOf('dispose'));}
+ }
+ const result={subcase:name,passed:true,stage:'complete',originalAttempts:attempts,copies,cleanupCalls,flag:fixture.disposedForCheckpoint===true,copyAfterDispose:afterDisposed,primarySame:true,ancillaryCount:errors.length,disposeAncillaryOnce:expected===D?null:errors.filter(error=>error===D).length,sourceRetained:name==='normal'?null:true,poisonPreserved:name!=='normal',exactCurrentBodies:parts.proof,noMF:true,I0Opened:false};
+ await writeFile(join(root,'result.json'),JSON.stringify(result));return result;
+}
+async function runRound2OwnedControls(){
+ const {execFile}=await import('node:child_process'),cases=[];
+ for(const name of round2OwnedCases){
+  fixedControlProgress('round2_owned_child',{subcase:name,stage:'start'});
+  try{
+   await new Promise((resolve,reject)=>execFile(process.execPath,['--experimental-vm-modules','test/fixtures/finite-budget-world.mjs','verify-round2-owned-case',name],{timeout:8000,maxBuffer:65536,env:{...process.env,AFW_BUDGET_GROUP:undefined}},error=>error?reject(error):resolve()));
+   const value=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-round2-fixed-owned',name,'result.json'),'utf8'));assert.equal(value.subcase,name);assert.equal(value.passed,true);cases.push(value);
+  }catch(error){
+   let progress=null;try{progress=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-round2-fixed-owned',name,'progress.json'),'utf8'));}catch{}
+   fixedControlProgress('round2_owned_child',{subcase:name,stage:'failed',progress,error:fixedControlError(error)});throw error;
+  }
+ }
+ return cases;
+}
+
+
+function fixedCurrentSealerProgram(workflow){
+ const heading='      - name: Seal a closed pure evidence directory\n',next='\n      - name: Upload finite-budget-pure only',steps=workflow.split(heading);assert.equal(steps.length,2,'actual current sealer step exactly once');
+ const divided=steps[1].split(next);assert.equal(divided.length,2,'actual current next upload heading exactly once');const step=divided[0],opening="          node --input-type=module <<'NODE'\n",starts=[...step.matchAll(/^ {10}node --input-type=module <<'NODE'\n/gm)],ends=[...step.matchAll(/^ {10}NODE(?:\n|$)/gm)];
+ assert.equal(starts.length,1,'current sealer single opening frame');assert.equal(ends.length,1,'current sealer single closing frame');const start=starts[0].index+opening.length,end=ends[0].index;assert(start<end,'current sealer ordered frame');assert.equal(step.slice(end+ends[0][0].length).trim(),'','current sealer closed trailing frame');
+ const interior=step.slice(start,end),lines=interior.split('\n'),source=lines.map((line,index)=>{if(index===lines.length-1&&line==='')return '';assert(line.startsWith('          '),'current sealer interior indentation');return line.slice(10);}).join('\n');
+ assert(source.endsWith('\n'),'current sealer complete final interior line');assert.notEqual(source.trimEnd().split('\n').at(-1),'NODE','current sealer no bare closing marker');assert.equal(source.split('AFW_CLOSED_PURE_SEALER_V2').length,2,'current sealer identity');return source;
+}
+function fixedSealerFrameControls(workflow){
+ const boundary="\n          NODE\n      - name: Upload finite-budget-pure only";assert.equal(workflow.split(boundary).length,2);const eof=fixedCurrentSealerProgram(workflow),newline=fixedCurrentSealerProgram(workflow.replace(boundary,"\n          NODE\n\n      - name: Upload finite-budget-pure only"));assert.equal(eof,newline,'current sealer EOF/newline identical interior');
+ const mutations=[
+  workflow.replace(boundary,"\n      - name: Upload finite-budget-pure only"),
+  workflow.replace(boundary,"\n          NODE\n          NODE\n      - name: Upload finite-budget-pure only"),
+  workflow.replace(boundary,"\n         NODE\n      - name: Upload finite-budget-pure only"),
+  workflow.replace("          node --input-type=module <<'NODE'\n          import assert from 'node:assert/strict';\n          import {readFile,writeFile,mkdir,readdir,lstat}","          import assert from 'node:assert/strict';\n          import {readFile,writeFile,mkdir,readdir,lstat}"),
+  workflow.replace("          node --input-type=module <<'NODE'\n          import assert from 'node:assert/strict';\n          import {readFile,writeFile,mkdir,readdir,lstat}","          node --input-type=module <<'NODE'\n          node --input-type=module <<'NODE'\n          import assert from 'node:assert/strict';\n          import {readFile,writeFile,mkdir,readdir,lstat}")
+ ];for(const changed of mutations){assert.notEqual(changed,workflow,'actual fixed frame mutation reached');assert.throws(()=>fixedCurrentSealerProgram(changed),'current invalid sealer frame rejected');}
+ return {variant:'current_framing',passed:true,eofNewlineInteriorSame:true,invalidFramesRejected:mutations.length,actualSealerSha256:hash(eof)};
+}
+
+async function runRound2SealerControls(){
+ fixedControlProgress('round2_sealer');
+ const workflow=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8'),framing=fixedSealerFrameControls(workflow),source=fixedCurrentSealerProgram(workflow);
+ const {Script,SourceTextModule,SyntheticModule,createContext}=await import('node:vm'),fs=await import('node:fs/promises'),cases=[framing],canary='SYN_ROUND2_PRIVATE_CANARY_6a793d',raw='const source="'+canary+'";\nError: '+canary+'\n at privateStack('+canary+')\n actual: '+canary+'\n';
+ for(const variant of ['failed_logs','unknown_field','unknown_string']){
+  const base=join(process.env.RUNNER_TEMP,'afw-round2-fixed-sealer',variant),privateRoot=join(base,'afw-pure-private'),input=join(base,'input-pure');await mkdir(privateRoot,{recursive:true,mode:0o700});await mkdir(input,{recursive:true,mode:0o700});
+  for(const name of ['syntax.log','lint.log','tests.tap','inactive.tap'])await writeFile(join(privateRoot,name),raw);
+  const q={tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0};if(variant==='unknown_field')q.sourceLine=raw;if(variant==='unknown_string')q.tests=canary;await writeFile(join(input,'q-counts.json'),JSON.stringify(q));
+  const processView={env:{RUNNER_TEMP:base,PURE_COMPLETE:'false',GITHUB_SHA:process.env.GITHUB_SHA,GITHUB_RUN_ID:process.env.GITHUB_RUN_ID,GITHUB_RUN_ATTEMPT:process.env.GITHUB_RUN_ATTEMPT},exitCode:0},context=createContext({process:processView,Buffer,console:{log(){}}});
+  const map=path=>{if(path==='test/fixtures/finite-budget-descriptors.json')return path;if(path.startsWith('output/finite-budget/pure/'))return join(input,path.slice('output/finite-budget/pure/'.length));assert(resolve(path).startsWith(resolve(base)+'/'),'fixed current sealer private sandbox');return path;};
+  const vmIntrinsics=new Script('({Array,from:Array.from})').runInContext(context,{timeout:1000}),vmArray=vmIntrinsics.Array,vmArrayFrom=vmIntrinsics.from;
+  const marshalDirectoryNames=names=>{assert(Array.isArray(names)&&names.every(name=>typeof name==='string'),'fixed directory name array');const values=Reflect.apply(vmArrayFrom,vmArray,[names]);assert.equal(values.constructor,vmArray);assert.equal(Object.getPrototypeOf(values),vmArray.prototype);assert.equal(values.length,names.length);for(let n=0;n<names.length;n++)assert.equal(values[n],names[n]);return values;};
+  const fixedReaddir=async path=>marshalDirectoryNames(await fs.readdir(map(path)));
+  if(variant==='failed_logs'){
+   const empty=join(base,'realm-empty'),extra=join(base,'realm-extra'),ordered=join(base,'realm-ordered');await mkdir(empty,{mode:0o700});await mkdir(extra,{mode:0o700});await mkdir(ordered,{mode:0o700});await writeFile(join(extra,'SYN-extra'),'SYN');await writeFile(join(ordered,'SYN-first'),'SYN');await writeFile(join(ordered,'SYN-second'),'SYN');
+   const originalEmpty=await fs.readdir(empty),originalExtra=await fs.readdir(extra),originalOrdered=await fs.readdir(ordered);assert.equal(originalEmpty.length,0);assert.equal(originalExtra.length,1);assert.equal(originalOrdered.length,2);
+   assert.equal(process.versions.node,'22.23.4');context.__fixedRealmNode=process.versions.node;context.__fixedRealmHostEmpty=originalEmpty;context.__fixedRealmEmpty=marshalDirectoryNames(originalEmpty);context.__fixedRealmExtra=marshalDirectoryNames(originalExtra);context.__fixedRealmOrdered=marshalDirectoryNames(originalOrdered);context.__fixedRealmHostOrdered=originalOrdered;
+  }
+  const exports={readFile:(path,options)=>fs.readFile(map(path),options),writeFile:(path,data,options)=>fs.writeFile(map(path),data,options),mkdir:(path,options)=>fs.mkdir(map(path),options),readdir:fixedReaddir,lstat:path=>fs.lstat(map(path))},modules=new Map(),synthetic=(name,values)=>{if(modules.has(name))return modules.get(name);const currentSynthetic=new SyntheticModule(Object.keys(values),function(){for(const[key,value]of Object.entries(values))this.setExport(key,value);},{context,identifier:name});modules.set(name,currentSynthetic);return currentSynthetic;};
+  const currentSealerProgram=new SourceTextModule(source+(variant==='failed_logs'?"\nglobalThis.__fixedCurrentInventoryProof=(()=>{\n const expected=expectedInventory('QA'),records=expected.map(path=>({path})),overlap='lib/mcp-qa-finite-owner-native-receiver.mjs',raw=[...descriptors.sourceDescriptors,...descriptors.packages,...descriptors.implementationSupplement.scopeInputPins].filter(row=>row.roles.includes('QA')).map(row=>row.path);raw.push('<stdin>');\n same(raw.filter(path=>path===overlap).length,2);same(expected.filter(path=>path===overlap).length,1);same(expected.length,115);same(expectedInventory('M').length,61);verifyExpectedInventory(records,'QA');\n let rejected=0;for(const changed of [[...records,{path:overlap}],records.slice(1),[...records.slice(1),{path:'<SYN-unknown-input>'}]]){\n  let failed=false;try{verifyExpectedInventory(changed,'QA');}catch{failed=true;}same(failed,true);rejected++;\n }\n return {variant:'current_inventory',passed:true,rawQaExpected:raw.length,uniqueQaExpected:expected.length,categoryOverlap:2,actualDuplicateUnknownMissingRejected:rejected};\n})();\n\nglobalThis.__fixedCurrentRealmProof=(()=>{\n let originalRejected=false,extraRejected=false;\n try{same(__fixedRealmHostEmpty,[]);}catch(error){same(error.code,'ERR_ASSERTION');originalRejected=true;}\n same(originalRejected,true);same(Object.getPrototypeOf(__fixedRealmHostEmpty)===Array.prototype,false);\n same(__fixedRealmEmpty,[]);\n try{same(__fixedRealmExtra,[]);}catch(error){same(error.code,'ERR_ASSERTION');extraRejected=true;}same(extraRejected,true);\n for(const values of [__fixedRealmEmpty,__fixedRealmExtra,__fixedRealmOrdered]){same(values.constructor,Array);same(Object.getPrototypeOf(values),Array.prototype);}\n same(__fixedRealmOrdered.length,__fixedRealmHostOrdered.length);for(let n=0;n<__fixedRealmHostOrdered.length;n++)same(__fixedRealmOrdered[n],__fixedRealmHostOrdered[n]);\n return {variant:'current_realm_array',passed:true,originalHostEmptyRejected:originalRejected,marshalledEmptyAccepted:true,marshalledExtraEntryRejected:extraRejected,vmConstructorAndPrototypeExact:true,valuesAndOrderPreserved:true,orderedEntries:__fixedRealmOrdered.length,node:__fixedRealmNode};\n})();\n":''),{context,identifier:'SYN-current-fixed-closed-sealer'});await currentSealerProgram.link(name=>{if(name==='node:assert/strict')return synthetic(name,{default:assert});if(name==='node:fs/promises')return synthetic(name,exports);if(name==='node:crypto')return synthetic(name,{createHash});if(name==='node:path')return synthetic(name,{join});throw Error('SYN current sealer unknown import');});await currentSealerProgram.evaluate({timeout:1000});
+  if(variant==='failed_logs'){assert(context.__fixedCurrentInventoryProof);cases.push(JSON.parse(JSON.stringify(context.__fixedCurrentInventoryProof)));assert(context.__fixedCurrentRealmProof);cases.push(JSON.parse(JSON.stringify(context.__fixedCurrentRealmProof)));}
+  assert.equal(processView.exitCode,0,'actual current failure sealer preserved closed evidence');const dest=join(base,'afw-pure-public'),names=await readdir(dest),status=JSON.parse(await readFile(join(dest,'status.json'),'utf8'));assert(names.every(name=>name.endsWith('.json')));assert.equal(status.status,'pure_failed');assert.equal(status.rawObservations.length,4);assert.equal(status.validationFailures.length,variant==='failed_logs'?0:1);
+  for(const name of names){const text=await readFile(join(dest,name),'utf8');assert(!text.includes(canary)&&!text.includes('privateStack')&&!text.includes('const source='),'current sealer rejected raw bytes');}
+  assert.equal(names.includes('q-counts.json'),variant==='failed_logs');const manifest=JSON.parse(await readFile(join(dest,'budget-artifact.json'),'utf8'));assert.deepEqual((await inventoryFiles(dest)).filter(file=>file.path!=='budget-artifact.json'),manifest.files);
+  cases.push({variant,passed:true,actualSealerSha256:hash(source),rawInputs:4,publicRawFiles:0,canaryPublished:false,malformedRejected:variant==='failed_logs'?null:true,closedFailurePreserved:true,sandboxOnly:true});
+ }
+ return cases;
+}
+
 if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const main=async()=>{
   const [command,root]=process.argv.slice(2);
-  if(command==='preflight-budget')await preflightBudgetCompilation();
+  if(command==='verify-round2-owned-case')await runRound2OwnedCase(root);
+  else if(command==='verify-round2-red')await verifyRound2CausalRed();
+  else if(command==='preflight-budget')await preflightBudgetCompilation();
   else if(command==='prepare-positive-probe')await preparePositiveProbe(root);
   else if(command==='prepare-positive')await prepareBudgetProducer('positive',root);
   else if(command==='prepare-reduction')await prepareBudgetProducer('reduction',root);
   else if(command==='verify-reduction')await verifyBudgetCheckpoint('reduction',root);
   else if(command==='verify-pair-disposer')await verifyFixedPairDisposer();
   else if(command==='verify-native-preparation-round1')await verifyNativePreparationRound1();
   else if(command==='verify-positive')await verifyBudgetCheckpoint('positive',root);
   else if(command==='inspect-budget-graphs')await inspectBudgetCompilation(root);
   else throw Error('SYN budget command unsupported before I0');
  };

`````

### test/fixtures/finite-owner-cleanup-persistence.mjs

`````diff
diff --git a/test/fixtures/finite-owner-cleanup-persistence.mjs b/test/fixtures/finite-owner-cleanup-persistence.mjs
# before_blob=e317f58205b062adb6223a4dd5647b65e9c860b4 after_blob=e0dda1fd3d66c1864fd0b20f873c7fc0c452f6d8
--- a/test/fixtures/finite-owner-cleanup-persistence.mjs
+++ b/test/fixtures/finite-owner-cleanup-persistence.mjs
@@ -1,21 +1,21 @@
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {mkdir,readFile,writeFile,readdir,cp} from 'node:fs/promises';
 import {resolve,join,relative} from 'node:path';
 import {pathToFileURL} from 'node:url';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,downstreamOwnerReference,recordOwnerReference,cleanupMTransport,readCleanupM,cleanupMProfile,classifyCleanupMDenial} from './finite-owner-cleanup.mjs';
 import {createInitialEntrySynOutbound} from './finite-initial-entry-world.mjs';
 import {plain,compileCleanupSdkOnlyWorker,compileFirstConnectionCandidate} from './finite-first-connection-publication.mjs';
 import {build} from 'esbuild';
-import {attachBudgetEpochCapture} from './finite-budget-world.mjs';
+import {attachBudgetEpochCapture,noteFixedBudgetOwnedFailure} from './finite-budget-world.mjs';
 
 const P='afw.finite-initial-cleanup.v1:',sha=x=>createHash('sha256').update(x).digest('hex');
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const json=x=>JSON.stringify(x,null,2);
 export const principalName='R2 original alarm restores the produced current cycle at real C0';
 export async function waitUntil(at){while(Date.now()<at)await pause(Math.min(1000,at-Date.now()));}
 function beneath(root,path){const rel=relative(resolve(root),resolve(path));assert(rel&&!rel.startsWith('..')&&!resolve(rel).startsWith('/../'));return resolve(path);}
 async function inventory(root){
  const files=[];async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);assert(!item.isSymbolicLink(),'SYN evidence cannot contain symlink');if(item.isDirectory())await walk(path);else{assert(item.isFile());const b=await readFile(path);files.push({path:relative(root,path).replaceAll('\\','/'),bytes:b.length,sha256:sha(b)});}}}
  await walk(root);return files.sort((a,b)=>a.path.localeCompare(b.path));
@@ -131,21 +131,21 @@
   await mkdir(root,{recursive:true});await cp(input.persist,join(root,'state'),{recursive:true,errorOnExist:true,force:false});
   await cp('output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256,join(root,'graphs'),{recursive:true,errorOnExist:true,force:false});
   await writeFile(join(root,'checkpoint.json'),json(data));
   if(budgetQualification)await cp('output/owner-reference/r2-produced-'+variant+'.json',join(root,'owner-reference.json'),{errorOnExist:true,force:false});
   const files=await inventory(root),manifest={purpose:'afw.owner-cleanup-checkpoint.syn.v1',source:process.env.GITHUB_SHA,I0:plan.I0,C0:plan.C0,C1:plan.C1,files,nativeClock: facts.dbNow,operationalReadiness:false,completePackage:false,PCoff:false,custodyReal:false};
   await writeFile(join(root,'manifest.json'),json(manifest));await verifyCheckpoint(root);
   console.info('R2 checkpoint produced',json({source:manifest.source,I0:plan.I0,C0:plan.C0,C1:plan.C1,nativeDbNow:facts.dbNow,files:files.length,manifestSha256:sha(await readFile(join(root,'manifest.json'))),modeledProviderInput:data.modeledProviderInput}));
   await f.cleanup();if(!deferWait)await waitUntil(plan.C0-120000);
   assert(Date.now()<started+885000,'export/upload margin exhausted');
   return manifest;
- }finally{if(f&&!f.disposedForCheckpoint){try{if(budgetQualification){await f.captureBudgetEpoch('producer-failure-before-dispose');await mkdir('output/finite-budget/producer',{recursive:true});await writeFile('output/finite-budget/producer/failure-epochs.json',json({source:process.env.GITHUB_SHA,epochs:f.budgetEpochs}));}}finally{try{await f.mf.dispose();}finally{await f.cleanup();}}}}
+ }catch(error){if(budgetQualification)noteFixedBudgetOwnedFailure(error,'producer_operation');throw error;}finally{if(f&&!f.disposedForCheckpoint){try{if(budgetQualification){await f.captureBudgetEpoch('producer-failure-before-dispose');await mkdir('output/finite-budget/producer',{recursive:true});await writeFile('output/finite-budget/producer/failure-epochs.json',json({source:process.env.GITHUB_SHA,epochs:f.budgetEpochs}));}}catch(error){if(budgetQualification)noteFixedBudgetOwnedFailure(error,'producer_evidence');throw error;}finally{try{await f.mf.dispose();}finally{await f.cleanup();}}}}
 }
 export async function recoverCheckpoint(root,{label='principal',restart=false,budgetQualification=false}={}){
  const {data,manifest}=await verifyCheckpoint(root);
  if(budgetQualification){assert.equal(restart,false);assert.equal(data.budget?.purpose,'afw.finite-budget-checkpoint.syn.v1');assert.equal(data.budget.source,process.env.GITHUB_SHA);}
  if(!restart)assert(Date.now()+30000<data.plan.C0,'native recovery requires >=30s original pre-C0 margin');
  else assert(Date.now()+10000<data.plan.C1,'native restart requires original C1 margin');
  const dest=beneath('output',join('output','r2-native-'+label));await mkdir(dest,{recursive:true});
  await cp(join(root,'state'),join(dest,'state'),{recursive:true,errorOnExist:true,force:false});
  const originalFiles=manifest.files.filter(x=>x.path.startsWith('state/')).map(x=>({...x,path:x.path.slice(6)}));
  assert.deepEqual(await inventory(join(dest,'state')),originalFiles);
@@ -164,21 +164,21 @@
   const current=await plain(f.stub.ownerCleanupFacts());
   if(!restart){assert.equal(current.alarm,data.plan.C0);assert.equal(current.signal.entered,0);assert(Date.now()<data.plan.C0);}
   assert(Math.abs(current.dbNow-current.wall)<=1000);assert(current.dbNow>=data.facts.dbNow);
   assert.deepEqual(current.rows,data.facts.rows,'cold load preserves original native rows exactly before alarm');
   const mKv=await mf.getKVNamespace('OAUTH_KV','canary-first-connection'),qaKv=await mf.getKVNamespace('AFW_FINITE_OWNER_OAUTH_KV','qa-first-connection');
   for(const kv of [mKv,qaKv]){const value=await kv.get(data.kvProof.key);assert.equal(typeof value,'string');assert.equal(sha(value),data.kvProof.valueHash,'same non-expirable client after cold load');}
   f.negative=await mf.getWorker('negative-first-connection');f.m=cleanupMTransport(mf,{currentMountedOptions:options,expectedModuleHash:data.build.M.sha256});if(data.sdkOnlyBuild)f.sdkOnly=await mf.getWorker('sdk-only-first-connection');f.kv=mKv;f.kvSemanticProof={keyHash:data.kvProof.keyHash,valueHash:data.kvProof.valueHash,bothAliases:true,expires:false};
   await f.stub.ownerCleanupFault('normal');
   f.plan=data.plan;f.checkpoint=data;f.directory=dest;f.recovery={entered,ready:Date.now(),nativeDbNow:current.dbNow,manifestSha256:sha(await readFile(join(root,'manifest.json')))};
   return f;
- }catch(error){await mf.dispose();throw error;}
+ }catch(error){if(budgetQualification)noteFixedBudgetOwnedFailure(error,'recovery_operation');await mf.dispose();throw error;}
 }
 export async function observeOriginalAlarm(f,{settled=1}={}){
  const until=f.plan.C1;
  for(;;){const signal=await plain(f.stub.ownerCleanupSignal());if(signal.settled>=settled){assert(signal.at>=f.plan.C0);return await plain(f.stub.ownerCleanupFacts());}assert(Date.now()<until,'original native alarm observation deadline');await pause(250);}
 }
 export async function writeCleanupEvidence(name,value){await mkdir('output/owner-cleanup',{recursive:true});await writeFile('output/owner-cleanup/'+name+'.json',json(value));}
 
 export async function produceGroup(group,root){
  assert(['g0','g1','g2','g3','g4','g5','g6','g7'].includes(group));await mkdir(root,{recursive:true});
  const variants=group==='g1'?['grant-before-link','notice-before-link']:['principal'],lineages=[];

`````

### test/fixtures/finite-owner-cleanup.mjs

`````diff
diff --git a/test/fixtures/finite-owner-cleanup.mjs b/test/fixtures/finite-owner-cleanup.mjs
# before_blob=cda4ab10544fc8be127aa7a89f86b74141784dd3 after_blob=2f5dad6c306fac1be2f11845bef640bb204ad572
--- a/test/fixtures/finite-owner-cleanup.mjs
+++ b/test/fixtures/finite-owner-cleanup.mjs
@@ -1,10 +1,11 @@
+import {noteFixedBudgetOwnedFailure} from './finite-budget-world.mjs';
 import {persistBudgetEvidence} from './finite-budget-evidence.mjs';
 import {build as buildCleanupComponent} from 'esbuild';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {mkdir,writeFile} from 'node:fs/promises';
 import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
 import {initialEntryHarness} from './finite-initial-entry-world.mjs';
 import {plain,approveFirstConnection,readFirstConnectionProbe} from './finite-first-connection-publication.mjs';
 import {sealFiniteOwnerIssuerProvenanceRecord as seal} from '../../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';
@@ -106,21 +107,21 @@
  for(const marker of ["async function issuerCall(op,window,call){","async function localPreparation(kind,record,call,readBack,rowName,inventorySuffix=null){"]){assert.equal(source.split(marker).length,2);const name=marker.includes('issuerCall')?'op':'kind';source=source.replace(marker,()=>marker+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:"+name+",at:performance.now()});");}
  const pair="(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});";assert.equal(source.split(pair).length,2);
  source=source.replace(pair,()=>pair+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:'source-pair',elapsedMs:performance.now()-observedAt,at:performance.now()});");
  const io="const io={kind:'observer',method:'GET',bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};";assert.equal(source.split(io).length,2);source=source.replace(io,()=>io+"io.enteredAt=performance.now();io.childStartedAt=globalThis.__r1ReferenceState?.activeMetric?.startedAt??null;");
  const guard="io.reads++;io.bytes+=part.value?.byteLength??0;current(l);";assert.equal(source.split(guard).length,2);source=source.replace(guard,()=>"io.reads++;io.bytes+=part.value?.byteLength??0;const guardAt=performance.now();try{current(l);}finally{io.bodyGuardMs=(io.bodyGuardMs??0)+performance.now()-guardAt;}");
  const settled="io.settled=true;}";assert.equal(source.split(settled).length,2);source=source.replace(settled,()=>"io.elapsedMs=performance.now()-io.enteredAt;io.settled=true;}");
  return source;
 }
 export async function ownerReferenceFixture(t,{cleanupCheckpoint=false,budgetQualification=false}={}){
  const f=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint,budgetQualification});f.cleanupQualification=cleanupCheckpoint;
- t.after(async()=>{try{await f.stub.ownerReferenceControl('released').catch(()=>{});await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}finally{try{if(f.captureBudgetEpoch)await f.captureBudgetEpoch('before-fixture-dispose');}finally{try{await f.mf.dispose();}finally{await f.cleanup();}}}});
+ t.after(async()=>{try{await f.stub.ownerReferenceControl('released').catch(()=>{});await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}catch(error){if(budgetQualification)noteFixedBudgetOwnedFailure(error,'fixture_callback');throw error;}finally{try{if(f.captureBudgetEpoch)await f.captureBudgetEpoch('before-fixture-dispose');}finally{try{await f.mf.dispose();}finally{await f.cleanup();}}}});
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await f.mountFirstConnection();await f.stub.firstConnectionConfigure('normal');
  const initial=f.firstConnectionBuild.M;assert.equal(initial.sha256,f.resident.module.sha256);assert(initial.inputs.includes('worker/mcp-own/finite.mjs'));
  const connected=await approveFirstConnection(f);assert.equal(connected.status,200);await connected.body?.cancel();const probe=await readFirstConnectionProbe(f),receipt=JSON.parse(probe.rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt'))[1]);assert.equal(receipt.moduleHash,initial.sha256);
  const closed=f.providerRegistry.versions[receipt.baselineVersionId],installed=f.providerRegistry.versions[receipt.versionId];assert.equal(installed.modules[0].content_base64,closed.modules[0].content_base64,'initial and connection share actual current bytes');
  await f.adoptConnectionConfiguration({upstream:true});const context=await plain(f.stub.firstConnectionContext());assert.equal(context.source?.phase,'read_consent');f.source=context.source;
  f.kv=await f.mf.getKVNamespace('OAUTH_KV','canary-first-connection');await f.kv.put('client:'+f.source.clientId,JSON.stringify({clientId:f.source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN reference client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));return f;
 }
 export async function prepareOwnerReference(f,fault='normal'){
  if(f.finiteBudgetReadonlyCase){assert.equal(fault,'normal');await f.stub.finiteBudgetReadonly(f.finiteBudgetReadonlyCase);}else await f.stub.ownerReferenceConfigure(fault);const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':f.cleanupOriginalIdentityToken??await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
  const screen=await f.call('/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-reference-state',code_challenge:challenge,code_challenge_method:'S256'}),{redirect:'manual',headers});

`````

## Required verdict
For F2,F5,F8 individually ADDRESSED orNOTADDRESSED with finalfile:line; new breakage in fixdiff with severity/file:line orNone; out-of-scope observations nonblocking orNone; roundverdict. Claims in report remain subject to code review, not accepted by citation. No actualnative/readiness/PCoff approval may be inferred from purecovering.
