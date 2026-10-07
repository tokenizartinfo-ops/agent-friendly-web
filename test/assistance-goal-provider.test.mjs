import test from 'node:test';
import assert from 'node:assert/strict';
import {createAssistanceGoalGenerator} from '../lib/assistance-goal-provider.mjs';
const input=()=>({declarations:{siteType:'commerce',goals:[]},evidenceStatus:'owner_declared',operationsAuthorized:false});
const answer={question:'¿Qué querés que pueda encontrar un asistente sobre tu negocio?',why:'Esto nos ayuda a elegir un primer paso acorde con tu objetivo.'};
test('provider sends only minimal declarations and returns a validated single question',async()=>{
 const calls=[];const generate=createAssistanceGoalGenerator({ai:{run:async(...args)=>{calls.push(args);return{response:JSON.stringify(answer)};}},locale:'es'});
 assert.deepEqual(await generate(input(),{signal:new AbortController().signal}),answer);
 assert.equal(calls.length,1);assert.equal(calls[0][1].temperature,0);
 assert.deepEqual(JSON.parse(calls[0][1].messages[1].content),input());
 assert.equal(calls[0][1].response_format.json_schema.additionalProperties,false);
});
test('invalid input or locale fails before inference',async()=>{
 let calls=0;const ai={run:async()=>{calls++;return answer;}};
 for(const value of [{...input(),userId:'private'}, {...input(),operationsAuthorized:true}, {...input(),declarations:{siteType:'unknown',goals:[]}}, {...input(),declarations:{siteType:'commerce',goals:['invented']}}]){
  await assert.rejects(createAssistanceGoalGenerator({ai,locale:'es'})(value,{signal:new AbortController().signal}));
 }
 await assert.rejects(createAssistanceGoalGenerator({ai,locale:'xx'})(input(),{signal:new AbortController().signal}));assert.equal(calls,0);
});
test('invalid model output and errors never trigger another model request',async()=>{
 for(const result of [{...answer,score:100},{...answer,question:'Primera? Segunda?'},{...answer,why:'<script>'},'x'.repeat(4097),'{broken']){
  let calls=0;const generate=createAssistanceGoalGenerator({ai:{run:async()=>{calls++;return result;}},locale:'es'});
  await assert.rejects(generate(input(),{signal:new AbortController().signal}));assert.equal(calls,1);
 }
 let calls=0;await assert.rejects(createAssistanceGoalGenerator({ai:{run:async()=>{calls++;throw Error('provider');}},locale:'es'})(input(),{signal:new AbortController().signal}));assert.equal(calls,1);
});
test('cancellation before inference makes no call; cancellation during inference discards eventual output',async()=>{
 let calls=0;const aborted=new AbortController();aborted.abort();
 await assert.rejects(createAssistanceGoalGenerator({ai:{run:async()=>{calls++;return answer;}},locale:'es'})(input(),{signal:aborted.signal}));assert.equal(calls,0);
 let resolve;const controller=new AbortController();const generate=createAssistanceGoalGenerator({ai:{run:()=>{calls++;return new Promise(r=>{resolve=r;});}},locale:'es'});
 const pending=generate(input(),{signal:controller.signal});await Promise.resolve();controller.abort();await assert.rejects(pending);resolve(answer);assert.equal(calls,1);
});
