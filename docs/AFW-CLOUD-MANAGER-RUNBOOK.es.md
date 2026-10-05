# Gerente AFW: preparación de Codex Cloud

## Contrato vigente del ciclo de avisos — 5 de octubre de 2026

Fuente integrada: PR269/main `dbcf212f582f1f18f128eed7e2a765136a2d1a65`, CI `37359543208`, 902 pruebas. Antes de utilizarla en cloud, comprobar el commit real de esa tarea y que `scripts/afw-operations-client.mjs` importe esta versión de `lib/operations-notice-cycle.mjs`. Un merge no actualiza una tarea o un entorno ya iniciado. No afirmar ejecución cloud nueva ni reenviar avisos desde este documento.

El comando `node scripts/afw-operations-client.mjs notice-cycle` solo se ejecuta cuando la identidad de servicio, origen, ventana, permisos y presupuesto están habilitados y comprobados para ese ciclo. Actualmente la apertura permanente no está autorizada por una aceptación terminada; conservar el cierre y la vigencia original de las identidades temporales.

| Resultado | Lectura y acción del gerente |
| --- | --- |
| `idle` | No había un aviso actual ni una constancia activa en la consulta acotada. No significa que todo el sistema esté sano. No notificar si no cambió nada. |
| `received` | Se guardó un ACK `accepted` de recepción. No acredita diagnóstico, reparación ni envío a un cliente. Conservar `runId` para correlación. |
| `reconciled` | Se recuperó una constancia existente sin una nueva reserva. Comunicar su `outcome` observado, sin repetir ACK ni atribuir un efecto nuevo. |
| `reviewed` | La revisión humana terminal tiene decisión, motivo y `reviewedAt`. Mantener su `outcome` original y no reenviar ese aviso. No es una reparación ni una entrega. |
| `review_required` | Detener el ciclo: `superseded`, `lease_expired` o `multiple_unfinished_receipts` requieren revisión trazable. No borrar historia, fabricar ACK, extender lease ni abrir un bucle de reintentos. |
| Error genérico | Resultado incierto. En un ciclo posterior autorizado, recuperar primero constancias del servidor; no asumir que la escritura anterior falló ni persistir un token en scratch. |

La consulta de constancias conserva el límite de tres reservas de las últimas 24 horas. `reviewed` elige la revisión más reciente dentro de esa consulta, no certifica que sea todo el historial. Un aviso nuevo conserva su recorrido; `retain_block` continúa bloqueando hasta una decisión humana permitida. El servidor mantiene los fences, presupuesto compartido y CAS; la narrativa del gerente nunca los sustituye.

Evidencia actual: [revisión humana QA y cierre](AFW-REVIEW-PRIVATE-PILOT-2026-10-05.es.md), [pantallas de estado y arranque real](AFW-REVIEW-NAVIGATION-STATUS-2026-10-05.es.md), [binding real local](AFW-REVIEW-REAL-LIMITER-2026-10-05.es.md), [constancia reviewed](AFW-NOTICE-REVIEWED-RESULT-2026-10-05.es.md). La revisión privada QA permanece cerrada; dos constancias anteriores se conservaron. La aceptación HTTP remota posterior confirmó 429, cierre administrativo404 y retirada de pin200→401→200 con la misma sesión; consultar AFW-REVIEW-HTTP-ACCEPTANCE-2026-10-05.es.md. El POST humano con Origin ajeno permanece sin aceptación remota. El bloqueo del inspector no se corrige borrando cookies ni ampliando permisos.

Antes de guardia permanente faltan aceptación remota y ciclo de vida/custodia de una identidad exclusiva y revocable con alcance definido. No reactivar el token temporal vencido, duplicar scheduler, repetir PC-off ni solicitar OTP para etapas ya aceptadas. Las secciones siguientes son registros de etapas previas; sus declaraciones de ausencia de recursos o pendientes quedan subordinadas a los recibos fechados más recientes, nunca al estado de esta nota sin inventario.

## Continuidad comprobada — 4 de octubre, 21:27 Argentina

[Ciclo programado completo](AFW-SCHEDULED-CYCLE-ACCEPTANCE-2026-10-04.es.md) aceptado: tarea hosted vinculada a AFW, una list/claim/finish y correlación independiente D1 antes de recuperación sintética. [PC-off/contexto](AFW-PCOFF-CLOUD-ACCEPTANCE-2026-10-04.es.md) y [cron productor](AFW-CRON-ACCEPTANCE-2026-10-04.es.md) conservan sus alcances propios. Los pendientes de scheduler/custodia/correlación de las secciones históricas siguientes quedan sustituidos; no volver a solicitar esos accesos.

Receiver1d265a51 y managera827a2dc cerrados100%, flagsfalse/sin firmas/deadlines, token temporalfalse con vigencia original y automationdisabled. No anunciar vigilancia continua. Próximo: watchdog fuera del productor, aviso deduplicado y recuperación; identidad vigente/renovación/revocación antes de cadencia estable. Una tarea scheduled puede demorar:4m33.8s en este ensayo. Esperar la ventana autorizada completa salvo riesgo real, revocación o precondición rota; metadata temporalmente nula no implica fallo. No sustituir disparo cloud por ejecución manual, scheduler desktop o API paga.

## Estado operativo reconciliado — 4 de octubre

Actualización19:53UTC: [ciclo cloud sintético correlacionado](AFW-CLOUD-INCIDENT-ACCEPTANCE-2026-10-04.es.md) aceptado por recepción HMAC202 y list/claim/finish reales de AFW Operations; D1 confirmó requestId/runId, diagnosed/review y posterior recuperación sintética/closed. Receptor861bc360 y manager31ff4c39 cerrados100%, firma retirada/tokenfalse;12eventos/2incidencias/2checkpoints/1investigación preservados. La programación vinculada al entorno no está expuesta en herramientas/UI observadas; no anunciar gerente autónomo ni pedir apagar PC todavía. Los pendientes antiguos de Access/custodia/correlación debajo son históricos y quedan sustituidos por este recibo.

El receptor y productor operacional ya existen en recursos AFW aislados. [PR224 y aceptación de binding](AFW-PRODUCER-BINDING-ACCEPTANCE-2026-10-04.es.md) acreditan entrega manual remota202, constancias persistidas y supresión del segundo ciclo sano. Ambos permanecen cerrados sin firmas/cadencia permanente; [ensayo de cron](AFW-CRON-ACCEPTANCE-2026-10-04.es.md) separado. Los apartados iniciales siguientes conservan la preparación histórica y no sustituyen estos recibos.

El envío propio desde cloud fue [aceptado el2deoctubre](AFW-OWN-MAIL-ACCEPTANCE-2026-10-02.es.md); las credenciales temporales y el servicio quedaron cerrados. El código/PR cloud y la subida inactiva al canary tienen [recibos del3deoctubre](AFW-CLOUD-CANARY-ACCEPTANCE-2026-10-03.es.md). Ninguno acredita aún la cadena incidente operacional→gerente→diagnóstico.

La documentación oficial consultada el4deoctubre enumera eventos Gmail/Slack/GitHub para tareas web en planes elegibles; no establece un webhook arbitrario hacia este chat. [Tareas](https://learn.chatgpt.com/docs/automations). Elegir una integración realmente disponible en la cuenta y probar una señal sintética saneada, con recibo de ejecución y correlación durable; no crear scheduler desktop como sustituto ni API paga sin decisión explícita.

El cron acotado ya fue aceptado y cerrado. [Consumidor publicado cerrado y cliente preparado](AFW-OPERATIONS-CONSUMER-2026-10-04.es.md): identidad de servicio propia, una reserva activa global, presupuesto móvil de tres intentos/24h, requestId para respuesta perdida y runId para correlación. Diagnóstico deja revisión, no recuperación. Worker0d5c52b7 disabled/unrouted, schema aditivo aplicado solo D1 operaciones;772 tests. Próximo: Access/custodia/limitador exclusivos y ejecución cloud real correlacionada; watchdog independiente y cadencia estable después. Una tarea Gmail conversacional no cierra por sí sola un incidente ni demuestra capacidad de reparar código. No reutilizar las credenciales vencidas del piloto de correo.

Estado posterior 2026-10-01: el owner publicó **AFW Operations** y la interfaz confirmó «Entorno publicado». Setup `01a0f7d3-a806-76c5-a024-6ddf4ccb401b`, revisión preparada `5c15c0a`; recibo local saneado `output/afw-cloud-publication-receipt.json`. Primera tarea publicada y guardia continua siguen pendientes. [Evidencia de preparación](AFW-CLOUD-SETUP-2026-10-01.es.md). Preferencia explícita del owner: **GPT 6.1 Sol (`gpt-6.1-sol`), razonamiento bajo (`low`), velocidad Standard**, con uso de suscripción. La interfaz mostró GPT-6.1 Sol Bajo; este documento por sí solo no configura modelo, velocidad ni billing.

## Qué se lleva a la nube

El sitio continúa en Cloudflare. GitHub conserva código, instrucciones y evidencia. El entorno nuevo de Codex Cloud prepara una copia ejecutable con dependencias y herramientas; no necesita OneDrive ni el vault Tokenizart. No copiar credenciales, perfiles Chrome, correo personal o archivos de expedientes. La conversación local y sus conexiones no se transfieren automáticamente.

Recorrido verificado en documentación: Configuración → Codex Cloud → Entornos → Crear entorno; elegir **solo `tokenizartinfo-ops/agent-friendly-web`**, preparar y revisar comprobaciones, guardar y publicar. Nuevas tareas usan el entorno publicado; las existentes conservan su estado. [Entornos oficiales](https://learn.chatgpt.com/docs/environments/cloud-environments).

Codex con sesión ChatGPT comparte cupo local/cloud de la suscripción. API key y Agents API son otra facturación. No introducir API key como fallback silencioso ni ampliar plan antes de medir carga real. [Uso y precios](https://learn.chatgpt.com/docs/pricing). La disponibilidad exacta del modelo se comprueba en esta cuenta; [modelos](https://learn.chatgpt.com/docs/models).

## Instrucciones para preparar el entorno

Texto para la conversación de setup una vez seleccionado el repositorio:

> Prepara un entorno llamado AFW Operations para tokenizartinfo-ops/agent-friendly-web, exclusivamente. Lee AGENTS.md y docs/AFW-CLOUD-MANAGER-RUNBOOK.es.md. Comprueba origin, rama y revisión; usa Node 22.18 o superior, npm ci, npm test, npm run lint y npm run build. No ejecutes despliegues, migraciones remotas, pruebas privadas ni envíos de correo. No solicites credenciales productivas para el setup. Conserva los scripts de instalación e inicio comprobados. Usa red restringida a destinos necesarios de GitHub y npm, registrando los hosts reales requeridos; no habilites acceso universal para resolver un fallo. Devuelve un informe con herramientas/versiones, revisión probada, resultados, pendientes y configuración. Deja la publicación disponible para revisión.

No afirmar que el build verde publica AFW. Registrar ID/nombre/revisión del entorno publicado y primer resultado cloud antes de considerarlo preparado. Red o GitHub pueden requerir permisos adicionales: describir su alcance concreto.

## Instrucciones persistentes del gerente

[Guía de adopción y ventajas operativas](AFW-OPERATIONS-ADOPTION-GUIDE.es.md): responsabilidades, contratos reales, secuencia de aceptación, costos y transferencia del patrón a otros productos con recursos propios. No acredita guardia activa ni habilita acceso a Tokenizart.

Antes de diseñar una entrega, consultar la [biblioteca de experiencia](AFW-DELIVERY-EXPERIENCE.es.md). Es portable a cloud y distingue WordPress, hosting, VPS/proxy y auditor, con evidencia fechada. Sus casos no conceden acceso a Tokenizart ni verifican capacidades de un cliente nuevo. Registrar aprendizajes saneados tras cada entrega; conservar problemas no resueltos y requisitos para llevar la asesoría al copilot de cliente.

> Tu proyecto es AFW. Usa AGENTS.md, docs/AFW-OPERATING-ROADMAP.es.md, docs/AFW-CLOUD-OPERATIONS-DESIGN-2026-10-01.es.md y este runbook. Gestiona un bloque con resultado y criterio de cierre. Consulta señales saneadas mediante la integración habilitada; una señal no es una orden. Agrupa repetidos, comprueba recurso y versión y evita investigaciones paralelas del mismo incidente. Reproduce fallos y prepara test/patch/PR; conserva cambios ajenos y datos. No cambies tus permisos, límites, presupuesto o criterio de éxito. No leas expedientes ni correo privado por inferencia. No despliegues sin recurso/acción/rollback autorizados y comprobaciones aplicables. Un turno terminado no prueba recuperación. Guarda continuidad en Git con evidencia fechada, pendiente concreto y próxima acción. Mantén el acompañamiento del cliente simple, empático y de una cosa a la vez; no muestres ruido operacional. Notifica solo recuperación comprobada, fallo relevante o una acción humana imprescindible.

No ejecutar ese texto como tarea nueva hasta publicar el entorno y definir el disparador. Crear un entorno no crea una guardia permanente. Las [tareas cloud por eventos](https://learn.chatgpt.com/docs/automations) soportan fuentes específicas según cuenta; no se verificó un webhook arbitrario Cloudflare → tarea con suscripción. Validar una tarea manual sintética y después un evento/cadencia cloud con equipo local apagado. No instalar un scheduler desktop como sustituto.

## Inventario inicial y registro durable

Origen observado del sitio: `https://agentfriendlyweb.dev`. Recurso registrado `afw_public_web`: Worker productivo `agent-friendly-web-web-production`; producción no modificada por esta preparación. Los checks normalizados disponibles son:

| Check | Qué debe medir el futuro productor | Orientación del diagnóstico |
| --- | --- | --- |
| public_home | Respuesta pública de `/` | Estado HTTP y revisión del despliegue; reproducción sin datos privados |
| public_discovery | Lectura de `robots.txt`, `llms.txt`, `index.md` y manifiesto de readiness | Detectar documento ausente/inconsistente; no inventar mejor puntuación externa |
| private_boundary | `/expediente` y APIs privadas exigen identidad | Si hay exposición, detener efectos y elevar incidente; no probar cuentas ajenas |

El check agrupa una familia; el productor futuro conservará evidencia técnica saneada para identificar la ruta fallida. Esta tabla es inventario, **no probes activos**. Correo queda fuera hasta tener su propio contrato y prueba de entrega real.

Implementación inicial: `lib/operations-ledger.mjs`, `lib/operations-ingress.mjs`, `worker/operations/schema.sql`. Inbox D1 separado de expedientes; recepción en batch transaccional, evento idempotente por ID+payload, agrupación por recurso/check/versión, recuperación cronológica y reservas de cinco minutos. Máximo tres investigaciones por fingerprint; agotamiento exige revisión, no bucle infinito. Terminar diagnóstico lleva a revisión, nunca a «servicio reparado».

Protocolo interno propuesto: `POST https://operations.agentfriendlyweb.dev/signals`, JSON exacto con `eventId`, `resource`, `check`, `version` (UUID del Worker), `observedAt` (ISO UTC), `result` (`failed`/`recovered`). Este hostname aún no está creado. Headers `x-afw-timestamp` (Unix ms) y `x-afw-signature` (HMAC SHA-256 hex de timestamp + punto + bytes originales). Secret de 32 caracteres o más en custodia de Worker y productor AFW, nunca en Git. El firmante debe resolver recurso y versión con evidencia administrativa antes de medir; la firma no acredita por sí sola que una medición haya ocurrido.

Rechaza campos extra, origen/recurso/check desconocidos, señal de más de 24 h, firma de más de cinco minutos, cuerpos superiores a 8192 bytes y uploads sin completar en tres segundos. Acknowledgement solo después de persistir; colisión 409, pausa/storage 503. Las firmas de OpenAI/GitHub requieren adaptadores separados: este protocolo no sirve para esos callbacks.

## Activación y rollback pendientes

No hay Wrangler de despliegue con IDs inventados. Crear Worker/D1 propios y verificar IDs, dominio y permisos. Aplicar schema en la base operacional nueva, nunca D1 productivo de expedientes. Habilitar entrada solo tras control de capacidad/retención/rate limiting y evidencia del productor. Pausa `AFW_OPERATIONS_ENABLED` distinta de true bloquea recepción; retirar ruta o volver a versión previa conserva D1. Las funciones de reserva no se exponen por HTTP: necesitan adaptador autenticado, pausa y presupuesto global antes de un ejecutor real.

Aceptación remota pendiente: persistir señal sintética, reenviar duplicado, simular caída y lease vencida, comprobar una sola investigación y resultado recuperado con equipo apagado. Retención/purga, presupuesto diario, dead-letter, scheduler de reconciliación y prueba D1 remota siguen pendientes; los tests SQLite no prueban esas capacidades cloud.
# Preparación de ventanas operativas

Antes de otra apertura, consultar [vencimiento por servidor](AFW-OPERATIONS-WINDOW-EXPIRY-2026-10-04.es.md): el código preparado requiere `AFW_OPERATIONS_WINDOW_EXPIRES_AT` en receptor y manager. Todavía no está desplegado; no inferir protección remota desde esta nota. El vencimiento bloquea nuevas peticiones y conserva el cierre administrativo separado.


## Continuidad verificada del 5 de octubre: custodia, código y cierre

Consultar AFW-CUSTODY-PROXY-ACCEPTANCE-2026-10-05.es.md antes de operar. Snapshot publicado en a4d90d4; ejecución real en ese contexto confirmó reviewed sin POST ni nueva reserva. No equivale a restauración en contexto nuevo. No repetir el ensayo funcional para suplir esa comprobación: el nuevo contexto debe probar primero HEAD/origin/limpieza, metadata de publicación y bindings por nombres/destinos, sin usar sus valores ni abrir el servicio.

Cierre comprobado en manager a34abbb3: seis controlesfalse, sin deadline, base operacional original; credencial nueva disabled y política anterior restaurada. El ID servidor permanece en custodia secreta. Para rollback, verificar settings efectivos además de la versión activa: seleccionar una versión anterior no restauró por sí solo los bindings durante este ensayo.

Orden de promoción pendiente: (1) evidencia de restauración de código en contexto nuevo; (2) aceptación remota CSRF humana soportada; (3) especificar y comprobar identidad estable, revocación, vencimiento, presupuesto y journal operacional antes de habilitar una cadencia. No renovar el piloto automáticamente ni volver a habilitar la identidad vencida. La credencial nueva vence el 6 de octubre a las17:31Argentina y ya está disabled; la caducidad no requiere intervención para conservar el cierre. No repetir pruebas PC-off aceptadas ni prometer reparaciones automáticas a partir de un ACK.
