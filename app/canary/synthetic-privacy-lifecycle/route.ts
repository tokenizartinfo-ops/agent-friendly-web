import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM hash helper is exercised directly by Node tests.
import { hashAccessSubject } from '../../../lib/access-subject-hash.mjs';
// @ts-expect-error Shared ESM verifier is exercised directly by Node tests.
import { verifyCloudflareAccessJwt } from '../../../lib/cloudflare-access-identity.mjs';

const noStoreHeaders = {
  'Cache-Control': 'no-store, private',
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
};
const HASH = /^[0-9a-f]{64}$/;

type RuntimeEnv = typeof env & {
  AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED?: string;
  AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES?: string;
};

function allowedSubjectHashes(value: unknown) {
  return new Set(
    String(value || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter((item) => HASH.test(item)),
  );
}

async function accessIsVerified(request: Request, runtimeEnv: RuntimeEnv) {
  try {
    const result = await verifyCloudflareAccessJwt({
      token: request.headers.get('cf-access-jwt-assertion') || '',
      teamDomain: runtimeEnv.ACCESS_TEAM_DOMAIN || '',
      audience: runtimeEnv.ACCESS_AUD || '',
    });
    if (!result.ok) return false;
    const actorHash = await hashAccessSubject(result.identity.userId);
    return allowedSubjectHashes(
      runtimeEnv.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES,
    ).has(actorHash);
  } catch {
    return false;
  }
}

function render() {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Ciclo de privacidad sintetico | Agent Friendly Web Canary</title>
    <style>
      :root { color-scheme: light; font-family: Arial, sans-serif; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #f4f1e8; color: #101010; }
      main { width: min(760px, calc(100% - 32px)); margin: 40px auto; }
      h1 { margin: 0 0 12px; font-size: clamp(30px, 6vw, 52px); line-height: 1; }
      p { line-height: 1.55; }
      .panel { margin: 24px 0; padding: 20px; border: 3px solid #101010; background: #fff; }
      .limits { display: flex; flex-wrap: wrap; gap: 8px; margin: 18px 0; }
      .limits span { padding: 7px 10px; border: 2px solid #101010; font-weight: 700; }
      button { min-height: 48px; padding: 12px 18px; border: 3px solid #101010; background: #ffd447; color: #101010; font: inherit; font-weight: 800; cursor: pointer; }
      button:disabled { cursor: wait; opacity: .6; }
      .result { min-height: 58px; margin-top: 18px; padding: 14px; border: 2px solid #101010; background: #f4f1e8; font-weight: 700; }
      a { color: inherit; font-weight: 700; }
    </style>
  </head>
  <body>
    <main>
      <p><strong>Agent Friendly Web Canary</strong></p>
      <h1>Ciclo de privacidad sintetico</h1>
      <p>Esta prueba privada ejecuta una secuencia fija de consentimiento, rectificacion, exportacion, retiro y borrado sobre un unico registro reservado.</p>
      <section class="panel">
        <div class="limits"><span>Solo datos sinteticos</span><span>Sin correo</span><span>Sin propuestas</span><span>Sin pagos</span></div>
        <p>No solicita ni acepta datos. La repeticion comprueba idempotencia sin crear un segundo ciclo.</p>
        <button id="run-lifecycle" type="button">Ejecutar ciclo sintetico</button>
        <p id="result" class="result" role="status" aria-live="polite">Esperando confirmacion humana.</p>
      </section>
      <p><a href="/canary/access-diagnostic">Ver diagnostico de acceso</a></p>
      <script>
        (() => {
          const button = document.getElementById('run-lifecycle');
          const result = document.getElementById('result');
          button.addEventListener('click', async () => {
            button.disabled = true;
            result.textContent = 'Ejecutando el unico ciclo sintetico permitido...';
            try {
              const response = await fetch('/api/canary/synthetic-privacy-lifecycle', {
                method: 'POST',
                headers: { 'content-type': 'application/json', accept: 'application/json' },
                body: JSON.stringify({
                  contract: 'agent-friendly-web.synthetic-privacy-lifecycle.v1',
                  action: 'run_one_private_synthetic_privacy_lifecycle',
                  confirmation: 'synthetic_only'
                })
              });
              const payload = await response.json();
              if (!response.ok) throw new Error(String(payload.code || 'lifecycle_failed'));
              result.textContent = payload.status === 'synthetic_privacy_lifecycle_already_completed'
                ? 'El ciclo sintetico ya estaba completo. No se agregaron eventos.'
                : 'Ciclo sintetico completo. El registro quedo borrado y sin restricciones.';
            } catch {
              result.textContent = 'La prueba no pudo completarse. No se habilito ninguna accion adicional.';
            } finally {
              button.disabled = false;
            }
          });
        })();
      </script>
    </main>
  </body>
</html>`;
}

export async function GET(request: Request) {
  const runtimeEnv = env as RuntimeEnv;
  if (
    runtimeEnv.AFW_CANARY_DIAGNOSTICS_ENABLED !== 'true'
    || runtimeEnv.AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED !== 'true'
  ) {
    return new Response(null, { status: 404, headers: noStoreHeaders });
  }
  if (!(await accessIsVerified(request, runtimeEnv))) {
    return new Response(null, { status: 403, headers: noStoreHeaders });
  }
  return new Response(render(), { status: 200, headers: noStoreHeaders });
}
