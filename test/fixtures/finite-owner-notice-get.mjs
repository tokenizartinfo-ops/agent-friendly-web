// SYN negative corruption and factual observation only. No positive SQL producer.
export function extendFiniteOwnerNoticeGet(entry){
 const methods=`
 async noticeInspect(){
  const all=[...await this.ctx.storage.list()],capsule=JSON.parse(all.find(([k])=>k.endsWith(':capsule'))[1]),prefix='afw.finite-preparation-notice.v1:'+capsule.preconnectionId+':';
  const issuer=all.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:'+capsule.preconnectionId+':')&&k.endsWith(':reservation')),identity=issuer?JSON.parse(issuer[1]).identity:null;
  const schema=(await this.env.RELEASE_DB.withSession('first-primary').prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").all()).results;
  const tickets=identity?(await this.env.RELEASE_DB.withSession('first-primary').prepare('SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2').bind(identity.grantId).all()).results:[];
  const events=identity?(await this.env.RELEASE_DB.withSession('first-primary').prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3').bind(identity.grantId).all()).results:[];
  return {notice:all.filter(([k])=>k.startsWith(prefix)),schema,tickets,events};
 }
 async noticeCorrupt(kind){
  const all=[...await this.ctx.storage.list()],capsule=JSON.parse(all.find(([k])=>k.endsWith(':capsule'))[1]),prefix='afw.finite-preparation-notice.v1:'+capsule.preconnectionId+':';
  if(kind==='own-unknown')await this.ctx.storage.put(prefix+'unknown','SYN NEGATIVE unknown key');
  else if(kind==='foreign-unknown')await this.ctx.storage.put('afw.finite-preparation-notice.v1:'+'f'.repeat(64)+':unknown','SYN NEGATIVE foreign history');
  else throw Error('SYN unknown notice fault');
  await this.ctx.storage.sync();
 }
 `;
 if(entry.split(' export class Initial extends FiniteClosure{').length!==2)throw Error('SYN notice class marker');
 return entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
}
