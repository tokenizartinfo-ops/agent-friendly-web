# Administrative GET transport

1. RED tests for fixed origin/GET/paths, custody lookup, redirect denial, provider errors, malformed/oversized JSON and timeout with no late dispatch.
2. Extract shared validated resource-path construction from the readback adapter; implement lib/assistance-administrative-get-transport.mjs without runtime mount or credentials.
3. GREEN focused readback/transport tests and lint; mandatory independent review; exact CI tests/lint/build, then integrate and record remaining actual custody/administrative mutation/full baseline/hosted/PC-off/Max gates.
