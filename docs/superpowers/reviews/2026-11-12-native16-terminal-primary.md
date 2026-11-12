# Native16 terminal primary audit

Root read raw primary GitHub run/jobs/artifact metadata after terminal. Run43229236340/attempt1/head19789b5f31935e0b5be00cbb24c5f45de2a0100a terminalFAILURE at13:56:12UTC. This is one consumed batch, not qualification. Case-level readonly cause remains unknown.

```json
{
  "source": "19789b5f31935e0b5be00cbb24c5f45de2a0100a",
  "run": 43229236340,
  "attempt": 1,
  "allSevenTerminal": true,
  "maxActiveNativeJobs": 3,
  "BWasSkipped": true,
  "BOverlapVerified": false,
  "rows": [
    {
      "id": 131219969596,
      "name": "contracts",
      "status": "completed",
      "conclusion": "success",
      "started_at": "2026-11-12T13:39:03Z",
      "completed_at": "2026-11-12T13:40:10Z",
      "durationMs": 67000
    },
    {
      "id": 131220486739,
      "name": "readonly",
      "status": "completed",
      "conclusion": "failure",
      "started_at": "2026-11-12T13:40:18Z",
      "completed_at": "2026-11-12T13:45:39Z",
      "durationMs": 321000
    },
    {
      "id": 131220487200,
      "name": "reduction_prepare",
      "status": "completed",
      "conclusion": "success",
      "started_at": "2026-11-12T13:40:18Z",
      "completed_at": "2026-11-12T13:54:10Z",
      "durationMs": 832000
    },
    {
      "id": 131220491777,
      "name": "positive_prepare",
      "status": "completed",
      "conclusion": "success",
      "started_at": "2026-11-12T13:40:18Z",
      "completed_at": "2026-11-12T13:54:02Z",
      "durationMs": 824000
    },
    {
      "id": 131228470578,
      "name": "positive_consume",
      "status": "completed",
      "conclusion": "success",
      "started_at": "2026-11-12T13:54:06Z",
      "completed_at": "2026-11-12T13:56:11Z",
      "durationMs": 125000
    },
    {
      "id": 131228550933,
      "name": "reduction_consume_a",
      "status": "completed",
      "conclusion": "success",
      "started_at": "2026-11-12T13:54:14Z",
      "completed_at": "2026-11-12T13:56:11Z",
      "durationMs": 117000
    },
    {
      "id": 131228555583,
      "name": "reduction_consume_b",
      "status": "completed",
      "conclusion": "skipped",
      "started_at": "2026-11-12T13:54:10Z",
      "completed_at": "2026-11-12T13:54:10Z",
      "durationMs": 0
    }
  ]
}
```

B's skipped zero-duration interval is excluded from active native-job peak. Root independently reconstructs peak3; this proves scheduling intervals only, not private originalI0/C0/replica facts or B overlap. No future terminal time was invented.

```json
[
  {
    "id": 13950822384,
    "name": "finite-budget-reduction_prepare-19789b5f31935e0b5be00cbb24c5f45de2a0100a-43229236340",
    "bytes": 27403684,
    "digest": "sha256:646aa74d7b4f4feabdca542f970485590548131ede9d31563dbb378ad120f65e",
    "expires": "2026-11-19T13:53:55Z",
    "expired": false
  },
  {
    "id": 13950256910,
    "name": "finite-budget-positive_prepare-19789b5f31935e0b5be00cbb24c5f45de2a0100a-43229236340",
    "bytes": 27504047,
    "digest": "sha256:fe1b1de738b80668d57e967aa941ef2ba3638ec3aaf0770095ff9935630b1180",
    "expires": "2026-11-19T13:53:44Z",
    "expired": false
  },
  {
    "id": 13950067554,
    "name": "finite-budget-positive_consume-19789b5f31935e0b5be00cbb24c5f45de2a0100a-43229236340",
    "bytes": 10023862,
    "digest": "sha256:8df7c953a10650cf1dd16d4737c5cbb7ed4da4dfde695d2a4b50052e044928b2",
    "expires": "2026-11-19T13:55:59Z",
    "expired": false
  },
  {
    "id": 13949344928,
    "name": "finite-budget-reduction_consume_a-19789b5f31935e0b5be00cbb24c5f45de2a0100a-43229236340",
    "bytes": 14818059,
    "digest": "sha256:eada1532ec0e161d6914333065c4a6906f1d6e07b748c7b7bdfdbd9bb51c02cc",
    "expires": "2026-11-19T13:56:01Z",
    "expired": false
  },
  {
    "id": 13949168304,
    "name": "finite-budget-readonly-19789b5f31935e0b5be00cbb24c5f45de2a0100a-43229236340",
    "bytes": 13680188,
    "digest": "sha256:8a408941c11e93e342fe2ccbf09763caf04e96fc5a1aaf12bde52da0fcaf19d5",
    "expires": "2026-11-19T13:45:23Z",
    "expired": false
  },
  {
    "id": 13949167467,
    "name": "finite-budget-fixed-preparation-19789b5f31935e0b5be00cbb24c5f45de2a0100a",
    "bytes": 111688,
    "digest": "sha256:a4a6f090b4df4d984749a11d7913de7a01590ba7e11f52c2c39f0af25ff1796b",
    "expires": "2026-11-19T13:39:46Z",
    "expired": false
  }
]
```

The five native payloads remain encrypted in GitHub, seven-day retention. Root downloaded none. Runner authenticated own exact assigned-ID inner inventory for all five executed native jobs, as reported by writer/public markers; this audit reads metadata only. Exact Q8/P1/D1–D2 success and readonlyfailure/Bskip are not summed into16PASS.

Finalsafe Source6251777232465e212a72a11c9628f7b1b18d7321/tree3f2319567677f89a3d67fcc06a5cee89ae4590ef/report7fd17ef3931a733009402993626500a6977b66f4; Root ref/fullworkflow/report matched, workflowEXACTf7a71/manual7false. Writer full3190/3183protected/0active/0closure-runs. All code stillreviewed5fb78c05. No native repair/retry authorized. Next preparation: a finite remote readonly-failure receipt inspector, code-review first, original ciphertext/AAD only. No realCF/runtime/permissions/key changes, Max or mail. Readinessfalse.
