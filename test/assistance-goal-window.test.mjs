import test from 'node:test';
import assert from 'node:assert/strict';
import {isAssistanceGoalWindowOpen} from '../lib/assistance-goal-window.mjs';
test('the consent view stays hidden without an explicit finite canonical window',()=>{
 const now=Date.parse('2026-10-06T22:00:00.000Z');
 const settings={AFW_ASSISTANCE_GOAL_CONTEXT_ENABLED:'true',AFW_ASSISTANCE_GOAL_CONTEXT_EXPIRES_AT:new Date(now+600000).toISOString()};
 assert.equal(isAssistanceGoalWindowOpen(settings,now),true);
 for(const value of [{},{...settings,AFW_ASSISTANCE_GOAL_CONTEXT_ENABLED:true},{...settings,AFW_ASSISTANCE_GOAL_CONTEXT_EXPIRES_AT:new Date(now+600001).toISOString()},{...settings,AFW_ASSISTANCE_GOAL_CONTEXT_EXPIRES_AT:new Date(now).toISOString()},{...settings,AFW_ASSISTANCE_GOAL_CONTEXT_EXPIRES_AT:'2026-10-06T22:05:00Z'}])assert.equal(isAssistanceGoalWindowOpen(value,now),false);
});
