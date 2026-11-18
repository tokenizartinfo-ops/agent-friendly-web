import {createHash} from 'node:crypto';
import {readFile, writeFile} from 'node:fs/promises';

const inputs = [
  {
    "from": "docs/superpowers/source-lab/c2-t1/body-00.txt",
    "to": "lib/mcp-qa-finite-owner-phase-context.mjs",
    "sha256": "02ee98da9239dd28948db664127c579ef69941e5e9c8151b1568527509815210",
    "before": "7eb8f28760de60f143e487eeb6988705059a0a44"
  },
  {
    "from": "docs/superpowers/source-lab/c2-t1/body-01.txt",
    "to": "lib/mcp-qa-finite-owner-preparation.mjs",
    "sha256": "fc227b59b3b5815eadffbd582f018cbd3e64ceaa596f07bc21a2031f7cd1d6e9",
    "before": "152e730f83af7ef063b6b1db89f8b0a779c2b60e"
  },
  {
    "from": "docs/superpowers/source-lab/c2-t1/body-02.txt",
    "to": "lib/mcp-qa-finite-owner-native-receiver.mjs",
    "sha256": "644973221d5dbc3e9bdb87888840c28c370f3b1ed6dff2c89534c4de0e8642f8",
    "before": "e760b3579a38f1dbb73b177bb73b06d814eb881f"
  },
  {
    "from": "docs/superpowers/source-lab/c2-t1/body-03.txt",
    "to": "worker/mcp-own/finite.mjs",
    "sha256": "7059b9ccc18fccd4da8dff42e9c04c4c7547afef9976852cbefbeef5175504f6",
    "before": "15441b6c0c779f733db65a3b59a3a9e1738d19dc"
  },
  {
    "from": "docs/superpowers/source-lab/c2-t1/body-04.txt",
    "to": "lib/mcp-qa-finite-owner-cleanup-scope.mjs",
    "sha256": "54e2261aac2bbe3d2446d7fa5911f2b921b4d8dc618943abd5d34e3f1125ca4b",
    "before": null
  },
  {
    "from": "docs/superpowers/source-lab/c2-t1/body-05.txt",
    "to": "lib/mcp-qa-finite-owner-cleanup.mjs",
    "sha256": "5911698fe8de72441d125414f879d725a677dbc26f3c1a40cdcd2999b6d4b40b",
    "before": "1a5a2583d266179cdd89f799c64199f29044fec5"
  },
  {
    "from": "docs/superpowers/source-lab/c2-t1/body-06.txt",
    "to": "lib/mcp-qa-finite-initial-cleanup.mjs",
    "sha256": "f08b914a1e668ad36b4848d0b61cbe8b44dfb3e54bc747480564a8aacc587df4",
    "before": "0a04ae3a4d74c2c7939b1654683054b1d5d751d4"
  },
  {
    "from": "docs/superpowers/source-lab/c2-get-winner-dependent/body-08-get-winner.txt",
    "to": "test/fixtures/finite-coupled-native.mjs",
    "sha256": "75ff602cecc209575fb967e63469facbbb47ef6335a2a1ccad66710225002046",
    "before": null
  },
  {
    "from": "docs/superpowers/source-lab/c2-get-winner-dependent/body-09-get-winner.txt",
    "to": "test/fixtures/finite-first-connection-publication.mjs",
    "sha256": "a615fbc760cd3a6b3a337a4592196d3cd807650df875865f0f8204f2d4d73f80",
    "before": "cede301c3e9cd95716ae2134f938dbb1d940e7a9"
  },
  {
    "from": "docs/superpowers/source-lab/c2-get-winner-dependent/body-10-get-winner.txt",
    "to": "test/fixtures/finite-initial-entry-world.mjs",
    "sha256": "7c8680d6b86b1ccc0acdcfecb4d8e4312e6d6971f36b00bd6dcf88c289309604",
    "before": "a7b730dc9be336528f0971544099f79d05758b1a"
  },
  {
    "from": "docs/superpowers/source-lab/c2-t1/body-12.txt",
    "to": "lib/mcp-qa-finite-owner-notice-get-forward.mjs",
    "sha256": "0db45a29028284a886b7e2f46b4ef0f8834b9cfefdeed2fc026aa72694a7c8e8",
    "before": "ea910f0fcdeade5a794ddaa60898706924e72f80"
  }
];
const edits = {
  "lib/mcp-qa-finite-owner-native-bridge.mjs": [
    [
      "   const response=await Reflect.apply(fetcher,stub,[forwarded]);",
      "   if(originalMethod==='GET')console.info('AFW_PREP_TRACE M_CALL');\n   const response=await Reflect.apply(fetcher,stub,[forwarded]);\n   if(originalMethod==='GET')console.info('AFW_PREP_TRACE M_HEADERS '+response.status);"
    ],
    [
      "   return finiteNativeChoiceHtml(response,bytes);",
      "   if(originalMethod==='GET')console.info('AFW_PREP_TRACE M_BODY_RETURN');\n   return finiteNativeChoiceHtml(response,bytes);"
    ]
  ],
  "lib/mcp-qa-finite-owner-phase-context.mjs": [
    [
      "   const received=connectionMetadata(request.headers),storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch;",
      "   const received=connectionMetadata(request.headers),storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch;\n   const trace=phase=>{if(received.method==='GET')console.info('AFW_PREP_TRACE '+phase);};\n   trace('QA_ENTRY');"
    ],
    [
      "   const grammar=qualifyFiniteOwnerChoiceRequest(original,bytes),initial=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease})),initialState=initial.second;",
      "   trace('QA_TIMELINE_START');\n   const grammar=qualifyFiniteOwnerChoiceRequest(original,bytes),initial=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease})),initialState=initial.second;\n   trace('QA_TIMELINE_RETURN');"
    ],
    [
      "   const choice=await wait(()=>continuePrivateQaFiniteOwnerChoice({ctx,env,request:original},originalLease,readChoice));",
      "   trace('QA_CHOICE_START');\n   const choice=await wait(()=>continuePrivateQaFiniteOwnerChoice({ctx,env,request:original},originalLease,readChoice));\n   trace('QA_CHOICE_RETURN');"
    ],
    [
      "    check();return new Response(html,{headers:",
      "    check();trace('QA_FORM');return new Response(html,{headers:"
    ]
  ],
  "test/fixtures/finite-coupled-native.mjs": [
    [
      "  counts:observer.counts,",
      "  counts:observer.counts,\n  async readFinalPreparation(){\n   const f=main,started=performance.now();\n   const response=await f.call('/connections/finite-prepare',{headers:headers(f)});\n   console.info('AFW_PREP_TRACE FINAL_HTTP '+response.status+' '+Math.ceil(performance.now()-started));\n   const text=await response.text();\n   assert.equal(response.status,200);\n   assert.match(text,/Preparar único ensayo finito/);\n  },"
    ]
  ]
};
function digest(algorithm, bytes) {
  return createHash(algorithm).update(bytes).digest('hex');
}
for (const {from, to, sha256, before} of inputs) {
  const content = await readFile(from);
  if (digest('sha256', content) !== sha256) throw new Error('Lab input changed');
  let original = null;
  try {
    original = await readFile(to);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const blob = original === null ? null : digest('sha1', Buffer.concat([
    Buffer.from('blob ' + original.length + '\0'), original,
  ]));
  if (blob !== before) throw new Error('Lab checkout changed');
  await writeFile(to, content);
}
for (const [path, substitutions] of Object.entries(edits)) {
  let body = await readFile(path, 'utf8');
  for (const [before, after] of substitutions) {
    if (body.split(before).length !== 2) throw new Error('Lab trace point changed');
    body = body.replace(before, () => after);
  }
  await writeFile(path, body);
}
