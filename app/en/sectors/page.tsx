import type { Metadata } from 'next';
import { SectorGuidePage } from '../../components/sector-guide-page';

export const metadata: Metadata = {
  title: 'Sector solutions | Agent Friendly Web',
  description: 'AEO and agent-readiness applications for culture, institutions, commerce, platforms and professional services.',
  alternates: { canonical: '/en/sectors', languages: { es: '/sectores', pt: '/pt/setores' } },
};

export default function EnglishSectorsPage() {
  return <SectorGuidePage locale="en" />;
}
