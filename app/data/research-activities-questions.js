// ============================================================
//  research-activities-questions.js
//
//  Visibility flags:
//  alwaysShow:                   true  = always shown
//  showWhenClinicalOrTreatment:  true  = show when researchActivities includes clinical_people_activities or treatment
//  showWhenCTIMP:                true  = show when isCTIMP == "yes"
//  showWhenNHSPatients:          true  = show when researchActivities includes clinical or non-clinical AND participantGroups includes NHS patients or care home residents
//  showWhenTreatment:            true  = show when researchActivities includes treatment
//  showWhenNotComparingStandard: true  = show when compareStandard == "no" (and not compareIntervention/goldIntervention)
//  showWhenNonClinicalInterviews:true  = show when researchActivities includes non_clinical_people_interviews_surveys
//  showWhenSensitiveTopic:       true  = show when sensitiveTopic == "yes"
//  showWhenSeriousDisclosure:    true  = show when seriousDisclosure == "yes"
//  showWhenDelayTreatment:       true  = show when delayTreatment == "yes"
//  showWhenInformGP:             true  = show when informGP == "yes"
//  showWhenContinueTreatment:    "yes" | "no" = show based on continueTreatment value
// ============================================================

module.exports = {

  interventionDescription: {
    type: "textarea",
    name: "interventionDescription",
    legendSize: "l",
    label: "What is the intervention or treatment being studied?",
    hint: "Provide the trade name and brand name where relevant of any device or medicine. For surgical, psychological or non-clinical interventions briefly describe the nature of the intervention. If relevant, include details of any control arm.",
    showWhenClinicalOrTreatment: true,
    rows: 5
  },

  firstInHuman: {
    type: "radios",
    name: "firstInHuman",
    inline: true,
    legendSize: "l",
    legend: "Is this treatment first-in-human?",
    showWhenCTIMP: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  delayTreatment: {
    type: "radios",
    name: "delayTreatment",
    inline: true,
    legendSize: "l",
    legend: "Does your project involve a change or a delay to patients' standard treatment or care?",
    showWhenNHSPatients: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  compareStandard: {
    type: "radios",
    name: "compareStandard",
    inline: true,
    legendSize: "l",
    legend: "Are any of the treatments in this project being compared to standard care?",
    showWhenTreatment: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  changeInStandardCare: {
    type: "textarea",
    name: "changeInStandardCare",
    legendSize: "l",
    label: "Describe what arrangements you will put in place to address any changes in standard care during the project, for example resulting from new guidance from NICE.",
    showWhenNotComparingStandard: true,
    rows: 5
  },

  questionnaireType: {
    type: "checkboxes",
    name: "questionnaireType",
    legendSize: "l",
    legend: "What type of questionnaires are you using in this project?",
    hint: "Select all that apply",
    showWhenNonClinicalInterviews: true,
    items: [
      { value: "validated_intended_purpose",   text: "Use of validated questionnaires within their intended purpose and intended population" },
      { value: "validated_outside_purpose",    text: "Use of validated questionnaires outside of their intended purpose and population" },
      { value: "non_validated",                text: "Use of non-validated questionnaires" },
      { value: "no_questionnaires",            text: "No questionnaires included in project" }
    ]
  },

  sensitiveTopic: {
    type: "radios",
    name: "sensitiveTopic",
    inline: true,
    legendSize: "l",
    legend: "Is it possible that any interviews, questionnaires or group discussions include topics that might be sensitive, embarrassing or upsetting?",
    showWhenNonClinicalInterviews: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  seriousDisclosure: {
    type: "radios",
    name: "seriousDisclosure",
    inline: true,
    legendSize: "l",
    legend: "Is it possible that any conversations, interviews, questionnaires or group discussions include topics that might result in criminal or other serious disclosures?",
    showWhenNonClinicalInterviews: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  seriousDisclosureDetails: {
    type: "textarea",
    name: "seriousDisclosureDetails",
    legendSize: "l",
    label: "Explain how any requirement for criminal or other disclosures will be dealt with in line with legal obligations, safeguarding arrangements and professional procedures and guidance.",
    showWhenSeriousDisclosure: true,
    rows: 5
  },

  societyBenefits: {
    type: "textarea",
    name: "societyBenefits",
    legendSize: "l",
    label: "What are the potential benefits for participants and society?",
    alwaysShow: true,
    rows: 5
  },

  sideEffects: {
    type: "textarea",
    name: "sideEffects",
    legendSize: "l",
    label: "Any risks, side-effects or burdens of any research activities or monitoring of participants",
    showWhenClinicalOrTreatment: true,
    rows: 5
  },

  riskDelayTreatment: {
    type: "textarea",
    name: "riskDelayTreatment",
    legendSize: "l",
    label: "Any risks due to a change or delay to standard treatment or care",
    showWhenDelayTreatment: true,
    rows: 5
  },

  riskSensitiveTreatment: {
    type: "textarea",
    name: "riskSensitiveTreatment",
    legendSize: "l",
    label: "Any risk or burden due to interviews, questionnaires or group discussions that include topics that might be sensitive, embarrassing or upsetting",
    showWhenSensitiveTopic: true,
    rows: 5
  },

  informGP: {
    type: "radios",
    name: "informGP",
    inline: true,
    legendSize: "l",
    legend: "Will you inform the participants' General Practitioners (or any other health or care professional responsible for their care) that they are taking part in the study?",
    showWhenTreatment: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  whenInformGP: {
    type: "textarea",
    name: "whenInformGP",
    legendSize: "l",
    label: "Explain the circumstances when you will contact General Practitioners or other responsible health or care professionals about a participant. What will you tell participants about this?",
    showWhenInformGP: true,
    rows: 5
  },

  continueTreatment: {
    type: "radios",
    name: "continueTreatment",
    legendSize: "l",
    legend: "What will happen with treatment after the project has finished?",
    showWhenTreatment: true,
    items: [
      { value: "yes", text: "Treatment will continue to be provided once the project has finished" },
      { value: "no",  text: "Treatment will not continue to be provided once the project has finished" }
    ]
  },

  continueTreatmentYes: {
    type: "textarea",
    name: "continueTreatmentYes",
    legendSize: "l",
    label: "Describe all the arrangements for continued provision of treatment after the project has finished, including funding. Give details of the parties that have agreed these arrangements.",
    showWhenContinueTreatment: "yes",
    rows: 5
  },

  continueTreatmentNo: {
    type: "textarea",
    name: "continueTreatmentNo",
    legendSize: "l",
    label: "Describe the care arrangements after the project has finished. Justify these arrangements.",
    showWhenContinueTreatment: "no",
    rows: 5
  },

  finishDataCollection: {
    type: "date",
    name: "finishDataCollection",
    legendSize: "l",
    legend: "When do you plan to finish collecting data for this project in the UK?",
    hint: "For example, 27 3 2007",
    alwaysShow: true
  }

}
