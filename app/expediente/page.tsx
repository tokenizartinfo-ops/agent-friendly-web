import { cloudflareAccessSignOutPath, requireCloudflareAccessUser } from '../cloudflare-access-auth';
import { IntakeWorkspace } from '../components/intake-workspace';
import { SiteHeader } from '../components/site-header';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';
import { notFound } from 'next/navigation';
import { env } from 'cloudflare:workers';

export const metadata: Metadata = localizedRouteMetadata('dossier', 'es') as Metadata;

export const dynamic = 'force-dynamic';

type Locale = 'es' | 'en' | 'pt';

type DossierProps = { locale?: Locale; searchParams?: Promise<{ project?: string | string[] }> };

export async function DossierExperience({ locale = 'es', searchParams }: DossierProps = {}) {
  const copy = privateUiCopy(locale).dossier;
  const { project } = await (searchParams || Promise.resolve({} as { project?: string | string[] }));
  const returnPath = localizedPath('dossier', locale, { projectId: project });
  if (!returnPath) notFound();
  const projectId = typeof project === 'string' ? project : undefined;
  const user = await requireCloudflareAccessUser(returnPath);
  return (
    <main lang={locale}>
      <SiteHeader routeKey="dossier" locale={locale} projectId={projectId} />
      <div className="account-bar">{copy.privateSession}: <strong>{user.email}</strong><a href={cloudflareAccessSignOutPath()}>{copy.signOut}</a></div>
      <IntakeWorkspace userName={user.displayName} userEmail={user.email} locale={locale} copilotEnabled={String(env.AFW_COPILOT_ENABLED) === 'true'} copilotProjectId={env.AFW_COPILOT_PROJECT_ID} />
    </main>
  );
}

export default async function ExpedientePage({ searchParams }: DossierProps) { return <DossierExperience searchParams={searchParams} />; }
import type { Metadata } from 'next';
