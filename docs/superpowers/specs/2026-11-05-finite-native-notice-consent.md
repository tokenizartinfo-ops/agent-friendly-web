# POST humano de consentimiento nativo e inventario privado

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Diseño para preflight, no autorización de implementación. Actualiza únicamente este diseño POST; los informes previos permanecen intactos. Inspección inicial dc4edafc0b5e4ba440cd32a21dd3dd58024e811a; reconciliación focalizada contra GET aceptado SOURCE f68797ca0ad083aa4e90be87c83b5f60f2aa691b/tree8f07c7e2bc98ab08f8a943f3c98bb9045b0af2b1. Código leído en cfe8f0ddde1d782757dd7e0d3160967f325df553; f687 añade cinco docs con producto idéntico según aceptación/readback root. Root acepta quality Approved with Minor/P3, sin Critical/Important; P3 cookie-list se difiere expresamente a POST, no está corregido. APIs GET reales coinciden con las propuestas. Sigue pendiente preflight root y futuro BASE de ejecución.

## Resultado y alcance

Una petición humana POST /monitoring/grant auténtica, recibida por M y QA fijos, verifica de nuevo identidad y CSRF, observa el ticket original y registra UNA decisión mediante el store nativo antes del ACK journal. Respuesta positiva únicamente después de dos snapshots completos iguales al frame esperado. La unidad incluye formulario GET activo sólo SOURCE. No monta rutas, no habilita avisos, suscripción, entrega, NoticeLink, nueva PhaseStage, source notices/finite, third CLOSED, ARM, hosting o PCoff. POST /monitoring/revoke y gestión posterior permanecen cerrados; el HTML no ofrece un control de retirada que este slice no implementa.

Store y journal aceptados son dependencias protegidas. ACK DATA/hashes describen relaciones; no autentican persona ni prueban por sí solos ejecución SQL. El productor fixed QA conserva la Promise y el resultado SQL reales en su continuación privada; un GET previo no hereda autoridad humana al POST. No flags, reloj caller, identityDTO, allowPending, callback aprobador, raw pair exportado ni source factory.

C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. Sin rearm/renew/retry. operationalReadiness=false; completePackage=false; PCoff=false.

## Filemap cerrado reconciliado (no seguir WIP)

1. lib/mcp-qa-finite-owner-phase-context.mjs: correlación privada de consent; baseline POST y handler fijo; activar HTML GET exclusivamente al aceptar toda esta unidad.
2. lib/mcp-qa-finite-owner-notice-get-wire.mjs: conservar exports GET y añadir gramática/metadata POST fijas y validator privado cookie-list común GET+POST que resuelve P3.
3. lib/mcp-qa-finite-owner-notice-get-forward.mjs: conservar export GET, añadir export Consent; compartir transporte dentro del archivo, selector privado constante de cada export.
4. lib/mcp-qa-finite-owner-notice-get-qa.mjs: conservar receptor GET; añadir receptor Consent y compartir plumbing privado de lease/errores.
5. NUEVO lib/mcp-qa-finite-owner-notice-consent-body.mjs: único lector de formulario de1024bytes con read/cancel reales retenidos. No cambiar native-wire global16384.
6. NUEVO test/mcp-qa-finite-owner-notice-consent-native.test.mjs.
7. test/fixtures/finite-owner-notice-get.mjs: extender gates/trace/inspect existentes para POST, sin segunda infraestructura ni fake resultado.
8. test/fixtures/finite-owner-qa-sdk.mjs: routing SYN fijo de POST sólo dentro del opt-in noticeGet existente.
9. test/mcp-qa-finite-owner-notice-get-native.test.mjs: actualizar formulario/POST ahora reconocido y cierre de replay; añadir pure grammar y nativo P3 cookies. Las negativas GET permanecen.
10. test/fixtures/finite-owner-io-fanout.mjs: sólo categorías/markers de las llamadas nuevas si no las captura ya; no scheduler.

No renombrar estos archivos en esta unidad: conserva imports GET y evita refactor masivo. El nombre get queda histórico, documentado con comentario breve. No nuevo mode de initial-entry ni DDL: reutilizar mode phase-context-sdk-token-notice-get. El world aceptado ya completa siete objetos monitoring en TODOS los modos phase-context y verifica conservación de cuatro DDL consent, tres eventos ajenos y dos grants (215–224, blobbfb918ebe15edc654de0e57d5aecf83757129b07). Conservar ese comportamiento; no reducirlo a noticeGet ni editar world. Ningún undécimo archivo implícito; diferencia nueva del BASE vuelve a root.

Protegidos: store/journal/records/schema; authority y owner-http ordinarios; SDK/OAuth/native-wire/stage-work/lease; source stubs y entrypoints montados; package/config/workflows/mount/flags. Fixture no modifica bytes producto para lograr GREEN excepto cualificación SYN expresamente aprobada por root en su preflight futuro.

## APIs fuente fijas

Exports adicionales:
- wire: finiteOwnerNoticeConsentTarget='https://afw-private.invalid/_finite-owner/monitoring/grant'.
- wire: qualifyFiniteOwnerNoticeConsentRequest(request,bytes) -> frozen {method:'POST',url,handle}. handle es entrada no confiada, nunca autoridad.
- wire: readFiniteOwnerNoticeConsentMetadata(headers) -> frozen {boundary,method:'POST',url,mVersionId,requestId}.
- forward: forwardPrivateFiniteOwnerNoticeConsent({request,env,ctx},originalLease) -> Promise<Response>.
- qa: createPrivateQaFiniteOwnerNoticeConsentReceiver({ctx,env}) -> frozen {fetch(request)->Promise<Response>}.
- phase-context: handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease) -> Promise<Response>.
- body: readFiniteOwnerNoticeConsentBody(message,check,firstFailure) -> Promise<Uint8Array>. Últimos dos argumentos son guards/señal de fallo del ciclo ya poseído, patrón native-wire; jamás callbacks de aprobación. No acepta límite, identity, source o policy.

No otros exports ni fábricas públicas. Shared transport private sólo elige literales GET/Consent desde estos exports; el caller no pasa kind/target/cap/permission. GET no acepta POST por fallback. QA Consent acepta únicamente transporte POST y target exacto; metadata exige original POST y URL finiteNativeOrigin+'/monitoring/grant' sin query/hash/userinfo. QA GET conserva su target/gramática.

M comprueba root lease genuina, namespace/actor/version/holders como GET/OAuth. Copia sólo finiteNativePreservedHeaders, sobrescribe las cinco x-afw-finite metadata; boundary canónico y UUID/version fijos, límite metadata16384 heredado del contrato GET. Jamás conserva metadata del navegador. Fetch real redirect manual, signal original; respuesta elegible200 HTML UTF8/no-store, allowlist GET/OAuth existente; errores finiteNativePending con mayRetry:false y statuses seguros. No JWT/handle/source/rows en errores/logs. M y QA no son nuevos endpoints desplegados.

## Grammar, cuerpo y retención

Original Request real POST /monitoring/grant, Origin exactamente finiteNativeOrigin. Content-Type exactamente application/x-www-form-urlencoded, como formulario ordinario; no parámetros MIME. Body UTF8 fatal de1..1024bytes, rechazar escapes % malformados; URLSearchParams debe tener una única entrada handle, getAll(handle).length===1, valor /^[A-Za-z0-9_-]{43}$/. Nada decision/action/grant/sequence/expiry/project ni duplicados/extras. Cookie/assertion<=8192 y sin CRLF. NO copiar la grammar permisiva actual de GETwire11 ni modificar OAuth ordinario: aplicar el validator cookie-list privado compartido GET+POST definido abajo. Cookie __Host-afw-monitoring-owner única y valor43 válido; SHA256(cookieValor)===SHA256(handle)===reservation.ticket.handleHash. Prepare cookie se verifica separadamente.

Cookie-list privado (sin export/config/opciones de autoridad): distinguir header ausente null de presente vacío. Ausente sigue permitido por grammar GET; QA exige prepare posteriormente. Presente vacío/OWS-only, segmento vacío inicial/intermedio/final o nombre repetido exacto (case-sensitive) deniega. Lista con OWS sólo exterior y separador exacto "; " de RFC6265§4.2.1; no trim genérico de nombres/valores ni filtrar segmentos. Cada par se divide en el PRIMER "=": el valor puede contener más "=". Nombre no vacío sólo ASCII HTTP token/tchar (ALPHA/DIGIT y ! # $ % & ' * + - . ^ _ backtick | ~), según [RFC9110§5.6.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2). Valor vacío o secuencia de cookie-octet, opcionalmente entre DOS comillas dobles; dominio ASCII hex21,23–2B,2D–3A,3C–5B,5D–7E. Ni comillas interiores/solitarias, escape backslash, coma, semicolon, espacios/controles ni Unicode. Sin unquote/URLdecode/normalización al preservar headers. [RFC6265§4.1.1](https://www.rfc-editor.org/rfc/rfc6265.html#section-4.1.1), [§4.2.1](https://www.rfc-editor.org/rfc/rfc6265.html#section-4.2.1). Nombres desconocidos bien formados y valores legítimos como base64 con "=" o valor quoted se conservan. Las dos cookies propias siguen su formato emitido original sin comillas y hashes existentes: parser genérico válido no las autoriza.

Lector específico se usa en M antes de fetch y en QA antes de baseline. Comprueba suma real de chunks, no Content-Length; abort/holder/overflow/UTF8 erróneo no llegan a store. Registro de Promise REAL del lector antes de race mediante retainFiniteOwnerStagePromise; finiteNativeOperation conserva la cadena real en waitUntil. Al fallar, firstFailure se señala pronto y se espera cancel real dentro de la misma cadena retenida. No void cancel, .text() ilimitado, tee/clone con rama sin consumir ni segunda lectura del body. Respuesta utiliza finiteNativeBytes existente16384. Cada operación captura failed=false; señal de fallo establece failed=true ANTES de rechazar; guards posteriores comprueban failed además de lease/holders. No continuar SQL/ACK tras fallo capturado aunque una Promise tardía resuelva.

Contexto outstanding de stage-work bloquea un ingreso ajeno en mismo ctx hasta settlement real y abort de raíz. No atribuir exclusión al Set privado del journal ni usar lease ya abortada para demostrarla. Scope es local, no mutex distribuido ni physical drain.

## Baseline privado y origen de confianza

Dentro del patrón GET observeFiniteOwnerRequestWork + finiteNativeOperation, captura holders request/headers/ctx/env/DB/source bindings/version/fetch/SDK alias originales antes de await. Crear clock sólo desde readFiniteOwnerRequestDeadline, nunca desde ahora+budget. Reconstruir original Request desde metadata y bytes ya acotados.

observeOwnerPhasePair sigue PRIVATE y devuelve dos snapshots completos iguales. Nuevo qualifyNoticeConsentBaseline(pair) PRIVATE usado sólo por handler POST:
- original installed connection receipt válido, source proyectada read_consent exactamente como lines401–403 de GET aceptado, sin consultar qualifySettledOwnerPair público que exige notice vacío;
- issuer original sin SEND desconocidos, SDK root/begin/approve/complete asentados/sin pending, GrantLink/relation/ConnectionRef actuales completos;
- schema7 exacto en ambos snapshots, notice reservation original + ticket SEND + ACK applied, fila TicketRow14 completa exacta y hash coincidente; consent.send/ack=null, freeze=null y events=[];
- Mversion===source.currentPublication.versionId; QA actor/version/publicación/pin originales/current del observer, owner/revision actuales, UUID de issuer reservation. No latestgrant ni COUNT global.
No exporta pair/expected/continuación. expected=structuredClone(baseline.second) queda léxico. Puede obtener contexto privado {source,preconnectionId,capsuleHash} de esa proyección validada sin devolverlo a HTTP.

Access de POST: verifyCloudflareAccessJwtWithExpiry con token del header original y source.access.teamDomain/audience del factual baseline; RS256/iss/aud/subject/exp del MISMO payload firmado (lib/cloudflare-access-identity.mjs:54–79,103–114), sin verifier/keySet/now inyectables. Realm=evidence('realm',{...source.access,origin:source.origin}); subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject}). Prepare cookie única __Host-afw-finite-prepare=[a-f0-9]{64}, SHA256(valor)===prep.ticket.ticketHash. qualifyFiniteOwnerApprovedTicket con currentTicket/ticket/use/pre/approval/sourceSnapshot originales, realm, subjectHash y Date.now real; identity.subject===ownerSelection.subject===issuer identity.subject===ConnectionRef.subject. La aprobación original de conexión se comprueba, pero la decisión de avisos es el POST actual de acción fija + CSRF actual.

Reverificar el mismo JWT capturado tras observeTicket/recheck, antes de consent SEND; exigir mismo subject/expiry firmados, cookies/headers/holders intactos. Source current viene del recheck completo, nunca de opciones. Antes SQL repetir guard actual de expiración/holders y full recheck ya después SEND; no endpoint ni fetch nuevo de permiso. Ni JWKS cache ni expiración comprueban revocación externa instantánea de Access: el contrato real disponible es firma/exp y fuente actual, no una capacidad inventada.

accessPOST=min(r.accessExpiresAt,pre.owner.accessExpiresAt,verified.expiresAt,C0). Si r.ticket.expiresAt>accessPOST negar ANTES SEND y sin observar/mutar bajo Common incompatible. No recortar ticket ni expiry histórico. Narrow padre por todos los techos originales: C0/pre/approval/ConnectionRef/consent/grant/Access/ticket.permissionExpiresAt. Ningún menor plazo crea permiso nuevo.

## Common, journal y secuencia léxica

r=reservation original validada. Common EXACTO {identity:r.identity,expectedGrant:r.expectedGrant,consumedAt:r.consumedAt,accessExpiresAt:accessPOST,preconnectionExpiresAt:r.preconnectionExpiresAt,window}. ticket=r.ticket intacto. Instancia store=createFinitePreparationIssuerStore({ctx,env}) y notice journal únicos del POST. La observación y INSERT comparten ESTA instancia/lease hija/Common/window idénticos; no necesariamente la instancia histórica GET.

Una única child <=5000ms cubre observe→SEND→INSERT→ACK y rechecks; window.startedAt real al entrar, deadline=min(deadline hija original, todos los techos). No cerrar/recrear child entre observe e INSERT. Baseline/body/Access inicial consumen padre original<=30000ms, no presupuesto nuevo.

Estados privados: baseline, ticket-observed, consent-send-recorded, consent-sql-pending, consent-sql-resolved, consent-ack-recorded; failed absorbente. Referencias separadas witness, ownSend, actualSqlPromise, actualSqlResult, sqlSettled; appendPromise nunca reemplaza SQL. No objeto estado transportable.

1. Baseline y auth/CSRF válidos; recheck completo esperado.
2. Entrar child; await store.observeMonitoringTicket({...Common,ticket:r.ticket},childLease). Guardar witness REAL status observed y comparar fila14 con expected.noticeRows.tickets[0]; null/error termina. Objeto clone/WeakMap de otra instancia no sirve; este witness acredita observación nativa, no humano.
3. recheckConsentOwned() sin argumentos; segundo verify firmado y guards. Crear Send con purpose afw.finite-preparation-notice-send.v1, identityHash/reservationHash originales, operation='consent', accessExpiresAt=accessPOST, window, issuedAt=Date.now. decisionHash=initialHash('afw.finite-preparation-notice-decision.v1',{identityHash:r.identity.identityHash,ticketRequestId:r.ticket.requestId,handleHash:r.ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt}). requestHash=initialHash('afw.finite-preparation-notice-request.v1',{operation:'consent',common:Common,ticket:r.ticket,decisionHash}). Sellar con codec existente.
4. Retener appendSend({preconnectionId,record},childLease). Sólo status recorded/hash exacto continúa; existing/uncertain/error termina SIN INSERT. Actualizar únicamente expected.records.notice.operations.consent.send y expected.anchor.notice; guardar ownSend referencia creada aquí. recheck completo exige events=[].
5. Guard actual inmediatamente antes de store.insertMonitoringConsent({...Common,ticketWitness:witness},MISMA childLease). Capturar su Promise REAL antes de race; sqlSettled=false. Nunca observar para adivinar resultado mientras pendiente. Native SQL revalida dueño/revisión/grant vivo/fence/consent consumed/window/Access/ticket/history0 en statement real.
6. Tras resolver real, guardar resultado y sqlSettled=true; exigir applied y EventRow12 exacta según abajo. no_mutation/error no produce ACK ni éxito, no reintento. Actualizar sólo expected.noticeRows.events=[fila detached real]; recheck completo.
7. ACK purpose afw.finite-preparation-notice-ack.v1, sendHash=ownSend.recordHash, outcome='applied', rowHash=initialHash('afw.finite-preparation-notice-row.v1',actualSqlResult.row), sequence=actualSqlResult.row.sequence, observedAt=Date.now<Send.window.deadline. appendAck({preconnectionId,operation:'consent',record},MISMA child); exigir recorded/hash; actualizar únicamente expected notice.ack/anchor; recheck completo. SQL Promise/result conservados hasta este punto y antes de responder200.
8. Cerrar child y guard original/identity/failure inmediatamente antes de HTML. Fallo final puede dejar evento+ACK durables sin respuesta positiva: no compensación, no retry ni reconstrucción desde storage.

recheckConsentOwned exige guards, issuer/SDK asentados, freeze ausente; si actualSqlPromise&&!sqlSettled deniega. Sólo posición y referencia ownSend creada/recorded aquí admiten su SEND pendiente; estado resolved/ack exige actualSqlPromise REAL resuelta y actualSqlResult. wait(observeOwnerPhasePair(...parent original...)) bajo activeChild, guards antes/después; canonical(first)===canonical(second)===canonical(expected ENTERO). No enmascarar timestamps ni partes. Grant.exchanged_at actual permanece completo, proyección histórica sólo en ACK issuer original. Native store guard failure absorbente y failed del handler no se resetean.

## EventRow y ampliación factual mínima

El observer sigue sin parámetros de tolerancia. Reusar consultas GET, cap schema8/DO list7/ticket2/event3, success===true y results Array antes de interpretar vacío, first-primary nueva con factual SELECT como primera sentencia. Schema parcial/malformado/error deniega. Schema totalmente ausente admite únicamente reader viejo vacío; POST exige schema listo antes de SEND. Scope prefijo propio/preconnection y grant UUID original; filas ajenas nunca se enumeran ni invalidan flujo.

EventRow exacta, sin campos extra:
{sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at}.
sequence entero seguro>0 del RETURNING AUTOINCREMENT global, NO expectedSequence+1; grant_id/project_id/user_id/client_id/resource/revision igual identity original; action='grant'; purpose='afw.dossier-monitoring.v1'; request_id=ticket.requestId; expires_at=ticket.permissionExpiresAt absoluto original; issued_at entero nativo n.ms>=max(consentSend.window.startedAt,ticket.issuedAt), >=Send.issuedAt y <min(Send.window.deadline,ticket.permissionExpiresAt). Todas las columnas SQL/tipos, bytes snapshot y hash completos. Event expiry no depende de response time ni se renueva. Ticket expected_sequence permanece0; grants ajenos pueden elevar sequence global sin invalidar original.

Retener correlaciones reservation/ticket GET existentes. Reemplazar sólo el rechazo incondicional de eventos/consent en noticePrimary por:
- Sin consent SEND: events=[] y consent ACK ausente.
- Consent SEND válido, ticket ACK applied y fila14 exacta: events=[] o una EventRow exacta como arriba si ACK ausente. Hecho privado incompleto, ninguna entrada pública lo admite.
- ACK applied: EXACTAMENTE un evento, rowHash completo y sequence iguales a ACK; ACK observado>=Send.issuedAt, <Send.deadline; Event.issued_at<=ACK.observedAt.
- ACK no_mutation: events=[] y hashes/sequence null; hecho de cierre, jamás baseline/retry. Productor POST de este slice no emite esta variante.
- >1 evento original, revoke, evento sin SEND, otra request_id, discrepancia de cualquier campo/hash, unknown key, overflow o freeze deniega. No tomar sólo última fila. Retirada real deja evidencia intacta y deniega.
Consent sólo se correlaciona si ticket ACK original cumple todas relaciones previas. Lectura de historia no concede nueva ventana: tiempo actual debe seguir dentro de techos actuales; ACK no extiende SEND ni store window.

qualifySettledOwnerPair público y OAuth conservan rechazo a TODO notice/ticket/event del UUID/prefijo original. GET conserva baseline vacío y rechazo a consent; su continuación sólo tolera sus propias tres filas ticket, nunca evento/consent. Nunca se infiere etapa nueva desde cinco/seis filas.

## HTML y errores

GET SOURCE pasa a form method=post action=/monitoring/grant, hidden handle escapado, botón habilitado “Permitir avisos temporales”, CSP form-action 'self'. Texto: “Podés registrar un permiso temporal para avisos sobre este expediente. No cambia datos ni publica. El permiso vence en la fecha indicada. Registrar el permiso no confirma una suscripción, entrega ni revisión del asistente.” Mostrar expiry original y enlace fijo al expediente. Sin autosubmit/JS ni checkbox preaprobador. Cookie GET conserva atributos Secure/HttpOnly/SameSite=Strict/Path=/ y expiry original; no emitir un ticket nuevo por POST.
POST200: “Registré tu decisión temporal. Esto no confirma que exista una suscripción ni que el asistente haya revisado el expediente.” Fecha original y enlace fijo al expediente. No enlace de retirada/revisión no implementado, no datos internos. No-store/nosniff/Referrer-Policy/CSP/frame-ancestors/base-uri como GET; form-action none en éxito sin formulario. Puede eliminar cookie monitoring con mismos atributos/Max-Age=0 tras éxito; no borrar prepare cookie/historia.
Errores conservan respuesta pending saneada, sin recibo positivo ni instrucción automática de retry.

## Costo y aceptación

La ampliación factual de consent NO agrega consultas por snapshot sobre GET: mismos DO list y schema/ticket/event SELECT completos, sólo valida filas ya leídas. POST agrega recorrido completo propio: baseline y rechecks de pasos1,3,4,6,7 (6 pares previstos, incluyendo baseline; contabilizar implementación real), dos verificaciones Access, observe y INSERT nativos con sus preflights reales, dos appends journal con transaction/sync/readback. Por par con schema+identity, notice añade2DO list+6D1 respecto al reader preGET; no atribuirlos dos veces ni declarar totales98/112. Observar cantidades/sesiones/latencias/peak/graph reales en GREEN sin ampliar fanout2, 5s ni30s ni omitir snapshots/owner/SDK. Si no cabe, deniega y root decide; no quitar rechecks para hacer pasar test.

## Negativos que aíslan correlación de fuentes

La review GET advierte que corrupciones asentadas anteriores pueden fallar primero por codec/hash/linkage del journal. No atribuirles aislamiento de cada predicado. Casos POST deben partir de GET nativo exitoso (y POST exitoso sólo para caso evento), alterar únicamente DATA de prueba negativa y volver a sellar TODOS los enlaces afectados con sealFinitePreparationNoticeRecord y, para identity.sourceRevision, sealFinitePreparationIssuerRecord('Identity',...). No cambiar source real ni fabricar prefills positivos.

Variantes mínimas independientes:
- identity.sourceRevision distinta40hex + identityHash recalculado; conservar actor/QA/preconnection; notice Reservation resealed, ticket Send identityHash/reservationHash/requestHash actualizados y ACK.sendHash resealed. Issuer/source auténticos intactos -> comparación de identidad notice/issuer falla.
- issuerReservationHash, originalGrantAckHash, grantLinkHash o connectionHash distinto64hex, UNA celda por variante; reseal Reservation→Send.reservationHash→ACK.sendHash. Los hechos originales issuer/GrantLink/ConnectionRef no cambian -> correlación296 falla.
- ticket.requestId UUID diferente en Reservation; reseal Reservation, Send.requestHash sobre ticket alterado y ACK.sendHash. Ticket SQL real y ACK.rowHash original permanecen intactos -> expectedNoticeTicket/fila14 falla en301, no journal.
- tras POST realmente exitoso, ACK consent.sequence entero positivo distinto del real; reseal ACK, manteniendo rowHash real y demás relaciones -> correlación evento/ACK falla; cero NUEVOS consent SEND/INSERT. Puede agregarse rowHash incorrecto64hex resealed como variante separada, sin afirmar que invalida codec.

Precondición de cada negativa: codecs/encode/decode válidos y read real del journal con lease vigente devuelve inventario válido sin error; no basta sello local. Trace SYN pasivo en fixture marca entrada al bloque correlador pertinente y ausencia de salida normal, sin devolver pair/valores sensibles ni cambiar retorno/guards. Verificar que antes de ese bloque no hubo fallo y que sólo cambió la relación objetivo; de otro modo reportar rechazo no aislado y corregir fixture, nunca proclamar predicado probado. Para evento, observer debe llegar a validación event antes del rechazo público/baseline por history; no usar sólo “POST rechazó” como prueba. Luego petición POST real debe fallar ANTES de nuevo consent SEND/SQL, comparando deltas nativos; fuente/issuer/ticket/eventos reales e historia ajena byteexact. Este acceso SYN de corrupción no existe en producto, no aprobación ni replay permisivo.

Pruebas nativas y regresiones literales en plan. GREEN debe usar JWT SYN realmente firmado, JWKS de fixture por red existente, GET nativo real previo, D1/DO/workerd reales; no prefill positivo ni verifier fake. Mutaciones negativas se rotulan SYN. Medición del mismo run aceptado; no repetir50ms/allSDK/build estándar sólo para cifras. Comparar bundle QA/M y entradas/metafiles reales del harness; nuevo reachability fuera de estos graphs requiere root.

## Riesgos y handoff

Carrera entre última lectura source y SQL no es transacción global. Store protege predicados SQL actuales; un cambio externo justo después del último read puede dejar evento durable y respuesta denegada al recheck. Conservar historia, no prometer impedir todo cambio de publicación simultáneo. Unknown ACK/SEND/error/cancel no autoriza replay; actor restart no recrea witness/continuación. Revocar grant de verdad hace fallar resolver ordinario con “Monitoring authorization unavailable”, no enabled:false; CLOSE sólo no revoca grant. No editar authority para acomodar assertion.
GET aceptado quedó reconciliado a f68797ca (mismo producto cfe8f0dd). Root debe confirmar cualquier delta del futuro BASE, filemap/qualifier y permiso cloud específico, leer spec+plan completos y activar. El próximo qualifier podrá usar dos jobs credential-free paralelos (POST nativo y GET/regresiones), cada uno<=15min; es configuración futura de preflight, no permiso de ejecutar ahora. Rollback docs sólo commits propios con CAS; rollback producto sólo commits futuros propios sin borrar D1/DO/history. SOURCE acceptance no activa permisos humanos, fases o runtime.
