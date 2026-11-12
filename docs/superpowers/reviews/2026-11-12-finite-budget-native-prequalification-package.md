# Task2 fixed native preparation — complete architecture prequalification package

BASE `7852f3a71de7cfcb98fedbd7b51c6a9886bf17da` → HEAD `3590f42f3c58d2c14f176230081c402c6b97bf93`; tree `b6664b9b88d68bd27647b408d27b2727de97e262`.

Pre-clock code/orchestration gate only. Task2 final Spec/Quality remains pending actual coherent16 and final report. All seven jobs remain false/manual; native16/I0 unexecuted. No test reruns, activation, source or runtime writes authorized by review.

## Complete commit list

- 8a571e01ecade0fa02b9eada316e1053afa682a4 test: exercise fixed evidence custody kinds before implementation
- 5e02883523d7b9b9ee46eda1400dec78328325de fix: bind four finite evidence kinds to authenticated custody
- c2214807f003219e42970e168cac463047b0eb80 ci: preserve literal TAP expressions in pure qualification
- 92e1f71d9bf87b04ce2a82dbc6f6f43039ed944b docs: record partial custody qualification and retire temporary workflow
- 5c294fd08ae608f80127e593c57cee8b4703debc test: specify fixed isolated native budget cases before fixture implementation
- b5caa68ec74cc9848a86a29f36da207658a3b4de test: prepare fixed isolated native budget fixtures and pure-only validation
- d3b94f785e863f179c6c1e664fc63d5edef01afd test: preserve bounded three-profile pure preflight diagnostics
- 55e166d8c57a9a2413168d0a779f9d5694643751 docs: preserve fixed SYN preflight diagnostic failure and hold qualification
- ceaa0d28b6bc2fdb26ec5a896aed4a7fa411433d test: distinguish exact SDK settlement sequence from application grant revocation
- 0453cb73edaeee17ea0a146ecdb87e5bcc382def test: preserve readonly lineage and dispose both owned replicas on every failure path
- 3590f42f3c58d2c14f176230081c402c6b97bf93 test: prepare inactive seven-job fixed native qualification and preserve evidence

## Complete stat

- .github/workflows/afw-finite-budget-qualification.yml added +1456/-0
- docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md added +122/-0
- test/finite-checkpoint-custody.test.mjs modified +24/-0
- test/fixtures/finite-budget-world.mjs modified +248/-7
- test/fixtures/finite-checkpoint-custody.mjs modified +1/-1
- test/fixtures/finite-owner-cleanup.mjs modified +4/-1
- test/mcp-qa-finite-budget-native.test.mjs modified +51/-2

## Primary preservation

{"baseLeaves":3188,"headLeaves":3190,"protectedExact":3183,"allChangedPaths":[".github/workflows/afw-finite-budget-qualification.yml","docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md","test/finite-checkpoint-custody.test.mjs","test/fixtures/finite-budget-world.mjs","test/fixtures/finite-checkpoint-custody.mjs","test/fixtures/finite-owner-cleanup.mjs","test/mcp-qa-finite-budget-native.test.mjs"],"sourceHead":"3590f42f3c58d2c14f176230081c402c6b97bf93"}

## Full U10 diff

```diff
diff --git a/.github/workflows/afw-finite-budget-qualification.yml b/.github/workflows/afw-finite-budget-qualification.yml
# before_blob=ABSENT after_blob=ecabe4d997869b4316e11810f5a0e2d6e36151c5
--- /dev/null
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -0,0 +1,1456 @@
+name: AFW finite budget qualification
+run-name: AFW fixed native qualification HELD ${{ github.sha }}
+on:
+  workflow_dispatch:
+permissions:
+  contents: read
+  actions: read
+concurrency:
+  group: afw-finite-budget-qualification
+  cancel-in-progress: false
+# PREPARATION ONLY. Every job remains literally false pending Root review.
+jobs:
+  contracts:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 2
+    env:
+      AFW_BUDGET_GROUP: positive
+    outputs:
+      artifact-id: ${{ steps.upload.outputs.artifact-id }}
+    steps:
+      - name: Require the fixed AFW source and first attempt
+        id: scope
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          mkdir -m 700 "$RUNNER_TEMP/afw-pure-private"
+      - name: Checkout this exact revision
+        uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - name: Use Node 22
+        uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Install the locked fixture dependencies
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-locked-install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+      - name: Check fixed fixture syntax, lint, inactive module and eight contracts
+        id: pure_test
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          test "$(node -v)" = v22.23.4
+          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
+          files=(test/fixtures/finite-budget-world.mjs test/fixtures/finite-owner-cleanup.mjs test/mcp-qa-finite-budget-native.test.mjs)
+          for file in "${files[@]}"; do node --check "$file" >>"$RUNNER_TEMP/afw-pure-private/syntax.log" 2>&1 || { echo syntax_failed; exit 1; }; done
+          npx --no-install eslint "${files[@]}" >"$RUNNER_TEMP/afw-pure-private/lint.log" 2>&1 || { echo lint_failed; exit 1; }
+          test ! -e output/finite-budget
+          env -u AFW_BUDGET_GROUP node --test --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-pure-private/inactive.tap" 2>&1 || { echo inactive_load_failed; exit 1; }
+          test ! -e output/finite-budget && test ! -e output/t2-native-graphs
+          if AFW_BUDGET_GROUP=invalid-fixed-group node --test --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-pure-private/invalid.tap" 2>&1; then echo invalid_group_accepted; exit 1; fi
+          test ! -e output/finite-budget && test ! -e output/t2-native-graphs
+          mkdir -p output/finite-budget/pure
+          printf 'focused lint passed\n' > output/finite-budget/pure/lint.log
+          node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs >"$RUNNER_TEMP/afw-pure-private/tests.tap" 2>&1 || { echo pure_contract_failed; exit 1; }
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {readFileSync,writeFileSync,copyFileSync} from 'node:fs';import {join} from 'node:path';
+          const root=join(process.env.RUNNER_TEMP,'afw-pure-private'),dest='output/finite-budget/pure';
+          function counts(file,expected){const text=readFileSync(join(root,file),'utf8'),actual={};for(const [name,value]of Object.entries(expected)){const matches=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(matches.length,1);actual[name]=Number(matches[0][1]);assert.equal(actual[name],value);}return actual;}
+          const business=counts('tests.tap',{tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0});
+          const inactive=counts('inactive.tap',{tests:1,pass:1,fail:0,cancelled:0,skipped:0,todo:0});
+          assert(readFileSync(join(root,'invalid.tap'),'utf8').includes('SYN budget group unsupported before I0'));
+          for(const file of ['tests.tap','inactive.tap'])copyFileSync(join(root,file),join(dest,file));
+          writeFileSync(join(dest,'tests.log'),'AFW_PURE '+JSON.stringify(business)+'\n');
+          writeFileSync(join(dest,'inactive.json'),JSON.stringify({fileWrapper:inactive,businessCases:0,I0Opened:false,invalidGroupRejected:true}));
+          console.log('AFW_PURE '+JSON.stringify(business));console.log('inactive_file_wrapper_verified 1 business_cases 0 invalid_group_rejected');
+          NODE
+      - name: Strict three-profile preflight with safe failure DTO
+        id: preflight
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-pure-private/preflight.log" 2>&1
+          import {createHash} from 'node:crypto';import {writeFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
+          const hash=value=>createHash('sha256').update(value).digest('hex'),root='output/finite-budget/pure';
+          const labels=['single structural actual SDK settlement sequence','two distinct original revokeGrant receivers','SDK actual standalone await adjacency','SDK original check adjacency','SDK bounded metrics same-block adjacency','same existing named DO class','no SYN method collision','closed fixed adapter operation inventory','exact original emitted prefix','exact two original enqueue notifications after pinned baseline transform','single passive actual SDK settlement site','original SDK call and retain unchanged','composed QA entry bytes','composed QA entry pin','exact composed entry native member selectors','exact composed entry SQL/body selectors','complete role reader catalog before I0','closed prepared role input map','scope input raw pin','raw SHA256 pin','raw byte pin','exact prepared AST count','exact installed package selector','installed package byte pin','installed package hash pin','native prepared role hooks match exact prior pure preflight before I0','exact fixed SYN additional-emission provenance before I0'];
+          function data(value,key){try{for(let n=0;value&&n<4;n++,value=Object.getPrototypeOf(value)){const descriptor=Object.getOwnPropertyDescriptor(value,key);if(descriptor)return Object.hasOwn(descriptor,'value')?descriptor.value:undefined;}}catch{}return undefined;}
+          function safe(value){if(typeof value==='number'&&Number.isFinite(value)||typeof value==='boolean'||value===null)return value;if(typeof value==='string')return {type:'string',bytes:Buffer.byteLength(value),sha256:hash(value)};return {type:typeof value};}
+          const profiles=[];
+          for(const profile of ['positive','readonly','reduction_a']){
+            process.env.AFW_BUDGET_GROUP=profile;let stage='import';
+            try{const mod=await import('./test/fixtures/finite-budget-world.mjs');stage='preflight';const result=await mod.preflightBudgetCompilation();profiles.push({profile,stage:'complete',passed:true,I0Opened:result.I0Opened,nativeExecutionProduced:result.nativeExecutionProduced,additionalSYNCount:result.additionalSYN.length,additionalSYN:result.additionalSYN.map(x=>({path:x.path,family:x.family??null,sites:x.sites??null,sdkSettlementSites:x.sdkSettlementSites??null,baselineBytes:x.baselineBytes,baselineSha256:x.baselineSha256,literalBytes:x.literalBytes??null,literalSha256:x.literalSha256??null,emittedBytes:x.emittedBytes,emittedSha256:x.emittedSha256}))});}
+            catch(error){const message=data(error,'message'),name=data(error,'name'),code=data(error,'code'),operator=data(error,'operator');profiles.push({profile,stage,passed:false,error:{name:['Error','AssertionError','TypeError','SyntaxError','RangeError'].includes(name)?name:'other',code:['ERR_ASSERTION','ERR_MODULE_NOT_FOUND','ERR_INVALID_ARG_TYPE','ERR_UNKNOWN_FILE_EXTENSION','ERR_REQUIRE_ESM'].includes(code)?code:code===undefined?'absent':'other',operator:['strictEqual','deepStrictEqual','==','===','match','ok'].includes(operator)?operator:operator===undefined?'absent':'other',actual:safe(data(error,'actual')),expected:safe(data(error,'expected')),message:typeof message==='string'?{bytes:Buffer.byteLength(message),sha256:hash(message),publicLabel:labels.find(label=>message.includes(label))??'unmatched'}:{type:typeof message}}});}
+          }
+          const result={purpose:'afw.fixed-budget-pure-diagnostic.syn.v1',source:process.env.GITHUB_SHA,tree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:process.env.GITHUB_RUN_ID,attempt:1,profiles,allPassed:profiles.every(x=>x.passed),I0Opened:false,nativeExecutionProduced:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          const bytes=Buffer.from(JSON.stringify(result,null,2));if(bytes.length>65536)throw Error('safe_diagnostic_limit');
+          await writeFile(root+'/diagnostics.json',bytes);
+          await writeFile(root+'/diagnostic-manifest.json',JSON.stringify({purpose:'afw.fixed-budget-pure-diagnostic-manifest.syn.v1',source:result.source,run:result.run,attempt:1,files:[{path:'diagnostics.json',bytes:bytes.length,sha256:hash(bytes)}]}));
+          await writeFile(process.env.GITHUB_OUTPUT,'all-passed='+result.allPassed+'\n',{flag:'a'});
+          NODE
+      - name: Seal a closed pure evidence directory
+        id: pure_seal
+        if: always() && !cancelled() && steps.scope.outcome == 'success'
+        env:
+          PURE_COMPLETE: ${{ steps.pure_test.outcome == 'success' && steps.preflight.outputs.all-passed == 'true' }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {mkdir,readdir,writeFile,lstat,copyFile} from 'node:fs/promises';import {join} from 'node:path';
+          import {sealBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          try{
+           const dest=join(process.env.RUNNER_TEMP,'afw-pure-public');await mkdir(dest,{mode:0o700});
+           const safeNames=["tests.log","tests.tap","inactive.tap","inactive.json","lint.log","preflight.json","preflight-positive.json","preflight-readonly.json","preflight-reduction_a.json","diagnostics.json","diagnostic-manifest.json"];
+           for(const name of safeNames){const file=join('output/finite-budget/pure',name);let st;try{st=await lstat(file);}catch(error){if(error.code==='ENOENT')continue;throw error;}assert(st.isFile()&&st.nlink===1);await copyFile(file,join(dest,name));}
+           await writeFile(join(dest,'status.json'),JSON.stringify({status:process.env.PURE_COMPLETE==='true'?'pure_passed':'pure_failed',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT}));
+           await sealBudgetArtifact(dest,'pure');
+           const names=await readdir(dest);assert(names.every(name=>[...safeNames,'budget-artifact.json','status.json'].includes(name)));
+          }catch{console.log('evidence_not_preserved');process.exitCode=1;}
+          NODE
+      - name: Upload finite-budget-pure only
+        id: upload
+        if: always() && !cancelled() && steps.pure_seal.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-fixed-preparation-${{ github.sha }}
+          path: ${{ runner.temp }}/afw-pure-public/
+          if-no-files-found: error
+          retention-days: 7
+      - name: Download pure_receipt by exact ID attempt 1
+        id: pure_receipt_1
+        if: always() && !cancelled() && steps.upload.outcome == 'success' && steps.upload.outputs.artifact-id != ''
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-pure-receipt
+          merge-multiple: true
+      - name: Wait 2s before pure_receipt retrieval 2
+        id: pure_receipt_wait2
+        if: always() && !cancelled() && steps.pure_receipt_1.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 2
+      - name: Download pure_receipt by exact ID attempt 2
+        id: pure_receipt_2
+        if: always() && !cancelled() && steps.pure_receipt_wait2.outcome == 'success' && steps.pure_receipt_1.outcome == 'failure'
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-pure-receipt
+          merge-multiple: true
+      - name: Wait 5s before pure_receipt retrieval 3
+        id: pure_receipt_wait3
+        if: always() && !cancelled() && steps.pure_receipt_2.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 5
+      - name: Download pure_receipt by exact ID attempt 3
+        id: pure_receipt_3
+        if: always() && !cancelled() && steps.pure_receipt_wait3.outcome == 'success' && steps.pure_receipt_2.outcome == 'failure'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-pure-receipt
+          merge-multiple: true
+      - name: Verify exact same-ID pure inventory
+        id: pure_verified
+        if: always() && !cancelled() && steps.upload.outcome == 'success'
+        env:
+          ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+          DOWNLOADED: ${{ steps.pure_receipt_1.outcome == 'success' || steps.pure_receipt_2.outcome == 'success' || steps.pure_receipt_3.outcome == 'success' }}
+          READBACK: ${{ runner.temp }}/afw-pure-receipt
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -n "$ARTIFACT_ID"
+          test "$DOWNLOADED" = true || { echo evidence_not_preserved; exit 1; }
+          if ! node --input-type=module -e "import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs'; await verifyBudgetArtifact(process.env.READBACK,'pure',process.env.ARTIFACT_ID);" >"$RUNNER_TEMP/afw-pure-private/readback.log" 2>&1; then echo evidence_not_preserved; exit 1; fi
+          if ! cmp -s "$RUNNER_TEMP/afw-pure-public/budget-artifact.json" "$READBACK/budget-artifact.json"; then echo evidence_not_preserved; exit 1; fi
+          printf 'pure_verified artifact_id=%s\n' "$ARTIFACT_ID"
+      - name: Print verified closed profile diagnostic
+        if: always() && !cancelled() && steps.pure_verified.outcome == 'success'
+        shell: bash
+        run: |
+          node --input-type=module <<'NODE'
+          import {readFile} from 'node:fs/promises';const raw=await readFile(process.env.RUNNER_TEMP+'/afw-pure-receipt/diagnostics.json','utf8');if(Buffer.byteLength(raw)>65536)throw Error('safe_diagnostic_limit');console.log(raw);
+          NODE
+      - name: Require all covering profiles and retained readback
+        if: always() && !cancelled()
+        shell: bash
+        run: |
+          test '${{ steps.pure_test.outcome }}' = success
+          test '${{ steps.preflight.outputs.all-passed }}' = true
+          test '${{ steps.pure_verified.outcome }}' = success
+  positive_prepare:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: [contracts]
+    runs-on: ubuntu-24.04
+    timeout-minutes: 15
+    environment: afw-finite-syn-checkpoint
+    outputs:
+      artifact-id: ${{ steps.upload.outputs.artifact-id }}
+      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
+      kind: ${{ steps.seal.outputs.kind }}
+    env:
+      AFW_BUDGET_GROUP: positive
+      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+      FIXED_ROLE: producer
+      FIXED_LANE: positive
+      FIXED_CASES: '["P1"]'
+    steps:
+      - name: Require fixed scope before any native work
+        id: scope
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
+          
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Install exact lock and verify existing custody key
+        id: custody
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$(node -v)" = v22.23.4
+          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
+          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
+          
+      - name: Download exact contracts artifact
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-pure
+          merge-multiple: true
+      - name: Verify prior pure inventory and select fixed graph profile
+        id: pure_binding
+        env:
+          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          NODE
+          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
+          
+      - name: Execute fixed positive_prepare once
+        id: native
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node test/fixtures/finite-budget-world.mjs prepare-positive output/finite-budget/checkpoint >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
+          
+      - name: Encrypt complete private evidence on success or failure
+        id: seal
+        if: always() && !cancelled() && steps.custody.outcome == 'success'
+        env:
+          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
+          SUCCESS_KIND: checkpoint
+          FAILURE_KIND: producer-failure
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
+          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
+          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
+          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
+          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
+          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
+          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
+          NODE
+          
+      - name: Upload encrypted envelope and closed receipts only
+        id: upload
+        if: always() && !cancelled() && steps.seal.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-positive_prepare-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-native-public/
+          retention-days: 7
+          if-no-files-found: error
+      - name: Download own exact assigned artifact ID
+        id: own_download
+        if: always() && !cancelled() && steps.upload.outcome == 'success'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-native-readback
+          merge-multiple: true
+      - name: Authenticate own same-ID inner inventory readback
+        id: own_verified
+        if: always() && !cancelled() && steps.own_download.outcome == 'success'
+        env:
+          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
+          OWN_KIND: ${{ steps.seal.outputs.kind }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
+          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
+          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
+          NODE
+          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
+          
+      - name: Preserve actual command and custody outcome
+        id: actual_outcome
+        if: always() && !cancelled()
+        shell: bash
+        run: |
+          set -euo pipefail
+          test '${{ steps.native.outcome }}' = success
+          test '${{ steps.own_verified.outcome }}' = success
+  positive_consume:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: [contracts, positive_prepare]
+    runs-on: ubuntu-24.04
+    timeout-minutes: 15
+    environment: afw-finite-syn-checkpoint
+    outputs:
+      artifact-id: ${{ steps.upload.outputs.artifact-id }}
+      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
+      kind: ${{ steps.seal.outputs.kind }}
+    env:
+      AFW_BUDGET_GROUP: positive
+      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+      FIXED_ROLE: consumer
+      FIXED_LANE: positive
+      FIXED_CASES: '["P1"]'
+    steps:
+      - name: Require fixed scope before any native work
+        id: scope
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
+          
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Install exact lock and verify existing custody key
+        id: custody
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$(node -v)" = v22.23.4
+          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
+          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
+          
+      - name: Download exact contracts artifact
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-pure
+          merge-multiple: true
+      - name: Verify prior pure inventory and select fixed graph profile
+        id: pure_binding
+        env:
+          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          NODE
+          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
+          
+      - name: Download assigned original producer artifact
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.positive_prepare.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-producer-envelope
+          merge-multiple: true
+      - name: Authenticate assigned producer before any cold mount
+        id: producer_binding
+        env:
+          PRODUCER_ID: ${{ needs.positive_prepare.outputs.artifact-id }}
+          PRODUCER_DIGEST: ${{ needs.positive_prepare.outputs.artifact-digest }}
+          PRODUCER_KIND: ${{ needs.positive_prepare.outputs.kind }}
+          EXPECTED_KIND: checkpoint
+          EXPECTED_GROUP: positive
+          EXPECTED_CASES: '["P1"]'
+          GH_ARTIFACT_TOKEN: ${{ github.token }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$PRODUCER_KIND" = "$EXPECTED_KIND"
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/input-binding.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
+          import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env;assert.match(e.PRODUCER_ID,/^[1-9][0-9]*$/);assert.match(e.PRODUCER_DIGEST,/^[a-f0-9]{64}$/);
+          const r=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+e.PRODUCER_ID,{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
+          assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),e.PRODUCER_ID);assert.equal(m.expired,false);assert.equal(m.digest,'sha256:'+e.PRODUCER_DIGEST);assert.equal(String(m.workflow_run.id),e.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,e.GITHUB_SHA);
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.EXPECTED_KIND};
+          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-producer-envelope',destinationDir:e.RUNNER_TEMP+'/afw-producer-open',context});
+          const manifest=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-producer-open/job-manifest.json','utf8'));
+          assert.equal(manifest.role,'producer');assert.equal(manifest.kind,e.EXPECTED_KIND);assert.equal(manifest.source,e.GITHUB_SHA);assert.equal(manifest.run,e.GITHUB_RUN_ID);assert.equal(manifest.attempt,1);assert.equal(manifest.group,e.EXPECTED_GROUP);
+          assert.deepEqual(manifest.cases,JSON.parse(e.EXPECTED_CASES));
+          await writeFile(e.RUNNER_TEMP+'/afw-native-private/producer-binding.json',JSON.stringify({artifactId:e.PRODUCER_ID,digest:e.PRODUCER_DIGEST,kind:e.EXPECTED_KIND,expectedProducerGroup:e.EXPECTED_GROUP,verified:true}));
+          NODE
+          printf 'AFW_BUDGET_PRODUCER_ARTIFACT_ID=%s\n' "$PRODUCER_ID" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_DIGEST=%s\n' "$PRODUCER_DIGEST" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_KIND=%s\n' "$EXPECTED_KIND" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_GROUP=%s\n' "$EXPECTED_GROUP" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_READBACK=verified\n' >>"$GITHUB_ENV"
+          
+      - name: Execute fixed positive_consume once
+        id: native
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          AFW_BUDGET_CHECKPOINT="$RUNNER_TEMP/afw-producer-open/output/finite-budget/checkpoint" node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
+          AFW_EXPECTED_CASES=1 node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/tap-check.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
+          const e=process.env,text=await readFile(e.RUNNER_TEMP+'/afw-native-private/logs/command-output.log','utf8'),counts={};
+          for(const [name,expected]of Object.entries({tests:Number(e.AFW_EXPECTED_CASES),pass:Number(e.AFW_EXPECTED_CASES),fail:0,cancelled:0,skipped:0,todo:0})){const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(hits.length,1);counts[name]=Number(hits[0][1]);assert.equal(counts[name],expected);}
+          await writeFile(e.RUNNER_TEMP+'/afw-native-private/business-counts.json',JSON.stringify(counts));
+          NODE
+          
+      - name: Encrypt complete private evidence on success or failure
+        id: seal
+        if: always() && !cancelled() && steps.custody.outcome == 'success'
+        env:
+          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
+          SUCCESS_KIND: positive-result
+          FAILURE_KIND: consumer-failure
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
+          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
+          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
+          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
+          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
+          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
+          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
+          NODE
+          
+      - name: Upload encrypted envelope and closed receipts only
+        id: upload
+        if: always() && !cancelled() && steps.seal.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-positive_consume-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-native-public/
+          retention-days: 7
+          if-no-files-found: error
+      - name: Download own exact assigned artifact ID
+        id: own_download
+        if: always() && !cancelled() && steps.upload.outcome == 'success'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-native-readback
+          merge-multiple: true
+      - name: Authenticate own same-ID inner inventory readback
+        id: own_verified
+        if: always() && !cancelled() && steps.own_download.outcome == 'success'
+        env:
+          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
+          OWN_KIND: ${{ steps.seal.outputs.kind }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
+          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
+          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
+          NODE
+          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
+          
+      - name: Preserve actual command and custody outcome
+        id: actual_outcome
+        if: always() && !cancelled()
+        shell: bash
+        run: |
+          set -euo pipefail
+          test '${{ steps.native.outcome }}' = success
+          test '${{ steps.own_verified.outcome }}' = success
+  reduction_prepare:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: [contracts]
+    runs-on: ubuntu-24.04
+    timeout-minutes: 15
+    environment: afw-finite-syn-checkpoint
+    outputs:
+      artifact-id: ${{ steps.upload.outputs.artifact-id }}
+      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
+      kind: ${{ steps.seal.outputs.kind }}
+    env:
+      AFW_BUDGET_GROUP: reduction_a
+      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+      FIXED_ROLE: producer
+      FIXED_LANE: reduction
+      FIXED_CASES: '["D1","D2","D3","D4"]'
+    steps:
+      - name: Require fixed scope before any native work
+        id: scope
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
+          
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Install exact lock and verify existing custody key
+        id: custody
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$(node -v)" = v22.23.4
+          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
+          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
+          
+      - name: Download exact contracts artifact
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-pure
+          merge-multiple: true
+      - name: Verify prior pure inventory and select fixed graph profile
+        id: pure_binding
+        env:
+          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          NODE
+          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
+          
+      - name: Execute fixed reduction_prepare once
+        id: native
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node test/fixtures/finite-budget-world.mjs prepare-reduction output/finite-budget/checkpoint >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
+          
+      - name: Encrypt complete private evidence on success or failure
+        id: seal
+        if: always() && !cancelled() && steps.custody.outcome == 'success'
+        env:
+          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
+          SUCCESS_KIND: reduction-checkpoint
+          FAILURE_KIND: producer-failure
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
+          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
+          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
+          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
+          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
+          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
+          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
+          NODE
+          
+      - name: Upload encrypted envelope and closed receipts only
+        id: upload
+        if: always() && !cancelled() && steps.seal.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-reduction_prepare-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-native-public/
+          retention-days: 7
+          if-no-files-found: error
+      - name: Download own exact assigned artifact ID
+        id: own_download
+        if: always() && !cancelled() && steps.upload.outcome == 'success'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-native-readback
+          merge-multiple: true
+      - name: Authenticate own same-ID inner inventory readback
+        id: own_verified
+        if: always() && !cancelled() && steps.own_download.outcome == 'success'
+        env:
+          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
+          OWN_KIND: ${{ steps.seal.outputs.kind }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
+          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
+          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
+          NODE
+          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
+          
+      - name: Preserve actual command and custody outcome
+        id: actual_outcome
+        if: always() && !cancelled()
+        shell: bash
+        run: |
+          set -euo pipefail
+          test '${{ steps.native.outcome }}' = success
+          test '${{ steps.own_verified.outcome }}' = success
+  reduction_consume_a:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: [contracts, reduction_prepare]
+    runs-on: ubuntu-24.04
+    timeout-minutes: 15
+    environment: afw-finite-syn-checkpoint
+    outputs:
+      artifact-id: ${{ steps.upload.outputs.artifact-id }}
+      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
+      kind: ${{ steps.seal.outputs.kind }}
+    env:
+      AFW_BUDGET_GROUP: reduction_a
+      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+      FIXED_ROLE: consumer
+      FIXED_LANE: reduction_a
+      FIXED_CASES: '["D1","D2"]'
+    steps:
+      - name: Require fixed scope before any native work
+        id: scope
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
+          
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Install exact lock and verify existing custody key
+        id: custody
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$(node -v)" = v22.23.4
+          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
+          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
+          
+      - name: Download exact contracts artifact
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-pure
+          merge-multiple: true
+      - name: Verify prior pure inventory and select fixed graph profile
+        id: pure_binding
+        env:
+          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          NODE
+          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
+          
+      - name: Download assigned original producer artifact
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.reduction_prepare.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-producer-envelope
+          merge-multiple: true
+      - name: Authenticate assigned producer before any cold mount
+        id: producer_binding
+        env:
+          PRODUCER_ID: ${{ needs.reduction_prepare.outputs.artifact-id }}
+          PRODUCER_DIGEST: ${{ needs.reduction_prepare.outputs.artifact-digest }}
+          PRODUCER_KIND: ${{ needs.reduction_prepare.outputs.kind }}
+          EXPECTED_KIND: reduction-checkpoint
+          EXPECTED_GROUP: reduction_a
+          EXPECTED_CASES: '["D1","D2","D3","D4"]'
+          GH_ARTIFACT_TOKEN: ${{ github.token }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$PRODUCER_KIND" = "$EXPECTED_KIND"
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/input-binding.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
+          import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env;assert.match(e.PRODUCER_ID,/^[1-9][0-9]*$/);assert.match(e.PRODUCER_DIGEST,/^[a-f0-9]{64}$/);
+          const r=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+e.PRODUCER_ID,{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
+          assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),e.PRODUCER_ID);assert.equal(m.expired,false);assert.equal(m.digest,'sha256:'+e.PRODUCER_DIGEST);assert.equal(String(m.workflow_run.id),e.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,e.GITHUB_SHA);
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.EXPECTED_KIND};
+          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-producer-envelope',destinationDir:e.RUNNER_TEMP+'/afw-producer-open',context});
+          const manifest=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-producer-open/job-manifest.json','utf8'));
+          assert.equal(manifest.role,'producer');assert.equal(manifest.kind,e.EXPECTED_KIND);assert.equal(manifest.source,e.GITHUB_SHA);assert.equal(manifest.run,e.GITHUB_RUN_ID);assert.equal(manifest.attempt,1);assert.equal(manifest.group,e.EXPECTED_GROUP);
+          assert.deepEqual(manifest.cases,JSON.parse(e.EXPECTED_CASES));
+          await writeFile(e.RUNNER_TEMP+'/afw-native-private/producer-binding.json',JSON.stringify({artifactId:e.PRODUCER_ID,digest:e.PRODUCER_DIGEST,kind:e.EXPECTED_KIND,expectedProducerGroup:e.EXPECTED_GROUP,verified:true}));
+          NODE
+          printf 'AFW_BUDGET_PRODUCER_ARTIFACT_ID=%s\n' "$PRODUCER_ID" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_DIGEST=%s\n' "$PRODUCER_DIGEST" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_KIND=%s\n' "$EXPECTED_KIND" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_GROUP=%s\n' "$EXPECTED_GROUP" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_READBACK=verified\n' >>"$GITHUB_ENV"
+          
+      - name: Execute fixed reduction_consume_a once
+        id: native
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          AFW_BUDGET_CHECKPOINT="$RUNNER_TEMP/afw-producer-open/output/finite-budget/checkpoint" node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
+          AFW_EXPECTED_CASES=2 node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/tap-check.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
+          const e=process.env,text=await readFile(e.RUNNER_TEMP+'/afw-native-private/logs/command-output.log','utf8'),counts={};
+          for(const [name,expected]of Object.entries({tests:Number(e.AFW_EXPECTED_CASES),pass:Number(e.AFW_EXPECTED_CASES),fail:0,cancelled:0,skipped:0,todo:0})){const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(hits.length,1);counts[name]=Number(hits[0][1]);assert.equal(counts[name],expected);}
+          await writeFile(e.RUNNER_TEMP+'/afw-native-private/business-counts.json',JSON.stringify(counts));
+          NODE
+          
+      - name: Encrypt complete private evidence on success or failure
+        id: seal
+        if: always() && !cancelled() && steps.custody.outcome == 'success'
+        env:
+          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
+          SUCCESS_KIND: reduction-result-a
+          FAILURE_KIND: consumer-failure
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
+          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
+          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
+          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
+          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
+          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
+          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
+          NODE
+          
+      - name: Upload encrypted envelope and closed receipts only
+        id: upload
+        if: always() && !cancelled() && steps.seal.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-reduction_consume_a-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-native-public/
+          retention-days: 7
+          if-no-files-found: error
+      - name: Download own exact assigned artifact ID
+        id: own_download
+        if: always() && !cancelled() && steps.upload.outcome == 'success'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-native-readback
+          merge-multiple: true
+      - name: Authenticate own same-ID inner inventory readback
+        id: own_verified
+        if: always() && !cancelled() && steps.own_download.outcome == 'success'
+        env:
+          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
+          OWN_KIND: ${{ steps.seal.outputs.kind }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
+          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
+          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
+          NODE
+          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
+          
+      - name: Preserve actual command and custody outcome
+        id: actual_outcome
+        if: always() && !cancelled()
+        shell: bash
+        run: |
+          set -euo pipefail
+          test '${{ steps.native.outcome }}' = success
+          test '${{ steps.own_verified.outcome }}' = success
+  readonly:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: [contracts]
+    runs-on: ubuntu-24.04
+    timeout-minutes: 7
+    environment: afw-finite-syn-checkpoint
+    outputs:
+      artifact-id: ${{ steps.upload.outputs.artifact-id }}
+      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
+      kind: ${{ steps.seal.outputs.kind }}
+    env:
+      AFW_BUDGET_GROUP: readonly
+      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+      FIXED_ROLE: consumer
+      FIXED_LANE: readonly
+      FIXED_CASES: '["R1","R2","R3"]'
+    steps:
+      - name: Require fixed scope before any native work
+        id: scope
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
+          
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Install exact lock and verify existing custody key
+        id: custody
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$(node -v)" = v22.23.4
+          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
+          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
+          
+      - name: Download exact contracts artifact
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-pure
+          merge-multiple: true
+      - name: Verify prior pure inventory and select fixed graph profile
+        id: pure_binding
+        env:
+          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          NODE
+          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
+          
+      - name: Execute fixed readonly once
+        id: native
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
+          AFW_EXPECTED_CASES=3 node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/tap-check.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
+          const e=process.env,text=await readFile(e.RUNNER_TEMP+'/afw-native-private/logs/command-output.log','utf8'),counts={};
+          for(const [name,expected]of Object.entries({tests:Number(e.AFW_EXPECTED_CASES),pass:Number(e.AFW_EXPECTED_CASES),fail:0,cancelled:0,skipped:0,todo:0})){const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(hits.length,1);counts[name]=Number(hits[0][1]);assert.equal(counts[name],expected);}
+          await writeFile(e.RUNNER_TEMP+'/afw-native-private/business-counts.json',JSON.stringify(counts));
+          NODE
+          
+      - name: Encrypt complete private evidence on success or failure
+        id: seal
+        if: always() && !cancelled() && steps.custody.outcome == 'success'
+        env:
+          COMMAND_OK: ${{ steps.native.outcome == 'success' }}
+          SUCCESS_KIND: readonly-result
+          FAILURE_KIND: consumer-failure
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
+          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
+          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
+          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
+          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
+          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
+          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
+          NODE
+          
+      - name: Upload encrypted envelope and closed receipts only
+        id: upload
+        if: always() && !cancelled() && steps.seal.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-readonly-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-native-public/
+          retention-days: 7
+          if-no-files-found: error
+      - name: Download own exact assigned artifact ID
+        id: own_download
+        if: always() && !cancelled() && steps.upload.outcome == 'success'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-native-readback
+          merge-multiple: true
+      - name: Authenticate own same-ID inner inventory readback
+        id: own_verified
+        if: always() && !cancelled() && steps.own_download.outcome == 'success'
+        env:
+          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
+          OWN_KIND: ${{ steps.seal.outputs.kind }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
+          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
+          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
+          NODE
+          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
+          
+      - name: Preserve actual command and custody outcome
+        id: actual_outcome
+        if: always() && !cancelled()
+        shell: bash
+        run: |
+          set -euo pipefail
+          test '${{ steps.native.outcome }}' = success
+          test '${{ steps.own_verified.outcome }}' = success
+  reduction_consume_b:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: [contracts, readonly, reduction_prepare]
+    runs-on: ubuntu-24.04
+    timeout-minutes: 15
+    environment: afw-finite-syn-checkpoint
+    outputs:
+      artifact-id: ${{ steps.upload.outputs.artifact-id }}
+      artifact-digest: ${{ steps.upload.outputs.artifact-digest }}
+      kind: ${{ steps.seal.outputs.kind }}
+    env:
+      AFW_BUDGET_GROUP: reduction_b
+      AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+      FIXED_ROLE: consumer
+      FIXED_LANE: reduction_b
+      FIXED_CASES: '["D3","D4"]'
+    steps:
+      - name: Require fixed scope before any native work
+        id: scope
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >>"$GITHUB_ENV"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/logs"
+          mkdir -m 700 "$RUNNER_TEMP/afw-native-private/programs"
+          
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Install exact lock and verify existing custody key
+        id: custody
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$(node -v)" = v22.23.4
+          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-native-private/logs/install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+          cp .github/workflows/afw-finite-budget-qualification.yml "$RUNNER_TEMP/afw-native-private/programs/workflow.yml"
+          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint >"$RUNNER_TEMP/afw-native-private/logs/custody-key.log" 2>&1 || { echo custody_key_unavailable; exit 1; }
+          
+      - name: Download exact contracts artifact
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.contracts.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-pure
+          merge-multiple: true
+      - name: Verify prior pure inventory and select fixed graph profile
+        id: pure_binding
+        env:
+          PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          NODE
+          printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
+          
+      - name: Download assigned original producer artifact
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.reduction_prepare.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-producer-envelope
+          merge-multiple: true
+      - name: Authenticate assigned producer before any cold mount
+        id: producer_binding
+        env:
+          PRODUCER_ID: ${{ needs.reduction_prepare.outputs.artifact-id }}
+          PRODUCER_DIGEST: ${{ needs.reduction_prepare.outputs.artifact-digest }}
+          PRODUCER_KIND: ${{ needs.reduction_prepare.outputs.kind }}
+          EXPECTED_KIND: reduction-checkpoint
+          EXPECTED_GROUP: reduction_a
+          EXPECTED_CASES: '["D1","D2","D3","D4"]'
+          GH_ARTIFACT_TOKEN: ${{ github.token }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$PRODUCER_KIND" = "$EXPECTED_KIND"
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/input-binding.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
+          import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env;assert.match(e.PRODUCER_ID,/^[1-9][0-9]*$/);assert.match(e.PRODUCER_DIGEST,/^[a-f0-9]{64}$/);
+          const r=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+e.PRODUCER_ID,{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
+          assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),e.PRODUCER_ID);assert.equal(m.expired,false);assert.equal(m.digest,'sha256:'+e.PRODUCER_DIGEST);assert.equal(String(m.workflow_run.id),e.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,e.GITHUB_SHA);
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.EXPECTED_KIND};
+          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-producer-envelope',destinationDir:e.RUNNER_TEMP+'/afw-producer-open',context});
+          const manifest=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-producer-open/job-manifest.json','utf8'));
+          assert.equal(manifest.role,'producer');assert.equal(manifest.kind,e.EXPECTED_KIND);assert.equal(manifest.source,e.GITHUB_SHA);assert.equal(manifest.run,e.GITHUB_RUN_ID);assert.equal(manifest.attempt,1);assert.equal(manifest.group,e.EXPECTED_GROUP);
+          assert.deepEqual(manifest.cases,JSON.parse(e.EXPECTED_CASES));
+          await writeFile(e.RUNNER_TEMP+'/afw-native-private/producer-binding.json',JSON.stringify({artifactId:e.PRODUCER_ID,digest:e.PRODUCER_DIGEST,kind:e.EXPECTED_KIND,expectedProducerGroup:e.EXPECTED_GROUP,verified:true}));
+          NODE
+          printf 'AFW_BUDGET_PRODUCER_ARTIFACT_ID=%s\n' "$PRODUCER_ID" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_DIGEST=%s\n' "$PRODUCER_DIGEST" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_KIND=%s\n' "$EXPECTED_KIND" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_GROUP=%s\n' "$EXPECTED_GROUP" >>"$GITHUB_ENV"
+          printf 'AFW_BUDGET_PRODUCER_READBACK=verified\n' >>"$GITHUB_ENV"
+          
+      - name: Execute fixed reduction_consume_b once
+        id: native
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          AFW_BUDGET_CHECKPOINT="$RUNNER_TEMP/afw-producer-open/output/finite-budget/checkpoint" node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$RUNNER_TEMP/afw-native-private/logs/command-output.log" 2>&1
+          AFW_EXPECTED_CASES=2 node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/tap-check.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';
+          const e=process.env,text=await readFile(e.RUNNER_TEMP+'/afw-native-private/logs/command-output.log','utf8'),counts={};
+          for(const [name,expected]of Object.entries({tests:Number(e.AFW_EXPECTED_CASES),pass:Number(e.AFW_EXPECTED_CASES),fail:0,cancelled:0,skipped:0,todo:0})){const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert.equal(hits.length,1);counts[name]=Number(hits[0][1]);assert.equal(counts[name],expected);}
+          await writeFile(e.RUNNER_TEMP+'/afw-native-private/business-counts.json',JSON.stringify(counts));
+          NODE
+          
+      - name: Verify coherent original sixteen-case evidence before sealing
+        id: aggregate
+        if: steps.native.outcome == 'success'
+        env:
+          GH_ARTIFACT_TOKEN: ${{ github.token }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/aggregate.log" 2>&1
+          
+          import assert from 'node:assert/strict';
+          import {mkdir,readFile,writeFile,readdir} from 'node:fs/promises';
+          import {execFileSync} from 'node:child_process';
+          import {createHash} from 'node:crypto';
+          import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          const e=process.env,sha=value=>createHash('sha256').update(value).digest('hex'),repo='tokenizartinfo-ops/agent-friendly-web',root=e.RUNNER_TEMP+'/afw-qualification-peer-proof';
+          const fixed=[{job:'positive_prepare',kind:'checkpoint',role:'producer',group:'positive',cases:['P1']},{job:'positive_consume',kind:'positive-result',role:'consumer',group:'positive',cases:['P1']},{job:'reduction_prepare',kind:'reduction-checkpoint',role:'producer',group:'reduction_a',cases:['D1','D2','D3','D4']},{job:'reduction_consume_a',kind:'reduction-result-a',role:'consumer',group:'reduction_a',cases:['D1','D2']},{job:'readonly',kind:'readonly-result',role:'consumer',group:'readonly',cases:['R1','R2','R3']}];
+          const request=async path=>{
+           assert(path.startsWith('/actions/')||path==='/git/ref/heads/feat/finite-native-cleanup-20261101');
+           const r=await fetch('https://api.github.com/repos/'+repo+path,{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});assert.equal(r.status,200);return r.json();
+          };
+          const sameRef=await request('/git/ref/heads/feat/finite-native-cleanup-20261101');assert.equal(sameRef.object.sha,e.GITHUB_SHA,'qualification Source stayed frozen');
+          await mkdir(root,{mode:0o700});let inventory,jobInventory;
+          for(let attempt=0;attempt<16;attempt++){
+           inventory=await request('/actions/runs/'+e.GITHUB_RUN_ID+'/artifacts?per_page=100');assert(inventory.total_count<=100);
+           const expected=['finite-budget-fixed-preparation-'+e.GITHUB_SHA,...fixed.map(x=>'finite-budget-'+x.job+'-'+e.GITHUB_SHA+'-'+e.GITHUB_RUN_ID)];
+           jobInventory=await request('/actions/runs/'+e.GITHUB_RUN_ID+'/jobs?per_page=100');assert.equal(jobInventory.total_count,7);
+           if(expected.every(name=>inventory.artifacts.filter(a=>a.name===name).length===1)&&jobInventory.jobs.filter(job=>job.name!=='reduction_consume_b').every(job=>job.status==='completed'&&job.conclusion==='success'))break;
+           assert(attempt<15,'peer artifacts must become available in bounded post-native window');await new Promise(resolve=>setTimeout(resolve,2000));
+          }
+          const opened=new Map(),receipts=[];
+          async function download(name,kind){
+           const matches=inventory.artifacts.filter(a=>a.name===name);assert.equal(matches.length,1);
+           const artifact=matches[0];assert.equal(artifact.expired,false);assert.match(artifact.digest,/^sha256:[a-f0-9]{64}$/);assert(artifact.size_in_bytes<=134283264);assert.equal(String(artifact.workflow_run.id),e.GITHUB_RUN_ID);assert.equal(artifact.workflow_run.head_sha,e.GITHUB_SHA);
+           const metadata=await request('/actions/artifacts/'+artifact.id);assert.equal(metadata.digest,artifact.digest);assert.equal(metadata.name,name);
+           const response=await fetch('https://api.github.com/repos/'+repo+'/actions/artifacts/'+artifact.id+'/zip',{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(20000)});assert.equal(response.status,200);
+           const reader=response.body.getReader(),chunks=[];let received=0;
+           for(;;){const part=await reader.read();if(part.done)break;received+=part.value.length;if(received>134283264){await reader.cancel();throw Error('bounded peer artifact exceeded');}chunks.push(Buffer.from(part.value));}
+           const bytes=Buffer.concat(chunks);assert.equal(bytes.length,artifact.size_in_bytes);assert.equal('sha256:'+sha(bytes),artifact.digest);
+           assert(Number.isSafeInteger(artifact.id)&&artifact.id>0);const zip=root+'/'+artifact.id+'.zip',directory=root+'/'+artifact.id,output=root+'/'+artifact.id+'-opened';await writeFile(zip,bytes);
+           const paths=execFileSync('unzip',['-Z1',zip],{encoding:'utf8'}).trim().split('\n');assert(paths.every(path=>/^[A-Za-z0-9_.-]+$/.test(path)));assert.equal(new Set(paths).size,paths.length);
+           if(kind!=='pure')assert.deepEqual([...paths].sort(),['envelope.bin','manifest.json','receipt.json']);
+           const listing=execFileSync('unzip',['-l',zip],{encoding:'utf8'}).trim().split('\n').at(-1),totals=/^\s*(\d+)\s+(\d+)\s+files?\s*$/.exec(listing);assert(totals&&Number(totals[1])<=134283264&&Number(totals[2])===paths.length,'bounded exact zip inventory before extraction');
+           await mkdir(directory,{mode:0o700});execFileSync('unzip',['-q',zip,'-d',directory]);
+           if(kind==='pure')await verifyBudgetArtifact(directory,'pure',String(artifact.id));
+           else await openDirectory({stagingDir:directory,destinationDir:output,context:{purpose:'afw.finite-checkpoint-custody.syn.v1',repository:repo,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind}});
+           receipts.push({artifactId:String(artifact.id),digest:artifact.digest,name,kind});return {directory:kind==='pure'?directory:output,artifact};
+          }
+          const pure=await download('finite-budget-fixed-preparation-'+e.GITHUB_SHA,'pure');
+          const counts=async file=>{const value=JSON.parse(await readFile(file,'utf8'));assert.equal(value.fail,0);assert.equal(value.cancelled,0);assert.equal(value.skipped,0);assert.equal(value.todo,0);assert.equal(value.tests,value.pass);return value;};
+          const pureTap=await readFile(pure.directory+'/tests.tap','utf8');assert(/^# tests 8$/m.test(pureTap)&&/^# pass 8$/m.test(pureTap));
+          const pureDiagnostic=JSON.parse(await readFile(pure.directory+'/diagnostics.json','utf8'));assert.equal(pureDiagnostic.allPassed,true);assert(pureDiagnostic.profiles.every(profile=>profile.I0Opened===false&&profile.nativeExecutionProduced===false));assert.equal(pureDiagnostic.profiles.find(p=>p.profile==='positive').additionalSYNCount,0);
+          for(const cfg of fixed){
+           const proof=await download('finite-budget-'+cfg.job+'-'+e.GITHUB_SHA+'-'+e.GITHUB_RUN_ID,cfg.kind),manifest=JSON.parse(await readFile(proof.directory+'/job-manifest.json','utf8'));
+           assert.equal(manifest.repository,repo);assert.equal(manifest.ref,e.GITHUB_REF);assert.equal(manifest.source,e.GITHUB_SHA);assert.equal(manifest.run,e.GITHUB_RUN_ID);assert.equal(manifest.attempt,1);assert.equal(manifest.commandSucceeded,true);assert.equal(manifest.role,cfg.role);assert.equal(manifest.group,cfg.group);assert.equal(manifest.kind,cfg.kind);assert.deepEqual(manifest.cases,cfg.cases);
+           opened.set(cfg.job,{...proof,manifest});
+          }
+          const positive=opened.get('positive_consume'),readonly=opened.get('readonly'),a=opened.get('reduction_consume_a'),producer=opened.get('reduction_prepare');
+          assert.equal((await counts(positive.directory+'/business-counts.json')).pass,1);assert.equal((await counts(readonly.directory+'/business-counts.json')).pass,3);assert.equal((await counts(a.directory+'/business-counts.json')).pass,2);assert.equal((await counts(e.RUNNER_TEMP+'/afw-native-private/business-counts.json')).pass,2);
+          const reductionCheckpoint=JSON.parse(await readFile(producer.directory+'/output/finite-budget/checkpoint/native/checkpoint.json','utf8')),positiveCheckpoint=JSON.parse(await readFile(opened.get('positive_prepare').directory+'/output/finite-budget/checkpoint/checkpoint.json','utf8'));
+          const readResult=async(directory,group,name)=>JSON.parse(await readFile(directory+'/output/finite-budget/'+group+'/'+name+'/full-result.json','utf8'));
+          const aResults=await Promise.all(['D1','D2'].map(name=>readResult(a.directory,'reduction',name))),bResults=await Promise.all(['D3','D4'].map(name=>readResult('.', 'reduction',name)));
+          const allD=[...aResults,...bResults];
+          for(const value of allD){
+           assert.equal(value.plan.I0,reductionCheckpoint.plan.I0);assert.equal(value.plan.C0,reductionCheckpoint.plan.C0);assert.equal(value.plan.C1,reductionCheckpoint.plan.C1);
+           assert(value.recovery.pairReady<=value.plan.C0-30000);assert.equal(value.recovery.pairSize,2);assert.equal(value.recovery.restart,false);
+           assert.equal(value.producer.artifactId,String(producer.artifact.id));assert.equal(value.producer.digest,producer.artifact.digest.slice(7));
+           assert.equal(value.producer.manifestSha256,sha(await readFile(producer.directory+'/output/finite-budget/checkpoint/native/manifest.json')));
+          }
+          const aStart=Math.min(...aResults.map(x=>x.recovery.pairEntered)),aEnd=Math.max(...aResults.map(x=>x.recovery.consumerFinished)),bStart=Math.min(...bResults.map(x=>x.recovery.pairEntered)),bEnd=Math.max(...bResults.map(x=>x.recovery.consumerFinished));
+          assert(Math.max(aStart,bStart)<Math.min(aEnd,bEnd),'actual consumer replica intervals overlap');
+          const rResults=await Promise.all(['R1','R2','R3'].map(name=>readResult(readonly.directory,'readonly',name)));
+          function checkpointLineage(data,kind){const rootRow=data.facts.rows.find(([key])=>key.startsWith('afw.finite-owner-issuer-provenance.v1:')&&key.endsWith(':root'));assert(rootRow);const sdk=JSON.parse(rootRow[1]);assert.equal(sdk.I0,data.plan.I0);assert.equal(sdk.C0,data.plan.C0);assert.equal(sdk.C1,data.plan.C1);return {kind,I0:sdk.I0,C0:sdk.C0,C1:sdk.C1,sdkRootHash:sdk.recordHash,graphs:[{role:'M',sha256:data.build.M.sha256},{role:'QA',sha256:data.build.QA.sha256}]};}
+          const lineages=[checkpointLineage(positiveCheckpoint,'positive'),checkpointLineage(reductionCheckpoint,'reduction'),...rResults.map(result=>{assert(result.lineage);return {...result.lineage,kind:result.caseName};})];
+          assert.equal(lineages.length,5);assert.equal(new Set(lineages.map(x=>x.sdkRootHash)).size,5);assert.equal(lineages.flatMap(x=>x.graphs).length,10);
+          for(const l of lineages){assert.equal(l.C0,l.I0+900000);assert.equal(l.C1,l.C0+180000);assert.deepEqual(l.graphs.map(g=>g.role).sort(),['M','QA']);for(const graph of l.graphs)assert.match(graph.sha256,/^[a-f0-9]{64}$/);}
+          const jobs=jobInventory;assert.equal(jobs.total_count,7);assert(jobs.jobs.filter(job=>job.name!=='reduction_consume_b').every(job=>job.status==='completed'&&job.conclusion==='success'));
+          const intervals=jobs.jobs.filter(job=>job.name!=='contracts').flatMap(job=>[{at:Date.parse(job.started_at),delta:1},{at:job.completed_at?Date.parse(job.completed_at):Date.now(),delta:-1}]).sort((a,b)=>a.at-b.at||a.delta-b.delta);let nativeJobs=0,observedNativeJobPeak=0;for(const event of intervals){assert(Number.isSafeInteger(event.at));nativeJobs+=event.delta;observedNativeJobPeak=Math.max(observedNativeJobPeak,nativeJobs);}assert(observedNativeJobPeak<=3);
+          const summary={purpose:'afw.fixed-budget-coherent-private-proof.syn.v1',source:e.GITHUB_SHA,run:e.GITHUB_RUN_ID,attempt:1,businessCounts:{tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0},Q:8,R:3,D:4,P:1,lineages,consumerOverlap:{aStart,aEnd,bStart,bEnd,allFourReady:Math.max(...allD.map(x=>x.recovery.pairReady)),C0:reductionCheckpoint.plan.C0},receipts,jobs:jobs.jobs.map(job=>({id:job.id,name:job.name,status:job.status,conclusion:job.conclusion,startedAt:job.started_at,completedAt:job.completed_at})),observedNativeJobPeak,nativeJobBound:3,miniflarePerJobBound:2,globalMiniflareBound:6,requiresRootAllTerminalReadback:true,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          await writeFile(e.RUNNER_TEMP+'/afw-native-private/coherent-proof.json',JSON.stringify(summary,null,2));
+          await mkdir(e.RUNNER_TEMP+'/afw-qualification-safe',{mode:0o700});
+          await writeFile(e.RUNNER_TEMP+'/afw-qualification-safe/summary.json',JSON.stringify({purpose:'afw.fixed-budget-coherent-summary.syn.v1',source:e.GITHUB_SHA,run:e.GITHUB_RUN_ID,counts:summary.businessCounts,lineages:5,graphs:10,jobs:7,privateProofSha256:sha(Buffer.from(JSON.stringify(summary,null,2))),requiresRootAllTerminalReadback:true,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false},null,2));
+          
+          NODE
+      - name: Encrypt complete private evidence on success or failure
+        id: seal
+        if: always() && !cancelled() && steps.custody.outcome == 'success'
+        env:
+          COMMAND_OK: ${{ steps.native.outcome == 'success' && steps.aggregate.outcome == 'success' }}
+          SUCCESS_KIND: reduction-result-b
+          FAILURE_KIND: consumer-failure
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/seal.log" 2>&1
+          import assert from 'node:assert/strict';import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';
+          import {sealDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env,ok=e.COMMAND_OK==='true',kind=ok?e.SUCCESS_KIND:e.FAILURE_KIND,root=e.RUNNER_TEMP+'/afw-native-private';
+          try{await cp('output',root+'/output',{recursive:true,errorOnExist:true,force:false});}catch(error){if(error.code!=='ENOENT')throw error;}
+          const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,source:e.GITHUB_SHA,sourceTree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:e.GITHUB_RUN_ID,attempt:1,job:e.GITHUB_JOB,role:e.FIXED_ROLE,kind,group:e.AFW_BUDGET_GROUP,lane:e.FIXED_LANE,cases:JSON.parse(e.FIXED_CASES),commandSucceeded:ok,jobStarted:Number(e.AFW_JOB_STARTED_MS),sealedAt:Date.now(),operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          await writeFile(root+'/job-manifest.json',JSON.stringify(manifest,null,2));
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind};
+          const receipt=await sealDirectory({sourceDir:root,stagingDir:e.RUNNER_TEMP+'/afw-native-public',context});
+          await writeFile(e.GITHUB_OUTPUT,'kind='+kind+'\nenvelope-sha256='+receipt.envelopeSha256+'\n',{flag:'a'});
+          NODE
+          
+      - name: Upload encrypted envelope and closed receipts only
+        id: upload
+        if: always() && !cancelled() && steps.seal.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-reduction_consume_b-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-native-public/
+          retention-days: 7
+          if-no-files-found: error
+      - name: Download own exact assigned artifact ID
+        id: own_download
+        if: always() && !cancelled() && steps.upload.outcome == 'success'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-native-readback
+          merge-multiple: true
+      - name: Authenticate own same-ID inner inventory readback
+        id: own_verified
+        if: always() && !cancelled() && steps.own_download.outcome == 'success'
+        env:
+          OWN_ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+          OWN_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
+          OWN_KIND: ${{ steps.seal.outputs.kind }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/readback.log" 2>&1
+          import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {openDirectory} from './test/fixtures/finite-checkpoint-custody.mjs';
+          const e=process.env;assert.match(e.OWN_ARTIFACT_ID,/^[1-9][0-9]*$/);assert.match(e.OWN_DIGEST,/^[a-f0-9]{64}$/);
+          const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
+          await openDirectory({stagingDir:e.RUNNER_TEMP+'/afw-native-readback',destinationDir:e.RUNNER_TEMP+'/afw-native-reopened',context});
+          const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));
+          NODE
+          printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
+          
+      - name: Preserve actual command and custody outcome
+        id: actual_outcome
+        if: always() && !cancelled()
+        shell: bash
+        run: |
+          set -euo pipefail
+          test '${{ steps.native.outcome }}' = success
+          test '${{ steps.aggregate.outcome }}' = success
+          test '${{ steps.own_verified.outcome }}' = success
+      - name: Bind closed summary to own verified native artifact
+        if: steps.aggregate.outcome == 'success' && steps.own_verified.outcome == 'success'
+        env:
+          NATIVE_ID: ${{ steps.upload.outputs.artifact-id }}
+          NATIVE_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-qualification-safe',summary=JSON.parse(await readFile(root+'/summary.json','utf8'));assert.match(e.NATIVE_ID,/^[1-9][0-9]*$/);assert.match(e.NATIVE_DIGEST,/^[a-f0-9]{64}$/);
+          summary.consumerBArtifactId=e.NATIVE_ID;summary.consumerBArtifactDigest=e.NATIVE_DIGEST;summary.consumerBSameIdReadback=true;
+          const bytes=Buffer.from(JSON.stringify(summary,null,2));await writeFile(root+'/summary.json',bytes);await writeFile(root+'/manifest.json',JSON.stringify({source:e.GITHUB_SHA,run:e.GITHUB_RUN_ID,attempt:1,files:[{path:'summary.json',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}]}));
+          NODE
+      - name: Upload closed coherent counts and private-proof hash
+        id: summary_upload
+        if: steps.aggregate.outcome == 'success' && steps.own_verified.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-coherent-summary-${{ github.sha }}-${{ github.run_id }}
+          path: ${{ runner.temp }}/afw-qualification-safe/
+          retention-days: 7
+          if-no-files-found: error
+      - name: Download closed summary by its assigned ID
+        id: summary_download
+        if: steps.summary_upload.outcome == 'success'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.summary_upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-qualification-summary-readback
+          merge-multiple: true
+      - name: Verify closed summary exact-ID inventory
+        if: steps.summary_download.outcome == 'success'
+        env:
+          SUMMARY_ID: ${{ steps.summary_upload.outputs.artifact-id }}
+        shell: bash
+        run: |
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {readFile,readdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-qualification-summary-readback';assert.match(e.SUMMARY_ID,/^[1-9][0-9]*$/);assert.deepEqual((await readdir(root)).sort(),['manifest.json','summary.json']);
+          const bytes=await readFile(root+'/summary.json'),manifest=JSON.parse(await readFile(root+'/manifest.json','utf8'));assert.equal(manifest.source,e.GITHUB_SHA);assert.equal(manifest.run,e.GITHUB_RUN_ID);assert.equal(manifest.attempt,1);assert.deepEqual(manifest.files,[{path:'summary.json',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}]);
+          for(const path of ['manifest.json','summary.json'])assert((await readFile(root+'/'+path)).equals(await readFile(e.RUNNER_TEMP+'/afw-qualification-safe/'+path)));
+          const summary=JSON.parse(bytes);assert.equal(summary.counts.pass,16);assert.equal(summary.requiresRootAllTerminalReadback,true);assert.equal(summary.operationalReadiness,false);console.log('CLOSED_SUMMARY_SAME_ID_VERIFIED '+e.SUMMARY_ID);
+          NODE
diff --git a/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md
# before_blob=ABSENT after_blob=04f033fc766ce0dacda42b96f99e94f87b2745c5
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md
@@ -0,0 +1,122 @@
+# Task 2. Entrega parcial de custodia SYN
+
+Fecha 2026-11-12 UTC. Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, rama `feat/finite-native-cleanup-20261101`. Root autorizó la entrega parcial de custodia y la retirada del workflow temporal después del readback. El único cambio de comportamiento consiste en admitir cuatro valores fijos del contexto autenticado. Se conservaron las comprobaciones de repositorio, ref, revisión, run y primer intento del formato v1.
+
+## Alcance y evidencia
+
+- BASE2 `7852f3a71de7cfcb98fedbd7b51c6a9886bf17da`, árbol `b4246c3128e77a0b1276ea3da9e4dede17f1f8a3`, 3188 hojas. El workflow temporal estaba ausente.
+- Referencia global `29681cae2bf1094ec5c66d5b2784254f77bec697`, árbol `0200cf32ac4e020bd35c56c307fbc8060cf8bd64`. La comparación recursiva completa global→BASE2 encontró 14 diferencias, todas bajo test y docs. Los árboles del código productivo, incluidos `lib/`, `worker/`, las configuraciones, el SDK fijado y los archivos de dependencias, coinciden.
+- [Brief de implementación](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b12746e73d2b3212ad11bd4ee8d6ce1222228654/docs/superpowers/briefs/2026-11-12-finite-budget-task2-implementation-stageA.md). La calificación abierta en este bloque abarcó exclusivamente custodia, ocho contratos puros y preflight de compilación. Todas las operaciones de fuente usaron GitHub. Las ejecuciones usaron Actions en Ubuntu 24.04, Node 22.23.4 y el lock del mismo SHA. El test genera una clave efímera en el runner. Los jobs comprobaron que no recibían `AFW_SYN_CHECKPOINT_KEY` de un environment.
+- El adaptador conserva AES-256-GCM/gzip, inventario en dos pasadas y límites de 4096 archivos, 512 MiB de entrada, 768 MiB de JSONL y 128 MiB de envoltura. La extensión modifica solamente el enum de `expectedContext`. Los nuevos tipos son `readonly-result`, `reduction-checkpoint`, `reduction-result-a` y `reduction-result-b`.
+- Cada prueba C9 sella y vuelve a abrir un conjunto de bytes con el mismo contexto. Rechaza contextos de los demás tipos sin producir directorio de salida y rechaza un cambio de un byte en la envoltura. C10 comprueba que un tipo desconocido también se rechaza antes de sellar. C3 conserva la prueba independiente de alteración de IV, etiqueta y texto cifrado. Estos tests usan únicamente datos sintéticos desechables.
+
+## Historial de revisiones
+
+| Paso | Revisión | Padre | Árbol | Blob temporal | Hojas |
+| --- | --- | --- | --- | --- | ---: |
+| RED, enum original | `8a571e01ecade0fa02b9eada316e1053afa682a4` | `7852f3a71de7cfcb98fedbd7b51c6a9886bf17da` | `dfd17f7f93b6d4f1cc32307c5ef2aabef3d398a5` | `55e07deacc6990a78f14f5b43e95cd45a275c5ca` | 3189 |
+| Primer workflow GREEN, YAML inválido | `5e02883523d7b9b9ee46eda1400dec78328325de` | `8a571e01ecade0fa02b9eada316e1053afa682a4` | `c6c251ff403ffa1f1dec5c99e7283b8049a06ea2` | `07be885b6d8fc595659b7deb358f60a60bd878df` | 3189 |
+| GREEN con workflow corregido | `c2214807f003219e42970e168cac463047b0eb80` | `5e02883523d7b9b9ee46eda1400dec78328325de` | `9d02ec23a66aca918eb4ce61d61caf6ea107cfb8` | `9cdc2e67c83c95924d2d3cc38ee2cb3dbcfaf882` | 3189 |
+
+En RED el helper era el original `9a486b839874ed8e9a950f6a823b18e7585de52e`. En ambas revisiones GREEN era `4d05b5ec0f7b074be88ef9733a47c984b0212351`. El test pasó de `c913c94be080597704fbf7d370475443e1f1b96d` a `a8840f791fcf06c8a77c9e245eef2cc31e6256c2` antes de cambiar el helper. Cada actualización verificó el padre inmediato, el árbol recursivo, los modos y los bytes leídos por blob. Cada ref se actualizó con SHA esperado y sin forzar.
+
+## Resultados en Actions
+
+1. [RED, run 43159635890, job 130987499622](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43159635890/job/130987499622), primer intento, 05:10:54–05:11:23 UTC. El TAP original contó 14 tests, nueve PASS y cinco FAIL. Los cuatro C9 fallaron con `custody_context` al intentar sellar el tipo válido aún desconocido. El quinto FAIL fue el agregado de la suite. C10 y los ocho subtests previos pasaron. Cancelled/skipped/todo 0. El job conservó el código de salida real del test después de verificar el mismo artefacto. ID `13917561964`, 2152 bytes de ZIP, SHA-256 `ad34f13f8a81555f3e712bb9a3b9fb85b5671e9b9c8c8dbd98137e4f4a95b442`, expiración declarada 2026-11-19 05:11:17 UTC. Primera recuperación correcta, reintentos omitidos.
+2. [Workflow rechazado antes de crear jobs, run 43159842658](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43159842658), 05:12:41 UTC. Una sustitución de texto del generador de YAML interpretó la secuencia dólar-apóstrofo de dos expresiones regulares como sufijo de sustitución y duplicó pasos. GitHub registró 0 jobs y 0 pruebas. El arreglo reconstruyó el bloque por concatenación literal en TEMP. Los IDs de pasos resultaron únicos y el cuerpo incluyó un único job y un único preflight. Los blobs de helper y test conservaron sus hashes.
+3. [GREEN, run 43159967950, job 130988602267](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43159967950/job/130988602267), primer intento, 05:13:47–05:14:32 UTC. Ejecución en `c2214807f003219e42970e168cac463047b0eb80`. Los ocho contratos Q1–Q8 pasaron, con 0 fallos, cancelaciones, omitidos y TODO. El proceso de custodia contó por separado 14 PASS (13 subtests y su suite), también con 0 fallos, cancelaciones, omitidos y TODO. Pasaron syntax, lint enfocado y preflight de los grafos M/QA con I0 cerrado. Artefacto `13917287954`, 28774 bytes de ZIP, SHA-256 `e4fe94ad9ad4891b192ca249a02c6eedb8b6a3ca8ae0a9054764f5c7b621a9ba`, expiración declarada 2026-11-19 05:14:28 UTC. Primera recuperación correcta, reintentos omitidos. La verificación comparó el manifiesto local y el descargado por ese ID y volvió a calcular las entradas de inventario.
+
+Comandos ejecutados por los jobs:
+
+```sh
+npm ci --ignore-scripts --no-audit --no-fund
+# RED y GREEN, dentro de procesos separados
+node --test --test-reporter=tap test/finite-checkpoint-custody.test.mjs
+# Sólo GREEN
+node --check test/fixtures/finite-checkpoint-custody.mjs
+node --check test/finite-checkpoint-custody.test.mjs
+npx --no-install eslint test/fixtures/finite-checkpoint-custody.mjs test/finite-checkpoint-custody.test.mjs
+node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs
+AFW_BUDGET_GROUP=positive node test/fixtures/finite-budget-world.mjs preflight-budget
+```
+
+Los TAP puros y el inventario quedaron en los artefactos indicados durante la retención de siete días. El stdout del job imprimió los resultados reducidos. C9 prueba rechazo de una alteración con el manifiesto original. La comprobación independiente que recalcula los bytes externos pertenece al C3 preexistente. Las pruebas no abrieron una instancia de negocio ni leyeron estado nativo OAuth. No se generó un checkpoint o un resultado nativo en esta entrega.
+
+## Cierre parcial y pendientes
+
+La confirmación terminal retira `.github/workflows/afw-finite-budget-qualification.yml` y añade este reporte sobre el padre GREEN `c2214807f003219e42970e168cac463047b0eb80`. Su delta neto frente a BASE2 incluye exclusivamente este reporte, el test de custodia y el enum del helper. El readback independiente del commit de cierre se entrega a Root una vez que GitHub asigne el identificador.
+
+| Caso pendiente | Implementación y calificación en esta entrega |
+| --- | --- |
+| R1, R2 y R3 | Pendientes; las tres comprobaciones readonly se especificaron y no se implementaron ni ejecutaron. |
+| D1, D2, D3 y D4 | Pendientes; los cuatro casos de reducción y la recuperación de pares antes del mismo C0 no se implementaron ni ejecutaron. |
+| Siete jobs y calificación de 16 casos | Pendientes; no se construyó ni habilitó el workflow conjunto. La custodia y Q1–Q8 no acreditan ese resultado. |
+| Recepción cifrada nativa y enlaces de procedencia entre jobs | Pendientes; el tipo autenticado está cubierto por pruebas puras. Queda verificar manifest interior, artifact ID, consumidor y margen en un flujo integrado. |
+
+La sonda existente `firstConnectionAvailability()` utiliza un Root de request registrado y la puerta de exclusión del mismo actor. Quedó identificada mediante lectura estática. Esta entrega no aporta una observación de exclusión durante R3 o D4. Task1 conserva su resultado previo, P1 no se reejecutó, ORD-1 sigue abierto y las revisiones de conjunto quedan pendientes.
+
+`operationalReadiness=false` · `completePackage=false` · `PCoff=false` · `globalNativeDrainVerified=false` · `sdkNamespaceEmptyVerified=false`.
+
+## Preparación de casos fijos y primer control puro — 2026-11-12
+
+La ampliación se inició con tests, sin ejecutar casos nativos: commit `5c294fd08ae608f80127e593c57cee8b4703debc`, árbol `8249be8241d8d80fb61c1529960d699391d58723`, test `8339c7550c05e996ad44263fafd6a2a7ac564c0e`. Después se prepararon los fixtures en `b5caa68ec74cc9848a86a29f36da207658a3b4de`, árbol `fa0f8214a3b687c88d27f47ac3f5e49084340bc9`: world `e5c92742ddddab156446ee1c7a0e3429be8798cd`, cleanup fixture `3448f503dcad52d4efa08725e3146d7058ca7451`, TEMP puro `9fa482c6cadb26de756027ea5fca2d9b81055eb3`. Se verificó el árbol recursivo completo: 3190 hojas, 3185 blobs/modos protegidos exactos frente a BASE-N `92e1f71d9bf87b04ce2a82dbc6f6f43039ed944b`, y CAS/readback de la rama. El prefijo previo de este reporte se conserva.
+
+El diseño añade exclusivamente emisión SYN después del transform original: mismos `Initial.prototype`/ctx/env, cinco métodos fijos y estado WeakMap privado. El entry original sigue sujeto a 64800 bytes/SHA256 `89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257` y a sus selectores. Dos notificaciones numéricas observan los enqueue de readonlyGrantKv/reductionKv después del push original y antes del pump; una notificación pasiva observa el Promise real de revokeGrant con el then intrínseco. Se registran separados del baseline, sin nueva autorización ni cambios de algoritmo. Estas propiedades aún requieren un preflight conjunto satisfactorio; el diseño no acredita su ejecución nativa.
+
+[Run puro 43163999087/1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43163999087), job `131001483736`, 05:50:10–05:50:54 UTC, terminó FAILURE. Pasaron syntax de los tres JS, lint enfocado, carga con grupo ausente (un wrapper de archivo PASS, cero casos de negocio, sin directorios nativos), rechazo del grupo inválido y Q1–Q8: 8 PASS/0 FAIL/cancelled/skipped/todo. No se reejecutó custodia14 ni P1. Falló el paso de los tres preflights de compilación; el log público conserva sólo `preflight_failed`, sin identificar perfil o assertion.
+
+El artefacto de fallo `13919585469` conserva únicamente status y manifiesto, 633 bytes ZIP, SHA256 `6937c2f148ba3ab84a38b1d852b5f1a1d4805e9969dedf8b36c971e2eb3c80e0`, caducidad declarada 2026-11-19T05:50:51Z. Upload, descarga por el mismo ID y readback de inventario pasaron. Los TAP y el preflight privado no se copiaron en esa rama de fallo: es una brecha de evidencia, no una causa inferida. La primaria del job registra explícitamente los recuentos anteriores.
+
+Root autorizó un único diagnóstico puro adicional, limitado a los perfiles positive/readonly/reduction_a del mismo código y sin Q/custodia/I0. Capturará DTO cerrado con perfil/etapa/enums, actual/expected numéricos o hashes y mensaje resumido por longitud/SHA, sin mensaje/stack/Worker/secretos. Se conservará ese JSON seguro también cuando un perfil falle, con siete días y readback por ID. No se refrescan pins ni se repite automáticamente el ensayo. El workflow de siete jobs nativos sigue sin publicación o ejecución; la calificación16 está HELD.
+
+### Diagnóstico puro acotado
+
+[Run 43164676511/1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43164676511), job `131003643102`, Source `d3b94f785e863f179c6c1e664fc63d5edef01afd`, árbol `f65d814db1be391069e356fdad9c182d073c28bf`, TEMP `7ebc3cc4510d63ef6771e1810a4ee75fe7f6aa86`, terminó FAILURE de los perfiles después de preservar el diagnóstico. Instalar, capturar los tres perfiles, upload, descarga por ID y verificación del manifiesto pasaron. No se ejecutaron Q, custodia, productores, readonly/reduction nativos, P1 ni I0.
+
+La primaria segura distingue: positive PASS/complete, I0Opened=false, nativeExecutionProduced=false y additionalSYNCount=0. readonly y reduction_a fallaron durante preflight con el label público `single passive actual SDK settlement site`; el mensaje tiene 163 bytes y SHA256 `0552133afd71d5296a98b3ee41f48140f112d67fbfe33d6af0355abf440bb8da`. El error exterior es Error y carece de code/operator/actual/expected. No se conoce todavía el recuento exacto de sitios coincidentes. La hipótesis acotada es un selector posterior al transform que no identifica inequívocamente la declaración del Promise SDK; no se atribuye la causa a los pins o a producción.
+
+Artefacto seguro `13919238198`, 997 bytes ZIP, digest `7df063b6eefcf1ab25e2b0f7efe3d377f311531e604a48119237828b804158ce`, caducidad declarada `2026-11-19T05:56:50Z`. Contiene `diagnostics.json` completo y `manifest.json`, incluidos los fallos. El job verificó contenido/inventario idéntico después de descargar ese mismo ID e imprimió únicamente el DTO cerrado. No se descargó evidencia privada al PC.
+
+STOP de correcciones y nuevas ejecuciones hasta el ruling de Root. Preparar código no equivale a calificar R/D, ni a 16 PASS. El template de siete jobs sigue solamente en memoria de trabajo: no se publicó ni activó. Todas las banderas de disponibilidad operativa, paquete completo, PCoff y drenaje permanecen false.
+
+### Ruling focal y covering puro del selector
+
+Root contrastó el módulo protegido `lib/mcp-qa-finite-owner-cleanup.mjs` blob `1a5a2583d266179cdd89f799c64199f29044fec5`: tanto la revocación del grant de aplicación mediante `store.revokeGrant` (línea 578) como la revocación SDK mediante `api.revokeGrant` (línea 760) declaran una variable `actual`. El predicado nuevo que buscaba el nombre actual y el texto revokeGrant podía confundir ambas. Es un defecto del selector de observación, con respaldo en fuente; no se atribuye un recuento exacto al diagnóstico anterior, cuyo error exterior no lo conservó.
+
+Se autorizó una corrección mínima sólo en world y un único covering puro. El selector corregido exige la llamada retain(api.revokeGrant(selector,i.subject)) y, en el mismo bloque, las instrucciones consecutivas await actual, check() y la declaración metrics=bounded.facts(). Valida una secuencia estructural única tanto antes como después del transform, los dos receivers originales separados y el módulo/pins y statement hash originales. Mantiene el Promise y await del negocio sin sustitución; las dos notificaciones de cola y la observación pasiva siguen separadas. Cleanup, tests R/D, SDK, descriptores y guards no cambian.
+
+El covering repite con causa concreta syntax/lint, Q1–Q8, carga inactiva/grupo inválido y los tres preflights. Conserva TAP seguros completos, JSON de preflights disponibles y DTO cerrado de fallo también si falla un perfil, con manifiesto y readback por ID; no ejecuta custodia14 ni casos nativos. La fuente quedará congelada hasta terminal/readbacks. Si vuelve a fallar, se conserva/STOP sin otro intento.
+
+### Covering del selector aceptado; cierre del harness de evidencia
+
+[Covering GREEN 43165811990/1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43165811990), job `131007299542`, Source `ceaa0d28b6bc2fdb26ec5a896aed4a7fa411433d`, árbol `82d498775f0b1fde78aa7c8effe4fc027a3dfb86`, world `94f5be0b957a8d08c392d6f2b7e6a5a6af27903a`, TEMP `3fa7de02d612a3d23a3feac1f607cbc61fa3fa93`, terminó SUCCESS. Syntax/lint pasaron; Q1–Q8 8 PASS y FAIL/cancelled/skipped/todo 0. El wrapper de importación inactiva cuenta 1 PASS separado, cero negocio; el grupo inválido se rechazó. Los tres perfiles positive/readonly/reduction_a completaron con I0Opened=false y nativeExecutionProduced=false. Positive añadió cero sensores; cada perfil SYN validó exactamente dos sitios de cola y un sitio SDK estructural.
+
+El prefijo emitido original tiene 106772 bytes, SHA256 `f5458d1d7f94665c8b02915972c95614b3a3bd2125d6d6a89ef6bea737c999ec`. El literal readonly tiene 12479 bytes/SHA256 `b9719de7e6aed8d7edc9340adfafc8d1557ef2a13c1be1e70b834d29549f77c7`; el de reduction 12480 bytes/SHA256 `76eeb8369fc9d417fcacff4a8b26c442fee7ea73d56841a5fe66d2ccd158d631`. El módulo de observación de colas/SDK emitido tiene 112780 bytes/SHA256 `e3421fe45ea98d5441a94e297168f6431d127787113ca35ceec51a791bb239b6`. Los pins originales del entry, módulo, paquetes y selectores se conservaron.
+
+Artefacto `13920310785`, 111373 bytes ZIP, digest `e36a95c46c94cc26ba719beb65dd8845aadb6dac48a9d4f8b9530d03c4c34c16`, caducidad declarada `2026-11-19T06:07:15Z`. Conserva TAP seguros completos, los tres JSON de preflight y diagnóstico cerrado; upload y descarga por el mismo ID/readback pasaron a la primera. No se ejecutaron custodia14, P1 ni R/D nativos.
+
+Root autorizó completar dos puntos de evidencia en world: capturar el Root SDK durable, Reference nullable, plan original y ambos scripts montados de cada readonly, sin inferir I0 desde TTL; y asegurar que release/restore/dispose se intenten en ambos fixtures incluso si una fase falla. La recuperación ya usa Promise.allSettled antes de limpiar, y recoverCheckpoint conserva su propio dispose en fallo, sin editar persistencia. El nuevo disposer espera ambas ramas y vuelve a lanzar la primera identidad de error sólo después de intentar todas sus fases.
+
+Se prepara un único control cloud sin I0 que llama al helper real con dos callbacks inertes y tres fallos fijos (release, restore, dispose del primero). Debe verificar todas las fases del sibling y preservar la identidad del error, además de syntax/lint de world. No repite Q8, custodia o compilación, porque el compilador no cambió. Las cinco ocurrencias originales y diez registros de rol/montaje no se equiparan a cinco timestamps distintos o diez hashes únicos.
+
+La agregación preparada para consumer B conserva los otros seis jobs terminales y el propio B en progreso/tiempo observado. No fabrica su fin ni la conclusión futura de los siete; Root hará el readback terminal posterior. B mantiene sus dependencias de inicio originales, monta las dos réplicas antes de C0 y sólo después de sus pruebas/dispose resuelve las evidencias A/P del mismo run por IDs únicos, digest, Source y contexto autenticado.
+
+### Control de disposición y entrega PREPARED_INACTIVE
+
+[Control focal GREEN 43167323999/1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43167323999), job `131012128837`, Source `0453cb73edaeee17ea0a146ecdb87e5bcc382def`, árbol `efe0d6026e7c60b73f068e7d70cdee7377e1a399`, world `ed344497598bafd64f590417d7d1bde70d7ad094`, TEMP `7841fc37b517df6d3895bf2f94900445f1afeda4`, terminó SUCCESS. Se ejecutaron únicamente `node --check test/fixtures/finite-budget-world.mjs`, lint enfocado y `env -u AFW_BUDGET_GROUP node test/fixtures/finite-budget-world.mjs verify-pair-disposer`, después del npm ci fijado. El control del helper real contó 1 control/3 escenarios fijos: release, restore y dispose del primer fixture. En los tres se intentaron las tres fases en ambos fixtures (3/3), allPhases=true y sameError=true. I0Opened=false, nativeExecutionProduced=false y businessCases=0. No se repitieron Q8, custodia o compilación.
+
+Artefacto `13920113263`, 892 bytes ZIP, digest `4e690fc2954a2e0e0bb177b335bfa691aa174a4bc4d1a4dcf1d57c56b5e393a4`, caducidad declarada `2026-11-19T06:19:43Z`. El JSON seguro completo y su manifiesto se descargaron por el mismo ID y se compararon byte a byte/inventario a la primera. No se realizaron descargas privadas ni builds/tests de proyecto en el PC.
+
+El cierre sustituye TEMP por el candidato manual INACTIVO, blob `ecabe4d997869b4316e11810f5a0e2d6e36151c5`. Sólo tiene workflow_dispatch, sin inputs, siete gates literales false con repository/ref/attempt1, contenidos/Actions de lectura, Node22.23.4/Ubuntu24.04 y el lock original. Los siete jobs son contracts; positive_prepare→positive_consume; reduction_prepare→reduction_consume_a; readonly→reduction_consume_b, con B también dependiente de reduction_prepare. B no depende de A/P antes de arrancar. El ancho estático del DAG es tres; cada consumer de reducción sólo monta dos MF, y el límite global preparado es seis. Contracts tiene dos minutos, readonly siete y los demás como máximo quince. Son propiedades preparadas del código, no una observación de concurrencia ejecutada.
+
+Cada consumidor prepara las dos réplicas y readbacks de inputs antes del mismo C0−30s, conserva el Source/scripts/manifest original y hace los controles por rol/kind/lane/cases. A y B validan el mismo productor reduction_a para las cuatro D y sus IDs/digests exactos antes del mount. Se conserva el Root30s/child5s/I0/C0/C1 original y el TTL600 natural; ningún job renueva el reloj por retrasos de Actions. El sensor separa invocación/settlement nativo de los ACK outward, con dos holds fijos y callbacks de cola ligados al mismo objeto KV. Las réplicas se disponen mediante el helper probado, incluso después de fallos parciales; no se afirma drenaje físico.
+
+El candidato sella logs/TAP, estado nativo, scripts/metafiles, manifests e inputs SYN en la custodia existente (mismo environment/key y enum aceptado), tanto para resultados como fallos, con 4096 archivos/512MiB nativos/768MiB JSONL/128MiB envelope y siete días. Los fallos no se aceptan como checkpoints. La disponibilidad efectiva del environment/key no fue consultada por los jobs puros: antes de un ensayo nativo el key-preflight debe fallar cerrado si falta. No se creó, rotó o mostró una clave.
+
+Tras terminar/disponer sus casos nativos, B resuelve los resultados A/P del mismo run mediante inventario acotado, nombre exacto único, ID, digest, Source y manifiesto autenticado; comprueba cuatro readytimes, intervalos reales de consumers, cinco ocurrencias originales y diez registros de rol/montaje. Los payloads y ZIPs se acotan antes de extracción; la evidencia detallada y el log de agregación quedan privados/cifrados. El resumen público sólo expone recuentos, hashes, referencias de artefactos y flags false, y también exige descarga/readback por su ID. El snapshot admite los otros seis jobs terminales y B aún en progreso; Root debe verificar después la conclusión y el intervalo terminal reales de los siete, sin un octavo job o fin futuro fabricado.
+
+Se verificaron estáticamente siete gates false, sus dependencias/ancho y 32 cuerpos Node inline por análisis de texto, sin ejecutarlos. El bloque P1 original y la composición legacy del entry se compararon exactos. El readback recursivo global `0200cf32ac4e020bd35c56c307fbc8060cf8bd64` frente al candidato conservó idénticas las 1000 hojas fuera de test/docs/TEMP. El cierre debe conservar asimismo los 3185 blobs/modos no listados de BASE-N y entregar a Root los IDs finales de commit/árbol/reporte asignados por GitHub; esos IDs no pueden autorreferenciarse dentro de su propio blob.
+
+Mapa final de código: world `ed344497598bafd64f590417d7d1bde70d7ad094`; cleanup fixture `3448f503dcad52d4efa08725e3146d7058ca7451`; native tests `8339c7550c05e996ad44263fafd6a2a7ac564c0e`; TEMP `ecabe4d997869b4316e11810f5a0e2d6e36151c5`; este reporte mantiene su prefijo histórico. Custody `4d05b5ec0f7b074be88ef9733a47c984b0212351`/`a8840f791fcf06c8a77c9e245eef2cc31e6256c2`, Task1 runtime/pure/evidence/descriptores y todos los módulos/configs/dependencias productivos permanecen exactos.
+
+**PREPARED_INACTIVE — STOP_WRITES.** R1–R3, D1–D4, P1 y la calificación conjunta16 no se ejecutaron en esta preparación. No hay resultado 16 PASS, hosting, servicio de guardia o permiso de activación. Root conserva los gates de revisión completa, un ensayo futuro específico y revisiones Spec/Quality/global. operationalReadiness=false; completePackage=false; PCoff=false; globalNativeDrainVerified=false; sdkNamespaceEmptyVerified=false.
diff --git a/test/finite-checkpoint-custody.test.mjs b/test/finite-checkpoint-custody.test.mjs
# before_blob=c913c94be080597704fbf7d370475443e1f1b96d after_blob=a8840f791fcf06c8a77c9e245eef2cc31e6256c2
--- a/test/finite-checkpoint-custody.test.mjs
+++ b/test/finite-checkpoint-custody.test.mjs
@@ -80,20 +80,44 @@
   const readHeader=data=>JSON.parse(data.subarray(4,4+data.readUInt32BE(0)));
   const envelope=readHeader(content[0]);assert.deepEqual(Object.keys(envelope).sort(),['algorithm','compression','context','iv','version']);
   assert.equal(envelope.compression,'gzip');assert.equal(envelope.algorithm,'AES-256-GCM');assert.equal(Buffer.from(envelope.iv,'base64').length,12);
   const alternate=join(sandbox,'second');await seal(source,alternate);
   assert.notEqual(envelope.iv,readHeader(await readFile(join(alternate,'envelope.bin'))).iv);
   const dest=join(sandbox,'restored');const receipt=await open(stage,dest);assert.deepEqual(receipt,rec);
   assert((await readFile(join(dest,'datos','obra-ñ.bin'))).equals(original));assert.equal((await readFile(join(dest,'vacío'))).length,0);
   assert.equal((await stat(dest)).mode&0o777,0o700);assert.equal((await stat(join(dest,'datos'))).mode&0o777,0o700);assert.equal((await stat(join(dest,'datos','obra-ñ.bin'))).mode&0o777,0o600);
  });
 
+ const resultKinds=['readonly-result','reduction-checkpoint','reduction-result-a','reduction-result-b'];
+ for(const kind of resultKinds){
+  await t.test('C9 fixed custody kind '+kind,async()=>{
+   const bound={...context,kind};
+   const sealed=join(sandbox,'sealed-'+kind),restored=join(sandbox,'opened-'+kind);
+   const receipt=await seal(source,sealed,bound);
+   assert.deepEqual(receipt.context,bound);
+   assert.deepEqual(await open(sealed,restored,bound),receipt);
+   assert.equal(sha(await readFile(join(restored,'datos','obra-ñ.bin'))),sha(original));
+   const rejected=join(sandbox,'denied-'+kind);
+   for(const other of ['checkpoint','positive-result','producer-failure','consumer-failure',...resultKinds,'unknown-result']){
+    if(other!==kind)await rejectNew(()=>open(sealed,rejected,{...context,kind:other}),rejected);
+   }
+   const binary=await readFile(join(sealed,'envelope.bin'));
+   binary[binary.length-1]^=1;
+   await writeFile(join(sealed,'envelope.bin'),binary);
+   await rejectNew(()=>open(sealed,rejected,bound),rejected);
+  });
+ }
+ await t.test('C10 unknown custody kind fails before sealing',async()=>{
+  const dest=join(sandbox,'unknown-kind');
+  await rejectNew(()=>seal(source,dest,{...context,kind:'unknown-result'}),dest);
+ });
+
  await t.test('C2 wrong key, absent key and every different context fail without output',async()=>{
   const dest=join(sandbox,'bad-context');
   for(const secret of [undefined,'',key.toString('hex').slice(2),key.toString('hex')+'\n',otherKey.toString('hex')]){
    try{if(secret===undefined)delete process.env[keyEnv];else process.env[keyEnv]=secret;await rejectNew(()=>open(stage,dest),dest);}
    finally{process.env[keyEnv]=key.toString('hex');}
   }
   for(const changes of [{sourceSha:'a'.repeat(40)},{runId:'18'},{runAttempt:2},{kind:'positive-result'},{repository:'unrelated/repo'},{ref:'refs/tags/fixture'},{extra:true}]){
    await rejectNew(()=>open(stage,dest,{...context,...changes}),dest);
   }
  });
diff --git a/test/fixtures/finite-budget-world.mjs b/test/fixtures/finite-budget-world.mjs
# before_blob=f654001b027555c41dbe3f287445e73ac849094b after_blob=ed344497598bafd64f590417d7d1bde70d7ad094
--- a/test/fixtures/finite-budget-world.mjs
+++ b/test/fixtures/finite-budget-world.mjs
@@ -1,20 +1,22 @@
 import assert from 'node:assert/strict';
 import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';
 import {createHash} from 'node:crypto';
 import {resolve,relative,join} from 'node:path';
 import {pathToFileURL} from 'node:url';
 import ts from 'typescript';
 import {budgetReaderSiteCount} from './finite-budget-diagnostics.mjs';
 import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './finite-budget-evidence.mjs';
 
 
+let fixedCompileProfileOverride=null;
+const fixedAdapterFamily=()=>{const group=fixedCompileProfileOverride??process.env.AFW_BUDGET_GROUP;return group==='readonly'?'readonly':['reduction_a','reduction_b'].includes(group)?'reduction':null;};
 const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
 const METHODS=new Set(['get','put','list','delete','first','all','run','exec','batch','transaction','sync','getAlarm','setAlarm','deleteAlarm','fetch','read','cancel']);
 const label=text=>text.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g,'[literal]');
 function nearest(node){
  for(let n=node.parent;n;n=n.parent)if(ts.isFunctionDeclaration(n)||ts.isFunctionExpression(n)||ts.isArrowFunction(n)||ts.isMethodDeclaration(n)||ts.isConstructorDeclaration(n)||ts.isGetAccessorDeclaration(n)||ts.isSetAccessorDeclaration(n)){
   const name=n.name?.getText();if(name)return name;
   if(ts.isVariableDeclaration(n.parent))return n.parent.name.getText();
   if(ts.isCallExpression(n.parent))return 'callback:'+n.parent.expression.getText();
   return 'anonymous';
  }
@@ -603,37 +605,114 @@
  assert.equal(cleanupPutAdapters,path==='lib/mcp-qa-finite-initial-cleanup.mjs'?1:0,'fixed local cleanup put adapter');
  assert.equal(scopeEdges,expectedScopes[path]??0,'fixed prepared scope hook count '+role+' '+path);
  const transformed=ts.createPrinter({newLine:ts.NewLineKind.LineFeed}).printFile(result.transformed[0]);result.dispose();sourceAST(transformed,path);
  return {source:"import {budget as "+BUDGET_ID+"} from 'afw:budget-runtime';\n"+transformed,counts:{nativeCalls,identityEdges,bodyEdges,facadeEdges,scopeEdges,guardEdges},selectorCounts:selected?.counts??[],readerSites};
 }
 
 const scopeInputPins=budgetNativeDescriptorProposal.implementationSupplement.scopeInputPins;
 function requireOrdinaryObserver(){
  assert.equal(process.env.AFW_BUDGET_DIAGNOSTIC_CANDIDATE,undefined,'deprecated diagnostic candidate rejected before I0');
 }
+
+
+function fixedSdkSettlementSequence(source,label){
+ const ast=sourceAST(source,'SYN-fixed-SDK-sequence-'+label),matches=[],receivers=[];
+ const call=(node,receiver,method,args)=>ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)&&node.expression.expression.getText(ast)===receiver&&node.expression.name.text===method&&node.arguments.length===args.length&&node.arguments.every((arg,index)=>arg.getText(ast)===args[index]);
+ const declaration=(statement,name)=>ts.isVariableStatement(statement)&&statement.declarationList.declarations.length===1&&statement.declarationList.declarations[0].name.getText(ast)===name?statement.declarationList.declarations[0]:null;
+ const retainedSdk=statement=>{
+  const d=declaration(statement,'actual'),outer=d?.initializer;
+  return outer&&ts.isCallExpression(outer)&&outer.expression.getText(ast)==='retain'&&outer.arguments.length===1&&call(outer.arguments[0],'api','revokeGrant',['selector','i.subject']);
+ };
+ const walk=node=>{
+  if(ts.isVariableStatement(node)){
+   const d=declaration(node,'actual'),outer=d?.initializer;
+   if(outer&&ts.isCallExpression(outer)&&outer.expression.getText(ast)==='retain'&&outer.arguments.length===1){
+    const inner=outer.arguments[0];
+    if(ts.isCallExpression(inner)&&ts.isPropertyAccessExpression(inner.expression)&&inner.expression.name.text==='revokeGrant')receivers.push(inner.expression.expression.getText(ast));
+   }
+  }
+  if(ts.isBlock(node))for(let index=0;index+3<node.statements.length;index++){
+   const [assignment,awaited,checked,metrics]=node.statements.slice(index,index+4);
+   if(!retainedSdk(assignment))continue;
+   assert(ts.isExpressionStatement(awaited)&&ts.isAwaitExpression(awaited.expression)&&ts.isIdentifier(awaited.expression.expression)&&awaited.expression.expression.text==='actual','SDK actual standalone await adjacency '+label);
+   assert(ts.isExpressionStatement(checked)&&ts.isCallExpression(checked.expression)&&checked.expression.expression.getText(ast)==='check'&&checked.expression.arguments.length===0,'SDK original check adjacency '+label);
+   const metric=declaration(metrics,'metrics');assert(metric&&call(metric.initializer,'bounded','facts',[]),'SDK bounded metrics same-block adjacency '+label);
+   matches.push(assignment.end);
+  }
+  ts.forEachChild(node,walk);
+ };walk(ast);
+ assert.equal(matches.length,1,'single structural actual SDK settlement sequence '+label);
+ assert.deepEqual(receivers.sort(),['api','store'],'two distinct original revokeGrant receivers '+label);
+ return {end:matches[0],sites:matches.length,sameNameReceivers:receivers,receiver:'api',method:'revokeGrant',args:['selector','i.subject'],adjacency:['const-actual-retain-api','await-actual','check','bounded-facts']};
+}
+
+function fixedQueueObservation(baseline,originalSdk){
+ const ast=sourceAST(baseline,'SYN-fixed-queue-observation'),sites=[],sdk=fixedSdkSettlementSequence(baseline,'emitted-baseline'),sdkSites=[sdk.end];
+ const walk=node=>{
+  if(ts.isExpressionStatement(node)&&ts.isCallExpression(node.expression)&&ts.isPropertyAccessExpression(node.expression.expression)&&node.expression.expression.getText(ast)==='queue.push'){
+   let owner=node.parent,family=null;
+   while(owner){if(ts.isFunctionDeclaration(owner)&&['readonlyGrantKv','reductionKv'].includes(owner.name?.text)){family=owner.name.text==='readonlyGrantKv'?1:2;break;}owner=owner.parent;}
+   if(family!==null){
+    assert.equal(node.expression.arguments.length,1);assert(ts.isObjectLiteralExpression(node.expression.arguments[0]));
+    assert.deepEqual(node.expression.arguments[0].properties.map(p=>p.name.getText(ast)),['method','args','resolve','reject']);
+    sites.push({family,end:node.end});
+   }
+  }ts.forEachChild(node,walk);
+ };walk(ast);assert.deepEqual(sites.map(s=>s.family),[1,2],'exact two original enqueue notifications after pinned baseline transform');
+ assert.equal(sdkSites.length,1,'single passive actual SDK settlement site');
+ const edits=sites.map(site=>({end:site.end,text:"\ntry{globalThis.__afwFixedSynBudgetQueueObserve?.(alias,"+site.family+",queue.length,active,Date.now());}catch{}\n"}));
+ edits.push({end:sdkSites[0],text:"\n{try{const __afwSynSdkObserver=Reflect.apply(__afwFixedSynPromiseThen,actual,[()=>{try{globalThis.__afwFixedSynBudgetSdkObserve?.(life.alias,1,Date.now());}catch{}},()=>{try{globalThis.__afwFixedSynBudgetSdkObserve?.(life.alias,2,Date.now());}catch{}}]);Reflect.apply(__afwFixedSynPromiseThen,__afwSynSdkObserver,[()=>undefined,()=>undefined]);}catch{}}\n"});
+ let source=baseline;for(const edit of edits.sort((a,b)=>b.end-a.end))source=source.slice(0,edit.end)+edit.text+source.slice(edit.end);
+ source="const __afwFixedSynPromiseThen=Promise.prototype.then;\n"+source;
+ sourceAST(source,'SYN-fixed-queue-emission');
+ return {source,proof:{purpose:'afw.fixed-syn-queue-observation.v1',baselineBytes:Buffer.byteLength(baseline),baselineSha256:hash(baseline),emittedBytes:Buffer.byteLength(source),emittedSha256:hash(source),sites:sites.map(s=>s.family),sdkSettlementSites:sdkSites.length,sdkDeclarationProvenance:{original:originalSdk,emitted:Object.fromEntries(Object.entries(sdk).filter(([key])=>key!=='end')),protectedModuleBlob:'1a5a2583d266179cdd89f799c64199f29044fec5',originalStatementSha256:hash('const actual=retain(api.revokeGrant(selector,i.subject));')},fields:['alias-identity','numeric-family','queued','active','timestamp'],businessAuthority:false}};
+}
+async function appendFixedSynAdapter(baseline,family){
+ const ast=sourceAST(baseline,'SYN-baseline-entry'),classes=ast.statements.filter(n=>ts.isClassDeclaration(n)&&n.name?.text==='Initial');
+ assert.equal(classes.length,1,'same existing named DO class');const node=classes[0];
+ assert(node.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword));
+ assert.equal(node.heritageClauses?.[0]?.types[0]?.expression.getText(ast),'FiniteClosure');
+ const names=node.members.map(n=>n.name?.getText(ast)),added=['finiteBudgetReadonly','finiteBudgetReduction','finiteBudgetSignals','finiteBudgetRelease','finiteBudgetRestore'];
+ for(const name of ['ownerReferenceConfigure','ownerCleanupFault','firstConnectionAvailability'])assert.equal(names.filter(n=>n===name).length,1);
+ for(const name of added)assert(!names.includes(name)&&!baseline.includes(name),'no SYN method collision');
+ const {finiteBudgetSynAdapterSource}=await import('./finite-owner-cleanup.mjs');
+ assert(['readonly','reduction'].includes(family));
+ const literal="const __afwFiniteBudgetFamily="+JSON.stringify(family)+";\n"+finiteBudgetSynAdapterSource;
+ const extension=sourceAST(literal,'SYN-fixed-prototype-adapter'),calls=[];
+ const operationInventory=Object.fromEntries(["Reflect.apply(","Object.defineProperty(","Object.defineProperties(","Promise.allSettled(","new WeakMap("].map(marker=>[marker,finiteBudgetSynAdapterSource.split(marker).length-1]));assert.deepEqual(operationInventory,{"Reflect.apply(":21,"Object.defineProperty(":2,"Object.defineProperties(":1,"Promise.allSettled(":1,"new WeakMap(":2},'closed fixed adapter operation inventory');
+ const walk=n=>{if(ts.isCallExpression(n)){const expression=n.expression.getText(extension);if(expression==='Object.defineProperties'){
+  assert.equal(n.arguments[0].getText(extension),'Initial.prototype');assert(ts.isObjectLiteralExpression(n.arguments[1]));calls.push(n.arguments[1].properties.map(p=>p.name.getText(extension)));
+ }}ts.forEachChild(n,walk);};walk(extension);assert.deepEqual(calls,[added]);
+ const source=baseline+'\n'+literal;assert.equal(source.slice(0,baseline.length),baseline,'exact original emitted prefix');
+ return {source,proof:{purpose:'afw.fixed-syn-prototype-adapter.v1',family,baselineBytes:Buffer.byteLength(baseline),baselineSha256:hash(baseline),literalBytes:Buffer.byteLength(literal),literalSha256:hash(literal),emittedBytes:Buffer.byteLength(source),emittedSha256:hash(source),methods:added,operationInventory,nativeInputAndAckObservationsSeparate:true,businessAuthority:false,originalEntryBytes:64800,originalEntrySha256:'89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257'}};
+}
+
 export function createBudgetCompiler(role){
  assert(['M','QA'].includes(role));const testRevision=process.env.GITHUB_SHA;assert.match(testRevision??'',/^[a-f0-9]{40}$/,'budget actual Actions revision before I0');
  requireOrdinaryObserver();const runtimeOptions={testRevision,workerRole:role};
  const records=new Map(),prepared=new Map(),expected=new Set(budgetNativeDescriptorProposal.sourceDescriptors.filter(p=>p.roles.includes(role)).map(p=>p.path));
  for(const p of scopeInputPins.filter(p=>p.roles.includes(role)))expected.add(p.path);
  for(const p of budgetNativeDescriptorProposal.packages.filter(p=>p.roles.includes(role)))expected.add(p.path);
  if(role==='QA')expected.add('<stdin>');
  const wanted=path=>expected.has(path);
  async function transform(path,source){
   assert(wanted(path),'unexpected instrumentation path '+role+' '+path);assert(!records.has(path),'duplicate prepared module '+role+' '+path);
   const raw=path==='<stdin>'?source:await readFile(path,'utf8');
   if(nativeDescriptorByPath.has(path))await validateBudgetPreparedSource({path,role,prepared:source,raw});
   else if(path!=='<stdin>'&&!path.startsWith('node_modules/')){
    const pin=scopeInputPins.find(p=>p.path===path);assert(pin?.roles.includes(role));assert.equal(hash(raw),pin.rawSha256,'scope input raw pin '+path);assert.equal(Buffer.byteLength(raw),pin.rawBytes);if(role==='M')assert.equal(source,raw);
   }
-  const result=transformBudgetPreparedSource(source,path,role);
-  records.set(path,{role,path,rawBytes:Buffer.byteLength(raw),rawSha256:hash(raw),preparedBytes:Buffer.byteLength(source),preparedSha256:hash(source),emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source),counts:result.counts,selectors:result.selectorCounts,readerSites:result.readerSites});
+  const family=fixedAdapterFamily(),originalSdk=family&&role==='QA'&&path==='lib/mcp-qa-finite-owner-cleanup.mjs'?fixedSdkSettlementSequence(source,'original-prepared'):null;
+  let result=transformBudgetPreparedSource(source,path,role);let additionalSYN=null;
+  if(family&&role==='QA'&&path==='<stdin>'){const emitted=await appendFixedSynAdapter(result.source,family);additionalSYN=emitted.proof;result={...result,source:emitted.source};}
+  if(family&&role==='QA'&&path==='lib/mcp-qa-finite-owner-cleanup.mjs'){assert.equal(source.split('const actual=retain(api.revokeGrant(selector,i.subject));').length-1,1,'original SDK call and retain unchanged');const emitted=fixedQueueObservation(result.source,Object.fromEntries(Object.entries(originalSdk).filter(([key])=>key!=='end')));additionalSYN=emitted.proof;result={...result,source:emitted.source};}
+  records.set(path,{role,path,rawBytes:Buffer.byteLength(raw),rawSha256:hash(raw),preparedBytes:Buffer.byteLength(source),preparedSha256:hash(source),emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source),counts:result.counts,selectors:result.selectorCounts,readerSites:result.readerSites,...additionalSYN?{additionalSYN}:{}});
   prepared.set(path,result.source);return result.source;
  }
  function plugin(existing=null){
   return {name:'fixed-finite-budget-'+role,setup(builder){
    builder.onResolve({filter:/^afw:budget-runtime$/},()=>({path:'runtime',namespace:'afw-budget'}));
    builder.onLoad({filter:/.*/,namespace:'afw-budget'},()=>({contents:"import {createBudgetRuntime} from "+JSON.stringify(resolve('test/fixtures/finite-budget-diagnostics.mjs'))+";export const budget=createBudgetRuntime("+JSON.stringify(runtimeOptions)+");",loader:'js',resolveDir:process.cwd()}));
    if(existing){
     existing.setup({...builder,onLoad(options,loader){
      builder.onLoad(options,async args=>{
       const result=await loader(args),path=objectPath(args.path);
@@ -651,20 +730,21 @@
     assert.deepEqual([...records.keys()].sort(),[...expected].sort(),'closed prepared role input map '+role);
     assert(!Object.keys(result.metafile?.inputs??{}).some(path=>path.endsWith('finite-budget-descriptors.json')||path.endsWith('finite-budget-world.mjs')||path.endsWith('finite-budget-evidence.mjs')),'Node-only map/compiler excluded from Worker bundle');
     const actualIds=[...records.values()].flatMap(record=>record.readerSites.map(site=>site.id)).sort((a,b)=>a-b);
     assert.deepEqual(actualIds,readerCatalog.filter(site=>site.role===role).map(site=>site.id),'complete role reader catalog before I0');
     if(process.env.AFW_BUDGET_PREFLIGHT){
      const prior=JSON.parse(await readFile(process.env.AFW_BUDGET_PREFLIGHT,'utf8'));
      assert.equal(prior.source,testRevision);assert.equal(prior.run,process.env.GITHUB_RUN_ID);assert.equal(prior.attempt,process.env.GITHUB_RUN_ATTEMPT);
      assert.equal(prior.observerChronology,'afw.finite-budget-chronology.syn.v2','same v2 preflight');
      const shape=list=>list.map(r=>({role:r.role,path:r.path,rawBytes:r.path==='<stdin>'?null:r.rawBytes,rawSha256:r.path==='<stdin>'?null:r.rawSha256,counts:r.counts,selectors:r.selectors,readerSites:r.readerSites})).sort((a,b)=>a.path.localeCompare(b.path));
      assert.deepEqual(shape([...records.values()]),shape(prior.inputs[role]),'native prepared role hooks match exact prior pure preflight before I0');
+     const extra=list=>list.filter(record=>record.additionalSYN).map(record=>({path:record.path,...record.additionalSYN})).sort((a,b)=>a.path.localeCompare(b.path));assert.deepEqual(extra([...records.values()]),extra(prior.inputs[role]),'exact fixed SYN additional-emission provenance before I0');
     }
    });
   }};
  }
  return Object.freeze({role,plugin,entry:source=>transform('<stdin>',source),records:()=>[...records.values()],prepared:()=>[...prepared]});
 }
 export function attachBudgetEpochCapture(f,{segment='producer',epochs=[],epoch=0}={}){
  assert(['producer','consumer'].includes(segment));let current=epoch;
  f.budgetEpochs=epochs;
  f.captureBudgetEpoch=async reason=>{
@@ -675,42 +755,46 @@
    assert.equal(snapshot.purpose,'afw.finite-budget-diagnostics.syn.v1');assert.equal(snapshot.workerRole,role);assert.equal(snapshot.testRevision,process.env.GITHUB_SHA);
    const value={segment,epoch:current,role,reason,capturedAt:Date.now(),snapshot},index=epochs.findIndex(v=>v.segment===segment&&v.epoch===current&&v.role===role);
    if(index<0)epochs.push(value);else epochs[index]=value;
   }
   return epochs;
  };
  f.nextBudgetEpoch=()=>{current++;};
  return f;
 }
 export async function preflightBudgetCompilation(){
- assert.equal(process.env.AFW_BUDGET_GROUP,'positive');
+ const requestedGroup=process.env.AFW_BUDGET_GROUP;assert(['positive','readonly','reduction_a'].includes(requestedGroup));
  requireOrdinaryObserver();
  const {initialEntryHarness}=await import('./finite-initial-entry-world.mjs');
- const graphs=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint:true,budgetCompileOnly:true,budgetQualification:true});
+ let graphs;fixedCompileProfileOverride=requestedGroup;process.env.AFW_BUDGET_GROUP='positive';
+ try{graphs=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint:true,budgetCompileOnly:true,budgetQualification:true});}finally{fixedCompileProfileOverride=null;process.env.AFW_BUDGET_GROUP=requestedGroup;}
  assert.equal(graphs.I0Opened,false);assert.equal(graphs.nativeExecutionProduced,false);
  assert(graphs.budget?.M?.length&&graphs.budget?.QA?.length);
  assert(graphs.compatibility.M.compatibility_flags.includes('nodejs_compat'));assert(graphs.compatibility.QA.flags.includes('nodejs_compat'));
- const result={purpose:'afw.finite-budget-preflight.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,inputs:graphs.budget,I0Opened:false,nativeExecutionProduced:false,operationalReadiness:false,completePackage:false,PCoff:false};
+ const additions=graphs.budget.QA.filter(record=>record.additionalSYN).map(record=>({path:record.path,...record.additionalSYN}));assert.equal(additions.length,requestedGroup==='positive'?0:2);
+ if(requestedGroup!=='positive'){assert.deepEqual(additions.find(r=>r.path==='lib/mcp-qa-finite-owner-cleanup.mjs').sites,[1,2]);assert.equal(additions.find(r=>r.path==='lib/mcp-qa-finite-owner-cleanup.mjs').sdkSettlementSites,1);assert.equal(additions.find(r=>r.path==='<stdin>').family,requestedGroup==='readonly'?'readonly':'reduction');}
+ const result={purpose:'afw.finite-budget-preflight.syn.v1',group:requestedGroup,additionalSYN:additions,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,inputs:graphs.budget,I0Opened:false,nativeExecutionProduced:false,operationalReadiness:false,completePackage:false,PCoff:false};
  result.observerChronology='afw.finite-budget-chronology.syn.v2';
- await mkdir('output/finite-budget/pure',{recursive:true});await writeFile('output/finite-budget/pure/preflight.json',JSON.stringify(result,null,2));
+ await mkdir('output/finite-budget/pure',{recursive:true});await writeFile('output/finite-budget/pure/preflight-'+requestedGroup+'.json',JSON.stringify(result,null,2));if(requestedGroup==='positive')await writeFile('output/finite-budget/pure/preflight.json',JSON.stringify(result,null,2));
  return result;
 }
 
 export function instrumentBudgetDiagnostics(source,{moduleRole}={}){
  assert(moduleRole&&['M','QA'].includes(moduleRole.workerRole)&&typeof moduleRole.path==='string','fixed role/path selector required');
  return transformBudgetPreparedSource(source,moduleRole.path,moduleRole.workerRole).source;
 }
 export function extendBudgetQualification(entry){
  return transformBudgetPreparedSource(entry,'<stdin>','QA').source;
 }
 function positiveKind(kind){assert.equal(kind,'positive','SYN budget kind unsupported before I0');assert.equal(process.env.AFW_BUDGET_GROUP,'positive');}
 export async function prepareBudgetProducer(kind,root){
+ if(kind==='reduction')return prepareReductionProducer(root);
  positiveKind(kind);
  const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
  return produceCheckpoint(root,{variant:'principal',budgetQualification:true});
 }
 
 async function preparePositiveProbe(root){
  positiveKind('positive');
  assert.equal(root,'output/finite-budget/producer');
  assert.equal(process.env.AFW_BUDGET_PREFLIGHT,'output/finite-budget/prior-pure/preflight.json');
  requireOrdinaryObserver();
@@ -801,20 +885,21 @@
   const sum=values=>Object.values(values).reduce((a,b)=>a+b,0);
   assert.equal(purpose,'afw.finite-budget-chronology.syn.v2');assert.equal(sum(byEvent),eventCalls);
   assert.equal(sum(invalid),snapshot.coverage.invalid);assert.equal(sum(reasons),snapshot.coverage.invalid);
   assert.equal(sum(unattributed),snapshot.coverage.unattributed);assert.equal(!!firstInvalid,snapshot.coverage.invalid>0);
   assert.equal(!snapshot.retention.traceComplete,snapshot.coverage.overflow);
  }
  for(const {epoch} of epochs){assert(identities.has('M|'+epoch));assert(identities.has('QA|'+epoch));}
 }
 
 export async function verifyBudgetCheckpoint(kind,root){
+ if(kind==='reduction')return verifyReductionCheckpoint(root);
  positiveKind(kind);
  const {verifyCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
  const value=await verifyCheckpoint(root),b=value.data.budget;
  assert.equal(b?.purpose,'afw.finite-budget-checkpoint.syn.v1');assert.equal(b.source,process.env.GITHUB_SHA);
  assert.equal(b.run,process.env.GITHUB_RUN_ID);assert.equal(b.attempt,process.env.GITHUB_RUN_ATTEMPT);
  assert.equal(value.data.variant,'principal');assert.equal(value.data.unexchanged,false);assert.equal(value.data.sdkOnlyBuild,null);
  assert(b.preparedInputs.M.length&&b.preparedInputs.QA.length);assert(b.epochs.length>=2);
  for(const e of b.epochs){assert.equal(e.segment,'producer');assert.equal(e.snapshot.testRevision,process.env.GITHUB_SHA);assert.equal(e.role,e.snapshot.workerRole);}
  return value;
 }
@@ -831,20 +916,173 @@
    plan:f.plan,recovery:f.recovery,kvSemanticProof:f.kvSemanticProof,facts,fault,native,restores:f.restores.length,pointer:f.providerRegistry.pointer,
    producer:f.checkpoint.budget.ownerReference,sdkAfterExchange:f.checkpoint.sdkAfterExchange,preparedInputs:f.checkpoint.budget.preparedInputs,
    diagnostics:{purpose:'afw.finite-budget-diagnostics.syn.v1',testRevision:process.env.GITHUB_SHA,epochs:structuredClone(f.budgetEpochs)},
    modeledProviderInput:f.checkpoint.modeledProviderInput,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
   return result;
  }finally{
   try{await f.captureBudgetEpoch('consumer-before-dispose');await mkdir('output/finite-budget/positive',{recursive:true});await writeFile('output/finite-budget/positive/epochs.json',JSON.stringify({source:process.env.GITHUB_SHA,epochs:f.budgetEpochs},null,2));}
   finally{await f.mf.dispose();}
  }
 }
+
+const budgetFixedFlags={operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+const fixedBudgetPause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
+async function fixedBudgetWait(read,predicate,deadline){
+ for(;;){const value=await read();if(predicate(value))return value;assert(Date.now()<deadline,'SYN fixed budget observation deadline');await fixedBudgetPause(20);}
+}
+function fixedBudgetEnvelope(role,kind,cases,extra={}){
+ assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(process.env.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');
+ return {purpose:'afw.fixed-budget-lineage.syn.v1',repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,role,kind,cases,...extra,...budgetFixedFlags};
+}
+async function fixedBudgetPersist(name,value){
+ const root='output/finite-budget/'+name;await mkdir(root,{recursive:true});await writeFile(join(root,'full-result.json'),JSON.stringify(value,null,2));return value;
+}
+export async function runBudgetReadonlyCase(caseName){
+ assert.equal(process.env.AFW_BUDGET_GROUP,'readonly');assert(['R1','R2','R3'].includes(caseName));
+ const {ownerReferenceFixture,prepareOwnerReference,recordOwnerReference}=await import('./finite-owner-cleanup.mjs'),{plain}=await import('./finite-first-connection-publication.mjs');
+ const cleanups=[];let f,response,rootDuring,rootAfter,rootBefore,beforeRelease,afterRelease;
+ try{
+  f=await ownerReferenceFixture({after(fn){cleanups.push(fn);}},{cleanupCheckpoint:true,budgetQualification:true});f.finiteBudgetReadonlyCase=caseName;
+  const prepared=await prepareOwnerReference(f);rootBefore=await plain(f.stub.firstConnectionAvailability());assert.equal(rootBefore.available,true);
+  const issue=prepared.issue();
+  if(caseName==='R3'){const held=await fixedBudgetWait(()=>plain(f.stub.finiteBudgetSignals()),s=>s.heldNativeSettled===2,Date.now()+30000);assert.equal(held.queueObserverInvalid,false);assert(held.queuedAtHold>0,'actual populated readonly queue');}
+  response=await issue;await response.body?.cancel();
+  const observed=await plain(f.stub.ownerReferenceObserve());
+  if(caseName==='R3'){
+   rootDuring=await plain(f.stub.firstConnectionAvailability());assert.equal(rootDuring.available,false);assert.equal(rootDuring.live,true);
+   beforeRelease=await plain(f.stub.finiteBudgetSignals());assert.equal(beforeRelease.nativeUnsettled,0);assert.equal(beforeRelease.outwardPending,2);
+   await f.stub.finiteBudgetRelease();await fixedBudgetPause(100);afterRelease=await plain(f.stub.finiteBudgetSignals());rootAfter=await plain(f.stub.firstConnectionAvailability());
+  }else{await f.stub.finiteBudgetRelease();afterRelease=await plain(f.stub.finiteBudgetSignals());}
+  const native=afterRelease,reference=await plain(f.stub.ownerReferenceObserve()),record=await recordOwnerReference(f,'budget-'+caseName,{responseStatus:response.status});
+  const referenceIndex=observed.trace.indexOf('reference-readback-native-settled'),responseIndex=observed.trace.indexOf('native-authorize-response:302');
+  const cleanupFacts=await plain(f.stub.ownerCleanupFacts()),plan=JSON.parse(cleanupFacts.rows.find(([key])=>key==='afw.finite-initial-cleanup.v1:plan')[1]);
+  const sdkRoot=JSON.parse(reference.rows.find(([key])=>key.endsWith(':root'))[1]),referenceRow=reference.rows.find(([key])=>key.endsWith(':reference')),sdkReference=referenceRow?JSON.parse(referenceRow[1]):null;
+  assert.equal(sdkRoot.I0,plan.I0);assert.equal(sdkRoot.C0,plan.C0);assert.equal(sdkRoot.C1,plan.C1);assert.equal(sdkReference!==null,caseName==='R1');
+  const mounted=f.cleanupCheckpointInputs().currentMountedOptions,graphs=[['M','canary-first-connection'],['QA','qa-first-connection']].map(([role,worker])=>{
+   const actual=mounted.workers.find(value=>value.name===worker);assert(actual);assert.equal(hash(actual.script),f.firstConnectionBuild[role].sha256);
+   return {role,worker,sha256:f.firstConnectionBuild[role].sha256,bytes:f.firstConnectionBuild[role].bytes,mounted:true};
+  });
+  const lineage={I0:plan.I0,C0:plan.C0,C1:plan.C1,sdkRootHash:sdkRoot.recordHash,sdkReferenceHash:sdkReference?.recordHash??null,graphs};
+
+  const facts={...native,completeWrites:observed.completeWrites,completeNormal:observed.completeNormal,responseStatus:response.status,referenceRows:reference.rows.filter(([key])=>key.endsWith(':reference')).length,
+   referenceBefore302:referenceIndex>=0&&responseIndex>referenceIndex,sdkReplay:Math.max(0,observed.completeWrites-1),rootBefore,rootDuring,rootAfter,
+   originalChildElapsedMs:observed.lookupChild?.actualElapsedMs??null,callsAfterRelease:beforeRelease?native.nativeInvoked-beforeRelease.nativeInvoked:0,lateReference:caseName==='R3'&&reference.rows.some(([key])=>key.endsWith(':reference'))};
+  return await fixedBudgetPersist('readonly/'+caseName,{...fixedBudgetEnvelope('consumer','readonly',[caseName],{consumerGroup:'readonly'}),caseName,facts,record,lineage,privateLineage:{sdkRoot,sdkReference,originalCleanupPlan:plan,actualBuildPair:f.firstConnectionBuild},diagnostics:{epochs:structuredClone(f.budgetEpochs)},preparedInputs:f.firstConnectionBuild.budget});
+ }finally{
+  if(f){try{await f.stub.finiteBudgetRelease();await f.stub.finiteBudgetRestore();}finally{for(const cleanup of cleanups.reverse())await cleanup();}}
+ }
+}
+async function prepareReductionProducer(root){
+ assert.equal(process.env.AFW_BUDGET_GROUP,'reduction_a');
+ const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
+ const manifest=await produceCheckpoint(join(root,'native'),{variant:'principal',unexchanged:true,budgetQualification:true,sdkOnly:false});
+ const lineage=fixedBudgetEnvelope('producer','reduction',['D1','D2','D3','D4'],{producerGroup:'reduction_a',nativeManifestSha256:hash(await readFile(join(root,'native','manifest.json'))),I0:manifest.I0,C0:manifest.C0,C1:manifest.C1});
+ await writeFile(join(root,'lineage.json'),JSON.stringify(lineage,null,2));return lineage;
+}
+async function verifyReductionCheckpoint(root,{consumer=false}={}){
+ const {verifyCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
+ const lineage=JSON.parse(await readFile(join(root,'lineage.json'),'utf8')),expected=fixedBudgetEnvelope('producer','reduction',['D1','D2','D3','D4'],{producerGroup:'reduction_a',nativeManifestSha256:lineage.nativeManifestSha256,I0:lineage.I0,C0:lineage.C0,C1:lineage.C1});
+ assert.deepEqual(lineage,expected,'fixed producer bindings separate from consumer group');
+ assert.equal(hash(await readFile(join(root,'native','manifest.json'))),lineage.nativeManifestSha256);
+ const value=await verifyCheckpoint(join(root,'native')),b=value.data.budget;
+ assert.equal(value.data.unexchanged,true);assert.equal(value.data.sdkOnlyBuild,null);assert.equal(value.data.sdkAfterExchange,null);assert.equal(value.data.lateToken,null);assert.equal(value.data.sdkUnexchanged.codeExchanged,false);
+ assert.equal(b.source,process.env.GITHUB_SHA);assert.equal(b.run,process.env.GITHUB_RUN_ID);assert.equal(b.attempt,process.env.GITHUB_RUN_ATTEMPT);assert.equal(b.ownerReference.completeNormal,1);assert.equal(b.ownerReference.referenceRows,1);
+ assert.deepEqual([value.manifest.I0,value.manifest.C0,value.manifest.C1],[lineage.I0,lineage.C0,lineage.C1]);
+ if(consumer){
+  assert.match(process.env.AFW_BUDGET_PRODUCER_ARTIFACT_ID??'',/^[1-9][0-9]*$/);assert.match(process.env.AFW_BUDGET_PRODUCER_DIGEST??'',/^[a-f0-9]{64}$/);
+  assert.equal(process.env.AFW_BUDGET_PRODUCER_KIND,'reduction-checkpoint');assert.equal(process.env.AFW_BUDGET_PRODUCER_GROUP,'reduction_a');assert.equal(process.env.AFW_BUDGET_PRODUCER_READBACK,'verified');
+ }
+ return {...value,lineage};
+}
+async function observeFixedReduction(f,caseName,shared){
+ const {plain}=await import('./finite-first-connection-publication.mjs'),{observeOriginalAlarm}=await import('./finite-owner-cleanup-persistence.mjs');
+ let rootDuring,rootAfter,beforeRelease,afterRelease;
+ try{
+  if(caseName==='D4'){
+   const held=await fixedBudgetWait(()=>plain(f.stub.finiteBudgetSignals()),s=>s.heldNativeSettled===2,f.plan.C0+15000);
+   assert.equal(held.queueObserverInvalid,false);assert(held.queuedAtHold>0,'actual populated reduction queue');
+  }
+  const original=await observeOriginalAlarm(f);
+  if(caseName==='D4'){
+   rootDuring=await plain(f.stub.firstConnectionAvailability());assert.equal(rootDuring.available,false);assert.equal(rootDuring.live,true);
+   beforeRelease=await plain(f.stub.finiteBudgetSignals());assert.equal(beforeRelease.nativeUnsettled,0);assert.equal(beforeRelease.outwardPending,2);
+  }
+  await f.stub.finiteBudgetRelease();await fixedBudgetPause(100);afterRelease=await plain(f.stub.finiteBudgetSignals());
+  if(caseName==='D4')rootAfter=await plain(f.stub.firstConnectionAvailability());
+  const final=await plain(f.stub.ownerCleanupFacts()),rows=final.rows,state=JSON.parse(rows.find(([key])=>key==='afw.finite-initial-cleanup.v1:state')[1]),ownerRows=rows.filter(([key])=>key.startsWith('afw.finite-owner-cleanup.v1:'));
+  assert.equal(afterRelease.sdkObserverInvalid,false);assert.equal(afterRelease.sdkFulfilled+afterRelease.sdkRejected,1,'actual SDK promise outcome observed exactly once');
+  const sdkObserved=ownerRows.some(([key])=>key.endsWith(':sdk_revoke:observed')),ownerReceipt=ownerRows.some(([key])=>key.endsWith(':receipt'));
+  await f.captureBudgetEpoch('fixed-'+caseName+'-after-original-alarm');
+  const facts={...afterRelease,sdkReplay:Math.max(0,afterRelease.sdkFulfilled+afterRelease.sdkRejected-1),sdkReturned:afterRelease.sdkFulfilled===1,sdkObserved,ownerReceipt,completed:state.status==='complete',pendingPreserved:state.status!=='complete',
+   uncertainSendRetried:original.signal.entered!==1,rootBefore:f.budgetRootBefore,rootDuring,rootAfter,
+   originalChildElapsedMs:caseName==='D4'?Math.max(0,...final.children.filter(child=>child.startedAt>=f.plan.C0).map(child=>child.elapsedMs)):null,
+   callsAfterRelease:beforeRelease?afterRelease.nativeInvoked-beforeRelease.nativeInvoked:0,falseSdkReturn:caseName==='D4'&&afterRelease.sdkFulfilled>0};
+  return await fixedBudgetPersist('reduction/'+caseName,{...fixedBudgetEnvelope('consumer','reduction',[caseName],{consumerGroup:shared.group}),caseName,plan:f.plan,facts,alarm:original,final,
+   producer:{unexchanged:true,codeExchanged:false,normalComplete:f.checkpoint.budget.ownerReference.completeNormal,sameCheckpoint:true,consumerGroup:shared.group,manifestSha256:f.recovery.manifestSha256,artifactId:shared.producerArtifactId,digest:shared.producerDigest},
+   recovery:{...f.recovery,pairSize:2,pairReady:shared.pairReady,restart:false,coldInventoryVerified:true,bothAliases:f.kvSemanticProof.bothAliases,pairEntered:shared.entered,consumerFinished:Date.now()},
+   diagnostics:{epochs:structuredClone(f.budgetEpochs)},preparedInputs:f.checkpoint.budget.preparedInputs});
+ }finally{await f.stub.finiteBudgetRelease();}
+}
+
+async function disposeFixedBudgetPair(fixtures){
+ assert(Array.isArray(fixtures)&&fixtures.length<=2,'fixed owned pair only');
+ const settled=await Promise.allSettled(fixtures.map(async fixture=>{
+  const failures=[];
+  for(const phase of ['release','restore','dispose']){
+   try{if(phase==='release')await fixture.stub.finiteBudgetRelease();else if(phase==='restore')await fixture.stub.finiteBudgetRestore();else await fixture.mf.dispose();}
+   catch(error){failures.push(error);}
+  }
+  if(failures.length)throw failures[0];
+ }));
+ const failure=settled.find(result=>result.status==='rejected');if(failure)throw failure.reason;
+}
+async function verifyFixedPairDisposer(){
+ const scenarios=[];let failed=false;
+ for(const phase of ['release','restore','dispose']){
+  const expected=Error('SYN inert '+phase),calls=[[],[]];
+  const fixtures=[0,1].map(index=>({stub:{
+   async finiteBudgetRelease(){calls[index].push('release');if(index===0&&phase==='release')throw expected;},
+   async finiteBudgetRestore(){calls[index].push('restore');if(index===0&&phase==='restore')throw expected;}
+  },mf:{async dispose(){calls[index].push('dispose');if(index===0&&phase==='dispose')throw expected;}}}));
+  let actual;try{await disposeFixedBudgetPair(fixtures);}catch(error){actual=error;}
+  const sameError=actual===expected,allPhases=calls.every(value=>JSON.stringify(value)===JSON.stringify(['release','restore','dispose']));
+  scenarios.push({faultPhase:phase,sameError,allPhases,fixtureCount:2,attempts:calls.map(value=>value.length)});failed||=!sameError||!allPhases;
+ }
+ const result={purpose:'afw.fixed-budget-pair-disposer-control.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,tests:1,scenarios,passed:!failed,I0Opened:false,nativeExecutionProduced:false,businessCases:0,...budgetFixedFlags};
+ await mkdir('output/finite-budget/disposer-control',{recursive:true});await writeFile('output/finite-budget/disposer-control/result.json',JSON.stringify(result,null,2));
+ assert.equal(failed,false,'actual fixed pair disposer covers every sibling phase and error identity');return result;
+}
+
+export async function prepareBudgetReductionPair(group,root){
+ assert(['reduction_a','reduction_b'].includes(group));assert.equal(process.env.AFW_BUDGET_GROUP,group);
+ const verified=await verifyReductionCheckpoint(root,{consumer:true});
+ const {recoverCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs'),{plain}=await import('./finite-first-connection-publication.mjs');
+ const cases=group==='reduction_a'?['D1','D2']:['D3','D4'],fixtures=[],results=new Map(),shared={group,entered:Date.now(),pairReady:null,producerArtifactId:process.env.AFW_BUDGET_PRODUCER_ARTIFACT_ID,producerDigest:process.env.AFW_BUDGET_PRODUCER_DIGEST};
+ let closing;
+ const dispose=()=>closing??=disposeFixedBudgetPair(fixtures);
+ try{
+  // Register each fulfilled mount immediately, including a late sibling after a
+  // partial rejection. No replica starts after its sibling passes C0.
+  const mounts=await Promise.allSettled(cases.map(async caseName=>{
+   const f=await recoverCheckpoint(join(root,'native'),{label:'budget-'+caseName,restart:false,budgetQualification:true});fixtures.push(f);f.budgetCase=caseName;
+   f.budgetRootBefore=await plain(f.stub.firstConnectionAvailability());assert.equal(f.budgetRootBefore.available,true);
+   const input=await plain(f.stub.finiteBudgetReduction(caseName));assert.equal(input.sameKvBinding,true);
+   f.budgetInputReady=Date.now();assert(f.budgetInputReady<=f.plan.C0-30000);return f;
+  }));
+  const rejected=mounts.find(result=>result.status==='rejected');if(rejected)throw rejected.reason;
+  shared.pairReady=Math.max(...fixtures.map(f=>f.budgetInputReady));assert(shared.pairReady<=verified.lineage.C0-30000,'both original cold replicas and input readbacks ready');
+  assert.equal(fixtures.length,2);assert(fixtures.every(f=>f.recovery.manifestSha256===verified.lineage.nativeManifestSha256));
+  for(const f of fixtures){const result=observeFixedReduction(f,f.budgetCase,shared);result.catch(()=>{});results.set(f.budgetCase,result);}
+  return {result(name){assert(cases.includes(name));return results.get(name);},dispose};
+ }catch(error){await dispose();throw error;}
+}
+
 export async function sealBudgetArtifact(root,kind){
  assert(['pure','checkpoint','positive'].includes(kind));
  await mkdir(root,{recursive:true});
  const files=(await inventoryFiles(root)).filter(f=>f.path!=='budget-artifact.json');
  const manifest={purpose:'afw.finite-budget-artifact.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,kind,files,operationalReadiness:false,completePackage:false,PCoff:false};
  await writeFile(join(root,'budget-artifact.json'),JSON.stringify(manifest,null,2));return manifest;
 }
 export async function verifyBudgetArtifact(root,kind,artifactId){
  assert.match(artifactId??'',/^[1-9][0-9]*$/);
  const bytes=await readFile(join(root,'budget-artifact.json')),m=JSON.parse(bytes);
@@ -854,17 +1092,20 @@
  console.info('BUDGET SAME ID READBACK VERIFIED',JSON.stringify({source:m.source,run:m.run,attempt:m.attempt,kind,artifactId,files:files.length,manifestBytes:bytes.length,manifestSha256:hash(bytes),operationalReadiness:false,completePackage:false,PCoff:false}));
  return m;
 }
 
 if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const main=async()=>{
   const [command,root]=process.argv.slice(2);
   if(command==='preflight-budget')await preflightBudgetCompilation();
   else if(command==='prepare-positive-probe')await preparePositiveProbe(root);
   else if(command==='prepare-positive')await prepareBudgetProducer('positive',root);
+  else if(command==='prepare-reduction')await prepareBudgetProducer('reduction',root);
+  else if(command==='verify-reduction')await verifyBudgetCheckpoint('reduction',root);
+  else if(command==='verify-pair-disposer')await verifyFixedPairDisposer();
   else if(command==='verify-positive')await verifyBudgetCheckpoint('positive',root);
   else if(command==='inspect-budget-graphs')await inspectBudgetCompilation(root);
   else throw Error('SYN budget command unsupported before I0');
  };
  // Finish this module before command work imports fixtures that import it.
- setImmediate(()=>{main().catch(error=>{console.error(error);process.exitCode=1;});});
+ setImmediate(()=>{main().catch(()=>{console.error('SYN fixed budget command failed');process.exitCode=1;});});
 }
diff --git a/test/fixtures/finite-checkpoint-custody.mjs b/test/fixtures/finite-checkpoint-custody.mjs
# before_blob=9a486b839874ed8e9a950f6a823b18e7585de52e after_blob=4d05b5ec0f7b074be88ef9733a47c984b0212351
--- a/test/fixtures/finite-checkpoint-custody.mjs
+++ b/test/fixtures/finite-checkpoint-custody.mjs
@@ -30,21 +30,21 @@
 function parse(bytes){
  const string=bytes.toString('utf8');requireValue(Buffer.from(string).equals(bytes));
  let value;try{value=JSON.parse(string);}catch{fail('format');}
  // Canonical records prevent duplicate keys and ambiguous string representations.
  requireValue(utf8(value).equals(bytes));return value;
 }
 function expectedContext(c){
  fields(c,['purpose','repository','ref','sourceSha','runId','runAttempt','kind']);
  requireValue(c.purpose===PURPOSE&&c.repository===REPOSITORY&&c.ref===REF,'context');
  requireValue(typeof c.sourceSha==='string'&&c.sourceSha.length===40&&/^[0-9a-f]{40}$/.test(c.sourceSha)&&typeof c.runId==='string'&&c.runId.trim()===c.runId&&/^[1-9][0-9]*$/.test(c.runId)&&c.runAttempt===1,'context');
- requireValue(['checkpoint','positive-result','producer-failure','consumer-failure'].includes(c.kind),'context');
+ requireValue(['checkpoint','positive-result','producer-failure','consumer-failure','readonly-result','reduction-checkpoint','reduction-result-a','reduction-result-b'].includes(c.kind),'context');
  return {purpose:PURPOSE,repository:REPOSITORY,ref:REF,sourceSha:c.sourceSha,runId:c.runId,runAttempt:1,kind:c.kind};
 }
 function keyFromEnvironment(){
  const hex=process.env.AFW_SYN_CHECKPOINT_KEY;
  requireValue(typeof hex==='string'&&hex.length===64&&/^[0-9a-fA-F]{64}$/.test(hex),'key');
  return Buffer.from(hex,'hex');
 }
 async function guarded(fn){
  let key;
  try{key=keyFromEnvironment();return await fn(key);}
diff --git a/test/fixtures/finite-owner-cleanup.mjs b/test/fixtures/finite-owner-cleanup.mjs
# before_blob=a8a2df05822a8b6daee9067a3e02bb7a4912eb7d after_blob=3448f503dcad52d4efa08725e3146d7058ca7451
--- a/test/fixtures/finite-owner-cleanup.mjs
+++ b/test/fixtures/finite-owner-cleanup.mjs
@@ -115,21 +115,21 @@
  const f=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint,budgetQualification});f.cleanupQualification=cleanupCheckpoint;
  t.after(async()=>{try{await f.stub.ownerReferenceControl('released').catch(()=>{});await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}finally{try{if(f.captureBudgetEpoch)await f.captureBudgetEpoch('before-fixture-dispose');}finally{try{await f.mf.dispose();}finally{await f.cleanup();}}}});
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await f.mountFirstConnection();await f.stub.firstConnectionConfigure('normal');
  const initial=f.firstConnectionBuild.M;assert.equal(initial.sha256,f.resident.module.sha256);assert(initial.inputs.includes('worker/mcp-own/finite.mjs'));
  const connected=await approveFirstConnection(f);assert.equal(connected.status,200);await connected.body?.cancel();const probe=await readFirstConnectionProbe(f),receipt=JSON.parse(probe.rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt'))[1]);assert.equal(receipt.moduleHash,initial.sha256);
  const closed=f.providerRegistry.versions[receipt.baselineVersionId],installed=f.providerRegistry.versions[receipt.versionId];assert.equal(installed.modules[0].content_base64,closed.modules[0].content_base64,'initial and connection share actual current bytes');
  await f.adoptConnectionConfiguration({upstream:true});const context=await plain(f.stub.firstConnectionContext());assert.equal(context.source?.phase,'read_consent');f.source=context.source;
  f.kv=await f.mf.getKVNamespace('OAUTH_KV','canary-first-connection');await f.kv.put('client:'+f.source.clientId,JSON.stringify({clientId:f.source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN reference client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));return f;
 }
 export async function prepareOwnerReference(f,fault='normal'){
- await f.stub.ownerReferenceConfigure(fault);const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':f.cleanupOriginalIdentityToken??await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
+ if(f.finiteBudgetReadonlyCase){assert.equal(fault,'normal');await f.stub.finiteBudgetReadonly(f.finiteBudgetReadonlyCase);}else await f.stub.ownerReferenceConfigure(fault);const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':f.cleanupOriginalIdentityToken??await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
  const screen=await f.call('/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-reference-state',code_challenge:challenge,code_challenge_method:'S256'}),{redirect:'manual',headers});
  assert.equal(screen.status,200);const text=await screen.text(),handle=/name="handle" value="([^"]+)"/.exec(text)?.[1],cookie=screen.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
  const issue=()=>f.call('/authorize',{method:'POST',redirect:'manual',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});return {issue,headers,verifier};
 }
 export async function assertActualComplete(f,{reference=false}={}){
  const observed=await plain(f.stub.ownerReferenceObserve()),rows=observed.rows;
  assert.equal(observed.completeWrites,1,'one actual SDK grant effect');assert.equal(observed.completeNormal,1,'actual SDK complete fulfilled normally');assert(rows.some(([k])=>k.endsWith(':sdk_complete:observed')),'actual complete observation durable');
  const ref=rows.find(([k])=>k.endsWith(':reference'));if(reference)assert(ref,'R1 missing durable SDK Reference AFTER actual completeAuthorization');return {observed,reference:ref?JSON.parse(ref[1]):null};
 }
 export async function recordOwnerReference(f,label,extra={}){
@@ -289,10 +289,13 @@
    try{responses.push(await cleanupResponseFact(response,{request,startedAt,projectId,token}));}catch(error){responses.push({...request,startedAt,finishedAt:Date.now(),status:response.status,readFailed:true,errorType:error.name});throw error;}
    return response;
   }}));
   observation.toolCallAttempted=true;
   observation.toolResult=cleanupSafeToolResult(await client.callTool({name:'read_project_summary',arguments:{}}));
  }catch(error){observation.error={type:error.name,messageHash:cleanupHash(String(error.message))};}
  finally{try{await client.close();}catch(error){observation.closeError={type:error.name,messageHash:cleanupHash(String(error.message))};}
   try{worker.assertProfileCurrent();observation.profileCurrent=true;}catch{observation.profileCurrent=false;}}
  observation.classification=classifyCleanupMDenial(observation);return observation;
 }
+
+/** Node-only fixed test emission; never imported by production. */
+export const finiteBudgetSynAdapterSource="\n/* Fixed owned SYN adapter. Additional setup and ACK observations are separate\n * from the pinned baseline instrumentation. No production provider is reachable. */\nconst __afwFiniteBudgetThen=Promise.prototype.then;\nconst __afwFiniteBudgetStates=new WeakMap();\nconst __afwFiniteBudgetQueues=new WeakMap();\nObject.defineProperty(globalThis,'__afwFixedSynBudgetQueueObserve',{value:function(alias,family,queued,active,at){\n const state=__afwFiniteBudgetQueues.get(alias);if(!state)return;\n try{\n  if(![1,2].includes(family)||![queued,active,at].every(Number.isSafeInteger)||queued<0||active<0||active>2||state.queueEvents.length>=512){state.queueObserverInvalid=true;return;}\n  state.queueDepth=queued;state.queueEvents.push({family,queued,active,at});\n  if(state.heldNativeSettled===2)state.queuedAtHold=Math.max(state.queuedAtHold,queued);\n }catch{state.queueObserverInvalid=true;}\n}});\nObject.defineProperty(globalThis,'__afwFixedSynBudgetSdkObserve',{value:function(alias,status,at){\n const state=__afwFiniteBudgetQueues.get(alias);if(!state)return;\n try{if(![1,2].includes(status)||!Number.isSafeInteger(at)){state.sdkObserverInvalid=true;return;}state[status===1?'sdkFulfilled':'sdkRejected']++;state.sdkOutcomeAt=at;}catch{state.sdkObserverInvalid=true;}\n}});\nconst __afwFiniteBudgetCaseNames=Object.freeze(['R1','R2','R3','D1','D2','D3','D4']);\nconst __afwFiniteBudgetHash=async value=>Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))).toString('hex');\nconst __afwFiniteBudgetRequire=(value)=>{if(!value)throw Error('SYN fixed budget fixture premise');};\nfunction __afwFiniteBudgetState(owner,name){\n __afwFiniteBudgetRequire(__afwFiniteBudgetCaseNames.includes(name)&&!__afwFiniteBudgetStates.has(owner));\n const kv=owner.env.AFW_FINITE_OWNER_OAUTH_KV;\n __afwFiniteBudgetRequire(kv&&owner.ctx&&owner.ctx.storage);\n const native=Object.fromEntries(['get','list','put','delete'].map(method=>[method,kv[method]]));\n __afwFiniteBudgetRequire(Object.values(native).every(method=>typeof method==='function'));\n const state={caseName:name,kv,native,input:null,lists:0,gets:0,deletes:0,invoked:0,nativeSettled:0,nativeRejected:0,nativeUnsettled:0,outwardPending:0,outwardPeak:0,heldNativeSettled:0,held:false,released:false,releaseAt:null,grantDeleteEntered:false,thirdListEntered:false,queueDepth:0,queuedAtHold:0,queueEvents:[],events:[],sdkFulfilled:0,sdkRejected:0,sdkOutcomeAt:null,sdkObserverInvalid:false,queueObserverInvalid:false,outward:new Set(),release:[],holdLabel:'holdpostnativeACK',restored:false,sentinelKey:'SYN:finite-budget:foreign',sentinelRaw:'SYN fixed foreign sentinel',grantKey:null};\n __afwFiniteBudgetStates.set(owner,state);__afwFiniteBudgetQueues.set(kv,state);return state;\n}\nfunction __afwFiniteBudgetInvoke(state,method,args){\n state[method==='get'?'gets':method==='list'?'lists':'deletes']++;\n if(method==='list'&&state.lists>2)state.thirdListEntered=true;\n if(method==='delete'&&args[0]===state.grantKey)state.grantDeleteEntered=true;\n state.invoked++;state.nativeUnsettled++;state.outwardPending++;state.outwardPeak=Math.max(state.outwardPeak,state.outwardPending);\n const entered=Date.now(),ordinal=state.invoked;\n state.events.push({kind:'native-invoke',method,ordinal,at:entered});\n let actual;\n try{actual=Reflect.apply(state.native[method],state.kv,args);}catch(error){state.nativeUnsettled--;state.outwardPending--;state.nativeRejected++;throw error;}\n __afwFiniteBudgetRequire(actual instanceof Promise);\n const hold=(state.caseName==='R3'&&method==='get'||state.caseName==='D4'&&method==='delete')&&state.heldNativeSettled<2;\n const settled=(status)=>{state.nativeUnsettled--;state[status===1?'nativeSettled':'nativeRejected']++;state.events.push({kind:status===1?'native-settle':'native-reject',method,ordinal,at:Date.now()});};\n let outward=actual;\n if(hold)outward=Reflect.apply(__afwFiniteBudgetThen,actual,[value=>{\n  settled(1);state.heldNativeSettled++;state.held=true;state.queuedAtHold=Math.max(state.queuedAtHold,state.queueDepth);\n  return new Promise(resolve=>{state.release.push(()=>resolve(value));if(state.released)state.release.at(-1)();});\n },error=>{settled(2);throw error;}]);\n else{const observation=Reflect.apply(__afwFiniteBudgetThen,actual,[()=>settled(1),()=>settled(2)]);Reflect.apply(__afwFiniteBudgetThen,observation,[()=>undefined,()=>undefined]);}\n state.outward.add(outward);\n const done=()=>{state.outwardPending--;state.outward.delete(outward);state.events.push({kind:'outward-settle',method,ordinal,at:Date.now()});};\n const observation=Reflect.apply(__afwFiniteBudgetThen,outward,[done,done]);Reflect.apply(__afwFiniteBudgetThen,observation,[()=>undefined,()=>undefined]);return outward;\n}\nasync function __afwFiniteBudgetForeign(state){\n await Reflect.apply(state.native.put,state.kv,[state.sentinelKey,state.sentinelRaw]);\n __afwFiniteBudgetRequire(await Reflect.apply(state.native.get,state.kv,[state.sentinelKey])===state.sentinelRaw);\n}\nasync function __afwFiniteBudgetSeedReadonly(state,key,raw){\n __afwFiniteBudgetRequire(state.input===null&&key.startsWith('grant:'));\n const original=JSON.parse(raw),prefix=key.slice(0,key.lastIndexOf(':')+1);\n state.grantKey=key;\n const first=await Reflect.apply(state.native.list,state.kv,[{prefix:key,limit:100}]);\n const originalKey=first.keys.find(item=>item.name===key);\n __afwFiniteBudgetRequire(Number.isSafeInteger(originalKey?.expiration));\n const expiration=originalKey.expiration,extra=state.caseName==='R2'?200:199;\n await __afwFiniteBudgetForeign(state);\n for(let n=0;n<extra;n++){\n  const id='SYN'+String(n).padStart(13,'0'),value={};\n  for(const field of ['userId','clientId','resource','resources','scope','scopes','createdAt','expiresAt','redirectUri'])if(Object.hasOwn(original,field))value[field]=original[field];\n  value.id=id;value.metadata={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:'f'.repeat(64)}};\n  __afwFiniteBudgetRequire(prefix+id!==key);\n  await Reflect.apply(state.native.put,state.kv,[prefix+id,JSON.stringify(value),{expiration}]);\n }\n const pages=[];let cursor;\n do{const page=await Reflect.apply(state.native.list,state.kv,[{prefix,limit:100,...cursor?{cursor}:{}}]);pages.push(page);cursor=page.list_complete?undefined:page.cursor;__afwFiniteBudgetRequire(pages.length<=3);}while(cursor);\n const entries=pages.flatMap(page=>page.keys);\n __afwFiniteBudgetRequire(entries.length===extra+1&&entries.every(item=>item.expiration===expiration));\n state.input={entries:entries.length,correlations:1,expirationPreserved:true,absoluteExpiration:expiration,setupLists:pages.length+1,setupWrites:extra+1};\n}\nfunction __afwFiniteBudgetInstall(owner,state){\n const kv=state.kv;\n for(const method of ['get','list','delete'])kv[method]=function(...args){\n  const key=method==='list'?args[0]?.prefix:args[0],target=state.caseName.startsWith('R')?String(key).startsWith('grant:'):key===state.grantKey||String(key).startsWith(state.tokenPrefix);\n  return target?__afwFiniteBudgetInvoke(state,method,args):Reflect.apply(state.native[method],kv,args);\n };\n const put=state.native.put;\n kv.put=function(...args){\n  const actual=Reflect.apply(put,kv,args);\n  if(!state.caseName.startsWith('R')||!String(args[0]).startsWith('grant:'))return actual;\n  __afwFiniteBudgetRequire(actual instanceof Promise);\n  return Reflect.apply(__afwFiniteBudgetThen,actual,[async value=>{await __afwFiniteBudgetSeedReadonly(state,args[0],args[1]);return value;}]);\n };\n}\nObject.defineProperties(Initial.prototype,{\n finiteBudgetReadonly:{value:async function(caseName){\n  __afwFiniteBudgetRequire(__afwFiniteBudgetFamily==='readonly'&&['R1','R2','R3'].includes(caseName));\n  this.ownerReferenceRestore?.();\n  const state=__afwFiniteBudgetState(this,caseName);\n  __afwFiniteBudgetInstall(this,state);await this.ownerReferenceConfigure('normal');\n  return {caseName,installed:true,sameKvBinding:true};\n }},\n finiteBudgetReduction:{value:async function(caseName){\n  __afwFiniteBudgetRequire(__afwFiniteBudgetFamily==='reduction'&&['D1','D2','D3','D4'].includes(caseName));\n  this.ownerCleanupFaultRestore?.();\n  const state=__afwFiniteBudgetState(this,caseName),rows=[...await this.ctx.storage.list()],plan=JSON.parse(rows.find(([key])=>key==='afw.finite-initial-cleanup.v1:plan')[1]);\n  __afwFiniteBudgetRequire(Date.now()<plan.C0-30000&&(await this.ownerCleanupSignal()).entered===0);\n  const reference=JSON.parse(rows.find(([key])=>key.startsWith('afw.finite-owner-issuer-provenance.v1:')&&key.endsWith(':reference'))[1]),nativeRows=await this.ownerCleanupNativeRows();\n  const subject=nativeRows.grant.user_id,key='grant:'+subject+':'+reference.sdkGrantId,prefix='token:'+subject+':'+reference.sdkGrantId+':';\n  state.grantKey=key;state.tokenPrefix=prefix;\n  const raw=await Reflect.apply(state.native.get,state.kv,[key]);\n  __afwFiniteBudgetRequire(typeof raw==='string'&&JSON.parse(raw).id===reference.sdkGrantId);\n  const originalList=await Reflect.apply(state.native.list,state.kv,[{prefix:key,limit:100}]),originalKey=originalList.keys.find(item=>item.name===key);\n  __afwFiniteBudgetRequire(Number.isSafeInteger(originalKey?.expiration)&&originalKey.expiration*1000>plan.C0+120000);\n  const expiration=originalKey.expiration,count=caseName==='D2'?200:caseName==='D3'?201:199;\n  await __afwFiniteBudgetForeign(state);\n  for(let n=0;n<count;n++)await Reflect.apply(state.native.put,state.kv,[prefix+'SYN-inert-'+String(n).padStart(4,'0'),JSON.stringify({purpose:'SYN inert non-credential token row',ordinal:n,expiresAt:expiration}),{expiration}]);\n  const pages=[];let cursor;\n  do{const page=await Reflect.apply(state.native.list,state.kv,[{prefix,limit:100,...cursor?{cursor}:{}}]);pages.push(page);cursor=page.list_complete?undefined:page.cursor;__afwFiniteBudgetRequire(pages.length<=3);}while(cursor);\n  const entries=pages.flatMap(page=>page.keys);\n  __afwFiniteBudgetRequire(entries.length===count&&entries.every(item=>item.expiration===expiration)&&await Reflect.apply(state.native.get,state.kv,[key])===raw);\n  state.input={ownTokens:count,expirationPreserved:true,absoluteExpiration:expiration,setupLists:pages.length+1,setupWrites:count+1,grantHash:await __afwFiniteBudgetHash(raw)};\n  __afwFiniteBudgetInstall(this,state);await this.ownerCleanupFault('normal');\n  return {caseName,installed:true,sameKvBinding:true,input:state.input,ready:Date.now()};\n }},\n finiteBudgetSignals:{value:async function(){\n  const state=__afwFiniteBudgetStates.get(this);__afwFiniteBudgetRequire(state);\n  const foreign=await Reflect.apply(state.native.get,state.kv,[state.sentinelKey]);\n  return {caseName:state.caseName,input:state.input,lists:state.lists,gets:state.gets,deletes:state.deletes,scopePeak:state.outwardPeak,nativeInvoked:state.invoked,nativeSettled:state.nativeSettled,nativeUnsettled:state.nativeUnsettled,nativeRejected:state.nativeRejected,outwardPending:state.outwardPending,held:state.held,heldNativeSettled:state.heldNativeSettled,released:state.released,releaseAt:state.releaseAt,holdLabel:state.holdLabel,queuedAtHold:state.queuedAtHold,queueDepth:state.queueDepth,queueObserverInvalid:state.queueObserverInvalid,sdkFulfilled:state.sdkFulfilled,sdkRejected:state.sdkRejected,sdkOutcomeAt:state.sdkOutcomeAt,sdkObserverInvalid:state.sdkObserverInvalid,queueEvents:state.queueEvents,events:state.events,grantDeleteEntered:state.grantDeleteEntered,thirdListEntered:state.thirdListEntered,foreignUnchanged:foreign===state.sentinelRaw,grantRemaining:state.grantKey?await Reflect.apply(state.native.get,state.kv,[state.grantKey])!==null:null};\n }},\n finiteBudgetRelease:{value:async function(){\n  const state=__afwFiniteBudgetStates.get(this);if(!state)return {released:false};\n  state.released=true;state.releaseAt??=Date.now();for(const release of state.release.splice(0))release();\n  await Promise.allSettled([...state.outward]);return {released:true,nativeUnsettled:state.nativeUnsettled,outwardPending:state.outwardPending};\n }},\n finiteBudgetRestore:{value:async function(){\n  const state=__afwFiniteBudgetStates.get(this);if(!state)return {restored:false};\n  __afwFiniteBudgetRequire(state.released&&state.outwardPending===0&&state.nativeUnsettled===0);\n  this.ownerReferenceRestore?.();this.ownerCleanupFaultRestore?.();\n  for(const method of ['get','list','put','delete'])state.kv[method]=state.native[method];\n  __afwFiniteBudgetQueues.delete(state.kv);__afwFiniteBudgetStates.delete(this);return {restored:true};\n }}\n});\n";
diff --git a/test/mcp-qa-finite-budget-native.test.mjs b/test/mcp-qa-finite-budget-native.test.mjs
# before_blob=082340b6ede2a252a8602721ec19063cc68fafc8 after_blob=8339c7550c05e996ad44263fafd6a2a7ac564c0e
--- a/test/mcp-qa-finite-budget-native.test.mjs
+++ b/test/mcp-qa-finite-budget-native.test.mjs
@@ -1,21 +1,21 @@
-import test from 'node:test';
+import test,{before,after} from 'node:test';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {mkdir,readFile,writeFile,cp} from 'node:fs/promises';
 import {join} from 'node:path';
 import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference} from './fixtures/finite-owner-cleanup.mjs';
 
 import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace,verifyPositiveBudgetEpochInventory} from './fixtures/finite-budget-evidence.mjs';
 
 const group=process.env.AFW_BUDGET_GROUP;
-if(group!==undefined&&!['red','positive'].includes(group))throw Error('SYN budget group unsupported before I0');
+if(group!==undefined&&!['red','positive','readonly','reduction_a','reduction_b'].includes(group))throw Error('SYN budget group unsupported before I0');
 const directory='output/finite-budget/red',hash=bytes=>createHash('sha256').update(bytes).digest('hex');
 if(group==='red')test('R0 attributable diagnostics after genuine SDK complete and durable Reference',{timeout:180000},async t=>{
  await mkdir(directory,{recursive:true});
  const source=process.env.GITHUB_SHA;assert.match(source??'',/^[a-f0-9]{40}$/);
  const outcome={purpose:'afw.finite-budget-red-outcome.syn.v1',source,caseName:'R0',startedAt:Date.now(),stage:'fixture',actualCompleteNormal:null,referenceHash:null,responseStatus:null,diagnosticsPurpose:null,expectedDeficitObserved:false,operationalReadiness:false,completePackage:false,PCoff:false};
  try{
   const f=await ownerReferenceFixture(t);
   outcome.stage='prepare';
   const prepared=await prepareOwnerReference(f);
   outcome.stage='issue';
@@ -88,10 +88,59 @@
   const key=epoch.segment+'|'+epoch.epoch+'|'+epoch.role;assert(!identities.has(key));identities.add(key);roles.add(epoch.role);
   const s=epoch.snapshot;assert.equal(s.testRevision,process.env.GITHUB_SHA);assert.equal(s.workerRole,epoch.role);
   const observed=verifyObservedBudgetMetrics(s),full=s.retention.traceComplete?verifyCompleteBudgetTrace(s):null;
   for(const group of s.byPhaseResource)if(group.nativeStarted>0)phases.add(group.phase);
   console.info('P1 SYN proof',JSON.stringify({segment:epoch.segment,epoch:epoch.epoch,role:epoch.role,observed,full,retention:s.retention}));
  }
  assert.deepEqual([...roles].sort(),['M','QA']);
  assert.deepEqual([...phases].sort(),['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory'].sort());
  for(const role of roles)assert(epochs.some(e=>e.role===role&&e.snapshot.rows.length>0));
 });
+
+
+// Fixed owned SYN cases. No producer, clock or SDK work occurs without an
+// explicitly selected native group; the preparation workflow does not run it.
+if(group==='readonly'){
+ for(const name of ['R1','R2','R3'])test(name+' fixed original SDK readonly budget',{timeout:120000},async()=>{
+  const {runBudgetReadonlyCase}=await import('./fixtures/finite-budget-world.mjs');
+  const result=await runBudgetReadonlyCase(name),f=result.facts;
+  assert.equal(result.caseName,name);assert.equal(f.completeWrites,1);assert.equal(f.completeNormal,1);
+  assert.equal(f.input.entries,name==='R2'?201:200);
+  assert.equal(f.input.correlations,1);assert.equal(f.input.expirationPreserved,true);
+  assert.equal(f.foreignUnchanged,true);assert(f.lists<=2&&f.gets<=200&&f.scopePeak<=2);
+  assert.equal(f.sdkReplay,0);assert.equal(f.nativeUnsettled,0);assert.equal(f.outwardPending,0);
+  if(name==='R1'){assert.equal(f.lists,2);assert.equal(f.gets,200);assert.equal(f.scopePeak,2);assert.equal(f.responseStatus,302);assert.equal(f.referenceRows,1);assert.equal(f.referenceBefore302,true);}
+  else{assert.notEqual(f.responseStatus,302);assert.equal(f.referenceRows,0);assert.equal(f.thirdListEntered,false);}
+  if(name==='R3'){
+   assert.equal(f.holdLabel,'holdpostnativeACK');assert.equal(f.heldNativeSettled,2);assert(f.queuedAtHold>0);
+   assert.equal(f.rootBefore.available,true);assert.equal(f.rootDuring.available,false);assert.equal(f.rootDuring.live,true);assert.equal(f.rootAfter.available,true);
+   assert(f.originalChildElapsedMs>=4900&&f.originalChildElapsedMs<10000);
+   assert.equal(f.callsAfterRelease,0);assert.equal(f.lateReference,false);
+  }
+  assert.equal(result.operationalReadiness,false);assert.equal(result.completePackage,false);assert.equal(result.PCoff,false);
+ });
+}
+if(group==='reduction_a'||group==='reduction_b'){
+ let pair;
+ before(async()=>{const {prepareBudgetReductionPair}=await import('./fixtures/finite-budget-world.mjs');pair=await prepareBudgetReductionPair(group,process.env.AFW_BUDGET_CHECKPOINT??'output/finite-budget/checkpoint');});
+ after(async()=>{if(pair)await pair.dispose();});
+ for(const name of group==='reduction_a'?['D1','D2']:['D3','D4'])test(name+' fixed original SDK reduction budget',{timeout:300000},async()=>{
+  const result=await pair.result(name),f=result.facts;
+  assert.equal(result.caseName,name);assert.equal(result.plan.C0,result.plan.I0+900000);assert.equal(result.plan.C1,result.plan.C0+180000);
+  assert.equal(result.producer.unexchanged,true);assert.equal(result.producer.codeExchanged,false);assert.equal(result.producer.normalComplete,1);
+  assert.equal(result.producer.sameCheckpoint,true);assert.equal(result.producer.consumerGroup,group);
+  assert.equal(result.recovery.pairSize,2);assert(result.recovery.pairReady<=result.plan.C0-30000);assert.equal(result.recovery.restart,false);
+  assert.equal(result.recovery.coldInventoryVerified,true);assert.equal(result.recovery.bothAliases,true);
+  assert.equal(f.input.ownTokens,name==='D2'?200:name==='D3'?201:199);assert.equal(f.input.expirationPreserved,true);assert.equal(f.foreignUnchanged,true);
+  assert(f.lists<=2&&f.deletes<=200&&f.scopePeak<=2);assert.equal(f.sdkReplay,0);
+  if(name==='D1'){assert.equal(f.deletes,200);assert.equal(f.grantRemaining,false);assert.equal(f.sdkReturned,true);assert.equal(f.sdkObserved,true);assert.equal(f.ownerReceipt,true);assert.equal(f.completed,true);}
+  else{assert.equal(f.sdkReturned,false);assert.equal(f.sdkObserved,false);assert.equal(f.ownerReceipt,false);assert.equal(f.completed,false);assert.equal(f.uncertainSendRetried,false);}
+  if(name==='D2'){assert.equal(f.deletes,200);assert.equal(f.grantRemaining,true);assert.equal(f.grantDeleteEntered,false);}
+  if(name==='D3'){assert.equal(f.thirdListEntered,false);assert.equal(f.grantRemaining,true);assert.equal(f.pendingPreserved,true);}
+  if(name==='D4'){
+   assert.equal(f.holdLabel,'holdpostnativeACK');assert.equal(f.heldNativeSettled,2);assert(f.queuedAtHold>0);
+   assert.equal(f.rootBefore.available,true);assert.equal(f.rootDuring.available,false);assert.equal(f.rootDuring.live,true);assert.equal(f.rootAfter.available,true);
+   assert(f.originalChildElapsedMs>=4900&&f.originalChildElapsedMs<10000);assert.equal(f.callsAfterRelease,0);assert.equal(f.falseSdkReturn,false);
+  }
+  assert.equal(result.operationalReadiness,false);assert.equal(result.completePackage,false);assert.equal(result.PCoff,false);
+ });
+}
```
