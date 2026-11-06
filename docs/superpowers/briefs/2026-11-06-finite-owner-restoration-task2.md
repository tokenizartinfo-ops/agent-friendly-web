# AFW Task2 brief — native owner cleanup and original-alarm restoration

Read this first — these are your requirements with exact values to use verbatim. Task2 only. Do not restart Task1 or implement later third-CLOSED/prearm/fullsetup/nominal handoff.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (public1347578006); ENVIRONMENT=SOURCE/SYN GitHub+Actions; ORIGIN=GitHub connector; RESOURCE_TYPE=existing isolated Source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=Task2 exact source/tests/credential-free bounded qualification; ROLLBACK=own commits only with CAS/exact sole-parent/path/blob/content/ref readback, preserving history.
Task2 execution BASE2c6b5a0eb503b8d877158f85832c510b9a45f7ca/tree57ac1355a85560dee14b2f933b4b68f877911ae2 (3173 leaf entries). The whole-plan BASE7aab233 named in copied Globals remains historical combined-review start, NOT your starting HEAD.
Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 protected. Root owns only docs/finite-pcoff-continuation-20261103 ledger; you are sole Source writer.

Task1 acceptance: docs/superpowers/reviews/2026-11-06-finite-owner-restoration-task1-review.es.md at40ebf3aa6d9982139f6507336bf352e27c5e9a4f/blob9896fc376075f5fd1bd544864dac8469a25c8692. All current Task1 producer/metadata/Reference interfaces stay intact. No need to load its old implementation history.
Binding design: docs/superpowers/specs/2026-11-06-finite-native-owner-restoration-design.md atead56350882d81e3edf4952cb2658587b5fdd118/blobcf42e203d07a5e528e64eecd239491686cb73021. Read relevant sections4/6/7/8/10 for full state/authority/ordering/nativeC0 requirements; Task1 already resolves section5 producer. Do not load unrelated historical plans.
Plan task/preflight below comes from docs/superpowers/plans/2026-11-06-finite-native-owner-restoration.md at57827023b4ed9ba38470079381a040cac1fc0000/blobbcc66a841f4459b9696d267c89b75185af524e67. This brief is your single requirements source, not an invitation to the whole plan.

## Global Constraints

- PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web (public1347578006). Source feat/finite-native-cleanup-20261101 BASE7aab233741b09f8873bf04831ca2fa9a9c2b1c4d/tree6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3. Rootdocs docs/finite-pcoff-continuation-20261103. Un Source writer; Root sólo docs mientras trabaja. Rollback sólo commits propios conCAS/readback, sin borrar historial ajeno.
- Fuente2026-11-03T02:59:00Z vencida; I0/C0=I0+900000/C1=C0+180000; Root≤30000ms/child≤5000ms recortadas; mismos3slots C0/C0+60000/C0+120000, alarm/actor/counter originales. Sin refresh de Source/Access/identidad/clock.
- No runtime/providerAPI real/remoteDDL/OAuth/OTP/tokens/permisos/cron/Container/nuevochat/mainmerge/Max/mail. SOURCE/SYN yephemeral native artifacts no prueban CodexCloud/PCoff. operationalReadiness=false;completePackage=false;PCoff=false.
- No callbacks/SQL/URL/caller-successDTO como autoridad, store OAuth ordinario, SDKpurge/deleteClient/revokeExistingGrants, permisos por metadata o campos opacos transportables. No retry de SEND incierto ni ACK reconstruido de readback.
- Retener actualPromises y negar lógicamente sin fingir drenaje; holders/clock comprobados antes y después de I/O. No código anterior/bundle viejo para salvar hash, no upgrade deSDK/dependencias, no refactor incidental de phase-context.
- Current scope termina después de NoticeLink y ANTES de terceroCLOSED/prearm/fullsetup/nominalhandoff. Esos estados siguen denegados. Ningún receipt de esta unidad autoriza un ensayo real.
- Conservar MinorM-I/M-II/M-III/históricosM1/M2 yM4closed; no reabrir tareas previas ni ampliar el trabajo para ocultar warnings. No fullsuite por rutina; integración/promoción tienen gates propios.



## Inherited interfaces and Root decisions

- readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId,parent},lease) is the existing PRE-C0 producer reader over private bounded SDK facet. Keep its signature/behavior and its genuine original request Root. Cleanup has its separate observer at C0; do not relax the forward reader to accept cleanup.
- SDK metadata and SdkGrantReference already persist before302. Reference captures SDK createdAt/expiresAt at that historical observation; token exchange may later change SDK expiry or make the SDK grant expire byC0. Use the exact historical SDK selector from native-qualified Reference, not a live-list absence as ACK or D1 UUID as SDK ID.
- Receipt is CURRENT_CYCLE_BUSINESS_CLOSED, with businessAccessClosed true, sdkReductionReturned according to original obligation, globalNativeDrainVerified false and sdkNamespaceEmptyVerified false. Application D1/owner/expiry gates remain mandatory; own unknown reduction/SQL/restore blocks complete.
- Historical normal observations may be revalidated as dated facts during cold recovery. A missing Observed can never be created from a later row/pointer read. Newly held opaque reduction/receipt objects must arise only inside the current genuine cleanup invocation after fresh native qualification; no deserialized WeakMap authority or reconstructed current actual result.
- The positive principal must restore exactly the same original native storage/scripts/IDs/alarm after dispose/flush, without running bootstrap/seed/producer again. Existing f.alarmAt/initialAlarmAt/ownerRead patch clocks and are prohibited for that principal.
- Replica/component matrix assertions follow the untouched principal. Any case needing a pre-C0 operation (late other-isolate token/refresh) must be preloaded and narrowly armed before C0 under its own valid original request budget, with fixed same-checkpoint times/IDs; then its native outcome is assessed after the principal. No long-held15min business Root, no retiming to make expired input live. Bound concurrent native instances and demonstrate original C1/startup/work margin; ask Root for a technical grouping ruling before dispatch if infeasible.
- Preserve Task1's lightweight wait-signal projection. Polling full child/metric/SDK trees plus storage.list every20ms demonstrably prevented two tests reaching their intended fault. Assertions/evidence use full observations, but wait polling must be fixed lightweight signals; do not solve instrumentation load by widening product clocks.
- Original G1 unlocalized5s overshoot and high SYN observation volume remain risks, not solved provider latency/quota. Do not claim current Cloudflare/credentials or operational feasibility.
- Every fixture-only mutation/reconstructed component is labeled; no transfer of its evidence to the positive produced-cycle principal. No generic SQL/HTTP callbacks or test caller success DTO as production authority.

## Task 2: Consumidor integral, mismo alarm y recuperación del ciclo producido

**Files:**
- Extend lib/mcp-qa-finite-owner-cleanup.mjs, manteniendo readonlyfunction deTask1.
- Create lib/mcp-qa-finite-owner-cleanup-records.mjs y lib/mcp-qa-finite-owner-cleanup-journal.mjs.
- Modify lib/mcp-qa-finite-preparation-issuer-store.mjs: método cleanupmonitoring fijo; forward SQL intacto.
- Modify lib/mcp-qa-finite-initial-cleanup.mjs: sólo composición de cierreposterior, misma entrada/contador/restore.
- Create test/mcp-qa-finite-owner-cleanup.test.mjs y test/mcp-qa-finite-owner-cleanup-native.test.mjs; extender fixturefinite-owner-cleanup deTask1 con checkpoint persistido yoriginalalarmreal. Existingfixtures sólo seam mínimo sihacenfalta ypreflightloenumera.
- Existingtest initial-cleanup-native seleccionados2 ypreparation-issuer-native seleccionados pornuevoSQL, no corpusentero.
- El mismo qualifier temporal, ahora2jobs por RED/GREEN; artifactsSYN7d, sinsecrets; retirar terminal.
- Report docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md.

**Interfaces yregistros:**
- readPrivateQaFiniteOwnerCleanup({ctx,env},originalLease)→null|factualSnapshot: fuente fija internamentenativa, no callback/Dataapproval. Detecta losestados actuales deSpec4 yrechaza los futuros. CapturaoriginalPlan/cápsula/Source/QA/actor/enrollment/issuer/SDKreference/grants/notice/currentprovider/backup; elhelper no crea ni refrescaRoot.
- reducePrivateQaFiniteOwnerCleanup({ctx,env},originalLease)→opaqueReduction: freezeissuer/terminalprimaryfence/grantrevocation/monitoringrevocation ANTESderestore. UnWeakMapprivado conserva contexto/lease/plan/refs/resultados yestadobeforeRestore; capturarReferencesdedistintasPromesas antesdelasraces. SinownedReduction deestaInvocación no continúaSDK.
- finishPrivateQaFiniteOwnerCleanup({ctx,env},reduction,originalLease)→opaqueReceipt: una sola transición después de RestoreAck/readback/pointerbaselinereal bajo elowner original. RevalidaReduction ytodoestévigente, reduce SDKexacto ypersiste receipt. El alarm sigue siendo elÚNICO escritor HTTP restore; no extraer una callback genérica delengine ni duplicarlo.
- consumePrivateQaFiniteOwnerCleanup(receipt,{ctx,env},originalLease)→factualReceipt: una sola vez, identidad delobjeto/holders/lease/plans exactos. Deserializado/clone/replay no sirve. Receipt noautoriza otras fases.
- insertMonitoringRevocation({identity,barrier,expectedGrant,expectedConsent,requestId,window},lease) enMISMAinstanciaissuerstore:barrier witness propio existente;expectedGrant formatoscopes/createdAt/expiresAt;expectedConsentevento exactooriginal. Devuelve {status:'applied'|'already_withdrawn'|'no_mutation',row}, conregistroreal oobservación explícita segúnstatus, sinpasarlo comoACK nativodeotrostack. SQLclock/window≤5s,C1; owneractualrevision/inmutabletuple/grantidclientresource/sequence exactos yappend-onlyrevoke, no nuevo grant ni borrar eventos. No consentgrantoriginal→no revocaciónficticia. Readbackprimario nuevoSELECTfirst. No mezcla deISOtexto/ms.
- RecordsPurposeprefix afw.finite-owner-cleanup.v1:, record≤16384B, máximo16filas. Identity:{planHash,capsuleHash,enrollmentHash,preconnectionId,sourceRevision,qaVersionId,actorId,I0,C0,C1,recordHash}; suhashseusa comoidentityHash.
- Send:{identityHash,operation,requestId,requestHash,issuedAt,deadline,recordHash}, operation monitoring_revoke|sdk_revoke, UUIDrequestId,deadlinechildreal≤C1. Observed:{sendHash,resultHash,outcome,observedAt,recordHash},outcomeapplied|already_withdrawn|returned; sdk sóloreturned. PurposecadaKind=afw.finite-owner-cleanup-<kindlower>.v1; noJSONsecret/resultadoreconstruido. Reconciled:{identityHash,sendHash,delivery,factsHash,observedAt,recordHash} por delivery1/2/3, no ACK ni salidaunknown.
- Receipt:{identityHash,planHash,fenceHash,grantFactHash,noticeFactHash,sdkSendHash,sdkObservedHash,restoreSendHash,restoreAckHash,baselineVersionId,baselineDeploymentId,finalFactsHash,observedAt,businessAccessClosed,sdkReductionReturned,globalNativeDrainVerified,sdkNamespaceEmptyVerified,recordHash}. sdkhashesnull/sdkrfalse sólo si nuncaemitidosdkcomplete;restoresendacknull sólo neveractivatedactual. businessAccessClosed=true;globalNativeDrainVerified=false;sdkNamespaceEmptyVerified=false siempre. FINALfactsHashincluyeinventariopins/almacenpropio/Sourcefullbackup/timestamps. Cadahashcorresponderegistronormal/factualexplicito; no autoridadporhash.
- JournalcreateFiniteOwnerCleanupJournal({ctx,env}):read({preconnectionId},lease), appendIdentity(record,lease),appendSend({preconnectionId,record},lease),appendObserved({preconnectionId,operation,record},lease),appendReconciled({preconnectionId,record},lease),finish({preconnectionId,record},lease). Suffixidentity,monitoring_revoke:send/observed,sdk_revoke:send/observed,reconciled:1/2/3,receipt; máximo9actuals ylimit17paraunknown/overflow. Nativecapturedtx/sync/readback; consumedActualresultsnoinputsuccessflag. closeFence/revokeGrant permanecenenissuerjournalno duplicarACK.
- KVfacetprivadoañadedeletesólo IDSDKcalificado: keygrant:subject:IDy token:subject:ID:*,máximo2páginasde100tokens/200deletes/peak2; denyput/client/otherprefix. Cadaapicall se guardaoriginalPromiseychecksantes/después; alfallarquedacortada nuevaemisión, no claimdedrain sobreinterisolate. SDKnormalreturn másReadfactssaneados; nolistvacío→SDKACK.

- [ ] TrasaceptaciónTask1, RootfijaBASE/preflight/protectedblobsynombresactuales. Añadircodec/journaltests yREDprincipal R2 original alarm restores the produced current cycle at real C0 desde elcheckpointrealdescritoabajo. SourcepreTask2debefallar por issuer/later-state cleanupunavailable trasC0conPlan/SDKReference/pointerválidos, no setup/reloj. SólofocalprincipalRED, node18skipno.
- [ ] Implementarobservadorcleanupseparadodelreaderempresarial, ligando originales/A/cápsula/enrollment/SDKreserva/eventos/source/pointer/config/backup. EstadosparcialesdeSpec4sepreservan;otra revisión/owner/pointer/nominalHEAD/unsupportedphase detiene antesdemutar. NoSourceDTOcaller ni relaxedignoreunknown.
- [ ] Implementarcodec/journal yterminalstoreoperationssóloScopeSource. Congelar→closeFence/primaryreadback→observeGrant/revokeGrant→monitoringrevoke/readback. Históricosalreadyrevoked/absent sonhechos distinos delactualSQLresult. Lastransaccionesreales ysus ACKinciertos no se reemiten.
- [ ] ComponerMISMOalarm: conservar losgates/counter/reservedslot yvíaUnit1. Dondehayobligacionesactuales, usarreduceantesderestore yfinishdespués. Calificarpointerpropio porSEND/ACKhistóricos/módulo/config/annotationexactos;restaurar sólobaselineoriginalelegiblerecuperable. Los checkseliminadosdeberecibir sustituto completo, no flagsdeexcepción. Los caminosrestoreyaACKed yStatecomplete validanOwnerCleanupReceiptantesdecompletar; noearlyreturn queomitecierreposterior.
- [ ] Retener toda invocación bajoellifetimescope nativo apropiado sinregistrarnuevaautoridad. Duranteunactualcleanupretenido, otroRootLIVE enlamismactxseexcluyehasta settlement. Reinicio olocalcounter nopruebadrainremoto; registros deSENDincierto impidenreplay. SiOwnerCleanupnoescompleto,originalState noescompleteaunqueclosedpointerseobserve.
- [ ] FinalizarexactselectorSDKReference yfacettrasrestore. Confirmarporretornonormalapi.revokeGrant, noausenciaenlist. LlamadaSDKprevia alFencepuedeterminarKVdespués: resultado CURRENT_CYCLE_BUSINESS_CLOSED/globaldrainfalse, actualMCP/response noentregandatosdespuésdelcierre. Nuncausaresta prueba paraafirmarquecesaronlosrequestsenotroisolate.
- [ ] Principalcloudtiemporeal: jobAproducelinajeactualPOST/SDK/token/MCP/notice/Reference (sinsembrarrecibos), dispone/flush,preservaarchivosnativosSYN exactos/scripts/metafiles/providerregistry/counters/IDs ymanifestSHA. JobA esperahastaC0-120000 conlímitejob15min, sinmantenerRootdenegocio. JobB recuperaANTESdeC0 mismosstorage/namespaces/código, observa originalalarmnativo aC0 ycompruebacierre/state/alarm/historial; norecrearI0niresetalarmnidatosnuevosautorizantes. Verificarintegridad/pinsdurantehandoff. PuroSYNsinsecretosreales; nopresumirprivacidadenrepo público.
- [ ] Matriznativaposteriorcon10nombres: R2 originalSDKexpiry still permits exact historical reduction; R2 fence covers grant before link; R2 notice SQL without link is withdrawn; R2 foreign pointer is preserved; R2 unknown restore acknowledgement cannot complete; R2 same fence identity is reconciled without replay; R2 held SDK delete retains original cleanup; R2 SDK paging and scope fail before extra IO; R2 late foreign-isolate KV cannot reopen business access; R2 restart preserves slots and own uncertainty. Reusarcheckpointgenuino conctxnativasaisladas/negativosmutadosrotulados; no inventarpremisadeentradapositivaconleaseexpirada. ElprincipalAUTOMÁTICO usaelestadoproducidosinalterar; componentes/reconstrucciónmanualSYNseidentifican ynotransfieren su evidenciaalprincipal. Preflight fijacounts/top/subexactos yagrupación antesdedispatch;si el presupuestoC1nocabenoarrancarelI0.
- [ ] Regresionesexactasdelavíasinissuer: B2b only actual finite alarm with no initial records delegates nominal unchanged; B2b foreign primary pointer stops without blind overwrite; codec/store relevanttestsdeTask1 yUnit2a scopesafectados. CorrerlosantesdelI0delprincipal enjobA cuando corresponda, no gastarB/C1enregresionesajenas. Un job/cmdcancelado noseconvierteenPASS; consignarexcepciones.
- [ ] GREENexacto ylintdepaths;compiler/grafosM/QAactuales necesariosporimports/newmetadata, hashes/capsules/pinsactivosSourceartefacto noeligible. Métricasrealesporfase deCF/GitHub/SQL/DO/KV/bytes/reads/cancels/peak/Root/child; no atribuirD11aestecheckout. APIbucketactual/proxynativo/CurrentCustody/backupsremotosseguiránpendientesoperativos.
- [ ] Selfreviewyprotectedtreecompleto;removerqualifiertrasterminal;reporteconRED/GREEN nativas/artefactos/persistencia/SDKstate/D1nativeclock/rootbudget/counts y todoslímites/residuos/unknowns. STOPSourcewrites. RootfreshspeccodequalityreviewytododeltafinalantesdecierreSource. NoUnit3niensayorealporunGREEN.


## Task2 closed preflight after Task1 acceptance (6 Nov 2026)

Task1 is accepted SOURCE/SYN after independent review: stopped Source2c6b5a0eb503b8d877158f85832c510b9a45f7ca/tree57ac1355a85560dee14b2f933b4b68f877911ae2. THIS is Task2 execution BASE; original whole-plan BASE7aab233 remains the start of the combined review range. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 stays protected. Task1 interfaces and eight tested JS blobs are inherited, not restarted. Four Task1 Minor findings remain recorded in docs/superpowers/reviews/2026-11-06-finite-owner-restoration-task1-review.es.md; they do not authorize incidental source work.

### Persistence seam and file boundary

The existing initialEntryHarness sets firstConnection only for exact mode first-connection-publication, while its persistence only follows mode.endsWith('restart'); changing the mode name alone therefore cannot preserve the producer. Its restart helper also does not select qa-first-connection and retains the earlier options, not necessarily the last mounted bindings. These are concrete laboratory integration gaps, not Cloudflare failures.

Allowed optional seam in test/fixtures/finite-initial-entry-world.mjs: explicit opt-in persistence/checkpoint controls for the unchanged first-connection mode; expose/freeze exact CURRENT mounted scripts/options/worker names/namespace IDs needed to export after native dispose/flush; safe reload without invoking bootstrap/seed/producer again. Default old modes/behavior remain byte-semantically preserved. Existing test/fixtures/finite-first-connection-publication.mjs may receive only the minimal fixed SYN service/worker reconstruction seam if needed, documented before qualification. New optional test/fixtures/finite-owner-cleanup-persistence.mjs can isolate checkpoint/laboratory responsibility from the existing owner-cleanup fixture. No other files are added to the whitelist.

Checkpoint must preserve native D1/DO/KV files, original alarm, plan/counters/IDs, exact compiled scripts and current mounted bindings, plus a serializable SYN provider registry. Reattach only the fixed SYN service implementation from the same checkout to those preserved facts. Do not JSON-serialize functions/WeakMaps or call initialEntryHarness to manufacture a new lineage at recovery. Never use f.alarmAt, initialAlarmAt or ownerRead/nowOffset for the positive principal; those helpers patch clocks. JobB must observe the actual runtime alarm at original C0 and native DB now. No reset of I0/alarm, no seeded positive receipts, no recompilation to different scripts under the same proof.

### Frozen GREEN groups and new-SQL coverage

Exact GREEN top-level count49: contract12 + inherited Task1contract10 + existing issuer9 + existing initial2 + new native monitoring SQL5 + original-alarm principal1 + later-state matrix10. No nested tests, fail/cancel/skip/todo all0. Keep groups separate in TAP/manifest. RED executes only the original-alarm principal in jobB; jobA produces the real checkpoint, without importing nonexistent future Source modules or running missing-code tests. Its expected failure must follow a genuine valid produced lineage/native C0/alarm, not missing modules/setup/expired entry.

New12 contract names (SOURCE/SYN component tests; no claim of native admission from their DTO/lease fixtures):
1. R2 cleanup records roundtrip
2. R2 cleanup hash rejects drift
3. R2 cleanup records reject accessors and extra fields
4. R2 cleanup identity binds original plan and clock
5. R2 cleanup send permits only fixed reductions
6. R2 cleanup observed requires original send
7. R2 cleanup receipt requires business closure
8. R2 cleanup receipt forbids global drain and namespace claims
9. R2 cleanup receipt preserves never-issued null obligations
10. R2 cleanup journal append is once
11. R2 cleanup journal rejects foreign identity and unknown suffix
12. R2 cleanup journal requires transaction sync and readback

Existing issuer9, exact test names:
1. REAL closed-first monotonic tombstone permits early reduction and blocks delayed OPEN
2. REAL OPEN then terminal close prevents late authorization
3. REAL serialized barrier orders future grant to zero and makes exact absence meaningful
4. REAL unknown fence ACK reconciles same original ID on fresh primary before absence
5. REAL original UUID grant-only cleanup normal preserves unrelated rows/history
6. REAL original UUID grant-only cleanup held_grant_ack preserves unrelated rows/history
7. REAL original UUID grant-only cleanup history preserves unrelated rows/history
8. REAL foreign project revision fails closed after barrier
9. REAL expired original grant and consent are reduced after C0 within original cleanup C1

Existing initial2, exact test names:
1. B2b only actual finite alarm with no initial records delegates nominal unchanged
2. B2b foreign primary pointer stops without blind overwrite

New native SQL component5, placed in test/mcp-qa-finite-owner-cleanup-native.test.mjs with fixed SYN setup in the new owner-cleanup fixture; do not modify the existing issuer fixture or expose generic SQL callers:
1. R2 native monitoring revoke binds original consent and preserves unrelated rows
2. R2 native monitoring revoke preserves prior withdrawal
3. R2 native monitoring revoke rejects foreign revision and sequence
4. R2 native monitoring revoke enforces native C1 and child window
5. R2 native monitoring revoke unknown acknowledgement cannot become observed

These use actual native D1/store methods with explicitly labeled component fixtures. They test exact original event/sequence/identity, append-only behavior, SQL's real clock, first-primary readback and unknown ACK behavior. They do NOT substitute for the genuine produced-cycle principal. Preserve existing forward SQL behavior.

Principal and ten matrix names remain exactly those in Task2 above. The SDK paging matrix covers the new reduction facet; it must not silently be counted as Task1 readonly-reader boundary coverage. Archived historical normal observations can be validated as dated facts during restart; missing Observed must never be reconstructed from a later read. Same-stack opaque reduction/receipt objects are newly held internally only after fresh native qualification, not deserialized capabilities.

### Two-job timing and causal grouping

JobA runs the38 contract/store/regression component cases BEFORE creating I0, while no original cycle clock is open. Validate remaining15min job budget, maximum export/upload time and minimum JobB recovery margin before I0. If too little remains, do not start the cycle. Then run the real current producer through Reference/token/MCP/NoticeLink, finish requests, dispose/flush, preserve state/scripts/manifest and wait only until original C0-120000. Upload SYN-only checkpoint with7day retention. The wait does not hold a business Root.

JobB restores the same untouched principal before C0, validates manifest/IDs/scripts/current storage/alarm and margin, and observes native alarm at C0. Run the principal FIRST. Ten subsequent matrix cases may use isolated native replicas of the exact PRE-cleanup checkpoint with explicitly labeled fault mutations; preserve all original times/IDs and use real current DB time, not retiming/resealing/new I0. Their original C1 still applies. Bound parallelism and startup/work so the matrix fits; no positive premise from an expired lease. They are labeled replicas/components, not eleven live or user rehearsals. If this cannot fit original C1 or exact persistence cannot be recovered, report concrete timing/data and obtain a Root grouping ruling before dispatch; never widen production clocks. Every job remains <=15min and source stays frozen across both.

Ruling: explicit persistence seam and49 frozen cases close the concrete omissions above while reusing all existing native behavior. Why: an ordinary cold restart cannot be demonstrated by a renamed mode or reconstructed rows, and the new SQL revocation needs its own native boundary tests. Cost if wrong: the laboratory may fail budget/recovery calibration; adjust laboratory grouping with evidence, not business clocks/authority. No runtime/provider effects or owner intervention are required for Source/Actions SYN.




## Dispatch preflight and file whitelist

Before the first Source write: read applicable current Source AGENTS, confirm BASE/ref/tree/main and exact whitelist, explain the minimal persistence/cold-load/alarm observation seam and timing/grouping strategy to Root, then wait for any required seam ruling. Do not request owner login or approval for SOURCE/SYN.
Mandatory production paths: lib/mcp-qa-finite-owner-cleanup.mjs; new lib/mcp-qa-finite-owner-cleanup-records.mjs; new lib/mcp-qa-finite-owner-cleanup-journal.mjs; lib/mcp-qa-finite-preparation-issuer-store.mjs; lib/mcp-qa-finite-initial-cleanup.mjs.
Tests: new test/mcp-qa-finite-owner-cleanup.test.mjs and test/mcp-qa-finite-owner-cleanup-native.test.mjs; test/fixtures/finite-owner-cleanup.mjs; optional new test/fixtures/finite-owner-cleanup-persistence.mjs; minimal test/fixtures/finite-initial-entry-world.mjs and optional test/fixtures/finite-first-connection-publication.mjs seam described above. Existing issuer test/fixture and other Task1 libraries/worker entries remain unchanged. If another path is necessary, name the reason to Root BEFORE editing it.
Temporary qualifier .github/workflows/afw-owner-restoration-qualification.yml, exact Source checkout and two jobs each<=15min, contents:read, Node22/current lock, npm ci --ignore-scripts --no-audit --no-fund; no secrets. Remove after terminal evidence upload/download/readback. Report path below.
Qualifiers must freeze names/counts/groups and expected artifact graph/persistence manifests before dispatch, preserve all failures/warnings, and verify required scripts/metafiles/native files actually survive artifact readback. Artifacts are public-repo SYN-only,7days; never real data/credentials. No same Source mutation while either job runs.

## Report and STOP contract

Write docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md on Source after terminal verification/qualifier retirement. Include exact BASE/final code and tested checkout/tree, paths/blobs, normal/unknown outcomes, RED causal prerequisite/failure and GREEN counts per job/group, commands/run/job/attempt/artifact IDs+digests/retention, native DB/DO/KV actual-vs-SYN distinctions, native clock/alarm delivery times, same-state cold-load pins, full source graphs and metrics/budgets. Record all intermediate failures and their causal diagnoses, not just final passes. Keep logs detailed in Actions artifacts, report sane and referenced. No reports of real readiness.
Selfreview complete BASE..HEAD; preserve every outside-whitelist mode/type/blob and main; verify own writes sequential CAS with parent/path/blob/content/ref and final full tree. No force, auth changes, old bundles/hash laundering, broad suite or GraphQL retries after prior INTERNAL failure; authorized Contents fallback remains.
STOP Source writes after the report and final readback. Return only status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED), exact HEAD/tree/report blob, concise tests and concerns. Root will create complete-range review package and dispatch the independent reviewer.
You do not spawn subagents: no helper, no reviewer. Do all assigned work yourself. Do not write Root's ledger, take Task3, create chats/automations, merge/publish or operate live resources.
