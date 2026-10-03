const GRANTS_SQL='SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants';
const CONSENTS_SQL='SELECT handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions';

/** Compile authorization storage dependencies without reading a grant or consent. */
export function delegatedAuthorizationSchemaPreflightSql() {
  return [GRANTS_SQL,CONSENTS_SQL].map(sql=>`${sql} LIMIT 0;`).join('\n');
}

function scopes(value) {
  try { const result=JSON.parse(value);return Array.isArray(result)&&result.every(x=>typeof x==='string')?result:[]; }
  catch { return []; }
}
function presentGrant(row) {
  return row ? {grantId:row.id,subject:row.user_id,clientId:row.client_id,projectId:row.project_id,
    resource:row.resource,scopes:scopes(row.scopes_json),createdAt:row.created_at,expiresAt:row.expires_at,
    revokedAt:row.revoked_at,status:row.revoked_at?'revoked':'active'} : null;
}
function presentConsent(row) {
  return row ? {subject:row.user_id,kind:row.kind,projectId:row.project_id,clientId:row.client_id,
    resource:row.resource,scopes:scopes(row.scopes_json),expiresAt:row.expires_at} : null;
}

/** D1 store: hashes/context only, never bearer tokens, cookie values or identity assertions. */
export function createDelegatedOAuthStore(db) {
  return {
    async createGrant(g) {
      await db.prepare(`INSERT INTO delegated_access_grants
        (id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at)
        VALUES (?,?,?,?,?,?,?,?, '')`).bind(g.grantId,g.subject,g.clientId,g.projectId,g.resource,JSON.stringify(g.scopes),g.createdAt,g.expiresAt).run();
    },
    async getGrant(id) {
      return presentGrant(await db.prepare(`${GRANTS_SQL} WHERE id=? LIMIT 1`).bind(id).first());
    },
    async consumeExchange(id,subject,clientId,resource,now) {
      return presentGrant(await db.prepare("UPDATE delegated_access_grants SET exchanged_at=? WHERE id=? AND user_id=? AND client_id=? AND resource=? AND revoked_at='' AND exchanged_at='' AND expires_at>? RETURNING *")
        .bind(now,id,subject,clientId,resource,now).first());
    },
    async listGrants(subject) {
      const result=await db.prepare(`${GRANTS_SQL} WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 20`).bind(subject).all();
      return (result.results??[]).map(presentGrant);
    },
    async revokeGrant(id,subject,now) {
      await db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id=? AND user_id=? AND revoked_at=''").bind(now,id,subject).run();
    },
    async createConsent(c) {
      await db.prepare(`INSERT INTO delegated_consent_sessions
        (handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at)
        VALUES (?,?,?,?,?,?,?,?, '')`).bind(c.handleHash,c.subject,c.kind,c.projectId,c.clientId,c.resource,JSON.stringify(c.scopes),c.expiresAt).run();
    },
    async getConsent(hash,subject,kind,now) {
      return presentConsent(await db.prepare(`${CONSENTS_SQL} WHERE handle_hash=? AND user_id=? AND kind=? AND consumed_at='' AND expires_at>? LIMIT 1`).bind(hash,subject,kind,now).first());
    },
    async consumeConsent(hash,subject,kind,now) {
      return presentConsent(await db.prepare("UPDATE delegated_consent_sessions SET consumed_at=? WHERE handle_hash=? AND user_id=? AND kind=? AND consumed_at='' AND expires_at>? RETURNING *").bind(now,hash,subject,kind,now).first());
    },
  };
}
