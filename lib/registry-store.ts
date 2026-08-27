import { and, desc, eq, inArray } from 'drizzle-orm';
import { getDb } from '../db';
import { publicProfiles } from '../db/schema';

export type PublicProfile = {
  contract: string;
  slug: string;
  version: number;
  organization: string;
  canonicalOrigin: string;
  canonicalUrl: string;
  publishedAt: string;
  siteType: string;
  sectors: string[];
  audiences: string[];
  languages: string[];
  declaredCapabilities: string[];
  observedResources: Array<{ type: string; url: string; state: string; observedAt: string }>;
  publicSources: Array<{ title: string; url: string; state: string; observedAt: string }>;
  verification: { status: string; hostname: string; method: string; verifiedAt: string; verifiedUntil: string };
  readiness: { level: string; score: number | null; state: string; observedAt: string };
  limits: string[];
  historyUrl: string;
};

function parseProfile(row: typeof publicProfiles.$inferSelect): PublicProfile | null {
  try {
    const profile = JSON.parse(row.profileJson) as PublicProfile;
    return profile && typeof profile === 'object' ? profile : null;
  } catch {
    return null;
  }
}

export async function listPublishedProfiles(): Promise<PublicProfile[]> {
  const rows = await getDb()
    .select()
    .from(publicProfiles)
    .where(eq(publicProfiles.status, 'published'))
    .orderBy(desc(publicProfiles.publishedAt));

  const latestBySlug = new Map<string, PublicProfile>();
  for (const row of rows) {
    if (latestBySlug.has(row.slug)) continue;
    const profile = parseProfile(row);
    if (profile) latestBySlug.set(row.slug, profile);
  }
  return [...latestBySlug.values()].sort((left, right) =>
    left.organization.localeCompare(right.organization, 'es') || left.slug.localeCompare(right.slug),
  );
}

export async function getPublishedProfile(slug: string, version?: number): Promise<PublicProfile | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return null;

  const filters = version
    ? and(
        eq(publicProfiles.slug, normalizedSlug),
        eq(publicProfiles.version, version),
        inArray(publicProfiles.status, ['published', 'superseded']),
      )
    : and(eq(publicProfiles.slug, normalizedSlug), eq(publicProfiles.status, 'published'));

  const [row] = await getDb()
    .select()
    .from(publicProfiles)
    .where(filters)
    .orderBy(desc(publicProfiles.version))
    .limit(1);
  return row ? parseProfile(row) : null;
}

export async function getPublishedProfileMarkdown(slug: string, version?: number): Promise<string | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return null;
  const filters = version
    ? and(
        eq(publicProfiles.slug, normalizedSlug),
        eq(publicProfiles.version, version),
        inArray(publicProfiles.status, ['published', 'superseded']),
      )
    : and(eq(publicProfiles.slug, normalizedSlug), eq(publicProfiles.status, 'published'));
  const [row] = await getDb()
    .select()
    .from(publicProfiles)
    .where(filters)
    .orderBy(desc(publicProfiles.version))
    .limit(1);
  return row?.markdown || null;
}
