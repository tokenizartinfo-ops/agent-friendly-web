import {DurableObject,WorkerEntrypoint} from 'cloudflare:workers';
const unavailable=()=>new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
const reject=()=>{throw Error('Private event Node unavailable');};
// Closed recovery only, after original process shutdown is independently verified.
// Keep the provisioned namespace live; never touch its original storage or Container.
export class AfwOwnEventNode extends DurableObject{
 fetch(){return unavailable();}
 list(){return reject();}
 subscribe(){return reject();}
 unsubscribe(){return reject();}
 consume(){return reject();}
 close(){return reject();}
 deliverSaved(){return reject();}
}
export class AfwNodeControl extends WorkerEntrypoint{fetch(){return unavailable();}}
const worker={fetch(){return unavailable();}};
export default worker;
