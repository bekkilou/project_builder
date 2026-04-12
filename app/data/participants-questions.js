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
// ============================================================

module.exports = {

  iqa0083: {
    id: 'IQA0083',
    name: 'iqa0083',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Which conditions or problems are you studying?',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0097', text: 'blood' },
      { value: 'OPT0098', text: 'cancer and neoplasms' },
      { value: 'OPT0099', text: 'cardiovascular' },
      { value: 'OPT0100', text: 'congenital disorders' },
      { value: 'OPT0101', text: 'ear' },
      { value: 'OPT0102', text: 'eye' },
      { value: 'OPT0103', text: 'infection' },
      { value: 'OPT0104', text: 'inflammatory and immune system' },
      { value: 'OPT0105', text: 'injuries and accidents' },
      { value: 'OPT0106', text: 'mental health' },
      { value: 'OPT0107', text: 'metabolic and endocrine' },
      { value: 'OPT0108', text: 'musculoskeletal' },
      { value: 'OPT0109', text: 'neurological' },
      { value: 'OPT0110', text: 'oral and gastrointestinal' },
      { value: 'OPT0111', text: 'renal and urogenital' },
      { value: 'OPT0112', text: 'reproductive health and childbirth' },
      { value: 'OPT0113', text: 'respiratory' },
      { value: 'OPT0114', text: 'skin' },
      { value: 'OPT0115', text: 'stroke' },
      { value: 'OPT0116', text: 'generic health relevance' },
      { value: 'OPT0117', text: 'disputed aetiology and other' },
    ],
  },

  iqa0322: {
    id: 'IQA0322',
    name: 'iqa0322',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe the main condition or problem you are studying',
    rows: 5,
  },

  iqa0084: {
    id: 'IQA0084',
    name: 'iqa0084',
    type: 'textarea',
    legendSize: 'l',
    label: 'List the main inclusion criteria',
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
    recDataset: true,
    rows: 5,
    hint: "Include how you will consider any groups that are often excluded",
  },

  iqa0087: {
    id: 'IQA0087',
    name: 'iqa0087',
    type: 'textarea',
    legendSize: 'l',
    label: 'How will you enable people to participate fully?',
    recDataset: true,
    rows: 5,
    hint: "For example, consider any accessibility needs participants may have",
  },

  iqa0089: {
    id: 'IQA0089',
    name: 'iqa0089',
    type: 'input',
    legendSize: 'l',
    label: 'Describe any other groups taking part or providing data or samples for this project',
    recDataset: true,
    studyWideDataset: true,
    hint: "During the scoping of your project, you indicated you would be including groups beyond those listed",
  },

  iqa0090: {
    id: 'IQA0090',
    name: 'iqa0090',
    type: 'date',
    legendSize: 'l',
    legend: 'When will you start recruiting or collecting samples or data?',
    studyWideDataset: true,
    hint: "If you do not know the exact date, enter an estimate",
  },

  iqa0091: {
    id: 'IQA0091',
    name: 'iqa0091',
    type: 'input',
    legendSize: 'l',
    label: 'How long will each participant be involved?',
    recDataset: true,
    studyWideDataset: true,
    hint: "This will be the duration from when participants give informed consent until their last contact with the research team",
  },

  iqa0092: {
    id: 'IQA0092',
    name: 'iqa0092',
    type: 'textarea',
    legendSize: 'l',
    label: 'What are your arrangements for potential participants who are involved in other current research projects or have recently been involved in any research prior to recruitment?',
    recDataset: true,
    rows: 5,
    hint: "Explain checks and arrangements for overlapping participation and safety",
  },

  iqa0093: {
    id: 'IQA0093',
    name: 'iqa0093',
    type: 'radios',
    legendSize: 'l',
    legend: 'Could any participants be considered vulnerable when approached?',
    proportionateReview: true,
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
    hint: "For example, consider capacity, coercion and context",
  },

  tbc007: {
    id: 'TBC007',
    name: 'tbc007',
    type: 'textarea',
    legendSize: 'l',
    label: 'How will you reduce the risk of fake or imposter participants?',
    recDataset: true,
    rows: 5,
    hint: "Describe your screening and identity verification processes",
  },

}
