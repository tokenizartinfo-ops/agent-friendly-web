import type { Metadata } from 'next';
import { SectorGuidePage } from '../components/sector-guide-page';

export const metadata: Metadata = {
  title: 'Soluciones por sector | Agent Friendly Web',
  description: 'Aplicaciones de AEO y preparacion agentica para cultura, instituciones, comercios, plataformas y profesionales.',
  alternates: { canonical: '/sectores', languages: { en: '/en/sectors', pt: '/pt/setores' } },
};

export default function SectorsPage() {
  return <SectorGuidePage locale="es" />;
}
