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
- capa AEO basada en respuestas citables, entidades consistentes, actualidad y medicion comparativa;
- perfiles OKF v0.2 exportables para conocimiento publico con procedencia, confianza y ciclo de vida;
- politicas diferenciadas por crawler, buscador, asistente y uso de entrenamiento;
- experiencia multidioma en espanol, ingles y portugues;
- asistente de intake capaz de ordenar texto o audio desestructurado antes de pedir aprobacion;
- CLI oficial para auditar y preparar artefactos sin escribir en el sitio;
- MCP server read-only para auditoria, consulta de expedientes autorizados y generacion de paquetes;
- A2A Agent Card cuando exista un agente remoto real, autenticado y observable;
- publicacion asistida mediante adaptadores limitados y aprobacion del owner.

### Investigacion

- WebMCP para interaccion declarada desde una pagina compatible;
- x402 para servicios concretos donde un pago por recurso tenga sentido;
- pagos por crawl de Cloudflare, sujeto a disponibilidad, economia y politica editorial;
- sincronizacion con proveedores y CMS sin exponer credenciales al modelo.

## Producto humano y producto agentico

Agent Friendly Web tiene dos usuarios distintos que deben recibir la misma verdad en formatos adecuados:

1. **El responsable humano del sitio**, que contrata, define objetivos, aporta contexto, aprueba publicaciones y necesita comprender el cambio en los habitos de busqueda.
2. **El agente o LLM consumidor**, que necesita contenido estructurado, fuentes, contratos, limites y herramientas verificables para descubrir, responder o actuar.

La venta inicial se dirige a humanos. La entrega, sin embargo, debe mejorar simultaneamente la comprension humana y el consumo por maquinas. Una interfaz visual antigua no impide renovar la capa documental y estructurada, pero tampoco justifica ocultar una experiencia humana deficiente: ambas superficies se auditan por separado.

La comunicacion comercial debe explicar una urgencia real, no fabricar escasez. El costo de no actuar es mantener informacion fragmentada, desactualizada o ambigua mientras mas busquedas se trasladan a asistentes y respuestas sintetizadas. La plataforma no promete posiciones, citas, trafico, conversiones ni recomendaciones de un modelo determinado.

## Capa AEO y respuesta preparada

La optimizacion para motores de respuesta se implementara como una disciplina de contenido y evidencia, no como una certificacion ni como un reemplazo magico del SEO. Cada proyecto podra recibir:

- inventario de preguntas reales de sus audiencias;
- respuestas breves y extensas con fuentes, fecha, responsable y limites;
- normalizacion de entidades, nombres, productos, servicios, ubicaciones, horarios y politicas;
- conciliacion entre contenido visible, JSON-LD, sitemap, Markdown y documentos agenticos;
- deteccion de contradicciones, contenido vencido y paginas sin respuesta clara;
- comparaciones periodicas de respuestas observadas en buscadores y LLMs, sin atribuir causalidad no demostrada;
- recomendaciones AEO/SEO coordinadas para que la mejora agentica no perjudique la indexacion web tradicional.

Las encuestas breves del producto mediran comprension, dificultad, confianza, accion siguiente y utilidad percibida. Los testimonios o casos de exito solo se publicaran con consentimiento y sin convertir una experiencia individual en garantia general.

## Politica por crawler y finalidad

La politica no tratara a todos los bots como equivalentes. El inventario versionado debe distinguir operador, token o user agent, finalidad declarada, rutas permitidas, decision y fecha de verificacion.

| Operador | Identidades a contemplar | Finalidad que debe distinguirse |
| --- | --- | --- |
| OpenAI | `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` | entrenamiento, busqueda y recuperacion solicitada por usuario |
| Anthropic | `ClaudeBot`, `Claude-SearchBot`, `Claude-User` | entrenamiento, busqueda y recuperacion solicitada por usuario |
| Google | `Googlebot`, `Google-Extended`, `Google-CloudVertexBot` | busqueda, token de control para usos Gemini y crawling de servicios Cloud |
| Perplexity | `PerplexityBot`, `Perplexity-User` | busqueda y recuperacion solicitada por usuario |
| Microsoft | `bingbot` y agentes verificados que se documenten | busqueda y experiencias asistidas |
| Apple | `Applebot` y controles vigentes documentados por Apple | busqueda y usos agenticos declarados |
| Amazon | `Amazonbot` | crawling declarado por el operador |
| Meta | `meta-externalagent`, `meta-externalfetcher` | crawling y recuperacion asistida |
| Otros | ByteDance, Common Crawl, DuckDuckGo, Mistral y nuevos bots verificados | decision explicita segun finalidad y riesgo |

`Google-Extended` debe tratarse correctamente como token de control en `robots.txt`, no como un user agent HTTP independiente. Los nombres, categorias y capacidades se contrastaran con documentacion primaria y con el directorio de bots verificados de Cloudflare antes de generar una politica.

Cada cliente podra elegir por separado busqueda, asistencia, entrenamiento y acceso pago. `robots.txt` expresa preferencias de crawling, pero no es un control de acceso para informacion privada; esa informacion debe quedar autenticada o fuera del origen publico.

## Registry, OKF y descubrimiento

El Registry sera una capa de descubrimiento y no un directorio de pago disfrazado. Los perfiles mostraran estados separados: `owner_declared`, `observed`, `verified`, `deployed`, `planned`, `revoked` y `superseded`.

Cada perfil publicado se ofrecera en HTML, JSON y Markdown. Una exportacion OKF v0.2 posterior podra representar la organizacion, sus servicios, fuentes, herramientas y relaciones mediante Markdown con YAML frontmatter. OKF complementa OpenAPI, MCP, Schema.org y los contratos de cada dominio; no los reemplaza y no convierte conocimiento declarado en evidencia verificada.

La incorporacion al Registry permite que humanos y agentes encuentren organizaciones que comenzaron su preparacion agentica. Las posiciones promocionadas, si existen, se identificaran claramente y nunca alteraran el estado de verificacion.

## Asistente y entrada multimodal

El asistente interno se desarrollara por etapas:

1. ayuda contextual determinista para comprender el formulario y el roadmap;
2. captura de texto libre y reordenamiento en un borrador de campos, siempre con vista previa;
3. audio a texto con consentimiento, limite de duracion, borrado y confirmacion antes de guardar;
4. seguimiento multivuelta en espanol, ingles y portugues;
5. consumo del mismo intake desde LLMs externos mediante contratos publicos y autenticacion cuando corresponda.

El asistente nunca convierte una conversacion en publicacion. Primero propone, luego el humano corrige y finalmente aprueba una proyeccion publica exacta. No recibe contrasenas, cookies, claves, tokens ni datos que no sean necesarios para el expediente.

## Skills customizadas y casos de exito

Desde AF-1 se puede preparar documentacion; desde AF-3, cuando existan herramientas reales y contratos verificables, Agent Friendly Web podra ofrecer skills especificas para cada organizacion. Una skill debe explicar capacidades, limites, entradas, salidas, fuentes y acciones bloqueadas. No puede afirmar que una API, MCP o accion existe solo porque la skill la describe.

La monetizacion puede combinar auditoria inicial, saneamiento de conocimiento, preparacion multidioma, publicacion controlada, skills customizadas, monitoreo y mantenimiento editorial opcional. El acceso a informacion ya publicada no se convierte automaticamente en una suscripcion obligatoria.

## Fronteras A2A, MCP y CLI

- **Humano a agente:** formularios, chat, voz, aprobaciones y vistas previas.
- **Agente a humano:** recomendaciones explicables, diferencias, solicitudes de confirmacion y comprobantes.
- **Agente a agente:** A2A solo cuando exista un agente remoto con identidad, Agent Card, estados de tarea, trazabilidad y cancelacion.
- **MCP:** tools read-only primero para auditar, consultar metodologia, preparar borradores y leer perfiles autorizados.
- **CLI:** salida JSON por defecto, `--dry-run`, codigos de salida estables y comandos descubribles; ninguna orden remota arbitraria.
- **APIs:** OpenAPI versionado, scopes, limites, idempotencia y auditoria antes de mutaciones.
- **Pagos:** x402 o mecanismos equivalentes se incorporan a servicios concretos, nunca como sustituto de identidad o consentimiento.

## Orden de implementacion actualizado

1. **Bloque 1 - confianza y Registry:** expediente, verificacion de dominio, perfiles versionados, observaciones, caso Tokenizart y release seguro.
2. **Bloque 2 - AEO y contenido multidioma:** preguntas, entidades, fuentes, frescura, ESP/ENG/POR y medicion comparativa.
3. **Bloque 3 - asistencia de intake:** chat contextual, texto libre, revision field-scoped y audio a texto.
4. **Bloque 4 - distribucion agentica:** OKF, CLI y MCP read-only con contratos publicados.
5. **Bloque 5 - integracion:** adaptadores de CMS, Draft PRs y capsulas con doble consentimiento.
6. **Bloque 6 - coordinacion y monetizacion avanzada:** A2A, skills customizadas, servicios agent-to-agent y pagos para recursos definidos.

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
- Cloudflare Bot Reference: `https://developers.cloudflare.com/ai-crawl-control/reference/bots/`
- Cloudflare Markdown for Agents: `https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/`
- Google crawlers y `Google-Extended`: `https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers`
- Anthropic web crawler policy: `https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler`
- Open Knowledge Format v0.2: `https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md`
- MCP: `https://modelcontextprotocol.io/specification/2026-07-28`
- A2A: `https://a2a-protocol.org/latest/specification`
- x402: `https://github.com/x402-foundation/x402`
- OpenAPI: `https://spec.openapis.org/oas/latest.html`
- Schema.org: `https://schema.org/`

## Gate inmediato

La persistencia ampliada, el formulario progresivo y la verificacion read-only de dominio estan implementados en la rama de Bloque 1, pero todavia no desplegados. El gate inmediato es proyectar y publicar perfiles publicos inmutables y versionados en HTML, JSON y Markdown, omitiendo todos los campos privados. La publicacion requiere dominio vigente y aprobacion explicita; verificar no publica automaticamente.
