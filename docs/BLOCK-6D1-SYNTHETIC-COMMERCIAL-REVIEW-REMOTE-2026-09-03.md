# Gate 6D.1 - Revision comercial sintetica remota

**Estado:** `synthetic_commercial_review_verified_kill_switch_off`

**Fecha:** 2026-09-03

## Objetivo verificado

Se comprobo en `afw_canary` que Agent Friendly Web puede leer exactamente una solicitud sintetica consentida y convertirla en un plan comercial saneado para revision humana. El resultado conserva el estado `planned_not_persisted`: describe el posible paso `new -> qualified`, pero no lo guarda ni ejecuta.

## Frontera remota

- `PROJECT`: `agent-friendly-web`;
- `REPOSITORY`: `tokenizartinfo-ops/agent-friendly-web`;
- `ENVIRONMENT`: `afw_canary`;
- `ORIGIN`: `https://canary.agentfriendlyweb.dev`;
- `RESOURCE_TYPE`: Worker + D1 read-only;
- `RESOURCE_ID`: `agent-friendly-web-web-canary` + D1 `2b518988-eacb-4c31-b760-4e58c3c0285b`;
- `ALLOWED_ACTION`: desplegar codigo con flag apagado, realizar una lectura fija autenticada y volver al baseline apagado;
- `ROLLBACK`: version `6f7d0d6c-239c-4356-a016-eb7348ea9bb1` al 100%.

Produccion publica, correo, pagos, propuestas, datos reales, sitios de clientes y recursos Tokenizart quedaron fuera de alcance.

## Secuencia observada

1. El baseline con `AFW_SYNTHETIC_COMMERCIAL_REVIEW_ENABLED=false` rechazo la API con HTTP 404 y codigo `synthetic_commercial_review_unavailable`.
2. Se cargo la version temporal `bcc86013-238f-4520-b696-0e14eb255f35`, conservando D1, Access, secretos, Send Email y rate limits existentes. Solo el flag de este gate quedo en `true`; las capacidades de contacto, correo y despliegue remoto siguieron apagadas.
3. La version temporal se asigno al 100% del origen privado mediante el deployment `7a05c46b-1864-4628-adbd-0a9136f17614`.
4. Una sesion Cloudflare Access allowlisted solicito `GET /api/canary/commercial-review` y recibio HTTP 200 con contrato `agent-friendly-web.synthetic-commercial-review.v1` y estado `planned_not_persisted`.
5. La salida incluyo referencias opacas y bloqueo explicito de persistencia, correo, propuesta, pago y modificacion de sitios. No expuso email, nombre, mensaje ni UUID fuente.
6. La vista `/canary/commercial-review` se reviso a 1440 x 900 y 390 x 844. El contenido fue legible, sin superposiciones y con etiquetas humanas de solo lectura.
7. D1 mantuvo los mismos conteos antes, durante y despues. Cada consulta informo `changes=0`, `changed_db=false` y `rows_written=0`.
8. Se restauro el baseline apagado mediante el deployment `0adf2853-bfb4-4449-8ccc-849a1364b0d4`. La API volvio a responder HTTP 404 con `synthetic_commercial_review_unavailable`.

## Conteos D1 invariantes

| Indicador | Antes | Despues |
| --- | ---: | ---: |
| Solicitudes sinteticas | 1 | 1 |
| Consentimientos `requested_plan` | 1 | 1 |
| Filas de email | 4 | 4 |
| Email `sent` | 1 | 1 |
| Email `failed` | 3 | 3 |
| Email `reserved` | 0 | 0 |
| Filas escritas por la consulta | 0 | 0 |

## Resultado

El puente sintetico es funcional, privado, reversible y no mutante. El canary queda otra vez con el kill switch apagado. Este resultado no habilita datos reales, CRM persistente, scoring, contacto comercial, propuestas ni cobros.

La evidencia estructurada esta en `docs/evidence/synthetic-commercial-review-remote-2026-09-03.json`.
