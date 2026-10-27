import importlib.util,io,json,unittest,urllib.error
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class ReadProbeTests(unittest.TestCase):
 def setUp(self):
  sp=importlib.util.spec_from_file_location("probe",ROOT/"scripts/public-upload-read-probe.py")
  self.m=importlib.util.module_from_spec(sp);sp.loader.exec_module(self.m)
 def test_no_unknown_path_or_redirect_or_write(self):
  calls=[]
  for suffix in ["/secrets","/versions/other","https://example.com","/deployments?other=1"]:
   with self.assertRaises(ValueError):self.m.probe_path(suffix,"private-fixture",lambda r,timeout:calls.append(r))
  self.assertEqual(calls,[])
 def test_success_keeps_provider_payload_private_and_reports_only_metadata(self):
  class Response:
   status=200
   def read(self,_):return json.dumps({"success":True,"result":{"bindings":[{"text":"private-fixture"}]}}).encode()
   def __enter__(self):return self
   def __exit__(self,*_):pass
  seen=[]
  def open_it(r,timeout):seen.append(r);return Response()
  result,body=self.m.probe_path("/settings","private-fixture",open_it)
  self.assertEqual(result,{"path":"settings","status":200,"ok":True,"providerCodes":[]})
  self.assertNotIn("private-fixture",json.dumps(result))
  self.assertEqual(seen[0].get_method(),"GET");self.assertTrue(seen[0].full_url.startswith("https://api.cloudflare.com/client/v4/accounts/85d0"))
  self.assertEqual(body,{"bindings":[{"text":"private-fixture"}]})
 def test_http_failure_preserves_only_status_and_numeric_error_codes(self):
  def open_it(r,timeout):
   raise urllib.error.HTTPError(r.full_url,403,"private-fixture",{},io.BytesIO(json.dumps({"errors":[{"code":10000,"message":"private-fixture"},{"code":"secret"}]}).encode()))
  result,body=self.m.probe_path("/settings","private-fixture",open_it)
  self.assertIsNone(body);self.assertEqual(result,{"path":"settings","status":403,"ok":False,"providerCodes":[10000]})
  self.assertNotIn("private-fixture",json.dumps(result))
 def test_timeout_or_unexpected_failure_never_serializes_exception(self):
  for exc,category in [(TimeoutError("private-fixture"),"timeout"),(RuntimeError("private-fixture"),"transport_or_decode")]:
   def open_it(*a,**kw):raise exc
   result,body=self.m.probe_path("/settings","private-fixture",open_it)
   self.assertIsNone(body);self.assertEqual(result["error"],category);self.assertNotIn("private-fixture",json.dumps(result))
if __name__=="__main__":unittest.main()
