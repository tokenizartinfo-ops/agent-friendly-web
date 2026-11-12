# Inspector fix2 scoped re-review and proposed sequencing discriminator

Baselinehelpers59bb67d6/WFf256 -> executed82cb1cf5/WFfcd20785. FULLvalidatedU10workflowdiff below was checked against complete before/after bodies, allhunks/gaps/tails. ActualSource now safea51/F7; correctedCOMPLETEactualinspector remains unreconciled (draftblob9994894916158e92665f780a30513015d8489273 preservedbywriter, notactivated). Fullappend-onlyreport844..a51 included. [Primary evidence](2026-11-12-native-inspector-metadata404-primary.md).

Same reviewer: assess current observationalfix2/91actualfixtures/actualHTTP404 evidence; I6remainsintegrationOPEN, I5/M1previouslyaddressed, M2deferred. Review firstpredicate diagnostic and onlynewbreakage. Then assess following Rootproposal ONLY before anyimplementationrelease.

## Root proposed next discriminator — TWO finite jobs, no validation weakening

PROPOSAL ONLY; no Source mutation/run release. Keep current91 testedhelpers, byte-exactvalidation/closeddiagnostic and no key/data/SDK/I0. Separate safe-control production/upload (<=2min) from a dependent keyless metadata+download+strictinventory verifier (<=2min), after the producerjobis terminal. Exactlyone attempt/twojobs, no retry/poll/sleep/fallback/alternateAPI. Verifier receives only assignedID+uploadDigest+fixedcoveredCoreHash from producer job outputs, requires successfulproducer and currentrun/source/ref/attempt; same oneGET to singularartifactmetadata with65536Bstreamcap/15sdeadline/fullidentity+exactdigest gate, then exactIDsafe download andfullinventory. Expectedcorehash fixed by currentSource77,002B/d514b190 and rechecked; do nottrust the payload's own claimedhash alone. Preserve single<=2048B closed diagnostic. No duplicateNativeexecution.

This tests a supported producer/verifier boundary already used for original nativeproducerartifacts; it does not establish why immediate metadata returned404. Failedattempt=>exactF7restore+proof0activeSTOP. Passingcrossjobcontrols=>COMPLETEamendedactualinspector INACTIVE with <=5mininspection/producer and <=2minkeylessverifier (newplanlimit requires Root explicitamendment); key only firstjob, verifierpublicsafeDTO only. Both manual/noinputs/noPush/falseguards and fulldrivers/publisher/verifier present; currenthelperbytes+caseIDs preserved and reviewedbeforeANYprivateinspection. Rootseparateactualrelease stillneeded. M2deferred. Assess whether this bounded sequencing discriminator preserves originalartifact/data/publication/identity/failure invariants and whether a narrower supported option is necessary; do not write code or invoke anything.

## Complete validated workflow U10 delta

```diff
diff --git a/.github/workflows/afw-finite-budget-qualification.yml b/.github/workflows/afw-finite-budget-qualification.yml
# before_blob=f256276628fb624a74f648b4a8cb69dfac1d3e4f after_blob=fcd20785d8a6e9233d3a4949560550220435d172
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -239,43 +239,81 @@
            validateCountProjection(v.businessCounts);fields(v.tap,['status','recordedCaseCount','fileWrapper','summary','reason']);need(['not_examined','present','missing','rejected','oversize'].includes(v.tap.status)&&num(v.tap.recordedCaseCount,3),'public_tap');fields(v.tap.fileWrapper,['status','durationMs']);need(['unknown','pass','fail'].includes(v.tap.fileWrapper.status)&&(v.tap.fileWrapper.durationMs===null||duration(v.tap.fileWrapper.durationMs)),'public_tap');validateCountProjection(v.tap.summary);need(REASONS.includes(v.tap.reason),'public_reason');
            fields(v.timings,['downloadMs','openMs','parseCleanupMs']);for(const x of Object.values(v.timings))need(x===null||num(x,300000),'public_duration');
            if(v.failure!==null){fields(v.failure,['reason','type']);need(REASONS.includes(v.failure.reason)&&['rejected','timeout','io','program','crypto'].includes(v.failure.type),'public_reason');}
            for(const[k,x]of Object.entries(FLAGS))need(v[k]===x,'public_flag');const ready=v.artifact.verified===true&&v.authentication.authenticated===true&&v.authentication.innerInventoryVerified===true&&v.failureIdentity.verified===true;
            if(!ready){
             need(v.failureIdentity.verified===false&&v.failureIdentity.commandSucceeded===null&&v.failureIdentity.elapsedMs===null&&v.authentication.fileCount===null&&v.authentication.totalBytes===null,'public_partial_auth');
             const empty=baseResult();assert.deepEqual(v.cases,empty.cases);assert.deepEqual(v.businessCounts,empty.businessCounts);assert.deepEqual(v.tap,empty.tap);
            }else need(num(v.authentication.fileCount,LIMIT.files)&&v.authentication.fileCount>=1&&num(v.authentication.totalBytes,LIMIT.native)&&v.authentication.totalBytes>=1,'public_auth');
            need(Buffer.byteLength(JSON.stringify(v))<=LIMIT.result,'public_bound');return v;
           }
-          const REASONS=['none','metadata_digest','metadata_identity','metadata_bound','fixtures_failed','scope','source_pin','program_unavailable','state_missing','download_failed','download_timeout','download_bound','download_digest','download_redirect','download_status','zip_bound','zip_eocd','zip_entries','zip_directory','zip_central','zip_flags','zip_central_range','zip_paths','zip_link','zip_entry_bound','zip_extra','zip_local','zip_local_identity','zip_local_name','zip_local_sizes','zip_data_range','zip_descriptor','zip_ranges','zip_inflate','zip_crc','opening_failed','opening_timeout','identity_rejected','json_shape','json_fields','json_identity','json_enum','json_fact','json_counts','tap_missing','tap_bound','tap_line_bound','tap_block_bound','tap_location_ambiguous','tap_candidate_bound','tap_field_bound','tap_duplicate_field','tap_orphan_diag','tap_diag_indent','tap_diag_field','tap_duplicate_case','tap_record_collision','tap_ambiguous_case','tap_duplicate_wrapper','tap_nested_case','tap_counts_ambiguous','tap_truncated_diag','tap_utf8','parse_failed','parse_timeout','cleanup_failed','cleanup_timeout','temp_path','io'];
+          const REASONS=['none','metadata_diagnostic','metadata_digest','metadata_identity','metadata_bound','fixtures_failed','scope','source_pin','program_unavailable','state_missing','download_failed','download_timeout','download_bound','download_digest','download_redirect','download_status','zip_bound','zip_eocd','zip_entries','zip_directory','zip_central','zip_flags','zip_central_range','zip_paths','zip_link','zip_entry_bound','zip_extra','zip_local','zip_local_identity','zip_local_name','zip_local_sizes','zip_data_range','zip_descriptor','zip_ranges','zip_inflate','zip_crc','opening_failed','opening_timeout','identity_rejected','json_shape','json_fields','json_identity','json_enum','json_fact','json_counts','tap_missing','tap_bound','tap_line_bound','tap_block_bound','tap_location_ambiguous','tap_candidate_bound','tap_field_bound','tap_duplicate_field','tap_orphan_diag','tap_diag_indent','tap_diag_field','tap_duplicate_case','tap_record_collision','tap_ambiguous_case','tap_duplicate_wrapper','tap_nested_case','tap_counts_ambiguous','tap_truncated_diag','tap_utf8','parse_failed','parse_timeout','cleanup_failed','cleanup_timeout','temp_path','io'];
           const reasonOf=e=>e instanceof Rejected&&REASONS.includes(e.reason)?e.reason:'io';
           
           
           function inspectionAccepted(out){
            validatePublic(out);
            return out.status==='inspected'&&out.failure===null&&out.artifact.verified===true&&out.authentication.authenticated===true&&out.authentication.innerInventoryVerified===true&&out.failureIdentity.verified===true&&out.failureIdentity.commandSucceeded===false&&out.phases.fixtures==='passed'&&out.fixtures.checks>=1&&out.phases.download==='verified'&&out.phases.authentication==='authenticated'&&out.phases.identity==='verified'&&out.phases.projection==='projected'&&out.phases.cleanup==='complete'&&num(out.timings.downloadMs,30000)&&num(out.timings.openMs,120000)&&num(out.timings.parseCleanupMs,15000);
           }
-          function uploadDigest(value){
-           need(typeof value==='string','metadata_digest');const digest=value.startsWith('sha256:')?value.slice(7):value;need(/^[a-f0-9]{64}$/.test(digest),'metadata_digest');return digest;
-          }
-          function validateAssignedMetadata(v,id,uploaded){
-           need(typeof id==='string'&&/^[1-9][0-9]*$/.test(id),'metadata_identity');const digest=uploadDigest(uploaded);
-           need(isObj(v)&&String(v.id)===id&&v.name==='afw-readonly-receipt-inspection-'+process.env.GITHUB_RUN_ID+'-1'&&v.expired===false&&Number.isSafeInteger(v.size_in_bytes)&&v.size_in_bytes>0&&v.size_in_bytes<=131072,'metadata_identity');
-           need(typeof v.digest==='string'&&/^sha256:[a-f0-9]{64}$/.test(v.digest)&&v.digest==='sha256:'+digest,'metadata_digest');
-           need(String(v.workflow_run?.id)===process.env.GITHUB_RUN_ID&&v.workflow_run?.head_sha===process.env.GITHUB_SHA&&v.workflow_run?.head_branch==='feat/finite-native-cleanup-20261101','metadata_identity');
-           const created=Date.parse(v.created_at),expires=Date.parse(v.expires_at);need(Number.isFinite(created)&&Number.isFinite(expires)&&expires-created>=6*86400000&&expires-created<=8*86400000,'metadata_identity');return true;
-          }
-          async function readMetadataResponse(response){
-           need(response.status===200&&response.body!==null,'metadata_identity');const parts=[],reader=response.body.getReader();let total=0;
-           try{for(;;){const part=await reader.read();if(part.done)break;total+=part.value.byteLength;need(total<=65536,'metadata_bound');parts.push(Buffer.from(part.value));}}
+          
+          const METADATA_STAGES=['input','request','response','stream','utf8','json','validate','output','complete'];
+          const METADATA_PREDICATES=['none','unknown','assigned_id','upload_digest_type','upload_digest_format','http_status','response_body','stream_cap','utf8_decode','json_decode','metadata_object','artifact_id','artifact_name','artifact_expired','artifact_size','remote_digest_format','digest_equality','workflow_run_id','source_sha','source_branch','retention','output_write'];
+          function metadataFailure(observation,predicate,reason){if(observation&&observation.firstFailedPredicate==='none'){observation.firstFailedPredicate=predicate;observation.reason=reason;}}
+          function metadataCheck(ok,reason,predicate,observation){if(!ok){metadataFailure(observation,predicate,reason);throw new Rejected(reason);}}
+          function uploadDigest(value,observation=null){
+           metadataCheck(typeof value==='string','metadata_digest','upload_digest_type',observation);const digest=value.startsWith('sha256:')?value.slice(7):value;metadataCheck(/^[a-f0-9]{64}$/.test(digest),'metadata_digest','upload_digest_format',observation);return digest;
+          }
+          function validateAssignedMetadata(v,id,uploaded,observation=null){
+           if(observation)observation.stage='validate';
+           metadataCheck(typeof id==='string'&&/^[1-9][0-9]*$/.test(id),'metadata_identity','assigned_id',observation);const digest=uploadDigest(uploaded,observation);
+           metadataCheck(isObj(v),'metadata_identity','metadata_object',observation);
+           metadataCheck(String(v.id)===id,'metadata_identity','artifact_id',observation);
+           metadataCheck(v.name==='afw-readonly-receipt-inspection-'+process.env.GITHUB_RUN_ID+'-1','metadata_identity','artifact_name',observation);
+           metadataCheck(v.expired===false,'metadata_identity','artifact_expired',observation);
+           metadataCheck(Number.isSafeInteger(v.size_in_bytes)&&v.size_in_bytes>0&&v.size_in_bytes<=131072,'metadata_identity','artifact_size',observation);
+           metadataCheck(typeof v.digest==='string'&&/^sha256:[a-f0-9]{64}$/.test(v.digest),'metadata_digest','remote_digest_format',observation);
+           metadataCheck(v.digest==='sha256:'+digest,'metadata_digest','digest_equality',observation);
+           metadataCheck(String(v.workflow_run?.id)===process.env.GITHUB_RUN_ID,'metadata_identity','workflow_run_id',observation);
+           metadataCheck(v.workflow_run?.head_sha===process.env.GITHUB_SHA,'metadata_identity','source_sha',observation);
+           metadataCheck(v.workflow_run?.head_branch==='feat/finite-native-cleanup-20261101','metadata_identity','source_branch',observation);
+           const created=Date.parse(v.created_at),expires=Date.parse(v.expires_at);metadataCheck(Number.isFinite(created)&&Number.isFinite(expires)&&expires-created>=6*86400000&&expires-created<=8*86400000,'metadata_identity','retention',observation);return true;
+          }
+          async function readMetadataResponse(response,observation=null){
+           if(observation)observation.stage='response';const status=response.status;if(observation)observation.httpStatus=Number.isInteger(status)&&status>=100&&status<=599?status:null;
+           metadataCheck(status===200,'metadata_identity','http_status',observation);const body=response.body;metadataCheck(body!==null,'metadata_identity','response_body',observation);
+           if(observation)observation.stage='stream';const parts=[],reader=body.getReader();let total=0;
+           try{for(;;){const part=await reader.read();if(part.done)break;total+=part.value.byteLength;if(observation)observation.receivedBytes=total;metadataCheck(total<=65536,'metadata_bound','stream_cap',observation);parts.push(Buffer.from(part.value));}}
            catch(error){try{await reader.cancel();}catch{}throw error;}
-           return JSON.parse(utf8(Buffer.concat(parts)));
+           if(observation)observation.stage='utf8';let text;try{text=utf8(Buffer.concat(parts));}catch(error){metadataFailure(observation,'utf8_decode','unknown');throw error;}
+           if(observation)observation.stage='json';try{return JSON.parse(text);}catch(error){metadataFailure(observation,'json_decode','unknown');throw error;}
+          }
+          function metadataDiagnostic(id){
+           return {marker:'AFW_METADATA_READBACK/1',source:typeof process.env.GITHUB_SHA==='string'&&/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA)?process.env.GITHUB_SHA:null,run:typeof process.env.GITHUB_RUN_ID==='string'&&/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID)?process.env.GITHUB_RUN_ID:null,attempt:process.env.GITHUB_RUN_ATTEMPT==='1'?1:null,assignedArtifactId:typeof id==='string'&&/^[1-9][0-9]{0,19}$/.test(id)?id:null,stage:'input',firstFailedPredicate:'none',reason:'none',httpStatus:null,receivedBytes:0,timeoutObserved:null,verified:false};
+          }
+          function validateMetadataDiagnostic(v){
+           const keys=['marker','source','run','attempt','assignedArtifactId','stage','firstFailedPredicate','reason','httpStatus','receivedBytes','timeoutObserved','verified'];metadataCheck(isObj(v)&&Object.keys(v).length===keys.length&&Object.keys(v).every(k=>keys.includes(k)),'metadata_diagnostic','unknown',null);
+           const optional=(x,pattern)=>x===null||(typeof x==='string'&&pattern.test(x));
+           metadataCheck(v.marker==='AFW_METADATA_READBACK/1'&&optional(v.source,/^[a-f0-9]{40}$/)&&optional(v.run,/^[1-9][0-9]{0,19}$/)&&(v.attempt===null||v.attempt===1)&&optional(v.assignedArtifactId,/^[1-9][0-9]{0,19}$/),'metadata_diagnostic','unknown',null);
+           metadataCheck(METADATA_STAGES.includes(v.stage)&&METADATA_PREDICATES.includes(v.firstFailedPredicate)&&['none','unknown','metadata_identity','metadata_digest','metadata_bound'].includes(v.reason)&&(v.httpStatus===null||Number.isInteger(v.httpStatus)&&v.httpStatus>=100&&v.httpStatus<=599)&&num(v.receivedBytes,4295032832)&&(v.timeoutObserved===null||bool(v.timeoutObserved))&&bool(v.verified),'metadata_diagnostic','unknown',null);
+           metadataCheck(v.verified?v.stage==='complete'&&v.firstFailedPredicate==='none'&&v.reason==='none':v.firstFailedPredicate!=='none'&&v.reason!=='none','metadata_diagnostic','unknown',null);return v;
+          }
+          function encodeMetadataDiagnostic(v){const line=JSON.stringify(v);metadataCheck(Buffer.byteLength(line)<=2048,'metadata_diagnostic','unknown',null);validateMetadataDiagnostic(v);return line;}
+          async function runMetadataReadback(id,uploaded,request,writeVerified,emitDiagnostic,signal){
+           const observation=metadataDiagnostic(id);let primary=null,diagnosticError=null;
+           try{
+            metadataCheck(typeof id==='string'&&/^[1-9][0-9]*$/.test(id),'metadata_identity','assigned_id',observation);uploadDigest(uploaded,observation);
+            observation.stage='request';const response=await request();const value=await readMetadataResponse(response,observation);validateAssignedMetadata(value,id,uploaded,observation);
+            observation.stage='output';try{await writeVerified();}catch(error){metadataFailure(observation,'output_write','unknown');throw error;}observation.verified=true;observation.stage='complete';
+           }catch(error){primary=error;metadataFailure(observation,'unknown','unknown');}
+           try{observation.timeoutObserved=typeof signal?.aborted==='boolean'?signal.aborted:null;}catch{}
+           try{await emitDiagnostic(encodeMetadataDiagnostic(observation));}catch(error){diagnosticError=error;}
+           if(primary!==null)throw primary;if(diagnosticError!==null)throw diagnosticError;return observation;
           }
           
           const programPath=()=>join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-current.mjs');
           const statePath=()=>join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-state.json');
           const projectedPath=()=>join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-projected.json');
           const safePath=()=>join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-safe.json');
           const projectErrorPath=()=>join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-project-error.json');
           const cleanupPath=()=>join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-cleanup.json');
           function scope(){need(process.env.GITHUB_REPOSITORY===ORIGINAL.repository&&process.env.GITHUB_REF===ORIGINAL.ref&&process.env.GITHUB_RUN_ATTEMPT==='1'&&/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')&&/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')&&process.versions.node==='22.23.4','scope');}
           function noKey(){need(!Object.hasOwn(process.env,'AFW_SYN_CHECKPOINT_KEY'),'scope');}
@@ -358,21 +396,21 @@
            out.timings.parseCleanupMs=elapsed(started);if(out.timings.parseCleanupMs>15000){out.status='rejected';out.failure={reason:'parse_timeout',type:'timeout'};}validatePublic(out);await writeFile(safePath(),JSON.stringify(out),{flag:'wx',mode:0o600});
           }
           export async function publishResult(){
            scope();noKey();let out;try{out=JSON.parse(utf8(await readBound(safePath(),LIMIT.result)));validatePublic(out);}catch{out=baseResult();out.failure={reason:'program_unavailable',type:'program'};validatePublic(out);}
            const dest=join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-public');await mkdir(dest,{mode:0o700});need((await readdir(dest)).length===0,'public_bound');const bytes=Buffer.from(JSON.stringify(out,null,2));need(bytes.length<=LIMIT.result,'public_bound');await writeFile(join(dest,'result.json'),bytes,{flag:'wx',mode:0o600});const manifest={purpose:'afw.readonly-receipt-inspection-manifest.safe.v1',inspectorSource:process.env.GITHUB_SHA,inspectorRun:process.env.GITHUB_RUN_ID,attempt:1,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]};await writeFile(join(dest,'manifest.json'),JSON.stringify(manifest,null,2),{flag:'wx',mode:0o600});
            const valid=inspectionAccepted(out);await writeFile(process.env.GITHUB_OUTPUT,'inspection-valid='+valid+'\n',{flag:'a'});return out;
           }
           
           
           const FIXTURE_PROGRESS={completed:0,current:null};
-          const FIXTURE_IDS=Object.freeze(["zip_valid","zip_signed_descriptor","zip_extra","zip_traversal","zip_duplicate","zip_bad_crc","zip_link","zip_bad_range","failure_identity_valid","failure_identity_success_reject","failure_identity_role_reject","failure_identity_kind_reject","failure_identity_unknown_reject","ownership_valid","ownership_unknown_reject","ownership_enum_reject","optional_missing_unknown","full_result_valid","full_result_unknown_reject","tap_valid_canaries","tap_unknown_scalar","tap_duplicate_case","tap_case_number_collision","tap_wrapper_number_collision","tap_unknown_number_collision","tap_late_diag_comment","tap_late_diag_unrelated","tap_injected_name","tap_long_line","tap_long_block","public_authenticated_valid","gate_artifact_count","gate_artifact_actual","gate_artifact_candidate","gate_artifact_duration","gate_artifact_business","gate_authenticated_count","gate_authenticated_actual","gate_authenticated_candidate","gate_authenticated_duration","gate_authenticated_business","gate_inventory_count","gate_inventory_actual","gate_inventory_candidate","gate_inventory_duration","gate_inventory_business","gate_identity_count","gate_identity_actual","gate_identity_candidate","gate_identity_duration","gate_identity_business","scalar_boolean_wrong","scalar_false_null_wrong","scalar_array_hash_wrong","scalar_half_hash_wrong","scalar_boolean_valid","scalar_null_valid","scalar_integer_valid","scalar_typed_valid","verdict_accepted","verdict_parse_timeout_old_current","verdict_other_failure","verdict_rejected_status","verdict_partial_status","verdict_missing_clock","verdict_open_over_deadline","verdict_download_over_deadline","digest_match_bare","digest_match_prefixed","digest_mismatch_old_current","digest_upload_malformed","digest_remote_malformed","metadata_wrong_id","metadata_wrong_context","metadata_stream_valid","metadata_stream_overcap"]);
+          const FIXTURE_IDS=Object.freeze(["zip_valid","zip_signed_descriptor","zip_extra","zip_traversal","zip_duplicate","zip_bad_crc","zip_link","zip_bad_range","failure_identity_valid","failure_identity_success_reject","failure_identity_role_reject","failure_identity_kind_reject","failure_identity_unknown_reject","ownership_valid","ownership_unknown_reject","ownership_enum_reject","optional_missing_unknown","full_result_valid","full_result_unknown_reject","tap_valid_canaries","tap_unknown_scalar","tap_duplicate_case","tap_case_number_collision","tap_wrapper_number_collision","tap_unknown_number_collision","tap_late_diag_comment","tap_late_diag_unrelated","tap_injected_name","tap_long_line","tap_long_block","public_authenticated_valid","gate_artifact_count","gate_artifact_actual","gate_artifact_candidate","gate_artifact_duration","gate_artifact_business","gate_authenticated_count","gate_authenticated_actual","gate_authenticated_candidate","gate_authenticated_duration","gate_authenticated_business","gate_inventory_count","gate_inventory_actual","gate_inventory_candidate","gate_inventory_duration","gate_inventory_business","gate_identity_count","gate_identity_actual","gate_identity_candidate","gate_identity_duration","gate_identity_business","scalar_boolean_wrong","scalar_false_null_wrong","scalar_array_hash_wrong","scalar_half_hash_wrong","scalar_boolean_valid","scalar_null_valid","scalar_integer_valid","scalar_typed_valid","verdict_accepted","verdict_parse_timeout_old_current","verdict_other_failure","verdict_rejected_status","verdict_partial_status","verdict_missing_clock","verdict_open_over_deadline","verdict_download_over_deadline","digest_match_bare","digest_match_prefixed","digest_mismatch_old_current","digest_upload_malformed","digest_remote_malformed","metadata_wrong_id","metadata_wrong_context","metadata_stream_valid","metadata_stream_overcap","diagnostic_http_rejected","diagnostic_json_malformed","diagnostic_stream_overcap","diagnostic_identity_first_field","diagnostic_digest_mismatch","diagnostic_success_output","diagnostic_unknown_request_error","diagnostic_observed_timeout","diagnostic_schema_extra_field","diagnostic_schema_arbitrary_enum","diagnostic_record_over_2048","diagnostic_primary_first_failure_preserved","diagnostic_output_write_error","diagnostic_utf8_malformed","diagnostic_input_id_rejected"]);
           
           // Exact original predicate expressions from FIX_BASE954 workflow97b37fec; inert controls only.
           function original954Verdict(out){return out.artifact.verified&&out.authentication.authenticated&&out.authentication.innerInventoryVerified&&out.failureIdentity.verified&&out.phases.cleanup==='complete'&&out.phases.projection==='projected';}
           function original954DigestFormat(v){return typeof v.digest==='string'&&/^sha256:[a-f0-9]{64}$/.test(v.digest);}
           
           function fixtureZip(names=NAMES,descriptor=false){
            const locals=[],centrals=[];let offset=0;
            for(const name of names){
             const n=Buffer.from(name),data=Buffer.from('inert-'+name),crc=crc32(data),local=Buffer.alloc(30);
             local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(descriptor?8:0,6);if(!descriptor){local.writeUInt32LE(crc,14);local.writeUInt32LE(data.length,18);local.writeUInt32LE(data.length,22);}local.writeUInt16LE(n.length,26);
@@ -445,20 +483,42 @@
            const digest='a'.repeat(64),metadata={id:123,name:'afw-readonly-receipt-inspection-'+process.env.GITHUB_RUN_ID+'-1',expired:false,size_in_bytes:1024,digest:'sha256:'+digest,workflow_run:{id:Number(process.env.GITHUB_RUN_ID),head_sha:process.env.GITHUB_SHA,head_branch:'feat/finite-native-cleanup-20261101'},created_at:'2026-11-12T00:00:00Z',expires_at:'2026-11-19T00:00:00Z'};
            check(()=>assert.equal(validateAssignedMetadata(metadata,'123',digest),true));
            check(()=>assert.equal(validateAssignedMetadata(metadata,'123','sha256:'+digest),true));
            check(()=>{const v={...metadata,digest:'sha256:'+'b'.repeat(64)};assert.equal(original954DigestFormat(v),true);reject(()=>validateAssignedMetadata(v,'123',digest),'metadata_digest');});
            check(()=>reject(()=>validateAssignedMetadata(metadata,'123',['a'.repeat(64)]),'metadata_digest'));
            check(()=>reject(()=>validateAssignedMetadata({...metadata,digest:digest},'123',digest),'metadata_digest'));
            check(()=>reject(()=>validateAssignedMetadata(metadata,'124',digest),'metadata_identity'));
            check(()=>reject(()=>validateAssignedMetadata({...metadata,workflow_run:{...metadata.workflow_run,head_sha:'b'.repeat(40)}},'123',digest),'metadata_identity'));
            await checkAsync(async()=>{const body=Buffer.from(JSON.stringify(metadata)),response=new Response(new ReadableStream({start(controller){controller.enqueue(body.subarray(0,32));controller.enqueue(body.subarray(32));controller.close();}}));assert.equal(validateAssignedMetadata(await readMetadataResponse(response),'123',digest),true);});
            await checkAsync(async()=>{let canceled=false,read=0;const response=new Response(new ReadableStream({pull(controller){read++;if(read===1)controller.enqueue(new Uint8Array(32768));else if(read===2)controller.enqueue(new Uint8Array(32769));else return new Promise(()=>{});},cancel(){canceled=true;}}));await assert.rejects(()=>readMetadataResponse(response),e=>e instanceof Rejected&&e.reason==='metadata_bound');assert.equal(canceled,true);});
+           
+           const observe=async(response,options={})=>{
+            const lines=[];let error=null,requests=0,writes=0;const signal=options.signal??new AbortController().signal;
+            try{await runMetadataReadback(options.id??'123',options.uploaded??digest,async()=>{requests++;if(options.requestError)throw options.requestError;return response;},async()=>{writes++;if(options.outputError)throw options.outputError;},async line=>{lines.push(line);if(options.reportingError)throw options.reportingError;},signal);}catch(caught){error=caught;}
+            assert.equal(lines.length,1);assert(Buffer.byteLength(lines[0])<=2048);const diagnostic=validateMetadataDiagnostic(JSON.parse(lines[0]));assert(!/SECRET_CANARY|PRIVATE_SOURCE_CANARY|PRIVATE_STACK_CANARY/.test(lines[0]));return {diagnostic,error,requests,writes};
+           };
+           await checkAsync(async()=>{const r=await observe(new Response('SECRET_CANARY',{status:403}));assert.equal(r.diagnostic.stage,'response');assert.equal(r.diagnostic.firstFailedPredicate,'http_status');assert.equal(r.diagnostic.httpStatus,403);assert.equal(r.diagnostic.receivedBytes,0);assert.equal(r.diagnostic.verified,false);assert.equal(r.error.reason,'metadata_identity');});
+           await checkAsync(async()=>{const r=await observe(new Response('{'));assert.equal(r.diagnostic.stage,'json');assert.equal(r.diagnostic.firstFailedPredicate,'json_decode');assert.equal(r.diagnostic.httpStatus,200);assert.equal(r.diagnostic.receivedBytes,1);assert(r.error instanceof SyntaxError);});
+           await checkAsync(async()=>{const r=await observe(new Response(new Uint8Array(65537)));assert.equal(r.diagnostic.stage,'stream');assert.equal(r.diagnostic.firstFailedPredicate,'stream_cap');assert.equal(r.diagnostic.receivedBytes,65537);assert.equal(r.error.reason,'metadata_bound');});
+           await checkAsync(async()=>{const r=await observe(new Response(JSON.stringify({...metadata,name:'SECRET_CANARY'})));assert.equal(r.diagnostic.firstFailedPredicate,'artifact_name');assert.equal(r.diagnostic.reason,'metadata_identity');assert.equal(r.writes,0);});
+           await checkAsync(async()=>{const r=await observe(new Response(JSON.stringify({...metadata,digest:'sha256:'+'b'.repeat(64)})));assert.equal(r.diagnostic.firstFailedPredicate,'digest_equality');assert.equal(r.error.reason,'metadata_digest');});
+           await checkAsync(async()=>{const r=await observe(new Response(JSON.stringify(metadata)));assert.equal(r.error,null);assert.equal(r.requests,1);assert.equal(r.writes,1);assert.equal(r.diagnostic.stage,'complete');assert.equal(r.diagnostic.firstFailedPredicate,'none');assert.equal(r.diagnostic.reason,'none');assert.equal(r.diagnostic.httpStatus,200);assert.equal(r.diagnostic.timeoutObserved,false);assert.equal(r.diagnostic.verified,true);});
+           await checkAsync(async()=>{const primary=new Error('PRIVATE_SOURCE_CANARY'),r=await observe(null,{requestError:primary});assert.equal(r.error,primary);assert.equal(r.diagnostic.stage,'request');assert.equal(r.diagnostic.firstFailedPredicate,'unknown');assert.equal(r.diagnostic.reason,'unknown');assert.equal(r.diagnostic.httpStatus,null);assert.equal(r.diagnostic.timeoutObserved,false);});
+           await checkAsync(async()=>{const controller=new AbortController(),primary=new Error('SECRET_CANARY');controller.abort();const r=await observe(null,{requestError:primary,signal:controller.signal});assert.equal(r.error,primary);assert.equal(r.diagnostic.timeoutObserved,true);assert.equal(r.diagnostic.httpStatus,null);assert.equal(r.diagnostic.firstFailedPredicate,'unknown');});
+           check(()=>{const d={...metadataDiagnostic('123'),stage:'complete',verified:true,extra:'SECRET_CANARY'};reject(()=>encodeMetadataDiagnostic(d),'metadata_diagnostic');});
+           check(()=>{const d={...metadataDiagnostic('123'),stage:'SECRET_CANARY',firstFailedPredicate:'unknown',reason:'unknown'};reject(()=>encodeMetadataDiagnostic(d),'metadata_diagnostic');});
+           check(()=>{const d={...metadataDiagnostic('123'),source:'x'.repeat(2049),firstFailedPredicate:'unknown',reason:'unknown'};reject(()=>encodeMetadataDiagnostic(d),'metadata_diagnostic');});
+           await checkAsync(async()=>{const reporting=new Error('PRIVATE_STACK_CANARY'),r=await observe(new Response(JSON.stringify({...metadata,name:'SECRET_CANARY',digest:'sha256:'+'b'.repeat(64)})),{reportingError:reporting});assert.notEqual(r.error,reporting);assert.equal(r.error.reason,'metadata_identity');assert.equal(r.diagnostic.firstFailedPredicate,'artifact_name');assert.equal(r.diagnostic.reason,'metadata_identity');});
+           await checkAsync(async()=>{const primary=new Error('SECRET_CANARY'),r=await observe(new Response(JSON.stringify(metadata)),{outputError:primary});assert.equal(r.error,primary);assert.equal(r.diagnostic.stage,'output');assert.equal(r.diagnostic.firstFailedPredicate,'output_write');assert.equal(r.diagnostic.verified,false);assert.equal(r.writes,1);});
+           await checkAsync(async()=>{const r=await observe(new Response(Buffer.from([0xc3,0x28])));assert.equal(r.diagnostic.stage,'utf8');assert.equal(r.diagnostic.firstFailedPredicate,'utf8_decode');assert.equal(r.diagnostic.receivedBytes,2);assert.equal(r.diagnostic.reason,'unknown');assert(r.error instanceof TypeError);});
+           await checkAsync(async()=>{const r=await observe(null,{id:'SECRET_CANARY'});assert.equal(r.requests,0);assert.equal(r.diagnostic.assignedArtifactId,null);assert.equal(r.diagnostic.firstFailedPredicate,'assigned_id');assert.equal(r.diagnostic.stage,'input');});
+          
            need(checks===FIXTURE_IDS.length,'fixtures_failed');return checks;
           
           }
           
           
           async function controlsMode(){
            scope();noKey();const started=performance.now();let passed=false,failure=null;
            try{const bounds=await sourceBounds();await runFixtures(bounds);passed=true;}
            catch(error){const descriptor=Object.getOwnPropertyDescriptor(error,'message'),value=descriptor&&Object.hasOwn(descriptor,'value')&&typeof descriptor.value==='string'?Buffer.from(descriptor.value):null;failure={reason:'controls_failed',control:FIXTURE_IDS.includes(FIXTURE_PROGRESS.current)?FIXTURE_PROGRESS.current:'setup',messageBytes:value?.length??null,messageSha256:value?sha(value):null};}
            const body={purpose:'afw.readonly-receipt-inspector.CONTROLS.safe.v1',repository:ORIGINAL.repository,ref:ORIGINAL.ref,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,node:'22.23.4',status:passed?'passed':'failed',expected:FIXTURE_IDS.length,completed:FIXTURE_PROGRESS.completed,passed:FIXTURE_PROGRESS.completed,failed:passed||FIXTURE_PROGRESS.current===null?0:1,inventory:FIXTURE_IDS.map((id,n)=>({id,status:n<FIXTURE_PROGRESS.completed?'passed':n===FIXTURE_PROGRESS.completed&&!passed&&FIXTURE_PROGRESS.current!==null?'failed':'not_executed'})),coveredCoreSha256:sha(await readBound(programPath(),256*1024)),elapsedMs:elapsed(started),failure,original954:{workflowBlob:'97b37fec44696dde23daa013196a5acdb05c2f4d',verdictCounterexample:FIXTURE_PROGRESS.completed>FIXTURE_IDS.indexOf('verdict_parse_timeout_old_current')?'executed_inert':'not_executed',digestCounterexample:FIXTURE_PROGRESS.completed>FIXTURE_IDS.indexOf('digest_mismatch_old_current')?'executed_inert':'not_executed'},originalArtifactAccessed:false,custodyOpened:false,SDKImported:false,I0Created:false,...FLAGS};
@@ -470,36 +530,36 @@
           async function main(){
            scope();const mode=process.argv[2];if(mode==='controls')await controlsMode();else if(mode==='fixtures')await fixtureMode();else if(mode==='download')await downloadMode();else if(mode==='open')await openingMode();else if(mode==='open-child')await openChildMode();else if(mode==='project')await projectionMode();else if(mode==='project-child')await projectChildMode();else if(mode==='cleanup-child')await cleanupChildMode();else throw new Rejected('scope');
           }
           if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)main().catch(async error=>{if(process.argv[2]==='project-child')try{await writeFile(projectErrorPath(),JSON.stringify({reason:error instanceof Rejected&&REASONS.includes(error.reason)?error.reason:'parse_failed'}),{flag:'wx',mode:0o600});}catch{}process.exitCode=1;});
           NODE_CORE
           cat >"$RUNNER_TEMP/afw-readonly-inspector-controls-fallback.mjs" <<'NODE_FALLBACK'
           
           import {access,readFile,writeFile,mkdir} from 'node:fs/promises';
           import {join,resolve} from 'node:path';
           import {createHash} from 'node:crypto';
-          const ids=["zip_valid","zip_signed_descriptor","zip_extra","zip_traversal","zip_duplicate","zip_bad_crc","zip_link","zip_bad_range","failure_identity_valid","failure_identity_success_reject","failure_identity_role_reject","failure_identity_kind_reject","failure_identity_unknown_reject","ownership_valid","ownership_unknown_reject","ownership_enum_reject","optional_missing_unknown","full_result_valid","full_result_unknown_reject","tap_valid_canaries","tap_unknown_scalar","tap_duplicate_case","tap_case_number_collision","tap_wrapper_number_collision","tap_unknown_number_collision","tap_late_diag_comment","tap_late_diag_unrelated","tap_injected_name","tap_long_line","tap_long_block","public_authenticated_valid","gate_artifact_count","gate_artifact_actual","gate_artifact_candidate","gate_artifact_duration","gate_artifact_business","gate_authenticated_count","gate_authenticated_actual","gate_authenticated_candidate","gate_authenticated_duration","gate_authenticated_business","gate_inventory_count","gate_inventory_actual","gate_inventory_candidate","gate_inventory_duration","gate_inventory_business","gate_identity_count","gate_identity_actual","gate_identity_candidate","gate_identity_duration","gate_identity_business","scalar_boolean_wrong","scalar_false_null_wrong","scalar_array_hash_wrong","scalar_half_hash_wrong","scalar_boolean_valid","scalar_null_valid","scalar_integer_valid","scalar_typed_valid","verdict_accepted","verdict_parse_timeout_old_current","verdict_other_failure","verdict_rejected_status","verdict_partial_status","verdict_missing_clock","verdict_open_over_deadline","verdict_download_over_deadline","digest_match_bare","digest_match_prefixed","digest_mismatch_old_current","digest_upload_malformed","digest_remote_malformed","metadata_wrong_id","metadata_wrong_context","metadata_stream_valid","metadata_stream_overcap"],root=join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-controls-public'),hash=b=>createHash('sha256').update(b).digest('hex');
+          const ids=["zip_valid","zip_signed_descriptor","zip_extra","zip_traversal","zip_duplicate","zip_bad_crc","zip_link","zip_bad_range","failure_identity_valid","failure_identity_success_reject","failure_identity_role_reject","failure_identity_kind_reject","failure_identity_unknown_reject","ownership_valid","ownership_unknown_reject","ownership_enum_reject","optional_missing_unknown","full_result_valid","full_result_unknown_reject","tap_valid_canaries","tap_unknown_scalar","tap_duplicate_case","tap_case_number_collision","tap_wrapper_number_collision","tap_unknown_number_collision","tap_late_diag_comment","tap_late_diag_unrelated","tap_injected_name","tap_long_line","tap_long_block","public_authenticated_valid","gate_artifact_count","gate_artifact_actual","gate_artifact_candidate","gate_artifact_duration","gate_artifact_business","gate_authenticated_count","gate_authenticated_actual","gate_authenticated_candidate","gate_authenticated_duration","gate_authenticated_business","gate_inventory_count","gate_inventory_actual","gate_inventory_candidate","gate_inventory_duration","gate_inventory_business","gate_identity_count","gate_identity_actual","gate_identity_candidate","gate_identity_duration","gate_identity_business","scalar_boolean_wrong","scalar_false_null_wrong","scalar_array_hash_wrong","scalar_half_hash_wrong","scalar_boolean_valid","scalar_null_valid","scalar_integer_valid","scalar_typed_valid","verdict_accepted","verdict_parse_timeout_old_current","verdict_other_failure","verdict_rejected_status","verdict_partial_status","verdict_missing_clock","verdict_open_over_deadline","verdict_download_over_deadline","digest_match_bare","digest_match_prefixed","digest_mismatch_old_current","digest_upload_malformed","digest_remote_malformed","metadata_wrong_id","metadata_wrong_context","metadata_stream_valid","metadata_stream_overcap","diagnostic_http_rejected","diagnostic_json_malformed","diagnostic_stream_overcap","diagnostic_identity_first_field","diagnostic_digest_mismatch","diagnostic_success_output","diagnostic_unknown_request_error","diagnostic_observed_timeout","diagnostic_schema_extra_field","diagnostic_schema_arbitrary_enum","diagnostic_record_over_2048","diagnostic_primary_first_failure_preserved","diagnostic_output_write_error","diagnostic_utf8_malformed","diagnostic_input_id_rejected"],root=join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-controls-public'),hash=b=>createHash('sha256').update(b).digest('hex');
           try{await access(join(root,'result.json'));}
           catch{
            await mkdir(root,{mode:0o700,recursive:true});let core;try{core=await readFile(join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-current.mjs'));}catch{core=Buffer.alloc(0);}
            const result={purpose:'afw.readonly-receipt-inspector.CONTROLS.safe.v1',repository:'tokenizartinfo-ops/agent-friendly-web',ref:'refs/heads/feat/finite-native-cleanup-20261101',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,node:'22.23.4',status:'failed',expected:ids.length,completed:0,passed:0,failed:0,inventory:ids.map(id=>({id,status:'not_executed'})),coveredCoreSha256:hash(core),elapsedMs:0,failure:{reason:'controls_failed',control:'setup',messageBytes:null,messageSha256:null},original954:{workflowBlob:'97b37fec44696dde23daa013196a5acdb05c2f4d',verdictCounterexample:'not_executed',digestCounterexample:'not_executed'},originalArtifactAccessed:false,custodyOpened:false,SDKImported:false,I0Created:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
            const bytes=Buffer.from(JSON.stringify(result,null,2)),manifest=Buffer.from(JSON.stringify({purpose:'afw.readonly-receipt-inspector.CONTROLS.manifest.safe.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,files:[{path:'result.json',bytes:bytes.length,sha256:hash(bytes)}]},null,2));if(bytes.length+manifest.length>65536)throw Error('closed_fallback_bound');
            await writeFile(join(root,'result.json'),bytes,{flag:'wx',mode:0o600});await writeFile(join(root,'manifest.json'),manifest,{flag:'wx',mode:0o600});
           }
           NODE_FALLBACK
           cat >"$RUNNER_TEMP/afw-readonly-inspector-controls-verify.mjs" <<'NODE_VERIFY'
           
           import assert from 'node:assert/strict';
           import {readFile,readdir,lstat,writeFile} from 'node:fs/promises';
           import {join,resolve} from 'node:path';
           import {createHash} from 'node:crypto';
-          const ids=["zip_valid","zip_signed_descriptor","zip_extra","zip_traversal","zip_duplicate","zip_bad_crc","zip_link","zip_bad_range","failure_identity_valid","failure_identity_success_reject","failure_identity_role_reject","failure_identity_kind_reject","failure_identity_unknown_reject","ownership_valid","ownership_unknown_reject","ownership_enum_reject","optional_missing_unknown","full_result_valid","full_result_unknown_reject","tap_valid_canaries","tap_unknown_scalar","tap_duplicate_case","tap_case_number_collision","tap_wrapper_number_collision","tap_unknown_number_collision","tap_late_diag_comment","tap_late_diag_unrelated","tap_injected_name","tap_long_line","tap_long_block","public_authenticated_valid","gate_artifact_count","gate_artifact_actual","gate_artifact_candidate","gate_artifact_duration","gate_artifact_business","gate_authenticated_count","gate_authenticated_actual","gate_authenticated_candidate","gate_authenticated_duration","gate_authenticated_business","gate_inventory_count","gate_inventory_actual","gate_inventory_candidate","gate_inventory_duration","gate_inventory_business","gate_identity_count","gate_identity_actual","gate_identity_candidate","gate_identity_duration","gate_identity_business","scalar_boolean_wrong","scalar_false_null_wrong","scalar_array_hash_wrong","scalar_half_hash_wrong","scalar_boolean_valid","scalar_null_valid","scalar_integer_valid","scalar_typed_valid","verdict_accepted","verdict_parse_timeout_old_current","verdict_other_failure","verdict_rejected_status","verdict_partial_status","verdict_missing_clock","verdict_open_over_deadline","verdict_download_over_deadline","digest_match_bare","digest_match_prefixed","digest_mismatch_old_current","digest_upload_malformed","digest_remote_malformed","metadata_wrong_id","metadata_wrong_context","metadata_stream_valid","metadata_stream_overcap"],hash=b=>createHash('sha256').update(b).digest('hex'),need=x=>{if(!x)throw Error('controls_inventory_rejected');},object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),fields=(v,keys)=>need(object(v)&&Object.keys(v).length===keys.length&&Object.keys(v).every(x=>keys.includes(x)));
+          const ids=["zip_valid","zip_signed_descriptor","zip_extra","zip_traversal","zip_duplicate","zip_bad_crc","zip_link","zip_bad_range","failure_identity_valid","failure_identity_success_reject","failure_identity_role_reject","failure_identity_kind_reject","failure_identity_unknown_reject","ownership_valid","ownership_unknown_reject","ownership_enum_reject","optional_missing_unknown","full_result_valid","full_result_unknown_reject","tap_valid_canaries","tap_unknown_scalar","tap_duplicate_case","tap_case_number_collision","tap_wrapper_number_collision","tap_unknown_number_collision","tap_late_diag_comment","tap_late_diag_unrelated","tap_injected_name","tap_long_line","tap_long_block","public_authenticated_valid","gate_artifact_count","gate_artifact_actual","gate_artifact_candidate","gate_artifact_duration","gate_artifact_business","gate_authenticated_count","gate_authenticated_actual","gate_authenticated_candidate","gate_authenticated_duration","gate_authenticated_business","gate_inventory_count","gate_inventory_actual","gate_inventory_candidate","gate_inventory_duration","gate_inventory_business","gate_identity_count","gate_identity_actual","gate_identity_candidate","gate_identity_duration","gate_identity_business","scalar_boolean_wrong","scalar_false_null_wrong","scalar_array_hash_wrong","scalar_half_hash_wrong","scalar_boolean_valid","scalar_null_valid","scalar_integer_valid","scalar_typed_valid","verdict_accepted","verdict_parse_timeout_old_current","verdict_other_failure","verdict_rejected_status","verdict_partial_status","verdict_missing_clock","verdict_open_over_deadline","verdict_download_over_deadline","digest_match_bare","digest_match_prefixed","digest_mismatch_old_current","digest_upload_malformed","digest_remote_malformed","metadata_wrong_id","metadata_wrong_context","metadata_stream_valid","metadata_stream_overcap","diagnostic_http_rejected","diagnostic_json_malformed","diagnostic_stream_overcap","diagnostic_identity_first_field","diagnostic_digest_mismatch","diagnostic_success_output","diagnostic_unknown_request_error","diagnostic_observed_timeout","diagnostic_schema_extra_field","diagnostic_schema_arbitrary_enum","diagnostic_record_over_2048","diagnostic_primary_first_failure_preserved","diagnostic_output_write_error","diagnostic_utf8_malformed","diagnostic_input_id_rejected"],hash=b=>createHash('sha256').update(b).digest('hex'),need=x=>{if(!x)throw Error('controls_inventory_rejected');},object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),fields=(v,keys)=>need(object(v)&&Object.keys(v).length===keys.length&&Object.keys(v).every(x=>keys.includes(x)));
           async function file(root,name){const p=join(root,name),s=await lstat(p);need(s.isFile()&&!s.isSymbolicLink()&&s.nlink===1&&s.size<=65536);const b=await readFile(p);need(b.length===s.size);return b;}
           try{
            const local=join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-controls-public'),remote=process.argv[2]==='seal'?local:join(resolve(process.env.RUNNER_TEMP),'afw-readonly-inspector-controls-downloaded');
            need(['seal','remote'].includes(process.argv[2]));
            for(const root of [local,remote])assert.deepEqual((await readdir(root)).sort(),['manifest.json','result.json']);
            const bodies={};for(const name of ['result.json','manifest.json']){const a=await file(local,name),b=await file(remote,name);need(a.equals(b));bodies[name]=b;}need(bodies['result.json'].length+bodies['manifest.json'].length<=65536);
            const result=JSON.parse(bodies['result.json']),manifest=JSON.parse(bodies['manifest.json']);
            fields(result,['purpose','repository','ref','source','run','attempt','node','status','expected','completed','passed','failed','inventory','coveredCoreSha256','elapsedMs','failure','original954','originalArtifactAccessed','custodyOpened','SDKImported','I0Created','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified']);
            need(result.purpose==='afw.readonly-receipt-inspector.CONTROLS.safe.v1'&&result.repository==='tokenizartinfo-ops/agent-friendly-web'&&result.ref==='refs/heads/feat/finite-native-cleanup-20261101'&&result.source===process.env.GITHUB_SHA&&result.run===process.env.GITHUB_RUN_ID&&result.attempt===1&&result.node==='22.23.4');
            need(['passed','failed'].includes(result.status)&&result.expected===ids.length&&Number.isInteger(result.completed)&&result.completed>=0&&result.completed<=ids.length&&result.passed===result.completed&&[0,1].includes(result.failed)&&Number.isSafeInteger(result.elapsedMs)&&result.elapsedMs>=0&&result.elapsedMs<=120000);
@@ -508,21 +568,21 @@
            fields(result.original954,['workflowBlob','verdictCounterexample','digestCounterexample']);need(result.original954.workflowBlob==='97b37fec44696dde23daa013196a5acdb05c2f4d'&&['executed_inert','not_executed'].includes(result.original954.verdictCounterexample)&&['executed_inert','not_executed'].includes(result.original954.digestCounterexample));
            for(const key of ['originalArtifactAccessed','custodyOpened','SDKImported','I0Created','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'])need(result[key]===false);
            if(result.failure!==null){fields(result.failure,['reason','control','messageBytes','messageSha256']);need(result.failure.reason==='controls_failed'&&(result.failure.control==='setup'||ids.includes(result.failure.control)));need((result.failure.messageBytes===null&&result.failure.messageSha256===null)||(Number.isSafeInteger(result.failure.messageBytes)&&result.failure.messageBytes>=0&&result.failure.messageBytes<=1048576&&typeof result.failure.messageSha256==='string'&&/^[a-f0-9]{64}$/.test(result.failure.messageSha256)));}
            if(result.status==='passed')need(result.completed===ids.length&&result.failed===0&&result.inventory.every(x=>x.status==='passed')&&result.failure===null&&result.original954.verdictCounterexample==='executed_inert'&&result.original954.digestCounterexample==='executed_inert');
            fields(manifest,['purpose','source','run','attempt','files']);need(manifest.purpose==='afw.readonly-receipt-inspector.CONTROLS.manifest.safe.v1'&&manifest.source===process.env.GITHUB_SHA&&manifest.run===process.env.GITHUB_RUN_ID&&manifest.attempt===1&&Array.isArray(manifest.files)&&manifest.files.length===1);fields(manifest.files[0],['path','bytes','sha256']);need(manifest.files[0].path==='result.json'&&manifest.files[0].bytes===bodies['result.json'].length&&manifest.files[0].sha256===hash(bodies['result.json']));
            await writeFile(process.env.GITHUB_OUTPUT,'inventory-verified=true\ncontrols-passed='+(result.status==='passed')+'\n',{flag:'a'});
            console.log(JSON.stringify({purpose:'CONTROLS_READBACK',expected:result.expected,completed:result.completed,passed:result.passed,failed:result.failed,failure:result.failure,bytes:bodies['result.json'].length,sha256:hash(bodies['result.json']),manifestBytes:bodies['manifest.json'].length,manifestSha256:hash(bodies['manifest.json'])}));
           }catch{process.exitCode=1;}
           NODE_VERIFY
           node --check "$RUNNER_TEMP/afw-readonly-inspector-current.mjs" >"$RUNNER_TEMP/afw-readonly-inspector-controls-syntax.private" 2>&1
-      - name: Execute only the seventy-six fixed inert fixtures
+      - name: Execute only the ninety-one fixed inert fixtures
         id: controls
         shell: bash
         run: |
           set -euo pipefail
           node "$RUNNER_TEMP/afw-readonly-inspector-current.mjs" controls >"$RUNNER_TEMP/afw-readonly-inspector-controls.private" 2>&1
       - name: Preserve strict closed CONTROLS proof on success or failure
         id: seal
         if: ${{ always() }}
         shell: bash
         run: |
@@ -575,46 +635,83 @@
           const isObj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
           const fields=(v,allowed,required=allowed)=>{need(isObj(v),'json_shape');need(Object.keys(v).every(k=>allowed.includes(k))&&required.every(k=>Object.hasOwn(v,k)),'json_fields');};
           const own=(v,k)=>isObj(v)&&Object.hasOwn(v,k)?v[k]:undefined;
           const num=(v,max=1000000)=>Number.isSafeInteger(v)&&v>=0&&v<=max;
           const bool=v=>typeof v==='boolean';
           const duration=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0&&v<=900000;
           const enumValue=(v,values)=>values.includes(v)?v:'unknown';
           const utf8=b=>{const s=new TextDecoder('utf-8',{fatal:true}).decode(b);need(Buffer.from(s).equals(b),'utf8');return s;};
           const elapsed=t=>Math.max(0,Math.round(performance.now()-t));
           
-          function uploadDigest(value){
-           need(typeof value==='string','metadata_digest');const digest=value.startsWith('sha256:')?value.slice(7):value;need(/^[a-f0-9]{64}$/.test(digest),'metadata_digest');return digest;
-          }
-          function validateAssignedMetadata(v,id,uploaded){
-           need(typeof id==='string'&&/^[1-9][0-9]*$/.test(id),'metadata_identity');const digest=uploadDigest(uploaded);
-           need(isObj(v)&&String(v.id)===id&&v.name==='afw-readonly-receipt-inspection-'+process.env.GITHUB_RUN_ID+'-1'&&v.expired===false&&Number.isSafeInteger(v.size_in_bytes)&&v.size_in_bytes>0&&v.size_in_bytes<=131072,'metadata_identity');
-           need(typeof v.digest==='string'&&/^sha256:[a-f0-9]{64}$/.test(v.digest)&&v.digest==='sha256:'+digest,'metadata_digest');
-           need(String(v.workflow_run?.id)===process.env.GITHUB_RUN_ID&&v.workflow_run?.head_sha===process.env.GITHUB_SHA&&v.workflow_run?.head_branch==='feat/finite-native-cleanup-20261101','metadata_identity');
-           const created=Date.parse(v.created_at),expires=Date.parse(v.expires_at);need(Number.isFinite(created)&&Number.isFinite(expires)&&expires-created>=6*86400000&&expires-created<=8*86400000,'metadata_identity');return true;
-          }
-          async function readMetadataResponse(response){
-           need(response.status===200&&response.body!==null,'metadata_identity');const parts=[],reader=response.body.getReader();let total=0;
-           try{for(;;){const part=await reader.read();if(part.done)break;total+=part.value.byteLength;need(total<=65536,'metadata_bound');parts.push(Buffer.from(part.value));}}
+          const METADATA_STAGES=['input','request','response','stream','utf8','json','validate','output','complete'];
+          const METADATA_PREDICATES=['none','unknown','assigned_id','upload_digest_type','upload_digest_format','http_status','response_body','stream_cap','utf8_decode','json_decode','metadata_object','artifact_id','artifact_name','artifact_expired','artifact_size','remote_digest_format','digest_equality','workflow_run_id','source_sha','source_branch','retention','output_write'];
+          function metadataFailure(observation,predicate,reason){if(observation&&observation.firstFailedPredicate==='none'){observation.firstFailedPredicate=predicate;observation.reason=reason;}}
+          function metadataCheck(ok,reason,predicate,observation){if(!ok){metadataFailure(observation,predicate,reason);throw new Rejected(reason);}}
+          function uploadDigest(value,observation=null){
+           metadataCheck(typeof value==='string','metadata_digest','upload_digest_type',observation);const digest=value.startsWith('sha256:')?value.slice(7):value;metadataCheck(/^[a-f0-9]{64}$/.test(digest),'metadata_digest','upload_digest_format',observation);return digest;
+          }
+          function validateAssignedMetadata(v,id,uploaded,observation=null){
+           if(observation)observation.stage='validate';
+           metadataCheck(typeof id==='string'&&/^[1-9][0-9]*$/.test(id),'metadata_identity','assigned_id',observation);const digest=uploadDigest(uploaded,observation);
+           metadataCheck(isObj(v),'metadata_identity','metadata_object',observation);
+           metadataCheck(String(v.id)===id,'metadata_identity','artifact_id',observation);
+           metadataCheck(v.name==='afw-readonly-receipt-inspection-'+process.env.GITHUB_RUN_ID+'-1','metadata_identity','artifact_name',observation);
+           metadataCheck(v.expired===false,'metadata_identity','artifact_expired',observation);
+           metadataCheck(Number.isSafeInteger(v.size_in_bytes)&&v.size_in_bytes>0&&v.size_in_bytes<=131072,'metadata_identity','artifact_size',observation);
+           metadataCheck(typeof v.digest==='string'&&/^sha256:[a-f0-9]{64}$/.test(v.digest),'metadata_digest','remote_digest_format',observation);
+           metadataCheck(v.digest==='sha256:'+digest,'metadata_digest','digest_equality',observation);
+           metadataCheck(String(v.workflow_run?.id)===process.env.GITHUB_RUN_ID,'metadata_identity','workflow_run_id',observation);
+           metadataCheck(v.workflow_run?.head_sha===process.env.GITHUB_SHA,'metadata_identity','source_sha',observation);
+           metadataCheck(v.workflow_run?.head_branch==='feat/finite-native-cleanup-20261101','metadata_identity','source_branch',observation);
+           const created=Date.parse(v.created_at),expires=Date.parse(v.expires_at);metadataCheck(Number.isFinite(created)&&Number.isFinite(expires)&&expires-created>=6*86400000&&expires-created<=8*86400000,'metadata_identity','retention',observation);return true;
+          }
+          async function readMetadataResponse(response,observation=null){
+           if(observation)observation.stage='response';const status=response.status;if(observation)observation.httpStatus=Number.isInteger(status)&&status>=100&&status<=599?status:null;
+           metadataCheck(status===200,'metadata_identity','http_status',observation);const body=response.body;metadataCheck(body!==null,'metadata_identity','response_body',observation);
+           if(observation)observation.stage='stream';const parts=[],reader=body.getReader();let total=0;
+           try{for(;;){const part=await reader.read();if(part.done)break;total+=part.value.byteLength;if(observation)observation.receivedBytes=total;metadataCheck(total<=65536,'metadata_bound','stream_cap',observation);parts.push(Buffer.from(part.value));}}
            catch(error){try{await reader.cancel();}catch{}throw error;}
-           return JSON.parse(utf8(Buffer.concat(parts)));
+           if(observation)observation.stage='utf8';let text;try{text=utf8(Buffer.concat(parts));}catch(error){metadataFailure(observation,'utf8_decode','unknown');throw error;}
+           if(observation)observation.stage='json';try{return JSON.parse(text);}catch(error){metadataFailure(observation,'json_decode','unknown');throw error;}
+          }
+          function metadataDiagnostic(id){
+           return {marker:'AFW_METADATA_READBACK/1',source:typeof process.env.GITHUB_SHA==='string'&&/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA)?process.env.GITHUB_SHA:null,run:typeof process.env.GITHUB_RUN_ID==='string'&&/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID)?process.env.GITHUB_RUN_ID:null,attempt:process.env.GITHUB_RUN_ATTEMPT==='1'?1:null,assignedArtifactId:typeof id==='string'&&/^[1-9][0-9]{0,19}$/.test(id)?id:null,stage:'input',firstFailedPredicate:'none',reason:'none',httpStatus:null,receivedBytes:0,timeoutObserved:null,verified:false};
+          }
+          function validateMetadataDiagnostic(v){
+           const keys=['marker','source','run','attempt','assignedArtifactId','stage','firstFailedPredicate','reason','httpStatus','receivedBytes','timeoutObserved','verified'];metadataCheck(isObj(v)&&Object.keys(v).length===keys.length&&Object.keys(v).every(k=>keys.includes(k)),'metadata_diagnostic','unknown',null);
+           const optional=(x,pattern)=>x===null||(typeof x==='string'&&pattern.test(x));
+           metadataCheck(v.marker==='AFW_METADATA_READBACK/1'&&optional(v.source,/^[a-f0-9]{40}$/)&&optional(v.run,/^[1-9][0-9]{0,19}$/)&&(v.attempt===null||v.attempt===1)&&optional(v.assignedArtifactId,/^[1-9][0-9]{0,19}$/),'metadata_diagnostic','unknown',null);
+           metadataCheck(METADATA_STAGES.includes(v.stage)&&METADATA_PREDICATES.includes(v.firstFailedPredicate)&&['none','unknown','metadata_identity','metadata_digest','metadata_bound'].includes(v.reason)&&(v.httpStatus===null||Number.isInteger(v.httpStatus)&&v.httpStatus>=100&&v.httpStatus<=599)&&num(v.receivedBytes,4295032832)&&(v.timeoutObserved===null||bool(v.timeoutObserved))&&bool(v.verified),'metadata_diagnostic','unknown',null);
+           metadataCheck(v.verified?v.stage==='complete'&&v.firstFailedPredicate==='none'&&v.reason==='none':v.firstFailedPredicate!=='none'&&v.reason!=='none','metadata_diagnostic','unknown',null);return v;
+          }
+          function encodeMetadataDiagnostic(v){const line=JSON.stringify(v);metadataCheck(Buffer.byteLength(line)<=2048,'metadata_diagnostic','unknown',null);validateMetadataDiagnostic(v);return line;}
+          async function runMetadataReadback(id,uploaded,request,writeVerified,emitDiagnostic,signal){
+           const observation=metadataDiagnostic(id);let primary=null,diagnosticError=null;
+           try{
+            metadataCheck(typeof id==='string'&&/^[1-9][0-9]*$/.test(id),'metadata_identity','assigned_id',observation);uploadDigest(uploaded,observation);
+            observation.stage='request';const response=await request();const value=await readMetadataResponse(response,observation);validateAssignedMetadata(value,id,uploaded,observation);
+            observation.stage='output';try{await writeVerified();}catch(error){metadataFailure(observation,'output_write','unknown');throw error;}observation.verified=true;observation.stage='complete';
+           }catch(error){primary=error;metadataFailure(observation,'unknown','unknown');}
+           try{observation.timeoutObserved=typeof signal?.aborted==='boolean'?signal.aborted:null;}catch{}
+           try{await emitDiagnostic(encodeMetadataDiagnostic(observation));}catch(error){diagnosticError=error;}
+           if(primary!==null)throw primary;if(diagnosticError!==null)throw diagnosticError;return observation;
           }
           
+          const id=process.env.ASSIGNED_ARTIFACT_ID,uploaded=process.env.UPLOADED_ARTIFACT_DIGEST,signal=AbortSignal.timeout(15000);
           try{
-           const id=process.env.ASSIGNED_ARTIFACT_ID,uploaded=process.env.UPLOADED_ARTIFACT_DIGEST;
-           need(typeof id==='string'&&/^[1-9][0-9]*$/.test(id),'metadata_identity');uploadDigest(uploaded);
-           const response=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+id,{redirect:'error',signal:AbortSignal.timeout(15000),headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'}});
-           validateAssignedMetadata(await readMetadataResponse(response),id,uploaded);
-           await writeFile(process.env.GITHUB_OUTPUT,'assigned-id-verified=true\n',{flag:'a'});
+           await runMetadataReadback(id,uploaded,
+            ()=>fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/'+id,{redirect:'error',signal,headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'}}),
+            ()=>writeFile(process.env.GITHUB_OUTPUT,'assigned-id-verified=true\n',{flag:'a'}),
+            line=>{process.stdout.write(line+'\n');},signal);
           }catch{process.exitCode=1;}
           NODE_READBACK
-          node "$RUNNER_TEMP/afw-readonly-inspector-readback.mjs" >"$RUNNER_TEMP/afw-readonly-inspector-controls-metadata.private" 2>&1
+          node "$RUNNER_TEMP/afw-readonly-inspector-readback.mjs" 2>"$RUNNER_TEMP/afw-readonly-inspector-controls-metadata.private"
       - name: Read back only this assigned safe CONTROLS artifact
         if: ${{ always() && steps.metadata.outcome == 'success' }}
         uses: actions/download-artifact@v4
         with:
           artifact-ids: ${{ steps.artifact.outputs.artifact-id }}
           path: ${{ runner.temp }}/afw-readonly-inspector-controls-downloaded
           merge-multiple: true
       - name: Verify complete assigned safe pair and closed inventory
         id: inventory
         if: ${{ always() && steps.metadata.outcome == 'success' }}

```

## Complete appended report844..a51 (prefix checked)

```markdown


## Receipt inspector fix2 — one observable KEYLESS CONTROLS candidate / PENDING

Root release88c4c159830d155d0221054ba68473d9270e20f0 @6cbdbe7549baf3189b52481ca8b6549309a6bf53; safeBASE844246c98f37de5e321e92803bbbf49a1aa607d3/tree d14e30dc. SAME solewriter, onlyworkflow+appendreport, all3188others/main protected. Root primary/same-review32791827 accepted I5/M1 current code and all76actual prior controls, but I6 remains integrationOPEN. Original43244518810 firstfailed predicate was lost; cause remainsUNKNOWN despite later equalmetadata/upload digests. No credential/provider/timing/field hypothesis is a ruling or repair.

Minimal change is observational only: same shared validation/stream/digest/oneGET15s/success/output rules, split existing assertions into closed first-predicate labels and preserve original Rejected reason/Error identity. No validation relaxed or offset/retry/delay/poll/alternate endpoint. Current runMetadataReadback calls one fixed request, current readMetadataResponse/validateAssignedMetadata, then original GITHUB_OUTPUT write. It emits exactlyone safe JSON logline on success/failure, markerAFW_METADATA_READBACK/1, <=2048UTF8B. Fields are exact marker/source/run/attempt/assignedArtifactId/stage/firstFailedPredicate/reason/httpStatus/receivedBytes/timeoutObserved/verified. Context is current publicSource/run/attempt/assignedID only (strict typed sanitized/null). No arbitrary message/stack/body/header/URL/token/proxy/environment values. Observed HTTP integer100..599 ornull; actual streamed bytecount bounded0..4295032832; timeoutObserved only actual captured signal.aborted boolean ornull, never inferred from exception names. Unknown non-owned errors stayreasonunknown/firstunknown at actualstage; known UTF8/JSON/output operations get their actualsite label while original exception is rethrown. Reporting failures never replace a primary rejection.

Nine stages: input/request/response/stream/utf8/json/validate/output/complete.
Twenty-two predicates: none/unknown/assigned_id/upload_digest_type/upload_digest_format/http_status/response_body/stream_cap/utf8_decode/json_decode/metadata_object/artifact_id/artifact_name/artifact_expired/artifact_size/remote_digest_format/digest_equality/workflow_run_id/source_sha/source_branch/retention/output_write.
Reasons: none/unknown/metadata_identity/metadata_digest/metadata_bound. Strict keys/enums/stringtypes/numericbounds/coherent verified outcome and2048B serialization checked before emission. Diagnostic stdout is public ONLY this closed line; stderr remains private. No raw error catch logging.

Retained EXACT prior76 named checks/order, added15 meaningful CURRENT helper tests, total91/max96. Full current inventory:
[
  "zip_valid",
  "zip_signed_descriptor",
  "zip_extra",
  "zip_traversal",
  "zip_duplicate",
  "zip_bad_crc",
  "zip_link",
  "zip_bad_range",
  "failure_identity_valid",
  "failure_identity_success_reject",
  "failure_identity_role_reject",
  "failure_identity_kind_reject",
  "failure_identity_unknown_reject",
  "ownership_valid",
  "ownership_unknown_reject",
  "ownership_enum_reject",
  "optional_missing_unknown",
  "full_result_valid",
  "full_result_unknown_reject",
  "tap_valid_canaries",
  "tap_unknown_scalar",
  "tap_duplicate_case",
  "tap_case_number_collision",
  "tap_wrapper_number_collision",
  "tap_unknown_number_collision",
  "tap_late_diag_comment",
  "tap_late_diag_unrelated",
  "tap_injected_name",
  "tap_long_line",
  "tap_long_block",
  "public_authenticated_valid",
  "gate_artifact_count",
  "gate_artifact_actual",
  "gate_artifact_candidate",
  "gate_artifact_duration",
  "gate_artifact_business",
  "gate_authenticated_count",
  "gate_authenticated_actual",
  "gate_authenticated_candidate",
  "gate_authenticated_duration",
  "gate_authenticated_business",
  "gate_inventory_count",
  "gate_inventory_actual",
  "gate_inventory_candidate",
  "gate_inventory_duration",
  "gate_inventory_business",
  "gate_identity_count",
  "gate_identity_actual",
  "gate_identity_candidate",
  "gate_identity_duration",
  "gate_identity_business",
  "scalar_boolean_wrong",
  "scalar_false_null_wrong",
  "scalar_array_hash_wrong",
  "scalar_half_hash_wrong",
  "scalar_boolean_valid",
  "scalar_null_valid",
  "scalar_integer_valid",
  "scalar_typed_valid",
  "verdict_accepted",
  "verdict_parse_timeout_old_current",
  "verdict_other_failure",
  "verdict_rejected_status",
  "verdict_partial_status",
  "verdict_missing_clock",
  "verdict_open_over_deadline",
  "verdict_download_over_deadline",
  "digest_match_bare",
  "digest_match_prefixed",
  "digest_mismatch_old_current",
  "digest_upload_malformed",
  "digest_remote_malformed",
  "metadata_wrong_id",
  "metadata_wrong_context",
  "metadata_stream_valid",
  "metadata_stream_overcap",
  "diagnostic_http_rejected",
  "diagnostic_json_malformed",
  "diagnostic_stream_overcap",
  "diagnostic_identity_first_field",
  "diagnostic_digest_mismatch",
  "diagnostic_success_output",
  "diagnostic_unknown_request_error",
  "diagnostic_observed_timeout",
  "diagnostic_schema_extra_field",
  "diagnostic_schema_arbitrary_enum",
  "diagnostic_record_over_2048",
  "diagnostic_primary_first_failure_preserved",
  "diagnostic_output_write_error",
  "diagnostic_utf8_malformed",
  "diagnostic_input_id_rejected"
]
Added controls exercise rejectedHTTP403, malformedJSON, actual65537B cap/receivedbytes, concrete identity-first field, exactdigest mismatch, success/write/oneemission, unknownrequestError identity, observedaborted signal, schemaunknownfield/arbitraryenum/oversize, firstpredicate+primarypreserved when reporter also fails, outputwriteError identity, strictUTF8 and badinputIDbefore request. Tests invoke SAME current orchestration/helper/schema as actualreadback; no mirrored validator. All old76 currentinert checks retained; I5/M1 unchanged, M2 minor counts-invalid distinction DEFERRED.

ONE new keyless Sourcepush attempt1<=2min/Node22.23.4 authorized; no GitHubenvironment/secrets bindings, no AFWkey supplied, no actual originalartifact/download/open/project, domain/SDK import, MF/I0/nativebusiness. Current fullcore identical between controls and COMPLETE amended inactive realinspector. Fixed controls CLI source-pin reads +runFixtures+closedproof only. StdNode/no npm. Only safe newly assigned controlsartifact gets metadata GET/current exact uploaddigestcomparison/streamcap, then exact2file safe inventory readback. Rawsyntax/fixture/TAP/code logs private; publiconlyCONTROLS result.json+manifest.json<=65536B, exact91IDs/counts/hash-only failure/coreSHA/allreadinessfalse. Commands remain node--check currentmodule; node currentmodule controls; independentfallback +strictseal; currentmetadatareadback (closed diagnostic stdout); assignedsafeactiondownload +strictfullinventory. No test executed in preparation: only grammar construction and byte-exact final7heredoc payload comparisons.

Complete amended actual-inspector draft is recoverably preserved blob9994894916158e92665f780a30513015d8489273/117088bytes, still UNQUALIFIED/manual/noinputs/noPush/jobfalse with allreal drivers/publisher/readback. It is NOT activated. Freeze solecontrolscandidate throughterminal/evidence. Anyfailure => preserveactualclosedproof+diagnostic, EXACTsafeF7complete7manualfalse/report/readbacks0active/STOP, no repair/retry. OnlyALLPASS allows reconcile that COMPLETE actualinspector +currentsharedhelpers/diagnostic +report/readbacks/STOP for SAMEreviewer; no privateinspection release. Current outcomesPENDING, originalR1–R3cause/statusUNKNOWN, Native16consumed/no replay.


## Receipt inspector fix2 — observed HTTP404 / unexpected FAILURE / EXACTsafe restore / STOP

Sole released run43248453374/attempt1, frozenSource82cb1cf51a89e88f065b10ee1ca162956c1dafc7/treefd20138d74298a4cb20ba27b26319b7c1696a307/WFfcd20785d8a6e9233d3a4949560550220435d172/report6b600417ea185741f11f3c2e415bd40c08879417. Created2026-11-12T15:30:06Z, terminalFAILURE updated15:30:22Z. Job131287433221 started15:30:09Z, completed15:30:21Z. Materialization/syntaxSUCCESS15:30:15;91currentinert-fixture stepSUCCESS15:30:15; strict closedlocalproofSUCCESS15:30:15..16; uploadSUCCESS15:30:16..17. Metadata step8FAILURE15:30:17..18. Assignedsafeartifact retrieval/fullremoteinventory steps9/10SKIPPED; finalgateFAILURE15:30:18. No retries/repairs or secondjob.

ExactlyONE actual closed metadata line was extracted from primary joblogs;316UTF8B, valid current closed marker/context/enums:
{"marker":"AFW_METADATA_READBACK/1","source":"82cb1cf51a89e88f065b10ee1ca162956c1dafc7","run":"43248453374","attempt":1,"assignedArtifactId":"13959006495","stage":"response","firstFailedPredicate":"http_status","reason":"metadata_identity","httpStatus":404,"receivedBytes":0,"timeoutObserved":false,"verified":false}
This proves current request's observedHTTP404 atresponse/http_status, BEFORE metadata body UTF8/JSON, identityfield or digest checks (receivedBytes0; actual signal not aborted). It does NOT establish a credential/provider/proxy/timing cause, and does NOT recover fix1's previously lost firstfailure. No validator weakening, wait, alternate request or reclassification follows. Original fix1cause remainsUNKNOWN. Current I6 integration still fails despite accepted I5/M1 and currentunitstep success.

Exactlyone assigned safe CONTROLS artifact:
{
  "id": 13959006495,
  "name": "afw-readonly-receipt-inspection-43248453374-1",
  "bytes": 1825,
  "digest": "sha256:4506c493886b8aca18fe02f45af23f39b7f30b59501750205db57bd09be9788b",
  "created": "2026-11-12T15:30:17Z",
  "expires": "2026-11-19T15:30:16Z",
  "expired": false,
  "source": "82cb1cf51a89e88f065b10ee1ca162956c1dafc7",
  "run": 43248453374
}
Upload action digest from actual log: not extracted.
Expected exact public result.json+manifest.json, purposeCONTROLS only. Later terminal metadata/list presence is distinct from the actual earlierHTTP404 and supplies no cause. This seat did not download this safeZIP; Root independently audits safeDTO/CRC/manifest/exact91IDs/corehash when needed. Same assigned-ID metadata/inventory gate did notpass; this is NOT a qualified covering job. Rawsyntax/fixture/error logs remain runner-private; only closedproof and the safe diagnostic were public. Original artifact13949168304/key/custody/SDK/MF/I0/nativebusiness remained untouched.

Prescribed closure restores EXACTsafe f7a71f1a0fa4f5ddf069ff411f008a098455e5cc COMPLETE7/manual/noinputs/noPush/all7literalfalse plus this append only, all3188other blobs/modes unchanged. The amended actual-inspector draft9994894916158e92665f780a30513015d8489273/117088bytes remains recoverable but UNQUALIFIED and notinstalled/activated. Full ref/tree/body/scope andzeroactive readbacks follow. No original/private receipt inspection/decryption or Native16 replay was authorized/performed. M2 minor invalid-vs-missingcounts staysdeferred.

STOP. Await new bounded Root ruling; no automatic repair/retry/job, newpermission/key/env, actualdata integration, runtime or Sourcebusiness change.

```
