import { and, desc, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../cloudflare-access-auth';
import { getDb } from '../../../../../db';
import { projectEvents, siteProjects } from '../../../../../db/schema';
import { latestDossierFieldHistory } from '../../../../../lib/dossier-field-history.mjs';

type Context = { params: Promise<{ projectId: string }> };
const headers = { 'cache-control': 'no-store' };

export async function GET(_request: Request, context: Context) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ code: 'authentication_required' }, { status: 401, headers });
  const { projectId } = await context.params;
  const db = getDb();
  const [project] = await db.select({ id: siteProjects.id }).from(siteProjects)
    .where(and(eq(siteProjects.id, projectId), eq(siteProjects.userId, user.userId))).limit(1);
  if (!project) return Response.json({ code: 'project_unavailable' }, { status: 404, headers });
  const events = await db.select({ type: projectEvents.type, payloadJson: projectEvents.payloadJson, createdAt: projectEvents.createdAt })
    .from(projectEvents).where(and(eq(projectEvents.projectId, projectId), eq(projectEvents.userId, user.userId)))
    .orderBy(desc(projectEvents.createdAt)).limit(500);
  return Response.json({ fields: latestDossierFieldHistory(events) }, { headers });
}
