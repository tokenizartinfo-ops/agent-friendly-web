import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CommercialControlDashboard } from '../../components/commercial-control-dashboard';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { createCommercialControlSnapshot, evaluateCommercialControlAccess } from '../../../lib/commercial-control.mjs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Centro Comercial local | Agent Friendly Web',
  description: 'Superficie local de planificacion con datos sinteticos.',
  robots: { index: false, follow: false },
};

export default function CommercialControlPage() {
  const access = evaluateCommercialControlAccess({
    runtime: import.meta.env.DEV ? 'afw_local_dev' : 'afw_public_prod',
    localFlag: import.meta.env.DEV ? 'true' : 'false',
  });
  if (!access.allowed) notFound();

  return <CommercialControlDashboard snapshot={createCommercialControlSnapshot()} />;
}
