'use client';

import { useState } from 'react';
import { ArrowUpRight, Braces, Menu, X } from 'lucide-react';
import Link from 'next/link';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Agent Friendly Web, inicio">
        <span className="brand-mark">AF</span>
        <span><strong>Agent Friendly Web</strong><small>by Gabriel Mucchiut</small></span>
      </Link>
      <nav className={open ? 'is-open' : ''} aria-label="Principal">
        <Link href="/#auditar" onClick={() => setOpen(false)}>Auditar</Link>
        <Link href="/expediente" onClick={() => setOpen(false)}>Mi expediente</Link>
        <Link href="/metodologia" onClick={() => setOpen(false)}>Metodologia</Link>
        <Link href="/evolucion-agentica" onClick={() => setOpen(false)}>Ver evolucion</Link>
        <Link href="/casos/tokenizart" onClick={() => setOpen(false)}>Caso Tokenizart</Link>
      </nav>
      <a className="repo-link" href="https://github.com/tokenizartinfo-ops/agent-friendly-web" target="_blank" rel="noreferrer">
        <Braces size={18} /> Repositorio <ArrowUpRight size={15} />
      </a>
      <button className="menu-button" type="button" aria-expanded={open} aria-label={open ? 'Cerrar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}
