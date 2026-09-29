import {privateUiCopy} from './private-ui-copy.mjs';
import {QUESTION_COPY} from './intake-question-copy.mjs';
import {languageChoices} from './intake-choice-compatibility.mjs';
export function dossierFieldLabels(locale){
 const form=privateUiCopy(locale).intake;
 return {...Object.fromEntries(Object.entries(QUESTION_COPY[locale].fields).map(([key,value])=>[key,value[0]])),role:form.role,siteType:form.siteType,control:form.labels.control,goals:form.sections[1][1],notes:form.labels.notes,contentSources:form.sections[4][1],desiredCapabilities:form.labels.desired,authorizedResources:form.labels.proposed,publicationPreference:form.labels.firstPublication,crawlerSearchPolicy:form.labels.searchPolicy,crawlerTrainingPolicy:form.labels.trainingPolicy,maintainerName:form.labels.maintainer,maintainerEmail:form.labels.maintainerEmail,dnsProvider:form.labels.dns,approverName:form.labels.approver,approverEmail:form.labels.approverEmail,monitoringPreference:form.labels.monitoring};
}
export function dossierValueLabel(field,value,locale){
 const form=privateUiCopy(locale).intake;
 const options={control:form.controls,siteType:form.siteTypes,authorizedResources:form.resources,desiredCapabilities:form.capabilities,publicationPreference:form.publication,crawlerSearchPolicy:form.searchPolicies,crawlerTrainingPolicy:form.trainingPolicies,monitoringPreference:form.monitoring,contentSources:form.content,goals:form.goals,languages:languageChoices(locale,Array.isArray(value)?value:[])};
 const labels=new Map(options[field]||[]);
 const label=item=>labels.get(item)||item;
 return Array.isArray(value)?value.map(label).join(', '):label(value);
}
