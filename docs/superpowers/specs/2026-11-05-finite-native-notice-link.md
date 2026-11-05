# NoticeLink nativo desde la continuación privada de consentimiento

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Scope de diseño aprobado por root: link-only, misma child/continuación POST después de ACK y recheck reales. No ejecución hasta reconciliar POST aceptado, preflight root y futuro BASE. Pin de inspección2f96acb45ec5477d559f85070aa438d2e2e00822/treece6242321aa5177f5828ec592a7bb00d6d6cd91a. POST es contrato documental61b8bb4cecae0a7459ea1ca55a7116a41afb520d bajo implementación, NO aceptado; no se siguió WIP.

## Resultado y límites

El mismo POST humano que obtiene un EventRow nativo y su ACK durable añade el NoticeLink existente, comprueba durabilidad/lectura real y revalida el frame entero antes de200. El link queda como hecho privado enlazado al consentimiento original. No nueva ruta/export/phase, fuente notice_consent/finite_prearm, NoticeLink como permiso, publicación, flag, suscripción, entrega, ARM, cleanup ni hosting. No backfill: consentimiento anterior sin continuación viva no puede producir link desde ACK histórico.

C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. Extender MISMA child POST, sin reiniciarla ni mover SQL a otra ventana. Si no cabe, se informa/deniega conservando historia, no se quitan rechecks. operationalReadiness=false; completePackage=false; PCoff=false.

## Filemap cerrado (cuatro archivos)

1. lib/mcp-qa-finite-owner-phase-context.mjs: productor léxico al final del handler Consent propuesto; único suffix inventory notice adicional; read/correlación/snapshot privados.
2. test/fixtures/finite-owner-notice-get.mjs: extender fixture SYN existente para observar putLink/sync/readback y gates reales; corrupción negativa/no autoridad.
3. NUEVO test/mcp-qa-finite-owner-notice-link-native.test.mjs: recorrido y negativos específicos.
4. test/mcp-qa-finite-owner-notice-consent-native.test.mjs: adaptar únicamente positivo a exigir link final y cobertura de respuesta tras link; nombres reales se reconcilian al aceptar POST.

No cambiar preparación-store/records, notice-store/journal, owner-preparation antiguo, stage/profile/source stubs, forward/wire/QA, OAuth/SDK, world/DDL, workflows/config/flags. No nuevos helpers/exported callbacks o fichero de framework. Nuevo BASE que cambie APIs/fixture requiere ajuste explícito root antes de ejecución; el writer no amplía mapa.

## Contratos existentes, sin rediseño

NoticeLink DATA exacta y sin purpose ni recordHash:
{preconnectionId,grantHash,eventHash,sequence,acceptedAt}.
preconnectionId/grantHash/eventHash son hex64; sequence entero seguro positivo; acceptedAt tiempo entero. Record codec existente: encodeFinitePreparationRecord('NoticeLink',record), decodeFinitePreparationRecord('NoticeLink',raw), hashFinitePreparationRecord('NoticeLink',record). Su dominio es afw.finite-notice-link.v1; no agregar campos de phase/ACK/lease/actor/human.

createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now}):
- putLink({kind:'notice',record},lease) -> {status:'recorded'|'existing'|'uncertain',recordHash}; puede lanzar.
- readLink({kind:'notice',preconnectionId},lease) -> {status:'observed'|'absent',record}.
Key exacta connection-preparation:<original preconnectionId>:notice. Append-once; old byte-exact->existing, distinto->rechazo. putLink comprueba Preconnection y GrantLink actuales en transacción y acceptedAt dentro de sus límites; no valida por sí mismo SQL/Access/decisión. Su transaction NO incorpora storage.sync: la continuación debe esperar sync y readback explícitos además del ACK de putLink.

Capturar storage/sync/transaction/get/holders con captureFinitePreparationIssuerContext ya usado por POST. Crear store de preparación fijo dentro del handler, sin opciones externas. Reutilizar prepEncode/prepHash/evidence imports existentes. No llamar recordFinitePreparationNotice({requestId,sequence},lease): requiere notice_consent, relee request y no conserva resultado SQL; forwardPrivateQaFiniteOwnerNotice sigue unavailable.

## Proyección de evento: hash correcto

Sea row=actualSqlResult.row ORIGINAL del store, ya validada/correlacionada por POST en ambos snapshots y en ACK consent. Proyección EXACTA:
event={grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at}.

eventHash=hashFiniteOwnerEvidence('event',event), dominio afw.finite-monitor-consent-event.v1. NO usar digest afw.finite-preparation-notice-row.v1 del ACK: ese hash cubre EventRow SQL con nombres snake_case y es distinto. Ambos se comprueban contra la MISMA fila real, sin rellenar uno desde el otro.
grantHash=issuerRows.grantLink.grantHash===SHA256(original issuer identity.grantId); sequence=row.sequence real, no1/expectedSequence+1. acceptedAt=Date.now muestreado UNA vez después de ACK/recheck, en continuación viva; no es columna SQL ni caller timestamp. Debe ser>=consentAck.observedAt, >=row.issued_at y >=GrantLink.acceptedAt, <=Date.now al observar y <todos los techos vigentes. No cambia expiración original; link no tiene expiry propio.

## Observer privado y snapshots completos

Puntos reales en pin: facts143–150 inventory prefix/list 17/size<=16 y whitelist de cinco suffixes; noticePrimary272–305; snapshot368–375; requireEmptyNotice387–399. POST propuesto ya amplía noticePrimary a ConsentRow. Esta unidad sólo:
1. Añadir 'notice' a whitelist existente del prefix original. Mantener list 17, size<=16 y demás inventarios/caps. No aceptar otra aprobación/efecto/stage por presencia de link.
2. En qualify, usando getRecord existente, leer data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:capsule.preconnectionId},false), también cuando se espera ausente. Una lectura DO real adicional por snapshot. Require equivalencia presencia y encode byte-exact con f.inventory.get(prefix+'notice'); no inferir ausencia de error.
3. Añadir noticeLink a lista privada snapshot.preparation (null ausente). records.inventory y anchor.inventory ya contienen la fila raw. No alterar anchor.notice (journal seis filas) ni noticeRows (schema/tickets/events). No nuevo campo público.
4. En qualify, DESPUÉS de noticePrimary y ANTES de devolver q/snapshot, ejecutar correlación Link incluso si noticePrimary retornó temprano por esquema/issuer ausentes. Si noticeLink presente exigir:
   - issuer/SDK completos y vigentes, GrantLink/relation/ConnectionRef originales, schema 7, ticket ACK applied/fila 14 exacta, consent SEND y ACK applied/fila 12 exacta, freeze ausente;
   - l.preconnectionId===original, l.grantHash===actual GrantLink.grantHash===SHA256(original grant UUID);
   - l.sequence===event.sequence===consentAck.sequence y eventHash===evidence('event',proyección de EventRow actual);
   - acceptedAt>=max(consentAck.observedAt,event.issued_at,GrantLink.acceptedAt), acceptedAt<consentSend.window.deadline y acceptedAt<min(accessSEND,pre/approval/ConnectionRef/consent/grant/ticket/permission/C0), acceptedAt<=Date.now;
   - tiempo actual todavía bajo los techos vigentes como POST; conservando exchanged_at actual y ACK histórico issuer separado.
   Link sin event/ACK, no_mutation, revocación, orphan, mismatched identity/hash/sequence/time o evento extraño original deniega. No global COUNT/latest grant, sólo UUID/prefijo propio. Filas/prefijos de otros proyectos intactos.
5. Sin link: seguir validando notice/event como POST; un consentimiento nativo asentado sin link es historia incompleta observacional, jamás apta para replay/backfill.
6. requireEmptyNotice añade comprobación explícita de preparation.noticeLink. Público3keys/OAuth/GET permanecen cerrados frente a history/link propio. Baseline privado POST exige noticeLink===null Y estado ticket ACK/event0 original; un POST nuevo no puede completar link de consentimiento previo. SourceBase y proyección read_consent NO cambian por Link.

Ambos snapshots completos se comparan entre sí y contra expected; no omitir filas/columns/owner/SDK/source ni normalizar grant.exchanged_at. Preparación.record/link hashes validan DATA; las correlaciones y current checks son responsabilidad del observer, nunca source factory.

## Continuación productora exacta

Punto de extensión: dentro de MISMA clock.child de Consent, después de appendAck recorded, update expected consent ACK y recheckConsentOwned completos, ANTES de activeChild=null/child.close y HTML. No otra petición, lease, ventana o endpoint.

Precondiciones privadas simultáneas:
- identity/CSRF/prepare/approval originales del POST fueron verificados por servidor; headers/holders siguen idénticos y tiempo actual permitido;
- actualSqlPromise REAL resuelta, sqlSettled=true, actualSqlResult.status==='applied'; EventRow exacta igual expected.noticeRows.events[0];
- ownSend creado aquí y recorded, ownAck creado de ese resultado con appendAck recorded, recheck completo ya hecho;
- expected.preparation.noticeLink===null y key ausente en inventory; failed=false.
No param/callback/WeakMap nuevo admite estas condiciones. Una variable ownAck privada, si POST aún no la conserva, mantiene el record concreto producido y resultado de append, no lo reconstruye de una lectura.

1. Guard del parent+child+failure/holders/Access actual y recheck ya realizado tras ACK. Sample acceptedAt una vez y construir ownedNoticeLink cinco campos de referencias locales originales. Validar codec y relaciones anteriores antes de llamada.
2. position='notice-link-pending'; linkSettled=false. Retener linkPromise REAL=preparationStore.putLink({kind:'notice',record:ownedNoticeLink},activeChild) antes de race, sin sobrescribir actualSqlPromise/result/settled ni appendAckPromise. Await bajo wait/activeChild; require recorded y recordHash===prepHash('NoticeLink',ownedNoticeLink). existing/uncertain/error termina sin200, sin retry/read-to-recover.
3. Guard; await Promise REAL de storage.sync usando método capturado y retain; luego readLink real en MISMA child, require observed + prepEncode byte-exact del record y hash esperado. Mantener linkPromise/result/referencia propias. No usar transacción ACK como sustituto de sync.
4. Sólo tras sync/readback normales: linkSettled=true; actualizar expected.preparation.noticeLink=clone(record), insertar [prefix+'notice',prepEncode('NoticeLink',record)] en expected.records.inventory conservando orden, expected.anchor.inventory=clone(expected.records.inventory); ninguna otra celda. position='notice-link-recorded'.
5. recheckConsentOwned() completo extendido: deniega si SQL/linkPromise pendiente, exige referencias/results locales reales según estado; link-recorded exige put recorded+sync/readback satisfactorios y exacta ownedNoticeLink. Await ambos snapshots completos, comparar canonical(first)===canonical(second)===canonical(expected). Sin rawpair exportado ni tolerancia desde parámetros.
6. Guard final dentro child, cerrar child normalmente, guard original/failure/Access antes de200. Mantener respuesta POST humana sobre decisión temporal: no link hash/IDs internos ni “suscripción lista”. No autoavanzar fase o publicar.

No journal SEND extra para Link: es append local one-shot existente; consent SEND/ACK nativos y baseline cerrado ya impiden otra continuación. Unknown Link commit puede dejar Link durable sin200: se conserva como hecho, no se completa/reintenta desde lectura ni se borra. ACK consent permanece histórico aunque link falle. No freeze automático ni nueva operación en journal6rows.

## Fallo, retención y carreras

Retener Promise reales de putLink/transaction/sync/readback y full snapshots antes de races. firstFailure/failed absorbentes POST siguen activos; guard comprueba holders antes/después awaits. Abort/expiry puede retornar denegación pronto mientras transacción/sync real sigue pendiente; scope local stage-work queda outstanding hasta settlement según contrato existente. No Set journal como mutex, no physical drain/distributed cancellation.

current SQL/event/source checks antes y después del append no son atomicidad global D1+DO/control plane. Si revocación/cambio vence justo después del último read, puede quedar Link histórico y respuesta503; no declarar que Link otorga permiso tras revocación. Lectura posterior deniega. Evento SQL/ACK no se borran para aparentar rollback. CLOSE sólo no revoca grant; real revokeGrant cambia rechazo ordinario a Monitoring authorization unavailable, no enabled:false.

## Downstream explícitamente cerrado

Records ya contienen phases closed_ui/read_consent/notice_consent/finite_prearm; no inventar otra ni reinterpretarlas. notice_consent exige stage='notices', receipt de publicación real y profile exacto: monitoring owner flag/policy fija grant/project/client/expiry; qualifyFiniteOwnerInstalledStage exige StageApproval/TicketUse/upload/activation/predecessor connection. Link por sí solo NO acredita esa segunda publicación.

stage='finite' requiere además NoticeLink y dos predecessors en stage-facts; final readFiniteOwnerPreparationFacts requiere source.finite_prearm y tres receipts. El tercer CLOSED/prearm y su posterior conversión a full setup son unidades posteriores; no ejecutar publication/config aquí. El profile de conexión actual sólo acepta closed_ui/read_consent/notice_consent: no derivar finite_prearm por label ni añadir trueflags. Link-only no requiere tercer CLOSED; hacerlo consumidor de una nueva fase sí ampliaría alcance prohibido.

## Costos, aceptación y handoff

Sin D1 SELECT nuevo: ticket/event/issuer/current/SDK provienen de pares completos POST existentes. Sí +1 DO readLink por snapshot (+2 por par) siempre, incluido estado vacío. Con link añade bytes de raw inventory + registro privado en snapshots, manteniendo caps. Productor suma transacción putLink, sync, readback y UN par completo adicional tras link; recheck postACK ya existente no se sustituye ni duplica innecesariamente. Es decir POST pasa de sus pares reales aceptados a +1 par, sujeto a reconciliación, no asumir número fijo anterior.

Medir en mismo GREEN queries/DOops/get/list/transaction/sync/HTTPfanout/bytes/metafiles/childelapsed/parentelapsed. No heredar98/112 ni cifras POST WIP; no repetir50 ms/all SDK/build estándar para métricas. No aumentar fanout 2/caps/plazos. Si deadline original impide completar, reportar con estado durable real y root decide unidad futura; no renovar.

Plan especifica RED causal y GREEN nativo. JWT SYN realmente firmado, Access/CSRF originales, GET+POST y D1/DO reales, sin prefill positivo ni verifier fake. P3 cookie-list y pruebas de correlación resealed pertenecen a POST aceptado y se conservan sin arrastrar fix nuevo. Root debe leer spec/plan, reconciliar actual POST/APIs/estado y definir execution BASE/permiso cloud. Rollback sólo commits propios por CAS; nunca borrar Links/eventos/historia real. No ejecución por estos docs.
