// Temporary causal RED scaffolding: no capability, records or SQL substitute.
export function createFinitePreparationNoticeJournal(){
 return Object.freeze({appendReservation(){throw Error('Finite preparation notice unavailable');}});
}
