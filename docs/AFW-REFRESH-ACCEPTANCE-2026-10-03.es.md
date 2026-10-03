# Renovación acotada: aceptación sintética y preparación real

Fecha: 2026-10-03. Horas UTC. Fuente de runtime: 8fdd8cf0ecabea0eae01b311f9161c07c3581806 (PR195); CI730/730. Este registro reemplaza los pendientes sintéticos de AFW-REFRESH-CLOSED-RELEASE-2026-10-03.es.md, conservando ese documento como evidencia fechada.

## Recorrido observado en ChatGPT cloud

Cliente sintético existente, mismo callback, dos alcances de lectura y consentimiento de diez minutos. Ventana canary versión a62d156f-c0b2-4636-9a0b-5ae6cf9846e6 desde21:38:26.514129Z, cierre máximo21:56:40Z. No se creó otro conector ni se incluyeron datos de clientes.

- Consentimiento creado21:40:27.312Z, intercambio21:40:35.024Z, vencimiento original21:50:27.312Z.
- Primera consulta cloud completada21:41:40Z: read_project_summary200. Último token previo observado vencía21:46:30Z.
- Nueva consulta iniciada21:47:00Z, después de vencer todos los tokens previos observados; completada21:47:17Z con read_project_summary200. Sin nuevo consentimiento. Token renovado creado21:47:08Z y vence21:50:26Z; tres credenciales consumidas por hash. El vencimiento original y exchanged_at del permiso permanecieron iguales.
- Desconexión humana en AFW21:47:59.261Z. D1: seis permisos históricos, ninguno sin retirar; dos proyectos sintéticos conservados.
- Consulta siguiente iniciada21:48:17Z: ChatGPT pidió reautenticación. Se eligió «Ahora no», sin reconectar. Terminó21:53:01Z con UNAUTHORIZED, detail Reauthentication required, reason oauth_token_invalid_grant; no devolvió datos.

La última denegación ocurrió en el cliente antes del MCP. No acredita un403 del MCP ni una hora exacta del rechazo del servidor: la espera del diálogo atravesó el vencimiento del token. La renovación real está demostrada por la lectura posterior al vencimiento previo, el nuevo token y los hashes D1. Las pruebas locales de MCP con token renovado retirado y la anterior aceptación real sin refresh siguen siendo evidencias separadas.

Canary restaurado cerrado21:54:23.78592Z a7375e5e6-acda-44d4-a53c-55de7b74ffa1 al100%; API confirmó flagsfalse y MCP/ambas metadata404. No quedaron permisos activos. No inferir acceso permanente, puntuación externa o aceptación del expediente real con refresh.

## Migración del piloto real cerrado

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT production D1 compartida por la web AFW y el piloto cerrado; ORIGIN https://delegated-pilot.agentfriendlyweb.dev; RESOURCE_TYPE D1; RESOURCE_ID d26fc9d2-df5a-4957-8e58-cc4c945faad8; ALLOWED_ACTION únicamente migración aditiva0014_bizarre_excalibur.sql. ROLLBACK mantener OAuth/refreshfalse y Worker cerrado9421a851-926b-4b0e-b47e-091e909e6e1e; conservar tabla e historia, sinDROP.

Preflight: journal hasta0013, tabla ausente y una sola migración pendiente. Wrangler4.128 aplicó0014 por el flujo establecido --remote --env production. Verificación posterior: tabla e índice presentes, journal0014, cinco proyectos y un permiso histórico retirado conservados, cero permisos sin retirar, cero usos de refresh. Solo se consultaron esquema y conteos, sin leer datos de expedientes. La migración no habilita el piloto ni publica OAuth en apex.

## Aceptación del resumen real propio

Cliente existente afw-chatgpt-real-pilot-20261003, callback ChatGPT conservado, none/PKCE, registro con authorization_code y refresh_token. Ventana086b478b-6268-4db8-9cc2-ae0faefa328e al100% desde22:07:02.838071Z, cierre máximo22:26:13Z. Pin del expediente propio, KV/Access/rate limiter separados; misma D1 productiva verificada. Fuente PR195 sin modificaciones durante el ensayo.

- Consentimiento creado22:08:15.919Z, intercambio22:08:23.874Z, vencimiento original22:18:15.919Z. Único scope afw:project:read.
- Primera lectura cloud22:08:42–22:08:58Z, read_project_summary200. Resumen real borrador/revisión1/carga17%, una próxima pregunta. No auditoría, modificación ni publicación.
- Los tres tokens previos observados vencieron como máximo22:13:50Z. Nueva consulta iniciada22:14:12Z, completada22:14:28Z con200, sin nuevo consentimiento. Token nuevo creado22:14:19Z, vence22:18:15Z; tres hashes consumidos D1. Original expires_at/exchanged_at conservados.
- Desconexión en AFW22:14:48.159Z. Dos permisos históricos retirados, cero activos; cinco proyectos conservados.
- Llamada posterior22:15:07–22:15:48Z: diálogo de reautenticación; se eligió Ahora no, sin reconectar. Resultado UNAUTHORIZED/oauth_token_invalid_grant, cero datos nuevos. Todo ocurrió antes del vencimiento original y del token renovado; denegación de cliente previa al MCP, no un403 observado.
- Restaurado cerrado9421a851-926b-4b0e-b47e-091e909e6e1e al100%22:16:03.037157Z. API confirmó flagsfalse y los tres endpoints MCP/metadata404. No quedaron permisos activos; datos e historia conservados.

Aceptación de renovación acotada sintética y del resumen propio completadas. No acredita evidencia privada real, duración comercial, gerente permanente ni mejora numérica externa. Captura local ignorada: output/afw-real-refresh-revoked-20261003.png. No guardar códigos, tokens, subjects ni claves.

## Siguiente bloque

Resolver selección mínima de scopes en el consentimiento, recuperación conversacional y contrato de servicio comercial antes de discovery público. Conservar los recibos humanos anteriores y no repetirlos sin cambios relevantes. Si Access solicita OTP en un ciclo necesario, lo ingresa el owner en el navegador, nunca en chat. No completar objetivos desconocidos por inferencia.

## Fricción concreta de permisos detectada

Al reconectar, ChatGPT pidió ambos scopes publicados aunque el piloto real era solo resumen. Antes de aceptar se redujo el scope de la solicitud a afw:project:read manteniendo el callback y PKCE del flujo iniciado. La pantalla confirmó solo resumen y D1 guardó únicamente ese scope. No se aprobó evidencia real. Esta corrección manual es una limitación de experiencia: el siguiente bloque debe permitir elegir el alcance mínimo en el consentimiento de AFW, sin editar URL, y pedir evidencia expresamente al usarla. No inferir el permiso concedido desde el scope solicitado o el indicador de cuenta conectada.
