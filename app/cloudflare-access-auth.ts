import { env } from 'cloudflare:workers';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
// @ts-expect-error Shared ESM verifier is exercised directly by Node tests.
import { verifyCloudflareAccessJwt } from '../lib/cloudflare-access-identity.mjs';

export type CloudflareAccessUser = {
  userId: string;
  displayName: string;
  email: string;
};

const ACCESS_ASSERTION_HEADER = 'cf-access-jwt-assertion';
const ACCESS_LOGOUT_PATH = '/cdn-cgi/access/logout';

export async function getCloudflareAccessUser(): Promise<CloudflareAccessUser | null> {
  const requestHeaders = await headers();
  const result = await verifyCloudflareAccessJwt({
    token: requestHeaders.get(ACCESS_ASSERTION_HEADER) || '',
    teamDomain: env.ACCESS_TEAM_DOMAIN,
    audience: env.ACCESS_AUD,
  });

  if (!result.ok) return null;
  return {
    userId: result.identity.userId,
    displayName: result.identity.email,
    email: result.identity.email,
  };
}

export async function requireCloudflareAccessUser(
  returnTo: string,
): Promise<CloudflareAccessUser> {
  const user = await getCloudflareAccessUser();
  if (user) return user;

  redirect(`/?access=required&return_to=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`);
}

export function cloudflareAccessSignOutPath(): string {
  return ACCESS_LOGOUT_PATH;
}

function safeRelativeReturnPath(value: string): string {
  if (!value.startsWith('/') || value.startsWith('//')) return '/';

  try {
    const url = new URL(value, 'https://agentfriendlyweb.dev');
    if (url.origin !== 'https://agentfriendlyweb.dev') return '/';
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return '/';
  }
}
