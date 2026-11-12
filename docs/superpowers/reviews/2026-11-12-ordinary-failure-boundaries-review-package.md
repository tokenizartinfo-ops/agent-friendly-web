# ORDremainingtwo-case preparation — complete review package

Repo tokenizartinfo-ops/agent-friendly-web. BASE f5f52660d19ec9fc634bbc49558db75582fdaf88; HEAD dee60034f5caf5087a4e2972d8dcaabee7c3fba1; treef71302b9498a82c6f1571d78b5b9df04c4a7aa1b. All2commits/3NEWfiles/all3188originalblobs+modesexact/3191final. FullU10context=entireaddedfiles; noomittedhunks.

## Commits
421febef4da38ffefeab00cd6ec9a838ce3c7f00 Prepare inactive fixed two-case failure boundary diagnostic [skip ci]
dee60034f5caf5087a4e2972d8dcaabee7c3fba1 Keep identity controls outside fixture boundary observations [skip ci]

## Stat
.github/workflows/afw-ordinary-failure-boundaries.yml +94 -0
docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md +257 -0
scripts/diagnostics/ordinary-failure-boundaries.mjs +353 -0

## Complete diff
```diff
diff --git a/.github/workflows/afw-ordinary-failure-boundaries.yml b/.github/workflows/afw-ordinary-failure-boundaries.yml
new file mode 100644
index 0000000..c082ab9
--- /dev/null
+++ b/.github/workflows/afw-ordinary-failure-boundaries.yml
@@ -0,0 +1,94 @@
+name: AFW ordinary failure boundaries (INACTIVE)
+# PREPARATION ONLY. Root review and a separate single-run release are required.
+'on':
+  workflow_dispatch:
+permissions:
+  contents: read
+  actions: read
+concurrency:
+  group: afw-failure-boundaries-${{ github.ref }}-${{ github.run_id }}
+  cancel-in-progress: false
+jobs:
+  boundaries:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/diag/afw-failure-boundaries-20261112' && github.event_name == 'workflow_dispatch' && github.run_attempt == '1' }}
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
+          mkdir -p failure-boundaries-safe
+          printf '%s\n' '{"purpose":"afw.failure-boundaries.diagnostic.v1","status":"setup_or_deadline_incomplete","operationalReadiness":false,"completePackage":false,"PCoff":false}' > failure-boundaries-safe/result.json
+      - name: Install fixed subject lock without lifecycle scripts
+        working-directory: subject
+        run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: One fixed synthetic two-case probe
+        env:
+          AFB_WORKFLOW_SHA: ${{ github.workflow_sha }}
+        run: timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-failure-boundaries.mjs
+      - name: Final closed receipt and exact two-file manifest
+        if: ${{ always() }}
+        shell: bash
+        run: |
+          umask 077
+          node --input-type=module <<'NODE'
+          import {mkdir,readFile,writeFile,chmod,lstat} from 'node:fs/promises';
+          import {createHash} from 'node:crypto';
+          const dir='failure-boundaries-safe';
+          await mkdir(dir,{recursive:true,mode:0o700});
+          let bytes;
+          try{
+            const info=await lstat(dir+'/result.json');
+            if(!info.isFile()||info.isSymbolicLink()||info.size>65536)throw 0;
+            bytes=await readFile(dir+'/result.json');
+            const result=JSON.parse(bytes);
+            if(result.purpose!=='afw.failure-boundaries.diagnostic.v1'||result.operationalReadiness!==false||result.completePackage!==false||result.PCoff!==false)throw 0;
+          }catch{
+            bytes=Buffer.from(JSON.stringify({purpose:'afw.failure-boundaries.diagnostic.v1',status:'setup_or_deadline_incomplete',operationalReadiness:false,completePackage:false,PCoff:false})+'\n');
+            await writeFile(dir+'/result.json',bytes,{mode:0o600});
+          }
+          await chmod(dir+'/result.json',0o600);
+          const manifest={purpose:'afw.failure-boundaries.manifest.v1',inventory:[{name:'result.json',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}],rawLogsUploaded:false,operationalReadiness:false,completePackage:false,PCoff:false};
+          await writeFile(dir+'/manifest.json',JSON.stringify(manifest)+'\n',{mode:0o600});
+          NODE
+      - name: Preserve only closed result and manifest for seven days
+        if: ${{ always() }}
+        id: safe_artifact
+        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02
+        with:
+          name: afw-failure-boundaries-${{ github.run_id }}-${{ github.run_attempt }}
+          path: |
+            failure-boundaries-safe/result.json
+            failure-boundaries-safe/manifest.json
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
+          printf 'AFB artifact id=%s sha256=%s retention-days=7\n' "$ARTIFACT_ID" "$ARTIFACT_DIGEST"
diff --git a/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md b/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md
new file mode 100644
index 0000000..c9fb238
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md
@@ -0,0 +1,257 @@
+# AFW: preparación inactiva de dos fronteras de fallo — 12 noviembre 2026
+
+Estado: PREPARADO INACTIVO; cero ejecuciones de Actions en esta rama antes de preparar. No se ejecutó helper, proyecto, build, test, instalación ni sonda. operationalReadiness=false; completePackage=false; PCoff=false. STOP_WRITES al entregar el contrato externo con las comprobaciones remotas finales. La revisión fresca y cualquier ejecución corresponden a Root mediante una liberación separada.
+
+## Alcance y procedencia
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (público, id 1347578006); ENVIRONMENT=diagnóstico sintético inactivo en GitHub; ORIGIN=GitHub connector; RESOURCE_TYPE=git branch/tree/blob; RESOURCE_ID=diag/afw-failure-boundaries-20261112; ALLOWED_ACTION=añadir exactamente los tres archivos indicados en esta rama. El owner mantiene autorización autónoma cloud para esta preparación; la decisión técnica de Root no se presenta como nueva aprobación humana.
+
+Base inmutable: f5f52660d19ec9fc634bbc49558db75582fdaf88, árbol 7bc8b997a968dca32fc567b627de70b774d6489c; lectura recursiva completa no truncada: 3188 blobs. Root creó esta rama tras búsqueda vacía y readback; el implementador verificó nuevamente que apuntaba exactamente a f5 antes de trabajar. package.json=f4fd38ac380c46a149d8cf0f3bd828a28406f761; package-lock.json=36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b. SourceNative, main, Rootdocs y la rama ORD previa permanecen fuera del alcance.
+
+Requisitos leídos por orden en ea9268a3ff3c21735deab86037a7e6dab0ae6c92:
+
+- Brief docs/superpowers/briefs/2026-11-12-ordinary-failure-boundaries-preparation.md; blob fa1fb47e7f96f07d85da02fc03dc9ae54ca899df.
+- Spec docs/superpowers/specs/2026-11-12-ordinary-failure-boundaries-design.md; blob acd53f8bf5cd4a572ef2906ce9b20dd96dc72059.
+- Plan docs/superpowers/plans/2026-11-12-ordinary-failure-boundaries.md; blob 6cc77354b75186f3217fc9354bb0e8b4165df7e1.
+- AGENTS.md de f5, blob b67942223e5633011573f2a2165489afd9ff3f67; lectura para esta tarea AFW, sin operaciones Hermes.
+- Referencia de patrones de custodia/observación únicamente: scripts/diagnostics/ordinary-fourfile.mjs @174eb0dc0dca90f3b274c8ccd191c3a2b36f6ccc, blob ee4bbaa44edf02c10224e4e6085baa6a8e40a0bd. No se copiaron pin B ni los casos CLI.
+
+Tres únicos archivos nuevos, todos modo Git 100644:
+
+| Ruta | Bytes UTF-8 | Git blob | SHA-256 |
+| --- | ---: | --- | --- |
+| scripts/diagnostics/ordinary-failure-boundaries.mjs | 25584 | 67ac2f192c767b56b356a41ee6e9db6e1601fe53 | 7687d91c990fbd438c963367b5afb6375d49dbb28f22a16f437c575f6114635b |
+| .github/workflows/afw-ordinary-failure-boundaries.yml | 4732 | c082ab9bacc8b3cf975fa611aebd95edcf144fd0 | 5eafd022655c8122de813ed3b3ffe57ce6566f0bc23050ccc5a1c28045ac7e5a |
+| docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md | contrato externo | contrato externo | contrato externo |
+
+El propio blob/commit/árbol final de este informe se entrega en el contrato externo: incluir sus hashes finales en su propio contenido produciría una referencia circular. No se crearán commits adicionales para intentar cerrar esa circularidad.
+
+## Pregunta y selección fija
+
+La observación histórica 43159614775/f5 tuvo A109/73/36 y B109/85/24. Doce casos CLI se recuperaron sólo bajo pin sintético B; eso no autoriza cambiar el pin productivo. Las dos familias restantes no tienen causa proximal exacta establecida: own falla al importar después de build y adoption falla antes del build HTTP. Los campos antiguos name/code NULL no descartan un Error con nombre heredado.
+
+El futuro helper admite cero argumentos y selecciona sólo estos dos archivos/nombres:
+
+1. test/mcp-own-finite-entrypoints.test.mjs — compiled finite receiver denies legacy delivery before every host capability.
+2. test/mcp-qa-finite-adoption-wait.test.mjs — actual CLI waits for attended observer until 50s after successful primary seed; GET only.
+
+Node recibe una alternancia escapada y anclada ^(?:...|...)$ mediante --test-name-pattern. La expectativa pendiente de comprobar es 22 tests registrados, 2 seleccionados fallidos y 20 filtrados; wrappers y fallos seleccionados se cuentan por separado. El resultado conserva los conteos observados aunque difieran y marca incomplete. No equivale a la suite de 109 ni prueba los 24 fallos restantes.
+
+Hashes de mensaje de referencia a reproducir: own=9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff; adoption=a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e. Sin coincidencia no se admite conclusión comparativa.
+
+## Observación pasiva y privacidad
+
+Se prepara util.types.isNativeError para la marca nativa booleana. Referencia oficial Node 22: https://nodejs.org/download/release/v22.17.0/docs/api/util.html#utiltypesisnativeerrorvalue . Esta referencia no acredita ejecución en Node 22.23.4.
+
+Sólo con marca positiva se observa identidad del prototipo inmediato frente a los ocho prototipos actuales Error/TypeError/SyntaxError/ReferenceError/RangeError/EvalError/URIError/AggregateError. Un Error de otro realm puede mantener currentRealmPrototype=null y observedDataPrototypeName=TypeError a profundidad 1..4; la observación declara prototypeObservationIsExactIntrinsicClass=false. Marca negativa no recorre prototipos. Los getters nunca se llaman: se leen descriptores propios de datos; proxies se rechazan para esa observación. No se usa Error.prototype.toString, Object.prototype.toString, constructor ni stack.
+
+name/code mantienen enums cerrados; mensajes propios de datos sólo dan SHA-256 si longitud y bytes son <=1 MiB, en caso contrario NULL+messageTooLarge. Sólo se sigue cause propia de datos, máximo tres enlaces, cortando ciclos; causeDepth=0..3. La salida no incluye mensajes/stack/dataURL/actual/expected/cuerpos de bundles. Observación y serialización atrapadas no reemplazan la excepción original.
+
+Las envolturas sin await devuelven el mismo valor/Promise; Reflect.apply conserva this y argumentos. Métodos ctl/store usan un wrapper que captura el receptor y obtiene el método antes de evaluar argumentos, conservando el orden original. Una rama de Promise observa retorno/rechazo sin envolver el valor devuelto. No se sustituyen algoritmos, relojes, fixture clocks, plan, pin ni producto. La instrumentación sólo existe en una copia temporal cloud; el checkout sujeto f5 conserva bytes/modos.
+
+Controles preparados, NO EJECUTADOS: TypeError ordinario y cross-realm; objeto que falsifica TypeError.prototype; getters arrojadores de stack/code/name/tag/cause (touches esperado cero); mensaje sobredimensionado; causa cíclica; canary privado ausente de la salida. Controles en padre y dos procesos de test. También se comprueban identidad del receptor, Promise y excepción con una llamada sintética; los controles no emiten ninguna de las 16 etapas de fixtures; sólo su recibo identity_control, separado del contador de tests. Todos deberán pasar en el futuro; la sintaxis no los acredita.
+
+Hay exactamente 16 etapas cerradas: own_build, own_import, cf_fixture, cf_finalizer, final_restore, final_project, rest_init, rest_control, rest_prepare, rest_proof, rest_capture, rest_read, rest_claim, trial_generation, http_build, http_import. No se añadió instrumentación a qa-generation-ledger ni finite-cleanup-proof. finite-http-module sólo emitirá marcas si las llamadas originales se alcanzan.
+
+## Literales y normalización comprobados en RAM
+
+Se compararon conteos exactos de cada literal sobre los blobs f5 y se revirtieron todas las sustituciones en orden inverso; los siete contenidos normalizados fueron idénticos al original. Los siete overlays se analizaron como gramática ECMAScript sin evaluación, importación o ejecución. Los hashes y conteos siguientes son de esa preparación estática, no de un build ni de una prueba:
+
+### test/mcp-own-finite-entrypoints.test.mjs
+
+Git blob original: 674419ca51328b128bba483f44001e12f1e4b9f5. SHA-256 original=fc7de7a7e5c5c641800e67d812f426a67d2e6d947df342eb5d06c26d772b36b5; overlay=ff61d611d2341532f3e9de50c19e9e963116a3510a3c02faf3acea08bb76d879; normalización exacta=true.
+
+```json
+[
+  {
+    "from": "await build(",
+    "to": "await globalThis.__afbWrap('own_build',build)(",
+    "count": 1,
+    "fromHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
+    "toHash": "0720f56b5c5cd0f7d78853bd4e94e33dfb59dea110cd865895e4d619c4bfbd63"
+  },
+  {
+    "from": "return import(",
+    "to": "return globalThis.__afbWrap('own_import',specifier=>import(specifier))(",
+    "count": 1,
+    "fromHash": "3e2b23e761707ac8785e5eb2c7492e98949f5b624aac6b2e9579288889dd0c4a",
+    "toHash": "46d799063b1badc4b6ad4166183908dfa3938d69be3423825c0a92cc8c5db438"
+  }
+]
+```
+
+### test/mcp-qa-finite-adoption-wait.test.mjs
+
+Git blob original: e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55. SHA-256 original=d2ca0aa07bb989985d5262aeaf3c5964f20167da4b9c39a0b21975c9f1178226; overlay=770d986196a64bcf009c4420eaafb73143f45d529c446f56747b60e436fdfeaa; normalización exacta=true.
+
+```json
+[
+  {
+    "from": "await cfFiniteFixture(",
+    "to": "await globalThis.__afbWrap('cf_fixture',cfFiniteFixture)(",
+    "count": 1,
+    "fromHash": "afee59eab4a21b0a272448eb4c9252dfda5ff713998094e1477c96ddeb0767ec",
+    "toHash": "bb695cac8e8625a9d0642f805450b0ec4a67b3d80475ab8267a0da8b94890792"
+  }
+]
+```
+
+### test/fixtures/finite-cf-http.mjs
+
+Git blob original: b0897d389ef3c1a0f057422ffc332e3e024d3a93. SHA-256 original=d98bf19e307d9a1cc137f3e36ee3869426cb56be0e623fe916cbc88ab253d02a; overlay=af1fb0dc7e44fd0bd142e501f23ffdc89d39c77b5eb366307155c916cda50650; normalización exacta=true.
+
+```json
+[
+  {
+    "from": "await finiteFinalizerFixture(",
+    "to": "await globalThis.__afbWrap('cf_finalizer',finiteFinalizerFixture)(",
+    "count": 1,
+    "fromHash": "0f5844a6a2bdad04e57281c66bff40f4e9a1808948428365113dec0b408e1c22",
+    "toHash": "aa29a11e9ff09401459a31995814e509440aa5b705a57f335e90ce28fa5d7a21"
+  }
+]
+```
+
+### test/fixtures/finite-finalizer.mjs
+
+Git blob original: d3b254e9a21fc816ef6520bdff0f4abafe34f6ea. SHA-256 original=f8a4121aea13399f9187330ed7d8545797f2e4cb3f50370c14e990ea495da4ac; overlay=ca7a009b39a325cbcc77c350a9ab35fb8f195bce0d8bb6850be1591d6202f28d; normalización exacta=true.
+
+```json
+[
+  {
+    "from": "await finiteRestorationFixture(",
+    "to": "await globalThis.__afbWrap('final_restore',finiteRestorationFixture)(",
+    "count": 1,
+    "fromHash": "01c99e748cd51dc60091e77660395792a6fbb56c635a89ac8f5f1660c31698d8",
+    "toHash": "f53046c288825c43f871a39975ae8f1b87512605e1dafc3bef51a0a0596e7bca"
+  },
+  {
+    "from": "v=projectPrivateQaFiniteReferences(identity)",
+    "to": "v=globalThis.__afbWrap('final_project',projectPrivateQaFiniteReferences)(identity)",
+    "count": 1,
+    "fromHash": "515c51cbdc1a6e88210e0cb4a4c08eab7de396174a15ba4e400a2fb9fb49901e",
+    "toHash": "5004796835e0522f241a330919e6ea905662f4e3bb130646263261acbc831945"
+  }
+]
+```
+
+### test/fixtures/finite-restoration.mjs
+
+Git blob original: ad53cfeca0b6c94b3e062bcb50e0a4644a667b31. SHA-256 original=9343d3065c094a5a265bd30b3eaeb84e96dbc77ea1be62e227e94ada4f6e555d; overlay=a6d612d3d340c293304badf4219b59716eb19a3ef3223efa175dc16ec4803c4f; normalización exacta=true.
+
+```json
+[
+  {
+    "from": "f=finiteFixture({at})",
+    "to": "f=globalThis.__afbWrap('rest_init',finiteFixture)({at})",
+    "count": 1,
+    "fromHash": "dcef066779a19fae94d596e716e611ef4cb29e8af455a9baeb35d4e6238bb54d",
+    "toHash": "5c1a4777a4ac9a788a33eb1e6edb9f9427529ab40ca52c1548e80cb9d825d64e"
+  },
+  {
+    "from": "ctl=controls.createPrivateQaFiniteTrialControl(f.options(controls))",
+    "to": "ctl=globalThis.__afbMethod('rest_control',controls,'createPrivateQaFiniteTrialControl')(f.options(controls))",
+    "count": 1,
+    "fromHash": "bbcc9c212ca65be988fb4e7b451bf90018b2e471f81c99bb285a4f090ec468c1",
+    "toHash": "8b2146b4b101b25cc92847fef08760d635ba0a3be56dd7aa2802b7b63852f18f"
+  },
+  {
+    "from": "ctl.prepare()",
+    "to": "globalThis.__afbMethod('rest_prepare',ctl,'prepare')()",
+    "count": 1,
+    "fromHash": "24b7485a8b50ba5d29ce2d34af58c10a166910061c460cd3907faa14b4f53a42",
+    "toHash": "ac805c3f74f59a18f1b38377e4307314f3b05e46aa259166e7732c1ab576b2b6"
+  },
+  {
+    "from": "proof=finiteProofFixture(",
+    "to": "proof=globalThis.__afbWrap('rest_proof',finiteProofFixture)(",
+    "count": 1,
+    "fromHash": "7de15b9b29e407fed5f4d4e69ef3bbd4fe04127aafbe32a258d2598fc3248163",
+    "toHash": "7cf7cffc2e9adb3a9a796223e0e9853d302b0f0c0fa253baee206443c270da41"
+  },
+  {
+    "from": "await store.capture(",
+    "to": "await globalThis.__afbMethod('rest_capture',store,'capture')(",
+    "count": 1,
+    "fromHash": "3d5600443aa99e6356e109ccdd5538e6911247c418b05fa4769f7adaa3b15f26",
+    "toHash": "e859515656a0b75e2d36a29f41adae0a3ba089d0b2cca6a4706f177182207460"
+  },
+  {
+    "from": "await store.read()",
+    "to": "await globalThis.__afbMethod('rest_read',store,'read')()",
+    "count": 2,
+    "fromHash": "1ebf1311d2054edbc2cb7055f15281e66703371e4111dd7a6ea2aa177fdc347f",
+    "toHash": "57444be5bb7788b9e74824528289889172969f0eb559c8d9a62fffa8808f6600"
+  },
+  {
+    "from": "await ctl.claimEffect(",
+    "to": "await globalThis.__afbMethod('rest_claim',ctl,'claimEffect')(",
+    "count": 1,
+    "fromHash": "e61ad1a9913415edf8f94607ad1d6f330b0c41e34ea7d4a834357039940db020",
+    "toHash": "e7944b75fe97f1cd11f5efa29792c8c779761f5aba7622d338add004c8f5f4e5"
+  }
+]
+```
+
+### test/fixtures/qa-finite-trial.mjs
+
+Git blob original: 8297a9ae39fd4bdd228a2b1f64105683cb768203. SHA-256 original=e0dfebbad066f848997200a719de4958d91edc6c906a0523a75f63221149175f; overlay=9eaf5bd589408a9dde6ecd0263e2e0a763443b13a36c603b35c83ad5ad111d7a; normalización exacta=true.
+
+```json
+[
+  {
+    "from": "old=generationFixture()",
+    "to": "old=globalThis.__afbWrap('trial_generation',generationFixture)()",
+    "count": 1,
+    "fromHash": "ee377a72913e4dc9c886ce1c1c0f8f0adc7f4a1cf05a0c132e3562dfee96fd68",
+    "toHash": "6d7db2c9d4d52fff00b185a09d726dcea93af386b26f7f7c779a4414c5d3a258"
+  }
+]
+```
+
+### test/fixtures/finite-http-module.mjs
+
+Git blob original: cfbc564074d298cc333ddbb922ba7c19a96065fb. SHA-256 original=1de81a4238c5868590918b021ddd8071c1c90237982c8ea8cfdb83f01dbc7233; overlay=26e74ffb21986e628093fae1e8efbf276514c7344becacfafb0496e41a643538; normalización exacta=true.
+
+```json
+[
+  {
+    "from": "await build(",
+    "to": "await globalThis.__afbWrap('http_build',build)(",
+    "count": 2,
+    "fromHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
+    "toHash": "d86f32c987c1bb2ef33a0e8fbdf0174ba60d5ff35e32a7851680b23a95917c80"
+  },
+  {
+    "from": "return import(",
+    "to": "return globalThis.__afbWrap('http_import',specifier=>import(specifier))(",
+    "count": 2,
+    "fromHash": "3e2b23e761707ac8785e5eb2c7492e98949f5b624aac6b2e9579288889dd0c4a",
+    "toHash": "9db87377950d90b7c6b9dd05214d7ed6fe84dd5a57b30ce691852eda0d80a8b8"
+  }
+]
+```
+
+## Workflow y custodia futura
+
+workflow_dispatch sin inputs, un job con literal false más gates de repositorio/rama/evento/attempt 1; Ubuntu 24.04, Node 22.23.4, permisos contents:read/actions:read, sin environment/secrets, concurrency cancel-in-progress=false. Checkout workflow=github.workflow_sha separado del sujeto f5 con historia completa; credenciales persistentes false. Sin matriz, schedule, push, dispatch propio ni retry.
+
+Sólo después de nueva liberación Root: npm ci --ignore-scripts --no-audit --no-fund sobre lock f5; timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-failure-boundaries.mjs. El hijo tiene 110s+SIGKILL a 5s y grupo de procesos; el job limita siete minutos. Son límites codificados todavía sin prueba temporal. El helper verifica plataforma/version, fuente/rama/evento/attempt, árbol, los 3188 blobs/modos antes y después; las copias temporales cloud no alteran el sujeto.
+
+El hijo recibe PATH, HOME/TMPDIR privados, LANG y los valores sintéticos AFB_CHILD/AFB_SUBJECT/GITHUB_SHA=f5; no hereda tokens, proveedor ni contexto real de GitHub. MODELED_STERILE_SYNTHETIC nunca concede autoridad. Fetch/sockets/http/https/tls están cerrados como en ORD-1; las peticiones de fixtures se resuelven por mocks fijos. No se prueba ninguna API real, Miniflare 900s, clave, permiso, runtime o Max.
+
+Captura por streams, archivos nuevos 0600 en directorio privado 0700, límite TOTAL stdout+stderr de 8 MiB. Sólo salida del reporter cerrado se admite como evidencia y se reconstruye con esquema/enums fijos; stdout seguro limitado a 64 KiB. Nunca se imprimen errores privados ni se suben logs, bundle o directorio temporal. El resultado se conserva inicialmente y antes del hijo; error/setup/deadline deja incomplete o running_or_interrupted, sin ocultar el fallo. Si ocurre un SIGKILL fuera del manejador sólo se garantiza el recibo cerrado previamente escrito; no se afirma captura final de un proceso matado.
+
+El workflow tiene fallback always(), limita result.json a 65536 bytes, vuelve a calcular manifest.json y sólo sube esos dos nombres durante siete días. Artefacto previsto afw-failure-boundaries-RUN-1; publica ID exacto+digest, sin URL firmada. Aún no existe run/artifact/ID/digest. Lectura independiente futura: metadata por ID dentro de presupuesto medido 2s y ZIP seguro <=256 KiB en RAM dentro de 5s si la herramienta lo permite; no descomprimir/ejecutar/instalar. La herramienta puede no imponer esos plazos: Root debe registrar enforced frente a measured y declarar incompleto ante falta de lectura. No es una cualificación de custodia ya realizada.
+
+## Verificación de preparación y cierre remoto
+
+Realizado: SourceTextModule analizó helper y siete overlays y el inline de fallback, sin evaluate/link/import del proyecto. PyYAML 6.0.3 ya disponible analizó el workflow y comprobó un job/literal false/manual sin inputs/read-only/attempt 1/siete minutos/sin environment o secrets/un upload. No se instalaron herramientas ni dependencias; no se creó proyecto, clon, proceso persistente o test local. Un payload RAM mayor de 64000 bytes fue rechazado automáticamente antes de ejecutar; se dividió en siete análisis pequeños, todos aceptados. Un fetch inicial de un nombre de workflow incorrecto devolvió 404; se consultó el directorio fijado y se leyó la referencia correcta; ninguna mutación afectada.
+
+La comprobación Actions por rama exacta devolvió total_count=0 antes de escribir. CI existente sólo hace push a main o pull_request; no se abre PR, y el commit de preparación incluye [skip ci]. El nuevo workflow es sólo manual/inactivo. No se despacha workflow ni se habilita ninguna ejecución durante preparación.
+
+Publicación preparada en Git Data: crear árbol con base exacta 7bc8b997a968dca32fc567b627de70b774d6489c y sólo las tres nuevas rutas; crear un commit con único padre f5; mover sólo diag/afw-failure-boundaries-20261112 mediante expected_sha=f5 y force=false. Ante rechazo CAS, no reintentar sin inspeccionar el ref. Corrección acotada posterior al primer commit preparado 421febef4da38ffefeab00cd6ec9a838ce3c7f00: los controles de identidad usaban inicialmente la etapa rest_control y podían aparentar una frontera de fixture no alcanzada. Se reemplazaron por etapa nula descartada antes de emitir; sólo queda el recibo identity_control. Se repitió la gramática estática y el commit corrector es fast-forward con padre 421febef, expected_sha exacto y force=false; todas las comprobaciones finales se repiten. No se ejecutaron controles o tests. El material de reversión son los 3188 blobs inmutables/base f5; esta entrega no autoriza reset/force/delete ni activar el job.
+
+Criterio externo de entrega: readback independiente de ref, commit/padre, árbol completo no truncado (3191 blobs), los 3188 tuples path/mode/sha originales intactos y exactamente tres altas; lectura completa de los tres blobs y comparación byte por byte+hashes; nueva consulta de runs exacta cero. Los SHA reales del commit/árbol/informe y los resultados de estas comprobaciones quedan en el contrato externo posterior a este contenido. STOP_WRITES al concluir ese contrato, sin commits autorreferenciales.
+
+Pendiente: revisión fresca Spec+Quality por Root; controles reales Node/selección/conteos/hashes/preservación/deadlines/artefacto; liberación explícita separada para un único job attempt 1, fuera de toda ventana nativa sensible. Si la frontera no resuelve causa, queda desconocida. No se arregló producto, cambió pin ni cualificó disponibilidad/paquete/PC apagado.
diff --git a/scripts/diagnostics/ordinary-failure-boundaries.mjs b/scripts/diagnostics/ordinary-failure-boundaries.mjs
new file mode 100644
index 0000000..67ac2f1
--- /dev/null
+++ b/scripts/diagnostics/ordinary-failure-boundaries.mjs
@@ -0,0 +1,353 @@
+// AFW fixed two-case diagnostic. Inactive preparation; no business authority.
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
+const BRANCH='refs/heads/diag/afw-failure-boundaries-20261112';
+const SELF=fileURLToPath(import.meta.url);
+const TESTS=["test/mcp-own-finite-entrypoints.test.mjs","test/mcp-qa-finite-adoption-wait.test.mjs"];
+const CASES=['compiled finite receiver denies legacy delivery before every host capability','actual CLI waits for attended observer until 50s after successful primary seed; GET only'];
+const PATTERN='^(?:'+CASES.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')$';
+const PINS={"test/mcp-own-finite-entrypoints.test.mjs":"674419ca51328b128bba483f44001e12f1e4b9f5","test/mcp-qa-finite-adoption-wait.test.mjs":"e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55","test/fixtures/finite-cf-http.mjs":"b0897d389ef3c1a0f057422ffc332e3e024d3a93","test/fixtures/finite-finalizer.mjs":"d3b254e9a21fc816ef6520bdff0f4abafe34f6ea","test/fixtures/finite-restoration.mjs":"ad53cfeca0b6c94b3e062bcb50e0a4644a667b31","test/fixtures/qa-finite-trial.mjs":"8297a9ae39fd4bdd228a2b1f64105683cb768203","test/fixtures/finite-http-module.mjs":"cfbc564074d298cc333ddbb922ba7c19a96065fb"};
+const EDITS={
+ "test/mcp-own-finite-entrypoints.test.mjs": [
+  [
+   "await build(",
+   "await globalThis.__afbWrap('own_build',build)(",
+   1
+  ],
+  [
+   "return import(",
+   "return globalThis.__afbWrap('own_import',specifier=>import(specifier))(",
+   1
+  ]
+ ],
+ "test/mcp-qa-finite-adoption-wait.test.mjs": [
+  [
+   "await cfFiniteFixture(",
+   "await globalThis.__afbWrap('cf_fixture',cfFiniteFixture)(",
+   1
+  ]
+ ],
+ "test/fixtures/finite-cf-http.mjs": [
+  [
+   "await finiteFinalizerFixture(",
+   "await globalThis.__afbWrap('cf_finalizer',finiteFinalizerFixture)(",
+   1
+  ]
+ ],
+ "test/fixtures/finite-finalizer.mjs": [
+  [
+   "await finiteRestorationFixture(",
+   "await globalThis.__afbWrap('final_restore',finiteRestorationFixture)(",
+   1
+  ],
+  [
+   "v=projectPrivateQaFiniteReferences(identity)",
+   "v=globalThis.__afbWrap('final_project',projectPrivateQaFiniteReferences)(identity)",
+   1
+  ]
+ ],
+ "test/fixtures/finite-restoration.mjs": [
+  [
+   "f=finiteFixture({at})",
+   "f=globalThis.__afbWrap('rest_init',finiteFixture)({at})",
+   1
+  ],
+  [
+   "ctl=controls.createPrivateQaFiniteTrialControl(f.options(controls))",
+   "ctl=globalThis.__afbMethod('rest_control',controls,'createPrivateQaFiniteTrialControl')(f.options(controls))",
+   1
+  ],
+  [
+   "ctl.prepare()",
+   "globalThis.__afbMethod('rest_prepare',ctl,'prepare')()",
+   1
+  ],
+  [
+   "proof=finiteProofFixture(",
+   "proof=globalThis.__afbWrap('rest_proof',finiteProofFixture)(",
+   1
+  ],
+  [
+   "await store.capture(",
+   "await globalThis.__afbMethod('rest_capture',store,'capture')(",
+   1
+  ],
+  [
+   "await store.read()",
+   "await globalThis.__afbMethod('rest_read',store,'read')()",
+   2
+  ],
+  [
+   "await ctl.claimEffect(",
+   "await globalThis.__afbMethod('rest_claim',ctl,'claimEffect')(",
+   1
+  ]
+ ],
+ "test/fixtures/qa-finite-trial.mjs": [
+  [
+   "old=generationFixture()",
+   "old=globalThis.__afbWrap('trial_generation',generationFixture)()",
+   1
+  ]
+ ],
+ "test/fixtures/finite-http-module.mjs": [
+  [
+   "await build(",
+   "await globalThis.__afbWrap('http_build',build)(",
+   2
+  ],
+  [
+   "return import(",
+   "return globalThis.__afbWrap('http_import',specifier=>import(specifier))(",
+   2
+  ]
+ ]
+};
+const PREFIX='AFB_SAFE_V1 ';
+const MAX_SAFE=65536,MAX_MESSAGE=1048576,MAX_RAW=8388608;
+const STAGES=['own_build','own_import','cf_fixture','cf_finalizer','final_restore','final_project','rest_init','rest_control','rest_prepare','rest_proof','rest_capture','rest_read','rest_claim','trial_generation','http_build','http_import'];
+const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
+const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','EvalError','URIError','AggregateError','AssertionError'];
+const INTRINSICS=[Error,TypeError,SyntaxError,ReferenceError,RangeError,EvalError,URIError,AggregateError];
+const PROTOS=INTRINSICS.map(x=>x.prototype);
+const CLASS_NAMES=NAMES.slice(0,8);
+const EXPECTED_HASHES=['9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff','a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e'];
+const flags={operationalReadiness:false,completePackage:false,PCoff:false};
+const hash=v=>createHash('sha256').update(v).digest('hex');
+const blob=v=>createHash('sha1').update('blob '+Buffer.byteLength(v)+'\0').update(v).digest('hex');
+const reject=()=>{throw Error('AFB diagnostic unavailable');};
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
+ const canary='AFB_PRIVATE_CANARY_NEVER_EMIT_20261112';
+ let touches=0;
+ const ordinary=new TypeError(canary),cross=runInNewContext('new TypeError("AFB_PRIVATE_CANARY_NEVER_EMIT_20261112")');
+ const spoof=Object.create(TypeError.prototype),guarded=new Error(canary);
+ for(const key of ['stack','code','name','cause',Symbol.toStringTag])Object.defineProperty(guarded,key,{get(){touches++;throw new Error('private getter');}});
+ const large=new Error('X'.repeat(MAX_MESSAGE+1)),cycle=new Error(canary);Object.defineProperty(cycle,'cause',{value:cycle});
+ const rows=[ordinary,cross,spoof,guarded,large,cycle].map(safeError),wire=JSON.stringify(rows);
+ const pass=touches===0&&!wire.includes(canary)&&rows[0][0].nativeError&&rows[0][0].currentRealmPrototype==='TypeError'&&rows[1][0].nativeError&&rows[1][0].currentRealmPrototype===null&&rows[1][0].observedDataPrototypeName==='TypeError'&&!rows[2][0].nativeError&&rows[2][0].prototypeDepth===null&&rows[3][0].name===null&&rows[4][0].messageHash===null&&rows[4][0].messageTooLarge&&rows[5].length===1;
+ return {pass,getterTouches:touches,ordinaryNative:rows[0][0].nativeError,crossRealmNative:rows[1][0].nativeError,crossRealmExactUnknown:rows[1][0].currentRealmPrototype===null,spoofRejected:!rows[2][0].nativeError,oversizeSuppressed:rows[4][0].messageTooLarge,cycleBounded:rows[5].length===1,rawCanaryAbsent:!wire.includes(canary)};
+}
+function closedControl(v){
+ return Object.fromEntries(['pass','ordinaryNative','crossRealmNative','crossRealmExactUnknown','spoofRejected','oversizeSuppressed','cycleBounded','rawCanaryAbsent'].map(k=>[k,own(v,k)===true]).concat([['getterTouches',number(own(v,'getterTouches'))]]));
+}
+function emit(value){try{const s=JSON.stringify(value);if(Buffer.byteLength(s)<=4096)process.stdout.write(PREFIX+s+'\n');}catch{}}
+function installChild(){
+ if(process.env.AFB_CHILD!=='FIXED_TWO_CASES'||process.env.AFB_SUBJECT!==SUBJECT)reject();
+ const note=(stage,phase,error)=>{
+  if(!STAGES.includes(stage))return;
+  try{emit({kind:'boundary',stage,phase});if(phase==='throw')emit({kind:'error',stage,errors:safeError(error)});}catch{}
+ };
+ const observe=(stage,fn,receiver,args)=>{
+  let result;note(stage,'enter');
+  try{result=Reflect.apply(fn,receiver,args);}catch(error){note(stage,'throw',error);throw error;}
+  try{if(types.isPromise(result))void Promise.prototype.then.call(result,()=>note(stage,'return'),error=>note(stage,'throw',error));else note(stage,'return');}catch{}
+  return result;
+ };
+ globalThis.__afbWrap=(stage,fn)=>function(...args){return observe(stage,fn,this,args);};
+ globalThis.__afbMethod=(stage,receiver,key)=>{const fn=receiver[key];return function(...args){return observe(stage,fn,receiver,args);};};
+ // Controls observe the original identity, including async return and error identity.
+ let methodTouches=0;const receiver={value:7,call(x){methodTouches++;if(this!==receiver)throw new Error('receiver');return x;}};
+ const identity={},p=Promise.resolve(identity),thrown=new TypeError('AFB_PRIVATE_CONTROL_THROW');
+ const returned=globalThis.__afbMethod(null,receiver,'call')(p);
+ let sameError=false;try{globalThis.__afbWrap(null,()=>{throw thrown;})();}catch(e){sameError=e===thrown;}
+ emit({kind:'identity_control',pass:returned===p&&sameError&&methodTouches===1,promiseIdentity:returned===p,errorIdentity:sameError,receiverIdentity:methodTouches===1});
+ const deny=()=>{emit({kind:'network_denied'});throw new Error('AFB network disabled');};
+ globalThis.fetch=deny;net.Socket.prototype.connect=deny;
+ net.default.connect=deny;net.default.createConnection=deny;tls.default.connect=deny;
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
+  }else if(kind==='error'&&STAGES.includes(stage)&&Array.isArray(own(v,'errors'))){
+   for(const e of v.errors.slice(0,4))addError(state,{stage,...closedError(e)});
+  }else if(kind==='privacy_control'&&state.privacyControls.length<4)state.privacyControls.push(closedControl(v));
+  else if(kind==='identity_control'&&state.identityControls.length<4)state.identityControls.push(Object.fromEntries(['pass','promiseIdentity','errorIdentity','receiverIdentity'].map(k=>[k,own(v,k)===true])));
+  else if(kind==='network_denied')state.networkDenied++;
+ }
+}
+function emptyEvidence(){return {purpose:'afw.failure-boundaries.reporter.v1',testEvents:{selectedPassed:0,selectedFailed:0,filteredSkipped:0,wrapperFailed:0,unexpected:0,registered:0},summary:{},boundaries:{},errors:{},errorOverflow:0,privacyControls:[],identityControls:[],networkDenied:0};}
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
+   if(type==='test:fail')for(const row of safeError(e))addError(state,{case:selected<0?'wrapper':selected===0?'own':'adoption',failureType:['subtestsFailed','testCodeFailure','cancelledByParent'].includes(ft)?ft:null,...row});
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
+ if(own(v,'purpose')!=='afw.failure-boundaries.reporter.v1')return null;
+ const state=emptyEvidence();state.errors=[];
+ for(const k of Object.keys(state.testEvents)){const n=number(own(own(v,'testEvents'),k));if(n===null)return null;state.testEvents[k]=n;}
+ for(const k of ['tests','pass','fail','cancelled','skipped','todo']){const n=number(own(own(v,'summary'),k));if(n!==null)state.summary[k]=n;}
+ for(const stage of STAGES)for(const phase of ['enter','return','throw']){const k=stage+':'+phase,n=number(own(own(v,'boundaries'),k));if(n!==null)state.boundaries[k]=n;}
+ const errors=own(v,'errors');if(!Array.isArray(errors)||errors.length>96)return null;
+ for(const e of errors){
+  const stage=own(e,'stage'),c=own(e,'case'),failureType=own(e,'failureType'),count=number(own(e,'count'));
+  if(count===null)return null;
+  state.errors.push({...STAGES.includes(stage)?{stage}:{case:['own','adoption','wrapper'].includes(c)?c:'wrapper',failureType:['subtestsFailed','testCodeFailure','cancelledByParent'].includes(failureType)?failureType:null},...closedError(e),count});
+ }
+ state.errorOverflow=number(own(v,'errorOverflow'));state.networkDenied=number(own(v,'networkDenied'));
+ for(const key of ['privacyControls','identityControls']){const rows=own(v,key);if(!Array.isArray(rows)||rows.length>4)return null;state[key]=rows.map(x=>key==='privacyControls'?closedControl(x):Object.fromEntries(['pass','promiseIdentity','errorIdentity','receiverIdentity'].map(k=>[k,own(x,k)===true])));}
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
+ const env={PATH:process.env.PATH,HOME:privateDir,TMPDIR:privateDir,LANG:'C.UTF-8',AFB_CHILD:'FIXED_TWO_CASES',AFB_SUBJECT:SUBJECT,GITHUB_SHA:SUBJECT};
+ const child=spawn(process.execPath,['--import',pathToFileURL(SELF).href,'--test','--test-name-pattern='+PATTERN,'--test-reporter='+pathToFileURL(SELF).href,...TESTS],{cwd,env,detached:true,stdio:['ignore','pipe','pipe']});
+ const terminate=why=>{if(reason)return;reason=why;try{process.kill(-child.pid,'SIGTERM');}catch{}killer=setTimeout(()=>{try{process.kill(-child.pid,'SIGKILL');}catch{}},5000);};
+ const parentStop=()=>terminate('parent_terminated');process.once('SIGTERM',parentStop);process.once('SIGINT',parentStop);
+ const deadline=setTimeout(()=>terminate('deadline_110s'),110000);
+ const pumps=[child.stdout,child.stderr].map(async(stream,i)=>{for await(const chunk of stream){if(sizes[0]+sizes[1]+chunk.length>MAX_RAW){terminate('raw_output_cap');continue;}sizes[i]+=chunk.length;digests[i].update(chunk);await handles[i].write(chunk);if(i===0&&sizes[0]<=MAX_SAFE)chunks.push(chunk);else if(i===0)terminate('safe_output_cap');}});
+ const exit=await new Promise(resolve=>{child.once('error',()=>resolve({code:null,signal:null,spawnFailed:true}));child.once('close',(code,signal)=>resolve({code,signal:['SIGTERM','SIGKILL'].includes(signal)?signal:null,spawnFailed:false}));});
+ await Promise.all(pumps);clearTimeout(deadline);clearTimeout(killer);process.removeListener('SIGTERM',parentStop);process.removeListener('SIGINT',parentStop);await Promise.all(handles.map(h=>h.close()));
+ let evidence=null;try{const bytes=Buffer.concat(chunks);if(bytes.length<=MAX_SAFE)evidence=sanitizeEvidence(JSON.parse(bytes.toString('utf8')));}catch{}
+ return {exit,termination:reason,evidence,rawFiles:['stdout','stderr'].map((name,i)=>({name:'raw.'+name,bytes:sizes[i],sha256:digests[i].digest('hex'),uploaded:false})),privateLogsUploaded:false};
+}
+async function preserve(output,report){
+ let text=JSON.stringify(report,null,2)+'\n';
+ if(Buffer.byteLength(text)>MAX_SAFE)text=JSON.stringify({purpose:'afw.failure-boundaries.diagnostic.v1',status:'safe_output_cap',...flags})+'\n';
+ await writeFile(join(output,'result.json'),text,{mode:0o600});
+ const manifest={purpose:'afw.failure-boundaries.manifest.v1',inventory:[{name:'result.json',bytes:Buffer.byteLength(text),sha256:hash(text)}],rawLogsUploaded:false,...flags};
+ await writeFile(join(output,'manifest.json'),JSON.stringify(manifest)+'\n',{mode:0o600});
+}
+async function main(){
+ if(process.argv.length!==2||process.platform!=='linux'||process.version!=='v22.23.4')reject();
+ if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||process.env.GITHUB_EVENT_NAME!=='workflow_dispatch'||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.AFB_WORKFLOW_SHA??''))reject();
+ const subject=resolve('subject'),runner=process.env.RUNNER_TEMP;
+ if(!runner||!isAbsolute(runner)||resolve(runner)===subject)reject();
+ const output=resolve('failure-boundaries-safe');await mkdir(output,{recursive:true,mode:0o700});
+ const context={repository:REPO,workflowRef:BRANCH,trigger:'workflow_dispatch',workflowSource:process.env.AFB_WORKFLOW_SHA,testSource:SUBJECT,runId:process.env.GITHUB_RUN_ID,attempt:1,node:process.version,os:'Ubuntu24.04',group:'UNSET',childContext:'MODELED_STERILE_SYNTHETIC',workflowContextIsAdmissionAuthority:false,...flags};
+ let report={purpose:'afw.failure-boundaries.diagnostic.v1',status:'incomplete',context,noRetry:true,...flags};
+ await preserve(output,report);
+ let before=null,leaves=null,parent=null,overlays=[];
+ try{
+  const helperRoot=dirname(dirname(dirname(SELF)));
+  if(git(helperRoot,['rev-parse','HEAD']).trim()!==context.workflowSource)reject();
+  if(git(subject,['rev-parse','HEAD']).trim()!==SUBJECT||git(subject,['status','--porcelain','--untracked-files=no']).trim()!=='')reject();
+  leaves=tuples(git(subject,['ls-tree','-rz','--full-tree','HEAD']));
+  if(leaves.length!==3188||leaves.find(x=>x.path==='package.json')?.sha!=='f4fd38ac380c46a149d8cf0f3bd828a28406f761'||leaves.find(x=>x.path==='package-lock.json')?.sha!=='36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b'||git(subject,['rev-parse','HEAD^{tree}']).trim()!=='7bc8b997a968dca32fc567b627de70b774d6489c')reject();
+  before=await inventory(subject,leaves);
+  parent=join(resolve(runner),'afb-'+context.runId);await mkdir(parent,{recursive:false,mode:0o700});
+  const overlay=join(parent,'overlay');await mkdir(overlay,{mode:0o700});
+  for(const leaf of leaves){const dest=join(overlay,leaf.path);await mkdir(dirname(dest),{recursive:true});await copyFile(join(subject,leaf.path),dest);await chmod(dest,leaf.mode==='100755'?0o700:0o600);}
+  await symlink(join(subject,'node_modules'),join(overlay,'node_modules'),'dir');
+  for(const path of Object.keys(EDITS)){
+   const original=await readFile(join(subject,path),'utf8');if(blob(original)!==PINS[path])reject();
+   const edited=applyEdits(original,EDITS[path]);await writeFile(join(overlay,path),edited.text,{mode:0o600});
+   overlays.push({path,originalBlob:PINS[path],originalHash:hash(original),newHash:hash(edited.text),normalized:true,seams:edited.edits.map(x=>({originalLiteralHash:hash(x.from),newLiteralHash:hash(x.to),count:x.count}))});
+  }
+  report={...report,status:'running_or_interrupted',protectedBase:{leaves:leaves.length,before},overlays,privacy:controls(),helperHash:hash(await readFile(SELF)),selection:{files:TESTS,namePattern:PATTERN,expectedRegistered:22,expectedSelectedFailures:2,expectedFilteredSkips:20}};
+  await preserve(output,report);
+  const execution=await runChild(overlay,parent),e=execution.evidence,after=await inventory(subject,leaves);
+  const hashes=EXPECTED_HASHES.map(h=>e?.errors.some(x=>x.messageHash===h)===true);
+  const counts=e?.testEvents,countsMatch=counts?.registered===22&&counts.selectedFailed===2&&counts.selectedPassed===0&&counts.filteredSkipped===20&&counts.wrapperFailed===0&&counts.unexpected===0;
+  const hasSites=['own_build:enter','own_import:throw','cf_fixture:throw','trial_generation:enter'].every(k=>(e?.boundaries[k]??0)>0);
+  const complete=execution.termination===null&&execution.exit.spawnFailed===false&&execution.exit.code===1&&e?.purpose==='afw.failure-boundaries.reporter.v1'&&e.errorOverflow===0&&e.networkDenied===0&&countsMatch&&hasSites&&hashes.every(Boolean)&&e.privacyControls.length===2&&e.privacyControls.every(x=>x.pass)&&e.identityControls.length===2&&e.identityControls.every(x=>x.pass)&&report.privacy.pass&&before===after;
+  report={...report,status:complete?'diagnostic_complete':'incomplete',protectedBase:{leaves:leaves.length,before,after,equal:before===after},execution,selectionCountsMatch:countsMatch,representativeHashesMatch:hashes,causalConclusion:'DEFERRED_TO_ROOT_BOUNDARY_REVIEW',allRemainingFailuresFixed:false,noRetry:true};
+ }catch(error){report={...report,status:'incomplete',preparationError:safeError(error)};}
+ finally{
+  if(before&&leaves){try{const after=await inventory(subject,leaves);report.protectedBase={leaves:leaves.length,before,after,equal:before===after};if(before!==after)report.status='incomplete';}catch{report.status='incomplete';report.protectedBase={leaves:leaves.length,before,after:null,equal:false};}}
+  await preserve(output,report);
+ }
+ process.exitCode=report.status==='diagnostic_complete'?0:1;
+}
+if(process.env.AFB_CHILD&&process.env.NODE_TEST_CONTEXT==='child-v8')installChild();
+if(process.argv[1]&&resolve(process.argv[1])===SELF){try{await main();}catch{process.stderr.write('AFB diagnostic admission or preservation blocked.\n');process.exitCode=1;}}
```
