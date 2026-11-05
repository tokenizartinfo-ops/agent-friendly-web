# Auditoría acotada de E/S: hijo SDK finito

5 de noviembre de 2026. **Análisis de arquitectura, solo documentación. No es revisión funcional de D0.2 ni autorización de implementación.**

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (ID 1347578006); ENVIRONMENT=GitHub docs; ORIGIN=https://github.com/tokenizartinfo-ops/agent-friendly-web; RESOURCE_TYPE=Git branch/report; RESOURCE_ID=docs/finite-sdk-io-feasibility-20261105; ALLOWED_ACTION=leer fuente fijada y documentación oficial, agregar exclusivamente este informe mediante CAS en esa rama; ROLLBACK=revertir exclusivamente su commit documental. Pin auditado: **40f0feb0ed4d29848cc155175793a0e897e22017**, árbol **7fba6d5fe1e2dad6f6a06d4f1a4ebe2825a2f6f4**.

**Conclusión:** hay una amplificación demostrable de lecturas seriales que hace material el riesgo del presupuesto original de 5 s. No se ha demostrado un fallo real del proveedor ni la imposibilidad del recorrido. La corrección/fail-closed de la fuente y su viabilidad temporal son preguntas distintas. Se conserva **operationalReadiness=false; completePackage=false; PCoff=false**. Ningún grant real, instalación de acceso, llamada AFW/Cloudflare, cambio de permisos o runtime se realizó en esta auditoría.

## Alcance y evidencia

Se leyó primero el [suplemento owned-recheck fijado](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/docs/superpowers/specs/2026-11-04-finite-owner-sdk-owned-recheck.md). Exige dos snapshots frescos completos, los mismos holders/lease/store/witness, checks volátiles y first-primary nuevos, SEND/result/ACK locales reales, hijo ≤5000 ms y raíz ≤30000 ms. Este informe no modifica esas exigencias ni amplía el scope de la cualificación en curso.

Lecturas limitadas al módulo de fase y a los helpers nombrados necesarios para contar llamadas, distinguir almacenamiento y comprobar semántica. No clones, dependencias, compilaciones, tests, benchmarks ni ensayos reales. La documentación Cloudflare se consultó el 5 de noviembre; no se consultó su API operativa. No se inspeccionó el trabajo posterior del escritor del producto.

Dos observaciones nativas **comunicadas por root**, no medidas ni repetidas por este auditor:

| Observación | GET / POST completos | SEND consume → fecha grant ACK | Margen del hijo a esa fecha |
| --- | --- | --- | --- |
| Original: [Actions 42028096501, job 127247279377](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42028096501/job/127247279377) | 4740 / 5415 ms | 1564 ms; 84 GET interceptados | 3290 ms |
| Positivo seleccionado posterior, comunicado por root | 3716 / 4396 ms | 1793882791256 → 1793882792355: 1099 ms; 84 GET clasificados Cloudflare provider, 0 ledger GET | 3720 ms |

El segundo reporte no trae aquí un nuevo run/head verificable: se conserva como evidencia comunicada y no se atribuye al pin auditado una ejecución posterior. Ambos usan proveedor simulado rápido y fixture SYN; no son percentiles, SLA ni latencia de producción. JWKS/Access externo estaba fuera de la colección temporal. El GET/POST completo no equivale al hijo consume→grant. Variación entre ejecuciones tampoco identifica por sí sola su causa.

## Grafo de dependencia y llamadas exactas

Fuente principal: [phase-context L92–114](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-owner-phase-context.mjs#L92), [primary L145–189](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-owner-phase-context.mjs#L145), [composición L302–313](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-owner-phase-context.mjs#L302).

En el recorrido read_consent instalado, cada primary() hace, **en este orden y sin Promise.all**:

1. GET verificación de credencial reader.
2. GET verificación de credencial publisher.
3. GET deployment QA, compara el pointer esperado.
4. GET versión QA exacta con include=modules; verifica configuración y bytes.
5. GET deployment M/canary.
6. GET versión inicial activada M con include=modules.
7. D1 getOwnedProject: una consulta SELECT con proyecto y subject concretos.
8. GET versión del pointer M actual con include=modules, cuando difiere la versión/deployment del inicial activado; es el caso read_consent instalado. Compara configuración exacta y módulo.

Los siete GET van exclusivamente a **https://api.cloudflare.com**, bajo el account fijo compilado. Son dos verificaciones de token, dos deployments y tres versiones. No son GET al sitio AFW, ni a DO, D1 o ledger. Los nombres de worker y UUID no se reciben del navegador. La versión M actual depende del pointer obtenido; QA y M inicial tienen IDs ya capturados. Las dos credenciales no dependen de sus respuestas entre sí; el código actual las serializa y exige ambas antes de los demás GET.

Cada observeOwnerPhasePair ordena:
facts A → primary A → qualify A → primary B → facts B → qualify B → comparación canónica completa.
Los snapshots son una pareja de observaciones sucesivas, no una transacción distribuida atómica. Sus lecturas permanecen independientes y frescas. No hay fanout en este recorrido.

[issuerCall L434–448](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-owner-phase-context.mjs#L434) realiza cuatro rechecks por operación: antes del SEND, después del append SEND, después del resultado real y después del append ACK. [L499–505](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-owner-phase-context.mjs#L499) ejecuta consume y grant con **el mismo hijo y store**, preservando el objeto consumption.

Dentro del intervalo exacto **[consumeSend.issuedAt, grantAck.observedAt]** hay:

| Punto | Rechecks completos |
| --- | ---: |
| Consume: después de SEND, después del resultado, después de ACK durable | 3 |
| Grant: antes de SEND, después de SEND, después del resultado | 3 |
| Total | **6 = 12 snapshots = 84 GET provider** |

Por tipo: **24 token verify + 24 deployment GET + 36 version GET con módulos**. Esto confirma causalmente 6×2×7; no se obtiene dividiendo el POST completo.

**Límite crucial:** grantAck.observedAt se captura al construir el ACK, antes de appendAck, sync y readback. Todavía falta el recheck final de grant. Además, el hijo empezó antes del primer recheck de consume, anterior a consumeSend. Por ello, **el hijo completo requiere 8 rechecks, 16 snapshots y 112 GET**: 32 verify, 32 deployments y 48 versiones. El tramo medido excluye dos rechecks y el cierre durable del último ACK.

### D1: viajes de aplicación separados de HTTP provider

En cada snapshot instalado con reserva, hay cinco lecturas D1:

- Un SELECT de ownership/revisión, con ID de proyecto y subject exactos. El helper también proyecta campos del proyecto y hace LEFT JOIN con su borrador; no es un scan por owner: [repository L3–11, L39–50](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/delegated-project-repository.mjs#L3).
- Cuatro SELECT: schema por nombre exacto, fence por preconnectionId, consent por authorizationHash, grant por **UUID reservado exacto**: [phase L195–241](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-owner-phase-context.mjs#L195).

Cada una comienza en un **nuevo first-primary** con SELECT como primer statement. Son **60 viajes de lectura en el intervalo**, **80 en todo el hijo**. No aparecen en el contador de fetch provider.

Además, Unit2a ejecuta dos preflight, uno por consume y otro por grant: cada uno tiene ocho statements seriales (schema/4 objetos; reloj SQL; tres SELECT LIMIT 0; tres PRAGMA table_info), y luego una mutación RETURNING. Resultado: **16 statements preflight + UPDATE consume + INSERT grant = 18 viajes adicionales**, dentro del intervalo. Cada preflight inicia su propia sesión first-primary; sus statements posteriores comparten esa sesión, por lo que no se atribuye falsamente a todos una nueva lectura primaria. No se cambia este store: [issuer-store L47–71 y L109–121](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-preparation-issuer-store.mjs#L47).

Así, el intervalo contiene **78 invocaciones D1** y el hijo **98**, contando lecturas, preflights y las dos mutaciones separadamente. No son una medición de paquetes de red físicos. Los predicados SQL de owner/revisión, fence y tiempos nativos de las mutaciones siguen siendo indispensables; un SELECT agregado no los sustituye.

### Observaciones DO locales y journaling

Sea c la cantidad de chunks del backup original, fijada por su manifest. Por snapshot del prefijo instalado anterior al grantLink:

| Trabajo DO | Invocaciones |
| --- | ---: |
| Anchors: capsule, entry, once, selector, ack, material | 6 get |
| Cleanup e inexistencia de trial/source-selection; inventory, effects, enrollment; issuer y SDK | 8 list en total |
| Alarm original | 1 getAlarm |
| Backup, receipt y sus c chunks | 2+c get |
| Preparación: sourceSnapshot, ticket, projectRef, preconnection, stageApproval, approval, ticketUse | 7 get |
| Journals policy upload/activation | 2 transaction, 8 get internos |
| grantLink, relation y authorizationLink | 3 get |

Total por snapshot: **26+c get, 8 list, 1 getAlarm, 2 envoltorios transaction**. Los get internos se cuentan como llamadas al API, no como viajes externos independientes. Para doce snapshots: **312+12c get, 96 list, 12 getAlarm y 24 transaction**. Se vuelven a decodificar, hashear y comparar bytes/canónicos. No hay lectura de connectionRef aún porque relation es null en ese tramo.

Fuentes: [anchors L22–45](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-initial-anchors.mjs#L22), [facts L115–134](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-owner-phase-context.mjs#L115), [preparation-store L64](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-preparation-store.mjs#L64), [policy-journal L23–47 y L116](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-policy-journal.mjs#L23), [issuer read L29–45](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-preparation-issuer-journal.mjs#L29), [SDK inventory L9–33](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs#L9).

Entre SEND y la fecha del último ACK se completan tres appends issuer: consume SEND, consume ACK y grant SEND. Cada append nuevo añade transaction + list + get previo + put + sync + get de readback, según [issuer-journal L47–69](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/40f0feb0ed4d29848cc155175793a0e897e22017/lib/mcp-qa-finite-preparation-issuer-journal.mjs#L47). El cuarto append, grant ACK, queda después de su timestamp. No hay llamada SDK nueva entre consume y grant; approve ya terminó y complete vendrá después. Un ACK perdido o tardío no permite recuperar el witness desde filas.

## Payloads y aritmética condicional

Caps de cuerpos provider: 8192 B por verify, 65536 B por deployment, 4500000 B por versión; controles de HTTP200, Date±5 s, no-cache, content type, length, stream y cancel retenidos en phase L92–107. No son tamaños reales ni SLA. Máximo sumado de cuerpos aceptables del intervalo:
12×(2×8192 + 2×65536 + 3×4500000) = **163769472 B**.
Para todo el hijo: **218359296 B**. El volumen efectivo puede ser mucho menor; el cap no demuestra que se transfiera ese máximo.

Definir Q=bytes módulo QA, Mo=bytes módulo M inicial activado leído en L166 y Mc=bytes módulo M actual leído en L174. Sea b64(n)=4×ceil(n/3). El mínimo de caracteres base64 de módulos en el intervalo es:
**Bmodules = 12×[b64(Q)+b64(Mo)+b64(Mc)]**, más metadatos/envelopes.
En el hijo: 16×[...] . **No confundir Mo con el backup histórico anterior al upload**: L166 usa capsule.activatedVersionId, no plan.baselineVersionId. Para una ejecución exitosa de este pin, L167 y L184 exigen que ambos módulos M correspondan a resident.bytes; esta igualdad es una condición comprobada de esta fuente, no una propiedad general de dos versiones diferentes. El backup histórico se obtiene del DO y puede tener otros bytes.

Los módulos M/residencia y backup tienen límites de 2 MiB. QA compara su longitud/hash contra su descriptor exacto, bajo el cap JSON de 4.5 MB. No se verificaron aquí tamaños de artefactos del pin ni de versiones reales; los tamaños D0.1 comunicados por root pertenecen a otra revisión y no se extrapolan al grafo SDK actual. Límite inventory16/read17, effects32/read33, enrollment2/read3, issuer14/read16, SDK8/read9/16384 B por record se conservan.

Para razonar, sea Δp el incremento medio **end-to-end** por GET provider respecto al fixture (headers+cuerpo+cancel), Δd por viaje D1, Δl el incremento total DO/CPU y R el tiempo reservado después de la fecha ACK. Todos son desconocidos. Usando el último margen comunicado, un modelo adicional optimista para el intervalo exige:
**84Δp + 78Δd + Δl + R < 3720 ms**.
Esto conserva el coste basal observado; no afirma que todos los costes reales sean aditivos o independientes.

Si únicamente cambiara Δp y se ignoraran D1/DO/tail, el techo optimista sería **44.29 ms adicionales por GET** (39.17 ms con margen original3290). Considerando los 112 GET del hijo y el efecto del recheck anterior, el techo ya baja a **33.21 ms** (29.38 ms original), antes de descontar el tail basal aún pendiente y toda variación D1/DO. Son **máximos de latencia adicional admisible**, no una latencia mínima garantizada. El promedio 1099/84=13.08 ms mezcla todo el trabajo del fixture y no mide el proveedor.

Si se modelan por separado latencia de headers L y transferencia de B bytes a rendimiento efectivo V bytes/ms, la desigualdad usa N×L+B/V; no se suma de nuevo B/V a un Δp que ya incluya cuerpo. Incluso asignando todo el margen3720 exclusivamente a Bmodules, hace falta **V>Bmodules/3720**; con otros costes la cota aumenta. En el escenario extremo del cap de cuerpos, consumir163769472 B en3.720 s requeriría **>44.02 MB/s (~352.19 Mbit/s)**, ignorando headers, RTT, D1, CPU y tail; es análisis de límite, no requisito de un payload típico ni medición de red. En todo el hijo, el cap218359296 B sobre ese mismo margen sería ~469.59 Mbit/s. La compresión HTTP puede cambiar bytes en cable; estas fórmulas usan bytes del cuerpo leído y throughput efectivo, no una promesa de enlace físico.

La raíz ≤30 s también debe contener SDK, JWKS, otros hijos y rechecks; GET/POST simulados inferiores a30 s no prueban su cumplimiento real. No ampliar ninguno de los relojes.

## Opciones de diseño, todas propuestas no aprobadas

### 1. Fanout limitado sin quitar lecturas

Hay independencia de datos entre reader/publisher verify y, después de ambas verificaciones, QA pointer+QA version y M pointer+M inicial. M actual necesita M pointer; propiedad actual se sigue comprobando con D1. Una propuesta podría esperar verify en paralelo y luego ramas QA/M separadas, sin cruzar snapshots ni efectos.

Debe preservar cada validación, cap, holder, root/child original, no-store y retención del fetch/body/cancel; esperar el fallo de una rama no demuestra drenaje de las demás. El checkpoint siguiente no puede empezar con una rama pendiente. No usar fanout libre ni crear nuevos hijos para ampliar el consumo. El cambio de orden requiere revisión de contrato y prueba de deriva mientras otra rama queda retenida: **no es un arreglo autorizado por este informe**.

Cloudflare documenta seis conexiones simultáneas esperando headers, compartidas por la petición; no equivale a seis transferencias terminadas ni garantiza una aceleración×6. Su [límite vigente](https://developers.cloudflare.com/workers/platform/limits/#simultaneous-open-connections) y [cambio de abril2026](https://developers.cloudflare.com/changelog/post/2026-04-09-relaxed-connection-limiting/) obligan a controlar fanout y conservar cancelación. La serialización actual no aprovecha esa concurrencia.

### 2. Reutilización de descriptor inmutable: sustentación parcial, no permiso de cachear toda la respuesta

El [modelo oficial de versiones](https://developers.cloudflare.com/workers/versions-and-deployments/) distingue versión de deployment y excluye de la versión el estado de recursos asociados. El [anuncio oficial de la API usada](https://developers.cloudflare.com/changelog/post/2025-09-03-new-workers-api/) describe versiones inmutables de código/configuración y separa ajustes persistentes del Worker como name/tags/logpush. [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/#adding-secrets-to-your-project) documenta que cambiar secretos mediante Wrangler crea una nueva versión. Esto sostiene tratar bytes de código y configuración versionada como descriptor asociado a **account+Worker+UUID completo**, nunca latest, prefijo, sólo nombre o hash facilitado por cliente.

No sostiene cachear **toda** la respuesta GET ni omitir validaciones de vigencia: [Get Worker Version](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/get/) describe include=modules como opcional y voluminoso; también devuelve urls routables. No se encontró garantía específica de inmutabilidad para todos los wrappers, urls, estado export/cache normalizado o ajustes no versionados. La [gestión de triggers](https://developers.cloudflare.com/workers/wrangler/commands/workers/) distingue rutas/domains/cron del upload de versiones. Tampoco la inmutabilidad de una referencia de binding inmoviliza los datos/estado de D1, KV, DO, la aplicación enlazada o un secreto externo.

Opción más estrecha: en la misma invocación y después de validar por completo los bytes bajo holders originales, reutilizar **sólo el módulo exacto por UUID**; seguir leyendo metadatos frescos sin include=modules en ambos snapshots, con decoder específico y las mismas verificaciones de pointer/configuración, bindings, urls y extras. Reduciría bytes repetidos; **no reduciría los84/112 GET**. No movería caché a global/DO ni crearía un DTO de autoridad. Si se exige volver a leer módulos en cada primary según el suplemento, necesita enmienda expresa antes de tocar código.

No proponer aún eliminar las tres lecturas de versión de cada primary. Faltan una clasificación campo por campo del contrato exacto y semántica de eliminación/indisponibilidad de versión: una caché podría aceptar lo que hoy falla al recibir404. Tampoco prueba identidad del secreto su nombre en metadata. Se conservan **dos verify frescos de identidad/status/expiry/not_before**, holders y comprobaciones de expiración locales, además de QA/M pointers nuevos. No usar TTL de caché, auth previa o descriptor como sustitutos de esas lecturas.

### 3. Agregar hechos D1 frescos en SELECT acotado

Cloudflare documenta [SELECT/SQLite y extensiones](https://developers.cloudflare.com/d1/sql-api/sql-statements/) y [json_object](https://developers.cloudflare.com/d1/sql-api/query-json/), útiles para una proyección fija de filas. [withSession('first-primary')](https://developers.cloudflare.com/d1/worker-api/d1-database/#withsession) dirige sólo la primera consulta a primaria; las posteriores pueden usar réplicas. Por ello el SELECT agregado debe ser **el primer statement de una nueva sesión**, después de cada espera relevante. No aceptar bookmarks ni batch con PRAGMA primero como sustituto.

Unidad mínima propuesta e independientemente revisable: conservar owned() y schema SELECT actuales; tras comprobar schema válido, sustituir los tres SELECT fence/consent/grant por **un único SELECT acotado**, usando exactamente preconnectionId, authorizationHash y grantId reservado de la reserva validada. Proyección tipada de cada fila con null explícito para ausencia, límite estructural de una por clave, mismos campos/comparaciones canónicas y los mismos checks nativos posteriores. No SELECT de grants por owner/client, LIMIT masivo ni selección de otro UUID.

Esto reduce lecturas de observación **5→3 por snapshot**, **60→36 en el intervalo**, **80→48 en el hijo**, sin tocar los16 preflight ni las dos mutaciones Unit2a. No altera el store, WeakMap consumption, same-child, pending SDK ni ledger. Su atomicidad sólo cubre las filas de ese SELECT, no DO+proveedor ni el proceso completo. Debe mantener la posición/validación de lecturas DO y comprobar el esquema nuevamente dentro de la proyección si se pretende afirmar que filas/esquema pertenecen al mismo snapshot. El SQL final y su plan/decodificación todavía no están escritos ni cualificados.

Unificar ownership, schema y filas en **un solo SELECT universal** tiene un bloqueo conocido: la ausencia de la tabla issuer está permitida bajo la regla existente, pero una consulta que la nombra no debe suponerse compilable porque CASE/EXISTS decida otra rama. No introducir DDL ni confundir error SQL con ausencia válida. Conservar primero la inspección de schema evita esa suposición; al faltar schema se aplica exactamente la regla de no reserva/fence/grantLink/relation y no se emite ninguna operación de issuer. Agregar también ownership podría aspirar a2 viajes por snapshot mediante branch de schema y un SELECT compuesto, pero mueve checkpoints y exige una enmienda/revisión adicional. No es parte de la unidad mínima propuesta.

D1 [batch](https://developers.cloudflare.com/d1/worker-api/d1-database/#batch) reduce viajes y ofrece transacción secuencial, pero no se acepta aquí como demostración automática de primera lectura primaria de cada hecho ni de compatibilidad con schema ausente. La opción de un SELECT fijo evita depender de esa inferencia.

## Gate de decisión y límites pendientes

Root puede terminar la cualificación funcional D0.2 sin esperar una modificación de esta auditoría. Para un bloque posterior, elegir por separado la unidad D1 mínima o el fanout limitado; ambos requieren decisión y revisión del suplemento vigente. Descriptor/module reuse requiere además resolver el contrato de inmutabilidad y frescura detallado. Ninguna propuesta reduce snapshots, checks volátiles o validaciones de owner/source/fence/SDK, añade autoridad a hashes/frames ni convierte pending/rejection/uncertain en permiso.

Antes de afirmar viabilidad operativa falta una **medición real, cerrada y no consumidora**, con autorización específica: revisión/bundle/source exactos, recursos/entorno identificados, sólo lecturas existentes permitidas; nada de consume, grant, begin/approve/complete, Entry, instalación o nueva ventana. Un colector futuro separaría provider por tipo, D1, DO, bytes, tiempo hasta headers/cuerpo/cancel, cola, CPU y error status; usaría timestamps desde apertura de hijo hasta después de ACK durable y último recheck, con límites originales, sin secretos/payloads owner. Una réplica cerrada de lectura puede medir esos costes, pero **no ejecuta ni demuestra** consumo/grant o SDK reales. Se necesita criterio de margen/tail aprobado y evidencia que abarque variación de latencia; un único positivo no constituye SLA. Si no puede armarse ese ensayo sin reabrir autoridad expirada, permanece bloqueado por alcance, sin renovar relojes ni consumir nada para medir.

El techo fuente2026-11-03T02:59:00Z sigue expirado; sustitución temporal de fixture significa SYN, nunca elegibilidad ni permiso de reabrirlo. La incertidumbre de escritor/despliegue y las reglas de no-restauración sin procedencia continúan intactas. Este documento no acredita merge/deploy del producto, cierre de la matriz funcional, tiempos actuales del proveedor, acceso instalado, ni operación con el equipo apagado.
