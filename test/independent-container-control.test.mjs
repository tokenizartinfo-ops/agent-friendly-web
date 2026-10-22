import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
const url = new URL('../examples/container-control-20261022/guard.mjs', import.meta.url);
const api = existsSync(url) ? await import(url) : null;
test('independent Container diagnostic helper exists before any deployment', () => assert.ok(api, 'Missing isolated Container control helper; no runtime deployment is permitted'));
const n = 1792670400000;
const env = (extra = {}) => ({AFW_CONTROL_ENABLED:'true',AFW_CONTROL_PLAN:'afw-container-control-20261022-v1',AFW_CONTROL_CASE:'0907',AFW_CONTROL_START:String(n/1000),AFW_CONTROL_END:String(n/1000+1200),...extra});
const opts = {skip:!api};
test('valid fixed administrative case yields a frozen original window', opts, () => {
 const c=api.controlConfig(env(),n,'afw-20261022-0907');
 assert.deepEqual(c,{planId:'afw-container-control-20261022-v1',caseName:'0907',instanceId:'afw-20261022-0907',start:n,end:n+1200000});
 assert.ok(Object.isFrozen(c));
});
test('default, boolean and approximate enable flags never admit work', opts, () => {
 for(const v of [undefined,false,true,'TRUE','false','1'])assert.equal(api.controlConfig(env({AFW_CONTROL_ENABLED:v}),n,'afw-20261022-0907'),null);
});
test('wrong case, instance or plan cannot reach the native control', opts, () => {
 for(const e of [env({AFW_CONTROL_CASE:'other'}),env({AFW_CONTROL_PLAN:'other'})])assert.equal(api.controlConfig(e,n,'afw-20261022-0907'),null);
 assert.equal(api.controlConfig(env(),n,'afw-20261022-0929'),null);
 assert.equal(api.controlConfig(env(),n,'afw-20261022-0907-extra'),null);
 const c=api.controlConfig(env({AFW_CONTROL_CASE:'0929'}),n,'afw-20261022-0929');
 assert.equal(c.caseName,'0929');
});
test('future, expired and insufficient remaining original windows fail before start', opts, () => {
 assert.equal(api.controlConfig(env(),n-1,'afw-20261022-0907'),null);
 assert.equal(api.controlConfig(env(),n+1200000,'afw-20261022-0907'),null);
 assert.equal(api.controlConfig(env(),n+1200000-74999,'afw-20261022-0907'),null);
 assert.ok(api.controlConfig(env(),n+1200000-75000,'afw-20261022-0907'));
});
test('window size and timestamp syntax cannot silently widen the trial', opts, () => {
 for(const e of [env({AFW_CONTROL_END:String(n/1000+1201)}),env({AFW_CONTROL_START:'0',AFW_CONTROL_END:'1'}),env({AFW_CONTROL_START:'1e9'}),env({AFW_CONTROL_START:' 1792670400'}),env({AFW_CONTROL_END:'Infinity'})])assert.equal(api.controlConfig(e,n,'afw-20261022-0907'),null);
 for(const t of [NaN,Infinity,-1,n+0.5])assert.equal(api.controlConfig(env(),t,'afw-20261022-0907'),null);
});
test('the second compatibility condition cannot replace the first original budget', opts, () => {
 const c=api.controlConfig(env(),n,'afw-20261022-0907'), stored={planId:c.planId,start:c.start,end:c.end};
 assert.equal(api.sameControlPlan(stored,{...c,caseName:'0929'}),true);
 assert.equal(api.sameControlPlan(stored,{...c,end:c.end+1000}),false);
 assert.equal(api.sameControlPlan(stored,{...c,start:c.start+1000}),false);
 assert.equal(api.sameControlPlan({...stored,planId:'other'},c),false);
 assert.equal(api.sameControlPlan({...stored,extra:true},c),false);
 let touched=false;const bad={...stored};Object.defineProperty(bad,'end',{get(){touched=true;return c.end;},enumerable:true});
 assert.equal(api.sameControlPlan(bad,c),false);assert.equal(touched,false);
});
test('only the exact fixed response for the current condition is accepted', opts, () => {
 const wire=JSON.stringify({marker:'afw-container-control-20261022-v1',caseName:'0907'});
 assert.equal(api.verifyControlResponse(wire,'0907'),true);
 for(const bad of [wire.replace('0907','0929'),wire.replace('-v1','-v2'),JSON.stringify({marker:'afw-container-control-20261022-v1',caseName:'0907',approved:true}),'{}','null','[]','bad','x'.repeat(513)])assert.equal(api.verifyControlResponse(bad,'0907'),false);
 assert.equal(api.verifyControlResponse(wire,'other'),false);
});

test('admission headroom does not shorten an already admitted absolute window', opts, () => {
 assert.equal(typeof api.continuingControlConfig,'function','continuation needs its own original-deadline guard');
 const id='afw-20261022-0907',at=n+1200000-74000;
 assert.equal(api.controlConfig(env(),at,id),null);
 assert.equal(api.continuingControlConfig(env(),at,id).end,n+1200000);
 assert.equal(api.continuingControlConfig(env(),n+1200000,id),null);
 assert.equal(api.continuingControlConfig(env({AFW_CONTROL_ENABLED:'false'}),at,id),null);
 assert.equal(api.continuingControlConfig(env(),at,'other'),null);
});
