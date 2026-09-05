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
    <title>Bandeja comercial sintetica | Agent Friendly Web Canary</title>
    <style>
      :root { color-scheme: light; font-family: Arial, sans-serif; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #f4f1e8; color: #101010; }
      main { width: min(980px, calc(100% - 32px)); margin: 40px auto; }
      h1 { margin: 0 0 12px; font-size: clamp(30px, 6vw, 52px); line-height: 1; }
      h2 { margin: 0 0 12px; font-size: 20px; }
      p { line-height: 1.55; }
      .status { display: flex; flex-wrap: wrap; gap: 9px; margin: 22px 0; }
      .status span { padding: 7px 10px; border: 2px solid #101010; background: #fff; font-weight: 800; }
      .grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 16px; }
      .panel { padding: 18px; border: 3px solid #101010; background: #fff; }
      .stage { display: inline-block; margin-bottom: 15px; padding: 7px 10px; border: 2px solid #101010; background: #ffd447; font-weight: 900; }
      dl { display: grid; grid-template-columns: minmax(130px, .7fr) minmax(0, 1.3fr); margin: 0; }
      dt, dd { margin: 0; padding: 9px 0; border-bottom: 1px solid #aaa; overflow-wrap: anywhere; }
      dt { font-weight: 800; }
      .timeline { margin: 0; padding: 0; list-style: none; }
      .timeline li { position: relative; padding: 0 0 18px 28px; border-left: 3px solid #101010; }
      .timeline li::before { position: absolute; top: 0; left: -8px; width: 13px; height: 13px; border: 2px solid #101010; border-radius: 50%; background: #ffd447; content: ''; }
      .notice { margin-top: 16px; padding: 14px 16px; border: 3px solid #101010; background: #edf5f2; font-weight: 700; }
      a { color: inherit; font-weight: 800; }
      @media (max-width: 680px) { .grid { grid-template-columns: 1fr; } dl { grid-template-columns: 1fr; } dd { padding-top: 0; } }
    </style>
  </head>
  <body>
    <main>
      <p><strong>Agent Friendly Web Canary</strong></p>
      <h1>Bandeja comercial sintetica</h1>
      <p>Muestra como se ordenaria una oportunidad comercial sin exponer una persona real ni habilitar acciones.</p>
      <div class="status"><span>Solo lectura</span><span>Dato sintetico</span><span>Sin correo</span><span>Sin pagos</span></div>
      <div class="grid" aria-live="polite">
        <section class="panel" aria-labelledby="opportunity-title">
          <h2 id="opportunity-title">Oportunidad preparada</h2>
          <span id="stage" class="stage">Cargando...</span>
          <dl>
            <dt>Dominio</dt><dd id="domain">Cargando...</dd>
            <dt>Segmento</dt><dd id="segment">Cargando...</dd>
            <dt>Necesidad</dt><dd id="problem">Cargando...</dd>
            <dt>Siguiente paso</dt><dd id="next-action">Cargando...</dd>
            <dt>Alcance</dt><dd id="scope">Cargando...</dd>
          </dl>
        </section>
        <section class="panel" aria-labelledby="timeline-title">
          <h2 id="timeline-title">Historia verificable</h2>
          <ol class="timeline"><li><strong id="transition">Cargando...</strong><br><span id="transition-date">Esperando lectura</span></li></ol>
          <p>La vista no cambia etapas. Solo representa la transicion ya registrada durante el gate sintetico.</p>
        </section>
      </div>
      <p id="result" class="notice" role="status">Leyendo la unica oportunidad sintetica permitida...</p>
      <p><a href="/canary/commercial-review">Volver a la revision comercial</a></p>
      <script>
        (() => {
          const labels = {
            qualified: 'Calificada', other: 'Otro segmento', discovery: 'Descubrimiento',
            confirm_interest: 'Confirmar interes', discovery_pack: 'Paquete de diagnostico',
            external_evidence: 'Evidencia externa', new: 'Nueva'
          };
          const set = (id, value) => {
            const node = document.getElementById(id);
            if (node) node.textContent = labels[value] || String(value || 'No disponible');
          };
          fetch('/api/canary/synthetic-crm-readonly', {
            method: 'GET', headers: { accept: 'application/json' }, cache: 'no-store'
          })
            .then(async (response) => {
              const payload = await response.json();
              if (!response.ok || payload.status !== 'synthetic_crm_readonly_ready') {
                throw new Error(String(payload.code || 'crm_readonly_unavailable'));
              }
              set('stage', payload.opportunity.stage);
              set('domain', payload.opportunity.domain);
              set('segment', payload.opportunity.segment);
              set('problem', payload.opportunity.problem);
              set('next-action', payload.opportunity.nextAction);
              set('scope', payload.opportunity.scopeCodes.map((code) => labels[code] || code).join(' + '));
              const transition = payload.timeline[0];
              set('transition', (labels[transition.fromStage] || transition.fromStage) + ' → ' + (labels[transition.toStage] || transition.toStage));
              set('transition-date', new Date(transition.createdAt).toLocaleString('es-AR'));
              set('result', 'Vista cargada. Ningun dato fue modificado y ninguna accion fue ejecutada.');
            })
            .catch(() => {
              set('result', 'No fue posible leer la oportunidad sintetica. No se ejecuto ninguna accion.');
            });
        })();
      </script>
    </main>
  </body>
</html>`;
}

export async function GET(request: Request) {
  const runtimeEnv = env as typeof env & { AFW_SYNTHETIC_CRM_READONLY_ENABLED?: string };
  if (
    env.AFW_CANARY_DIAGNOSTICS_ENABLED !== 'true'
    || runtimeEnv.AFW_SYNTHETIC_CRM_READONLY_ENABLED !== 'true'
  ) return new Response(null, { status: 404 });
  if (!(await accessIsVerified(request))) {
    return new Response(null, { status: 403, headers: noStoreHeaders });
  }
  return new Response(render(), { status: 200, headers: noStoreHeaders });
}
