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
// ============================================================

module.exports = {

  iqa0110: {
    id: 'IQA0110',
    name: 'iqa0110',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe potential risks to the research team in conducting the project and state how these will be managed',
    recDataset: true,
    rows: 5,
  },

  iqa0111: {
    id: 'IQA0111',
    name: 'iqa0111',
    type: 'radios',
    legendSize: 'l',
    legend: 'Does the Chief Investigator or any other investigator or collaborator have any direct personal involvement (for example, financial, share-holding, personal relationship) in the organisations sponsoring or funding the project that may give rise to a possible conflict of interest?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'a. Personal financial interests  b. Organisational financial interests  c. Non-financial interests'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0112: {
    id: 'IQA0112',
    name: 'iqa0112',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of any potential relevant conflict of interest.',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'include details of the individuals and the potential conflict of interest  if application is also for MoD, details of who these people are need to be included'
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
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0114: {
    id: 'IQA0114',
    name: 'iqa0114',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Select all Research Ethics Committees (REC) the Chief Investigator or any other investigators are a member of.  Select all that apply.',
    recBooking: true,
    recDataset: true,
  },

  iqa0115: {
    id: 'IQA0115',
    name: 'iqa0115',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will the Chief Investigator or any other investigator receive any personal payment over and above normal salary, or any other benefits or incentives, for taking part in this project?',
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

}
