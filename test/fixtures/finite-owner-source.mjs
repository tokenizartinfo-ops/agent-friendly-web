// SYNTHETIC SOURCE ONLY, substituted statically by esbuild in native tests.
// No fixture is imported by any production module or qualified as runtime evidence.
export async function readPrivateQaFiniteOwnerSource({ctx,env,parent}){
 parent.assertCurrent();
 if(env.RELEASE_DB===env.DB)throw Error('synthetic wrong release binding');
 const source=await ctx.storage.get('fixture:source');
 parent.assertCurrent();
 if(!source)throw Error('synthetic source absent');
 return source;
}
