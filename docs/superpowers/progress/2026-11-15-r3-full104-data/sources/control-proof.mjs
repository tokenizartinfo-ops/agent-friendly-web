import {shape} from './shape.mjs';
import schema from './controls-schema.json' with {type:'json'};
const ids=["A01","A02","A03","A04","D01","D02","D03","D04","D05","D06","D07","D08","D09","D10","D11","D12","D13","P01","P02","P03","P04","P05","P06","P07","P08","P09","P10","P11","P12","P13","P14","P15","P16","P17","P18","P19","P20","P21","P22","P23","P24","P25","F01","F02","F03","F04","F05","F06","F07","F08","F09","B01","B02","B03","B04","B05","B06","B07","B08","B09","B10","B11","B12","B13","W01","W02","C01","C02","C03","C04","C05","D14","P26","F10","E01","E02","E03","E04","E05","E06","O01","O02","O03","O04","O05","S01","E07","T01","F11","A05","U01","U02","U03","U04","H01","L01","L02","L03","L04","L05"],mutants=[{"id":"M_RAW","change":"omit strict raw framing in inner raw receiver; outer normalized receiver retains sample semantics","expectedFailedIds":["D02"]},{"id":"M_PROVENANCE","change":"omit full before-after guard in BOTH inner and final outer strong Source receivers","expectedFailedIds":["P06"]},{"id":"M_OUTPUT","change":"omit delivery envelope/record closed-schema guard in BOTH Python parent and final Node outer; held authority and semantic rules remain","expectedFailedIds":["B05","U01"]},{"id":"M_ASSOC","change":"omit normalized sample semantic receiver only in final Node outer; inner emitter fixture sends impossible not_observed","expectedFailedIds":["S01"]}];
export function admitControls(r,c){
 shape(r,schema);
 for(const[k,v]of Object.entries({source:c.source,sourceTree:c.tree,run:c.run,attempt:1,job:'readonly',node:'22.23.4'}))if(r[k]!==v)throw 1;
 if(r.matrixSha256!=='0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e'||r.allPassed!==true||r.expected!==100||r.passed!==100||r.failed!==0||r.unknown!==0||r.nativeBusinessCases!==0)throw 1;
 if(JSON.stringify(r.results)!==JSON.stringify(ids.map(id=>({id,result:'passed'}))))throw 1;
 if(JSON.stringify(r.mutants)!==JSON.stringify(mutants.map(x=>({id:x.id,expectedFailedIds:x.expectedFailedIds,actualFailedIds:x.expectedFailedIds,result:'passed'}))))throw 1;
 if(r.cleanup.complete!==true||r.cleanup.failedInstances.length||r.cleanup.unknownInstances.length)throw 1;
 return r;
}
