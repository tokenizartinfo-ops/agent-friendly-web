# AFW: admisión por cron QA y publicación cerrada aceptadas

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA aislada y publicación operativa cerrada; ORIGIN Worker scheduled-only, sin ruta pública; RESOURCE_TYPE Worker/D1; RESOURCE_ID agent-friendly-web-watchdog-qa-20261005/D1QA59974788 y agent-friendly-web-operations-watchdog/D1operativa603c471d. ALLOWED_ACTION ensayo sintético de admisión/dedupe/pausa y publicación cerrada. ROLLBACK flagsfalse/sin deadline/cron[]; conservar historial, sin DROP ni recursos Tokenizart.

Fuente f5cfeac1ba14be497ab95bc28376533a8d420fac, PR251. CI37325194535 pasó57s;826tests, lint cero errores/dos warnings existentes y build completo. Revisión del chat cloud sobre diff real: sin hallazgos bloqueantes,15tests focalizados aceptados; transacciones de outbox/inbox separadas declaradas. Wrangler4.128.0/identidad y cuenta verificadas.

QA comenzó paused14/8,15outbox/3inbox/2reservas históricas. Solo checkpoints sintéticos se refrescaron: canarydelivery_pending1, realpilot0, versiones/expectedclosed intactos. Esto no sondea los sitios reales.

Worker activo3f92d43e-5822-4626-988b-988a8ec2e864, binding exclusivamenteQA, flags watchdog/producer/noticestrue, deadline2026-10-05T14:41:59.918Z, cron cada minuto. Sin ruta/secretos. Primer intento de CLI falló antes del upload porque main relativo se resolvía desde output; se corrigió a ruta absoluta, sin cambio remoto en ese intento.

Tres observaciones persistidas por cron real y verificadas en D1:

| Etapa | checked_at | Canary | Realpilot | Inbox |
| --- | --- | --- | --- | --- |
| Admisión |1791211032950|revision15/delivery_pending|revision9/healthy|4, una nueva15 |
| Reobservación |1791211092861|revision15/delivery_pending|revision9/healthy|4, sin duplicado |
| Pausa |1791211152873|revision16/paused|revision10/paused|4, sin aviso nuevo |

Para pausa se publicó8a0ff8a1-03c9-4dd0-a718-986acdec1c7a con producerfalse manteniendo watchdog temporal. No se creó recuperación artificial al pasar de pausa a healthy. Manager/token permanecieron cerrados: no claim/ACK, reserva o nueva ejecución cloud durante este ensayo. Recepción cloud previa tiene recibo separado; no atribuir accepted a revisión15.

Clausura QA dbf0184e-f467-4751-b21f-268a00edf6aa comprobada: tres flagsfalse, deadline ausente, schedules[], bindingQA. Conserva16outbox/4inbox/2reservas y estadospaused16/10.

Publicación operativa cerrada ae622e3e-655d-456f-9c27-f01142df0d56 desde la misma fuente. API confirmó binding603c471d propio, tres flagsfalse/no deadline/cron[]/cero secretos. Historial operativo16events/2incidents/2investigations/2checkpoints intacto; states/outbox/inbox/reservations0. Manager finala27a3088 y tokenfalse con expiry17:39:03UTC original preservados.

Acepta cron→clasificación→transición→admisión actual/dedupe/pausa en QA y disponibilidad del código cerrado en operaciones. No demuestra vigilancia permanente, cadena nueva completa hasta cloud, reparación o aviso a clientes. Siguiente resolución trazable de review_required y ciclo de vida de identidad; preservar avisos y límites comunes. No repetir cron/PC-off/scheduler ya aceptados salvo cambio nuevo que requiera otra prueba específica.
