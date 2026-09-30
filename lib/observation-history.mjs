const MAX_HISTORY=5;

function origin(value){
 try{const url=new URL(value);return ['http:','https:'].includes(url.protocol)?url.origin:null;}catch{return null;}
}

/** A bounded, metadata-only view of observations for the dossier's current origin. */
export function summarizeObservationHistory(rows,projectWebsite){
 const currentOrigin=origin(projectWebsite);
 if(!currentOrigin)return [];
 return rows.filter(row=>origin(row.targetOrigin)===currentOrigin).slice(0,MAX_HISTORY).map(row=>{
  let readiness={};
  try{readiness=JSON.parse(row.readinessJson);}catch{/* A damaged old snapshot cannot establish progress. */}
  const score=readiness&&typeof readiness==='object'&&Number.isInteger(readiness.score)&&readiness.score>=0&&readiness.score<=100?readiness.score:null;
  return {id:row.id,target:currentOrigin,checkedAt:row.checkedAt,
   score,level:typeof readiness?.level==='string'?readiness.level.slice(0,80):'',
   methodology:typeof readiness?.methodology==='string'?readiness.methodology.slice(0,160):''};
 });
}

/** Compare scores only when both stored snapshots used the same named methodology. */
export function compareObservationHistory(history){
 if(history.length<2)return null;
 const [latest,previous]=history;
 const latestTime=Date.parse(latest.checkedAt),previousTime=Date.parse(previous.checkedAt);
 if(!Number.isFinite(latestTime)||!Number.isFinite(previousTime)||latestTime<=previousTime||latest.id===previous.id)return null;
 if(latest.target!==previous.target||!latest.methodology||latest.methodology!==previous.methodology||latest.score===null||previous.score===null)return null;
 return {delta:latest.score-previous.score,latest,previous};
}
