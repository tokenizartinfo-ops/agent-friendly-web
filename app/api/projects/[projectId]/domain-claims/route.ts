import { and, desc, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../cloudflare-access-auth';
import { getDb } from '../../../../../db';
import {
  domainClaims,
  projectEvents,
  registrySites,
  siteProjects,
} from '../../../../../db/schema';
import {
  createDomainChallenge,
  domainClaimStatusAt,
  VERIFIED_TTL_MS,
} from '../../../../../lib/domain-verification.mjs';
import { normalizePublicUrl } from '../../../../../lib/methodology.mjs';

type RouteContext = { params: Promise<{ projectId: string }> };
type VerificationMethod = 'dns_txt' | 'http_file';

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function effectiveStatus(claim: typeof domainClaims.$inferSelect, now = Date.now()) {
  return domainClaimStatusAt(claim, now);
}

function presentClaim(
  claim: typeof domainClaims.$inferSelect,
  site: typeof registrySites.$inferSelect,
) {
  const verifiedUntil = claim.verifiedAt
    ? new Date(Date.parse(claim.verifiedAt) + VERIFIED_TTL_MS).toISOString()
    : '';
  return {
    id: claim.id,
    projectId: claim.projectId,
    hostname: site.hostname,
    canonicalOrigin: site.canonicalOrigin,
    method: claim.method,
    challengeName: claim.challengeName,
    challengeValue: claim.challengeValue,
    challengeUrl:
      claim.method === 'http_file'
        ? new URL(claim.challengeName, site.canonicalOrigin).toString()
        : '',
    recordType: claim.method === 'dns_txt' ? 'TXT' : '',
    status: effectiveStatus(claim),
    expiresAt: claim.expiresAt,
    verifiedAt: claim.verifiedAt,
    verifiedUntil,
    attemptCount: claim.attemptCount,
    lastAttemptAt: claim.lastAttemptAt,
    createdAt: claim.createdAt,
    notice:
      'Esta verificacion acredita control temporal del dominio. No concede acceso de escritura ni publica el perfil automaticamente.',
  };
}

async function getOwnedProject(projectId: string, userId: string) {
  const [project] = await getDb()
    .select()
    .from(siteProjects)
    .where(and(eq(siteProjects.id, projectId), eq(siteProjects.userId, userId)))
    .limit(1);
  return project || null;
}

export async function GET(_request: Request, context: RouteContext) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ error: 'Inicia sesion para consultar la verificacion.' }, { status: 401 });

  const { projectId } = await context.params;
  const project = await getOwnedProject(projectId, user.userId);
  if (!project) return Response.json({ error: 'No se encontro el expediente.' }, { status: 404 });

  const db = getDb();
  const [claim] = await db
    .select()
    .from(domainClaims)
    .where(and(eq(domainClaims.projectId, projectId), eq(domainClaims.userId, user.userId)))
    .orderBy(desc(domainClaims.createdAt))
    .limit(1);
  if (!claim) {
    return Response.json({ claim: null }, { headers: { 'cache-control': 'no-store' } });
  }

  const [site] = await db
    .select()
    .from(registrySites)
    .where(and(eq(registrySites.id, claim.siteId), eq(registrySites.userId, user.userId)))
    .limit(1);
  if (!site) return Response.json({ error: 'La verificacion no tiene un sitio valido.' }, { status: 409 });

  return Response.json(
    { claim: presentClaim(claim, site) },
    { headers: { 'cache-control': 'no-store' } },
  );
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ error: 'Inicia sesion para verificar tu dominio.' }, { status: 401 });

  const { projectId } = await context.params;
  const project = await getOwnedProject(projectId, user.userId);
  if (!project) return Response.json({ error: 'No se encontro el expediente.' }, { status: 404 });

  let body: { method?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'El cuerpo de la solicitud no es valido.' }, { status: 400 });
  }
  if (body.method !== 'dns_txt' && body.method !== 'http_file') {
    return Response.json({ error: 'Elige verificacion DNS TXT o archivo HTTP.' }, { status: 400 });
  }
  const method: VerificationMethod = body.method;

  let publicUrl: URL;
  try {
    publicUrl = new URL(normalizePublicUrl(project.website));
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'El sitio guardado no es valido.' },
      { status: 400 },
    );
  }

  const db = getDb();
  const [hostnameOwner] = await db
    .select()
    .from(registrySites)
    .where(eq(registrySites.hostname, publicUrl.hostname))
    .limit(1);
  if (hostnameOwner && hostnameOwner.projectId !== projectId) {
    return Response.json(
      { error: 'Ese dominio ya pertenece a otro expediente del Registry.' },
      { status: 409 },
    );
  }

  const [existingSite] = await db
    .select()
    .from(registrySites)
    .where(and(eq(registrySites.projectId, projectId), eq(registrySites.userId, user.userId)))
    .limit(1);
  const now = new Date().toISOString();
  const siteId = existingSite?.id || crypto.randomUUID();
  const draft = createDomainChallenge({
    hostname: publicUrl.hostname,
    method,
    token: randomToken(),
    now,
  });
  const claim = {
    id: crypto.randomUUID(),
    siteId,
    projectId,
    userId: user.userId,
    method,
    challengeName: draft.challengeName,
    challengeValue: draft.challengeValue,
    status: 'pending',
    expiresAt: draft.expiresAt,
    verifiedAt: '',
    consumedAt: '',
    lastAttemptAt: '',
    attemptCount: 0,
    createdAt: now,
  };

  const supersedePending = db
    .update(domainClaims)
    .set({ status: 'superseded' })
    .where(and(
      eq(domainClaims.projectId, projectId),
      eq(domainClaims.userId, user.userId),
      eq(domainClaims.status, 'pending'),
    ));
  const siteWrite = existingSite
    ? db.update(registrySites).set({
        hostname: publicUrl.hostname,
        canonicalOrigin: publicUrl.origin,
        verificationStatus: 'pending',
        updatedAt: now,
      }).where(and(
        eq(registrySites.id, siteId),
        eq(registrySites.userId, user.userId),
      ))
    : db.insert(registrySites).values({
        id: siteId,
        projectId,
        userId: user.userId,
        hostname: publicUrl.hostname,
        canonicalOrigin: publicUrl.origin,
        verificationStatus: 'pending',
        visibility: 'private',
        createdAt: now,
        updatedAt: now,
      });

  await db.batch([
    supersedePending,
    siteWrite,
    db.insert(domainClaims).values(claim),
    db.insert(projectEvents).values({
      id: crypto.randomUUID(),
      projectId,
      userId: user.userId,
      type: 'domain_claim_created',
      payloadJson: JSON.stringify({ method, status: 'pending' }),
      createdAt: now,
    }),
  ]);

  const site = {
    id: siteId,
    projectId,
    userId: user.userId,
    hostname: publicUrl.hostname,
    canonicalOrigin: publicUrl.origin,
    verificationStatus: 'pending',
    visibility: existingSite?.visibility || 'private',
    createdAt: existingSite?.createdAt || now,
    updatedAt: now,
  };
  return Response.json(
    { claim: presentClaim(claim, site) },
    { status: 201, headers: { 'cache-control': 'no-store' } },
  );
}
