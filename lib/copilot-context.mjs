import { analyzeIntakeNotes } from './intake-assistant.mjs';
import { knownGoalCodes } from './copilot-goal-contract.mjs';
import { emptyCopilotSession, reviewCopilotSession } from './copilot-session.mjs';

/** @param {Record<string, any>} [project] @param {{text:string,sessionJson:string}|null} [working] */
export function buildCopilotContext(project = {}, working = null) {
  const ownerDeclared = {};
  for (const field of ['organization', 'website', 'audience', 'cms', 'hosting', 'control']) {
    const value = project[field];
    if (typeof value === 'string' && value.trim() && value.length <= 400 && !analyzeIntakeNotes(value).blocked) ownerDeclared[field] = value;
  }
  let goals = [];
  try { goals = knownGoalCodes(JSON.parse(project.goalsJson || '[]')); } catch { /* Incomplete declarations stay unknown. */ }
  ownerDeclared.goals = goals;
  let session = emptyCopilotSession();
  try { if (working) session = reviewCopilotSession(JSON.parse(working.sessionJson || '{}'), working.text); } catch { /* Legacy or invalid state is not context. */ }
  return { contract: 'afw-copilot-context.v1', basedOnRevision: Number.isSafeInteger(project.revision) ? project.revision : 0,
    ownerDeclared, evidenceStatus: 'not_website_verified', deferred: session.deferred,
    decisions: session.decisions, permissionStatus: 'no_operations_authorized' };
}
