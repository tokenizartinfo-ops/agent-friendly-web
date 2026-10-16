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

Estado: implementación local; despliegue y diagnóstico remoto pendientes. El último cierre remoto conocido es bbea484a, comprobado el 16 de octubre a las 13:23:57Z; no se presume vigente sin nueva lectura.
