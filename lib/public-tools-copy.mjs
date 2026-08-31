export const PUBLIC_TOOLS_COPY = Object.freeze({
  es: {
    measure: {
      eyebrow: 'Antes y después',
      title: 'Una mejora cuenta cuando deja evidencia observable.',
      intro: 'Compara dos observaciones del mismo sitio. El puntaje resume señales públicas; el detalle debe conservar URLs, fechas, fuentes y el cambio aplicado.',
      note: 'Los valores se procesan solo en tu navegador y no se guardan. Para un registro privado y versionado usa Mi expediente.',
      method: [
        ['Medir base', 'Registra lo que realmente responde hoy, con fecha y evidencia.'],
        ['Aplicar y volver a observar', 'Versiona el cambio, verifica el origen y compara la misma metodología.'],
        ['Explicar el límite', 'Mayor claridad no equivale a una garantía comercial de terceros.'],
      ],
    },
    comparison: {
      aria: 'Comparador de evidencia', baseline: 'Antes', current: 'Ahora', scoreInput: 'Puntaje AF observado o registrado',
      evidenceInput: 'Evidencias públicas verificadas', dateInput: 'Fecha de observación', score: 'Puntaje', evidence: 'Evidencias',
      period: 'Periodo', noDate: 'sin fecha', disclaimer: 'Esta lectura compara evidencia. No garantiza ranking, indexación ni recomendación por un proveedor.',
    },
    assistant: {
      eyebrow: 'Bloque 3 · prototipo controlado', title: 'No necesitas saber cómo completar un formulario técnico para empezar.',
      intro: 'Escribe datos sueltos sobre tu organización y el asistente los ordenará como propuestas. Tú revisas cada campo antes de copiar o usar cualquier resultado.',
      note: 'Esta versión es determinista y local. No usa un modelo externo, voz, correo, pagos ni guardado autónomo.',
    },
    intake: {
      freeContext: 'Contexto libre', freeTitle: 'Cuéntanos lo que sabes, aunque esté desordenado.',
      secretWarning: 'No incluyas claves, passwords, tokens ni datos de pago.', review: 'Revisar propuesta',
      privacy: 'No se guarda, no se envía por email y no modifica tu expediente ni tu sitio.', humanReview: 'Revisión humana',
      choose: 'Eliges qué propuestas conservar.', empty: 'Todavía no analizamos el texto. El resultado aparecerá separado por campo y con su fragmento de origen.',
      source: 'Origen', copied: 'Propuesta copiada', copy: 'Copiar propuesta revisada',
      contract: 'Copiar no equivale a guardar ni publicar. La integración con el expediente autenticado requiere un gate posterior.',
      fields: { organization: 'Organización', website: 'Sitio web', audience: 'Audiencia', goals: 'Objetivos', languages: 'Idiomas', cms: 'CMS', hosting: 'Alojamiento', notes: 'Notas de contexto' },
      example: 'Somos Museo Sur. Nuestro sitio es museosur.org. Queremos que nos encuentren coleccionistas, investigadores y visitantes. La web usa WordPress y debe explicarse en español, inglés y portugués.',
    },
    guide: {
      eyebrow: 'Guía pública v1', title: 'Pregunta como persona. La guía ordena el recorrido.',
      intro: 'No necesitas conocer AEO, crawlers, OKF ni protocolos. Cuéntanos qué quieres lograr y te explicará un paso por vez con fuentes públicas.',
      noteTitle: 'Una conversación controlada', note: 'Entiende continuaciones, puede simplificar o profundizar y no inventa capacidades fuera del catálogo.',
      noteLimit: 'Sin guardado, pagos ni cambios remotos',
    },
    guideUI: {
      identity: 'Guía AF', status: 'Pública · determinista · sin memoria permanente', reset: 'Reiniciar', resetTitle: 'Reiniciar la conversación',
      conversation: 'Conversación con la guía pública', blocked: 'Mensaje bloqueado por posible credencial.', simple: 'Explicación simple',
      detailed: 'Explicación detallada', standard: 'Guía pública', sources: 'Fuentes', replies: 'Opciones para continuar',
      input: 'Escribe tu pregunta', placeholder: 'Ejemplo: ¿por dónde empiezo a mejorar mi sitio?', send: 'Enviar pregunta', sendShort: 'Enviar',
      keyboard: 'Enter envía · Shift+Enter agrega una línea · No incluyas claves ni datos de pago.', boundary: 'Lo que hace hoy',
      boundaryTitle: 'Te orienta sin tomar control.', boundaryBody: 'Explica el producto, mantiene el hilo inmediato y enlaza evidencia pública. La charla se borra al recargar la página.',
      answers: 'Respuestas', catalog: 'Catálogo público', sourceLabel: 'Fuentes', allowlisted: 'Allowlisted', actions: 'Acciones', none: 'Ninguna',
      privateData: 'Datos privados', noAccess: 'Sin acceso', assistantLink: 'Necesito ordenar datos para mi proyecto',
    },
  },
  en: {
    measure: {
      eyebrow: 'Before and after', title: 'An improvement counts when it leaves observable evidence.',
      intro: 'Compare two observations of the same website. The score summarizes public signals; the record should retain URLs, dates, sources and the applied change.',
      note: 'Values are processed only in your browser and are not saved. Use My dossier for a private, versioned record.',
      method: [
        ['Measure the baseline', 'Record what the website actually returns today, with date and evidence.'],
        ['Apply and observe again', 'Version the change, verify the origin and compare the same methodology.'],
        ['Explain the boundary', 'Greater clarity is not a commercial guarantee from a third party.'],
      ],
    },
    comparison: {
      aria: 'Evidence comparison', baseline: 'Before', current: 'Now', scoreInput: 'Observed or recorded AF score',
      evidenceInput: 'Verified public evidence', dateInput: 'Observation date', score: 'Score', evidence: 'Evidence',
      period: 'Period', noDate: 'no date', disclaimer: 'This reading compares evidence. It does not guarantee ranking, indexing or recommendation by a provider.',
    },
    assistant: {
      eyebrow: 'Block 3 · controlled prototype', title: 'You do not need to understand a technical form before getting started.',
      intro: 'Write loose information about your organization and the assistant will organize it into proposals. You review every field before copying or using any result.',
      note: 'This version is deterministic and local. It uses no external model, voice, email, payments or autonomous storage.',
    },
    intake: {
      freeContext: 'Free-form context', freeTitle: 'Tell us what you know, even if it is unstructured.',
      secretWarning: 'Do not include passwords, tokens, keys or payment information.', review: 'Review proposal',
      privacy: 'Nothing is saved, emailed or used to modify your dossier or website.', humanReview: 'Human review',
      choose: 'You choose which proposals to keep.', empty: 'The text has not been analyzed yet. Results will appear by field with their source excerpt.',
      source: 'Source', copied: 'Proposal copied', copy: 'Copy reviewed proposal',
      contract: 'Copying does not save or publish anything. Integration with the authenticated dossier requires a later gate.',
      fields: { organization: 'Organization', website: 'Website', audience: 'Audience', goals: 'Goals', languages: 'Languages', cms: 'CMS', hosting: 'Hosting', notes: 'Context notes' },
      example: 'We are Museo Sur. Our website is museosur.org. We want collectors, researchers and visitors to find us. The website uses WordPress and should be explained in Spanish, English and Portuguese.',
    },
    guide: {
      eyebrow: 'Public guide v1', title: 'Ask like a person. The guide organizes the journey.',
      intro: 'You do not need to know AEO, crawlers, OKF or protocols. Tell us what you want to achieve and the guide will explain one step at a time with public sources.',
      noteTitle: 'A controlled conversation', note: 'It understands follow-ups, can simplify or expand, and never invents capabilities outside the catalog.',
      noteLimit: 'No storage, payments or remote changes',
    },
    guideUI: {
      identity: 'AF Guide', status: 'Public · deterministic · no permanent memory', reset: 'Reset', resetTitle: 'Reset the conversation',
      conversation: 'Conversation with the public guide', blocked: 'Message blocked because it may contain a credential.', simple: 'Simple explanation',
      detailed: 'Detailed explanation', standard: 'Public guide', sources: 'Sources', replies: 'Options to continue',
      input: 'Write your question', placeholder: 'Example: where should I start improving my website?', send: 'Send question', sendShort: 'Send',
      keyboard: 'Enter sends · Shift+Enter adds a line · Do not include keys or payment information.', boundary: 'What it does today',
      boundaryTitle: 'It guides you without taking control.', boundaryBody: 'It explains the product, keeps immediate context and links public evidence. The conversation disappears when the page reloads.',
      answers: 'Answers', catalog: 'Public catalog', sourceLabel: 'Sources', allowlisted: 'Allowlisted', actions: 'Actions', none: 'None',
      privateData: 'Private data', noAccess: 'No access', assistantLink: 'I need to organize information for my project',
    },
  },
  pt: {
    measure: {
      eyebrow: 'Antes e depois', title: 'Uma melhoria conta quando deixa evidência observável.',
      intro: 'Compare duas observações do mesmo site. A pontuação resume sinais públicos; o registro deve manter URLs, datas, fontes e a mudança aplicada.',
      note: 'Os valores são processados apenas no navegador e não são salvos. Use Meu dossiê para um registro privado e versionado.',
      method: [
        ['Medir o baseline', 'Registre o que o site realmente responde hoje, com data e evidência.'],
        ['Aplicar e observar novamente', 'Versione a mudança, verifique a origem e compare a mesma metodologia.'],
        ['Explicar o limite', 'Mais clareza não equivale a uma garantia comercial de terceiros.'],
      ],
    },
    comparison: {
      aria: 'Comparador de evidências', baseline: 'Antes', current: 'Agora', scoreInput: 'Pontuação AF observada ou registrada',
      evidenceInput: 'Evidências públicas verificadas', dateInput: 'Data da observação', score: 'Pontuação', evidence: 'Evidências',
      period: 'Período', noDate: 'sem data', disclaimer: 'Esta leitura compara evidências. Não garante ranking, indexação ou recomendação por um provedor.',
    },
    assistant: {
      eyebrow: 'Bloco 3 · protótipo controlado', title: 'Você não precisa entender um formulário técnico para começar.',
      intro: 'Escreva informações soltas sobre sua organização e o assistente as organizará como propostas. Você revisa cada campo antes de copiar ou usar qualquer resultado.',
      note: 'Esta versão é determinística e local. Não usa modelo externo, voz, email, pagamentos ou armazenamento autônomo.',
    },
    intake: {
      freeContext: 'Contexto livre', freeTitle: 'Conte o que você sabe, mesmo que esteja desorganizado.',
      secretWarning: 'Não inclua senhas, tokens, chaves ou dados de pagamento.', review: 'Revisar proposta',
      privacy: 'Nada é salvo, enviado por email ou usado para modificar seu dossiê ou site.', humanReview: 'Revisão humana',
      choose: 'Você escolhe quais propostas manter.', empty: 'O texto ainda não foi analisado. O resultado aparecerá por campo com seu trecho de origem.',
      source: 'Origem', copied: 'Proposta copiada', copy: 'Copiar proposta revisada',
      contract: 'Copiar não salva nem publica. A integração com o dossiê autenticado exige um gate posterior.',
      fields: { organization: 'Organização', website: 'Site', audience: 'Público', goals: 'Objetivos', languages: 'Idiomas', cms: 'CMS', hosting: 'Hospedagem', notes: 'Notas de contexto' },
      example: 'Somos o Museo Sur. Nosso site é museosur.org. Queremos ser encontrados por colecionadores, pesquisadores e visitantes. O site usa WordPress e deve ser explicado em espanhol, inglês e português.',
    },
    guide: {
      eyebrow: 'Guia público v1', title: 'Pergunte como pessoa. O guia organiza o caminho.',
      intro: 'Você não precisa conhecer AEO, crawlers, OKF ou protocolos. Conte o que deseja alcançar e o guia explicará um passo por vez com fontes públicas.',
      noteTitle: 'Uma conversa controlada', note: 'Entende continuações, pode simplificar ou aprofundar e não inventa capacidades fora do catálogo.',
      noteLimit: 'Sem armazenamento, pagamentos ou mudanças remotas',
    },
    guideUI: {
      identity: 'Guia AF', status: 'Público · determinístico · sem memória permanente', reset: 'Reiniciar', resetTitle: 'Reiniciar a conversa',
      conversation: 'Conversa com o guia público', blocked: 'Mensagem bloqueada por possível credencial.', simple: 'Explicação simples',
      detailed: 'Explicação detalhada', standard: 'Guia público', sources: 'Fontes', replies: 'Opções para continuar',
      input: 'Escreva sua pergunta', placeholder: 'Exemplo: por onde começo a melhorar meu site?', send: 'Enviar pergunta', sendShort: 'Enviar',
      keyboard: 'Enter envia · Shift+Enter adiciona uma linha · Não inclua chaves ou dados de pagamento.', boundary: 'O que faz hoje',
      boundaryTitle: 'Orienta você sem assumir o controle.', boundaryBody: 'Explica o produto, mantém o contexto imediato e vincula evidências públicas. A conversa some ao recarregar a página.',
      answers: 'Respostas', catalog: 'Catálogo público', sourceLabel: 'Fontes', allowlisted: 'Allowlisted', actions: 'Ações', none: 'Nenhuma',
      privateData: 'Dados privados', noAccess: 'Sem acesso', assistantLink: 'Preciso organizar dados para meu projeto',
    },
  },
});

export function publicToolsCopy(locale = 'es') {
  return PUBLIC_TOOLS_COPY[locale] || PUBLIC_TOOLS_COPY.es;
}
