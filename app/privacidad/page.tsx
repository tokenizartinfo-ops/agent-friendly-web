import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '../components/privacy-policy-page';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('privacy', 'es') as Metadata;

export default function PrivacyPage() {
  return <PrivacyPolicyPage locale="es" />;
}
