# Finite Native Budget Qualification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Calificar diagnóstico atribuible y límites nativos readonly/reduction del ciclo aceptado, sin modificar lógica productiva.

**Architecture:** Reusar productores/SDK y recuperación nativa; instrumentar sólo la compilación SYN con captura por scope real y mantener resultado/promesa originales. Separar colector puro de escritura Node y límites de las dos facetas; aceptar tareas por separado y revisar conjunto. No optimización/caché ni rutina real.

**Tech Stack:** Node22/currentlock, esbuild/Miniflare/workerd, SDK1.2.1 fijado, GitHub connector/Actions; cero clone/deps/build/test locales.

**Spec:** docs/superpowers/specs/2026-11-07-finite-native-budget-qualification-design.md @ec3b7d6806cc152fd369ea7512b21a525cd7e455/blob733462fec3b8f40f8ca762c9df9a378a77e28415 (24031chars). Buildercheck fresco resolvió su única pregunta mediante dos consumidores preC0 y concluyó nothing important left. Root aprueba bajo delegación/opt-out del owner, no atribuye aprobación humana de este documento.

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

## Review Focus

1. Settlement tardío bajo otro request/worker: atribución se conserva desdeentrada sin global mutable compartido; Q3 y P1.
2. Diagnóstico duplicado/overflow/datos sensibles: no dobleconteo, fuga o cambio de resultado; Q1/Q2/Q5/Q6/Q7.
3. Opaque native bytes vs cero y cancel pendiente: no inventar wirecost/drain/pico desde promedio; Q4/Q8 y P1.
4. Lookup con200gets/2páginas y cola expirada: no tercera lista ni lateReference/replay; R1/R2/R3.
5. Delete final consumeeltope200 y operaciones en cola tras timeout: no grant201, tercerlist o nuevaemisión; D1/D2/D3/D4.

---

## Estructura e interfaces compartidas

### Archivos y responsabilidad

- NEW test/fixtures/finite-budget-diagnostics.mjs: colector puro/seguro para compilar en worker SYN; no fs, acceso a red ni autoridad.
- NEW test/fixtures/finite-budget-evidence.mjs: escritura/hash/resumen Node-only.
- NEW test/fixtures/finite-budget-world.mjs: hooks de compilación y controles SYN fijos, productor/consumidor CLI; no engine duplicado.
- NEW test/finite-budget-diagnostics.test.mjs: ocho contratos puros.
- NEW test/mcp-qa-finite-budget-native.test.mjs: registro selectivo por AFW_BUDGET_GROUP.
- MODIFY test/fixtures/finite-owner-cleanup.mjs: plumbing de instrumentación/colector, modos SYN necesarios, consola acotada; retornos completos preservados.
- MODIFY test/fixtures/finite-owner-cleanup-persistence.mjs: opción diagnóstico/checkpoint y logging; no nueva recuperación overdue ni grupos históricos cambiados.
- MODIFY test/fixtures/finite-initial-entry-world.mjs: plumbing opt-in de presupuesto e instrumentación en hooks esbuild existentes.
- MODIFY test/fixtures/finite-first-connection-publication.mjs: plugin M opt-in; default y negative spy exactos.
- MODIFY test/mcp-qa-finite-owner-cleanup-native.test.mjs: sólo dos logs directos posteriores a writer, sin registro/assert/decisiones cambiados.
- NO modificar finite-owner-io-fanout.mjs; su instrumentación no es el seam escogido.
- TEMP .github/workflows/afw-finite-budget-qualification.yml; sólo push filtrado a rama Source + este único path temporal/contents:read, retirar antes de cadaentrega.
- REPORT docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md y task2.md. El Source escritor no escribe ledger/briefs Root.

El preflight enumera quéconsumer lee logs y los hooks exactos por módulo; Root cierra whitelist antes de Sourcewrite. Un archivo fuera de mapa requiere ruling previo. lib/worker/package/config/Core exactos a BASE.

### Colector (Task1 produce; Task2 consume)

Export createBudgetDiagnostics({testRevision,workerRole,maxEvents=16384}). testRevision es GITHUB_SHA40 real de esta calificación (distinto del sourceRevision semántico SYN). workerRole enum QA|M|fixture. Devuelve sólo métodos de observación y snapshot, no ningún permiso:

- root(nativeObject,{phase,deadline,kind})→opaqueRootRef|null. kind control|transport; deadline número observado o null.
- child(rootRef,nativeObject,{deadline})→opaqueChildRef|null.
- begin(rootRef,childRef|null,{phase,resourceClass,operation,at})→opaqueOpRef|null.
- bytes(opRef,{length,chunks,durationMs})→void.
- logical(opRef,{at,reason})→void.
- cancel(opRef,{at,stage})→void, stage started|settled.
- settle(opRef,{at,status})→void, status fulfilled|rejected.
- snapshot()→DTO saneado {purpose:'afw.finite-budget-diagnostics.syn.v1',testRevision,workerRole,rows,totals,byPhaseResource,coverage:{overflow,invalid,unattributed,nativeBytesUnavailable},operationalReadiness:false,completePackage:false,PCoff:false}.

Identidades weak por objeto real capturado; handles sólo datos locales. Root/child/op ordinals generados internamente, entrada fija captura fase, sin reatribución a fase global futura. Fases exactas: setup,authorize_get,authorize_post,sdk_lookup,token_exchange,mcp_read,monitoring_get,monitoring_post,cleanup_before_restore,restore,sdk_reduction,final_inventory. resourceClass exactas del spec. Cambiar enum sólo por ruling y test correspondiente.

Export observeBudgetPromise(collector,opRef,promise)→la MISMA promise. Observación pasiva de settlement, catch de su propia cadena, sin await/wrapper que sustituya el resultado ni apague error nativo. Errores/overflow de sensor no cambian negocio: invalid/overflow explícitos y testdiagnóstico falla. No getter/cuerpo secreto. Datos byte no expuestos por API tipada (p.ej. SQL/KV) son null con razón fixed not_exposed_by_native_api, nunca0ni stringify delobjeto para fingirwirebytes; artifactSerializedBytes, si medidos, son contador distinto. zero unknown sólo requiere atribución de operación en alcance fijo, no inventar bytes nativos opacos.

### Evidencia (Task1 produce; Task2 consume)

Export persistBudgetEvidence({path,full,testRevision,caseName,counts})→{path,bytes,sha256,summary}. Node-only; path fijo bajo output/finite-budget/,output/owner-reference/ ooutput/owner-cleanup/ según caller existente. No cambiar rutas legacy ni arbitrarypath. Serializar JSON completo saneado una vez, escribir esos bytes, hashear los mismos, luego resumen UTF8≤2048B conpurpose/source/case/estado/counts/ruta/bytes/SHA. No truncado arbitrario deJSON. El caller conserva full como retorno/artefacto; no lógica productiva lee summary.

### Fixture/CLI (Task1 produce; Task2 extiende)

ownerReferenceFixture(t,{cleanupCheckpoint=false,budgetQualification=false}={}) conserva comportamiento default y pasa opt-in al montaje; nada del flagautoriza lib. El modo compilado activo aporta observaciones completas a recordOwnerReference, conservando sus campos/retorno previos. La consola de helpers R1/R2 usa el escritor seguro también para otroscaller existentes; registrar adaptación necesaria de parsers, no cambiar decisiones.

finite-budget-world.mjs exporta instrumentBudgetDiagnostics(source,{moduleRole}), extendBudgetQualification(entry), prepareBudgetProducer(kind,root), verifyBudgetCheckpoint(kind,root), runBudgetConsumer(kind,root), con kind positive|reduction. CLI archivosinvocados node test/fixtures/finite-budget-world.mjs prepare-positive|prepare-reduction|verify-positive|verify-reduction <ruta>. No node --input-type=module para lanzar código que usaMiniflare.

prepare positivo usa pipeline aceptada completa+same checkpoint; reduction usa produceCheckpoint(...,{unexchanged:true,deferWait:true}) con plumbingdelopt-in, Sourcegrant auténtico presentealC0. recoverCheckpoint sin restart:true para todos: ≥30s antesC0. Actor/alarm/Source/code/storageclocks originales; no pendiente-segunda-pareja overdue.

AFW_BUDGET_GROUP enum red|readonly|positive|reduction_a|reduction_b. red registra sólo R0; readonly R1/R2/R3; positive P1 en consumidor; reduction_a D1/D2; reduction_b D3/D4. No default queejecute todos accidentalmente; grupo inválido falla antes deI0. Pure8 archivo separado. Task1 no registra límites aún implementados como controles nuevos.

## Task 1: Diagnóstico atribuible y salida completa con consola acotada

**Independiente:** deja medición y evidencia utilizables sobre el flujo aceptado, aunque después no se apruebe la calificación de máximos. BASE29681cae fijada por Root antes del escritor; Scope10files previstos+report/TEMP, producción intacta. No implementa nuevos límites ni optimización.

- [ ] Preflight READONLY: leer diseño, SourceAGENTS apartados aplicables; comprobar ref296/tree/protectedleaves y consumidores/hooks exactos. Entregar a Root la lista cerrada, qué interfaz hace cada captura y cómo evita global fase mutable. No Sourcewrite hasta ruling.
- [ ] Escribir R0 primero en native.test sin importar helpers nuevos: usar BASE ownerReferenceFixture(t,{budgetQualification:true}) (opción ignorada enBASE), prepareOwnerReference/issue/assertActualComplete/recordOwnerReference existentes. Tras actual SDKcomplete normal+Reference302, capturar resultado yconsole. Afirmar diagnóstico atribuible completo/resumen≤2048. Esperado actualBASE: falta diagnóstico y/o línea larga DESPUÉS de efectos observados, no import/setup/SourceClock. Guardar SDKcomplete1/Reference/hash/status antes delassert.
~~~js
const f=await ownerReferenceFixture(t,{budgetQualification:true});
const p=await prepareOwnerReference(f),response=await p.issue();
await assertActualComplete(f,{reference:true});
assert.equal(response.status,302);
const result=await recordOwnerReference(f,'budget-red-after-real-complete');
assert.equal(result.diagnostics?.purpose,'afw.finite-budget-diagnostics.syn.v1');
~~~
- [ ] Qualifier temporal RED1job≤7min, Node22/currentlock/contentsread; AFW_BUDGET_GROUP=red node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs. Esperado1FAIL por déficit real; exactgraphs/metafiles/nativefacts/outcome+manifest7d/uploadreadback. Root valida causalidad antes de implementación. No C0wait ni REDhistórico.
- [ ] Implementar colector/evidence/fixtureinterfaces anteriores, marcadores exactos previosI0, nativeRoot/child/phase captura fija. No bodies/URL/token enrows. Collector/evidence nofs enworkergrafo, no arrays fuente sincap. Preservar resultado ypromesaoriginal.
- [ ] Añadir Q1..Q8 exactamente (los testnames llevan prefijo Qn y descripción delspec); ocho tests, cadauno conasserts conductuales:
~~~js
// Q1 projection redacts: secret marker absent from JSON; only enum/hex/ordinal fields.
// Q2 counts: one native begin/settle =>1; duplicate settle cannot create2; totals/byPhase agree.
// Q3 attribution: rootA/phaseA enters, rootB enters, lateA settles =>rowA stillA, no global currentPhase.
// Q4 logical != native: logical denial while native pending; cancel started !=cancel settled.
// Q5 identity: observedPromise===actual; same resolve/reject; diagnostics cannot invoke business operations.
// Q6 cap: 16385events =>overflow true/rows<=16384; native output unchanged.
// Q7 evidence: Buffer.byteLength(summary,'utf8')<=2048; SHA/bytes equal writtenfullJSON, full preserved.
// Q8 scopes: unavailable wirebytes=null/reason; concurrent intervals peak observed; duration sum notwall.
~~~
- [ ] Ajouter P1 sobre productor actual hasta SDK/token/MCP/NoticeLink, frío luego originalalarmC0; en consumidor assertmetrics Source/phase/resource/roots/children/opordinals, sin unknown/overflow, sumsdenominadores correctos, bytescoverage honesta, callbacks/métodos originalesretained, oneRestore/SDKreturn/receipt/Statecomplete/alarmnull. Capturas de todaslas fases antes/después deI/O, grafosreales y namespacealiasproof. No data snapshotsembrado.
- [ ] Task1GREEN coherentemismaSource:8pure+P1=9PASS/0FAIL/cancel/skip/todo; tresjobs pure→positive_prepare→positive_consume (pure≤2min,losotros≤15). Solo unlinajegenuino/2grafos; actualC0natural900s. Sintaxis node --check y ESLint changedfiles0errors; warningsregistrados. Comandos:
~~~sh
node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs
node test/fixtures/finite-budget-world.mjs prepare-positive output/finite-budget/checkpoint
AFW_BUDGET_GROUP=positive node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs
~~~
- [ ] Verificar cadaupload desde ID/run descargado: pathlist exacta, source/bytes/SHA/nativefiles/scripts/metafiles/metrics/console, ningunarchivoextra; se mantienen artifacts7d, noextractlocalDB. Preservar source/script/graph/counters/timestamps y no venderlascomoCFreal.
- [ ] Self-review todoBASE..HEAD; Core/protectedtreeexactos, aliases/queues/readerssinmodificación. Retirarqualifier sólo trasterminal, commitappendreportTask1 con comandos/nombres/outputs/cambios/concerns/costos/limitaciones/refs. CAS/readbacks y STOP. Root taskreviewSpec+Quality antes deTask2.

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

## Revisión de cobertura del plan

Specintención/optout/alternativas: header ydecisiónRoot; sinimplementaroptimización. Diagnóstico/identidades/bytes/cancel/capsQ1–Q8+P1 enTask1, capasdedatosyNodefsseparadas. Consolaartefactos/retornos/readback Task1yTask2. ReadonlyboundsR1–R3y reducciónD1–D4 Task2 sinmezcla. Agrupacióncorregida7jobs/margenes/5lineages10graphs yFuente/C0/C1 protegidos explícitos. Reportes/rollback/protectedtree/STOP enambastareas; cada tarea es independiente ypuede serrechazada separadamente. ReviewFocuscadauno tienepruebaasignada. Tipos/interfacesmethodnamesconsistentes; Task2 no requiere APIs noinventariadas. Planmáscorto queespecificación,no transcribe algoritmo. PendientesRM1histórico/RM3operacional/RM4warnings no maquilladosporverde; se informasuimpacto real.

## Método y continuidad

RooteligeSDDpor dosentregables independientes con riesgosdeatribución/retención que merecenfreshgates. Decisióntécnicabajodelegación,nosepideconfirmaciónrutinariadeowner; costo: dosasientosimplementación+reviewyfinalgate. Task1implementerstandardcapable (gpt-6.1-sol/high), reviewersegúnriesgo; Task2freshimplementer, no doswriterssimultáneos. Elrevisor finalmáscapableAstra segúnskill. Si surgebloqueoirreversible/seguridad/externofueraautorización, prepararconcreto ypediralownerdespués19:30UTC; nofabricar consentimiento.

Workspaceadaptacióncloud: ledger docs/superpowers/progress/2026-11-07-finite-native-budget-qualification.es.md, briefs/reports/reviews deestaunidad; no scriptlocalgitworktree ni borradoRootdocs. Sourcebranchremotaaisladademain, preservarmaterialválido. Rulings/preflight/estadoexacto guardadosantesdeimplementer. No release/main niPCoff proclamadosalacabarunatarea. Usar evidencebeforeclaims yfixloopinstaladoporcadagate. ObjectiveAFWrealcloud/PCoff/Max siguependiente.


## Ruling de preflight Task1 incorporado

Root acepta los12paths cerrados (5nuevos test/helpers,5modificados test/fixtures+caller,1TEMP,1reporte), Mcompiler opt-in yconsolecaller R2; no producción. Carrier SYN ALS con storesinmutables+weakactualidentities dentrodearchivospermitidos, run devuelveexactaretornopromise, observaciónpasiva/snapshotcapturado para thenables, sin flags/compat/deps nuevos ysin getStoreausente convertido enRootficticio. Hookallowlist/markers/grafos completosverificadosantesI0, composiciónsobrefuenteYApreparada; leaf noatribuido detiene, no zeroUnknowninventado. Especificación última ec3b7d68 esautoridadsi unmapa anterior difiere.

Autorizar inicialmente sólo nuevo native.test+TEMP para R0 conimportsBASE. Preservarnativecomplete1/Reference/status302/grafos/metafiles/facts/outcome+manifestantesassertdiagnosticause. No D1DBarchiveobligatorioenREDforward; sí coldstatecompletoenGREEN. RootdebeaceptarREDantescolector/instrumentación. No codewriteconrunactivo. Refs/rulingsenbriefactual+ledgerdeestaunidad; owner nointerviene.

## Corrección de disparador CI — Root7Nov18:18UTC

Root verificó primaria previa: run42390108314.event=push; su qualifier usa sólo on.push.branches:[feat/finite-native-cleanup-20261101],paths:[su propio archivo temporal]. workflow_dispatch-only del plan nuevo fue una elección de planificación, no regla de AGENTS ni permiso operacional. El conector carece de dispatch y no hace falta una sesión UI.

Se autoriza el MISMO mecanismo para ESTA unidad: on.push.branches exacto feat/finite-native-cleanup-20261101, paths exacto .github/workflows/afw-finite-budget-qualification.yml; contents:read. Cada cambio consciente de ese TEMP inicia una sola calificación del SHA nuevo; no otras rutas/ramas/default-main/cron, no UI/auth ni trigger de producción. Test checkout github.sha/persist-credentials:false/fetch-depth:1; congelar Source desde el commit activador hasta terminal. Código/helper/report changes no disparan por el filtro. Quitar TEMP al entregar elimina futuras invocaciones. No actualizarlo con un run activo.

Root comprobó0runs para staging manual b90221f7d935374a6b6519b3873f61cc232b04b5 a18:17:19UTC y no pulsó UI. Autoriza liberar esa espera pre-dispatch exclusivamente para UNA modificación del MISMO TEMP: header push + readback completo que faltaba. Writer debe comprobar de nuevo0runs antes de mutar; si apareció uno, STOP sin duplicarlo. Testblob4cec9ca554f58cf7238272ac287814c22878a592 y los3179BASEleaves permanecen exactos, nueva revisión quedará fijada como Source del RED. No helpers hasta Rootacepte causalRED.

R0upload debe tener id y siempre descargar ESE artifact-id del MISMO run a runner.temp, verificar manifestSource/run/attempt y lista exacta de payloads/grafos/inputs/bytes/SHA, SDKcomplete1/Reference/302/expectedDeficit y NODEexit1/TAP1fail por el assert previsto. Un setupfail no es causalRED. No inferir integridad desde la copia anterior alupload. Readback se ejecuta aun con el test fallido; jobglobal quedaFAIL esperado. Archivos/schemas/desglose precisos se fijan en elTEMPantes de disparar; graphfile set real se contrasta contra los metafiles, no se omite. Sin secrets o downloads locales.

Ruling: corregir el inicio a push estrictamente filtrado y añadir readback al mismoTEMP — reproduce infraestructura ya probada sin sesión humana ni nuevo permiso — costo si esincorrecto: un evento inesperado puede abrir calificación; filtros, CAS, revisión previa0runs, freeze y posterior retiro impiden repetirla a ciegas.

## CURRENT Task1 revision — 11 Nov 2026: bounded observer plan (prepared, not yet released)

**Spec:** docs/superpowers/specs/2026-11-11-finite-budget-bounded-observer-design.md @133f2a3303ee0df531a0961319ec9e47c3f225c3/blob36be7c68eb11fcbf0eb076cfb200f06d1721451a. This supersedes ONLY Task1's scalar event-call cap/full-retained-trace requirements and the related constructor/DTO/verifier contract when Root explicitly releases its implementation. All original business, native source, role-map, clocks, SDK, artifact and later Task2 constraints remain. Reader fixture exclusion fix is being verified first; this amendment alone is not Source mutation authority.

Owner opted out of further routine decisions and delegated execution; Root selected the design, fresh builder returned3 planning questions, all settled in that spec. Reversible cloud-isolated implementation uses the existing SDD plan/ledger and SAME incomplete Task1; do not create another competing workspace or redispatch accepted work.

### Global constraints for the revision

- No lib/**, worker/**, production configuration, package/lock, SDK, compatibility or external API changes.
- Fixed caps: operation trace rows16384, logical guard event rows16384, enumerable scope metric rows16384 per collector. These are record-count bounds, not a promised number of RAM bytes or total provider traffic.
- Validated root/child/operation/body-owner identities stay in weak identity stores independently of whether a DTO row is admitted.
- Weak metadata follows native key/callback lifetime and creates no new strong native history; do not claim an absolute RAM bound.
- ALL observed scope metric rows must be enumerable for observedMetricsComplete in qualification; any scope-row omission fails P1.
- Native phases, deadlines, identity/dedup, promise/this/args/return/error and guard behavior remain unchanged; data never grants authority.
- Keep original Root≤30000ms, child≤5000ms, C0=I0+900000, C1=C0+180000, genuine originalSDK/Reference/Notice/expiry/cleanup.
- Exact eight Q groups, then independently permitted producer-only diagnostic, then coherent8Q+P1/fulloriginalalarm on one actualSHA/run when released. Do not label the partial diagnostic9GREEN.
- Retained prefixes and all omissions are visible; numeric, unknown, attribution or required-scope loss cannot be waived.
- Source frozen activation→terminal; finite jobs, sameID exact7dayartifacts and bounded≤2048UTF8 loglines; no local clone/deps/build/test, credentials, runtime or main/PR/publish.

### Review focus pinned to tests

1. A new valid lease or late settlement after trace saturation retains actual attribution and native return identity — Q3/Q5/Q6.
2. Equal timestamps with different callback order produce different exact peaks, reconstructed from actual transition ordinals — Q2/Q3.
3. Scope capacity, repeated denied phases and late callbacks cannot fabricate a scoped peak or erase a denial — Q4/Q6.
4. Invalid/no_store/unknown reader site remains incomplete; only the existing explicitly fixture-excluded edge is exempt — Q1/Q5/Q6.
5. Unsafe/nonfinite counters and leaked internal metadata cannot yield a complete observed-metrics proof — Q1/Q6/Q7.

### Source files and responsibilities, exact allowed extension

- Modify test/fixtures/finite-budget-diagnostics.mjs: observer identity, retained-record admission, exact counters and projections.
- Modify test/fixtures/finite-budget-evidence.mjs: Node-only full-trace and observed-metrics verifiers plus existing serialization.
- Modify test/fixtures/finite-budget-world.mjs: compiler/preflight/probe/aggregate schema integration only.
- Modify test/finite-budget-diagnostics.test.mjs: extend existing8Q; no ninth group.
- Modify test/mcp-qa-finite-budget-native.test.mjs: integrate the explicit proof levels while preserving every business/lifecycle assertion.
- Temporary .github/workflows/afw-finite-budget-qualification.yml only.
- Append existing docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md only.
All other Source leaves remain exact against the released BASE; global review remains29681cae2bf1094ec5c66d5b2784254f77bec697..finalHEAD. No new code file or descriptor mutation.

### Interfaces and fixed DTO vocabulary

createBudgetDiagnostics(options) and createBudgetRuntime(options) keep their current APIs and native behavior. New test-only constructor caps are maxRows/maxGuards/maxScopes, each integer1..16384, default16384. Retire maxEvents and the cap32768 diagnosticCandidate/env experiment: their reports/commits remain evidence, not a new production or supported client contract. Reject deprecated candidate env beforeI0; no dynamic cap marker in normal qualification.

Snapshot preserves original purpose/testRevision/workerRole/rows/logicalScopeEvents/totals/byPhaseResource/coverage and false readiness flags. Add retention:
purpose afw.finite-budget-retention.syn.v1; operationRows, guardRows and scopeRows each contain limit/retained/omitted; firstOmission null or {event,ordinal,kind} with kind operation/guard/scope; traceComplete boolean. First omission is recorded at the real collector event with deterministic scope-before-operation allocation order when both occur in one begin. Coverage.overflow remains visibly equal to any retention omission; do not clear it to get green.

Nested chronology purpose becomes afw.finite-budget-chronology.syn.v2, with actual eventCalls/byEvent/fixed reasons/site provenance and firstInvalid. Relation keys are beforeRetentionOmission/afterRetentionOmission, explicitly relative to first omission; retire misleading firstOverflow/call-count limit fields in v2. Reader-origin arrays and firstdetail use the same new relation vocabulary. Historical v1 reports remain unchanged.

Every operation row has enteredEventOrdinal and settledEventOrdinal(null while pending), from the ORIGINAL begin/settle event counter, never an extra increment. Immutable captured identity/phase/deadline/fetch-link fields remain. Private aggregate linkage is nonprojected and cannot leak native refs, WeakMaps, internal objects, functions or capabilities.

coverage adds numericOverflow and observedMetricsComplete. The latter is bookkeeping completeness over observed invocations only: zero invalid/unattributed/unknown/unresolved/identity loss, no numeric overflow and scopeRows.omitted===0. It does not assert a complete raw trace or coverage of uninstrumented code. The Node verifier computes and validates these conditions independently of a claimed boolean.

Node-only exports in finite-budget-evidence.mjs:
verifyObservedBudgetMetrics(snapshot) -> safe proof object or AssertionError;
verifyCompleteBudgetTrace(snapshot) -> safe proof object or AssertionError.
Proof purpose afw.finite-budget-metrics-proof.syn.v1, explicit level observed_metrics or complete_trace, traceComplete and false readiness flags. No optional ignoreUnknown/skipScopeLoss or other weakening switches.

Observed verifier validates schema/enums/safe counters/source/role, totals=phase-resource sums=all enumerated scope sums, pending/settled/rejected/logical/cancel distinctions and active/peak bounds. Retained operation rows form an admitted prefix: each retained read/cancel fetch parent must still be found and match; omitted later operations cannot be backfilled as earlier rows. Do not require retained row totals equal all-operation totals when omissions are explicit. Complete verifier additionally requires traceComplete and exact reconstruction from all rows/guards/scopes, including event-ordinal peak replay. Durations remain based on native times with appropriate numeric precision; no inference from averages.

Distinct denied Root/child/phase scopes are tracked independently of retained guard-prefix rows, using fixed phase masks on canonical weak scope state. Strong enumerable scope table is capped; omitted scopes are counted once per actual distinct scope, not per event. Actual missing scope causes an incomplete proof. Totals/fixed enum groups still update without creating an unbounded strong history.

### Task1 revised steps (same task, sequential release gates)

- [ ] 1. Bind the post-reader-fix cleanup BASE, read original constraints and revised spec, scan shared interfaces and record rulings before Source edits. Prepare a task brief with these exact values; no implementation from a draft.
- [ ] 2. Extend existing Q groups with the named cases. Q6 must first demonstrate the old coupling: after >16384 API calls, admitting a new legitimate Root is required even when maxRows is small; old observer returnsnull and the intended assertion fails. Include explicit bounded retained/omitted counts and original outputs. Avoid a missing-import/syntax RED.
- [ ] 3. Run ONE pureRED (8groups/7PASS/1intendedFAIL/0cancel-skip-todo) on unchanged observer, archive and exactsameID read back. It opens no I0. On wrongcause stop/preserve; no blind retry.
- [ ] 4. Implement the separated observer and Node verifiers, preserving existing body/lease associations and the measured fixture exclusion fix. Add small-cap known-value cases reconstructing both full trace and aggregates; unretained late completion/idempotent duplicate settle; two interleaved Roots and crossed links; equal timestamps/different event order; distinct-denial masks after guard omission; allscope-loss failure; privacy/accessors/site provenance and numeric-helper boundary tests. Keep8Q total.
- [ ] 5. Run node --check and npx eslint on all changedmjs files, node --test test/finite-budget-diagnostics.test.mjs exactly8PASS, and node test/fixtures/finite-budget-world.mjs preflight-budget. Check original130path/635group/54readerSite closed mapping and both graphroles beforeI0. Node-only verifiers must not enter Worker bundles.
- [ ] 6. ONE producer-only diagnostic under the ordinary fixed record caps. Reuse original file/setImmediate CLI/produceCheckpoint principal,budgetQualification:true,deferWait:true. Dispose beforeC0, preserve original clocks and provenance; report actual trace omissions and observedMetricsComplete for each actual epoch. No extra native work to force saturation; pure small-cap cases cover that if native caps are not hit. Required gate before fullP1 is zero genuine invalid/unattributed/numeric/scope loss and original SDK/Reference/Notice facts, not merely a successful job exit.
- [ ] 7. Preserve full safe JSON/graphs/provenance/7dayartifact/readbacks, append report, retireTEMP, verify full tree/protected/main/ref/blobs and STOP for Root causal ruling. Root resolves any real remaining defect; do not launch fullP1 on an incomplete diagnostic.
- [ ] 8. After explicit Root release, recreate only TEMP for coherent fullqualification on one actualSHA/run: pure8Q/preflight→positive_prepare→positive_consume, exactly3jobs, one original lineage/two original graphs. Reuse actual producer/consumer/checkpoint/alarm and all original business assertions; no clock refresh or fake cold reconstruction. Original minimum900s remains. This repeats pure checks for the new actualSHA, not the previously accepted old56.
- [ ] 9. Native P1 calls verifyObservedBudgetMetrics for every actual producer/consumer epoch and verifyCompleteBudgetTrace wherever traceComplete; retains all existing lifecycle/revocation/native SDK reduction/final inventory/receipt/alarmnull assertions. Validate covered phases from exact fixed aggregates when the raw prefix is incomplete; report explicit proof level and omitted counts. Exact9PASS=8Q+P1,0fail/cancel/skip/todo, original3jobs, all exactsameID uploaded/downloaded artifacts on that actualsource/run. No full-trace claim for a truncated epoch.
- [ ] 10. RetireTEMP, append evidence, verify allprotectedleaves/main/fullreport/ref and stop. Generate a fullGLOBALBASE..HEAD review package, fresh Spec+Quality taskreview, no reviewer test reruns on already qualified code. Task2 cannot start until that gate is clear.

### Plan self-review and applicability

This supplement changes only observer evidence semantics and explicitly names the cost of incomplete raw trace; no business guard is weakened. All3 builder questions are answered in the spec and tests above. File/interface ownership is single-writer; pure and native share the exact same DTO schema and Node verifiers. The reader-provenance/exclusion work must finish first and its latest fixed site map remains mandatory. Original Task2 readonly/reduction business cases and finalcombined review remain pending and unchanged, with their future brief updated to consume this interface after Task1acceptance.

Prepared by Root using writing-plans under owner's explicit autonomy. Source implementation remains unreleased until the current reader fix is observed and Root supplies a precise brief/BASE. No user confirmation or expiring human window is needed for this reversible SYN work.
