import copy
import hashlib
import importlib.util
import io
import json
import stat
import unittest
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts/prepare-preparation-canary-release.py"

class PreparationReleaseTests(unittest.TestCase):
    def setUp(self):
        if not SCRIPT.is_file(): self.fail("Closed preparation release checker is missing")
        spec = importlib.util.spec_from_file_location("preparation_release", SCRIPT)
        self.m = importlib.util.module_from_spec(spec); spec.loader.exec_module(self.m)
        self.script = b"export default {fetch(){return new Response('closed',{status:404})}}"
        self.build = {"sourceRevision": "a" * 40, "sourceTree": "b" * 40, "sourceCheck": "git-inputs-before-after-v1",
                      "workerHash": hashlib.sha256(self.script).hexdigest(), "workerBytes": len(self.script),
                      "buildOnly": True, "runtimeConfigIncluded": False}
        self.contract = {"build": self.build, "artifact": {"id": 12, "name": "preparation", "runId": 20, "runAttempt": 1,
                         "workflow": ".github/workflows/afw-preparation-worker-build.yml", "bytes": 10,
                         "sha256": "c" * 64, "expiresAt": "2026-10-27T20:04:31Z"}}

    def package(self, build=None, script=None, extras=(), kind=0, compression=zipfile.ZIP_DEFLATED):
        out = io.BytesIO()
        with zipfile.ZipFile(out, "w", compression=compression) as z:
            entries = [("index.mjs", self.script if script is None else script),
                       ("build.json", json.dumps(self.build if build is None else build).encode())] + list(extras)
            for name, value in entries:
                if kind:
                    item = zipfile.ZipInfo(name); item.create_system=3; item.external_attr=(kind | 0o644)<<16
                    z.writestr(item,value)
                else: z.writestr(name,value)
        data = out.getvalue()
        c = copy.deepcopy(self.contract); c["artifact"]["bytes"]=len(data); c["artifact"]["sha256"]=hashlib.sha256(data).hexdigest()
        return data, c

    def test_exact_two_file_build_is_qualified_without_rebuild(self):
        data,c=self.package()
        result=self.m.qualify_package(data,c)
        self.assertEqual(result["script"],self.script)
        self.assertEqual(result["build"],self.build)

    def test_replaced_zip_or_worker_and_wrong_manifest_fail(self):
        data,c=self.package(); c["artifact"]["sha256"]="0"*64
        with self.assertRaises(ValueError): self.m.qualify_package(data,c)
        data,c=self.package(script=b"other")
        with self.assertRaises(ValueError): self.m.qualify_package(data,c)
        for key, value in [("sourceRevision","d"*40),("sourceTree","d"*40),("buildOnly",False),
                           ("runtimeConfigIncluded",True),("workerBytes",2),("sourceCheck","label-only")]:
            build=dict(self.build);build[key]=value; data,c=self.package(build=build)
            with self.subTest(key=key),self.assertRaises(ValueError): self.m.qualify_package(data,c)

    def test_archive_entries_types_encryption_and_sizes_fail_closed(self):
        for extras in [(("../outside",b"bad"),),(("index.mjs",b"duplicate"),),(("INDEX.mjs",b"case"),),(("folder/",b""),)]:
            data,c=self.package(extras=extras)
            with self.subTest(extras=extras),self.assertRaises(ValueError): self.m.qualify_package(data,c)
        data,c=self.package(kind=stat.S_IFLNK)
        with self.assertRaises(ValueError): self.m.qualify_package(data,c)
        data,c=self.package(compression=zipfile.ZIP_BZIP2)
        with self.assertRaises(ValueError): self.m.qualify_package(data,c)
        data,c=self.package(); c["artifact"]["bytes"]+=1
        with self.assertRaises(ValueError): self.m.qualify_package(data,c)
        data,c=self.package(script=b"x"*(2097152+1))
        with self.assertRaises(ValueError): self.m.qualify_package(data,c)

    def test_frozen_closed_profile_has_no_capability_or_destination_inheritance(self):
        p=self.m.closed_profile()
        self.assertEqual(p["name"],"agent-friendly-web-preparation-canary")
        self.assertEqual(p["account_id"],"85d0d5dadac3341a564f22ce885e9eec")
        self.assertIs(p["workers_dev"],False);self.assertIs(p["preview_urls"],False)
        self.assertEqual(p["compatibility_date"],"2026-09-07")
        self.assertEqual(p["compatibility_flags"],["nodejs_compat"])
        self.assertEqual(len(p["vars"]),4);self.assertEqual(set(p["vars"].values()),{"false"})
        self.assertIs(p["keep_vars"],False)
        for forbidden in ("d1_databases","kv_namespaces","services","durable_objects","routes","triggers","assets"):
            self.assertNotIn(forbidden,p)
        self.m.validate_closed_profile(p)

    def test_accidental_opening_or_extra_binding_and_shared_target_are_rejected(self):
        original=self.m.closed_profile()
        variants=[]
        p=copy.deepcopy(original);p["vars"]["AFW_DELEGATED_PREPARATION_ROUTER_ENABLED"]="true";variants.append(p)
        for k,v in [("name","agent-friendly-web-web-production"),("workers_dev",True),("preview_urls",True),
                    ("keep_vars",True),("d1_databases",[{"binding":"DB","database_id":"not-ours"}]),
                    ("vars",{}),("routes",["agentfriendlyweb.dev/*"]),("triggers",{"crons":["* * * * *"]})]:
            p=copy.deepcopy(original);p[k]=v;variants.append(p)
        for p in variants:
            with self.subTest(keys=list(p)),self.assertRaises(ValueError):self.m.validate_closed_profile(p)

    def test_successful_push_main_provenance_is_required(self):
        a=self.contract["artifact"]
        meta={"id":12,"name":"preparation","size_in_bytes":10,"digest":"sha256:"+"c"*64,
              "expired":False,"expires_at":a["expiresAt"],"workflow_run":{"id":20,"head_sha":"a"*40}}
        run={"id":20,"run_attempt":1,"head_sha":"a"*40,"head_branch":"main","event":"push",
             "status":"completed","conclusion":"success","path":a["workflow"],
             "repository":{"full_name":self.m.REPOSITORY},"head_repository":{"full_name":self.m.REPOSITORY}}
        now=datetime(2026,10,20,tzinfo=timezone.utc)
        self.m.check_build_provenance(self.contract,meta,run,now)
        for field in ["expired","digest","run","source","attempt","event","branch","repository","expiry","status"]:
            m=copy.deepcopy(meta);r=copy.deepcopy(run)
            if field=="expired":m["expired"]=True
            if field=="digest":m["digest"]="sha256:"+"d"*64
            if field=="run":m["workflow_run"]["id"]=21
            if field=="source":m["workflow_run"]["head_sha"]="e"*40
            if field=="attempt":r["run_attempt"]=2
            if field=="event":r["event"]="pull_request"
            if field=="branch":r["head_branch"]="foreign"
            if field=="repository":r["head_repository"]["full_name"]="foreign/repo"
            if field=="expiry":m["expires_at"]="2026-10-19T00:00:00Z"
            if field=="status":r["conclusion"]="failure"
            with self.subTest(field=field),self.assertRaises(ValueError):
                self.m.check_build_provenance(self.contract,m,r,now)

if __name__=="__main__":unittest.main()
