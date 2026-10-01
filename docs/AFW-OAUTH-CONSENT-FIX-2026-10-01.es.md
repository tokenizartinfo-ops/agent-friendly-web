# Corrección de formulario OAuth

El owner llegó al consentimiento del canary y pulsó Permitir lectura; recibió el mensaje genérico de conexión fallida. Lectura acotada posterior de D1 del canary: un consentimiento no consumido, cero grants. No se emitió un permiso por ese intento. No se inspeccionaron cookies/tokens del navegador.

La página respondía `Referrer-Policy: no-referrer` y el servidor exige `Origin` igual al issuer para los POST humanos. Según [Fetch, append a request Origin header](https://fetch.spec.whatwg.org/#append-a-request-origin-header), un POST de navegación sin CORS bajo esa política serializa Origin como `null`. Las pruebas Node anteriores establecían Origin explícitamente y no detectaron el conflicto de navegador. El header del POST real no fue capturado; es la causa reproducible del contrato encontrada, y la nueva aceptación deberá confirmar el resultado en Chrome.

Corrección: política `same-origin` en las páginas del Worker. Conserva Origin para el formulario propio y no envía referrer fuera del origen. Se mantienen rechazo de Origin ausente/null/ajeno, identidad Access, cookie vinculada, nonce único, propiedad del proyecto y scopes. No se relaja CSRF ni se crean grants por inferencia. Callback local sin formularios conserva `no-referrer`.

Prueba de contrato observada fallar con el header anterior y pasar después; assertions de consentimiento y conexiones, más rechazo explícito de Origin:null. Solo canary AFW, sin modificación de producción. El primer cliente local venció sin canje; hay que reiniciarlo después de desplegar para generar enlace nuevo, manteniendo la sesión Chrome del owner. No acreditar consentimiento/lectura hasta observar callback y MCP reales.

Corrección intermedia `f897439`: CI 36863495697 aprobado, desplegada solo en canary como versión `e82b0ef8-26d6-4077-b420-1fe2c4fd5fc5`; siete probes aprobados. No se pidió otro consentimiento antes de revisar el retorno.

La revisión del flujo encontró además un bloqueo previsible posterior: Chrome puede aplicar CSP `form-action 'self'` a la cadena de redirección, impidiendo volver al callback registrado después de aprobar. [MDN, form-action](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/form-action). No explica el primer error sin grants: se corrige preventivamente antes del nuevo intento.

Solo la página de consentimiento permite `form-action 'self'` más el origen canónico del callback ya validado por el proveedor y registrado para el cliente permitido. No se toma de un campo de formulario, no se permite wildcard ni caracteres de inyección CSP, y conexiones conserva únicamente self. Primera prueba limitada a callbacks HTTP(S) de cliente browser/loopback; callbacks nativos con esquema propio quedan fuera de este piloto. Prueba de contrato observada fallar y pasar; control de redirect exacto y rechazo de origen ajeno permanecen.
