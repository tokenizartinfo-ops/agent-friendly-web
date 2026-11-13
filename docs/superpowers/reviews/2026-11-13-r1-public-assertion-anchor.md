# Historical R1 assertion — public-source/TAP alignment only

While Task2 runs, Root inspected only fixed PUBLIC Original source test/fixtures/finite-budget-world.mjs at19789b5f31935e0b5be00cbb24c5f45de2a0100a, lines1160–1185; GitHub blob5fb78c057b7e80260ae683abf4af892767ce110e matches approved baseline. No Source execution, new Raw read or Native probe.

Approved public historical TAP projection for R1 (run43229236340) recorded ERR_ASSERTION/strictEqual, actual booleanfalse, expected booleantrue, stack budget_world line1178,column109. Exact source line:

```javascript
  assert.equal(sdkRoot.I0,plan.I0);assert.equal(sdkRoot.C0,plan.C0);assert.equal(sdkRoot.C1,plan.C1);assert.equal(sdkReference!==null,caseName==='R1');
```

The four assert.equal calls begin at columns3/36/69/102. Column109 points inside the fourth equal method. Combined with approved false/true scalar types and R1case, this maps the historical assertion to sdkReference!==null expectedtrue. Source obtains sdkReference immediately before from the first reference.rows key ending :reference, else null. Thus the historical failure is consistent with absence of that selected SDK-reference row at this check; the pointer/scalar mapping identifies the asserted predicate, not why it was absent. No row keys/values/identifiers are exposed.

This is separate from the inspector rejecting the ownerReference receipt in grouphttp. It does not reveal response status, HTTP record count, timing cause, actual write sequence, authority/grant result, or repair; those remain unknown. It does not prove current code still fails R1. The later isolated R2 PASS is another Source/run/window and does not answer this R1 question. Task2 first HTTP guard still pending at writing. No new execution or Source change is authorized by this note. All five readiness flags false.

[Original public source](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/19789b5f31935e0b5be00cbb24c5f45de2a0100a/test/fixtures/finite-budget-world.mjs#L1178)
