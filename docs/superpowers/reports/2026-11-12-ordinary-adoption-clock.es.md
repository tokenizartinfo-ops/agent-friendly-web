# Comparación del reloj modelado de adopción ordinaria — preparación

Estado: PREPARED_INACTIVE. Sin ejecución A/B. B completo y primer guard de biblioteca: UNKNOWN. operationalReadiness=false; completePackage=false; PCoff=false.

## Alcance y autorización
PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=rama diagnóstica GitHub SYN, eventual Actions Ubuntu 24.04; ORIGIN=GitHub connector; RESOURCE_TYPE=Git branch/commit/tree/blob; RESOURCE_ID=diag/afw-adoption-clock-20261112; ALLOWED_ACTION=preparar solamente tres archivos nuevos desactivados; ROLLBACK=base inmutable f5f52660d19ec9fc634bbc49558db75582fdaf88, sin mover Source/main ni otro ref. La preparación no autoriza disparar ni activar trabajos. Brief/spec/plan en 267c5cab171bc50147c5ac535d711781c0f9a6a0, leídos antes de implementar.

Se leyó AGENTS.md fijado en f5 y se verificaron ref, commit y árbol completo: f5f52660d19ec9fc634bbc49558db75582fdaf88 → 7bc8b997a968dca32fc567b627de70b774d6489c; truncated=false; 3188 hojas. GET actions/runs?branch=diag%2Fafw-adoption-clock-20261112&per_page=100 devolvió total_count=0 y workflow_runs=[] antes de escribir.

## Contrato preparado
- Workflow manual sin inputs; dos jobs fijos current/historical con literal false en ambos gates, attempt 1, siete minutos, Node 22.23.4, checkout separado de workflow_sha y subject f5, lock original mediante npm ci --ignore-scripts --no-audit --no-fund solo en una futura ejecución autorizada.
- Un caso exacto: actual CLI waits for attended observer until 50s after successful primary seed; GET only, únicamente test/mcp-qa-finite-adoption-wait.test.mjs. Conteos esperados 1 resultado seleccionado y 0 filtrados por brazo; conteos reales aún no medidos.
- current conserva const T0=Date.now(),sha='b'.repeat(40). historical sustituye exactamente una coincidencia por const T0=Date.parse('2026-11-08T02:40:00.000Z'),sha='b'.repeat(40). Admisión rechaza 0/2 coincidencias, modo desconocido o literal histórico preexistente; normalización exacta.
- Observaciones comunes de llamador: cf_fixture/cf_finalizer, restauración/control/prepare/proof/capture/read/claim, generación, projectPrivateQaFiniteReferences, projectFiniteExternalPlan, validateFiniteObserverOutput y build/import HTTP. Sin anotaciones de guards ni cambios lib. T0/R1/custodyExpiresAt/custodyCoversR1 provienen de descriptores de los argumentos efectivamente recibidos; booleanos no prueban el primer guard.
- Se reutiliza de forma acotada el patrón cerrado O2 4db3321be9cffe7f948446e27aae43209f6d1d4f @ dd5f9a6df8fc196685b3cb9e0bb286a02d63bb83: errores nativos/cross-realm, getters/proxies/canario, identidad de receiver/Promise/error, sin emitir valores privados. Son controles preparados, no ejecutados en este bloque.
- Sin modificación de recibo 6012e07fb3a518bfb2d18b62144067a22de02bef: expiry 2026-11-08T02:59:59Z, notBefore=null. B modela C0 02:44/N1 02:45/C1 02:47/R1 02:48 UTC y margen aritmético 719000 ms. No acredita autorización actual.
- Futuro runner: procesos separados, 110s+5 hijo, 120s+5 comando; logs privados 0600 hasta 8 MiB por stream, no subidos; result<=64 KiB, solo result.json+manifest.json durante siete días, ID/digest medidos y readback independiente posterior limitado a 256 KiB. Cero descarga/extracción/ejecución privada en el PC.
- Resultado diagnóstico verde solo significa experimento seguro completado; testPassed independiente, puede ser false. Ninguna expectativa fuerza hash, PASS o causa.

## Inventario de seams originales
- test/mcp-qa-finite-adoption-wait.test.mjs — e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55
- test/fixtures/finite-cf-http.mjs — b0897d389ef3c1a0f057422ffc332e3e024d3a93
- test/fixtures/finite-finalizer.mjs — d3b254e9a21fc816ef6520bdff0f4abafe34f6ea
- test/fixtures/finite-restoration.mjs — ad53cfeca0b6c94b3e062bcb50e0a4644a667b31
- test/fixtures/qa-finite-trial.mjs — 8297a9ae39fd4bdd228a2b1f64105683cb768203
- test/fixtures/finite-http-module.mjs — cfbc564074d298cc333ddbb922ba7c19a96065fb
- lib/mcp-qa-finite-external-contract.mjs — ec405e82e29d99ec1c6311f894eba18c5a48e2c4 (solo lectura).
- lib/mcp-qa-finite-observer.mjs — 68dcfcdbccb9060fb24a7b076618c58fe3ef02e3 (solo lectura).
La tabla de reemplazos incluye conteos exactos y reversión; los dos brazos comparten todos los seams. Solo el literal T0 difiere.

## Verificación de preparación
Solo operaciones GitHub y metadatos en RAM. Ningún clon/archivo de proyecto/dependencia/build/import/test/helper/CLI/job local o remoto fue ejecutado. No npm en esta preparación. Host Node version: UNAVAILABLE; no se intentó sortear el ocultamiento.

Comprobaciones exactas:
1. new vm.SourceTextModule(helperText): PASS, módulo sin link ni evaluate. Primer intento detectó un scaffold function installChild abierto duplicado; se corrigió antes de escribir; nueva gramática PASS.
2. new vm.SourceTextModule para los dos scripts embebidos de preservación del workflow: PASS sin link/evaluate. No parser YAML completo disponible en este bloque; estructura manual fija inspeccionada.
3. vm.Script de funciones puras de admisión/reemplazo con source como texto inerte y timeout:100 ms: 16/16 true — currentExact, historicalOne, missingRejected, duplicateRejected, invalidArmRejected, preexistingHistoricalRejected, allCommonSeamsRoundtrip, manualAdmitted, futurePushTruthful, invalidEventDenied, rerunDenied, wrongRefDenied, wrongShaDenied, wrongRepoDenied, noInputsDenied, clockAndCommonCommute.
4. Patrón exacto: exact=true, prefixDenied=true, suffixDenied=true, en contexto 100 ms. Dos gates false, evento único workflow_dispatch, inputs/schedule/push/pull_request ausentes, dos nombres de brazo, un main, un installChild; caso own/O2 y overlays lib ausentes.
5. Una llamada de metadatos combinada superó el límite automático de 64000 bytes y fue rechazada sin ejecutarse; se dividió en gramática y comprobaciones pequeñas. No bypass ni filesystem del proyecto.

Ruling: el límite específico de esta preparación sustituye tests/builds/reviewers genéricos de skills; Root conserva la revisión completa f5..HEAD antes de cualquier release separado. No delegación adicional.

## Cierre pendiente de readback
Tras commit se requieren comparación íntegra de hojas/modos, contenidos de los tres archivos, CAS/ref y cero runs. El readback fechado se añadirá aquí conservando este bloque. Sin activar, ejecutar, tocar native Task2 ni su reloj; sin Source/main/lib/pins/recibos/credenciales/permisos/runtime/CF/OAuth/Max/correo. No overlap de jobs con reloj nativo. Después STOP_WRITES; una futura comparación única requiere revisión Root y autorización separada.

## Readback primario — 2026-11-12 07:27:47 UTC
Primer commit de preparación b4a388d459496cd6d6a58b81fc631e2805c39c4f; parent exacto f5f52660d19ec9fc634bbc49558db75582fdaf88; árbol a824a8a5708c231083909a1005641e36896cfe99. update_ref con expected_sha=f5, force=false devolvió success=true; GET ref posterior confirmó b4a388d459496cd6d6a58b81fc631e2805c39c4f.

GET árbol recursivo completo: truncated=false, 3191 hojas, 3188 originales con SHA y modo exactos, cero originales modificados, solo tres adiciones 100644:
- .github/workflows/afw-ordinary-adoption-clock.yml — 0555cd08558d89d886e67800e1a6e4d9166b1d85, 9097 bytes.
- scripts/diagnostics/ordinary-adoption-clock.mjs — c9a22bc75ee0b66627baa64cf52955092f3c6c7f, 29622 bytes.
- docs/superpowers/reports/2026-11-12-ordinary-adoption-clock.es.md — fdc9df0962ba7297a06838d16ad6936d790266bd, 6698 bytes antes de este append.

Los tres cuerpos completos se recuperaron por SHA del commit y fueron iguales a los textos preparados, byte lógico UTF-8; no lectura parcial. Workflow preservó dos gates false, evento manual sin inputs, ningún trigger push. Segundo GET actions/runs filtrado por rama devolvió total_count=0, workflow_runs=[]. No se despachó nada.

Aclaración de precisión: no se ejecutó parser YAML completo; su disponibilidad no fue comprobada. Sí se inspeccionó la estructura fija y se parsearon sin evaluar ambos programas JavaScript embebidos.

Este append es únicamente evidencia de preparación: la revisión completa f5..HEAD, el hash final de este informe y el último CAS/readback se entregan a Root después de preservar este bloque. Ningún A/B ejecutado; ningún resultado B, timeout, control de privacidad, argumento de llamada o guard real medido en esta preparación. Estado PREPARED_INACTIVE; todos los indicadores operativos false. STOP_WRITES tras el readback final; Root debe revisar íntegramente antes de una futura release de UNA comparación separada.

## Errata explícita de procedencia — 2026-11-12 07:35:55 UTC
La entrada anterior del inventario para lib/mcp-qa-finite-observer.mjs atribuyó por error el blob 68dcfcdbccb9060fb24a7b076618c58fe3ef02e3. Queda sustituida por la procedencia correcta: en el commit inmutable f5f52660d19ec9fc634bbc49558db75582fdaf88, lib/mcp-qa-finite-observer.mjs corresponde a b5a5245712a08684c40c28ceac70508516950a44. Se verificó mediante lectura primaria del archivo en ese ref y del árbol completo 7bc8b997a968dca32fc567b627de70b774d6489c (truncated=false).

Esta errata añade documentación al informe preservando íntegramente su prefijo histórico. No cambia el archivo fuente, helper c9a22bc75ee0b66627baa64cf52955092f3c6c7f, workflow 0555cd08558d89d886e67800e1a6e4d9166b1d85 ni lógica/pins/recibos. Los dos gates permanecen false y el evento manual sin inputs. No tests, helper, jobs, activación ni comparación A/B ejecutados. Continúa PREPARED_INACTIVE; operationalReadiness=false, completePackage=false, PCoff=false. Root realizará readback documental antes de una futura autorización separada, fijada al nuevo HEAD. STOP_WRITES tras las comprobaciones finales.

## O3 — comparación única ejecutada y cierre — 2026-11-12 UTC
Autorización separada: docs/superpowers/briefs/2026-11-12-ordinary-adoption-clock-single-comparison.md en Rootdocs 8c1080b1d7c97b47ea0326ebfb775eb51b7d5267, leída antes de activar. Preflight confirmó BASE 5d747b632b75e10585098a2917ee2e89f1119363 y cero runs. Solo se activó el workflow: nombre ONE COMPARISON, push exacto a rama diag/afw-adoption-clock-20261112 y selfpath .github/workflows/afw-ordinary-adoption-clock.yml, dos gates para push sin false. Inversa verificada recupera literalmente el blob inactivo 0555cd08558d89d886e67800e1a6e4d9166b1d85. Los otros 3190 blobs/modos permanecieron exactos.

Fuente cualificada del ensayo cd20c12c51f4b147bf8a6fffd3df61452847afa7; árbol ebac9da83c703042629491d23f8a5317268f8a1b; workflow activo 54812b5531be7ffa2b241c6c994b4982c003811b. CAS expected_sha=5d747b632b75e10585098a2917ee2e89f1119363, force=false, success=true. HEAD permaneció congelado hasta terminal y readbacks de ambos artefactos. Esta fuente cualificada es distinta del commit posterior de cierre.

Run 43177133523, push, attempt 1, creado 2026-11-12T07:41:37Z y actualizado terminal 2026-11-12T07:42:14Z, status=completed/conclusion=success. Dos jobs exactos: current 131044007017; historical 131044006651. Ambos completed/success, incluidos caso, manifiesto, upload y metadata de artefacto. Éxito del job significa diagnóstico completo, separado del testPassed. No rerun/redispatch/reemplazo; entitlement consumido. Root mantuvo native16 HELD, sin I0 real; no cambio en Source/native, runtime, permisos o credenciales.

### Resultado primario por brazo
| Dato | A current | B historical |
| --- | --- | --- |
| diagnostic status | diagnostic_complete | diagnostic_complete |
| testPassed | false | true |
| Node tests/pass/fail/skipped/cancelled/todo | 1/0/1/0/0/0 | 1/1/0/0/0/0 |
| registered/selectedPassed/selectedFailed/filteredSkipped | 1/0/1/0 | 1/1/0/0 |
| wrapperFailed/unexpected | 0/0 | 0/0 |
| hijo exit code/signal/spawnFailed | 1/null/false | 0/null/false |
| termination / timeoutExercised | null / false | null / false |
| T0 observado en cf_fixture y external_project | 1794469319056 | 1794105600000 |
| R1 observado en external_project | 1794469799056 | 1794106080000 |
| custodyExpiresAt observado | 1794106799000 | 1794106799000 |
| custodyCoversR1 observado | false | true |
| expiry-R1 aritmético ms | -363000056 | 719000 |
| external_project enter/return/throw | 1/0/1 | 1/1/0 |
| observer_validate enter/return/throw | 0/0/0 | 1/1/0 |
| http_build enter/return/throw | 0/0/0 | 2/2/0 |
| http_import enter/return/throw | 0/0/0 | 2/2/0 |
| networkDenied | 0 | 0 |
| errorhashes | a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e | [] |

A: final_restore y final_project retornaron; external_project arrojó el hash compartido a051, propagado por cf_finalizer/cf_fixture al caso. B: external_project, observer_validate, cf_finalizer y cf_fixture retornaron; también ambas construcciones e importaciones HTTP. B observer_validate volvió a observar T0=1794105600000, R1=1794106080000, expiry=1794106799000, coverage=true. Los argumentos son observaciones del llamador; el primer guard interno sigue UNKNOWN porque varios comparten error literal. Ningún guard se anotó/cambió. Cierre causal final reservado a Root; no extrapolar este único caso a toda la suite, propia 9b4, autorización real o producción.

Ambos contextos: Node v22.23.4, Ubuntu24.04, source f5f52660d19ec9fc634bbc49558db75582fdaf88/tree7bc8b997a968dca32fc567b627de70b774d6489c, procesos separados y modelo SYN. Helper blob c9a22bc75ee0b66627baa64cf52955092f3c6c7f, SHA256 medido 7408c84336ea2a4280975e9bb9f567021173de2f3dbbb601c659c94cc41183c9, idéntico. Los seis overlays originales y seams comunes normalizaron exactamente, con hashes nuevos iguales entre brazos salvo el archivo del caso: current clockLiteralChanges=0, historical=1; los restantes cinco=0 en ambos. A/B IDs y timestamps derivados pueden diferir por el fixture sin ampliar autoridad.

Fuente protegida: 3188 hojas; digest before=after=c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7 en los dos brazos, equal=true. Recibo 6012e07fb3a518bfb2d18b62144067a22de02bef/pins/lib intactos. No cambio del reloj real, custodia expirada ni fechas del recibo.

Controles efectivos: privacy parent PASS y una privacyControl hija PASS por brazo; getterTouches=0, proxyTrapTouches=0, proxyPrototypesSafe=true, ordinary/crossRealmNative=true, crossRealmExactUnknown=true, spoofRejected=true, oversizeSuppressed=true, cycleBounded=true, rawCanaryAbsent=true. Una identityControl por brazo PASS con Promise/error/receiver identity=true. Escaneo de DTO sin keys crudas message/stack/headers/body/bundle/dataURL/credentials/token/download_url; flags operativos false. Ningún timeout/cap fue ejercitado; no atribuir aceptación de timeout por este ensayo.

### Custodia y lectura exacta de artefactos
Listado purpose-built fetch_workflow_run_artifacts, run exacto: dos artefactos y ningún otro, ambos unexpired, repository 1347578006/head_branch exacto/head_sha cd20c12c51f4b147bf8a6fffd3df61452847afa7. Un único download_workflow_artifact por ID por brazo y una única recuperación file-service HTTPS .oaiusercontent.com por referencia; no URLs firmadas/base64 impresos ni filesystem/extracción/ejecución. fetch con AbortSignal.timeout(5000), redirect:error, HTTP200, lectura por chunks con cancelación >262144 bytes; ZIP comprimido/expandido acotado <=262144, dos entradas exactas, CRC32 y SHA256 del ZIP/manifest/result verificados en RAM.

| Brazo | Artifact ID | ZIP bytes | Expanded bytes | ZIP SHA256 | Creado / expira UTC |
| --- | --- | --- | --- | --- | --- |
| current | 13925270033 | 4676 | 14256 | 0b45af88fb694f5afe90b5afe4074f46bb4428db67524fd6235b1a1c967b3a3f | 2026-11-12T07:42:00Z / 2026-11-19T07:41:59Z |
| historical | 13923749573 | 4446 | 11970 | 6e54c3ac54fcd910b4bf02998dc226c79c442a8c7dd5b6faa7f3bd5326466230 | 2026-11-12T07:42:11Z / 2026-11-19T07:42:10Z |

Inventario CRC32/SHA256/bytes, comprobado contra directorio ZIP y manifiesto:
- current/result.json: 13993 bytes, CRC32 d655c9a9, SHA256 8d96ee8efdb57f047329833c11fb41f660358b05c5f5471d01783c74417275e3.
- current/manifest.json: 263 bytes, CRC32 5a2d30db, SHA256 ae1be17b6116d4873b047747d495c6c567678650de9c0bc96804633a75ba7c82.
- historical/result.json: 11707 bytes, CRC32 8ee0a678, SHA256 1815206123262800652160722a11d65c98ba4475708e4253615679db168fe059.
- historical/manifest.json: 263 bytes, CRC32 9b4a3e86, SHA256 ce94ca983e56eb0faa122f047bf820836588373be917ef79c1371890441a27c1.
result.json actual 13993 bytes A y 11707 B, ambos <=65536; manifest 263 bytes cada uno, declara solo result y rawLogsUploaded=false. Artefacto contiene exactamente result.json y manifest.json, retención siete días. DTO/manifest identifican run/head/source/arm y todos los indicadores operativos false.

Tiempos medidos desde invocación: listado 489 ms; herramientas download current 1543 ms/historical 1718 ms; recuperación file-service current 222 ms/historical 56 ms. El downloader no expone timeout configurable: no se atribuye el plazo de 5s a esa herramienta. Duración propia del hijo y memoria RSS no medidas. Intentos de metadata directa actions/jobs/<id> fueron rechazados por el allowlist del conector; no se obtuvieron timestamps de jobs ni logs; los estados/pasos terminales se acreditaron por la herramienta purpose-built. Ninguna repetición del experimento por esas limitaciones.

Logs privados solo se midieron por bytes/hash, no se recuperaron ni subieron:
- current/raw.stdout: 3318 bytes, SHA256 cec90483ecb355f55e4fe69268b58085627f8c413ca3e2857dfe202ae3e1bda6, uploaded=false.
- current/raw.stderr: 0 bytes, SHA256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855, uploaded=false.
- historical/raw.stdout: 1793 bytes, SHA256 e016be132d2f95fddc5836f00f6403ea567d1acfa74768bd2a7160523ab54661, uploaded=false.
- historical/raw.stderr: 0 bytes, SHA256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855, uploaded=false.
No procesos/dependencias/archivos de proyecto locales creados. El trabajo cloud terminó; no se reclama borrado de logs efímeros no inspeccionados ni capacidad operativa persistente/PC apagado.

### Restauración y límites finales
Se conserva íntegro el prefijo previo de este informe y se añade solo este recibo. El commit de cierre restaura exactamente workflow 0555cd08558d89d886e67800e1a6e4d9166b1d85: manual sin inputs, ambos gates false. Helper y todos los otros 3190 archivos respecto al BASE previo al ensayo quedan intactos; únicamente este informe añade evidencia. CAS/ref/árbol/contenidos completos y conteo ONErun/0activejobs se entregan a Root tras el readback final, sin inventar autorreferencia del hash del informe.

Ensayo único CONSUMIDO/CERRADO. No reparación automática, repetición, pruebas adicionales ni promoción. operationalReadiness=false; completePackage=false; PCoff=false; primer guard interno UNKNOWN. B pasó este caso SYN modelado; no acredita frescura/autorización actual, SDK real con credenciales, CF/OAuth/runtime, cobertura universal ni operación con el PC apagado. Root realiza readback independiente y dictamen causal. STOP_WRITES tras comprobaciones finales.
