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

    def paired_package(self):
        data,candidate=self.package()
        rollback_script=b"export default {fetch(){return new Response('previous closed build',{status:404})}}"
        saved_script,saved_build=self.script,self.build
        try:
            self.script=rollback_script
            self.build={**saved_build,"sourceRevision":"d"*40,"sourceTree":"e"*40,
                        "workerHash":hashlib.sha256(rollback_script).hexdigest(),"workerBytes":len(rollback_script)}
            rollback_data,rollback=self.package()
        finally:
            self.script,self.build=saved_script,saved_build
        rollback["artifact"].update(id=13,runId=21)
        rollback.update(kind="retained_build_artifact",workerVersionId="d96a183a-2906-400b-93b2-977b5da21cbd")
        contract={"schemaVersion":2,"project":"AFW","repository":self.m.REPOSITORY,
                  "allowedAction":"prepare_closed_profile_only","activationReady":False,"operationalReadiness":False,
                  "target":{"accountId":"85d0d5dadac3341a564f22ce885e9eec","worker":"agent-friendly-web-preparation-canary","origin":None},
                  "evidence":{"workerVersionId":"74d94d12-85e2-4ab7-acda-84729d786ded"},
                  **candidate,"rollback":rollback}
        return data,rollback_data,contract,rollback_script

    def test_retained_rollback_pair_preserves_both_exact_original_modules(self):
        self.assertTrue(callable(getattr(self.m,"qualify_pair",None)),
                        "Closed qualification must validate the retained rollback build, not generate a recovery stub")
        candidate,rollback,contract,rollback_script=self.paired_package()
        result=self.m.qualify_pair(candidate,rollback,contract)
        self.assertEqual(result["candidate"]["script"],self.script)
        self.assertEqual(result["rollback"]["script"],rollback_script)
        self.assertEqual(result["rollback"]["build"],contract["rollback"]["build"])
        self.assertNotEqual(result["candidate"]["script"],result["rollback"]["script"])

    def test_rollback_substitution_alias_or_scope_cannot_qualify(self):
        self.assertTrue(callable(getattr(self.m,"qualify_pair",None)),
                        "Both immutable artifacts require one fail-closed pair qualifier")
        candidate,rollback,contract,_=self.paired_package()
        for case in ["generated_stub","candidate_as_rollback","aliased_artifact","aliased_run",
                     "aliased_source","aliased_version","missing_version","unverified_kind",
                     "runtime_config","not_build_only","wrong_project","open_readiness","shared_target"]:
            c=copy.deepcopy(contract);r=rollback
            if case=="generated_stub":r=b"export default {fetch(){return new Response('closed',{status:404})}}"
            if case=="candidate_as_rollback":r=candidate
            if case=="aliased_artifact":c["rollback"]["artifact"]["id"]=c["artifact"]["id"]
            if case=="aliased_run":c["rollback"]["artifact"]["runId"]=c["artifact"]["runId"]
            if case=="aliased_source":c["rollback"]["build"]["sourceRevision"]=c["build"]["sourceRevision"]
            if case=="aliased_version":c["rollback"]["workerVersionId"]=c["evidence"]["workerVersionId"]
            if case=="missing_version":del c["rollback"]["workerVersionId"]
            if case=="unverified_kind":c["rollback"]["kind"]="generated_recovery"
            if case=="runtime_config":c["rollback"]["build"]["runtimeConfigIncluded"]=True
            if case=="not_build_only":c["rollback"]["build"]["buildOnly"]=False
            if case=="wrong_project":c["project"]="Tokenizart"
            if case=="open_readiness":c["operationalReadiness"]=True
            if case=="shared_target":c["target"]["worker"]="tokenizart-worker"
            with self.subTest(case=case),self.assertRaises(ValueError):
                self.m.qualify_pair(candidate,r,c)

if __name__=="__main__":unittest.main()
