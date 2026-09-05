# Gate 6D.3 - Verificacion remota de bandeja CRM sintetica read-only

Fecha: 2026-09-03

## Resultado

El Gate 6D.3 alcanzo `synthetic_crm_readonly_verified_kill_switch_off`. La unica oportunidad sintetica creada en Gate 6D.2 pudo leerse desde una superficie privada y humana sin habilitar ninguna operacion comercial.

## Frontera remota

- proyecto: Agent Friendly Web;
- repositorio: `tokenizartinfo-ops/agent-friendly-web`;
- entorno: `afw_canary`;
- origen: `https://canary.agentfriendlyweb.dev`;
- Worker: `agent-friendly-web-web-canary`;
- D1: `agent-friendly-web-web-canary` (`2b518988-eacb-4c31-b760-4e58c3c0285b`);
- operacion permitida: unicamente `GET` autenticado y saneado;
- produccion publica y recursos Tokenizart: fuera de alcance.

## Ventana controlada

1. La version OFF `2d077362-0811-4fc1-96c6-fad8b46b598c` quedo al 100% como baseline.
2. La version temporal ON `6d7abfe4-5e51-41ce-ae76-9e5793081f1d` se asigno al 100% del canary protegido.
3. Una sesion Cloudflare Access autorizada cargo la bandeja y recibio `synthetic_crm_readonly_ready`.
4. La vista mostro solo `example.invalid`, etapa `qualified`, alcances `discovery_pack` y `external_evidence`, y transicion `new -> qualified`.
5. No aparecieron formularios ni controles para cambiar etapa, enviar correo, crear propuestas, cobrar o modificar sitios.
6. D1 conservo una oportunidad y una transicion; la comprobacion registro `rows_written=0`.
7. El deployment `d438d606-eec6-461c-970e-abb1264fa323` devolvio la version OFF al 100%.

## Saneamiento

La respuesta no expuso correo, nombre, telefono, mensajes, `contact_ref`, hash de actor, claves de idempotencia, hashes de solicitud, IDs opacos de oportunidad o transicion ni credenciales. El origen anonimo continuo protegido por Cloudflare Access con respuesta `302`.

## Estado final

- flag `AFW_SYNTHETIC_CRM_READONLY_ENABLED`: OFF;
- D1: sin nuevas filas y sin escrituras;
- contactos reales: no utilizados;
- correo: no enviado;
- propuesta: no creada;
- pago: no ejecutado;
- sitio de cliente: no modificado;
- produccion publica: no modificada;
- Draft PR #49: conserva estado Draft.

La captacion real permanece cerrada. Antes de almacenar datos de personas debe existir una especificacion separada y aprobada de finalidad, consentimiento, retencion, rectificacion y borrado.
