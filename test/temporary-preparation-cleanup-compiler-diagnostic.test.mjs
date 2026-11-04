import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {SourceTextModule,SyntheticModule} from 'node:vm';
test('TEMP diagnose unchanged production compiler refusal without changing tracked source',async()=>{
 const url=pathToFileURL(resolve('scripts/build-finite-native-package.mjs')).href;
 const source=await readFile(new URL(url),'utf8');
 const needle='}catch{fail();}';
 if(source.split(needle).length!==2)throw Error('unexpected actual compiler shape');
 const diagnostic=new SourceTextModule(source.replace(needle,"}catch(error){console.error('COMPILER_INNER_CAUSE',error?.stack??String(error));throw error;}"),{identifier:url,initializeImportMeta(meta){meta.url=url;}});
 await diagnostic.link(async specifier=>{
  const imported=await import(specifier.startsWith('.')?new URL(specifier,url).href:specifier);
  return new SyntheticModule(Object.keys(imported),function(){for(const key of Object.keys(imported))this.setExport(key,imported[key]);});
 });
 await diagnostic.evaluate();
 const sourceRevision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
 console.log('TRACKED_SOURCE_STATUS',execFileSync('git',['status','--porcelain=v1','--untracked-files=all','--','lib','worker','scripts','package.json','package-lock.json','tsconfig.json','.npmrc'],{encoding:'utf8'}));
 const result=await diagnostic.namespace.compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision});
 console.log('COMPILER_DIAGNOSTIC_COMPLETED',result.modules);
});
