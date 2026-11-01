import {resolveFiniteNativePackage} from './mcp-qa-finite-package.mjs';

/** Seed-material resolves factual package primaries only. Full native material
 * assembly/profile qualification remains 4C; no caller plan or fixture fallback. */
export async function resolvePrivateQaFiniteExternalSource({phase,sourceRevision,githubToken,fetchImpl,now,signal}={}){
 if(phase!=='seed-material')throw Error('Finite source constructor unavailable');
 return resolveFiniteNativePackage({sourceRevision,githubToken,fetchImpl,now,signal});
}
