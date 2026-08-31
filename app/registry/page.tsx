import { ArrowRight, BadgeCheck, Database, Globe2, Search } from 'lucide-react';
import { listPublishedProfiles } from '../../lib/registry-store';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('registry', 'es') as Metadata;

export const dynamic = 'force-dynamic';

type PageProps = { searchParams: Promise<{ q?: string | string[] }> };
type Locale = 'es' | 'en' | 'pt';

export async function RegistryExperience({ searchParams, locale = 'es' }: PageProps & { locale?: Locale }) {
  const copy = privateUiCopy(locale).registry;
  const params = await searchParams;
  const query = (Array.isArray(params.q) ? params.q[0] : params.q || '').trim().toLocaleLowerCase(locale);
  const profiles = await listPublishedProfiles();
  const visible = query
    ? profiles.filter((profile) => [
        profile.organization,
        profile.canonicalOrigin,
        profile.siteType,
        ...profile.sectors,
        ...profile.audiences,
        ...profile.languages,
        profile.readiness.level,
        profile.verification.status,
      ].join(' ').toLocaleLowerCase(locale).includes(query))
    : profiles;

  return (
    <main lang={locale}>
      <SiteHeader routeKey="registry" locale={locale} />
      <section className="registry-hero">
        <div>
          <span>{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.intro}</p>
        </div>
        <aside><Database size={24} /><strong>{profiles.length}</strong><span>{copy.profiles}</span></aside>
      </section>

      <section className="registry-workspace">
        <form className="registry-search" action={localizedPath('registry', locale) || '/registry'} method="get">
          <Search size={19} aria-hidden="true" />
          <label htmlFor="registry-q">{copy.searchLabel}</label>
          <input id="registry-q" name="q" defaultValue={query} placeholder={copy.placeholder} />
          <button type="submit">{copy.search}</button>
        </form>

        <div className="registry-summary">
          <span>{visible.length} {copy.results}</span><p>{copy.disclaimer}</p>
        </div>

        {visible.length ? (
          <div className="registry-list">
            {visible.map((profile) => (
              <article key={profile.slug}>
                <div className="registry-item-icon"><Globe2 size={20} /></div>
                <div className="registry-item-main">
                  <div className="registry-item-title">
                    <h2>{profile.organization}</h2>
                    {profile.verification.status === 'verified' && <span><BadgeCheck size={14} /> {copy.verified}</span>}
                  </div>
                  <a href={profile.canonicalOrigin} target="_blank" rel="noreferrer">{profile.verification.hostname}</a>
                  <div className="registry-tags">
                    <span>{profile.readiness.level}</span>
                    {profile.languages.slice(0, 3).map((language) => <span key={language}>{language}</span>)}
                    {profile.sectors.slice(0, 2).map((sector) => <span key={sector}>{sector}</span>)}
                  </div>
                </div>
                <a className="registry-open" href={localizedPath('registryProfile', locale, { slug: profile.slug }) || `/registry/${profile.slug}`}>{copy.open} <ArrowRight size={16} /></a>
              </article>
            ))}
          </div>
        ) : (
          <div className="registry-empty">
            <Globe2 size={25} />
            <h2>{copy.emptyTitle}</h2><p>{copy.emptyBody}</p><a href={localizedPath('registry', locale) || '/registry'}>{copy.all}</a>
          </div>
        )}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

export default async function RegistryPage(props: PageProps) { return <RegistryExperience {...props} />; }
import type { Metadata } from 'next';
