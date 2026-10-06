# Cliente cloud canónico de asistencia

Continúa la aceptación real descrita en AFW-ASSISTANCE-CLOUD-ACCEPTANCE-2026-10-06.es.md. El helper ad hoc de esa prueba rechazó una respuesta válida: buscó eventId en raíz y exigió expiresAt string. El cliente versionado ahora usa el contrato real sin ampliar permisos.

`lib/operations-client.mjs`: listAssistance, claimAssistance y finishAssistance. Destino HTTPS fijo, redirecciones prohibidas, JSON acotado, timeout y errores saneados. Reserva exacta anidada, eventId/requestId correlacionados y vencimiento entero futuro. Lista de hasta tres eventos únicos; no agrupar por proyecto porque varios pedidos pueden compartir revisión. Outcomes reviewed/intervention_required/superseded nunca significan resolved.

`scripts/afw-operations-client.mjs`: assistance-list, assistance-claim EVENT_ID REQUEST_ID y assistance-finish RUN_ID OUTCOME. La recuperación explícita conserva REQUEST_ID; no retry automático ni generación implícita de reserva. Custodia por los bindings gestionados existentes, nunca argumentos/archivos con claves.

Pruebas: reserva real anidada, recuperación idéntica, CLI, correlación equivocada, vencimiento/string, campos privados extra, eventos duplicados y resolución inventada. Suite completa de cliente y avisos: 13 pruebas; suite global observada antes del último añadido CLI: 978 pruebas. Validación final CI sigue como requisito de integración. No activación, SQL remoto ni cambio de custodia por este bloque.
