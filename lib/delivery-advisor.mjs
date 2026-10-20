/** Advisory only: a selected capability never establishes access or publication permission. */
export function deliveryAdvice(capability) {
  const methods = new Map([
    ['cms_edit', 'maintainer_handoff'], ['cms_plugin', 'scoped_plugin_review'],
    ['hosting_files', 'verified_docroot'], ['repository', 'source_pr'],
    ['maintainer', 'maintainer_handoff'], ['unknown', 'identify_maintainer'],
  ]);
  const method = methods.get(capability) || null;
  return { step: method ? 'review_path' : 'ask_capability', method,
    evidence: method ? 'user_selected_unverified' : 'unknown', authorization: 'none', publishes: false };
}

export const DELIVERY_ADVICE_COPY = {
  es: {
    open: '¿Cómo llevo estos archivos a mi web?', question: '¿Qué podés hacer hoy en tu sitio?',
    reassurance: 'No necesitás resolverlo todo ahora. Elegí lo que conocés y te indicaré un próximo paso.',
    boundary: 'Esta elección solo orienta y no se guarda en el expediente. No confirma accesos, permisos ni publicación.', back: 'Elegir otra opción',
    options: { cms_edit: 'Editar páginas', cms_plugin: 'Instalar plugins', hosting_files: 'Subir archivos al hosting', repository: 'Trabajar con el repositorio', maintainer: 'Pedirlo a quien mantiene la web', unknown: 'No estoy seguro' },
    paths: {
      maintainer_handoff: { title: 'Podemos preparar la entrega para quien mantiene tu web.', next: '¿Quién mantiene tu web y puede confirmar cómo publicar estos archivos? Si no lo sabés, te ayudo a preparar esa consulta; no necesitamos contraseñas.' },
      scoped_plugin_review: { title: 'Podemos evaluar una entrega mediante un plugin acotado.', next: '¿Podés instalar plugins en este sitio o preferís coordinarlo con quien lo mantiene? Con eso elegimos el siguiente paso; la cápsula de archivos todavía no es un plugin instalable.' },
      verified_docroot: { title: 'Podemos evaluar la entrega de archivos en tu hosting.', next: '¿Quién puede confirmar qué carpeta pública sirve este dominio? Si no lo sabés, preparo una pregunta para el hosting; no hace falta compartir contraseñas.' },
      source_pr: { title: 'Podemos preparar una propuesta para revisar en el repositorio.', next: '¿Qué repositorio y despliegue sirven este dominio? Si lo lleva otra persona, podemos preparar una propuesta para que la revise.' },
      identify_maintainer: { title: 'Está bien si todavía no lo sabés.', next: '¿Sabés quién mantiene tu web? Está bien si todavía no: empecemos por ese dato y pidamos solo la capacidad necesaria, sin contraseñas ni acceso general.' },
    },
  },
  en: {
    open: 'How do I deliver these files to my website?', question: 'What can you do on your website today?',
    reassurance: 'You do not need to solve everything now. Choose what you know and I will explain one next step.',
    boundary: 'This choice is guidance only and is not saved in the dossier. It confirms neither access, permission nor publication.', back: 'Choose another option',
    options: { cms_edit: 'Edit pages', cms_plugin: 'Install plugins', hosting_files: 'Upload hosting files', repository: 'Work with the repository', maintainer: 'Ask the website maintainer', unknown: 'I am not sure' },
    paths: {
      maintainer_handoff: { title: 'We can prepare a handoff for your website maintainer.', next: 'Who maintains your website and can confirm how to publish these files? If you do not know yet, I can help prepare that question; no passwords are needed.' },
      scoped_plugin_review: { title: 'We can assess delivery through a scoped plugin.', next: 'Can you install plugins on this website, or would you prefer to coordinate with its maintainer? That helps us choose the next step; the file capsule is not an installable plugin yet.' },
      verified_docroot: { title: 'We can assess delivery through your hosting files.', next: 'Who can confirm which public directory serves this domain? If you do not know, I can prepare a question for the host; you do not need to share passwords.' },
      source_pr: { title: 'We can prepare a proposal for repository review.', next: 'Which repository and deployment serve this domain? If another person manages them, we can prepare a proposal for their review.' },
      identify_maintainer: { title: 'It is fine if you do not know yet.', next: 'Do you know who maintains your website? It is fine if you do not yet: start with that detail and ask only for the necessary capability, without passwords or general access.' },
    },
  },
  pt: {
    open: 'Como entrego estes arquivos ao meu site?', question: 'O que você pode fazer hoje no seu site?',
    reassurance: 'Você não precisa resolver tudo agora. Escolha o que conhece e explicarei um próximo passo.',
    boundary: 'Esta escolha apenas orienta e não é salva no expediente. Não confirma acesso, permissão nem publicação.', back: 'Escolher outra opção',
    options: { cms_edit: 'Editar páginas', cms_plugin: 'Instalar plugins', hosting_files: 'Enviar arquivos ao hosting', repository: 'Trabalhar no repositório', maintainer: 'Pedir a quem mantém o site', unknown: 'Não tenho certeza' },
    paths: {
      maintainer_handoff: { title: 'Podemos preparar a entrega para quem mantém seu site.', next: 'Quem mantém seu site e pode confirmar como publicar estes arquivos? Se ainda não souber, ajudo a preparar essa pergunta; não precisamos de senhas.' },
      scoped_plugin_review: { title: 'Podemos avaliar uma entrega por um plugin limitado.', next: 'Você pode instalar plugins neste site ou prefere combinar com quem o mantém? Assim escolhemos o próximo passo; a cápsula de arquivos ainda não é um plugin instalável.' },
      verified_docroot: { title: 'Podemos avaliar a entrega de arquivos no hosting.', next: 'Quem pode confirmar qual pasta pública atende este domínio? Se ainda não souber, preparo uma pergunta para o hosting; não é preciso compartilhar senhas.' },
      source_pr: { title: 'Podemos preparar uma proposta para revisão no repositório.', next: 'Qual repositório e implantação atendem este domínio? Se outra pessoa cuidar disso, podemos preparar uma proposta para ela revisar.' },
      identify_maintainer: { title: 'Tudo bem se você ainda não souber.', next: 'Você sabe quem mantém seu site? Tudo bem se ainda não: vamos começar por esse dado e pedir só a capacidade necessária, sem senhas nem acesso geral.' },
    },
  },
};
