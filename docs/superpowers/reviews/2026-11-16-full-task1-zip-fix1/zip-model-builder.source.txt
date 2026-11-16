// OWN ZIP-focused fixture utility. Full fictional envelope stays unchanged except actual ZIP and API digest/size.
import {modelCrc} from './baseline370/model-builder.mjs';
function buildZipFixModel(example,vector,hash,deflate){
 const m=JSON.parse(JSON.stringify(example)),a=m.input.artifact,payload=Buffer.from(a.payloadText),name=Buffer.from(a.fileName),o=vector.options,method=o.method??0,dd=o.dd??true,signed=o.signed!==false,crc=modelCrc(payload);
 const localExtra=Buffer.from(o.localExtraHex??'','hex'),centralExtra=Buffer.from(o.centralExtraHex??'','hex'),compressed=method===8?deflate(payload):payload;
 const l=Buffer.alloc(30);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(o.localVersion??o.version??20,4);l.writeUInt16LE(dd?8:0,6);l.writeUInt16LE(method,8);l.writeUInt16LE(name.length,26);l.writeUInt16LE(localExtra.length,28);
 const fields=dd&&o.localFields!=='match'?[0,0,0]:[crc,compressed.length,payload.length];
 if(o.contradict==='crc')fields[0]=(crc^1)>>>0;if(o.contradict==='compressed')fields[1]=compressed.length+1;if(o.contradict==='length')fields[2]=payload.length+1;
 l.writeUInt32LE(fields[0],14);l.writeUInt32LE(fields[1],18);l.writeUInt32LE(fields[2],22);
 let d=Buffer.alloc(0);if(dd){d=Buffer.alloc(signed?16:12);let n=0;if(signed){d.writeUInt32LE(0x08074b50);n=4;}d.writeUInt32LE(crc,n);d.writeUInt32LE(compressed.length,n+4);d.writeUInt32LE(payload.length,n+8);}
 const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(o.centralVersion??o.version??20,6);c.writeUInt16LE(dd?8:0,8);c.writeUInt16LE(method,10);c.writeUInt32LE(crc,16);c.writeUInt32LE(compressed.length,20);c.writeUInt32LE(payload.length,24);c.writeUInt16LE(name.length,28);c.writeUInt16LE(centralExtra.length,30);
 const directory=Buffer.concat([c,name,centralExtra]),offset=l.length+name.length+localExtra.length+compressed.length+d.length,e=Buffer.alloc(22);e.writeUInt32LE(0x06054b50);e.writeUInt16LE(1,8);e.writeUInt16LE(1,10);e.writeUInt32LE(directory.length,12);e.writeUInt32LE(offset,16);
 const zip=Buffer.concat([l,name,localExtra,compressed,d,directory,e]);a.archiveBase64=zip.toString('base64');a.listing.artifacts[0].size_in_bytes=zip.length;a.listing.artifacts[0].digest='sha256:'+hash(zip);
 return {input:m.input,trustedExpected:m.trustedExpected,archive:zip};
}
export {buildZipFixModel};
