C2 builder recheck of question 839fd2949e146faf527521ada15766b6c2a7107c in revised design cd0296158941515eb6839faf7a8de5ea608f330c, index 730a25bb1a6ff71d23354e973b1f78fb3d5ebd1d. Scope limited to the two alarm crash cuts. Both are covered by the pre-factory dispatch transaction and the atomic reservation/fallback on the last attempt. The design specifies precommit failure propagation, durable readbacks, spent counters and the original bootstrap C0/C1 limits. Design review only.

nothing important left
