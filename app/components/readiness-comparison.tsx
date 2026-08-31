'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, CalendarDays, Gauge, ShieldCheck } from 'lucide-react';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { compareReadinessSnapshots } from '../../lib/readiness-comparison.mjs';
import { publicToolsCopy } from '../../lib/public-tools-copy.mjs';

type Locale = 'es' | 'en' | 'pt';

export function ReadinessComparison({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = publicToolsCopy(locale).comparison;
  const [baseline, setBaseline] = useState({ score: 20, evidenceCount: 3, observedAt: '2026-08-01' });
  const [current, setCurrent] = useState({ score: 55, evidenceCount: 9, observedAt: '2026-08-27' });
  const result = useMemo(() => compareReadinessSnapshots(baseline, current), [baseline, current]);

  const update = (target: 'baseline' | 'current', field: string, value: string) => {
    const setter = target === 'baseline' ? setBaseline : setCurrent;
    setter((previous) => ({ ...previous, [field]: field === 'observedAt' ? value : Number(value) }));
  };

  return (
    <section className="comparison-tool" aria-label={copy.aria}>
      <div className="snapshot-grid">
        {([['baseline', copy.baseline, baseline], ['current', copy.current, current]] as const).map(([key, label, snapshot]) => (
          <fieldset key={key}>
            <legend>{label}</legend>
            <label><span>{copy.scoreInput}</span><input type="number" min="0" max="100" value={snapshot.score} onChange={(event) => update(key, 'score', event.target.value)} /></label>
            <label><span>{copy.evidenceInput}</span><input type="number" min="0" max="250" value={snapshot.evidenceCount} onChange={(event) => update(key, 'evidenceCount', event.target.value)} /></label>
            <label><span>{copy.dateInput}</span><input type="date" value={snapshot.observedAt} onChange={(event) => update(key, 'observedAt', event.target.value)} /></label>
          </fieldset>
        ))}
      </div>
      <div className="comparison-result" aria-live="polite">
        <div><Gauge size={20} /><span>{copy.score}</span><strong>{result.scoreDelta >= 0 ? '+' : ''}{result.scoreDelta}</strong></div>
        <div><ShieldCheck size={20} /><span>{copy.evidence}</span><strong>{result.evidenceDelta >= 0 ? '+' : ''}{result.evidenceDelta}</strong></div>
        <div><CalendarDays size={20} /><span>{copy.period}</span><strong>{result.baseline.observedAt || copy.noDate} / {result.current.observedAt || copy.noDate}</strong></div>
        <p><ArrowUpRight size={16} /> {copy.disclaimer}</p>
      </div>
    </section>
  );
}
