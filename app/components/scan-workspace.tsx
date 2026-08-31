'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  CircleAlert,
  FileSearch,
  Globe2,
  LoaderCircle,
  LockKeyhole,
  Radar,
  Route,
} from 'lucide-react';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { normalizeSitePrefill } from '../../lib/site-prefill.mjs';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { HOME_COPY } from '../../lib/home-copy.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { PUBLIC_READINESS_REFERENCE } from '../../lib/public-readiness-reference.mjs';

type Category = { label: string; score: number; weight: number; status: string };
type ScanResult = {
  target: string;
  checkedAt: string;
  readiness: { score: number; level: string; categories: Record<string, Category> };
  evidence: Record<string, boolean>;
  limits: string[];
};

type ScanWorkspaceProps = {
  initialSite?: string;
  locale?: 'es' | 'en' | 'pt';
};

const weights: Record<string, number> = { discovery: 20, answerability: 20, machineContent: 15, tools: 20, experimental: 10, trust: 10, commerce: 5 };

export function ScanWorkspace({ initialSite, locale = 'es' }: ScanWorkspaceProps) {
  const copy = HOME_COPY[locale] || HOME_COPY.es;
  const [url, setUrl] = useState(() => normalizeSitePrefill(initialSite) || 'agentfriendlyweb.dev');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function runScan(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || copy.form.error);
      setResult(payload);
    } catch (scanError) {
      setResult(null);
      setError(scanError instanceof Error ? scanError.message : copy.form.error);
    } finally {
      setLoading(false);
    }
  }

  const categories: Array<[string, Category & { help: string }]> = copy.categories.map(({ id, label, help }) => {
    const observed = result?.readiness.categories[id];
    return [id, observed ? { ...observed, label, help } : { label, help, score: 0, weight: weights[id], status: 'pending' }];
  });

  return (
    <>
      <section className="audit-band" id="auditar" aria-labelledby="audit-title">
        <div className="audit-copy">
          <div className="eyebrow"><Radar size={16} /> {copy.eyebrow}</div>
          <h1 id="audit-title">{copy.title}</h1>
          <p>{copy.intro}</p>
          <form className="scan-form" onSubmit={runScan}>
            <label htmlFor="site-url">{copy.form.label}</label>
            <div className="scan-input-row">
              <Globe2 aria-hidden="true" size={20} />
              <input
                id="site-url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder={copy.form.placeholder}
                inputMode="url"
                autoComplete="url"
              />
              <button type="submit" disabled={loading}>
                {loading ? <LoaderCircle className="spin" aria-hidden="true" size={19} /> : <FileSearch aria-hidden="true" size={19} />}
                {loading ? copy.form.loading : copy.form.submit}
              </button>
            </div>
          </form>
          {error ? <p className="error-message"><CircleAlert size={18} /> {error}</p> : null}
          <div className="trust-row">
            <span><LockKeyhole size={15} /> {copy.trust[0]}</span>
            <span><Check size={15} /> {copy.trust[1]}</span>
            <span><Check size={15} /> {copy.trust[2]}</span>
          </div>
        </div>

        <aside className="score-panel" aria-live="polite">
          <div className="score-heading">
            <div>
              <span>{result ? copy.observed : copy.reference}</span>
              <strong>{result ? result.target.replace(/^https?:\/\//, '') : PUBLIC_READINESS_REFERENCE.target}</strong>
            </div>
            <Bot size={25} aria-hidden="true" />
          </div>
          <div className="score-value">
            <strong>{result ? result.readiness.score : PUBLIC_READINESS_REFERENCE.score}</strong>
            <span>/ 100</span>
          </div>
          <div className="score-track" aria-hidden="true">
            <span style={{ width: `${result?.readiness.score ?? PUBLIC_READINESS_REFERENCE.score}%` }} />
          </div>
          <p className="score-level">{result ? result.readiness.level : PUBLIC_READINESS_REFERENCE.level[locale]}</p>
          {!result ? (
            <p className="score-reference">
              {copy.referenceText} <time dateTime={PUBLIC_READINESS_REFERENCE.measuredAt}>{PUBLIC_READINESS_REFERENCE.measuredAt}</time>
            </p>
          ) : null}
          {!result ? <p className="score-boundary">{PUBLIC_READINESS_REFERENCE.boundary[locale]}</p> : null}
          <p className="score-note">{copy.note}</p>
        </aside>
      </section>

      <section className="workspace-grid" aria-label="Resultado y proximo recorrido">
        <div className="results-panel">
          <div className="section-heading">
            <div>
              <span>{copy.layers}</span>
              <h2>{result ? copy.result : copy.measuring}</h2>
            </div>
            {result ? <time dateTime={result.checkedAt}>{copy.updated}</time> : null}
          </div>
          <div className="category-list">
            {categories.map(([id, category]) => (
              <div className="category-row" key={id}>
                <div className="category-icon" data-status={category.status}>
                  {category.status === 'verified' ? <Check size={17} /> : <span />}
                </div>
                <div className="category-copy">
                  <strong>{category.label}</strong>
                  <span>{category.help}</span>
                </div>
                <div className="category-score">{result ? `${category.score}/${category.weight}` : copy.pending}</div>
              </div>
            ))}
          </div>
          {result ? (
            <>
              <div className="diagnostic-strip" aria-label="Diagnosticos auxiliares sin puntaje">
                <div className="diagnostic-title"><span>{copy.diagnostics}</span><small>{copy.diagnosticsLimit}</small></div>
                {Object.entries(copy.auxiliary).map(([id, label]) => (
                  <div className="diagnostic-item" data-detected={result.evidence[id]} key={id}>
                    {result.evidence[id] ? <Check size={14} /> : <CircleAlert size={14} />}
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <details className="evidence-disclosure">
                <summary>{copy.evidence}</summary>
                <div className="evidence-grid">
                  {Object.entries(result.evidence).map(([id, detected]) => (
                    <span data-detected={detected} key={id}>{detected ? <Check size={14} /> : <CircleAlert size={14} />}{id}</span>
                  ))}
                </div>
                {result.limits.length ? <ul>{result.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul> : null}
              </details>
              <div className="result-next-action">
                <div><span>{copy.next}</span><strong>{copy.nextText}</strong></div>
                <a href={localizedPath('dossier', locale) || '/expediente'}>{copy.openDossier} <ArrowRight size={16} /></a>
              </div>
            </>
          ) : null}
        </div>

        <aside className="journey-panel" id="expediente">
          <div className="journey-icon"><Route size={22} /></div>
          <span>{copy.journey}</span>
          <h2>{copy.journeyTitle}</h2>
          <p>{copy.journeyText}</p>
          <ol>
            {copy.journeySteps.map((step, index) => <li key={step}><span>{index + 1}</span> {step}</li>)}
          </ol>
          <a href={localizedPath('dossier', locale) || '/expediente'}>{copy.createDossier} <ArrowRight size={17} /></a>
        </aside>
      </section>
    </>
  );
}
