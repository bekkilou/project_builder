// ============================================================
//  research-activities-questions.js
//
//  Section: Research activities
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0008)
//
//  Pathway flags:
//  proportionateReview  – contributes towards Proportionate review
//  recBooking           – needed for REC Booking
//  recDataset           – contributes towards the REC dataset
//  studyWideDataset     – contributes towards the Study Wide Review dataset
// ============================================================

module.exports = {

  iqa0062: {
    id: 'IQA0062',
    name: 'iqa0062',
    type: 'textarea',
    legendSize: 'l',
    label: 'What is the intervention or treatment being studied?',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0063: {
    id: 'IQA0063',
    name: 'iqa0063',
    type: 'radios',
    legendSize: 'l',
    legend: 'Is this treatment first-in-human?',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0064: {
    id: 'IQA0064',
    name: 'iqa0064',
    type: 'radios',
    legendSize: 'l',
    legend: 'Does your project involve a change or a delay to patients’ standard treatment or care?',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0065: {
    id: 'IQA0065',
    name: 'iqa0065',
    type: 'radios',
    legendSize: 'l',
    legend: 'Are any of the treatments in this project being compared to standard care?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'explain that asking this because if standard care changes in future we want to know what they are going to do about it (in the next question)'
    },
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0066: {
    id: 'IQA0066',
    name: 'iqa0066',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe what arrangements you will put in place to address any changes in standard care during the project, for example resulting from new guidance from the National Institute for Health and Care Excellence (NICE).',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'eg Explain if the Steering Committee Terms of Reference will include review of changes to standard of care - need details where intervention is in addition to standard of care'
    },
    recDataset: true,
    rows: 5,
  },

  iqa03273: {
    id: 'IQA03273',
    name: 'iqa03273',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'What type of questionnaires are you using in this project? Select all that apply:',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'used to determine PR'
    },
    proportionateReview: true,
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0128', text: 'use of validated questionnaires within their intended purpose and intended population' },
      { value: 'OPT0129', text: 'use of validated questionnaires outside of their intended purpose and population' },
      { value: 'OPT0130', text: 'use of non-validated questionnaires' },
      { value: 'OPT0131', text: 'no questionnaires included in project' },
    ],
  },

  iqa0068: {
    id: 'IQA0068',
    name: 'iqa0068',
    type: 'radios',
    legendSize: 'l',
    legend: 'Could Is it possible there a possibility that any the project involve interviews, questionnaires or group discussions include with topics that might be sensitive, embarrassing or upsetting?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'used to determine PR'
    },
    proportionateReview: true,
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0070: {
    id: 'IQA0070',
    name: 'iqa0070',
    type: 'radios',
    legendSize: 'l',
    legend: 'Could Is it possible there a possibility that any conversations, the interviews, questionnaires or group discussions include topics that might result in criminal or other serious disclosures?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'used to determine PR * define \'serious consequences\' * inclusion of accidental disclosures (see PR policy/procedure)'
    },
    proportionateReview: true,
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0071: {
    id: 'IQA0071',
    name: 'iqa0071',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain how any requirement for criminal or other disclosures will be dealt with in line with legal obligations, safeguarding arrangements and professional procedures and guidance.',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0072: {
    id: 'IQA0072',
    name: 'iqa0072',
    type: 'textarea',
    legendSize: 'l',
    label: 'What are the potential benefits for participants and society (including future patients)?',
    recDataset: true,
    rows: 5,
  },

  iqa0073: {
    id: 'IQA0073',
    name: 'iqa0073',
    type: 'input',
    legendSize: 'l',
    label: 'Describe the potential safety concerns, risks and burdens in the project and how you will minimise these.',
    proportionateReview: true,
    recDataset: true,
  },

  iqa0074: {
    id: 'IQA0074',
    name: 'iqa0074',
    type: 'textarea',
    legendSize: 'l',
    label: 'Any risks, side-effects or burdens of any research activities or monitoring of participants:',
    proportionateReview: true,
    recDataset: true,
    rows: 5,
  },

  iqa0075: {
    id: 'IQA0075',
    name: 'iqa0075',
    type: 'textarea',
    legendSize: 'l',
    label: 'Any risks due to a change or delay to standard treatment or care:',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'give example of \'washout period\' - this would be change of standard treatment or care'
    },
    proportionateReview: true,
    recDataset: true,
    rows: 5,
  },

  iqa0076: {
    id: 'IQA0076',
    name: 'iqa0076',
    type: 'textarea',
    legendSize: 'l',
    label: 'Any risk or burden due to interviews, questionnaires or group discussions that include topics that might be sensitive, embarrassing or upsetting:',
    proportionateReview: true,
    recDataset: true,
    rows: 5,
  },

  iqa0077: {
    id: 'IQA0077',
    name: 'iqa0077',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will you inform the participants’ General Practitioners (or any other health or care professional responsible for their care) that they are taking part in the study?',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0078: {
    id: 'IQA0078',
    name: 'iqa0078',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain the circumstances when you will contact General Practitioners or other responsible health or care professionals about a participant. What will you tell participants about this?',
    recDataset: true,
    rows: 5,
  },

  iqa0079: {
    id: 'IQA0079',
    name: 'iqa0079',
    type: 'radios',
    legendSize: 'l',
    legend: 'What will happen with treatment after the project has finished?',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0132', text: 'Treatment will continue to be provided once the project has finished' },
      { value: 'OPT0133', text: 'Treatment will not continue to be provided once the project has finished' },
    ],
  },

  iqa0080: {
    id: 'IQA0080',
    name: 'iqa0080',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe all the arrangements for continuued provision of treatment after the project has finished, including funding. Give details of the parties that have agreed these arrangements.',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0081: {
    id: 'IQA0081',
    name: 'iqa0081',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe the care arrangements after the project has finished.  Justify these arrangements',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0082: {
    id: 'IQA0082',
    name: 'iqa0082',
    type: 'date',
    legendSize: 'l',
    legend: 'When do you plan to finish collecting data for this project in the UK?',
    recDataset: true,
    studyWideDataset: true,
  },

}
