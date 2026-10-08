# QA identity transport implementation

1. RED fixed GET/PUT origin/path/body and primary metadata validation; reject alternate action/fields; reject early writes, mutation after custody, clock regression, accessor inputs; deadline on custody/fetch/body and no late dispatch; redact PUT credentials/provider errors; successful action composition GET/PUT/GET.
2. Implement only lib/assistance-service-identity-transport.mjs, retaining the existing administrative GET-only contract unchanged.
3. GREEN focused tests/lint, independent review, exact final CI suite/lint/build; integrate and record remaining actual custody/catalog/hosted/active-disable/PC-off gates.
