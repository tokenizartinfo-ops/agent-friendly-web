# Evidencia ChatGPT: consentimiento incremental, lectura y retirada aceptados

3 de octubre de 2026. AFW, repo agent-friendly-web, delegated-canary. Source `401f699`, candidato `ac8fb4e6-7fb1-448c-974c-218b246c2f17`, activo al 100% desde 19:14 UTC. Deadline 20:15 UTC / 17:15 Buenos Aires; rollback `4775ff39-b406-4f62-8eaa-d4d336a80446`, conservando D1/KV. Producción no modificada.

Preflight mediante API estructurada compiló consultas de resumen/evidencia: cero filas leídas/escritas y changed_db false. Primera lectura Wrangler obtuvo 7403; SELECT 1 luego pasó; SQL multilinea via shell obtuvo incomplete input. Las mismas consultas exactas pasaron como JSON estructurado. No se aplicaron migraciones.

El permiso de resumen se renovó desde el complemento ya instalado, con sesión Access vigente. Actualizar herramientas falló con la conexión anterior; tras reconectar no volvió a mostrar error. En el chat cloud de aceptación `01a102fe-b990-75b9-9f0d-17bf19cad011`, una llamada read_saved_evidence mostró UI genérica «conexión caducó». Pulsar Reconectar produjo solicitud OAuth con **afw:evidence:read y afw:project:read**, mismo cliente y callback, PKCE S256. Esto acredita solicitud incremental del cliente, no lectura de evidencia ni aceptación de la ampliación.

Consentimiento adicional dejado abierto y confirmado mediante captura local ignorada `output/afw-evidence-consent-20261003.png`. Se solicitó confirmación humana por ampliación del permiso; no se pulsó Permitir lectura para ambos scopes. Tras confirmación: comprobar una observación del origen actual, fecha y score null, desconectar y obtener rechazo antes del vencimiento de token. Si solicitud/ventana vence, iniciar solicitud nueva; no reutilizar código.

## Resultado que supersede el pendiente anterior

Owner confirmó «Sí, pulsa Permitir lectura». Grant de ambos scopes creado 19:21:30.372 UTC e intercambiado 19:21:40.146; duración de token 300 segundos. ChatGPT cloud completó read_saved_evidence y devolvió exactamente una fila synthetic-evidence-current-20261003, target https://example.invalid, checkedAt 2026-10-03T18:47:56.000Z, score null, level SYNTHETIC - not an audit. Excluyó el fixture de otro origen.

Permiso retirado mediante conexiones AFW a 19:23:33.049 UTC. Nueva llamada cloud terminó a 19:24:07 UTC con 403 delegated_access_denied y sin datos, antes del vencimiento del token a 19:26:40.146. También se retiró el permiso previo de resumen a 19:24:01.204. Se restauró versión cerrada al 100%; /mcp y ambas metadata devolvieron 404. Datos sintéticos/KV conservados. Captura local ignorada output/afw-evidence-accepted-20261003.png.

El primer mensaje de seguimiento se encoló durante la espera de autorización; un seguimiento posterior activó la nueva consulta. No atribuir la lectura a la llamada anterior que solicitó permiso. Aceptación sintética completa; no demuestra acceso a un expediente real ni gerente permanente.

Durante el ensayo se detectó que el texto de consentimiento prometía observaciones para el permiso de solo resumen. Corrección local diferencia los dos scopes, probada en flujo OAuth completo; no desplegada en esta ventana. El control de permisos del servidor ya diferenciaba ambos casos.

Corrección validada con suite 720/720, lint sin errores (advertencia histórica de imagen) y build aprobado. Siguiente: preparar un piloto de expediente real con owner y datos revisables, manteniendo los scopes de solo lectura y retirada comprobados; después evaluar publicación de discovery productivo y su auditoría externa. No anunciar OAuth del apex por esta prueba canary.
