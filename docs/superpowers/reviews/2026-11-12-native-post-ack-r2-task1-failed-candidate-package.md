# Task1 failed-candidate review package — spec and code quality

PROJECT AFW, repo tokenizartinfo-ops/agent-friendly-web. Read-only independent TASK review, not merge/promotion.
Brief: docs/superpowers/briefs/2026-11-12-native-post-ack-r2-task1.md at23de027e2223a98068d68cbc41bbf180cd429efd (includes full binding SPEC N1–N5 and control-count interpretation).
BASE408e82abe63178319862c99c3c24684e2258296d.
INTENDED INACTIVE IMPLEMENTATION HEAD6599b33dd71df6a61da25e5c9a35c1e299623433/tree d674d8916eb0d28005118e389103b03eb190510f.
ACTUAL KEYLESS HEAD4e37de51d64a715a7e1be879314d7468938bf15f (same code, only contracts event/runlabel/twofalseprefixes changed).
CURRENT FAILED/CLOSED HEADefa4bd8b2fd9327ea3658c344774eb8ad8084748/tree428402280145d596b6cfa8556e5f41525bd9943a.
Report: docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md at CLOSED HEAD, append after original507875 chars only. Initial intended-code report at6599 has527171chars; final531979. Reviewer may read only appendix after the known prefix.

IMPORTANT review target: below is COMPLETE intended code diff BASE→6599. After test failure the explicit brief required restoring original World; CURRENT rollback does not contain the World implementation, so do not mistake it for an accepted/finished implementation or an unreported missing diff. Review the recoverable frozen code for needed fixes, plus failed execution/closure evidence. Future fix will require exact World reinstatement from frozen candidate and a scoped reviewed patch; no hidden retry.

## Primary execution facts

Sole permitted KEYLESS run43325790437/attempt1: contracts producer131557776153 FAILURE, verify131558005612 SKIPPED, no artifact. Install/pins succeeded; node --test controls wrapper failed before24 callback execution. Actual0pass/1fail,3529.524019ms. Closed error fixed-finite-budget-QA plugin assertion Expected values to be strictly equal 6 !== 5. No qualification witness, graph equivalence proof, SAFE bundle or Native evidence. Related fixed F1–F8/pure tests were skipped; no counts fabricated.
Do NOT re-run tests or Source locally; do not dispatch Native or another KEYLESS run. Existing failure is covering evidence to diagnose the initial failing composed-transform contract. Reviewer should evaluate full candidate's promised contracts and code quality independently, not stop at that one failing assertion. No full-suite/repeated checks. No new delegate.

## Root independent metadata and patch readback

All five code-file patches below reconstructed exact complete candidate file bodies; report patch also reconstructed527171char candidate report. No missing/truncated hunks; World8hunks/newfiles1each. Root applied patches as STRINGDATA only, never executed/imported Source. Actual activation body normalized event/runlabel/exact2falseprefixes matches intended candidate completely.
Current full recursive tree nontruncated3194leaves,3188oldprotected leaves byte/mode exact. Current World original5fb78c057b7e80260ae683abf4af892767ce110e/218113char. Report original507875 prefix preserved; final blob91ef722c3abfe191e282adefdb8003ef78884176/531979char.
Root fully re-read: F7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209chars/manual/noinputs/nopush/sevenfalse; contracts15d081b490014bdd5393ed376f70f326e86cd836/6453chars/manual/noinputs/nopush/twofalse; Native6443a747df3f17c2adcbce6d6037dcc6f4ba364a/12093chars/manual/noinputs/nopush/twofalse. Main unchanged0c9c475b3ebaa970fc11d628b40e50a90cceb727; root independently five active statuses0. Source actors STOPPED. No actual Native/MF/I0/key/CF/SDKruntime/production/PCoff/Max.

## Binding review lens (all details in brief)

## Global Constraints

- UserexplicitcontinuousAFWSYN/cloud-firstdecisiondelegation/optoutquestions, noPCSourceexecution/clones/deps/files; Sourcecloudbranch/CAS andRootdocsseparate.
- BASE408e82abe63178319862c99c3c24684e2258296d/tree552faa898d2bb049680ddd3fabf12cf9770a84d4/F7f7a71f1a126209/reportf9ec93f5507875chars,main0c9/protected3188; verifybeforemutation.
- OnlySPEC6paths(world+APPENDreport+4newfiles); allother3188oldleavesprotectedinclF7/rawlib/SDK/lock/basefixtures/custody.
- SDK1.2.1dist251149/bb2b8524..., Node22.23.4, root30s/child5s/C0I0+900000/C1C0+180000 unchanged; oneMFallocation/R2onlyfuture.
- NoCFremote/OAuth/realOwner/Max/cron/consumer/perms/keys/main/PR/merge/deploy; allfiveflagsfalse.
- Exact24IDs/completionwitness/record<=2048; safe2JSON65536/rawZIP131072; codeprovenance/defaultgraphbyteidentity SAMEdefines.
- NoSource/Nativepermitfromplan; preflight+Task1brief, thenCLEAN+Task2separaterelease; onepermit-each/noretries/failurecloseSTOP.



N1 key step binding only, not independent runner isolation. N2 unavailable≠failed, no qualifying custody for unknown; preserve original failure and separate evidence failure. N3 fixed rebuilt ordered JSON/hash vector. N4 current official conservative job headroom, no fresh timer/offset. N5 model-only preflight versus real captured/build/configured options, actualQAafteroriginalI0/beforemount, completed BOTH-role ownership, no runtime attestation. Default OFF same once-captured inputs; protected harness/time/IDs/history unchanged. 24 named actual callbacks with private postassertion witnesses, one framework wrapper allowed; honest counts. PreMF copies verified archive but does NOT prove original scratch removal/disposal.

## Changed-file stat and full diff

- .github/workflows/afw-r2-post-ack-contracts.yml: added +127 -0; patch 6597 chars
- .github/workflows/afw-r2-post-ack-diagnostic.yml: added +221 -0; patch 12331 chars
- docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md: modified +530 -0; patch 21914 chars
- test/finite-post-ack-diagnostic.test.mjs: added +24 -0; patch 1683 chars
- test/fixtures/finite-budget-world.mjs: modified +75 -3; patch 18402 chars
- test/fixtures/finite-post-ack-diagnostic.mjs: added +247 -0; patch 47975 chars


### .github/workflows/afw-r2-post-ack-contracts.yml

~~~~~~~~~~~~diff
@@ -0,0 +1,127 @@
+name: AFW R2 post-ACK contracts
+run-name: AFW R2 post-ACK contracts HELD ${{ github.sha }}
+on:
+  workflow_dispatch:
+permissions:
+  contents: read
+  actions: read
+concurrency:
+  group: afw-r2-post-ack-contracts
+  cancel-in-progress: false
+jobs:
+  contracts:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 7
+    outputs:
+      artifact-id: ${{ steps.safe.outputs.artifact-id }}
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 0
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Install exact lock without lifecycle scripts
+        run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: Pin current identity and preserve immutable baseline on this runner
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test "$(node -v)" = v22.23.4
+          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
+          if printenv AFW_SYN_CHECKPOINT_KEY >/dev/null; then exit 1; fi
+          if printenv AFW_BUDGET_DIAGNOSTIC_CANDIDATE >/dev/null; then exit 1; fi
+          git show 408e82abe63178319862c99c3c24684e2258296d:test/fixtures/finite-budget-world.mjs >test/fixtures/.finite-post-ack-original.mjs
+          test "$(git hash-object test/fixtures/.finite-post-ack-original.mjs)" = 5fb78c057b7e80260ae683abf4af892767ce110e
+          test "$(git hash-object package-lock.json)" = 36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b
+          test "$(git hash-object .github/workflows/afw-finite-budget-qualification.yml)" = f7a71f1a0fa4f5ddf069ff411f008a098455e5cc
+      - name: Execute exactly 24 named controls with allocation traps
+        shell: bash
+        run: |
+          set -euo pipefail
+          AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs
+      - name: Run unchanged related inert compiler observer facet and sealer controls
+        shell: bash
+        run: |
+          set -euo pipefail
+          AFW_BUDGET_CONTROL_PHASE=green node --experimental-vm-modules test/fixtures/finite-budget-world.mjs verify-native-preparation-round1
+          node --test --test-concurrency=1 test/finite-budget-diagnostics.test.mjs test/mcp-qa-finite-observer.test.mjs
+          node test/fixtures/finite-post-ack-diagnostic.mjs contracts-proof
+      - name: Upload only the closed two-JSON proof
+        id: safe
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-post-ack-contracts-${{ github.run_id }}-1
+          path: output/finite-budget/post-ack-safe/*.json
+          if-no-files-found: error
+          retention-days: 7
+      - name: Remove only this task's baseline scratch
+        if: always()
+        shell: bash
+        run: rm -f -- test/fixtures/.finite-post-ack-original.mjs
+  verify:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: contracts
+    runs-on: ubuntu-24.04
+    timeout-minutes: 2
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: Independently check same-ID ZIP metadata digest CRC paths and bounds
+        env:
+          GITHUB_TOKEN: ${{ github.token }}
+          SAFE_ARTIFACT_ID: ${{ needs.contracts.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -n "$SAFE_ARTIFACT_ID"
+          case "$SAFE_ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$SAFE_ARTIFACT_ID" -o "$RUNNER_TEMP/afw-safe-meta.json"
+          curl --fail --silent --show-error --location --max-time 20 --max-filesize 131072 -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$SAFE_ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-safe.zip"
+          python - <<'PY'
+          import os,json,hashlib,zipfile,stat,pathlib
+          def closed(pairs):
+           d={}
+           for k,v in pairs:
+            if k in d: raise ValueError("duplicate JSON key")
+            d[k]=v
+           return d
+          root=pathlib.Path(os.environ["RUNNER_TEMP"])
+          m=json.loads((root/"afw-safe-meta.json").read_text(),object_pairs_hook=closed)
+          assert str(m["id"])==os.environ["SAFE_ARTIFACT_ID"] and not m["expired"]
+          assert str(m["workflow_run"]["id"])==os.environ["GITHUB_RUN_ID"] and m["workflow_run"]["head_sha"]==os.environ["GITHUB_SHA"]
+          b=(root/"afw-safe.zip").read_bytes()
+          assert len(b)<=131072 and m["size_in_bytes"]==len(b)
+          assert m["digest"]=="sha256:"+hashlib.sha256(b).hexdigest()
+          out=root/"afw-post-ack-proof"
+          out.mkdir(mode=0o700)
+          with zipfile.ZipFile(root/"afw-safe.zip") as z:
+           infos=z.infolist()
+           assert len(infos)==2 and sorted(i.filename for i in infos)==["manifest.json","result.json"]
+           assert sum(i.file_size for i in infos)<=65536
+           for i in infos:
+            assert not i.is_dir() and not i.flag_bits&1 and not stat.S_ISLNK(i.external_attr>>16)
+            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED)
+            body=z.read(i)
+            assert len(body)==i.file_size
+            value=json.loads(body.decode("utf-8"),object_pairs_hook=closed)
+            with (out/i.filename).open("xb") as f: f.write(body)
+           assert z.testzip() is None
+          PY
+      - name: Verify full closed current control and program manifest
+        run: node test/fixtures/finite-post-ack-diagnostic.mjs verify-contracts
~~~~~~~~~~~~

### .github/workflows/afw-r2-post-ack-diagnostic.yml

~~~~~~~~~~~~diff
@@ -0,0 +1,221 @@
+name: AFW R2 post-ACK diagnostic
+run-name: AFW R2 post-ACK Native HELD ${{ github.sha }}
+on:
+  workflow_dispatch:
+permissions:
+  contents: read
+  actions: read
+concurrency:
+  group: afw-r2-post-ack-diagnostic
+  cancel-in-progress: false
+# INACTIVE. Native needs independent CLEAN plus a fresh separate Root release.
+# The three key-bound steps trust this reviewed runner; no independent same-runner isolation claim.
+jobs:
+  native:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 7
+    environment: afw-finite-syn-checkpoint
+    outputs:
+      artifact-id: ${{ steps.safe.outputs.artifact-id }}
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 0
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Capture current exact Actions job timing once before setup
+        env:
+          GITHUB_TOKEN: ${{ github.token }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          node - <<'NODE'
+          (async()=>{
+          const fs=require('node:fs'),assert=require('node:assert/strict');
+          const before=process.hrtime.bigint();
+          const response=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/runs/'+process.env.GITHUB_RUN_ID+'/attempts/1/jobs?per_page=100',{headers:{Authorization:'Bearer '+process.env.GITHUB_TOKEN,Accept:'application/vnd.github+json'},redirect:'error',signal:AbortSignal.timeout(10000)});
+          const after=process.hrtime.bigint();assert.equal(response.status,200);
+          const responseDate=Date.parse(response.headers.get('date'));assert(Number.isFinite(responseDate));
+          const value=await response.json();assert(value.total_count<=100);
+          const jobs=value.jobs.filter(j=>j.name==='native'&&j.status==='in_progress'&&String(j.run_id)===process.env.GITHUB_RUN_ID&&j.run_attempt===1&&j.head_sha===process.env.GITHUB_SHA);
+          assert.equal(jobs.length,1);const startedAt=Date.parse(jobs[0].started_at);assert(Number.isFinite(startedAt)&&startedAt<=responseDate+1000);assert(Math.abs(Date.now()-responseDate)<15000);
+          const context={repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,case:'R2'};
+          fs.writeFileSync(process.env.RUNNER_TEMP+'/afw-post-ack-job-time.json',JSON.stringify({job:'native',jobId:String(jobs[0].id),timeoutMinutes:7,context,startedAt,responseDate,requestElapsed:Number(after-before)/1e6,observedHrtime:after.toString(),localObservedAt:Date.now()}),{flag:'wx',mode:0o600});
+          })().catch(()=>{console.error('current_job_timing_unavailable');process.exitCode=1;});
+          NODE
+      - name: Install locked dependencies without scripts
+        run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: Pin exact current input and baseline
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test "$GITHUB_REPOSITORY" = tokenizartinfo-ops/agent-friendly-web
+          test "$GITHUB_REF" = refs/heads/feat/finite-native-cleanup-20261101
+          test "$GITHUB_RUN_ATTEMPT" = 1
+          test "$(node -v)" = v22.23.4
+          test "$(git rev-parse HEAD)" = "$GITHUB_SHA"
+          if printenv AFW_SYN_CHECKPOINT_KEY >/dev/null; then exit 1; fi
+          if printenv AFW_BUDGET_DIAGNOSTIC_CANDIDATE >/dev/null; then exit 1; fi
+          git show 408e82abe63178319862c99c3c24684e2258296d:test/fixtures/finite-budget-world.mjs >test/fixtures/.finite-post-ack-original.mjs
+          test "$(git hash-object test/fixtures/.finite-post-ack-original.mjs)" = 5fb78c057b7e80260ae683abf4af892767ce110e
+          test "$(git hash-object package-lock.json)" = 36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b
+          test "$(git hash-object .github/workflows/afw-finite-budget-qualification.yml)" = f7a71f1a0fa4f5ddf069ff411f008a098455e5cc
+          mkdir -m 700 "$RUNNER_TEMP/afw-post-ack-native"
+          mkdir -m 700 "$RUNNER_TEMP/afw-post-ack-native/logs"
+      - name: Key preflight in terminating helper only
+        id: key
+        env:
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: node test/fixtures/finite-checkpoint-custody.mjs key-preflight readonly-result >"$RUNNER_TEMP/afw-post-ack-native/logs/key.log" 2>&1
+      - name: One R2 original outcome and fixed observer after current model preflight
+        id: r2
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -euo pipefail
+          if printenv AFW_SYN_CHECKPOINT_KEY >/dev/null; then exit 1; fi
+          AFW_POST_ACK_MODE=native_r2_once node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs >"$RUNNER_TEMP/afw-post-ack-native/logs/r2.log" 2>&1
+      - name: Preserve full owned payload with existing AEAD helper
+        id: seal
+        if: always() && steps.key.outcome == 'success'
+        continue-on-error: true
+        env:
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+        shell: bash
+        run: node test/fixtures/finite-post-ack-diagnostic.mjs seal-native >"$RUNNER_TEMP/afw-post-ack-native/logs/seal.log" 2>&1
+      - name: Upload only the current encrypted envelope
+        id: cipher
+        if: always() && steps.seal.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-post-ack-cipher-${{ github.run_id }}-1
+          path: ${{ runner.temp }}/afw-post-ack-native/cipher/*
+          if-no-files-found: error
+          retention-days: 7
+      - name: Download only the same assigned cipher artifact into this runner
+        if: always() && steps.cipher.outcome == 'success'
+        env:
+          GITHUB_TOKEN: ${{ github.token }}
+          CIPHER_ARTIFACT_ID: ${{ steps.cipher.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          case "$CIPHER_ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          curl --fail --silent --show-error --location --max-time 20 -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$CIPHER_ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-post-ack-native/cipher.zip"
+          python - <<'PY'
+          import os,pathlib,zipfile,stat
+          root=pathlib.Path(os.environ["RUNNER_TEMP"])/"afw-post-ack-native"
+          out=root/"download"
+          out.mkdir(mode=0o700)
+          with zipfile.ZipFile(root/"cipher.zip") as z:
+           infos=z.infolist()
+           assert len(infos)==3 and sorted(i.filename for i in infos)==["envelope.bin","manifest.json","receipt.json"]
+           assert sum(i.file_size for i in infos)<=134225920
+           for i in infos:
+            assert not i.is_dir() and not stat.S_ISLNK(i.external_attr>>16) and not i.flag_bits&1
+            body=z.read(i)
+            with (out/i.filename).open("xb") as f:f.write(body)
+           assert z.testzip() is None
+          PY
+      - name: Same-ID authenticated open and full private inventory readback
+        id: reopen
+        if: always() && steps.cipher.outcome == 'success'
+        continue-on-error: true
+        env:
+          AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
+          GITHUB_TOKEN: ${{ github.token }}
+          CIPHER_ARTIFACT_ID: ${{ steps.cipher.outputs.artifact-id }}
+        shell: bash
+        run: node test/fixtures/finite-post-ack-diagnostic.mjs reopen-native >"$RUNNER_TEMP/afw-post-ack-native/logs/reopen.log" 2>&1
+      - name: Publish only closed observation or unavailable evidence verdict
+        id: proof
+        if: always()
+        continue-on-error: true
+        run: node test/fixtures/finite-post-ack-diagnostic.mjs native-proof
+      - name: Upload two-file SAFE after custody attempt
+        id: safe
+        if: always()
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-post-ack-native-safe-${{ github.run_id }}-1
+          path: output/finite-budget/post-ack-safe/*.json
+          if-no-files-found: error
+          retention-days: 7
+      - name: Preserve original R2 failure independently of certificate status
+        if: always()
+        shell: bash
+        run: |
+          test '${{ steps.r2.outcome }}' = success
+          test '${{ steps.reopen.outcome }}' = success
+          test '${{ steps.proof.outcome }}' = success
+          test '${{ steps.safe.outcome }}' = success
+      - name: Remove this task baseline scratch only
+        if: always()
+        run: rm -f -- test/fixtures/.finite-post-ack-original.mjs
+  verify:
+    if: ${{ false && always() && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: native
+    runs-on: ubuntu-24.04
+    timeout-minutes: 2
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          ref: ${{ github.sha }}
+          persist-credentials: false
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: Independent SAFE ZIP and current artifact metadata verification
+        env:
+          GITHUB_TOKEN: ${{ github.token }}
+          SAFE_ARTIFACT_ID: ${{ needs.native.outputs.artifact-id }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -n "$SAFE_ARTIFACT_ID"
+          case "$SAFE_ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$SAFE_ARTIFACT_ID" -o "$RUNNER_TEMP/afw-safe-meta.json"
+          curl --fail --silent --show-error --location --max-time 20 --max-filesize 131072 -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$SAFE_ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-safe.zip"
+          python - <<'PY'
+          import os,json,hashlib,zipfile,stat,pathlib
+          def closed(pairs):
+           d={}
+           for k,v in pairs:
+            if k in d: raise ValueError("duplicate JSON key")
+            d[k]=v
+           return d
+          root=pathlib.Path(os.environ["RUNNER_TEMP"])
+          m=json.loads((root/"afw-safe-meta.json").read_text(),object_pairs_hook=closed)
+          assert str(m["id"])==os.environ["SAFE_ARTIFACT_ID"] and not m["expired"]
+          assert str(m["workflow_run"]["id"])==os.environ["GITHUB_RUN_ID"] and m["workflow_run"]["head_sha"]==os.environ["GITHUB_SHA"]
+          b=(root/"afw-safe.zip").read_bytes()
+          assert len(b)<=131072 and m["size_in_bytes"]==len(b)
+          assert m["digest"]=="sha256:"+hashlib.sha256(b).hexdigest()
+          out=root/"afw-post-ack-proof"
+          out.mkdir(mode=0o700)
+          with zipfile.ZipFile(root/"afw-safe.zip") as z:
+           infos=z.infolist()
+           assert len(infos)==2 and sorted(i.filename for i in infos)==["manifest.json","result.json"]
+           assert sum(i.file_size for i in infos)<=65536
+           for i in infos:
+            assert not i.is_dir() and not i.flag_bits&1 and not stat.S_ISLNK(i.external_attr>>16)
+            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED)
+            body=z.read(i)
+            assert len(body)==i.file_size
+            value=json.loads(body.decode("utf-8"),object_pairs_hook=closed)
+            with (out/i.filename).open("xb") as f: f.write(body)
+           assert z.testzip() is None
+          PY
+      - name: Verify closed observation and encrypted metadata without a key
+        env:
+          GITHUB_TOKEN: ${{ github.token }}
+        run: node test/fixtures/finite-post-ack-diagnostic.mjs verify-native
~~~~~~~~~~~~

### docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md

~~~~~~~~~~~~diff
@@ -4899,3 +4899,533 @@ NOT EXECUTED: any Source repair/replay/rerun/newqualification/Native16/SDK/MF/I0
 After BOTH actual jobs terminalSUCCESS, create_tree(basef550168d,exactF7+APPENDreport)→615d624c70ef90858f6705f67ca80e8a118a4aad; create_commit(parent1b6aab04)→5f5259f2402f9468386f02454f3b4928a83a611c; FULL staged WF/report readback exact; GETSource ref exact1b6aab04; update_ref(expected_sha1b6aab04,forcefalse)→success ONCE at toolclock21:32:37UTC. Full subsequent ref/commit confirmed5f5259f2402f9468386f02454f3b4928a83a611c/tree615d624c70ef90858f6705f67ca80e8a118a4aad. Full WFf7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209characters EXACT F7 from093e00793de9a9eac193281a7ec4e55d018a476b, complete seven jobs/manualworkflow_dispatch/noinputs/nopush/all7literalfalse. Full reportb3aa4ef2105476295648fed59e25021c9b9730fd/505804characters EXACT; original487009-characterprefix and full491485-characteractivationprefix preserved. Recursive tree nontruncated3190leaves; ALL3188protected path/mode/type/SHA identical to BASEcf223f03. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 unchanged. Active queued/in_progress/waiting/pending/requested ALLZERO. Restoration has no push trigger. No new actual/keyless/native run.
 
 This final REPORT-ONLY checkpoint leaves exactF7 and ALLother leaves unchanged, preserving every prior report byte. Its final expected_sha CAS and full ref/WF/report/tree/protected3188/main/fivezero readbacks are returned to Root, followed by executor STOP. Frozen actualSource1b6aab04/run43313662894/attempt1, assignedSMALLSAFE13985819598/3142B/digest3337abac0295bd2c333fcd3d22ffdb8669339b6e355d8cb6604288334cefcd54 remain exact. Root independent two-JSON audit and interpretation are separate; no Source mutation/diagnosis/replay follows this consumed permit. No private actual producer logs/Original artifact/cipher/key/plain downloaded. No local Source execution/clones/dependencies/temp Source files. ALLfive readiness flags false; no Native repair/ACK/cause/globaldrain/PCoff claim. Source executor STOPPED after final readbacks; no further permit inferred.
+
+
+## Native post-ACK R2 Task1 — initial implementation and KEYLESS qualification.
+
+### Initial implementation freeze (qualification NOT YET EXECUTED)
+
+Sole builder, Source-only GitHub Git database CAS. Binding brief e3ac3b599787695cee65b2a5e5a3bb23ed345f36 at Rootdocs1866379041f05a24f5d3502028fe2919e5a83cdf; N1–N5 and pre-MF archive-not-delete correction apply. Owner authorization is inherited from Root's exact brief; Native remains HELD pending independent CLEAN and a new separate Root release. No local clone/dependencies/build/Source import/eval/execution/temp files; authored/public strings were assembled and hashed in bounded memory only. The Node REPL rejected one >64000-byte serialized hashing input; smaller data-only calls met the per-call cap without Source execution or filesystem writes.
+
+Before mutation verified Source408e82abe63178319862c99c3c24684e2258296d/tree552faa898d2bb049680ddd3fabf12cf9770a84d4, main0c9c475b3ebaa970fc11d628b40e50a90cceb727; recursive tree nontruncated3351entries/3190leaves, four new paths absent, 3188 old leaves protected. Original World5fb78c057b7e80260ae683abf4af892767ce110e/218113chars (218119UTF8bytes); F7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209chars; reportf9ec93f51a9a16f53081633c89cf8cfaf069fd56/507875chars fully preserved as prefix. Lock36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b/445991chars unchanged. All five repository active state queries queued/in_progress/waiting/pending/requested returned0. Read stable AGENTS scope/Project boundary/Security/Engineering/continuity; historical entries are dated only.
+
+Implemented fixed Node-only profile/compiler captures, ORIGINAL408/candidate OFF same-once-captured prepared/raw/virtual inputs and defines replay, fixed two QA diagnostic emissions and M byte check; no Node fixture module in Worker metafile. Same original issuerCall ACK/recheck sequence, lexical consume/grant scope, one-shot consumed synchronously before await; local error references never enter global closed collector, unchanged original calls/errors/retention/deadlines, existing budgetSnapshot return extension only. Selector uses current QA terminal-owned-before-dispose allocation, unique eligible rejection, strict closed SAFE schema and exact N3 canonical observation projection. N5 model hashes are MODEL ONLY; actual output hashes require compiler onEnd, owned lifecycle, successful fixture return, both retained mounted-options bytes and existing terminal capture, without a new RPC. These are build/configuration provenance under a trusted runner, not runtime attestation.
+
+Exactly24 module-scope control IDs/callbacks, one node:test wrapper, callback-owned private post-final-assertion completion tokens, exactly-once barrier and missing/no-op/forged completion negatives. Existing current original issuer/recheck functions are exercised in VM with fake bindings, same errors/effects and constructor/I0 traps; no Worker SDK execution. Unknown mode rejects before allocation. Explicit native_r2_once alone registers one120s R2 test; not executed by Task1. STATIC RED: original pinned World lacks preflightPostAckDiagnostic/runPostAckR2Diagnostic and the four new paths; this is export/path inventory only, not a test run or fabricated RED output.
+
+Contracts WF prepared 7min producer+2min independent verifier without environment/key, initially manual/noinputs/nopush/all2false. Planned sole command: AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs. Unchanged inert verify-native-preparation-round1 F1–F8 is authorized by Root ruling at original45s, plus finite-budget-diagnostics.test.mjs and mcp-qa-finite-observer.test.mjs; body inspection found VM/fakes, no actual MF/I0/SDK runtime/native case. Broad native suites/old3R file omitted. SAFE proof exactlyresult.json+manifest.json, combined<=65536, ZIP<=131072; verifier checks same assigned artifact metadata/run/head/digest, paths/CRC/JSON duplicate keys and all current program/control hashes. No Root cipher/private Native producer logs/downloads permitted.
+
+Native WF is complete for independent review but manual/noinputs/nopush/all2false. Producer7+verifier2, existing afw-finite-syn-checkpoint environment only future producer; existing key bound ONLY terminating key-preflight, seal and same-ID open steps. Native command/keyless verifier have no key; this is step binding under a trusted same runner, NOT independent process/host isolation. Fresh exact Actions job metadata/official Date and monotonic elapsed age feed conservative job deadline and>=240s pre-MF/I0 headroom; unknown/stale timing blocks without a new timer. Preflight model runs before MF; actual QAonEnd is after originalI0 and before mounting, original clocks keep counting. Successful/failing original R2 remains independent from custody/certificate verdict; unknown maps unavailable, partial consumer-failure archive is evidence failure only, no new AEAD kind. Existing sealDirectory/openDirectory reused; upload cipher envelope.bin/manifest.json/receipt.json7days only, same-ID in-runner reopen/full inventory/inner observation hash, then two-file SAFE. Pre-MF archive copy does not prove original scratch deletion, disposal, native drain or namespace emptiness; no cleanup semantics broadened. All five readiness flags false.
+
+Frozen authored file inventory (UTF8 bytes; Git blob and SHA256; held WF bytes before later sole activation):
+
+```json
+[
+  {
+    "path": "test/fixtures/finite-budget-world.mjs",
+    "chars": 230553,
+    "bytes": 230559,
+    "sha256": "7a48de202ce99d012bf40b01f09fcb8199d461d8c70904b8f8491f7714c7a1af",
+    "blob": "476ba287c08c50ab807394d09a0eed78d6d6c908"
+  },
+  {
+    "path": "test/fixtures/finite-post-ack-diagnostic.mjs",
+    "chars": 47711,
+    "bytes": 47711,
+    "sha256": "6bdb081715abe1bba2424190af5f8fb1312741d64c2c638c0f9a96ee879661b6",
+    "blob": "08f9034068b937e18543fb569bfd88720a2822a8"
+  },
+  {
+    "path": "test/finite-post-ack-diagnostic.test.mjs",
+    "chars": 1643,
+    "bytes": 1643,
+    "sha256": "5cbeff23420da70c9556962a8f4b3a65c917ff50fc233f4677b823aabb0ee61f",
+    "blob": "2b514944054c9e0679527062ff148bd6764f9728"
+  },
+  {
+    "path": ".github/workflows/afw-r2-post-ack-contracts.yml",
+    "chars": 6453,
+    "bytes": 6453,
+    "sha256": "fd8b0a88d058529eabb127e6d53417a1f1c98d238918d1842a44e5824f8d6bf2",
+    "blob": "15d081b490014bdd5393ed376f70f326e86cd836"
+  },
+  {
+    "path": ".github/workflows/afw-r2-post-ack-diagnostic.yml",
+    "chars": 12093,
+    "bytes": 12093,
+    "sha256": "b6463a4d47a71c9963f025a5aa7182108d95f6f0dd796a717b0b3f111faed58a",
+    "blob": "6443a747df3f17c2adcbce6d6037dcc6f4ba364a"
+  }
+]
+```
+
+All preexisting60workflow event blocks inspected; automatic push matches main only except afw-preparation-closed-origin.yml whose three paths do not match the six scoped paths. Source branch receives no preexisting automatic Native. Generic test glob would include controls under broader CI, but no PR/main/merge is authorized. F7 unchanged sevenfalse/manual/noinputs/nopush. Detailed initial event inventory:
+
+```json
+[
+  {
+    "path": ".github/workflows/afw-canary-cloud-upload.yml",
+    "blob": "47ebf94c1d7dc8d6c22c529c57296dbc10498d8e",
+    "events": [
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-delegated-edge.yml",
+    "blob": "36dc1ba8cbb1cc3fae37dec80cd230fa00de8573",
+    "events": [
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-delivery-recipe-guidance.yml",
+    "blob": "2fd232c486cc6150d752a45d7e9c9e618981b6ef",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-finite-budget-qualification.yml",
+    "blob": "f7a71f1a0fa4f5ddf069ff411f008a098455e5cc",
+    "events": [
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-finite-finalizer.yml",
+    "blob": "566d597223497c5cf3c0435dd0f4e8b3ab7557ea",
+    "events": [
+      "issue_comment:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-finite-native-package.yml",
+    "blob": "92729f5952fd2d8bec107b4072bb569216d21863",
+    "events": [
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-finite-qa-bootstrap.yml",
+    "blob": "22f324e480dbe0295fe23fb7415328cba7952b1b",
+    "events": [
+      "issue_comment:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-home-hero-art.yml",
+    "blob": "bf197aa0a7a06b2891cbdda48a134e64f91d9358",
+    "events": [
+      "pull_request:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-independent-closure-build.yml",
+    "blob": "741b21bbd00e7da0454e5f84532b23a52533b421",
+    "events": [
+      "workflow_dispatch:",
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-independent-container-control.yml",
+    "blob": "2c5bfd41119552a659a075833c9f95fe798b980a",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-named-confirmation-package.yml",
+    "blob": "282bff4d04efd495b84681dbb1953c959ab91a69",
+    "events": [
+      "workflow_dispatch:",
+      "pull_request:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-original-native-observer.yml",
+    "blob": "0dd840a967c9f6d6f4b766d059262ba36d8cfab2",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-own-closed-readback.yml",
+    "blob": "c1a5b4b5881a9d890e6556a7851c917911685195",
+    "events": [
+      "issue_comment:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-own-worker-build.yml",
+    "blob": "063fd026824c09e13a1705d2017e166fa8bada88",
+    "events": [
+      "workflow_dispatch:",
+      "pull_request:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-client-draft.yml",
+    "blob": "f1ae3e894bf2c55be089a941bddeb7a556678805",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-client-maintenance.yml",
+    "blob": "6979c6874ec9c567f8b4af53754c8e9e94026b34",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-closed-origin.yml",
+    "blob": "3c09bcb4bcb4d3f1f33280fa690f3b0806d5c299",
+    "events": [
+      "push:",
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-maintenance-api-plan.yml",
+    "blob": "2a857568bc5a539d11baa09fcd9acf67838b67f9",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-maintenance-caller.yml",
+    "blob": "7af5278a2940c021b871db476d7b738fcb471fa5",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-maintenance-worker.yml",
+    "blob": "ad8cd6765fa0b2202d8a711c99a57977f7b61365",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-record-owner.yml",
+    "blob": "e1ba948e59070c3c2998a881b81fa10f5921adb3",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-release-preflight.yml",
+    "blob": "b5fbd64d0db4f31249a2e6916a9053023fc7a019",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-schema.yml",
+    "blob": "caa208e912b8f715115780d94845bdb7e2628384",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-source-create-worker.yml",
+    "blob": "740e48ccd1015b8ad5f3f389ef026020f8c01812",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-source-inspect.yml",
+    "blob": "4da051fa70890542a0cf1da46ceabf8a00717a98",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-source-intake-http.yml",
+    "blob": "f59ee72086960474591bdedc9610bae2ede1bcd3",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-source-intake.yml",
+    "blob": "3e46ef491ae0977f3911a02b77eefe5ec1cf6eb9",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-source-session.yml",
+    "blob": "ae487e0117dde6cda36dfa9fd16663a1bf7d9aaa",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-source-worker.yml",
+    "blob": "4f0e8238333f6e4f0bf580396895f241b1ff3f70",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-view-qa.yml",
+    "blob": "cc686287e4561f70c4e0847cca7479acbd9748de",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-preparation-worker-build.yml",
+    "blob": "26505421f62bb9587f08d5f354748ccf6956d9ff",
+    "events": [
+      "workflow_dispatch:",
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-provider-preflight.yml",
+    "blob": "5ac2de34874c3f055d66ae45c9c97c14a6c76199",
+    "events": [
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-provider-readonly-check.yml",
+    "blob": "36faefbe250ba57d936a182b5cf07f80c20b9d14",
+    "events": [
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-delivery-qualification.yml",
+    "blob": "afa732a0e31dd0fd7a0a5e78dc4b2c12b90f5129",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-edge-check.yml",
+    "blob": "296286892c515d3d2c2bef5e0099e5601a180a93",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-guide-start-qa.yml",
+    "blob": "0a263ab85999aebd0c8e048402cd4fa8c0badb9e",
+    "events": [
+      "pull_request:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-home-activation.yml",
+    "blob": "d11540abb72143e1cee973e5abdcd5217a810e98",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-home-inactive-upload.yml",
+    "blob": "617935510b1ed42ef3ac9af0d269c18e06e3c53f",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-inactive-upload.yml",
+    "blob": "a1e0ac904fa31501e26186dc0f318473a50f7664",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-journey-activation.yml",
+    "blob": "05cab1e3cb661336c68c29ef77d8030f46c686d5",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-journey-inactive-upload.yml",
+    "blob": "25063993ada3c4d2c08079fdf3f8fde69e95ffe2",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-json-activation.yml",
+    "blob": "7fdffb9c516d6b91eb937fe53c49c2cb45f7ff68",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-json-inactive-upload.yml",
+    "blob": "61390672bffc33996e445f263c8b0faf8d27308c",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-json-qualification.yml",
+    "blob": "b8611390a25da9802bf79402c56e1e531508acfb",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-methodology-once.yml",
+    "blob": "ad94df4b4c174c72f62f27dd14646244947c60e9",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-public-upload-read-probe.yml",
+    "blob": "51af06841e144ed44ce9cf9b34e94117744d545d",
+    "events": [
+      "pull_request:",
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-publication-template-build.yml",
+    "blob": "f72adaa9221157b68be2b2075dbbfd8dff2615a2",
+    "events": [
+      "workflow_dispatch:",
+      "pull_request:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-arm-observation-qualification.yml",
+    "blob": "07e25529a0dc5c73a5d9efe8d3dfa7e8665b38aa",
+    "events": [
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-bootstrap-custody-inspection.yml",
+    "blob": "b8e7ecf0f90b8ef24bdbe06a93ef3eef646ade0e",
+    "events": [
+      "issue_comment:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-closed-observation-v2-qualification.yml",
+    "blob": "583a94180db9d79613846c8ad93d4e2e69bb6e1d",
+    "events": [
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-cloud-clone-source-qualification.yml",
+    "blob": "ff342ecb37e5f31711f07915233cff6e2df10933",
+    "events": [
+      "pull_request:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-cloud-clone.yml",
+    "blob": "713f0b83130e57af3263c591638f1fd9ea95c326",
+    "events": [
+      "issue_comment:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-cloud-closed-rollback.yml",
+    "blob": "74493a4b0702498b71cefd2761e443e87db1b145",
+    "events": [
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-cloud-native-observation.yml",
+    "blob": "c2f7d3f883db369b20fab294759dece9ab4d393e",
+    "events": [
+      "issue_comment:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-legacy-baseline-qualification.yml",
+    "blob": "0e63bc9cb094474a11ff92733d4fedaa65ee3a7a",
+    "events": [
+      "workflow_dispatch:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-native-observation-source-qualification.yml",
+    "blob": "36c3af76fa962fc1a435a31e7de3e9dc9023627e",
+    "events": [
+      "pull_request:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-qa-writer-queue-qualification.yml",
+    "blob": "24974c071363fc5a9e96fae2c5ef9e8b93917d09",
+    "events": [
+      "pull_request:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-release-operator-build.yml",
+    "blob": "c95329e11064417f227e41431efc939bd1411cff",
+    "events": [
+      "workflow_dispatch:",
+      "pull_request:"
+    ]
+  },
+  {
+    "path": ".github/workflows/afw-verified-access-expiry.yml",
+    "blob": "0ea41f39ef6d11dc3c620ecf3026e61a603a3059",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  },
+  {
+    "path": ".github/workflows/ci.yml",
+    "blob": "496e4327b3b1bfb9e05d2c02ae33f7810a3a0d04",
+    "events": [
+      "pull_request:",
+      "push:"
+    ]
+  }
+]
+```
+
+Self-review fixed in-memory source framing, synthetic repeated-operation reset, input replay resolveDir, exact original-error outcome distinction, explicit fixture-return provenance and conservative metadata age accounting before any Source write/run. Remaining inherent limits: synchronous observer overhead can alter timing; pair_wait labels only a call boundary, never the underlying race cause; trusted Source/runner custody and mounted options are not remote attestation. Actual qualification/result/artifact/final closure evidence follows in a new append after the sole attempt. NOT EXECUTED: Native R2, CF remote runtime, I0, MF, PC-off, Native16, Max, production/OAuth/customer resources.
~~~~~~~~~~~~

### test/finite-post-ack-diagnostic.test.mjs

~~~~~~~~~~~~diff
@@ -0,0 +1,24 @@
+import assert from 'node:assert/strict';
+import test from 'node:test';
+import {mkdir,writeFile} from 'node:fs/promises';
+import {runPostAckObserverControls} from './fixtures/finite-post-ack-diagnostic.mjs';
+const mode=process.env.AFW_POST_ACK_MODE||'controls';
+assert(['controls','native_r2_once'].includes(mode),'unknown diagnostic mode before allocation');
+assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
+if(mode==='controls'){
+ test('24 named inert post-ACK controls and authentic completion barrier',async()=>{
+  const {preflightPostAckDiagnostic}=await import('./fixtures/finite-budget-world.mjs');
+  await preflightPostAckDiagnostic();
+  const result=await runPostAckObserverControls();
+  assert.equal(result.completed,24);assert.equal(result.pass,24);assert.equal(result.postAssertionExactlyOnce,true);
+  await mkdir('output/finite-budget/post-ack-private',{recursive:true});
+  await writeFile('output/finite-budget/post-ack-private/controls.json',JSON.stringify(result));
+  console.info(JSON.stringify(result));
+ });
+}else{
+ assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
+ assert.equal(process.env.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');
+ assert.equal(process.env.GITHUB_WORKFLOW,'AFW R2 post-ACK diagnostic');
+ assert.equal(process.env.GITHUB_JOB,'native');assert.equal(process.env.GITHUB_EVENT_NAME,'push');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');
+ test('ONE original R2 with passive post-ACK observation',{timeout:120000},async()=>{const {runPostAckR2Diagnostic}=await import('./fixtures/finite-budget-world.mjs');await runPostAckR2Diagnostic();});
+}
~~~~~~~~~~~~

### test/fixtures/finite-budget-world.mjs

~~~~~~~~~~~~diff
@@ -4,10 +4,13 @@ import {createHash} from 'node:crypto';
 import {AsyncLocalStorage} from 'node:async_hooks';
 import {mkdirSync,writeFileSync} from 'node:fs';
 import {types as fixedNodeTypes} from 'node:util';
-import {resolve,relative,join} from 'node:path';
+import {resolve,relative,join,dirname} from 'node:path';
 import {pathToFileURL} from 'node:url';
 import ts from 'typescript';
 import {budgetReaderSiteCount} from './finite-budget-diagnostics.mjs';
+import {POST_ACK_PROFILE,transformPostAckEmission,validatePostAckSupplement,selectPostAckCertificate} from './finite-post-ack-diagnostic.mjs';
+const postAckContexts=new AsyncLocalStorage();
+const postAckIdentity=()=>({repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:Number(process.env.GITHUB_RUN_ATTEMPT),case:'R2'});
 import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './finite-budget-evidence.mjs';
 
 
@@ -753,6 +756,7 @@ async function appendFixedSynAdapter(baseline,family){
 }
 
 export function createBudgetCompiler(role){
+ const diagnostic=postAckContexts.getStore(),capture=diagnostic?{role,inputs:new Map(),baseline:[],supplement:[],options:null,output:null,metafile:null}:null;if(capture){assert(!diagnostic.graphs.has(role),'one compiler per role');diagnostic.graphs.set(role,capture);}
  assert(['M','QA'].includes(role));const testRevision=process.env.GITHUB_SHA;assert.match(testRevision??'',/^[a-f0-9]{40}$/,'budget actual Actions revision before I0');
  requireOrdinaryObserver();const runtimeOptions={testRevision,workerRole:role};
  const records=new Map(),prepared=new Map(),expected=new Set(budgetNativeDescriptorProposal.sourceDescriptors.filter(p=>p.roles.includes(role)).map(p=>p.path));
@@ -771,6 +775,7 @@ export function createBudgetCompiler(role){
   let result=transformBudgetPreparedSource(source,path,role);let additionalSYN=null;
   if(family&&role==='QA'&&path==='<stdin>'){const emitted=await appendFixedSynAdapter(result.source,family);additionalSYN=emitted.proof;result={...result,source:emitted.source};}
   if(family&&role==='QA'&&['lib/mcp-qa-finite-owner-cleanup.mjs','lib/mcp-qa-finite-initial-lease.mjs'].includes(path)){if(originalSdk)assert.equal(source.split('const actual=retain(api.revokeGrant(selector,i.subject));').length-1,1,'original SDK call and retain unchanged');const emitted=await instrumentFixedSynLibrary(result.source,path,originalSdk?Object.fromEntries(Object.entries(originalSdk).filter(([key])=>key!=='end')):null);additionalSYN=emitted.proof;result={...result,source:emitted.source};}
+  if(capture){capture.inputs.set(path,{contents:source,loader:path.endsWith('.ts')?'ts':'js',resolveDir:path==='<stdin>'?process.cwd():dirname(resolve(path))});capture.baseline.push({role,path,emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source)});if(diagnostic.enabled){const observed=transformPostAckEmission({role,modulePath:path,source:result.source,identity:diagnostic.identity});if(observed.record)capture.supplement.push(observed.record);result={...result,source:observed.source};}}
   records.set(path,{role,path,rawBytes:Buffer.byteLength(raw),rawSha256:hash(raw),preparedBytes:Buffer.byteLength(source),preparedSha256:hash(source),emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source),counts:result.counts,selectors:result.selectorCounts,readerSites:result.readerSites,...additionalSYN?{additionalSYN}:{}});
   prepared.set(path,result.source);return result.source;
  }
@@ -782,6 +787,7 @@ export function createBudgetCompiler(role){
     existing.setup({...builder,onLoad(options,loader){
      builder.onLoad(options,async args=>{
       const result=await loader(args),path=objectPath(args.path);
+      if(capture&&result?.contents!==undefined)capture.inputs.set(args.path,{...result,contents:String(result.contents)});
       if(result?.contents!==undefined&&wanted(path))return {...result,contents:await transform(path,String(result.contents))};
       return result;
      });
@@ -793,6 +799,7 @@ export function createBudgetCompiler(role){
    });
    builder.onEnd(async result=>{
     if(result.errors.length)return;
+    if(capture){capture.options={...builder.initialOptions};delete capture.options.plugins;capture.output=Buffer.from(result.outputFiles[0].contents);capture.metafile=result.metafile;capture.records=[...records.values()];if(diagnostic.enabled&&role==='QA')capture.verifiedSupplement=validatePostAckSupplement({records:capture.supplement,baseline:capture.baseline,identity:diagnostic.identity,metafile:result.metafile});if(role==='M')assert.equal(capture.supplement.length,0);}
     assert.deepEqual([...records.keys()].sort(),[...expected].sort(),'closed prepared role input map '+role);
     assert(!Object.keys(result.metafile?.inputs??{}).some(path=>path.endsWith('finite-budget-descriptors.json')||path.endsWith('finite-budget-world.mjs')||path.endsWith('finite-budget-evidence.mjs')),'Node-only map/compiler excluded from Worker bundle');
     const actualIds=[...records.values()].flatMap(record=>record.readerSites.map(site=>site.id)).sort((a,b)=>a-b);
@@ -818,7 +825,7 @@ function ownedFailure(record,phase,error){record.failures.push({phase,error});}
 function createFixedOwnedRecord(frame,kind){
  const record={ordinal:++fixedBudgetAllocationOrdinal,caseName:frame.caseName,kind,persist:null,mf:null,fixture:null,callbacks:[],failures:[],epochs:[],closing:null,disposed:false,archived:false,archive:null,terminalCapture:'not_available',events:[]};
  frame.records.push(record);
- record.attachPersist=path=>{assert.equal(record.persist,null);record.persist=path;record.events.push('persist-attached');};
+ record.attachPersist=path=>{assert.equal(record.persist,null);record.persist=path;record.events.push('persist-attached');const diagnostic=postAckContexts.getStore();if(diagnostic?.native){diagnostic.allocation=record.ordinal;diagnostic.persistAttached=true;assertPostAckHeadroom(diagnostic.timing);}};
  record.attachFixture=f=>{assert(!record.fixture||record.fixture===f);record.fixture=f;record.events.push('fixture-attached');};
  record.attachMiniflare=mf=>{
   assert(!record.mf||record.mf===mf);if(record.mf)return;assertFixedBudgetAllocationSafe();record.mf=mf;fixedBudgetOwnedLive.add(record);const original=mf.dispose;assert.equal(typeof original,'function');
@@ -1160,7 +1167,7 @@ export async function runBudgetReadonlyCase(caseName){
  const {ownerReferenceFixture,prepareOwnerReference,recordOwnerReference}=await import('./finite-owner-cleanup.mjs'),{plain}=await import('./finite-first-connection-publication.mjs');
  const cleanups=[];let f,response,rootDuring,rootAfter,rootBefore,beforeRelease,afterRelease;
  try{
-  f=await ownerReferenceFixture({after(fn){cleanups.push(fn);registerFixedOwnedCleanup(fn);}},{cleanupCheckpoint:true,budgetQualification:true});f.finiteBudgetReadonlyCase=caseName;
+  f=await ownerReferenceFixture({after(fn){cleanups.push(fn);registerFixedOwnedCleanup(fn);}},{cleanupCheckpoint:true,budgetQualification:true});f.finiteBudgetReadonlyCase=caseName;const diagnostic=postAckContexts.getStore();if(diagnostic?.native)diagnostic.harnessReturned=true;
   const prepared=await prepareOwnerReference(f);rootBefore=await plain(f.stub.firstConnectionAvailability());assert.equal(rootBefore.available,true);
   const issue=prepared.issue();
   if(caseName==='R3'){const held=await fixedBudgetWait(()=>plain(f.stub.finiteBudgetSignals()),s=>s.heldNativeSettled===2,Date.now()+30000);assert.equal(held.queueObserverInvalid,false);assert(fixedQueueCausality(held),'actual causal populated readonly queue');}
@@ -1923,3 +1930,68 @@ if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).hr
  // Finish this module before command work imports fixtures that import it.
  setImmediate(()=>{main().catch(()=>{console.error('SYN fixed budget command failed');process.exitCode=1;});});
 }
+
+
+// Post-ACK diagnostic: Node-only fixed adapters. Default compiler path is unchanged.
+async function replayPostAckBuild(captured,compiler){
+ const {build}=await import('esbuild'),options={...captured.options};delete options.plugins;
+ const input=options.stdin?captured.inputs.get('<stdin>'):null;if(input)options.stdin={...options.stdin,contents:await compiler.entry(input.contents)};
+ const replay={name:'post-ack-fixed-input-replay',setup(b){b.onLoad({filter:/.*/},args=>{const value=captured.inputs.get(args.path)??captured.inputs.get(objectPath(args.path));return value?{...value}:undefined;});}};
+ const built=await build({...options,plugins:[compiler.plugin(replay)]});assert.equal(built.errors.length,0);return {bytes:Buffer.from(built.outputFiles[0].contents),records:compiler.records(),metafile:built.metafile};
+}
+function postAckStableInputs(capture){return [...capture.inputs].map(([path,v])=>({path,bytes:Buffer.byteLength(v.contents),sha256:hash(v.contents)})).sort((a,b)=>a.path.localeCompare(b.path));}
+export async function preflightPostAckDiagnostic(){
+ assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(process.env.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
+ const originalPath=resolve('test/fixtures/.finite-post-ack-original.mjs'),originalBytes=await readFile(originalPath),gitBlob=hash(Buffer.concat([Buffer.from('blob '+originalBytes.length+'\0'),originalBytes]));
+ assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+originalBytes.length+'\0'),originalBytes])).digest('hex'),'5fb78c057b7e80260ae683abf4af892767ce110e');assert(gitBlob);
+ const original=await import(pathToFileURL(originalPath).href),current=postAckIdentity(),diagnostic={identity:current,enabled:true,graphs:new Map(),native:false};
+ const group=process.env.AFW_BUDGET_GROUP;assert(group===undefined||group==='readonly');let modeled;
+ try{
+  process.env.AFW_BUDGET_GROUP='positive';fixedCompileProfileOverride='readonly';
+  modeled=await postAckContexts.run(diagnostic,async()=>{const {initialEntryHarness}=await import('./finite-initial-entry-world.mjs');return initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint:true,budgetCompileOnly:true,budgetQualification:true});});
+ }finally{fixedCompileProfileOverride=null;if(group===undefined)delete process.env.AFW_BUDGET_GROUP;else process.env.AFW_BUDGET_GROUP=group;}
+ assert.equal(modeled.I0Opened,false);assert.equal(modeled.nativeExecutionProduced,false);
+ const offGraphs=[],baselineInputs={};try{
+  process.env.AFW_BUDGET_GROUP='readonly';
+  for(const role of ['M','QA']){
+   const captured=diagnostic.graphs.get(role);assert(captured?.output&&captured.options);
+   const before=await replayPostAckBuild(captured,original.createBudgetCompiler(role)),after=await replayPostAckBuild(captured,createBudgetCompiler(role));
+   assert(before.bytes.equals(after.bytes),'same captured inputs/defines ORIGINAL408 vs candidate OFF bytes '+role);assert.deepEqual(before.records,after.records,'all raw/prepared/emitted/three SYN records exact '+role);
+   if(role==='M')assert(after.bytes.equals(captured.output),'ON M unchanged');
+   offGraphs.push({role,baselineBytes:before.bytes.length,candidateBytes:after.bytes.length,baselineSha256:hash(before.bytes),candidateSha256:hash(after.bytes),equal:true,sameCapturedInputs:true,sameDefines:true,originalAdditionalSYN:before.records.filter(r=>r.additionalSYN).length});
+   baselineInputs[role]=postAckStableInputs(captured);
+  }
+ }finally{if(group===undefined)delete process.env.AFW_BUDGET_GROUP;else process.env.AFW_BUDGET_GROUP=group;}
+ const qa=diagnostic.graphs.get('QA'),supplement=qa.verifiedSupplement;assert(supplement);const sdk=await readFile('node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js'),lock=await readFile('package-lock.json');
+ assert.equal(sdk.length,251149);assert.equal(hash(sdk),'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+lock.length+'\0'),lock])).digest('hex'),'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');
+ const transformBytes=await readFile('test/fixtures/finite-post-ack-diagnostic.mjs'),world=await readFile('test/fixtures/finite-budget-world.mjs');
+ const result={purpose:'afw.post-ack-preflight.syn.v1',profile:POST_ACK_PROFILE,context:current,stage:'MODEL ONLY',modelOnly:true,mfAllocated:false,I0Created:false,nativeExecuted:false,offGraphs,supplement,baselineInputs,originalWorldBlob:'5fb78c057b7e80260ae683abf4af892767ce110e',worldSha256:hash(world),transformSha256:hash(transformBytes),sdkFileSha256:hash(sdk),sdkBytes:sdk.length,sdkSites:44,lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',lockSha256:hash(lock),modelGraphs:Object.fromEntries([...diagnostic.graphs].map(([role,v])=>[role,{bytes:v.output.length,sha256:hash(v.output)}])),...Object.fromEntries(['operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'].map(k=>[k,false]))};
+ await mkdir('output/finite-budget/post-ack-private',{recursive:true});await writeFile('output/finite-budget/post-ack-private/preflight.json',JSON.stringify(result));await sealBudgetArtifact('output/finite-budget/post-ack-private','pure');return result;
+}
+function assertPostAckHeadroom(t){
+ assert(t&&t.job==='native'&&t.timeoutMinutes===7);assert.deepEqual(t.context,postAckIdentity());assert(Number.isFinite(t.startedAt)&&Number.isFinite(t.responseDate)&&Number.isFinite(t.requestElapsed)&&t.requestElapsed>=0&&t.requestElapsed<=10000);
+ const age=t.metadataAgeMs+performance.now()-t.observedMono;assert(Number.isFinite(age)&&age>=0&&age<=180000);
+ const startLower=Math.floor(t.startedAt/1000)*1000,nowUpper=Math.max(Date.now(),Math.ceil(t.responseDate/1000)*1000+1000+t.requestElapsed+age+2000);
+ assert(startLower<=nowUpper&&nowUpper-startLower<=180000,'current exact job setup timing');assert(startLower+420000-nowUpper>=240000,'>=240s conservative job headroom before MF/I0');return true;
+}
+export async function runPostAckR2Diagnostic(){
+ assert.equal(process.env.AFW_POST_ACK_MODE,'native_r2_once');assert.equal(process.env.GITHUB_WORKFLOW,'AFW R2 post-ACK diagnostic');assert.equal(process.env.GITHUB_JOB,'native');assert.equal(process.env.GITHUB_EVENT_NAME,'push');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);assert.equal(process.env.AFW_BUDGET_DIAGNOSTIC_CANDIDATE,undefined);
+ const preflight=await preflightPostAckDiagnostic(),preflightBytes=await readFile('output/finite-budget/post-ack-private/preflight.json');
+ const timing=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-post-ack-job-time.json'),'utf8'));timing.observedMono=performance.now();timing.metadataAgeMs=Number((process.hrtime.bigint()-BigInt(timing.observedHrtime))/1000000n);
+ const diagnostic={identity:postAckIdentity(),enabled:true,graphs:new Map(),native:true,timing};assertPostAckHeadroom(timing);
+ let value,primary=null,originalR2Outcome='unavailable';const group=process.env.AFW_BUDGET_GROUP;process.env.AFW_BUDGET_GROUP='readonly';
+ try{value=await postAckContexts.run(diagnostic,()=>runBudgetReadonlyCase('R2'));originalR2Outcome='passed';}
+ catch(error){primary=error;const ownedEvidence=fixedBudgetOwnerErrors.get(error),owned=ownedEvidence?.result;if(ownedEvidence?.primary===error&&owned&&diagnostic.allocation&&owned.records.some(r=>r.ordinal===diagnostic.allocation&&r.kind==='initial'&&r.disposed&&r.terminalCapture==='captured'))originalR2Outcome='failed';}
+ finally{if(group===undefined)delete process.env.AFW_BUDGET_GROUP;else process.env.AFW_BUDGET_GROUP=group;}
+ const ownership=value?.ownership??(primary?fixedBudgetOwnerErrors.get(primary)?.result:null),record=ownership?.records.find(r=>r.ordinal===diagnostic.allocation);
+ let mountedProvenance=null;
+ try{
+  assert(record&&diagnostic.harnessReturned&&ownership.complete&&record.disposed&&record.archived&&!record.disposalUncertain);assert.equal(record.terminalCapture,'captured');assert.deepEqual(record.graphs.map(r=>r.role).sort(),['M','QA']);const captured=diagnostic.graphs;for(const role of ['M','QA']){const built=captured.get(role);assert(built?.output);const configured=record.graphs.find(r=>r.role===role);assert(configured.mounted);assert.equal(configured.sha256,hash(built.output));assert.equal(configured.bytes,built.output.length);}
+  assert(captured.get('QA').verifiedSupplement);mountedProvenance={status:'verified',context:diagnostic.identity,stage:'actual_configured',profile:POST_ACK_PROFILE,allocationIdentity:record.ordinal,ownedAllocationIdentity:diagnostic.allocation,lifecycleComplete:true,successfulMount:true,actualOptionsVerified:true,modelOnly:false,sdkFileSha256:preflight.sdkFileSha256,sdkBytes:preflight.sdkBytes,sdkSites:preflight.sdkSites,lockBlob:preflight.lockBlob,lockSha256:preflight.lockSha256,mGraphSha256:hash(captured.get('M').output),qaGraphSha256:hash(captured.get('QA').output),transformSha256:preflight.transformSha256,preflightSha256:hash(preflightBytes),emissions:captured.get('QA').supplement.length};
+ }catch{}
+ const snapshots=(record?.epochs??[]).filter(v=>v.role==='QA'&&v.reason==='terminal-owned-before-dispose').map(v=>({role:v.role,reason:v.reason,allocationIdentity:record.ordinal,snapshot:v.snapshot.postAckDiagnostic}));
+ const observation=selectPostAckCertificate({snapshots,mountedProvenance,originalR2Outcome,context:diagnostic.identity});
+ await mkdir('output/finite-budget/post-ack-private',{recursive:true});await writeFile('output/finite-budget/post-ack-private/observation.json',JSON.stringify(observation));await writeFile('output/finite-budget/post-ack-private/job-manifest.json',JSON.stringify({purpose:'afw.post-ack-private-job.syn.v1',context:diagnostic.identity,cases:['R2'],diagnosticOnly:true,originalR2Outcome,kind:originalR2Outcome==='passed'?'readonly-result':'consumer-failure',preallocationBlocked:!diagnostic.persistAttached,preMfScratchDeletionVerified:false,operationalReadiness:false}));
+ if(primary)throw primary;
+ assert.equal(originalR2Outcome,'passed');assert.equal(observation.provenance.status,'verified');assert(['observed','not_observed'].includes(observation.status));return;
+}
~~~~~~~~~~~~

### test/fixtures/finite-post-ack-diagnostic.mjs

~~~~~~~~~~~~diff
@@ -0,0 +1,247 @@
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {readFile,writeFile,mkdir} from 'node:fs/promises';
+import {Script,createContext} from 'node:vm';
+import ts from 'typescript';
+
+export const POST_ACK_PROFILE='r2-post-ack-v1';
+const REPOSITORY='tokenizartinfo-ops/agent-friendly-web',REF='refs/heads/feat/finite-native-cleanup-20261101';
+const PHASE='lib/mcp-qa-finite-owner-phase-context.mjs',PURPOSE='afw.native-post-ack-r2.safe.v1';
+const HASH=/^[a-f0-9]{64}$/,SOURCE=/^[a-f0-9]{40}$/;
+const FLAGS=['operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'];
+const IDS=Object.freeze(['off_graphs','sdk_pins','profile_scope','sites_exact','sealer_graph','lexical_op','one_shot','nested_scope','late_scope','entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded','same_error','observer_throws','same_effects','pair_orders','no_rejection','overflow','schema','provenance']);
+const BOUNDARIES=['entry_check','notice_guard','protocol_invariant','pair_wait','expected_mismatch','exit_check','unknown'];
+const sha=b=>createHash('sha256').update(b).digest('hex');
+const ordinary=(v,keys)=>{assert(v&&typeof v==='object'&&!Array.isArray(v));const ds=Object.getOwnPropertyDescriptors(v);assert.deepEqual(Reflect.ownKeys(ds).sort(),[...keys].sort());for(const k of keys)assert(Object.hasOwn(ds[k],'value')&&ds[k].enumerable);};
+const ascii=v=>{assert.equal(typeof v,'string');assert(/^[\x20-\x7e]*$/.test(v));};
+function identity(c){ordinary(c,['repository','ref','source','run','attempt','case']);assert.equal(c.repository,REPOSITORY);assert.equal(c.ref,REF);assert.equal(typeof c.source,'string');assert.equal(typeof c.run,'string');assert(SOURCE.test(c.source));assert(/^[1-9][0-9]*$/.test(c.run));assert.equal(c.attempt,1);assert.equal(c.case,'R2');for(const k of ['repository','ref','source','run','case'])ascii(c[k]);return {repository:c.repository,ref:c.ref,source:c.source,run:c.run,attempt:1,case:'R2'};}
+function ast(source,path){const a=ts.createSourceFile(path,source,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);assert.equal(a.parseDiagnostics.length,0,'post-ACK parse');return a;}
+function apply(source,edits){let last=source.length+1;for(const e of edits.sort((a,b)=>b.start-a.start)){assert(e.start>=0&&e.end<=last&&e.start<=e.end,'nonoverlapping edits');source=source.slice(0,e.start)+e.text+source.slice(e.end);last=e.start;}return source;}
+function collectorLiteral(current){return [
+'const __paIdentity='+JSON.stringify(identity(current))+';',
+'const __paCollector={initialized:true,invalid:false,overflow:false,pending:0,invoked:0,completed:0,records:[]};',
+'function __paInvalid(){__paCollector.invalid=true;}',
+'function __paBegin(token){try{const c={ordinal:++__paCollector.invoked,operation:token.operation,error:null,boundary:"unknown",outerError:null,done:false};token.ctx=c;__paCollector.pending++;if(c.ordinal>32){__paCollector.overflow=true;__paCollector.invalid=true;}return c;}catch{__paInvalid();return null;}}',
+'function __paBrand(c,error,boundary){try{if(c){c.error=error;c.boundary=boundary;}}catch{__paInvalid();}}',
+'function __paEmit(token,error,rejected){try{if(!token)return;const c=token.ctx;if(!c||c.done){__paInvalid();return;}c.done=true;__paCollector.completed++;if(c.ordinal>32)return;const sameError=!rejected||c.outerError===error;const boundary=rejected&&c.error===error?c.boundary:"unknown";if(!sameError)__paInvalid();__paCollector.records.push({invocationOrdinal:c.ordinal,operation:c.operation,ackReturned:true,postAckEntered:true,outcome:rejected?"rejected":"fulfilled",boundary,sameError});}catch{__paInvalid();}}',
+'export function __afwPostAckSnapshot(){return {purpose:"afw.post-ack-capture.syn.v1",profile:"r2-post-ack-v1",identity:{...__paIdentity},initialized:__paCollector.initialized,completeCapture:!__paCollector.invalid&&!__paCollector.overflow&&__paCollector.pending===0&&__paCollector.completed===__paCollector.invoked,invalid:__paCollector.invalid,overflow:__paCollector.overflow,pending:__paCollector.pending,invoked:__paCollector.invoked,completed:__paCollector.completed,records:__paCollector.records.map(r=>({...r}))};}'
+].join('\n');}
+function phaseTransform(source,current){
+ assert(!source.includes('__paCollector'),'no observer collision');const a=ast(source,PHASE),targets=[];
+ const visit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body?.getText(a).includes('requireEmptyNotice(expected)'))targets.push(n);ts.forEachChild(n,visit);};visit(a);assert.equal(targets.length,1,'exact issuer recheck');
+ const target=targets[0],siblings=target.parent.statements;assert(siblings);
+ const issuers=siblings.filter(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall');assert.equal(issuers.length,1);const issuer=issuers[0];assert.deepEqual(issuer.parameters.map(p=>p.name.getText(a)),['op','window','call']);
+ const edits=[],siteCounts={entry_check:0,notice_guard:0,protocol_invariant:0,pair_wait:0,expected_mismatch:0,exit_check:0,issuer_ack:0};
+ const statements=[...target.body.statements],checks=statements.filter(n=>ts.isExpressionStatement(n)&&ts.isCallExpression(n.expression)&&n.expression.expression.getText(a)==='check');assert.equal(checks.length,2);
+ const wrap=(node,boundary)=>{siteCounts[boundary]++;edits.push({start:node.getStart(a),end:node.end,text:'try{'+node.getText(a)+'}catch(__paError){__paBrand(__paCtx,__paError,"'+boundary+'");throw __paError;}'});};
+ wrap(checks[0],'entry_check');wrap(checks[1],'exit_check');
+ const notices=statements.filter(n=>ts.isExpressionStatement(n)&&n.expression.getText(a)==='requireEmptyNotice(expected)');assert.equal(notices.length,1);wrap(notices[0],'notice_guard');
+ let pair=null;
+ for(const n of statements){
+  if(ts.isIfStatement(n)){
+   assert(ts.isExpressionStatement(n.thenStatement)&&ts.isCallExpression(n.thenStatement.expression)&&n.thenStatement.expression.expression.getText(a)==='fail'&&!n.elseStatement,'original explicit invariant');
+   const boundary=n.expression.getText(a).includes('canonical(pair.first)')?'expected_mismatch':'protocol_invariant';wrap(n.thenStatement,boundary);
+  }
+  if(ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>d.name.getText(a)==='pair')){assert(n.getText(a).includes('await wait(')&&n.getText(a).includes('observeOwnerPhasePair'));pair=n;}
+ }
+ assert(pair);siteCounts.pair_wait++;edits.push({start:pair.getStart(a),end:pair.end,text:'let pair;try{'+pair.getText(a).replace(/^const\s+pair\s*=/,'pair=')+'}catch(__paError){__paBrand(__paCtx,__paError,"pair_wait");throw __paError;}'});
+ assert.equal(siteCounts.protocol_invariant,5);assert.equal(siteCounts.expected_mismatch,1);
+ const start=target.body.getStart(a)+1,end=target.body.end-1;
+ const local=edits.map(e=>({...e,start:e.start-start,end:e.end-start}));
+ const body=apply(source.slice(start,end),local);
+ const recheck='{const __paToken=__paSlot;__paSlot=null;const __paCtx=__paToken?__paBegin(__paToken):null;try{'+body+'}catch(__paError){if(__paCtx)__paCtx.outerError=__paError;throw __paError;}finally{if(__paCtx)__paCollector.pending--;}}';
+ const calls=issuer.body.statements;let ackCall=-1;
+ for(let i=0;i<calls.length;i++)if(calls[i].getText(a).replace(/\s+/g,'')==="awaitissuerAppend('Ack',ack,op);")ackCall=i;
+ assert(ackCall>=0);assert.equal(calls[ackCall+1].getText(a).replace(/\s+/g,''),"position='issuer-ack';");const after=calls[ackCall+2];assert.equal(after.getText(a).replace(/\s+/g,''),'awaitrecheckOwned();');siteCounts.issuer_ack++;
+ const observed='{const __paToken=op==="consume"||op==="grant"?{operation:op,ctx:null}:null;__paSlot=__paToken;let __paError,__paRejected=false;try{'+after.getText(a)+'}catch(__paCaught){__paRejected=true;__paError=__paCaught;throw __paCaught;}finally{if(__paSlot===__paToken)__paSlot=null;__paEmit(__paToken,__paError,__paRejected);}}';
+ const transformed=apply(source,[{start:target.getStart(a),end:target.getStart(a),text:'let __paSlot=null;\n'},{start:target.body.getStart(a),end:target.body.end,text:recheck},{start:after.getStart(a),end:after.end,text:observed}]);
+ return {source:collectorLiteral(current)+'\n'+transformed,sites:siteCounts};
+}
+export function transformPostAckEmission({role,modulePath,source,identity:current}){
+ assert(['M','QA'].includes(role));assert.equal(typeof source,'string');identity(current);
+ if(role==='M')return {source,record:null};
+ if(![PHASE,'<stdin>'].includes(modulePath))return {source,record:null};
+ let output,sites;
+ if(modulePath===PHASE){const r=phaseTransform(source,current);output=r.source;sites=r.sites;}
+ else{
+  const a=ast(source,'post-ack-entry'),matches=[];const visit=n=>{if(ts.isMethodDeclaration(n)&&n.name?.getText(a)==='budgetSnapshot'&&ts.isClassDeclaration(n.parent)&&n.parent.name?.text==='Initial')matches.push(n);ts.forEachChild(n,visit);};visit(a);assert.equal(matches.length,1);
+  const m=matches[0];assert.equal(m.body.statements.length,1);const r=m.body.statements[0];assert(ts.isReturnStatement(r)&&r.expression?.getText(a)==='__afwBudget.snapshot()');
+  output='import {__afwPostAckSnapshot} from "./lib/mcp-qa-finite-owner-phase-context.mjs";\n'+apply(source,[{start:r.getStart(a),end:r.end,text:'return {...'+r.expression.getText(a)+',postAckDiagnostic:__afwPostAckSnapshot()};'}]);sites={budgetSnapshot:1};
+ }
+ ast(output,modulePath);const literalSha256=sha(modulePath===PHASE?collectorLiteral(current):'budgetSnapshot/postAckDiagnostic/v1');
+ return {source:output,record:{purpose:'afw.post-ack-emission.syn.v1',version:1,profile:POST_ACK_PROFILE,path:modulePath,phase:'after-baseline',baselineBytes:Buffer.byteLength(source),baselineSha256:sha(source),emittedBytes:Buffer.byteLength(output),emittedSha256:sha(output),transformLiteralSha256:literalSha256,sites,fields:['invocationOrdinal','operation','ackReturned','postAckEntered','outcome','boundary','sameError'],enums:BOUNDARIES,businessAuthority:false,addsAwait:0,addsPromise:0,addsNativeCall:0,changesRetention:false}};
+}
+export function validatePostAckSupplement({records,baseline,identity:current,metafile}){
+ identity(current);assert(Array.isArray(records)&&records.length===2);assert.deepEqual(records.map(r=>r.path).sort(),['<stdin>',PHASE].sort());
+ assert(Array.isArray(baseline));for(const r of records){const b=baseline.find(x=>x.role==='QA'&&x.path===r.path);assert(b);assert.equal(r.purpose,'afw.post-ack-emission.syn.v1');assert.equal(r.profile,POST_ACK_PROFILE);assert.equal(r.phase,'after-baseline');assert.equal(r.baselineBytes,b.emittedBytes);assert.equal(r.baselineSha256,b.emittedSha256);assert(HASH.test(r.emittedSha256)&&HASH.test(r.transformLiteralSha256));assert(r.emittedBytes>r.baselineBytes);for(const k of ['addsAwait','addsPromise','addsNativeCall'])assert.equal(r[k],0);assert.equal(r.businessAuthority,false);assert.equal(r.changesRetention,false);}
+ assert(!Object.keys(metafile?.inputs??{}).some(p=>/finite-post-ack-diagnostic|finite-budget-world|finite-budget-evidence|finite-budget-descriptors/.test(p)),'Node-only graph exclusion');
+ assert.deepEqual(records.find(r=>r.path===PHASE).sites,{entry_check:1,notice_guard:1,protocol_invariant:5,pair_wait:1,expected_mismatch:1,exit_check:1,issuer_ack:1});
+ assert.deepEqual(records.find(r=>r.path==='<stdin>').sites,{budgetSnapshot:1});
+ return {purpose:'afw.post-ack-supplement.syn.v1',profile:POST_ACK_PROFILE,context:identity(current),records:structuredClone(records),nodeModuleAbsent:true,businessAuthority:false};
+}
+function observationProjection(v){return {purpose:v.purpose,status:v.status,context:identity(v.context),provenance:{status:v.provenance.status,sdkPackage:v.provenance.sdkPackage,sdkFileSha256:v.provenance.sdkFileSha256,lockSha256:v.provenance.lockSha256,mGraphSha256:v.provenance.mGraphSha256,qaGraphSha256:v.provenance.qaGraphSha256,transformSha256:v.provenance.transformSha256,preflightSha256:v.provenance.preflightSha256},selection:v.selection,invocationOrdinal:v.invocationOrdinal,operation:v.operation,ackReturned:v.ackReturned,postAckEntered:v.postAckEntered,outcome:v.outcome,boundary:v.boundary,quality:v.quality,originalR2Outcome:v.originalR2Outcome,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};}
+function observationHash(v){return sha(JSON.stringify(observationProjection(v)));}
+export function validatePostAckResult(v,expectedContext){
+ ordinary(v,['purpose','status','context','provenance','selection','invocationOrdinal','operation','ackReturned','postAckEntered','outcome','boundary','quality','originalR2Outcome','custody',...FLAGS]);assert.equal(v.purpose,PURPOSE);identity(v.context);assert.deepEqual(v.context,identity(expectedContext));
+ assert(['observed','not_observed','invalid','unavailable'].includes(v.status));assert(['passed','failed','unavailable'].includes(v.originalR2Outcome));
+ ordinary(v.provenance,['status','sdkPackage','sdkFileSha256','lockSha256','mGraphSha256','qaGraphSha256','transformSha256','preflightSha256']);assert.equal(v.provenance.sdkPackage,'@cloudflare/workers-oauth-provider@1.2.1');assert(['verified','unavailable'].includes(v.provenance.status));
+ for(const [k,value]of Object.entries(v.provenance))if(k.endsWith('Sha256'))assert(v.provenance.status==='verified'?typeof value==='string'&&HASH.test(value):value===null);
+ assert(BOUNDARIES.includes(v.boundary));for(const flag of FLAGS)assert.equal(v[flag],false);
+ if(v.status==='observed'){assert.equal(v.provenance.status,'verified');assert.equal(v.quality,'qualified');assert.equal(v.selection,'unique_qualified_rejection');assert(Number.isSafeInteger(v.invocationOrdinal)&&v.invocationOrdinal>=1&&v.invocationOrdinal<=32);assert(['consume','grant'].includes(v.operation));assert.equal(v.ackReturned,true);assert.equal(v.postAckEntered,true);assert.equal(v.outcome,'rejected');}
+ else{assert.equal(v.invocationOrdinal,null);assert.equal(v.operation,'unknown');assert.equal(v.ackReturned,null);assert.equal(v.postAckEntered,null);assert.equal(v.outcome,'unknown');assert.equal(v.boundary,'unknown');assert.equal(v.selection,'none');assert.equal(v.quality,v.status==='not_observed'?'qualified':v.status==='invalid'?'invalid':'incomplete');if(v.status==='not_observed')assert.equal(v.provenance.status,'verified');}
+ ordinary(v.custody,['status','artifactId','zipSha256','observationSha256','reopenVerified']);assert(['verified','unavailable'].includes(v.custody.status));
+ if(v.custody.status==='verified'){assert.equal(typeof v.custody.artifactId,'string');assert(/^[1-9][0-9]*$/.test(v.custody.artifactId));assert.equal(typeof v.custody.zipSha256,'string');assert(HASH.test(v.custody.zipSha256));assert.equal(v.custody.observationSha256,observationHash(v));assert.equal(v.custody.reopenVerified,true);assert.equal(v.provenance.status,'verified');assert.notEqual(v.originalR2Outcome,'unavailable');}
+ else{for(const k of ['artifactId','zipSha256','observationSha256'])assert.equal(v.custody[k],null);assert.equal(v.custody.reopenVerified,false);}
+ if(v.originalR2Outcome==='unavailable'){assert.equal(v.status,'unavailable');assert.equal(v.quality,'incomplete');assert.equal(v.custody.status,'unavailable');}
+ const walk=x=>{if(typeof x==='string')ascii(x);else if(x&&typeof x==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(x))){assert(Object.hasOwn(d,'value'));walk(d.value);}};walk(v);return v;
+}
+const unavailableCustody=()=>({status:'unavailable',artifactId:null,zipSha256:null,observationSha256:null,reopenVerified:false});
+function provenance(p,current){
+ if(!p||p.status!=='verified')return {status:'unavailable',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1',sdkFileSha256:null,lockSha256:null,mGraphSha256:null,qaGraphSha256:null,transformSha256:null,preflightSha256:null};
+ identity(current);assert.deepEqual(p.context,current);assert.equal(p.stage,'actual_configured');assert.equal(p.profile,POST_ACK_PROFILE);assert.equal(p.allocationIdentity,p.ownedAllocationIdentity);assert(Number.isSafeInteger(p.allocationIdentity)&&p.allocationIdentity>0);assert.equal(p.lifecycleComplete,true);assert.equal(p.successfulMount,true);assert.equal(p.actualOptionsVerified,true);assert.equal(p.modelOnly,false);assert.equal(p.sdkFileSha256,'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80');assert.equal(p.sdkBytes,251149);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');assert.equal(p.emissions,2);
+ const q={status:'verified',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1'};for(const k of ['sdkFileSha256','lockSha256','mGraphSha256','qaGraphSha256','transformSha256','preflightSha256']){assert(HASH.test(p[k]));q[k]=p[k];}return q;
+}
+export function selectPostAckCertificate({snapshots,mountedProvenance,originalR2Outcome,context}){
+ context=identity(context);assert(['passed','failed','unavailable'].includes(originalR2Outcome));let p,status='unavailable',quality='incomplete',selected=null;
+ try{
+  p=provenance(mountedProvenance,context);
+  if(originalR2Outcome!=='unavailable'&&p.status==='verified'){
+   assert(Array.isArray(snapshots));const owned=snapshots.filter(x=>x.role==='QA'&&x.reason==='terminal-owned-before-dispose'&&x.allocationIdentity===mountedProvenance.allocationIdentity);assert.equal(owned.length,1,'one current terminal snapshot');
+   const s=owned[0].snapshot;ordinary(s,['purpose','profile','identity','initialized','completeCapture','invalid','overflow','pending','invoked','completed','records']);assert.equal(s.purpose,'afw.post-ack-capture.syn.v1');assert.equal(s.profile,POST_ACK_PROFILE);assert.deepEqual(s.identity,context);assert.equal(s.initialized,true);
+   assert.equal(s.completeCapture,true);assert.equal(s.invalid,false);assert.equal(s.overflow,false);assert.equal(s.pending,0);assert(Number.isSafeInteger(s.invoked)&&s.invoked>=0&&s.invoked<=32);assert.equal(s.completed,s.invoked);assert.equal(s.records.length,s.invoked);
+   const seen=new Set();for(const r of s.records){ordinary(r,['invocationOrdinal','operation','ackReturned','postAckEntered','outcome','boundary','sameError']);assert(Number.isSafeInteger(r.invocationOrdinal)&&r.invocationOrdinal>=1&&r.invocationOrdinal<=32&&!seen.has(r.invocationOrdinal));seen.add(r.invocationOrdinal);assert(['consume','grant'].includes(r.operation));assert.equal(r.ackReturned,true);assert.equal(r.postAckEntered,true);assert.equal(r.sameError,true);assert(['fulfilled','rejected'].includes(r.outcome));assert(BOUNDARIES.includes(r.boundary));}
+   assert.deepEqual([...seen].sort((a,b)=>a-b),Array.from({length:s.invoked},(_,i)=>i+1));
+   const rejects=s.records.filter(r=>r.outcome==='rejected');assert(rejects.length<=1);selected=rejects[0]??null;status=selected?'observed':'not_observed';quality='qualified';
+  }
+ }catch{status=originalR2Outcome==='unavailable'?'unavailable':'invalid';quality=status==='invalid'?'invalid':'incomplete';selected=null;}
+ p??=provenance(null,context);const result={purpose:PURPOSE,status,context,provenance:p,selection:selected?'unique_qualified_rejection':'none',invocationOrdinal:selected?.invocationOrdinal??null,operation:selected?.operation??'unknown',ackReturned:selected?true:null,postAckEntered:selected?true:null,outcome:selected?'rejected':'unknown',boundary:selected?.boundary??'unknown',quality,originalR2Outcome,custody:unavailableCustody(),...Object.fromEntries(FLAGS.map(k=>[k,false]))};
+ return validatePostAckResult(result,context);
+}
+
+const VM_SETUP="\n let __paSlot=null,position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false,childCalls=0,postChecks=0,nestedDone=false;\n const sdkOperations=[],expected={records:{issuer:{reservation:{identity:{identityHash:'SYN'},recordHash:'SYN'},operations:Object.fromEntries(['grant','consume','authorization','open_fence'].map(k=>[k,{send:null,ack:null}]))}},issuerRows:{}},ctx={},env={},originalLease={},id='SYN';\n function fail(){throw primary;}\n function check(){effects.push('check');if(position==='issuer-ack'){postChecks++;if(settings.mode==='entry_check'&&postChecks===1||settings.mode==='exit_check'&&postChecks===2)throw primary;}}\n function requireEmptyNotice(){effects.push('notice');if(position==='issuer-ack'&&settings.mode==='notice_guard')throw primary;}\n function canonical(v){effects.push('canonical');if(position==='issuer-ack'&&settings.mode==='unbranded')throw primary;return JSON.stringify(v);}\n function readSdk(){return null;}\n async function wait(p){effects.push('wait');if(position==='issuer-ack'&&settings.mode==='pair_abort')throw primary;return await p;}\n async function observeOwnerPhasePair(){\n  effects.push('pair');\n  if(position==='issuer-ack'&&settings.mode==='pair_wait')throw primary;\n  if(position==='issuer-ack'&&settings.mode==='nested_scope'&&!nestedDone){nestedDone=true;await recheckOwned();}\n  if(position==='issuer-ack'&&settings.mode==='late_scope'&&!nestedDone){nestedDone=true;queueMicrotask(()=>recheckOwned().catch(()=>{}));}\n  return settings.mode==='expected_mismatch'&&position==='issuer-ack'?{first:{SYN:true},second:expected}:{first:expected,second:expected};\n }\n function retain(p){effects.push('retain');return p;}\n function issuerSeal(kind,v){effects.push('seal:'+kind);return {...v,recordHash:'SYN'};}\n function digest(){return 'SYN';}\n async function issuerAppend(kind,record,op){effects.push('append:'+kind);expected.records.issuer.operations[op][kind.toLowerCase()]=record;if(kind==='Ack'&&settings.mode==='protocol_guard')settled=false;}\n";
+const VM_TAIL="\n globalThis.control=(async()=>{let caught=null,returned=[];try{for(const op of settings.operations) {postChecks=0;expected.records.issuer.operations[op]={send:null,ack:null};returned.push(await issuerCall(op,{deadline:123},()=>op==='consume'?{id:'SYN'}:{status:'applied',row:{id:'SYN'}}));}}catch(e){caught=e;}await Promise.resolve();return {caught,returned,snapshot:__afwPostAckSnapshot(),effects,slotEmpty:__paSlot===null};})();\n";
+
+const syntheticContext=()=>({repository:REPOSITORY,ref:REF,source:'0'.repeat(40),run:'1',attempt:1,case:'R2'});
+const syntheticProvenance=c=>({status:'verified',context:c,stage:'actual_configured',profile:POST_ACK_PROFILE,allocationIdentity:1,ownedAllocationIdentity:1,lifecycleComplete:true,successfulMount:true,actualOptionsVerified:true,modelOnly:false,sdkFileSha256:'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80',sdkBytes:251149,sdkSites:44,lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64),emissions:2});
+function selectSynthetic(snapshot,options={}){const context=syntheticContext();return selectPostAckCertificate({snapshots:[{role:'QA',reason:'terminal-owned-before-dispose',allocationIdentity:1,snapshot}],mountedProvenance:syntheticProvenance(context),originalR2Outcome:'failed',context,...options});}
+let cachedControlInputs;
+async function controlInputs(){
+ if(cachedControlInputs)return cachedControlInputs;
+ assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
+ const source=await readFile(PHASE,'utf8'),transformed=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}),a=ast(transformed.source,PHASE),functions=[];
+ const visit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall')functions.push(n);ts.forEachChild(n,visit);};visit(a);assert.equal(functions.length,1);
+ const issuer=functions[0],parent=issuer.parent.statements,recheck=parent.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(a).includes('__paToken'));assert(recheck);
+ const prelude=a.statements.filter(n=>ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>['__paIdentity','__paCollector'].includes(d.name.getText(a)))||ts.isFunctionDeclaration(n)&&['__paInvalid','__paBegin','__paBrand','__paEmit','__afwPostAckSnapshot'].includes(n.name?.text)).map(n=>n.getText(a).replace(/^export /,'')).join('\n');
+ const preflight=JSON.parse(await readFile('output/finite-budget/post-ack-private/preflight.json','utf8'));
+ const rawAst=ast(source,PHASE),rawFunctions=[];const rawVisit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall')rawFunctions.push(n);ts.forEachChild(n,rawVisit);};rawVisit(rawAst);assert.equal(rawFunctions.length,1);const rawIssuer=rawFunctions[0],rawRecheck=rawIssuer.parent.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(rawAst).includes('requireEmptyNotice(expected)'));assert(rawRecheck);
+ cachedControlInputs={source,transformed,prelude,recheck:recheck.getText(a),issuer:issuer.getText(a),originalRecheck:rawRecheck.getText(rawAst),originalIssuer:rawIssuer.getText(rawAst),preflight};return cachedControlInputs;
+}
+async function simulate(mode='ok',operations=['grant'],original=false){
+ const {prelude,recheck,issuer,originalRecheck,originalIssuer}=await controlInputs(),primary=Error('SYN original local object'),effects=[],settings={mode,operations},context=createContext({settings,primary,effects,structuredClone,Promise,Error,JSON,Map,Set,queueMicrotask,Miniflare:class{constructor(){throw Error('allocation forbidden');}},createI0(){throw Error('I0 forbidden');}});
+ const program=prelude+VM_SETUP+(original?originalRecheck:recheck)+'\n'+(original?originalIssuer:issuer)+VM_TAIL;
+ if(mode==='observer_throws')context.settings.mode='expected_mismatch';
+ let code=program;if(mode==='observer_throws')code=code.replace('__paCollector.records.push({invocationOrdinal:','(()=>{throw Error("SYN observer");})();__paCollector.records.push({invocationOrdinal:');
+ new Script(code).runInContext(context,{timeout:1000});const value=await context.control;
+ return {caughtSame:value.caught===primary,caught:value.caught,returned:JSON.parse(JSON.stringify(value.returned)),snapshot:JSON.parse(JSON.stringify(value.snapshot)),effects:[...effects],slotEmpty:value.slotEmpty};
+}
+const tokens=new WeakMap();let activeControl=null;
+function complete(id){assert.equal(activeControl,id);const token=Object.freeze({});tokens.set(token,id);return token;}
+function completionBarrier(rows){assert.deepEqual(rows.map(r=>r.id),IDS);const seen=new Set();for(const r of rows){assert(!seen.has(r.id)&&tokens.get(r.token)===r.id,'authentic exactly-once completion');seen.add(r.id);}assert.equal(seen.size,24);}
+
+const REGISTRY=Object.freeze([
+ ['off_graphs',async()=>{const {preflight:p}=await controlInputs();assert.equal(p.stage,'MODEL ONLY');assert.equal(p.offGraphs.length,2);for(const r of p.offGraphs){assert(r.equal&&r.sameCapturedInputs&&r.sameDefines);assert.equal(r.baselineSha256,r.candidateSha256);assert.equal(r.baselineBytes,r.candidateBytes);}assert.equal(p.offGraphs.find(r=>r.role==='QA').originalAdditionalSYN,3);assert.equal(p.mfAllocated,false);assert.equal(p.I0Created,false);return complete('off_graphs');}],
+ ['sdk_pins',async()=>{const {preflight:p}=await controlInputs();const sdk=await readFile('node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js');assert.equal(sdk.length,251149);assert.equal(sha(sdk),p.sdkFileSha256);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');const f7=await readFile('.github/workflows/afw-finite-budget-qualification.yml');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+f7.length+'\0'),f7])).digest('hex'),'f7a71f1a0fa4f5ddf069ff411f008a098455e5cc');return complete('sdk_pins');}],
+ ['profile_scope',async()=>{const {source}=await controlInputs();assert.deepEqual(transformPostAckEmission({role:'M',modulePath:PHASE,source,identity:syntheticContext()}),{source,record:null});assert.throws(()=>transformPostAckEmission({role:'other',modulePath:PHASE,source,identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:{...syntheticContext(),attempt:2}}));return complete('profile_scope');}],
+ ['sites_exact',async()=>{const {source,transformed}=await controlInputs();assert.equal(transformed.record.sites.protocol_invariant,5);assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source:source.replace('requireEmptyNotice(expected);','requireEmptyNotice(expected);requireEmptyNotice(expected);'),identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source:source.replace("await issuerAppend('Ack',ack,op);",""),identity:syntheticContext()}));return complete('sites_exact');}],
+ ['sealer_graph',async()=>{const {preflight:p}=await controlInputs();const records=p.supplement.records,baseline=records.map(r=>({role:'QA',path:r.path,emittedBytes:r.baselineBytes,emittedSha256:r.baselineSha256})),args={records,baseline,identity:p.context,metafile:{inputs:{}}};validatePostAckSupplement(args);assert.throws(()=>validatePostAckSupplement({...args,records:records.slice(1)}));assert.throws(()=>validatePostAckSupplement({...args,records:[...records,records[0]]}));assert.throws(()=>validatePostAckSupplement({...args,baseline:baseline.map((r,i)=>i? r:{...r,emittedSha256:'f'.repeat(64)})}));assert.throws(()=>validatePostAckSupplement({...args,metafile:{inputs:{'test/fixtures/finite-post-ack-diagnostic.mjs':{}}}}));return complete('sealer_graph');}],
+ ['lexical_op',async()=>{const s=await simulate('expected_mismatch',['consume']);assert(s.caughtSame);assert.equal(s.snapshot.records[0].operation,'consume');const other=await simulate('expected_mismatch',['authorization']);assert.equal(other.snapshot.records.length,0);return complete('lexical_op');}],
+ ['one_shot',async()=>{const s=await simulate('ok',['consume','grant']);assert(s.slotEmpty);assert.equal(s.snapshot.invoked,2);assert.deepEqual(s.snapshot.records.map(r=>r.operation),['consume','grant']);assert.equal(s.snapshot.pending,0);return complete('one_shot');}],
+ ['nested_scope',async()=>{const s=await simulate('nested_scope');assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,1);assert.equal(s.snapshot.completed,1);assert.equal(s.snapshot.pending,0);return complete('nested_scope');}],
+ ['late_scope',async()=>{const s=await simulate('late_scope');assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,1);assert(s.slotEmpty);return complete('late_scope');}],
+ ['entry_check',async()=>{const s=await simulate('entry_check');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'entry_check');return complete('entry_check');}],
+ ['notice_guard',async()=>{const s=await simulate('notice_guard');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'notice_guard');return complete('notice_guard');}],
+ ['protocol_guard',async()=>{const s=await simulate('protocol_guard');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'protocol_invariant');return complete('protocol_guard');}],
+ ['pair_wait',async()=>{const s=await simulate('pair_wait');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'pair_wait');return complete('pair_wait');}],
+ ['expected_mismatch',async()=>{const s=await simulate('expected_mismatch');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'expected_mismatch');assert.equal(selectSynthetic(s.snapshot).status,'observed');return complete('expected_mismatch');}],
+ ['exit_check',async()=>{const s=await simulate('exit_check');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'exit_check');return complete('exit_check');}],
+ ['unbranded',async()=>{const s=await simulate('unbranded');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'unknown');return complete('unbranded');}],
+ ['same_error',async()=>{for(const mode of ['entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded']){const s=await simulate(mode);assert(s.caughtSame);assert.equal(s.snapshot.records[0].sameError,true);}return complete('same_error');}],
+ ['observer_throws',async()=>{const s=await simulate('observer_throws');assert(s.caughtSame);assert.equal(s.snapshot.invalid,true);assert.equal(selectSynthetic(s.snapshot).status,'invalid');return complete('observer_throws');}],
+ ['same_effects',async()=>{for(const mode of ['ok','entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded']){const observed=await simulate(mode),original=await simulate(mode,['grant'],true);assert.deepEqual(observed.effects,original.effects);assert.equal(observed.caughtSame,original.caughtSame);assert.deepEqual(observed.returned,original.returned);}const s=await simulate('ok');assert.equal(s.caught,null);assert.deepEqual(s.returned,[{id:'SYN'}]);assert.equal(s.effects.filter(x=>x==='retain').length,1);assert.equal(s.effects.filter(x=>x==='append:Ack').length,1);assert.equal(s.effects.filter(x=>x==='append:Send').length,1);const {source}=await controlInputs(),emission=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}).source;const count=(text,pattern)=>(text.match(pattern)??[]).length;assert.equal(count(emission,/\bawait\b/g),count(source,/\bawait\b/g));assert.equal(count(emission,/Promise\./g),count(source,/Promise\./g));return complete('same_effects');}],
+ ['pair_orders',async()=>{for(const mode of ['pair_wait','pair_abort']){const s=await simulate(mode);assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'pair_wait');}return complete('pair_orders');}],
+ ['no_rejection',async()=>{const s=await simulate();assert.equal(selectSynthetic(s.snapshot).status,'not_observed');const foreign=structuredClone(s.snapshot);foreign.identity.run='2';assert.equal(selectSynthetic(foreign).status,'invalid');const unavailable=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:'unavailable',context:syntheticContext()});assert.equal(unavailable.status,'unavailable');assert.equal(unavailable.custody.status,'unavailable');assert.throws(()=>completionBarrier([]));assert.throws(()=>completionBarrier(IDS.map(id=>({id,token:{}}))));assert.throws(()=>completionBarrier(IDS.slice(1).map(id=>({id,token:null}))));return complete('no_rejection');}],
+ ['overflow',async()=>{const s=await simulate('ok',Array.from({length:33},()=> 'grant'));assert.equal(s.snapshot.overflow,true);assert.equal(selectSynthetic(s.snapshot).status,'invalid');const r=await simulate('expected_mismatch');const bad=structuredClone(r.snapshot);bad.records.push({...bad.records[0],invocationOrdinal:2});bad.invoked=2;bad.completed=2;assert.equal(selectSynthetic(bad).status,'invalid');return complete('overflow');}],
+ ['schema',async()=>{const c=syntheticContext(),v={purpose:PURPOSE,status:'observed',context:c,provenance:{status:'verified',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1',sdkFileSha256:'0'.repeat(64),lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64)},selection:'unique_qualified_rejection',invocationOrdinal:1,operation:'grant',ackReturned:true,postAckEntered:true,outcome:'rejected',boundary:'expected_mismatch',quality:'qualified',originalR2Outcome:'failed',custody:unavailableCustody(),...Object.fromEntries(FLAGS.map(k=>[k,false]))};validatePostAckResult(v,c);const bytes=JSON.stringify(observationProjection(v));assert.equal(Buffer.byteLength(bytes),1221);assert.equal(sha(bytes),'47a77ac116e8d5514defb5fa615de87bf01e16968d30254a8754f389be59a005');assert.equal(observationHash(Object.fromEntries(Object.entries(v).reverse())),sha(bytes));for(const key of FLAGS)assert.throws(()=>validatePostAckResult({...v,[key]:true},c));assert.throws(()=>validatePostAckResult({...v,extra:true},c));assert.notEqual(observationHash({...v,originalR2Outcome:'passed'}),sha(bytes));assert.notEqual(observationHash({...v,context:{...c,run:'2'}}),sha(bytes));assert.notEqual(observationHash({...v,provenance:{...v.provenance,preflightSha256:'f'.repeat(64)}}),sha(bytes));return complete('schema');}],
+ ['provenance',async()=>{const s=await simulate('expected_mismatch'),c=syntheticContext(),p=syntheticProvenance(c);for(const edit of [{stage:'MODEL ONLY'},{modelOnly:true},{actualOptionsVerified:false},{lifecycleComplete:false},{successfulMount:false},{ownedAllocationIdentity:2},{emissions:1},{sdkSites:43},{sdkFileSha256:'f'.repeat(64)},{context:{...c,run:'2'}},{context:{...c,source:'f'.repeat(40)}}])assert.equal(selectSynthetic(s.snapshot,{mountedProvenance:{...p,...edit}}).status,'invalid');const pass=selectSynthetic(s.snapshot,{originalR2Outcome:'passed'});assert.equal(pass.originalR2Outcome,'passed');assert.equal(pass.custody.status,'unavailable');assert.throws(()=>validatePostAckResult({...pass,custody:{status:'verified',artifactId:'1',zipSha256:'0'.repeat(64),observationSha256:'f'.repeat(64),reopenVerified:true}},c));return complete('provenance');}]
+]);
+export async function runPostAckObserverControls(){
+ assert.deepEqual(REGISTRY.map(([id])=>id),IDS);assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
+ const rows=[];let failed=null;
+ for(const [id,callback]of REGISTRY){assert.equal(activeControl,null);activeControl=id;try{const token=await callback();assert.equal(tokens.get(token),id,'callback-owned post-final-assertion completion');rows.push({id,token});}catch{failed=id;throw Error('post_ack_control_failed:'+id);}finally{activeControl=null;}}
+ completionBarrier(rows);const result={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed:24,pass:24,fail:0,inventory:[...IDS],firstFailure:failed,postAssertionExactlyOnce:true,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};assert(Buffer.byteLength(JSON.stringify(result))<=2048);return result;
+}
+
+const PROGRAM_PATHS=["test/fixtures/finite-budget-world.mjs","test/fixtures/finite-post-ack-diagnostic.mjs","test/finite-post-ack-diagnostic.test.mjs",".github/workflows/afw-r2-post-ack-contracts.yml",".github/workflows/afw-r2-post-ack-diagnostic.yml",".github/workflows/afw-finite-budget-qualification.yml","package-lock.json","lib/mcp-qa-finite-owner-phase-context.mjs","test/fixtures/finite-initial-entry-world.mjs","test/fixtures/finite-checkpoint-custody.mjs"];
+
+function executionContext(){return identity({repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:Number(process.env.GITHUB_RUN_ATTEMPT),case:'R2'});}
+async function currentPrograms(){const files=[];for(const path of PROGRAM_PATHS){const b=await readFile(path);files.push({path,bytes:b.length,sha256:sha(b)});}return files;}
+async function writeProof(result){
+ const context=executionContext(),root='output/finite-budget/post-ack-safe';await mkdir(root,{recursive:true});const bytes=Buffer.from(JSON.stringify(result));assert(bytes.length<=60000);await writeFile(root+'/result.json',bytes);
+ const manifest={purpose:'afw.native-post-ack-r2-manifest.safe.v1',context,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]};const m=Buffer.from(JSON.stringify(manifest));assert(m.length+bytes.length<=65536);await writeFile(root+'/manifest.json',m);
+}
+async function contractsProof(){
+ assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const context=executionContext(),controls=JSON.parse(await readFile('output/finite-budget/post-ack-private/controls.json')),p=JSON.parse(await readFile('output/finite-budget/post-ack-private/preflight.json'));
+ assert.equal(controls.pass,24);assert.deepEqual(controls.inventory,IDS);assert.deepEqual(p.context,context);
+ const related=JSON.parse(await readFile('output/finite-budget/pure/controls.json'));assert.equal(related.passed,true);assert.deepEqual(related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);
+ await writeProof({purpose:'afw.post-ack-contracts.safe.v1',context,controls,programs:await currentPrograms(),preflight:{purpose:p.purpose,profile:p.profile,stage:p.stage,offGraphs:p.offGraphs,supplement:p.supplement,sdkFileSha256:p.sdkFileSha256,sdkBytes:p.sdkBytes,sdkSites:p.sdkSites,lockBlob:p.lockBlob,lockSha256:p.lockSha256,worldSha256:p.worldSha256,transformSha256:p.transformSha256,preflightSha256:sha(await readFile('output/finite-budget/post-ack-private/preflight.json'))},related:{purpose:related.purpose,groups:related.groups.map(g=>({group:g.group,passed:g.passed,evidence:g.evidence,caseCount:g.caseCount})),passed:true},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false});
+}
+async function verifyProof(native){
+ assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const root=process.env.RUNNER_TEMP+'/afw-post-ack-proof',raw=await readFile(root+'/result.json'),mraw=await readFile(root+'/manifest.json'),m=JSON.parse(mraw),context=executionContext();
+ ordinary(m,['purpose','context','files']);assert.equal(m.purpose,'afw.native-post-ack-r2-manifest.safe.v1');assert.deepEqual(m.context,context);assert.equal(m.files.length,1);ordinary(m.files[0],['path','bytes','sha256']);assert.equal(m.files[0].path,'result.json');assert.equal(m.files[0].bytes,raw.length);assert.equal(m.files[0].sha256,sha(raw));assert(raw.length+mraw.length<=65536);const r=JSON.parse(raw);
+ if(native){validatePostAckResult(r,context);assert.equal(r.custody.status,'verified');assert.equal(r.provenance.status,'verified');assert(['observed','not_observed'].includes(r.status));const metadata=await artifactMetadata(r.custody.artifactId);assert.equal(metadata.digest,'sha256:'+r.custody.zipSha256);assert.equal(r.custody.observationSha256,observationHash(r));}
+ else{
+  ordinary(r,['purpose','context','controls','programs','preflight','related',...FLAGS,'nativeExecuted','mfAllocated','I0Created']);assert.equal(r.purpose,'afw.post-ack-contracts.safe.v1');assert.deepEqual(r.context,context);assert.deepEqual(r.programs,await currentPrograms());assert.equal(r.controls.purpose,'AFW_POST_ACK_CONTROLS/1');assert.deepEqual(r.controls.inventory,IDS);assert.equal(r.controls.expected,24);assert.equal(r.controls.completed,24);assert.equal(r.controls.pass,24);assert.equal(r.controls.fail,0);assert.equal(r.controls.firstFailure,null);assert.equal(r.controls.postAssertionExactlyOnce,true);assert.equal(r.related.passed,true);assert.deepEqual(r.related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);for(const g of r.related.groups)assert.equal(g.passed,true);for(const f of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.equal(r[f],false);assert.equal(r.preflight.stage,'MODEL ONLY');for(const graph of r.preflight.offGraphs){assert.equal(graph.equal,true);assert.equal(graph.baselineSha256,graph.candidateSha256);}assert.equal(r.preflight.supplement.records.length,2);assert.equal(r.preflight.supplement.nodeModuleAbsent,true);
+ }
+ console.info(JSON.stringify({purpose:'afw.post-ack-independent-verdict.safe.v1',context,nativeCertificate:native,valid:true,operationalReadiness:false,completePackage:false,PCoff:false}));
+}
+async function artifactMetadata(id){
+ assert(/^[1-9][0-9]*$/.test(id));const r=await fetch('https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/'+id,{headers:{Authorization:'Bearer '+process.env.GITHUB_TOKEN,Accept:'application/vnd.github+json'},redirect:'error',signal:AbortSignal.timeout(10000)});assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),id);assert.equal(m.expired,false);assert.equal(String(m.workflow_run.id),process.env.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,process.env.GITHUB_SHA);assert(/^sha256:[a-f0-9]{64}$/.test(m.digest));return m;
+}
+async function sealNative(){
+ const {cp}=await import('node:fs/promises'),{join}=await import('node:path'),{sealDirectory}=await import('./finite-checkpoint-custody.mjs');const root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),payload=join(root,'payload');
+ await mkdir(payload,{recursive:true});const privateRoot='output/finite-budget/post-ack-private';let manifest;
+ try{manifest=JSON.parse(await readFile(privateRoot+'/job-manifest.json'));}catch{return;}
+ assert.deepEqual(manifest.context,executionContext());assert.equal(manifest.diagnosticOnly,true);assert.deepEqual(manifest.cases,['R2']);if(manifest.preallocationBlocked)return;
+ await cp('output',join(payload,'output'),{recursive:true,errorOnExist:true,force:false});await cp(join(root,'logs'),join(payload,'logs'),{recursive:true,errorOnExist:true,force:false});
+ const kind=manifest.originalR2Outcome==='passed'?'readonly-result':'consumer-failure';assert.equal(manifest.kind,kind);
+ const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:REPOSITORY,ref:REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind};
+ await sealDirectory({sourceDir:payload,stagingDir:join(root,'cipher'),context});
+ await writeFile(join(root,'kind.txt'),kind);
+}
+async function reopenNative(){
+ const {join}=await import('node:path'),{openDirectory}=await import('./finite-checkpoint-custody.mjs'),root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),kind=(await readFile(join(root,'kind.txt'),'utf8')).trim(),id=process.env.CIPHER_ARTIFACT_ID,metadata=await artifactMetadata(id);
+ assert.equal(metadata.name,'afw-post-ack-cipher-'+process.env.GITHUB_RUN_ID+'-1');
+ const zip=await readFile(join(root,'cipher.zip'));assert.equal('sha256:'+sha(zip),metadata.digest);
+ const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:REPOSITORY,ref:REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind};
+ await openDirectory({stagingDir:join(root,'download'),destinationDir:join(root,'opened'),context});
+ const original=JSON.parse(await readFile('output/finite-budget/post-ack-private/observation.json')),restored=JSON.parse(await readFile(join(root,'opened/output/finite-budget/post-ack-private/observation.json'))),manifest=JSON.parse(await readFile(join(root,'opened/output/finite-budget/post-ack-private/job-manifest.json')));
+ assert.deepEqual(original,restored);validatePostAckResult(restored,executionContext());assert.deepEqual(manifest.context,executionContext());assert.equal(manifest.originalR2Outcome,restored.originalR2Outcome);assert.equal(manifest.kind,kind);
+ assert.notEqual(restored.originalR2Outcome,'unavailable');await writeFile(join(root,'reopen.json'),JSON.stringify({status:'verified',artifactId:id,zipSha256:sha(zip),observationSha256:observationHash(restored),reopenVerified:true}));
+}
+async function nativeProof(){
+ let result;try{result=JSON.parse(await readFile('output/finite-budget/post-ack-private/observation.json'));}catch{result=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:'unavailable',context:executionContext()});}
+ try{const custody=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-post-ack-native/reopen.json'));if(result.originalR2Outcome!=='unavailable')result={...result,custody};}catch{}
+ validatePostAckResult(result,executionContext());await writeProof(result);assert.equal(result.custody.status,'verified');assert.equal(result.provenance.status,'verified');assert(['observed','not_observed'].includes(result.status));
+}
+if(process.argv[1]&&process.argv[1].replaceAll('\\','/').endsWith('/finite-post-ack-diagnostic.mjs')){
+ const [command]=process.argv.slice(2);
+ try{
+  if(command==='contracts-proof')await contractsProof();
+  else if(command==='verify-contracts')await verifyProof(false);
+  else if(command==='verify-native')await verifyProof(true);
+  else if(command==='seal-native')await sealNative();
+  else if(command==='reopen-native')await reopenNative();
+  else if(command==='native-proof')await nativeProof();
+  else throw Error('unsupported fixed diagnostic command');
+ }catch{console.error('post_ack_closed_command_failed');process.exitCode=1;}
+}
~~~~~~~~~~~~

## Final failed/closed Source report excerpt

d Source/runner custody and mounted options are not remote attestation. Actual qualification/result/artifact/final closure evidence follows in a new append after the sole attempt. NOT EXECUTED: Native R2, CF remote runtime, I0, MF, PC-off, Native16, Max, production/OAuth/customer resources.


### Sole KEYLESS attempt FAILED — permit consumed; no repair or retry

Implementation commit6599b33dd71df6a61da25e5c9a35c1e299623433/tree d674d8916eb0d28005118e389103b03eb190510f was exact-readback on all six paths with3194leaves/3188protected. Sole activation commit4e37de51d64a715a7e1be879314d7468938bf15f/tree1cf17fb6220828a20bb99405bee94e2167e398df changed ONLY contracts workflow events/runlabel/two gates. Active WF6555UTF8bytes/Gitblob7f667bde66ab26858487a9b88ed492690f02a664/SHA2561589c1a1b1cd42c062edddfffc6248eb8316c4db03e055fadbb4387a1d75d57d; all other frozen file hashes above unchanged. Pre-event five active state counts0.

ACTUAL run43325790437/attempt1/push/currenthead4e37de51d64a715a7e1be879314d7468938bf15f at2026-11-12T23:05:20Z: contracts producer131557776153 FAILURE; verify131558005612 SKIPPED. Install exact lock and identity/blob pins succeeded. Command AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs ran1node:test wrapper:0pass/1fail/0skip/0cancel,3529.524019ms. Failure occurred in current compile-only QA transform preflight before runPostAckObserverControls() and before24callbacks. Closed error: fixed-finite-budget-QA plugin assertion Expected values to be strictly equal:6 !== 5. No cause beyond this assertion is established; changing the source needs a separate Root fix-loop and new permit. This is not ACTUAL GREEN or24controls qualified. Related fixed F1–F8 and pure diagnostics/observer tests were SKIPPED, no fabricated counts/witness. Complete prior source in implementation/activation commits remains recoverable for independent review.

Artifact inventory for this run:[] (none uploaded; no ID/bytes/digest/expiry). No current same-input OFF identity proof, successful two-emission supplement, SAFE proof, independent certificate, Native result or custody proof was produced. The workflow's generic T2 native-stage/harness-error-disposed log labels occurred on budgetCompileOnly=true with mf/persist/pair null; they do not evidence an allocation, disposal or Native execution. This task executed no SDK runtime, MF, I0, key, Native R2, CF call, OAuth/customer resource or secret read. Only bounded closed KEYLESS failure output was inspected; no private Native producer logs or cipher downloaded.

Per explicit failure rollback, prepared closure restores World EXACT original5fb78c057b7e80260ae683abf4af892767ce110e and contracts EXACT held15d081b490014bdd5393ed376f70f326e86cd836 (manual/noinputs/nopush/twofalse). Native workflow stays6443a747df3f17c2adcbce6d6037dcc6f4ba364a/manual/noinputs/nopush/twofalse; F7staysf7a71f1a0fa4f5ddf069ff411f008a098455e5cc/sevenfalse. New fixture08f9034068b937e18543fb569bfd88720a2822a8 and test2b514944054c9e0679527062ff148bd6764f9728 stay reviewable, INCOMPLETE/UNQUALIFIED; no PR/main/merge/deploy/publish. Original report507875char prefix plus initial append preserved verbatim. No repair, second run, rerun, hidden qualification or Native activation is authorized. Final full readback follows closure CAS and is separately recorded below. All five readiness flags remainfalse; broader AFW Native16/cloud-PCoff/Max remainsPENDING.


### Failure closure readback and STOP

Verified closed Source79afec4178bbc82db2192d75619bbd4f36aaddf0/tree e4da5e528bdf27bbf96379e33572a30a1618feea by full nontruncated recursive readback:3194leaves; all3188protected old leaves exact. World original5fb78c057b7e80260ae683abf4af892767ce110e/218113chars restored exactly; contracts15d081b490014bdd5393ed376f70f326e86cd836/6453chars manual/noinputs/nopush/twofalse; Native6443a747df3f17c2adcbce6d6037dcc6f4ba364a/12093chars manual/noinputs/nopush/twofalse; F7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209chars unchanged/sevenfalse. Fixture08f9034068b937e18543fb569bfd88720a2822a8/47711chars and test2b514944054c9e0679527062ff148bd6764f9728/1643chars exact; both UNQUALIFIED. Full Source files plus F7 re-read byte/character-exact. Report16d1f57d1cec2e6ab43083b7b296f4c0306dc9cf/530341chars at closure preserved all original507875chars and every appended prefix verbatim; this final receipt is append-only.

Main independently unchanged0c9c475b3ebaa970fc11d628b40e50a90cceb727. ExactlyONE run on activation head,43325790437/attempt1/completedfailure; producer131557776153failure/verifier131558005612skipped. All five repository active-state counts queued/in_progress/waiting/pending/requested=0 after closure. No attempt2/repair/secondqualification/Native dispatch. Git objects retain rollback and unique evidence. This final receipt commit changes REPORT ONLY; final branch/ref/tree/files/main/active0 are read back again after it. StatusBLOCKED: initial qualification failed with explicit6!==5 site-inventory assertion; sole permit consumed, no ACTUALGREEN and no Native release. STOP.


## Controller questions for this task-scoped review

Return BOTH spec-compliance and code-quality verdicts. Findings Critical/Important/Minor with exact code file:line. Confirm actual composed-transform mismatch causally from original/current transform code; do not propose merely loosening expected site count. Check callback authenticity/noninterference, typed selector/hash/provenance, complete inactive pipeline/custody/headroom, and original result preservation. Do not infer absence of evidence as nonexistent evidence beyond the explicitly failed run. For a concrete cut-off function risk, read the exact file at frozen6599 or protected baseline408; name that risk. Do not crawl unrelated project code, mutate, run Source or request new trial.
