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

type Category = { label: string; score: number; weight: number; status: string };
type ScanResult = {
  target: string;
  checkedAt: string;
  readiness: { score: number; level: string; categories: Record<string, Category> };
  evidence: Record<string, boolean>;
  limits: string[];
};

const categoryHelp: Record<string, string> = {
  discovery: 'Rastreo, sitemap y señales de acceso.',
  answerability: 'Contenido claro, estructurado y citable.',
  machineContent: 'Rutas preparadas para lectura por agentes.',
  tools: 'Contratos para APIs, MCP y skills.',
  experimental: 'Capacidades web todavia experimentales.',
  trust: 'Autoria, fuentes y gobierno del contenido.',
  commerce: 'Base para pagos y transacciones agenticas.',
};

const pendingCategories: Array<[string, Category]> = [
  ['discovery', { label: 'Descubrimiento y rastreo', score: 0, weight: 20, status: 'pending' }],
  ['answerability', { label: 'Contenido listo para respuestas', score: 0, weight: 20, status: 'pending' }],
  ['machineContent', { label: 'Contenido legible por agentes', score: 0, weight: 15, status: 'pending' }],
  ['tools', { label: 'APIs y herramientas', score: 0, weight: 20, status: 'pending' }],
];

const auxiliaryDiagnostics = [
  ['contentSignals', 'Content Signals'],
  ['explicitAiCrawlerPolicy', 'Politica IA explicita'],
  ['apiCatalog', 'API Catalog'],
  ['aiCatalog', 'Catalogo de recursos'],
] as const;

export function ScanWorkspace() {
  const [url, setUrl] = useState('tokenizart.com');
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
      if (!response.ok) throw new Error(payload.error || 'No se pudo auditar el sitio.');
      setResult(payload);
    } catch (scanError) {
      setResult(null);
      setError(scanError instanceof Error ? scanError.message : 'No se pudo auditar el sitio.');
    } finally {
      setLoading(false);
    }
  }

  const categories = result ? Object.entries(result.readiness.categories) : pendingCategories;

  return (
    <>
      <section className="audit-band" id="auditar" aria-labelledby="audit-title">
        <div className="audit-copy">
          <div className="eyebrow"><Radar size={16} /> Diagnostico publico verificable</div>
          <h1 id="audit-title">Descubri que entiende un agente de tu sitio.</h1>
          <p>
            Revisamos señales publicas, contenido citable y herramientas expuestas. El resultado separa
            evidencia real, recomendaciones y tecnologias todavia experimentales.
          </p>
          <form className="scan-form" onSubmit={runScan}>
            <label htmlFor="site-url">Sitio web</label>
            <div className="scan-input-row">
              <Globe2 aria-hidden="true" size={20} />
              <input
                id="site-url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="ejemplo.org"
                inputMode="url"
                autoComplete="url"
              />
              <button type="submit" disabled={loading}>
                {loading ? <LoaderCircle className="spin" aria-hidden="true" size={19} /> : <FileSearch aria-hidden="true" size={19} />}
                {loading ? 'Auditando' : 'Auditar'}
              </button>
            </div>
          </form>
          {error ? <p className="error-message"><CircleAlert size={18} /> {error}</p> : null}
          <div className="trust-row">
            <span><LockKeyhole size={15} /> Solo recursos publicos</span>
            <span><Check size={15} /> Sin contraseñas</span>
            <span><Check size={15} /> Sin modificar el sitio</span>
          </div>
        </div>

        <aside className="score-panel" aria-live="polite">
          <div className="score-heading">
            <div>
              <span>Estado observado</span>
              <strong>{result ? result.target.replace(/^https?:\/\//, '') : 'Ejemplo: Tokenizart'}</strong>
            </div>
            <Bot size={25} aria-hidden="true" />
          </div>
          <div className="score-value">
            <strong>{result ? result.readiness.score : '—'}</strong>
            <span>/ 100</span>
          </div>
          <div className="score-track" aria-hidden="true">
            <span style={{ width: `${result?.readiness.score || 0}%` }} />
          </div>
          <p className="score-level">{result ? result.readiness.level : 'Ejecuta una auditoria para obtener evidencia.'}</p>
          <p className="score-note">Metodologia propia de Gabriel Mucchiut. No es una certificacion oficial.</p>
        </aside>
      </section>

      <section className="workspace-grid" aria-label="Resultado y proximo recorrido">
        <div className="results-panel">
          <div className="section-heading">
            <div>
              <span>Lectura por capas</span>
              <h2>{result ? 'Resultado de la auditoria' : 'Que vamos a medir'}</h2>
            </div>
            {result ? <time dateTime={result.checkedAt}>Actualizado ahora</time> : null}
          </div>
          <div className="category-list">
            {categories.map(([id, category]) => (
              <div className="category-row" key={id}>
                <div className="category-icon" data-status={category.status}>
                  {category.status === 'verified' ? <Check size={17} /> : <span />}
                </div>
                <div className="category-copy">
                  <strong>{category.label}</strong>
                  <span>{categoryHelp[id]}</span>
                </div>
                <div className="category-score">{result ? `${category.score}/${category.weight}` : 'Pendiente'}</div>
              </div>
            ))}
          </div>
          {result ? (
            <div className="diagnostic-strip" aria-label="Diagnosticos auxiliares sin puntaje">
              <div className="diagnostic-title"><span>Diagnosticos auxiliares</span><small>No alteran AF v1</small></div>
              {auxiliaryDiagnostics.map(([id, label]) => (
                <div className="diagnostic-item" data-detected={result.evidence[id]} key={id}>
                  {result.evidence[id] ? <Check size={14} /> : <CircleAlert size={14} />}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="journey-panel" id="expediente">
          <div className="journey-icon"><Route size={22} /></div>
          <span>Expediente guiado</span>
          <h2>Mejora el sitio con contexto real.</h2>
          <p>
            El propietario responde preguntas simples sobre audiencia, contenidos, acceso tecnico y objetivos.
            El sistema conserva avances y transforma respuestas dispersas en un roadmap accionable.
          </p>
          <ol>
            <li><span>1</span> Contanos que hace el sitio.</li>
            <li><span>2</span> Indica que control tecnico tenes.</li>
            <li><span>3</span> Elegimos mejoras por impacto.</li>
          </ol>
          <a href="/expediente">Crear mi expediente <ArrowRight size={17} /></a>
        </aside>
      </section>
    </>
  );
}
