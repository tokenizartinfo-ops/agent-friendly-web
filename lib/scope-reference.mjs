import {previewScanScope} from './scan-scope-transfer.mjs';

const TYPE='scope_reference_saved';
const latestSql='SELECT * FROM project_events WHERE project_id=? AND user_id=? AND type=? ORDER BY rowid DESC LIMIT 1';
const projectSql='SELECT website,revision FROM site_projects WHERE id=? AND user_id=?';
const fail=(status,code)=>({status,code});
async function digest(value){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('');}
function present(event,website){
 const payload=JSON.parse(event.payload_json);
 let websiteMatches=false;
 try{websiteMatches=previewScanScope(payload.scopeText,website).websiteMatches===true;}catch{/* A changed or invalid dossier address cannot confirm a reference. */}
 return {id:event.id,savedAt:event.created_at,scopeText:payload.scopeText,websiteMatches,requiresFreshReview:true,publicationAuthorized:false};
}

/** Owner-scoped, append-only reference. Existing permissions and project data are untouched. */
export async function readScopeReference(db,userId,projectId){
 const project=await db.prepare(projectSql).bind(projectId,userId).first();
 if(!project)return fail(404,'project_unavailable');
 const event=await db.prepare(latestSql).bind(projectId,userId,TYPE).first();
 return {status:200,reference:event?present(event,project.website):null};
}

export async function saveScopeReference(db,userId,projectId,raw){
 const project=await db.prepare(projectSql).bind(projectId,userId).first();
 if(!project)return fail(404,'project_unavailable');
 const fields=['contract','confirmSave','idempotencyKey','expectedProjectRevision','expectedReferenceId','scopeText'];
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||Object.keys(raw).length!==fields.length||fields.some(k=>!Object.hasOwn(raw,k))
  ||raw.contract!=='afw.scope-reference.v1'||raw.confirmSave!==true
  ||typeof raw.idempotencyKey!=='string'||!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(raw.idempotencyKey)
  ||!Number.isSafeInteger(raw.expectedProjectRevision)||raw.expectedProjectRevision<1
  ||!(raw.expectedReferenceId===null||(typeof raw.expectedReferenceId==='string'&&/^scope-[a-f0-9]{64}$/.test(raw.expectedReferenceId))))return fail(400,'invalid_scope_request');
 let scopeText;
 try{previewScanScope(raw.scopeText);scopeText=JSON.stringify(JSON.parse(raw.scopeText));}catch{return fail(400,'invalid_scope');}
 const id=`scope-${await digest(JSON.stringify([userId,projectId,raw.idempotencyKey]))}`;
 const fingerprint=await digest(JSON.stringify([scopeText,raw.expectedProjectRevision,raw.expectedReferenceId]));
 const receiptSql='SELECT * FROM project_events WHERE id=? AND project_id=? AND user_id=? AND type=?';
 const recover=async()=>{
  const receipt=await db.prepare(receiptSql).bind(id,projectId,userId,TYPE).first();
  if(!receipt)return null;
  if(JSON.parse(receipt.payload_json).fingerprint!==fingerprint)return fail(409,'idempotency_conflict');
  const current=await db.prepare(latestSql).bind(projectId,userId,TYPE).first();
  if(current?.id!==id)return fail(409,'reference_changed');
  return {status:200,reference:present(receipt,project.website)};
 };
 const prior=await recover();if(prior)return prior;
 try{if(previewScanScope(scopeText,project.website).websiteMatches!==true)return fail(400,'website_mismatch');}catch{return fail(400,'website_mismatch');}
 const now=new Date().toISOString();
 // One SQLite statement checks both the saved dossier and the latest reference.
 // rowid orders append-only events even when two writes share a millisecond.
 await db.prepare(`INSERT INTO project_events (id,project_id,user_id,type,payload_json,created_at)
 SELECT ?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM site_projects WHERE id=? AND user_id=? AND revision=? AND website=?)
 AND COALESCE((SELECT id FROM project_events WHERE project_id=? AND user_id=? AND type=? ORDER BY rowid DESC LIMIT 1),'')=?
 ON CONFLICT(id) DO NOTHING`).bind(id,projectId,userId,TYPE,JSON.stringify({scopeText,fingerprint}),now,
 projectId,userId,raw.expectedProjectRevision,project.website,projectId,userId,TYPE,raw.expectedReferenceId??'').run();
 return (await recover())??fail(409,'reference_changed');
}
