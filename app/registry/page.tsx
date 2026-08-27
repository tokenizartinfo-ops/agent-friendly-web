/* eslint-disable @next/next/no-html-link-for-pages -- Plain anchors avoid unstable vinext RSC prefetch requests. */

import { ArrowRight, BadgeCheck, Database, Globe2, Search } from 'lucide-react';
import { listPublishedProfiles } from '../../lib/registry-store';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const dynamic = 'force-dynamic';

type PageProps = { searchParams: Promise<{ q?: string | string[] }> };

export default async function RegistryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = (Array.isArray(params.q) ? params.q[0] : params.q || '').trim().toLocaleLowerCase('es');
  const profiles = await listPublishedProfiles();
  const visible = query
    ? profiles.filter((profile) => [
        profile.organization,
        profile.canonicalOrigin,
        profile.siteType,
        ...profile.sectors,
        ...profile.audiences,
        ...profile.languages,
        profile.readiness.level,
        profile.verification.status,
      ].join(' ').toLocaleLowerCase('es').includes(query))
    : profiles;

  return (
    <main>
      <SiteHeader />
      <section className="registry-hero">
        <div>
          <span>Registry publico y verificable</span>
          <h1>Sitios que empezaron a explicar mejor lo que son, ofrecen y permiten.</h1>
          <p>Cada perfil separa lo declarado por su responsable, lo observado en recursos publicos y el control temporal del dominio verificado.</p>
        </div>
        <aside><Database size={24} /><strong>{profiles.length}</strong><span>perfiles publicados</span></aside>
      </section>

      <section className="registry-workspace">
        <form className="registry-search" action="/registry" method="get">
          <Search size={19} aria-hidden="true" />
          <label htmlFor="registry-q">Buscar organizacion, dominio, sector, idioma o nivel AF</label>
          <input id="registry-q" name="q" defaultValue={query} placeholder="Ejemplo: museo, arte, Español, AF-2" />
          <button type="submit">Buscar</button>
        </form>

        <div className="registry-summary">
          <span>{visible.length} resultados</span>
          <p>Un perfil no garantiza indexacion, recomendacion ni calidad comercial.</p>
        </div>

        {visible.length ? (
          <div className="registry-list">
            {visible.map((profile) => (
              <article key={profile.slug}>
                <div className="registry-item-icon"><Globe2 size={20} /></div>
                <div className="registry-item-main">
                  <div className="registry-item-title">
                    <h2>{profile.organization}</h2>
                    {profile.verification.status === 'verified' && <span><BadgeCheck size={14} /> Dominio verificado</span>}
                  </div>
                  <a href={profile.canonicalOrigin} target="_blank" rel="noreferrer">{profile.verification.hostname}</a>
                  <div className="registry-tags">
                    <span>{profile.readiness.level}</span>
                    {profile.languages.slice(0, 3).map((language) => <span key={language}>{language}</span>)}
                    {profile.sectors.slice(0, 2).map((sector) => <span key={sector}>{sector}</span>)}
                  </div>
                </div>
                <a className="registry-open" href={`/registry/${profile.slug}`}>Abrir perfil <ArrowRight size={16} /></a>
              </article>
            ))}
          </div>
        ) : (
          <div className="registry-empty">
            <Globe2 size={25} />
            <h2>No hay perfiles que coincidan.</h2>
            <p>Prueba una busqueda mas amplia o vuelve al listado completo.</p>
            <a href="/registry">Ver todos</a>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
