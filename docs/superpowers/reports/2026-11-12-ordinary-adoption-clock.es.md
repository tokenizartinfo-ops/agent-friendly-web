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
