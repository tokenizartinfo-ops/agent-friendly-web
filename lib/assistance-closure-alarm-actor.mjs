import {createClosureAlarmLifecycle} from './assistance-closure-alarm-lifecycle.mjs';

// Only server composition supplies options. No caller-supplied plan or actions.
export function createClosureAlarmActor({context,options}={}){
 if(typeof context?.blockConcurrencyWhile!=='function')throw Error('Invalid closure actor');
 const lifecycle=options?createClosureAlarmLifecycle(options):null;
 const call=method=>lifecycle?context.blockConcurrencyWhile(()=>lifecycle[method]()):Promise.resolve(Object.freeze({state:'unavailable'}));
 return Object.freeze({arm:()=>call('arm'),status:()=>call('status'),alarm:()=>call('alarm')});
}
