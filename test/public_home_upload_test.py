"""The home packet cannot reuse an earlier public upload authority."""
import copy,importlib.util,unittest
from datetime import datetime,timedelta,timezone
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class HomeUploadTests(unittest.TestCase):
 def setUp(self):
  spec=importlib.util.spec_from_file_location("home_uploader",ROOT/"scripts/public-inactive-upload.py")
  self.m=importlib.util.module_from_spec(spec);spec.loader.exec_module(self.m)
 def test_fixed_home_profile_and_inventory_are_separate(self):
  p=self.m.upload_packet("home_entry")
  self.assertEqual(p,{"sourceRevision":"3faff3783578c3570348b20dcc04d304e48e61b0","contractPath":"config/public-home-entry-delivery.v1.json","workflow":".github/workflows/afw-public-home-inactive-upload.yml","receiptPath":"output/public-home-upload-receipt.json"})
  self.assertEqual(self.m.qual.PACKET_INVENTORIES[p["contractPath"]],"docs/evidence/2026-10-27-public-home-entry/qualified-inventory.json")
  p["sourceRevision"]="changed"
  self.assertEqual(self.m.upload_packet("home_entry")["sourceRevision"],"3faff3783578c3570348b20dcc04d304e48e61b0")
 def test_home_cannot_use_another_source_target_tag_or_workflow(self):
  p=self.m.upload_packet("home_entry")
  target={"accountId":self.m.ACCOUNT,"worker":self.m.WORKER,"origin":"https://agentfriendlyweb.dev","entrypoint":"server/index.js","assets":"client"}
  c={"sourceRevision":p["sourceRevision"],"target":target}
  self.m.check_packet_contract(c,"home_entry")
  for change in [{"sourceRevision":self.m.upload_packet("json_budget")["sourceRevision"]},{"target":{**target,"worker":"another"}}]:
   with self.assertRaises(ValueError):self.m.check_packet_contract({**c,**change},"home_entry")
  cmd=self.m.wrangler_command(Path("/runner/wrangler"),Path("/runner/upload.json"),"3faff378-r123-a1",False,"home_entry")
  self.assertEqual(cmd[1:3],["versions","upload"]);self.assertIn("--keep-vars",cmd);self.assertNotIn("deploy",cmd)
  for tag in ["d3b638a4-r123-a1","3faff378-r123-a2"]:
   with self.assertRaises(ValueError):self.m.wrangler_command(Path("/runner/wrangler"),Path("/runner/u.json"),tag,False,"home_entry")
  now=datetime(2026,10,27,14,tzinfo=timezone.utc)
  env={"GITHUB_ACTIONS":"true","GITHUB_REPOSITORY":self.m.REPO,"GITHUB_EVENT_NAME":"workflow_dispatch","GITHUB_REF":"refs/heads/main","GITHUB_RUN_ATTEMPT":"1","GITHUB_RUN_ID":"123","GITHUB_SHA":"a"*40}
  run={"id":123,"head_sha":"a"*40,"event":"workflow_dispatch","run_attempt":1,"path":p["workflow"],"created_at":(now-timedelta(seconds=30)).isoformat(),"repository":{"full_name":self.m.REPO},"head_repository":{"full_name":self.m.REPO}}
  self.assertEqual(self.m.upload_context(env,run,"a"*40,now,"home_entry")["remainingSeconds"],570)
  for patch in [{"path":self.m.upload_packet("json_budget")["workflow"]},{"run_attempt":2},{"created_at":(now-timedelta(seconds=600)).isoformat()}]:
   with self.assertRaises(ValueError):self.m.upload_context(env,{**run,**patch},"a"*40,now,"home_entry")
if __name__=="__main__":unittest.main()
