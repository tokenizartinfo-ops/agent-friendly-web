# Piloto real de lectura: servicio separado cerrado

## Evidencia observada el 3 de octubre de 2026

Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web. Fuente e872dd4, derivada de main ed4fdfb. Worker nuevo agent-friendly-web-delegated-real-pilot; origen https://delegated-pilot.agentfriendlyweb.dev. Despliegue 2026-10-03T19:57:43.454307Z, versión 4db09f45-c082-44b1-ab6f-d019467c9178 al 100%, comprobado por API después de publicar.

Configuración real: `wrangler.delegated-real-pilot.jsonc`. Flag false y plazo vencido: este recibo no habilita lectura ni acredita una conexión real desde ChatGPT. El cliente propuesto aún requiere callback obtenido del formulario actual y registro separado.

## Recursos comprobados

- Cuenta 85d0d5dadac3341a564f22ce885e9eec y zona activa agentfriendlyweb.dev, ID 4b1a3fe4b6dcb81e9d6a633174c5939f.
- KV separado 8dc247fd525e42559faa373576caa8a6; namespace agent-friendly-web-delegated-real-pilot.
- D1 existente productivo d26fc9d2-df5a-4957-8e58-cc4c945faad8. Sin migraciones ni cambios de datos durante esta preparación.
- Access nuevo 9afd6548-9d7f-4668-a8fe-ade6a4caaec2; audiencia 302f143430669dfebe856f068fa8776affa1ca7eae5bf43c9451368b30ae3f46. Protege authorize y connections, una política allow exclusiva de la identidad owner del piloto. No política bypass.
- Rate limiter separado 88232, 30 solicitudes/60 segundos.
- Dominio Worker 864e0b77aea397fb07f15e1f0925c8514d2e5f6c, asignado al Worker nuevo, previews deshabilitados.
- Pin servidor: project-06a83cc2e8cc9a4f38e854c60b265ac8d2fee6bd358633e49a6088f3ed172f82. Es el borrador propio creado desde la interfaz; no un caso de cliente ni un expediente QA renombrado.

Consulta administrativa acotada encontró una identidad Access exacta para el owner y comprobó internamente coincidencia de su ID con user_id del proyecto. Solo se devolvieron booleanos: no se persistieron subjects, JWT ni cookies. La consulta D1 escribió cero filas, changed_db false. Esta correlación administrativa no sustituye validar el JWT de la sesión en la nueva audiencia al consentir.

## Comprobaciones y reversión

721/721 pruebas; lint sin errores con una advertencia histórica de imagen; build y dry-run Wrangler aprobados. Bindings de la versión activa coinciden con esta configuración. Consultas anónimas posteriores: MCP y los dos metadatos OAuth devuelven 404; authorize y connections redirigen 302 a Access. No grant ni cliente real registrado por este despliegue.

Rollback de cualquier futura ventana: restaurar 4db09f45-c082-44b1-ab6f-d019467c9178 al 100% y comprobar cierre. Conservar D1, KV y registros; no DROP ni borrado histórico. Si se retira por completo este servicio, retirar solo su nuevo dominio y Access después de revocar permisos vigentes. Web principal, A2A y canary sintético no se publicaron en este bloque.

## Siguiente aceptación

Obtener callback del constructor actual ChatGPT, registrar cliente público separado none/PKCE S256, abrir ventana acotada con cierre preparado, validar sesión owner y consentimiento específico. Leer resumen del borrador real y próxima pregunta sin completar datos por inferencia; revocar y comprobar rechazo con token todavía vigente. Cerrar otra vez. No anunciar OAuth productivo en el apex ni atribuir aumento de puntaje externo a la infraestructura cerrada.

## Preparación posterior del constructor

Cliente separado afw-chatgpt-real-pilot-20261003 registrado en el nuevo KV con TTL 86400 segundos, sin secreto, grant authorization_code y response code. El constructor inicialmente mostró callback temporal; tras reintentar detección contra metadata disponible mostró https://chatgpt.com/connector_platform_oauth_redirect. Se actualizó el registro a únicamente ese callback y se verificó su contenido. No se reutilizó cliente canary.

Ventana candidata 89193ca7-124c-4cf7-8a7d-3676d40f7f6e, fuente e872dd4, desplegada al 100% el 3 de octubre para preparar consentimiento. Flag true con plazo absoluto 2026-10-03T20:25:00.000Z, pin y recursos anteriores. Durante la ventana metadatos 200 y MCP anónimo 401. El plazo cierra el servicio por código aunque no se restaure antes la versión cerrada. Esto no acredita consentimiento, lectura real ni retirada; registrar desenlace antes de afirmar aceptación.

Constructor ChatGPT detectó OAuth, scope inicial únicamente afw:project:read y callback definitivo. Creación del complemento «AFW · expediente propio» alcanzó el flujo de conexión y redirigió al ingreso Access nuevo. Se solicitó código a la identidad autorizada; pantalla de verificación quedó entregada al owner. No se introdujo OTP ni se pulsó consentimiento. El nombre Tokenizart del login corresponde al contenedor administrativo compartido, no al destino del piloto: hostname y audiencia verificados son exclusivos de AFW. Pendiente sesión real y consentimiento, no repetir creación del complemento ni reutilizar código antiguo.
