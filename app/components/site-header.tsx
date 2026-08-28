'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Plain anchors avoid unstable vinext RSC prefetch requests. */

import { useState } from 'react';
import { LockKeyhole, Menu, X } from 'lucide-react';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="/">
        <span className="brand-mark">AF</span>
        <span><strong>Agent Friendly Web</strong><small>by Gabriel Mucchiut</small></span>
      </a>
      <nav className={open ? 'is-open' : ''} aria-label="Principal">
        <a href="/#auditar" onClick={() => setOpen(false)}>Auditar</a>
        <a href="/aeo-y-crawlers" onClick={() => setOpen(false)}>AEO</a>
        <a href="/sectores" onClick={() => setOpen(false)}>Sectores</a>
        <a href="/evolucion-agentica" onClick={() => setOpen(false)}>Evolucion</a>
        <a href="/metodologia" onClick={() => setOpen(false)}>Metodo</a>
        <a href="/registry" onClick={() => setOpen(false)}>Registry</a>
        <a href="/cli" onClick={() => setOpen(false)}>CLI</a>
        <a href="/casos/tokenizart" onClick={() => setOpen(false)}>Casos</a>
        <a href="/mapa-del-sitio" onClick={() => setOpen(false)}>Mapa</a>
        <a className="private-nav-link" href="/expediente" onClick={() => setOpen(false)}>
          <LockKeyhole size={15} /> Mi expediente
        </a>
      </nav>
      <button className="menu-button" type="button" aria-expanded={open} aria-label={open ? 'Cerrar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}
