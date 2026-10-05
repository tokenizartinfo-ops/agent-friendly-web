const messages={
 unavailable:['Este ensayo está cerrado','La ventana de revisión no está habilitada en este momento. No hace falta volver a ingresar ni cambiar de cuenta por este mensaje.'],
 try_later:['Hagamos una pausa','Llegamos al límite de consultas de este ensayo. Esperá un minuto antes de volver a consultar. Tus decisiones guardadas se conservan.'],
 same_origin_required:['Abramos la revisión desde AFW','Esta solicitud no proviene del recorrido permitido. Volvé a la página de revisión de AFW antes de continuar.'],
 operator_identity_required:['Necesitamos comprobar el acceso','No pudimos validar un permiso vigente para esta revisión. Esto por sí solo no identifica una cuenta equivocada.'],
 temporarily_unavailable:['No pude comprobarlo ahora','Hubo un problema al consultar el servicio. No confirmamos un cambio desde esta respuesta. Podés volver a consultar más tarde.'],
 invalid_request:['Revisemos el enlace','Este enlace no tiene el formato esperado. Volvé a la página principal de revisión.']
};
/** Presentation only: preserve error status, admission controls and JSON API contracts. */
export async function reviewNavigationStatus(request,response){
 if(!['GET','POST'].includes(request.method)||request.headers.get('Sec-Fetch-Mode')!=='navigate'||request.headers.get('Sec-Fetch-Dest')!=='document'
  ||!request.headers.get('Accept')?.includes('text/html')||![400,401,403,404,429,503].includes(response.status)
  ||!response.headers.get('Content-Type')?.includes('application/json'))return response;
 let code;try{code=(await response.clone().json()).code;}catch{return response;}
 if(request.method==='POST'&&(response.status!==403||code!=='same_origin_required'))return response;
 const message=Object.hasOwn(messages,code)?messages[code]:null;if(!message)return response;
 const headers=new Headers(response.headers);headers.set('Content-Type','text/html; charset=utf-8');headers.set('Cache-Control','no-store');
 headers.set('Referrer-Policy','no-referrer');headers.set('X-Content-Type-Options','nosniff');headers.set('X-Robots-Tag','noindex, nofollow');
 const nonce=crypto.randomUUID().replaceAll('-','');headers.set('Content-Security-Policy',`default-src 'none'; style-src 'nonce-${nonce}'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`);
 return new Response(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${message[0]} · AFW</title><style nonce="${nonce}">body{font-family:"Comic Sans MS","Comic Neue",cursive;background:#fffaf0;color:#25211d;max-width:600px;margin:60px auto;padding:24px;line-height:1.6}main{border:2px solid;border-radius:16px;padding:24px;background:#fffdf8}a{color:inherit}h1{font-size:28px}</style></head><body><main><p>AGENT FRIENDLY WEB</p><p>Te acompaño en esta revisión</p><h1>${message[0]}</h1><p>${message[1]}</p><p><a href="/">Volver a consultar</a></p></main></body></html>`,{status:response.status,headers});
}
