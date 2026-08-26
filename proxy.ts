import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const discoveryLinks = [
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</llms.txt>; rel="alternate"; type="text/plain"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
].join(', ');

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/.well-known/api-catalog') {
    return NextResponse.rewrite(new URL('/api-catalog', request.url));
  }
  const response = NextResponse.next();
  if (request.nextUrl.pathname === '/') {
    response.headers.set('Link', discoveryLinks);
  }
  return response;
}

export const config = {
  matcher: ['/', '/.well-known/api-catalog'],
};
