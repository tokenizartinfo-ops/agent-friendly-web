import {DurableObject} from 'cloudflare:workers';
import {createClosureAlarmActor} from '../../lib/assistance-closure-alarm-actor.mjs';

// Closed entrypoint. Administrative custody/composition not yet available.
// Environment values or caller arguments cannot activate this preparation.
export class IndependentClosure extends DurableObject {
 constructor(ctx,env){super(ctx,env);this.actor=createClosureAlarmActor({context:ctx});}
 arm(){return this.actor.arm();}
 status(){return this.actor.status();}
 alarm(){return this.actor.alarm();}
 fetch(){return new Response(null,{status:404});}
}
const worker={fetch(){return new Response(null,{status:404});}};
export default worker;
