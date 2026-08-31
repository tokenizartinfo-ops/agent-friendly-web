import { localizedPath, normalizeLocale } from './site-i18n.mjs';

const SOURCE_CATALOG = Object.freeze({
  overview: Object.freeze({ id: 'overview', title: 'Mapa completo del sitio', url: '/mapa-del-sitio' }),
  methodology: Object.freeze({ id: 'methodology', title: 'Metodologia AF-0 a AF-5', url: '/metodologia' }),
  audit: Object.freeze({ id: 'audit', title: 'Auditor publico read-only', url: '/#auditar' }),
  aeo: Object.freeze({ id: 'aeo', title: 'AEO y politicas de crawlers', url: '/aeo-y-crawlers' }),
  registry: Object.freeze({ id: 'registry', title: 'Registry publico', url: '/registry' }),
  intake: Object.freeze({ id: 'intake', title: 'Asistente de preparacion', url: '/asistente' }),
  expediente: Object.freeze({ id: 'expediente', title: 'Expediente privado', url: '/expediente' }),
  okf: Object.freeze({ id: 'okf', title: 'Conocimiento abierto OKF', url: '/conocimiento-abierto' }),
  cli: Object.freeze({ id: 'cli', title: 'CLI read-only', url: '/cli' }),
  tokenizart: Object.freeze({ id: 'tokenizart', title: 'Caso Tokenizart', url: '/casos/tokenizart' }),
  readiness: Object.freeze({ id: 'readiness', title: 'Manifiesto de capacidades', url: '/.well-known/agent-readiness.json' }),
  security: Object.freeze({ id: 'security', title: 'Politica de seguridad', url: '/.well-known/security.txt' }),
});

export const PUBLIC_GUIDE_SOURCE_IDS = Object.freeze(Object.keys(SOURCE_CATALOG));

export const PUBLIC_GUIDE_INITIAL_CONTEXT = Object.freeze({
  topic: null,
  mode: 'standard',
  pending_follow_up: null,
});

const TOPICS = Object.freeze({
  welcome: Object.freeze({
    simple: 'Soy la guia de Agent Friendly Web. Te ayudo a entender que puede mejorar tu sitio y por donde empezar, sin guardar esta charla.',
    standard: 'Soy la guia publica de Agent Friendly Web. Puedo explicarte como evaluar tu sitio, que significan los niveles AF-0 a AF-5 y que recursos ayudan a humanos y agentes a comprenderlo mejor. Esta charla queda solo en esta pagina y no modifica nada.',
    detailed: 'Soy una guia determinista de Agent Friendly Web: respondo desde un catalogo publico y versionado, enlazo las fuentes de cada explicacion y conservo el hilo solo mientras esta pagina permanece abierta. Puedo orientarte sobre auditoria, AF-0 a AF-5, AEO, crawlers, Registry, OKF, CLI, el caso Tokenizart y los limites del roadmap. No uso un modelo externo, no accedo a expedientes y no ejecuto acciones.',
    sources: ['overview', 'readiness'],
    quick: ['Quiero saber por donde empezar', 'Que es AF-0 a AF-5?', 'Que puede auditar?'],
    follow: 'getting_started',
  }),
  overview: Object.freeze({
    simple: 'Agent Friendly Web ayuda a que un sitio sea mas facil de encontrar y entender por personas, buscadores y agentes.',
    standard: 'Agent Friendly Web diagnostica que informacion publica puede descubrir un agente, muestra faltantes y propone una evolucion progresiva. Combina experiencia humana, contenido claro, evidencia tecnica y herramientas read-only sin prometer rankings ni recomendaciones automaticas.',
    detailed: 'Agent Friendly Web separa cuatro problemas: descubrimiento, comprension, herramientas y gobernanza. Audita evidencia publica, ayuda a ordenar el conocimiento, documenta politicas por crawler y versiona capacidades verificables. La metodologia AF-0 a AF-5 es propia y transparente; no es una certificacion oficial ni garantiza que un modelo indexe, cite o recomiende un sitio.',
    sources: ['overview', 'methodology', 'readiness'],
    quick: ['Quiero saber por donde empezar', 'Que es AF-0 a AF-5?', 'Ver el caso Tokenizart'],
    follow: 'getting_started',
  }),
  af_levels: Object.freeze({
    simple: 'AF-0 significa que casi no hay señales para agentes. AF-5 significa que el sitio tambien ofrece herramientas con permisos y control. Se avanza por etapas.',
    standard: 'AF-0 a AF-5 es el mapa propio de madurez de Agent Friendly Web. AF-0 casi no ofrece contexto verificable; AF-1 mejora descubrimiento; AF-2 ordena explicaciones; AF-3 publica documentos y contratos; AF-4 agrega herramientas con permisos; AF-5 integra descubrimiento, operacion limitada y gobernanza. No es una certificacion oficial.',
    detailed: 'La escala AF-0 a AF-5 evita confundir archivos sueltos con capacidad agentica real. AF-0 observa ausencia de señales; AF-1 cubre rastreo y rutas publicas; AF-2 concilia contenido y entidades; AF-3 agrega conocimiento versionado, schemas y contratos; AF-4 incorpora herramientas autenticadas, scopes, auditoria y rollback; AF-5 coordina agentes y humanos con gobernanza. Cada nivel exige evidencia desplegada y no cuenta elementos solo planificados.',
    sources: ['methodology', 'readiness'],
    quick: ['Como se mide mi sitio?', 'Que documentos aparecen primero?', 'Ver la evolucion visual'],
    follow: 'audit_process',
  }),
  getting_started: Object.freeze({
    simple: 'Empeza con una auditoria publica. Te dira que encuentra hoy el sitio y cual es el primer faltante concreto.',
    standard: 'El primer paso es auditar el dominio publico. Con esa evidencia se separa lo que ya existe, lo que el owner declara y lo que falta publicar. Despues se arma un expediente y un roadmap corto, sin pedir credenciales para el diagnostico inicial.',
    detailed: 'El recorrido recomendado es: auditoria read-only del origen; validacion humana de identidad, objetivos y audiencias; conciliacion de contenido, metadatos y politicas; expediente con alcance y aprobadores; implementacion por archivos o integraciones limitadas; nueva auditoria y recibo verificable. El diagnostico inicial no necesita acceso administrativo.',
    sources: ['audit', 'intake', 'expediente'],
    quick: ['Mostrarme la auditoria paso a paso', 'Ordenar mis datos primero', 'Que documentos aparecen primero?'],
    follow: 'audit_process',
  }),
  audit_process: Object.freeze({
    simple: 'Pegas el dominio en el auditor. La herramienta mira solo informacion publica y te muestra que encontro y que falta.',
    standard: 'El auditor hace solicitudes read-only a recursos publicos del dominio, revisa evidencia como `robots.txt`, sitemap, contenido y catalogos, y devuelve hallazgos observables. No inicia sesion, no escribe archivos y no demuestra por si solo que un modelo vaya a recomendar el sitio.',
    detailed: 'La auditoria controla redirecciones, limites de respuesta y destinos de red para evitar SSRF; consulta un conjunto acotado de rutas publicas y clasifica evidencia observable. El resultado debe leerse junto con declaraciones del owner y una revision humana. Sirve como baseline comparable, no como garantia causal de trafico, ranking o inclusion en respuestas generadas.',
    sources: ['audit', 'methodology'],
    quick: ['Auditar mi sitio', 'Como leo el resultado?', 'Que es AF-0 a AF-5?'],
    follow: 'discovery_files',
  }),
  aeo_crawlers: Object.freeze({
    simple: 'AEO ayuda a que un asistente encuentre respuestas claras. La politica de crawlers decide que bots pueden leer cada parte publica.',
    standard: 'AEO organiza respuestas, entidades y fuentes para motores de respuesta. Las politicas de crawlers distinguen busqueda, recuperacion solicitada por un usuario y entrenamiento; no todos los bots ni finalidades deben recibir la misma decision. Esto complementa SEO y no garantiza aparicion.',
    detailed: 'La capa AEO concilia preguntas reales, respuestas breves y extensas, Schema.org, rutas canonicas, fechas, responsables y fuentes. La politica por crawler diferencia, por ejemplo, GPTBot de OAI-SearchBot y ChatGPT-User, o ClaudeBot de Claude-SearchBot y Claude-User. `robots.txt` expresa preferencias de rastreo, pero nunca sustituye autenticacion para contenido privado.',
    sources: ['aeo', 'methodology'],
    quick: ['Que archivos ayudan?', 'Como elegir una politica?', 'Que puede auditar?'],
    follow: 'discovery_files',
  }),
  discovery_files: Object.freeze({
    simple: '`robots.txt` orienta crawlers, el sitemap enumera paginas y `llms.txt` propone un indice breve para asistentes. Cada archivo cumple una funcion distinta.',
    standard: 'La primera capa suele conciliar `robots.txt`, sitemap, contenido visible, datos estructurados, `llms.txt` y `llms-full.txt`. Los dos archivos `llms` son una propuesta comunitaria, no un estandar oficial. Publicarlos ayuda a explicar el sitio, pero no prueba indexacion ni reemplaza buen contenido HTML.',
    detailed: '`robots.txt` declara preferencias de crawling; el sitemap descubre URLs canonicas; Schema.org/JSON-LD describe entidades; OpenAPI documenta APIs reales; `llms.txt` propone un indice conciso y `llms-full.txt` contexto ampliado. Los catalogos propios deben identificarse como convenciones. Todo debe ser coherente con la experiencia humana, versionado y libre de secretos.',
    sources: ['aeo', 'methodology', 'overview'],
    quick: ['Que documento deberia crear primero?', 'Como se verifica?', 'Ordenar mis datos primero'],
    follow: 'intake_expediente',
  }),
  registry: Object.freeze({
    simple: 'El Registry publica un perfil verificable de un sitio y separa lo declarado por el dueño de lo observado.',
    standard: 'El Registry es un directorio publico versionado. Cada perfil puede mostrar declaraciones del owner, evidencia observada, dominio verificado, recursos desplegados y trabajo planificado sin mezclarlos. No es un ranking ni una certificacion.',
    detailed: 'Un perfil del Registry ofrece representaciones humanas y legibles por maquinas, conserva procedencia y distingue estados como `owner_declared`, `observed`, `verified`, `deployed`, `planned` y `revoked`. La verificacion de dominio acredita control sobre una prueba concreta; no valida automaticamente todas las afirmaciones comerciales.',
    sources: ['registry', 'methodology'],
    quick: ['Como ingreso mi sitio?', 'Que significa dominio verificado?', 'Ordenar mis datos primero'],
    follow: 'intake_expediente',
  }),
  intake_expediente: Object.freeze({
    simple: 'El asistente ordena tus datos sueltos. El expediente privado guarda solo lo que revisas y aprobas en otro paso.',
    standard: 'Podes usar `/asistente` para convertir texto desordenado en propuestas por campo. Ese prototipo no guarda ni publica. El expediente autenticado es la superficie separada para organizar un proyecto; transferir datos entre ambos requiere una aprobacion futura y explicita.',
    detailed: 'La frontera es deliberada: el asistente local propone campos y rechaza posibles secretos; el expediente aisla datos por identidad; una futura transferencia necesitara preview, seleccion field-scoped, consentimiento, auditoria e idempotencia. Ninguna frase del chat se convierte por si sola en declaracion publica o instruccion de despliegue.',
    sources: ['intake', 'expediente', 'security'],
    quick: ['Abrir el asistente de preparacion', 'Que datos no debo incluir?', 'Volver al primer paso'],
    follow: 'security',
  }),
  okf: Object.freeze({
    simple: 'OKF es una forma de empaquetar conocimiento con contexto, fuentes y version para que otras personas y agentes lo reutilicen.',
    standard: 'La distribucion OKF publica agrupa conocimiento verificable en Markdown con metadatos, procedencia, licencia, manifiesto y hashes. Complementa APIs, schemas y MCP; no los reemplaza ni convierte una declaracion en evidencia.',
    detailed: 'El bundle OKF v0.2 de Agent Friendly Web separa dominios de conocimiento, incluye YAML frontmatter, fuentes, vigencia, licencia, un manifiesto de distribucion y checksums SHA-256. La ruta de descubrimiento usada por el AI Catalog es una convencion del proyecto. El contenido sigue siendo read-only y su integridad no acredita por si sola la verdad de cada afirmacion.',
    sources: ['okf', 'readiness'],
    quick: ['Como verifico los archivos?', 'Que diferencia hay con MCP?', 'Ver el caso Tokenizart'],
    follow: 'cli_skills',
  }),
  cli_skills: Object.freeze({
    simple: 'La CLI y la skill permiten auditar y leer recursos publicos con instrucciones repetibles. No cambian sitios.',
    standard: 'La CLI read-only ejecuta auditoria, consulta perfiles del Registry y verifica el bundle OKF con salida JSON estable. La skill publica explica como usar la auditoria con limites. Ninguna de las dos recibe credenciales ni escribe en el sitio.',
    detailed: 'La CLI v0.1.0 es repo-first y expone comandos de auditoria, Registry y verificacion OKF. Su contrato declara solo GET, sin autenticacion, escrituras locales o remotas. La skill es documentacion ejecutable para un agente, no un permiso adicional ni un MCP server. Las futuras mutaciones requieren otra arquitectura de identidad, scopes, aprobacion, auditoria y rollback.',
    sources: ['cli', 'readiness'],
    quick: ['Ver comandos disponibles', 'Que diferencia hay con MCP?', 'Como empiezo sin conocimientos tecnicos?'],
    follow: 'roadmap',
  }),
  tokenizart: Object.freeze({
    simple: 'Tokenizart es el primer caso integral usado para probar como una plataforma compleja puede explicarse mejor a humanos y agentes.',
    standard: 'Tokenizart funciona como primer caso integral porque combina un sitio institucional, Atelier, conocimiento publico, herramientas y limites de operaciones owner. Agent Friendly Web documenta el baseline y prepara mejoras progresivas sin presentar como desplegado lo que aun espera integracion.',
    detailed: 'El caso Tokenizart separa `tokenizart.com`, Atelier y los activos agenticos versionados. La auditoria registra evidencia observable; los paquetes propuestos necesitan revision y publicacion controlada en cada origen. Owner Live read-only, acciones Atelier y datos privados pertenecen a fronteras autenticadas distintas y nunca se exponen desde este sitio publico.',
    sources: ['tokenizart', 'readiness'],
    quick: ['Ver el diagnostico Tokenizart', 'Que recursos ya estan activos?', 'Que queda pendiente?'],
    follow: 'roadmap',
  }),
  security: Object.freeze({
    simple: 'No pegues contrasenas, tokens ni datos de pago. La guia solo necesita preguntas generales y enlaces publicos.',
    standard: 'La guia no solicita ni conserva credenciales. Para un diagnostico inicial alcanza un dominio publico y contexto no sensible. Accesos de implementacion, cuando correspondan, deben usar permisos minimos, canales controlados, aprobacion y rollback fuera de este chat.',
    detailed: 'Passwords, cookies, API keys, private keys, bearer tokens y datos de pago estan fuera de alcance. `robots.txt` tampoco protege informacion privada. Cualquier futura integracion debe separar identidad, autorizacion, consentimiento, secrets brokerage, auditoria metadata-only, idempotencia y rollback.',
    sources: ['security', 'expediente'],
    quick: ['Que datos puedo contar?', 'Como empezar sin dar accesos?', 'Abrir el expediente privado'],
    follow: 'getting_started',
  }),
  pricing: Object.freeze({
    simple: 'El precio depende del estado del sitio y del alcance. Esta guia no inventa una tarifa ni procesa pagos.',
    standard: 'La auditoria publica puede orientar el alcance, pero una propuesta comercial necesita revisar cantidad de sitios, idiomas, contenido, CMS, integraciones y responsables. La guia no cotiza automaticamente ni procesa pagos; ayuda a preparar la informacion para una propuesta revisable.',
    detailed: 'Los costos se separan por diagnostico, saneamiento de conocimiento, archivos de descubrimiento, contenido AEO, implementacion, integraciones y mantenimiento editorial opcional. Una cotizacion valida debe declarar entregables, exclusiones, dependencias, aprobadores y vigencia. No se promete un resultado de ranking o recomendacion como contraprestacion.',
    sources: ['intake', 'methodology'],
    quick: ['Preparar datos para una propuesta', 'Que factores cambian el alcance?', 'Auditar primero'],
    follow: 'intake_expediente',
  }),
  roadmap: Object.freeze({
    simple: 'El MCP publico read-only ya esta desplegado. A2A, acciones WebMCP, voz y x402 conservan gates separados.',
    standard: 'Hoy estan desplegados el descubrimiento publico, auditor, Registry, conocimiento OKF, skill, CLI y MCP read-only. A2A, WebMCP transaccional, x402, voz, memoria persistente y acciones remotas todavia no estan activos y no cuentan como capacidades actuales.',
    detailed: 'El orden es read-only antes que mutaciones: el MCP publico usa herramientas allowlisted; A2A requiere un agente remoto observable, identidad y trazabilidad; WebMCP depende de soporte real de la especificacion; x402 solo aplica a un recurso pago definido. Voz, email, persistencia y ejecucion remota exigen consentimiento, retencion, controles de abuso, auditoria y rollback.',
    sources: ['readiness', 'overview'],
    quick: ['Que funciona hoy?', 'Que diferencia hay con MCP?', 'Como empiezo ahora?'],
    follow: 'overview',
  }),
  navigation: Object.freeze({
    simple: 'Puedo llevarte al auditor, metodologia, Registry, asistente, OKF, CLI o caso Tokenizart.',
    standard: 'El mapa del sitio separa recorridos humanos, recursos para agentes, capacidades activas y roadmap. Decime si queres diagnosticar un sitio, entender la metodologia o preparar informacion.',
    detailed: 'La navegacion publica ofrece auditoria, educacion AEO, sectores, comparacion, preparacion, conocimiento abierto, metodologia, Registry, CLI y casos. Los recursos machine-readable se agrupan por separado para que una persona no tenga que interpretar JSON o Markdown tecnico.',
    sources: ['overview'],
    quick: ['Auditar mi sitio', 'Entender la metodologia', 'Preparar informacion'],
    follow: 'getting_started',
  }),
  clarification: Object.freeze({
    simple: 'Puedo ayudarte, pero necesito ubicar el tema. Que queres ver primero?',
    standard: 'Para no adivinar ni cambiar de tema, elegi que queres ver primero: diagnosticar tu sitio, entender AF-0 a AF-5 o preparar informacion.',
    detailed: 'No tengo un tema anterior suficientemente claro para interpretar esa referencia. Elegi un punto de partida y mantendre ese hilo mientras esta pagina siga abierta.',
    sources: ['overview'],
    quick: ['Diagnosticar mi sitio', 'Entender AF-0 a AF-5', 'Preparar informacion'],
    follow: null,
  }),
  action_boundary: Object.freeze({
    simple: 'Esta guia no puede ejecutar pagos ni cambiar un sitio. Puede ayudarte a preparar el pedido y mostrarte el flujo correcto.',
    standard: 'La guia es publica y read-only: no ejecuta publicaciones, pagos, despliegues ni cambios remotos. Para preparar el alcance podes usar el asistente; cualquier implementacion real necesita expediente, permisos limitados, vista previa y aprobacion humana.',
    detailed: 'Una accion sobre un sitio exige identidad verificada, recursos allowlisted, dry-run, diferencias visibles, aprobador, idempotencia, auditoria y rollback. Esta guia no posee esas capacidades. Puede explicar el proceso y dirigir al intake o expediente sin copiar automaticamente el contenido de la charla.',
    sources: ['intake', 'expediente', 'security'],
    quick: ['Preparar el pedido', 'Abrir el expediente', 'Que permisos serian necesarios?'],
    follow: 'intake_expediente',
  }),
});

const GUIDE_LOCALE_TEXT = Object.freeze({
  en: Object.freeze({
    welcome: ['I am the Agent Friendly Web guide. I help you understand what your website can improve and where to begin.', 'I am the public Agent Friendly Web guide. I can explain how to evaluate your website, what AF-0 through AF-5 mean and which resources make it easier for people and agents to understand. This conversation remains only on this page.', 'I am a deterministic guide backed by a public, versioned catalog. I cite sources and keep context only while this page remains open. I cover audits, AF-0 to AF-5, AEO, crawlers, Registry, OKF, CLI, MCP, Tokenizart and roadmap boundaries. I use no external model, access no private dossier and execute no action.'],
    overview: ['Agent Friendly Web helps a website become easier to find and understand for people, search engines and agents.', 'Agent Friendly Web diagnoses what an agent can discover publicly, shows missing elements and proposes gradual improvement. It combines human experience, clear content, technical evidence and bounded tools without promising ranking or automatic recommendation.', 'Agent Friendly Web separates discovery, comprehension, tools and governance. It audits public evidence, organizes knowledge, documents crawler policies and versions verifiable capabilities. AF-0 to AF-5 is a transparent proprietary method, not official certification or a guarantee of model inclusion.'],
    af_levels: ['AF-0 means there are almost no useful signals for agents. AF-5 means the service also offers governed tools. Progress happens in stages.', 'AF-0 through AF-5 is the Agent Friendly Web maturity map. AF-0 offers little verifiable context; AF-1 improves discovery; AF-2 organizes explanations; AF-3 publishes documents and contracts; AF-4 adds permissioned tools; AF-5 integrates discovery, bounded operation and governance.', 'The AF scale prevents loose files from being confused with real agentic capability. Each stage requires deployed evidence: crawling, reconciled entities, versioned knowledge, contracts, authenticated tools, scopes, audit, rollback and finally coordinated operation. Planned elements do not count.'],
    getting_started: ['Start with a public audit. It shows what your website exposes today and identifies the first concrete gap.', 'The first step is to audit the public domain. Evidence is separated from owner declarations and missing content. A short roadmap can then be prepared without requesting credentials for the initial diagnosis.', 'The recommended journey is a read-only origin audit, human validation of identity and goals, reconciliation of content and policies, a dossier with scope and approvers, limited implementation, and a new audit with a verifiable receipt. Administrative access is not needed for the baseline.'],
    audit_process: ['Paste the domain into the auditor. It reads public information only and shows what it found and what is missing.', 'The auditor makes read-only requests to public resources such as robots, sitemap, content and catalogs. It does not sign in, write files or prove that a model will recommend the website.', 'The audit controls redirects, network destinations, timeout and response size to reduce SSRF risk. It queries an allowlisted set of public routes and classifies observed evidence. The result is a comparable baseline, not a causal guarantee of traffic, ranking or generated answers.'],
    aeo_crawlers: ['AEO helps assistants find clear answers. Crawler policy decides which bots may read each public area.', 'AEO organizes answers, entities and sources for answer engines. Crawler policies distinguish search, user-requested retrieval and training. They complement SEO and do not guarantee appearance.', 'The AEO layer reconciles real questions, concise and extended answers, Schema.org, canonical routes, dates, owners and sources. Policies distinguish crawler purposes; robots.txt expresses crawling preferences and never replaces authentication for private content.'],
    discovery_files: ['robots.txt guides crawlers, the sitemap lists pages and llms.txt proposes a concise assistant index. Each file has a different purpose.', 'The first layer often reconciles robots.txt, sitemap, visible content, structured data, llms.txt and llms-full.txt. The llms files are a community proposal, not an official standard, and do not replace strong HTML.', 'robots.txt states crawling preferences; sitemaps discover canonical URLs; JSON-LD describes entities; OpenAPI documents real APIs; llms.txt and llms-full.txt propose concise and expanded indexes. Project-specific catalogs must be identified as conventions and contain no secrets.'],
    registry: ['The Registry publishes a verifiable website profile and separates owner declarations from observations.', 'The Registry is a versioned public directory. A profile can display owner declarations, observed evidence, domain verification, deployed resources and planned work without mixing them. It is not a ranking or certification.', 'Registry profiles provide human and machine-readable representations with provenance and explicit states. Domain verification proves control over one challenge; it does not automatically validate every commercial claim.'],
    intake_expediente: ['The assistant organizes loose information. The private dossier stores only what you review and approve through a separate step.', 'Use the assistant to turn unstructured text into field-level proposals. The prototype saves and publishes nothing. The authenticated dossier is a separate surface; transferring data requires explicit approval.', 'The boundary is deliberate: local assistance proposes fields and rejects likely secrets; the dossier isolates data by identity; a future transfer needs preview, field-scoped selection, consent, audit and idempotency. Chat text never becomes a public declaration by itself.'],
    okf: ['OKF packages knowledge with context, sources and versions so people and agents can reuse it.', 'The public OKF distribution groups verifiable Markdown knowledge with metadata, provenance, license, manifest and hashes. It complements APIs, schemas and MCP without replacing them.', 'The AFW OKF v0.2 bundle separates knowledge domains and includes frontmatter, sources, validity, license, a distribution manifest and SHA-256 checksums. Integrity does not by itself establish the truth of each claim.'],
    cli_skills: ['The CLI and skill repeat public audits and reads. They do not change websites.', 'The read-only CLI audits sites, reads Registry profiles and verifies OKF with stable JSON output. The public skill documents safe use. Neither receives credentials nor writes to an origin.', 'CLI v0.1.0 is repository-first with audit, Registry and OKF verification commands. Its contract declares GET only and no local or remote writes. A skill is executable guidance for an agent, not additional permission or an MCP server.'],
    tokenizart: ['Tokenizart is the first integral case used to test how a complex platform can be explained to people and agents.', 'Tokenizart combines an institutional website, Atelier, public knowledge, tools and owner-operation boundaries. AFW records the baseline and prepares improvements without presenting pending integration as deployed.', 'The case separates tokenizart.com, Atelier and versioned agentic assets. Public evidence is audited, while proposed packages require controlled review and publishing. Owner Live, Atelier actions and private data remain within separate authenticated boundaries.'],
    security: ['Do not paste passwords, tokens or payment data. The guide needs only general questions and public links.', 'The guide never requests or stores credentials. A public domain and non-sensitive context are enough for an initial diagnosis. Implementation access must use minimum permissions, controlled channels, approval and rollback outside this chat.', 'Passwords, cookies, API keys, private keys, bearer tokens and payment data are out of scope. Future integrations must separate identity, authorization, consent, secret brokerage, metadata-only audit, idempotency and rollback.'],
    pricing: ['Price depends on the website state and scope. This guide does not invent a fee or process payment.', 'A public audit can inform scope, but a proposal must review sites, languages, content, CMS, integrations and owners. The guide prepares information for review and does not quote or charge automatically.', 'Costs should be separated into diagnosis, knowledge reconciliation, discovery files, AEO content, implementation, integrations and optional editorial maintenance. A valid quote declares deliverables, exclusions, dependencies, approvers and validity.'],
    roadmap: ['Public read-only MCP is deployed. A2A, production WebMCP actions, voice and x402 remain behind separate gates.', 'Public discovery, audit, Registry, OKF, skill, CLI and read-only MCP are deployed. A2A, transactional WebMCP, x402, voice, persistent memory and remote mutations are not active and do not count as current capabilities.', 'The order remains read-only before mutations: the public MCP has allowlisted tools; A2A requires an observable remote agent, identity and traceability; WebMCP follows actual specification support; x402 is only for a defined paid resource. Voice, email, persistence and remote execution require consent, retention, abuse controls, audit and rollback.'],
    navigation: ['I can take you to the auditor, methodology, Registry, assistant, OKF, CLI, MCP or Tokenizart case.', 'The site map separates human journeys, agent resources, active capabilities and roadmap. Choose whether you want to diagnose a website, understand AF-0 to AF-5 or prepare information.', 'Public navigation includes audit, AEO, sectors, comparison, preparation, open knowledge, methodology, Registry, CLI, MCP and cases. Machine-readable resources remain grouped separately so people do not need to interpret technical JSON.'],
    clarification: ['I can help, but I need one clear topic. What would you like to see first?', 'To avoid guessing or changing topics, choose one starting point: diagnose your website, understand AF-0 to AF-5 or prepare information.', 'There is not enough previous context to interpret that reference safely. Choose one starting point and I will retain that thread while this page stays open.'],
    action_boundary: ['This guide cannot process payments or change a website. It can prepare the request and show the correct flow.', 'The guide is public and read-only: it cannot publish, pay, deploy or make remote changes. Real implementation needs a dossier, limited permissions, preview and human approval.', 'A website action requires verified identity, allowlisted resources, dry-run, visible diffs, an approver, idempotency, audit and rollback. This guide has none of those action capabilities and only routes preparation.'],
  }),
  pt: Object.freeze({
    welcome: ['Sou o guia do Agent Friendly Web. Ajudo você a entender o que seu site pode melhorar e por onde começar.', 'Sou o guia público do Agent Friendly Web. Posso explicar como avaliar seu site, o que significam AF-0 a AF-5 e quais recursos ajudam pessoas e agentes. Esta conversa fica somente nesta página.', 'Sou um guia determinístico baseado em catálogo público e versionado. Cito fontes e mantenho contexto apenas enquanto a página está aberta. Cubro auditoria, AF-0 a AF-5, AEO, crawlers, Registry, OKF, CLI, MCP, Tokenizart e limites do roadmap. Não uso modelo externo nem executo ações.'],
    overview: ['Agent Friendly Web torna um site mais fácil de encontrar e compreender por pessoas, buscadores e agentes.', 'Agent Friendly Web diagnostica o que um agente descobre publicamente, mostra lacunas e propõe evolução gradual. Combina experiência humana, conteúdo claro, evidência técnica e ferramentas limitadas sem prometer ranking.', 'Agent Friendly Web separa descoberta, compreensão, ferramentas e governança. Audita evidências públicas, organiza conhecimento, documenta políticas de crawlers e versiona capacidades verificáveis. AF-0 a AF-5 é método próprio, não certificação oficial.'],
    af_levels: ['AF-0 significa quase nenhum sinal útil para agentes. AF-5 significa que o serviço também oferece ferramentas governadas. O avanço ocorre por etapas.', 'AF-0 a AF-5 é o mapa de maturidade do Agent Friendly Web. AF-0 tem pouco contexto; AF-1 melhora descoberta; AF-2 organiza explicações; AF-3 publica documentos e contratos; AF-4 adiciona ferramentas com permissões; AF-5 integra operação limitada e governança.', 'A escala evita confundir arquivos isolados com capacidade agêntica real. Cada estágio exige evidência implantada: rastreamento, entidades conciliadas, conhecimento versionado, contratos, ferramentas autenticadas, scopes, auditoria, rollback e operação coordenada.'],
    getting_started: ['Comece com uma auditoria pública. Ela mostra o que o site expõe hoje e o primeiro ponto concreto a melhorar.', 'O primeiro passo é auditar o domínio público. A evidência é separada das declarações do owner e do que falta. Depois surge um roadmap curto sem pedir credenciais para o diagnóstico inicial.', 'A jornada recomendada inclui auditoria read-only, validação humana de identidade e objetivos, conciliação de conteúdo e políticas, dossiê com escopo e aprovadores, implementação limitada e nova auditoria com recibo verificável.'],
    audit_process: ['Cole o domínio no auditor. Ele lê somente informações públicas e mostra o que encontrou e o que falta.', 'O auditor faz solicitações read-only para robots, sitemap, conteúdo e catálogos públicos. Não faz login, não grava arquivos e não prova que um modelo recomendará o site.', 'A auditoria controla redirecionamentos, destinos de rede, timeout e tamanho de resposta para reduzir SSRF. Consulta rotas públicas allowlisted e classifica evidência observada como baseline comparável, não garantia causal de tráfego.'],
    aeo_crawlers: ['AEO ajuda assistentes a encontrar respostas claras. A política de crawlers decide quais bots leem cada área pública.', 'AEO organiza respostas, entidades e fontes. Políticas de crawlers distinguem busca, recuperação solicitada e treinamento. Complementam SEO e não garantem aparição.', 'A camada AEO concilia perguntas reais, respostas breves e extensas, Schema.org, rotas canônicas, datas, responsáveis e fontes. robots.txt expressa preferências e nunca substitui autenticação para conteúdo privado.'],
    discovery_files: ['robots.txt orienta crawlers, o sitemap lista páginas e llms.txt propõe um índice curto. Cada arquivo tem função diferente.', 'A primeira camada concilia robots.txt, sitemap, conteúdo visível, dados estruturados, llms.txt e llms-full.txt. Os arquivos llms são proposta comunitária, não padrão oficial, e não substituem HTML de qualidade.', 'robots.txt declara preferências; sitemaps descobrem URLs; JSON-LD descreve entidades; OpenAPI documenta APIs reais; llms.txt propõe índices. Catálogos próprios devem ser identificados como convenções e nunca conter segredos.'],
    registry: ['O Registry publica um perfil verificável e separa declarações do owner de observações.', 'O Registry é um diretório público versionado. Cada perfil pode mostrar declarações, evidência observada, domínio verificado, recursos implantados e trabalho planejado sem misturar estados. Não é ranking ou certificação.', 'Perfis têm representações humanas e machine-readable, procedência e estados explícitos. Verificação de domínio prova controle sobre um desafio, mas não valida automaticamente todas as afirmações comerciais.'],
    intake_expediente: ['O assistente organiza dados soltos. O dossiê privado guarda apenas o que você revisa e aprova em outro passo.', 'Use o assistente para transformar texto desestruturado em propostas por campo. O protótipo não salva nem publica. O dossiê autenticado é outra superfície e uma transferência exige aprovação explícita.', 'A fronteira é deliberada: assistência local propõe campos e rejeita segredos; o dossiê isola dados por identidade; uma transferência futura exige preview, seleção por campo, consentimento, auditoria e idempotência.'],
    okf: ['OKF empacota conhecimento com contexto, fontes e versão para reutilização por pessoas e agentes.', 'A distribuição OKF agrupa conhecimento verificável em Markdown com metadata, procedência, licença, manifesto e hashes. Complementa APIs, schemas e MCP sem substituí-los.', 'O bundle AFW OKF v0.2 separa domínios e inclui frontmatter, fontes, vigência, licença, manifesto e checksums SHA-256. Integridade não comprova sozinha a verdade de cada afirmação.'],
    cli_skills: ['A CLI e a skill repetem auditorias e leituras públicas. Elas não mudam sites.', 'A CLI read-only audita sites, consulta Registry e verifica OKF com JSON estável. A skill pública documenta o uso seguro. Nenhuma recebe credenciais ou grava na origem.', 'CLI v0.1.0 é repository-first com comandos de auditoria, Registry e OKF. Seu contrato declara somente GET e nenhuma escrita. Uma skill é orientação executável, não permissão extra nem servidor MCP.'],
    tokenizart: ['Tokenizart é o primeiro caso integral para testar como explicar uma plataforma complexa a pessoas e agentes.', 'Tokenizart combina site institucional, Atelier, conhecimento público, ferramentas e limites owner. AFW documenta o baseline sem apresentar integração pendente como implantada.', 'O caso separa tokenizart.com, Atelier e ativos agênticos versionados. Evidência pública é auditada; pacotes propostos exigem revisão e publicação controlada. Owner Live, ações Atelier e dados privados permanecem em fronteiras autenticadas.'],
    security: ['Não cole senhas, tokens ou dados de pagamento. O guia precisa apenas de perguntas gerais e links públicos.', 'O guia não solicita nem guarda credenciais. Um domínio público e contexto não sensível bastam para o diagnóstico. A implementação deve usar permissões mínimas, canais controlados, aprovação e rollback fora deste chat.', 'Passwords, cookies, API keys, private keys, bearer tokens e dados de pagamento ficam fora. Integrações futuras separam identidade, autorização, consentimento, secret brokerage, auditoria metadata-only, idempotência e rollback.'],
    pricing: ['O preço depende do estado do site e do escopo. Este guia não inventa tarifa nem processa pagamentos.', 'Uma auditoria pública ajuda no escopo, mas a proposta precisa revisar sites, idiomas, conteúdo, CMS, integrações e responsáveis. O guia prepara informação, sem cotação ou cobrança automática.', 'Custos devem separar diagnóstico, conciliação de conhecimento, arquivos de descoberta, conteúdo AEO, implementação, integrações e manutenção opcional. A proposta declara entregáveis, exclusões, dependências, aprovadores e validade.'],
    roadmap: ['O MCP público read-only está implantado. A2A, ações WebMCP, voz e x402 continuam atrás de gates separados.', 'Descoberta pública, auditor, Registry, OKF, skill, CLI e MCP read-only estão implantados. A2A, WebMCP transacional, x402, voz, memória persistente e mutações remotas não estão ativos.', 'A ordem é read-only antes de mutações: MCP público usa tools allowlisted; A2A exige agente remoto observável, identidade e rastreabilidade; WebMCP segue suporte real; x402 somente para recurso pago definido. Voz, email e execução remota exigem consentimento e auditoria.'],
    navigation: ['Posso levar você ao auditor, metodologia, Registry, assistente, OKF, CLI, MCP ou caso Tokenizart.', 'O mapa separa jornadas humanas, recursos para agentes, capacidades ativas e roadmap. Escolha entre diagnosticar um site, entender AF-0 a AF-5 ou preparar informações.', 'A navegação pública inclui auditoria, AEO, setores, comparação, preparação, conhecimento, metodologia, Registry, CLI, MCP e casos. Recursos machine-readable ficam agrupados para não sobrecarregar pessoas.'],
    clarification: ['Posso ajudar, mas preciso de um tema claro. O que você quer ver primeiro?', 'Para não adivinhar nem mudar de assunto, escolha um ponto: diagnosticar seu site, entender AF-0 a AF-5 ou preparar informações.', 'Não há contexto anterior suficiente para interpretar a referência com segurança. Escolha um ponto e manterei esse fio enquanto a página estiver aberta.'],
    action_boundary: ['Este guia não pode processar pagamentos ou mudar um site. Pode preparar o pedido e mostrar o fluxo correto.', 'O guia é público e read-only: não publica, paga, implanta ou faz mudanças remotas. Implementação real exige dossiê, permissões limitadas, preview e aprovação humana.', 'Uma ação exige identidade verificada, recursos allowlisted, dry-run, diferenças visíveis, aprovador, idempotência, auditoria e rollback. Este guia não possui essas capacidades de ação.'],
  }),
});

const QUICK_TARGETS = Object.freeze({
  welcome: ['getting_started', 'af_levels', 'audit_process'], overview: ['getting_started', 'af_levels', 'tokenizart'],
  af_levels: ['audit_process', 'discovery_files', 'af_levels'], getting_started: ['audit_process', 'intake_expediente', 'discovery_files'],
  audit_process: ['audit_process', 'discovery_files', 'af_levels'], aeo_crawlers: ['discovery_files', 'aeo_crawlers', 'audit_process'],
  discovery_files: ['discovery_files', 'audit_process', 'intake_expediente'], registry: ['intake_expediente', 'registry', 'intake_expediente'],
  intake_expediente: ['intake_expediente', 'security', 'getting_started'], okf: ['cli_skills', 'roadmap', 'tokenizart'],
  cli_skills: ['cli_skills', 'roadmap', 'getting_started'], tokenizart: ['tokenizart', 'overview', 'roadmap'],
  security: ['security', 'getting_started', 'intake_expediente'], pricing: ['intake_expediente', 'pricing', 'audit_process'],
  roadmap: ['overview', 'roadmap', 'getting_started'], navigation: ['audit_process', 'af_levels', 'intake_expediente'],
  clarification: ['audit_process', 'af_levels', 'intake_expediente'], action_boundary: ['intake_expediente', 'intake_expediente', 'security'],
});

const QUICK_LABELS = Object.freeze({
  en: { getting_started: 'Where should I start?', af_levels: 'Understand AF-0 to AF-5', audit_process: 'Audit my website', discovery_files: 'Which discovery files help?', evolution: 'View the visual evolution', intake_expediente: 'Prepare my information', aeo_crawlers: 'Review crawler policy', registry: 'Understand domain verification', security: 'What information is safe to share?', cli_skills: 'View read-only tools', roadmap: 'What is deployed today?', tokenizart: 'View the Tokenizart case', overview: 'See active capabilities', pricing: 'Prepare a scoped proposal' },
  pt: { getting_started: 'Por onde começo?', af_levels: 'Entender AF-0 a AF-5', audit_process: 'Auditar meu site', discovery_files: 'Quais arquivos de descoberta ajudam?', evolution: 'Ver a evolução visual', intake_expediente: 'Preparar minhas informações', aeo_crawlers: 'Revisar política de crawlers', registry: 'Entender verificação de domínio', security: 'Quais dados posso compartilhar?', cli_skills: 'Ver ferramentas read-only', roadmap: 'O que está implantado hoje?', tokenizart: 'Ver o caso Tokenizart', overview: 'Ver capacidades ativas', pricing: 'Preparar uma proposta com escopo' },
});

const SOURCE_ROUTES = Object.freeze({
  overview: ['siteMap'], methodology: ['methodology'], audit: ['home', 'auditar'], aeo: ['aeo'],
  registry: ['registry'], intake: ['assistant'], expediente: ['dossier'], okf: ['openKnowledge'],
  cli: ['cli'], tokenizart: ['tokenizartCase'],
});

const SOURCE_TITLES = Object.freeze({
  en: { overview: 'Complete site map', methodology: 'AF-0 to AF-5 methodology', audit: 'Public read-only auditor', aeo: 'AEO and crawler policy', registry: 'Public Registry', intake: 'Preparation assistant', expediente: 'Private dossier', okf: 'Open knowledge OKF', cli: 'Read-only CLI', tokenizart: 'Tokenizart case', readiness: 'Capability manifest', security: 'Security policy' },
  pt: { overview: 'Mapa completo do site', methodology: 'Metodologia AF-0 a AF-5', audit: 'Auditor público read-only', aeo: 'AEO e política de crawlers', registry: 'Registry público', intake: 'Assistente de preparação', expediente: 'Dossiê privado', okf: 'Conhecimento aberto OKF', cli: 'CLI read-only', tokenizart: 'Caso Tokenizart', readiness: 'Manifesto de capacidades', security: 'Política de segurança' },
});

function guideLocale(value) {
  const locale = normalizeLocale(value);
  return locale === 'en' || locale === 'pt' ? locale : 'es';
}

function localizedQuick(topic, locale) {
  if (locale === 'es') return [...TOPICS[topic].quick];
  const targets = QUICK_TARGETS[topic] || QUICK_TARGETS.clarification;
  return targets.map((target) => QUICK_LABELS[locale][target] || QUICK_LABELS[locale].getting_started);
}

function quickReplyTopic(message, locale) {
  if (locale === 'es') return QUICK_REPLY_TOPICS[normalize(message).replace(/[¿?!.]/g, '').trim()] || null;
  const value = normalize(message).replace(/[¿?!.]/g, '').trim();
  for (const [target, label] of Object.entries(QUICK_LABELS[locale])) {
    if (normalize(label).replace(/[¿?!.]/g, '').trim() === value) return target === 'evolution' ? 'af_levels' : target;
  }
  return null;
}

function localizedTopic(topic, locale) {
  if (locale === 'es') return TOPICS[topic];
  const [simple, standard, detailed] = GUIDE_LOCALE_TEXT[locale][topic] || GUIDE_LOCALE_TEXT[locale].clarification;
  return { ...TOPICS[topic], simple, standard, detailed, quick: localizedQuick(topic, locale) };
}

function localizedSource(id, locale) {
  if (locale === 'es') return SOURCE_CATALOG[id];
  const original = SOURCE_CATALOG[id];
  const route = SOURCE_ROUTES[id];
  const url = route
    ? localizedPath(route[0], locale, route[1] ? { hash: route[1] } : {})
    : original.url;
  return { ...original, title: SOURCE_TITLES[locale][id] || original.title, url: url || original.url };
}

const secretPattern = new RegExp([
  '\\bbearer\\s+[a-z0-9._~-]{8,}',
  '\\bsk-[a-z0-9_-]{8,}',
  '\\bghp_[a-z0-9]{8,}',
  '\\b(?:api[_ -]?key|password|contrase(?:n|ñ)a|private[_ -]?key|secret[_ -]?key)\\s*(?:es|is|=|:)\\s*["\'`]?\\S{4,}',
  '-----BEGIN(?:[ A-Z]+)? PRIVATE KEY-----',
  '\\b(?:tarjeta|card)\\b[^\\n]{0,30}\\b(?:\\d[ -]?){13,19}\\b',
].join('|'), 'i');
const acknowledgementPattern = /^(?:si|sí|dale|ok|okay|bueno|claro|continua|continuá|mostrame|muestrame|por favor|si[\s,]+dale|sí[\s,]+dale|dale por favor|yes|yes[\s,]+please|sure|go ahead|please|sim|sim[\s,]+por favor|pode|vamos)[,.!\s]*$/i;
const simplePattern = /\b(mas simple|más simple|sin tecnicismos|facil|fácil|resumi|resumilo|en pocas palabras|simpler|more simple|no jargon|summarize|mais simples|sem tecnicismos|resuma|resumir)\b/i;
const detailPattern = /\b(mas detalle|más detalle|profundiza|profundizá|amplia|amplía|tecnico|técnico|more detail|go deeper|technical|explain further|mais detalhes|aprofunde|técnico)\b/i;

const QUICK_REPLY_TOPICS = Object.freeze({
  'quiero saber por donde empezar': 'getting_started',
  'que es af-0 a af-5': 'af_levels',
  'que puede auditar': 'audit_process',
  'como se mide mi sitio': 'audit_process',
  'que documentos aparecen primero': 'discovery_files',
  'ver la evolucion visual': 'af_levels',
  'mostrarme la auditoria paso a paso': 'audit_process',
  'ordenar mis datos primero': 'intake_expediente',
  'auditar mi sitio': 'audit_process',
  'como leo el resultado': 'audit_process',
  'que archivos ayudan': 'discovery_files',
  'como elegir una politica': 'aeo_crawlers',
  'que documento deberia crear primero': 'discovery_files',
  'como se verifica': 'audit_process',
  'como ingreso mi sitio': 'intake_expediente',
  'que significa dominio verificado': 'registry',
  'abrir el asistente de preparacion': 'intake_expediente',
  'que datos no debo incluir': 'security',
  'volver al primer paso': 'getting_started',
  'como verifico los archivos': 'cli_skills',
  'que diferencia hay con mcp': 'roadmap',
  'ver el caso tokenizart': 'tokenizart',
  'ver comandos disponibles': 'cli_skills',
  'como empiezo sin conocimientos tecnicos': 'getting_started',
  'ver el diagnostico tokenizart': 'tokenizart',
  'que recursos ya estan activos': 'overview',
  'que queda pendiente': 'roadmap',
  'que datos puedo contar': 'security',
  'como empezar sin dar accesos': 'getting_started',
  'abrir el expediente privado': 'intake_expediente',
  'preparar datos para una propuesta': 'intake_expediente',
  'que factores cambian el alcance': 'pricing',
  'auditar primero': 'audit_process',
  'que funciona hoy': 'overview',
  'como empiezo ahora': 'getting_started',
  'entender la metodologia': 'af_levels',
  'preparar informacion': 'intake_expediente',
  'diagnosticar mi sitio': 'audit_process',
  'entender af-0 a af-5': 'af_levels',
  'preparar el pedido': 'intake_expediente',
  'abrir el expediente': 'intake_expediente',
  'que permisos serian necesarios': 'security',
});

function clean(value, max = 700) {
  return String(value || '').replace(/[\u0000-\u001f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function normalize(value) {
  return clean(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function safeContext(context) {
  const topic = context && TOPICS[context.topic] ? context.topic : null;
  const mode = ['simple', 'standard', 'detailed'].includes(context?.mode) ? context.mode : 'standard';
  const pending = context && TOPICS[context.pending_follow_up] ? context.pending_follow_up : null;
  return { topic, mode, pending_follow_up: pending };
}

function explicitTopic(message, locale = 'es') {
  const text = normalize(message);
  const quickTopic = quickReplyTopic(text, locale);
  if (quickTopic) return quickTopic;
  if (/\b(mcp|a2a|webmcp|x402|protocolo 402|voz|webrtc|plugin|plugins)\b/.test(text)) return 'roadmap';
  if (/\b(af[ -]?[0-5]|nivel(?:es)? af|madurez|f0|f1|f2|f3|f4|f5)\b/.test(text)) return 'af_levels';
  if (/\b(aeo|crawler|crawlers|gptbot|claudebot|google-extended|google extended|perplexitybot|bot de ia)\b/.test(text)) return 'aeo_crawlers';
  if (/\b(robots\.txt|sitemap|llms(?:-full)?\.txt|json-ld|jsonld|schema\.org|datos estructurados|archivo agentico|archivos ayudan|documento deberia)\b/.test(text)) return 'discovery_files';
  if (/\b(registry|registro publico|dominio verificado|verificacion de dominio)\b/.test(text)) return 'registry';
  if (/\b(expediente|dossier|formulario|form|intake|ordenar (?:mis )?datos|preparar (?:mis )?datos|preparar informacion|asistente de preparacion|organize (?:my )?information|prepare (?:my )?information|organizar (?:meus|minhas )?dados|preparar (?:meus|minhas )?dados)\b/.test(text)) return 'intake_expediente';
  if (/\b(okf|open knowledge|conocimiento abierto)\b/.test(text)) return 'okf';
  if (/\b(cli|linea de comandos|skill|skills|comandos disponibles)\b/.test(text)) return 'cli_skills';
  if (/\b(tokenizart|atelier|primer caso integral)\b/.test(text)) return 'tokenizart';
  if (/\b(seguridad|security|seguranca|segurança|privacidad|privacy|privacidade|credencial|credenciales|credentials|secreto|secretos|secret|api key|password|contrasena|senha|private key|permisos necesarios|datos puedo contar|dar accesos|safe to share)\b/.test(text)) return 'security';
  if (/\b(precio|price|pricing|preco|preço|precios|cuanto cuesta|how much|costo|cost|custos|cotizacion|quote|orcamento|orçamento|presupuesto|propuesta comercial)\b/.test(text)) return 'pricing';
  if (/\b(publica|publish|publicar|deploy|despliega|desplegar|implantar|modifica|modify|mudar|cambia mi sitio|paga|pay|pagar|ejecuta|execute)\b/.test(text)) return 'action_boundary';
  if (/\b(auditar|audit|auditoria|diagnosticar|diagnose|diagnostico|medir mi sitio|measure my site|que puede auditar|what can you audit|como leo el resultado)\b/.test(text)) return 'audit_process';
  if (/\b(como empiezo|por donde empezar|how do i start|where should i start|first step|por onde comeco|por onde começo|primeiro passo|empezar ahora|mejorar mi sitio|improving my website|melhorar meu site|sin conocimientos tecnicos|volver al primer paso)\b/.test(text)) return 'getting_started';
  if (/\b(que es agent friendly|what is agent friendly|o que e agent friendly|o que é agent friendly|que hacen|what do you do|para que sirve|que funciona hoy|capacidades activas|active capabilities)\b/.test(text)) return 'overview';
  if (/\b(mapa|map|donde encuentro|where can i find|onde encontro|secciones|sections|secoes|seções|navegar|navigate)\b/.test(text)) return 'navigation';
  if (/^(hola|hello|hi|bom dia|boa tarde|boa noite|ola|olá|buen dia|buenas|buenas tardes|buenas noches|hola quiero saber|hola necesito ayuda)[.!\s]*$/.test(text)) return 'welcome';
  return null;
}

function sourcesFor(topic, locale) {
  return TOPICS[topic].sources.map((id) => localizedSource(id, locale));
}

function makeTurn(topic, mode, options = {}, locale = 'es') {
  const definition = localizedTopic(topic, locale);
  const answerMode = ['simple', 'standard', 'detailed'].includes(mode) ? mode : 'standard';
  return {
    contract: 'agent-friendly-web.public-guide-turn.v1',
    topic,
    mode: answerMode,
    blocked: Boolean(options.blocked),
    answer: definition[answerMode],
    quick_replies: [...definition.quick],
    sources: options.noSources ? [] : sourcesFor(topic, locale),
    next_context: {
      topic,
      mode: answerMode,
      pending_follow_up: definition.follow,
    },
  };
}

export function respondToPublicGuide({ locale: requestedLocale = 'es', message = '', context = PUBLIC_GUIDE_INITIAL_CONTEXT } = {}) {
  const locale = guideLocale(requestedLocale);
  const input = clean(message);
  const current = safeContext(context);

  if (secretPattern.test(input)) {
    const blockedCopy = locale === 'en'
      ? { answer: 'The message appears to contain credentials, secrets or payment data. Remove them before continuing; I do not need them to guide you.', quick: ['What information is safe to share?', 'Where should I start?'] }
      : locale === 'pt'
        ? { answer: 'A mensagem parece conter credenciais, segredos ou dados de pagamento. Remova-os antes de continuar; não preciso deles para orientar você.', quick: ['Quais dados posso compartilhar?', 'Por onde começo?'] }
        : { answer: 'El mensaje parece contener credenciales, secretos o datos de pago. Retiralos antes de continuar; no necesito esos datos para orientarte.', quick: ['Que datos puedo contar?', 'Como empezar sin dar accesos?'] };
    return {
      contract: 'agent-friendly-web.public-guide-turn.v1',
      topic: 'security_block',
      mode: 'simple',
      blocked: true,
      answer: blockedCopy.answer,
      quick_replies: blockedCopy.quick,
      sources: [],
      next_context: { topic: 'security', mode: 'simple', pending_follow_up: 'getting_started' },
    };
  }

  if (!input) return makeTurn('welcome', 'standard', {}, locale);

  const explicit = explicitTopic(input, locale);
  if (explicit) {
    const requestedMode = simplePattern.test(input) ? 'simple' : detailPattern.test(input) ? 'detailed' : current.mode;
    return makeTurn(explicit, requestedMode, {}, locale);
  }

  if (simplePattern.test(input) && current.topic) return makeTurn(current.topic, 'simple', {}, locale);
  if (detailPattern.test(input) && current.topic) return makeTurn(current.topic, 'detailed', {}, locale);

  if (acknowledgementPattern.test(input)) {
    return current.pending_follow_up
      ? makeTurn(current.pending_follow_up, current.mode, {}, locale)
      : makeTurn('clarification', current.mode, {}, locale);
  }

  return makeTurn('clarification', current.mode, {}, locale);
}
