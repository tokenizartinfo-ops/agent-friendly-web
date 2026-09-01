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
stale_after: 2026-11-30T00:00:00Z
generated:
  by: process:agent-friendly-web-okf-generator
  at: 2026-09-01T00:00:00Z
verified:
  - by: human:gabriel-mucchiut
    at: 2026-09-01T00:00:00Z
sources:
  - id: source-1
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/39acfeeecc9f39911d2a5467893c36dc2223e253/docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md
    title: "Agent Friendly Web: roadmap agent-native"
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-09-01T00:00:00Z
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
- expediente privado del runtime transitorio congelado; reemplazo Cloudflare Access implementado localmente, aun sin canary ni trafico;
- Registry publico versionado con perfiles HTML, JSON y Markdown;
- guia publica `/aeo-y-crawlers` para educacion AEO, decisiones de crawling y valor comercial;
- catalogo `/.well-known/crawler-policy-catalog.json` con fuentes y finalidades por proveedor.
- contenido sectorial inicial para seis perfiles en ESP/ENG/POR;
- comparador local antes/despues y contrato `readiness-comparison.v1`;
- prototipo determinista de asistencia de intake y contrato `intake-assistant.v1`, sin persistencia ni acciones.
- bundle publico OKF v0.2 con 11 conceptos, manifiesto, procedencia, vigencia, licencia y SHA-256;
- pagina humana `/conocimiento-abierto` y descubrimiento OKF desde `llms.txt`, catalogos, sitemap y footer.
- CLI oficial read-only para auditoria, consulta Registry y verificacion OKF con JSON estable y `--dry-run`;
- guia conversacional publica `/guia`, determinista, citada y efimera, con continuidad inmediata y profundidad adaptable.
- MCP publico read-only en `https://mcp.agentfriendlyweb.dev/mcp`, con cuatro tools, cuatro resources y Worker independiente sin persistencia ni escritura.

### Planificado

- expansion de la biblioteca sectorial con casos, respuestas citables y fuentes especificas;
- monitoreo temporal y comparacion de politicas por crawler, buscador, asistente y uso de entrenamiento;
- ampliacion multidioma del resto de la experiencia, mas alla de la primera entrega sectorial;
- asistente de intake autenticado capaz de transferir propuestas aprobadas al expediente;
- canal de contacto propio de Agent Friendly Web con identidad, retencion y responsables definidos;
- MCP autenticado para expedientes autorizados y generacion de paquetes; el MCP publico read-only ya esta desplegado y permanece separado;
- A2A Agent Card cuando exista un agente remoto real, autenticado y observable;
- publicacion asistida mediante adaptadores limitados y aprobacion del owner.
- migracion del origen publico a un Worker Cloudflare-native, con canary Access, D1 aislada, paridad y rollback antes del corte DNS;
- paquetes o plugins oficiales por ecosistema, empezando por Tokenizart, Atelier y Agent Friendly Web, solo cuando cada marketplace o cliente tenga contrato y distribucion verificados;
- skills publicas versionadas y customizadas por organizacion, separadas de las skills internas de operacion;

### Investigacion

- evolucion y compatibilidad de WebMCP despues del primer registro publico read-only;
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
| `/.well-known/ai-catalog.json` | inventario de compatibilidad ARD | desplegado; propuesta en evolucion |
| `/.well-known/ard.json` | fuente ARD vigente segun el draft observado | desplegado; propuesta en evolucion |
| `/.well-known/infrastructure-status.json` | estado fechado del origen, candidato, superficies retiradas y gate siguiente | preparado en el candidato Cloudflare-native; 0% de trafico |
| `/.well-known/external-readiness.json` | historial AF-EV con procedencia y limites | desplegado y verificado; convencion del proyecto |
| `/.well-known/agent-skills/index.json` | indice de skills descargables | desplegado, convencion del proyecto |
| `/.well-known/agent-readiness.json` | estado de capacidades | desplegado, no es estandar oficial |
| `/.well-known/crawler-policy-catalog.json` | catalogo de identidades, finalidades y fuentes por crawler | desplegado, convencion del proyecto |
| `/.well-known/readiness-comparison-contract.json` | limites y campos del comparador local | preparado para release, convencion del proyecto |
| `/.well-known/intake-assistant-contract.json` | contrato fail-closed del prototipo de intake | preparado para release, convencion del proyecto |
| `/.well-known/public-guide-contract.json` | contrato y limites de la guia conversacional publica | desplegado, convencion del proyecto |
| `/.well-known/mcp/server-card.json` | server card del MCP publico read-only | desplegado |
| `/.well-known/mcp.json` | compatibilidad de descubrimiento MCP del proyecto | desplegado |
| `/schemas/mcp-result.v1.json` | contrato de salida saneada del MCP publico | desplegado |
| `/mcp-readonly` | explicacion humana de tools, resources y limites | desplegado |
| `https://mcp.agentfriendlyweb.dev/mcp` | Streamable HTTP stateless, `POST` read-only | desplegado |
| `/.well-known/security.txt` | contacto y politica de seguridad | desplegado |
| `/conocimiento-abierto` | explicacion humana del conocimiento publico versionado | desplegado |
| `/okf/v0.2/index.md` | indice machine-readable del bundle OKF v0.2 | desplegado |
| `/okf/v0.2/manifest.json` | inventario, metadata y hashes de distribucion | desplegado |
| `/okf/v0.2/CHECKSUMS.sha256` | verificacion SHA-256 del bundle publicado | desplegado |
| `/cli` | explicacion humana de la CLI read-only | desplegado |
| `/cli/index.md` | instalacion, comandos, limites y codigos de salida | desplegado |
| `/.well-known/agent-friendly-cli.json` | manifiesto de capacidades y restricciones CLI | desplegado, convencion del proyecto |
| `/schemas/cli-response.v1.json` | contrato JSON estable de respuestas CLI | desplegado |
| `/schemas/publication-capsule.v1.json` | contrato del paquete manual, archivos, hashes, destinos y limites | desplegado |
| `/schemas/capsule-decision.v1.json` | contrato de aprobacion o rechazo ligado al hash del manifiesto | desplegado |
| `/schemas/origin-comparison.v1.json` | contrato cerrado del diff publico acotado | desplegado |
| `/schemas/draft-pr-plan.v1.json` | plan tecnico no enviado, sin merge ni despliegue | desplegado; envio remoto deshabilitado |
| `Accept: text/markdown` sobre `/` | variante Markdown negociada del inicio | desplegado y verificado |
| WebMCP `afw.audit_public_site` | tool in-page read-only para auditoria publica | desplegado y verificado; tecnologia experimental |
