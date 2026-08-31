/* eslint-disable @next/next/no-html-link-for-pages -- Plain anchors avoid unstable vinext RSC prefetch requests. */

import {
  ArrowRight,
  Check,
  CircleAlert,
  CircleDashed,
  Download,
  ExternalLink,
  FileCheck2,
  GitBranch,
  Globe2,
  Layers3,
  ServerCog,
  ShieldCheck,
} from 'lucide-react';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

const surfaces = [
  {
    name: 'Tokenizart',
    url: 'tokenizart.com',
    score: 23,
    level: 'AF-1',
    external: 'Cloudflare Level 1',
    state: 'Descubrible',
    detail: 'Robots y sitemap presentes. Falta ordenar contenido, metadata y recursos para agentes.',
  },
  {
    name: 'Atelier',
    url: 'atelier.tokenizart.com',
    score: 14,
    level: 'AF-0',
    external: 'Cloudflare Level 0',
    state: 'Baseline minimo',
    detail: 'Es la plataforma operativa. Tiene robots, pero aun no sitemap, llms ni metadata publica suficiente.',
  },
  {
    name: 'Agent Friendly Web',
    url: 'agentfriendlyweb.dev',
    score: 70,
    level: 'AF-3',
    external: 'Cloudflare Level 2 · Bot-Aware',
    state: 'Herramientas publicas',
    detail: 'Subio desde 63/100 tras publicar politica crawler explicita, documentos agenticos, catalogos, OpenAPI, skills y evidencia de autoria.',
  },
];

const phases = [
  ['P0', 'Verdad publica', 'Corregir idioma, portada, H1, descripciones, duplicados y JSON-LD.', 'En preparacion'],
  ['P1', 'Lectura por agentes', 'Instalar llms, politica crawler, sitemap Atelier y Link headers.', 'Paquete listo'],
  ['P2', 'Herramientas reales', 'Publicar CLI, skills, OpenAPI y MCP solo con version y URL verificadas.', 'Release candidate'],
  ['P3', 'Owner Live', 'Identidad, consentimiento, scopes, revocacion y auditoria read-only.', 'Gate separado'],
  ['P4', 'Acciones y pagos', 'Contratos seguros para acciones y eventual x402/MPP.', 'No iniciado'],
];

const downloads = [
  ['Paquete completo ZIP', '/cases/tokenizart/tokenizart-agent-friendly-package-2026-08-26.zip', 'Todos los candidatos, manifiesto, checksums y guia de instalacion.'],
  ['Guia de instalacion', '/cases/tokenizart/RUNBOOK.es.md', 'Orden, pruebas y rollback para WordPress y Atelier.'],
  ['Tokenizart llms.txt', '/cases/tokenizart/tokenizart.com/llms.txt', 'Indice publico corto para agentes.'],
  ['Tokenizart llms-full.txt', '/cases/tokenizart/tokenizart.com/llms-full.txt', 'Contexto publico extendido y limites.'],
  ['Robots Tokenizart', '/cases/tokenizart/tokenizart.com/robots.proposed.txt', 'Propuesta que conserva reglas WordPress/WooCommerce.'],
  ['JSON-LD Tokenizart', '/cases/tokenizart/tokenizart.com/structured-data.json', 'Identidad del sitio y relacion con Atelier.'],
  ['Atelier llms.txt', '/cases/tokenizart/atelier.tokenizart.com/llms.txt', 'Explica que Atelier es la plataforma operativa.'],
  ['Atelier llms-full.txt', '/cases/tokenizart/atelier.tokenizart.com/llms-full.txt', 'Flujos, seguridad y limites publicos.'],
  ['Robots Atelier', '/cases/tokenizart/atelier.tokenizart.com/robots.proposed.txt', 'Mantiene las APIs fuera del rastreo.'],
  ['Sitemap Atelier', '/cases/tokenizart/atelier.tokenizart.com/sitemap.proposed.xml', 'Baseline inicial; luego debe generarse desde el source real.'],
  ['Manifiesto del paquete', '/cases/tokenizart/manifest.json', 'Targets, fecha, estado y exclusiones.'],
];

const owners = [
  ['Gabriel', 'Aprueba contenido publico, politica de entrenamiento y ventanas de produccion.'],
  ['Leonardo', 'Implementa el bloque editorial y los archivos raiz de WordPress con backup.'],
  ['Leandro', 'Verifica Cloudflare, cabeceras y prepara el cambio en el source real de Atelier.'],
  ['Codex', 'Mantiene archivos, pruebas, auditorias comparativas y trazabilidad del caso.'],
];

export default function TokenizartCasePage() {
  return (
    <main>
      <SiteHeader routeKey="tokenizartCase" />
      <section className="case-hero">
        <div>
          <span>Primer caso integral · corte 2026-08-26</span>
          <h1>Tokenizart: una infraestructura preparada para humanos y agentes.</h1>
          <p>
            El caso conecta contenido publico, crawlers, CLI, MCP, skills y futuras herramientas owner-scoped.
            Cada capacidad se publica cuando es real, verificable y segura.
          </p>
          <div className="case-actions">
            <a href="/registry/tokenizart">Ver perfil en Registry <ArrowRight size={17} /></a>
            <a href="/?site=tokenizart.com#auditar">Repetir auditoria <ArrowRight size={17} /></a>
            <a href="/cases/tokenizart/RUNBOOK.es.md">Abrir guia de instalacion <ExternalLink size={16} /></a>
          </div>
        </div>
        <aside>
          <Layers3 size={26} />
          <strong>Como se compone</strong>
          <p>Tokenizart explica y conecta el ecosistema. Atelier es la plataforma donde un usuario autenticado prepara y opera sus obras u objetos.</p>
        </aside>
      </section>

      <section className="case-score-band" aria-labelledby="baseline-title">
        <div className="section-heading plain">
          <div><span>Baseline doble</span><h2 id="baseline-title">Tres superficies, dos auditores</h2></div>
          <p>Los niveles de Cloudflare y AF usan escalas diferentes.</p>
        </div>
        <div className="surface-grid">
          {surfaces.map((surface) => (
            <article className="surface-card" key={surface.url}>
              <div className="surface-card-head"><Globe2 size={20} /><span>{surface.state}</span></div>
              <h3>{surface.name}</h3>
              <small>{surface.url}</small>
              <div className="surface-score"><strong>{surface.score}</strong><span>/100 · {surface.level}</span></div>
              <div className="mini-meter"><span style={{ width: `${surface.score}%` }} /></div>
              <p>{surface.detail}</p>
              <div className="external-result">{surface.external}</div>
            </article>
          ))}
        </div>
        <p className="case-disclaimer">HTTP 200 para un crawler demuestra acceso en una prueba; no demuestra indexacion, recomendacion ni permiso de entrenamiento.</p>
      </section>

      <section className="atelier-explainer">
        <div className="journey-icon"><ServerCog size={22} /></div>
        <div><span>Relacion del producto</span><h2>Atelier es donde realmente sucede la operacion.</h2></div>
        <p>El sitio de Tokenizart presenta la propuesta, el conocimiento y los accesos. Atelier es el entorno autenticado para preparar registros y realizar acciones habilitadas. Companion explica; Demo Atelier simula; Owner Live, cuando supere sus gates, solo leera contexto consentido.</p>
      </section>

      <section className="case-progress" aria-labelledby="progress-title">
        <div className="section-heading plain">
          <div><span>Roadmap verificable</span><h2 id="progress-title">Del contenido a la delegacion</h2></div>
        </div>
        <div className="phase-list">
          {phases.map(([id, title, detail, status]) => (
            <article key={id}>
              <span>{id}</span>
              <div><h3>{title}</h3><p>{detail}</p></div>
              <strong>{status}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="case-grid">
        <article className="evidence-table">
          <div className="section-heading plain"><div><span>Paquete P0/P1</span><h2>Archivos listos para revision</h2></div></div>
          <div className="download-list">
            {downloads.map(([name, href, detail]) => (
              <a href={href} key={href}>
                <span><Download size={16} /></span>
                <div><strong>{name}</strong><small>{detail}</small></div>
                <ArrowRight size={16} />
              </a>
            ))}
          </div>
          <p className="table-note">“Listo” significa preparado en este repositorio. La capacidad cuenta como disponible solo cuando la URL canonica de produccion responde correctamente.</p>
        </article>

        <aside className="case-roadmap">
          <div className="journey-icon"><GitBranch size={22} /></div>
          <span>Responsables</span>
          <h2>Quien hace cada parte</h2>
          <ol>
            {owners.map(([owner, task], index) => (
              <li key={owner}><span>{index + 1}</span><div><strong>{owner}</strong><small>{task}</small></div></li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="gate-band">
        <article><Check size={20} /><div><strong>Publicable tras revision</strong><p>Contenido, llms, robots, sitemap y JSON-LD coherentes con la experiencia humana.</p></div></article>
        <article><CircleDashed size={20} /><div><strong>Release candidate</strong><p>CLI, skills, MCP y OKF existen, pero necesitan distribucion y endpoints estables.</p></div></article>
        <article><ShieldCheck size={20} /><div><strong>Gate separado</strong><p>Owner Live y toda accion real conservan identidad, consentimiento, auditoria y aprobacion.</p></div></article>
        <article><CircleAlert size={20} /><div><strong>No simular capacidades</strong><p>No se publican MCP, OpenAPI, pagos ni permisos que el origen todavia no ofrece.</p></div></article>
      </section>

      <section className="architecture-band">
        <div><span>Fuentes y metodo</span><h2>La mejora queda auditable.</h2></div>
        <div className="case-source-links">
          <a href="https://developers.cloudflare.com/ai-crawl-control/" target="_blank" rel="noreferrer"><FileCheck2 size={16} /> AI Crawl Control <ExternalLink size={14} /></a>
          <a href="https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/" target="_blank" rel="noreferrer"><FileCheck2 size={16} /> Markdown for Agents <ExternalLink size={14} /></a>
          <a href="https://github.com/tokenizartinfo-ops/tokenizart-agentic" target="_blank" rel="noreferrer"><FileCheck2 size={16} /> Tokenizart Agentic <ExternalLink size={14} /></a>
          <a href="https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/main/docs/TOKENIZART-CASE-2026-08-26.md" target="_blank" rel="noreferrer"><FileCheck2 size={16} /> Informe completo <ExternalLink size={14} /></a>
          <a href="/registry/tokenizart/profile.json"><FileCheck2 size={16} /> Perfil Registry JSON <ExternalLink size={14} /></a>
          <a href="/registry/tokenizart/profile.md"><FileCheck2 size={16} /> Perfil Registry Markdown <ExternalLink size={14} /></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
