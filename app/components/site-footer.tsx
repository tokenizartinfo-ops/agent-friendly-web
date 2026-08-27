import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const productLinks = [
  ['Auditar un sitio', '/#auditar'],
  ['Evolucion agentica', '/evolucion-agentica'],
  ['Metodologia', '/metodologia'],
  ['Caso Tokenizart', '/casos/tokenizart'],
  ['Mapa completo', '/mapa-del-sitio'],
];

const agentLinks = [
  ['llms.txt', '/llms.txt'],
  ['OpenAPI', '/openapi.json'],
  ['AI Catalog', '/.well-known/ai-catalog.json'],
  ['Readiness', '/.well-known/agent-readiness.json'],
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <span className="brand-mark" aria-hidden="true">AF</span>
        <div>
          <strong>Agent Friendly Web</strong>
          <p>Diagnostico verificable y evolucion progresiva para sitios legibles por humanos y agentes.</p>
        </div>
      </div>
      <div className="footer-column">
        <strong>Producto</strong>
        {productLinks.map(([name, href]) => <Link href={href} key={href}>{name}</Link>)}
      </div>
      <div className="footer-column">
        <strong>Recursos agenticos</strong>
        {agentLinks.map(([name, href]) => <a href={href} key={href}>{name}</a>)}
      </div>
      <div className="footer-column">
        <strong>Proyecto</strong>
        <Link href="/expediente">Mi expediente</Link>
        <a href="/.well-known/security.txt">Seguridad</a>
        <a href="https://github.com/tokenizartinfo-ops/agent-friendly-web" target="_blank" rel="noreferrer">
          Repositorio <ArrowUpRight size={13} />
        </a>
      </div>
      <div className="footer-legal">
        <p>Creado por Gabriel Mucchiut e incubado dentro de Tokenizart.</p>
        <p>Metodologia propia, evidencia publica y limites explicitos.</p>
      </div>
    </footer>
  );
}
