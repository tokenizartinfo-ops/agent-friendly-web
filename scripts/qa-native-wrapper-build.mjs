import {mkdir,realpath,writeFile,lstat} from 'node:fs/promises';
import {isAbsolute,join,resolve} from 'node:path';
import {buildQaNativeWrapper} from '../lib/mcp-qa-native-wrapper-build.mjs';
import {validateQaNativeArtifact} from '../lib/mcp-qa-native-artifact.mjs';

// Environment is provided by the trusted GitHub runner, never a caller path flag.
try{
 if(process.argv.length!==2||process.env.GITHUB_ACTIONS!=='true')throw Error();
 const runner=process.env.RUNNER_TEMP,sourceRevision=process.env.GITHUB_SHA;
 if(typeof runner!=='string'||!isAbsolute(runner)||resolve(runner)!==runner||await realpath(runner)!==runner||(await lstat(runner)).isSymbolicLink())throw Error();
 const artifact=validateQaNativeArtifact({artifact:await buildQaNativeWrapper({sourceRevision}),sourceRevision});
 const dir=join(runner,'afw-native-observation');
 await mkdir(dir,{mode:0o700});
 const manifest=Object.fromEntries(Object.entries(artifact).filter(([key])=>key!=='base64'));
 await writeFile(join(dir,'index.mjs'),Buffer.from(artifact.base64,'base64'),{flag:'wx',mode:0o600});
 await writeFile(join(dir,'wrapper-manifest.json'),JSON.stringify(manifest)+'\n',{flag:'wx',mode:0o600});
 console.log('AFW_NATIVE_WRAPPER_BUILD',JSON.stringify({sourceRevision,bytes:artifact.bytes,sha256:artifact.sha256,authorizesEffects:false,operationalReadiness:false}));
}catch{
 console.error('AFW native wrapper build rejected');
 process.exitCode=1;
}
