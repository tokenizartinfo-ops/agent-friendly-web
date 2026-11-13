# Task2 — sane direct-needs observation supplement

Read-only focused evidence clarification requested by independent Task2 reviewer. Root re-read only the SAME permitted KEYLESSverifyjob131855998335 log for run43414661211/attempt1/Sourceb8497734abe5f6afdcc7c518e82a591438353f14. No producer/contracts logs, archivebytes or secrets were read. Environment echo AFW_SUITE_NEEDS lines177–204 contains these three closed assignments; token line omitted. Root compared all3IDs/digests to complete current-run APIartifactmetadata, matching exactly.

```json
{
  "contracts": {
    "result": "success",
    "outputs": {
      "artifact-id": "14031575810",
      "artifact-digest": "5237f4d5c0ba8ff949d382afc91255fc5cdb9db462a1f9522d7b4828a97b1b14",
      "manifest-sha256": "99bbe55dea72d03cb651b69a4758f720519421e961ae91bd8b6e31e62b8e9652"
    }
  },
  "positive_prepare": {
    "result": "failure",
    "outputs": {
      "artifact-id": "14032036855",
      "artifact-digest": "aa9c330d881abfe6ed352a52b87593b884743c6912497269a5f7202f545e2644",
      "kind": "checkpoint"
    }
  },
  "reduction_prepare": {
    "result": "failure",
    "outputs": {
      "artifact-id": "14032480638",
      "artifact-digest": "201b4b831506a02966cc0d3af7bf067e138401fc15203e6363b926cdf85dd5d6",
      "kind": "reduction-checkpoint"
    }
  }
}
```

Manifest SHA is the observed contracts output, not a Root download/hash of pure contents. The contracts' pure-binding verification step succeeded according to current stepmetadata. No verifier-acceptance assertion is inferred from not_all_seven_success: overallrecord remains unavailable/publication_unavailable/absent/acceptedfalse. This supplement supports the report's assignment-observation sentence only; private custody proof remains unqualified. No Source change, run, retry, key or resource action.
