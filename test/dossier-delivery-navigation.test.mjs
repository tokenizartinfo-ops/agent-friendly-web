import test from 'node:test';
import assert from 'node:assert/strict';
import {revealDossierDelivery} from '../lib/dossier-delivery-navigation.mjs';

test('delivery reopens after manual closure even when the requested React state is already true',()=>{
 const events=[];
 let requested=true;
 const panel={tagName:'DETAILS',open:false,querySelector:()=>({focus:options=>events.push(['focus',panel.open,options])}),scrollIntoView:options=>events.push(['scroll',panel.open,options])};
 const requestOpen=()=>{requested=true;};
 assert.equal(revealDossierDelivery(panel,requestOpen),true);
 assert.equal(requested,true);
 assert.equal(panel.open,true);
 assert.deepEqual(events.map(item=>item.slice(0,2)),[['focus',true],['scroll',true]]);
 assert.deepEqual(events[0][2],{preventScroll:true});
 panel.open=false;
 revealDossierDelivery(panel,requestOpen);
 assert.equal(panel.open,true);
 assert.equal(events.length,4);
});

test('a missing or incorrect panel cannot be reported as revealed',()=>{
 let requested=false;
 assert.equal(revealDossierDelivery(null,()=>{requested=true;}),false);
 assert.equal(revealDossierDelivery({tagName:'DIV'},()=>{requested=true;}),false);
 assert.equal(requested,false);
});
