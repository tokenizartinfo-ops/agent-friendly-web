# Finite preparation notice store: componente nativo acotado

2026-11-05 · DESIGN ONLY · Implementación INACTIVE hasta revisión de root y despacho con un HEAD aceptado futuro.

## Alcance y baseline

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=GitHub source/docs; ORIGIN=https://delegated-canary.agentfriendlyweb.dev (no contactado); RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notices-design-20261105; ALLOWED_ACTION=lecturas fijadas y tres documentos nuevos por expected-head CAS; ROLLBACK=revertir únicamente el commit documental. Producto inspeccionado: 51c5db8e987755ccf2819ba861461916e0396943, árbol32dac80a5e30cad10ee6e9331d76f51cae1ef630. Padre documental673813d5f7da9467fe3a527ab810fec7d6f8cc63. No seguir al writer de fanout.

Objetivo: añadir ticket y primer consentimiento de avisos cercados **en SQL nativo**, ligados al issuer y grant originales, con testigo de ticket de una sola utilización por instancia/lease. Es un componente interno, sin autoridad de identidad/consentimiento por recibir options. Permanece unmounted. No produce NoticeLink, fase factual, SDK report, journal, suscripción, envío ni capacidad pública.

Preservar todos los métodos, SQL, esquemas, testigos, journals y blobs actuales del issuer. C0=I0+900000 y C1=C0+180000; padre original<=30000ms, operación hija<=5000ms; reloj nativo sin compensación. El techo fuente2026-11-03T02:59Z está vencido. operationalReadiness=false; completePackage=false; PCoff=false. Ninguna prueba de componente renueva ventanas reales.

## Evidencia que determina la unidad

El host ordinario hace INSERT VALUES del ticket y luego consentimiento; el forward finite se intenta **después** de ACK200. Sus guards JS no pueden cercar SQL en cola: [lib/dossier-monitoring-owner-http.mjs:58–75](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/dossier-monitoring-owner-http.mjs#L58-L75). El writer ordinario tiene owner/revisión/sequence y commitWindow nativo opcional, pero no cerca original; compara expiry de grant contra tiempos suministrados: [lib/dossier-monitoring-authority.mjs:43–54](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/dossier-monitoring-authority.mjs#L43-L54).

La instancia existente ya captura holders QA/DB/lease y proporciona owner actual, reloj SQL, cerca y testigos por identidad: [lib/mcp-qa-finite-preparation-issuer-store.mjs:17–51](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-preparation-issuer-store.mjs#L17-L51), [lib/mcp-qa-finite-preparation-issuer-store.mjs:98–155](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-preparation-issuer-store.mjs#L98-L155). Las tablas de avisos existentes aportan dominios, request uniqueness, AUTOINCREMENT global y triggers inmutables: [db/dossier-monitoring-owner-tickets.sql:1–19](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/db/dossier-monitoring-owner-tickets.sql#L1-L19), [db/dossier-monitoring-consent.sql:1–20](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/db/dossier-monitoring-consent.sql#L1-L20).

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

## Pendientes y contrato de entrega

El receptor fijo QA futuro es dueño del journal de seis filas, procedencia entre GET/POST, identidad/decisión humana y drain durable; permanece INACTIVE. También queda pendiente la proyección histórica del grant ACK frente a exchanged_at mutable descrita en el diagnóstico2.1. Este componente no cambia phase-context ni arregla ese conflicto, no exige reimplementar D0.3 y no acredita un flujo token→avisos.

Después siguen lector notices/tercer CLOSED, tres receipts/Selection antes de T0 primario, connection/setup own-SEND y full setup Task2, retirada/cleanup completo, mount/ARM/hosted/PC-off. No activar por los tests de esta unidad. Root debe revisar diff/evidencia y activar en un HEAD exacto futuro. Diseño actual: operationalReadiness=false; completePackage=false; PCoff=false.
