# Finite Native Budget Qualification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Calificar diagnóstico atribuible y límites nativos readonly/reduction del ciclo aceptado, sin modificar lógica productiva.

**Architecture:** Reusar productores/SDK y recuperación nativa; instrumentar sólo la compilación SYN con captura por scope real y mantener resultado/promesa originales. Separar colector puro de escritura Node y límites de las dos facetas; aceptar tareas por separado y revisar conjunto. No optimización/caché ni rutina real.

**Tech Stack:** Node22/currentlock, esbuild/Miniflare/workerd, SDK1.2.1 fijado, GitHub connector/Actions; cero clone/deps/build/test locales.

**Spec:** docs/superpowers/specs/2026-11-07-finite-native-budget-qualification-design.md @32e75999e36b0c8f6c60ffb16d13fe980900ece0/blobbef5563af032c433aaff498e730a9429e8220e0d (20408chars). Buildercheck fresco resolvió su única pregunta mediante dos consumidores preC0 y concluyó nothing important left. Root aprueba bajo delegación/opt-out del owner, no atribuye aprobación humana de este documento.

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
- OPTIONAL test/fixtures/finite-owner-io-fanout.mjs sólo si preflight demuestra seam necesario; no alterar otros modos por conveniencia.
- TEMP .github/workflows/afw-finite-budget-qualification.yml; sólo workflow_dispatch/contents:read, retirar antes de cadaentrega.
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

Export persistBudgetEvidence({path,full,testRevision,caseName,counts})→{path,bytes,sha256,summary}. Node-only; path fijo bajo output/finite-budget/. Serializar JSON completo saneado una vez, escribir esos bytes, hashear los mismos, luego resumen UTF8≤2048B conpurpose/source/case/estado/counts/ruta/bytes/SHA. No truncado arbitrario deJSON. El caller conserva full como retorno/artefacto; no lógica productiva lee summary.

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
