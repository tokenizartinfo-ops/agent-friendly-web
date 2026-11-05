# Primera publicación connection nativa: despacho inicial y cierre SOURCE

2026-11-05 — **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED OPERATIVAMENTE**.

Diseño aprobado en alcance por root, pendiente de lectura/preflight/BASE de ejecución. No es un plan ni autoriza implementación, Actions, provider, credenciales, mount operativo, main/merge o renovación. Inspección inmutable 953e7af1fc20b59c59d8e4a03dcf398d98165cf5. POST aceptado SOURCE en f62b6c8b; Link está fuera del pin como implementación y deberá reconciliarse únicamente cuando root entregue su aceptación. No seguir WIP.

Repositorio público tokenizartinfo-ops/agent-friendly-web (1347578006). Este documento se guarda por GitHub connector en docs/finite-native-notice-receiver-design-20261105 desde 949418367234d44e7d633be87b12a20702a57d8b. Sólo documentación; rollback CAS de commits propios.

## 1. Resultado único y decisiones cerradas

La unidad futura debe producir el primer ConnectionReceipt real desde un POST humano: GET de elección → POST firmado/CSRF → aprobación persistida → admisión consumida en esa misma lease → enrollment existente → upload/ACK/readback → activation/ACK/pointer/config → receipt durable y par factual completo. El provider es SYN fijo en laboratorio; D1/DO, JWT, bodies, Promises, compilación y productores son reales. El predecessor positivo NO puede proceder de seedPhaseFacts, ACK prefabricado ni escritura directa de effects.

El módulo canary desplegable contiene desde initial CLOSED el despacho finite. Su script no cambia al instalar connection: sólo AFW_DELEGATED_OAUTH_ENABLED pasa de false a true. Bytes, módulos, referencias físicas y todos los demás campos son idénticos. No editar cápsulas, hashes o manifest existentes para acomodar una compilación nueva. La prueba crea su lineage SYN original con esos bytes desde el principio; no representa renovar un lineage real.

Root eligió connection porque notices-only dependería de una publicación connection todavía sintética. GET-only dejaría elección sin cierre; POST cerrado consumiría admisión irrecuperable. Se reutiliza el motor para notices en una unidad posterior, sin implementarla aquí. Cada etapa futura requerirá su propia aprobación/lease original; no conservar admisión entre peticiones.

El despacho OAuth/notice ya calificado se integra como SOURCE desde origen. Ruling root: notice GET/POST prepara consentimiento, no instala stage notices. Se abre el conduit sólo tras OAuth=true; QA exige read_consent factual, grant/owner/JWT/CSRF/historia/techos. No depende de habilitar el flag ordinary monitoring; por eso no existe ciclo consentimiento→flag. Source/config no válidos, QA ausente o phase posterior no soportada deniegan. Nunca fallback a ordinary SQL.

operationalReadiness=false; completePackage=false; PCoff=false. Tercer CLOSED, finite_prearm, publicación notices, selección/full setup, ARM, guard, suscripción, entrega y retirada útil quedan fuera.

## 2. Evidencia que fija la arquitectura

| Archivo en pin 953 | Líneas o frontera | Blob |
| --- | --- | --- |
| lib/mcp-qa-finite-owner-preparation.mjs | 39–45 admisión consume-only;198–261 choice;201–203 seam GET-only | 01ec291de2631a7cd7e527e2a567f44ac6067522 |
| lib/mcp-qa-finite-policy-transport.mjs | 65–123 enrollment;124–135 owner pending;144–177 engine;181+ setup separado | 2262ae240990a2df6755944aa7958548d8679422 |
| lib/mcp-qa-finite-owner-phase-context.mjs | 144–151 inventarios;186–219 primarias;350–388 effects/snapshot | f8948c0a2cc41a48773406a64fc9c863226f9b2d |
| lib/mcp-qa-finite-stage-work.mjs | observe request/factual, adopt y retain | a89baeb2578856dadedf700f9d66e180eb09120e |
| lib/mcp-qa-finite-owner-native-wire.mjs | target/origin/boundary y operación retenida | 42aa81f82b60bcc66a140f1358784108696f41e5 |
| lib/mcp-qa-finite-owner-native-bridge.mjs | forward fijo que hoy siempre retorna pending | ccbf1e709a5afb48f80f285b12d7744ddda278ba |
| lib/mcp-qa-finite-owner-native-receiver.mjs | receiver con holders/body pero negocio pending | c09bd715c0e84dfebde0b27de940886d573ba643 |
| worker/mcp-own/finite.mjs | default ordinary heredado; clase cleanup preservada | baa374a2ed41cdb637c23357a3d9d5f3e4ae9d0b |
| worker/independent-closure/finite.mjs | composición SOURCE; DO sin dispatch choice/OAuth/notice | bf32c10f01cd2cc4acda3b9cb4dc81f5eb422149 |
| scripts/build-finite-native-package.mjs | 38–87 node→M→QA;90–99 complete package cerrado | e8a73ce9f541993657bf8bf4c9bd8d3b02b8598d |
| lib/mcp-qa-finite-candidate-residency.mjs | reader sin argumentos, bytes/hash/tree compilados | 29373312a0e60ed6ca87ca3952dba751186662a8 |
| test/fixtures/finite-owner-phase-context.mjs | 46–62 predecessor SYN, IDs/ACK escritos por fixture | f1ddbfff29b1d5e4da4dbf70c649e0df20582b46 |

Contratos protegidos: ConnectionSend/Ack/Receipt y StageApproval existentes; qualifyFiniteOwnerInstalledStage; profile closed_ui/read_consent; policy journal issue/acknowledge/finish y writer-head. El helper de enrollment conserva el writer actual por extracción, no lo rediseña.

El grafo compartido actual es owner-preparation → policy-setup → policy-transport. Entra en M. Por ello policy-transport NO puede importar phase-context ni candidate-residency. Ésta es la razón de separar dos helpers pequeños sin dependencias QA.

## 3. Mapa de llamadas y mounts SOURCE exactos

Grafo elegido:

- M finite default → bridge choice / forward OAuth / forward notice → binding AFW_FINITE_TRIAL_CONTROL, actor fijo afw-own-successor-closure-v1.
- QA IndependentClosure.fetch → receiver fijo según URL interna → handler correspondiente de phase-context.
- Nuevo handler connection en phase-context → seam choice de owner-preparation → consumeFiniteOwnerStageAdmission → adoptFiniteOwnerRequestStageWork → fuente/frame léxicos + helper enrollment + engine fijo + journals Connection.
- policy-transport antiguo y policy setup → mismos helpers compartidos; nunca importan phase-context.
- QA incluye M residente compilado; M no incluye decoder/residencia QA ni un import de su propia bundle.

### M finite.mjs

Modificar únicamente el default wrapper de este perfil SOURCE, preservando AfwNodeControl, AfwOwnEventNode y sus restricciones legacy. No editar worker/mcp-own/index.mjs ni delegated-oauth-worker/ordinary handlers.

Origen exacto https://delegated-canary.agentfriendlyweb.dev; mismo account/worker/namespace de perfiles existentes. Ningún hostname, flag, ruta administrativa, credential o namespace nuevo. Dispatch por pathname reconocido antes de delegar al worker heredado, de modo que URL/método/origin malformados nunca caigan a ordinary.

| Entrada humana | Dispatch | Gate M adicional |
| --- | --- | --- |
| GET/POST /connections/finite-prepare, sin query/hash | forwardFiniteOwnerChoice existente | perfil finite compilado, binding/actor/version capturados; CLOSED o conexión existente se decide en QA |
| GET/POST /authorize | forwardPrivateFiniteOwnerOAuth existente | AFW_DELEGATED_OAUTH_ENABLED==='true'; gramática existente |
| GET /monitoring | forwardPrivateFiniteOwnerNoticeGet | OAuth true; QA read_consent actual |
| POST /monitoring/grant | forwardPrivateFiniteOwnerNoticeConsent | OAuth true; QA decisión/CSRF actual |
| /connections, /connections/revoke, /monitoring/revoke y métodos no admitidos de rutas anteriores | denegación fija | ningún fallback ordinary |

/oauth/token y /mcp conservan SDK M existente bajo sus gates actuales; se demuestra compatibilidad D0.4 con bindings reales compartidos. No se implementa registro/clientes/refresh como parte de esta unidad ni se amplían rutas ordinary. No abrir rutas finitas por un simple OAuth=true de otro Worker: sólo wrapper finite, origen exacto, bindings/version/actor originales y calificación QA. Todo request finite crea su root de 30 s antes del primer IO; finish en finally después de terminar respuesta lógica, reteniendo trabajo nativo pendiente por el scope existente.

En CLOSED las rutas OAuth/notice deniegan antes de efectos. Choice puede mostrar la decisión sólo si QA califica el initial CLOSED real, fuente/cápsula/alarm/Access/owner vigentes. Su existencia en bytes no habilita conexión.

### QA finite.mjs

Añadir override fetch sólo al IndependentClosure SOURCE. Las cuatro URLs son constantes ya existentes:
- https://afw-private.invalid/_finite-owner/choice
- https://afw-private.invalid/_finite-owner/authorize
- https://afw-private.invalid/_finite-owner/monitoring
- https://afw-private.invalid/_finite-owner/monitoring/grant

Cada una llama al receiver fijo existente; choice dejará de retornar pending y llamará al nuevo handler. Método de transporte POST exacto; no RPC nuevo, selector de actor ni reader público ampliado. URLs del prefijo finite desconocidas deniegan; fuera de ese prefijo se conserva super.fetch. No cambiar default QA, workflows, alarm ni métodos iniciales.

Los receivers crean la raíz QA local recortada al boundary M original, no una nueva ventana. Metadata de transporte es DATA: la identidad se verifica con JWT y la fuente con primarias/holders. QA comprueba versión M recibida contra pointer inicial real al entrar; tras su activación propia conserva esa versión de entrada como hecho histórico, no la reescribe para igualar el nuevo pointer.

## 4. Choice y admisión humana

Nuevo export de entrada fija en phase-context:
handlePrivateQaFiniteOwnerConnection({request,env,ctx},originalLease) → Promise<Response>.
Sólo estos argumentos; sin source, bytes, expected, admission, callback ni flags caller. El receiver choice lo invoca una vez. El root debe estar registrado y pertenecer al request original.

Reusar continuePrivateQaFiniteOwnerChoice/choice. Se amplía el seam interno GET-only para admitir POST; el handler construye su reader factual léxico fijo y exige phase closed_ui/action connection. No se añade callback a HTTP/RPC ni un nuevo constructor de source. El reader interno existente sólo entrega {source,preconnectionId,capsuleHash}; pair/expected permanecen privados. preparePrivateQaFiniteOwnerChoice antiguo conserva su interfaz y resultado; este cambio no habilita su publicación genérica.

Gramática choice en native-wire: origen/path/método exactos, GET sin body/query/hash; POST application/x-www-form-urlencoded, bytes <=1024, UTF-8 válido, escapes válidos y exactamente handle/projectRef/decision=approve, únicos y hex64 según choice. Cookie prepare única, handle matching; cookies ajenas válidas no son credenciales. Aplicar validación estricta de cookie-list equivalente al contrato POST aceptado, privada y sin parser configurable. Reusar lector real de 1024 bytes de notice-consent-body bajo alias local para POST choice; no cambiar sus métodos ni su semántica. GET usa lector acotado existente y exige cero bytes.

Access firmado por verifyCloudflareAccessJwtWithExpiry, realm/audience de fuente; ownerSelection original, D1 first-primary owner/revisión, client/resource y periodo original. Origin exacto y CSRF handle/cookie/projectRef/decision se comprueban antes de consumir Ticket. Ningún permiso se deduce de subject en un DTO ni de callback.

GET devuelve HTML fijo con goal/expiry y form de tres campos de choice, cookie __Host-afw-finite-prepare Secure/HttpOnly/SameSite=Strict/Path=/, Max-Age recortado. Renderizar sólo enums/hex/tiempos calificados; no IDs internos de provider/journal ni body upstream. POST mantiene cookie requerida por OAuth, no renueva expiración. POST retorna 200 sólo después del receipt/final pair; fallos 503 o error de entrada acotado. Texto: configuración de lectura preparada; lectura/avisos siguen decisiones separadas. No “suscripción lista”.

M bridge debe transportar sólo HTML/headers permitidos de esa respuesta QA, con body <=16384 y no-store/CSP/referrer policy; no mantener el actual “siempre pending” en éxito, ni reflejar headers arbitrarios. Response no exitosa nunca se transforma en éxito.

Tras choice POST status202, el handler exige stage==='connection' y preconnectionId original; consume admisión UNA vez bajo originalLease. Guarda el objeto exacto sólo en scope léxico y adopta stage-work existente. Resultados StageApproval/TicketUse no permiten reanudar tras finish/restart. Baseline de nueva elección/publicación deniega efectos/enrollment previos o aprobación connection ya consumida; GET público no se convierte en ruta de reintento de una publicación parcial.

## 5. Fuente concreta sin factory ni DTO de autoridad

Toda calificación ocurre dentro del handler junto a observeOwnerPhasePair. No implementar un source registry ni abrir readPrivateQaFiniteConnectionSource a valores caller: el stub antiguo permanece cerrado. El nuevo productor tiene fuente fija léxica, no una segunda vía configurable.

Capturar ctx/storage/actor, namespace/self methods, RELEASE_DB/withSession/prepare, QA metadata, reader/publisher bindings, fetch y root/child. assertCurrent del scope comprueba identidad de referencias, expiraciones, failed absorbente y lease vigente antes/después de awaits. M/QA y DB/KV/DO se verifican con los validadores existentes, no sólo igualdad de env strings.

Hechos originales:
- readPrivateQaFiniteCandidate() y bootstrap expectations sin argumentos: sourceRevision/tree/program/bytes/hash exactos.
- cápsula, initial plan/zero state/arm/activation completion, alarm C0, snapshot/source/ticket/approval originales.
- ambos snapshots completos, owner real; current QA pointer/module/profile y M pointer/module/config.
- reader/publisher IDs y expiraciones exactos del plan, comprobados por primarias; no asumir custodia actual desde el último informe.
- ausencia de issuer/SDK/notice/grant/connection y effects al comienzo de primera conexión. Nada global/latest ajeno. Inventarios originales conservan caps.

Paquete privado local del efecto (DATA, nunca exportado):
baseline={versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,module:resident.module,configuration:plan.configuration}.
candidate={module:resident.module,configuration:clone(baseline.configuration) con sólo OAuth=true}.
bytes.baseline y bytes.candidate son copias defensivas del MISMO resident.bytes.
rollback se obtiene del Backup/Chunks original exacto, con descriptor/hash/config/version/deployment históricos; nunca del último pointer.

El baseline CLOSED inmediato es recuperable mediante plan/capsule/residencia con hashes exactos; el histórico mediante Backup/chunks/retainedIds. Antes de SEND se reconstruyen y comparan ambos materiales y se verifican las versiones/pointers necesarios. No se crea nueva tabla/registro de backup ni se sobreescribe el histórico. El snapshot/plan/capsule y bundle fuente preservados permiten reconstrucción factual, no autorización automática de rollback.

El delta candidate exige igualdad completa salvo AFW_DELEGATED_OAUTH_ENABLED false→true. qualifyFiniteConnectionProfile(read_consent) adicional; monitoring flag permanece false y policy vacía. Módulo igual, flags restantes CLOSED, bindings físicos/Access/limiter/secret references exactos. Secret metadata sólo {name,type}; wire usa inherit del baseline CLOSED inmediato verificado, nunca valor de env ni BASE histórico hardcoded. Si falta material/hash/metadata válida, cero SEND.

No mover sourceRevision/tree/capsule al nuevo commit por normalización. Cambiar este software obliga a construir la nueva prueba SOURCE desde su initial CLOSED propio. Promoción real/actualCloudSourceProof sigue separada y no puede utilizar el ceiling vencido.

## 6. Helpers compartidos: firmas y ownership cerrados

### Engine fijo, nuevo lib/mcp-qa-finite-fixed-policy-engine.mjs

Extraer fixedPolicyEngine de policy-transport, conservando validadores/body limits y referencias capturadas. API interna:
createFiniteFixedPolicyEngine({ctx,env},guard) → objeto frozen con:
- describeUpload({configuration,baselineVersionId,bytes}) → DATA {method:'POST',path,body}; path literal de versions?deploy=false.
- upload({configuration,baselineVersionId,bytes},lease) → Promise<resultado provider validado>.
- describeActivation({versionId}) → DATA {method:'POST',path,body}; path literal de deployments.
- activate({versionId},lease) → Promise<resultado provider validado>.
- readPointer({versionId,deploymentId},lease) → Promise<void>.
- readVersion({versionId,module,configuration},lease,closed=false) → Promise<metadata verificada>.

No export de http(method,path,body), ROOT configurable, credential, transport callback ni wire de destino libre. ROOT/account/worker y métodos quedan literales dentro del módulo. describe sólo calcula el mismo body que ejecutará la operación; source/requestHash compara su canonical completo. upload/activate reconstruyen ese body fijo, validan UUID y material acotado, no reciben body/path externos. guard es exclusivamente el current-check léxico de los dos producers internos enumerados, no un verificador de permiso. El módulo no se reexporta desde entrypoints públicos ni acepta una aprobación por callback: admisión y fuente se consumen/verifican en cada producer antes de entrar. Engine y describe no fabrican capability. La existencia de estas operaciones internas no autoriza a otro caller a invocarlas; sólo el transporte setup existente y el handler connection las componen con sus controles originales.

No dependencia en phase-context/residency. policy setup adopta estas operaciones fijas manteniendo payloads/paths y resultados actuales; no cambia su admisión ni Policy records. Cualquier diferencia de wire o captura es regresión, no refactor inocuo.

Retener el trabajo real fetch→body read→cancel antes de races. Error conocido se señala sin esperar indefinidamente cancel, pero su completion real sigue retenido. Puede implementarse first-failure interno/race sin callback aprobador: sólo resolución normal del trabajo completo entrega resultado; fallo queda absorbente. No convertir Promise del timeout en “settled native”. Capturar fetch/tokens/holders y comprobarlos en cada borde. Límite de respuesta existente 4718592, sin redirects/cache inesperada; secret content/exports reconciliation desconocidos deniegan. Ningún log de tokens, script o body.

### Enrollment fijo, nuevo lib/mcp-qa-finite-preparation-enrollment-writer.mjs

Firma exacta:
prepareFinitePreparationEnrollmentWrite(
 {ctx,env,preconnectionId,stageApprovalHash,ownerSource,baseline,baselineBytes},
 childLease,
 childDeadline
) → Promise<{recordEnrollment(),recordAck()}>.

ownerSource/baseline son DATA copiada y validada, no source factory ni boolean de aprobación. El helper no consume admisión ni concede SEND. baselineBytes se copia defensivamente, verifica descriptor/hash, nunca se loguea/persiste/serializa. Captura nativos/anchors/ownerRows del código actual; no expone setters, ctx, source callback ni pair.

childLease es la MISMA child capturada; childDeadline proviene de su apertura original, se recorta por sus límites/C0/pre/Access/approval y nunca por now+fresh. El objeto existe y se consume en la misma continuación. Se consume cada método antes de su primer await/efecto; segundo intento/orden incorrecto/fallo desconocido deniega.

Orden exacto comparado con transport:65–123:
1. Caller source/current antes de preparar; helper captura y valida anchors, ownerRows, baseline bytes y construye Enrollment/issuedAt/deadline igual.
2. Caller source/current antes de recordEnrollment(). Éste hace la misma transaction, comparaciones de bytes/ausencias, append→sync→get/getAlarm y readPrivateQaFinitePreparationCleanup; exige enrollment exacto y ack null. Prepara en privado el Ack/acknowledgedAt en el mismo punto original, antes del siguiente recheck.
3. Caller source/current antes de recordAck(). Éste persiste sólo ese Ack, repite transaction/sync/readback y lectura cleanup final; exige hash exacto.
4. Caller recheck después de cada resultado; cada método retorna sólo los records factual verificados necesarios para expected.

Keys, contenidos, chronology, alarm, zero state, exclusión de effects/otras etapas y comparación original en transaction no cambian. No regenerar Ack tras unknown ni aceptar existing como recuperación. El helper retiene IO reales en el mismo stage-work. El old transport conserva sus qualified calls en estos mismos puntos y termina pending como antes; nuevo handler ya consumió admisión y aplica sus rechecks. No duplicar las ~60 líneas ni importar QA en el grafo compartido.

## 7. Observer y transiciones propias: ninguna autoridad transportable

El reader común podrá describir prefijos connection parciales válidos como hechos; no calificarlos como instalados. Lector público de tres keys y entradas OAuth/notice exigen receipt connection completo como antes. En particular, effects no vacío sin receipt válido deniega en el reader público; nunca se proyecta closed_ui a partir de un journal parcial. PUBLIC no permite pending. Nuevos requests choice requieren baseline inicial limpio, por tanto no reanudan esas filas.

Sin parámetros allowPending/expected/tolerate a APIs exportadas. El handler conserva referencias propias; el observer interno sólo devuelve facts privados. Extender el decode de effects a los estados estrictos del journal, con whitelist exacta por identidad connection original. No stages notices/finite, Failure desconocido, escritor ajeno ni extra rows. El writer-head debe ser el último SEND esperado, no cualquier ACK.

Estados léxicos exhaustivos del productor:
approved → enrollment-recorded → enrollment-ack-recorded → upload-send-recorded → upload-native-pending → upload-ack-recorded → upload-observed → activation-send-recorded → activation-native-pending → activation-ack-recorded → activation-observed → receipt-recorded → complete.
Cualquier estado no enumerado deniega. Los dos native-pending no admiten recheck que convierta hechos externos en resultado propio. Errores de cualquier etapa fijan failed y cierran la continuación.

Referencias separadas: ownAdmission; actual enrollment operations/results; ownUploadSend/actualUploadPromise/actualUploadResult/uploadSettled/ownUploadAck; ownActivationSend/actualActivationPromise/actualActivationResult/activationSettled/ownActivationAck; actual receipt write/sync/readback. Nunca sobrescribirlas con lecturas de journal. ACK se construye sólo de resultado nativo normal observado aquí.

En cada recheck permitido, primero verificar coherencia de esas referencias y luego ambos snapshots completos contra expected. Aplicar a expected sólo la mutación comprobada:
- enrollment/ack: records.enrollment, anchor.enrollment, installed.enrollment/ack.
- SEND/ACK: records.effects + anchor.effects, orden/list y writer-head exactos.
- activation observada: physical.pointer/currentConfiguration y derivación exacta qaSdkBindingFacts de metadata ya verificada; baseline inicial/sourceBase/capsule/QA permanecen iguales.
- receipt: installed.receipt y receipt raw en effects.
Todo el resto debe permanecer byte/canonical exacto, incluidas filas actual grant.exchanged_at y snapshots de owner/SDK si corresponden; no copiar pair entero como expected.

Mientras upload está acknowledged pero sin activation, pointer sigue baseline. Después de activation ACK, pointer/config pueden ser únicamente los derivados de los resultados propios y candidato exacto. Observer parcial correlaciona upload ACK/version y activation ACK/deployment sin construir permiso; sólo handler con Promises reales tolera sus estados. Si activation result se pierde, no se lee pointer para fabricar ACK/receipt. qualifyFiniteOwnerInstalledStage sólo corre como instalada al existir receipt completo.

El source/factual reader después de completion valida historial ACK bajo su deadline histórico, pero tiempo actual bajo C0/Access/permiso originales; no exige now anterior a cada ventana de efecto ya terminada. Esto preserva continuidad sin backfill.

## 8. Secuencia temporal de efectos

M y QA conservan root original <=30000 ms. Capturar entrada antes de leer bodies/source. Parent narrowing por Access firmado actual, pre/approval, C0 y expiraciones reader/publisher; no refrescar identidad/Access ni I0/C0/C1. Child <=5000 ms, siempre recortada al parent restante. C0=I0+900000; C1=C0+180000; fuente 2026-11-03T02:59Z vencida.

Enrollment completo cabe en una child: source checks entre fases, helper y readbacks; no renovar para su Ack.

Upload child: source/full recheck → describe request exacto → journal.issue recorded → sync/readback SEND → recheck propio → native upload → validar UUID/reconciliation → journal.acknowledge recorded → sync/readback ACK → readVersion candidate real y comprobar pointer baseline → recheck completo. SEND.issuedAt/deadline capturan esta child, requestHash usa dominio afw.finite-policy-request.v1 con method, path absoluto ROOT+path, body y baselineVersionId/baselineDeploymentId del request real, conforme engine actual. No retry ante unknown. Si los costes no caben, fallar y reportar; no reducir checks.

Activation usa otra child dentro del MISMO parent/admisión, con plazo propio antes de SEND: source/current/full recheck y pointer baseline → issue/sync/readback → recheck → native activation → ACK/sync/readback → pointer/version/config reales → construir ConnectionReceipt → finish/sync/readback → par completo final y guard. completedAt y receipt finish deben seguir dentro del deadline de activation SEND. No trasladar receipt a nueva child para ganar tiempo.

ConnectionSend campos existentes; identity={kind:'connection',preconnectionId,sourceRevision,stage:'connection',effect}. contextHash existente {preconnection,stageApproval,predecessors:[],grant:null,notice:null}. Receipt contiene baseline CLOSED IDs, versionId devuelto por upload, deploymentId devuelto por activation, moduleHash residente igual, configurationHash del candidato y completedAt real. Codec/hash existente sin campos nuevos.

Durabilidad: journals no incorporan sync; el coordinador retiene sync capturado y readback exacto tras cada issue/ACK/finish. Requiere recorded. Las Promises de source/SQL/DO/provider/body/cancel/sync permanecen retenidas aunque gane timeout/abort. Estado durable incierto se conserva, sin borrado/compensación automática. stage-work sólo exclusión local, nunca physical drain o mutex distribuido.

## 9. Filemap cerrado para convertir en plan

Producto:
1. worker/mcp-own/finite.mjs — wrapper dispatch SOURCE inicial, clases preservadas.
2. worker/independent-closure/finite.mjs — dispatch fetch DO interno fijo.
3. lib/mcp-qa-finite-owner-native-wire.mjs — gramática choice y respuesta acotada.
4. lib/mcp-qa-finite-owner-native-bridge.mjs — forwarding choice con respuesta real validada.
5. lib/mcp-qa-finite-owner-native-receiver.mjs — delegar choice al handler, conservar boundary/holders.
6. lib/mcp-qa-finite-owner-preparation.mjs — permitir POST en seam interno existente; sin cambiar métodos ordinarios/decisiones.
7. lib/mcp-qa-finite-owner-phase-context.mjs — handler connection, fuente léxica, estados factual parciales y finalización.
8. lib/mcp-qa-finite-policy-transport.mjs — extraer engine/enrollment, old entrypoints conservan semántica.
9. NUEVO lib/mcp-qa-finite-fixed-policy-engine.mjs — operaciones fijas internas.
10. NUEVO lib/mcp-qa-finite-preparation-enrollment-writer.mjs — helper factual one-shot.

Pruebas:
11. NUEVO test/mcp-qa-finite-first-connection-publication-native.test.mjs.
12. NUEVO test/mcp-qa-finite-first-connection-publication.test.mjs — grammar/wire/graph y contratos puros.
13. NUEVO test/fixtures/finite-first-connection-publication.mjs — provider SYN registry/control e instrumentación negativa/passiva fija.
14. test/fixtures/finite-initial-entry-world.mjs — modo dedicado que reutiliza upstream initial y monta bytes reales, sin seedPhaseFacts; conservar los modos previos.
15. test/mcp-qa-finite-policy-transport.test.mjs — evidencia de extracción literal/fijos y old closed paths.
16. test/mcp-qa-finite-owner-phase-context-native.test.mjs — parciales públicos cerrados y compatibilidad instalada.

Helpers de test operan sobre f creado; fixture nuevo no importa world y no duplica setup. World importa helpers, nunca inversa. No callback aprobador, verifier fake, source factory ni escritura positiva directa de ConnectionSend/Ack/Receipt. Controles negativos entre invocaciones son sólo DATA; liberación de IO/streams en invocación original con deadline capturado.

Protegidos: schemas/DDL/store/journals/records, OAuth SDK/ordinary handlers/authority, notice body/wire/forwards/receivers, source stubs, bootstrap/material/initial activation/cleanup semantics, perfiles/wrangler, build scripts y flags reales. Graph tests usan compilador existente sin cambiar su criterio ni declarar completePackage. Si la reconciliación Link exige otro path, root ajusta BASE/mapa antes de plan; writer no amplía solo.

## 10. Matriz negativa obligatoria y aceptación nativa

Cada fila exige comprobar el límite causal alcanzado y el primer efecto prohibido ausente. No basta cualquier rechazo previo. Resealed DATA negativos atraviesan codec/hash válidos antes del correlador objetivo.

| Grupo | Variantes mínimas | Criterio |
| --- | --- | --- |
| Dispatch M | otro origen/Worker/profile, método/query/hash, ruta no soportada, flags cerrados, binding/actor/version incorrectos | cero ordinary SQL; sin fallback |
| Dispatch QA | target/método/header extra/duplicate/boundary alterado, otro actor/QA | cero choice/approval/effect |
| Identidad | firma/issuer/audience/subj/expiry; owner/revisión drift; Access menor | cero TicketUse/SEND |
| Choice grammar | >1024/UTF8/escape/extra/duplicado/decision, cookie-list inválida o repetida, handle/projectRef mismatch, Origin | cierre antes de aprobación; body/cancel retenidos |
| Ticket/approval | action/preconnection/source/project/realm diferentes, ya consumido, snapshot cambiado | ninguna admisión reutilizable |
| Fuente | build/tree/module mismatch, current QA/M pointer/config, placeholder metadata, holders/fetch/credenciales cambiados | cero SEND o siguiente efecto |
| Config/secret | flag extra, policy no vacía, physical ID/namespace/limiter/Access cambiado, secret value, inherit baseline incorrecto, módulo distinto | no upload |
| Backup | chunk/manifest/hash/rawconfig/retainedIds/versión histórica ausentes o alterados | no upload; sin fallback latest |
| Enrollment | unknown transaction/sync/readback, duplicate methods, callback retry, alarm/anchor drift, effects ajenos | no upload; historia conservada |
| Admisión | otra lease/root/ctx/env, consumed twice, finish/restart, approval DATA prefill | no provider effect |
| Upload SEND | preexistente/unknown/no ACK de issue, writer-head ajeno, held commit | no HTTP upload |
| Upload result | lost/late/malformed UUID/reconciliation/HTTP/cache/oversize/body-cancel | no ACK reconstruido ni activation |
| Upload readback | módulo/config distintos, pointer cambió antes de activation | no activation |
| Activation SEND | unknown/existing/held, upload sin ACK, context/baseline discordantes | no HTTP activation |
| Activation result | lost/late/malformed/foreign deployment/held body | no receipt; no buscar para “recuperar” ACK |
| Activation readback | pointer/porcentaje/versión/config distintos, metadata secret content | no receipt |
| Receipt | hash/links/times incorrectos, finish/sync/readback desconocidos, recheck final drift | sin 200; conservar efecto durable |
| Tiempo | parent agotado antes de IO, child durante transaction/body, deadline histórico terminado, reloj hacia atrás | sin renovación/segunda escritura |
| Pending | held fetch/read/cancel/DO después de abort, otro ingreso con lease SYN vigente | observer scope rechaza el segundo ingreso mientras retiene trabajo; exigir lease SYN nueva y vigente para aislar esa negativa, no lease ya abortada; no inferir drain |
| Historial | replay después de éxito o pérdida de respuesta; filas ajenas/preparación posterior | sin duplicar ni reabrir; datos ajenos intactos |
| Downstream | OAuth/notice en CLOSED y después de phase no soportada, native POST frente ordinary spy | sólo fixed QA cuando gates; ordinary SQL nunca |
| Extracción/grafo | old transport/setup, bytes/wire unchanged, canary sin decoder QA/bootstrap | sin ciclo ni expansión de autoridad |

GREEN principal sin instrumentación aprobadora:
- Compilar el initial candidate con dispatcher desde origen y retener hashes/metafiles.
- Producir initial CLOSED con el productor upstream SOURCE aceptado, bajo provider SYN fijo: sin seedFutureActivation ni receipt de activation prefabricado como sustituto. Declarar cuáles entradas históricas previas al upstream siguen siendo SYN; no atribuir a esta prueba un actualCloudSourceProof.
- M/QA reales con scripts del build, provider SYN registry que registra requests reales y devuelve IDs nuevos; sin asignar f.phaseCurrent desde receipt prefabricada.
- GET choice firmado real; formulario/cookie; POST de aprobación real.
- Assert sequence nativa de todos efectos, resultado installed y readback de ConnectionReceipt exacto; ambos snapshots completos y script bytes iguales.
- Desde ese predecessor producido, recorrer /authorize QA SDK → token M → MCP/D0.4 al menos una vez y notice GET/POST existente por dispatch fijo; no seedPhaseFacts. Esto verifica composición, no nueva semántica SDK/notice ni stage notices. Reconciliar Link aceptado antes del test final.
- Frente al mismo script initial CLOSED, OAuth/notice deniegan; sobre config connection exacta, preparación de consentimiento llega a QA sin ordinary writer aunque monitoring flag siga false.
- Preservar source C0/C1/alarm/retainedIds/filas ajenas y todos flags no autorizados.

Provider registry SYN se basa en los bodies ejecutados: upload almacena bytes/config e inherit references verificadas; activation cambia sólo pointer registrado; GET retorna esa metadata. No devuelve “success=true” para saltar guard ni modifica source proofs del producto. Para QA module evidence usar bytes reales de esa composición, no export default{} como sustituto. El montaje del harness no altera artifacts M positivos; instrumentación pasiva/negativa se etiqueta con hashes separados.

Cierre funcional único: receipt de connection nacido del POST original y downstream aceptado consumiéndolo sin predecessor seeded. No cerrar la unidad sólo con UI, approval DATA o tests codec.

Regresiones proporcionales: suites native connection/preparation/phase tocadas; POST/GET/OAuth-D0.4 seleccionadas por mounts y fixture, y extracción policy transport/setup; nombres exactos y no cero matches verificados al crear plan sobre BASE. Reusar evidencia store/journals protegidos salvo fallo concreto. Graph/build finite es necesario por mounts/residencia, no standard build/all SDK/50 ms por rutina. No ejecutar nada desde este diseño.

## 11. Costos, pruebas SOURCE y límites operativos

Medir first-primary/SQL/DO get/list/transaction/sync, HTTP/body/cancel, pares/snapshots, fanout, bytes M/QA/gzip, graph y elapsed root/child en GREEN necesario. No heredar 98/112 ni cifras Link/POST. Pipeline SOURCE puede no caber en 30 s/5 s: se informa fallo causal y estado conservado, nunca se elimina recheck ni se amplía plazo para lograr éxito.

Demostrable con proveedor SYN fijo: identidad JWT/CSRF, causalidad y orden de native Promises/SQL/DO, requestHash/wire, journal ACK de resultado observado, readback/config/module, igualdad de bytes, dispatch sin ordinary fallback, retención y límites de scope. No demuestra Cloudflare real, aceptación efectiva del API con custodia actual, residencia live/source proof, compatibilidad de rollback operativo, permisos, hosting o PC apagado.

actualCloudSourceProof/promoción requieren autorización independiente con revisión exacta y evidencia actual de roles/pins/custodia/bytes/rollback. El ceiling de 3 nov permanece vencido; nada aquí lo rearma. El build global sigue completePackage=false y source authority pendiente. No alarma/cleanup nuevo, no cambio de owner/grant, no claims de suscripción/entrega por receipt.

Rollback SOURCE sólo commits propios con CAS y protected blobs; nunca borrar journals, tickets, grants, version history o material original para ocultar incertidumbre. No restore provider automático dentro de este POST: preserva evidencia y devuelve estado pendiente sin retry.

Root leerá este diseño y reconciliará Link aceptado antes de convertirlo en plan/brief/BASE. SDD futuro: un writer, root spec/quality y revisión autorizada; no ejecución ni agentes adicionales por este archivo.
