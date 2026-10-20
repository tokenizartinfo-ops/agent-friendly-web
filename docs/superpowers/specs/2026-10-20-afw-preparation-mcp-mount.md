# AFW guarded preparation MCP mount — source design
20oct2026UTC/19octArgentina. Based07cc4690fd1929c10cfde83fbce6a97fd4c6afa/tree910a568bd7ec307805d57b6a881fd01981dc5f0d. Parent 2026-10-19-afw-preparation-consent-mount.md Step4. Owner authorized autonomous bounded source decisions; no operational opt-in inferred. G2CLOSED; operationalReadiness=false.

## Intent
Unify the already-tested SDK/HTTP/OAuth/host/repository/registrar composition into a detached default-closed mount. Qualify real asynchronous authentication and late connection cleanup before any production importer/route. Preserve original5s request lease, JSON4096/32768 caps, exact finite server pins and read-only choice; never restart a budget after authentication.
No new HTTP host, authenticated human-consent route, profile registration, migration, environment flag/configuration, remote credential or deployment. Source library can be consumed by a separately reviewed future host; no current production entrypoint imports it.

## Interface and authority
lib/delegated-preparation-mcp-mount.mjs exports createDelegatedPreparationMcpMount(options)=>async(request,executionContext)=>Response or null when disabled.
Strict plain own-data options: enabled,issuer,env,validateAccessToken,now?,monotonic?. Default absent/false touches no clocks/bindings/validators. Enabled requires current exact existing OAuth/preparation flags, window mode, canonical future end<=10min, project/client/Access pins, DB/KV/limiter and trusted internal SDK validator factory. Resource is exactly issuer+'/mcp'. Env/method/function/clock pins fenced and latch closed on observed drift.
validateAccessToken is trusted server configuration, never request/form/tool authority. Native fixture uses actual pinned SDK1.2.1 AS.validateToken; this module is not an identity provider, human Access verifier or consent/store host.
After genuine SDK protected callback, reuse readCapsulePreparationOAuthAuthorization, match fixed project/client/resource and expiry, permit only READ or READ+PREPARE. Reject evidence/unknown/duplicated scopes. Build existing repository/read-server and preparation OAuth host/registrar from that verified context; no domain/DTO/generator duplication. Read-only never registers preparation tools. All operations retain current primary grant/owner/claim/revision/schema admission through existing modules.

## Transport/lifecycle
Existing HTTP boundary admits bytes BEFORE OAuth and supplies the SAME opaque original lease through auth, host, both transports and bounded response. SDK ResourceServer requires READ. Use official isLegacyRequest and explicit JSON legacy transport; modern createMcpHandler uses same authorized server, legacy reject, exact host/route and JSON. Preserve real401Bearer challenge; no SSE/generic outbound HTTP or auto retry.
Check original lease/config before SDK handler factory, before/after classifier/connect/response. An auth continuation after deadline cannot create a server or register/invoke tools.
Mount owns each actual per-request MCP server. Close at response/abort/timeout and again after any pending connect resolves late; do not permanently memoize a closed server that can finish connecting later. No protocol response or work after closure.
A bounded maximum2000ms privilege-reducing cleanup grace uses executionContext.waitUntil, separate from and never extending the5s response/authorization budget. Attach rejection handlers to pending SDK tasks; grace expiry is not proof that a faulty upstream closed. No subscription/remote cleanup authority or success certificate. A never-returning validator cannot create a later server after the closed gate. The trusted validator can be noncancellable; no new validator attempt.
This grace exists solely for per-request in-memory server close. Source response never certifies remote resource closure.

## Tests and proof
First extend native SDK fixture/tests without module changes: default-closed probe and held-auth/held-connect expectations fail meaningfully against current inline composition. Held auth resumes ONLY after client has already received deadline rejection; actual AS.validateToken then runs, no new server after it. Actual SDK server late-connect is held by fixture prototype wrapper, released after rejection, then actual isConnected() must befalse after bounded drain. Instrumentation lives ONLY in fixture and forwards actual methods.
Test legacy+modern held auth, legacy pending connect closure, actual ingress cap before validation, exact schema absence under actual issued token and configuration drift; existing one-write/lostACK/manualread/revocation/visible-choice/codePKCE tests remain. No mocks that return DB/SDK success.
Real Miniflare/workerd/D1/KV and SDK/MCP clients only in existing Actions; no local install/build/containers/download. No generic native concurrency or expired-status summary certification; deferred PR514/515 minors remain.

## Boundaries
This closes only detached mount/source + synthetic native composition. Human Access/Origin/consent production host, populated additive migration, closed publication and NEW finite preparation trial remain separate. No current read-only G2 restart, OTP, client/scope/grant/secret/flags/remote schema/runtime event/Container/guard/PCoff/Max action. Source rollback reviewed revert; no data rollback.
