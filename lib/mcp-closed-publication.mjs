import {createPublicationJournal} from './mcp-publication-journal.mjs';
import {createClosedVersionUpload} from './mcp-closed-version-upload.mjs';
import {createPublicationArtifactReader} from './mcp-publication-artifact-reader.mjs';
const exact=(value,keys)=>{try{if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)throw Error();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(value,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))throw Error();out[k]=d.value;}return Object.freeze(out);}catch{throw Error('Closed publication unavailable');}};
/** Operator-only composition; not mounted on any request path. Calling publish
 * requires a separately authorized closed release and trusted primary journal. */
export function createClosedPublication({db,artifact,pins,readCredential,fetchImpl,now,timeoutMs=60000}={}){
 const p=exact(pins,['accountId','workerName','baseVersionId','namespaceId','databaseId','kvId']);
 const a=exact(artifact,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
 const upload=createClosedVersionUpload({...p,workerHash:a.workerHash,readCredential,fetchImpl});
 const readVersion=createPublicationArtifactReader({accountId:p.accountId,workerName:p.workerName,moduleName:'index.mjs',workerHash:a.workerHash,readCredential,fetchImpl});
 return createPublicationJournal({db,artifact:a,accountId:p.accountId,workerName:p.workerName,upload,readVersion,now,timeoutMs});
}
