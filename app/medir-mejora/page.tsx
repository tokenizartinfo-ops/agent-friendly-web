import type { Metadata } from 'next';
import { BadgeInfo, History, ScanSearch, ShieldCheck } from 'lucide-react';
import { ReadinessComparison } from '../components/readiness-comparison';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { publicToolsCopy } from '../../lib/public-tools-copy.mjs';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('measurement', 'es') as Metadata;

type Locale = 'es' | 'en' | 'pt';

export function MeasureImprovementExperience({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = publicToolsCopy(locale).measure;
  return (
    <main lang={locale}>
      <SiteHeader routeKey="measurement" locale={locale} />
      <section className="document-hero measure-hero">
        <span>{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
        <div className="illustrative-note"><BadgeInfo size={18} /><p>{copy.note}</p></div>
      </section>
      <ReadinessComparison locale={locale} />
      <section className="measurement-method">
        {[ScanSearch, History, ShieldCheck].map((Icon, index) => <article key={copy.method[index][0]}><Icon size={21} /><span>{index + 1}</span><h2>{copy.method[index][0]}</h2><p>{copy.method[index][1]}</p></article>)}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

export default function MeasureImprovementPage() { return <MeasureImprovementExperience />; }
