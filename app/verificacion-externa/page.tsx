import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, CircleAlert, ExternalLink, ShieldCheck } from 'lucide-react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Verificacion externa AF-EV | Agent Friendly Web',
  description: 'Baseline externo fechado, diferencias con AF-0 a AF-5 y roadmap honesto de remediacion.',
};

const verified = [
  'Markdown negociado con Vary: Accept',
  'ARD y AI Catalog compatibles',
  'WebMCP publico read-only',
  'Discovery, politica de bots, MCP y skills',
];

const next = [
  ['EV-1', 'Markdown, ARD y WebMCP read-only', 'Desplegado en Sites 27 y verificado externamente.'],
  ['EV-2', 'DNS-AID y DNSSEC', 'Requiere analisis de zona, rollback y aprobacion especifica.'],
  ['EV-3', 'OAuth y auth.md', 'Solo junto con un recurso protegido y un authorization server real.'],
  ['EV-4', 'A2A', 'Solo despues de desplegar un agente remoto observable.'],
  ['EV-5', 'Comercio agentico', 'Solo para un servicio pago concreto, con reglas legales y contables.'],
];

export default function ExternalVerificationPage() {
  return (
    <main>
      <SiteHeader />
      <section className="document-hero site-map-hero">
        <span>AF-EV · fotografia externa</span>
        <h1>Una medicion independiente, separada de nuestra escala AF.</h1>
        <p>Cloudflare observo el origen publico el 30 de agosto de 2026. Conservamos el resultado, lo que paso, lo que falta y la fecha. No lo presentamos como certificacion ni como garantia de indexacion.</p>
      </section>

      <section className="site-map-section" aria-labelledby="external-score-title">
        <div className="site-map-heading">
          <span>Antes y despues</span>
          <h2 id="external-score-title">53 / 100 · Level 2 → Level 4 Agent-Integrated</h2>
          <p>El baseline devolvio 53/100. La reauditoria posterior devolvio Level 4 y el detalle de checks, pero el puntaje numerico no fue devuelto por el API; por eso no inventamos una cifra.</p>
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
