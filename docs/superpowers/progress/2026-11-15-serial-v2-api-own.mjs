// Independent Root API join only; Source record validation is a separate conjunction.
export default function(context,api,expected){
 const need=(v,m)=>{if(!v)throw Error("Root serial-v2 API: "+m);};
 need(expected&&/^[a-f0-9]{40}$/.test(expected.source)&&/^[a-f0-9]{40}$/.test(expected.tree)&&/^[a-f0-9]{40}$/.test(expected.parent),"expected_source");
 need(Number.isSafeInteger(expected.run)&&expected.run>0&&Number.isSafeInteger(expected.jobId)&&expected.jobId>0,"expected_ids");
 need(expected.jobName==="readonly"&&expected.fullStepName==="Run declared full104 controls only","expected_roles");
 need(Array.isArray(expected.preflightStepNames)&&expected.preflightStepNames.length===3&&new Set(expected.preflightStepNames).size===3&&expected.preflightStepNames.every(x=>typeof x==="string"&&x.length>0&&x!==expected.fullStepName),"expected_preflights");
 for(const [key,value] of Object.entries({source:expected.source,sourceTree:expected.tree,run:String(expected.run),attempt:1,job:"readonly",node:"22.23.4"}))need(context?.[key]===value,"context_"+key);
 const {commit,run,jobs,frame}=api||{};
 need(commit?.sha===expected.source&&commit.tree?.sha===expected.tree&&Array.isArray(commit.parents)&&commit.parents.length===1&&commit.parents[0].sha===expected.parent,"commit_binding");
 need(run?.id===expected.run&&run.head_sha===expected.source&&run.run_attempt===1&&run.event==="push"&&run.path===".github/workflows/afw-finite-budget-qualification.yml"&&run.head_branch==="feat/finite-native-cleanup-20261101","run_binding");
 need(run.status==="completed"&&run.conclusion==="success","run_status");
 need(jobs?.total_count===1&&Array.isArray(jobs.jobs)&&jobs.jobs.length===1,"job_count");
 const job=jobs.jobs[0];need(job.id===expected.jobId&&job.run_id===expected.run&&job.name==="readonly"&&job.status==="completed"&&job.conclusion==="success","job_binding");
 need(Array.isArray(job.steps)&&new Set(job.steps.map(x=>x.number)).size===job.steps.length,"steps");
 const setupNames=["Run actions/checkout@11d5960a326750d5838078e36cf38b85af677262","Run actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020"];
 const setup=setupNames.map(name=>{const found=job.steps.filter(x=>x.name===name);need(found.length===1&&found[0].status==="completed"&&found[0].conclusion==="success","setup_step");return found[0];});
 need(setup[0].number<setup[1].number,"setup_order");
 const selected=[];
 for(const name of [...expected.preflightStepNames,expected.fullStepName]){
  const hits=job.steps.filter(x=>x.name===name);need(hits.length===1&&hits[0].status==="completed"&&hits[0].conclusion==="success"&&Number.isSafeInteger(hits[0].number),"required_step");selected.push(hits[0]);
 }
 need(setup[1].number<selected[0].number&&selected.every((x,i)=>i===0||selected[i-1].number<x.number),"step_order");
 const full=selected.at(-1);
 need(frame?.marker==="AFW_Q1_SERIAL_LAB/2"&&frame.count===1&&frame.unavailableCount===0&&frame.legacySuccessCount===0&&frame.stepName===full.name&&frame.stepNumber===full.number&&frame.mappedByRunHeader===true,"frame_binding");
 return {apiJoined:true,source:expected.source,tree:expected.tree,run:expected.run,jobId:expected.jobId,step:full.number,NativeReleased:false,operationalReadiness:false};
};
