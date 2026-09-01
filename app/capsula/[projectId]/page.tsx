import { cloudflareAccessSignOutPath, requireCloudflareAccessUser } from '../../cloudflare-access-auth';
import { CapsuleReview } from '../../components/capsule-review';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { localizedPath } from '../../../lib/site-i18n.mjs';
import { privateUiCopy } from '../../../lib/private-ui-copy.mjs';
import { localizedRouteMetadata } from '../../../lib/localized-route-metadata.mjs';

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ projectId: string }> };
type Locale = 'es' | 'en' | 'pt';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { projectId } = await params;
  return localizedRouteMetadata('capsule', 'es', { projectId }) as Metadata;
}

export async function CapsulePageExperience({ projectId, locale = 'es' }: { projectId: string; locale?: Locale }) {
  const copy = privateUiCopy(locale).capsule;
  const returnPath = localizedPath('capsule', locale, { projectId }) || `/capsula/${projectId}`;
  const user = await requireCloudflareAccessUser(returnPath);
  return (
    <main lang={locale}>
      <SiteHeader routeKey="capsule" locale={locale} projectId={projectId} />
      <div className="account-bar">{copy.privateReview}: <strong>{user.email}</strong><a href={cloudflareAccessSignOutPath()}>{copy.signOut}</a></div>
      <section className="capsule-page-hero">
        <span>{copy.eyebrow}</span><h1>{copy.pageTitle}</h1><p>{copy.pageIntro}</p>
      </section>
      <div className="capsule-page-shell"><CapsuleReview projectId={projectId} locale={locale} /></div>
      <SiteFooter locale={locale} />
    </main>
  );
}

export default async function CapsulePage({ params }: PageProps) {
  const { projectId } = await params;
  return <CapsulePageExperience projectId={projectId} />;
}
import type { Metadata } from 'next';
