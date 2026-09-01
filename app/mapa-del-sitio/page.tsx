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
  Globe2,
  LockKeyhole,
  Map,
  Network,
  Radar,
  Route,
  ShieldCheck,
} from 'lucide-react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('siteMap', 'es') as Metadata;

const humanRoutes = [
  { name: 'Auditor publico', detail: 'Comprueba evidencia visible sin modificar el sitio.', href: '/#auditar', icon: Radar },
  { name: 'Guia publica', detail: 'Mantiene el hilo inmediato, adapta la explicacion y enlaza fuentes sin guardar la charla.', href: '/guia', icon: Bot },
  { name: 'Preguntas frecuentes', detail: 'Respuestas publicas revisadas, multilingues y compartidas con la guia.', href: '/preguntas-frecuentes', icon: FileText },
  { name: 'AEO y crawlers', detail: 'Explica valor comercial y politicas por proveedor sin promesas de ranking.', href: '/aeo-y-crawlers', icon: Bot },
  { name: 'Soluciones por sector', detail: 'Adapta evidencia, contenidos y primer paso a cada tipo de organizacion.', href: '/sectores', icon: Globe2 },
  { name: 'Medir mejora', detail: 'Compara evidencia antes y despues sin promesas de ranking.', href: '/medir-mejora', icon: Radar },
  { name: 'Asistente de preparacion', detail: 'Ordena texto libre localmente y exige revision humana.', href: '/asistente', icon: Bot },
  { name: 'Conocimiento abierto', detail: 'Explica, descarga y verifica el bundle publico OKF v0.2.', href: '/conocimiento-abierto', icon: FileText },
  { name: 'Evolucion agentica', detail: 'Compara AF-0 a AF-5 mediante casos ilustrativos.', href: '/evolucion-agentica', icon: Route },
  { name: 'Metodologia', detail: 'Explica el puntaje, sus limites y las fuentes primarias.', href: '/metodologia', icon: Compass },
  { name: 'Registry publico', detail: 'Perfiles versionados con declaraciones, observaciones y dominio verificado.', href: '/registry', icon: Globe2 },
  { name: 'CLI read-only', detail: 'Auditoria, Registry y verificacion OKF desde Node.js con salida JSON.', href: '/cli', icon: FileCode2 },
  { name: 'MCP public read-only', detail: 'Servicio stateless desplegado con cuatro tools y cuatro resources publicos.', href: '/mcp-readonly', icon: Braces },
  { name: 'Verificacion externa', detail: 'Fotografias AF-EV de auditores independientes, con fecha, checks y limites.', href: '/verificacion-externa', icon: ShieldCheck },
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
  { name: 'ARD', detail: 'Manifiesto compatible con el draft de Agentic Resource Discovery.', href: '/.well-known/ard.json', icon: Network },
  { name: 'External readiness', detail: 'Baseline AF-EV atribuido a un proveedor externo.', href: '/.well-known/external-readiness.json', icon: ShieldCheck },
  { name: 'Agent Skill', detail: 'Instrucciones publicas para ejecutar una auditoria.', href: '/skills/agent-friendly-web-audit/SKILL.md', icon: Braces },
  { name: 'Readiness manifest', detail: 'Estado machine-readable de capacidades y limites.', href: '/.well-known/agent-readiness.json', icon: ShieldCheck },
  { name: 'Security policy', detail: 'Canal y alcance para reportar problemas de seguridad.', href: '/.well-known/security.txt', icon: ShieldCheck },
  { name: 'Crawler policy catalog', detail: 'Matriz JSON de crawlers, finalidades, controles y fuentes oficiales.', href: '/.well-known/crawler-policy-catalog.json', icon: Bot },
  { name: 'Comparison contract', detail: 'Contrato del comparador local de evidencia.', href: '/.well-known/readiness-comparison-contract.json', icon: Braces },
  { name: 'Assistant contract', detail: 'Limites machine-readable del prototipo de intake.', href: '/.well-known/intake-assistant-contract.json', icon: Braces },
  { name: 'Public guide contract', detail: 'Contrato machine-readable de la guia determinista y no persistente.', href: '/.well-known/public-guide-contract.json', icon: Braces },
  { name: 'Email operations contract', detail: 'Plan local draft-only; no hay casilla, DNS, proveedor, lectura ni envio activos.', href: '/.well-known/email-operations-contract.json', icon: Braces },
  { name: 'CRM Lite contract', detail: 'Plan local metadata-only; no guarda contactos reales ni ejecuta acciones comerciales.', href: '/.well-known/crm-lite-contract.json', icon: Braces },
  { name: 'OKF v0.2 index', detail: 'Indice canonico del conocimiento publico versionado.', href: '/okf/v0.2/index.md', icon: FileText },
  { name: 'OKF manifest', detail: 'Inventario, version, licencia y hashes de distribucion.', href: '/okf/v0.2/manifest.json', icon: Braces },
  { name: 'OKF checksums', detail: 'Hashes SHA-256 para comprobar integridad de los archivos.', href: '/okf/v0.2/CHECKSUMS.sha256', icon: ShieldCheck },
  { name: 'CLI manifest', detail: 'Comandos, version, limites y fronteras read-only.', href: '/.well-known/agent-friendly-cli.json', icon: Braces },
  { name: 'CLI response schema', detail: 'Contrato JSON estable para resultados y errores.', href: '/schemas/cli-response.v1.json', icon: FileCode2 },
  { name: 'CLI guide', detail: 'Guia Markdown para ejecutar la CLI desplegada desde el repositorio.', href: '/cli/index.md', icon: FileText },
  { name: 'MCP server card', detail: 'Contrato desplegado, endpoint, tools, resources y limites.', href: '/.well-known/mcp/server-card.json', icon: Braces },
  { name: 'MCP endpoint', detail: 'Streamable HTTP publico y read-only en Cloudflare.', href: 'https://mcp.agentfriendlyweb.dev/mcp', icon: Network },
  { name: 'MCP result schema', detail: 'Envelope JSON estable de las cuatro tools read-only.', href: '/schemas/mcp-result.v1.json', icon: FileCode2 },
  { name: 'Publication capsule schema', detail: 'Contrato candidato para paquetes manuales, acotados y verificables.', href: '/schemas/publication-capsule.v1.json', icon: FileCode2 },
  { name: 'Capsule decision schema', detail: 'Contrato candidato para aprobaciones humanas ligadas al hash del manifiesto.', href: '/schemas/capsule-decision.v1.json', icon: ShieldCheck },
];

const activeCapabilities = [
  ['Scanner publico', 'Activo', 'Auditoria read-only de recursos publicos.'],
  ['Expediente autenticado', 'Activo', 'Contexto privado aislado por identidad.'],
  ['Demostrador AF', 'Activo', 'Ejemplos educativos de madurez agentica.'],
  ['Paquete Tokenizart', 'Activo', 'Archivos descargables con manifiesto y checksums.'],
  ['Registry publico', 'Activo', 'Perfiles HTML, JSON y Markdown con procedencia versionada.'],
  ['Catalogo de crawlers', 'Activo', 'Matriz educativa y machine-readable por proveedor.'],
  ['Contenido sectorial', 'Activo', 'Primera capa ESP/ENG/POR para seis tipos de organizacion.'],
  ['Comparador de evidencia', 'Activo', 'Antes/despues local, no persistente y sin promesas de ranking.'],
  ['Asistente de intake', 'Prototipo', 'Ordena texto libre y requiere seleccion humana antes de copiar.'],
  ['Guia publica', 'Desplegada', 'Orienta con continuidad inmediata y fuentes, sin persistencia ni acciones.'],
  ['Bundle OKF publico', 'Activo', 'Once conceptos read-only con procedencia, version, manifiesto y checksums.'],
  ['CLI read-only', 'Desplegada', 'Auditoria, Registry y OKF con JSON estable, sin credenciales ni escrituras.'],
  ['MCP public read-only', 'Desplegado', 'Cuatro tools y cuatro resources publicos, sin OAuth, memoria ni escrituras.'],
  ['Capsula manual', 'Desplegada', 'Prepara archivos y hashes para entrega manual con aprobaciones separadas; no publica ni modifica el sitio.'],
  ['AF-EV', 'Verificado', 'Conserva el baseline 53/100 Level 2 y la reauditoria Level 4 como fotografias externas fechadas.'],
];

const roadmap = [
  ['Markdown negociado', 'deployed', 'Desplegado con Vary: Accept y verificado externamente.'],
  ['WebMCP read-only', 'deployed', 'Tool in-page publica read-only desplegada; tecnologia experimental.'],
  ['Voz y guardado asistido', 'planned', 'Permanecen fuera del prototipo hasta contratos, consentimiento y auditoria.'],
  ['Correo operativo', 'documented', 'Contrato de planificacion publicado; casilla, DNS, proveedor, lectura y envio siguen desactivados.'],
  ['CRM Lite', 'documented', 'Modelo metadata-only documentado; no hay persistencia remota, contactos reales ni acciones comerciales.'],
  ['Plugins y conectores', 'planned', 'Cada plataforma requiere un adaptador oficial y una capacidad verificable.'],
  ['A2A', 'planned', 'No se publica Agent Card ni delegacion entre agentes.'],
  ['x402', 'research', 'No hay recursos pagos ni flujo HTTP 402 activo.'],
];

export default function SiteMapPage() {
  return (
    <main>
      <SiteHeader routeKey="siteMap" />
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
            <a href={href} className="resource-row" key={href}>
              <span className="resource-icon"><Icon size={19} /></span>
              <span><strong>{name}</strong><small>{detail}</small></span>
              <ArrowRight size={17} />
            </a>
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
      <SiteFooter />
    </main>
  );
}
import type { Metadata } from 'next';
