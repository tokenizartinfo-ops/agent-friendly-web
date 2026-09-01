import { cloudflareAccessSignOutPath, requireCloudflareAccessUser } from '../cloudflare-access-auth';
import { IntakeWorkspace } from '../components/intake-workspace';
import { SiteHeader } from '../components/site-header';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';

export const metadata: Metadata = localizedRouteMetadata('dossier', 'es') as Metadata;

export const dynamic = 'force-dynamic';

type Locale = 'es' | 'en' | 'pt';

export async function DossierExperience({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = privateUiCopy(locale).dossier;
  const returnPath = localizedPath('dossier', locale) || '/expediente';
  const user = await requireCloudflareAccessUser(returnPath);
  return (
    <main lang={locale}>
      <SiteHeader routeKey="dossier" locale={locale} />
      <div className="account-bar">{copy.privateSession}: <strong>{user.email}</strong><a href={cloudflareAccessSignOutPath()}>{copy.signOut}</a></div>
      <IntakeWorkspace userName={user.displayName} userEmail={user.email} locale={locale} />
    </main>
  );
}

export default async function ExpedientePage() { return <DossierExperience />; }
import type { Metadata } from 'next';
