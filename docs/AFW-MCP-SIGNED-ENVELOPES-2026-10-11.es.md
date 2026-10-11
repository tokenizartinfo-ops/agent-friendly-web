# Firma de notificaciones: preparación privada

El módulo Node lib/mcp-signed-envelope.mjs prepara mensajes compatibles con la firma HMAC-SHA256 de [Standard Webhooks](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md), requerida por [MCP Events de ChatGPT](https://developers.openai.com/plugins/build/mcp-events). Una firma liga ID, fecha de firma y cuerpo UTF-8 exacto. El transporte futuro debe enviar el body devuelto sin volver a serializarlo.

El evento usa el contrato de PR392: identidad y fecha originales, metadata mínima del proyecto autorizado. No incluye texto, email, URL, instrucciones ni contenido del expediente. El desafío de verificación usa 32 bytes base64url canónico y un ID propio; la respuesta exige 2xx y un único challenge idéntico mediante timingSafeEqual, con límite 1024 bytes. El parser acepta JSON ASCII con espacios; rechaza claves/valores escapados, duplicados y extras de forma conservadora.

Las claves whsec_ deben decodificar 24–64 bytes con base64 estándar canónico. Solo se usan en memoria: no se devuelven ni se registran; la copia temporal de bytes se limpia al firmar, sin prometer borrado del string original ni de copias internas de crypto. Errores estáticos. Resultados congelados. No se acepta timestamp implícito ni coerción de objetos.

Este helper no autentica al propietario, confirma la fuente, concede acceso, custodia claves, aplica TTL, impide reuso, resuelve DNS ni envía. El host deberá comprobar permiso vigente y revocación, guardar presupuesto persistente antes de iniciar cada intento, generar y gastar desafío, cifrar secreto y ejecutar HTTPS con destino público fijado/TLS/redirecciones bloqueadas. No hay cambio de endpoints, capabilities, suscripciones ni despliegue.

Pruebas locales con claves sintéticas y vector Python independiente. La prueba descartable anterior de Cloudflare Containers confirmó TLS hacia una IP pública y el rechazo de hostname incorrecto; no demuestra este módulo montado, callback real ni revisión cloud. Un ACK HTTP de recepción nunca se presenta como una tarea terminada. PC-off y el piloto de Max siguen sujetos a las aceptaciones restantes.
