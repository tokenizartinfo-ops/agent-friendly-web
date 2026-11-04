// Explicit SYN external history/provider clocks. All factual readers/codecs run intact.
export function extendFiniteOwnerPhaseContext(entry){
 const imports="import {readPrivateQaFiniteOwnerContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';\n";
 const start=entry.indexOf(' async ownerSourceRead('),end=entry.indexOf(' async ownerEffectCount()',start);
 if(start<0||end<start)throw Error('Original native request harness missing');
 let method=entry.slice(start,end).replace('async ownerSourceRead(','async phaseContextRead(').replaceAll('readPrivateQaFiniteInitialOwnerSource(','readPrivateQaFiniteOwnerContext(');
 // Read-only journal transactions are real transactions; mutation methods throw.
 method=method.replace("s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;","s.put=noWrite;s.delete=noWrite;s.sync=noWrite;s.transaction=fn=>Reflect.apply(transaction,s,[tx=>fn({get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:noWrite,delete:noWrite,setAlarm:noWrite,deleteAlarm:noWrite})]);");
 method=method.replace('put=s.put,transaction=', 'put=s.put,del=s.delete,transaction=').replace('s.put=put;s.transaction=', 's.put=put;s.delete=del;s.transaction=');
 // Every independent current observation must begin with SELECT, never PRAGMA.
 method=method.replace('this.ownerRestore=restore;', `this.ownerRestore=restore;
  this.phasePrimary=[];db.withSession=(constraint)=>{if(constraint!=='first-primary')throw Error('SYN non-primary');const session=Reflect.apply(withSession,db,[constraint]),prepare=session.prepare,queries=[];this.phasePrimary.push(queries);session.prepare=sql=>{if(!/^SELECT\\b/i.test(sql.trim()))throw Error('SYN non-read/first SQL');queries.push(sql);return Reflect.apply(prepare,session,[sql]);};return session;};`);
 method=method.replace('catch{return{status:', 'catch(e){return{fixtureError:String(e),status:');
 return imports+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+method+" async phasePrimaryReads(){return this.phasePrimary;}\n");
}
