import { ArrowUpRight } from 'lucide-react';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { sharedCopy } from '../../lib/site-copy.mjs';

const productLinks = [
  ['audit', 'home', 'auditar'], ['guide', 'guide'], ['aeo', 'aeo'], ['sectors', 'sectors'],
  ['measurement', 'measurement'], ['assistant', 'assistant'], ['openKnowledge', 'openKnowledge'],
  ['evolution', 'evolution'], ['methodology', 'methodology'], ['registry', 'registry'], ['cli', 'cli'],
  ['mcp', 'mcp'], ['externalVerification', 'externalVerification'], ['tokenizartCase', 'tokenizartCase'], ['siteMap', 'siteMap'],
] as const;

const agentLinks = [
  ['llms.txt', '/llms.txt'],
  ['OpenAPI', '/openapi.json'],
  ['AI Catalog', '/.well-known/ai-catalog.json'],
  ['ARD', '/.well-known/ard.json'],
  ['Readiness', '/.well-known/agent-readiness.json'],
  ['External readiness', '/.well-known/external-readiness.json'],
  ['Crawler Catalog', '/.well-known/crawler-policy-catalog.json'],
  ['Comparison contract', '/.well-known/readiness-comparison-contract.json'],
  ['Assistant contract', '/.well-known/intake-assistant-contract.json'],
  ['Public guide contract', '/.well-known/public-guide-contract.json'],
  ['OKF v0.2', '/okf/v0.2/index.md'],
  ['CLI manifest', '/.well-known/agent-friendly-cli.json'],
  ['CLI schema', '/schemas/cli-response.v1.json'],
  ['MCP server card', '/.well-known/mcp/server-card.json'],
  ['MCP result schema', '/schemas/mcp-result.v1.json'],
];

type Locale = 'es' | 'en' | 'pt';

export function SiteFooter({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = sharedCopy(locale).footer;
  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <span className="brand-mark" aria-hidden="true">AF</span>
        <div>
          <strong>Agent Friendly Web</strong>
          <p>{copy.description}</p>
        </div>
      </div>
      <div className="footer-column">
        <strong>{copy.product}</strong>
        {productLinks.map(([label, routeKey, hash]) => {
          const href = localizedPath(routeKey, locale, hash ? { hash } : {}) || '/';
          return <a href={href} key={`${locale}-${routeKey}`}>{copy[label]}</a>;
        })}
      </div>
      <div className="footer-column">
        <strong>{copy.agentResources}</strong>
        {agentLinks.map(([name, href]) => <a href={href} key={href}>{name}</a>)}
      </div>
      <div className="footer-column">
        <strong>{copy.project}</strong>
        <a href={localizedPath('dossier', locale) || '/expediente'}>{copy.dossier}</a>
        <a href="/.well-known/security.txt">{copy.security}</a>
        <a href="https://github.com/tokenizartinfo-ops/agent-friendly-web" target="_blank" rel="noreferrer">
          {copy.repository} <ArrowUpRight size={13} />
        </a>
      </div>
      <div className="footer-legal">
        <p>{copy.attribution}</p>
        <p>{copy.limits}</p>
      </div>
    </footer>
  );
}
