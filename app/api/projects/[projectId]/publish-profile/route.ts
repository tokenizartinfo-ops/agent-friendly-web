import { and, desc, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../cloudflare-access-auth';
import { getDb } from '../../../../../db';
import {
  domainClaims,
  ownerAttestations,
  projectEvents,
  publicProfiles,
  registrySites,
  scanObservations,
  siteProjects,
} from '../../../../../db/schema';
import { domainClaimStatusAt, VERIFIED_TTL_MS } from '../../../../../lib/domain-verification.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { publicAttestationDraft } from '../../../../../lib/intake.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { buildPublicProfile, renderPublicProfileMarkdown } from '../../../../../lib/public-profile.mjs';

type RouteContext = { params: Promise<{ projectId: string }> };

const OWNER_ATTESTATION_CONTRACT = 'agentfriendly.owner-attestation.v1';

function decodeList(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function decodeObject(value: string) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function normalizeExpectedDomain(value: unknown) {
  return String(value || '').trim().toLowerCase().replace(/\.$/, '');
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'site';
}

function observedResources(origin: string, raw: string, checkedAt: string) {
  try {
    const probes = JSON.parse(raw);
    if (!Array.isArray(probes)) return [];
    return probes
      .filter((probe) => probe && probe.detected === true && typeof probe.path === 'string')
      .slice(0, 30)
      .map((probe) => ({
        type: String(probe.id || probe.path).slice(0, 80),
        url: new URL(probe.path, origin).toString(),
        state: 'observed',
        observedAt: checkedAt,
      }));
  } catch {
    return [];
  }
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ error: 'Inicia sesion para publicar el perfil.' }, { status: 401 });

  const body = await request.json() as Record<string, unknown>;
  if (body.contract !== OWNER_ATTESTATION_CONTRACT) {
    return Response.json({ error: 'El contrato de aprobacion no es valido.' }, { status: 400 });
  }
  if (body.confirmPublicProjection !== true) {
    return Response.json({ error: 'Debes confirmar expresamente la proyeccion publica.' }, { status: 400 });
  }

  const { projectId } = await context.params;
  const db = getDb();
  const [project] = await db
    .select()
    .from(siteProjects)
    .where(and(eq(siteProjects.id, projectId), eq(siteProjects.userId, user.userId)))
    .limit(1);
  if (!project) return Response.json({ error: 'No se encontro el expediente.' }, { status: 404 });

  const [site] = await db
    .select()
    .from(registrySites)
    .where(and(eq(registrySites.projectId, projectId), eq(registrySites.userId, user.userId)))
    .limit(1);
  if (!site) return Response.json({ error: 'Primero debes iniciar y completar la verificacion del dominio.' }, { status: 409 });

  const expectedDomain = normalizeExpectedDomain(body.expectedDomain);
  if (!expectedDomain || expectedDomain !== site.hostname) {
    return Response.json({ error: 'El dominio confirmado no coincide con el dominio verificado.' }, { status: 409 });
  }
  if (site.verificationStatus !== 'verified') {
    return Response.json({ error: 'El dominio aun no tiene una verificacion vigente.' }, { status: 409 });
  }

  const [claim] = await db
    .select()
    .from(domainClaims)
    .where(and(
      eq(domainClaims.siteId, site.id),
      eq(domainClaims.projectId, projectId),
      eq(domainClaims.userId, user.userId),
      eq(domainClaims.status, 'verified'),
    ))
    .orderBy(desc(domainClaims.verifiedAt))
    .limit(1);
  if (!claim || domainClaimStatusAt(claim) !== 'verified') {
    return Response.json({ error: 'La verificacion del dominio vencio. Debes renovarla antes de publicar.' }, { status: 409 });
  }

  const [lastProfile] = await db
    .select()
    .from(publicProfiles)
    .where(eq(publicProfiles.siteId, site.id))
    .orderBy(desc(publicProfiles.version))
    .limit(1);
  const version = (lastProfile?.version || 0) + 1;
  const baseSlug = slugify(site.hostname.replace(/^www\./, '') || project.organization);
  const [slugOwner] = await db
    .select()
    .from(publicProfiles)
    .where(eq(publicProfiles.slug, baseSlug))
    .limit(1);
  const slug = lastProfile?.slug || (slugOwner && slugOwner.siteId !== site.id
    ? `${baseSlug}-${site.id.slice(0, 8)}`
    : baseSlug);

  const [observation] = await db
    .select()
    .from(scanObservations)
    .where(and(
      eq(scanObservations.siteId, site.id),
      eq(scanObservations.projectId, projectId),
      eq(scanObservations.userId, user.userId),
    ))
    .orderBy(desc(scanObservations.checkedAt))
    .limit(1);

  const intake = {
    organization: project.organization,
    website: project.website,
    siteType: project.siteType,
    audience: project.audience,
    languages: decodeList(project.languagesJson),
    goals: decodeList(project.goalsJson),
    contentSources: decodeList(project.contentSourcesJson),
    desiredCapabilities: decodeList(project.desiredCapabilitiesJson),
    authorizedResources: decodeList(project.authorizedResourcesJson),
    crawlerSearchPolicy: project.crawlerSearchPolicy,
    crawlerTrainingPolicy: project.crawlerTrainingPolicy,
  };
  const publicDraft = publicAttestationDraft(intake);
  const readiness = observation ? decodeObject(observation.readinessJson) : {};
  const now = new Date().toISOString();
  const canonicalBase = 'https://agentfriendlyweb.dev';
  const profile = buildPublicProfile({
    slug,
    version,
    publishedAt: now,
    canonicalUrl: `${canonicalBase}/registry/${slug}`,
    organization: publicDraft.organization,
    canonicalOrigin: site.canonicalOrigin,
    siteType: publicDraft.siteType,
    sectors: publicDraft.siteType ? [publicDraft.siteType] : [],
    audiences: publicDraft.audience ? [publicDraft.audience] : [],
    languages: publicDraft.languages,
    publicSources: [{
      title: 'Sitio principal declarado por el owner',
      url: site.canonicalOrigin,
      state: 'owner_declared',
      observedAt: now,
    }],
    declaredCapabilities: publicDraft.desiredCapabilities,
    observedResources: observation
      ? observedResources(site.canonicalOrigin, observation.probesJson, observation.checkedAt)
      : [],
    verification: {
      status: 'verified',
      hostname: site.hostname,
      method: claim.method,
      verifiedAt: claim.verifiedAt,
      verifiedUntil: new Date(Date.parse(claim.verifiedAt) + VERIFIED_TTL_MS).toISOString(),
    },
    readiness: {
      level: typeof readiness.level === 'string' ? readiness.level : 'Not assessed',
      score: typeof readiness.score === 'number' ? readiness.score : null,
      state: observation ? 'observed' : 'not_observed',
      observedAt: observation?.checkedAt || '',
    },
    historyUrl: `${canonicalBase}/registry/${slug}#history`,
    limits: [
      'La verificacion acredita control temporal del dominio; no certifica calidad comercial ni tecnica.',
      'El perfil no garantiza indexacion, posicionamiento o recomendacion por modelos de IA.',
      'Las capacidades declaradas por el owner no se consideran observadas hasta contar con evidencia publica.',
    ],
  });
  const markdown = renderPublicProfileMarkdown(profile);
  const attestationId = crypto.randomUUID();
  const profileId = crypto.randomUUID();

  await db.batch([
    db.insert(ownerAttestations).values({
      id: attestationId,
      siteId: site.id,
      projectId,
      userId: user.userId,
      version,
      publicJson: JSON.stringify(publicDraft),
      status: 'approved',
      approvedAt: now,
      revokedAt: '',
      createdAt: now,
    }),
    db.update(publicProfiles).set({ status: 'superseded' }).where(and(
      eq(publicProfiles.siteId, site.id),
      eq(publicProfiles.status, 'published'),
    )),
    db.insert(publicProfiles).values({
      id: profileId,
      siteId: site.id,
      slug,
      version,
      contractVersion: profile.contract,
      profileJson: JSON.stringify(profile),
      markdown,
      status: 'published',
      sourceAttestationId: attestationId,
      publishedAt: now,
      createdAt: now,
    }),
    db.update(registrySites).set({ visibility: 'public', updatedAt: now }).where(and(
      eq(registrySites.id, site.id),
      eq(registrySites.userId, user.userId),
    )),
    db.insert(projectEvents).values({
      id: crypto.randomUUID(),
      projectId,
      userId: user.userId,
      type: 'public_profile_published',
      payloadJson: JSON.stringify({ profileId, attestationId, slug, version }),
      createdAt: now,
    }),
  ]);

  return Response.json(
    { profile, markdownUrl: `${canonicalBase}/registry/${slug}/profile.md`, jsonUrl: `${canonicalBase}/registry/${slug}/profile.json` },
    { status: 201, headers: { 'cache-control': 'no-store' } },
  );
}
