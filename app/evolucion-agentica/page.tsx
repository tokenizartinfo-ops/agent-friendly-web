/* eslint-disable @next/next/no-html-link-for-pages -- Plain anchors avoid unstable vinext RSC prefetch requests. */

import type { Metadata } from 'next';
import { ArrowRight, BadgeInfo } from 'lucide-react';
import { MaturityDemonstrator } from '../components/maturity-demonstrator';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Evolucion agentica | Agent Friendly Web',
  description: 'Compara como la evidencia publica mejora respuestas y capacidades agenticas por etapas.',
};

export default function AgenticEvolutionPage() {
  return (
    <main>
      <SiteHeader routeKey="evolution" />
      <section className="document-hero evolution-hero">
        <span>Comparador AF-0 a AF-5</span>
        <h1>De una web dificil de interpretar a una plataforma nativa para agentes.</h1>
        <p>
          Recorre ejemplos de un Restaurante, una Municipalidad y Tokenizart. Cada etapa muestra como cambia una respuesta cuando aparecen mejores fuentes, datos y herramientas.
        </p>
        <div className="illustrative-note"><BadgeInfo size={18} /><p>La comparacion es ilustrativa: mejorar evidencia aumenta la capacidad de responder con precision, pero no garantiza indexacion, ranking, recomendacion ni una redaccion identica en GPT, Gemini, Claude u otro modelo.</p></div>
      </section>

      <MaturityDemonstrator />

      <section className="evolution-next">
        <div><span>Siguiente movimiento</span><h2>Audita evidencia antes de prometer capacidades.</h2><p>El puntaje solo cambia cuando la mejora puede observarse en el origen publico. MCP, A2A, WebMCP o x402 no cuentan por estar en un roadmap.</p></div>
        <a href="/#auditar">Auditar un sitio <ArrowRight size={17} /></a>
      </section>

      <SiteFooter />
    </main>
  );
}
