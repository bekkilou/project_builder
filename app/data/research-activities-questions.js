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
	hint: 'Provide the trade name and brand name where relevant of any device or medicine. For surgical, psychological or non-clinical interventions briefly describe the nature of the intervention. If relevant, include details of any control arm.',
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
	hint: 'Select one option',
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
	hint: 'Select one option',
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
	hint: 'Select one option',
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
    label: 'How will you handle any changes in routine care during the project (for example, new NICE guidance)?',
    hint: 'For example, explain if the steering committee terms of reference will include review of changes to routine care',
    recDataset: true,
    rows: 5,
  },

  iqa03273: {
    id: 'IQA03273',
    name: 'iqa03273',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'What type of questionnaires are you using in this project?',
    hint: 'Select all that apply',
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
    legend: 'Could any interviews, questionnaires or group discussions include topics that might be sensitive, embarrassing or upsetting?',
    hint: 'Select one option',
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
    legend: 'Could any conversations, interviews, questionnaires or group discussions include topics that might result in criminal or other serious disclosures?',
    hint: 'Select one option',
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
    label: 'Explain how you will handle any criminal or other serious disclosures, in line with the law, safeguarding and professional guidance.',
	hint: 'Explain what arrangements and processes will be in place, including support for the researcher',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0072: {
    id: 'IQA0072',
    name: 'iqa0072',
    type: 'textarea',
    legendSize: 'l',
    label: 'What are the potential benefits for participants and society?',
    recDataset: true,
    rows: 5,
  },

  iqa0073: {
    id: 'IQA0073',
    name: 'iqa0073',
    type: 'input',
    legendSize: 'l',
    label: 'How will you handle potential safety concerns, risks and burdens in the project?',
    proportionateReview: true,
    recDataset: true,
  },

  iqa0074: {
    id: 'IQA0074',
    name: 'iqa0074',
    type: 'textarea',
    legendSize: 'l',
    label: 'List any risks, side effects or burdens from research activities or monitoring.',
    proportionateReview: true,
    recDataset: true,
    rows: 5,
  },

  iqa0075: {
    id: 'IQA0075',
    name: 'iqa0075',
    type: 'textarea',
    legendSize: 'l',
    label: 'List any risks from a change or delay to standard treatment or care.',
    hint: 'For example, due to a washout period to stop routine treatment prior to starting study treatment',
    proportionateReview: true,
    recDataset: true,
    rows: 5,
  },

  iqa0076: {
    id: 'IQA0076',
    name: 'iqa0076',
    type: 'textarea',
    legendSize: 'l',
    label: 'List any risks or burdens from interviews, questionnaires or groups on sensitive or upsetting topics.',
    proportionateReview: true,
    recDataset: true,
    rows: 5,
  },

  iqa0077: {
    id: 'IQA0077',
    name: 'iqa0077',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will you inform participants’ GPs (or other health or care professionals responsible for their care) that they are taking part?',
	hint: 'Select one option',
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
    label: 'When will you contact participants’ GPs or other care professionals, and what will you tell participants about this?',
    recDataset: true,
    rows: 5,
  },

  iqa0079: {
    id: 'IQA0079',
    name: 'iqa0079',
    type: 'radios',
    legendSize: 'l',
    legend: 'What will happen with treatment after the project finishes?',
	hint: 'Select one option',
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
    label: 'Describe the arrangements for continued treatment after the project finishes, including funding.',
	hint: 'Include details of the parties that have agreed these arrangements',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0081: {
    id: 'IQA0081',
    name: 'iqa0081',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe the care arrangements after the project finishes and explain why.',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0082: {
    id: 'IQA0082',
    name: 'iqa0082',
    type: 'date',
    legendSize: 'l',
    legend: 'When will you finish collecting data in the UK?',
	hint: 'For example, 19 May 2030',
    recDataset: true,
    studyWideDataset: true,
  },

}
