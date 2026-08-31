import type { Metadata } from 'next';
import { SectorGuidePage } from '../components/sector-guide-page';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('sectors', 'es') as Metadata;

export default function SectorsPage() {
  return <SectorGuidePage locale="es" />;
}
