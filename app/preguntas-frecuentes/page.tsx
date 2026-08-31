import type { Metadata } from 'next';
import { PublicFaq } from '../components/public-faq';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { faqEntries, PUBLIC_FAQ_COPY } from '../../lib/public-faq.mjs';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('faq', 'es') as Metadata;

type Locale = 'es' | 'en' | 'pt';

export function PublicFaqExperience({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = PUBLIC_FAQ_COPY[locale] || PUBLIC_FAQ_COPY.es;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: faqEntries(locale).map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.detailedAnswer },
    })),
  };
  return (
    <main lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader routeKey="faq" locale={locale} />
      <section className="document-hero faq-hero"><span>{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.intro}</p></section>
      <PublicFaq locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}

export default function PublicFaqPage() { return <PublicFaqExperience />; }
