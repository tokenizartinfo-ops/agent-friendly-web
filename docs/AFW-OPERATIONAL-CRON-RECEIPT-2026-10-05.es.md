# AFW: ensayo del productor operacional cerrado sin ejecución confirmada

## Alcance

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT operacional acotado; ORIGIN operations.agentfriendlyweb.dev y Workers sin ruta productor/watchdog; RESOURCE_TYPE Workers/crons/firma temporal/D1; RESOURCE_ID agent-friendly-web-operations, agent-friendly-web-operations-producer y agent-friendly-web-operations-watchdog; ALLOWED_ACTION observar únicamente los dos bordes públicos delegados, entregar señales firmadas y retirar la ventana; ROLLBACK flagsfalse, sin deadline ni cron y retirar firma temporal, preservando D1original603c471d-19bb-4530-9773-c02e18b29840. Sin expedientes, correo, datos de clientes o cambios en sus sitios.

## Corrección y preparación

PR280 merged c11a0d0d9352ea858ce7c98637bd9854110ef274; CI37391570075 success. Fuente4a04208. La corrección comprueba el vencimiento antes de nuevas reservas, sondas y entregas, preservando operaciones ya admitidas. Recibo técnico: AFW-PRODUCER-WINDOW-FIX-2026-10-05.es.md.

Productor cron cada minuto creado6octubre2026 00:03:23.823621UTC. Un ajuste de ventana mediante wrangler deploy actualizó modified_on a00:10:43.707179UTC aunque conservaba la misma expresión. Deadline final00:28UTC (5octubre21:28BuenosAires). Versiones abiertas: productor67c37c26-42c8-4b11-918d-b2f5ed17287f, receptor128bc17d-159c-4c24-a772-128e0e0dd6f1. Firma generada en memoria, puesta en custodia servidor y nunca publicada ni leída.

Watchdog cron creado00:05:54.355708UTC con tresflagsfalse. Versión preparada por versions upload3c561f12-9cb9-4b41-ae61-55e8c9a08d6a, no activada: el productor nunca confirmó checkpoints recientes. Upload no cambió modified_on del cron. Esto verifica preparación independiente de triggers, no ejecución de la versión candidata.

## Resultado observado

Lecturas D1 hasta00:28:12UTC mantienen ambos checkpoints históricos, delivery_pending0/lease_until0; events16, incidents2, investigations2. Watchdog state/outbox/inbox/reservations/reviews0. Foreign_key_check vacío. Ningún dato histórico se eliminó o fabricó para aceptar el ensayo.

API scripts declaró handlers fetch/scheduled para ambos Workers. API schedules confirmó las expresiones instaladas. Tail del productor conectado00:21:41UTC, cerrado antes del rollback, sin invocaciones observadas. GraphQL workersInvocationsAdaptive del intervalo00:03–00:28 devolvió agregados vacíos sin errores; la telemetría puede tener retraso y eso por sí solo no prueba ausencia absoluta de ejecución. Junto con checkpoints sin cambios, el circuito cron→sonda→entrega→confirmación queda **no confirmado**. No se hizo ejecución manual sustituta. No atribuir el resultado a cookies, correo, identidad del usuario o Cloudflare Access sin evidencia.

Cloudflare indica que los cambios de cron pueden tardar hasta15minutos en propagarse: https://developers.cloudflare.com/workers/configuration/cron-triggers/. Pasó ese horizonte desde el último cambio del productor sin evidencia observable. No diagnosticar automáticamente una causa interna del proveedor; sigue pendiente su disparador.

## Cierre verificado

Rollback explícito de configuraciones cerradas y DELETE de AFW_OPERATIONS_SIGNING_SECRET exclusivamente en productor y receptor. Esa retirada crea versiones adicionales: los IDs finales no son los que imprimió inicialmente deploy.

API00:27:52UTC verificó100%:

- Productor25b94286-ec49-4dd2-8ce9-25f2026bd401: enabledfalse, deadlineausente, firmaausente, cronvacío, D1original/servicereceptor conservados.
- Receptor8de53efe-6401-48e8-9c90-ce390244b39b: enabledfalse, deadlineausente, firmaausente, cronvacío/D1original.
- Watchdogd6b46a0a-cc5a-490c-b633-a6410587df2e: tresflagsfalse, deadlineausente, cronvacío/D1original.
- Manager0424a048-d084-48f7-90b3-03c0d9ee66a2: seisflagsfalse, sin deadline/cron, D1original. Custodia de identidad gestionada permanece servidor; no eliminarla ni recargarla por este ensayo.

API00:28:12UTC confirma token gestionado1bf43326 disabled, vigencia original4noviembre22:09:32UTC y política del manager restaurada al selector d12150c5 anterior. Automatización cloud permaneció retirada según aceptación previa; este ensayo no la modificó.

## Próximo bloque

Diagnosticar scheduled con gates cerrados y telemetría acotada; preparar cron una vez y esperar su propagación antes de abrir una ventana independiente mediante versions upload/deploy. Exigir dos checkpoints frescos y confirmados antes del watchdog, luego deduplicación saludable y lectura operacional cloud. No ampliar credenciales, reintroducir fixtures QA, repetir login/PCapagada ni proclamar guardia continua. Si el cron no ejecuta, cerrar y conservar evidencia; una instalación correcta no es una ejecución aceptada.
