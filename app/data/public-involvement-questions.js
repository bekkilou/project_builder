// ============================================================
//  public-involvement-questions.js
//
//  Visibility flags:
//  showWhenInvolved:    true = show when involvedContributors does NOT include "not_involved"
//  showWhenNotInvolved: true = show when involvedContributors INCLUDES "not_involved"
//  showWhenOther:       true = show when involvedContributors includes "other"
//  showWhenFutureOther: true = show when futureContribution includes "other"
//  showWhenFuturePlanned: true = show when futureContribution does NOT include "no_contribution"
//  showWhenNoFuture:    true = show when futureContribution includes "no_contribution"
//  alwaysShow:          true = always shown
// ============================================================

module.exports = {

  involvedContributors: {
    type: "checkboxes",
    name: "involvedContributors",
    legendSize: "l",
    legend: "In which aspects of the project have you already actively involved patients or their carers, service users or members of the public?",
    hint: "Include patient and public involvement from wider programmes that has informed this project. Select all that apply.",
    alwaysShow: true,
    items: [
      { value: "identifying_research_question",    text: "Identifying, developing, or prioritising the research question" },
      { value: "research_advisory_group",          text: "Being a member of a research advisory or reference group" },
      { value: "trial_management_group",           text: "Being a member of the Trial Management Group or Data Monitoring Committee" },
      { value: "developing_methods",               text: "Developing the research methods (for example, designing questionnaires, or defining endpoints or outcome measures)" },
      { value: "feasibility_design",               text: "Ensuring that the design of the research is feasible from the perspective of the participants" },
      { value: "inclusion_exclusion_criteria",     text: "Designing the inclusion and exclusion criteria including consideration of the demographic diversity of the study population" },
      { value: "risk_benefit_analysis",            text: "Developing the risk or benefit analysis" },
      { value: "recruitment_consent",              text: "Developing the recruitment and consent process" },
      { value: "participant_documents",            text: "Developing participant information sheets, the consent forms, and other documents" },
      { value: "plain_language_summaries",         text: "Developing plain language research summaries" },
      { value: "training_staff",                   text: "Developing or delivering training to staff" },
      { value: "dissemination_plan",               text: "Developing the dissemination plan for the research" },
      { value: "regulatory_submissions",           text: "Preparing regulatory submissions" },
      { value: "rec_meetings",                     text: "Planning to attend the Research Ethics Committee meetings to help explain how and why the research design is likely to be acceptable to research participants" },
      { value: "other",                            text: "Other" },
      { divider: "or"},
      { value: "not_involved",                     text: "Patients, service users or their carers, or members of the public have not been involved", behaviour: "exclusive" }
    ]
  },

  publicContributors: {
    type: "textarea",
    name: "publicContributors",
    legendSize: "l",
    label: "Give details of how you involved public contributors",
    showWhenInvolved: true,
    rows: 5
  },

  patientInsights: {
    type: "textarea",
    name: "patientInsights",
    legendSize: "l",
    label: "What are your reasons for not involving patients, carers, service users or members of the public?",
    hint: "Insights from these groups could have helped ensure the research reflects the priorities, needs and concerns of the intended participant population.",
    showWhenNotInvolved: true,
    rows: 5
  },

  identifyContributors: {
    type: "checkboxes",
    name: "identifyContributors",
    legendSize: "l",
    legend: "How did you identify the public contributors that you involved?",
    hint: "Select all that apply",
    showWhenInvolved: true,
    items: [
      { value: "existing_arrangements",   text: "We have existing arrangements in our organisation or team for involving patients, carers, service users or members of the public" },
      { value: "external_ppi_group",      text: "We asked an existing patient and public involvement group external to our organisation or team" },
      { value: "new_arrangement",         text: "We set up a new arrangement to involve patients, carers, service users or members of the public" },
      { value: "other",                   text: "Other" }
    ]
  },

  identifyContributorsOther: {
    type: "textarea",
    name: "identifyContributorsOther",
    legendSize: "l",
    label: "Give details of how you identified the public contributors you involved",
    showWhenOther: true,
    rows: 3
  },

  contributorDetails: {
    type: "textarea",
    name: "contributorDetails",
    legendSize: "l",
    label: "Tell us about the public contributors you worked with",
    hint: "How many were there? What were their perspectives — patients, carers, service users? What was relevant about their skills and experience?",
    showWhenInvolved: true,
    rows: 5
  },

  importantContribution: {
    type: "textarea",
    name: "importantContribution",
    legendSize: "l",
    label: "What did your public contributors say was important to them about how this research is done?",
    showWhenInvolved: true,
    rows: 5
  },

  futureContribution: {
    type: "checkboxes",
    name: "futureContribution",
    legendSize: "l",
    legend: "How do you plan to involve public contributors in the remaining stages of the research process?",
    hint: "Select all that apply",
    alwaysShow: true,
    items: [
      { value: "advisory_group",          text: "Being a member of research advisory or reference group" },
      { value: "trial_management_group",  text: "Being a member of the Trial Management Group or Data Monitoring Committee" },
      { value: "training_staff",          text: "Developing or delivering training to staff" },
      { value: "promote_research",        text: "Helping to promote this research" },
      { value: "research_activities",     text: "Carrying out research activities (for example, facilitating focus groups, interviewing or administering questionnaires)" },
      { value: "analysing_findings",      text: "Analysing the research findings" },
      { value: "regulatory_submissions",  text: "Contributing to further regulatory submissions (such as amendments)" },
      { value: "sharing_results",         text: "Sharing research results (for example, by presenting at conferences or disseminating via social media)" },
      { value: "plain_language_results",  text: "Developing plain language summaries of the results" },
      { value: "no_contribution",         text: "There is no plan to involve public contributors in the remaining stages of the research process" },
      { value: "other",                   text: "Other" }
    ]
  },

  futureContributionOther: {
    type: "textarea",
    name: "futureContributionOther",
    legendSize: "l",
    label: "Give details of other aspects public contributors will advise on or contribute to",
    showWhenFutureOther: true,
    rows: 3
  },

  justifyContribution: {
    type: "textarea",
    name: "justifyContribution",
    legendSize: "l",
    label: "Justify your approach and describe the benefits and challenges of involving public contributors",
    showWhenFuturePlanned: true,
    rows: 5
  },

  justifyNoContribution: {
    type: "textarea",
    name: "justifyNoContribution",
    legendSize: "l",
    label: "Justify the approach and absence of public involvement",
    showWhenNoFuture: true,
    rows: 5
  }

}
