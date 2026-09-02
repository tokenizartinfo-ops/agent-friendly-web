'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext requires stable document navigation here. */

import {
  BarChart3,
  BookOpenCheck,
  CalendarDays,
  CircleDollarSign,
  FileText,
  Gauge,
  LayoutDashboard,
  Mail,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type Opportunity = {
  label: string;
  opportunity: {
    opportunityId: string;
    domain: string;
    segment: string;
    problem: string;
    locale: string;
    stage: string;
    ownerContext: string;
    maintainerContext: string;
    scopeCodes: string[];
    estimatedValueBand: string;
    nextAction: string;
    nextActionAt: string | null;
    evidenceRefs: string[];
  };
  qualification: {
    total: number;
    maxTotal: number;
    qualification: string;
    recommendedOffer: string;
    nextAction: string;
    persistence: string;
    automaticOutreachAllowed: boolean;
  };
};

type Offer = {
  offerId: string;
  label: string;
  pricingMode: string;
  listUsd: number | null;
  pilotUsd: number | null;
  quoteRangeUsd?: number[];
  pilotSiteLimit?: number;
  pilotDurationDays?: number;
  status: string;
};

type CommercialSnapshot = {
  contract: string;
  mode: string;
  source: string;
  generatedAt: string;
  commercialActivationStarted: boolean;
  capabilities: Record<string, boolean>;
  blockedActions: string[];
  summary: {
    opportunityCount: number;
    prepareDiagnosticCount: number;
    humanReviewCount: number;
    plannedContentCount: number;
  };
  opportunities: Opportunity[];
  offers: Offer[];
  contentPlan: Array<{ contentId: string; channel: string; locale: string; topicCode: string; status: string }>;
  emailTemplates: Array<{ templateId: string; purposeCode: string; locale: string; status: string; requiresHumanReview: boolean; sendAllowed: boolean }>;
  metricDefinitions: Array<{ metricId: string; label: string; cadence: string; target: number; unit: string; status: string }>;
};

type ViewId = 'overview' | 'pipeline' | 'pricing' | 'content' | 'email' | 'metrics';

const tabs: Array<{ id: ViewId; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
  { id: 'pipeline', label: 'Pipeline', icon: BarChart3 },
  { id: 'pricing', label: 'Precios', icon: CircleDollarSign },
  { id: 'content', label: 'Contenido', icon: CalendarDays },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'metrics', label: 'Metricas', icon: Gauge },
];

const stageLabels: Record<string, string> = {
  new: 'Nuevo',
  qualified: 'Calificado',
  discovery: 'Relevamiento',
  proposal: 'Propuesta',
  approved: 'Aprobado',
  delivery: 'Entrega',
  verified: 'Verificado',
  won: 'Ganado',
  lost: 'Perdido',
};

const segmentLabels: Record<string, string> = {
  art_culture: 'Arte y cultura',
  restaurants_hospitality: 'Restaurantes',
  professional_services: 'Servicios profesionales',
  web_agency: 'Agencia web',
  public_institution: 'Institucion publica',
  commerce: 'Comercio',
  other: 'Otro',
};

const actionLabels: Record<string, string> = {
  confirm_interest: 'Confirmar interes',
  schedule_discovery: 'Coordinar relevamiento',
  prepare_scope: 'Preparar alcance',
  prepare_proposal: 'Preparar propuesta',
  request_approval: 'Solicitar aprobacion',
  start_delivery: 'Iniciar entrega',
  verify_delivery: 'Verificar entrega',
  close_won: 'Cerrar ganado',
  close_lost: 'Cerrar perdido',
  follow_up: 'Dar seguimiento',
};

const qualificationLabels: Record<string, string> = {
  prepare_diagnostic: 'Preparar diagnostico',
  nurture_and_clarify: 'Aclarar contexto',
  not_ready: 'Todavia no listo',
};

const offerLabels: Record<string, string> = {
  public_audit: 'Auditoria publica',
  guided_diagnostic: 'Diagnostico guiado',
  discovery_pack: 'Discovery Pack',
};

const topicLabels: Record<string, string> = {
  agent_readiness_basics: 'Como cambia el descubrimiento web',
  comic_af0_to_af5: 'Recorrido visual AF-0 a AF-5',
  before_after_explainer: 'Antes y despues verificable',
  mcp_a2a_x402_boundaries: 'MCP, A2A y x402 con limites',
};

const purposeLabels: Record<string, string> = {
  audit_result: 'Resultado de auditoria',
  guided_diagnostic: 'Diagnostico guiado',
  discovery_pack: 'Discovery Pack',
};

const problemLabels: Record<string, string> = {
  discovery: 'Baja capacidad de descubrimiento',
  content_clarity: 'Contenido poco claro para agentes',
  controlled_publication: 'Publicacion controlada por el owner',
  structured_data: 'Datos estructurados insuficientes',
  crawler_policy: 'Politica de crawlers incompleta',
};

const ownerContextLabels: Record<string, string> = {
  owner_verified: 'Owner verificado',
  authorized_manager: 'Gestor autorizado',
  owner_unverified: 'Owner por verificar',
};

const maintainerContextLabels: Record<string, string> = {
  external_maintainer: 'Mantenedor externo',
  owner_managed: 'Gestionado por el owner',
  unknown: 'Por confirmar',
};

const scopeLabels: Record<string, string> = {
  discovery_pack: 'Discovery Pack',
  external_evidence: 'Evidencia externa',
  controlled_publication: 'Publicacion controlada',
  custom_skill: 'Skill personalizada',
  af0_to_af3: 'Implementacion AF-0 a AF-3',
  monitoring: 'Seguimiento',
};

const pricingModeLabels: Record<string, string> = {
  free: 'Entrada gratuita',
  fixed_pilot_hypothesis: 'Precio piloto por validar',
  bounded_quote: 'Cotizacion dentro de un rango',
  custom_pdr_quote: 'PDR y cotizacion personalizada',
};

const workflowStatusLabels: Record<string, string> = {
  available_free_entry: 'Entrada gratuita disponible',
  launch_hypothesis_not_active: 'Hipotesis, todavia no activa',
  quote_required: 'Requiere cotizacion',
  pdr_required: 'Requiere PDR',
  draft_only: 'Borrador, sin publicar',
  outline_only: 'Esquema, sin publicar',
  structure_only: 'Estructura, sin enviar',
};

const cadenceLabels: Record<string, string> = {
  weekly: 'Semanal',
  monthly: 'Mensual',
};

const unitLabels: Record<string, string> = {
  count: 'Cantidad',
  percent_of_completed_audits: '% de auditorias completas',
  percent_of_proposals: '% de propuestas',
};

function usd(value: number | null) {
  return value === null ? 'Sin precio fijo' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function shortDate(value: string | null) {
  if (!value) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', timeZone: 'UTC' }).format(new Date(value));
}

function StatusPill({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: string }) {
  return <span className="commercial-control-pill" data-tone={tone}>{children}</span>;
}

function PipelineTable({ opportunities }: { opportunities: Opportunity[] }) {
  if (opportunities.length === 0) {
    return <div className="commercial-control-empty"><Search size={22} /><strong>No hay coincidencias.</strong><span>Cambia la busqueda o la etapa.</span></div>;
  }

  return (
    <div className="commercial-control-table-wrap">
      <table className="commercial-control-table">
        <thead><tr><th scope="col">Caso</th><th scope="col">Etapa</th><th scope="col">Calificacion</th><th scope="col">Siguiente paso</th><th scope="col">Detalle</th></tr></thead>
        <tbody>
          {opportunities.map((entry) => (
            <tr key={entry.opportunity.opportunityId}>
              <td><strong>{entry.label}</strong><small>{entry.opportunity.domain} · {segmentLabels[entry.opportunity.segment]}</small></td>
              <td><StatusPill tone={entry.opportunity.stage}>{stageLabels[entry.opportunity.stage]}</StatusPill></td>
              <td><strong>{entry.qualification.total}/{entry.qualification.maxTotal}</strong><small>{qualificationLabels[entry.qualification.qualification]}</small></td>
              <td><strong>{actionLabels[entry.opportunity.nextAction]}</strong><small>{shortDate(entry.opportunity.nextActionAt)}</small></td>
              <td>
                <details className="commercial-control-detail">
                  <summary>Ver ficha</summary>
                  <dl>
                    <div><dt>Problema</dt><dd>{problemLabels[entry.opportunity.problem] ?? entry.opportunity.problem}</dd></div>
                    <div><dt>Oferta sugerida</dt><dd>{offerLabels[entry.qualification.recommendedOffer]}</dd></div>
                    <div><dt>Owner</dt><dd>{ownerContextLabels[entry.opportunity.ownerContext] ?? entry.opportunity.ownerContext}</dd></div>
                    <div><dt>Mantenedor</dt><dd>{maintainerContextLabels[entry.opportunity.maintainerContext] ?? entry.opportunity.maintainerContext}</dd></div>
                    <div><dt>Alcance</dt><dd>{entry.opportunity.scopeCodes.map((scope) => scopeLabels[scope] ?? scope).join(', ')}</dd></div>
                  </dl>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CommercialControlDashboard({ snapshot }: { snapshot: CommercialSnapshot }) {
  const [activeView, setActiveView] = useState<ViewId>('overview');
  const [query, setQuery] = useState('');
  const [stage, setStage] = useState('all');

  const filteredOpportunities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return snapshot.opportunities.filter((entry) => {
      const matchesStage = stage === 'all' || entry.opportunity.stage === stage;
      const haystack = `${entry.label} ${entry.opportunity.domain} ${segmentLabels[entry.opportunity.segment]}`.toLowerCase();
      return matchesStage && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [query, snapshot.opportunities, stage]);

  const stageCounts = useMemo(() => Object.entries(stageLabels).map(([id, label]) => ({
    id,
    label,
    count: snapshot.opportunities.filter((entry) => entry.opportunity.stage === id).length,
  })).filter((entry) => entry.count > 0), [snapshot.opportunities]);

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveView(nextTab.id);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`#commercial-tab-${nextTab.id}`)
      ?.focus();
  }

  return (
    <main className="commercial-control-shell" lang="es">
      <header className="commercial-control-topbar">
        <a href="/" aria-label="Volver a Agent Friendly Web"><span>AF</span><strong>Agent Friendly Web</strong></a>
        <div><StatusPill tone="local">Datos sinteticos</StatusPill><span>Gate 6D.1</span></div>
      </header>

      <section className="commercial-control-intro">
        <div><span>Centro Comercial interno</span><h1>Una vista para decidir el siguiente trabajo.</h1><p>Pipeline, ofertas y aprendizaje comercial en un entorno local sin datos de clientes.</p></div>
        <aside><ShieldCheck size={21} /><strong>Sin envios ni pagos</strong><span>No persiste, publica ni modifica sitios.</span></aside>
      </section>

      <nav className="commercial-control-tabs" role="tablist" aria-label="Vistas del Centro Comercial">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return <button className="commercial-control-tab" id={`commercial-tab-${tab.id}`} type="button" role="tab" aria-selected={activeView === tab.id} aria-controls={`commercial-panel-${tab.id}`} tabIndex={activeView === tab.id ? 0 : -1} key={tab.id} onClick={() => setActiveView(tab.id)} onKeyDown={(event) => handleTabKeyDown(event, index)}><Icon size={17} />{tab.label}</button>;
        })}
      </nav>

      <div className="commercial-control-panels">
          <section id="commercial-panel-overview" role="tabpanel" aria-labelledby="commercial-tab-overview" className="commercial-control-panel" hidden={activeView !== 'overview'} tabIndex={0}>
            <header><div><span>Vista general</span><h2>Que requiere atencion</h2></div><small>Corte sintetico · 02 SEP 2026</small></header>
            <div className="commercial-control-kpis">
              <article><span>Casos</span><strong>{snapshot.summary.opportunityCount}</strong><small>solo ejemplos</small></article>
              <article><span>Preparar diagnostico</span><strong>{snapshot.summary.prepareDiagnosticCount}</strong><small>requiere revision</small></article>
              <article><span>Revision humana</span><strong>{snapshot.summary.humanReviewCount}</strong><small>no automatizar</small></article>
              <article><span>Contenido planeado</span><strong>{snapshot.summary.plannedContentCount}</strong><small>sin publicar</small></article>
            </div>
            <div className="commercial-control-overview-grid">
              <section><h3>Distribucion del pipeline</h3><div className="commercial-control-stage-bars">{stageCounts.map((entry) => <div key={entry.id}><span>{entry.label}</span><div><i style={{ width: `${Math.max(14, entry.count * 20)}%` }} /></div><strong>{entry.count}</strong></div>)}</div></section>
              <section><h3>Proximos pasos</h3><ol className="commercial-control-action-list">{snapshot.opportunities.slice(0, 4).map((entry) => <li key={entry.opportunity.opportunityId}><span>{shortDate(entry.opportunity.nextActionAt)}</span><div><strong>{actionLabels[entry.opportunity.nextAction]}</strong><small>{entry.label}</small></div></li>)}</ol></section>
            </div>
          </section>

          <section id="commercial-panel-pipeline" role="tabpanel" aria-labelledby="commercial-tab-pipeline" className="commercial-control-panel" hidden={activeView !== 'pipeline'} tabIndex={0}>
            <header><div><span>Pipeline</span><h2>Casos y siguiente paso</h2></div><small>{filteredOpportunities.length} de {snapshot.opportunities.length}</small></header>
            <div className="commercial-control-filters">
              <label><Search size={17} /><span className="sr-only">Buscar caso o dominio</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar caso o dominio" /></label>
              <label><span className="sr-only">Filtrar por etapa</span><select value={stage} onChange={(event) => setStage(event.target.value)}><option value="all">Todas las etapas</option>{Object.entries(stageLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            </div>
            <PipelineTable opportunities={filteredOpportunities} />
          </section>

          <section id="commercial-panel-pricing" role="tabpanel" aria-labelledby="commercial-tab-pricing" className="commercial-control-panel" hidden={activeView !== 'pricing'} tabIndex={0}>
            <header><div><span>Hipotesis de precio</span><h2>Que puede estandarizarse y que exige PDR</h2></div><StatusPill tone="review">No publicado</StatusPill></header>
            <div className="commercial-control-table-wrap"><table className="commercial-control-table"><thead><tr><th scope="col">Oferta</th><th scope="col">Referencia</th><th scope="col">Piloto</th><th scope="col">Modalidad</th></tr></thead><tbody>{snapshot.offers.map((offer) => <tr key={offer.offerId}><td><strong>{offer.label}</strong><small>{workflowStatusLabels[offer.status] ?? offer.status}</small></td><td>{offer.quoteRangeUsd ? `${usd(offer.quoteRangeUsd[0])} a ${usd(offer.quoteRangeUsd[1])}` : usd(offer.listUsd)}</td><td>{offer.pilotUsd === null ? 'Cotizacion particular' : usd(offer.pilotUsd)}{offer.pilotSiteLimit && <small>Primeros {offer.pilotSiteLimit} sitios o {offer.pilotDurationDays} dias</small>}</td><td><StatusPill tone={offer.pricingMode.includes('custom') ? 'review' : 'neutral'}>{pricingModeLabels[offer.pricingMode] ?? offer.pricingMode}</StatusPill></td></tr>)}</tbody></table></div>
          </section>

          <section id="commercial-panel-content" role="tabpanel" aria-labelledby="commercial-tab-content" className="commercial-control-panel" hidden={activeView !== 'content'} tabIndex={0}>
            <header><div><span>Contenido</span><h2>Cola editorial preliminar</h2></div><StatusPill tone="review">Borradores</StatusPill></header>
            <div className="commercial-control-list">{snapshot.contentPlan.map((item, index) => <article key={item.contentId}><span>{String(index + 1).padStart(2, '0')}</span><BookOpenCheck size={20} /><div><strong>{topicLabels[item.topicCode]}</strong><small>{item.channel} · {item.locale.toUpperCase()}</small></div><StatusPill>{workflowStatusLabels[item.status] ?? item.status}</StatusPill></article>)}</div>
          </section>

          <section id="commercial-panel-email" role="tabpanel" aria-labelledby="commercial-tab-email" className="commercial-control-panel" hidden={activeView !== 'email'} tabIndex={0}>
            <header><div><span>Email</span><h2>Estructuras pendientes de contenido y revision</h2></div><StatusPill tone="blocked">Envio bloqueado</StatusPill></header>
            <div className="commercial-control-list">{snapshot.emailTemplates.map((item, index) => <article key={item.templateId}><span>{String(index + 1).padStart(2, '0')}</span><Mail size={20} /><div><strong>{purposeLabels[item.purposeCode]}</strong><small>{item.locale.toUpperCase()} · sin destinatario ni cuerpo</small></div><StatusPill tone="review">{workflowStatusLabels[item.status] ?? item.status}</StatusPill></article>)}</div>
          </section>

          <section id="commercial-panel-metrics" role="tabpanel" aria-labelledby="commercial-tab-metrics" className="commercial-control-panel" hidden={activeView !== 'metrics'} tabIndex={0}>
            <header><div><span>Medicion</span><h2>Umbrales para aprender, no promesas</h2></div><StatusPill tone="review">Hipotesis iniciales</StatusPill></header>
            <div className="commercial-control-metrics">{snapshot.metricDefinitions.map((metric) => <article key={metric.metricId}><FileText size={20} /><div><span>{cadenceLabels[metric.cadence] ?? metric.cadence}</span><strong>{metric.label}</strong><small>{unitLabels[metric.unit] ?? metric.unit}</small></div><b>{metric.target}</b></article>)}</div>
          </section>
      </div>

      <footer className="commercial-control-footer"><span>{snapshot.contract}</span><span>Fuente: {snapshot.source}</span><strong>Acciones remotas: 0</strong></footer>
    </main>
  );
}
