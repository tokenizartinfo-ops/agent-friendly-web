# Whole-branch review packet 12/26 — docs

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 14 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01.md: ABSENT -> 02260f86cb9fb8124265f7eefef3c2494839bbda; full diff chars=9307
- docs/superpowers/briefs/2026-11-04-finite-request-signal-final-review.md: ABSENT -> e0a6c80f008bf18f109f06c3cbcf450af7ff7fc1; full diff chars=3089
- docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task1.md: ABSENT -> 57a5a7692b63ddc98560aac62d7b30851f8527bd; full diff chars=16464
- docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task2.md: ABSENT -> a5eb1ee048feb3c71487014a183fd41a2a764e10; full diff chars=13668
- docs/superpowers/briefs/2026-11-05-finite-native-notice-consent.md: ABSENT -> 79286bc31fd525b9efac3cd9ccf837bd6a38bfdb; full diff chars=48970
- docs/superpowers/briefs/2026-11-05-finite-native-notice-link.md: ABSENT -> 61f7a5f4b3c996feeb580c7f37843fd14f0272d7; full diff chars=46004
- docs/superpowers/briefs/2026-11-05-finite-native-notice-next-slice.md: ABSENT -> c64f9c9f9c97f2a8832e3dcb090aa17d9b57579c; full diff chars=37768
- docs/superpowers/briefs/2026-11-05-finite-native-notice-provenance.md: ABSENT -> 0c350b46eaac6f81f1404839fa29d5cd0ba3f4a3; full diff chars=21092
- docs/superpowers/briefs/2026-11-05-finite-owner-exchange-continuity.md: ABSENT -> 1fac334b45b7378170e9d03a94b1e00e9dc8fab7; full diff chars=8751
- docs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md: ABSENT -> 874e2693332a4549c635f8ca41744debe3a124e9; full diff chars=11124
- docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md: ABSENT -> e241ad8fc2a84bdbaa21e4c7dcd5386ab02d160a; full diff chars=19567
- docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md: ABSENT -> 0e1d7ca0a692ef7f0ac07ba5eafe63f4961ed5da; full diff chars=10683
- docs/superpowers/briefs/2026-11-05-finite-preparation-notice-store.md: ABSENT -> 0cfd775d208f1d55ac0a9c755f28849af797182c; full diff chars=26752
- docs/superpowers/briefs/2026-11-06-finite-native-first-connection-publication-task3.md: ABSENT -> 847824af6cf748cbebfc2db7ba3bd0a841725385; full diff chars=64350

## docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01.md b/docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01.md
@@ -0,0 +1,66 @@
+# Task brief — D0.1 exact QA SDK alias source contract
+
+D0.1 SOURCE ACTIVE in containingcommit afterindependentlyacceptedpureconversionTask1. D0.2/D0.3 remainINACTIVE. Root supplies actual source BASE. Read this first; linked spec docs/superpowers/specs/2026-11-04-finite-owner-sdk-trust-boundary.md contains exact identity/algorithm and rootclarifications. Only D0.1 belongs to this task: source declarations and pure mapping facts. D0.2actualSDK/D0.3tokencompatibility and any REAL binding action remain unassigned.
+
+## Global constraints
+
+- Product inspection BASE220b5bc323315b7f107967548fb8958c0f8234f2; root supplies accepted phase-context implementation BASE for execution. Do not follow the advancing product writer.
+- ONE proposed QA binding: AFW_FINITE_OWNER_OAUTH_KV→existing6b94ff702e504e14a7730cee73a0f6ff; this is namespace-wide QA read/write access. No exclusive-holder/per-key-ACL claim.
+- M physical bindings unchanged; revised qaLive adds one alias; historical qaClosed/c570, M2607 and QA_CLOUD_CLOSED_PINS unchanged. No old/new profile fallback or accepted flag/date change.
+- Original capsule/material/bootstrap must bind revised Q BEFORE the one reserved Entry. No retrofitting a sealed occurrence, replacement Entry or clock reset.
+- Original I0/C0/C1, technicalI0+300000, parent<=30s, child<=5s, commandBy-510000, nominal/launch clocks preserved. Untrusted metadata may narrow; not authenticate/widen.
+- Actual SDK and original fence/consumption witnesses stay lexical in QA. No result DTO/registration/callback attestation or ordinary unfenced granting fallback.
+- All current app observations use a new first-primary session with SELECT first and the original reserved UUID. No owner/client scans, SDK list/sweep/purge/client registration.
+- No product public/private mount, provider publication, binding installation, credentials, API-token reuse, remote DDL, browser, local clone/build/tests or other-project action.
+- Source ceiling2026-11-03T02:59:00Z expired. Fixture-only ceiling substitution is disclosed SYN evidence; SQLite clock remains native.
+- operationalReadiness=false; completePackage=false; PCoff=false.
+
+
+## Task D0.1 — Exact source access contract and original binding lineage
+
+Independently rejectable deliverable: source profile declares exactly the proposed alias and exact QA/M metadata comparison proves its identity. No SDK dispatch or actual binding action.
+
+**Modify:**
+- lib/mcp-qa-finite-profile.mjs — qaLive public template + Wrangler config add one fixed alias.
+- wrangler.independent-closure-qa.finite.jsonc — same kv_namespaces entry.
+- test/mcp-qa-finite-profile.test.mjs and test/mcp-qa-finite-profile-native.test.mjs — exact changed qaLive and unchanged historical roles.
+- test/mcp-qa-finite-bootstrap-native.test.mjs / test/mcp-qa-finite-bootstrap-compiler.test.mjs — revised source/profile expectations only where fixtures require exact new alias.
+
+**Create:**
+- lib/mcp-qa-finite-owner-sdk-binding-facts.mjs
+- test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs
+
+**Consumed existing functions:** finitePublicProfileTemplate, finiteWranglerProfileTemplate, projectFinitePublicConfiguration, finitePublicStaticExpectation, readFiniteQaBootstrapPublication; original material/capsule codecs. No new factory for provider reads.
+
+**Produced signature:**
+
+```js
+qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata})
+// frozen {alias:'AFW_FINITE_OWNER_OAUTH_KV',
+// namespaceId:'6b94ff702e504e14a7730cee73a0f6ff',bindingHash}
+// Strict bounded DATA only; no permission/lease/SDK/env object.
+```
+
+Metadata means full qualified role configuration DATA, not caller success flags. Require exactly one QA alias of type kv_namespace and exactly one M OAUTH_KV of the same pinned namespace; reject wrong type, duplicated names, missing fields, accessor/prototype/symbol data and additional OAuth alias. bindingHash hashes canonical {alias,namespaceId} using domain afw.finite-owner-sdk-binding.v1; profile commitments separately bind whole configurations.
+
+- [ ] **Step 1 — Record the accepted root scope.** Verify source branch/head, exact phase-context dependency status and D0 design acceptance. Explicitly record NEW QA namespace access and no operational authorization. Confirm branch lease before source edits.
+- [ ] **Step 2 — Write exact-profile RED.** Existing template lacks alias, so revised expected qaLive/binding helper assertions fail causally. Tests require unchanged canaryLive binding set, unchanged qaClosed pins and matching checked-in config.
+- [ ] **Step 3 — Run cloud RED.** `node --test test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs test/mcp-qa-finite-profile.test.mjs`. Missing infrastructure/dependency is not an accepted RED.
+- [ ] **Step 4 — Implement exact template/config/helper changes.** No new profile role, arbitrary namespace, fallback validator or config override. Keep original QA flags and SDK1.2.1 pin.
+- [ ] **Step 5 — Add linkage regressions.** With actual codecs, revised material.qaBootstrap.record.qaLive.publicStatic.bindingsHash changes materialHash and capsule commitment. A capsule/source from old Q cannot qualify against revised actual metadata. capsule.bindingsHash still identifies M only. Missing/wrong alias, coherently changed QA namespace with unchanged M, extra alias and same-shaped fake profile deny. No rewriting historical bootstrap records/tags.
+- [ ] **Step 6 — Cloud GREEN and source compiler.** Run D0.1 tests plus existing initial capsule/material/bootstrap/profile tests affected by exact expectations. Use established compileFiniteNativeStaging gate once at exact head; preserve2MiB M/3MiB QA limits and capture changed qaLive source/profile hash. Its public mount remains absent; no runtime alias availability claim.
+- [ ] **Step 7 — CAS checkpoint and root review.** Evidence identifies the one new access contract and unchanged historical/M bindings. Root can reject the access delta independently of later SDK code.
+
+No necessary production changes to bootstrap-record/native/publication or capsule schema are expected: their current exact profile/material commitments carry this delta. Tests must demonstrate that; if a consumer hardcodes old counts or wrongly conflates capsule M hash with QA, report exact failure and review the smallest fixed-role correction. Do not loosen those contracts.
+
+
+
+## Root mandatory clarifications
+
+- This edits the candidate SOURCE contract only. Proposed AFW_FINITE_OWNER_OAUTH_KV→existing6b94ff702e504e14a7730cee73a0f6ff is namespacewide QA read/write, not per-key/actor permission. Actual access has NOT been created and no deployment/binding/credential action is authorized by this source task. No new secret/namespace/actor. M physical bindings and historicalqaClosed/c570/M2607 unchanged.
+- mMetadata is COMPLETE ORIGINAL/CURRENT M PREPARATION configuration, not full private canaryLive. Fixed QA source later independently qualifies currentphase; bindinghelper only verifies strictDATA/uniqueexactnames/types/pinnednamespaceequality. Do NOT call fullcanaryLiveprojector on closed/read metadata, inferphasefromflags or tryvalidators. qaMetadata is completeQAconfig with exactqaLivecommitment. Include closed+read_consentMpositives, swapped-role/wrong/coherentlychangednamespace denials. No caller source/verifier/env/SDK/clock or authority output.
+- NewQcontract must bind revisedQAbootstrap/material/capsule BEFOREoneEntry; oldsealedQcannotbeupgraded,relabelled,retrofit orgivenreplacementEntry. Realaliasreadback/ownedrollback/accessreview is later; SourceCLI/metadata existence isn't operativecapability.
+- Actual SDK stays OUT of this unit. No reportpath/nativecallerattestation/resultpayload. D0.2 selectedactualSDKlexicalQA separately, Mforwarduntrusted. No sourcebrokering/POST/mount/grant/cleanup changes.
+- Existingfactualreaderfixture was corrected to set ordinaryschema before historicalFKs/data and awaitcleanup oniniterror. Use eventually accepted actualfixture APIs; never rename/drop historicaltables or replaceSQLclock. Its inheritedtest-onlyceiling/source envelope staysSYN, notactualeligibility.
+- Lint before expensivegroups. Inspect actual existingcompiler/testentry before qualification; record every actualcompile ifa requiredtest invokesit. Prefer ONEfinalactualcompileFiniteNativeStaging with original2MiB/3MiB caps at exactcleanhead, not redundantstandalonebuild. Emitonlypublicsource/tree/modules/graphmetadata, nevermaterial/candidatebytes/keys. Bootstrap/profile/linkage tests proportional, no broadoldsignal/uploadsuitewithoutnewchanged-codeconcern.
+- Fullreport docs/superpowers/reports/2026-11-04-finite-owner-sdk-trust-boundary-d01.md: BASE/code/reportHEAD/tree, exactscope/accessproposal, causalRED/GREENcmd/run/job/attempt/counts/warnings, unchangedhistorical/Mphysicalbindings,actualchangedQApublicStatic/material/capsulehashdomain,finalcompilerbytes/hashes+limitations. RemoveOWNqualifier. Sourceownerpermissions areunchanged; no operationalreadiness/PCoff.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-04-finite-request-signal-final-review.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-04-finite-request-signal-final-review.md b/docs/superpowers/briefs/2026-11-04-finite-request-signal-final-review.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-04-finite-request-signal-final-review.md
@@ -0,0 +1,13 @@
+# Review brief — original signal/profile slice after compatibility closure
+
+Review only the original signal/profile unit's FINAL six source/test/config patches. It was technically blocked by strict legacy consumers; root decomposed those into independently accepted C1/C2/C3. This review completes the unreviewed original slice; it does not rerun/re-review accepted checkpoint internals or replace later whole-branch review.
+
+Requirements: original spec and Task1 plan docs/superpowers/{specs,plans}/2026-11-04-finite-request-signal-opt-in.md at originalBASEaed54dab23b644481aed01cf6b5b94249ecf9f23. Originalcheckpoint report docs/superpowers/reports/2026-11-04-finite-request-signal-opt-in-checkpoint.md at3fb1751c. Final composition report and C3fullreport at this brief's containing commit. Code under review pinned949d84784e83f8859421242edeab3f68c5db93a3. Original-vs-final diff package includes complete six original-unit patches plus commit/file manifest; excluded compatibility patches have their separate review records. One read-only task; no broad code crawl or tests duplicated.
+
+Binding constraints: exact QA/Mflags/date; no passthrough, new binding exception, producer/mount/clock/cancellationRPC; historical2607/c570/pins unchanged; candidateflags sealed beforePlan/capsule and retained through all phases; actualreceiverabort duringheldread and beforeproductguard with no effect marker; pending physicalretention through settlement; original budgets unchanged. No current source success from fixture DTO, no readiness/package/PCoff. Source ceiling expired. No remote/runtime/Entry/DDL/credentials/OAuth/OTP/cron/Max.
+
+Original plan's third full-profile phrase is superseded for future design by exact CLOSED prearm plus distinct T0-derived full setup; this review changes no phase configuration or mutable-family allowances. Both use the same exact candidate flags. Future prearm actual compiled denial remains separate.
+
+Root actual execution evidence: final retained/native group14PASS at2b2af698/run41933043117/job126934496033, receiverDuringHeldRead/receiverBeforeGuard true, sender503 pending/businessProducerfalse; source/template profiles exact. Initial originalfalse/nativeRED and positive experiment pinned in preserved checkpoint. C3fullreport carries allfinal253affectedpasses, finalconsumer/lint/compiler and timeoutdisposition. Root independently verified7historicalblobIDs originalBASE→final and bothqualifiersabsent. Review code/tests and identify any gaps rather than repeat these tests.
+
+Return SpecPass/NeedsFixes + QualityApproved/NeedsFixes and Critical/Important/Minor with file:line. Named outside-diff risks only, focused reads disclosed. No subagents, mutations, runtime or test execution. Parent acceptance is root's composition after this verdict and accepted C3.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task1.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task1.md b/docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task1.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task1.md
@@ -0,0 +1,107 @@
+# READ FIRST — Task1 primera publicaciónconnection
+
+SOURCE ONLY/SYN/UNMOUNTED. Basefuncionalaceptadodba6cde8a18b7810fb59329c6e429be639e6fdc8, código33d3739e6b585a2efd821c2c1006e4e59fbd7ed4. BASE DE EJECUCIÓN es el commitdocs-only que ROOT comunica en despacho; verificarbranch/HEAD/readback antesRED, no elegirWIP. Rootdispatchactiva sólo Task1 aunque headersplan/progresshistóricos diganINACTIVE. Task2/3 no se implementan desde aquí.
+
+PROJECT=AFW;REPOSITORY=tokenizartinfo-ops/agent-friendly-web(public1347578006);ENVIRONMENT=GitHubSOURCE/ActionsSYN;ORIGIN=GitHubAPI;RESOURCE_TYPE=branch;RESOURCE_ID=feat/finite-native-cleanup-20261101;ALLOWED_ACTION=Task1exacta+qualifiertemporal+report/ledger;ROLLBACK=commitspropiosporCAS,sinborrarhistoria. Cloudprioritario;no localclone/deps/build/tests/downloadsdedependencias.
+
+Leer diseño completo specs/2026-11-05-finite-native-first-connection-publication-design.md, plan globals+Task1 en plans/2026-11-05-finite-native-first-connection-publication.md y preflight reviews/2026-11-05-finite-native-first-connection-publication-preflight.es.md. Este brief incorpora Task1literal y rulings para ejecución, no pide rehacer diseño. Linkaceptado reviews/2026-11-05-finite-native-notice-link.es.md; no redespachar Link/POST/GET/D04/store/journal/fanout.
+
+## Global Constraints
+
+- operationalReadiness=false; completePackage=false; PCoff=false.
+- C0=I0+900000; C1=C0+180000; fuente 2026-11-03T02:59Z vencida.
+- M y QA conservan root original <=30000 ms. Child <=5000 ms, siempre recortada al parent restante.
+- No refrescar identidad/Access ni I0/C0/C1. childDeadline sólo narrowing del original; nunca now+fresh.
+- El predecessor positivo NO puede proceder de seedPhaseFacts, ACK prefabricado ni escritura directa de effects.
+- Sólo AFW_DELEGATED_OAUTH_ENABLED pasa de false a true. Bytes, módulos, referencias físicas y todos los demás campos son idénticos.
+- Ningún hostname, flag, ruta administrativa, credential o namespace nuevo. Ningún provider/custodia/roles/OAuth/permisos operativo nuevo.
+- Root, child, native holders y Promises reales se conservan hasta settlement; timeout/abort no son physical drain.
+- Ninguna admisión persistida/reanudable, source factory, DTO de autoridad, callback aprobador, raw pair, allowPending, lector público ampliado o HTTP genérico exportado.
+- Faltan datos nativos: fail closed. Rutas finite nunca caen al writer ordinary, incluso con QA ausente o phase no soportada.
+- Notices no requiere NoticeLink como gate nuevo; finite sí. Link presente se correlaciona; primera connection exige snapshot.noticeLink=null según el contrato aceptado que entregue root.
+- Tercer CLOSED, finite_prearm, publicación notices, selección/full setup, ARM, guard, suscripción, entrega y retirada útil quedan fuera.
+- Esquemas/DDL/store/journals/records, SDK/OAuth ordinary/authority, notice body/wire/forwards/receivers, source stubs, bootstrap/material/initial activation/cleanup semantics, perfiles/wrangler y build scripts quedan protegidos.
+- GitHub cloud únicamente para trabajo futuro autorizado: sin clones/deps/builds/tests locales, main/merge, runtime ni acceso a Cloudflare real. Este plan no ejecuta tests, compilaciones, Actions o providers.
+- Qualifier SYN futuro: como máximo tres jobs independientes, <=15 minutos por grupo, sin secrets, permisos sólo contents:read. Root fija BASE, alcance y qualifier antes del primer dispatch; ningún workflow nuevo implícito en el filemap.
+- No repetir suites aceptadas sin riesgo del delta; no sleeps/retries para ocultar fallos, no ampliar plazos ni quitar rechecks para lograr GREEN.
+- Rollback SOURCE sólo commits propios con CAS y protected blobs; nunca borrar journals, tickets, grants, version history o material original para ocultar incertidumbre.
+
+## Review Focus
+
+1. Un request finite malformado o QA inaccesible podría caer al SQL ordinary: Task 2 posee “T2 finite dispatch never falls through ordinary”, con espía antes de SQL y cero efectos.
+2. Una respuesta fallida puede bloquearse en cancel mientras otro request entra: Task 1 posee “T1 known failure retains real cancellation”; Task 3 posee “T3 retained work blocks a different live root”, con settlement observado y lease nueva vigente.
+3. Un ACK ajeno con hashes válidos podría lavar un efecto parcial propio: Task 3 posee “T3 resealed foreign publication is not own completion”; codecs válidos y rechazo del correlador antes del siguiente SEND.
+4. La extracción puede alterar tiempos, claves o volver a consumir enrollment: Task 1 posee “T1 enrollment preserves literal chronology and one shot”, con secuencia exacta, Ack preparado en el punto original y consumo antes de await.
+5. El positivo puede compilar M ordinary o cambiar bytes después de fijar cápsula: Task 2 posee “T2 initial artifact already contains fixed finite dispatch”; Task 3 posee “T3 same initial bytes produce connection and downstream”, con hashes/metafile y ningún predecessor seeded.
+
+
+
+## Scope Task1 y exclusiones
+
+| ID | Path autorizado Task1 |
+|---|---|
+|P1|lib/mcp-qa-finite-fixed-policy-engine.mjs|
+|P2|lib/mcp-qa-finite-preparation-enrollment-writer.mjs|
+|P3|lib/mcp-qa-finite-policy-transport.mjs|
+|T1|test/mcp-qa-finite-policy-transport.test.mjs|
+|T2|test/mcp-qa-finite-first-connection-publication.test.mjs|
+|F1|test/fixtures/finite-first-connection-publication.mjs|
+|F2|test/fixtures/finite-initial-entry-world.mjs|
+
+Sólo estos7code/testpaths. Infraautorizadaextra:.github/workflows/afw-first-connection-qualification.ymlTEMPORALmáximo3jobs<=15min,Node22/npmci--ignore-scripts--no-audit--no-fund,contentsread/nosecrets/checkoutpersistfalse,branch/pathscopedpush,norerunsniworkflowdispatchreal. Retirarqualifieralterminar. Informe reports/2026-11-05-finite-native-first-connection-publication-task1.md y progreso progress/2026-11-05-finite-native-first-connection-publication.es.md. Nootroarchivo/framework/protectedmodule/standardbuildsinrulingRoot; elevarnecesidadconcretaantesdeafectarlo. Sinhelpers/reviewerpropios;Rootasignalarevisiónfresca.
+
+NoTask2mount/wire/bridge/fetch;noTask3producer/choice/phasecontext/receipt. No SourceRegistry/factorypositiva ni cambiosstubs/flags/SDK/roles. P3oldownerconservapending yenrollmentexacto; fullsetupconserva admisiónPolicyindependiente. No consumeadmisiónennuevohelperni vuelveaconsumirlaenoldcaller.
+
+## Reconciliación Link aceptado y rulings Root
+
+- Currentphaseblob64039ec709053e2e82faf67ed013399244faee05/snapshot.preparation.noticeLink=null enfirstconnection. La lectura se añadió DESPUÉS del validadorexacto10camposenrollment, no introducir camposprivadosantesdespread aesecontrato. Task1noedita phasecontext.
+- Consentahora importaprepareNoticeIssued/issueNotice/actualExchangeMcp/ticket/consent del fixtureGET;fixture3d279,Consent2169,Link7a2ce. Task1noeditaesosarchivos; su reutilización queda intacta.
+- No nuevogateLinkparanotices. La unidadcompletafuturepreservaSource/owner/window/capsule/IDs; actualCloudSourceProofnone aquí.
+- Enrollment component puede usar DATAapprovalSYNVALIDA paraejercitarwriterfactual, sin providerPOST/ConnectionReceipt/admisiónhumana. Planpaso3‘no sintetizarapprovalpositiva’prohíbeusarlacomoAUTORIDADopredecessorpositivoT3; no prohíbeDATAaisladaaprobadaenpreflight.
+- P1describe.path es URLABSOLUTAliteralfija. RequesthashusaesaURLUNAVEZ; oldROOT+relativo ynewdescribe deben coincidir exactamentemétodo/body/URL. No exportarhttp(method,path,body),ROOT/token/configurabletarget niwiregenérico. Guard del engine es current-checkléxico de callersfuente, no callback queaprueba.
+- Extraer enrollment literal: mismoskeys/caps/ACK/readbacks/orden/sourcechecks/lease y actualPromises. native transaction retry callback tampoco permite dobleappend. Cada método one-shotseconsumeantesawait; fallo absorbente. childDeadlineoriginalnarrowing, nunca nueva ventana. ConservarpuntonativodondeAcksecrea después de readbackEnrollment yantesde segundoqualified.
+- Knownfailure debe quedar lógico antesdecancelpendiente manteniendo actualcancel/read/fetchretenidos; no llamarPromise.racetimeoutsettlement. No omitircleanupni borrartrabajoparadarverde. Oldresultadoexterno/Policyregistrosconservados; se documenta cambio intencionaldeobservaciónfallo internosi lohay.
+- No importQAphasecontext/candidateResidency/bootstrap aM porhelpers compartidos; verificar grafo actual, no renombrar módulos paraevitarcontrol. P1/P2dependenciasmínimasdelmotor/writeractual.
+- M1baselinesdkReadCurrentSYN:2failsinicialesnofuncionalesLink,no reproducidos,nunca reparadosporretry. Si reaparece conservarstackoriginal/primaria ypedircontexto, nosleep/retry/relojpatch. WarningsM2deferredwholebranch: no upgrades/no‘pristine’claim. ConsentMinorSQLsettlementCLOSED,preservarsusasserts.
+
+## Task 1: Extraer engine y enrollment conservando los callers actuales
+
+**Files:** crear P1/P2/T2/F1; modificar P3/T1/F2. No modificar policy-setup ni stage-work. F1/F2 se declaran aquí porque el helper necesita una prueba nativa aislada antes del productor; T2/T3 los reutilizan, sin un fixture adicional oculto.
+
+**Interfaces producidas:**
+
+P1: createFiniteFixedPolicyEngine({ctx,env},guard) devuelve frozen:
+- describeUpload({configuration,baselineVersionId,bytes}) → {method:'POST',path,body}.
+- upload({configuration,baselineVersionId,bytes},lease) → Promise<resultado provider validado>.
+- describeActivation({versionId}) → {method:'POST',path,body}.
+- activate({versionId},lease) → Promise<resultado provider validado>.
+- readPointer({versionId,deploymentId},lease) → Promise<void>.
+- readVersion({versionId,module,configuration},lease,closed=false) → Promise<metadata verificada>.
+
+ROOT/account/worker/métodos/path literales dentro de P1; describe.path es la URL absoluta fija ROOT+suffix y describe y operación forman el mismo request. requestHash usa esa URL una sola vez, idéntica al antiguo ROOT+path relativo. No export http, wire configurable, token, target ni transporte. guard es el current-check léxico de los dos producers internos; no crea fuente o aprobación. Cada caller conserva admisión y source checks antes/después de sus fases.
+
+P2: prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId,stageApprovalHash,ownerSource,baseline,baselineBytes},childLease,childDeadline) → Promise<{recordEnrollment(),recordAck()}>. recordEnrollment() → Promise<{enrollment,ack:null}> y recordAck() → Promise<{enrollment,ack}>, donde enrollment y ack son los records Enrollment/Ack del codec preparation-cleanup existente. Devuelven sólo esos records originales verificados; recordAck usa el Ack privado preparado por recordEnrollment, no argumentos de caller. Native holders/anchors/ownerRows y bytes defensivos pertenecen al helper; el caller conserva fuente/admisión. Cada método se consume antes del primer await. Sin setters, nuevo reloj, callback source ni recuperación después de unknown.
+
+**Fixture factual aislado:** F2 añade initialEntryHarness('first-connection-enrollment-component'); F1 añade exerciseEnrollmentWriter(f,scenario) → Promise<{trace,enrollment,ack,failure,settled}> como helper Node SYN fijo, sin exports producto ni callback de aprobación. Reutiliza material initial real del harness y puede preparar DATA SYN de approval para probar P2, que no consume ni concede admisión. Escenarios literales normal/double-enrollment/ack-first/double-ack/unknown-enrollment/unknown-ack/holder-drift/deadline. Cero provider POST y ningún ConnectionReceipt en todos ellos; esta prueba no acredita permiso humano ni es predecessor positivo de T3. No copiar el setup del world.
+
+**Interfaces consumidas:** contratos actuales de journal/store/cleanup/stage-work y de lease, sin cambios. P3 continúa consumiendo admisión exactamente una vez; old owner termina pending como antes. Su setup conserva PolicySend/PolicyAck/PolicyReceipt y payloads originales.
+
+- [ ] **1. RED de contratos:** añadir en T2 “T1 fixed engine exposes only finite operations” y “T1 enrollment preserves literal chronology and one shot”; en T1 adaptar la exposición test-only del engine a P1 sin añadir exports públicos al producto. Assert nombres exactos, ausencia de http/wire/ctx/setters, method/path/body iguales al motor previo, secret inherit del baseline exacto. Antes del refactor el contrato nuevo falta; el fallo debe señalar esa ausencia, no un import typo.
+- [ ] **2. RED de retención:** añadir en T1 “T1 known failure retains real cancellation”. Respuesta inválida con cancel retenido: fallo lógico observado, cero siguiente efecto y Promise real todavía pendiente; liberar, exigir settlement observado. Incluir holder/role drift y respuesta malformada sin interpretar boolean de test como autorización.
+- [ ] **3. Verificar RED en cloud autorizado:** ejecutar sólo T1/T2 con los nombres T1 y conservar fallo causal. Para extracción enrollment, capturar traza y datos del writer previo como referencia literal antes de sustituirlo; no sintetizar approval positiva ni fixture externo nuevo.
+- [ ] **4. Implementar P1 y adaptar P3:** mover validadores/límites (respuesta 4718592) y capturas; operaciones fijas, retención fetch→read→cancel y fallo absorbente. Los caller setup/owner conservan sus propios source/admission checks. Ninguna residencia/phase-context se importa.
+- [ ] **5. Implementar P2 y adaptar P3:** mantener orden original transport:65–123: captura/validación; caller qualified; Enrollment transaction→sync→readback→cleanup; construir Ack/acknowledgedAt en el punto original; caller qualified; Ack transaction→sync→readback→cleanup. Comparar claves, timestamps relativos, contenido, alarm, exclusiones y bytes; segundo uso o Ack sin Enrollment rechaza antes de IO. Deadline proviene de la child original, no de now+fresh. Retener el trabajo real aunque timeout gane.
+- [ ] **6. GREEN:** node --test --test-reporter=spec --test-concurrency=1 test/mcp-qa-finite-policy-transport.test.mjs test/mcp-qa-finite-first-connection-publication.test.mjs. Exigir todos los nuevos T1 ejecutados/PASS y cero fallos; ejecutar además la selección setup de “Regresiones”, porque P3 comparte engine con ese consumidor. Trace equality y owner pending son obligatorios.
+- [ ] **7. Commit y revisión:** commit “refactor: share fixed finite policy operations and enrollment writer”. Revisar interfaces, graph sin QA en M y exactitud old behavior; no publicar ni afirmar first connection terminada.
+
+
+
+## Tests/proof y operación de la tarea
+
+Expectedcounts sólo después de listarcasosrealesnuevos, no0matches/skipseleccionadocomogreen. TDD causal para contratos ausentes y known-failure/body-retention; error de importtypo/noharness noesREDdelcomportamiento. No copiar50/31casosni correrestándaresparasustituirunsmoke.
+
+GREEN final mínimo: suitesP3/newT2Task1 segúnplan; selección3setup ‘Task4 actual native wrapper DO store and two-effect engine installs only actual ACK versions’, ‘Task4 lost activation ACK cannot produce installed receipt or repeat effects’, ‘Task4 held nested hydration retains original lineage after response until actual settlement’. RootcotejónombresenBASEdba. Porcambiografoshared,PUEDE usarseUNAcompilación/test existente ‘actual compiler staging hashes final bytes and retains source classes without eligible manifest’ conmetafiles/hashesdelbuildreal, máslint7paths. No modificar buildtest/scripts ni compilarotra vez sóloparacifras. Split<=3jobs parafootprint, nogrupo>15min. Una vezpasados checks, no ampliar/repetir salvo cambio/fallo/riesgoconcreto.
+
+Capturar IOreal/Promisessettled ymetafiles si losharnessyemiten; distinguir fixturesvsestándar/númerosobservadosvsno capturados. No heredar118/98ni prometercoste/fit futuro. Sin zip/temporal localinnecesario; metadatos/logsGitHubprimero. Sourcecompilerstaging sigue completePackagefalse; no emitircandidatecomoaprobación.
+
+CommitporCAS/readback. Al terminar retirarqualifier; informe con BASE/finalHEAD/tree/blobs, cambios/contratos, RED→GREENycomandos/salida/counts, artifactdigest7d, exactmapa/regresiones/protectedblobs, preocupaciónpendiente. No hash autorreferente. No autoaceptaciónniTask2: STOPWRITES yreturnshortcontract para reviewerfrescoRoot.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task2.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task2.md b/docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task2.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-native-first-connection-publication-task2.md
@@ -0,0 +1,105 @@
+# Task 2 — despacho finite en el initial CLOSED
+
+## Resultado y límites
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=GitHub SOURCE/Actions SYN; ORIGIN=https://github.com/tokenizartinfo-ops/agent-friendly-web; RESOURCE_TYPE=branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=únicamente Task2 y sus pruebas/documentos enumerados. Root entregará por dispatch el BASE exacto: descendiente docs-only de Task1 aceptada97ee8675e614032af2f3caa9fe3eaa24d991c7d1. Verificar ref/tree/parents antes de editar. No hash autorreferente aquí.
+
+El artefacto initial CLOSED debe contener los cuatro conduits M→QA desde su construcción. Choice mantiene negocio pending; ninguna primera ConnectionReceipt ni permiso de publicación nuevo en esta tarea. Task3 reutilizará la construcción sobre sus bytes finales y creará NUEVA lineage; jamás continuará una cápsula antigua después de cambiar código.
+
+READ FIRST: esta brief; plan 2026-11-05-finite-native-first-connection-publication (globals, Task2, interfaces, regresiones); spec del mismo nombre-design (secciones3/4/9/10); preflight Root vigente; aceptación Task1 en reviews/2026-11-05-finite-native-first-connection-publication-task1.es.md. Task1 está completa y no se reabre. No repetir preguntas rutinarias: owner autorizó encadenar; dudas concretas de alcance/arquitectura a Root, no al owner.
+
+## Filemap cerrado y writer único
+
+Exactamente13code/testpaths (reconciliación Root posterior a diagnóstico):
+1. worker/mcp-own/finite.mjs
+2. worker/independent-closure/finite.mjs
+3. lib/mcp-qa-finite-owner-native-wire.mjs
+4. lib/mcp-qa-finite-owner-native-bridge.mjs
+5. lib/mcp-qa-finite-owner-native-receiver.mjs
+6. test/mcp-qa-finite-first-connection-publication.test.mjs
+7. NEW test/mcp-qa-finite-first-connection-publication-native.test.mjs
+8. test/fixtures/finite-first-connection-publication.mjs
+9. test/fixtures/finite-initial-entry-world.mjs
+10. test/mcp-qa-finite-owner-native-wire.test.mjs (sólo normalización DATA SYN indicada abajo)
+11. test/mcp-qa-finite-owner-native-conduit-native.test.mjs (mismo límite).
+12. lib/mcp-qa-finite-initial-material.mjs (único prerequisite producto extra Root).
+13. test/mcp-qa-finite-initial-material-native.test.mjs (ownership/forgery/bytes mutables/vida).
+
+Extras explícitos: TEMP .github/workflows/afw-first-connection-qualification.yml, reporte reports/2026-11-05-finite-native-first-connection-publication-task2.md y progress/2026-11-05-finite-native-first-connection-publication.es.md. No otro fixture/framework/API ni archivo producto; no phase-context, preparation, SDK, ordinary index, scripts, configuración, SQL/schema/DDL, journals/store/records, perfiles o P1/P2/P3. Si falta un path, parar y pedir ruling Root antes de tocarlo. No helpers/reviewer propios ni iniciar Task3.
+
+## Preflight de interfaces
+
+| Par | Entrada concreta | Salida y cierre |
+|---|---|---|
+| M finite default→forwards | Request exacta + env/ctx/raíz registrada antes del primer I/O | Sólo forward fijo existente; no fallback ordinary en rutas finite. finish en finally, trabajo real retenido. |
+| QA finite DO fetch→receivers | POST interno de uno de cuatro targets literales, metadata DATA y boundary M original | Receiver existente correspondiente; raíz QA local recortada, nunca aprobación derivada de DTO. |
+| Choice wire→bridge→pending receiver | GET vacío o POST form<=1024bytes/UTF8/escapes/cookies válidos | HTML QA<=16384 con headers permitidos; error/pending no se convierte en publicación. |
+| Compiler+F2→F1 SYN | Initial real construido con dispatcher desde origen, bytes/hashes/cápsula fijados | Requests/provider registry factuales; no phaseCurrent positivo prefilled ni seedPhaseFacts de connection. |
+| T5/T6 legacy→validación estricta | Inputs SYN válidos para alcanzar drift/hold que ya verifican | Mismas assertions, cancel/abort reales y cero efectos; no parser relajado ni fixtures legacy cambiados. |
+| Task2→Task3 posterior | Construcción cerrada y contratos revisados en código final | Task3 creará nueva lineage sobre su HEAD; Task2 no entrega receipt inventado ni cápsula reanudable. |
+
+### M y QA
+
+Modificar sólo default wrapper del perfil SOURCE M y preservar AfwNodeControl/AfwOwnEventNode/cleanup/legacy. Origen exacto https://delegated-canary.agentfriendlyweb.dev. Rutas reconocidas se interceptan por pathname antes de ordinary: GET/POST /connections/finite-prepare→forwardFiniteOwnerChoice; GET/POST /authorize→forwardPrivateFiniteOwnerOAuth; GET /monitoring→forwardPrivateFiniteOwnerNoticeGet; POST /monitoring/grant→forwardPrivateFiniteOwnerNoticeConsent. Rechazar /connections, /connections/revoke, /monitoring/revoke y métodos no soportados. URL/origen/query/hash malformados no llegan a SQL ordinary. /oauth/token y /mcp conservan SDK bajo sus gates existentes.
+
+Choice puede consultar QA con bindings/version/actor originales. OAuth y notice requieren AFW_DELEGATED_OAUTH_ENABLED==='true'; los handlers QA ya calificados exigen read_consent/grant/owner/JWT/CSRF/historia/caps. NO depender del flag ordinary monitoring: prepara consentimiento, no instala stage notices. No fallback SQL ni autorización desde ese flag.
+
+QA IndependentClosure.fetch despacha sólo POST a:
+- https://afw-private.invalid/_finite-owner/choice
+- https://afw-private.invalid/_finite-owner/authorize
+- https://afw-private.invalid/_finite-owner/monitoring
+- https://afw-private.invalid/_finite-owner/monitoring/grant
+
+Prefijo finite desconocido deniega; fuera conserva super.fetch. No cambiar default QA, workflows, alarm, bootstrap o métodos iniciales. Choice continúa pending hasta Task3. Metadata versión M es hecho de entrada, nunca se normaliza para igualar un pointer nuevo.
+
+Exports/contextos existentes verificados en Task1HEAD:
+- oauth-forward.mjs: forwardPrivateFiniteOwnerOAuth; oauth-qa.mjs: createPrivateQaFiniteOwnerOAuthReceiver.
+- notice-get-forward.mjs: forwardPrivateFiniteOwnerNoticeGet/Consent; notice-get-qa.mjs: createPrivateQaFiniteOwnerNoticeGetReceiver/ConsentReceiver.
+Todos llevan prefijo lib/mcp-qa-finite-owner-. Consumir interfaces existentes; no duplicar sus handlers ni importarlos al revés desde QA hacia M.
+
+### Gramática y respuesta
+
+GET choice sin body/query/hash. POST application/x-www-form-urlencoded, bytes<=1024, UTF8/escapes válidos, exactamente handle/projectRef/decision=approve, únicos; handle y projectRef hex64. Cookie prepare única matching, cookies ajenas válidas no son credenciales; cookie-list vacía/malformada/duplicada se trata según contrato. Reusar readFiniteOwnerNoticeConsentBody bajo alias local, sin cambiar archivo o semántica. GET exige cero bytes del lector real acotado.
+
+Bridge sólo HTML/headers QA permitidos, body<=16384, no-store/CSP/referrer policy. Respuesta no exitosa jamás200; unknown/body/cancel/error permanece cerrado. No echo de headers arbitrarios/IDs/provider/secretos. Capturar y revalidar holders/signal/headers originales donde corresponde; conservar same retained actual Promise hasta settlement.
+
+### Ruling de tests antiguos (única ampliación al plan inicial)
+
+Root leyó T5/T6 y fixtures sender/receiver en Task1HEAD. T5 línea19 hoy envía Cookie 'SYN-cookie' sin '=' para probar drift; reemplazar sólo ese INPUT y su expected literal por una cookie-list válida (por ejemplo synthetic=SYN-cookie), conservando comprobación de preservación/captura/secreto/no QA holders. T6 línea40 hoy usa form 'SYN=bounded' para alcanzar un hold del reader QA; reemplazar por handle=<hex64>&projectRef=<hex64>&decision=approve y cookie __Host-afw-finite-prepare matching. Conservar TODAS las assertions, señal nativa, hold real, contadores/readCancelled/settled/cero businessRows. La gramática elegida debe rechazar los viejos inputs: no debilitarla para mantener esos ejemplos. No cambiar fixtures legacy; Root comprobó que propagan Request real y permiten esta normalización sólo en tests. Los demás malformed/size casos siguen siendo negativos.
+
+## Fixture propio y causalidad
+
+F2 añade initialEntryHarness('first-connection-publication') sobre lifecycle f existente. F1 helpers Node SYN fijos approveFirstConnection(f), readFirstConnectionProbe(f), setFirstConnectionFault(f,fault), sólo faults negativos literales pertinentes. Sin source/pair/expected/callback, no importar F2 desde F1 ni exponer aprobación. F2 importa F1. Provider registry conserva requests realmente recibidos y bytes/config/pointer exactos; no un positivo sembrado. Siete DDL/filas ajenas y modos anteriores intactos. Un pending en Task2 es cierre seguro, NO conexión funcional.
+
+CLOSED debe compilarse con el dispatcher ANTES de fijar cápsula/residencia/hash. No reemplazar M por wrapper ordinary para el positivo ni parchear bytes/hash/cápsula posterior. QA contiene residencia M exacta; M no contiene decoder/residencia QA ni su bundle. Sin build-script changes ni completePackage claim.
+
+## RED, GREEN y coste proporcionado
+
+RED focal nuevo prefijo '^T2 ' en los2archivos first-connection-publication (pure+native), con fallos concretos dispatch/gramática/artefacto; no imports, fixture incompleto ni baseline falso. Preservar primaria. Mantener casos Task1 como contratos.
+
+Qualifier autorizado <=3jobs, timeout-minutes<=15 por job, Node22, npm ci --ignore-scripts --no-audit --no-fund, contents:read, persist-credentials:false, sin secrets, push sólo SOURCE/paths explícitos. Retirarlo antes de lotes y recrearlo ÚLTIMO; remover final. Sugerencia proporcional a ajustar sólo con datos:
+- contratos Task1+Task2 del archivo pure + T5 completo y lint13paths;
+- T3 nuevo completo (nombres Task2) + T6 completo;
+- compiler staging seleccionado: 'actual compiler staging hashes final bytes and retains source classes without eligible manifest' y 'missing_factory_blocks_package', confirmar nombres exactos BASE.
+Nada de full Link31/POST50/GET81/setup3 por rutina. No npm test global, sleeps/retries, fanout nuevo, clocks/deadlines amplificados o assertions suprimidas para GREEN. Cero matches/skips de seleccionado/wrapper sin assertions no cuenta. Si no cabe, Root decide grouping con medida; nunca ampliar timeout.
+
+Capturar hashes/metafiles/bytes/grafo si la ejecución los produce, sin otro build sólo para métricas. Registrar compile y SQL/DO/IO reales si disponibles; no heredar cifras118/98 ni prometer fit. Root acepta trabajo anterior con primarias fechadas, no como prueba runtime.
+
+## Escrituras, entrega y gates
+
+GQL update_ref falló con error interno ya preservado; no volver a probarlo ni tocar credenciales/settings. Ruling REST contents API: branch SOURCE explícita siempre, fileSHA-CAS para existente o create sólo ausente, escrituras SECUENCIALES de writer exclusivo. Antes primer write verificar BASE. Tras CADA write verificar parent previo, único path permitido, ref, blob/contenido exactos. No atomicidad multiarchivo; qualifier último. Unknown/interferencia→preservar y avisar, sin retry ciego/force/defaultbranch. No local clone/deps/build/test: GitHub/Actions.
+
+Informe completo de una vez: BASE→HEAD/diff entero/parents/primarias run-attempt-jobs/casos ejecutados-PASS/lint13/graphs-costes medidos/errores y fixes causales/artifacts-expiry/protegidos y limitaciones. Retirar qualifier y STOPWRITES para reviewer fresco Root antes Task3.
+
+M1 sdkReadCurrent viejo sigue desconocido/no reproducido; M2warnings RPC/toolchain no pristine; M3 segundo intento durante cancel deferido al gate de retención Task3/whole-branch (no arreglarlo aquí). SQLConsentMinor cerrado. No volver a contar/ejecutar gates anteriores por su debt.
+
+C0=I0+900000,C1=C0+180000,parent30s/child5s, ceiling operativo3Nov02:59UTC vencido y no renovable anticipadamente. Sin recursos/runtime/provider real/alias/Entry/DDLreal/OAuth/OTP/tokens/permisos/cron/Containers/Max/main/merge/ARM. operationalReadiness=false; completePackage=false; PCoff=false. Task2 no instala guard/suscripción/entrega ni permite pedir apagar.
+
+
+## Reconciliación Root para cierre de Task2
+
+Los13paths anteriores incorporan el ruling posterior: weakMap privado captura script LOCAL previamenteSHA-validado y refs exactos decontext/artifact congelados; comparar identidad/valor en vez de SÓLOrehashscriptinmutable. SHAbytesMUTABLES/type/length/materialhash/recordhash/r.check/holders/source/leases/todosawaitrechecks preservados; initial-entry/lease nuncaeditados. No cambiodeclock/chunking/artefacto/cachéDTO. Primariaantes5004>=5000/599reads/4714guardms; despuésmismabaselineguard1711ms y upstreamfactual. Rootpreflight6Nov y reportTask2 fijan fuente/Scope13.
+
+T5/T6 tienen4SIZEassertions sender+receiver: headersválidos para alcanzar reader1024,413exacto (no[400,413]) y renamefirst400→first413. Todaslas demásassertions de cancel/retención/zeroeffect/malformed vigentes. Esta precisión supersede la prohibición genérica de cambiar literalstatus cuando corresponde al nuevo límite.
+
+El implementer terminó SOURCE3eebf3b1d50d7537c6ae72138a08b44b2b59ee93 yquitóqualifier. Final42138702058=55+5+2PASS/0F0SKIP,lint13limpio; material5PASSreutilizados conblobsidenticos. No se acredita aceptaciónporCI; Rootfreshreview tiene gates finales. Owner pidió terminar ESTEbloque,guardarydetenerseparaapagado normal: no empezarTask3esta noche ni pedirapagarcomoensayo. Task3mañana debecrearnuevalineageconsusbytesfinales.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-native-notice-consent.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-native-notice-consent.md b/docs/superpowers/briefs/2026-11-05-finite-native-notice-consent.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-native-notice-consent.md
@@ -0,0 +1,243 @@
+# Task brief — POST humano de avisos y correlación factual
+
+READ FIRST. UNwriterfresco SDD, sin subagentes/helpers/reviewerpropio. Rootpreflight reviews/2026-11-05-finite-native-notice-consent-preflight.es.md. Informe reports/2026-11-05-finite-native-notice-consent.md (sin -design). PROJECTAFW; REPOSITORYtokenizartinfo-ops/agent-friendly-web(1347578006 PUBLIC); rama feat/finite-native-cleanup-20261101; GitHub/ActionsSYNcredentialfree,no localclones/deps/build/tests. INACTIVE hasta rootdespacheBASEexacto posterior que contengaestosdocs. Pindiseño61b8bb4,no ejecución. GETaceptadof687/sourcee71conP3diferidoobligatorioaquí, sinrepetirunidadGETporresumir.
+
+## Rulings root obligatorios
+
+1 Sólo10paths de spec+report+qualifier temporal .github/workflows/afw-notice-consent-qualification.yml. CadaAPIexactayprivacidad/identity/window/journal/SQL de specesvinculante. No11ºpathporinferencia. Protectedstore/journal/codec/SDK/nativewire/stagework/source/Mordinario/world/config/flags intactos. Consultararootantecap/contrato/fit nuevo; noalownerparadecisiónrutinaria.
+2 P3cookies perteneceaestaunidad,sinfixloopdeGET: resolvergramáticacompartidaGET/POST+pure/nativecausalREDyGREEN antesdecerrar. No rawHashnormalization de cookiespropias niOAuthordinario. Valoresquotedajenoslegítimos nodebenromperflujo. AnteCookieausenteGETpermitegrammarperoautoridadsigueprepareobligatoria.
+3 Qualifier temporalpushscoped/nosecrets/contentsread/persistfalse/npmciignorecloud/timeout<=15minporjob,2jobsindependientesmáximo POSTnative y GET/regressions;sameHEAD/artifacts7d separados;retirarfinal. Noautoprocesopermanente/cron/novachat/cloudentorno/CFmutation. Rerunsmanuales/replay no sonun intento nuevo.
+4 Resealnegatives debenpasarcodec yjournal.readNATIVOantesdedemostrarfallocorrelador; markerspasivosSYNpermitidosenespecíficoinstrumentadorfixture10paths,preservandooutputs/throws/guards. No DataACKcomoSQLhumano, pair/sourcefactory/mockpositivo/allowPending/decisioncallback. ExistingGETnegatives pruebanrechazo,noaislamientodepredicados.
+5 Mismoactualstore/witness/lease/Common/window enobserve→SEND→nativeINSERTRETURNING→ACK yfull2snapshots. SQLPromise/result/settledvivenlexicalhastaúltimorecheck, appendrefsseparadas. CurrentAccessmenorqueelexpiryoriginalniegaantesSEND,norenueva/recorta. Child5s/parent30s/C0C1originales; cualquierfitfalloregresaarootsinquitarchecks.
+6 WorldYAaceptadocompleta7DDL/SYNphasecontextcon4DDLconsent/3eventosajenos/2grantspreservados; noeditworldniDDL. Aprovecharhistoriaajenaparaautoincrementglobal>1; jamásprefillpositivooriginal. SalidasSDK/readerspúblicos3keys/OAuth/GETsiguennegandoownnoticehistory; POSTbaselineesprivadafijanoexportada.
+7 CapturarsólocompilesQA/Mrealmenteusadosconmetafiles/inputs/hash/bytes.NOSTDextraactualsiEntryunchanged/phaseunmounted; edgeSTDnuevoevidenciarootantesbuild. Stage-workretenciónactualscope,nofísicodrain. IOcontarporfases/body/cancel/firstall/HTTPnative sinvaloressecretos;stdoutresumido,detalleartifact.Norepetir50ms/allSDK/store/journalporcostometría.
+8 NuevoPOSTfilecompleto/GETcompleto/purephasefull yselected16/6/4 exactosplanes; contarTAPrealnofilterzero ystaticn oseleccionadosseparado. Reusarpassedgroupsdeunchangedblobstrasfixmínimo sinbroad repetitioninjustificada; lintcambiados proporcional. Corregirassertiondemétricas sólo conobservaciónrealydiffdentrode10paths; si fuerademapa vuelvearoot.
+9 Finalreportincluyetodosfallos/comandos/counts/heads/nativevsSYN/compilecosts/unknownACK/noretry/nophase/noMount,protectblobs+BASEdiff.Cada jobterminal avisa run/head/jobpara rootprimarias, n oes peraralreport. Rootrevisiónfreshspecqualitydespués;writer nosiguienteunidad. operationalReadiness=false;completePackage=false;PCoff=false. Sourceceiling3nov02:59Zexpirado,sinrenovaciónanticipada.
+
+## Contrato y tarea vinculantes
+
+# POST humano de consentimiento nativo e inventario privado
+
+2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Diseño para preflight, no autorización de implementación. Actualiza únicamente este diseño POST; los informes previos permanecen intactos. Inspección inicial dc4edafc0b5e4ba440cd32a21dd3dd58024e811a; reconciliación focalizada contra GET aceptado SOURCE f68797ca0ad083aa4e90be87c83b5f60f2aa691b/tree8f07c7e2bc98ab08f8a943f3c98bb9045b0af2b1. Código leído en cfe8f0ddde1d782757dd7e0d3160967f325df553; f687 añade cinco docs con producto idéntico según aceptación/readback root. Root acepta quality Approved with Minor/P3, sin Critical/Important; P3 cookie-list se difiere expresamente a POST, no está corregido. APIs GET reales coinciden con las propuestas. Sigue pendiente preflight root y futuro BASE de ejecución.
+
+## Resultado y alcance
+
+Una petición humana POST /monitoring/grant auténtica, recibida por M y QA fijos, verifica de nuevo identidad y CSRF, observa el ticket original y registra UNA decisión mediante el store nativo antes del ACK journal. Respuesta positiva únicamente después de dos snapshots completos iguales al frame esperado. La unidad incluye formulario GET activo sólo SOURCE. No monta rutas, no habilita avisos, suscripción, entrega, NoticeLink, nueva PhaseStage, source notices/finite, third CLOSED, ARM, hosting o PCoff. POST /monitoring/revoke y gestión posterior permanecen cerrados; el HTML no ofrece un control de retirada que este slice no implementa.
+
+Store y journal aceptados son dependencias protegidas. ACK DATA/hashes describen relaciones; no autentican persona ni prueban por sí solos ejecución SQL. El productor fixed QA conserva la Promise y el resultado SQL reales en su continuación privada; un GET previo no hereda autoridad humana al POST. No flags, reloj caller, identityDTO, allowPending, callback aprobador, raw pair exportado ni source factory.
+
+C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. Sin rearm/renew/retry. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Filemap cerrado reconciliado (no seguir WIP)
+
+1. lib/mcp-qa-finite-owner-phase-context.mjs: correlación privada de consent; baseline POST y handler fijo; activar HTML GET exclusivamente al aceptar toda esta unidad.
+2. lib/mcp-qa-finite-owner-notice-get-wire.mjs: conservar exports GET y añadir gramática/metadata POST fijas y validator privado cookie-list común GET+POST que resuelve P3.
+3. lib/mcp-qa-finite-owner-notice-get-forward.mjs: conservar export GET, añadir export Consent; compartir transporte dentro del archivo, selector privado constante de cada export.
+4. lib/mcp-qa-finite-owner-notice-get-qa.mjs: conservar receptor GET; añadir receptor Consent y compartir plumbing privado de lease/errores.
+5. NUEVO lib/mcp-qa-finite-owner-notice-consent-body.mjs: único lector de formulario de1024bytes con read/cancel reales retenidos. No cambiar native-wire global16384.
+6. NUEVO test/mcp-qa-finite-owner-notice-consent-native.test.mjs.
+7. test/fixtures/finite-owner-notice-get.mjs: extender gates/trace/inspect existentes para POST, sin segunda infraestructura ni fake resultado.
+8. test/fixtures/finite-owner-qa-sdk.mjs: routing SYN fijo de POST sólo dentro del opt-in noticeGet existente.
+9. test/mcp-qa-finite-owner-notice-get-native.test.mjs: actualizar formulario/POST ahora reconocido y cierre de replay; añadir pure grammar y nativo P3 cookies. Las negativas GET permanecen.
+10. test/fixtures/finite-owner-io-fanout.mjs: sólo categorías/markers de las llamadas nuevas si no las captura ya; no scheduler.
+
+No renombrar estos archivos en esta unidad: conserva imports GET y evita refactor masivo. El nombre get queda histórico, documentado con comentario breve. No nuevo mode de initial-entry ni DDL: reutilizar mode phase-context-sdk-token-notice-get. El world aceptado ya completa siete objetos monitoring en TODOS los modos phase-context y verifica conservación de cuatro DDL consent, tres eventos ajenos y dos grants (215–224, blobbfb918ebe15edc654de0e57d5aecf83757129b07). Conservar ese comportamiento; no reducirlo a noticeGet ni editar world. Ningún undécimo archivo implícito; diferencia nueva del BASE vuelve a root.
+
+Protegidos: store/journal/records/schema; authority y owner-http ordinarios; SDK/OAuth/native-wire/stage-work/lease; source stubs y entrypoints montados; package/config/workflows/mount/flags. Fixture no modifica bytes producto para lograr GREEN excepto cualificación SYN expresamente aprobada por root en su preflight futuro.
+
+## APIs fuente fijas
+
+Exports adicionales:
+- wire: finiteOwnerNoticeConsentTarget='https://afw-private.invalid/_finite-owner/monitoring/grant'.
+- wire: qualifyFiniteOwnerNoticeConsentRequest(request,bytes) -> frozen {method:'POST',url,handle}. handle es entrada no confiada, nunca autoridad.
+- wire: readFiniteOwnerNoticeConsentMetadata(headers) -> frozen {boundary,method:'POST',url,mVersionId,requestId}.
+- forward: forwardPrivateFiniteOwnerNoticeConsent({request,env,ctx},originalLease) -> Promise<Response>.
+- qa: createPrivateQaFiniteOwnerNoticeConsentReceiver({ctx,env}) -> frozen {fetch(request)->Promise<Response>}.
+- phase-context: handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease) -> Promise<Response>.
+- body: readFiniteOwnerNoticeConsentBody(message,check,firstFailure) -> Promise<Uint8Array>. Últimos dos argumentos son guards/señal de fallo del ciclo ya poseído, patrón native-wire; jamás callbacks de aprobación. No acepta límite, identity, source o policy.
+
+No otros exports ni fábricas públicas. Shared transport private sólo elige literales GET/Consent desde estos exports; el caller no pasa kind/target/cap/permission. GET no acepta POST por fallback. QA Consent acepta únicamente transporte POST y target exacto; metadata exige original POST y URL finiteNativeOrigin+'/monitoring/grant' sin query/hash/userinfo. QA GET conserva su target/gramática.
+
+M comprueba root lease genuina, namespace/actor/version/holders como GET/OAuth. Copia sólo finiteNativePreservedHeaders, sobrescribe las cinco x-afw-finite metadata; boundary canónico y UUID/version fijos, límite metadata16384 heredado del contrato GET. Jamás conserva metadata del navegador. Fetch real redirect manual, signal original; respuesta elegible200 HTML UTF8/no-store, allowlist GET/OAuth existente; errores finiteNativePending con mayRetry:false y statuses seguros. No JWT/handle/source/rows en errores/logs. M y QA no son nuevos endpoints desplegados.
+
+## Grammar, cuerpo y retención
+
+Original Request real POST /monitoring/grant, Origin exactamente finiteNativeOrigin. Content-Type exactamente application/x-www-form-urlencoded, como formulario ordinario; no parámetros MIME. Body UTF8 fatal de1..1024bytes, rechazar escapes % malformados; URLSearchParams debe tener una única entrada handle, getAll(handle).length===1, valor /^[A-Za-z0-9_-]{43}$/. Nada decision/action/grant/sequence/expiry/project ni duplicados/extras. Cookie/assertion<=8192 y sin CRLF. NO copiar la grammar permisiva actual de GETwire11 ni modificar OAuth ordinario: aplicar el validator cookie-list privado compartido GET+POST definido abajo. Cookie __Host-afw-monitoring-owner única y valor43 válido; SHA256(cookieValor)===SHA256(handle)===reservation.ticket.handleHash. Prepare cookie se verifica separadamente.
+
+Cookie-list privado (sin export/config/opciones de autoridad): distinguir header ausente null de presente vacío. Ausente sigue permitido por grammar GET; QA exige prepare posteriormente. Presente vacío/OWS-only, segmento vacío inicial/intermedio/final o nombre repetido exacto (case-sensitive) deniega. Lista con OWS sólo exterior y separador exacto "; " de RFC6265§4.2.1; no trim genérico de nombres/valores ni filtrar segmentos. Cada par se divide en el PRIMER "=": el valor puede contener más "=". Nombre no vacío sólo ASCII HTTP token/tchar (ALPHA/DIGIT y ! # $ % & ' * + - . ^ _ backtick | ~), según [RFC9110§5.6.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2). Valor vacío o secuencia de cookie-octet, opcionalmente entre DOS comillas dobles; dominio ASCII hex21,23–2B,2D–3A,3C–5B,5D–7E. Ni comillas interiores/solitarias, escape backslash, coma, semicolon, espacios/controles ni Unicode. Sin unquote/URLdecode/normalización al preservar headers. [RFC6265§4.1.1](https://www.rfc-editor.org/rfc/rfc6265.html#section-4.1.1), [§4.2.1](https://www.rfc-editor.org/rfc/rfc6265.html#section-4.2.1). Nombres desconocidos bien formados y valores legítimos como base64 con "=" o valor quoted se conservan. Las dos cookies propias siguen su formato emitido original sin comillas y hashes existentes: parser genérico válido no las autoriza.
+
+Lector específico se usa en M antes de fetch y en QA antes de baseline. Comprueba suma real de chunks, no Content-Length; abort/holder/overflow/UTF8 erróneo no llegan a store. Registro de Promise REAL del lector antes de race mediante retainFiniteOwnerStagePromise; finiteNativeOperation conserva la cadena real en waitUntil. Al fallar, firstFailure se señala pronto y se espera cancel real dentro de la misma cadena retenida. No void cancel, .text() ilimitado, tee/clone con rama sin consumir ni segunda lectura del body. Respuesta utiliza finiteNativeBytes existente16384. Cada operación captura failed=false; señal de fallo establece failed=true ANTES de rechazar; guards posteriores comprueban failed además de lease/holders. No continuar SQL/ACK tras fallo capturado aunque una Promise tardía resuelva.
+
+Contexto outstanding de stage-work bloquea un ingreso ajeno en mismo ctx hasta settlement real y abort de raíz. No atribuir exclusión al Set privado del journal ni usar lease ya abortada para demostrarla. Scope es local, no mutex distribuido ni physical drain.
+
+## Baseline privado y origen de confianza
+
+Dentro del patrón GET observeFiniteOwnerRequestWork + finiteNativeOperation, captura holders request/headers/ctx/env/DB/source bindings/version/fetch/SDK alias originales antes de await. Crear clock sólo desde readFiniteOwnerRequestDeadline, nunca desde ahora+budget. Reconstruir original Request desde metadata y bytes ya acotados.
+
+observeOwnerPhasePair sigue PRIVATE y devuelve dos snapshots completos iguales. Nuevo qualifyNoticeConsentBaseline(pair) PRIVATE usado sólo por handler POST:
+- original installed connection receipt válido, source proyectada read_consent exactamente como lines401–403 de GET aceptado, sin consultar qualifySettledOwnerPair público que exige notice vacío;
+- issuer original sin SEND desconocidos, SDK root/begin/approve/complete asentados/sin pending, GrantLink/relation/ConnectionRef actuales completos;
+- schema7 exacto en ambos snapshots, notice reservation original + ticket SEND + ACK applied, fila TicketRow14 completa exacta y hash coincidente; consent.send/ack=null, freeze=null y events=[];
+- Mversion===source.currentPublication.versionId; QA actor/version/publicación/pin originales/current del observer, owner/revision actuales, UUID de issuer reservation. No latestgrant ni COUNT global.
+No exporta pair/expected/continuación. expected=structuredClone(baseline.second) queda léxico. Puede obtener contexto privado {source,preconnectionId,capsuleHash} de esa proyección validada sin devolverlo a HTTP.
+
+Access de POST: verifyCloudflareAccessJwtWithExpiry con token del header original y source.access.teamDomain/audience del factual baseline; RS256/iss/aud/subject/exp del MISMO payload firmado (lib/cloudflare-access-identity.mjs:54–79,103–114), sin verifier/keySet/now inyectables. Realm=evidence('realm',{...source.access,origin:source.origin}); subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject}). Prepare cookie única __Host-afw-finite-prepare=[a-f0-9]{64}, SHA256(valor)===prep.ticket.ticketHash. qualifyFiniteOwnerApprovedTicket con currentTicket/ticket/use/pre/approval/sourceSnapshot originales, realm, subjectHash y Date.now real; identity.subject===ownerSelection.subject===issuer identity.subject===ConnectionRef.subject. La aprobación original de conexión se comprueba, pero la decisión de avisos es el POST actual de acción fija + CSRF actual.
+
+Reverificar el mismo JWT capturado tras observeTicket/recheck, antes de consent SEND; exigir mismo subject/expiry firmados, cookies/headers/holders intactos. Source current viene del recheck completo, nunca de opciones. Antes SQL repetir guard actual de expiración/holders y full recheck ya después SEND; no endpoint ni fetch nuevo de permiso. Ni JWKS cache ni expiración comprueban revocación externa instantánea de Access: el contrato real disponible es firma/exp y fuente actual, no una capacidad inventada.
+
+accessPOST=min(r.accessExpiresAt,pre.owner.accessExpiresAt,verified.expiresAt,C0). Si r.ticket.expiresAt>accessPOST negar ANTES SEND y sin observar/mutar bajo Common incompatible. No recortar ticket ni expiry histórico. Narrow padre por todos los techos originales: C0/pre/approval/ConnectionRef/consent/grant/Access/ticket.permissionExpiresAt. Ningún menor plazo crea permiso nuevo.
+
+## Common, journal y secuencia léxica
+
+r=reservation original validada. Common EXACTO {identity:r.identity,expectedGrant:r.expectedGrant,consumedAt:r.consumedAt,accessExpiresAt:accessPOST,preconnectionExpiresAt:r.preconnectionExpiresAt,window}. ticket=r.ticket intacto. Instancia store=createFinitePreparationIssuerStore({ctx,env}) y notice journal únicos del POST. La observación y INSERT comparten ESTA instancia/lease hija/Common/window idénticos; no necesariamente la instancia histórica GET.
+
+Una única child <=5000ms cubre observe→SEND→INSERT→ACK y rechecks; window.startedAt real al entrar, deadline=min(deadline hija original, todos los techos). No cerrar/recrear child entre observe e INSERT. Baseline/body/Access inicial consumen padre original<=30000ms, no presupuesto nuevo.
+
+Estados privados: baseline, ticket-observed, consent-send-recorded, consent-sql-pending, consent-sql-resolved, consent-ack-recorded; failed absorbente. Referencias separadas witness, ownSend, actualSqlPromise, actualSqlResult, sqlSettled; appendPromise nunca reemplaza SQL. No objeto estado transportable.
+
+1. Baseline y auth/CSRF válidos; recheck completo esperado.
+2. Entrar child; await store.observeMonitoringTicket({...Common,ticket:r.ticket},childLease). Guardar witness REAL status observed y comparar fila14 con expected.noticeRows.tickets[0]; null/error termina. Objeto clone/WeakMap de otra instancia no sirve; este witness acredita observación nativa, no humano.
+3. recheckConsentOwned() sin argumentos; segundo verify firmado y guards. Crear Send con purpose afw.finite-preparation-notice-send.v1, identityHash/reservationHash originales, operation='consent', accessExpiresAt=accessPOST, window, issuedAt=Date.now. decisionHash=initialHash('afw.finite-preparation-notice-decision.v1',{identityHash:r.identity.identityHash,ticketRequestId:r.ticket.requestId,handleHash:r.ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt}). requestHash=initialHash('afw.finite-preparation-notice-request.v1',{operation:'consent',common:Common,ticket:r.ticket,decisionHash}). Sellar con codec existente.
+4. Retener appendSend({preconnectionId,record},childLease). Sólo status recorded/hash exacto continúa; existing/uncertain/error termina SIN INSERT. Actualizar únicamente expected.records.notice.operations.consent.send y expected.anchor.notice; guardar ownSend referencia creada aquí. recheck completo exige events=[].
+5. Guard actual inmediatamente antes de store.insertMonitoringConsent({...Common,ticketWitness:witness},MISMA childLease). Capturar su Promise REAL antes de race; sqlSettled=false. Nunca observar para adivinar resultado mientras pendiente. Native SQL revalida dueño/revisión/grant vivo/fence/consent consumed/window/Access/ticket/history0 en statement real.
+6. Tras resolver real, guardar resultado y sqlSettled=true; exigir applied y EventRow12 exacta según abajo. no_mutation/error no produce ACK ni éxito, no reintento. Actualizar sólo expected.noticeRows.events=[fila detached real]; recheck completo.
+7. ACK purpose afw.finite-preparation-notice-ack.v1, sendHash=ownSend.recordHash, outcome='applied', rowHash=initialHash('afw.finite-preparation-notice-row.v1',actualSqlResult.row), sequence=actualSqlResult.row.sequence, observedAt=Date.now<Send.window.deadline. appendAck({preconnectionId,operation:'consent',record},MISMA child); exigir recorded/hash; actualizar únicamente expected notice.ack/anchor; recheck completo. SQL Promise/result conservados hasta este punto y antes de responder200.
+8. Cerrar child y guard original/identity/failure inmediatamente antes de HTML. Fallo final puede dejar evento+ACK durables sin respuesta positiva: no compensación, no retry ni reconstrucción desde storage.
+
+recheckConsentOwned exige guards, issuer/SDK asentados, freeze ausente; si actualSqlPromise&&!sqlSettled deniega. Sólo posición y referencia ownSend creada/recorded aquí admiten su SEND pendiente; estado resolved/ack exige actualSqlPromise REAL resuelta y actualSqlResult. wait(observeOwnerPhasePair(...parent original...)) bajo activeChild, guards antes/después; canonical(first)===canonical(second)===canonical(expected ENTERO). No enmascarar timestamps ni partes. Grant.exchanged_at actual permanece completo, proyección histórica sólo en ACK issuer original. Native store guard failure absorbente y failed del handler no se resetean.
+
+## EventRow y ampliación factual mínima
+
+El observer sigue sin parámetros de tolerancia. Reusar consultas GET, cap schema8/DO list7/ticket2/event3, success===true y results Array antes de interpretar vacío, first-primary nueva con factual SELECT como primera sentencia. Schema parcial/malformado/error deniega. Schema totalmente ausente admite únicamente reader viejo vacío; POST exige schema listo antes de SEND. Scope prefijo propio/preconnection y grant UUID original; filas ajenas nunca se enumeran ni invalidan flujo.
+
+EventRow exacta, sin campos extra:
+{sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at}.
+sequence entero seguro>0 del RETURNING AUTOINCREMENT global, NO expectedSequence+1; grant_id/project_id/user_id/client_id/resource/revision igual identity original; action='grant'; purpose='afw.dossier-monitoring.v1'; request_id=ticket.requestId; expires_at=ticket.permissionExpiresAt absoluto original; issued_at entero nativo n.ms>=max(consentSend.window.startedAt,ticket.issuedAt), >=Send.issuedAt y <min(Send.window.deadline,ticket.permissionExpiresAt). Todas las columnas SQL/tipos, bytes snapshot y hash completos. Event expiry no depende de response time ni se renueva. Ticket expected_sequence permanece0; grants ajenos pueden elevar sequence global sin invalidar original.
+
+Retener correlaciones reservation/ticket GET existentes. Reemplazar sólo el rechazo incondicional de eventos/consent en noticePrimary por:
+- Sin consent SEND: events=[] y consent ACK ausente.
+- Consent SEND válido, ticket ACK applied y fila14 exacta: events=[] o una EventRow exacta como arriba si ACK ausente. Hecho privado incompleto, ninguna entrada pública lo admite.
+- ACK applied: EXACTAMENTE un evento, rowHash completo y sequence iguales a ACK; ACK observado>=Send.issuedAt, <Send.deadline; Event.issued_at<=ACK.observedAt.
+- ACK no_mutation: events=[] y hashes/sequence null; hecho de cierre, jamás baseline/retry. Productor POST de este slice no emite esta variante.
+- >1 evento original, revoke, evento sin SEND, otra request_id, discrepancia de cualquier campo/hash, unknown key, overflow o freeze deniega. No tomar sólo última fila. Retirada real deja evidencia intacta y deniega.
+Consent sólo se correlaciona si ticket ACK original cumple todas relaciones previas. Lectura de historia no concede nueva ventana: tiempo actual debe seguir dentro de techos actuales; ACK no extiende SEND ni store window.
+
+qualifySettledOwnerPair público y OAuth conservan rechazo a TODO notice/ticket/event del UUID/prefijo original. GET conserva baseline vacío y rechazo a consent; su continuación sólo tolera sus propias tres filas ticket, nunca evento/consent. Nunca se infiere etapa nueva desde cinco/seis filas.
+
+## HTML y errores
+
+GET SOURCE pasa a form method=post action=/monitoring/grant, hidden handle escapado, botón habilitado “Permitir avisos temporales”, CSP form-action 'self'. Texto: “Podés registrar un permiso temporal para avisos sobre este expediente. No cambia datos ni publica. El permiso vence en la fecha indicada. Registrar el permiso no confirma una suscripción, entrega ni revisión del asistente.” Mostrar expiry original y enlace fijo al expediente. Sin autosubmit/JS ni checkbox preaprobador. Cookie GET conserva atributos Secure/HttpOnly/SameSite=Strict/Path=/ y expiry original; no emitir un ticket nuevo por POST.
+POST200: “Registré tu decisión temporal. Esto no confirma que exista una suscripción ni que el asistente haya revisado el expediente.” Fecha original y enlace fijo al expediente. No enlace de retirada/revisión no implementado, no datos internos. No-store/nosniff/Referrer-Policy/CSP/frame-ancestors/base-uri como GET; form-action none en éxito sin formulario. Puede eliminar cookie monitoring con mismos atributos/Max-Age=0 tras éxito; no borrar prepare cookie/historia.
+Errores conservan respuesta pending saneada, sin recibo positivo ni instrucción automática de retry.
+
+## Costo y aceptación
+
+La ampliación factual de consent NO agrega consultas por snapshot sobre GET: mismos DO list y schema/ticket/event SELECT completos, sólo valida filas ya leídas. POST agrega recorrido completo propio: baseline y rechecks de pasos1,3,4,6,7 (6 pares previstos, incluyendo baseline; contabilizar implementación real), dos verificaciones Access, observe y INSERT nativos con sus preflights reales, dos appends journal con transaction/sync/readback. Por par con schema+identity, notice añade2DO list+6D1 respecto al reader preGET; no atribuirlos dos veces ni declarar totales98/112. Observar cantidades/sesiones/latencias/peak/graph reales en GREEN sin ampliar fanout2, 5s ni30s ni omitir snapshots/owner/SDK. Si no cabe, deniega y root decide; no quitar rechecks para hacer pasar test.
+
+## Negativos que aíslan correlación de fuentes
+
+La review GET advierte que corrupciones asentadas anteriores pueden fallar primero por codec/hash/linkage del journal. No atribuirles aislamiento de cada predicado. Casos POST deben partir de GET nativo exitoso (y POST exitoso sólo para caso evento), alterar únicamente DATA de prueba negativa y volver a sellar TODOS los enlaces afectados con sealFinitePreparationNoticeRecord y, para identity.sourceRevision, sealFinitePreparationIssuerRecord('Identity',...). No cambiar source real ni fabricar prefills positivos.
+
+Variantes mínimas independientes:
+- identity.sourceRevision distinta40hex + identityHash recalculado; conservar actor/QA/preconnection; notice Reservation resealed, ticket Send identityHash/reservationHash/requestHash actualizados y ACK.sendHash resealed. Issuer/source auténticos intactos -> comparación de identidad notice/issuer falla.
+- issuerReservationHash, originalGrantAckHash, grantLinkHash o connectionHash distinto64hex, UNA celda por variante; reseal Reservation→Send.reservationHash→ACK.sendHash. Los hechos originales issuer/GrantLink/ConnectionRef no cambian -> correlación296 falla.
+- ticket.requestId UUID diferente en Reservation; reseal Reservation, Send.requestHash sobre ticket alterado y ACK.sendHash. Ticket SQL real y ACK.rowHash original permanecen intactos -> expectedNoticeTicket/fila14 falla en301, no journal.
+- tras POST realmente exitoso, ACK consent.sequence entero positivo distinto del real; reseal ACK, manteniendo rowHash real y demás relaciones -> correlación evento/ACK falla; cero NUEVOS consent SEND/INSERT. Puede agregarse rowHash incorrecto64hex resealed como variante separada, sin afirmar que invalida codec.
+
+Precondición de cada negativa: codecs/encode/decode válidos y read real del journal con lease vigente devuelve inventario válido sin error; no basta sello local. Trace SYN pasivo en fixture marca entrada al bloque correlador pertinente y ausencia de salida normal, sin devolver pair/valores sensibles ni cambiar retorno/guards. Verificar que antes de ese bloque no hubo fallo y que sólo cambió la relación objetivo; de otro modo reportar rechazo no aislado y corregir fixture, nunca proclamar predicado probado. Para evento, observer debe llegar a validación event antes del rechazo público/baseline por history; no usar sólo “POST rechazó” como prueba. Luego petición POST real debe fallar ANTES de nuevo consent SEND/SQL, comparando deltas nativos; fuente/issuer/ticket/eventos reales e historia ajena byteexact. Este acceso SYN de corrupción no existe en producto, no aprobación ni replay permisivo.
+
+Pruebas nativas y regresiones literales en plan. GREEN debe usar JWT SYN realmente firmado, JWKS de fixture por red existente, GET nativo real previo, D1/DO/workerd reales; no prefill positivo ni verifier fake. Mutaciones negativas se rotulan SYN. Medición del mismo run aceptado; no repetir50ms/allSDK/build estándar sólo para cifras. Comparar bundle QA/M y entradas/metafiles reales del harness; nuevo reachability fuera de estos graphs requiere root.
+
+## Riesgos y handoff
+
+Carrera entre última lectura source y SQL no es transacción global. Store protege predicados SQL actuales; un cambio externo justo después del último read puede dejar evento durable y respuesta denegada al recheck. Conservar historia, no prometer impedir todo cambio de publicación simultáneo. Unknown ACK/SEND/error/cancel no autoriza replay; actor restart no recrea witness/continuación. Revocar grant de verdad hace fallar resolver ordinario con “Monitoring authorization unavailable”, no enabled:false; CLOSE sólo no revoca grant. No editar authority para acomodar assertion.
+GET aceptado quedó reconciliado a f68797ca (mismo producto cfe8f0dd). Root debe confirmar cualquier delta del futuro BASE, filemap/qualifier y permiso cloud específico, leer spec+plan completos y activar. El próximo qualifier podrá usar dos jobs credential-free paralelos (POST nativo y GET/regresiones), cada uno<=15min; es configuración futura de preflight, no permiso de ejecutar ahora. Rollback docs sólo commits propios con CAS; rollback producto sólo commits futuros propios sin borrar D1/DO/history. SOURCE acceptance no activa permisos humanos, fases o runtime.
+
+
+# POST nativo de consentimiento — Implementation Plan
+
+> **For agentic workers:** Workflow futuro superpowers:subagent-driven-development, un único writer y revisión root de spec/quality. **INACTIVE**: no ejecutar, implementar, crear agentes o lanzar tests desde este documento. GET aceptado y reconciliado a f68797ca0ad083aa4e90be87c83b5f60f2aa691b (código cfe8f0dd idéntico). Activación sólo tras preflight root con BASE futuro. El writer no crea helpers/reviewers; root coordina la revisión.
+
+**Goal:** Registrar un consentimiento humano POST real, con ticket original nativo y correlación factual privada completa antes de responder.
+**Architecture:** Ampliar los módulos GET aceptados con entradas Consent fijas y transporte privado compartido; misma instancia store/lease/Common/window desde observe hasta INSERT. El resultado SQL real permanece léxico hasta ACK/rechecks.
+**Tech Stack:** ESM, Node y harness existente Miniflare/workerd/D1/DO/JWT RS256 SYN, sólo entorno cloud específicamente autorizado.
+**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-consent.md
+
+## Restricciones globales
+
+- Pin histórico dc4edafc0b5e4ba440cd32a21dd3dd58024e811a; reconciliación GET f68797ca0ad083aa4e90be87c83b5f60f2aa691b/tree8f07c7e2bc98ab08f8a943f3c98bb9045b0af2b1. Root SOURCE Approved with Minor/P3,0C/I; P3 cookies sigue pendiente y pertenece a esta unidad, no fix-loop GET.
+- C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; source ceiling2026-11-03T02:59Z vencido. Sin nuevos relojes/rearm/renew.
+- Scope original preconnection/prefijo y grant UUID; historia ajena intacta. Schema cap8/DO list7/ticket2/event3, todas columnas y ambos snapshots.
+- Protected store/journal/records/DDL/authority/ordinary writer/SDK/source stubs/flags/mounts; filemap10 cerrado en spec.
+- No authority DTO, allowPending, callback aprobador, raw pair, source factory, retry/reconstrucción ACK/physical drain.
+- Todo SOURCE/SYN/unmounted; operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Review focus
+
+1. Body malformado/overflow y cancel retenido no deben seguir a baseline/store aunque falle pronto HTTP.
+2. Menor AccessPOST no puede renovar ni retrorecortar ticket, Common o ventana.
+3. Witness copiado o de otra instancia nunca sirve; witness válido no sustituye firma/CSRF.
+4. Own SEND sólo se tolera en continuación léxica con actual SQL Promise/result; ACK DATA o replay no la recrean.
+5. Corrupción del segundo snapshot, retiro real o fallo absorbente conserva historia y evita ACK/éxito.
+
+Cada punto se cubre con pruebas concretas en pasos4–5. Riesgos no cubiertos no se resuelven por tests globales arbitrarios.
+
+## Task 1: unidad coherente POST + correlación + formulario SOURCE
+
+Única unidad de aceptación: no publicar formulario activo ni aceptar endpoint por separado. Se permiten checkpoints propios no activados; no siguiente producto.
+
+**Files:** los diez de spec, sin archivos adicionales. Nuevos: lib/mcp-qa-finite-owner-notice-consent-body.mjs y test/mcp-qa-finite-owner-notice-consent-native.test.mjs. Modificar los cuatro módulos GET/phase, dos fixtures GET/SDK, fixture IO sólo si necesita labels y test GET existente. No nuevos frameworks ni mode de initial-entry. World aceptado ya completa7DDL en todos phase-context preservando4DDL consent/3eventos ajenos/2grants; no tocarlo ni repetir DDL por opt-in.
+
+**Interfaces consumidas:** observeOwnerPhasePair PRIVATE, createFinitePreparationIssuerStore({ctx,env}).observeMonitoringTicket({...Common,ticket},lease), .insertMonitoringConsent({...Common,ticketWitness},MISMA lease), createFinitePreparationNoticeJournal({ctx,env}).appendSend/appendAck/read, verifyCloudflareAccessJwtWithExpiry, qualifyFiniteOwnerApprovedTicket, original stage-work/lease/retention.
+**Interfaces producidas:** los siete exports exactos de spec; ningún par ni capacidad. Receiver/forward/handler reciben sólo Request/env/ctx/originalLease. Private qualifyNoticeConsentBaseline(pair) y recheckConsentOwned() no exportados.
+
+- [ ] **1. Reconciliar prerrequisito y congelar ejecución.** GET aceptado ya fijado en f68797ca, producto leído cfe8f0dd; confirmar que futuro BASE conserva estos blobs y diez paths/APIs/shared fixture. Evidencia reconciliada en informe. Root fija BASE antes de ejecución. No copiar rama docs encima de producto. Root define cloud qualifier temporal, comandos permitidos y rollback CAS de propios commits; puede separar dos jobs credential-free paralelos (POST nativo y GET/regresiones), timeout<=15min cada uno, sólo al activar; autorización GET anterior no se hereda para POST. Conservar expired SOURCE y restauración del qualifier SYN. Si falta método o fixture, volver con diferencia concreta antes de ampliar mapa.
+
+- [ ] **2. Escribir RED causal del recorrido principal.** Reusar OAuth QA GET/POST real que genera grant; en principal hacer además code→M token→MCP real para conservar exchanged_at actual; GET de monitoring nativo real genera formulario/ticket ACK. Construir POST de handle obtenido de HTML y cookies reales, Origin correcto y JWT SYN firmado con JWKS real de fixture, nunca token decodificado/verifier fake. Baseline GET aún niega POST: el RED esperado es respuesta404/405/503 frente200 y events0 frente1; demostrar endpoint alcanzado, no import missing ni fixtureError. En baseline puede construirse POST desde hidden handle del formulario disabled sin simular decisión persistida. Añadir assertion de literal exports después de causalRED; no anunciar missing export como prueba de seguridad.
+
+- [ ] **2b. RED puro y nativo de P3 cookies.** En test GET existente y test POST nuevo, invocar qualifiers públicos fijos, nunca exportar parser. Casos puros 'notice cookie-list accepts token names and legitimate values': Cookie ausente GET grammar permitido, nombres tchar con puntuación válida, valor vacío, base64 con '=' repetidos, quoted válido/quoted vacío y varias cookies con '; '. Casos 'notice cookie-list rejects malformed list': header presente vacío/OWS-only, leading/trailing/double semicolon, nombre con colon/slash/@/paréntesis/corchetes/coma/espacio/control/noASCII, repetido exacto, valor con coma/backslash/espacio/control/noASCII o comillas interiores/solitarias, separador fuera de '; ', límite8193/CRLF. Mantener fuente hard-coded y quoted propios no convertidos a token por normalizar.
+  Native 'notice GET malformed unrelated cookie denies before reservation': grant y prepare cookie reales válidos + pareja ajena 'bad:name=x' o segmento vacío -> no nueva notice Reservation/Send/Ack, ticket SQL0; no confundir journal issuer previo con0notice. Native 'native consent malformed unrelated cookie denies before SEND': ticketGET válido + cookies prepare/monitoring válidas + misma anomalía -> consent SEND delta0/event SQL delta0, ticket/journalGET byteexact. Probar además pareja ajena quoted válida en flujo nativo exitoso para evitar rechazar todo cookie no propio. RED en GET actual: validator11 acepta nombre inválido/filtra segmentos; no atribuir fallo posterior de identidad a corrección grammar.
+
+- [ ] **3. Implementar mínimo íntegro de fuente.** Compartir transporte dentro de módulos GET conservando signatures antiguas. Añadir validator cookie-list privado compartido GET+POST exacto de spec (resuelve P3 sin tocar OAuth), y body1024 real retenido con failure latch, grammar/metadata fixed POST y guards de actor/versions. Handler: baseline privado ticketACK3rows/event0, Access/prepare/approval/CSRF actuales, mismo Common/window/store/witness. Secuencia exacta observe→recheck→verify→Send recorded→recheck→SQL Promise/result real→recheck→Ack recorded→recheck. Ampliar correlación factual sólo eventos exactos ya leídos; público3keys/OAuth/GET no admiten history. Actualizar sólo celdas notice/event esperadas; grant.exchanged_at y todas las demás quedan reales. HTML activo sólo cuando toda unidad pasa. No tocar store/journal para facilitar tiempo/resultados.
+
+- [ ] **4. GREEN nativo principal y corpus de entrada.** Crear los siguientes tests en archivo nuevo; nombres literales forman contrato de revisión (parámetros producen sufijos claros):
+  - 'native consent POST records original decision after actual ticket GET': one original UUID, ticket14 exacto, ConsentRow12 completa, journal5filas sin freeze, SEND antes SQL, ACK rowHash/sequence nativos, issuer historical ACK intacto, exchanged_at actual conservado; source reader3keys/OAuth/GET niegan history; HTML/cookie/header/source flags correctos; historial ajeno byteexact.
+  - 'native consent preserves global sequence across another grant history': insertar historia AJENA SYN identificada antes del recorrido original; native original sequence>1, no max global ni expectedSequence+1.
+  - 'native consent grammar denies ': method GET/path revoke/query, wrong Origin, missing Origin, extra/duplicate handle, malformed percent/UTF8, MIME parameter, 1025bytes, duplicate cookie, bad cookie hash, missing prepare, prepare mismatch. Assert no consent SEND/SQL; repetir solicitudes sin decisión no consume intento.
+  - 'native consent verified identity denies ': invalid signature, wrong realm/audience, other subject, expired Access, AccessPOST shorter than original ticket. JWT malos firmados SYN cuando corresponda; ningún verifier replacement. Assert no consent SEND/SQL, ticket original íntegro.
+  Negativos ordinarios usan grant realmente emitido por SDK y ticket GET real, sin repetir token/MCP completo en cada caso. No prefill positivo de notice/consent.
+
+- [ ] **5. GREEN causal de concurrencia, fallos y factual.** Gates SYN sobre operaciones nativas reales, no Promises inventadas como éxito:
+  - 'native consent own SQL continuation alone accepts pending SEND': hold INSERT antes resolución; comprobar SEND presente/events0/ACK0, lector público y otro POST niegan; liberar operación real, sólo propia continuación puede completar; no pasar expected/allowPending al handler.
+  - 'native consent lost native result never reconstructs ACK': ejecutar INSERT real y perder/rechazar respuesta; evento queda, SEND sinACK,503; restart/replay no escribe ni completa ACK.
+  - 'native consent journal uncertainty never authorizes next effect': perder retorno de appendSend tras commit/sync/readback -> INSERT0; perder ACK tras commit -> sin200 ni replay, eventos/filas conservados.
+  - 'native consent original window fences queued SQL': hold antes ejecución hasta pasar deadline real5s; liberar, native no mutation/ACK0; gate alcanzado antes de expirar. No clock patch ni nueva child.
+  - 'native consent source current drift denies ': before-SEND y after-SEND/before-SQL cambiar owner/revision, current QA pointer/M version o holder; comprobar consumo correcto (noSEND antes; SEND conservado después) y SQL0 cuando se detecta antes llamada.
+  - 'native consent second snapshot drift denies ': alterar exchanged_at válido o aviso/evento original entre snapshots; conservar snapshots completos; no enmascarar drift. Si se altera fila inmutable, fixture lo rotula SYN corrupción destructiva, nunca operación legítima.
+  - 'native consent history closes replay ': actual successful POST, own unmatched SEND, foreign request ticket same UUID, event without SEND, mismatched rowHash/sequence, unknown journal key, overflow, missing schema, partial schema, success:false schema, malformed results. Positivos proceden de producer; manipulaciones posteriores negativas SYN. Esquema ausente/no listo niega antes SEND; prueba read-only vacío sigue válida en regresión.
+  - 'native consent withdrawal preserves history ': CLOSE real antes release no revoca por sí solo; revokeGrant real sí impide SQL. Tras evento grant real, retirada real append-only por mecanismo ordinario permitido exclusivamente en fixture deja grant/revoke históricos y bloquea toda continuación. No nuevo endpoint revoke producto. Resolver ordinario tras revokeGrant rechaza generic Monitoring authorization unavailable; no assertion enabled:false.
+  - 'native consent failed body retains actual cancellation': body reader/overflow/cancel held en M y QA; failure latch responde sin éxito y mantiene scope real retenido. Otro ingreso del mismo ctx usando lease SYN válida dentro deadlineoriginal deniega mientras pendiente; tras settle+root abort disponibilidad vuelve según stage-work. Lease yaabortada no prueba exclusión.
+  - 'native consent abort retains SQL and forbids late ACK': abort request/root mientras SQL pendiente, late real resolution no ACK/200; historial conserva efecto que haya ganado. Medir pending real, no declarar drain.
+  - 'native consent captured failure cannot resume commit': primer error capturado/holder mutation durante await luego resolución buena no permite SEND/INSERT/ACK siguiente.
+  Para fallos store concurrentes no modificar sus métodos: conservar protección aceptada y probar handler sin bypass. No test imposible de autenticar humano/SQL sólo validando ACK DATA.
+
+- [ ] **5b. Negativas de correlación aisladas, no sólo hash inválido.** Nombre 'native consent correlated DATA denies ' con sufijos source-revision, issuer-reservation, original-grant-ack, grant-link, connection, ticket-request y event-sequence. Seguir receta exacta spec: partir de producer nativo real, reseal Identity cuando corresponda, Reservation/Send.requestHash/reservationHash/identityHash/ACK.sendHash coherentes. Preservar tiempo/actor/QA/preconnection; no renovar. Fuente/issuer/GrantLink/ConnectionRef/ticket/event reales quedan intactos. Para event-sequence primero POST real exitoso, después ACK.sequence resealed distinto del event.sequence.
+  Exigir accepted codec roundtrip Y journal.read REAL exitoso en lease vigente antes de invocar POST negativo; devolver únicamente booleanos saneados de fixture, no pair/aprobación. Trace pasivo demuestra entrada al bloque correlador exacto (noticePrimary296 o301 y nuevo bloque event) y rechazo allí antes de salida normal; verificar ausencia de fallo previo. Deltas nuevo consentSEND/SQL0, originales preservados. Si test falla por hashlinkage anterior, no cuenta como aislamiento y se corrige fixture. Old noticeCorrupt91–98 sólo reseal Reservation o deja identity inválida: sus resultados previos no prueban cada correlación. No reemplazar outputs ni añadir puerta debug en producto; markers en instrumentFiniteNoticeGet deben ser únicos y no alterar control.
+
+- [ ] **6. Medir el mismo GREEN y comprobar resultado.** Trace saneado por fase baseline/observe/SEND/SQL/ACK: body/fetch/read/cancel real y settlement, journal ops/list7, D1 sesiones fresh-primary/select/all/preflight/INSERT; ambos snapshots completos por cada recheck, request lifetimes/peak<=2 original, elapsed child<=5000/parent<=30000. Contar seis pares previstos si implementación coincide; documentar toda diferencia necesaria antes de aceptar. Consent añade validación sobre consulta event GET ya existente, no otra consulta por declaración. Dos Access verifications reales; JWKS caching no es permiso nuevo. Sin repetir50ms/allSDK para contar. Si deadline falla, investigar causa causal manteniendo plazos y lectura completa; no ampliar clock ni borrar checks.
+
+- [ ] **7. Regresiones proporcionales cloud.** Root puede lanzar en paralelo POST nativo y GET/regresiones en dos jobs credential-free<=15min, con el mismo HEAD/qualifier y artefactos separados; no competir por un fixture compartido ni ampliar trabajo por paralelismo. No es autorización de ejecución en este diseño.
+  1. node --test test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+  2. node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
+  3. node --test test/mcp-qa-finite-owner-phase-context.test.mjs
+  4. node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
+  5. node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+  6. node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+  Estos prefijos se leyeron literalmente en dc4: phase16 seleccionados (1+1+4+1+1+6+1+1), SDK6 (1+1+2+1+1), D04 cuatro. Verificar nombres y no0match en GET aceptado antes de correr; registrar seleccionados/passed/failed/skipped reales y no atribuir skip0 a toda suite filtrada. Source vacío/three-keys, unknown issuer, snapshot2, shared fixture y exchanged_at justifican selección. No repetir todas SDK/50ms ni suites store/journal intactas por reflejo; extender sólo ante cambios reales/fallo o ruling root.
+  ESLint sólo archivos cambiados y tooling existente. QA/M se compilan en harness; guardar metafile/inputs/hash/bytes reales y diff con GET aceptado. Standard build sólo si root confirma nuevo reachability a entrypoint estándar; no usar build para métricas.
+
+- [ ] **8. Checkpoint y revisión root.** Reportar BASE/codeHEAD/reportHEAD/tree, diff10paths/blobs y protected blobs exactos; RED/GREEN run/job/attempt/comandos/counts y estados terminales sin recomputar para hashes. Costo real/graph/5s30s/fanout, weak witness/nohuman, native vs SYN, rowhash/sequence/expiry, public closures y ausencia mount. Retirar qualifier temporal según permiso root y readback CAS. Root revisión completa spec+quality SDD antes de aceptar; no agentes del writer ni siguiente unidad.
+
+## Entrega y rollback
+
+Status DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED; root recibe SHAs y pendientes concretos. No aceptación parcial de formulario activo ni exposición real. Rollback producto limitado a propios commits con expected HEAD, sin borrar notice/ticket/consent/eventos/grants ajenos; nunca “compensar” permiso eliminando historia. Runtime sigue cerrado incluso si todas pruebas pasan. Next gaps: retirada humana completa, NoticeLink/etapas restantes, tercer CLOSED, own setup/cleanup/guard/hosting/PCoff requieren unidades/autoridad separadas.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-native-notice-link.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-native-notice-link.md b/docs/superpowers/briefs/2026-11-05-finite-native-notice-link.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-native-notice-link.md
@@ -0,0 +1,243 @@
+# Task brief — NoticeLink desde consentimiento nativo
+
+READ FIRST. Única tarea SOURCE, un writer fresco, sin helpers/subagentes/reviewer propios. Repositorio tokenizartinfo-ops/agent-friendly-web; rama feat/finite-native-cleanup-20261101, entorno GitHub/Actions SYN sin credenciales. Reporte docs/superpowers/reports/2026-11-05-finite-native-notice-link.md. Preflight Root docs/superpowers/reviews/2026-11-05-finite-native-notice-link-preflight.es.md vinculante ANTES de headings INACTIVE históricos. No ejecución hasta despacho con BASE posterior exacto que contenga estos documentos.
+
+# Root preflight — NoticeLink nativo desde el POST
+
+5 de noviembre de 2026. PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (público1347578006); ENVIRONMENT=GitHub SOURCE/Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE=rama aislada; RESOURCE_ID=feat/finite-native-cleanup-20261101. ALLOWED_ACTION=una unidad Link-only, cuatro paths de código/test, informe y qualifier temporal específico. Rollback sólo commits propios por expected-head CAS, sin borrar D1/DO/historia. Este documento queda INACTIVE hasta despacho Root con BASE posterior que lo contenga.
+
+## Prerrequisitos verificados
+
+POST aceptado SOURCE en f62b6c8b17412b812ae411bbc9cedad43b9ce501/tree50fec019ac7a341fd9dacf004f7dd7f95581cd71; producto idéntico a5205/e153. Revisión fresca Spec✅/QualityApproved,0Critical/Important; P3 cookies CLOSED, dos Minor registrados. Root leyó informe38322chars, todas las primarias relevantes, matriz50POST/37GET y comparación de los nueve blobs calificados. f62 añade sólo tres docs de aceptación; lectura exacta confirmada. No repetir esa unidad por resumir.
+
+Diseño Link30981d2a2f15bd49d1d0226358486e2ec0262b07/treecb291eb891cb867dd5de8d117f6be78e8164771b: informe bda8dbe79d6eb3985aadc3b86f900a13152c3dec (9931chars), spec439072471436fa84e959ed231f7d1c4df15adcef (18315), plan89ced48bf88ff240e58e80b4971b73ebf3e0778f (17397). Root leyó las versiones originales completas y la reconciliación íntegra por líneas cambiadas. Cotejó contratos protegidos store/records/stage-facts en2f96 (sin cambios posteriores) y handler POST748–852/recheck803–824/issuerCapture756–771 en5205.
+
+## Conflictos e interfaces: scan antes de Task1
+
+| Frontera | Lo producido / consumido y riesgo | Ruling vinculante |
+| --- | --- | --- |
+| POST aceptado / Link productor | Const ack real no estaba en scope del recheck; SQLPromise/result/settled sí | Añadir ownAck privado asignado del const ack sólo tras appendAckResult recorded/hash. Insertar Link después del recheck ACK en849 y antes de activeChild=null. Misma l/window/common desde826–829, mismo witness/store SQL. Nada reconstruido desde DATA. |
+| Estados de recheck / nueva continuación | Else genérico813 no verifica SQL para un nombre nuevo | Enumerar estados admitidos. notice-link-pending y desconocidos niegan; notice-link-recorded exige SQL real asentado, ownSend/ownAck originales y Link put/sync/readback reales. Conservar ambos snapshots completos y expected entero. |
+| NoticeLink / ACK de evento | Records define5campos; hash del evento es camelCase, distinto del rowHash SQL | Usar codec existente NoticeLink y evidence('event',proyección exacta12columnas), secuencia global real. Sin purpose/selfhash/nuevo enum ni reutilizar viejo recorder notice_consent. |
+| Inventory / observer privado | Link nuevo comparte prefijo pero no journal | Añadir sólo suffix notice a whitelist y preparation.noticeLink privado null/record, readLink real en CADA snapshot, equivalencia de bytes/inventory y correlación completa incluso ante early return de noticePrimary. Journal normal tiene5filas, máximo6 con freeze y listcap7; Link es registro aparte en preparation.inventory. No inventar sexta fila de journal normal. |
+| Hashes/inventario / expected | El orden de storage.list es factual | Insertar raw NoticeLink en records.inventory con orden original y conservar todos los demás entries; copiar anchor.inventory concordante. No actualizar expected antes de put recorded + sync + readback verificados ni ocultar drift. |
+| Efecto5s / historia de lectura posterior | Una escritura debe caber en su ventana; el comprobante histórico debe poder observarse para futuros pasos | Producer y acceptedAt dentro del original consentSend.window.deadline y todos los techos. Observer valida acceptedAt contra esa ventana histórica; NO exigir Date.now antes de una ventana de efecto ya terminada para observar historia válida. Tiempo actual sigue bajo grant/Access/permiso/pre/C0 vigentes. Lectura no autoriza escribir: POST/public3keys/OAuth/GET siguen cerrados. Probar correlador real después del deadline5s, antes de expiry vigente, y replay sin nuevo SEND/SQL/Link. No renovar/rearm/backfill. |
+| putLink / durabilidad | Store transaction produce recorded/existing/uncertain, sin sync propio | Retener Promise reales separadas de SQL/ACK: put recorded+hash, sync capturado Reflect.apply, readLink byte-exact, luego par completo. Error/existing/uncertain/pending/fallo absorben, conservan historia, nunca leer para convertir resultado incierto en éxito. |
+| API propia / autoridad | Private frame y own continuation no son entrada cliente | Sin nuevo export de producto, DTO de autoridad, callback aprobador, sourcefactory, allowPending, pair transportable, permiso o phase. Un helper privado puro para proyección/hash es admisible si evita duplicación y no crea autoridad. |
+| Nuevo test Link / setup Consent privado | Helper privado40líneas en test no se puede importar sin ejecutar sus50tests; copiarlo sería deuda importante | Excepción explícita a la frase ambigua 'no nuevos helpers': permitir funciones Node SYN fijas de preparación/exchange/ticket/POST en fixture GET existente, operando sobre f nativo ya creado. No helper file/framework nuevo ni importar world o fixture SDK desde fixture GET (evitar ciclo). Mantener seed/harness/cleanup mínimo en wrappers de test. No callbacks aprobadores, verifier/source/resultado inyectados ni exports de producto. Reusar flujo auténtico preserva asserts. |
+| Minor POST / cuarto path permitido | Polling244 puede agotarse;161 inspecciona antes de settlement observado | Reforzar sólo esos dos casos: assert explícito de settlement/probe actual antes de asserts finales, bajo límites SYN existentes. Es prueba de scope local, no physical drain. Llevarlos al RED/targeted y fullPOST de esta unidad; no fixloop de la anterior ni cambios de retención. |
+| Fixture actual / nuevas gates | postReplace exige match único; trace causal no siempre es último entry | Preservar todos los marcadores y posiciones existentes; usar predicados causales específicos. Controles entre invocaciones sólo DATA; streams/promesas se liberan desde su invocación original. No reemplazar returns/throws/guards/actual native Promise. |
+| Task1 consigo misma | Cuatro paths, positivo real y negativas con DATA válidos / sin write authority | Todos los positivos nacen de GET+POST/SQL/ACK auténticos. Resealed negatives llegan al correlador, sin prior codec failure; estado SQL original intacto. Casos antiguos sinLink se producen por corte real trasACK, no prefill positivo. No nueva phase, segunda publicación o third CLOSED. |
+| Costo / cobertura compartida | +1DO read/snapshot, +1par; afecta observer común | Medir siete pares/catorce snapshots si implementación coincide, no declararlo antes. Mantener fanout2/caps/5s30s/C0C1. FullLink + fullPOST50actual + fullGET37actual + pure18 + selected16/6/4 +lint4 en tres jobs aislados≤15min. No repetir store/journal/allSDK/50ms ni standard build por métricas. |
+
+## Qualifier de laboratorio autorizado al despacho
+
+Excepción explícita al workflows-protected del diseño: .github/workflows/afw-notice-link-qualification.yml temporal, push sólo a esta rama y cuatro paths/qualifier, contents:read, checkout persist-credentials:false, Node22, npm ci --ignore-scripts --no-audit --no-fund, sin secretos ni runtime. **Máximo tres jobs paralelos e independientes**, cada uno timeout≤15min y fixtures aisladas sobre el mismo HEAD: A Link native; B POST native; C GET native + pure phase + selected phase16/SDK6/D04token4 +lint4. En RED/focal activar sólo grupos necesarios; no jobs vacíos para ruido. Artefactos TAP/graphs/IO saneados separados7d; consola nombres/summary/fallos y metadatos compactos, no arrays inputs/cuerpos/claves.
+
+POST37full previo340s y GET36full326s más regresiones≈100s justifican esta partición frente a un job combinado; no amplían plazos de producto. Sin manual rerun/cancel-in-progress ni cron, nueva tarea cloud o monitor. Retirar qualifier antes del informe final. No local builds/clones/deps. Si un archivo fuera del mapa o un edge estándar resulta necesario, elevar hecho concreto a Root antes, no al owner por decisión rutinaria.
+
+## Cierre exigido
+
+Informe docs/superpowers/reports/2026-11-05-finite-native-notice-link.md: BASE/codeHEAD/reportHEAD/tree/blobs, todos los runs incluidos fallos y comandos/counts/seleccionados-no seleccionados, RED causal→GREEN, hashes/bytes/graphs de compiles realmente usados, IO/ventanas/retención, perfiles y protected blobs. Source y synthetics claramente separados. Root lee primarias y paquete BASE completo; revisor fresco después. Writer no siguientes unidades ni helpers/reviewer propios.
+
+operationalReadiness=false;completePackage=false;PCoff=false. C0=I0+900000,C1=C0+180000;parent≤30000ms,child≤5000ms,techo fuente3nov02:59Z vencido. No runtime/provider/alias/Entry/DDLreal/OAuth/OTP/tokens/permisos/cron/Containers/Max/main/merge/mount/ARM; no segunda publicación ni third CLOSED. Última primaria real3nov, no garantía actual. Nuevas autorizaciones sólo cuando un gate operativo real lo requiera; no anticiparlas en fuente.
+
+
+## Spec reconciliada, con los rulings Root anteriores aplicables
+
+# NoticeLink nativo desde la continuación privada de consentimiento
+
+2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Scope de diseño aprobado por root: link-only, misma child/continuación POST después de ACK y recheck reales. No ejecución hasta reconciliar POST aceptado, preflight root y futuro BASE. Contratos protegidos inspeccionados en 2f96acb45ec5477d559f85070aa438d2e2e00822. Reconciliación focalizada con POST candidato 5205d80216d9767c44762df4a181e1015e093a8e / tree 23309d147f8818e0232be215f42a77cf7ffe0e6a, POST aceptado SOURCE por root en f62b6c8b17412b812ae411bbc9cedad43b9ce501 (tree 50fec019ac7a341fd9dacf004f7dd7f95581cd71): Spec ✅ / Quality Approved, 0 Critical y 0 Important. Producto idéntico a 5205/e153. Link INACTIVE hasta preflight y futuro BASE. No se siguió WIP. Formulario GET SOURCE activo y corrección cookie P3 implementados en ese candidato; aceptación SOURCE informada por root; ningún mount.
+
+## Resultado y límites
+
+El mismo POST humano que obtiene un EventRow nativo y su ACK durable añade el NoticeLink existente, comprueba durabilidad/lectura real y revalida el frame entero antes de200. El link queda como hecho privado enlazado al consentimiento original. No nueva ruta/export/phase, fuente notice_consent/finite_prearm, NoticeLink como permiso, publicación, flag, suscripción, entrega, ARM, cleanup ni hosting. No backfill: consentimiento anterior sin continuación viva no puede producir link desde ACK histórico.
+
+C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. Extender MISMA child POST, sin reiniciarla ni mover SQL a otra ventana. Si no cabe, se informa/deniega conservando historia, no se quitan rechecks. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Filemap cerrado (cuatro archivos)
+
+1. lib/mcp-qa-finite-owner-phase-context.mjs: productor léxico al final del handler handlePrivateQaFiniteOwnerNoticeConsent real del candidato; único suffix inventory notice adicional; read/correlación/snapshot privados.
+2. test/fixtures/finite-owner-notice-get.mjs: extender fixture SYN existente para observar putLink/sync/readback y gates reales; corrupción negativa/no autoridad.
+3. NUEVO test/mcp-qa-finite-owner-notice-link-native.test.mjs: recorrido y negativos específicos.
+4. test/mcp-qa-finite-owner-notice-consent-native.test.mjs: adaptar principal 'native consent POST records original decision after actual ticket GET' a Link final y reforzar sólo los dos asserts de settlement indicados abajo; conservar corpus restante.
+
+No cambiar preparación-store/records, notice-store/journal, owner-preparation antiguo, stage/profile/source stubs, forward/wire/QA, OAuth/SDK, world/DDL, workflows/config/flags. No nuevos helpers/exported callbacks o fichero de framework. Nuevo BASE que cambie APIs/fixture requiere ajuste explícito root antes de ejecución; el writer no amplía mapa.
+
+## Contratos existentes, sin rediseño
+
+NoticeLink DATA exacta y sin purpose ni recordHash:
+{preconnectionId,grantHash,eventHash,sequence,acceptedAt}.
+preconnectionId/grantHash/eventHash son hex64; sequence entero seguro positivo; acceptedAt tiempo entero. Record codec existente: encodeFinitePreparationRecord('NoticeLink',record), decodeFinitePreparationRecord('NoticeLink',raw), hashFinitePreparationRecord('NoticeLink',record). Su dominio es afw.finite-notice-link.v1; no agregar campos de phase/ACK/lease/actor/human.
+
+createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now}):
+- putLink({kind:'notice',record},lease) -> {status:'recorded'|'existing'|'uncertain',recordHash}; puede lanzar.
+- readLink({kind:'notice',preconnectionId},lease) -> {status:'observed'|'absent',record}.
+Key exacta connection-preparation:<original preconnectionId>:notice. Append-once; old byte-exact->existing, distinto->rechazo. putLink comprueba Preconnection y GrantLink actuales en transacción y acceptedAt dentro de sus límites; no valida por sí mismo SQL/Access/decisión. Su transaction NO incorpora storage.sync: la continuación debe esperar sync y readback explícitos además del ACK de putLink.
+
+Reutilizar issuerCapture=captureFinitePreparationIssuerContext({ctx,env}) de línea 756 y su verificación holders de 764. Crear preparación fija como preparationStore=createFiniteOwnerPreparationStore({storage:issuerCapture.storage,now:Date.now}) junto a journal/store de 800, sin opciones externas. Sync real: Reflect.apply(issuerCapture.sync,issuerCapture.storage,[]) retenido y esperado por wait; holders/check antes y después. Reutilizar prepEncode/prepHash/evidence imports existentes. No llamar recordFinitePreparationNotice({requestId,sequence},lease): requiere notice_consent, relee request y no conserva resultado SQL; forwardPrivateQaFiniteOwnerNotice sigue unavailable.
+
+## Proyección de evento: hash correcto
+
+Sea row=actualSqlResult.row ORIGINAL del store, ya validada/correlacionada por POST en ambos snapshots y en ACK consent. Proyección EXACTA:
+event={grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at}.
+
+eventHash=hashFiniteOwnerEvidence('event',event), dominio afw.finite-monitor-consent-event.v1. NO usar digest afw.finite-preparation-notice-row.v1 del ACK: ese hash cubre EventRow SQL con nombres snake_case y es distinto. Ambos se comprueban contra la MISMA fila real, sin rellenar uno desde el otro.
+grantHash=issuerRows.grantLink.grantHash===SHA256(original issuer identity.grantId); sequence=row.sequence real, no1/expectedSequence+1. acceptedAt=Date.now muestreado UNA vez después de ACK/recheck, en continuación viva; no es columna SQL ni caller timestamp. Debe ser>=consentAck.observedAt, >=row.issued_at y >=GrantLink.acceptedAt, <=Date.now al observar y <todos los techos vigentes. No cambia expiración original; link no tiene expiry propio.
+
+## Observer privado y snapshots completos
+
+Puntos reales en candidato: phase-context blob f8948c0a2cc41a48773406a64fc9c863226f9b2d, facts inventory prefix/list 17/size<=16, noticePrimary273–315, qualify373–374, snapshots376–388, qualifyNoticeConsentEvent395–400, qualifyNoticeConsentBaseline401–414, requireEmptyNotice416–419. POST ya correlaciona ConsentRow. Esta unidad sólo:
+1. Añadir 'notice' a whitelist existente del prefix original. Mantener list 17, size<=16 y demás inventarios/caps. No aceptar otra aprobación/efecto/stage por presencia de link.
+2. En qualify, usando getRecord existente, leer data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:capsule.preconnectionId},false), también cuando se espera ausente. Una lectura DO real adicional por snapshot. Require equivalencia presencia y encode byte-exact con f.inventory.get(prefix+'notice'); no inferir ausencia de error.
+3. Añadir noticeLink a lista privada snapshot.preparation (null ausente). records.inventory y anchor.inventory ya contienen la fila raw. No alterar anchor.notice (journal seis filas) ni noticeRows (schema/tickets/events). No nuevo campo público.
+4. En qualify, DESPUÉS de noticePrimary y ANTES de devolver q/snapshot, ejecutar correlación Link incluso si noticePrimary retornó temprano por esquema/issuer ausentes. Si noticeLink presente exigir:
+   - issuer/SDK completos y vigentes, GrantLink/relation/ConnectionRef originales, schema 7, ticket ACK applied/fila 14 exacta, consent SEND y ACK applied/fila 12 exacta, freeze ausente;
+   - l.preconnectionId===original, l.grantHash===actual GrantLink.grantHash===SHA256(original grant UUID);
+   - l.sequence===event.sequence===consentAck.sequence y eventHash===evidence('event',proyección de EventRow actual);
+   - acceptedAt>=max(consentAck.observedAt,event.issued_at,GrantLink.acceptedAt), acceptedAt<consentSend.window.deadline y acceptedAt<min(accessSEND,pre/approval/ConnectionRef/consent/grant/ticket/permission/C0), acceptedAt<=Date.now;
+   - tiempo actual todavía bajo los techos vigentes como POST; conservando exchanged_at actual y ACK histórico issuer separado.
+   Link sin event/ACK, no_mutation, revocación, orphan, mismatched identity/hash/sequence/time o evento extraño original deniega. No global COUNT/latest grant, sólo UUID/prefijo propio. Filas/prefijos de otros proyectos intactos.
+5. Sin link: seguir validando notice/event como POST; un consentimiento nativo asentado sin link es historia incompleta observacional, jamás apta para replay/backfill.
+6. requireEmptyNotice añade comprobación explícita de preparation.noticeLink. Público3keys/OAuth/GET permanecen cerrados frente a history/link propio. Baseline privado POST exige noticeLink===null Y estado ticket ACK/event0 original; un POST nuevo no puede completar link de consentimiento previo. SourceBase y proyección read_consent NO cambian por Link.
+
+Ambos snapshots completos se comparan entre sí y contra expected; no omitir filas/columns/owner/SDK/source ni normalizar grant.exchanged_at. Preparación.record/link hashes validan DATA; las correlaciones y current checks son responsabilidad del observer, nunca source factory.
+
+## Continuación productora exacta
+
+Punto exacto en candidato: línea 849, inmediatamente después de await recheckConsentOwned() y antes de activeChild=null. clock.child abre en 826; l, window y common son los originales de 826–829. actualSqlPromise/actualSqlResult/sqlSettled se asignan en 842–843; const ack y appendAckPromise/appendAckResult son reales en 846–848. HTML sigue fuera de la child en 852–853. No otra petición, lease, ventana o endpoint.
+
+Precondiciones privadas simultáneas:
+- identity/CSRF/prepare/approval originales del POST fueron verificados por servidor; headers/holders siguen idénticos y tiempo actual permitido;
+- actualSqlPromise REAL resuelta, sqlSettled=true, actualSqlResult.status==='applied'; EventRow exacta igual expected.noticeRows.events[0];
+- ownSend creado aquí y recorded, ownAck creado de ese resultado con appendAck recorded, recheck completo ya hecho;
+- expected.preparation.noticeLink===null y key ausente en inventory; failed=false.
+No param/callback/WeakMap nuevo admite estas condiciones. El candidato no conserva ownAck en el scope de recheckConsentOwned. Añadir ownAck=null a la declaración 801 y asignar ownAck=ack únicamente después del guard recorded/hash de appendAckResult en 848. Es el const ack realmente producido, nunca clon tomado del journal/expected. appendAckPromise y appendAckResult permanecen léxicos en la misma child; no transportarlos mediante DTO.
+
+1. Guard del parent+child+failure/holders/Access actual y recheck ya realizado tras ACK. Sample acceptedAt una vez y construir ownedNoticeLink cinco campos de referencias locales originales. Validar codec y relaciones anteriores antes de llamada.
+2. position='notice-link-pending'; linkSettled=false. Retener linkPromise REAL=preparationStore.putLink({kind:'notice',record:ownedNoticeLink},l) antes de race, sin sobrescribir actualSqlPromise/result/settled ni appendAckPromise. Await bajo wait/activeChild; require recorded y recordHash===prepHash('NoticeLink',ownedNoticeLink). existing/uncertain/error termina sin200, sin retry/read-to-recover.
+3. Guard; await Promise REAL de storage.sync usando método capturado y retain; luego readLink real en MISMA child, require observed + prepEncode byte-exact del record y hash esperado. Mantener linkPromise/result/referencia propias. No usar transacción ACK como sustituto de sync.
+4. Sólo tras sync/readback normales: linkSettled=true; actualizar expected.preparation.noticeLink=clone(record), insertar [prefix+'notice',prepEncode('NoticeLink',record)] en expected.records.inventory conservando orden, expected.anchor.inventory=clone(expected.records.inventory); ninguna otra celda. position='notice-link-recorded'.
+5. recheckConsentOwned() completo extendido: el candidato sólo valida SQL resuelto en los estados consent-sql-resolved y consent-ack-recorded (816–818). Enumerar exhaustivamente estados admitidos al recheck: baseline, ticket-observed, consent-send-recorded, consent-sql-resolved, consent-ack-recorded y notice-link-recorded. consent-sql-pending, notice-link-pending y cualquier desconocido deniegan antes del par. Los tres estados resueltos deben exigir actualSqlPromise, sqlSettled, actualSqlResult applied, EventRow byte-exact y qualifyNoticeConsentEvent; los dos posteriores al ACK también ownAck, sendHash/rowHash/sequence exactos y canonical(ownAck)===canonical(expected.records.notice.operations.consent.ack). notice-link-recorded exige además put recorded+sync/readback satisfactorios, linkSettled y exacta ownedNoticeLink. No dejar estados Link caer en el else genérico de 813. Await ambos snapshots completos, comparar canonical(first)===canonical(second)===canonical(expected). Sin rawpair exportado ni tolerancia desde parámetros.
+6. Guard final dentro child, cerrar child normalmente, guard original/failure/Access antes de200. Mantener respuesta POST humana sobre decisión temporal: no link hash/IDs internos ni “suscripción lista”. No autoavanzar fase o publicar.
+
+No journal SEND extra para Link: es append local one-shot existente; consent SEND/ACK nativos y baseline cerrado ya impiden otra continuación. Unknown Link commit puede dejar Link durable sin200: se conserva como hecho, no se completa/reintenta desde lectura ni se borra. ACK consent permanece histórico aunque link falle. No freeze automático ni nueva operación en journal6rows.
+
+## Refuerzo acotado del test Consent existente
+
+Carry obligatorio de precisión de tests, informado por root tras revisión POST (sin fix-loop ni cambio de producto): en 'native consent original window fences queued SQL' (158–162), después de noticeReleaseHeld exigir settlement observado antes de noticeInspect/asserts finales; en 'native consent abort retains SQL and forbids late ACK' (240–245), polling acotado debe terminar con assert explícito de noticeProbe().allowed===true, no agotarse silenciosamente. En ambos casos falla si no se observa settlement dentro del límite SYN existente; no ampliar ventana productiva, retención o timeout para conseguirlo. La admisión del probe acredita sólo ese scope local, no physical drain. Warnings de toolchain/harness quedan para review final, sin upgrades.
+
+## Fallo, retención y carreras
+
+Retener Promise reales de putLink/transaction/sync/readback y full snapshots antes de races. firstFailure/failed absorbentes POST siguen activos; guard comprueba holders antes/después awaits. Abort/expiry puede retornar denegación pronto mientras transacción/sync real sigue pendiente; scope local stage-work queda outstanding hasta settlement según contrato existente. No Set journal como mutex, no physical drain/distributed cancellation.
+
+current SQL/event/source checks antes y después del append no son atomicidad global D1+DO/control plane. Si revocación/cambio vence justo después del último read, puede quedar Link histórico y respuesta503; no declarar que Link otorga permiso tras revocación. Lectura posterior deniega. Evento SQL/ACK no se borran para aparentar rollback. CLOSE sólo no revoca grant; real revokeGrant cambia rechazo ordinario a Monitoring authorization unavailable, no enabled:false.
+
+## Downstream explícitamente cerrado
+
+Records ya contienen phases closed_ui/read_consent/notice_consent/finite_prearm; no inventar otra ni reinterpretarlas. notice_consent exige stage='notices', receipt de publicación real y profile exacto: monitoring owner flag/policy fija grant/project/client/expiry; qualifyFiniteOwnerInstalledStage exige StageApproval/TicketUse/upload/activation/predecessor connection. Link por sí solo NO acredita esa segunda publicación.
+
+stage='finite' requiere además NoticeLink y dos predecessors en stage-facts; final readFiniteOwnerPreparationFacts requiere source.finite_prearm y tres receipts. El tercer CLOSED/prearm y su posterior conversión a full setup son unidades posteriores; no ejecutar publication/config aquí. El profile de conexión actual sólo acepta closed_ui/read_consent/notice_consent: no derivar finite_prearm por label ni añadir trueflags. Link-only no requiere tercer CLOSED; hacerlo consumidor de una nueva fase sí ampliaría alcance prohibido.
+
+## Costos, aceptación y handoff
+
+Sin D1 SELECT nuevo: ticket/event/issuer/current/SDK provienen de pares completos POST existentes. Sí +1 DO readLink por snapshot (+2 por par) siempre, incluido estado vacío. Con link añade bytes de raw inventory + registro privado en snapshots, manteniendo caps. Productor suma transacción putLink, sync, readback y UN par completo adicional tras link; recheck postACK ya existente no se sustituye ni duplica innecesariamente. El reporte del candidato mide 6 pares/12 snapshots: objetivo estructural Link 7 pares/14 snapshots, sujeto a comprobación nativa; no afirmar medición antes del GREEN.
+
+Medir en mismo GREEN queries/DOops/get/list/transaction/sync/HTTPfanout/bytes/metafiles/childelapsed/parentelapsed. Referencia atribuida al reporte candidato blob 91c08e8cfd6f0eb954631c3e75ea4af66e4b33b5: child 775 ms/window 4999 ms, parent 1275 ms; 102 first-primary sessions, 120 SQL (64 first/56 all), DO get902/list108/sync2/transaction26, HTTP84/peak2/active0. No son presupuesto adicional ni cifras del futuro Link. No heredar 98/112 ni repetir 50 ms/all SDK/build estándar para métricas. No aumentar fanout 2/caps/plazos. Si deadline original impide completar, reportar con estado durable real y root decide unidad futura; no renovar.
+
+Plan especifica RED causal y GREEN nativo. JWT SYN realmente firmado, Access/CSRF originales, GET+POST y D1/DO reales, sin prefill positivo ni verifier fake. P3 cookie-list y corpus resealed están implementados en el candidato POST con revisión aprobada según root: conservarlos, preservar aceptación SOURCE y no editar wire/body. La evidencia POST50/GET37 es cobertura escalonada, no una única ejecución full. Root debe fijar preflight Link, BASE y permiso cloud. Propuesta de qualifier futuro: tres jobs independientes sin credenciales, cada uno ≤15 min: Link full, POST full, GET full+regresiones+lint. Root fija cap/partición en preflight; estos docs no autorizan workflow/dispatch ni reducir checks. Rollback sólo commits propios por CAS; nunca borrar Links/eventos/historia real. No ejecución por estos docs.
+
+
+## Plan reconciliado y tarea completa
+
+# NoticeLink desde POST nativo — Implementation Plan
+
+> **For agentic workers:** Futuro workflow superpowers:subagent-driven-development, un único writer y revisión root spec/quality. **INACTIVE**: no implementación, tests, agentes ni ejecución por este plan. Root reconcilia POST aceptado y fija preflight/BASE/permiso cloud antes de activar; writer no crea helpers/reviewers.
+
+**Goal:** Persistir y correlacionar el NoticeLink existente desde la continuación privada del POST de consentimiento real, antes de responder200.
+**Architecture:** Extensión léxica del handler Consent, misma child/lease/SQL result y ACK originales; preparationStore.putLink→sync→readback→dos snapshots completos. Ninguna nueva phase/API/ruta.
+**Tech Stack:** ESM, harness Miniflare/workerd/D1/DO existente, JWT RS256 SYN real; cloud sólo cuando root lo active.
+**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-link.md
+**Contratos protegidos:** 2f96acb45ec5477d559f85070aa438d2e2e00822.
+**POST reconciliado:** candidato 5205d80216d9767c44762df4a181e1015e093a8e / tree 23309d147f8818e0232be215f42a77cf7ffe0e6a; POST aceptado SOURCE por root en f62b6c8b17412b812ae411bbc9cedad43b9ce501 (tree 50fec019ac7a341fd9dacf004f7dd7f95581cd71): Spec ✅ / Quality Approved, 0 Critical y 0 Important. Producto idéntico a 5205/e153. Link INACTIVE hasta preflight y futuro BASE. No seguir WIP. GET form SOURCE activo y cookie P3 aceptados SOURCE por root; sin mount.
+
+## Restricciones
+
+- Filemap de cuatro archivos exacto de spec; sólo producto phase-context y tres archivos de pruebas/fixture. Store/records/journal/profile/source stubs/forward/OAuth/SDK/world/DDL/config/workflow protegidos.
+- Link DATA cinco campos SIN purpose/selfhash; eventHash=evidence('event',camelCase12) NO rowHash SQL del ACK. No nuevos enums.
+- Misma child POST<=5000ms desde observeTicket a Link/recheck; parent original<=30000ms; C0=I0+900000/C1=C0+180000; source ceiling 3 nov02:59Z vencido. Sin nuevo presupuesto/rearm/renew.
+- Público3keys/OAuth/GET y baseline POST nuevo cierran ante historia propia; ACK histórico nunca crea continuación; sin backfill/retry/physical drain.
+- Segunda publicación notices y tercer CLOSED/finite_prearm posteriores; aquí flags/operationalReadiness/completePackage/PCoff siguenfalse.
+
+## Review focus
+
+1. Confundir snake_case rowHash con eventHash camelCase produciría un Link incompatible con consumidores existentes.
+2. putLink transaction ACK sin sync/readback no cumple el boundary propuesto; unknown commit no admite recuperación permisiva.
+3. Nueva lectura debe entrar en AMBOS snapshots y anchor.inventory, sin esconder drift de issuer/exchanged_at/current source.
+4. Contextos nuevos/actor restart/historia previa no pueden enlazar consentimiento cuyo resultado SQL ya no está vivo.
+5. Costo adicional no puede iniciar otra child ni renovar window, aunque el evento/ACK ya sean durables.
+
+Cada punto tiene casos nativos concretos en pasos2–5; no sustituirlos con codec-only.
+
+## Task 1: Link propio durable con continuidad factual privada
+
+**Files:**
+- Modify lib/mcp-qa-finite-owner-phase-context.mjs.
+- Modify test/fixtures/finite-owner-notice-get.mjs.
+- Create test/mcp-qa-finite-owner-notice-link-native.test.mjs.
+- Modify test/mcp-qa-finite-owner-notice-consent-native.test.mjs expectativas de finalización propia y dos assertions de settlement diferidas por root.
+Ningún nuevo archivo por inferencia. Brief/reporte/qualifier root fuera de producto se acuerdan en preflight, no se ejecutan desde diseño.
+
+**Consume:** handler handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease) real (748+); actualSqlPromise, actualSqlResult, sqlSettled, ownSend, const ack y appendAckPromise/appendAckResult privados; observeOwnerPhasePair/getRecord/recheckConsentOwned PRIVADOS; createFiniteOwnerPreparationStore({storage,now:Date.now}).putLink/readLink; captured storage.sync; codecs/hash/evidence existentes.
+**Produce:** NoticeLink en key connection-preparation:<id>:notice y snapshot.preparation.noticeLink privado; NO exports nuevos. POST 200 sólo después del Link/readback/full recheck; misma respuesta humana sin datos internos.
+
+- [ ] **1. Preflight obligatorio y baseline.** Root entrega POST aceptado code HEAD/tree/blobs y futuro BASE. Comparar contra candidato reconciliado: APIs/variables reales, seis filas journal y resolución final de P3 cookies, shared fixture y gates. Ubicación fijada en 849: después de await recheckConsentOwned() y antes de activeChild=null, dentro de l/window/common originales (826–829). Confirmar cuatro paths y permiso cloud. El candidato conserva SQL y ack hasta ese punto; requiere ownAck en scope 801, asignado del const ack sólo tras appendAckResult recorded/hash (848), no del snapshot. Si revisión cambia esto, root reconcilia antes de ejecutar; no helper público. Preservar evidence actual; no copiar docsbranch sobre fuente ni ejecutar usando2f96 sin POST.
+
+- [ ] **2. Escribir RED causal sobre POST aceptado.** Test 'native notice link follows actual consent ACK in the same POST child': grant por OAuth real, GET monitoring real, POST firmado/CSRF real y D1/DO reales, event native + consent ACK ya éxito. Primero assert POST 200 + real event/ACK y ausencia de fixtureError; después exigir NoticeLink exacto. RED esperado Link ausente en producer POST aceptado, NO endpoint404/importmissing/journal inválido. Principal usa token/MCP real al menos una vez y verifica exchanged_at actual; negativos posteriores usan grant SDK real sin repetir token/MCP innecesariamente.
+  Capturar hashes/rows originales y trace de actual SQL resolution→ACK→Link; Link no se prellena. Datos ajenostres eventos/dos grants ycuatro DDL históricos del world aceptado permanecen byte-exact; sequence global puede>1.
+
+- [ ] **3. Implementar mínimo íntegro.** Añadir suffix notice y lectura readLink real por snapshot; comparar inventario raw/decoded. Correlación precisa con EventRow/ticket/issuer/SDK/current fuente. Añadir preparation.noticeLink=null/record, sin salida pública ni source phase nueva. Extender requireEmptyNotice.
+  Extender recheckConsentOwned (803–824) con lista exhaustiva de estados: rechazar pending/desconocidos; mantener SQL real en consent-sql-resolved, consent-ack-recorded y notice-link-recorded, y ownAck en los dos últimos. El else actual no basta para nuevos estados. En la MISMA child después de recheck ACK: exigir actualSqlPromise/result reales, ownSend/ownAck recorded, failed false, link ausente; acceptedAt real una vez, eventHash camelCase existente. Añadir preparationStore junto a journal/store, usando issuerCapture.storage. Retener linkPromise=preparationStore.putLink(...,l), recorded+hash exacto, Reflect.apply(issuerCapture.sync,issuerCapture.storage,[]) real y readLink byte-exact; no sobrescribir actualSqlPromise/result/settled. Usar wait/check existentes y el mismo l. Sólo entonces update expected.preparation.noticeLink, records.inventory y anchor.inventory; recheck completo final sin sobrescribir SQL Promise. No reutilizar viejo recorder ni su ramo existing. Conservar failure latch/holders/Access/plazos.
+  Fixture real blob f2ede8ac193b24dfc9e548fb4175f6e8eb6947a0, líneas 190–213: preservar postReplace de match único, lost-ack, before-send/before-insert, trazas y noticeConsentEventAck. Extender marcadores propios para Link sin romper los actuales. Holds nativos se ejecutan en la invocación ORIGINAL; controles externos sólo DATA, nunca resolver una Promise nativa desde otro request ni inventar otro timer budget. APIs store/records sin cambios. No journalSEND adicional ni nueva phase. Si un test exige modificar otro archivo producto, parar con diferencia concreta.
+
+- [ ] **4. GREEN principal y contratos nativos.** Casos nuevos:
+  - 'native notice link follows actual consent ACK in the same POST child': exact5 fields/codec/canonical bytes, key propia, eventHash diferente del rowHash journal y exactamente evidence('event',mapping12), sequence real, acceptedAt correlacionado; put recorded→sync→readback→snapshotpair antes200; source/SDK/issuer original intactos.
+  - 'native notice link retains global event sequence and foreign history': caso en historia ajena existente, no sequence1supuesto ni lookup global.
+  - 'native notice link never advances source or public readers': público3keys/OAuth/GET/POST replay niegan history/link; cambios none en profile/flags/policy stage receipts; record no abre NoticeLink endpoint ni old forward.
+  - 'native notice link requires live originating SQL continuation': replay después consentimiento completo y restart real no llama putLink; consentimiento previo sinlink (producido por POST base real o corte justo después ACK) tampoco se backfillea. No fabricar actualResult DTO ni exportar pair para simular éxito.
+  - 'native notice link event hash uses existing consumer projection': mismo EventRow devuelto por INSERT se proyecta campo por campo; hashFiniteOwnerEvidence valida gramática existente, no custom domain/nuevo schema. Esta comprobación de compatibilidad no declara notices stage activo.
+
+- [ ] **5. GREEN fallos/retención/correlación.** Gates sobre Promises nativas reales, fixture sólo observa/corrompe negativamente:
+  - 'native notice link unknown transaction never recovers from readback': putLink realmente commit pero respuesta perdida;503, Link puede existir, event/ACK retenidos, cero retry/link segunda escritura/200. No seguir a sync/readback para convertir uncertain en recorded.
+  - 'native notice link lost sync or readback remains closed': put recorded y sync/readback fallo; conserva Link/consent, sin response200; otroPOST no repara. Variante readback bytes incorrectos (DATA shape válida) no se acepta.
+  - 'native notice link existing or conflicting record cannot win': entre recheck y put insertar SYNnegative link exacto/diferente usando contrato codec; storeexisting/conflict no200. No meter positivo en baseline.
+  - 'native notice link held write and cancellation retain actual work': hold actual transaction/sync/readback; abort original; respuesta denegada no ACK final/HTML; scope real outstanding hasta settle. Otro ingreso del mismo ctx con lease SYN vigente deniega antes de settle; no probar exclusión sólo con lease abortada ni atribuirla al journal pending Set.
+  - 'native notice link original child expires without renewal': gate after ACK/before put cruzando deadline 5 s REAL del consentSend; assert gate alcanzado con tiempo, cero nuevo put si expiró antes llamada. Variante commit gana luego expires->Link preservado/503. No otra clock.child ni Date patch. Contabilizar desde observeTicket original.
+  - 'native notice link current facts drift at final recheck': owner/revision/QA/Mpublication/holder o exchanged_at válido entre snapshots; denegar y preservar historia. Usar marcador de source current antesput y despuésput, no opción expected.
+  - 'native notice link factual mismatch denies ': eventHash, grantHash, sequence, preconnectionId, acceptedAt futuro/antes del ACK/después del deadline. Link shape/codec válidos cuando se prueba correlador; trace prueba que pasa decode y llega al predicado objetivo, no afirmar aislamiento por un rechazo anterior. Columnas SQL/issuer originales intactas; no reseal ni reautorizar SQL. Mutaciones negativas de transacción/current deben identificarse como SYN.
+  - 'native notice link missing source evidence never becomes authority': link sin consent ACK, no_mutation, ticket diferente/unknown SEND, freeze o event withdrawal; baselines públicos/POST deniegan antes NUEVOconsent SEND/SQL/putLink. Positivo siempre nace del producer real; negativos sólo después.
+  - 'native notice link real reduction preserves event and link': real revokeGrant/CLOSE según APIs existentes del fixture, sin endpoint nuevo. CLOSE no se confunde con revocación; real revokedgrant hace resolver ordinario rechazar generic Monitoring authorization unavailable. Todas filas append-only permanecen, no enabled:falseinventado.
+  Carry obligatorio de precisión de tests, informado por root tras revisión POST (sin fix-loop ni cambio de producto): en 'native consent original window fences queued SQL' (158–162), después de noticeReleaseHeld exigir settlement observado antes de noticeInspect/asserts finales; en 'native consent abort retains SQL and forbids late ACK' (240–245), polling acotado debe terminar con assert explícito de noticeProbe().allowed===true, no agotarse silenciosamente. En ambos casos falla si no se observa settlement dentro del límite SYN existente; no ampliar ventana productiva, retención o timeout para conseguirlo. La admisión del probe acredita sólo ese scope local, no physical drain. Warnings de toolchain/harness quedan para review final, sin upgrades.
+  Preservar también corpus POST P3 cookies/resealed correlaciones al ejecutar su suite; no recrear las mismas familias en Link por rutina.
+
+- [ ] **6. Medición proporcional sin nuevo presupuesto.** Capturar en GREEN real: +2 DO readLink/par, mismo D1 SELECT y HTTPfanout por snapshot, +1 par completo final más puttransaction/sync/readback. Referencia del reporte candidato: 6 pares/12 snapshots, child 775 ms de 4999, parent 1275 ms, 2 Access verificaciones. Link proyecta 7 pares/14 snapshots; medirlo, no asumirlo ni reutilizar 98/112. El tiempo sobrante observado no garantiza capacidad. Reportar conteos físicos/first-primary/list caps/bytes/hashmetafiles QA/M, elapsed child total<=5s y parent<=30 s, peak fanout 2 original. Verificar que null y raw inventory aparezcan en ambos snapshots sin omitir otrocampo.
+  Si no cabe, registrar fallo causal y durable prefix conservado; no ampliar plazo/clock/ventana, omitir lectura ni declarar fit por CODEC. No repetir50 ms/all SDK/build estándar para obtener cifras.
+
+- [ ] **7. Regresiones escogidas y verificables.**
+  1. node --test test/mcp-qa-finite-owner-notice-link-native.test.mjs
+  2. node --test test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+  3. node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
+  4. node --test test/mcp-qa-finite-owner-phase-context.test.mjs
+  5. node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
+  6. node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+  7. node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+  Prefixes existentes ya leídos en cadena: phase16, SDK6, D04cuatro; verificar literal names/conteos/no 0 match contra futuro BASE, candidato aporta POST50/GET37 por cobertura escalonada, no full único ni aceptación. Conservar literales POST 'native consent POST records original decision after actual ticket GET', 'native consent own SQL continuation alone accepts pending SEND' y 'native consent lost native result never reconstructs ACK'; GET 'GET acknowledged original after actual QA code M token MCP and D04 reader'. El principal POST cambia expectativa final de Link; los dos casos de settlement descritos en paso 5 refuerzan sus asserts; el resto mantiene sus predicados. Justificación: observer común añade DO read y field privado en todas fases, snapshot drift/SDKpending/exchanged_at; cuerpos/grammarGET+POST y fixture compartidos. Suites store/journal/records intactas conservan evidencia aceptada; tests Link ejercen put/read reales, sin rerun amplio por reflejo.
+  ESLint sólo cuatro archivos cambiados; QA/M compilados por harness y graphdiff vs POST aceptado. Standard build sólo si nuevo alcance llega realmente a entrypoint estándar y root lo exige. Propuesta root de futuro qualifier: tres jobs independientes sin credenciales, cada uno ≤15 min: (A) Link full; (B) POST full; (C) GET full + regresiones seleccionadas + lint. Referencia anterior POST37 full ~340 s + GET36 full ~326 s + seleccionadas ~100 s; POST ahora tiene 50 casos. No agrupar todo bajo 15 min ni omitir checks para cumplirlo. Root fija cap/partición tras aceptación y preflight; no crear ni despachar qualifier aquí.
+
+- [ ] **8. Guardar y revisión root.** BASE/code HEAD/report HEAD/tree/cuatro paths/blobs, protected blobs, RED/GREEN exact heads/runs/jobs/attempts/counts seleccionados/fail/skip/lint, costos/retención/plazos, native vs SYN y no autoridad. Root lee diff completo y hace spec+qualitySDD; writer no helpers. No siguiente unidad, main/merge/mount ni nueva autorización por pasar checks.
+
+## Rollback y pendientes posteriores
+
+Rollback sólo commits propios CAS contra HEAD esperado; no borrar Link/eventos/tickets/journal/grants para revertir una respuesta incierta. Conservar estado durable parcial y receipt de fallos. No cleanup/freeze automático ni backfill.
+Siguiente dependencia real: segunda publicación notices con StageApproval/decision/receipts/profile/current factual y continuación propia; luego tercer CLOSED/finite_prearm y full setup separado. Link DATA no las completa. Todo continúa INACTIVE hasta root preflight/POST reconciliado/BASE futuro.
+

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-native-notice-next-slice.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-native-notice-next-slice.md b/docs/superpowers/briefs/2026-11-05-finite-native-notice-next-slice.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-native-notice-next-slice.md
@@ -0,0 +1,210 @@
+# Task brief — GET ticket y hechos privados de avisos
+
+READ FIRST; requisitos completos para UNwriterfresco SDD. Preparado5nov2026, INACTIVE hasta mensaje rootBASE/tree exactos futuros. Repos tokenizartinfo-ops/agent-friendly-web(1347578006 PUBLIC), rama feat/finite-native-cleanup-20261101. Pin2b6cd7a6esdiseño,no producto. Store4016c13d y journal2969a840 yaaceptados, sin repetirlos. No subagentes/helpers/reviewerpropio. Rootpreflight compañero reviews/2026-11-05-finite-native-notice-next-slice-preflight.es.md; resolver sus rulings junto al contratoabajo. Informe reports/2026-11-05-finite-native-notice-next-slice.md, sin -design.
+
+PROJECT=AFW; ENVIRONMENT GitHubsource/ActionsSYN; ORIGIN GitHubAPI; RESOURCE_TYPE isolatedbranch; ALLOWED_ACTION10paths exactos+informe+qualifier temporal aprobado; ROLLBACK sólo owncommits expectedheadCAS/sinforeignoverwrite. No localclone/deps/build/test/bigfiles ni tocarotrosproyectos. Ningún runtime/provider/account, alias/Entry/DDLreal/OAuth/OTP/tokens/permisos/cron/Containers/Max/main/merge. Scope SOURCEUNMOUNTED; sourceceiling3nov02:59UTCvencido/Noearlyrenewal. Flagsoperationalfalse.
+
+## Ruling de reanudación — fixture histórica, 5nov2026
+
+Esta sección prevalece únicamente sobre la condición anterior «7DDL sólo noticeGet». Root leyó la primaria DIAGNÓSTICO d87158c4/run42097405566/job127490953992: LIST nativa Maptrue/size0, ALL nativa successtrue/arraytrue/size4, rechazo phase:276 por schema parcial. Test1F antes del segundo snapshot; no defecto de Map/ALL/actor ni autorización para interpretar4comoausencia. Root leyó test/fixtures/finite-initial-history-world.mjs@dc4 líneas31–37: instala4objetos consent y conserva3eventos ajenos ('original','cancelled-old').
+
+Autorizado sólo en test/fixtures/finite-initial-entry-world.mjs YA dentro del mapa10: después de seedFiniteOwnerPhaseHistory instalar los7DDL IF NOT EXISTS originales para todos mode.startsWith('phase-context'), añadiendo únicamente tabla tickets+2triggers faltantes. Conservar4DDLexistentes/3eventos/grants/filas/historia; sin DROP/DELETE/UPDATE/semillas positivas/cambio de fixture11/DDLreal. Acreditar preservación nativa y diff exclusivo adaptador. El producto sigue rechazando schema parcial/malformado/unknown; success===true/array/cap/Map intactos. Retirar onLoad diagnóstico, nunca usar sus hashes como GREENproducto.
+
+Se conservan33GETnativas+18purePASS de be044d4894e84497fb490720875195f5c8b15167/run42095343936/job127483768304 si el código producto no cambia. Tras adaptar exclusivamente fixture ejecutar phase16/SDK6/D04token4+lint10; nuevas repeticiones sólo por fallo/cambio/defecto concreto, no repetir33 para aceptar el adaptador. Ruling nosniff: copiar sólo allowlistOAuthintacta y fijar nosniff en HTML200 final M; QA genera su header, sin ampliar copia ni cambiarOAuthordinario.
+
+Esto corrige preflight de fixture con evidencia; no cambia alcance fuente/autoridad/frames/presupuestos30s5s ni permiso humano/runtime. ROOTBASE de revisión sigue dc4edafc0b5e4ba440cd32a21dd3dd58024e811a; no cambiarlo al fixhead.
+
+## Rulings de root que prevalecen sobre incertidumbres del diseño
+
+1 SelectAll requiere result.success===true +resultsArray/cap antesdeinterpretar0rows; error/unknown jamásschemaausente. Todaslas consultas nuevasfactuales sonprimerasentencia ennewfirst-primary. Ninguna positivaSQL/snapshot/identityverifier fake; nuevosfaultsSYNnegativos pueden cambiar sólopropiedadmetadata despuésdeactualquery, explícito/noesproveedorreal.
+2 Root confirmó phasefixtureDBoriginal.prepare devuelvestmtnativo conall; no ampliarmapa porinferencia. Diezpaths source/test de la spec, protocolo/publisher/flags ordinariosinvariables. Metricsassertions seactualizan deobservaciónreal, no para ocultarfail/gates. No schedulerchange/50ms/allSDK rerun.
+3 Instrumentar QA/Mcompiles realmenteusadosporharness y graphmetafiles/hash/bytes/inputreachability. Noestándar extra mientrasentrypointsstdinvariables/phaseunmounted(noestabaenstdD03). Si hay nuevaedgeSTDreal, preguntararoot con evidencia antesde ampliar. No build sólo por hash.
+4 DosREDcausales: inventorycongrantreal yownnegativecorruption; GETausentetrasprereqsreales. Scaffolds temporales sólonuevosGETmódulosunavailable, no reemplazar origenfactual/SDK/store, noimpostarpruebaSQL/futuroallowPending.
+5 NuevotestGETnativecompleto+purophasearchivo completo+filtrosplaneados16phase-native/6SDKnative/4D04token, contadores explícitos/nozero, reportarseleccionadosynoseleccionados conTAPreal. SóloprincipalGETexigeactualQAcode→Mtoken→MCP; negativosque no dependendeexchangedpuedenusaractualSDKissuer+grantnativo sinrepetirMCPinnecesario. Ningún grantpositivoD1prefill.
+6 Qualifier temporal acotadorama/10paths, contentsread/nosecrets/checkoutpersistfalse, npmci --ignore-scripts --no-audit --no-fund sólocloud, timeoutjob15minmáximo, checkpoints porgrupo, retirarfinal. No aumentarproducto30s/5s parafit; diagnóstico de fallo real menorcaso, no reruns ciegos.
+7 GET sólopreparaticket; HTMLformdisabled/formactionnone/noJS explícito, POSTlas3rutasclosedantesjournal/SQLsinfall backordinario. No publicarGETaislado. Vacíoantelegacy3keyreaderseconserva; contenidopropionoticescierrareader, no permisosOAuthnuevos ni faseinventada. Historiaajenasepreserva.
+8 Stackexpected/SQLPromise/result/settled/operation jamássonargumentos/DTO; resultado real permanece hastaúltimorecheck. AppendPromisesdiferentes no sobreescribenSQL. Sourceactualtrascadaefectopropioyaobservadonativo secomparacompleta/dossnapshots, sin normalizartimestamp ni omitircolección. Existing/uncertain/noMutation no200/form/retry/ACKreconstruido.
+
+## Contrato vinculante completo
+
+## Unidad y límites
+
+GET /monitoring real→forward M fijo→QA fijo→Access/preconnection/grant originales→journal tres filas y ticket D1 original; antes de respuesta positiva, dos snapshots completos deben igualar el frame léxico de la propia operación. GET prepara ticket, nunca consentimiento. POST /monitoring/grant y /monitoring/revoke, NoticeLink, source notices/finite, third CLOSED, flags, mounts y rollout permanecen fuera.
+
+C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. No rearm, renew, reloj inyectado, budgets nuevos, callbacks aprobadores, DTO de autoridad ni allowPending. D0.4 conserva exchanged_at actual y proyección sólo para ACK histórico. Sin cambios de store/journal/SDK/autoridad/DDL. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Mapa de archivos cerrado
+
+Producto:
+1. Modificar lib/mcp-qa-finite-owner-phase-context.mjs: ampliar snapshots privados, mantener salida3keys; añadir un handler GET fijo en el mismo módulo.
+2. Crear lib/mcp-qa-finite-owner-notice-get-wire.mjs: grammar/metadata fijas, sin I/O.
+3. Crear lib/mcp-qa-finite-owner-notice-get-forward.mjs: M→QA sólo este GET, con transporte real retenido.
+4. Crear lib/mcp-qa-finite-owner-notice-get-qa.mjs: receiver QA de Request real, UNMOUNTED.
+
+Pruebas/fixture:
+5. Crear test/mcp-qa-finite-owner-notice-get-native.test.mjs.
+6. Crear test/fixtures/finite-owner-notice-get.mjs: extensión SYN específica, gates/trace/inspect saneado, sin reemplazar resultados producto.
+7. Modificar test/fixtures/finite-initial-entry-world.mjs: opt-in mode 'phase-context-sdk-token-notice-get', extensión fixture y siete DDL sólo ahí; todos los otros modos intactos.
+8. Modificar test/fixtures/finite-owner-qa-sdk.mjs: opción fixture noticeGet=false; en true routing SYN de M/QA a módulos nuevos, conservando OAuth/token/MCP reales.
+9. Modificar test/fixtures/finite-owner-io-fanout.mjs: instrumentar únicamente closures originales por markers únicos; observar nuevas consultas all/fresh-primary y no confundirlas con preflight/escrituras. No cambios en producto por acomodar observador.
+10. Modificar test/mcp-qa-finite-owner-qa-sdk-native.test.mjs: ajustar únicamente assertions métricas por lecturas nuevas medidas, sin quitar casos/gates/plazos.
+Ningún otro archivo por inferencia; ampliar mapa vuelve a root.
+
+## APIs fuente exactas
+
+Wire:
+- finiteOwnerNoticeGetTarget='https://afw-private.invalid/_finite-owner/monitoring';
+- qualifyFiniteOwnerNoticeGetRequest(request,bytes)→frozen {method:'GET',url};
+- readFiniteOwnerNoticeGetMetadata(headers)→frozen {boundary,method:'GET',url,mVersionId,requestId}.
+Reusar finiteNativeOrigin/Actor/Headers/PreservedHeaders/Uuid/Pending/Bytes/Operation. No redefinir origen/actor ni aceptar destino por parámetro. Header metadata exactamente las cinco claves x-afw-finite existentes, JSON boundary canónico, max16384bytes. Original URL exacta finiteNativeOrigin+'/monitoring', sin query/hash/userinfo; método GET y body0. Origin ausente o igual al origen; si presente distinto niega. Cookies/assertion<=8192 y sin CR/LF; nombres cookie sin duplicados/malformaciones. No opciones de identidad/decisión/sequence/grant en URL/body/headers.
+
+Forward:
+forwardPrivateFiniteOwnerNoticeGet({request,env,ctx},originalLease)→Promise<Response>.
+Mismo patrón OAuth, root request context genuino; AFW_FINITE_TRIAL_CONTROL por idFromName(finiteNativeActor), actorhex64, fetch, AFW_FINITE_TRIAL_VERSION UUID y holders estables. Verificar grammar antes de enviar; sobrescribir todas las metadata, jamás preservar x-afw-finite del navegador. Request privado POST con original-method GET, body vacío, original signal/deadline y redirect manual. Retener fetch/body/cancel reales. Sólo respuesta200 HTML elegible; demás mapping a finiteNativePending con statuses seguros existentes. Allowlist de headers igual OAuth; no callbacks, token DTO o host configurable.
+
+Receiver:
+createPrivateQaFiniteOwnerNoticeGetReceiver({ctx,env})→frozen {fetch(request)→Promise<Response>}.
+Sólo Request, target exacto y método de transporte POST. read metadata, createFiniteOwnerForwardedRequestLease, invocar handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},parent.lease), finally finish. URL incorrecta404/método405, fallos saneados. Receptor jamás crea autoridad desde boundary, metadata o versión; handler verifica fuente real.
+
+Handler nuevo exportado en phase-context:
+handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease)→Promise<Response>.
+Sólo parámetros indicados; no par/frame/source/identity/policy/current/now/keySet/allowPending. Conserva observeOwnerPhasePair PRIVATE. No exportar helper lector nuevo ni objetos-capacidad. El nuevo export es una entrada fixed Request que aplica controles completos, no constructor de hechos.
+
+## Inventario y schema dentro de observeOwnerPhasePair
+
+facts() llama createFinitePreparationNoticeJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},childLease) bajo child/retain/holders. Usa interfaz6filas aceptada por root, no caller DTO. Añadir f.notice y el mismo objeto canónico a f.anchor.notice; en snapshot.records.notice=f.notice. No eliminar/enmascarar ninguna otra celda ni desdoblar snapshots. Sólo prefijo propio de preconnection y UUID grant original: filas/prefijos ajenos no se cuentan ni se cambian.
+
+Añadir selectAll(sql,args,cap) PRIVATE, sólo usado por tres sentencias fuente fijas abajo. Nueva first-primary por consulta; preparar/bind/all como PRIMERA sentencia, retener Promise completa, verificar holder/métodos después de await, Array.isArray(results), length<=cap y own detached de filas. No callbacks ni SQL recibido de APIs. No reutilizar sesión de preflight. Mantener select original byte/conducta; ninguna lectura paralela nueva fuera del fanout existente.
+
+noticePrimary(f,data,issuerFacts) PRIVATE dentro del observer retorna {schema,tickets,events}:
+- schemaQuery: SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8; cap8. Ocho filas o cualquier cardinalidad1..6 niega. Cero→schema=null, tickets/events=[]; sólo válido con journal vacío. No suponer tablas ausentes a partir de error.
+- Siete filas→schema={objects:rows}; fields exactos type/name/tbl_name/sql; comparar cada definición FINITE_PREPARATION_MONITORING_SCHEMA usando mismo parser de type/name/table y normalización de whitespace/semicolon/CREATE IF NOT EXISTS del store. Extra objeto, SQL diferente, constraint/trigger/índice faltante niega. Snapshot conserva SQL real (normalización sólo compara, no borra diferencias entre snapshots).
+- Si no issuer.reservation.identity: journal debe estar vacío; no consultar filas por un grant inventado; devolver tablas completas/tickets/events vacíos. Historia de otros grants no se enumera.
+- Si existe identity y schema completo: SELECT las14 columnas TicketRow explícitas FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2; cap2. Parámetro SIEMPRE identity.grantId original. >=2 niega.
+- SELECT las12 columnas ConsentRow explícitas FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3; cap3. Cualquier fila niega este slice; nunca seguir sobre subconjunto. Consulta completa de campos para detectar una transición material, no contador prefabricado.
+No SELECT *; nombres exactos del spec store (TicketRow14/ConsentRow12). No nuevo esquema ni PRAGMA aquí: full SQL idéntico califica estructura; INSERT mantiene preflight completo store incluyendo PRAGMA. Ausencia total permite reader viejo; GET exige siete objetos ANTES de appendReservation/appendSend. Nunca consumir journal para que el INSERT descubra schema ausente. Carrera schema tras última lectura sigue posible: store niega y SEND puede quedar consumido; no atomicidad global/repair/retry.
+
+Llamar noticePrimary después de issuerPrimary y correlaciones SDK de qualify; devolver noticeFacts y añadir snapshot.noticeRows=noticeFacts. Así igualdad canónica first/second incluye journal, schema, ticket y eventos además de todos los hechos previos. Nueva fuente sourceBase jamás se deriva de notices.
+
+## Predicados de noticePrimary
+
+Journal vacío significa reservation/freeze y ambos pares send/ack null, forma exacta validada por journal. Si hay tickets sin reservation: negar. Si no hay reservation, todos tickets/events vacíos; no reconstruir raíz desde SQL. Cualquier freeze o consent.send/ack niega esta unidad aun válido para codec; no lo convertir en permiso ni limpiar.
+
+Reservation requiere issuer.reservation, grant ACK applied, grant real activo, AuthorizationLink, GrantLink, relation, ConnectionRef, preconnection y SDK root/begin/approve/complete observados completos. Comparar:
+- canonical(r.identity)===canonical(issuer.reservation.identity);
+- r.issuerReservationHash===issuer.reservation.recordHash, r.originalGrantAckHash===issuer.operations.grant.ack.recordHash;
+- r.grantLinkHash===prepHash('GrantLink',issuerFacts.grantLink), r.connectionHash===prepHash('ConnectionRef',issuerFacts.connection);
+- r.expectedGrant=== {scopes:JSON.parse(currentGrant.scopes_json),createdAt:currentGrant.created_at,expiresAt:currentGrant.expires_at}, exact canonical;
+- r.consumedAt===issuerFacts.consent.consumed_at;
+- r.preconnectionExpiresAt===data.preconnection.expiresAt; r.accessExpiresAt<=min(data.preconnection.owner.accessExpiresAt,identity.C0), r.accessExpiresAt>r.issuedAt. No comparar con un JWT recuperado de storage;
+- r.issuedAt y Send/Ack históricos <=Date.now(); ticket expiry<=min(r.accessExpiresAt,r.preconnectionExpiresAt,data.approval.expiresAt,ConnectionRef.expiresAt,C0,consent/grant expiry). En esta lectura en curso Date.now()<ticket.permissionExpiresAt; clock.narrow a ese mínimo original.
+Journal ya valida sus propios hashes/orden/ventana/fields. Correlacionar de nuevo hechos reales sin reimplementar su codec.
+
+Fila ticket esperada deriva de r.identity y r.ticket exactamente como expectedTicket del store: subject/grant/project/client/resource/revision de identity, purpose='afw.dossier-monitoring-owner.v1', action='grant', hash/requestId/sequence/times del ticket. Comparar las14 columnas y tipos; ni forma ni hash bastan.
+- Sin ticket.send: tickets debe estar vacío.
+- Con ticket.send y sin ACK: tickets puede estar vacío o ser esa fila exacta. Es un hecho privado, NO admisión.
+- ACK applied: una fila exacta, rowHash===initialHash('afw.finite-preparation-notice-row.v1',fila) y sequence===null.
+- ACK no_mutation: tickets vacío, rowHash/sequence null. Cierre, nunca replay.
+Resultado contradicho o fila de otra solicitud del mismo grant niega. No tolerar un evento de consentimiento aunque el ticket sea correcto.
+
+## Cierre de lectores actuales
+
+qualifySettledOwnerPair niega cualquier contenido notice o ticket/evento de cada snapshot. Schema completo vacío NO es contenido notice; esquema ausente tampoco. Por tanto readPrivateQaFiniteOwnerContext conserva exactamente {source,preconnectionId,capsuleHash} y la fase closed_ui/read_consent existente en vacío. Sin fields nuevos públicos ni rama notices.
+
+El recheckOwned de OAuth exige notice vacío en ambos snapshots y sigue sus checks originales issuer/SDK pending. Su expected ya incluye notice/noticeRows vacíos; no actualiza esas celdas. No permitir que OAuth acepte un SEND ticket sólo porque sea válido para observer. Otros consumidores no obtienen excepción.
+
+## Handler GET: confianza y tiempos
+
+En observeFiniteOwnerRequestWork + finiteNativeOperation reales, capturar holders del patrón OAuth (request/headers/ctx/env/DB/alias/source bindings/version/fetch) antes de await. Usar createFiniteInitialLease con readFiniteOwnerRequestDeadline original y narrowing, sin crear budget desde Date.now. Reconstruir original GET desde metadata y bytes0; cualificar grammar.
+
+baseline=observeOwnerPhasePair({ctx,env,parent:originalLease}); qualifySettledOwnerPair(baseline) exige vacío. Requerir phase read_consent, Mversion===source.currentPublication.versionId, schema completo y cadena original grant+SDK completada. Source/actor/QA/realm/project provienen de baseline real, nunca del request. Exigir eventos0/tickets0, no cookie __Host-afw-monitoring-owner previa: no refresh/reissue.
+
+Verificar verifyCloudflareAccessJwtWithExpiry usando Cf-Access-Jwt-Assertion original y source.access.{teamDomain,audience}; firma/issuer/aud/subject/expiry del mismo payload. Sin accessVerifier/keySet/now configurables. Cookie __Host-afw-finite-prepare única con gramática y hash original. qualifyFiniteOwnerApprovedTicket sobre ticket/use/pre/approval/sourceSnapshot originales, realm/subjectHash existentes. Subject===material.ownerSelection.subject===issuer identity.subject y realm original; GrantLink/ConnectionRef actuales ya correlacionados. GET expresa solicitud de formulario, no decisión de avisos.
+
+accessExpiresAt=min(identity verificada.expiresAt,pre.owner.accessExpiresAt,C0); preconnectionExpiresAt=pre.expiresAt. Narrow padre también por pre/approval/ConnectionRef/consent/grant/Access. at=Date.now real; handle=randomBytes(32).toString('base64url'), requestId=crypto.randomUUID(); ticket.issuedAt=at,expectedSequence=0; ticket.expiresAt=ticket.permissionExpiresAt=min(at+600000,todos los techos anteriores). Si mínimo<=at, negar. Duración del permiso propuesto puede superar5000ms; no usar child.deadline como ticket expiry. Sólo handleHash y UUID al journal, nunca JWT/cookie/handle bruto/email.
+
+Reservation exacta del contrato con hashes originales, Common y ticket; issuedAt=Date.now posterior a at. No nueva identity, grant, ACK histórico o conexión. expected=structuredClone(baseline.second), nunca se retorna/pasa como parámetro externo.
+
+## Máquina léxica propia y rechecks
+
+Variables privadas: position, operation, actualPromise, actualResult, settled, activeChild; actualPromise/actualResult/settled pertenecen exclusivamente al INSERT SQL, no se sobrescriben al esperar el journal. Cada append usa su propia Promise retenida local y su resultado; se conservan referencias locales ownedReservation/ownedSend a los records creados por este handler; no globals/WeakMap de autoridad ni objeto de opción. recheckNoticeGetOwned() cierre sin argumentos:
+1. check holders/lease/identity expiry.
+2. Si hay actualPromise pendiente (!settled), negar; nunca lanzar lectura para inferir su resultado.
+3. Issuer/SDK deben seguir completos/sin pending original. Notice consent/freeze ausentes.
+4. position determina la única excepción propia; comprobar que el SEND es el mismo objeto/recordHash producido en esta invocación y recién reconocido, no leído de journal ajeno. Si position exige resultado, exigir actualPromise real, settled y actualResult.
+5. await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id})); wait usa clock.wait con activeChild cuando existe y guards antes/después, como OAuth. Ambos snapshots deben ser canónicamente iguales a expected ENTERO. No comparar sólo partes/omitir timestamps/masking. No llamar qualifySettledOwnerPair después de la primera escritura propia: su cierre público sigue deliberado.
+
+Secuencia exacta:
+- baseline y recheckNoticeGetOwned con expected vacío.
+- En child propia: retener appendReservation real; exigir status recorded y hash exacto; después de settle actualizar únicamente expected.records.notice.reservation y expected.anchor.notice; position='reservation-recorded'; recheck completo. existing/uncertain/fallo termina503 sin SQL.
+- Child ticket única: window.startedAt=Date.now al entrar; deadline=min(child original, todos los techos), duración<=5000. SEND exacto con Common/window de esta child, decisionHash=null. Retener appendSend; sólo recorded del journal→actualizar expected notice.send/anchor; position='ticket-send-recorded'; recheck completo con expected.tickets=[].
+- Tras check emitir UNA insertMonitoringTicket({...Common,ticket},activeChild) en la MISMA instancia store, guardar su Promise REAL antes de cualquier race; position='ticket-sql-pending', settled=false. No hay recheck durante pendiente.
+- Al resolver: actualResult es ese resultado nativo; settled=true; exigir status applied y14 columnas exactas; cualquier no_mutation/error termina503 sin ACK ni formulario. Actualizar expected.noticeRows.tickets=[structuredClone(actualResult.row)]; position='ticket-sql-resolved'; recheck completo acepta exclusivamente este SEND propio con el resultado real en stack. El status no_mutation del store no se convierte en éxito del flujo.
+- Dentro de misma child: construir ACK applied exclusivamente desde actualResult.row real, sequence=null y rowHash exacto; observedAt real<Send.deadline. Retener appendAck con variable distinta sin reemplazar la referencia SQL; require recorded; actualizar únicamente expected notice.ack/anchor; position='ticket-ack-recorded'; recheck completo. Después cerrar child, comprobar lease/identity original inmediatamente antes de construir/retornar pagina200.
+No llamada del journal ni del store recibe expected/position/result como autoridad. La referencia a SEND propio no viaja por HTTP. Persistir ACK no permite limpiar actualPromise antes del recheck final. Ante excepción no reconstruir ACK, reintentar INSERT, freeze automático ni cleanup; historial puede quedar parcial.
+
+Reservation y ticket SEND sin ACK causados por pérdida entre pasos cierran futuras solicitudes. Un GET ajeno no puede “continuar” la reserva. Dos GET concurrentes: scope original/exclusión de instancia más journal append-once; sólo uno recorded puede emitir SQL. No inferir exclusión global del pending privado del journal; statement SQL/cerca original decide carrera nativa.
+
+## Página y contrato cerrado de POST
+
+200 HTML UTF8/no-store, Referrer-Policy same-origin, nosniff, CSP nonce con default-src none; frame-ancestors none; base-uri none; form-action 'none'. Título 'Preparación de avisos'; texto exacto 'Preparé un formulario temporal. Todavía no diste permiso para avisos. El envío de este formulario aún no está habilitado.' Formulario con hidden handle (escapeado), botón disabled 'Permitir avisos temporales'; no action activa ni JavaScript/envío automático. Enlace fijo a https://agentfriendlyweb.dev/expediente.
+Cookie __Host-afw-monitoring-owner=handle; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=floor((ticket.expiresAt-Date.now())/1000), exigir>=1. No devolver IDs grant/subject/row/journal/source ni detalles internos.
+POST humano a /monitoring, /monitoring/grant o /monitoring/revoke se niega antes de cualquier journal/SQL, sin fallback ordinario. La existencia de esta página SOURCE no autoriza mount aislado ni acredita funcionalidad completa.
+
+## Costo, retención y aceptación
+
+Añadir una list journal por snapshot, una schema SELECT por snapshot, y dos SELECT por identity/schema completos. Par vacío schema ausente: +2DO list/+2D1; par con schema+identity: +2DO list/+6D1. Cada snapshot sigue todos los controles previos; journal.read es un list limit7, no seis gets separados. No alterar fanout credentials/QA/M, peak2, allSettled, body/cancel ni orden entre snapshots.
+
+Medir totals por baseline/reservation/SEND/SQL/ACK, D1first/all por nueva sesión, queries preflight aparte, DO list/transactions/sync/get y HTTP GET reales. No transferir98D1/112GET a este flujo. Cada recheck completo conserva dos snapshots; ni count inflado/omitido ni presupuesto ampliado. Padre30s e hija5s son aceptación real, incluida cola; No reejecutar50ms fanout sólo para recabar números si scheduler no cambia; usar control0 existente y nuevo GET con tiempos reales. Un fallo de presupuesto obliga volver a root, no relajar garantía. Failure técnico no se “corrige” alargando ventanas.
+
+Capturar graph/metafile/hash/bytes de bundles QA/M con perfiles existentes; phase importa notice journal, por lo que graph sí cambia. Root decide en preflight qué compilador estándar adicional corresponde al reachability real. No build/runtime local ni permisos de CI inferidos. stage-work retiene operación/fetch/body/cancel reales; unknownACK/abort no acreditan drain ni permiten restore.
+
+GREEN requiere GET real por los nuevos módulos y D1/DO reales, Access SYN firmado verificado (no verifier mock), issuer original emitido por QA real, y actual token/MCP original antes del GET como regresión D0.4. Provider/installed history siguen SYN rotulados como en harness existente, no source factory positivo ni mock de snapshot. RED causal tras esos prerequisitos y antes de ticket/ACK ausentes; import/bundle/schema error no vale.
+
+Regresiones seleccionadas por diff: phase-context vacío/settled/unknown/schema/owner; QA SDK GET/POST real, binding-cookie, drift y control fanout0; D0.4 actual exchange→read y drift de exchanged_at/owner. Reusar aceptación fijada de store/journal intactos; nuevo GET ejerce sus APIs reales. Comandos/casos exactos en plan. No repetir50ms, allSDK, full suite o builds sólo para métricas. Retener rollback de código; nunca DELETE filas históricas o alterar schema real. Después siguen POST real con CSRF/decisión original, source/NoticeLink/stages, reducción/drain/cleanup y mount/hosting separados.
+
+## Pasos y casos de ejecución
+
+- [ ] **1. Preflight y preservación.** Root entrega BASE/tree exactos, rama aislada writer, accepted store/journal refs y alcance cloud. Verificar bytes/interfaces sin seguir ramas ajenas. Guardar diff base, hashes de store/journal/source stubs/Mordinario/SDK y fixtures afectados. Root fija autorización del qualifier temporal (si lo hubiera), contents:read/sin secretos, rollback por CAS y compilador estándar adicional según graph. No inferir permisos de este plan.
+
+- [ ] **2. RED factual sobre comportamiento existente.** En nuevo native test, reutilizar initialEntryHarness modo nuevo opt-in para emitir grant por OAuth GET/POST reales. Instalar siete DDL sólo en fixture explícita. Confirmar reader original3keys/read_consent y SQL/grant actual. Añadir por fixture un registro unknown al prefijo notice PROPIO o ticket SQL ordinario etiquetado NEGATIVE para UUID original, sin alterar grant/owner. Exigir que readPrivateQaFiniteOwnerContext devuelva unavailable. BASE lo ignora y devuelve contexto: RED causal. Caso distinto de proyecto/grant queda sin cambios y reader continúa. No presentar semilla negativa como productor finite ni saltar prerequisitos.
+
+- [ ] **3. Implementar inventario privado y cierre de lectores.** En phase-context añadir journal.read por snapshot, selectAll privado fresh-primary, schema/tickets/events queries exactas y noticePrimary/correlaciones. Mantener facts/primary/qualify/igualdad completa y fanout; schema ausente total compatible con notice vacío, parcial/tamper niega. qualifySettledOwnerPair y OAuthrecheck niegan cualquier notice/ticket/evento original. Ejecutar los nuevos casos de inventario y positivos vacíos; no cambiar sourceBase/phase. No insertar tolerancia parametrizable.
+
+- [ ] **4. RED del GET con prerequisitos reales.** Fixture routing opt-in M/QA a nuevas interfaces fuente; si los módulos aún no existen, usar stubs exportados unavailable exclusivamente para que bundle cargue, identificados como scaffolding. Grant real original, Access SYN firmado verificable, prepare cookie y source/pins correctos deben estar listos ANTES del GET. Requerir200, un ticket nativo y reservation/ticket:send/ticket:ack; la ausencia de GET falla con503/404 y0ticket. Error de import/bundle/schema/fixture o expiración antes del gate no es RED. Guardar una sola evidencia causal válida, no iterar fallos artificiales.
+
+- [ ] **5. Implementar wire/forward/QA.** Signatures/URLs/grammar exactos de spec; sólo GET humano/body0, metadata sobrescrita, mismo actor/binding/version, request lease original, retención fetch/body/cancel. M no ejecuta SQL ni forward post-ACK ordinario. Receptor crea lease del Request reenviado y llama handler; no opción pública de bypass. Fixture añade route sólo en modo noticeGet=true; producción permanece sin mount.
+
+- [ ] **6. Implementar handler y máquina léxica.** Baseline completo vacío; schema READY antes de cualquier escritura; Access firma/issuer/audience/expiry real, preparecookie/approved-ticket/owner/GrantLink/ConnectionRef. Generar único handle/UUID y tiempos min originales. Guardar expected privado; appendReservation recorded→actualizar sólo notice/anchor→recheck. Child única de ticket: SEND recorded→recheck0fila→SQL Promise REAL→applied exacto→recheck1fila→ACK real recorded→recheck íntegro. actualPromise/actualResult SQL no se sobrescriben con resultados journal. No_mutation/error/uncertain/existing termina503 sin nuevos efectos; no reintentar ni reconstruir desde SELECT. Sólo200 final con formulario disabled/cookie/restricciones exactos; no POSTconsent.
+
+- [ ] **7. GREEN integrado y adversariales mínimos.** Nuevos casos nativos, sin snapshot/identity verifier/product API mock:
+  - **GET acknowledged original:** actual QAcode→Mtoken→MCP original→D0.4 reader3keys antes de GET; JWT SYN firmado. GET nuevo real devuelve200; ticket14campos exactos, tres rows journal con hashes/ACK correctos, eventos0, grant y exchanged_at/issuerACK originales intactos; HTMLdisabled/noJS/CSPform-action none/cookieStrict. Reader público después unavailable, no new phase.
+  - **Empty compatibility:** schema ausente y completo-vacío, ambosreader3keys; GETausente/schema parcial niega ANTES reservation/SEND, contadores0. Índice/trigger/objeto extra SQL niega. Otro UUID/preconnection con historia no afecta y permanece byte/fila idéntica.
+  - **Grammar and person:** methodPOST, foreignURL/query/body/metadata/cookie duplicada, invalidsignature/wrongsubject/wrongaudience, missingpreparecookie y Access que vence durante GET antes de reservation: ninguna mutación. CurrentAccess longer no cambia expiry original; expiry más corta aún válida produce ticket clampado, porque GET no acepta ticket propuesto por caller.
+  - **Own transition / no bearer:** gate real tras SEND antes de INSERT y después de INSERT committed antes de liberar resultado. Reader público y segundoGET niegan; después de liberar original dentro de plazo, sólo continuación dueña puede ACK. Test no llama handler con expected/allowPending ni exporta pair.
+  - **Inventory/correlation:** unknownkey/overflow, ACK sinSEND, rowhashincorrecto, identidad/GrantLink/ConnectionRef incoherentes; fila real sinjournal, SEND ajeno, ticket diferente mismoUUID, cualquier consent evento: denegar. Manipulaciones negativas rotuladasSYN.
+  - **Drift two snapshots:** gates antes de segunda observación; cambiar owner/revision, pointer/version o exchanged_at canónico distinto y un journal/ticket propio. Snapshot conserva fila actual; no resolver por normalizar exchanged_at. Si ticket UPDATE requiere retirar trigger, sólo SYNdestructivo después de primer snapshot y se reporta como corrupción, nunca operación legítima.
+  - **UnknownACK:** retorno journal perdido tras commit/sync/readback→no siguienteSQL; retorno SQL perdido después de commit→ticket presente, SEND sinACK,503; repeatGET no amplía rows/fecha ni devuelve handle. Freeze intercalado bloquea ACK; conservar evidencia, sin rollbackdeD1.
+  - **Queue/expiry/CLOSE:** gate antes de ejecutar INSERT; atravesar ventana real5s o CLOSE original previo a liberar→cero ticket/ACK. Ticketgana→CLOSE no borra ticket ni revoca grant; usar reducción original sólo en fixture y conservar historia. Sin nuevo presupuesto ni Date patch; assert gate alcanzado antes de expiry.
+  - **Retention:** retener SQL/body/cancel reales tras abort; scope externo stage-work bloquea otro ingreso del mismo ctx con leaseSYN vigente dentro del deadlineoriginal hasta settle; nunca atribuirlo al pendingSet de journal ni declarar drain entre RPCs.
+  Registrar schema7/DOlimit7/ticketlimit2/eventlimit3 y consultas exactas, sin imprimir valores privados/handle/JWT.
+
+- [ ] **8. Medir y comprobar presupuestos sin investigación redundante.** En el mismo GREEN capturar fases baseline/reservation/SEND/SQL/ACK, snapshots, sesiones first-primary y consultas first/all, DOops, HTTPcantidad/peak/tiempos, SQLgate y realresolution. Cada consulta factual primera de una sesión nueva; ningún eventlookupglobal. Distinguir queries preflight versus noticeSchema. Medir GETQA completion antes del deadlinechild en positivo y padre<=30s; no renovar para obtenerGREEN. El fanout original conserva scheduler/peak2 y orden. Nuevo IOobserver no altera guards/returns/resultados; markers originales únicos o restringidos lexicalmente al bloque correspondiente. No ejecutar50ms/allSDK sólo para nuevos números.
+
+- [ ] **9. Checks proporcionales en cloud autorizado.**
+  1. node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
+  2. node --test test/mcp-qa-finite-owner-phase-context.test.mjs
+  3. node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
+  4. node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+  5. node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+  6. ESLint dirigido a los diez archivos con herramienta existente; QA/M compilan realmente dentro del harness, conservar metafiles/hash/bytes/perfiles y comparar graph. Compilador estándar adicional sólo conforme preflightroot de paso1.
+  Reusar GREEN aceptados store/journal si sus blobs siguen exactos; el nuevo test ejerce APIs reales. Contar casos seleccionados/no seleccionados, no anunciar0SKIP de toda la suite usando filtros. Una vez pasan, ampliar sólo por defecto, graph/fixture adicional o gate requerido por root. Preservar50ms accepted como evidencia anterior separada, no como resultado de esteHEAD.
+
+- [ ] **10. Checkpoint y revisión.** Commit único de unidad o checkpoints propios permitidos, diff exactoBASE..HEAD y rollbackCAS. Informe con RED/GREENruns/head, conteos reales, schema/queries/source3keys/GETclosedPOST y costo de graph; qualifier temporal retirado si root lo autorizó. Root spec+quality y workflowSDD; writer no crea helpers/reviewers. No cambios de source/public flags por pasar tests. Pendientes restantes quedan expresos, no nuevos PR/merge/main.
+
+
+## Entrega, revisión y límites
+
+Status DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED; reportcompleto enpatharriba, BASE/codeHEAD/reportHEAD/tree/archivosblobs, RED1/RED2/GREENexactheads/runs/jobs/attempts/commands/counts/fail/skip/lint/warnings, nativevsSYN, costosquery/list/get/txn/body/fetch/cancel, sesionesfreshprimary, principalbudget5s/30s, compileractualcounts/hash/inputs/metafile, protecciónstore/journal/SDK/Mordinario/source stub/DDL ycorrectoreplay/unknownACK/owncontinuation/factualempty. No afirmarfit remoto desdefixture. No repetirparaobtenerhashes o métricas. Finalrootstatus+SHAs+una líneatests+concerns; rootfullBASEdiff+freshspecqualityreview. Enviarrun/jobterminalesdurantelaborpara lectura primaria sin esperarreport. No siguienteunidad.
+
+MinorD03precisiónOAutherror/fanoutcleanup/toolchainwarningstriagefinal; nofixesporarrastre. DespuésfaltanPOSThumano/CSRF/NoticeLink/stages/terceroCLOSED/ownSEND/fullsetup/cleanup/guard/ARM/hosting/PCoff. operationalReadiness=false;completePackage=false;PCoff=false. UnaaceptaciónSOURCEjamáslosactiva.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-native-notice-provenance.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-native-notice-provenance.md b/docs/superpowers/briefs/2026-11-05-finite-native-notice-provenance.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-native-notice-provenance.md
@@ -0,0 +1,131 @@
+# Task brief — finite native notice provenance journal
+
+Preparado porroot5nov2026, aún INACTIVE hasta despacho explícito con BASE futuro y storefix1 aceptado. READ FIRSTeste archivo como requisitos completos; no leer todo historial/plan. Unidad es journal-only y no un segundo receptor ni API. Rama futura producto feat/finite-native-cleanup-20261101; repos tokenizartinfo-ops/agent-friendly-web(1347578006 PUBLIC). Campo exacto BASE/tree se entrega por mensaje después de readback, nunca usar pininspección7a2/docs39ba/6d13 como producto.
+
+PROJECT=AFW; ENVIRONMENT=GitHub source/Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE isolatedbranch; ALLOWED_ACTION5filesnuevos+informe+qualifier temporal autorizado; ROLLBACK sólo commits propios expectedheadCAS, no borrarjournalsD1 ni datosajenos. Ninguna sourceevidencia autentica humano, permitegrantreal, runtime o PCoff.
+
+## Rulings vinculantes de root
+
+Preflight compañero reviews/2026-11-05-finite-native-notice-provenance-preflight.es.md. Unicoimplementerfresco SDD, sin subagentes/reviewerpropio. Capturedcontext.wait ya hace retain original, no existe c.retain. Su Setpending privado no serializa métodos; prueba de nuevaentrada denegada debe usar observerSYNexterno real outstanding.has(ctx), segunda leaseSYN vigente/distinta dentro deadlineoriginal, no reutilizarleaseabortada. No inventar guarda/autoridad/drain de journal.
+
+CausalRED puede usar andamiaje temporal sólo en nuevo journal que lance error genérico en conducta ausente, tras grantnativo real; jamás fakefila/resultado/store/source/SDK ni fallobundleimport. Sustituir completamente enGREEN. Tests contexto consent-sinACK van enjournal, no exigirlos a codec sinReservation. Seal sigue patrón issuerpurpose/canonicalhash; no autoridad desde campos. DocspendienteNOTE 'storepropuesto' se reemplaza sólo por futuroaceptación de root, sin retocar store.
+
+Cualificación: nuevo codec+nativo completos y lint5files. NO repetir147store/33issuer/SDK/fanout/estándar con cincofilesaditivos/noimportedgeexistente. El nuevo nativo compone storeaceptado real. Qualifier temporal de rama/pathscontents:read sinsecretos/checkoutpersistfalse permitido, npmci --ignore-scripts --no-audit --no-fund sólocloud; retirarf inal. Ningúnclone/deps/build/tests local ni permanentCI/credenciales/provider.
+
+Fuente2026-11-03T02:59Z vencida; C0=I0+900000,C1=C0+180000,padre<=30000,hija<=5000 sinrelojinyectado/rearm/renew. MinorpreviosD03/fanout/herramientas siguen ledgerdetriagefinal, nofixesporarrastre.
+
+## Contrato exacto de la unidad
+
+## Archivos únicos de la futura unidad
+
+Crear lib/mcp-qa-finite-preparation-notice-records.mjs (DATA), lib/mcp-qa-finite-preparation-notice-journal.mjs (DO), test/mcp-qa-finite-preparation-notice-provenance.test.mjs (codec), test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs y test/fixtures/finite-preparation-notice-provenance-worker.mjs (composición SYN).
+
+No modificar módulos existentes ni sus tests/fixtures. La nueva fixture usa exports públicos del store aceptado y constantes SQL existentes; no duplica lógica del producto ni prefija el grant positivo. DDL sólo en fixture; ninguna migración.
+
+Patrón de referencia: issuer-records blob50f9a013580a46ad1d445a240f47b7b2ce887d49; issuer-journal blob414450aa08f797bed5a41cf5cc697342785ce16b; fixture issuer blob0588897cc3fe29618ffaea1946e76896ade479d1. Reusar initialOwn/Fields/Canonical/Hash y validateFinitePreparationIssuerIdentity, issuerTime/Uuid/Iso/Scopes; no alterar sus semánticas. captureFinitePreparationIssuerContext({ctx,env}) aporta holders/leaseGuard/wait/transaction/sync/readback; no autentica negocio.
+
+## Esquema exacto
+
+Exportar FINITE_PREPARATION_NOTICE_PREFIX='afw.finite-preparation-notice.v1:' y FINITE_PREPARATION_NOTICE_OPERATIONS=Object.freeze(['ticket','consent']). Claves: prefix+preconnectionId+':' seguido por reservation, ticket:send, ticket:ack, consent:send, consent:ack, freeze. list limit7; >6, suffix extra, registro no canónico, huérfano o binding incoherente: error genérico. Inventario nunca ignora claves desconocidas.
+
+Tipos hex64 minúsculo, UUID/ISO/time usan validadores issuer. Cada record tiene purpose exacto 'afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1' y recordHash=initialHash(purpose,campos sin recordHash). own/fields rechazan accessors, símbolos, prototipos, extras, sparse arrays, límites existentes antes de canonical; máximo16384bytes UTF8 por registro. encode valida/canoniza; decode exige raw===canonical(validado). Objetos devueltos detached y deep-frozen. Errores no incluyen payload, SQL, subject ni hashes.
+
+Reservation campos exactos (además purpose/recordHash):
+- identity: identidad issuer ORIGINAL íntegra validada, incluido identityHash;
+- issuerReservationHash, originalGrantAckHash, grantLinkHash, connectionHash: hex64. Último es hashFinitePreparationRecord('ConnectionRef',fila real original). Los anteriores son recordHash de issuer Reservation, issuer grant Ack y hashFinitePreparationRecord('GrantLink',fila real). No referencias nuevas ni grantHash alternativo;
+- expectedGrant: exactamente {scopes,createdAt,expiresAt}; issuerScopes; ISO canónicos; scopes subconjunto ordenado de identity.requestedScopes; createdAt>=consumedAt, expiresAt>createdAt y <=min(C0,consentExpiresAt,preconnectionExpiresAt);
+- consumedAt: ISO original, >=identity.reservedAt y <=expectedGrant.createdAt;
+- accessExpiresAt, preconnectionExpiresAt: issuerTime; ambos >issuedAt; accessExpiresAt<=preconnectionExpiresAt no se exige (son techos independientes), ambos se clampan por el receptor y no renuevan autoridad original;
+- ticket: exactamente {handleHash,requestId,expectedSequence,issuedAt,expiresAt,permissionExpiresAt}; hex64/UUID; expectedSequence===0; tiempos issuerTime; issuedAt>=max(identity.reservedAt,parse(createdAt),parse(consumedAt)); issuedAt<permissionExpiresAt<=expiresAt; expiresAt-issuedAt<=600000; expiresAt<=min(C0,parse(consentExpiresAt),parse(expectedGrant.expiresAt),accessExpiresAt,preconnectionExpiresAt);
+- issuedAt: issuerTime, >=ticket.issuedAt y <ticket.permissionExpiresAt. La reserva se crea después de generar ticket DATA y antes de ticket SEND.
+
+Send campos exactos: identityHash, reservationHash, operation, requestHash, accessExpiresAt, window, issuedAt, decisionHash.
+- operation ticket|consent; hashes hex64; window exactamente {startedAt,deadline}, issuerTime, 0<deadline-startedAt<=5000, startedAt>=reservation.issuedAt; issuedAt>=startedAt y <deadline.
+- deadline<=min(identity.C0,parse(identity.consentExpiresAt),parse(expectedGrant.expiresAt),accessExpiresAt,preconnectionExpiresAt,ticket.expiresAt,ticket.permissionExpiresAt). Ticket SQL nunca depende sólo de esa validación: el store revalida su propia cerca/reloj.
+- accessExpiresAt<=reservation.accessExpiresAt, >=ticket.expiresAt; ticket SEND exige igualdad con reservation.accessExpiresAt. Consent puede estrechar al Access POST verificado, nunca ampliar.
+- decisionHash===null para ticket. Para consent, hex64 igual a initialHash('afw.finite-preparation-notice-decision.v1',{identityHash,ticketRequestId:reservation.ticket.requestId,handleHash:reservation.ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt}). Es checksum de decisión, NO prueba de CSRF ni firma.
+- Common deriva de reservation con accessExpiresAt de Send y window de Send. requestHash=initialHash('afw.finite-preparation-notice-request.v1',{operation,common:Common,ticket:reservation.ticket,decisionHash}). No serializa testigo; representa campos esperados.
+
+Ack campos exactos: sendHash,outcome,rowHash,sequence,observedAt.
+- outcome applied|no_mutation; rowHash hex64 para applied y null para no_mutation; no_mutation exige sequence===null.
+- applied ticket exige sequence===null; applied consent exige entero seguro >0 realmente retornado, NO expectedSequence+1.
+- observedAt issuerTime, send.issuedAt<=observedAt<send.window.deadline. Sin ACK tardío reconstruido.
+- rowHash=initialHash('afw.finite-preparation-notice-row.v1',fila exacta retornada):14 columnas SQL de TicketRow o12 de ConsentRow del spec store. El codec sólo verifica formato, journal sólo correlaciona; fixture/futuro receptor contrastan hash de resultado real y fila primaria. Rowhash no autentica escritor.
+
+Freeze campos exactos: identityHash,reservationHash,frozenAt. frozenAt issuerTime, >=reservation.issuedAt y <identity.C1. Marca bloqueo irreversible de progresión; no reloj nuevo, cierre de SQL ni recibo de drain.
+
+No persistir JWT, email, cookies, handle bruto, código OAuth, token, proyección secreta, witness ni lease. subject en identity es DATA privado de QA, no publicable; fixture usa exclusivamente SYN.
+
+## API y semántica del journal
+
+Exports codec: sealFinitePreparationNoticeRecord(kind,input), encodeFinitePreparationNoticeRecord(kind,input), decodeFinitePreparationNoticeRecord(kind,raw); kind Reservation|Send|Ack|Freeze. Factories DATA públicas no emiten autoridad.
+
+createFinitePreparationNoticeJournal({ctx,env}) con campos exactos devuelve:
+- appendReservation(record,lease);
+- appendSend({preconnectionId,record},lease);
+- appendAck({preconnectionId,operation,record},lease);
+- freeze({preconnectionId,record},lease);
+- read({preconnectionId},lease).
+
+Mutadores devuelven frozen {status:'recorded'|'existing'|'uncertain',recordHash}. read devuelve frozen {reservation:null|Reservation,freeze:null|Freeze,operations:{ticket:{send:null|Send,ack:null|Ack},consent:{send:null|Send,ack:null|Ack}}}. No field de authority, ready, drain ni callable capability. Forma inválida o lectura corrupta lanza Error('Finite preparation notice unavailable'); fallos dentro de append tras preparación se convierten en uncertain, igual patrón issuer.
+
+Cada append: snapshot/encode antes de await; capturar holders+lease guard; transacción real con lectura exhaustiva, comparación de clave inmutable y put único; aguardar retorno final de transacción, storage.sync y get exacto/canonical decode. Retener todas las Promises reales mediante capture.wait/retain. Si algo falla no declarar no_mutation del store. Guardar mismo contexto/actor/version por referencia, identity.actorId===captured.actorId y identity.qaVersionId===captured.qa; sustitución o mutación de holders niega.
+
+Transiciones validadas en read y dentro de transacción:
+1. Sólo reservation puede iniciar. Sin ella ningún otro dato.
+2. ticket SEND requiere reserva, no freeze ni ticket SEND previo para nueva escritura.
+3. ticket ACK requiere ticket SEND correspondiente. outcome no_mutation bloquea consent.
+4. consent SEND requiere ticket ACK applied, no consent SEND previo ni freeze; issuedAt>=ticket ACK.observedAt; identidad/reserva coinciden. Cada Send requestHash/decisionHash se recalcula con reserva.
+5. consent ACK requiere consent SEND correspondiente. Todos los enlaces y tiempos se validan.
+6. freeze requiere reserva y sus hashes exactos; congela nuevos SEND y ACK. Permite existir junto a historia completa/incompleta; no fabrica resolución.
+7. Repetición byte-idéntica de clave existente devuelve existing aun congelado; nunca reemplaza. Divergencia devuelve uncertain sin put. ACK nuevo tras freeze no se escribe. Lectura de historia válida no niega sólo por freeze o por C0 vencido: lease actual sigue exigido y los tiempos históricos deben ser coherentes.
+
+Un SEND sin ACK bloquea el siguiente SEND. El productor fijo no lo borra al timeout ni lo completa leyendo D1. No_mutation terminal no permite segundo ticket ni decisión para la misma preconnection. El journal no intenta congelar automáticamente tras fallar: si no se pudo persistir Freeze, el SEND durable sigue siendo el bloqueo. Reservation sin ticket SEND puede quedar huérfana; un futuro GET no reconstruye handle ni continúa desde existing Reservation.
+
+Límite explícito: como issuer-journal, appendAck valida DATA/enlaces, no la ejecución de SQL. Por sí solo no distingue un ACK fabricado por un caller con acceso interno. La garantía de procedencia requiere el futuro handler fijo: sólo su continuación léxica con actualPromise realmente resuelta puede producir ACK; tras excepción/fin de lease no hay recuperación por fila. Ningún test journal-only afirmará autenticación del caller o rechazo criptográfico de un ACK inventado. Freeze sí bloquea un ACK nuevo de cualquier caller.
+
+No nuevos SELECT D1 en journal. No afirmar que el journal valida el grant ACK o la identidad humana: los hashes se contrastarán con el productor QA fijo descrito en informe. Otro caller puede crear DATA válida pero no obtiene permisos; ningún producto consume todavía esta API. El único futuro caller autorizado será el handler léxico del receptor QA que obtenga actor/source/owner/preconnection del par factual, verifique Access firmado y cookie/CSRF original antes de SEND. No opción allowPending, trustCaller, accessVerifier o approval:true.
+
+
+## Ejecución y casos obligatorios
+
+- [ ] **1. Fijar baseline y condiciones de trabajo.** Root entrega HEAD/tree/branch futura y evidencia de aceptación del store; writer comprueba los cinco paths ausentes y snapshots de módulos inmutables. Identificar Actions autorizado y rollback propio. Si el store aceptado difiere en firmas, volver a root antes de ampliar scope. No usar rama activa ajena ni instalar nada.
+
+- [ ] **2. Escribir tests causales antes de implementación.** Codec: reservation válida original, ticket SEND/ACK, consent SEND/ACK(sequence=17 con expectedSequence=0), freeze; exact round-trip. Mutaciones: extra/symbol/getter (contador0), proto/sparse/oversize, hash falso, ventana5001ms, C0/C1 incoherente, Access menor que ticket, consent sin ACK ticket, null/sequence incorrecta. Cada aserción expresa contrato, no copia el body del codec.
+
+- [ ] **3. Crear fixture nativa y RED primaria.** Reusar configuración Miniflare/workerd y patrón issuer fixture; setup SQL/grant nativo finaliza primero y se comprueba grant UUID original. Añadir sólo un stub exportado de la nueva factory que lance el error genérico para que el bundle cargue; no es implementación ni capacidad. Invocarlo sólo tras comprobar grant real: resultado saneado incluye reachedNativeGrant=true y el error de journal. La aserción principal exige journal reservation recorded y falla en esa conducta ausente; no aceptar fallo de bundle/import global, schema setup o timeout como RED. Registrar run/head, gate alcanzado y error concreto. La fixture todavía no implementa lógica de journal ni efectos simulados.
+
+- [ ] **4. Implementar codec según campos exactos.** Snapshot antes de await, estricto own/fields, hashes/domains y16384bytes; deep-freeze detached. Validate context-sensitive Send/Ack al leer journal, porque el codec aislado no tiene reservation. No “validar” autoridad humana a partir de hashes.
+
+- [ ] **5. Implementar journal.** Usar contexto issuer capturado y su retención sin modificaciones; transacción real con inventario limit7. Validar estructura/enlaces de todo inventario; si clave ya existe, comparar bytes y devolver existing antes de reglas de progresión que impedirían nueva escritura tras freeze. Para clave nueva aplicar transiciones de spec. Esperar retorno final, sync y readback exacto. Forma inválida lanza; fallo append después de preparar devuelve uncertain. No timer/retry/recovery/delete.
+
+- [ ] **6. Completar GREEN nativo significativo.** Casos y assertions obligatorios:
+  - grant/ticket/observación/consent reales y rowhash exactos; leer desde journal nuevo entre GET y POST; misma witness/store/child en observe+consent, MAX por grant0, sequence global17 o >1 realmente asignada (filas ajenas SYN preservadas).
+  - dos appendSend concurrentes iguales→statuses recorded/existing exactos; fixture emite SQL sólo para recorded; contador SQL de mutación1. Otro ticket/reservation conflictivo nunca reemplaza.
+  - freeze con o sin SEND/ACK preserva registros, niega todo nuevo SEND/ACK; replay byte-idéntico existing sin SQL.
+  - native transaction callback throw→0fila; final-return throw/sync loss/readback loss después de commit→fila real posible y uncertain, contador SQL no aumenta.
+  - actual SQL result throw después de commit→evento/ticket existe, SEND sin ACK; journal nuevo conserva SEND pendiente y niega consent SEND sin ticket ACK; fixture no reconstruye ACK desde SQL. No afirmar que appendAck autentica arbitrarios callers internos.
+  - Retención SYN externa: iniciar observeFiniteReadOnlyWork con ctx original y retener la Promise REAL de transaction/SQL; alcanzar el gate antes de abortar esa lease. Con el mismo ctx, intentar únicamente otro scope observer sin efectos usando una lease SYN distinta, comprobada vigente/no abortada y dentro del MISMO deadline original: debe rechazar por outstanding.has(ctx), no por reutilizar la lease abortada. Tras settle real de todas las Promises del scope original, el mismo observer sin efectos puede entrar si esa lease SYN aún sigue vigente. La exclusión pertenece a stage-work (lib/mcp-qa-finite-stage-work.mjs:8–23,54–62 @7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be, bloba89baeb2578856dadedf700f9d66e180eb09120e), NO al journal: captureFinitePreparationIssuerContext.wait sólo conserva pending privado y leaseGuard no lo consulta (lib/mcp-qa-finite-preparation-issuer-journal.mjs:14–23, blob414450aa08f797bed5a41cf5cc697342785ce16b). No usar esto como prueba de exclusión entre métodos journal, autorización de nueva lease o drain entre RPCs; no añadir guards/interfaces.
+  - clave extra/séptima fila/huérfano/metadata actor/version cambiada niegan. Capturar sin filtrar inventario desconocido.
+  - Access menor que ticket, ventanas/reloj fuera de límite y getter count0 no generan mutaciones.
+  Para pérdida SQL, fixture conserva pending y no llama appendAck desde lectura; la prueba demuestra que el protocolo fuente no hace replay, no que journal autentica al fixture.
+
+- [ ] **7. Ejecutar checks proporcionales en cloud autorizado.**
+  - node --test test/mcp-qa-finite-preparation-notice-provenance.test.mjs
+  - node --test test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
+  - node --test test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs
+  - Lint dirigido a los cinco archivos con ESLint ya instalado del repo.
+  Exigir0FAIL/0SKIP en nuevos casos; reportar cantidad/builds/run/head. Regresión store no debe afirmar enabled:false tras revokeGrant: autoridad real rechaza Monitoring authorization unavailable y conserva evento. No ejecutar esa prueba para modificar authority ni rehacer D0.4. Diff debe demostrar fase/M/SDK intactos, incluido exchanged_at actual y ACK histórico. Cualquier graph nuevo en producto requiere volver a root.
+
+- [ ] **8. Guardar checkpoint y revisión root.** Un commit propio de cinco archivos, informe breve con RED causal/GREEN nativo, diff BASE..HEAD y pendientes. Si root autoriza qualifier temporal contents:read sin secretos, retirarlo del diff final y registrar run/head; este plan no lo autoriza por sí mismo. Root revisa spec/quality y aplica workflow SDD vigente; writer no crea helpers/reviewer. No segundo writer simultáneo.
+
+- [ ] **9. Cerrar sólo esta unidad.** Entregar HEAD/tree/cinco paths/tests/limitaciones; no importar journal en runtime ni extender fase. Root puede aceptar SOURCE y seleccionar una siguiente unidad distinta. La aceptación no activa el receiver ni habilita API/humano/PC-off.
+
+
+## Overrides de cualificación a los pasos históricos
+
+Step7se limita a los dos NUEVOSarchivos de tests completos+lintcincofiles, conforme rulingproporcional anterior. Regresiones compartidas sólo si diff/fallo lojustifica y menorcasonecesario. Step8qualifier temporal ya autorizado sólo en scopeabove. No ampliar5filesnuevospara arreglar antiguo. StatusDONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED, con inquietudes y límites reales; preguntarroot antesde ampliarproducto.
+
+Informe completo en docs/superpowers/reports/2026-11-05-finite-native-notice-provenance.md: BASE/codeHEAD/reportHEAD/tree; archivos/blobs/gráfoprotegido; REDcausal/GREEN primariosrun/job/attempt/head/comandos/counts/skips; lint/warnings; compilacionesreales/hashessólosilogged, sinrerunparaobtenerlos; exactnativevsSYN, existente≠permiso, ACK_DATA≠provenancia, retenciónobserver≠drain, readbackactualdiff5files+informe y qualifierausente. Finalrootstatus+SHAs+una línea tests+concerns; raíz prepara fullBASEdiff/reviewindependiente. No siguienteunidad.
+
+Receiver fijoQA, Mforwardpre-write, verificación humana/CSRF/Access/preconnection/sourceactual, fase notices/terceroCLOSED/ownSEND/fullsetup/cleanup/guard/mount/ARM/hosted/PCoff siguen fuera. No DDL/runtime/alias/Entry/OAuthbrowser/OTP/tokens/permisos/cron/Containers/Max/main/merge. operationalReadiness=false;completePackage=false;PCoff=false.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-owner-exchange-continuity.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-owner-exchange-continuity.md b/docs/superpowers/briefs/2026-11-05-finite-owner-exchange-continuity.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-owner-exchange-continuity.md
@@ -0,0 +1,53 @@
+# D0.4 — factual continuity after genuine native code exchange
+
+Read first: complete task requirements. SOURCE implementation INACTIVE until root supplies future containing product BASE after fanout independent acceptance. Repo tokenizartinfo-ops/agent-friendly-web (1347578006), branch feat/finite-native-cleanup-20261101. One product writer, no subagents. Report docs/superpowers/reports/2026-11-05-finite-owner-exchange-continuity.md. Standing SDD with fresh reviewer; root owns full actualBASEdiff.
+
+## Goal / exact dependency
+Confirmed at inspected51c5: actual original QA grantACK hashes the original native row including exchanged_at=''; real M consumeExchange updates that column. Subsequent factual reader currently rehashes whole current row against originalACK and fails closed. D0.3 token/MCP accepted, fanout scheduling is separate accepted dependency at futureBASE. Do not redispatch them or overwrite subsequent fixture fixes. Design source07c1df6a is inspection, not productBASE.
+
+Restore genuine post-token read_consent without changing original ACK or hiding mutable field from current snapshots. No new capability or evidence of tokenfinalsuccess comes from a timestamp.
+
+## Exact closed scope
+Modify ONLY:
+- lib/mcp-qa-finite-owner-phase-context.mjs inside issuerPrimary: independent validation of actual current exchanged_at and historical projection ONLY in argument to rowAck('grant',...).
+- test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs: real D0.3 flow plus D04 cases.
+- test/fixtures/finite-initial-entry-world.mjs: ONE SYN 'exchange' branch in existing phaseDrift/phaseObservation2 seam, fixed UPDATE of original grantUUID; no new producthook/API.
+Temporary own path/branch-scoped credential-free Actions qualifier allowed/removefinal. No new source export/helperfactory, signatures/3-keyDTO/importgraph/profile/date/flags, SDK/M/store/schema/notice/source stub/mount/permission/clock/runtime change or broadrefactor.
+
+Current field is '' OR existing iso canonical UTC/safeinteger, parsed<=actualDate.now, parsed>=Date.parse(grant.created_at), parsed<Date.parse(grant.expires_at). Keep every existing source/owner/revision/UUID/grant/scopes/created/expiry/nativefence/SDK/journal/holder/check and original budgets. No tolerances/newclock functions.
+
+ONLY rowAck grant gets grant?{...grant,exchanged_at:''}:grant; preserve null/absence. No rowAck helper/domain/journalrecord/ACKrowHash/recordHash rewrite. Retain actual unmodified native grant in return issuerRows/frame/expected and complete pair/owned comparisons. Do not normalize other fields or return a historical row. Equivalent historical consumed_at projection already exists for authorizationACK. Absent/noSEND/noACK/no_mutation behavior unchanged.
+
+SDKpending/unknown/result provenance remains strict. No transported M/SDK proof, report/callback/caller flag, allowPending/sourcefactory. ActualSQL original UUID/current ownership and both full native snapshots remain decisive; arbitrary stable valid timestamp is not a proof of exchange or new permission.
+
+## Genuine native RED before product fix
+Use existing world/issued/exchange/readSummary from D0.3 and sdkReadCurrent/snapshot/sdkGrant APIs. No positivegrant/nativefield prefill or validator/store/token replacement.
+Test named D04 actual exchange retains factual read_consent and immutable grant ACK:
+1 actualQAissuedcode+sourcevalid beforetoken; sdkReadCurrent returns read_consent and exactsortedkeys ['capsuleHash','preconnectionId','source'].
+2 capture originalpreconnection's grant:ack rawDO bytes/codec rowHash/recordHash; its rowHash equals existing initialHash('afw.finite-preparation-issuer-row.v1', native grant beforetoken).
+3 realMtoken200/no refresh/boundedresponse and actualMCPsummary sameoriginalproject, originalappUUIDonly; native exchanged_at nonempty, all otherfields exactlyoriginal.
+4 actualcurrentrowhash differsoriginalACK; historicalcopywith exchanged_at:'' matchesoriginalACK.
+5 actualsdkReadCurrent now muststillreturnread_consent/3keyDTO/originalidentity. BEFOREfix it shouldfail exactlyhere asunavailable; prereqs above pass, ACKunaltered. No claimedRED fromseed/SDK/fixture/buildfailure.
+All DO issuance/preparationjournals/ACK bytes remain unchanged by token/read; DO journals !=opaqueSDKKV which realexchange legitimately updates. Compare hashes/rows only inside test; never log code/token/JWT/KV/rawownerrow.
+
+## GREEN / meaningful boundaries
+After minimal productfix, same testpasses. Newcaseseachfreshworld: actualissuedQA→Mtoken→MCPpositive FIRST, then negative-only SYN nativeUPDATE to originalrow.
+- exchanged_at invalidtypes/text/noncanonicalISO, future actualNow+60000 (assert belowexpiry), created_at-1ms, expiry, expiry+1ms => factualunavailable/no newgrant/ACK/journal.
+- inclusive created_at stable => factualread permitted, explicitlySYN validfieldnotnewexchangeauthority. Under activegrant/no-future, upperexpirycase naturallyalsofailsfuture; do notfakepredicateisolation.
+- immutable originalrow id/user_id/client_id/project_id/resource/scopes_json/created_at/expires_at/revoked_at; currentsite_projects owner/revision =>deny. Keep unrelatedtimebounds valid for±1ms cases/assertprecondition, nevereditACK/SDK/links tomatch. OriginalUUIDlookupmustnotfall backtoanotherrow.
+- valid timestampdriftbetweenoriginalsnapshots: firstvalue actualexchange; choosecreated_at ifdifferent, else exchange+1ms afterrealnecessarytick, assert<=now/<expiry. f.phaseObservation=0, f.phaseDrift='exchange', f.exchangeDrift={grantId:originalUUID,exchangedAt:validDifferent}. Existingnativefixturesecondpointerobservation2 performs fixednativeSQLUPDATE; assert exactly2, actualrowchanged, readerunavailable, ACKunchanged. Never substituteSELECTresult/frame orclaimpost-final-observationdetection.
+- extend existing held actual SDK completion settles late after original terminal fence and real grant reduction: actualactiveoriginalgrant +sdk_completeSEND/noOBSERVED =>sdkReadCurrent unavailable BEFOREreduction/release. Alllateclosure/actualMdenial assertions remain; fieldprojection mustnot authorizependingwork.
+
+Existing realm/source/custody/provider/expiredceiling substitutions remain labelledSYN; SDKcrypto/nativeKVDO D1/issuer/token/MCP/source reader actual. No realprovider/AFWaccount/runtime/Entry, permissions/tokens/OTP/OAuthbrowser, globalKVdrain, Max, main/merge or rollout. Sourceceiling2026-11-03T02:59Z stays expired; parent<=30000ms/child<=5000ms/C0C1 untouched. operationalReadiness=false;completePackage=false;PCoff=false.
+
+## Scoped qualification
+Lintcontrolled3filesfirst. CredentialfreeActions Ubuntu24.04/Node22, contents:read, checkoutpersistfalse, npmci --ignore-scripts --no-audit --no-fund, no localclone/deps/tests/build. Use adequate boundedtimeouts per actualcasecounts; don'trepeat full57/80 or standardcompilerifstillunmounted/noimportedgechanged.
+- REDonlynewprincipalcase beforeprod.
+- GREENpattern D04|valid actual QA code exchanges through actual M bounded response and actual MCP original permission|held actual SDK completion settles late after original terminal fence and real grant reduction on tokencompat-native.
+- SDKnative selected held actual approve denies fabricated results|owned approve recheck rejects original issuer (sourcepin matches3cases).
+- phase-context-native selected primary issuer prefixes remain facts not next-stage permission: (reservation|linked)|unknown issuer SEND denies grant|original primary issuer denies (revoked-grant|unknown-ack)|fresh current owner and current publication are independently rechecked: grant|absent original issuer never triggers a global grant lookup (sourcepin matches7cases).
+Assert meaningfulselectedcount/nozero-match exit0. Report exclusions vs actualpasses; don'tcall partialsuitefull. New legitimatefailures require diagnosis/smallestscope, no unchangedblindretry.
+Nativefixturecompilesalreadyqualifychangedmodule; countallactualcalls/attempts/warnings/hashes withoutbuildforhashes. Future mountedgraph/fullbranchCI remainseparate.
+
+## Delivery
+CASexpectedsourceHEAD only. Report BASE/code/reportHEAD/tree, exactcommands/runs/jobs/attempts/counts, causalRED prereqs+GREEN, currentvsSYN, unchangedACKbytes/hashes/historicals/protectedblobs, actualvaliddriftobservation2, strictpendingdenial, allfailures/warnings/compiles/graphlimitations. Removeownqualifier. ReturnDONE/etc+reportref/SHAs/one-liner/concerns; rootdoesfreshfulldiffreview. No nextunit.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md b/docs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md
@@ -0,0 +1,64 @@
+# Finite owner I/O fanout — implementation brief
+
+Read this first; it is your complete unit requirements. Root supplies containing commit as exact execution BASE AFTER D0.3 independent acceptance. Repository tokenizartinfo-ops/agent-friendly-web (1347578006), product branch feat/finite-native-cleanup-20261101. Report: docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md. One product writer; no subagents.
+
+## Result / boundaries
+
+One reviewable SOURCE unit: fixed concurrency2 for provider reads inside each existing primary observation, all reads/checks retained. D0.2 actual lexical SDK/issuer and D0.3 real token/MCP compatibility are dependencies, not work to repeat. Root accepted design fb63b524 and preflight docs/superpowers/reviews/2026-11-05-finite-owner-io-fanout-preflight.es.md. Design inspected d630a99d is NOT execution BASE; preserve subsequent D0.3 fixture/token changes.
+
+No new mount/alias/access/namespace/resource, SDK callback/factory, grant/schema/DDL, clocks, cache, D1 batching, snapshot overlap, ordinary fallback, dependency, profile/flag/date change, provider/AFW request, OAuth/OTP/credentials/Max/main/merge. operationalReadiness=false;completePackage=false;PCoff=false. Source ceiling2026-11-03T02:59:00Z stays expired; existing fixture-only substitution disclosed SYN, JS/SQL clocks native.
+
+## Exact source scope and interfaces
+
+Modify product ONLY lib/mcp-qa-finite-owner-phase-context.mjs around credentials()/primary(). Keep private observeOwnerPhasePair signature, strict3-key public DTO, handler, same Unit2a store/child/witness, request helper, issuer/SDK journals, SDK pending/result semantics, holders and two snapshots unchanged. Do not modify initial-lease or stage-work: source inspection shows per-child state and one ambient ALS Set support siblings, subject to native proof.
+
+Test files: modify test/mcp-qa-finite-owner-qa-sdk-native.test.mjs; minimally modify test/fixtures/finite-initial-entry-world.mjs and test/fixtures/finite-owner-qa-sdk.mjs; create test/fixtures/finite-owner-io-fanout.mjs for fixed I/O-only source observation/holds. Preserve old observed and unobserved modes including D0.3 actual M token support. Other edits need root with exact evidence. Own temporary branch/path-scoped credential-free Actions qualifier allowed, removed before report; no production workflow.
+
+Retain existing request(path,cap=65536,token=reader) code/lifecycle verbatim: fixed GET origin, original credential, no-store/no-cache, all status/header/Date/body/length/UTF8/JSON/module/cancellation checks and caps8192/65536/4500000. No header return mistaken for completed cycle. All module bodies re-read/hash/full-validate, no cached bytes/descriptors. Native SQL SELECT-first original UUID/new first-primary session and all actual D1 queries unchanged.
+
+Private interfaces inside same observation closure:
+- verifyCredential(token,id,expiresAt):Promise<void>, unchanged one-token validation block.
+- credentials():Promise<void>, fixed reader+publisher calls, both fully validated before descriptors.
+- readQaPrimary():Promise<{qaMetadata}>, original QA pointer→expected pointer compare→exact QA include=modules→all original validations.
+- readMPrimary():Promise<{project,pointer,currentConfiguration,configuration,initialBaseline}>, original M pointer→initial activated M version (capsule.activatedVersionId, NOT historical backup)→full validation→original ownedProject SELECT→current M version if needed→full validation.
+- primary():Promise<same PhysicalObservation>, await credentials then fixed QA+M join, current(clock.lease), both original alias checks and SAME {project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline}.
+Use retained fixed branch promises plus retained Promise.allSettled join. Catch synchronous start errors as rejected promises. Require BOTH fulfilled and discard both outputs on failure. No generic runner/caller callbacks/pool/options/exported intermediate data or capability. After either rejected join no next phase/snapshot/effect. Sibling may finish allowed reads while other fails, never authority. Native retained actual work may outlive raced branch rejection: no drain assertion from allSettled/abort.
+
+Structural maximum2 actual provider fetch/body/cancel lifecycles at once; branch never starts its next request before prior actual work/finally completes. No overlap between primary snapshots or independent rechecks. Preserve sequence factsA→primaryA→qualifyA→primaryB→factsB→qualifyB→compare. Same root≤30000ms and original consume/grant child≤5000ms, including initial recheck and durable final ACK/recheck. No window/lease renewal.
+
+## Genuine native qualification, before/after code
+
+Use accepted genuine initial Entry/material/preparation/actual SDK fixture, no source DTO substitutions or positive grants. Separate I/O-only mode from sdk-observed: old observer calls strict-reader probes and changes counts, so do not combine. I/O observer does not call source/store/SDK or wrap actual SDK/KV. Exact-one source marker assertions fail closed; no silent replaceAll. Keep independent uninstrumented positive.
+
+Observe cycles inside actual request lifecycle until stream.read/cancel finally settles; NOT just outboundService return/headers or clock.child raced result. Trace only fixed endpoint categories/method/ordinal/branch/snapshot/timestamps/bytecounts/outcome, bounded entries, no headers/token/module/body/code/cookie/raw owner data. Test holds release/settle in finally before disposal.
+
+Before product change:
+1. delay0 control succeeds genuine POST302/store+child/grant/code; record peak1 and full child112 GET, endpoint multiset16each {verify-reader,verify-publisher,qa-deployment,qa-version,m-deployment,m-initial-version,m-current-version}. SEND→grantACK84 is narrower than whole child; total D1 remains80factualSELECT+16preflight+2writes=98. No extra probes.
+2. Activate mocked GET delay50ms only AFTER genuine initialization, restored methods/source seed/client seed and VALID GET/form, immediately before POST. Each affected CF GET waits≥50ms measured actual monotonic clock; provider Date emitted from actual Date.now after wait. No delayJWKS/ledger/SQL/DO/SDK, no clock offset/fake timers/backdating/spin.
+3. Test expected POST302/wholechild<5000; BEFORE schedule change it must fail causally at original consume/grant child expiry, not setup/observer/source mismatch. Fixed-two overlap test before change records peak1 vs expected2. Record failed prefix counts honestly; failed run need not reach112.
+If delay0/calibration cannot prove intended causality, diagnose fixture once then report exact evidence to root; don't implement blindly or choose a more convenient delay.
+
+Implement only schedule, then SAME workload GREEN:
+- actual POST302, whole original child including durable tail <5000ms; original ACK/deadline; real grant/code.
+- peak===2, never>2 through fetch/body/cancel; credentials both validated before descriptors, intraQA/intraM dependencies and snapshot order intact.
+- unchanged112/84 counts and multiset; same store/actual child witness; full-child elapsed/margin and tail timing, not ACK timestamp alone.
+Nominal old112*50=5600ms vs new64*50=3200ms plus native overhead is a hypothesis. If fanout still cannot fit5s, report measured failed viability/root decision; do not silently tune delay, cache/skip reads/batchSQL or widen clocks.
+
+Add hostile behavioral native cases:
+- Each credential failure with sibling real body held: no descriptors/form/SDK/grant; original occupancy retained through body/cancel settlement.
+- QA or M branch failure with other body held: no partial source/nextsnapshot/effect, peak≤2 across timeout.
+- Owner/pointer/module/config drift before join, after FIRST primary join ahead of next existing read, and between snapshots; use causal barrier, not guessed sleeps. Original following checkpoint must deny; never claim detecting changes after all original checkpoints/atomic provider state.
+- Native parent/request-signal abort with actual body and cancel held: original scope occupied until physical settlement, no late ACK/code/effects. Node dispatch wrapper signal alone was not propagated; use accepted actual native boundary.
+- Sibling beyond original child deadline doesn't renew it; completed sibling cannot hide holder replacement.
+- Preserve queuedSQL5100ms denial and all strict-reader/ownSEND/source absent/schema malformed/lone-source variants via existing affected tests; do not add redundant mirror assertions or remove legitimate positives.
+
+Commands scoped cloud-only:
+A calibration/control: node --test --test-concurrency=1 --test-name-pattern="fanout causal control|fanout 50ms|fanout fixed two" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+B hostile: node --test --test-concurrency=1 --test-name-pattern="fanout" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+C affected final: existing SDK native file (including uninstrumented actual source/SDK/Unit2a GET POST returns one original grant and code), phase-context-native, owner-request-retention-native + owner-request-retention, preparation-issuer-native, profile-native + profile, sdk-binding-facts. Exact filenames are in design plan Step6. Do not rerun already-qualified same-head cases merely to improve report layout. If final whole SDK file overlaps new tests, first native full execution can serve B+C; preserve RED and scoped correction runs if needed.
+Scoped eslint five controlled product/test/fixture files before native groups. Actions Ubuntu24.04/Node22 contents:read, checkout persist-credentials:false, npmci --ignore-scripts --no-audit --no-fund. No local clone/deps/tests/build.
+
+Root ruling supersedes plan's integration-check phrasing: NO whole npm test/build/lint or new standard compile gate in this unit if standard graph remains unmounted and unchanged. Native component fixture compilation qualifies changed module; full mounted compiler/fullbranchCI happen later once. Count all real fixture esbuild invocations/failedattempts, do not build solely forhashes. Report graph unchanged proof (diff/import paths + accepted D0.3 standard evidence), explicit componentfixture graphs. If unexpected production reachability or additional source edit needed, report root.
+
+## Delivery
+Report BASE/finalcode/reportHEAD/tree, full file scope, all failures and causalRED/GREEN/actual heads/runs/jobs/attempts/commands/counts, actualvsSYN, wholechild elapsed/tail/112/84/multiset/peak, holds/drain bounds, compiler calls/warnings/protectedblobs, remaininglive gates. Remove qualifier, self-review scope/cancellation/unchangedguard comparison, CAS only expectedHEAD. Return DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED + reportref/SHAs/one-line tests/concerns. Root generates full BASEdiff and fresh independent spec+quality review. Do not activate next task.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md b/docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md
@@ -0,0 +1,106 @@
+# D0.2 — QA actual SDK and owned lexical recheck
+
+5 November2026. SOURCE ACTIVE only in containingcommit; accepted D0.1 at04e8bb0f77cb78b27c219b9fd703641018e8df12, independentlyreviewed with143PASS+compiler1PASS. Root supplies containingcommit as actual executionBASE. ProjectAFW/repo tokenizartinfo-ops/agent-friendly-web(1347578006); branchfeat/finite-native-cleanup-20261101, sole productwriter. Readthisfirst; it is yourrequirements. Main spec docs/superpowers/specs/2026-11-04-finite-owner-sdk-trust-boundary.md plus owned-recheck supplement govern. D0.3tokencompat/newnoticeSQL/fullmount/actualaliasaccess remainINACTIVE.
+
+## Global constraints copied from accepted plan
+
+## Global constraints
+
+- Product inspection BASE220b5bc323315b7f107967548fb8958c0f8234f2; root supplies accepted phase-context implementation BASE for execution. Do not follow the advancing product writer.
+- ONE proposed QA binding: AFW_FINITE_OWNER_OAUTH_KV→existing6b94ff702e504e14a7730cee73a0f6ff; this is namespace-wide QA read/write access. No exclusive-holder/per-key-ACL claim.
+- M physical bindings unchanged; revised qaLive adds one alias; historical qaClosed/c570, M2607 and QA_CLOUD_CLOSED_PINS unchanged. No old/new profile fallback or accepted flag/date change.
+- Original capsule/material/bootstrap must bind revised Q BEFORE the one reserved Entry. No retrofitting a sealed occurrence, replacement Entry or clock reset.
+- Original I0/C0/C1, technicalI0+300000, parent<=30s, child<=5s, commandBy-510000, nominal/launch clocks preserved. Untrusted metadata may narrow; not authenticate/widen.
+- Actual SDK and original fence/consumption witnesses stay lexical in QA. No result DTO/registration/callback attestation or ordinary unfenced granting fallback.
+- All current app observations use a new first-primary session with SELECT first and the original reserved UUID. No owner/client scans, SDK list/sweep/purge/client registration.
+- No product public/private mount, provider publication, binding installation, credentials, API-token reuse, remote DDL, browser, local clone/build/tests or other-project action.
+- Source ceiling2026-11-03T02:59:00Z expired. Fixture-only ceiling substitution is disclosed SYN evidence; SQLite clock remains native.
+- operationalReadiness=false; completePackage=false; PCoff=false.
+
+
+
+## Task contract
+
+## Task D0.2 — Actual SDK + original issuer in one QA invocation
+
+Starts only after D0.1 and the accepted first-phase reader. This replaces the old inactive Task A wire protocol; notice SQL remains a later task.
+
+**Create:**
+- lib/mcp-qa-finite-owner-oauth-forward.mjs — M fixed forwarding only.
+- lib/mcp-qa-finite-owner-oauth-wire.mjs — strict one-path original-request grammar.
+- lib/mcp-qa-finite-owner-oauth-qa.mjs — unmounted QA receiver, real SDK/env capture, independent original verifier, actual Unit2a sequence and local result records.
+- lib/mcp-qa-finite-owner-issuer-provenance-records.mjs and lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs — bounded original journal (not present at inspection; implement only the revised local semantics).
+- lib/mcp-qa-finite-owner-approved-ticket-facts.mjs — pure shared ticket/preconnection/approval predicates if still absent.
+- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+- test/fixtures/finite-owner-qa-sdk.mjs
+
+**Modify only after first-phase dependency acceptance:**
+- lib/mcp-qa-finite-owner-phase-context.mjs — invoke qualifyFiniteOwnerSdkBindingFacts inside its private primary observation on actual QA metadata/qualified M configuration at both repeated observations; alias holder checks and actual local SDK journal inventory. Preserve public DTO shape; no credential/capability export.
+- lib/mcp-qa-finite-owner-preparation.mjs — pure approved-ticket predicate extraction, preserving existing unavailable source/linkers and GET-only private continuation.
+- test/fixtures/finite-initial-entry-world.mjs — minimal reuse of genuine source/journal APIs and isolated test entry; no ready DTO or positive source alias.
+
+Do not edit production Worker/DO entrypoints, pending-only bridge/receiver, ordinary delegated-oauth-worker/store, Unit2a store/fence schema, actual cleanup alarm or provider writer. The separate full mounting gate later replaces finite authorization fallback; this task's product routes remain closed.
+
+**Interfaces:**
+- forwardPrivateFiniteOwnerOAuth({request,env,ctx},originalLease) -> Promise<Response>.
+- createPrivateQaFiniteOwnerOAuthReceiver({ctx,env}) -> frozen {fetch(request):Promise<Response>}.
+- handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease) -> Promise<Response>, called only lexically in QA receiver.
+- Existing actual source reader, original issuer journal/store and retained child/request helpers are consumed unchanged.
+- All result records use seal/encode/decodeFiniteOwnerIssuerProvenanceRecord(kind,input) and createFiniteOwnerIssuerProvenanceJournal({ctx,env}); durable journal methods take DATA, not a caller result proof.
+
+**Local record contract:** retain original Root, SdkSend and ExpectedGrant fields from the prior spec. Replace SdkAck(report) with SdkObserved {purpose,sendHash,resultHash,observedAt,outcome:'resolved',recordHash}, keyed <sdk operation>:observed. Fixed domain afw.finite-owner-sdk-observed.v1; strict canonical own data<=16384bytes. Only private QA code after awaiting its captured actual SDK Promise creates these records. No HTTP/RPC method accepts them. SdkSend is an intended call, not proof of dispatch; SdkObserved reports that exact local call's result, not global KV propagation/token visibility/drain. Same original bounds/maximum8 records before notices; unknown/extra/orphan/wrong operation denies. SDK operation duplicates never invoke SDK again, including a restart with an unresolved SEND.
+
+- [ ] **Step 1 — Write local-result/wire RED.** Strict native path /_finite-owner/authorize only, original GET/POST /authorize, body<=16384, private metadata overwrite, fixed origin and exact allowed query/form/header shapes. Former sdk-begin/sdk-approve/read-grant/sdk-complete/sdk-completed/report payloads deny before I/O. Source helper absence/behavior is causal RED.
+- [ ] **Step 2 — Write native real-code RED.** Two actual native workers use one shared synthetic KV namespace: M.OAUTH_KV and QA.AFW_FINITE_OWNER_OAUTH_KV map to that same fixture namespace; QA uses original native DO/RELEASE_DB. Invoke actual SDK1.2.1, actual original source/record/store functions. Existing native fixtures' source substitutions are not a valid positive source. Label only external Access/provider/custody/material/ceiling test inputs SYN. Seed client registry only in isolated fixture, never invoke product registration.
+- [ ] **Step 3 — Run cloud RED.** `node --test test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`. Native test must actually enter the intended source path and fail for missing QA SDK/issuer behavior, not because assertions read prefilled grants.
+- [ ] **Step 4 — Implement lexical QA SDK holder capture.** Capture actual env.AFW_FINITE_OWNER_OAUTH_KV and get/put/delete/list functions, actor/storage/version/DB/retention holders, exact source metadata mapping; check before/after every application-controlled await. The SDK's own internal KV awaits are not newly fenced or cancellable; retain its whole actual promise and preserve opaque late-write uncertainty. Construct only fixed OAuthAuthorizationServer options and minimal SDK env {OAUTH_KV:capturedAlias}. No callbacks/SDK/env supplied over transport and no public SDK server.fetch in QA.
+- [ ] **Step 5 — Implement one-invocation GET.** Actual SDK parse/describe/begin with durable original claim; original Unit2a reservation/open/authorization+ACK/readback/link before form. No returned success on failed source/consent/current owner/SDK/journal/SQL. No repeat begin after unknown ACK.
+- [ ] **Step 6 — Implement one-invocation POST.** Actual original owner/form/ticket checks→one-use local approve claim→actual SDK approve→ExpectedGrant→same-store/same-child genuine consume/grant→actual grant/link→actual SDK complete/revokeExistingGrants:false→local result/response. Original scopes/props exact. Every SQL current observation fresh SELECT-first; no new grant ID, ordinary store fallback or SDK result supplied by M.
+- [ ] **Step 7 — Implement M forwarder/QA receiver fixture only.** One native request/response; no six-path result protocol. Use original bounded bytes, signal and accepted clipped lifetime. Preserve actual SDK Set-Cookie/redirect transiently in bounded response after original guards; no log/durable code. No product fetch mount or readiness switch.
+- [ ] **Step 8 — Run focused native GREEN with all causal cases below.** Retain failed earlier heads and actual run/job/attempt/commands/counts. No fixture authority replacement or reinterpretation of complete bearer replay as a denial.
+
+Required cases:
+1. **Actual GET then POST:** real SDK transaction in shared KV, exact original authorization hash/reserved app UUID, actual returned consumption witness, one app grant and actual SDK grant/code with original props. Assert complete called only after actual app grant ACK.
+2. **Forged old result path, before first success:** same mVersionId/requestId/body/source metadata and valid owner identity at /read-grant or /sdk-completed yields unavailable and no SDK/journal/D1 effect. These paths must not exist.
+3. **Real approve held:** hold actual KV read/delete used by QA SDK. Inject fabricated result fields/direct old path plus another request. No grant/completion until actual SDK succeeds; another request cannot borrow live request occupancy or original claim.
+4. **Real complete held:** hold actual KV put; forged sdk-completed cannot append local SdkObserved, return code, advance phase or clear retained promise. After deadline eventual settlement cannot extend effects or append late ACK.
+5. **Bearer limits separated:** copied public metadata/form with invalid/missing actual SDK cookie/state denies. Byte-identical full valid owner+SDK credentials racing first submission may win, but must invoke real SDK and yield at most one original consume/grant/complete. Assert this limit explicitly, no human-presence or M-identity claim.
+6. **Replay/restart:** durable SEND/unknown ACK followed by new request/recreated actor cannot resume SDK work or reconstruct Unit2a witness. Already completed replay creates zero additional grant/code and cannot revoke the winner.
+7. **Original lifetime:** elapsed29s leaves<=1s, native abort, C0/consent/grant/owner expiry, method/holder drift and retained body/cancel/SDK promises; no child/parent renewal, no first-primary reuse claim. SQL real execution time rejects queued stale writes.
+8. **KV consistency:** simulate exact native call returning miss/error/stale transaction to actual SDK; no substitute provider/source/approval. Unavailable outcome creates no new attempt. Duplicate KV-visible transaction still cannot duplicate D1 grant. A missing acknowledged code on M is not repaired/reissued.
+9. **Original mapping:** wrong QA alias namespace, missing binding, same-shaped holder replacement, changed actual QA/M profile or old capsule denies before SDK/app writes. Test extra alias/other same-account binding input does not imply trust.
+10. **History preservation:** no SDK list/purge/createClient, no other grant/token mutation, original historical D1 rows unchanged. Local resolved SDK result distinguishes result from global KV visibility.
+
+- [ ] **Step 9 — Scoped regressions and exact source graph.** Run new native suite plus affected original issuer, context, conduit/retention and setup-facts pending suites. Scoped lint. The unmounted component fixture's compiled graph is recorded separately; standard product bundle still lacks a positive mount. Exact final mounted SDK graph/QA3MiB budget must be qualified later at full mount gate, not inferred from test compilation.
+- [ ] **Step 10 — CAS source checkpoint and root review.** Rewrite prior Task A spec/interface on accepted branch to selected QA-local design, remove report endpoints, record exact access proposal and retained limits. This is source acceptance only; A/B activation/integration is root's decision.
+
+
+
+## Integrated amendment — mandatory, not a second task
+
+Read docs/superpowers/specs/2026-11-04-finite-owner-sdk-owned-recheck.md and its samebasename plan. SAMEphase-context module owns one private observeOwnerPhasePair engine and strictqualifySettledOwnerPair, unchanged readPrivateQaFiniteOwnerContextDTO plus fixedhandlePrivateQaFiniteOwnerOAuth. oauth-qa holdsreceiver only. nestedzeroargrecheckOwned captures actual request/root/store/SDKPromise/result/childwitness/exactfreshappendledger/programposition. No crossmoduleframeexport/injectedsource/verifier/callback/mode/allowPending/actorregistry/row-reconstructedownership. Newrequest mustpassstrictsettledbaseline. Observe one genuine request scope viaexistingobserveFiniteOwnerRequestWork; factualsourceborrowssameambientlineage, no stage-work APIchange. Commonguards/receiptqualification onbothsnapshots, currentprimarySELECTfirst/originalUUID/holders/nativeclocks unchanged. SDKactualpromise retainedtosettlement; lateSDKsettlementcannotACK/progress/response. Same-store/samechild<=5s consumptionwitness untilinsertReadGrant; noreadbasedreconstruction/newchildrenewal. Pureframehasnoholders, witness, SDKcookies/code/token orpendingPromise and isneverstored/transmitted.
+
+## Root exact local record contract (extract only; old report protocol superseded)
+
+Prefix afw.finite-owner-issuer-provenance.v1:<originalA>:. Strict canonicalownDATA/domain-separatedSHA256, no extras/accessors/symbols/prototypes; eachrecord<=16384bytes; SDKinventorymaximum8 before notices(read9), boundedoriginalprefixonly; storage transaction/sync/exactreadback. Keys:root; sdk_begin:send/observed; sdk_approve:send/observed; sdk_complete:send/observed; grant. Eachrecordpurpose,recordHash plus:
+- Root: preconnectionId,capsuleHash,enrollmentHash,sourceRevision,actorId,qaVersionId,mVersionId,originalConnectionReceiptHash,I0,C0,C1,createdAt.
+- SdkSend: rootHash,operation,originalRequestId,originalRequestHash,issuedAt,deadline,bindingHash (authrequesthashforbegin, originalauthorizationHashforapprove,expectedGrantHashforcomplete).
+- SdkObserved: sendHash,resultHash,observedAt,outcome:'resolved'; fixed domain afw.finite-owner-sdk-observed.v1. ONLYactualcapturedQAresultafterawaitcreatesrecord; no requestacceptsrecord/report. ObservedAt>=send.issuedAt and<send.deadline.
+- ExpectedGrant: rootHash,identityHash,reservationHash,authorizationHash,grantId,approvedRequestHash,scopes,createdAt,expiresAt.
+Root/sendrecorddoesnotproveactualdispatch or permission. No SdkAck(reported), noticeTicket, reportendpoint orgenericappend(payloadFromM). CanonicalSDKrequesthashcontainsboundedclient/redirect/resource/PKCE/scopes/state but rawpayload/handle/cookie/code/token/encryptedprops/rawredirectneverdurable/logged. RequestIdserverUUID; anyoriginalhandleHash43charbase64url32randombytes isHASHcommitmentnotpermission. OriginalUnit2aIdentity/Reservationareauthorityinputs; noextraappUUID.
+
+## Root preflight rulings — binding
+
+1. Implementation integrates whole D0.2, not disconnectedobservationrefactor. Existingphaseengineisnow~34.5kchars, keepONEphysicalobservationengine; no cloned279lineengine. Extractcommonfactsandstrictsettlement privatelywithinnamespecifiedmodule. No sourcecontractwidening. FullDTOstillfrozen3keys.
+2. qaMetadata/mMetadata bindingfactsisnarrowstrictDATA, notphaseauth. Mpreporiginal/currentclosed/readconfig mustindependentlyqualifythroughactualfactualsource. ExactQAalias/mapping/profilelineageD0.1 alreadyaccepted; no furtherprofile/bindingchanges.
+3. NativeRED wordingconflict: baselinehasnoSDKhandler/journal. Do not invent a preexistingSDKprefix rejection or claim an absentmodule/fixturebooterror is a causalnativeRED. First wire/record/helper RED may prove missingfunctionality. Then demonstrateactualSDK+source behavior at genuinependingprefix as soonasminimalnativecompositionexists; preservecausaltest/diff/state andlabelwhichbehaviorfails, before implementingownedcontinuation. Requiredfinalnativepositiveusesactualsource/SDK/Unit2a, no readyDTO/prefilledgrant/substitutedpositives. No separateinterimacceptance/disconnectedtask.
+4. Actualbegin canstartBEFOREissuerreservation; heldbeginwithnoIdentityhasno claimedterminalissuerfence. It retainsuncertainty; latebegin cannotreserve/form/grant. Do not extendopaqueSDKrestorationruling.
+5. Pureapprovedticketextractiononlyifstillabsent at actualBASE. Reuseexistingstage/enrollmentfacts and exactoriginalauthorization/grantlinklogic. No ordinarydelegategrantfallback or modifyingUnit2a store/journal/schema. Needconcretecouplingchange? stopandaskROOTwithexactpath/failure/smallestproposalbeforewidening.
+6. Reuseacceptedguardedfixtureinitialization: ordinaryschema/defaults beforehistoricalFKs/data, awaitMiniflaredisposeoninitfailure. No historicaltablerename/drop, productionSQLclockpatch, sourcepositivealias or testonlyproductionbypass. Fixtureprovider/Access/custody/material/expiredceiling substitutions remainexplicitSYN.
+7. D0.3ONLYcreates tokencompatibilitytestfile afterthisunit; notpartofD0.2. D0.2actualissuancepositiveyes. Mordinarytokenstore/workerunchanged. New modulesunmounted, public/privatefetchroutesremainclosed. Unknown/oldreportpathdenialsareagainstnewfixtureonly, notnewliveendpoint.
+8. Testproportionatelycloudonly: scopedlintbeforecostlynativegroups; one finalaffectedheadregressions inclacceptedreader/issuer/nativeconduit/retention relevantcases. No repeatedalreadyacceptedwholeupload/signals/fullrepo tests withoutconcretefailure. ActualstandardcompileFiniteNativeStaginggateafterchangedQAreadergraphatfinalhead; itsgraphstillunmountedSDKhandlermaytreeshake, reportstandardvsfixturegraphseparately. CountEVERYactualcompileentrypointcall inclnestednativefixture/buildFiniteNativePackage. Preserve2MiBM/3MiBQA; no fixturebyteoutput/secrets. Do notclaimfullmountgraphorcompletePackage.
+9. UseboundedcredentialfreeActions onUbuntu24.04/Node22, contents:read, checkoutpersist-credentials:false; npmci--ignore-scripts--no-audit--no-fund, originalnativeclockbudgets. Temporaryownbranchpathscopedqualifieronly; removeOWNqualifierwithfinalreport. CAScheckbranchbeforeeverywrite; nootherproductwriter/no subagents. No localclone/build/npm/deps/tests/largefiles/provider/browser/OTP/token/DDL/runtime/networkcallstoAFW.
+
+## Delivery
+
+Report docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d02.md. IncludeexactBASE/code/reportHEAD/tree, fullscopeandremainingclosedgates, causalRED/GREENcommands/run/job/attempt/counts/warnings, actualvsSYNperfixture, currentDTO/regressionlineage, realSDKmethods/order/sharedKV/rawbearerlimit, witness/store/child proof, eachrequiredhostilecase+retention/lateoutcome, role-specificgraph/bytes/hashes+compilecount andlimits. Disclosefailures/fixturescorrections. Nooperationalclaim. ReturnDONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED + reportref/exactSHAs/one-linequalificationonly. Do notspawnreviewer; ROOT owns independentreviewafterfullBASEdiff. Rootwillchainnextunitonlyafteracceptance.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md b/docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md
@@ -0,0 +1,46 @@
+# D0.3 — actual M token compatibility and bounded tuple hardening
+
+5 November 2026. SOURCE qualification ACTIVE only in containing commit after D0.2 independent approval. Root supplies containing commit as BASE. Repository: tokenizartinfo-ops/agent-friendly-web (ID1347578006); branch feat/finite-native-cleanup-20261101. One product writer. Read this first; it is your requirements. Report: docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d03.md.
+
+## Goal and accepted dependency
+
+D0.2 source report d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72 is accepted, actual QA-issued SDK code and original application grant/props work in native shared KV/DO/D1. D0.3 must exercise the ACTUAL M createDelegatedOAuthWorker /oauth/token callback and bounded response, then actual /mcp permission behavior. No simulated positive token/permission response or replacement validator/store. No new token implementation. Existing successful code exchange is expected PASS; do not manufacture a positive RED.
+
+Create test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs; minimally modify test/fixtures/finite-owner-qa-sdk.mjs and only if necessary the shared initialEntry fixture to compose actual M token/MCP-only paths. Actual private production routes remain unmounted; source configuration/SDK1.2.1/physicalMbindings/QAaliascontract/historicalpins/flags/date unchanged. D0.1alias actualinstallation, notices/fullmount/cleanup/Entry remain out of scope.
+
+## Root preflight facts, exact source
+
+- Actual M API lib/delegated-oauth-worker.mjs exports createDelegatedOAuthWorker({issuer,resource,now=actualclock,accessVerifier=realverifier,eventsAuthorityFactory}). Use fixed issuer https://delegated-canary.agentfriendlyweb.dev and resource issuer+'/mcp'; do not override clock/verifier/events authority to fake success. /oauth/token POST at215–229 calls real SDK + tokenExchangeCallback + boundedTokenResponse. /mcp uses actual resourceServer/repository.
+- M ordinary database binding is env.DB, which must alias the same isolated native D1 used by QA RELEASE_DB; OAUTH_KV already shares finite-sdk-shared with QA alias. Actual M fixture can wrap these TWO exact paths only; /authorize must still call actual D0.2 forwarder or stay unavailable. Never delegate authorization to ordinary M granting fallback. All other routes closed. M private fixture controls remain test-only, no product mount.
+- OAuth environment values are SYN but valid exact original client/project/resource/window with AFW_DELEGATED_OAUTH_ENABLED=true and refresh=false; source actual product deadline stays expired. Derive ACTUAL native M/QA date/flags from accepted profile templates, not nodejs-only. Preserve consistent SDK QA worker identity/namespace through initialization/restart. Use guarded awaited disposal once per actual instance and existing single-instance setOptions initializer, not reconstructed schema/history/positiveSource.
+- Token callback74–94 authorizes applicationGrantId against active native row, SDK user/client/resource/scope, actual ownership and >=60s remaining; consumeExchange actual one-use. boundedTokenResponse97–112 validates token, current grant/owner and clamps expires_in to D1 absolute expiry. MCP117–134 separately verifies redundant props.userId/projectId and grant repository permission. /oauth/register remains unavailable.
+
+## Precise conditional scope amendment — no hidden test-expectation relaxation
+
+Plan D0.3 was tests-only. Root code preflight found an intended tuple-contract gap: tokenExchangeCallback currently looks up props.applicationGrantId but does not itself compare props.userId/projectId with the native grant; MCP later rejects bad redundant fields. Valid D0.2 supplies allthreeexact fields, so valid exchange shouldalreadywork. The task must not claim every wrong-props code is rejected at exchange if actualM issues a token.
+
+FIRST qualify valid QA-issued exchange and actualMCP read without product edits. Then write genuine negative tests with actual SDK-format codes carrying missing/wrong props.userId/projectId and valid original app pointer; report actual token/MCP behavior. These negative inputs are explicit isolated SDK corruption/negative setup, not positive QA issuance and not a second application permission. Use actual SDK/crypto format and native KV, never a fake SDK return or raw invalid token that bypasses the callback.
+
+IF those negatives empirically show token success contrary to the intended exact tuple contract, ROOT ALREADY AUTHORIZES ONLY this minimal production hardening in lib/delegated-oauth-worker.mjs tokenExchangeCallback BEFORE consumeExchange: require options.props.userId===grant.subject and options.props.projectId===grant.projectId (grant and SDKuser equality already validated); missing values deny through existing invalid_grant path. Keep ALL actual subject/client/resource/project/status/scopes/owner/expiry/one-use/refresh guards. No generic tuple-validator hook, schema/store/API changes, new endpoint or fallback. Record causal negative RED and smallest GREEN. This is a scoped, privilege-reducing extension of D0.3, not permission for broader M refactoring. If actual behavior differs or more change seems needed, ask ROOT with exact evidence; do not guess or broaden.
+
+This amendment supersedes tests-only wording ONLY for those two equality guards after genuine evidence. A private/protected project or bad SDK subject must never become accepted by matching redundant props. No fields are authority by themselves; actual native grant and ownership remain decisive.
+
+## Required meaningful qualification
+
+1. New uninstrumented QA GET→POST code with exact original props, real M /oauth/token authorization_code exchange using original client/redirect/resource/S256 verifier: one bounded token response, no refresh_token, actual /mcp permitted summary for original project. Do not expose/log code/token/cookies, even though SYN. Preserve historical data and one app UUID.
+2. Wrong KV namespace, PKCE, client, resource, missing/wrong applicationGrantId, SDKuser/owner/project mismatch, granted/requested scope outside original grant deny at actual appropriate guard. The tuple checks above must reject missing/wrong redundant props at exchange after hardening if needed. Report actual denial stages; no mismatched source success assumption.
+3. Consumed code/exchange denies and creates no second application grant or renewed permission. Do not invent a promise that SDK code-reuse preserves its opaque grant family: record actual vendor behavior separately. D0.2 POST replay/winner preservation is a different invariant.
+4. Original grant revocation and expiry: use actual original fenced permission-reduction component for terminal closure/revocation, not an ordinary unfenced grant fallback. Closing a fence alone need not revoke an already-active row; actual row permission cut is part of this test. Expiry may be a clearly-labelled negative fixture change to the ORIGINAL already-issued native row's timestamp, with actual JS/SQL clock unchanged; no prefilled positive grant/newUUID or Date patch.
+5. Hold actual QA SDK completion; apply actual original terminal fence + grant reduction; let actual SDK settle late. Observe actual late SDK code only through a fixed test-only read observation in memory if needed, never product transport/log/storage; actual M exchange/permission must deny even if opaque SDK state survives. No permission that late result proves global KV drain or Worker restoration. No new granting from rows or copied witness.
+6. Actual token/MCP validation denies revoked/expired original permission even when token cryptography remains otherwise valid. Valid positive read must precede applicable reduction/code reuse. Keep events authority disabled in this fixture; do not fake event subscription/notice behavior.
+7. No SDK client registration/list/purge/revoke-all, automatic reissue/refresh, unrelated grant/token mutation, real customer data, Max, provider/API-account call, permission/token/namespace installation, browser/OAuth/OTP or runtime action. Client registry seed only in isolated native fixture. No other-project action.
+
+## Execution and delivery
+
+Use GitHub App CAS against exact branch head, sole product writer; no subagents. Credential-free bounded GitHub Actions on Ubuntu24.04/Node22, contents:read, checkout persist-credentials:false, npm ci --ignore-scripts --no-audit --no-fund. Lint changed files before expensive native groups. One required new SDK token suite at the meaningful final head; affected D0.2 positives only if shared fixture changes warrant them. If minimal M equality hardening occurs, run relevant existing delegated OAuth/token/MCP regressions (inspect actual test names), including refresh behavior with legitimate original props, without rewriting legitimate positives to denial. A fixture seeded with incomplete props must be labelled/corrected as such, not hidden.
+
+If product M changes, one exact final standard compileFiniteNativeStaging gate with original2MiBM/3MiBQA caps and existing role exclusions is required. Respect D0.2 graph facts: standard finite SDK/reader/receiver still UNMOUNTED; do not require inclusion or exclude existing shared anchors/Entry DATA. Report componentfixturegraph separately. Count all fixture/standard compiler calls, failed attempts and warnings; no extra build solely for hashes. No local clone/npm/build/tests/largefiles.
+
+Report BASE/code/reportHEAD/tree, exact command/run/job/attempt/counts, clean valid baseline, actual negative RED+minimal optional M fix, native-versus-SYN, exact denial stage, bounded token duration/no refresh, actual terminal reduction and late-code outcome, unchanged protected blob IDs, compiler counts/hashes if applicable. Remove own path/branch-scoped qualifier. Return DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED + reportref/exactSHAs/one-line qualification. Root owns fullBASEdiff and fresh independent spec/quality review. Do not activate another unit.
+
+Original source ceiling2026-11-03T02:59:00Z remains expired. Original clocks and same-store/same-child D0.2 granting unchanged. The separate I/O feasibility audit is NOT an optimization authorization here; no latency clock/cache/check changes. operationalReadiness=false;completePackage=false;PCoff=false. No real binding grant/mountedgraph/functionalcloudtrial accepted.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-05-finite-preparation-notice-store.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-05-finite-preparation-notice-store.md b/docs/superpowers/briefs/2026-11-05-finite-preparation-notice-store.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-05-finite-preparation-notice-store.md
@@ -0,0 +1,175 @@
+# Task brief — finite native preparation notice store
+
+## Activación y autoridad
+
+Preparado por root el5nov2026 para UN implementer fresco, después de D0.4. La activación requiere mensaje de root con BASE exacto futuro y rama feat/finite-native-cleanup-20261101; no usar un pin documental antiguo como producto. Este brief es la fuente de requisitos de la tarea. Contexto mínimo: issuer original existente produce grant real; D0.4 resuelve exclusivamente ACK histórico del exchanged_at; ahora faltan ticket y primer consentimiento de avisos cercados en SQL. SOURCE ONLY y unmounted.
+
+Antes de ejecutar, leer el preflight compañero docs/superpowers/reviews/2026-11-05-finite-preparation-notice-store-preflight.es.md. Rulings de root prevalecen sobre encabezados históricos del diseño: SDD vigente; un único writer; preservar bytes/semántica de métodos antiguos, no exigir hash invariable del archivo ampliado; qualifier temporal de rama autorizado con contents:read/sin secretos y retirado del diff final; ninguna otra nueva herramienta/permiso. Techo fuente2026-11-03T02:59Z vencido: fixtures SYN explícitos solamente.
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006, PUBLIC); ENVIRONMENT=GitHub source/Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE=isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=los tres archivos abajo + informe y qualifier temporal de prueba; ROLLBACK=revertir únicamente commits propios por expected-head CAS, sin pisar cambios ajenos. Nunca runtime, proveedor, alias/Entry/DDL reales, OTP, tokens, permisos, cron, Containers, cliente, Max, merge o main. No usar contexto privado de otros proyectos.
+
+No subagentes ni revisores propios. Producto sólo lib/mcp-qa-finite-preparation-issuer-store.mjs, test/fixtures/finite-preparation-issuer-worker.mjs y test/mcp-qa-finite-preparation-notice-native.test.mjs. Guardar informe en docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md. No leer todo el plan/historial ni instalar clones/dependencias/builds/tests locales. Operar con GitHub App y Actions existentes; consulta de refs/commits y CAS exacto. Ante resultado incierto de update_ref leer ref antes de decidir; force=true sólo con expected_sha y commit hijo directo ya verificado, nunca para reescribir historia o cambios ajenos.
+
+## Contrato vinculante del componente
+
+## Mapa de archivos cerrado
+
+| Acción futura | Archivo y responsabilidad |
+| --- | --- |
+| Modificar | lib/mcp-qa-finite-preparation-issuer-store.mjs: tres métodos nuevos, validación DATA local, testigos/attempts privados y preflight de avisos separado |
+| Modificar | test/fixtures/finite-preparation-issuer-worker.mjs: reutilizar issuer/SQL/lease/queue reales existentes; añadir sólo escenarios de avisos y fault gates |
+| Crear | test/mcp-qa-finite-preparation-notice-native.test.mjs: componente nativo causal y hostiles |
+
+No nueva tabla SQL, migración, schema helper separado, codec ni notice journal. Se añade en el **mismo** módulo issuer una única constante frozen FINITE_PREPARATION_MONITORING_SCHEMA con los siete DDL originales: cuatro de consent y tres de tickets, copiados de sus db/*.sql sin comentarios. Se exporta para la fixture y se contrasta en tests contra ambos archivos originales. Producción nunca ejecuta esos DDL.
+
+No cambiar host ordinario, phase-context, SDK/alias, source stubs, worker entrypoints, transporte, cleanup, config, permisos ni relojes. No ampliar el journal issuer ni sus seis operaciones.
+
+## DATA y firmas exactas
+
+Los tres métodos son miembros de createFinitePreparationIssuerStore({ctx,env}); no nueva factory ni constructor. Cada invocación exige arguments.length===2 y toma exactamente (input, originalLease). originalLease conserva el contrato existente {signal,assertCurrent} y se verifica por identidad, no por JSON.
+
+Common DATA tiene exactamente:
+- identity: validateFinitePreparationIssuerIdentity actual, sin cambios;
+- expectedGrant: exactamente {scopes,createdAt,expiresAt}, con grantData actual y relación createdAt>=consumedAt;
+- consumedAt: ISO UTC canónico del consumo original;
+- accessExpiresAt y preconnectionExpiresAt: enteros issuerTime, **techos DATA**, nunca prueba de Access/consentimiento;
+- window: exactamente {startedAt,deadline}, con reglas actuales de input/forward: startedAt>=identity.reservedAt, 0<deadline-startedAt<=5000 y deadline<=min(identity.C0,parse(identity.consentExpiresAt)).
+
+ticket DATA tiene exactamente {handleHash,requestId,expectedSequence,issuedAt,expiresAt,permissionExpiresAt}:
+- handleHash: hex minúsculo64; no handle bruto;
+- requestId: issuerUuid actual;
+- expectedSequence: entero **0**, porque sólo se soporta la primera decisión grant para ese UUID;
+- tiempos: issuerTime; issuedAt>=max(identity.reservedAt,parse(expectedGrant.createdAt),parse(consumedAt));
+- issuedAt<permissionExpiresAt<=expiresAt; expiresAt-issuedAt<=600000;
+- expiresAt<=min(identity.C0,parse(identity.consentExpiresAt),parse(expectedGrant.expiresAt),accessExpiresAt,preconnectionExpiresAt).
+
+Los techos deben ser posteriores a issuedAt y permanecer en su original C0; un caller futuro fijo debe acreditar Access original y actual/preconnection y negar un ticket incompatible con un techo actual más corto. No aceptar renovación de autoridad porque otro JWT expire más tarde. El componente sólo prueba las condiciones SQL bajo esos techos DATA.
+
+Firmas:
+1. insertMonitoringTicket({...Common,ticket},originalLease) -> Promise<{status:'applied',row:TicketRow}|{status:'no_mutation'}>.
+2. observeMonitoringTicket({...Common,ticket},originalLease) -> Promise<MonitoringTicketWitness|null>.
+3. insertMonitoringConsent({...Common,ticketWitness},originalLease) -> Promise<{status:'applied',row:ConsentRow}|{status:'no_mutation'}>.
+
+No otras claves/opciones/callbacks. Common se expande en cada objeto, no se introduce una propiedad common. El método3 NO recibe ticket DATA, requestId, sequence, action, expiresAt ni aprobación declarada adicionales: los toma del testigo nativo privado. MonitoringTicketWitness es el objeto frozen {status:'observed',row:TicketRow}; sólo esa referencia original está en un WeakMap privado. Su representación serializada es DATA sin capacidad.
+
+Snapshot antes del primer await con initialFields/initialOwn y descriptor extraction que excluya ticketWitness sin recorrerlo. DATA común+ticket<=16384 bytes canónicos; aplicar primero los límites existentes de initialOwn (profundidad24, nodos16384, cadena65536, array2048, total65536). Rechazar getters/símbolos/prototipos/claves extra/sparse arrays sin ejecutar accessors. No cambiar el helper input antiguo ni sus exclusiones; usar helper local nuevo para las tres firmas.
+
+## Filas, testigo y uso único
+
+TicketRow contiene exactamente los14 nombres SQL originales: handle_hash, request_id, user_id, grant_id, project_id, client_id, resource, purpose, action, revision, expected_sequence, issued_at, expires_at, permission_expires_at. Los seis últimos/identificadores se derivan de identity/ticket; purpose='afw.dossier-monitoring-owner.v1', action='grant'. No caller DTO contiene subject/grant/project/client/resource/purpose/action alternativos.
+
+ConsentRow contiene exactamente las12 columnas originales: sequence, grant_id, project_id, user_id, client_id, resource, revision, action, purpose, request_id, issued_at, expires_at. action='grant', purpose='afw.dossier-monitoring.v1'; request_id del ticket; issued_at=n.ms **nativo al ejecutar INSERT**; expires_at=permission_expires_at absoluto del ticket. sequence es el entero seguro positivo realmente devuelto, no un valor pronosticado.
+
+Resultados son snapshots detached/frozen de la fila realmente devuelta por RETURNING/SELECT; INSERT sin fila es no_mutation, no un ACK inventado. Observe hace SELECT condicional en **sesión nueva first-primary, como primera sentencia de esa sesión**, después de preflight en sesiones distintas. Coincidencia debe ser exacta con las14 columnas esperadas y las condiciones actuales. Sólo una fila así observada crea testigo; el resultado de INSERT no es testigo.
+
+El WeakMap liga objeto, fila detached, identityHash, expectedGrant completo, consumedAt, los dos techos, window y la **misma referencia lease**. Método3 exige igualdad exacta de ese Common y holder lineage y marca usado antes de cualquier preflight/await. No ampliar deadline respecto a la observación. Clon/JSON/reconstrucción/otra instancia/otra lease niegan antes del INSERT.
+
+Conservar attempts privados por identityHash para ticket INSERT y consentimiento INSERT; sólo un intento de cada uno por instancia. Un intento de consentimiento cierra cualquier posterior escritura de avisos para esa identidad en esa instancia. Cualquier fallo/ACK desconocido de una mutación bloquea ambas escrituras de avisos para esa identidad; no reconstruir éxito leyendo después. Observe fallido no crea testigo; observeMonitoringTicket también rechaza una identidad marcada failed y nunca reconstruye un testigo tras ACK desconocido en esa instancia. Los métodos originales close/reconcile/observeGrant/revokeGrant permanecen disponibles bajo sus reglas.
+
+El componente no ofrece idempotencia durable de múltiples tickets entre instancias ni resuelve replay tras ACK perdido entre RPCs: el journal/receptor fuente posterior debe hacerlo. Un nuevo store no puede consumir un testigo ajeno. No afirmar exclusión durable por un Set/WeakMap.
+
+## Condiciones SQL obligatorias
+
+Cada INSERT y el SELECT de observación debe componer **en esa sentencia**, con n.ms=CAST(unixepoch('subsec')*1000 AS INTEGER):
+- owner actual site_projects para identity.projectId/userId/revision;
+- cerca original de ocho columnas exactas, fenced_at/fence_request_id NULL;
+- autorización original por authorization_hash/owner/kind='authorize'/project/client/resource/scopes_json/consent expiry, consumed_at===consumedAt no vacío y canónico;
+- grant por identity.grantId, owner/project/client/resource, scopes_json===JSON.stringify(expectedGrant.scopes), created_at/expires_at exactos y canónicos, revoked_at=''; created_at>=consumedAt y <=n.ms;
+- exchanged_at vacío o ISO canónico con created_at<=exchanged_at<=n.ms y exchanged_at<grant expiry. No se recibe en expectedGrant ni se lo usa como prueba de emisión de token;
+- n.ms>=window.startedAt y ticket.issuedAt, n.ms<window.deadline, identity.C0, consent expiry, grant expiry, accessExpiresAt, preconnectionExpiresAt, ticket expiry y permission expiry;
+- para ese grant, MAX(sequence)===ticket.expectedSequence===0 y ausencia de cualquier evento previo. No sólo ausencia de revoke.
+
+Ticket INSERT deriva las14 columnas y usa INSERT SELECT RETURNING. No INSERT VALUES ordinario, callback beforeCommit, ON CONFLICT recovery ni fallback.
+
+Observe selecciona ticket por handle_hash/request_id exactos y contrasta las14 columnas completas junto a los predicates anteriores. Consent INSERT vuelve a unir esa fila exacta; no confía sólo en la observación anterior. Hace INSERT SELECT RETURNING de las12 columnas. Un owner/revisión/grant/cerca/ticket/sequence cambiado entre observe y commit debe negar en SQL, aunque el lease JS aún sea válido.
+
+El expiry de permiso permanece absoluto: **no** n.ms+ventana, nuevo C0 ni deadline hijo como expiry del permiso. El plazo de operación controla cuándo se puede escribir; el permiso puede durar más de5000ms pero nunca superar los techos originales. Las queries son point lookups por UUID/authorization hash/ticket hash e índice (grant_id,sequence); no listar otros grants/tickets ni buscar “latest grant”. sqlite_schema/PRAGMA sólo para los objetos declarados.
+
+Preflight de avisos llama al preflight issuer antiguo sin alterarlo, luego exige los siete objetos originales por nombre/tbl_name y SQL completo. Comparar normalización sólo de whitespace, semicolon terminal y el IF NOT EXISTS inicial que SQLite pueda omitir al guardar CREATE. Filtrar autoíndices internos con sql IS NULL; no excluir objetos extra con SQL para esas tablas. Verificar columnas/dominos por PRAGMA además de constraints/unique/índice/triggers por SQL exacto. No crear/reparar un objeto ausente. Métodos originales no requieren estas dos tablas nuevas para ellos.
+
+## Fallo, reducción y pruebas de aceptación
+
+Errores de forma/testigo/DB/reloj/lease se rechazan con error genérico saneado; no exponer SQL/binds/filas privadas. Excepción o respuesta retenida después de commit puede dejar una fila real y no dar éxito al caller. Retener la Promise nativa con el mecanismo existente; no afirmar que abort canceló SQL ni inventar no_mutation tras error.
+
+Barrera gana: CLOSE original serializado y primaria nueva; al liberar INSERT tardío de ticket/consentimiento no aparece nueva fila. Concesión gana: el evento real ya existe; CLOSE no lo borra ni retira un grant activo. Usar en la fixture los métodos originales closeFence→observeGrant→revokeGrant y createDossierMonitoringAuthorization real: tras CLOSE solo debe seguir enabled=true con grant activo; después de revokeGrant debe devolver enabled=false. El evento permanece. Es reducción del permiso de lectura que deshabilita esta autoridad, **no** retirada humana de avisos ni cleanup completo.
+
+Las pruebas sólo pueden llamar positivo al componente SYN: grant original creado mediante openFence→insertAuthorization→consumeAuthorization→insertReadGrant **reales**, misma instancia/lease y D1 nativo; sin prefijar el grant positivo. No alias/store mock ni DTO que sustituya un resultado del componente. Credenciales/identity/human son sintéticos explícitos. DDL ordinario sólo se instala en la fixture.
+
+Casos mínimos:
+- positivo con permiso >5000ms, ticket real→observación primaria nueva→consentimiento único; fila actual exacta, timestamp SQL y expiry absoluto; misma fila de grant, histórico ajeno preservado;
+- sequence global>1 con MAX por grant=0; primer grant se acepta sin exigir expected+1; segundo intento/fresh-store contra evento previo niega;
+- testigo clonado/reconstruido/otra instancia/otra lease, ticket alterado y cada Common diferente; DATA hostil/getter count0;
+- grant tuple/scopes/revoked/owner/revisión/consumed auth/cerca actuales alterados al gate antes de SQL, y sequence/evento competidor entre observe y INSERT: cero filas nuevas. Ticket DATA alterado niega al observar; UPDATE ordinario del ticket debe abortar por trigger. Para probar la comparación de fila en INSERT ante cambio posterior, un caso SYN explícito altera schema/ticket sólo después del preflight y antes de liberar SQL, y exige cero evento; no presentarlo como una mutación legítima posible bajo schema intacto;
+- schema ausente/tamper constraint/unique/índice/trigger/extra objeto, tipo o clock/ISO no soportados: negar antes de mutación;
+- SQL real retenido antes de ejecutar:5100ms con ventana<=5000 y casos cortos en que se elige por separado C0/consent/grant/Access/preconnection/ticket/permission como techo más temprano; reloj real, sin Date patch;
+- barrera gana frente a ambas escrituras y concesión gana con reducción por autoridad real;
+- error que pierde resultado SQL **después** del commit y hold de la Promise real después de commit/abort: fila real presente, rechazo/sin testigo utilizable, ningún segundo INSERT en esa instancia y ninguna reclamación de physical drain entre RPCs.
+
+Ceilings anidados impiden aislar temporalmente algunos predicates con inputs válidos: si C0 o Access es mínimo, ticket/permission también deben vencer no después. Cada caso debe registrar el techo elegido y el mínimo efectivo; no decir que probó independientemente un único predicado. Debe alcanzarse el gate antes de expiry (assert explícito); un timeout anterior al gate no califica. La prueba5100ms preserva un lease SYN padre<=30000ms y tiempos DATA largos; es la condición nativa de ventana la que debe evitar la fila, no un throw JS anterior a emitir SQL.
+
+
+## Ejecución y evidencia vinculantes
+
+- [ ] **Step 1: Escribir el positivo causal y los hostiles en el harness real.**
+
+  En el nuevo test usar el mismo entrypoint de fixture, compatibilityDate2026-09-07, flags['nodejs_compat'], D1 RELEASE_DB y DO SQLite, con uniqueKey SYN aislada por escenario. Compilar una vez el entrypoint para este archivo de tests, sin modificar el runner issuer existente. El test lee db/dossier-monitoring-consent.sql y db/dossier-monitoring-owner-tickets.sql y entrega sus siete DDL al campo fixture-only monitoringSchema; la fixture ejecuta ese DATA sólo en notice-* y en el mundo explícitamente SYN. Esto permite RED por método ausente sin un import nominal de constante inexistente. Nunca montar esa entrada.
+
+  El positivo debe llamar efectivamente openFence→insertAuthorization→consumeAuthorization→insertReadGrant, con resultados nativos, y luego:
+  - test `REAL first notice uses native original issuer grant and observed ticket`: assert grant.id===identity.grantId; ticket.status==='applied'; witness.status==='observed'; consent.status==='applied'; row.expires_at===ticket.row.permission_expires_at y row.expires_at-row.issued_at>5000; sólo una fila original por tabla; UUID sin cambio; SELECT del ticket es primera sentencia de nueva first-primary después de preflight en otra sesión.
+  - test `REAL first notice keeps absolute permission beyond child window`: permiso válido con expiry absoluto al menos10000ms después del issuedAt original y operación<=5000; assert expires_at no fue reemplazado por deadline ni Date.now()+5000.
+  - test `REAL global sequence is not per-grant plus one`: insertar previamente un evento explícitamente ajeno SYN; expectedSequence=0 para el original; assert nuevo sequence>1, MAX original previo0 y ambas historias preservadas.
+  - test `REAL schema metadata equals unchanged original seven statements`: importar módulo como namespace; assert constante frozen, longitud7 y igualdad normalizada con archivos originales, sin filesystem import de producción.
+
+  Añadir tablas parametrizadas con nombres estables:
+  - `REAL native notice rejects hostile DATA and foreign ticket witness`: clone/JSON/raw row/otro store/otra lease, getter(count0), symbol, prototype, sparse/oversize, keys extra; cada cambio de Common/ventana/ticket y argumentos omitidos/extra; no SQL mutante emitido.
+  - `REAL native notice current tuple races deny at commit`: gate tras observe antes del INSERT; cambiar por caso owner,revision,grant immutable tuple/scopes/revoked_at,consumed auth,issuer fence o evento competidor. Ticket DATA alterado se prueba antes de observe; un UPDATE ordinario debe abortar por trigger. Un caso SYN explícito, después del preflight, elimina sólo el trigger necesario y altera el ticket en la fixture antes de liberar INSERT, que debe negar por comparación completa de fila. Es tamper negativo aislado, no schema de producción ni mutación legítima. Assert nuevas filas0 y estado ajeno intacto.
+  - `REAL monitoring preflight denies missing or changed original schema`: cada tabla/unique/constraint/índice/trigger/objeto extra/tipo/clock/ISO; assert cero mutaciones de avisos. No normalización que elimine constraints.
+  - `REAL queued monitoring INSERT denies after native deadline`: operar ticket y consent por separado, gate antes del bound.first nativo, await5100ms y liberar; assert gate alcanzado antes del plazo y nueva fila0.
+  - `REAL queued monitoring INSERT denies earliest <ceiling>`: por ambas escrituras, C0,consent,grant,Access,preconnection,ticket,permission como menor techo válido; cruzar el reloj real hasta mínimo+50ms y liberar; assert gate previo al mínimo, cero filas nuevas, reportar empates derivados.
+  - `REAL original issuer barrier beats queued monitoring INSERT`: ambas escrituras detenidas; CLOSE y lectura primera de nueva primaria completadas; liberar y assert sin nueva fila.
+  - `REAL issued notice remains historical after original grant reduction`: evento concedido primero; CLOSE→observeGrant→revokeGrant nativos; autoridad real enabled=true después de sólo CLOSE con grant aún activo y enabled=false después de revokeGrant; evento conservado y cero grant nuevo. No llamarlo retirada humana.
+  - `REAL post-commit notice ACK loss blocks another write in this store`: perder resultado tras commit tanto de ticket como consentimiento, filas reales conocidas por fixture; assert rechazo, ningún witness otorgado por fallo de ticket, y nuevo intento de ambas escrituras en esa instancia denegado sin otro INSERT.
+  - `REAL held native SQL settlement cannot become successful cancellation`: retener resultado después del commit, abortar el lease SYN, observar Promise todavía pendiente, liberar y assert rechazo/estado absorbente; la fila persistida no desaparece.
+
+  Gates deben interceptar únicamente el INSERT/SELECT real correspondiente; ningún SQL predicado se reemplaza. El error de fixture se sanea y se devuelve metadata/counts/booleanos, nunca valores de handles/JWT/secretos. Inputs/colas/lease son SYN; resultado de SQL/autoridad es nativo. No source/SDK/qualifier alias.
+
+- [ ] **Step 2: Ejecutar RED causal en cloud autorizado y conservar evidencia.**
+
+  Root debe haber activado este HEAD futuro. Ejecutar:
+  `node --test --test-name-pattern="REAL first notice uses native original issuer grant" test/mcp-qa-finite-preparation-notice-native.test.mjs`
+
+  Esperado: el issuer original crea realmente su grant y el test falla en la invocación ausente insertMonitoringTicket (captura saneada de método no existente), con cero ticket/evento. Error de instalación/bundle/fixture/DDL no cuenta como RED. No implementar un fallback ni sustituir la llamada para lograr el fallo previsto. Registrar revision/tree/run/job/attempt y assertion, sin secretos.
+
+- [ ] **Step 3: Implementar exclusivamente el contrato de la spec en el mismo store.**
+
+  Añadir FINITE_PREPARATION_MONITORING_SCHEMA como siete strings originales congelados, checks de schema de avisos en preflight separado y helpers nuevos de DATA/testigo. No cambiar input/preflight/SQL/métodos antiguos ni volver obligatorias las tablas de avisos para ellos.
+
+  Añadir WeakMap privado para el testigo y estado de attempts/fallo por identityHash. Observe captura todas las14 columnas después de un SELECT condicional como primera sentencia de nueva first-primary. Método3 compara Common exacto, consume esa referencia antes del await y toma su ticket del WeakMap. Los dos INSERT SELECT y el SELECT comparten condiciones SQL de la spec, incluidas n.ms real, cerca original, owner/revisión, grant/auth actuales, scopes exactos y todos los techos. Evento issued_at es n.ms y expiry es el permiso absoluto del ticket.
+
+  Errores/ACK desconocido de mutación se sanea/rechaza y bloquea futuros writes de avisos en esa instancia/identidad. RETURNING vacío es no_mutation; nunca recuperar éxito tras excepción. Conservar la Promise real con c.wait/query existentes y no afirmar cancelación física. No añadir journal, callback, schema repair o sender.
+
+- [ ] **Step 4: Ejecutar GREEN y regresiones afectadas una vez, en cloud.**
+
+  `node --test test/mcp-qa-finite-preparation-notice-native.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs`
+
+  Esperado: cero fallos y cero skips en esos archivos. Las ramas originales de fixture siguen sin instalar esquemas de avisos y todos sus métodos/regresiones conservan comportamiento. Inspeccionar especialmente close/reconcile fresh-first-primary, testigos originales, expiración nativa y unknown/held ACK. Una prueba hostil que pasa porque el método falta o no se alcanzó su gate es inválida.
+
+  Ejecutar lint con instalación existente:
+  `node node_modules/eslint/bin/eslint.js lib/mcp-qa-finite-preparation-issuer-store.mjs test/fixtures/finite-preparation-issuer-worker.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs`
+
+  No full npm CI, descarga de herramientas ni compiler estándar adicional si diff/import graph sigue unmounted y sin nuevas dependencias de producción. El bundle nativo de la fixture se compila en los tests. Si aparece una dependencia/graph change inesperada, registrar el bloqueo de alcance para root; no arreglarla ampliando esta tarea silenciosamente.
+
+- [ ] **Step 5: Verificar el diff y escribir el recibo acotado.**
+
+  Comparar con HEAD exacto activado por root. Sólo store/fixture/nuevo test pueden cambiar en producto; cuerpos SQL/métodos/esquemas/exports antiguos y db/*.sql permanecen intactos. Añadir el informe de implementación indicado con BASE/head/tree, RED/GREEN reales, comandos/counts/skips/warnings, límites/gates alcanzados y empates de ceilings. Separar caller DATA de identidad real y componente de fuente operativa. Fuente ceiling vencido, post-token ACK gap y demás dependencias siguen pendientes.
+
+- [ ] **Step 6: Commit por expected-head y revisión independiente de root.**
+
+  Commit candidato `feat(afw): fence native preparation notice store`, exclusivamente en rama aislada autorizada y expected-head CAS. Root revisa diff/casos/evidencia antes de aceptar. No merge/main/publish/mount ni acción de proveedor. Si root rechaza una condición de SQL/testigo, devolver el componente a corrección; no ejecutar unidades downstream.
+
+
+## Entrega y límites
+
+Status DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT o BLOCKED. Informe: BASE/codeHEAD/reportHEAD/tree, archivos/lineas, RED/GREEN run/job/attempt/SHA exactos, comandos/counts/fail/skip, lint, warnings completos saneados, número de compilaciones fixture/estándar reales y grafo, prueba de métodos/esquemas anteriores intactos, gates alcanzados, empates de techos, ACK incierto/Promise retenida, restricciones y pendientes. No etiquetar una falla fixture como RED ni prueba hostil como positiva si no alcanzó el gate. Final al root sólo status/SHAs/una línea de tests/concerns; reporte detallado en GitHub. Conservar evidencias parciales si bloqueo; no reconstruirlas repitiendo suites ya cualificadas.
+
+Root revisa diff completo BASE..HEAD e informe y despacha revisión independiente. Este componente no acredita fuente humana, avisos reales, token→avisos, journal/receptor, tercero CLOSED, own SEND, full setup/cleanup, montaje, ARM, suscripción/entrega útil/retirada nativa o PC-off. operationalReadiness=false; completePackage=false; PCoff=false. MinorD0.3 precisión de errores OAuth y Minorfanout cleanup fixture están diferidos en docs/superpowers/progress/2026-11-05-deferred-review-minors.es.md; se triagean al final de rama, no se amplía esta tarea para corregirlos.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-06-finite-native-first-connection-publication-task3.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-06-finite-native-first-connection-publication-task3.md b/docs/superpowers/briefs/2026-11-06-finite-native-first-connection-publication-task3.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-06-finite-native-first-connection-publication-task3.md
@@ -0,0 +1,441 @@
+# Task 3 — native first connection and actual downstream — Root execution brief
+
+ACTIVE for this task only, 2026-11-06. This brief supersedes the historical OWNER STOP and plan INACTIVE label for Task3 only: Gabriel resumed with “continua”. Tasks1/2 and Link are accepted; do not redo them. ROOT provides BASE separately after this brief/progress documentation is committed. Do not choose another HEAD.
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=GitHub SOURCE branch feat/finite-native-cleanup-20261101 + GitHub Actions SYN qualifier; ORIGIN=https://github.com/tokenizartinfo-ops/agent-friendly-web; RESOURCE_TYPE=source files and bounded SYN CI; RESOURCE_ID=explicit branch/paths below; ALLOWED_ACTION=Task3 SOURCE implementation/tests/report only; ROLLBACK=preserve accepted BASE and own commit/blob/parent log, file-SHA CAS of own files only on this branch, never force/reset/recreate runtime. No real Cloudflare, browser, tokens, credentials, permissions, OTP, mail, cron, Container, subscriptions, Max, main/merge or operational rehearsal. All readiness/completePackage/PCoff remain false.
+
+## Work mode and ownership
+
+You are the fresh sole Source writer for Task3, gpt-6.1-sol high under mandated superpowers:subagent-driven-development. No helpers/subagents/reviewer of your own, and no unrelated task. Read the skill's implementer guidance, systematic-debugging, test-driven-development and verification-before-completion as applicable. Cloud-only workflow: no local clone, dependencies, builds, tests, generated files or persistent processes. Use the GitHub connector to inspect/write and Actions for execution. Reading local SKILL text is the limited local exception. Do not load all AGENTS.md: the canonical stable instruction section is lines283–364 at blob b67942223e5633011573f2a2165489afd9ff3f67, and Root supplies applicable dated state here. Search narrowly if another instruction becomes relevant; 165k historical AGENTS is not a fresh operational baseline.
+
+Allowed product/test modifications (exactly seven):
+- lib/mcp-qa-finite-owner-native-receiver.mjs
+- lib/mcp-qa-finite-owner-preparation.mjs
+- lib/mcp-qa-finite-owner-phase-context.mjs
+- test/mcp-qa-finite-first-connection-publication-native.test.mjs
+- test/fixtures/finite-first-connection-publication.mjs
+- test/fixtures/finite-initial-entry-world.mjs
+- test/mcp-qa-finite-owner-phase-context-native.test.mjs
+
+Additional execution-only authorization: temporary .github/workflows/afw-first-connection-qualification.yml (absent at BASE; create LAST after each coherent file batch, remove at final code checkpoint); docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; existing docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md. No new code/test/helper paths. If P1/P2 or protected paths need changes, return the concrete discrepancy to Root before editing. Root does not Source-write while you own it. Keep the brief/spec/plan/review ledger immutable; Root owns them.
+
+GitHub GQL mutation fallback is standing: github_update_ref and create_blob returned repeated Internal errors yesterday; do not retry GQL, change authentication or expand permissions. REST contents create_file/update_file/delete_file with explicit repository + exact SOURCE branch; existing file SHA required. RAW UTF8 content arguments (wrapper encodes), no shell injection/base64. Sequential writes; after EVERY write check resulting commit parent equals your previous known HEAD, delta exactly that path, branch ref equals new commit and blob/content matches. File CAS is not branch CAS or multifile atomicity: on mismatch/unknown/interference stop/preserve before retry. Qualifier absent during multifile batches, create LAST. No default branch/null/force/new branch/local CLI token. Record actual parent/tree/path/blob chain. Use replacer FUNCTIONS for source/YAML String.replace; replacement strings can interpret dollar-backtick and dollar-apostrophe in generated code.
+
+## BASE reconciliation and accepted inputs
+
+Accepted Source before Root Task3 docs: 4f5f5f124b55c8b90c424753f00b9e9cf4634c05. Root dispatches exact post-doc BASE. Task2 implementation code checkpoint 3eebf3b1d50d7537c6ae72138a08b44b2b59ee93; final tested e6518da5c696dc8f2050b4a19bbcefba400b6a25; temporary workflow removed780af1412a695b78c1cdc857ed06f5381dc5ddb7. Fresh review Spec PASS/QualityApproved, 0Critical/0Important, accepted in docs/superpowers/reviews/2026-11-06-finite-native-first-connection-publication-task2.es.md (blob56676a4da680288e19a0ead7fb0b28504365c6a6). T1 engine/enrollment interfaces are accepted as-is. Source-only Task2 green55pure+5native+2compiler, material5 separate prior unchanged; no full-corpus claim. Do not repeat accepted work or treat these as Task3 proof.
+
+Current blobs for your seven files:
+P8 e5c345bc01a930d129b20d3b9dd7358e682cb84e
+P9 01ec291de2631a7cd7e527e2a567f44ac6067522
+P10 64039ec709053e2e82faf67ed013399244faee05
+T3 282b5376bb18caed7e8890e4d47fcbc8e3db4ddd
+F1 15d720bf41bd3ecd5f0ef71a70aed936aa5064bf
+F2 f2eb3bd77b11c4d525ff7b1d93cb158109079bf1
+T4 5f9e4b6e05d5febb695e698d1ef4d8bd9e351bad
+Accepted P1 e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb; P2 6eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9. Initial-material local-immutable-script optimization c0ee5315563764979ed2c681c71b2dbc5515203d must remain exact. Do not lower artifact size, coarsen checks or extend source/5s/30s clocks to gain GREEN.
+
+## Root preflight clarifications
+
+1. Build a NEW lineage/capsule starting from final Task3 code. Same compiled initial M bytes go through connection unchanged; no Task2 capsule replay, seeded ConnectionReceipt/ACK/pointer/phaseCurrent, seedPhaseFacts or seedFutureActivation for principal.
+2. SYN actual provider registry already exists in F2. f.mountFirstConnection currently uses rawFinalOptions converted once to mount initial upload; QA bytes remain unchanged. For later connection publication, native Miniflare M config adoption may occur ONLY after the connection POST's actual work/response has completed, and must derive from actual registry upload/pointer with assertions of same compiled bytes/config-only OAuth. Do not reconfigure a running QA request inside provider activation callback; do not manufacture an ACK/receipt/phaseCurrent as mount authority. Preserve existing module/physical references and original clocks. If this cannot be expressed by existing harness within7paths, ask Root with exact evidence first.
+3. T2 native test 'T2 closed mounted conduits cannot authorize business' currently expects signed approveFirstConnection to remain503/pending. That obsolete pending assertion is superseded by Task3 real connection success; replace it with the relevant closed-before-approval/invalid-approval assertions and T3 principal. Preserve ordinary SQL0 and no unauthorized effects. Legacy setup pending contract in T1/transport stays unchanged.
+4. Notice GET/POST can prepare consent in read_consent without ordinary monitoring flag; first connection snapshot.noticeLink=null; later existing Link correlation unchanged. Historical effect deadlines do not become current5s gates for settled history. Real grant.exchanged_at remains native timestamp; no normalization/fallback.
+5. All regression names in the plan were reconciled on current BASE today. Two expand dynamically: GET exact 'owned native hold-before denies bearer continuation and only own stack ACKs'; POST prefix '^native consent correlated DATA denies ' (seven variants). T4 prefixes likewise expand. Link additional focal test fixed as exact 'native notice link factual mismatch denies valid codec and journal data' (whole test and real subcases), in addition to Link in new principal. No invented WIP names or zero-match PASS.
+6. Qualifier maximum3 independent jobs, timeout-minutes15 each, Node22, npm ci --ignore-scripts --no-audit --no-fund, permissions contents:read, checkout persist-credentials:false, NO secrets. A complete new native T3 (including relevant T2 native) ; B T4 + focal GET/POST/D04SDK/Link per plan; C T1/T2 pure+setup3+compiler2 and lint7 changed files. Expected/executed/subtests/PASS/FAIL/CANCEL/SKIP and individual command exit must be captured, not swallowed by tee. No npmtest global, all GET81/POST50/Link31/SDK-fanout, fourth hidden job or arbitrary runtime timeout increase. Report measurements if groups cannot fit; Root decides regrouping, not skipped negatives.
+
+## Deferred debt relevant to this task
+
+Read docs/superpowers/progress/2026-11-05-deferred-review-minors.es.md if precise detail needed. M1 sdkReadCurrent had two old initial fixture failures, not reproduced focal; cause UNKNOWN and not 'fixed'. If it recurs inspect original stack; no sleep/retry/full-run-until-green. M2 RPC/toolchain/disposal warnings remain, ownership unknown; no incidental dependency upgrades. M3 T1 cancellation test lacked second operation while real cancel held: Task3 retained-work tests should assert different LIVE root/second effect refusal and actual settlement (within allowed Task3 path), not widen T1 scope silently. M4 F1 fault profile only toggles OAuth, wrong-profile dead branch: use genuine compiled profile mismatch if testing profile and rename/remove dead ambiguous branches when touching F1, no wrong compiled-profile claim from flag drift. SQLConsentMinor and strict GET cookie debt are already CLOSED.
+
+## Required completion report
+
+Self-review the diff and full Task3 causal matrix, tests and protected paths. Report DONE only if complete first connection plus downstream and bounded regression gates actually pass; uncertainty/unimplemented required cases must be explicit DONE_WITH_CONCERNS or NEEDS_CONTEXT/BLOCKED, never hidden as minor. Root will read skill handling-reports on concerns, and appoint a fresh combined reviewer only after your complete report. Include exact BASE→HEAD, path/blob/tree and sequential-parent log, RED causal evidence, final tested head, full expected/executed counts, actual workflows/jobs/artifacts/hashes/expiry, scope/protected comparisons, original clocks/timings/retained settlement observations, no-seed proof and any limits. Remove qualifier before final code checkpoint. Final report should distinguish SYN metadata revision vs actual Git commit/compiler provenance; no claims of deployed closure/current remote state/native CodexCloud/operational readiness. Stop Source writes after report/progress/readbacks and handoff final SHA to Root.
+
+## Approved global constraints and review focus
+
+## Global Constraints
+
+- operationalReadiness=false; completePackage=false; PCoff=false.
+- C0=I0+900000; C1=C0+180000; fuente 2026-11-03T02:59Z vencida.
+- M y QA conservan root original <=30000 ms. Child <=5000 ms, siempre recortada al parent restante.
+- No refrescar identidad/Access ni I0/C0/C1. childDeadline sólo narrowing del original; nunca now+fresh.
+- El predecessor positivo NO puede proceder de seedPhaseFacts, ACK prefabricado ni escritura directa de effects.
+- Sólo AFW_DELEGATED_OAUTH_ENABLED pasa de false a true. Bytes, módulos, referencias físicas y todos los demás campos son idénticos.
+- Ningún hostname, flag, ruta administrativa, credential o namespace nuevo. Ningún provider/custodia/roles/OAuth/permisos operativo nuevo.
+- Root, child, native holders y Promises reales se conservan hasta settlement; timeout/abort no son physical drain.
+- Ninguna admisión persistida/reanudable, source factory, DTO de autoridad, callback aprobador, raw pair, allowPending, lector público ampliado o HTTP genérico exportado.
+- Faltan datos nativos: fail closed. Rutas finite nunca caen al writer ordinary, incluso con QA ausente o phase no soportada.
+- Notices no requiere NoticeLink como gate nuevo; finite sí. Link presente se correlaciona; primera connection exige snapshot.noticeLink=null según el contrato aceptado que entregue root.
+- Tercer CLOSED, finite_prearm, publicación notices, selección/full setup, ARM, guard, suscripción, entrega y retirada útil quedan fuera.
+- Esquemas/DDL/store/journals/records, SDK/OAuth ordinary/authority, notice body/wire/forwards/receivers, source stubs, bootstrap/material/initial activation/cleanup semantics, perfiles/wrangler y build scripts quedan protegidos.
+- GitHub cloud únicamente para trabajo futuro autorizado: sin clones/deps/builds/tests locales, main/merge, runtime ni acceso a Cloudflare real. Este plan no ejecuta tests, compilaciones, Actions o providers.
+- Qualifier SYN futuro: como máximo tres jobs independientes, <=15 minutos por grupo, sin secrets, permisos sólo contents:read. Root fija BASE, alcance y qualifier antes del primer dispatch; ningún workflow nuevo implícito en el filemap.
+- No repetir suites aceptadas sin riesgo del delta; no sleeps/retries para ocultar fallos, no ampliar plazos ni quitar rechecks para lograr GREEN.
+- Rollback SOURCE sólo commits propios con CAS y protected blobs; nunca borrar journals, tickets, grants, version history o material original para ocultar incertidumbre.
+
+## Review Focus
+
+1. Un request finite malformado o QA inaccesible podría caer al SQL ordinary: Task 2 posee “T2 finite dispatch never falls through ordinary”, con espía antes de SQL y cero efectos.
+2. Una respuesta fallida puede bloquearse en cancel mientras otro request entra: Task 1 posee “T1 known failure retains real cancellation”; Task 3 posee “T3 retained work blocks a different live root”, con settlement observado y lease nueva vigente.
+3. Un ACK ajeno con hashes válidos podría lavar un efecto parcial propio: Task 3 posee “T3 resealed foreign publication is not own completion”; codecs válidos y rechazo del correlador antes del siguiente SEND.
+4. La extracción puede alterar tiempos, claves o volver a consumir enrollment: Task 1 posee “T1 enrollment preserves literal chronology and one shot”, con secuencia exacta, Ack preparado en el punto original y consumo antes de await.
+5. El positivo puede compilar M ordinary o cambiar bytes después de fijar cápsula: Task 2 posee “T2 initial artifact already contains fixed finite dispatch”; Task 3 posee “T3 same initial bytes produce connection and downstream”, con hashes/metafile y ningún predecessor seeded.
+
+
+
+## Exact Task3 requirements and scoped regression plan
+
+## Task 3: Producir connection en la continuación humana y consumir su receipt
+
+**Files:** modificar P8/P9/P10/T3/F1/F2/T4. No nuevos paths. P1/P2 se consumen tal como Task 1; si su contrato necesita modificación, detener y devolver la discrepancia a root.
+
+**Interface producida:** P10 exporta handlePrivateQaFiniteOwnerConnection({request,env,ctx},originalLease) → Promise<Response>; sólo P8 lo llama. P9 amplía continuePrivateQaFiniteOwnerChoice para POST usando el reader factual léxico de P10; no se transporta ese callback por request/RPC. Reader conserva forma pública {source,preconnectionId,capsuleHash}. Sin pair/expected/admission/baseline aportados por caller.
+
+**Fuente y estados:** P10 obtiene bootstrap/resident bytes/primarias/backup desde recursos existentes, verifica actual QA/M, owner, Access, sourceRevision/tree, initial plan/capsule/alarm y roles originales. Candidate copia baseline exacto salvo OAuth false→true; rollback inmediato e histórico recuperables/hash verificados. Consumo de admission y adopt stage-work en la misma root. Reusar helpers de T1 y journals existentes.
+
+Estados privados exhaustivos: approved → enrollment-recorded → enrollment-ack-recorded → upload-send-recorded → upload-native-pending → upload-ack-recorded → upload-observed → activation-send-recorded → activation-native-pending → activation-ack-recorded → activation-observed → receipt-recorded → complete. Otro estado deniega. Own Send/Promise/result/settled/Ack/readback son referencias distintas; no se reemplazan por journal DATA.
+
+- [ ] **1. RED principal nativo:** añadir “T3 same initial bytes produce connection and downstream”. Desde initial CLOSED producido en T2: GET firmado real, cookie y tres campos, POST real; esperar 200 únicamente tras ConnectionReceipt native durable. Assert upload nuevo y activation nueva, orden Send→sync/readback→native result→Ack→sync/readback, config sólo OAuth, bytes iguales y snapshots completos. Luego QA code→M token→MCP/D0.4→notice GET/POST/Link nativo aceptado, sin seedPhaseFacts/seedFutureActivation ni ACK/provider pointer prefilled. Antes de P10 debe fallar por pending sin receipt, no por una aprobación simulada.
+- [ ] **2. RED adversarial causal:** implementar los grupos de la tabla siguiente como tests nombrados T3 (history/current snapshots en T4; restantes en T3), con baseline positivo válido y reseal cuando el objetivo sea correlación. La prueba demuestra cuál primer efecto prohibido no ocurrió; un rechazo anterior de checksum no cubre un predicado posterior.
+- [ ] **3. Ejecutar RED focal:** mismo comando de Task 2, patrón '^T3 ', sobre T3/T4. Separar principal de grupos negativos que ya estaban cerrados; conservar al menos un fallo causal por cada comportamiento nuevo (receipt, propia continuidad, reader parcial seguro).
+- [ ] **4. Implementar entrada humana/fuente:** P8 invoca P10. P9 conserva gramática/action/StageApproval/TicketUse existentes. P10 verifica Access JWT firmado con realm/audience fuente y owner actual, prepara form con cookie original sin renovar, consume admission una vez después de choice status202/stage connection, captura holders y entra en adoptFiniteOwnerRequestStageWork. Sin historial approval como resume.
+- [ ] **5. Implementar enrollment/upload:** aplicar P2 bajo misma child, rechecks del caller entre fases. Upload: full pair→describe fijo→journal.issue recorded→sync/readback→own recheck→actual native Promise/result→Ack recorded→sync/readback→readVersion actual y pointer baseline→full pair. requestHash usa method/describe.path absoluto/body y baseline IDs reales, preservando exactamente la antigua representación ROOT+path. ACK/result desconocido nunca se reconstruye.
+- [ ] **6. Implementar activation/receipt:** nueva child dentro del parent original: full pair/baseline→SEND/sync/readback→recheck→actual activation→ACK/sync/readback→pointer/version/config→ConnectionReceipt finish/sync/readback→full pair final. Receipt y completedAt permanecen dentro de la ventana de activation SEND. Enrollment, upload y activation no reciben plazo fresco para terminar su ACK/receipt.
+- [ ] **7. Implementar expected/observer:** ambos snapshots completos siempre; permitir sólo delta propio explícito de enrollment, effects/writer-head, pointer/config observado y receipt. snapshot.noticeLink null en first connection; mantener la correlación vigente posterior. Public reader, OAuth y notice niegan effects parciales sin receipt; nueva choice niega history consumida, sin backfill. Historial válido conserva deadline en acceptedAt/ACK; lectura posterior exige techos actuales originales, no now<ventana histórica terminada. No genérico else permisivo.
+- [ ] **8. GREEN principal y negativos:** node --test --test-reporter=spec --test-concurrency=1 test/mcp-qa-finite-first-connection-publication-native.test.mjs. Exigir todos los T2/T3 ejecutados, principal completo, cero fail y assertions de settlement observadas. T4 focal y regresiones de abajo también deben pasar. Medir IO/fanout, snapshots, bodies, graph/hashes y tiempos originales; no reclamar fit si excede 5 s/30 s.
+- [ ] **9. Commit y revisión:** commit “feat: produce native first connection from original owner approval”. Revisar spec/resultados/causalidad/protected blobs y deuda SDK antes de cierre. Receipt/UI sola no cierra la tarea: predecessor real debe alimentar continuidad downstream aceptada. Sin siguiente unidad, mount operativo, main ni deploy.
+
+### Casos T3 obligatorios y asserts propietarios
+
+| Nombre test o familia | Variantes y asserts |
+| --- | --- |
+| T3 identity and choice cannot mint admission | firma/issuer/audience/subj/expiry/owner/revisión/Access menor; cookie/Origin/handle/projectRef/decision; assert TicketUse=0 y SEND=0 para entrada inválida |
+| T3 admission cannot cross lineage or resume | otra ctx/env/root/lease, doble consumo, finish/restart, approval DATA histórica; assert provider POST=0 en nueva petición |
+| T3 source and rollback must be recoverable | QA/M pointer/module/config, bytes/tree/hash, placeholder metadata, secret inherit/value/physical IDs, Backup/chunks/manifest/retainedIds; assert upload SEND=0 |
+| T3 enrollment unknown cannot upload | held/lost transaction/sync/readback, doble método, alarm/ownerRows drift; assert upload POST=0, conservar filas |
+| T3 upload uncertainty cannot activate | existing/unknown/held SEND, lost/late/malformed result/reconciliation/body/cache, version/config incorrectos, pointer cambiado; assert activation SEND/POST=0 |
+| T3 activation uncertainty cannot finish | existing/unknown SEND, lost/late result, foreign deployment, pointer/percentage/config/version divergentes; assert receipt=0, sin segundo POST |
+| T3 final readback cannot turn uncertainty into success | finish/sync/readback/final pair desconocidos o drift; assert status!=200 y evidencia durable preservada |
+| T3 resealed foreign publication is not own completion | source/owner/preconnection/context/baseline/module/config/writer-head/version/deployment/receipt links alterados con hashes válidos; comprobar validación codec previa y cero siguiente SEND |
+| T3 original deadline fences each native boundary | body/source/transaction/provider/ACK/receipt con deadline original agotado, reloj hacia atrás, lease holder drift; sin nueva ventana ni retry |
+| T3 retained work blocks a different live root | held fetch/read/cancel/SQL/DO/sync, known failure/abort; segunda root SYN vigente rechazada por scope, no por su propio abort; liberar y assert settlement observado antes de assert final |
+| T3 history is factual not replay authority | replay éxito/respuesta perdida, public reader ante cada prefijo parcial, history válida después de 5 s, foreign UUID/prefix; sin nuevo SEND y rows ajenas intactas |
+| T3 current snapshots remain complete | drift owner/revision/source/SDK/issuer/notice/Link entre snapshots; sin normalizar grant.exchanged_at; detectar antes del siguiente commit |
+| T3 same initial bytes produce connection and downstream | principal arriba; post-consent phase no soportada sigue cerrada; native POST jamás alcanza SQL ordinary; no nuevo permiso por Link |
+
+Grupos de dispatch/gramática/cancel de T2/T1 siguen activos. Campos, counts y trace se observan pasivamente; ninguna prueba positiva autoriza mediante probe ni depende de setFirstConnectionFault.
+
+## Regresiones concretas y qualifier futuro
+
+Estos nombres existen en pin 953 y son puntos de selección, no pruebas que ya se ejecutaron aquí. Al reconciliar BASE, verificar nombres/expansiones y conteos reales; cero matches, skip de un seleccionado o salida sin assertions no es GREEN. No sustituir silenciosamente un caso eliminado. Fixtures SYN históricas de las regresiones no cuentan como predecessor del nuevo principal.
+
+| Propietario | Archivo / nombres literales o prefijo anclado | Motivo |
+| --- | --- | --- |
+| T1 | T1 archivo completo; “read_version_current_candidate_and_historical_rollback”; “wrong_role_denied_before_mutation”; “actual consumed owner approval without original native cleanup capsule remains pending and has no SEND/POST” | engine/old admission y rollback |
+| T1 | test/mcp-qa-finite-policy-setup-native.test.mjs: “Task4 actual native wrapper DO store and two-effect engine installs only actual ACK versions”; “Task4 lost activation ACK cannot produce installed receipt or repeat effects”; “Task4 held nested hydration retains original lineage after response until actual settlement” | segundo consumidor engine |
+| T2 | test/build-finite-native-package.test.mjs: “actual compiler staging hashes final bytes and retains source classes without eligible manifest”; “missing_factory_blocks_package” | mounts/residencia y completePackage cerrado |
+| T3 | T4: “closed source keeps original A and stable original context”; “original approval and enrollment stay closed without publication”; “settled first connection derives read_consent from exact primary state”; prefijos “unknown SEND denies”, “retained original backup denies”, “actual current module and profile independently deny”, “original retained read blocks foreign root until actual settlement”; “fresh QA pointer drift after the first snapshot denies” | observer compartido y partial state |
+| T3 | test/mcp-qa-finite-owner-notice-get-native.test.mjs: “GET acknowledged original after actual QA code M token MCP and D04 reader”; “full empty and totally absent schema preserve reader; GET partial schema fails before journal”; “foreign preconnection and UUID history is neither enumerated nor changed”; “owned native hold-before denies bearer continuation and only own stack ACKs” | frames/schema/lifetime shared |
+| T3 | test/mcp-qa-finite-owner-notice-consent-native.test.mjs: “native consent POST records original decision after actual ticket GET”; “native consent own SQL continuation alone accepts pending SEND”; “native consent captured failure cannot resume commit”; “native consent correlated DATA denies connection” | private continuity/source correlator |
+| T3 | test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs: “D04 actual exchange retains factual read_consent and immutable grant ACK”; “D04 actual exchange then SYN valid native timestamp drift at observation two denies” | actual timestamp y reader común |
+
+Ejemplo de ejecución focal: node --test --test-reporter=spec --test-concurrency=1 --test-name-pattern='^(read_version_current_candidate_and_historical_rollback|wrong_role_denied_before_mutation)$' test/mcp-qa-finite-policy-transport.test.mjs. Usar la misma forma con los nombres de la tabla; registrar expected/executed/PASS. No ejecutar npm test global ni 50 ms fanout/all SDK por obtener métricas.
+
+Qualifier final propuesto, root lo fija tras aceptación Link/BASE:
+1. Job A: T3 nuevo completo (incluye principal y montaje nativo), máximo 15 min.
+2. Job B: T4 y selecciones GET/POST/SDK/Link por delta de frames, máximo 15 min.
+3. Job C: T1/T2, setup seleccionado, compiler/graph seleccionado y lint de paths modificados, máximo 15 min.
+
+No un cuarto job oculto ni repetición de todo el corpus aceptado. Reutilizar compilaciones por hash inmutable dentro de un grupo cuando el harness ya lo permita; no cambiar scheduler/validadores para mejorar tiempos. Si no cabe, root decide con medición qué agrupación proporcional es válida; no extender timeout, suprimir cobertura causal o rebajar los clocks producto. El compiler actual se invoca por sus tests API en checkout cloud verificado; no build estándar indiscriminado, deploy ni completePackage claim.
+
+Root mantiene deuda explícita baselineSdkReadCurrent: dos fallos iniciales no reproducidos en focales. No se atribuye causa aquí. Reconciliar los casos concretos y evidencia que root entregue junto al BASE; no sleeps, retries ni marcar resuelto por un nuevo GREEN ajeno. Link nativo se verifica en el principal y mediante su caso seleccionado confirmado en BASE, sin inventar hoy un nombre WIP o ampliar gate notices.
+
+
+
+## Approved design (requirements source, not a new direction)
+
+# Primera publicación connection nativa: despacho inicial y cierre SOURCE
+
+2026-11-05 — **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED OPERATIVAMENTE**.
+
+Diseño aprobado en alcance por root, pendiente de lectura/preflight/BASE de ejecución. No es un plan ni autoriza implementación, Actions, provider, credenciales, mount operativo, main/merge o renovación. Inspección inmutable 953e7af1fc20b59c59d8e4a03dcf398d98165cf5. POST aceptado SOURCE en f62b6c8b; Link está fuera del pin como implementación y deberá reconciliarse únicamente cuando root entregue su aceptación. No seguir WIP.
+
+Repositorio público tokenizartinfo-ops/agent-friendly-web (1347578006). Este documento se guarda por GitHub connector en docs/finite-native-notice-receiver-design-20261105 desde 949418367234d44e7d633be87b12a20702a57d8b. Sólo documentación; rollback CAS de commits propios.
+
+## 1. Resultado único y decisiones cerradas
+
+La unidad futura debe producir el primer ConnectionReceipt real desde un POST humano: GET de elección → POST firmado/CSRF → aprobación persistida → admisión consumida en esa misma lease → enrollment existente → upload/ACK/readback → activation/ACK/pointer/config → receipt durable y par factual completo. El provider es SYN fijo en laboratorio; D1/DO, JWT, bodies, Promises, compilación y productores son reales. El predecessor positivo NO puede proceder de seedPhaseFacts, ACK prefabricado ni escritura directa de effects.
+
+El módulo canary desplegable contiene desde initial CLOSED el despacho finite. Su script no cambia al instalar connection: sólo AFW_DELEGATED_OAUTH_ENABLED pasa de false a true. Bytes, módulos, referencias físicas y todos los demás campos son idénticos. No editar cápsulas, hashes o manifest existentes para acomodar una compilación nueva. La prueba crea su lineage SYN original con esos bytes desde el principio; no representa renovar un lineage real.
+
+Root eligió connection porque notices-only dependería de una publicación connection todavía sintética. GET-only dejaría elección sin cierre; POST cerrado consumiría admisión irrecuperable. Se reutiliza el motor para notices en una unidad posterior, sin implementarla aquí. Cada etapa futura requerirá su propia aprobación/lease original; no conservar admisión entre peticiones.
+
+El despacho OAuth/notice ya calificado se integra como SOURCE desde origen. Ruling root: notice GET/POST prepara consentimiento, no instala stage notices. Se abre el conduit sólo tras OAuth=true; QA exige read_consent factual, grant/owner/JWT/CSRF/historia/techos. No depende de habilitar el flag ordinary monitoring; por eso no existe ciclo consentimiento→flag. Source/config no válidos, QA ausente o phase posterior no soportada deniegan. Nunca fallback a ordinary SQL.
+
+operationalReadiness=false; completePackage=false; PCoff=false. Tercer CLOSED, finite_prearm, publicación notices, selección/full setup, ARM, guard, suscripción, entrega y retirada útil quedan fuera.
+
+## 2. Evidencia que fija la arquitectura
+
+| Archivo en pin 953 | Líneas o frontera | Blob |
+| --- | --- | --- |
+| lib/mcp-qa-finite-owner-preparation.mjs | 39–45 admisión consume-only;198–261 choice;201–203 seam GET-only | 01ec291de2631a7cd7e527e2a567f44ac6067522 |
+| lib/mcp-qa-finite-policy-transport.mjs | 65–123 enrollment;124–135 owner pending;144–177 engine;181+ setup separado | 2262ae240990a2df6755944aa7958548d8679422 |
+| lib/mcp-qa-finite-owner-phase-context.mjs | 144–151 inventarios;186–219 primarias;350–388 effects/snapshot | f8948c0a2cc41a48773406a64fc9c863226f9b2d |
+| lib/mcp-qa-finite-stage-work.mjs | observe request/factual, adopt y retain | a89baeb2578856dadedf700f9d66e180eb09120e |
+| lib/mcp-qa-finite-owner-native-wire.mjs | target/origin/boundary y operación retenida | 42aa81f82b60bcc66a140f1358784108696f41e5 |
+| lib/mcp-qa-finite-owner-native-bridge.mjs | forward fijo que hoy siempre retorna pending | ccbf1e709a5afb48f80f285b12d7744ddda278ba |
+| lib/mcp-qa-finite-owner-native-receiver.mjs | receiver con holders/body pero negocio pending | c09bd715c0e84dfebde0b27de940886d573ba643 |
+| worker/mcp-own/finite.mjs | default ordinary heredado; clase cleanup preservada | baa374a2ed41cdb637c23357a3d9d5f3e4ae9d0b |
+| worker/independent-closure/finite.mjs | composición SOURCE; DO sin dispatch choice/OAuth/notice | bf32c10f01cd2cc4acda3b9cb4dc81f5eb422149 |
+| scripts/build-finite-native-package.mjs | 38–87 node→M→QA;90–99 complete package cerrado | e8a73ce9f541993657bf8bf4c9bd8d3b02b8598d |
+| lib/mcp-qa-finite-candidate-residency.mjs | reader sin argumentos, bytes/hash/tree compilados | 29373312a0e60ed6ca87ca3952dba751186662a8 |
+| test/fixtures/finite-owner-phase-context.mjs | 46–62 predecessor SYN, IDs/ACK escritos por fixture | f1ddbfff29b1d5e4da4dbf70c649e0df20582b46 |
+
+Contratos protegidos: ConnectionSend/Ack/Receipt y StageApproval existentes; qualifyFiniteOwnerInstalledStage; profile closed_ui/read_consent; policy journal issue/acknowledge/finish y writer-head. El helper de enrollment conserva el writer actual por extracción, no lo rediseña.
+
+El grafo compartido actual es owner-preparation → policy-setup → policy-transport. Entra en M. Por ello policy-transport NO puede importar phase-context ni candidate-residency. Ésta es la razón de separar dos helpers pequeños sin dependencias QA.
+
+## 3. Mapa de llamadas y mounts SOURCE exactos
+
+Grafo elegido:
+
+- M finite default → bridge choice / forward OAuth / forward notice → binding AFW_FINITE_TRIAL_CONTROL, actor fijo afw-own-successor-closure-v1.
+- QA IndependentClosure.fetch → receiver fijo según URL interna → handler correspondiente de phase-context.
+- Nuevo handler connection en phase-context → seam choice de owner-preparation → consumeFiniteOwnerStageAdmission → adoptFiniteOwnerRequestStageWork → fuente/frame léxicos + helper enrollment + engine fijo + journals Connection.
+- policy-transport antiguo y policy setup → mismos helpers compartidos; nunca importan phase-context.
+- QA incluye M residente compilado; M no incluye decoder/residencia QA ni un import de su propia bundle.
+
+### M finite.mjs
+
+Modificar únicamente el default wrapper de este perfil SOURCE, preservando AfwNodeControl, AfwOwnEventNode y sus restricciones legacy. No editar worker/mcp-own/index.mjs ni delegated-oauth-worker/ordinary handlers.
+
+Origen exacto https://delegated-canary.agentfriendlyweb.dev; mismo account/worker/namespace de perfiles existentes. Ningún hostname, flag, ruta administrativa, credential o namespace nuevo. Dispatch por pathname reconocido antes de delegar al worker heredado, de modo que URL/método/origin malformados nunca caigan a ordinary.
+
+| Entrada humana | Dispatch | Gate M adicional |
+| --- | --- | --- |
+| GET/POST /connections/finite-prepare, sin query/hash | forwardFiniteOwnerChoice existente | perfil finite compilado, binding/actor/version capturados; CLOSED o conexión existente se decide en QA |
+| GET/POST /authorize | forwardPrivateFiniteOwnerOAuth existente | AFW_DELEGATED_OAUTH_ENABLED==='true'; gramática existente |
+| GET /monitoring | forwardPrivateFiniteOwnerNoticeGet | OAuth true; QA read_consent actual |
+| POST /monitoring/grant | forwardPrivateFiniteOwnerNoticeConsent | OAuth true; QA decisión/CSRF actual |
+| /connections, /connections/revoke, /monitoring/revoke y métodos no admitidos de rutas anteriores | denegación fija | ningún fallback ordinary |
+
+/oauth/token y /mcp conservan SDK M existente bajo sus gates actuales; se demuestra compatibilidad D0.4 con bindings reales compartidos. No se implementa registro/clientes/refresh como parte de esta unidad ni se amplían rutas ordinary. No abrir rutas finitas por un simple OAuth=true de otro Worker: sólo wrapper finite, origen exacto, bindings/version/actor originales y calificación QA. Todo request finite crea su root de 30 s antes del primer IO; finish en finally después de terminar respuesta lógica, reteniendo trabajo nativo pendiente por el scope existente.
+
+En CLOSED las rutas OAuth/notice deniegan antes de efectos. Choice puede mostrar la decisión sólo si QA califica el initial CLOSED real, fuente/cápsula/alarm/Access/owner vigentes. Su existencia en bytes no habilita conexión.
+
+### QA finite.mjs
+
+Añadir override fetch sólo al IndependentClosure SOURCE. Las cuatro URLs son constantes ya existentes:
+- https://afw-private.invalid/_finite-owner/choice
+- https://afw-private.invalid/_finite-owner/authorize
+- https://afw-private.invalid/_finite-owner/monitoring
+- https://afw-private.invalid/_finite-owner/monitoring/grant
+
+Cada una llama al receiver fijo existente; choice dejará de retornar pending y llamará al nuevo handler. Método de transporte POST exacto; no RPC nuevo, selector de actor ni reader público ampliado. URLs del prefijo finite desconocidas deniegan; fuera de ese prefijo se conserva super.fetch. No cambiar default QA, workflows, alarm ni métodos iniciales.
+
+Los receivers crean la raíz QA local recortada al boundary M original, no una nueva ventana. Metadata de transporte es DATA: la identidad se verifica con JWT y la fuente con primarias/holders. QA comprueba versión M recibida contra pointer inicial real al entrar; tras su activación propia conserva esa versión de entrada como hecho histórico, no la reescribe para igualar el nuevo pointer.
+
+## 4. Choice y admisión humana
+
+Nuevo export de entrada fija en phase-context:
+handlePrivateQaFiniteOwnerConnection({request,env,ctx},originalLease) → Promise<Response>.
+Sólo estos argumentos; sin source, bytes, expected, admission, callback ni flags caller. El receiver choice lo invoca una vez. El root debe estar registrado y pertenecer al request original.
+
+Reusar continuePrivateQaFiniteOwnerChoice/choice. Se amplía el seam interno GET-only para admitir POST; el handler construye su reader factual léxico fijo y exige phase closed_ui/action connection. No se añade callback a HTTP/RPC ni un nuevo constructor de source. El reader interno existente sólo entrega {source,preconnectionId,capsuleHash}; pair/expected permanecen privados. preparePrivateQaFiniteOwnerChoice antiguo conserva su interfaz y resultado; este cambio no habilita su publicación genérica.
+
+Gramática choice en native-wire: origen/path/método exactos, GET sin body/query/hash; POST application/x-www-form-urlencoded, bytes <=1024, UTF-8 válido, escapes válidos y exactamente handle/projectRef/decision=approve, únicos y hex64 según choice. Cookie prepare única, handle matching; cookies ajenas válidas no son credenciales. Aplicar validación estricta de cookie-list equivalente al contrato POST aceptado, privada y sin parser configurable. Reusar lector real de 1024 bytes de notice-consent-body bajo alias local para POST choice; no cambiar sus métodos ni su semántica. GET usa lector acotado existente y exige cero bytes.
+
+Access firmado por verifyCloudflareAccessJwtWithExpiry, realm/audience de fuente; ownerSelection original, D1 first-primary owner/revisión, client/resource y periodo original. Origin exacto y CSRF handle/cookie/projectRef/decision se comprueban antes de consumir Ticket. Ningún permiso se deduce de subject en un DTO ni de callback.
+
+GET devuelve HTML fijo con goal/expiry y form de tres campos de choice, cookie __Host-afw-finite-prepare Secure/HttpOnly/SameSite=Strict/Path=/, Max-Age recortado. Renderizar sólo enums/hex/tiempos calificados; no IDs internos de provider/journal ni body upstream. POST mantiene cookie requerida por OAuth, no renueva expiración. POST retorna 200 sólo después del receipt/final pair; fallos 503 o error de entrada acotado. Texto: configuración de lectura preparada; lectura/avisos siguen decisiones separadas. No “suscripción lista”.
+
+M bridge debe transportar sólo HTML/headers permitidos de esa respuesta QA, con body <=16384 y no-store/CSP/referrer policy; no mantener el actual “siempre pending” en éxito, ni reflejar headers arbitrarios. Response no exitosa nunca se transforma en éxito.
+
+Tras choice POST status202, el handler exige stage==='connection' y preconnectionId original; consume admisión UNA vez bajo originalLease. Guarda el objeto exacto sólo en scope léxico y adopta stage-work existente. Resultados StageApproval/TicketUse no permiten reanudar tras finish/restart. Baseline de nueva elección/publicación deniega efectos/enrollment previos o aprobación connection ya consumida; GET público no se convierte en ruta de reintento de una publicación parcial.
+
+## 5. Fuente concreta sin factory ni DTO de autoridad
+
+Toda calificación ocurre dentro del handler junto a observeOwnerPhasePair. No implementar un source registry ni abrir readPrivateQaFiniteConnectionSource a valores caller: el stub antiguo permanece cerrado. El nuevo productor tiene fuente fija léxica, no una segunda vía configurable.
+
+Capturar ctx/storage/actor, namespace/self methods, RELEASE_DB/withSession/prepare, QA metadata, reader/publisher bindings, fetch y root/child. assertCurrent del scope comprueba identidad de referencias, expiraciones, failed absorbente y lease vigente antes/después de awaits. M/QA y DB/KV/DO se verifican con los validadores existentes, no sólo igualdad de env strings.
+
+Hechos originales:
+- readPrivateQaFiniteCandidate() y bootstrap expectations sin argumentos: sourceRevision/tree/program/bytes/hash exactos.
+- cápsula, initial plan/zero state/arm/activation completion, alarm C0, snapshot/source/ticket/approval originales.
+- ambos snapshots completos, owner real; current QA pointer/module/profile y M pointer/module/config.
+- reader/publisher IDs y expiraciones exactos del plan, comprobados por primarias; no asumir custodia actual desde el último informe.
+- ausencia de issuer/SDK/notice/grant/connection y effects al comienzo de primera conexión. Nada global/latest ajeno. Inventarios originales conservan caps.
+
+Paquete privado local del efecto (DATA, nunca exportado):
+baseline={versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,module:resident.module,configuration:plan.configuration}.
+candidate={module:resident.module,configuration:clone(baseline.configuration) con sólo OAuth=true}.
+bytes.baseline y bytes.candidate son copias defensivas del MISMO resident.bytes.
+rollback se obtiene del Backup/Chunks original exacto, con descriptor/hash/config/version/deployment históricos; nunca del último pointer.
+
+El baseline CLOSED inmediato es recuperable mediante plan/capsule/residencia con hashes exactos; el histórico mediante Backup/chunks/retainedIds. Antes de SEND se reconstruyen y comparan ambos materiales y se verifican las versiones/pointers necesarios. No se crea nueva tabla/registro de backup ni se sobreescribe el histórico. El snapshot/plan/capsule y bundle fuente preservados permiten reconstrucción factual, no autorización automática de rollback.
+
+El delta candidate exige igualdad completa salvo AFW_DELEGATED_OAUTH_ENABLED false→true. qualifyFiniteConnectionProfile(read_consent) adicional; monitoring flag permanece false y policy vacía. Módulo igual, flags restantes CLOSED, bindings físicos/Access/limiter/secret references exactos. Secret metadata sólo {name,type}; wire usa inherit del baseline CLOSED inmediato verificado, nunca valor de env ni BASE histórico hardcoded. Si falta material/hash/metadata válida, cero SEND.
+
+No mover sourceRevision/tree/capsule al nuevo commit por normalización. Cambiar este software obliga a construir la nueva prueba SOURCE desde su initial CLOSED propio. Promoción real/actualCloudSourceProof sigue separada y no puede utilizar el ceiling vencido.
+
+## 6. Helpers compartidos: firmas y ownership cerrados
+
+### Engine fijo, nuevo lib/mcp-qa-finite-fixed-policy-engine.mjs
+
+Extraer fixedPolicyEngine de policy-transport, conservando validadores/body limits y referencias capturadas. API interna:
+createFiniteFixedPolicyEngine({ctx,env},guard) → objeto frozen con:
+- describeUpload({configuration,baselineVersionId,bytes}) → DATA {method:'POST',path,body}; path literal de versions?deploy=false.
+- upload({configuration,baselineVersionId,bytes},lease) → Promise<resultado provider validado>.
+- describeActivation({versionId}) → DATA {method:'POST',path,body}; path literal de deployments.
+- activate({versionId},lease) → Promise<resultado provider validado>.
+- readPointer({versionId,deploymentId},lease) → Promise<void>.
+- readVersion({versionId,module,configuration},lease,closed=false) → Promise<metadata verificada>.
+
+No export de http(method,path,body), ROOT configurable, credential, transport callback ni wire de destino libre. ROOT/account/worker y métodos quedan literales dentro del módulo. describe sólo calcula el mismo body que ejecutará la operación; source/requestHash compara su canonical completo. upload/activate reconstruyen ese body fijo, validan UUID y material acotado, no reciben body/path externos. guard es exclusivamente el current-check léxico de los dos producers internos enumerados, no un verificador de permiso. El módulo no se reexporta desde entrypoints públicos ni acepta una aprobación por callback: admisión y fuente se consumen/verifican en cada producer antes de entrar. Engine y describe no fabrican capability. La existencia de estas operaciones internas no autoriza a otro caller a invocarlas; sólo el transporte setup existente y el handler connection las componen con sus controles originales.
+
+No dependencia en phase-context/residency. policy setup adopta estas operaciones fijas manteniendo payloads/paths y resultados actuales; no cambia su admisión ni Policy records. Cualquier diferencia de wire o captura es regresión, no refactor inocuo.
+
+Retener el trabajo real fetch→body read→cancel antes de races. Error conocido se señala sin esperar indefinidamente cancel, pero su completion real sigue retenido. Puede implementarse first-failure interno/race sin callback aprobador: sólo resolución normal del trabajo completo entrega resultado; fallo queda absorbente. No convertir Promise del timeout en “settled native”. Capturar fetch/tokens/holders y comprobarlos en cada borde. Límite de respuesta existente 4718592, sin redirects/cache inesperada; secret content/exports reconciliation desconocidos deniegan. Ningún log de tokens, script o body.
+
+### Enrollment fijo, nuevo lib/mcp-qa-finite-preparation-enrollment-writer.mjs
+
+Firma exacta:
+prepareFinitePreparationEnrollmentWrite(
+ {ctx,env,preconnectionId,stageApprovalHash,ownerSource,baseline,baselineBytes},
+ childLease,
+ childDeadline
+) → Promise<{recordEnrollment(),recordAck()}>.
+
+ownerSource/baseline son DATA copiada y validada, no source factory ni boolean de aprobación. El helper no consume admisión ni concede SEND. baselineBytes se copia defensivamente, verifica descriptor/hash, nunca se loguea/persiste/serializa. Captura nativos/anchors/ownerRows del código actual; no expone setters, ctx, source callback ni pair.
+
+childLease es la MISMA child capturada; childDeadline proviene de su apertura original, se recorta por sus límites/C0/pre/Access/approval y nunca por now+fresh. El objeto existe y se consume en la misma continuación. Se consume cada método antes de su primer await/efecto; segundo intento/orden incorrecto/fallo desconocido deniega.
+
+Orden exacto comparado con transport:65–123:
+1. Caller source/current antes de preparar; helper captura y valida anchors, ownerRows, baseline bytes y construye Enrollment/issuedAt/deadline igual.
+2. Caller source/current antes de recordEnrollment(). Éste hace la misma transaction, comparaciones de bytes/ausencias, append→sync→get/getAlarm y readPrivateQaFinitePreparationCleanup; exige enrollment exacto y ack null. Prepara en privado el Ack/acknowledgedAt en el mismo punto original, antes del siguiente recheck.
+3. Caller source/current antes de recordAck(). Éste persiste sólo ese Ack, repite transaction/sync/readback y lectura cleanup final; exige hash exacto.
+4. Caller recheck después de cada resultado; cada método retorna sólo los records factual verificados necesarios para expected.
+
+Keys, contenidos, chronology, alarm, zero state, exclusión de effects/otras etapas y comparación original en transaction no cambian. No regenerar Ack tras unknown ni aceptar existing como recuperación. El helper retiene IO reales en el mismo stage-work. El old transport conserva sus qualified calls en estos mismos puntos y termina pending como antes; nuevo handler ya consumió admisión y aplica sus rechecks. No duplicar las ~60 líneas ni importar QA en el grafo compartido.
+
+## 7. Observer y transiciones propias: ninguna autoridad transportable
+
+El reader común podrá describir prefijos connection parciales válidos como hechos; no calificarlos como instalados. Lector público de tres keys y entradas OAuth/notice exigen receipt connection completo como antes. En particular, effects no vacío sin receipt válido deniega en el reader público; nunca se proyecta closed_ui a partir de un journal parcial. PUBLIC no permite pending. Nuevos requests choice requieren baseline inicial limpio, por tanto no reanudan esas filas.
+
+Sin parámetros allowPending/expected/tolerate a APIs exportadas. El handler conserva referencias propias; el observer interno sólo devuelve facts privados. Extender el decode de effects a los estados estrictos del journal, con whitelist exacta por identidad connection original. No stages notices/finite, Failure desconocido, escritor ajeno ni extra rows. El writer-head debe ser el último SEND esperado, no cualquier ACK.
+
+Estados léxicos exhaustivos del productor:
+approved → enrollment-recorded → enrollment-ack-recorded → upload-send-recorded → upload-native-pending → upload-ack-recorded → upload-observed → activation-send-recorded → activation-native-pending → activation-ack-recorded → activation-observed → receipt-recorded → complete.
+Cualquier estado no enumerado deniega. Los dos native-pending no admiten recheck que convierta hechos externos en resultado propio. Errores de cualquier etapa fijan failed y cierran la continuación.
+
+Referencias separadas: ownAdmission; actual enrollment operations/results; ownUploadSend/actualUploadPromise/actualUploadResult/uploadSettled/ownUploadAck; ownActivationSend/actualActivationPromise/actualActivationResult/activationSettled/ownActivationAck; actual receipt write/sync/readback. Nunca sobrescribirlas con lecturas de journal. ACK se construye sólo de resultado nativo normal observado aquí.
+
+En cada recheck permitido, primero verificar coherencia de esas referencias y luego ambos snapshots completos contra expected. Aplicar a expected sólo la mutación comprobada:
+- enrollment/ack: records.enrollment, anchor.enrollment, installed.enrollment/ack.
+- SEND/ACK: records.effects + anchor.effects, orden/list y writer-head exactos.
+- activation observada: physical.pointer/currentConfiguration y derivación exacta qaSdkBindingFacts de metadata ya verificada; baseline inicial/sourceBase/capsule/QA permanecen iguales.
+- receipt: installed.receipt y receipt raw en effects.
+Todo el resto debe permanecer byte/canonical exacto, incluidas filas actual grant.exchanged_at y snapshots de owner/SDK si corresponden; no copiar pair entero como expected.
+
+Mientras upload está acknowledged pero sin activation, pointer sigue baseline. Después de activation ACK, pointer/config pueden ser únicamente los derivados de los resultados propios y candidato exacto. Observer parcial correlaciona upload ACK/version y activation ACK/deployment sin construir permiso; sólo handler con Promises reales tolera sus estados. Si activation result se pierde, no se lee pointer para fabricar ACK/receipt. qualifyFiniteOwnerInstalledStage sólo corre como instalada al existir receipt completo.
+
+El source/factual reader después de completion valida historial ACK bajo su deadline histórico, pero tiempo actual bajo C0/Access/permiso originales; no exige now anterior a cada ventana de efecto ya terminada. Esto preserva continuidad sin backfill.
+
+## 8. Secuencia temporal de efectos
+
+M y QA conservan root original <=30000 ms. Capturar entrada antes de leer bodies/source. Parent narrowing por Access firmado actual, pre/approval, C0 y expiraciones reader/publisher; no refrescar identidad/Access ni I0/C0/C1. Child <=5000 ms, siempre recortada al parent restante. C0=I0+900000; C1=C0+180000; fuente 2026-11-03T02:59Z vencida.
+
+Enrollment completo cabe en una child: source checks entre fases, helper y readbacks; no renovar para su Ack.
+
+Upload child: source/full recheck → describe request exacto → journal.issue recorded → sync/readback SEND → recheck propio → native upload → validar UUID/reconciliation → journal.acknowledge recorded → sync/readback ACK → readVersion candidate real y comprobar pointer baseline → recheck completo. SEND.issuedAt/deadline capturan esta child, requestHash usa dominio afw.finite-policy-request.v1 con method, path absoluto ROOT+path, body y baselineVersionId/baselineDeploymentId del request real, conforme engine actual. No retry ante unknown. Si los costes no caben, fallar y reportar; no reducir checks.
+
+Activation usa otra child dentro del MISMO parent/admisión, con plazo propio antes de SEND: source/current/full recheck y pointer baseline → issue/sync/readback → recheck → native activation → ACK/sync/readback → pointer/version/config reales → construir ConnectionReceipt → finish/sync/readback → par completo final y guard. completedAt y receipt finish deben seguir dentro del deadline de activation SEND. No trasladar receipt a nueva child para ganar tiempo.
+
+ConnectionSend campos existentes; identity={kind:'connection',preconnectionId,sourceRevision,stage:'connection',effect}. contextHash existente {preconnection,stageApproval,predecessors:[],grant:null,notice:null}. Receipt contiene baseline CLOSED IDs, versionId devuelto por upload, deploymentId devuelto por activation, moduleHash residente igual, configurationHash del candidato y completedAt real. Codec/hash existente sin campos nuevos.
+
+Durabilidad: journals no incorporan sync; el coordinador retiene sync capturado y readback exacto tras cada issue/ACK/finish. Requiere recorded. Las Promises de source/SQL/DO/provider/body/cancel/sync permanecen retenidas aunque gane timeout/abort. Estado durable incierto se conserva, sin borrado/compensación automática. stage-work sólo exclusión local, nunca physical drain o mutex distribuido.
+
+## 9. Filemap cerrado para convertir en plan
+
+Producto:
+1. worker/mcp-own/finite.mjs — wrapper dispatch SOURCE inicial, clases preservadas.
+2. worker/independent-closure/finite.mjs — dispatch fetch DO interno fijo.
+3. lib/mcp-qa-finite-owner-native-wire.mjs — gramática choice y respuesta acotada.
+4. lib/mcp-qa-finite-owner-native-bridge.mjs — forwarding choice con respuesta real validada.
+5. lib/mcp-qa-finite-owner-native-receiver.mjs — delegar choice al handler, conservar boundary/holders.
+6. lib/mcp-qa-finite-owner-preparation.mjs — permitir POST en seam interno existente; sin cambiar métodos ordinarios/decisiones.
+7. lib/mcp-qa-finite-owner-phase-context.mjs — handler connection, fuente léxica, estados factual parciales y finalización.
+8. lib/mcp-qa-finite-policy-transport.mjs — extraer engine/enrollment, old entrypoints conservan semántica.
+9. NUEVO lib/mcp-qa-finite-fixed-policy-engine.mjs — operaciones fijas internas.
+10. NUEVO lib/mcp-qa-finite-preparation-enrollment-writer.mjs — helper factual one-shot.
+
+Pruebas:
+11. NUEVO test/mcp-qa-finite-first-connection-publication-native.test.mjs.
+12. NUEVO test/mcp-qa-finite-first-connection-publication.test.mjs — grammar/wire/graph y contratos puros.
+13. NUEVO test/fixtures/finite-first-connection-publication.mjs — provider SYN registry/control e instrumentación negativa/passiva fija.
+14. test/fixtures/finite-initial-entry-world.mjs — modo dedicado que reutiliza upstream initial y monta bytes reales, sin seedPhaseFacts; conservar los modos previos.
+15. test/mcp-qa-finite-policy-transport.test.mjs — evidencia de extracción literal/fijos y old closed paths.
+16. test/mcp-qa-finite-owner-phase-context-native.test.mjs — parciales públicos cerrados y compatibilidad instalada.
+
+Helpers de test operan sobre f creado; fixture nuevo no importa world y no duplica setup. World importa helpers, nunca inversa. No callback aprobador, verifier fake, source factory ni escritura positiva directa de ConnectionSend/Ack/Receipt. Controles negativos entre invocaciones son sólo DATA; liberación de IO/streams en invocación original con deadline capturado.
+
+Protegidos: schemas/DDL/store/journals/records, OAuth SDK/ordinary handlers/authority, notice body/wire/forwards/receivers, source stubs, bootstrap/material/initial activation/cleanup semantics, perfiles/wrangler, build scripts y flags reales. Graph tests usan compilador existente sin cambiar su criterio ni declarar completePackage. Si la reconciliación Link exige otro path, root ajusta BASE/mapa antes de plan; writer no amplía solo.
+
+## 10. Matriz negativa obligatoria y aceptación nativa
+
+Cada fila exige comprobar el límite causal alcanzado y el primer efecto prohibido ausente. No basta cualquier rechazo previo. Resealed DATA negativos atraviesan codec/hash válidos antes del correlador objetivo.
+
+| Grupo | Variantes mínimas | Criterio |
+| --- | --- | --- |
+| Dispatch M | otro origen/Worker/profile, método/query/hash, ruta no soportada, flags cerrados, binding/actor/version incorrectos | cero ordinary SQL; sin fallback |
+| Dispatch QA | target/método/header extra/duplicate/boundary alterado, otro actor/QA | cero choice/approval/effect |
+| Identidad | firma/issuer/audience/subj/expiry; owner/revisión drift; Access menor | cero TicketUse/SEND |
+| Choice grammar | >1024/UTF8/escape/extra/duplicado/decision, cookie-list inválida o repetida, handle/projectRef mismatch, Origin | cierre antes de aprobación; body/cancel retenidos |
+| Ticket/approval | action/preconnection/source/project/realm diferentes, ya consumido, snapshot cambiado | ninguna admisión reutilizable |
+| Fuente | build/tree/module mismatch, current QA/M pointer/config, placeholder metadata, holders/fetch/credenciales cambiados | cero SEND o siguiente efecto |
+| Config/secret | flag extra, policy no vacía, physical ID/namespace/limiter/Access cambiado, secret value, inherit baseline incorrecto, módulo distinto | no upload |
+| Backup | chunk/manifest/hash/rawconfig/retainedIds/versión histórica ausentes o alterados | no upload; sin fallback latest |
+| Enrollment | unknown transaction/sync/readback, duplicate methods, callback retry, alarm/anchor drift, effects ajenos | no upload; historia conservada |
+| Admisión | otra lease/root/ctx/env, consumed twice, finish/restart, approval DATA prefill | no provider effect |
+| Upload SEND | preexistente/unknown/no ACK de issue, writer-head ajeno, held commit | no HTTP upload |
+| Upload result | lost/late/malformed UUID/reconciliation/HTTP/cache/oversize/body-cancel | no ACK reconstruido ni activation |
+| Upload readback | módulo/config distintos, pointer cambió antes de activation | no activation |
+| Activation SEND | unknown/existing/held, upload sin ACK, context/baseline discordantes | no HTTP activation |
+| Activation result | lost/late/malformed/foreign deployment/held body | no receipt; no buscar para “recuperar” ACK |
+| Activation readback | pointer/porcentaje/versión/config distintos, metadata secret content | no receipt |
+| Receipt | hash/links/times incorrectos, finish/sync/readback desconocidos, recheck final drift | sin 200; conservar efecto durable |
+| Tiempo | parent agotado antes de IO, child durante transaction/body, deadline histórico terminado, reloj hacia atrás | sin renovación/segunda escritura |
+| Pending | held fetch/read/cancel/DO después de abort, otro ingreso con lease SYN vigente | observer scope rechaza el segundo ingreso mientras retiene trabajo; exigir lease SYN nueva y vigente para aislar esa negativa, no lease ya abortada; no inferir drain |
+| Historial | replay después de éxito o pérdida de respuesta; filas ajenas/preparación posterior | sin duplicar ni reabrir; datos ajenos intactos |
+| Downstream | OAuth/notice en CLOSED y después de phase no soportada, native POST frente ordinary spy | sólo fixed QA cuando gates; ordinary SQL nunca |
+| Extracción/grafo | old transport/setup, bytes/wire unchanged, canary sin decoder QA/bootstrap | sin ciclo ni expansión de autoridad |
+
+GREEN principal sin instrumentación aprobadora:
+- Compilar el initial candidate con dispatcher desde origen y retener hashes/metafiles.
+- Producir initial CLOSED con el productor upstream SOURCE aceptado, bajo provider SYN fijo: sin seedFutureActivation ni receipt de activation prefabricado como sustituto. Declarar cuáles entradas históricas previas al upstream siguen siendo SYN; no atribuir a esta prueba un actualCloudSourceProof.
+- M/QA reales con scripts del build, provider SYN registry que registra requests reales y devuelve IDs nuevos; sin asignar f.phaseCurrent desde receipt prefabricada.
+- GET choice firmado real; formulario/cookie; POST de aprobación real.
+- Assert sequence nativa de todos efectos, resultado installed y readback de ConnectionReceipt exacto; ambos snapshots completos y script bytes iguales.
+- Desde ese predecessor producido, recorrer /authorize QA SDK → token M → MCP/D0.4 al menos una vez y notice GET/POST existente por dispatch fijo; no seedPhaseFacts. Esto verifica composición, no nueva semántica SDK/notice ni stage notices. Reconciliar Link aceptado antes del test final.
+- Frente al mismo script initial CLOSED, OAuth/notice deniegan; sobre config connection exacta, preparación de consentimiento llega a QA sin ordinary writer aunque monitoring flag siga false.
+- Preservar source C0/C1/alarm/retainedIds/filas ajenas y todos flags no autorizados.
+
+Provider registry SYN se basa en los bodies ejecutados: upload almacena bytes/config e inherit references verificadas; activation cambia sólo pointer registrado; GET retorna esa metadata. No devuelve “success=true” para saltar guard ni modifica source proofs del producto. Para QA module evidence usar bytes reales de esa composición, no export default{} como sustituto. El montaje del harness no altera artifacts M positivos; instrumentación pasiva/negativa se etiqueta con hashes separados.
+
+Cierre funcional único: receipt de connection nacido del POST original y downstream aceptado consumiéndolo sin predecessor seeded. No cerrar la unidad sólo con UI, approval DATA o tests codec.
+
+Regresiones proporcionales: suites native connection/preparation/phase tocadas; POST/GET/OAuth-D0.4 seleccionadas por mounts y fixture, y extracción policy transport/setup; nombres exactos y no cero matches verificados al crear plan sobre BASE. Reusar evidencia store/journals protegidos salvo fallo concreto. Graph/build finite es necesario por mounts/residencia, no standard build/all SDK/50 ms por rutina. No ejecutar nada desde este diseño.
+
+## 11. Costos, pruebas SOURCE y límites operativos
+
+Medir first-primary/SQL/DO get/list/transaction/sync, HTTP/body/cancel, pares/snapshots, fanout, bytes M/QA/gzip, graph y elapsed root/child en GREEN necesario. No heredar 98/112 ni cifras Link/POST. Pipeline SOURCE puede no caber en 30 s/5 s: se informa fallo causal y estado conservado, nunca se elimina recheck ni se amplía plazo para lograr éxito.
+
+Demostrable con proveedor SYN fijo: identidad JWT/CSRF, causalidad y orden de native Promises/SQL/DO, requestHash/wire, journal ACK de resultado observado, readback/config/module, igualdad de bytes, dispatch sin ordinary fallback, retención y límites de scope. No demuestra Cloudflare real, aceptación efectiva del API con custodia actual, residencia live/source proof, compatibilidad de rollback operativo, permisos, hosting o PC apagado.
+
+actualCloudSourceProof/promoción requieren autorización independiente con revisión exacta y evidencia actual de roles/pins/custodia/bytes/rollback. El ceiling de 3 nov permanece vencido; nada aquí lo rearma. El build global sigue completePackage=false y source authority pendiente. No alarma/cleanup nuevo, no cambio de owner/grant, no claims de suscripción/entrega por receipt.
+
+Rollback SOURCE sólo commits propios con CAS y protected blobs; nunca borrar journals, tickets, grants, version history o material original para ocultar incertidumbre. No restore provider automático dentro de este POST: preserva evidencia y devuelve estado pendiente sin retry.
+
+Root leerá este diseño y reconciliará Link aceptado antes de convertirlo en plan/brief/BASE. SDD futuro: un writer, root spec/quality y revisión autorizada; no ejecución ni agentes adicionales por este archivo.
+

~~~~~~~~~~
