import { ArrowRight, Circle, CircleCheck, Network } from 'lucide-react';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { MATURITY_COPY } from '../../lib/home-copy.mjs';

export function MaturityMap({ locale = 'es' }: { locale?: 'es' | 'en' | 'pt' } = {}) {
  const copy = MATURITY_COPY[locale] || MATURITY_COPY.es;
  return (
    <section className="maturity-map-band" id="ruta-de-madurez" aria-labelledby="maturity-map-title">
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
            <div className="af-robot" data-equipped={index} aria-hidden="true">
              {index >= 5 ? <i className="robot-cape" /> : null}
              {index >= 1 ? <i className="robot-antenna" /> : null}
              <i className="robot-head"><b /><b /></i>
              {index >= 1 ? <i className="robot-visor" /> : null}
              <i className="robot-body" />
              <i className="robot-arm robot-arm-left" />
              <i className="robot-arm robot-arm-right" />
              <i className="robot-foot robot-foot-left" />
              <i className="robot-foot robot-foot-right" />
              {index >= 2 ? <i className="robot-map" /> : null}
              {index >= 3 ? <i className="robot-belt" /> : null}
              {index >= 4 ? <i className="robot-shield" /> : null}
              {index >= 4 ? <i className="robot-gauntlet" /> : null}
              {index >= 5 ? <i className="robot-emblem">AF</i> : null}
            </div>
            <strong>{title}</strong>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
