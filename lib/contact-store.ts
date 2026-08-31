import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { consentReceipts, contactLeads } from '../db/schema';

type ContactIntake = {
  email: string;
  name: string;
  domain: string;
  role: string;
  organization: string;
  locale: string;
  objective: string;
  source: string;
  idempotencyKey: string;
  consentPurposes: string[];
  copyVersion: string;
};

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function saveContactIntake(intake: ContactIntake) {
  const db = getDb();
  const requestHash = await sha256(JSON.stringify([
    intake.email,
    intake.name,
    intake.domain,
    intake.role,
    intake.organization,
    intake.locale,
    intake.objective,
    intake.source,
    intake.consentPurposes,
    intake.copyVersion,
  ]));
  const [existing] = await db
    .select({ id: contactLeads.id, requestHash: contactLeads.requestHash })
    .from(contactLeads)
    .where(eq(contactLeads.idempotencyKey, intake.idempotencyKey))
    .limit(1);
  if (existing) {
    if (existing.requestHash !== requestHash) return { leadId: existing.id, duplicate: false, conflict: true };
    return { leadId: existing.id, duplicate: true, conflict: false };
  }

  const leadId = crypto.randomUUID();
  const now = new Date().toISOString();
  const leadInsert = db.insert(contactLeads).values({
    id: leadId,
    email: intake.email,
    name: intake.name,
    domain: intake.domain,
    role: intake.role,
    organization: intake.organization,
    locale: intake.locale,
    objective: intake.objective,
    state: 'new',
    source: intake.source,
    idempotencyKey: intake.idempotencyKey,
    requestHash,
    createdAt: now,
    updatedAt: now,
  });
  const receiptValues = await Promise.all(intake.consentPurposes.map(async (purpose) => {
    const evidenceHash = await sha256([leadId, purpose, intake.copyVersion, now].join('|'));
    return {
      id: crypto.randomUUID(),
      leadId,
      purpose,
      copyVersion: intake.copyVersion,
      action: 'granted',
      evidenceHash,
      createdAt: now,
    };
  }));
  const receiptInserts = receiptValues.map((values) => db.insert(consentReceipts).values(values));

  try {
    if (receiptInserts.length === 1) await db.batch([leadInsert, receiptInserts[0]]);
    else if (receiptInserts.length === 2) await db.batch([leadInsert, receiptInserts[0], receiptInserts[1]]);
    else await db.batch([leadInsert, receiptInserts[0], receiptInserts[1], receiptInserts[2]]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes('contact_leads.idempotency_key')) throw error;

    const [conflictingLead] = await db
      .select({ id: contactLeads.id, requestHash: contactLeads.requestHash })
      .from(contactLeads)
      .where(eq(contactLeads.idempotencyKey, intake.idempotencyKey))
      .limit(1);
    if (!conflictingLead) throw error;
    if (conflictingLead.requestHash !== requestHash) {
      return { leadId: conflictingLead.id, duplicate: false, conflict: true };
    }
    return { leadId: conflictingLead.id, duplicate: true, conflict: false };
  }
  return { leadId, duplicate: false, conflict: false };
}
