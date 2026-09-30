import { and, desc, eq, sql } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../cloudflare-access-auth';
import { getDb } from '../../../db';
import { projectEvents, siteProjects } from '../../../db/schema';
import { completionForIntake, nextQuestion, normalizeIntake } from '../../../lib/intake.mjs';
import { buildRoadmap } from '../../../lib/methodology.mjs';
import { listOwnerProjects } from '../../../lib/project-directory.mjs';
import { changedDossierFields, reviewedDossierSources } from '../../../lib/dossier-field-history.mjs';
import { env } from 'cloudflare:workers';

function decodeList(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function digest(value: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
}

function present(project: typeof siteProjects.$inferSelect) {
  const intake = {
    organization: project.organization,
    website: project.website,
    role: project.role,
    siteType: project.siteType,
    control: project.control,
    audience: project.audience,
    goals: decodeList(project.goalsJson),
    languages: decodeList(project.languagesJson),
    cms: project.cms,
    hosting: project.hosting,
    notes: project.notes,
    maintainerName: project.maintainerName,
    maintainerEmail: project.maintainerEmail,
    dnsProvider: project.dnsProvider,
    contentSources: decodeList(project.contentSourcesJson),
    desiredCapabilities: decodeList(project.desiredCapabilitiesJson),
    authorizedResources: decodeList(project.authorizedResourcesJson),
    publicationPreference: project.publicationPreference,
    crawlerSearchPolicy: project.crawlerSearchPolicy,
    crawlerTrainingPolicy: project.crawlerTrainingPolicy,
    approverName: project.approverName,
    approverEmail: project.approverEmail,
    monitoringPreference: project.monitoringPreference,
  };
  const question = nextQuestion(intake);
  return {
    id: project.id,
    ...intake,
    status: project.status,
    completion: project.completion,
    nextQuestion: question?.prompt || null,
    roadmap: buildRoadmap(intake),
    updatedAt: project.updatedAt,
    revision: project.revision,
  };
}

export async function GET(request?: Request) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ error: 'Inicia sesion para abrir tu expediente.' }, { status: 401, headers: { 'cache-control': 'no-store' } });

  const search = request ? new URL(request.url).searchParams : new URLSearchParams();
  if (search.get('list') === '1') {
    if (search.has('project') || search.getAll('offset').length > 1) return Response.json({code:'invalid_directory_request'},{status:400,headers:{'cache-control':'no-store'}});
    const result = await listOwnerProjects(env.DB,user.userId,search.get('offset')??'0');
    return Response.json(result.status===200?{projects:result.projects,nextOffset:result.nextOffset}:{code:result.code},{status:result.status,headers:{'cache-control':'no-store'}});
  }
  const requestedId = search.get('project');
  const [project] = await getDb()
    .select()
    .from(siteProjects)
    .where(requestedId !== null
      ? and(eq(siteProjects.userId, user.userId), eq(siteProjects.id, requestedId))
      : eq(siteProjects.userId, user.userId))
    .orderBy(desc(siteProjects.updatedAt))
    .limit(1);

  if (requestedId !== null && !project) return Response.json({ code: 'project_unavailable' }, { status: 404, headers: { 'cache-control': 'no-store' } });
  return Response.json({ project: project ? present(project) : null }, { headers: { 'cache-control': 'no-store' } });
}

// Preserve the explicit creation contract already deployed on the private canary.
export async function POST(request: Request) {
  const headers = { 'cache-control': 'no-store' };
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ code: 'authentication_required' }, { status: 401, headers });
  let input: unknown;
  try { input = await request.json(); } catch {
    return Response.json({ code: 'invalid_json' }, { status: 400, headers });
  }
  if (!input || Array.isArray(input) || typeof input !== 'object') return Response.json({ code: 'invalid_json' }, { status: 400, headers });
  const raw = input as Record<string, unknown>;
  const allowed = ['contract', 'confirmCreate', 'idempotencyKey', 'website', 'organization'];
  if (Object.keys(raw).some(key => !allowed.includes(key))
    || raw.contract !== 'agentfriendly.project-create.v1' || raw.confirmCreate !== true
    || typeof raw.idempotencyKey !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(raw.idempotencyKey)
    || typeof raw.website !== 'string' || (raw.organization !== undefined && typeof raw.organization !== 'string')) {
    return Response.json({ error: 'Confirma la creacion con una clave de reintento valida, sitio y nombre.' }, { status: 400, headers });
  }
  const intake = normalizeIntake({ website: raw.website, organization: raw.organization || '' });
  if (!intake.website) return Response.json({ error: 'Indica el sitio web del nuevo expediente.' }, { status: 400, headers });
  const id = `project-${await digest(JSON.stringify(['project-create-v1', user.userId, raw.idempotencyKey]))}`;
  const eventId = `creation-${await digest(JSON.stringify(['project-create-receipt-v1', user.userId, raw.idempotencyKey]))}`;
  const requestHash = await digest(JSON.stringify([intake.website, intake.organization]));
  const now = new Date().toISOString();
  const completion = completionForIntake(intake);
  const db = getDb();
  try {
    const [inserted] = await db.batch([
      db.insert(siteProjects).values({ id, userId: user.userId, ownerEmail: user.email,
        website: intake.website, organization: intake.organization, completion,
        status: 'draft', createdAt: now, updatedAt: now,
      }).onConflictDoNothing().returning({ id: siteProjects.id }),
      db.insert(projectEvents).values({ id: eventId, projectId: id, userId: user.userId,
        type: 'project_created', payloadJson: JSON.stringify({ contract: raw.contract, requestHash, changedFields: changedDossierFields(null, intake), revision: 1 }), createdAt: now,
      }).onConflictDoNothing(),
    ]);
    const [receipt] = await db.select().from(projectEvents).where(and(eq(projectEvents.id, eventId), eq(projectEvents.userId, user.userId))).limit(1);
    if (!receipt || JSON.parse(receipt.payloadJson).requestHash !== requestHash) {
      return Response.json({ error: 'La clave de reintento corresponde a otra solicitud.' }, { status: 409, headers });
    }
    const [saved] = await db.select().from(siteProjects).where(and(eq(siteProjects.id, id), eq(siteProjects.userId, user.userId))).limit(1);
    if (!saved) throw new Error('Missing creation result');
    return Response.json({ project: present(saved), replayed: inserted.length === 0 }, { status: inserted.length ? 201 : 200, headers });
  } catch {
    return Response.json({ error: 'No se pudo confirmar la creacion. Reintenta con la misma clave.' }, { status: 503, headers });
  }
}

export async function PUT(request: Request) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ error: 'Inicia sesion para guardar tu expediente.' }, { status: 401 });

  let input: unknown;
  try { input = await request.json(); } catch {
    return Response.json({ code: 'invalid_json' }, { status: 400 });
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return Response.json({ code: 'invalid_json' }, { status: 400 });
  }
  const raw = input as Record<string, unknown>;
  if (raw.sourceHints !== undefined && (!raw.sourceHints || typeof raw.sourceHints !== 'object'
    || Array.isArray(raw.sourceHints) || JSON.stringify(raw.sourceHints).length > 8000)) {
    return Response.json({ code: 'invalid_source_hints' }, { status: 400, headers: { 'cache-control': 'no-store' } });
  }
  const expectedRevision = typeof raw.revision === 'number' ? raw.revision : 0;
  const intake = normalizeIntake(raw);
  if (!intake.website) return Response.json({ error: 'Indica el sitio web para guardar el expediente.' }, { status: 400 });

  const now = new Date().toISOString();
  const completion = completionForIntake(intake);
  const db = getDb();
  const requestedId = typeof raw.id === 'string' ? raw.id : '';
  const requestKey = request.headers.get('idempotency-key');
  if (requestKey !== null && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestKey)) {
    return Response.json({ code: 'invalid_idempotency_key' }, { status: 400, headers: { 'cache-control': 'no-store' } });
  }
  const eventId = requestKey ? await digest(JSON.stringify(['project-save-v1', user.userId, requestKey])) : crypto.randomUUID();
  const fingerprint = requestKey ? await digest(JSON.stringify({ intake, id: requestedId, revision: raw.revision ?? null,
    ...(raw.sourceHints !== undefined ? { sourceHints: raw.sourceHints } : {}) })) : null;
  const recoverReceipt = async () => {
    if (!requestKey) return null;
    const [receipt] = await db.select().from(projectEvents)
      .where(and(eq(projectEvents.id, eventId), eq(projectEvents.userId, user.userId))).limit(1);
    if (!receipt) return null;
    const metadata = JSON.parse(receipt.payloadJson);
    if (metadata.fingerprint !== fingerprint) {
      return Response.json({ code: 'idempotency_conflict', error: 'Este intento corresponde a otros datos. Conserva el borrador y revisa antes de guardar.' }, { status: 409, headers: { 'cache-control': 'no-store' } });
    }
    const [current] = await db.select().from(siteProjects)
      .where(and(eq(siteProjects.id, receipt.projectId), eq(siteProjects.userId, user.userId))).limit(1);
    if (current && current.revision === metadata.revision) {
      return Response.json({ project: present(current), replayed: true }, { headers: { 'cache-control': 'no-store' } });
    }
    return Response.json({ code: 'revision_conflict', appliedEarlier: true, project: current ? present(current) : null }, { status: 409, headers: { 'cache-control': 'no-store' } });
  };
  const recovered = await recoverReceipt();
  if (recovered) return recovered;
  const [existing] = await db
    .select()
    .from(siteProjects)
    .where(requestedId
      ? and(eq(siteProjects.id, requestedId), eq(siteProjects.userId, user.userId))
      : eq(siteProjects.userId, user.userId))
    .orderBy(desc(siteProjects.updatedAt))
    .limit(1);
  if (requestedId && !existing) {
    return Response.json({
      code: 'project_unavailable',
      error: 'No pudimos recuperar este expediente. Conserva tu borrador y vuelve a iniciar sesion con la cuenta original antes de reintentar.',
    }, { status: 404, headers: { 'cache-control': 'no-store' } });
  }
  if (!requestedId && existing) {
    // A concurrent initial retry may have committed after the first receipt lookup.
    const concurrentReceipt = await recoverReceipt();
    if (concurrentReceipt) return concurrentReceipt;
    return Response.json({ code: 'project_selection_required', error: 'Abre el expediente guardado antes de continuar. No se modificaron sus datos.' }, { status: 409, headers: { 'cache-control': 'no-store' } });
  }
  const id = existing?.id || crypto.randomUUID();
  if (existing && (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1)) {
    return Response.json({ code: 'revision_required', error: 'Actualiza la sesion del expediente antes de guardar. Conserva tu borrador.' }, { status: 428, headers: { 'cache-control': 'no-store' } });
  }

  const values = {
      id,
      userId: user.userId,
      ownerEmail: user.email,
      organization: intake.organization,
      website: intake.website,
      role: intake.role,
      siteType: intake.siteType,
      control: intake.control,
      audience: intake.audience,
      goalsJson: JSON.stringify(intake.goals),
      languagesJson: JSON.stringify(intake.languages),
      cms: intake.cms,
      hosting: intake.hosting,
      notes: intake.notes,
      maintainerName: intake.maintainerName,
      maintainerEmail: intake.maintainerEmail,
      dnsProvider: intake.dnsProvider,
      contentSourcesJson: JSON.stringify(intake.contentSources),
      desiredCapabilitiesJson: JSON.stringify(intake.desiredCapabilities),
      authorizedResourcesJson: JSON.stringify(intake.authorizedResources),
      publicationPreference: intake.publicationPreference,
      crawlerSearchPolicy: intake.crawlerSearchPolicy,
      crawlerTrainingPolicy: intake.crawlerTrainingPolicy,
      approverName: intake.approverName,
      approverEmail: intake.approverEmail,
      monitoringPreference: intake.monitoringPreference,
      status: completion === 100 ? 'ready_for_review' : 'draft',
      completion,
      createdAt: now,
      updatedAt: now,
      revision: 1,
    };

  const write = existing
    ? db.update(siteProjects).set({
        ownerEmail: user.email,
        organization: intake.organization,
        website: intake.website,
        role: intake.role,
        siteType: intake.siteType,
        control: intake.control,
        audience: intake.audience,
        goalsJson: JSON.stringify(intake.goals),
        languagesJson: JSON.stringify(intake.languages),
        cms: intake.cms,
        hosting: intake.hosting,
        notes: intake.notes,
        maintainerName: intake.maintainerName,
        maintainerEmail: intake.maintainerEmail,
        dnsProvider: intake.dnsProvider,
        contentSourcesJson: JSON.stringify(intake.contentSources),
        desiredCapabilitiesJson: JSON.stringify(intake.desiredCapabilities),
        authorizedResourcesJson: JSON.stringify(intake.authorizedResources),
        publicationPreference: intake.publicationPreference,
        crawlerSearchPolicy: intake.crawlerSearchPolicy,
        crawlerTrainingPolicy: intake.crawlerTrainingPolicy,
        approverName: intake.approverName,
        approverEmail: intake.approverEmail,
        monitoringPreference: intake.monitoringPreference,
        status: completion === 100 ? 'ready_for_review' : 'draft',
        completion,
        updatedAt: now,
        revision: expectedRevision + 1,
      }).where(and(eq(siteProjects.id, id), eq(siteProjects.userId, user.userId), eq(siteProjects.revision, expectedRevision))).returning()
    : db.insert(siteProjects).values(values).returning();

  const changedFields = changedDossierFields(existing ? present(existing) : null, intake);
  const sources = reviewedDossierSources(raw.sourceHints, intake, changedFields);
  // D1 batch is atomic. A lost revision race writes neither the project nor an event.
  const event = db.insert(projectEvents).select(sql`select
    ${eventId}, ${id}, ${user.userId},
    ${existing ? 'project_updated' : 'project_created'},
    ${JSON.stringify({ completion, changedFields, sources, revision: existing ? expectedRevision + 1 : 1, ...(requestKey ? { fingerprint } : {}) })}, ${now}
    where changes() > 0`);
  let saved: typeof siteProjects.$inferSelect | undefined;
  try {
    const [written] = await db.batch([write, event]);
    saved = written[0];
  } catch {
    const replay = await recoverReceipt().catch(() => null);
    if (replay) return replay;
    return Response.json({ code: 'project_save_failed', error: 'No pudimos confirmar el guardado. Conserva tu borrador y reintenta.' }, { status: 503, headers: { 'cache-control': 'no-store' } });
  }
  if (!saved) {
      const replay = await recoverReceipt();
      if (replay) return replay;
      const [current] = await db.select().from(siteProjects)
        .where(and(eq(siteProjects.id, id), eq(siteProjects.userId, user.userId))).limit(1);
      return Response.json({ code: 'revision_conflict', error: 'Hay una version mas reciente. Revisa los cambios antes de guardar.', project: current ? present(current) : null }, { status: 409, headers: { 'cache-control': 'no-store' } });
  }
  return Response.json({ project: present(saved) }, { headers: { 'cache-control': 'no-store' } });
}
