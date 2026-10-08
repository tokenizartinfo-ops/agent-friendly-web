# LOCAL STOP own-policy P2 fix

Parent repro confirmed stop checked policy before close() awaited digest/journal lookup. New real SQLite HTTP regression reproduces stopped200 after modewithdrawal inside previous.first(); RED retained.

Fix optional trusted beforeCloseCommit synchronous callback, invoked after allcloseawaits and immediately before batch. HTTP checks exact current ownpolicy/auth/principal/enrollment snapshot and abort. Only literaltrue admits; false/throw/Promise denies. No request callback/SQL allowed; legacy omitted hook unchanged. Expired/revoked plan remains closable with original effective policy; no in-memory rollback during an alreadyrunning batch claimed.

Native D1 regression withdraws policy during journal lookup, stop409 with zero stopped rows; restores original policy and revoked plan stop200. Targeted independent review found noP1/P2. Focal56/56, native1/1, full1198pass/1skip/0fail. Scoped modifiedJS lint0errors/warnings. Parent operations.test fixture investigations remain independent and that file was not edited. No production time fences relaxed.

No Worker mount/runtime/config/Access/token/remoteschema/Max/scheduler change. Parent transfer only this fixcommit after adaptere54f987; source dependencies alreadyintegrated. Separate hostobserver/adminclosure design paused until this fix published. Proxy/TLS/restrictedpolicy preserved; returneduse_default after native/Git commands.
