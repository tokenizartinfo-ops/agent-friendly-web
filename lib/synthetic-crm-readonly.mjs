import { hashAccessSubject } from './access-subject-hash.mjs';
import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';

export const SYNTHETIC_CRM_READONLY_CONTRACT = 'agent-friendly-web.synthetic-crm-readonly.v1';

const CANARY_HOST = 'canary.agentfriendlyweb.dev';
const CANARY_PATH = '/api/canary/synthetic-crm-readonly';
const SYNTHETIC_DOMAIN = 'example.invalid';
const HASH = /^[0-9a-f]{64}$/;
const CODE = /^[a-z][a-z0-9_]{2,63}$/;
const noStore = { 'cache-control': 'no-store, private' };

function failure(code) {
  return { ok: false, code };
}

function json(body, status) {
  return Response.json(body, { status, headers: noStore });
}

function allowedSubjectHashes(value) {
  return new Set(
    String(value || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter((item) => HASH.test(item)),
  );
}

function validBoundary(request) {
  try {
    const url = new URL(request.url);
    return request.method === 'GET'
      && url.protocol === 'https:'
      && url.host.toLowerCase() === CANARY_HOST
      && url.pathname === CANARY_PATH
      && !url.search;
  } catch {
    return false;
  }
}

function isD1Database(database) {
  return Boolean(database && typeof database.prepare === 'function');
}

function parseCodeList(value) {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed) || parsed.length > 10) return null;
    if (!parsed.every((item) => typeof item === 'string' && CODE.test(item))) return null;
    return [...new Set(parsed)].sort();
  } catch {
    return null;
  }
}

function parseEvidenceList(value) {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed) || parsed.length > 10) return null;
    for (const item of parsed) {
      if (typeof item !== 'string' || item.length > 1000) return null;
      const url = new URL(item);
      if (url.protocol !== 'https:' || url.username || url.password) return null;
    }
    return [...new Set(parsed)].sort();
  } catch {
    return null;
  }
}

function normalizedDate(value, optional = false) {
  if (optional && value === '') return null;
  if (typeof value !== 'string' || value.length > 40) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function normalizeRow(row) {
  const scopeCodes = parseCodeList(row?.scopeCodesJson);
  const evidenceRefs = parseEvidenceList(row?.evidenceRefsJson);
  const createdAt = normalizedDate(row?.createdAt);
  const updatedAt = normalizedDate(row?.updatedAt);
  const transitionCreatedAt = normalizedDate(row?.transitionCreatedAt);
  const nextActionAt = normalizedDate(row?.nextActionAt, true);
  if (
    Number(row?.candidateCount) !== 1
    || row?.domain !== SYNTHETIC_DOMAIN
    || row?.segment !== 'other'
    || row?.problem !== 'discovery'
    || row?.source !== 'inbound_request'
    || !['es', 'en', 'pt'].includes(row?.locale)
    || row?.stage !== 'qualified'
    || row?.ownerContext !== 'owner_unverified'
    || row?.maintainerContext !== 'unknown'
    || row?.estimatedValueBand !== 'unknown'
    || row?.nextAction !== 'confirm_interest'
    || row?.fromStage !== 'new'
    || row?.toStage !== 'qualified'
    || !scopeCodes
    || !evidenceRefs
    || scopeCodes.join(',') !== 'discovery_pack,external_evidence'
    || evidenceRefs.length !== 0
    || createdAt === undefined
    || updatedAt === undefined
    || transitionCreatedAt === undefined
    || nextActionAt === undefined
  ) return null;

  return {
    contract: SYNTHETIC_CRM_READONLY_CONTRACT,
    status: 'synthetic_crm_readonly_ready',
    synthetic: true,
    opportunity: {
      domain: row.domain,
      segment: row.segment,
      problem: row.problem,
      source: row.source,
      locale: row.locale,
      stage: row.stage,
      ownerContext: row.ownerContext,
      maintainerContext: row.maintainerContext,
      scopeCodes,
      estimatedValueBand: row.estimatedValueBand,
      nextAction: row.nextAction,
      nextActionAt,
      evidenceRefs,
      createdAt,
      updatedAt,
    },
    timeline: [{
      fromStage: row.fromStage,
      toStage: row.toStage,
      createdAt: transitionCreatedAt,
    }],
    capabilities: {
      readsSyntheticOpportunity: true,
      persistsData: false,
      changesStage: false,
      sendsEmail: false,
      createsProposal: false,
      chargesPayment: false,
      modifiesCustomerSite: false,
    },
  };
}

export async function loadSyntheticCrmReadonlyBoard(database, actorHash) {
  if (!isD1Database(database)) return failure('synthetic_crm_readonly_store_unavailable');
  if (typeof actorHash !== 'string' || !HASH.test(actorHash)) {
    return failure('synthetic_crm_readonly_actor_invalid');
  }

  let row;
  try {
    row = await database
      .prepare(`SELECT o.domain, o.segment, o.problem, o.source, o.locale, o.stage,
          o.owner_context AS ownerContext, o.maintainer_context AS maintainerContext,
          o.scope_codes_json AS scopeCodesJson, o.estimated_value_band AS estimatedValueBand,
          o.next_action AS nextAction, o.next_action_at AS nextActionAt,
          o.evidence_refs_json AS evidenceRefsJson, o.created_at AS createdAt,
          o.updated_at AS updatedAt, e.from_stage AS fromStage, e.to_stage AS toStage,
          e.created_at AS transitionCreatedAt, COUNT(*) OVER () AS candidateCount
        FROM crm_opportunities AS o
        JOIN crm_transition_events AS e ON e.opportunity_id = o.id
        WHERE o.actor_subject_hash = ?
          AND e.actor_subject_hash = ?
          AND o.domain = ?
          AND o.id LIKE 'opp-synthetic-%'
        ORDER BY o.updated_at DESC
        LIMIT 1`)
      .bind(actorHash, actorHash, SYNTHETIC_DOMAIN)
      .first();
  } catch {
    return failure('synthetic_crm_readonly_store_unavailable');
  }
  if (!row) return failure('synthetic_crm_readonly_not_found');
  const value = normalizeRow(row);
  return value ? { ok: true, value } : failure('synthetic_crm_readonly_source_invalid');
}

export function createSyntheticCrmReadonlyHandler(overrides = {}) {
  const verifyAccessJwt = overrides.verifyAccessJwt || verifyCloudflareAccessJwt;
  const loadBoard = overrides.loadBoard || loadSyntheticCrmReadonlyBoard;

  return async function handleSyntheticCrmReadonly(request, env = {}) {
    if (env.AFW_SYNTHETIC_CRM_READONLY_ENABLED !== 'true') {
      return json(failure('synthetic_crm_readonly_unavailable'), 404);
    }
    if (!validBoundary(request)) return json(failure('synthetic_crm_readonly_boundary_rejected'), 403);
    if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
      return json(failure('synthetic_crm_readonly_misconfigured'), 503);
    }

    let access;
    try {
      access = await verifyAccessJwt({
        token: request.headers.get('cf-access-jwt-assertion') || '',
        teamDomain: env.ACCESS_TEAM_DOMAIN,
        audience: env.ACCESS_AUD,
      });
    } catch {
      return json(failure('synthetic_crm_readonly_identity_rejected'), 403);
    }
    if (!access?.ok || typeof access.identity?.userId !== 'string' || !access.identity.userId) {
      return json(failure('synthetic_crm_readonly_identity_rejected'), 403);
    }

    let actorHash;
    try {
      actorHash = await hashAccessSubject(access.identity.userId);
    } catch {
      return json(failure('synthetic_crm_readonly_identity_rejected'), 403);
    }
    const allowlist = allowedSubjectHashes(env.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES);
    if (allowlist.size === 0 || !isD1Database(env.DB)) {
      return json(failure('synthetic_crm_readonly_misconfigured'), 503);
    }
    if (!allowlist.has(actorHash)) {
      return json(failure('synthetic_crm_readonly_actor_not_allowed'), 403);
    }

    let result;
    try {
      result = await loadBoard(env.DB, actorHash);
    } catch {
      return json(failure('synthetic_crm_readonly_store_unavailable'), 503);
    }
    if (!result?.ok) {
      const status = result?.code === 'synthetic_crm_readonly_not_found' ? 404 : 503;
      return json(failure(result?.code || 'synthetic_crm_readonly_store_unavailable'), status);
    }
    return json(result.value, 200);
  };
}

export default createSyntheticCrmReadonlyHandler();
