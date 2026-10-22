// CI-only resolve-hook wrapper: preserve the real compiler and cross its await.
import {buildMcpReleaseOperator as actualBuild} from '../../scripts/build-mcp-release-operator.mjs';
export async function buildMcpReleaseOperator(bundle){
 const fault=globalThis[Symbol.for('afw.ci.named-confirmation.compile-fault')];
 if(typeof fault!=='function')throw Error('CI compilation fault is not installed');
 fault('before',bundle);
 const result=await actualBuild(bundle);
 fault('after',bundle);
 return result;
}
