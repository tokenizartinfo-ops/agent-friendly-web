import type { Metadata } from 'next';
import { Bot, MessageCircleMore, ShieldCheck } from 'lucide-react';
import { PublicGuideChat } from '../components/public-guide-chat';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Guia publica | Agent Friendly Web',
  description: 'Guia conversacional determinista y con fuentes para entender Agent Friendly Web y elegir un primer paso.',
};

export default function PublicGuidePage() {
  return (
    <main className="public-guide-page">
      <SiteHeader />
      <section className="public-guide-hero">
        <div>
          <span><MessageCircleMore size={16} /> Guia publica v1</span>
          <h1>Pregunta como persona. La guia ordena el recorrido.</h1>
          <p>No necesitas conocer AEO, crawlers, OKF ni protocolos. Contanos que queres lograr y te explicara un paso por vez con fuentes publicas.</p>
        </div>
        <div className="public-guide-hero-note">
          <Bot size={28} />
          <strong>Una conversacion controlada</strong>
          <p>Entiende continuaciones, puede simplificar o profundizar y no inventa capacidades fuera del catalogo.</p>
          <span><ShieldCheck size={14} /> Sin guardado, pagos ni cambios remotos</span>
        </div>
      </section>
      <PublicGuideChat />
      <SiteFooter />
    </main>
  );
}
