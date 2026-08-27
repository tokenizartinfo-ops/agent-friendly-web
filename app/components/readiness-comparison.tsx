'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, CalendarDays, Gauge, ShieldCheck } from 'lucide-react';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { compareReadinessSnapshots } from '../../lib/readiness-comparison.mjs';

export function ReadinessComparison() {
  const [baseline, setBaseline] = useState({ score: 20, evidenceCount: 3, observedAt: '2026-08-01' });
  const [current, setCurrent] = useState({ score: 55, evidenceCount: 9, observedAt: '2026-08-27' });
  const result = useMemo(() => compareReadinessSnapshots(baseline, current), [baseline, current]);

  const update = (target: 'baseline' | 'current', field: string, value: string) => {
    const setter = target === 'baseline' ? setBaseline : setCurrent;
    setter((previous) => ({ ...previous, [field]: field === 'observedAt' ? value : Number(value) }));
  };

  return (
    <section className="comparison-tool" aria-label="Comparador de evidencia">
      <div className="snapshot-grid">
        {([['baseline', 'Antes', baseline], ['current', 'Ahora', current]] as const).map(([key, label, snapshot]) => (
          <fieldset key={key}>
            <legend>{label}</legend>
            <label><span>Puntaje AF observado o registrado</span><input type="number" min="0" max="100" value={snapshot.score} onChange={(event) => update(key, 'score', event.target.value)} /></label>
            <label><span>Evidencias publicas verificadas</span><input type="number" min="0" max="250" value={snapshot.evidenceCount} onChange={(event) => update(key, 'evidenceCount', event.target.value)} /></label>
            <label><span>Fecha de observacion</span><input type="date" value={snapshot.observedAt} onChange={(event) => update(key, 'observedAt', event.target.value)} /></label>
          </fieldset>
        ))}
      </div>
      <div className="comparison-result" aria-live="polite">
        <div><Gauge size={20} /><span>Puntaje</span><strong>{result.scoreDelta >= 0 ? '+' : ''}{result.scoreDelta}</strong></div>
        <div><ShieldCheck size={20} /><span>Evidencias</span><strong>{result.evidenceDelta >= 0 ? '+' : ''}{result.evidenceDelta}</strong></div>
        <div><CalendarDays size={20} /><span>Periodo</span><strong>{result.baseline.observedAt || 'sin fecha'} / {result.current.observedAt || 'sin fecha'}</strong></div>
        <p><ArrowUpRight size={16} /> Esta lectura compara evidencia. No garantiza ranking, indexacion ni recomendacion por un proveedor.</p>
      </div>
    </section>
  );
}
