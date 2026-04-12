// ============================================================
//  ethical-issues-questions.js
//
//  Section: Summary of ethical issues
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0012)
//
//  Pathway flags:
//  proportionateReview  – contributes towards Proportionate review
//  recBooking           – needed for REC Booking
//  recDataset           – contributes towards the REC dataset
//  studyWideDataset     – contributes towards the Study Wide Review dataset
// ============================================================

module.exports = {

  iqa0323: {
    id: 'IQA0323',
    name: 'iqa0323',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Do you think your application has material ethical issues which need review by a full REC?',
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0117: {
    id: 'IQA0117',
    name: 'iqa0117',
    type: 'textarea',
    legendSize: 'l',
    label: 'Summarise the main ethical issues arising from the project.',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'if consent is ethical issue for interventions - details to be included here'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0324: {
    id: 'IQA0324',
    name: 'iqa0324',
    type: 'textarea',
    legendSize: 'l',
    label: 'Clarify why you consider your application does not have material ethical issues',
    rows: 5,
  },

  iqa0118: {
    id: 'IQA0118',
    name: 'iqa0118',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Is this application any of the following:',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'guidance to explain linked project (sister, next phase etc)'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0231', text: 'has previously received an unfavourable opinion by a REC in the UK' },
      { value: 'OPT0232', text: 'has previously received an unfavourable opinion by a REC in another country' },
      { value: 'OPT0233', text: 'linked to another project' },
      { value: 'OPT0234', text: 'none of the above' },
    ],
  },

  iqa0119: {
    id: 'IQA0119',
    name: 'iqa0119',
    type: 'input',
    legendSize: 'l',
    label: 'Provide the IRAS ID of the project that received an unfavourable opinion',
    recDataset: true,
    studyWideDataset: true,
  },

  iqa0120: {
    id: 'IQA0120',
    name: 'iqa0120',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain how the reasons for the unfavourable opinion have been addressed in this application.',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0039: {
    id: 'IQA0039',
    name: 'iqa0039',
    type: 'textarea',
    legendSize: 'l',
    label: 'Provide any information about the linked project that will help reviewers to understand the background to this application or the decisions you have made in this application.',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

}
