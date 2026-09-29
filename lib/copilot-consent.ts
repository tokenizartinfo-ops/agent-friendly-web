import { and, desc, eq } from 'drizzle-orm';
import { getDb } from '../db';
import { copilotConsentEvents } from '../db/schema';

export const COPILOT_CONSENT_VERSION = 'afw-copilot-processing-v1';

export async function currentCopilotConsent(projectId: string, userId: string) {
  const [latest] = await getDb().select({
    action: copilotConsentEvents.action,
    consentVersion: copilotConsentEvents.consentVersion,
    createdAt: copilotConsentEvents.createdAt,
  }).from(copilotConsentEvents).where(and(
    eq(copilotConsentEvents.projectId, projectId),
    eq(copilotConsentEvents.userId, userId),
  )).orderBy(desc(copilotConsentEvents.sequence)).limit(1);
  return {
    granted: latest?.action === 'grant' && latest.consentVersion === COPILOT_CONSENT_VERSION,
    updatedAt: latest?.createdAt ?? null,
  };
}
