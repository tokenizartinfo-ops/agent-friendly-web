# Fenced owner issuer/notice — bounded design report

4 November 2026. DESIGN ONLY; no product edit, test/build/run, provider request or runtime qualification.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT GitHub source/docs; ORIGIN delegated-canary.agentfriendlyweb.dev not contacted; RESOURCE_TYPE docs branch/file; RESOURCE_ID docs/finite-fenced-owner-issuer-notice-20261104; ALLOWED_ACTION pinned source reads and docs-only expected-head commit. ROLLBACK revert the docs commit. Branch starts exactly220b5bc323315b7f107967548fb8958c0f8234f2/tree246e4f8867331f889cb99f4ebdef557e38e5b3c4. No advancing product branch was followed.

Read first: preparatory native-composition report atb60f8328df195307df62610968055b84ea766043. Supporting root ruling: SDK opaque uncertainty atbd99808f064fc4d02d0e41cccfb3494a59b55666. Current phase-context spec at pinned BASE remains planned; this report does not attribute its implementation to the sole active writer.

## Findings and selected boundary

1. [Ordinary OAuth](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/220b5bc323315b7f107967548fb8958c0f8234f2/lib/delegated-oauth-worker.mjs#L254) writes ordinary consent/grant before best-effort unavailable preparation forwards. It cannot be the finite fallback. Real SDK1.2.1 [approve](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-consent.ts#L210) does KV validation/delete, while [complete](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts#L6540) creates an SDK-internal KV grant/code; app grant and original D1 fence remain separate.
2. [Issuer records](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/220b5bc323315b7f107967548fb8958c0f8234f2/lib/mcp-qa-finite-preparation-issuer-records.mjs#L4) contain six fixed operations; [journal](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/220b5bc323315b7f107967548fb8958c0f8234f2/lib/mcp-qa-finite-preparation-issuer-journal.mjs) bounds14 rows. Task A preserves the fence/store/schema and adds a separate bounded one-use SDK provenance/ExpectedGrant journal. It never reconstructs consumption/barrier authority from rows.
3. [Current native receiver](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/220b5bc323315b7f107967548fb8958c0f8234f2/lib/mcp-qa-finite-owner-native-receiver.mjs) is pending-only; existing wire hardcodes choice. New unmounted SDK/issuer modules need their own strict fixed path grammar while reusing accepted lifetime primitives. Product defaults/private POST remain closed.
4. [Monitoring](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/220b5bc323315b7f107967548fb8958c0f8234f2/lib/dossier-monitoring-authority.mjs) has request uniqueness and grant-scoped sequence CAS but no original finite fence. Task B independently adds four named notice operations, exact ticket/event reservations and notice_consent facts. The phase must qualify before a notice event; the event is needed for later eligibility, avoiding a causal cycle.

**Next reviewable source unit:** Task A real SDK/native fenced issuance, after accepted closed_ui/read_consent reader. Task B notice SQL/source is separately rejectable. Neither mounts UI, enables publication or implements full cleanup. Provider own-SEND continuation stays a distinct future writer; no allowPending/syntheticFacts/ready DTO is proposed.

## Review points and evidence limits

The consume→grant pair must retain the same actual child lease, store instance and genuine consumption witness; the original<=5s budget includes intervening journal ACK work. ExpectedGrant preserves the exact tuple for later cleanup without minting authority.

Every current observation uses fresh first-primary SELECT-first and original UUID. Unknown SDK/native/SQL ACK keeps the original attempt pending; no resend/new ID/ordinary revoke catch. General source still rejects unknown SEND; only the surviving fixed native issuer position can recheck its own precise delta. This is no provider-publication continuation.

Pinned test/fixtures/finite-initial-entry-world.mjs:35–38 already replaces expired CEILING in its isolated SYN envelope. The design explicitly discloses that fixture source divergence and separates real native SQL-clock tests. It is not actual source eligibility, a remote pin change or runtime owner consent. Real SDK/reader/journal/store may not be replaced by success fixtures.

Permission reduction, restoration and SDK physical settlement remain separate under the adopted conditional ruling. Deployment-writer unknown still forbids restore. Third exact CLOSED original-M prearm precedes Selection/T0; full T0-derived setup stays separate (fd19e048 design), with no early full-policy requirement.

Deliverables: [spec](../specs/2026-11-04-finite-fenced-owner-issuer-notice.md), [plan](../plans/2026-11-04-finite-fenced-owner-issuer-notice.md). Root must review before implementation and preserve standing SDD/one-writer dispatch. Main missing dependency for Task A is accepted first-phase factual context; the original source/mount/cleanup/PC-off gates remain open. Source ceiling2026-11-03T02:59:00Z expired; operationalReadiness=false; completePackage=false; PCoff=false.
