# AFW: ensayo operacional programado y cierre anticipado

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated synthetic operations; ORIGIN operations.agentfriendlyweb.dev / operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Workers/Access/operations D1; RESOURCE_ID agent-friendly-web-operations, agent-friendly-web-operations-manager, D1 603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION una señal sintética firmada, consumidor programado temporal, recuperación sintética y cierre. ROLLBACK flags/token cerrados, deadline/firma retirados; conservar historial. Ningún cliente, Tokenizart o cron permanente modificado.

## Resultado y límite

El disparo por horario sí ocurrió. La cadena operacional completa NO quedó aceptada: root cerró anticipadamente el intento al interpretar la ausencia momentánea de `last_run_time`/`next_run_time` como motivo de cancelación. El turno programado llegó durante la clausura, completó el preflight y recibió la instrucción de cancelar antes de invocar el ejecutor. No hubo list/claim/finish ni reserva para este evento. No es un fallo demostrado del scheduler, ni evidencia de reparación real, ni nueva prueba PC-off.

Automation única `6ac2e959fa4c81918a7f19e0d7ac0eee`, thread `01a1090b-8557-7242-9bc9-8277bb300018`/durable. Prevista 2026-10-04 21:05 Buenos Aires (2026-10-05T00:05:00Z); ventana hasta00:20UTC. Llegada `last_run_time=2026-10-05T00:09:15.220087+00:00`, demora4m15s. Turno `01a10964-aaa2-767e-9059-7476b60bdc69`. Clausura verificada por peek: is_enabledfalse, next_run_timenull; checkpoint ausente/manifiesto conservado. No lanzamiento manual o RRULE.

Creación original con DTSTART UTC terminó normalizada sin Z. Se corrigió EL MISMO registro antes del horario a DTSTART20261004T210500 y default_timezoneAmerica/Buenos_Aires. PC-off anterior usaba TZID explícito desde creación. Esta diferencia y la actualización cercana son hipótesis de latencia, no causas demostradas. Que peek devuelva next_run_timenull no acredita fallo o ausencia de disparo.

## Evidencia independiente

- Versiones previas comprobadas: receiverc4c094fd / managerb58decfc; canaryaa121311-2d88-4a2f-ad54-b52193cd1c20. Presupuesto una reserva previa en24h; attempts1. Token existente versión2/deshabilitado/expiry2026-10-05T17:39:03Z.
- Evento `afw-scheduled-20261005-0005`, resourceafw_delegated_canary/checkdelegated_edge, observedAt2026-10-05T00:01:47.302Z, recepción202 firmada. Fingerprint `f9fa28e7202993a40e938d8ba33cea62f05af51ccc25aa0040fd39fd5722537c`. D1 confirmó processed1/failed/pending; receiver cerrado inmediatamente versión6cc2bc62, sin firma/deadline.
- Manager temporal8cc1c462 con deadline00:20UTC. Identidad/audiencia/D1 comparadas con Access y token; limiter10/60 preservado. Token temporalmente habilitado sin cambiar versión/vencimiento. D1 a00:08:56UTC: ninguna investigación con observed_at1791158507302.
- Tras clausura, recuperación sintética202 con evento sufijo-recovered a00:09:45.159UTC. D1 posterior: recovered/closed, attempts1 y ninguna investigación de ese observed_at. La recuperación fue un acto de limpieza de ensayo, no el resultado del gerente.
- Cierre final comprobado por API: receiver343075f9-54df-44be-98b9-7710b3a6f572 y manager9ca9b85b-6f96-41e8-a1a7-6f2c311d0248, ambos100%, flagsfalse, cero secretos Worker, sin deadline. Tokenfalse/versión2/expiry original. No se borró historia.

## Preparación validada

Ejecutor cloud fuera del repo `/workspace/afw-operations/scheduled-cycle.mjs`, sha256ab0e40963646e460e65ee8589ac4c1ffacab362ec320bac7e1ffbf7a04f9a89a. Persistencia fsync archivo y directorio. Seis casos sin red: manifiesto inválido, ventana vencida, checkpoint preexistente, happy path, claim perdido y finish perdido. Fake verificó requestId guardado antes de claim y runId/expiresAt antes de finish; una llamada por operación, sin retries. Tests canónicos cliente/ventana7PASS. Esto no sustituye el ensayo real pendiente.

## Regla para el siguiente ensayo

No repetir PC-off, login, consentimiento, transporte manual o preflight por sí solos. Próximo bloque: UN ciclo completo con TZID explícito desde creación y margen holgado, manifiesto nuevo, mismo presupuesto/identidad y deadline servidorT0+15min. Root debe mantener el ensayo hasta resultado o deadline, salvo revocación humana, riesgo concreto o precondición rota. La falta transitoria de metadata del scheduler no es precondición rota. Evitar mensajes de control de estado a la tarea durante la ventana; leer estado desde root y recuperar después. No crear sustitutos mientras exista un intento autorizado. Si no hay resultado al deadline, deshabilitar automation, cerrar token/flags y conservar checkpoint/IDs para resolver ambigüedad, sin ejecutar manualmente ni generar reservas nuevas. Recuperación separada después de contraste D1; nunca llamarla diagnóstico o reparación.
