# Prueba ChatGPT: rechazo de configuración y canary cerrado

2026-10-03. AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, canary `delegated-canary.agentfriendlyweb.dev`. Owner confirmó crear el complemento de lectura preparado. No es aceptación de lectura de un expediente real.

Validación local: 717/717 pruebas, lint sin errores (advertencia histórica de imagen) y build aprobado. Fuente `53a3048`. Se abrió únicamente el Worker `agent-friendly-web-delegated-canary`, versión `d798e10e-a8ea-405e-ab05-c7228301e6ee`, creada 16:39:33 UTC, client ID `afw-chatgpt-pilot-20261003`, deadline 17:10 UTC. D1, KV, Access y scopes conservados. Metadata del authorization server y protected resource devolvió 200; `/mcp` devolvió 401 con challenge.

ChatGPT rechazó «Crear como complemento» con un error genérico de opciones de configuración, sin llegar al consentimiento. Segundo ensayo, acotando el formulario a `afw:project:read`, obtuvo el mismo rechazo. No hay complemento creado, código intercambiado ni lectura aceptada. No se atribuye la causa al owner, a Access ni al secreto: este cliente público no usa secreto. La metadata del recurso anuncia únicamente project read mientras el authorization server anuncia ambos scopes; reducir la solicitud no resolvió el rechazo. Los logs de errores de la pestaña no ofrecieron detalle adicional.

La documentación oficial de OpenAI admite clientes OAuth predefinidos con método `none` y PKCE S256: https://developers.openai.com/plugins/build/auth . Esto establece compatibilidad prevista, no aceptación de esta configuración particular. Próximo diagnóstico: detalle de validación del constructor y transporte/discovery, sin ampliar permisos, activar DCR/CIMD ni desproteger MCP para eludir el error.

## Diagnóstico posterior: configuración aceptada

Se reabrió la misma versión con su deadline original para recoger únicamente la respuesta fallida del constructor. HTTP 400, `apps_sdk_error/app_validation`: metadata sin `code_challenge_methods_supported` con S256. La metadata pública sí incluía S256; el formulario conservaba la detección fallida realizada cuando el canary estaba cerrado. «Reintentar la detección» recuperó la metadata y regeneró el callback, que se actualizó en el único registro KV temporal con TTL de 24 horas. No hubo cambios de código ni ampliación de permisos.

Tras restaurar el client ID explícito, ChatGPT aceptó la creación y mostró «Conecta AFW · piloto de lectura» / «Continuar a AFW · piloto de lectura». Esto supersede el rechazo como bloqueo de configuración; aún no acredita consentimiento ni lectura. El alcance actual detectado es únicamente `afw:project:read`. La revocación y el cierre final de esta nueva ventana requieren comprobación propia.

Se restauró la versión cerrada `4775ff39-b406-4f62-8eaa-d4d336a80446` al 100%. Las tres rutas públicas comprobadas después del cierre devuelven 404. El registro temporal KV conserva TTL de 24 horas y no autoriza consultas por sí mismo. Producción no fue objetivo de despliegue y no hubo migraciones.
