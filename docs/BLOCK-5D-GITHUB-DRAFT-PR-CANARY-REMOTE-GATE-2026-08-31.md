# Block 5D - GitHub Draft PR Canary - Gate remoto

## Estado

`PASS` remoto el 2026-08-31. Se ejecuto exclusivamente la apertura de un Draft PR en un repositorio sintetico. No hubo merge, deployment, DNS, CMS ni escritura sobre un origen real.

## Target verificado

- Repositorio: `tokenizartinfo-ops/agent-friendly-web-synthetic-origin`.
- Visibilidad: publica.
- Rama base: `main`.
- Estado previo de `main`: solo `README.md`; sin `llms.txt`.
- Rama canary: `afw/canary-a7746caa7c28`.
- Commit canary: `abd9338e5111cdef7ebc670432d8511d78e3f56d`.
- Draft PR: `https://github.com/tokenizartinfo-ops/agent-friendly-web-synthetic-origin/pull/1`.

## Recibo

- Contrato: `agentfriendly.github-draft-pr-receipt.v1`.
- Receipt ID: `ghreceipt-5642ac8be1f3509c352f0e64`.
- Run ID: `ghrun-a7746caa7c28e23b78092a69`.
- Approval ID: `approval-gabriel-block5d-remote-v1`.
- Estado: `submitted_as_draft`.
- `draft=true`.
- `mergeAllowed=false`.
- `remoteMutation=true`.
- Archivo: `llms.txt`.
- SHA-256: `fd6d926cec8b1924ca93673d52faa3a4d11b86a9b902a9e0fae1334f1bf54256`.

## Verificacion posterior read-only

- GitHub informa `state=OPEN`, `isDraft=true` y `mergedAt=null`.
- El diff contiene exactamente un archivo: `llms.txt`.
- El cambio agrega 19 lineas y no elimina ninguna.
- El hash descargado desde la rama canary coincide con el hash aprobado.
- Consultar `llms.txt` sobre `main` devuelve `404`, confirmando que la base no cambio.
- La rama por defecto permanece `main`.

## Frontera de credenciales

La operacion uso la sesion local de GitHub CLI almacenada en el keyring del sistema. El contrato recibio un cliente efimero inyectado y el alias `secretbroker://github/agent-friendly-web/block5d-synthetic-draft-pr`; ningun valor de token se escribio en el run, recibo, repositorio o documentacion.

## Lo que no autoriza este gate

El Draft PR debe permanecer sin fusionar. Este resultado no autoriza merge, auto-merge, release, Pages, Worker, deployment, DNS, CMS ni reutilizacion de la capacidad sobre otro repositorio o archivo. El siguiente paso es revision humana del diff y decision explicita entre conservar el Draft abierto o cerrarlo sin merge.
