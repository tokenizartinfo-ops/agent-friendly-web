import { MaturityMap } from './components/maturity-map';
import { PublicWebMcpRegistration } from './components/public-webmcp-registration';
import { ScanWorkspace } from './components/scan-workspace';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { HOME_COPY } from '../lib/home-copy.mjs';
import { localizedPath } from '../lib/site-i18n.mjs';
import { localizedRouteMetadata } from '../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('home', 'es') as Metadata;

type HomeProps = {
  searchParams?: Promise<{ site?: string | string[] }>;
};

type Locale = 'es' | 'en' | 'pt';

export async function HomeExperience({ searchParams, locale = 'es' }: HomeProps & { locale?: Locale }) {
  const query = searchParams ? await searchParams : {};
  const initialSite = Array.isArray(query.site) ? query.site[0] : query.site;
  const copy = HOME_COPY[locale];
  const canonicalPath = localizedPath('home', locale) || '/';
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://agentfriendlyweb.dev/#website',
        name: 'Agent Friendly Web',
        url: `https://agentfriendlyweb.dev${canonicalPath === '/' ? '/' : canonicalPath}`,
        inLanguage: locale,
        creator: { '@id': 'https://agentfriendlyweb.dev/#creator' },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://agentfriendlyweb.dev/#application',
        name: 'Agent Friendly Web public auditor',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        author: { '@id': 'https://agentfriendlyweb.dev/#creator' },
        description: copy.intro,
        url: `https://agentfriendlyweb.dev${canonicalPath === '/' ? '/' : canonicalPath}`,
      },
      {
        '@type': 'Person',
        '@id': 'https://agentfriendlyweb.dev/#creator',
        name: 'Gabriel Mucchiut',
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://agentfriendlyweb.dev/metodologia#method',
        name: 'Agent Friendly Web Method v1',
        creator: { '@id': 'https://agentfriendlyweb.dev/#creator' },
        url: `https://agentfriendlyweb.dev${localizedPath('methodology', locale)}`,
        isAccessibleForFree: true,
      },
    ],
  };
  return (
    <main lang={locale}>
      <PublicWebMcpRegistration />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader locale={locale} routeKey="home" />

      <ScanWorkspace initialSite={initialSite} locale={locale} />
      <MaturityMap locale={locale} />

      <SiteFooter locale={locale} />
    </main>
  );
}

export default async function Home(props: HomeProps) {
  return <HomeExperience {...props} locale="es" />;
}
import type { Metadata } from 'next';
