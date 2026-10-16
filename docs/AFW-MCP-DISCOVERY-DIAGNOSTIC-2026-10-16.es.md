# Diagnóstico acotado del descubrimiento MCP — 16 octubre 2026

## Problema y alcance
La lectura cloud del expediente sintético respondió 200 y el permiso de avisos quedó registrado. La consulta posterior de catálogo devolvió «no available webhook events». Esto no identifica por sí solo la causa. Actualizar herramientas y consultar en paralelo tampoco acredita una comprobación posterior a la actualización.

El Worker incorpora observación desactivada por defecto: únicamente POST /mcp y POST /oauth/token, revisión de fuente válida, flag explícito y ventana absoluta de hasta diez minutos. Registra etapas fijas, método de una lista cerrada, estado HTTP y catálogo cero/uno. Para MCP registra presencia o ausencia del encabezado Authorization y el flag Events observado al inicio de esa petición; nunca su valor ni la configuración completa. Para /oauth/token usa la etiqueta fija oauth/token, sin leer formulario o respuesta. No inspecciona cuerpo, credenciales, cookies, parámetros de URL ni texto de errores. No cambia permisos, respuestas, suscripciones ni publicaciones.

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

## Frontera nativa: siguiente observación
El rescan real14:43:57Z llegó autenticado a server/discover, tools/list y events/list. El último emitió authority_ready y luego catalog_failed14:43:59.368Z. Primaria confirmó el consentimiento11 vigente y coincidente; la ficha siguió mostrando Read2. No se ejecutó una consulta cloud redundante ni se pidió suscribir. Cierre remoto f2b3ff91 y tails0 nuevamente comprobado14:47:14Z. Evidencia saneada: output/afw-discovery-capture-46ef4362-fca1-4f3d-91d3-ef28707de0ab.ndjson.

authority_ready únicamente construye el broker; no acredita su autorización primaria ni el RPC. La siguiente instrumentación añade etapas fijas broker_authorization_ready/rpc_start/rpc_returned y native_received/policy_ready/successor_ready/custody_ready/runtime_check/runtime_ready/host_ready/authorization_ready/closure_read/closure_ready/returned/failed. Cada etapa nativa mantiene el prefijo native_ y las del broker broker_. El DO emite exclusivamente dentro de su método list interno, con método fijo events/list y la misma fuente/flag/ventana absoluta. Ningún argumento, ID, secreto o texto de excepción se registra.

Los sinks fallan sin alterar resultado/error. La validación estricta del runtime permanece antes del catálogo: instrumentarla no autoriza saltarla ni publicar eventos que el servicio no pueda atender. Faltar ctx.container es una hipótesis local reproducida; todavía no es causa remota demostrada. Otro fallo reproducido es la lectura de cierres. Las tablas necesarias existen remotamente y la app Container está asociada al namespace esperado, pero eso no acredita la forma de ctx ni el éxito de su llamada.

Esta segunda instrumentación sí modifica el Worker y necesita su propia aceptación/publicación cerrada antes de observarla remotamente. No usar una captura con fuente antigua para acreditarla ni repetir planes de publicación consumidos. Hasta esa preparación, conservar el servicio cerrado y no pedir otro ingreso.

## Intercambio OAuth y credencial presentada

El campo D1 exchanged_at se escribe dentro del callback de intercambio, antes de que el proveedor cree y devuelva el token. No demuestra emisión completada ni que ChatGPT guardó o usó esa conexión. La observación de POST /oauth/token usa únicamente método fijo oauth/token y estado de la respuesta final; nunca su contenido. HTTP200 confirma terminación del endpoint, no recepción o uso del token por el asistente.

En POST /mcp, authorization_header_present o authorization_header_absent solo indican que el encabezado existe. No demuestran que contenga un bearer válido ni identifican el permiso. El saneador admite únicamente estas etiquetas fijas; no admite valores, hashes de tokens, argumentos o errores. Ventana, fuente, límites, controles desactivados y cierre explícito de la captura siguen vigentes. Una excepción de inspección no impide ejecutar el handler.

Antes de otro ensayo, conservar el callback hasta que la reconexión haya terminado de forma observable. La marca exchanged_at y un botón que vuelve a habilitarse no sustituyen el resultado del intercambio. Correlacionar estado HTTP del token, conexión del cliente, presentación de Authorization, handler autenticado y catálogo como hechos separados. Una captura sin requests a /oauth/token no permite concluir que faltó emisión si no cubrió esa fase.

Fuentes oficiales: https://developers.openai.com/plugins/build/auth y https://developers.openai.com/plugins/deploy/troubleshooting, consultadas el16oct2026. El contrato exige presentar en MCP el token obtenido; no establece que un registro D1 local confirme adopción de credenciales en el cliente.

## Corrección del contrato y comprobación de la configuración atendida

El ensayo16oct16:11–16:18Z completó la reconexión en ChatGPT y una lectura autenticada real. El diagnóstico publicado en PR456 observaba por error /token, mientras el proveedor instalado y la metadata de AFW anuncian /oauth/token. Por eso la falta de registros oauth/token en esa captura NO permite inferir ausencia de intercambio. La corrección rechaza /token y prueba el endpoint extraído de la metadata real con autorización por código, PKCE, SQLite y KV locales. La identidad de la prueba es sintética; esto no acredita recepción remota del token.

En la misma captura server/discover y tools/list devolvieron200 sin entrar en la fábrica Events. Una consulta posterior tools/call sí mostró authenticated/authority_ready. La metadata de la API declaraba Events habilitado, pero no identifica por sí sola la configuración que atendió aquella petición anterior. No atribuirlo automáticamente a propagación, caché, credenciales o al proveedor.

Las etapas fijas events_enabled y events_not_enabled reflejan únicamente la comparación estricta del flag al comenzar POST /mcp. No acreditan autorización, consentimiento, llegada a la fábrica, disponibilidad del catálogo ni que el flag siga igual durante toda una ejecución. La misma ventana y fuente limitan su emisión; el saneador rechaza cualquier payload adicional. No exponen el objeto env.

Próxima secuencia: preparar y comprobar cierre/recuperación; capturar antes de reconectar; conservar el callback hasta su finalización observable; autorizar avisos propios; comprobar que una lectura posterior a la configuración entra en la fábrica Events antes de pedir una nueva importación del catálogo; confirmar etapas y resultado. No repetir rescan solo porque el botón se habilita. Conectar y actualizar herramientas son operaciones distintas. No ampliar el TTL para esconder retrasos ni repetir una consulta cloud sin petición nueva al servidor. El ensayo sigue sin acreditar una suscripción, entrega útil, baja nativa ni PC-off.
