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
      maintainer_handoff: { title: 'Podemos preparar la entrega para quien mantiene tu web.', next: 'Primero confirmemos quién puede publicar estos archivos en las rutas indicadas. Editar páginas no siempre permite publicar archivos de descubrimiento.' },
      scoped_plugin_review: { title: 'Podemos evaluar una entrega mediante un plugin acotado.', next: 'Primero confirmemos el CMS y si ya existen estos archivos como recursos estáticos. La cápsula actual no es un plugin instalable; hace falta preparar y probar un paquete compatible.' },
      verified_docroot: { title: 'Podemos evaluar la entrega de archivos en tu hosting.', next: 'Primero confirmemos la carpeta pública del dominio correcto con quien administra el hosting. Antes de reemplazar archivos, conservaremos la versión anterior y acordaremos la comprobación y retirada.' },
      source_pr: { title: 'Podemos preparar una propuesta para revisar en el repositorio.', next: 'Primero confirmemos qué repositorio y despliegue sirven este dominio. La revisión debe incluir los archivos, las pruebas y cómo volver a la versión anterior.' },
      identify_maintainer: { title: 'Está bien si todavía no lo sabés.', next: 'Empecemos por identificar a quien mantiene la web. Podemos pedirle únicamente qué método admite para publicar estos archivos, sin solicitar contraseñas ni acceso general.' },
    },
  },
  en: {
    open: 'How do I deliver these files to my website?', question: 'What can you do on your website today?',
    reassurance: 'You do not need to solve everything now. Choose what you know and I will explain one next step.',
    boundary: 'This choice is guidance only and is not saved in the dossier. It confirms neither access, permission nor publication.', back: 'Choose another option',
    options: { cms_edit: 'Edit pages', cms_plugin: 'Install plugins', hosting_files: 'Upload hosting files', repository: 'Work with the repository', maintainer: 'Ask the website maintainer', unknown: 'I am not sure' },
    paths: {
      maintainer_handoff: { title: 'We can prepare a handoff for your website maintainer.', next: 'First confirm who can publish these files at the listed paths. Editing pages does not always allow publishing discovery files.' },
      scoped_plugin_review: { title: 'We can assess delivery through a scoped plugin.', next: 'First confirm the CMS and whether these files already exist as static resources. The current capsule is not an installable plugin; a compatible package needs preparation and testing.' },
      verified_docroot: { title: 'We can assess delivery through your hosting files.', next: 'First confirm the public directory for the correct domain with the hosting administrator. Before replacing files, preserve the previous version and agree on verification and rollback.' },
      source_pr: { title: 'We can prepare a proposal for repository review.', next: 'First confirm which repository and deployment serve this domain. Review must include the files, tests and how to restore the previous version.' },
      identify_maintainer: { title: 'It is fine if you do not know yet.', next: 'Start by identifying the website maintainer. Ask only which method supports publishing these files, without passwords or general access.' },
    },
  },
  pt: {
    open: 'Como entrego estes arquivos ao meu site?', question: 'O que você pode fazer hoje no seu site?',
    reassurance: 'Você não precisa resolver tudo agora. Escolha o que conhece e explicarei um próximo passo.',
    boundary: 'Esta escolha apenas orienta e não é salva no expediente. Não confirma acesso, permissão nem publicação.', back: 'Escolher outra opção',
    options: { cms_edit: 'Editar páginas', cms_plugin: 'Instalar plugins', hosting_files: 'Enviar arquivos ao hosting', repository: 'Trabalhar no repositório', maintainer: 'Pedir a quem mantém o site', unknown: 'Não tenho certeza' },
    paths: {
      maintainer_handoff: { title: 'Podemos preparar a entrega para quem mantém seu site.', next: 'Primeiro confirme quem pode publicar estes arquivos nos caminhos indicados. Editar páginas nem sempre permite publicar arquivos de descoberta.' },
      scoped_plugin_review: { title: 'Podemos avaliar uma entrega por um plugin limitado.', next: 'Primeiro confirme o CMS e se estes arquivos já existem como recursos estáticos. A cápsula atual não é um plugin instalável; é preciso preparar e testar um pacote compatível.' },
      verified_docroot: { title: 'Podemos avaliar a entrega de arquivos no hosting.', next: 'Primeiro confirme a pasta pública do domínio correto com quem administra o hosting. Antes de substituir arquivos, preserve a versão anterior e combine a verificação e a reversão.' },
      source_pr: { title: 'Podemos preparar uma proposta para revisão no repositório.', next: 'Primeiro confirme qual repositório e implantação atendem este domínio. A revisão deve incluir os arquivos, testes e como restaurar a versão anterior.' },
      identify_maintainer: { title: 'Tudo bem se você ainda não souber.', next: 'Comece identificando quem mantém o site. Pergunte apenas qual método permite publicar estes arquivos, sem senhas nem acesso geral.' },
    },
  },
};
