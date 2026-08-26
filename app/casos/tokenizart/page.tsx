import { ArrowRight, Check, CircleAlert, GitBranch, Layers3 } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '../../components/site-header';

const observations = [
  ['robots.txt', 'Detectado', true],
  ['sitemap.xml', 'Detectado', true],
  ['llms.txt', 'No detectado', false],
  ['llms-full.txt', 'No detectado', false],
  ['/.well-known/mcp.json', 'No detectado', false],
  ['/api/openapi.json', 'No detectado', false],
  ['Markdown negociado', 'No detectado', false],
];

export default function TokenizartCasePage() {
  return (
    <main>
      <SiteHeader />
      <section className="case-hero">
        <div>
          <span>Primer caso integral</span>
          <h1>Tokenizart: de presencia publica a infraestructura agent-first.</h1>
          <p>Este caso conecta auditoria web, conocimiento publico, CLI, MCP, skills y herramientas owner-scoped sin confundir lo disponible hoy con el roadmap.</p>
          <Link href="/?site=tokenizart.com#auditar">Repetir auditoria publica <ArrowRight size={17} /></Link>
        </div>
        <aside><Layers3 size={26} /><strong>Principio rector</strong><p>Interoperabilidad abierta, conocimiento atribuible, ejecucion propietaria y marca protegida.</p></aside>
      </section>
      <section className="case-grid">
        <article className="evidence-table">
          <div className="section-heading plain"><div><span>Baseline 2026-08-26</span><h2>Señales publicas observadas</h2></div></div>
          {observations.map(([resource, state, detected]) => <div className="evidence-row" key={String(resource)}><span className={detected ? 'positive' : 'negative'}>{detected ? <Check size={16} /> : <CircleAlert size={16} />}</span><strong>{resource}</strong><small>{state}</small></div>)}
          <p className="table-note">Este registro es reproducible y debe actualizarse cuando cambie el sitio. No acredita herramientas privadas ni desarrollos en ramas no publicadas.</p>
        </article>
        <aside className="case-roadmap">
          <div className="journey-icon"><GitBranch size={22} /></div>
          <span>Prelacion</span>
          <h2>Que se publica primero</h2>
          <ol>
            <li><span>1</span><div><strong>Contenido verificable</strong><small>Actualizar explicaciones, fuentes y datos estructurados.</small></div></li>
            <li><span>2</span><div><strong>Indice para agentes</strong><small>Publicar llms.txt y rutas documentales sin sobreafirmar soporte.</small></div></li>
            <li><span>3</span><div><strong>Herramientas read-only</strong><small>Documentar CLI, skills y MCP efectivamente disponibles.</small></div></li>
            <li><span>4</span><div><strong>Acciones con consentimiento</strong><small>Separar identidad, permisos, auditoria y monetizacion.</small></div></li>
          </ol>
        </aside>
      </section>
      <section className="architecture-band">
        <div><span>Arquitectura conectada</span><h2>El sitio no reemplaza el producto agentico.</h2></div>
        <p>La web mejora descubrimiento y comprension. El repositorio <strong>tokenizart-agentic</strong> conserva contratos de CLI, MCP, skills y OKF. Owner Live permanece separado, autenticado y read-only hasta superar sus propios gates.</p>
      </section>
    </main>
  );
}
