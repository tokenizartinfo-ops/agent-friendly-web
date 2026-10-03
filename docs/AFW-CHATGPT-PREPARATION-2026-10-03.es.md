# ChatGPT: cliente de lectura preparado, conexión pendiente

Fecha: 2026-10-03. Proyecto AFW; repositorio `tokenizartinfo-ops/agent-friendly-web`; entorno `delegated-canary`; origen `https://delegated-canary.agentfriendlyweb.dev`.

## Evidencia de preparación

La interfaz actual de ChatGPT permite crear un MCP personalizado con cliente OAuth definido por el usuario, autenticación del endpoint de token `none`, callback HTTPS propio y scopes explícitos. El formulario «AFW · piloto de lectura» quedó preparado con los endpoints `/mcp`, `/authorize` y `/oauth/token` del canary, sin secreto, sin OIDC y sin scopes de escritura.

Se prerregistró únicamente `afw-chatgpt-pilot-20261003` en OAUTH_KV del canary (`6b94ff702e504e14a7730cee73a0f6ff`), clave `client:afw-chatgpt-pilot-20261003`, con TTL de 86400 segundos. El registro contiene el callback exacto obtenido de ese formulario, `authorization_code`, response type `code` y método `none`. Lectura posterior confirmó el client ID, el callback y el método. No se publica el identificador individual del callback en este recibo.

El Worker continúa cerrado: versión `4775ff39-b406-4f62-8eaa-d4d336a80446`, flag false. La configuración aún fija el cliente local anterior y su ventana vencida; prerregistrar el nuevo cliente no habilita consultas. No hubo creación del complemento, consentimiento, intercambio de código ni lectura desde ChatGPT. No se modificaron Access, D1, producción ni otros clientes.

## Aceptación y cierre

1. Confirmar creación de la conexión en la interfaz de ChatGPT y conservar el callback exacto. Si el formulario genera otro callback, actualizar solamente este registro temporal antes de continuar.
2. Tras validación y declaración del alcance, abrir una ventana acotada del mismo canary con el nuevo client ID y deadline absoluto. Conservar identidad Access, PKCE S256, resource exacto y scopes `afw:project:read` / `afw:evidence:read`.
3. El owner autoriza únicamente el proyecto sintético `oauth-canary-owner`. Comprobar listado de herramientas, resumen propio y evidencia guardada; una colección vacía no acredita observaciones reales.
4. Desconectar desde AFW y comprobar rechazo de una nueva lectura mientras el token siga vigente. Separar revocación de vencimiento.
5. Restaurar la versión cerrada; comprobar endpoints cerrados y conservar D1/KV. El nuevo registro expira automáticamente por TTL. No anunciar OAuth en el apex ni habilitar un expediente real por esta preparación.

La suite y el despliegue de una nueva ventana requieren su propio recibo. La autorización general para avanzar no sustituye la confirmación puntual de acceso delegado exigida por el control del navegador.
