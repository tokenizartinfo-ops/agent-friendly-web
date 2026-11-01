/** Fixed C2 source boundary. No runtime registration, env material or caller DTO.
 * C2 must qualify actual private setup completion, full source/binding coverage,
 * exact native launcher/observer provenance and fixed GET custody before returning
 * an opaque context. Task1 deliberately cannot install those missing facts. */
const unavailable=()=>{throw Error('Finite launch source unavailable');};
export const resolvePrivateQaFiniteLaunchContext=unavailable;
export const readPrivateQaFiniteLaunchMaterial=unavailable;
