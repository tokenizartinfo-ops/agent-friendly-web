# Scoped re-review: finite L05 diagnostic task fix round1/5 (I1 only)

RepoAFW tokenizartinfo-ops/agent-friendly-web. Resume review849c4386be2000a30a359cdd09d50adad05f6d27. Originaldeliverycap5/5NOTreopened;I3full104held. Code/read-onlyGitDBDATA; no Source eval/import/VM/AST/compile/syntax/tests onPC, no Source rerun or Source/Rootdocs ref writes, no provider/Chrome/Gmail/secrets/ownerMax. No subagents. CoveringtestsALREADYactualGitHub; doNOTrerun. Immutableappendreviewblobonly.

## Requirements and evidence

Fixbrief501d2cf1e8ac34fecda415b8d000132100287640 andRootaggregateclarification62028dc55981f1e19298af7898221df5d63f9854. OriginalI1: priorboundnote survivesovercapbeforecounter/taint orpendingprivateframewithoutEOF. Rootpreflightverifiedsameclassalsoordinaryparsermalformation/duplicateafternoteandpendingordinarybytes. Fixedallaggregatepending/parse/capfailuresmustclearcachedattribution, preservesoriginalValueError/OverflowErrorandready-parsersemantics/clocks/no extra waits. Normalcompletevalidnote+wait_expiredretainspositiveclassification. M1writercloseOSErrorandM2observedcleanupunknownareDEFERREDMINORS,notthisloop;unchangedsectionsnotnewfindings.

Actorfinalindex881f4c81e5495cc875268b0ae9490392674f0f21/normaloriginbfa/historicalSourceL05f8/currentunitparentae. Reportwholeprefix+fix+Rootactual0f304c23de2daf10deb50325e9f4496daef8794d inRootdocsef20b635. PatchONLYprobe6f42cda2(21174B)→11ac20eb27961a323452c30a6cf6376b22ce506b(21346B),threehunksbelow. Unitdriver1ae61138(9550B)ASTextractsexactsixprobe functions,notmodule;MemoryIOnarrowsevents/chunks/summaryonly. No actualL05/fork/process/pidfd/signal/OriginalCLI/Native. Core/frozen18/Mainunchanged;smallF7/entireSAMEonlyforonepureCIoccurrence. Rootverifiedliteral/inverses/allpins/fullprefix/rollback. Unitgrammar16fields/11IDsexact5REDauthorityOWN4327c13c+8pos54negRootOWNtests;old4REDpreparationneverexecuted/ineligible.

Actual fixedF7 step Check bounded private-note parser controls,Source03af03daf278229c6a816d011a3bc11d7fb28d5e/treea989bcf8a43f3932115aa301f7e8f2b028b9ced6,run43737806333/attempt1/job132884165825,Node22.23.4. Exact1actualAFW_L05_TAINT_CONTROLS/1acceptedRoot4327inactualcontext/externaljobID. Originalvectorstates:[passed,passed,failed,failed,failed,passed,passed,passed,failed,passed,failed],exactRED[buffer_limit,cumulative_limit,partial_abort,ordinary_ready,undemuxed_partial]. Fixed11passed,no unknown. Run/job/stepSUCCESS. Rootrecorddf03ca088c22bae39ca3447eb3dcd74037f1c438. Thisiscovering Sourcefunctionregressionevidence,notlifetimequalification. buffer_limitexplicitlysynthesizestheboundcachebyactualprivate_notefunctionbeforeadversarialbufferstate;mockreadneverreturns>n. Ordinary-readycorruptionincludesnormal3+deDupwithoutnote then5independentboundnotestates;unexpectedexception/capture/parsesetunknownnotRED.

SourceCLOSED74e3300cfbe47ee4986303befb1ee3c3d099fc77/tree2df6eee9e653f81d25fd248441c46fb238279b2d,originalF7f7a restored;completeSAME2fcd79c7d0a2475f176dc03360df5980a58c3120/2471214B/SHA1ba61ebb62514c1bb2e5b7b6058dd5abad09ddc1d059483987262032e154928a. Rootfulltree/fullSAME/F7/Core/Main/fivequeues0/closedheadruns0checkedafterCAS. No Sourceactive/pending. Neverrerun03af/run43737806333orold88L05. Actualearlier918bbf91inferenceunchangedlimited;7claimsfalse/I3held.

## Requested verdict

Verdict I1 ADDRESSED/NOTADDRESSED, newCritical/Importantbreakageinfixdiffonly, specANDquality. Newoutsideunchanged observationsdeferrednotgrowfixloop. Inspectnewunitvalidationcodeforspecificcodequality/safety/provenancerisk, no broadcarrier104review. ContextpinnedoriginalprobeorSourcefilefromindexonlyifconcretehunkcheckneedsit;statewhatchecked. NoI3clearance/newguardrepairdecision. Appendtoexistingreview849c preservingfullprefix, returnimmutableSHA+shortcountsverdict.

## Exact three-hunk Source fix (ASCII original offsets)
```json
[[3245,"  if note_bad or probe_total>4096:obs['kernelSite']=obs['kernelClass']=U","  if note_bad or note_tail or probe or probe_total>4096:obs['kernelSite']=obs['kernelClass']=U"],[4790,"  part=os.read(key.fileobj,min(cap+1-len(target),4097-probe_total) if key.data=='probe' else cap+1-len(target));need(len(target)+len(part)<=cap)\n  if key.data=='probe' and probe_total+len(part)>4096:raise OverflowError()","  part=os.read(key.fileobj,min(cap+1-len(target),4097-probe_total) if key.data=='probe' else cap+1-len(target))\n  in_buffer=len(target)+len(part)<=cap\n  if key.data=='probe' and not in_buffer:note_bad=True\n  need(in_buffer)\n  if key.data=='probe' and probe_total+len(part)>4096:note_bad=True;raise OverflowError()"],[5403,"  v=json.loads(line)\n  need(json.dumps(v,separators=(',',':')).encode()==line and list(v)==['kind','pid','ppid','start'] and v['kind'] in ['parent','emitter','creator','shim','EOF_WOKE','CreatorDead'] and type(v['pid']) is int and v['pid']>1 and type(v['ppid']) is int and v['ppid']>=(1 if v['kind'] in ['EOF_WOKE','CreatorDead'] else 2) and type(v['start']) is str and v['start'].isdigit())\n  need(v['kind'] not in readies);readies[v['kind']]=v","  try:\n   v=json.loads(line)\n   need(json.dumps(v,separators=(',',':')).encode()==line and list(v)==['kind','pid','ppid','start'] and v['kind'] in ['parent','emitter','creator','shim','EOF_WOKE','CreatorDead'] and type(v['pid']) is int and v['pid']>1 and type(v['ppid']) is int and v['ppid']>=(1 if v['kind'] in ['EOF_WOKE','CreatorDead'] else 2) and type(v['start']) is str and v['start'].isdigit())\n   need(v['kind'] not in readies);readies[v['kind']]=v\n  except BaseException:\n   note_bad=True;raise"]]
```

## New pure Source-function unit driver (actual executed source)
```python
def run_units(baseline, fixed):
    """Exercise only the six selected parser/summary definitions with in-memory I/O."""
    names = ('need', 'within', 'private_note', 'save_summary', 'pump', 'wait_for')
    valid_pair = ('fd4_type_owner', 'check_rejected')
    unknown_pair = ('unknown', 'unknown')
    fields = ('probeCleanup','firstSite','checkAtSite','eventAtCheck','stopClass','creatorSeen','shimSeen','wakeSeen','deadSeen','shimTerminalBeforeCleanup','kernelSite','kernelClass','markerAtOracle','markerAtCleanup','streams')
    builtins = dict(len=len, list=list, type=type, int=int, str=str, bool=bool, min=min, max=max, bytearray=bytearray,
                    ValueError=ValueError, OverflowError=OverflowError, BaseException=BaseException)
    def require(value):
        if not value:
            raise RuntimeError()
    def canonical(value):
        return (json.dumps(value, separators=(',', ':')) + '\n').encode('ascii')
    def definitions(source):
        module = ast.parse(source, filename='<pinned-probe>', mode='exec')
        owned = [fn for fn in module.body if type(fn) is ast.FunctionDef and fn.name in names]
        require(tuple(fn.name for fn in owned) == names and all(not fn.decorator_list for fn in owned))
        return compile(ast.Module(body=owned, type_ignores=[]), '<pinned-functions>', 'exec', dont_inherit=True)
    def event(kind):
        p, parent, start = {'creator':(21,20,'3'), 'shim':(22,21,'4'), 'EOF_WOKE':(22,1,'4')}[kind]
        return dict(kind=kind,pid=p,ppid=parent,start=start)
    ready = [event(k) for k in ('creator','shim','EOF_WOKE')]
    normal_bytes = b''.join(canonical(e) for e in ready)
    note = b'~'+canonical([*valid_pair,22,1,'4'])
    class MemoryIO:
        O_ACCMODE = 3
        O_WRONLY = 1
        O_NONBLOCK = 2048
        F_GETFL = 3
        def __init__(self):
            self.inputs = {}
            self.written = []
            self.unregistered = []
            self.enabled = True
            self.now = 0
        def select(self, timeout):
            require(0 <= timeout <= .02)
            return [(SimpleNamespace(data=k,fileobj=k),None) for k in self.inputs]
        def read(self, key, maximum):
            require(key in self.inputs and 0 < maximum <= 8193)
            chunk = self.inputs.pop(key)
            part = chunk[:maximum]
            if len(chunk) > maximum:
                self.inputs[key] = chunk[maximum:]
            return part
        def unregister(self, key):
            self.unregistered.append(key)
        def monotonic(self):
            return self.now
        def fstat(self, fd):
            require(fd == 10)
            return SimpleNamespace(st_mode=stat.S_IFIFO)
        def fcntl(self, fd, cmd):
            require((fd, cmd) == (10, self.F_GETFL))
            return self.O_WRONLY | (self.O_NONBLOCK if self.enabled else 0)
        def write(self, fd, data):
            require(fd == 10 and self.enabled and type(data) is bytes and 0 < len(data) <= 1024)
            self.written.append(data)
            return len(data)
    def run_one(code, test, ordinary_case=None):
        io = MemoryIO()
        g = dict(__builtins__=builtins, json=json, stat=stat, os=io, fcntl=io, time=io, selector=io,
                 U='unknown', deadline=1, note=None, note_bad=False, note_tail=bytearray(), probe_total=0,
                 readies={}, verified={22}, obs=dict.fromkeys(fields,'unknown'), out=bytearray(), err=bytearray(), probe=bytearray())
        exec(code, g)
        def pump(frames):
            require(not io.inputs)
            io.inputs = dict(frames)
            g['pump']()
            require(not io.inputs)
        def raises(cls, fn):
            try:
                fn()
            except BaseException as err:
                require(type(err) is cls)
                return
            raise RuntimeError()
        def sample():
            before = len(io.written)
            g['save_summary']()
            require(len(io.written) == before + 1)
            raw = io.written[-1]
            data = json.loads(raw)
            require(canonical(data) == raw and tuple(data) == fields)
            pair = (data['kernelSite'],data['kernelClass'])
            require(pair in (valid_pair,unknown_pair))
            return pair
        def full_valid():
            pump([('probe', normal_bytes + note)])
            require(list(g['readies'].values()) == ready and g['note'] == valid_pair and not g['note_bad'])
            require(not g['probe'] and not g['note_tail'])
        def ordinary_timeout():
            io.now = 2
            raises(ValueError, lambda: g['wait_for'](lambda: 'CreatorDead' in g['readies']))
            require(g['reason'] == 'wait_expired')
        if test == 'ordinary_ready':
            if ordinary_case is None:
                pump([('probe',normal_bytes)])
                require(list(g['readies'].values()) == ready and g['note'] is None)
                raises(ValueError, lambda: pump([('probe',canonical(ready[-1]))]))
                require(list(g['readies'].values()) == ready and sample() == unknown_pair)
                # New independent mock environment for every corruption path.
                outcomes = [run_one(code, test, case) for case in
                            ('invalid_json','bad_shape','duplicate','pending_abort','pending_eof')]
                return all(outcomes)
            full_valid()
            if ordinary_case == 'invalid_json':
                raises(json.JSONDecodeError, lambda: pump([('probe',b'{]\n')]))
            elif ordinary_case == 'bad_shape':
                raises(ValueError, lambda: pump([('probe',b'{}\n')]))
            elif ordinary_case == 'duplicate':
                raises(ValueError, lambda: pump([('probe',canonical(ready[-1]))]))
            else:
                require(ordinary_case in ('pending_abort','pending_eof'))
                pump([('probe',b'{"kind":')])
                require(g['probe'] == b'{"kind":' and not g['note_tail'])
                if ordinary_case == 'pending_eof':
                    pump([('probe',b'')])
                    require(io.unregistered == ['probe'])
                else:
                    ordinary_timeout()
                    require(not io.unregistered)
            require(list(g['readies'].values()) == ready)
            return sample() == unknown_pair
        if test == 'buffer_limit':
            # Directly preload the bound cache using the actual private_note function.
            # Isolate the immediate buffer guard, independently of prior pump accounting.
            g['readies'] = {e['kind']:e.copy() for e in ready}
            g['private_note'](bytearray(note[:-1]))
            require(g['note'] == valid_pair and g['probe_total'] == 0 and not g['probe'])
            raises(ValueError, lambda: pump([('probe', b'x'*4097)]))
            require(not g['probe'] and g['probe_total'] == 0)
            return sample() == unknown_pair
        full_valid()
        if test == 'valid_note':
            return sample() == valid_pair
        if test == 'valid_wait':
            ordinary_timeout()
            return sample() == valid_pair
        if test == 'cumulative_limit':
            pump([('probe', b'x'*(4096-g['probe_total']))])
            require(g['probe_total'] == 4096 and len(g['probe']) < 4096)
            raises(OverflowError, lambda: pump([('probe', b'x')]))
            return sample() == unknown_pair
        if test in ('partial_abort','partial_eof'):
            pump([('probe', b'~[')])
            require(g['note_tail'] == b'~[' and not g['probe'])
            if test == 'partial_eof':
                pump([('probe', b'')])
                require(io.unregistered == ['probe'] and not g['note_tail'])
            else:
                ordinary_timeout()
                require(not io.unregistered)
            return sample() == unknown_pair
        if test in ('duplicate_note','malformed_note'):
            pump([('probe', note if test == 'duplicate_note' else b'~]\n')])
            require(g['note_bad'] and list(g['readies'].values()) == ready)
            return sample() == unknown_pair
        if test == 'summary_sink':
            io.enabled = False
            g['save_summary']()
            require(not io.written)
            io.enabled = True
            return sample() == valid_pair
        if test == 'undemuxed_partial':
            # Another ready channel rejects inside the same select cycle, before demux.
            # Exercise a private prefix both at byte zero and following an ordinary line.
            for prefix in (b'',canonical(ready[-1])):
                g['probe'] = bytearray()
                g['err'] = bytearray()
                raises(ValueError, lambda: pump([('probe',prefix+b'~['),('err',b'x'*4097)]))
                require(g['probe'] == prefix+b'~[' and not g['note_tail'] and not io.inputs)
                if sample() != unknown_pair:
                    return False
            return True
        raise RuntimeError()
    result = []
    for source in (baseline, fixed):
        try:
            code = definitions(source)
        except BaseException:
            result.append(['unknown']*len(IDS))
            continue
        states = []
        for test in IDS:
            try:
                outcome = run_one(code, test)
                require(type(outcome) is bool)
                states.append('passed' if outcome else 'failed')
            except BaseException:
                states.append('unknown')
        result.append(states)
    return result

```

## Exact test provenance/bootstrap (CI only; no Source row invocation)
```python
import ast,base64,hashlib,json,os,re,stat,sys,zlib
from types import SimpleNamespace

IDS = ["valid_note","valid_wait","buffer_limit","cumulative_limit","partial_abort","partial_eof","duplicate_note","malformed_note","ordinary_ready","summary_sink","undemuxed_partial"]
RED = ["buffer_limit","cumulative_limit","partial_abort","ordinary_ready","undemuxed_partial"]
FLAGS = ["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"]
F7 = '.github/workflows/afw-finite-budget-qualification.yml'
SAME = 'docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md'
UNKNOWN = ['unknown'] * len(IDS)

def require(v):
    if not v:
        raise ValueError()

def pin(data,size,digest,blob):
    require(len(data)==size and hashlib.sha256(data).hexdigest()==digest and gitblob(data)==blob)

def gitblob(data):
    return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()

def canon(v):
    return json.dumps(v,separators=(',',':'),ensure_ascii=True)

def checked_body(path,maximum):
    st=os.lstat(path)
    require(stat.S_ISREG(st.st_mode) and 0<st.st_size<=maximum and os.path.realpath(path)==os.path.join(os.getcwd(),path))
    with open(path,'rb') as f:
        data=f.read(maximum+1)
    require(len(data)==st.st_size)
    return data

def exact_edits(source,edits):
    require(type(source) is str and source.isascii() and type(edits) is list)
    out=[];at=0
    for edit in edits:
        require(type(edit) is list and len(edit)==3)
        pos,old,new=edit
        require(type(pos) is int and at<=pos<=len(source) and type(old) is str and type(new) is str and old.isascii() and new.isascii() and source[pos:pos+len(old)]==old)
        out.extend((source[at:pos],new));at=pos+len(old)
    return ''.join(out)+source[at:]

def context_and_bytes():
    e=os.environ
    exact={'GITHUB_REPOSITORY':'tokenizartinfo-ops/agent-friendly-web','GITHUB_REPOSITORY_ID':'1347578006','GITHUB_EVENT_NAME':'push','GITHUB_REF':'refs/heads/feat/finite-native-cleanup-20261101','GITHUB_JOB':'readonly','GITHUB_RUN_ATTEMPT':'1','GITHUB_WORKFLOW_REF':'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101','AFW_TAINT_CHECKOUT':'success','AFW_TAINT_SETUP':'success','AFW_TAINT_NODE':'22.23.4','AFW_TAINT_CLEAN':'yes'}
    require(all(e.get(k)==v for k,v in exact.items()))
    require(all(k not in e for k in ('NODE_OPTIONS','NODE_PATH','AFW_SYN_CHECKPOINT_KEY','AFW_BUDGET_DIAGNOSTIC_CANDIDATE')))
    head=e.get('GITHUB_SHA','');tree=e.get('AFW_TAINT_TREE','');run=e.get('GITHUB_RUN_ID','')
    require(re.fullmatch('[a-f0-9]{40}',head) and re.fullmatch('[a-f0-9]{40}',tree) and re.fullmatch('[1-9][0-9]{0,19}',run))
    require(head==e.get('AFW_TAINT_HEAD') and os.getcwd()==e.get('AFW_TAINT_TOP')==os.path.realpath('.'))
    tree_bytes=sys.stdin.buffer.read(400001)
    require(0<len(tree_bytes)<=400000 and tree_bytes.endswith(b'\0'))
    core=[];special={}
    for row in tree_bytes[:-1].split(b'\0'):
        meta,path=row.split(b'\t',1)
        if path in (F7.encode(),SAME.encode()):
            require(path not in special and re.fullmatch(b'100644 blob [0-9a-f]{40}',meta))
            special[path]=meta.split(b' ')[-1].decode('ascii')
        else:
            core.append((path,row))
    data=b''.join(row+b'\0' for _,row in sorted(core))
    require(len(core)==3201 and len(data)==324448 and hashlib.sha256(data).hexdigest()=='aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703')
    require(special[F7.encode()]==gitblob(checked_body(F7,73728)))
    source=checked_body(SAME,2600000)
    require(special[SAME.encode()]==gitblob(source))
    pin(source,2467916,'cbc9d2a42f6cabdfed4432504a968b8756248738bc5f3023b0c53b555a35b4cc','12a8604eef08d6ee57b39a6398c3449e4cab8744')
    return dict(source=head,sourceTree=tree,run=run,attempt=1,job='readonly',node='22.23.4'),source

def programs(history):
    prefix=history[:2455649];suffix=history[2455649:]
    pin(prefix,2455649,'5f42bf2d4a184dc02e400bcaf4d6043511fd238f1587b00b563af9670701f455','3fdaf43231f5621911e14569240418b5e661abf9');pin(suffix,12267,'bddea5f02021b8099046de99c6cf0d527554c6280fc38111c656bf5a5bad52c8','9134eccf2f7f7d1f646aa0b912e9a46ce1baa0ff')
    tag=b'\nAFW-L05-TAINT-UNIT-DATA/1\n'
    require(suffix.startswith(tag) and suffix.endswith(b'\n'))
    overlay=json.loads(suffix[len(tag):-1]);require(canon(overlay).encode()==suffix[len(tag):-1])
    require(overlay['sourceParent']=='ae42370ab5f2973e03a572616c62cf004cce874d' and overlay['sourceParentTree']=='b075e6eab277bd204c3884f490591cfa58637a71' and overlay['rootReceiver']=='4327c13cff9eb0204a71f46e7c5fed6852985655')
    begin=b'<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:BEGIN -->'
    end=b'<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:END -->'
    require(prefix.count(begin)==prefix.count(end)==1)
    section=prefix.split(begin,1)[1].split(end,1)[0]
    require(re.fullmatch(rb'\n[A-Za-z0-9+/=\n]+\n',section))
    b64=section.replace(b'\n',b'');require(len(b64)==160284)
    packed=base64.b64decode(b64,validate=True);require(base64.b64encode(packed)==b64)
    pin(packed,120211,'7e9aace1b1a3930a1a5234a2fdee5af68ebec77cc5b9818a6d342328047bf0e5','b3dfc078047bee03b5b42140783ee1dcf2409fd8')
    dec=zlib.decompressobj(31);raw=dec.decompress(packed,524289)
    require(dec.eof and not dec.unused_data and not dec.unconsumed_tail)
    pin(raw,487208,'087bba2182c131579e233f6c29daf1ee85e2aae41e77b66d6f93cc44cb5000c5','f9c8261c54f761b5c33ddc370dbe7b308648033b')
    obj=json.loads(raw)
    require(obj['sourceParent']=='bfa80fac58ecb60bb3c9bcd458da6f393b301f70' and obj['sourceParentTree']=='d17f87ef49892e6a4c0ec50dd2436b0697b9f45f' and len(obj['helpers'])==33)
    prod=obj['production'];pin(prod['data'].encode(),95518,'cfcb0dc7992d27246dc785ef2991104f6715e61c9aa49cfddc0317b219e6ac91','b88ebef9a2aa979772d20bfb778cbfe463dc3011')
    require(prod['count']==18 and prod['setSha256']=='71b4454f4cd90f716852bbdbb44f686d7f46191e8d93f890c465a7cb5f29d9af')
    old=prefix[2432862:2452486]
    pin(old,19624,'b3176d5854d497c09d2f66db96675a75b3e7e49d7197e562e1afe1c147e3ab1b','77253fb50deae794b049fa5483726f24f03a973a')
    tag=b'\nAFW-L05-OBSERVATION-DATA/1\n';require(old.startswith(tag) and old.endswith(b'\n'))
    frame=json.loads(old[len(tag):-1]);require(frame['snapshot']==overlay['normalRaw'] and frame['contextParent']==overlay['observationDerivationParent'])
    recipe=base64.b64decode(frame['recipe'],validate=True);require(base64.b64encode(recipe).decode()==frame['recipe'])
    pin(recipe,14297,'99fac3412ef9ba16a877995b0c4bf426ceb3331fb7121951e1f50fe774efee75','23e4f7659f61cea9b981acdc8dc3864397b418a0')
    units=json.loads(recipe);require([p[0] for p in units]==['controls.mjs','controls-boundary.py','lifetime-controls.py'])
    normal=obj['helpers']['lifetime-controls.py'];pin(normal.encode(),12219,'d67b5c8c8e127c359f8d2b5d7da30da809b8d91bfb77759df4bbf9ecaaf53c59','21b0b82242a76efd94d34fe1f722e04fda6cd489')
    baseline=exact_edits(normal,units[2][1]);pin(baseline.encode(),21174,'15984e2455c0b2e70f0b4453c570ac233c9daaa00411cd94e07b0d63b5070415','6f42cda2bfc879a42de9ab19ec5475c7ffd92b86')
    changes=overlay['edits'];pin(canon(changes).encode(),1698,'625e0a3b623ed0ad303901a2ab95c804281a8dba3243a03c07173a55128ad919','9cbbef9ebff06177675ed7a95d2b0d8bf2221dbe')
    fixed=exact_edits(baseline,changes);pin(fixed.encode(),21346,'1386f5aa17f3480a8710d289298881bb07f6d2ad2d1f13cf2a9c601def6afeac','11ac20eb27961a323452c30a6cf6376b22ce506b')
    driver=overlay['driver'];pin(driver.encode(),9550,'3628b1603bbb707e7349fc51466709f54b5a70cc549ed242251512bce2b71adc','1ae61138c13b2753266c49f6c0bc8fcedd79c464')
    return baseline,fixed,driver

def measure(baseline,fixed,driver):
    # Only this pinned unit function is loaded. Its own six-function probe allowlist never evaluates a probe module.
    tree=ast.parse(driver,filename='<pinned-unit-driver>',mode='exec')
    require(len(tree.body)==1 and type(tree.body[0]) is ast.FunctionDef and tree.body[0].name=='run_units' and not tree.body[0].decorator_list)
    ns={'ast':ast,'json':json,'stat':stat,'SimpleNamespace':SimpleNamespace,'IDS':IDS}
    exec(compile(ast.Module(body=tree.body,type_ignores=[]),'<pinned-unit-driver>','exec',dont_inherit=True),ns)
    original,current=ns['run_units'](baseline,fixed)
    require(all(type(rows) is list and len(rows)==len(IDS) and all(type(s) is str and s in ('passed','failed','unknown') for s in rows) for rows in (original,current)))
    return original,current

record=dict(purpose='afw.l05-taint-controls.v1',source='unknown',sourceTree='unknown',run='unknown',attempt='unknown',job='unknown',node='unknown',ids=IDS,originalExpectedFailureIds=RED,originalResults=UNKNOWN.copy(),fixedResults=UNKNOWN.copy(),controlsPassed=False,originalL05Occurrences=0,originalCLI=0,native=0,nonclaims=dict.fromkeys(FLAGS,False))
try:
    context,history=context_and_bytes()
    baseline,fixed,driver=programs(history)
    record.update(context)
    orig,corrected=measure(baseline,fixed,driver)
    record['originalResults']=orig;record['fixedResults']=corrected
    record['controlsPassed']=(orig==['failed' if k in RED else 'passed' for k in IDS] and corrected==['passed']*len(IDS))
except BaseException:
    pass
wire=('AFW_L05_TAINT_CONTROLS/1 '+canon(record)+'\n').encode('ascii')
try:
    require(len(wire)<=4096 and os.write(1,wire)==len(wire))
except BaseException:
    raise SystemExit(1)
raise SystemExit(0 if record['controlsPassed'] else 1)

```
