# Task1 fix round1 — complete scoped review package

FIX_BASE eaf019aa872709d867aac53d9684ecdf1c21d013 (the previous reviewed HEAD); FIX_HEAD eb3b4f2337b9da2611164df5505f7a0d82b591fa; HEAD tree7e63ab6e728d9abd89851b37aad3c49f88efcd2a. Global Task1BASE29681cae remains unchanged. This package contains ALL13fix commits, complete six-path stat and verified U10 diff for the complete fix range; not HEAD~1. The added workflow is included in full. This is a scoped re-review, not a new review of the full Task1 branch.

## Commits

96fffacd23525a0c3be66ce5dce071ba0035b6a0 test: reproduce five Task1 review gaps causally
15df40fb488660c6510b4d55866320b3cb577c7f test: correct isolated optional-entrypoint probe and cover partition peak bound
ca6a776be0be5289f7891533061520f743808beb test: prove optional default guard failure in an ordinary child context
1c7c4d191b3eb03a0d74882af7d87fde07076a18 fix: close five finite budget observer qualification review gaps
985a75812f514454c1cfa476e2f9779eda2283fa test: expose R4 rejection of source-faithful six-field captures
f6ab4f01c0b867703477fc836424a5e02cc04c40 fix: validate actual six-field positive epoch captures
d1b3a78eec70ae20a3fe17ed9500e3df3e4f3c86 test: preserve bounded reporter-only ordinary suite diagnostics
f5f52660d19ec9fc634bbc49558db75582fdaf88 docs: preserve Task1 fix round1 evidence and retire diagnostic gate
41b7cefae63c5ba335ad846f4f3eb32bf47e27d7 test: classify four existing failures against fixed historical sources
4fa63c8714d7818cd671dad9f80e87df059c4ea2 docs: preserve inconclusive four-file comparison before recorder repair
7fe2f275a0a0d43c9cb117d756c85836529cacc0 test: omit stack enrichment and classify matched historical failures safely
6248c62dc01d56661d3f0791dc2a2cf8ce4e2761 docs: preserve matched four-file classification and retire comparison gate
eb3b4f2337b9da2611164df5505f7a0d82b591fa docs: stage inactive full9 epoch verifier for scoped Task1 review

## Stat and immutable blobs

|Path|Status|+|-|Before blob|After blob|
|---|---|---:|---:|---|---|
|.github/workflows/afw-finite-budget-qualification.yml|added|910|0|ABSENT|6f48afaaf998abc9a120410a10cfca27b1afed87|
|docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md|modified|289|0|faaf70bbab2ccb21319812413b4ff47e53f69738|fbc552b95667f032034c45bceb8147789e6a01b4|
|test/finite-budget-diagnostics.test.mjs|modified|115|0|f8745e0b8060e1d67066104690835f7ce25b1504|5ae2d79aa657a5bdf71d11c2e764d4fa23f749ef|
|test/fixtures/finite-budget-diagnostics.mjs|modified|21|7|f9884aa893d6ab6d74597921cc8925bf05437eea|2e911fd4e9d2287da687bef9b0389fbec48a5114|
|test/fixtures/finite-budget-evidence.mjs|modified|18|0|81178d96e10784366ab1b11bbf0805e347dea173|0d95b1616a167f7f089e3a8ca59ca9628aa8aaa9|
|test/mcp-qa-finite-budget-native.test.mjs|modified|3|2|d63f6e5752894ddc7d52f2430fa8f1fd1c07156a|082340b6ede2a252a8602721ec19063cc68fafc8|

## Root verified preservation and test references (claims to assess)

- Full non-truncated trees: FIX_BASE3188leaves, HEAD3189, exactly6netpaths,3183other BASE leaves exact. Four code after-blobs equal final directed GREENf6ab/f5. Report is exact append-only fromfaaf70bb; main freshly0c9c475b, no source writes during this re-review.
- Final causal RED43141085705/1:8Q,3pass/5expected ERR_ASSERTION; final R4-fidelity RED43144954855/1:7pass/1expected Q3; final covering GREEN43145051926/1:8/8,0fail/cancel/skip/todo, syntax/lintfourmodules and preflight176/130/635/54. Raw controlled pure TAP/safe artifacts preserved; exact commands and outputs in report diff below. Do not rerun these tests for confirmation.
- Ordinary literal43141464770/1 cancelled20min with NO summary. Reporter-only entire725file run43145877512/1 timedout after480s+5s with preserved partials/totalsnull; no ordinaryPASS. Narrow corrected A/B43149728253/1 againsteaf andf5 both109tests/73pass/36fail,40failed event identities/hashes exactly match. This shows those FOUR-FILE failures predate this fix round under matched setup, not a root cause or pre-Task1 proof. Three pending native files and full ordinary coverage remain unqualified. ORD-1 remains OPEN for integration.
- A/B's first recorder version41b7 had an unbounded stack scanner; old comparison43148329682 was INCONCLUSIVE, preserved. Corrected recorder7fe2 was checked with same MODELED1048779Bstack: old exact module timeouts1s, new<50ms/no stack/errors probes/getters/canary, then complete A/B. Retired workflow code is in commit history/reports, not in delivered candidate.
- Delivered full9 workflow is INACTIVE: workflow_dispatch/noinputs/nopush, threejob falseguards,3/15/5min. Root normalized its body to executed/reviewed baef/f0f20 EXACTLY apart from threefalseguards and shared inventory import/call. Full candidate below; actual API total_count0 runs on HEAD. No current native900s/P1 run authorized before this review. Historical baef43134302664/1 8Q+P1 remains separate dated evidence.
- Existing SYNcustody key is operational and unchanged. No credentials/Cloudflare/runtime/OAuth/Max/mail/permissions/main/merge/deploy/localbuild changed. The one49kB YAMLformatparse used existing Python/PyYAMLBaseLoader in RAM, no local test/deps/file; described in appended report. Readiness/package/PCofffalse.

## Complete fix diff (all six files, verified U10)

```diff
diff --git a/.github/workflows/afw-finite-budget-qualification.yml b/.github/workflows/afw-finite-budget-qualification.yml
# before_blob=ABSENT after_blob=6f48afaaf998abc9a120410a10cfca27b1afed87
--- /dev/null
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -0,0 +1,910 @@
+name: AFW finite budget qualification
+run-name: AFW finite SYN fix round1 inactive candidate ${{ github.sha }}
+on:
+  workflow_dispatch:
+permissions:
+  contents: read
+  actions: read
+concurrency:
+  group: afw-finite-budget-qualification
+  cancel-in-progress: false
+env:
+  AFW_BUDGET_GROUP: positive
+jobs:
+  pure:
+    if: ${{ false }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 3
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
+          node-version: '22'
+      - name: Install the locked fixture dependencies
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-locked-install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+      - name: Check seven Node files and the original eight groups
+        id: pure_test
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          files=(test/fixtures/finite-budget-diagnostics.mjs test/fixtures/finite-budget-evidence.mjs test/fixtures/finite-budget-world.mjs test/finite-budget-diagnostics.test.mjs test/mcp-qa-finite-budget-native.test.mjs test/fixtures/finite-checkpoint-custody.mjs test/finite-checkpoint-custody.test.mjs)
+          for file in "${files[@]}"; do node --check "$file" >>"$RUNNER_TEMP/afw-pure-private/syntax.log" 2>&1 || { echo syntax_failed; exit 1; }; done
+          npx --no-install eslint "${files[@]}" >"$RUNNER_TEMP/afw-pure-private/lint.log" 2>&1 || { echo lint_failed; exit 1; }
+          [[ ! -e output/finite-budget/pure && ! -L output/finite-budget/pure ]] || { echo pure_failed; exit 1; }
+          mkdir -p output/finite-budget/pure
+          printf 'focused lint passed\n' > output/finite-budget/pure/lint.log
+          exit_code=0
+          node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs >"$RUNNER_TEMP/afw-pure-private/tests.tap" 2>&1 || exit_code=$?
+          export AFW_PURE_EXIT="$exit_code"
+          node --input-type=module <<'NODE'
+          import {readFileSync,writeFileSync} from 'node:fs';import {join} from 'node:path';
+          const env=process.env,text=readFileSync(join(env.RUNNER_TEMP,'afw-pure-private','tests.tap'),'utf8'),counts={};
+          let valid=env.AFW_PURE_EXIT==='0';
+          for(const [name,n] of Object.entries({tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0})){
+           const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))],value=hits.length===1?Number(hits[0][1]):null;
+           counts[name]=Number.isSafeInteger(value)&&value>=0?value:null;valid&&=counts[name]===n;
+          }
+          const line='AFW_PURE '+JSON.stringify(counts);writeFileSync('output/finite-budget/pure/tests.log',line+'\n');console.log(line);
+          if(!valid)process.exitCode=Number(env.AFW_PURE_EXIT)||1;
+          NODE
+      - name: Strict M and QA prepared-role preflight before I0
+        id: preflight
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node test/fixtures/finite-budget-world.mjs preflight-budget >"$RUNNER_TEMP/afw-pure-private/preflight.log" 2>&1 || { echo preflight_failed; exit 1; }
+          test -s output/finite-budget/pure/preflight.json && test ! -L output/finite-budget/pure/preflight.json
+          printf 'strict prepared-role preflight passed\n' >output/finite-budget/pure/preflight.log
+      - name: Seal a closed pure evidence directory
+        id: pure_seal
+        if: always() && !cancelled() && steps.scope.outcome == 'success'
+        env:
+          PURE_COMPLETE: ${{ steps.pure_test.outcome == 'success' && steps.preflight.outcome == 'success' }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {mkdir,readdir,writeFile,lstat,copyFile} from 'node:fs/promises';import {join} from 'node:path';
+          import {sealBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          try{
+           const dest=join(process.env.RUNNER_TEMP,'afw-pure-public');await mkdir(dest,{mode:0o700});
+           if(process.env.PURE_COMPLETE==='true'){
+            for(const name of ['tests.log','lint.log','preflight.log','preflight.json']){
+             const file=join('output/finite-budget/pure',name);const st=await lstat(file);assert(st.isFile()&&st.nlink===1);await copyFile(file,join(dest,name));
+            }
+           }else{await writeFile(join(dest,'status.json'),JSON.stringify({status:'pure_failed',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT}));}
+           await sealBudgetArtifact(dest,'pure');
+           const names=await readdir(dest);assert.deepEqual(names.sort(),(process.env.PURE_COMPLETE==='true'?['budget-artifact.json','lint.log','preflight.json','preflight.log','tests.log']:['budget-artifact.json','status.json']).sort());
+          }catch{console.log('evidence_not_preserved');process.exitCode=1;}
+          NODE
+      - name: Upload finite-budget-pure only
+        id: upload
+        if: always() && !cancelled() && steps.pure_seal.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-pure-${{ github.sha }}
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
+  positive_prepare:
+    if: ${{ false }}
+    needs: pure
+    runs-on: ubuntu-24.04
+    timeout-minutes: 15
+    environment: afw-finite-syn-checkpoint
+    outputs:
+      artifact-id: ${{ steps.upload.outputs.artifact-id }}
+      seal-sha: ${{ steps.identity.outputs.ENVELOPE_SHA }}
+      receipt-sha: ${{ steps.identity.outputs.RECEIPT_SHA }}
+      manifest-sha: ${{ steps.identity.outputs.MANIFEST_SHA }}
+    steps:
+      - name: Pin producer start and scope before setup
+        id: scope
+        env:
+          PRIOR_RESULT: ${{ needs.pure.result }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          printf 'AFW_JOB_STARTED_MS=%s\n' "$(date +%s%3N)" >> "$GITHUB_ENV"
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          test "$PRIOR_RESULT" = success
+          mkdir -m 700 "$RUNNER_TEMP/afw-prep-private" "$RUNNER_TEMP/afw-prep-verification"
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
+          node-version: '22'
+      - name: Validate dedicated custody material before fixture use
+        id: key_preflight
+        env:
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint
+      - name: Install the locked fixture dependencies
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-locked-install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+      - name: Download prior_pure by exact ID attempt 1
+        id: prior_pure_1
+        if: success() && needs.pure.outputs.artifact-id != ''
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.pure.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-pure
+          merge-multiple: true
+      - name: Wait 2s before prior_pure retrieval 2
+        id: prior_pure_wait2
+        if: always() && !cancelled() && steps.prior_pure_1.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 2
+      - name: Download prior_pure by exact ID attempt 2
+        id: prior_pure_2
+        if: always() && !cancelled() && steps.prior_pure_wait2.outcome == 'success' && steps.prior_pure_1.outcome == 'failure'
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.pure.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-pure
+          merge-multiple: true
+      - name: Wait 5s before prior_pure retrieval 3
+        id: prior_pure_wait3
+        if: always() && !cancelled() && steps.prior_pure_2.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 5
+      - name: Download prior_pure by exact ID attempt 3
+        id: prior_pure_3
+        if: always() && !cancelled() && steps.prior_pure_wait3.outcome == 'success' && steps.prior_pure_2.outcome == 'failure'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.pure.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-pure
+          merge-multiple: true
+      - name: Verify same-ID pure input and the exact marked revision
+        id: prior_verified
+        if: always() && !cancelled() && steps.key_preflight.outcome == 'success'
+        env:
+          ARTIFACT_ID: ${{ needs.pure.outputs.artifact-id }}
+          DOWNLOADED: ${{ steps.prior_pure_1.outcome == 'success' || steps.prior_pure_2.outcome == 'success' || steps.prior_pure_3.outcome == 'success' }}
+          READBACK: ${{ runner.temp }}/afw-prior-pure
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -n "$ARTIFACT_ID"
+          test "$DOWNLOADED" = true || { echo evidence_not_preserved; exit 1; }
+          if ! node --input-type=module -e "import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs'; await verifyBudgetArtifact(process.env.READBACK,'pure',process.env.ARTIFACT_ID);" >"$RUNNER_TEMP/afw-prep-verification/prior.log" 2>&1; then echo evidence_not_preserved; exit 1; fi
+          test -s "$READBACK/preflight.json" || { echo preflight_unavailable; exit 1; }
+      - name: Original principal producer with its original clock
+        id: native_fixture
+        env:
+          AFW_BUDGET_PREFLIGHT: ${{ runner.temp }}/afw-prior-pure/preflight.json
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          [[ ! -e output/finite-budget/producer/failure-epochs.json && ! -L output/finite-budget/producer/failure-epochs.json ]] || { echo producer_failed; exit 1; }
+          private="$RUNNER_TEMP/afw-prep-private"
+          result=0
+          node test/fixtures/finite-budget-world.mjs prepare-positive "$private/checkpoint" >"$private/producer.log" 2>&1 || result=$?
+          printf '%s\n' "$result" > "$private/exit-code"
+          if [[ -e output/finite-budget/producer/failure-epochs.json || -L output/finite-budget/producer/failure-epochs.json ]]; then
+            test -f "output/finite-budget/producer/failure-epochs.json" && test ! -L "output/finite-budget/producer/failure-epochs.json" || { echo evidence_not_preserved; exit 1; }
+            cp -- "output/finite-budget/producer/failure-epochs.json" "$private/failure-epochs.json"
+          fi
+          if [[ "$result" != 0 ]]; then echo producer_failed; exit "$result"; fi
+      - name: Seal only the producer fixture bundle
+        id: seal
+        if: always() && !cancelled() && steps.key_preflight.outcome == 'success' && (steps.native_fixture.outcome == 'success' || steps.native_fixture.outcome == 'failure')
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          kind=checkpoint
+          if [[ "$FIXTURE_OUTCOME" != success ]]; then kind=producer-failure; fi
+          if ! node test/fixtures/finite-checkpoint-custody.mjs seal "$kind" "$RUNNER_TEMP/afw-prep-private" "$RUNNER_TEMP/afw-prep-public"; then echo evidence_not_preserved; exit 1; fi
+      - name: Authenticate and reopen the local producer envelope
+        id: local_open
+        if: always() && !cancelled() && steps.seal.outcome == 'success'
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          kind=checkpoint
+          if [[ "$FIXTURE_OUTCOME" != success ]]; then kind=producer-failure; fi
+          if ! node test/fixtures/finite-checkpoint-custody.mjs open "$kind" "$RUNNER_TEMP/afw-prep-public" "$RUNNER_TEMP/afw-prep-local-open"; then echo evidence_not_preserved; exit 1; fi
+      - name: Check local producer custody and closed public staging
+        id: local_verified
+        if: always() && !cancelled() && steps.local_open.outcome == 'success'
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          if [[ "$FIXTURE_OUTCOME" == success ]]; then
+            if ! node test/fixtures/finite-budget-world.mjs verify-positive "$RUNNER_TEMP/afw-prep-local-open/checkpoint" >"$RUNNER_TEMP/afw-prep-local-open-verification.log" 2>&1; then echo evidence_not_preserved; exit 1; fi
+          fi
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {readdir,lstat} from 'node:fs/promises';import {join} from 'node:path';
+          try{const dir=join(process.env.RUNNER_TEMP,'afw-prep-public');const files=(await readdir(dir)).sort();
+          assert.deepEqual(files,['envelope.bin','manifest.json','receipt.json']);for(const file of files){const s=await lstat(join(dir,file));assert(s.isFile()&&s.nlink===1&&s.size>0);}}catch{console.log('evidence_not_preserved');process.exitCode=1;}
+          NODE
+      - name: Upload finite-budget-sealed-prep only
+        id: upload
+        if: always() && !cancelled() && steps.local_verified.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-sealed-prep-${{ github.sha }}
+          path: ${{ runner.temp }}/afw-prep-public/
+          if-no-files-found: error
+          retention-days: 7
+      - name: Download own_prep by exact ID attempt 1
+        id: own_prep_1
+        if: always() && !cancelled() && steps.upload.outcome == 'success' && steps.upload.outputs.artifact-id != ''
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prep-download
+          merge-multiple: true
+      - name: Wait 2s before own_prep retrieval 2
+        id: own_prep_wait2
+        if: always() && !cancelled() && steps.own_prep_1.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 2
+      - name: Download own_prep by exact ID attempt 2
+        id: own_prep_2
+        if: always() && !cancelled() && steps.own_prep_wait2.outcome == 'success' && steps.own_prep_1.outcome == 'failure'
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prep-download
+          merge-multiple: true
+      - name: Wait 5s before own_prep retrieval 3
+        id: own_prep_wait3
+        if: always() && !cancelled() && steps.own_prep_2.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 5
+      - name: Download own_prep by exact ID attempt 3
+        id: own_prep_3
+        if: always() && !cancelled() && steps.own_prep_wait3.outcome == 'success' && steps.own_prep_2.outcome == 'failure'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prep-download
+          merge-multiple: true
+      - name: Require exact original outer files on producer readback
+        id: outer_verified
+        if: always() && !cancelled() && steps.upload.outcome == 'success'
+        env:
+          ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+          DOWNLOADED: ${{ steps.own_prep_1.outcome == 'success' || steps.own_prep_2.outcome == 'success' || steps.own_prep_3.outcome == 'success' }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -n "$ARTIFACT_ID"
+          test "$DOWNLOADED" = true || { echo evidence_not_preserved; exit 1; }
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {readdir,lstat} from 'node:fs/promises';import {join} from 'node:path';
+          try{const dir=join(process.env.RUNNER_TEMP,'afw-prep-download');const files=(await readdir(dir)).sort();
+          assert.deepEqual(files,['envelope.bin','manifest.json','receipt.json']);for(const file of files){const s=await lstat(join(dir,file));assert(s.isFile()&&s.nlink===1&&s.size>0);}}catch{console.log('evidence_not_preserved');process.exitCode=1;}
+          NODE
+          for file in manifest.json receipt.json envelope.bin; do
+            if ! cmp -s -- "$RUNNER_TEMP/afw-prep-public/$file" "$RUNNER_TEMP/afw-prep-download/$file"; then echo evidence_not_preserved; exit 1; fi
+          done
+      - name: Authenticate and open the same-ID producer readback
+        id: download_open
+        if: always() && !cancelled() && steps.outer_verified.outcome == 'success'
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          kind=checkpoint
+          if [[ "$FIXTURE_OUTCOME" != success ]]; then kind=producer-failure; fi
+          if ! node test/fixtures/finite-checkpoint-custody.mjs open "$kind" "$RUNNER_TEMP/afw-prep-download" "$RUNNER_TEMP/afw-prep-download-open"; then echo evidence_not_preserved; exit 1; fi
+      - name: Verify reconstructed producer evidence
+        id: identity
+        if: always() && !cancelled() && steps.download_open.outcome == 'success'
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          if [[ "$FIXTURE_OUTCOME" == success ]]; then
+            if ! node test/fixtures/finite-budget-world.mjs verify-positive "$RUNNER_TEMP/afw-prep-download-open/checkpoint" >"$RUNNER_TEMP/afw-prep-download-open-verification.log" 2>&1; then echo evidence_not_preserved; exit 1; fi
+          fi
+          for spec in envelope.bin:ENVELOPE_SHA receipt.json:RECEIPT_SHA manifest.json:MANIFEST_SHA; do
+            file="${spec%%:*}"
+            label="${spec##*:}"
+            digest=$(sha256sum -- "$RUNNER_TEMP/afw-prep-download/$file")
+            printf '%s=%s\n' "$label" "${digest%% *}" >> "$GITHUB_OUTPUT"
+          done
+          printf 'custody_verified artifact_id=%s\n' "$ARTIFACT_ID"
+      - name: Keep custody or fixture failure terminal
+        id: terminal
+        if: always() && !cancelled() && steps.key_preflight.outcome == 'success' && (steps.native_fixture.outcome == 'success' || steps.native_fixture.outcome == 'failure')
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          CUSTODY_OUTCOME: ${{ steps.identity.outcome }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          if [[ "$CUSTODY_OUTCOME" != success ]]; then
+            echo evidence_not_preserved
+            exit 1
+          fi
+          if [[ "$FIXTURE_OUTCOME" != success ]]; then
+            echo producer_failed
+            exit 1
+          fi
+      - name: Mark preparation stopped before original work
+        if: failure() && steps.native_fixture.outcome == 'skipped'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          echo evidence_not_preserved
+          exit 1
+  positive_consume:
+    if: ${{ false }}
+    needs: positive_prepare
+    runs-on: ubuntu-24.04
+    timeout-minutes: 5
+    environment: afw-finite-syn-checkpoint
+    steps:
+      - name: Require the fixed cold-consumer scope
+        id: scope
+        env:
+          PRIOR_RESULT: ${{ needs.positive_prepare.result }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          test "$PRIOR_RESULT" = success
+          mkdir -m 700 "$RUNNER_TEMP/afw-result-private" "$RUNNER_TEMP/afw-consume-verification"
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
+          node-version: '22'
+      - name: Validate dedicated custody material before fixture use
+        id: key_preflight
+        env:
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node test/fixtures/finite-checkpoint-custody.mjs key-preflight checkpoint
+      - name: Install the locked fixture dependencies
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          npm ci --ignore-scripts --no-audit --no-fund >"$RUNNER_TEMP/afw-locked-install.log" 2>&1 || { echo locked_install_failed; exit 1; }
+      - name: Download prior_checkpoint by exact ID attempt 1
+        id: prior_checkpoint_1
+        if: success() && needs.positive_prepare.outputs.artifact-id != ''
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.positive_prepare.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-checkpoint
+          merge-multiple: true
+      - name: Wait 2s before prior_checkpoint retrieval 2
+        id: prior_checkpoint_wait2
+        if: always() && !cancelled() && steps.prior_checkpoint_1.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 2
+      - name: Download prior_checkpoint by exact ID attempt 2
+        id: prior_checkpoint_2
+        if: always() && !cancelled() && steps.prior_checkpoint_wait2.outcome == 'success' && steps.prior_checkpoint_1.outcome == 'failure'
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.positive_prepare.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-checkpoint
+          merge-multiple: true
+      - name: Wait 5s before prior_checkpoint retrieval 3
+        id: prior_checkpoint_wait3
+        if: always() && !cancelled() && steps.prior_checkpoint_2.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 5
+      - name: Download prior_checkpoint by exact ID attempt 3
+        id: prior_checkpoint_3
+        if: always() && !cancelled() && steps.prior_checkpoint_wait3.outcome == 'success' && steps.prior_checkpoint_2.outcome == 'failure'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ needs.positive_prepare.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-prior-checkpoint
+          merge-multiple: true
+      - name: Require the producer ID and all three original public hashes
+        id: outer_input
+        if: always() && !cancelled() && steps.key_preflight.outcome == 'success'
+        env:
+          ARTIFACT_ID: ${{ needs.positive_prepare.outputs.artifact-id }}
+          DOWNLOADED: ${{ steps.prior_checkpoint_1.outcome == 'success' || steps.prior_checkpoint_2.outcome == 'success' || steps.prior_checkpoint_3.outcome == 'success' }}
+          SEAL_SHA: ${{ needs.positive_prepare.outputs.seal-sha }}
+          RECEIPT_SHA: ${{ needs.positive_prepare.outputs.receipt-sha }}
+          MANIFEST_SHA: ${{ needs.positive_prepare.outputs.manifest-sha }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -n "$ARTIFACT_ID"
+          test "$DOWNLOADED" = true || { echo evidence_not_preserved; exit 1; }
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {readdir,lstat} from 'node:fs/promises';import {join} from 'node:path';
+          try{const dir=join(process.env.RUNNER_TEMP,'afw-prior-checkpoint');const files=(await readdir(dir)).sort();
+          assert.deepEqual(files,['envelope.bin','manifest.json','receipt.json']);for(const file of files){const s=await lstat(join(dir,file));assert(s.isFile()&&s.nlink===1&&s.size>0);}}catch{console.log('evidence_not_preserved');process.exitCode=1;}
+          NODE
+          dir="$RUNNER_TEMP/afw-prior-checkpoint"
+          for spec in envelope.bin:SEAL_SHA receipt.json:RECEIPT_SHA manifest.json:MANIFEST_SHA; do
+            file="${spec%%:*}"; name="${spec##*:}"; expected="${!name}"
+            [[ "$expected" =~ ^[a-f0-9]{64}$ ]] || { echo evidence_not_preserved; exit 1; }
+            actual=$(sha256sum -- "$dir/$file")
+            [[ "${actual%% *}" = "$expected" ]] || { echo evidence_not_preserved; exit 1; }
+          done
+      - name: Open and authenticate the producer checkpoint only
+        id: incoming_open
+        env:
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          if ! node test/fixtures/finite-checkpoint-custody.mjs open checkpoint "$RUNNER_TEMP/afw-prior-checkpoint" "$RUNNER_TEMP/afw-cold-input"; then echo evidence_not_preserved; exit 1; fi
+      - name: Verify original native checkpoint before cold recovery
+        id: incoming_verified
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          if ! node test/fixtures/finite-budget-world.mjs verify-positive "$RUNNER_TEMP/afw-cold-input/checkpoint" >"$RUNNER_TEMP/afw-consume-verification/checkpoint.log" 2>&1; then echo evidence_not_preserved; exit 1; fi
+      - name: Original P1 against the single reconstructed checkpoint
+        id: native_fixture
+        env:
+          AFW_BUDGET_CHECKPOINT: ${{ runner.temp }}/afw-cold-input/checkpoint
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"
+          [[ ! -e output/finite-budget/positive && ! -L output/finite-budget/positive ]] || { echo consumer_failed; exit 1; }
+          private="$RUNNER_TEMP/afw-result-private"
+          result=0
+          node --test --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs >"$private/p1.tap" 2>&1 || result=$?
+          printf '%s\n' "$result" > "$private/exit-code"
+          if [[ -e output/finite-budget/positive/full-result.json || -L output/finite-budget/positive/full-result.json ]]; then
+            test -f "output/finite-budget/positive/full-result.json" && test ! -L "output/finite-budget/positive/full-result.json" || { echo evidence_not_preserved; exit 1; }
+            cp -- "output/finite-budget/positive/full-result.json" "$private/full-result.json"
+          fi
+          if [[ -e output/finite-budget/positive/epochs.json || -L output/finite-budget/positive/epochs.json ]]; then
+            test -f "output/finite-budget/positive/epochs.json" && test ! -L "output/finite-budget/positive/epochs.json" || { echo evidence_not_preserved; exit 1; }
+            cp -- "output/finite-budget/positive/epochs.json" "$private/epochs.json"
+          fi
+          if [[ "$result" != 0 ]]; then echo consumer_failed; exit "$result"; fi
+          test -s "$private/full-result.json" && test -s "$private/epochs.json" || { echo consumer_failed; exit 1; }
+          node --input-type=module 2>"$private/tap-validation.log" <<'NODE'
+          import {readFileSync} from 'node:fs';import {join} from 'node:path';
+          const text=readFileSync(join(process.env.RUNNER_TEMP,'afw-result-private','p1.tap'),'utf8');
+          for(const [name,n] of Object.entries({tests:1,pass:1,fail:0,cancelled:0,skipped:0,todo:0})){
+           const hits=[...text.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];if(hits.length!==1||Number(hits[0][1])!==n)process.exit(1);
+          }
+          NODE
+      - name: Seal only the consumer fixture bundle
+        id: seal
+        if: always() && !cancelled() && steps.key_preflight.outcome == 'success' && (steps.native_fixture.outcome == 'success' || steps.native_fixture.outcome == 'failure')
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          kind=positive-result
+          if [[ "$FIXTURE_OUTCOME" != success ]]; then kind=consumer-failure; fi
+          if ! node test/fixtures/finite-checkpoint-custody.mjs seal "$kind" "$RUNNER_TEMP/afw-result-private" "$RUNNER_TEMP/afw-result-public"; then echo evidence_not_preserved; exit 1; fi
+      - name: Authenticate and reopen the local consumer envelope
+        id: local_open
+        if: always() && !cancelled() && steps.seal.outcome == 'success'
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          kind=positive-result
+          if [[ "$FIXTURE_OUTCOME" != success ]]; then kind=consumer-failure; fi
+          if ! node test/fixtures/finite-checkpoint-custody.mjs open "$kind" "$RUNNER_TEMP/afw-result-public" "$RUNNER_TEMP/afw-result-local-open"; then echo evidence_not_preserved; exit 1; fi
+      - name: Check local consumer custody and closed public staging
+        id: local_verified
+        if: always() && !cancelled() && steps.local_open.outcome == 'success'
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {readdir,lstat} from 'node:fs/promises';import {join} from 'node:path';
+          try{const dir=join(process.env.RUNNER_TEMP,'afw-result-public');const files=(await readdir(dir)).sort();
+          assert.deepEqual(files,['envelope.bin','manifest.json','receipt.json']);for(const file of files){const s=await lstat(join(dir,file));assert(s.isFile()&&s.nlink===1&&s.size>0);}}catch{console.log('evidence_not_preserved');process.exitCode=1;}
+          NODE
+      - name: Upload finite-budget-sealed-result only
+        id: upload
+        if: always() && !cancelled() && steps.local_verified.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: finite-budget-sealed-result-${{ github.sha }}
+          path: ${{ runner.temp }}/afw-result-public/
+          if-no-files-found: error
+          retention-days: 7
+      - name: Download own_result by exact ID attempt 1
+        id: own_result_1
+        if: always() && !cancelled() && steps.upload.outcome == 'success' && steps.upload.outputs.artifact-id != ''
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-result-download
+          merge-multiple: true
+      - name: Wait 2s before own_result retrieval 2
+        id: own_result_wait2
+        if: always() && !cancelled() && steps.own_result_1.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 2
+      - name: Download own_result by exact ID attempt 2
+        id: own_result_2
+        if: always() && !cancelled() && steps.own_result_wait2.outcome == 'success' && steps.own_result_1.outcome == 'failure'
+        continue-on-error: true
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-result-download
+          merge-multiple: true
+      - name: Wait 5s before own_result retrieval 3
+        id: own_result_wait3
+        if: always() && !cancelled() && steps.own_result_2.outcome == 'failure'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          sleep 5
+      - name: Download own_result by exact ID attempt 3
+        id: own_result_3
+        if: always() && !cancelled() && steps.own_result_wait3.outcome == 'success' && steps.own_result_2.outcome == 'failure'
+        uses: actions/download-artifact@v4
+        with:
+          github-token: ${{ github.token }}
+          repository: ${{ github.repository }}
+          run-id: ${{ github.run_id }}
+          artifact-ids: ${{ steps.upload.outputs.artifact-id }}
+          path: ${{ runner.temp }}/afw-result-download
+          merge-multiple: true
+      - name: Require exact original outer files on consumer readback
+        id: outer_verified
+        if: always() && !cancelled() && steps.upload.outcome == 'success'
+        env:
+          ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+          DOWNLOADED: ${{ steps.own_result_1.outcome == 'success' || steps.own_result_2.outcome == 'success' || steps.own_result_3.outcome == 'success' }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -n "$ARTIFACT_ID"
+          test "$DOWNLOADED" = true || { echo evidence_not_preserved; exit 1; }
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';import {readdir,lstat} from 'node:fs/promises';import {join} from 'node:path';
+          try{const dir=join(process.env.RUNNER_TEMP,'afw-result-download');const files=(await readdir(dir)).sort();
+          assert.deepEqual(files,['envelope.bin','manifest.json','receipt.json']);for(const file of files){const s=await lstat(join(dir,file));assert(s.isFile()&&s.nlink===1&&s.size>0);}}catch{console.log('evidence_not_preserved');process.exitCode=1;}
+          NODE
+          for file in manifest.json receipt.json envelope.bin; do
+            if ! cmp -s -- "$RUNNER_TEMP/afw-result-public/$file" "$RUNNER_TEMP/afw-result-download/$file"; then echo evidence_not_preserved; exit 1; fi
+          done
+      - name: Authenticate and open the same-ID consumer readback
+        id: download_open
+        if: always() && !cancelled() && steps.outer_verified.outcome == 'success'
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          kind=positive-result
+          if [[ "$FIXTURE_OUTCOME" != success ]]; then kind=consumer-failure; fi
+          if ! node test/fixtures/finite-checkpoint-custody.mjs open "$kind" "$RUNNER_TEMP/afw-result-download" "$RUNNER_TEMP/afw-result-download-open"; then echo evidence_not_preserved; exit 1; fi
+      - name: Verify reconstructed consumer evidence
+        id: identity
+        if: always() && !cancelled() && steps.download_open.outcome == 'success'
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          ARTIFACT_ID: ${{ steps.upload.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          for spec in envelope.bin:ENVELOPE_SHA receipt.json:RECEIPT_SHA manifest.json:MANIFEST_SHA; do
+            file="${spec%%:*}"
+            label="${spec##*:}"
+            digest=$(sha256sum -- "$RUNNER_TEMP/afw-result-download/$file")
+            printf '%s=%s\n' "$label" "${digest%% *}" >> "$GITHUB_OUTPUT"
+          done
+          printf 'custody_verified artifact_id=%s\n' "$ARTIFACT_ID"
+      - name: Keep custody or fixture failure terminal
+        id: terminal
+        if: always() && !cancelled() && steps.key_preflight.outcome == 'success' && (steps.native_fixture.outcome == 'success' || steps.native_fixture.outcome == 'failure')
+        env:
+          FIXTURE_OUTCOME: ${{ steps.native_fixture.outcome }}
+          CUSTODY_OUTCOME: ${{ steps.identity.outcome }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          if [[ "$CUSTODY_OUTCOME" != success ]]; then
+            echo evidence_not_preserved
+            exit 1
+          fi
+          if [[ "$FIXTURE_OUTCOME" != success ]]; then
+            echo consumer_failed
+            exit 1
+          fi
+      - name: Emit only the closed business and observed-epoch proof projections
+        id: receipt
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          node --input-type=module 2>"$RUNNER_TEMP/afw-consume-verification/projection.log" <<'NODE'
+          import assert from 'node:assert/strict';
+          import {readFile} from 'node:fs/promises';
+          import {join} from 'node:path';
+          import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace,verifyPositiveBudgetEpochInventory} from './test/fixtures/finite-budget-evidence.mjs';
+          try {
+           const env=process.env;
+           const base=join(env.RUNNER_TEMP,'afw-result-download-open');
+           const result=JSON.parse(await readFile(join(base,'full-result.json'),'utf8'));
+           const tap=await readFile(join(base,'p1.tap'),'utf8'),tapCounts={};
+           for(const [name,expected] of Object.entries({tests:1,pass:1,fail:0,cancelled:0,skipped:0,todo:0})){
+            const hits=[...tap.matchAll(new RegExp('^# '+name+' (\\d+)$','gm'))];assert(hits.length===1&&Number(hits[0][1])===expected);tapCounts[name]=expected;
+           }
+           const safeCount=v=>{assert(Number.isSafeInteger(v)&&v>=0);return v;};
+           const digest=v=>typeof v==='string'&&v.length===64&&/^[a-f0-9]+$/.test(v)?v:null;
+           const {facts,plan,native,producer,recovery}=result;
+           assert(result.purpose==='afw.finite-budget-positive-result.syn.v1'&&result.source===env.GITHUB_SHA&&result.run===env.GITHUB_RUN_ID&&result.attempt===env.GITHUB_RUN_ATTEMPT);
+           assert(result.operationalReadiness===false&&result.completePackage===false&&result.PCoff===false);
+           const findRecord=(predicate)=>{const row=facts.rows.find(([k])=>typeof k==='string'&&predicate(k));assert(row);return JSON.parse(row[1]);};
+           const state=findRecord(k=>k==='afw.finite-initial-cleanup.v1:state');
+           const receipt=findRecord(k=>k.startsWith('afw.finite-owner-cleanup.v1:')&&k.endsWith(':receipt'));
+           const actions=native.notices.map(n=>n.action);
+           assert(actions.length===2&&actions[0]==='grant'&&actions[1]==='revoke');
+           const outcome={kind:'business',tap:tapCounts,source:env.GITHUB_SHA,run:env.GITHUB_RUN_ID,attempt:env.GITHUB_RUN_ATTEMPT,
+            I0:safeCount(plan.I0),C0:safeCount(plan.C0),C1:safeCount(plan.C1),ready:safeCount(recovery.ready),dbNow:safeCount(facts.dbNow),
+            alarmNull:facts.alarm===null,stateComplete:state.status==='complete',baselineRestored:result.restores===1&&result.pointer.versions[0].version_id===plan.baselineVersionId,
+            kvAliases:result.kvSemanticProof.bothAliases===true,receiptClosed:receipt.businessAccessClosed===true,
+            sdkReductionReturned:receipt.sdkReductionReturned===true,fence:!!native.fence.fenced_at,grantRevoked:!native.grant||!!native.grant.revoked_at,finalInventory:!!facts.finalInventoryProof,
+            completeNormal:safeCount(producer.completeNormal),referenceRows:safeCount(producer.referenceRows),referenceReadbacks:safeCount(producer.referenceReadbacks),
+            noticeCount:2,noticeActions:['grant','revoke'],sendHash:digest(receipt.sdkSendHash),observedHash:digest(receipt.sdkObservedHash),
+            operationalReadiness:false,completePackage:false,PCoff:false};
+           assert(outcome.C0===outcome.I0+900000&&outcome.C1===outcome.C0+180000&&outcome.ready<=outcome.C0-30000&&outcome.dbNow>=outcome.C0);
+           assert(outcome.alarmNull&&outcome.stateComplete&&outcome.baselineRestored&&outcome.kvAliases&&outcome.receiptClosed&&outcome.sdkReductionReturned&&outcome.fence&&outcome.grantRevoked&&outcome.finalInventory);
+           assert(outcome.completeNormal===1&&outcome.referenceRows===1&&outcome.referenceReadbacks>0);
+           verifyPositiveBudgetEpochInventory(result.diagnostics.epochs);
+           const records=[outcome],seen=new Set();
+           for(const e of result.diagnostics.epochs){
+            assert(['producer','consumer'].includes(e.segment)&&['QA','M'].includes(e.role));safeCount(e.epoch);
+            const key=e.segment+'|'+e.epoch+'|'+e.role;assert(!seen.has(key));seen.add(key);
+            const s=e.snapshot;assert(s.testRevision===env.GITHUB_SHA&&s.workerRole===e.role);
+            const metrics=verifyObservedBudgetMetrics(s);
+            const full=s.retention.traceComplete?verifyCompleteBudgetTrace(s):null;
+            assert(metrics.level==='observed_metrics'&&(!full||full.level==='complete_trace'));
+            const slot=v=>({retained:safeCount(v.retained),omitted:safeCount(v.omitted)});
+            records.push({kind:'epoch',segment:e.segment,role:e.role,epoch:e.epoch,
+             invalid:safeCount(s.coverage.invalid),unattributed:safeCount(s.coverage.unattributed),
+             numericOverflow:s.coverage.numericOverflow===true,scopesOmitted:safeCount(s.retention.scopeRows.omitted),
+             operations:slot(s.retention.operationRows),guards:slot(s.retention.guardRows),scopes:slot(s.retention.scopeRows),
+             traceComplete:s.retention.traceComplete===true,proofLevel:full?'complete_trace':'observed_metrics'});
+           }
+           const lines=records.map(row=>'AFW_SYN '+JSON.stringify(row));assert(lines.every(line=>Buffer.byteLength(line)<=2048));
+           for(const line of lines)console.log(line);
+          } catch { console.log('receipt_unavailable');process.exitCode=1; }
+          NODE
+      - name: Mark recovery stopped before the original consumer
+        if: failure() && steps.native_fixture.outcome == 'skipped'
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          echo evidence_not_preserved
+          exit 1
```

```diff
diff --git a/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md
# before_blob=faaf70bbab2ccb21319812413b4ff47e53f69738 after_blob=fbc552b95667f032034c45bceb8147789e6a01b4
--- a/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md
+++ b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md
@@ -2363,10 +2363,299 @@
 | test/fixtures/finite-budget-world.mjs | f654001b027555c41dbe3f287445e73ac849094b |
 | test/fixtures/finite-budget-evidence.mjs | 81178d96e10784366ab1b11bbf0805e347dea173 |
 | test/mcp-qa-finite-budget-native.test.mjs | d63f6e5752894ddc7d52f2430fa8f1fd1c07156a |
 | test/fixtures/finite-budget-descriptors.json | be695028e4c12c3cb7d3b7bf2c5f2e7508f3db15 |
 | test/fixtures/finite-checkpoint-custody.mjs | 9a486b839874ed8e9a950f6a823b18e7585de52e |
 | test/finite-checkpoint-custody.test.mjs | c913c94be080597704fbf7d370475443e1f1b96d |
 
 Terminal cleanup removes TEMP and appends only this section. Complete comparison to BASE requires 3,188 leaves, TEMP absent, this report alone changed and all other 3,187 BASE leaves exact. Main remains `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. The writer stops after cleanup readback; Root handles the separate fresh Task1 Spec+Quality gate. This qualification is not itself that review gate or Task1 completion.
 
 No local checkout/dependencies/build/test/runtime, real Cloudflare mutation, production credential, OAuth/OTP, cron, Container, customer/client action, mail, Chavo message, PR, merge, deployment or Task2 occurred. A SYN pass does not prove hosted receiver/subscription/notice/ACK/native withdrawal, permanent guard, production readiness or PC-off operation. operationalReadiness=false; completePackage=false; PCoff=false. STOP_WRITES.
+
+
+## Task1 fix round1/5 — five Important findings and bounded ordinary diagnostic — 2026-11-12 UTC
+
+Status: implementation and directed covering checks recorded; the five findings remain open for Root's scoped Spec+Quality review. Ordinary suite completion remains unverified. No Task1 acceptance, Task2, new native qualification or readiness claim.
+
+Authority: [five verbatim review findings](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e284548c6ac6df533c425cf249d7cd100d80804c/docs/superpowers/reviews/2026-11-12-finite-budget-task1-review.es.md), [final round1 brief including timeout and checkout-context rulings](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/4e6f3b826abe04c039d1d9136d2349b6cbe2c5af/docs/superpowers/briefs/2026-11-12-finite-budget-task1-fix-round1.md), blob `46787c625c8711c15544d6bd048731fea1c0af1a`. The dated addenda supersede the earlier immediate-repeat-npm/inactive-candidate instructions. FIX_BASE `eaf019aa872709d867aac53d9684ecdf1c21d013`, tree `0e6c789011d32f46e0b6542a7b7e8f3776fd7942`, 3,188 leaves, report prefix `faaf70bbab2ccb21319812413b4ff47e53f69738`. Global Task1 BASE remains `29681cae2bf1094ec5c66d5b2784254f77bec697`.
+
+All work used remote GitHub connector commits/CAS and GitHub-hosted Actions; no local checkout, dependency install, build, test, model or persistent process. The same implementer remained sole Source writer. No helper agent, reviewer, production change, secret value read, owner intervention, browser, OAuth/OTP, Cloudflare operation, mail, Chavo message, PR, merge or deployment.
+
+### Causal tests and implementation
+
+The original eight Q identities and their earlier controls remain. New cases are independent across Q1/Q3/Q5/Q6/Q8. No native fixture construction, qualification I0 or SDK lifecycle is opened by these focused cases.
+
+| Finding | Regression and actual command | Minimal implementation / covering result |
+| --- | --- | --- |
+| R1 optional file breaks ordinary entrypoint | Q1 directly loads `node test/mcp-qa-finite-budget-native.test.mjs` in a bounded child, removing only child AFW_BUDGET_GROUP and NODE_TEST_CONTEXT. On baseline default exit1, it first requires stderr to contain exactly `SYN budget group unsupported before I0`, then fails the expected-default0 assertion `R1 optional qualification inactive in ordinary command`. Explicit empty/unknown modes must reject1 with the same literal; no recognized opt-in mode is launched. | Guard rejects explicit unsupported values while undefined leaves the optional file inactive. Red/positive registrations and all original P1 assertions remain. Final covering Q1 PASS includes default0, no R0/P1 registration and unknown-mode rejection controls. This focused load is distinct from whole-project npm coverage. |
+| R2 inconsistent scope/group/global peaks | Q6 uses a real collector with two sequential operations/maxRows1; its correct truncated sample passes. Independent mutations of scope peak2/global1, group peak2/global1 and global2/sole scope+group1 each wrongly pass baseline. A second real three-operation/two-scope/two-group sample has each partition member peak1; global3 wrongly passes baseline. All four rejection booleans are evaluated before the assertion `R2 scope group and global peak reconciliation`. | For EACH independent full partition, max(part.peak) <= global.peak <= sum(part.peak). A member containing all nativeStarted must have the global peak. No arbitrary cross-comparison of a scope with a group. Existing prefix bounds and full reconstruction remain. Final covering Q6 PASS accepts both correct samples and rejects all four mutations. |
+| R3 pending promise falsely fulfilled | Q5 uses runtime.member on an actual pending Promise with an own then accessor, preserving receiver/argument/result and one native call. Getter count stays0. Baseline certifies fulfillment; assertion `R3 uninspectable pending Promise remains unsettled` expects pending/settled0/active1/incomplete. | passiveThen distinguishes no-then synchronous values from unobservable descriptors. Unobservable values mark incompleteness without settlement or fake rejection; the actual result/promise is returned. Both passiveThen consumers handle the distinction. Final covering Q5 PASS checks active/settled truth, getters0, normal data-method Promise and genuinely synchronous value controls, existing error/identity/phase/callback controls, plus observeBudgetPromise incompleteness. |
+| R4 missing empty epoch accepted | Q3 parses the actual P1 callback and executes its actual epoch-check statements with real evidence verifiers and collector-generated MODELED snapshots covering both roles/all twelve phases. It does not import a missing API as RED or stub metric verifiers. Baseline accepts all8 then wrongly accepts7 after removing only empty consumer/M/0; assertion `R4 missing empty consumer epoch rejected` fails. | Shared Node-only verifyPositiveBudgetEpochInventory enforces the exact eight identities, including empty captures, and is called by P1. After the source-fidelity correction below, it closes the real SIX data fields segment/epoch/role/reason/capturedAt/snapshot, validates reason string and nonnegative safe-integer capturedAt, and rejects missing/extra/duplicate/malformed entries. Per-snapshot Source/role and metric verification remain. Final covering Q3 PASS also rejects wrong snapshot Source/role and malformed metadata. Full9 projection wiring is deliberately deferred by the latest STOP ruling; no inactive candidate was prepared. |
+| R5 byteLength business getters invoked | Q8 observes actual native reads returning an ArrayBuffer, Uint8Array chunk and DataView chunk with own byteLength getters; two getters throw and one lies. Original promises/results and one call per case remain. Assertion `R5 byte lengths bypass own business getters` fails on baseline. | Captured ArrayBuffer/%TypedArray%/DataView byteLength intrinsics obtain recognized byte lengths without own getters. Unavailable lengths remain null; EOF zero semantics, read/fetch/cancel links and settlement remain. Final covering Q8 PASS: getter calls0, actual bytes7/5/3, fulfilled/settled1/active0/invalid0 for each case. |
+
+The runtime retains the two ordinary strict-callback trampolines, same-Root phase overlay, weak identity stores and original record caps. Compiler/world, fixed selector/reader maps, descriptors and custody code/tests were not changed.
+
+### Initial RED harness corrections, then accepted RED
+
+[RED1 43140111119/1, job130924770320](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43140111119/job/130924770320), Source `96fffacd23525a0c3be66ce5dce071ba0035b6a0`, had8Q/3pass/5fail. Q1 was NOT causal: nested node --test inherited NODE_TEST_CONTEXT and the unknown-mode probe was unreliable. Four other markers were causal; result.valid=false. Only safe result+manifest (two files) were published. This is not an accepted complete RED.
+
+[RED2 43140336358/1, job130925513376](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43140336358/job/130925513376), Source `15df40fb488660c6510b4d55866320b3cb577c7f`, switched to direct Node loading and added R2's upper-bound control. It had8Q/3pass/5 expected markers, but Q1 did not yet verify the child's stderr cause. That test-only push occurred before Root's wait-for-new-ref message arrived; this chronology was disclosed immediately. No runtime/evidence/native.test implementation had changed. Root required one final corrected RED rather than inferring causality from exit1.
+
+[Accepted RED 43141085705/1, job130927960494](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43141085705/job/130927960494), Source `ca6a776be0be5289f7891533061520f743808beb`, tree `0dd3bf4cc40b9c0f507c6aeb96e25098e077afb8`, test `a1cd2da044c39870b57db1aacf9bdc5486a47762`, verified the corrected child environment and exact before-I0 guard literal before the intended R1 failure. Runtime/evidence/native.test remained FIX_BASE. Command `node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs`: exit1,8tests/3pass/5fail,0cancelled/skipped/todo; exactly Q1/Q3/Q5/Q6/Q8, all ERR_ASSERTION with the five fixed markers. No unrelated setup failure was accepted.
+
+[Initial covering 43141464770/1, pure job130929201063](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43141464770/job/130929201063), Source `1c7c4d191b3eb03a0d74882af7d87fde07076a18`, tree `e6bd7574668e9820ca41728fca738603886fac92`, retained that exact RED test blob and passed8Q, four-file syntax/lint and source-bound176/130/635/54 preflight. It did not expose the new four-field R4 mistake; this covering evidence is superseded for the delivered helper.
+
+The literal ordinary `env -u AFW_BUDGET_GROUP npm test` in job130929409824 of that same run was CANCELLED at the20-minute outer job cap (job02:27:27–02:47:34UTC; command did not finish). No summary, counts, named failures or ordinary artifact were produced. Raw stdout redirected into runner.temp was lost with the runner; seal/upload/readbacks were SKIPPED. This preservation gap is acknowledged; no test PASS/failure/root-cause inference is made. That run used checkoutdepth1; established CI uses depth0 for pinned-revision provenance tests. This difference is factual, NOT a demonstrated cause of cancellation.
+
+### R4 source-fidelity regression and final directed covering
+
+Root found that unchanged world capture emits SIX fields at world:676: segment,epoch,role,reason,capturedAt,snapshot; the first helper incorrectly closed four. Focused read of FIX_BASE world655–685 confirmed the actual pinned capture shape, blob `f654001b027555c41dbe3f287445e73ac849094b`. World was not changed.
+
+[Source-faithful RED 43144954855/1, job130940498190](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43144954855/job/130940498190), Source `985a75812f514454c1cfa476e2f9779eda2283fa`, tree `3cb4e50453b6e32e7d8076e970dab7f0cfe9b540`, test `5ae2d79aa657a5bdf71d11c2e764d4fa23f749ef`, changed only the test/TEMP. MODELED reason/time now match the actual six-field wrapper. Command above:8Q/7pass/1fail, exit1,0cancelled/skipped/todo; only Q3 ERR_ASSERTION `R4 source-faithful six-field captures accepted`, caused by rejection of the valid full8 set. Current helper was still the four-field implementation.
+
+[Final directed GREEN 43145051926/1, job130940814217](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43145051926/job/130940814217), Source `f6ab4f01c0b867703477fc836424a5e02cc04c40`, tree `48f28e37082bc84693cb56af98ed40e562d27fd2`, retained the exact source-faithful RED test blob.8Q/8pass/0fail/cancelled/skipped/todo, exit0. Commands: node --check and eslint on diagnostics runtime, evidence, pure test and native test; strict compile-only preflight then independently checked actual Source/run/attempt,176role inputs,130fixed paths,635groups,54unique reader sites, I0Opened=false/nativeExecutionProduced=false. All PASS. No custody-nine or full900s/P1 was run in this round.
+
+### One bounded reporter-only ordinary diagnostic
+
+The latest rulings authorize this new diagnostic evidence, not an identical replay of the failed20-minute npm command. [Run43145877512/1, job130943429694](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43145877512/job/130943429694), Source `d1b3a78eec70ae20a3fe17ed9500e3df3e4f3c86`, tree `c96ca3251adaa3bb89b738ec045bd0bfb011edc7`, TEMP `1444381a86f8e9e94937da1ab56647f0432fe73a`. Only TEMP changed from final directed GREEN; code was frozen. Exact Source checkout, persist-credentials:false, fetch-depth:0 matching established CI, Node22.23.4/current lock, contents:read/actions:read, attempt1/self-path push, no secrets/environment.
+
+Package script was verified as `node --test --test-reporter=spec test/*.test.mjs`. The actual diagnostic expanded the SAME shell glob/order (725files), preserved default concurrency/isolation and UNSET group, and added only ordered custom-reporter/destination options alongside spec:
+
+```text
+node --test --test-reporter=spec --test-reporter=<temporary-safe-reporter> --test-reporter-destination=<private-spec> --test-reporter-destination=<safe-progress> test/*.test.mjs
+```
+
+This is a REPORTER-INSTRUMENTED EQUIVALENT, not literal npm test and never npm PASS. The reporter/wrapper existed only under fixed runner.temp paths, embedded in TEMP; no tracked helper was added. It uses the official [Node custom/multiple reporter API](https://nodejs.org/download/release/latest-jod/docs/api/test.html#custom-reporters). Only dequeue/complete/summary events, finite numeric counts, fixed enums, Source/run/attempt, UTC/elapsed time, allowlisted checked-out test-file paths/line/column/nesting and whitelisted ERR_* codes are projected. No titles, messages, stacks, actual/expected, native state, environment values or raw stdout/stderr are published. Per-file latest lifecycle and counts are bounded by the exact725-file allowlist; absent cumulative totals stay null.
+
+Reporter plumbing passed BEFORE the full diagnostic: three ephemeral synthetic pass/fail/hang cases; pass1/fail1/hang1, canaryEmitted=0, partialPreserved=1. The hang case proved safe progress survived its internal deadline. This is reporter validation, not AFW coverage. The full command had an8-minute internal deadline and a12-minute job deadline. Only the runner-owned process group received SIGTERM then bounded SIGKILL after5seconds. Safe progress was emitted every15seconds, while checkpoint state was updated separately.
+
+**Terminal diagnostic status: timeout / partial, job FAILURE.** Internal deadline480,000ms; observed wrapper elapsed485,023ms; child exit1; NO global summary (`totals:null`). Event counters at preservation: dequeued3,727; completed3,723; passed3,682; failed41; skipped1; todo0; summaries408. These are PARTIAL EVENT COUNTERS (including execution-level records), not final test/suite totals or a complete named failure inventory.417files had started and408had summaries in the last breadcrumb. No root cause is assigned to the41 failed completion events; per-file counts/codes/latest positions are in the safe progress.json. A file's latest position is not necessarily its earlier failure location.
+
+Last pending positions exposed by the bounded breadcrumb:
+- test/mcp-qa-finite-first-connection-publication-native.test.mjs:201:119
+- test/mcp-qa-finite-initial-capsule-native.test.mjs:1:1
+- test/mcp-qa-finite-initial-cleanup-native.test.mjs:1:1
+
+They indicate observed dequeue state, not proven deadlock/failure causes. No unrelated code was diagnosed or repaired; no diagnostic, npm, native qualification or full9 was repeated.
+
+Raw spec stdout stayed private:400,800bytes, SHA-256 `57cb9ab9d3e9bf72ba6d843fd7284467e8a9285688f48fc7ae9cb4513095034b`. Private stderr:0bytes, SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`. Safe reporter stream:216,593bytes, SHA-256 `263bd04356a8a0f52d698c8268348f6ce152573b487aafd2aa87b96968484488`. Only bytes/hashes of raw logs are public; raw logs were not uploaded. The safe artifact contains result.json, progress.json, plumbing.json, plumbing-progress.json and budget-artifact.json.
+
+Command failure had continue-on-error, so its step conclusion success does NOT mean test success; the wrapper returned1/status timeout. Separate always preservation, seal/upload, exact-ID download/verification all succeeded before the final required-pass gate correctly failed. No waiver or forced green.
+
+### Safe artifacts and readbacks
+
+| Evidence | Artifact ID | ZIP bytes | ZIP SHA-256 | Expiry UTC |
+| --- | --- | --- | --- | --- |
+| RED1 | [13909665579](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43140111119/artifacts/13909665579) | 828 | `e55c87ac31a18a0ceb18fd1370bb34d25b2eec0d8de1789dd9cba73a79917c1f` | 2026-11-19T02:15:47Z |
+| RED2 | [13909616186](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43140336358/artifacts/13909616186) | 2543 | `432119b6b3ecafcd58522912e1b52cd03e36496bb63848b3d85d4b4388ef7b20` | 2026-11-19T02:17:38Z |
+| accepted RED | [13909612479](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43141085705/artifacts/13909612479) | 2542 | `71e0fd305f8bbe5a4e60b8837ba88ef97c442c3bccbe23f5b2d14a7950292c31` | 2026-11-19T02:24:07Z |
+| initial covering | [13910245453](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43141464770/artifacts/13910245453) | 1542 | `7f9103497fcbe37d3bbe0368297c2b33947726ec4e4a46b23150cf49fc0fc346` | 2026-11-19T02:27:20Z |
+| R4 fidelity RED | [13911003211](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43144954855/artifacts/13911003211) | 2052 | `5ffb8c2591df07c79b324bbe515f4a10a1f07a3dbddb968633e84cd2676e342d` | 2026-11-19T02:58:12Z |
+| final covering GREEN | [13910354300](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43145051926/artifacts/13910354300) | 1548 | `5226375c90c056be04a23e706df40fa46430add05f9ae0b684821c1d649bd00f` | 2026-11-19T02:59:29Z |
+| ordinary diagnostic | [13912410675](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43145877512/artifacts/13912410675) | 15131 | `80ae692fd89d9aceafbcef356b0a201a9aec1504c4692da33fa02bdb809c5f2a` | 2026-11-19T03:14:46Z |
+
+Every listed safe artifact had exact same-ID download/inventory/hash verification, with seven-day retention. All used the first GET; no retrieval retries were required in this round. RED1 contains only result+manifest (2files); accepted RED/covering artifacts contain tests.tap/result.json/budget-artifact.json (3files). Diagnostic5-file manifest:864bytes, SHA-256 `ac8fbd55ca759633e66eded3557fe0c49536a2bf8584832a16f5b4a3ed062ae0`; same-ID readback at03:14:50UTC PASS. Original source/run/attempt are preserved in each manifest/result.
+
+All scripts ran Node22.23.4 on Ubuntu24.04. Platform warning: reused actions targeting Node20 were forced to Node24; this was not the script/fixture Node version. No warning is promoted to a test verdict.
+
+### Delivered code, scope and remaining gate
+
+| Changed code path | Final blob |
+| --- | --- |
+| test/finite-budget-diagnostics.test.mjs | 5ae2d79aa657a5bdf71d11c2e764d4fa23f749ef |
+| test/fixtures/finite-budget-diagnostics.mjs | 2e911fd4e9d2287da687bef9b0389fbec48a5114 |
+| test/fixtures/finite-budget-evidence.mjs | 0d95b1616a167f7f089e3a8ca59ca9628aa8aaa9 |
+| test/mcp-qa-finite-budget-native.test.mjs | 082340b6ede2a252a8602721ec19063cc68fafc8 |
+
+All other code blobs are exact FIX_BASE, including compiler/world, descriptors, custody helper/test, lib/worker/SDK/package/lock/config/compatibility. The delivered cleanup retires active TEMP and appends only this report section:3,188leaves; precisely these four code paths plus this report differ from FIX_BASE;3,183other BASE leaves exact. No inactive full9 candidate is prepared, per latest ruling. Main freshly verified unchanged `0c9c475b3ebaa970fc11d628b40e50a90cceb727`.
+
+Root next decides from the preserved ordinary partial evidence and conducts the scoped review of five findings/new breakage. All five Important remain open pending that verdict. Ordinary full-suite completion and current-source native qualification remain unverified; historical baef full9 remains its own valid dated SYN evidence. No intervention is requested from Gabriel. No further writer action after cleanup readback: STOP_WRITES.
+
+operationalReadiness=false; completePackage=false; PCoff=false.
+
+
+## Task1 round1 — first four-file A/B classification, INCONCLUSIVE — 2026-11-12 UTC
+
+The [Root A/B ruling and subsequent recorder-correction ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/78937357cf5715a166bf48e6592fccbcfab71ca7/docs/superpowers/briefs/2026-11-12-finite-budget-task1-fix-round1.md) preserve this run as historical inconclusive evidence. Scope of this sub-block: TEMP plus append-only report only; all delivered code frozen. No ordinary/broad replay, pending native fixture,900s/P1, unrelated correction, production/credential/owner action or subagent.
+
+Workflow Source `41b7cefae63c5ba335ad846f4f3eb32bf47e27d7`, tree `341a9442e0e2f052ec9b013d746fe62f58159d14`, TEMP `672a5ed9fd0281eff42d97542708285e516423fd`, parent delivered `f5f52660d19ec9fc634bbc49558db75582fdaf88`. This workflow Source is DISTINCT from each actual test checkout. Both jobs verified git rev-parse HEAD, full history, persist-credentials:false, Node22.23.4/Ubuntu24.04 and identical package.json/blob `f4fd38ac380c46a149d8cf0f3bd828a28406f761` plus lock/blob `36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b`. Child GITHUB_SHA truthfully equaled its actual checkout; workflowSource and A/B side were preserved separately in payloads. Historical refs were only read, never reset/published.
+
+Exactly four existing files, same order/default concurrency/isolation, group UNSET:
+- test/mcp-own-finite-entrypoints.test.mjs
+- test/mcp-qa-cloud-native-cli.test.mjs
+- test/mcp-qa-finite-adoption-wait.test.mjs
+- test/mcp-qa-finite-command.test.mjs
+
+This is FOUR-FILE reporter-instrumented diagnostics, not the whole ordinary suite or literal npm test. The two jobs ran independently with fail-fast:false,120-second command deadline, bounded5-second process-group escalation and7-minute job deadline. Reporter pass/fail/hang/canary plumbing passed on both sides before comparison. No expected-failure assertion forced identical results.
+
+| Side / actual test Source | Job in run43148329682/1 | Terminal observation |
+| --- | --- | --- |
+| A / FIX_BASE `eaf019aa872709d867aac53d9684ecdf1c21d013` | [130951329493](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43148329682/job/130951329493) | timeout;125,030ms; child exit null; dequeued5/completed1/passed0/failed1; no per-file/global summaries |
+| B / delivered `f5f52660d19ec9fc634bbc49558db75582fdaf88` | [130951329761](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43148329682/job/130951329761) | timeout;125,027ms; child exit null; dequeued4/completed1/passed0/failed1; no per-file/global summaries |
+
+Both have totals:null, skipped0/todo0. These are partial EVENT counts, not final test totals. Both workflow jobs correctly failed the complete-classification gate after preserving their partial results. The test-command step's success conclusion under continue-on-error does NOT mean test success.
+
+Only ONE preserved failure identity matches across A/B:
+`test/mcp-qa-finite-adoption-wait.test.mjs:1:1`, nesting0, testNumber3, code ERR_TEST_FAILURE, message SHA-256 `2512eeb638b3d8f4c36bea8feb2c71ea9829e6f73be08d61a92f8924f439f236`, repository frames empty. This is a file-wrapper failure, not a complete matched inventory of the36 failed tests previously seen in four completed summaries. The A/B does NOT establish that those36 failures predate this fix round. A's latest pending entrypoint position was10:1; B had the same pending position. Other pending/unseen files and absent summaries remain explicit in safe progress.json. No test deadlock or failure cause is inferred.
+
+Both raw spec files were255bytes, SHA-256 `ffbd57338ff26d106300ed7df87d93ec97ab0ede163f916309944795d2e4f13b`; stderr0bytes/empty SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`. Raw output was not uploaded or printed. Safe reporter streams: A785bytes/SHA `57e6b1327bd8d2d000e7e1f2837e70e0114478f969ade1dee57a00d1cbb3648b`; B784bytes/SHA `15169cb862cb7400f0b1d9c96be930de304bd09dac57e169213f5f627df476eb`.
+
+| Side | Safe artifact | ZIP bytes | ZIP SHA-256 | Expiry UTC |
+| --- | --- | --- | --- | --- |
+| A | [13911894951](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43148329682/artifacts/13911894951) | 2931 | `40df89b157235d6bba34fb6251799a5fb88be2ce16531a5b56943aebf5d56c6d` | 2026-11-19T03:30:07Z |
+| B | [13912377834](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43148329682/artifacts/13912377834) | 2949 | `d70158f85717a8945e79f1a4e269b1d24d6ef7e60d15483cca2cba68ffbb46fc` | 2026-11-19T03:30:03Z |
+
+Both five-file bundles passed exact-ID inventory/hash verification. A GET1 could not yet find the provided artifact ID; the existing2-second wait and GET2 succeeded at03:30:12UTC. A GET3 was skipped. B GET1 succeeded at03:30:05UTC; later attempts/waits skipped. A manifest863bytes/SHA `d32b4b6e86205480a1320f88845994aa2aba37f57c050291586aaf35e2752f0b`; B manifest863bytes/SHA `9a75925dce7a031578b1294d5047dbdb2ea5f79ad6235c669d418e63931ad231`. Manifest source is the actual historical test Source, while result/progress separately preserve workflow Source. No ambiguous latest/name selection or waived readback.
+
+Recorder limitation found by Root: the optional failureDetails enrichment scanned an entire stack with an unanchored regex and lacked a length/line bound. The first small canary did not exercise giant data:base64 frames. This is a static correctness risk in the NEW temporary diagnostic recorder; stopped progress after the first failure is consistent with it but does not prove the actual prior stack payload or exact cause. No internal extraction-entry marker was recorded. No raw stack was inspected/published and no core code defect is inferred from this instrumentation risk. Root separately authorized one conservative recorder repair/control and one corrected A/B; this run is not erased or relabeled.
+
+Checkpoint cleanup retires this TEMP and appends only this section. Relative to delivered f5f, report alone changes;3,188leaves and3,187other blobs exact, including the four corrected core blobs. Main remains `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. The five original Important findings, integration ordinary-suite debt and current-source native qualification remain OPEN. Any subsequent recorder work follows the separately pinned03:33 ruling, not an automatic retry of this run.
+
+operationalReadiness=false; completePackage=false; PCoff=false.
+
+
+## Task1 round1 — recorder omission control and corrected four-file A/B — 2026-11-12 UTC
+
+Outcome: the corrected A/B completed and reproduced the SAME36failed tests under matched setup at FIX_BASEeaf and deliveredf5. This establishes that these four-file failures predate THIS fix round in that setup. It does NOT establish that they predate Task1, identify their root cause, approve the whole ordinary suite or waive its integration gate. The five original Important findings remain open for scoped review. Historical inconclusive A/B43148329682/1 is preserved above without rewriting its outcome.
+
+Authority: [Root03:33 recorder-correction ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/78937357cf5715a166bf48e6592fccbcfab71ca7/docs/superpowers/briefs/2026-11-12-finite-budget-task1-fix-round1.md), blob `708b0ea58ac92eca0c9ab38bf1b92c560973e72f`. Sub-block scope remains TEMP plus append-only report only. All four delivered core code blobs, production/lib/worker/SDK/package/lock/config/compatibility/compiler/world/descriptor/custody code stayed exact delivered f5. No broad suite, pending native fixture,900s/P1, Task2, source-code repair, owner/credential/provider/browser/mail action, subagent or reviewer was started.
+
+The historical inconclusive A/B checkpoint was independently preserved first: Source `4fa63c8714d7818cd671dad9f80e87df059c4ea2`, tree `ed027133eacca328e7ffcc8181961795a95970a3`, append-only report `10e8dd88121dfdc8ef1df2b0a094151008303064`, TEMP absent/3,188leaves. This separates the new authorized recorder test from an automatic replay.
+
+### Pure MODELED recorder control
+
+The NEW reporter completely omits stack/esbuild errors/locations; it does not read or process stack or errors at all. Failures retain only event identities(file,line,column,nesting,testNumber), whitelisted codes and own-data message hashes for strings<=1MiB. Larger/unobservable messages retain null rather than payload; oversized messages set messageTooLarge=1. No runtime titles/messages/stacks/actual/expected are printed.
+
+Before the corrected A/B, each pinned job performed a short ephemeral pure recorder control, with no AFW fixture/native/I0. It constructed the SAME failed MODELED event with a1,048,779-byte data:base64 stack, canary, oversized own-data message and known source location. Event SHA-256 `0de032a11e9a02454239c825c541a0a17024400c9553f04d6c0a260230e2fa21` matched across old/new/guarded probes and both jobs.
+
+The old reporter was extracted verbatim from the quoted AFW_REPORTER heredoc in git object `41b7cefae63c5ba335ad846f4f3eb32bf47e27d7:.github/workflows/afw-finite-budget-qualification.yml`; workflow blob `672a5ed9fd0281eff42d97542708285e516423fd` was checked by git hash-object. No reimplemented regex stood in for it. Old module SHA-256 `8d3150d71567498882e8f44072d1e3f820da96a365d210541809a2b0c4a505db`; new module SHA-256 `c444d4be9943c6f749def5d596663e13826eafdc5cfb5979c0512b1dae42daf3`.
+
+| Probe | A observed wall time | B observed wall time | Actual result |
+| --- | --- | --- | --- |
+| exact old module, configured1,000ms child deadline | 1,005ms | 1,004ms | timeout/SIGKILL at the configured boundary; stdout/stderr0bytes |
+| new module, configured3,000ms deadline | 49ms | 45ms | completed/exit0; safe event identity retained |
+| new module with guarded stack/errors accessors and descriptor traps | 47ms | 41ms | completed/exit0; every stack/errors probe/getter counter0 |
+
+The few milliseconds above the old configured deadline include process termination/reaping overhead. The control did not require an old timeout to pass; it would have reported normal completion honestly. Here the actual timeout reproduces a MODELED risk of the old diagnostic enrichment, not proof of the unknown actual stack content/cause in the previous A/B. New controls preserved the known file:10:1/code identity, canaryEmitted0, stackProbes0/errorsProbes0/stackGetterCalls0/errorsGetterCalls0; oversized message projection was null+messageTooLarge1. Original ephemeral pass/fail/hang/canary plumbing also passed on both sides before AFW comparison. No modeled payload, recorder script, canary, raw stack or raw control log was uploaded; only safe control status, numeric facts and hashes.
+
+### Exact sources and matched four-file execution
+
+Workflow Source `7fe2f275a0a0d43c9cb117d756c85836529cacc0`, tree `24bb8ddb5d3e46bd5faae45488006bd28f879fea`, TEMP `f36a4a55bf0ba4fd346ad18a0c33f10ea83a29a1`. This workflow version contains only temporary recorder/plumbing changes relative to the earlier cleanup checkpoint. It is separate from the historical test sources:
+
+| Side | Actual test checkout / child GITHUB_SHA | Job in run43149728253/1 | Test result / outer command elapsed |
+| --- | --- | --- | --- |
+| A | `eaf019aa872709d867aac53d9684ecdf1c21d013` | [130955809154](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43149728253/job/130955809154) | failed/exit1;12,208ms |
+| B | `f5f52660d19ec9fc634bbc49558db75582fdaf88` | [130955808671](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43149728253/job/130955808671) | failed/exit1;9,933ms |
+
+Both completed within the unchanged120-second command /7-minute job limits; no escalation was needed for the actual four-file commands. Node test summary duration was1,511.379925ms(A)/1,364.251877ms(B), distinct from outer process/reporter/log completion time. Workflow/job conclusions SUCCESS mean classification, control and preservation succeeded; they do NOT mean the tests passed. The command's continue-on-error conclusion does not hide its explicit failed/exit1 result.
+
+Both jobs independently checked exact git HEAD, full history/persist-credentials:false, Node22.23.4/Ubuntu24.04, group UNSET, package.json `f4fd38ac380c46a149d8cf0f3bd828a28406f761` and lock `36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b`. Child GITHUB_SHA matched the historical checkout; original workflowSource and side were separately recorded. No historical ref was moved or source code changed.
+
+Actual command on each checkout (same explicit files/order/default concurrency/isolation, spec plus safe reporter):
+```text
+node --test --test-reporter=spec --test-reporter=<temporary-safe-reporter> --test-reporter-destination=<private-spec> --test-reporter-destination=<safe-progress> test/mcp-own-finite-entrypoints.test.mjs test/mcp-qa-cloud-native-cli.test.mjs test/mcp-qa-finite-adoption-wait.test.mjs test/mcp-qa-finite-command.test.mjs
+```
+This is matched FOUR-FILE reporter diagnostics, not a filtered claim that npm/the whole ordinary suite is green.
+
+### Complete comparison
+
+Both global summaries:109tests,73passed,36failed,0suites/cancelled/skipped/todo; topLevel109, success0. Per-file counts below are identical on both sides:
+
+| File | Tests | Passed | Failed |
+| --- | --- | --- | --- |
+| test/mcp-own-finite-entrypoints.test.mjs | 2 | 0 | 2 |
+| test/mcp-qa-cloud-native-cli.test.mjs | 70 | 58 | 12 |
+| test/mcp-qa-finite-adoption-wait.test.mjs | 20 | 0 | 20 |
+| test/mcp-qa-finite-command.test.mjs | 17 | 15 | 2 |
+
+There are113 dequeue/complete records, with40failed completion events =36failed tests plus4failed file wrappers. This is why40events must not be reported as40failed tests. All four per-file and one global summary are present; no failure records were omitted.
+
+A/B comparison used MULTISETS, preserving repeated occurrences. It compared file/line/column/nesting/testNumber/code identities, and then the same identities plus messageHashes/messageTooLarge; both comparisons are exactly equal. Only Source/workflow/side/run context and execution timing are excluded from failure identity; testNumber remains included. All actual failure messageTooLarge flags were0; hashes remained valid bounded message digests. No stack content was read. The common grouped event identities, including wrappers at1:1, are:
+
+| Failure file:line:column | Multiplicity per side | Whitelisted codes |
+| --- | --- | --- |
+| test/mcp-own-finite-entrypoints.test.mjs:1:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-own-finite-entrypoints.test.mjs:10:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-own-finite-entrypoints.test.mjs:19:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-cloud-native-cli.test.mjs:1:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-cloud-native-cli.test.mjs:93:1 | 1 | ERR_TEST_FAILURE, ERR_ASSERTION |
+| test/mcp-qa-cloud-native-cli.test.mjs:99:43 | 2 | ERR_TEST_FAILURE, ERR_ASSERTION |
+| test/mcp-qa-cloud-native-cli.test.mjs:108:27 | 6 | ERR_TEST_FAILURE, ERR_ASSERTION |
+| test/mcp-qa-cloud-native-cli.test.mjs:111:1 | 1 | ERR_TEST_FAILURE, ERR_ASSERTION |
+| test/mcp-qa-cloud-native-cli.test.mjs:124:58 | 2 | ERR_TEST_FAILURE, ERR_ASSERTION |
+| test/mcp-qa-finite-adoption-wait.test.mjs:1:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-adoption-wait.test.mjs:38:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-adoption-wait.test.mjs:41:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-adoption-wait.test.mjs:42:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-adoption-wait.test.mjs:43:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-adoption-wait.test.mjs:44:172 | 12 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-adoption-wait.test.mjs:46:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-adoption-wait.test.mjs:47:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-adoption-wait.test.mjs:49:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-adoption-wait.test.mjs:51:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-command.test.mjs:1:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-command.test.mjs:33:1 | 1 | ERR_TEST_FAILURE |
+| test/mcp-qa-finite-command.test.mjs:53:1 | 1 | ERR_TEST_FAILURE |
+
+Safe progress.json and primary AFW_AB_FAILURE projections retain every individual closed identity/message hash, with no raw names/messages/stacks. Matching results demonstrate the failures already occur at FIX_BASEeaf under this matched setup, not merely that their direct files were unchanged. They do not locate the cause, establish Task1-global provenance, classify the pending native failures or complete the integration ordinary-suite gate.
+
+### Preserved artifacts and scope
+
+| Side | Safe artifact | ZIP bytes | ZIP SHA-256 | Expiry UTC |
+| --- | --- | --- | --- | --- |
+| A | [13912694932](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43149728253/artifacts/13912694932) | 4970 | `a03d248162db898cf5013c4487a3d3dc557824d8b6d4f008aa02d5e4d14cf047` | 2026-11-19T03:40:58Z |
+| B | [13913695034](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43149728253/artifacts/13913695034) | 4978 | `31be4c09fb8cd970246d27934905f04e3d285447313976fef86625d6b7953e21` | 2026-11-19T03:40:51Z |
+
+Both seven-file bundles contain result.json, progress.json, plumbing.json, plumbing-progress.json, recorder-control.json, recorder-control-status.json and budget-artifact.json. Both exact-ID GET1/inventory/hash readbacks passed; later attempts/waits were skipped. A manifest1,182bytes/SHA `768ef77d6ea2776ac27d04315a20dbbe0f3820782684a2963168c7ba090164b9`; B manifest1,182bytes/SHA `69d32f372572ec57861761ec3e3cc701537042748601d0e37bbb64e771ef3e3b`. Original actual test Source/run/attempt/kind were checked; payloads separately bind workflow Source/side.
+
+Raw spec stayed private: A33,809,117bytes/SHA `f9e1077e96043469c88bdf18663d5b6b1bc7fbd61f7fddc390eec27511064f7c`; B33,809,099bytes/SHA `ca05d6569d56933add0d956f92905f78681d3ffbd5536a5c1b3746fa8f3ed81f`. Stderr0bytes/empty SHA on both. Only bytes/hashes were public; no raw log was uploaded or read to infer a cause. Platform Node20-actions-forced-to24 warning remains unrelated to the actual Node22.23.4 test processes.
+
+Cleanup retires TEMP and appends only this section. Relative to delivered f5, report alone differs;3,188leaves/3,187other blobs remain exact, including all four corrected core code blobs. Main freshly checked `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. No inactive full9 candidate is prepared. No further test, recorder iteration, npm/broad/native run or unrelated repair follows automatically.
+
+The writer returns STOP_WRITES after cleanup readback for Root's decision. The five Important findings remain open until scoped review; ordinary-suite integration debt and current-source native qualification remain OPEN, not waived. operationalReadiness=false; completePackage=false; PCoff=false.
+
+
+## Task1 round1 — inactive full9 projection candidate for scoped review — 2026-11-12 UTC
+
+The [Root03:43 classification/inactive-candidate ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d39668827a2b96490d517d44f210a6eefe39da05/docs/superpowers/briefs/2026-11-12-finite-budget-task1-fix-round1.md), blob `d4d241eea70f5fa059fed303495bd4cff655f5de`, accepts the matched four-file classification and releases ONLY this inert candidate. The [metadata-only parser ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/01ed8e81709a8d9779bdda9dc759c8bc9b789c63/docs/superpowers/briefs/2026-11-12-finite-budget-task1-fix-round1.md), blob `4585318aeb235cce4c2f19548237c6447fe9f3e8`, authorizes the small RAM-only YAML format check. No activation, test replay, new native clock or runtime action is authorized.
+
+Completed A/B evidence was preserved and read back BEFORE staging this candidate: cleanup Source `6248c62dc01d56661d3f0791dc2a2cf8ce4e2761`, tree `4e365aef0b063709ec0036259f10f861e59842ce`, report `89b56880eb740642898e3bd87d1313da62ff7525`, TEMP absent. The original inconclusive comparison and the corrected comparison/control both remain in this append-only history. Root independently confirmed equality including testNumber, codes, message hashes and tooLarge flags across all40event identities.
+
+### Exact inactive candidate and allowed delta
+
+Path: .github/workflows/afw-finite-budget-qualification.yml  
+Candidate blob: `6f48afaaf998abc9a120410a10cfca27b1afed87` (48,724characters/911lines).
+
+Freshly read executed baef template: Source `baef10ca4b50321bd4c19f91a0cfdf889201bfce`, blob `f0f20df9450142efbc6b0d8a1b10f42c80a0e25d` (48,857characters/912lines). ONLY these changes are present:
+- Display run-name labels the candidate inactive.
+- Replace self-path push trigger with workflow_dispatch WITHOUT inputs; no push trigger.
+- All THREE job guards are exactly `${{ false }}`.
+- Safe projection imports verifyPositiveBudgetEpochInventory from the existing evidence module.
+- Safe projection calls verifyPositiveBudgetEpochInventory(result.diagnostics.epochs) on REAL captured wrappers before iterating their unchanged per-epoch Source/role/metric checks.
+
+Reversing exactly these allowed changes reconstructs the executed template byte-for-byte/Git-blob hash `f0f20df9450142efbc6b0d8a1b10f42c80a0e25d`. No job-body redesign, new pin/input/group, fixture metadata stripping or weaker union check was introduced. Original pure8Q/P1,3/15/5-minute jobs, clocks900s/C0/C1, SDK/lease/alias behavior, encrypted custody, size caps, environment/secret REFERENCES and same-ID readback bodies remain exact baef. Secret values were not accessed.
+
+The shared helper is the corrected six-field export already covered by final8Q. P1 retains its call and all original assertions; the candidate now makes the workflow's R4 projection correction reviewable without starting it. All four core after-blobs MUST and do remain delivered f5 exact:
+- test/finite-budget-diagnostics.test.mjs — `5ae2d79aa657a5bdf71d11c2e764d4fa23f749ef`
+- test/fixtures/finite-budget-diagnostics.mjs — `2e911fd4e9d2287da687bef9b0389fbec48a5114`
+- test/fixtures/finite-budget-evidence.mjs — `0d95b1616a167f7f089e3a8ca59ca9628aa8aaa9`
+- test/mcp-qa-finite-budget-native.test.mjs — `082340b6ede2a252a8602721ec19063cc68fafc8`
+
+### Static metadata verification only
+
+yaml/js-yaml were unavailable in the tool Node REPL; nothing was installed. Under Root's explicit minimal-local exception, the existing Python/PyYAML parsed the49KB candidate entirely in RAM (about1second), with no file creation, checkout, dependency install, build, test or persistent task. BaseLoader kept scalar keys as strings, avoiding YAML1.1's on→boolean pitfall. Exit0/zero parse errors; independently checked:
+- exact on.workflow_dispatch empty/no inputs/no push;
+- exactly pure/positive_prepare/positive_consume;
+- all job guards false;
+- all runners ubuntu-24.04;
+- timeouts3/15/5, unchanged read-only permissions/concurrency/environment;
+- candidate Git-blob SHA and normalized original baef Git-blob SHA.
+
+This is YAML syntax/metadata plus exact template-delta verification, NOT GitHub runtime acceptance or a new test result. No test run is needed or was started for these inactive/documentary changes. No Code-U10 component was regenerated or reviewed by the implementer; Root owns the scoped review packet/gate.
+
+### ORD-1 disclosure and stop boundary
+
+R1 requires the optional entrypoint to load with group absent; the causal final8Q covers that and the other amended behavior. It does not promise universal npm-green. Root keeps ORD-1 OPEN: the725-file ordinary run was incomplete, the36 failed pure tests in four completed files predate THIS round under matched setup, and the three pending native cases remain unclassified. This scope correction does not waive the integration gate or authorize unrelated repairs, and does not claim these failures predate Task1 or identify their cause.
+
+Final delivery intentionally has TEMP PRESENT BUT INACTIVE (3,189leaves if otherwise unchanged), for scoped review BEFORE any activation. Relative to delivered f5, only TEMP plus append-only report differ;3,187other base blobs, including every core/production/dependency blob, remain exact. Main remains `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. Final fulltree/ref/report readbacks and absence of a run on the inactive head are checked at handoff. A later authorized qualification must retire TEMP again.
+
+All five Important findings remain OPEN until reviewer verdict. No new ordinary/A-B/900s/P1 run, inactive activation, subagent/reviewer, PR/main/merge/deploy/Cloudflare/credential/owner action follows from this staging. STOP_WRITES after final readback. operationalReadiness=false; completePackage=false; PCoff=false.
```

```diff
diff --git a/test/finite-budget-diagnostics.test.mjs b/test/finite-budget-diagnostics.test.mjs
# before_blob=f8745e0b8060e1d67066104690835f7ce25b1504 after_blob=5ae2d79aa657a5bdf71d11c2e764d4fa23f749ef
--- a/test/finite-budget-diagnostics.test.mjs
+++ b/test/finite-budget-diagnostics.test.mjs
@@ -1,24 +1,26 @@
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {readFile,rm} from 'node:fs/promises';
 import {createHash} from 'node:crypto';
+import {spawnSync} from 'node:child_process';
 import {createBudgetDiagnostics,observeBudgetPromise,createBudgetRuntime} from './fixtures/finite-budget-diagnostics.mjs';
 import {persistBudgetEvidence,verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './fixtures/finite-budget-evidence.mjs';
 const revision='a'.repeat(40);
 const fixture=()=>{const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA'}),r=c.root({},{phase:'authorize_get',deadline:30000,kind:'control'}),child=c.child(r,{},{deadline:5000});return {c,r,child};};
 const begin=(c,r,child,phase='authorize_get',at=0)=>c.begin(r,child,{phase,resourceClass:'KV',operation:'get',at});
 test('Q1 projection redacts secret markers and ignores accessors',()=>{
  const {c,r,child}=fixture();let accessed=false;const metadata={phase:'authorize_get',resourceClass:'KV',operation:'get',at:1,secret:'SECRET_Q1_NEVER_SERIALIZE'};Object.defineProperty(metadata,'url',{get(){accessed=true;throw Error('secret getter');}});
  const op=c.begin(r,child,metadata);c.settle(op,{at:2,status:'fulfilled'});const dto=c.snapshot(),raw=JSON.stringify(dto);
  assert(!raw.includes('SECRET_Q1'));assert(!raw.includes('url'));assert.equal(accessed,false);assert.equal(dto.rows[0].resourceClass,'KV');assert.equal(dto.testRevision,revision);
  const invalid=c.begin(r,child,{phase:'SECRET_Q1',resourceClass:'KV',operation:'get',at:3});assert.equal(invalid,null);assert(c.snapshot().coverage.invalid>0);assert(!JSON.stringify(c.snapshot()).includes('SECRET_Q1'));
+ optionalBudgetDefaultMode();
 });
 test('Q2 one native entry and duplicate settlement retain consistent denominators',async()=>{
  const {c,r,child}=fixture(),op=begin(c,r,child);c.settle(op,{at:10,status:'fulfilled'});c.settle(op,{at:20,status:'rejected'});
  const s=c.snapshot();assert.equal(s.rows.length,1);assert.equal(s.totals.nativeStarted,1);assert.equal(s.totals.nativeSettled,1);assert.equal(s.totals.nativeRejected,0);assert.equal(s.byPhaseResource[0].nativeSettled,1);assert.equal(s.totals.nativeDurationSumMs,10);assert.equal(s.totals.active,0);
  const c2=createBudgetDiagnostics({testRevision:revision,workerRole:'M'}),r2=c2.root({},{phase:'mcp_read',deadline:null,kind:'transport'});
  for(const [resourceClass,operation]of [['rateLimiter','limit'],['DO','rpc']]){const ref=c2.begin(r2,null,{phase:'mcp_read',resourceClass,operation,at:0});assert(ref);c2.settle(ref,{at:1,status:'fulfilled'});}
  const typed=c2.snapshot();assert.equal(typed.totals.nativeStarted,2);assert.equal(typed.totals.nativeSettled,2);assert.equal(typed.coverage.unattributed,0);assert.deepEqual(typed.rows.map(r=>[r.resourceClass,r.operation,r.fetchOpOrdinal]),[['rateLimiter','limit',null],['DO','rpc',null]]);
  for(const overlap of [true,false]){
   const probe=createBudgetDiagnostics({testRevision:revision,workerRole:'fixture'}),root=probe.root({},{phase:'setup',deadline:null,kind:'transport'});
   const left=begin(probe,root,null,'setup',7);
@@ -38,20 +40,21 @@
  assert.deepEqual(s.rows.map(v=>[v.rootOrdinal,v.childOrdinal,v.phase,v.settledAt]),[[1,1,'authorize_get',3],[2,null,'monitoring_post',2]]);assert.equal(s.totals.peak,2);assert.equal(s.totals.scopes[0].peak,1);assert.equal(s.coverage.unattributed,0);
  const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),one={},two={};let resolveOne,resolveTwo;
  const first=new Promise(resolve=>{resolveOne=resolve;}),second=new Promise(resolve=>{resolveTwo=resolve;}),holder={get(which){return which===1?first:second;}};
  runtime.nativeHolder(holder,'KV');runtime.clock(one,30000);runtime.clock(two,31000);
  assert.equal(runtime.control(one,'authorize_get',{},()=>runtime.member(holder,'get',{operation:'get'})(1)),first);
  assert.equal(runtime.control(two,'monitoring_post',{},()=>runtime.member(holder,'get',{operation:'get'})(2)),second);
  resolveTwo('two');await second;resolveOne('one');await first;
  const rows=runtime.snapshot().rows;assert.deepEqual(rows.map(v=>[v.rootOrdinal,v.phase]),[[1,'authorize_get'],[2,'monitoring_post']]);assert(rows[0].settledAt>=rows[1].settledAt);assert.equal(runtime.snapshot().totals.peak,2);
 
  await coldPhaseReentry();
+ await positiveEpochInventory();
 });
 test('Q4 logical denial and cancellation do not fabricate native settlement',()=>{
  const {c,r,child}=fixture(),op=begin(c,r,child);c.logical(op,{at:5,reason:'timeout'});c.cancel(op,{at:6,stage:'started'});
  let s=c.snapshot();assert.equal(s.totals.logicalDenied,1);assert.equal(s.totals.nativeSettled,0);assert.equal(s.totals.cancelStarted,1);assert.equal(s.totals.cancelSettled,0);assert.equal(s.totals.active,1);
  c.cancel(op,{at:7,stage:'settled'});assert.equal(c.snapshot().totals.nativeSettled,0);c.settle(op,{at:8,status:'rejected'});s=c.snapshot();assert.equal(s.totals.nativeRejected,1);assert.equal(s.rows[0].logicalAt,5);assert.equal(s.rows[0].cancelSettledAt,7);
  const fulfilled=begin(c,r,child,'authorize_get',9);c.settle(fulfilled,{at:10,status:'fulfilled'});
  c.scopeLogical(r,child,{phase:'authorize_get',at:11,reason:'guard'});c.scopeLogical(r,child,{phase:'authorize_get',at:12,reason:'guard'});
  const scoped=c.snapshot();assert.equal(scoped.rows[1].status,'fulfilled');assert.equal(scoped.rows[1].logicalAt,null,'scope failure does not relabel a fulfilled native leaf');assert.equal(scoped.totals.logicalDenied,1,'explicit per-op logical denominator unchanged');assert.equal(scoped.totals.scopeGuardEvents,2);assert.equal(scoped.totals.deniedScopes,1);assert.equal(scoped.logicalScopeEvents.length,2);
  const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),lease={},originalError=Error('not serialized');runtime.clock(lease,30000);
  assert.throws(()=>runtime.control(lease,'authorize_get',{},()=>{throw runtime.guardValue(originalError);}),error=>error===originalError);
@@ -220,20 +223,21 @@
  runtime.nativeHolder(transactionHolder,'DO','storage');
  function callback(argument){assert.equal(this,callbackThis);assert.equal(argument,tx);runtime.transactionArgument(argument);}
  const actualTransaction=runtime.run(lease,()=>runtime.member(transactionHolder,'transaction',{operation:'transaction'})(callback));
  assert.equal(actualTransaction,nativeTransaction);assert.equal(received,callback);await actualTransaction;
  let bottom;const outer={get(){bottom=runtime.member(holder,'get',{operation:'get'})(17);return bottom.then(v=>v);}};runtime.facadeHolder(outer,['get']);
  const outerActual=runtime.run(lease,()=>runtime.member(outer,'get',{operation:'get'})());
  assert.notEqual(outerActual,bottom);assert.equal(await outerActual,value);
  const snapshot=runtime.snapshot();assert.equal(snapshot.totals.nativeStarted,4,'outer facade ACK is not a second native row');assert.equal(snapshot.totals.nativeRejected,1);assert.equal(snapshot.coverage.unattributed,0);
 
  await coldFacadeBinding();
+ await unobservablePromiseSettlement();
 });
 test('Q6 retained record bounds preserve native identity, observed metrics and omission evidence',async()=>{
  const bounded=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1});
  const metaForBound={phase:'setup',deadline:30000,kind:'control'};
  const firstLease={},firstRef=bounded.root(firstLease,metaForBound);
  for(let event=1;event<16385;event++)bounded.root(firstLease,metaForBound);
  const laterRoot=bounded.root({},metaForBound);
  assert(laterRoot,'retention must not drop a legitimate new Root after 16384 collector calls');
  assert.notEqual(laterRoot,firstRef);
 
@@ -353,20 +357,21 @@
  assert.equal(fetchResult,fetchPromise);assert.equal(await fetchResult,ownedResponse);
  const heldReader=ownerRuntime.fixture(()=>ownerRuntime.member(ownerRuntime.body(ownedResponse),'getReader',{edge:'reader',readerSite:45})(argument));
  assert.equal(heldReader,ownedReader);
  const observedRead=ownerRuntime.member(heldReader,'read',{operation:'read',exposedBytes:true})();
  assert.equal(observedRead,readPromise);assert.equal(await observedRead,value);assert.deepEqual([fetches,factories,reads],[1,1,1]);
  const routed=ownerRuntime.snapshot();assert.equal(routed.coverage.invalid,0);assert.equal(routed.coverage.unattributed,0);
  assert.equal(routed.rows.length,2);const [outbound,bodyRead]=routed.rows;
  assert.equal(bodyRead.fetchOpOrdinal,outbound.opOrdinal);assert.equal(bodyRead.rootOrdinal,outbound.rootOrdinal);assert.equal(bodyRead.childOrdinal,outbound.childOrdinal);
  assert.equal(bodyRead.childDeadline,5000);assert.equal(bodyRead.rootDeadline,30000);assert.equal(bodyRead.phase,'authorize_get');assert.equal(bodyRead.resourceClass,'CFversion');
 
+ truncatedPeakConsistency();
 });
 test('Q7 bounded UTF8 summary hashes the exact complete JSON written',async t=>{
  const path='output/finite-budget/q7-evidence.json';t.after(()=>rm(path,{force:true}));const full={purpose:'SYN',payload:'ñ'.repeat(10000),nested:{preserved:true}},before=JSON.stringify(full),result=await persistBudgetEvidence({path,full,testRevision:revision,caseName:'Q7',counts:{tests:1,pass:1,unsafe:'SECRET_Q7'}});
  const bytes=await readFile(path);assert.equal(result.bytes,bytes.length);assert.equal(result.sha256,createHash('sha256').update(bytes).digest('hex'));assert.deepEqual(JSON.parse(bytes),full);assert.equal(JSON.stringify(full),before);assert(Buffer.byteLength(result.summary,'utf8')<=2048);assert(!result.summary.includes('SECRET_Q7'));
  await assert.rejects(persistBudgetEvidence({path:'output/finite-budget/../../escape.json',full,testRevision:revision,caseName:'Q7'}));
 });
 test('Q8 opaque wire bytes and linked body invocations preserve interval and byte denominators',async()=>{
  const {c,r,child}=fixture(),phase='authorize_get',resourceClass='CFversion';
  const fetch=c.begin(r,child,{phase,resourceClass,operation:'fetch',at:0});
  c.settle(fetch,{at:1,status:'fulfilled'});
@@ -400,20 +405,21 @@
   const first=await runtime.member(reader,'read',{operation:'read',exposedBytes:true})();assert.deepEqual([...first.value],[1,2,3]);
   const eof=await runtime.member(reader,'read',{operation:'read',exposedBytes:true})();assert.equal(eof.done,true);
   await runtime.member(reader,'cancel',{operation:'cancel'})();
  });
  const nativeRows=runtime.snapshot();assert.equal(nativeRows.coverage.unattributed,0);assert.equal(nativeRows.totals.nativeStarted,4);assert.equal(nativeRows.totals.nativeSettled,4);assert.equal(nativeRows.totals.nativeBytesRead,3);assert.deepEqual(nativeRows.rows.map(r=>r.fetchOpOrdinal),[null,1,1,1]);assert.equal(nativeRows.rows[0].nativeBytesRead,null);assert.equal(nativeRows.totals.cancelStarted,1);assert.equal(nativeRows.totals.cancelSettled,1);
 
  assert.equal(verifyCompleteBudgetTrace(nativeRows).level,'complete_trace');
  const wrongLink=structuredClone(nativeRows);wrongLink.rows[1].fetchOpOrdinal=wrongLink.rows[1].opOrdinal;
  assert.throws(()=>verifyObservedBudgetMetrics(wrongLink),/fetch parent/);
 
+ await intrinsicReadBytes();
 });
 
 async function coldSourceExpressions(kind, controls=''){
  const ts=(await import('typescript')).default;
  const {transformBudgetPreparedSource}=await import('./fixtures/finite-budget-world.mjs');
  const [file,pin]=kind==='initial'
   ?['lib/mcp-qa-finite-initial-cleanup.mjs','f0e8a2720987d13d0011c437abd3c5ef7d1452493b3c0e67b5da5d319e474de5']
   :['lib/mcp-qa-finite-owner-cleanup-journal.mjs','e40290e120266cd57bceb6faa5ea3c871ddd8aa00c9d02e98094aaf11dd4c888'];
  const raw=await readFile(file,'utf8');
  assert.equal(createHash('sha256').update(raw).digest('hex'),pin);
@@ -536,10 +542,119 @@
  release(value);assert.equal(await pending,value);await assert.rejects(rejected,e=>e===error);
  const result=runtime.snapshot();
  assert.equal(result.coverage.invalid,0);assert.equal(result.totals.nativeRejected,1);
  assert.deepEqual(result.rows.map(r=>[r.rootOrdinal,r.childOrdinal,r.rootDeadline,r.childDeadline]),[
   [1,1,30000,5000],[1,2,30000,4000],[1,1,30000,5000],[2,null,31000,null],[1,1,30000,5000],[1,1,30000,5000],[1,null,30000,null]]);
  assert.deepEqual(result.rows.map(r=>r.phase),['sdk_lookup','sdk_lookup','sdk_lookup','monitoring_post','sdk_lookup','cleanup_before_restore','cleanup_before_restore'],'cold-C explicit phase same-root reentry');
  const callback=function(){'use strict';return this;};
  const receivers=[runtime.run(child,callback),runtime.run(child,()=>runtime.phase('sdk_lookup',callback)),runtime.run(child,()=>runtime.phase('sdk_lookup',()=>runtime.run(child,callback)))];
  assert.deepEqual(receivers,[undefined,undefined,undefined],'cold-C original strict callback receiver');
 }
+
+function optionalBudgetDefaultMode(){
+ const env={...process.env};delete env.AFW_BUDGET_GROUP;delete env.NODE_TEST_CONTEXT;
+ const run=group=>spawnSync(process.execPath,['test/mcp-qa-finite-budget-native.test.mjs'],{env:group===undefined?env:{...env,AFW_BUDGET_GROUP:group},encoding:'utf8',timeout:30000,maxBuffer:256*1024});
+ const ordinary=run(undefined);
+ assert.equal(ordinary.error,undefined,'bounded default-mode subprocess');
+ if(ordinary.status!==0)assert(ordinary.stderr.includes('SYN budget group unsupported before I0'),'R1 default failure is existing before-I0 group guard');
+ assert.equal(ordinary.status,0,'R1 optional qualification inactive in ordinary command');
+ assert(!/^# Subtest: (?:R0|P1) /m.test(ordinary.stdout),'absent group registers no native qualification');
+ for(const group of ['', 'unknown']){
+  const rejected=run(group);assert.equal(rejected.status,1);assert(rejected.stderr.includes('SYN budget group unsupported before I0'));
+ }
+}
+
+function truncatedPeakConsistency(){
+ const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1}),r=c.root({},{phase:'setup',deadline:30000,kind:'control'});
+ for(let i=0;i<2;i++){const op=c.begin(r,null,{phase:'setup',resourceClass:'KV',operation:'get',at:i*2});c.settle(op,{at:i*2+1,status:'fulfilled'});}
+ const valid=c.snapshot();assert.equal(valid.retention.operationRows.omitted,1);assert.equal(verifyObservedBudgetMetrics(valid).level,'observed_metrics');
+ assert.deepEqual([valid.totals.peak,valid.totals.scopes[0].peak,valid.byPhaseResource[0].peak],[1,1,1]);
+ const mutations=[
+  s=>{s.totals.scopes[0].peak=2;},
+  s=>{s.byPhaseResource[0].peak=2;},
+  s=>{s.totals.peak=2;}
+ ];
+ const rejected=mutations.map(mutate=>{const sample=structuredClone(valid);mutate(sample);try{verifyObservedBudgetMetrics(sample);return false;}catch(error){assert.equal(error.code,'ERR_ASSERTION');return true;}});
+ const multi=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1}),left=multi.root({},{phase:'setup',deadline:30000,kind:'control'}),right=multi.root({},{phase:'restore',deadline:30000,kind:'control'});
+ for(const [i,root,phase]of [[0,left,'setup'],[1,left,'setup'],[2,right,'restore']]){const op=multi.begin(root,null,{phase,resourceClass:'KV',operation:'get',at:i*2});multi.settle(op,{at:i*2+1,status:'fulfilled'});}
+ const multiple=multi.snapshot();assert.equal(verifyObservedBudgetMetrics(multiple).level,'observed_metrics');assert.deepEqual([multiple.totals.peak,...multiple.totals.scopes.map(s=>s.peak),...multiple.byPhaseResource.map(g=>g.peak)],[1,1,1,1,1]);
+ const impossible=structuredClone(multiple);impossible.totals.peak=3;
+ try{verifyObservedBudgetMetrics(impossible);rejected.push(false);}catch(error){assert.equal(error.code,'ERR_ASSERTION');rejected.push(true);}
+ assert.deepEqual(rejected,[true,true,true,true],'R2 scope group and global peak reconciliation');
+}
+
+async function unobservablePromiseSettlement(){
+ const {runtime,child}=memoryScope();let release,getters=0,calls=0;
+ const pending=new Promise(resolve=>{release=resolve;});
+ Object.defineProperty(pending,'then',{get(){getters++;throw Error('must not inspect then accessor');}});
+ const holder={get(arg){assert.equal(this,holder);assert.equal(arg,17);calls++;return pending;}};runtime.nativeHolder(holder,'KV');
+ const returned=runtime.run(child,()=>runtime.member(holder,'get',{operation:'get'})(17));
+ assert.equal(returned,pending);assert.deepEqual([calls,getters],[1,0]);
+ const s=runtime.snapshot(),observed=[s.rows[0].status,s.totals.nativeSettled,s.totals.active,s.coverage.observedMetricsComplete];
+ release('same');assert.equal(await pending,'same');assert.equal(getters,0);
+ assert.deepEqual(observed,['pending',0,1,false],'R3 uninspectable pending Promise remains unsettled');
+ const after=runtime.snapshot();assert.equal(after.rows[0].status,'pending');assert.equal(after.totals.nativeSettled,0);assert(after.coverage.invalid>0);assert.equal(after.totals.nativeRejected,0);
+ const control=memoryScope(),normal=Promise.resolve('normal'),syncValue={same:true};let controlCalls=0;
+ const native={get(value){assert.equal(this,native);controlCalls++;return value;}};control.runtime.nativeHolder(native,'KV');
+ assert.equal(control.runtime.run(control.child,()=>control.runtime.member(native,'get',{operation:'get'})(syncValue)),syncValue);
+ const normalReturned=control.runtime.run(control.child,()=>control.runtime.member(native,'get',{operation:'get'})(normal));assert.equal(normalReturned,normal);assert.equal(await normalReturned,'normal');
+ assert.deepEqual([controlCalls,control.runtime.snapshot().totals.nativeSettled,control.runtime.snapshot().totals.active,control.runtime.snapshot().coverage.invalid],[2,2,0,0]);
+ const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA'}),root=c.root({},{phase:'setup',deadline:30000,kind:'control'}),op=begin(c,root,null,'setup',performance.now());
+ assert.equal(observeBudgetPromise(c,op,pending),pending);assert.equal(getters,0);assert.equal(c.snapshot().totals.nativeSettled,0);assert.equal(c.snapshot().totals.active,1);assert(c.snapshot().coverage.invalid>0);
+}
+
+async function positiveEpochInventory(){
+ const ts=(await import('typescript')).default;
+ const evidence=await import('./fixtures/finite-budget-evidence.mjs');
+ const source=await readFile('test/mcp-qa-finite-budget-native.test.mjs','utf8'),ast=ts.createSourceFile('native-test.mjs',source,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);
+ assert.equal(ast.parseDiagnostics.length,0);
+ const callbacks=[];
+ function visit(node){if(ts.isCallExpression(node)&&ts.isIdentifier(node.expression)&&node.expression.text==='test'&&ts.isStringLiteral(node.arguments[0])&&node.arguments[0].text.startsWith('P1 '))callbacks.push(node.arguments.at(-1));ts.forEachChild(node,visit);}
+ visit(ast);assert.equal(callbacks.length,1);const statements=callbacks[0].body.statements;
+ const first=statements.findIndex(node=>ts.isVariableStatement(node)&&node.declarationList.declarations.some(d=>ts.isIdentifier(d.name)&&d.name.text==='epochs'));
+ assert(first>=0,'actual P1 epoch validation block');
+ const block=statements.slice(first).map(node=>node.getText(ast)).join('\n');
+ const validate=Function('assert','result','process','console','verifyObservedBudgetMetrics','verifyCompleteBudgetTrace','verifyPositiveBudgetEpochInventory','"use strict";'+block);
+ const keys=[['producer',0,'M'],['producer',0,'QA'],['producer',1,'M'],['producer',1,'QA'],['producer',2,'M'],['producer',2,'QA'],['consumer',0,'M'],['consumer',0,'QA']];
+ const phases=['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory'];
+ // MODELED DTOs from the real collector; no native fixture, clock or identity.
+ const epochs=keys.map(([segment,epoch,role])=>{
+  const c=createBudgetDiagnostics({testRevision:revision,workerRole:role}),r=c.root({},{phase:'setup',deadline:30000,kind:'control'});
+  if(!(segment==='consumer'&&role==='M'))for(const [i,phase]of (segment==='producer'&&epoch===0&&role==='QA'?phases:['setup']).entries()){
+   const op=c.begin(r,null,{phase,resourceClass:'KV',operation:'get',at:i*2});c.settle(op,{at:i*2+1,status:'fulfilled'});
+  }
+  return {segment,epoch,role,reason:'MODELED',capturedAt:1000+epoch,snapshot:c.snapshot()};
+ });
+ const check=value=>validate(assert,{diagnostics:{epochs:value}},{env:{GITHUB_SHA:revision}},{info(){}},verifyObservedBudgetMetrics,verifyCompleteBudgetTrace,evidence.verifyPositiveBudgetEpochInventory);
+ assert.doesNotThrow(()=>check(epochs),'R4 source-faithful six-field captures accepted');
+ assert.throws(()=>check(epochs.filter(e=>!(e.segment==='consumer'&&e.role==='M'&&e.epoch===0))),{code:'ERR_ASSERTION'},'R4 missing empty consumer epoch rejected');
+ const invalid=[
+  [...epochs,epochs[0]],
+  [...epochs.slice(0,-1),{...epochs.at(-1),epoch:1}],
+  [...epochs.slice(0,-1),{...epochs.at(-1),role:'fixture'}],
+  [...epochs.slice(0,-1),{...epochs.at(-1),epoch:'0'}]
+ ];
+ for(const value of invalid)assert.throws(()=>check(value),{code:'ERR_ASSERTION'});
+ for(const mutate of [
+  e=>{e.reason=17;},e=>{e.capturedAt=NaN;},e=>{e.capturedAt='1000';},
+  e=>{e.snapshot.testRevision='b'.repeat(40);},e=>{e.snapshot.workerRole='fixture';}
+ ]){const altered=structuredClone(epochs);mutate(altered[0]);assert.throws(()=>check(altered),{code:'ERR_ASSERTION'});}
+}
+
+async function intrinsicReadBytes(){
+ const cases=[
+  {bytes:new ArrayBuffer(7),length:7,direct:true,throws:true},
+  {bytes:new Uint8Array(5),length:5,direct:false,throws:false},
+  {bytes:new DataView(new ArrayBuffer(3)),length:3,direct:false,throws:true}
+ ];
+ const observations=[];
+ for(const item of cases){
+  let getters=0,calls=0;Object.defineProperty(item.bytes,'byteLength',{get(){getters++;if(item.throws)throw Error('must not inspect byteLength accessor');return 999;}});
+  const value=item.direct?item.bytes:{value:item.bytes,done:false},actual=Promise.resolve(value);
+  const reader={read(arg){assert.equal(this,reader);assert.equal(arg,17);calls++;return actual;}},stream={getReader(){return reader;}},response={body:stream};
+  const {runtime,child}=memoryScope();
+  const returned=runtime.run(child,()=>{runtime.localResponse(response);const nativeReader=runtime.member(runtime.body(response),'getReader',{edge:'reader'})();return runtime.member(nativeReader,'read',{operation:'read',exposedBytes:true})(17);});
+  assert.equal(returned,actual);assert.equal(await returned,value);assert.equal(calls,1);
+  const s=runtime.snapshot(),row=s.rows[0];observations.push([getters,row.nativeBytesRead,row.status,s.totals.nativeSettled,s.totals.active,s.coverage.invalid]);
+ }
+ assert.deepEqual(observations,cases.map(c=>[0,c.length,'fulfilled',1,0,0]),'R5 byte lengths bypass own business getters');
+}
```

```diff
diff --git a/test/fixtures/finite-budget-diagnostics.mjs b/test/fixtures/finite-budget-diagnostics.mjs
# before_blob=f9884aa893d6ab6d74597921cc8925bf05437eea after_blob=2e911fd4e9d2287da687bef9b0389fbec48a5114
--- a/test/fixtures/finite-budget-diagnostics.mjs
+++ b/test/fixtures/finite-budget-diagnostics.mjs
@@ -21,20 +21,31 @@
 const splitCount=()=>({beforeRetentionOmission:0,afterRetentionOmission:0});
 const PHASES=new Set(['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory']);
 const PHASE_BITS=new Map([...PHASES].map((phase,index)=>[phase,1<<index]));
 const RESOURCES=new Set(['CFcredential','CFdeployment','CFversion','CFworkflow','CFcontainer','CFschedule','CFtail','GHsource','JWKS','DO','SQL','KV','transport','rateLimiter']);
 const OPERATIONS=new Set(['get','list','put','delete','first','all','run','sync','transaction','getAlarm','setAlarm','deleteAlarm','fetch','read','cancel','batch','exec','rpc','limit']);
 const REASONS=new Set(['timeout','denied','aborted','guard']);
 const data=(value,key)=>{if(!value||typeof value!=='object')return undefined;const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;};
 const nativeObject=value=>value!==null&&(typeof value==='object'||typeof value==='function');
 const number=value=>typeof value==='number'&&Number.isFinite(value)&&value>=0;
 const integer=value=>Number.isSafeInteger(value)&&value>=0;
+const arrayBufferLength=Object.getOwnPropertyDescriptor(ArrayBuffer.prototype,'byteLength').get;
+const typedArrayLength=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array.prototype),'byteLength').get;
+const dataViewLength=Object.getOwnPropertyDescriptor(DataView.prototype,'byteLength').get;
+const isArrayBufferView=ArrayBuffer.isView;
+function intrinsicBufferLength(value){
+ try{const length=Reflect.apply(arrayBufferLength,value,[]);return integer(length)?length:null;}catch{return null;}
+}
+function intrinsicViewLength(value){
+ for(const getter of [typedArrayLength,dataViewLength])try{const length=Reflect.apply(getter,value,[]);if(integer(length))return length;}catch{/* Unavailable bytes stay null. */}
+ return null;
+}
 const metric=()=>({nativeBytesUnavailable:0,nativeStarted:0,nativeSettled:0,nativeRejected:0,logicalDenied:0,cancelStarted:0,cancelSettled:0,active:0,peak:0,nativeBytesRead:null,chunksRead:null,nativeDurationSumMs:0});
 export const budgetProofVocabulary=Object.freeze(Object.fromEntries(Object.entries({
  phases:PHASES,resources:RESOURCES,operations:OPERATIONS,logicalReasons:REASONS,events:EVENTS,invalidReasons:INVALID_REASONS
 }).map(([key,values])=>[key,Object.freeze([...values])])));
 export function createBudgetDiagnostics(options={}){
 
  const revision=data(options,'testRevision'),role=data(options,'workerRole');
  const testRevision=typeof revision==='string'&&/^[a-f0-9]{40}$/.test(revision)?revision:null;
  const workerRole=['QA','M','fixture'].includes(role)?role:'fixture';
  let optionsValid=!!testRevision&&role===workerRole;
@@ -175,30 +186,31 @@
  const incomplete=safe('incomplete',(reason,origin,site,context)=>{
   event();
   if(origin===READER_ORIGIN){
    const buckets=firstOmission?readerAfter:readerBefore;
    increment(buckets,site);firstReaderOrigin??={ordinal:events,relation:relation(),site,context};
   }
   return invalid(reason,true);
  });
  return Object.freeze({root,child,begin,bytes,logical,scopeLogical,cancel,settle,snapshot,incomplete});
 }
+const UNOBSERVABLE_THEN=Symbol('unobservable-then');
 function passiveThen(value){
  if(!nativeObject(value))return null;
- for(let object=value;object!==null;object=Object.getPrototypeOf(object)){const d=Object.getOwnPropertyDescriptor(object,'then');if(d)return Object.hasOwn(d,'value')&&typeof d.value==='function'?d.value:null;}
+ for(let object=value;object!==null;object=Object.getPrototypeOf(object)){const d=Object.getOwnPropertyDescriptor(object,'then');if(d)return Object.hasOwn(d,'value')&&typeof d.value==='function'?d.value:UNOBSERVABLE_THEN;}
  return null;
 }
 export function observeBudgetPromise(collector,opRef,promise){
  try{
-  const then=passiveThen(promise);if(!then){collector.settle(opRef,{at:performance.now(),status:null},'promiseThenMissing');return promise;}
+  const then=passiveThen(promise);if(typeof then!=='function'){collector.settle(opRef,{at:performance.now(),status:null},'promiseThenMissing');return promise;}
   const chain=Reflect.apply(then,promise,[()=>collector.settle(opRef,{at:performance.now(),status:'fulfilled'}),()=>collector.settle(opRef,{at:performance.now(),status:'rejected'})]);
-  const next=passiveThen(chain);if(next)Reflect.apply(next,chain,[undefined,()=>{}]);
+  const next=passiveThen(chain);if(typeof next==='function')Reflect.apply(next,chain,[undefined,()=>{}]);
  }catch{try{collector.settle(opRef,{at:performance.now(),status:null},'promiseThenException');}catch{/* A sensor never changes native output. */}}
  return promise;
 }
 
 
 // SYN observer only. Native identities and captured stores never authorize work.
 export function createBudgetRuntime(options={}){
  const collector=createBudgetDiagnostics(options),als=new AsyncLocalStorage();
  const leaseClocks=new WeakMap(),leases=new WeakMap(),nativeHolders=new WeakMap(),nativePairs=new WeakMap(),bodies=new WeakMap(),facades=new WeakSet(),facadeHolders=new WeakSet(),nativeFunctions=new WeakMap(),requestResources=new WeakMap(),requestMethods=new WeakMap();
  const now=()=>performance.now(),incomplete=reason=>collector.incomplete(reason);
@@ -257,23 +269,24 @@
  const body=(receiver,optional=false)=>{
   if(optional&&receiver==null)return undefined;
   // This getter is the business getter, evaluated once at its original access.
   const value=receiver.body,owner=bodies.get(receiver);
   if(owner)tagBody(value,owner);
   return value;
  };
  const thenObserve=(value,fulfilled,rejected)=>{
   try{
    const then=passiveThen(value);
-   if(!then){fulfilled(value);return;}
+   if(then===UNOBSERVABLE_THEN){incomplete('promiseThenMissing');return;}
+   if(then===null){fulfilled(value);return;}
    const chained=Reflect.apply(then,value,[v=>{try{fulfilled(v);}catch{incomplete('observerFulfilledCallback');}},()=>{try{rejected();}catch{incomplete('observerRejectedCallback');}}]);
-   const next=passiveThen(chained);if(next)Reflect.apply(next,chained,[undefined,()=>{}]);
+   const next=passiveThen(chained);if(typeof next==='function')Reflect.apply(next,chained,[undefined,()=>{}]);
   }catch{incomplete('observerThenException');}
  };
  function invoke(fn,receiver,args,meta,original=()=>Reflect.apply(fn,receiver,args)){
   const bodyOwner=bodies.get(receiver),currentStore=als.getStore();
   const localStore=bodyOwner&&!bodyOwner.fetch&&bodyOwner.origin!=='outbound'&&currentStore?.root===bodyOwner.store?.root&&!currentStore?.excluded?currentStore:null;
   const store=localStore??bodyOwner?.store??currentStore;
   if(meta.dormant){incomplete('dormantInvocation');return original();}
   if(meta.edge==='clone'){
    const result=original();if(bodyOwner)tagBody(result,bodyOwner);else incomplete('cloneOrigin');return result;
   }
@@ -301,22 +314,23 @@
   const at=now(),ref=collector.begin(store.root,store.child,{phase:store.phase,resourceClass,operation,at,fetchOpRef:bodyOwner?.fetch??null});
   if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at,stage:'started'});
   let result;
   try{result=operation==='transaction'?als.run(immutable({...store,nativeTransaction:true}),()=>original()):original();}catch(error){collector.settle(ref,{at:now(),status:'rejected'});throw error;}
   thenObserve(result,value=>{
    const settled=now();
    if(operation==='fetch')tagBody(value,immutable({store,resource:resourceClass,fetch:ref,origin:'outbound'}));
    if(operation==='read'&&meta.exposedBytes){
     // Only exposed native ArrayBuffers/chunks. No text, JSON, cloning or probing.
     const chunk=data(value,'value'),done=data(value,'done');
-    if(value instanceof ArrayBuffer)collector.bytes(ref,{length:value.byteLength,chunks:1,durationMs:settled-at});
-    else if(ArrayBuffer.isView(chunk))collector.bytes(ref,{length:chunk.byteLength,chunks:1,durationMs:settled-at});
+    const directLength=intrinsicBufferLength(value);
+    if(directLength!==null)collector.bytes(ref,{length:directLength,chunks:1,durationMs:settled-at});
+    else if(isArrayBufferView(chunk)){const length=intrinsicViewLength(chunk);if(length!==null)collector.bytes(ref,{length,chunks:1,durationMs:settled-at});}
     else if(done===true)collector.bytes(ref,{length:0,chunks:0,durationMs:settled-at});
    }
    collector.settle(ref,{at:settled,status:'fulfilled'});
    if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at:settled,stage:'settled'});
   },()=>{
    const settled=now();collector.settle(ref,{at:settled,status:'rejected'});
    if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at:settled,stage:'settled'});
   });
   return result;
  }
```

```diff
diff --git a/test/fixtures/finite-budget-evidence.mjs b/test/fixtures/finite-budget-evidence.mjs
# before_blob=81178d96e10784366ab1b11bbf0805e347dea173 after_blob=0d95b1616a167f7f089e3a8ca59ca9628aa8aaa9
--- a/test/fixtures/finite-budget-evidence.mjs
+++ b/test/fixtures/finite-budget-evidence.mjs
@@ -138,20 +138,25 @@
  for(const entry of s.totals.scopes){
   metric(entry,['rootOrdinal','childOrdinal']);scope(entry);const key=scopeKey(entry);
   valid(!scopes.has(key),'unique scope');
   if(entry.childOrdinal!==null){valid(!childRoots.has(entry.childOrdinal),'unique child root');childRoots.set(entry.childOrdinal,entry.rootOrdinal);}
   scopes.set(key,entry);replayScopes.set(key,blank());
  }
  for(const entries of [s.byPhaseResource,s.totals.scopes])for(const k of additive){
   const combined=sum(entries.map(m=>m[k]));
   equalMetric(s.totals[k],combined??(['nativeBytesRead','chunksRead'].includes(k)?null:0),k);
  }
+ for(const entries of [s.byPhaseResource,s.totals.scopes]){
+  const peaks=entries.map(entry=>entry.peak),upper=sum(peaks)??0;
+  valid(peaks.every(peak=>peak<=s.totals.peak)&&s.totals.peak<=upper,'partition peak bounds');
+  for(const entry of entries)if(entry.nativeStarted===s.totals.nativeStarted)valid(entry.peak===s.totals.peak,'whole partition peak');
+ }
  const all=blank(),transitions=[],ordinals=new Set(),rows=new Map(),guards=new Set();
  let priorEnter=0,firstAt=null,lastAt=null;
  const rootMetadata=new Map(),childMetadata=new Map();
  const stamp=n=>{valid(pos(n)&&n<=s.chronology.eventCalls&&!ordinals.has(n),'unique transition');ordinals.add(n);};
  for(const [index,r] of s.rows.entries()){
   shape(r,rowKeys);scope(r);observedScopes.add(scopeKey(r));valid(r.opOrdinal===index+1&&r.testRevision===s.testRevision&&r.workerRole===s.workerRole,'prefix provenance');
   valid(vocab.phases.includes(r.phase)&&vocab.resources.includes(r.resourceClass)&&vocab.operations.includes(r.operation),'row enums');
   valid((r.operation!=='rpc'||r.resourceClass==='DO')&&((r.operation==='limit')===(r.resourceClass==='rateLimiter')),'method resource');
   valid(['control','transport'].includes(r.kind)&&(r.kind==='control'?time(r.rootDeadline):nullable(r.rootDeadline,time))&&nullable(r.childDeadline,time)&&(r.childOrdinal===null?r.childDeadline===null:time(r.childDeadline)),'deadlines');
   const rootInfo=rootMetadata.get(r.rootOrdinal);
@@ -189,10 +194,23 @@
    else if(part[k]!==null)valid(actual[k]!==null&&(k==='nativeDurationSumMs'?part[k]<=actual[k]+1e-8+Math.abs(actual[k])*1e-10:part[k]<=actual[k]),'prefix metric subset');
   }
  }
  if(s.retention.traceComplete)valid(observedScopes.size===scopes.size,'complete scope witnesses');
  if(!s.retention.guardRows.omitted)valid(s.totals.deniedScopes===guards.size,'distinct denied scopes');
  if(!s.retention.operationRows.omitted)equalMetric(s.totals.observedWallMs,firstAt===null?0:lastAt-firstAt,'nativeDurationSumMs');
 }
 const proof=(s,level)=>({purpose:'afw.finite-budget-metrics-proof.syn.v1',level,traceComplete:s.retention.traceComplete,operationalReadiness:false,completePackage:false,PCoff:false});
 export function verifyObservedBudgetMetrics(s){inspect(s);return proof(s,'observed_metrics');}
 export function verifyCompleteBudgetTrace(s){inspect(s);assert(s.retention.traceComplete,'incomplete retained trace');return proof(s,'complete_trace');}
+
+export function verifyPositiveBudgetEpochInventory(epochs){
+ list(epochs,8);valid(epochs.length===8,'positive epoch inventory');
+ const expected=new Set(['producer|0|M','producer|0|QA','producer|1|M','producer|1|QA','producer|2|M','producer|2|QA','consumer|0|M','consumer|0|QA']);
+ for(const epoch of epochs){
+  shape(epoch,['segment','epoch','role','reason','capturedAt','snapshot']);
+  valid(typeof epoch.reason==='string'&&count(epoch.capturedAt),'positive epoch capture metadata');
+  valid(['producer','consumer'].includes(epoch.segment)&&count(epoch.epoch)&&['M','QA'].includes(epoch.role),'positive epoch identity');
+  valid(epoch.snapshot&&typeof epoch.snapshot==='object'&&!types.isProxy(epoch.snapshot)&&[Object.prototype,null].includes(Object.getPrototypeOf(epoch.snapshot)),'positive epoch snapshot');
+  valid(expected.delete(epoch.segment+'|'+epoch.epoch+'|'+epoch.role),'positive epoch key');
+ }
+ valid(expected.size===0,'positive epoch completeness');
+}
```

```diff
diff --git a/test/mcp-qa-finite-budget-native.test.mjs b/test/mcp-qa-finite-budget-native.test.mjs
# before_blob=d63f6e5752894ddc7d52f2430fa8f1fd1c07156a after_blob=082340b6ede2a252a8602721ec19063cc68fafc8
--- a/test/mcp-qa-finite-budget-native.test.mjs
+++ b/test/mcp-qa-finite-budget-native.test.mjs
@@ -1,21 +1,21 @@
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {mkdir,readFile,writeFile,cp} from 'node:fs/promises';
 import {join} from 'node:path';
 import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference} from './fixtures/finite-owner-cleanup.mjs';
 
-import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './fixtures/finite-budget-evidence.mjs';
+import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace,verifyPositiveBudgetEpochInventory} from './fixtures/finite-budget-evidence.mjs';
 
 const group=process.env.AFW_BUDGET_GROUP;
-if(!['red','positive'].includes(group))throw Error('SYN budget group unsupported before I0');
+if(group!==undefined&&!['red','positive'].includes(group))throw Error('SYN budget group unsupported before I0');
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
@@ -75,20 +75,21 @@
  const {facts,plan,native}=result,P='afw.finite-initial-cleanup.v1:';
  const state=JSON.parse(facts.rows.find(([k])=>k===P+'state')[1]),receipt=JSON.parse(facts.rows.find(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:')&&k.endsWith(':receipt'))[1]);
  assert.equal(plan.C0,plan.I0+900000);assert.equal(plan.C1,plan.C0+180000);
  assert(result.recovery.ready<=plan.C0-30000);assert(facts.dbNow>=plan.C0);assert.equal(facts.alarm,null);assert.equal(state.status,'complete');assert.equal(result.restores,1);
  assert.equal(result.pointer.versions[0].version_id,plan.baselineVersionId);assert.equal(result.kvSemanticProof.bothAliases,true);
  assert.equal(receipt.businessAccessClosed,true);assert.equal(receipt.sdkReductionReturned,true);assert(receipt.sdkSendHash&&receipt.sdkObservedHash);
  assert.equal(receipt.globalNativeDrainVerified,false);assert.equal(receipt.sdkNamespaceEmptyVerified,false);
  assert(native.fence.fenced_at);assert(!native.grant||native.grant.revoked_at);assert.deepEqual(native.notices.map(n=>n.action),['grant','revoke']);assert(facts.finalInventoryProof);
  assert.equal(result.producer.completeNormal,1);assert.equal(result.producer.referenceRows,1);assert(result.producer.referenceReadbacks>0);assert(result.sdkAfterExchange);assert(result.sdkAfterExchange.expiresAt*1000<=plan.C0);
  const epochs=result.diagnostics.epochs,identities=new Set(),phases=new Set(),roles=new Set();
+ verifyPositiveBudgetEpochInventory(epochs);
  assert(epochs.some(e=>e.segment==='producer'));assert(epochs.some(e=>e.segment==='consumer'));
  for(const epoch of epochs){
   const key=epoch.segment+'|'+epoch.epoch+'|'+epoch.role;assert(!identities.has(key));identities.add(key);roles.add(epoch.role);
   const s=epoch.snapshot;assert.equal(s.testRevision,process.env.GITHUB_SHA);assert.equal(s.workerRole,epoch.role);
   const observed=verifyObservedBudgetMetrics(s),full=s.retention.traceComplete?verifyCompleteBudgetTrace(s):null;
   for(const group of s.byPhaseResource)if(group.nativeStarted>0)phases.add(group.phase);
   console.info('P1 SYN proof',JSON.stringify({segment:epoch.segment,epoch:epoch.epoch,role:epoch.role,observed,full,retention:s.retention}));
  }
  assert.deepEqual([...roles].sort(),['M','QA']);
  assert.deepEqual([...phases].sort(),['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory'].sort());
```

