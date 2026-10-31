function freeze(value){if(value&&typeof value==='object'){for(const v of Object.values(value))freeze(v);Object.freeze(value);}return value;}
// Exact immutable CLOSED artifacts measured31Oct2026. Not a real-trial policy.
export const QA_CLOUD_CLOSED_PINS=freeze({
  "qaClosed": {
    "name": "agent-friendly-web-independent-closure-qa",
    "id": "c570b60b-95dc-48e1-89f3-9c4651691dbc",
    "configurationHash": "a8c8895f8375f4d09f01960e88bec8c3cac0a89f999e500f74fccf01733f7838",
    "bindingCount": 31,
    "module": {
      "name": "closed-rollback.mjs",
      "bytes": 395915,
      "sha256": "4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f"
    },
    "flagCount": 14
  },
  "qaCandidate": {
    "name": "agent-friendly-web-independent-closure-qa",
    "id": "0771c5f5-88b1-428a-b700-d51aa726b35f",
    "configurationHash": "658c2e343bbd9f3b5f265772d74a903879e8987e7d415b24af8f8e458eff063d",
    "bindingCount": 32,
    "module": {
      "name": "index.mjs",
      "bytes": 442780,
      "sha256": "19db0de03b23678eadf1ab7fd57d04d2b35f0872e3c833cc0d3c9bab469e5d2c"
    },
    "flagCount": 14
  },
  "canary": {
    "name": "agent-friendly-web-delegated-canary",
    "id": "2607abae-cec3-4e35-89eb-8b8572262b54",
    "configurationHash": "4fc9703cc8de929f766aa6aac3429d06c806ba2663ce63ec33a5754a030853c0",
    "bindingCount": 29,
    "module": {
      "name": "index.mjs",
      "bytes": 1830202,
      "sha256": "315cc3b310767bafe6c7928822b5acb8ec5ad168e21d94a55e6fea26592e46d3"
    },
    "deploymentId": "7b5a3683-eb21-4f6c-95d4-639570595362",
    "flagCount": 8
  },
  "operator": {
    "name": "agent-friendly-web-release-operator",
    "id": "855dc5c1-e757-49aa-a6f5-cb02f8d03ea4",
    "configurationHash": "8c37301871c7fc3cc0f7471fddfdeb039f418a078b065fdde44ba5cbe8b24b4c",
    "bindingCount": 7,
    "module": {
      "name": "index.mjs",
      "bytes": 1971922,
      "sha256": "31f28ee68c870450c6b814fa3713f02ad7233500552157915a7bd2e928777b51"
    },
    "deploymentId": "979026f8-9be0-439e-86d5-8bc493217f41",
    "flagCount": 3
  }
});
