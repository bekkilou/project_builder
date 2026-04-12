// ============================================================
//  risks-and-conflicts-questions.js
//
//  Section: Risks and conflicts of interest
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0011)
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
//    addError(errors, 'iqa0110', questions['iqa0110'].errorMessages.required)
// ============================================================

module.exports = {

  iqa0110: {
    id: 'IQA0110',
    name: 'iqa0110',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe any risks to the research team and how you will manage them',
    hint: 'For example, potential risks to researchers visiting participants in their homes',
    errorMessages: {
      required: 'Enter potential risks to the research team and how they will be managed'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0111: {
    id: 'IQA0111',
    name: 'iqa0111',
    type: 'radios',
    legendSize: 'l',
    legend: 'Do any investigators have a personal interest in a sponsor or funder that could be a conflict of interest?',
    hint: 'For example, financial interests, share-holding, or a personal relationship',
    errorMessages: {
      required: 'Select whether any investigator has a personal involvement that may give rise to a conflict of interest'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0112' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0112: {
    id: 'IQA0112',
    name: 'iqa0112',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of any potential conflict of interest',
    hint: 'Include details of the individuals and the nature of the conflict',
    errorMessages: {
      required: 'Enter details of the potential conflict of interest'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0113: {
    id: 'IQA0113',
    name: 'iqa0113',
    type: 'radios',
    legendSize: 'l',
    legend: 'Is the Chief Investigator a member of any NHS Research Ethics Committee?',
    hint: 'Select one option',
    errorMessages: {
      required: 'Select whether the Chief Investigator is a member of any NHS Research Ethics Committee'
    },
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0114' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0114: {
    id: 'IQA0114',
    name: 'iqa0114',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Which Research Ethics Committees are they a member of?',
    hint: 'Select all that apply',
    errorMessages: {
      required: 'Select at least one Research Ethics Committee'
    },
    recBooking: true,
    recDataset: true,
    items: [
      { value: 'xxxxx', text: 'Sorry, no list of Research Ethics Committees is currently available' },
    ],
  },

  iqa0115: {
    id: 'IQA0115',
    name: 'iqa0115',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will any investigators receive personal payments, incentives or other benefits for working on this project?',
    hint: 'This does not include their normal salary',
    errorMessages: {
      required: 'Select whether any investigator will receive personal payment or benefits'
    },
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0116' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0116: {
    id: 'IQA0116',
    name: 'iqa0116',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of payments, benefits or any other incentives',
    errorMessages: {
      required: 'Enter details of payments, benefits or other incentives'
    },
    recDataset: true,
    rows: 5,
  },

}
