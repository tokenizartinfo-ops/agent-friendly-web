# ChatGPT: lectura sintética y revocación aceptadas

Fecha: 2026-10-03. Proyecto AFW; repo `tokenizartinfo-ops/agent-friendly-web`; entorno `delegated-canary`; origen `https://delegated-canary.agentfriendlyweb.dev`. Complemento «AFW · piloto de lectura», cliente público `afw-chatgpt-pilot-20261003`, scope único `afw:project:read`.

## Incidentes y corrección

La ventana anterior venció a las 17:10 UTC (14:10 Buenos Aires). El owner retomó pasado ese plazo: el rechazo inicial no acredita un fallo de identidad. Se abrió una nueva ventana hasta 18:45 UTC, versión `a095888e-cf25-4587-b4d7-5dc24312fd4e`, mismo cliente, Access y scopes. La sesión humana vigente permitió llegar al consentimiento sin otro OTP.

El POST de consentimiento devolvió 503 con Origin correcto. D1 mostraba una sesión no consumida y cero grants. Inspección del esquema confirmó que el canary tenía el fixture antiguo: faltaban cms, hosting, content_sources_json y copilot_working_drafts, necesarios por la consulta actual de getOwnedProject. El GET listaba proyectos con una consulta distinta y por eso no detectaba esta incompatibilidad.

Se aplicó únicamente en D1 canary `6a728254-1494-4039-802e-b39288a55fcc` una extensión aditiva: cms y hosting TEXT NOT NULL DEFAULT '', content_sources_json TEXT NOT NULL DEFAULT '[]', y tabla copilot_working_drafts con project_id TEXT PRIMARY KEY, user_id TEXT NOT NULL, session_json TEXT NOT NULL DEFAULT '{}'. Sin DROP ni modificación de hechos del proyecto. Producción no fue objetivo de mutación. El rollback es cerrar/restaurar código y conservar estas estructuras, no eliminarlas. El fixture local vigente ya incluye estas dependencias.

Tras la corrección, el mismo consentimiento pendiente se completó. ChatGPT mostró la cuenta conectada. D1 primario confirma un grant, un intercambio a `2026-10-03T18:18:37.034Z` y una revocación a `2026-10-03T18:21:01.676Z`.

## Aceptación real desde ChatGPT cloud

Chat `01a102fe-b990-75b9-9f0d-17bf19cad011`, host durable, entorno AFW Operations, GPT-6.1 Sol Bajo. Se seleccionó AFW Operations antes de enviar; no se usó el entorno Tokenizart que aparecía por defecto. Instrucción limitada al complemento, sin terminal, archivos, correo, repositorios u otros recursos.

Primera llamada real `afw_piloto_de_lectura.read_project_summary`, completada: proyecto `oauth-canary-owner`, organización «AFW prueba sintetica de lectura», estado draft. El permiso se retiró desde la interfaz de AFW. La segunda llamada, sin nueva autorización, devolvió 403 y `delegated_access_denied`, sin datos. Resultado observado a las 18:21:36 UTC, antes de los 300 segundos de vigencia del token desde el intercambio. Esto distingue revocación de simple vencimiento.

No se comprobó read_saved_evidence: el permiso actual solo incluye project read. No se consultó un expediente real, no se publicó OAuth en el apex y no se acredita una mejora numérica de auditor externo por este piloto.

## Cierre y continuidad

Se restauró `4775ff39-b406-4f62-8eaa-d4d336a80446` al 100%. `/mcp`, `/.well-known/oauth-authorization-server` y `/.well-known/oauth-protected-resource/mcp` devolvieron 404 después del cierre. D1 y KV conservados; grant revocado. El complemento instalado es de prueba y el servicio está cerrado.

Próxima ventana: verificar esquema contra las consultas efectivamente desplegadas antes de abrir el consentimiento; no basta GET de metadata o listar proyectos. Preparar una comprobación SQL de las columnas y JOIN de getOwnedProject sin leer datos owner. Renovar desde ChatGPT si la solicitud o ventana venció, sin reutilizar códigos. Un piloto de expediente real requiere aceptación y alcance propios; no ampliar scopes por inferencia.
