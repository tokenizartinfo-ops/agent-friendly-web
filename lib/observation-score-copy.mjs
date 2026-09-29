const unknown={es:'Sin puntaje',en:'No score',pt:'Sem pontuação'};

export function observationScoreLabel(readiness,locale='es'){
 const score=readiness?.score;
 return Number.isInteger(score)&&score>=0&&score<=100?`${score}/100`:unknown[locale]||unknown.es;
}
