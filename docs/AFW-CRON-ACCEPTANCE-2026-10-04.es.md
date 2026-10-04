# AFW: aceptación temporal de ejecución programada

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated operational QA; ORIGIN operations.agentfriendlyweb.dev y productor sin ruta pública. RESOURCE_TYPE Workers/cron/D1. RESOURCE_ID agent-friendly-web-operations, agent-friendly-web-operations-producer, D1 operaciones603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION firma temporal, cron cada minuto y lecturas agregadas. ROLLBACK configuraciones canónicas disabled, schedules[], eliminación de firma y preservación completa de D1.

Fuente base main2484166, PR224/CI749. Receptor05ff8b9e y productor7c1b5ac7 cerrados antes de la prueba; ocho eventos sintéticos y dos constancias recovered, delivery_pending0. Delegados canaryaa121311/real94a3c291 cerrados, sin cambiar Access/expedientes ni Tokenizart.

Ventana de QA veintidós minutos con deadline comprobado dentro de ambos Workers; observación máxima dieciocho minutos tras desplegar. Cloudflare documenta propagación de cron hasta quince minutos: [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/). Firma generada en memoria, custodiada como secreto Worker y eliminada al cerrar. No rutas manuales de disparo; fetch del productor siempre404. El operador local solo observa D1 y cierra, no ejecuta producer.run.

Criterio: dos observaciones nuevas en ambos recursos separadas al menos treinta segundos, recovered y sin entrega pendiente. La confirmación previa puede conservarse mientras sea reciente: no exigir un envío redundante para demostrar que el cron corrió. Si vence su ventana de quince minutos, debe haber un nuevo recibo antes de considerar la entrega vigente. La aceptación manual de binding sigue en [su recibo](AFW-PRODUCER-BINDING-ACCEPTANCE-2026-10-04.es.md).

Primer intento: receptor5a4290a9-849e-4d00-8545-1f822f05313e, productordea1bcd4-e0d3-4323-97fe-8bfaed215062. Deadline2026-10-04T16:31:30.476Z. Una lectura D1 falló por conectividad; finally cerró correctamente a16:20:29UTC sin aceptación. El error del observador no determina causa del scheduler. Se toleran lecturas fallidas dentro del mismo presupuesto en el segundo ensayo, sin inventar constancias.

## Aceptación programada real

Segundo ensayo: receptor2ec05458-d80a-4a8c-831a-4eeebadaed17, productor7df9ff09-2d63-4184-9517-ab951f5f6b53 al100%. Cron creado16:23:01.275713UTC; deadline16:44:15.281UTC. API confirmó flags temporalestrue, binding, firma custodiada y versiones esperadasclosed. No hubo disparo manual ni ruta QA de ejecución.

A16:33:09UTC D1 mostró confirmaciones nuevas de ambos recursos. A16:33:45UTC se observó un segundo ciclo sin nueva entrega:

| Recurso | Confirmación Unixms | Segunda observación Unixms | Resultado |
| --- | --- | --- | --- |
| afw_delegated_canary | 1791131559554 | 1791131617669 | recovered/pending0 |
| afw_delegated_real_pilot | 1791131560836 | 1791131618161 | recovered/pending0 |

Historial pasó de8a10eventos, dos recuperaciones por la confirmación ya vencida; el siguiente ciclo no añadió eventos. Cierre16:34:53.500UTC y lectura API posterior verificaron receptor17b54683-3668-47c1-a895-34bcd0e2372e, productorfa04bb41-c8d5-436a-9f5a-b465a4b5d122, cero firmas y schedules[], configuraciones canónicasdisabled. No se borró historial ni constancias. Los diez eventos son sintéticos.

Esto acredita cron remoto, persistencia/recibo y supresión por salud reciente. El ordenador local observó/cerró; no ejecutó las comprobaciones. No es una prueba con equipo apagado, aviso al gerente ni guardia continua. Siguiente consumidor y watchdog con transporte real. [Lectura watchdog preparada](AFW-WATCHDOG-PREPARATION-2026-10-04.es.md); [reconciliación cloud](AFW-CLOUD-TRIGGER-RECONCILIATION-2026-10-04.es.md).
