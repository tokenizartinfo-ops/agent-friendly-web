import { ArrowRight, HelpCircle } from 'lucide-react';
import { faqEntries, PUBLIC_FAQ_COPY } from '../../lib/public-faq.mjs';
import { localizedPath } from '../../lib/site-i18n.mjs';

type Locale = 'es' | 'en' | 'pt';

export function PublicFaq({ locale = 'es', limit }: { locale?: Locale; limit?: number } = {}) {
  const copy = PUBLIC_FAQ_COPY[locale] || PUBLIC_FAQ_COPY.es;
  const entries = faqEntries(locale).slice(0, limit || undefined);
  return (
    <section className="public-faq" aria-labelledby="public-faq-title">
      <header>
        <span><HelpCircle size={17} /> {copy.eyebrow}</span>
        <h2 id="public-faq-title">{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>
      <div className="public-faq-list">
        {entries.map((entry) => (
          <details id={`faq-${entry.id}`} key={entry.id}>
            <summary>{entry.question}</summary>
            <div>
              <p>{entry.detailedAnswer}</p>
              <nav aria-label={copy.source}>
                {entry.sources.map((routeKey: string) => (
                  <a href={localizedPath(routeKey, locale) || '/'} key={routeKey}>{copy.source} <ArrowRight size={13} /></a>
                ))}
              </nav>
            </div>
          </details>
        ))}
      </div>
      {limit ? <a className="public-faq-all" href={localizedPath('faq', locale) || '/preguntas-frecuentes'}>{copy.all} <ArrowRight size={16} /></a> : null}
    </section>
  );
}
