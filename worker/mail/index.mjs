import { createMailPrivateControls } from '../../lib/mail-private-controls.mjs';
import { createMailServiceControls } from '../../lib/mail-service-controls.mjs';

/** Unprovisioned dedicated mail Worker. No apex routes, cron or public ingest. */
const mailWorker = {
  async fetch(request,env) {
    const unavailable=()=>Response.json({code:'unavailable'},{status:404,headers:{'Cache-Control':'no-store'}});
    const origin=new URL(request.url).origin;
    if(origin===env.MAIL_OPERATOR_ORIGIN && env.MAIL_OPERATOR_ENABLED==='true') {
      if(!env.MAIL_DB)return unavailable();
      const db=env.MAIL_DB.withSession?env.MAIL_DB.withSession('first-primary'):env.MAIL_DB;
      return createMailPrivateControls({db,config:{enabled:true,origin:env.MAIL_OPERATOR_ORIGIN,teamDomain:env.MAIL_ACCESS_TEAM_DOMAIN,audience:env.MAIL_OPERATOR_AUDIENCE,subject:env.MAIL_OPERATOR_SUBJECT}})(request);
    }
    if(origin===env.MAIL_SERVICE_ORIGIN && env.MAIL_SERVICE_ENABLED==='true') {
      if(!env.MAIL_DB)return unavailable();
      return createMailServiceControls({db:env.MAIL_DB,email:env.EMAIL,limiter:env.MAIL_RATE_LIMITER,config:{enabled:true,origin:env.MAIL_SERVICE_ORIGIN,teamDomain:env.MAIL_ACCESS_TEAM_DOMAIN,audience:env.MAIL_SERVICE_AUDIENCE,operatorAudience:env.MAIL_OPERATOR_AUDIENCE,clientId:env.MAIL_SERVICE_CLIENT_ID}})(request);
    }
    return unavailable();
  },
};
export default mailWorker;
