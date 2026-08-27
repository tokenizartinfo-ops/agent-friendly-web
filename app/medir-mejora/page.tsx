import type { Metadata } from 'next';
import { BadgeInfo, History, ScanSearch, ShieldCheck } from 'lucide-react';
import { ReadinessComparison } from '../components/readiness-comparison';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Medir una mejora agentica | Agent Friendly Web',
  description: 'Compara evidencia antes y despues sin confundir preparacion agentica con promesas de ranking o recomendacion.',
};

export default function MeasureImprovementPage() {
  return (
    <main>
      <SiteHeader />
      <section className="document-hero measure-hero">
        <span>Antes y despues</span>
        <h1>Una mejora cuenta cuando deja evidencia observable.</h1>
        <p>Compara dos observaciones del mismo sitio. El puntaje resume señales publicas; el detalle debe conservar URLs, fechas, fuentes y el cambio aplicado.</p>
        <div className="illustrative-note"><BadgeInfo size={18} /><p>Los valores de este prototipo se procesan solo en tu navegador y no se guardan. Para un registro privado y versionado usa Mi expediente.</p></div>
      </section>
      <ReadinessComparison />
      <section className="measurement-method">
        <article><ScanSearch size={21} /><span>1</span><h2>Medir base</h2><p>Registra lo que realmente responde hoy, con fecha y evidencia.</p></article>
        <article><History size={21} /><span>2</span><h2>Aplicar y volver a observar</h2><p>Versiona el cambio, verifica el origen y compara la misma metodologia.</p></article>
        <article><ShieldCheck size={21} /><span>3</span><h2>Explicar el limite</h2><p>Mayor claridad no equivale a una garantia comercial de terceros.</p></article>
      </section>
      <SiteFooter />
    </main>
  );
}
