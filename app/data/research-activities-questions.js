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
//
//  Error messages:
//  Each question that requires validation has an errorMessages object.
//  Reference these in route files instead of hardcoding strings:
//    addError(errors, 'iqa0062', questions['iqa0062'].errorMessages.required)
// ============================================================

module.exports = {

  iqa0062: {
    id: 'IQA0062',
    name: 'iqa0062',
    type: 'textarea',
    legendSize: 'l',
    label: 'What is the intervention or treatment being studied?',
    hint: 'Provide the trade name and brand name where relevant of any device or medicine. For surgical, psychological or non-clinical interventions briefly describe the nature of the intervention. If relevant, include details of any control arm.',
    errorMessages: {
      required: 'Enter a description of the intervention or treatment being studied'
    },
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
    errorMessages: {
      required: 'Select whether this treatment is first-in-human'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0064: {
    id: 'IQA0064',
    name: 'iqa0064',
    type: 'radios',
    legendSize: 'l',
    legend: 'Does your project involve a change or a delay to patients\' standard treatment or care?',
    hint: 'Select one option',
    errorMessages: {
      required: 'Select whether the project involves a change or delay to standard treatment or care'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0065: {
    id: 'IQA0065',
    name: 'iqa0065',
    type: 'radios',
    legendSize: 'l',
    legend: 'Are any of the treatments in this project being compared to standard care?',
    hint: 'Select one option',
    errorMessages: {
      required: 'Select whether any treatments are being compared to standard care'
    },
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No', revealOn: 'iqa0066' },
    ],
  },

  iqa0066: {
    id: 'IQA0066',
    name: 'iqa0066',
    type: 'textarea',
    legendSize: 'l',
    label: 'How will you handle any changes in routine care during the project (for example, new NICE guidance)?',
    hint: 'For example, explain if the steering committee terms of reference will include review of changes to routine care',
    errorMessages: {
      required: 'Enter the arrangements you will put in place to address changes in standard care'
    },
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
    errorMessages: {
      required: 'Select at least one option, or select \'No questionnaires included in project\''
    },
    proportionateReview: true,
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0128', text: 'Use of validated questionnaires within their intended purpose and intended population' },
      { value: 'OPT0129', text: 'Use of validated questionnaires outside of their intended purpose and population' },
      { value: 'OPT0130', text: 'Use of non-validated questionnaires' },
      { value: 'OPT0131', text: 'No questionnaires included in project' },
    ],
  },

  iqa0068: {
    id: 'IQA0068',
    name: 'iqa0068',
    type: 'radios',
    legendSize: 'l',
    legend: 'Could any interviews, questionnaires or group discussions include topics that might be sensitive, embarrassing or upsetting?',
    hint: 'Select one option',
    errorMessages: {
      required: 'Select whether interviews, questionnaires or discussions may include sensitive topics'
    },
    proportionateReview: true,
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0070: {
    id: 'IQA0070',
    name: 'iqa0070',
    type: 'radios',
    legendSize: 'l',
    legend: 'Could any conversations, interviews, questionnaires or group discussions include topics that might result in criminal or other serious disclosures?',
    hint: 'Select one option',
    errorMessages: {
      required: 'Select whether discussions could include topics that result in criminal or serious disclosures'
    },
    proportionateReview: true,
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0071' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0071: {
    id: 'IQA0071',
    name: 'iqa0071',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain how you will handle any criminal or other serious disclosures, in line with the law, safeguarding and professional guidance.',
    hint: 'Explain what arrangements and processes will be in place, including support for the researcher',
    errorMessages: {
      required: 'Enter how criminal or other disclosures will be dealt with'
    },
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
    errorMessages: {
      required: 'Enter the potential benefits for participants and society'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0073: {
    id: 'IQA0073',
    name: 'iqa0073',
    type: 'input',
    legendSize: 'l',
    label: 'How will you handle potential safety concerns, risks and burdens in the project?',
    errorMessages: {
      required: 'Enter how you will handle potential safety concerns, risks and burdens'
    },
    proportionateReview: true,
    recDataset: true,
  },

  iqa0074: {
    id: 'IQA0074',
    name: 'iqa0074',
    type: 'textarea',
    legendSize: 'l',
    label: 'List any risks, side effects or burdens from research activities or monitoring.',
    errorMessages: {
      required: 'Enter any risks, side-effects or burdens of research activities'
    },
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
    errorMessages: {
      required: 'Enter any risks due to a change or delay to standard treatment or care'
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
    label: 'List any risks or burdens from interviews, questionnaires or groups on sensitive or upsetting topics.',
    errorMessages: {
      required: 'Enter any risk or burden due to sensitive, embarrassing or upsetting topics'
    },
    proportionateReview: true,
    recDataset: true,
    rows: 5,
  },

  iqa0077: {
    id: 'IQA0077',
    name: 'iqa0077',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will you inform participants\' GPs (or other health or care professionals responsible for their care) that they are taking part?',
    hint: 'Select one option',
    errorMessages: {
      required: 'Select whether you will inform participants\' General Practitioners'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0078' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0078: {
    id: 'IQA0078',
    name: 'iqa0078',
    type: 'textarea',
    legendSize: 'l',
    label: 'When will you contact participants\' GPs or other care professionals, and what will you tell participants about this?',
    errorMessages: {
      required: 'Enter the circumstances when you will contact the participant\'s GP'
    },
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
    errorMessages: {
      required: 'Select what will happen with treatment after the project has finished'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0132', text: 'Treatment will continue to be provided once the project has finished', revealOn: 'iqa0080' },
      { value: 'OPT0133', text: 'Treatment will not continue to be provided once the project has finished', revealOn: 'iqa0081' },
    ],
  },

  iqa0080: {
    id: 'IQA0080',
    name: 'iqa0080',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe the arrangements for continued treatment after the project finishes, including funding.',
    hint: 'Include details of the parties that have agreed these arrangements',
    errorMessages: {
      required: 'Enter the arrangements for continued provision of treatment after the project'
    },
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
    errorMessages: {
      required: 'Enter the care arrangements after the project has finished'
    },
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
    errorMessages: {
      required: 'Enter the planned date for finishing data collection'
    },
    recDataset: true,
    studyWideDataset: true,
  },

}
