'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Plain anchors avoid unstable vinext RSC prefetch requests. */

import { useState } from 'react';
import { Languages, LockKeyhole, Menu, X } from 'lucide-react';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { sharedCopy } from '../../lib/site-copy.mjs';

type Locale = 'es' | 'en' | 'pt';
type SiteHeaderProps = { locale?: Locale; routeKey?: string; projectId?: string };

const navItems = [
  ['guide', 'guide'], ['aeo', 'aeo'], ['sectors', 'sectors'], ['evolution', 'evolution'],
  ['methodology', 'methodology'], ['registry', 'registry'], ['cli', 'cli'], ['mcp', 'mcp'],
  ['tokenizartCase', 'cases'], ['siteMap', 'siteMap'],
] as const;

export function SiteHeader({ locale = 'es', routeKey = 'home', projectId }: SiteHeaderProps = {}) {
  const [open, setOpen] = useState(false);
  const copy = sharedCopy(locale);
  const currentOptions = projectId ? { projectId } : {};
  return (
    <header className="site-header">
      <a className="brand" href={localizedPath('home', locale) || '/'}>
        <span className="brand-mark">AF</span>
        <span><strong>Agent Friendly Web</strong><small>by Gabriel Mucchiut</small></span>
      </a>
      <nav className={open ? 'is-open' : ''} aria-label="Principal">
        <a href={localizedPath('home', locale, { hash: 'auditar' }) || '/#auditar'} onClick={() => setOpen(false)}>{copy.nav.audit}</a>
        {navItems.map(([key, label]) => (
          <a href={localizedPath(key, locale) || '/'} key={key} onClick={() => setOpen(false)}>{copy.nav[label]}</a>
        ))}
        <a className="private-nav-link" href={localizedPath('dossier', locale) || '/expediente'} onClick={() => setOpen(false)}>
          <LockKeyhole size={15} /> {copy.nav.dossier}
        </a>
      </nav>
      <div className="language-switcher" aria-label={copy.language.label}>
        <Languages size={15} aria-hidden="true" />
        {(['es', 'en', 'pt'] as const).map((target) => (
          <a
            aria-current={target === locale ? 'page' : undefined}
            href={localizedPath(routeKey, target, currentOptions) || localizedPath('home', target) || '/'}
            key={target}
            hrefLang={target}
          >{target.toUpperCase()}</a>
        ))}
      </div>
      <button className="menu-button" type="button" aria-expanded={open} aria-label={open ? copy.menu.close : copy.menu.open} onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}
