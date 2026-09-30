/** Informational guidance only. Server permissions and decisions remain authoritative. */
export function capsuleGuideState({projectId='',loadState='loading',status='',canDecide=false,allowBuild=false,comparisonStatus='',comparisonState='ready',filesObservedUnchanged=false}={}) {
 if(!projectId)return 'save';
 if(loadState==='loading')return 'loading';
 if(loadState==='failed')return 'unavailable';
 if(!status)return allowBuild?'prepare':'awaitPreparation';
 if(status==='expired'||status==='rejected')return status;
 if(!['owner_approval_pending','maintainer_approval_pending','approved_for_manual_handoff'].includes(status))return 'unknown';
 if(comparisonState==='loading')return 'comparisonLoading';
 if(comparisonState==='failed')return 'comparisonUnavailable';
 if(comparisonStatus==='incomplete')return 'incomplete';
 if(!comparisonStatus)return 'compare';
 if(comparisonStatus!=='complete')return 'unknown';
 if(status==='approved_for_manual_handoff')return filesObservedUnchanged?'observedUnchanged':'handoff';
 return canDecide?'review':'waiting';
}
export function capsuleEvidenceMatches(capsule,comparison) {
 return Boolean(capsule?.capsuleId && capsule?.integrity?.manifestSha256 && comparison?.capsuleId===capsule.capsuleId && comparison?.manifestSha256===capsule.integrity.manifestSha256);
}
/** A dated text observation, not a publication decision or a permanent guarantee. */
export function capsuleFilesObservedUnchanged(capsule,comparison) {
 if(!capsuleEvidenceMatches(capsule,comparison)||comparison.status!=='complete')return false;
 const files=Array.isArray(capsule.files)?capsule.files:[];
 const resources=Array.isArray(comparison.resources)?comparison.resources:[];
 if(!files.length||files.length!==resources.length)return false;
 const keys=new Set();
 return files.every(file=>{
  const key=`${file.packagePath}\n${file.destinationPath}`;
  if(keys.has(key))return false;
  keys.add(key);
  const matches=resources.filter(resource=>resource.packagePath===file.packagePath&&resource.destinationPath===file.destinationPath);
  return matches.length===1&&matches[0].operation===file.operation&&matches[0].status==='unchanged'&&matches[0].httpStatus===200&&/^[a-f0-9]{64}$/.test(file.sha256||'')&&matches[0].proposedSha256===file.sha256&&/^[a-f0-9]{64}$/.test(matches[0].currentSha256||'');
 });
}
export const CAPSULE_GUIDE_COPY={
 es:{title:'Te acompaño en la revisión',refresh:'Consultar estado',explain:'¿Qué estoy preparando?',explanation:'La cápsula reúne archivos propuestos para tu sitio. Primero revisamos qué dicen y qué cambiarían; después cada responsable decide sobre esa versión. Aprobarla no publica los archivos.',files:'Ver los archivos propuestos',compare:'Ir a la comparación',decisions:'Ver responsables y decisiones',boundary:'Esta guía se basa en la última consulta. Podés volver a consultar antes de decidir.',states:{
 observedUnchanged:['En la última comparación, los archivos coincidían con esta versión.','No necesitás volver a entregar esos mismos archivos según esa lectura. Podés revisar abajo la fecha y el resultado; si el sitio cambió, repetimos la comparación. Esto no certifica todo el sitio ni confirma que siga igual ahora.'],
 save:['Primero conservemos tus datos.','Guardá el expediente para vincular la cápsula con el sitio correcto. Si te falta información, podés seguir completándola con ayuda.'],
 loading:['Estoy consultando el estado de la cápsula.','Enseguida te indicaré el próximo paso. No hace falta volver a completar tus datos.'],
 comparisonLoading:['Estoy consultando la comparación de esta versión.','Esperemos el resultado antes de decidir, para revisar los archivos correctos.'],
 comparisonUnavailable:['No pude confirmar la comparación de esta versión.','Podés volver a consultar el estado o repetir la comparación. Esperá un resultado actualizado antes de decidir.'],
 unavailable:['No pude confirmar el estado más reciente.','Podés volver a consultar. Si tu sesión venció, iniciá sesión en otra pestaña y regresá aquí; no recargues un borrador sin guardar.'],
 prepare:['Preparemos una propuesta para revisar.','Antes de usar Preparar cápsula, guardá el sitio, los datos y los recursos elegidos. El sistema comprobará los requisitos; si falta algo, te lo indicará.'],
 awaitPreparation:['Todavía no hay una cápsula disponible.','La persona responsable del expediente debe preparar la propuesta. Cuando esté lista, podrás revisarla desde este enlace.'],
 unknown:['Necesitamos confirmar este estado.','Consultá de nuevo antes de decidir. Este mensaje no confirma una aprobación ni una publicación.'],
 expired:['Esta versión venció.','Pedile al responsable del expediente que prepare una versión nueva. Así revisarás archivos y aprobaciones vigentes.'],
 rejected:['Esta versión necesita cambios.','Revisen el motivo con quien la rechazó y preparen una versión nueva. No hace falta aprobar algo que todavía no te resulta claro.'],
 incomplete:['La comparación todavía necesita atención.','Abrí los resultados para identificar qué archivo no pudo comprobarse. Resolvé ese punto con el responsable del sitio y volvé a comparar antes de decidir.'],
 compare:['Veamos qué cambiaría en tu sitio.','Podés abrir los archivos propuestos y comparar con los actuales. La comparación lee archivos públicos; no modifica el sitio.'],
 review:['Tomate un momento para revisar esta versión.','Leé los archivos y sus diferencias. Si entendés y aceptás los cambios, podés registrar tu decisión abajo; si algo no cierra, revisalo con el responsable antes de aprobar.'],
 waiting:['La revisión continúa con los responsables.','Consultá las decisiones de abajo para ver qué está pendiente. Si tu decisión ya está registrada, no necesitás repetirla.'],
 handoff:['Esta versión está aprobada para entrega manual.','Todavía no significa que esté publicada. Coordiná con quien mantiene el sitio: revisar destino, conservar la versión anterior y acordar cómo comprobar y revertir la entrega.']
 }},
 en:{title:'Let’s review this together',refresh:'Check status',explain:'What am I preparing?',explanation:'The capsule collects proposed files for your website. First review what they say and what they would change; then each responsible person decides on that version. Approval does not publish the files.',files:'View proposed files',compare:'Go to comparison',decisions:'View reviewers and decisions',boundary:'This guidance uses the latest retrieved state. You can check again before deciding.',states:{
 observedUnchanged:['The files matched this version in the latest comparison.','That observation does not require delivering the same files again. Review the date and result below; if the website changed, compare again. This does not certify the whole website or confirm it is still unchanged now.'],
 save:['Let’s save your details first.','Save the dossier to connect the capsule to the right website. You can keep completing missing information with help.'],
 loading:['I’m checking the capsule status.','I will show the next step shortly. You do not need to enter your details again.'],
 comparisonLoading:['I’m checking the comparison for this version.','Let’s wait for the result before deciding so we review the right files.'],
 comparisonUnavailable:['I could not confirm the comparison for this version.','Check the status again or repeat the comparison. Wait for an up-to-date result before deciding.'],
 unavailable:['I could not confirm the latest status.','You can check again. If your session expired, sign in in another tab and return here; do not reload an unsaved draft.'],
 prepare:['Let’s prepare a proposal to review.','Before using Prepare capsule, save your website, details and selected resources. The system checks requirements and will explain if something is missing.'],
 awaitPreparation:['There is no capsule available yet.','The person responsible for the dossier needs to prepare the proposal. Once ready, you can review it from this link.'],
 unknown:['We need to confirm this status.','Check again before deciding. This message confirms neither approval nor publication.'],
 expired:['This version has expired.','Ask the dossier owner to prepare a new version so you can review current files and approvals.'],
 rejected:['This version needs changes.','Discuss the reason with the person who rejected it and prepare a new version. You do not need to approve anything you do not understand yet.'],
 incomplete:['The comparison still needs attention.','Open the results to identify which file could not be checked. Resolve it with the website maintainer and compare again before deciding.'],
 compare:['Let’s see what would change on your website.','Open the proposed files and compare them with the current ones. Comparison reads public files; it does not modify the website.'],
 review:['Take a moment to review this version.','Read the files and their differences. If you understand and accept the changes, record your decision below; discuss anything unclear with the responsible person before approving.'],
 waiting:['The responsible people are continuing the review.','Check the decisions below to see what is pending. If your decision is already recorded, you do not need to repeat it.'],
 handoff:['This version is approved for manual delivery.','That does not mean it is published. Coordinate with the website maintainer: check the destination, preserve the previous version and agree how to verify and reverse delivery.']
 }},
 pt:{title:'Vamos revisar juntos',refresh:'Consultar estado',explain:'O que estou preparando?',explanation:'A cápsula reúne arquivos propostos para seu site. Primeiro revise o conteúdo e o que mudaria; depois cada responsável decide sobre essa versão. Aprovar não publica os arquivos.',files:'Ver arquivos propostos',compare:'Ir à comparação',decisions:'Ver responsáveis e decisões',boundary:'Esta orientação usa o último estado consultado. Você pode consultar novamente antes de decidir.',states:{
 observedUnchanged:['Na última comparação, os arquivos coincidiam com esta versão.','Essa leitura não exige entregar novamente os mesmos arquivos. Consulte a data e o resultado abaixo; se o site mudou, compare novamente. Isso não certifica todo o site nem confirma que continua igual agora.'],
 save:['Vamos guardar seus dados primeiro.','Salve o dossiê para vincular a cápsula ao site correto. Você pode continuar completando as informações com ajuda.'],
 loading:['Estou consultando o estado da cápsula.','Em seguida indicarei o próximo passo. Não precisa preencher seus dados novamente.'],
 comparisonLoading:['Estou consultando a comparação desta versão.','Vamos esperar o resultado antes de decidir, para revisar os arquivos corretos.'],
 comparisonUnavailable:['Não consegui confirmar a comparação desta versão.','Consulte o estado novamente ou repita a comparação. Espere um resultado atualizado antes de decidir.'],
 unavailable:['Não consegui confirmar o estado mais recente.','Você pode consultar novamente. Se a sessão venceu, entre em outra aba e volte aqui; não recarregue um rascunho sem salvar.'],
 prepare:['Vamos preparar uma proposta para revisar.','Antes de usar Preparar cápsula, salve o site, os dados e os recursos escolhidos. O sistema verifica os requisitos e indica o que falta.'],
 awaitPreparation:['Ainda não há uma cápsula disponível.','O responsável pelo dossiê precisa preparar a proposta. Quando estiver pronta, você poderá revisá-la neste link.'],
 unknown:['Precisamos confirmar este estado.','Consulte novamente antes de decidir. Esta mensagem não confirma aprovação nem publicação.'],
 expired:['Esta versão venceu.','Peça ao responsável pelo dossiê uma nova versão para revisar arquivos e aprovações atuais.'],
 rejected:['Esta versão precisa de alterações.','Revisem o motivo com quem a rejeitou e preparem uma nova versão. Não precisa aprovar algo que ainda não está claro.'],
 incomplete:['A comparação ainda precisa de atenção.','Abra os resultados para identificar o arquivo que não pôde ser verificado. Resolva com o responsável pelo site e compare novamente antes de decidir.'],
 compare:['Vamos ver o que mudaria no seu site.','Abra os arquivos propostos e compare com os atuais. A comparação lê arquivos públicos; não altera o site.'],
 review:['Reserve um momento para revisar esta versão.','Leia os arquivos e as diferenças. Se entender e aceitar as mudanças, registre sua decisão abaixo; converse com o responsável sobre qualquer dúvida antes de aprovar.'],
 waiting:['A revisão continua com os responsáveis.','Consulte as decisões abaixo para ver o que está pendente. Se sua decisão já foi registrada, não precisa repeti-la.'],
 handoff:['Esta versão está aprovada para entrega manual.','Isso ainda não significa que foi publicada. Combine com o mantenedor: revisar o destino, preservar a versão anterior e definir como verificar e reverter a entrega.']
 }}
};
