import type { Metadata } from 'next';
import { SectorGuidePage } from '../../components/sector-guide-page';
import { localizedRouteMetadata } from '../../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('sectors', 'en') as Metadata;

export default function EnglishSectorsPage() {
  return <SectorGuidePage locale="en" />;
}
