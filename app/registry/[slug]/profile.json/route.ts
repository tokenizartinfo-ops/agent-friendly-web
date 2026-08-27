import { getPublishedProfile } from '../../../../lib/registry-store';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ slug: string }> };

function requestedVersion(request: Request) {
  const raw = new URL(request.url).searchParams.get('version');
  return raw && /^\d+$/.test(raw) ? Number(raw) : undefined;
}

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const version = requestedVersion(request);
  const profile = await getPublishedProfile(slug, version);
  if (!profile) return new Response('Not found', { status: 404 });
  return new Response(`${JSON.stringify(profile, null, 2)}\n`, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': version ? 'public,max-age=31536000,immutable' : 'public,max-age=300,s-maxage=300',
    },
  });
}
