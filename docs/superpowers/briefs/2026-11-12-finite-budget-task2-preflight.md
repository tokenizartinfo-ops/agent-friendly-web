# Task2 — preflight and implementation requirements, PREFLIGHT ONLY initially

Read this first. Single source of exact requirements for fresh Task2 implementer. Repository tokenizartinfo-ops/agent-friendly-web; PROJECT AFW, ENVIRONMENT Source/SYN GitHub+Actions, ORIGIN GitHubconnector. Sole potential Source writer; Root writes Rootdocs only. Cloud-first: no clone/install/build/test/projectfiles on Gabriel PC. Existing isolated Sourcebranch feat/finite-native-cleanup-20261101, BASE2 7852f3a71de7cfcb98fedbd7b51c6a9886bf17da/treeb4246c3128e77a0b1276ea3da9e4dede17f1f8a3/3188leaves/TEMPabsent, main0c9c475b3ebaa970fc11d628b40e50a90cceb727 protected. GLOBALBASE29681cae2bf1094ec5c66d5b2784254f77bec697/tree0200cf32ac4e020bd35c56c307fbc8060cf8bd64. All refs must be read back before mutation.

## Initial release: preflight ONLY
No Sourcewrite, jobs, build, tests, new files, localprojectsetup, or subagents until Root accepts your concrete preflight. Read relevant SourceAGENTS sections, exact plan/spec excerpts below and scoped actual fixtures. Return a compact in-chat preflight: (1) exact minimal path whitelist and occurrence/exports; (2) genuine SDKcomplete readonly setup and KV row/count/cursor/sentinel/5s outward ACK hold seam preserving Promise/this/results; (3) original late unexchanged producer plumbing/onecheckpoint and two replicas per consumer before SAME C0; (4) seven-job dependencies/margins/artifact bytes/custody binding and safe failure preservation; (5) causal tests/controls and any actual ambiguity needing Root ruling. NO execution permission inferred from the implementation checklist. Root will publish a fixed approved map/release before Sourcewrite. Do not read entire historical report/ledger/plan: relevant final Task1 handoff/report tail only as needed.

## Accepted Task1 interfaces and results
Task1 closed after fresh review and native9/9 run43154341161/1 Source1c2a40cf. Final7852 is only TEMPdeletion+appendreport vs59d;3187otherblobs exact. Eight pure tests/currentpositiveP1 are accepted; do not rewrite/replay them by inertia. ORD-1 remains separate OPEN integration debt, not a waive. Whole-branch review after Task2 remains mandatory. No prior claims of PCoff/realAFW success.
Current immutable blobs: worldf654001b027555c41dbe3f287445e73ac849094b; native082340b6ede2a252a8602721ec19063cc68fafc8; runtime3aba82b323837f3c14463875d472500d49c0c2e0; pure1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8; evidence0d95b1616a167f7f089e3a8ca59ca9628aa8aaa9; descriptorbe695028e4c12c3cb7d3b7bf2c5f2e7508f3db15; custody9a486b839874ed8e9a950f6a823b18e7585de52e; custodytestc913c94be080597704fbf7d370475443e1f1b96d. Other fixtureblobs in BASE2 tree are authority.
Actual world APIs: createBudgetCompiler(role), attachBudgetEpochCapture(f,{segment='producer',epochs=[],epoch=0}), preflightBudgetCompilation(), instrumentBudgetDiagnostics(source,{moduleRole}), extendBudgetQualification(entry), prepareBudgetProducer(kind,root), verifyBudgetCheckpoint(kind,root), runBudgetConsumer(kind,root), sealBudgetArtifact(root,kind), verifyBudgetArtifact(root,kind,artifactId). Last three producer/checkpoint/consumer currently assert kind positive/group positive; extend minimally. Current native group absent registers no tests; invalid explicit group fails beforeI0. Extend explicit readonly/reduction_a/reduction_b; never default-all. Runtime uses maxRows/observed_metrics contracts, not obsolete maxEvents-only plan hint. Eight actual epochs can include zero-row M0; retentionoverflow truthfully distinguishes tracecomplete/observedmetrics. No actual getter/then/property re-observation regressions.

## Root custody ruling (binding addition to Task2)
Existing dedicated AFW_SYN_CHECKPOINT_KEY/environment accepted; no key creation/copy/rotation/UI/permissions. Preserve AES256GCM/gzip/two-pass inventory/limits512MiBnative,768MiBJSONL,128MiBenvelope,7d/sameID. No raw state/TAP/logs in public artifacts/console or localPC. Do not relabel a reduction result as positive.
Minimal prospective custody helper extension: fixed AAD kinds reduction-checkpoint, reduction-result-a, reduction-result-b in addition to existing checkpoint,positive-result,producer-failure,consumer-failure; unchanged v1 contextshape/crypto/limits/key. Add focused negative cross-kind/tamper/unknown-kind coverage plus positive roundtrip for fixed new kinds without replacing existing custody cases. Bind lane/case in authenticated inner fixed manifest AND exact producer needs output artifactID/hash/readback; reduction checkpoint can be opened only with expected reduction-checkpoint context and matching Source/run/ref/attempt BEFORE native mount. Consumers a/b open same producer ID, then mutate only declared native KV input replicas; own result kinds distinct. Failure envelopes retain fixed producer/consumer-failure but inner fixed lane/group identity verified; no mounting from failure envelopes. This minimal enum/test change is permitted in proposed preflight map, not a new generic exporter. If actual APIs make this unsound, report concrete conflict before write. Ruling reason: Task2 needs cryptographic positive/reduction/consumer separation without key/format redesign; cost focused pure regression and review. Custody tests are prerequisites, NOT extra cases to inflate16business count.

## Original Task2 text — verbatim

## Task 2: Máximos readonly/reduction y calificación conjunta16

**Files:** nuevos/extendidos budget-world y native.test; extensiones mínimas en seams SNY ya declarados y reporteTask2. Collector/evidence/positive deTask1 se consumen por interfacesanteriores; cualquier cambio aTask1 requiere justificación y coveringchecks. No Core/product code; si una nueva prueba descubre un bug productivo, preservar fallo/STOP ypedir ruling, no alterar lib bajo esta unidad.

- [ ] Tras aceptaciónTask1, Root fija BASE2=suHEAD/tree/whitelist y preflight persistencia/grupos. Cargar historiarelevanteTask1 sin reeditar su tarea porinercia.
- [ ] Añadir readonly R1/R2/R3 con SDKreal/aplicaciónoriginal; filasnative adicionales sólo inputsSYNmodeladosdeuntrustedstore, propiasdeprefixconmetadataextranjera/expiraciónoriginal, candidatoúnicoproducidoSDKcomplete1. Sentinelforeign intacto:
~~~js
// R1:200entries/2pages(limit100,cursorreal),200actualgets,peak(scope)=2,
// exact one originalcorrelation ->durableReference ->302; no200authorizationsclaim.
// R2:201entries; third native list neverentered, <=200gets, no302/Reference success, noSDKreplay.
// R3: firstTWO actualgetACKs held, queuepopulated; child5s expires,
// othergenuineRoot excluded untilsettlement; release =>zeroqueuedgets/no late302/reference/replay.
~~~
No REDartificial: límitesyaestánimplementados, unPASSBASE escontrolhonesto, no reprobuginventado.
- [ ] Producir unReductioncheckpoint único auténticounexchanged:true, sin tokenexchange/Notice completados artificialmente. SDKcomplete realtardíoC0−300 yReference previa302, KVcodeTTL600natural conservaobjetoC0; noexpiryfieldsrefresh. Añadir losmodos fijosD1..D4 a las réplicasantesC0, conservandoSource/actors/metadata. Extra tokens sonvaloresinertes no credenciales, expiraciónabsolutaoriginal, recuentototalobtenidoantesdeoperar; ajenosintactos.
~~~js
// D1:199ownTokens +grant =>200totalnativeDeletes, normalSDKreturn +successfulclosure.
// D2:200ownTokens =>200deletes; grant201 neverentered, grant remains,
// noSDKObserved/ownerReceipt/completion, no retry uncertainSEND.
// D3:201ownTokens =>thirdlistdeniedbeforeIO, never>2lists or200deletes, pending preserved.
// D4: firstTWO deleteACKs held +populatedqueue, original5s denial,
// scopehelduntilactualsettlement; noqueuedemit/SDKreplay/falseSDKreturn onrelease.
~~~
Medir actualnative vs outwardACK, cadaPromise yscopepeak; no identidadfingida ni afirmacióndedrain. D4 no repite los3slots/restart anteriores.
- [ ] ConsumidorA D1/D2 yB D3/D4 tienenDOSréplicasantes delMISMO C0 cadauno, jobsdistintos yconcurrentes, recuperación≥30s/sinrestart. NativepostreadbackKVinputdeltas anotados, noconfundirconcorruptcheckpoint oconreceipts. Fallodemargen detiene como setupinválido; ningúnclockseextiende.
- [ ] Finalcoherente únicaSourcefrozen:16PASS=8Q+3R+4D+P1,0FAIL/cancel/skip/todo;7jobs/3lanes/5linajesgenuinos/10grafos. Purecontracts first;lane1positive_prepare→positive_consume;lane2reduction_prepare→reduction_consume_a;lane3readonly→reduction_consume_b(also needsreduction_prepare). Max3jobsnativos/6MFglobal y2MFjob, los4DreplicanMISMOcheckpoint. No sumar9Task1PASS niREDpara fabricar16.
~~~sh
AFW_BUDGET_GROUP=readonly node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs
node test/fixtures/finite-budget-world.mjs prepare-reduction output/finite-budget/checkpoint
AFW_BUDGET_GROUP=reduction_a node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs
AFW_BUDGET_GROUP=reduction_b node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs
~~~
- [ ] Preservar sietejobs/commandoutput/Source/tree/blobs/actualscripts+metafiles/native manifests/sanitizedJSONs yresúmenes. Leerlarecuperación primaria desdecoldfilesantesC0; verificar ambosaliasKVysentinels. Upload7d+exactreadbackporartifactID; sin secrets/recursosexternos.
- [ ] Self-review todoBASE2..HEAD yreconfirmar toda producción exacta aBASEglobal296. RetirarTEMPterminal, appendreportTask2 yCAS/readbacks/STOP. RoottaskreviewSpec+Quality; luegoUNArevisiónconjuntaglobal296..finalmostcapable. NoSourcewritesdurantecalificación/revisión.


## Global Constraints — verbatim plan

## Global Constraints

- Ningún archivo lib/**,worker/**,package/lock,configuración productiva,SDK1.2.1,compatflag o API pública cambia. No se exporta la faceta privada, se crea una fábrica de autoridad o se sustituye por una copia del algoritmo.
- Cualquier instrumentación de fuente ocurre sólo en el compilador SYN de fixtures, con marcadores exactos y conteo de ocurrencias antes de I0. Mantiene cuerpo/orden/guardas/promesas/retención nativa y bytes originales en disco; grafos y script transformado se archivan como SYN explícito, no deploy.
- Fuente real3nov02:59UTC sigue vencida. OriginalI0/C0=I0+900000/C1=C0+180000, Root30s/child5s y tres slots originales se conservan. Nada de fake clock, refresco de Access/Source/identidad, cambio de TTL o segundo alarm.
- No repetir los RED/16/51/56 anteriores por rutina; su evidencia queda aceptada y fechada. No broad suite por inercia. Nuevas pruebas sólo cubren los defectos de observabilidad y límites enumerados aquí.
- No Cloudflare API real, runtime, DDL remoto, OAuth/OTP/tokens/permisos, cron/Container/consumidor/avisos reales, nuevo chat, main/PR/publish, Max ni correo.
- Los diagnósticos son datos, nunca autoridad: no habilitan acciones, no son un ACK, no se leen para permitir business/cleanup ni permiten construir Root/lease/SDKselector.
- operationalReadiness=false;completePackage=false;PCoff=false; globalNativeDrainVerified=false/sdkNamespaceEmptyVerified=false.
- PROJECT AFW; repo tokenizartinfo-ops/agent-friendly-web/public1347578006. Source feat/finite-native-cleanup-20261101 BASE29681cae2bf1094ec5c66d5b2784254f77bec697/tree0200cf32ac4e020bd35c56c307fbc8060cf8bd64. Rootdocs docs/finite-pcoff-continuation-20261103. Un Source writer; Root sólo docs. CAS/readbacks/protectedtree; rollback sólo cambios propios, no force/reset/eliminarhistoria.
- Cloudnamespace de ESTA unidad: specs/plans/progress/briefs/reports/reviews/2026-11-07-finite-native-budget-qualification*. No leer/escribir el ledger del plan anterior como workspace nuevo. Evidencia previa sólo por referencias concretas; no nuevos procesos locales. Owner ausente hasta19:30UTC/16:30Argentina; no pasos humanos.


## Binding spec cases/clock composition — verbatim current spec excerpt

Exactamente16casos de la calificación final propuesta:8 contratos puros +3readonly nativos +4reduction nativos +1ciclo positivo instrumentado. No añadir los éxitos de RED/intermedios a ese total. Cada familia demuestra un contrato distinto; no llamar cobertura readonly a la reducción.

### Ocho contratos del colector/proyección

Q1 campos allowlist/redacción sin valores sensibles; Q2 identidad ordinal y denominadores sin doble conteo; Q3 fase capturada sobrevive settlement tardío y request concurrente; Q4 native vs logical vs cancel se conservan distintos; Q5 métricas/DTO no conceden autoridad ni alteran resultado/promesa; Q6 overflow marca incompleto sin cambiar efecto; Q7 resumen≤2048B con hash/ruta de JSON completo; Q8 lifecycle de bytes/lecturas/cancel y peak por scope no se infieren de promedios. Estos son componentes puros SYN, no simulaciones de un ACK real.

### Tres casos readonly (genuino SDKcomplete en cada linaje)

R1: inventario nativo de200grants/2páginas de100, exactamente uno con la correlación original; API SDKreal realiza200gets y el redirect exige Reference genuina durable. Extra199filas son entradas nativas modeladas SYN con formato SDK fijado y metadata extranjera, nunca200autorizaciones emitidas ni recibos sembrados. Medir limit100/cursor real/peak2/scope y preservar sentinel ajeno.

R2:201entradas hacen necesaria tercera lista; rechazar antes de la tercera entrada nativa y antes de redirect/Reference exitosa, aunque el candidato propio esté entre los primeros200. No ampliar listas/get budget, no repetir SDKcomplete.

R3: después de una página poblada, retener los ACKs outward de los primeros DOS gets ya invocados y dejar cola poblada; vence child original5s. Otro Root LIVE mismoctx sigue excluido hasta settlement; al liberar no entra ningún get de la cola ni vuelve302/Reference/SDKcomplete. Rotular holdpostnativeACK si el KV ya se resolvió; no llamarlo latencia física. Mostrar pico2 del scope correcto y eventos/cancel reales.

Todas las filas adicionales y controles son inputs nativos SYN no confiables, derivados del subject/prefix original sólo dentro de fixture. No caller-selector/metadata como permiso productivo. Los clocks/expiraciones del grant original permanecen.

### Cuatro casos reducción (mismo linaje original por réplicas explícitas)

Producir una sola ocurrencia genuina unexchanged:true como el control aceptado g6: Reference previa302, grant todavía presente naturalmente alC0 (codeTTL600) sin modificar expiresAt/reference. Recuperar los mismos archivos/IDs/scripts antesC0. Cada caso usa réplica SYN aislada del checkpoint, con a lo sumo dos Miniflare vivos; no reconstruye receipt/alarm/Source/I0.

D1:199claves token propias +grant final=200deletes TOTALES; SDKnormalreturn y cierre correcto con inventario fresco. D2:200tokens consumen200deletes; el intento grant201 se deniega antes de KV I/O, originalgrant conservado, sin SDKObserved/OwnerReceipt/completion exitosa. D3:201tokens requieren tercera lista; negar tercera lista antes de I/O, conservar incertidumbre/sin replay/ACKfabricado. D4: cola de deletes poblada con primeros dos ACKs outward retenidos, vence el child original, no nueva emisión tras fallo y otro Root excluido hasta settlement real del scope. Al liberar no inventar retorno SDK exitoso ni repetirlo.

Los token rows adicionales son marcadores inertes SYN, no access tokens ni nuevos grants de datos. Medir el número total realmente existente antes de empezar y usar el prefix original; no asumir que el exchange dejó cero/uno. Mantener expiración absoluta del grant genuino al modelar filas: no extender TTL/C1 ni refrescar un recurso para que quede presente. Sentinels fuera del prefix/subject intactos. Los resultados pendientes son pases de protección, no retiros completados. Para D4 no hace falta repetir los tres slots/restart ya calificados: comprobar primera invocación, exclusión y no nueva emisión hasta settlement; reporte limita su alcance.

### Un positivo completo para diagnóstico atribuible

Productor actual hasta SDKReference/token/MCP/NoticeLink genuinos, con métricas por fase sin respuestas exitosas sembradas. Cold checkpoint de la misma ocurrencia, consumidor antesC0, mismo alarm aC0, una restauración y reducción nativa/inventario/receipt. Afirmar que las sumas porfase/recurso concuerdan con sus contadores nativos nombrados; preservar separados los agregados de fixture y las operaciones dentro de scopes. Todos los child/Root existentes dentro de sus techos, sin ampliar un milisegundo. Este positivo sólo valida medición y regresión del flujo usado, no reejecuta la matriz completa previa ni prueba proveedor real.

## RED y ejecución cloud

Un RED focal diagnóstico antes de implementación: usar los helpers BASE existentes para producir SDKcomplete real/Reference y salida actual; preservar hechos/resultado y afirmar atribución completa/resumen acotado. Debe fallar por el déficit real de diagnóstico/longitud tras el efecto observado, NO por importar un archivo/helper nuevo, premisa inválida o clock/hash viejo. No hay que esperarC0 en ese RED ni reabrir RED históricos. Cualquier límite ya implementado que pase en BASE sigue siendo control, no se presenta falsamente como una nueva reproducción de bug.

FinalGREEN seleccionado en la misma revisión, después de implementación/instrumentación:7jobs (contratos,readonly,positivo_prepare→positivo_consume,reduction_prepare→reduction_consume_a yreduction_consume_b);3lanes,native≤2Miniflare/job, jobs≤15min (readonly≤7,contratos≤2). Lane1positivo_prepare→positivo_consume;lane2reduction_prepare→reduction_consume_a(D1,D2);lane3readonly→reduction_consume_b(D3,D4), dondeconsume_b también depende dereduction_prepare. Contratos precede las treslanes. Tres linajes readonly separados terminan antes de sus C0; positivo yreducción son dos linajes pareados900s: cinco linajes/10grafosM-QA, sin nuevo SDK-only graph. Los cuatro D son réplicas expresas del MISMO checkpoint, no cuatro nuevos I0. Cada consumidor de reducción monta sus DOS réplicas antes del MISMO C0 y configura sus tokens modelados/hold fijo antes delalarm, sin restart:true ni carga conalarmvencido. Las dosparejas corren en jobs distintos yconcurrentes (máx3jobsnativos/6Miniflareglobal;máx2porjob); cadajob recupere ambasréplicas almenos30s antesC0 oaborte antesdeefectos. No hay segundapareja montada despuésC0 ni seam de overduealarm. LasmutacionesSYNdeinputKV despuésdecoldreadback son declaradas ycomparadas aparte, nunca sustituyen records/receipts/identidad/scripts originales. Productores respetan apertura antes90s/C0−120000 y recuperación30s antesC0; no abrir I0 si no cabe el job. Capturar volumen/tiempos de la instrumentación, sin declararlos RTT real.

contents:read only, sinsecrets; checkouts SHA; node22/currentlock/npmci ignorescripts/audit/fund como antes; sintaxis+lint de changedfiles y comandos exactos en reporte. Sourcefrozen durante cada run. Por cada upload7d, descargar MISMO artifactid/run y verificar inventario exacto/scripts/metafiles/native-state/bytes/SHA. No extraer DB/scripts en el ordenador. Artefactos completosSYN y resumenfechado durable; no prometer retención indefinida del binario.

## Mapa y revisión

Whitelisted inicial propuesto: nuevos test/fixtures/finite-budget-diagnostics.mjs (colector puro), finite-budget-evidence.mjs (escritura Node) y finite-budget-world.mjs (instrumentación/CLI), nuevos test/finite-budget-diagnostics.test.mjs y test/mcp-qa-finite-budget-native.test.mjs; modificar sólo los seams necesarios en finite-owner-cleanup.mjs,finite-owner-cleanup-persistence.mjs,finite-initial-entry-world.mjs, finite-first-connection-publication.mjs (plugin M opt-in) y test/mcp-qa-finite-owner-cleanup-native.test.mjs (dos logs, no decisiones). No se modifica finite-owner-io-fanout.mjs. Todos bajo test/fixtures; Root debe fijar la lista definitiva tras preflight, antes de escribir. Qualifier temporal nuevo .github/workflows/afw-finite-budget-qualification.yml, retirado terminal. Reportes/briefs/ledger de ESTA unidad separados del plan anterior. No usar un facadetest exportado en lib/ para evitar el flujo genuino.

Buildercheck fresco antes del plan: preguntas importantes sobre medición/premisas/agrupación; Root responde las ya resueltas y decisiones técnicas delegadas, no consulta al owner ausente por rutina. Luego writing-plans y SDD secuencial con un escritor Source y gates de tarea +revisión conjunta. Preservar BASE y cadaCAS/readback; rollback sólo cambios propios, sin reset/force/eliminar historia. RamaSource existente está aislada de main y se preserva cloud; no clone local.

Cierre de unidad: diagnóstico atribuible con límites/casos/readback reales y consola segura, ambas facetas calificadas por separado, código productivo exactoBASE, reporte honesto de lo que no midió. Puede cerrar M3 y parte de M1/RM2/M2 según evidencia; NO cerrar RM3 de viabilidad operacional ni RM4 de warnings por un verdeSYN. RM1 histórico permanece excepción. No reclamar ahorro, cuota disponible, reparación de5065ms, ejecución CodexCloud/PCoff o las fases futuras no implementadas.


## Scope, scheduling and handoff
Root must accept exact whitelist first; proposed candidates budget-world/native.test + minimal declared SYN fixtures; custody helper/test under preceding ruling; TEMP and NEW report docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md. Collector/evidence/descriptor/Task1pure changes require concrete justification/Root ruling and covering check. Never alter lib/worker/package/lock/config/SDK/pin/API/finite-owner-io-fanout; no product fixes under test task. Private custody and exact original clocks mandatory.
Do not start full native16 before staged static/pure/preflight and inactive seven-job orchestration are reviewed by Root. No automatic repeated expensive900s runs or rerun failed jobs. If setup/margin fails, preserve and STOP; Root decides any next reason. No Sourcewrites during any qualification/review. Shared clock-sensitive probes require Root scheduling; ORD-1 separate branch may run during Task2 preparation, never during final16 critical clock window. Owner asleep/unavailable before12Nov11UTC (08Argentina); no human needed by this task.
Read skill SDD implementer contract/TDD/systematicdebugging as applicable; no helpers/reviewers/subagents. Before any Source CAS protect everyBASE2unlisted leaf/mode; verify actual branch, parent/tree/fullreadbacks. Preserve rollback via own exact changes, noforce/reset/deletehistory/merge/deploy/main. Report full source/revision/tests genuineREDorBASEcontrol/runs/eachjobactualcounts/artifactIDs/hashes/expiry/firstretrieval/clockmargins/unknowns/concerns. Return concise status/commit/test/concerns, full report at fixedTask2path. Initial response is ONLY preflight, not implementation.
