import { ArrowDown, ArrowRight, ClipboardList, FileText, FolderOpen, Route, ScanSearch } from './client-icons';
import { COMIC_HOME_COPY, HOME_VALUE_COPY, SERVICE_JOURNEY_COPY } from '../../lib/home-copy.mjs';
import { localizedPath } from '../../lib/site-i18n.mjs';

type Locale = 'es' | 'en' | 'pt';
type ArchiveFile = {
  level: string;
  title: string;
  detail: string;
  status: string;
  routeKey?: Parameters<typeof localizedPath>[0];
  href?: string;
};

function ArchiveCard({ file, locale, open }: { file: ArchiveFile; locale: Locale; open: string }) {
  const href = file.routeKey ? localizedPath(file.routeKey, locale) : file.href;
  return (
    <a href={href || '#'}>
      <span className="archive-tab">{file.level}</span>
      <FileText size={22} aria-hidden="true" />
      <div><strong>{file.title}</strong><p>{file.detail}</p></div>
      <span className="archive-status">{file.status}</span>
      <small>{open} <ArrowRight size={13} /></small>
    </a>
  );
}

export function ComicCallHero({ locale = 'es' }: { locale?: Locale }) {
  const copy = COMIC_HOME_COPY[locale] || COMIC_HOME_COPY.es;
  return (
    <section className="comic-call-hero" aria-labelledby="comic-call-title">
      <figure className="comic-call-scene">
        <figcaption className="comic-call-dialogue" aria-label={copy.dialogueLabel}>
          <p className="comic-call-bubble comic-call-bubble-left">{copy.dialogue[0]}</p>
          <p className="comic-call-bubble comic-call-bubble-right">{copy.dialogue[1]}</p>
        </figcaption>
        <img className="comic-call-art" src="/images/agent-friendly-call-robots-screen.webp"
          alt={copy.heroAlt} width={1672} height={941} fetchPriority="high" decoding="async" />
      </figure>
      <div className="comic-call-heading">
        <span><span aria-hidden="true">01</span> {copy.eyebrow}</span>
        <h1 id="comic-call-title">{copy.title}</h1>
      </div>
      <div className="comic-call-body">
        <p>{copy.intro}</p>
        <div className="comic-call-actions">
          <a href="#tu-primer-paso">{copy.primary} <ArrowDown size={18} /></a>
          <a href="#auditar">{copy.secondary} <ScanSearch size={18} /></a>
        </div>
      </div>

    </section>
  );
}

export function HomeValueIntroduction({ locale = 'es' }: { locale?: Locale }) {
  const copy = HOME_VALUE_COPY[locale] || HOME_VALUE_COPY.es;
  return (
    <section className="home-value-intro" id="que-hacemos" aria-labelledby="home-value-title">
      <span>{copy.eyebrow}</span>
      <h2 id="home-value-title">{copy.title}</h2>
      <p>{copy.intro}</p>
    </section>
  );
}

export function HomeServiceJourney({ locale = 'es' }: { locale?: Locale }) {
  const copy = SERVICE_JOURNEY_COPY[locale] || SERVICE_JOURNEY_COPY.es;
  return (
    <section className="home-service-journey" id="tu-primer-paso" aria-labelledby="home-service-title">
      <header><span>{copy.eyebrow}</span><h2 id="home-service-title">{copy.title}</h2><p>{copy.intro}</p></header>
      <ol>
        {copy.steps.map((step, index) => <li key={step.title}><span aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}
      </ol>
      <p className="home-service-difference">{copy.difference}</p>
      <div className="home-service-start">
        <a href={localizedPath('dossier', locale)} aria-describedby="home-entry-access">{copy.action} <ArrowRight size={18} aria-hidden="true" /></a>
        <p id="home-entry-access">{copy.access}</p>
        <a href="#auditar">{copy.audit} <ArrowDown size={16} aria-hidden="true" /></a>
      </div>
      <details><summary>{copy.futureTitle}</summary><p>{copy.future}</p></details>
    </section>
  );
}

export function FutureArchive({ locale = 'es' }: { locale?: Locale }) {
  const copy = COMIC_HOME_COPY[locale] || COMIC_HOME_COPY.es;
  return (
    <section className="future-archive" id="archivo-del-futuro" aria-labelledby="future-archive-title">
      <header>
        <span><FolderOpen size={17} /> {copy.archiveEyebrow}</span>
        <h2 id="future-archive-title">{copy.archiveTitle}</h2>
        <p>{copy.archiveIntro}</p>
      </header>
      <div className="archive-drawers archive-drawers-primary">
        {copy.files.slice(0, 3).map((file) => <ArchiveCard file={file} locale={locale} open={copy.open} key={`${file.level}-${file.title}`} />)}
      </div>
      <details className="archive-more">
        <summary><span>{copy.archiveMore}</span><FolderOpen size={17} /></summary>
        <div className="archive-drawers">
          {copy.files.slice(3).map((file) => <ArchiveCard file={file} locale={locale} open={copy.open} key={`${file.level}-${file.title}`} />)}
        </div>
      </details>
    </section>
  );
}

const nextPathIcons = [ScanSearch, ClipboardList, Route] as const;

export function HomeNextPaths({ locale = 'es' }: { locale?: Locale }) {
  const copy = COMIC_HOME_COPY[locale] || COMIC_HOME_COPY.es;
  const destinations = [
    localizedPath('home', locale, { hash: 'auditar' }) || '/#auditar',
    localizedPath('dossier', locale) || '/expediente',
    localizedPath('methodology', locale) || '/metodologia',
  ];
  return (
    <section className="home-next-paths" aria-labelledby="home-next-paths-title">
      <header><span>{copy.nextEyebrow}</span><h2 id="home-next-paths-title">{copy.nextTitle}</h2><p>{copy.nextIntro}</p></header>
      <div>
        {copy.nextPaths.map((path, index) => {
          const Icon = nextPathIcons[index];
          return <a href={destinations[index]} key={path.title}><Icon size={21} /><strong>{path.title}</strong><p>{path.detail}</p><span>{path.action} <ArrowRight size={14} /></span></a>;
        })}
      </div>
    </section>
  );
}
