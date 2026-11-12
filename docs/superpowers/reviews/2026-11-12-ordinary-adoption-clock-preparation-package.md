# O3 historical modeled-clock diagnostic — complete inactive preparation review

BASEf5f52660d19ec9fc634bbc49558db75582fdaf88→HEADff299a4cc5c4f2614f77ab50561e1cc06a0bac73/treef03771e6738e9bcc37d45a2bb0855d06822d6d9d. NoA/Bexecuted/0runs, all2false/manual/noinputs; Bfullpass/firstsharedguardUNKNOWN. Rootprimarypreservation {"base":3188,"head":3191,"protectedExact":3188,"added":[".github/workflows/afw-ordinary-adoption-clock.yml","docs/superpowers/reports/2026-11-12-ordinary-adoption-clock.es.md","scripts/diagnostics/ordinary-adoption-clock.mjs"],"falseGates":2,"runs":0}.

## All commits

- b4a388d459496cd6d6a58b81fc631e2805c39c4f diag: prepare inactive modeled adoption clock comparison
- ff299a4cc5c4f2614f77ab50561e1cc06a0bac73 docs: preserve inactive adoption clock preparation readback

## Full stat

- .github/workflows/afw-ordinary-adoption-clock.yml: +178/-0
- docs/superpowers/reports/2026-11-12-ordinary-adoption-clock.es.md: +58/-0
- scripts/diagnostics/ordinary-adoption-clock.mjs: +390/-0

## Full U10 diff (three additions)

```diff
diff --git a/.github/workflows/afw-ordinary-adoption-clock.yml b/.github/workflows/afw-ordinary-adoption-clock.yml
# before_blob=ABSENT after_blob=0555cd08558d89d886e67800e1a6e4d9166b1d85
--- /dev/null
+++ b/.github/workflows/afw-ordinary-adoption-clock.yml
@@ -0,0 +1,178 @@
+name: AFW ordinary adoption modeled clock (INACTIVE)
+# PREPARATION ONLY. Root review and a separate single-run release are required.
+'on':
+  workflow_dispatch:
+permissions:
+  contents: read
+concurrency:
+  group: afw-adoption-clock-${{ github.ref }}-${{ github.run_id }}
+  cancel-in-progress: false
+jobs:
+  current:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/diag/afw-adoption-clock-20261112' && github.event_name == 'workflow_dispatch' && github.run_attempt == '1' }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 7
+    steps:
+      - name: Checkout immutable diagnostic workflow source
+        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683
+        with:
+          ref: ${{ github.workflow_sha }}
+          path: diagnostic-code
+          fetch-depth: 1
+          persist-credentials: false
+      - name: Checkout separate immutable subject and full history
+        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683
+        with:
+          ref: f5f52660d19ec9fc634bbc49558db75582fdaf88
+          path: subject
+          fetch-depth: 0
+          persist-credentials: false
+      - name: Exact Node
+        uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020
+        with:
+          node-version: 22.23.4
+          check-latest: false
+      - name: Initial closed receipt
+        shell: bash
+        run: |
+          umask 077
+          mkdir -p adoption-clock-safe
+          printf '%s\n' '{"purpose":"afw.adoption-clock.diagnostic.v1","status":"setup_or_deadline_incomplete","operationalReadiness":false,"completePackage":false,"PCoff":false}' > adoption-clock-safe/result.json
+      - name: Install fixed subject lock without lifecycle scripts
+        working-directory: subject
+        run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: One fixed synthetic adoption case
+        env:
+          AC_ARM: current
+          AC_WORKFLOW_SHA: ${{ github.workflow_sha }}
+        run: timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-adoption-clock.mjs
+      - name: Final closed receipt and exact two-file manifest
+        if: ${{ always() }}
+        shell: bash
+        run: |
+          umask 077
+          node --input-type=module <<'NODE'
+          import {mkdir,readFile,writeFile,chmod,lstat} from 'node:fs/promises';
+          import {createHash} from 'node:crypto';
+          const dir='adoption-clock-safe';
+          await mkdir(dir,{recursive:true,mode:0o700});
+          let bytes;
+          try{
+            const info=await lstat(dir+'/result.json');
+            if(!info.isFile()||info.isSymbolicLink()||info.size>65536)throw 0;
+            bytes=await readFile(dir+'/result.json');
+            const result=JSON.parse(bytes);
+            if(result.purpose!=='afw.adoption-clock.diagnostic.v1'||result.operationalReadiness!==false||result.completePackage!==false||result.PCoff!==false)throw 0;
+          }catch{
+            bytes=Buffer.from(JSON.stringify({purpose:'afw.adoption-clock.diagnostic.v1',status:'setup_or_deadline_incomplete',operationalReadiness:false,completePackage:false,PCoff:false})+'\n');
+            await writeFile(dir+'/result.json',bytes,{mode:0o600});
+          }
+          await chmod(dir+'/result.json',0o600);
+          const manifest={purpose:'afw.adoption-clock.manifest.v1',inventory:[{name:'result.json',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}],rawLogsUploaded:false,operationalReadiness:false,completePackage:false,PCoff:false};
+          await writeFile(dir+'/manifest.json',JSON.stringify(manifest)+'\n',{mode:0o600});
+          NODE
+      - name: Preserve only closed result and manifest for seven days
+        if: ${{ always() }}
+        id: safe_artifact
+        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02
+        with:
+          name: afw-adoption-clock-current-${{ github.run_id }}-${{ github.run_attempt }}
+          path: |
+            adoption-clock-safe/result.json
+            adoption-clock-safe/manifest.json
+          retention-days: 7
+          if-no-files-found: error
+      - name: Exact artifact metadata for independent readback
+        if: ${{ always() && steps.safe_artifact.outcome == 'success' }}
+        env:
+          ARTIFACT_ID: ${{ steps.safe_artifact.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ steps.safe_artifact.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          [[ "$ARTIFACT_ID" =~ ^[1-9][0-9]*$ ]]
+          [[ "$ARTIFACT_DIGEST" =~ ^[a-f0-9]{64}$ ]]
+          printf 'AC artifact id=%s sha256=%s retention-days=7\n' "$ARTIFACT_ID" "$ARTIFACT_DIGEST"
+  historical:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/diag/afw-adoption-clock-20261112' && github.event_name == 'workflow_dispatch' && github.run_attempt == '1' }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 7
+    steps:
+      - name: Checkout immutable diagnostic workflow source
+        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683
+        with:
+          ref: ${{ github.workflow_sha }}
+          path: diagnostic-code
+          fetch-depth: 1
+          persist-credentials: false
+      - name: Checkout separate immutable subject and full history
+        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683
+        with:
+          ref: f5f52660d19ec9fc634bbc49558db75582fdaf88
+          path: subject
+          fetch-depth: 0
+          persist-credentials: false
+      - name: Exact Node
+        uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020
+        with:
+          node-version: 22.23.4
+          check-latest: false
+      - name: Initial closed receipt
+        shell: bash
+        run: |
+          umask 077
+          mkdir -p adoption-clock-safe
+          printf '%s\n' '{"purpose":"afw.adoption-clock.diagnostic.v1","status":"setup_or_deadline_incomplete","operationalReadiness":false,"completePackage":false,"PCoff":false}' > adoption-clock-safe/result.json
+      - name: Install fixed subject lock without lifecycle scripts
+        working-directory: subject
+        run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: One fixed synthetic adoption case
+        env:
+          AC_ARM: historical
+          AC_WORKFLOW_SHA: ${{ github.workflow_sha }}
+        run: timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-adoption-clock.mjs
+      - name: Final closed receipt and exact two-file manifest
+        if: ${{ always() }}
+        shell: bash
+        run: |
+          umask 077
+          node --input-type=module <<'NODE'
+          import {mkdir,readFile,writeFile,chmod,lstat} from 'node:fs/promises';
+          import {createHash} from 'node:crypto';
+          const dir='adoption-clock-safe';
+          await mkdir(dir,{recursive:true,mode:0o700});
+          let bytes;
+          try{
+            const info=await lstat(dir+'/result.json');
+            if(!info.isFile()||info.isSymbolicLink()||info.size>65536)throw 0;
+            bytes=await readFile(dir+'/result.json');
+            const result=JSON.parse(bytes);
+            if(result.purpose!=='afw.adoption-clock.diagnostic.v1'||result.operationalReadiness!==false||result.completePackage!==false||result.PCoff!==false)throw 0;
+          }catch{
+            bytes=Buffer.from(JSON.stringify({purpose:'afw.adoption-clock.diagnostic.v1',status:'setup_or_deadline_incomplete',operationalReadiness:false,completePackage:false,PCoff:false})+'\n');
+            await writeFile(dir+'/result.json',bytes,{mode:0o600});
+          }
+          await chmod(dir+'/result.json',0o600);
+          const manifest={purpose:'afw.adoption-clock.manifest.v1',inventory:[{name:'result.json',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}],rawLogsUploaded:false,operationalReadiness:false,completePackage:false,PCoff:false};
+          await writeFile(dir+'/manifest.json',JSON.stringify(manifest)+'\n',{mode:0o600});
+          NODE
+      - name: Preserve only closed result and manifest for seven days
+        if: ${{ always() }}
+        id: safe_artifact
+        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02
+        with:
+          name: afw-adoption-clock-historical-${{ github.run_id }}-${{ github.run_attempt }}
+          path: |
+            adoption-clock-safe/result.json
+            adoption-clock-safe/manifest.json
+          retention-days: 7
+          if-no-files-found: error
+      - name: Exact artifact metadata for independent readback
+        if: ${{ always() && steps.safe_artifact.outcome == 'success' }}
+        env:
+          ARTIFACT_ID: ${{ steps.safe_artifact.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ steps.safe_artifact.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          [[ "$ARTIFACT_ID" =~ ^[1-9][0-9]*$ ]]
+          [[ "$ARTIFACT_DIGEST" =~ ^[a-f0-9]{64}$ ]]
+          printf 'AC artifact id=%s sha256=%s retention-days=7\n' "$ARTIFACT_ID" "$ARTIFACT_DIGEST"
diff --git a/docs/superpowers/reports/2026-11-12-ordinary-adoption-clock.es.md b/docs/superpowers/reports/2026-11-12-ordinary-adoption-clock.es.md
# before_blob=ABSENT after_blob=ebc0b5eceed6c38c43a7b3f4ec3c946c99d8b01c
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-12-ordinary-adoption-clock.es.md
@@ -0,0 +1,58 @@
+# Comparación del reloj modelado de adopción ordinaria — preparación
+
+Estado: PREPARED_INACTIVE. Sin ejecución A/B. B completo y primer guard de biblioteca: UNKNOWN. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Alcance y autorización
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=rama diagnóstica GitHub SYN, eventual Actions Ubuntu 24.04; ORIGIN=GitHub connector; RESOURCE_TYPE=Git branch/commit/tree/blob; RESOURCE_ID=diag/afw-adoption-clock-20261112; ALLOWED_ACTION=preparar solamente tres archivos nuevos desactivados; ROLLBACK=base inmutable f5f52660d19ec9fc634bbc49558db75582fdaf88, sin mover Source/main ni otro ref. La preparación no autoriza disparar ni activar trabajos. Brief/spec/plan en 267c5cab171bc50147c5ac535d711781c0f9a6a0, leídos antes de implementar.
+
+Se leyó AGENTS.md fijado en f5 y se verificaron ref, commit y árbol completo: f5f52660d19ec9fc634bbc49558db75582fdaf88 → 7bc8b997a968dca32fc567b627de70b774d6489c; truncated=false; 3188 hojas. GET actions/runs?branch=diag%2Fafw-adoption-clock-20261112&per_page=100 devolvió total_count=0 y workflow_runs=[] antes de escribir.
+
+## Contrato preparado
+- Workflow manual sin inputs; dos jobs fijos current/historical con literal false en ambos gates, attempt 1, siete minutos, Node 22.23.4, checkout separado de workflow_sha y subject f5, lock original mediante npm ci --ignore-scripts --no-audit --no-fund solo en una futura ejecución autorizada.
+- Un caso exacto: actual CLI waits for attended observer until 50s after successful primary seed; GET only, únicamente test/mcp-qa-finite-adoption-wait.test.mjs. Conteos esperados 1 resultado seleccionado y 0 filtrados por brazo; conteos reales aún no medidos.
+- current conserva const T0=Date.now(),sha='b'.repeat(40). historical sustituye exactamente una coincidencia por const T0=Date.parse('2026-11-08T02:40:00.000Z'),sha='b'.repeat(40). Admisión rechaza 0/2 coincidencias, modo desconocido o literal histórico preexistente; normalización exacta.
+- Observaciones comunes de llamador: cf_fixture/cf_finalizer, restauración/control/prepare/proof/capture/read/claim, generación, projectPrivateQaFiniteReferences, projectFiniteExternalPlan, validateFiniteObserverOutput y build/import HTTP. Sin anotaciones de guards ni cambios lib. T0/R1/custodyExpiresAt/custodyCoversR1 provienen de descriptores de los argumentos efectivamente recibidos; booleanos no prueban el primer guard.
+- Se reutiliza de forma acotada el patrón cerrado O2 4db3321be9cffe7f948446e27aae43209f6d1d4f @ dd5f9a6df8fc196685b3cb9e0bb286a02d63bb83: errores nativos/cross-realm, getters/proxies/canario, identidad de receiver/Promise/error, sin emitir valores privados. Son controles preparados, no ejecutados en este bloque.
+- Sin modificación de recibo 6012e07fb3a518bfb2d18b62144067a22de02bef: expiry 2026-11-08T02:59:59Z, notBefore=null. B modela C0 02:44/N1 02:45/C1 02:47/R1 02:48 UTC y margen aritmético 719000 ms. No acredita autorización actual.
+- Futuro runner: procesos separados, 110s+5 hijo, 120s+5 comando; logs privados 0600 hasta 8 MiB por stream, no subidos; result<=64 KiB, solo result.json+manifest.json durante siete días, ID/digest medidos y readback independiente posterior limitado a 256 KiB. Cero descarga/extracción/ejecución privada en el PC.
+- Resultado diagnóstico verde solo significa experimento seguro completado; testPassed independiente, puede ser false. Ninguna expectativa fuerza hash, PASS o causa.
+
+## Inventario de seams originales
+- test/mcp-qa-finite-adoption-wait.test.mjs — e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55
+- test/fixtures/finite-cf-http.mjs — b0897d389ef3c1a0f057422ffc332e3e024d3a93
+- test/fixtures/finite-finalizer.mjs — d3b254e9a21fc816ef6520bdff0f4abafe34f6ea
+- test/fixtures/finite-restoration.mjs — ad53cfeca0b6c94b3e062bcb50e0a4644a667b31
+- test/fixtures/qa-finite-trial.mjs — 8297a9ae39fd4bdd228a2b1f64105683cb768203
+- test/fixtures/finite-http-module.mjs — cfbc564074d298cc333ddbb922ba7c19a96065fb
+- lib/mcp-qa-finite-external-contract.mjs — ec405e82e29d99ec1c6311f894eba18c5a48e2c4 (solo lectura).
+- lib/mcp-qa-finite-observer.mjs — 68dcfcdbccb9060fb24a7b076618c58fe3ef02e3 (solo lectura).
+La tabla de reemplazos incluye conteos exactos y reversión; los dos brazos comparten todos los seams. Solo el literal T0 difiere.
+
+## Verificación de preparación
+Solo operaciones GitHub y metadatos en RAM. Ningún clon/archivo de proyecto/dependencia/build/import/test/helper/CLI/job local o remoto fue ejecutado. No npm en esta preparación. Host Node version: UNAVAILABLE; no se intentó sortear el ocultamiento.
+
+Comprobaciones exactas:
+1. new vm.SourceTextModule(helperText): PASS, módulo sin link ni evaluate. Primer intento detectó un scaffold function installChild abierto duplicado; se corrigió antes de escribir; nueva gramática PASS.
+2. new vm.SourceTextModule para los dos scripts embebidos de preservación del workflow: PASS sin link/evaluate. No parser YAML completo disponible en este bloque; estructura manual fija inspeccionada.
+3. vm.Script de funciones puras de admisión/reemplazo con source como texto inerte y timeout:100 ms: 16/16 true — currentExact, historicalOne, missingRejected, duplicateRejected, invalidArmRejected, preexistingHistoricalRejected, allCommonSeamsRoundtrip, manualAdmitted, futurePushTruthful, invalidEventDenied, rerunDenied, wrongRefDenied, wrongShaDenied, wrongRepoDenied, noInputsDenied, clockAndCommonCommute.
+4. Patrón exacto: exact=true, prefixDenied=true, suffixDenied=true, en contexto 100 ms. Dos gates false, evento único workflow_dispatch, inputs/schedule/push/pull_request ausentes, dos nombres de brazo, un main, un installChild; caso own/O2 y overlays lib ausentes.
+5. Una llamada de metadatos combinada superó el límite automático de 64000 bytes y fue rechazada sin ejecutarse; se dividió en gramática y comprobaciones pequeñas. No bypass ni filesystem del proyecto.
+
+Ruling: el límite específico de esta preparación sustituye tests/builds/reviewers genéricos de skills; Root conserva la revisión completa f5..HEAD antes de cualquier release separado. No delegación adicional.
+
+## Cierre pendiente de readback
+Tras commit se requieren comparación íntegra de hojas/modos, contenidos de los tres archivos, CAS/ref y cero runs. El readback fechado se añadirá aquí conservando este bloque. Sin activar, ejecutar, tocar native Task2 ni su reloj; sin Source/main/lib/pins/recibos/credenciales/permisos/runtime/CF/OAuth/Max/correo. No overlap de jobs con reloj nativo. Después STOP_WRITES; una futura comparación única requiere revisión Root y autorización separada.
+
+## Readback primario — 2026-11-12 07:27:47 UTC
+Primer commit de preparación b4a388d459496cd6d6a58b81fc631e2805c39c4f; parent exacto f5f52660d19ec9fc634bbc49558db75582fdaf88; árbol a824a8a5708c231083909a1005641e36896cfe99. update_ref con expected_sha=f5, force=false devolvió success=true; GET ref posterior confirmó b4a388d459496cd6d6a58b81fc631e2805c39c4f.
+
+GET árbol recursivo completo: truncated=false, 3191 hojas, 3188 originales con SHA y modo exactos, cero originales modificados, solo tres adiciones 100644:
+- .github/workflows/afw-ordinary-adoption-clock.yml — 0555cd08558d89d886e67800e1a6e4d9166b1d85, 9097 bytes.
+- scripts/diagnostics/ordinary-adoption-clock.mjs — c9a22bc75ee0b66627baa64cf52955092f3c6c7f, 29622 bytes.
+- docs/superpowers/reports/2026-11-12-ordinary-adoption-clock.es.md — fdc9df0962ba7297a06838d16ad6936d790266bd, 6698 bytes antes de este append.
+
+Los tres cuerpos completos se recuperaron por SHA del commit y fueron iguales a los textos preparados, byte lógico UTF-8; no lectura parcial. Workflow preservó dos gates false, evento manual sin inputs, ningún trigger push. Segundo GET actions/runs filtrado por rama devolvió total_count=0, workflow_runs=[]. No se despachó nada.
+
+Aclaración de precisión: no se ejecutó parser YAML completo; su disponibilidad no fue comprobada. Sí se inspeccionó la estructura fija y se parsearon sin evaluar ambos programas JavaScript embebidos.
+
+Este append es únicamente evidencia de preparación: la revisión completa f5..HEAD, el hash final de este informe y el último CAS/readback se entregan a Root después de preservar este bloque. Ningún A/B ejecutado; ningún resultado B, timeout, control de privacidad, argumento de llamada o guard real medido en esta preparación. Estado PREPARED_INACTIVE; todos los indicadores operativos false. STOP_WRITES tras el readback final; Root debe revisar íntegramente antes de una futura release de UNA comparación separada.
diff --git a/scripts/diagnostics/ordinary-adoption-clock.mjs b/scripts/diagnostics/ordinary-adoption-clock.mjs
# before_blob=ABSENT after_blob=c9a22bc75ee0b66627baa64cf52955092f3c6c7f
--- /dev/null
+++ b/scripts/diagnostics/ordinary-adoption-clock.mjs
@@ -0,0 +1,390 @@
+// AFW fixed one-case modeled clock diagnostic. Inactive preparation; no business authority.
+import {createHash} from 'node:crypto';
+import {types} from 'node:util';
+import {runInNewContext} from 'node:vm';
+import {readFile,writeFile,mkdir,lstat,copyFile,symlink,chmod,open} from 'node:fs/promises';
+import {spawn,spawnSync} from 'node:child_process';
+import {resolve,join,dirname,isAbsolute} from 'node:path';
+import {fileURLToPath,pathToFileURL} from 'node:url';
+import * as net from 'node:net';
+import * as tls from 'node:tls';
+import * as http from 'node:http';
+import * as https from 'node:https';
+const SUBJECT='f5f52660d19ec9fc634bbc49558db75582fdaf88';
+const REPO='tokenizartinfo-ops/agent-friendly-web';
+const BRANCH='refs/heads/diag/afw-adoption-clock-20261112';
+const WORKFLOW='.github/workflows/afw-ordinary-adoption-clock.yml';
+const SELF=fileURLToPath(import.meta.url);
+const TESTS=['test/mcp-qa-finite-adoption-wait.test.mjs'];
+const CASES=['actual CLI waits for attended observer until 50s after successful primary seed; GET only'];
+const PATTERN='^'+CASES[0].replace(/[.*+?^$\{\}()|[\]\\]/g,'\\$&')+'$';
+const PINS={"test/mcp-qa-finite-adoption-wait.test.mjs":"e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55","test/fixtures/finite-cf-http.mjs":"b0897d389ef3c1a0f057422ffc332e3e024d3a93","test/fixtures/finite-finalizer.mjs":"d3b254e9a21fc816ef6520bdff0f4abafe34f6ea","test/fixtures/finite-restoration.mjs":"ad53cfeca0b6c94b3e062bcb50e0a4644a667b31","test/fixtures/qa-finite-trial.mjs":"8297a9ae39fd4bdd228a2b1f64105683cb768203","test/fixtures/finite-http-module.mjs":"cfbc564074d298cc333ddbb922ba7c19a96065fb"};
+const EDITS={
+  "test/mcp-qa-finite-adoption-wait.test.mjs": [
+    [
+      "await cfFiniteFixture(",
+      "await globalThis.__acWrap('cf_fixture',cfFiniteFixture)(",
+      1
+    ]
+  ],
+  "test/fixtures/finite-cf-http.mjs": [
+    [
+      "await finiteFinalizerFixture(",
+      "await globalThis.__acWrap('cf_finalizer',finiteFinalizerFixture)(",
+      1
+    ]
+  ],
+  "test/fixtures/finite-finalizer.mjs": [
+    [
+      "await finiteRestorationFixture(",
+      "await globalThis.__acWrap('final_restore',finiteRestorationFixture)(",
+      1
+    ],
+    [
+      "v=projectPrivateQaFiniteReferences(identity)",
+      "v=globalThis.__acWrap('final_project',projectPrivateQaFiniteReferences)(identity)",
+      1
+    ],
+    [
+      "plan=projectFiniteExternalPlan({control:identity,preview:v,custody})",
+      "plan=globalThis.__acWrap('external_project',projectFiniteExternalPlan)({control:identity,preview:v,custody})",
+      1
+    ],
+    [
+      "validateFiniteObserverOutput(output,plan);",
+      "globalThis.__acWrap('observer_validate',validateFiniteObserverOutput)(output,plan);",
+      1
+    ]
+  ],
+  "test/fixtures/finite-restoration.mjs": [
+    [
+      "f=finiteFixture({at})",
+      "f=globalThis.__acWrap('rest_init',finiteFixture)({at})",
+      1
+    ],
+    [
+      "ctl=controls.createPrivateQaFiniteTrialControl(f.options(controls))",
+      "ctl=globalThis.__acMethod('rest_control',controls,'createPrivateQaFiniteTrialControl')(f.options(controls))",
+      1
+    ],
+    [
+      "ctl.prepare()",
+      "globalThis.__acMethod('rest_prepare',ctl,'prepare')()",
+      1
+    ],
+    [
+      "proof=finiteProofFixture(",
+      "proof=globalThis.__acWrap('rest_proof',finiteProofFixture)(",
+      1
+    ],
+    [
+      "await store.capture(",
+      "await globalThis.__acMethod('rest_capture',store,'capture')(",
+      1
+    ],
+    [
+      "await store.read()",
+      "await globalThis.__acMethod('rest_read',store,'read')()",
+      2
+    ],
+    [
+      "await ctl.claimEffect(",
+      "await globalThis.__acMethod('rest_claim',ctl,'claimEffect')(",
+      1
+    ]
+  ],
+  "test/fixtures/qa-finite-trial.mjs": [
+    [
+      "old=generationFixture()",
+      "old=globalThis.__acWrap('trial_generation',generationFixture)()",
+      1
+    ]
+  ],
+  "test/fixtures/finite-http-module.mjs": [
+    [
+      "await build(",
+      "await globalThis.__acWrap('http_build',build)(",
+      2
+    ],
+    [
+      "return import(",
+      "return globalThis.__acWrap('http_import',specifier=>import(specifier))(",
+      2
+    ]
+  ]
+};
+const CLOCK_FROM="const T0=Date.now(),sha='b'.repeat(40)",CLOCK_TO="const T0=Date.parse('2026-11-08T02:40:00.000Z'),sha='b'.repeat(40)";
+const NEW_PATHS=[WORKFLOW,'scripts/diagnostics/ordinary-adoption-clock.mjs','docs/superpowers/reports/2026-11-12-ordinary-adoption-clock.es.md'];
+const PREFIX='AC_SAFE_V1 ';
+const MAX_SAFE=65536,MAX_MESSAGE=1048576,MAX_RAW=8388608;
+const STAGES=['cf_fixture','cf_finalizer','final_restore','final_project','rest_init','rest_control','rest_prepare','rest_proof','rest_capture','rest_read','rest_claim','trial_generation','http_build','http_import','external_project','observer_validate'];
+const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
+const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','EvalError','URIError','AggregateError','AssertionError'];
+const INTRINSICS=[Error,TypeError,SyntaxError,ReferenceError,RangeError,EvalError,URIError,AggregateError];
+const PROTOS=INTRINSICS.map(x=>x.prototype);
+const CLASS_NAMES=NAMES.slice(0,8);
+const flags={operationalReadiness:false,completePackage:false,PCoff:false};
+const hash=v=>createHash('sha256').update(v).digest('hex');
+const blob=v=>createHash('sha1').update('blob '+Buffer.byteLength(v)+'\0').update(v).digest('hex');
+const reject=()=>{throw Error('AC diagnostic unavailable');};
+const own=(v,k)=>{try{if(types.isProxy(v))return undefined;const d=Object.getOwnPropertyDescriptor(v,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};
+const hex=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v)?v:null;
+const number=(v,max=10000)=>Number.isSafeInteger(v)&&v>=0&&v<=max?v:null;
+function profile(error,depth){
+ let nativeError=false,currentRealmPrototype=null,observedDataPrototypeName=null,prototypeDepth=null;
+ try{
+  nativeError=types.isNativeError(error);
+  if(nativeError){
+   let p=Object.getPrototypeOf(error);
+   const n=PROTOS.indexOf(p);if(n>=0)currentRealmPrototype=CLASS_NAMES[n];
+   for(let i=1;i<=4&&p;i++){
+    if(types.isProxy(p))break;
+    const name=own(p,'name');
+    if(CLASS_NAMES.includes(name)){observedDataPrototypeName=name;prototypeDepth=i;break;}
+    p=Object.getPrototypeOf(p);
+   }
+  }
+ }catch{}
+ const m=own(error,'message'),c=own(error,'code'),n=own(error,'name');
+ let messageHash=null,messageTooLarge=false;
+ if(typeof m==='string'){messageTooLarge=m.length>MAX_MESSAGE||Buffer.byteLength(m)>MAX_MESSAGE;if(!messageTooLarge)messageHash=hash(m);}
+ return {nativeError,currentRealmPrototype,observedDataPrototypeName,prototypeDepth,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(n)?n:null,code:CODES.includes(c)?c:null,messageHash,messageTooLarge,depth};
+}
+function safeError(error){
+ const rows=[],seen=new Set();let e=error;
+ for(let depth=0;depth<=3&&e&&(typeof e==='object'||typeof e==='function')&&!seen.has(e);depth++){
+  seen.add(e);try{rows.push(profile(e,depth));}catch{rows.push(closedError({depth}));}
+  e=own(e,'cause');
+ }
+ return rows.map(x=>({...x,causeDepth:Math.max(0,rows.length-1)}));
+}
+function closedError(e){
+ const d=number(own(e,'depth'),3),cd=number(own(e,'causeDepth'),3),pd=number(own(e,'prototypeDepth'),4);
+ return {nativeError:own(e,'nativeError')===true,currentRealmPrototype:CLASS_NAMES.includes(own(e,'currentRealmPrototype'))?own(e,'currentRealmPrototype'):null,observedDataPrototypeName:CLASS_NAMES.includes(own(e,'observedDataPrototypeName'))?own(e,'observedDataPrototypeName'):null,prototypeDepth:pd&&pd>=1?pd:null,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(own(e,'name'))?own(e,'name'):null,code:CODES.includes(own(e,'code'))?own(e,'code'):null,messageHash:hex(own(e,'messageHash')),messageTooLarge:own(e,'messageTooLarge')===true,depth:d,causeDepth:cd};
+}
+function controls(){
+ const canary='AC_PRIVATE_CANARY_NEVER_EMIT_20261112';
+ let touches=0;
+ const ordinary=new TypeError(canary),cross=runInNewContext('new TypeError("AC_PRIVATE_CANARY_NEVER_EMIT_20261112")',{}, {timeout:100});
+ const spoof=Object.create(TypeError.prototype),guarded=new Error(canary);
+ for(const key of ['stack','code','name','cause',Symbol.toStringTag])Object.defineProperty(guarded,key,{get(){touches++;throw new Error('private getter');}});
+ const large=new Error('X'.repeat(MAX_MESSAGE+1)),cycle=new Error(canary);Object.defineProperty(cycle,'cause',{value:cycle});
+ let proxyTrapTouches=0;
+ const proxyRows=['direct','nested','revoked'].map(kind=>{
+  const handler={getPrototypeOf(){proxyTrapTouches++;throw new Error('private proxy trap');},getOwnPropertyDescriptor(){proxyTrapTouches++;throw new Error('private proxy trap');},get(){proxyTrapTouches++;throw new Error('private proxy trap');}};
+  const revocable=Proxy.revocable({},handler),proxy=revocable.proxy,error=new Error(canary);
+  Object.setPrototypeOf(error,kind==='nested'?Object.create(proxy):proxy);
+  if(kind==='revoked')revocable.revoke();
+  return safeError(error)[0];
+ });
+ const proxyPrototypesSafe=proxyTrapTouches===0&&proxyRows.every(row=>row.nativeError&&row.currentRealmPrototype===null&&row.observedDataPrototypeName===null&&row.prototypeDepth===null);
+ const rows=[ordinary,cross,spoof,guarded,large,cycle].map(safeError),wire=JSON.stringify({rows,proxyRows});
+ const pass=touches===0&&proxyPrototypesSafe&&!wire.includes(canary)&&rows[0][0].nativeError&&rows[0][0].currentRealmPrototype==='TypeError'&&rows[1][0].nativeError&&rows[1][0].currentRealmPrototype===null&&rows[1][0].observedDataPrototypeName==='TypeError'&&!rows[2][0].nativeError&&rows[2][0].prototypeDepth===null&&rows[3][0].name===null&&rows[4][0].messageHash===null&&rows[4][0].messageTooLarge&&rows[5].length===1;
+ return {pass,getterTouches:touches,proxyTrapTouches,proxyPrototypesSafe,ordinaryNative:rows[0][0].nativeError,crossRealmNative:rows[1][0].nativeError,crossRealmExactUnknown:rows[1][0].currentRealmPrototype===null,spoofRejected:!rows[2][0].nativeError,oversizeSuppressed:rows[4][0].messageTooLarge,cycleBounded:rows[5].length===1,rawCanaryAbsent:!wire.includes(canary)};
+}
+function closedControl(v){
+ return Object.fromEntries(['pass','proxyPrototypesSafe','ordinaryNative','crossRealmNative','crossRealmExactUnknown','spoofRejected','oversizeSuppressed','cycleBounded','rawCanaryAbsent'].map(k=>[k,own(v,k)===true]).concat([['getterTouches',number(own(v,'getterTouches'))],['proxyTrapTouches',number(own(v,'proxyTrapTouches'))]]));
+}
+function emit(value){try{const s=JSON.stringify(value);if(Buffer.byteLength(s)<=4096)process.stdout.write(PREFIX+s+'\n');}catch{}}
+function admitArm(mode){if(mode!=='current'&&mode!=='historical')reject();return mode;}
+function applyClock(original,mode){
+ admitArm(mode);
+ if(original.split(CLOCK_FROM).length-1!==1||original.includes(CLOCK_TO))reject();
+ const text=mode==='current'?original:original.replace(CLOCK_FROM,CLOCK_TO);
+ if(mode==='current'&&text!==original||mode==='historical'&&(text.split(CLOCK_TO).length-1!==1||text.replace(CLOCK_TO,CLOCK_FROM)!==original))reject();
+ return {text,changed:mode==='historical'?1:0};
+}
+function admittedContext(e){
+ return e.GITHUB_ACTIONS==='true'&&e.RUNNER_OS==='Linux'&&e.GITHUB_REPOSITORY===REPO&&e.GITHUB_REPOSITORY_ID==='1347578006'&&e.GITHUB_REF===BRANCH&&
+ ['workflow_dispatch','push'].includes(e.GITHUB_EVENT_NAME)&&e.GITHUB_RUN_ATTEMPT==='1'&&/^[1-9][0-9]{0,19}$/.test(e.GITHUB_RUN_ID??'')&&
+ /^[a-f0-9]{40}$/.test(e.AC_WORKFLOW_SHA??'')&&e.GITHUB_SHA===e.AC_WORKFLOW_SHA&&e.GITHUB_WORKFLOW_REF===REPO+'/'+WORKFLOW+'@'+BRANCH;
+}
+const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000?v:null;
+function clockArguments(stage,args){
+ const first=own(args,'0');
+ const preview=stage==='external_project'?own(first,'preview'):stage==='observer_validate'?own(own(args,'1'),'preview'):null;
+ const custody=stage==='external_project'?own(first,'custody'):stage==='observer_validate'?own(own(args,'1'),'custody'):null;
+ const T0=preview?time(own(preview,'T0')):stage==='cf_fixture'?time(own(first,'at')):null;
+ const R1=preview?time(own(preview,'R1')):null, custodyExpiresAt=custody?time(own(custody,'expiresAt')):null;
+ return {T0,R1,custodyExpiresAt,custodyCoversR1:R1!==null&&custodyExpiresAt!==null?custodyExpiresAt>=R1:null};
+}
+function installChild(){
+ if(process.env.AC_CHILD!=='FIXED_ONE_ADOPTION'||process.env.AC_SUBJECT!==SUBJECT)reject();
+ const note=(stage,phase,error,args)=>{
+  if(!STAGES.includes(stage))return;
+  try{emit({kind:'boundary',stage,phase,...phase==='enter'&&['cf_fixture','external_project','observer_validate'].includes(stage)?clockArguments(stage,args):{}});
+   if(phase==='throw')emit({kind:'error',stage,errors:safeError(error)});}catch{}
+ };
+ const observe=(stage,fn,receiver,args)=>{
+  let result;note(stage,'enter',undefined,args);
+  try{result=Reflect.apply(fn,receiver,args);}catch(error){note(stage,'throw',error);throw error;}
+  try{if(types.isPromise(result))void Promise.prototype.then.call(result,()=>note(stage,'return'),error=>note(stage,'throw',error));else note(stage,'return');}catch{}
+  return result;
+ };
+ globalThis.__acWrap=(stage,fn)=>function(...args){return observe(stage,fn,this,args);};
+ globalThis.__acMethod=(stage,receiver,key)=>{const fn=receiver[key];return function(...args){return observe(stage,fn,receiver,args);};};
+ let methodTouches=0;const receiver={call(x){methodTouches++;if(this!==receiver)throw new Error('receiver');return x;}};
+ const identity={},p=Promise.resolve(identity),thrown=new TypeError('AC_PRIVATE_CONTROL_THROW');
+ const returned=globalThis.__acMethod(null,receiver,'call')(p);
+ let sameError=false;try{globalThis.__acWrap(null,()=>{throw thrown;})();}catch(e){sameError=e===thrown;}
+ emit({kind:'identity_control',pass:returned===p&&sameError&&methodTouches===1,promiseIdentity:returned===p,errorIdentity:sameError,receiverIdentity:methodTouches===1});
+ const deny=()=>{emit({kind:'network_denied'});throw new Error('AC network disabled');};
+ globalThis.fetch=deny;net.Socket.prototype.connect=deny;net.default.connect=deny;net.default.createConnection=deny;tls.default.connect=deny;
+ http.default.request=deny;http.default.get=deny;https.default.request=deny;https.default.get=deny;
+ emit({kind:'privacy_control',...controls()});
+}
+function applyEdits(original,edits){
+ let text=original;const inventory=[];
+ for(const [from,to,expected]of edits){
+  const count=text.split(from).length-1;if(count!==expected||from===to)reject();
+  text=text.split(from).join(to);inventory.push({from,to,count});
+ }
+ let normalized=text;
+ for(const {from,to,count}of [...inventory].reverse()){
+  if(normalized.split(to).length-1!==count)reject();normalized=normalized.split(to).join(from);
+ }
+ if(normalized!==original)reject();
+ return {text,edits:inventory};
+}
+function addError(state,error){
+ const key=JSON.stringify(error);
+ if(state.errors[key])state.errors[key].count++;
+ else if(Object.keys(state.errors).length<96)state.errors[key]={...error,count:1};
+ else state.errorOverflow++;
+}
+function absorbMarker(data,state){
+ const message=own(data,'message');if(typeof message!=='string'||message.length>MAX_SAFE)return;
+ for(const line of message.split('\n')){
+  if(!line.startsWith(PREFIX)||line.length>4096)continue;
+  let v;try{v=JSON.parse(line.slice(PREFIX.length));}catch{continue;}
+  const stage=own(v,'stage'),phase=own(v,'phase'),kind=own(v,'kind');
+  if(kind==='boundary'&&STAGES.includes(stage)&&['enter','return','throw'].includes(phase)){
+   const key=stage+':'+phase;state.boundaries[key]=(state.boundaries[key]??0)+1;
+   if(phase==='enter'&&['cf_fixture','external_project','observer_validate'].includes(stage)&&state.clockObservations.length<16)state.clockObservations.push({stage,T0:time(own(v,'T0')),R1:time(own(v,'R1')),custodyExpiresAt:time(own(v,'custodyExpiresAt')),custodyCoversR1:typeof own(v,'custodyCoversR1')==='boolean'?own(v,'custodyCoversR1'):null});
+  }else if(kind==='error'&&STAGES.includes(stage)&&Array.isArray(own(v,'errors'))){
+   for(const e of v.errors.slice(0,4))addError(state,{stage,...closedError(e)});
+  }else if(kind==='privacy_control'&&state.privacyControls.length<4)state.privacyControls.push(closedControl(v));
+  else if(kind==='identity_control'&&state.identityControls.length<4)state.identityControls.push(Object.fromEntries(['pass','promiseIdentity','errorIdentity','receiverIdentity'].map(k=>[k,own(v,k)===true])));
+  else if(kind==='network_denied')state.networkDenied++;
+ }
+}
+function emptyEvidence(){return {purpose:'afw.adoption-clock.reporter.v1',testEvents:{selectedPassed:0,selectedFailed:0,filteredSkipped:0,wrapperFailed:0,unexpected:0,registered:0},summary:{},boundaries:{},errors:{},errorOverflow:0,privacyControls:[],identityControls:[],clockObservations:[],networkDenied:0};}
+export default async function* reporter(source){
+ const state=emptyEvidence();
+ for await(const event of source){
+  const d=event.data,type=event.type;
+  if(type==='test:stdout'||type==='test:stderr')absorbMarker(d,state);
+  else if(type==='test:pass'||type==='test:fail'){
+   const details=own(d,'details'),e=own(details,'error'),ft=own(e,'failureType'),name=own(d,'name'),selected=CASES.indexOf(name);
+   if(ft==='subtestsFailed')state.testEvents.wrapperFailed++;
+   else{
+    state.testEvents.registered++;
+    if(selected>=0){if(type==='test:fail')state.testEvents.selectedFailed++;else if(!own(d,'skip'))state.testEvents.selectedPassed++;else state.testEvents.unexpected++;}
+    else if(own(d,'skip'))state.testEvents.filteredSkipped++;else state.testEvents.unexpected++;
+   }
+   if(type==='test:fail')for(const row of safeError(e))addError(state,{case:selected<0?'wrapper':'adoption',failureType:['subtestsFailed','testCodeFailure','cancelledByParent'].includes(ft)?ft:null,...row});
+  }else if(type==='test:summary'){
+   const c=own(d,'counts');
+   for(const [from,to]of [['tests','tests'],['passed','pass'],['failed','fail'],['cancelled','cancelled'],['skipped','skipped'],['todo','todo']]){const n=number(own(c,from));if(n!==null)state.summary[to]=n;}
+  }else if(type==='test:diagnostic'){
+   const m=own(d,'message');if(typeof m==='string'&&m.length<64){const match=/^(tests|pass|fail|cancelled|skipped|todo) ([0-9]{1,6})$/.exec(m);if(match&&number(Number(match[2]))!==null)state.summary[match[1]]=Number(match[2]);}
+  }
+ }
+ const result={...state,errors:Object.values(state.errors)};
+ const text=JSON.stringify(result);yield Buffer.byteLength(text)<=MAX_SAFE?text+'\n':JSON.stringify({purpose:state.purpose,status:'safe_output_cap'})+'\n';
+}
+function sanitizeEvidence(v){
+ if(own(v,'purpose')!=='afw.adoption-clock.reporter.v1')return null;
+ const state=emptyEvidence();state.errors=[];
+ for(const k of Object.keys(state.testEvents)){const n=number(own(own(v,'testEvents'),k));if(n===null)return null;state.testEvents[k]=n;}
+ for(const k of ['tests','pass','fail','cancelled','skipped','todo']){const n=number(own(own(v,'summary'),k));if(n!==null)state.summary[k]=n;}
+ for(const stage of STAGES)for(const phase of ['enter','return','throw']){const k=stage+':'+phase,n=number(own(own(v,'boundaries'),k));if(n!==null)state.boundaries[k]=n;}
+ const errors=own(v,'errors');if(!Array.isArray(errors)||errors.length>96)return null;
+ for(const e of errors){
+  const stage=own(e,'stage'),c=own(e,'case'),failureType=own(e,'failureType'),count=number(own(e,'count'));
+  if(count===null)return null;
+  state.errors.push({...STAGES.includes(stage)?{stage}:{case:['adoption','wrapper'].includes(c)?c:'wrapper',failureType:['subtestsFailed','testCodeFailure','cancelledByParent'].includes(failureType)?failureType:null},...closedError(e),count});
+ }
+ state.errorOverflow=number(own(v,'errorOverflow'));state.networkDenied=number(own(v,'networkDenied'));
+ for(const key of ['privacyControls','identityControls']){const rows=own(v,key);if(!Array.isArray(rows)||rows.length>4)return null;state[key]=rows.map(x=>key==='privacyControls'?closedControl(x):Object.fromEntries(['pass','promiseIdentity','errorIdentity','receiverIdentity'].map(k=>[k,own(x,k)===true])));}
+ const clocks=own(v,'clockObservations');if(!Array.isArray(clocks)||clocks.length>16)return null;
+ state.clockObservations=clocks.map(x=>({stage:['cf_fixture','external_project','observer_validate'].includes(own(x,'stage'))?own(x,'stage'):null,T0:time(own(x,'T0')),R1:time(own(x,'R1')),custodyExpiresAt:time(own(x,'custodyExpiresAt')),custodyCoversR1:typeof own(x,'custodyCoversR1')==='boolean'?own(x,'custodyCoversR1'):null}));
+ return state;
+}
+function git(cwd,args){
+ const r=spawnSync('git',args,{cwd,encoding:'utf8',timeout:10000,maxBuffer:2097152,env:{PATH:process.env.PATH,HOME:process.env.RUNNER_TEMP,GIT_CONFIG_NOSYSTEM:'1'}});
+ if(r.status!==0)reject();return r.stdout;
+}
+function tuples(raw){
+ return raw.split('\0').filter(Boolean).map(x=>{const m=/^([0-9]{6}) blob ([a-f0-9]{40})\t([^\n]+)$/.exec(x);if(!m||m[3].startsWith('/')||m[3].split('/').includes('..'))reject();return {mode:m[1],sha:m[2],path:m[3]};});
+}
+async function inventory(root,leaves){
+ const rows=[];for(const leaf of leaves){const p=join(root,leaf.path),s=await lstat(p);if(!s.isFile()||s.isSymbolicLink()||((s.mode&0o111)!==0)!==(leaf.mode==='100755'))reject();if(blob(await readFile(p))!==leaf.sha)reject();rows.push([leaf.path,leaf.mode,leaf.sha]);}return hash(JSON.stringify(rows));
+}
+async function runChild(cwd,privateDir){
+ const handles=await Promise.all(['stdout','stderr'].map(n=>open(join(privateDir,'raw.'+n),'wx',0o600)));
+ const digests=[createHash('sha256'),createHash('sha256')],sizes=[0,0],chunks=[];let reason=null,killer=null;
+ const env={PATH:process.env.PATH,HOME:privateDir,TMPDIR:privateDir,LANG:'C.UTF-8',AC_CHILD:'FIXED_ONE_ADOPTION',AC_SUBJECT:SUBJECT,GITHUB_SHA:SUBJECT};
+ const child=spawn(process.execPath,['--import',pathToFileURL(SELF).href,'--test','--test-name-pattern='+PATTERN,'--test-reporter='+pathToFileURL(SELF).href,...TESTS],{cwd,env,detached:true,stdio:['ignore','pipe','pipe']});
+ const terminate=why=>{if(reason)return;reason=why;try{process.kill(-child.pid,'SIGTERM');}catch{}killer=setTimeout(()=>{try{process.kill(-child.pid,'SIGKILL');}catch{}},5000);};
+ const parentStop=()=>terminate('parent_terminated');process.once('SIGTERM',parentStop);process.once('SIGINT',parentStop);
+ const deadline=setTimeout(()=>terminate('deadline_110s'),110000);
+ const pumps=[child.stdout,child.stderr].map(async(stream,i)=>{for await(const chunk of stream){if(sizes[i]+chunk.length>MAX_RAW){terminate('raw_output_cap');continue;}sizes[i]+=chunk.length;digests[i].update(chunk);await handles[i].write(chunk);if(i===0&&sizes[0]<=MAX_SAFE)chunks.push(chunk);else if(i===0)terminate('safe_output_cap');}});
+ const exit=await new Promise(resolve=>{child.once('error',()=>resolve({code:null,signal:null,spawnFailed:true}));child.once('close',(code,signal)=>resolve({code,signal:['SIGTERM','SIGKILL'].includes(signal)?signal:null,spawnFailed:false}));});
+ await Promise.all(pumps);clearTimeout(deadline);clearTimeout(killer);process.removeListener('SIGTERM',parentStop);process.removeListener('SIGINT',parentStop);await Promise.all(handles.map(h=>h.close()));
+ let evidence=null;try{const bytes=Buffer.concat(chunks);if(bytes.length<=MAX_SAFE)evidence=sanitizeEvidence(JSON.parse(bytes.toString('utf8')));}catch{}
+ return {exit,termination:reason,evidence,rawFiles:['stdout','stderr'].map((name,i)=>({name:'raw.'+name,bytes:sizes[i],sha256:digests[i].digest('hex'),uploaded:false})),privateLogsUploaded:false};
+}
+async function preserve(output,report){
+ let text=JSON.stringify(report,null,2)+'\n';
+ if(Buffer.byteLength(text)>MAX_SAFE)text=JSON.stringify({purpose:'afw.adoption-clock.diagnostic.v1',status:'safe_output_cap',...flags})+'\n';
+ await writeFile(join(output,'result.json'),text,{mode:0o600});
+ const manifest={purpose:'afw.adoption-clock.manifest.v1',inventory:[{name:'result.json',bytes:Buffer.byteLength(text),sha256:hash(text)}],rawLogsUploaded:false,...flags};
+ await writeFile(join(output,'manifest.json'),JSON.stringify(manifest)+'\n',{mode:0o600});
+}
+async function main(){
+ if(process.argv.length!==2||process.platform!=='linux'||process.version!=='v22.23.4'||!admittedContext(process.env))reject();
+ const arm=admitArm(process.env.AC_ARM),subject=resolve('subject'),runner=process.env.RUNNER_TEMP;
+ if(!runner||!isAbsolute(runner)||resolve(runner)===subject)reject();
+ const output=resolve('adoption-clock-safe');await mkdir(output,{recursive:true,mode:0o700});
+ const context={repository:REPO,workflowRef:BRANCH,trigger:process.env.GITHUB_EVENT_NAME,workflowSource:process.env.AC_WORKFLOW_SHA,testSource:SUBJECT,runId:process.env.GITHUB_RUN_ID,attempt:1,node:process.version,os:'Ubuntu24.04',arm,childContext:'MODELED_STERILE_SYNTHETIC',workflowContextIsAdmissionAuthority:false,...flags};
+ let report={purpose:'afw.adoption-clock.diagnostic.v1',status:'incomplete',context,noRetry:true,...flags};
+ await preserve(output,report);
+ let before=null,leaves=null,parent=null,overlays=[];
+ try{
+  const helperRoot=dirname(dirname(dirname(SELF)));
+  if(git(helperRoot,['rev-parse','HEAD']).trim()!==context.workflowSource)reject();
+  if(git(subject,['rev-parse','HEAD']).trim()!==SUBJECT||git(subject,['status','--porcelain','--untracked-files=no']).trim()!=='')reject();
+  leaves=tuples(git(subject,['ls-tree','-rz','--full-tree','HEAD']));
+  if(leaves.length!==3188||leaves.find(x=>x.path==='package.json')?.sha!=='f4fd38ac380c46a149d8cf0f3bd828a28406f761'||leaves.find(x=>x.path==='package-lock.json')?.sha!=='36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b'||git(subject,['rev-parse','HEAD^{tree}']).trim()!=='7bc8b997a968dca32fc567b627de70b774d6489c')reject();
+  const candidate=tuples(git(helperRoot,['ls-tree','-rz','--full-tree','HEAD'])),map=new Map(candidate.map(x=>[x.path,x]));
+  if(candidate.length!==3191||leaves.some(x=>map.get(x.path)?.sha!==x.sha||map.get(x.path)?.mode!==x.mode)||NEW_PATHS.some(x=>!map.has(x)))reject();
+  before=await inventory(subject,leaves);
+  parent=join(resolve(runner),'ac-'+context.runId+'-'+arm);await mkdir(parent,{recursive:false,mode:0o700});
+  const overlay=join(parent,'overlay');await mkdir(overlay,{mode:0o700});
+  for(const leaf of leaves){const dest=join(overlay,leaf.path);await mkdir(dirname(dest),{recursive:true});await copyFile(join(subject,leaf.path),dest);await chmod(dest,leaf.mode==='100755'?0o700:0o600);}
+  await symlink(join(subject,'node_modules'),join(overlay,'node_modules'),'dir');
+  for(const path of Object.keys(EDITS)){
+   const original=await readFile(join(subject,path),'utf8');if(blob(original)!==PINS[path])reject();
+   const clocked=path===TESTS[0]?applyClock(original,arm):{text:original,changed:0},edited=applyEdits(clocked.text,EDITS[path]);
+   const roundtrip=applyEdits(original,EDITS[path]);
+   if(path===TESTS[0]&&applyClock(roundtrip.text,arm).text!==edited.text)reject();
+   await writeFile(join(overlay,path),edited.text,{mode:0o600});
+   overlays.push({path,originalBlob:PINS[path],originalHash:hash(original),newHash:hash(edited.text),normalized:true,clockLiteralChanges:clocked.changed,seams:edited.edits.map(x=>({originalLiteralHash:hash(x.from),newLiteralHash:hash(x.to),count:x.count}))});
+  }
+  report={...report,status:'running_or_interrupted',protectedBase:{leaves:leaves.length,before},overlays,privacy:controls(),helperHash:hash(await readFile(SELF)),selection:{files:TESTS,namePattern:PATTERN,expectedSelectedResults:1,expectedFilteredSkips:0},clockContract:{historicalT0:'2026-11-08T02:40:00.000Z',receiptBlob:'6012e07fb3a518bfb2d18b62144067a22de02bef',receiptExpiry:'2026-11-08T02:59:59Z',receiptNotBefore:null,modeledOnly:true}};
+  await preserve(output,report);
+  const execution=await runChild(overlay,parent),e=execution.evidence,after=await inventory(subject,leaves),counts=e?.testEvents;
+  const countsMatch=counts?.registered===1&&counts.selectedFailed+counts.selectedPassed===1&&counts.filteredSkipped===0&&counts.wrapperFailed===0&&counts.unexpected===0;
+  const testPassed=countsMatch?counts.selectedPassed===1:null;
+  const complete=execution.termination===null&&!execution.exit.spawnFailed&&[0,1].includes(execution.exit.code)&&e?.purpose==='afw.adoption-clock.reporter.v1'&&e.errorOverflow===0&&e.networkDenied===0&&countsMatch&&e.privacyControls.length===1&&e.privacyControls.every(x=>x.pass)&&e.identityControls.length===1&&e.identityControls.every(x=>x.pass)&&report.privacy.pass&&before===after;
+  report={...report,status:complete?'diagnostic_complete':'incomplete',protectedBase:{leaves:leaves.length,before,after,equal:before===after},execution,selectionCountsMatch:countsMatch,testPassed,timeoutExercised:execution.termination==='deadline_110s',causalConclusion:'DEFERRED_TO_ROOT_BOUNDARY_REVIEW',earliestLibraryGuard:'UNKNOWN',allRemainingFailuresFixed:false,noRetry:true};
+ }catch(error){report={...report,status:'incomplete',preparationError:safeError(error)};}
+ finally{
+  if(before&&leaves){try{const after=await inventory(subject,leaves);report.protectedBase={leaves:leaves.length,before,after,equal:before===after};if(before!==after)report.status='incomplete';}catch{report.status='incomplete';report.protectedBase={leaves:leaves.length,before,after:null,equal:false};}}
+  await preserve(output,report);
+ }
+ process.exitCode=report.status==='diagnostic_complete'?0:1;
+}
+if(process.env.AC_CHILD&&process.env.NODE_TEST_CONTEXT==='child-v8')installChild();
+if(process.argv[1]&&resolve(process.argv[1])===SELF){try{await main();}catch{process.stderr.write('AC diagnostic admission or preservation blocked.\n');process.exitCode=1;}}
```
