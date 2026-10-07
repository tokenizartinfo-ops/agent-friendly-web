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
} from '../../components/client-icons';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { localizedRouteMetadata } from '../../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('tokenizartCase', 'es') as Metadata;

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
  ['P0', 'Verdad publica', 'Guia e indice de recursos publicados. Traducciones, metadata y revision editorial completa siguen pendientes.', 'Avance parcial'],
  ['P1', 'Lectura por agentes', 'WordPress: llms y sitemap verificados. Atelier: llms pendiente. Plugin de Link headers desactivado tras verificacion fallida.', 'Entrega parcial'],
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
  ['Leonardo', 'Facilita acceso y coordinacion del sitio y hosting de WordPress.'],
  ['Leandro', 'Aporta contexto tecnico y accesos para comprender Atelier y preparar cambios acotados.'],
  ['Codex', 'Realiza implementacion asistida autorizada, pruebas, rollback y documentacion; no sustituye aprobaciones ni evidencia de despliegue.'],
];

export default function TokenizartCasePage() {
  return (
    <main>
      <SiteHeader routeKey="tokenizartCase" />
      <section className="case-hero">
        <div>
          <span>Primer caso integral · revision 2026-09-09</span>
          <h1>Tokenizart: una infraestructura preparada para humanos y agentes.</h1>
          <p>
            El caso conecta contenido publico, crawlers, CLI, MCP, skills y futuras herramientas owner-scoped.
            Cada capacidad se publica cuando es real, verificable y segura.
          </p>
          <div className="case-actions">
            <a href="/registry/tokenizart">Ver perfil en Registry <ArrowRight size={17} /></a>
            <a href="/?site=tokenizart.com#auditar">Repetir auditoria <ArrowRight size={17} /></a>
            <a href="https://tokenizart.com/#agent-resources">Ver recursos publicados <ExternalLink size={16} /></a>
          </div>
        </div>
        <aside>
          <Layers3 size={26} />
          <strong>Como se compone</strong>
          <p>Tokenizart explica y conecta el ecosistema. Atelier es la plataforma donde un usuario autenticado prepara y opera sus obras u objetos.</p>
        </aside>
      </section>

      <section className="architecture-band" aria-labelledby="published-title">
        <div><span>Publicacion verificada: 2026-09-09</span><h2 id="published-title">Lo que ya puede consultarse en Tokenizart.com</h2></div>
        <div className="case-source-links">
          <a href="https://tokenizart.com/es/tokenizart-y-atelier-guia-publica-y-descubrimiento-agentico/">Guia publica de Tokenizart y Atelier</a>
          <a href="https://tokenizart.com/llms.txt">llms.txt vigente</a>
          <a href="https://tokenizart.com/llms-full.txt">llms-full.txt vigente</a>
          <a href="https://tokenizart.com/wp-sitemap.xml">Sitemap WordPress</a>
          <a href="https://tokenizart.com/#agent-resources">Indice y acceso desde menus</a>
        </div>
        <p>Verificados mediante acceso publico. Esto no significa indexacion por una LLM ni habilita operaciones de cuenta. Atelier es un origen separado: su llms.txt devolvio 404 en esta revision.</p>
        <p>36/100 en AFW, reportados por Gabriel el 2026-09-09; pendiente de una medicion independiente reproducible. No se asigna un nuevo nivel AF a partir de este reporte.</p>
      </section>

      <section className="case-score-band" aria-labelledby="baseline-title">
        <div className="section-heading plain">
          <div><span>Baseline historico del 2026-08-26</span><h2 id="baseline-title">Tres superficies, dos auditores</h2></div>
          <p>Valores conservados como referencia historica, no puntajes actuales. Cloudflare y AF usan escalas diferentes.</p>
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
          <div className="section-heading plain"><div><span>Candidatos del 2026-08-26</span><h2>Paquete historico de referencia</h2></div></div>
          <p>No instalar este ZIP sobre los archivos actuales. Conserva propuestas anteriores y no representa lo publicado hoy. Los enlaces de produccion estan en la seccion superior.</p>
          <div className="download-list">
            {downloads.map(([name, href, detail]) => (
              <a href={href} key={href}>
                <span><Download size={16} /></span>
                <div><strong>{name}</strong><small>{detail}</small></div>
                <ArrowRight size={16} />
              </a>
            ))}
          </div>
          <p className="table-note">Estos archivos son candidatos historicos. Cada cambio requiere comparar el origen actual, revisar alcance y probar rollback. WordPress y Atelier se verifican por separado.</p>
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
import type { Metadata } from 'next';
