import {createAssistanceProducer} from '../../lib/assistance-supervision-delivery.mjs';
import {createAssistanceFeedbackProducer} from '../../lib/assistance-feedback.mjs';
const producer=createAssistanceProducer();
const feedback=createAssistanceFeedbackProducer();
const worker={
 fetch(){return new Response('Not found',{status:404});},
 scheduled(_event,env,ctx){ctx.waitUntil((async()=>{const result=await producer.run(env);if(result.failed)throw Error('Assistance event delivery unconfirmed');const reviewed=await feedback.run(env);if(reviewed.failed)throw Error('Assistance feedback unconfirmed');})());}
};
export default worker;
