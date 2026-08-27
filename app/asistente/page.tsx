import type { Metadata } from 'next';
import { BadgeInfo } from 'lucide-react';
import { IntakeAssistantPrototype } from '../components/intake-assistant-prototype';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Asistente de preparacion | Agent Friendly Web',
  description: 'Prototipo local que ordena contexto desestructurado en propuestas revisables sin guardar ni publicar.',
};

export default function AssistantPage() {
  return (
    <main>
      <SiteHeader />
      <section className="document-hero assistant-hero">
        <span>Bloque 3 · prototipo controlado</span>
        <h1>No necesitas saber como completar un formulario tecnico para empezar.</h1>
        <p>Escribi datos sueltos sobre tu organizacion y el asistente los ordenara como propuestas. Vos revisas cada campo antes de copiar o usar cualquier resultado.</p>
        <div className="illustrative-note"><BadgeInfo size={18} /><p>Esta version es determinista y local. No usa un modelo externo, voz, correo, pagos ni guardado autonomo.</p></div>
      </section>
      <IntakeAssistantPrototype />
      <SiteFooter />
    </main>
  );
}
