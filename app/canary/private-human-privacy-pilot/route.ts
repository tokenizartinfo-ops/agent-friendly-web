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
  AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED?: string;
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
    <title>Mis datos de prueba | Agent Friendly Web Canary</title>
    <style>
      :root { color-scheme: light; font-family: Arial, sans-serif; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #f4f1e8; color: #101010; }
      main { width: min(900px, calc(100% - 32px)); margin: 36px auto 64px; }
      h1 { max-width: 780px; margin: 6px 0 14px; font-size: clamp(34px, 7vw, 64px); line-height: .96; }
      h2 { margin: 0; font-size: 20px; }
      p { line-height: 1.55; }
      .eyebrow { font-weight: 900; text-transform: uppercase; }
      .intro, .step, .result { border: 3px solid #101010; background: #fff; box-shadow: 6px 6px 0 #101010; }
      .intro { margin: 24px 0 30px; padding: 20px; }
      .limits { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0 0; }
      .limits span { padding: 7px 10px; border: 2px solid #101010; font-weight: 800; }
      .steps { display: grid; gap: 18px; }
      .step { display: grid; grid-template-columns: 52px 1fr auto; gap: 16px; align-items: center; padding: 18px; }
      .number { display: grid; place-items: center; width: 48px; height: 48px; border: 3px solid #101010; background: #ffd447; font-size: 22px; font-weight: 900; }
      .step p { margin: 5px 0 0; }
      button, select { min-height: 46px; border: 3px solid #101010; color: #101010; font: inherit; font-weight: 800; }
      button { min-width: 126px; padding: 10px 16px; background: #ffd447; cursor: pointer; }
      button:disabled { cursor: not-allowed; opacity: .42; }
      select { margin-top: 10px; padding: 8px 36px 8px 10px; background: #fff; }
      .result { min-height: 76px; margin-top: 26px; padding: 18px; white-space: pre-wrap; overflow-wrap: anywhere; }
      .result[data-tone="success"] { background: #dff7df; }
      .result[data-tone="error"] { background: #ffd9d9; }
      a { color: inherit; font-weight: 800; }
      @media (max-width: 680px) {
        .step { grid-template-columns: 44px 1fr; }
        .number { width: 42px; height: 42px; }
        .step button { grid-column: 1 / -1; width: 100%; }
      }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Agent Friendly Web Canary</p>
      <h1>Controla tus propios datos, paso a paso</h1>
      <section class="intro">
        <p>Esta prueba privada demuestra el ciclo completo de privacidad con la identidad verificada por Cloudflare Access. No pide que escribas tu correo: lo reconoce de la sesion protegida.</p>
        <div class="limits"><span>Solo tus datos</span><span>Sin newsletter</span><span>Sin pagos</span><span>Sin cambios en sitios</span></div>
      </section>

      <section class="steps" aria-label="Cinco pasos del piloto privado">
        <article class="step">
          <span class="number">1</span>
          <div><h2>Registrar mis datos de prueba</h2><p>Crea un unico registro privado para esta demostracion.</p></div>
          <button type="button" data-action="enroll">Registrar</button>
        </article>
        <article class="step">
          <span class="number">2</span>
          <div><h2>Ver mi exportacion</h2><p>Muestra exactamente los datos asociados a tu propia identidad.</p></div>
          <button type="button" data-action="inspect_export" disabled>Ver datos</button>
        </article>
        <article class="step">
          <span class="number">3</span>
          <div>
            <h2>Cambiar mi idioma</h2>
            <p>Elige un idioma distinto al usado al registrarte.</p>
            <select id="locale" aria-label="Nuevo idioma">
              <option value="es">Espanol</option>
              <option value="en">English</option>
              <option value="pt">Portugues</option>
            </select>
          </div>
          <button type="button" data-action="rectify_locale" disabled>Cambiar</button>
        </article>
        <article class="step">
          <span class="number">4</span>
          <div><h2>Retirar el consentimiento de respuesta</h2><p>Retira el unico permiso creado por esta prueba. Nunca habilita novedades comerciales.</p></div>
          <button type="button" data-action="withdraw_requested_plan" disabled>Retirar</button>
        </article>
        <article class="step">
          <span class="number">5</span>
          <div><h2>Borrar mis datos</h2><p>Elimina el dato personal y conserva solo evidencia tecnica no reversible.</p></div>
          <button type="button" data-action="erase" disabled>Borrar</button>
        </article>
      </section>

      <p id="result" class="result" role="status" aria-live="polite">Empieza por el paso 1. Cada paso habilita el siguiente.</p>
      <p><a href="/canary/access-diagnostic">Ver diagnostico de acceso</a></p>

      <script>
        (() => {
          const actions = ['enroll', 'inspect_export', 'rectify_locale', 'withdraw_requested_plan', 'erase'];
          const buttons = actions.map((action) => document.querySelector('[data-action="' + action + '"]'));
          const locale = document.getElementById('locale');
          const result = document.getElementById('result');
          let current = 0;
          let initialLocale = 'es';

          async function execute(action, button) {
            button.disabled = true;
            result.dataset.tone = '';
            result.textContent = 'Procesando el paso ' + (current + 1) + '...';
            try {
              const response = await fetch('/api/canary/private-human-privacy-pilot', {
                method: 'POST',
                headers: { 'content-type': 'application/json', accept: 'application/json' },
                body: JSON.stringify({
                  contract: 'agent-friendly-web.private-human-privacy-pilot.v1',
                  action,
                  locale: action === 'enroll' ? initialLocale : locale.value,
                  confirmation: 'own_data_private_pilot'
                })
              });
              const payload = await response.json();
              if (!response.ok) throw new Error(String(payload.code || 'private_human_privacy_pilot_failed'));

              if (payload.export) {
                result.textContent = 'Datos verificados de esta prueba:\\n' + JSON.stringify(payload.export, null, 2);
              } else if (action === 'erase') {
                result.textContent = 'Prueba completada: tus datos quedaron borrados.';
              } else {
                result.textContent = 'Paso completado. Ya puedes continuar con el siguiente.';
              }
              result.dataset.tone = 'success';
              current += 1;
              if (action === 'enroll') initialLocale = 'es';
              if (action === 'erase' && payload.status.match(/private_human_privacy_pilot_(?:completed|already_completed)/)) {
                result.dataset.state = 'privacy_pilot_erased';
                buttons.forEach((control) => { control.disabled = true; });
                locale.disabled = true;
                return;
              }
              if (buttons[current]) buttons[current].disabled = false;
            } catch {
              result.textContent = 'No se pudo completar este paso. No se habilito ninguna accion adicional.';
              result.dataset.tone = 'error';
              button.disabled = false;
            }
          }

          buttons.forEach((button) => {
            button.addEventListener('click', () => execute(button.dataset.action, button));
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
    || runtimeEnv.AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED !== 'true'
  ) {
    return new Response(null, { status: 404, headers: noStoreHeaders });
  }
  if (!(await accessIsVerified(request, runtimeEnv))) {
    return new Response(null, { status: 403, headers: noStoreHeaders });
  }
  return new Response(render(), { status: 200, headers: noStoreHeaders });
}
