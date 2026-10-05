# AFW: transporte cloud de avisos preparado localmente

Cliente lib/operations-client.mjs y CLI scripts/afw-operations-client.mjs agregan notice-list, notice-claim RESOURCE REVISION REQUEST_ID y notice-ack RUN_ID. Reutilizan origen HTTPS fijo, proxy de credenciales, rechazo de redirección/HTML, deadline, respuesta máxima8192 bytes y errores saneados. No destinos elegidos por el modelo, recursos Tokenizart, datos privados arbitrarios o reintentos automáticos.

Listado máximo dos recursos permitidos, sin duplicados, con causas canónicas y fechas/revisiones válidas. Reserva correlaciona exactamente resource/revision/requestId y valida UUID de runId/expiración numérica. Acuse solo accepted o superseded; accepted acredita recepción operativa, no diagnóstico ni reparación. Claim/ACK repetidos usan identidad explícita existente.

RED: métodos inexistentes y comandos válidos rechazados como desconocidos. Regresiones de respuestas con datos extra, recurso ajeno, causas arbitrarias, revisión no numérica, correlación equivocada, expiración inválida y argumentos rechazados antes de IO. Pruebas de transporte anterior permanecen.

No persistencia cloud acreditada todavía. El filesystem temporal del entorno no es un journal durable. Antes de automatizar el ciclo hace falta un registro servidor AFW, exclusivamente en D1 operaciones, que guarde la intención/requestId ANTES de claim y permita consultar esa intención después de una respuesta perdida. Debe tener una sola intención activa, revisión CAS/lease, recurso/revisión inmutables, historial separado de secretos y autenticación de servicio idéntica al manager. Guardar runId/expiración antes de ACK; un acuse perdido se consulta/repite con el mismo runId. Respuesta superseded o lease vencido requiere nueva lectura; nunca generar automáticamente un requestId distinto ante error de transporte.

Orden siguiente: contrato y pruebas del journal servidor; almacenamiento/endpoint autenticado cerrado; ciclo del cliente que recupera intención, claim y ACK; workerd/D1 con respuestas descartadas y nueva instancia cliente; publicación cerrada preservando bindings; único ensayo QA/cloud correlacionado. No repetir PC-off/cron/OTP aceptados. Sin deploy, migración remota, secretos, flag o cron modificado en este bloque.

Presupuesto compartido integrado PR246/main bb95fba, CI37313592469 pass1m18s. Mantener control compartido independiente al cerrar notices según AFW-SHARED-MANAGER-BUDGET-2026-10-05.es.md.

Validación local:816/816 pruebas, cero fallos; lint cero errores/dos warnings previos; build completo. Simulación de respuestas claim/ACK perdidas y nueva instancia cliente conserva requestId/runId explícitos. No servidor remoto ni almacenamiento persistente entre ejecuciones comprobados por esa simulación.

Revisión: respuesta HTTP200 JSON null reproducía TypeError al acceder a reservation. Acceso seguro y validación estricta ahora producen Operational request unavailable; regresión exige una sola petición, sin retry. No secretos en errores.
