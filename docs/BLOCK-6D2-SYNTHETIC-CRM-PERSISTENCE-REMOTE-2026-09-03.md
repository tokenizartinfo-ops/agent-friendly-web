# Gate 6D.2 - Evidencia remota de persistencia CRM sintetica

Fecha: 2026-09-03

## Resultado

El Gate 6D.2 alcanzo `synthetic_crm_persistence_verified_kill_switch_off` en `afw_canary`. La prueba creo exactamente una oportunidad sintetica, registro su transicion de `new` a `qualified`, demostro replay idempotente y termino con la bandera apagada.

## Frontera ejecutada

- proyecto: Agent Friendly Web;
- repositorio: `tokenizartinfo-ops/agent-friendly-web`;
- origen: `https://canary.agentfriendlyweb.dev`;
- Worker: `agent-friendly-web-web-canary`;
- D1: `agent-friendly-web-web-canary`;
- produccion publica: no modificada;
- recursos Tokenizart: no utilizados;
- contactos reales: no utilizados.

## Backup y migracion

Antes de la migracion se registro el bookmark D1 `0000002d-00000000-000050db-4a52b3919da8ee93781cffd2e8ce13f0`. La unica migracion pendiente era `0007_synthetic_crm_lite.sql`; se aplico en canary y creo las dos tablas vacias sin modificar los conteos preexistentes.

Conteos antes: 1 contacto sintetico, 1 consentimiento `requested_plan`, 4 registros tecnicos de correo, 0 oportunidades y 0 transiciones.

## Ventana controlada

1. La version OFF `42ebda4f-cec1-4708-96c7-4bfa4ef97cd5` respondio `404` con Access verificado.
2. La version temporal ON `19899ef3-281e-4cbd-95ae-be4f6c1db902` se promovio al canary privado mediante deployment `ddfdd697-cb7c-4d87-b14a-41aa2bdc6e09`.
3. El primer POST fijo devolvio `201`, estado `synthetic_opportunity_persisted` y etapa `qualified`.
4. El replay identico devolvio `200`, estado `synthetic_opportunity_already_persisted` y `duplicate=true`.
5. D1 confirmo 1 oportunidad, 1 transicion, 1 fila `qualified` y metadatos saneados.
6. El deployment `f4372d5a-3def-46ee-93a4-db93e7cdd6d7` restauro la version OFF al 100%.
7. El POST autenticado final devolvio `404`.
8. La cookie temporal de Access fue eliminada.

## Invariantes

Los conteos finales permanecen en 1 contacto sintetico, 1 consentimiento, 4 registros tecnicos de correo, 1 oportunidad y 1 transicion. El gate no envia correos, no crea propuestas, no cobra pagos, no modifica sitios de clientes y no acepta contactos reales.

## Evidencia machine-readable

`/.well-known/synthetic-crm-persistence-evidence.json`

## Siguiente gate

El CRM real permanece cerrado. El siguiente incremento debe ser de lectura y revision humana sobre la oportunidad sintetica ya persistida, o una especificacion separada para captacion real con privacidad, retencion, consentimiento y borrado definidos. Ninguno queda autorizado por esta prueba.
