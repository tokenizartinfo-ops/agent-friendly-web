const item = (id, intents, sources, es, en, pt) => Object.freeze({
  id,
  intents: Object.freeze(intents),
  sources: Object.freeze(sources),
  es: Object.freeze(es),
  en: Object.freeze(en),
  pt: Object.freeze(pt),
});

const answer = (question, shortAnswer, detailedAnswer) => ({ question, shortAnswer, detailedAnswer });

export const PUBLIC_FAQ_ITEMS = Object.freeze([
  item('agent-friendly-meaning', ['agent friendly', 'agent first', 'sitio para agentes'], ['methodology', 'aeo'],
    answer('¿Qué significa que un sitio sea agent friendly?', 'Significa que personas y agentes pueden encontrar, comprender y verificar lo que el sitio ofrece.', 'Un sitio agent friendly combina contenido claro, rutas públicas coherentes, datos estructurados, fuentes, fechas y límites. Las herramientas se declaran solo cuando existen y toda acción sensible mantiene identidad, permiso, auditoría y control humano.'),
    answer('What does it mean for a website to be agent friendly?', 'It means people and agents can find, understand and verify what the website offers.', 'An agent-friendly website combines clear content, coherent public routes, structured data, sources, dates and boundaries. Tools are declared only when they exist, while sensitive actions retain identity, permission, audit and human control.'),
    answer('O que significa um site ser agent friendly?', 'Significa que pessoas e agentes podem encontrar, compreender e verificar o que o site oferece.', 'Um site agent friendly combina conteúdo claro, rotas públicas coerentes, dados estruturados, fontes, datas e limites. Ferramentas só são declaradas quando existem e ações sensíveis mantêm identidade, permissão, auditoria e controle humano.')),
  item('automatic-progression', ['automatico', 'automático', 'automatic', 'af-0 af-5', 'f0 f5'], ['evolution', 'methodology'],
    answer('¿El paso de AF-0 a AF-5 es automático?', 'No. La evolución no es automática ni se obtiene agregando etiquetas sin evidencia.', 'Cada nivel exige trabajo verificable: publicar evidencia, implementar la capacidad, probarla, declarar límites, obtener aprobación humana cuando corresponde y volver a medir. No todos los sitios necesitan llegar a AF-5.'),
    answer('Is progression from AF-0 to AF-5 automatic?', 'No. Progress is not automatic and cannot be earned by adding labels without evidence.', 'Each level requires verifiable work: publish evidence, implement the capability, test it, declare boundaries, obtain human approval where needed and measure again. Not every website needs to reach AF-5.'),
    answer('A passagem de AF-0 para AF-5 é automática?', 'Não. A evolução não é automática nem resulta de etiquetas sem evidência.', 'Cada nível exige trabalho verificável: publicar evidência, implementar a capacidade, testá-la, declarar limites, obter aprovação humana quando necessário e medir novamente. Nem todo site precisa chegar a AF-5.')),
  item('audit-boundary', ['auditoria publica', 'public audit', 'auditoria pública', 'que revisa', 'what does the audit'], ['home', 'methodology'],
    answer('¿Qué revisa la auditoría pública?', 'Revisa únicamente evidencia accesible públicamente y no modifica el sitio.', 'La auditoría observa descubrimiento, contenido citable, recursos legibles por máquinas, herramientas, señales experimentales, confianza y comercio. El resultado es una medición propia, no una certificación ni garantía de ranking o recomendación.'),
    answer('What does the public audit inspect?', 'It inspects only publicly accessible evidence and never changes the website.', 'The audit observes discovery, citable content, machine-readable resources, tools, experimental signals, trust and commerce. The result is a proprietary measurement, not certification or a ranking or recommendation guarantee.'),
    answer('O que a auditoria pública verifica?', 'Verifica apenas evidências publicamente acessíveis e não modifica o site.', 'A auditoria observa descoberta, conteúdo citável, recursos legíveis por máquinas, ferramentas, sinais experimentais, confiança e comércio. O resultado é uma medição própria, não certificação ou garantia de ranking ou recomendação.')),
  item('discovery-files', ['robots.txt', 'sitemap.xml', 'archivos agenticos', 'discovery files', 'arquivos agênticos'], ['aeo', 'siteMap'],
    answer('¿Para qué sirven robots.txt, sitemap.xml y los documentos agénticos?', 'Ayudan a localizar rutas, declarar políticas y ofrecer contexto verificable.', 'robots.txt orienta el rastreo, sitemap.xml enumera páginas canónicas y documentos como llms.txt o catálogos describen conocimiento y capacidades. Ningún archivo por sí solo garantiza que un proveedor indexe, cite o recomiende el sitio.'),
    answer('What are robots.txt, sitemap.xml and agent documents for?', 'They help locate routes, declare policies and provide verifiable context.', 'robots.txt guides crawling, sitemap.xml lists canonical pages, and documents such as llms.txt or catalogs describe knowledge and capabilities. No single file guarantees that a provider will index, cite or recommend the website.'),
    answer('Para que servem robots.txt, sitemap.xml e documentos agênticos?', 'Ajudam a localizar rotas, declarar políticas e oferecer contexto verificável.', 'robots.txt orienta o rastreamento, sitemap.xml lista páginas canônicas e documentos como llms.txt ou catálogos descrevem conhecimento e capacidades. Nenhum arquivo garante sozinho indexação, citação ou recomendação.')),
  item('llms-txt', ['llms.txt', 'llms-full.txt', 'llms full'], ['openKnowledge', 'siteMap'],
    answer('¿Qué es llms.txt y qué diferencia tiene con llms-full.txt?', 'Son propuestas de documentos para orientar a asistentes hacia fuentes públicas útiles.', 'llms.txt funciona como índice breve y llms-full.txt ofrece contexto público ampliado. No son estándares universales ni reemplazan HTML, sitemap, datos estructurados, APIs o revisión editorial.'),
    answer('What is llms.txt and how is llms-full.txt different?', 'They are proposed documents that point assistants toward useful public sources.', 'llms.txt works as a concise index while llms-full.txt provides expanded public context. They are not universal standards and do not replace HTML, sitemaps, structured data, APIs or editorial review.'),
    answer('O que é llms.txt e qual a diferença para llms-full.txt?', 'São propostas de documentos que orientam assistentes para fontes públicas úteis.', 'llms.txt funciona como índice breve e llms-full.txt oferece contexto público ampliado. Não são padrões universais e não substituem HTML, sitemap, dados estruturados, APIs ou revisão editorial.')),
  item('aeo-meaning', ['aeo', 'answer engine optimization', 'posicionamiento agentico', 'otimizacao de respostas'], ['aeo'],
    answer('¿Qué es AEO y cómo se relaciona con SEO?', 'AEO organiza respuestas, entidades, fuentes y vigencia para que asistentes comprendan mejor el sitio.', 'SEO y AEO se complementan. SEO ayuda a encontrar páginas; AEO mejora la claridad y citabilidad de sus respuestas. Ninguno permite prometer una posición, una cita o una recomendación concreta.'),
    answer('What is AEO and how does it relate to SEO?', 'AEO organizes answers, entities, sources and freshness so assistants can understand a website better.', 'SEO and AEO complement each other. SEO helps pages get found; AEO improves answer clarity and citability. Neither can promise a particular position, citation or recommendation.'),
    answer('O que é AEO e como se relaciona com SEO?', 'AEO organiza respostas, entidades, fontes e atualidade para que assistentes entendam melhor o site.', 'SEO e AEO se complementam. SEO ajuda páginas a serem encontradas; AEO melhora clareza e citação das respostas. Nenhum promete posição, citação ou recomendação específica.')),
  item('crawler-policies', ['gptbot', 'claudebot', 'google-extended', 'crawler policy', 'politica de crawlers'], ['aeo'],
    answer('¿Se puede definir una política distinta para cada crawler de IA?', 'Sí. El owner puede declarar reglas separadas según proveedor y finalidad.', 'GPTBot, OAI-SearchBot, ClaudeBot, Google-Extended y otros identificadores tienen funciones y controles diferentes. Búsqueda, recuperación solicitada por un usuario y entrenamiento deben evaluarse por separado con fuentes oficiales vigentes.'),
    answer('Can an owner define a different policy for each AI crawler?', 'Yes. An owner can declare separate rules by provider and purpose.', 'GPTBot, OAI-SearchBot, ClaudeBot, Google-Extended and other identifiers have different functions and controls. Search, user-requested retrieval and training should be evaluated separately against current official sources.'),
    answer('É possível definir uma política diferente para cada crawler de IA?', 'Sim. O owner pode declarar regras separadas por provedor e finalidade.', 'GPTBot, OAI-SearchBot, ClaudeBot, Google-Extended e outros identificadores possuem funções e controles diferentes. Busca, recuperação solicitada e treinamento devem ser avaliados separadamente com fontes oficiais atuais.')),
  item('registry-purpose', ['registry', 'registro publico', 'perfil verificado', 'verified domain'], ['registry'],
    answer('¿Qué acredita el Registry público?', 'Publica una declaración versionada y puede verificar el control de un dominio.', 'El Registry separa datos declarados por el owner, observaciones y evidencia de dominio. Verificar un challenge acredita control técnico puntual; no concede acceso al hosting, propiedad legal, autorización de escritura ni certificación general.'),
    answer('What does the public Registry establish?', 'It publishes a versioned declaration and may verify control of a domain.', 'The Registry separates owner declarations, observations and domain evidence. Verifying a challenge establishes specific technical control; it grants no hosting access, legal ownership, write authorization or general certification.'),
    answer('O que o Registry público comprova?', 'Publica uma declaração versionada e pode verificar o controle de um domínio.', 'O Registry separa declarações do owner, observações e evidência de domínio. Verificar um challenge comprova controle técnico pontual; não concede acesso ao hosting, propriedade legal, autorização de escrita ou certificação geral.')),
  item('safe-access', ['contrasena', 'contraseña', 'password', 'senha', 'senhas', 'credencial', 'accesos', 'access credentials'], ['methodology', 'siteMap'],
    answer('¿Tengo que entregar contraseñas para empezar?', 'No. El diagnóstico público no necesita contraseñas y el relevamiento puede comenzar sin accesos.', 'Cuando una implementación requiere acceso, conviene usar permisos temporales, mínimos y revocables o una cápsula revisable. Nunca deben enviarse secretos por chat, FAQ, Registry, OKF o documentación pública.'),
    answer('Do I need to share passwords to get started?', 'No. The public diagnostic needs no passwords and discovery can begin without access.', 'When implementation needs access, use temporary, least-privilege and revocable permissions or a reviewable capsule. Secrets must never be sent through chat, FAQ, Registry, OKF or public documentation.'),
    answer('Preciso compartilhar senhas para começar?', 'Não. O diagnóstico público não precisa de senhas e o levantamento pode começar sem acessos.', 'Quando a implementação exige acesso, use permissões temporárias, mínimas e revogáveis ou uma cápsula revisável. Segredos nunca devem ser enviados por chat, FAQ, Registry, OKF ou documentação pública.')),
  item('cli-mcp-status', ['cli mcp', 'mcp disponible', 'mcp available', 'ferramentas publicas'], ['cli', 'mcp'],
    answer('¿Qué herramientas públicas están disponibles hoy?', 'La CLI y el MCP público están desplegados en modo read-only para auditoría, método, Registry y OKF.', 'Las herramientas actuales consultan evidencia ya pública, usan contratos versionados y no guardan memoria ni modifican sitios. A2A, acciones owner, pagos y otras capacidades conservan gates separados y no se presentan como activas.'),
    answer('Which public tools are available today?', 'The CLI and public MCP are deployed read-only for audit, methodology, Registry and OKF.', 'Current tools query already-public evidence, use versioned contracts, keep no memory and change no websites. A2A, owner actions, payments and other capabilities retain separate gates and are not presented as active.'),
    answer('Quais ferramentas públicas estão disponíveis hoje?', 'A CLI e o MCP público estão implantados em modo read-only para auditoria, método, Registry e OKF.', 'As ferramentas atuais consultam evidência pública, usam contratos versionados, não mantêm memória e não modificam sites. A2A, ações owner, pagamentos e outras capacidades possuem gates separados.')),
  item('pricing', ['precio', 'precios', 'cuanto cuesta', 'price', 'pricing', 'preco', 'preço', 'orcamento'], ['dossier', 'methodology'],
    answer('¿Cuánto cuesta mejorar un sitio?', 'El diagnóstico público es accesible sin credenciales; la implementación se cotiza según evidencia, control técnico y alcance.', 'No se inventa un precio único porque un sitio puede requerir solo documentos o también contenido, datos estructurados, APIs, coordinación con un proveedor y validación externa. El expediente reúne contexto para emitir una propuesta revisable antes de cualquier pago.'),
    answer('How much does improving a website cost?', 'The public diagnostic is available without credentials; implementation is quoted by evidence, technical control and scope.', 'There is no invented one-size price because a website may need only documents or also content, structured data, APIs, provider coordination and external validation. The dossier gathers context for a reviewable proposal before any payment.'),
    answer('Quanto custa melhorar um site?', 'O diagnóstico público está disponível sem credenciais; a implementação é cotada por evidência, controle técnico e escopo.', 'Não existe um preço único inventado porque um site pode precisar apenas de documentos ou também conteúdo, dados estruturados, APIs, coordenação com fornecedor e validação externa. O dossiê reúne contexto antes de qualquer pagamento.')),
  item('external-verification', ['auditoria externa', 'external verification', 'verificacao externa', 'cloudflare score'], ['externalVerification'],
    answer('¿Cómo se comprueba que el trabajo mejoró el sitio?', 'Se compara evidencia fechada antes y después y, cuando corresponde, se suma una auditoría externa.', 'Agent Friendly Web conserva URL, fecha, proveedor, señales y límites. Auditores distintos miden cosas distintas; por eso sus resultados complementan, pero no sustituyen, pruebas directas, metodología transparente y revisión humana.'),
    answer('How can an owner verify that the work improved the website?', 'Compare dated evidence before and after, and add external verification where appropriate.', 'Agent Friendly Web records URL, date, provider, signals and limitations. Different auditors measure different things, so their results complement rather than replace direct tests, transparent methodology and human review.'),
    answer('Como o owner verifica que o trabalho melhorou o site?', 'Compare evidências datadas antes e depois e use verificação externa quando apropriado.', 'Agent Friendly Web registra URL, data, provedor, sinais e limites. Auditores diferentes medem elementos diferentes; os resultados complementam, mas não substituem, testes diretos, metodologia transparente e revisão humana.')),
  item('tokenizart-case', ['tokenizart', 'atelier', 'primer caso', 'first case'], ['tokenizartCase'],
    answer('¿Por qué Tokenizart es el primer caso integral?', 'Porque permite validar descubrimiento, conocimiento, herramientas públicas y futuras capacidades owner en un ecosistema real.', 'Tokenizart explica identidad, provenance y filosofía owner-first; Atelier es la plataforma operativa. El caso publica solo capacidades verificables y mantiene Owner Live, Mint, Certify, transferencias, vouchers y pagos detrás de identidad, consentimiento y gates separados.'),
    answer('Why is Tokenizart the first integral case?', 'Because it validates discovery, knowledge, public tools and future owner capabilities in a real ecosystem.', 'Tokenizart explains identity, provenance and its owner-first philosophy; Atelier is the operational platform. The case publishes only verifiable capabilities and keeps Owner Live, Mint, Certify, transfers, vouchers and payments behind identity, consent and separate gates.'),
    answer('Por que Tokenizart é o primeiro caso integral?', 'Porque valida descoberta, conhecimento, ferramentas públicas e futuras capacidades owner em um ecossistema real.', 'Tokenizart explica identidade, provenance e filosofia owner-first; Atelier é a plataforma operacional. O caso publica apenas capacidades verificáveis e mantém Owner Live, Mint, Certify, transferências, vouchers e pagamentos atrás de identidade, consentimento e gates separados.')),
]);

export const PUBLIC_FAQ_COPY = Object.freeze({
  es: { eyebrow: 'Preguntas frecuentes', title: 'Respuestas claras antes de abrir un expediente.', intro: 'Consultá los conceptos centrales, sus límites y el siguiente lugar verificable donde profundizar.', source: 'Ver fuente', all: 'Ver todas las preguntas' },
  en: { eyebrow: 'Frequently asked questions', title: 'Clear answers before opening a dossier.', intro: 'Review the central concepts, their boundaries and the next verifiable source for more detail.', source: 'View source', all: 'View every question' },
  pt: { eyebrow: 'Perguntas frequentes', title: 'Respostas claras antes de abrir um dossiê.', intro: 'Consulte os conceitos centrais, seus limites e a próxima fonte verificável para aprofundar.', source: 'Ver fonte', all: 'Ver todas as perguntas' },
});

const PUBLIC_FAQ_SOURCE_LABELS = Object.freeze({
  es: Object.freeze({
    methodology: 'Metodología AF-0 a AF-5', aeo: 'AEO y crawlers', evolution: 'Evolución agéntica', home: 'Inicio y auditoría',
    siteMap: 'Mapa del sitio', openKnowledge: 'Conocimiento abierto OKF', registry: 'Registry público', cli: 'CLI read-only',
    mcp: 'MCP read-only', dossier: 'Expediente privado', externalVerification: 'Verificación externa', tokenizartCase: 'Caso Tokenizart',
  }),
  en: Object.freeze({
    methodology: 'AF-0 to AF-5 methodology', aeo: 'AEO and crawlers', evolution: 'Agentic evolution', home: 'Home and audit',
    siteMap: 'Site map', openKnowledge: 'Open knowledge OKF', registry: 'Public Registry', cli: 'Read-only CLI',
    mcp: 'Read-only MCP', dossier: 'Private dossier', externalVerification: 'External verification', tokenizartCase: 'Tokenizart case',
  }),
  pt: Object.freeze({
    methodology: 'Metodologia AF-0 a AF-5', aeo: 'AEO e crawlers', evolution: 'Evolução agêntica', home: 'Início e auditoria',
    siteMap: 'Mapa do site', openKnowledge: 'Conhecimento aberto OKF', registry: 'Registry público', cli: 'CLI read-only',
    mcp: 'MCP read-only', dossier: 'Dossiê privado', externalVerification: 'Verificação externa', tokenizartCase: 'Caso Tokenizart',
  }),
});

function localeOf(value) { return ['es', 'en', 'pt'].includes(value) ? value : 'es'; }

export function faqSourceLabel(routeKey, locale = 'es') {
  const safeLocale = localeOf(locale);
  return PUBLIC_FAQ_SOURCE_LABELS[safeLocale][routeKey] || routeKey;
}

export function faqEntries(locale = 'es') {
  const safeLocale = localeOf(locale);
  return PUBLIC_FAQ_ITEMS.map((entry) => Object.freeze({
    id: entry.id,
    intents: entry.intents,
    sources: entry.sources,
    ...entry[safeLocale],
  }));
}

function normalize(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9.]+/g, ' ').trim();
}

export function matchPublicFaq(message, locale = 'es') {
  const input = normalize(message);
  if (!input) return null;
  for (const entry of faqEntries(locale)) {
    const phrases = [...entry.intents, entry.question].map(normalize);
    if (phrases.some((phrase) => phrase.length > 2 && input.includes(phrase))) return entry;
  }
  return null;
}
