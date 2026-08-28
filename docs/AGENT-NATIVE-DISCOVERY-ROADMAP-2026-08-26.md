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
- expediente privado con identidad de Sites y campos allowlisted;
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
- paquetes o plugins oficiales por ecosistema, empezando por Tokenizart, Atelier y Agent Friendly Web, solo cuando cada marketplace o cliente tenga contrato y distribucion verificados;
- skills publicas versionadas y customizadas por organizacion, separadas de las skills internas de operacion;

### Investigacion

- WebMCP para interaccion declarada desde una pagina compatible;
- x402 para servicios concretos donde un pago por recurso tenga sentido;
- pagos por crawl de Cloudflare, sujeto a disponibilidad, economia y politica editorial;
- sincronizacion con proveedores y CMS sin exponer credenciales al modelo.
- WebMCP en ChatGPT, Codex u otros clientes compatibles, manteniendolo como linea experimental hasta verificar especificacion, soporte y seguridad;
- rampas de cobro fiat y cripto para servicios definidos, con conciliacion, comprobantes y aprobacion contable;

## Producto humano y producto agentico

Agent Friendly Web tiene dos usuarios distintos que deben recibir la misma verdad en formatos adecuados:

1. **El responsable humano del sitio**, que contrata, define objetivos, aporta contexto, aprueba publicaciones y necesita comprender el cambio en los habitos de busqueda.
2. **El agente o LLM consumidor**, que necesita contenido estructurado, fuentes, contratos, limites y herramientas verificables para descubrir, responder o actuar.

La venta inicial se dirige a humanos. La entrega, sin embargo, debe mejorar simultaneamente la comprension humana y el consumo por maquinas. Una interfaz visual antigua no impide renovar la capa documental y estructurada, pero tampoco justifica ocultar una experiencia humana deficiente: ambas superficies se auditan por separado.

La comunicacion comercial debe explicar una urgencia real, no fabricar escasez. El costo de no actuar es mantener informacion fragmentada, desactualizada o ambigua mientras mas busquedas se trasladan a asistentes y respuestas sintetizadas. La plataforma no promete posiciones, citas, trafico, conversiones ni recomendaciones de un modelo determinado.

El mensaje comercial se apoyara en evidencia comparable: que podia descubrir y explicar un agente antes, que recursos se publicaron, que puede comprender despues y que sigue sin estar disponible. Esto transforma el temor a quedar rezagado en un plan verificable, no en una promesa de aparicion automatica.

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

Cada perfil publicado se ofrece en HTML, JSON y Markdown. El primer bundle OKF v0.2 ya representa la metodologia, los limites, el Registry y el caso Tokenizart mediante Markdown con YAML frontmatter, procedencia, vigencia e integridad. OKF complementa OpenAPI, MCP, Schema.org y los contratos de cada dominio; no los reemplaza y no convierte conocimiento declarado en evidencia verificada.

La incorporacion al Registry permite que humanos y agentes encuentren organizaciones que comenzaron su preparacion agentica. Las posiciones promocionadas, si existen, se identificaran claramente y nunca alteraran el estado de verificacion.

## Asistente y entrada multimodal

El asistente interno se desarrollara por etapas:

1. ayuda contextual determinista para comprender el formulario y el roadmap;
2. captura de texto libre y reordenamiento en un borrador de campos, siempre con vista previa;
3. audio a texto con consentimiento, limite de duracion, borrado y confirmacion antes de guardar;
4. seguimiento multivuelta en espanol, ingles y portugues;
5. consumo del mismo intake desde LLMs externos mediante contratos publicos y autenticacion cuando corresponda.

El contacto por correo se incorporara despues de definir dominio de correo, responsables, retencion, proteccion contra abuso y separacion entre consultas publicas y expedientes privados. El bot puede preparar una respuesta o un borrador, pero una comunicacion externa sensible conserva revision humana.

El asistente nunca convierte una conversacion en publicacion. Primero propone, luego el humano corrige y finalmente aprueba una proyeccion publica exacta. No recibe contrasenas, cookies, claves, tokens ni datos que no sean necesarios para el expediente.

### Guia conversacional publica del sitio

La guia conversacional publica v1 ya explica la experiencia de `agentfriendlyweb.dev` en lenguaje simple. Recorre preguntas frecuentes, metodologia AF-0 a AF-5, auditoria, AEO, crawlers, Registry, OKF, CLI, expedientes, limites y roadmap, siempre con enlaces a fuentes publicas versionadas.

La guia reconoce continuidad inmediata, aclara terminos, adapta profundidad y pregunta cuando la intencion es ambigua. No inventa precios, garantias, certificaciones o capacidades. La version desplegada no ejecuta la CLI, no guarda conversaciones, no consulta expedientes privados y no publica cambios. Idiomas, voz, memoria consentida, auditoria asistida y transferencia al expediente conservan gates separados.

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

## Capsula A2A de implementacion

La analogia de la capsula espacial se formaliza como un paquete firmado, limitado y reversible que conecta al owner, Agent Friendly Web y el mantenedor del sitio sin entregar control general del servidor.

1. `OwnerIntentAgent` registra alcance, rutas autorizadas y aprobador.
2. `CapsuleBuilderAgent` genera archivos, manifiesto, hashes, destinos, permisos minimos y rollback.
3. `MaintainerGateway` ejecuta primero un dry-run mediante adaptador CMS, MCP o CLI limitado.
4. A2UI muestra diferencias y solicita doble aprobacion cuando el mantenedor conserva la custodia tecnica.
5. `ApplyAdapter` escribe solo archivos/rutas allowlisted, con idempotencia y version previa.
6. `VerifierAgent` vuelve a auditar el origen y emite un recibo metadata-only.

La capsula no contiene contrasenas, cookies, API keys ni claves privadas. A2A coordina la tarea; MCP o CLI ejecutan herramientas acotadas; A2UI conserva las decisiones humanas. El detalle vive en `docs/A2A-DEPLOYMENT-CAPSULE-ROADMAP.es.md`.

## Distribucion por ecosistema

No existe un unico formato universal de plugin. El roadmap mantiene adaptadores separados y no promete presencia en una tienda antes de una publicacion verificable:

| Superficie | Primera entrega candidata | Gate |
| --- | --- | --- |
| Codex | plugin/skills del repositorio y MCP read-only | paquete versionado, permisos y prueba de instalacion |
| ChatGPT | app basada en MCP y UI declarativa | OAuth, politicas de tools y revision de distribucion |
| Claude | servidor MCP y documentacion compatible | autenticacion, scopes y pruebas oficiales del cliente |
| Gemini | extension o adaptador compatible con su ecosistema vigente | investigacion primaria y contrato estable |
| Grok/xAI | integracion solo si existe una superficie oficial adecuada | investigacion; no se presume marketplace |
| WebMCP | exposicion declarativa desde paginas compatibles | borrador experimental, threat model y compatibilidad real |

Las skills internas de Tokenizart ya usadas por Codex son insumos de desarrollo, no productos publicos por defecto. Antes de exponerlas se revisan nivel, fuentes, acciones bloqueadas, version y licencia. `Visualize` ya esta disponible como capacidad interna de prototipado y explicacion visual; no se contabiliza como herramienta publica de Agent Friendly Web.

## Costos, paquetes y pagos

Cada accion debe registrar costo operativo estimado en cuatro componentes: tiempo humano, consumo de modelos/APIs, infraestructura y riesgo/soporte. El costo no se confunde con el precio: el precio tambien cubre valor, personalizacion, responsabilidad y mantenimiento opcional.

- auditoria publica: gratuita como entrada;
- diagnostico automatizado o autoguiado: precio bajo y repetible;
- documentacion F0-F1: paquete base cuando el origen y el contenido estan ordenados;
- implementacion asistida F0-F3: cotizacion por volumen, CMS, idiomas y acceso tecnico;
- F3-F5, plugins, MCP, skills, integraciones, A2A y pagos: alcance y PDR especificos;
- monitoreo: opcional y justificable por una tarea o consumo recurrente real.

Una oferta de lanzamiento, por ejemplo USD 20 tachado a USD 10, solo es sostenible para un diagnostico automatizado y acotado. No debe presentarse como implementacion manual completa F0-F3. Las tarifas definitivas, cuenta receptora, cobro fiat, cripto, impuestos, reembolsos y conciliacion permanecen como decision interna Nivel 1 hasta aprobacion comercial, legal y contable.

## Orden de implementacion actualizado

1. **Bloque 1 - confianza y Registry: desplegado.** Expediente, verificacion de dominio, perfiles versionados, observaciones, caso Tokenizart y release seguro.
2. **Bloque 2 - AEO, sectores y medicion: implementado para release.** Guia, catalogo, control mensual de fuentes, primera biblioteca ESP/ENG/POR y comparador no persistente.
3. **Bloque 3 - asistencia de intake: prototipo controlado implementado.** Texto libre, rechazo de secretos, propuestas field-scoped y seleccion humana; guardado, voz, correo y pagos siguen bloqueados.
4. **Bloque 4A - OKF publico: desplegado y verificado.** Bundle v0.2 determinista, pagina humana, descubrimiento, manifiesto y checksums.
5. **Bloque 4B - CLI read-only: desplegado y verificado.** Auditoria, consulta Registry y verificacion OKF con JSON estable, `--dry-run`, cero credenciales y cero escritura. El candidato se valido en Sites 17 y el estado final se publico en Sites 18.
6. **Bloque 4B.1 - guia conversacional publica: desplegada y verificada.** Orientacion determinista con fuentes, continuidad inmediata y lenguaje adaptable, sin acciones ni persistencia.
7. **Bloque 4C - MCP read-only: desplegado y verificado.** Worker independiente en `mcp.agentfriendlyweb.dev`, contrato stateless, cuatro tools, cuatro resources, limites HTTP y saneamiento; clientes modernos/heredados, negativos, health, auditoria y QA visual aprobados.
8. **Bloque 5A - capsula manual: desplegado y verificado.** Generacion determinista, hashes SHA-256, vencimiento, descarga JSON y decisiones owner/mantenedor ligadas al manifiesto. La migracion D1 remota fue aditiva, las tablas quedaron vacias y el flujo no aplica cambios ni usa credenciales.
9. **Bloque 5B - integracion asistida:** diff contra archivos vigentes y adaptador Draft PR sin merge.
10. **Bloque 5C - conectores controlados:** adaptadores CMS en entorno de prueba, rollback y primera escritura canary sobre una ruta no critica.
11. **Bloque 6 - coordinacion y monetizacion avanzada:** A2A, skills customizadas, servicios agent-to-agent y pagos para recursos definidos.

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
| `/.well-known/public-guide-contract.json` | contrato y limites de la guia conversacional publica | desplegado, convencion del proyecto |
| `/.well-known/mcp/server-card.json` | server card del MCP publico read-only | desplegado |
| `/.well-known/mcp.json` | compatibilidad de descubrimiento MCP del proyecto | desplegado |
| `/schemas/mcp-result.v1.json` | contrato de salida saneada del MCP publico | desplegado |
| `/mcp-readonly` | explicacion humana de tools, resources y limites | desplegado |
| `https://mcp.agentfriendlyweb.dev/mcp` | Streamable HTTP stateless, `POST` read-only | desplegado |
| `/.well-known/security.txt` | contacto y politica de seguridad | desplegado |
| `/conocimiento-abierto` | explicacion humana del conocimiento publico versionado | desplegado en Sites 16 |
| `/okf/v0.2/index.md` | indice machine-readable del bundle OKF v0.2 | desplegado en Sites 16 |
| `/okf/v0.2/manifest.json` | inventario, metadata y hashes de distribucion | desplegado en Sites 16 |
| `/okf/v0.2/CHECKSUMS.sha256` | verificacion SHA-256 del bundle publicado | desplegado en Sites 16 |
| `/cli` | explicacion humana de la CLI read-only | desplegado en Sites 18 |
| `/cli/index.md` | instalacion, comandos, limites y codigos de salida | desplegado en Sites 18 |
| `/.well-known/agent-friendly-cli.json` | manifiesto de capacidades y restricciones CLI | desplegado, convencion del proyecto |
| `/schemas/cli-response.v1.json` | contrato JSON estable de respuestas CLI | desplegado |
| `/schemas/publication-capsule.v1.json` | contrato del paquete manual, archivos, hashes, destinos y limites | desplegado en Sites 25 |
| `/schemas/capsule-decision.v1.json` | contrato de aprobacion o rechazo ligado al hash del manifiesto | desplegado en Sites 25 |

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
- Anthropic web crawler policy: `https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler`
- Open Knowledge Format v0.2: `https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md`
- MCP: `https://modelcontextprotocol.io/specification/2026-07-28`
- A2A: `https://a2a-protocol.org/latest/specification`
- x402: `https://github.com/x402-foundation/x402`
- OpenAPI: `https://spec.openapis.org/oas/latest.html`
- Schema.org: `https://schema.org/`

## Gate inmediato

El gate publico de los Bloques 2 y 3 se cerro el 2026-08-27. La revision humana verifico sectores, idiomas, comparador, intake, rechazo de secretos, ausencia de persistencia local, contratos publicos y una nueva auditoria del origen. La evidencia completa vive en `docs/BLOCK-2-3-BROWSER-AND-ORIGIN-GATE-2026-08-27.md`.

Los Bloques 4A OKF publico, **4B CLI read-only**, **4B.1 guia conversacional publica** y **4C MCP publico read-only** estan desplegados. El MCP corre en un Worker independiente en `mcp.agentfriendlyweb.dev`, con cuatro tools y cuatro resources, sin OAuth, D1, secretos ni escritura. La transferencia de propuestas aprobadas al expediente autenticado, plugins, WebMCP, A2A, pagos, voz, correo y escritura siguen sin contabilizarse como capacidades desplegadas.

El **Bloque 5A** quedo desplegado y verificado el 2026-08-28. La D1 remota incorporo solo `publication_capsules` y `capsule_approvals`, ambas vacias tras el release; las rutas privadas fallan cerradas y los contratos publicos responden correctamente. El siguiente gate es **Bloque 5B**: comparar contra archivos vigentes y preparar un Draft PR sin merge. CMS, A2A y toda escritura sobre dominios permanecen bloqueados.
