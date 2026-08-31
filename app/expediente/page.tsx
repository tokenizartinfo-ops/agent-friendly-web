import { chatGPTSignOutPath, requireChatGPTUser } from '../chatgpt-auth';
import { IntakeWorkspace } from '../components/intake-workspace';
import { SiteHeader } from '../components/site-header';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';

export const dynamic = 'force-dynamic';

type Locale = 'es' | 'en' | 'pt';

export async function DossierExperience({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = privateUiCopy(locale).dossier;
  const returnPath = localizedPath('dossier', locale) || '/expediente';
  const user = await requireChatGPTUser(returnPath);
  return (
    <main lang={locale}>
      <SiteHeader routeKey="dossier" locale={locale} />
      <div className="account-bar">{copy.privateSession}: <strong>{user.email}</strong><a href={chatGPTSignOutPath(localizedPath('home', locale) || '/')}>{copy.signOut}</a></div>
      <IntakeWorkspace userName={user.displayName} userEmail={user.email} locale={locale} />
    </main>
  );
}

export default async function ExpedientePage() { return <DossierExperience />; }
