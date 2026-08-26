import { ScanWorkspace } from './components/scan-workspace';
import { SiteHeader } from './components/site-header';

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Agent Friendly Web',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    author: { '@type': 'Person', name: 'Gabriel Mucchiut' },
    description: 'Auditor publico y expediente guiado para mejorar el descubrimiento y uso agentico de sitios web.',
    url: 'https://agentfriendlyweb.dev/',
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />

      <ScanWorkspace />

      <footer>
        <p>Iniciativa creada por Gabriel Mucchiut e incubada dentro de la infraestructura de Tokenizart.</p>
        <p>Evidencia publica, metodologia abierta y mejoras progresivas.</p>
      </footer>
    </main>
  );
}
