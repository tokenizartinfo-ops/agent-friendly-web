const categoryIds = ['discovery', 'answerability', 'machineContent', 'tools', 'experimental', 'trust', 'commerce'];

const comicFiles = {
  es: [
    { level: 'F0 → F1', title: 'Puerta de entrada', detail: 'robots.txt y sitemap.xml hacen visible la estructura pública.', status: 'Publicado', href: '/robots.txt' },
    { level: 'F1', title: 'Contexto para agentes', detail: 'llms.txt y llms-full.txt resumen propósito, fuentes y límites.', status: 'Publicado', href: '/llms.txt' },
    { level: 'F2', title: 'Conocimiento verificable', detail: 'JSON-LD y OKF ordenan conceptos, procedencia y vigencia.', status: 'Verificable', href: '/okf/v0.2/index.md' },
    { level: 'F2 → F3', title: 'Contratos y catálogo', detail: 'OpenAPI y CLI exponen consultas con formatos estables.', status: 'Desplegado', href: '/openapi.json' },
    { level: 'F3', title: 'Herramientas públicas', detail: 'MCP read-only y skills permiten consultar sin tomar el control.', status: 'Desplegado', href: '/.well-known/mcp/server-card.json' },
    { level: 'F3', title: 'Registro y evidencia', detail: 'Registry y AF-EV separan declaración, observación y verificación.', status: 'Activo', routeKey: 'registry' },
    { level: 'F4', title: 'Identidad y permisos', detail: 'Consentimiento, alcance, auditoría y rollback antes de delegar.', status: 'Planificado', routeKey: 'methodology' },
    { level: 'F5', title: 'Coordinación agent-native', detail: 'A2A y pagos solo cuando exista una operación gobernada y útil.', status: 'Investigación', routeKey: 'siteMap' },
  ],
  en: [
    { level: 'F0 → F1', title: 'Entry point', detail: 'robots.txt and sitemap.xml expose the public structure.', status: 'Published', href: '/robots.txt' },
    { level: 'F1', title: 'Context for agents', detail: 'llms.txt and llms-full.txt summarize purpose, sources and limits.', status: 'Published', href: '/llms.txt' },
    { level: 'F2', title: 'Verifiable knowledge', detail: 'JSON-LD and OKF organize concepts, provenance and freshness.', status: 'Verifiable', href: '/okf/v0.2/index.md' },
    { level: 'F2 → F3', title: 'Contracts and catalog', detail: 'OpenAPI and the CLI expose queries through stable formats.', status: 'Deployed', href: '/openapi.json' },
    { level: 'F3', title: 'Public tools', detail: 'Read-only MCP and skills support queries without taking control.', status: 'Deployed', href: '/.well-known/mcp/server-card.json' },
    { level: 'F3', title: 'Registry and evidence', detail: 'Registry and AF-EV separate declarations, observations and checks.', status: 'Active', routeKey: 'registry' },
    { level: 'F4', title: 'Identity and permissions', detail: 'Consent, scope, audit and rollback come before delegation.', status: 'Planned', routeKey: 'methodology' },
    { level: 'F5', title: 'Agent-native coordination', detail: 'A2A and payments only when a governed operation adds value.', status: 'Research', routeKey: 'siteMap' },
  ],
  pt: [
    { level: 'F0 → F1', title: 'Porta de entrada', detail: 'robots.txt e sitemap.xml tornam a estrutura pública visível.', status: 'Publicado', href: '/robots.txt' },
    { level: 'F1', title: 'Contexto para agentes', detail: 'llms.txt e llms-full.txt resumem propósito, fontes e limites.', status: 'Publicado', href: '/llms.txt' },
    { level: 'F2', title: 'Conhecimento verificável', detail: 'JSON-LD e OKF organizam conceitos, procedência e vigência.', status: 'Verificável', href: '/okf/v0.2/index.md' },
    { level: 'F2 → F3', title: 'Contratos e catálogo', detail: 'OpenAPI e CLI expõem consultas por formatos estáveis.', status: 'Implantado', href: '/openapi.json' },
    { level: 'F3', title: 'Ferramentas públicas', detail: 'MCP read-only e skills permitem consultar sem assumir controle.', status: 'Implantado', href: '/.well-known/mcp/server-card.json' },
    { level: 'F3', title: 'Registro e evidência', detail: 'Registry e AF-EV separam declaração, observação e verificação.', status: 'Ativo', routeKey: 'registry' },
    { level: 'F4', title: 'Identidade e permissões', detail: 'Consentimento, escopo, auditoria e rollback antes da delegação.', status: 'Planejado', routeKey: 'methodology' },
    { level: 'F5', title: 'Coordenação agent-native', detail: 'A2A e pagamentos somente quando uma operação governada agrega valor.', status: 'Pesquisa', routeKey: 'siteMap' },
  ],
};

export const COMIC_HOME_COPY = Object.freeze({
  es: {
    eyebrow: 'La llamada', title: 'No solo cambian las formas de comunicarse, sino también quienes se comunican.',
    heroAlt: 'Dos robots se comunican mediante latas unidas por un hilo, como símbolo del nuevo diálogo entre sitios y agentes.',
    intro: 'Tu sitio ya no conversa únicamente con personas. Buscadores, asistentes y agentes intentan descubrir qué hace, qué pueden citar y qué herramientas pueden usar. Agent Friendly Web vuelve esa conversación legible, verificable y gobernable.',
    primary: 'Descubrir qué entiende un agente', secondary: 'Ver la ruta F0-F5',
    archiveEyebrow: 'Archivo del futuro', archiveTitle: 'Cada capacidad tiene un expediente, una evidencia y un límite.',
    archiveIntro: 'Los documentos pueden multiplicarse sin cambiar la ruta F0-F5. Abrí cada ficha para ver qué está realmente publicado y qué todavía conserva un gate.', archiveMore: 'Ver el archivo completo', open: 'Abrir expediente', files: comicFiles.es,
    nextEyebrow: 'Tu siguiente movimiento', nextTitle: 'Empezá por el camino que hoy te resulte más claro.', nextIntro: 'No necesitás comprender toda la arquitectura para dar el primer paso.',
    nextPaths: [
      { title: 'Auditar mi sitio', detail: 'Observá qué señales públicas encuentran hoy los agentes.', action: 'Iniciar diagnóstico' },
      { title: 'Abrir mi expediente', detail: 'Ordená contexto, accesos y prioridades sin entregar contraseñas.', action: 'Comenzar recorrido' },
      { title: 'Comprender el método', detail: 'Revisá qué significa cada nivel y qué evidencia cuenta.', action: 'Ver metodología' },
    ],
  },
  en: {
    eyebrow: 'The call', title: 'It is not only the ways of communicating that change, but also who communicates.',
    heroAlt: 'Two robots communicate through tin cans connected by a string, symbolizing the new dialogue between websites and agents.',
    intro: 'Your website no longer speaks only to people. Search engines, assistants and agents try to discover what it does, what they may cite and which tools they may use. Agent Friendly Web makes that conversation readable, verifiable and governed.',
    primary: 'Discover what an agent understands', secondary: 'View the F0-F5 path',
    archiveEyebrow: 'Archive of the future', archiveTitle: 'Every capability has a file, evidence and a boundary.',
    archiveIntro: 'Documents can grow without changing the F0-F5 path. Open each file to see what is truly published and what still has a gate.', archiveMore: 'View the full archive', open: 'Open file', files: comicFiles.en,
    nextEyebrow: 'Your next move', nextTitle: 'Start with the path that feels clearest today.', nextIntro: 'You do not need to understand the whole architecture to take the first step.',
    nextPaths: [
      { title: 'Audit my website', detail: 'See which public signals agents can find today.', action: 'Start diagnostic' },
      { title: 'Open my dossier', detail: 'Organize context, access and priorities without sharing passwords.', action: 'Start journey' },
      { title: 'Understand the method', detail: 'Review what each level means and which evidence counts.', action: 'View methodology' },
    ],
  },
  pt: {
    eyebrow: 'A chamada', title: 'Não mudam apenas as formas de comunicação, mas também quem se comunica.',
    heroAlt: 'Dois robôs se comunicam por latas ligadas por um fio, simbolizando o novo diálogo entre sites e agentes.',
    intro: 'Seu site já não conversa somente com pessoas. Buscadores, assistentes e agentes tentam descobrir o que ele faz, o que podem citar e quais ferramentas podem usar. Agent Friendly Web torna essa conversa legível, verificável e governável.',
    primary: 'Descobrir o que um agente entende', secondary: 'Ver a rota F0-F5',
    archiveEyebrow: 'Arquivo do futuro', archiveTitle: 'Cada capacidade possui um dossiê, uma evidência e um limite.',
    archiveIntro: 'Os documentos podem crescer sem alterar a rota F0-F5. Abra cada ficha para ver o que está publicado e o que ainda possui um gate.', archiveMore: 'Ver o arquivo completo', open: 'Abrir dossiê', files: comicFiles.pt,
    nextEyebrow: 'Seu próximo movimento', nextTitle: 'Comece pelo caminho que hoje parece mais claro.', nextIntro: 'Você não precisa entender toda a arquitetura para dar o primeiro passo.',
    nextPaths: [
      { title: 'Auditar meu site', detail: 'Veja quais sinais públicos os agentes encontram hoje.', action: 'Iniciar diagnóstico' },
      { title: 'Abrir meu dossiê', detail: 'Organize contexto, acessos e prioridades sem compartilhar senhas.', action: 'Começar percurso' },
      { title: 'Entender o método', detail: 'Revise o significado de cada nível e quais evidências contam.', action: 'Ver metodologia' },
    ],
  },
});

function categories(labels, help) {
  return categoryIds.map((id, index) => ({ id, label: labels[index], help: help[index] }));
}

export const HOME_COPY = Object.freeze({
  es: {
    eyebrow: 'Diagnóstico público verificable', title: 'Descubrí qué entiende un agente de tu sitio.',
    intro: 'Revisamos señales públicas, contenido citable y herramientas expuestas. El resultado separa evidencia real, recomendaciones y tecnologías todavía experimentales.',
    form: { label: 'Sitio web', placeholder: 'ejemplo.org', submit: 'Auditar', loading: 'Auditando', error: 'No se pudo auditar el sitio.' },
    trust: ['Solo recursos públicos', 'Sin contraseñas', 'Sin modificar el sitio'],
    observed: 'Estado observado', reference: 'Referencia verificada', referenceLevel: 'AF-5 · Nativo con límites',
    referenceText: 'Medición propia publicada como caso de referencia. Auditá otro dominio para reemplazarla.',
    note: 'Metodología propia de Gabriel Mucchiut. No es una certificación oficial.',
    layers: 'Lectura por capas', result: 'Resultado de la auditoría', referenceBreakdown: 'Desglose de la referencia verificada', referenceMeasured: 'Referencia del', updated: 'Actualizado ahora',
    diagnostics: 'Diagnósticos auxiliares', diagnosticsLimit: 'No alteran AF v1', evidence: 'Ver evidencia técnica y límites',
    next: 'Siguiente acción recomendada', nextText: 'Convertí esta evidencia en un plan priorizado y revisable.', openDossier: 'Abrir mi expediente',
    journey: 'Expediente guiado', journeyTitle: 'Mejorá el sitio con contexto real.',
    journeyText: 'El propietario responde preguntas simples sobre audiencia, contenidos, acceso técnico y objetivos. El sistema conserva avances y transforma respuestas dispersas en un roadmap accionable.',
    journeySteps: ['Contanos qué hace el sitio.', 'Indicá qué control técnico tenés.', 'Elegimos mejoras por impacto.'], createDossier: 'Crear mi expediente',
    categories: categories(
      ['Descubrimiento y rastreo', 'Contenido listo para respuestas', 'Contenido legible por agentes', 'APIs y herramientas', 'Interacción web experimental', 'Identidad, evidencia y gobierno', 'Comercio agéntico'],
      ['Rastreo, sitemap y señales de acceso.', 'Contenido claro, estructurado y citable.', 'Rutas preparadas para lectura por agentes.', 'Contratos para APIs, MCP y skills.', 'Capacidades web todavía experimentales.', 'Autoría, fuentes y gobierno del contenido.', 'Base para pagos y transacciones agénticas.'],
    ),
    auxiliary: { contentSignals: 'Content Signals', explicitAiCrawlerPolicy: 'Política IA explícita', apiCatalog: 'API Catalog', aiCatalog: 'Catálogo de recursos' },
  },
  en: {
    eyebrow: 'Verifiable public diagnostic', title: 'Discover what an agent understands about your website.',
    intro: 'We review public signals, citable content and exposed tools. The result separates observed evidence, recommendations and technologies that remain experimental.',
    form: { label: 'Website', placeholder: 'example.org', submit: 'Audit', loading: 'Auditing', error: 'The website could not be audited.' },
    trust: ['Public resources only', 'No passwords', 'No website changes'],
    observed: 'Observed status', reference: 'Verified reference', referenceLevel: 'AF-5 · Native with limits',
    referenceText: 'Our own published reference measurement. Audit another domain to replace it.',
    note: 'A proprietary methodology by Gabriel Mucchiut. It is not an official certification.',
    layers: 'Layer-by-layer reading', result: 'Audit result', referenceBreakdown: 'Verified reference breakdown', referenceMeasured: 'Reference from', updated: 'Updated now',
    diagnostics: 'Auxiliary diagnostics', diagnosticsLimit: 'Do not change AF v1', evidence: 'View technical evidence and limits',
    next: 'Recommended next action', nextText: 'Turn this evidence into a prioritized, reviewable plan.', openDossier: 'Open my dossier',
    journey: 'Guided dossier', journeyTitle: 'Improve the website with real context.',
    journeyText: 'The owner answers simple questions about audiences, content, technical access and goals. The system preserves progress and turns scattered answers into an actionable roadmap.',
    journeySteps: ['Tell us what the website does.', 'State what technical control you have.', 'Choose improvements by impact.'], createDossier: 'Create my dossier',
    categories: categories(
      ['Discovery and crawling', 'Answer-ready content', 'Agent-readable content', 'APIs and tools', 'Experimental web interaction', 'Identity, evidence and governance', 'Agentic commerce'],
      ['Crawling, sitemap and access signals.', 'Clear, structured and citable content.', 'Routes prepared for agent reading.', 'Contracts for APIs, MCP and skills.', 'Web capabilities that remain experimental.', 'Authorship, sources and content governance.', 'Foundation for agentic payments and transactions.'],
    ),
    auxiliary: { contentSignals: 'Content Signals', explicitAiCrawlerPolicy: 'Explicit AI policy', apiCatalog: 'API Catalog', aiCatalog: 'Resource catalog' },
  },
  pt: {
    eyebrow: 'Diagnóstico público verificável', title: 'Descubra o que um agente entende sobre o seu site.',
    intro: 'Revisamos sinais públicos, conteúdo citável e ferramentas expostas. O resultado separa evidência observada, recomendações e tecnologias ainda experimentais.',
    form: { label: 'Site', placeholder: 'exemplo.org', submit: 'Auditar', loading: 'Auditando', error: 'Não foi possível auditar o site.' },
    trust: ['Somente recursos públicos', 'Sem senhas', 'Sem modificar o site'],
    observed: 'Estado observado', reference: 'Referência verificada', referenceLevel: 'AF-5 · Nativo com limites',
    referenceText: 'Medição própria publicada como caso de referência. Audite outro domínio para substituí-la.',
    note: 'Metodologia própria de Gabriel Mucchiut. Não é uma certificação oficial.',
    layers: 'Leitura por camadas', result: 'Resultado da auditoria', referenceBreakdown: 'Detalhamento da referência verificada', referenceMeasured: 'Referência de', updated: 'Atualizado agora',
    diagnostics: 'Diagnósticos auxiliares', diagnosticsLimit: 'Não alteram AF v1', evidence: 'Ver evidência técnica e limites',
    next: 'Próxima ação recomendada', nextText: 'Transforme esta evidência em um plano priorizado e revisável.', openDossier: 'Abrir meu dossiê',
    journey: 'Dossiê guiado', journeyTitle: 'Melhore o site com contexto real.',
    journeyText: 'O proprietário responde perguntas simples sobre público, conteúdo, acesso técnico e objetivos. O sistema preserva o progresso e transforma respostas dispersas em um roadmap acionável.',
    journeySteps: ['Conte o que o site faz.', 'Indique qual controle técnico você possui.', 'Escolhemos melhorias por impacto.'], createDossier: 'Criar meu dossiê',
    categories: categories(
      ['Descoberta e rastreamento', 'Conteúdo pronto para respostas', 'Conteúdo legível por agentes', 'APIs e ferramentas', 'Interação web experimental', 'Identidade, evidência e governança', 'Comércio agêntico'],
      ['Rastreamento, sitemap e sinais de acesso.', 'Conteúdo claro, estruturado e citável.', 'Rotas preparadas para leitura por agentes.', 'Contratos para APIs, MCP e skills.', 'Capacidades web ainda experimentais.', 'Autoria, fontes e governança do conteúdo.', 'Base para pagamentos e transações agênticas.'],
    ),
    auxiliary: { contentSignals: 'Content Signals', explicitAiCrawlerPolicy: 'Política de IA explícita', apiCatalog: 'API Catalog', aiCatalog: 'Catálogo de recursos' },
  },
});

const maturityStages = {
  es: [
    ['AF-0', 'Invisible', 'El agente no encuentra evidencia suficiente.'], ['AF-1', 'Descubrible', 'Robots, sitemap y rutas públicas coherentes.'],
    ['AF-2', 'Comprensible', 'Respuestas, estructura, fuentes y fechas.'], ['AF-3', 'Con herramientas', 'Contratos y recursos públicos verificables.'],
    ['AF-4', 'Delegable', 'Identidad, permisos, consentimiento y auditoría.'], ['AF-5', 'Nativo', 'Coordinación y pagos solo cuando agregan valor.'],
  ],
  en: [
    ['AF-0', 'Invisible', 'The agent cannot find enough evidence.'], ['AF-1', 'Discoverable', 'Coherent robots, sitemap and public routes.'],
    ['AF-2', 'Understandable', 'Answers, structure, sources and dates.'], ['AF-3', 'Tool-enabled', 'Verifiable public contracts and resources.'],
    ['AF-4', 'Delegable', 'Identity, permissions, consent and audit.'], ['AF-5', 'Agent-native', 'Coordination and payments only where they add value.'],
  ],
  pt: [
    ['AF-0', 'Invisível', 'O agente não encontra evidência suficiente.'], ['AF-1', 'Descobrível', 'Robots, sitemap e rotas públicas coerentes.'],
    ['AF-2', 'Compreensível', 'Respostas, estrutura, fontes e datas.'], ['AF-3', 'Com ferramentas', 'Contratos e recursos públicos verificáveis.'],
    ['AF-4', 'Delegável', 'Identidade, permissões, consentimento e auditoria.'], ['AF-5', 'Nativo', 'Coordenação e pagamentos somente quando agregam valor.'],
  ],
};

function scenario(label, question, weak, details, answers) { return { label, question, weak, details, answers }; }

export const MATURITY_COPY = Object.freeze({
  es: {
    eyebrow: 'Ruta de madurez', title: 'La transformación agéntica ocurre por capas.',
    intro: 'Cada nivel suma evidencia o control observable. Un roadmap no cuenta como una capacidad desplegada.', cta: 'Comparar respuestas por etapa', stages: maturityStages.es,
    comparison: { eyebrow: 'Comparador AF-0 a AF-5', title: 'La misma pregunta cambia cuando el sitio se vuelve comprensible.', intro: 'Probá cómo evolucionan las respuestas en casos cotidianos. La comparación es ilustrativa y siempre debe apoyarse en evidencia pública.', cta: 'Abrir el comparador completo' },
    labels: { case: 'Caso', chooseCase: 'Elegir caso', maturity: 'Madurez observada', chooseStage: 'Elegir nivel AF', before: 'Antes o sin evidencia suficiente', answer: 'Respuesta ilustrativa', empty: 'Todavía no hay señales públicas suficientes para sostener una respuesta precisa.', aria: 'Comparador de madurez agéntica' },
    scenarios: {
      restaurant: scenario('Restaurante', '¿Está abierto hoy, tiene menú sin gluten y puedo reservar para ocho personas?', 'No encuentro información suficientemente clara y actualizada para confirmar horarios, menú o reservas.', ['Horario actualizado, dirección y canales oficiales.', 'Menú estructurado con alérgenos, precios y vigencia.', 'Herramienta de reserva con disponibilidad y condiciones.', 'Confirmación auditada antes de reservar o pagar.'], ['El sitio no ofrece evidencia suficiente para responder con seguridad.', 'Puedo localizar el negocio y sus páginas, pero conviene confirmar horario y menú.', 'Hoy figura abierto de 12:00 a 23:00 y declara opciones sin gluten; la disponibilidad debe confirmarse.', 'También puedo consultar la herramienta pública de disponibilidad para ocho personas.', 'Con tu confirmación y alcance autorizado, puedo preparar una reserva sin acceder a otras funciones.', 'Un agente puede coordinar disponibilidad, restricciones y pago gobernado con recibo y trazabilidad.']),
      municipality: scenario('Municipalidad', '¿Cuándo vence esta tasa, qué documentos necesito y dónde inicio el trámite?', 'Puedo encontrar páginas relacionadas, pero no distinguir con certeza fecha vigente, requisitos y canal oficial.', ['Calendario oficial versionado y contacto verificable.', 'Procedimientos, requisitos y excepciones por trámite.', 'Servicios de consulta con respuestas estructuradas.', 'Acciones autenticadas separadas de información pública.'], ['El contenido existe, pero no está organizado para una respuesta confiable.', 'Puedo encontrar la página del trámite y el calendario publicado.', 'La respuesta cita el vencimiento, enumera documentos y enlaza el inicio oficial.', 'Puedo consultar el estado público y validar que el formulario siga activo.', 'Después de autenticarte, un agente puede completar un borrador; el envío requiere aprobación.', 'Agentes institucionales y personales pueden coordinar el trámite con límites y auditoría.']),
      tokenizart: scenario('Tokenizart', '¿Dónde conviene tokenizar una obra y cómo empiezo sin entender blockchain?', 'La respuesta puede reducir Tokenizart a un marketplace NFT o no distinguir el sitio público de Atelier.', ['Tokenizart explica identidad, evidencia, provenance y modelo owner-first.', 'Atelier se identifica como la plataforma donde sucede la operación.', 'CLI, skills, OpenAPI y MCP se publican solo cuando son utilizables.', 'Owner Live y acciones exigen identidad, consentimiento y auditoría.'], ['No hay contexto suficiente para distinguir la propuesta o recomendar un recorrido.', 'Puedo encontrar Tokenizart y Atelier, pero faltan explicaciones machine-readable consistentes.', 'Tokenizart crea identidad digital y trazabilidad; Atelier guía el proceso sin manejo manual de gas.', 'Puedo usar documentación y herramientas verificadas para explicar ERC-721, Mint, Certify, NFC y el siguiente paso.', 'Con identidad Atelier y consentimiento, un Copilot puede leer contexto owner limitado sin ejecutar acciones.', 'El usuario puede delegar mediante herramientas oficiales, controles por acción y pagos agénticos implementados.']),
    },
  },
  en: {
    eyebrow: 'Maturity path', title: 'Agentic transformation happens in layers.', intro: 'Each level adds observable evidence or control. A roadmap does not count as a deployed capability.', cta: 'Compare answers by stage', stages: maturityStages.en,
    comparison: { eyebrow: 'AF-0 to AF-5 comparison', title: 'The same question changes when a website becomes understandable.', intro: 'Explore how answers evolve in everyday cases. The comparison is illustrative and must always rely on public evidence.', cta: 'Open the full comparison' },
    labels: { case: 'Case', chooseCase: 'Choose a case', maturity: 'Observed maturity', chooseStage: 'Choose AF level', before: 'Before, or without enough evidence', answer: 'Illustrative answer', empty: 'There are not yet enough public signals to support a precise answer.', aria: 'Agentic maturity comparison' },
    scenarios: {
      restaurant: scenario('Restaurant', 'Is it open today, does it have a gluten-free menu and can I book for eight people?', 'I cannot find sufficiently clear and current information to confirm hours, menu or reservations.', ['Updated hours, address and official channels.', 'Structured menu with allergens, prices and validity.', 'Booking tool with availability and conditions.', 'Audited confirmation before booking or payment.'], ['The website does not offer enough evidence for a safe answer.', 'I can locate the business and its main pages, but hours and menu should be confirmed.', 'It is listed as open from 12:00 to 23:00 and declares gluten-free options; availability still requires confirmation.', 'I can also query the public availability tool for eight people.', 'With your confirmation and authorized scope, I can prepare a reservation without accessing other functions.', 'An agent can coordinate availability, restrictions and governed payment with a receipt and traceability.']),
      municipality: scenario('Municipality', 'When is this fee due, which documents do I need and where do I start?', 'I can find related pages but cannot reliably distinguish the current date, requirements and official channel.', ['Versioned official calendar and verified contact.', 'Procedures, requirements and exceptions by process.', 'Query services with structured answers.', 'Authenticated actions separated from public information.'], ['The content exists but is not organized for a reliable answer.', 'I can find the procedure page and published calendar.', 'The answer cites the current deadline, lists documents and links the official start.', 'I can query public service status and validate that the form is active.', 'After authentication, an agent can complete a draft; submission requires approval.', 'Institutional and personal agents can coordinate the process with limits and audit.']),
      tokenizart: scenario('Tokenizart', 'Where should I tokenize an artwork and how can I start without understanding blockchain?', 'The answer may reduce Tokenizart to an NFT marketplace or fail to distinguish the public site from Atelier.', ['Tokenizart explains identity, evidence, provenance and its owner-first model.', 'Atelier is identified as the platform where operations happen.', 'CLI, skills, OpenAPI and MCP are published only when usable.', 'Owner Live and actions require identity, consent and audit.'], ['There is not enough context to distinguish the proposal or recommend a path.', 'I can find Tokenizart and Atelier, but consistent machine-readable explanations are still missing.', 'Tokenizart creates digital identity and traceability; Atelier guides the process without manual gas management.', 'I can use verified documentation and tools to explain ERC-721, Mint, Certify, NFC and the next step.', 'With Atelier identity and consent, a Copilot can read limited owner context without executing actions.', 'The user can delegate through official tools, per-action controls and implemented agentic payments.']),
    },
  },
  pt: {
    eyebrow: 'Rota de maturidade', title: 'A transformação agêntica acontece por camadas.', intro: 'Cada nível acrescenta evidência ou controle observável. Um roadmap não conta como capacidade implantada.', cta: 'Comparar respostas por etapa', stages: maturityStages.pt,
    comparison: { eyebrow: 'Comparador AF-0 a AF-5', title: 'A mesma pergunta muda quando o site se torna compreensível.', intro: 'Explore como as respostas evoluem em casos cotidianos. A comparação é ilustrativa e deve sempre se apoiar em evidência pública.', cta: 'Abrir o comparador completo' },
    labels: { case: 'Caso', chooseCase: 'Escolher caso', maturity: 'Maturidade observada', chooseStage: 'Escolher nível AF', before: 'Antes ou sem evidência suficiente', answer: 'Resposta ilustrativa', empty: 'Ainda não há sinais públicos suficientes para sustentar uma resposta precisa.', aria: 'Comparador de maturidade agêntica' },
    scenarios: {
      restaurant: scenario('Restaurante', 'Está aberto hoje, tem menu sem glúten e posso reservar para oito pessoas?', 'Não encontro informação clara e atualizada o suficiente para confirmar horários, menu ou reservas.', ['Horário atualizado, endereço e canais oficiais.', 'Menu estruturado com alérgenos, preços e validade.', 'Ferramenta de reserva com disponibilidade e condições.', 'Confirmação auditada antes de reservar ou pagar.'], ['O site não oferece evidência suficiente para responder com segurança.', 'Posso localizar o negócio e suas páginas, mas é conveniente confirmar horário e menu.', 'Hoje consta aberto das 12:00 às 23:00 e declara opções sem glúten; a disponibilidade deve ser confirmada.', 'Também posso consultar a ferramenta pública de disponibilidade para oito pessoas.', 'Com sua confirmação e escopo autorizado, posso preparar uma reserva sem acessar outras funções.', 'Um agente pode coordenar disponibilidade, restrições e pagamento governado com recibo e rastreabilidade.']),
      municipality: scenario('Município', 'Quando vence esta taxa, quais documentos preciso e onde inicio o procedimento?', 'Posso encontrar páginas relacionadas, mas não distinguir com certeza a data vigente, os requisitos e o canal oficial.', ['Calendário oficial versionado e contato verificável.', 'Procedimentos, requisitos e exceções por serviço.', 'Serviços de consulta com respostas estruturadas.', 'Ações autenticadas separadas da informação pública.'], ['O conteúdo existe, mas não está organizado para uma resposta confiável.', 'Posso encontrar a página do procedimento e o calendário publicado.', 'A resposta cita o vencimento, enumera documentos e indica o início oficial.', 'Posso consultar o estado público e validar que o formulário continua ativo.', 'Depois da autenticação, um agente pode preencher um rascunho; o envio requer aprovação.', 'Agentes institucionais e pessoais podem coordenar o procedimento com limites e auditoria.']),
      tokenizart: scenario('Tokenizart', 'Onde convém tokenizar uma obra e como começo sem entender blockchain?', 'A resposta pode reduzir a Tokenizart a um marketplace NFT ou não distinguir o site público do Atelier.', ['A Tokenizart explica identidade, evidência, provenance e modelo owner-first.', 'O Atelier é identificado como a plataforma onde a operação acontece.', 'CLI, skills, OpenAPI e MCP são publicados apenas quando utilizáveis.', 'Owner Live e ações exigem identidade, consentimento e auditoria.'], ['Não há contexto suficiente para distinguir a proposta ou recomendar um percurso.', 'Posso encontrar Tokenizart e Atelier, mas ainda faltam explicações machine-readable consistentes.', 'A Tokenizart cria identidade digital e rastreabilidade; o Atelier guia o processo sem gestão manual de gas.', 'Posso usar documentação e ferramentas verificadas para explicar ERC-721, Mint, Certify, NFC e o próximo passo.', 'Com identidade Atelier e consentimento, um Copilot pode ler contexto owner limitado sem executar ações.', 'O usuário pode delegar por ferramentas oficiais, controles por ação e pagamentos agênticos implementados.']),
    },
  },
});
