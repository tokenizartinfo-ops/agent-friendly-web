function(parentBody,controlsSchema,matrix,matrixHash){
 const need=(v,m)=>{if(!v)throw Error("Root embedded controls contract: "+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 need(typeof parentBody==="string"&&typeof controlsSchema==="object"&&Array.isArray(matrix?.ordered)&&Array.isArray(matrix?.mutants),"inputs");
 need(/^[a-f0-9]{64}$/.test(matrixHash),"hash");
 const lines=parentBody.split("\n"),one=prefix=>{const all=lines.filter(x=>x.startsWith(prefix));need(all.length===1,"unique "+prefix);return all[0];};
 const schemaLine=one(" schema=json.loads(");need(schemaLine.endsWith(")"),"schema suffix");const embedded=JSON.parse(JSON.parse(schemaLine.slice(" schema=json.loads(".length,-1)));
 const ids=JSON.parse(one(" ids=").slice(" ids=".length)),mutants=JSON.parse(one(" mutants=").slice(" mutants=".length));
 const hashLine=one(" need(r['matrixSha256']=='");need(hashLine.endsWith("')"),"hash suffix");const hash=hashLine.slice(" need(r['matrixSha256']=='".length,-2);
 const mismatches=[];if(!eq(embedded,controlsSchema))mismatches.push("embedded_schema_mismatch");
 if(!eq(ids,matrix.ordered.map(x=>x.id)))mismatches.push("embedded_ids_mismatch");
 if(!eq(mutants,matrix.mutants.map(x=>({id:x.id,expectedFailedIds:x.expectedFailedIds}))))mismatches.push("embedded_mutants_mismatch");
 if(hash!==matrixHash)mismatches.push("embedded_matrix_hash_mismatch");
 return {accepted:mismatches.length===0,mismatches,expectedCount:matrix.ordered.length,embeddedCount:ids.length,SourceExecuted:false,NativeReleased:false,operationalReadiness:false};
}