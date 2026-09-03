# Gate 6C.3B: Authenticated Negative Email Probe

**Fecha:** 2026-09-02

**Estado:** `authenticated_negative_probe_verified_kill_switch_off`

## Declaracion de frontera

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_email_review_ready_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Cloudflare Worker, Access, Email Service binding, D1 y Rate Limiting aislados |
| `RESOURCE_ID` | Worker `agent-friendly-web-web-canary`; version `189d6cd1-b70c-4552-aa1c-3e0101b35911`; D1 `2b518988-eacb-4c31-b760-4e58c3c0285b` |
| `ALLOWED_ACTION` | autenticar al unico operador admitido y probar el cierre de la ruta con el kill switch en `false` |
| `ROLLBACK` | restaurar Worker `40baec0c-b832-4d18-b46a-a7c97cd1719e`; conservar la tabla aditiva vacia |

Esta prueba pertenece exclusivamente a Agent Friendly Web. No usa runtimes, datos, repositorios ni recursos de Tokenizart.

## Resultado

Cloudflare Access entrego la asercion al Worker y la aplicacion valido firma, emisor, audiencia, expiracion, subject y email normalizado. La compatibilidad se ajusto para no exigir el header JWT opcional `typ`, de acuerdo con el flujo de validacion documentado por Cloudflare, sin relajar `RS256`, JWKS, issuer ni audience.

La superficie privada `GET /canary/email-review-ready?probe=negative` construyo internamente el mismo contrato fijo que utilizaria el `POST`, pero solo pudo invocarlo porque `AFW_EMAIL_REVIEW_READY_ENABLED=false`. El resultado saneado fue:

- HTTP interno: `404`;
- `sent`: `false`;
- codigo: `email_review_ready_unavailable`.

El gate rechazo la operacion antes de verificar identidad de negocio, leer payload, aplicar rate limit, reservar D1 o invocar el proveedor de correo. Una consulta agregada posterior confirmo `delivery_count=0`, `rows_written=0` y `changed_db=false`.

## Controles de la superficie

- la pagina requiere Cloudflare Access y validacion JWT dentro de la aplicacion;
- no contiene campos para destinatario, asunto, cuerpo, adjuntos ni texto libre;
- no reenvia cookies al endpoint de negocio;
- copia solamente la asercion Access y genera servidor-side un UUID idempotente;
- el diagnostico por `GET` se niega a invocar el gate si el flag de envio esta en `true`;
- el eventual envio real sigue siendo exclusivamente `POST`;
- la respuesta visible no expone email, identidad, token, hash de actor ni destino privado.

## Verificacion

- pruebas especificas: `13/13`;
- suite completa: `436/436`;
- lint: cero errores y un warning preexistente de optimizacion LCP;
- build Vinext: correcto, con ambas rutas canary;
- Worker actual: `189d6cd1-b70c-4552-aa1c-3e0101b35911` al 100% del canary aislado;
- origen publico `https://agentfriendlyweb.dev`: no modificado;
- correo enviado: ninguno.

## Siguiente decision

La infraestructura ya supero el ultimo control negativo. El siguiente paso, separado y sujeto a confirmacion humana en el momento de la accion, es habilitar temporalmente el flag, enviar exactamente un correo `internal_review_ready` de plantilla fija al unico destino privado ya vinculado, registrar el recibo metadata-only y volver inmediatamente el flag a `false`. No se permite reintento automatico.

Este estado no habilita correo a clientes, destinatarios arbitrarios, marketing, autorespuestas, adjuntos, CRM, billing ni automatizacion.

## Resultado posterior - 2026-09-03

La confirmacion humana posterior habilito un solo intento real. El proveedor fue invocado una vez, pero no se entrego correo; no hubo reintento y la version OFF se restauro inmediatamente. El estado vigente es `single_canary_attempt_failed_no_retry_kill_switch_off`. El diagnostico `missing_explicit_to_field_for_fixed_destination_binding` fue corregido localmente y todavia no fue verificado en remoto. Ver `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-SINGLE-CANARY-ATTEMPT-2026-09-03.md`.
