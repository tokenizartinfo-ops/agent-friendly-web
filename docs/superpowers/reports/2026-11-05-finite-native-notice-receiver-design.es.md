# Diseño fuente: procedencia y receptor fijo de avisos finite

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN**. Propuesta para root. Este trabajo no ejecutó pruebas ni implementación y no acepta el store ni otorga permisos.

## Límite y conclusión

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (ID1347578006, PUBLIC); ENVIRONMENT=GitHub docs; ORIGIN=https://api.github.com; RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notice-receiver-design-20261105; ALLOWED_ACTION=pin read +3 docs; ROLLBACK=revert sólo propio commit, expected-head CAS/readback. BASE=7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be; TREE=616d1e6187e652f07c067683a12b40c564da78d8.

Seleccionar **sólo journal/provenance de seis filas**, separando sus datos de autoridad humana. Un receptor completo necesita todavía una extensión interna del lector factual y productores concretos de etapas. El store paralelo aún no está aceptado; sus tres métodos son frontera propuesta. La implementación de este siguiente bloque queda pendiente de lectura/preflight de root y HEAD futuro que incluya el store aceptado.

Diagnóstico previo: docs/superpowers/reports/2026-11-05-finite-native-notice-source-diagnosis.es.md @673813d5f7da9467fe3a527ab810fec7d6f8cc63, blob0e7fa1d201b8393f889c9f52a876ab1d45dbdfd8. Su observación causal permanece: GET ordinario escribe ticket con INSERT VALUES y POST concede consentimiento antes de forward finite. Nada posterior cerca retroactivamente esas escrituras. D0.4 ya está aceptado según el brief y el commit BASE; conservar exchanged_at actual en ambos snapshots y proyectar únicamente el ACK histórico. El pendiente D0.4 del diagnóstico antiguo ya no describe este baseline.

## Evidencia concreta del pin

Líneas y blobs de BASE:

| Archivo / líneas | Blob | Hallazgo |
| --- | --- | --- |
| lib/mcp-qa-finite-owner-oauth-qa.mjs:1–15 | ec5c16161bffc6e6d19de153b4465bf6ae748493 | receptor privado fijo, request real y lease reenviada |
| lib/mcp-qa-finite-owner-oauth-forward.mjs:1–30 | f7979579fcb6d00b3d5d68c7790089c803f4170f | namespace/actor/version fijos; retención de fetch/body; metadata no prueba resultados |
| lib/mcp-qa-finite-owner-phase-context.mjs:108–134,217–243,336–460 | ebebaa9542c2408c0d505d1e23daa946762c1cab | fresh-primary, inventarios cerrados, doble snapshot, identidad y continuaciones léxicas |
| lib/cloudflare-access-identity.mjs:54–84,103–115 | 5f1fb5c2eb843252e1d5207f09fbb75467150021 | firma RS256/issuer/audience, subject y expiry del mismo payload verificado |
| lib/mcp-qa-finite-preparation-issuer-records.mjs:3–44 | 50f9a013580a46ad1d445a240f47b7b2ce887d49 | codec canónico estricto y seis operaciones issuer originales |
| lib/mcp-qa-finite-preparation-issuer-journal.mjs:6–78 | 414450aa08f797bed5a41cf5cc697342785ce16b | holders, transacción, sync/readback, recorded/existing/uncertain |
| lib/dossier-monitoring-owner-http.mjs:42–75 | 9b3a362c0738f5cefc00f8770bc2c099f76d7eee | controles humanos útiles; SQL ordinario anterior al enlace finite |
| lib/mcp-qa-finite-stage-work.mjs:8–28,65–101 | a89baeb2578856dadedf700f9d66e180eb09120e | retiene Promise real; no inventario durable entre isolates |

Spec store blob8e6a62acaa90fe66f067a31c9df1fcf005611285 y preflight root blob7dd199f255b833ab319180ac0d9fa5a85e004247 fijan la composición. SQL originales: db/dossier-monitoring-owner-tickets.sql:1–19, bloba12a8e84e28be554a84bac7d53d9c9d24b04a08c; db/dossier-monitoring-consent.sql:1–20, blobe9962cea0c351f292ebc26a78c2ebb9d78ef9f22.

## Qué existe y qué falta

QA ya obtiene source de doble snapshot y verifica Access, cookie prepare, qualifyFiniteOwnerApprovedTicket y ownerSelection.subject (phase-context:375–389). Existen tupla issuer completa, grant ACK, GrantLink y ConnectionRef. No nuevo grant ni identidad desde JSON, metadata forward, policy.enabled o callback aprobador.

Faltan journal notice, inventario exhaustivo y continuidad factual GET→POST. El lector actual sólo admite claves connection y retorna read_consent; otro namespace no amplía sus cierres. Store exige originalLease y witness privado de observeMonitoringTicket; serializarlo no conserva capacidad.

Store propuesto: insertMonitoringTicket y observeMonitoringTicket reciben ({...Common,ticket}, originalLease); insertMonitoringConsent recibe ({...Common,ticketWitness}, originalLease). Common={identity,expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,window}. Techos DATA; el receptor fijo deberá derivarlos de verificación real. No exponer por HTTP. WeakMap acredita identidad de testigo/lease dentro de instancia, nunca permiso humano.

## Próximo componente: seis filas y semántica

Namespace nuevo afw.finite-preparation-notice.v1:<preconnectionId>:, máximo6/list7. Claves exactas reservation, ticket:send, ticket:ack, consent:send, consent:ack, freeze. No ampliar las14 filas issuer ni8 filas SDK. La reserva conserva identity original, hashes de reservation/ACK grant/GrantLink/ConnectionRef, grant esperado, consumedAt, techo Access clampado y ticket DATA servidor. Es evidencia de correlación; esos hashes no otorgan acceso.

SEND referencia reserva/operación/ventana original. Consent exige ticket ACK previo y checksum de decisión, sin atribuirle prueba CSRF. ACK proviene del resultado real retenido; conserva rowHash y sequence real, nunca expectedSequence+1. SELECT no necesita journal: observe+INSERT comparten store/lease/Common exactos.

Reserva sin SEND no acredita ticket; SEND sin ACK bloquea otro SEND; sólo la invocación propietaria aún viva puede completarlo desde su resultado real; ACK no_mutation termina la progresión; ticket ACK applied admite considerar POST sólo tras controles humanos/SQL actuales; consent ACK applied es historia de escritura, no suscripción ni selección. Freeze bloquea toda nueva progresión. Read devuelve historia incluso caducada con lease de lectura válido, sin crear autoridad. No hay reset, delete, retry, renovación ni constructor de witness.

Sólo status recorded recién recibido permite al productor fijo continuar una vez. existing permite comparar historia; nunca volver a emitir SQL ni recuperar el handle bruto. Error después de commit/sync/readback devuelve uncertain y conserva filas que hayan ganado. Otro store/receptor debe respetar SEND durable sin ACK, incluso si una lectura SQL encuentra fila: esa lectura no reconstruye ACK ni habilita reintento. El journal valida enlaces DATA, no autentica appendAck: esa garantía depende del handler fijo, como en issuer-journal.

## Receptor posterior identificado, todavía fuera del plan

Archivo nuevo propuesto lib/mcp-qa-finite-owner-notice-qa.mjs, factory createPrivateQaFiniteOwnerNoticeReceiver({ctx,env}), fetch(Request). Handler fijo en phase-context reutiliza observeOwnerPhasePair privado y el patrón de recheckOwned léxico; no exportar el par crudo, una factory de autoridad o allowPending. Nuevo wire/forward limitado a GET /monitoring y POST /monitoring/grant del origen canary, destino privado constante https://afw-private.invalid/_finite-owner/monitoring, mismo actor finiteNativeActor/namespace/version. POST de transporte envuelve ambos métodos reales como OAuth; sólo bytes originales, headers permitidos y límites originales. Ningún requestId/sequence concedido por M es prueba de consentimiento.

M futuro reenvía antes del writer ordinario mediante selección servidor fija, nunca sólo por cookie/parámetro. No modificar el host ordinario ni llamar a recordDossierMonitoringConsent. Receiver inicialmente unmounted; rollout separado.

GET: validar grammar/origen y actual Access con la función existente (sin inyectar accessVerifier/now/keySet desde caller); comparar original prepare cookie, approval, ownerSelection, tupla actual y source/publication instalada. Tomar identidad/grant ACK/ConnectionRef del doble snapshot. Access ceiling=min(preconnection.owner.accessExpiresAt,Access GET verificado); nunca ampliar original. Generar handle aleatorio32bytes en stack, hash y requestId. Journal reservation y ticket SEND con transacción/sync/readback; sólo recorded permite insertMonitoringTicket. ACK real→journal ticket ACK→respuesta HTML con cookie HttpOnly/Secure/SameSite Strict y formulario. Fallo tras ticket commit no emite formulario exitoso ni recupera handle desde almacenamiento.

POST: Access se verifica de nuevo; el mismo subject/realm, prepare cookie y tuple original deben coincidir. Origin exacto, Content-Type form y body<=1024; un handle base64url43, sin claves extra/duplicadas; cookie monitoring única y hash idéntico. La acción /monitoring/grant más botón explícito constituye la decisión; GET nunca concede. Revalidar ticket ACK/row y original grant/owner/revisión. Effective Access=min(techo guardado,expiry actual); si ticket.expiresAt supera ese techo más corto, negar sin renovarlo. Observar ticket con nuevo store del POST y lease hija; usar exactamente ese Common/window y referencia witness al INSERT. Grabar consent SEND antes de INSERT; exigir recorded; retener Promise real; ACK de RETURNING y sequence real; sólo entonces presentar resultado acotado. Ni testigo ni cookies/JWT/handle bruto se persisten en journal.

Falta extensión factual interna que lea journal+ticket/evento en dos snapshots iguales y reconozca sólo la transición léxica propietaria con Promise realmente resuelta. Otro RPC pendiente niega; sin allowPending ni snapshots omitidos. El estado no avanza a notices/finite: faltan instalación/approvals específicos.

## Carreras, reducción y límites de afirmación

DO journal y D1 no son una transacción global. SEND durable antes de D1 reduce replay; no garantiza rollback de D1. La cerca SQL original impide escrituras tardías cuando CLOSE gana. Si consentimiento gana, el evento queda; cerrar la cerca no revoca el grant existente. Ruling root5nov, authority:67–84 (blob703b9d3cbb04bc5effff3f4ef8276cdb4cb95803): createDossierMonitoringAuthorization devuelve enabled:true tras CLOSE con grant activo; tras revokeGrant real rechaza con Monitoring authorization unavailable porque el WHERE revoked_at='' ya no encuentra fila. No afirmar enabled:false ni alterar authority. Esa reducción no es retirada humana del consentimiento.

Freeze/timeout no son drain. Retener fetch/body/cancel/SQL/transaction reales; no liberar writer por Promise.race/AbortSignal. SEND sin ACK bloquea tras reinicio; ACK completo tampoco acredita cuerpos pendientes fuera del isolate. Inventario durable, close→reconcile misma fenceRequestId en nueva first-primary→observe UUID original→revoke y readback pertenecen al cleanup posterior. Ningún physicalDrain/restore/publicación desde seis filas.

## Secuencia y aceptación futuras

1. Aceptar store con RED/GREEN nativos y revisión root. Este documento no lo presupone.
2. Journal-only de la spec/plan adjuntos: codecs+DO nativo+fixture SYN que compone métodos reales del store. Ningún producto existente importa el journal.
3. Diseñar/seleccionar receiver fijo+extensión factual interna+wire M aislado. RED debe demostrar ausencia de ruta antes de mutar; GREEN debe usar GET/POST real, JWT SYN firmado verificado, CSRF real y D1 real, incluyendo cola antes de CLOSE y ACK perdido. No JWT mock como prueba humana.
4. Sólo después seleccionar notices stage/tercer CLOSED, tres receipts ordenadas y Selection antes de T0 primario, own-SEND connection/setup y full setup Task2, retirada/cleanup completo. Suscripción, entrega, guard, mount, ARM, hosted y PC-off siguen cerrados.

Riesgos nombrados: autoridad lavada por DTO; eventHash confundido con writer; doble GET que produce tickets; unknownACK reinterpretado; ceil Access renovado; snapshots que borran exchanged_at; trigger/esquema asumido; freeze confundido con revocación/drain. Se mitigan con fuente fija, seis claves exhaustivas, ACK exacto, no replay y tests causales nativos. Límites invariables: C0=I0+900000, C1=C0+180000, padre<=30000, hija<=5000, techo fuente2026-11-03T02:59Z vencido; no nuevo reloj/rearm/renewal. operationalReadiness=false; completePackage=false; PCoff=false.
