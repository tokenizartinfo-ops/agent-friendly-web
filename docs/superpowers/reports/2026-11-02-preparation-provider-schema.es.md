# AFW — preparación: esquema público y metadata fechada (2nov2026)

SOURCE/PREFLIGHT ONLY. operationalReadiness=false. No ensayo, OAuth, permiso/token, código remoto, activación, cron, Container o suscripción modificado.

Root ejecutó exactamente4GET mediante Cloudflare MCP, cuenta AFW85d0d5dadac3341a564f22ce885e9eec: listado de deployments per_page1 y metadata por UUID observado, únicamente QA y canary. Sin include=modules, texto de bindings privados, secretos, autores, otros proyectos ni sondeos de negocio. El puntero se observó una vez; no se confirmó estabilidad posterior ni cierre integral actual. Metadata de una versión no prueba ctx.container ni ejecución/retirada física.

Proyección saneada:

```json
[
  {
    "role": "qa",
    "observedAt": "2026-11-02T12:35:05.100Z",
    "deploymentId": "4c78c652-5e8a-43e6-a622-bb0def85b9a1",
    "versionId": "c570b60b-95dc-48e1-89f3-9c4651691dbc",
    "metadataByExactVersion": {
      "exports": {
        "IndependentClosure": {
          "type": "durable-object",
          "storage": "sqlite"
        },
        "PrivateQaPreregistration": {
          "type": "durable-object",
          "storage": "sqlite"
        }
      },
      "containers": null,
      "versionMetadataBindings": [
        {
          "name": "AFW_QA_VERSION",
          "type": "version_metadata"
        }
      ],
      "rateLimitBindings": [
        {
          "name": "AFW_QA_OCCURRENCE_RATE_LIMITER",
          "type": "ratelimit"
        }
      ],
      "ownedNamespaceBindings": [
        {
          "name": "AFW_INDEPENDENT_CLOSURE",
          "namespace_id": "070c4a7708eb4592a3ded7c117a88225",
          "class_name": "IndependentClosure"
        }
      ]
    },
    "metadataCurrentConfirmed": false,
    "operationalReadiness": false
  },
  {
    "role": "canary",
    "observedAt": "2026-11-02T12:35:06.040Z",
    "deploymentId": "7b5a3683-eb21-4f6c-95d4-639570595362",
    "versionId": "2607abae-cec3-4e35-89eb-8b8572262b54",
    "metadataByExactVersion": {
      "exports": {
        "AfwOwnEventNode": {
          "type": "durable-object",
          "storage": "sqlite",
          "container": "agent-friendly-web-delegated-canary-afwowneventnode"
        }
      },
      "containers": [
        {
          "class_name": "AfwOwnEventNode",
          "name": "agent-friendly-web-delegated-canary-afwowneventnode"
        }
      ],
      "versionMetadataBindings": [],
      "rateLimitBindings": [
        {
          "name": "DELEGATED_RATE_LIMITER",
          "type": "ratelimit"
        }
      ],
      "ownedNamespaceBindings": [
        {
          "name": "AFW_DOSSIER_EVENTS_NODE",
          "namespace_id": "d6fc71552de7494a863aca20365a572d",
          "class_name": "AfwOwnEventNode"
        }
      ]
    },
    "metadataCurrentConfirmed": false,
    "operationalReadiness": false
  }
]
```

Esquema primario consultado: [Create Worker Version](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/create/). La ruta Beta admite cuerpo JSON y módulos base64; deploy=false separa carga/activación. El descriptor inherit debe fijar version_id; los endpoints clásicos de scripts no admiten UUID explícito en ese campo. Declarative exports puede reconciliar namespaces, por lo que debe preservarse exactamente el conjunto/backend/enlace existente de clases DO: no tombstones, transferencias, nuevas clases/namespaces ni migrations por inferencia. Campos de petición y metadata observada requieren normalización explícita, no copiar todo el resultado del GET. Esto documenta esquema, no permiso/API aceptados en AFW.

Ruling Root para C2T3: transportar JSON real de esta ruta, no reutilizar multipart clásico. Mantener la declaración de Container existente de AfwOwnEventNode en los perfiles y en la fase finite; no publicar el actual marcador source containers[] como si conservara el enlace. Cualquier cambio de plantilla es SOURCE ONLY con tests/dry-run y hashes regenerados; no crea app/imagen/namespace/migración ni acredita capacidad física. El payload de API usa únicamente su gramática admitida, y el fingerprint normalizado conserva los algoritmos existentes. Ante deriva/reconciliación inesperada, pendiente administrativo; no borrar/recrear recursos automáticamente.
