# AFW: preparación y conciliación por MCP, registro interno cerrado
19oct2026. AFW / tokenizartinfo-ops/agent-friendly-web.
## Resultado de fuente
lib/delegated-capsule-preparation-mcp.mjs añade un registrador desacoplado de dos herramientas al host de PR504–506. Nadie lo importa desde el OAuth Worker, el MCP público o el servidor de lectura. No registra un scope real ni instala consentimiento, tablas, permisos o runtime.
registerDelegatedCapsulePreparation(server,{enabled,host}) devuelve false sin tocar host/server salvo enabled===true exacto. El caller de servidor aporta el host inmutable de la petición verificada. Registrar nombres/esquemas no autentica, no concede autoridad y no sustituye las comprobaciones de token/grant/owner/ventana/dominio del host.

## Herramientas y contrato
prepare_capsule_draft prepara solo un borrador con datos ya guardados; reconcile_capsule_preparation consulta el resultado de esa misma solicitud sin regenerar ni renovar la reserva.
Ambas reciben únicamente contract agentfriendly.capsule-prepare.v1, expectedRevision entero seguro positivo e idempotencyKey acotada. La validación del SDK y el parser compartido del dominio rechazan campos adicionales. Sujeto/proyecto/dominio, contenido libre, precio, aprobación o acceso a hosting no son argumentos.
Metadatos: preparación readOnlyHintfalse, conciliación readOnlyHinttrue; idempotenttrue, destructivefalse/openWorldfalse. _meta.securitySchemes declara el scope futuro afw:capsule:prepare, distinto de lectura. Estos datos son hints de herramienta: el host sigue autorizando cada operación. No se emite un desafío de consentimiento/reconexión automática desde una denegación.

## Salida y recuperación
Respuesta estricta y pequeña: contrato/código, referencia UUID de cápsula, hash/revisión/versión cuando corresponden, replayed, tres flags false y recovery estático. En errores preparation/replayed son null. No retorna archivos, respuestas owner, token, custodia o texto arbitrario interno.
Se valida incluso isError, porque el [SDK omite su validación de outputSchema para esos resultados](https://ts.sdk.modelcontextprotocol.io/v2/servers/errors). Referencias malformadas, revisión discordante, campos extra, getters, código desconocido o flags que amplíen autoridad se descartan. La conciliación solo puede devolver prepared con replayedtrue: no se presenta una escritura nueva como lectura.
content contiene JSON de ese mismo DTO ya saneado junto a structuredContent, conforme al [patrón del SDK](https://ts.sdk.modelcontextprotocol.io/v2/advanced/schema-libraries). Se acepta el costo de bytes duplicados para conservar interoperabilidad; no demuestra ahorro de tokens.

Tras invocar prepare, una excepción o salida incierta produce unknown_ack sin referencia: conservar la solicitud y consultar reconcile_capsule_preparation. Nunca preparar de nuevo, generar otra clave, reconectar, cobrar o instalar automáticamente. Una conciliación fallida devuelve una lectura no disponible; no se transforma en permiso para escribir.
El borrador preparado todavía requiere revisión y permisos separados de instalación/publicación. Conflictos guían a revisar solicitud; denegaciones a revisar el permiso; dominio pendiente a su flujo de verificación; vencimiento a revisar el borrador. Mensajes estáticos, un siguiente paso y ninguna causa técnica inventada.

## Registro parcial
Los callbacks permanecen inactivos hasta que ambas herramientas se registran. Si falla una, se retiran solo los handles creados por ese intento mediante [RegisteredTool.remove](https://ts.sdk.modelcontextprotocol.io/v2/api/%40modelcontextprotocol/server/server/mcp.html). Aunque la limpieza falle, esos callbacks permanecen cerrados y el error se sanea. No quitar herramientas previas de otros componentes.

## Evidencia y próximo gate
Pruebas en Actions con Client/McpServer/InMemoryTransport2.0.0 reales, puente OAuth real y servicio SQLite real con identidad sintética. No es token criptográfico/humano ni tráfico remoto real. Los tests nativos anteriores siguen comprobando D1/SDK por separado; esa composición no se infiere como aceptación desplegada.
Plan/ledger: docs/superpowers/plans/2026-10-19-afw-capsule-preparation-mcp.md; recibos exactos de revisión/CI/main en PR portadora e issue497.
Faltan el montaje HTTP/MCP real con límite de cuerpo antes del parsing/plazo original de transporte, consentimiento específico/scope registrado, migración/reversión de esquema y rollout propio cerrado. Sin OAuth Worker import, DDL remoto, flags/credenciales/clientes/Max. Rollback de fuente, nunca borrar historia.
G2 aceptado/cerrado, no repetir OTP/grants. Container02382110, avisos/turno útil/baja nativa y PC-off/Max separados. operationalReadiness=false.
