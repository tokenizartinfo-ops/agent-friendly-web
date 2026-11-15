function(normal,candidate,normalRaw,candidateRaw){
 const need=(v,m)=>{if(!v)throw Error("Root serial scope: "+m)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),cut="\nimport {jsonFixed} from './io.mjs';\n",retarget="function retargetEntries(t){";
 need(typeof normal==="string"&&typeof candidate==="string"&&normal!==candidate,"changed helper");
 need(normal.split(cut).length===2&&candidate.split(cut).length===2,"unique unchanged remainder");
 const before=normal.split(cut)[0],after=candidate.split(cut)[0];need(normal.split(cut)[1]===candidate.split(cut)[1],"post preparation byte identity");
 need(before.split(retarget).length===2&&after.split(retarget).length===2,"retarget unique");
 const originalPinAndImports=before.split(retarget)[0];need(after.startsWith(originalPinAndImports),"original algorithm/imports byte identity");
 need(candidate.split("\nconst controlDeadline=performance.now()+90000;\n").length===2&&candidate.includes("const admitCase=()=>performance.now()+20000<=controlDeadline;"),"original clock literals");
 need(!/\bawait\b|\bimport\b|\bspawn\b|\bexec\b|\bprocess\b|\beval\b/.test(after.slice(originalPinAndImports.length)),"no new process/async authority in preparation");
 need(eq(Object.keys(normalRaw),Object.keys(candidateRaw)),"raw keys");
 for(const k of Object.keys(normalRaw).filter(k=>k!=="helpers"))need(eq(normalRaw[k],candidateRaw[k]),"raw fixed "+k);
 need(Object.keys(normalRaw.helpers).length===33&&eq(Object.keys(normalRaw.helpers),Object.keys(candidateRaw.helpers)),"33helper closed order");
 let changed=0;for(const k of Object.keys(normalRaw.helpers)){if(k==="controls.mjs"){need(candidateRaw.helpers[k]===candidate&&normalRaw.helpers[k]===normal,"raw helper binding");changed++;}else need(normalRaw.helpers[k]===candidateRaw.helpers[k],"unchanged helper "+k)}
 need(changed===1,"only helper");
 return {scopeAccepted:true,postPreparationUnchanged:true,originalEntryPinUnchanged:true,other32HelpersUnchanged:true,rawMetadataUnchanged:true,clocksUnchanged:true,SourceExecuted:false,qualificationAccepted:false,NativeReleased:false};
}
