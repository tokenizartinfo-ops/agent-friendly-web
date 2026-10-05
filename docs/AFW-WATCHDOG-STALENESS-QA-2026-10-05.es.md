# AFW: aceptación remota de entrega pendiente y antigüedad

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA aislada; ORIGIN Worker sin ruta pública; RESOURCE_TYPE Worker/D1; RESOURCE_ID agent-friendly-web-watchdog-qa-20261005 /59974788-5771-4bf5-aba1-a3fba1b70e7e. ALLOWED_ACTION fixtures sintéticos y cron acotado. ROLLBACK cron[], flagsfalse/deadline ausente; conservar historial. Sin expedientes, manager, tokens o productor real modificados.

## Ventana y evidencia

Fuente watchdog congelada PR238; fuente main3fe2843, sin cambio de runtime en este ensayo. QA reusada con su historial previo2estados paused/revisión3 y4constancias. No se agregaron tablas. Apertura2026-10-05T01:32:52.468Z, cron creado2026-10-05T01:33:01.166224Z, versión activa fcc4f9b1-abdc-45f4-bf2c-4506d4823702 al100%. Deadline servidor2026-10-05T01:54:52.469Z. El controlador finally retiró cron/flags/deadline al finalizar2026-10-05T01:52:33.961Z.

|checked_at remoto (ms UTC)|Fase|Revisión por recurso|Constancias totales|
|---|---|---|---|
|1791164838379|pending|4|6|
|1791164898370|dedupe|4|6|
|1791164958368|observation|5|8|
|1791165018369|delivery|6|10|
|1791165078368|healthy|7|12|
|1791165138379|pause|8|12|

Dos recursos sintéticos por ciclo. Entrega pendiente generó attention2 y su segundo ciclo59.991s después no agregó nada ni cambió revisión. Observation_stale se ensayó con observación20min antigua/acuse reciente; delivery_stale con observación reciente/acuse20min antiguo y delivery_pending0. Cada causa fue distinta, sin coexistencia falsa. Healthy añadió recovered2, no acredita reparación real; paused no añadió avisos. Los cuatro avisos históricos previos permanecen dentro de las12constancias finales. Los ciclos provinieron del cron remoto, no un endpoint/handler manual. Antes del primer ciclo se refrescaron únicamente los checkpoints pending de QA para evitar que la propagación del cron mezclara antigüedad con esa causa. No copiar este procedimiento a checkpoints reales.

## Cierre independiente y límites

API posterior: versión2d113927-f0a0-4ccb-ad8b-994e37e08b42 al100%, cron[], flagsfalse, sin deadline/secretos, workers.dev/previewsfalse, binding exclusivo a QA. D1 conserva2estados paused/revisión8 y12outbox; operations_watchdog_inbox no existe remotamente. D1 operativo conserva16eventos/2incidencias/2investigaciones/2checkpoints y0state/0outboxwatchdog. Ninguna fila operativa recibió fixtures.

La [inbox preparada](AFW-WATCHDOG-NOTICE-CONTRACT-2026-10-05.es.md) se integró separadamente en PR241, main c16291c46d17c3a9d4d4062a66ab08ee93162867; CI37252487304 pasó51s. RED→GREEN, suite791 antes de dos pruebas adicionales,7focalizadas/lint/build pasan; revisión cloud del diff sin bloqueos. No helper conectado a runtime, esquema aplicado, reserva, ACK o notificación entregada. Este ensayo acepta clasificación y transiciones; no constituye vigilancia continua ni demuestra que una intención configurada se reconcilie automáticamente con el productor real.

Siguiente: reserva/acuse idempotentes de notices con fence vigente al claim/despacho y resultados superseded, adaptador autenticado cerrado y prueba de recepción cloud correlacionada. No reutilizar delegated_edge para señales de silencio/acuse, enviar filas históricas ciegamente o repetir PC-off/login/cron ya aceptados.
