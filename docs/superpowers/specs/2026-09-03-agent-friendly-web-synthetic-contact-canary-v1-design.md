# Agent Friendly Web Synthetic Contact Canary v1

**Estado:** diseno aprobado para implementacion y una prueba remota sintetica; captura publica y correo deshabilitados

## Objetivo

Reconstruir dentro del canary canonico de Agent Friendly Web el recorrido minimo de Gate 6B: una persona autenticada por Cloudflare Access confirma una solicitud completamente sintetica, Turnstile se valida en servidor, D1 conserva la solicitud y su consentimiento, y el adaptador privado prepara el aviso interno sin enviarlo.

## Frontera remota

- `PROJECT`: `agent-friendly-web`.
- `REPOSITORY`: `tokenizartinfo-ops/agent-friendly-web`.
- `ENVIRONMENT`: `afw_canary`.
- `ORIGIN`: `https://canary.agentfriendlyweb.dev`.
- `RESOURCE_TYPE`: Worker web canary, D1 canary, Access, rate limiter y Turnstile de prueba.
- `RESOURCE_ID`: `agent-friendly-web-web-canary`, `agent-friendly-web-web-canary`, `/canary/contact-intake` y `/api/canary/contact-intake`.
- `ALLOWED_ACTION`: persistir una unica solicitud sintetica y preparar un contrato `internal_review_ready` sin entrega.
- `ROLLBACK`: restaurar `AFW_SYNTHETIC_CONTACT_ENABLED=false`; conservar la fila sintetica como evidencia identificable; no modificar produccion.

Quedan fuera de alcance el endpoint publico, contactos reales, texto libre, destinatarios configurables, envio de correo, Tokenizart y cualquier superficie `*.chatgpt.site`.

## Contrato de entrada

El endpoint privado acepta solo:

- `contract`: `agent-friendly-web.synthetic-contact-canary.v1`;
- `idempotencyKey`: UUID opaco generado en navegador;
- `action`: `create_synthetic_contact_and_prepare_review`;
- `humanApproved`: `true`;
- `turnstileToken`: token efimero, validado una vez y nunca persistido.

Se rechaza cualquier otro campo, incluidos email, nombre, dominio, organizacion, mensaje, destinatario, asunto, cuerpo, adjuntos, credenciales y contenido libre.

## Datos derivados

El servidor construye un fixture fijo y no sensible:

- email: `synthetic-canary@example.invalid`;
- dominio: `example.invalid`;
- rol: `owner`;
- organizacion: `Agent Friendly Web Synthetic Canary`;
- locale: `es`;
- objetivo: `receive_plan`;
- fuente: `direct`;
- consentimiento requerido: `requested_plan=true`;
- consentimientos comerciales y novedades: `false`.

La zona `.invalid` evita representar a una persona o dominio real.

## Guardas

El flujo falla cerrado salvo que se cumplan simultaneamente:

1. `AFW_SYNTHETIC_CONTACT_ENABLED=true` en canary;
2. metodo `POST`, HTTPS, hostname, ruta y origen exactos;
3. JWT de Cloudflare Access con issuer y audience del canary;
4. hash de sujeto presente en la allowlist privada del gate;
5. binding D1 y rate limiter propios disponibles;
6. JSON acotado y contrato exacto;
7. Turnstile validado en servidor con accion `afw_synthetic_contact` y hostname canary;
8. persistencia idempotente de solicitud y consentimiento;
9. preparacion metadata-only del aviso con estado `prepared_not_sent`.

El rate limiter se consume despues de autenticar y autorizar al actor. No se reutiliza como contador exacto.

## Turnstile

El canary usa exclusivamente las credenciales de prueba publicadas por Cloudflare para un widget visible que siempre pasa. Esas credenciales no existen en la configuracion de produccion. La prueba sigue llamando a Siteverify desde el servidor, valida `action` y `hostname`, usa timeout y nunca persiste el token.

## Respuesta saneada

La respuesta autenticada puede indicar:

- solicitud aceptada o duplicada;
- referencia UUID opaca;
- persistencia de un consentimiento `requested_plan`;
- aviso preparado en `prepared_not_sent`;
- `emailSent=false`.

No devuelve PII, token Turnstile, JWT, email del fixture, hashes de actor, SQL ni errores internos.

## Prueba remota unica

1. desplegar codigo con el kill switch OFF;
2. verificar `404` en POST y ausencia de cambios D1;
3. habilitar temporalmente solo `AFW_SYNTHETIC_CONTACT_ENABLED`;
4. crear una solicitud sintetica desde la UI privada;
5. verificar una fila nueva, un consentimiento y aviso `prepared_not_sent`;
6. confirmar que la tabla de entregas de email no cambia;
7. restaurar el kill switch a `false` inmediatamente;
8. verificar nuevamente el cierre remoto.

No hay reintentos automaticos. Ante una respuesta ambigua se consulta D1 antes de repetir.

## Criterios de aceptacion

- pruebas unitarias cubren frontera, identidad, allowlist, limite, contrato, Turnstile, D1, idempotencia y preparacion;
- produccion conserva `POST /api/contact-intake` en `503 contact_capture_disabled`;
- `AFW_EMAIL_REVIEW_READY_ENABLED=false` durante todo el gate;
- una sola solicitud sintetica queda trazada en D1 canary;
- cero correos nuevos;
- kill switch sintetico vuelve a OFF;
- suite, lint, build, dry-run y CI pasan.
