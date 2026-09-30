import { compareObservationHistory } from './observation-history.mjs';

/** @param {{projectId?:string,website?:string,ready?:{projectId:string,website:string}|null,failure?:{projectId:string,website:string}|null}} [input] */
export function dossierUpdatesReadState({projectId='',website='',ready=null,failure=null}={}) {
  if(!projectId||!website)return 'save';
  const matches=scope=>scope?.projectId===projectId&&scope?.website===website;
  if(matches(failure))return 'failed';
  return matches(ready)?'ready':'loading';
}

export const DOSSIER_UPDATES_READ_COPY={
  es:{save:'Guardemos primero el expediente para consultar su seguimiento.',loading:'Estoy consultando las observaciones guardadas. Esto no ejecuta una auditoría nueva.',failed:'No pude recuperar el historial. Esto no significa que se haya perdido. Reintentemos la consulta antes de decidir el siguiente paso.'},
  en:{save:'Save the dossier first so we can read its updates.',loading:'I am reading saved observations. This does not run a new audit.',failed:'I could not retrieve the history. That does not mean it was lost. Retry the read before deciding the next step.'},
  pt:{save:'Vamos salvar primeiro o dossiê para consultar o acompanhamento.',loading:'Estou consultando as observações salvas. Isso não executa uma nova auditoria.',failed:'Não consegui recuperar o histórico. Isso não significa que foi perdido. Vamos repetir a consulta antes de decidir o próximo passo.'}
};

/** Relevant in-app updates derived from saved observations. Preferences are not a running scheduler. */
/** @param {{website?:string,history?:Array<{id:string,target:string,checkedAt:string,score:number|null,methodology:string,level?:string}>,monitoringPreference?:string,readState?:string}} [input] */
export function dossierUpdates({ website = '', history = [], monitoringPreference = '', readState='ready' } = {}) {
  if(readState!=='ready')return {items:[],scheduledMonitoring:false,monitoringPreference,readState};
  let origin;
  try { origin = new URL(website).origin; } catch { return { items: [], scheduledMonitoring: false,readState:'save' }; }
  const matching = history.filter(item => item.target === origin && Number.isFinite(Date.parse(item.checkedAt))).slice(0, 5);
  const comparison = compareObservationHistory(matching);
  const latest = matching[0];
  const items = latest ? [{ id: latest.id, kind: comparison ? 'observed_change' : 'observed_snapshot', checkedAt: latest.checkedAt,
    target: origin, score: latest.score, ...(comparison ? { delta: comparison.delta } : {}), actionId: 'review_observation' }] : [];
  return { items, scheduledMonitoring: false, monitoringPreference,readState };
}
