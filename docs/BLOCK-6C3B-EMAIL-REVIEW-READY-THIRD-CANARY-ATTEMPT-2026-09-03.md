# Gate 6C.3B: Third Review-Ready Canary Attempt

**Fecha:** 2026-09-03

**Estado:** `third_canary_failed_private_destination_candidate_local_off`

## Declaracion de frontera

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_email_review_ready_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Cloudflare Worker, Access, Email Service binding, D1 y Rate Limiting aislados |
| `RESOURCE_ID` | Worker `agent-friendly-web-web-canary`; version temporal ON `b9949bbc-685b-406d-abe5-905ae9a9e394`; deployment ON `ca3d0d7c-2d27-4099-9e28-f69070274519`; version OFF restaurada `8d759339-5caf-4492-bf6a-ff6a2b3f9801`; deployment rollback `b96030cd-0e9b-4ec8-bd17-8c2807b829b0`; D1 `2b518988-eacb-4c31-b760-4e58c3c0285b` |
| `ALLOWED_ACTION` | exactamente un intento humano aprobado de la plantilla fija al unico destino privado, sin campos libres ni reintentos |
| `ROLLBACK` | restaurar inmediatamente la version OFF `8d759339-5caf-4492-bf6a-ff6a2b3f9801` al 100% del canary aislado |

La operacion pertenecio exclusivamente a Agent Friendly Web. No uso recursos de Tokenizart ni modifico el origen publico `https://agentfriendlyweb.dev`.

## Resultado y cierre

El operador autenticado confirmo la accion en el momento exacto, actualizo la interfaz privada y pulso una sola vez `Enviar el unico correo fijo`. La ruta devolvio `HTTP 502`, `sent=false` y `email_review_ready_delivery_failed`. Hubo una invocacion al proveedor, cero entregas y cero reintentos.

El deployment `b96030cd-0e9b-4ec8-bd17-8c2807b829b0` restauro inmediatamente la version OFF. La verificacion posterior confirmo `AFW_EMAIL_REVIEW_READY_ENABLED=false`. D1 conserva tres filas `failed`, cero `sent` y cero `reserved`.

## Diagnostico acotado

La sustitucion de `to: null` documentada por Cloudflare no quedo verificada en este runtime. El proveedor no expuso un codigo allowlisted, por lo que la auditoria conservo unicamente `provider_delivery_failed`; no se guardaron el error crudo, el destinatario ni el contenido.

La explicacion mas consistente es una incompatibilidad entre esa sustitucion y el `EmailMessageBuilder` efectivo: los tipos generados del runtime requieren al menos uno de `to`, `cc` o `bcc` con una direccion valida. Esto es una inferencia tecnica respaldada por el comportamiento observado y los tipos locales, no una afirmacion sobre todos los runtimes de Cloudflare.

## Candidata local siguiente

Se preparo por TDD `explicit_to_private_runtime_destination`:

1. El request sigue rechazando destinatario, asunto, cuerpo y adjuntos.
2. La direccion se obtiene exclusivamente de una variable privada del Worker y nunca del navegador.
3. El binding de Cloudflare sigue restringido al mismo destino fijo, por lo que existen dos controles coincidentes.
4. Si la variable privada falta o es invalida, la ruta falla antes de leer el cuerpo o reservar una entrega.
5. La semantica sigue siendo `at-most-once`, sin reintento automatico.

Las pruebas especificas pasaron `16/16`. La candidata no fue desplegada, no se provisiono la variable privada y el gate queda sin cuarto intento.

## Siguiente gate

El proximo gate debe validar la suite completa, provisionar la variable privada fuera de Git, desplegar con el kill switch OFF y repetir solo la prueba negativa autenticada. Un nuevo correo requiere otra confirmacion humana puntual en el momento de la accion.

No se habilitan destinatarios arbitrarios, clientes, marketing, autorespuestas, adjuntos, CRM, pagos ni automatizacion.
