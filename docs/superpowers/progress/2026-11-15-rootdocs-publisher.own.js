async function(files,message){
 const repo="tokenizartinfo-ops/agent-friendly-web",branch="docs/finite-pcoff-continuation-20261103",api="https://api.github.com/repos/"+repo;
 const sc=r=>r?.structuredContent?.structuredContent||r?.structuredContent||r,parse=r=>{const v=sc(r);if(typeof v.content==="string"){try{return JSON.parse(v.content)}catch{}}return v;},good=s=>/^[a-f0-9]{40}$/.test(s||"");
 if(load("docs_pending"))throw Error("pending mutation");
 const before=parse(await tools.mcp__codex_apps__github_fetch({url:api+"/git/ref/heads/"+branch})),expected=load("docs_head");if(before.object.sha!==expected)throw Error("docs lease");
 const old=parse(await tools.mcp__codex_apps__github_fetch({url:api+"/git/commits/"+expected}));if(old.tree.sha!==load("docs_tree"))throw Error("docs tree");
 const entries=[];
 for(const f of files){if(!/^docs\/superpowers\/(briefs|progress|reviews|plans|specs)\//.test(f.path)||typeof f.content!=="string")throw Error("path");const b=parse(await tools.mcp__codex_apps__github_create_blob({repository_full_name:repo,content:f.content,encoding:"utf-8"}));if(!good(b.sha))throw Error("blob");entries.push({path:f.path,mode:"100644",type:"blob",sha:b.sha});}
 store("docs_pending",{expected,entries,stage:"blobs"});
 const t=parse(await tools.mcp__codex_apps__github_create_tree({repository_full_name:repo,base_tree_sha:old.tree.sha,tree_elements:entries}));if(!good(t.sha))throw Error("tree");store("docs_pending",{expected,entries,tree:t.sha,stage:"tree"});
 const c=parse(await tools.mcp__codex_apps__github_create_commit({repository_full_name:repo,parent_sha:expected,tree_sha:t.sha,message}));if(!good(c.sha))throw Error("commit");store("docs_pending",{expected,entries,tree:t.sha,commit:c.sha,stage:"commit"});
 await tools.mcp__codex_apps__github_update_ref({repository_full_name:repo,branch_name:branch,expected_sha:expected,sha:c.sha,force:false});
 const ref=parse(await tools.mcp__codex_apps__github_fetch({url:api+"/git/ref/heads/"+branch}));if(ref.object.sha!==c.sha)throw Error("readback ref");
 const cr=parse(await tools.mcp__codex_apps__github_fetch({url:api+"/git/commits/"+c.sha}));if(cr.tree.sha!==t.sha||cr.parents[0].sha!==expected)throw Error("readback commit");
 for(let i=0;i<files.length;i++){const f=files[i];let r=sc(await tools.mcp__codex_apps__github_fetch_file({repository_full_name:repo,path:f.path,ref:c.sha}));if(r.sha!==entries[i].sha)throw Error("readback file sha");if(r.content!==f.content){const br=sc(await tools.mcp__codex_apps__github_fetch_blob({repository_full_name:repo,blob_sha:entries[i].sha}));if(br.content!==f.content)throw Error("readback blob content");r={...r,content:br.content,readbackMethod:"full Git blob"};}store("doc:"+f.path,r);}
 store("docs_head",c.sha);store("docs_tree",t.sha);store("docs_pending",null);return{head:c.sha,tree:t.sha,files:entries};
}