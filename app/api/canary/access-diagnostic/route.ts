import { env } from 'cloudflare:workers';
import { NextRequest, NextResponse } from 'next/server';
// @ts-expect-error Shared ESM verifier is exercised directly by Node tests.
import { verifyCloudflareAccessJwt } from '../../../../lib/cloudflare-access-identity.mjs';

const ACCESS_ASSERTION_HEADER = 'cf-access-jwt-assertion';

export async function GET(request: NextRequest) {
  if (env.AFW_CANARY_DIAGNOSTICS_ENABLED !== 'true') {
    return new NextResponse(null, { status: 404 });
  }

  const assertion = request.headers.get(ACCESS_ASSERTION_HEADER) || '';
  const token = assertion;
  const teamDomain = env.ACCESS_TEAM_DOMAIN || '';
  const audience = env.ACCESS_AUD || '';
  const result = await verifyCloudflareAccessJwt({ token, teamDomain, audience });

  return NextResponse.json({
    enabled: true,
    assertion_header_present: Boolean(assertion),
    access_configuration_present: Boolean(teamDomain && audience),
    verification_status: result.ok ? 'verified' : 'rejected',
  }, {
    status: result.ok ? 200 : 403,
    headers: {
      'Cache-Control': 'no-store, private',
    },
  });
}
