# AFW O4 preparation — complete independent review package

BASE f5f52660d19ec9fc634bbc49558db75582fdaf88 → HEAD 53176240de1fcac9d9a423a62ec44cea1e88b3e8; exact one commit/three new files. Root primary preservation:

{
  "base": "f5f52660d19ec9fc634bbc49558db75582fdaf88",
  "head": "53176240de1fcac9d9a423a62ec44cea1e88b3e8",
  "tree": "dfebda4f66fe727610e2f77d02511449c8b6c6b8",
  "baseLeaves": 3188,
  "headLeaves": 3191,
  "protectedExact": 3188,
  "added": [
    {
      "path": ".github/workflows/afw-own-import-literal-inspection.yml",
      "sha": "af862de67987090a3b0e4debc528a0f9abff0020",
      "mode": "100644"
    },
    {
      "path": "docs/superpowers/reports/2026-11-12-own-import-literal-inspection.es.md",
      "sha": "3e82adb35e5974846a70bf82c0e977565bb31256",
      "mode": "100644"
    },
    {
      "path": "scripts/diagnostics/own-import-literal-inspection.mjs",
      "sha": "f47651bc41648cafd805553cde183bf66bebf392",
      "mode": "100644"
    }
  ]
}

Root ref readback exact;0 runs. Preparation only: runtime build/parser/artifact bounds remain unqualified. No run/build/import/activation authorized by this review. Binding spec/plan/brief in Rootdocs3723be0b. Read source claims as unverified; verify code. No local source checkout/dependencies.

## Full diff (all added files, complete)

```diff
diff --git a/.github/workflows/afw-own-import-literal-inspection.yml b/.github/workflows/afw-own-import-literal-inspection.yml
# after_blob=af862de67987090a3b0e4debc528a0f9abff0020
--- /dev/null
+++ b/.github/workflows/afw-own-import-literal-inspection.yml
@@ -0,0 +1,113 @@
+name: AFW own-import fixed literal inspection (INACTIVE)
+# Preparation only. One compile-only job remains behind literal false.
+'on':
+  workflow_dispatch:
+permissions:
+  contents: read
+  actions: read
+concurrency:
+  group: afw-own-literal-${{ github.ref }}-${{ github.run_id }}
+  cancel-in-progress: false
+jobs:
+  inspect:
+    if: ${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/diag/afw-own-literal-20261112' && github.event_name == 'workflow_dispatch' && github.run_attempt == '1' }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 2
+    steps:
+      - name: Initial closed receipt before setup
+        shell: bash
+        run: |
+          umask 077
+          mkdir -p own-literal-safe
+          printf '%s\n' '{"purpose":"afw.own-literal.inspection.v1","status":"incomplete","reason":"setup_or_interrupted","operationalReadiness":false,"completePackage":false,"PCoff":false}' > own-literal-safe/result.json
+      - name: Checkout immutable diagnostic source
+        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683
+        with:
+          ref: ${{ github.workflow_sha }}
+          path: diagnostic-code
+          fetch-depth: 1
+          persist-credentials: false
+      - name: Checkout exact separate subject with full history
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
+      - name: Install only the existing fixed lock without scripts
+        id: install
+        continue-on-error: true
+        working-directory: subject
+        run: timeout --signal=TERM --kill-after=3s 25s npm ci --ignore-scripts --no-audit --no-fund
+      - name: One fixed compile-only inspection without emission import
+        if: ${{ steps.install.outcome == 'success' }}
+        continue-on-error: true
+        env:
+          O4_WORKFLOW_SHA: ${{ github.workflow_sha }}
+        run: timeout --signal=TERM --kill-after=3s 60s node diagnostic-code/scripts/diagnostics/own-import-literal-inspection.mjs
+      - name: Preserve terminal closed receipt and manifest
+        if: ${{ always() }}
+        shell: bash
+        run: |
+          umask 077
+          node --input-type=module <<'NODE'
+          import {mkdir,readFile,writeFile,chmod,lstat} from 'node:fs/promises';
+          import {createHash} from 'node:crypto';
+          const root='own-literal-safe';
+          await mkdir(root,{recursive:true,mode:0o700});
+          let bytes;
+          try{
+            const info=await lstat(root+'/result.json');
+            if(!info.isFile()||info.isSymbolicLink()||info.size>65536)throw 0;
+            bytes=await readFile(root+'/result.json');
+            const result=JSON.parse(bytes);
+            if(result.purpose!=='afw.own-literal.inspection.v1'||result.operationalReadiness!==false||result.completePackage!==false||result.PCoff!==false)throw 0;
+            if(result.status==='running_or_interrupted'){
+              result.status='incomplete';result.reason='deadline_or_interrupted';
+              bytes=Buffer.from(JSON.stringify(result)+'\n');
+              if(bytes.length>65536)throw 0;
+              await writeFile(root+'/result.json',bytes,{mode:0o600});
+            }
+            if(!['incomplete','inspection_complete'].includes(result.status))throw 0;
+          }catch{
+            bytes=Buffer.from(JSON.stringify({purpose:'afw.own-literal.inspection.v1',status:'incomplete',reason:'setup_or_interrupted',operationalReadiness:false,completePackage:false,PCoff:false})+'\n');
+            await writeFile(root+'/result.json',bytes,{mode:0o600});
+          }
+          await chmod(root+'/result.json',0o600);
+          await writeFile(root+'/manifest.json',JSON.stringify({purpose:'afw.own-literal.manifest.v1',inventory:[{name:'result.json',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}],rawLogsUploaded:false,operationalReadiness:false,completePackage:false,PCoff:false})+'\n',{mode:0o600});
+          NODE
+      - name: Preserve only two closed JSON files for seven days
+        if: ${{ always() }}
+        id: safe_artifact
+        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02
+        with:
+          name: afw-own-literal-${{ github.run_id }}-${{ github.run_attempt }}
+          path: |
+            own-literal-safe/result.json
+            own-literal-safe/manifest.json
+          retention-days: 7
+          if-no-files-found: error
+      - name: Exact artifact identity metadata
+        if: ${{ always() && steps.safe_artifact.outcome == 'success' }}
+        env:
+          ARTIFACT_ID: ${{ steps.safe_artifact.outputs.artifact-id }}
+          ARTIFACT_DIGEST: ${{ steps.safe_artifact.outputs.artifact-digest }}
+        shell: bash
+        run: |
+          [[ "$ARTIFACT_ID" =~ ^[1-9][0-9]*$ ]]
+          [[ "$ARTIFACT_DIGEST" =~ ^[a-f0-9]{64}$ ]]
+          printf 'O4 artifact id=%s sha256=%s retention-days=7\n' "$ARTIFACT_ID" "$ARTIFACT_DIGEST"
+      - name: Fail incomplete only after safe preservation
+        if: ${{ always() }}
+        shell: bash
+        run: |
+          node --input-type=module <<'NODE'
+          import {readFile} from 'node:fs/promises';
+          try{const result=JSON.parse(await readFile('own-literal-safe/result.json','utf8'));process.exitCode=result.status==='inspection_complete'?0:1;}catch{process.exitCode=1;}
+          NODE
+
diff --git a/docs/superpowers/reports/2026-11-12-own-import-literal-inspection.es.md b/docs/superpowers/reports/2026-11-12-own-import-literal-inspection.es.md
# after_blob=3e82adb35e5974846a70bf82c0e977565bb31256
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-12-own-import-literal-inspection.es.md
@@ -0,0 +1,119 @@
+# AFW O4 — inspección literal de own-import: preparación inactiva
+
+Estado PREPARED_INACTIVE. No se autoriza ni ejecuta sonda. operationalReadiness=false; completePackage=false; PCoff=false. STOP_WRITES tras el contrato externo de lectura completa/ref/árbol/diff; revisión independiente Spec/Quality pendiente.
+
+## Alcance, permisos y fuentes
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web, público/id1347578006; ENVIRONMENT=diagnóstico SYN en GitHub/Actions; ORIGIN=GitHub connector; RESOURCE_TYPE=git branch/tree/blob; RESOURCE_ID=diag/afw-own-literal-20261112; ALLOWED_ACTION=crear exactamente tres nuevas rutas inactivas. No se modifican Source, main, otros diagnósticos, Rootdocs, runtime, CF, permisos, credenciales, mail o Max. Sin helpers/subagentes; Native Task2 sigue separado y esta entrega no abre su reloj.
+
+Requisitos leídos en 3723be0b0cf3ebb5f1bbf4281e80b1c7065cea85:
+
+- Brief docs/superpowers/briefs/2026-11-12-own-import-literal-preparation.md: 5d773b76efe2c941386ab8a0fb6b003c7b7d4545.
+- Spec docs/superpowers/specs/2026-11-12-own-import-literal-inspection.md: d4f1812bc39d92eb11a7cf37946eeb4a9b250718.
+- Plan docs/superpowers/plans/2026-11-12-own-import-literal-inspection.md: c735be45b54b85ee38b77f2590a23c5f99a2bafc.
+
+Fuente f5f52660d19ec9fc634bbc49558db75582fdaf88; árbol 7bc8b997a968dca32fc567b627de70b774d6489c; lectura completa no truncada: 3188 blobs/modos. AGENTS.md leído con alcance inicial, blob b67942223e5633011573f2a2165489afd9ff3f67. Matching-ref exacto devolvió vacío; se creó esta rama desde f5 y se leyó de vuelta en f5. Las tres rutas nuevas no existen en el árbol base; runs de esta rama=0 antes de escribir.
+
+Pins completos verificados directamente:
+
+- test/mcp-own-finite-entrypoints.test.mjs = 674419ca51328b128bba483f44001e12f1e4b9f5.
+- package.json = f4fd38ac380c46a149d8cf0f3bd828a28406f761.
+- package-lock.json = 36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b.
+- Lock raíz: esbuild0.28.2 y Acorn8.18.0, con version/integrity completas embebidas en helper y comprobadas antes del futuro build.
+- Referencia O2 sólo para privacidad/inventario/captura: helper4db3321be9cffe7f948446e27aae43209f6d1d4f @7b200bdf61eda65234e12cef008de8cae483aa6f. No se ejecutó ni se reutilizó su ruta de tests/import.
+
+Tres altas únicamente, modo Git100644:
+
+| Ruta | Bytes UTF-8 | Blob Git | SHA-256 |
+| --- | ---: | --- | --- |
+| scripts/diagnostics/own-import-literal-inspection.mjs | 29944 | f47651bc41648cafd805553cde183bf66bebf392 | 1b19768d05fb20e2a823384688a78cf07e006d5cf30eb9d38e2d59dde2a3a3ac |
+| .github/workflows/afw-own-import-literal-inspection.yml | 5653 | af862de67987090a3b0e4debc528a0f9abff0020 | b395270caea28b525b75354f4f63fa34d505898ce52c178762208fbb04c9847a |
+| docs/superpowers/reports/2026-11-12-own-import-literal-inspection.es.md | contrato externo | contrato externo | contrato externo |
+
+El informe no incorpora sus propios hashes finales para evitar autorreferencia. Head/tree/blob de informe finales y diff/readbacks efectivos van en el contrato externo; no se añadirán commits sólo para autorreferenciar esos hashes.
+
+## Build original y exclusión de ejecución
+
+Pregunta fija: el Error de own import observado por O2 tiene SHA-256 9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff; las lecturas previas de dependencias directas y 42 hipótesis de payload no lo localizaron. El futuro build cubriría la clausura emitida, pero no determina qué throw se ejecutó.
+
+El helper contiene VERBATIM la línea7 de build del test original, no una reconstrucción de sus opciones. SHA-256 del literal completo con espacio inicial=79f548435ad46645bd22d1a036aa108dee5dc98a1861d567312d6bf19eee7a7b. Una única línea de código del helper es idéntica a esa línea fuente; el pin runtime vuelve a verificar test completo y literal. Profile fijo finite_trial_event; entry worker/mcp-own/index.mjs; bundle/write:false/ESM/platform node; mismo define y mismo plugin synthetic-platform-base con sus onResolve/onLoad y constructores sintéticos originales. No se añaden banner, metafile, sourcemap, define, target, SDK o plugins.
+
+El futuro hijo trabaja en cwd del checkout sujeto. createRequire se ancla al archivo de test exacto; se resuelve raíz esbuild/lib/main.js y se importa ese entry como namespace ESM para obtener el mismo named build. Fuente primaria oficial esbuild v0.28.2/npm/esbuild/package.json, blob7e54c6fc979b490baba9937b3893d1390473dde2, declara main=lib/main.js y sin exports/module/type alternativos. El paquete instalado futuro debe conservar versión/main y carecer de exports/type module; de lo contrario incomplete, nunca se sustituye otro compilador. Se comprueba además el binario linux-x64 presente para evitar fallback de instalación. La equivalencia efectiva de módulos instalados queda pendiente de la ejecución futura; no se importó el paquete durante preparación.
+
+No se importa el test ni su línea8. No hay node --test, tests registrados, import data-URL, eval, vm de emisión, instancias SDK, auth factories, métodos de producto o Miniflare. La única cadena emitida leída es result.outputFiles[0].text; sólo se conserva en RAM. Se exige exactamente un outputFile. Se guardan bytes/SHA-256 de esa cadena, no la cadena, ni AST, snippets o source map. Esto no es el build nativo completo, Source expirado sigue intacto y ninguna fecha SYN pasa por autorización real.
+
+## Diccionario conservador y semántica exacta
+
+Objetivo único fijo9b4dd8...; cero argumentos CLI/target/env selector. El modo de hijo es interno/fijo, con fuente f5 y env estéril; no puede elegir otro archivo ni hash.
+
+El parser futuro es el Acorn raíz8.18.0 del sujeto, require entry exacto acorn/dist/acorn.js, sourceType=module/ecmaVersion=latest/error recovery deshabilitado. Antes de creación de nodos se cuenta startNode/startNodeAt/copyNode mediante una subclase local acotada; primaria Acorn8.18.0/acorn/src/node.js blobcdc5714f22e73220d7832275d9c87d5467af013a confirma esas construcciones. También se cuentan nodos alcanzables durante la visita. Esta subclase no es plugin del compilador y no ejecuta código de aplicación. Su funcionamiento con la emisión real NO se verificó aún.
+
+Candidatos sintácticos: primer argumento de CallExpression/NewExpression con callee Identifier exactamente Error/TypeError/SyntaxError/ReferenceError/RangeError/EvalError/URIError/AggregateError; y argumentos de ThrowStatement, salvo el mismo Error constructor/call ya contado. Otros nombres, alias y accesos de propiedad no se resuelven. AggregateError también sigue la regla puramente sintáctica del primer argumento: no se afirma que sea su argumento de mensaje. Shadowing no prueba constructor intrínseco. El ordinal se ordena por start generado; no hay atribución a módulo.
+
+Fold permitido:
+
+- Literal: string, boolean, número finito o null. RegExp/BigInt/otros valores omitidos.
+- BinaryExpression sólo operador +: si algún operando completamente conocido es string, concatena las conversiones primitivas; si ninguno es string, suma números primitivos (null→0, false→0, true→1, number→él mismo). Resultado no finito se cuenta desconocido.
+- TemplateLiteral: cooked literal string con cada expresión recursivamente conocida; null→null textual, boolean→true/false textual, number finito→String(number), string sin cambio. cooked inválido se omite.
+- No UnaryExpression, Identifier propagation, llamadas, propiedades, spread, coerción de objetos, lógica/condicionales ni evaluación de fuente. Un payload final no string se cuenta desconocido; no se presupone la conversión de un constructor posiblemente sombreado.
+- Todo acceso AST pertinente usa descriptores propios de datos; Proxy no se inspecciona. La visita rechaza getters en la estructura AST y nunca los llama.
+
+Límites cerrados: emisión4MiB; creación/visitaAST200000; candidatos4096; profundidad fold32; payload1MiB; bytes acumulados fold8MiB (incluye intermedios, conservador); matches públicos128; result64KiB. Sobrepasar cualquiera o fallar build/parser => incomplete. Expresiones fuera del lenguaje de fold se omiten con conteos de unknown; esto no invalida haber recorrido el diccionario definido, pero no constituye no-error/clean.
+
+Sólo salen conteos, hashes y, para matches, ordinal generado+enum named_error_new/named_error_call/throw_payload con payloadHash fijo. Los no-matches no imprimen sus payloads ni una lista arbitraria de textos. STATIC_CANDIDATE_MATCH_NOT_EXECUTION_PROOF significa existencia estática; NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY sólo descarta ese diccionario limitado. Ninguno prueba origen ejecutado, primer throw, reparación o aceptación de la suite.
+
+## Privacidad, proceso y preservación futura
+
+Se reutilizan selectivamente de O2: propios descriptores/proxy-stop; marca nativa/prototipo observado y causa acotada; hash de mensaje propio<=1MiB; enums cerrados; canary/getters/proxy/oversize/ciclo; hashes/tuples; captura por streams; recibos/inventario. La privacidad fija se comprueba en padre/hijo futuros. Se omiten deliberadamente: reporter Node tests, filtros/skips, overlays de source/tests/libs, import de emisión, A/B/pinB, native CLI, controladores/SDK, marcadores de métodos/promesas y su control de identidad. Aquí no se observan/reemplazan métodos de aplicación: sólo build+parse; por eso no se trasladan esos counters de O2.
+
+Hijo con PATH/HOME/TMPDIR/LANG y constantes O4/GITHUB_SHA=f5, sin heredar credenciales/eventos/contexto real. Contexto padre distingue workflowSHA/run/evento reales de child MODELED_STERILE_SYNTHETIC. Helper admite sólo los tipos de evento cerrados workflow_dispatch/push y registra el real validado, evitando repetir el conflicto de release O2; esto no activa push: el único job del workflow sigue manual y literal false. El helper verifica argv vacío, repo/ref/attempt1/run-id/sourceSHA/Linux/Node22.23.4.
+
+Red del hijo cerrada mediante fetch/socket/http/https/tls como O2; cualquier intento incrementa contador e impide complete. No se afirma contención universal de procesos arbitrarios: el único subprocess permitido es el compilador original instalado, sin nuevo downloader o credenciales. El inventario f5 de3188 hojas/modos es comprobado antes/después de forma independiente.
+
+Logs del hijo nuevos0600/directorio0700, por streams, total8MiB, no upload. Sólo JSON cerrado del hijo<=64KiB se reconstruye en padre con enums/cotas; no se reenvía un objeto arbitrario. Errors sólo metadata saneada; nunca mensaje/stack/bundle/AST.
+
+Workflow futuro: Ubuntu24.04/Node22.23.4; checkout diagnóstico por github.workflow_sha y sujeto f5/historia completa separados, credenciales persistentes false. npm ci --ignore-scripts --no-audit --no-fund con timeout25s+3; comando del helper timeout60s+3; hijo45s+3; job máximo2min. Estos límites suman91s de comandos con ventana remanente29s para setup/preservación, sin timeout externo120+5 que exceda el job. Son límites codificados no ejercitados, no SLA de Actions: checkout/setup pueden agotar la ventana externa.
+
+Recibo inicial antes del setup; preservación de recibo running/interrupted como incomplete conservando campos disponibles; final manifest y upload always(); fallo de incomplete sólo después de preservar. Un kill/cancelación dura del job puede impedir upload; se reportará si sucede, sin prometer artefacto ante un runner destruido. El estado parcial previamente escrito no se presenta como terminal exitoso.
+
+Artefacto previsto exacto result.json+manifest.json, siete días. ID/digest en formato cerrado; lectura futura especializada por run/ID exacto y una descarga, ZIP pequeño sóloRAM/CRC/SHA/manifiesto, sin logs ni URLs firmadas impresas. Todavía no existe run/artefacto/ID que acreditar.
+
+## Comprobaciones de preparación realmente realizadas
+
+- Full test/lock/pins y literal original leídos; branch matching-ref vacío y ref f5 leído de vuelta.
+- SourceTextModule analizó helper final sin evaluate/link/import del proyecto; dos scripts inline también sólo gramática.
+- PyYAML6.0.3 ya instalado analizó YAML final: un job manual sin inputs/literal false/repo/ref/attempt1/permisos contents:read/actions:read/concurrency sin cancelación/job2min; un upload de dos rutas.
+- Únicamente se evaluaron siete controles de metadata sobre AST escritos a mano en VM de builtins, timeout100ms. No Acorn ni parser de proyecto/emisión. HostNodeVersion=unavailable_from_node_repl, expresamente no Node22 cloud qualification.
+
+Resultado real de los controles inertes:
+
+```json
+{
+  "hostNodeVersion": "unavailable_from_node_repl",
+  "vmTimeoutMs": 100,
+  "projectOrEmissionParsed": false,
+  "controls": {
+    "pass": true,
+    "cases": 7,
+    "touches": 0,
+    "literal": true,
+    "addition": true,
+    "template": true,
+    "primitiveAddition": true,
+    "gettersUntouched": true,
+    "proxyUntouched": true,
+    "callNotEvaluated": true
+  }
+}
+```
+
+Estos controles usan literal, adición string/números, template/null, bool+null, getter arrojador no leído, Proxy sin traps y CallExpression desconocido sin ejecutar. No se imprimió el canary. No se ejercitaron compiler lookup/build/parse/AST caps reales/captura/deadlines/artefacto. Esos siguen condiciones futuras de aceptación.
+
+Los errores de ensamblado JS de la herramienta se corrigieron en RAM antes de publicar; ninguno ejecutó proyecto ni creó archivos locales. No se clonó/instaló/compiló/testeó nada local ni cloud. Sólo lecturas remotas, gramática/YAML y esos controles pequeños autorizados.
+
+## Commit y contrato de cierre
+
+Crear árbol sobre7bc8b997 con exactamente las tres altas100644; commit con único padre f5 y [skip ci]; CAS sólo esta rama expected_sha=f5/force=false. Rollback material f5 y3188blobs preservados; no se autoriza reset/force/delete/merge/deploy.
+
+Contrato externo posterior: ref exacto, padre/tree/árbol completo no truncado3191 blobs,3188tuples originales idénticos, exactamente tres altas, tres lecturas completas de blobs comparadas por bytes/pins y cero runs. Los hashes finales del propio informe/head/tree/diff y el resultado efectivo de CAS/readbacks se entregan externamente. STOP_WRITES después, para revisión independiente. No ejecutar, importar emisión, rearmar o asumir guardia/PCoff con esta preparación.
+
diff --git a/scripts/diagnostics/own-import-literal-inspection.mjs b/scripts/diagnostics/own-import-literal-inspection.mjs
# after_blob=f47651bc41648cafd805553cde183bf66bebf392
--- /dev/null
+++ b/scripts/diagnostics/own-import-literal-inspection.mjs
@@ -0,0 +1,370 @@
+// O4 fixed compile-only diagnostic. Inactive until a separately reviewed release.
+import {createHash} from 'node:crypto';
+import {types} from 'node:util';
+import {runInNewContext} from 'node:vm';
+import {createRequire} from 'node:module';
+import {readFile,writeFile,mkdir,lstat,open} from 'node:fs/promises';
+import {spawn,spawnSync} from 'node:child_process';
+import {resolve,join,dirname} from 'node:path';
+import {fileURLToPath,pathToFileURL} from 'node:url';
+import * as net from 'node:net';
+import * as tls from 'node:tls';
+import * as http from 'node:http';
+import * as https from 'node:https';
+const SELF=fileURLToPath(import.meta.url);
+const SUBJECT='f5f52660d19ec9fc634bbc49558db75582fdaf88';
+const SOURCE_TREE='7bc8b997a968dca32fc567b627de70b774d6489c';
+const REPO='tokenizartinfo-ops/agent-friendly-web';
+const REF='refs/heads/diag/afw-own-literal-20261112';
+const TEST='test/mcp-own-finite-entrypoints.test.mjs';
+const TEST_BLOB='674419ca51328b128bba483f44001e12f1e4b9f5';
+const LOCK_BLOB='36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b';
+const PACKAGE_BLOB='f4fd38ac380c46a149d8cf0f3bd828a28406f761';
+const TARGET='9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff';
+const LIMITS=Object.freeze({emission:4194304,nodes:200000,candidates:4096,depth:32,payload:1048576,folded:8388608,result:65536,raw:8388608,matches:128});
+const MAX_MESSAGE=1048576;
+const REASONS=['admission','source_pin','dependency_pin','ast_shape','ast_nodes','candidate_cap','fold_depth','payload_cap','folded_cap','match_cap','emission_cap','control_failure','unexpected_failure'];
+const PHASES=['admission','source','dependencies','build','parse','dictionary','complete'];
+const STATES=['incomplete','inspection_complete'];
+const UNKNOWN=['unsupported_ast','invalid_template','nonfinite_number','missing_payload','nonstring_payload'];
+const flags={operationalReadiness:false,completePackage:false,PCoff:false};
+const hash=value=>createHash('sha256').update(value).digest('hex');
+const blob=value=>createHash('sha1').update('blob '+Buffer.byteLength(value)+'\0').update(value).digest('hex');
+const own=(value,key)=>{try{if(types.isProxy(value))return undefined;const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};
+const hex=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value)?value:null;
+const number=(value,max=200000)=>Number.isSafeInteger(value)&&value>=0&&value<=max?value:null;
+const stop=reason=>{const e=new Error('O4 inspection unavailable');Object.defineProperty(e,'o4Reason',{value:REASONS.includes(reason)?reason:'unexpected_failure'});throw e;};
+const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
+const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','EvalError','URIError','AggregateError','AssertionError'];
+const INTRINSICS=[Error,TypeError,SyntaxError,ReferenceError,RangeError,EvalError,URIError,AggregateError];
+const PROTOS=INTRINSICS.map(x=>x.prototype);
+const CLASS_NAMES=NAMES.slice(0,8);
+const ORIGINAL_BUILD=" const result=await build({entryPoints:['worker/mcp-own/index.mjs'],bundle:true,write:false,format:'esm',platform:'node',define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify(profile)},plugins:[{name:'synthetic-platform-base',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'base',namespace:'synthetic'}));b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:'export class DurableObject{constructor(ctx,env){this.ctx=ctx;this.env=env;}} export class WorkerEntrypoint{constructor(ctx,env){this.ctx=ctx;this.env=env;}}'}));}}]});";
+const DEPENDENCY_PINS={"esbuild":{"version":"0.28.2","integrity":"sha512-HKVLS8dvII+xoKW9kmqxbRKrnWEXfJJr/FZhhJmiqIB0e053QNYFqOBouTMO/k5sID4MvCiUCvv8b9M4h32wIA=="},"acorn":{"version":"8.18.0","integrity":"sha512-lGq+9yr1/GuAWaVYIHRjvvySG5/4VfKIvC8EWxStPdcDh/Ka7FG3twP6v4d5BkravUilhIAsG4Qj83t02LWUPQ=="}};
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
+ const canary='AFB_PRIVATE_CANARY_NEVER_EMIT_20261112';
+ let touches=0;
+ const ordinary=new TypeError(canary),cross=runInNewContext('new TypeError("AFB_PRIVATE_CANARY_NEVER_EMIT_20261112")');
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
+
+function fold(node,depth,state){
+ if(depth>32)stop('fold_depth');
+ const type=own(node,'type');
+ const made=value=>{
+  if(typeof value==='string'){
+   const bytes=Buffer.byteLength(value);
+   if(bytes>LIMITS.payload)stop('payload_cap');
+   state.foldedBytes+=bytes;if(state.foldedBytes>LIMITS.folded)stop('folded_cap');
+  }
+  return {known:true,value};
+ };
+ if(type==='Literal'){
+  if(own(node,'regex')!==undefined||own(node,'bigint')!==undefined)return {known:false,reason:'unsupported_ast'};
+  const value=own(node,'value');
+  if(value===null||['string','boolean'].includes(typeof value))return made(value);
+  if(typeof value==='number'&&Number.isFinite(value))return made(value);
+  return {known:false,reason:'unsupported_ast'};
+ }
+ if(type==='BinaryExpression'&&own(node,'operator')==='+'){
+  const left=fold(own(node,'left'),depth+1,state);if(!left.known)return left;
+  const right=fold(own(node,'right'),depth+1,state);if(!right.known)return right;
+  if(typeof left.value==='string'||typeof right.value==='string')return made(primitiveString(left.value)+primitiveString(right.value));
+  const number=primitiveNumber(left.value)+primitiveNumber(right.value);
+  return Number.isFinite(number)?made(number):{known:false,reason:'nonfinite_number'};
+ }
+ if(type==='TemplateLiteral'){
+  const parts=own(node,'quasis'),values=own(node,'expressions'),pl=own(parts,'length'),vl=own(values,'length');
+  if(types.isProxy(parts)||types.isProxy(values)||!Array.isArray(parts)||!Array.isArray(values)||!Number.isSafeInteger(pl)||!Number.isSafeInteger(vl)||pl!==vl+1)return {known:false,reason:'invalid_template'};
+  let text='';
+  for(let i=0;i<pl;i++){
+   const cooked=own(own(own(parts,String(i)),'value'),'cooked');
+   if(typeof cooked!=='string')return {known:false,reason:'invalid_template'};
+   text+=cooked;made(text);
+   if(i<vl){const item=fold(own(values,String(i)),depth+1,state);if(!item.known)return item;text+=primitiveString(item.value);made(text);}
+  }
+  return made(text);
+ }
+ return {known:false,reason:'unsupported_ast'};
+}
+function primitiveString(value){
+ if(value===null)return 'null';
+ if(typeof value==='string')return value;
+ if(typeof value==='boolean')return value?'true':'false';
+ if(typeof value==='number'&&Number.isFinite(value))return String(value);
+ stop('ast_shape');
+}
+function primitiveNumber(value){
+ if(value===null)return 0;
+ if(typeof value==='boolean')return value?1:0;
+ if(typeof value==='number'&&Number.isFinite(value))return value;
+ stop('ast_shape');
+}
+function errorSyntax(node){
+ return ['NewExpression','CallExpression'].includes(own(node,'type'))&&CLASS_NAMES.includes(own(own(node,'callee'),'name'))&&own(own(node,'callee'),'type')==='Identifier';
+}
+function inspect(ast){
+ const pending=[ast],seen=new Set(),candidates=[];let nodes=0;
+ while(pending.length){
+  const node=pending.pop();if(!node||typeof node!=='object')continue;
+  if(types.isProxy(node))stop('ast_shape');
+  if(seen.has(node))continue;seen.add(node);
+  const type=own(node,'type');
+  if(typeof type==='string'){
+   if(++nodes>LIMITS.nodes)stop('ast_nodes');
+   let candidate=null;
+   if(errorSyntax(node)){
+    candidate={node:own(own(node,'arguments'),'0'),syntax:type==='NewExpression'?'named_error_new':'named_error_call',start:own(node,'start')};
+   }else if(type==='ThrowStatement'&&!errorSyntax(own(node,'argument'))){
+    candidate={node:own(node,'argument'),syntax:'throw_payload',start:own(node,'start')};
+   }
+   if(candidate){if(!Number.isSafeInteger(candidate.start)||candidate.start<0||candidate.start>LIMITS.emission)stop('ast_shape');candidates.push(candidate);}
+   if(candidates.length>LIMITS.candidates)stop('candidate_cap');
+  }
+  for(const descriptor of Object.values(Object.getOwnPropertyDescriptors(node))){
+   if(!Object.hasOwn(descriptor,'value'))stop('ast_shape');
+   const value=descriptor.value;
+   if(value&&typeof value==='object'&&(Array.isArray(value)||typeof own(value,'type')==='string'))pending.push(value);
+  }
+ }
+ candidates.sort((a,b)=>a.start-b.start);
+ const state={foldedBytes:0},unknown={},matches=[];let folded=0;
+ for(let index=0;index<candidates.length;index++){
+  const candidate=candidates[index];
+  const value=candidate.node?fold(candidate.node,0,state):{known:false,reason:'missing_payload'};
+  if(!value.known||typeof value.value!=='string'){
+   const reason=value.known?'nonstring_payload':value.reason;unknown[reason]=(unknown[reason]??0)+1;continue;
+  }
+  folded++;const sha256=hash(value.value);
+  if(sha256===TARGET){if(matches.length>=128)stop('match_cap');matches.push({site:index,syntax:candidate.syntax,payloadHash:TARGET,intrinsicConstructorIdentityProven:false,executedOriginProven:false});}
+ }
+ return {nodes,candidates:candidates.length,folded,unknown,foldedBytes:state.foldedBytes,matches,conclusion:matches.length?'STATIC_CANDIDATE_MATCH_NOT_EXECUTION_PROOF':'NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY',moduleAttribution:false};
+}
+function metadataControls(){
+ const literal=value=>({type:'Literal',value});
+ const plus=(left,right)=>({type:'BinaryExpression',operator:'+',left,right});
+ const state=()=>({foldedBytes:0});
+ const a=fold(literal('O4_PRIVATE_CANARY'),0,state());
+ const b=fold(plus(literal('a'),plus(literal(1),literal(2))),0,state());
+ const c=fold({type:'TemplateLiteral',quasis:[{value:{cooked:'a'}},{value:{cooked:'b'}}],expressions:[literal(null)]},0,state());
+ const d=fold(plus(literal(true),literal(null)),0,state());
+ let touches=0;const getter={type:'Literal'};Object.defineProperty(getter,'value',{get(){touches++;throw 0;}});
+ const e=fold(getter,0,state()),f=fold(new Proxy({},{get(){touches++;throw 0;},getOwnPropertyDescriptor(){touches++;throw 0;}}),0,state());
+ const g=fold({type:'CallExpression'},0,state());
+ const flags={literal:a.known&&hash(a.value)===hash('O4_PRIVATE_CANARY'),addition:b.known&&b.value==='a3',template:c.known&&c.value==='anullb',primitiveAddition:d.known&&d.value===1,gettersUntouched:touches===0&&!e.known,proxyUntouched:touches===0&&!f.known,callNotEvaluated:!g.known};
+ return {pass:Object.values(flags).every(Boolean),cases:7,touches,...flags};
+}
+
+
+let deniedNetwork=0;
+function fenceNetwork(){
+ const denied=()=>{deniedNetwork++;stop('admission');};
+ globalThis.fetch=denied;net.Socket.prototype.connect=denied;
+ net.default.connect=denied;net.default.createConnection=denied;tls.default.connect=denied;
+ http.default.request=denied;http.default.get=denied;https.default.request=denied;https.default.get=denied;
+}
+async function compileChild(){
+ let phase='admission',report={purpose:'afw.own-literal.child.v1',status:'incomplete',...flags};
+ try{
+  if(process.argv.length!==2||process.version!=='v22.23.4'||process.platform!=='linux'||process.env.O4_COMPILE_CHILD!=='FIXED_OWN_LITERAL'||process.env.O4_SUBJECT!==SUBJECT)stop('admission');
+  fenceNetwork();
+  report.privacy=controls();report.metadata=metadataControls();
+  if(!report.privacy.pass||!report.metadata.pass)stop('control_failure');
+  phase='source';const subject=process.cwd(),test=await readFile(join(subject,TEST),'utf8'),lockText=await readFile(join(subject,'package-lock.json'),'utf8');
+  if(blob(test)!==TEST_BLOB||blob(lockText)!==LOCK_BLOB||test.split('\n')[6]!==ORIGINAL_BUILD)stop('source_pin');
+  const lock=JSON.parse(lockText),requireSubject=createRequire(pathToFileURL(join(subject,TEST)));
+  phase='dependencies';
+  for(const name of ['esbuild','acorn']){
+   const actual=lock.packages?.['node_modules/'+name],pin=DEPENDENCY_PINS[name];
+   if(actual?.version!==pin.version||actual?.integrity!==pin.integrity)stop('dependency_pin');
+   const installed=JSON.parse(await readFile(join(subject,'node_modules',name,'package.json'),'utf8'));
+   if(installed.version!==pin.version)stop('dependency_pin');
+   if(name==='esbuild'&&(installed.exports!==undefined||installed.main!=='lib/main.js'||installed.type==='module'))stop('dependency_pin');
+  }
+  const compilerEntry=requireSubject.resolve('esbuild');
+  if(resolve(compilerEntry)!==join(subject,'node_modules','esbuild','lib','main.js'))stop('dependency_pin');
+  const binary=await lstat(join(subject,'node_modules','@esbuild','linux-x64','bin','esbuild'));
+  if(!binary.isFile()||binary.isSymbolicLink())stop('dependency_pin');
+  const {build}=await import(pathToFileURL(compilerEntry).href);
+  const profile='finite_trial_event';
+  phase='build';
+ const result=await build({entryPoints:['worker/mcp-own/index.mjs'],bundle:true,write:false,format:'esm',platform:'node',define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify(profile)},plugins:[{name:'synthetic-platform-base',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'base',namespace:'synthetic'}));b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:'export class DurableObject{constructor(ctx,env){this.ctx=ctx;this.env=env;}} export class WorkerEntrypoint{constructor(ctx,env){this.ctx=ctx;this.env=env;}}'}));}}]});
+  if(!Array.isArray(result.outputFiles)||result.outputFiles.length!==1)stop('emission_cap');
+  const emission=result.outputFiles[0].text;
+  if(typeof emission!=='string'||Buffer.byteLength(emission)>LIMITS.emission)stop('emission_cap');
+  report.emission={bytes:Buffer.byteLength(emission),sha256:hash(emission),imported:false,evaluated:false};
+  report.build={profile:'finite_trial_event',literalHash:hash(ORIGINAL_BUILD),compiler:'0.28.2',warnings:number(result.warnings?.length),outputFiles:1};
+  phase='parse';
+  const parserEntry=requireSubject.resolve('acorn');
+  if(resolve(parserEntry)!==join(subject,'node_modules','acorn','dist','acorn.js'))stop('dependency_pin');
+  const {Parser}=requireSubject('acorn');
+  let parserNodes=0;
+  const countNode=()=>{if(++parserNodes>LIMITS.nodes)stop('ast_nodes');};
+  class BoundedParser extends Parser{
+   startNode(){countNode();return super.startNode();}
+   startNodeAt(...args){countNode();return super.startNodeAt(...args);}
+   copyNode(...args){countNode();return super.copyNode(...args);}
+  }
+  const ast=BoundedParser.parse(emission,{ecmaVersion:'latest',sourceType:'module'});
+  phase='dictionary';report.inspection=inspect(ast);
+  report.parser={name:'acorn',version:'8.18.0',sourceType:'module',errorRecovery:false,nodesAllocated:parserNodes};
+  if(deniedNetwork!==0)stop('control_failure');
+  phase='complete';report.status='inspection_complete';
+ }catch(error){report={...report,status:'incomplete',phase,reason:REASONS.includes(own(error,'o4Reason'))?own(error,'o4Reason'):'unexpected_failure',error:safeError(error)};}
+ report.networkDenied=deniedNetwork;
+ const text=JSON.stringify(report);
+ process.stdout.write(Buffer.byteLength(text)<=LIMITS.result?text+'\n':JSON.stringify({purpose:report.purpose,status:'incomplete',reason:'unexpected_failure',...flags})+'\n');
+ process.exitCode=report.status==='inspection_complete'?0:1;
+}
+
+function closedChild(value){
+ if(own(value,'purpose')!=='afw.own-literal.child.v1'||!STATES.includes(own(value,'status')))return null;
+ const out={purpose:'afw.own-literal.child.v1',status:own(value,'status'),networkDenied:number(own(value,'networkDenied')),phase:PHASES.includes(own(value,'phase'))?own(value,'phase'):null,reason:REASONS.includes(own(value,'reason'))?own(value,'reason'):null,...flags};
+ out.privacy=closedControl(own(value,'privacy'));
+ const meta=own(value,'metadata');
+ out.metadata=Object.fromEntries(['pass','literal','addition','template','primitiveAddition','gettersUntouched','proxyUntouched','callNotEvaluated'].map(key=>[key,own(meta,key)===true]));
+ out.metadata.cases=number(own(meta,'cases'),7);out.metadata.touches=number(own(meta,'touches'));
+ const errors=own(value,'error');out.error=Array.isArray(errors)?errors.slice(0,4).map(closedError):[];
+ const emission=own(value,'emission');
+ if(emission)out.emission={bytes:number(own(emission,'bytes'),LIMITS.emission),sha256:hex(own(emission,'sha256')),imported:false,evaluated:false};
+ const build=own(value,'build');
+ if(build)out.build={profile:'finite_trial_event',literalHash:hex(own(build,'literalHash')),compiler:'0.28.2',warnings:number(own(build,'warnings')),outputFiles:number(own(build,'outputFiles'),1)};
+ const parser=own(value,'parser');
+ if(parser)out.parser={name:'acorn',version:'8.18.0',sourceType:'module',errorRecovery:false,nodesAllocated:number(own(parser,'nodesAllocated'),LIMITS.nodes)};
+ const inspection=own(value,'inspection');
+ if(inspection){
+  const unknown={};for(const key of UNKNOWN){const n=number(own(own(inspection,'unknown'),key),LIMITS.candidates);if(n!==null)unknown[key]=n;}
+  const rows=own(inspection,'matches');if(!Array.isArray(rows)||rows.length>128)return null;
+  const matches=[];
+  for(const row of rows){
+   const site=number(own(row,'site'),LIMITS.candidates-1),syntax=own(row,'syntax');
+   if(site===null||!['named_error_new','named_error_call','throw_payload'].includes(syntax)||own(row,'payloadHash')!==TARGET)return null;
+   matches.push({site,syntax,payloadHash:TARGET,intrinsicConstructorIdentityProven:false,executedOriginProven:false});
+  }
+  out.inspection={nodes:number(own(inspection,'nodes'),LIMITS.nodes),candidates:number(own(inspection,'candidates'),LIMITS.candidates),folded:number(own(inspection,'folded'),LIMITS.candidates),foldedBytes:number(own(inspection,'foldedBytes'),LIMITS.folded),unknown,matches,conclusion:matches.length?'STATIC_CANDIDATE_MATCH_NOT_EXECUTION_PROOF':'NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY',moduleAttribution:false};
+ }
+ if(out.status==='inspection_complete'){
+  const i=out.inspection,b=out.build,e=out.emission;
+  if(!out.privacy.pass||!out.metadata.pass||out.networkDenied!==0||!i||!b||!e||e.bytes===null||e.sha256===null||b.literalHash!==hash(ORIGINAL_BUILD)||b.warnings===null||b.outputFiles!==1||!out.parser||out.parser.nodesAllocated===null||i.nodes===null||i.candidates===null||i.folded===null||i.foldedBytes===null||i.folded+Object.values(i.unknown).reduce((a,n)=>a+n,0)!==i.candidates||i.matches.length>i.folded)return null;
+ }
+ return out;
+}
+function git(cwd,args){
+ const result=spawnSync('git',args,{cwd,encoding:'utf8',timeout:5000,maxBuffer:2097152,env:{PATH:process.env.PATH,HOME:process.env.RUNNER_TEMP,GIT_CONFIG_NOSYSTEM:'1'}});
+ if(result.status!==0)stop('source_pin');return result.stdout;
+}
+function leaves(raw){return raw.split('\0').filter(Boolean).map(value=>{const m=/^([0-9]{6}) blob ([a-f0-9]{40})\t([^\n]+)$/.exec(value);if(!m||m[3].startsWith('/')||m[3].split('/').includes('..'))stop('source_pin');return {mode:m[1],sha:m[2],path:m[3]};});}
+async function inventory(subject,files){
+ const rows=[];
+ for(const file of files){
+  const path=join(subject,file.path),info=await lstat(path);
+  if(!info.isFile()||info.isSymbolicLink()||((info.mode&0o111)!==0)!==(file.mode==='100755')||blob(await readFile(path))!==file.sha)stop('source_pin');
+  rows.push([file.path,file.mode,file.sha]);
+ }
+ return hash(JSON.stringify(rows));
+}
+async function capture(subject,privateDir){
+ const handles=await Promise.all(['stdout','stderr'].map(name=>open(join(privateDir,'raw.'+name),'wx',0o600)));
+ const sizes=[0,0],digests=[createHash('sha256'),createHash('sha256')],chunks=[];let termination=null,killer=null;
+ const env={PATH:process.env.PATH,HOME:privateDir,TMPDIR:privateDir,LANG:'C.UTF-8',O4_COMPILE_CHILD:'FIXED_OWN_LITERAL',O4_SUBJECT:SUBJECT,GITHUB_SHA:SUBJECT};
+ const child=spawn(process.execPath,[SELF],{cwd:subject,env,detached:true,stdio:['ignore','pipe','pipe']});
+ const end=reason=>{if(termination)return;termination=reason;try{process.kill(-child.pid,'SIGTERM');}catch{}killer=setTimeout(()=>{try{process.kill(-child.pid,'SIGKILL');}catch{}},3000);};
+ const parentStop=()=>end('parent_terminated');process.once('SIGTERM',parentStop);process.once('SIGINT',parentStop);
+ const deadline=setTimeout(()=>end('child_45s'),45000);
+ const pumps=[child.stdout,child.stderr].map(async(stream,index)=>{for await(const bytes of stream){
+  if(sizes[0]+sizes[1]+bytes.length>LIMITS.raw){end('raw_cap');continue;}
+  sizes[index]+=bytes.length;digests[index].update(bytes);await handles[index].write(bytes);
+  if(index===0&&sizes[0]<=LIMITS.result)chunks.push(bytes);else if(index===0)end('safe_cap');
+ }});
+ const exit=await new Promise(done=>{child.once('error',()=>done({code:null,signal:null,spawnFailed:true}));child.once('close',(code,signal)=>done({code,signal:['SIGTERM','SIGKILL'].includes(signal)?signal:null,spawnFailed:false}));});
+ await Promise.all(pumps);clearTimeout(deadline);clearTimeout(killer);process.removeListener('SIGTERM',parentStop);process.removeListener('SIGINT',parentStop);await Promise.all(handles.map(handle=>handle.close()));
+ let evidence=null;try{const raw=Buffer.concat(chunks);if(raw.length<=LIMITS.result)evidence=closedChild(JSON.parse(raw.toString('utf8')));}catch{}
+ return {exit,termination,evidence,rawFiles:['stdout','stderr'].map((name,index)=>({name:'raw.'+name,bytes:sizes[index],sha256:digests[index].digest('hex'),uploaded:false})),rawLogsUploaded:false};
+}
+async function preserve(output,report){
+ let text=JSON.stringify(report,null,2)+'\n';
+ if(Buffer.byteLength(text)>LIMITS.result)text=JSON.stringify({purpose:'afw.own-literal.inspection.v1',status:'incomplete',reason:'safe_cap',...flags})+'\n';
+ await writeFile(join(output,'result.json'),text,{mode:0o600});
+ await writeFile(join(output,'manifest.json'),JSON.stringify({purpose:'afw.own-literal.manifest.v1',inventory:[{name:'result.json',bytes:Buffer.byteLength(text),sha256:hash(text)}],rawLogsUploaded:false,...flags})+'\n',{mode:0o600});
+}
+async function main(){
+ if(process.argv.length!==2||process.platform!=='linux'||process.version!=='v22.23.4'||process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==REF||!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.O4_WORKFLOW_SHA??''))stop('admission');
+ const output=resolve('own-literal-safe');await mkdir(output,{recursive:true,mode:0o700});
+ const context={repository:REPO,workflowRef:REF,trigger:process.env.GITHUB_EVENT_NAME,workflowSource:process.env.O4_WORKFLOW_SHA,testSource:SUBJECT,runId:process.env.GITHUB_RUN_ID,attempt:1,node:process.version,os:'Ubuntu24.04',mode:'SYN_COMPILE_ONLY_NO_IMPORT',childContext:'MODELED_STERILE_SYNTHETIC',workflowContextIsAdmissionAuthority:false,...flags};
+ let report={purpose:'afw.own-literal.inspection.v1',status:'incomplete',context,targetHash:TARGET,limits:LIMITS,noRetry:true,...flags};
+ await preserve(output,report);
+ const subject=resolve('subject');let files=null,before=null;
+ try{
+  if(git(dirname(dirname(dirname(SELF))),['rev-parse','HEAD']).trim()!==context.workflowSource||git(subject,['rev-parse','HEAD']).trim()!==SUBJECT||git(subject,['rev-parse','HEAD^{tree}']).trim()!==SOURCE_TREE||git(subject,['status','--porcelain','--untracked-files=no']).trim()!=='')stop('source_pin');
+  files=leaves(git(subject,['ls-tree','-rz','--full-tree','HEAD']));
+  if(files.length!==3188||files.find(x=>x.path===TEST)?.sha!==TEST_BLOB||files.find(x=>x.path==='package-lock.json')?.sha!==LOCK_BLOB||files.find(x=>x.path==='package.json')?.sha!==PACKAGE_BLOB)stop('source_pin');
+  before=await inventory(subject,files);
+  const privateRoot=process.env.RUNNER_TEMP;if(typeof privateRoot!=='string'||!privateRoot.startsWith('/'))stop('admission');
+  const privateDir=join(resolve(privateRoot),'o4-'+context.runId);await mkdir(privateDir,{recursive:false,mode:0o700});
+  report={...report,status:'running_or_interrupted',protectedBase:{leaves:3188,before},helperHash:hash(await readFile(SELF)),privacy:controls(),metadata:metadataControls()};
+  await preserve(output,report);
+  if(!report.privacy.pass||!report.metadata.pass)stop('control_failure');
+  const execution=await capture(subject,privateDir),after=await inventory(subject,files),e=execution.evidence;
+  const complete=execution.termination===null&&execution.exit.code===0&&!execution.exit.spawnFailed&&e?.status==='inspection_complete'&&e.privacy.pass&&e.privacy.getterTouches===0&&e.privacy.proxyTrapTouches===0&&e.metadata.pass&&e.networkDenied===0&&number(e.emission?.bytes,LIMITS.emission)!==null&&hex(e.emission?.sha256)!==null&&number(e.inspection?.nodes,LIMITS.nodes)!==null&&number(e.inspection?.candidates,LIMITS.candidates)!==null&&before===after;
+  report={...report,status:complete?'inspection_complete':'incomplete',protectedBase:{leaves:3188,before,after,equal:before===after},execution};
+ }catch(error){report={...report,status:'incomplete',reason:REASONS.includes(own(error,'o4Reason'))?own(error,'o4Reason'):'unexpected_failure',error:safeError(error)};}
+ finally{
+  if(files&&before){try{const after=await inventory(subject,files);report.protectedBase={leaves:3188,before,after,equal:before===after};if(before!==after)report.status='incomplete';}catch{report.status='incomplete';report.protectedBase={leaves:3188,before,after:null,equal:false};}}
+  await preserve(output,report);
+ }
+ process.exitCode=report.status==='inspection_complete'?0:1;
+}
+if(process.argv[1]&&resolve(process.argv[1])===SELF){
+ try{if(process.env.O4_COMPILE_CHILD==='FIXED_OWN_LITERAL')await compileChild();else await main();}
+ catch{process.stderr.write('O4 admission or safe preservation incomplete.\n');process.exitCode=1;}
+}
+
```
