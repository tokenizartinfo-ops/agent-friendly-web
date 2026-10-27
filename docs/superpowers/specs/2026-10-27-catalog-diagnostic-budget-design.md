# Diagnóstico y presupuesto del descubrimiento — 27oct2026

## Intención y evidencia
El ensayo84d198 completó lectura y UN consentimiento de avisos. Work consultó fuentes20:40:07UTC, unos411s después de exchanged_at20:33:16.217UTC, y obtuvo0AFW. El artefacto0b074569 limita accessTokenTTL a300s y refresh está false. exchanged_at se escribe antes de emitir el token: NO es prueba de emisión, recepción, uso ni su vencimiento exacto. El desfase exige un margen de coordinación; no acredita la causa de la lista vacía.

La documentación oficial de MCP Events, consultada27oct2026, requiere observar server/discover y events/list, ver eventos en la ficha tras el rescan y luego seleccionar el consumidor. https://developers.openai.com/plugins/build/mcp-events

## Enfoques y decisión del responsable
1. Repetir solamente antes: barato, pero otro0 sin trazas seguiría ambiguo.
2. Ampliar TTL/activar refresh: cambia acceso y oculta la demora; descartado.
3. Preparación acotada con fecha conservadora de despacho y el observador ya incluido: elegido por el responsable bajo la instrucción permanente de avanzar autónomamente y decidir detalles. No es una preferencia nueva atribuida al owner.

## Contrato
- Conservar pin60d113fb/artefacto0b074569, bytes, recursos, permisos y plazo original<=600000ms.
- inspectCatalogDiscoveryGrant devolverá exchangedAt y catalogDispatchBefore=min(window.expiresAt,exchangedAt+240000). Esta es una fecha conservadora para iniciar descubrimiento, NO el vencimiento SDK ni prueba de credencial viva. Rechazar now>=catalogDispatchBefore en inspección y construcción del payload catalog. Las lecturas primarias existentes antes/después de efectos conservan ese límite.
- La fase catalog expondrá catalogDispatchBefore en el recibo saneado para que el coordinador/Work pueda detenerse antes de consultar tarde. No es un scheduler.
- Ambos payloads temporales añaden AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED=true y START_AT/EXPIRES_AT originales, en milisegundos decimales.33bindings:29base+continuidad+3diagnóstico. No otro permiso ni contenido; el observador existente solo emite etiquetas, fuente, método permitido, fecha, estado y conteo.
- El cierre restaura la versión base exacta de29bindings. No añadir diagnóstico al cerrado ni cambiar el artefacto, programa Node, presupuestos singleton, OAuth TTL/refresh o consentimiento.
- Mantener64APIreads/10SELECT/110000ms y los ocho reintentos de lectura compartidos. No nuevas escrituras ni replays; acuses desconocidos terminales.

## Operación posterior, todavía NO ejecutada
Preparar captura saneada ANTES del rescan. La API de consulta observabilidad disponible no tenía eventos históricos para esta ventana y settings no declara persistencia; no inferir cobertura. Reutilizar el supervisor/filtro existente si la captura cloud no puede custodiar el canal sin extraer claves; un proceso local puntual, acotado y sin instalación es una excepción justificada a cloud-first, no un servicio permanente. Debe terminar y eliminar únicamente su tail, con comprobación primaria, antes de cerrar (la guarda exige tails0). No guardar frames, encabezados, cookies, querystrings o errores crudos.
Después de nueva autorización de lectura/avisos: fechar rescan terminado, confirmar evento visible y consultar Work dentro de catalogDispatchBefore. Si no queda margen/cobertura, cerrar; no ampliar TTL ni pedir OTP para ocultarlo. Sin suscripción, callback, secreto, reservas o Node en este bloque.

## Cierre y riesgos
Pruebas RED→GREEN, CI completo, paquete congelado y UNA revisión independiente. Todavía sin ensayo remoto nuevo ni PC-off; operationalReadinessfalse. Si el margen conservador rechaza una credencial que aún podría servir, se pierde una ventana de QA; se prefiere a otra consulta tardía no diagnosticable.
