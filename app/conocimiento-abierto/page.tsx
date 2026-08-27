import type { Metadata } from 'next';
/* eslint-disable @next/next/no-html-link-for-pages -- Plain anchors avoid unstable vinext RSC prefetch requests. */
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  FileCheck2,
  Fingerprint,
  FolderTree,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Conocimiento abierto OKF | Agent Friendly Web',
  description: 'Bundle OKF v0.2 publico, read-only y verificable sobre metodologia, descubrimiento, Registry, asistencia y el caso Tokenizart.',
};

const domains = [
  ['Metodo', 'Alcance, niveles AF-0 a AF-5, evidencia y puntuacion.', '03'],
  ['Descubrimiento', 'Auditoria publica, AEO, crawlers y recursos legibles.', '03'],
  ['Registry', 'Procedencia, publicacion y verificacion de dominio.', '02'],
  ['Asistencia', 'Intake controlado y comparacion de evidencia.', '02'],
  ['Casos', 'Tokenizart como primer caso integral documentado.', '01'],
];

const verification = [
  ['01', 'Abrir el indice', 'Recorrer los conceptos como Markdown plano, sin cuenta ni SDK.'],
  ['02', 'Revisar procedencia', 'Cada concepto identifica fuentes, fecha, generador y verificacion humana.'],
  ['03', 'Contrastar el manifiesto', 'El inventario declara version, estado, licencia y hash de cada documento.'],
  ['04', 'Validar integridad', 'CHECKSUMS.sha256 permite detectar si un archivo fue alterado.'],
];

export default function OpenKnowledgePage() {
  return (
    <main>
      <SiteHeader />

      <section className="okf-hero">
        <div className="okf-hero-copy">
          <span><BookOpen size={16} /> Conocimiento abierto</span>
          <h1>Lo que afirmamos sobre Agent Friendly Web tambien puede descargarse, leerse y verificarse.</h1>
          <p>Publicamos nuestra metodologia y sus fronteras en OKF v0.2: Markdown con procedencia, estado, frescura y revision humana. Es una proyeccion publica read-only, no una base privada ni una herramienta que ejecute acciones.</p>
          <div className="okf-actions">
            <a href="/okf/v0.2/index.md">Explorar el indice <ArrowRight size={17} /></a>
            <a href="/okf/v0.2/manifest.json" download>Descargar manifiesto <Download size={17} /></a>
          </div>
        </div>
        <aside className="okf-release-ledger" aria-label="Ficha de la version OKF publicada">
          <span>Release publica</span>
          <strong>2026-08-27-public-v1</strong>
          <dl>
            <div><dt>Formato</dt><dd>OKF v0.2</dd></div>
            <div><dt>Estado</dt><dd>Publicado</dd></div>
            <div><dt>Conceptos</dt><dd>11</dd></div>
            <div><dt>Acceso</dt><dd>Read-only</dd></div>
            <div><dt>Revision</dt><dd>Humana</dd></div>
          </dl>
        </aside>
      </section>

      <section className="okf-domain-band">
        <div className="okf-section-heading">
          <span>Contenido del bundle</span>
          <h2>Un indice pequeno para encontrar conocimiento concreto.</h2>
          <p>Los documentos se generan desde fuentes publicas allowlisted. El generador no recorre expedientes, bases privadas ni carpetas completas.</p>
        </div>
        <div className="okf-domain-list">
          {domains.map(([name, detail, count]) => (
            <article key={name}>
              <span>{count}</span>
              <div><strong>{name}</strong><p>{detail}</p></div>
              <FolderTree size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="okf-integrity-band">
        <div className="okf-section-heading">
          <span>Verificacion independiente</span>
          <h2>No hace falta confiar a ciegas en la pagina.</h2>
          <p>Una persona o un agente puede comprobar por separado estructura, origen, version e integridad.</p>
        </div>
        <div className="okf-verification-list">
          {verification.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <div><strong>{title}</strong><p>{detail}</p></div>
            </article>
          ))}
        </div>
        <div className="okf-download-strip">
          <a href="/okf/v0.2/index.md"><BookOpen size={18} /><span><strong>index.md</strong><small>Entrada canonica</small></span></a>
          <a href="/okf/v0.2/manifest.json"><FileCheck2 size={18} /><span><strong>manifest.json</strong><small>Inventario y hashes</small></span></a>
          <a href="/okf/v0.2/CHECKSUMS.sha256"><Fingerprint size={18} /><span><strong>CHECKSUMS.sha256</strong><small>Control de integridad</small></span></a>
        </div>
      </section>

      <section className="okf-boundary-band">
        <div>
          <Scale size={24} />
          <span>Licencia documental</span>
          <h2>CC BY 4.0</h2>
          <p>La documentacion puede reutilizarse con atribucion. La licencia no concede la marca Agent Friendly Web ni permite presentar una copia como servicio oficial.</p>
        </div>
        <div>
          <ShieldCheck size={24} />
          <span>Limite operativo</span>
          <h2>Conocimiento, no ejecucion</h2>
          <p>El bundle no es una certificacion, no es una API y no es un MCP. Tampoco garantiza indexacion, ranking, recomendacion o descubrimiento por un tercero.</p>
        </div>
      </section>

      <section className="okf-tokenizart-band">
        <div className="okf-tokenizart-icon"><CheckCircle2 size={24} /></div>
        <div>
          <span>Primer caso integral</span>
          <h2>Tokenizart muestra como la metodologia se aplica sin inflar capacidades.</h2>
          <p>El concepto publico enlaza la auditoria, el Registry y el paquete ya publicado. Owner Live, datos de usuarios y herramientas candidatas permanecen fuera de este bundle.</p>
        </div>
        <a href="/casos/tokenizart">Recorrer el caso Tokenizart <ArrowRight size={17} /></a>
      </section>

      <SiteFooter />
    </main>
  );
}
