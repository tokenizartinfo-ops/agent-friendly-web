import {normalizePublicUrl} from './methodology.mjs';

const definitions = [
  {id:'crawl', checks:['robots','sitemap']},
  {id:'answers', checks:['directAnswers','structuredData']},
  {id:'documents', checks:['llms','markdown']},
  {id:'trust', checks:['ownership','sources']},
];

export const ACTION_PLAN_COPY = {
  es: {
    eyebrow:'Tu siguiente paso',title:'Convertí el diagnóstico en un alcance concreto.',viewPlan:'Preparar mi alcance',
    intro:'Revisá las señales y elegí qué querés mejorar. Este orden prioriza fundamentos; no cambia la puntuación de la auditoría.',
    observation:'Observado',states:{detected:'Detectado',not_detected:'No detectado en esta revisión',unverified:'Por comprobar'},
    evidenceLimit:'Una señal no detectada no prueba que falte en todo el sitio. Confirmala antes de implementar.',
    self:'Por tu cuenta',assisted:'Con ayuda',deliverable:'Entrega propuesta',select:'Incluir en mi alcance',
    reviewTitle:'Revisá tu propuesta',selected:'mejoras seleccionadas',selectedOne:'mejora seleccionada',empty:'Elegí al menos una mejora para preparar tu alcance.',
    detectedTitle:'Señales detectadas',detectedNote:'Se conservan como evidencia. Su presencia no certifica calidad ni justifica volver a instalarlas.',
    control:'¿Quién puede implementar los cambios?',controls:{unknown:'Todavía no lo sé',self:'Yo o mi equipo',provider:'Necesito coordinar con el proveedor'},
    pendingTitle:'Antes de preparar la entrega',pending:['Confirmar contenido público, organización e idiomas.','Identificar responsable del sitio y mecanismo de publicación.','Conservar la versión anterior y comprobar recuperación.','Acordar alcance, presupuesto y ventana de trabajo.'],
    advanced:'AF4/AF5: APIs, MCP, acciones y pagos necesitan relevamiento y cotización particular. No se incluyen por una señal ausente.',
    review:'Revisé las mejoras seleccionadas. Esto no autoriza escrituras ni publicaciones.',
    download:'Descargar mi alcance',downloaded:'Alcance descargado. No se envió una solicitud ni se publicó en tu sitio.',
    exportError:'No se pudo preparar la descarga. Volvé a intentarlo.',
    capsuleTitle:'Preparación de la cápsula',capsuleText:'El alcance reúne lo que querés resolver. En el expediente privado se completan datos, se revisan recursos y se genera la cápsula con las aprobaciones pendientes.',
    dossier:'Abrir expediente privado',dossierNote:'Requiere una cuenta con acceso habilitado. Descargá el archivo de traspaso (.json) y abrilo en el expediente; allí revisaremos el sitio y las mejoras antes de completar los datos.',
    noDossier:'Si todavía no tenés acceso, conservá este alcance para revisarlo con tu responsable web.',
    session:'Este borrador vive en esta pestaña. Descargalo para conservarlo; cambiar el sitio o repetir la auditoría inicia otro alcance.',
    noGuarantee:'Sin precio automático ni garantía de citas, posicionamiento o nivel AF.',
    signals:{robots:'Política de rastreo',sitemap:'Mapa del sitio',directAnswers:'Respuestas directas',structuredData:'Datos estructurados',llms:'Índice llms.txt',markdown:'Contenido Markdown',ownership:'Identidad del responsable',sources:'Fuentes citables'},
    actions:{
      crawl:{title:'Ordenar el descubrimiento',self:'Revisá con tu mantenedor qué páginas deben ser públicas y rastreables.',assisted:'Contrastar robots y sitemap con las rutas y políticas vigentes.',deliverable:'Inventario y ajustes de rastreo revisados; cada cambio requiere aprobación.'},
      answers:{title:'Hacer claras las respuestas',self:'Definí servicios, preguntas frecuentes y fuentes que respalden lo que afirmás.',assisted:'Revisar contenido y datos estructurados contra las páginas visibles.',deliverable:'Propuesta de contenido citable y metadata coherente, sin datos inventados.'},
      documents:{title:'Preparar documentos para agentes',self:'Reuní las páginas públicas que explican tu organización y sus límites.',assisted:'Evaluar si un índice llms.txt y su documento ampliado aportan información útil.',deliverable:'Si se confirma la necesidad: dos documentos propuestos, hashes y procedimiento de entrega.'},
      trust:{title:'Aclarar identidad y fuentes',self:'Identificá responsables, fechas y fuentes públicas de tus afirmaciones.',assisted:'Revisar procedencia y consistencia entre documentos.',deliverable:'Lista de afirmaciones con fuentes y correcciones para revisión.'},
    },
  },
  en: {
    eyebrow:'Your next step',title:'Turn the findings into a clear scope.',viewPlan:'Prepare my scope',
    intro:'Review the signals and choose what to improve. This order puts foundations first; it does not change the audit score.',
    observation:'Observed',states:{detected:'Detected',not_detected:'Not detected in this check',unverified:'Needs verification'},
    evidenceLimit:'A signal not detected here may exist elsewhere on the website. Verify it before implementation.',
    self:'On your own',assisted:'With assistance',deliverable:'Proposed deliverable',select:'Include in my scope',
    reviewTitle:'Review your proposal',selected:'improvements selected',selectedOne:'improvement selected',empty:'Choose at least one improvement to prepare your scope.',
    detectedTitle:'Detected signals',detectedNote:'Kept as evidence. Their presence does not certify quality or justify installing them again.',
    control:'Who can implement the changes?',controls:{unknown:'I do not know yet',self:'My team or I',provider:'I need to coordinate with the provider'},
    pendingTitle:'Before preparing delivery',pending:['Confirm public content, organization and languages.','Identify the website owner and publication method.','Preserve the previous version and verify recovery.','Agree scope, budget and a work window.'],
    advanced:'AF4/AF5: APIs, MCP, actions and payments need individual discovery and a separate quote. A missing signal does not include them in this scope.',
    review:'I reviewed the selected improvements. This does not authorize writes or publication.',
    download:'Download my scope',downloaded:'Scope downloaded. No request was sent and nothing was published to your website.',exportError:'The download could not be prepared. Please try again.',
    capsuleTitle:'Preparing the capsule',capsuleText:'The scope collects what you want to resolve. In the private dossier, complete the details, review resources and generate the capsule with approvals still pending.',
    dossier:'Open private dossier',dossierNote:'Requires an account with access enabled. Download the transfer file (.json) and open it in the dossier; we will review the website and improvements before completing the details.',
    noDossier:'If you do not have access yet, keep this scope to review with your website maintainer.',
    session:'This draft lives in this tab. Download it to keep it; changing the website or running another audit starts a new scope.',
    noGuarantee:'No automatic price or guarantee of citations, rankings or AF level.',
    signals:{robots:'Crawler policy',sitemap:'Sitemap',directAnswers:'Direct answers',structuredData:'Structured data',llms:'llms.txt index',markdown:'Markdown content',ownership:'Owner identity',sources:'Citable sources'},
    actions:{
      crawl:{title:'Organize discovery',self:'Review with your maintainer which pages should be public and crawlable.',assisted:'Compare robots and sitemap with current routes and policies.',deliverable:'Reviewed crawl inventory and proposed changes; each change requires approval.'},
      answers:{title:'Make answers clear',self:'Define services, frequently asked questions and sources supporting your claims.',assisted:'Review content and structured data against visible pages.',deliverable:'Proposed citable content and consistent metadata, without invented facts.'},
      documents:{title:'Prepare documents for agents',self:'Gather public pages explaining your organization and its limits.',assisted:'Assess whether a llms.txt index and a longer document add useful information.',deliverable:'If needed: two proposed documents, hashes and a delivery procedure.'},
      trust:{title:'Clarify identity and sources',self:'Identify owners, dates and public sources for your claims.',assisted:'Review provenance and consistency across documents.',deliverable:'Claims and sources checklist with corrections for review.'},
    },
  },
  pt: {
    eyebrow:'Seu próximo passo',title:'Transforme o diagnóstico em um escopo claro.',viewPlan:'Preparar meu escopo',
    intro:'Revise os sinais e escolha o que melhorar. Esta ordem prioriza fundamentos; não altera a pontuação da auditoria.',
    observation:'Observado',states:{detected:'Detectado',not_detected:'Não detectado nesta revisão',unverified:'A verificar'},
    evidenceLimit:'Um sinal não detectado aqui pode existir em outra parte do site. Confirme antes de implementar.',
    self:'Por conta própria',assisted:'Com ajuda',deliverable:'Entrega proposta',select:'Incluir no meu escopo',
    reviewTitle:'Revise sua proposta',selected:'melhorias selecionadas',selectedOne:'melhoria selecionada',empty:'Escolha pelo menos uma melhoria para preparar seu escopo.',
    detectedTitle:'Sinais detectados',detectedNote:'Preservados como evidência. Sua presença não certifica qualidade nem justifica reinstalação.',
    control:'Quem pode implementar as mudanças?',controls:{unknown:'Ainda não sei',self:'Eu ou minha equipe',provider:'Preciso coordenar com o fornecedor'},
    pendingTitle:'Antes de preparar a entrega',pending:['Confirmar conteúdo público, organização e idiomas.','Identificar o responsável pelo site e o método de publicação.','Preservar a versão anterior e verificar a recuperação.','Combinar escopo, orçamento e janela de trabalho.'],
    advanced:'AF4/AF5: APIs, MCP, ações e pagamentos exigem levantamento e orçamento específicos. Um sinal ausente não os inclui neste escopo.',
    review:'Revisei as melhorias selecionadas. Isso não autoriza escritas nem publicações.',
    download:'Baixar meu escopo',downloaded:'Escopo baixado. Nenhuma solicitação foi enviada e nada foi publicado no seu site.',exportError:'Não foi possível preparar o download. Tente novamente.',
    capsuleTitle:'Preparação da cápsula',capsuleText:'O escopo reúne o que você quer resolver. No dossiê privado, complete os dados, revise os recursos e gere a cápsula com as aprovações ainda pendentes.',
    dossier:'Abrir dossiê privado',dossierNote:'Exige uma conta com acesso habilitado. Baixe o arquivo de transferência (.json) e abra no dossiê; revisaremos o site e as melhorias antes de completar os dados.',
    noDossier:'Se ainda não tem acesso, guarde este escopo para revisar com o responsável pelo site.',
    session:'Este rascunho fica nesta aba. Baixe-o para conservar; mudar o site ou repetir a auditoria inicia outro escopo.',
    noGuarantee:'Sem preço automático nem garantia de citações, posicionamento ou nível AF.',
    signals:{robots:'Política de rastreamento',sitemap:'Mapa do site',directAnswers:'Respostas diretas',structuredData:'Dados estruturados',llms:'Índice llms.txt',markdown:'Conteúdo Markdown',ownership:'Identidade do responsável',sources:'Fontes citáveis'},
    actions:{
      crawl:{title:'Organizar a descoberta',self:'Revise com o mantenedor quais páginas devem ser públicas e rastreáveis.',assisted:'Comparar robots e sitemap com as rotas e políticas vigentes.',deliverable:'Inventário e ajustes de rastreamento revisados; cada alteração exige aprovação.'},
      answers:{title:'Tornar as respostas claras',self:'Defina serviços, perguntas frequentes e fontes que sustentem suas afirmações.',assisted:'Revisar conteúdo e dados estruturados contra as páginas visíveis.',deliverable:'Proposta de conteúdo citável e metadados coerentes, sem dados inventados.'},
      documents:{title:'Preparar documentos para agentes',self:'Reúna páginas públicas que expliquem sua organização e seus limites.',assisted:'Avaliar se um índice llms.txt e um documento ampliado acrescentam informação útil.',deliverable:'Se necessário: dois documentos propostos, hashes e procedimento de entrega.'},
      trust:{title:'Esclarecer identidade e fontes',self:'Identifique responsáveis, datas e fontes públicas das afirmações.',assisted:'Revisar procedência e consistência entre documentos.',deliverable:'Lista de afirmações com fontes e correções para revisão.'},
    },
  },
};

/** @param {{target:string,checkedAt:string,evidence:Record<string,unknown>,limits?:string[]}} scan */
export function buildScanActionPlan(scan, locale='es') {
  const language=['es','en','pt'].includes(locale)?locale:'es';
  const copy=ACTION_PLAN_COPY[language];
  const url=new URL(normalizePublicUrl(scan.target));
  if (!Number.isFinite(Date.parse(scan.checkedAt))) throw new Error('Invalid observation date');
  const actions=definitions.map(({id,checks})=>{
    const signals=checks.map(id=>({id,label:copy.signals[id],state:scan.evidence?.[id]===true?'detected':scan.evidence?.[id]===false?'not_detected':'unverified'}));
    const state=signals.every(s=>s.state==='detected')?'detected':signals.some(s=>s.state==='not_detected')?'not_detected':'unverified';
    return {id,...copy.actions[id],state,signals};
  });
  return {locale:language,target:url.origin,observedUrl:url.origin+url.pathname,checkedAt:scan.checkedAt,actions,scanLimits:(scan.limits||[]).filter(x=>typeof x==='string').slice(0,24),pending:copy.pending};
}

/** @param {ReturnType<typeof buildScanActionPlan>} plan
 * @param {{selected?:string[],reviewed?:boolean,control?:string}} options */
export function prepareScopeBrief(plan,{selected=[],reviewed=false,control='unknown'}={}) {
  const ids=[...new Set(selected)];
  if(!reviewed||!ids.length||ids.some(id=>!plan.actions.some(a=>a.id===id&&a.state!=='detected'))) throw new Error('Review a current selection before exporting');
  const actions=plan.actions.filter(a=>ids.includes(a.id));
  return {
    status:'scope_reviewed_not_authorized',locale:plan.locale,target:plan.target,observedUrl:plan.observedUrl,checkedAt:plan.checkedAt,
    actions,scanLimits:plan.scanLimits,pending:plan.pending,price:null,
    deliveryMode:control==='self'?'self_managed':control==='provider'?'assisted':'to_confirm',
    capsulePreparation:{suggestedResources:ids.includes('documents')?['llms','llms_full']:[],requiresAuthenticatedDossier:true,publicationAuthorized:false},
    limitations:[ACTION_PLAN_COPY[plan.locale].evidenceLimit,ACTION_PLAN_COPY[plan.locale].advanced,ACTION_PLAN_COPY[plan.locale].noGuarantee,ACTION_PLAN_COPY[plan.locale].dossierNote],
  };
}
