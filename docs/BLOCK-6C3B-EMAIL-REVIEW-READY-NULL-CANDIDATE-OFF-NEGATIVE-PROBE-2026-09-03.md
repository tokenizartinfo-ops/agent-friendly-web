# Gate 6C.3B: Null Candidate OFF and Negative Probe

**Fecha:** 2026-09-03

**Estado:** `null_candidate_off_version_verified_negative_probe_passed`

## Declaracion de frontera

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_email_review_ready_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Cloudflare Worker, Access, Email Service binding, D1 y Rate Limiting aislados |
| `RESOURCE_ID` | Worker `agent-friendly-web-web-canary`; version `8d759339-5caf-4492-bf6a-ff6a2b3f9801`; deployment `fec166ba-ca50-4134-9ddb-5f1e4976f125`; D1 `2b518988-eacb-4c31-b760-4e58c3c0285b` |
| `ALLOWED_ACTION` | desplegar la candidata `to: null` con el kill switch OFF y ejecutar solo una prueba negativa autenticada |
| `ROLLBACK` | restaurar la version OFF anterior `7b25f69e-d30e-4ee4-be0e-c2deafed0f3d` al 100% del canary aislado |

La operacion pertenecio exclusivamente a Agent Friendly Web. No uso recursos de Tokenizart ni modifico el origen publico `https://agentfriendlyweb.dev`.

## Despliegue cerrado

La version `8d759339-5caf-4492-bf6a-ff6a2b3f9801` contiene la candidata `to: null` y la clasificacion saneada de errores de Cloudflare Email Service. Antes de desplegarla se comprobaron los bindings por nombre y tipo: Access, allowlist hash secreta, D1 aislada, rate limiter, Assets y `send_email` con destino fijo. El valor privado del destino no se incorporo a Git ni a la evidencia.

El deployment `fec166ba-ca50-4134-9ddb-5f1e4976f125` asigna 100% del trafico interno de `afw_canary` a esta version, equivalente a 0% del trafico del dominio publico. `AFW_EMAIL_REVIEW_READY_ENABLED=false`, por lo que no existe capacidad activa de envio.

## Prueba negativa autenticada

La interfaz privada mostro `PRUEBA NEGATIVA: ENVIO BLOQUEADO`, sin boton de envio. La prueba devolvio `HTTP 404`, `sent=false` y `email_review_ready_unavailable`.

La consulta posterior de D1 confirmo dos filas historicas `failed`, cero `sent` y cero `reserved`. No hubo invocacion al proveedor, reintento ni ningun correo durante esta fase.

## Alcance de la candidata

- el request no acepta destinatario, asunto, cuerpo ni adjuntos;
- `to: null` delega el destino al binding privado fijo;
- los codigos conocidos del proveedor se traducen a categorias estables;
- errores y mensajes crudos no se persisten ni se devuelven;
- la entrega sigue siendo `at-most-once`, sin reintentos;
- la prueba negativa valida cierre y bindings, no valida entrega.

Por eso `delivery_fix_remotely_verified` permanece en `false`. Un resultado exitoso solo puede afirmarse despues de otro unico intento real, con nueva aprobacion exacta en el momento de la accion y restauracion inmediata a OFF.

## Siguiente gate

El siguiente gate es opcional y separado: habilitar temporalmente esta version para un unico `internal_review_ready`, ejecutar una sola vez y apagar de inmediato. Si falla, el nuevo codigo permitira registrar una categoria tecnica saneada. Si entrega, debe verificarse recibo hash, D1 `sent=1`, uso del proveedor y llegada al destino ya verificado.

No se habilitan destinatarios arbitrarios, clientes, marketing, autorespuestas, adjuntos, CRM, pagos, produccion publica ni automatizacion.
