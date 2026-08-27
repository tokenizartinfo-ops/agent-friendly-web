import { ScanWorkspace } from './components/scan-workspace';
import { SiteHeader } from './components/site-header';
import { ArrowRight, Layers3 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
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

      <ScanWorkspace />

      <section className="evolution-callout">
        <div className="journey-icon"><Layers3 size={22} /></div>
        <div>
          <span>Demostracion por etapas</span>
          <h2>Compara que puede responder un agente antes y despues.</h2>
          <p>Explora ejemplos de un restaurante, una municipalidad y Tokenizart desde AF-0 hasta AF-5, sin confundir una mejora esperable con una promesa de indexacion.</p>
        </div>
        <Link href="/evolucion-agentica">Ver evolucion <ArrowRight size={17} /></Link>
      </section>

      <footer>
        <p>© 2026 Agent Friendly Web · Creado por Gabriel Mucchiut e incubado dentro de Tokenizart.</p>
        <p>Evidencia publica, metodologia abierta y mejoras progresivas.</p>
      </footer>
    </main>
  );
}
