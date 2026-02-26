// ============================================================
//  research-design-questions.js
//
//  Visibility flags:
//  alwaysShow:              true  = always shown
//  showWhenMethodOther:     true  = show when methodologies includes "other"
//  showWhenTrial:           true  = show when methodologies includes "randomised_controlled_trial" or "controlled_trial_without_randomisation"
//  showWhenTrialOther:      true  = show when trialMethodologies includes "other_complex_or_innovative_design"
//  showWhenDesignAI:        true  = show when useAI includes "designing_developing_testing_ai"
//  showWhenExistingAI:      true  = show when useAI includes "using_existing_ai"
//  showWhenDesignAIOther:   true  = show when designAI includes "other"
//  showWhenExistingAIOther: true  = show when existingAI includes "other"
// ============================================================

module.exports = {

  methodologies: {
    type: "checkboxes",
    name: "methodologies",
    legendSize: "l",
    legend: "Select the methodology or methodologies you will be using for this project",
    hint: "Select all that apply",
    alwaysShow: true,
    items: [
      { value: "case_series_or_case_note_review",       text: "Case series or case note review" },
      { value: "case_control",                          text: "Case control" },
      { value: "cohort_observation",                    text: "Cohort observation" },
      { value: "controlled_trial_without_randomisation",text: "Controlled trial without randomisation" },
      { value: "cross_sectional_study",                 text: "Cross-sectional study" },
      { value: "database_analysis",                     text: "Database analysis" },
      { value: "epidemiology",                          text: "Epidemiology" },
      { value: "feasibility_or_pilot_study",            text: "Feasibility or pilot study" },
      { value: "laboratory_study",                      text: "Laboratory study" },
      { value: "meta_analysis",                         text: "Meta-analysis" },
      { value: "qualitative_research",                  text: "Qualitative research" },
      { value: "questionnaire_interview_or_observation",text: "Questionnaire, interview or observation study" },
      { value: "randomised_controlled_trial",           text: "Randomised controlled trial" },
      { value: "other",                                 text: "Other" }
    ]
  },

  methodologiesOther: {
    type: "textarea",
    name: "methodologiesOther",
    legendSize: "l",
    label: "Give details of the methodologies you will be using",
    showWhenMethodOther: true,
    rows: 3
  },

  trialMethodologies: {
    type: "checkboxes",
    name: "trialMethodologies",
    legendSize: "l",
    legend: "Select the trial methodology",
    hint: "Select all that apply",
    showWhenTrial: true,
    items: [
      { value: "basket_trial",                      text: "Basket trial" },
      { value: "bayesian",                          text: "Bayesian" },
      { value: "blinded",                           text: "Blinded" },
      { value: "cluster_randomised",                text: "Cluster-randomised" },
      { value: "comparative",                       text: "Comparative" },
      { value: "cross_over",                        text: "Cross-over" },
      { value: "double_blinded",                    text: "Double-blinded" },
      { value: "open",                              text: "Open" },
      { value: "other_complex_or_innovative_design",text: "Other complex or innovative design" },
      { value: "parallel_arms",                     text: "Parallel arms" },
      { value: "platform_trial",                    text: "Platform trial" },
      { value: "real_world",                        text: "Real-world" },
      { value: "targeted_or_stratified",            text: "Targeted or stratified" },
      { value: "umbrella_trial",                    text: "Umbrella trial" }
    ]
  },

  trialMethodologiesOther: {
    type: "textarea",
    name: "trialMethodologiesOther",
    legendSize: "l",
    label: "Give details of the other complex or innovative design you will be using",
    showWhenTrialOther: true,
    rows: 3
  },

  methodologiesDetails: {
    type: "textarea",
    name: "methodologiesDetails",
    legendSize: "l",
    label: "Give details of the methodologies you will be using",
    alwaysShow: true,
    rows: 8
  },

  novelIntervention: {
    type: "radios",
    name: "novelIntervention",
    inline: true,
    legendSize: "l",
    legend: "Is your project a clinical trial to study a novel intervention?",
    showWhenTrial: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  // showWhenTrialNotNovel: show when trial AND novelIntervention == "no"
  compareIntervention: {
    type: "radios",
    name: "compareIntervention",
    inline: true,
    legendSize: "l",
    legend: "Is your project a randomised clinical trial to compare any interventions in clinical practice?",
    showWhenTrialNotNovel: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  // showWhenTrialNotNovelNotComparison: show when trial AND novelIntervention == "no" AND compareIntervention == "no"
  goldIntervention: {
    type: "radios",
    name: "goldIntervention",
    inline: true,
    legendSize: "l",
    legend: "Are all the interventions that you are comparing routine 'gold standard' care options in clinical practice?",
    showWhenTrialNotNovelNotComparison: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  researchQuestion: {
    type: "textarea",
    name: "researchQuestion",
    legendSize: "l",
    label: "What is the principal research question or objective? Describe this in language understandable to a member of the public.",
    alwaysShow: true,
    rows: 5
    // Note: this field uses moj-add-another in the template for multiple entries
  },

  useAI: {
    type: "checkboxes",
    name: "useAI",
    legendSize: "l",
    legend: "Does your project use AI (artificial intelligence)?",
    hint: "Select all that apply",
    alwaysShow: true,
    items: [
      { value: "designing_developing_testing_ai", text: "Designing, developing or testing an AI product or tool" },
      { value: "using_existing_ai",               text: "Using an existing AI product or tool for its intended purpose" },
      { value: "no_ai",                           text: "The project does not involve the use of AI" }
    ]
  },

  designAI: {
    type: "checkboxes",
    name: "designAI",
    legendSize: "l",
    legend: "In relation to designing, developing or testing an AI product or tool, what best describes the type of AI?",
    hint: "Select all that apply",
    showWhenDesignAI: true,
    items: [
      { value: "image_analysis",                    text: "Image analysis" },
      { value: "other_machine_learning",            text: "Other machine learning applications" },
      { value: "natural_language_processing",       text: "Natural language processing" },
      { value: "generative_ai_or_llm",              text: "Generative AI or large language models" },
      { value: "robotics",                          text: "Robotics" },
      { value: "other",                             text: "Other" }
    ]
  },

  otherAI: {
    type: "textarea",
    name: "otherAI",
    legendSize: "l",
    label: "Describe the type of AI being used in your project",
    showWhenDesignAIOther: true,
    rows: 3
  },

  existingAI: {
    type: "checkboxes",
    name: "existingAI",
    legendSize: "l",
    legend: "In relation to using an existing AI product or tool for its intended purpose, what best describes the type of AI?",
    hint: "Select all that apply",
    showWhenExistingAI: true,
    items: [
      { value: "image_analysis",                    text: "Image analysis" },
      { value: "other_machine_learning",            text: "Other machine learning applications" },
      { value: "natural_language_processing",       text: "Natural language processing" },
      { value: "generative_ai_or_llm",              text: "Generative AI or large language models" },
      { value: "robotics",                          text: "Robotics" },
      { value: "other",                             text: "Other" }
    ]
  },

  otherExistingAI: {
    type: "textarea",
    name: "otherExistingAI",
    legendSize: "l",
    label: "Describe the type of AI being used in your project",
    showWhenExistingAIOther: true,
    rows: 3
  },

  willHappen: {
    type: "textarea",
    name: "willHappen",
    legendSize: "l",
    label: "State exactly what will happen to participants, their tissue or data, how many times and in what order",
    hint: "Complete this in language understandable to a member of the public",
    alwaysShow: true,
    rows: 10
  }

}
