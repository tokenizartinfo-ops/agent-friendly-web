const PAGE_SIZE=20;
const MAX_OFFSET=10000;
const SQL=`SELECT id,organization,website,status,completion,updated_at FROM site_projects
 WHERE user_id=? ORDER BY updated_at DESC,id DESC LIMIT ? OFFSET ?`;

/** Private, owner-scoped summaries. Never return intake notes, contacts or claims. */
export async function listOwnerProjects(db,userId,rawOffset='0'){
 if(typeof userId!=='string'||!userId)return {status:401,code:'authentication_required'};
 if(typeof rawOffset!=='string'||!/^(0|[1-9][0-9]*)$/.test(rawOffset))return {status:400,code:'invalid_offset'};
 const offset=Number(rawOffset);
 if(!Number.isSafeInteger(offset)||offset>MAX_OFFSET)return {status:400,code:'invalid_offset'};
 const result=await db.prepare(SQL).bind(userId,PAGE_SIZE+1,offset).all();
 const rows=result.results||[];
 return {status:200,projects:rows.slice(0,PAGE_SIZE).map(row=>({
  id:row.id,organization:row.organization,website:row.website,status:row.status,
  completion:row.completion,updatedAt:row.updated_at,
 })),nextOffset:rows.length>PAGE_SIZE?offset+PAGE_SIZE:null};
}
