# Task brief — finite native notice provenance journal

Preparado porroot5nov2026, aún INACTIVE hasta despacho explícito con BASE futuro y storefix1 aceptado. READ FIRSTeste archivo como requisitos completos; no leer todo historial/plan. Unidad es journal-only y no un segundo receptor ni API. Rama futura producto feat/finite-native-cleanup-20261101; repos tokenizartinfo-ops/agent-friendly-web(1347578006 PUBLIC). Campo exacto BASE/tree se entrega por mensaje después de readback, nunca usar pininspección7a2/docs39ba/6d13 como producto.

PROJECT=AFW; ENVIRONMENT=GitHub source/Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE isolatedbranch; ALLOWED_ACTION5filesnuevos+informe+qualifier temporal autorizado; ROLLBACK sólo commits propios expectedheadCAS, no borrarjournalsD1 ni datosajenos. Ninguna sourceevidencia autentica humano, permitegrantreal, runtime o PCoff.

## Rulings vinculantes de root

Preflight compañero reviews/2026-11-05-finite-native-notice-provenance-preflight.es.md. Unicoimplementerfresco SDD, sin subagentes/reviewerpropio. Capturedcontext.wait ya hace retain original, no existe c.retain. Su Setpending privado no serializa métodos; prueba de nuevaentrada denegada debe usar observerSYNexterno real outstanding.has(ctx), segunda leaseSYN vigente/distinta dentro deadlineoriginal, no reutilizarleaseabortada. No inventar guarda/autoridad/drain de journal.

CausalRED puede usar andamiaje temporal sólo en nuevo journal que lance error genérico en conducta ausente, tras grantnativo real; jamás fakefila/resultado/store/source/SDK ni fallobundleimport. Sustituir completamente enGREEN. Tests contexto consent-sinACK van enjournal, no exigirlos a codec sinReservation. Seal sigue patrón issuerpurpose/canonicalhash; no autoridad desde campos. DocspendienteNOTE 'storepropuesto' se reemplaza sólo por futuroaceptación de root, sin retocar store.

Cualificación: nuevo codec+nativo completos y lint5files. NO repetir147store/33issuer/SDK/fanout/estándar con cincofilesaditivos/noimportedgeexistente. El nuevo nativo compone storeaceptado real. Qualifier temporal de rama/pathscontents:read sinsecretos/checkoutpersistfalse permitido, npmci --ignore-scripts --no-audit --no-fund sólocloud; retirarf inal. Ningúnclone/deps/build/tests local ni permanentCI/credenciales/provider.

Fuente2026-11-03T02:59Z vencida; C0=I0+900000,C1=C0+180000,padre<=30000,hija<=5000 sinrelojinyectado/rearm/renew. MinorpreviosD03/fanout/herramientas siguen ledgerdetriagefinal, nofixesporarrastre.

## Contrato exacto de la unidad

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


## Ejecución y casos obligatorios

- [ ] **1. Fijar baseline y condiciones de trabajo.** Root entrega HEAD/tree/branch futura y evidencia de aceptación del store; writer comprueba los cinco paths ausentes y snapshots de módulos inmutables. Identificar Actions autorizado y rollback propio. Si el store aceptado difiere en firmas, volver a root antes de ampliar scope. No usar rama activa ajena ni instalar nada.

- [ ] **2. Escribir tests causales antes de implementación.** Codec: reservation válida original, ticket SEND/ACK, consent SEND/ACK(sequence=17 con expectedSequence=0), freeze; exact round-trip. Mutaciones: extra/symbol/getter (contador0), proto/sparse/oversize, hash falso, ventana5001ms, C0/C1 incoherente, Access menor que ticket, consent sin ACK ticket, null/sequence incorrecta. Cada aserción expresa contrato, no copia el body del codec.

- [ ] **3. Crear fixture nativa y RED primaria.** Reusar configuración Miniflare/workerd y patrón issuer fixture; setup SQL/grant nativo finaliza primero y se comprueba grant UUID original. Añadir sólo un stub exportado de la nueva factory que lance el error genérico para que el bundle cargue; no es implementación ni capacidad. Invocarlo sólo tras comprobar grant real: resultado saneado incluye reachedNativeGrant=true y el error de journal. La aserción principal exige journal reservation recorded y falla en esa conducta ausente; no aceptar fallo de bundle/import global, schema setup o timeout como RED. Registrar run/head, gate alcanzado y error concreto. La fixture todavía no implementa lógica de journal ni efectos simulados.

- [ ] **4. Implementar codec según campos exactos.** Snapshot antes de await, estricto own/fields, hashes/domains y16384bytes; deep-freeze detached. Validate context-sensitive Send/Ack al leer journal, porque el codec aislado no tiene reservation. No “validar” autoridad humana a partir de hashes.

- [ ] **5. Implementar journal.** Usar contexto issuer capturado y su retención sin modificaciones; transacción real con inventario limit7. Validar estructura/enlaces de todo inventario; si clave ya existe, comparar bytes y devolver existing antes de reglas de progresión que impedirían nueva escritura tras freeze. Para clave nueva aplicar transiciones de spec. Esperar retorno final, sync y readback exacto. Forma inválida lanza; fallo append después de preparar devuelve uncertain. No timer/retry/recovery/delete.

- [ ] **6. Completar GREEN nativo significativo.** Casos y assertions obligatorios:
  - grant/ticket/observación/consent reales y rowhash exactos; leer desde journal nuevo entre GET y POST; misma witness/store/child en observe+consent, MAX por grant0, sequence global17 o >1 realmente asignada (filas ajenas SYN preservadas).
  - dos appendSend concurrentes iguales→statuses recorded/existing exactos; fixture emite SQL sólo para recorded; contador SQL de mutación1. Otro ticket/reservation conflictivo nunca reemplaza.
  - freeze con o sin SEND/ACK preserva registros, niega todo nuevo SEND/ACK; replay byte-idéntico existing sin SQL.
  - native transaction callback throw→0fila; final-return throw/sync loss/readback loss después de commit→fila real posible y uncertain, contador SQL no aumenta.
  - actual SQL result throw después de commit→evento/ticket existe, SEND sin ACK; journal nuevo conserva SEND pendiente y niega consent SEND sin ticket ACK; fixture no reconstruye ACK desde SQL. No afirmar que appendAck autentica arbitrarios callers internos.
  - Retención SYN externa: iniciar observeFiniteReadOnlyWork con ctx original y retener la Promise REAL de transaction/SQL; alcanzar el gate antes de abortar esa lease. Con el mismo ctx, intentar únicamente otro scope observer sin efectos usando una lease SYN distinta, comprobada vigente/no abortada y dentro del MISMO deadline original: debe rechazar por outstanding.has(ctx), no por reutilizar la lease abortada. Tras settle real de todas las Promises del scope original, el mismo observer sin efectos puede entrar si esa lease SYN aún sigue vigente. La exclusión pertenece a stage-work (lib/mcp-qa-finite-stage-work.mjs:8–23,54–62 @7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be, bloba89baeb2578856dadedf700f9d66e180eb09120e), NO al journal: captureFinitePreparationIssuerContext.wait sólo conserva pending privado y leaseGuard no lo consulta (lib/mcp-qa-finite-preparation-issuer-journal.mjs:14–23, blob414450aa08f797bed5a41cf5cc697342785ce16b). No usar esto como prueba de exclusión entre métodos journal, autorización de nueva lease o drain entre RPCs; no añadir guards/interfaces.
  - clave extra/séptima fila/huérfano/metadata actor/version cambiada niegan. Capturar sin filtrar inventario desconocido.
  - Access menor que ticket, ventanas/reloj fuera de límite y getter count0 no generan mutaciones.
  Para pérdida SQL, fixture conserva pending y no llama appendAck desde lectura; la prueba demuestra que el protocolo fuente no hace replay, no que journal autentica al fixture.

- [ ] **7. Ejecutar checks proporcionales en cloud autorizado.**
  - node --test test/mcp-qa-finite-preparation-notice-provenance.test.mjs
  - node --test test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
  - node --test test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs
  - Lint dirigido a los cinco archivos con ESLint ya instalado del repo.
  Exigir0FAIL/0SKIP en nuevos casos; reportar cantidad/builds/run/head. Regresión store no debe afirmar enabled:false tras revokeGrant: autoridad real rechaza Monitoring authorization unavailable y conserva evento. No ejecutar esa prueba para modificar authority ni rehacer D0.4. Diff debe demostrar fase/M/SDK intactos, incluido exchanged_at actual y ACK histórico. Cualquier graph nuevo en producto requiere volver a root.

- [ ] **8. Guardar checkpoint y revisión root.** Un commit propio de cinco archivos, informe breve con RED causal/GREEN nativo, diff BASE..HEAD y pendientes. Si root autoriza qualifier temporal contents:read sin secretos, retirarlo del diff final y registrar run/head; este plan no lo autoriza por sí mismo. Root revisa spec/quality y aplica workflow SDD vigente; writer no crea helpers/reviewer. No segundo writer simultáneo.

- [ ] **9. Cerrar sólo esta unidad.** Entregar HEAD/tree/cinco paths/tests/limitaciones; no importar journal en runtime ni extender fase. Root puede aceptar SOURCE y seleccionar una siguiente unidad distinta. La aceptación no activa el receiver ni habilita API/humano/PC-off.


## Overrides de cualificación a los pasos históricos

Step7se limita a los dos NUEVOSarchivos de tests completos+lintcincofiles, conforme rulingproporcional anterior. Regresiones compartidas sólo si diff/fallo lojustifica y menorcasonecesario. Step8qualifier temporal ya autorizado sólo en scopeabove. No ampliar5filesnuevospara arreglar antiguo. StatusDONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED, con inquietudes y límites reales; preguntarroot antesde ampliarproducto.

Informe completo en docs/superpowers/reports/2026-11-05-finite-native-notice-provenance.md: BASE/codeHEAD/reportHEAD/tree; archivos/blobs/gráfoprotegido; REDcausal/GREEN primariosrun/job/attempt/head/comandos/counts/skips; lint/warnings; compilacionesreales/hashessólosilogged, sinrerunparaobtenerlos; exactnativevsSYN, existente≠permiso, ACK_DATA≠provenancia, retenciónobserver≠drain, readbackactualdiff5files+informe y qualifierausente. Finalrootstatus+SHAs+una línea tests+concerns; raíz prepara fullBASEdiff/reviewindependiente. No siguienteunidad.

Receiver fijoQA, Mforwardpre-write, verificación humana/CSRF/Access/preconnection/sourceactual, fase notices/terceroCLOSED/ownSEND/fullsetup/cleanup/guard/mount/ARM/hosted/PCoff siguen fuera. No DDL/runtime/alias/Entry/OAuthbrowser/OTP/tokens/permisos/cron/Containers/Max/main/merge. operationalReadiness=false;completePackage=false;PCoff=false.
