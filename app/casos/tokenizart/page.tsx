/* eslint-disable @next/next/no-html-link-for-pages -- Plain anchors preserve native navigation. */
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Check, FileCheck2, Layers3 } from '../../components/client-icons';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import publicAudit from '../../../public/cases/tokenizart/public-audit-2026-11-03.json';
import { localizedRouteMetadata } from '../../../lib/localized-route-metadata.mjs';
import styles from './tokenizart-case.module.css';

export const metadata: Metadata = localizedRouteMetadata('tokenizartCase', 'es') as Metadata;
const currentAudits = publicAudit.observations;
const names: Record<string, string> = {
  'https://tokenizart.com': 'Tokenizart',
  'https://atelier.tokenizart.com': 'Atelier',
  'https://agentfriendlyweb.dev': 'Agent Friendly Web',
};
const roles: Record<string, string> = {
  'https://tokenizart.com': 'El sitio que presenta el proyecto.',
  'https://atelier.tokenizart.com': 'La plataforma donde se utiliza.',
  'https://agentfriendlyweb.dev': 'Nuestro propio sitio, como referencia.',
};
const observationDate = (value: string) => new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'long', timeZone: 'UTC',
}).format(new Date(value));
const downloads = [
  ['Paquete completo ZIP', '/cases/tokenizart/tokenizart-agent-friendly-package-2026-08-26.zip', 'Todos los candidatos, manifiesto, checksums y guia de instalacion.'],
  ['Guía de instalación', '/cases/tokenizart/RUNBOOK.es.md', 'Orden, pruebas y rollback para WordPress y Atelier.'],
  ['Tokenizart llms.txt', '/cases/tokenizart/tokenizart.com/llms.txt', 'Índice público corto para agentes.'],
  ['Tokenizart llms-full.txt', '/cases/tokenizart/tokenizart.com/llms-full.txt', 'Contexto público extendido y límites.'],
  ['Robots Tokenizart', '/cases/tokenizart/tokenizart.com/robots.proposed.txt', 'Propuesta que conserva reglas WordPress/WooCommerce.'],
  ['JSON-LD Tokenizart', '/cases/tokenizart/tokenizart.com/structured-data.json', 'Identidad del sitio y relación con Atelier.'],
  ['Atelier llms.txt', '/cases/tokenizart/atelier.tokenizart.com/llms.txt', 'Explica que Atelier es la plataforma operativa.'],
  ['Atelier llms-full.txt', '/cases/tokenizart/atelier.tokenizart.com/llms-full.txt', 'Flujos, seguridad y límites públicos.'],
  ['Robots Atelier', '/cases/tokenizart/atelier.tokenizart.com/robots.proposed.txt', 'Mantiene las APIs fuera del rastreo.'],
  ['Sitemap Atelier', '/cases/tokenizart/atelier.tokenizart.com/sitemap.proposed.xml', 'Baseline inicial; luego debe generarse desde el source real.'],
  ['Manifiesto del paquete', '/cases/tokenizart/manifest.json', 'Targets, fecha, estado y exclusiones.'],
];


export default function TokenizartCasePage() {
  return (
    <>
      <SiteHeader routeKey="tokenizartCase" />
      <main className={styles.page}>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>Un caso real · Tokenizart + Atelier</span>
          <h1>Que se entienda.<br /><em>Que se pueda encontrar.</em></h1>
          <p>Así acompañamos a Tokenizart a ordenar su información pública para que las personas y los agentes puedan comprender mejor qué ofrece.</p>
          <a className={styles.primaryLink} href="/?site=tokenizart.com#auditar">Volver a auditar Tokenizart <ArrowRight size={18} /></a>
        </header>

        <section className={styles.section} aria-labelledby="current-title">
          <div className={styles.heading}>
            <div><span className={styles.eyebrow}>La última comprobación</span><h2 id="current-title">Medición actual</h2></div>
            <p>Observada el <time dateTime="2026-11-03">3 de noviembre de 2026</time>.<br />Tres sitios distintos, medidos con el auditor público de AFW.</p>
          </div>
          <div className={styles.metrics}>
            {currentAudits.map(audit => (
              <article className={styles.metric} key={audit.origin} data-current-metric>
                <h3>{names[audit.origin]}</h3>
                <p className={styles.role}>{roles[audit.origin]}</p>
                <p className={styles.score}><strong>{audit.score}</strong><span>/100</span></p>
                <p className={styles.observed}><Check size={16} aria-hidden="true" /> Documentos e índice del sitio accesibles</p>
                <time className={styles.date} dateTime={audit.checkedAt}>{observationDate(audit.checkedAt)}</time>
                <a className={styles.domain} href={audit.origin}>{audit.origin.replace('https://', '')} <ArrowRight size={14} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
          <p className={styles.note}>El puntaje resume señales públicas. No garantiza que una IA recomiende el sitio ni que pueda realizar operaciones en él.</p>
          <details className={styles.disclosure} id="measurement-method">
            <summary>Cómo leer esta medición</summary>
            <div className={styles.detailBody}>
              <p>Motor: {publicAudit.methodology}. Una auditoría por sitio, con fecha UTC. En los tres, <code>llms.txt</code> y <code>sitemap.xml</code> respondieron 200.</p>
              <p>Las etiquetas calculadas AF-4 y AF-5 no son certificaciones: esta lectura no acredita permisos, acciones, pagos ni acceso privado. No se probaron operaciones de esas herramientas.</p>
              <p>No verificamos la revisión del motor desplegado ni que sus reglas sean idénticas a las de agosto. No corresponde restar los puntajes para atribuir una mejora. Cloudflare usa otra escala; no realizamos una nueva medición de Cloudflare.</p>
              <a href="/cases/tokenizart/public-audit-2026-11-03.json">Consultar evidencia fechada <FileCheck2 size={16} /></a>
            </div>
          </details>
        </section>

        <section className={styles.section} aria-labelledby="layers-title">
          <div className={styles.heading}><div><span className={styles.eyebrow}>Lo que cambió</span><h2 id="layers-title">Más pistas. Menos dudas.</h2></div><p>Ahora encontramos varias capas de información pública en Tokenizart y Atelier.</p></div>
          <ol className={styles.layers}>
            <li><BookOpen size={24} aria-hidden="true" /><h3>Entender</h3><p>Documentos para agentes que explican el proyecto y sus límites.</p></li>
            <li><Layers3 size={24} aria-hidden="true" /><h3>Encontrar</h3><p>Mapas del sitio, enlaces y datos estructurados que ayudan a recorrer el contenido.</p></li>
            <li><FileCheck2 size={24} aria-hidden="true" /><h3>Consultar</h3><p>Catálogos y contratos que describen herramientas. Su presencia no autoriza a usarlas.</p></li>
          </ol>
          <p className={styles.note}>En Atelier, el documento para agentes que no se encontró en septiembre ya estaba accesible en noviembre. Las fechas indican cuándo se observó, no cuándo se instaló.</p>
        </section>

        <section className={styles.section} aria-labelledby="evolution-title">
          <div className={styles.heading}><div><span className={styles.eyebrow}>Paso a paso</span><h2 id="evolution-title">Un recorrido, con evidencia.</h2></div></div>
          <ol className={styles.timeline}>
            <li><time dateTime="2026-08-26">26 ago 2026</time><div><h3>El punto de partida</h3><p>Registramos cómo se descubrían los sitios y preparamos los primeros documentos.</p></div></li>
            <li><time dateTime="2026-09-09">9 sep 2026</time><div><h3>Una explicación más clara</h3><p>Se comprobaron la guía y los documentos de Tokenizart. En Atelier todavía faltaba esa lectura.</p></div></li>
            <li><time dateTime="2026-11-03">3 nov 2026</time><div><h3>Volver a mirar</h3><p>La nueva auditoría detectó documentos, mapas del sitio y catálogos públicos en ambos sitios.</p></div></li>
          </ol>
          <details className={styles.disclosure} id="previous-measurements">
            <summary>Ver mediciones anteriores</summary>
            <div className={styles.detailBody}>
              <p>Referencia histórica del 26 de agosto de 2026. Estos números no describen el estado actual.</p>
              <div className={styles.tableWrap}><table><caption>Dos motores, escalas diferentes</caption><thead><tr><th scope="col">Sitio</th><th scope="col">AFW</th><th scope="col">Cloudflare</th></tr></thead><tbody>
                <tr><th scope="row">Tokenizart</th><td>23/100 · AF-1</td><td>Level 1</td></tr>
                <tr><th scope="row">Atelier</th><td>14/100 · AF-0</td><td>Level 0</td></tr>
                <tr><th scope="row">AFW</th><td>70/100 · AF-3</td><td>Level 2</td></tr>
              </tbody></table></div>
              <p>El 9 de septiembre se registró un 404 en <code>llms.txt</code> de Atelier. Los 36/100 reportados por Gabriel ese día fueron una declaración, sin una medición independiente reproducible.</p>
              <p>Conservamos las observaciones originales. Los saltos entre fechas no prueban causalidad ni equivalencia entre métodos.</p>
              <a href="https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/main/docs/TOKENIZART-CASE-2026-08-26.md">Leer el informe de agosto <ArrowRight size={16} /></a>
              <a href="/registry/tokenizart">Ver el perfil histórico en Registry <ArrowRight size={16} /></a>
            </div>
          </details>
        </section>

        <section className={styles.resources} aria-labelledby="resources-title">
          <div><span className={styles.eyebrow}>Seguir la pista</span><h2 id="resources-title">Mirá los documentos.</h2><p>Tokenizart presenta el proyecto. Atelier es su plataforma de uso. Cada sitio conserva su propia información y sus permisos.</p></div>
          <div className={styles.resourceLinks}>
            <a href="https://tokenizart.com/llms.txt">Documentos de Tokenizart <ArrowRight size={18} /></a>
            <a href="https://atelier.tokenizart.com/llms.txt">Documentos de Atelier <ArrowRight size={18} /></a>
            <a href="/cases/tokenizart/public-audit-2026-11-03.json">Evidencia de esta auditoría <ArrowRight size={18} /></a>
          </div>
        </section>

        <details className={styles.disclosure} id="historical-downloads">
          <summary>Archivo: documentos preparados en agosto</summary>
          <div className={styles.detailBody}>
            <p>Paquete histórico de referencia del 26 de agosto de 2026. No instalarlo sobre los archivos actuales: contiene propuestas de aquella etapa.</p>
            <ul className={styles.archiveLinks}>{downloads.map(([name,href])=><li key={href}><a href={href}>{name} <ArrowRight size={14} aria-hidden="true" /></a></li>)}</ul>
            <p>Las futuras acciones requieren revisar cada servicio, identidad y permiso. Un documento público no concede acceso a una cuenta.</p>
          </div>
        </details>
      </main>
      <SiteFooter />
    </>
  );
}
