// Original OWN static producer DATA verifier. Source bodies are bytes/hash only, never imports.
const saSame=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const saKeys=(v,keys)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&saSame(Object.keys(v),keys);
const saNeed=(condition,code)=>{if(!condition)throw Error('OWN_N3_SOURCE_DATA_REJECTED:'+code);};
function n3AdmitKnownSource(input,expected,hash,gitBlob){
 saNeed(saKeys(input,['bindingsRaw','bodies']),'INPUT_KEYS');
 saNeed(expected.schema==='root-own.n3.root-nominated-source-data-admission.v1'&&typeof hash==='function'&&typeof gitBlob==='function','TRUSTED_CONTEXT');
 saNeed(saKeys(input.bodies,expected.bodyOrder)&&new Set(expected.bodyOrder).size===expected.bodyOrder.length,'BODY_ROLE_SET');
 const raw=role=>{const v=input.bodies[role];saNeed(Buffer.isBuffer(v),'BODY_BUFFER_'+role);return v;};
 const json=role=>{let value;try{value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw(role)));}catch{saNeed(false,'JSON_'+role);}return value;};
 const manifest=json('manifest'),selection=json('selection'),schema=json('schema'),contract=json('contract'),normal=json('normalSourceIndex');
 let bindings;try{bindings=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(input.bindingsRaw));}catch{saNeed(false,'BINDINGS_JSON');}
 saNeed(saKeys(manifest,expected.manifestKeys),'MANIFEST_ORDER');
 saNeed(manifest.schema===expected.manifestSchema&&hash(JSON.stringify(manifest))===expected.manifestCanonicalHash,'MANIFEST_CANONICAL');
 saNeed(manifest.normalSourceIndexHash===expected.normalSourceIndexHash&&manifest.selectionHash===expected.selectionHash,'MANIFEST_ROOT_BINDINGS');
 saNeed(saSame(bindings.nomination,expected.sourceNomination),'SOURCE_NOMINATION');
 saNeed(selection.normalSourceIndex===expected.normalSourceIndexBlob&&selection.normalSourceIndexHash===expected.normalSourceIndexHash&&hash(JSON.stringify(selection))===expected.selectionHash,'SELECTION');
 saNeed(saSame(selection.ids,expected.sourceIds)&&normal.entries.length===expected.normalSourceEntryCount,'SOURCE_SELECTION_NORMAL13');
 for(const key of ['branch','message','workflow','job'])saNeed(selection.actualNomination[key]===expected.sourceNomination[key],'SELECTION_NOMINATION');
 saNeed(selection.actualNomination.prefix===expected.sourcePrefix,'SELECTION_PREFIX');
 saNeed(saSame(Object.keys(schema.properties),expected.outerOrder)&&saSame(Object.keys(schema.properties.bindings.properties),expected.outcomeBindingOrder),'SCHEMA_ORDERS');
 saNeed(schema.properties.selectionHash.const===expected.selectionHash,'SCHEMA_TOP_SELECTION');
 const bindingSchemas=schema.properties.journal.properties.witness.properties.records.items.oneOf.filter(r=>r.properties?.kind?.const==='binding');
 saNeed(bindingSchemas.length===1&&bindingSchemas[0].properties.selectionHash.const===expected.selectionHash&&saSame(Object.keys(bindingSchemas[0].properties).slice(3),expected.journalBindingOrder),'SCHEMA_JOURNAL_SELECTION');
 saNeed(saSame(contract.N3Wire.outerOrder,expected.outerOrder)&&saSame(contract.N3Wire.manifestKeyOrder,expected.manifestKeys)&&saSame(contract.N3Wire.outcomeBindingOrder,expected.outcomeBindingOrder)&&saSame(contract.N3Wire.journalBindingOrder,expected.journalBindingOrder)&&saSame(contract.N3Wire.controlsCausal,{accepted:31,rejected:32}),'CONTRACT_WIRE');
 for(const doc of [selection,contract,bindings])saNeed(doc.SourceQualified===false&&doc.Task1Pass===false,'FALSE_SOURCE_CLAIMS');
 for(const [role,key]of Object.entries(expected.bodyManifestFields))saNeed(manifest[key]===hash(raw(role)),'MANIFEST_BODY_'+role);
 for(const entry of expected.bodies){const value=raw(entry.role);saNeed(value.length===entry.bytes&&hash(value)===entry.sha256&&gitBlob(value)===entry.gitBlob,'BODY_HASH_'+entry.role);}
 const a=expected.rootNominatedBindings;
 saNeed(Buffer.isBuffer(input.bindingsRaw)&&input.bindingsRaw.length===a.bytes&&hash(input.bindingsRaw)===a.sha256&&gitBlob(input.bindingsRaw)===a.blob,'BINDINGS_AUTHORITY');
 const compiled={contractHash:manifest.contractHash,schemaHash:manifest.schemaHash,seamsHash:manifest.seamsHash};
 return {staticProducerDataVerified:true,manifest:JSON.parse(JSON.stringify(manifest)),manifestHash:hash(JSON.stringify(manifest)),protocolHashes:compiled,ledgerBytes:expected.bodies.find(r=>r.role==='ledger').bytes,nomination:JSON.parse(JSON.stringify(expected.sourceNomination)),bodyCount:expected.bodyOrder.length,sourceCaptureExpectedContext:null,actualSourceExecution:false,finalSourceBinding:false,SourceQualified:false,Task1Pass:false};
}
function n3SourceAdmissionControls(input,expected,vectors,verify,hash,gitBlob){
 return vectors.cases.map(t=>{
  const candidate={bindingsRaw:Buffer.from(input.bindingsRaw),bodies:Object.fromEntries(Object.entries(input.bodies).map(([role,bytes])=>[role,Buffer.from(bytes)]))},m=t.mutation;
  if(m?.removeRole)delete candidate.bodies[m.removeRole];
  if(m?.role&&Object.hasOwn(m,'replaceRaw'))candidate.bodies[m.role]=Buffer.from(m.replaceRaw,'utf8');
  if(m?.coherentlyRebindUntrustedMetadata){const b=JSON.parse(candidate.bindingsRaw.toString('utf8')),row=b.bodies.find(r=>r.role===m.role),v=candidate.bodies[m.role];row.bytes=v.length;row.sha256=hash(v);row.gitBlob=row.blob=gitBlob(v);const manifest=JSON.parse(candidate.bodies.manifest.toString('utf8'));manifest[expected.bodyManifestFields[m.role]]=hash(v);candidate.bodies.manifest=Buffer.from(JSON.stringify(manifest,null,2)+'\n');const mr=b.bodies.find(r=>r.role==='manifest'),mv=candidate.bodies.manifest;mr.bytes=b.manifest.bytes=mv.length;mr.sha256=b.manifest.sha256=hash(mv);mr.blob=mr.gitBlob=b.manifest.blob=b.manifest.gitBlob=gitBlob(mv);mr.canonicalHash=b.manifest.canonicalHash=hash(JSON.stringify(manifest));candidate.bindingsRaw=Buffer.from(JSON.stringify(b,null,2)+'\n');}
  if(m?.bindingsNominationBranch){const b=JSON.parse(candidate.bindingsRaw.toString('utf8'));b.nomination.branch=m.bindingsNominationBranch;candidate.bindingsRaw=Buffer.from(JSON.stringify(b,null,2)+'\n');}
  if(m?.schemaSelectionAt){const s=JSON.parse(candidate.bodies.schema.toString('utf8'));if(m.schemaSelectionAt==='top')s.properties.selectionHash.const=m.selectionHash;else s.properties.journal.properties.witness.properties.records.items.oneOf.find(r=>r.properties?.kind?.const==='binding').properties.selectionHash.const=m.selectionHash;candidate.bodies.schema=Buffer.from(JSON.stringify(s,null,2)+'\n');}
  let accepted=false,reason=null;try{accepted=verify(candidate,expected,hash,gitBlob).staticProducerDataVerified===true;}catch(e){reason=e.message;}
  return {id:t.id,pass:accepted===t.expectedAccepted,accepted,reason};
 });
}
export {n3AdmitKnownSource,n3SourceAdmissionControls};
