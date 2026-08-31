import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { acceptsMarkdown, mergeVaryHeader } from './lib/markdown-negotiation.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { localeFromPathname } from './lib/request-locale.mjs';

const discoveryLinks = [
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</llms.txt>; rel="alternate"; type="text/plain"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</.well-known/ard.json>; rel="ard"; type="application/json"',
].join(', ');

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/.well-known/api-catalog') {
    return NextResponse.rewrite(new URL('/api-catalog', request.url));
  }
  if (request.nextUrl.pathname === '/' && acceptsMarkdown(request.headers.get('accept'))) {
    const response = NextResponse.rewrite(new URL('/index.md', request.url));
    response.headers.set('Link', discoveryLinks);
    response.headers.set('Vary', mergeVaryHeader(response.headers.get('Vary'), 'Accept'));
    return response;
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-agent-friendly-locale', localeFromPathname(request.nextUrl.pathname));
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (request.nextUrl.pathname === '/') {
    response.headers.set('Link', discoveryLinks);
    response.headers.set('Vary', mergeVaryHeader(response.headers.get('Vary'), 'Accept'));
  }
  return response;
}

export const config = {
  matcher: ['/', '/en/:path*', '/pt/:path*', '/.well-known/api-catalog'],
};
