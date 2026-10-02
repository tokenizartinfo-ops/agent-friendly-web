# Preparación del piloto con un asistente externo

## Continuidad comprobada el 2 de octubre

Consulta oficial actual de [OpenAI](https://developers.openai.com/plugins/build/auth) y fuente instalada `@cloudflare/workers-oauth-provider` 1.2.1: el proveedor publica RFC9207 issuer identification y añade `iss` a respuestas satisfactorias y errores de autorización. Esto permite preparar el modo CIMD estable de ChatGPT, conservando comprobación exacta del issuer y del callback mostrado por la gestión del cliente.

La documentación describe `https://chatgpt.com/oauth/client.json` y `https://chatgpt.com/connector_platform_oauth_redirect` para ese modo. Son candidatos documentados, no configuración ya comprobada de esta conexión. Si no cumple issuer identification, son específicos del callback. Nunca autorizar un prefijo amplio de chatgpt.com ni copiar el callback loopback anterior.

El proveedor soporta CIMD opcional y requiere `global_fetch_strictly_public`; implementa autenticación token endpoint `none` con PKCE. Su negociación admite que el documento de ChatGPT prefiera private_key_jwt si también ofrece none. No declarar soporte de private_key_jwt: el proveedor no lo implementa. La aplicación actual todavía fija `clientIdMetadataDocumentEnabled:false`.

Siguiente implementación concreta: modo separado y deshabilitado por defecto para cliente ChatGPT exacto, sin DCR abierto; rechazar client_id ajeno antes de resolver metadata en authorize/token; verificar HTTPS, redirects exactos y resource; no compartir sujeto/grant del cliente loopback. Pruebas necesarias: callback/issuer distintos, metadata sin none, cliente ajeno, selección de proyecto ajeno, expiración, token cruzado y desconexión con token vigente. Luego comprobar gestión del cliente y pedir consentimiento humano solo para el recurso real acotado. No habilitar issuer discovery en el apex hasta que ese servicio funcione y se compruebe su descubrimiento externo.

A2A también requiere fijar versión de protocolo antes de implementar: la especificación vigente documenta interfaces `protocolVersion`, enumeraciones ProtoJSON y wrappers de respuesta, distintos de ejemplos antiguos con `kind`. No mezclar esquemas 0.3/1.0 al publicar una tarjeta ni declarar compatibilidad por detección de un JSON. [Especificación consultada](https://a2a-protocol.org/latest/specification/).

Estado: preparación, sin nuevo servicio remoto habilitado. La aceptación sintética real está cerrada en [su recibo](AFW-OAUTH-ACCEPTANCE-2026-10-01.es.md). El owner eligió ChatGPT para el primer piloto. No confundir el éxito del cliente loopback con compatibilidad demostrada de ChatGPT.

## Diferencias concretas encontradas

1. El piloto registra un cliente público loopback fijo; su callback local no sirve como callback del asistente externo. Verificar registro admitido y callback exacto del cliente elegido antes de preparar infraestructura.
2. `/authorize` exige `project` en query. El cliente sintético lo añade, pero un cliente MCP general no tiene por qué conocer ese parámetro. AFW debe recuperar proyectos del sujeto Access verificado y permitir elegir uno en consentimiento. La elección queda vinculada al contexto/nonce del servidor, se comprueba otra vez al aprobar y no acepta sujetos declarados por el cliente. Cero proyectos ofrece una salida comprensible; varios requieren elección explícita. Nunca elegir un expediente por orden accidental.
3. El token dura cinco minutos sin renovación y el grant diez minutos. Adecuado para aceptación breve; insuficiente para prometer acompañamiento continuo. El siguiente piloto puede conservar esas duraciones y explicar la reconexión. Renovación persistente sería otro alcance, con rotación, reutilización y retirada comprobadas antes de implementarla.
4. Corrección de fuente: el resumen delegado utiliza `planCopilotNextTurn`, prioriza el objetivo y respeta campos pospuestos. Añade `nextStep` y conserva `nextQuestion` como pregunta o null. Solo lee códigos permitidos de decisiones pospuestas y presencia de CMS/hosting/fuentes; no exporta narrativa, propuestas ni citas privadas. Véase AFW-DELEGATED-NEXT-STEP-2026-10-01.es.md. Integración y pruebas no acreditan una conexión real de ChatGPT ni despliegue OAuth.
5. La pantalla de conexiones conservaba botones para grants retirados y estados en inglés. Corrección local: estados humanos Conectada / Desconectada / Permiso vencido, botón solo para grant vigente y no revocado, explicación de salida y estado vacío. No cambia autorización, scopes ni almacenamiento. No está desplegada por este documento.

## Orden de ejecución

- Integrar la corrección de estados después de tests/lint/build. Conservar el canary cerrado; no reabrirlo para demostrar un cambio de texto.
- Confirmar cliente y comprobar su mecanismo de registro con documentación oficial y, cuando sea necesario, su pantalla de configuración. No solicitar ni mostrar secretos en chat.
- Diseñar consentimiento con selección de proyecto y contexto ligado al servidor; cubrir cambio de propietario, selección ajena, query repetida, nonce vencido/reutilizado y cancelación. El proyecto queda fijado en el grant y las herramientas no admiten selectors de proyecto.
- Alinear el siguiente paso delegado con el acompañamiento existente usando datos expresamente autorizados. No añadir campos privados solo porque están en el esquema.
- Preparar un entorno limitado vinculado a un expediente real únicamente tras acordar sus recursos y alcance; sin copiar datos productivos a canary sintético. Aceptación: conectar → obtener resumen útil y observación con fecha si existe → entender el siguiente paso → desconectar → rechazo con token vigente.
- Publicar metadata/auth.md solo en el recurso efectivamente habilitado y describir compatibilidad comprobada. Puntaje externo y A2A permanecen evidencias/bloques separados.

## Comprobación documental de ChatGPT

Consulta oficial del 2026-10-01: [Authentication – Plugins](https://developers.openai.com/plugins/build/auth). La documentación describe registro CIMD/DCR, PKCE S256, audience `resource`, identificación de issuer y copia del redirect exacto de la página de gestión. AFW actualmente deshabilita CIMD/DCR y permite un solo cliente loopback: esa configuración no acredita conexión ChatGPT. La ruta de registro concreta queda por comprobar para el cliente elegido; no habilitar registro abierto por inferencia ni asumir que el callback es el mismo en todas las cuentas.

La elección del owner puede cambiar el adaptador, pero no el principio: consentimiento legible, proyecto propio, lectura mínima y permiso retirado en cada consulta. La plataforma AFW continúa funcionando sin que el usuario necesite conectar un asistente externo.
