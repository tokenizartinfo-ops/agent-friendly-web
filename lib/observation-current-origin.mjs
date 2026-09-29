export function observationOrigin(value){
 try{
  const raw=String(value||'').trim();
  if(!raw)return null;
  const url=new URL(/^https?:\/\//i.test(raw)?raw:`https://${raw}`);
  return ['http:','https:'].includes(url.protocol)&&url.hostname&&!url.username&&!url.password?url.origin:null;
 }catch{return null;}
}

/** Prevent an old site's observation from appearing under a changed dossier website. */
export function currentOriginObservations(observation,history,savedWebsite){
 const origin=observationOrigin(savedWebsite);
 if(!origin)return {observation:null,history:[]};
 return {observation:observation&&observationOrigin(observation.target)===origin?observation:null,
  history:Array.isArray(history)?history.filter(item=>observationOrigin(item.target)===origin):[]};
}
