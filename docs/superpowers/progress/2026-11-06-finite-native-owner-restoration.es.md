# SDD ledger — plan: docs/superpowers/plans/2026-11-06-finite-native-owner-restoration.md

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT SOURCE/SYNGitHub+Actions; ORIGIN GitHubconnector; RESOURCE_TYPE Sourcebranch; RESOURCE_ID feat/finite-native-cleanup-20261101; ALLOWED_ACTION planTask1thenTask2undersequentialreview; ROLLBACK onlyowncommitswithCASandprotectedreadbacks. Rootdocsbranch docs/finite-pcoff-continuation-20261103 owns thisledger. No local worktree/artifacts orruntime effects.

## Identity and current next step

Plan at a051f1fc7d1501efee93927bf55110260f138501/blob8f68017afeb18f0869fb3c32bfa0b80537d795c9 (22631chars). Design at ead56350882d81e3edf4952cb2658587b5fdd118/blobcf42e203d07a5e528e64eecd239491686cb73021 (34924chars). Task1brief at c1f69a88a055dd24430b51d0362e50736f17797e/blob40132fe17ea56ecef675324a5edd3f8de2c73892 (14962chars). Allcompletecontent/parent/onepath/refverified.

Task1 BASE7aab233741b09f8873bf04831ca2fa9a9c2b1c4d/tree6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3,Sourcejustreadidentical. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 lastreadunchanged. Priorfinalbodyfix9casesaccepted/one-scopedrereviewclosed; doNOTrepeat oropenitsfixloop. CurrentplanisNEXTfunctionalwork, notanotherfixwaveofthatreview.

Task1 SDK durableReferencebefore302: ACTIVE; solewriter finite_owner_sdk_reference_impl (Solhigh/forknone), dispatch después deledger yrefsverificadas. Agentack leyóbrief/AGENTS/skills yconfirmóBASE/whitelist/16GREENcases/RED1native ycalificador≤1job15min. No Sourcewrite Root mientras trabaja. Task2completealarmconsumer:NOTSTARTEDuntilTask1accepted. ThisplanoverallINCOMPLETE; operationalReadiness=false/completePackage=false/PCoff=false. No realpermission/window/SDKoperationcreated.

## Design decisions and builder check

Ownerexplicitlydelegatedordinarytechnicalchoicesandoptedoutofroutinequestions; Brainstormingopt-out/HARDGATEexceptionapplies. RootchoseexistingNode22/SDK1.2.1/nativeD1DO/KV,samealarm/fence/restore. No new scheduler/service/paidplan. Freshbuilder finite_owner_restoration_builder_check (Astrahigh,readonly,nohelpers) askedtwo loadbearing questions:
1.SDKgrantcanexpirebeforeC0, so matchinglistmayempty. Rootchoosesactualmetadata-correlation+SdkGrantReference transaction/sync/readback BEFORE302, allwithoriginalclock. CleanupcallsexacthistoricalSDKselector andobservesnormalreductionevenwhenalreadyexpired;noabsence→ACK.
2.Otherisolatepre-fence token/refreshmaystillwriteKV. RootchoosesCURRENT_CYCLE_BUSINESS_CLOSED withoriginalD1/owner/expiry/MCPgates andclosedbaseline, normalownSDKreduce;globalNativeDrainVerified=false/sdkNamespaceEmptyVerified=false. Owncleanupunknownstillblockscomplete. Laternominalconsumercleanup/drainNOTprovedhere.

Builderfollowupofthesetwoanswersreturnednothingimportantleft. No humanbusinessdecisionmissing; no secondwholebranchrevieworSourceeffectfromdesign. Ruling: preservebindingfencesandseparateclaims ratherthanrequireanunobservableglobalOAuthdrain. Costifwrong: a futureD1bypasscouldmakeKVresiduesusable; actualgates/lateKVtestsmandatory,noreadiness/nominalauthorityfromreceipt. Ruling: addSDKreferencebefore302undersamerootratherthanparseopaqueauthorizationcode. Costifwrong:extraSDKreads/memory/DOworkmayexceed30s;failmeasureinsteadrenewclockordeliverredirectearly.

## Preflight conflict scan

| Pair/task | Produces vs consumes / self consistency | Finding and ruling |
| --- | --- | --- |
| Task1 self | ActualSDKcomplete→readonlyboundedmetadataquery→nativeReference→302;10contract+6nativecases;newkind9rows/list10 | Consistent. Referenceabsenceispartialfact;originaleightrowsremainvalid;actualcurrent302waitsreference. NoSDKsecrettokenpersisted. |
| Task2 self | Samealarm/Plan/counters/C0C1;reducebeforeexistingrestore→finishSDKafter→receipt→Statecomplete | ConsistentafterRootclosedstagedAPIs. NohelperHTTPcallback/secondengine/earlyStatecomplete. Negativeglobalclaimsfalsebytype. |
| Task1↔Task2 shared owner-cleanup.mjs | Task1readonlyreader/privatefacet→Task2extendsfixedreductions;noexportedKVcapability | Sequentialwriter/review;Task2mustpreserveTask1interfaceandnormalproducer.Sourcefilewhitelistrecordedbrief;noTask2workearly. |
| Task1↔Task2 SDKjournal/reference | Metadatahash/SDKID/completeObserved referencebefore302→exactSDKselectorafterexpiry | Task2doesnotselectbynamelatest/clientorUUIDD1. Unknowncompletewithoutrefmaybecorrelatedreadonly,butneverreissuedorcountedgonefromemptylist. |
| NativeC0test budget | InitialI0+900000 needsDBwalltime;15minjobcap | Ruling:2jobpersistedSYNhandoff;jobAflushesandwaitstoC0-120000beforehandoff,jobBstartswithmarginandobservesnativealarmatfixedC0.NotnewI0/nofakeDBclock.Costifwrong:calibrationfail,notliveeffect;abortbeforeI0ifmarginsorstateidentitycannotpreserve. |
| Scopedtests vs genericfullsuiteinstruction | TaskscausalRED/GREEN/lint/graphs vs fullsuitebeforecommittemplate | Ruling:plan'sproportionalcloudcheckswin;no5000suitebyroutine. Globalpublish/fullintegrationsremainpending;costscopedblindspotsdisclosed,notpristinereadiness. |
| Sourceworkspace vs localworktreescript | ExistingisolatedcloudSourcebranch andreadonlyRootdocscoordination | Ruling:APIref/tree/blobsverifyisolation;no localclone/deps/worktree. Costsharedwriterinterference→stoponCAS/refmismatch,preserverevision. |

## Writer and verification discipline

EverySourcewrite explicitexistingbranch/currentblobCAS,thenindependentsoleparent/exactownpath/blobcontent/refreadback. Sourcefrozenduringqualifier. GitHubContentsfallbackalreadyauthorizedforobservedGQLINTERNAL;noGQLretry/authchange/CLIsecrets/force/main/defaultbranch. Onewriter,nohelpers/reviewerbyimplementer. RootonlydocsuntildeliverySTOP.

Task1qualifier temporaryafw-owner-restoration-qualification.yml≤1job15min/phase,no secrets,Node22/lockignore-scripts/readOnlypermissions,actualcheckoutpinned;causalRED1nativecase→GREEN10contract+6native/lint/graph. Freezecountsnamesbeforelaunch. Allwarns/failuresremainprimary;oldc493nottransferredtochangedbundle. RootpackagesfulltaskBASE→HEAD once;freshTaskreviewbeforeTask2.

SDDfixloop/verificationappliespernewtask; doNOTapplypreviousfinalfixwavecaptoanewunit orrununrelatedMinors. FinalwholeplanreviewafterbothTasks;exactfullchangegraphrequirementsnotWholeold954commitreviewagain.

## Operational boundary

Source3Nov02:59UTCexpired;Parent30s/child5s/C0/C1/3slotsunchanged. NorealCF/GitHubsecret/credential/permission/OAuth/OTP/runtime/cron/Container/consumer/Max/supportmail/mainmutation. OnlyGitHubSource/Docs/ActionsSYN. NotCodexcloudproof/PCoff. NointerventionneededforTask1coding. NativeCloudreceiver/actualsourceproof/custody/recoverabledeploy/providerfeasibility/thirdCLOSED/prearm/fullsetup/samealarmnominalhandoff/preEntrycontroller/ONErealPCoffremainfuturegates.


## Task1 fixture ruling before first Source write

Implementer documentó el seam mínimo: optional ownerCleanup=false en initialEntryHarness, importando/aplicando extendFiniteOwnerCleanup(entry) e instrumentFiniteOwnerCleanup(phase source) de la nueva fixture dewhitelist únicamente si true. FirstConnectionengine ymodos previossin cambio. Root autorizó ese seam exacto; no nuevo pathproductivo. Wrappers KV/storage estables ANTESdeOAuth permiten capturarholdersoriginales. PassiveSDKcomplete normalresolution marcador sólohash/facts, nunca redirect/code/token enlogs.

Ruling: holds son sobre ACKpostnative y mantienen la referencia a la Promesa original másla cadenaoutwardretenida; no llamarlos physicalKVpending si ya terminó el I/O nativo. Se afirma exclusión por trabajo retenido, no drenaje remoto por monkeypatch. Costo si es incorrecto: fixturepodríaproducirunnegativoantesdeblancoreal; markersdeSDKcomplete/nativecall/Reference yRootLIVE debenmostrarcausalidad.

Requestabortdelnegativo debeprovenirdeRequest/AbortController nativos dentrodeworkerd, no inferirse de la propagación Node→RPC. Whitelist/wire/sourceprofile originalsiguenvalidos. AgentconfirmóSDKfijadolistUserGrantspagina legacy yPromise.all internamente, porloquepresupuesto/cola porllamada nativa ystickyfailure sonload-bearing;Rootexigiónoemisiónnueva trasprimerfallo aunque queden Promesasactualespendientes.

## Task1: RED causal comprobado por Root

Checkout y Source RED: 74086e7b0a9df597274ec0a11386f58daab1c904, árbol de7294f82ca761867618aaedb424f9cf65f6a4d1. [Run 42275435649](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42275435649), job 128090446140, attempt 1, terminó el 6 nov 2026 a las 18:59:23 UTC. Root leyó independientemente el run, los logs completos del job, el test focal y el qualifier de ese checkout.

El único caso ejecutado falló exactamente por `R1 missing durable SDK Reference AFTER actual completeAuthorization`: el marcador registró una escritura real de grant, una resolución normal de completeAuthorization, observación sdk_complete durable, Reference 0 y HTTP 302. Resultado: 1 ejecutado / 0 PASS / 1 FAIL / 0 cancelados / 0 skip / 0 todo; exit 1. Esto es el RED esperado, no producto verde.

Los hashes medidos de ese run fueron M c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32 (1988061 bytes) y QA a0d12a7be2b4f4a0638f30c65bc33d37a1ba64c707c6ccf0c0aed21689cffcdd (2373893 bytes). La duración focal de 53376.907 ms incluye preparación y varios requests, no una ampliación de la Root de cada request. Los contadores HTTP del marcador pertenecen a fixtures SYN, no a llamadas facturadas contra Cloudflare.

Artefacto RED 13532153177, SHA256 2c9bbb4108363c9077995c0d27df563ab8c188227ae4f398a6b8e10c02112d74, vence el 13 nov 2026 a las 18:59:20 UTC. LIMITACIÓN: conservó solo red.tap y el marcador saneado; los scripts/metafiles se generaron bajo output/t2-native-graphs, pero el qualifier seleccionó otra ruta. No afirmar que esos grafos RED quedaron preservados. Root decidió no repetir un RED causal únicamente por esa omisión. GREEN debe corregir la ruta y verificar el contenido del artefacto antes de retirar el qualifier. Implementer continúa Task1; no Task2 ni Source writes de Root.

Advertencias registradas: CIMD deshabilitado en el entorno SYN, un RPC stub no dispuesto y deprecaciones de dependencias/actions. No se cambiaron flags, dependencias o políticas para silenciarlas. La revisión evaluará su incidencia en el alcance de esta tarea.

## Decisión transversal: plan Workers compartido, recursos separados

Gabriel confirmó usar el mismo plan de pago de Workers para AFW y Tokenizart, con rutas distintas por proyecto. Se conserva esa decisión sin duplicar suscripciones y con Workers, rutas, entornos, almacenamiento, secretos y permisos separados. Compartir el plan no habilita reutilizar datos, callbacks o credenciales ni concede autoridad de despliegue al otro proyecto.

Root contrastó la distinción de plan por cuenta y límites REST con la documentación oficial de [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) y [API limits](https://developers.cloudflare.com/fundamentals/api/reference/limits/). El presupuesto mensual de Workers y la cuota de la API de control son límites diferentes. No se reserva capacidad ni se acredita margen operativo actual a partir del plan. No se cambió facturación, cuenta, ruta, permisos, monitor o runtime. Este bloque sigue limitado a Source/Actions SYN.
