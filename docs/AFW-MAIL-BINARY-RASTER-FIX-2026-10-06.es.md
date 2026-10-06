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

Release cerrado 6oct2026: source de07b96; versión bc28da2e-8a60-4895-92a3-03e530953358 al 100%, cuenta AFW verificada. Tres flags false, fechas vacías, sin EMAIL/limiter/serviceClient; mismo D1 y subject preservado; ambas políticas Access deny/everyone. API independiente verificó versión/settings/policies. Rollback: e6ebdbc1-c117-4e6f-bff6-4c80a9fa3983, preservando datos y cierre; comprobar settings después. PR288 CI verify aprobado (923 tests/lint/build). No nuevo envío realizado. Ensayo de MIME binario y recepción visual continúa pendiente.

Ensayo corregido 6oct2026: key afw-comic-raster-20261006-02, hash27bb2a792528d24a8d26d7cf30d997997acc3d5ab23b3f6b402736049329c94e. Revisión real Chrome aprobada; corregido error operativo: ventanas15/20min invalidan fence máximo600000ms, usar diez minutos exactos. No cambiar identidad por unavailable.
Cloud actual14:25:48.074Z POST200accepted receiptb8317eec-da4d-4976-8b30-863b8b73659c; segundo14:25:48.244Z200not_claimed. D1 un receipt. MIME del proveedor: cinco partes base64, decodificadas firmas binarias válidas: PNG13444/JPEG264047/PNG136602/PNG12574/PNG32667bytes. Fallo anterior ASCII-base64/QP corregido en mensaje real. Recepción/renderGmail todavía requiere confirmación owner; no declarar aceptación visual.
Cierre inmediato: token disabled, ambas políticas deny/everyone; flagsfalse/fechasvacías, EMAIL/limiter/serviceClient eliminados, D1/subject preservados. API verificó flags/bindings cerrados. No clientes ni guardia permanente. No reenviar accepted keys.

Aceptación visual del owner (6oct2026, este chat): «llego perfecto, imagen perfecta». Esto cierra recepción y render del mensaje propio corregido en Gmail, junto al recibo único y MIME binario verificados. No acredita envío a Sector ni promoción general. Relectura API posterior: tres flags false, EMAIL ausente, token disabled.
