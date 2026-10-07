// Compile columns and joins only: LIMIT 0 returns no private or operational rows.
// This is not a migration, binding check, permission check or readiness certificate.
const checks=Object.freeze({
 source:[
  'SELECT p.id,p.user_id,e.id,e.project_id,e.user_id,e.type,e.created_at,e.payload_json FROM site_projects p JOIN project_events e ON e.project_id=p.id LIMIT 0',
  'SELECT project_ref,source_event_id,event_id,confirmed_at FROM assistance_delivery_receipts LIMIT 0',
  'SELECT source_event_id,review_json,confirmed_at FROM assistance_feedback_receipts LIMIT 0',
 ],
 operations:[
  'SELECT e.event_id,e.project_ref,e.revision,e.kind,e.topic,e.observed_at,e.received_at,r.run_id,r.request_id,r.event_id,r.started_at,r.expires_at,r.outcome,r.completed_at FROM assistance_supervision_events e JOIN assistance_supervision_runs r ON r.event_id=e.event_id LIMIT 0',
  'SELECT receipt_id,run_id,event_id,reserved_at,expires_at FROM assistance_goal_generation_budget LIMIT 0',
 ],
});
export function assistanceSchemaPreflightSql(role){
 if(!Object.hasOwn(checks,role))throw Error('invalid_role');
 return checks[role].join(';\n')+';';
}
