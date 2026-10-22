import actual,{AfwContainerControl} from '../../examples/container-control-20261022/worker.mjs';
export {AfwContainerControl};
export default {
 async fetch(request,env) {
  const p=new URL(request.url).pathname;
  if(p==='/__ci/first')return Response.json(await env.CONTROL.getByName('original-control').run('afw-20261022-0907'));
  if(p==='/__ci/second')return Response.json(await env.CONTROL.getByName('original-control').run('afw-20261022-0929'));
  if(p==='/__ci/inspect')return Response.json(await env.CONTROL.getByName('original-control').inspect());
  return actual.fetch(request,env);
 }
};
