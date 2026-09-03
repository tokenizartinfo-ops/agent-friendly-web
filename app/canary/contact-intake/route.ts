import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM verifier is exercised directly by Node tests.
import { verifyCloudflareAccessJwt } from '../../../lib/cloudflare-access-identity.mjs';

const noStoreHeaders = {
  'Cache-Control': 'no-store, private',
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
};

async function accessIsVerified(request: Request) {
  const result = await verifyCloudflareAccessJwt({
    token: request.headers.get('cf-access-jwt-assertion') || '',
    teamDomain: env.ACCESS_TEAM_DOMAIN || '',
    audience: env.ACCESS_AUD || '',
  });
  return result.ok === true;
}

function safeSiteKey(value: unknown) {
  const candidate = typeof value === 'string' ? value : '';
  return /^[a-zA-Z0-9_-]{1,128}$/.test(candidate) ? candidate : '';
}

function render() {
  const enabled = env.AFW_SYNTHETIC_CONTACT_ENABLED === 'true';
  const siteKey = safeSiteKey(env.AFW_SYNTHETIC_CONTACT_TURNSTILE_SITE_KEY);
  const ready = enabled && Boolean(siteKey);
  const mode = enabled ? 'captura sintetica habilitada' : 'captura sintetica bloqueada';
  const action = ready
    ? `<section class="action" aria-labelledby="action-title">
        <h2 id="action-title">Una solicitud fija, sin datos personales</h2>
        <p>Turnstile valida esta prueba. El servidor genera datos reservados, guarda un consentimiento y prepara el aviso interno sin enviarlo.</p>
        <div class="cf-turnstile" data-sitekey="${siteKey}" data-action="afw_synthetic_contact" data-callback="afwTurnstileReady" data-expired-callback="afwTurnstileExpired" data-error-callback="afwTurnstileExpired"></div>
        <button id="synthetic-submit" type="button" disabled>Crear la solicitud sintetica</button>
      </section>`
    : `<section class="action"><h2>Prueba cerrada</h2><p>El interruptor remoto esta apagado. No se puede crear ninguna solicitud.</p></section>`;
  const script = ready
    ? `<script>
        (() => {
          const button = document.getElementById('synthetic-submit');
          const result = document.getElementById('result');
          let turnstileToken = '';
          let idempotencyKey = '';

          window.afwTurnstileReady = (token) => {
            turnstileToken = typeof token === 'string' ? token : '';
            button.disabled = !turnstileToken;
            result.textContent = turnstileToken ? 'Verificacion lista. La prueba aun no fue ejecutada.' : 'No se pudo verificar la prueba.';
          };
          window.afwTurnstileExpired = () => {
            turnstileToken = '';
            button.disabled = true;
            result.textContent = 'La verificacion vencio. Recarga la pagina para continuar.';
          };

          button.addEventListener('click', async () => {
            if (!turnstileToken || button.disabled) return;
            button.disabled = true;
            idempotencyKey ||= crypto.randomUUID();
            result.textContent = 'Procesando una unica solicitud sintetica...';
            try {
              const response = await fetch('/api/canary/contact-intake', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                  contract: 'agent-friendly-web.synthetic-contact-canary.v1',
                  idempotencyKey,
                  action: 'create_synthetic_contact_and_prepare_review',
                  humanApproved: true,
                  turnstileToken,
                }),
              });
              const payload = await response.json();
              const status = payload && payload.accepted === true
                ? 'Solicitud sintetica guardada. Aviso preparado, correo no enviado.'
                : 'Prueba rechazada: ' + String(payload && payload.code || 'respuesta_invalida');
              result.textContent = status;
              if (!payload || payload.accepted !== true) button.disabled = false;
            } catch {
              result.textContent = 'No se pudo completar la prueba. Antes de repetir se debe revisar D1.';
            }
          });
        })();
      </script>
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`
    : '';

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Captura sintetica | Agent Friendly Web Canary</title>
    <style>
      :root { color-scheme: light; font-family: Arial, sans-serif; }
      body { margin: 0; background: #f4f1e8; color: #101010; }
      main { width: min(760px, calc(100% - 32px)); margin: 48px auto; }
      h1 { margin: 0 0 12px; font-size: clamp(28px, 6vw, 48px); line-height: 1; }
      h2 { margin-top: 0; font-size: 22px; }
      p { line-height: 1.55; }
      .mode, .action, .result { margin: 24px 0; padding: 18px; border: 3px solid #101010; background: #fff; }
      .mode strong { text-transform: uppercase; }
      button { display: inline-flex; min-height: 48px; align-items: center; box-sizing: border-box; margin-top: 16px; padding: 10px 18px; border: 3px solid #101010; background: #ffd447; color: #101010; font: inherit; font-weight: 700; cursor: pointer; }
      button:hover, button:focus-visible { background: #fff; }
      button:disabled { cursor: not-allowed; opacity: .5; }
      a { color: inherit; font-weight: 700; }
    </style>
  </head>
  <body>
    <main>
      <p><strong>Agent Friendly Web Canary</strong></p>
      <h1>Captura sintetica controlada</h1>
      <p>Esta superficie privada prueba el recorrido de una solicitud sin pedir ni aceptar datos reales.</p>
      <div class="mode">Modo actual: <strong>${mode}</strong></div>
      ${action}
      <p id="result" class="result" role="status" aria-live="polite">Ninguna solicitud fue creada en esta visita.</p>
      <p><a href="/canary/access-diagnostic">Ver diagnostico de acceso</a></p>
      ${script}
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
  return new Response(render(), { status: 200, headers: noStoreHeaders });
}
