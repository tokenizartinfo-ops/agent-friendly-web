async function(entries,message){
 const repo="tokenizartinfo-ops/agent-friendly-web",branch="docs/finite-pcoff-continuation-20261103",api="https://api.github.com/repos/"+repo,parse=eval("("+load("root_parse")+")");
 if(load("docs_pending"))throw Error("pending docs mutation");
 const expected=load("docs_head"),ref=parse(await tools.mcp__codex_apps__github_fetch({url:api+"/git/ref/heads/"+branch}));if(ref.object?.sha!==expected)throw Error("docs lease");
 for(const e of entries)if(!/^docs\/superpowers\/(briefs|progress|reviews|plans|specs)\//.test(e.path)||e.mode!=="100644"||e.type!=="blob"||! /^[a-f0-9]{40}$/.test(e.sha))throw Error("existing entry");
 store("docs_pending",{expected,entries,stage:"existing-blobs"});
 const t=parse(await tools.mcp__codex_apps__github_create_tree({repository_full_name:repo,base_tree_sha:load("docs_tree"),tree_elements:entries}));if(!t.sha)throw Error("tree");
 store("docs_pending",{expected,entries,tree:t.sha,stage:"tree"});
 const c=parse(await tools.mcp__codex_apps__github_create_commit({repository_full_name:repo,parent_sha:expected,tree_sha:t.sha,message}));if(!c.sha)throw Error("commit");
 store("docs_pending",{expected,entries,tree:t.sha,commit:c.sha,stage:"commit"});
 const update=await tools.mcp__codex_apps__github_update_ref({repository_full_name:repo,branch_name:branch,expected_sha:expected,sha:c.sha,force:false});if(update.isError)throw Error("docs CAS uncertain");
 const rr=await Promise.allSettled([tools.mcp__codex_apps__github_fetch({url:api+"/git/ref/heads/"+branch}),tools.mcp__codex_apps__github_fetch({url:api+"/git/commits/"+c.sha}),tools.mcp__codex_apps__github_fetch({url:api+"/git/trees/"+t.sha+"?recursive=1"})]);
 for(const r of rr)if(r.status!=="fulfilled"||r.value.isError)throw Error("docs readback");
 const [r,cr,tr]=rr.map(x=>parse(x.value));if(r.object?.sha!==c.sha||cr.tree?.sha!==t.sha||cr.parents?.length!==1||cr.parents[0].sha!==expected||tr.truncated!==false)throw Error("docs readback identity");
 const m=new Map(tr.tree.map(e=>[e.path,e]));for(const e of entries){const f=m.get(e.path);if(!f||f.sha!==e.sha||f.mode!==e.mode||f.type!==e.type)throw Error("docs existing file readback");}
 store("docs_head",c.sha);store("docs_tree",t.sha);store("docs_pending",null);return{head:c.sha,tree:t.sha,entries:entries.length};
}