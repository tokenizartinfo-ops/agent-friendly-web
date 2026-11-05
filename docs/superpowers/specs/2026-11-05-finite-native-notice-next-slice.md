# GET finite de ticket e inventario factual privado

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. No ejecutar por esta spec. Root debe comprobar inclusión del journal aceptado, hacer preflight de este diseño y fijar BASE/HEAD futuro. Aceptación journal comunicada por root:2969a840860d47997132eb081d1e65376f3953e0/treed89ca7b6bc056473362159bd51a2cb1f955c8f03; no reejecutada por este diseño. Inspección04c49dcc48b37f7fe825daa6c1c0747c5822d74e, tree7b13cf0a4262f7d5d5b8695c3bda3875d63e0bef; rama docs propia no contiene esos cambios producto.

## Unidad y límites

GET /monitoring real→forward M fijo→QA fijo→Access/preconnection/grant originales→journal tres filas y ticket D1 original; antes de respuesta positiva, dos snapshots completos deben igualar el frame léxico de la propia operación. GET prepara ticket, nunca consentimiento. POST /monitoring/grant y /monitoring/revoke, NoticeLink, source notices/finite, third CLOSED, flags, mounts y rollout permanecen fuera.

C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. No rearm, renew, reloj inyectado, budgets nuevos, callbacks aprobadores, DTO de autoridad ni allowPending. D0.4 conserva exchanged_at actual y proyección sólo para ACK histórico. Sin cambios de store/journal/SDK/autoridad/DDL. operationalReadiness=false; completePackage=false; PCoff=false.

## Mapa de archivos cerrado

Producto:
1. Modificar lib/mcp-qa-finite-owner-phase-context.mjs: ampliar snapshots privados, mantener salida3keys; añadir un handler GET fijo en el mismo módulo.
2. Crear lib/mcp-qa-finite-owner-notice-get-wire.mjs: grammar/metadata fijas, sin I/O.
3. Crear lib/mcp-qa-finite-owner-notice-get-forward.mjs: M→QA sólo este GET, con transporte real retenido.
4. Crear lib/mcp-qa-finite-owner-notice-get-qa.mjs: receiver QA de Request real, UNMOUNTED.

Pruebas/fixture:
5. Crear test/mcp-qa-finite-owner-notice-get-native.test.mjs.
6. Crear test/fixtures/finite-owner-notice-get.mjs: extensión SYN específica, gates/trace/inspect saneado, sin reemplazar resultados producto.
7. Modificar test/fixtures/finite-initial-entry-world.mjs: opt-in mode 'phase-context-sdk-token-notice-get', extensión fixture y siete DDL sólo ahí; todos los otros modos intactos.
8. Modificar test/fixtures/finite-owner-qa-sdk.mjs: opción fixture noticeGet=false; en true routing SYN de M/QA a módulos nuevos, conservando OAuth/token/MCP reales.
9. Modificar test/fixtures/finite-owner-io-fanout.mjs: instrumentar únicamente closures originales por markers únicos; observar nuevas consultas all/fresh-primary y no confundirlas con preflight/escrituras. No cambios en producto por acomodar observador.
10. Modificar test/mcp-qa-finite-owner-qa-sdk-native.test.mjs: ajustar únicamente assertions métricas por lecturas nuevas medidas, sin quitar casos/gates/plazos.
Ningún otro archivo por inferencia; ampliar mapa vuelve a root.

## APIs fuente exactas

Wire:
- finiteOwnerNoticeGetTarget='https://afw-private.invalid/_finite-owner/monitoring';
- qualifyFiniteOwnerNoticeGetRequest(request,bytes)→frozen {method:'GET',url};
- readFiniteOwnerNoticeGetMetadata(headers)→frozen {boundary,method:'GET',url,mVersionId,requestId}.
Reusar finiteNativeOrigin/Actor/Headers/PreservedHeaders/Uuid/Pending/Bytes/Operation. No redefinir origen/actor ni aceptar destino por parámetro. Header metadata exactamente las cinco claves x-afw-finite existentes, JSON boundary canónico, max16384bytes. Original URL exacta finiteNativeOrigin+'/monitoring', sin query/hash/userinfo; método GET y body0. Origin ausente o igual al origen; si presente distinto niega. Cookies/assertion<=8192 y sin CR/LF; nombres cookie sin duplicados/malformaciones. No opciones de identidad/decisión/sequence/grant en URL/body/headers.

Forward:
forwardPrivateFiniteOwnerNoticeGet({request,env,ctx},originalLease)→Promise<Response>.
Mismo patrón OAuth, root request context genuino; AFW_FINITE_TRIAL_CONTROL por idFromName(finiteNativeActor), actorhex64, fetch, AFW_FINITE_TRIAL_VERSION UUID y holders estables. Verificar grammar antes de enviar; sobrescribir todas las metadata, jamás preservar x-afw-finite del navegador. Request privado POST con original-method GET, body vacío, original signal/deadline y redirect manual. Retener fetch/body/cancel reales. Sólo respuesta200 HTML elegible; demás mapping a finiteNativePending con statuses seguros existentes. Allowlist de headers igual OAuth; no callbacks, token DTO o host configurable.

Receiver:
createPrivateQaFiniteOwnerNoticeGetReceiver({ctx,env})→frozen {fetch(request)→Promise<Response>}.
Sólo Request, target exacto y método de transporte POST. read metadata, createFiniteOwnerForwardedRequestLease, invocar handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},parent.lease), finally finish. URL incorrecta404/método405, fallos saneados. Receptor jamás crea autoridad desde boundary, metadata o versión; handler verifica fuente real.

Handler nuevo exportado en phase-context:
handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease)→Promise<Response>.
Sólo parámetros indicados; no par/frame/source/identity/policy/current/now/keySet/allowPending. Conserva observeOwnerPhasePair PRIVATE. No exportar helper lector nuevo ni objetos-capacidad. El nuevo export es una entrada fixed Request que aplica controles completos, no constructor de hechos.

## Inventario y schema dentro de observeOwnerPhasePair

facts() llama createFinitePreparationNoticeJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},childLease) bajo child/retain/holders. Usa interfaz6filas aceptada por root, no caller DTO. Añadir f.notice y el mismo objeto canónico a f.anchor.notice; en snapshot.records.notice=f.notice. No eliminar/enmascarar ninguna otra celda ni desdoblar snapshots. Sólo prefijo propio de preconnection y UUID grant original: filas/prefijos ajenos no se cuentan ni se cambian.

Añadir selectAll(sql,args,cap) PRIVATE, sólo usado por tres sentencias fuente fijas abajo. Nueva first-primary por consulta; preparar/bind/all como PRIMERA sentencia, retener Promise completa, verificar holder/métodos después de await, Array.isArray(results), length<=cap y own detached de filas. No callbacks ni SQL recibido de APIs. No reutilizar sesión de preflight. Mantener select original byte/conducta; ninguna lectura paralela nueva fuera del fanout existente.

noticePrimary(f,data,issuerFacts) PRIVATE dentro del observer retorna {schema,tickets,events}:
- schemaQuery: SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8; cap8. Ocho filas o cualquier cardinalidad1..6 niega. Cero→schema=null, tickets/events=[]; sólo válido con journal vacío. No suponer tablas ausentes a partir de error.
- Siete filas→schema={objects:rows}; fields exactos type/name/tbl_name/sql; comparar cada definición FINITE_PREPARATION_MONITORING_SCHEMA usando mismo parser de type/name/table y normalización de whitespace/semicolon/CREATE IF NOT EXISTS del store. Extra objeto, SQL diferente, constraint/trigger/índice faltante niega. Snapshot conserva SQL real (normalización sólo compara, no borra diferencias entre snapshots).
- Si no issuer.reservation.identity: journal debe estar vacío; no consultar filas por un grant inventado; devolver tablas completas/tickets/events vacíos. Historia de otros grants no se enumera.
- Si existe identity y schema completo: SELECT las14 columnas TicketRow explícitas FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2; cap2. Parámetro SIEMPRE identity.grantId original. >=2 niega.
- SELECT las12 columnas ConsentRow explícitas FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3; cap3. Cualquier fila niega este slice; nunca seguir sobre subconjunto. Consulta completa de campos para detectar una transición material, no contador prefabricado.
No SELECT *; nombres exactos del spec store (TicketRow14/ConsentRow12). No nuevo esquema ni PRAGMA aquí: full SQL idéntico califica estructura; INSERT mantiene preflight completo store incluyendo PRAGMA. Ausencia total permite reader viejo; GET exige siete objetos ANTES de appendReservation/appendSend. Nunca consumir journal para que el INSERT descubra schema ausente. Carrera schema tras última lectura sigue posible: store niega y SEND puede quedar consumido; no atomicidad global/repair/retry.

Llamar noticePrimary después de issuerPrimary y correlaciones SDK de qualify; devolver noticeFacts y añadir snapshot.noticeRows=noticeFacts. Así igualdad canónica first/second incluye journal, schema, ticket y eventos además de todos los hechos previos. Nueva fuente sourceBase jamás se deriva de notices.

## Predicados de noticePrimary

Journal vacío significa reservation/freeze y ambos pares send/ack null, forma exacta validada por journal. Si hay tickets sin reservation: negar. Si no hay reservation, todos tickets/events vacíos; no reconstruir raíz desde SQL. Cualquier freeze o consent.send/ack niega esta unidad aun válido para codec; no lo convertir en permiso ni limpiar.

Reservation requiere issuer.reservation, grant ACK applied, grant real activo, AuthorizationLink, GrantLink, relation, ConnectionRef, preconnection y SDK root/begin/approve/complete observados completos. Comparar:
- canonical(r.identity)===canonical(issuer.reservation.identity);
- r.issuerReservationHash===issuer.reservation.recordHash, r.originalGrantAckHash===issuer.operations.grant.ack.recordHash;
- r.grantLinkHash===prepHash('GrantLink',issuerFacts.grantLink), r.connectionHash===prepHash('ConnectionRef',issuerFacts.connection);
- r.expectedGrant=== {scopes:JSON.parse(currentGrant.scopes_json),createdAt:currentGrant.created_at,expiresAt:currentGrant.expires_at}, exact canonical;
- r.consumedAt===issuerFacts.consent.consumed_at;
- r.preconnectionExpiresAt===data.preconnection.expiresAt; r.accessExpiresAt<=min(data.preconnection.owner.accessExpiresAt,identity.C0), r.accessExpiresAt>r.issuedAt. No comparar con un JWT recuperado de storage;
- r.issuedAt y Send/Ack históricos <=Date.now(); ticket expiry<=min(r.accessExpiresAt,r.preconnectionExpiresAt,data.approval.expiresAt,ConnectionRef.expiresAt,C0,consent/grant expiry). En esta lectura en curso Date.now()<ticket.permissionExpiresAt; clock.narrow a ese mínimo original.
Journal ya valida sus propios hashes/orden/ventana/fields. Correlacionar de nuevo hechos reales sin reimplementar su codec.

Fila ticket esperada deriva de r.identity y r.ticket exactamente como expectedTicket del store: subject/grant/project/client/resource/revision de identity, purpose='afw.dossier-monitoring-owner.v1', action='grant', hash/requestId/sequence/times del ticket. Comparar las14 columnas y tipos; ni forma ni hash bastan.
- Sin ticket.send: tickets debe estar vacío.
- Con ticket.send y sin ACK: tickets puede estar vacío o ser esa fila exacta. Es un hecho privado, NO admisión.
- ACK applied: una fila exacta, rowHash===initialHash('afw.finite-preparation-notice-row.v1',fila) y sequence===null.
- ACK no_mutation: tickets vacío, rowHash/sequence null. Cierre, nunca replay.
Resultado contradicho o fila de otra solicitud del mismo grant niega. No tolerar un evento de consentimiento aunque el ticket sea correcto.

## Cierre de lectores actuales

qualifySettledOwnerPair niega cualquier contenido notice o ticket/evento de cada snapshot. Schema completo vacío NO es contenido notice; esquema ausente tampoco. Por tanto readPrivateQaFiniteOwnerContext conserva exactamente {source,preconnectionId,capsuleHash} y la fase closed_ui/read_consent existente en vacío. Sin fields nuevos públicos ni rama notices.

El recheckOwned de OAuth exige notice vacío en ambos snapshots y sigue sus checks originales issuer/SDK pending. Su expected ya incluye notice/noticeRows vacíos; no actualiza esas celdas. No permitir que OAuth acepte un SEND ticket sólo porque sea válido para observer. Otros consumidores no obtienen excepción.

## Handler GET: confianza y tiempos

En observeFiniteOwnerRequestWork + finiteNativeOperation reales, capturar holders del patrón OAuth (request/headers/ctx/env/DB/alias/source bindings/version/fetch) antes de await. Usar createFiniteInitialLease con readFiniteOwnerRequestDeadline original y narrowing, sin crear budget desde Date.now. Reconstruir original GET desde metadata y bytes0; cualificar grammar.

baseline=observeOwnerPhasePair({ctx,env,parent:originalLease}); qualifySettledOwnerPair(baseline) exige vacío. Requerir phase read_consent, Mversion===source.currentPublication.versionId, schema completo y cadena original grant+SDK completada. Source/actor/QA/realm/project provienen de baseline real, nunca del request. Exigir eventos0/tickets0, no cookie __Host-afw-monitoring-owner previa: no refresh/reissue.

Verificar verifyCloudflareAccessJwtWithExpiry usando Cf-Access-Jwt-Assertion original y source.access.{teamDomain,audience}; firma/issuer/aud/subject/expiry del mismo payload. Sin accessVerifier/keySet/now configurables. Cookie __Host-afw-finite-prepare única con gramática y hash original. qualifyFiniteOwnerApprovedTicket sobre ticket/use/pre/approval/sourceSnapshot originales, realm/subjectHash existentes. Subject===material.ownerSelection.subject===issuer identity.subject y realm original; GrantLink/ConnectionRef actuales ya correlacionados. GET expresa solicitud de formulario, no decisión de avisos.

accessExpiresAt=min(identity verificada.expiresAt,pre.owner.accessExpiresAt,C0); preconnectionExpiresAt=pre.expiresAt. Narrow padre también por pre/approval/ConnectionRef/consent/grant/Access. at=Date.now real; handle=randomBytes(32).toString('base64url'), requestId=crypto.randomUUID(); ticket.issuedAt=at,expectedSequence=0; ticket.expiresAt=ticket.permissionExpiresAt=min(at+600000,todos los techos anteriores). Si mínimo<=at, negar. Duración del permiso propuesto puede superar5000ms; no usar child.deadline como ticket expiry. Sólo handleHash y UUID al journal, nunca JWT/cookie/handle bruto/email.

Reservation exacta del contrato con hashes originales, Common y ticket; issuedAt=Date.now posterior a at. No nueva identity, grant, ACK histórico o conexión. expected=structuredClone(baseline.second), nunca se retorna/pasa como parámetro externo.

## Máquina léxica propia y rechecks

Variables privadas: position, operation, actualPromise, actualResult, settled, activeChild; actualPromise/actualResult/settled pertenecen exclusivamente al INSERT SQL, no se sobrescriben al esperar el journal. Cada append usa su propia Promise retenida local y su resultado; se conservan referencias locales ownedReservation/ownedSend a los records creados por este handler; no globals/WeakMap de autoridad ni objeto de opción. recheckNoticeGetOwned() cierre sin argumentos:
1. check holders/lease/identity expiry.
2. Si hay actualPromise pendiente (!settled), negar; nunca lanzar lectura para inferir su resultado.
3. Issuer/SDK deben seguir completos/sin pending original. Notice consent/freeze ausentes.
4. position determina la única excepción propia; comprobar que el SEND es el mismo objeto/recordHash producido en esta invocación y recién reconocido, no leído de journal ajeno. Si position exige resultado, exigir actualPromise real, settled y actualResult.
5. await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id})); wait usa clock.wait con activeChild cuando existe y guards antes/después, como OAuth. Ambos snapshots deben ser canónicamente iguales a expected ENTERO. No comparar sólo partes/omitir timestamps/masking. No llamar qualifySettledOwnerPair después de la primera escritura propia: su cierre público sigue deliberado.

Secuencia exacta:
- baseline y recheckNoticeGetOwned con expected vacío.
- En child propia: retener appendReservation real; exigir status recorded y hash exacto; después de settle actualizar únicamente expected.records.notice.reservation y expected.anchor.notice; position='reservation-recorded'; recheck completo. existing/uncertain/fallo termina503 sin SQL.
- Child ticket única: window.startedAt=Date.now al entrar; deadline=min(child original, todos los techos), duración<=5000. SEND exacto con Common/window de esta child, decisionHash=null. Retener appendSend; sólo recorded del journal→actualizar expected notice.send/anchor; position='ticket-send-recorded'; recheck completo con expected.tickets=[].
- Tras check emitir UNA insertMonitoringTicket({...Common,ticket},activeChild) en la MISMA instancia store, guardar su Promise REAL antes de cualquier race; position='ticket-sql-pending', settled=false. No hay recheck durante pendiente.
- Al resolver: actualResult es ese resultado nativo; settled=true; exigir status applied y14 columnas exactas; cualquier no_mutation/error termina503 sin ACK ni formulario. Actualizar expected.noticeRows.tickets=[structuredClone(actualResult.row)]; position='ticket-sql-resolved'; recheck completo acepta exclusivamente este SEND propio con el resultado real en stack. El status no_mutation del store no se convierte en éxito del flujo.
- Dentro de misma child: construir ACK applied exclusivamente desde actualResult.row real, sequence=null y rowHash exacto; observedAt real<Send.deadline. Retener appendAck con variable distinta sin reemplazar la referencia SQL; require recorded; actualizar únicamente expected notice.ack/anchor; position='ticket-ack-recorded'; recheck completo. Después cerrar child, comprobar lease/identity original inmediatamente antes de construir/retornar pagina200.
No llamada del journal ni del store recibe expected/position/result como autoridad. La referencia a SEND propio no viaja por HTTP. Persistir ACK no permite limpiar actualPromise antes del recheck final. Ante excepción no reconstruir ACK, reintentar INSERT, freeze automático ni cleanup; historial puede quedar parcial.

Reservation y ticket SEND sin ACK causados por pérdida entre pasos cierran futuras solicitudes. Un GET ajeno no puede “continuar” la reserva. Dos GET concurrentes: scope original/exclusión de instancia más journal append-once; sólo uno recorded puede emitir SQL. No inferir exclusión global del pending privado del journal; statement SQL/cerca original decide carrera nativa.

## Página y contrato cerrado de POST

200 HTML UTF8/no-store, Referrer-Policy same-origin, nosniff, CSP nonce con default-src none; frame-ancestors none; base-uri none; form-action 'none'. Título 'Preparación de avisos'; texto exacto 'Preparé un formulario temporal. Todavía no diste permiso para avisos. El envío de este formulario aún no está habilitado.' Formulario con hidden handle (escapeado), botón disabled 'Permitir avisos temporales'; no action activa ni JavaScript/envío automático. Enlace fijo a https://agentfriendlyweb.dev/expediente.
Cookie __Host-afw-monitoring-owner=handle; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=floor((ticket.expiresAt-Date.now())/1000), exigir>=1. No devolver IDs grant/subject/row/journal/source ni detalles internos.
POST humano a /monitoring, /monitoring/grant o /monitoring/revoke se niega antes de cualquier journal/SQL, sin fallback ordinario. La existencia de esta página SOURCE no autoriza mount aislado ni acredita funcionalidad completa.

## Costo, retención y aceptación

Añadir una list journal por snapshot, una schema SELECT por snapshot, y dos SELECT por identity/schema completos. Par vacío schema ausente: +2DO list/+2D1; par con schema+identity: +2DO list/+6D1. Cada snapshot sigue todos los controles previos; journal.read es un list limit7, no seis gets separados. No alterar fanout credentials/QA/M, peak2, allSettled, body/cancel ni orden entre snapshots.

Medir totals por baseline/reservation/SEND/SQL/ACK, D1first/all por nueva sesión, queries preflight aparte, DO list/transactions/sync/get y HTTP GET reales. No transferir98D1/112GET a este flujo. Cada recheck completo conserva dos snapshots; ni count inflado/omitido ni presupuesto ampliado. Padre30s e hija5s son aceptación real, incluida cola; No reejecutar50ms fanout sólo para recabar números si scheduler no cambia; usar control0 existente y nuevo GET con tiempos reales. Un fallo de presupuesto obliga volver a root, no relajar garantía. Failure técnico no se “corrige” alargando ventanas.

Capturar graph/metafile/hash/bytes de bundles QA/M con perfiles existentes; phase importa notice journal, por lo que graph sí cambia. Root decide en preflight qué compilador estándar adicional corresponde al reachability real. No build/runtime local ni permisos de CI inferidos. stage-work retiene operación/fetch/body/cancel reales; unknownACK/abort no acreditan drain ni permiten restore.

GREEN requiere GET real por los nuevos módulos y D1/DO reales, Access SYN firmado verificado (no verifier mock), issuer original emitido por QA real, y actual token/MCP original antes del GET como regresión D0.4. Provider/installed history siguen SYN rotulados como en harness existente, no source factory positivo ni mock de snapshot. RED causal tras esos prerequisitos y antes de ticket/ACK ausentes; import/bundle/schema error no vale.

Regresiones seleccionadas por diff: phase-context vacío/settled/unknown/schema/owner; QA SDK GET/POST real, binding-cookie, drift y control fanout0; D0.4 actual exchange→read y drift de exchanged_at/owner. Reusar aceptación fijada de store/journal intactos; nuevo GET ejerce sus APIs reales. Comandos/casos exactos en plan. No repetir50ms, allSDK, full suite o builds sólo para métricas. Retener rollback de código; nunca DELETE filas históricas o alterar schema real. Después siguen POST real con CSRF/decisión original, source/NoticeLink/stages, reducción/drain/cleanup y mount/hosting separados.
