# AFW: diagnóstico y corrección del raster enviado

6oct2026; AFW mail-canary, mensaje propio afw-comic-own-20261006-01. Owner confirmó recepción pero imágenes ausentes. El servicio continúa cerrado tras aceptación del transporte; no reenviar la referencia accepted.

## Evidencia del proveedor

GET /accounts/{account}/email/sending/messages/{message_id}, resuelto internamente desde receipt D1, devolvió MIME RFC822 como string (641323 caracteres), no metadata JSON. Solo se emitieron métricas saneadas, no el MIME completo.

MIME tiene multipart/related + multipart/alternative, texto y HTML, cinco partesimagePNG/JPEG, cinco Content-IDafw-header/robots/body/action/footer e inline. Las partesimage usan quoted-printable. Tras decodificar esa transferencia, contienen cadenas ASCII base64 iVBOR… o /9j/… con longitudes iguales a los snapshots; ninguna empieza por la firma binaria PNG/JPEG. Esto acredita el fallo del contenido de imagen en el mensaje del proveedor. No culpar preferencias Gmail ni borrar cookies.

Aunque https://developers.cloudflare.com/email-service/api/send-emails/workers-api/ documenta stringbase64/binary, el camino nativo observado transportó strings como texto. Solución acotada: entregar Uint8Array con los mismos bytes de los activos ya validados. Mantener base64 canónico en custody/hash; no cambiar aprobación, CID, HTML, remitente, destinatario ni política de reintentos.

## Corrección local

lib/mail-consumer.mjs convierte exclusivamente attachments del brand package verificado a bytes en un payload separado. Texto histórico preservado. test/mail-consumer.test.mjs observó RED string vsbytes antes del cambio, GREEN después; comprueba payload exacto/destinatario/CID/bytePNG, snapshotstring intacto y un solo intento. Once pruebas focales aprobadas. Suite/build/lint finales se registrarán al completar.

Pendiente: integrar/desplegar canary cerrado y nuevo ensayo propio separado con approval/hash nuevo. Confirmar MIME producido con firmas y hashes binarios correctos y render recibido. La corrección local NO acredita imagen visible en Gmail ni nuevo envío. Preservar referencia accepted/recibo original; nunca reciclarla.

Verificación local final: npm test 923/923; npm run lint y npm run build exit0. Cambio todavía sin desplegar; canary remoto cerrado. Nuevo ensayo real pendiente.
