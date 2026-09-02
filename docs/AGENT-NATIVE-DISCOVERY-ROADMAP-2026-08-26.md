# Agent Friendly Web: roadmap agent-native

**Fecha:** 2026-08-26  
**Responsable:** Gabriel Mucchiut  
**Estado:** implementacion progresiva  
**Origen canonico:** `https://agentfriendlyweb.dev`

## Proposito

Agent Friendly Web debe demostrar en su propia infraestructura el metodo que ofrece a terceros. El objetivo no es acumular nombres de protocolos, sino permitir que personas y agentes descubran que existe, comprendan que hace, distingan evidencia de declaracion y utilicen solamente capacidades publicadas y seguras.

La meta de 100% representa la finalizacion de las capas que el caso necesita. No exige activar cada tecnologia disponible ni autoriza a presentar un roadmap como producto operativo. Los puntajes externos se conservan en un perfil AF-EV separado: sirven como evidencia comparativa, no redefinen AF-0 a AF-5 ni justifican publicar capacidades ficticias.

## Estado de infraestructura al 2026-09-01

El unico origen publico canonico es `https://agentfriendlyweb.dev`. Ese dominio continua disponible sobre un runtime Sites transitorio mientras se prepara el reemplazo Cloudflare-native. El runtime transitorio es una fuente de migracion, no la arquitectura objetivo, y sus rutas privadas quedan congeladas sin admision de nuevos datos reales.

El candidato Cloudflare Worker con Vinext y Cloudflare Access esta implementado y verificado. El canary propio `canary.agentfriendlyweb.dev` esta desplegado detras de Access con D1 aislada, seis migraciones y cero filas funcionales. Mantiene **0% del trafico del origen publico** y no modifica `agentfriendlyweb.dev`; una sesion allowlisted confirmo el HTML autenticado, la misma compilacion paso QA responsive y el rollback quedo preparado sin ejecutar. El corte productivo conserva un gate separado. Las interfaces privadas o de contacto bajo `*.chatgpt.site` estan retiradas y no pueden usarse como produccion, staging, preview, autenticacion o rollback.

Tokenizart sigue siendo el primer caso integral documentado, pero no es una dependencia de ejecucion. Compartir cuenta Cloudflare, organizacion GitHub o identidad administrativa no fusiona Workers, D1, repositorios ni datos de ambos proyectos.

La fuente machine-readable de este estado es `https://agentfriendlyweb.dev/.well-known/infrastructure-status.json`. Los documentos que nombran versiones Sites se conservan solamente como recibos historicos de releases anteriores.

## Verificacion externa AF-EV

La fotografia inicial de Cloudflare `isitagentready.com` del 2026-08-30 ubico a `agentfriendlyweb.dev` en **53/100, Level 2 Bot-Aware**. Despues de EV-1, las reauditorias del 2026-08-30 y 2026-08-31 confirmaron **Level 4 Agent-Integrated**. El API no devolvio puntaje numerico posterior, por lo que no se infiere uno. Pasan robots, sitemap, Link headers, negociacion Markdown, politica de bots, Content Signals, API Catalog, MCP Server Card, Agent Skills, WebMCP y ARD. Permanecen ausentes DNS-AID, OAuth discovery, OAuth Protected Resource, `auth.md` y A2A Agent Card.

AF-EV registra proveedor, fecha, origen, puntaje, checks, evidencia y vigencia. No se crea AF-6: AF-0 a AF-5 mide madurez propia y AF-EV mide observacion independiente. El detalle y los gates viven en `docs/CLOUDFLARE-EXTERNAL-READINESS-BASELINE-2026-08-30.md`.

La prioridad inmediata ya no es agregar señales para elevar una nota. Es cerrar **Gate 6A - Traccion F1**: oferta, beachhead, contacto consentido, medicion y evidencia comercial. DNS requiere otra aprobacion. OAuth, `auth.md`, A2A y comercio se implementan solamente junto con servicios reales.

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
5. **Bloque 4B - CLI read-only: desplegado y verificado.** Auditoria, consulta Registry y verificacion OKF con JSON estable, `--dry-run`, cero credenciales y cero escritura. Los recibos historicos de validacion y publicacion permanecen archivados.
6. **Bloque 4B.1 - guia conversacional publica: desplegada y verificada.** Orientacion determinista con fuentes, continuidad inmediata y lenguaje adaptable, sin acciones ni persistencia.
7. **Bloque 4C - MCP read-only: desplegado y verificado.** Worker independiente en `mcp.agentfriendlyweb.dev`, contrato stateless, cuatro tools, cuatro resources, limites HTTP y saneamiento; clientes modernos/heredados, negativos, health, auditoria y QA visual aprobados.
8. **Bloque 5A - capsula manual: desplegado y verificado.** Generacion determinista, hashes SHA-256, vencimiento, descarga JSON y decisiones owner/mantenedor ligadas al manifiesto. La migracion D1 remota fue aditiva, las tablas quedaron vacias y el flujo no aplica cambios ni usa credenciales.
9. **Gate EV-1 - desplegado y verificado:** Markdown, ARD, WebMCP read-only y perfil externo versionado. La reauditoria Cloudflare paso de Level 2 a Level 4; no incluye DNS, OAuth, A2A o pagos.
10. **Bloque 5B - desplegado y verificado:** diff acotado contra archivos publicos vigentes, pruebas posteriores por proveedor externo y plan de Draft PR descargable sin envio ni merge. La migracion D1 fue aditiva y el envio remoto permanece deshabilitado.
11. **Gate visual e idiomas integral - desplegado y verificado:** interfaz completa ESP/ENG/POR, portada comic `La llamada`, Archivo del futuro y robots F0-F5. El recibo historico de la primera publicacion permanece archivado y conserva contratos, permisos y datos owner sin cambios.
12. **Bloque 5C - desplegado como sandbox efimero de navegador:** contrato fail-closed y laboratorio comic con adaptador en memoria, backup, rollback y canary de una ruta. Proveedores y escrituras reales permanecen deshabilitados hasta aprobacion separada.
13. **Bloque 5D - canary remoto verificado:** contrato y ejecucion de un unico Draft PR GitHub en `tokenizartinfo-ops/agent-friendly-web-synthetic-origin`, archivo `llms.txt`, base `main`, capacidad efimera por alias y recibo metadata-only. El PR #1 permanece Draft, abierto y sin merge; no hubo deployment ni cambios sobre un origen real.
14. **Home Guided Journey v1 - desplegado y verificado:** orden humano `La llamada -> F0-F5 -> diagnostico -> comparador -> archivo -> siguientes caminos`, hero responsive y archivo progresivo. Su recibo historico de publicacion no cambia metodologia, puntajes ni permisos.
15. **Gate 6A - Traccion F1: documentacion y arquitectura en preparacion.** Beachhead cultural, canal de agencias, Discovery Pack, embudo, KPIs, contacto consentido, correo y comercio agentico separados.
16. **Gate 6B - captura consentida remota OFF cerrada:** preview publico cerrado; la interfaz privada Sites esta retirada y la frontera Worker heredada queda como evidencia remota con escrituras OFF y D1 vacia. Datos reales y correo siguen deshabilitados. La captura no se reabre antes del corte Cloudflare-native.
17. **Gate 6C - correo operativo:** la politica local `planned_draft_only` sigue gobernando borradores; Email Routing, DNS y tres aliases entrantes quedaron verificados bajo `inbound_canary_verified`. Gate 6C.2B incorporo el dominio remitente a Cloudflare Email Service, publico seis DNS y verifico un canary humano con SPF, DKIM y DMARC en `pass`; su cierre historico es `human_canary_verified_binding_blocked`. Gate 6C.3A selecciono `internal_review_ready` y preparo localmente una ruta cerrada `at-most-once`, con destino fijo y auditoria `metadata-only`. Gate 6C.3B fase 1 desplego esa ruta en el canary, aplico la migracion `0006` sobre D1 aislada y configuro rate limiting con flag OFF. El estado es `remote_database_and_closed_route_ready_binding_pending`: no existe binding `send_email`, destino privado, automatizacion ni segundo mensaje autorizado.
18. **Gate 6D - ventas y CRM ligero, frontera local preparada:** pipeline y transiciones `local_planning_only`, metadata sin PII, perdida razonada e idempotencia. D1, datos reales, scoring, propuestas y pagos requieren aprobacion separada.
19. **Gate 6E - primer piloto pago humano:** catalogo, checkout, recibo, conciliacion y una entrega medida.
20. **Gate 6F - comercio agentico sandbox:** un recurso read-only, x402/MPP, idempotencia y recibos sin dinero real al inicio.
21. **Gate 6G - coordinacion avanzada:** A2A, OAuth, MCP owner-scoped, skills customizadas y capsulas por proveedor.

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
| `/.well-known/infrastructure-status.json` | estado fechado del origen, canary, superficies retiradas y gate siguiente | canary Cloudflare-native protegido; 0% del trafico del origen publico |
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

Gate 6A y Gate 6B.2 remoto OFF quedaron cerrados. La decision del 2026-09-01 retira Sites como entorno operativo y cambia la prelacion. El gate inmediato es **migrar el origen de Agent Friendly Web a Cloudflare de forma nativa**, primero mediante `afw_canary` protegido por Access, D1 aislada, 0% de trafico publico, paridad y rollback. La escritura sintetica 6B.3 queda diferida hasta despues del corte y de una nueva revision de su necesidad.

El plan de migracion vive en:

- `docs/CLOUDFLARE-NATIVE-ORIGIN-SPEC-V1.md`;
- `docs/PROJECT-RESOURCE-BOUNDARY-AUDIT-2026-09-01.md`;
- `docs/superpowers/plans/2026-09-01-agent-friendly-web-cloudflare-native-origin-v1.md`.

La decision comercial completa vive en:

- `docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md`;
- `docs/INITIAL-GO-TO-MARKET-AND-SALES-MOTION-V1.md`;
- `docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md`;
- `docs/AGENTIC-COMMERCE-X402-MPP-ARCHITECTURE-V1.md`;
- `docs/INTERACTIVE-DIAGRAMS-AND-EXPLAINERS-ROADMAP-V1.md`.

La primera oferta paga propuesta es un Discovery Pack F0/F1 a F3 para arte, cultura, coleccionismo e instituciones con patrimonio. Las agencias y mantenedores web forman el primer canal multiplicador. La auditoria publica permanece gratuita y visible sin email; solicitar un plan y recibir marketing son consentimientos distintos.

La implementacion local de Gate 6B conserva pruebas fail-closed, pero su UI Sites fue retirada. No activa correo, D1 remota de leads, Turnstile remoto, pagos, x402, OAuth, A2A ni cambios DNS. Cualquier futura prueba privada se ejecutara en `afw_canary`, no en un entorno generico llamado staging ni en un dominio ajeno al proyecto.

La frontera local de Gate 6C continua implementada como `planned_draft_only`: acepta solo metadata minima saneada, rechaza cuerpos, adjuntos y secretos probables, y nunca envia. Gate 6C.1 verifico DNS, routing y entregas entrantes. Gate 6C.2B verifico el dominio de salida y exactamente un correo manual mediante REST API, sin dejar capacidad recurrente. Gate 6C.3A selecciono el aviso interno `internal_review_ready` y preparo codigo, migracion y contrato local con destino fijo, reserva previa, `at-most-once` y auditoria `metadata-only`. Gate 6C.3B fase 1 verifico la frontera remota: ruta detras de Access, D1 aislada migrada, cero filas, rate limiter y flag OFF. El binding de salida, destino privado, billing, lectura agentica y nuevos envios permanecen bloqueados bajo `remote_database_and_closed_route_ready_binding_pending`. La fase 2 debe provisionar capacidades privadas fuera de Git y repetir pruebas negativas antes de evaluar un unico canary. La evidencia vive en `docs/BLOCK-6C-EMAIL-ROUTING-DRAFT-LOCAL-GATE-2026-08-31.md`, `docs/BLOCK-6C1-EMAIL-INBOUND-CANARY-RUNBOOK-2026-09-02.md`, `docs/BLOCK-6C2-EMAIL-OUTBOUND-CANARY-LOCAL-GATE-2026-09-02.md`, `docs/BLOCK-6C2B-EMAIL-OUTBOUND-REMOTE-CANARY-2026-09-02.md`, `docs/BLOCK-6C3A-EMAIL-REVIEW-READY-LOCAL-GATE-2026-09-02.md` y `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-REMOTE-CLOSED-2026-09-02.md`.

Gate 6D dispone ademas de un planificador local `local_planning_only` que separa contacto y oportunidad, impide saltos de etapa y no copia emails, cuerpos o credenciales. Antes de cualquier D1 remota deben cerrarse los canaries sinteticos de Gates 6B y 6C con aprobacion separada. La evidencia vive en `docs/BLOCK-6D-CRM-LITE-LOCAL-GATE-2026-08-31.md`.

La reconciliacion publica del 2026-08-31 corrige el placeholder de la home que presentaba como `Pendiente` el desglose de una referencia ya medida en 95/100. Tambien incorpora los contratos 6C/6D al inventario publico con estados exclusivamente documentales. A2A, x402, correo operativo, contactos reales y CRM remoto siguen sin contabilizarse como desplegados. La evidencia vive en `docs/PUBLIC-SITE-STATUS-RECONCILIATION-2026-08-31.md`.

El canary privado OFF de Gate 6B valida aislamiento, Access deny-by-default, Turnstile restringido, D1 migrada y cierre sin contactos. Gate 6B.1 implemento y fusiono un Worker privado dedicado con Cloudflare Access firmado, CORS exacto, rate limiting nativo, Turnstile obligatorio y D1 propia. Sus 357 pruebas, build y dry-run estan aprobados. Gate 6B.2 creo la frontera remota completa, mantuvo escrituras OFF y comprobo cero filas. La primera escritura sintetica pertenece a Gate 6B.3 y requiere aprobacion separada. La especificacion y evidencia viven en `docs/superpowers/specs/2026-08-31-agent-friendly-web-contact-worker-frontier-v1-design.md`, `docs/BLOCK-6B1-CONTACT-WORKER-LOCAL-2026-08-31.md` y `docs/BLOCK-6B2-CONTACT-WORKER-REMOTE-OFF.md`.

El gate publico de los Bloques 2 y 3 se cerro el 2026-08-27. La revision humana verifico sectores, idiomas, comparador, intake, rechazo de secretos, ausencia de persistencia local, contratos publicos y una nueva auditoria del origen. La evidencia completa vive en `docs/BLOCK-2-3-BROWSER-AND-ORIGIN-GATE-2026-08-27.md`.

Los Bloques 4A OKF publico, **4B CLI read-only**, **4B.1 guia conversacional publica** y **4C MCP publico read-only** estan desplegados. El MCP corre en un Worker independiente en `mcp.agentfriendlyweb.dev`, con cuatro tools y cuatro resources, sin OAuth, D1, secretos ni escritura. La transferencia de propuestas aprobadas al expediente autenticado, plugins, WebMCP, A2A, pagos, voz, correo y escritura siguen sin contabilizarse como capacidades desplegadas.

El **Bloque 5A** quedo desplegado y verificado el 2026-08-28. La D1 remota incorporo solo `publication_capsules` y `capsule_approvals`, ambas vacias tras el release; las rutas privadas fallan cerradas y los contratos publicos responden correctamente. **EV-1** se publico en Sites 27 y la reauditoria externa confirmo Level 4 `Agent-Integrated`.

El **Bloque 5B** esta desplegado y verificado: compara la capsula con recursos publicos allowlisted, muestra diferencias limitadas, conserva las integraciones manuales como propuestas y prepara un documento tecnico `No enviado`. La migracion aditiva `0003` creo dos tablas vacias; no existe cliente HTTP de GitHub activo, `remoteSubmission=false` y `mergeAllowed=false`. CMS, A2A y toda escritura sobre dominios permanecen bloqueados.

El **gate integral de idiomas y experiencia comic** se publico y verifico el 2026-08-31. Espanol conserva canonicals, ingles y portugues usan rutas allowlisted, y las superficies humanas comparten la portada `La llamada`, Archivo del futuro y madurez F0-F5. La evidencia local vive en `docs/INTEGRAL-I18N-COMIC-LOCAL-GATE-2026-08-31.md` y el recibo remoto en `docs/INTEGRAL-I18N-COMIC-BLOCK5C-REMOTE-RELEASE-RECEIPT-2026-08-31.md`.

El **Bloque 5C local** quedo implementado y verificado el 2026-08-31. El laboratorio prueba un unico canary dentro de memoria efimera, exige aprobaciones vigentes, genera backup, verifica SHA-256 y permite rollback. No tiene cliente HTTP, provider real, D1, secretos ni escritura remota. La evidencia vive en `docs/BLOCK-5C-CONTROLLED-SANDBOX-LOCAL-GATE-2026-08-31.md`.

El **Bloque 5D** completo su primer canary remoto el 2026-08-31. El repositorio sintetico publico conserva `main` sin `llms.txt`; la rama `afw/canary-a7746caa7c28` agrega exactamente ese archivo y el PR #1 permanece abierto como Draft, sin merge. El hash remoto coincide con el aprobado y el recibo es metadata-only. No existe ruta HTTP de escritura, SDK persistente, token en el repositorio ni autorizacion de deployment. La evidencia vive en `docs/BLOCK-5D-GITHUB-DRAFT-PR-CANARY-REMOTE-GATE-2026-08-31.md`.

La **Home Guided Journey v1** se fusiono mediante el PR #26 y se publico en Sites 30 el 2026-08-31. La portada ordena la experiencia humana antes del archivo tecnico, conserva el hero legible en escritorio y prioriza la ilustracion en movil. La auditoria publica posterior devolvio 95/100, el MCP read-only paso su cliente real y no hubo migraciones D1, cambios DNS ni ampliacion de permisos. El recibo vive en `docs/HOME-GUIDED-JOURNEY-REMOTE-RELEASE-RECEIPT-2026-08-31.md`.

La demostracion comercial de mejoras usara un **External Evidence Pack** y no una unica nota: protocolo HTTP reproducible; validadores de Schema.org; Search Console/Bing Webmaster Tools y Cloudflare AI Crawl Control cuando el owner pueda verificarlos; observaciones fechadas de motores de respuesta; y graders comerciales solo como evidencia direccional. Cloudflare Agent Readiness y la rubrica Vercel Agent Readability se mantendran versionadas como controles tecnicos distintos. HubSpot AI Search Grader no se presentara como prueba tecnica independiente. La matriz, sus limites y la vigilancia trimestral viven en `docs/EXTERNAL-AUDIT-AND-EVIDENCE-REGISTRY-2026-08-30.md`.
