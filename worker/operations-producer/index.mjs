import {createOperationsProducer} from '../../lib/operations-producer.mjs';
const producer=createOperationsProducer();
const worker={
  fetch(){return new Response('Not found',{status:404});},
  scheduled(_controller,env,ctx){ctx.waitUntil(producer.run(env).then(result=>{if(!result.ok)throw Error('Operational delivery unconfirmed');}));}
};
export default worker;
