import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircleAlert,
  FileSearch,
  GraduationCap,
  MessagesSquare,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { CRAWLER_CATALOG } from '../../lib/crawler-catalog.mjs';

export const metadata: Metadata = {
  title: 'AEO y crawlers de IA | Agent Friendly Web',
  description: 'Guia verificable para mejorar respuestas sobre una empresa y decidir por separado busqueda, solicitudes de usuarios y entrenamiento.',
};

const purposeLabels: Record<string, string> = {
  search_discovery: 'Busqueda y descubrimiento',
  user_requested_retrieval: 'Solicitud de una persona',
  model_training: 'Entrenamiento',
  generative_ai_control: 'Control de IA generativa',
  product_and_ai_services: 'Servicios del proveedor',
  open_web_dataset: 'Dataset web abierto',
};

const faq = [
  {
    question: 'AEO reemplaza al SEO?',
    answer: 'No. SEO ayuda a que una pagina sea rastreable y competitiva en buscadores. AEO agrega respuestas directas, entidades, evidencia y estructura para que motores de respuesta puedan comprender y citar mejor el sitio.',
  },
  {
    question: 'Permitir un crawler garantiza aparecer en una respuesta?',
    answer: 'No. Solo evita un bloqueo deliberado para ese uso. Indexacion, seleccion, redaccion, ranking y recomendacion dependen de cada proveedor y de muchas otras señales.',
  },
  {
    question: 'Bloquear entrenamiento obliga a desaparecer de busquedas?',
    answer: 'No necesariamente. Varios proveedores separan crawlers o tokens para busqueda, solicitudes iniciadas por usuarios y entrenamiento. La politica debe decidir cada finalidad por separado.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function AeoAndCrawlersPage() {
  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="aeo-hero">
        <div className="aeo-hero-copy">
          <span>AEO + descubrimiento agentico</span>
          <h1>Tu web ya no compite solo por clics. Tambien compite por ser una fuente que un asistente pueda comprender.</h1>
          <p>Ordenamos contenido, evidencia y politicas para que humanos, buscadores y agentes encuentren una explicacion fiel de lo que tu organizacion ofrece y permite.</p>
          <div className="aeo-actions">
            <Link href="/#auditar">Auditar mi sitio <ArrowRight size={17} /></Link>
            <Link href="/expediente">Preparar mi expediente</Link>
          </div>
        </div>
        <div className="aeo-signal-board" aria-label="Secuencia de mejora AEO">
          <div><span>01</span><strong>Encontrar</strong><small>Rastreo, sitemap y origen canonico.</small></div>
          <div><span>02</span><strong>Entender</strong><small>Respuestas, entidades y evidencia.</small></div>
          <div><span>03</span><strong>Citar</strong><small>Fuentes publicas, fecha y procedencia.</small></div>
          <div><span>04</span><strong>Actuar</strong><small>Herramientas reales, solo cuando existan.</small></div>
        </div>
      </section>

      <section className="aeo-education-band">
        <div className="aeo-section-heading">
          <span>Para propietarios y equipos</span>
          <h2>AEO no es maquillaje tecnico. Es hacer visible el conocimiento real de la organizacion.</h2>
          <p>Una web puede verse antigua y aun asi mejorar mucho por detras: contenidos actualizados, datos estructurados, documentos legibles y politicas claras. El front humano tambien importa, pero no es el unico punto de entrada.</p>
        </div>
        <div className="seo-aeo-compare">
          <article><Search size={22} /><span>SEO</span><h3>Ayuda a encontrar paginas</h3><p>Trabaja rastreo, indexacion, relevancia, autoridad, rendimiento y experiencia para buscadores.</p></article>
          <article><MessagesSquare size={22} /><span>AEO</span><h3>Ayuda a construir respuestas</h3><p>Expone definiciones, hechos, entidades, relaciones, fuentes y limites que pueden citarse con mayor precision.</p></article>
          <article><Bot size={22} /><span>Agent-ready</span><h3>Prepara herramientas utilizables</h3><p>Versiona APIs, skills, MCP o A2A cuando existe una capacidad real, segura y verificable.</p></article>
        </div>
        <div className="aeo-limit"><CircleAlert size={18} /><p>Mejorar estas capas aumenta claridad y posibilidades de descubrimiento, pero no garantiza indexacion, ranking ni recomendacion por GPT, Gemini, Claude, Perplexity u otro proveedor.</p></div>
      </section>

      <section className="policy-decisions">
        <div className="aeo-section-heading">
          <span>Una politica, tres decisiones</span>
          <h2>No mezcles busqueda, consultas de usuarios y entrenamiento.</h2>
          <p>Cada finalidad tiene un impacto diferente. Agent Friendly Web documenta la decision del owner y luego la contrasta con el comportamiento y la documentacion oficial de cada proveedor.</p>
        </div>
        <div className="decision-rows">
          <div><FileSearch /><strong>Busqueda y respuestas</strong><p>Permitir que contenido publico sea descubierto para resultados y respuestas con enlaces.</p></div>
          <div><MessagesSquare /><strong>Solicitud del usuario</strong><p>Permitir que un asistente consulte una pagina porque una persona se lo pidio expresamente.</p></div>
          <div><ShieldCheck /><strong>Entrenamiento y otros usos</strong><p>Autorizar, reservar o evaluar por separado el uso destinado a mejorar modelos o productos generativos.</p></div>
        </div>
      </section>

      <section className="crawler-directory" id="crawlers">
        <div className="aeo-section-heading">
          <span>Matriz por proveedor</span>
          <h2>Crawlers y tokens de control que conviene distinguir.</h2>
          <p>Los nombres y finalidades pueden cambiar. Cada fila enlaza la fuente oficial que debe revisarse antes de aplicar una regla en produccion.</p>
        </div>
        <div className="crawler-table" role="list">
          {CRAWLER_CATALOG.map((crawler: typeof CRAWLER_CATALOG[number]) => (
            <article className="crawler-row" key={crawler.id} role="listitem">
              <div className="crawler-provider"><span>{crawler.provider}</span><strong>{crawler.token}</strong></div>
              <div><span className="crawler-purpose">{purposeLabels[crawler.purpose]}</span><p>{crawler.humanPurpose}</p></div>
              <details className="crawler-detail">
                <summary>Como tratarlo</summary>
                <strong>{crawler.isUserAgent ? 'User-agent o fetcher' : 'Token de control en robots.txt'}</strong>
                <p>{crawler.ownerDecision}</p>
                <a href={crawler.officialSource} target="_blank" rel="noreferrer">Fuente oficial <ArrowRight size={14} /></a>
              </details>
            </article>
          ))}
        </div>
        <Link className="machine-catalog-link" href="/.well-known/crawler-policy-catalog.json">
          Ver esta matriz en JSON para agentes <ArrowRight size={16} />
        </Link>
      </section>

      <section className="aeo-commercial-band">
        <div><GraduationCap size={24} /><span>Primero educar</span><h2>El owner entiende que se publica, para quien y con que limite.</h2></div>
        <div><CheckCircle2 size={24} /><span>Luego implementar</span><h2>Los cambios se versionan, se prueban y se vuelven a auditar.</h2></div>
        <div><FileSearch size={24} /><span>Finalmente medir</span><h2>La evidencia muestra que mejoro y que sigue pendiente.</h2></div>
      </section>

      <section className="aeo-faq">
        <div className="aeo-section-heading"><span>Preguntas frecuentes</span><h2>Lo esencial antes de cambiar robots.txt.</h2></div>
        <div>{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      </section>

      <section className="aeo-final-cta">
        <div><span>Siguiente paso</span><h2>Primero medimos tu situacion real. Despues proponemos cambios proporcionados.</h2><p>No necesitas conocer crawlers, JSON-LD o servidores para empezar.</p></div>
        <Link href="/#auditar">Empezar por la auditoria <ArrowRight size={17} /></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
