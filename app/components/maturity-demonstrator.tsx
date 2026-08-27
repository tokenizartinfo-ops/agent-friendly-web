'use client';

import { useMemo, useState } from 'react';
import { Building2, Check, CircleAlert, Clock3, Landmark, Palette } from 'lucide-react';

type ScenarioId = 'restaurant' | 'municipality' | 'tokenizart';

const stages = [
  { id: 0, name: 'Invisible', evidence: 'Pagina HTML dispersa o dificil de rastrear.' },
  { id: 1, name: 'Descubrible', evidence: 'Robots, sitemap y paginas publicas coherentes.' },
  { id: 2, name: 'Comprensible', evidence: 'Respuestas directas, datos estructurados, fuentes y fechas.' },
  { id: 3, name: 'Herramientas', evidence: 'OpenAPI, skills o catalogos reales y verificables.' },
  { id: 4, name: 'Interaccion segura', evidence: 'Identidad, consentimiento, scopes, auditoria y operaciones acotadas.' },
  { id: 5, name: 'Nativo para agentes', evidence: 'Delegacion gobernada, A2A y pagos solo donde agregan valor.' },
];

const scenarios = {
  restaurant: {
    label: 'Restaurante',
    icon: Building2,
    question: 'Esta abierto hoy, tiene menu sin gluten y puedo reservar para ocho personas?',
    weak: 'No encuentro informacion suficientemente clara y actualizada para confirmar horarios, menu o reservas.',
    details: [
      'Horario con fecha de actualizacion, direccion y canales oficiales.',
      'Menu estructurado con alergenos, precios y vigencia.',
      'API o herramienta de reserva con disponibilidad y condiciones.',
      'Confirmacion auditada antes de crear o pagar una reserva.',
    ],
    answers: [
      'El sitio no ofrece evidencia suficiente para responder con seguridad.',
      'Puedo localizar el negocio y sus paginas principales, pero conviene confirmar horario y menu directamente.',
      'Hoy figura abierto de 12:00 a 23:00. El menu declara opciones sin gluten; la disponibilidad debe confirmarse con el restaurante.',
      'Ademas de informar, puedo consultar la herramienta publica de disponibilidad para ocho personas.',
      'Con tu confirmacion y el alcance autorizado, puedo preparar una reserva sin acceder a otras funciones.',
      'Un agente puede coordinar disponibilidad, restricciones y pago gobernado, conservando recibo y trazabilidad.',
    ],
  },
  municipality: {
    label: 'Municipalidad',
    icon: Landmark,
    question: 'Cuando vence esta tasa, que documentos necesito y donde inicio el tramite?',
    weak: 'Puedo encontrar paginas relacionadas, pero no distinguir con certeza fecha vigente, requisitos y canal oficial.',
    details: [
      'Calendario oficial versionado y datos de contacto verificables.',
      'Procedimientos por tramite, requisitos y excepciones.',
      'Servicios de consulta con respuestas estructuradas.',
      'Acciones autenticadas separadas de la informacion publica.',
    ],
    answers: [
      'El contenido existe, pero no esta organizado para una respuesta confiable.',
      'Puedo encontrar la pagina del tramite y el calendario publicado.',
      'La respuesta cita el vencimiento vigente, enumera documentos y enlaza el inicio oficial.',
      'Puedo consultar el estado publico del servicio y validar que el formulario sigue activo.',
      'Despues de autenticarte, un agente puede completar un borrador; el envio queda sujeto a tu aprobacion.',
      'Agentes institucionales y personales pueden coordinar el tramite con delegacion, limites y auditoria.',
    ],
  },
  tokenizart: {
    label: 'Tokenizart',
    icon: Palette,
    question: 'Donde conviene tokenizar una obra y como puedo empezar sin entender blockchain?',
    weak: 'La respuesta puede reducir Tokenizart a un marketplace NFT o no distinguir el sitio publico de Atelier.',
    details: [
      'Tokenizart explica identidad, evidencia, provenance y modelo owner-first.',
      'Atelier se identifica como la plataforma donde sucede la operacion.',
      'CLI, skills, OpenAPI y MCP se publican solo cuando son utilizables.',
      'Owner Live y acciones exigen identidad, consentimiento y auditoria.',
    ],
    answers: [
      'No hay contexto suficiente para distinguir la propuesta o recomendar un recorrido.',
      'Puedo encontrar Tokenizart y Atelier, pero todavia faltan explicaciones machine-readable consistentes.',
      'Tokenizart crea identidad digital y trazabilidad para objetos unicos; Atelier guia el proceso sin exigir manejo manual de gas.',
      'Puedo usar documentacion y herramientas publicas verificadas para explicar ERC-721, Mint, Certify, NFC y el siguiente paso.',
      'Con identidad Atelier y consentimiento, un Copilot puede leer contexto owner limitado sin ejecutar acciones.',
      'El usuario puede delegar tareas mediante herramientas oficiales, controles por accion y pagos agenticos cuando esten implementados.',
    ],
  },
} as const;

export function MaturityDemonstrator() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('tokenizart');
  const [stageId, setStageId] = useState(2);
  const scenario = scenarios[scenarioId];
  const stage = stages[stageId];
  const Icon = scenario.icon;
  const visibleDetails = useMemo(() => scenario.details.slice(0, Math.min(4, Math.max(0, stageId))), [scenario, stageId]);

  return (
    <section className="demo-workspace" aria-label="Comparador de madurez agentica">
      <div className="demo-controls">
        <div>
          <span className="control-label">Caso</span>
          <div className="segment-control" role="group" aria-label="Elegir caso">
            {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
              <button type="button" aria-pressed={scenarioId === id} key={id} onClick={() => setScenarioId(id)}>{scenarios[id].label}</button>
            ))}
          </div>
        </div>
        <div>
          <span className="control-label">Madurez observada</span>
          <div className="stage-control" role="group" aria-label="Elegir nivel AF">
            {stages.map((item) => (
              <button type="button" aria-pressed={stageId === item.id} key={item.id} onClick={() => setStageId(item.id)}>
                <strong>AF-{item.id}</strong><span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="comparison-grid">
        <article className="scenario-question">
          <div className="scenario-title"><Icon size={22} /><span>{scenario.label}</span></div>
          <h2>{scenario.question}</h2>
          <div className="weak-answer"><CircleAlert size={18} /><div><strong>Antes o sin evidencia suficiente</strong><p>{scenario.weak}</p></div></div>
        </article>

        <article className="agent-answer">
          <div className="answer-heading"><span>Respuesta ilustrativa</span><strong>AF-{stage.id} · {stage.name}</strong></div>
          <p>{scenario.answers[stageId]}</p>
          <div className="evidence-line"><Clock3 size={16} /><span>{stage.evidence}</span></div>
          {visibleDetails.length ? (
            <ul>{visibleDetails.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul>
          ) : <div className="empty-evidence">Todavia no hay señales publicas suficientes para sostener una respuesta precisa.</div>}
        </article>
      </div>
    </section>
  );
}
