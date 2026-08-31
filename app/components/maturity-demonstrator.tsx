'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Building2, Check, CircleAlert, Clock3, Landmark, Palette } from 'lucide-react';
import { MATURITY_COPY } from '../../lib/home-copy.mjs';
import { localizedPath } from '../../lib/site-i18n.mjs';

type ScenarioId = 'restaurant' | 'municipality' | 'tokenizart';

const scenarioIcons = { restaurant: Building2, municipality: Landmark, tokenizart: Palette } as const;

export function MaturityDemonstrator({ locale = 'es' }: { locale?: 'es' | 'en' | 'pt' } = {}) {
  const copy = MATURITY_COPY[locale] || MATURITY_COPY.es;
  const stages = copy.stages.map(([level, name, evidence], id) => ({ id, level, name, evidence }));
  const [scenarioId, setScenarioId] = useState<ScenarioId>('tokenizart');
  const [stageId, setStageId] = useState(2);
  const scenario = copy.scenarios[scenarioId];
  const stage = stages[stageId];
  const Icon = scenarioIcons[scenarioId];
  const visibleDetails = useMemo(() => scenario.details.slice(0, Math.min(4, Math.max(0, stageId))), [scenario, stageId]);

  return (
    <section className="demo-workspace" aria-label={copy.labels.aria}>
      <div className="demo-controls">
        <div>
          <span className="control-label">{copy.labels.case}</span>
          <div className="segment-control" role="group" aria-label={copy.labels.chooseCase}>
            {(Object.keys(copy.scenarios) as ScenarioId[]).map((id) => (
              <button type="button" aria-pressed={scenarioId === id} key={id} onClick={() => setScenarioId(id)}>{copy.scenarios[id].label}</button>
            ))}
          </div>
        </div>
        <div>
          <span className="control-label">{copy.labels.maturity}</span>
          <div className="stage-control" role="group" aria-label={copy.labels.chooseStage}>
            {stages.map((item) => (
              <button type="button" aria-pressed={stageId === item.id} key={item.id} onClick={() => setStageId(item.id)}>
                <strong>{item.level}</strong><span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="comparison-grid">
        <article className="scenario-question">
          <div className="scenario-title"><Icon size={22} /><span>{scenario.label}</span></div>
          <h2>{scenario.question}</h2>
          <div className="weak-answer"><CircleAlert size={18} /><div><strong>{copy.labels.before}</strong><p>{scenario.weak}</p></div></div>
        </article>

        <article className="agent-answer">
          <div className="answer-heading"><span>{copy.labels.answer}</span><strong>{stage.level} · {stage.name}</strong></div>
          <p>{scenario.answers[stageId]}</p>
          <div className="evidence-line"><Clock3 size={16} /><span>{stage.evidence}</span></div>
          {visibleDetails.length ? (
            <ul>{visibleDetails.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul>
          ) : <div className="empty-evidence">{copy.labels.empty}</div>}
        </article>
      </div>
    </section>
  );
}

export function HomeMaturityComparison({ locale = 'es' }: { locale?: 'es' | 'en' | 'pt' } = {}) {
  const copy = MATURITY_COPY[locale] || MATURITY_COPY.es;
  return (
    <section className="home-comparison-band" id="comparador-af" aria-labelledby="home-comparison-title">
      <header>
        <span>{copy.comparison.eyebrow}</span>
        <h2 id="home-comparison-title">{copy.comparison.title}</h2>
        <p>{copy.comparison.intro}</p>
        <a href={localizedPath('evolution', locale) || '/evolucion-agentica'}>{copy.comparison.cta} <ArrowRight size={16} /></a>
      </header>
      <MaturityDemonstrator locale={locale} />
    </section>
  );
}
