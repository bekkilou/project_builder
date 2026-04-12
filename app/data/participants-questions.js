// ============================================================
//  participants-questions.js
//
//  Section: Participants
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0009)
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
//    addError(errors, 'iqa0083', questions['iqa0083'].errorMessages.required)
// ============================================================

module.exports = {

  iqa0083: {
    id: 'IQA0083',
    name: 'iqa0083',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Which conditions or problems are you studying?',
    errorMessages: {
      required: 'Select at least one primary condition or problem being studied'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0097', text: 'Blood' },
      { value: 'OPT0098', text: 'Cancer and neoplasms' },
      { value: 'OPT0099', text: 'Cardiovascular' },
      { value: 'OPT0100', text: 'Congenital disorders' },
      { value: 'OPT0101', text: 'Ear' },
      { value: 'OPT0102', text: 'Eye' },
      { value: 'OPT0103', text: 'Infection' },
      { value: 'OPT0104', text: 'Inflammatory and immune system' },
      { value: 'OPT0105', text: 'Injuries and accidents' },
      { value: 'OPT0106', text: 'Mental health' },
      { value: 'OPT0107', text: 'Metabolic and endocrine' },
      { value: 'OPT0108', text: 'Musculoskeletal' },
      { value: 'OPT0109', text: 'Neurological' },
      { value: 'OPT0110', text: 'Oral and gastrointestinal' },
      { value: 'OPT0111', text: 'Renal and urogenital' },
      { value: 'OPT0112', text: 'Reproductive health and childbirth' },
      { value: 'OPT0113', text: 'Respiratory' },
      { value: 'OPT0114', text: 'Skin' },
      { value: 'OPT0115', text: 'Stroke' },
      { value: 'OPT0116', text: 'Generic health relevance' },
      { value: 'OPT0117', text: 'Disputed aetiology and other' },
    ],
  },

  iqa0322: {
    id: 'IQA0322',
    name: 'iqa0322',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe the main condition or problem you are studying',
    errorMessages: {
      required: 'Enter the primary condition or problem being studied'
    },
    rows: 5,
  },

  iqa0084: {
    id: 'IQA0084',
    name: 'iqa0084',
    type: 'textarea',
    legendSize: 'l',
    label: 'List the main inclusion criteria',
    errorMessages: {
      required: 'Enter the principal inclusion criteria'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0085: {
    id: 'IQA0085',
    name: 'iqa0085',
    type: 'textarea',
    legendSize: 'l',
    label: 'List the main exclusion criteria',
    errorMessages: {
      required: 'Enter the principal exclusion criteria'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0086: {
    id: 'IQA0086',
    name: 'iqa0086',
    type: 'textarea',
    legendSize: 'l',
    label: 'How will your sample reflect the real-world population affected by the condition you are studying?',
    hint: 'Include how you will consider any groups that are often excluded',
    errorMessages: {
      required: 'Enter how you are ensuring your study sample reflects the real-world population'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0087: {
    id: 'IQA0087',
    name: 'iqa0087',
    type: 'textarea',
    legendSize: 'l',
    label: 'How will you enable people to participate fully?',
    hint: 'For example, consider any accessibility needs participants may have',
    errorMessages: {
      required: 'Enter how you will ensure participants are able to participate fully'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0089: {
    id: 'IQA0089',
    name: 'iqa0089',
    type: 'input',
    legendSize: 'l',
    label: 'Describe any other groups taking part or providing data or samples for this project',
    hint: 'During the scoping of your project, you indicated you would be including groups beyond those listed',
    errorMessages: {
      required: 'Enter details of the other groups participating in this project'
    },
    recDataset: true,
    studyWideDataset: true,
  },

  iqa0090: {
    id: 'IQA0090',
    name: 'iqa0090',
    type: 'date',
    legendSize: 'l',
    legend: 'When will you start recruiting or collecting samples or data?',
    hint: 'If you do not know the exact date, enter an estimate',
    errorMessages: {
      required: 'Enter the planned start date for recruiting participants'
    },
    studyWideDataset: true,
  },

  iqa0091: {
    id: 'IQA0091',
    name: 'iqa0091',
    type: 'input',
    legendSize: 'l',
    label: 'How long will each participant be involved?',
    hint: 'This will be the duration from when participants give informed consent until their last contact with the research team',
    errorMessages: {
      required: 'Enter how long you expect each participant to be in the project'
    },
    recDataset: true,
    studyWideDataset: true,
  },

  iqa0092: {
    id: 'IQA0092',
    name: 'iqa0092',
    type: 'textarea',
    legendSize: 'l',
    label: 'What are your arrangements for potential participants who are involved in other current research projects or have recently been involved in any research prior to recruitment?',
    hint: 'Explain checks and arrangements for overlapping participation and safety',
    errorMessages: {
      required: 'Enter the arrangements for participants currently involved in other research'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0093: {
    id: 'IQA0093',
    name: 'iqa0093',
    type: 'radios',
    legendSize: 'l',
    legend: 'Could any participants be considered vulnerable when approached?',
    hint: 'For example, consider capacity, coercion and context',
    errorMessages: {
      required: 'Select whether any potential participants could be considered vulnerable'
    },
    proportionateReview: true,
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No' },
    ],
  },

  tbc007: {
    id: 'TBC007',
    name: 'tbc007',
    type: 'textarea',
    legendSize: 'l',
    label: 'How will you reduce the risk of fake or imposter participants?',
    hint: 'Describe your screening and identity verification processes',
    errorMessages: {
      required: 'Enter the measures being taken to address the risk of fake or imposter participants'
    },
    recDataset: true,
    rows: 5,
  },

}
