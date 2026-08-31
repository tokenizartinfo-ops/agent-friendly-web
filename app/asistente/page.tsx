import type { Metadata } from 'next';
import { BadgeInfo } from 'lucide-react';
import { IntakeAssistantPrototype } from '../components/intake-assistant-prototype';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { publicToolsCopy } from '../../lib/public-tools-copy.mjs';

export const metadata: Metadata = {
  title: 'Asistente de preparacion | Agent Friendly Web',
  description: 'Prototipo local que ordena contexto desestructurado en propuestas revisables sin guardar ni publicar.',
};

type Locale = 'es' | 'en' | 'pt';

export function AssistantExperience({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = publicToolsCopy(locale).assistant;
  return (
    <main lang={locale}>
      <SiteHeader routeKey="assistant" locale={locale} />
      <section className="document-hero assistant-hero">
        <span>{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.intro}</p>
        <div className="illustrative-note"><BadgeInfo size={18} /><p>{copy.note}</p></div>
      </section>
      <IntakeAssistantPrototype locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}

export default function AssistantPage() { return <AssistantExperience />; }
