# ORD-1 inactive preparation — full task review package

Repository tokenizartinfo-ops/agent-friendly-web; BASE f5f52660d19ec9fc634bbc49558db75582fdaf88; HEAD f143b866840a6d862ad63c4691c0700fa03b14e5; tree74dd2255bbe224c199b7ed23fce26fe915177cf0. Complete two-commit range; exact3adds,3188base blobs/modes unchanged,3191final. No jobs/runs. Context U10: entire added files, no omitted hunks.

## Commits

1935584b2e7b188b29151d8a4d2903aa147c85d9 diag: prepare inactive ORD-1 two-arm synthetic diagnostic
f143b866840a6d862ad63c4691c0700fa03b14e5 docs: preserve inactive ORD-1 tree and zero-run receipt

## Stat

.github/workflows/afw-ordinary-fourfile-diagnostic.yml | +132 -0
docs/superpowers/reports/2026-11-12-ordinary-fourfile-diagnostic.es.md | +249 -0
scripts/diagnostics/ordinary-fourfile.mjs | +276 -0

## Complete diff

```diff
diff --git a/.github/workflows/afw-ordinary-fourfile-diagnostic.yml b/.github/workflows/afw-ordinary-fourfile-diagnostic.yml
new file mode 100644
index 0000000..0f004c7
--- /dev/null
+++ b/.github/workflows/afw-ordinary-fourfile-diagnostic.yml
@@ -0,0 +1,132 @@
+name: AFW ordinary four-file diagnostic (INACTIVE)
+# PREPARATION ONLY. Both jobs fail closed behind literal false.
+# No input can choose a subject, target, compiler, credential, or pin.
+on:
+  workflow_dispatch:
+permissions:
+  contents: read
+  actions: read
+concurrency:
+  group: afw-ord1-${{ github.ref }}-${{ github.run_id }}
+  cancel-in-progress: false
+jobs:
+  arm_a:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/diag/afw-ordinary-fourfile-20261112' && github.event_name == 'workflow_dispatch' && github.run_attempt == '1' }}
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
+      - name: Checkout separate immutable subject with full history
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
+      - name: Install existing subject lock without lifecycle scripts
+        working-directory: subject
+        run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: One fixed synthetic arm A
+        env:
+          ORD1_WORKFLOW_SHA: ${{ github.workflow_sha }}
+        run: timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-fourfile.mjs A
+      - name: Preserve a safe receipt even when setup or deadline failed
+        if: ${{ always() }}
+        shell: bash
+        run: |
+          mkdir -p ord1-safe-A
+          if [ ! -f ord1-safe-A/result.json ]; then
+            printf '%s\n' '{"purpose":"afw.ordinary-fourfile.diagnostic.v1","status":"setup_or_deadline_incomplete","arm":"A","operationalReadiness":false,"completePackage":false,"PCoff":false}' > ord1-safe-A/result.json
+          fi
+      - name: Preserve only closed safe JSON files for seven days
+        if: ${{ always() }}
+        id: safe_artifact
+        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02
+        with:
+          name: afw-ord1-A-${{ github.run_id }}-${{ github.run_attempt }}
+          path: |
+            ord1-safe-A/result.json
+            ord1-safe-A/manifest.json
+          retention-days: 7
+          if-no-files-found: error
+      - name: Publish exact artifact inventory for independent readback
+        if: ${{ always() && steps.safe_artifact.outcome == 'success' }}
+        env:
+          ARTIFACT_ID: ${{ steps.safe_artifact.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ steps.safe_artifact.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          [[ "$ARTIFACT_ID" =~ ^[1-9][0-9]*$ ]]
+          [[ "$ARTIFACT_DIGEST" =~ ^[a-f0-9]{64}$ ]]
+          printf 'ORD1 artifact A: id=%s sha256=%s retention-days=7\n' "$ARTIFACT_ID" "$ARTIFACT_DIGEST"
+  arm_b:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/diag/afw-ordinary-fourfile-20261112' && github.event_name == 'workflow_dispatch' && github.run_attempt == '1' }}
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
+      - name: Checkout separate immutable subject with full history
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
+      - name: Install existing subject lock without lifecycle scripts
+        working-directory: subject
+        run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: One fixed synthetic arm B
+        env:
+          ORD1_WORKFLOW_SHA: ${{ github.workflow_sha }}
+        run: timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-fourfile.mjs B
+      - name: Preserve a safe receipt even when setup or deadline failed
+        if: ${{ always() }}
+        shell: bash
+        run: |
+          mkdir -p ord1-safe-B
+          if [ ! -f ord1-safe-B/result.json ]; then
+            printf '%s\n' '{"purpose":"afw.ordinary-fourfile.diagnostic.v1","status":"setup_or_deadline_incomplete","arm":"B","operationalReadiness":false,"completePackage":false,"PCoff":false}' > ord1-safe-B/result.json
+          fi
+      - name: Preserve only closed safe JSON files for seven days
+        if: ${{ always() }}
+        id: safe_artifact
+        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02
+        with:
+          name: afw-ord1-B-${{ github.run_id }}-${{ github.run_attempt }}
+          path: |
+            ord1-safe-B/result.json
+            ord1-safe-B/manifest.json
+          retention-days: 7
+          if-no-files-found: error
+      - name: Publish exact artifact inventory for independent readback
+        if: ${{ always() && steps.safe_artifact.outcome == 'success' }}
+        env:
+          ARTIFACT_ID: ${{ steps.safe_artifact.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ steps.safe_artifact.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          [[ "$ARTIFACT_ID" =~ ^[1-9][0-9]*$ ]]
+          [[ "$ARTIFACT_DIGEST" =~ ^[a-f0-9]{64}$ ]]
+          printf 'ORD1 artifact B: id=%s sha256=%s retention-days=7\n' "$ARTIFACT_ID" "$ARTIFACT_DIGEST"
diff --git a/docs/superpowers/reports/2026-11-12-ordinary-fourfile-diagnostic.es.md b/docs/superpowers/reports/2026-11-12-ordinary-fourfile-diagnostic.es.md
new file mode 100644
index 0000000..21d6d7e
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-12-ordinary-fourfile-diagnostic.es.md
@@ -0,0 +1,249 @@
+# ORD-1 — preparación inactiva del diagnóstico acotado
+
+Estado: PREPARADO PARA REVISIÓN, NO EJECUTADO. `operationalReadiness=false; completePackage=false; PCoff=false`. ORD-1 sigue abierto.
+
+## Alcance y autorización
+
+PROJECT AFW; repositorio público tokenizartinfo-ops/agent-friendly-web (1347578006); ORIGIN GitHub connector. Único destino de escritura: `diag/afw-ordinary-fourfile-20261112`, verificado inicialmente en `f5f52660d19ec9fc634bbc49558db75582fdaf88`. Base real: árbol `7bc8b997a968dca32fc567b627de70b774d6489c`, 3188 blobs, todos modo 100644. Tres altas permitidas: este informe, `scripts/diagnostics/ordinary-fourfile.mjs` y `.github/workflows/afw-ordinary-fourfile-diagnostic.yml`. No Source/Rootdocs/main, mutación de producto, jobs, builds, tests, instalación, checkout local ni acceso a credenciales/proveedor.
+
+Requisitos leídos en Rootdocs `d84c035223926dfd44bb6f5cce7d18c943739867`: brief `2ac83df3cb4d4c3ac3fb2afe28f5b12fc32212d0`, spec `9e2c7e426f4ce3caa62565193c40cf733d04e8ac`, plan `961453320d9c33a53830901d4f8a2319d9179570`; preflight preservado `5b2610ea434580e7cde8f283b4443fb5ffa08c9b`. A/B histórico: 109 tests, 73 pass, 36 fail y 40 eventos de fallo, incluidos cuatro wrappers. No prueba main/producción.
+
+Ruling de ejecución: el brief prohíbe ejecutar pruebas y crear otros archivos o reviewers durante esta preparación. Por ello las instrucciones genéricas de TDD/worktree/ledger se subordinan a ese límite; este archivo es el registro durable permitido. Root encarga la revisión fresca separada. No se interpreta la preparación como aprobación para activar.
+
+## Harness y diferencia causal
+
+Dos checkouts futuros separados: código del diagnóstico en el SHA real del workflow; subject limpio en f5 con historia completa. El helper verifica HEAD, 3188 blobs, contenido/modos antes y después, paquete `f4fd38ac380c46a149d8cf0f3bd828a28406f761` y lock `36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b`. Copia los blobs a overlay privado del runner y enlaza solamente node_modules del subject. Ningún archivo fuente original se modifica. Cinco overlays de test/fixture, y marcadores del entry exclusivamente en la carga de esbuild. Normalización inversa exacta, conteos de ocurrencia y hashes registrados.
+
+A conserva el comportamiento existente; los observadores devuelven la misma Promise/valor, receiver, argumentos y objeto de error, mediante ramas de observación, sin reemplazar relojes. Las lecturas de performance de negocio no se compensan. La instrumentación tiene un costo temporal inevitable que debe considerarse al interpretar el baseline.
+
+B es idéntico salvo el retorno del onLoad de `mcp-qa-native-wrapper-pin.mjs` en el build YA existente del VM sintético de `mcp-qa-cloud-native-cli.test.mjs:77`. A entrega el texto original del pin; B entrega los bytes/hash del artefacto construido por el helper real. El validator real no cambia. El pin en disco, su blob `075a52bf0fb8fa649520f17fa15eacc9b4738222` y su autoridad productiva permanecen intactos. B es una entrada MODELED dentro del VM, nunca una autorización de producción. No se copió un algoritmo de negocio.
+
+Seams:
+- own entrypoints :7/:8: build e importación, una ocurrencia cada uno.
+- native CLI :11: builder real; :28: bytes/hash; :77: build/plugin; :88: callback de marcadores del VM; :63: invocación efectiva del controller; :89: conteos numéricos de salida. Ocho ediciones, una ocurrencia cada una.
+- adoption :13: fixture, una ocurrencia; finite-command :37 y :58: fixture, dos ocurrencias.
+- finite-http-module :7/:37 y :8/:38: build/import, dos ocurrencias por seam.
+- entry real qa-cloud-native-observation :15/:21/:22/:29: artifact_load/controller/settlement y catch externo, una ocurrencia cada uno. Sólo agrega marcadores al texto que esbuild carga; el archivo no se sobreescribe.
+
+El helper usa `NODE_TEST_CONTEXT=child-v8` de los procesos aislados de Node 22 para instalar observadores; no emite marcadores de preload en el coordinador o reporter. Si ese contexto o los contadores del reporter no están disponibles, falla la completitud y el resultado queda inconcluso. Esto aún requiere ejecución cloud.
+
+## Comandos previstos y resultados falsables
+
+NO EJECUTADOS:
+```text
+npm ci --ignore-scripts --no-audit --no-fund
+timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-fourfile.mjs A
+timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-fourfile.mjs B
+```
+
+Cada brazo invoca una sola vez `node --import <helper> --test --test-reporter=<helper>` para los cuatro archivos fijados en el código. Node 22.23.4, Ubuntu 24.04, grupo UNSET. El proceso de pruebas recibe un entorno estéril y explícito; el SHA hijo f5 se etiqueta MODELED_STERILE_SYNTHETIC. SHA/ref/trigger reales del workflow se registran por separado. No se heredan tokens ni se presentan variables modeladas como admisión real. Diferencias de entorno con el A/B anterior no se ocultan ni se ajustan para forzar el baseline.
+
+A debe reproducir 109/73/36 para sustentar una conclusión causal; de lo contrario, Root debe clasificar inconcluso y explicar la diferencia. Si los bytes/hash actuales difieren del pin y B recupera únicamente los 12 casos nativos previstos, con controller counts restaurados y persistencia intacta, apoyaría la hipótesis: 36→24 fallos, manteniendo los 24 de own/adoption/command sin reparación. Si el pin ya coincide, se registra igualdad y no se fabrica una discrepancia. Sin recuperación específica, la hipótesis se rechaza o queda inconclusa. Ningún resultado autoriza un patch automático.
+
+Las familias own (2) y adoption/command (22) siguen sin causa establecida. Los marcadores build/import/fixture y hashes de mensajes deben localizar la frontera, sin atribuir de antemano el defecto a producción o a tests.
+
+## Privacidad, plazos y preservación
+
+El reporter sólo exporta enums fijos, posiciones de los cuatro archivos, contadores, bytes/hash públicos del artefacto y hashes de mensajes de hasta 1 MiB. Mensajes mayores: null + tooLarge. No lee stack, actual/expected, títulos, cuerpos, env, cabeceras, bundles ni URLs data. No hay regex sobre data URLs. Causas se recorren a profundidad cuatro mediante descriptores de datos; los nombres/códigos se cierran por allowlist. Errores agrupados se limitan a 64, privacidad a 16 controles, JSON seguro a 64 KiB. No se publican objetos arbitrarios de stdout.
+
+Control futuro dentro del harness: canary fijo que sólo se hashea; getter de stack/code que contabiliza cualquier lectura; mensaje de más de 1 MiB que debe suprimirse. Todavía NO ejecutado. Fence explícito de fetch/socket/TLS/HTTP impide llamadas de negocio; cualquier intento vuelve incompleto el diagnóstico y se cuenta, sin registrar destino. El compilador sigue siendo esbuild del lock.
+
+Cada child tiene plazo interno conservador de 110 s, SIGTERM al grupo propio y SIGKILL +5 s; el comando completo tiene timeout 120 s/+5 s y cada job máximo siete minutos. Sin retry. El SIGTERM del padre también termina su grupo hijo. Logs privados del runner: máximo 8 MiB por stream, modo 0600; hashes corresponden sólo a bytes capturados si se alcanza el cap. Nunca se suben. Antes de arrancar las pruebas se conserva un recibo running_or_interrupted; al terminar se sustituye por evidencia segura. El workflow conserva un recibo fijo si setup/deadline impidieron generar resultado.
+
+Sólo result.json y manifest.json se suben, siete días, un artefacto por brazo. La salida del action expone ID exacto y digest SHA256 para inventario independiente. Root debe verificar después el run/attempt/head, exactamente dos IDs/nombres, hash/bytes y manifiesto por esos IDs (no latest ni búsqueda por nombre ambiguo), con GET de metadatos acotado a 2 s y recuperación acotada a 5 s; si no llega, preservar incompleto y parar, sin retry automático. El helper no adquiere credenciales para recuperarlos. Aún no hay IDs, run ni artefactos de esta rama.
+
+## Workflow inactivo y delta de activación propuesto
+
+Sólo workflow_dispatch, sin inputs, push ni schedule. Ambos jobs tienen literal false y guards exactos de repositorio/rama/evento/attempt 1; permissions contents:read y actions:read; cancel-in-progress:false. Checkouts con persist-credentials:false; no environment ni secret env. Los tokens internos del checkout de GitHub no se pasan al proceso de pruebas.
+
+No activar durante la cualificación nativa de Source. Root debe revisar esta candidata y emitir release separado antes de cualquier ejecución. Si el workflow nuevo no es despachable por no estar en default, eso no requiere tocar main/UI: propuesta posterior (NO aplicada) es añadir push exclusivamente de esta rama y este único path de workflow; en los dos guards quitar false y exigir event_name == 'push'. El helper admite ese trigger futuro en la rama fijada, pero este YAML sólo admite manual y los dos false siguen cerrados. Delta de activación: un bloque de trigger fijo + dos guards. No entradas arbitrarias ni cambio del subject. Después de UN experimento, desactivar los dos guards de nuevo; no repetir, renovar ni reparar a partir del resultado.
+
+Rollback de preparación: dejar los false intactos y no activar. No reset, force, delete, merge, deploy ni mutación de datos. Evidencia y commits se conservan.
+
+## Verificación efectuada y límites
+
+- Conteos y normalización inversa de seis textos comprobados en RAM como metadatos contra fuentes inmutables.
+- Sintaxis del cuerpo del helper y de seis overlays: compilación de gramática por node:vm sin evaluación; imports se retiraron únicamente para ese chequeo y se inspeccionaron aparte. No es un test de carga ESM, build, reporter ni runtime.
+- YAML parseado con PyYAML existente (BaseLoader): único trigger workflow_dispatch, exactamente arm_a/arm_b y dos if:false. Sin instalar herramientas, sin archivos locales del proyecto.
+- Acorn/YAML Node no estaban disponibles; no se instalaron. Un intento de enviar metadatos juntos superó el límite de entrada de 64 KB del tool; se sustituyó por chequeos pequeños. No se ejecutó el proyecto en ninguno.
+- Hash helper SHA256 `8faf6d896ca1b935ebbd6f443349bd088a27b068884d8e61330e87898dd09cc1`, 23215 bytes; workflow SHA256 `9a39e865c6af0065c04769b7692c7f97cf39752375a50a887b18cceebe555c12`.
+- Actions API de esta rama devolvió total_count:0 antes de publicar. Se repetirá readback tras publicación. No se ha despachado ningún job.
+
+Self-review: A/B tienen la misma instrumentación y fence; única sustitución causal es el pin MODELADO del VM. Origen del subject y del workflow separados, errores/logs filtrados, preservación y timeout cerrados, ninguna rama compartida mutada. Riesgos pendientes: compatibilidad real del reporter/preload Node 22, reproducción del baseline con entorno estéril/fence, disponibilidad del compilador tras ignore-scripts, plazos observados y revisión independiente. No hay afirmación de pase/readiness ni de PC apagada.
+
+## Hashes exactos de overlays y literales (metadatos, no ejecución)
+
+```json
+[
+  {
+    "path": "test/mcp-own-finite-entrypoints.test.mjs",
+    "originalHash": "fc7de7a7e5c5c641800e67d812f426a67d2e6d947df342eb5d06c26d772b36b5",
+    "newHash": "36154f10f85f191731f787a85fe28562f71da146289c79396353b7f50e0ca069",
+    "seams": [
+      {
+        "line": 7,
+        "count": 1,
+        "originalLiteralHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
+        "newLiteralHash": "b28198970bb9112a0bc3752414bec1260b0176403ee8c369cb475b490eb02038"
+      },
+      {
+        "line": 8,
+        "count": 1,
+        "originalLiteralHash": "3e2b23e761707ac8785e5eb2c7492e98949f5b624aac6b2e9579288889dd0c4a",
+        "newLiteralHash": "f85b08e509970f6f9ea8ec191a28ece847f2038f648935221c76d030a5ff4e30"
+      }
+    ]
+  },
+  {
+    "path": "test/mcp-qa-cloud-native-cli.test.mjs",
+    "originalHash": "76f5dd7f288709ba9e1b373663e89846eba6def0d1569a94020224e5a10b31d9",
+    "newHash": "8e0a50c998ce3c49e48c5a500857c69aaf895fbaf999ae193b69839b33eab567",
+    "seams": [
+      {
+        "line": 1,
+        "count": 1,
+        "originalLiteralHash": "839cf2655267094fdbf41ad83d7b89fa202606d6b1235454745934a1c6f2529f",
+        "newLiteralHash": "db8ccb35df4b12f1f4d8589edb981f0facc763103be66d9208c7cbc23db1ed2d"
+      },
+      {
+        "line": 11,
+        "count": 1,
+        "originalLiteralHash": "733ebbc0353601d5201830595b1609f1a3db8583d581a6ecfc222a6d9ac7ce52",
+        "newLiteralHash": "6ff80ef7b3cb76ae8f52c45a0d778770a1f6fc85f297d998ab0f7cfa3b97ff42"
+      },
+      {
+        "line": 28,
+        "count": 1,
+        "originalLiteralHash": "55a3b72a9a40cdc342a1e1fb89d40666a91b32a16b27f3533224102218980378",
+        "newLiteralHash": "6c3096db96f41b258eced84a4283fbf8df2a51396a4ef1223d584b5b0ceca28d"
+      },
+      {
+        "line": 77,
+        "count": 1,
+        "originalLiteralHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
+        "newLiteralHash": "754cb10500e4f34d9515b7b6181ef3bf12ab45b2aeea653c3440f95dfea8db93"
+      },
+      {
+        "line": 77,
+        "count": 1,
+        "originalLiteralHash": "af3ad73431537603595f401052d2d64c015d604d921f650a7da8a26280654cb4",
+        "newLiteralHash": "0aefd662a64fb6440c96be7e0fbbe902a986852d62abb96b1e053404405a3e63"
+      },
+      {
+        "line": 88,
+        "count": 1,
+        "originalLiteralHash": "6733bf223273e19e8bdcbaa28888e6c4032cf4591253d32bd9244f8a0778ff4b",
+        "newLiteralHash": "3ffd6dea638c17291aa8fa09e3b53313abd95e5b88c52540f3f676d8a144e589"
+      },
+      {
+        "line": 63,
+        "count": 1,
+        "originalLiteralHash": "1b06471f94631f564cf775fde5e251a39a07ba1100134ce105d403c081f7c54c",
+        "newLiteralHash": "e2740e86446f2ad536149e160ecdd49be5820a7084e31577c54c0f938e6fce47"
+      },
+      {
+        "line": 89,
+        "count": 1,
+        "originalLiteralHash": "d81af3321d3c0c5e187dc7177137f46f469eeb2cf86fa04136fa3cfb8b732133",
+        "newLiteralHash": "21f0f3b3bb6446eb5bf72e55b6ebed609bc514546646201b661e3728d07f525c"
+      }
+    ]
+  },
+  {
+    "path": "test/mcp-qa-finite-adoption-wait.test.mjs",
+    "originalHash": "d2ca0aa07bb989985d5262aeaf3c5964f20167da4b9c39a0b21975c9f1178226",
+    "newHash": "efdb7ed8ce672f1275cebe126182f186b6bb2e13a55ff2bc04fd91df349ba633",
+    "seams": [
+      {
+        "line": 13,
+        "count": 1,
+        "originalLiteralHash": "afee59eab4a21b0a272448eb4c9252dfda5ff713998094e1477c96ddeb0767ec",
+        "newLiteralHash": "23c705200cf9c957f02d1e905a805c2b3df878b0b460cd3d660e16166ff89e21"
+      }
+    ]
+  },
+  {
+    "path": "test/mcp-qa-finite-command.test.mjs",
+    "originalHash": "b1c27fc22776e54df805548f125ef9833abb50c68feb5a3cb83f90043f37fb22",
+    "newHash": "13f1cf867b5ba0dbc8043f6ae919a00e29c8df7d7697c2485eb9fcb4fb8ad2f9",
+    "seams": [
+      {
+        "line": 37,
+        "count": 2,
+        "originalLiteralHash": "afee59eab4a21b0a272448eb4c9252dfda5ff713998094e1477c96ddeb0767ec",
+        "newLiteralHash": "bcfc3b1c75aa8c6ec4d9a6eba22f83a5e92a3e4db10884e12932ff2e246e3831"
+      }
+    ]
+  },
+  {
+    "path": "test/fixtures/finite-http-module.mjs",
+    "originalHash": "1de81a4238c5868590918b021ddd8071c1c90237982c8ea8cfdb83f01dbc7233",
+    "newHash": "c30bcd081be8e7e2a1f5a55649b28e01caf2da38b4c59ea59817671e40565e36",
+    "seams": [
+      {
+        "line": 7,
+        "count": 2,
+        "originalLiteralHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
+        "newLiteralHash": "23cd09bb64518ca0fe87b1e02b3d52994993db6d7f1562943cc75ac05c4a631b"
+      },
+      {
+        "line": 8,
+        "count": 2,
+        "originalLiteralHash": "3e2b23e761707ac8785e5eb2c7492e98949f5b624aac6b2e9579288889dd0c4a",
+        "newLiteralHash": "d75190f4470655dfd6159b4a92db556f2c8d702ace933d89743858d3d51b14cb"
+      }
+    ]
+  },
+  {
+    "path": "scripts/qa-cloud-native-observation.mjs",
+    "originalHash": "011391848605867b437270e6c940b238c2b20df3907cda217276cfecd0f64d5f",
+    "newHash": "a9892370102f6047fa458eb9ba12a18dbbc2f52fa116123929442d94a0720fb3",
+    "seams": [
+      {
+        "line": 15,
+        "count": 1,
+        "originalLiteralHash": "ec4ee91fc30ccb30a4532352b4f9b58823e15fc8dcc262f69e92e043163daf58",
+        "newLiteralHash": "93f757051715e9a8e90674c18f8fd9f95b78efe5d1b7f669235329005806f7fa"
+      },
+      {
+        "line": 21,
+        "count": 1,
+        "originalLiteralHash": "87ae41da12f4b16487174e827b78eea7dd48d3debfb3f8b7e75994c6107bd62a",
+        "newLiteralHash": "a9831fa797f78bd5297d5fc13e6d7c45c3e96f99872962874c76d289997242ad"
+      },
+      {
+        "line": 22,
+        "count": 1,
+        "originalLiteralHash": "c1a95f26152451215c8bf41bee36e8cfd676614645d6f7fc733ec125090a375f",
+        "newLiteralHash": "19687d55f38ed4c09ea473548132504d48e9af9862a247c5c5865b2f440f2696"
+      },
+      {
+        "line": 29,
+        "count": 1,
+        "originalLiteralHash": "4c96069a903e2d72abec7016a686e46ac801e52a20b18be7b2739b25aeb34ee0",
+        "newLiteralHash": "e000561266ed504963c0cb5a47dbba143442c2cc08217cfa8493544e541dfefe"
+      }
+    ]
+  }
+]
+```
+
+Registro de publicación y árbol: se añadirá después del primer commit/readback, antes de STOP_WRITES. El hash de este mismo informe y el tip final se entregan externamente para evitar una autorreferencia imposible.
+
+
+## Recibo de preparación publicado / ledger final
+
+Primer commit: `1935584b2e7b188b29151d8a4d2903aa147c85d9`, padre exacto f5, árbol `dbe6d58d79146643110a48ff54c19b01b3ff278b`. Publicado por CAS expected=f5, force=false, y ref leído de nuevo en ese mismo SHA.
+
+Blobs C1 leídos por commit inmutable y contenido comparado:
+- workflow `0f004c70976f5e4e64c1e554c0ebfad8039b9921`;
+- helper `ffb470aff1e2f3d79a745e470e82a2384b88f295`;
+- informe inicial `6ca7120b056ec5dbf14019c4362d9fed1b55c7ae`.
+
+Árbol recursivo C1 no truncado: 3191 blobs = 3188 base protegidos + tres altas exactas; cero blob/modo base cambiados y ninguna eliminación. Tras publicar C1, Actions API de la rama volvió a devolver `total_count:0, workflow_runs:[]`.
+
+Este apéndice constituye un segundo commit documental sólo dentro del tercer path permitido. Workflow/helper quedan con los mismos blobs C1. Se comprobarán nuevamente ref, árbol completo, tres contenidos y cero runs; el tip/árbol/hash de este informe se entregan en el contrato externo a Root para evitar autorreferencia. No nuevas pruebas ni ejecuciones para redactarlo.
+
+Self-review final del autor: ninguna reparación de producto; A/B comparten seams y cambios de seguridad; los dos false permanecen; Source/test f5 y workflow real se distinguen; no hubo helpers/reviewer/subagentes ni contactos con el writer de Source. Root conserva la revisión independiente y decisión de ejecución. No se declara que el harness esté cualificado por esta inspección estática.
+
+**STOP_WRITES al cerrar el readback de este apéndice. Cero jobs despachados. Preparación terminada; ejecución y cualificación pendientes.**
diff --git a/scripts/diagnostics/ordinary-fourfile.mjs b/scripts/diagnostics/ordinary-fourfile.mjs
new file mode 100644
index 0000000..ffb470a
--- /dev/null
+++ b/scripts/diagnostics/ordinary-fourfile.mjs
@@ -0,0 +1,276 @@
+// ORD-1. Inert until a separately reviewed workflow release. No business authority.
+import {createHash} from 'node:crypto';
+import {readFile,writeFile,mkdir,lstat,copyFile,symlink,chmod,open} from 'node:fs/promises';
+import {spawn,spawnSync} from 'node:child_process';
+import {resolve,join,dirname,relative,isAbsolute} from 'node:path';
+import {fileURLToPath,pathToFileURL} from 'node:url';
+import * as net from 'node:net';
+import * as tls from 'node:tls';
+import * as http from 'node:http';
+import * as https from 'node:https';
+const SUBJECT='f5f52660d19ec9fc634bbc49558db75582fdaf88';
+const REPO='tokenizartinfo-ops/agent-friendly-web';
+const BRANCH='refs/heads/diag/afw-ordinary-fourfile-20261112';
+const SELF=fileURLToPath(import.meta.url);
+const TESTS=['test/mcp-own-finite-entrypoints.test.mjs','test/mcp-qa-cloud-native-cli.test.mjs','test/mcp-qa-finite-adoption-wait.test.mjs','test/mcp-qa-finite-command.test.mjs'];
+const HTTP_FIXTURE='test/fixtures/finite-http-module.mjs';
+const ENTRY='scripts/qa-cloud-native-observation.mjs',PIN='lib/mcp-qa-native-wrapper-pin.mjs';
+const PINS={"test/mcp-own-finite-entrypoints.test.mjs":"674419ca51328b128bba483f44001e12f1e4b9f5","test/mcp-qa-cloud-native-cli.test.mjs":"8446a0d92cf97375ba76bb14fe9404a6b7879e8d","test/mcp-qa-finite-adoption-wait.test.mjs":"e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55","test/mcp-qa-finite-command.test.mjs":"2f8eecbf8972ec6fd4ab2c9d2e8e37a8cb627e87","test/fixtures/finite-http-module.mjs":"cfbc564074d298cc333ddbb922ba7c19a96065fb","scripts/qa-cloud-native-observation.mjs":"db4de40f3bcccb5a992ed41de388b0a550d5d64c","lib/mcp-qa-native-wrapper-pin.mjs":"075a52bf0fb8fa649520f17fa15eacc9b4738222"};
+const PIN_SOURCE="// Exact source-only Actions receipt: run 41282383977, attempt 1.\n// Checkout 080b72daa29299c728093604075f9fc09e3653a4; wrapper bytes do not\n// contain sourceRevision or observation H (the context is a separate module).\nexport const QA_NATIVE_WRAPPER_PIN=Object.freeze({\n sha256:'5b06e2012d906269b6ad829f666d3d01fd197f6b4ea90f04bb6591dad4d18953',\n bytes:48388,\n});\n";
+const PIN_EXPECTED={bytes:48388,sha256:'5b06e2012d906269b6ad829f666d3d01fd197f6b4ea90f04bb6591dad4d18953'};
+const PREFIX='ORD1_SAFE_V1 ';
+const MAX_SAFE=65536,MAX_MESSAGE=1048576,MAX_RAW=8388608;
+const STAGES=['build','import','fixture','artifact_load','controller','settlement'];
+const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
+const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','AssertionError'];
+const hash=v=>createHash('sha256').update(v).digest('hex');
+const blob=v=>createHash('sha1').update('blob '+Buffer.byteLength(v)+'\0').update(v).digest('hex');
+const flags={operationalReadiness:false,completePackage:false,PCoff:false};
+const reject=()=>{throw Error('ORD-1 diagnostic unavailable');};
+const own=(v,k)=>{try{const d=Object.getOwnPropertyDescriptor(v,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};
+function safeError(error){
+ const out=[],seen=new Set();let e=error;
+ for(let i=0;i<4&&e&&typeof e==='object'&&!seen.has(e);i++){
+  seen.add(e);const m=own(e,'message'),c=own(e,'code'),n=own(e,'name');
+  let messageHash=null,messageTooLarge=false;
+  if(typeof m==='string'){
+   messageTooLarge=m.length>MAX_MESSAGE||Buffer.byteLength(m)>MAX_MESSAGE;
+   if(!messageTooLarge)messageHash=hash(m);
+  }
+  out.push({name:NAMES.includes(n)?n:null,code:CODES.includes(c)?c:null,messageHash,messageTooLarge});
+  e=own(e,'cause');
+ }
+ return out;
+}
+function controls(){
+ const canary='ORD1_PRIVATE_CANARY_NEVER_EMIT_20261112';
+ const e=new Error(canary);let touched=0;
+ Object.defineProperty(e,'stack',{get(){touched++;throw Error('unreadable');}});
+ Object.defineProperty(e,'code',{get(){touched++;throw Error('unreadable');}});
+ const small=safeError(e),large=safeError(new Error('X'.repeat(MAX_MESSAGE+1)));
+ const wire=JSON.stringify({small,large});
+ return {pass:touched===0&&!wire.includes(canary)&&small[0].messageHash===hash(canary)&&large[0].messageHash===null&&large[0].messageTooLarge===true,stackReads:touched,oversizeSuppressed:large[0].messageTooLarge};
+}
+function fixedLocation(v){
+ const f=own(v,'file'),line=own(v,'line'),column=own(v,'column');
+ if(typeof f!=='string'||f.length>256||f.startsWith('data:'))return null;
+ const norm=f.replaceAll('\\','/'),p=TESTS.find(x=>norm===x||norm.endsWith('/'+x));
+ return p&&Number.isSafeInteger(line)&&line>=1&&line<=10000&&Number.isSafeInteger(column)&&column>=0&&column<=10000?{file:p,line,column}:null;
+}
+function emit(value){try{const s=JSON.stringify(value);if(Buffer.byteLength(s)<=4096)process.stdout.write(PREFIX+s+'\n');}catch{}}
+function installChild(){
+ const arm=process.env.ORD1_CHILD_ARM;if(!['A','B'].includes(arm)||process.env.ORD1_SUBJECT!==SUBJECT)reject();
+ let seq=0;
+ const record=x=>emit({...x,seq:++seq});
+ const stage=(site,stage,phase='enter')=>{if(Number.isInteger(site)&&site>=0&&site<=4&&STAGES.includes(stage)&&['enter','return','throw'].includes(phase))record({kind:'boundary',site,stage,phase});};
+ // Observer side branches retain each original Promise/receiver/arguments/error.
+ globalThis.__ordCall=(site,stageName,fn)=>function(...args){
+  const note=(phase,error)=>{try{stage(site,stageName,phase);if(error)record({kind:'error',site,stage:stageName,errors:safeError(error)});}catch{}};
+  note('enter');let result;try{result=Reflect.apply(fn,this,args);}catch(error){note('throw',error);throw error;}
+  if(result instanceof Promise)void Promise.prototype.then.call(result,()=>note('return'),error=>note('throw',error));
+  else note('return');return result;
+ };
+ const originalEntryEdits=[
+  ["entryStage='artifact_load';","entryStage='artifact_load';globalThis.__ordVM?.('artifact_load','enter');",1],
+  ["entryStage='controller';","entryStage='controller';globalThis.__ordVM?.('controller','enter');",1],
+  ["entryStage='settlement';","entryStage='settlement';globalThis.__ordVM?.('settlement','enter');",1],
+  ["}catch{\n const blocked=","}catch{\n globalThis.__ordVM?.(entryStage,'throw');\n const blocked=",1]
+ ];
+ globalThis.__ord=Object.freeze({
+  stage,
+  artifact(a){record({kind:'artifact',bytes:a.bytes,sha256:a.sha256,bytesEqual:a.bytes===PIN_EXPECTED.bytes,hashEqual:a.sha256===PIN_EXPECTED.sha256});},
+  pinSource(a){
+   if(!Number.isSafeInteger(a.bytes)||a.bytes<1||a.bytes>131072||typeof a.sha256!=='string'||!/^[a-f0-9]{64}$/.test(a.sha256))reject();
+   const source=arm==='A'?PIN_SOURCE:"export const QA_NATIVE_WRAPPER_PIN=Object.freeze("+JSON.stringify({sha256:a.sha256,bytes:a.bytes})+");\n";
+   record({kind:'pin_model',arm,sourceHash:hash(source),productionPinUnchanged:true,modeled:arm==='B'});
+   return source;
+  },
+  entrySource(source){
+   if(blob(source)!==PINS[ENTRY])reject();
+   const edited=applyEdits(source,originalEntryEdits);
+   record({kind:'loaded_entry',originalHash:hash(source),newHash:hash(edited.text),normalized:true,occurrences:edited.edits.map(x=>x.count)});
+   return edited.text;
+  },
+  controller(){record({kind:'controller',invoked:1});},
+  nativeResult(runs,exitCode,writes){if([runs,exitCode,writes].every(Number.isSafeInteger))record({kind:'native_result',runs,exitCode,writes});}
+ });
+ let networkDenied=0;
+ const denyNetwork=()=>{networkDenied++;record({kind:'network_denied',count:networkDenied});throw Error('ORD-1 network disabled');};
+ globalThis.fetch=denyNetwork;
+ net.Socket.prototype.connect=denyNetwork;
+ // Named module exports remain untouched. Socket.connect fences Node/undici I/O;
+ // HTTP/TLS entry functions are additionally fenced through their mutable defaults.
+ net.default.connect=denyNetwork;net.default.createConnection=denyNetwork;
+ tls.default.connect=denyNetwork;http.default.request=denyNetwork;http.default.get=denyNetwork;
+ https.default.request=denyNetwork;https.default.get=denyNetwork;
+ record({kind:'privacy_control',...controls()});
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
+const nativePlugin=String.raw`
+b.onLoad({filter:/\/scripts\/qa-cloud-native-observation\.mjs$/},async o=>({loader:'js',contents:globalThis.__ord.entrySource(await ordReadFile(o.path,'utf8')),resolveDir:posix.dirname(o.path)}));
+b.onLoad({filter:/mcp-qa-native-wrapper-pin\.mjs$/},()=>({loader:'js',contents:globalThis.__ord.pinSource(a)}));
+`;
+function editsFor(path){
+ if(path===TESTS[0])return [
+  ["await build(","await globalThis.__ordCall(0,'build',build)(",1],
+  ["return import(","return globalThis.__ordCall(0,'import',specifier=>import(specifier))(",1]
+ ];
+ if(path===TESTS[1])return [
+  ["import test from 'node:test';","import {readFile as ordReadFile} from 'node:fs/promises';\nimport test from 'node:test';",1],
+  ["pinned??=buildQaNativeWrapper(","pinned??=globalThis.__ordCall(1,'build',buildQaNativeWrapper)(",1],
+  ["const a=await artifact(),{base64,...manifest}=a;","const a=await artifact(),{base64,...manifest}=a;globalThis.__ord.artifact(a);",1],
+  ["await build(","await globalThis.__ordCall(1,'build',build)(",1],
+  ["setup(b){","setup(b){"+nativePlugin,1],
+  ["{process,Date:ClockDate,","{__ordVM:(stage,phase)=>globalThis.__ord.stage(1,stage,phase),process,Date:ClockDate,",1],
+  ["runs++;if(mode===","runs++;globalThis.__ord.controller();if(mode===",1],
+  ["return{process,writes,logs,runs,","globalThis.__ord.nativeResult(runs,process.exitCode,writes.length);return{process,writes,logs,runs,",1]
+ ];
+ if(path===TESTS[2]||path===TESTS[3]){
+  const site=path===TESTS[2]?2:3;
+  return [["await cfFiniteFixture(","await globalThis.__ordCall("+site+",'fixture',cfFiniteFixture)(",site===2?1:2]];
+ }
+ if(path===HTTP_FIXTURE)return [
+  ["await build(","await globalThis.__ordCall(4,'build',build)(",2],
+  ["return import(","return globalThis.__ordCall(4,'import',specifier=>import(specifier))(",2]
+ ];
+ reject();
+}
+function absorbMarker(data,state){
+ const text=own(data,'message');
+ if(typeof text!=='string'||text.length>65536||!text.startsWith(PREFIX))return;
+ for(const line of text.split('\n')){
+  if(!line.startsWith(PREFIX)||line.length>4096)continue;
+  let v;try{v=JSON.parse(line.slice(PREFIX.length));}catch{continue;}
+  if(!v||typeof v!=='object')continue;
+  // Closed schemas: never forward arbitrary test-origin objects/strings.
+  if(v.kind==='boundary'&&Number.isInteger(v.site)&&v.site>=0&&v.site<=4&&STAGES.includes(v.stage)&&['enter','return','throw'].includes(v.phase)){
+   const k=v.site+':'+v.stage+':'+v.phase;state.boundaries[k]=(state.boundaries[k]??0)+1;
+  }else if(v.kind==='error'&&Number.isInteger(v.site)&&v.site>=0&&v.site<=4&&STAGES.includes(v.stage)&&Array.isArray(v.errors)){
+   for(const e of v.errors.slice(0,4))addError(state,{site:v.site,stage:v.stage,...closedError(e)});
+  }else if(v.kind==='artifact'&&Number.isSafeInteger(v.bytes)&&v.bytes>0&&v.bytes<=131072&&/^[a-f0-9]{64}$/.test(v.sha256)&&typeof v.bytesEqual==='boolean'&&typeof v.hashEqual==='boolean'){
+   const k=v.bytes+':'+v.sha256;state.artifacts[k]={bytes:v.bytes,sha256:v.sha256,bytesEqual:v.bytesEqual,hashEqual:v.hashEqual};
+  }else if(v.kind==='controller'&&v.invoked===1)state.controllerInvoked++;
+  else if(v.kind==='native_result'&&[v.runs,v.exitCode,v.writes].every(Number.isSafeInteger)){
+   const k=[v.runs,v.exitCode,v.writes].join(':');state.nativeResults[k]=(state.nativeResults[k]??0)+1;
+  }else if(v.kind==='network_denied')state.networkDenied++;
+  else if(v.kind==='privacy_control'&&state.privacyControls.length<16)state.privacyControls.push({pass:v.pass===true,stackReads:Number.isSafeInteger(v.stackReads)?v.stackReads:null,oversizeSuppressed:v.oversizeSuppressed===true});
+  else if(v.kind==='pin_model'&&['A','B'].includes(v.arm)&&/^[a-f0-9]{64}$/.test(v.sourceHash)){
+   const k=v.arm+':'+v.sourceHash;state.pinModels[k]={arm:v.arm,sourceHash:v.sourceHash,productionPinUnchanged:v.productionPinUnchanged===true,modeled:v.modeled===true};
+  }else if(v.kind==='loaded_entry'&&[v.originalHash,v.newHash].every(x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x))&&Array.isArray(v.occurrences)&&v.occurrences.length===4){
+   state.loadedEntry={originalHash:v.originalHash,newHash:v.newHash,normalized:v.normalized===true,occurrences:v.occurrences.map(x=>Number.isSafeInteger(x)?x:null)};
+  }
+ }
+}
+function closedError(e){return {name:NAMES.includes(e?.name)?e.name:null,code:CODES.includes(e?.code)?e.code:null,messageHash:typeof e?.messageHash==='string'&&/^[a-f0-9]{64}$/.test(e.messageHash)?e.messageHash:null,messageTooLarge:e?.messageTooLarge===true};}
+function addError(state,e){
+ const k=JSON.stringify(e);if(state.errors[k])state.errors[k].count++;else if(Object.keys(state.errors).length<64)state.errors[k]={...e,count:1};else state.errorOverflow++;
+}
+export default async function* reporter(source){
+ const state={purpose:'afw.ordinary-fourfile.reporter.v1',testEvents:{passed:0,failed:0,wrapperFailed:0},summary:{},boundaries:{},errors:{},errorOverflow:0,artifacts:{},pinModels:{},loadedEntry:null,controllerInvoked:0,nativeResults:{},privacyControls:[],networkDenied:0,...flags};
+ for await(const event of source){
+  const d=event.data;
+  if(event.type==='test:stdout'||event.type==='test:stderr')absorbMarker(d,state);
+  else if(event.type==='test:pass')state.testEvents.passed++;
+  else if(event.type==='test:fail'){
+   const details=own(d,'details'),error=own(details,'error'),failureType=own(error,'failureType');
+   if(failureType==='subtestsFailed')state.testEvents.wrapperFailed++;else state.testEvents.failed++;
+   const location=fixedLocation(d);
+   for(const e of safeError(error))addError(state,{location,failureType:['subtestsFailed','testCodeFailure','cancelledByParent'].includes(failureType)?failureType:null,...e});
+  }else if(event.type==='test:diagnostic'){
+   const message=own(d,'message');
+   if(typeof message==='string'&&message.length<=64){
+    const m=/^(tests|pass|fail|cancelled|skipped|todo) ([0-9]{1,6})$/.exec(message);
+    if(m)state.summary[m[1]]=Number(m[2]);
+   }
+  }else if(event.type==='test:summary'){
+   const c=own(d,'counts');
+   for(const [from,to]of [['tests','tests'],['passed','pass'],['failed','fail'],['cancelled','cancelled'],['skipped','skipped'],['todo','todo']]){
+    const n=own(c,from);if(Number.isSafeInteger(n)&&n>=0&&n<=10000)state.summary[to]=n;
+   }
+  }
+ }
+ const result={...state,errors:Object.values(state.errors),artifacts:Object.values(state.artifacts),pinModels:Object.values(state.pinModels)};
+ const text=JSON.stringify(result);
+ yield Buffer.byteLength(text)<=MAX_SAFE?text+'\n':JSON.stringify({purpose:state.purpose,status:'safe_output_cap',...flags})+'\n';
+}
+function git(cwd,args){const r=spawnSync('git',args,{cwd,encoding:'utf8',timeout:10000,maxBuffer:2097152,env:{PATH:process.env.PATH,HOME:process.env.RUNNER_TEMP,GIT_CONFIG_NOSYSTEM:'1'}});if(r.status!==0)reject();return r.stdout;}
+function tuples(raw){return raw.split('\0').filter(Boolean).map(x=>{const m=/^([0-9]{6}) blob ([a-f0-9]{40})\t([^\n]+)$/.exec(x);if(!m||m[4].startsWith('/')||m[4].split('/').includes('..'))reject();return {mode:m[1],sha:m[2],path:m[4]};});}
+async function inventory(root,leaves){
+ const rows=[];for(const leaf of leaves){const p=join(root,leaf.path),s=await lstat(p);if(!s.isFile()||s.isSymbolicLink()||((s.mode&0o111)!==0)!==(leaf.mode==='100755'))reject();const bytes=await readFile(p);if(blob(bytes)!==leaf.sha)reject();rows.push([leaf.path,leaf.mode,leaf.sha]);}
+ return hash(JSON.stringify(rows));
+}
+async function runChild(cwd,arm,outDir,privateDir){
+ const handles=await Promise.all(['stdout','stderr'].map(n=>open(join(privateDir,'raw.'+n),'wx',0o600)));
+ const digests=[createHash('sha256'),createHash('sha256')],sizes=[0,0];let reason=null,deadline=null,killer=null;
+ const env={PATH:process.env.PATH,HOME:privateDir,TMPDIR:privateDir,LANG:'C.UTF-8',ORD1_CHILD_ARM:arm,ORD1_SUBJECT:SUBJECT,GITHUB_SHA:SUBJECT};
+ const child=spawn(process.execPath,['--import',pathToFileURL(SELF).href,'--test','--test-reporter='+pathToFileURL(SELF).href,...TESTS],{cwd,env,detached:true,stdio:['ignore','pipe','pipe']});
+ const terminate=why=>{if(reason)return;reason=why;try{process.kill(-child.pid,'SIGTERM');}catch{}killer=setTimeout(()=>{try{process.kill(-child.pid,'SIGKILL');}catch{}},5000);};
+ const parentStop=()=>terminate('parent_terminated');process.once('SIGTERM',parentStop);process.once('SIGINT',parentStop);
+ deadline=setTimeout(()=>terminate('deadline_110s'),110000);
+ const chunks=[];
+ const pumps=[child.stdout,child.stderr].map(async(stream,i)=>{for await(const chunk of stream){
+  if(sizes[i]+chunk.length>MAX_RAW){terminate('raw_output_cap');continue;}
+  sizes[i]+=chunk.length;digests[i].update(chunk);await handles[i].write(chunk);
+  if(i===0&&sizes[0]<=MAX_SAFE)chunks.push(chunk);else if(i===0)terminate('safe_output_cap');
+ }});
+ const exit=await new Promise(resolve=>{child.once('error',()=>resolve({code:null,signal:null,spawnFailed:true}));child.once('close',(code,signal)=>resolve({code,signal:['SIGTERM','SIGKILL'].includes(signal)?signal:null,spawnFailed:false}));});
+ await Promise.all(pumps);clearTimeout(deadline);clearTimeout(killer);process.removeListener('SIGTERM',parentStop);process.removeListener('SIGINT',parentStop);await Promise.all(handles.map(h=>h.close()));
+ let evidence=null;try{const raw=Buffer.concat(chunks);if(raw.length<=MAX_SAFE)evidence=JSON.parse(raw.toString('utf8'));}catch{}
+ return {exit,termination:reason,evidence,rawFiles:['stdout','stderr'].map((name,i)=>({name:'raw.'+name,bytes:sizes[i],sha256:digests[i].digest('hex'),uploaded:false})),privateLogsUploaded:false};
+}
+async function main(arm){
+ if(!['A','B'].includes(arm)||process.argv.length!==3||process.platform!=='linux'||process.version!=='v22.23.4')reject();
+ if(!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??''))reject();
+ if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)||process.env.GITHUB_RUN_ATTEMPT!=='1')reject();
+ if(typeof process.env.ORD1_WORKFLOW_SHA!=='string'||!/^[a-f0-9]{40}$/.test(process.env.ORD1_WORKFLOW_SHA))reject();
+ const subject=resolve('subject'),runner=process.env.RUNNER_TEMP;if(!runner||!isAbsolute(runner)||resolve(runner)===subject)reject();
+ const parent=join(resolve(runner),'ord1-'+process.env.GITHUB_RUN_ID+'-'+arm);
+ await mkdir(parent,{recursive:false,mode:0o700});
+ const output=resolve('ord1-safe-'+arm);await mkdir(output,{recursive:false,mode:0o700});
+ const context={repository:REPO,workflowRef:BRANCH,trigger:process.env.GITHUB_EVENT_NAME,workflowSource:process.env.ORD1_WORKFLOW_SHA,workflowCheckout:git(dirname(dirname(dirname(SELF))),['rev-parse','HEAD']).trim(),testSource:SUBJECT,runId:process.env.GITHUB_RUN_ID,attempt:1,arm,node:process.version,os:'Ubuntu24.04',group:'UNSET',childContext:'MODELED_STERILE_SYNTHETIC',workflowContextIsAdmissionAuthority:false,helperHash:hash(await readFile(SELF)),...flags};
+ let report={purpose:'afw.ordinary-fourfile.diagnostic.v1',status:'incomplete',context,privacy:controls(),unknowns:['No production or operational inference.','A must match baseline or context differences remain unresolved.'],...flags};
+ try{
+  if(git(subject,['rev-parse','HEAD']).trim()!==SUBJECT||git(subject,['status','--porcelain','--untracked-files=no']).trim()!=='')reject();
+  const leaves=tuples(git(subject,['ls-tree','-rz','--full-tree','HEAD']));
+  if(leaves.length!==3188||leaves.find(x=>x.path==='package.json')?.sha!=='f4fd38ac380c46a149d8cf0f3bd828a28406f761'||leaves.find(x=>x.path==='package-lock.json')?.sha!=='36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b')reject();
+  const before=await inventory(subject,leaves),overlay=join(parent,'overlay');await mkdir(overlay,{mode:0o700});
+  for(const leaf of leaves){const dest=join(overlay,leaf.path);await mkdir(dirname(dest),{recursive:true});await copyFile(join(subject,leaf.path),dest);await chmod(dest,leaf.mode==='100755'?0o700:0o600);}
+  await symlink(join(subject,'node_modules'),join(overlay,'node_modules'),'dir');
+  const overlays=[];
+  for(const path of [...TESTS,HTTP_FIXTURE]){
+   const original=await readFile(join(subject,path),'utf8');if(blob(original)!==PINS[path])reject();
+   const edited=applyEdits(original,editsFor(path));await writeFile(join(overlay,path),edited.text,{mode:0o600});
+   overlays.push({path,originalBlob:PINS[path],originalHash:hash(original),newHash:hash(edited.text),normalized:true,seams:edited.edits.map(x=>({originalLiteralHash:hash(x.from),newLiteralHash:hash(x.to),count:x.count}))});
+  }
+  await writeFile(join(output,'result.json'),JSON.stringify({...report,status:'running_or_interrupted',protectedBase:{leaves:leaves.length,before},overlays,...flags})+'\n',{flag:'wx',mode:0o600});
+  const execution=await runChild(overlay,arm,output,parent);
+  const after=await inventory(subject,leaves),e=execution.evidence;
+  const baseline=e?.summary?.tests===109&&e.summary.pass===73&&e.summary.fail===36;
+  const hasCounters=['tests','pass','fail'].every(k=>Number.isSafeInteger(e?.summary?.[k]));
+  const hasSites=[0,1,2,3].every(site=>Object.keys(e?.boundaries??{}).some(k=>k.startsWith(site+':')&&k.endsWith(':enter')));
+  const diagnosticComplete=execution.termination===null&&execution.exit.spawnFailed===false&&e?.purpose==='afw.ordinary-fourfile.reporter.v1'&&e.errorOverflow===0&&hasCounters&&hasSites&&e.networkDenied===0&&e.privacyControls.length>=4&&e.privacyControls.every(x=>x.pass)&&report.privacy.pass&&before===after;
+  report={...report,status:diagnosticComplete?'diagnostic_complete':'incomplete',protectedBase:{leaves:leaves.length,before,after,equal:before===after},overlays,execution,baselineMatches109_73_36:baseline,baselineRequiredForCausalConclusion:true,causalConclusion:'DEFERRED_TO_ROOT_TWO_ARM_REVIEW',noRetry:true};
+ }catch(error){report={...report,preparationError:safeError(error),noRetry:true};}
+ const text=JSON.stringify(report,null,2)+'\n';if(Buffer.byteLength(text)>MAX_SAFE)reject();
+ await writeFile(join(output,'result.json'),text,{mode:0o600});
+ await writeFile(join(output,'manifest.json'),JSON.stringify({purpose:'afw.ordinary-fourfile.safe-manifest.v1',file:'result.json',bytes:Buffer.byteLength(text),sha256:hash(text),context,...flags})+'\n',{flag:'wx',mode:0o600});
+ process.exitCode=report.status==='diagnostic_complete'?0:1;
+}
+// Node 22's isolated test-file process only; never emit preload markers in the
+// coordinator or reporter worker. If this context is unavailable, completeness fails.
+if(process.env.ORD1_CHILD_ARM&&process.env.NODE_TEST_CONTEXT==='child-v8')installChild();
+if(process.argv[1]&&resolve(process.argv[1])===SELF){
+ try{await main(process.argv[2]);}catch{process.stderr.write('ORD-1 diagnostic preparation or preservation blocked.\n');process.exitCode=1;}
+}
```
