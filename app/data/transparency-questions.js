// ============================================================
//  transparency-questions.js
//
//  Section: Transparency
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0015)
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
//    addError(errors, 'iqa0165', questions['iqa0165'].errorMessages.required)
//
//  Note: iqa0169b is a temporary key for the CTIMP registry type checkboxes,
//  which shares IQA0169 in the source spreadsheet. This will be updated
//  when a corrected ID is assigned.
// ============================================================

module.exports = {

  iqa0169: {
    id: 'IQA0169',
    name: 'iqa0169',
    type: 'radios',
    legendSize: 'l',
    legend: 'Is the project already registered?',
    errorMessages: {
      required: 'Select whether the project is already registered elsewhere'
    },
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0165: {
    id: 'IQA0165',
    name: 'iqa0165',
    type: 'radios',
    legendSize: 'l',
    legend: 'Do you want to defer registration and publishing the public summary?',
    hint: 'Deferral will only be agreed where a strong justification is provided',
    errorMessages: {
      required: 'Select whether you are requesting a deferral'
    },
    recDataset: true,
    items: [
      { value: 'OPT0253', text: 'No deferral requested' },
      { value: 'OPT0254', text: 'I request a deferral of registration and research summary publication – for protection of commercially confidential information', revealOn: 'iqa0166' },
      { value: 'OPT0255', text: 'I request a deferral of registration and research summary publication – other reason', revealOn: 'iqa0166' },
    ],
  },

  iqa0166: {
    id: 'IQA0166',
    name: 'iqa0166',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain why you are asking for a deferral',
    errorMessages: {
      required: 'Enter a justification for the deferral request'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0167: {
    id: 'IQA0167',
    name: 'iqa0167',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How will you register this project?',
    hint: 'Select all that apply',
    errorMessages: {
      required: 'Select at least one registration arrangement'
    },
    items: [
      { value: 'OPT0256', text: 'The project will be registered in a registry' },
      { value: 'OPT0257', text: 'Other arrangements are in place', revealOn: 'iqa0168' },
    ],
  },

  iqa0168: {
    id: 'IQA0168',
    name: 'iqa0168',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe any other registration arrangements',
    errorMessages: {
      required: 'Enter details of other arrangements for project registration'
    },
    rows: 5,
  },

  // Temporary key — shares IQA0169 in source spreadsheet.
  // Rename when a corrected ID is assigned.
  iqa0169b: {
    id: 'IQA0169',
    name: 'iqa0169b',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How will you register this project?',
    hint: 'Select all that apply',
    errorMessages: {
      required: 'Select at least one registration arrangement'
    },
    recDataset: true,
    items: [
      { value: 'OPT0258', text: 'ISRCTN',             revealOn: 'iqa0170' },
      { value: 'OPT0259', text: 'Clinicaltrials.gov', revealOn: 'iqa0171' },
      { value: 'OPT0033', text: 'Other',              revealOn: 'iqa0172' },
    ],
  },

  iqa0170: {
    id: 'IQA0170',
    name: 'iqa0170',
    type: 'input',
    legendSize: 'l',
    label: 'ISRCTN reference number',
    errorMessages: {
      required: 'Enter the ISRCTN reference number'
    },
    recDataset: true,
  },

  iqa0171: {
    id: 'IQA0171',
    name: 'iqa0171',
    type: 'input',
    legendSize: 'l',
    label: 'Clinicaltrials.gov reference number',
    errorMessages: {
      required: 'Enter the Clinicaltrials.gov reference number'
    },
    recDataset: true,
  },

  iqa0172: {
    id: 'IQA0172',
    name: 'iqa0172',
    type: 'input',
    legendSize: 'l',
    label: 'Name of other registry and reference number',
    errorMessages: {
      required: 'Enter the name and reference number of the other registry'
    },
    recDataset: true,
  },

  iqa0173: {
    id: 'IQA0173',
    name: 'iqa0173',
    type: 'radios',
    legendSize: 'l',
    legend: 'Do you want to defer publishing the public summary?',
    errorMessages: {
      required: 'Select your publication deferral request option'
    },
    items: [
      { value: 'OPT0253', text: 'No deferral requested' },
      { value: 'OPT0260', text: 'I request a deferral of research summary publication – for protection of commercially confidential information', revealOn: 'iqa0174' },
      { value: 'OPT0261', text: 'I request deferral of research summary publication – other reason', revealOn: 'iqa0174' },
    ],
  },

  iqa0174: {
    id: 'IQA0174',
    name: 'iqa0174',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain why you are asking for a deferral',
    errorMessages: {
      required: 'Enter a justification for the publication deferral request'
    },
    rows: 5,
  },

  iqa0175: {
    id: 'IQA0175',
    name: 'iqa0175',
    type: 'date',
    legendSize: 'l',
    legend: 'When is the planned project end date?',
    hint: 'For example, 27 March 2007',
    errorMessages: {
      required: 'Enter the planned end date'
    },
    recDataset: true,
    studyWideDataset: true,
  },

  iqa0176: {
    id: 'IQA0176',
    name: 'iqa0176',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How will you report and share the project results?',
    hint: 'This is in addition to the final report which should be submitted to the Research Ethics Committee (REC) within 12 months of the end of the project and include a public summary of results. Select all that apply.',
    errorMessages: {
      required: 'Select at least one option for reporting and disseminating results'
    },
    recDataset: true,
    items: [
      { value: 'OPT0262', text: 'Peer reviewed scientific journals' },
      { value: 'OPT0263', text: 'Internal report' },
      { value: 'OPT0264', text: 'Conference presentation' },
      { value: 'OPT0265', text: 'Publication on website' },
      { value: 'OPT0266', text: 'Other publication' },
      { value: 'OPT0267', text: 'Submission to regulatory authorities' },
      { value: 'OPT0268', text: 'Access to raw data and right to publish freely by all investigators in study or by Independent Steering Committee on behalf of all investigators' },
      { value: 'OPT0269', text: 'No plans to report or disseminate the results' },
      { value: 'OPT0033', text: 'Other', revealOn: 'iqa0177' },
    ],
  },

  iqa0177: {
    id: 'IQA0177',
    name: 'iqa0177',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of other reporting and dissemination plans',
    errorMessages: {
      required: 'Enter details of other reporting and dissemination plans'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0178: {
    id: 'IQA0178',
    name: 'iqa0178',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain how and when you will inform participants of the results, or why you will not',
    hint: 'Where possible, participants should receive accessible and easy to understand information on the outcome of the research and how they contributed',
    errorMessages: {
      required: 'Enter how and when you will inform participants of the results'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0179: {
    id: 'IQA0179',
    name: 'iqa0179',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will you share de‑identified individual participant‑level data?',
    hint: 'Where possible you should enable the sharing of study data, with appropriate safeguards in place, to other interested groups and communities',
    errorMessages: {
      required: 'Select whether you plan to share de-identified individual participant-level data'
    },
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0180: {
    id: 'IQA0180',
    name: 'iqa0180',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe your plans for sharing de‑identified participant‑level data, or how you will make data available for scrutiny or re‑use',
    errorMessages: {
      required: 'Enter details of your plans for sharing de-identified data or your alternative arrangements'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0181: {
    id: 'IQA0181',
    name: 'iqa0181',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will any human biological material remain at the end of the project?',
    errorMessages: {
      required: 'Select whether you will have any remaining human biological material at the end of the project'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0182: {
    id: 'IQA0182',
    name: 'iqa0182',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will you register any remaining samples with the UKCRC Tissue Directory and Coordination Centre?',
    hint: 'The UKCRC advises researchers to register sample collections with them, to maximise the use of the samples',
    errorMessages: {
      required: 'Select whether you will register remaining samples with the UKCRC Tissue Directory'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no',  text: 'No' },
    ],
  },

  iqa0183: {
    id: 'IQA0183',
    name: 'iqa0183',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain the post‑study arrangements for destruction of the material and why',
    hint: 'The Human Tissue Authority and Medical Research Council advise researchers to consider options for maximising use before disposal, such as sharing of tissue samples to other interested groups and communities',
    errorMessages: {
      required: 'Enter a justification for the post-study arrangements or destruction of the material'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

}
