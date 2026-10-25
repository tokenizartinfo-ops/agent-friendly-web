import copy
import importlib.util
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

class ActivationTests(unittest.TestCase):
    def setUp(self):
        spec=importlib.util.spec_from_file_location("activation",ROOT/"scripts/public-json-activate.py")
        self.m=importlib.util.module_from_spec(spec)
        spec.loader.exec_module(self.m)
        self.old=self.m.OLD
        self.new=self.m.NEW
        self.state={"id":self.m.INITIAL,"versions":[{"version_id":self.old,"percentage":100},{"version_id":self.m.PREVIOUS,"percentage":0}],"owner":""}
        self.writes=[]
        self.calls=[]
        self.receipt={"runId":123,"mutationAttempts":[],"ok":False}
        self.left=600
    def read(self): return copy.deepcopy(self.state)
    def write(self,phase,versions):
        self.writes.append(phase)
        self.state={"id":"00000000-0000-0000-0000-"+str(len(self.writes)).zfill(12),"versions":copy.deepcopy(versions),"owner":self.m.marker(self.receipt,phase)}
        return copy.deepcopy(self.state)
    def observe(self,phase,seconds):
        self.calls.append((phase,seconds))
        return {"ok":True,"mode":phase}
    def run_it(self,read=None,write=None,observe=None):
        return self.m.activate(read or self.read,write or self.write,observe or self.observe,lambda:self.left,self.receipt,lambda:None)
    def test_success_is_stage0_then_promote_once_and_normal_bound_is30(self):
        self.run_it()
        self.assertEqual(self.writes,["stage0","promote"])
        self.assertTrue(self.receipt["ok"])
        self.assertEqual(self.calls,[("stage0",60),("normal",30)])
        self.assertEqual(self.state["versions"],self.m.traffic(self.new,self.old))
    def test_bad_initial_deployment_never_writes(self):
        self.state["id"]="10000000-0000-0000-0000-000000000001"
        self.run_it()
        self.assertEqual(self.writes,[])
        self.assertFalse(self.receipt["ok"])
    def test_stage0_failure_never_promotes_or_repeats_a_post(self):
        self.run_it(observe=lambda *_:{"ok":False})
        self.assertEqual(self.writes,["stage0"])
        self.assertFalse(self.receipt["ok"])
        self.assertTrue(self.receipt["oldServing"])
    def test_failed_normal_acceptance_rolls_back_only_owned_traffic_once(self):
        self.run_it(observe=lambda phase,_:{"ok":phase=="stage0"})
        self.assertEqual(self.writes,["stage0","promote","rollback"])
        self.assertFalse(self.receipt["ok"])
        self.assertTrue(self.receipt["rollbackVerified"])
        self.assertEqual(self.state["versions"],self.m.traffic(self.old,self.new))
    def test_concurrent_unrelated_deployment_is_never_overwritten(self):
        def observe(phase,_):
            self.state["id"]="20000000-0000-0000-0000-000000000002"
            self.state["owner"]="unrelated"
            return {"ok":True}
        self.run_it(observe=observe)
        self.assertEqual(self.writes,["stage0"])
        self.assertTrue(self.receipt["foreignActivity"])
    def test_unknown_stage0_ack_cannot_be_replayed_or_promoted(self):
        def write(phase,versions):
            self.write(phase,versions)
            raise TimeoutError("no_ack")
        self.run_it(write=write)
        self.assertEqual(self.writes,["stage0"])
        self.assertFalse(self.receipt["ok"])
        self.assertTrue(self.receipt["oldServing"])
    def test_unknown_promotion_ack_only_reconciles_and_rolls_back_once(self):
        def write(phase,versions):
            state=self.write(phase,versions)
            if phase=="promote": raise TimeoutError("no_ack")
            return state
        self.run_it(write=write)
        self.assertEqual(self.writes,["stage0","promote","rollback"])
        self.assertFalse(self.receipt["ok"])
        self.assertTrue(self.receipt["rollbackVerified"])
        self.assertIs(self.receipt.get("trafficPromotion"),True)
    def test_lost_promotion_ack_with_old_observed_remains_unknown(self):
        def write(phase,versions):
            if phase=="promote":raise TimeoutError("not_observed")
            return self.write(phase,versions)
        self.run_it(write=write)
        self.assertEqual(self.writes,["stage0"])
        self.assertEqual(self.receipt["mutationAttempts"],["stage0","promote"])
        self.assertTrue(self.receipt["trafficPromotionAttempted"])
        self.assertIsNone(self.receipt["trafficPromotion"])
        self.assertEqual(self.receipt["phase"],"unknown_promotion_ack_old_observed")
        self.assertTrue(self.receipt["oldServing"])

    def test_original_expiry_prevents_every_mutation(self):
        self.left=0
        self.run_it()
        self.assertEqual(self.writes,[])
        self.assertFalse(self.receipt["ok"])
    def test_reserve_for_recovery_is_required_before_promotion(self):
        def observe(phase,_):
            self.left=100
            return {"ok":True}
        self.run_it(observe=observe)
        self.assertEqual(self.writes,["stage0"])
        self.assertTrue(self.receipt["oldServing"])

    def test_unknown_rollback_ack_is_read_back_without_replaying_it(self):
        def write(phase,versions):
            state=self.write(phase,versions)
            if phase=="rollback": raise TimeoutError("no_ack")
            return state
        self.run_it(write=write,observe=lambda phase,_:{"ok":phase=="stage0"})
        self.assertEqual(self.writes,["stage0","promote","rollback"])
        self.assertFalse(self.receipt["ok"])
        self.assertTrue(self.receipt["rollbackVerified"])
    def test_dispatch_ref_attempt_workflow_and_original_age_are_fenced(self):
        from datetime import datetime,timedelta,timezone
        now=datetime(2026,10,25,12,tzinfo=timezone.utc)
        env={"GITHUB_ACTIONS":"true","GITHUB_REPOSITORY":self.m.upl.REPO,"GITHUB_EVENT_NAME":"workflow_dispatch","GITHUB_REF":"refs/heads/main","GITHUB_RUN_ATTEMPT":"1","GITHUB_SHA":"a"*40,"GITHUB_RUN_ID":"123"}
        run={"id":123,"head_sha":"a"*40,"run_attempt":1,"event":"workflow_dispatch","path":self.m.WORKFLOW,"created_at":(now-timedelta(seconds=60)).isoformat(),"repository":{"full_name":self.m.upl.REPO},"head_repository":{"full_name":self.m.upl.REPO}}
        self.assertEqual(self.m.dispatch_context(env,run,"a"*40,now),540)
        for change in [{"path":".github/workflows/afw-public-inactive-upload.yml"},{"run_attempt":2},{"created_at":(now-timedelta(seconds=600)).isoformat()}]:
            bad={**run,**change}
            with self.subTest(change=change),self.assertRaises(ValueError):self.m.dispatch_context(env,bad,"a"*40,now)
        bad={**env,"GITHUB_REF":"refs/heads/other"}
        with self.assertRaises(ValueError):self.m.dispatch_context(bad,run,"a"*40,now)

    def test_documented_direct_ack_and_envelope_share_strict_validation(self):
        versions=self.m.traffic(self.old,self.new)
        direct={"id":"83207fc9-34d7-4a44-9ada-1ebf58a8c041","source":"api","strategy":"percentage","versions":versions,"created_on":"2026-10-25T13:09:44.144891Z","annotations":{"workers/message":"private_not_returned"},"author_email":"must_not_be_logged"}
        for payload in (direct,{"success":True,"result":direct}):
            result=self.m.parse_deployment_ack(payload,versions)
            self.assertEqual(result["id"],direct["id"])
            self.assertEqual(result["versions"],versions)
            self.assertNotIn("author_email",result)
            self.assertNotIn("annotations",result)
        for payload in ({"success":False,"result":direct},{**direct,"versions":self.m.traffic(self.new,self.old)},{**direct,"id":"not-a-uuid"},{**direct,"strategy":"other"}):
            with self.subTest(payload=payload),self.assertRaises(ValueError):self.m.parse_deployment_ack(payload,versions)

    def test_fixed_staged_continuation_never_replays_stage0(self):
        self.state={"id":self.m.STAGED,"versions":self.m.traffic(self.old,self.new),"owner":self.m.STAGED_OWNER}
        self.m.activate(self.read,self.write,self.observe,lambda:self.left,self.receipt,lambda:None,already_staged=True)
        self.assertEqual(self.writes,["promote"])
        self.assertTrue(self.receipt["ok"])
        self.assertEqual(self.calls,[("stage0",60),("normal",30)])
        self.assertEqual(self.receipt["adoptedStage0DeploymentId"],self.m.STAGED)

    def test_staged_continuation_rejects_other_id_owner_or_traffic(self):
        correct={"id":self.m.STAGED,"versions":self.m.traffic(self.old,self.new),"owner":self.m.STAGED_OWNER}
        for change in ({"id":self.m.INITIAL},{"owner":"someone_else"},{"versions":self.m.traffic(self.new,self.old)}):
            self.setUp()
            self.state={**correct,**change}
            self.m.activate(self.read,self.write,self.observe,lambda:self.left,self.receipt,lambda:None,already_staged=True)
            with self.subTest(change=change):self.assertEqual(self.writes,[])

    def test_staged_failed_acceptance_retains_old_traffic_without_any_post(self):
        self.state={"id":self.m.STAGED,"versions":self.m.traffic(self.old,self.new),"owner":self.m.STAGED_OWNER}
        self.m.activate(self.read,self.write,lambda *_:{"ok":False},lambda:self.left,self.receipt,lambda:None,already_staged=True)
        self.assertEqual(self.writes,[])
        self.assertFalse(self.receipt["ok"])
        self.assertTrue(self.receipt["oldServing"])

    def test_insufficient_recovery_budget_never_promotes(self):
        for available in (180,239,359):
            self.setUp()
            def observe(phase,_):
                if phase=="stage0":self.left=available
                return {"ok":True}
            self.run_it(observe=observe)
            with self.subTest(available=available):
                self.assertEqual(self.writes,["stage0"])
                self.assertTrue(self.receipt["oldServing"])

    def test_full_reserve_covers_late_acceptance_and_rollback_read_failures(self):
        late={"promotion":0,"rollback":0}
        def read():
            if self.writes and self.writes[-1] in ("promote","rollback"):
                phase=self.writes[-1]
                self.left-=40
                late["promotion" if phase=="promote" else "rollback"]+=1
                if late["promotion" if phase=="promote" else "rollback"]==1:
                    raise TimeoutError("last_metadata_read_failed")
            return self.read()
        def write(phase,versions):
            if phase in ("promote","rollback"):
                if self.left<60:raise TimeoutError("cannot_finish_single_write")
                self.left-=60
            return self.write(phase,versions)
        def observe(phase,_):
            if phase=="stage0":self.left=360
            else:self.left-=30
            return {"ok":True}
        self.run_it(read=read,write=write,observe=observe)
        self.assertEqual(self.writes,["stage0","promote","rollback"])
        self.assertTrue(self.receipt["rollbackVerified"])
        self.assertEqual(self.receipt["phase"],"rollback_reconciled")
        self.assertGreaterEqual(self.left,50)

    def test_io_deadline_covers_the_entire_operation_and_restores_the_alarm(self):
        import signal,time
        prior=signal.getsignal(signal.SIGALRM)
        started=time.monotonic()
        with self.assertRaises(TimeoutError):self.m.bounded_io(lambda:time.sleep(1),0.03)
        self.assertLess(time.monotonic()-started,0.5)
        self.assertEqual(signal.getsignal(signal.SIGALRM),prior)
        self.assertEqual(signal.getitimer(signal.ITIMER_REAL),(0.0,0.0))

    def test_prewrite_rechecks_deployment_after_metadata_reads(self):
        expected=self.read()
        order=[]
        def snapshot():order.append("metadata");return copy.deepcopy(expected)
        def changed():
            order.append("final_deployment")
            state=copy.deepcopy(expected)
            state["id"]="30000000-0000-0000-0000-000000000003"
            state["owner"]="another_actor"
            return state
        with self.assertRaises(ValueError):self.m.prewrite_fence(snapshot,changed,expected)
        self.assertEqual(order,["metadata","final_deployment"])
        self.assertEqual(self.m.prewrite_fence(self.read,self.read,expected),expected)

if __name__=="__main__":unittest.main()
