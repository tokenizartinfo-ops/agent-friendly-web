import {mkdir,writeFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
const root=resolve(process.env.AFW_C2_DIAG_ROOT);
await mkdir(join(root,'preflight-owned'),{recursive:true});
await writeFile(join(root,'preflight-owned','probe'),'C2_OAUTH_OWNED\n',{flag:'wx',mode:0o600});
process.stdout.write('AFW_C2_OAUTH_PREFLIGHT '+JSON.stringify({schema:'afw.c2-oauth-preflight.v1',written:true})+'\n');
