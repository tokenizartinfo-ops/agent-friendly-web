# Gate 6C.3B: Corrected OFF Version and Negative Probe

**Fecha:** 2026-09-03

**Estado:** `corrected_off_version_verified_negative_probe_passed`

## Declaracion de frontera

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_email_review_ready_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Cloudflare Worker, Access, Email Service binding, D1 y Rate Limiting aislados |
| `RESOURCE_ID` | Worker `agent-friendly-web-web-canary`; version `3af007c5-c67d-45f3-8f8e-ccb350ac76a4`; deployment `de2a744b-9489-4709-a5a7-cd5404179767`; D1 `2b518988-eacb-4c31-b760-4e58c3c0285b` |
| `ALLOWED_ACTION` | desplegar la correccion con el kill switch OFF, verificar bindings por nombre/tipo y ejecutar solo una prueba negativa autenticada |
| `ROLLBACK` | reasignar el canary a la version OFF anterior `189d6cd1-b70c-4552-aa1c-3e0101b35911` |

Esta operacion pertenecio exclusivamente a Agent Friendly Web. No utilizo recursos, datos, runtimes ni repositorios de Tokenizart y no modifico `https://agentfriendlyweb.dev`.

## Despliegue cerrado

La correccion `to: undefined` se compilo y cargo como una version inmutable. La carga preservo el binding privado `send_email` sin leer, reconstruir ni publicar su destino. Antes de promoverla se verificaron por nombre y tipo Access, D1 canary, rate limiting, assets, la allowlist secreta y el binding de correo.

La version `3af007c5-c67d-45f3-8f8e-ccb350ac76a4` quedo al 100% unicamente dentro del Worker aislado del canary. Los flags remotos comprobados fueron:

- `AFW_EMAIL_REVIEW_READY_ENABLED=false`;
- `AFW_REMOTE_DEPLOY_ENABLED=false`;
- `AFW_CANARY_DIAGNOSTICS_ENABLED=true`.

El porcentaje indica distribucion interna del Worker canary, no trafico del origen publico. El sitio `agentfriendlyweb.dev` no fue desplegado ni alterado.

## Prueba negativa autenticada

La sesion humana allowlisted de Cloudflare Access abrio exclusivamente:

`https://canary.agentfriendlyweb.dev/canary/email-review-ready?probe=negative`

La aplicacion mostro `PRUEBA NEGATIVA: ENVIO BLOQUEADO` y devolvio:

- `HTTP 404`;
- `sent=false`;
- `code=email_review_ready_unavailable`.

No se presiono el boton de envio, no se habilito el flag y no se invoco al proveedor durante esta fase.

## Integridad de D1

La consulta agregada anterior y posterior a la prueba negativa produjo el mismo resultado:

- filas totales: una;
- `reserved`: cero;
- `sent`: cero;
- `failed`: una.

La unica fila sigue siendo el intento historico fallido documentado. La prueba negativa no escribio una fila, no reservo otro evento y no envio ningun correo.

## Interpretacion correcta

La correccion esta desplegada remotamente y la frontera cerrada fue verificada. Esto confirma que el artefacto corregido puede convivir con los bindings privados y permanecer fail-closed.

Todavia no confirma que el proveedor acepte una entrega con `to: undefined`, porque el camino de envio no se ejecuto. Por esa razon `delivery_fix_remotely_verified` y `remotely_verified_fix` permanecen en `false` hasta un eventual canary exitoso.

## Siguiente gate

El siguiente gate requiere una nueva confirmacion humana exacta y en el momento de la accion. Solo despues podra prepararse una version temporal con flag ON, un identificador idempotente nuevo y exactamente un intento de plantilla fija. Debe volver a OFF inmediatamente, haya exito o falla.

Continuan bloqueados los destinatarios arbitrarios, cuerpos libres, marketing, autorespuestas, adjuntos, CRM, billing, automatizaciones y reintentos.
