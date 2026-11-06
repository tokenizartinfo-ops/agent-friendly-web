# Native Owner Retirement and Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cerrar el ciclo actual de conexión/avisos mediante la reducción de permisos propios y restauración verificadas por el MISMO alarm inicial.

**Architecture:** Reusar fence/store/journals/restore nativos. Antes de entregar el redirect, obtener y conservar una referencia SDK exacta; en cleanup cercar D1/avisos, restaurar baseline y observar la reducción SDK del selector original. El receipt acredita cierre empresarial con reducción retornada, nunca drenaje global de otros isolates.

**Tech Stack:** Node22, lock actual, @cloudflare/workers-oauth-provider1.2.1, Miniflare/workerd/D1/DO/KV; GitHub connector yActions. Sin clone/deps/build/test locales.

**Spec:** docs/superpowers/specs/2026-11-06-finite-native-owner-restoration-design.md en Rootdocs ead56350882d81e3edf4952cb2658587b5fdd118/blobcf42e203d07a5e528e64eecd239491686cb73021. Buildercheck final: nothing important left. Owner delegó implementación/decisiones y optó por encadenar sin aprobación rutinaria; no pedir login para ejecutar SOURCE/SYN.

## Global Constraints

- PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web (public1347578006). Source feat/finite-native-cleanup-20261101 BASE7aab233741b09f8873bf04831ca2fa9a9c2b1c4d/tree6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3. Rootdocs docs/finite-pcoff-continuation-20261103. Un Source writer; Root sólo docs mientras trabaja. Rollback sólo commits propios conCAS/readback, sin borrar historial ajeno.
- Fuente2026-11-03T02:59:00Z vencida; I0/C0=I0+900000/C1=C0+180000; Root≤30000ms/child≤5000ms recortadas; mismos3slots C0/C0+60000/C0+120000, alarm/actor/counter originales. Sin refresh de Source/Access/identidad/clock.
- No runtime/providerAPI real/remoteDDL/OAuth/OTP/tokens/permisos/cron/Container/nuevochat/mainmerge/Max/mail. SOURCE/SYN yephemeral native artifacts no prueban CodexCloud/PCoff. operationalReadiness=false;completePackage=false;PCoff=false.
- No callbacks/SQL/URL/caller-successDTO como autoridad, store OAuth ordinario, SDKpurge/deleteClient/revokeExistingGrants, permisos por metadata o campos opacos transportables. No retry de SEND incierto ni ACK reconstruido de readback.
- Retener actualPromises y negar lógicamente sin fingir drenaje; holders/clock comprobados antes y después de I/O. No código anterior/bundle viejo para salvar hash, no upgrade deSDK/dependencias, no refactor incidental de phase-context.
- Current scope termina después de NoticeLink y ANTES de terceroCLOSED/prearm/fullsetup/nominalhandoff. Esos estados siguen denegados. Ningún receipt de esta unidad autoriza un ensayo real.
- Conservar MinorM-I/M-II/M-III/históricosM1/M2 yM4closed; no reabrir tareas previas ni ampliar el trabajo para ocultar warnings. No fullsuite por rutina; integración/promoción tienen gates propios.

## Review Focus

- Grant SDK expirado al C0: el selector debe provenir de una Reference durable antes del302; no list vacío→revocado. Task1reference+Task2expiry case.
- SDK/refresh tardío desde otroisolate: acceso/data permanecen cerrados, globalNativeDrainVerified ysdkNamespaceEmptyVerified false; no claim de ausencia física. Task2lateKV.
- Commit/ACK perdido entre SDKcomplete/reference o SQLfence/revoke/restore: no repetir efecto ni reconstruir ACK; preservación yadmin_pending. Ambas tareas.
- NativeSDKpaginación oculta y fanout interno: guardar límites/concurrencia/retención por llamada, no sólo limitar el wrapper externo. Task1readonly facet yTask2delete facet.
- Recuperación en C0 con relojD1 real: mismo almacenamiento/scripts/IDs originales, WeakMaps anteriores no transferidos, mismoalarm ycounter. Task2principal+restart; noepochfake o receiptsembrado positivo.

## Filemap e interfaces compartidas

Tarea1 modifica SDK records/journal/phase y crea owner-cleanup.mjs con la función READONLY fija. Tarea2 extiende ESE módulo con las reducciones de antes/después de restore y privateKVfacet, crea records/journal de cleanup, y modifica initialcleanup eissuerstore. No dos propietarios del mismoalarm ni dos enginesHTTP.

Correlation exacta = initialHash('afw.finite-sdk-cleanup-correlation.v1',{rootHash:root.recordHash,expectedGrantHash:expectedGrant.recordHash,completeSendHash:completeSend.recordHash,identityHash:identity.identityHash}). Metadata SDK exacta {afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash}}; props/scopes/revokeExistingGrants:false existentes iguales.

## Task 1: SDK reference nativa y durable antes del redirect

**Files:**
- Modify lib/mcp-qa-finite-owner-issuer-provenance-records.mjs.
- Modify lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs.
- Modify lib/mcp-qa-finite-owner-phase-context.mjs (metadata, llamada readonly, reference y su observación; no otro handler).
- Create lib/mcp-qa-finite-owner-cleanup.mjs (sólo readonly SDK correlator/facet en esta tarea; NO alarm/reducción).
- Create test/mcp-qa-finite-owner-sdk-reference.test.mjs y test/mcp-qa-finite-owner-sdk-reference-native.test.mjs.
- Create test/fixtures/finite-owner-cleanup.mjs, reutilizando initial-entry-world/first-connection-publication, no engine duplicado. Sólo si necesita un seam mínimo, modificar esos2fixtures existentes y documentarlo antes de calificar.
- Temporary .github/workflows/afw-owner-restoration-qualification.yml, retirar antes deentrega.
- Report docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md. No escrituras en ledger Root.

**Interfaces:**
- Añadir kind SdkGrantReference y propósito afw.finite-owner-sdk-reference.v1 alcodecSDK; campos exactos rootHash,expectedGrantHash,completeSendHash,completeObservedHash,correlationHash,sdkGrantId,createdAt,expiresAt,observedAt,recordHash. createdAt yexpiresAt en segundos (expiresAt null si SDKundefined); observedAt enms; sdkGrantId /^[A-Za-z0-9_-]{16}$/; own/canonical/16384B como antes. No campo secreto.
- Export pure finiteOwnerSdkCleanupCorrelation({root,expectedGrant,completeSend,identity}) del codecSDK: validar codecs exactos y correspondencia Root/ExpectedGrant/Send/Identity antes del hash. Es DATA, no permiso.
- Journal añade suffixreference y appendSdkReference({preconnectionId,record},lease); inventory devuelve reference|null además de campos existentes. Máximo9rows; list limit10 para detectaroverflow. Exige sdk_complete normalobserved y sus hashes, ExpectedGrant/Root ycorrelation; append-once→transaction→sync→readback exacto, sin overwrite. Los8records previos siguen válidos; ausenciaReference es un estado factual parcial posible, NO prueba de redirect completado. No aumentar OPSsdk_begin/approve/complete ni reabrir sus ACK.
- readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId,parent},lease) en nuevo módulo: parent es el Root de request genuino que ya califica readFiniteOwnerRequestContext; lease es el child de esta continuación. Lee anchors/journals/issuer originales y devuelve sólo hechos SDK {rootHash,expectedGrantHash,completeSendHash,completeObservedHash,correlationHash,sdkGrantId,createdAt,expiresAt}. No escribe/reference, no acepta subject/SDKID/metadata/URL delcaller; obtiene subject de issuerIdentity calificada. Captura holders/nativealias, Source/actor/QA/cápsula/enrollment y mantieneC0 y ambos leases. Resultado no es autoridad.
- KVfacet constructor queda PRIVADO al módulo, no exportar fábrica/capability. Para esta lectura sólo list/get de grant:subject: propio; nada de put/delete/tokens/client/otroSubject. API SDKreal1.2.1 sobre facet readonly, mismo issuer/resource/scopes yalias subyacente. Máximo2páginas de100keys, máximo200get, concurrencia2, guard ANTESdeentrar/después, retain cadaactualPromise. Aplicar limit100 a la llamada KVnativa aunque el SDK omita limit; cursor nativo sepreserva. Una páginaextra interna legacy dispara límite ANTESdeI/O. No repetir después de unknown.
- La Reference se construye desde el summary real después del actual completeAuthorization normal+SdkObserved y ANTESde302. Mantener actualResult/resultPromise ysummary separados; corriente actualcódigo no puede fabricar la resolución desdejournal. Recheckownsource yactualctx después delread ydespués dedurableReference. SDKreference ledger es observación; no nueva admisión.

- [ ] Escribir prueba RED focal R1 SDK reference is durable before redirect. Desde initialupstream/choice real y SDKreal llegar al complete actual; afirmar302 sólo con metadata exacta/Reference durable, e incluir tokenM/MCP ynotice como regresión del flujo. AnteSourceBASEactual debe fallar por Reference ausente DESPUÉSdeSDKcomplete real, no import/fixture/Sourceclock/hashheredado. Capturar conteo originalcomplete1 yestado real antesdefallo. No usar literal c493 como premisa de este nuevo test: medir/graficar bytes reales, manteniendo comparación inicial→posterior del mismo artefacto.
- [ ] Una calificación REDcredential-free enActions,1job≤15min/pinned checkout, expected/executed1FAIL/exit1 porcausa exacta. Guardar scripts/metafiles/native markers saneados; no Sourcewrite mientrascorre.
- [ ] Implementar codec/journal/correlation yfunciónreadonly exactos; integrar metadata antesdeSDKcomplete yReferenceantesde302. Actualizar elobserverpara aceptar/validar elnuevo suffix sinallowPendingpúblico ni alterar fase de permisos existentes. No timeoutnuevo/globalcache/noSQLactualmutante desde la lectura.
- [ ] Añadir diez pruebas contractuales R1 records roundtrip, R1 reference hash rejects drift, R1 reference rejects foreign root, R1 reference rejects foreign expected grant, R1 reference requires complete observation, R1 reference rejects invalid SDK id, R1 reference seconds and milliseconds stay separate, R1 reference rejects accessor and extra fields, R1 reference journal is append once, R1 reference journal preserves prior eight rows. Inputs válidos delcomponente son SYN etiquetados; no autoridad real inferida de DTO.
- [ ] Añadir cinco negativos nativos conpremisa SDKcomplete genuina: R1 foreign SDK metadata cannot redirect; R1 duplicate SDK correlation cannot redirect; R1 unknown reference commit cannot redirect or repeat SDK; R1 held SDK lookup retains original scope; R1 aborted reference sync cannot return late redirect. Enretención exigirotroRootLIVE misma ctx denegado hasta settlement real; eventualdispose no esdrain. Si elholdessobreACK postnative, rotularlo así yconservar laPromesa original, no atribuirlo aKV sinsettle.
- [ ] GREEN: exactamente10contractuales+6nativos (1principal+5negativos),0fail/cancel/skip/todo; changed-filelint ybuilder graph actual delprincipal. Testhelperpuede normalizar summary.expiresAtundefined→null sólo después de leer la propiedad real, noinventar expiry. Medir KVcalls/peakconcurrency/elapsedrootchild yHTTP/modulebytes; no>200gets o>2lists/peak2. Warnings reportados, no upgrades porpasar.
- [ ] Selfreview BASE..HEAD todoslospaths; protectedblobs unchanged fuera dewhitelist; removerqualifier terminal; SourceSTOPwrites, entregar reporte completo/refs/trees/blobs/runjob/commands/counts/RED/GREEN/hashes/advertencias. Freshreview porRoot antes deTask2. No completarUnit2b porque pasó esta tarea.

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



## Task2 implementation rulings after concrete preflight (6 Nov 2026)

These rulings supersede the earlier49/38 grouping and the assumption that all ten variants fit one original C1. They do not change production authority or clocks.

### Fixed SYN provider and persistence reconstruction — approved

Extract the SAME existing initial-entry outbound SYN closure into a fixed factory over serialized original facts, as the minimal initial-entry/persistence fixture seam. Preserve its existing branches/default modes and request semantics; no generic production callback or server-generated success authority. Reconstruct current mounted scripts/options/worker names/IDs exactly. Pure helper construction may reattach behavior to preserved fact maps, but must not run bootstrap/native seed/producer or regenerate a new lineage. Before opening Miniflare, compare serialized facts and script hashes with the original manifest.

The opt-in cleanup+persistence scenario may add original baseline x.metadata to its preserved provider registry and support ONLY the exact original restore wire: annotation afw-finite-initial-restore-<original planHash>, original baseline target100%, distinct known restore deployment ID (existing777... if distinct from all prior IDs), real registry pointer/restores update and explicit after-effect ACK-loss fault. Other modes/activation behavior remain unchanged.

The current fake provider reports bootstrap running by nowOffset rather than a terminal scenario. For this opt-in scenario preserve a dated SYN terminal-inventory input only after native prepare/producer requests finish. Label it MODELED PROVIDER INPUT. Local invocation return does not prove a Cloudflare Workflow terminal state; do not make that inference in code/evidence. No clock patch or actual Workflow change.

### Non-authorizing cleanup lifetime — approved additional production path

Add lib/mcp-qa-finite-stage-work.mjs to Task2 whitelist only for minimal observeFiniteOwnerCleanupWork({ctx,env,originalLease},operation), mode cleanup. It provides ambient same-ctx exclusion and actual-promise retention, never admission/permission. No fabricated admission={lease}, no pretending a mutation is readonly, no change to existing owner/request/factual semantics. A private shared scope constructor may avoid duplication while preserving old behavior. Newly added function is not a new public transport/runtime capability.

Wrap the original alarm continuation under that lifetime. In initial-cleanup adapt actual retention BEFORE parent/child races using the existing parent retainer plus retainFiniteOwnerStagePromise; do not alter/freeze-bypass initial-lease, reset lease/source clocks or treat dispose as settlement. One logical denial leaves actual work retained and another live scope excluded until real settlement.

Add two contract/component tests (no native-admission claim from their synthetic ctx/lease fixtures):
13. R2 cleanup scope retains actual work after logical abort
14. R2 cleanup scope rejects foreign or nested root

Frozen final top-level total is now51: contract14 + inherited Task1contract10 + issuer9 + initial2 + nativeSQL5 + principal1 + matrix10. Forty component/regression cases run once before I0 in GREEN group0 prepare. Native held-SDK-delete matrix also checks a genuine live non-authorizing scope in the same native ctx; it must not use a business reader that would fail merely because C0 already expired. Keep old stage/request behavior checks meaningful if their implementation is factored.

### Bounded grouping — six paired GREEN qualifications, three independent lanes

Measured full producer/downstream is about60.51s. Ten Roots at a30s maximum plus principal/startup do not fit a shared180s C1. Do not gamble on typical duration, retime replicas or drop cases. Instead split the11 native assertions into SIX explicitly SYN laboratory qualifications. Each has its own genuine producer checkpoint(s), unchanged original I0/C0/C1, two jobs prepare->consume each<=15min, and exact same Source checkout. All groups must pass on the same frozen revision. This is additional laboratory coverage, not extra user/live rehearsals or renewed authority.

Fixed groups:
- g0: R2 original alarm restores the produced current cycle at real C0; R2 originalSDKexpiry still permits exact historical reduction. One untouched principal. The expiry case can assert the SAME actual original expired SDK selector/reduction result as a postcondition, clearly sharing the occurrence rather than inventing a second effect.
- g1: R2 fence covers grant before link; R2 notice SQL without link is withdrawn. Produce genuine partial prefixes with explicit faults at the respective effect boundaries, not delete later rows and claim that history. Two separately produced native lineages/checkpoints in prepare; their original clocks may be staggered naturally. Both preserve original times/scripts/IDs at cold load.
- g2: R2 foreign pointer is preserved; R2 SDK paging and scope fail before extra IO. Two labeled isolated fault replicas from a genuine checkpoint, configured before C0. Never transfer a negative's mutation to the principal.
- g3: R2 unknown restore acknowledgement cannot complete; R2 same fence identity is reconciled without replay. Separate isolated replicas, original three slots; preserve unknown SENDs and distinguish factual reconciliation from missing ACK. Two native instances maximum.
- g4: R2 held SDK delete retains original cleanup; R2 restart preserves slots and own uncertainty. May share the SAME lineage: reach intended hold, prove exclusion, release and observe actual settlement, then dispose/flush/cold-load its real partial-cleanup state before the remaining original slots. No forced drain, no retransmitting unknown SDK SEND.
- g5: R2 late foreign-isolate KV cannot reopen business access. Own genuine checkpoint, narrowly start its real other-isolate SDK operation before C0 under the original request budget, observe/release the late operation around the original fence/closure, and verify denied response/data. Preserve actual SDK expiry/write outcomes; do not fake a successful late commit if native SDK/KV rejects it. Any deliberate adversarial residual-state component must be labeled separately from that actual operation. Global drain/namespace absence remain false.

Use at most two Miniflare/native instances concurrently per consumer group; principal g0 has no competing matrix worker. A group needing two genuine producers must validate its prepare timing before first I0 and preserve BOTH original clocks; no new business duration is granted. JobA still waits only to its earliest original C0-120000 and exports SYN-only7day artifacts. JobB must recover before the relevant C0 and reject insufficient startup/C1 margin.

The one temporary qualifier may use twelve explicit jobs with pair-local dependencies in three independent lanes: prepare_g0->consume_g0->prepare_g3->consume_g3; prepare_g1->consume_g1->prepare_g4->consume_g4; prepare_g2->consume_g2->prepare_g5->consume_g5. Do not use a matrix-wide needs barrier that waits for all producers before any consumer, because it would expire earlier clocks. RED uses only g0 prepare/consume and executes only the principal case. GREEN51 is counted across all groups, never mixed across revisions or failed attempts. Required graph/checkpoint/artifact counts are declared per group/lineage, not a stale six-graph expectation from Task1.

Ruling: more bounded SYN jobs are preferable to an unprovable C1 fit. Cost if wrong: extra runner minutes or a failed recovery margin, preserved and reported; no production clock/permission change and no user data/resources. If this grouping still cannot fit, report measurements before qualification; do not invent a new I0 for a recovered lineage.


## Self-review del plan y ejecución

CoberturaSpec1–4:Task2consumer/alarm;5:Task1reference+Task2exactreduce;6–8:Task2SQLSDKrestore/receipt;7KVlimits:Task1readonly/Task2delete;9filemap:ambas;10nativeC0:Task2;11anti-goals:GlobalConstraints;12builderanswers:ReferenceTask1 ypredicateTask2.

Lasinterfaces deTask1son lasconsumidasporTask2; RootconservaunSourcewriter,norepitepreviousbodyfixniwholebranchprevia. Amboscompartenowner-cleanup.mjs/phaseexpectation, porloquetarea2serásecuencialtrasreviewaceptada. NoaprobarUnit2b alterminarTask1. Fuente/custodia expiradanoautorizaClockpatchenproducción;SDKversionfijanoequivaleaRemotePermission.

DecisionesRootdejadasalimplementer: microorganizaciónprivadadentrodelmóduloparareducirexports, mecanismosdecolapromesasnativas conpeak2, ytestfixturepersistenciamínimarespetandoallcontratos. Sicualquieraexigecambiarsuautoridad/clock/predicadoretorno/presupuesto/ficherosnofijados, informarRootantesdeejecutar;noinventarSourcefactoryoensayovivo.

SDDencadenadobajodelegaciónvigente. RootcrearábriefporTaskconfullTasktextyGlobals,registraráBASE/agent/rulingstable enledgernueva,usaráCASexactoGitHub,sinclone/CLIsecrets/operacionesreales. No pedirconfirmaciónrutinariaalowner; sólointervenciónrealdeidentidad/custodia oaccionesfuera delalcanceautorizado cuandoelresultadoestépreparado.
