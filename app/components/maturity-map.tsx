import { ArrowRight, Circle, CircleCheck, Network } from 'lucide-react';
import Link from 'next/link';

const stages = [
  ['AF-0', 'Invisible', 'El agente no encuentra evidencia suficiente.'],
  ['AF-1', 'Descubrible', 'Robots, sitemap y rutas publicas coherentes.'],
  ['AF-2', 'Comprensible', 'Respuestas, estructura, fuentes y fechas.'],
  ['AF-3', 'Con herramientas', 'Contratos y recursos publicos verificables.'],
  ['AF-4', 'Delegable', 'Identidad, permisos, consentimiento y auditoria.'],
  ['AF-5', 'Nativo', 'Coordinacion y pagos solo cuando agregan valor.'],
];

export function MaturityMap() {
  return (
    <section className="maturity-map-band" aria-labelledby="maturity-map-title">
      <div className="maturity-map-intro">
        <span><Network size={16} /> Ruta de madurez</span>
        <h2 id="maturity-map-title">La transformacion agentica ocurre por capas.</h2>
        <p>Cada nivel suma evidencia o control observable. Un roadmap no cuenta como una capacidad desplegada.</p>
        <Link href="/evolucion-agentica">Comparar respuestas por etapa <ArrowRight size={16} /></Link>
      </div>
      <ol className="maturity-track">
        {stages.map(([level, title, detail], index) => (
          <li key={level} data-stage={index}>
            <div className="maturity-node">
              {index <= 3 ? <CircleCheck size={18} /> : <Circle size={18} />}
              <span>{level}</span>
            </div>
            <strong>{title}</strong>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
