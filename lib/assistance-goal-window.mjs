export function isAssistanceGoalWindowOpen(settings,now=Date.now()){
 const value=settings.AFW_ASSISTANCE_GOAL_CONTEXT_EXPIRES_AT;
 const deadline=typeof value==='string'?Date.parse(value):NaN;
 return settings.AFW_ASSISTANCE_GOAL_CONTEXT_ENABLED==='true'&&Number.isFinite(deadline)
  &&new Date(deadline).toISOString()===value&&deadline>now&&deadline-now<=600000;
}
