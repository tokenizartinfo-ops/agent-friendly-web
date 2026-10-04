# Receptor operativo aislado — preparación

## Publicación y recepción remota comprobadas

PR218 integrado, fuente d134287f9876173551991c377de48b7f34a35b04; CI37210439036 pasó742pruebas/lint/build. D1 creado603c471d-19bb-4530-9773-c02e18b29840, nombre agent-friendly-web-operations, esquema exclusivamente operativo aplicado a base vacía. Worker mismo nombre, dominio operations.agentfriendlyweb.dev; configuración wrangler.operations.jsonc disabled. Primera versión cerrada56c80094-69e3-4078-9554-995353e4d584: API verificó binding exclusivo y POST503; cero eventos/incidencias antes de QA.

Aceptación sintética4deoctubre14:51:48UTC (11:51Argentina), versión temporal bd80d32e-7d74-478c-ae92-4761fb736afb: señal firmada202, repetición202/duplicatetrue, firma falsa401 y recuperación202. API de D1 después: dos eventos, una incidencia recovered/closed; el duplicado y la firma falsa no agregaron eventos. Señales sintéticas sobre recurso delegado canary con versión cerrada comprobada, sin consultas privadas ni expedientes.

Firma aleatoria generada en memoria y cargada como secreto Worker, sin archivo/chat/Git; retirada después. Cierre restaurado en finally. Versión final4157f63d-2976-4a97-b40f-5d20a590da19 al100%, AFW_OPERATIONS_ENABLEDfalse, binding D1 aislado, sin secreto de firma; API comprobada14:52UTC. POST503 después del cierre. Conserva los dos eventos sintéticos. No cron, productor periódico, consumidor cloud, alerta humana o reparación automática activos.

Dos problemas del runner de prueba se resolvieron antes de aceptar: comandos Windows con mensajes entre comillas fallaban antes de publicar, y una lectura inmediata tras promoción recibió503. El ensayo definitivo esperó únicamente respuesta paused durante propagación, con seis intentos máximos/dos segundos; no convirtió storage_unavailable en éxito. No atribuir esos fallos a un defecto de Cloudflare o a incompatibilidad de versiones sin evidencia. La primera aceptación fallida también restauró cierre y retiró su firma; no dejó eventos en D1.

Rollback vigente: restaurar una versión cerrada compatible con la custodia actual de secretos, o publicar la configuración canónica disabled, comprobar POST503 y conservar D1/historial. No reactivar una versión enabled antigua con una firma retirada ni borrar la base para resolver un fallo.

Siguiente: productor autenticado con identidad/custodia propia y periodicidad, política de mantenimiento y reducción de estados saludables repetidos; verificar entrega al consumidor cloud mediante contrato real. Esta recepción no demuestra que Codex sea notificado ni que exista gerente permanente.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated operations; ORIGIN https://operations.agentfriendlyweb.dev; RESOURCE_TYPE Worker/D1; RESOURCE_ID previstos agent-friendly-web-operations. ALLOWED_ACTION crear recursos exclusivos, tablas operativas vacías, publicar receptor cerrado y probar recepción sintética firmada en apertura temporal. No reutilizar D1 de expedientes, no modificar permisos de clientes ni Tokenizart. ROLLBACK volver a versión cerrada conservando D1 e historial; desactivar recepción antes de cualquier investigación. No borrar datos ni habilitar reparaciones automáticas.

La configuración canónica queda disabled. Firma HMAC exclusiva custodiada como secreto Worker; nunca Git, chat, archivo de evidencia ni correo. La prueba temporal no crea productor continuo, cron o consumidor Codex. Primero comprobar POST503 cerrado, después recepción202/duplicado/recuperación y firma inválida401; restaurar cierre incluso si falla la prueba. El material sintético queda en el ledger aislado como evidencia, sin expedientes.
