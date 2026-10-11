# Firma acotada de mensajes MCP Events

Objetivo: permitir que el futuro receptor verifique origen e integridad de metadata de expediente y del desafío de verificación, sin ampliar acceso. Fuente aceptada: contrato PR392; prueba descartable Node en Containers demuestra viabilidad TLS, no servicio.

Elección: módulo Node puro, sin I/O, usando crypto nativo y formato Standard Webhooks documentado. Una dependencia completa añade superficie innecesaria para este formato HMAC-SHA256; incorporar firma en el Worker público mezclaría permisos y eventos antes de resolver lifecycle. La implementación es privada y sin montaje.

API: signDossierMcpEvent(signal, authorizedProjectRef, subscriptionId, secret, signedAtMs) llama al contrato existente; signMcpVerification(challenge, verificationId, subscriptionId, secret, signedAtMs) produce solo type/challenge. Ambas devuelven body string serializado UNA vez y headers independientes congelados. HMAC sobre id.timestamp.body exactos UTF-8. whsec_ seguido por base64 estándar canónico que decodifica 24–64 bytes. Timestamp entero seguro no negativo en milisegundos, convertido a segundos. IDs 1–128 caracteres alfanuméricos, guion o guion bajo. Desafío base64url canónico de 32 bytes; el host debe generarlo con CSPRNG y gastar su presupuesto persistente.

matchesMcpVerificationReply(challenge, status, body) exige HTTP 2xx, JSON con una única propiedad propia challenge de tipo string y desafío exacto usando timingSafeEqual. Body UTF-8 máximo 1024 bytes. Mensajes máximo 262144 bytes. Errores estáticos sin secreto, URL ni contenido. No invocar coerción de argumentos inesperados.

Fuera de alcance: autenticación, expiración, custodia, frescura o uso único del desafío, comprobación del origen del signal, consentimiento, permisos persistentes, DNS/SSRF/TLS del callback, envío/reintentos, activación de suscripción, receptor real, scheduler y PC-off. authorizedProjectRef es un dato validado por el futuro host, no autoridad conferida por el helper. Un 2xx no demuestra revisión. Sin endpoints/capabilities cambios.

Pruebas: vector HMAC independiente con clave sintética; firma del cuerpo exacto vs alteración; secreto malformado y límites; rechazo sin coerción; originales no mutables; desafío correcto, HTTP no 2xx, extra keys, duplicados JSON y respuesta grande. Ejecución inline autorizada por el owner; revisión independiente única al cierre.
