import { MATURITY_STAGES } from '../../lib/maturity-copy.mjs';
import { ArrowRight, Bot, FileCheck2, ShieldCheck } from './client-icons';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { publicPageCopy } from '../../lib/public-page-copy.mjs';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type Locale = 'es' | 'en' | 'pt';

export function LocalizedPublicPage({ pageKey, locale }: { pageKey: string; locale: Locale }) {
  const page = publicPageCopy(pageKey, locale);
  if (!page) return null;
  const ctaHref = localizedPath(page.cta.routeKey, locale, page.cta.hash ? { hash: page.cta.hash } : {}) || '/';

  return (
    <main lang={locale}>
      <SiteHeader locale={locale} routeKey={pageKey} />
      <section className="localized-comic-hero">
        <div>
          <span><Bot size={17} /> {page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <a href={ctaHref}>{page.cta.label} <ArrowRight size={17} /></a>
        </div>
        <aside aria-label={page.eyebrow}>
          <div className="comic-speech-bubble">AF</div>
          <strong>F0 → F5</strong>
          <small>evidence · tools · governance</small>
        </aside>
      </section>

      <section className="localized-comic-sections">
        {page.sections.map((section: { title: string; body: string }, index: number) => (
          <article key={section.title}>
            <span>0{index + 1}</span>
            <FileCheck2 size={20} />
            <div><h2>{section.title}</h2><p>{section.body}</p></div>
          </article>
        ))}
      </section>

      {pageKey === 'methodology' ? <section className="maturity-section">
        <h2>{locale === 'en' ? 'Maturity stages' : locale === 'pt' ? 'Etapas de maturidade' : 'Niveles de madurez'}</h2>
        <p>{locale === 'en' ? 'These names describe the product journey. Historical auditor v1 results retain their original labels, including “AF-5 transactional”. A high score does not prove payments or permission to act.' : locale === 'pt' ? 'Estes nomes descrevem a jornada do produto. Resultados históricos do auditor v1 mantêm seus rótulos originais, incluindo “AF-5 transacional”. Uma pontuação alta não comprova pagamentos nem permissão para agir.' : 'Estos nombres describen la ruta del producto. Los resultados históricos del auditor v1 conservan sus etiquetas originales. Un puntaje alto no acredita pagos ni permisos para actuar.'}</p>
        <div className="maturity-list">{MATURITY_STAGES[locale].map(([level, title, detail]) => <div key={level}><span>{level}</span><strong>{title}</strong><p>{detail}</p></div>)}</div>
      </section> : null}
      <section className="localized-comic-limits">
        <div><ShieldCheck size={22} /><strong>{locale === 'en' ? 'Visible boundaries' : locale === 'pt' ? 'Limites visíveis' : 'Límites visibles'}</strong></div>
        <ul>{page.limits.map((limit: string) => <li key={limit}>{limit}</li>)}</ul>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
