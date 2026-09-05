# Gate 6D.3 - Bandeja CRM sintetica read-only

Fecha: 2026-09-03

## Objetivo

Permitir que una persona autorizada comprenda visualmente la oportunidad sintetica persistida en Gate 6D.2 sin habilitar ninguna accion comercial. La vista convierte metadatos tecnicos en etapa, necesidad, alcance, siguiente paso e historia de transicion legibles.

## Frontera

- proyecto: Agent Friendly Web;
- repositorio: `tokenizartinfo-ops/agent-friendly-web`;
- entorno remoto eventual: `afw_canary`;
- origen: `https://canary.agentfriendlyweb.dev`;
- recurso: Worker `agent-friendly-web-web-canary` y su D1 aislada;
- operacion permitida: lectura de una oportunidad sintetica del actor autenticado;
- produccion publica: fuera de alcance;
- recursos Tokenizart: fuera de alcance.

## Flujo

1. Cloudflare Access valida la sesion y la audiencia del canary.
2. El Worker transforma el sujeto verificado en un hash y exige su presencia en la allowlist.
3. D1 busca una sola oportunidad `example.invalid` y su transicion, ambas vinculadas al mismo hash.
4. El lector rechaza ausencia, duplicidad, etapa inesperada o JSON invalido.
5. La API devuelve solo dominio sintetico, clasificacion, etapa, alcance, siguiente paso y fechas.
6. La interfaz presenta una bandeja responsiva y una linea temporal, sin formularios ni controles de mutacion.

No se devuelven `contact_ref`, hashes de actor, claves de idempotencia, hashes de solicitud, email, nombre, telefono, mensajes ni credenciales.

## Controles

- `GET` exacto, HTTPS y sin query string;
- Cloudflare Access y sujeto allowlisted;
- `Cache-Control: no-store, private`;
- `X-Robots-Tag: noindex, nofollow` en la vista;
- consulta parametrizada y solo lectura;
- una unica fila sintetica admitida;
- flag `AFW_SYNTHETIC_CRM_READONLY_ENABLED=false` por defecto en local, canary y produccion.

## Acciones bloqueadas

- editar metadatos o cambiar etapa;
- incorporar contactos reales;
- enviar correos;
- crear propuestas;
- cobrar pagos;
- modificar sitios de clientes;
- usar recursos Tokenizart;
- publicar o fusionar en produccion.

## Estado

`synthetic_crm_readonly_verified_kill_switch_off`. La ventana remota comenzo con el flag apagado, habilito temporalmente una sola lectura autenticada y termino otra vez en OFF. La interfaz mostro exclusivamente el dominio sintetico `example.invalid`, la etapa `qualified`, los dos alcances permitidos y la transicion `new -> qualified`.

La consulta posterior mantuvo una oportunidad y una transicion, con `rows_written=0`. Produccion publica, contactos reales, correo, propuestas, pagos, sitios de clientes y recursos Tokenizart quedaron fuera de alcance. La evidencia verificable vive en `public/.well-known/synthetic-crm-readonly-evidence.json` y el acta remota en `docs/BLOCK-6D3-SYNTHETIC-CRM-READONLY-REMOTE-2026-09-03.md`.
