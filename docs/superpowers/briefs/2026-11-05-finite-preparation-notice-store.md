# Task brief — finite native preparation notice store

## Activación y autoridad

Preparado por root el5nov2026 para UN implementer fresco, después de D0.4. La activación requiere mensaje de root con BASE exacto futuro y rama feat/finite-native-cleanup-20261101; no usar un pin documental antiguo como producto. Este brief es la fuente de requisitos de la tarea. Contexto mínimo: issuer original existente produce grant real; D0.4 resuelve exclusivamente ACK histórico del exchanged_at; ahora faltan ticket y primer consentimiento de avisos cercados en SQL. SOURCE ONLY y unmounted.

Antes de ejecutar, leer el preflight compañero docs/superpowers/reviews/2026-11-05-finite-preparation-notice-store-preflight.es.md. Rulings de root prevalecen sobre encabezados históricos del diseño: SDD vigente; un único writer; preservar bytes/semántica de métodos antiguos, no exigir hash invariable del archivo ampliado; qualifier temporal de rama autorizado con contents:read/sin secretos y retirado del diff final; ninguna otra nueva herramienta/permiso. Techo fuente2026-11-03T02:59Z vencido: fixtures SYN explícitos solamente.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006, PUBLIC); ENVIRONMENT=GitHub source/Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE=isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=los tres archivos abajo + informe y qualifier temporal de prueba; ROLLBACK=revertir únicamente commits propios por expected-head CAS, sin pisar cambios ajenos. Nunca runtime, proveedor, alias/Entry/DDL reales, OTP, tokens, permisos, cron, Containers, cliente, Max, merge o main. No usar contexto privado de otros proyectos.

No subagentes ni revisores propios. Producto sólo lib/mcp-qa-finite-preparation-issuer-store.mjs, test/fixtures/finite-preparation-issuer-worker.mjs y test/mcp-qa-finite-preparation-notice-native.test.mjs. Guardar informe en docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md. No leer todo el plan/historial ni instalar clones/dependencias/builds/tests locales. Operar con GitHub App y Actions existentes; consulta de refs/commits y CAS exacto. Ante resultado incierto de update_ref leer ref antes de decidir; force=true sólo con expected_sha y commit hijo directo ya verificado, nunca para reescribir historia o cambios ajenos.

## Contrato vinculante del componente

## Mapa de archivos cerrado

| Acción futura | Archivo y responsabilidad |
| --- | --- |
| Modificar | lib/mcp-qa-finite-preparation-issuer-store.mjs: tres métodos nuevos, validación DATA local, testigos/attempts privados y preflight de avisos separado |
| Modificar | test/fixtures/finite-preparation-issuer-worker.mjs: reutilizar issuer/SQL/lease/queue reales existentes; añadir sólo escenarios de avisos y fault gates |
| Crear | test/mcp-qa-finite-preparation-notice-native.test.mjs: componente nativo causal y hostiles |

No nueva tabla SQL, migración, schema helper separado, codec ni notice journal. Se añade en el **mismo** módulo issuer una única constante frozen FINITE_PREPARATION_MONITORING_SCHEMA con los siete DDL originales: cuatro de consent y tres de tickets, copiados de sus db/*.sql sin comentarios. Se exporta para la fixture y se contrasta en tests contra ambos archivos originales. Producción nunca ejecuta esos DDL.

No cambiar host ordinario, phase-context, SDK/alias, source stubs, worker entrypoints, transporte, cleanup, config, permisos ni relojes. No ampliar el journal issuer ni sus seis operaciones.

## DATA y firmas exactas

Los tres métodos son miembros de createFinitePreparationIssuerStore({ctx,env}); no nueva factory ni constructor. Cada invocación exige arguments.length===2 y toma exactamente (input, originalLease). originalLease conserva el contrato existente {signal,assertCurrent} y se verifica por identidad, no por JSON.

Common DATA tiene exactamente:
- identity: validateFinitePreparationIssuerIdentity actual, sin cambios;
- expectedGrant: exactamente {scopes,createdAt,expiresAt}, con grantData actual y relación createdAt>=consumedAt;
- consumedAt: ISO UTC canónico del consumo original;
- accessExpiresAt y preconnectionExpiresAt: enteros issuerTime, **techos DATA**, nunca prueba de Access/consentimiento;
- window: exactamente {startedAt,deadline}, con reglas actuales de input/forward: startedAt>=identity.reservedAt, 0<deadline-startedAt<=5000 y deadline<=min(identity.C0,parse(identity.consentExpiresAt)).

ticket DATA tiene exactamente {handleHash,requestId,expectedSequence,issuedAt,expiresAt,permissionExpiresAt}:
- handleHash: hex minúsculo64; no handle bruto;
- requestId: issuerUuid actual;
- expectedSequence: entero **0**, porque sólo se soporta la primera decisión grant para ese UUID;
- tiempos: issuerTime; issuedAt>=max(identity.reservedAt,parse(expectedGrant.createdAt),parse(consumedAt));
- issuedAt<permissionExpiresAt<=expiresAt; expiresAt-issuedAt<=600000;
- expiresAt<=min(identity.C0,parse(identity.consentExpiresAt),parse(expectedGrant.expiresAt),accessExpiresAt,preconnectionExpiresAt).

Los techos deben ser posteriores a issuedAt y permanecer en su original C0; un caller futuro fijo debe acreditar Access original y actual/preconnection y negar un ticket incompatible con un techo actual más corto. No aceptar renovación de autoridad porque otro JWT expire más tarde. El componente sólo prueba las condiciones SQL bajo esos techos DATA.

Firmas:
1. insertMonitoringTicket({...Common,ticket},originalLease) -> Promise<{status:'applied',row:TicketRow}|{status:'no_mutation'}>.
2. observeMonitoringTicket({...Common,ticket},originalLease) -> Promise<MonitoringTicketWitness|null>.
3. insertMonitoringConsent({...Common,ticketWitness},originalLease) -> Promise<{status:'applied',row:ConsentRow}|{status:'no_mutation'}>.

No otras claves/opciones/callbacks. Common se expande en cada objeto, no se introduce una propiedad common. El método3 NO recibe ticket DATA, requestId, sequence, action, expiresAt ni aprobación declarada adicionales: los toma del testigo nativo privado. MonitoringTicketWitness es el objeto frozen {status:'observed',row:TicketRow}; sólo esa referencia original está en un WeakMap privado. Su representación serializada es DATA sin capacidad.

Snapshot antes del primer await con initialFields/initialOwn y descriptor extraction que excluya ticketWitness sin recorrerlo. DATA común+ticket<=16384 bytes canónicos; aplicar primero los límites existentes de initialOwn (profundidad24, nodos16384, cadena65536, array2048, total65536). Rechazar getters/símbolos/prototipos/claves extra/sparse arrays sin ejecutar accessors. No cambiar el helper input antiguo ni sus exclusiones; usar helper local nuevo para las tres firmas.

## Filas, testigo y uso único

TicketRow contiene exactamente los14 nombres SQL originales: handle_hash, request_id, user_id, grant_id, project_id, client_id, resource, purpose, action, revision, expected_sequence, issued_at, expires_at, permission_expires_at. Los seis últimos/identificadores se derivan de identity/ticket; purpose='afw.dossier-monitoring-owner.v1', action='grant'. No caller DTO contiene subject/grant/project/client/resource/purpose/action alternativos.

ConsentRow contiene exactamente las12 columnas originales: sequence, grant_id, project_id, user_id, client_id, resource, revision, action, purpose, request_id, issued_at, expires_at. action='grant', purpose='afw.dossier-monitoring.v1'; request_id del ticket; issued_at=n.ms **nativo al ejecutar INSERT**; expires_at=permission_expires_at absoluto del ticket. sequence es el entero seguro positivo realmente devuelto, no un valor pronosticado.

Resultados son snapshots detached/frozen de la fila realmente devuelta por RETURNING/SELECT; INSERT sin fila es no_mutation, no un ACK inventado. Observe hace SELECT condicional en **sesión nueva first-primary, como primera sentencia de esa sesión**, después de preflight en sesiones distintas. Coincidencia debe ser exacta con las14 columnas esperadas y las condiciones actuales. Sólo una fila así observada crea testigo; el resultado de INSERT no es testigo.

El WeakMap liga objeto, fila detached, identityHash, expectedGrant completo, consumedAt, los dos techos, window y la **misma referencia lease**. Método3 exige igualdad exacta de ese Common y holder lineage y marca usado antes de cualquier preflight/await. No ampliar deadline respecto a la observación. Clon/JSON/reconstrucción/otra instancia/otra lease niegan antes del INSERT.

Conservar attempts privados por identityHash para ticket INSERT y consentimiento INSERT; sólo un intento de cada uno por instancia. Un intento de consentimiento cierra cualquier posterior escritura de avisos para esa identidad en esa instancia. Cualquier fallo/ACK desconocido de una mutación bloquea ambas escrituras de avisos para esa identidad; no reconstruir éxito leyendo después. Observe fallido no crea testigo; observeMonitoringTicket también rechaza una identidad marcada failed y nunca reconstruye un testigo tras ACK desconocido en esa instancia. Los métodos originales close/reconcile/observeGrant/revokeGrant permanecen disponibles bajo sus reglas.

El componente no ofrece idempotencia durable de múltiples tickets entre instancias ni resuelve replay tras ACK perdido entre RPCs: el journal/receptor fuente posterior debe hacerlo. Un nuevo store no puede consumir un testigo ajeno. No afirmar exclusión durable por un Set/WeakMap.

## Condiciones SQL obligatorias

Cada INSERT y el SELECT de observación debe componer **en esa sentencia**, con n.ms=CAST(unixepoch('subsec')*1000 AS INTEGER):
- owner actual site_projects para identity.projectId/userId/revision;
- cerca original de ocho columnas exactas, fenced_at/fence_request_id NULL;
- autorización original por authorization_hash/owner/kind='authorize'/project/client/resource/scopes_json/consent expiry, consumed_at===consumedAt no vacío y canónico;
- grant por identity.grantId, owner/project/client/resource, scopes_json===JSON.stringify(expectedGrant.scopes), created_at/expires_at exactos y canónicos, revoked_at=''; created_at>=consumedAt y <=n.ms;
- exchanged_at vacío o ISO canónico con created_at<=exchanged_at<=n.ms y exchanged_at<grant expiry. No se recibe en expectedGrant ni se lo usa como prueba de emisión de token;
- n.ms>=window.startedAt y ticket.issuedAt, n.ms<window.deadline, identity.C0, consent expiry, grant expiry, accessExpiresAt, preconnectionExpiresAt, ticket expiry y permission expiry;
- para ese grant, MAX(sequence)===ticket.expectedSequence===0 y ausencia de cualquier evento previo. No sólo ausencia de revoke.

Ticket INSERT deriva las14 columnas y usa INSERT SELECT RETURNING. No INSERT VALUES ordinario, callback beforeCommit, ON CONFLICT recovery ni fallback.

Observe selecciona ticket por handle_hash/request_id exactos y contrasta las14 columnas completas junto a los predicates anteriores. Consent INSERT vuelve a unir esa fila exacta; no confía sólo en la observación anterior. Hace INSERT SELECT RETURNING de las12 columnas. Un owner/revisión/grant/cerca/ticket/sequence cambiado entre observe y commit debe negar en SQL, aunque el lease JS aún sea válido.

El expiry de permiso permanece absoluto: **no** n.ms+ventana, nuevo C0 ni deadline hijo como expiry del permiso. El plazo de operación controla cuándo se puede escribir; el permiso puede durar más de5000ms pero nunca superar los techos originales. Las queries son point lookups por UUID/authorization hash/ticket hash e índice (grant_id,sequence); no listar otros grants/tickets ni buscar “latest grant”. sqlite_schema/PRAGMA sólo para los objetos declarados.

Preflight de avisos llama al preflight issuer antiguo sin alterarlo, luego exige los siete objetos originales por nombre/tbl_name y SQL completo. Comparar normalización sólo de whitespace, semicolon terminal y el IF NOT EXISTS inicial que SQLite pueda omitir al guardar CREATE. Filtrar autoíndices internos con sql IS NULL; no excluir objetos extra con SQL para esas tablas. Verificar columnas/dominos por PRAGMA además de constraints/unique/índice/triggers por SQL exacto. No crear/reparar un objeto ausente. Métodos originales no requieren estas dos tablas nuevas para ellos.

## Fallo, reducción y pruebas de aceptación

Errores de forma/testigo/DB/reloj/lease se rechazan con error genérico saneado; no exponer SQL/binds/filas privadas. Excepción o respuesta retenida después de commit puede dejar una fila real y no dar éxito al caller. Retener la Promise nativa con el mecanismo existente; no afirmar que abort canceló SQL ni inventar no_mutation tras error.

Barrera gana: CLOSE original serializado y primaria nueva; al liberar INSERT tardío de ticket/consentimiento no aparece nueva fila. Concesión gana: el evento real ya existe; CLOSE no lo borra ni retira un grant activo. Usar en la fixture los métodos originales closeFence→observeGrant→revokeGrant y createDossierMonitoringAuthorization real: tras CLOSE solo debe seguir enabled=true con grant activo; después de revokeGrant debe devolver enabled=false. El evento permanece. Es reducción del permiso de lectura que deshabilita esta autoridad, **no** retirada humana de avisos ni cleanup completo.

Las pruebas sólo pueden llamar positivo al componente SYN: grant original creado mediante openFence→insertAuthorization→consumeAuthorization→insertReadGrant **reales**, misma instancia/lease y D1 nativo; sin prefijar el grant positivo. No alias/store mock ni DTO que sustituya un resultado del componente. Credenciales/identity/human son sintéticos explícitos. DDL ordinario sólo se instala en la fixture.

Casos mínimos:
- positivo con permiso >5000ms, ticket real→observación primaria nueva→consentimiento único; fila actual exacta, timestamp SQL y expiry absoluto; misma fila de grant, histórico ajeno preservado;
- sequence global>1 con MAX por grant=0; primer grant se acepta sin exigir expected+1; segundo intento/fresh-store contra evento previo niega;
- testigo clonado/reconstruido/otra instancia/otra lease, ticket alterado y cada Common diferente; DATA hostil/getter count0;
- grant tuple/scopes/revoked/owner/revisión/consumed auth/cerca actuales alterados al gate antes de SQL, y sequence/evento competidor entre observe y INSERT: cero filas nuevas. Ticket DATA alterado niega al observar; UPDATE ordinario del ticket debe abortar por trigger. Para probar la comparación de fila en INSERT ante cambio posterior, un caso SYN explícito altera schema/ticket sólo después del preflight y antes de liberar SQL, y exige cero evento; no presentarlo como una mutación legítima posible bajo schema intacto;
- schema ausente/tamper constraint/unique/índice/trigger/extra objeto, tipo o clock/ISO no soportados: negar antes de mutación;
- SQL real retenido antes de ejecutar:5100ms con ventana<=5000 y casos cortos en que se elige por separado C0/consent/grant/Access/preconnection/ticket/permission como techo más temprano; reloj real, sin Date patch;
- barrera gana frente a ambas escrituras y concesión gana con reducción por autoridad real;
- error que pierde resultado SQL **después** del commit y hold de la Promise real después de commit/abort: fila real presente, rechazo/sin testigo utilizable, ningún segundo INSERT en esa instancia y ninguna reclamación de physical drain entre RPCs.

Ceilings anidados impiden aislar temporalmente algunos predicates con inputs válidos: si C0 o Access es mínimo, ticket/permission también deben vencer no después. Cada caso debe registrar el techo elegido y el mínimo efectivo; no decir que probó independientemente un único predicado. Debe alcanzarse el gate antes de expiry (assert explícito); un timeout anterior al gate no califica. La prueba5100ms preserva un lease SYN padre<=30000ms y tiempos DATA largos; es la condición nativa de ventana la que debe evitar la fila, no un throw JS anterior a emitir SQL.


## Ejecución y evidencia vinculantes

- [ ] **Step 1: Escribir el positivo causal y los hostiles en el harness real.**

  En el nuevo test usar el mismo entrypoint de fixture, compatibilityDate2026-09-07, flags['nodejs_compat'], D1 RELEASE_DB y DO SQLite, con uniqueKey SYN aislada por escenario. Compilar una vez el entrypoint para este archivo de tests, sin modificar el runner issuer existente. El test lee db/dossier-monitoring-consent.sql y db/dossier-monitoring-owner-tickets.sql y entrega sus siete DDL al campo fixture-only monitoringSchema; la fixture ejecuta ese DATA sólo en notice-* y en el mundo explícitamente SYN. Esto permite RED por método ausente sin un import nominal de constante inexistente. Nunca montar esa entrada.

  El positivo debe llamar efectivamente openFence→insertAuthorization→consumeAuthorization→insertReadGrant, con resultados nativos, y luego:
  - test `REAL first notice uses native original issuer grant and observed ticket`: assert grant.id===identity.grantId; ticket.status==='applied'; witness.status==='observed'; consent.status==='applied'; row.expires_at===ticket.row.permission_expires_at y row.expires_at-row.issued_at>5000; sólo una fila original por tabla; UUID sin cambio; SELECT del ticket es primera sentencia de nueva first-primary después de preflight en otra sesión.
  - test `REAL first notice keeps absolute permission beyond child window`: permiso válido con expiry absoluto al menos10000ms después del issuedAt original y operación<=5000; assert expires_at no fue reemplazado por deadline ni Date.now()+5000.
  - test `REAL global sequence is not per-grant plus one`: insertar previamente un evento explícitamente ajeno SYN; expectedSequence=0 para el original; assert nuevo sequence>1, MAX original previo0 y ambas historias preservadas.
  - test `REAL schema metadata equals unchanged original seven statements`: importar módulo como namespace; assert constante frozen, longitud7 y igualdad normalizada con archivos originales, sin filesystem import de producción.

  Añadir tablas parametrizadas con nombres estables:
  - `REAL native notice rejects hostile DATA and foreign ticket witness`: clone/JSON/raw row/otro store/otra lease, getter(count0), symbol, prototype, sparse/oversize, keys extra; cada cambio de Common/ventana/ticket y argumentos omitidos/extra; no SQL mutante emitido.
  - `REAL native notice current tuple races deny at commit`: gate tras observe antes del INSERT; cambiar por caso owner,revision,grant immutable tuple/scopes/revoked_at,consumed auth,issuer fence o evento competidor. Ticket DATA alterado se prueba antes de observe; un UPDATE ordinario debe abortar por trigger. Un caso SYN explícito, después del preflight, elimina sólo el trigger necesario y altera el ticket en la fixture antes de liberar INSERT, que debe negar por comparación completa de fila. Es tamper negativo aislado, no schema de producción ni mutación legítima. Assert nuevas filas0 y estado ajeno intacto.
  - `REAL monitoring preflight denies missing or changed original schema`: cada tabla/unique/constraint/índice/trigger/objeto extra/tipo/clock/ISO; assert cero mutaciones de avisos. No normalización que elimine constraints.
  - `REAL queued monitoring INSERT denies after native deadline`: operar ticket y consent por separado, gate antes del bound.first nativo, await5100ms y liberar; assert gate alcanzado antes del plazo y nueva fila0.
  - `REAL queued monitoring INSERT denies earliest <ceiling>`: por ambas escrituras, C0,consent,grant,Access,preconnection,ticket,permission como menor techo válido; cruzar el reloj real hasta mínimo+50ms y liberar; assert gate previo al mínimo, cero filas nuevas, reportar empates derivados.
  - `REAL original issuer barrier beats queued monitoring INSERT`: ambas escrituras detenidas; CLOSE y lectura primera de nueva primaria completadas; liberar y assert sin nueva fila.
  - `REAL issued notice remains historical after original grant reduction`: evento concedido primero; CLOSE→observeGrant→revokeGrant nativos; autoridad real enabled=true después de sólo CLOSE con grant aún activo y enabled=false después de revokeGrant; evento conservado y cero grant nuevo. No llamarlo retirada humana.
  - `REAL post-commit notice ACK loss blocks another write in this store`: perder resultado tras commit tanto de ticket como consentimiento, filas reales conocidas por fixture; assert rechazo, ningún witness otorgado por fallo de ticket, y nuevo intento de ambas escrituras en esa instancia denegado sin otro INSERT.
  - `REAL held native SQL settlement cannot become successful cancellation`: retener resultado después del commit, abortar el lease SYN, observar Promise todavía pendiente, liberar y assert rechazo/estado absorbente; la fila persistida no desaparece.

  Gates deben interceptar únicamente el INSERT/SELECT real correspondiente; ningún SQL predicado se reemplaza. El error de fixture se sanea y se devuelve metadata/counts/booleanos, nunca valores de handles/JWT/secretos. Inputs/colas/lease son SYN; resultado de SQL/autoridad es nativo. No source/SDK/qualifier alias.

- [ ] **Step 2: Ejecutar RED causal en cloud autorizado y conservar evidencia.**

  Root debe haber activado este HEAD futuro. Ejecutar:
  `node --test --test-name-pattern="REAL first notice uses native original issuer grant" test/mcp-qa-finite-preparation-notice-native.test.mjs`

  Esperado: el issuer original crea realmente su grant y el test falla en la invocación ausente insertMonitoringTicket (captura saneada de método no existente), con cero ticket/evento. Error de instalación/bundle/fixture/DDL no cuenta como RED. No implementar un fallback ni sustituir la llamada para lograr el fallo previsto. Registrar revision/tree/run/job/attempt y assertion, sin secretos.

- [ ] **Step 3: Implementar exclusivamente el contrato de la spec en el mismo store.**

  Añadir FINITE_PREPARATION_MONITORING_SCHEMA como siete strings originales congelados, checks de schema de avisos en preflight separado y helpers nuevos de DATA/testigo. No cambiar input/preflight/SQL/métodos antiguos ni volver obligatorias las tablas de avisos para ellos.

  Añadir WeakMap privado para el testigo y estado de attempts/fallo por identityHash. Observe captura todas las14 columnas después de un SELECT condicional como primera sentencia de nueva first-primary. Método3 compara Common exacto, consume esa referencia antes del await y toma su ticket del WeakMap. Los dos INSERT SELECT y el SELECT comparten condiciones SQL de la spec, incluidas n.ms real, cerca original, owner/revisión, grant/auth actuales, scopes exactos y todos los techos. Evento issued_at es n.ms y expiry es el permiso absoluto del ticket.

  Errores/ACK desconocido de mutación se sanea/rechaza y bloquea futuros writes de avisos en esa instancia/identidad. RETURNING vacío es no_mutation; nunca recuperar éxito tras excepción. Conservar la Promise real con c.wait/query existentes y no afirmar cancelación física. No añadir journal, callback, schema repair o sender.

- [ ] **Step 4: Ejecutar GREEN y regresiones afectadas una vez, en cloud.**

  `node --test test/mcp-qa-finite-preparation-notice-native.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs`

  Esperado: cero fallos y cero skips en esos archivos. Las ramas originales de fixture siguen sin instalar esquemas de avisos y todos sus métodos/regresiones conservan comportamiento. Inspeccionar especialmente close/reconcile fresh-first-primary, testigos originales, expiración nativa y unknown/held ACK. Una prueba hostil que pasa porque el método falta o no se alcanzó su gate es inválida.

  Ejecutar lint con instalación existente:
  `node node_modules/eslint/bin/eslint.js lib/mcp-qa-finite-preparation-issuer-store.mjs test/fixtures/finite-preparation-issuer-worker.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs`

  No full npm CI, descarga de herramientas ni compiler estándar adicional si diff/import graph sigue unmounted y sin nuevas dependencias de producción. El bundle nativo de la fixture se compila en los tests. Si aparece una dependencia/graph change inesperada, registrar el bloqueo de alcance para root; no arreglarla ampliando esta tarea silenciosamente.

- [ ] **Step 5: Verificar el diff y escribir el recibo acotado.**

  Comparar con HEAD exacto activado por root. Sólo store/fixture/nuevo test pueden cambiar en producto; cuerpos SQL/métodos/esquemas/exports antiguos y db/*.sql permanecen intactos. Añadir el informe de implementación indicado con BASE/head/tree, RED/GREEN reales, comandos/counts/skips/warnings, límites/gates alcanzados y empates de ceilings. Separar caller DATA de identidad real y componente de fuente operativa. Fuente ceiling vencido, post-token ACK gap y demás dependencias siguen pendientes.

- [ ] **Step 6: Commit por expected-head y revisión independiente de root.**

  Commit candidato `feat(afw): fence native preparation notice store`, exclusivamente en rama aislada autorizada y expected-head CAS. Root revisa diff/casos/evidencia antes de aceptar. No merge/main/publish/mount ni acción de proveedor. Si root rechaza una condición de SQL/testigo, devolver el componente a corrección; no ejecutar unidades downstream.


## Entrega y límites

Status DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT o BLOCKED. Informe: BASE/codeHEAD/reportHEAD/tree, archivos/lineas, RED/GREEN run/job/attempt/SHA exactos, comandos/counts/fail/skip, lint, warnings completos saneados, número de compilaciones fixture/estándar reales y grafo, prueba de métodos/esquemas anteriores intactos, gates alcanzados, empates de techos, ACK incierto/Promise retenida, restricciones y pendientes. No etiquetar una falla fixture como RED ni prueba hostil como positiva si no alcanzó el gate. Final al root sólo status/SHAs/una línea de tests/concerns; reporte detallado en GitHub. Conservar evidencias parciales si bloqueo; no reconstruirlas repitiendo suites ya cualificadas.

Root revisa diff completo BASE..HEAD e informe y despacha revisión independiente. Este componente no acredita fuente humana, avisos reales, token→avisos, journal/receptor, tercero CLOSED, own SEND, full setup/cleanup, montaje, ARM, suscripción/entrega útil/retirada nativa o PC-off. operationalReadiness=false; completePackage=false; PCoff=false. MinorD0.3 precisión de errores OAuth y Minorfanout cleanup fixture están diferidos en docs/superpowers/progress/2026-11-05-deferred-review-minors.es.md; se triagean al final de rama, no se amplía esta tarea para corregirlos.
