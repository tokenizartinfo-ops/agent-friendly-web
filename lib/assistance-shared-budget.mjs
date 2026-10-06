/** Admission is atomic with each mode's INSERT/UPDATE, never a prior count/read.
 * All four additive ledger schemas must exist before enabling this fence.
 */
export function assistanceBudgetFence(enabled,now){
 if(enabled!==true)return '';
 if(!Number.isSafeInteger(now)||now<0)throw Error('Invalid budget clock');
 const day=now-86400000;
 return `AND NOT EXISTS(SELECT 1 FROM assistance_supervision_runs WHERE outcome IS NULL AND expires_at>${now})
 AND NOT EXISTS(SELECT 1 FROM dossier_supervision_runs WHERE outcome IS NULL AND expires_at>${now})
 AND NOT EXISTS(SELECT 1 FROM operations_investigations WHERE finished_at IS NULL AND expires_at>${now})
 AND NOT EXISTS(SELECT 1 FROM operations_notice_reservations WHERE outcome IS NULL AND expires_at>${now})
 AND ((SELECT count(*) FROM assistance_supervision_runs WHERE started_at>${day})
 +(SELECT count(*) FROM dossier_supervision_runs WHERE started_at>${day})
 +(SELECT count(*) FROM operations_investigations WHERE reserved_at>${day})
 +(SELECT count(*) FROM operations_notice_reservations WHERE reserved_at>${day}))<3`;
}
