import * as ownerLeases from '../../lib/mcp-qa-finite-owner-preparation.mjs';
// SYNTHETIC SOURCE ONLY, substituted statically by esbuild in native tests.
// No fixture is imported by any production module or qualified as runtime evidence.
export async function readPrivateQaFiniteOwnerSource({ctx,env,parent,preconnectionId}){
 parent.assertCurrent();
 if(ctx.requestLineage){const context=ownerLeases.readFiniteOwnerRequestContext(parent);let cloneDenied=false;try{ownerLeases.readFiniteOwnerRequestContext({...parent});}catch{cloneDenied=true;}ctx.requestLineage.push({sameRoot:context?.root===ctx.requestRoot,remaining:context?.deadline-Date.now(),cloneDenied,frozen:Object.isFrozen(context)});}
 if(env.RELEASE_DB===env.DB)throw Error('synthetic wrong release binding');
 const source=await ctx.storage.get('fixture:source');
 const delay=await ctx.storage.get('fixture:delay');
 if(delay){delay.calls++;if(delay.calls===delay.atCall){delay.fired=true;await ctx.storage.put('fixture:delay',delay);await new Promise(resolve=>setTimeout(resolve,delay.ms));}else await ctx.storage.put('fixture:delay',delay);}
 parent.assertCurrent();
 if(!source)throw Error('synthetic source absent');
 if(source.phase!=='closed_ui'&&preconnectionId===null)throw Error('exact later-stage source ref required');
 return source;
}
