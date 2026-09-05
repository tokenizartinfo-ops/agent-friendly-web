# Agent Friendly Web Email Review Ready v1

**Estado:** diseno aprobado para implementacion local; binding, endpoint remoto y envio deshabilitados

## Objetivo

Definir el primer caso transaccional permanente de Agent Friendly Web: avisar al operador verificado cuando una solicitud haya quedado lista para revision humana. El aviso no se envia al visitante ni sustituye CRM, soporte o marketing.

## Frontera canonica

- `PROJECT`: `agent-friendly-web`.
- `REPOSITORY`: `tokenizartinfo-ops/agent-friendly-web`.
- `ENVIRONMENT`: `afw_email_review_ready_canary`.
- `ORIGIN`: `canary.agentfriendlyweb.dev`.
- `RESOURCE_TYPE`: API privada, D1 canary, rate-limit binding y Cloudflare Email Service binding.
- `RESOURCE_ID`: `/api/canary/email/review-ready`, `email_transactional_deliveries`, `EMAIL_REVIEW_READY`.
- `ALLOWED_ACTION`: reservar y enviar como maximo una alerta interna por evento aprobado.
- `ROLLBACK`: cerrar kill switch, retirar binding y ruta, conservar recibos metadata-only.

Tokenizart, Companion, Copilot, Owner Live, Atelier, `*.chatgpt.site`, newsletters y destinatarios externos quedan fuera de alcance.

## Caso transaccional

El evento canonico es `internal_review_ready`. Representa una solicitud ya clasificada que necesita revision de Gabriel u otro operador futuro autorizado. El payload acepta solamente:

- contrato `agent-friendly-web.email-review-ready.v1`;
- `eventId` opaco y estable;
- `idempotencyKey` UUID;
- `templateId` fijo `internal-review-ready-v1`;
- idioma `es`, `en` o `pt`;
- finalidad fija `internal_review_ready`;
- `humanApproved: true`.

No acepta email, nombre, dominio, asunto, texto libre, HTML, headers, adjuntos, secretos ni datos de pago. El remitente es `hello@agentfriendlyweb.dev`; el destinatario lo fija Cloudflare mediante `destination_address` y nunca entra en el request ni en Git.

## Flujo

1. El kill switch debe estar en `true`; su valor inicial y el de produccion son `false`.
2. Cloudflare Access valida JWT, audience y sujeto.
3. Una allowlist de hashes de sujeto limita operadores sin guardar emails.
4. El rate-limit binding aplica una llamada por minuto por operador y ruta.
5. D1 reserva `eventId` e `idempotencyKey` antes del envio.
6. La plantilla local genera asunto y texto; el caller no controla contenido.
7. `EMAIL_REVIEW_READY.send()` usa el destino fijo del binding.
8. D1 marca `sent` y conserva solo hash del ID de proveedor.

La reserva anterior al envio ofrece semantica **at-most-once**. Si el proceso se interrumpe despues del envio y antes de actualizar D1, el registro queda `reserved` y no se reintenta automaticamente. La seguridad contra duplicados prevalece sobre la entrega automatica.

## Persistencia

La tabla `email_transactional_deliveries` conserva:

- identificadores internos aleatorios;
- `event_id`, `template_id`, `locale` y `purpose`;
- hash del sujeto Access;
- `idempotency_key` y hash canonico del request;
- estado `reserved`, `sent` o `failed`;
- hash del identificador de entrega y codigo de error estable;
- timestamps de creacion, envio y actualizacion.

No conserva destinatario, remitente privado, cuerpo, asunto renderizado, headers, JWT, IP o error crudo del proveedor.

## Estados y respuestas

- Kill switch cerrado: `404 email_review_ready_unavailable`.
- Identidad invalida: `403 email_review_ready_identity_rejected`.
- Operador no allowlisted: `403 email_review_ready_actor_not_allowed`.
- Payload invalido: `400 invalid_email_review_ready_request`.
- Rate limit: `429 email_review_ready_rate_limited`.
- Primera reserva y envio: `201`, `sent: true`, `duplicate: false`.
- Replay del mismo request ya enviado: `200`, `sent: true`, `duplicate: true`, sin segundo envio.
- Reuso conflictivo: `409 email_review_ready_idempotency_conflict`.
- Reserva pendiente o fallida: respuesta cerrada y cero reintentos automaticos.
- Falla de proveedor: `502 email_review_ready_delivery_failed`, sin detalles crudos.

Todas las respuestas usan `Cache-Control: no-store, private`.

## Configuracion remota futura

Gate 6C.3A agrega codigo, migracion y contratos, pero no configura recursos. Gate 6C.3B debera comprobar antes de desplegar:

- `canary.agentfriendlyweb.dev` protegido por la app Access exacta;
- D1 canary vacia respecto de la nueva tabla y migracion aplicada;
- binding `EMAIL_REVIEW_READY` con `destination_address` fijo y `allowed_sender_addresses` limitado a `hello@agentfriendlyweb.dev`;
- rate limiter con namespace exclusivo;
- hash del sujeto operador configurado fuera de Git;
- kill switch inicialmente `false`;
- cero cron, queues, rutas publicas o destinatarios arbitrarios.

La activacion para una unica prueba requiere cambiar el kill switch, ejecutar un solo request aprobado, verificar un unico recibo y volver a `false`.

## Pruebas

- validacion exacta y rechazo de datos libres o privados;
- plantillas completas en ESP/ENG/POR;
- identidad, allowlist, kill switch y rate limit;
- reserva D1 at-most-once, replay, conflicto y carrera unica;
- falla del proveedor sin reintento ni filtracion;
- migracion aditiva y tabla inicialmente vacia;
- configuracion sin binding, ruta ni activacion remota en 6C.3A;
- suite completa, lint, build y escaneo de secretos.

## Criterios de cierre de 6C.3A

1. El caso `internal_review_ready` queda definido y no se presenta como correo a clientes.
2. Existe una implementacion local probada con semantica at-most-once.
3. El contrato publico declara que el binding y el envio continuo siguen apagados.
4. No se despliega, migra ni envia ningun correo.
5. Gate 6C.3B queda separado y falla cerrado hasta un preflight remoto nuevo.

## Fuentes primarias

- Cloudflare send bindings: `https://developers.cloudflare.com/email-service/configuration/send-bindings/`.
- Cloudflare Workers Email API: `https://developers.cloudflare.com/email-service/api/send-emails/workers-api/`.
- Cloudflare Email Service pricing: `https://developers.cloudflare.com/email-service/platform/pricing/`.
- Cloudflare Workers rate limiting: `https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/`.
