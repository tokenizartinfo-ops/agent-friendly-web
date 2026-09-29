const copy = {
  es: {
    title: '¿Hasta dónde conviene avanzar?',
    provisional: 'Orientación provisional basada en tus respuestas, no un nivel observado ni un compromiso de implementación.',
    askGoal: 'Primero contame qué deberían poder descubrir o hacer los agentes. No hace falta elegir AF-5.',
    foundation: 'Primer horizonte: descubrimiento y respuestas claras (AF-1/AF-2).',
    contentStop: 'Si tu sitio solo necesita explicar información pública, este horizonte puede ser suficiente.',
    toolsLater: 'AF-3 puede aportar valor si hay una consulta concreta y datos que se puedan mantener; no hace falta crear un MCP por defecto.',
    actionsLater: 'Las acciones delegadas (AF-4) se evalúan después de definir herramienta, identidad, permisos y auditoría.',
    paymentsLater: 'Los pagos o transacciones (AF-5) son una posibilidad posterior, solo con un caso comercial, controles y responsables definidos.',
    accessPending: 'Antes de implementar en el sitio, confirmemos quién puede cambiarlo. Mientras tanto podemos ordenar la evidencia y el contenido.',
    contentQuestion: '¿Qué página, catálogo o documento público respalda las respuestas que querés ofrecer?',
    toolQuestion: '¿Qué pregunta concreta debería resolver una herramienta y de dónde saldría su dato actualizado?',
    actionQuestion: '¿Qué acción específica autorizaría una persona y cómo se podría detener o revertir?',
    paymentQuestion: '¿Qué operación pagaría el usuario, quién cobraría y qué condiciones debería aceptar?',
    noAuto: 'Elegir recursos en el formulario no los publica ni prueba que ya existan.',
    nextGoal: ['Contar qué querés lograr', 'Elegir un objetivo nos permite proponer un alcance útil sin presuponer AF-5.'],
    nextSources: ['Identificar fuentes públicas', 'Primero necesitamos saber qué información respalda las respuestas que ofrecería el sitio.'],
    nextControl: ['Aclarar quién controla el sitio', 'Así distinguimos lo que podemos preparar de lo que alguien deberá implementar.'],
    nextUseCase: ['Describir el caso concreto', 'Anotá la consulta, acción u operación antes de elegir una herramienta o integración.'],
    nextPolicy: ['Revisar descubrimiento y uso', 'Definí cómo querés que agentes y crawlers encuentren y utilicen el contenido público.'],
  },
  en: {
    title: 'How far should this site go?',
    provisional: 'Provisional guidance from your answers, not an observed level or implementation commitment.',
    askGoal: 'First, tell me what agents should discover or do. You do not need to aim for AF-5.',
    foundation: 'First horizon: discovery and clear answers (AF-1/AF-2).',
    contentStop: 'If the site only needs to explain public information, this horizon may be enough.',
    toolsLater: 'AF-3 may help when there is a concrete read-only question and maintainable data; an MCP is not required by default.',
    actionsLater: 'Delegated actions (AF-4) come after defining the tool, identity, permissions and audit.',
    paymentsLater: 'Payments or transactions (AF-5) are a later option only with a defined commercial use case, controls and owners.',
    accessPending: 'Before changing the site, let us confirm who can do so. We can organize evidence and content meanwhile.',
    contentQuestion: 'Which public page, catalog or document supports the answers you want to offer?',
    toolQuestion: 'Which exact question should a tool answer, and where would its current data come from?',
    actionQuestion: 'Which specific action would a person authorize, and how could it be stopped or reversed?',
    paymentQuestion: 'What would the user pay for, who would receive payment and which terms would apply?',
    noAuto: 'Selecting resources in the form does not publish them or prove they already exist.',
    nextGoal: ['Tell us what you want to achieve', 'A goal helps us propose a useful scope without assuming AF-5.'],
    nextSources: ['Identify public sources', 'First we need to know which information supports the answers this site would offer.'],
    nextControl: ['Clarify who controls the site', 'This separates what we can prepare from what someone must implement.'],
    nextUseCase: ['Describe the concrete use case', 'Write down the query, action or transaction before choosing a tool or integration.'],
    nextPolicy: ['Review discovery and use', 'Decide how agents and crawlers should find and use public content.'],
  },
  pt: {
    title: 'Até onde vale avançar?',
    provisional: 'Orientação provisória baseada nas suas respostas, não um nível observado nem compromisso de implementação.',
    askGoal: 'Primeiro, conte o que os agentes devem descobrir ou fazer. Não é necessário buscar AF-5.',
    foundation: 'Primeiro horizonte: descoberta e respostas claras (AF-1/AF-2).',
    contentStop: 'Se o site só precisa explicar informações públicas, esse horizonte pode bastar.',
    toolsLater: 'AF-3 pode ajudar com uma consulta concreta e dados atualizáveis; um MCP não é obrigatório por padrão.',
    actionsLater: 'Ações delegadas (AF-4) vêm depois de definir ferramenta, identidade, permissões e auditoria.',
    paymentsLater: 'Pagamentos ou transações (AF-5) são uma opção posterior, com caso comercial, controles e responsáveis definidos.',
    accessPending: 'Antes de alterar o site, vamos confirmar quem pode fazê-lo. Enquanto isso, podemos organizar evidências e conteúdo.',
    contentQuestion: 'Qual página, catálogo ou documento público sustenta as respostas desejadas?',
    toolQuestion: 'Qual pergunta exata uma ferramenta responderia e de onde viriam os dados atualizados?',
    actionQuestion: 'Qual ação específica uma pessoa autorizaria e como seria interrompida ou revertida?',
    paymentQuestion: 'Pelo que o usuário pagaria, quem receberia e quais condições valeriam?',
    noAuto: 'Selecionar recursos no formulário não os publica nem comprova que já existem.',
    nextGoal: ['Conte o que deseja alcançar', 'Um objetivo permite propor um escopo útil sem presumir AF-5.'],
    nextSources: ['Identifique fontes públicas', 'Primeiro precisamos saber quais informações sustentam as respostas oferecidas pelo site.'],
    nextControl: ['Esclareça quem controla o site', 'Assim separamos o que podemos preparar do que alguém terá de implementar.'],
    nextUseCase: ['Descreva o caso concreto', 'Anote a consulta, ação ou operação antes de escolher uma ferramenta ou integração.'],
    nextPolicy: ['Revise descoberta e uso', 'Defina como agentes e crawlers devem encontrar e usar o conteúdo público.'],
  },
};

/** Read-only working hypothesis from owner-declared fields. It never assigns an observed AF level. */
export function proportionalTargetGuide(intake = {}, locale = 'es') {
  const t = copy[locale] || copy.es;
  const goals = new Set(Array.isArray(intake.goals) ? intake.goals : []);
  const capabilities = new Set(Array.isArray(intake.desiredCapabilities) ? intake.desiredCapabilities : []);
  const sources = new Set(Array.isArray(intake.contentSources) ? intake.contentSources : []);
  const wantsPayment = goals.has('payments');
  const wantsAction = wantsPayment || goals.has('actions') || capabilities.has('delegated_actions');
  const wantsTool = wantsAction || goals.has('tools') || capabilities.has('read_only_tools');
  const hasGoal = goals.size > 0 || capabilities.size > 0;
  const steps = [];
  const questions = [];
  const next = (href, [label, reason]) => ({ href, label, reason });
  if (!hasGoal) return { title: t.title, provisional: t.provisional, stage: 'undecided', steps: [t.askGoal], questions: [], limit: t.noAuto, next: next('#dossier-goals', t.nextGoal) };
  steps.push(t.foundation);
  if (!wantsTool) steps.push(t.contentStop);
  if (wantsTool) steps.push(t.toolsLater);
  if (wantsAction) steps.push(t.actionsLater);
  if (wantsPayment) steps.push(t.paymentsLater);
  if (['unknown', 'none', 'provider', ''].includes(String(intake.control || ''))) steps.push(t.accessPending);
  if (!sources.size) questions.push(t.contentQuestion);
  if (wantsTool && !sources.has('tool_docs')) questions.push(t.toolQuestion);
  if (wantsAction) questions.push(t.actionQuestion);
  if (wantsPayment) questions.push(t.paymentQuestion);
  const nextStep = !sources.size ? next('#dossier-content', t.nextSources)
    : ['unknown', 'none', 'provider', ''].includes(String(intake.control || '')) ? next('#dossier-control', t.nextControl)
      : wantsTool ? next('#dossier-content', t.nextUseCase)
        : next('#dossier-publication', t.nextPolicy);
  return { title: t.title, provisional: t.provisional, stage: wantsPayment ? 'transaction_exploration' : wantsAction ? 'action_exploration' : wantsTool ? 'tool_exploration' : 'content_horizon', steps, questions, limit: t.noAuto, next: nextStep };
}
