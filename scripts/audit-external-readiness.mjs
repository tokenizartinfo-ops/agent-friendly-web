import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const origin='https://agentfriendlyweb.dev';
const provider='https://isitagentready.com/mcp';
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const directory=`output/external-audit-${stamp}`;
await mkdir(directory,{recursive:true});
const client=new Client({name:'afw-external-readiness-audit',version:'1.0.0'},{capabilities:{},versionNegotiation:{mode:'auto'}});
const summaries=[];
try {
 await client.connect(new StreamableHTTPClientTransport(new URL(provider)));
 const tools=await client.listTools();
 if(!tools.tools.some(tool=>tool.name==='scan_site'))throw Error('External scan tool unavailable');
 for(const profile of ['all','content','apiApp']) {
  const response=await client.callTool({name:'scan_site',arguments:{url:origin,profile}});
  if(response.isError)throw Error(`External scan failed: ${profile}`);
  const checkedAt=new Date().toISOString();
  const raw=JSON.stringify({checkedAt,provider,origin,profile,response},null,2);
  await writeFile(`${directory}/${profile}.json`,raw);
  const text=response.content.filter(part=>part.type==='text').map(part=>part.text).join('\n');
  const level=text.match(/\*\*Level (\d)\/5 -- ([^*]+)\*\*/);
  if(!level)throw Error('External response format changed; inspect stored receipt');
  summaries.push({profile,checkedAt,level:Number(level[1]),label:level[2],pass:(text.match(/^- PASS /gm)||[]).length,fail:(text.match(/^- FAIL /gm)||[]).length,failures:[...text.matchAll(/^- FAIL (\w+)/gm)].map(match=>match[1]),sha256:createHash('sha256').update(raw).digest('hex')});
 }
 await writeFile(`${directory}/summary.json`,JSON.stringify({provider,origin,numericScore:null,summaries},null,2));
 console.log(JSON.stringify({directory,numericScore:null,summaries},null,2));
} finally {await client.close();}
