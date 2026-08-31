# Gate 6B Contact Staging Allowlist v1 Implementation Plan

> Implementar con TDD. Mantener produccion publica cerrada y no realizar cambios remotos.

## Tarea 1: politica fail-closed

- [x] Crear pruebas que cubran modo, hostname, identidad, allowlist y kill switch.
- [x] Implementar un evaluador puro sin secretos.
- [x] Normalizar emails y hostname sin aceptar identidad desde JSON.
- [x] Probar que el rechazo ocurre antes de leer el cuerpo.

## Tarea 2: lectura JSON acotada

- [x] Crear pruebas para media type, `Content-Length`, streaming sin longitud y JSON malformado.
- [x] Implementar lectura incremental con limite de 8 KiB.
- [x] Cancelar el stream cuando supera el limite.
- [x] Aceptar solamente objetos JSON.

## Tarea 3: handler inyectable y rate limiting obligatorio

- [x] Crear pruebas de limiter ausente, rechazo, excepcion y permiso.
- [x] Implementar el orden politica -> limiter -> body -> contrato -> Turnstile -> D1.
- [x] Reutilizar `processContactRequest`, `verifyTurnstileToken` y `saveContactIntake`.
- [x] Mantener `emailQueued: false`.

## Tarea 4: ruta y pagina privadas candidatas

- [x] Crear `POST /api/staging/contact-intake` con bindings fail-closed.
- [x] Crear `/contact-staging` con `noindex`, fuera de sitemap y navegacion.
- [x] Permitir que `ContactIntake` reciba un endpoint explicito sin cambiar su default publico.
- [x] Agregar la ruta privada a `robots.txt`.
- [x] Probar que el endpoint publico no cambia y que la pagina publica no habilita captura.

## Tarea 5: documentacion operativa

- [x] Registrar variables, bindings, respuestas, activacion por etapas y rollback.
- [x] Actualizar el roadmap sin declarar staging como desplegado.
- [x] Documentar que D1, Turnstile, Access y rate limiting remotos siguen pendientes.

## Tarea 6: verificacion y entrega

- [x] Ejecutar pruebas especificas en rojo y luego en verde.
- [x] Ejecutar `npm test`, `npm run lint` y `npm run build`.
- [x] Ejecutar `git diff --check` y revisar que no haya secretos.
- [x] Abrir PR con resultados y limites: `tokenizartinfo-ops/agent-friendly-web#31`.
- [x] No desplegar staging ni produccion desde este plan.
