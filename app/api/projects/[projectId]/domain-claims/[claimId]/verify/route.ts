import { and, eq } from 'drizzle-orm';
import { getChatGPTUser } from '../../../../../../chatgpt-auth';
import { getDb } from '../../../../../../../db';
import {
  domainClaims,
  projectEvents,
  registrySites,
  siteProjects,
} from '../../../../../../../db/schema';
import { evaluateDomainChallenge } from '../../../../../../../lib/domain-verification.mjs';
import {
  fetchLimitedPublicUrl,
  resolvePublicTxt,
} from '../../../../../../../lib/public-network.mjs';

type RouteContext = { params: Promise<{ projectId: string; claimId: string }> };

const ATTEMPT_INTERVAL_MS = 10_000;
const MAX_ATTEMPTS = 10;

function tokenFromStoredClaim(claim: typeof domainClaims.$inferSelect) {
  if (claim.method === 'dns_txt') {
    const prefix = 'agentfriendly-domain-verification=';
    return claim.challengeValue.startsWith(prefix) ? claim.challengeValue.slice(prefix.length) : '';
  }
  try {
    const value = JSON.parse(claim.challengeValue) as { token?: unknown };
    return typeof value.token === 'string' ? value.token : '';
  } catch {
    return '';
  }
}

export async function POST(_request: Request, context: RouteContext) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para comprobar el dominio.' }, { status: 401 });

  const { projectId, claimId } = await context.params;
  const db = getDb();
  const [project] = await db
    .select()
    .from(siteProjects)
    .where(and(eq(siteProjects.id, projectId), eq(siteProjects.userId, user.userId)))
    .limit(1);
  if (!project) return Response.json({ error: 'No se encontro el expediente.' }, { status: 404 });

  const [claim] = await db
    .select()
    .from(domainClaims)
    .where(and(
      eq(domainClaims.id, claimId),
      eq(domainClaims.projectId, projectId),
      eq(domainClaims.userId, user.userId),
    ))
    .limit(1);
  if (!claim) return Response.json({ error: 'No se encontro la verificacion.' }, { status: 404 });

  const [site] = await db
    .select()
    .from(registrySites)
    .where(and(
      eq(registrySites.id, claim.siteId),
      eq(registrySites.projectId, projectId),
      eq(registrySites.userId, user.userId),
    ))
    .limit(1);
  if (!site) return Response.json({ error: 'La verificacion no tiene un sitio valido.' }, { status: 409 });

  if (claim.status !== 'pending' || claim.consumedAt) {
    return Response.json({ error: 'Esta verificacion ya no esta pendiente.' }, { status: 409 });
  }
  if (claim.attemptCount >= MAX_ATTEMPTS) {
    return Response.json(
      { error: 'Se alcanzo el maximo de comprobaciones. Crea una verificacion nueva.' },
      { status: 429 },
    );
  }

  const nowMs = Date.now();
  if (claim.lastAttemptAt && nowMs - Date.parse(claim.lastAttemptAt) < ATTEMPT_INTERVAL_MS) {
    return Response.json(
      { error: 'Espera unos segundos antes de volver a comprobar.', retryAfterSeconds: 10 },
      { status: 429, headers: { 'retry-after': '10' } },
    );
  }

  const now = new Date(nowMs).toISOString();
  let dnsAnswers: string[] = [];
  let httpBody = '';
  let readError = false;
  let observedHttpStatus = 0;
  const claimExpired = nowMs >= Date.parse(claim.expiresAt);
  if (!claimExpired) {
    try {
      if (claim.method === 'dns_txt') {
        dnsAnswers = await resolvePublicTxt(claim.challengeName);
      } else if (claim.method === 'http_file') {
        const response = await fetchLimitedPublicUrl(
          new URL(claim.challengeName, site.canonicalOrigin),
          {
            accept: 'application/json,text/plain;q=0.9,*/*;q=0.1',
            userAgent: 'AgentFriendlyWebVerifier/1.0',
          },
        );
        observedHttpStatus = response.status;
        if (response.status >= 200 && response.status < 300) httpBody = response.body;
      } else {
        readError = true;
      }
    } catch {
      readError = true;
    }
  }

  const token = tokenFromStoredClaim(claim);
  const evaluation = token
    ? evaluateDomainChallenge({
        claim: {
          ...claim,
          hostname: site.hostname,
          token,
        },
        dnsAnswers,
        httpBody,
        now,
      })
    : {
        verified: false,
        nextStatus: 'failed',
        reason: 'stored_challenge_invalid',
        checkedAt: now,
      };
  const attemptCount = claim.attemptCount + 1;
  const status = evaluation.verified
    ? 'verified'
    : evaluation.nextStatus === 'expired'
      ? 'expired'
      : attemptCount >= MAX_ATTEMPTS || evaluation.nextStatus === 'failed'
        ? 'failed'
        : 'pending';
  const reason = readError ? 'verification_read_failed' : evaluation.reason;
  const eventType = evaluation.verified ? 'domain_claim_verified' : 'domain_claim_failed';

  await db.batch([
    db.update(domainClaims).set({
      status,
      attemptCount,
      lastAttemptAt: now,
      verifiedAt: evaluation.verified ? now : claim.verifiedAt,
      consumedAt: evaluation.verified ? now : claim.consumedAt,
    }).where(and(
      eq(domainClaims.id, claimId),
      eq(domainClaims.projectId, projectId),
      eq(domainClaims.userId, user.userId),
      eq(domainClaims.status, 'pending'),
    )),
    db.update(registrySites).set({
      verificationStatus: evaluation.verified ? 'verified' : status,
      updatedAt: now,
    }).where(and(
      eq(registrySites.id, site.id),
      eq(registrySites.projectId, projectId),
      eq(registrySites.userId, user.userId),
    )),
    db.insert(projectEvents).values({
      id: crypto.randomUUID(),
      projectId,
      userId: user.userId,
      type: eventType,
      payloadJson: JSON.stringify({
        claimId,
        method: claim.method,
        status,
        reason,
        attemptCount,
        observedHttpStatus,
      }),
      createdAt: now,
    }),
  ]);

  const response = {
    verified: evaluation.verified,
    status,
    reason,
    attemptCount,
    verifiedAt: evaluation.verified ? now : '',
    verifiedUntil: evaluation.verified ? evaluation.verifiedUntil : '',
    notice:
      'La comprobacion solo acredita control temporal del dominio. No concede escritura ni publica el perfil.',
  };
  if (evaluation.verified) {
    return Response.json(response, { headers: { 'cache-control': 'no-store' } });
  }
  return Response.json(response, {
    status: readError ? 502 : status === 'expired' ? 410 : 422,
    headers: { 'cache-control': 'no-store' },
  });
}
