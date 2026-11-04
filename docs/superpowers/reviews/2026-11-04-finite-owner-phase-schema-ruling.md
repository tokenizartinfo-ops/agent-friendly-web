# Root ruling — absent issuer schema in factual-only context

4nov2026. Applies only to active closed_ui/read_consent source reader fromBASE220b5bc3, not to issuer/grant/notice mutation or remote schema installation.

Concrete conflict: always SELECTing the future finite_preparation_issuer_fences table makes a wholly absent issuer prefix require uninstalled issuer schema, breaking legitimate non-authorizing factual/private GET contexts. Root allows exact-table schema observation instead of inventing a grant selector or requiring DDL.

- With wholly absent original issuer family and no original referenced GrantLink/relation, NEW first-primary SELECT on sqlite_schema for the exact table name may establish table ABSENT as factual DATA.
- This may qualify only closed_ui/read_consent. It proves neither global grant absence, schema readiness, issuer eligibility, user permission nor a mutation gate. No reserved UUID means no owner/client-wide grant query or guessed UUID.
- Any reservation/link/relation with absent schema denies. Failure/unknown/malformed table denies. No fallback to ordinary store, repair, retry or remote DDL.
- If table exists, NEW first-primary exact-original-A fence observation and orphan-fence denial remain. Every observation has original guard/holder/expiry checks.
- Include schema presence in both consistency snapshots. Appearance/change between snapshots denies; no refreshed clock or authority is minted.
- Focused native cases: absenttable+empty own prefix factual positive; reservation withouttable denial; present orphanfence denial; schema queryfailure and schemadrift denial. Actual granting paths still require ready original schema and Unit2a fence.

Ruling reason: table existence is not a prerequisite for reading an original publication fact when no issuer identity exists. Cost if wrong is source rework on isolated branch; no remote effect is authorized. Sole writer was instructed to record exact tests and this limitation in its report. Other strict initial/cleanup absence contracts unchanged. operationalReadiness=false;completePackage=false;PCoff=false.
