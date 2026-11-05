# Audit SOURCE de publicación notices en un circuito único

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Pin inmutable 953e7af1fc20b59c59d8e4a03dcf398d98165cf5; sin WIP Link. Complementa publication-design. Sólo lectura de código y este documento; sin tests, builds, provider, credenciales ni permisos. AFW, tokenizartinfo-ops/agent-friendly-web (1347578006 PUBLIC), GitHub connector; rama docs/finite-native-notice-receiver-design-20261105 desde fc3512d14cbfaf8b4cc62ed062cac06dc5769397. Rollback CAS propio.

## Conclusión

Existen bytes/codecs/perfiles/journals y motor fijo, pero **falta el adapter aprobación→upload→activation→receipt**: composición humana actual, fuente/candidato/rollback, seguimiento léxico de efectos propios y lectura factual notices. Retirar guards o aceptar source DTO no basta.

La unidad end-to-end puede ser más útil que GET-only o POST sin consumidor. Root debe fijar: config-only SOURCE sin afirmar montaje finite, y ubicación conjunta de reader/producer para reconocer su transición. Si se exige flujo humano finite expuesto, config-only no basta: el script actual enruta monitoring ordinario.

notices usa grant/ConnectionRef, predecessor connection y una aprobación humana de configuración nueva. NoticeLink no es requisito de notices; si existe se correlaciona, y finite sí lo exige. El consentimiento previo de avisos no equivale a aprobar publicación.

## Fuentes inspeccionadas y contratos recuperables

Rutas bajo lib/ salvo indicación. Se omite repetir archivos completos del primer informe.

| Fuente | Líneas | Blob |
| --- | --- | --- |
| scripts/build-finite-native-package.mjs | 26–34 inputs;38–87 staging;90–99 paquete cerrado | e8a73ce9f541993657bf8bf4c9bd8d3b02b8598d |
| mcp-qa-finite-candidate-residency.mjs | 3–8 literales;17–37 validación/reader | 29373312a0e60ed6ca87ca3952dba751186662a8 |
| mcp-qa-finite-bootstrap-source.mjs | 1–10 expectativas compiladas | 66aef02dab28ff9e94957f04dfe50b407f2a5e0c |
| mcp-qa-finite-initial-upload-wire.mjs | 14–27 construcción CLOSED;30–48 versión | be1c7d1f25ffd1c6184f6139acb03110b7b148bb |
| mcp-qa-finite-initial-upload-records.mjs | 9–13 Backup/Chunk/Receipt;25–40 pins/secretos | 383665100e5f829edbaf13c0f137b37ae70a1954 |
| mcp-qa-finite-owner-phase-context.mjs | 137–151 backup;162–219 primarias;350–388 etapa/pair | f8948c0a2cc41a48773406a64fc9c863226f9b2d |
| mcp-qa-finite-policy-transport.mjs | 42–135 owner;144–177 engine;181–240 setup | 2262ae240990a2df6755944aa7958548d8679422 |
| mcp-qa-finite-connection-profile.mjs | 8–35 grammar/policy | 8a06c997494a6a0e5ad9f9892a5bf0b38e74a8e5 |
| mcp-qa-finite-profile.mjs | 21–24 perfiles/entradas;25–60 proyección/package | 547eb82f4ec83a2e7bcec88dd18622fc636dc477 |
| mcp-qa-finite-historical-source.mjs | 55,98–102 contenido/secreto | 3f0bf487efd72aa2356fd9982f98a938d328e72d |
| worker/mcp-own/finite.mjs | 1–11 default heredado, sólo withdrawal legacy denegado | baa374a2ed41cdb637c23357a3d9d5f3e4ae9d0b |
| worker/mcp-own/index.mjs | 8,19,98–104 delegated worker | 089e5313eb22d017b8dfe4e6daba73c8c7753cbc |
| delegated-oauth-worker.mjs | 144–147 flag;183–200 handler ordinario | d979f395029c9b1e66a99222d06acf99eba4f358 |
| dossier-monitoring-owner-http.mjs | 61 ticket SQL;71 consent;73 forward posterior | 9b3a362c0738f5cefc00f8770bc2c099f76d7eee |

Stubs relevantes: mcp-qa-finite-connection-source.mjs:1–4, blob 703bada5189efc962e1f81760ff741de518b77b9; mcp-qa-finite-source-authority.mjs:1–6, c2d6947196755bcaf075f8a0fdb60762973d702b; policy-setup-source.mjs:1–12, a2fcb074e71ca5f6d983c8cb8e9e7db993ef27fb. Ninguno admite caller pins/registro como sustituto de fuente/custodia nativas.

## Cómo obtener candidato, metadata y rollback

**Script.** compileFiniteNativeStaging verifica origin/revisión/inputs antes/después; compila node→canary→QA y aloja gzip de canary en QA. readPrivateQaFiniteCandidate() sin argumentos verifica revisión/tree/programHash/bytes/gzip y devuelve copia. Bootstrap expectations liga workflow/CLI/tree; ningún script/path caller.

Staging es completePackage=false/operationalReadiness=false; buildFiniteNativePackage falla deliberadamente por locator histórico/compatibilidad/mounts pendientes. Probar un componente SOURCE no necesita declarar completo ese paquete, ni staging es actualCloudSourceProof.

**Baseline connection.** Observer lee pointer/versión M: módulo byte-exact resident.bytes (207), plan.configuration salvo OAuth=true (205–206). Receipt liga version/deployment/module/config; baseline inicial sigue separado. connection es config-only por código. notices parte de esos IDs exactos, no latest ni initial CLOSED.

**Candidato notices.** Falta builder fijo: derivar connection calificada, cambiar sólo monitoring flag/policy, preservar lo demás. Profile exige grantId/projectId/clientId/startAt/expiresAt, <=600000 ms y techo OAuth; no autoridad. Derivar IDs del grant original y límites de aprobación/Access/grant/ConnectionRef/preconnection/C0. Falta fijar startAt/expiresAt y delta literal; nada por form/Link ni renovación.

Motor reutilizable no implica metadata libre: qualifyFiniteWorkerVersion (lib/mcp-finite-primary-inventory.mjs:13–32, blob be1348f33750a20d02f008c15e5b3cd975d4a60f) verifica bytes/hash, secretos sin valor y DB/DO. Falta componer normalización exacta notices, no relajar hashes.

**Secret references.** metadata conserva secret_text {name,type}. wire transforma a {name,type:'inherit',version_id:baselineId}, con connection verificada. InitialUpload usa BASE histórico hardcoded/closed_ui: no es builder notices. Conservar DB/KV/DO/Access/limiter/exports/containers; ningún valor secreto de env al artefacto.

**Rollback.** Backup/Chunk preservan CLOSED histórico, raw/normalized config, chunks/hash/retainedIds; no backup genérico de connection. phase-context verifica manifest/capsule. Separar baseline inmediato connection de rollback histórico. Resident bytes + plan.config/OAuth + receipt/pins permiten reconstruir connection si hashes coinciden, pero no existe backup connection separado. Antes de efectos demostrar material recuperable bytes/config/IDs y evidencia retenida. Nunca sobrescribir Backup; si no basta, Root debe fijar preservación concreta, no DATA opcional.

Histórico completo tiene ceiling vencido; calificador puro valida contenido, no permiso. readFiniteNativeCustody/qualifyFiniteNativeSourceContext siguen unavailable. IDs/expiry de tokens no reemplazan prueba operativa de alcance/custodia.

## Config-only no equivale a ruta finite

El perfil soporta notice_consent, pero no hay una prueba de módulo notices distinto. Con bytes residentes iguales se puede estudiar un cambio sólo de configuración. Sin embargo finite.mjs exporta default de index; index.fetch usa createDelegatedOAuthWorker; monitoring=true llega al handler ordinario. Éste escribe ticket con INSERT VALUES y consentimiento antes del forward post-ACK, que sigue unavailable. No confundirlo con GET/POST finite pre-SQL aceptados como componentes separados.

GREEN de config/receipt no acredita ruta finite ni protege SQL ordinario. Exponerla exigiría script/mount/grafo/residencia explícitos, no cambiar hashes para pasar ni habilitar host ordinario. Aquí publicación significa futuro laboratorio SOURCE/SYN, nunca provider real.

## Circuito único y API privada: lo que debe resolverse

1. GET emite Ticket notices; POST reusa choice/approved-ticket: JWT firmado/realm/audience, owner/revisión, Origin, cookie/handle/projectRef/decision únicos, body<=1024/source actual. Misma originalLease, sin responder entre aprobación y efecto.

2. choice registra TicketUse/ConfigurationApproval/StageApproval; consumeFiniteOwnerStageAdmission una vez en esa lease. Candidato/backup calificados antes de SEND. Fallo conserva ticket consumido; ni ACK/approval histórica recrea admisión.

3. El contrato actual de connection-source espera {ownerSource,baseline,rollback,candidate,bytes,assertCurrent}, construido internamente. Falta implementarlo y conectarlo con autorización de etapa. No puede ser argumento del handler ni factory registrada. createFinitePolicyTransport sólo admite connection, hace enrollment y retorna pending; createFinitePolicySetupTransport usa otra admisión y PolicyReceipt, no se puede pasarle la lease owner.

4. Reader sólo acepta efectos/pointer connection. assertCurrent de baseline estático deniega SEND/activation propio; permitir journal histórico abre autoridad DATA. Mantener frame y Promise/result propios en continuación léxica antes/después de SEND, ACK y pointer/readback. Pending ajeno/desconocido deniega; sin pair exportado ni transición aprobada por DTO.

API candidata: handlePrivateQaFiniteOwnerNotices({ctx,env,request},originalLease), notices fijo, sin source/candidate/callback. Co-localizar en phase-context choice/admisión/expected/efectos evitaría transportar autoridad. Reusar engine exigiría extracción privada acotada a módulo compartido, targets/protocolo fijos; guard sólo current, no aprobación. Nombre/export del helper pendiente.

Alternativa: orquestar en policy-transport con fuente independiente; debe compartir rechecks/efecto propio sin pair exportado, duplicación ni ciclo. Retornar source DATA no lo resuelve; interfaz pendiente, no persisted authority.

5. Connection journals: kind=connection/stage=notices, upload/activation; contextHash preconnection/StageApproval/predecessor/GrantLink, notice=null. issue recorded antes de POST, resultado real→ACK; unknown/existing/pending no se recupera leyendo. Verificar versión/pointer/config y finish Receipt dentro de activation.SEND.deadline, sin child que extienda plazo; rechecks/durabilidad/readback.

6. Reader final: exactamente dos stages/writer-head, tickets/approvals/journals/config, hashes/bytes/predecessor/actor/version; SDK/exchanged_at intactos. Proyectar notice_consent factual no da permiso de efectos a público3keys/otra petición.

## Viabilidad, mapa preliminar y pruebas

Unidad coherente: aprobación + fuente fija + efectos + receipt, misma admisión. Viabilidad conceptual, no interfaces/grafo/normalización/costo cerrados. GET-only no cierra; POST cerrado consume admisión irrecuperable. No fragmentar automáticamente ni esconder el adapter faltante.

Mapa plausible: phase-context (fuente/frame), owner-preparation/preparation-qa (POST), policy-transport (notices/engine), connection-source si adapter independiente; posible módulo interno engine anticiclo; fixture existente + test dedicado. Profile/records/journals/build/residency protegidos salvo necesidad concreta. Mount humano exigiría otro alcance worker/delegated/grafo. Sin DDL/flags/workflows.

RED causal: aprobación real produce admisión, pero source stub/guard notices impide SEND. GREEN futuro sólo con JWT SYN firmado, CSRF y D1/DO reales, fetch provider SYN fijo, bytes compilados reales y sin callback positivo de autoridad. Dos snapshots, upload→ACK→readback→activation→ACK→receipt; validar que body hereda referencias del baseline exacto y bytes coinciden. Negativos: wrong actor/QA/M/version/tree/module/metadata/secret material/rollback; drift antes/después SEND; lost result, held body/cancel, late receipt, real revoke, replay otra lease. Data resealed debe llegar al correlador, no morir antes en codec. Pruebas de ruta distinguen ordinaria/finite, no presentan lo primero como lo segundo.

Costos por medir: QA/M/credenciales/owner/inventarios + backup/efectos/readbacks/body retention. Fanout original, sin heredar métricas. Parent<=30000 ms/child<=5000; C0=I0+900000/C1=C0+180000; ceiling 2026-11-03T02:59Z vencido. Promise reales retenidas/fallo absorbente; sin drain/retry/renovación ni promesa de fit.

Root decide config-only, estructura sin ciclo y rollback; después Link aceptado, pruebas/actualCloudSourceProof y spec/BASE según alcance. Sin consulta Cloudflare/renovación. SOURCE no prueba notices operativo/suscripción/entrega/retirada/third CLOSED/full setup/cleanup/guard. operationalReadiness=false; completePackage=false; PCoff=false.
