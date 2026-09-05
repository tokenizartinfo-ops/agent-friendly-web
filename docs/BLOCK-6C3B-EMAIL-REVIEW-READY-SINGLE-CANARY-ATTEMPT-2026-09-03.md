# Gate 6C.3B: Single Review-Ready Canary Attempt

**Fecha:** 2026-09-03

**Estado:** `single_canary_attempt_failed_no_retry_kill_switch_off`

## Declaracion de frontera

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_email_review_ready_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Cloudflare Worker, Access, Email Service binding, D1 y Rate Limiting aislados |
| `RESOURCE_ID` | Worker `agent-friendly-web-web-canary`; version temporal habilitada `960c2834-3199-4c44-b42d-8d8a177b6007`; version OFF restaurada `189d6cd1-b70c-4552-aa1c-3e0101b35911`; D1 `2b518988-eacb-4c31-b760-4e58c3c0285b` |
| `ALLOWED_ACTION` | exactamente un intento humano confirmado de plantilla fija al unico destino privado del binding, sin campos libres ni reintentos |
| `ROLLBACK` | restaurar inmediatamente la version OFF `189d6cd1-b70c-4552-aa1c-3e0101b35911` al 100% del canary aislado |

Esta operacion pertenecio exclusivamente a Agent Friendly Web. No utilizo recursos, datos, runtimes ni repositorios de Tokenizart y no modifico `https://agentfriendlyweb.dev`.

## Ejecucion

La confirmacion humana se obtuvo en el momento de la accion. El kill switch se habilito solo en una version temporal del canary protegido y se presiono una vez el unico boton de plantilla fija. La aplicacion realizo un solo intento: reservo un evento, invoco una vez al proveedor y registro `failed`. No aparecio recibo de proveedor ni confirmacion visible, por lo que el flujo termino sin reintento.

Inmediatamente se restauro la version OFF al 100% del canary. El deployment de rollback fue `3d4d48d3-3fa6-4b1e-9191-76c48d189e16`, creado a las `2026-09-03T04:21:06.897804Z`.

## Evidencia posterior

- intentos humanos aprobados: uno;
- invocaciones al proveedor: una;
- reintentos automaticos o manuales: cero;
- filas D1: una, con cero `reserved`, cero `sent` y una `failed`;
- evento opaco: `afw-review-ready-20260903-987d8c487e0b`;
- codigo saneado: `provider_delivery_failed`;
- recibo del proveedor: ausente;
- uso diario de Cloudflare Email Service: cero enviados sobre una cuota de 200;
- dominio remitente: habilitado;
- destino fijo: verificado;
- supresiones: cero;
- coincidencias en Gmail para el asunto exacto: cero;
- correo entregado: ninguno;
- kill switch despues del intento: `false`.

## Diagnostico y correccion local

El constructor generaba `from`, `replyTo`, `subject` y `text`, pero omitia la propiedad `to`. Para un binding `send_email` con `destination_address`, Cloudflare sustituye el destino fijo cuando `to` se declara expresamente como `null` o `undefined`. Los tipos actuales de Workers tambien exigen al menos uno entre `to`, `cc` o `bcc`.

El codigo de diagnostico es `missing_explicit_to_field_for_fixed_destination_binding`. Es la causa tecnica mas probable y reproducida contra el contrato local. El error especifico del proveedor no quedo disponible porque la frontera existente lo saneo como `provider_delivery_failed`; por eso la correccion todavia no se considera verificada remotamente.

Se aplico TDD:

1. Las pruebas exigieron una propiedad propia `to: undefined` y quedaron rojas con dos fallos.
2. El constructor incorporo explicitamente `to: undefined` sin aceptar destinatarios desde el request.
3. Las pruebas especificas quedaron verdes: `13/13`.

La restriccion de destino no cambia: Cloudflare conserva el unico destino privado y el request sigue sin aceptar email, asunto ni cuerpo libre.

## Estado y siguiente gate

No hay capacidad de envio activa. La correccion existe solo localmente y no autoriza otro mensaje. El siguiente gate debe:

1. superar la suite completa, lint, build y `git diff --check`;
2. subir la correccion al canary preservando el binding privado y `AFW_EMAIL_REVIEW_READY_ENABLED=false`;
3. repetir unicamente la prueba negativa autenticada y confirmar que D1 mantiene una sola fila historica;
4. solicitar una nueva confirmacion humana, exacta y en el momento de la accion, antes de un eventual segundo y unico intento con un nuevo identificador idempotente.

No se habilitan clientes, destinatarios arbitrarios, marketing, autorespuestas, adjuntos, CRM, billing, automatizacion ni reintentos.
