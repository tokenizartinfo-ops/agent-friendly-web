import { chatGPTSignOutPath, requireChatGPTUser } from '../chatgpt-auth';
import { IntakeWorkspace } from '../components/intake-workspace';
import { SiteHeader } from '../components/site-header';

export const dynamic = 'force-dynamic';

export default async function ExpedientePage() {
  const user = await requireChatGPTUser('/expediente');
  return (
    <main>
      <SiteHeader />
      <div className="account-bar">Sesion privada: <strong>{user.email}</strong><a href={chatGPTSignOutPath('/')}>Cerrar sesion</a></div>
      <IntakeWorkspace userName={user.displayName} userEmail={user.email} />
    </main>
  );
}
