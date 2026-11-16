 os.environ['RUNNER_TEMP']=os.path.dirname(os.readlink('/proc/self/fd/6'))
 c=json.loads(CONTEXT_JSON)
 driver=json.loads(PIN_JSON)
 def r3_prepare_node_child():return None
 normalControls=fixed('controls.mjs',normal['controls.mjs'])
 old=b'\nconst controlDeadline=performance.now()+90000;\n';new=b'\nconst controlDeadline=performance.now()-1;\n'
 need(normalControls.count(old)==1);expired=normalControls.replace(old,new,1)
 open('/proc/self/fd/6/controls.mjs','wb').write(expired)
 p=None;sel=None
 try:
  deadline=time.monotonic()+3
  p=subprocess.Popen(['/proc/self/fd/3','--disable-warning=ExperimentalWarning','/proc/self/fd/6/controls.mjs'],stdin=subprocess.DEVNULL,stdout=subprocess.PIPE,stderr=subprocess.PIPE,pass_fds=(3,6),env=dict(os.environ))
  sel=selectors.DefaultSelector();sel.register(p.stdout,selectors.EVENT_READ,'out');sel.register(p.stderr,selectors.EVENT_READ,'err');out=bytearray();err=bytearray()
  while sel.get_map():
   need(time.monotonic()<deadline)
   for key,_ in sel.select(0.01):
    buf=out if key.data=='out' else err;cap=24576 if key.data=='out' else 4096;part=os.read(key.fileobj.fileno(),cap+1-len(buf))
    if not part:sel.unregister(key.fileobj);continue
    buf.extend(part);need(len(buf)<=cap)
  need(p.wait(timeout=max(0.001,deadline-time.monotonic()))==23 and not err)
  report=closed(bytes(out),24576);need(report['expected']==104 and report['passed']==0 and report['failed']==0 and report['unknown']==104 and all(x['result']=='unknown' for x in report['results']) and all(x['result']=='unknown' for x in report['mutants']))
  need(not any(x.startswith('afw-r3-delivery-controls-r1-') for x in os.listdir(os.environ['RUNNER_TEMP'])))
 finally:
  if sel is not None:sel.close()
  if p is not None:
   if p.poll() is None:p.kill()
   p.wait()
   p.stdout.close();p.stderr.close()
 open('/proc/self/fd/6/controls.mjs','wb').write(normalControls)
 raw,status=capture(os.environ['RUNNER_TEMP']);need(status==0 and raw==b'AFW_FIX1_ADMITTED\n')
 refused=False
 try:capture(os.environ['RUNNER_TEMP'])
 except ValueError:refused=True
 need(refused)
 print('AFW_FIX1_BOUNDARY_OK')
except BaseException:raise SystemExit(1)
