import {delegatedSchemaPreflightSql} from '../lib/delegated-project-repository.mjs';

// SQL only. This command never connects, migrates, opens OAuth or accepts identifiers.
if(process.argv.length!==2){
  console.error('No arguments accepted. Generates read-only schema checks only.');
  process.exitCode=1;
} else {
  console.log(delegatedSchemaPreflightSql());
}
