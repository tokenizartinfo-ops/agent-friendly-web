import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { describeAgentCatalog } from '../../lib/agent-consumption-catalog.mjs';
import { previewAgentQuote } from '../../lib/agent-consumption-quote.mjs';
import { projectAgentNextStep } from '../../lib/agent-consumption-continuity.mjs';
import { consumeAgentNextStep } from './reference-client.mjs';

const NOW=Date.parse('2026-10-19T13:00:00.000Z');
const iso=offset=>new Date(NOW+offset).toISOString();
const bytes=value=>Buffer.byteLength(JSON.stringify(value),'utf8');

// All identities, source content, capabilities and dates here are fixtures,
// not runtime declarations, client consent or commercial terms.
export function buildAgentConsumerDemo(){
  const input={revision:'fixture-catalog-not-an-offer',entries:[
    {operationId:'afw.catalog.describe',purpose:'Describe capability metadata.'},
    {operationId:'afw.quote.preview',purpose:'Preview conditions before accepting work.'},
    {operationId:'afw.dossier.next_step',purpose:'Read one dated next step.'},
  ].map(row=>({...row,contractVersion:'1',effect:'read',availability:'source_only',verification:null,pricingState:'unpriced',unit:'site_task'}))};
  const catalog=describeAgentCatalog(input,{now:NOW});
  const quote=previewAgentQuote({operationId:'afw.dossier.next_step',contractVersion:'1',serviceMode:'agentic',
    scopeRef:'fixture-scope',scopeRevision:1,units:1,catalogRevision:input.revision,maxTotalMinor:0},
  {catalog:input,policy:null,now:NOW});
  const fullFixture={projectRef:'fixture-project',revision:1,organization:'Sitio ficticio',
    notes:'Este contenido ficticio no representa un expediente real. '.repeat(100)};
  const view={projectRef:'fixture-project',revision:1,observedAt:iso(0),expiresAt:iso(5000),
    nextStep:{id:'answer.contentSources',kind:'provide_information',label:'¿Qué fuentes podemos usar?',reason:'Respaldar la información declarada.'},
    missingInput:{key:'contentSources',label:'¿Qué fuentes podemos usar?'},evidenceRefs:[],capsuleRef:null};
  // Internal synthetic context only; no request is sent and no caller can use
  // this authorized flag to grant access to the actual OAuth service.
  const data=projectAgentNextStep(view,{authorized:true,principalRef:'fixture-principal',projectRef:'fixture-project',
    expectedRevision:1,grantExpiresAt:iso(10000)},{now:NOW});
  const envelope={status:200,data},config={projectRef:'fixture-project',expectedRevision:1,now:NOW};
  const outcomes={
    valid:consumeAgentNextStep(envelope,config),
    conflict:consumeAgentNextStep(envelope,{...config,expectedRevision:2}),
    expired:consumeAgentNextStep(envelope,{...config,now:NOW+5000}),
    withdrawn:consumeAgentNextStep({status:403,code:'delegated_access_denied'},config),
  };
  return {synthetic:true,notDeploymentEvidence:true,networkCalls:0,catalog,quote,outcomes,measurement:{
    kind:'synthetic_fixture_utf8_bytes',fullFixtureUtf8Bytes:bytes(fullFixture),
    nextStepUtf8Bytes:bytes(envelope),consumerContextUtf8Bytes:bytes(outcomes.valid.context),
    modelTokens:null,providerCost:null,isEfficiencyEvidence:false,
  }};
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))
  process.stdout.write(JSON.stringify(buildAgentConsumerDemo(),null,2)+'\n');
