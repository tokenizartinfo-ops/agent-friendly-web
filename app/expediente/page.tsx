import { cloudflareAccessSignOutPath, requireCloudflareAccessUser } from '../cloudflare-access-auth';
import { IntakeWorkspace } from '../components/intake-workspace';
import { SiteHeader } from '../components/site-header';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';
import { localizedRouteMetadata } from '../../lib/localized-route-metadata.mjs';
import { notFound } from 'next/navigation';
import { env } from 'cloudflare:workers';
import {isAssistanceGoalWindowOpen} from '../../lib/assistance-goal-window.mjs';

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
  const assistanceSettings=env as unknown as Record<string,unknown>;
  return (
    <main lang={locale}>
      <SiteHeader routeKey="dossier" locale={locale} projectId={projectId} />
      <div className="account-bar">{copy.privateSession}: <strong>{user.email}</strong><a href={cloudflareAccessSignOutPath()}>{copy.signOut}</a></div>
      <IntakeWorkspace userName={user.displayName} userEmail={user.email} locale={locale} copilotEnabled={String(env.AFW_COPILOT_ENABLED) === 'true'} copilotProjectId={env.AFW_COPILOT_PROJECT_ID} assistanceGoalProposalEnabled={isAssistanceGoalWindowOpen({AFW_ASSISTANCE_GOAL_CONTEXT_ENABLED:assistanceSettings.AFW_ASSISTANCE_GOAL_PROPOSAL_ENABLED,AFW_ASSISTANCE_GOAL_CONTEXT_EXPIRES_AT:assistanceSettings.AFW_ASSISTANCE_GOAL_PROPOSAL_EXPIRES_AT})} assistanceGoalConsentEnabled={isAssistanceGoalWindowOpen(assistanceSettings)} assistanceEnabled={assistanceSettings.AFW_ASSISTANCE_ENABLED==='true'} assistanceProjectId={typeof assistanceSettings.AFW_ASSISTANCE_PROJECT_ID==='string'?assistanceSettings.AFW_ASSISTANCE_PROJECT_ID:''} />
    </main>
  );
}

export default async function ExpedientePage({ searchParams }: DossierProps) { return <DossierExperience searchParams={searchParams} />; }
import type { Metadata } from 'next';
