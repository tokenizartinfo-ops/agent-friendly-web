import {
  ArrowRight,
  Bot,
  Braces,
  CheckCircle2,
  CircleDashed,
  Compass,
  ExternalLink,
  FileCode2,
  FileText,
  LockKeyhole,
  Map,
  Radar,
  Route,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '../components/site-header';

const humanRoutes = [
  { name: 'Auditor publico', detail: 'Comprueba evidencia visible sin modificar el sitio.', href: '/#auditar', icon: Radar },
  { name: 'Evolucion agentica', detail: 'Compara AF-0 a AF-5 mediante casos ilustrativos.', href: '/evolucion-agentica', icon: Route },
  { name: 'Metodologia', detail: 'Explica el puntaje, sus limites y las fuentes primarias.', href: '/metodologia', icon: Compass },
  { name: 'Caso Tokenizart', detail: 'Primer caso integral, con archivos y progreso verificable.', href: '/casos/tokenizart', icon: CheckCircle2 },
  { name: 'Mi expediente', detail: 'Area privada para ordenar contexto y un roadmap propio.', href: '/expediente', icon: LockKeyhole },
];

const machineResources = [
  { name: 'robots.txt', detail: 'Politica publica de rastreo y Content Signals.', href: '/robots.txt', icon: Bot },
  { name: 'sitemap.xml', detail: 'Indice canonico de paginas HTML publicas.', href: '/sitemap.xml', icon: Map },
  { name: 'llms.txt', detail: 'Indice conciso propuesto para asistentes y agentes.', href: '/llms.txt', icon: FileText },
  { name: 'llms-full.txt', detail: 'Contexto publico ampliado, limites y procedencia.', href: '/llms-full.txt', icon: FileText },
  { name: 'OpenAPI', detail: 'Contrato verificable del scanner publico.', href: '/openapi.json', icon: Braces },
  { name: 'API Catalog', detail: 'Catalogo de superficies y capacidades publicadas.', href: '/api-catalog', icon: FileCode2 },
  { name: 'AI Catalog', detail: 'Recursos publicos destinados al descubrimiento.', href: '/.well-known/ai-catalog.json', icon: Bot },
  { name: 'Agent Skill', detail: 'Instrucciones publicas para ejecutar una auditoria.', href: '/skills/agent-friendly-web-audit/SKILL.md', icon: Braces },
  { name: 'Readiness manifest', detail: 'Estado machine-readable de capacidades y limites.', href: '/.well-known/agent-readiness.json', icon: ShieldCheck },
  { name: 'Security policy', detail: 'Canal y alcance para reportar problemas de seguridad.', href: '/.well-known/security.txt', icon: ShieldCheck },
];

const activeCapabilities = [
  ['Scanner publico', 'Activo', 'Auditoria read-only de recursos publicos.'],
  ['Expediente autenticado', 'Activo', 'Contexto privado aislado por identidad.'],
  ['Demostrador AF', 'Activo', 'Ejemplos educativos de madurez agentica.'],
  ['Paquete Tokenizart', 'Activo', 'Archivos descargables con manifiesto y checksums.'],
];

const roadmap = [
  ['Markdown negociado', 'planned', 'La respuesta text/markdown todavia no esta activa en el origen.'],
  ['Registry publico', 'planned', 'Requerira dominio verificado y consentimiento de publicacion.'],
  ['MCP', 'planned', 'No existe un endpoint MCP ejecutable en esta version.'],
  ['A2A', 'planned', 'No se publica Agent Card ni delegacion entre agentes.'],
  ['CLI', 'planned', 'No existe una distribucion oficial instalable.'],
  ['x402', 'research', 'No hay recursos pagos ni flujo HTTP 402 activo.'],
];

export default function SiteMapPage() {
  return (
    <main>
      <SiteHeader />
      <section className="document-hero site-map-hero">
        <span>Mapa humano y agentico</span>
        <h1>Todo lo que Agent Friendly Web publica, en un solo lugar.</h1>
        <p>Este mapa separa paginas humanas, recursos para maquinas, capacidades activas y trabajo futuro. Si algo aun no existe, se muestra como roadmap y no como herramienta disponible.</p>
      </section>

      <section className="site-map-section" aria-labelledby="human-map-title">
        <div className="site-map-heading">
          <span>Recorridos</span>
          <h2 id="human-map-title">Para propietarios y equipos</h2>
          <p>Empieza con una auditoria o abre el expediente privado cuando quieras convertir hallazgos en un plan.</p>
        </div>
        <div className="resource-list">
          {humanRoutes.map(({ name, detail, href, icon: Icon }) => (
            <Link href={href} className="resource-row" key={href}>
              <span className="resource-icon"><Icon size={19} /></span>
              <span><strong>{name}</strong><small>{detail}</small></span>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="site-map-section machine-map" aria-labelledby="machine-map-title">
        <div className="site-map-heading">
          <span>Descubrimiento</span>
          <h2 id="machine-map-title">Para agentes y buscadores</h2>
          <p>Todos los enlaces abren el recurso real publicado en el origen canonico.</p>
        </div>
        <div className="machine-resource-grid">
          {machineResources.map(({ name, detail, href, icon: Icon }) => (
            <a href={href} className="machine-resource" key={href}>
              <Icon size={18} />
              <span><strong>{name}</strong><small>{detail}</small></span>
              <ExternalLink size={15} />
            </a>
          ))}
        </div>
      </section>

      <section className="capability-band" aria-labelledby="capabilities-title">
        <div className="site-map-heading">
          <span>Disponible hoy</span>
          <h2 id="capabilities-title">Capacidades activas</h2>
        </div>
        <div className="capability-list">
          {activeCapabilities.map(([name, status, detail]) => (
            <article key={name}>
              <CheckCircle2 size={18} />
              <div><strong>{name}</strong><p>{detail}</p></div>
              <span>{status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="roadmap-map" aria-labelledby="roadmap-map-title">
        <div className="site-map-heading">
          <span>Sin simulaciones</span>
          <h2 id="roadmap-map-title">Roadmap</h2>
          <p>Estos elementos no cuentan como evidencia desplegada y no ejecutan acciones.</p>
        </div>
        <div className="roadmap-status-list">
          {roadmap.map(([name, status, detail]) => (
            <article key={name}>
              <CircleDashed size={18} />
              <div><strong>{name}</strong><p>{detail}</p></div>
              <span data-status={status}>{status}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
