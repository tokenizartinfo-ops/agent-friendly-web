import {assistanceSchemaPreflightSql} from '../lib/assistance-schema-preflight.mjs';
// Print fixed read-only SQL only. Never connect, migrate or accept identifiers.
const role=process.argv.length===3?process.argv[2]:null;
if(!['source','operations'].includes(role)){
 console.error('Use exactly source or operations. No database identifiers accepted.');
 process.exitCode=1;
}else console.log(assistanceSchemaPreflightSql(role));
