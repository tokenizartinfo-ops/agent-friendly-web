# Agent Friendly Web: roadmap agent-native

**Fecha:** 2026-08-26  
**Responsable:** Gabriel Mucchiut  
**Estado:** implementacion progresiva  
**Origen canonico:** `https://agentfriendlyweb.dev`

## Proposito

Agent Friendly Web debe demostrar en su propia infraestructura el metodo que ofrece a terceros. El objetivo no es acumular nombres de protocolos, sino permitir que personas y agentes descubran que existe, comprendan que hace, distingan evidencia de declaracion y utilicen solamente capacidades publicadas y seguras.

La meta de 100% representa la finalizacion de las capas que el caso necesita. No exige activar cada tecnologia disponible ni autoriza a presentar un roadmap como producto operativo.

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
- expediente privado con identidad de Sites y campos allowlisted.

### Planificado

- Registry publico versionado y verificacion read-only de dominio;
- CLI oficial para auditar y preparar artefactos sin escribir en el sitio;
- MCP server read-only para auditoria, consulta de expedientes autorizados y generacion de paquetes;
- A2A Agent Card cuando exista un agente remoto real, autenticado y observable;
- publicacion asistida mediante adaptadores limitados y aprobacion del owner.

### Investigacion

- WebMCP para interaccion declarada desde una pagina compatible;
- x402 para servicios concretos donde un pago por recurso tenga sentido;
- pagos por crawl de Cloudflare, sujeto a disponibilidad, economia y politica editorial;
- sincronizacion con proveedores y CMS sin exponer credenciales al modelo.

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
| `/.well-known/security.txt` | contacto y politica de seguridad | desplegado |

## Secuencia hacia herramientas y delegacion

1. **Descubrir:** crawlers permitidos localizan paginas y recursos publicos.
2. **Comprender:** contenido humano, JSON-LD y documentos agenticos expresan la misma realidad.
3. **Citar:** cada afirmacion relevante conserva origen, fecha, responsable y limites.
4. **Consultar:** OpenAPI, skills y luego MCP exponen funciones read-only reales.
5. **Delegar:** identidad, consentimiento, scopes, idempotencia, auditoria y revocacion preceden cualquier escritura.
6. **Coordinar:** A2A se incorpora cuando exista un agente remoto capaz de aceptar y seguir tareas.
7. **Pagar:** x402 u otro mecanismo se evalua para un servicio definido; nunca reemplaza autorizacion.

## Demostracion de valor

El comparador en `/evolucion-agentica` muestra tres casos:

- un restaurante puede pasar de horarios dispersos a disponibilidad consultable y reserva controlada;
- una municipalidad puede pasar de paginas ambiguas a requisitos, vencimientos y tramites citables;
- Tokenizart puede pasar de ser confundido con un marketplace NFT a explicar correctamente identidad ERC-721, Atelier, provenance y herramientas owner-scoped.

Las respuestas son ilustrativas. Ninguna mejora garantiza que GPT, Gemini, Claude u otro proveedor indexe, posicione, recomiende o redacte una respuesta determinada.

## Referencias primarias

- Cloudflare AI Crawl Control: `https://developers.cloudflare.com/ai-crawl-control/`
- Cloudflare Markdown for Agents: `https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/`
- MCP: `https://modelcontextprotocol.io/specification/2026-07-28`
- A2A: `https://a2a-protocol.org/latest/specification`
- x402: `https://github.com/x402-foundation/x402`
- OpenAPI: `https://spec.openapis.org/oas/latest.html`
- Schema.org: `https://schema.org/`

## Gate inmediato

La siguiente etapa del Registry persiste los campos ampliados, agrega verificacion de dominio read-only y permite crear una atestacion publica versionada. Hasta completar ese gate, el formulario ampliado es un contrato saneado y no una publicacion automatica.
