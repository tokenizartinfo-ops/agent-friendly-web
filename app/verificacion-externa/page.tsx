import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, CircleAlert, ExternalLink, ShieldCheck } from '../components/client-icons';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';
import evidence from '../../public/.well-known/external-readiness.json';

const latest = evidence.observations.filter((item) => 'profile' in item);

export const metadata: Metadata = localizedRouteMetadata('externalVerification', 'es') as Metadata;

const verified = [
  'Markdown negociado con Vary: Accept',
  'ARD y AI Catalog compatibles',
  'WebMCP publico read-only',
  'Discovery, politica de bots, MCP y skills',
];

const next = [
  ['EV-1', 'Markdown, ARD y WebMCP read-only', 'Observados en el origen de produccion Cloudflare el 30 de septiembre de 2026.'],
  ['EV-2', 'DNS-AID y DNSSEC', 'El registro SVCB ya existe. DNSSEC sigue pendiente del registro DS en el dominio padre; todavia no pasa la comprobacion externa.'],
  ['EV-3', 'OAuth y auth.md', 'Solo junto con un recurso protegido y un authorization server real.'],
  ['EV-4', 'A2A', 'Solo despues de desplegar un agente remoto observable.'],
  ['EV-5', 'Comercio agentico', 'Solo para un servicio pago concreto, con reglas legales y contables.'],
];

export default function ExternalVerificationPage() {
  return (
    <main>
      <SiteHeader routeKey="externalVerification" />
      <section className="document-hero site-map-hero">
        <span>AF-EV · fotografia externa</span>
        <h1>Una medicion independiente, separada de nuestra escala AF.</h1>
        <p>Ultima consulta: 30 de septiembre de 2026, hora de Buenos Aires. Conservamos cada perfil y fecha; el resultado de contenido no sustituye la auditoria completa. No es una certificacion ni una garantia de indexacion.</p>
      </section>

      <section className="site-map-section" aria-labelledby="external-score-title">
        <div className="site-map-heading">
          <span>Resultado externo actual</span>
          <h2 id="external-score-title">Level 4 Agent-Integrated · perfil completo</h2>
          <p>El puntaje numerico no fue devuelto por el API. El baseline historico de agosto fue 53 / 100, Level 2; no es el puntaje actual.</p>
        </div>
        <div className="capability-list">
          {latest.map((observation) => (
            <article key={observation.observed_at}>
              <ShieldCheck size={18} />
              <div>
                <strong>{'profile' in observation && observation.profile === 'all' ? 'Perfil completo' : 'Perfil de contenido'} · Level {observation.level} {observation.label}</strong>
                <p>{observation.passed_checks.length} comprobaciones aprobadas; {observation.failed_checks.length} pendientes. Fecha UTC: <time dateTime={observation.observed_at}>{observation.observed_at}</time>.</p>
                {'profile' in observation && observation.profile === 'content' && <p>Excluye las comprobaciones de API y autenticacion. No demuestra AF-5 transaccional ni 100/100.</p>}
              </div>
            </article>
          ))}
        </div>
        <div className="capability-list">
          {verified.map((item) => (
            <article key={item}>
              <CheckCircle2 size={18} />
              <div><strong>{item}</strong><p>Activo en produccion y observado por el auditor externo.</p></div>
              <span>verified</span>
            </article>
          ))}
        </div>
      </section>

      <section className="roadmap-map" aria-labelledby="external-roadmap-title">
        <div className="site-map-heading">
          <span>Maximo aplicable, sin simulaciones</span>
          <h2 id="external-roadmap-title">Remediacion por gates.</h2>
          <p>No publicamos OAuth, A2A, DNS o pagos para sumar puntos. Cada senal positiva debe corresponder a una capacidad utilizable.</p>
        </div>
        <div className="roadmap-status-list">
          {next.map(([gate, name, detail]) => (
            <article key={gate}>
              {gate === 'EV-1' ? <ShieldCheck size={18} /> : <CircleAlert size={18} />}
              <div><strong>{name}</strong><p>{detail}</p></div>
              <span data-status={gate === 'EV-1' ? 'deployed' : 'planned'}>{gate}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="mcp-candidate-note">
        <div>
          <span>Evidencia machine-readable</span>
          <h2>El historial externo no sobreescribe la metodologia AF-0 a AF-5.</h2>
          <p>AF mide madurez propia. AF-EV conserva observaciones de terceros con proveedor, fecha, checks y limites.</p>
        </div>
        <a href="/.well-known/external-readiness.json">Abrir perfil AF-EV <ExternalLink size={17} /></a>
        <a href="https://isitagentready.com/agentfriendlyweb.dev" target="_blank" rel="noreferrer">Ver informe del proveedor <ArrowRight size={17} /></a>
      </section>
      <SiteFooter />
    </main>
  );
}
