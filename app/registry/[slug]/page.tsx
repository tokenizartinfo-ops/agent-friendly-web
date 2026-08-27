/* eslint-disable @next/next/no-html-link-for-pages -- Plain anchors avoid unstable vinext RSC prefetch requests. */

import { ArrowLeft, BadgeCheck, Braces, ExternalLink, Eye, FileText, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPublishedProfile } from '../../../lib/registry-store';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ version?: string | string[] }>;
};

function provenanceLabel(state: string) {
  if (state === 'verified') return 'Verificado';
  if (state === 'observed') return 'Observado';
  if (state === 'owner_declared') return 'Declarado por el owner';
  if (state === 'curated_owner_attribution') return 'Caso curado por el owner';
  return 'No observado';
}

export default async function RegistryProfilePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const rawVersion = Array.isArray(query.version) ? query.version[0] : query.version;
  const version = rawVersion && /^\d+$/.test(rawVersion) ? Number(rawVersion) : undefined;
  const profile = await getPublishedProfile(slug, version);
  if (!profile) notFound();

  return (
    <main>
      <SiteHeader />
      <section className="profile-hero">
        <a className="profile-back" href="/registry"><ArrowLeft size={16} /> Registry</a>
        <div className="profile-hero-grid">
          <div>
            <span>Perfil publico · version {profile.version}</span>
            <h1>{profile.organization}</h1>
            <a className="profile-origin" href={profile.canonicalOrigin} target="_blank" rel="noreferrer">
              {profile.verification.hostname} <ExternalLink size={15} />
            </a>
          </div>
          <div className="profile-score">
            <span>Nivel observado</span>
            <strong>{profile.readiness.level}</strong>
            <small>{profile.readiness.score === null ? 'Sin auditoria guardada' : `${profile.readiness.score}/100`}</small>
          </div>
        </div>
        <div className="profile-provenance">
          <span data-state="owner_declared"><FileText size={15} /> Declarado por el owner</span>
          <span data-state="observed"><Eye size={15} /> Observado publicamente</span>
          <span data-state="verified"><BadgeCheck size={15} /> Dominio verificado</span>
        </div>
      </section>

      <section className="profile-layout">
        <div className="profile-content">
          <section className="profile-section">
            <header><span>01</span><div><h2>Identidad publica</h2><p>Lo que el responsable autorizo a publicar sobre el sitio.</p></div></header>
            <dl className="profile-facts">
              <div><dt>Tipo de sitio</dt><dd>{profile.siteType || 'No declarado'}</dd></div>
              <div><dt>Audiencias</dt><dd>{profile.audiences.join(', ') || 'No declaradas'}</dd></div>
              <div><dt>Sectores</dt><dd>{profile.sectors.join(', ') || 'No declarados'}</dd></div>
              <div><dt>Idiomas</dt><dd>{profile.languages.join(', ') || 'No declarados'}</dd></div>
            </dl>
          </section>

          <section className="profile-section">
            <header><span>02</span><div><h2>Capacidades y evidencia</h2><p>Declarar una capacidad no equivale a haberla observado en el sitio.</p></div></header>
            <div className="profile-evidence-grid">
              <div>
                <h3>Declaradas</h3>
                {profile.declaredCapabilities.length
                  ? profile.declaredCapabilities.map((item) => <p key={item}><FileText size={14} /> {item}<small>Declarado por el owner</small></p>)
                  : <p>Sin capacidades declaradas.</p>}
              </div>
              <div>
                <h3>Observadas</h3>
                {profile.observedResources.length
                  ? profile.observedResources.map((item) => <a href={item.url} target="_blank" rel="noreferrer" key={`${item.type}-${item.url}`}><Eye size={14} /> {item.type}<small>{item.observedAt.slice(0, 10)}</small></a>)
                  : <p>No hay una observacion publica guardada.</p>}
              </div>
            </div>
          </section>

          <section className="profile-section">
            <header><span>03</span><div><h2>Fuentes publicas</h2><p>Enlaces directos y fecha asociada a cada afirmacion.</p></div></header>
            <div className="profile-source-list">
              {profile.publicSources.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                  <div><strong>{source.title}</strong><small>{provenanceLabel(source.state)} · {source.observedAt.slice(0, 10)}</small></div>
                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="profile-aside">
          <section>
            <ShieldCheck size={21} />
            <span>Identidad del sitio</span>
            <strong>{provenanceLabel(profile.verification.status)}</strong>
            <dl>
              <div><dt>Metodo</dt><dd>{profile.verification.method || 'No registrado'}</dd></div>
              <div><dt>Registrado</dt><dd>{profile.verification.verifiedAt.slice(0, 10) || 'No registrado'}</dd></div>
              <div><dt>Vigente hasta</dt><dd>{profile.verification.verifiedUntil.slice(0, 10) || 'No aplica al caso curado'}</dd></div>
            </dl>
          </section>
          <section>
            <span>Formatos para agentes</span>
            <a href={`/registry/${profile.slug}/profile.json${version ? `?version=${version}` : ''}`}><Braces size={16} /> JSON verificable</a>
            <a href={`/registry/${profile.slug}/profile.md${version ? `?version=${version}` : ''}`}><FileText size={16} /> Markdown legible</a>
          </section>
          <section id="history">
            <span>Historial</span>
            <p>Esta es la version {profile.version}, publicada el {profile.publishedAt.slice(0, 10)}. Las nuevas versiones no borran las anteriores.</p>
          </section>
        </aside>
      </section>

      <section className="profile-limits">
        <h2>Que no significa este perfil</h2>
        <div>{profile.limits.map((limit) => <p key={limit}>{limit}</p>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
