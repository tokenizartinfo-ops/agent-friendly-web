# AFW Task1 brief — SDK reference durable before redirect

Read this first. These are the binding task requirements, with exact values to use verbatim. Work only Task1; the complete cleanup/Task2 is NOT authorized in this dispatch.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (public1347578006); ENVIRONMENT=SOURCE/SYN GitHub+Actions; ORIGIN=GitHub connector; RESOURCE_TYPE=existing isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=Task1 exact source/test changes and bounded credential-free qualification; ROLLBACK=own commits with exactparent/ref/blob readback, preserving earlier history. BASE7aab233741b09f8873bf04831ca2fa9a9c2b1c4d/tree6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 never write.

Approved design SOURCE scope: docs/superpowers/specs/2026-11-06-finite-native-owner-restoration-design.md at ead56350882d81e3edf4952cb2658587b5fdd118/blobcf42e203d07a5e528e64eecd239491686cb73021. Read sections5 includingdurableReference,7 readonlyfacet,8 distinctionofclosure and12 only if brief leaves needed context; do NOT load oldplan/tasks/history. Plan docs/superpowers/plans/2026-11-06-finite-native-owner-restoration.md at a051f1fc7d1501efee93927bf55110260f138501/blob8f68017afeb18f0869fb3c32bfa0b80537d795c9. User opted out of approval/questions and delegated normalengineering; SOURCEchanges do not authorize operational effects.

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


## Execution contract and Root rulings

Ruling: Existing GitHub Sourcebranch is the isolated workspace. No localgit/worktree/clone/deps/build/tests/container. Only small installedskill/reference reads locally, all source/API/CAS/GitHub/Actions heavywork remote. No genericfullsuite beforeeverycommit: scopedcausal qualification/lint required by this task; globalpublish gates notinvoked. Costifwrong: scoped qualification maymissintegration problems, recorded aslimits and caught downstream; no readinessclaim.

GitHub writes: prior GraphQL create_blob/update_ref repeatedly INTERNAL with unchangedrefs; authorized Contents API file-CAS fallback. Do NOT retryGQL/changeauth/useCLI/localgit/force/main/newbranch. create_file/update_file raw UTF8, explicit existingSourcebranch and currentfileblob. After EVERYwrite independentlyverify newcommit has soleparentpreviousHEAD/exactoneownpathdelta/newblobcontent/refnewHEAD. Unknownwrite/interference: preserveandstopreport, noretryblindly. Writes sequential; Source frozen during qualifier. Never String.replace replacement strings with unescaped $ patterns: use replacementfunctions.

One Sourcewriter: YOU. Root owns only separate Rootdocsbranch while you work. No Sourcewrite after STOP/handoff untilRoot releases it. No helpers/subagents and never spawnreviewer. Rootwill packagefullBASE→HEAD anddispatchfreshreview afteryour report. Selfreviewmeansreadwholeowndiff.

Read exact source AGENTS.md relevantcurrentsections (historicalpreamble notcurrentruntime), then skillinstructionsforTDD/systematicdebug/verification asneeded. Freeze causalREDexpectedcase/count/source+qualifierbeforelaunch. Native fixtureget/set methods are test-only; do notexportprod authority callbacks or add ordinary fallback to getgreen. Metadata is factualnonsecret notapproval. WholeM/QAhashes maylegitimatelychange fromcurrentcode; deriveactualSourcegraph and reportbeforealteringanyoldc493 assertion outside scope. Do not buildoldM tohidechanges.

Reference journal max9/list10; preserveold8 andunknownsuffix denial. Current phase SDKobserver must correlate newreference whenpresent andretain partialabsence asfactualnotnewgrant; actualcurrent302 MUSTwaitreference. Journal may derivecorrelation from alreadyvalidatedExpectedGrant.identityHash rather than load anewidentityintoitsowntransaction; if fieldrelations need more nativeTxreads usecapturedtx methods, never externalRPC whiletransactioninputgateheld. No methodcreatesa30sRoot orwidens5schild.

Fixtureselection/timingclarification: Task1 doesNOT waitC0/15min orimplement persistencehandoff. Its actualnativeSDKflowoccursduringvalidforwardwindow. UsecurrentfirstConnectionactualpipeline; earlierhistory/provider/custody/Accessinputs SYNexplicit. No plantedphase/approval orreconstructed SDKnormalresult. Native faultsinjectonlyaftervalidactualSDKentry; markpostnativeACKholdsasACKratherthanphysicalKVhold. Ifadditionalpath orarchitecturaldecisionneeded, reportNEEDS_CONTEXTtoRootbeforewrite,notaskowner.

Report full at docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md: exactBASE/code/finalHEADtrees/pathblobs, allcommands/run/job/attempt/time/counts(executedtop/subpassfailcancelskiptodo)/REDcause/GREEN, actualvsSYN/graphbundlehashes/custodyfalse/qualifierabsent/protectedfulltreecomparison/warnings/unknowns. No rawsensitiveoutput even SYNtokens tologs. Return<15lines statusDONE|DONE_WITH_CONCERNS|BLOCKED|NEEDS_CONTEXT, refs, testsummary, concerns, reportpath. STOPSourcewritesafterreportreadback. Do NOTstartTask2 yourself.
