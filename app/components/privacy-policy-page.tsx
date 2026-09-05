import { ArrowUpRight, Clock3, Database, FileCheck2, Mail, ShieldCheck } from 'lucide-react';
// @ts-expect-error Shared ESM copy is exercised directly by Node tests.
import { privacyNoticeCopy, PRIVACY_CONTACT_EMAIL, PRIVACY_NOTICE_EFFECTIVE_DATE } from '../../lib/privacy-notice-copy.mjs';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type Locale = 'es' | 'en' | 'pt';

export function PrivacyPolicyPage({ locale = 'es' }: { locale?: Locale }) {
  const copy = privacyNoticeCopy(locale);
  const subject = locale === 'en' ? 'Privacy' : locale === 'pt' ? 'Privacidade' : 'Privacidad';

  return (
    <main lang={locale}>
      <SiteHeader locale={locale} routeKey="privacy" />
      <section className="privacy-hero">
        <div>
          <span><ShieldCheck size={17} /> {copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <time dateTime={PRIVACY_NOTICE_EFFECTIVE_DATE}>{PRIVACY_NOTICE_EFFECTIVE_DATE}</time>
        </div>
        <aside aria-label={copy.statusLabel}>
          <Database size={32} />
          <strong>{copy.statusLabel}</strong>
          <p>{copy.statusBody}</p>
        </aside>
      </section>

      <section className="privacy-identity" aria-labelledby="privacy-identity-title">
        <div><FileCheck2 size={21} /><span>01</span></div>
        <div><h2 id="privacy-identity-title">{copy.identityTitle}</h2><p>{copy.identityBody}</p></div>
      </section>

      <section className="privacy-flows" aria-labelledby="privacy-flows-title">
        <header><span>02</span><h2 id="privacy-flows-title">{copy.currentTitle}</h2><p>{copy.currentIntro}</p></header>
        <div>
          {copy.currentFlows.map((flow: { title: string; data: string; purpose: string; storage: string; status: string }) => (
            <article key={flow.title}>
              <strong>{flow.title}</strong>
              <dl>
                <div><dt>{copy.flowLabels.data}</dt><dd>{flow.data}</dd></div>
                <div><dt>{copy.flowLabels.purpose}</dt><dd>{flow.purpose}</dd></div>
                <div><dt>{copy.flowLabels.storage}</dt><dd>{flow.storage}</dd></div>
              </dl>
              <span>{flow.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-retention" aria-labelledby="privacy-retention-title">
        <header><Clock3 size={21} /><div><span>03</span><h2 id="privacy-retention-title">{copy.retentionTitle}</h2><p>{copy.retentionIntro}</p></div></header>
        <div className="privacy-retention-table" role="table" aria-label={copy.retentionTitle}>
          <div role="row" className="privacy-retention-head">
            {copy.retentionHeaders.map((heading: string) => <strong role="columnheader" key={heading}>{heading}</strong>)}
          </div>
          {copy.retentionRows.map((row: readonly string[]) => (
            <div role="row" key={row[0]}>{row.map((value, index) => <span role="cell" key={`${row[0]}-${index}`}>{value}</span>)}</div>
          ))}
        </div>
      </section>

      <section className="privacy-rights" aria-labelledby="privacy-rights-title">
        <div>
          <span>04</span>
          <h2 id="privacy-rights-title">{copy.rightsTitle}</h2>
          <p>{copy.rightsIntro}</p>
          <ul>{copy.rights.map((right: string) => <li key={right}>{right}</li>)}</ul>
        </div>
        <aside>
          <Mail size={25} />
          <strong>{copy.contactLabel}</strong>
          <p>{copy.contactBody}</p>
          <a href={`mailto:${PRIVACY_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}>{copy.contactAction}</a>
        </aside>
      </section>

      <section className="privacy-infrastructure" aria-labelledby="privacy-infrastructure-title">
        <div><span>05</span><h2 id="privacy-infrastructure-title">{copy.infrastructureTitle}</h2><p>{copy.infrastructureBody}</p></div>
        <div>
          <strong>{copy.sourcesTitle}</strong>
          {copy.sources.map((source: { id: string; href: string; label: string }) => (
            <a href={source.href} target="_blank" rel="noreferrer" key={source.id}>{source.label}<ArrowUpRight size={14} /></a>
          ))}
        </div>
      </section>

      <section className="privacy-boundary">
        <ShieldCheck size={24} />
        <div><strong>{copy.boundaryTitle}</strong><p>{copy.boundaryBody}</p></div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
