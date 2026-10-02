# Salida de correo AFW: contrato previo al envío

Estado: implementación local, sin consumidor remoto ni envío activado.

Prueba integrada de custodia/decisión/outbox/recibo con SQLite real y proveedor sintético añadida. Corrige una ventana de revocación: el consumidor vuelve a consultar la decisión después de reservar el intento y antes de invocar al proveedor. Si está retirada, cancela ese intento sin enviar. No puede retirar un correo ya aceptado ni ofrecer atomicidad entre D1 y el proveedor; la revocación posterior a la última comprobación sigue limitada por el comienzo del efecto externo. Excepciones de comprobación/almacenamiento después de reservar mantienen el bloqueo de reintentos.

Validación de custodia 2026-10-02: tres pruebas específicas; suite completa 674/674, lint global y focal sin errores, build aprobado. Persiste la advertencia previa de imagen en portada. No prueba D1 remoto, conexión cloud ni correo real.

Custodia local añadida en `lib/mail-custody.mjs`: contenido privado inmutable por clave y decisiones ligadas a respuesta/hash/actor opaco, con vencimiento máximo de 24 horas y revocación persistida. El actor debe ser resuelto y autorizado por el servidor antes de crear la decisión; una referencia no prueba identidad. Recibos privados inmutables por intento devuelven referencias opacas, sin exponer Message-ID. Retención/borrado del contenido privado, integración autenticada y conexión cloud aún no están implementados. Estas tablas pertenecen exclusivamente a la futura base privada de correo, nunca al ledger de salud ni al expediente del cliente.

Validación del consumidor: cinco pruebas adicionales, suite 671/671, lint sin errores con la misma advertencia de portada y build completo. Proveedor y custodia sintéticos; metadatos sobre SQLite real. PR #161 reúne almacenamiento y consumidor interno, sin recursos remotos activados.

Consumidor interno añadido: `lib/mail-consumer.mjs` recupera contenido custodiado, comprueba hash completo (incluye destinatario y remitente fijo), pide autorización a una función de servidor y reclama un único intento. Usa el contrato `email.send({from,to,subject,text})` del binding Workers. Cualquier excepción posterior a reclamar deja resultado incierto o `sending` si falla el almacenamiento; nunca reenvía. Un recibo se guarda mediante `saveReceipt` antes de registrar aceptación. Los callbacks de custodia/autorización aún deben implementarse en un runtime privado: este módulo no equivale a autenticación desplegada.

La espera del proveedor está limitada a 15 segundos por defecto, configurable exclusivamente por código de servidor entre 10 ms y 30 segundos. El vencimiento no cancela la aceptación del proveedor ni habilita un nuevo intento; un resultado tardío no cambia el resultado incierto. Esta cota cubre al proveedor; la custodia posterior debe contar con su propia política de plazo en el integrador.

Contrato del integrador: `loadMessage(key)` entrega solo `to`, `subject`, `text`; `authorize({key,decisionRef,contentHash,recipient})` valida por servidor decisión vigente, actor y destinatario y devuelve exactamente `true`; `saveReceipt({key,attemptId,messageId})` custodia el recibo y devuelve referencia opaca. Nunca permitir que el modelo proporcione esas funciones, autorizaciones booleanas ni destinatarios fuera de la respuesta aprobada. No habilitar un endpoint hasta implementar ese integrador y su identidad, revocación y prueba real.

Referencia técnica comprobada: [Email Sending en Workers](https://developers.cloudflare.com/email-service/get-started/send-emails/). La muestra oficial devuelve `messageId`; la prueba local usa un proveedor sintético, sin binding remoto ni envío.

Validación 2026-10-01: siete pruebas específicas con SQLite real; suite completa 666/666; lint sin errores (advertencia existente `no-img-element` en la portada); build completo y `git diff --check` limpio. SQLite experimental y advertencias de clasificación/timing de vinext no impidieron los comandos. Estas pruebas no acreditan D1 remoto ni correo enviado.

El seguimiento cloud puede preparar respuestas; la continuidad del chat no basta para ejecutar efectos externos. Un registro separado conserva una referencia opaca al mensaje entrante, el hash de la respuesta aprobada y el resultado del único intento. No guarda cuerpo, destinatario, credenciales ni datos de expediente en el ledger de salud.

Estados: `draft` → `approved` → `sending` → `accepted` o `uncertain`. `cancelled` es terminal antes del intento. Solo una transición SQL condicional puede reclamar un envío. Un proceso que desaparece durante `sending` no permite otro intento: se concilia manualmente. `accepted` significa aceptación del proveedor, nunca entrega en la bandeja.

La aprobación se liga al hash exacto y a una referencia de decisión opaca creada por un servidor autenticado. El módulo de almacenamiento no autentica ni autoriza a personas: no se expone como herramienta hasta contar con un consumidor que compruebe identidad, propósito, alcance y respuesta aprobada. Un contenido distinto con la misma clave se rechaza; requiere nueva revisión, no sobrescritura.

Todas las referencias son identificadores opacos de hasta 128 caracteres alfanuméricos, guion o guion bajo. `providerRef` apunta al recibo custodiado: no acepta el Message-ID SMTP literal con dirección/dominio. El adaptador posterior debe custodiar ese recibo y su relación con el hash; todavía no existe aquí. Relojes anteriores a la última transición no pueden modificarla. El consumidor debe verificar nuevamente el hash del contenido recuperado antes de llamar al proveedor; un hash almacenado no demuestra por sí solo custodia ni autorización.

Preferencia: consumidor AFW con binding de correo y outbox durable. Alternativas: SMTP Gmail requiere otra credencial persistente; conector administrativo Cloudflare expone más recursos de los necesarios. Ninguna alternativa se activa en este bloque.

Cierre local: SQLite real prueba duplicados, colisiones, aprobación de contenido, reclamación concurrente, cancelación y resultado incierto. Cierre operativo posterior: almacenamiento dedicado, conexión cloud acotada, prueba propia y conciliación; después primer cliente con expediente e identidad comprobados. Rollback local: retirar el módulo. Rollback remoto futuro: pausar consumidor y conservar recibos.
