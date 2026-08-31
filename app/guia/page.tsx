import type { Metadata } from 'next';
import { Bot, MessageCircleMore, ShieldCheck } from 'lucide-react';
import { PublicGuideChat } from '../components/public-guide-chat';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { publicToolsCopy } from '../../lib/public-tools-copy.mjs';

export const metadata: Metadata = {
  title: 'Guia publica | Agent Friendly Web',
  description: 'Guia conversacional determinista y con fuentes para entender Agent Friendly Web y elegir un primer paso.',
};

type Locale = 'es' | 'en' | 'pt';

export function PublicGuideExperience({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = publicToolsCopy(locale).guide;
  return (
    <main className="public-guide-page" lang={locale}>
      <SiteHeader routeKey="guide" locale={locale} />
      <section className="public-guide-hero">
        <div>
          <span><MessageCircleMore size={16} /> {copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.intro}</p>
        </div>
        <div className="public-guide-hero-note">
          <Bot size={28} /><strong>{copy.noteTitle}</strong><p>{copy.note}</p><span><ShieldCheck size={14} /> {copy.noteLimit}</span>
        </div>
      </section>
      <PublicGuideChat locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}

export default function PublicGuidePage() { return <PublicGuideExperience />; }
