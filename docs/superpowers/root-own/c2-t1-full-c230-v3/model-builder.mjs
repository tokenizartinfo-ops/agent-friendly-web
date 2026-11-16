// OWN-only deterministic synthetic model/ZIP utility. Never executes Source DATA.
function modelCopy(v){return JSON.parse(JSON.stringify(v));}
function modelPatch(root,p){
 const [op,path,value]=p;let at=root;for(const key of path.slice(0,-1))at=at[key];const key=path.at(-1);
 if(op==='set')at[key]=modelCopy(value);
 else if(op==='delete')delete at[key];
 else if(op==='splice')at[key].splice(...value);
 else if(op==='reverseKeys'){const old=at[key];at[key]=Object.fromEntries(Object.entries(old).reverse());}
 else throw Error('MODEL_PATCH');
}
function modelCrc(bytes){let c=0xffffffff;for(const b of bytes){c^=b;for(let k=0;k<8;k++)c=c&1?(c>>>1)^0xedb88320:c>>>1;}return(c^0xffffffff)>>>0;}
function modelZip(payload,name,opts={},deflate){
 const bytes=Buffer.from(payload),n=Buffer.from(opts.name??name),method=opts.method??0,dd=opts.dd??false,flags=dd?8:0,crc=modelCrc(bytes);
 let compressed=method===8?deflate(bytes):bytes;if(opts.tail)compressed=Buffer.concat([compressed,Buffer.from('deadbeef','hex')]);
 const local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(flags,6);local.writeUInt16LE(method,8);
 if(!dd){local.writeUInt32LE(crc,14);local.writeUInt32LE(compressed.length,18);local.writeUInt32LE(bytes.length,22);}local.writeUInt16LE(n.length,26);
 let descriptor=Buffer.alloc(0);if(dd){const signed=opts.ddSigned!==false;descriptor=Buffer.alloc(signed?16:12);let d=0;if(signed){descriptor.writeUInt32LE(0x08074b50);d=4;}descriptor.writeUInt32LE(crc,d);descriptor.writeUInt32LE(compressed.length,d+4);descriptor.writeUInt32LE(bytes.length,d+8);}
 const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt16LE(flags,8);central.writeUInt16LE(method,10);central.writeUInt32LE(crc,16);central.writeUInt32LE(compressed.length,20);central.writeUInt32LE(bytes.length,24);central.writeUInt16LE(n.length,28);
 const start=local.length+n.length+compressed.length+descriptor.length,dir=Buffer.concat([central,n]),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(1,8);end.writeUInt16LE(1,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(start,16);
 let out=Buffer.concat([local,n,compressed,descriptor,dir,end]);
 if(opts.corrupt==='crc'){out.writeUInt32LE((crc^1)>>>0,14);out.writeUInt32LE((crc^1)>>>0,start+16);}
 if(opts.corrupt==='descriptor'){out.writeUInt32LE((crc^1)>>>0,30+n.length+compressed.length+(opts.ddSigned===false?0:4));}
 if(opts.corrupt==='localName')out[30]^=1;
 if(opts.corrupt==='bounds')out.writeUInt32LE(start+1,out.length-6);
 if(opts.corrupt==='extraEntries'){out.writeUInt16LE(2,out.length-14);out.writeUInt16LE(2,out.length-12);}
 if(opts.corrupt==='trailing')out=Buffer.concat([out,Buffer.from([0])]);
 if(opts.corrupt==='truncate')out=out.subarray(0,out.length-1);
 if(opts.corrupt==='flags'){out.writeUInt16LE(1,6);out.writeUInt16LE(1,start+8);}
 return out;
}
function buildFullModel(seed,vector,hash,deflate){
 const frames=modelCopy(seed.frames),trustedExpected=modelCopy(seed.trustedExpected),input=modelCopy(seed.input);
 for(const p of vector.framePatches??[])modelPatch(frames,p);
 if(vector.sync!==false)frames[7].observations=frames.slice(2,6).map(v=>modelCopy(v.observation));
 const markers=['AFW_C2_SOURCE_SYNTHETIC_V2_FIX1','AFW_C2_DEPENDENCY_CONTROL','AFW_C2_SOURCE_MODE_V2','AFW_C2_SOURCE_MODE_V2','AFW_C2_SOURCE_MODE_V2','AFW_C2_SOURCE_MODE_V2','AFW_C2_SOURCE_CUSTODY_V2','AFW_C2_SOURCE_RECEIPT_V2'];
 let lines=frames.map((v,i)=>markers[i]+' '+JSON.stringify(v));
 if(vector.wire==='missing')lines.splice(4,1);
 if(vector.wire==='duplicate')lines.push(lines[7]);
 if(vector.wire==='reorder')[lines[0],lines[1]]=[lines[1],lines[0]];
 if(vector.wire==='noncanonical')lines[0]=lines[0].replace('{','{ ');
 if(vector.wire==='duplicateKey')lines[0]=lines[0].replace('{"schema":','{"schema":"bad","schema":');
 if(vector.wire==='doublePhysical')lines[0]+=' '+lines[0];
 if(vector.wire==='diagnostic')lines.splice(7,0,'AFW_C2_SOURCE_DIAGNOSTIC_V2 '+JSON.stringify({schema:'afw.c2-source-diagnostic.v2'}));
 if(vector.wire==='bodyCap')lines[0]+=' '.repeat(2049);
 const command=seed.command;
 let raw=['##[group]Run '+command,command,'##[endgroup]',...lines].map((s,i)=>'2037-01-02T03:04:'+String(i<3?30:31+i-3).padStart(2,'0')+'.0000000Z '+s).join('\n')+'\n';
 if(vector.log==='wrongCommand')raw=raw.replaceAll(command,command+'-alias');
 if(vector.log==='unwrapped')raw=raw.replaceAll(/2037-01-02T03:04:\d\d\.0000000Z /g,'');
 if(vector.log==='outside')raw=raw.replaceAll('03:04:','03:09:');
 if(vector.log==='nan')raw=raw.replace('2037-01-02','2037-99-02');
 if(vector.log==='badCalendar')raw=raw.replaceAll('2037-01-02','2037-02-30');
 if(vector.log==='hidden')raw=raw.replace('AFW_C2_SOURCE_SYNTHETIC','prefixAFW_C2_SOURCE_SYNTHETIC');
 if(vector.log==='secondCommand')raw+='2037-01-02T03:04:39.0000000Z ##[group]Run '+command+'\n';
 if(vector.log==='noFinalLF')raw=raw.slice(0,-1);
 if(vector.logPadding)raw='x'.repeat(vector.logPadding)+'\n'+raw;
 input.transport.rawLog=raw;
 if(vector.treeCount)for(let i=input.tree.tree.length;i<vector.treeCount;i++)input.tree.tree.push({path:'fictional-extra/'+i,mode:'100644',type:'blob',sha:'c'.repeat(40),size:1});
 if(vector.treePadding)input.tree.padding='x'.repeat(vector.treePadding);
 let payload=JSON.stringify(frames[7])+'\n';if(vector.payload==='space')payload+=' ';if(vector.payload==='different')payload=JSON.stringify({...frames[7],extra:true})+'\n';
 const zip=modelZip(payload,seed.fileName,vector.zip??{},deflate);
 input.artifact.archiveBase64=zip.toString('base64');input.artifact.payloadText=payload;
 const item=input.artifact.listing.artifacts[0];item.size_in_bytes=zip.length;item.digest='sha256:'+hash(zip);
 for(const p of vector.inputPatches??[])modelPatch(input,p);for(const p of vector.expectedPatches??[])modelPatch(trustedExpected,p);
 return {input,trustedExpected,frames};
}
export {buildFullModel,modelZip,modelPatch,modelCrc};
