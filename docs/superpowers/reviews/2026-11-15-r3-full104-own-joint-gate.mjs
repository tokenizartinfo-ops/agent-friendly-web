function(acceptance,run,jobs,expected){
 const stop=reason=>({accepted:true,controlsQualified:acceptance?.qualified===true,jobQualified:false,reviewEvidenceEligible:false,reason,NativeReleased:false,operationalReadiness:false});
 if(!acceptance||acceptance.accepted!==true||acceptance.qualified!==true||!acceptance.record)return stop("controls_not_qualified");
 const r=acceptance.record;
 if(!expected||r.source!==expected.source||r.sourceTree!==expected.tree||r.run!==String(expected.run)||r.attempt!==1||r.job!==expected.jobName||r.node!=="22.23.4")return stop("report_context_mismatch");
 if(!run||run.id!==expected.run||run.head_sha!==expected.source||run.run_attempt!==1||run.path!==".github/workflows/afw-finite-budget-qualification.yml"||run.event!=="push")return stop("run_binding_mismatch");
 if(run.status!=="completed"||run.conclusion!=="success")return stop("run_not_success");
 if(!Array.isArray(jobs)||jobs.length!==1||jobs[0].id!==expected.jobId||jobs[0].run_id!==expected.run||jobs[0].name!==expected.jobName)return stop("job_binding_mismatch");
 const j=jobs[0];if(j.status!=="completed"||j.conclusion!=="success")return stop("job_not_success");
 if(!Array.isArray(j.steps))return stop("steps_unavailable");
 const selected=j.steps.filter(s=>s.name===expected.stepName);if(selected.length!==1||selected[0].status!=="completed"||selected[0].conclusion!=="success")return stop("controls_step_not_success");
 return {accepted:true,controlsQualified:true,jobQualified:true,reviewEvidenceEligible:true,reason:"controls_and_job_passed",NativeReleased:false,operationalReadiness:false};
}
