import { MaturityMap } from './components/maturity-map';
import { ScanWorkspace } from './components/scan-workspace';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';

type HomeProps = {
  searchParams?: Promise<{ site?: string | string[] }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const query = searchParams ? await searchParams : {};
  const initialSite = Array.isArray(query.site) ? query.site[0] : query.site;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://agentfriendlyweb.dev/#website',
        name: 'Agent Friendly Web',
        url: 'https://agentfriendlyweb.dev/',
        inLanguage: ['es', 'en'],
        creator: { '@id': 'https://agentfriendlyweb.dev/#creator' },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://agentfriendlyweb.dev/#application',
        name: 'Agent Friendly Web public auditor',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        author: { '@id': 'https://agentfriendlyweb.dev/#creator' },
        description: 'Auditor publico y expediente guiado para mejorar el descubrimiento y uso agentico de sitios web.',
        url: 'https://agentfriendlyweb.dev/',
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
        url: 'https://agentfriendlyweb.dev/metodologia',
        isAccessibleForFree: true,
      },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />

      <ScanWorkspace initialSite={initialSite} />
      <MaturityMap />

      <SiteFooter />
    </main>
  );
}
