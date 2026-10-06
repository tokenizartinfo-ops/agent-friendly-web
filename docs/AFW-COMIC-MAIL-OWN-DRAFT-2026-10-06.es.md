# AFW: borrador propio cómic preparado en Cloudflare

Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web; entorno mail-canary; Worker agent-friendly-web-mail-canary y D1 e1d480e2-e369-4f0b-ae7d-5cab3b7eee16; orígenes privados mail-ops-canary / mail-consumer-canary.agentfriendlyweb.dev. Alcance: preparar un borrador propio y configuración cerrada, preservar historial, revisión autenticada antes de envío. Rollback: flagsfalse/fechasvacías, retirar EMAIL/limiter/serviceClient, token disabled y políticas deny; conservar D1 y MAIL_OPERATOR_SUBJECT. Código de cierre 19968bd3-f9d2-4163-8a9f-88dca2ef7933 como referencia; restaurar versión sin comprobar settings no prueba cierre.

## Borrador e integridad

Referencia afw-comic-own-20261006-01; destinatario propio gabrielmucchiut5@gmail.com; remitente hello@agentfriendlyweb.dev; asunto AFW | Prueba propia del correo cómic desde cloud. Cinco paneles del modelo editorial ya probado, 459334 bytes, alternativa textual y un CTA público. No invitación a Sector ni archivos de clientes. Hash completo be3ed4beaa4a6218283878c4c09084a21c641c4326be34465605e897ab998e3d.

Primer import SQL falló SQLITE_TOOBIG por insertar el raster completo como literal; consulta independiente acreditó cero filas de esta referencia. Import posterior con fragmentos <=30000 caracteres, append condicionado a longitud/hash y creación del outbox solo tras longitud completa, ejecutó23 consultas. No se modificaron filas históricas. Lectura primaria confirmó draft/JSONválido/cinco paneles/destinatario exacto; SHA256 recalculado del contenido completo por herramienta confiable coincidió. No contenido ni imágenes volcados en logs públicos. Artefactos de preparación y SQL en output ignorado; no incorporarlos a Git.

## Configuración cerrada

Identidad comic bc8e2673 permanece disabled. Su Client ID se transfirió internamente desde API Cloudflare a binding secreto MAIL_SERVICE_CLIENT_ID; ningún valor se mostró ni transitó por chat/clipboard/Git. MAIL_OPERATOR_SUBJECT preservado por inherit. Binding EMAIL limitado a destinatario propio exacto y remitente hello@; MAIL_RATE_LIMITER namespace660610,3/60s. Tres flagsfalse y fechasvacías conservadas: bindings presentes no habilitan envío. Consumer Access deny/everyone.

Para iniciar sesión de revisión, operador Access permite únicamente tokenizart.info@gmail.com con sesión5min; esta política no tiene expiración automática propia. Handler cerrado hasta ventana explícita <=10min. Debe volver a deny al cerrar/cancelar el ensayo. Chrome tab1913699293 solicitó código y observó Enter your code; login humano pendiente. Un timeout del inspector ocurrió después de enviar el formulario: no repetir OTP sin observar estado.

## Cierre del bloque y siguientes pasos

Preparación remota aceptada, cero envíos/decisiones/attempts nuevos. Falta login real del owner; después abrir ventana de revisión, verificar snapshot en pantalla y aprobar hash por el flujo privado, habilitar consumidor exacto durante el ensayo, un POSTcloud/recibo, segundo consumo sin segundo envío, confirmar recepción separada y retirar permisos/bindings. No crear aprobación por SQL ni afirmar recepción desde provider receipt. Ante uncertain preservar intento y no reenviar. No credenciales nuevas, guardia permanente ni onboarding cliente.

API independiente verificó versión cerrada ff655eb9-0818-413a-97a8-ff913fb69da9 al100%, deployment b82c0bba-3c7a-47d1-8986-abac8e0b4b72 (13:41:03.950UTC), tres flagsfalse/fechasvacías y bindings restringidos. Historial1accepted/2cancelled intacto más1draft propio. Esta versión modifica settings, no acredita nuevo código web ni puntaje externo.
