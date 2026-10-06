import { resolveMailOperator } from './mail-operator-identity.mjs';
import { loadMailContent } from './mail-custody.mjs';
import { mailContentHash } from './mail-consumer.mjs';
import { mailReviewPage } from './mail-review-page.mjs';
import { brandPreview } from './mail-brand-package.mjs';
import { mailBrandWindowOpen } from './mail-brand-window.mjs';

const keyPattern=/^[A-Za-z0-9_-]{1,128}$/;
const json=(value,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'"}});
async function boundedBody(request) {
  const reader=request.body?.getReader(); if(!reader)throw Error('body');
  const parts=[];let size=0;
  for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>4096){await reader.cancel();throw Error('body');}parts.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length;}
  return JSON.parse(new TextDecoder().decode(bytes));
}
function validBody(body,fields) {
  return body && typeof body==='object' && !Array.isArray(body) && Object.keys(body).length===fields.length && Object.keys(body).every(k=>fields.includes(k)) && typeof body.key==='string' && keyPattern.test(body.key);
}

/** Private handler factory. Not wired to a deployed Worker or public AFW routes.
 * No send, content ingestion, cleanup or credential operation is exposed.
 */
export function createMailPrivateControls({db,config,keySet,now=Date.now}) {
  return async request=>{
    if(config?.enabled!==true || !mailBrandWindowOpen(config,now()))return json({code:'unavailable'},404);
    const url=new URL(request.url);
    const review=url.pathname.match(/^\/review\/([A-Za-z0-9_-]{1,128})$/);
    const page=url.pathname.match(/^\/message\/([A-Za-z0-9_-]{1,128})$/);
    const preview=url.pathname.match(/^\/preview\/([A-Za-z0-9_-]{1,128})$/);
    if(url.search || !((request.method==='GET'&&(review||page||preview))||(request.method==='POST'&&['/approve','/revoke'].includes(url.pathname))))return json({code:'unavailable'},404);
    const actor=await resolveMailOperator(request,config,{keySet});
    if(!actor.ok)return json({code:'identity_required'},401);
    if(!mailBrandWindowOpen(config,now()))return json({code:'unavailable'},404);
    if(page)return mailReviewPage(page[1]);
    if(request.method==='POST' && (request.headers.get('Origin')!==config.origin || !/^application\/json(?:;|$)/i.test(request.headers.get('Content-Type')||'') || (request.headers.has('Sec-Fetch-Site') && request.headers.get('Sec-Fetch-Site')!=='same-origin')))return json({code:'same_origin_required'},403);
    try {
      if(review||preview){
        const key=(review||preview)[1];
        const row=await db.prepare('SELECT state,content_hash FROM mail_outbox WHERE reply_key=?').bind(key).first();
        const stored=await db.prepare('SELECT content_json FROM mail_content WHERE reply_key=?').bind(key).first();
        if(!row || !stored)return json({code:'unavailable'},404);
        if(stored.content_json==='')return json({code:'content_retired'},410);
        const content=await loadMailContent(db,key);
        if(await mailContentHash(content)!==row.content_hash)return json({code:'unavailable'},404);
        if(!mailBrandWindowOpen(config,now()))return json({code:'unavailable'},404);
        if(preview)return content.brand?brandPreview(content.brand):json({code:'unavailable'},404);
        return json({key,content,contentHash:row.content_hash,state:row.state});
      }
      let body;try{body=await boundedBody(request);}catch{return json({code:'invalid_request'},400);}
      const approval=url.pathname==='/approve';
      if(!validBody(body,approval?['key','contentHash']:['key']) || (approval && (typeof body.contentHash!=='string' || !/^[a-f0-9]{64}$/.test(body.contentHash))))return json({code:'invalid_request'},400);
      const at=now();if(!Number.isSafeInteger(at)||at<0)throw Error('clock');
      if(!mailBrandWindowOpen(config,at))return json({code:'unavailable'},404);
      if(approval){
        const content=await loadMailContent(db,body.key);
        if(await mailContentHash(content)!==body.contentHash)return json({code:'version_changed'},409);
        if(!mailBrandWindowOpen(config,now()))return json({code:'unavailable'},404);
        const expiresAt=config.brandEnabled===true?Math.min(at+600000,Date.parse(config.brandExpiresAt)):at+600000;
        const decisionRef=crypto.randomUUID();
        const insert=db.prepare(`INSERT INTO mail_decisions(decision_ref,reply_key,content_hash,actor_ref,created_at,expires_at)
          SELECT ?,?,?,?, ?,? WHERE EXISTS(SELECT 1 FROM mail_outbox WHERE reply_key=? AND content_hash=? AND state='draft' AND updated_at<=?)`)
          .bind(decisionRef,body.key,body.contentHash,actor.actorRef,at,expiresAt,body.key,body.contentHash,at);
        const update=db.prepare(`UPDATE mail_outbox SET state='approved',decision_ref=?,updated_at=?
          WHERE reply_key=? AND content_hash=? AND state='draft' AND updated_at<=?
          AND EXISTS(SELECT 1 FROM mail_decisions WHERE decision_ref=?)`).bind(decisionRef,at,body.key,body.contentHash,at,decisionRef);
        const results=await db.batch([insert,update]);
        return results[1].meta.changes===1?json({approved:true,decisionRef},201):json({code:'state_changed'},409);
      }
      const revoke=db.prepare(`UPDATE mail_decisions SET revoked_at=? WHERE actor_ref=? AND revoked_at IS NULL AND created_at<=?
        AND decision_ref IN(SELECT decision_ref FROM mail_outbox WHERE reply_key=?)`).bind(at,actor.actorRef,at,body.key);
      const cancel=db.prepare(`UPDATE mail_outbox SET state='cancelled',updated_at=? WHERE reply_key=? AND state='approved' AND updated_at<=?
        AND EXISTS(SELECT 1 FROM mail_decisions d WHERE d.decision_ref=mail_outbox.decision_ref AND d.actor_ref=? AND d.revoked_at IS NOT NULL)`)
        .bind(at,body.key,at,actor.actorRef);
      const results=await db.batch([revoke,cancel]);
      return results[0].meta.changes===1?json({revoked:true,withdrawsSentMail:false}):json({code:'state_changed'},409);
    }catch{return json({code:'temporarily_unavailable'},503);}
  };
}
