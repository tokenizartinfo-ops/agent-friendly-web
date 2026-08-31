import type { Metadata } from 'next';
import { SectorGuidePage } from '../../components/sector-guide-page';
import { localizedRouteMetadata } from '../../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('sectors', 'pt') as Metadata;

export default function PortugueseSectorsPage() {
  return <SectorGuidePage locale="pt" />;
}
