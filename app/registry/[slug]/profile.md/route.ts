import { getPublishedProfileMarkdown } from '../../../../lib/registry-store';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ slug: string }> };

function requestedVersion(request: Request) {
  const raw = new URL(request.url).searchParams.get('version');
  return raw && /^\d+$/.test(raw) ? Number(raw) : undefined;
}

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const version = requestedVersion(request);
  const markdown = await getPublishedProfileMarkdown(slug, version);
  if (!markdown) return new Response('Not found', { status: 404 });
  return new Response(markdown, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': version ? 'public,max-age=31536000,immutable' : 'public,max-age=300,s-maxage=300',
    },
  });
}
