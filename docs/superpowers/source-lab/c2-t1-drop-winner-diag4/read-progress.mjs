const exact = (v,names) => v !== null && typeof v === 'object' && !Array.isArray(v) &&
  Object.keys(v).length===names.length && Object.keys(v).every((key,i)=>key===names[i]);
const range = (x,lo,hi) => Number.isSafeInteger(x) && x>=lo && x<=hi;
const names = ['AssertionError','Error','TypeError','RangeError','SyntaxError','AggregateError','AbortError','TimeoutError'];
const codes = ['ERR_ASSERTION','ERR_TEST_FAILURE','ABORT_ERR','ETIMEDOUT','ENOENT','ERR_MODULE_NOT_FOUND','ECONNRESET','ERR_INVALID_ARG_TYPE'];
function validError(e) {
  if (!exact(e,['name','code','site']) || !(e.name===null || names.includes(e.name)) ||
      !(e.code===null || codes.includes(e.code))) return false;
  return e.site===null || (exact(e.site,['file','line','column']) &&
    /^(?:S0[0-689]|S1[012]|D07)$/.test(e.site.file) &&
    typeof e.site.file==='string' && range(e.site.line,1,999999) && range(e.site.column,1,999999));
}

// Normalize only validated complete records. The unmatched final bytes are never disclosed.
// Incomplete storage has an unknown frontier even if an earlier finite prefix is valid.
export function progress(raw,ids,condition,writerFault=false) {
  const rows=[], result={integrity:'empty',frontier:'unknown',events:rows,openCase:null,afterOpen:false};
  if (!Buffer.isBuffer(raw) || raw.length>32768) {result.integrity='ambiguous';return result;}
  const end=raw.lastIndexOf(10)+1, torn=end!==raw.length;
  let offset=0,index=0,stage=0,afterStage=0,anyThrow=false;
  const expected=[['action','enter'],['action','exit'],['count','enter'],['count','exit']];
  while(offset<end){
    const next=raw.indexOf(10,offset);
    try{
      const line=new TextDecoder('utf-8',{fatal:true}).decode(raw.subarray(offset,next));
      const r=JSON.parse(line);
      if(JSON.stringify(r)!==line||!exact(r,['sequence','elapsedMs','id','operation','edge','error'])||
        rows.length>=128||r.sequence!==rows.length+1||!range(r.elapsedMs,rows.at(-1)?.elapsedMs??0,330000)||
        !['enter','return','throw'].includes(r.edge)||
        (r.edge==='throw' ? !validError(r.error) : r.error!==null))throw 0;
      if(r.id==='AFTER'){
        if(r.operation!=='close'||afterStage>1||(r.edge==='enter')!==(afterStage===0))throw 0;
        afterStage++;
      }else{
        const [op,edge]=expected[stage];
        if(index>=ids.length||r.id!==ids[index]||r.operation!==op||(r.edge==='enter')!==(edge==='enter'))throw 0;
        stage=(stage+1)%4;
        if(stage===0)index++;
      }
      if(r.edge==='throw')anyThrow=true;
      rows.push(r);
    }catch{result.integrity='ambiguous';return result;}
    offset=next+1;
  }
  if(writerFault||torn){result.integrity=writerFault?'ambiguous':'torn';return result;}
  if(!rows.length)return result;
  const complete=index===ids.length && afterStage===2;
  result.integrity=complete?'complete':'prefix';
  result.afterOpen=afterStage===1;
  if(stage===1||stage===3)result.openCase={id:ids[index],operation:stage===1?'action':'count'};
  if(result.openCase&&result.afterOpen)result.frontier='case-and-after';
  else if(result.openCase)result.frontier=result.openCase.operation;
  else if(result.afterOpen)result.frontier='after-close';
  else if(complete&&condition==='timeout')result.frontier=anyThrow?'post-settlement-process-exit':'post-teardown-process-exit';
  else if(complete)result.frontier='all-settled';
  else if(stage===2)result.frontier='between-action-and-count';
  else if(index===ids.length&&afterStage===0)result.frontier='before-after';
  else result.frontier='between-cases';
  return result;
}

// Only terminated top-level result lines from this exact serial test file; no TAP proof.
export function nativePrefix(stdout,ids) {
  const result={integrity:'prefix',cases:[]};
  if(!Buffer.isBuffer(stdout)||stdout.length>1048576){result.integrity='ambiguous';return result;}
  const complete=stdout.lastIndexOf(10)+1;
  let text;
  try{text=new TextDecoder('utf-8',{fatal:true}).decode(stdout.subarray(0,complete));}
  catch{result.integrity='ambiguous';return result;}
  const lines=text.split('\n');
  if(lines[0]!=='TAP version 13'){result.integrity=complete?'ambiguous':'empty';return result;}
  let started=null;
  for(const line of lines.slice(1)){
    if(line.startsWith('# Subtest: ')){
      if(started!==null){result.integrity='ambiguous';return result;}
      started=line.slice(11);
      if(started!==ids[result.cases.length]){result.integrity='ambiguous';return result;}
    }else if(/^(?:not )?ok\b/.test(line)){
      const m=/^(not )?ok ([1-9]\d*) - (C2T1_[A-Z_]+)$/.exec(line);
      const i=result.cases.length;
      if(!m||m[2]!==String(i+1)||m[3]!==ids[i]||m[3]!==started){result.integrity='ambiguous';return result;}
      result.cases.push({id:m[3],status:m[1]?'fail':'pass'});
      started=null;
    }
  }
  if(complete!==stdout.length)result.integrity='torn';
  else if(!result.cases.length)result.integrity='empty';
  return result;
}

export function syntheticProgress(vectors,ids) {
  let checked=0;
  for(const t of vectors.controls){
    const rows=vectors.normalRows.slice(0,t.take).concat(t.append??[]);
    const raw=rows.map(([id,operation,edge],i)=>JSON.stringify({sequence:i+1,elapsedMs:i,id,operation,edge,
      error:edge==='throw'?{name:'Error',code:null,site:null}:null})+'\n').join('')+(t.tail??'');
    const r=progress(Buffer.from(raw),ids,t.condition);
    if(r.integrity!==t.expect[0]||r.frontier!==t.expect[1])throw Error('SYNTHETIC_PROGRESS_INVALID');
    checked++;
  }
  return checked;
}
