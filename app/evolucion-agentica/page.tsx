import type { Metadata } from 'next';
import { ArrowRight, BadgeInfo } from 'lucide-react';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';
import { MaturityDemonstrator } from '../components/maturity-demonstrator';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { MATURITY_COPY } from '../../lib/home-copy.mjs';

export const metadata: Metadata = localizedRouteMetadata('evolution', 'es') as Metadata;

type Locale = 'es' | 'en' | 'pt';

const evolutionCopy = {
  es: { eyebrow: 'Comparador AF-0 a AF-5', title: 'De una web difícil de interpretar a una plataforma nativa para agentes.', intro: 'Recorre ejemplos de un restaurante, una municipalidad y Tokenizart. Cada etapa muestra cómo cambia una respuesta cuando aparecen mejores fuentes, datos y herramientas.', processTitle: 'El avance no es automático.', process: 'Cada nivel requiere evidencia pública, implementación real, validación, límites explícitos, aprobación humana cuando corresponde y una nueva medición.', note: 'La comparación es ilustrativa: mejorar evidencia aumenta la capacidad de responder con precisión, pero no garantiza indexación, ranking, recomendación ni una redacción idéntica en GPT, Gemini, Claude u otro modelo.', next: 'Siguiente movimiento', nextTitle: 'Audita evidencia antes de prometer capacidades.', nextBody: 'El puntaje solo cambia cuando la mejora puede observarse en el origen público. MCP, A2A, WebMCP o x402 no cuentan por estar en un roadmap.', audit: 'Auditar un sitio' },
  en: { eyebrow: 'AF-0 to AF-5 comparison', title: 'From a hard-to-interpret website to an agent-native platform.', intro: 'Explore restaurant, municipality and Tokenizart examples. Each stage shows how an answer changes as better sources, data and tools appear.', processTitle: 'Progress is not automatic.', process: 'Each level requires public evidence, real implementation, validation, explicit limits, human approval where needed and a new measurement.', note: 'The comparison is illustrative: better evidence improves answer precision, but does not guarantee indexing, ranking, recommendation or identical wording in GPT, Gemini, Claude or another model.', next: 'Next move', nextTitle: 'Audit evidence before promising capabilities.', nextBody: 'The score changes only when an improvement can be observed at the public origin. MCP, A2A, WebMCP or x402 do not count merely because they appear on a roadmap.', audit: 'Audit a website' },
  pt: { eyebrow: 'Comparador AF-0 a AF-5', title: 'De um site difícil de interpretar a uma plataforma nativa para agentes.', intro: 'Explore exemplos de restaurante, município e Tokenizart. Cada etapa mostra como uma resposta muda quando surgem melhores fontes, dados e ferramentas.', processTitle: 'O avanço não é automático.', process: 'Cada nível exige evidência pública, implementação real, validação, limites explícitos, aprovação humana quando necessário e uma nova medição.', note: 'A comparação é ilustrativa: melhorar evidências aumenta a precisão das respostas, mas não garante indexação, ranking, recomendação ou texto idêntico em GPT, Gemini, Claude ou outro modelo.', next: 'Próximo movimento', nextTitle: 'Audite evidências antes de prometer capacidades.', nextBody: 'A pontuação só muda quando a melhoria pode ser observada na origem pública. MCP, A2A, WebMCP ou x402 não contam apenas por estarem no roadmap.', audit: 'Auditar um site' },
} as const;

export function AgenticEvolutionExperience({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = evolutionCopy[locale];
  const maturity = MATURITY_COPY[locale] || MATURITY_COPY.es;
  return (
    <main lang={locale}>
      <SiteHeader routeKey="evolution" locale={locale} />
      <section className="document-hero evolution-hero">
        <span>{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
        <div className="illustrative-note"><BadgeInfo size={18} /><p>{copy.note}</p></div>
      </section>

      <section className="evolution-stage-guide" aria-labelledby="evolution-stage-guide-title">
        <header>
          <span>{copy.processTitle}</span>
          <h2 id="evolution-stage-guide-title">{maturity.title}</h2>
          <p>{copy.process}</p>
        </header>
        <div>
          {maturity.stages.map(([level, title, detail], index) => (
            <article id={`af-${index}`} key={level}>
              <span>{level}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <MaturityDemonstrator locale={locale} />

      <section className="evolution-next">
        <div><span>{copy.next}</span><h2>{copy.nextTitle}</h2><p>{copy.nextBody}</p></div>
        <a href={localizedPath('home', locale, { hash: 'auditar' }) || '/#auditar'}>{copy.audit} <ArrowRight size={17} /></a>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}

export default function AgenticEvolutionPage() { return <AgenticEvolutionExperience />; }
