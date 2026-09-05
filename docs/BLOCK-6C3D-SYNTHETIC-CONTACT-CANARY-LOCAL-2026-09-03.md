# Gate 6C.3D - Synthetic Contact Canary Local

**Estado:** `synthetic_contact_canary_local_ready_remote_disabled`

**Superado el 2026-09-03 por:** `synthetic_contact_canary_verified_kill_switch_off`. Este documento conserva el preflight local historico; la evidencia remota vigente esta en `docs/BLOCK-6C3D-SYNTHETIC-CONTACT-CANARY-REMOTE-2026-09-03.md`.

## Frontera declarada

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Worker web canary, D1 canary, Access, Turnstile de prueba y rate limiter propio |
| `RESOURCE_ID` | `agent-friendly-web-web-canary`, `/canary/contact-intake`, `/api/canary/contact-intake` |
| `ALLOWED_ACTION` | preparar una unica solicitud sintetica para persistencia y revision, sin correo |
| `ROLLBACK` | mantener o restaurar `AFW_SYNTHETIC_CONTACT_ENABLED=false`; no tocar produccion |

## Que quedo preparado

El canary dispone localmente de una UI privada y una API same-origin. La UI no contiene campos de email, nombre, dominio, organizacion ni mensaje. Genera un UUID en el navegador y obtiene un token Turnstile; el servidor deriva todos los datos del fixture.

El fixture usa `synthetic-canary@example.invalid` y `example.invalid`. `.invalid` es un espacio reservado y evita representar a una persona o sitio real. Solo se solicita el consentimiento `requested_plan`; marketing y novedades permanecen en `false`.

La API exige:

- kill switch dedicado;
- HTTPS, host, ruta y origen exactos;
- JWT Cloudflare Access y audiencia del canary;
- sujeto autorizado mediante hash privado;
- rate limiter separado;
- contrato sin campos adicionales;
- Turnstile validado en servidor con accion y hostname exactos;
- D1 canary con prepared statements e idempotencia.

Despues de persistir, el adaptador Gate 6C.3C lee solamente `id`, `locale` y `state` y devuelve `prepared_not_sent`. El nuevo handler no importa ni invoca la ruta de entrega. El Worker conserva el binding privado heredado para no destruir la configuracion previa, pero el handler sintetico no lo recibe y el interruptor de email permanece OFF.

## Estado remoto

Esta fase termino sin despliegue, sin escritura D1 remota, sin llamada Turnstile, sin cambio de produccion y sin correo. `AFW_SYNTHETIC_CONTACT_ENABLED=false` y `AFW_EMAIL_REVIEW_READY_ENABLED=false` son el estado esperado antes y despues de la prueba remota.

Las credenciales Turnstile usadas por el canary son las credenciales oficiales de prueba y no se configuran en produccion. La validacion sigue ocurriendo en Siteverify del lado servidor. Esas credenciales devuelven accion `test` y hostname `localhost`; una credencial real debe verificar `afw_synthetic_contact` y `canary.agentfriendlyweb.dev`.

## Evidencia local

- handler: `lib/synthetic-contact-canary.mjs`;
- API privada: `app/api/canary/contact-intake/route.ts`;
- UI privada: `app/canary/contact-intake/route.ts`;
- contrato: `public/.well-known/synthetic-contact-canary-contract.json`;
- pruebas dirigidas: `19/19` verdes para handler, fronteras, UI y configuracion.

## Proximo paso acotado

Desplegar primero con el interruptor OFF, comprobar que no hay cambios en D1 ni email, habilitar una sola captura sintetica, verificar persistencia y `prepared_not_sent`, y restaurar OFF inmediatamente. No se habilita captura publica ni se envia correo.
