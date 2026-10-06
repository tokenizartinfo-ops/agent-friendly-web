const copy={
 es:{reviewed:'Quedó registrada una revisión de tu pedido. Podemos seguir con un paso sencillo; esta constancia todavía no es una respuesta personalizada.',attention:'La revisión indica que este pedido necesita atención adicional. Podés continuar a tu ritmo; todavía no hay una respuesta personalizada.',stale:'Esta revisión corresponde a una versión anterior. Revisemos el expediente actual antes de usarla.',labels:['Seguir con una pregunta','Revisar el guardado','Revisar la comparación','Revisar la entrega']},
 en:{reviewed:'A review of your request was recorded. We can take one simple next step; this receipt is not yet a personalized answer.',attention:'The review indicates that this request needs additional attention. You can continue at your own pace; there is no personalized answer yet.',stale:'This review belongs to an earlier version. Let us check the current dossier before using it.',labels:['Continue with one question','Check saving','Check the comparison','Check delivery']},
 pt:{reviewed:'Uma revisão do seu pedido foi registrada. Podemos seguir com um passo simples; esta confirmação ainda não é uma resposta personalizada.',attention:'A revisão indica que este pedido precisa de atenção adicional. Você pode continuar no seu ritmo; ainda não há uma resposta personalizada.',stale:'Esta revisão corresponde a uma versão anterior. Vamos revisar o dossiê atual antes de usá-la.',labels:['Continuar com uma pergunta','Revisar o salvamento','Revisar a comparação','Revisar a entrega']}
};
export function assistanceReviewPresentation(receipt,revision,locale='es'){
 if(!receipt?.review||!['reviewed','intervention_required','superseded'].includes(receipt.review.outcome))return null;
 const text=copy[locale]||copy.es;
 if(receipt.stale||receipt.revision!==revision||receipt.review.outcome==='superseded')return{message:text.stale,label:null,href:null};
 const index=['orientation','save','comparison','delivery'].indexOf(receipt.topic);if(index<0)return null;
 return{message:receipt.review.outcome==='reviewed'?text.reviewed:text.attention,label:text.labels[index],href:['#dossier-assistant','#dossier-save','#dossier-delivery','#dossier-delivery'][index]};
}
