"""The journey packet cannot reuse an earlier public upload authority."""
import copy,importlib.util,unittest
from datetime import datetime,timedelta,timezone
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class JourneyUploadTests(unittest.TestCase):
 def setUp(self):
  spec=importlib.util.spec_from_file_location("home_uploader",ROOT/"scripts/public-inactive-upload.py")
  self.m=importlib.util.module_from_spec(spec);spec.loader.exec_module(self.m)
 def test_fixed_journey_profile_and_inventory_are_separate(self):
  p=self.m.upload_packet("journey_audit")
  self.assertEqual(p,{"sourceRevision":"cace1d9c6049862401191fa9abf5a9160eeb915c","contractPath":"config/public-journey-delivery.v1.json","workflow":".github/workflows/afw-public-journey-inactive-upload.yml","receiptPath":"output/public-journey-upload-receipt.json"})
  self.assertEqual(self.m.qual.PACKET_INVENTORIES[p["contractPath"]],"docs/evidence/2026-10-29-public-journey/qualified-inventory.json")
  p["sourceRevision"]="changed"
  self.assertEqual(self.m.upload_packet("journey_audit")["sourceRevision"],"cace1d9c6049862401191fa9abf5a9160eeb915c")
 def test_journey_cannot_use_another_source_target_tag_or_workflow(self):
  p=self.m.upload_packet("journey_audit")
  target={"accountId":self.m.ACCOUNT,"worker":self.m.WORKER,"origin":"https://agentfriendlyweb.dev","entrypoint":"server/index.js","assets":"client"}
  c={"sourceRevision":p["sourceRevision"],"target":target}
  self.m.check_packet_contract(c,"journey_audit")
  for change in [{"sourceRevision":self.m.upload_packet("json_budget")["sourceRevision"]},{"target":{**target,"worker":"another"}}]:
   with self.assertRaises(ValueError):self.m.check_packet_contract({**c,**change},"journey_audit")
  cmd=self.m.wrangler_command(Path("/runner/wrangler"),Path("/runner/upload.json"),"cace1d9c-r123-a1",False,"journey_audit")
  self.assertEqual(cmd[1:3],["versions","upload"]);self.assertIn("--keep-vars",cmd);self.assertNotIn("deploy",cmd)
  for tag in ["d3b638a4-r123-a1","cace1d9c-r123-a2"]:
   with self.assertRaises(ValueError):self.m.wrangler_command(Path("/runner/wrangler"),Path("/runner/u.json"),tag,False,"journey_audit")
  now=datetime(2026,10,27,14,tzinfo=timezone.utc)
  env={"GITHUB_ACTIONS":"true","GITHUB_REPOSITORY":self.m.REPO,"GITHUB_EVENT_NAME":"workflow_dispatch","GITHUB_REF":"refs/heads/main","GITHUB_RUN_ATTEMPT":"1","GITHUB_RUN_ID":"123","GITHUB_SHA":"a"*40}
  run={"id":123,"head_sha":"a"*40,"event":"workflow_dispatch","run_attempt":1,"path":p["workflow"],"created_at":(now-timedelta(seconds=30)).isoformat(),"repository":{"full_name":self.m.REPO},"head_repository":{"full_name":self.m.REPO}}
  self.assertEqual(self.m.upload_context(env,run,"a"*40,now,"journey_audit")["remainingSeconds"],570)
  for patch in [{"path":self.m.upload_packet("json_budget")["workflow"]},{"run_attempt":2},{"created_at":(now-timedelta(seconds=600)).isoformat()}]:
   with self.assertRaises(ValueError):self.m.upload_context(env,{**run,**patch},"a"*40,now,"journey_audit")
if __name__=="__main__":unittest.main()
