import { ArrowLeft, BadgeCheck, Braces, ExternalLink, Eye, FileText, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPublishedProfile } from '../../../lib/registry-store';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { localizedPath } from '../../../lib/site-i18n.mjs';
import { privateUiCopy } from '../../../lib/private-ui-copy.mjs';
import { localizedRouteMetadata } from '../../../lib/localized-route-metadata.mjs';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ version?: string | string[] }>;
};

type Locale = 'es' | 'en' | 'pt';

export async function generateMetadata({ params }: Pick<PageProps, 'params'>): Promise<Metadata> {
  const { slug } = await params;
  return localizedRouteMetadata('registryProfile', 'es', { slug }) as Metadata;
}

function provenanceLabel(state: string, copy: ReturnType<typeof privateUiCopy>['profile']) {
  if (state === 'verified') return copy.verifiedLabel;
  if (state === 'observed') return copy.observedLabel;
  if (state === 'owner_declared') return copy.ownerLabel;
  if (state === 'curated_owner_attribution') return copy.curatedLabel;
  return copy.notObserved;
}

export async function RegistryProfileExperience({ params, searchParams, locale = 'es' }: PageProps & { locale?: Locale }) {
  const copy = privateUiCopy(locale).profile;
  const { slug } = await params;
  const query = await searchParams;
  const rawVersion = Array.isArray(query.version) ? query.version[0] : query.version;
  const version = rawVersion && /^\d+$/.test(rawVersion) ? Number(rawVersion) : undefined;
  const profile = await getPublishedProfile(slug, version);
  if (!profile) notFound();

  return (
    <main lang={locale}>
      <SiteHeader routeKey="registryProfile" locale={locale} slug={profile.slug} />
      <section className="profile-hero">
        <a className="profile-back" href={localizedPath('registry', locale) || '/registry'}><ArrowLeft size={16} /> {copy.back}</a>
        <div className="profile-hero-grid">
          <div>
            <span>{copy.publicProfile} · v{profile.version}</span>
            <h1>{profile.organization}</h1>
            <a className="profile-origin" href={profile.canonicalOrigin} target="_blank" rel="noreferrer">
              {profile.verification.hostname} <ExternalLink size={15} />
            </a>
          </div>
          <div className="profile-score">
            <span>{copy.observedLevel}</span>
            <strong>{profile.readiness.level}</strong>
            <small>{profile.readiness.score === null ? copy.noAudit : `${profile.readiness.score}/100`}</small>
          </div>
        </div>
        <div className="profile-provenance">
          <span data-state="owner_declared"><FileText size={15} /> {copy.ownerDeclared}</span>
          <span data-state="observed"><Eye size={15} /> {copy.observed}</span>
          <span data-state="verified"><BadgeCheck size={15} /> {copy.verified}</span>
        </div>
      </section>

      <section className="profile-layout">
        <div className="profile-content">
          <section className="profile-section">
            <header><span>01</span><div><h2>{copy.identityTitle}</h2><p>{copy.identityBody}</p></div></header>
            <dl className="profile-facts">
              <div><dt>{copy.siteType}</dt><dd>{profile.siteType || copy.notDeclared}</dd></div>
              <div><dt>{copy.audiences}</dt><dd>{profile.audiences.join(', ') || copy.notDeclared}</dd></div>
              <div><dt>{copy.sectors}</dt><dd>{profile.sectors.join(', ') || copy.notDeclared}</dd></div>
              <div><dt>{copy.languages}</dt><dd>{profile.languages.join(', ') || copy.notDeclared}</dd></div>
            </dl>
          </section>

          <section className="profile-section">
            <header><span>02</span><div><h2>{copy.capabilitiesTitle}</h2><p>{copy.capabilitiesBody}</p></div></header>
            <div className="profile-evidence-grid">
              <div>
                <h3>{copy.declared}</h3>
                {profile.declaredCapabilities.length
                  ? profile.declaredCapabilities.map((item) => <p key={item}><FileText size={14} /> {item}<small>{copy.ownerDeclared}</small></p>)
                  : <p>{copy.noDeclaredCapabilities}</p>}
              </div>
              <div>
                <h3>{copy.observedPlural}</h3>
                {profile.observedResources.length
                  ? profile.observedResources.map((item) => <a href={item.url} target="_blank" rel="noreferrer" key={`${item.type}-${item.url}`}><Eye size={14} /> {item.type}<small>{item.observedAt.slice(0, 10)}</small></a>)
                  : <p>{copy.noObservation}</p>}
              </div>
            </div>
          </section>

          <section className="profile-section">
            <header><span>03</span><div><h2>{copy.sourcesTitle}</h2><p>{copy.sourcesBody}</p></div></header>
            <div className="profile-source-list">
              {profile.publicSources.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                  <div><strong>{source.title}</strong><small>{provenanceLabel(source.state, copy)} · {source.observedAt.slice(0, 10)}</small></div>
                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="profile-aside">
          <section>
            <ShieldCheck size={21} />
            <span>{copy.siteIdentity}</span><strong>{provenanceLabel(profile.verification.status, copy)}</strong>
            <dl>
              <div><dt>{copy.method}</dt><dd>{profile.verification.method || copy.notRegistered}</dd></div>
              <div><dt>{copy.registered}</dt><dd>{profile.verification.verifiedAt.slice(0, 10) || copy.notRegistered}</dd></div>
              <div><dt>{copy.validUntil}</dt><dd>{profile.verification.verifiedUntil.slice(0, 10) || copy.notApplicable}</dd></div>
            </dl>
          </section>
          <section>
            <span>{copy.agentFormats}</span>
            <a href={`/registry/${profile.slug}/profile.json${version ? `?version=${version}` : ''}`}><Braces size={16} /> {copy.json}</a>
            <a href={`/registry/${profile.slug}/profile.md${version ? `?version=${version}` : ''}`}><FileText size={16} /> {copy.markdown}</a>
          </section>
          <section id="history">
            <span>{copy.history}</span><p>v{profile.version} · {profile.publishedAt.slice(0, 10)}. {copy.historyText}</p>
          </section>
        </aside>
      </section>

      <section className="profile-limits">
        <h2>{copy.limitsTitle}</h2>
        <div>{profile.limits.map((limit) => <p key={limit}>{limit}</p>)}</div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

export default async function RegistryProfilePage(props: PageProps) { return <RegistryProfileExperience {...props} />; }
import type { Metadata } from 'next';
