import type { Metadata } from 'next';
import { SectorGuidePage } from '../../components/sector-guide-page';

export const metadata: Metadata = {
  title: 'Solucoes por setor | Agent Friendly Web',
  description: 'Aplicacoes de AEO e preparacao agentica para cultura, instituicoes, comercio, plataformas e profissionais.',
  alternates: { canonical: '/pt/setores', languages: { es: '/sectores', en: '/en/sectors' } },
};

export default function PortugueseSectorsPage() {
  return <SectorGuidePage locale="pt" />;
}
