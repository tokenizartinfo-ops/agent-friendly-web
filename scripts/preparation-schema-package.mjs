import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

export const PREPARATION_SCHEMA_INPUTS=Object.freeze([
  {
    "path": "drizzle/0000_tearful_ego.sql",
    "blobSha": "2b1e488028a2b01f0d68826f8ed681952af7b8e0"
  },
  {
    "path": "drizzle/0001_registry_block1.sql",
    "blobSha": "3ecd5689734001ab38d3520f41ac3229220a6181"
  },
  {
    "path": "drizzle/0002_publication_capsules.sql",
    "blobSha": "6a7d75e0d597d401fe352b89b5df1be5332dbad6"
  },
  {
    "path": "drizzle/0006_reduced_pilot_revision.sql",
    "blobSha": "95f619970429bd46365bbdd3bcfe4d8105ba0796"
  },
  {
    "path": "drizzle/0008_happy_klaw.sql",
    "blobSha": "e3831c956b05dcbda930c8aba56199131a5a4349"
  },
  {
    "path": "drizzle/0009_volatile_meltdown.sql",
    "blobSha": "87734859f87bae8b7ae366c9fc728723ebbc8da0"
  },
  {
    "path": "drizzle/0011_furry_solo.sql",
    "blobSha": "34a4c5e460e5327aabc294a35dc6298dfc4dc927"
  },
  {
    "path": "drizzle/0012_worried_hardball.sql",
    "blobSha": "1d91bb928649dd521af6c4c5b8d23167bf76b76e"
  },
  {
    "path": "drizzle/0015_dossier_guide_continuity.sql",
    "blobSha": "a1ce4cf3bcbba6c36d23ab8dc960ec6bdcc7878e"
  },
  {
    "path": "db/agent-capsule-preparations.sql",
    "blobSha": "d165602141aabeba2c0acb2aa33a83934b7ac767"
  },
  {
    "path": "db/delegated-preparation-consents.sql",
    "blobSha": "af87da8d6fc6f59a01589ea7ae99c1a854d743e3"
  }
].map(x=>Object.freeze(x)));
const TABLES=Object.freeze(["agent_capsule_preparations","copilot_working_drafts","delegated_access_grants","delegated_consent_sessions","delegated_preparation_consents","domain_claims","project_events","publication_capsules","registry_sites","scan_observations","site_projects"]);
const SOURCE_REVISION='d863055afb04ef8fb83606d974e094f0f6044154';
const hash=(value,algorithm='sha256')=>createHash(algorithm).update(value).digest('hex');
const unavailable=()=>Error('Preparation schema source mismatch');
function describe(sql){
 const text=sql.trim().replace(/^(?:\s*--[^\n]*(?:\n|$))+\s*/,'');
 const id='["`]?([a-z_][a-z0-9_]*)["`]?';
 let m=text.match(new RegExp('^CREATE TABLE(?: IF NOT EXISTS)? '+id+'\\s*\\(','i'));
 if(m)return {kind:'table',name:m[1],table:m[1]};
 m=text.match(new RegExp('^CREATE(?: UNIQUE)? INDEX(?: IF NOT EXISTS)? '+id+' ON '+id+'\\s*\\(','i'));
 if(m)return {kind:'index',name:m[1],table:m[2]};
 m=text.match(new RegExp('^CREATE TRIGGER(?: IF NOT EXISTS)? '+id+'\\b','i'));
 if(m){const target=text.match(new RegExp('\\bON '+id+'(?:\\s|$)','i'));if(target)return {kind:'trigger',name:m[1],table:target[1]};}
 m=text.match(new RegExp('^ALTER TABLE '+id+' ADD(?: COLUMN)? '+id+'\\s','i'));
 if(m)return {kind:'alter',name:m[1]+'.'+m[2],table:m[1]};
 throw unavailable();
}

/** Public source DDL only. This is NOT a migration runner or provisioning authority. */
export function buildPreparationSchemaPackage(sources){
 if(!sources||typeof sources!=='object'||Array.isArray(sources)||Object.keys(sources).length!==PREPARATION_SCHEMA_INPUTS.length
  ||Object.keys(sources).some(path=>!PREPARATION_SCHEMA_INPUTS.some(x=>x.path===path)))throw unavailable();
 const statements=[],provenance=[];
 for(const input of PREPARATION_SCHEMA_INPUTS){
  const content=sources[input.path];
  if(typeof content!=='string'||Buffer.byteLength(content)>65536)throw unavailable();
  const bytes=Buffer.from(content);
  if(hash(Buffer.concat([Buffer.from('blob '+bytes.length+'\0'),bytes]),'sha1')!==input.blobSha)throw unavailable();
  provenance.push({...input,sha256:hash(bytes),bytes:bytes.length});
  const fragments=content.split('--> statement-breakpoint');
  for(let sourceIndex=0;sourceIndex<fragments.length;sourceIndex++){
   const sql=fragments[sourceIndex].trim();if(!sql)continue;
   const object=describe(sql);
   if(!TABLES.includes(object.table))continue;
   statements.push({...object,sourcePath:input.path,sourceIndex,sql,sha256:hash(sql)});
  }
 }
 const made=statements.filter(x=>x.kind==='table').map(x=>x.table).sort();
 if(JSON.stringify(made)!==JSON.stringify(TABLES))throw unavailable();
 const schemaSql='-- AFW isolated preparation schema v1: reviewed DDL only, no records or authority.\n'+statements.map(x=>x.sql).join('\n--> statement-breakpoint\n')+'\n';
 return {contract:'afw.preparation.schema-package.v1',sourceSetRevision:SOURCE_REVISION,tables:[...TABLES],sources:provenance,statements,
  schemaSql,schemaSha256:hash(schemaSql),provisioningAllowed:false,recordsIncluded:false,activationReady:false,operationalReadiness:false};
}

export async function readPreparationSchemaPackage(){
 const sources={};
 for(const input of PREPARATION_SCHEMA_INPUTS)sources[input.path]=await readFile(new URL('../'+input.path,import.meta.url),'utf8');
 return buildPreparationSchemaPackage(sources);
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==3||process.argv[2]!=='--json')throw unavailable();
  process.stdout.write(JSON.stringify(await readPreparationSchemaPackage())+'\n');
 }catch{process.stderr.write('Preparation schema package unavailable\n');process.exitCode=1;}
}
