import { and, desc, eq } from 'drizzle-orm';
import { getChatGPTUser } from '../../chatgpt-auth';
import { getDb } from '../../../db';
import { projectEvents, siteProjects } from '../../../db/schema';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { completionForIntake, nextQuestion, normalizeIntake } from '../../../lib/intake.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { buildRoadmap } from '../../../lib/methodology.mjs';

function decodeList(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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
  const question = nextQuestion(intake, { stage: 'basic' });
  return {
    id: project.id,
    ...intake,
    status: project.status,
    completion: project.completion,
    nextQuestion: question?.prompt || null,
    roadmap: buildRoadmap(intake),
    updatedAt: project.updatedAt,
  };
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para abrir tu expediente.' }, { status: 401 });

  const [project] = await getDb()
    .select()
    .from(siteProjects)
    .where(eq(siteProjects.userId, user.userId))
    .orderBy(desc(siteProjects.updatedAt))
    .limit(1);

  return Response.json({ project: project ? present(project) : null }, { headers: { 'cache-control': 'no-store' } });
}

export async function PUT(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para guardar tu expediente.' }, { status: 401 });

  const raw = await request.json();
  const intake = normalizeIntake(raw);
  if (!intake.website) return Response.json({ error: 'Indica el sitio web para guardar el expediente.' }, { status: 400 });

  const now = new Date().toISOString();
  // Completion stays on the basic stage until the expanded controls ship in Task 4.
  const completion = completionForIntake(intake, { stage: 'basic' });
  const db = getDb();
  const requestedId = typeof raw.id === 'string' ? raw.id : '';
  const [existing] = await db
    .select()
    .from(siteProjects)
    .where(requestedId
      ? and(eq(siteProjects.id, requestedId), eq(siteProjects.userId, user.userId))
      : eq(siteProjects.userId, user.userId))
    .orderBy(desc(siteProjects.updatedAt))
    .limit(1);
  const id = existing?.id || crypto.randomUUID();

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
    };

  if (existing) {
    await db.update(siteProjects).set({
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
      }).where(and(eq(siteProjects.id, id), eq(siteProjects.userId, user.userId)));
  } else {
    await db.insert(siteProjects).values(values);
  }

  await db.insert(projectEvents).values({
    id: crypto.randomUUID(),
    projectId: id,
    userId: user.userId,
    type: existing ? 'project_updated' : 'project_created',
    payloadJson: JSON.stringify({ completion, fields: Object.keys(intake) }),
    createdAt: now,
  });

  const [saved] = await db
    .select()
    .from(siteProjects)
    .where(and(eq(siteProjects.id, id), eq(siteProjects.userId, user.userId)))
    .limit(1);
  return Response.json({ project: present(saved) }, { headers: { 'cache-control': 'no-store' } });
}
