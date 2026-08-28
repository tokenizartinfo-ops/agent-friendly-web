import { chatGPTSignOutPath, requireChatGPTUser } from '../../chatgpt-auth';
import { CapsuleReview } from '../../components/capsule-review';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ projectId: string }> };

export default async function CapsulePage({ params }: PageProps) {
  const { projectId } = await params;
  const user = await requireChatGPTUser(`/capsula/${projectId}`);
  return (
    <main>
      <SiteHeader />
      <div className="account-bar">Revision privada: <strong>{user.email}</strong><a href={chatGPTSignOutPath('/')}>Cerrar sesion</a></div>
      <section className="capsule-page-hero">
        <span>Handoff controlado</span>
        <h1>Revisa la version exacta antes de autorizarla.</h1>
        <p>Esta pantalla solo permite leer, descargar, aprobar o rechazar la capsula. No muestra el resto del expediente y no modifica el sitio.</p>
      </section>
      <div className="capsule-page-shell"><CapsuleReview projectId={projectId} /></div>
      <SiteFooter />
    </main>
  );
}
