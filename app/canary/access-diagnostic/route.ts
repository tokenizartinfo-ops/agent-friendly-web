import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM verifier is exercised directly by Node tests.
import { verifyCloudflareAccessJwt } from '../../../lib/cloudflare-access-identity.mjs';

const ACCESS_ASSERTION_HEADER = 'cf-access-jwt-assertion';

export async function GET(request: Request) {
  if (env.AFW_CANARY_DIAGNOSTICS_ENABLED !== 'true') {
    return new Response(null, { status: 404 });
  }

  const assertion = request.headers.get(ACCESS_ASSERTION_HEADER) || '';
  const token = assertion;
  const teamDomain = env.ACCESS_TEAM_DOMAIN || '';
  const audience = env.ACCESS_AUD || '';
  const result = await verifyCloudflareAccessJwt({
    token,
    teamDomain,
    audience,
    diagnostics: true,
  });
  const verificationStatus = result.ok ? 'verified' : 'rejected';
  const verificationDiagnostic = result.ok
    ? 'none'
    : result.diagnosticCode || 'verification_failed';

  const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Diagnóstico de acceso | Agent Friendly Web Canary</title>
    <style>
      :root { color-scheme: light; font-family: Arial, sans-serif; }
      body { margin: 0; background: #f4f1e8; color: #101010; }
      main { width: min(760px, calc(100% - 32px)); margin: 48px auto; }
      h1 { margin: 0 0 12px; font-size: clamp(28px, 6vw, 48px); line-height: 1; }
      p { line-height: 1.55; }
      dl { display: grid; grid-template-columns: minmax(180px, 1fr) 1fr; border: 3px solid #101010; background: #fff; }
      dt, dd { margin: 0; padding: 14px 16px; border-bottom: 1px solid #101010; }
      dt { font-weight: 700; }
      dd { overflow-wrap: anywhere; }
      dt:last-of-type, dd:last-of-type { border-bottom: 0; }
      .status { display: inline-block; padding: 4px 8px; border: 2px solid #101010; font-weight: 700; text-transform: uppercase; }
      a { color: inherit; font-weight: 700; }
      @media (max-width: 560px) { dl { grid-template-columns: 1fr; } dt { padding-bottom: 4px; } dd { padding-top: 4px; } }
    </style>
  </head>
  <body>
    <main>
      <p><strong>Agent Friendly Web Canary</strong></p>
      <h1>Diagnóstico seguro de Cloudflare Access</h1>
      <p>Esta vista interna solo muestra estados técnicos saneados. No expone identidad, email, token ni credenciales.</p>
      <dl>
        <dt>assertion_header_present</dt><dd>${Boolean(assertion)}</dd>
        <dt>access_configuration_present</dt><dd>${Boolean(teamDomain && audience)}</dd>
        <dt>verification_status</dt><dd><span class="status">${verificationStatus}</span></dd>
        <dt>verification_diagnostic</dt><dd>${verificationDiagnostic}</dd>
      </dl>
      <p><a href="/">Volver al canary</a></p>
    </main>
  </body>
</html>`;

  return new Response(html, {
    status: result.ok ? 200 : 403,
    headers: {
      'Cache-Control': 'no-store, private',
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
