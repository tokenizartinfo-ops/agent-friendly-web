# AFW: correo cómic propio aceptado desde cloud y cerrado

6 octubre2026; AFW/repo tokenizartinfo-ops/agent-friendly-web; mail-canary Worker agent-friendly-web-mail-canary, D1 original e1d480e2-e369-4f0b-ae7d-5cab3b7eee16. Scope propio, no clientes ni guardia. Preparación docs/AFW-COMIC-MAIL-OWN-DRAFT-2026-10-06.es.md y custodia docs/AFW-COMIC-MAIL-MANAGED-CUSTODY-2026-10-06.es.md.

## Error de ingreso corregido

Chrome observó ERR_TOO_MANY_REDIRECTS tras login, no rechazo del correo. Accessoperator app a5c2c609-5314-47d9-a2cf-9cd97e2131e4 tenía SameSite strict. Se cambió solo esa app a lax conforme a https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/, preservando HttpOnly/identidad/sesión5min. No se borraron cookies ni se solicitó otro OTP. Tras navegar al mensaje y abrir ventana solo de revisión, misma sesión mostró el borrador autenticado y sus cinco imágenes. Un ERR_BLOCKED_BY_CLIENT intermedio desapareció al abrir la revisión; no atribuir su causa a la cookie sin evidencia adicional.

Lax permanece como corrección del flujo de login; rollback strict reintroduce el riesgo documentado. No equivale a permitir CSRF: handler conserva Origin/JSON/Sec-Fetch-Site exactos. No se modificaron otras aplicaciones Access.

## Revisión y envío

Referencia afw-comic-own-20261006-01; recipient propio gabrielmucchiut5@gmail.com; hello@agentfriendlyweb.dev; hash be3ed4beaa4a6218283878c4c09084a21c641c4326be34465605e897ab998e3d. Chrome inspeccionó tipografía cómic, robots con latas, cuerpo y CTA del snapshot; aprobación se registró por botón del flujo privado bajo sesión real autorizada, no SQL. Ventana13:44:11.154Z→13:54:11.154Z y decisión clamped al fin.

La primera ejecución cloud se detuvo sin POST por preflight. Diagnóstico siguiente confirmó current/source6ac4eeb23/enforced/doscomicready. Nuevo turno verificó estado y realizó un POST único con custodia mediada/proxy/TLS/permisoejecución network:

- 13:48:10.155Z, HTTP200, state accepted, receiptRef d0c6e9b8-c4d5-4fa6-b9f9-447cf8d6ac36.
- 13:48:10.294Z, segundo consumo HTTP200/not_claimed: ningún segundo envío.

Tarea cloud01a11150-19b6-716d-8b13-f5769d743034, turno01a11178-2219-773d-b340-ad9a670108db. No retries ante resultados inciertos, ni otros destinatarios. Aceptación del proveedor no demuestra recepción en inbox ni render Gmail.

## Cierre

Antes13:49UTC: tokencomic disabled; flags operador/servicio/marcafalse, fechasvacías; EMAIL/limiter/serverClient retirados; ambas políticas deny/everyone. D1 y MAIL_OPERATOR_SUBJECT preservados. Recibo/historial no borrados; permiso vencido no habilita nuevo consumo. Corrección cookieLax preservada.

Pendiente separado: confirmar recepción y render en casilla propia; después automatización de captura del borrador sin SQLliteral, ciclo revisión accesible y futuros avisos contextuales de expediente. No onboarding Sector ni guardia permanente desde este recibo. No repetir custodia/handshake/OTP si el estado actual ya está confirmado.

Verificación D1 primaria: stateaccepted/attempted1/receiptCount1, hash y receiptRef coinciden con cloud. PATCHsettings conserva secretos omitidos: MAIL_SERVICE_CLIENT_ID requirió DELETE explícito del binding temporal, sin tocar el token custodiado ni MAIL_OPERATOR_SUBJECT. Verificar ausencia después de ese DELETE; no inferirla desde PATCH.

Versión final cerrada e6ebdbc1-c117-4e6f-bff6-4c80a9fa3983 al100%; API confirmó ausencia de EMAIL/limiter/serverClient y subject preservado tras DELETE. No nuevo correo durante cierre.
