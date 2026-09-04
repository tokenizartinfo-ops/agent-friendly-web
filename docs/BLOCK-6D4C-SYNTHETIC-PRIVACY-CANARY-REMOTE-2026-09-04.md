# Gate 6D.4C - ciclo de privacidad sintetico remoto

**Estado:** `private_synthetic_lifecycle_verified_kill_switch_off`

**Fecha:** 2026-09-04

## Alcance observado

- `PROJECT`: `agent-friendly-web`;
- `REPOSITORY`: `tokenizartinfo-ops/agent-friendly-web`;
- `ENVIRONMENT`: `afw_canary`;
- `ORIGIN`: `https://canary.agentfriendlyweb.dev`;
- Worker: `agent-friendly-web-web-canary`;
- D1 canary: `agent-friendly-web-web-canary` / `2b518988-eacb-4c31-b760-4e58c3c0285b`;
- D1 produccion: `agent-friendly-web-web-production` / `d26fc9d2-df5a-4957-8e58-cc4c945faad8`.

La aplicacion Access `dc905004-16dc-4174-b6ec-bb9911f6965c`, la politica `39a8f0e6-419f-4c21-b8af-eabd6295a9b9` y la audiencia `5e6f80fdd77e026d6e9f513d4614d22e10cba0f7a90ea4bf7a10b27d6de67a45` conservaron exactamente una politica allow, una identidad permitida y ninguna politica bypass. La identidad se omite deliberadamente de esta evidencia metadata-only.

## Recuperacion y migracion

Antes de la migracion se registro el bookmark D1 Time Travel `00000037-00000000-000050dc-743c3544fbd07da4b625026cf0c8d4f5`. La migracion aditiva `0008_contact_privacy_lifecycle.sql` se aplico correctamente solo a la D1 canary y la lista final no tuvo migraciones pendientes.

Las versiones observadas fueron:

| Etapa | Version Worker |
| --- | --- |
| Baseline previo OFF | `4ac5d285-b8eb-40e4-8cfd-5624dcba37bf` |
| Codigo posterior a migracion, OFF | `b8122cf6-00f6-401a-b949-b57b97994192` |
| Cambio de secreto | `3159b5d8-ddea-40ca-8c96-d46220a0f225` |
| Ventana acotada ON | `83890e0e-55b4-4b2d-9504-94b4d12419bd` |
| Cierre final OFF | `5105a6f1-a7b9-40ec-aa1a-9f650cf3ff5c` |

El secreto HMAC se genero desde 48 bytes aleatorios y se canalizo directamente. Solo se observo la existencia del binding; ningun valor se guardo localmente ni se publico.

## Estado previo

| Indicador | Conteo |
| --- | ---: |
| Contactos | 1 |
| Fixture fijo `.invalid` elegible | 1 |
| Grants `requested_plan` | 1 |
| Eventos de consentimiento nuevos | 0 |
| Solicitudes de privacidad | 0 |
| Supresiones | 0 |
| Eventos de lifecycle | 0 |
| Entregas de email | 4 |

## Ejecucion observada

La primera ejecucion autenticada devolvio `synthetic_privacy_lifecycle_completed`. El replay devolvio `synthetic_privacy_lifecycle_already_completed` y no agrego eventos.

El unico contacto quedo borrado de forma segura: `email`, `name`, `domain`, `role`, `organization`, `objective`, `source` y `request_hash` quedaron vacios; `state` quedo en `erased`, `erased_at` poblado y `restriction_state` en `none`. La eliminacion sintetica exitosa no se restauro.

| Resultado | Conteo final |
| --- | ---: |
| Eventos de consentimiento | 2 |
| `commercial_contact` granted | 1 |
| `commercial_contact` withdrawn | 1 |
| Solicitudes de privacidad resueltas | 4 |
| `access_export` / `deletion` / `rectification` / `withdraw_consent` | 1 cada una |
| Supresiones | 2 |
| `commercial_contact/consent_withdrawal` | 1 |
| `requested_plan/subject_deletion` | 1 |
| Eventos de lifecycle | 3 |
| `deleted/identifiers_erased` | 1 |
| `exported/subject_export_hashed` | 1 |
| `suppressed/commercial_contact_withdrawn` | 1 |

Las entregas de email permanecieron en 4: 3 `failed` y 1 `sent`. Este gate realizo 0 envios mediante proveedor.

## Cierre remoto

La version final lista `AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED=false`. Los cuatro flags de datos reales permanecen en `false` y todos los demas flags sinteticos de escritura permanecen apagados. El binding HMAC existe sin exponer su valor.

- la pagina privada autenticada responde HTTP 404;
- el POST autenticado responde HTTP 404 con `synthetic_privacy_lifecycle_unavailable`;
- una solicitud anonima redirige a Access;
- Access conserva una politica allow y cero bypass;
- `https://agentfriendlyweb.dev/` responde HTTP 200;
- la D1 de produccion sigue separada, con 14 tablas, `write_queries_24h=0` y `rows_written_24h=0`.

No se uso ningun recurso Tokenizart, contacto real, envio de email, propuesta, pago o sitio de cliente. No hubo mutacion de la D1 de produccion.

## Rollback y decision

La version Worker previa permanece disponible. El bookmark Time Travel fue registrado, pero no se uso porque la migracion y el probe sintetico finalizaron correctamente. El contacto sintetico borrado no se recupero.

Gate 6D.4C demuestra solamente un lifecycle privado y sintetico en `afw_canary`, con replay idempotente y cierre OFF. No demuestra preparacion de privacidad para datos reales ni aprobacion legal. El siguiente gate es exactamente `private_human_privacy_pilot_legal_review_required`.

La evidencia estructurada esta en `docs/evidence/synthetic-privacy-lifecycle-canary-remote-2026-09-04.json`.
