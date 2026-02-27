// ============================================================
//  participants-questions.js
//  (Application section — not to be confused with project-scope participants)
//
//  Visibility flags:
//  alwaysShow:                   true  = always shown
//  showWhenOtherParticipants:    true  = show when project-scope participantGroups includes "other"
//  showWhenNotDataOnly:          true  = show when participants are not data or biological material only
//  showWhenClinicalOrTreatment:  true  = show when researchActivities includes clinical_people_activities or treatment
//  showWhenNonClinical:          true  = show when researchActivities includes non-clinical people activities
// ============================================================

module.exports = {

  primaryCondition: {
    type: "checkboxes",
    name: "primaryCondition",
    legendSize: "l",
    legend: "What are the primary conditions or problems being studied?",
    hint: "Select all that apply",
    alwaysShow: true,
    items: [
      { value: "blood",                             text: "Blood" },
      { value: "cancer_and_neoplasms",              text: "Cancer and neoplasms" },
      { value: "cardiovascular",                    text: "Cardiovascular" },
      { value: "congenital_disorders",              text: "Congenital disorders" },
      { value: "ear",                               text: "Ear" },
      { value: "eye",                               text: "Eye" },
      { value: "infection",                         text: "Infection" },
      { value: "inflammatory_and_immune_system",    text: "Inflammatory and immune system" },
      { value: "injuries_and_accidents",            text: "Injuries and accidents" },
      { value: "mental_health",                     text: "Mental health" },
      { value: "metabolic_and_endocrine",           text: "Metabolic and endocrine" },
      { value: "musculoskeletal",                   text: "Musculoskeletal" },
      { value: "neurological",                      text: "Neurological" },
      { value: "oral_and_gastrointestinal",         text: "Oral and gastrointestinal" },
      { value: "renal_and_urogenital",              text: "Renal and urogenital" },
      { value: "reproductive_health_and_childbirth",text: "Reproductive health and childbirth" },
      { value: "respiratory",                       text: "Respiratory" },
      { value: "skin",                              text: "Skin" },
      { value: "stroke",                            text: "Stroke" },
      { value: "generic_health_relevance",          text: "Generic health relevance" },
      { value: "disputed_aetiology_and_other",      text: "Disputed aetiology and other" }
    ]
  },

  primaryProblem: {
    type: "input",
    name: "primaryProblem",
    legendSize: "l",
    label: "Specify the primary condition or problem being studied",
    hint: "This should be no more than 200 characters",
    alwaysShow: true
  },

  principalInclusion: {
    type: "textarea",
    name: "principalInclusion",
    legendSize: "l",
    label: "List the principal inclusion criteria for selection of participants, data or samples",
    hint: "Can be copy and pasted from protocol",
    alwaysShow: true,
    rows: 6
  },

  principalExclusion: {
    type: "textarea",
    name: "principalExclusion",
    legendSize: "l",
    label: "List the principal exclusion criteria for selection of participants, data or samples",
    hint: "Can be copy and pasted from protocol",
    alwaysShow: true,
    rows: 6
  },

  realWorldPop: {
    type: "textarea",
    name: "realWorldPop",
    legendSize: "l",
    label: "How are you making sure that your study sample reflects the real-world population that the research is for and about?",
    hint: "Consider people and communities who are often excluded from research in the field you are studying. You may attach evidence or assessments already agreed with funders or sponsors.",
    alwaysShow: true,
    rows: 5
  },

  fullyParticipate: {
    type: "textarea",
    name: "fullyParticipate",
    legendSize: "l",
    label: "How will you ensure that the people you have chosen to include in your project are able to participate fully?",
    hint: "Consider factors such as health, identity, cultural, socioeconomic factors, literacy, accessibility, or other circumstances to facilitate participation in your research.",
    alwaysShow: true,
    rows: 5
  },

  otherParticipants: {
    type: "input",
    name: "otherParticipants",
    legendSize: "l",
    label: "Give details of the other groups participating or providing data or samples in this project",
    hint: "You previously indicated that a different group of people to those already listed will participate or provide data or samples. This should be no more than 200 characters.",
    showWhenOtherParticipants: true
  },

  participantRecruitmentDate: {
    type: "date",
    name: "participantRecruitmentDate",
    legendSize: "l",
    legend: "When do you plan to start recruiting participants or collecting samples or data?",
    hint: "For example, 27 3 2007",
    alwaysShow: true
  },

  howLongInvolved: {
    type: "input",
    name: "howLongInvolved",
    legendSize: "l",
    label: "How long do you expect each participant to be in the project in total?",
    hint: "This should be no more than 200 characters",
    showWhenNotDataOnly: true
  },

  currentResearchParticipant: {
    type: "textarea",
    name: "currentResearchParticipant",
    legendSize: "l",
    label: "What arrangements will apply to potential participants who are involved in current research or have recently been involved in any research prior to recruitment?",
    showWhenClinicalOrTreatment: true,
    rows: 5
  },

  consideredVulnerable: {
    type: "radios",
    name: "consideredVulnerable",
    inline: true,
    legendSize: "l",
    legend: "Could any of the potential participants for the project be considered to be vulnerable at the time of approach?",
    showWhenNonClinical: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  imposterParticipant: {
    type: "textarea",
    name: "imposterParticipant",
    legendSize: "l",
    label: "What measures are being taken to address the risk of fake or imposter participants in online data collection that might affect the validity of results?",
    alwaysShow: true,
    rows: 5
  }

}
