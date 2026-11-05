# Root ruling — shared DATA codec versus effectful entry graph

5novUTC/4novArgentina. D0.1 compiler gate in test/mcp-qa-finite-bootstrap-compiler.test.mjs line16 excludes both initial-entry.mjs and initial-entry-records.mjs fromM. Concretefailure reports pureentry-records present; compilefunctionreturned but gateFAILED, not sourceacceptance.

Root inspected pinnedBASE7067c850: initial-anchors:3 imports decodeFiniteInitialEntry, with lines6–10 explicitsharedDATAdescriptor boundary. Fullinitial-entry-records exports onlyhash/encode/decode, imports initial-material-records DATA helpers; no I/O/env/authority. Existingstrictcleanup→anchors pathwasalreadyacceptedbeforeD0.1. Correctdirectionanchors→entryrecords→materialrecords, not reverse. Namespacealiasdoesnotauthorizearbitrarynewgraph.

Ruling: smallestTESTcorrectionmaycontinueassertQAentry+entryrecords, and MUSTstillforbidMeffectfulinitial-entry.mjs,bootstrap-source,residencydecoder,effectfulissuer/compiler/fs/esbuild. RemoveONLYerroneousMabsencecheckforthepureentry-recordscodec, withsharedDATAreason. No productcompiler guard/role/profilefallback relaxation ornewimport. Check relevantblobs/pathunchangedBASE→HEAD andpreserve failedgate.

One newfinalexact-headactualcompiler aftertestcorrection; recordallactualinvocations, includinginitialfunctionsuccess/failedassertion, newhead/hashmetadataandoriginalcaps. Inspect buildFiniteNativePackage's unavailable assertion foranyadditionalactualcompile ratherthanassumeonecall. This corrects oldtesttextagainstacceptedsharedDATAinvariant; doesnotgrantSDKaccess,Entry orruntimecapability. ActualQAaliasoperationremainsunperformed.
