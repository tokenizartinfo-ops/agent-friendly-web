# Task brief — NoticeLink desde consentimiento nativo

READ FIRST. Única tarea SOURCE, un writer fresco, sin helpers/subagentes/reviewer propios. Repositorio tokenizartinfo-ops/agent-friendly-web; rama feat/finite-native-cleanup-20261101, entorno GitHub/Actions SYN sin credenciales. Reporte docs/superpowers/reports/2026-11-05-finite-native-notice-link.md. Preflight Root docs/superpowers/reviews/2026-11-05-finite-native-notice-link-preflight.es.md vinculante ANTES de headings INACTIVE históricos. No ejecución hasta despacho con BASE posterior exacto que contenga estos documentos.

# Root preflight — NoticeLink nativo desde el POST

5 de noviembre de 2026. PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (público1347578006); ENVIRONMENT=GitHub SOURCE/Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE=rama aislada; RESOURCE_ID=feat/finite-native-cleanup-20261101. ALLOWED_ACTION=una unidad Link-only, cuatro paths de código/test, informe y qualifier temporal específico. Rollback sólo commits propios por expected-head CAS, sin borrar D1/DO/historia. Este documento queda INACTIVE hasta despacho Root con BASE posterior que lo contenga.

## Prerrequisitos verificados

POST aceptado SOURCE en f62b6c8b17412b812ae411bbc9cedad43b9ce501/tree50fec019ac7a341fd9dacf004f7dd7f95581cd71; producto idéntico a5205/e153. Revisión fresca Spec✅/QualityApproved,0Critical/Important; P3 cookies CLOSED, dos Minor registrados. Root leyó informe38322chars, todas las primarias relevantes, matriz50POST/37GET y comparación de los nueve blobs calificados. f62 añade sólo tres docs de aceptación; lectura exacta confirmada. No repetir esa unidad por resumir.

Diseño Link30981d2a2f15bd49d1d0226358486e2ec0262b07/treecb291eb891cb867dd5de8d117f6be78e8164771b: informe bda8dbe79d6eb3985aadc3b86f900a13152c3dec (9931chars), spec439072471436fa84e959ed231f7d1c4df15adcef (18315), plan89ced48bf88ff240e58e80b4971b73ebf3e0778f (17397). Root leyó las versiones originales completas y la reconciliación íntegra por líneas cambiadas. Cotejó contratos protegidos store/records/stage-facts en2f96 (sin cambios posteriores) y handler POST748–852/recheck803–824/issuerCapture756–771 en5205.

## Conflictos e interfaces: scan antes de Task1

| Frontera | Lo producido / consumido y riesgo | Ruling vinculante |
| --- | --- | --- |
| POST aceptado / Link productor | Const ack real no estaba en scope del recheck; SQLPromise/result/settled sí | Añadir ownAck privado asignado del const ack sólo tras appendAckResult recorded/hash. Insertar Link después del recheck ACK en849 y antes de activeChild=null. Misma l/window/common desde826–829, mismo witness/store SQL. Nada reconstruido desde DATA. |
| Estados de recheck / nueva continuación | Else genérico813 no verifica SQL para un nombre nuevo | Enumerar estados admitidos. notice-link-pending y desconocidos niegan; notice-link-recorded exige SQL real asentado, ownSend/ownAck originales y Link put/sync/readback reales. Conservar ambos snapshots completos y expected entero. |
| NoticeLink / ACK de evento | Records define5campos; hash del evento es camelCase, distinto del rowHash SQL | Usar codec existente NoticeLink y evidence('event',proyección exacta12columnas), secuencia global real. Sin purpose/selfhash/nuevo enum ni reutilizar viejo recorder notice_consent. |
| Inventory / observer privado | Link nuevo comparte prefijo pero no journal | Añadir sólo suffix notice a whitelist y preparation.noticeLink privado null/record, readLink real en CADA snapshot, equivalencia de bytes/inventory y correlación completa incluso ante early return de noticePrimary. Journal normal tiene5filas, máximo6 con freeze y listcap7; Link es registro aparte en preparation.inventory. No inventar sexta fila de journal normal. |
| Hashes/inventario / expected | El orden de storage.list es factual | Insertar raw NoticeLink en records.inventory con orden original y conservar todos los demás entries; copiar anchor.inventory concordante. No actualizar expected antes de put recorded + sync + readback verificados ni ocultar drift. |
| Efecto5s / historia de lectura posterior | Una escritura debe caber en su ventana; el comprobante histórico debe poder observarse para futuros pasos | Producer y acceptedAt dentro del original consentSend.window.deadline y todos los techos. Observer valida acceptedAt contra esa ventana histórica; NO exigir Date.now antes de una ventana de efecto ya terminada para observar historia válida. Tiempo actual sigue bajo grant/Access/permiso/pre/C0 vigentes. Lectura no autoriza escribir: POST/public3keys/OAuth/GET siguen cerrados. Probar correlador real después del deadline5s, antes de expiry vigente, y replay sin nuevo SEND/SQL/Link. No renovar/rearm/backfill. |
| putLink / durabilidad | Store transaction produce recorded/existing/uncertain, sin sync propio | Retener Promise reales separadas de SQL/ACK: put recorded+hash, sync capturado Reflect.apply, readLink byte-exact, luego par completo. Error/existing/uncertain/pending/fallo absorben, conservan historia, nunca leer para convertir resultado incierto en éxito. |
| API propia / autoridad | Private frame y own continuation no son entrada cliente | Sin nuevo export de producto, DTO de autoridad, callback aprobador, sourcefactory, allowPending, pair transportable, permiso o phase. Un helper privado puro para proyección/hash es admisible si evita duplicación y no crea autoridad. |
| Nuevo test Link / setup Consent privado | Helper privado40líneas en test no se puede importar sin ejecutar sus50tests; copiarlo sería deuda importante | Excepción explícita a la frase ambigua 'no nuevos helpers': permitir funciones Node SYN fijas de preparación/exchange/ticket/POST en fixture GET existente, operando sobre f nativo ya creado. No helper file/framework nuevo ni importar world o fixture SDK desde fixture GET (evitar ciclo). Mantener seed/harness/cleanup mínimo en wrappers de test. No callbacks aprobadores, verifier/source/resultado inyectados ni exports de producto. Reusar flujo auténtico preserva asserts. |
| Minor POST / cuarto path permitido | Polling244 puede agotarse;161 inspecciona antes de settlement observado | Reforzar sólo esos dos casos: assert explícito de settlement/probe actual antes de asserts finales, bajo límites SYN existentes. Es prueba de scope local, no physical drain. Llevarlos al RED/targeted y fullPOST de esta unidad; no fixloop de la anterior ni cambios de retención. |
| Fixture actual / nuevas gates | postReplace exige match único; trace causal no siempre es último entry | Preservar todos los marcadores y posiciones existentes; usar predicados causales específicos. Controles entre invocaciones sólo DATA; streams/promesas se liberan desde su invocación original. No reemplazar returns/throws/guards/actual native Promise. |
| Task1 consigo misma | Cuatro paths, positivo real y negativas con DATA válidos / sin write authority | Todos los positivos nacen de GET+POST/SQL/ACK auténticos. Resealed negatives llegan al correlador, sin prior codec failure; estado SQL original intacto. Casos antiguos sinLink se producen por corte real trasACK, no prefill positivo. No nueva phase, segunda publicación o third CLOSED. |
| Costo / cobertura compartida | +1DO read/snapshot, +1par; afecta observer común | Medir siete pares/catorce snapshots si implementación coincide, no declararlo antes. Mantener fanout2/caps/5s30s/C0C1. FullLink + fullPOST50actual + fullGET37actual + pure18 + selected16/6/4 +lint4 en tres jobs aislados≤15min. No repetir store/journal/allSDK/50ms ni standard build por métricas. |

## Qualifier de laboratorio autorizado al despacho

Excepción explícita al workflows-protected del diseño: .github/workflows/afw-notice-link-qualification.yml temporal, push sólo a esta rama y cuatro paths/qualifier, contents:read, checkout persist-credentials:false, Node22, npm ci --ignore-scripts --no-audit --no-fund, sin secretos ni runtime. **Máximo tres jobs paralelos e independientes**, cada uno timeout≤15min y fixtures aisladas sobre el mismo HEAD: A Link native; B POST native; C GET native + pure phase + selected phase16/SDK6/D04token4 +lint4. En RED/focal activar sólo grupos necesarios; no jobs vacíos para ruido. Artefactos TAP/graphs/IO saneados separados7d; consola nombres/summary/fallos y metadatos compactos, no arrays inputs/cuerpos/claves.

POST37full previo340s y GET36full326s más regresiones≈100s justifican esta partición frente a un job combinado; no amplían plazos de producto. Sin manual rerun/cancel-in-progress ni cron, nueva tarea cloud o monitor. Retirar qualifier antes del informe final. No local builds/clones/deps. Si un archivo fuera del mapa o un edge estándar resulta necesario, elevar hecho concreto a Root antes, no al owner por decisión rutinaria.

## Cierre exigido

Informe docs/superpowers/reports/2026-11-05-finite-native-notice-link.md: BASE/codeHEAD/reportHEAD/tree/blobs, todos los runs incluidos fallos y comandos/counts/seleccionados-no seleccionados, RED causal→GREEN, hashes/bytes/graphs de compiles realmente usados, IO/ventanas/retención, perfiles y protected blobs. Source y synthetics claramente separados. Root lee primarias y paquete BASE completo; revisor fresco después. Writer no siguientes unidades ni helpers/reviewer propios.

operationalReadiness=false;completePackage=false;PCoff=false. C0=I0+900000,C1=C0+180000;parent≤30000ms,child≤5000ms,techo fuente3nov02:59Z vencido. No runtime/provider/alias/Entry/DDLreal/OAuth/OTP/tokens/permisos/cron/Containers/Max/main/merge/mount/ARM; no segunda publicación ni third CLOSED. Última primaria real3nov, no garantía actual. Nuevas autorizaciones sólo cuando un gate operativo real lo requiera; no anticiparlas en fuente.


## Spec reconciliada, con los rulings Root anteriores aplicables

# NoticeLink nativo desde la continuación privada de consentimiento

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Scope de diseño aprobado por root: link-only, misma child/continuación POST después de ACK y recheck reales. No ejecución hasta reconciliar POST aceptado, preflight root y futuro BASE. Contratos protegidos inspeccionados en 2f96acb45ec5477d559f85070aa438d2e2e00822. Reconciliación focalizada con POST candidato 5205d80216d9767c44762df4a181e1015e093a8e / tree 23309d147f8818e0232be215f42a77cf7ffe0e6a, POST aceptado SOURCE por root en f62b6c8b17412b812ae411bbc9cedad43b9ce501 (tree 50fec019ac7a341fd9dacf004f7dd7f95581cd71): Spec ✅ / Quality Approved, 0 Critical y 0 Important. Producto idéntico a 5205/e153. Link INACTIVE hasta preflight y futuro BASE. No se siguió WIP. Formulario GET SOURCE activo y corrección cookie P3 implementados en ese candidato; aceptación SOURCE informada por root; ningún mount.

## Resultado y límites

El mismo POST humano que obtiene un EventRow nativo y su ACK durable añade el NoticeLink existente, comprueba durabilidad/lectura real y revalida el frame entero antes de200. El link queda como hecho privado enlazado al consentimiento original. No nueva ruta/export/phase, fuente notice_consent/finite_prearm, NoticeLink como permiso, publicación, flag, suscripción, entrega, ARM, cleanup ni hosting. No backfill: consentimiento anterior sin continuación viva no puede producir link desde ACK histórico.

C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. Extender MISMA child POST, sin reiniciarla ni mover SQL a otra ventana. Si no cabe, se informa/deniega conservando historia, no se quitan rechecks. operationalReadiness=false; completePackage=false; PCoff=false.

## Filemap cerrado (cuatro archivos)

1. lib/mcp-qa-finite-owner-phase-context.mjs: productor léxico al final del handler handlePrivateQaFiniteOwnerNoticeConsent real del candidato; único suffix inventory notice adicional; read/correlación/snapshot privados.
2. test/fixtures/finite-owner-notice-get.mjs: extender fixture SYN existente para observar putLink/sync/readback y gates reales; corrupción negativa/no autoridad.
3. NUEVO test/mcp-qa-finite-owner-notice-link-native.test.mjs: recorrido y negativos específicos.
4. test/mcp-qa-finite-owner-notice-consent-native.test.mjs: adaptar principal 'native consent POST records original decision after actual ticket GET' a Link final y reforzar sólo los dos asserts de settlement indicados abajo; conservar corpus restante.

No cambiar preparación-store/records, notice-store/journal, owner-preparation antiguo, stage/profile/source stubs, forward/wire/QA, OAuth/SDK, world/DDL, workflows/config/flags. No nuevos helpers/exported callbacks o fichero de framework. Nuevo BASE que cambie APIs/fixture requiere ajuste explícito root antes de ejecución; el writer no amplía mapa.

## Contratos existentes, sin rediseño

NoticeLink DATA exacta y sin purpose ni recordHash:
{preconnectionId,grantHash,eventHash,sequence,acceptedAt}.
preconnectionId/grantHash/eventHash son hex64; sequence entero seguro positivo; acceptedAt tiempo entero. Record codec existente: encodeFinitePreparationRecord('NoticeLink',record), decodeFinitePreparationRecord('NoticeLink',raw), hashFinitePreparationRecord('NoticeLink',record). Su dominio es afw.finite-notice-link.v1; no agregar campos de phase/ACK/lease/actor/human.

createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now}):
- putLink({kind:'notice',record},lease) -> {status:'recorded'|'existing'|'uncertain',recordHash}; puede lanzar.
- readLink({kind:'notice',preconnectionId},lease) -> {status:'observed'|'absent',record}.
Key exacta connection-preparation:<original preconnectionId>:notice. Append-once; old byte-exact->existing, distinto->rechazo. putLink comprueba Preconnection y GrantLink actuales en transacción y acceptedAt dentro de sus límites; no valida por sí mismo SQL/Access/decisión. Su transaction NO incorpora storage.sync: la continuación debe esperar sync y readback explícitos además del ACK de putLink.

Reutilizar issuerCapture=captureFinitePreparationIssuerContext({ctx,env}) de línea 756 y su verificación holders de 764. Crear preparación fija como preparationStore=createFiniteOwnerPreparationStore({storage:issuerCapture.storage,now:Date.now}) junto a journal/store de 800, sin opciones externas. Sync real: Reflect.apply(issuerCapture.sync,issuerCapture.storage,[]) retenido y esperado por wait; holders/check antes y después. Reutilizar prepEncode/prepHash/evidence imports existentes. No llamar recordFinitePreparationNotice({requestId,sequence},lease): requiere notice_consent, relee request y no conserva resultado SQL; forwardPrivateQaFiniteOwnerNotice sigue unavailable.

## Proyección de evento: hash correcto

Sea row=actualSqlResult.row ORIGINAL del store, ya validada/correlacionada por POST en ambos snapshots y en ACK consent. Proyección EXACTA:
event={grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at}.

eventHash=hashFiniteOwnerEvidence('event',event), dominio afw.finite-monitor-consent-event.v1. NO usar digest afw.finite-preparation-notice-row.v1 del ACK: ese hash cubre EventRow SQL con nombres snake_case y es distinto. Ambos se comprueban contra la MISMA fila real, sin rellenar uno desde el otro.
grantHash=issuerRows.grantLink.grantHash===SHA256(original issuer identity.grantId); sequence=row.sequence real, no1/expectedSequence+1. acceptedAt=Date.now muestreado UNA vez después de ACK/recheck, en continuación viva; no es columna SQL ni caller timestamp. Debe ser>=consentAck.observedAt, >=row.issued_at y >=GrantLink.acceptedAt, <=Date.now al observar y <todos los techos vigentes. No cambia expiración original; link no tiene expiry propio.

## Observer privado y snapshots completos

Puntos reales en candidato: phase-context blob f8948c0a2cc41a48773406a64fc9c863226f9b2d, facts inventory prefix/list 17/size<=16, noticePrimary273–315, qualify373–374, snapshots376–388, qualifyNoticeConsentEvent395–400, qualifyNoticeConsentBaseline401–414, requireEmptyNotice416–419. POST ya correlaciona ConsentRow. Esta unidad sólo:
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

Punto exacto en candidato: línea 849, inmediatamente después de await recheckConsentOwned() y antes de activeChild=null. clock.child abre en 826; l, window y common son los originales de 826–829. actualSqlPromise/actualSqlResult/sqlSettled se asignan en 842–843; const ack y appendAckPromise/appendAckResult son reales en 846–848. HTML sigue fuera de la child en 852–853. No otra petición, lease, ventana o endpoint.

Precondiciones privadas simultáneas:
- identity/CSRF/prepare/approval originales del POST fueron verificados por servidor; headers/holders siguen idénticos y tiempo actual permitido;
- actualSqlPromise REAL resuelta, sqlSettled=true, actualSqlResult.status==='applied'; EventRow exacta igual expected.noticeRows.events[0];
- ownSend creado aquí y recorded, ownAck creado de ese resultado con appendAck recorded, recheck completo ya hecho;
- expected.preparation.noticeLink===null y key ausente en inventory; failed=false.
No param/callback/WeakMap nuevo admite estas condiciones. El candidato no conserva ownAck en el scope de recheckConsentOwned. Añadir ownAck=null a la declaración 801 y asignar ownAck=ack únicamente después del guard recorded/hash de appendAckResult en 848. Es el const ack realmente producido, nunca clon tomado del journal/expected. appendAckPromise y appendAckResult permanecen léxicos en la misma child; no transportarlos mediante DTO.

1. Guard del parent+child+failure/holders/Access actual y recheck ya realizado tras ACK. Sample acceptedAt una vez y construir ownedNoticeLink cinco campos de referencias locales originales. Validar codec y relaciones anteriores antes de llamada.
2. position='notice-link-pending'; linkSettled=false. Retener linkPromise REAL=preparationStore.putLink({kind:'notice',record:ownedNoticeLink},l) antes de race, sin sobrescribir actualSqlPromise/result/settled ni appendAckPromise. Await bajo wait/activeChild; require recorded y recordHash===prepHash('NoticeLink',ownedNoticeLink). existing/uncertain/error termina sin200, sin retry/read-to-recover.
3. Guard; await Promise REAL de storage.sync usando método capturado y retain; luego readLink real en MISMA child, require observed + prepEncode byte-exact del record y hash esperado. Mantener linkPromise/result/referencia propias. No usar transacción ACK como sustituto de sync.
4. Sólo tras sync/readback normales: linkSettled=true; actualizar expected.preparation.noticeLink=clone(record), insertar [prefix+'notice',prepEncode('NoticeLink',record)] en expected.records.inventory conservando orden, expected.anchor.inventory=clone(expected.records.inventory); ninguna otra celda. position='notice-link-recorded'.
5. recheckConsentOwned() completo extendido: el candidato sólo valida SQL resuelto en los estados consent-sql-resolved y consent-ack-recorded (816–818). Enumerar exhaustivamente estados admitidos al recheck: baseline, ticket-observed, consent-send-recorded, consent-sql-resolved, consent-ack-recorded y notice-link-recorded. consent-sql-pending, notice-link-pending y cualquier desconocido deniegan antes del par. Los tres estados resueltos deben exigir actualSqlPromise, sqlSettled, actualSqlResult applied, EventRow byte-exact y qualifyNoticeConsentEvent; los dos posteriores al ACK también ownAck, sendHash/rowHash/sequence exactos y canonical(ownAck)===canonical(expected.records.notice.operations.consent.ack). notice-link-recorded exige además put recorded+sync/readback satisfactorios, linkSettled y exacta ownedNoticeLink. No dejar estados Link caer en el else genérico de 813. Await ambos snapshots completos, comparar canonical(first)===canonical(second)===canonical(expected). Sin rawpair exportado ni tolerancia desde parámetros.
6. Guard final dentro child, cerrar child normalmente, guard original/failure/Access antes de200. Mantener respuesta POST humana sobre decisión temporal: no link hash/IDs internos ni “suscripción lista”. No autoavanzar fase o publicar.

No journal SEND extra para Link: es append local one-shot existente; consent SEND/ACK nativos y baseline cerrado ya impiden otra continuación. Unknown Link commit puede dejar Link durable sin200: se conserva como hecho, no se completa/reintenta desde lectura ni se borra. ACK consent permanece histórico aunque link falle. No freeze automático ni nueva operación en journal6rows.

## Refuerzo acotado del test Consent existente

Carry obligatorio de precisión de tests, informado por root tras revisión POST (sin fix-loop ni cambio de producto): en 'native consent original window fences queued SQL' (158–162), después de noticeReleaseHeld exigir settlement observado antes de noticeInspect/asserts finales; en 'native consent abort retains SQL and forbids late ACK' (240–245), polling acotado debe terminar con assert explícito de noticeProbe().allowed===true, no agotarse silenciosamente. En ambos casos falla si no se observa settlement dentro del límite SYN existente; no ampliar ventana productiva, retención o timeout para conseguirlo. La admisión del probe acredita sólo ese scope local, no physical drain. Warnings de toolchain/harness quedan para review final, sin upgrades.

## Fallo, retención y carreras

Retener Promise reales de putLink/transaction/sync/readback y full snapshots antes de races. firstFailure/failed absorbentes POST siguen activos; guard comprueba holders antes/después awaits. Abort/expiry puede retornar denegación pronto mientras transacción/sync real sigue pendiente; scope local stage-work queda outstanding hasta settlement según contrato existente. No Set journal como mutex, no physical drain/distributed cancellation.

current SQL/event/source checks antes y después del append no son atomicidad global D1+DO/control plane. Si revocación/cambio vence justo después del último read, puede quedar Link histórico y respuesta503; no declarar que Link otorga permiso tras revocación. Lectura posterior deniega. Evento SQL/ACK no se borran para aparentar rollback. CLOSE sólo no revoca grant; real revokeGrant cambia rechazo ordinario a Monitoring authorization unavailable, no enabled:false.

## Downstream explícitamente cerrado

Records ya contienen phases closed_ui/read_consent/notice_consent/finite_prearm; no inventar otra ni reinterpretarlas. notice_consent exige stage='notices', receipt de publicación real y profile exacto: monitoring owner flag/policy fija grant/project/client/expiry; qualifyFiniteOwnerInstalledStage exige StageApproval/TicketUse/upload/activation/predecessor connection. Link por sí solo NO acredita esa segunda publicación.

stage='finite' requiere además NoticeLink y dos predecessors en stage-facts; final readFiniteOwnerPreparationFacts requiere source.finite_prearm y tres receipts. El tercer CLOSED/prearm y su posterior conversión a full setup son unidades posteriores; no ejecutar publication/config aquí. El profile de conexión actual sólo acepta closed_ui/read_consent/notice_consent: no derivar finite_prearm por label ni añadir trueflags. Link-only no requiere tercer CLOSED; hacerlo consumidor de una nueva fase sí ampliaría alcance prohibido.

## Costos, aceptación y handoff

Sin D1 SELECT nuevo: ticket/event/issuer/current/SDK provienen de pares completos POST existentes. Sí +1 DO readLink por snapshot (+2 por par) siempre, incluido estado vacío. Con link añade bytes de raw inventory + registro privado en snapshots, manteniendo caps. Productor suma transacción putLink, sync, readback y UN par completo adicional tras link; recheck postACK ya existente no se sustituye ni duplica innecesariamente. El reporte del candidato mide 6 pares/12 snapshots: objetivo estructural Link 7 pares/14 snapshots, sujeto a comprobación nativa; no afirmar medición antes del GREEN.

Medir en mismo GREEN queries/DOops/get/list/transaction/sync/HTTPfanout/bytes/metafiles/childelapsed/parentelapsed. Referencia atribuida al reporte candidato blob 91c08e8cfd6f0eb954631c3e75ea4af66e4b33b5: child 775 ms/window 4999 ms, parent 1275 ms; 102 first-primary sessions, 120 SQL (64 first/56 all), DO get902/list108/sync2/transaction26, HTTP84/peak2/active0. No son presupuesto adicional ni cifras del futuro Link. No heredar 98/112 ni repetir 50 ms/all SDK/build estándar para métricas. No aumentar fanout 2/caps/plazos. Si deadline original impide completar, reportar con estado durable real y root decide unidad futura; no renovar.

Plan especifica RED causal y GREEN nativo. JWT SYN realmente firmado, Access/CSRF originales, GET+POST y D1/DO reales, sin prefill positivo ni verifier fake. P3 cookie-list y corpus resealed están implementados en el candidato POST con revisión aprobada según root: conservarlos, preservar aceptación SOURCE y no editar wire/body. La evidencia POST50/GET37 es cobertura escalonada, no una única ejecución full. Root debe fijar preflight Link, BASE y permiso cloud. Propuesta de qualifier futuro: tres jobs independientes sin credenciales, cada uno ≤15 min: Link full, POST full, GET full+regresiones+lint. Root fija cap/partición en preflight; estos docs no autorizan workflow/dispatch ni reducir checks. Rollback sólo commits propios por CAS; nunca borrar Links/eventos/historia real. No ejecución por estos docs.


## Plan reconciliado y tarea completa

# NoticeLink desde POST nativo — Implementation Plan

> **For agentic workers:** Futuro workflow superpowers:subagent-driven-development, un único writer y revisión root spec/quality. **INACTIVE**: no implementación, tests, agentes ni ejecución por este plan. Root reconcilia POST aceptado y fija preflight/BASE/permiso cloud antes de activar; writer no crea helpers/reviewers.

**Goal:** Persistir y correlacionar el NoticeLink existente desde la continuación privada del POST de consentimiento real, antes de responder200.
**Architecture:** Extensión léxica del handler Consent, misma child/lease/SQL result y ACK originales; preparationStore.putLink→sync→readback→dos snapshots completos. Ninguna nueva phase/API/ruta.
**Tech Stack:** ESM, harness Miniflare/workerd/D1/DO existente, JWT RS256 SYN real; cloud sólo cuando root lo active.
**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-link.md
**Contratos protegidos:** 2f96acb45ec5477d559f85070aa438d2e2e00822.
**POST reconciliado:** candidato 5205d80216d9767c44762df4a181e1015e093a8e / tree 23309d147f8818e0232be215f42a77cf7ffe0e6a; POST aceptado SOURCE por root en f62b6c8b17412b812ae411bbc9cedad43b9ce501 (tree 50fec019ac7a341fd9dacf004f7dd7f95581cd71): Spec ✅ / Quality Approved, 0 Critical y 0 Important. Producto idéntico a 5205/e153. Link INACTIVE hasta preflight y futuro BASE. No seguir WIP. GET form SOURCE activo y cookie P3 aceptados SOURCE por root; sin mount.

## Restricciones

- Filemap de cuatro archivos exacto de spec; sólo producto phase-context y tres archivos de pruebas/fixture. Store/records/journal/profile/source stubs/forward/OAuth/SDK/world/DDL/config/workflow protegidos.
- Link DATA cinco campos SIN purpose/selfhash; eventHash=evidence('event',camelCase12) NO rowHash SQL del ACK. No nuevos enums.
- Misma child POST<=5000ms desde observeTicket a Link/recheck; parent original<=30000ms; C0=I0+900000/C1=C0+180000; source ceiling 3 nov02:59Z vencido. Sin nuevo presupuesto/rearm/renew.
- Público3keys/OAuth/GET y baseline POST nuevo cierran ante historia propia; ACK histórico nunca crea continuación; sin backfill/retry/physical drain.
- Segunda publicación notices y tercer CLOSED/finite_prearm posteriores; aquí flags/operationalReadiness/completePackage/PCoff siguenfalse.

## Review focus

1. Confundir snake_case rowHash con eventHash camelCase produciría un Link incompatible con consumidores existentes.
2. putLink transaction ACK sin sync/readback no cumple el boundary propuesto; unknown commit no admite recuperación permisiva.
3. Nueva lectura debe entrar en AMBOS snapshots y anchor.inventory, sin esconder drift de issuer/exchanged_at/current source.
4. Contextos nuevos/actor restart/historia previa no pueden enlazar consentimiento cuyo resultado SQL ya no está vivo.
5. Costo adicional no puede iniciar otra child ni renovar window, aunque el evento/ACK ya sean durables.

Cada punto tiene casos nativos concretos en pasos2–5; no sustituirlos con codec-only.

## Task 1: Link propio durable con continuidad factual privada

**Files:**
- Modify lib/mcp-qa-finite-owner-phase-context.mjs.
- Modify test/fixtures/finite-owner-notice-get.mjs.
- Create test/mcp-qa-finite-owner-notice-link-native.test.mjs.
- Modify test/mcp-qa-finite-owner-notice-consent-native.test.mjs expectativas de finalización propia y dos assertions de settlement diferidas por root.
Ningún nuevo archivo por inferencia. Brief/reporte/qualifier root fuera de producto se acuerdan en preflight, no se ejecutan desde diseño.

**Consume:** handler handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease) real (748+); actualSqlPromise, actualSqlResult, sqlSettled, ownSend, const ack y appendAckPromise/appendAckResult privados; observeOwnerPhasePair/getRecord/recheckConsentOwned PRIVADOS; createFiniteOwnerPreparationStore({storage,now:Date.now}).putLink/readLink; captured storage.sync; codecs/hash/evidence existentes.
**Produce:** NoticeLink en key connection-preparation:<id>:notice y snapshot.preparation.noticeLink privado; NO exports nuevos. POST 200 sólo después del Link/readback/full recheck; misma respuesta humana sin datos internos.

- [ ] **1. Preflight obligatorio y baseline.** Root entrega POST aceptado code HEAD/tree/blobs y futuro BASE. Comparar contra candidato reconciliado: APIs/variables reales, seis filas journal y resolución final de P3 cookies, shared fixture y gates. Ubicación fijada en 849: después de await recheckConsentOwned() y antes de activeChild=null, dentro de l/window/common originales (826–829). Confirmar cuatro paths y permiso cloud. El candidato conserva SQL y ack hasta ese punto; requiere ownAck en scope 801, asignado del const ack sólo tras appendAckResult recorded/hash (848), no del snapshot. Si revisión cambia esto, root reconcilia antes de ejecutar; no helper público. Preservar evidence actual; no copiar docsbranch sobre fuente ni ejecutar usando2f96 sin POST.

- [ ] **2. Escribir RED causal sobre POST aceptado.** Test 'native notice link follows actual consent ACK in the same POST child': grant por OAuth real, GET monitoring real, POST firmado/CSRF real y D1/DO reales, event native + consent ACK ya éxito. Primero assert POST 200 + real event/ACK y ausencia de fixtureError; después exigir NoticeLink exacto. RED esperado Link ausente en producer POST aceptado, NO endpoint404/importmissing/journal inválido. Principal usa token/MCP real al menos una vez y verifica exchanged_at actual; negativos posteriores usan grant SDK real sin repetir token/MCP innecesariamente.
  Capturar hashes/rows originales y trace de actual SQL resolution→ACK→Link; Link no se prellena. Datos ajenostres eventos/dos grants ycuatro DDL históricos del world aceptado permanecen byte-exact; sequence global puede>1.

- [ ] **3. Implementar mínimo íntegro.** Añadir suffix notice y lectura readLink real por snapshot; comparar inventario raw/decoded. Correlación precisa con EventRow/ticket/issuer/SDK/current fuente. Añadir preparation.noticeLink=null/record, sin salida pública ni source phase nueva. Extender requireEmptyNotice.
  Extender recheckConsentOwned (803–824) con lista exhaustiva de estados: rechazar pending/desconocidos; mantener SQL real en consent-sql-resolved, consent-ack-recorded y notice-link-recorded, y ownAck en los dos últimos. El else actual no basta para nuevos estados. En la MISMA child después de recheck ACK: exigir actualSqlPromise/result reales, ownSend/ownAck recorded, failed false, link ausente; acceptedAt real una vez, eventHash camelCase existente. Añadir preparationStore junto a journal/store, usando issuerCapture.storage. Retener linkPromise=preparationStore.putLink(...,l), recorded+hash exacto, Reflect.apply(issuerCapture.sync,issuerCapture.storage,[]) real y readLink byte-exact; no sobrescribir actualSqlPromise/result/settled. Usar wait/check existentes y el mismo l. Sólo entonces update expected.preparation.noticeLink, records.inventory y anchor.inventory; recheck completo final sin sobrescribir SQL Promise. No reutilizar viejo recorder ni su ramo existing. Conservar failure latch/holders/Access/plazos.
  Fixture real blob f2ede8ac193b24dfc9e548fb4175f6e8eb6947a0, líneas 190–213: preservar postReplace de match único, lost-ack, before-send/before-insert, trazas y noticeConsentEventAck. Extender marcadores propios para Link sin romper los actuales. Holds nativos se ejecutan en la invocación ORIGINAL; controles externos sólo DATA, nunca resolver una Promise nativa desde otro request ni inventar otro timer budget. APIs store/records sin cambios. No journalSEND adicional ni nueva phase. Si un test exige modificar otro archivo producto, parar con diferencia concreta.

- [ ] **4. GREEN principal y contratos nativos.** Casos nuevos:
  - 'native notice link follows actual consent ACK in the same POST child': exact5 fields/codec/canonical bytes, key propia, eventHash diferente del rowHash journal y exactamente evidence('event',mapping12), sequence real, acceptedAt correlacionado; put recorded→sync→readback→snapshotpair antes200; source/SDK/issuer original intactos.
  - 'native notice link retains global event sequence and foreign history': caso en historia ajena existente, no sequence1supuesto ni lookup global.
  - 'native notice link never advances source or public readers': público3keys/OAuth/GET/POST replay niegan history/link; cambios none en profile/flags/policy stage receipts; record no abre NoticeLink endpoint ni old forward.
  - 'native notice link requires live originating SQL continuation': replay después consentimiento completo y restart real no llama putLink; consentimiento previo sinlink (producido por POST base real o corte justo después ACK) tampoco se backfillea. No fabricar actualResult DTO ni exportar pair para simular éxito.
  - 'native notice link event hash uses existing consumer projection': mismo EventRow devuelto por INSERT se proyecta campo por campo; hashFiniteOwnerEvidence valida gramática existente, no custom domain/nuevo schema. Esta comprobación de compatibilidad no declara notices stage activo.

- [ ] **5. GREEN fallos/retención/correlación.** Gates sobre Promises nativas reales, fixture sólo observa/corrompe negativamente:
  - 'native notice link unknown transaction never recovers from readback': putLink realmente commit pero respuesta perdida;503, Link puede existir, event/ACK retenidos, cero retry/link segunda escritura/200. No seguir a sync/readback para convertir uncertain en recorded.
  - 'native notice link lost sync or readback remains closed': put recorded y sync/readback fallo; conserva Link/consent, sin response200; otroPOST no repara. Variante readback bytes incorrectos (DATA shape válida) no se acepta.
  - 'native notice link existing or conflicting record cannot win': entre recheck y put insertar SYNnegative link exacto/diferente usando contrato codec; storeexisting/conflict no200. No meter positivo en baseline.
  - 'native notice link held write and cancellation retain actual work': hold actual transaction/sync/readback; abort original; respuesta denegada no ACK final/HTML; scope real outstanding hasta settle. Otro ingreso del mismo ctx con lease SYN vigente deniega antes de settle; no probar exclusión sólo con lease abortada ni atribuirla al journal pending Set.
  - 'native notice link original child expires without renewal': gate after ACK/before put cruzando deadline 5 s REAL del consentSend; assert gate alcanzado con tiempo, cero nuevo put si expiró antes llamada. Variante commit gana luego expires->Link preservado/503. No otra clock.child ni Date patch. Contabilizar desde observeTicket original.
  - 'native notice link current facts drift at final recheck': owner/revision/QA/Mpublication/holder o exchanged_at válido entre snapshots; denegar y preservar historia. Usar marcador de source current antesput y despuésput, no opción expected.
  - 'native notice link factual mismatch denies ': eventHash, grantHash, sequence, preconnectionId, acceptedAt futuro/antes del ACK/después del deadline. Link shape/codec válidos cuando se prueba correlador; trace prueba que pasa decode y llega al predicado objetivo, no afirmar aislamiento por un rechazo anterior. Columnas SQL/issuer originales intactas; no reseal ni reautorizar SQL. Mutaciones negativas de transacción/current deben identificarse como SYN.
  - 'native notice link missing source evidence never becomes authority': link sin consent ACK, no_mutation, ticket diferente/unknown SEND, freeze o event withdrawal; baselines públicos/POST deniegan antes NUEVOconsent SEND/SQL/putLink. Positivo siempre nace del producer real; negativos sólo después.
  - 'native notice link real reduction preserves event and link': real revokeGrant/CLOSE según APIs existentes del fixture, sin endpoint nuevo. CLOSE no se confunde con revocación; real revokedgrant hace resolver ordinario rechazar generic Monitoring authorization unavailable. Todas filas append-only permanecen, no enabled:falseinventado.
  Carry obligatorio de precisión de tests, informado por root tras revisión POST (sin fix-loop ni cambio de producto): en 'native consent original window fences queued SQL' (158–162), después de noticeReleaseHeld exigir settlement observado antes de noticeInspect/asserts finales; en 'native consent abort retains SQL and forbids late ACK' (240–245), polling acotado debe terminar con assert explícito de noticeProbe().allowed===true, no agotarse silenciosamente. En ambos casos falla si no se observa settlement dentro del límite SYN existente; no ampliar ventana productiva, retención o timeout para conseguirlo. La admisión del probe acredita sólo ese scope local, no physical drain. Warnings de toolchain/harness quedan para review final, sin upgrades.
  Preservar también corpus POST P3 cookies/resealed correlaciones al ejecutar su suite; no recrear las mismas familias en Link por rutina.

- [ ] **6. Medición proporcional sin nuevo presupuesto.** Capturar en GREEN real: +2 DO readLink/par, mismo D1 SELECT y HTTPfanout por snapshot, +1 par completo final más puttransaction/sync/readback. Referencia del reporte candidato: 6 pares/12 snapshots, child 775 ms de 4999, parent 1275 ms, 2 Access verificaciones. Link proyecta 7 pares/14 snapshots; medirlo, no asumirlo ni reutilizar 98/112. El tiempo sobrante observado no garantiza capacidad. Reportar conteos físicos/first-primary/list caps/bytes/hashmetafiles QA/M, elapsed child total<=5s y parent<=30 s, peak fanout 2 original. Verificar que null y raw inventory aparezcan en ambos snapshots sin omitir otrocampo.
  Si no cabe, registrar fallo causal y durable prefix conservado; no ampliar plazo/clock/ventana, omitir lectura ni declarar fit por CODEC. No repetir50 ms/all SDK/build estándar para obtener cifras.

- [ ] **7. Regresiones escogidas y verificables.**
  1. node --test test/mcp-qa-finite-owner-notice-link-native.test.mjs
  2. node --test test/mcp-qa-finite-owner-notice-consent-native.test.mjs
  3. node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
  4. node --test test/mcp-qa-finite-owner-phase-context.test.mjs
  5. node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
  6. node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
  7. node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
  Prefixes existentes ya leídos en cadena: phase16, SDK6, D04cuatro; verificar literal names/conteos/no 0 match contra futuro BASE, candidato aporta POST50/GET37 por cobertura escalonada, no full único ni aceptación. Conservar literales POST 'native consent POST records original decision after actual ticket GET', 'native consent own SQL continuation alone accepts pending SEND' y 'native consent lost native result never reconstructs ACK'; GET 'GET acknowledged original after actual QA code M token MCP and D04 reader'. El principal POST cambia expectativa final de Link; los dos casos de settlement descritos en paso 5 refuerzan sus asserts; el resto mantiene sus predicados. Justificación: observer común añade DO read y field privado en todas fases, snapshot drift/SDKpending/exchanged_at; cuerpos/grammarGET+POST y fixture compartidos. Suites store/journal/records intactas conservan evidencia aceptada; tests Link ejercen put/read reales, sin rerun amplio por reflejo.
  ESLint sólo cuatro archivos cambiados; QA/M compilados por harness y graphdiff vs POST aceptado. Standard build sólo si nuevo alcance llega realmente a entrypoint estándar y root lo exige. Propuesta root de futuro qualifier: tres jobs independientes sin credenciales, cada uno ≤15 min: (A) Link full; (B) POST full; (C) GET full + regresiones seleccionadas + lint. Referencia anterior POST37 full ~340 s + GET36 full ~326 s + seleccionadas ~100 s; POST ahora tiene 50 casos. No agrupar todo bajo 15 min ni omitir checks para cumplirlo. Root fija cap/partición tras aceptación y preflight; no crear ni despachar qualifier aquí.

- [ ] **8. Guardar y revisión root.** BASE/code HEAD/report HEAD/tree/cuatro paths/blobs, protected blobs, RED/GREEN exact heads/runs/jobs/attempts/counts seleccionados/fail/skip/lint, costos/retención/plazos, native vs SYN y no autoridad. Root lee diff completo y hace spec+qualitySDD; writer no helpers. No siguiente unidad, main/merge/mount ni nueva autorización por pasar checks.

## Rollback y pendientes posteriores

Rollback sólo commits propios CAS contra HEAD esperado; no borrar Link/eventos/tickets/journal/grants para revertir una respuesta incierta. Conservar estado durable parcial y receipt de fallos. No cleanup/freeze automático ni backfill.
Siguiente dependencia real: segunda publicación notices con StageApproval/decision/receipts/profile/current factual y continuación propia; luego tercer CLOSED/finite_prearm y full setup separado. Link DATA no las completa. Todo continúa INACTIVE hasta root preflight/POST reconciliado/BASE futuro.

