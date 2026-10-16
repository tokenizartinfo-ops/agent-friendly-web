# Diagnóstico acotado del descubrimiento MCP — 16 octubre 2026

## Problema y alcance
La lectura cloud del expediente sintético respondió 200 y el permiso de avisos quedó registrado. La consulta posterior de catálogo devolvió «no available webhook events». Esto no identifica por sí solo la causa. Actualizar herramientas y consultar en paralelo tampoco acredita una comprobación posterior a la actualización.

El Worker incorpora observación desactivada por defecto: únicamente POST /mcp, revisión de fuente válida, flag explícito y ventana absoluta de hasta diez minutos. Registra etapas fijas, método de una lista cerrada, estado HTTP y catálogo cero/uno. No inspecciona cuerpo, credenciales, cookies, parámetros de URL ni texto de errores. No cambia permisos, respuestas, suscripciones ni publicaciones.

Variables: AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED, AFW_MCP_DISCOVERY_DIAGNOSTIC_START_AT y AFW_MCP_DISCOVERY_DIAGNOSTIC_EXPIRES_AT (milisegundos decimales). Ausentes o inválidas: silencio. Deriva de configuración, reloj regresivo y vencimiento: no registrar esa observación. No amplían ninguna ventana OAuth.

## Siguiente ensayo, en orden
1. Aceptar fuente y CI; publicar cerrada conservando bindings, historial y recuperación compatible. No reutilizar planes consumidos ni vencidos.
2. Preparar captura limitada a este Worker y a registros afw.mcp_discovery_diagnostic. La captura debe excluir encabezados, cuerpos y excepciones originales; no guardar un tail bruto. Comprobar cobertura antes de interpretar ausencia de registros.
3. Abrir una única ventana sintética con identidad y permisos vigentes. Confirmar lectura y permiso específico de avisos. No crear consumidores ni suscripciones durante el diagnóstico del catálogo.
4. Actualizar herramientas y esperar su terminación observable; solo después consultar el catálogo desde el chat cloud correcto. Guardar horas, fuente y resultado saneado. No atribuir éxito de actualización a un botón que vuelve a habilitarse.
5. Correlacionar etapas por invocación: received/response401 apunta a rechazo HTTP; authenticated/authority_failed a configuración de autoridad; authority_ready/catalog_failed a lectura/autorización/RPC; catalog count0 a catálogo vacío; count1 demuestra que AFW produjo un selector, no que ChatGPT lo aceptó. Un HTTP200 solo no prueba un resultado MCP exitoso.
6. Restaurar y comprobar cierre; preservar evidencia. Si faltan registros sin cobertura demostrada, resultado inconcluso. No repetir OTP ni ampliar permisos para sustituir diagnóstico.

## Límites
El encabezado Mcp-Method es una etiqueta aportada por el cliente, no una prueba del método ejecutado. authenticated se emite solo al entrar en la fábrica de eventos ya autorizada; su ausencia no prueba rechazo OAuth si esa fábrica no se invocó. Esta observación no acredita ejecución de Container, suscripción, aviso útil, retirada nativa ni funcionamiento con PC apagada.

Estado fechado: observador y filtro aceptados en main1b3f0122 y publicados cerrados como f2b3ff91. La captura cerrada produjo received/response404; eso acredita su transporte, sin catálogo autorizado. El ensayo posterior de14:10Z quedó inconcluso porque no se completó la secuencia dentro del tiempo útil. Cierre f2b3ff91 al100% y tails0 comprobados14:18:29Z; ocho flagsfalse y diagnóstico ausente14:19:03Z. No presumir vigencia sin nueva lectura. Detalle en output/afw-integration-closed-preparation-20261016.es.md.

## Proyección local del tail
`node scripts/filter-mcp-discovery-tail.mjs REVISION START_MS END_MS` consume únicamente stdin JSON de Wrangler y emite NDJSON saneado. No abre conexiones ni crea/elimina tails. El supervisor debe detener y eliminar el tail upstream y comprobarlo con la API; la terminación del filtro no acredita cierre remoto.

Al preparar el proceso upstream fijar WRANGLER_WRITE_LOGS=false y WRANGLER_LOG_SANITIZE=true, desactivar métricas y mantener stderr privado (nunca imprimirlo en bruto). La implementación instalada de Wrangler permite desactivar archivos mediante WRANGLER_WRITE_LOGS; no basta con filtrar stdout. No guardar un archivo intermedio ni usar Tee-Object. Antes de usar el transporte comprobar su versión/formato y que el stdout sea JSON: cualquier banner o JSON incompleto hace fallar cerrado el filtro.

Filtro local: servicio fijo delegated-canary, fuente exacta, ventana <=10 minutos, un MiB total, 256 KiB por frame, cien invocaciones, hasta cien entradas por frame. Descarta registros con campos extra/valores fuera de contrato. El número de invocación es local a esta captura, no un identificador global ni prueba de identidad. Cualquier límite o truncamiento vuelve inconclusa la cobertura. No guarda headers, URL, excepciones o mensajes ajenos.

## Supervisor local de la captura
`node scripts/capture-mcp-discovery-tail.mjs REVISION START_MS END_MS` usa exclusivamente Wrangler instalado y el canary fijo. Controla directamente wrangler-dist/cli.js: el lanzador bin/wrangler.js crea otro proceso, por lo que detener solo ese lanzador en Windows puede dejar vivo a su hijo. Valida la ventana antes de crear el proceso y termina por el vencimiento absoluto, sin el temporizador anterior de180s. Crea mediante wx un archivo nuevo output/afw-discovery-capture-UUID.ndjson. Cada registro pasa por el filtro existente antes de escribirse; stderr se descarta. El archivo nunca contiene un frame original.

El último registro distingue eof, deadline, cancelled, child_error, spawn_error o invalid_stream, indica recordCount y streamValid, y conserva remoteClosureVerified:false. streamValid únicamente describe la integridad del flujo recibido: cero registros no acredita disponibilidad, ausencia de peticiones o cobertura. Un fallo de escritura emite error genérico. La CLI devuelve2 cuando la captura acaba por plazo/cancelación/fallo, incluso si los registros previos resultan útiles. No reejecutar para convertir ese código en éxito.

Antes de ejecutar, comprobar inventario de tails y cierre recuperable. Después, consultar y eliminar únicamente el tail propio mediante API y confirmar el inventario; detener Wrangler en Windows no lo eliminó en la prueba real. El supervisor no instala cron, renueva permisos, activa flags ni prueba disponibilidad cloud.

REVISION corresponde a la fuente real del Worker observado, no necesariamente al HEAD del supervisor local. Estos cambios de captura no modifican el código del Worker ni requieren republicarlo: conservar la fuente remota aceptada1b3f0122 hasta que exista otro cambio de runtime justificado.

## Coordinación de la próxima ventana
Receptor cloud: chat Comprobación AFW limitada,6acce402-29c8-83e9-929c-1224be576f8d. Su declaración de capacidad16oct14:19Z permite intentar una consulta al recibir una instrucción posterior; no es un scheduler. El mensaje exacto debe incluir connector_type asdk_app_6ac1319df2c48191b8229374f1c31386, vencimiento vigente y prohibición de suscribir.

Presupuesto efectivo: mínimo del servicio, token, consentimiento y captura. El token actual dura como máximo300s. Localizar primero la UI de actualización y verificar control; iniciar la captura antes de actualizar. Tras la autorización, resolver el grant y configurar el catálogo sin trabajo de implementación intermedio. Esperar evidencia observable de importación, comprobar evento en ficha y solo después enviar discovery. Registrar tiempos saneados. Si falta margen para hacerlo, cerrar; no ampliar TTL ni pedir otro código para ocultar el problema.

Contrato consultado16oct: [OpenAI MCP Events](https://developers.openai.com/plugins/build/mcp-events), sección Test in ChatGPT. Exige observar server/discover/events/list y eventos en la ficha, rescan cuando cambian las definiciones y comprobar la secuencia completa de alta/entrega/respuesta/baja. La lectura funcional no acredita esa secuencia.
