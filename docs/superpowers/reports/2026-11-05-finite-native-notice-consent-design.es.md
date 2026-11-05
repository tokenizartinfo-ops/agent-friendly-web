# Diseño del siguiente POST humano de consentimiento nativo

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Diseño completo para revisión root, no activación. Reemplaza este checkpoint parcial; conserva los informes previos GET/journal. Root reanudó el diseño mientras GET sigue INCOMPLETE con único writer; no se leyó ni siguió su rama WIP.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006 PUBLIC); ENVIRONMENT=GitHub documentación; ORIGIN=GitHub connector; RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notice-receiver-design-20261105; ALLOWED_ACTION=actualizar solamente informe/spec/plan consent; rollback CAS sólo commits propios. BASEdocs82f9d340fd07c094e68dbb80030b92e05971f50c. Pin producto dc4edafc0b5e4ba440cd32a21dd3dd58024e811a/tree91d023ce48bb2f5105140c788d3646c64c20bd4e. Store/journal aceptados por root; GET debe reconciliarse cuando esté aceptado antes de preflight y futuro BASE.

## Decisión concreta

Unidad coherente: POST /monitoring/grant real→M fijo→QA fijo→nueva validación Access/prepare/CSRF→ticket original observado→consent SEND durable→INSERT nativo→ACK desde Promise/resultado real→dos snapshots completos→HTML200. Activa formulario GET sólo SOURCE cuando toda unidad sea aceptada. No POST revoke, NoticeLink, nueva fase, source notices, third CLOSED, mount ni runtime.

Se conserva el transporte GET propuesto ampliando sus tres módulos con exports Consent fijos y helpers privados; un nuevo lector form1024 evita tocar native-wire16384. Un selector interno constante comparte plumbing, pero el caller nunca pasa mode/target/authority. No ordinary monitoring writer: su INSERT VALUES y recordDossierMonitoringConsent ocurren antes del forward y no pueden convertirse en un efecto protegido mediante un certificado posterior.

El ticket GET prueba procedencia factual del formulario cuando se correlaciona con reserva/SEND/ACK/fila original; no representa la decisión humana POST. WeakMap witness vincula observación al mismo store/lease/Common y se consume una vez; no verifica identidad ni CSRF. ACK DATA sólo valida estructura/relaciones. Ningún test que construya seis filas es prueba de SQL o permiso humano.

## Evidencia exacta (todo en pin dc4)

| Fuente | Líneas y hallazgo | Blob |
|---|---|---|
| lib/mcp-qa-finite-preparation-issuer-store.mjs | 41–52: columnas y predicado SQL por UUID original, historia0, grant/fence/window/current owner; 125–150: latch/guard/Common/ticket; 185–210: observe witness y consent RETURNING real | efc25b2af9c80b8eb27cffe219544e974002293e |
| lib/mcp-qa-finite-preparation-notice-journal.mjs | 17–26: Send≤Accessoriginal y ACK<Send.deadline; consent sólo tras ticketACK applied; 35–43 list7/max6; 49–68 recorded/existing/uncertain transaction/sync/readback | b9c15aba18e2442a0ed864b8afd5e86313c5e470 |
| lib/mcp-qa-finite-preparation-notice-records.mjs | 3,8–33: DATA checksums/fields, Reservation/Send/Ack/Freeze; no autenticación | 8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9 |
| lib/mcp-qa-finite-owner-phase-context.mjs | 250–252 ConnectionRef; 256–312 prepare/approval/issuer/SDK; 315–326 par completo; 336–344 proyección fuente; 353–414 holders/Access/recheck léxico | ebebaa9542c2408c0d505d1e23daa946762c1cab |
| lib/cloudflare-access-identity.mjs | 54–79 jwtVerify RS256/iss/aud/sub/email; 103–114 expiry del mismo payload firmado | 5f1fb5c2eb843252e1d5207f09fbb75467150021 |
| lib/mcp-qa-finite-owner-approved-ticket-facts.mjs | 7–13 predicado original ticket/approval/owner/realm; 20–24 conexión original; predicados puros, no I/O humano | 1dee3a6a4a68fe5d76a4f02d0ea568cceb0cdd7a |
| lib/mcp-qa-finite-owner-native-wire.mjs | 27–58 operación real retenida, failure race y lectura/cancel16384; límite no sirve para form1024 | 42aa81f82b60bcc66a140f1358784108696f41e5 |
| lib/mcp-qa-finite-stage-work.mjs | 7–23 settlement real; 67–95 scope request/factual local, no autoridad ni drain distribuido | a89baeb2578856dadedf700f9d66e180eb09120e |
| lib/mcp-qa-finite-owner-oauth-forward.mjs | 6–29 patrón root/actor/version/fetch/metadata/output fijo | f7979579fcb6d00b3d5d68c7790089c803f4170f |
| lib/dossier-monitoring-owner-http.mjs | 19–28 formulario1024; 61 INSERT VALUES; 65–73 cookie/hash y writer ordinario anterior al forward; no reutilizar escritor | 9b3a362c0738f5cefc00f8770bc2c099f76d7eee |

GET spec ae426608d2ba892c1b20994321850c75dcd94301, brief754ef33be7d9c0720f958d7937f531b0228e5d85 y preflightff4a5396df59e5d368b27e4eebaf9edb3e0bf770 son contratos/rulings, no implementación GET aceptada. En particular exigir success===true/resultsArray antes de interpretar vacío; no fallback ante schema error ni autorización por fixture.

## Confianza y tiempo

Fuente/pin/actor/QAcurrent/Mcurrent salen de observeOwnerPhasePair; Access usa realm/audience fuente y JWT firmado actual. Prepare cookie original, qualifyFiniteOwnerApprovedTicket, ownerSelection, issuer identity, GrantLink y ConnectionRef deben coincidir. Origin exacto, body UTF8<=1024 con una sola clave handle43 sin extras/duplicadas, cookie monitoring única/hashmatching y path/método fijos expresan decisión POST. Reverify después de observe/recheck antes SEND; guards mantienen bytes/headers/expiry actuales antes SQL.

accessPOST=min(original noticeAccess,original pre.ownerAccess,current signed Access,C0). Si menor que ticket.expiresAt negar antes consumir SEND: store/journal ya rechazan ese Common incompatible. No renovar ni retrorecortar ticket. Mismo store/witness/lease/Common/window desde observe hasta INSERT, única child<=5s; ACK dentro del Send.deadline y rechecks sin prolongarlo. Leer ACK histórico no acredita plazo vigente.

EventRow12: native sequence entero>0 global (puede ser>1 por historia ajena), request_id original, issued_at de n.ms SQL, expires_at=permissionExpiresAt absoluto original, campos owner/grant/project/client/resource/revision exactos; hash de fila completa. No expectedSequence+1. Native statement comprueba originalUUID/history0/owner/grant/fence/plazos en ejecución real, incluso si llegó encolado.

## Integración factual que falta

El inventario GET propuesto niega todos eventos. Ampliación privada mínima admite únicamente consent SEND sin ACK con0/1evento exacto, o ACK applied con un evento exacto/hash/sequence, o no_mutation con0eventos como hecho cerrado. Freeze, revoke, >1evento original, unknownkey, ACK/fila incoherentes deniegan. Sigue scope prefijo original y grantUUID, no filas ajenas/globalCOUNT/latestgrant.

POST baseline privada requiere tres filas ticket/reservation válidas, ticket14 real y events0; no usa public qualify que exige vacío. Continúa sólo ownSend creado en stack y registrado recorded en esta invocación, con Promise SQL real resuelta/resultado antes ACK. No options para tolerancia. Ambos snapshots y expected completo conservan schema/journal/ticket/event/owner/SDK/exchanged_at actuales. Público3keys, OAuth y GET siguen negando cualquier history propio; cinco/seis filas no abren nueva phase.

Schema ausente total sólo permite reader viejo vacío. POST exige siete objetos exactos antes SEND. Carrera posterior entre lectura y efecto sigue incierta: no transacción global ni repair. Una publicación puede cambiar después del último check externo aunque SQL proteja sus propios predicados; recheck posterior puede negar respuesta conservando evento durable.

## Retención, pruebas y costos

Nuevo lector1024 retiene reads/cancel reales y señala fallo pronto; latch local impide continuar tras fallo capturado. Native SQL/append/fetch real se conserva antes race. HTTP cancel/timeout no implica físico cancelado. Stage-work scope local, no pending Set del journal, excluye otro ingreso mismo ctx; test usa leaseSYN vigente para demostrarlo, no una abortada.

RED causal: accepted GET produce ticket verdadero pero POST todavía cerrado. GREEN futuro: JWT SYN firmado real/JWKS, CSRF real, OAuth/GET reales, D1/DO/workerd, actual INSERT RETURNING/ACK/rechecks. Principal incluye token/MCP real para exchanged_at; negativos no repiten ese recorrido costoso sin necesidad. Corpus cubre parser, identidad, Access menor, ownSEND, pérdida ACK/SQLresponse, queue5s, drifts, schema, history ajena, body/cancel held, abort/latePromise y retirada real. ACK DATA fabricado sólo negativo, nunca evidencia humana/SQL.

La lectura de EventRow ya existe en GET; ampliar validación no añade consultas por snapshot. POST agrega sus seis pares previstos, dos verificaciones Access, observe/INSERT con preflights y dos appends: medir cantidades/latencias/sesiones/graph reales en mismo GREEN. No heredar98D1/112GET, omitir snapshots/owner/SDK, ampliar fanout2/5s/30s ni repetir50ms/allSDK/build estándar para cifras. Regresiones seleccionadas literales del pin: phase16, SDK6, D04cuatro; plan exige conteos no0match y reportar skips del filtro correctamente. No se ejecutó ninguna prueba en este diseño.

## Handoff

Spec: docs/superpowers/specs/2026-11-05-finite-native-notice-consent.md.
Plan SDD: docs/superpowers/plans/2026-11-05-finite-native-notice-consent.md.
Filemap10, APIs/form/eventos/máquina/rechecks exactos allí. No helpers/reviewer ni producto en este bloque. Pendientes de root: GET aceptado+reconciliación/filemap, lectura completa/preflight y BASE futuro, permiso cloud/qualifier concreto. No ambigüedad de autoridad se delega a un caller futuro.

Source ceiling3nov02:59Z vencido; C0/C1/30s/5s originales. CLOSE solo no revoca grant; real revokeGrant hace rechazar resolver ordinario, no enabled:false. UnknownACK conserva historia sin retry/cleanup. Rollback sólo commits propios con CAS, nunca borrar D1/DO por un fallo de respuesta. SOURCE/SYN no demuestra consentimiento real de Gabriel ni habilita rutas/permisos/PCoff. operationalReadiness=false; completePackage=false; PCoff=false.
