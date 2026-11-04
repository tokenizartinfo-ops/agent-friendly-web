import {createFiniteOwnerRequestLease} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
import {forwardFiniteOwnerChoice} from '../../lib/mcp-qa-finite-owner-native-bridge.mjs';
let active=null,entered=0;
// SYN controls exist only in this fixture. The actual product bridge owns every
// forwarded target/header/holder and the receiver is the actual product helper.
export default {async fetch(request,env,ctx){
 const path=new URL(request.url).pathname;
 const stub=env.AFW_FINITE_TRIAL_CONTROL.get(env.AFW_FINITE_TRIAL_CONTROL.idFromName('afw-own-successor-closure-v1'));
 if(path==='/fixture/state')return Response.json({senderEntered:entered,...await stub.state()});
 if(path==='/fixture/hold'){await stub.hold();return Response.json({configured:true});}
 if(path==='/fixture/release'){await stub.release();return Response.json({released:true});}
 if(path==='/fixture/abort'){active?.finish();return Response.json({aborted:!!active});}
 if(path==='/fixture/reset'){await stub.reset();return Response.json({reset:true});}
 if(path==='/fixture/wrong-actor')return env.AFW_FINITE_TRIAL_CONTROL.get(env.AFW_FINITE_TRIAL_CONTROL.idFromName('SYN-foreign')).fetch(request);
 const parent=createFiniteOwnerRequestLease(request);active=parent;entered++;
 try{return await forwardFiniteOwnerChoice({request,env,ctx},parent.lease);}
 finally{parent.finish();if(active===parent)active=null;}
}};
