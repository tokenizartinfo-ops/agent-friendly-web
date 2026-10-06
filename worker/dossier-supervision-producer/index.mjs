import {createDossierProducer} from '../../lib/dossier-supervision-bridge.mjs';
const producer=createDossierProducer();
const worker={
 fetch(){return new Response('Not found',{status:404});},
 scheduled(_event,env,ctx){ctx.waitUntil(producer.run(env).then(result=>{if(result.failed)throw Error('Dossier event delivery unconfirmed');}));}
};
export default worker;
