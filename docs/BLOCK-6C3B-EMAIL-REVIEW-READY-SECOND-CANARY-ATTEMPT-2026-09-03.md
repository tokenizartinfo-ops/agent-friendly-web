# Gate 6C.3B: Second Review-Ready Canary Attempt

**Fecha:** 2026-09-03

**Estado:** `corrected_single_canary_attempt_failed_no_retry_kill_switch_off`

## Declaracion de frontera

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_email_review_ready_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Cloudflare Worker, Access, Email Service binding, D1 y Rate Limiting aislados |
| `RESOURCE_ID` | Worker `agent-friendly-web-web-canary`; version temporal ON `932da22a-5eba-4fee-ab9b-5fc33c7c8027`; version OFF restaurada `7b25f69e-d30e-4ee4-be0e-c2deafed0f3d`; D1 `2b518988-eacb-4c31-b760-4e58c3c0285b` |
| `ALLOWED_ACTION` | exactamente un intento humano aprobado de la plantilla fija al unico destino privado del binding, sin campos libres ni reintentos |
| `ROLLBACK` | restaurar inmediatamente la version OFF `7b25f69e-d30e-4ee4-be0e-c2deafed0f3d` al 100% del canary aislado |

La operacion pertenecio exclusivamente a Agent Friendly Web. No uso recursos, datos, runtimes ni repositorios de Tokenizart y no modifico `https://agentfriendlyweb.dev`.

## Resultado del intento

La frontera autenticada mostro el kill switch habilitado, el boton fijo y ningun resultado previo. Se pulso una sola vez. La navegacion completo y devolvio `email_review_ready_delivery_failed`: hubo una invocacion al proveedor, cero correos entregados y cero reintentos.

El rollback se ejecuto de inmediato. El deployment `ce8635ee-03d5-4f21-96c4-46efb886aaf5` restauro la version OFF `7b25f69e-d30e-4ee4-be0e-c2deafed0f3d` al 100% del canary. El estado remoto vigente mantiene `AFW_EMAIL_REVIEW_READY_ENABLED=false`.

## Evidencia saneada

- dos intentos acumulados, cada uno aprobado individualmente;
- dos invocaciones acumuladas al proveedor;
- cero reintentos automaticos o manuales;
- D1: dos filas `failed`, cero `sent` y cero `reserved`;
- evento actual opaco: `afw-review-ready-20260903-0f20cb360cbe`;
- template `internal-review-ready-v1`, idioma `es`, proposito `internal_review_ready`;
- codigo saneado `provider_delivery_failed`;
- recibo de proveedor ausente;
- cuota diaria 200, uso enviado 0 y sin exceso de cuota;
- Gmail: cero coincidencias con el asunto exacto;
- ningun destinatario, asunto, cuerpo, identidad Access cruda ni error crudo persistido.

## Diagnostico

La hipotesis anterior no quedo validada. La version ejecutada contenia una propiedad propia `to: undefined`, pero el runtime remoto volvio a rechazar el mensaje. En una frontera JavaScript, un valor `undefined` puede no sobrevivir la conversion a la estructura nativa; ademas, la interfaz estructurada actual de Cloudflare exige `to`, aunque la configuracion de destinos fijos documenta la sustitucion para `null` o `undefined`.

El codigo desplegado solo conservaba `provider_delivery_failed`, por lo que no es posible afirmar si el rechazo fue `E_FIELD_MISSING`, remitente, destinatario u otra categoria. La evidencia no permite inventar una causa mas especifica.

## Candidata local siguiente

Se preparo mediante TDD `explicit_to_null_with_sanitized_provider_failure_codes`:

1. El mensaje fija `to: null`; el request continua sin aceptar destinatarios.
2. Los codigos conocidos del proveedor se traducen a categorias estables como `provider_field_missing`, `provider_sender_not_verified` o `provider_recipient_not_allowed`.
3. Mensajes, codigos desconocidos y detalles crudos del proveedor no se guardan ni se devuelven.
4. La entrega conserva semantica `at-most-once` y no incorpora reintentos.

Esta candidata queda local, sin otro envio y sin despliegue. Antes de cualquier nuevo intento debe superar validacion completa, desplegarse con el flag OFF, pasar una prueba negativa autenticada y recibir una nueva aprobacion humana exacta en el momento de la accion.

## Siguiente gate

1. Ejecutar suite completa, lint, build y `git diff --check`.
2. Revisar y publicar el cambio en el Draft PR sin merge.
3. Preparar una version canary con `to: null`, binding privado preservado y kill switch OFF.
4. Repetir solamente el probe negativo autenticado y comprobar que D1 no cambia.
5. Solicitar una nueva aprobacion puntual antes de otro y unico mensaje.

No se habilitan destinatarios arbitrarios, clientes, marketing, autorespuestas, adjuntos, CRM, pagos ni automatizacion.
