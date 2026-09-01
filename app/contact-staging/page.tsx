import type { Metadata } from 'next';
import { env } from 'cloudflare:workers';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { ContactIntake } from '../components/contact-intake';
import { SiteHeader } from '../components/site-header';
import { getChatGPTUser } from '../chatgpt-auth';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { authorizeContactStaging, readContactStagingPolicy } from '../../lib/contact-staging-policy.mjs';

type ContactStagingPageBindings = {
  CONTACT_STAGING_MODE?: string;
  CONTACT_STAGING_WRITES_ENABLED?: string;
  CONTACT_STAGING_EXPECTED_HOST?: string;
  CONTACT_STAGING_ALLOWED_EMAILS?: string;
  CONTACT_STAGING_TURNSTILE_SITE_KEY?: string;
};

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Contact staging | Agent Friendly Web',
  robots: { index: false, follow: false, nocache: true },
};

export default async function ContactStagingPage() {
  const bindings = env as unknown as ContactStagingPageBindings;
  const policy = readContactStagingPolicy(bindings);
  const requestHeaders = await headers();
  const user = await getChatGPTUser();
  const authorization = authorizeContactStaging(policy, requestHeaders.get('host') || '', {
    userId: user?.userId || '',
    email: user?.email || '',
  });
  const siteKey = bindings.CONTACT_STAGING_TURNSTILE_SITE_KEY || '';
  if (!authorization.allowed || !siteKey) notFound();

  return (
    <main lang="es">
      <SiteHeader locale="es" routeKey="home" />
      <section className="content-hero compact-hero">
        <div className="eyebrow">Gate 6B · staging privado</div>
        <h1>Prueba sintetica de contacto consentido</h1>
        <p>Esta pantalla no envia correo y solo utiliza la base aislada del entorno privado. El dominio de prueba permanece fijado en example.com.</p>
      </section>
      <section className="content-section">
        <ContactIntake
          domain="example.com"
          locale="es"
          captureEnabled
          endpoint="/api/staging/contact-intake"
          turnstileSiteKey={siteKey}
          syntheticTokenProbe
        />
      </section>
    </main>
  );
}

