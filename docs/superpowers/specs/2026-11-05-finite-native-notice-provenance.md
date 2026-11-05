# Finite native notice provenance: journal acotado

2026-11-05 · **INACTIVE, SOURCE ONLY, SYN**. Requiere lectura/preflight de root, aceptación previa del notice store y HEAD futuro explícito. No ejecutar a partir de este documento.

## Resultado y exclusiones

Añadir codec y journal DO independientes de avisos, con seis claves append-once, para correlacionar los dos INSERT nativos propuestos sin reconstruir permisos desde historia. No implementación de receiver, productor de etapas, lector phase, NoticeLink, schema, mount, cleanup, SDK, M, autoridad, CI permanente ni runtime.

BASE de inspección=7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be; árbol616d1e6187e652f07c067683a12b40c564da78d8; repo tokenizartinfo-ops/agent-friendly-web ID1347578006 PUBLIC. El informe hermano explica la fuente confiada futura y sus huecos. Los tres métodos del store son frontera propuesta: insertMonitoringTicket, observeMonitoringTicket, insertMonitoringConsent; no se rediseñan. Los tests de composición sólo se habilitan tras aceptación de ese componente en HEAD futuro.

C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms. Techo fuente2026-11-03T02:59Z vencido. Sin reloj inyectable, compensación, rearm, renovación, nueva identity/grant ni autoridad por JSON. operationalReadiness=false, completePackage=false, PCoff=false.

## Archivos únicos de la futura unidad

Crear lib/mcp-qa-finite-preparation-notice-records.mjs (DATA), lib/mcp-qa-finite-preparation-notice-journal.mjs (DO), test/mcp-qa-finite-preparation-notice-provenance.test.mjs (codec), test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs y test/fixtures/finite-preparation-notice-provenance-worker.mjs (composición SYN).

No modificar módulos existentes ni sus tests/fixtures. La nueva fixture usa exports públicos del store aceptado y constantes SQL existentes; no duplica lógica del producto ni prefija el grant positivo. DDL sólo en fixture; ninguna migración.

Patrón de referencia: issuer-records blob50f9a013580a46ad1d445a240f47b7b2ce887d49; issuer-journal blob414450aa08f797bed5a41cf5cc697342785ce16b; fixture issuer blob0588897cc3fe29618ffaea1946e76896ade479d1. Reusar initialOwn/Fields/Canonical/Hash y validateFinitePreparationIssuerIdentity, issuerTime/Uuid/Iso/Scopes; no alterar sus semánticas. captureFinitePreparationIssuerContext({ctx,env}) aporta holders/leaseGuard/wait/transaction/sync/readback; no autentica negocio.

## Esquema exacto

Exportar FINITE_PREPARATION_NOTICE_PREFIX='afw.finite-preparation-notice.v1:' y FINITE_PREPARATION_NOTICE_OPERATIONS=Object.freeze(['ticket','consent']). Claves: prefix+preconnectionId+':' seguido por reservation, ticket:send, ticket:ack, consent:send, consent:ack, freeze. list limit7; >6, suffix extra, registro no canónico, huérfano o binding incoherente: error genérico. Inventario nunca ignora claves desconocidas.

Tipos hex64 minúsculo, UUID/ISO/time usan validadores issuer. Cada record tiene purpose exacto 'afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1' y recordHash=initialHash(purpose,campos sin recordHash). own/fields rechazan accessors, símbolos, prototipos, extras, sparse arrays, límites existentes antes de canonical; máximo16384bytes UTF8 por registro. encode valida/canoniza; decode exige raw===canonical(validado). Objetos devueltos detached y deep-frozen. Errores no incluyen payload, SQL, subject ni hashes.

Reservation campos exactos (además purpose/recordHash):
- identity: identidad issuer ORIGINAL íntegra validada, incluido identityHash;
- issuerReservationHash, originalGrantAckHash, grantLinkHash, connectionHash: hex64. Último es hashFinitePreparationRecord('ConnectionRef',fila real original). Los anteriores son recordHash de issuer Reservation, issuer grant Ack y hashFinitePreparationRecord('GrantLink',fila real). No referencias nuevas ni grantHash alternativo;
- expectedGrant: exactamente {scopes,createdAt,expiresAt}; issuerScopes; ISO canónicos; scopes subconjunto ordenado de identity.requestedScopes; createdAt>=consumedAt, expiresAt>createdAt y <=min(C0,consentExpiresAt,preconnectionExpiresAt);
- consumedAt: ISO original, >=identity.reservedAt y <=expectedGrant.createdAt;
- accessExpiresAt, preconnectionExpiresAt: issuerTime; ambos >issuedAt; accessExpiresAt<=preconnectionExpiresAt no se exige (son techos independientes), ambos se clampan por el receptor y no renuevan autoridad original;
- ticket: exactamente {handleHash,requestId,expectedSequence,issuedAt,expiresAt,permissionExpiresAt}; hex64/UUID; expectedSequence===0; tiempos issuerTime; issuedAt>=max(identity.reservedAt,parse(createdAt),parse(consumedAt)); issuedAt<permissionExpiresAt<=expiresAt; expiresAt-issuedAt<=600000; expiresAt<=min(C0,parse(consentExpiresAt),parse(expectedGrant.expiresAt),accessExpiresAt,preconnectionExpiresAt);
- issuedAt: issuerTime, >=ticket.issuedAt y <ticket.permissionExpiresAt. La reserva se crea después de generar ticket DATA y antes de ticket SEND.

Send campos exactos: identityHash, reservationHash, operation, requestHash, accessExpiresAt, window, issuedAt, decisionHash.
- operation ticket|consent; hashes hex64; window exactamente {startedAt,deadline}, issuerTime, 0<deadline-startedAt<=5000, startedAt>=reservation.issuedAt; issuedAt>=startedAt y <deadline.
- deadline<=min(identity.C0,parse(identity.consentExpiresAt),parse(expectedGrant.expiresAt),accessExpiresAt,preconnectionExpiresAt,ticket.expiresAt,ticket.permissionExpiresAt). Ticket SQL nunca depende sólo de esa validación: el store revalida su propia cerca/reloj.
- accessExpiresAt<=reservation.accessExpiresAt, >=ticket.expiresAt; ticket SEND exige igualdad con reservation.accessExpiresAt. Consent puede estrechar al Access POST verificado, nunca ampliar.
- decisionHash===null para ticket. Para consent, hex64 igual a initialHash('afw.finite-preparation-notice-decision.v1',{identityHash,ticketRequestId:reservation.ticket.requestId,handleHash:reservation.ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt}). Es checksum de decisión, NO prueba de CSRF ni firma.
- Common deriva de reservation con accessExpiresAt de Send y window de Send. requestHash=initialHash('afw.finite-preparation-notice-request.v1',{operation,common:Common,ticket:reservation.ticket,decisionHash}). No serializa testigo; representa campos esperados.

Ack campos exactos: sendHash,outcome,rowHash,sequence,observedAt.
- outcome applied|no_mutation; rowHash hex64 para applied y null para no_mutation; no_mutation exige sequence===null.
- applied ticket exige sequence===null; applied consent exige entero seguro >0 realmente retornado, NO expectedSequence+1.
- observedAt issuerTime, send.issuedAt<=observedAt<send.window.deadline. Sin ACK tardío reconstruido.
- rowHash=initialHash('afw.finite-preparation-notice-row.v1',fila exacta retornada):14 columnas SQL de TicketRow o12 de ConsentRow del spec store. El codec sólo verifica formato, journal sólo correlaciona; fixture/futuro receptor contrastan hash de resultado real y fila primaria. Rowhash no autentica escritor.

Freeze campos exactos: identityHash,reservationHash,frozenAt. frozenAt issuerTime, >=reservation.issuedAt y <identity.C1. Marca bloqueo irreversible de progresión; no reloj nuevo, cierre de SQL ni recibo de drain.

No persistir JWT, email, cookies, handle bruto, código OAuth, token, proyección secreta, witness ni lease. subject en identity es DATA privado de QA, no publicable; fixture usa exclusivamente SYN.

## API y semántica del journal

Exports codec: sealFinitePreparationNoticeRecord(kind,input), encodeFinitePreparationNoticeRecord(kind,input), decodeFinitePreparationNoticeRecord(kind,raw); kind Reservation|Send|Ack|Freeze. Factories DATA públicas no emiten autoridad.

createFinitePreparationNoticeJournal({ctx,env}) con campos exactos devuelve:
- appendReservation(record,lease);
- appendSend({preconnectionId,record},lease);
- appendAck({preconnectionId,operation,record},lease);
- freeze({preconnectionId,record},lease);
- read({preconnectionId},lease).

Mutadores devuelven frozen {status:'recorded'|'existing'|'uncertain',recordHash}. read devuelve frozen {reservation:null|Reservation,freeze:null|Freeze,operations:{ticket:{send:null|Send,ack:null|Ack},consent:{send:null|Send,ack:null|Ack}}}. No field de authority, ready, drain ni callable capability. Forma inválida o lectura corrupta lanza Error('Finite preparation notice unavailable'); fallos dentro de append tras preparación se convierten en uncertain, igual patrón issuer.

Cada append: snapshot/encode antes de await; capturar holders+lease guard; transacción real con lectura exhaustiva, comparación de clave inmutable y put único; aguardar retorno final de transacción, storage.sync y get exacto/canonical decode. Retener todas las Promises reales mediante capture.wait/retain. Si algo falla no declarar no_mutation del store. Guardar mismo contexto/actor/version por referencia, identity.actorId===captured.actorId y identity.qaVersionId===captured.qa; sustitución o mutación de holders niega.

Transiciones validadas en read y dentro de transacción:
1. Sólo reservation puede iniciar. Sin ella ningún otro dato.
2. ticket SEND requiere reserva, no freeze ni ticket SEND previo para nueva escritura.
3. ticket ACK requiere ticket SEND correspondiente. outcome no_mutation bloquea consent.
4. consent SEND requiere ticket ACK applied, no consent SEND previo ni freeze; issuedAt>=ticket ACK.observedAt; identidad/reserva coinciden. Cada Send requestHash/decisionHash se recalcula con reserva.
5. consent ACK requiere consent SEND correspondiente. Todos los enlaces y tiempos se validan.
6. freeze requiere reserva y sus hashes exactos; congela nuevos SEND y ACK. Permite existir junto a historia completa/incompleta; no fabrica resolución.
7. Repetición byte-idéntica de clave existente devuelve existing aun congelado; nunca reemplaza. Divergencia devuelve uncertain sin put. ACK nuevo tras freeze no se escribe. Lectura de historia válida no niega sólo por freeze o por C0 vencido: lease actual sigue exigido y los tiempos históricos deben ser coherentes.

Un SEND sin ACK bloquea el siguiente SEND. El productor fijo no lo borra al timeout ni lo completa leyendo D1. No_mutation terminal no permite segundo ticket ni decisión para la misma preconnection. El journal no intenta congelar automáticamente tras fallar: si no se pudo persistir Freeze, el SEND durable sigue siendo el bloqueo. Reservation sin ticket SEND puede quedar huérfana; un futuro GET no reconstruye handle ni continúa desde existing Reservation.

Límite explícito: como issuer-journal, appendAck valida DATA/enlaces, no la ejecución de SQL. Por sí solo no distingue un ACK fabricado por un caller con acceso interno. La garantía de procedencia requiere el futuro handler fijo: sólo su continuación léxica con actualPromise realmente resuelta puede producir ACK; tras excepción/fin de lease no hay recuperación por fila. Ningún test journal-only afirmará autenticación del caller o rechazo criptográfico de un ACK inventado. Freeze sí bloquea un ACK nuevo de cualquier caller.

No nuevos SELECT D1 en journal. No afirmar que el journal valida el grant ACK o la identidad humana: los hashes se contrastarán con el productor QA fijo descrito en informe. Otro caller puede crear DATA válida pero no obtiene permisos; ningún producto consume todavía esta API. El único futuro caller autorizado será el handler léxico del receptor QA que obtenga actor/source/owner/preconnection del par factual, verifique Access firmado y cookie/CSRF original antes de SEND. No opción allowPending, trustCaller, accessVerifier o approval:true.

## Fuente de autoridad y progreso posterior

GET futuro: source/actor/QA version del par factual; verifyCloudflareAccessJwtWithExpiry con realm/audience del source; cookie prepare original y qualifyFiniteOwnerApprovedTicket; identidad contra ownerSelection/issuer; GrantLink y ConnectionRef reales; Access mínimo original/actual. Antes de guardar SEND se hace recheckOwned. POST repite estos controles y exige cookie monitoring única igual al handle del formulario, Origin y acción fija explícita; verifica que ticket no supere Access POST actual. Dos peticiones reciben leases distintos del ingreso real, jamás extienden C0.

Sólo el callback fuente fijo que recibe recorded nuevo en stack continúa a un INSERT real; existing/uncertain no. En POST el mismo store/child/Common observa ticket y consume la referencia witness una sola vez; journal no recrea WeakMap. Esto se implementará después, junto con inventario factual de notices y su tolerancia léxica estricta para la propia operación pendiente. No se modifica ahora phase-context: aceptación de seis filas no cambia read_consent ni habilita notices/third CLOSED. Persistencia y API local no son consentimiento, source acceptance no es permiso HTTP.

## Validación nativa futura y límites

Codec: positivos mínimos; round-trip; keys extra/getter count0; prototipo/símbolos/sparse/bounds; hash incorrecto; expiry/relaciones imposibles; sequence global válida>1.

DO real Miniflare + SQLite storage; D1 nativo en fixture. Crear grant por openFence→insertAuthorization→consumeAuthorization→insertReadGrant reales de misma instancia/lease. Luego journal reservation→ticket SEND recorded→insertMonitoringTicket real→ticket ACK; nueva instancia de journal para POST, observeMonitoringTicket real con store/lease del POST→consent SEND recorded→insertMonitoringConsent real→consent ACK. Registrar rowhash/sequence realmente devueltos y comparar filas; no ticket/consent DTO mock ni SQL prefijado positivo.

Dos callers concurrentes append same SEND: exactamente uno recorded y sólo él emite un INSERT; otro existing no escribe. Conflicting ticket/reservation niega. Unknown SEND ACK en final transaction/sync/readback, SQL result perdido después de commit y Promise retenida después de abort: historia parcial, fixture no emite segundo SQL ni produce ACK desde una lectura con instancia nueva; el journal niega siguiente SEND sin predecesor ACK. Gate antes de efecto para probar causalidad; fallo de bundle/DDL no es RED.

Freeze previo bloquea nuevos SEND/ACK; no borra eventos ni revoca. CLOSE con grant activo mantiene autoridad enabled:true; tras revokeGrant la autoridad real rechaza genéricamente, conservando evento. Este último ya es regresión store aceptada, no tarea para cambiar authority.

No “drained” en API: stage-work tiene retención dentro de contexto/isolate; no acredita inventario durable entre RPCs. Tras reinicio, las filas bloquean replay, no prueban terminación física. Futuros cleanup/inventario mantienen cierre hasta evidencia propia completa. Rollback SOURCE de esta unidad revierte únicamente sus cinco archivos/commit con CAS; jamás borra journals ni D1 real. Sin proveedor, credenciales, DDL remoto, browser, permisos, publicación, merge o main.
