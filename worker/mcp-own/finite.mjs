import worker,{AfwNodeControl,AfwOwnEventNode as OwnEventNode} from './index.mjs';
const denyLegacyWithdrawal=()=>{throw Error('Finite legacy withdrawal unavailable');};
// Same actual SQLite constructor, namespace and inherited finite cleanup path.
// The finite profile enables only the separately qualified C0/C1 reduction.
// Legacy withdrawal RPCs must deny before touching any actual env/host state.
export class AfwOwnEventNode extends OwnEventNode{
 withdrawPermissions(){return denyLegacyWithdrawal();}
 withdrawPermissionsForPlan(){return denyLegacyWithdrawal();}
}
export {AfwNodeControl};
export default worker;
