import {build as actualBuild} from 'esbuild';
/** CI-only: cross the actual last compiler await before mutating a config. */
export async function build(options){
 const result=await actualBuild(options);
 await globalThis[Symbol.for('afw.ci.qa-fixed-context.compile-drift')]();
 return result;
}
