# Task1 fix3 — scoped N9 transport and qualification review package

Review ONLY new transport/code regressions BASE 026d8f2aa67a3efa79f922d098ffce2d517fee69 → intended 4d749b410765e97cdf7bb8f6f8b41355a066d603. Original C1/C2/I1–I5/M1 already CODE ADDRESSED through your last I1 review at026d. World 0631f9a/242987 UTF8B/SHA256007a4b39777dbd34645f7754556cfa1a9e152a0d2a6f55a27f6b1c30e334d867 is BYTE EXACT026d in code/actual qualification. Do not re-audit project or re-run completed work.

PROJECT AFW, repo tokenizartinfo-ops/agent-friendly-web, Source feat/finite-native-cleanup-20261101, GitHub-owned SYN. Read-only/public Source string inspection ONLY; no Source execution/import/eval, tests, writes, private producer logs, Model/cipher downloads, Native or credentials. All actual testing happened in one GitHub KEYLESS run. Source writer currently completing closure; Root sends exact final closure appendix separately. Native HELD until your CLEAN and Root independent closure/release. No authority from package.

Binding N9 exact brief: [fix3 requirements](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b08deb12183e6117f9a61556282f37471474e7e0/docs/superpowers/briefs/2026-11-12-native-post-ack-r2-task1-fix3.md). Purpose is bounded same-assigned-ID GETs+phase observability; prior HTTP404 cause remains UNKNOWN, no credential/consistency diagnosis. 3 attempts/phase,2+5s waits,ONE monotonic25sMODEL/SAFE or60scipher deadline, fixedrepository/currentrun/source/attempt/ID/digest, auth ONLYfixedapi.github.com, manual validatedstorageHTTPSredirect/noAuthforward/noURLlog, strictintegrityimmediatefail, sevenworkflowdownloadblocks keep PythonZIP/tripleSHA checks. Currentcipher metadata reuse is alreadyvalidatedsameproducer-readreceipt, not a freshnetworkobservation; independentverifier still metadata-reads. No newNativebudget/keyscope/case/controlID/dependency.

## Actual bounded qualification

Run43341317371/attempt1/actualSource255ecc18900647081d66f9617df110898983cc89. Producer131610059140 SUCCESS; independentverifier131610436472 SUCCESS, Root independently fetched statuses. Only one KEYLESS run thisround.
SMALLSAFE13999826329,4235BZIP,sha256ccb160462e6d4e4f3abc95db3ba1af1197f3fb252beddc680cb7bc84bbfa2602. Exact2JSON: result.json10992B sha25692ac5f8568431a831dc25914287cd39649bea1c980e76b3c4269195182a07111;manifest.json392B sha256eca3fd8f16d8f9328161f160c9c4e658aeb1fe015430ea1bd29fbe49c09dd742.
MODEL14000545288,10713BZIP,sha256586818f0b3f445c0c9b7d2f19ed8c1b9d86465aa11828550217632f8689af823. Metadata ONLY by Root; runner independent verifier downloaded/checked its real assignment. preflight/model.json5d4cb4d6ac0157618a3a4a47dd0bf3819282fb34c75a2f56b170f7a339061105. No Model/cipher/private Native download by Root.
24 actual named callbacks/ONE node:test wrapper pass24/fail0/completed24; fixed IDs/private exact-once postassertions. 8Fgroups22purecases/17pureNode tests allpassed. Original21R2negativefamiliesreject. N8 actual5families7Nodehandoffs allpassed (wholehelpercleanup/erroridentity/eligibility/persistence). N9 29fakeHTTPscenarios throughSAMEprivateroutine underexistingprofile_scope callback, notextraIDs. BOTHrolesOFFbaseline/currentbyteequal under SAMEcapturedinputs/defines; ONprediagnosticinventoriesmatch/2diagQAemissions.
Root strictSAFEaudit includes rawZIPsize/SHA/CRC/local+centralheaders/paths/contiguousEOF/UTF8/currentcontext/wholemanifest/filebytes/all11programblob+UTF8hashes/modelreceipt/OFFON/N8. No Source code executed. All5flagsfalse; NativeExecuted/MFallocated/I0Createdfalse; noSDKruntime/CF/realOwner/Max/PCoff. Independent verifier success is actual, not inferredfromproducer.

## Scoped intended code inventory

- .github/workflows/afw-r2-post-ack-contracts.yml: 6 additions/15 deletions; modified
- .github/workflows/afw-r2-post-ack-diagnostic.yml: 8 additions/20 deletions; modified
- docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md: 117 additions/0 deletions; modified
- test/fixtures/finite-post-ack-diagnostic.mjs: 147 additions/4 deletions; modified

No World diff. Three codefiles: fixture + contracts3downloadsites + Native4downloadsites. Append-onlyreport117lines separate; inspect only if needed fortrace/29cases. Frozenexactcandidate is4d749b41; actualactivationchangesONLYcontracts event/runlabel/twofalseprefixes. NativeWFbaa8442094731bea1413d2cc03028ab8682b300b/27458B/50a72c97cfffb2710c10a8127871f11893cefe778c61b61664e06c69905116e3 alwaysHELD.
fixturedc05c0410fc085062fb47e10bb29e6723d938821/91238B/5f84a7d77246511cecc3afcd3ff12107e8de713806d7e36964f8703c9ab1538a.
F7immutablef7a71f1a/manual7false; originalR2test533dafb5 unchanged; noOriginalbudget/time/cleanup/oraclechange.

## Full new code patches

### .github/workflows/afw-r2-post-ack-contracts.yml

```diff
@@ -74,10 +74,7 @@ jobs:
         run: |
           set -euo pipefail
           umask 077
-          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
-          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
-          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          node test/fixtures/finite-post-ack-diagnostic.mjs read-artifact
           python - <<'PY'
           import os,json,hashlib,zipfile,stat,pathlib,struct
           def closed(pairs):
@@ -120,7 +117,7 @@ jobs:
             with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
           receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
-          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          with (root/("afw-"+kind+"-download-check.json")).open("x") as f:f.write(json.dumps(receipt,separators=(",",":")))
           if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
       - name: Protected MODEL inventory readback using its REAL assigned artifact ID
@@ -198,10 +195,7 @@ jobs:
         run: |
           set -euo pipefail
           umask 077
-          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
-          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
-          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          node test/fixtures/finite-post-ack-diagnostic.mjs read-artifact
           python - <<'PY'
           import os,json,hashlib,zipfile,stat,pathlib,struct
           def closed(pairs):
@@ -244,7 +238,7 @@ jobs:
             with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
           receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
-          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          with (root/("afw-"+kind+"-download-check.json")).open("x") as f:f.write(json.dumps(receipt,separators=(",",":")))
           if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
       - name: Protected MODEL inventory readback using its REAL assigned artifact ID
@@ -276,10 +270,7 @@ jobs:
         run: |
           set -euo pipefail
           umask 077
-          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
-          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
-          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          node test/fixtures/finite-post-ack-diagnostic.mjs read-artifact
           python - <<'PY'
           import os,json,hashlib,zipfile,stat,pathlib,struct
           def closed(pairs):
@@ -322,7 +313,7 @@ jobs:
             with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
           receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
-          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          with (root/("afw-"+kind+"-download-check.json")).open("x") as f:f.write(json.dumps(receipt,separators=(",",":")))
           if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
       - name: Independently bind full SAFE model and current checkout pins
```

### .github/workflows/afw-r2-post-ack-diagnostic.yml

```diff
@@ -102,10 +102,7 @@ jobs:
         run: |
           set -euo pipefail
           umask 077
-          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
-          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
-          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          node test/fixtures/finite-post-ack-diagnostic.mjs read-artifact
           python - <<'PY'
           import os,json,hashlib,zipfile,stat,pathlib,struct
           def closed(pairs):
@@ -148,7 +145,7 @@ jobs:
             with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
           receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
-          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          with (root/("afw-"+kind+"-download-check.json")).open("x") as f:f.write(json.dumps(receipt,separators=(",",":")))
           if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
       - name: Protected MODEL inventory readback using its REAL assigned artifact ID
@@ -215,10 +212,7 @@ jobs:
         run: |
           set -euo pipefail
           umask 077
-          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
-          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
-          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          node test/fixtures/finite-post-ack-diagnostic.mjs read-artifact
           python - <<'PY'
           import os,json,hashlib,zipfile,stat,pathlib,struct
           def closed(pairs):
@@ -261,7 +255,7 @@ jobs:
             with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
           receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
-          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          with (root/("afw-"+kind+"-download-check.json")).open("x") as f:f.write(json.dumps(receipt,separators=(",",":")))
           if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
       - name: Same-ID authenticated open and full private inventory readback
@@ -324,10 +318,7 @@ jobs:
         run: |
           set -euo pipefail
           umask 077
-          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
-          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
-          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          node test/fixtures/finite-post-ack-diagnostic.mjs read-artifact
           python - <<'PY'
           import os,json,hashlib,zipfile,stat,pathlib,struct
           def closed(pairs):
@@ -370,7 +361,7 @@ jobs:
             with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
           receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
-          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          with (root/("afw-"+kind+"-download-check.json")).open("x") as f:f.write(json.dumps(receipt,separators=(",",":")))
           if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
       - name: Protected MODEL inventory readback using its REAL assigned artifact ID
@@ -403,10 +394,7 @@ jobs:
         run: |
           set -euo pipefail
           umask 077
-          case "$ARTIFACT_ID" in *[!0-9]*|'') exit 1;; esac
-          case "$ARTIFACT_KIND" in model) limit=4194304;; safe) limit=131072;; cipher) limit=136314880;; *) exit 1;; esac
-          curl --fail --silent --show-error --max-time 15 -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND-meta.json"
-          curl --fail --silent --show-error --location --max-time 20 --max-filesize "$limit" -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/$ARTIFACT_ID/zip" -o "$RUNNER_TEMP/afw-$ARTIFACT_KIND.zip"
+          node test/fixtures/finite-post-ack-diagnostic.mjs read-artifact
           python - <<'PY'
           import os,json,hashlib,zipfile,stat,pathlib,struct
           def closed(pairs):
@@ -449,7 +437,7 @@ jobs:
             with (out/i.filename).open("xb") as f:f.write(body)
            assert z.testzip() is None
           receipt={"artifactId":os.environ["ARTIFACT_ID"],"uploaderDigest":os.environ["ARTIFACT_DIGEST"],"apiDigest":m["digest"],"rawZipSha256":digest}
-          (root/("afw-"+kind+"-download-check.json")).write_text(json.dumps(receipt,separators=(",",":")))
+          with (root/("afw-"+kind+"-download-check.json")).open("x") as f:f.write(json.dumps(receipt,separators=(",",":")))
           if kind=="cipher":(root/"afw-post-ack-native"/"cipher.zip").write_bytes(b)
           PY
       - name: Verify closed observation model pins cipher assignment and original outcome
```

### test/fixtures/finite-post-ack-diagnostic.mjs

```diff
@@ -189,7 +189,7 @@ function oracleControls(worldSource,handoff){
 const REGISTRY=Object.freeze([
  ['off_graphs',async()=>{const {preflight:p}=await controlInputs();const checked=await checkedModel();assert.deepEqual(checked.model,p);validateOffGraphs(p.offGraphs);assert.equal(p.stage,'MODEL ONLY');assert.equal(p.offGraphs.length,2);for(const r of p.offGraphs){assert(r.equal&&r.sameCapturedInputs&&r.sameDefines);assert.equal(r.baselineSha256,r.candidateSha256);assert.equal(r.baselineBytes,r.candidateBytes);}assert.equal(p.offGraphs.find(r=>r.role==='QA').originalAdditionalSYN,3);assert.equal(p.mfAllocated,false);assert.equal(p.I0Created,false);return complete('off_graphs');}],
  ['sdk_pins',async()=>{const {preflight:p}=await controlInputs();const sdk=await readFile('node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js');assert.equal(sdk.length,251149);assert.equal(sha(sdk),p.sdkFileSha256);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');const f7=await readFile('.github/workflows/afw-finite-budget-qualification.yml');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+f7.length+'\0'),f7])).digest('hex'),'f7a71f1a0fa4f5ddf069ff411f008a098455e5cc');return complete('sdk_pins');}],
- ['profile_scope',async()=>{const {source}=await controlInputs();assert.deepEqual(transformPostAckEmission({role:'M',modulePath:PHASE,source,identity:syntheticContext()}),{source,record:null});assert.throws(()=>transformPostAckEmission({role:'other',modulePath:PHASE,source,identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:{...syntheticContext(),attempt:2}}));
+ ['profile_scope',async()=>{const transport=await runArtifactReadControls();assert.equal(transport.passed,true);const {source}=await controlInputs();assert.deepEqual(transformPostAckEmission({role:'M',modulePath:PHASE,source,identity:syntheticContext()}),{source,record:null});assert.throws(()=>transformPostAckEmission({role:'other',modulePath:PHASE,source,identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:{...syntheticContext(),attempt:2}}));
  const entry=await readFile('test/finite-post-ack-diagnostic.test.mjs','utf8'),a=ast(entry,'actual-diagnostic-entry'),body=a.statements.filter(n=>!ts.isImportDeclaration(n)).map(n=>n.getText(a)).join('\n');
  for(const selected of [undefined,'','unknown_mode']){
   let registrations=0;const reads=[],env=new Proxy({},{get(_target,key){reads.push(key);assert.equal(key,'AFW_POST_ACK_MODE','inactive/unknown branch may only read mode');return selected;}});
@@ -314,6 +314,142 @@ async function writeProof(result){
  const context=executionContext(),root='output/finite-budget/post-ack-safe';await mkdir(root,{recursive:true});const bytes=Buffer.from(JSON.stringify(result));assert(bytes.length<=60000);await writeFile(root+'/result.json',bytes);
  const manifest={purpose:'afw.native-post-ack-r2-manifest.safe.v1',context,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]};const m=Buffer.from(JSON.stringify(manifest));assert(m.length+bytes.length<=65536);await writeFile(root+'/manifest.json',m);
 }
+class ArtifactReadFault extends Error{
+ constructor(code){super('artifact_read_'+code);this.name='ArtifactReadFault';this.code=code;}
+}
+const ARTIFACT_RETRY_STATUS=new Set([404,408,429,500,502,503,504]);
+function artifactNeed(value,code='invalid'){if(!value)throw new ArtifactReadFault(code);}
+function artifactSpec(kind,safePrefix){
+ artifactNeed(['model','safe','cipher'].includes(kind));artifactNeed(['afw-post-ack-contracts-','afw-post-ack-native-safe-'].includes(safePrefix));
+ return kind==='model'?{limit:4194304,budget:25000,prefix:'afw-post-ack-model-'}:kind==='safe'?{limit:131072,budget:25000,prefix:safePrefix}:{limit:136314880,budget:60000,prefix:'afw-post-ack-cipher-'};
+}
+function artifactLocation(text){
+ let url;try{url=new URL(text);}catch{throw new ArtifactReadFault('invalid');}
+ artifactNeed(url.protocol==='https:'&&!url.username&&!url.password&&!url.hash&&(!url.port||url.port==='443'));
+ artifactNeed(url.hostname==='results-receiver.actions.githubusercontent.com'||/^[a-z0-9-]+\.blob\.core\.windows\.net$/.test(url.hostname));artifactNeed(url.pathname.length>1);
+ return url.href;
+}
+function parseArtifactMetadata(bytes){
+ artifactNeed(!(bytes.length>=3&&bytes[0]===0xef&&bytes[1]===0xbb&&bytes[2]===0xbf));
+ let text,value;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);value=JSON.parse(text);}catch{throw new ArtifactReadFault('invalid');}
+ try{
+  const tree=ast('('+text+')','artifact-metadata-json'),pending=[tree];let visited=0;
+  while(pending.length){const node=pending.pop();artifactNeed(++visited<=8192);if(ts.isObjectLiteralExpression(node)){const seen=new Set();for(const property of node.properties){artifactNeed(ts.isPropertyAssignment(property)&&ts.isStringLiteral(property.name));const key=property.name.text;artifactNeed(!seen.has(key));seen.add(key);}}ts.forEachChild(node,child=>{pending.push(child);});}
+ }catch{throw new ArtifactReadFault('invalid');}
+ return value;
+}
+function validateArtifactMetadata(value,request,spec,api){
+ const m=value,w=m?.workflow_run,c=request.context;
+ artifactNeed(m&&typeof m==='object'&&!Array.isArray(m)&&Number.isSafeInteger(m.id)&&String(m.id)===request.id&&m.expired===false);
+ artifactNeed(m.name===spec.prefix+c.run+'-1'&&Number.isSafeInteger(m.size_in_bytes)&&m.size_in_bytes>0&&m.size_in_bytes<=spec.limit);
+ artifactNeed(m.digest==='sha256:'+request.digest&&m.url===api&&m.archive_download_url===api+'/zip');
+ artifactNeed(w&&typeof w==='object'&&Number.isSafeInteger(w.id)&&String(w.id)===c.run&&w.head_sha===c.source&&w.head_branch===c.ref.slice('refs/heads/'.length));
+ for(const key of ['repository_id','head_repository_id'])if(Object.hasOwn(w,key))artifactNeed(w[key]===1347578006);
+ if(Object.hasOwn(w,'run_attempt'))artifactNeed(w.run_attempt===1);
+ return m;
+}
+async function readFixedArtifact(request,dependencies={},metadataOnly=false){
+ const context=identity(request.context),spec=artifactSpec(request.kind,request.safePrefix);
+ artifactNeed(typeof request.id==='string'&&/^[1-9][0-9]{0,19}$/.test(request.id)&&typeof request.digest==='string'&&HASH.test(request.digest));artifactNeed(typeof request.token==='string'&&request.token.length>0&&request.token.length<=8192);
+ const deps={fetch:globalThis.fetch,now:()=>performance.now(),setTimer:(fn,ms)=>setTimeout(fn,ms),clearTimer:id=>clearTimeout(id),sleep:ms=>new Promise(resolve=>setTimeout(resolve,ms)),onRecord:()=>{},...dependencies};
+ const began=deps.now(),deadline=began+spec.budget,records=[],api='https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/'+request.id;artifactNeed(Number.isFinite(began));
+ const remaining=()=>deadline-deps.now();
+ function emit(phase,attempt,httpStatus,outcome){
+  const row={purpose:'AFW_ARTIFACT_READ/1',kind:request.kind,phase,attempt,httpStatus,elapsedMs:Math.max(0,Math.floor(deps.now()-began)),outcome};
+  artifactNeed(Number.isSafeInteger(row.elapsedMs)&&Buffer.byteLength(JSON.stringify(row))<=256);records.push(row);artifactNeed(records.length<=9&&Buffer.byteLength(JSON.stringify(records))<=4096);deps.onRecord(row);
+ }
+ async function bounded(work,cap){
+  artifactNeed(cap>0,'deadline');const controller=new AbortController();let timer;
+  const limit=new Promise((_,reject)=>{timer=deps.setTimer(()=>{controller.abort();reject(new ArtifactReadFault('attempt_timeout'));},cap);});
+  try{return await Promise.race([work(controller.signal),limit]);}finally{deps.clearTimer(timer);controller.abort();}
+ }
+ async function body(response,cap){
+  const size=response.headers.get('content-length');if(size!==null)artifactNeed(/^[0-9]{1,12}$/.test(size)&&Number(size)<=cap);
+  if(!response.body)return Buffer.alloc(0);const reader=response.body.getReader(),parts=[];let bytes=0;
+  for(;;){artifactNeed(remaining()>0,'deadline');const next=await reader.read();if(next.done)break;artifactNeed(next.value instanceof Uint8Array);bytes+=next.value.byteLength;artifactNeed(bytes<=cap,'limit');parts.push(Buffer.from(next.value));}
+  return Buffer.concat(parts,bytes);
+ }
+ async function phase(name,url,expected,consume){
+  for(let attempt=1;attempt<=3;attempt++){
+   let status='network',failure=null,result;
+   try{
+    artifactNeed(remaining()>0,'deadline');
+    result=await bounded(async signal=>{
+     const apiRequest=name!=='zip_body';artifactNeed(apiRequest?url===(name==='metadata'?api:api+'/zip'):artifactLocation(url)===url);
+     const headers=apiRequest?{Authorization:'Bearer '+request.token,Accept:'application/vnd.github+json'}:{Accept:'application/octet-stream'};
+     const response=await deps.fetch(url,{method:'GET',headers,redirect:'manual',signal});const observed=response.status;artifactNeed(Number.isInteger(observed)&&observed>=100&&observed<=599);status=observed;
+     if(status!==expected)throw new ArtifactReadFault(ARTIFACT_RETRY_STATUS.has(status)?'retryable_http':'http');
+     const value=await consume(response);artifactNeed(remaining()>0,'deadline');return value;
+    },Math.min(name==='zip_body'?spec.budget:8000,remaining()));
+   }catch(error){failure=error;}
+   if(!failure){emit(name,attempt,status,'success');return result;}
+   const retryable=!(failure instanceof ArtifactReadFault)||['retryable_http','attempt_timeout'].includes(failure.code);
+   if(!retryable){emit(name,attempt,status,failure.code==='deadline'?'deadline':failure.code==='http'?'rejected':'invalid');throw failure;}
+   const delay=attempt===1?2000:5000;
+   if(remaining()<=0||attempt<3&&delay>=remaining()){emit(name,attempt,status,'deadline');throw new ArtifactReadFault('deadline');}
+   if(attempt===3){emit(name,attempt,status,'exhausted');throw new ArtifactReadFault('exhausted');}
+   emit(name,attempt,status,'retryable');
+   try{await bounded(()=>deps.sleep(delay),remaining());}catch{throw new ArtifactReadFault('deadline');}
+   artifactNeed(remaining()>0,'deadline');
+  }
+  throw new ArtifactReadFault('exhausted');
+ }
+ let metadataBytes;
+ const metadata=await phase('metadata',api,200,async response=>{metadataBytes=await body(response,65536);return validateArtifactMetadata(parseArtifactMetadata(metadataBytes),{...request,context},spec,api);});
+ if(metadataOnly)return {metadata,metadataBytes,records};
+ const location=await phase('zip_api',api+'/zip',302,async response=>artifactLocation(response.headers.get('location')));
+ const zip=await phase('zip_body',location,200,async response=>{const bytes=await body(response,spec.limit);artifactNeed(bytes.length===metadata.size_in_bytes&&sha(bytes)===request.digest,'integrity');return bytes;});
+ return {metadata,metadataBytes,zip,records};
+}
+async function fetchArtifactFromEnvironment(){
+ const kind=process.env.ARTIFACT_KIND,id=process.env.ARTIFACT_ID,digest=process.env.ARTIFACT_DIGEST,safePrefix=process.env.SAFE_ARTIFACT_PREFIX??'afw-post-ack-contracts-';
+ const result=await readFixedArtifact({kind,id,digest,safePrefix,context:executionContext(),token:process.env.GITHUB_TOKEN},{onRecord:record=>console.info(JSON.stringify(record))});
+ const root=process.env.RUNNER_TEMP;artifactNeed(typeof root==='string'&&root.length>0);
+ await writeFile(root+'/afw-'+kind+'-meta.json',result.metadataBytes,{flag:'wx',mode:0o600});await writeFile(root+'/afw-'+kind+'.zip',result.zip,{flag:'wx',mode:0o600});await writeFile(root+'/afw-'+kind+'-read-trace.json',JSON.stringify(result.records),{flag:'wx',mode:0o600});
+}
+
+async function runArtifactReadControls(){
+ const context=syntheticContext(),payload=Buffer.from('SYN fixed artifact body'),digest=sha(payload),token='SYN_ARTIFACT_TOKEN_DO_NOT_LOG',location='https://results-receiver.actions.githubusercontent.com/SYN?sig=DO_NOT_LOG';
+ const metadata=()=>({id:7,name:'afw-post-ack-model-1-1',size_in_bytes:payload.length,digest:'sha256:'+digest,expired:false,url:'https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/7',archive_download_url:'https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/7/zip',workflow_run:{id:1,repository_id:1347578006,head_repository_id:1347578006,head_branch:'feat/finite-native-cleanup-20261101',head_sha:context.source}});
+ const cases=[];
+ async function scenario(name,configure,expected){
+  let now=0,nextTimer=0;const timers=new Map(),waits=[],calls=[],records=[],counts={metadata:0,zip_api:0,zip_body:0};
+  const advance=ms=>{const target=now+ms;for(;;){const due=[...timers].filter(([,timer])=>timer.at<=target).sort((a,b)=>a[1].at-b[1].at)[0];if(!due)break;now=due[1].at;timers.delete(due[0]);due[1].fn();}now=target;};
+  const deps={now:()=>now,setTimer:(fn,ms)=>{const id=++nextTimer;timers.set(id,{at:now+ms,fn});return id;},clearTimer:id=>timers.delete(id),sleep:async ms=>{waits.push(ms);advance(ms);},onRecord:row=>records.push(row),fetch:async(url,options)=>{
+   const phase=url.endsWith('/7')?'metadata':url.endsWith('/7/zip')?'zip_api':'zip_body';counts[phase]++;calls.push({phase,url,authorization:Object.hasOwn(options.headers,'Authorization'),redirect:options.redirect});
+   assert.equal(options.method,'GET');assert.equal(options.redirect,'manual');if(phase==='zip_body')assert.equal(Object.hasOwn(options.headers,'Authorization'),false);else assert.equal(options.headers.Authorization,'Bearer '+token);
+   const changed=configure?.({phase,attempt:counts[phase],advance,metadata:metadata(),payload,location});if(changed instanceof Error)throw changed;if(changed)return changed;
+   return phase==='metadata'?new Response(JSON.stringify(metadata()),{status:200}):phase==='zip_api'?new Response(null,{status:302,headers:{location}}):new Response(payload,{status:200});
+  }};
+  let result,error;try{result=await readFixedArtifact({kind:'model',id:'7',digest,context,token,safePrefix:'afw-post-ack-contracts-'},deps);}catch(caught){error=caught;}
+  if(expected.error){assert(error instanceof ArtifactReadFault);assert.equal(error.code,expected.error);}else{assert.equal(error,undefined);assert(result.zip.equals(payload));}
+  if(expected.counts)assert.deepEqual(counts,expected.counts);if(expected.waits)assert.deepEqual(waits,expected.waits);if(expected.elapsed!==undefined)assert.equal(now,expected.elapsed);
+  for(const row of records){ordinary(row,['purpose','kind','phase','attempt','httpStatus','elapsedMs','outcome']);assert.equal(row.purpose,'AFW_ARTIFACT_READ/1');assert(['metadata','zip_api','zip_body'].includes(row.phase));assert(row.attempt>=1&&row.attempt<=3&&Number.isSafeInteger(row.elapsedMs)&&row.elapsedMs>=0);assert(Buffer.byteLength(JSON.stringify(row))<=256);}
+  assert(records.length<=9);const encoded=JSON.stringify(records);assert(encoded.length<=4096&&!encoded.includes(token)&&!encoded.includes(location)&&!encoded.includes('https://')&&!encoded.includes('Authorization')&&!encoded.includes('stack'));
+  assert(calls.filter(c=>c.phase==='zip_body').every(c=>c.authorization===false));assert(calls.filter(c=>c.phase!=='zip_body').every(c=>c.url==='https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/7'+(c.phase==='zip_api'?'/zip':'')));
+  cases.push({name,passed:true,counts,waits,elapsedMs:now,terminal:error?.code??'success',records});
+ }
+ for(const selected of ['metadata','zip_api','zip_body'])await scenario(selected+'_404_then_success',({phase,attempt})=>phase===selected&&attempt===1?new Response(null,{status:404}):null,{counts:{metadata:selected==='metadata'?2:1,zip_api:selected==='zip_api'?2:1,zip_body:selected==='zip_body'?2:1},waits:[2000],elapsed:2000});
+ for(const status of [408,429,500,502,503,504])await scenario('retryable_'+status+'_then_success',({phase,attempt})=>phase==='metadata'&&attempt===1?new Response(null,{status}):null,{counts:{metadata:2,zip_api:1,zip_body:1},waits:[2000],elapsed:2000});
+ await scenario('network_then_success',({phase,attempt})=>phase==='metadata'&&attempt===1?Error('SYN bounded network'):null,{counts:{metadata:2,zip_api:1,zip_body:1},waits:[2000],elapsed:2000});
+ await scenario('exhaustion_three_reads',({phase})=>phase==='metadata'?new Response(null,{status:404}):null,{error:'exhausted',counts:{metadata:3,zip_api:0,zip_body:0},waits:[2000,5000],elapsed:7000});
+ await scenario('deadline_no_reset',({phase,advance})=>{advance(phase==='zip_body'?11000:7000);return null;},{error:'deadline',counts:{metadata:1,zip_api:1,zip_body:1},waits:[],elapsed:25000});
+ await scenario('deadline_fewer_attempts',({phase,advance})=>{if(phase==='metadata'){advance(24000);return new Response(null,{status:404});}return null;},{error:'deadline',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:24000});
+ await scenario('403_immediate',()=>new Response(null,{status:403}),{error:'http',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
+ await scenario('501_not_retryable',()=>new Response(null,{status:501}),{error:'http',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
+ for(const mutate of [m=>m.id=8,m=>m.name='afw-post-ack-model-1-2',m=>m.expired=true,m=>m.workflow_run.id=2,m=>m.workflow_run.head_sha='f'.repeat(40),m=>m.workflow_run.repository_id=1,m=>m.digest='sha256:'+'f'.repeat(64)]){
+  await scenario('invalid_metadata_immediate',({phase,metadata:m})=>{if(phase==='metadata'){mutate(m);return new Response(JSON.stringify(m),{status:200});}return null;},{error:'invalid',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
+ }
+ await scenario('malformed_metadata_immediate',({phase})=>phase==='metadata'?new Response('{',{status:200}):null,{error:'invalid',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
+ await scenario('duplicate_metadata_immediate',({phase,metadata:m})=>phase==='metadata'?new Response(JSON.stringify(m).replace('{"id":7,','{"id":7,"id":7,'),{status:200}):null,{error:'invalid',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
+ await scenario('raw_digest_immediate',({phase})=>phase==='zip_body'?new Response(Buffer.from('BAD fixed artifact body'),{status:200}):null,{error:'integrity',counts:{metadata:1,zip_api:1,zip_body:1},waits:[],elapsed:0});
+ for(const invalid of ['http://results-receiver.actions.githubusercontent.com/SYN','https://user:pass@results-receiver.actions.githubusercontent.com/SYN','https://foreign.invalid/SYN','https://results-receiver.actions.githubusercontent.com/SYN#fragment']){
+  await scenario('invalid_redirect_immediate',({phase})=>phase==='zip_api'?new Response(null,{status:302,headers:{location:invalid}}):null,{error:'invalid',counts:{metadata:1,zip_api:1,zip_body:0},waits:[],elapsed:0});
+ }
+ const summary={purpose:'AFW_ARTIFACT_READ_CONTROLS/1',passed:true,scenarios:cases.length,threePhases:true,sharedDeadlineMs:25000,attemptLimit:3,waitScheduleMs:[2000,5000],noCredentialForwarding:true,noPrivateLogs:true,cases:cases.map(({records,...record})=>({...record,phaseEvidence:records.map(r=>({phase:r.phase,attempt:r.attempt,httpStatus:r.httpStatus,outcome:r.outcome,elapsedMs:r.elapsedMs}))}))};
+ assert(Buffer.byteLength(JSON.stringify(summary))<=16384);console.info(JSON.stringify(summary));return summary;
+}
+
 async function contractsProof(){
  assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const context=executionContext(),controls=JSON.parse(await readFile('output/finite-budget/post-ack-private/controls.json')),checked=await checkedModel();validateControlRecord(controls);
  const related=JSON.parse(await readFile('output/finite-budget/pure/controls.json'));assert.equal(related.passed,true);assert.deepEqual(related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);
@@ -341,7 +477,13 @@ async function verifyProof(native){
  console.info(JSON.stringify({purpose:'afw.post-ack-independent-verdict.safe.v1',context,nativeCertificate:native,valid:true,modelArtifactId:checked.receipt.artifactId,modelSha256:checked.sha256,operationalReadiness:false,completePackage:false,PCoff:false}));
 }
 async function artifactMetadata(id){
- assert(/^[1-9][0-9]*$/.test(id));const r=await fetch('https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/'+id,{headers:{Authorization:'Bearer '+process.env.GITHUB_TOKEN,Accept:'application/vnd.github+json'},redirect:'error',signal:AbortSignal.timeout(10000)});assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),id);assert.equal(m.expired,false);assert.equal(String(m.workflow_run.id),process.env.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,process.env.GITHUB_SHA);assert(/^sha256:[a-f0-9]{64}$/.test(m.digest));return m;
+ const result=await readFixedArtifact({kind:'cipher',id,digest:process.env.CIPHER_ARTIFACT_DIGEST,context:executionContext(),token:process.env.GITHUB_TOKEN,safePrefix:'afw-post-ack-native-safe-'},{onRecord:record=>console.info(JSON.stringify(record))},true);return result.metadata;
+}
+async function currentCipherMetadata(id){
+ const bytes=await readFile(process.env.RUNNER_TEMP+'/afw-cipher-meta.json');artifactNeed(bytes.length<=65536);
+ const receipt=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-cipher-download-check.json'));ordinary(receipt,['artifactId','uploaderDigest','apiDigest','rawZipSha256']);artifactNeed(receipt.artifactId===id&&receipt.uploaderDigest===process.env.CIPHER_ARTIFACT_DIGEST&&receipt.apiDigest==='sha256:'+receipt.uploaderDigest&&receipt.rawZipSha256===receipt.uploaderDigest);
+ const request={kind:'cipher',id,digest:process.env.CIPHER_ARTIFACT_DIGEST,context:executionContext(),safePrefix:'afw-post-ack-native-safe-'};
+ return validateArtifactMetadata(parseArtifactMetadata(bytes),request,artifactSpec('cipher',request.safePrefix),'https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/'+id);
 }
 function nativeSealEligible(manifest){return manifest.mfAttached===true&&manifest.preallocationBlocked===false;}
 async function sealNative(){
@@ -356,7 +498,7 @@ async function sealNative(){
  await writeFile(join(root,'kind.txt'),kind);
 }
 async function reopenNative(){
- const {join}=await import('node:path'),{openDirectory}=await import('./finite-checkpoint-custody.mjs'),root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),kind=(await readFile(join(root,'kind.txt'),'utf8')).trim(),id=process.env.CIPHER_ARTIFACT_ID,metadata=await artifactMetadata(id);
+ const {join}=await import('node:path'),{openDirectory}=await import('./finite-checkpoint-custody.mjs'),root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),kind=(await readFile(join(root,'kind.txt'),'utf8')).trim(),id=process.env.CIPHER_ARTIFACT_ID,metadata=await currentCipherMetadata(id);
  assert.equal(metadata.name,'afw-post-ack-cipher-'+process.env.GITHUB_RUN_ID+'-1');
  const zip=await readFile(join(root,'cipher.zip'));assert.equal('sha256:'+sha(zip),metadata.digest);assert.equal(sha(zip),process.env.CIPHER_ARTIFACT_DIGEST);
  const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:REPOSITORY,ref:REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind};
@@ -373,7 +515,8 @@ async function nativeProof(){
 if(process.argv[1]&&process.argv[1].replaceAll('\\','/').endsWith('/finite-post-ack-diagnostic.mjs')){
  const [command]=process.argv.slice(2);
  try{
-  if(command==='contracts-proof')await contractsProof();
+  if(command==='read-artifact')await fetchArtifactFromEnvironment();
+  else if(command==='contracts-proof')await contractsProof();
   else if(command==='verify-contracts')await verifyProof(false);
   else if(command==='verify-native')await verifyProof(true);
   else if(command==='seal-native')await sealNative();
```

## Review contract

Return scoped CLEAN or actionable Critical/Important findings with exactfile/lines/repro+expectedcorrection; include Minor onlyworthfixing. Check deadline/cancellation/phase/status/errorclassification/context/digest/noAuthforward, functionusedbyrealcommands and29controls genuinelyexercisingit, preservedZIP/custody/clock/keyscope. Do not suggest extra services/platform changes or blanket suite. Staticreview plus actualqualification can establish Task1 readinessforseparateONE SYN R2 release; NOTNativeexecuted/PCoff. Final Source closure appendix must be included before Task1 finalcompletion.


## Root final closure appendix — independently read back

SoleSourcewriter STOPPED. FinalSource426b18bd5edee0f38ce4203ab7fd277ae46179e6/tree204f38186092af481c242fd7f1546f08e507f2bb; finalreport54bac367e599b3b98c1535afe4e1cfd86d7f01fa/650103chars/651413UTF8B. Root fetchedfinalref/commit/fulltree/report; exactreport-onlydiff2554a4d7→426b18bd, prior644463+584902prefixesintact;3194leaves/3188oldprotectedunchanged/main0c9unchanged. Exactheldcontracts2006beb4/19347B/manual2false/noinputs/nopush; Nativebaa84420/27458B/manual2false/noinputs/nopush; F7f7a71f1a/manual7false; allfiveactivestates0. Worldretained0631f9a/fixturedc05c041/testaaf4894dunchangedfromreviewedqualifiedcandidate.
Root independently fetched KEYLESS joblogs (notNative/private): exactclosed AFW_ARTIFACT_READ/1 producerMODELmetadata200/253ms,zip_api302/570ms,zip_body200/613ms; verifierMODEL200/316ms,302/550ms,200/676ms;verifierSAFE200/308ms,302/680ms,200/809ms. Allattempt1/success, no realretry; prior404cause/hopunknown. Parsedrealclosed AFW_ARTIFACT_READ_CONTROLS/1 ALL29passed throughsameprivateroutine; max3/waits2+5/shareddeadline/noauthforward/private-log assertions. Independentverdict purposeafw.post-ack-independent-verdict.safe.v1 current255ecc/run43341317371/attempt1/R2/validtrue/nativeCertificatefalse/modelID14000545288/modelSha5d4cb4d6..., readiness/completePackage/PCofffalse. NoMODEL/cipherdownload byRoot, noNativeexecuted.
Rootfinalclosureauditcomplete; you may issue final Task1 scoped verdict now. No Native released by this appendix.
