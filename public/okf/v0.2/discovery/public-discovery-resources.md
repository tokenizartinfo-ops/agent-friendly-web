---
type: Reference
title: Recursos publicos de descubrimiento
description: Superficies desplegadas, planificadas y en investigacion sin mezclar estados.
resource: https://agentfriendlyweb.dev/mapa-del-sitio
tags:
  - agent-friendly-web
  - discovery
  - catalog
status: stable
stale_after: 2026-11-25T00:00:00Z
generated:
  by: process:agent-friendly-web-okf-generator
  at: 2026-08-27T00:00:00Z
verified:
  - by: human:gabriel-mucchiut
    at: 2026-08-27T00:00:00Z
sources:
  - id: source-1
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md
    title: "Agent Friendly Web: roadmap agent-native"
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-08-27T00:00:00Z
---
# Recursos publicos de descubrimiento

## Estado verificable de esta entrega

### Desplegado

- sitio humano con origen canonico, TLS y sitemap;
- `robots.txt` con rutas privadas excluidas y politica diferenciada para busqueda, asistencia y entrenamiento;
- `llms.txt` y `llms-full.txt`;
- JSON-LD visible en la portada;
- OpenAPI de la auditoria publica read-only y API Catalog;
- catalogo publico de recursos;
- skill publica de auditoria con limites;
- manifiesto propio `/.well-known/agent-readiness.json`;
- politica `/.well-known/security.txt`;
- comparador ilustrativo AF-0 a AF-5;
- expediente privado con identidad de Sites y campos allowlisted;
- Registry publico versionado con perfiles HTML, JSON y Markdown;
- guia publica `/aeo-y-crawlers` para educacion AEO, decisiones de crawling y valor comercial;
- catalogo `/.well-known/crawler-policy-catalog.json` con fuentes y finalidades por proveedor.
- contenido sectorial inicial para seis perfiles en ESP/ENG/POR;
- comparador local antes/despues y contrato `readiness-comparison.v1`;
- prototipo determinista de asistencia de intake y contrato `intake-assistant.v1`, sin persistencia ni acciones.

### Planificado

- expansion de la biblioteca sectorial con casos, respuestas citables y fuentes especificas;
- perfiles OKF v0.2 exportables para conocimiento publico con procedencia, confianza y ciclo de vida;
- monitoreo temporal y comparacion de politicas por crawler, buscador, asistente y uso de entrenamiento;
- ampliacion multidioma del resto de la experiencia, mas alla de la primera entrega sectorial;
- asistente de intake autenticado capaz de transferir propuestas aprobadas al expediente;
- canal de contacto propio de Agent Friendly Web con identidad, retencion y responsables definidos;
- CLI oficial para auditar y preparar artefactos sin escribir en el sitio;
- MCP server read-only para auditoria, consulta de expedientes autorizados y generacion de paquetes;
- A2A Agent Card cuando exista un agente remoto real, autenticado y observable;
- publicacion asistida mediante adaptadores limitados y aprobacion del owner.
- paquetes o plugins oficiales por ecosistema, empezando por Tokenizart, Atelier y Agent Friendly Web, solo cuando cada marketplace o cliente tenga contrato y distribucion verificados;
- skills publicas versionadas y customizadas por organizacion, separadas de las skills internas de operacion;

### Investigacion

- WebMCP para interaccion declarada desde una pagina compatible;
- x402 para servicios concretos donde un pago por recurso tenga sentido;
- pagos por crawl de Cloudflare, sujeto a disponibilidad, economia y politica editorial;
- sincronizacion con proveedores y CMS sin exponer credenciales al modelo.
- WebMCP en ChatGPT, Codex u otros clientes compatibles, manteniendolo como linea experimental hasta verificar especificacion, soporte y seguridad;
- rampas de cobro fiat y cripto para servicios definidos, con conciliacion, comprobantes y aprobacion contable;

## Recursos de descubrimiento

| Recurso | Funcion | Estado |
| --- | --- | --- |
| `/robots.txt` | politica de rastreo y exclusion de rutas privadas | desplegado |
| `/sitemap.xml` | mapa de paginas publicas | desplegado |
| `/llms.txt` | indice conciso para agentes | desplegado, propuesta comunitaria |
| `/llms-full.txt` | contexto publico extendido | desplegado, convencion del proyecto |
| `/openapi.json` | contrato de auditoria publica | desplegado |
| `/api-catalog` | linkset hacia OpenAPI | desplegado |
| `/.well-known/ai-catalog.json` | inventario publico | desplegado, no es estandar oficial |
| `/.well-known/agent-skills/index.json` | indice de skills descargables | desplegado, convencion del proyecto |
| `/.well-known/agent-readiness.json` | estado de capacidades | desplegado, no es estandar oficial |
| `/.well-known/crawler-policy-catalog.json` | catalogo de identidades, finalidades y fuentes por crawler | desplegado, convencion del proyecto |
| `/.well-known/readiness-comparison-contract.json` | limites y campos del comparador local | preparado para release, convencion del proyecto |
| `/.well-known/intake-assistant-contract.json` | contrato fail-closed del prototipo de intake | preparado para release, convencion del proyecto |
| `/.well-known/security.txt` | contacto y politica de seguridad | desplegado |
