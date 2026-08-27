import type { PublicProfile } from '../../lib/registry-store';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { renderPublicProfileMarkdown } from '../../lib/public-profile.mjs';
import tokenizartV1 from './tokenizart.v1.json';

const profiles = [tokenizartV1 as unknown as PublicProfile];

export const builtinSlugs = new Set(profiles.map((profile) => profile.slug));

export function listBuiltinProfiles() {
  return [...profiles];
}

export function getBuiltinProfile(slug: string, version?: number) {
  const normalized = slug.trim().toLowerCase();
  return profiles.find((profile) =>
    profile.slug === normalized && (version === undefined || profile.version === version),
  ) || null;
}

export function getBuiltinProfileMarkdown(slug: string, version?: number) {
  const profile = getBuiltinProfile(slug, version);
  return profile ? renderPublicProfileMarkdown(profile) : null;
}
