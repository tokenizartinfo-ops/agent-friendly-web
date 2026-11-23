import { buildAiIndexPreparation } from '../../lib/ai-index-preparation.mjs';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';
import { ACTION_PLAN_COPY } from '../../lib/scan-action-plan.mjs';

type Locale = 'es' | 'en' | 'pt';
type Observation = { target: string; checkedAt: string; evidence?: Record<string, boolean> };

const text = {
  es: {
    title: 'Preparar el sitio para AI Index',
    sources: 'Fuentes que declaraste',
    empty: 'Todavía no hay fuentes declaradas.',
    date: 'Última lectura guardada para este sitio',
    noDate: 'No hay una lectura guardada disponible para este sitio.',
    review: 'Compará servicios, fechas y herramientas con las páginas públicas. Si dos fuentes se contradicen, acordá cuál corregir antes de compartirlas.',
    permission: 'La decisión sobre qué páginas compartir se revisa por separado. La ficha no registra esa decisión ni comprueba si el sitio está indexado.',
  },
  en: {
    title: 'Prepare your site for AI Index',
    sources: 'Sources you declared',
    empty: 'You have not declared any sources yet.',
    date: 'Latest saved check for this site',
    noDate: 'There is no saved check available for this site.',
    review: 'Compare services, dates and tools with the public pages. When two sources disagree, agree on what to correct before sharing them.',
    permission: 'Review which pages to share separately. This sheet records no sharing decision or proof of indexing.',
  },
  pt: {
    title: 'Preparar o site para o AI Index',
    sources: 'Fontes que você declarou',
    empty: 'Você ainda não declarou nenhuma fonte.',
    date: 'Última leitura salva para este site',
    noDate: 'Não há uma leitura salva disponível para este site.',
    review: 'Compare serviços, datas e ferramentas com as páginas públicas. Se duas fontes divergirem, combinem o que corrigir antes de compartilhá-las.',
    permission: 'Revise separadamente quais páginas compartilhar. A ficha não registra essa decisão nem comprova que o site está indexado.',
  },
};

export function DossierAiIndexPreparation({ website, contentSources, observation, readState, locale }: {
  website: string; contentSources: string[]; observation: Observation | null; readState: string; locale: Locale;
}) {
  const sheet = buildAiIndexPreparation({ website, contentSources, observation, readState });
  if (!sheet) return null;
  const copy = text[locale];
  const labels = Object.fromEntries(privateUiCopy(locale).intake.content);
  const signals = ACTION_PLAN_COPY[locale].signals as Record<string, string>;
  const states = ACTION_PLAN_COPY[locale].states as Record<string, string>;
  const formattedDate = sheet.observedAt && new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC',
  }).format(new Date(sheet.observedAt));
  return <details id="dossier-ai-index" className="dossier-assistant">
    <summary>{copy.title}</summary>
    <p><strong>{sheet.origin}</strong></p>
    <p>{sheet.declaredSources.length ? copy.sources + ' · ' + sheet.declaredSources.map(id => labels[id]).join(', ') : copy.empty}</p>
    {formattedDate && sheet.observedAt ? <>
      <p>{copy.date} · <time dateTime={sheet.observedAt}>{formattedDate} UTC</time></p>
      <ul>{Object.entries(sheet.signals).map(([id, state]) => <li key={id}>{signals[id]} · {states[state]}</li>)}</ul>
    </> : <p>{copy.noDate}</p>}
    <p>{copy.review}</p>
    <p>{copy.permission}</p>
  </details>;
}
