import { ArrowDown, ArrowRight, FileText, FolderOpen } from 'lucide-react';
import { COMIC_HOME_COPY } from '../../lib/home-copy.mjs';
import { localizedPath } from '../../lib/site-i18n.mjs';

type Locale = 'es' | 'en' | 'pt';

export function ComicHomeIntro({ locale = 'es' }: { locale?: Locale }) {
  const copy = COMIC_HOME_COPY[locale] || COMIC_HOME_COPY.es;
  return (
    <>
      <section className="comic-call-hero" aria-labelledby="comic-call-title">
        <div className="comic-call-copy">
          <span><span aria-hidden="true">01</span> {copy.eyebrow}</span>
          <h1 id="comic-call-title">{copy.title}</h1>
          <p>{copy.intro}</p>
          <div className="comic-call-actions">
            <a href="#auditar">{copy.primary} <ArrowDown size={18} /></a>
            <a href="#archivo-del-futuro">{copy.secondary} <FolderOpen size={18} /></a>
          </div>
        </div>
      </section>

      <section className="future-archive" id="archivo-del-futuro" aria-labelledby="future-archive-title">
        <header>
          <span><FolderOpen size={17} /> {copy.archiveEyebrow}</span>
          <h2 id="future-archive-title">{copy.archiveTitle}</h2>
          <p>{copy.archiveIntro}</p>
        </header>
        <div className="archive-drawers">
          {copy.files.map((file) => {
            const href = file.routeKey ? localizedPath(file.routeKey, locale) : file.href;
            return (
              <a href={href || '#'} key={`${file.level}-${file.title}`}>
                <span className="archive-tab">{file.level}</span>
                <FileText size={22} aria-hidden="true" />
                <div><strong>{file.title}</strong><p>{file.detail}</p></div>
                <span className="archive-status">{file.status}</span>
                <small>{copy.open} <ArrowRight size={13} /></small>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
