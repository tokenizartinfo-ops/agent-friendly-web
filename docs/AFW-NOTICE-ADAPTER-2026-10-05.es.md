# AFW: adaptador de avisos preparado cerrado

El gerente operacional existente conserva su origen fijo, verificación RS256 de issuer/audience/common_name de servicio, rechazo de navegador y limitador compartido. El canal nuevo agrega GET /notices, POST /notices/claim y POST /notices/ack únicamente con noticeEnv de servidor, tres flags true (notices/watchdog/producer) y deadline vigente. Falta flag/env:404 antes de autenticar o leer D1. Los cuerpos no pueden ampliar identidad, configuración, recurso o permisos.

El Worker pasa env de servidor al adaptador, pero la base usada se fija a OPERATIONS_DB verificada y su sesión primaria; no se acepta un binding o destino del cliente. Las rutas tradicionales de incidencias conservan su contrato. El listado devuelve como máximo dos avisos vigentes y saneados, excluye reserva activa/acuse accepted, pausas y fechas vencidas; no despacha todas las filas históricas. La reserva/acuse mantiene el contrato de PR243. ACK accepted es recibo operativo, no diagnóstico, reparación, envío a cliente o prueba de una ejecución cloud.

Preparación local exclusivamente: ningún deploy, esquema remoto, token, política Access, flag remoto o cron modificado. La configuración canónica incompleta del manager no debe desplegarse sobre los bindings remotos existentes. El consumidor actual continúa con sus permisos/estado de cierre verificados en los recibos anteriores; este commit no acredita un nuevo estado remoto.

RED observado: las nuevas rutas respondían404 antes de implementar. Pruebas de identidad válida, servicio distinto, petición de navegador, flags cerradas, cuerpos estrictos, ausencia de escrituras del ledger legado, listado vacío tras acuse/pausa, metadatos inválidos saneados y limitador429. Las pruebas legacy de identidad humana/audiencia/expiración/firma permanecen.

Aceptación autenticada workerd/D1 local: JWT RS256 de servicio sintético fijado por servidor; listado sin identidad401, listado autorizado200, reserva/reintento con mismo runId, acuse200 cuya respuesta se descarta y repetición que recupera accepted persistido. Lectura D1 independiente conserva una única reserva/recibo accepted. Runtime y base efímeros; dispose en finally. No identidad real de Cloudflare ni recepción desde Codex cloud acreditadas.

El límite por solicitud es compartido con incidencias, pero el presupuesto diario de reservas de notices sigue separado del de investigaciones. Antes de cadencia estable debe coordinarse el presupuesto total del gerente. No abrir el piloto sin bindings/origen/identidad/deadline comprobados, rollback flagsfalse/sin deadline y esquema exclusivo de QA. Preservar datos/historial; no DROP ni reutilizar expedientes o recursos Tokenizart.

Siguiente: coordinación del presupuesto diario, cliente cloud de listado/claim/ACK con requestId persistido y lectura/reconciliación de acuse perdido; luego publicación cerrada y único ensayo QA correlacionado. No repetir workerd/cron/PC-off/login aceptados o ampliar permisos por un badge del conector.

Revisión de tipos: RED reproducido con requestId como arreglo de UUID (503 en lugar de400). Claim y helpers ahora exigen strings antes de validar UUID; ACK HTTP ya exigía string. Regresión cubre arreglos/objetos, respuesta400 y cero reservas escritas.

Validación local:808/808 pruebas,0fallos; lint0errores/dos warnings previos. Ningún recurso remoto modificado.
