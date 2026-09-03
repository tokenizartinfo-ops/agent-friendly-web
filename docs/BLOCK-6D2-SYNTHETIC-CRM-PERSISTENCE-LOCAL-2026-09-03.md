# Gate 6D.2 - Persistencia sintetica CRM Lite

Fecha: 2026-09-03

## Objetivo

Probar localmente el primer paso de persistencia comercial sin abrir captacion real. El flujo toma la revision sintetica ya validada, guarda una oportunidad artificial y registra una sola transicion de `new` a `qualified`.

## Frontera

- proyecto: Agent Friendly Web;
- repositorio: `tokenizartinfo-ops/agent-friendly-web`;
- entorno objetivo posterior: `afw_canary`;
- origen: `https://canary.agentfriendlyweb.dev`;
- recurso: D1 `agent-friendly-web-web-canary`;
- operacion permitida: una escritura sintetica, fija e idempotente;
- produccion publica: fuera de alcance;
- recursos Tokenizart: fuera de alcance.

## Datos y controles

Las tablas `crm_opportunities` y `crm_transition_events` almacenan metadatos operativos, hashes de actor e idempotencia. No tienen columnas de email, nombre, telefono, mensaje, notas o credenciales. La operacion exige Cloudflare Access, allowlist por hash, mismo origen, cuerpo JSON exacto y rate limit.

La migracion es aditiva. La bandera `AFW_SYNTHETIC_CRM_PERSISTENCE_ENABLED` queda en `false` por defecto en local, canary y produccion.

## Limites

- no acepta contactos reales;
- no envia correos;
- no crea propuestas;
- no cobra pagos;
- no modifica sitios de clientes;
- no habilita automatizaciones comerciales;
- no cambia produccion.

## Prueba prevista

1. Aplicar la migracion unicamente a D1 canary con bookmark previo.
2. Verificar tablas vacias y conteos preexistentes sin cambios.
3. Publicar el Worker con la bandera apagada y confirmar `404`.
4. Habilitar temporalmente una version privada.
5. Ejecutar una sola escritura fija y esperar `201`.
6. Repetir la misma solicitud y esperar `200` sin filas nuevas.
7. Confirmar una oportunidad, una transicion y etapa final `qualified`.
8. Volver a la version con interruptor apagado.

## Estado

`local_ready_remote_disabled`. La ejecucion remota y su evidencia pertenecen a un gate posterior de canary.
