import { ArrowRight, Beaker, CheckCircle2, FileCheck2, ShieldCheck } from 'lucide-react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

const layers = [
  ['AF-0', 'Invisible', 'No hay señales suficientes para descubrir o interpretar el sitio.'],
  ['AF-1', 'Descubrible', 'Rastreo y sitemap permiten localizar contenidos publicos.'],
  ['AF-2', 'Legible', 'El contenido ofrece respuestas claras, estructura y formatos accesibles.'],
  ['AF-3', 'Con herramientas', 'APIs, MCP o skills cuentan con contratos publicos verificables.'],
  ['AF-4', 'Delegable', 'Un agente puede actuar con identidad, permisos, limites y auditoria.'],
  ['AF-5', 'Transaccional', 'Puede completar operaciones y pagos con seguridad y consentimiento.'],
];

export default function MethodologyPage() {
  return (
    <main>
      <SiteHeader routeKey="methodology" />
      <section className="document-hero">
        <span>Metodologia abierta v1</span>
        <h1>Medir evidencia antes de prometer capacidades agenticas.</h1>
        <p>El modelo AF-0 a AF-5 fue creado por Gabriel Mucchiut para ordenar una transformacion progresiva. No es una norma oficial ni una certificacion de terceros.</p>
      </section>
      <section className="method-grid">
        <article className="method-copy">
          <h2>Siete capas, una lectura honesta</h2>
          <p>La puntuacion combina descubrimiento, capacidad de respuesta, contenido legible por maquinas, herramientas, tecnologias experimentales, confianza y comercio agentico. Cada punto debe corresponder a una señal publica observada.</p>
          <p>La version 0.2 del auditor agrega diagnosticos de Content Signals, politica de crawlers, API Catalog, catalogos de recursos y Agent Skills sin modificar el puntaje AF v1. Asi se conserva la comparabilidad historica mientras calibramos esas señales.</p>
          <div className="principle-list">
            <div><CheckCircle2 /><span><strong>Evidencia</strong> Una ruta que devuelve 404 no cuenta.</span></div>
            <div><FileCheck2 /><span><strong>Procedencia</strong> Las afirmaciones necesitan fuente, fecha y responsable.</span></div>
            <div><ShieldCheck /><span><strong>Control</strong> Ninguna herramienta mutante se expone sin identidad, alcance y auditoria.</span></div>
            <div><Beaker /><span><strong>Madurez</strong> Propuestas y borradores se distinguen de estandares estables.</span></div>
          </div>
        </article>
        <aside className="standards-panel">
          <span>Estado normativo</span>
          <div><strong>robots.txt, sitemap, JSON-LD y OpenAPI</strong><p>Bases estables y ampliamente utilizadas.</p></div>
          <div><strong>MCP 2026-07-28</strong><p>Protocolo vigente para exponer contexto y herramientas.</p></div>
          <div><strong>A2A 1.0</strong><p>Protocolo abierto para descubrimiento y colaboracion entre agentes; no esta desplegado aqui.</p></div>
          <div><strong>llms.txt</strong><p>Propuesta comunitaria; util como indice, no garantia de indexacion.</p></div>
          <div><strong>WebMCP</strong><p>Borrador de W3C Community Group, todavia experimental.</p></div>
          <div><strong>x402 y MPP</strong><p>Opciones emergentes para pagos agenticos; requieren evaluacion por caso.</p></div>
        </aside>
      </section>
      <section className="maturity-section">
        <div className="section-heading plain"><div><span>Roadmap</span><h2>Niveles de madurez</h2></div></div>
        <div className="maturity-list">{layers.map(([level, title, detail]) => <div key={level}><span>{level}</span><strong>{title}</strong><p>{detail}</p></div>)}</div>
      </section>
      <section className="source-band">
        <div><span>Fuentes primarias</span><h2>La metodologia enlaza la documentacion que sostiene cada recomendacion.</h2></div>
        <div className="source-links">
          <a href="https://modelcontextprotocol.io/specification/2026-07-28" target="_blank" rel="noreferrer">MCP Specification <ArrowRight size={16} /></a>
          <a href="https://webmachinelearning.github.io/webmcp/" target="_blank" rel="noreferrer">WebMCP draft <ArrowRight size={16} /></a>
          <a href="https://llmstxt.org/" target="_blank" rel="noreferrer">llms.txt proposal <ArrowRight size={16} /></a>
          <a href="https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/" target="_blank" rel="noreferrer">Markdown for Agents <ArrowRight size={16} /></a>
          <a href="https://a2a-protocol.org/latest/specification" target="_blank" rel="noreferrer">A2A Specification <ArrowRight size={16} /></a>
          <a href="https://github.com/x402-foundation/x402" target="_blank" rel="noreferrer">x402 Specification <ArrowRight size={16} /></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
