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

function allowedSubjectHashes(value: unknown) {
  return new Set(
    String(value || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter((item) => HASH.test(item)),
  );
}

async function accessIsVerified(request: Request) {
  const result = await verifyCloudflareAccessJwt({
    token: request.headers.get('cf-access-jwt-assertion') || '',
    teamDomain: env.ACCESS_TEAM_DOMAIN || '',
    audience: env.ACCESS_AUD || '',
  });
  if (!result.ok) return false;
  const actorHash = await hashAccessSubject(result.identity.userId);
  const runtimeEnv = env as typeof env & { AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES?: string };
  return allowedSubjectHashes(runtimeEnv.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES).has(actorHash);
}

function render() {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Revision comercial sintetica | Agent Friendly Web Canary</title>
    <style>
      :root { color-scheme: light; font-family: Arial, sans-serif; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #f4f1e8; color: #101010; }
      main { width: min(920px, calc(100% - 32px)); margin: 40px auto; }
      h1 { margin: 0 0 12px; font-size: clamp(30px, 6vw, 52px); line-height: 1; }
      h2 { margin: 0 0 12px; font-size: 21px; }
      p { line-height: 1.55; }
      .status, .panel { border: 3px solid #101010; background: #fff; }
      .status { display: flex; flex-wrap: wrap; gap: 10px 18px; margin: 24px 0; padding: 14px 16px; font-weight: 700; }
      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
      .panel { min-height: 170px; padding: 18px; }
      dl { display: grid; grid-template-columns: minmax(120px, .7fr) minmax(0, 1.3fr); margin: 0; }
      dt, dd { margin: 0; padding: 9px 0; border-bottom: 1px solid #aaa; overflow-wrap: anywhere; }
      dt { font-weight: 700; }
      .notice { margin-top: 18px; padding: 14px 16px; border: 3px solid #101010; background: #ffd447; font-weight: 700; }
      a { color: inherit; font-weight: 700; }
      @media (max-width: 680px) { .grid { grid-template-columns: 1fr; } dl { grid-template-columns: 1fr; } dd { padding-top: 0; } }
    </style>
  </head>
  <body>
    <main>
      <p><strong>Agent Friendly Web Canary</strong></p>
      <h1>Revision comercial sintetica</h1>
      <p>Convierte una solicitud de prueba en un plan ordenado para revisar. No contiene un cliente real.</p>
      <div class="status"><span>Solo lectura</span><span>No guardado</span><span>Sin correo</span><span>Sin pagos</span></div>
      <div class="grid" aria-live="polite">
        <section class="panel" aria-labelledby="source-title">
          <h2 id="source-title">Origen controlado</h2>
          <dl>
            <dt>Tipo</dt><dd id="source-type">Cargando...</dd>
            <dt>Estado</dt><dd id="source-state">Cargando...</dd>
            <dt>Consentimiento</dt><dd id="source-consent">Cargando...</dd>
          </dl>
        </section>
        <section class="panel" aria-labelledby="plan-title">
          <h2 id="plan-title">Plan propuesto</h2>
          <dl>
            <dt>Etapa actual</dt><dd id="from-stage">Cargando...</dd>
            <dt>Proxima etapa</dt><dd id="to-stage">Cargando...</dd>
            <dt>Siguiente accion</dt><dd id="next-action">Cargando...</dd>
            <dt>Alcance</dt><dd id="scope">Cargando...</dd>
          </dl>
        </section>
      </div>
      <p id="result" class="notice" role="status">Leyendo el unico registro sintetico permitido...</p>
      <p><a href="/canary/access-diagnostic">Ver diagnostico de acceso</a></p>
      <script>
        (() => {
          const labels = {
            synthetic_contact: 'Solicitud sintetica',
            new: 'Nueva',
            qualified: 'Calificada',
            requested_plan: 'Plan solicitado',
            confirm_interest: 'Confirmar interes',
            discovery_pack: 'Paquete de diagnostico',
            external_evidence: 'Evidencia externa'
          };
          const set = (id, value) => {
            const node = document.getElementById(id);
            if (node) node.textContent = labels[value] || String(value || 'No disponible');
          };
          fetch('/api/canary/commercial-review', {
            method: 'GET',
            headers: { accept: 'application/json' },
            cache: 'no-store'
          })
            .then(async (response) => {
              const payload = await response.json();
              if (!response.ok || payload.status !== 'planned_not_persisted') {
                throw new Error(String(payload.code || 'review_unavailable'));
              }
              set('source-type', payload.source.type);
              set('source-state', payload.source.persistedState);
              set('source-consent', payload.source.consentPurpose);
              set('from-stage', payload.transition.fromStage);
              set('to-stage', payload.transition.toStage);
              set('next-action', payload.opportunity.nextAction);
              const scope = payload.opportunity.scopeCodes.map((code) => labels[code] || code).join(' + ');
              set('scope', scope);
              set('result', 'Plan generado para revision humana. Ningun cambio fue guardado ni ejecutado.');
            })
            .catch(() => {
              set('result', 'No fue posible preparar la revision. No se ejecuto ninguna accion.');
            });
        })();
      </script>
    </main>
  </body>
</html>`;
}

export async function GET(request: Request) {
  if (
    env.AFW_CANARY_DIAGNOSTICS_ENABLED !== 'true'
    || env.AFW_SYNTHETIC_COMMERCIAL_REVIEW_ENABLED !== 'true'
  ) {
    return new Response(null, { status: 404 });
  }
  if (!(await accessIsVerified(request))) {
    return new Response(null, { status: 403, headers: noStoreHeaders });
  }
  return new Response(render(), { status: 200, headers: noStoreHeaders });
}
