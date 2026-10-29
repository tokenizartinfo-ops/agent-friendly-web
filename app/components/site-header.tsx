'use client';

import { useEffect, useRef, useState } from 'react';
import { Languages, LockKeyhole, Menu, X } from 'lucide-react';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { sharedCopy } from '../../lib/site-copy.mjs';

type Locale = 'es' | 'en' | 'pt';
type SiteHeaderProps = { locale?: Locale; routeKey?: string; projectId?: string; slug?: string };

const navItems = [['guide', 'guide'], ['faq', 'faq'], ['methodology', 'methodology']] as const;
const resourceItems = [
  ['aeo', 'aeo'], ['sectors', 'sectors'], ['evolution', 'evolution'],
  ['registry', 'registry'], ['cli', 'cli'], ['mcp', 'mcp'], ['tokenizartCase', 'cases'], ['siteMap', 'siteMap'],
] as const;

export function SiteHeader({ locale = 'es', routeKey = 'home', projectId, slug }: SiteHeaderProps = {}) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const resourcesRef = useRef<HTMLDetailsElement>(null);
  const closeNavigation = () => {
    setOpen(false);
    if (resourcesRef.current) resourcesRef.current.open = false;
  };
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeNavigation();
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);
  const copy = sharedCopy(locale);
  const currentOptions = projectId ? { projectId } : slug ? { slug } : {};
  return (
    <>
    <a className="skip-link" href="#afw-main-content" onClick={() => { closeNavigation(); document.getElementById('afw-main-content')?.focus(); }}>{copy.menu.skip}</a>
    <header className="site-header" ref={headerRef} onKeyDown={(event) => {
      if (event.key !== 'Escape') return;
      if (resourcesRef.current?.open) {
        resourcesRef.current.open = false;
        resourcesRef.current.querySelector('summary')?.focus();
        event.preventDefault();
      } else if (open) {
        setOpen(false);
        menuRef.current?.focus();
        event.preventDefault();
      }
    }}>
      <a className="brand" href={localizedPath('home', locale) || '/'}>
        <span className="brand-mark">AF</span>
        <span><strong>Agent Friendly Web</strong><small>by Gabriel Mucchiut</small></span>
      </a>
      <nav className={open ? 'is-open' : ''} aria-label={copy.menu.navigation} id="afw-primary-navigation">
        <a href={localizedPath('home', locale, { hash: 'auditar' }) || '/#auditar'} onClick={closeNavigation}>{copy.nav.audit}</a>
        {navItems.map(([key, label]) => (
          <a href={localizedPath(key, locale) || '/'} key={key} onClick={closeNavigation}>{copy.nav[label]}</a>
        ))}
        <details className="site-resources" ref={resourcesRef}>
          <summary>{copy.menu.resources}</summary>
          <div className="site-resources-links">
            {resourceItems.map(([key, label]) => <a href={localizedPath(key, locale) || '/'} key={key} onClick={closeNavigation}>{copy.nav[label]}</a>)}
          </div>
        </details>
        <a className="private-nav-link" href={localizedPath('dossier', locale) || '/expediente'} onClick={closeNavigation}>
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
      <button className="menu-button" type="button" ref={menuRef} aria-controls="afw-primary-navigation" aria-expanded={open} aria-label={open ? copy.menu.close : copy.menu.open} onClick={() => { if (open) closeNavigation(); else setOpen(true); }}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
    <span id="afw-main-content" className="skip-target" tabIndex={-1} aria-label={copy.menu.content} />
    </>
  );
}
