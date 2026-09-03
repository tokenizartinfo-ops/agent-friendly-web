import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM handler is exercised directly by Node tests.
import emailReviewReadyHandler from '../../../lib/email-review-ready-gate.mjs';
// @ts-expect-error Shared ESM helper is exercised directly by Node tests.
import {
  buildEmailReviewReadyProbeRequest,
  canRunNegativeEmailProbe,
} from '../../../lib/email-review-ready-probe.mjs';
// @ts-expect-error Shared ESM verifier is exercised directly by Node tests.
import { verifyCloudflareAccessJwt } from '../../../lib/cloudflare-access-identity.mjs';

const noStoreHeaders = {
  'Cache-Control': 'no-store, private',
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
};

type ProbeOutcome = {
  status: number;
  sent: boolean;
  code: string;
};

function safeCode(value: unknown) {
  const code = typeof value === 'string' ? value : '';
  return /^[a-z][a-z0-9_]{2,63}$/.test(code) ? code : 'unknown_result';
}

async function accessIsVerified(request: Request) {
  const result = await verifyCloudflareAccessJwt({
    token: request.headers.get('cf-access-jwt-assertion') || '',
    teamDomain: env.ACCESS_TEAM_DOMAIN || '',
    audience: env.ACCESS_AUD || '',
  });
  return result.ok === true;
}

function render(outcome?: ProbeOutcome) {
  const enabled = env.AFW_EMAIL_REVIEW_READY_ENABLED === 'true';
  const mode = enabled ? 'envio controlado habilitado' : 'prueba negativa: envio bloqueado';
  const action = enabled
    ? `<form method="post">
        <button type="submit">Enviar el unico correo fijo</button>
      </form>`
    : '<a class="button" href="/canary/email-review-ready?probe=negative">Ejecutar prueba negativa</a>';
  const result = outcome
    ? `<section class="result" aria-live="polite">
        <h2>Resultado saneado</h2>
        <dl>
          <dt>HTTP</dt><dd>${outcome.status}</dd>
          <dt>sent</dt><dd>${outcome.sent}</dd>
          <dt>code</dt><dd>${outcome.code}</dd>
        </dl>
      </section>`
    : '';

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Prueba de correo | Agent Friendly Web Canary</title>
    <style>
      :root { color-scheme: light; font-family: Arial, sans-serif; }
      body { margin: 0; background: #f4f1e8; color: #101010; }
      main { width: min(760px, calc(100% - 32px)); margin: 48px auto; }
      h1 { margin: 0 0 12px; font-size: clamp(28px, 6vw, 48px); line-height: 1; }
      h2 { font-size: 22px; }
      p { line-height: 1.55; }
      .mode, .result { margin: 24px 0; padding: 18px; border: 3px solid #101010; background: #fff; }
      .mode strong { text-transform: uppercase; }
      button, .button { display: inline-flex; min-height: 48px; align-items: center; box-sizing: border-box; padding: 10px 18px; border: 3px solid #101010; background: #ffd447; color: #101010; font: inherit; font-weight: 700; cursor: pointer; text-decoration: none; }
      button:hover, button:focus-visible, .button:hover, .button:focus-visible { background: #fff; }
      dl { display: grid; grid-template-columns: 120px 1fr; }
      dt, dd { margin: 0; padding: 8px; border-bottom: 1px solid #101010; overflow-wrap: anywhere; }
      dt { font-weight: 700; }
      a { color: inherit; font-weight: 700; }
    </style>
  </head>
  <body>
    <main>
      <p><strong>Agent Friendly Web Canary</strong></p>
      <h1>Prueba controlada de correo</h1>
      <p>Esta superficie privada no acepta destinatarios, asuntos ni texto libre. Solo invoca el contrato fijo y devuelve un estado tecnico saneado.</p>
      <div class="mode">Modo actual: <strong>${mode}</strong></div>
      ${action}
      ${result}
      <p><a href="/canary/access-diagnostic">Ver diagnostico de acceso</a></p>
    </main>
  </body>
</html>`;
}

export async function GET(request: Request) {
  if (env.AFW_CANARY_DIAGNOSTICS_ENABLED !== 'true') {
    return new Response(null, { status: 404 });
  }
  if (!(await accessIsVerified(request))) {
    return new Response(null, { status: 403, headers: noStoreHeaders });
  }
  const probeMode = new URL(request.url).searchParams.get('probe');
  if (canRunNegativeEmailProbe(env.AFW_EMAIL_REVIEW_READY_ENABLED, probeMode)) {
    const response = await runProbe(request);
    return new Response(render(await responseOutcome(response)), { status: 200, headers: noStoreHeaders });
  }
  return new Response(render(), { status: 200, headers: noStoreHeaders });
}

async function runProbe(request: Request) {
  try {
    const gateRequest = buildEmailReviewReadyProbeRequest(request);
    return await emailReviewReadyHandler(gateRequest, env);
  } catch {
    return Response.json({ sent: false, code: 'probe_generation_failed' }, { status: 500 });
  }
}

async function responseOutcome(response: Response): Promise<ProbeOutcome> {
  let payload: { sent?: unknown; code?: unknown } = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }
  return {
    status: response.status,
    sent: payload.sent === true,
    code: payload.sent === true ? 'delivery_accepted' : safeCode(payload.code),
  };
}

export async function POST(request: Request) {
  if (env.AFW_CANARY_DIAGNOSTICS_ENABLED !== 'true') {
    return new Response(null, { status: 404 });
  }
  if (!(await accessIsVerified(request))) {
    return new Response(null, { status: 403, headers: noStoreHeaders });
  }

  const response = await runProbe(request);
  const outcome = await responseOutcome(response);
  return new Response(render(outcome), { status: 200, headers: noStoreHeaders });
}
