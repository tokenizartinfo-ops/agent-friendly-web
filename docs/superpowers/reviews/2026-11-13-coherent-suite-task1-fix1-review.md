# Coherent suite Task1 fix1 scoped re-review

Verdict: CHANGES REQUIRED. Exact qualification43399028588/1 passed8skip+2success/6families/16ZIP, but a negative assertion can pass in setup rather than intended validator. ActualTask2HELD.
F2 pure finalizer ADDRESSED; F3 observedAt/peak/ownership ADDRESSED; F5 structured pair/self-control failure records ADDRESSED; F7 operation limits ADDRESSED.

## F1 — Important: Mutation setup exceptions still masquerade as validator rejection

Job and step selection is now anchored. The custody rename at L447 changes the identifier that mutateActual uses to find the edited step at L391. Lookup fails at L386. The outer assert.throws counts that setup exception as the expected validator rejection. Construct and verify each mutation before entering assert.throws. For renames, verify the edited range using its original boundaries or new ID. Correct the report’s claim that every target reached its validator.

## F4 — Important: Missing or partial SAFE bypasses available direct assignments

Valid suite pairs, including valid nonpass pairs with proof:null, now use the exact eight-job inventory, running receiver, attempt-1 endpoint and direct assignments. But reconcileSuite returns immediately when route.valid===null. A missing or partial B SAFE suppresses the Jobs observation and every current metadata lookup even when earlier jobs have complete direct outputs. The FIX1 ruling requires reconciliation of every available assignment. Carry out that read-only reconciliation independently of pair availability, retain the original publication classification and accepted:false, and test the expected metadata calls.

## F6 — Important: Absent and partial SAFE controls removed; real-path coverage incomplete

The shared production projection and reconciliation, whole F8 block hash, publication guard checks and 26-binding inventory are substantive corrections. The identity-rename assertion above still bypasses its validator. The rewrite also removed the original direct tests for both SAFE outputs absent and a known ID with missing digest. Restore those receiver cases, assert zero SAFE ZIP requests and retained known ID, and exercise F4 through the shared final path.

## F8 — Important: New Important: failed receipt write suppresses failure publication

The B publisher eagerly parses both optional JSON files before inspecting the six authoritative step outcomes. A failed write can leave a truncated pure-assignment.json or suite-proof.json. JSON.parse then throws before projectSuiteOutcome, preventing publication of pure_unverified or proof_unverified and the known custody assignment. Read pure evidence only after successful pure_binding, and read proof only after successful validation of the success kind. Exercise both failure paths with unreadable or truncated inert receipts.

Primary immutable Source18183bd24aa3cbacb74119e54ef28d6671bd45d5/F7: F1 L380–393/444–449; F4 L665–686; F6 L546–563 plus removed oldcontrols packagea4cff06c L403; F8 L297–300/2804–2806/2828–2836. Earlier addressed findings retain their scope; no new Critical, no out-of-scope observations, no execution/private read/mutation by reviewer. Closed Source0ade and original reportprefix preserved. Full fix review packagea4cff06c.
