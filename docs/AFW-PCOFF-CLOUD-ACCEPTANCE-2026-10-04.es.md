# AFW: tarea cloud ejecutada con PC apagado

## Resultado aceptado y límite

Se acepta una ejecución por horario en la tarea cloud real AFW durante el intervalo de apagado declarado por Gabriel. La evidencia prueba el disparador, el contexto cloud y el acceso al checkout AFW. No prueba todavía una guardia permanente, reparación automática, lectura privada, diagnóstico de un incidente real o ejecución completa del gerente operacional.

## Correlación y tiempos

- Owner declara apagado 2026-10-04 19:59 y encendido 20:33, America/Buenos_Aires (22:59–23:33 UTC). Es una declaración del owner, no telemetría del equipo.
- Automation de una sola ejecución: `6ac2d8eba11c8191832ac1e2575f6040`, «AFW — prueba de entorno con PC apagado»; DTSTART 20:05 GMT-3, sin RRULE, exact_schedule. No se invocó run_now ni el botón de ejecución manual para este registro.
- Tarea `01a1090b-8557-7242-9bc9-8277bb300018`, host durable.
- Turno `01a1092c-39a8-7457-807b-104468b2ebd0`, startedAt 1791155255 y completedAt 1791155287: 20:07:35–20:08:07 GMT-3. El inicio de turno ocurrió 2 min 35 s después del horario solicitado; no se garantiza puntualidad exacta.
- Correlación en mensaje de ejecución: `afw-pcoff-env-20261004-01`, coincide con el prompt del registro programado. No tiene el wrapper de delegación de los prompts manuales enviados por root.
- El informe del ejecutor registró inicio de comprobación 20:07:42 y cierre 20:07:53 GMT-3. Estos tiempos internos se distinguen del inicio/cierre del turno.

El intervalo completo del turno y de la comprobación está incluido en el apagado declarado. La ejecución previa del preflight `6ac2d48cd44c81919c0717f12a720ff9` fue consumida después de un lanzamiento manual y no se usa para acreditar el horario o PC-off.

Consulta posterior `automations.peek`, turno `01a10949-5783-74ff-8d0d-8ae7f58d930b`: is_enabled false, last_run_time `2026-10-04T23:07:35.796818+00:00`, next_run_time null y thread_id correcto. Coincide con el turno observado; no queda una cadencia recurrente activa en este registro. Peek por sí solo no entrega resultado ni estado explícito de finalización.

## Evidencia técnica directa

Estado observado: provider cloud, running/connected, revisiones deseada/observada14, observaciones actuales, política de red restricted/enforced y sin fallo. `source_config_id` corresponde a AFW Operations: `38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfg_6abe6b6814a481a3aa2299efe46e2fe6`. La instancia existente conservó su versión `6ac2c8a0b3bc81a3a46a96f7bf01b914`; no prueba restore fresco de la publicación posterior.

Stdout de Git/comprobación, exit0:

```text
REPOSITORY_PRESENT
https://github.com/tokenizartinfo-ops/agent-friendly-web.git
d405902aa669e263b260b150ff785380ce30c104
TREE_CLEAN
PRESENT AGENTS.md
PRESENT docs/AFW-CLOUD-PUBLICATION-RECONCILIATION-2026-10-04.es.md
v24.19.0
git version 2.52.0
```

No modificaciones, fetch/switch, acceso al PC local, lectura de valores secretos, API privada, correo o nuevas programaciones durante el ensayo. No se ampliaron permisos ni activaron servicios AFW.

## Continuidad

No pedir repetir login o apagado para esta aceptación. Conservar los recibos de transporte, correlación manual, vencimiento y capacidades. Siguiente cierre separado: disparador por horario que complete el ciclo operacional saneado con requestId/runId y ledger independiente, ventana finita y retirada comprobada. Después evaluar cadencia permanente, presupuesto, recuperación y supervisión independiente; una ejecución aceptada no acredita disponibilidad continua.
