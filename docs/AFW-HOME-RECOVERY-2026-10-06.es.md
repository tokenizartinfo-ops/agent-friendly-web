# Recuperación de portada, 6 octubre local / 7 octubre UTC

## Incidente y evidencia

Smoke público de producción: `/` HTTP500, Cloudflare1101; documentos de descubrimiento HTTP200 y límites privados302. Se reprodujo con GET propio sin sesión ni consulta. Tail filtrado por IP propia y errores: TypeError `n.createContext is not a function`, paquete `_next/static/site-footer-BKLE6-UO.js`, a las 02:22 UTC aproximadamente. Esto identifica la excepción, no demuestra todavía la causa de compilación ni un parche validado.

Versión efectiva afectada `68fbcb76-8d7e-4a20-8c1c-bd82f57aebd2`, publicada el 6 octubre15:15:55UTC. Procedencia/documento previo: `AFW-BRIEF-ENTRY-PRODUCTION-2026-10-06.es.md`. No atribuir este incidente a las preparaciones privadas no desplegadas.

## Acción y conservación

Proyecto AFW, repo agent-friendly-web, producción `https://agentfriendlyweb.dev`, Worker `agent-friendly-web-web-production`, cuenta `85d0d5dadac3341a564f22ce885e9eec`. Acción autorizada: recuperación reversible de código sin SQL, ampliación de permisos ni cambios de clientes.

Se verificaron ambos recursos de versión recuperables, igualdad de todos los bindings salvo assets y deployment vigente antes de mutar. Se restauró el rollback documentado `00861678-d968-41d3-be85-180896a321b7` al100%, deployment `1aad1131-2873-4591-bf0d-a42ef6bc56af`, 7octubre02:23:14.326UTC. La versión afectada queda conservada para diagnóstico/reversión; no se debe volver a promover mientras falla.

La primera lectura durante propagación aún devolvió500. La lectura posterior y el smoke completo pasaron: portada200, documentos200, límites privados302. Settings confirmaron D1 `d26fc9d2-df5a-4957-8e58-cc4c945faad8`, copilot true limitado al proyecto propio `6e972c18-cae1-402b-b959-646abd8499d7`, remote deploy false.

## Pendiente

Reproducir la excepción del artefacto afectado en un ensayo separado, corregir y verificar portada/otras páginas en runtime antes de promover la entrada breve otra vez. Un build o CI verde no acredita render de portada. La comprobación autenticada anterior de la entrada breve corresponde a la versión retirada; no acredita ese comportamiento con el rollback actual. No se invitó a Max.

Logs saneados de smoke en output ignorado. Tail propio cerrado; registro bruto eliminado después de extraer excepción técnica, para no conservar headers/IP innecesarios.
