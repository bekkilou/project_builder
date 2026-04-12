// ============================================================
//  governance-questions.js
//
//  Section: Governance and management
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0014)
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
//    addError(errors, 'iqa0142', questions['iqa0142'].errorMessages.required)
// ============================================================

module.exports = {

  iqa0142: {
    id: 'IQA0142',
    name: 'iqa0142',
    type: 'radios',
    legendSize: 'l',
    legend: 'Is your project taking place in any countries outside the UK?',
    hint: 'Select one option',
    errorMessages: {
      required: 'Select whether this project is taking place in any countries other than the UK'
    },
    items: [
      { value: 'OPT0016', text: 'UK only' },
      { value: 'OPT0017', text: 'Multi-national' },
    ],
  },

  iqa0143: {
    id: 'IQA0143',
    name: 'iqa0143',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Select the countries outside the UK where this project will run',
    hint: 'Select all that apply',
    errorMessages: {
      required: 'Select at least one country outside the UK'
    },
    items: [
      { value: 'OPTxxxx', text: 'No list available at the moment' },
    ],
  },

  iqa0325: {
    id: 'IQA0325',
    name: 'iqa0325',
    type: 'radios',
    legendSize: 'l',
    legend: 'Are any materials supplied by an organisation that is not a funder?',
    errorMessages: {
      required: 'Select whether any materials are being supplied from an organisation not providing funding'
    },
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0139' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0139: {
    id: 'IQA0139',
    name: 'iqa0139',
    type: 'input',
    legendSize: 'l',
    label: 'Give details of who supplies the materials',
    hint: 'Include organisation name and role',
    errorMessages: {
      required: 'Enter details of the source of materials supplied'
    },
  },

  iqa0140: {
    id: 'IQA0140',
    name: 'iqa0140',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe any logistical, legal or management risks',
    hint: 'Explain how any risks will be managed',
    errorMessages: {
      required: 'Enter any logistical, legal, or management risks relating to your project'
    },
    studyWideDataset: true,
    rows: 5,
  },

  iqa0147: {
    id: 'IQA0147',
    name: 'iqa0147',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How will you monitor and audit the project?',
    hint: 'Select all that apply',
    errorMessages: {
      required: 'Select at least one monitoring and auditing arrangement'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0250', text: 'Remote monitoring by sponsor or delegate' },
      { value: 'OPT0251', text: 'Self-monitoring by site' },
      { value: 'OPT0252', text: 'On-site monitoring by sponsor or delegate' },
    ],
  },

  iqa0148: {
    id: 'IQA0148',
    name: 'iqa0148',
    type: 'textarea',
    legendSize: 'l',
    label: 'How will you review interim safety and efficacy data?',
    hint: 'For example, describe any arrangements for monitoring committees',
    errorMessages: {
      required: 'Enter the arrangements for reviewing interim safety and efficacy data'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0149: {
    id: 'IQA0149',
    name: 'iqa0149',
    type: 'textarea',
    legendSize: 'l',
    label: 'What insurance or indemnity will cover the sponsor\'s legal liability for harm to participants arising from their participation in the project?',
    hint: 'Include cover limits and what happens if cover ends',
    errorMessages: {
      required: 'Enter the insurance or indemnity arrangements covering the sponsor\'s liability'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0150: {
    id: 'IQA0150',
    name: 'iqa0150',
    type: 'textarea',
    legendSize: 'l',
    label: 'What insurance or indemnity covers the sponsor\'s or employer\'s legal liability for harm arising from the design of the project?',
    hint: 'Include cover limits and what happens if cover ends',
    errorMessages: {
      required: 'Enter the insurance or indemnity arrangements covering liability from the project design'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0151: {
    id: 'IQA0151',
    name: 'iqa0151',
    type: 'textarea',
    legendSize: 'l',
    label: 'What insurance or indemnity arrangements cover investigators and collaborators for harm to participants during the project?',
    hint: 'Include details of any time limits on the cover and what happens if the insurance ceases. You will need to upload applicable insurance certificates as part of your submission.',
    errorMessages: {
      required: 'Enter the insurance or indemnity arrangements for investigators and collaborators'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0152: {
    id: 'IQA0152',
    name: 'iqa0152',
    type: 'textarea',
    legendSize: 'l',
    label: 'Which participant groups are excluded from insurance cover, and why?',
    errorMessages: {
      required: 'Enter which participant groups are excluded from insurance cover and why'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0153: {
    id: 'IQA0153',
    name: 'iqa0153',
    type: 'radios',
    legendSize: 'l',
    legend: 'Has the sponsor made arrangements to compensate participants if harm occurs without legal liability?',
    hint: 'Select one option',
    errorMessages: {
      required: 'Select whether sponsors have made arrangements for compensation in the event of harm'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0154' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0154: {
    id: 'IQA0154',
    name: 'iqa0154',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe the compensation arrangements',
    hint: 'Explain when compensation applies and how to claim',
    errorMessages: {
      required: 'Enter details of the arrangements for compensation'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0155: {
    id: 'IQA0155',
    name: 'iqa0155',
    type: 'radios',
    legendSize: 'l',
    legend: 'Has the sponsor delegated any site management responsibilities to a Contract Research Organisation or a Clinical Trials Unit?',
    hint: 'Select one option',
    errorMessages: {
      required: 'Select whether sponsors have delegated site management to a CRO or CTU'
    },
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0156' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0156: {
    id: 'IQA0156',
    name: 'iqa0156',
    type: 'textarea',
    legendSize: 'l',
    label: 'Name the organisation responsible for site management',
    hint: 'Include legal and trading names',
    errorMessages: {
      required: 'Enter the name of the Contract Research Organisation or Clinical Trials Unit'
    },
    studyWideDataset: true,
    rows: 5,
  },

  iqa0157: {
    id: 'IQA0157',
    name: 'iqa0157',
    type: 'radios',
    legendSize: 'l',
    legend: 'Have any research activities or procedures been delegated to a subcontractor?',
    errorMessages: {
      required: 'Select whether any research activities have been delegated to a subcontractor'
    },
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes', revealOn: 'iqa0158' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0158: {
    id: 'IQA0158',
    name: 'iqa0158',
    type: 'textarea',
    legendSize: 'l',
    label: 'Provide details of the subcontracted organisations and how their work will be overseen',
    errorMessages: {
      required: 'Enter the names of subcontracted organisations and oversight arrangements'
    },
    studyWideDataset: true,
    rows: 5,
  },

}
