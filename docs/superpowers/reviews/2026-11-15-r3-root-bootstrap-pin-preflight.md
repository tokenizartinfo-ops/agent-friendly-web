# Root own bootstrap matrix pin check
15nov2026. Controller-only check087099540c15caacecc5f629151502aa609ff6d2. It rejects retired matrix digests anywhere in the next trusted bootstrap and rejects a separate literal matrix assertion inconsistent with the independently pinned current matrix. This supplements full helper/manifest/package/prefix/Core verification, not a syntax or Source execution check.

Actual failedf04 F7 was rejected in OWN RAM by the check;2 positive fixture strings and5 negative cases passed (one actual bad F7 plus4 retired pin strings). No Source code evaluated/executed/rewritten. Previous Source remainsclosed1fe20347bd9c86d9343799a5994f9f3e3a4a339f with35abeda/1600042B prefix. Root missed the stale redundant assertion in the previous gate and records the correction rather than treating the missing controls as a pass.

```javascript
function(f7,currentMatrixHash,retiredMatrixHashes){
 const need=(v,m)=>{if(!v)throw Error("Root bootstrap pins: "+m);};
 need(typeof f7==="string"&&/^[a-f0-9]{64}$/.test(currentMatrixHash),"input");
 need(Array.isArray(retiredMatrixHashes)&&retiredMatrixHashes.every(h=>/^[a-f0-9]{64}$/.test(h)&&h!==currentMatrixHash),"retired");
 for(const hash of retiredMatrixHashes)need(!f7.includes(hash),"retired-matrix-pin");
 const re=/assert\.equal\(sha\(Buffer\.from\(payload\.helpers\[['"]matrix\.json['"]\]\)\),\s*(['"])([a-f0-9]{64})\1\);/g;
 for(const match of f7.matchAll(re))need(match[2]===currentMatrixHash,"literal-matrix-pin");
 return {accepted:true,SourceExecuted:false};
}
```

Root's next release must run this own check against the actual final F7, current predeclared matrix SHA and known retired hashes, along with full crypto/scope/receivers. Prefer deriving any redundant bootstrap check from the same validated helper manifest to avoid independent literals. This is a controller gate requirement, not a Source patch or new run authorization. Scoped fix1 review remains in progress; I3 and Native remain held.
