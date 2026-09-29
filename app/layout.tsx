import type { Metadata } from 'next';
import './fonts.css';
import { headers } from 'next/headers';
import './globals.css';
import { localeFromRequestHeader } from '../lib/request-locale.mjs';

export const metadata: Metadata = {
  metadataBase: new URL('https://agentfriendlyweb.dev'),
  title: 'Agent Friendly Web | Auditoria y mejora progresiva',
  description: 'Audita como agentes y motores de respuesta descubren, entienden y utilizan un sitio web.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Agent Friendly Web',
    description: 'Descubri que entiende un agente de tu sitio.',
    images: [{ url: '/og.png', width: 1728, height: 909, alt: 'Agent Friendly Web' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Friendly Web',
    description: 'Descubri que entiende un agente de tu sitio.',
    images: ['/og.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = localeFromRequestHeader(requestHeaders.get('x-agent-friendly-locale'));

  return (
    <html lang={locale}>
      <head>
        <link rel="ard" href="/.well-known/ard.json" type="application/json" />
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" type="application/json" />
        <link rel="alternate" href="/index.md" type="text/markdown" title="Agent Friendly Web in Markdown" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
