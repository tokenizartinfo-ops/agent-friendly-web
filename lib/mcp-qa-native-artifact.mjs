import {createHash} from 'node:crypto';
import {QA_NATIVE_WRAPPER_PIN} from './mcp-qa-native-wrapper-pin.mjs';

const keys=['purpose','sourceRevision','baselineVersionId','baselineModuleHash','moduleName','bytes','sha256','base64','authorizesEffects','operationalReadiness'];
const reject=()=>{throw Error('Native wrapper artifact rejected');};
function fields(value,names){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==names.length)reject();
 const result={};
 for(const name of names){
  const d=Object.getOwnPropertyDescriptor(value,name);
  if(!d?.enumerable||!Object.hasOwn(d,'value'))reject();
  result[name]=d.value;
 }
 return result;
}
/** Dependency-free validation for the existing no-install effect entry.
 * The editable manifest is not authority: bytes must also match the committed pin.
 * Nothing in this module loads or executes the artifact. */
export function validateQaNativeArtifact(options){
 try{
  const {artifact,sourceRevision}=fields(options,['artifact','sourceRevision']);
  const a=fields(artifact,keys);
  if(typeof sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(sourceRevision)||a.sourceRevision!==sourceRevision||a.purpose!=='afw.qa-native-wrapper-artifact.v1'||a.baselineVersionId!=='c570b60b-95dc-48e1-89f3-9c4651691dbc'||a.baselineModuleHash!=='4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f'||a.moduleName!=='index.mjs'||a.authorizesEffects!==false||a.operationalReadiness!==false)reject();
  if(!Number.isSafeInteger(a.bytes)||a.bytes<1||a.bytes>131072||a.bytes!==QA_NATIVE_WRAPPER_PIN.bytes||typeof a.sha256!=='string'||!/^[a-f0-9]{64}$/.test(a.sha256)||a.sha256!==QA_NATIVE_WRAPPER_PIN.sha256)reject();
  if(typeof a.base64!=='string'||a.base64.length<4||a.base64.length>174764||!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(a.base64))reject();
  const bytes=Buffer.from(a.base64,'base64');
  if(bytes.length!==a.bytes||bytes.toString('base64')!==a.base64||createHash('sha256').update(bytes).digest('hex')!==a.sha256)reject();
  return Object.freeze(a);
 }catch{reject();}
}
