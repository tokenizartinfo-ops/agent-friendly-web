import { ArrowRight, Building2, CheckCircle2, Languages, ScanSearch } from 'lucide-react';
import { SECTOR_CONTENT } from '../../lib/sector-content.mjs';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type Locale = 'es' | 'en' | 'pt';

export function SectorGuidePage({ locale }: { locale: Locale }) {
  const content = SECTOR_CONTENT[locale];
  const languageRoutes = (['es', 'en', 'pt'] as const).map((target) => [target.toUpperCase(), localizedPath('sectors', target) || '/']);

  return (
    <main lang={locale}>
      <SiteHeader locale={locale} routeKey="sectors" />
      <section className="sector-hero">
        <div>
          <span>{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
          <div className="aeo-actions">
            <a href={localizedPath('home', locale, { hash: 'auditar' }) || '/#auditar'}>{content.auditLabel} <ArrowRight size={17} /></a>
            <a href={localizedPath('measurement', locale) || '/medir-mejora'}>{content.measureLabel}</a>
          </div>
        </div>
        <aside className="language-switch" aria-label={content.languageLabel}>
          <Languages size={22} />
          <span>{content.languageLabel}</span>
          <div>{languageRoutes.map(([label, href]) => <a aria-current={href === localizedPath('sectors', locale) ? 'page' : undefined} href={href} key={href}>{label}</a>)}</div>
        </aside>
      </section>

      <section className="sector-directory">
        <div className="aeo-section-heading">
          <span>{locale === 'en' ? 'Different questions, shared discipline' : locale === 'pt' ? 'Perguntas diferentes, uma disciplina comum' : 'Preguntas diferentes, una disciplina comun'}</span>
          <h2>{locale === 'en' ? 'Start with the facts people and agents actually need.' : locale === 'pt' ? 'Comece pelos fatos que pessoas e agentes realmente precisam.' : 'Empeza por los hechos que personas y agentes realmente necesitan.'}</h2>
        </div>
        <div className="sector-list">
          {content.sectors.map((sector: { audience: string; value: string; firstStep: string }, index: number) => (
            <article key={sector.audience}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><Building2 size={20} /><h3>{sector.audience}</h3><p>{sector.value}</p></div>
              <div className="sector-step"><CheckCircle2 size={17} /><p>{sector.firstStep}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="sector-closing">
        <ScanSearch size={27} />
        <div><h2>{content.closingTitle}</h2><p>{content.closingBody}</p></div>
        <a href={localizedPath('dossier', locale) || '/expediente'}>{locale === 'en' ? 'Open my dossier' : locale === 'pt' ? 'Abrir meu dossiê' : 'Abrir mi expediente'} <ArrowRight size={16} /></a>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
