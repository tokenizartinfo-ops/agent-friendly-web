# AFW: aceptación cron del watchdog en QA aislada

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA; ORIGIN Worker sin ruta pública; RESOURCE_TYPE Worker/D1; RESOURCE_ID agent-friendly-web-watchdog-qa-20261005 / 59974788-5771-4bf5-aba1-a3fba1b70e7e. ALLOWED_ACTION esquema aditivo, cron acotado y fixtures sintéticos. ROLLBACK cron[], flagsfalse y deadline ausente; preservar historial. No expedientes ni checkpoints operativos modificados.

Fuente congelada PR238, runtime equivalente a main cf8b6ce mediante diff vacío. Validación previa786tests/lint/build/CI. Nueva D1 afw-watchdog-qa-20261005: solo producer-state.sql y watchdog-state.sql. Worker inicialmente cerrado9bb45467-4e45-41a4-a126-539c2f11f089; activo a2834d6a-c0ed-4a06-b338-b846758717e8. Sin secretos, rutas, workers.dev o previews.

Ventana abierta2026-10-05T01:05:39.192Z; cron creado01:05:42.047548Z; deadline servidor01:27:39.211Z. Controlador finally retiró cron/flags/deadline al terminar01:13:00.897Z. No llamada manual al handler ni endpoint público de disparo. Intención del productor true fue fixture de QA, no activación del productor real.

| Ciclo remoto (checked_at ms UTC) | Resultado | Outbox total |
| --- | --- | --- |
|1791162576194|Dos checkpoint_missing, revisión1, attention por recurso|2|
|1791162636184|Segundo cron59.990s después: misma revisión, fecha actualizada, ningún duplicado|2|
|1791162696180|Checkpoints saludables sintéticos: revisión2, recovered por recurso|4|
|1791162756192|Intención false: paused/revisión3, ninguna alarma o recuperación adicional|4|

Las consultas observaron ejecuciones nuevas del cron; no se usaron dos lecturas de un mismo ciclo como aceptación. Recuperación significa transición por fixtures saludables, no reparación de un servicio. Outbox significa constancias pendientes, no notificaciones enviadas.

Aceptados falta de checkpoint, deduplicación, recuperación sintética y pausa silenciosa. Entrega pendiente/obsolescencia no se ensayaron en este subconjunto. Falta transporte con fence de revisión/pausa actual, acuse/idempotencia y prueba de entrega antes de guardia continua. No repetir prueba PC apagada, login o rotación para este bloque.

Cierre independiente: versión6b9ea3e2-71e0-4c51-9d20-53ad3c221925 al100%; cron[], flagsfalse, sin deadline/secretos/workers.dev/previews y binding exclusivo QA. QA preserva2estados paused/revisión3 y4constancias. D1 operacional conserva2checkpoints y0estados/0avisos watchdog. Lecturas sin escrituras.
