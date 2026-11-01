import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const reject=()=>{throw Error('Native wrapper build rejected');};
const expectedImports=['./closed-observation-context-v2.mjs','./closed-rollback.mjs','node:crypto'];
const expectedExports=['IndependentClosure','PrivateQaBootstrap','PrivateQaNamedConfirmation','PrivateQaPreregistration','default'];
/** Builds only the fixed, source-controlled v2 metadata wrapper. Never loads the
 * historical baseline or executes generated/downloaded code. Context is external,
 * so sourceRevision and observation identity do not change wrapper bytes. */
export async function buildQaNativeWrapper(options){
 try{
  if(!options||Object.getPrototypeOf(options)!==Object.prototype||Reflect.ownKeys(options).length!==1)reject();
  const d=Object.getOwnPropertyDescriptor(options,'sourceRevision');
  if(!d?.enumerable||!Object.hasOwn(d,'value')||typeof d.value!=='string'||!/^[a-f0-9]{40}$/.test(d.value))reject();
  const sourceRevision=d.value;
  const built=await build({absWorkingDir:root,entryPoints:['scripts/qa-closed-quiescence-wrapper-v2.mjs'],bundle:true,format:'esm',platform:'neutral',target:'es2022',write:false,metafile:true,logLevel:'silent',external:['node:*','cloudflare:*','./closed-rollback.mjs','./closed-observation-context-v2.mjs']});
  const outputs=Object.values(built.metafile.outputs);
  if(outputs.length!==1||built.outputFiles.length!==1)reject();
  const out=outputs[0],imports=[...new Set(out.imports.map(x=>x.path))].sort();
  if(out.imports.some(x=>!x.external||x.kind!=='import-statement')||JSON.stringify(imports)!==JSON.stringify(expectedImports)||JSON.stringify([...out.exports].sort())!==JSON.stringify(expectedExports))reject();
  const forbidden=/mcp-qa-(?:arm-eligibility|generation-ledger|generation-preparation|arm-observation)\.mjs$/;
  if(Object.keys(built.metafile.inputs).some(x=>forbidden.test(x)))reject();
  const bytes=Buffer.from(built.outputFiles[0].contents);
  if(bytes.length<1||bytes.length>131072)reject();
  return Object.freeze({purpose:'afw.qa-native-wrapper-artifact.v1',sourceRevision,baselineVersionId:'c570b60b-95dc-48e1-89f3-9c4651691dbc',baselineModuleHash:'4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f',moduleName:'index.mjs',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),base64:bytes.toString('base64'),authorizesEffects:false,operationalReadiness:false});
 }catch{reject();}
}
