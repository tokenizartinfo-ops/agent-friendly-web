const categoryIds = ['discovery', 'answerability', 'machineContent', 'tools', 'experimental', 'trust', 'commerce'];

function categories(labels, help) {
  return categoryIds.map((id, index) => ({ id, label: labels[index], help: help[index] }));
}

export const HOME_COPY = Object.freeze({
  es: {
    eyebrow: 'Diagnóstico público verificable', title: 'Descubrí qué entiende un agente de tu sitio.',
    intro: 'Revisamos señales públicas, contenido citable y herramientas expuestas. El resultado separa evidencia real, recomendaciones y tecnologías todavía experimentales.',
    form: { label: 'Sitio web', placeholder: 'ejemplo.org', submit: 'Auditar', loading: 'Auditando', error: 'No se pudo auditar el sitio.' },
    trust: ['Solo recursos públicos', 'Sin contraseñas', 'Sin modificar el sitio'],
    observed: 'Estado observado', reference: 'Referencia verificada', referenceLevel: 'AF-3 · Herramientas públicas',
    referenceText: 'Medición propia publicada como caso de referencia. Auditá otro dominio para reemplazarla.',
    note: 'Metodología propia de Gabriel Mucchiut. No es una certificación oficial.',
    layers: 'Lectura por capas', result: 'Resultado de la auditoría', measuring: 'Qué vamos a medir', updated: 'Actualizado ahora', pending: 'Pendiente',
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
    observed: 'Observed status', reference: 'Verified reference', referenceLevel: 'AF-3 · Public tools',
    referenceText: 'Our own published reference measurement. Audit another domain to replace it.',
    note: 'A proprietary methodology by Gabriel Mucchiut. It is not an official certification.',
    layers: 'Layer-by-layer reading', result: 'Audit result', measuring: 'What we will measure', updated: 'Updated now', pending: 'Pending',
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
    observed: 'Estado observado', reference: 'Referência verificada', referenceLevel: 'AF-3 · Ferramentas públicas',
    referenceText: 'Medição própria publicada como caso de referência. Audite outro domínio para substituí-la.',
    note: 'Metodologia própria de Gabriel Mucchiut. Não é uma certificação oficial.',
    layers: 'Leitura por camadas', result: 'Resultado da auditoria', measuring: 'O que vamos medir', updated: 'Atualizado agora', pending: 'Pendente',
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
    labels: { case: 'Caso', chooseCase: 'Elegir caso', maturity: 'Madurez observada', chooseStage: 'Elegir nivel AF', before: 'Antes o sin evidencia suficiente', answer: 'Respuesta ilustrativa', empty: 'Todavía no hay señales públicas suficientes para sostener una respuesta precisa.', aria: 'Comparador de madurez agéntica' },
    scenarios: {
      restaurant: scenario('Restaurante', '¿Está abierto hoy, tiene menú sin gluten y puedo reservar para ocho personas?', 'No encuentro información suficientemente clara y actualizada para confirmar horarios, menú o reservas.', ['Horario actualizado, dirección y canales oficiales.', 'Menú estructurado con alérgenos, precios y vigencia.', 'Herramienta de reserva con disponibilidad y condiciones.', 'Confirmación auditada antes de reservar o pagar.'], ['El sitio no ofrece evidencia suficiente para responder con seguridad.', 'Puedo localizar el negocio y sus páginas, pero conviene confirmar horario y menú.', 'Hoy figura abierto de 12:00 a 23:00 y declara opciones sin gluten; la disponibilidad debe confirmarse.', 'También puedo consultar la herramienta pública de disponibilidad para ocho personas.', 'Con tu confirmación y alcance autorizado, puedo preparar una reserva sin acceder a otras funciones.', 'Un agente puede coordinar disponibilidad, restricciones y pago gobernado con recibo y trazabilidad.']),
      municipality: scenario('Municipalidad', '¿Cuándo vence esta tasa, qué documentos necesito y dónde inicio el trámite?', 'Puedo encontrar páginas relacionadas, pero no distinguir con certeza fecha vigente, requisitos y canal oficial.', ['Calendario oficial versionado y contacto verificable.', 'Procedimientos, requisitos y excepciones por trámite.', 'Servicios de consulta con respuestas estructuradas.', 'Acciones autenticadas separadas de información pública.'], ['El contenido existe, pero no está organizado para una respuesta confiable.', 'Puedo encontrar la página del trámite y el calendario publicado.', 'La respuesta cita el vencimiento, enumera documentos y enlaza el inicio oficial.', 'Puedo consultar el estado público y validar que el formulario siga activo.', 'Después de autenticarte, un agente puede completar un borrador; el envío requiere aprobación.', 'Agentes institucionales y personales pueden coordinar el trámite con límites y auditoría.']),
      tokenizart: scenario('Tokenizart', '¿Dónde conviene tokenizar una obra y cómo empiezo sin entender blockchain?', 'La respuesta puede reducir Tokenizart a un marketplace NFT o no distinguir el sitio público de Atelier.', ['Tokenizart explica identidad, evidencia, provenance y modelo owner-first.', 'Atelier se identifica como la plataforma donde sucede la operación.', 'CLI, skills, OpenAPI y MCP se publican solo cuando son utilizables.', 'Owner Live y acciones exigen identidad, consentimiento y auditoría.'], ['No hay contexto suficiente para distinguir la propuesta o recomendar un recorrido.', 'Puedo encontrar Tokenizart y Atelier, pero faltan explicaciones machine-readable consistentes.', 'Tokenizart crea identidad digital y trazabilidad; Atelier guía el proceso sin manejo manual de gas.', 'Puedo usar documentación y herramientas verificadas para explicar ERC-721, Mint, Certify, NFC y el siguiente paso.', 'Con identidad Atelier y consentimiento, un Copilot puede leer contexto owner limitado sin ejecutar acciones.', 'El usuario puede delegar mediante herramientas oficiales, controles por acción y pagos agénticos implementados.']),
    },
  },
  en: {
    eyebrow: 'Maturity path', title: 'Agentic transformation happens in layers.', intro: 'Each level adds observable evidence or control. A roadmap does not count as a deployed capability.', cta: 'Compare answers by stage', stages: maturityStages.en,
    labels: { case: 'Case', chooseCase: 'Choose a case', maturity: 'Observed maturity', chooseStage: 'Choose AF level', before: 'Before, or without enough evidence', answer: 'Illustrative answer', empty: 'There are not yet enough public signals to support a precise answer.', aria: 'Agentic maturity comparison' },
    scenarios: {
      restaurant: scenario('Restaurant', 'Is it open today, does it have a gluten-free menu and can I book for eight people?', 'I cannot find sufficiently clear and current information to confirm hours, menu or reservations.', ['Updated hours, address and official channels.', 'Structured menu with allergens, prices and validity.', 'Booking tool with availability and conditions.', 'Audited confirmation before booking or payment.'], ['The website does not offer enough evidence for a safe answer.', 'I can locate the business and its main pages, but hours and menu should be confirmed.', 'It is listed as open from 12:00 to 23:00 and declares gluten-free options; availability still requires confirmation.', 'I can also query the public availability tool for eight people.', 'With your confirmation and authorized scope, I can prepare a reservation without accessing other functions.', 'An agent can coordinate availability, restrictions and governed payment with a receipt and traceability.']),
      municipality: scenario('Municipality', 'When is this fee due, which documents do I need and where do I start?', 'I can find related pages but cannot reliably distinguish the current date, requirements and official channel.', ['Versioned official calendar and verified contact.', 'Procedures, requirements and exceptions by process.', 'Query services with structured answers.', 'Authenticated actions separated from public information.'], ['The content exists but is not organized for a reliable answer.', 'I can find the procedure page and published calendar.', 'The answer cites the current deadline, lists documents and links the official start.', 'I can query public service status and validate that the form is active.', 'After authentication, an agent can complete a draft; submission requires approval.', 'Institutional and personal agents can coordinate the process with limits and audit.']),
      tokenizart: scenario('Tokenizart', 'Where should I tokenize an artwork and how can I start without understanding blockchain?', 'The answer may reduce Tokenizart to an NFT marketplace or fail to distinguish the public site from Atelier.', ['Tokenizart explains identity, evidence, provenance and its owner-first model.', 'Atelier is identified as the platform where operations happen.', 'CLI, skills, OpenAPI and MCP are published only when usable.', 'Owner Live and actions require identity, consent and audit.'], ['There is not enough context to distinguish the proposal or recommend a path.', 'I can find Tokenizart and Atelier, but consistent machine-readable explanations are still missing.', 'Tokenizart creates digital identity and traceability; Atelier guides the process without manual gas management.', 'I can use verified documentation and tools to explain ERC-721, Mint, Certify, NFC and the next step.', 'With Atelier identity and consent, a Copilot can read limited owner context without executing actions.', 'The user can delegate through official tools, per-action controls and implemented agentic payments.']),
    },
  },
  pt: {
    eyebrow: 'Rota de maturidade', title: 'A transformação agêntica acontece por camadas.', intro: 'Cada nível acrescenta evidência ou controle observável. Um roadmap não conta como capacidade implantada.', cta: 'Comparar respostas por etapa', stages: maturityStages.pt,
    labels: { case: 'Caso', chooseCase: 'Escolher caso', maturity: 'Maturidade observada', chooseStage: 'Escolher nível AF', before: 'Antes ou sem evidência suficiente', answer: 'Resposta ilustrativa', empty: 'Ainda não há sinais públicos suficientes para sustentar uma resposta precisa.', aria: 'Comparador de maturidade agêntica' },
    scenarios: {
      restaurant: scenario('Restaurante', 'Está aberto hoje, tem menu sem glúten e posso reservar para oito pessoas?', 'Não encontro informação clara e atualizada o suficiente para confirmar horários, menu ou reservas.', ['Horário atualizado, endereço e canais oficiais.', 'Menu estruturado com alérgenos, preços e validade.', 'Ferramenta de reserva com disponibilidade e condições.', 'Confirmação auditada antes de reservar ou pagar.'], ['O site não oferece evidência suficiente para responder com segurança.', 'Posso localizar o negócio e suas páginas, mas é conveniente confirmar horário e menu.', 'Hoje consta aberto das 12:00 às 23:00 e declara opções sem glúten; a disponibilidade deve ser confirmada.', 'Também posso consultar a ferramenta pública de disponibilidade para oito pessoas.', 'Com sua confirmação e escopo autorizado, posso preparar uma reserva sem acessar outras funções.', 'Um agente pode coordenar disponibilidade, restrições e pagamento governado com recibo e rastreabilidade.']),
      municipality: scenario('Município', 'Quando vence esta taxa, quais documentos preciso e onde inicio o procedimento?', 'Posso encontrar páginas relacionadas, mas não distinguir com certeza a data vigente, os requisitos e o canal oficial.', ['Calendário oficial versionado e contato verificável.', 'Procedimentos, requisitos e exceções por serviço.', 'Serviços de consulta com respostas estruturadas.', 'Ações autenticadas separadas da informação pública.'], ['O conteúdo existe, mas não está organizado para uma resposta confiável.', 'Posso encontrar a página do procedimento e o calendário publicado.', 'A resposta cita o vencimento, enumera documentos e indica o início oficial.', 'Posso consultar o estado público e validar que o formulário continua ativo.', 'Depois da autenticação, um agente pode preencher um rascunho; o envio requer aprovação.', 'Agentes institucionais e pessoais podem coordenar o procedimento com limites e auditoria.']),
      tokenizart: scenario('Tokenizart', 'Onde convém tokenizar uma obra e como começo sem entender blockchain?', 'A resposta pode reduzir a Tokenizart a um marketplace NFT ou não distinguir o site público do Atelier.', ['A Tokenizart explica identidade, evidência, provenance e modelo owner-first.', 'O Atelier é identificado como a plataforma onde a operação acontece.', 'CLI, skills, OpenAPI e MCP são publicados apenas quando utilizáveis.', 'Owner Live e ações exigem identidade, consentimento e auditoria.'], ['Não há contexto suficiente para distinguir a proposta ou recomendar um percurso.', 'Posso encontrar Tokenizart e Atelier, mas ainda faltam explicações machine-readable consistentes.', 'A Tokenizart cria identidade digital e rastreabilidade; o Atelier guia o processo sem gestão manual de gas.', 'Posso usar documentação e ferramentas verificadas para explicar ERC-721, Mint, Certify, NFC e o próximo passo.', 'Com identidade Atelier e consentimento, um Copilot pode ler contexto owner limitado sem executar ações.', 'O usuário pode delegar por ferramentas oficiais, controles por ação e pagamentos agênticos implementados.']),
    },
  },
});
