import type { Metadata } from 'next';
import {
  ArrowRight,
  Braces,
  CircleSlash2,
  FileCheck2,
  ShieldCheck,
  SquareTerminal,
} from 'lucide-react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('cli', 'es') as Metadata;

const commands = [
  {
    name: 'Auditar',
    command: 'node bin/afw.mjs audit https://ejemplo.com',
    detail: 'Observa evidencia pública y devuelve el puntaje AF con sus límites.',
  },
  {
    name: 'Leer Registry',
    command: 'node bin/afw.mjs registry get tokenizart',
    detail: 'Consulta solamente un perfil JSON ya publicado y valida su contrato.',
  },
  {
    name: 'Verificar OKF',
    command: 'node bin/afw.mjs okf verify',
    detail: 'Comprueba inventario, rutas, media types y SHA-256 sin persistir archivos.',
  },
  {
    name: 'Simular',
    command: 'node bin/afw.mjs audit https://ejemplo.com --dry-run',
    detail: 'Explica qué consultaría sin realizar una sola solicitud de red.',
  },
];

const boundaries = [
  ['GET público', 'Solo lee recursos públicos con límites SSRF, timeout y tamaño.'],
  ['Cero credenciales', 'No usa cookies, OAuth, claves API ni sesiones autenticadas.'],
  ['Cero escritura', 'No crea archivos ni modifica sitios, Registry, DNS o despliegues.'],
  ['Contrato estable', 'Un JSON por ejecución, schema v1 y códigos de salida previsibles.'],
];

export default function CliPage() {
  return (
    <main>
      <SiteHeader routeKey="cli" />

      <section className="cli-hero">
        <div className="cli-hero-copy">
          <span><SquareTerminal size={17} /> Desplegada 0.1.0</span>
          <h1>La auditoría pública también puede recorrerse desde una terminal.</h1>
          <p>La CLI oficial convierte auditoría, Registry y OKF en respuestas JSON previsibles para personas, scripts y agentes. Es repo-first, estrictamente read-only y no reemplaza a MCP.</p>
          <div className="cli-hero-actions">
            <a href="/cli/index.md">Abrir guía completa <ArrowRight size={17} /></a>
            <a href="/.well-known/agent-friendly-cli.json">Ver manifiesto <Braces size={17} /></a>
          </div>
        </div>
        <aside className="cli-terminal" aria-label="Ejemplo de Agent Friendly Web CLI">
          <div><span /><span /><span /><strong>afw / public-read-only</strong></div>
          <pre><code>{`$ node bin/afw.mjs capabilities
{
  "status": "ok",
  "access": "public-read-only",
  "local_writes": false,
  "remote_writes": false
}`}</code></pre>
        </aside>
      </section>

      <section className="cli-command-band" aria-labelledby="cli-commands-title">
        <div className="cli-section-heading">
          <span>Cuatro recorridos</span>
          <h2 id="cli-commands-title">Una interfaz pequeña con fronteras explícitas.</h2>
          <p>Cada comando hace una sola tarea pública. No hay configuración oculta ni comandos de escritura.</p>
        </div>
        <div className="cli-command-list">
          {commands.map((item, index) => (
            <article key={item.name}>
              <span>0{index + 1}</span>
              <div><strong>{item.name}</strong><code>{item.command}</code><p>{item.detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="cli-boundary-band" aria-labelledby="cli-boundaries-title">
        <div className="cli-section-heading">
          <span><ShieldCheck size={16} /> Límites verificables</span>
          <h2 id="cli-boundaries-title">Puede mirar. No puede tomar el control.</h2>
        </div>
        <div className="cli-boundary-list">
          {boundaries.map(([name, detail], index) => (
            <article key={name}>
              {index === 2 ? <CircleSlash2 size={19} /> : <FileCheck2 size={19} />}
              <div><strong>{name}</strong><p>{detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="cli-install-band">
        <div>
          <span>Distribución inicial</span>
          <h2>Repositorio versionado primero. npm después de validar uso real.</h2>
          <p>Node.js 22.13 o superior, `npm ci` y ejecución directa desde `bin/afw.mjs`. La publicación en npm, MCP, A2A y operaciones autenticadas tienen gates propios.</p>
        </div>
        <div className="cli-install-command">
          <code>git clone https://github.com/tokenizartinfo-ops/agent-friendly-web.git</code>
          <code>cd agent-friendly-web</code>
          <code>npm ci</code>
          <code>node bin/afw.mjs --help</code>
        </div>
      </section>

      <section className="cli-contract-strip">
        <a href="/schemas/cli-response.v1.json"><Braces size={18} /><span><strong>Schema v1</strong><small>Respuesta estable</small></span></a>
        <a href="/.well-known/agent-friendly-cli.json"><FileCheck2 size={18} /><span><strong>Manifiesto</strong><small>Capacidades y límites</small></span></a>
        <a href="https://github.com/tokenizartinfo-ops/agent-friendly-web"><SquareTerminal size={18} /><span><strong>Código fuente</strong><small>Implementación auditable</small></span></a>
      </section>

      <SiteFooter />
    </main>
  );
}
