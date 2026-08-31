import { ArrowRight, Circle, CircleCheck, Network } from 'lucide-react';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { MATURITY_COPY } from '../../lib/home-copy.mjs';

export function MaturityMap({ locale = 'es' }: { locale?: 'es' | 'en' | 'pt' } = {}) {
  const copy = MATURITY_COPY[locale] || MATURITY_COPY.es;
  return (
    <section className="maturity-map-band" aria-labelledby="maturity-map-title">
      <div className="maturity-map-intro">
        <span><Network size={16} /> {copy.eyebrow}</span>
        <h2 id="maturity-map-title">{copy.title}</h2>
        <p>{copy.intro}</p>
        <a href={localizedPath('evolution', locale) || '/evolucion-agentica'}>{copy.cta} <ArrowRight size={16} /></a>
      </div>
      <ol className="maturity-track">
        {copy.stages.map(([level, title, detail], index) => (
          <li key={level} data-stage={index}>
            <div className="maturity-node">
              {index <= 3 ? <CircleCheck size={18} /> : <Circle size={18} />}
              <span>{level}</span>
            </div>
            <strong>{title}</strong>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
