// ============================================================
//  ethical-issues-questions.js
//
//  Visibility flags:
//  alwaysShow:                       true  = always shown
//  showWhenPR:                       true  = show when project might be PR (proportionate review)
//  showWhenNotPROrFullREC:           true  = show when not PR OR fullRecReview == "yes"
//  showWhenFullRECNo:                true  = show when fullRecReview == "no"
//  showWhenNotNonClinicalInterviews: true  = show when researchActivities != non_clinical_people_interviews_surveys only
//  showWhenPossibleHealthFindings:   true  = show when possibleHealthFindings == "yes"
//  showWhenNoPossibleHealthFindings: true  = show when possibleHealthFindings == "no"
//  showWhenUnfavourableUK:           true  = show when applicationPrevious includes "unfavourable_uk"
//  showWhenUnfavourable:             true  = show when applicationPrevious includes "unfavourable_uk" or "unfavourable_other"
//  showWhenLinked:                   true  = show when applicationPrevious includes "linked_to_other"
// ============================================================

module.exports = {

  fullRecReview: {
    type: "radios",
    name: "fullRecReview",
    inline: true,
    legendSize: "l",
    legend: "Do you think your application has material ethical issues which need review by a full REC?",
    showWhenPR: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  ethicalIssues: {
    type: "textarea",
    name: "ethicalIssues",
    legendSize: "l",
    label: "Summarise the main ethical issues arising from the project.",
    hint: "Consider risks, burdens and benefits involved. Include justifications for balancing risks and benefits. Complete this in language understandable to a member of the public.",
    showWhenNotPROrFullREC: true,
    rows: 8
  },

  fullRecReviewNo: {
    type: "textarea",
    name: "fullRecReviewNo",
    legendSize: "l",
    label: "Clarify why you consider your application does not have material ethical issues.",
    showWhenFullRECNo: true,
    rows: 5
  },

  possibleHealthFindings: {
    type: "radios",
    name: "possibleHealthFindings",
    inline: true,
    legendSize: "l",
    legend: "Is it possible that the project could produce health related findings of clinical significance for donors or their relatives?",
    showWhenNotNonClinicalInterviews: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  possibleHealthFindingsYes: {
    type: "radios",
    name: "possibleHealthFindingsYes",
    inline: true,
    legendSize: "l",
    legend: "Will arrangements be made to notify the individuals concerned?",
    showWhenPossibleHealthFindings: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  possibleHealthFindingsNo: {
    type: "textarea",
    name: "possibleHealthFindingsNo",
    legendSize: "l",
    label: "Explain why individuals concerned will not be notified.",
    showWhenNoPossibleHealthFindings: true,
    rows: 5
  },

  applicationPrevious: {
    type: "checkboxes",
    name: "applicationPrevious",
    legendSize: "l",
    legend: "Is this application any of the following:",
    alwaysShow: true,
    items: [
      { value: "unfavourable_uk",     text: "Has previously received an unfavourable opinion by a REC in the UK" },
      { value: "unfavourable_other",  text: "Has previously received an unfavourable opinion by a REC in another country" },
      { value: "linked_to_other",     text: "Linked to another project" },
      { value: "none",                text: "None of the above" }
    ]
  },

  previousIrasId: {
    type: "input",
    name: "previousIrasId",
    legendSize: "l",
    label: "Provide the IRAS ID of the project that received an unfavourable opinion",
    showWhenUnfavourableUK: true
  },

  unfavourableReason: {
    type: "textarea",
    name: "unfavourableReason",
    legendSize: "l",
    label: "Explain how the reasons for the unfavourable opinion have been addressed in this application.",
    showWhenUnfavourable: true,
    rows: 5
  },

  linkedToOther: {
    type: "textarea",
    name: "linkedToOther",
    legendSize: "l",
    label: "Provide any information about the linked project that will help reviewers to understand the background to this application or the decisions you have made in this application.",
    showWhenLinked: true,
    rows: 5
  }

}
