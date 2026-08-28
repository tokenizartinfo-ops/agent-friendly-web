import type { Metadata } from 'next';
import {
  ArrowRight,
  Ban,
  BookOpenCheck,
  Braces,
  Cable,
  Database,
  FileCheck2,
  Network,
  Radar,
  ShieldCheck,
} from 'lucide-react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'MCP publico read-only | Agent Friendly Web',
  description: 'Servidor MCP publico, stateless y de solo lectura para auditoria, metodologia, Registry y OKF.',
};

const tools = [
  {
    name: 'audit_public_site',
    label: 'Auditar evidencia publica',
    detail: 'Observa senales agent-friendly con los mismos limites de DNS, SSRF, tiempo y bytes del auditor publico.',
    icon: Radar,
  },
  {
    name: 'get_afw_methodology',
    label: 'Consultar la metodologia',
    detail: 'Devuelve secciones versionadas de AF-0 a AF-5, su alcance y sus limites.',
    icon: BookOpenCheck,
  },
  {
    name: 'get_public_registry_profile',
    label: 'Leer el Registry publico',
    detail: 'Entrega solamente perfiles ya publicados. Los expedientes y borradores privados quedan fuera.',
    icon: Database,
  },
  {
    name: 'verify_public_okf_release',
    label: 'Verificar el bundle OKF',
    detail: 'Comprueba en memoria el manifiesto y los hashes de la release publica v0.2 allowlisted.',
    icon: FileCheck2,
  },
];

const resources = [
  'afw://capabilities/v1',
  'afw://methodology/v1',
  'afw://okf/v0.2',
  'afw://readiness/v1',
];

const boundaries = [
  ['Sin OAuth', 'No hace falta identificarse porque solo consulta informacion que ya es publica.'],
  ['Sin memoria', 'Cada solicitud se resuelve de forma independiente y no conserva una conversacion.'],
  ['Sin escritura', 'No puede publicar, cambiar DNS, cobrar, desplegar ni modificar un sitio.'],
  ['Sin datos owner', 'No accede a expedientes, cuentas, borradores, observaciones privadas ni credenciales.'],
];

export default function PublicMcpPage() {
  return (
    <main>
      <SiteHeader />

      <section className="mcp-hero">
        <div className="mcp-hero-copy">
          <span><Cable size={17} /> Release candidate v1</span>
          <h1>Un canal MCP publico para consultar evidencia sin tomar el control.</h1>
          <p>Agentes y asistentes pueden usar la metodologia, el auditor, el Registry y OKF desde una interfaz comun. La superficie es pequena, stateless y estrictamente read-only.</p>
          <div className="mcp-endpoint" aria-label="Endpoint MCP publico">
            <strong>Streamable HTTP</strong>
            <code>POST /mcp</code>
            <small>Protocolo preferido: 2026-07-28</small>
          </div>
          <div className="mcp-hero-actions">
            <a href="/.well-known/mcp/server-card.json">Abrir tarjeta del servidor <Braces size={17} /></a>
            <a href="/schemas/mcp-result.v1.json">Ver schema de respuesta <ArrowRight size={17} /></a>
          </div>
        </div>
        <div className="mcp-signal" aria-label="Flujo read-only entre agente y evidencia publica">
          <span className="mcp-node"><Network size={28} /><strong>Agente</strong><small>pregunta</small></span>
          <span className="mcp-wire" aria-hidden="true"><i /><i /><i /></span>
          <span className="mcp-node mcp-node-core"><span>AF</span><strong>MCP</strong><small>valida y limita</small></span>
          <span className="mcp-wire" aria-hidden="true"><i /><i /><i /></span>
          <span className="mcp-node"><ShieldCheck size={28} /><strong>Evidencia</strong><small>publica</small></span>
        </div>
      </section>

      <section className="mcp-tools-band" aria-labelledby="mcp-tools-title">
        <div className="mcp-section-heading">
          <span>Cuatro tools</span>
          <h2 id="mcp-tools-title">Una tarea clara por herramienta.</h2>
          <p>No existe una tool generica capaz de navegar rutas internas, ejecutar codigo o elegir acciones fuera del contrato.</p>
        </div>
        <div className="mcp-tool-list">
          {tools.map(({ name, label, detail, icon: Icon }, index) => (
            <article key={name}>
              <span>0{index + 1}</span>
              <Icon size={20} />
              <div><strong>{label}</strong><code>{name}</code><p>{detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="mcp-resources-band" aria-labelledby="mcp-resources-title">
        <div className="mcp-section-heading">
          <span>Cuatro resources</span>
          <h2 id="mcp-resources-title">Conocimiento estable y versionado.</h2>
          <p>Los identificadores no aceptan rutas arbitrarias ni parametros privados.</p>
        </div>
        <div className="mcp-resource-list">
          {resources.map((resource) => (
            <code key={resource}><Braces size={16} /> {resource}</code>
          ))}
        </div>
      </section>

      <section className="mcp-boundary-band" aria-labelledby="mcp-boundaries-title">
        <div className="mcp-section-heading">
          <span><Ban size={16} /> Limites verificables</span>
          <h2 id="mcp-boundaries-title">Puede leer lo publico. No puede actuar por el propietario.</h2>
        </div>
        <div className="mcp-boundary-list">
          {boundaries.map(([name, detail]) => (
            <article key={name}>
              <ShieldCheck size={19} />
              <div><strong>{name}</strong><p>{detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="mcp-candidate-note">
        <div>
          <span>Gate de publicacion</span>
          <h2>El codigo existe; la etiqueta “deployed” exige una prueba remota reproducible.</h2>
          <p>Hasta cerrar listados, llamadas, recursos y pruebas negativas contra la version candidata, esta capacidad no suma evidencia desplegada en el readiness.</p>
        </div>
        <a href="/.well-known/agent-readiness.json">Consultar estado actual <ArrowRight size={17} /></a>
      </section>

      <SiteFooter />
    </main>
  );
}
