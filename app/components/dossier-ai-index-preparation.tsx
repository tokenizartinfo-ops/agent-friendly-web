import { useState } from 'react';
import { prepareAiIndexPageScope } from '../../lib/ai-index-page-scope.mjs';
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
    permission: 'El archivo queda en tu dispositivo. Podés revisarlo con quien mantiene el sitio. AFW no envía la lista ni comprueba si el sitio está indexado.',
    pageHelp: 'Escribí una ruta exacta o URL del mismo sitio por línea. Usá solo páginas que ya sean públicas.',
    include: 'Páginas para considerar',
    exclude: 'Páginas que querés dejar afuera',
    download: 'Descargar borrador (.json)',
    downloaded: 'El borrador está listo para descargar.',
    error: 'No pude preparar la descarga. Tus listas siguen en esta vista.',
    errors: {
      page: 'Revisá las rutas. Usá el mismo sitio y quitá parámetros, fragmentos o comodines.',
      empty: 'Agregá al menos una página.',
      conflict: 'Hay una página en las dos listas. Elegí en cuál debe quedar.',
      length: 'Reducí la propuesta a 50 líneas y 4.000 caracteres entre las dos listas.',
    },
  },
  en: {
    title: 'Prepare your site for AI Index',
    sources: 'Sources you declared',
    empty: 'You have not declared any sources yet.',
    date: 'Latest saved check for this site',
    noDate: 'There is no saved check available for this site.',
    review: 'Compare services, dates and tools with the public pages. When two sources disagree, agree on what to correct before sharing them.',
    permission: 'The file stays on your device. Review it with your site maintainer. AFW does not send the list or check if the site is indexed.',
    pageHelp: 'Enter one exact path or URL from this site per line. Use pages that are already public.',
    include: 'Pages to consider',
    exclude: 'Pages to leave out',
    download: 'Download draft (.json)',
    downloaded: 'Your draft is ready to download.',
    error: 'The download could not be prepared. Your lists are still in this view.',
    errors: {
      page: 'Check each path. Use this site and remove parameters, fragments or wildcards.',
      empty: 'Add at least one page.',
      conflict: 'A page appears in both lists. Choose which list should contain it.',
      length: 'Use up to 50 lines and 4,000 characters across both lists.',
    },
  },
  pt: {
    title: 'Preparar o site para o AI Index',
    sources: 'Fontes que você declarou',
    empty: 'Você ainda não declarou nenhuma fonte.',
    date: 'Última leitura salva para este site',
    noDate: 'Não há uma leitura salva disponível para este site.',
    review: 'Compare serviços, datas e ferramentas com as páginas públicas. Se duas fontes divergirem, combinem o que corrigir antes de compartilhá-las.',
    permission: 'O arquivo fica no seu dispositivo. Revise com quem mantém o site. O AFW não envia a lista nem verifica se o site está indexado.',
    pageHelp: 'Informe um caminho exato ou URL deste site por linha. Use apenas páginas que já são públicas.',
    include: 'Páginas a considerar',
    exclude: 'Páginas a deixar de fora',
    download: 'Baixar rascunho (.json)',
    downloaded: 'O rascunho está pronto para baixar.',
    error: 'Não foi possível preparar o download. Suas listas continuam nesta tela.',
    errors: {
      page: 'Revise os caminhos. Use o mesmo site e retire parâmetros, fragmentos ou curingas.',
      empty: 'Adicione pelo menos uma página.',
      conflict: 'Uma página está nas duas listas. Escolha em qual deve ficar.',
      length: 'Use até 50 linhas e 4.000 caracteres entre as duas listas.',
    },
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
    <PageScopeDraft key={sheet.origin} origin={sheet.origin} copy={copy} />
  </details>;
}

function PageScopeDraft({ origin, copy }: { origin: string; copy: typeof text.es }) {
  const [include, setInclude] = useState('');
  const [exclude, setExclude] = useState('');
  const [message, setMessage] = useState('');

  function download() {
    const result = prepareAiIndexPageScope({ website: origin, include, exclude });
    if (result.status !== 'ready' || !result.draft) {
      const errors: Record<string, string> = copy.errors;
      setMessage(errors[result.code ?? ''] ?? copy.error);
      return;
    }

    let objectUrl: string | undefined;
    const link = document.createElement('a');
    try {
      const file = new Blob([JSON.stringify(result.draft, null, 2) + '\n'], { type: 'application/json' });
      objectUrl = URL.createObjectURL(file);
      link.href = objectUrl;
      link.download = 'afw-ai-index-borrador.json';
      document.body.appendChild(link);
      link.click();
      setMessage(copy.downloaded);
    } catch {
      setMessage(copy.error);
    } finally {
      link.remove();
      if (objectUrl) {
        const url = objectUrl;
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    }
  }

  return <div>
    <p>{copy.pageHelp}</p>
    <label className="wide-field">{copy.include}
      <textarea rows={3} value={include} maxLength={4000} spellCheck={false}
        onChange={event => { setInclude(event.target.value); setMessage(''); }} />
    </label>
    <label className="wide-field">{copy.exclude}
      <textarea rows={2} value={exclude} maxLength={4000} spellCheck={false}
        onChange={event => { setExclude(event.target.value); setMessage(''); }} />
    </label>
    <button type="button" className="secondary-action" onClick={download}>{copy.download}</button>
    <p role="status">{message}</p>
    <p>{copy.permission}</p>
  </div>;
}
