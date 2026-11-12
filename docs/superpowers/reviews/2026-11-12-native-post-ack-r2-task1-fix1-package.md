# Task1 fix round1/5 — scoped re-review package

Read-only original reviewer re-review. OriginalreviewC1/C2/I1–I5 at docs/superpowers/reviews/2026-11-12-native-post-ack-r2-task1-review.md.
FIX_BASE = previousreviewFROZEN6599b33dd71df6a61da25e5c9a35c1e299623433 (NOTefa4 rollback).
FIX_CODE_HEAD384b36d88984dddfbd4ea6c32fc0b79867974933; actualKEYLESS4ceaeaf4f98c6595844f3e0c405cc9803bc98135; CURRENTclosed2910fcdc512497e54da286b477c8662be7721fcc. Fullnormalizedactivationbodymatchesfixedheldcandidate. BothnewWFmanual/allfalse/F7unchanged/root0active.
Brief docs/superpowers/briefs/2026-11-12-native-post-ack-r2-task1-fix1.md @d444b01ea196a0402a0ab6abba40796048c54894 includesN6modelartifact/N7opt-in amendments (uncompressedcapclarification thereafter @836894c1e2a8afae9dbee283e86b32e3c0520581). SPECbindingsN1–N7. No Nativepermit.
Implementerreport SAME Source docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md @2910fcdc, readappendafter531979charprefix to569273end (37294chars). It containsfinding-by-findingchanges,commandsandactualoutputs. Initial reportpatchbelow alsoincludesmetadata history; no needold507875history.
PrimaryRootaudit docs/superpowers/reviews/2026-11-12-native-post-ack-r2-fix1-primary.md inthisRootdocscommit. NOtestsrerun: BothjobsSuccess/24names+oneframeworkwrapper/F1–F8+17pure/strictZIP/11programhasheschecked. NewmodelartifactwasreadinRunneronly; RootdownloadedONLYSMALLSAFE.

## Accepted implementation rulings affecting review

N6 authorizesONEsanitizedMODELartifact model.json+protectedmanifest,7d,rawANDuncompressed4MiB/manifest65536/exact2JSON, realuploaderID/digest→API/rawcomparison→protectedreadback. ImmutableModeldir; separateprivatecomposedinputsnotuploaded. IndependentverifierdownloadssanitizedMODEL tobindpreflightfilehash/pins; Rootmetadataonly. NoNative/extraRun/Sourcepathauthority.
N7 makes labtest absent/emptymodeINERT/no registration/no proof/keycontextcheck; explicitcontrolsone24callbackwrapperrequiresrealMODEL; explicitnativeONEstrictR2; unknownnonemptyrejects. Dedicatedcommandunchanged; genericCInotbroken/nofakeassignment/qualification.
C2 fixedprivateR2assertionoraclecopywithfrozenprotectedtestpin permitted because importingprotectedtestregisters3Nativecases; noprotectedtestedit,ONEresultonly,21predicatefamilies. Originalsuccess/errorindependentofevidence. AllotherSPECclock/guard/baseline/privateflags constraintsunchanged.
M1deferredMinoronly; normalizationmaynaturallyaddresswithI4, notloopgate.

## Findings under verification (verbatim recorded review)

# Task1 independent review — initial failed candidate

SpecCompliance: FAIL. TaskQuality: CHANGES REQUIRED. Native remains held.
Reviewed frozen candidate6599b33dd71df6a61da25e5c9a35c1e299623433. Run43325790437/1 failed before the first named callback. The verifier and related tests were skipped. No SAFE artifact was produced. Closureefa4bd8b restored the original World as required. Reviewer /root/native_postack_task1_review, Astra/xhigh, read-only/no execution or mutation.

## Critical

C1. The composed transform misclassifies the expected mismatch.
The raw phase has five protocol predicates and one pair comparison. The existing compiler rewrites the first property read before invoking the diagnostic. The diagnostic then searches for literal canonical(pair.first) and counts the comparison as a sixth protocol predicate. Increasing the expected count would preserve the misclassification. Match the composed comparison structurally and preserve its original predicate, short-circuit evaluation, and error.
Anchors: lib/mcp-qa-finite-owner-phase-context.mjs706; World430/778; fixture43–48/78/155. Existing World20,203,430–431,569,613 instruments first as readMethod.

C2. The inactive adapter can certify an original R2 pass without the original assertions.
World marks the helper’s return as passed. The protected test subsequently checks completed writes,201inputs,correlations,expiration,unchanged foreign data,replay,pending work,response status and reference rows. The new single test omits those checks. Retain the R2-specific assertions on its one result.
Anchors: World1983; test/finite-post-ack-diagnostic.test.mjs23; protected test/mcp-qa-finite-budget-native.test.mjs103–113,120.

## Important

I1. Original outcome and diagnostic failure interfere.
World requires successful disposal and terminal capture to recognize a primary rejection. Selection or persistence can then throw before the original object is rethrown. Conversely, invalid observation throws from the command after a known success. Preserve the positively recorded business outcome and its error independently of every evidence operation.
Anchor: World1984–1996; fixed adapter contract returns normally on original success and rethrows same original object on failure, while proof/verifier own evidence failure.

I2. A pre-MF headroom refusal can enter Native sealing.
persistAttached becomes true before the final timing assertion. If that assertion throws, the manifest reports preallocationBlocked:false and sealNative encrypts the partial output. The protected harness has yet to construct MF. Track actual MF attachment separately from scratch ownership. Also reject a job start later than the official response time.
Anchors: World828/1994; fixture214–218; Native workflow45.

I3. The24callbacks do not prove the claimed observer behavior.
They extract raw functions and reapply the diagnostic, skipping the compiler composition that failed. Side-effect checks record names without verifying argument,receiver or promise identity. The pair and late controls do not exercise both settlement orders or a later operation in flight. Private tokens correctly reject ordinary forgeries,but two tokens can be issued for one callback,and the negative tests never replace a callback with a no-op through the real runner.
Anchors: fixture131–144;147–149;159–160;170–172. Missing/forged arrays alone are not no-op execution counterexamples.

I4. Emission and default-OFF proofs are incomplete.
The supplement accepts absent metafile inputs and arbitrary well-formed emitted/literal hashes,and omits closed version,field and enum checks. The two OFF builds are compared with each other,but their QA records are not compared to the ON build’s pre-diagnostic records. The model inventory is sealed in a directory later modified and no verifyBudgetArtifact readback consumes it.
Anchors: fixture74–80; World1958–1969; test15/World1994 later change sealed directory.

I5. The independent verifier accepts incomplete proof.
An empty offGraphs array satisfies its loop. Nested control flags,full emission fields,and model hashes are insufficiently checked. The Native result validator checks hash syntax without independently binding available SDK,lock,and transform pins to the checkout. Both workflows publish only the artifact ID,so the uploader digest is absent from the required three-way comparison. The Native verifier also lacks the assigned cipher ID and original command outcome needed for reconciliation.
Anchors: fixture198–208; contracts workflow16–17,106–110; Native workflow19–20,176–179,198–202,218–221.

## Minor (deferred; not a fix-loop extender)

M1. The OFF comparison relies on insertion order in maps populated by asynchronous module loads. Compare records by role and path after asserting uniqueness to avoid a scheduling-dependent false failure.
Anchors: World778–779,1959.

## Verified strengths

The lexical slot is consumed before the first await. The collector retains primitive records. The canonical N3 projection and known-answer vector are present. The candidate uses existing ownership and both configured worker checks,labels model hashes separately,and scopes the key to three terminating steps. The failed-run report accurately disclaims qualification. This review executed no code,read no private Native evidence and changed no resources.


## Actual primary summary

{
  "wholeManifest": true,
  "currentContext": true,
  "controlNames": 24,
  "controlRecordBytes": 679,
  "frameworkWrapper": 1,
  "relatedGroups": 8,
  "relatedCases": 22,
  "pureTests": 17,
  "originalOracleCounterexamples": 21,
  "exactTwoRolesOFFON": true,
  "modelReceiptMetadata": true,
  "modelDownloadedByRoot": false,
  "all11ProgramsHashVerified": true,
  "strictZIPCRC": true,
  "SourceExecuted": false,
  "NativeExecuted": false,
  "operationalReadiness": false,
  "PCoff": false
}

{
  "ref": "2910fcdc512497e54da286b477c8662be7721fcc",
  "tree": "98e9d674eb3e38aa860da96d7341a61c10d2e3b5",
  "leaves": 3194,
  "protected": 3188,
  "protectedMismatches": [],
  "codeExactQualified": true,
  "priorReportPrefixChars": 531979,
  "reportFinalChars": 569273,
  "main": "0c9c475b3ebaa970fc11d628b40e50a90cceb727",
  "SourceExecuted": false
}

## Complete fix diff BASE6599→CODE384

- .github/workflows/afw-r2-post-ack-contracts.yml +237 -32 patchChars23095
- .github/workflows/afw-r2-post-ack-diagnostic.yml +279 -37 patchChars28905
- docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md +89 -0 patchChars17061
- test/finite-post-ack-diagnostic.test.mjs +7 -6 patchChars1961
- test/fixtures/finite-budget-world.mjs +65 -27 patchChars25047
- test/fixtures/finite-post-ack-diagnostic.mjs +169 -43 patchChars74210


### .github/workflows/afw-r2-post-ack-contracts.yml

~~~~~~~~~~~~diff
@@ -1,5 +1,5 @@
 name: AFW R2 post-ACK contracts
-run-name: AFW R2 post-ACK contracts HELD ${{ github.sha }}
+run-name: AFW R2 post-ACK contracts FIX1 HELD ${{ github.sha }}
 on:
   workflow_dispatch:
 permissions:
@@ -15,6 +15,9 @@ jobs:
     timeout-minutes: 7
     outputs:
       artifact-id: ${{ steps.safe.outputs.artifact-id }}
+      artifact-digest: ${{ steps.safe.outputs.artifact-digest }}
+      model-id: ${{ steps.model.outputs.artifact-id }}
+      model-digest: ${{ steps.model.outputs.artifact-digest }}
     steps:
       - uses: actions/checkout@v4
         with:
@@ -26,7 +29,7 @@ jobs:
           node-version: '22.23.4'
       - name: Install exact lock without lifecycle scripts
         run: npm ci --ignore-scripts --no-audit --no-fund
-      - name: Pin current identity and preserve immutable baseline on this runner
+      - name: Pin current identity and immutable baseline
         shell: bash
         run: |
           set -euo pipefail
@@ -42,29 +45,134 @@ jobs:
           test "$(git hash-object test/fixtures/.finite-post-ack-original.mjs)" = 5fb78c057b7e80260ae683abf4af892767ce110e
           test "$(git hash-object package-lock.json)" = 36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b
           test "$(git hash-object .github/workflows/afw-finite-budget-qualification.yml)" = f7a71f1a0fa4f5ddf069ff411f008a098455e5cc
-      - name: Execute exactly 24 named controls with allocation traps
+          node --check test/fixtures/finite-budget-world.mjs
+          node --check test/fixtures/finite-post-ack-diagnostic.mjs
+          node --check test/finite-post-ack-diagnostic.test.mjs
+      - name: Current-identity pure model preflight without allocation
+        shell: bash
+        run: |
+          set -euo pipefail
+          node --input-type=module <<'NODE'
+          import {preflightPostAckDiagnostic} from './test/fixtures/finite-budget-world.mjs';
+          await preflightPostAckDiagnostic();
+          NODE
+      - name: Upload immutable sanitized MODEL only
+        id: model
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-post-ack-model-${{ github.run_id }}-1
+          path: output/finite-budget/post-ack-model/*.json
+          if-no-files-found: error
+          retention-days: 7
+      - name: Verify model upload API raw ZIP digests bounds CRC and exact paths
+        env:
+          GITHUB_TOKEN: ${{ github.token }}
+          ARTIFACT_KIND: model
+          ARTIFACT_ID: ${{ steps.model.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ steps.model.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
+          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
+          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          python - <<'PY'
+          import os,json,hashlib,zipfile,stat,pathlib,struct
+          def closed(pairs):
+           d={}
+           for k,v in pairs:
+            if k in d:raise ValueError("duplicate JSON key")
+            d[k]=v
+           return d
+          root=pathlib.Path(os.environ["RUNNER_TEMP"])
+          kind=os.environ["ARTIFACT_KIND"]
+          names,limit,total,out,prefix={
+           "model":(["budget-artifact.json","model.json"],4194304,4194304,root/"afw-post-ack-model-readback","afw-post-ack-model-"),
+           "safe":(["manifest.json","result.json"],131072,65536,root/"afw-post-ack-proof",os.environ.get("SAFE_ARTIFACT_PREFIX","afw-post-ack-contracts-")),
+           "cipher":(["envelope.bin","manifest.json","receipt.json"],136314880,134225920,root/"afw-post-ack-native"/"download","afw-post-ack-cipher-")
+          }[kind]
+          m=json.loads((root/("afw-"+kind+"-meta.json")).read_text(),object_pairs_hook=closed)
+          assert str(m["id"])==os.environ["ARTIFACT_ID"] and not m["expired"]
+          assert str(m["workflow_run"]["id"])==os.environ["GITHUB_RUN_ID"] and m["workflow_run"]["head_sha"]==os.environ["GITHUB_SHA"]
+          assert m["name"]==prefix+os.environ["GITHUB_RUN_ID"]+"-1"
+          b=(root/("afw-"+kind+".zip")).read_bytes()
+          digest=hashlib.sha256(b).hexdigest()
+          assert len(b)<=limit and m["size_in_bytes"]==len(b)
+          assert len(os.environ["ARTIFACT_DIGEST"])==64 and digest==os.environ["ARTIFACT_DIGEST"] and m["digest"]=="sha256:"+digest
+          assert len(b)>=22 and b[-22:-18]==b"PK\x05\x06"
+          e=struct.unpack("<4s4H2LH",b[-22:])
+          assert e[1]==e[2]==0 and e[3]==e[4]==len(names) and e[-1]==0 and e[5]+e[6]==len(b)-22
+          out.mkdir(mode=0o700)
+          with zipfile.ZipFile(root/("afw-"+kind+".zip")) as z:
+           infos=z.infolist()
+           assert len(infos)==len(names) and sorted(i.filename for i in infos)==names and z.comment==b""
+           assert min(i.header_offset for i in infos)==0 and sum(i.file_size for i in infos)<=total
+           for i in infos:
+            mode=i.external_attr>>16
+            assert not i.is_dir() and (mode&0o170000) in (0,stat.S_IFREG) and not i.flag_bits&1
+            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED) and i.file_size<=total
+            if i.filename in ("manifest.json","budget-artifact.json","receipt.json"):assert i.file_size<=65536
+            with z.open(i) as f:body=f.read(total+1)
+            assert len(body)==i.file_size
+            if i.filename.endswith(".json"):json.loads(body.decode("utf-8"),object_pairs_hook=closed)
+            with (out/i.filename).open("xb") as f:f.write(body)
+           assert z.testzip() is None
+          receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
+          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
+          PY
+      - name: Protected MODEL inventory readback using its REAL assigned artifact ID
+        env:
+          MODEL_ARTIFACT_ID: ${{ steps.model.outputs.artifact-id }}
+          MODEL_ARTIFACT_DIGEST: ${{ steps.model.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';
+          import {readFile,writeFile} from 'node:fs/promises';
+          import {createHash} from 'node:crypto';
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          const root=process.env.RUNNER_TEMP+'/afw-post-ack-model-readback',id=process.env.MODEL_ARTIFACT_ID;
+          await verifyBudgetArtifact(root,'pure',id);
+          const bytes=await readFile(root+'/model.json'),model=JSON.parse(bytes),check=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-model-download-check.json'));
+          const context={repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,case:'R2'};
+          assert.deepEqual(model.context,context);assert.equal(model.modelOnly,true);assert.equal(check.artifactId,id);assert.equal(check.uploaderDigest,process.env.MODEL_ARTIFACT_DIGEST);
+          await writeFile(process.env.RUNNER_TEMP+'/afw-post-ack-model-receipt.json',JSON.stringify({...check,modelSha256:createHash('sha256').update(bytes).digest('hex'),verified:true,context}),{flag:'wx',mode:0o600});
+          NODE
+      - name: Execute exactly 24 composed named controls and authentic witness barrier
+        env:
+          MODEL_ARTIFACT_ID: ${{ steps.model.outputs.artifact-id }}
+          MODEL_ARTIFACT_DIGEST: ${{ steps.model.outputs.artifact-digest }}
         shell: bash
         run: |
           set -euo pipefail
           AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs
-      - name: Run unchanged related inert compiler observer facet and sealer controls
+      - name: Run unchanged fixed F1-F8 and pure diagnostics observer tests
+        env:
+          MODEL_ARTIFACT_ID: ${{ steps.model.outputs.artifact-id }}
+          MODEL_ARTIFACT_DIGEST: ${{ steps.model.outputs.artifact-digest }}
         shell: bash
         run: |
           set -euo pipefail
           AFW_BUDGET_CONTROL_PHASE=green node --experimental-vm-modules test/fixtures/finite-budget-world.mjs verify-native-preparation-round1
-          node --test --test-concurrency=1 test/finite-budget-diagnostics.test.mjs test/mcp-qa-finite-observer.test.mjs
+          result=0
+          node --test --test-concurrency=1 --test-reporter=tap test/finite-budget-diagnostics.test.mjs test/mcp-qa-finite-observer.test.mjs >output/finite-budget/post-ack-private/related.tap 2>&1 || result=$?
+          tail -n 40 output/finite-budget/post-ack-private/related.tap
+          test "$result" = 0
           node test/fixtures/finite-post-ack-diagnostic.mjs contracts-proof
-      - name: Upload only the closed two-JSON proof
+      - name: Upload closed exact two-JSON SAFE proof only
         id: safe
         uses: actions/upload-artifact@v4
         with:
           name: afw-post-ack-contracts-${{ github.run_id }}-1
           path: output/finite-budget/post-ack-safe/*.json
           if-no-files-found: error
           retention-days: 7
-      - name: Remove only this task's baseline scratch
+      - name: Remove own baseline runner scratch only
         if: always()
-        shell: bash
         run: rm -f -- test/fixtures/.finite-post-ack-original.mjs
   verify:
     if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
@@ -76,52 +184,149 @@ jobs:
         with:
           ref: ${{ github.sha }}
           persist-credentials: false
-          fetch-depth: 1
       - uses: actions/setup-node@v4
         with:
           node-version: '22.23.4'
       - run: npm ci --ignore-scripts --no-audit --no-fund
-      - name: Independently check same-ID ZIP metadata digest CRC paths and bounds
+      - name: Verify model upload API raw ZIP digests bounds CRC and exact paths
         env:
           GITHUB_TOKEN: ${{ github.token }}
-          SAFE_ARTIFACT_ID: ${{ needs.contracts.outputs.artifact-id }}
+          ARTIFACT_KIND: model
+          ARTIFACT_ID: ${{ needs.contracts.outputs.model-id }}
+          ARTIFACT_DIGEST: ${{ needs.contracts.outputs.model-digest }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
-          test -n "$SAFE_ARTIFACT_ID"
-          case "$SAFE_ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$SAFE_ARTIFACT_ID" -o "$RUNNER_TEMP/afw-safe-meta.json"
-          curl --fail --silent --show-error --location --max-time 20 --max-filesize 131072 -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$SAFE_ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-safe.zip"
+          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
+          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
+          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
           python - <<'PY'
-          import os,json,hashlib,zipfile,stat,pathlib
+          import os,json,hashlib,zipfile,stat,pathlib,struct
           def closed(pairs):
            d={}
            for k,v in pairs:
-            if k in d: raise ValueError("duplicate JSON key")
+            if k in d:raise ValueError("duplicate JSON key")
             d[k]=v
            return d
           root=pathlib.Path(os.environ["RUNNER_TEMP"])
-          m=json.loads((root/"afw-safe-meta.json").read_text(),object_pairs_hook=closed)
-          assert str(m["id"])==os.environ["SAFE_ARTIFACT_ID"] and not m["expired"]
+          kind=os.environ["ARTIFACT_KIND"]
+          names,limit,total,out,prefix={
+           "model":(["budget-artifact.json","model.json"],4194304,4194304,root/"afw-post-ack-model-readback","afw-post-ack-model-"),
+           "safe":(["manifest.json","result.json"],131072,65536,root/"afw-post-ack-proof",os.environ.get("SAFE_ARTIFACT_PREFIX","afw-post-ack-contracts-")),
+           "cipher":(["envelope.bin","manifest.json","receipt.json"],136314880,134225920,root/"afw-post-ack-native"/"download","afw-post-ack-cipher-")
+          }[kind]
+          m=json.loads((root/("afw-"+kind+"-meta.json")).read_text(),object_pairs_hook=closed)
+          assert str(m["id"])==os.environ["ARTIFACT_ID"] and not m["expired"]
           assert str(m["workflow_run"]["id"])==os.environ["GITHUB_RUN_ID"] and m["workflow_run"]["head_sha"]==os.environ["GITHUB_SHA"]
-          b=(root/"afw-safe.zip").read_bytes()
-          assert len(b)<=131072 and m["size_in_bytes"]==len(b)
-          assert m["digest"]=="sha256:"+hashlib.sha256(b).hexdigest()
-          out=root/"afw-post-ack-proof"
+          assert m["name"]==prefix+os.environ["GITHUB_RUN_ID"]+"-1"
+          b=(root/("afw-"+kind+".zip")).read_bytes()
+          digest=hashlib.sha256(b).hexdigest()
+          assert len(b)<=limit and m["size_in_bytes"]==len(b)
+          assert len(os.environ["ARTIFACT_DIGEST"])==64 and digest==os.environ["ARTIFACT_DIGEST"] and m["digest"]=="sha256:"+digest
+          assert len(b)>=22 and b[-22:-18]==b"PK\x05\x06"
+          e=struct.unpack("<4s4H2LH",b[-22:])
+          assert e[1]==e[2]==0 and e[3]==e[4]==len(names) and e[-1]==0 and e[5]+e[6]==len(b)-22
           out.mkdir(mode=0o700)
-          with zipfile.ZipFile(root/"afw-safe.zip") as z:
+          with zipfile.ZipFile(root/("afw-"+kind+".zip")) as z:
            infos=z.infolist()
-           assert len(infos)==2 and sorted(i.filename for i in infos)==["manifest.json","result.json"]
-           assert sum(i.file_size for i in infos)<=65536
+           assert len(infos)==len(names) and sorted(i.filename for i in infos)==names and z.comment==b""
+           assert min(i.header_offset for i in infos)==0 and sum(i.file_size for i in infos)<=total
            for i in infos:
-            assert not i.is_dir() and not i.flag_bits&1 and not stat.S_ISLNK(i.external_attr>>16)
-            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED)
-            body=z.read(i)
+            mode=i.external_attr>>16
+            assert not i.is_dir() and (mode&0o170000) in (0,stat.S_IFREG) and not i.flag_bits&1
+            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED) and i.file_size<=total
+            if i.filename in ("manifest.json","budget-artifact.json","receipt.json"):assert i.file_size<=65536
+            with z.open(i) as f:body=f.read(total+1)
             assert len(body)==i.file_size
-            value=json.loads(body.decode("utf-8"),object_pairs_hook=closed)
-            with (out/i.filename).open("xb") as f: f.write(body)
+            if i.filename.endswith(".json"):json.loads(body.decode("utf-8"),object_pairs_hook=closed)
+            with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
+          receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
+          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
-      - name: Verify full closed current control and program manifest
+      - name: Protected MODEL inventory readback using its REAL assigned artifact ID
+        env:
+          MODEL_ARTIFACT_ID: ${{ needs.contracts.outputs.model-id }}
+          MODEL_ARTIFACT_DIGEST: ${{ needs.contracts.outputs.model-digest }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';
+          import {readFile,writeFile} from 'node:fs/promises';
+          import {createHash} from 'node:crypto';
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          const root=process.env.RUNNER_TEMP+'/afw-post-ack-model-readback',id=process.env.MODEL_ARTIFACT_ID;
+          await verifyBudgetArtifact(root,'pure',id);
+          const bytes=await readFile(root+'/model.json'),model=JSON.parse(bytes),check=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-model-download-check.json'));
+          const context={repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,case:'R2'};
+          assert.deepEqual(model.context,context);assert.equal(model.modelOnly,true);assert.equal(check.artifactId,id);assert.equal(check.uploaderDigest,process.env.MODEL_ARTIFACT_DIGEST);
+          await writeFile(process.env.RUNNER_TEMP+'/afw-post-ack-model-receipt.json',JSON.stringify({...check,modelSha256:createHash('sha256').update(bytes).digest('hex'),verified:true,context}),{flag:'wx',mode:0o600});
+          NODE
+      - name: Verify safe upload API raw ZIP digests bounds CRC and exact paths
+        env:
+          GITHUB_TOKEN: ${{ github.token }}
+          ARTIFACT_KIND: safe
+          ARTIFACT_ID: ${{ needs.contracts.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ needs.contracts.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
+          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
+          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          python - <<'PY'
+          import os,json,hashlib,zipfile,stat,pathlib,struct
+          def closed(pairs):
+           d={}
+           for k,v in pairs:
+            if k in d:raise ValueError("duplicate JSON key")
+            d[k]=v
+           return d
+          root=pathlib.Path(os.environ["RUNNER_TEMP"])
+          kind=os.environ["ARTIFACT_KIND"]
+          names,limit,total,out,prefix={
+           "model":(["budget-artifact.json","model.json"],4194304,4194304,root/"afw-post-ack-model-readback","afw-post-ack-model-"),
+           "safe":(["manifest.json","result.json"],131072,65536,root/"afw-post-ack-proof",os.environ.get("SAFE_ARTIFACT_PREFIX","afw-post-ack-contracts-")),
+           "cipher":(["envelope.bin","manifest.json","receipt.json"],136314880,134225920,root/"afw-post-ack-native"/"download","afw-post-ack-cipher-")
+          }[kind]
+          m=json.loads((root/("afw-"+kind+"-meta.json")).read_text(),object_pairs_hook=closed)
+          assert str(m["id"])==os.environ["ARTIFACT_ID"] and not m["expired"]
+          assert str(m["workflow_run"]["id"])==os.environ["GITHUB_RUN_ID"] and m["workflow_run"]["head_sha"]==os.environ["GITHUB_SHA"]
+          assert m["name"]==prefix+os.environ["GITHUB_RUN_ID"]+"-1"
+          b=(root/("afw-"+kind+".zip")).read_bytes()
+          digest=hashlib.sha256(b).hexdigest()
+          assert len(b)<=limit and m["size_in_bytes"]==len(b)
+          assert len(os.environ["ARTIFACT_DIGEST"])==64 and digest==os.environ["ARTIFACT_DIGEST"] and m["digest"]=="sha256:"+digest
+          assert len(b)>=22 and b[-22:-18]==b"PK\x05\x06"
+          e=struct.unpack("<4s4H2LH",b[-22:])
+          assert e[1]==e[2]==0 and e[3]==e[4]==len(names) and e[-1]==0 and e[5]+e[6]==len(b)-22
+          out.mkdir(mode=0o700)
+          with zipfile.ZipFile(root/("afw-"+kind+".zip")) as z:
+           infos=z.infolist()
+           assert len(infos)==len(names) and sorted(i.filename for i in infos)==names and z.comment==b""
+           assert min(i.header_offset for i in infos)==0 and sum(i.file_size for i in infos)<=total
+           for i in infos:
+            mode=i.external_attr>>16
+            assert not i.is_dir() and (mode&0o170000) in (0,stat.S_IFREG) and not i.flag_bits&1
+            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED) and i.file_size<=total
+            if i.filename in ("manifest.json","budget-artifact.json","receipt.json"):assert i.file_size<=65536
+            with z.open(i) as f:body=f.read(total+1)
+            assert len(body)==i.file_size
+            if i.filename.endswith(".json"):json.loads(body.decode("utf-8"),object_pairs_hook=closed)
+            with (out/i.filename).open("xb") as f:f.write(body)
+           assert z.testzip() is None
+          receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
+          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
+          PY
+      - name: Independently bind full SAFE model and current checkout pins
+        env:
+          MODEL_ARTIFACT_ID: ${{ needs.contracts.outputs.model-id }}
+          MODEL_ARTIFACT_DIGEST: ${{ needs.contracts.outputs.model-digest }}
         run: node test/fixtures/finite-post-ack-diagnostic.mjs verify-contracts
~~~~~~~~~~~~

### .github/workflows/afw-r2-post-ack-diagnostic.yml

~~~~~~~~~~~~diff
@@ -1,5 +1,5 @@
 name: AFW R2 post-ACK diagnostic
-run-name: AFW R2 post-ACK Native HELD ${{ github.sha }}
+run-name: AFW R2 post-ACK Native FIX1 HELD ${{ github.sha }}
 on:
   workflow_dispatch:
 permissions:
@@ -18,6 +18,12 @@ jobs:
     environment: afw-finite-syn-checkpoint
     outputs:
       artifact-id: ${{ steps.safe.outputs.artifact-id }}
+      artifact-digest: ${{ steps.safe.outputs.artifact-digest }}
+      model-id: ${{ steps.model.outputs.artifact-id }}
+      model-digest: ${{ steps.model.outputs.artifact-digest }}
+      cipher-id: ${{ steps.cipher.outputs.artifact-id }}
+      cipher-digest: ${{ steps.cipher.outputs.artifact-digest }}
+      original-command-outcome: ${{ steps.r2.outcome }}
     steps:
       - uses: actions/checkout@v4
         with:
@@ -42,7 +48,7 @@ jobs:
           const responseDate=Date.parse(response.headers.get('date'));assert(Number.isFinite(responseDate));
           const value=await response.json();assert(value.total_count<=100);
           const jobs=value.jobs.filter(j=>j.name==='native'&&j.status==='in_progress'&&String(j.run_id)===process.env.GITHUB_RUN_ID&&j.run_attempt===1&&j.head_sha===process.env.GITHUB_SHA);
-          assert.equal(jobs.length,1);const startedAt=Date.parse(jobs[0].started_at);assert(Number.isFinite(startedAt)&&startedAt<=responseDate+1000);assert(Math.abs(Date.now()-responseDate)<15000);
+          assert.equal(jobs.length,1);const startedAt=Date.parse(jobs[0].started_at);assert(Number.isFinite(startedAt)&&startedAt<=responseDate);assert(Math.abs(Date.now()-responseDate)<15000);
           const context={repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,case:'R2'};
           fs.writeFileSync(process.env.RUNNER_TEMP+'/afw-post-ack-job-time.json',JSON.stringify({job:'native',jobId:String(jobs[0].id),timeoutMinutes:7,context,startedAt,responseDate,requestElapsed:Number(after-before)/1e6,observedHrtime:after.toString(),localObservedAt:Date.now()}),{flag:'wx',mode:0o600});
           })().catch(()=>{console.error('current_job_timing_unavailable');process.exitCode=1;});
@@ -65,8 +71,105 @@ jobs:
           test "$(git hash-object test/fixtures/.finite-post-ack-original.mjs)" = 5fb78c057b7e80260ae683abf4af892767ce110e
           test "$(git hash-object package-lock.json)" = 36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b
           test "$(git hash-object .github/workflows/afw-finite-budget-qualification.yml)" = f7a71f1a0fa4f5ddf069ff411f008a098455e5cc
+          node --check test/fixtures/finite-budget-world.mjs
+          node --check test/fixtures/finite-post-ack-diagnostic.mjs
+          node --check test/finite-post-ack-diagnostic.test.mjs
           mkdir -m 700 "$RUNNER_TEMP/afw-post-ack-native"
           mkdir -m 700 "$RUNNER_TEMP/afw-post-ack-native/logs"
+      - name: Current-identity pure model preflight without allocation
+        shell: bash
+        run: |
+          set -euo pipefail
+          node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-post-ack-native/logs/preflight.log" 2>&1
+          import {preflightPostAckDiagnostic} from './test/fixtures/finite-budget-world.mjs';
+          await preflightPostAckDiagnostic();
+          NODE
+      - name: Upload immutable sanitized MODEL only
+        id: model
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-post-ack-model-${{ github.run_id }}-1
+          path: output/finite-budget/post-ack-model/*.json
+          if-no-files-found: error
+          retention-days: 7
+      - name: Verify model upload API raw ZIP digests bounds CRC and exact paths
+        env:
+          GITHUB_TOKEN: ${{ github.token }}
+          ARTIFACT_KIND: model
+          ARTIFACT_ID: ${{ steps.model.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ steps.model.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
+          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
+          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          python - <<'PY'
+          import os,json,hashlib,zipfile,stat,pathlib,struct
+          def closed(pairs):
+           d={}
+           for k,v in pairs:
+            if k in d:raise ValueError("duplicate JSON key")
+            d[k]=v
+           return d
+          root=pathlib.Path(os.environ["RUNNER_TEMP"])
+          kind=os.environ["ARTIFACT_KIND"]
+          names,limit,total,out,prefix={
+           "model":(["budget-artifact.json","model.json"],4194304,4194304,root/"afw-post-ack-model-readback","afw-post-ack-model-"),
+           "safe":(["manifest.json","result.json"],131072,65536,root/"afw-post-ack-proof",os.environ.get("SAFE_ARTIFACT_PREFIX","afw-post-ack-contracts-")),
+           "cipher":(["envelope.bin","manifest.json","receipt.json"],136314880,134225920,root/"afw-post-ack-native"/"download","afw-post-ack-cipher-")
+          }[kind]
+          m=json.loads((root/("afw-"+kind+"-meta.json")).read_text(),object_pairs_hook=closed)
+          assert str(m["id"])==os.environ["ARTIFACT_ID"] and not m["expired"]
+          assert str(m["workflow_run"]["id"])==os.environ["GITHUB_RUN_ID"] and m["workflow_run"]["head_sha"]==os.environ["GITHUB_SHA"]
+          assert m["name"]==prefix+os.environ["GITHUB_RUN_ID"]+"-1"
+          b=(root/("afw-"+kind+".zip")).read_bytes()
+          digest=hashlib.sha256(b).hexdigest()
+          assert len(b)<=limit and m["size_in_bytes"]==len(b)
+          assert len(os.environ["ARTIFACT_DIGEST"])==64 and digest==os.environ["ARTIFACT_DIGEST"] and m["digest"]=="sha256:"+digest
+          assert len(b)>=22 and b[-22:-18]==b"PK\x05\x06"
+          e=struct.unpack("<4s4H2LH",b[-22:])
+          assert e[1]==e[2]==0 and e[3]==e[4]==len(names) and e[-1]==0 and e[5]+e[6]==len(b)-22
+          out.mkdir(mode=0o700)
+          with zipfile.ZipFile(root/("afw-"+kind+".zip")) as z:
+           infos=z.infolist()
+           assert len(infos)==len(names) and sorted(i.filename for i in infos)==names and z.comment==b""
+           assert min(i.header_offset for i in infos)==0 and sum(i.file_size for i in infos)<=total
+           for i in infos:
+            mode=i.external_attr>>16
+            assert not i.is_dir() and (mode&0o170000) in (0,stat.S_IFREG) and not i.flag_bits&1
+            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED) and i.file_size<=total
+            if i.filename in ("manifest.json","budget-artifact.json","receipt.json"):assert i.file_size<=65536
+            with z.open(i) as f:body=f.read(total+1)
+            assert len(body)==i.file_size
+            if i.filename.endswith(".json"):json.loads(body.decode("utf-8"),object_pairs_hook=closed)
+            with (out/i.filename).open("xb") as f:f.write(body)
+           assert z.testzip() is None
+          receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
+          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
+          PY
+      - name: Protected MODEL inventory readback using its REAL assigned artifact ID
+        env:
+          MODEL_ARTIFACT_ID: ${{ steps.model.outputs.artifact-id }}
+          MODEL_ARTIFACT_DIGEST: ${{ steps.model.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';
+          import {readFile,writeFile} from 'node:fs/promises';
+          import {createHash} from 'node:crypto';
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          const root=process.env.RUNNER_TEMP+'/afw-post-ack-model-readback',id=process.env.MODEL_ARTIFACT_ID;
+          await verifyBudgetArtifact(root,'pure',id);
+          const bytes=await readFile(root+'/model.json'),model=JSON.parse(bytes),check=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-model-download-check.json'));
+          const context={repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,case:'R2'};
+          assert.deepEqual(model.context,context);assert.equal(model.modelOnly,true);assert.equal(check.artifactId,id);assert.equal(check.uploaderDigest,process.env.MODEL_ARTIFACT_DIGEST);
+          await writeFile(process.env.RUNNER_TEMP+'/afw-post-ack-model-receipt.json',JSON.stringify({...check,modelSha256:createHash('sha256').update(bytes).digest('hex'),verified:true,context}),{flag:'wx',mode:0o600});
+          NODE
       - name: Key preflight in terminating helper only
         id: key
         env:
@@ -76,6 +179,9 @@ jobs:
       - name: One R2 original outcome and fixed observer after current model preflight
         id: r2
         continue-on-error: true
+        env:
+          MODEL_ARTIFACT_ID: ${{ steps.model.outputs.artifact-id }}
+          MODEL_ARTIFACT_DIGEST: ${{ steps.model.outputs.artifact-digest }}
         shell: bash
         run: |
           set -euo pipefail
@@ -98,31 +204,65 @@ jobs:
           path: ${{ runner.temp }}/afw-post-ack-native/cipher/*
           if-no-files-found: error
           retention-days: 7
-      - name: Download only the same assigned cipher artifact into this runner
+      - name: Verify same assigned cipher upload API raw ZIP and exact paths
         if: always() && steps.cipher.outcome == 'success'
         env:
           GITHUB_TOKEN: ${{ github.token }}
-          CIPHER_ARTIFACT_ID: ${{ steps.cipher.outputs.artifact-id }}
+          ARTIFACT_KIND: cipher
+          ARTIFACT_ID: ${{ steps.cipher.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ steps.cipher.outputs.artifact-digest }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
-          case "$CIPHER_ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          curl --fail --silent --show-error --location --max-time 20 -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$CIPHER_ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-post-ack-native/cipher.zip"
+          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
+          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
+          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
           python - <<'PY'
-          import os,pathlib,zipfile,stat
-          root=pathlib.Path(os.environ["RUNNER_TEMP"])/"afw-post-ack-native"
-          out=root/"download"
+          import os,json,hashlib,zipfile,stat,pathlib,struct
+          def closed(pairs):
+           d={}
+           for k,v in pairs:
+            if k in d:raise ValueError("duplicate JSON key")
+            d[k]=v
+           return d
+          root=pathlib.Path(os.environ["RUNNER_TEMP"])
+          kind=os.environ["ARTIFACT_KIND"]
+          names,limit,total,out,prefix={
+           "model":(["budget-artifact.json","model.json"],4194304,4194304,root/"afw-post-ack-model-readback","afw-post-ack-model-"),
+           "safe":(["manifest.json","result.json"],131072,65536,root/"afw-post-ack-proof",os.environ.get("SAFE_ARTIFACT_PREFIX","afw-post-ack-contracts-")),
+           "cipher":(["envelope.bin","manifest.json","receipt.json"],136314880,134225920,root/"afw-post-ack-native"/"download","afw-post-ack-cipher-")
+          }[kind]
+          m=json.loads((root/("afw-"+kind+"-meta.json")).read_text(),object_pairs_hook=closed)
+          assert str(m["id"])==os.environ["ARTIFACT_ID"] and not m["expired"]
+          assert str(m["workflow_run"]["id"])==os.environ["GITHUB_RUN_ID"] and m["workflow_run"]["head_sha"]==os.environ["GITHUB_SHA"]
+          assert m["name"]==prefix+os.environ["GITHUB_RUN_ID"]+"-1"
+          b=(root/("afw-"+kind+".zip")).read_bytes()
+          digest=hashlib.sha256(b).hexdigest()
+          assert len(b)<=limit and m["size_in_bytes"]==len(b)
+          assert len(os.environ["ARTIFACT_DIGEST"])==64 and digest==os.environ["ARTIFACT_DIGEST"] and m["digest"]=="sha256:"+digest
+          assert len(b)>=22 and b[-22:-18]==b"PK\x05\x06"
+          e=struct.unpack("<4s4H2LH",b[-22:])
+          assert e[1]==e[2]==0 and e[3]==e[4]==len(names) and e[-1]==0 and e[5]+e[6]==len(b)-22
           out.mkdir(mode=0o700)
-          with zipfile.ZipFile(root/"cipher.zip") as z:
+          with zipfile.ZipFile(root/("afw-"+kind+".zip")) as z:
            infos=z.infolist()
-           assert len(infos)==3 and sorted(i.filename for i in infos)==["envelope.bin","manifest.json","receipt.json"]
-           assert sum(i.file_size for i in infos)<=134225920
+           assert len(infos)==len(names) and sorted(i.filename for i in infos)==names and z.comment==b""
+           assert min(i.header_offset for i in infos)==0 and sum(i.file_size for i in infos)<=total
            for i in infos:
-            assert not i.is_dir() and not stat.S_ISLNK(i.external_attr>>16) and not i.flag_bits&1
-            body=z.read(i)
+            mode=i.external_attr>>16
+            assert not i.is_dir() and (mode&0o170000) in (0,stat.S_IFREG) and not i.flag_bits&1
+            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED) and i.file_size<=total
+            if i.filename in ("manifest.json","budget-artifact.json","receipt.json"):assert i.file_size<=65536
+            with z.open(i) as f:body=f.read(total+1)
+            assert len(body)==i.file_size
+            if i.filename.endswith(".json"):json.loads(body.decode("utf-8"),object_pairs_hook=closed)
             with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
+          receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
+          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
       - name: Same-ID authenticated open and full private inventory readback
         id: reopen
@@ -132,6 +272,7 @@ jobs:
           AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
           GITHUB_TOKEN: ${{ github.token }}
           CIPHER_ARTIFACT_ID: ${{ steps.cipher.outputs.artifact-id }}
+          CIPHER_ARTIFACT_DIGEST: ${{ steps.cipher.outputs.artifact-digest }}
         shell: bash
         run: node test/fixtures/finite-post-ack-diagnostic.mjs reopen-native >"$RUNNER_TEMP/afw-post-ack-native/logs/reopen.log" 2>&1
       - name: Publish only closed observation or unavailable evidence verdict
@@ -173,49 +314,150 @@ jobs:
         with:
           node-version: '22.23.4'
       - run: npm ci --ignore-scripts --no-audit --no-fund
-      - name: Independent SAFE ZIP and current artifact metadata verification
+      - name: Verify model upload API raw ZIP digests bounds CRC and exact paths
+        env:
+          GITHUB_TOKEN: ${{ github.token }}
+          ARTIFACT_KIND: model
+          ARTIFACT_ID: ${{ needs.native.outputs.model-id }}
+          ARTIFACT_DIGEST: ${{ needs.native.outputs.model-digest }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
+          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
+          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          python - <<'PY'
+          import os,json,hashlib,zipfile,stat,pathlib,struct
+          def closed(pairs):
+           d={}
+           for k,v in pairs:
+            if k in d:raise ValueError("duplicate JSON key")
+            d[k]=v
+           return d
+          root=pathlib.Path(os.environ["RUNNER_TEMP"])
+          kind=os.environ["ARTIFACT_KIND"]
+          names,limit,total,out,prefix={
+           "model":(["budget-artifact.json","model.json"],4194304,4194304,root/"afw-post-ack-model-readback","afw-post-ack-model-"),
+           "safe":(["manifest.json","result.json"],131072,65536,root/"afw-post-ack-proof",os.environ.get("SAFE_ARTIFACT_PREFIX","afw-post-ack-contracts-")),
+           "cipher":(["envelope.bin","manifest.json","receipt.json"],136314880,134225920,root/"afw-post-ack-native"/"download","afw-post-ack-cipher-")
+          }[kind]
+          m=json.loads((root/("afw-"+kind+"-meta.json")).read_text(),object_pairs_hook=closed)
+          assert str(m["id"])==os.environ["ARTIFACT_ID"] and not m["expired"]
+          assert str(m["workflow_run"]["id"])==os.environ["GITHUB_RUN_ID"] and m["workflow_run"]["head_sha"]==os.environ["GITHUB_SHA"]
+          assert m["name"]==prefix+os.environ["GITHUB_RUN_ID"]+"-1"
+          b=(root/("afw-"+kind+".zip")).read_bytes()
+          digest=hashlib.sha256(b).hexdigest()
+          assert len(b)<=limit and m["size_in_bytes"]==len(b)
+          assert len(os.environ["ARTIFACT_DIGEST"])==64 and digest==os.environ["ARTIFACT_DIGEST"] and m["digest"]=="sha256:"+digest
+          assert len(b)>=22 and b[-22:-18]==b"PK\x05\x06"
+          e=struct.unpack("<4s4H2LH",b[-22:])
+          assert e[1]==e[2]==0 and e[3]==e[4]==len(names) and e[-1]==0 and e[5]+e[6]==len(b)-22
+          out.mkdir(mode=0o700)
+          with zipfile.ZipFile(root/("afw-"+kind+".zip")) as z:
+           infos=z.infolist()
+           assert len(infos)==len(names) and sorted(i.filename for i in infos)==names and z.comment==b""
+           assert min(i.header_offset for i in infos)==0 and sum(i.file_size for i in infos)<=total
+           for i in infos:
+            mode=i.external_attr>>16
+            assert not i.is_dir() and (mode&0o170000) in (0,stat.S_IFREG) and not i.flag_bits&1
+            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED) and i.file_size<=total
+            if i.filename in ("manifest.json","budget-artifact.json","receipt.json"):assert i.file_size<=65536
+            with z.open(i) as f:body=f.read(total+1)
+            assert len(body)==i.file_size
+            if i.filename.endswith(".json"):json.loads(body.decode("utf-8"),object_pairs_hook=closed)
+            with (out/i.filename).open("xb") as f:f.write(body)
+           assert z.testzip() is None
+          receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
+          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
+          PY
+      - name: Protected MODEL inventory readback using its REAL assigned artifact ID
+        env:
+          MODEL_ARTIFACT_ID: ${{ needs.native.outputs.model-id }}
+          MODEL_ARTIFACT_DIGEST: ${{ needs.native.outputs.model-digest }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          node --input-type=module <<'NODE'
+          import assert from 'node:assert/strict';
+          import {readFile,writeFile} from 'node:fs/promises';
+          import {createHash} from 'node:crypto';
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          const root=process.env.RUNNER_TEMP+'/afw-post-ack-model-readback',id=process.env.MODEL_ARTIFACT_ID;
+          await verifyBudgetArtifact(root,'pure',id);
+          const bytes=await readFile(root+'/model.json'),model=JSON.parse(bytes),check=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-model-download-check.json'));
+          const context={repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,case:'R2'};
+          assert.deepEqual(model.context,context);assert.equal(model.modelOnly,true);assert.equal(check.artifactId,id);assert.equal(check.uploaderDigest,process.env.MODEL_ARTIFACT_DIGEST);
+          await writeFile(process.env.RUNNER_TEMP+'/afw-post-ack-model-receipt.json',JSON.stringify({...check,modelSha256:createHash('sha256').update(bytes).digest('hex'),verified:true,context}),{flag:'wx',mode:0o600});
+          NODE
+      - name: Verify safe upload API raw ZIP digests bounds CRC and exact paths
         env:
           GITHUB_TOKEN: ${{ github.token }}
-          SAFE_ARTIFACT_ID: ${{ needs.native.outputs.artifact-id }}
+          ARTIFACT_KIND: safe
+          ARTIFACT_ID: ${{ needs.native.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ needs.native.outputs.artifact-digest }}
+          SAFE_ARTIFACT_PREFIX: afw-post-ack-native-safe-
         shell: bash
         run: |
           set -euo pipefail
           umask 077
-          test -n "$SAFE_ARTIFACT_ID"
-          case "$SAFE_ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$SAFE_ARTIFACT_ID" -o "$RUNNER_TEMP/afw-safe-meta.json"
-          curl --fail --silent --show-error --location --max-time 20 --max-filesize 131072 -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$SAFE_ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-safe.zip"
+          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
+          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
+          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
+          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
           python - <<'PY'
-          import os,json,hashlib,zipfile,stat,pathlib
+          import os,json,hashlib,zipfile,stat,pathlib,struct
           def closed(pairs):
            d={}
            for k,v in pairs:
-            if k in d: raise ValueError("duplicate JSON key")
+            if k in d:raise ValueError("duplicate JSON key")
             d[k]=v
            return d
           root=pathlib.Path(os.environ["RUNNER_TEMP"])
-          m=json.loads((root/"afw-safe-meta.json").read_text(),object_pairs_hook=closed)
-          assert str(m["id"])==os.environ["SAFE_ARTIFACT_ID"] and not m["expired"]
+          kind=os.environ["ARTIFACT_KIND"]
+          names,limit,total,out,prefix={
+           "model":(["budget-artifact.json","model.json"],4194304,4194304,root/"afw-post-ack-model-readback","afw-post-ack-model-"),
+           "safe":(["manifest.json","result.json"],131072,65536,root/"afw-post-ack-proof",os.environ.get("SAFE_ARTIFACT_PREFIX","afw-post-ack-contracts-")),
+           "cipher":(["envelope.bin","manifest.json","receipt.json"],136314880,134225920,root/"afw-post-ack-native"/"download","afw-post-ack-cipher-")
+          }[kind]
+          m=json.loads((root/("afw-"+kind+"-meta.json")).read_text(),object_pairs_hook=closed)
+          assert str(m["id"])==os.environ["ARTIFACT_ID"] and not m["expired"]
           assert str(m["workflow_run"]["id"])==os.environ["GITHUB_RUN_ID"] and m["workflow_run"]["head_sha"]==os.environ["GITHUB_SHA"]
-          b=(root/"afw-safe.zip").read_bytes()
-          assert len(b)<=131072 and m["size_in_bytes"]==len(b)
-          assert m["digest"]=="sha256:"+hashlib.sha256(b).hexdigest()
-          out=root/"afw-post-ack-proof"
+          assert m["name"]==prefix+os.environ["GITHUB_RUN_ID"]+"-1"
+          b=(root/("afw-"+kind+".zip")).read_bytes()
+          digest=hashlib.sha256(b).hexdigest()
+          assert len(b)<=limit and m["size_in_bytes"]==len(b)
+          assert len(os.environ["ARTIFACT_DIGEST"])==64 and digest==os.environ["ARTIFACT_DIGEST"] and m["digest"]=="sha256:"+digest
+          assert len(b)>=22 and b[-22:-18]==b"PK\x05\x06"
+          e=struct.unpack("<4s4H2LH",b[-22:])
+          assert e[1]==e[2]==0 and e[3]==e[4]==len(names) and e[-1]==0 and e[5]+e[6]==len(b)-22
           out.mkdir(mode=0o700)
-          with zipfile.ZipFile(root/"afw-safe.zip") as z:
+          with zipfile.ZipFile(root/("afw-"+kind+".zip")) as z:
            infos=z.infolist()
-           assert len(infos)==2 and sorted(i.filename for i in infos)==["manifest.json","result.json"]
-           assert sum(i.file_size for i in infos)<=65536
+           assert len(infos)==len(names) and sorted(i.filename for i in infos)==names and z.comment==b""
+           assert min(i.header_offset for i in infos)==0 and sum(i.file_size for i in infos)<=total
            for i in infos:
-            assert not i.is_dir() and not i.flag_bits&1 and not stat.S_ISLNK(i.external_attr>>16)
-            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED)
-            body=z.read(i)
+            mode=i.external_attr>>16
+            assert not i.is_dir() and (mode&0o170000) in (0,stat.S_IFREG) and not i.flag_bits&1
+            assert i.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED) and i.file_size<=total
+            if i.filename in ("manifest.json","budget-artifact.json","receipt.json"):assert i.file_size<=65536
+            with z.open(i) as f:body=f.read(total+1)
             assert len(body)==i.file_size
-            value=json.loads(body.decode("utf-8"),object_pairs_hook=closed)
-            with (out/i.filename).open("xb") as f: f.write(body)
+            if i.filename.endswith(".json"):json.loads(body.decode("utf-8"),object_pairs_hook=closed)
+            with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
+          receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
+          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
-      - name: Verify closed observation and encrypted metadata without a key
+      - name: Verify closed observation model pins cipher assignment and original outcome
         env:
           GITHUB_TOKEN: ${{ github.token }}
+          MODEL_ARTIFACT_ID: ${{ needs.native.outputs.model-id }}
+          MODEL_ARTIFACT_DIGEST: ${{ needs.native.outputs.model-digest }}
+          CIPHER_ARTIFACT_ID: ${{ needs.native.outputs.cipher-id }}
+          CIPHER_ARTIFACT_DIGEST: ${{ needs.native.outputs.cipher-digest }}
+          ORIGINAL_COMMAND_OUTCOME: ${{ needs.native.outputs.original-command-outcome }}
         run: node test/fixtures/finite-post-ack-diagnostic.mjs verify-native
~~~~~~~~~~~~

### docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md

~~~~~~~~~~~~diff
@@ -5429,3 +5429,92 @@ All preexisting60workflow event blocks inspected; automatic push matches main on
 ```
 
 Self-review fixed in-memory source framing, synthetic repeated-operation reset, input replay resolveDir, exact original-error outcome distinction, explicit fixture-return provenance and conservative metadata age accounting before any Source write/run. Remaining inherent limits: synchronous observer overhead can alter timing; pair_wait labels only a call boundary, never the underlying race cause; trusted Source/runner custody and mounted options are not remote attestation. Actual qualification/result/artifact/final closure evidence follows in a new append after the sole attempt. NOT EXECUTED: Native R2, CF remote runtime, I0, MF, PC-off, Native16, Max, production/OAuth/customer resources.
+
+
+### Sole KEYLESS attempt FAILED — permit consumed; no repair or retry
+
+Implementation commit6599b33dd71df6a61da25e5c9a35c1e299623433/tree d674d8916eb0d28005118e389103b03eb190510f was exact-readback on all six paths with3194leaves/3188protected. Sole activation commit4e37de51d64a715a7e1be879314d7468938bf15f/tree1cf17fb6220828a20bb99405bee94e2167e398df changed ONLY contracts workflow events/runlabel/two gates. Active WF6555UTF8bytes/Gitblob7f667bde66ab26858487a9b88ed492690f02a664/SHA2561589c1a1b1cd42c062edddfffc6248eb8316c4db03e055fadbb4387a1d75d57d; all other frozen file hashes above unchanged. Pre-event five active state counts0.
+
+ACTUAL run43325790437/attempt1/push/currenthead4e37de51d64a715a7e1be879314d7468938bf15f at2026-11-12T23:05:20Z: contracts producer131557776153 FAILURE; verify131558005612 SKIPPED. Install exact lock and identity/blob pins succeeded. Command AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs ran1node:test wrapper:0pass/1fail/0skip/0cancel,3529.524019ms. Failure occurred in current compile-only QA transform preflight before runPostAckObserverControls() and before24callbacks. Closed error: fixed-finite-budget-QA plugin assertion Expected values to be strictly equal:6 !== 5. No cause beyond this assertion is established; changing the source needs a separate Root fix-loop and new permit. This is not ACTUAL GREEN or24controls qualified. Related fixed F1–F8 and pure diagnostics/observer tests were SKIPPED, no fabricated counts/witness. Complete prior source in implementation/activation commits remains recoverable for independent review.
+
+Artifact inventory for this run:[] (none uploaded; no ID/bytes/digest/expiry). No current same-input OFF identity proof, successful two-emission supplement, SAFE proof, independent certificate, Native result or custody proof was produced. The workflow's generic T2 native-stage/harness-error-disposed log labels occurred on budgetCompileOnly=true with mf/persist/pair null; they do not evidence an allocation, disposal or Native execution. This task executed no SDK runtime, MF, I0, key, Native R2, CF call, OAuth/customer resource or secret read. Only bounded closed KEYLESS failure output was inspected; no private Native producer logs or cipher downloaded.
+
+Per explicit failure rollback, prepared closure restores World EXACT original5fb78c057b7e80260ae683abf4af892767ce110e and contracts EXACT held15d081b490014bdd5393ed376f70f326e86cd836 (manual/noinputs/nopush/twofalse). Native workflow stays6443a747df3f17c2adcbce6d6037dcc6f4ba364a/manual/noinputs/nopush/twofalse; F7staysf7a71f1a0fa4f5ddf069ff411f008a098455e5cc/sevenfalse. New fixture08f9034068b937e18543fb569bfd88720a2822a8 and test2b514944054c9e0679527062ff148bd6764f9728 stay reviewable, INCOMPLETE/UNQUALIFIED; no PR/main/merge/deploy/publish. Original report507875char prefix plus initial append preserved verbatim. No repair, second run, rerun, hidden qualification or Native activation is authorized. Final full readback follows closure CAS and is separately recorded below. All five readiness flags remainfalse; broader AFW Native16/cloud-PCoff/Max remainsPENDING.
+
+
+### Failure closure readback and STOP
+
+Verified closed Source79afec4178bbc82db2192d75619bbd4f36aaddf0/tree e4da5e528bdf27bbf96379e33572a30a1618feea by full nontruncated recursive readback:3194leaves; all3188protected old leaves exact. World original5fb78c057b7e80260ae683abf4af892767ce110e/218113chars restored exactly; contracts15d081b490014bdd5393ed376f70f326e86cd836/6453chars manual/noinputs/nopush/twofalse; Native6443a747df3f17c2adcbce6d6037dcc6f4ba364a/12093chars manual/noinputs/nopush/twofalse; F7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209chars unchanged/sevenfalse. Fixture08f9034068b937e18543fb569bfd88720a2822a8/47711chars and test2b514944054c9e0679527062ff148bd6764f9728/1643chars exact; both UNQUALIFIED. Full Source files plus F7 re-read byte/character-exact. Report16d1f57d1cec2e6ab43083b7b296f4c0306dc9cf/530341chars at closure preserved all original507875chars and every appended prefix verbatim; this final receipt is append-only.
+
+Main independently unchanged0c9c475b3ebaa970fc11d628b40e50a90cceb727. ExactlyONE run on activation head,43325790437/attempt1/completedfailure; producer131557776153failure/verifier131558005612skipped. All five repository active-state counts queued/in_progress/waiting/pending/requested=0 after closure. No attempt2/repair/secondqualification/Native dispatch. Git objects retain rollback and unique evidence. This final receipt commit changes REPORT ONLY; final branch/ref/tree/files/main/active0 are read back again after it. StatusBLOCKED: initial qualification failed with explicit6!==5 site-inventory assertion; sole permit consumed, no ACTUALGREEN and no Native release. STOP.
+
+
+## Native post-ACK R2 Task1 fix round1/5
+
+### Reviewed fix candidate, pre-qualification checkpoint
+
+Same original actual implementer; sole Source writer. Binding fixbrief93c84abc8892168d85dc7d2073fb62c9338e5950 atRootdocs3a26139bddd9bdf8a21ac2e2f10f3e959fe7c150, with Root N7 opt-in lab-entry ruling and N6 durable addendum06253443f266db4f565be70deb276530e6d1b640 atb76a19567fc634c7447e499adba4f944846dc04b and tighter MODEL rawZIP+uncompressed<=4MiB/manifest<=65536 clarification. Previousrun43325790437 remains consumed and is NOT rerun. ExactlyONE NEW7+2 KEYLESSpush/attempt1 is released after corrections; Native remains HELD. No additional actor/reviewer/subagent, Source path, key, environment binding for KEYLESS, CF/resource permission or local Source execution.
+
+Starting lease independently re-read: Sourceefa4bd8b2fd9327ea3658c344774eb8ad8084748/tree428402280145d596b6cfa8556e5f41525bd9943a;3194leaves/nontruncated, full six files plus F7 exact, main0c9c475b3ebaa970fc11d628b40e50a90cceb727, queued/in_progress/waiting/pending/requested all0. World was intentionally original5fb78c05; intended candidate reinstated from exact6599b33d/476ba287c08c50ab807394d09a0eed78d6d6c908 before scoped fixes, on current parent with CAS/no force/reset. Report ENTIRE531979char prefix/91ef722c3abfe191e282adefdb8003ef78884176 preserved. Six-path scope and all3188protected leaves/F7/SDK/lib/lock/protected tests remain unchanged.
+
+Used systematic-debugging and receiving-code-review guidance: traced actual initial failure through compiler property-read composition, rather than increasing a count. STATIC RED is observed initial run43325790437: literal canonical(pair.first) matcher counted the compiler-wrapped first read as sixth protocol predicate. No new local test is claimed. Tests/counterexamples were authored as string data before the targeted implementations; actual verification is only the forthcoming authorized cloud run. Skills do not broaden its test/Native budgets.
+
+C1: structural recognition now requires exact ordered OR of two !==canonical(expected) comparisons, canonical(pair.first) or the actual fixed __afwBudget.readMethod(pair,'first',false) form in first position, and canonical(pair.second) in second. Original predicate text/operands/order/short circuit remain untouched; only explicit fail remains branded. Still exactly5protocol+1expected mismatch. Controls consume actual current compiler-composed phase source in runner-private data, hash-bound to MODEL; missing/extra/wrong/reordered comparison, duplicate notice and missing ACK negatives use current AST sites, not fragile raw spacing/literal replacement.
+
+C2: private fixed R2 oracle reproduces ONLY all21 frozen R2 predicates from protected test533dafb5df5f8e57442c5b9029dc8dec6dded434: caseR2; writes1/normal1;201inputs/onecorrelation/expiration;foreign unchanged;lists<=2/gets<=200/scopePeak<=2;replay0/native unsettled0/outward pending0;non302/reference0/thirdlistfalse;two preceding pages/counter2;three original readiness flagsfalse. Protected test source/blob and private oracle SHA are pinned without importing/registering the3-case module. ExactlyONE helper invocation; 21 pure mutation families must fail the actual copied private oracle. No R1/R3 invocation or new native call.
+
+I1: original operation/qualification outcome and exact error are recorded before ownership/evidence unwind. Disposal, terminal capture, selection or filesystem failure cannot coerce a known original pass to failure or mask the original rejection/qualification object. Best-effort evidence wraps selector and writes; fixed adapter returns normally on original success, rethrows original object on failure. Evidence failure remains for producer proof/verifier/final job exit. Current private outcome helpers are VM-tested for successful return despite failed evidence, same original/qualification rejection, and unavailable pre-MF outcome; no actual Native execution.
+
+I2: actual MFattachment is tracked separately from owned scratch attachPersist. Pre-MF gate error keeps originalR2Outcome unavailable and preallocationBlocked true, so actual seal eligibility rejects it while existing partial archive preservation remains and deletion unverified. Current job started_at later than official response Date is rejected both at metadata read and synchronous headroom check; current conservative age/margins and>=240s gate remain. Controlled current helper tests cover future start and pre-MF refusal; no timer reset, clock override or budget extension.
+
+I3: current composed issuer/recheck code is VM-exercised against its pre-diagnostic composed original; within each scenario, exact native call args/receiver, issuer record identity/observe args, retain-returned promise and actual wait identity/order are checked, alongside original effects/error. Both pair rejection/abort settlement orders and late consume callback during in-flight grant are exercised; nested/late calls cannot borrow context. A private one-witness issuance guard binds each callback/run; the real runner executes missing/no-op/skipped/forged/double-issuance counterexamples and restores parent control state. Exactly24IDs/one node:test wrapper; failed controls emit a bounded truthful progress/firstFailure record instead of all-pass counts. No nested test registration or default Native registration.
+
+I4: full closed emission validation binds version/profile/phase/path/fields/enums/sites and literal digest, recomputes each actual transform from captured baseline bytes and checks actual output hashes/bytes, rejects missing/empty/Node-contaminated metafiles. ORIGINAL408 OFF and candidate OFF use one captured prepared/raw/virtual input+define set; normalized unique role/path records also match ON pre-diagnostic records for BOTH roles, M ON bytes unchanged. M1 naturally closed by this required normalization, no unrelated polish. Pure preflight produces immutable sanitized model.json+protected budget-artifact.json only; current composed code and actual metafile remain separately private and hash-tied, never uploaded. MODEL is uploaded once7days, max4MiB compressed AND uncompressed, manifest<=65536; actual assigned ID is independently downloaded to a separate readback dir and the protected verifyBudgetArtifact(readback,'pure',REAL_ID) must pass before controls/Native. No dummy ID, no later mutation of sealed MODEL.
+
+I5/N6: both workflows carry uploader ID/digest outputs; MODEL and SAFE download checks compare uploader/API/rawZIP digests plus exact current run/head/name/metadata, exact regular paths/count, UTF8/duplicate JSON keys/CRC/EOF and compressed/uncompressed bounds. Independent verifier downloads sanitized MODEL itself and binds EXACT model.json UTF8 bytes/preflightSha256, SDK bytes/hash, lock, transform/World/current programs, protected test and private oracle from its own checkout. Rejects empty/duplicate/missing/extra/default OFF proof drift, malformed nested flags/emissions and changed model hashes instead of trusting arbitrary64hex. Fixed pure current verifier helper has controlled malformed-proof counterexamples. SAFE remains exactlyresult.json+manifest.json/combined<=65536/rawZIP<=131072; only SAFE may be downloaded by Root/MCP. MODEL metadata only for Root. Native future outputs additionally carry exact assigned cipher ID/uploader digest and original R2 command OUTCOME (not continued conclusion); verifier reconciles all with known original outcome/custody. Unknown/quarantine never yields a verified Native certificate. Existing N1 trusted same-runner limitation preserved; key remains ONLY three terminating steps.
+
+Covering commands prepared for this ONE NEW run, all on GitHub runner: node --check World/newfixture/newtest; current-identity preflightPostAckDiagnostic() with original408 blob5fb78c05 and protected test blob533dafb5; real MODEL upload/digest/assigned-ID readback and verifyBudgetArtifact; AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs; AFW_BUDGET_CONTROL_PHASE=green node --experimental-vm-modules test/fixtures/finite-budget-world.mjs verify-native-preparation-round1 at unchanged45s; node --test --test-concurrency=1 --test-reporter=tap test/finite-budget-diagnostics.test.mjs test/mcp-qa-finite-observer.test.mjs; contracts-proof; exact two-file SAFE upload; independent MODEL+SAFE verification and verify-contracts. Related F1–F8 and the named pure files remain inert by prior actual-body inspection, no full Native or generic npm-test invocation. N7 supersedes the earlier empty=>controls shorthand: absent/empty AFW_POST_ACK_MODE registers ZERO diagnostic tests and performs no key/context/model checks, proof or qualification; explicit controls alone requires the real MODEL receipt and registers one24-callback wrapper. Unknown nonempty mode rejects before allocation. profile_scope VM-exercises the actual test entrypoint statements under a guarded environment proxy for absent/empty/unknown modes. No dummy/local artifact fallback and no skip-based qualification. Production compiler/profile remains defaultOFF. No generic CI/main/PR is launched by this Source push.
+
+Frozen held-source inventory below; actual activation changes only contracts event/runlabel/two gates and its separate digest will be recorded before push. Both new workflows currentlymanual/noinputs/nopush/twofalse, F7exact/sevenfalse. Actual new run/attempt/job/test/control outputs, MODEL+SAFE artifact metadata/digests/expiry, model OFF/ON/supplement/readback and final closure readbacks will be APPENDED after terminal outcome, not invented here.
+
+```json
+[
+  {
+    "path": "test/fixtures/finite-budget-world.mjs",
+    "chars": 234903,
+    "bytes": 234909,
+    "sha256": "e80fad6e84c3a2ee9ec0d466a51c02a0c90d1afb3c1979a8fc332ea9d5e3ac39",
+    "blob": "dd93fc81dcefde271502626fdd5e02a0f9ab0a1a"
+  },
+  {
+    "path": "test/fixtures/finite-post-ack-diagnostic.mjs",
+    "chars": 73508,
+    "bytes": 73508,
+    "sha256": "6d48912cc571517d0adccc3fc8e9f56e36049ede91f23f7e91a973d0521c9a35",
+    "blob": "c71926a067a79168a4d30f80901fb76d308d06e7"
+  },
+  {
+    "path": "test/finite-post-ack-diagnostic.test.mjs",
+    "chars": 1923,
+    "bytes": 1923,
+    "sha256": "cbe41b778c68e74516f9008061d27cdcdc6e8dcf212a93d8ddb24caf8079e462",
+    "blob": "aaf4894d1b411a8ac59debb63ca9368e803141c5"
+  },
+  {
+    "path": ".github/workflows/afw-r2-post-ack-contracts.yml",
+    "chars": 21318,
+    "bytes": 21318,
+    "sha256": "548a99f9c577ae5212016b5f4cc3c7899f4b6902af47a88802000f0f3a84264c",
+    "blob": "1c4d054487e781157cf4fa633f9fc58a5a9cbbf5"
+  },
+  {
+    "path": ".github/workflows/afw-r2-post-ack-diagnostic.yml",
+    "chars": 30086,
+    "bytes": 30086,
+    "sha256": "da20759fd7be5e64f7f62164a0a58bc701b33c89d35175a746868eed56c38fb0",
+    "blob": "8d5b04da0eff2890c70b8ef15a2f51a99c896810"
+  }
+]
+```
+
+Not executed by this fix preparation: Source on PC, Native/SDKruntime/MF/I0, any key/CF/production/OAuth/customer action, PC-off, Native16 or Max. Source bodies are assembled/hashed as bounded data only; no clone/dependencies/build/temp Source files locally. Self-review covered integration seams, static branches, literal five+one inventory, exact2exports, N6 immutable-dir separation, actual MF/outcome hooks and three key bindings. This is implementer self-review, not independent CLEAN or Native permission.
~~~~~~~~~~~~

### test/finite-post-ack-diagnostic.test.mjs

~~~~~~~~~~~~diff
@@ -2,20 +2,21 @@ import assert from 'node:assert/strict';
 import test from 'node:test';
 import {mkdir,writeFile} from 'node:fs/promises';
 import {runPostAckObserverControls} from './fixtures/finite-post-ack-diagnostic.mjs';
-const mode=process.env.AFW_POST_ACK_MODE||'controls';
-assert(['controls','native_r2_once'].includes(mode),'unknown diagnostic mode before allocation');
-assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
+const mode=process.env.AFW_POST_ACK_MODE||'';
+if(mode!=='')assert(['controls','native_r2_once'].includes(mode),'unknown diagnostic mode before allocation');
 if(mode==='controls'){
+ assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
  test('24 named inert post-ACK controls and authentic completion barrier',async()=>{
-  const {preflightPostAckDiagnostic}=await import('./fixtures/finite-budget-world.mjs');
-  await preflightPostAckDiagnostic();
+  const receipt=JSON.parse(await (await import('node:fs/promises')).readFile(process.env.RUNNER_TEMP+'/afw-post-ack-model-receipt.json'));
+  assert.equal(receipt.verified,true);assert.equal(receipt.artifactId,process.env.MODEL_ARTIFACT_ID);assert.equal(receipt.uploaderDigest,process.env.MODEL_ARTIFACT_DIGEST);
   const result=await runPostAckObserverControls();
   assert.equal(result.completed,24);assert.equal(result.pass,24);assert.equal(result.postAssertionExactlyOnce,true);
   await mkdir('output/finite-budget/post-ack-private',{recursive:true});
   await writeFile('output/finite-budget/post-ack-private/controls.json',JSON.stringify(result));
   console.info(JSON.stringify(result));
  });
-}else{
+}else if(mode==='native_r2_once'){
+ assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
  assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
  assert.equal(process.env.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');
  assert.equal(process.env.GITHUB_WORKFLOW,'AFW R2 post-ACK diagnostic');
~~~~~~~~~~~~

### test/fixtures/finite-budget-world.mjs

~~~~~~~~~~~~diff
@@ -756,7 +756,7 @@ async function appendFixedSynAdapter(baseline,family){
 }
 
 export function createBudgetCompiler(role){
- const diagnostic=postAckContexts.getStore(),capture=diagnostic?{role,inputs:new Map(),baseline:[],supplement:[],options:null,output:null,metafile:null}:null;if(capture){assert(!diagnostic.graphs.has(role),'one compiler per role');diagnostic.graphs.set(role,capture);}
+ const diagnostic=postAckContexts.getStore(),capture=diagnostic?{role,inputs:new Map(),baseline:[],preDiagnosticRecords:[],supplement:[],options:null,output:null,metafile:null}:null;if(capture){assert(!diagnostic.graphs.has(role),'one compiler per role');diagnostic.graphs.set(role,capture);}
  assert(['M','QA'].includes(role));const testRevision=process.env.GITHUB_SHA;assert.match(testRevision??'',/^[a-f0-9]{40}$/,'budget actual Actions revision before I0');
  requireOrdinaryObserver();const runtimeOptions={testRevision,workerRole:role};
  const records=new Map(),prepared=new Map(),expected=new Set(budgetNativeDescriptorProposal.sourceDescriptors.filter(p=>p.roles.includes(role)).map(p=>p.path));
@@ -775,8 +775,9 @@ export function createBudgetCompiler(role){
   let result=transformBudgetPreparedSource(source,path,role);let additionalSYN=null;
   if(family&&role==='QA'&&path==='<stdin>'){const emitted=await appendFixedSynAdapter(result.source,family);additionalSYN=emitted.proof;result={...result,source:emitted.source};}
   if(family&&role==='QA'&&['lib/mcp-qa-finite-owner-cleanup.mjs','lib/mcp-qa-finite-initial-lease.mjs'].includes(path)){if(originalSdk)assert.equal(source.split('const actual=retain(api.revokeGrant(selector,i.subject));').length-1,1,'original SDK call and retain unchanged');const emitted=await instrumentFixedSynLibrary(result.source,path,originalSdk?Object.fromEntries(Object.entries(originalSdk).filter(([key])=>key!=='end')):null);additionalSYN=emitted.proof;result={...result,source:emitted.source};}
-  if(capture){capture.inputs.set(path,{contents:source,loader:path.endsWith('.ts')?'ts':'js',resolveDir:path==='<stdin>'?process.cwd():dirname(resolve(path))});capture.baseline.push({role,path,emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source)});if(diagnostic.enabled){const observed=transformPostAckEmission({role,modulePath:path,source:result.source,identity:diagnostic.identity});if(observed.record)capture.supplement.push(observed.record);result={...result,source:observed.source};}}
+  if(capture){capture.inputs.set(path,{contents:source,loader:path.endsWith('.ts')?'ts':'js',resolveDir:path==='<stdin>'?process.cwd():dirname(resolve(path))});capture.baseline.push({role,path,emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source),source:result.source,output:result.source});if(diagnostic.enabled){const observed=transformPostAckEmission({role,modulePath:path,source:result.source,identity:diagnostic.identity});if(observed.record)capture.supplement.push(observed.record);capture.baseline.at(-1).output=observed.source;result={...result,source:observed.source};}}
   records.set(path,{role,path,rawBytes:Buffer.byteLength(raw),rawSha256:hash(raw),preparedBytes:Buffer.byteLength(source),preparedSha256:hash(source),emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source),counts:result.counts,selectors:result.selectorCounts,readerSites:result.readerSites,...additionalSYN?{additionalSYN}:{}});
+  if(capture){const before=capture.baseline.at(-1);capture.preDiagnosticRecords.push({...records.get(path),emittedBytes:before.emittedBytes,emittedSha256:before.emittedSha256});}
   prepared.set(path,result.source);return result.source;
  }
  function plugin(existing=null){
@@ -828,7 +829,7 @@ function createFixedOwnedRecord(frame,kind){
  record.attachPersist=path=>{assert.equal(record.persist,null);record.persist=path;record.events.push('persist-attached');const diagnostic=postAckContexts.getStore();if(diagnostic?.native){diagnostic.allocation=record.ordinal;diagnostic.persistAttached=true;assertPostAckHeadroom(diagnostic.timing);}};
  record.attachFixture=f=>{assert(!record.fixture||record.fixture===f);record.fixture=f;record.events.push('fixture-attached');};
  record.attachMiniflare=mf=>{
-  assert(!record.mf||record.mf===mf);if(record.mf)return;assertFixedBudgetAllocationSafe();record.mf=mf;fixedBudgetOwnedLive.add(record);const original=mf.dispose;assert.equal(typeof original,'function');
+  assert(!record.mf||record.mf===mf);if(record.mf)return;assertFixedBudgetAllocationSafe();record.mf=mf;const diagnostic=postAckContexts.getStore();if(diagnostic?.native){diagnostic.mfAttached=true;diagnostic.allocation=record.ordinal;}fixedBudgetOwnedLive.add(record);const original=mf.dispose;assert.equal(typeof original,'function');
   mf.dispose=()=>record.outwardDisposal??=(async()=>{await record.dispose();if(record.disposeError)throw record.disposeError;})();record.originalDispose=()=>Reflect.apply(original,mf,[]);record.events.push('miniflare-attached');
  };
  record.dispose=()=>record.disposal??= (async()=>{
@@ -906,6 +907,7 @@ async function withFixedBudgetOwner(caseName,root,operation,{recovery=false}={})
  return fixedBudgetOwners.run(frame,async()=>{
   if(recovery){assertFixedBudgetAllocationSafe();const r=createFixedOwnedRecord(frame,'recovery');r.attachPersist(join('output','r2-native-'+(caseName==='P1'?'finite-budget-positive':'budget-'+caseName),'state'));}
   try{value=await operation();}catch(error){primary=noteFixedOwnedUnwind(frame,error);}
+  const diagnostic=postAckContexts.getStore();if(diagnostic?.native&&caseName==='R2'){recordPostAckOriginal(diagnostic,value,primary);primary=diagnostic.originalError??primary;}
   const ownership=await closeFixedOwnedFrame(frame,primary);
   if(value&&typeof value==='object'){value.ownership=ownership;value.diagnostics??={};value.diagnostics.epochs=frame.records.flatMap(r=>r.epochs);if(value.caseName)await fixedBudgetPersist((caseName.startsWith('R')?'readonly/':'reduction/')+caseName,value);}
   return value;
@@ -1940,10 +1942,15 @@ async function replayPostAckBuild(captured,compiler){
  const built=await build({...options,plugins:[compiler.plugin(replay)]});assert.equal(built.errors.length,0);return {bytes:Buffer.from(built.outputFiles[0].contents),records:compiler.records(),metafile:built.metafile};
 }
 function postAckStableInputs(capture){return [...capture.inputs].map(([path,v])=>({path,bytes:Buffer.byteLength(v.contents),sha256:hash(v.contents)})).sort((a,b)=>a.path.localeCompare(b.path));}
+
+function normalizedPostAckRecords(rows){
+ assert(Array.isArray(rows));const keys=rows.map(r=>r.role+':'+r.path);assert.equal(new Set(keys).size,keys.length,'unique role/path records');return [...rows].sort((a,b)=>(a.role+':'+a.path).localeCompare(b.role+':'+b.path));
+}
 export async function preflightPostAckDiagnostic(){
  assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(process.env.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
- const originalPath=resolve('test/fixtures/.finite-post-ack-original.mjs'),originalBytes=await readFile(originalPath),gitBlob=hash(Buffer.concat([Buffer.from('blob '+originalBytes.length+'\0'),originalBytes]));
- assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+originalBytes.length+'\0'),originalBytes])).digest('hex'),'5fb78c057b7e80260ae683abf4af892767ce110e');assert(gitBlob);
+ const originalPath=resolve('test/fixtures/.finite-post-ack-original.mjs'),originalBytes=await readFile(originalPath);
+ assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+originalBytes.length+'\0'),originalBytes])).digest('hex'),'5fb78c057b7e80260ae683abf4af892767ce110e');
+ const protectedTest=await readFile('test/mcp-qa-finite-budget-native.test.mjs');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+protectedTest.length+'\0'),protectedTest])).digest('hex'),'533dafb5df5f8e57442c5b9029dc8dec6dded434');
  const original=await import(pathToFileURL(originalPath).href),current=postAckIdentity(),diagnostic={identity:current,enabled:true,graphs:new Map(),native:false};
  const group=process.env.AFW_BUDGET_GROUP;assert(group===undefined||group==='readonly');let modeled;
  try{
@@ -1956,42 +1963,73 @@ export async function preflightPostAckDiagnostic(){
   for(const role of ['M','QA']){
    const captured=diagnostic.graphs.get(role);assert(captured?.output&&captured.options);
    const before=await replayPostAckBuild(captured,original.createBudgetCompiler(role)),after=await replayPostAckBuild(captured,createBudgetCompiler(role));
-   assert(before.bytes.equals(after.bytes),'same captured inputs/defines ORIGINAL408 vs candidate OFF bytes '+role);assert.deepEqual(before.records,after.records,'all raw/prepared/emitted/three SYN records exact '+role);
+   assert(before.bytes.equals(after.bytes),'same captured inputs/defines ORIGINAL408 vs candidate OFF bytes '+role);
+   const baselineRecords=normalizedPostAckRecords(before.records),offRecords=normalizedPostAckRecords(after.records),onBaselineRecords=normalizedPostAckRecords(captured.preDiagnosticRecords);
+   assert.deepEqual(baselineRecords,offRecords,'original/current OFF raw/prepared/emitted/original SYN records exact '+role);
+   assert.deepEqual(offRecords,onBaselineRecords,'ON pre-diagnostic records equal OFF on same captured inputs '+role);
    if(role==='M')assert(after.bytes.equals(captured.output),'ON M unchanged');
-   offGraphs.push({role,baselineBytes:before.bytes.length,candidateBytes:after.bytes.length,baselineSha256:hash(before.bytes),candidateSha256:hash(after.bytes),equal:true,sameCapturedInputs:true,sameDefines:true,originalAdditionalSYN:before.records.filter(r=>r.additionalSYN).length});
+   const recordsSha256=hash(JSON.stringify(offRecords));offGraphs.push({role,baselineBytes:before.bytes.length,candidateBytes:after.bytes.length,baselineSha256:hash(before.bytes),candidateSha256:hash(after.bytes),equal:true,sameCapturedInputs:true,sameDefines:true,onPreDiagnosticEqual:true,baselineRecordsSha256:recordsSha256,offRecordsSha256:recordsSha256,onPreDiagnosticRecordsSha256:hash(JSON.stringify(onBaselineRecords)),recordCount:offRecords.length,originalAdditionalSYN:offRecords.filter(r=>r.additionalSYN).length});
    baselineInputs[role]=postAckStableInputs(captured);
   }
  }finally{if(group===undefined)delete process.env.AFW_BUDGET_GROUP;else process.env.AFW_BUDGET_GROUP=group;}
- const qa=diagnostic.graphs.get('QA'),supplement=qa.verifiedSupplement;assert(supplement);const sdk=await readFile('node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js'),lock=await readFile('package-lock.json');
+ const qa=diagnostic.graphs.get('QA'),supplement=qa.verifiedSupplement;assert(supplement);
+ const sdk=await readFile('node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js'),lock=await readFile('package-lock.json'),transformBytes=await readFile('test/fixtures/finite-post-ack-diagnostic.mjs'),world=await readFile('test/fixtures/finite-budget-world.mjs');
  assert.equal(sdk.length,251149);assert.equal(hash(sdk),'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+lock.length+'\0'),lock])).digest('hex'),'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');
- const transformBytes=await readFile('test/fixtures/finite-post-ack-diagnostic.mjs'),world=await readFile('test/fixtures/finite-budget-world.mjs');
- const result={purpose:'afw.post-ack-preflight.syn.v1',profile:POST_ACK_PROFILE,context:current,stage:'MODEL ONLY',modelOnly:true,mfAllocated:false,I0Created:false,nativeExecuted:false,offGraphs,supplement,baselineInputs,originalWorldBlob:'5fb78c057b7e80260ae683abf4af892767ce110e',worldSha256:hash(world),transformSha256:hash(transformBytes),sdkFileSha256:hash(sdk),sdkBytes:sdk.length,sdkSites:44,lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',lockSha256:hash(lock),modelGraphs:Object.fromEntries([...diagnostic.graphs].map(([role,v])=>[role,{bytes:v.output.length,sha256:hash(v.output)}])),...Object.fromEntries(['operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'].map(k=>[k,false]))};
- await mkdir('output/finite-budget/post-ack-private',{recursive:true});await writeFile('output/finite-budget/post-ack-private/preflight.json',JSON.stringify(result));await sealBudgetArtifact('output/finite-budget/post-ack-private','pure');return result;
+ const privateDir='output/finite-budget/post-ack-private',modelDir='output/finite-budget/post-ack-model';await mkdir(privateDir,{recursive:true});await mkdir(modelDir,{recursive:true});
+ const phase=qa.baseline.find(r=>r.path==='lib/mcp-qa-finite-owner-phase-context.mjs').source,entry=qa.baseline.find(r=>r.path==='<stdin>').source,metafileBytes=Buffer.from(JSON.stringify(qa.metafile));
+ await writeFile(join(privateDir,'phase-composed.mjs'),phase,{flag:'wx'});await writeFile(join(privateDir,'entry-composed.mjs'),entry,{flag:'wx'});await writeFile(join(privateDir,'qa-metafile.json'),metafileBytes,{flag:'wx'});
+ const result={purpose:'afw.post-ack-preflight.syn.v1',profile:POST_ACK_PROFILE,context:current,stage:'MODEL ONLY',modelOnly:true,mfAllocated:false,I0Created:false,nativeExecuted:false,offGraphs,supplement,baselineInputs,privateCompileHashes:{phaseSha256:hash(phase),entrySha256:hash(entry),qaMetafileSha256:hash(metafileBytes)},originalWorldBlob:'5fb78c057b7e80260ae683abf4af892767ce110e',protectedTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',oracleSha256:hash(qualifyPostAckOriginalR2.toString()),worldSha256:hash(world),transformSha256:hash(transformBytes),sdkFileSha256:hash(sdk),sdkBytes:sdk.length,sdkSites:44,lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',lockSha256:hash(lock),modelGraphs:Object.fromEntries([...diagnostic.graphs].map(([role,v])=>[role,{bytes:v.output.length,sha256:hash(v.output)}])),...Object.fromEntries(['operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'].map(k=>[k,false]))};
+ await writeFile(join(modelDir,'model.json'),JSON.stringify(result),{flag:'wx'});await sealBudgetArtifact(modelDir,'pure');return result;
 }
 function assertPostAckHeadroom(t){
- assert(t&&t.job==='native'&&t.timeoutMinutes===7);assert.deepEqual(t.context,postAckIdentity());assert(Number.isFinite(t.startedAt)&&Number.isFinite(t.responseDate)&&Number.isFinite(t.requestElapsed)&&t.requestElapsed>=0&&t.requestElapsed<=10000);
+ assert(t&&t.job==='native'&&t.timeoutMinutes===7);assert.deepEqual(t.context,postAckIdentity());assert(Number.isFinite(t.startedAt)&&Number.isFinite(t.responseDate)&&Number.isFinite(t.requestElapsed)&&t.requestElapsed>=0&&t.requestElapsed<=10000);assert(t.startedAt<=t.responseDate,'job cannot start after official response time');
  const age=t.metadataAgeMs+performance.now()-t.observedMono;assert(Number.isFinite(age)&&age>=0&&age<=180000);
  const startLower=Math.floor(t.startedAt/1000)*1000,nowUpper=Math.max(Date.now(),Math.ceil(t.responseDate/1000)*1000+1000+t.requestElapsed+age+2000);
  assert(startLower<=nowUpper&&nowUpper-startLower<=180000,'current exact job setup timing');assert(startLower+420000-nowUpper>=240000,'>=240s conservative job headroom before MF/I0');return true;
 }
+function qualifyPostAckOriginalR2(result){
+ const f=result.facts;
+ assert.equal(result.caseName,'R2');assert.equal(f.completeWrites,1);assert.equal(f.completeNormal,1);
+ assert.equal(f.input.entries,201);assert.equal(f.input.correlations,1);assert.equal(f.input.expirationPreserved,true);
+ assert.equal(f.foreignUnchanged,true);assert(f.lists<=2&&f.gets<=200&&f.scopePeak<=2);
+ assert.equal(f.sdkReplay,0);assert.equal(f.nativeUnsettled,0);assert.equal(f.outwardPending,0);
+ assert.notEqual(f.responseStatus,302);assert.equal(f.referenceRows,0);assert.equal(f.thirdListEntered,false);
+ assert.equal(f.boundaryProof.exactPrecedingPages,2);assert.equal(f.boundaryProof.counter,2);
+ assert.equal(result.operationalReadiness,false);assert.equal(result.completePackage,false);assert.equal(result.PCoff,false);
+ return result;
+}
+function recordPostAckOriginal(diagnostic,value,error){
+ diagnostic.originalError=error??null;
+ if(!diagnostic.mfAttached||!diagnostic.harnessReturned){diagnostic.originalR2Outcome='unavailable';return;}
+ if(error){diagnostic.originalR2Outcome='failed';return;}
+ try{qualifyPostAckOriginalR2(value);diagnostic.originalR2Outcome='passed';}
+ catch(qualificationError){diagnostic.originalError=qualificationError;diagnostic.originalR2Outcome='failed';}
+}
+function finishPostAckOriginal(diagnostic){
+ if(diagnostic.originalError)throw diagnostic.originalError;
+}
+
 export async function runPostAckR2Diagnostic(){
  assert.equal(process.env.AFW_POST_ACK_MODE,'native_r2_once');assert.equal(process.env.GITHUB_WORKFLOW,'AFW R2 post-ACK diagnostic');assert.equal(process.env.GITHUB_JOB,'native');assert.equal(process.env.GITHUB_EVENT_NAME,'push');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);assert.equal(process.env.AFW_BUDGET_DIAGNOSTIC_CANDIDATE,undefined);
- const preflight=await preflightPostAckDiagnostic(),preflightBytes=await readFile('output/finite-budget/post-ack-private/preflight.json');
+ const modelBytes=await readFile('output/finite-budget/post-ack-model/model.json'),preflight=JSON.parse(modelBytes),receipt=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-post-ack-model-receipt.json'),'utf8'));
+ assert.deepEqual(preflight.context,postAckIdentity());assert.equal(receipt.modelSha256,hash(modelBytes));assert.equal(receipt.verified,true);assert.equal(receipt.artifactId,process.env.MODEL_ARTIFACT_ID);assert.equal(receipt.uploaderDigest,process.env.MODEL_ARTIFACT_DIGEST);
  const timing=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-post-ack-job-time.json'),'utf8'));timing.observedMono=performance.now();timing.metadataAgeMs=Number((process.hrtime.bigint()-BigInt(timing.observedHrtime))/1000000n);
- const diagnostic={identity:postAckIdentity(),enabled:true,graphs:new Map(),native:true,timing};assertPostAckHeadroom(timing);
- let value,primary=null,originalR2Outcome='unavailable';const group=process.env.AFW_BUDGET_GROUP;process.env.AFW_BUDGET_GROUP='readonly';
- try{value=await postAckContexts.run(diagnostic,()=>runBudgetReadonlyCase('R2'));originalR2Outcome='passed';}
- catch(error){primary=error;const ownedEvidence=fixedBudgetOwnerErrors.get(error),owned=ownedEvidence?.result;if(ownedEvidence?.primary===error&&owned&&diagnostic.allocation&&owned.records.some(r=>r.ordinal===diagnostic.allocation&&r.kind==='initial'&&r.disposed&&r.terminalCapture==='captured'))originalR2Outcome='failed';}
+ const diagnostic={identity:postAckIdentity(),enabled:true,graphs:new Map(),native:true,timing,mfAttached:false,harnessReturned:false,originalR2Outcome:'unavailable',originalError:null};assertPostAckHeadroom(timing);
+ let value,helperError=null;const group=process.env.AFW_BUDGET_GROUP;process.env.AFW_BUDGET_GROUP='readonly';
+ try{value=await postAckContexts.run(diagnostic,()=>runBudgetReadonlyCase('R2'));}
+ catch(error){helperError=error;if(diagnostic.originalR2Outcome==='unavailable')diagnostic.originalError??=error;}
  finally{if(group===undefined)delete process.env.AFW_BUDGET_GROUP;else process.env.AFW_BUDGET_GROUP=group;}
- const ownership=value?.ownership??(primary?fixedBudgetOwnerErrors.get(primary)?.result:null),record=ownership?.records.find(r=>r.ordinal===diagnostic.allocation);
- let mountedProvenance=null;
+ // Everything below is best-effort evidence. It cannot replace a positively recorded original outcome/error.
  try{
-  assert(record&&diagnostic.harnessReturned&&ownership.complete&&record.disposed&&record.archived&&!record.disposalUncertain);assert.equal(record.terminalCapture,'captured');assert.deepEqual(record.graphs.map(r=>r.role).sort(),['M','QA']);const captured=diagnostic.graphs;for(const role of ['M','QA']){const built=captured.get(role);assert(built?.output);const configured=record.graphs.find(r=>r.role===role);assert(configured.mounted);assert.equal(configured.sha256,hash(built.output));assert.equal(configured.bytes,built.output.length);}
-  assert(captured.get('QA').verifiedSupplement);mountedProvenance={status:'verified',context:diagnostic.identity,stage:'actual_configured',profile:POST_ACK_PROFILE,allocationIdentity:record.ordinal,ownedAllocationIdentity:diagnostic.allocation,lifecycleComplete:true,successfulMount:true,actualOptionsVerified:true,modelOnly:false,sdkFileSha256:preflight.sdkFileSha256,sdkBytes:preflight.sdkBytes,sdkSites:preflight.sdkSites,lockBlob:preflight.lockBlob,lockSha256:preflight.lockSha256,mGraphSha256:hash(captured.get('M').output),qaGraphSha256:hash(captured.get('QA').output),transformSha256:preflight.transformSha256,preflightSha256:hash(preflightBytes),emissions:captured.get('QA').supplement.length};
- }catch{}
- const snapshots=(record?.epochs??[]).filter(v=>v.role==='QA'&&v.reason==='terminal-owned-before-dispose').map(v=>({role:v.role,reason:v.reason,allocationIdentity:record.ordinal,snapshot:v.snapshot.postAckDiagnostic}));
- const observation=selectPostAckCertificate({snapshots,mountedProvenance,originalR2Outcome,context:diagnostic.identity});
- await mkdir('output/finite-budget/post-ack-private',{recursive:true});await writeFile('output/finite-budget/post-ack-private/observation.json',JSON.stringify(observation));await writeFile('output/finite-budget/post-ack-private/job-manifest.json',JSON.stringify({purpose:'afw.post-ack-private-job.syn.v1',context:diagnostic.identity,cases:['R2'],diagnosticOnly:true,originalR2Outcome,kind:originalR2Outcome==='passed'?'readonly-result':'consumer-failure',preallocationBlocked:!diagnostic.persistAttached,preMfScratchDeletionVerified:false,operationalReadiness:false}));
- if(primary)throw primary;
- assert.equal(originalR2Outcome,'passed');assert.equal(observation.provenance.status,'verified');assert(['observed','not_observed'].includes(observation.status));return;
+  const ownership=value?.ownership??(helperError?fixedBudgetOwnerErrors.get(helperError)?.result:null),record=ownership?.records.find(r=>r.ordinal===diagnostic.allocation);let mountedProvenance=null;
+  try{
+   assert(record&&diagnostic.harnessReturned&&ownership.complete&&record.disposed&&record.archived&&!record.disposalUncertain);assert.equal(record.terminalCapture,'captured');assert.deepEqual(record.graphs.map(r=>r.role).sort(),['M','QA']);
+   const captured=diagnostic.graphs;for(const role of ['M','QA']){const built=captured.get(role);assert(built?.output);const configured=record.graphs.find(r=>r.role===role);assert(configured.mounted);assert.equal(configured.sha256,hash(built.output));assert.equal(configured.bytes,built.output.length);}
+   assert(captured.get('QA').verifiedSupplement);mountedProvenance={status:'verified',context:diagnostic.identity,stage:'actual_configured',profile:POST_ACK_PROFILE,allocationIdentity:record.ordinal,ownedAllocationIdentity:diagnostic.allocation,lifecycleComplete:true,successfulMount:true,actualOptionsVerified:true,modelOnly:false,sdkFileSha256:preflight.sdkFileSha256,sdkBytes:preflight.sdkBytes,sdkSites:preflight.sdkSites,lockBlob:preflight.lockBlob,lockSha256:preflight.lockSha256,mGraphSha256:hash(captured.get('M').output),qaGraphSha256:hash(captured.get('QA').output),transformSha256:preflight.transformSha256,preflightSha256:hash(modelBytes),emissions:captured.get('QA').supplement.length};
+  }catch{diagnostic.evidenceFailure=true;}
+  const snapshots=(record?.epochs??[]).filter(v=>v.role==='QA'&&v.reason==='terminal-owned-before-dispose').map(v=>({role:v.role,reason:v.reason,allocationIdentity:record.ordinal,snapshot:v.snapshot.postAckDiagnostic}));
+  let observation;try{observation=selectPostAckCertificate({snapshots,mountedProvenance,originalR2Outcome:diagnostic.originalR2Outcome,context:diagnostic.identity});}catch{diagnostic.evidenceFailure=true;observation=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:diagnostic.originalR2Outcome,context:diagnostic.identity});}
+  const privateDir='output/finite-budget/post-ack-private';await mkdir(privateDir,{recursive:true});await writeFile(join(privateDir,'observation.json'),JSON.stringify(observation));await writeFile(join(privateDir,'job-manifest.json'),JSON.stringify({purpose:'afw.post-ack-private-job.syn.v1',context:diagnostic.identity,cases:['R2'],diagnosticOnly:true,originalR2Outcome:diagnostic.originalR2Outcome,kind:diagnostic.originalR2Outcome==='passed'?'readonly-result':'consumer-failure',preallocationBlocked:!diagnostic.mfAttached,mfAttached:diagnostic.mfAttached,persistAttached:diagnostic.persistAttached===true,preMfScratchDeletionVerified:false,operationalReadiness:false}));
+ }catch{diagnostic.evidenceFailure=true;}
+ finishPostAckOriginal(diagnostic);
 }
~~~~~~~~~~~~

### test/fixtures/finite-post-ack-diagnostic.mjs

~~~~~~~~~~~~diff
@@ -26,6 +26,15 @@ function collectorLiteral(current){return [
 'function __paEmit(token,error,rejected){try{if(!token)return;const c=token.ctx;if(!c||c.done){__paInvalid();return;}c.done=true;__paCollector.completed++;if(c.ordinal>32)return;const sameError=!rejected||c.outerError===error;const boundary=rejected&&c.error===error?c.boundary:"unknown";if(!sameError)__paInvalid();__paCollector.records.push({invocationOrdinal:c.ordinal,operation:c.operation,ackReturned:true,postAckEntered:true,outcome:rejected?"rejected":"fulfilled",boundary,sameError});}catch{__paInvalid();}}',
 'export function __afwPostAckSnapshot(){return {purpose:"afw.post-ack-capture.syn.v1",profile:"r2-post-ack-v1",identity:{...__paIdentity},initialized:__paCollector.initialized,completeCapture:!__paCollector.invalid&&!__paCollector.overflow&&__paCollector.pending===0&&__paCollector.completed===__paCollector.invoked,invalid:__paCollector.invalid,overflow:__paCollector.overflow,pending:__paCollector.pending,invoked:__paCollector.invoked,completed:__paCollector.completed,records:__paCollector.records.map(r=>({...r}))};}'
 ].join('\n');}
+function postAckPairComparison(node){
+ const unwrap=n=>ts.isParenthesizedExpression(n)?unwrap(n.expression):n;
+ const call=(n,name)=>ts.isCallExpression(n)&&ts.isIdentifier(n.expression)&&n.expression.text===name&&n.arguments.length===1;
+ const expected=n=>call(n,'canonical')&&ts.isIdentifier(n.arguments[0])&&n.arguments[0].text==='expected';
+ const member=(n,key)=>{n=unwrap(n);if(ts.isPropertyAccessExpression(n))return ts.isIdentifier(n.expression)&&n.expression.text==='pair'&&n.name.text===key;
+  return key==='first'&&ts.isCallExpression(n)&&ts.isPropertyAccessExpression(n.expression)&&ts.isIdentifier(n.expression.expression)&&n.expression.expression.text==='__afwBudget'&&n.expression.name.text==='readMethod'&&n.arguments.length===3&&ts.isIdentifier(n.arguments[0])&&n.arguments[0].text==='pair'&&ts.isStringLiteral(n.arguments[1])&&n.arguments[1].text==='first'&&n.arguments[2].kind===ts.SyntaxKind.FalseKeyword;};
+ const comparison=(n,key)=>{n=unwrap(n);return ts.isBinaryExpression(n)&&n.operatorToken.kind===ts.SyntaxKind.ExclamationEqualsEqualsToken&&call(n.left,'canonical')&&member(n.left.arguments[0],key)&&expected(n.right);};
+ node=unwrap(node);return ts.isBinaryExpression(node)&&node.operatorToken.kind===ts.SyntaxKind.BarBarToken&&comparison(node.left,'first')&&comparison(node.right,'second');
+}
 function phaseTransform(source,current){
  assert(!source.includes('__paCollector'),'no observer collision');const a=ast(source,PHASE),targets=[];
  const visit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body?.getText(a).includes('requireEmptyNotice(expected)'))targets.push(n);ts.forEachChild(n,visit);};visit(a);assert.equal(targets.length,1,'exact issuer recheck');
@@ -40,7 +49,7 @@ function phaseTransform(source,current){
  for(const n of statements){
   if(ts.isIfStatement(n)){
    assert(ts.isExpressionStatement(n.thenStatement)&&ts.isCallExpression(n.thenStatement.expression)&&n.thenStatement.expression.expression.getText(a)==='fail'&&!n.elseStatement,'original explicit invariant');
-   const boundary=n.expression.getText(a).includes('canonical(pair.first)')?'expected_mismatch':'protocol_invariant';wrap(n.thenStatement,boundary);
+   const boundary=postAckPairComparison(n.expression)?'expected_mismatch':'protocol_invariant';wrap(n.thenStatement,boundary);
   }
   if(ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>d.name.getText(a)==='pair')){assert(n.getText(a).includes('await wait(')&&n.getText(a).includes('observeOwnerPhasePair'));pair=n;}
  }
@@ -71,12 +80,26 @@ export function transformPostAckEmission({role,modulePath,source,identity:curren
  ast(output,modulePath);const literalSha256=sha(modulePath===PHASE?collectorLiteral(current):'budgetSnapshot/postAckDiagnostic/v1');
  return {source:output,record:{purpose:'afw.post-ack-emission.syn.v1',version:1,profile:POST_ACK_PROFILE,path:modulePath,phase:'after-baseline',baselineBytes:Buffer.byteLength(source),baselineSha256:sha(source),emittedBytes:Buffer.byteLength(output),emittedSha256:sha(output),transformLiteralSha256:literalSha256,sites,fields:['invocationOrdinal','operation','ackReturned','postAckEntered','outcome','boundary','sameError'],enums:BOUNDARIES,businessAuthority:false,addsAwait:0,addsPromise:0,addsNativeCall:0,changesRetention:false}};
 }
+function validateEmissionShape(record,current){
+ ordinary(record,['purpose','version','profile','path','phase','baselineBytes','baselineSha256','emittedBytes','emittedSha256','transformLiteralSha256','sites','fields','enums','businessAuthority','addsAwait','addsPromise','addsNativeCall','changesRetention']);
+ assert.equal(record.purpose,'afw.post-ack-emission.syn.v1');assert.equal(record.version,1);assert.equal(record.profile,POST_ACK_PROFILE);assert([PHASE,'<stdin>'].includes(record.path));assert.equal(record.phase,'after-baseline');
+ for(const key of ['baselineBytes','emittedBytes'])assert(Number.isSafeInteger(record[key])&&record[key]>0);assert(record.emittedBytes>record.baselineBytes);
+ for(const key of ['baselineSha256','emittedSha256','transformLiteralSha256'])assert(typeof record[key]==='string'&&HASH.test(record[key]));
+ assert.equal(record.transformLiteralSha256,sha(record.path===PHASE?collectorLiteral(current):'budgetSnapshot/postAckDiagnostic/v1'));
+ assert.deepEqual(record.sites,record.path===PHASE?{entry_check:1,notice_guard:1,protocol_invariant:5,pair_wait:1,expected_mismatch:1,exit_check:1,issuer_ack:1}:{budgetSnapshot:1});
+ assert.deepEqual(record.fields,['invocationOrdinal','operation','ackReturned','postAckEntered','outcome','boundary','sameError']);assert.deepEqual(record.enums,BOUNDARIES);
+ for(const key of ['businessAuthority','changesRetention'])assert.equal(record[key],false);for(const key of ['addsAwait','addsPromise','addsNativeCall'])assert.equal(record[key],0);
+}
 export function validatePostAckSupplement({records,baseline,identity:current,metafile}){
  identity(current);assert(Array.isArray(records)&&records.length===2);assert.deepEqual(records.map(r=>r.path).sort(),['<stdin>',PHASE].sort());
- assert(Array.isArray(baseline));for(const r of records){const b=baseline.find(x=>x.role==='QA'&&x.path===r.path);assert(b);assert.equal(r.purpose,'afw.post-ack-emission.syn.v1');assert.equal(r.profile,POST_ACK_PROFILE);assert.equal(r.phase,'after-baseline');assert.equal(r.baselineBytes,b.emittedBytes);assert.equal(r.baselineSha256,b.emittedSha256);assert(HASH.test(r.emittedSha256)&&HASH.test(r.transformLiteralSha256));assert(r.emittedBytes>r.baselineBytes);for(const k of ['addsAwait','addsPromise','addsNativeCall'])assert.equal(r[k],0);assert.equal(r.businessAuthority,false);assert.equal(r.changesRetention,false);}
- assert(!Object.keys(metafile?.inputs??{}).some(p=>/finite-post-ack-diagnostic|finite-budget-world|finite-budget-evidence|finite-budget-descriptors/.test(p)),'Node-only graph exclusion');
- assert.deepEqual(records.find(r=>r.path===PHASE).sites,{entry_check:1,notice_guard:1,protocol_invariant:5,pair_wait:1,expected_mismatch:1,exit_check:1,issuer_ack:1});
- assert.deepEqual(records.find(r=>r.path==='<stdin>').sites,{budgetSnapshot:1});
+ assert(metafile&&typeof metafile==='object'&&metafile.inputs&&typeof metafile.inputs==='object'&&!Array.isArray(metafile.inputs));const inputs=Object.keys(metafile.inputs);assert(inputs.length>0&&inputs.includes(PHASE)&&inputs.includes('<stdin>'),'actual complete metafile');
+ assert(!inputs.some(p=>/finite-post-ack-diagnostic|finite-budget-world|finite-budget-evidence|finite-budget-descriptors/.test(p)),'Node-only graph exclusion');
+ assert(Array.isArray(baseline));const keys=baseline.map(b=>b.role+':'+b.path);assert.equal(new Set(keys).size,keys.length);
+ for(const r of records){
+  validateEmissionShape(r,current);const b=baseline.find(x=>x.role==='QA'&&x.path===r.path);assert(b&&typeof b.source==='string'&&typeof b.output==='string');
+  assert.equal(b.emittedBytes,Buffer.byteLength(b.source));assert.equal(b.emittedSha256,sha(b.source));assert.equal(r.baselineBytes,b.emittedBytes);assert.equal(r.baselineSha256,b.emittedSha256);
+  const actual=transformPostAckEmission({role:'QA',modulePath:r.path,source:b.source,identity:current});assert.deepEqual(r,actual.record);assert.equal(b.output,actual.source);assert.equal(r.emittedBytes,Buffer.byteLength(b.output));assert.equal(r.emittedSha256,sha(b.output));
+ }
  return {purpose:'afw.post-ack-supplement.syn.v1',profile:POST_ACK_PROFILE,context:identity(current),records:structuredClone(records),nodeModuleAbsent:true,businessAuthority:false};
 }
 function observationProjection(v){return {purpose:v.purpose,status:v.status,context:identity(v.context),provenance:{status:v.provenance.status,sdkPackage:v.provenance.sdkPackage,sdkFileSha256:v.provenance.sdkFileSha256,lockSha256:v.provenance.lockSha256,mGraphSha256:v.provenance.mGraphSha256,qaGraphSha256:v.provenance.qaGraphSha256,transformSha256:v.provenance.transformSha256,preflightSha256:v.provenance.preflightSha256},selection:v.selection,invocationOrdinal:v.invocationOrdinal,operation:v.operation,ackReturned:v.ackReturned,postAckEntered:v.postAckEntered,outcome:v.outcome,boundary:v.boundary,quality:v.quality,originalR2Outcome:v.originalR2Outcome,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};}
@@ -118,46 +141,93 @@ export function selectPostAckCertificate({snapshots,mountedProvenance,originalR2
  return validatePostAckResult(result,context);
 }
 
-const VM_SETUP="\n let __paSlot=null,position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false,childCalls=0,postChecks=0,nestedDone=false;\n const sdkOperations=[],expected={records:{issuer:{reservation:{identity:{identityHash:'SYN'},recordHash:'SYN'},operations:Object.fromEntries(['grant','consume','authorization','open_fence'].map(k=>[k,{send:null,ack:null}]))}},issuerRows:{}},ctx={},env={},originalLease={},id='SYN';\n function fail(){throw primary;}\n function check(){effects.push('check');if(position==='issuer-ack'){postChecks++;if(settings.mode==='entry_check'&&postChecks===1||settings.mode==='exit_check'&&postChecks===2)throw primary;}}\n function requireEmptyNotice(){effects.push('notice');if(position==='issuer-ack'&&settings.mode==='notice_guard')throw primary;}\n function canonical(v){effects.push('canonical');if(position==='issuer-ack'&&settings.mode==='unbranded')throw primary;return JSON.stringify(v);}\n function readSdk(){return null;}\n async function wait(p){effects.push('wait');if(position==='issuer-ack'&&settings.mode==='pair_abort')throw primary;return await p;}\n async function observeOwnerPhasePair(){\n  effects.push('pair');\n  if(position==='issuer-ack'&&settings.mode==='pair_wait')throw primary;\n  if(position==='issuer-ack'&&settings.mode==='nested_scope'&&!nestedDone){nestedDone=true;await recheckOwned();}\n  if(position==='issuer-ack'&&settings.mode==='late_scope'&&!nestedDone){nestedDone=true;queueMicrotask(()=>recheckOwned().catch(()=>{}));}\n  return settings.mode==='expected_mismatch'&&position==='issuer-ack'?{first:{SYN:true},second:expected}:{first:expected,second:expected};\n }\n function retain(p){effects.push('retain');return p;}\n function issuerSeal(kind,v){effects.push('seal:'+kind);return {...v,recordHash:'SYN'};}\n function digest(){return 'SYN';}\n async function issuerAppend(kind,record,op){effects.push('append:'+kind);expected.records.issuer.operations[op][kind.toLowerCase()]=record;if(kind==='Ack'&&settings.mode==='protocol_guard')settled=false;}\n";
-const VM_TAIL="\n globalThis.control=(async()=>{let caught=null,returned=[];try{for(const op of settings.operations) {postChecks=0;expected.records.issuer.operations[op]={send:null,ack:null};returned.push(await issuerCall(op,{deadline:123},()=>op==='consume'?{id:'SYN'}:{status:'applied',row:{id:'SYN'}}));}}catch(e){caught=e;}await Promise.resolve();return {caught,returned,snapshot:__afwPostAckSnapshot(),effects,slotEmpty:__paSlot===null};})();\n";
-
+const VM_SETUP="\n let __paSlot=null,position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false,postChecks=0;\n const nested=new Set(),identityFacts={callReceiver:true,callArguments:true,appendIdentity:true,observeArguments:true,promiseIdentity:true,retainIdentity:true,lateDuringGrant:false},retained=[],waited=[],nativePromises=[],sealed=new Map();\n let savedLate=null,lateRan=false,pairReject=null,abortReject=null;\n const sdkOperations=[],expected={records:{issuer:{reservation:{identity:{identityHash:'SYN'},recordHash:'SYN'},operations:Object.fromEntries(['grant','consume','authorization','open_fence'].map(k=>[k,{send:null,ack:null}]))}},issuerRows:{}},ctx={},env={},originalLease={},id='SYN';\n const __afwBudget={readMethod(receiver,key,optional){assert.equal(key,'first');assert.equal(optional,false);return receiver[key];}};\n function fail(){throw primary;}\n function check(){effects.push('check');if(position==='issuer-ack'){postChecks++;if(settings.mode==='entry_check'&&postChecks===1||settings.mode==='exit_check'&&postChecks===2)throw primary;}}\n function requireEmptyNotice(value){assert.equal(this,undefined);assert.equal(value,expected);effects.push('notice');if(position==='issuer-ack'&&settings.mode==='notice_guard')throw primary;}\n function canonical(value){assert.equal(this,undefined);effects.push('canonical');if(position==='issuer-ack'&&settings.mode==='unbranded')throw primary;return JSON.stringify(value);}\n function readSdk(){return null;}\n async function wait(p){\n  assert.equal(this,undefined);waited.push(p);effects.push('wait');\n  if(position==='issuer-ack'&&settings.mode.startsWith('pair_order_')){\n   assert(p instanceof Promise);const abort=new Promise((_,reject)=>{abortReject=reject;}),other=Error('SYN losing race');\n   queueMicrotask(()=>{if(settings.mode==='pair_order_reject_first'){pairReject(primary);queueMicrotask(()=>abortReject(other));}else{abortReject(primary);queueMicrotask(()=>pairReject(other));}});\n   return await Promise.race([p,abort]);\n  }\n  return await p;\n }\n function observeOwnerPhasePair(options){\n  assert.equal(this,undefined);assert.deepEqual(Object.keys(options),['ctx','env','parent','preconnectionId']);assert.equal(options.ctx,ctx);assert.equal(options.env,env);assert.equal(options.parent,originalLease);assert.equal(options.preconnectionId,id);effects.push('pair');\n  if(position==='issuer-ack'&&settings.mode==='pair_wait')return Promise.reject(primary);\n  if(position==='issuer-ack'&&settings.mode.startsWith('pair_order_'))return new Promise((_,reject)=>{pairReject=reject;});\n  if(position==='issuer-ack'&&settings.mode==='nested_scope'&&!nested.has(operation)){nested.add(operation);return (async()=>{await recheckOwned();return {first:expected,second:expected};})();}\n  if(position==='issuer-ack'&&settings.mode==='late_scope'){\n   if(operation==='consume'&&!savedLate)savedLate=()=>recheckOwned();\n   if(operation==='grant'&&savedLate&&!lateRan){lateRan=true;identityFacts.lateDuringGrant=true;return (async()=>{await savedLate();return {first:expected,second:expected};})();}\n  }\n  return Promise.resolve(settings.mode==='expected_mismatch'&&position==='issuer-ack'?{first:{SYN:true},second:expected}:{first:expected,second:expected});\n }\n function retain(p){assert.equal(this,undefined);assert(p instanceof Promise);retained.push(p);effects.push('retain');return p;}\n function issuerSeal(kind,v){assert.equal(this,undefined);effects.push('seal:'+kind);const record={...v,recordHash:'SYN'};sealed.set(kind,record);return record;}\n function digest(){return 'SYN';}\n async function issuerAppend(kind,record,op){assert.equal(this,undefined);assert.equal(record,sealed.get(kind));assert.equal(op,operation);effects.push('append:'+kind);expected.records.issuer.operations[op][kind.toLowerCase()]=record;if(kind==='Ack'&&settings.mode==='protocol_guard')settled=false;}\n";
+const VM_TAIL="\n globalThis.control=(async()=>{let caught=null,returned=[];try{for(const op of settings.operations){\n  postChecks=0;expected.records.issuer.operations[op]={send:null,ack:null};\n  const native=Promise.resolve(op==='consume'?{id:'SYN'}:{status:'applied',row:{id:'SYN'}});nativePromises.push(native);\n  function nativeCall(){assert.equal(this,undefined);assert.equal(arguments.length,0);effects.push('native');return native;}\n  returned.push(await issuerCall(op,{deadline:123},nativeCall));\n }}catch(e){caught=e;}\n await Promise.resolve();assert(retained.every(p=>waited.includes(p)));assert.equal(retained.length,nativePromises.length);identityFacts.promiseIdentity=retained.every(p=>waited.filter(v=>v===p).length===1);identityFacts.retainIdentity=new Set(retained).size===retained.length;\n return {caught,returned,snapshot:__afwPostAckSnapshot(),effects,identityFacts,slotEmpty:__paSlot===null};})();\n";
 const syntheticContext=()=>({repository:REPOSITORY,ref:REF,source:'0'.repeat(40),run:'1',attempt:1,case:'R2'});
 const syntheticProvenance=c=>({status:'verified',context:c,stage:'actual_configured',profile:POST_ACK_PROFILE,allocationIdentity:1,ownedAllocationIdentity:1,lifecycleComplete:true,successfulMount:true,actualOptionsVerified:true,modelOnly:false,sdkFileSha256:'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80',sdkBytes:251149,sdkSites:44,lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64),emissions:2});
 function selectSynthetic(snapshot,options={}){const context=syntheticContext();return selectPostAckCertificate({snapshots:[{role:'QA',reason:'terminal-owned-before-dispose',allocationIdentity:1,snapshot}],mountedProvenance:syntheticProvenance(context),originalR2Outcome:'failed',context,...options});}
 let cachedControlInputs;
 async function controlInputs(){
  if(cachedControlInputs)return cachedControlInputs;
  assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
- const source=await readFile(PHASE,'utf8'),transformed=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}),a=ast(transformed.source,PHASE),functions=[];
+ const source=await readFile('output/finite-budget/post-ack-private/phase-composed.mjs','utf8'),transformed=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}),a=ast(transformed.source,PHASE),functions=[];
  const visit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall')functions.push(n);ts.forEachChild(n,visit);};visit(a);assert.equal(functions.length,1);
  const issuer=functions[0],parent=issuer.parent.statements,recheck=parent.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(a).includes('__paToken'));assert(recheck);
  const prelude=a.statements.filter(n=>ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>['__paIdentity','__paCollector'].includes(d.name.getText(a)))||ts.isFunctionDeclaration(n)&&['__paInvalid','__paBegin','__paBrand','__paEmit','__afwPostAckSnapshot'].includes(n.name?.text)).map(n=>n.getText(a).replace(/^export /,'')).join('\n');
- const preflight=JSON.parse(await readFile('output/finite-budget/post-ack-private/preflight.json','utf8'));
+ const preflight=JSON.parse(await readFile('output/finite-budget/post-ack-model/model.json','utf8'));
  const rawAst=ast(source,PHASE),rawFunctions=[];const rawVisit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall')rawFunctions.push(n);ts.forEachChild(n,rawVisit);};rawVisit(rawAst);assert.equal(rawFunctions.length,1);const rawIssuer=rawFunctions[0],rawRecheck=rawIssuer.parent.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(rawAst).includes('requireEmptyNotice(expected)'));assert(rawRecheck);
- cachedControlInputs={source,transformed,prelude,recheck:recheck.getText(a),issuer:issuer.getText(a),originalRecheck:rawRecheck.getText(rawAst),originalIssuer:rawIssuer.getText(rawAst),preflight};return cachedControlInputs;
+ assert.equal(sha(source),preflight.privateCompileHashes.phaseSha256);const oracleProof=oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8'));cachedControlInputs={source,transformed,prelude,oracleProof,recheck:recheck.getText(a),issuer:issuer.getText(a),originalRecheck:rawRecheck.getText(rawAst),originalIssuer:rawIssuer.getText(rawAst),preflight};return cachedControlInputs;
 }
 async function simulate(mode='ok',operations=['grant'],original=false){
- const {prelude,recheck,issuer,originalRecheck,originalIssuer}=await controlInputs(),primary=Error('SYN original local object'),effects=[],settings={mode,operations},context=createContext({settings,primary,effects,structuredClone,Promise,Error,JSON,Map,Set,queueMicrotask,Miniflare:class{constructor(){throw Error('allocation forbidden');}},createI0(){throw Error('I0 forbidden');}});
- const program=prelude+VM_SETUP+(original?originalRecheck:recheck)+'\n'+(original?originalIssuer:issuer)+VM_TAIL;
+ const {prelude,recheck,issuer,originalRecheck,originalIssuer}=await controlInputs(),primary=Error('SYN original local object'),effects=[],settings={mode,operations},context=createContext({settings,primary,effects,structuredClone,Promise,Error,JSON,Map,Set,queueMicrotask,assert,Miniflare:class{constructor(){throw Error('allocation forbidden');}},createI0(){throw Error('I0 forbidden');}});
+ const program='\"use strict\";\n'+prelude+VM_SETUP+(original?originalRecheck:recheck)+'\n'+(original?originalIssuer:issuer)+VM_TAIL;
  if(mode==='observer_throws')context.settings.mode='expected_mismatch';
  let code=program;if(mode==='observer_throws')code=code.replace('__paCollector.records.push({invocationOrdinal:','(()=>{throw Error("SYN observer");})();__paCollector.records.push({invocationOrdinal:');
  new Script(code).runInContext(context,{timeout:1000});const value=await context.control;
- return {caughtSame:value.caught===primary,caught:value.caught,returned:JSON.parse(JSON.stringify(value.returned)),snapshot:JSON.parse(JSON.stringify(value.snapshot)),effects:[...effects],slotEmpty:value.slotEmpty};
+ return {caughtSame:value.caught===primary,caught:value.caught,returned:JSON.parse(JSON.stringify(value.returned)),snapshot:JSON.parse(JSON.stringify(value.snapshot)),effects:[...effects],identityFacts:JSON.parse(JSON.stringify(value.identityFacts)),slotEmpty:value.slotEmpty};
 }
 const tokens=new WeakMap();let activeControl=null;
-function complete(id){assert.equal(activeControl,id);const token=Object.freeze({});tokens.set(token,id);return token;}
-function completionBarrier(rows){assert.deepEqual(rows.map(r=>r.id),IDS);const seen=new Set();for(const r of rows){assert(!seen.has(r.id)&&tokens.get(r.token)===r.id,'authentic exactly-once completion');seen.add(r.id);}assert.equal(seen.size,24);}
-
+function complete(id){assert(activeControl&&activeControl.id===id,'active callback identity');assert.equal(activeControl.issued,false,'one witness issuance per callback/run');activeControl.issued=true;const token=Object.freeze({});tokens.set(token,{id,run:activeControl.run});return token;}
+function completionBarrier(rows,run){assert.deepEqual(rows.map(r=>r.id),IDS);const seen=new Set();for(const r of rows){const witness=tokens.get(r.token);assert(!seen.has(r.id)&&witness?.id===r.id&&witness.run===run,'authentic exactly-once completion');seen.add(r.id);}assert.equal(seen.size,24);}
+async function executeControlRegistry(registry,progress={completed:0,pass:0,firstFailure:null}){
+ assert.deepEqual(registry.map(([id])=>id),IDS,'complete module-scope registry');const parent=activeControl,run=Object.freeze({}),rows=[];
+ try{for(const [id,callback]of registry){activeControl={id,run,issued:false};try{const token=await callback(),witness=tokens.get(token);assert(activeControl.issued&&witness?.id===id&&witness.run===run,'callback-owned post-final-assertion witness');rows.push({id,token});progress.pass++;}catch(error){progress.firstFailure=id;throw error;}finally{progress.completed++;}}completionBarrier(rows,run);return rows.length;}
+ finally{activeControl=parent;}
+}
+function oracleControls(worldSource){
+ const a=ast(worldSource,'fixed-current-world-oracle'),matches=a.statements.filter(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='qualifyPostAckOriginalR2');assert.equal(matches.length,1);
+ const body=matches[0].getText(a),context=createContext({assert,postAckIdentity:syntheticContext,performance:{now:()=>0}}),good={caseName:'R2',facts:{completeWrites:1,completeNormal:1,input:{entries:201,correlations:1,expirationPreserved:true},foreignUnchanged:true,lists:2,gets:200,scopePeak:2,sdkReplay:0,nativeUnsettled:0,outwardPending:0,responseStatus:400,referenceRows:0,thirdListEntered:false,boundaryProof:{exactPrecedingPages:2,counter:2}},operationalReadiness:false,completePackage:false,PCoff:false};
+ const helpers=['recordPostAckOriginal','finishPostAckOriginal','assertPostAckHeadroom'].map(name=>{const n=a.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);assert(n);return n.getText(a);}).join('\n');
+ new Script(body+';'+helpers+';globalThis.oracle=qualifyPostAckOriginalR2;globalThis.capture=recordPostAckOriginal;globalThis.finish=finishPostAckOriginal;globalThis.headroom=assertPostAckHeadroom;').runInContext(context,{timeout:1000});assert.equal(context.oracle(good),good);
+ const mutations=[v=>v.caseName='R1',v=>v.facts.completeWrites=0,v=>v.facts.completeNormal=0,v=>v.facts.input.entries=200,v=>v.facts.input.correlations=0,v=>v.facts.input.expirationPreserved=false,v=>v.facts.foreignUnchanged=false,v=>v.facts.lists=3,v=>v.facts.gets=201,v=>v.facts.scopePeak=3,v=>v.facts.sdkReplay=1,v=>v.facts.nativeUnsettled=1,v=>v.facts.outwardPending=1,v=>v.facts.responseStatus=302,v=>v.facts.referenceRows=1,v=>v.facts.thirdListEntered=true,v=>v.facts.boundaryProof.exactPrecedingPages=1,v=>v.facts.boundaryProof.counter=1,v=>v.operationalReadiness=true,v=>v.completePackage=true,v=>v.PCoff=true];
+ for(const mutate of mutations){const bad=structuredClone(good);mutate(bad);assert.throws(()=>context.oracle(bad));}
+ const success={mfAttached:true,harnessReturned:true};context.capture(success,good,null);assert.equal(success.originalR2Outcome,'passed');success.evidenceFailure=true;success.disposed=false;assert.doesNotThrow(()=>context.finish(success));
+ const original=Error('SYN exact original rejection'),failure={mfAttached:true,harnessReturned:true};context.capture(failure,null,original);failure.evidenceFailure=true;assert.equal(failure.originalR2Outcome,'failed');assert.throws(()=>context.finish(failure),e=>e===original);
+ const bad=structuredClone(good);bad.facts.completeWrites=0;const qualification={mfAttached:true,harnessReturned:true};context.capture(qualification,bad,null);const qualificationError=qualification.originalError;assert(qualificationError);assert.throws(()=>context.finish(qualification),e=>e===qualificationError);
+ const blocked={mfAttached:false,harnessReturned:false,persistAttached:true};context.capture(blocked,null,original);assert.equal(blocked.originalR2Outcome,'unavailable');assert.throws(()=>context.finish(blocked),e=>e===original);assert.equal(nativeSealEligible({mfAttached:false,preallocationBlocked:true}),false);
+ const now=Date.now(),timing={job:'native',timeoutMinutes:7,context:syntheticContext(),startedAt:now-1000,responseDate:now,requestElapsed:1,metadataAgeMs:0,observedMono:0};context.headroom(timing);assert.throws(()=>context.headroom({...timing,startedAt:now+1}));
+ return {protectedTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',assertionInventory:21,negativeFamilies:mutations.length,allRejected:true,oracleSha256:sha(body),outcomeIsolation:{knownSuccessNormal:true,primaryRejectionSame:true,qualificationErrorSame:true,preMfUnavailable:true,futureJobStartRejected:true}};
+}
 const REGISTRY=Object.freeze([
- ['off_graphs',async()=>{const {preflight:p}=await controlInputs();assert.equal(p.stage,'MODEL ONLY');assert.equal(p.offGraphs.length,2);for(const r of p.offGraphs){assert(r.equal&&r.sameCapturedInputs&&r.sameDefines);assert.equal(r.baselineSha256,r.candidateSha256);assert.equal(r.baselineBytes,r.candidateBytes);}assert.equal(p.offGraphs.find(r=>r.role==='QA').originalAdditionalSYN,3);assert.equal(p.mfAllocated,false);assert.equal(p.I0Created,false);return complete('off_graphs');}],
+ ['off_graphs',async()=>{const {preflight:p}=await controlInputs();const checked=await checkedModel();assert.deepEqual(checked.model,p);validateOffGraphs(p.offGraphs);assert.equal(p.stage,'MODEL ONLY');assert.equal(p.offGraphs.length,2);for(const r of p.offGraphs){assert(r.equal&&r.sameCapturedInputs&&r.sameDefines);assert.equal(r.baselineSha256,r.candidateSha256);assert.equal(r.baselineBytes,r.candidateBytes);}assert.equal(p.offGraphs.find(r=>r.role==='QA').originalAdditionalSYN,3);assert.equal(p.mfAllocated,false);assert.equal(p.I0Created,false);return complete('off_graphs');}],
  ['sdk_pins',async()=>{const {preflight:p}=await controlInputs();const sdk=await readFile('node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js');assert.equal(sdk.length,251149);assert.equal(sha(sdk),p.sdkFileSha256);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');const f7=await readFile('.github/workflows/afw-finite-budget-qualification.yml');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+f7.length+'\0'),f7])).digest('hex'),'f7a71f1a0fa4f5ddf069ff411f008a098455e5cc');return complete('sdk_pins');}],
- ['profile_scope',async()=>{const {source}=await controlInputs();assert.deepEqual(transformPostAckEmission({role:'M',modulePath:PHASE,source,identity:syntheticContext()}),{source,record:null});assert.throws(()=>transformPostAckEmission({role:'other',modulePath:PHASE,source,identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:{...syntheticContext(),attempt:2}}));return complete('profile_scope');}],
- ['sites_exact',async()=>{const {source,transformed}=await controlInputs();assert.equal(transformed.record.sites.protocol_invariant,5);assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source:source.replace('requireEmptyNotice(expected);','requireEmptyNotice(expected);requireEmptyNotice(expected);'),identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source:source.replace("await issuerAppend('Ack',ack,op);",""),identity:syntheticContext()}));return complete('sites_exact');}],
- ['sealer_graph',async()=>{const {preflight:p}=await controlInputs();const records=p.supplement.records,baseline=records.map(r=>({role:'QA',path:r.path,emittedBytes:r.baselineBytes,emittedSha256:r.baselineSha256})),args={records,baseline,identity:p.context,metafile:{inputs:{}}};validatePostAckSupplement(args);assert.throws(()=>validatePostAckSupplement({...args,records:records.slice(1)}));assert.throws(()=>validatePostAckSupplement({...args,records:[...records,records[0]]}));assert.throws(()=>validatePostAckSupplement({...args,baseline:baseline.map((r,i)=>i? r:{...r,emittedSha256:'f'.repeat(64)})}));assert.throws(()=>validatePostAckSupplement({...args,metafile:{inputs:{'test/fixtures/finite-post-ack-diagnostic.mjs':{}}}}));return complete('sealer_graph');}],
+ ['profile_scope',async()=>{const {source}=await controlInputs();assert.deepEqual(transformPostAckEmission({role:'M',modulePath:PHASE,source,identity:syntheticContext()}),{source,record:null});assert.throws(()=>transformPostAckEmission({role:'other',modulePath:PHASE,source,identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:{...syntheticContext(),attempt:2}}));
+ const entry=await readFile('test/finite-post-ack-diagnostic.test.mjs','utf8'),a=ast(entry,'actual-diagnostic-entry'),body=a.statements.filter(n=>!ts.isImportDeclaration(n)).map(n=>n.getText(a)).join('\n');
+ for(const selected of [undefined,'','unknown_mode']){
+  let registrations=0;const reads=[],env=new Proxy({},{get(_target,key){reads.push(key);assert.equal(key,'AFW_POST_ACK_MODE','inactive/unknown branch may only read mode');return selected;}});
+  const vm=createContext({assert,process:{env},test(){registrations++;},Miniflare:class{constructor(){throw Error('allocation forbidden');}},createI0(){throw Error('I0 forbidden');}});
+  if(selected==='unknown_mode')assert.throws(()=>new Script(body).runInContext(vm,{timeout:1000}));else new Script(body).runInContext(vm,{timeout:1000});
+  assert.equal(registrations,0);assert.deepEqual(reads,['AFW_POST_ACK_MODE']);
+ }
+ return complete('profile_scope');
+ }],
+ ['sites_exact',async()=>{const {source,transformed}=await controlInputs();assert.equal(transformed.record.sites.protocol_invariant,5);assert.equal(transformed.record.sites.expected_mismatch,1);
+ const a=ast(source,PHASE),targets=[];const walk=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(a).includes('requireEmptyNotice(expected)'))targets.push(n);ts.forEachChild(n,walk);};walk(a);assert.equal(targets.length,1);const recheck=targets[0],comparison=recheck.body.statements.find(n=>ts.isIfStatement(n)&&postAckPairComparison(n.expression));assert(comparison);
+ const notice=recheck.body.statements.find(n=>ts.isExpressionStatement(n)&&n.expression.getText(a)==='requireEmptyNotice(expected)');assert(notice);const issuer=recheck.parent.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall'),ack=issuer.body.statements.find(n=>n.getText(a).replace(/\s+/g,'')==="awaitissuerAppend('Ack',ack,op);");assert(ack);
+ const variants=[
+ apply(source,[{start:comparison.expression.getStart(a),end:comparison.expression.end,text:'true'}]),
+ apply(source,[{start:comparison.getStart(a),end:comparison.end,text:''}]),
+ apply(source,[{start:comparison.end,end:comparison.end,text:comparison.getText(a)}]),
+ apply(source,[{start:comparison.expression.getStart(a),end:comparison.expression.end,text:'canonical(pair.second)!==canonical(expected)||canonical(pair.first)!==canonical(expected)'}]),
+ apply(source,[{start:notice.end,end:notice.end,text:notice.getText(a)}]),
+ apply(source,[{start:ack.getStart(a),end:ack.end,text:''}])
+ ];
+ for(const bad of variants)assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source:bad,identity:syntheticContext()}));
+ return complete('sites_exact');
+ }],
+ ['sealer_graph',async()=>{
+ const {preflight:p}=await controlInputs(),records=p.supplement.records,metafileBytes=await readFile('output/finite-budget/post-ack-private/qa-metafile.json');assert.equal(sha(metafileBytes),p.privateCompileHashes.qaMetafileSha256);const metafile=JSON.parse(metafileBytes),baseline=[];
+ for(const r of records){const source=await readFile('output/finite-budget/post-ack-private/'+(r.path===PHASE?'phase':'entry')+'-composed.mjs','utf8'),output=transformPostAckEmission({role:'QA',modulePath:r.path,source,identity:p.context}).source;baseline.push({role:'QA',path:r.path,emittedBytes:Buffer.byteLength(source),emittedSha256:sha(source),source,output});}
+ const args={records,baseline,identity:p.context,metafile};validatePostAckSupplement(args);
+ for(const recordsBad of [records.slice(1),[...records,records[0]],records.map((r,i)=>i?r:{...r,version:2}),records.map((r,i)=>i?r:{...r,fields:[]}),records.map((r,i)=>i?r:{...r,enums:[]}),records.map((r,i)=>i?r:{...r,transformLiteralSha256:'f'.repeat(64)}),records.map((r,i)=>i?r:{...r,emittedSha256:'f'.repeat(64)})])assert.throws(()=>validatePostAckSupplement({...args,records:recordsBad}));
+ assert.throws(()=>validatePostAckSupplement({...args,baseline:baseline.map((r,i)=>i?r:{...r,output:r.output+'\\n'})}));
+ for(const meta of [undefined,{}, {inputs:{}},{inputs:{[PHASE]:{},'<stdin>':{},'test/fixtures/finite-post-ack-diagnostic.mjs':{}}}])assert.throws(()=>validatePostAckSupplement({...args,metafile:meta}));
+ return complete('sealer_graph');
+ }],
  ['lexical_op',async()=>{const s=await simulate('expected_mismatch',['consume']);assert(s.caughtSame);assert.equal(s.snapshot.records[0].operation,'consume');const other=await simulate('expected_mismatch',['authorization']);assert.equal(other.snapshot.records.length,0);return complete('lexical_op');}],
  ['one_shot',async()=>{const s=await simulate('ok',['consume','grant']);assert(s.slotEmpty);assert.equal(s.snapshot.invoked,2);assert.deepEqual(s.snapshot.records.map(r=>r.operation),['consume','grant']);assert.equal(s.snapshot.pending,0);return complete('one_shot');}],
- ['nested_scope',async()=>{const s=await simulate('nested_scope');assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,1);assert.equal(s.snapshot.completed,1);assert.equal(s.snapshot.pending,0);return complete('nested_scope');}],
- ['late_scope',async()=>{const s=await simulate('late_scope');assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,1);assert(s.slotEmpty);return complete('late_scope');}],
+ ['nested_scope',async()=>{const s=await simulate('nested_scope',['consume','grant']);assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,2);assert.equal(s.snapshot.completed,2);assert.deepEqual(s.snapshot.records.map(r=>r.operation),['consume','grant']);assert.equal(s.snapshot.pending,0);return complete('nested_scope');}],
+ ['late_scope',async()=>{const s=await simulate('late_scope',['consume','grant']);assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,2);assert.equal(s.identityFacts.lateDuringGrant,true);assert.deepEqual(s.snapshot.records.map(r=>r.operation),['consume','grant']);assert(s.slotEmpty);return complete('late_scope');}],
  ['entry_check',async()=>{const s=await simulate('entry_check');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'entry_check');return complete('entry_check');}],
  ['notice_guard',async()=>{const s=await simulate('notice_guard');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'notice_guard');return complete('notice_guard');}],
  ['protocol_guard',async()=>{const s=await simulate('protocol_guard');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'protocol_invariant');return complete('protocol_guard');}],
@@ -167,51 +237,107 @@ const REGISTRY=Object.freeze([
  ['unbranded',async()=>{const s=await simulate('unbranded');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'unknown');return complete('unbranded');}],
  ['same_error',async()=>{for(const mode of ['entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded']){const s=await simulate(mode);assert(s.caughtSame);assert.equal(s.snapshot.records[0].sameError,true);}return complete('same_error');}],
  ['observer_throws',async()=>{const s=await simulate('observer_throws');assert(s.caughtSame);assert.equal(s.snapshot.invalid,true);assert.equal(selectSynthetic(s.snapshot).status,'invalid');return complete('observer_throws');}],
- ['same_effects',async()=>{for(const mode of ['ok','entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded']){const observed=await simulate(mode),original=await simulate(mode,['grant'],true);assert.deepEqual(observed.effects,original.effects);assert.equal(observed.caughtSame,original.caughtSame);assert.deepEqual(observed.returned,original.returned);}const s=await simulate('ok');assert.equal(s.caught,null);assert.deepEqual(s.returned,[{id:'SYN'}]);assert.equal(s.effects.filter(x=>x==='retain').length,1);assert.equal(s.effects.filter(x=>x==='append:Ack').length,1);assert.equal(s.effects.filter(x=>x==='append:Send').length,1);const {source}=await controlInputs(),emission=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}).source;const count=(text,pattern)=>(text.match(pattern)??[]).length;assert.equal(count(emission,/\bawait\b/g),count(source,/\bawait\b/g));assert.equal(count(emission,/Promise\./g),count(source,/Promise\./g));return complete('same_effects');}],
- ['pair_orders',async()=>{for(const mode of ['pair_wait','pair_abort']){const s=await simulate(mode);assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'pair_wait');}return complete('pair_orders');}],
- ['no_rejection',async()=>{const s=await simulate();assert.equal(selectSynthetic(s.snapshot).status,'not_observed');const foreign=structuredClone(s.snapshot);foreign.identity.run='2';assert.equal(selectSynthetic(foreign).status,'invalid');const unavailable=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:'unavailable',context:syntheticContext()});assert.equal(unavailable.status,'unavailable');assert.equal(unavailable.custody.status,'unavailable');assert.throws(()=>completionBarrier([]));assert.throws(()=>completionBarrier(IDS.map(id=>({id,token:{}}))));assert.throws(()=>completionBarrier(IDS.slice(1).map(id=>({id,token:null}))));return complete('no_rejection');}],
+ ['same_effects',async()=>{for(const mode of ['ok','entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded']){const observed=await simulate(mode),original=await simulate(mode,['grant'],true);assert.deepEqual(observed.effects,original.effects);assert.equal(observed.caughtSame,original.caughtSame);assert.deepEqual(observed.returned,original.returned);for(const flag of ['callReceiver','callArguments','appendIdentity','observeArguments','promiseIdentity','retainIdentity']){assert.equal(observed.identityFacts[flag],true);assert.equal(original.identityFacts[flag],true);}}const s=await simulate('ok');assert.equal(s.caught,null);assert.deepEqual(s.returned,[{id:'SYN'}]);assert.equal(s.effects.filter(x=>x==='retain').length,1);assert.equal(s.effects.filter(x=>x==='append:Ack').length,1);assert.equal(s.effects.filter(x=>x==='append:Send').length,1);const {source}=await controlInputs(),emission=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}).source;const count=(text,pattern)=>(text.match(pattern)??[]).length;assert.equal(count(emission,/\bawait\b/g),count(source,/\bawait\b/g));assert.equal(count(emission,/Promise\./g),count(source,/Promise\./g));return complete('same_effects');}],
+ ['pair_orders',async()=>{for(const mode of ['pair_order_reject_first','pair_order_abort_first']){const s=await simulate(mode),baseline=await simulate(mode,['grant'],true);assert(s.caughtSame&&baseline.caughtSame);assert.deepEqual(s.effects,baseline.effects);assert.equal(s.snapshot.records[0].boundary,'pair_wait');}return complete('pair_orders');}],
+ ['no_rejection',async()=>{const s=await simulate();assert.equal(selectSynthetic(s.snapshot).status,'not_observed');const foreign=structuredClone(s.snapshot);foreign.identity.run='2';assert.equal(selectSynthetic(foreign).status,'invalid');const unavailable=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:'unavailable',context:syntheticContext()});assert.equal(unavailable.status,'unavailable');assert.equal(unavailable.custody.status,'unavailable');
+ const changed=callback=>REGISTRY.map(([id,fn],i)=>[id,i===0?callback:fn]);
+ await assert.rejects(()=>executeControlRegistry(REGISTRY.slice(1)));
+ await assert.rejects(()=>executeControlRegistry(changed(async()=>undefined)));
+ await assert.rejects(()=>executeControlRegistry(changed(async()=>({skip:true}))));
+ await assert.rejects(()=>executeControlRegistry(changed(async()=>Object.freeze({}))));
+ await assert.rejects(()=>executeControlRegistry(changed(async()=>{complete('off_graphs');return complete('off_graphs');})));
+ return complete('no_rejection');
+ }],
  ['overflow',async()=>{const s=await simulate('ok',Array.from({length:33},()=> 'grant'));assert.equal(s.snapshot.overflow,true);assert.equal(selectSynthetic(s.snapshot).status,'invalid');const r=await simulate('expected_mismatch');const bad=structuredClone(r.snapshot);bad.records.push({...bad.records[0],invocationOrdinal:2});bad.invoked=2;bad.completed=2;assert.equal(selectSynthetic(bad).status,'invalid');return complete('overflow');}],
- ['schema',async()=>{const c=syntheticContext(),v={purpose:PURPOSE,status:'observed',context:c,provenance:{status:'verified',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1',sdkFileSha256:'0'.repeat(64),lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64)},selection:'unique_qualified_rejection',invocationOrdinal:1,operation:'grant',ackReturned:true,postAckEntered:true,outcome:'rejected',boundary:'expected_mismatch',quality:'qualified',originalR2Outcome:'failed',custody:unavailableCustody(),...Object.fromEntries(FLAGS.map(k=>[k,false]))};validatePostAckResult(v,c);const bytes=JSON.stringify(observationProjection(v));assert.equal(Buffer.byteLength(bytes),1221);assert.equal(sha(bytes),'47a77ac116e8d5514defb5fa615de87bf01e16968d30254a8754f389be59a005');assert.equal(observationHash(Object.fromEntries(Object.entries(v).reverse())),sha(bytes));for(const key of FLAGS)assert.throws(()=>validatePostAckResult({...v,[key]:true},c));assert.throws(()=>validatePostAckResult({...v,extra:true},c));assert.notEqual(observationHash({...v,originalR2Outcome:'passed'}),sha(bytes));assert.notEqual(observationHash({...v,context:{...c,run:'2'}}),sha(bytes));assert.notEqual(observationHash({...v,provenance:{...v.provenance,preflightSha256:'f'.repeat(64)}}),sha(bytes));return complete('schema');}],
- ['provenance',async()=>{const s=await simulate('expected_mismatch'),c=syntheticContext(),p=syntheticProvenance(c);for(const edit of [{stage:'MODEL ONLY'},{modelOnly:true},{actualOptionsVerified:false},{lifecycleComplete:false},{successfulMount:false},{ownedAllocationIdentity:2},{emissions:1},{sdkSites:43},{sdkFileSha256:'f'.repeat(64)},{context:{...c,run:'2'}},{context:{...c,source:'f'.repeat(40)}}])assert.equal(selectSynthetic(s.snapshot,{mountedProvenance:{...p,...edit}}).status,'invalid');const pass=selectSynthetic(s.snapshot,{originalR2Outcome:'passed'});assert.equal(pass.originalR2Outcome,'passed');assert.equal(pass.custody.status,'unavailable');assert.throws(()=>validatePostAckResult({...pass,custody:{status:'verified',artifactId:'1',zipSha256:'0'.repeat(64),observationSha256:'f'.repeat(64),reopenVerified:true}},c));return complete('provenance');}]
+ ['schema',async()=>{const c=syntheticContext(),v={purpose:PURPOSE,status:'observed',context:c,provenance:{status:'verified',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1',sdkFileSha256:'0'.repeat(64),lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64)},selection:'unique_qualified_rejection',invocationOrdinal:1,operation:'grant',ackReturned:true,postAckEntered:true,outcome:'rejected',boundary:'expected_mismatch',quality:'qualified',originalR2Outcome:'failed',custody:unavailableCustody(),...Object.fromEntries(FLAGS.map(k=>[k,false]))};validatePostAckResult(v,c);const bytes=JSON.stringify(observationProjection(v));assert.equal(Buffer.byteLength(bytes),1221);assert.equal(sha(bytes),'47a77ac116e8d5514defb5fa615de87bf01e16968d30254a8754f389be59a005');assert.equal(observationHash(Object.fromEntries(Object.entries(v).reverse())),sha(bytes));for(const key of FLAGS)assert.throws(()=>validatePostAckResult({...v,[key]:true},c));assert.throws(()=>validatePostAckResult({...v,extra:true},c));assert.notEqual(observationHash({...v,originalR2Outcome:'passed'}),sha(bytes));assert.notEqual(observationHash({...v,context:{...c,run:'2'}}),sha(bytes));assert.notEqual(observationHash({...v,provenance:{...v.provenance,preflightSha256:'f'.repeat(64)}}),sha(bytes));const record={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed:24,pass:24,fail:0,inventory:[...IDS],firstFailure:null,postAssertionExactlyOnce:true,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};validateControlRecord(record);for(const key of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.throws(()=>validateControlRecord({...record,[key]:true}));assert.throws(()=>validateControlRecord({...record,inventory:IDS.slice(1)}));
+ const {preflight:model}=await controlInputs();validateModelShape(model,model.context);for(const mutate of [m=>m.offGraphs=[],m=>m.offGraphs[1].role='M',m=>m.offGraphs[0].onPreDiagnosticEqual=false,m=>m.supplement.records[0].fields=[],m=>m.supplement.records[0].version=2,m=>m.supplement.records[0].transformLiteralSha256='f'.repeat(64),m=>m.modelGraphs.M.sha256='f'.repeat(64),m=>m.nativeExecuted=true,m=>m.privateCompileHashes.phaseSha256='f'.repeat(64)]){const bad=structuredClone(model);mutate(bad);assert.throws(()=>validateModelShape(bad,model.context));}
+ const checked=await checkedModel(),programs=await currentPrograms(),formatProof={purpose:'afw.post-ack-contracts.safe.v1',context:model.context,controls:record,programs,preflight:modelProjection(checked.model,checked.sha256),modelReceipt:checked.receipt,oracle:oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8')),related:{purpose:'afw.closed-pure-controls.syn.v2',groups:['F1','F2','F3','F4','F5','F6','F7','F8'].map(group=>({group,passed:true,evidence:{bytes:1,sha256:'0'.repeat(64)},caseCount:1})),passed:true,pureTests:{tests:1,pass:1,fail:0,skipped:0,cancelled:0,tapSha256:'0'.repeat(64)}},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};
+ validateContractsProof(formatProof,model.context,programs,checked);
+ for(const mutate of [p=>p.preflight.offGraphs=[],p=>p.preflight.offGraphs[1].role='M',p=>p.preflight.modelGraphs.QA.sha256='f'.repeat(64),p=>p.preflight.preflightSha256='f'.repeat(64),p=>p.modelReceipt.artifactId='999',p=>p.modelReceipt.uploaderDigest='f'.repeat(64),p=>p.controls.nativeExecuted=true,p=>p.controls.PCoff=true,p=>p.preflight.supplement.records[0].fields=[],p=>p.programs.pop()]){const bad=structuredClone(formatProof);mutate(bad);assert.throws(()=>validateContractsProof(bad,model.context,programs,checked));}
+ return complete('schema');}],
+ ['provenance',async()=>{const {oracleProof}=await controlInputs();assert.equal(oracleProof.negativeFamilies,21);assert.equal(oracleProof.allRejected,true);const s=await simulate('expected_mismatch'),c=syntheticContext(),p=syntheticProvenance(c);for(const edit of [{stage:'MODEL ONLY'},{modelOnly:true},{actualOptionsVerified:false},{lifecycleComplete:false},{successfulMount:false},{ownedAllocationIdentity:2},{emissions:1},{sdkSites:43},{sdkFileSha256:'f'.repeat(64)},{context:{...c,run:'2'}},{context:{...c,source:'f'.repeat(40)}}])assert.equal(selectSynthetic(s.snapshot,{mountedProvenance:{...p,...edit}}).status,'invalid');const pass=selectSynthetic(s.snapshot,{originalR2Outcome:'passed'});assert.equal(pass.originalR2Outcome,'passed');assert.equal(pass.custody.status,'unavailable');assert.throws(()=>validatePostAckResult({...pass,custody:{status:'verified',artifactId:'1',zipSha256:'0'.repeat(64),observationSha256:'f'.repeat(64),reopenVerified:true}},c));return complete('provenance');}]
 ]);
 export async function runPostAckObserverControls(){
- assert.deepEqual(REGISTRY.map(([id])=>id),IDS);assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
- const rows=[];let failed=null;
- for(const [id,callback]of REGISTRY){assert.equal(activeControl,null);activeControl=id;try{const token=await callback();assert.equal(tokens.get(token),id,'callback-owned post-final-assertion completion');rows.push({id,token});}catch{failed=id;throw Error('post_ack_control_failed:'+id);}finally{activeControl=null;}}
- completionBarrier(rows);const result={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed:24,pass:24,fail:0,inventory:[...IDS],firstFailure:failed,postAssertionExactlyOnce:true,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};assert(Buffer.byteLength(JSON.stringify(result))<=2048);return result;
+ assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const progress={completed:0,pass:0,firstFailure:null};
+ try{
+  const completed=await executeControlRegistry(REGISTRY,progress);assert.equal(completed,24);
+  const result={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed,pass:completed,fail:0,inventory:[...IDS],firstFailure:null,postAssertionExactlyOnce:true,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};assert(Buffer.byteLength(JSON.stringify(result))<=2048);return result;
+ }catch(error){
+  const failure={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed:progress.completed,pass:progress.pass,fail:1,inventory:[...IDS],firstFailure:progress.firstFailure,postAssertionExactlyOnce:false,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};assert(Buffer.byteLength(JSON.stringify(failure))<=2048);console.info(JSON.stringify(failure));try{await writeFile('output/finite-budget/post-ack-private/controls-failure.json',JSON.stringify(failure));}catch{}throw error;
+ }
 }
 
-const PROGRAM_PATHS=["test/fixtures/finite-budget-world.mjs","test/fixtures/finite-post-ack-diagnostic.mjs","test/finite-post-ack-diagnostic.test.mjs",".github/workflows/afw-r2-post-ack-contracts.yml",".github/workflows/afw-r2-post-ack-diagnostic.yml",".github/workflows/afw-finite-budget-qualification.yml","package-lock.json","lib/mcp-qa-finite-owner-phase-context.mjs","test/fixtures/finite-initial-entry-world.mjs","test/fixtures/finite-checkpoint-custody.mjs"];
+const PROGRAM_PATHS=["test/fixtures/finite-budget-world.mjs","test/fixtures/finite-post-ack-diagnostic.mjs","test/finite-post-ack-diagnostic.test.mjs",".github/workflows/afw-r2-post-ack-contracts.yml",".github/workflows/afw-r2-post-ack-diagnostic.yml",".github/workflows/afw-finite-budget-qualification.yml","package-lock.json","lib/mcp-qa-finite-owner-phase-context.mjs","test/fixtures/finite-initial-entry-world.mjs","test/fixtures/finite-checkpoint-custody.mjs","test/mcp-qa-finite-budget-native.test.mjs"];
+
 
+function validateControlRecord(c){
+ ordinary(c,['purpose','expected','completed','pass','fail','inventory','firstFailure','postAssertionExactlyOnce',...FLAGS,'nativeExecuted','mfAllocated','I0Created']);assert.equal(c.purpose,'AFW_POST_ACK_CONTROLS/1');assert.deepEqual(c.inventory,IDS);for(const k of ['expected','completed','pass'])assert.equal(c[k],24);assert.equal(c.fail,0);assert.equal(c.firstFailure,null);assert.equal(c.postAssertionExactlyOnce,true);for(const k of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.equal(c[k],false);assert(Buffer.byteLength(JSON.stringify(c))<=2048);
+}
+function validateOffGraphs(graphs){
+ assert(Array.isArray(graphs)&&graphs.length===2);assert.deepEqual(graphs.map(g=>g.role).sort(),['M','QA']);for(const g of graphs){ordinary(g,['role','baselineBytes','candidateBytes','baselineSha256','candidateSha256','equal','sameCapturedInputs','sameDefines','onPreDiagnosticEqual','baselineRecordsSha256','offRecordsSha256','onPreDiagnosticRecordsSha256','recordCount','originalAdditionalSYN']);for(const k of ['baselineBytes','candidateBytes','recordCount'])assert(Number.isSafeInteger(g[k])&&g[k]>0);assert.equal(g.baselineBytes,g.candidateBytes);for(const k of ['baselineSha256','candidateSha256','baselineRecordsSha256','offRecordsSha256','onPreDiagnosticRecordsSha256'])assert(typeof g[k]==='string'&&HASH.test(g[k]));assert.equal(g.baselineSha256,g.candidateSha256);assert.equal(g.baselineRecordsSha256,g.offRecordsSha256);assert.equal(g.offRecordsSha256,g.onPreDiagnosticRecordsSha256);for(const k of ['equal','sameCapturedInputs','sameDefines','onPreDiagnosticEqual'])assert.equal(g[k],true);assert.equal(g.originalAdditionalSYN,g.role==='QA'?3:0);}
+}
+function validateModelShape(p,current){
+ ordinary(p,['purpose','profile','context','stage','modelOnly','mfAllocated','I0Created','nativeExecuted','offGraphs','supplement','baselineInputs','privateCompileHashes','originalWorldBlob','protectedTestBlob','oracleSha256','worldSha256','transformSha256','sdkFileSha256','sdkBytes','sdkSites','lockBlob','lockSha256','modelGraphs',...FLAGS]);
+ assert.equal(p.purpose,'afw.post-ack-preflight.syn.v1');assert.equal(p.profile,POST_ACK_PROFILE);assert.deepEqual(p.context,identity(current));assert.equal(p.stage,'MODEL ONLY');assert.equal(p.modelOnly,true);for(const k of [...FLAGS,'mfAllocated','I0Created','nativeExecuted'])assert.equal(p[k],false);
+ assert.equal(p.originalWorldBlob,'5fb78c057b7e80260ae683abf4af892767ce110e');assert.equal(p.protectedTestBlob,'533dafb5df5f8e57442c5b9029dc8dec6dded434');assert.equal(p.sdkFileSha256,'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80');assert.equal(p.sdkBytes,251149);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');
+ for(const k of ['oracleSha256','worldSha256','transformSha256','sdkFileSha256','lockSha256'])assert(typeof p[k]==='string'&&HASH.test(p[k]));
+ validateOffGraphs(p.offGraphs);ordinary(p.supplement,['purpose','profile','context','records','nodeModuleAbsent','businessAuthority']);assert.equal(p.supplement.purpose,'afw.post-ack-supplement.syn.v1');assert.equal(p.supplement.profile,POST_ACK_PROFILE);assert.deepEqual(p.supplement.context,current);assert.equal(p.supplement.nodeModuleAbsent,true);assert.equal(p.supplement.businessAuthority,false);assert.equal(p.supplement.records.length,2);assert.deepEqual(p.supplement.records.map(r=>r.path).sort(),['<stdin>',PHASE].sort());for(const r of p.supplement.records)validateEmissionShape(r,current);
+ ordinary(p.modelGraphs,['M','QA']);for(const role of ['M','QA']){const g=p.modelGraphs[role];ordinary(g,['bytes','sha256']);assert(Number.isSafeInteger(g.bytes)&&g.bytes>0&&typeof g.sha256==='string'&&HASH.test(g.sha256));}assert.equal(p.modelGraphs.M.sha256,p.offGraphs.find(g=>g.role==='M').baselineSha256);
+ ordinary(p.privateCompileHashes,['phaseSha256','entrySha256','qaMetafileSha256']);for(const value of Object.values(p.privateCompileHashes))assert(typeof value==='string'&&HASH.test(value));assert.equal(p.privateCompileHashes.phaseSha256,p.supplement.records.find(r=>r.path===PHASE).baselineSha256);assert.equal(p.privateCompileHashes.entrySha256,p.supplement.records.find(r=>r.path==='<stdin>').baselineSha256);
+ ordinary(p.baselineInputs,['M','QA']);for(const role of ['M','QA']){const list=p.baselineInputs[role];assert(Array.isArray(list)&&list.length>0);assert.equal(new Set(list.map(r=>r.path)).size,list.length);for(const r of list){ordinary(r,['path','bytes','sha256']);ascii(r.path);assert(Number.isSafeInteger(r.bytes)&&r.bytes>0&&typeof r.sha256==='string'&&HASH.test(r.sha256));}}
+ return p;
+}
+async function checkedModel(){
+ const current=executionContext(),root=process.env.RUNNER_TEMP+'/afw-post-ack-model-readback',bytes=await readFile(root+'/model.json'),p=validateModelShape(JSON.parse(bytes),current),receipt=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-post-ack-model-receipt.json'));
+ ordinary(receipt,['artifactId','uploaderDigest','apiDigest','rawZipSha256','modelSha256','verified','context']);assert.deepEqual(receipt.context,current);assert.equal(receipt.verified,true);assert.equal(receipt.artifactId,process.env.MODEL_ARTIFACT_ID);assert.equal(receipt.uploaderDigest,process.env.MODEL_ARTIFACT_DIGEST);assert(HASH.test(receipt.uploaderDigest));assert.equal(receipt.apiDigest,'sha256:'+receipt.uploaderDigest);assert.equal(receipt.rawZipSha256,receipt.uploaderDigest);assert.equal(receipt.modelSha256,sha(bytes));
+ const pins=[['node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js','sdkFileSha256'],['package-lock.json','lockSha256'],['test/fixtures/finite-post-ack-diagnostic.mjs','transformSha256'],['test/fixtures/finite-budget-world.mjs','worldSha256']];
+ for(const [path,key]of pins)assert.equal(sha(await readFile(path)),p[key]);
+ const test=await readFile('test/mcp-qa-finite-budget-native.test.mjs');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+test.length+'\0'),test])).digest('hex'),p.protectedTestBlob);
+ const world=await readFile('test/fixtures/finite-budget-world.mjs','utf8'),a=ast(world,'current-world-pin'),oracle=a.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='qualifyPostAckOriginalR2');assert(oracle);assert.equal(sha(oracle.getText(a)),p.oracleSha256);
+ return {model:p,receipt,sha256:sha(bytes)};
+}
+function modelProjection(p,digest){return {purpose:p.purpose,profile:p.profile,stage:p.stage,offGraphs:p.offGraphs,supplement:p.supplement,modelGraphs:p.modelGraphs,privateCompileHashes:p.privateCompileHashes,sdkFileSha256:p.sdkFileSha256,sdkBytes:p.sdkBytes,sdkSites:p.sdkSites,lockBlob:p.lockBlob,lockSha256:p.lockSha256,worldSha256:p.worldSha256,transformSha256:p.transformSha256,protectedTestBlob:p.protectedTestBlob,oracleSha256:p.oracleSha256,preflightSha256:digest};}
 function executionContext(){return identity({repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:Number(process.env.GITHUB_RUN_ATTEMPT),case:'R2'});}
 async function currentPrograms(){const files=[];for(const path of PROGRAM_PATHS){const b=await readFile(path);files.push({path,bytes:b.length,sha256:sha(b)});}return files;}
 async function writeProof(result){
  const context=executionContext(),root='output/finite-budget/post-ack-safe';await mkdir(root,{recursive:true});const bytes=Buffer.from(JSON.stringify(result));assert(bytes.length<=60000);await writeFile(root+'/result.json',bytes);
  const manifest={purpose:'afw.native-post-ack-r2-manifest.safe.v1',context,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]};const m=Buffer.from(JSON.stringify(manifest));assert(m.length+bytes.length<=65536);await writeFile(root+'/manifest.json',m);
 }
 async function contractsProof(){
- assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const context=executionContext(),controls=JSON.parse(await readFile('output/finite-budget/post-ack-private/controls.json')),p=JSON.parse(await readFile('output/finite-budget/post-ack-private/preflight.json'));
- assert.equal(controls.pass,24);assert.deepEqual(controls.inventory,IDS);assert.deepEqual(p.context,context);
+ assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const context=executionContext(),controls=JSON.parse(await readFile('output/finite-budget/post-ack-private/controls.json')),checked=await checkedModel();validateControlRecord(controls);
  const related=JSON.parse(await readFile('output/finite-budget/pure/controls.json'));assert.equal(related.passed,true);assert.deepEqual(related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);
- await writeProof({purpose:'afw.post-ack-contracts.safe.v1',context,controls,programs:await currentPrograms(),preflight:{purpose:p.purpose,profile:p.profile,stage:p.stage,offGraphs:p.offGraphs,supplement:p.supplement,sdkFileSha256:p.sdkFileSha256,sdkBytes:p.sdkBytes,sdkSites:p.sdkSites,lockBlob:p.lockBlob,lockSha256:p.lockSha256,worldSha256:p.worldSha256,transformSha256:p.transformSha256,preflightSha256:sha(await readFile('output/finite-budget/post-ack-private/preflight.json'))},related:{purpose:related.purpose,groups:related.groups.map(g=>({group:g.group,passed:g.passed,evidence:g.evidence,caseCount:g.caseCount})),passed:true},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false});
+ const tap=await readFile('output/finite-budget/post-ack-private/related.tap','utf8'),count=name=>{const hits=[...tap.matchAll(new RegExp('^# '+name+' ([0-9]+)$','gm'))];assert.equal(hits.length,1);return Number(hits[0][1]);},pureTests={tests:count('tests'),pass:count('pass'),fail:count('fail'),skipped:count('skipped'),cancelled:count('cancelled'),tapSha256:sha(tap)};assert(pureTests.tests>0&&pureTests.pass===pureTests.tests&&pureTests.fail===0&&pureTests.skipped===0&&pureTests.cancelled===0);
+ await writeProof({purpose:'afw.post-ack-contracts.safe.v1',context,controls,programs:await currentPrograms(),preflight:modelProjection(checked.model,checked.sha256),modelReceipt:checked.receipt,oracle:oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8')),related:{purpose:related.purpose,groups:related.groups.map(g=>({group:g.group,passed:g.passed,evidence:g.evidence,caseCount:g.caseCount})),passed:true,pureTests},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false});
+}
+function validateContractsProof(r,context,programs,checked){
+  ordinary(r,['purpose','context','controls','programs','preflight','modelReceipt','oracle','related',...FLAGS,'nativeExecuted','mfAllocated','I0Created']);assert.equal(r.purpose,'afw.post-ack-contracts.safe.v1');assert.deepEqual(r.context,context);assert.deepEqual(r.programs,programs);validateControlRecord(r.controls);assert.deepEqual(r.preflight,modelProjection(checked.model,checked.sha256));assert.deepEqual(r.modelReceipt,checked.receipt);
+  ordinary(r.oracle,['protectedTestBlob','assertionInventory','negativeFamilies','allRejected','oracleSha256','outcomeIsolation']);ordinary(r.oracle.outcomeIsolation,['knownSuccessNormal','primaryRejectionSame','qualificationErrorSame','preMfUnavailable','futureJobStartRejected']);for(const value of Object.values(r.oracle.outcomeIsolation))assert.equal(value,true);assert.equal(r.oracle.protectedTestBlob,checked.model.protectedTestBlob);assert.equal(r.oracle.oracleSha256,checked.model.oracleSha256);assert.equal(r.oracle.assertionInventory,21);assert.equal(r.oracle.negativeFamilies,21);assert.equal(r.oracle.allRejected,true);
+  ordinary(r.related,['purpose','groups','passed','pureTests']);assert.equal(r.related.purpose,'afw.closed-pure-controls.syn.v2');assert.equal(r.related.passed,true);assert.deepEqual(r.related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);for(const g of r.related.groups){ordinary(g,['group','passed','evidence','caseCount']);assert.equal(g.passed,true);assert(Number.isSafeInteger(g.caseCount)&&g.caseCount>0);ordinary(g.evidence,['bytes','sha256']);assert(Number.isSafeInteger(g.evidence.bytes)&&g.evidence.bytes>0&&HASH.test(g.evidence.sha256));}
+  const t=r.related.pureTests;ordinary(t,['tests','pass','fail','skipped','cancelled','tapSha256']);assert(Number.isSafeInteger(t.tests)&&t.tests>0);assert.equal(t.pass,t.tests);for(const k of ['fail','skipped','cancelled'])assert.equal(t[k],0);assert(HASH.test(t.tapSha256));
+  for(const f of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.equal(r[f],false);
 }
 async function verifyProof(native){
- assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const root=process.env.RUNNER_TEMP+'/afw-post-ack-proof',raw=await readFile(root+'/result.json'),mraw=await readFile(root+'/manifest.json'),m=JSON.parse(mraw),context=executionContext();
+ assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const root=process.env.RUNNER_TEMP+'/afw-post-ack-proof',raw=await readFile(root+'/result.json'),mraw=await readFile(root+'/manifest.json'),m=JSON.parse(mraw),context=executionContext(),checked=await checkedModel();
  ordinary(m,['purpose','context','files']);assert.equal(m.purpose,'afw.native-post-ack-r2-manifest.safe.v1');assert.deepEqual(m.context,context);assert.equal(m.files.length,1);ordinary(m.files[0],['path','bytes','sha256']);assert.equal(m.files[0].path,'result.json');assert.equal(m.files[0].bytes,raw.length);assert.equal(m.files[0].sha256,sha(raw));assert(raw.length+mraw.length<=65536);const r=JSON.parse(raw);
- if(native){validatePostAckResult(r,context);assert.equal(r.custody.status,'verified');assert.equal(r.provenance.status,'verified');assert(['observed','not_observed'].includes(r.status));const metadata=await artifactMetadata(r.custody.artifactId);assert.equal(metadata.digest,'sha256:'+r.custody.zipSha256);assert.equal(r.custody.observationSha256,observationHash(r));}
- else{
-  ordinary(r,['purpose','context','controls','programs','preflight','related',...FLAGS,'nativeExecuted','mfAllocated','I0Created']);assert.equal(r.purpose,'afw.post-ack-contracts.safe.v1');assert.deepEqual(r.context,context);assert.deepEqual(r.programs,await currentPrograms());assert.equal(r.controls.purpose,'AFW_POST_ACK_CONTROLS/1');assert.deepEqual(r.controls.inventory,IDS);assert.equal(r.controls.expected,24);assert.equal(r.controls.completed,24);assert.equal(r.controls.pass,24);assert.equal(r.controls.fail,0);assert.equal(r.controls.firstFailure,null);assert.equal(r.controls.postAssertionExactlyOnce,true);assert.equal(r.related.passed,true);assert.deepEqual(r.related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);for(const g of r.related.groups)assert.equal(g.passed,true);for(const f of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.equal(r[f],false);assert.equal(r.preflight.stage,'MODEL ONLY');for(const graph of r.preflight.offGraphs){assert.equal(graph.equal,true);assert.equal(graph.baselineSha256,graph.candidateSha256);}assert.equal(r.preflight.supplement.records.length,2);assert.equal(r.preflight.supplement.nodeModuleAbsent,true);
+ if(native){
+  validatePostAckResult(r,context);assert.equal(r.custody.status,'verified');assert.equal(r.provenance.status,'verified');assert(['observed','not_observed'].includes(r.status));
+  const p=checked.model;assert.equal(r.provenance.sdkFileSha256,p.sdkFileSha256);assert.equal(r.provenance.lockSha256,p.lockSha256);assert.equal(r.provenance.transformSha256,p.transformSha256);assert.equal(r.provenance.preflightSha256,checked.sha256);
+  assert.equal(r.custody.artifactId,process.env.CIPHER_ARTIFACT_ID);assert.equal(r.custody.zipSha256,process.env.CIPHER_ARTIFACT_DIGEST);assert.equal(process.env.ORIGINAL_COMMAND_OUTCOME,r.originalR2Outcome==='passed'?'success':'failure');
+  const metadata=await artifactMetadata(r.custody.artifactId);assert.equal(metadata.name,'afw-post-ack-cipher-'+context.run+'-1');assert.equal(metadata.digest,'sha256:'+process.env.CIPHER_ARTIFACT_DIGEST);assert.equal(r.custody.observationSha256,observationHash(r));
+ }else{
+  validateContractsProof(r,context,await currentPrograms(),checked);
  }
- console.info(JSON.stringify({purpose:'afw.post-ack-independent-verdict.safe.v1',context,nativeCertificate:native,valid:true,operationalReadiness:false,completePackage:false,PCoff:false}));
+ console.info(JSON.stringify({purpose:'afw.post-ack-independent-verdict.safe.v1',context,nativeCertificate:native,valid:true,modelArtifactId:checked.receipt.artifactId,modelSha256:checked.sha256,operationalReadiness:false,completePackage:false,PCoff:false}));
 }
 async function artifactMetadata(id){
  assert(/^[1-9][0-9]*$/.test(id));const r=await fetch('https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/'+id,{headers:{Authorization:'Bearer '+process.env.GITHUB_TOKEN,Accept:'application/vnd.github+json'},redirect:'error',signal:AbortSignal.timeout(10000)});assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),id);assert.equal(m.expired,false);assert.equal(String(m.workflow_run.id),process.env.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,process.env.GITHUB_SHA);assert(/^sha256:[a-f0-9]{64}$/.test(m.digest));return m;
 }
+function nativeSealEligible(manifest){return manifest.mfAttached===true&&manifest.preallocationBlocked===false;}
 async function sealNative(){
  const {cp}=await import('node:fs/promises'),{join}=await import('node:path'),{sealDirectory}=await import('./finite-checkpoint-custody.mjs');const root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),payload=join(root,'payload');
  await mkdir(payload,{recursive:true});const privateRoot='output/finite-budget/post-ack-private';let manifest;
  try{manifest=JSON.parse(await readFile(privateRoot+'/job-manifest.json'));}catch{return;}
- assert.deepEqual(manifest.context,executionContext());assert.equal(manifest.diagnosticOnly,true);assert.deepEqual(manifest.cases,['R2']);if(manifest.preallocationBlocked)return;
+ assert.deepEqual(manifest.context,executionContext());assert.equal(manifest.diagnosticOnly,true);assert.deepEqual(manifest.cases,['R2']);if(!nativeSealEligible(manifest))return;
  await cp('output',join(payload,'output'),{recursive:true,errorOnExist:true,force:false});await cp(join(root,'logs'),join(payload,'logs'),{recursive:true,errorOnExist:true,force:false});
  const kind=manifest.originalR2Outcome==='passed'?'readonly-result':'consumer-failure';assert.equal(manifest.kind,kind);
  const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:REPOSITORY,ref:REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind};
@@ -221,7 +347,7 @@ async function sealNative(){
 async function reopenNative(){
  const {join}=await import('node:path'),{openDirectory}=await import('./finite-checkpoint-custody.mjs'),root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),kind=(await readFile(join(root,'kind.txt'),'utf8')).trim(),id=process.env.CIPHER_ARTIFACT_ID,metadata=await artifactMetadata(id);
  assert.equal(metadata.name,'afw-post-ack-cipher-'+process.env.GITHUB_RUN_ID+'-1');
- const zip=await readFile(join(root,'cipher.zip'));assert.equal('sha256:'+sha(zip),metadata.digest);
+ const zip=await readFile(join(root,'cipher.zip'));assert.equal('sha256:'+sha(zip),metadata.digest);assert.equal(sha(zip),process.env.CIPHER_ARTIFACT_DIGEST);
  const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:REPOSITORY,ref:REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind};
  await openDirectory({stagingDir:join(root,'download'),destinationDir:join(root,'opened'),context});
  const original=JSON.parse(await readFile('output/finite-budget/post-ack-private/observation.json')),restored=JSON.parse(await readFile(join(root,'opened/output/finite-budget/post-ack-private/observation.json'))),manifest=JSON.parse(await readFile(join(root,'opened/output/finite-budget/post-ack-private/job-manifest.json')));
~~~~~~~~~~~~

## End of complete diff

All5codepatches independently reapplied topreviousreviewbody and matchedfixedfilesEXACTLY (World6hunks/fixture6/contracts5/Native8/test1). Completecode noomittedpatch. Reportpatch includesinitialfixbody; actual finalappendcoverscommands/outputlinkedabove. Scopefindingbyfinding/newfixbreakageONLY; no freshprojectwideaudit/testrerun/Sourceexecution/mutation/delegation. VerdictC1,C2,I1–I5ADDRESS/NOT, M1ifnaturallyfixed, andnewCritical/Importantinfixonly. Concretecutofffunctionmaybereadandnamed, no broadcrawl. NoNativeauthorizationfromreview.
