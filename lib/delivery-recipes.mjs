import {DELIVERY_ADVICE_COPY} from './delivery-advisor.mjs';

// Read-only guidance. A declared capability never establishes access or permission.
const recipes={
 es:{
  scoped_plugin_review:{
   prepare:'Confirmar el CMS y si las rutas ya las sirve un archivo del hosting. Preparar un plugin compatible, acotado, revisado y probado; la cápsula de textos no es ese plugin.',
   evidence:'Pedir la versión del plugin y la comprobación de cada ruta, también sin sesión; un adjunto de la biblioteca de medios no prueba una ruta pública de raíz.',
   pause:'Si la activación tiene resultado incierto o el plugin no controla el archivo existente, consultar el estado antes de repetir y acordar el siguiente paso con el responsable.'
  },
  verified_docroot:{
   prepare:'Confirmar con el hosting qué carpeta sirve el dominio exacto y conservar los archivos anteriores o su ausencia antes de reemplazar únicamente los destinos acordados.',
   evidence:'Pedir la ruta pública comprobada, fecha y contenido o hash esperado. Comprobar también que inicio, robots y sitemap conserven el comportamiento acordado.',
   pause:'Si una subida queda con resultado desconocido o aparece un conflicto, leer el destino antes de repetir; no cambiar DNS, proxy o permisos generales para forzar la entrega.'
  },
  source_pr:{
   prepare:'Confirmar repositorio, entorno y despliegue del dominio; preparar una propuesta mínima con archivos, pruebas y recuperación compatibles, sin cambios de base de datos.',
   evidence:'Pedir la revisión efectivamente publicada, fecha y comprobación de las rutas. CI verde o un PR aprobado todavía no demuestran que esos archivos estén publicados.',
   pause:'Si el despliegue tiene resultado incierto, consultar su estado y revisión antes de repetir; conciliar cualquier conflicto con quien lo mantiene.'
  },
  maintainer_handoff:{
   prepare:'Preparar para quien mantiene el sitio las rutas, archivos, versión, comprobación y recuperación. Pedir solo la capacidad concreta, sin contraseñas ni acceso general.',
   evidence:'Acordar la devolución de las rutas efectivas, versión o revisión, fecha y resultado de comprobación; un mensaje de «lo subí» no basta para darlo por verificado.',
   pause:'Si el responsable no responde, el resultado es desconocido o el producto no admite la ruta, dejar la instalación pendiente y consultar antes de repetir o buscar otro método.'
  },
  identify_maintainer:{
   prepare:'Identificar quién mantiene el sitio y preparar una pregunta sobre cómo admite publicar estos archivos, sin pedir contraseñas ni acceso general.',
   evidence:'Guardar qué método admite el sitio y quién puede confirmarlo. Todavía no hay una instalación ni un acceso comprobado.',
   pause:'Si el método sigue siendo desconocido o falta confirmar al responsable, mantenerlo pendiente; no elegir un instalador ni repetir una entrega por suposición.'
  }
 },
 en:{
  scoped_plugin_review:{
   prepare:'Confirm the CMS and whether an existing hosting file serves these paths. Prepare a compatible, scoped, reviewed and tested plugin; the text capsule is not that plugin.',
   evidence:'Request the plugin version and checks for every route, including without a session; a media-library attachment does not establish a public root route.',
   pause:'If activation has an uncertain outcome or the plugin does not control an existing file, inspect the current state before retrying and agree the next step with the maintainer.'
  },
  verified_docroot:{
   prepare:'Confirm with the host which directory serves the exact domain and preserve previous files or their absence before replacing only the agreed destinations.',
   evidence:'Request the checked public route, date and expected content or hash. Also check that the homepage, robots and sitemap retain their agreed behavior.',
   pause:'If an upload has an unknown outcome or a conflict appears, read the destination before retrying; do not change DNS, proxies or general permissions to force delivery.'
  },
  source_pr:{
   prepare:'Confirm the domain’s repository, environment and deployment; prepare a minimal proposal with files, tests and compatible recovery, without database changes.',
   evidence:'Request the revision actually deployed, its date and route checks. Green CI or an approved PR do not yet establish that these files are published.',
   pause:'If deployment has an uncertain outcome, inspect its state and revision before retrying; reconcile conflicts with the maintainer.'
  },
  maintainer_handoff:{
   prepare:'Prepare routes, files, version, verification and recovery for the maintainer. Ask only for the specific capability, without passwords or general access.',
   evidence:'Agree on a return of actual routes, version or revision, date and verification results; an “uploaded” message alone does not establish verification.',
   pause:'If the maintainer does not respond, the result is unknown or the product does not support the route, leave installation pending and check before retrying or choosing another method.'
  },
  identify_maintainer:{
   prepare:'Identify the website maintainer and prepare one question about how the site supports publishing these files, without passwords or general access.',
   evidence:'Record which method the site supports and who can confirm it. There is no installation or verified access yet.',
   pause:'If the method is still unknown or the maintainer is unconfirmed, keep it pending; do not choose an installer or repeat a delivery on an assumption.'
  }
 },
 pt:{
  scoped_plugin_review:{
   prepare:'Confirmar o CMS e se um arquivo do hosting já atende essas rotas. Preparar um plugin compatível, limitado, revisado e testado; a cápsula de textos não é esse plugin.',
   evidence:'Pedir a versão do plugin e a verificação de cada rota, também sem sessão; um anexo da biblioteca de mídia não comprova uma rota pública na raiz.',
   pause:'Se a ativação tiver resultado incerto ou o plugin não controlar o arquivo existente, consultar o estado antes de repetir e combinar o próximo passo com o responsável.'
  },
  verified_docroot:{
   prepare:'Confirmar com o hosting qual pasta atende o domínio exato e conservar os arquivos anteriores ou sua ausência antes de substituir somente os destinos combinados.',
   evidence:'Pedir a rota pública verificada, data e conteúdo ou hash esperado. Verificar também se início, robots e sitemap mantêm o comportamento combinado.',
   pause:'Se um envio ficar com resultado desconhecido ou houver conflito, ler o destino antes de repetir; não mudar DNS, proxy ou permissões gerais para forçar a entrega.'
  },
  source_pr:{
   prepare:'Confirmar repositório, ambiente e implantação do domínio; preparar uma proposta mínima com arquivos, testes e recuperação compatíveis, sem mudanças no banco de dados.',
   evidence:'Pedir a revisão efetivamente publicada, data e verificação das rotas. CI verde ou um PR aprovado ainda não demonstram que esses arquivos estejam publicados.',
   pause:'Se a implantação tiver resultado incerto, consultar seu estado e revisão antes de repetir; conciliar conflitos com quem mantém o site.'
  },
  maintainer_handoff:{
   prepare:'Preparar para quem mantém o site as rotas, arquivos, versão, verificação e recuperação. Pedir só a capacidade específica, sem senhas nem acesso geral.',
   evidence:'Combinar o retorno das rotas efetivas, versão ou revisão, data e resultado da verificação; uma mensagem de “enviei” não basta para considerar verificado.',
   pause:'Se o responsável não responder, o resultado for desconhecido ou o produto não admitir a rota, deixar a instalação pendente e consultar antes de repetir ou escolher outro método.'
  },
  identify_maintainer:{
   prepare:'Identificar quem mantém o site e preparar uma pergunta sobre como ele permite publicar estes arquivos, sem pedir senhas nem acesso geral.',
   evidence:'Registrar qual método o site admite e quem pode confirmá-lo. Ainda não há instalação nem acesso verificado.',
   pause:'Se o método continuar desconhecido ou faltar confirmar o responsável, manter pendente; não escolher um instalador nem repetir uma entrega por suposição.'
  }
 }
};

export function deliveryRecipe(method,locale='es'){
 const language=typeof locale==='string'&&Object.hasOwn(recipes,locale)?locale:'es';
 if(typeof method!=='string'||!Object.hasOwn(recipes[language],method))return null;
 return {id:method,question:DELIVERY_ADVICE_COPY[language].paths[method].next,...recipes[language][method]};
}
