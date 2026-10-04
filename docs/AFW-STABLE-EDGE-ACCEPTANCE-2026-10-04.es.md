# Aceptación remota de configuración estable sintética

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT synthetic canary; ORIGIN https://delegated-canary.agentfriendlyweb.dev; RESOURCE_TYPE Worker; RESOURCE_ID agent-friendly-web-delegated-canary. ALLOWED_ACTION: promoción temporal de configuración estable y consultas públicas sin credenciales, seguida de cierre. ROLLBACK aa121311-2d88-4a2f-ad54-b52193cd1c20. El piloto real no se abre.

## Evidencia del 4 de octubre

Fuente72eeeb9ed6d3f4fc040689ae968530a98a845fb1, código PR214/CI739. Variante ignorada bajo output/stable-canary-20261004: enabledtrue, modestable, ausencia de deadline, refreshfalse, mismo cliente/audiencia/D1/KV y límite30/60. API verificó los bindings antes de promover. Versión temporal aa17ee2a-bca3-4fff-94b7-00e9669a07fe. No migraciones, cambios de Access, registros de clientes ni consentimientos nuevos.

A14:12:51UTC (11:12Argentina), checkDelegatedEdge comprobó metadata de servidor y recurso200 con issuer/resource/endpoints correctos, PKCES256 y token authnone; MCP anónimo401. Piloto real: tres404. privateReadVerifiedfalse: no acredita una lectura privada nueva ni continuidad prolongada. Las aceptaciones anteriores de lectura, retirada y recuperación conservan su alcance; no se repiten por rutina.

Restauración ejecutada dentro de finally a14:12:58UTC: canaryaa121311100%. API confirmó piloto real94a3c291100% sin cambios. A14:13:23–24UTC, seis404. Consultas D1 agregadas: canary8históricos/0sin retirar, real4históricos/0sin retirar. No se revivieron permisos ni se modificaron expedientes.

## Próximos bloques operativos

1. Mantener una expectativa versionada por servicio, con ventana de mantenimiento explícita y cierre obligatorio para ensayos temporales. El chequeo actual espera ambos cerrados; no cambiarlo a disponible mientras sigan cerrados.
2. Monitorear desde infraestructura cloud con consultas públicas sin secretos, tiempos acotados y resultados saneados. Separar fallo de red de configuración inválida y límite429; una sola incidencia por episodio, recuperación vinculada al mismo episodio. No reconectar ni publicar automáticamente al detectar un fallo.
3. Dirigir incidencias al flujo operativo AFW ya existente mediante autenticación y contrato comprobados; no inventar un webhook ni asumir que Codex observa cada ejecución. Verificar recepción y resolución antes de anunciar gerente continuo.
4. Antes de abrir estable: cliente/callback vigente, responsable de soporte, comunicación de duración individual diez minutos, selección de expediente verificada por servidor, retiro y rollback cerrado. Metadata del apex y auth.md solo después de endpoints realmente activos y aceptación operativa.

Esta prueba no establece un SLA, una programación periódica, una prueba de ordenador apagado ni un aumento del puntaje externo. No se dejó el servicio abierto ni se envió invitación al primer cliente.
