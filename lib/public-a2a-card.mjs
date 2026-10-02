export function diagnosticAgentCard(){return {
 name:'Agent Friendly Web Public Diagnostic',
 description:'Read-only public website diagnostic. SendMessage accepts exactly one data part containing {url, locale?}, with locale es/en/pt. Returns dated public evidence and proportional next steps. No private dossiers, edits, transactions, resumed tasks or callbacks.',
 version:'1.0.0',
 provider:{organization:'Agent Friendly Web',url:'https://agentfriendlyweb.dev'},
 documentationUrl:'https://agentfriendlyweb.dev/skills/index.md',
 supportedInterfaces:[{url:'https://a2a.agentfriendlyweb.dev/a2a',protocolBinding:'JSONRPC',protocolVersion:'1.0'}],
 capabilities:{streaming:false,pushNotifications:false,extendedAgentCard:false},
 defaultInputModes:['application/json'],defaultOutputModes:['application/json'],
 skills:[{id:'afw.audit_public_site',name:'Public website diagnostic',description:'Observe public discovery resources and propose useful next steps without publication authorization. Input data: {url: public website URL, locale?: es|en|pt}.',tags:['read-only','public-audit','agent-readiness'],examples:['{"url":"https://agentfriendlyweb.dev","locale":"es"}']}],
};}
