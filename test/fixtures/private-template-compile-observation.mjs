import {build as actualBuild} from 'esbuild';
export async function build(options){
 const result=await actualBuild(options),text=result.outputFiles[0].text;
 const slot='__AFW_PRIVATE_CONFIRMATION_POLICY_V1_7fbe62d8c5434d0c9b171f392c7780dd__';
 globalThis[Symbol.for('afw.ci.private-template.compile-observation')]?.({
  bytes:Buffer.byteLength(text),rawSlots:text.split(slot).length-1,
  doubleQuotedSlots:text.split(JSON.stringify(slot)).length-1,
  singleQuotedSlots:text.split("'"+slot+"'").length-1
 });
 return result;
}
