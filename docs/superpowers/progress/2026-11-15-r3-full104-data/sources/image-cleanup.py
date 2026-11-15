import os,stat,fcntl,re
def need(v):
 if not v:raise ValueError()
def private_root():
 r=os.fstat(9);path=os.readlink('/proc/self/fd/9');parent=os.environ.get('RUNNER_TEMP','').rstrip('/')
 need(os.path.isabs(parent) and os.path.realpath(parent)==parent and re.fullmatch(re.escape(parent)+r'/afw-r3-node\.[A-Za-z0-9]{8}',path) is not None)
 need(stat.S_ISDIR(r.st_mode) and r.st_uid==os.getuid() and r.st_mode&0o7777==0o700 and r.st_nlink==2 and fcntl.fcntl(9,fcntl.F_GETFL)&os.O_ACCMODE==os.O_RDONLY)
 p=os.open('..',os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW,dir_fd=9)
 try:
  s=os.fstat(p);need(stat.S_ISDIR(s.st_mode) and s.st_uid in [0,os.getuid()] and not s.st_mode&0o022 and os.readlink('/proc/self/fd/'+str(p))==parent)
  name=os.path.basename(path);n=os.stat(name,dir_fd=p,follow_symlinks=False)
  need((n.st_dev,n.st_ino)==(r.st_dev,r.st_ino) and stat.S_ISDIR(n.st_mode));return p,name,r
 except BaseException:os.close(p);raise
def cleanup_image():
 p=f=None
 try:
  p,name,r=private_root();entries=os.listdir(9);need(entries in [[],['node']])
  if entries:
   f=os.open('node',os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK,dir_fd=9);s=os.fstat(f);n=os.stat('node',dir_fd=9,follow_symlinks=False)
   need(stat.S_ISREG(s.st_mode) and s.st_uid==os.getuid() and s.st_nlink==1 and s.st_mode&0o7777 in [0o600,0o500] and (s.st_dev,s.st_ino)==(n.st_dev,n.st_ino))
   os.unlink('node',dir_fd=9);need(os.fstat(f).st_nlink==0);os.close(f);f=None
  need(not os.listdir(9));n=os.stat(name,dir_fd=p,follow_symlinks=False);need((n.st_dev,n.st_ino)==(r.st_dev,r.st_ino))
  os.rmdir(name,dir_fd=p);need(os.fstat(9).st_nlink==0);os.close(p);p=None;return True
 except BaseException:return False
 finally:
  for fd in [f,p]:
   if fd is not None:
    try:os.close(fd)
    except BaseException:pass
raise SystemExit(0 if cleanup_image() else 1)
