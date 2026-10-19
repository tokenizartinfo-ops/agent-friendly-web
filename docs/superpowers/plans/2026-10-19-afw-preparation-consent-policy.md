# AFW detached preparation-consent policy — implementation

19oct2026. Implements ONLY Step1 of the consent/mount design; baseac8ddebc5cf122bf7adeff698ce646b665491138/PR510. Main CI pending when RED branch is created; final integration requires base and candidate checks.
Required executing-plans inline/TDD, one fresh whole-branch review. Owner authorizes this bounded source increment; no runtime/grant/registration/DDL change. GitHub branch and Actions only.

## Interface and boundary
New lib/delegated-preparation-consent-policy.mjs exports evaluatePreparationConsentChoice(choice,policy,clock).
choice is strict data {decision:'read'|'drafts'|'cancel'}.
policy is trusted SERVER data {enabled:true,requestedScopes,transactionStartedAt,transactionExpiresAt,trialStartedAt,trialExpiresAt}; epoch-ms safe integer dates0..8640000000000000. Both original windows nonempty,<=600000ms; transaction start must lie within trial.
clock is explicit strict data {now}; no clock read/fallback. now must lie at/after both starts and BEFORE both ends. This pure function cannot detect all host wall-clock rollback or authenticate its caller; original monotonic request lease, original persistent absolute times, SDK identity/transaction/schema checks remain future host responsibilities.

Only requested scope sets read or read+prepare; reject duplicates/extra/unknown/empty/accessor/sparse/oversized input before grant-like output. Canonicalize scope order. 'drafts' cannot be accepted from read-only request; 'read' downscopes explicitly; cancel yields no scope/expiry. No evidence combo in this first proposed profile.

Output fixed contract agentfriendly.preparation-consent-policy.v1; codes choice_valid/cancelled/invalid_choice/unavailable/expired; scopes=[] and expiresAt=null on non-valid choice. On choice_valid, expiresAt=min(original transaction end,original trial end,now+600000), all times explicit. Frozen result and scope array; no input refs or unknown/private data reflected.
All outputs refreshAllowed/consentRecorded/grantIssued/executionAllowed/chargeAllowed/publicationAllowed=false. A valid choice is a POLICY CANDIDATE, never recorded consent or issued grant/authority. Function does not alter existing read policy.

## Tasks
1. Commit this plan plus16 meaningful behavior cases; absent module only handled for exact ERR_MODULE_NOT_FOUND of that path. Observe Actions RED assertions before implementation.
2. Implement small pure helper with shared descriptor-safe readRecord/readList/clock validators. No IO, request handler, persistence, actual clocks, model, auth/identity/token, scope registration, transport, change to OAuth Worker or DDL. Observe exact-head test/lint/build GREEN.
3. One fresh whole-branch review. Important/Critical reproduceRED then one fix pass/GREEN; no re-review loop. Minor document or correct once if safe/proportional. Exact final tree/mainCI and carrying issue497 receipt close source task ledger; no documentation-only CI churn.

## Reversal, continuation and limits
Reviewed source revert only. No remote state or migration to reverse; preserve existing grants/history/custody/configuration.
Step2 actual SDK code/PKCE/consent/store, Step3 visual form, Step4 mount, Step5 populated migration/real finite trial remain UNIMPLEMENTED by this policy.
G2 CLOSED; no OTP/reconnect/catalog refresh/client widening. Container02382110, native event/usefulturn/withdrawal/PC-off and Max separate. operationalReadiness=false.
