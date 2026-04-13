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
//
//  Error messages:
//  Each question that requires validation has an errorMessages object.
//  Reference these in route files instead of hardcoding strings:
//    addError(errors, 'iqa0323', questions['iqa0323'].errorMessages.required)
// ============================================================

module.exports = {

  iqa0323: {
    id: 'IQA0323',
    name: 'iqa0323',
    type: 'radios',
    legendSize: 'l',
    legend: 'Does your application have material ethical issues that need a full REC review?',
    errorMessages: {
      required: 'Select whether your application has material ethical issues needing full REC review'
    },
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0117: {
    id: 'IQA0117',
    name: 'iqa0117',
    type: 'textarea',
    legendSize: 'l',
    label: 'Summarise the main ethical issues in your project',
    hint: 'Using plain English, describe any risks, burdens or benefits to participants and how they are justified',
    errorMessages: {
      required: 'Enter a summary of the main ethical issues arising from the project'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0324: {
    id: 'IQA0324',
    name: 'iqa0324',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain why you think your application does not have material ethical issues',
    errorMessages: {
      required: 'Enter why you consider your application does not have material ethical issues'
    },
    rows: 5,
  },

  iqa0272: {
    id: 'IQA0272',
    name: 'iqa0272',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will you notify the people concerned if such findings arise?',
    errorMessages: {
      required: 'Select whether you will notify the people concerned if health-related findings arise'
    },
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0273' },
      { value: 'no',  text: 'No',  revealOn: 'iqa0274' },
    ],
  },

  iqa0273: {
    id: 'IQA0273',
    name: 'iqa0273',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain how and when you will notify them',
    errorMessages: {
      required: 'Enter how and when you will notify the people concerned'
    },
    rows: 5,
  },

  iqa0274: {
    id: 'IQA0274',
    name: 'iqa0274',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain why you will not notify the people concerned',
    errorMessages: {
      required: 'Enter why you will not notify the people concerned'
    },
    rows: 5,
  },

  iqa0118: {
    id: 'IQA0118',
    name: 'iqa0118',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Does this application fall into any of these categories?',
    errorMessages: {
      required: 'Select at least one option, or select \'None of these\''
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0231', text: 'Previously received an unfavourable opinion from a REC in the UK' },
      { value: 'OPT0232', text: 'Previously received an unfavourable opinion from a REC in another country' },
      { value: 'OPT0233', text: 'Linked to another project' },
      { divider: 'or' },
      { value: 'OPT0234', text: 'None of these' },
    ],
  },

  iqa0119: {
    id: 'IQA0119',
    name: 'iqa0119',
    type: 'input',
    legendSize: 'l',
    label: 'Enter the IRAS ID of the project that received an unfavourable opinion',
    errorMessages: {
      required: 'Enter the IRAS ID of the project that received an unfavourable opinion'
    },
    recDataset: true,
    studyWideDataset: true,
  },

  iqa0120: {
    id: 'IQA0120',
    name: 'iqa0120',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain how you have addressed the reasons for the previous unfavourable opinion',
    errorMessages: {
      required: 'Enter how the reasons for the unfavourable opinion have been addressed'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0039: {
    id: 'IQA0039',
    name: 'iqa0039',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give information about the linked project that will help reviewers understand the background to this application and your decisions',
    errorMessages: {
      required: 'Enter information about the linked project'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

}
