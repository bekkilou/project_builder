// ============================================================
//  research-analysis-questions.js
//
//  Visibility flags:
//  alwaysShow:                   true  = always shown
//  showWhenQualityOther:         true  = show when qualityAssessed includes "other"
//  showWhenQuantitative:         true  = show when primaryAnalysis == "quantitative"
//  showWhenStatReview:           true  = show when statAspects does NOT include "no_review_necessary"
// ============================================================

module.exports = {

  qualityAssessed: {
    type: "checkboxes",
    name: "qualityAssessed",
    legendSize: "l",
    legend: "How has the quality of the research been assessed?",
    hint: "Select all that apply",
    alwaysShow: true,
    items: [
      { value: "independent_external_review",          text: "Independent external review" },
      { value: "review_within_company",                text: "Review within a company" },
      { value: "review_within_multicentre_group",      text: "Review within a multi-centre research group" },
      { value: "review_within_ci_institution",         text: "Review within the Chief Investigator's institution or host organisation" },
      { value: "review_within_research_team",          text: "Review within the research team" },
      { value: "review_by_academic_colleague",         text: "Review by academic colleague or educational supervisor" },
      { value: "other",                                text: "Other" }
    ]
  },

  qualityAssessedOther: {
    type: "input",
    name: "qualityAssessedOther",
    legendSize: "l",
    label: "Give details of how the quality of the research has been assessed",
    hint: "Max 200 characters",
    showWhenQualityOther: true
  },

  reviewProcess: {
    type: "textarea",
    name: "reviewProcess",
    legendSize: "l",
    label: "Explain why this review process is appropriate to the nature of the project and if any issues raised by the review have not been addressed. Give details if the review only relates to part of the project.",
    alwaysShow: true,
    rows: 5
  },

  primaryAnalysis: {
    type: "radios",
    name: "primaryAnalysis",
    legendSize: "l",
    legend: "What will the primary form of analysis be?",
    hint: "If both are being used, which is primary?",
    alwaysShow: true,
    items: [
      { value: "qualitative",   text: "Qualitative" },
      { value: "quantitative",  text: "Quantitative" }
    ]
  },

  methodAnalysis: {
    type: "textarea",
    name: "methodAnalysis",
    legendSize: "l",
    label: "Give details of the methods for analysing the data.",
    alwaysShow: true,
    rows: 5
  },

  statAspects: {
    type: "checkboxes",
    name: "statAspects",
    legendSize: "l",
    legend: "How have the statistical aspects of the project been reviewed?",
    hint: "Select all that apply",
    showWhenQuantitative: true,
    items: [
      { value: "independent_statistician_funder",      text: "Review by independent statistician commissioned by funder or sponsor" },
      { value: "other_independent_statistician",       text: "Other review by independent statistician" },
      { value: "company_statistician",                 text: "Review by company statistician" },
      { value: "ci_institution_statistician",          text: "Review by a statistician within the Chief Investigator's institution" },
      { value: "research_team_statistician",           text: "Review by a statistician within the research team or multi-centre group" },
      { value: "academic_colleague",                   text: "Review by academic colleague or educational supervisor" },
      { value: "other_statistical_expertise",          text: "Other review by individual with relevant statistical expertise" },
      { value: "no_review_necessary",                  text: "No review necessary as only frequencies and associations will be assessed" }
    ]
  },

  whoReviewStat: {
    type: "textarea",
    name: "whoReviewStat",
    legendSize: "l",
    label: "Give details of the person or organisation who undertook the statistical review, and how you have addressed their recommendations.",
    showWhenStatReview: true,
    rows: 5
  },

  outcomeMeasure: {
    type: "textarea",
    name: "outcomeMeasure",
    legendSize: "l",
    label: "What is the outcome measure(s) for this project?",
    hint: "Include: the name of the outcome (do not use abbreviations); the metric or method of measurement used (be as specific as possible); the timepoint(s) of interest.",
    showWhenQuantitative: true,
    rows: 6
    // Note: this field uses moj-add-another in the template for multiple entries
  },

  recordNumbers: {
    type: "textarea",
    name: "recordNumbers",
    legendSize: "l",
    label: "How many participants, samples, or data records do you plan to study in total?",
    hint: "If there is more than one group, give further details.",
    showWhenQuantitative: true,
    rows: 3
  },

  sampleSize: {
    type: "textarea",
    name: "sampleSize",
    legendSize: "l",
    label: "How was the sample size decided upon? If a formal sample size calculation was used, indicate how this was done, giving sufficient information to justify and reproduce the calculation.",
    showWhenQuantitative: true,
    rows: 5
  },

  stopEarlyCriteria: {
    type: "textarea",
    name: "stopEarlyCriteria",
    legendSize: "l",
    label: "What are the criteria for electively stopping the project early?",
    alwaysShow: true,
    rows: 5
  }

}
