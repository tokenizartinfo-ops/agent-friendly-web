import {createAssistanceProducer} from '../../lib/assistance-supervision-delivery.mjs';
const producer=createAssistanceProducer();
const worker={
 fetch(){return new Response('Not found',{status:404});},
 scheduled(_event,env,ctx){ctx.waitUntil(producer.run(env).then(result=>{if(result.failed)throw Error('Assistance event delivery unconfirmed');}));}
};
export default worker;
