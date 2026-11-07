# AFW — Task1 brief: attributable diagnostics and bounded evidence

Read this first — requirements and exact values live here. PROJECT AFW; repo tokenizartinfo-ops/agent-friendly-web/public1347578006. Source branch feat/finite-native-cleanup-20261101 BASE29681cae2bf1094ec5c66d5b2784254f77bec697/tree0200cf32ac4e020bd35c56c307fbc8060cf8bd64,3179leaves. Rootdocs docs/finite-pcoff-continuation-20261103. SoleSourcewriter finite_budget_diagnostics_impl, nohelpers/reviewers. Rootsuppliesreviewseats.

CURRENT preflight CLOSED by Root after your NEEDS_CONTEXT. Bindingdesign specs/2026-11-07-finite-native-budget-qualification-design.md @ec3b7d6806cc152fd369ea7512b21a525cd7e455/blob733462fec3b8f40f8ca762c9df9a378a77e28415; plan plans/2026-11-07-finite-native-budget-qualification.md @7e3ee0881f058787e4957dd278c39382647d21d5/blob787daaf88537a46be7359ffa96b4dac521bc1ae7 (pathsrelative docs/superpowers). Task1alonebelow; nowholepriorplan. Currentnewledger progress/2026-11-07-finite-native-budget-qualification.es.md (Rootdocsd236d1f1 initialblobf8a8415d); forthcomingpreflightrulingappend. NoSourcewritebeforethisRulingalreadyoccurred.

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


## Root interface rulings for this task

- FIRST action is READONLY preflight. Verify Sourcehead296/Maincurrent, SourceAGENTS applicable Scope/Truth/Security/Engineering (blob b67942223e5633011573f2a2165489afd9ff3f67; approximate lines283–354). Identify exact hooks, every file you need, any logging consumer, how phases/scopes are captured without global-current-phase and how R0 reaches actualSDKcomplete with BASEimports only. Return NEEDS_CONTEXT with concise closed filelist/seams/risks; STOP Sourcewrites until Root ruling. Do not create a temporary workflow in this preflight.
- Source is ALREADY isolated remote feature branch, not main, with exact accepted56/56 codebaseline; no localclone/worktree/deps/build/test/fullsuite baseline rerun. Smallskillreads allowed. Heavy work only GitHub/Actions. Do not execute native tools locally to simulate Cloudflare.
- Task1 kind/group validity is positive (and redfocal) only. Planned future readonly/reduction groups must fail unsupported before I0 until Task2 extends them. No stubsuccess/zero-test green. Do not create the R/D modes yet; do not change the private facets.
- Nodeevidence writer is separate pure-workercollector; graph must prove fs did not enter worker. Phase attribution comes from actual source callsites/native lease identities captured atentry; a global mutable phase is not acceptable. Data transport without controlRoot remains separate. Nativeopaque bytes are null/reason, not zero/serializedwireestimate. Snapshots never used as businessauthority.
- No source/authtime/expiry refresh to make a testpass. Keep actualpromise identities andretention, exactSourceguards. No extra Root/alarm/controller APIs. Default fixture paths continue their actual semantics and full return values, with only console summaries changed after preserving full artifacts.
- R0 RED uses EXISTING BASE helpers, can pass budgetQualification:true because BASE ignores unknown option. Native.test RED imports BASE only, no new missinghelper/module. Require SDKcomplete normal1 +Reference durable +302 before asserting missing attribution. Preserve facts beforeassert. A setup/import/hash/Rootceiling failure is NOT causalRED. Root accepts observed RED before implementation; if real precondition fails, report sane detail without broadretries.
- Temporary workflow .github/workflows/afw-finite-budget-qualification.yml; no secrets, contentsread, workflow_dispatch only. FreezeSourceforrun, no commitwhileactive. Implementer may dispatch scoped credential-free cloud qualification understandinguserauth, no newuserchat. No providerAPI/runtime/changingpermissions/OAuth/Max/mail/main. Scoped9GREEN not fullprior56.
- Final report in Source docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md. Include exactBASE/HEAD/tree/blobs, everychangedpath/protectedleafproof/CAS/readbacks, sourceSYNgraphs/metafiles/sourceinputs/nativefiles+manifest/actualtimings/counters/causalREDandGREENrun/jobs/commands/counts/status/artifactIDs/bytes/digests/expiry, failedhistory andwarnings. Distinguish nativefacts/SYNinputs and all unmeasuredrealproviderlimits. Show zeroerrors notfalsezeroWarnings. No source/reportcommit selfhash impossibleinsideitself; returnfinalrefseparately afterindependentreadback.
- After terminal9/9, retire qualifier, append report, verifySource/main/protectedtree/fullcontent/blob/ref, STOP WRITES. Root sends fresh Spec+Quality taskreview. Return only DONE|DONE_WITH_CONCERNS|NEEDS_CONTEXT|BLOCKED, exactHEAD/tree/reportblob, one-linechecks andconcerns, not giantlogs.
- Before fixing feedback use Root-driven installedfixloop; do not spawn a reviewer. No Task2/nextunit/sourcewideningwithoutRootbrief. If currentmethod cannot satisfy spec, explain concretecause/options toRoot, not invented success.

## Facts to start from, not claims to repeat

Prior owner-restoration boundedplan7aab..296 accepted task+combinedreviews; Corebyteidentity to final56 tested92d proven. All seven minor findings retained. This task handles attributableSYNdiagnostics/console; operationalquota/RTT/memory/warningsownership/PCoff remainpending. Currentexistingproducer854SYNobservations/1,056,133,138B vs350partialspans/432,841,450B are differentdenominators. No real429 orcredentialsproblem established. See reviews/2026-11-07-finite-current-performance-facts.es.md onlyifneeded, no oldrunreplay.

Owner unavailable before19:30UTC/16:30Argentina, PCstayson. No login/OTP/manualsecrets/consentwindow. operationalReadiness=false;completePackage=false;PCoff=false. No localtemporaryprojectfiles.


## CURRENT Root ruling —7Nov18:12UTC supersedes initial readonly pause

Root freshly read handling-reports.md and accepts your concrete preflight. CLOSED Source list12paths:
NEW test/fixtures/finite-budget-diagnostics.mjs
NEW test/fixtures/finite-budget-evidence.mjs
NEW test/fixtures/finite-budget-world.mjs
NEW test/finite-budget-diagnostics.test.mjs
NEW test/mcp-qa-finite-budget-native.test.mjs
MODIFY test/fixtures/finite-owner-cleanup.mjs
MODIFY test/fixtures/finite-owner-cleanup-persistence.mjs
MODIFY test/fixtures/finite-initial-entry-world.mjs
MODIFY test/fixtures/finite-first-connection-publication.mjs (Mcompiler opt-in/default+negativeprofile exact)
MODIFY test/mcp-qa-finite-owner-cleanup-native.test.mjs (onlydirectlogs22/131, noassert/register/decisionchanges)
TEMP .github/workflows/afw-finite-budget-qualification.yml
REPORT docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md
Do NOT change finite-owner-io-fanout orotherfiles/Core.

AsyncLocalStorage SYN carrier accepted, immutablestore/weaknativeidentities; no globalcurrentPhase, no nativepromise substitution. OfficialWorkers ALS API https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/ supports run returning callback'sreturn andgetStore, butthenablelimitations apply. Verify EXISTINGcompatforEVERYgraph, noflags/date/depschanges; noenterWith/disable. Capturedobservations/snapshot mayhandlethenablesonlypassively. getStoremissing→incomplete, notinventRoot. Carrierwithinallowedfiles/inlinecompiledfixture, no extra pathwithoutRootruling.

Composehooks onALREADYpreparedSource, afterexistingCEILING/firstConnectioninstrumentation. Acceptedexactseams fromyourpreflight: genuineSourceRoot/childobjects inowner-preparation67–98/initial-lease8–17; OAuth648/Notice851/962 andlookup838; actualnativecallsreadonly55/reduction614; cleanup151–155/parentalarm36/finalinventory657; actualfetch/body/cancel/SQL/DO phasecontext70–135/fixedpolicy33–53; Mfetch17–22. Fixedmodule/callsitephase captureatentryandopRefcapturedtosettlement. Completeleafmarkerallowlist/counts/transformedgraphs beforepositiveI0; unexpectedcallsiteunknownstops/reports. SeparateMtransportwithoutcontrolRoot(deadlinenull).

Nodeevidencehelper admits EXACTthreeoutputprefixes finite-budget/owner-reference/owner-cleanup; preservelegacyJSONpaths/fullreturnsemantics, hashactualwrittenbytesbeforeboundedconsole. No arbitrarypath, consolemonkeypatch, new authority orrawsecrets. Yourparsersearchwasbounded; reportonlywhatyouactuallyinspected, notabsenceacrossall3179files.

INITIAL Sourcewrites nowAUTHORIZED ONLY native.test+TEMP tocreate R0 BASEimports/realSDKcomplete1+Reference/302beforemissingdiagnosticsassert. Preserveactualgraphs/metafiles/nativefacts/outcome+manifestbeforeassert; REDforwarddoesnotneedfullnativeDBcheckpoint. GREENcoldcheckpointdoes. Dispatchscopedcredential-freeRED underplan,freezeSourceuntilterminal, then reportSource/run/jobs/artifacts/causalcounts toRootand STOP. Do not implementhelpers/instrumentation beforeRootacceptsRED. AfterthatRootwillresumeyouforremaining12pathwork.

Nohumanstepbefore19:30UTC; no runtime/credentials/sourceclockrefresh/main/Max/mail. AllCoreprotected. This is a technicalsourcepreflightruling, no newoperationalaccess.
