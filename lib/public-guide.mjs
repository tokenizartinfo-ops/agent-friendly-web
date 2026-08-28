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
    simple: 'MCP, A2A, WebMCP, voz y x402 todavia no estan desplegados en Agent Friendly Web. Estan separados en el roadmap.',
    standard: 'Hoy estan desplegados el descubrimiento publico, auditor, Registry, conocimiento OKF, skill y CLI read-only. MCP, A2A, WebMCP, x402, voz, memoria y acciones remotas todavia no estan desplegados: conservan gates separados y no cuentan como capacidades activas.',
    detailed: 'El orden previsto es read-only antes que mutaciones: contrato y CLI ya verificables; luego MCP read-only con herramientas allowlisted; A2A solo con agente remoto, identidad y trazabilidad; WebMCP sujeto a especificacion y soporte real; x402 solo para un recurso pago definido y sin sustituir autorizacion. Voz, email, persistencia y ejecucion remota exigen consentimiento, retencion, abuso, auditoria y rollback.',
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

const secretPattern = new RegExp([
  '\\bbearer\\s+[a-z0-9._~-]{8,}',
  '\\bsk-[a-z0-9_-]{8,}',
  '\\bghp_[a-z0-9]{8,}',
  '\\b(?:api[_ -]?key|password|contrase(?:n|ñ)a|private[_ -]?key|secret[_ -]?key)\\s*(?:es|is|=|:)\\s*["\'`]?\\S{4,}',
  '-----BEGIN(?:[ A-Z]+)? PRIVATE KEY-----',
  '\\b(?:tarjeta|card)\\b[^\\n]{0,30}\\b(?:\\d[ -]?){13,19}\\b',
].join('|'), 'i');
const acknowledgementPattern = /^(?:si|sí|dale|ok|okay|bueno|claro|continua|continuá|mostrame|muestrame|por favor|si[\s,]+dale|sí[\s,]+dale|dale por favor)[,.!\s]*$/i;
const simplePattern = /\b(mas simple|más simple|sin tecnicismos|facil|fácil|resumi|resumilo|en pocas palabras)\b/i;
const detailPattern = /\b(mas detalle|más detalle|profundiza|profundizá|amplia|amplía|tecnico|técnico)\b/i;

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

function explicitTopic(message) {
  const text = normalize(message);
  const quickTopic = QUICK_REPLY_TOPICS[text.replace(/[¿?!.]/g, '').trim()];
  if (quickTopic) return quickTopic;
  if (/\b(mcp|a2a|webmcp|x402|protocolo 402|voz|webrtc|plugin|plugins)\b/.test(text)) return 'roadmap';
  if (/\b(af[ -]?[0-5]|nivel(?:es)? af|madurez|f0|f1|f2|f3|f4|f5)\b/.test(text)) return 'af_levels';
  if (/\b(aeo|crawler|crawlers|gptbot|claudebot|google-extended|google extended|perplexitybot|bot de ia)\b/.test(text)) return 'aeo_crawlers';
  if (/\b(robots\.txt|sitemap|llms(?:-full)?\.txt|json-ld|jsonld|schema\.org|datos estructurados|archivo agentico|archivos ayudan|documento deberia)\b/.test(text)) return 'discovery_files';
  if (/\b(registry|registro publico|dominio verificado|verificacion de dominio)\b/.test(text)) return 'registry';
  if (/\b(expediente|formulario|intake|ordenar (?:mis )?datos|preparar (?:mis )?datos|preparar informacion|asistente de preparacion)\b/.test(text)) return 'intake_expediente';
  if (/\b(okf|open knowledge|conocimiento abierto)\b/.test(text)) return 'okf';
  if (/\b(cli|linea de comandos|skill|skills|comandos disponibles)\b/.test(text)) return 'cli_skills';
  if (/\b(tokenizart|atelier|primer caso integral)\b/.test(text)) return 'tokenizart';
  if (/\b(seguridad|privacidad|credencial|credenciales|secreto|secretos|api key|password|contrasena|private key|permisos necesarios|datos puedo contar|dar accesos)\b/.test(text)) return 'security';
  if (/\b(precio|precios|cuanto cuesta|costo|costos|cotizacion|presupuesto|propuesta comercial)\b/.test(text)) return 'pricing';
  if (/\b(publica|publicar|despliega|desplegar|modifica|cambia mi sitio|paga|pagar ahora|ejecuta)\b/.test(text)) return 'action_boundary';
  if (/\b(auditar|auditoria|diagnosticar|diagnostico|medir mi sitio|que puede auditar|como leo el resultado)\b/.test(text)) return 'audit_process';
  if (/\b(como empiezo|por donde empezar|primer paso|empezar ahora|mejorar mi sitio|sin conocimientos tecnicos|volver al primer paso)\b/.test(text)) return 'getting_started';
  if (/\b(que es agent friendly|que hacen|para que sirve|que funciona hoy|capacidades activas)\b/.test(text)) return 'overview';
  if (/\b(mapa|donde encuentro|secciones|navegar)\b/.test(text)) return 'navigation';
  if (/^(hola|buen dia|buenas|buenas tardes|buenas noches|hola quiero saber|hola necesito ayuda)[.!\s]*$/.test(text)) return 'welcome';
  return null;
}

function sourcesFor(topic) {
  return TOPICS[topic].sources.map((id) => SOURCE_CATALOG[id]);
}

function makeTurn(topic, mode, options = {}) {
  const definition = TOPICS[topic];
  const answerMode = ['simple', 'standard', 'detailed'].includes(mode) ? mode : 'standard';
  return {
    contract: 'agent-friendly-web.public-guide-turn.v1',
    topic,
    mode: answerMode,
    blocked: Boolean(options.blocked),
    answer: definition[answerMode],
    quick_replies: [...definition.quick],
    sources: options.noSources ? [] : sourcesFor(topic),
    next_context: {
      topic,
      mode: answerMode,
      pending_follow_up: definition.follow,
    },
  };
}

export function respondToPublicGuide({ message = '', context = PUBLIC_GUIDE_INITIAL_CONTEXT } = {}) {
  const input = clean(message);
  const current = safeContext(context);

  if (secretPattern.test(input)) {
    return {
      contract: 'agent-friendly-web.public-guide-turn.v1',
      topic: 'security_block',
      mode: 'simple',
      blocked: true,
      answer: 'El mensaje parece contener credenciales, secretos o datos de pago. Retiralos antes de continuar; no necesito esos datos para orientarte.',
      quick_replies: ['Que datos puedo contar?', 'Como empezar sin dar accesos?'],
      sources: [],
      next_context: { topic: 'security', mode: 'simple', pending_follow_up: 'getting_started' },
    };
  }

  if (!input) return makeTurn('welcome', 'standard');

  const explicit = explicitTopic(input);
  if (explicit) {
    const requestedMode = simplePattern.test(input) ? 'simple' : detailPattern.test(input) ? 'detailed' : current.mode;
    return makeTurn(explicit, requestedMode);
  }

  if (simplePattern.test(input) && current.topic) return makeTurn(current.topic, 'simple');
  if (detailPattern.test(input) && current.topic) return makeTurn(current.topic, 'detailed');

  if (acknowledgementPattern.test(input)) {
    return current.pending_follow_up
      ? makeTurn(current.pending_follow_up, current.mode)
      : makeTurn('clarification', current.mode);
  }

  return makeTurn('clarification', current.mode);
}
