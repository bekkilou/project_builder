// ============================================================
//  transparency-questions.js
//
//  Visibility flags:
//  alwaysShow:                         true  = always shown
//  showWhenCTIMP:                      true  = show when isCTIMP == "yes"
//  showWhenDeferralRequested:          true  = show when requestDeferral contains "I request"
//  showWhenNotTreatmentAndRegistered:  true  = show when researchActivities != treatment AND alreadyRegistered == "yes"
//  showWhenRegOther:                   true  = show when regArrangements includes "other"
//  showWhenPublicationDeferral:        true  = show when publicationRequestDeferral contains "I request"
//  showWhenMultiNation:                true  = show when UKOrMultiNation == "multi_national"
//  showWhenDisseminateOther:           true  = show when DisseminateResults includes "other"
//  showWhenBioResource:                true  = show when researchActivities includes previously_collected_biosamples or clinical_people_activities
//  showWhenRemainingBioMaterial:       true  = show when remainingBioMaterial == "yes"
//  showWhenNotRegisterBioMaterial:     true  = show when registerBioMaterial == "no"
// ============================================================

module.exports = {

  alreadyRegistered: {
    type: "radios",
    name: "alreadyRegistered",
    inline: true,
    legendSize: "l",
    legend: "Is the project already registered elsewhere?",
    alwaysShow: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  requestDeferral: {
    type: "radios",
    name: "requestDeferral",
    legendSize: "l",
    legend: "Registration and research project public summary publication deferral request",
    hint: "Deferral will only be agreed where a strong justification is provided.",
    showWhenCTIMP: true,
    items: [
      { value: "no_deferral",               text: "No deferral requested" },
      { value: "deferral_commercial",       text: "I request a deferral of registration and research summary publication – for protection of commercially confidential information" },
      { value: "deferral_other",            text: "I request a deferral of registration and research summary publication – other reason" }
    ]
  },

  justifyDeferral: {
    type: "textarea",
    name: "justifyDeferral",
    legendSize: "l",
    label: "Provide clear justification for the deferral request.",
    showWhenDeferralRequested: true,
    rows: 5
  },

  regArrangements: {
    type: "checkboxes",
    name: "regArrangements",
    legendSize: "l",
    legend: "Confirm the arrangements for registration of this project.",
    hint: "Select all that apply.",
    showWhenNotTreatmentAndRegistered: true,
    items: [
      { value: "will_be_registered", text: "The project will be registered in a registry" },
      { value: "other",              text: "Other arrangements are in place" }
    ]
  },

  regArrangementsOther: {
    type: "textarea",
    name: "regArrangementsOther",
    legendSize: "l",
    label: "Provide details of other arrangements for project registration.",
    showWhenRegOther: true,
    rows: 5
  },

  // Note: CTIMPRegArrangements has conditional sub-inputs (ISRCTN ref, ClinicalTrials.gov ref, other ref)
  // These are rendered as conditional reveals in the template since they contain dynamic sub-fields
  CTIMPRegArrangements: {
    type: "checkboxes",
    name: "CTIMPRegArrangements",
    legendSize: "l",
    legend: "Confirm the arrangements for registration of this project.",
    hint: "Select all that apply",
    showWhenCTIMP: true,
    items: [
      { value: "ISRCTN",           text: "ISRCTN" },
      { value: "clinicaltrials",   text: "Clinicaltrials.com" },
      { value: "other",            text: "Other" }
    ]
    // Conditional sub-inputs (reference numbers) are handled in the page template
  },

  publicationRequestDeferral: {
    type: "radios",
    name: "publicationRequestDeferral",
    legendSize: "l",
    legend: "Project public summary publication deferral request",
    hint: "Deferral will only be agreed where a strong justification is provided.",
    alwaysShow: true,
    items: [
      { value: "no_deferral",         text: "No deferral requested" },
      { value: "deferral_commercial", text: "I request a deferral of research summary publication – for protection of commercially confidential information" },
      { value: "deferral_other",      text: "I request deferral of research summary publication – other reason" }
    ]
  },

  justifyPublicationDeferral: {
    type: "textarea",
    name: "justifyPublicationDeferral",
    legendSize: "l",
    label: "Provide clear justification for the deferral request.",
    showWhenPublicationDeferral: true,
    rows: 5
  },

  plannedEndDate: {
    type: "date",
    name: "plannedEndDate",
    legendSize: "l",
    legend: "What is the planned end date?",
    hint: "For example, 27 3 2007",
    alwaysShow: true
  },

  // showWhenMultiNation — second end date for global study end
  plannedEndDateMulti: {
    type: "date",
    name: "plannedEndDateMulti",
    legendSize: "l",
    legend: "What is the planned global study end date?",
    hint: "For example, 27 3 2007",
    showWhenMultiNation: true
  },

  DisseminateResults: {
    type: "checkboxes",
    name: "DisseminateResults",
    legendSize: "l",
    legend: "A final report should be submitted to the Research Ethics Committee (REC) within 12 months of the end of the project, including a public summary of results. How else do you intend to report and disseminate the results of the project?",
    hint: "Select all that apply.",
    alwaysShow: true,
    items: [
      { value: "peer_reviewed_journals",    text: "Peer reviewed scientific journals" },
      { value: "internal_report",           text: "Internal report" },
      { value: "conference_presentation",   text: "Conference presentation" },
      { value: "publication_on_website",    text: "Publication on website" },
      { value: "other_publication",         text: "Other publication" },
      { value: "submission_to_regulatory",  text: "Submission to regulatory authorities" },
      { value: "access_raw_data",           text: "Access to raw data and right to publish freely by all investigators in study or by Independent Steering Committee on behalf of all investigators" },
      { value: "no_plans",                  text: "No plans to report or disseminate the results" },
      { value: "other",                     text: "Other" }
    ]
  },

  otherDisseminateResults: {
    type: "textarea",
    name: "otherDisseminateResults",
    legendSize: "l",
    label: "Give details of other reporting and dissemination plans.",
    showWhenDisseminateOther: true,
    rows: 5
  },

  participantResults: {
    type: "textarea",
    name: "participantResults",
    legendSize: "l",
    label: "Explain how and when you will inform participants of the results, or give reasons if there are no arrangements to do this.",
    hint: "Results of the research should provide feedback to participants on the outcome and how they have contributed. This information should be accessible and easy to understand.",
    alwaysShow: true,
    rows: 5
  },

  shareDeIdentified: {
    type: "radios",
    name: "shareDeIdentified",
    inline: true,
    legendSize: "l",
    legend: "Do you plan to share de-identified individual participant-level data?",
    hint: "You should enable the sharing of study data, with appropriate safeguards in place, to other interested groups and communities. Sharing data maximises and respects the contribution of participants and enables further re-use.",
    alwaysShow: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  shareDeIdentifiedDetails: {
    type: "textarea",
    name: "shareDeIdentifiedDetails",
    legendSize: "l",
    label: "Give details of your plans for sharing de-identified individual participant-level data, or describe your alternative plans for making data available for scrutiny or re-use.",
    alwaysShow: true,
    rows: 5
  },

  remainingBioMaterial: {
    type: "radios",
    name: "remainingBioMaterial",
    inline: true,
    legendSize: "l",
    legend: "Will you have any remaining human biological material at the end of the project?",
    showWhenBioResource: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  registerBioMaterial: {
    type: "radios",
    name: "registerBioMaterial",
    inline: true,
    legendSize: "l",
    legend: "The UK Clinical Research Collaboration (UKCRC) Tissue Directory and Coordination Centre advises researchers to register sample collections with them, to maximise the use of the samples. Will you be registering any remaining samples with them?",
    showWhenRemainingBioMaterial: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  registerBioMaterialNo: {
    type: "textarea",
    name: "registerBioMaterialNo",
    legendSize: "l",
    label: "Justify the post-study arrangements or destruction of the material.",
    hint: "The Human Tissue Authority and Medical Research Council advise researchers to consider options for maximising use before disposal. You should enable the sharing of tissue samples, with appropriate safeguards in place, to other interested groups and communities.",
    showWhenNotRegisterBioMaterial: true,
    rows: 5
  },

  // Public contact details — always shown
  // Note: these are rendered as grouped address fieldsets in the template
  publicEmail: {
    type: "input",
    name: "publicEmail",
    legendSize: "l",
    label: "Public contact email address",
    hint: "Use generic contact details rather than naming an individual person.",
    alwaysShow: true
  },

  publicPhoneNumber: {
    type: "input",
    name: "publicPhoneNumber",
    legendSize: "l",
    label: "Public contact UK phone number",
    alwaysShow: true
  },

  publicAddressLine1:    { type: "input", name: "publicAddressLine1",    label: "Address line 1",           alwaysShow: true },
  publicAddressLine2:    { type: "input", name: "publicAddressLine2",    label: "Address line 2 (optional)", alwaysShow: true },
  publicAddressTown:     { type: "input", name: "publicAddressTown",     label: "Town or city",             alwaysShow: true },
  publicAddressCounty:   { type: "input", name: "publicAddressCounty",   label: "County (optional)",        alwaysShow: true },
  publicAddressPostcode: { type: "input", name: "publicAddressPostcode", label: "Postcode",                 alwaysShow: true },

  // Scientific contact details — always shown
  scientificEmail: {
    type: "input",
    name: "scientificEmail",
    legendSize: "l",
    label: "Scientific contact email address",
    hint: "Use generic contact details rather than naming an individual person.",
    alwaysShow: true
  },

  scientificPhoneNumber: {
    type: "input",
    name: "scientificPhoneNumber",
    legendSize: "l",
    label: "Scientific contact UK phone number",
    alwaysShow: true
  },

  scientificAddressLine1:    { type: "input", name: "scientificAddressLine1",    label: "Address line 1",           alwaysShow: true },
  scientificAddressLine2:    { type: "input", name: "scientificAddressLine2",    label: "Address line 2 (optional)", alwaysShow: true },
  scientificAddressTown:     { type: "input", name: "scientificAddressTown",     label: "Town or city",             alwaysShow: true },
  scientificAddressCounty:   { type: "input", name: "scientificAddressCounty",   label: "County (optional)",        alwaysShow: true },
  scientificAddressPostcode: { type: "input", name: "scientificAddressPostcode", label: "Postcode",                 alwaysShow: true }

}
