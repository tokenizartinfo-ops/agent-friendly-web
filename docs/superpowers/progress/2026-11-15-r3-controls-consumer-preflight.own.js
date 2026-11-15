function(parentBody,proofBody,controlsSchema,matrix,matrixHash){
 const parentCheck=(function(parentBody,controlsSchema,matrix,matrixHash){
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
})(parentBody,controlsSchema,matrix,matrixHash);
 const need=(v,m)=>{if(!v)throw Error("Root controls consumer contract: "+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 need(typeof proofBody==="string","proof body");const lines=proofBody.split("\n"),one=prefix=>{const xs=lines.filter(x=>x.startsWith(prefix));need(xs.length===1,"unique "+prefix);return xs[0];};
 const line=one("const ids="),separator="],mutants=",at=line.indexOf(separator);need(at>0&&line.endsWith(";"),"proof constants");
 const ids=JSON.parse(line.slice("const ids=".length,at+1)),mutants=JSON.parse(line.slice(at+separator.length,-1));
 const numeric=name=>{const r=new RegExp("r\\."+name+"!==([0-9]+)","g"),all=[...proofBody.matchAll(r)];need(all.length===1,"single "+name);return Number(all[0][1]);};
 const hashes=[...proofBody.matchAll(/r\.matrixSha256!=='([a-f0-9]{64})'/g)];need(hashes.length===1,"single proof hash");
 const mismatches=parentCheck.mismatches.slice();
 if(!eq(ids,matrix.ordered.map(x=>x.id)))mismatches.push("proof_ids_mismatch");
 const select=x=>({id:x.id,expectedFailedIds:x.expectedFailedIds});if(!eq(mutants.map(select),matrix.mutants.map(select)))mismatches.push("proof_mutants_mismatch");
 if(numeric("expected")!==matrix.ordered.length)mismatches.push("proof_expected_count_mismatch");
 if(numeric("passed")!==matrix.ordered.length)mismatches.push("proof_passed_count_mismatch");
 if(hashes[0][1]!==matrixHash)mismatches.push("proof_matrix_hash_mismatch");
 return {accepted:mismatches.length===0,mismatches,expectedCount:matrix.ordered.length,parentEmbeddedCount:parentCheck.embeddedCount,proofEmbeddedCount:ids.length,SourceExecuted:false,NativeReleased:false,operationalReadiness:false};
}