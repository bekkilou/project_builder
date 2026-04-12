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
// ============================================================

module.exports = {

  iqa0169: {
    id: 'IQA0169',
    name: 'iqa0169',
    type: 'radios',
    legendSize: 'l',
    legend: 'Is the project already registered elsewhere?',
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0165: {
    id: 'IQA0165',
    name: 'iqa0165',
    type: 'radios',
    legendSize: 'l',
    legend: 'Registration and research project public summary publication deferral request',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'Include contextual help which initially needs to indicate that publication is currently on HRA website – and then update to IRAS website in due course. Also explain arrangements for automatic registration'
    },
    recDataset: true,
    items: [
      { value: 'OPT0253', text: 'No deferral requested' },
      { value: 'OPT0254', text: 'I request a deferral of registration and research summary publication – for protection of commercially confidential information' },
      { value: 'OPT0255', text: 'I request a deferral of registration and research summary publication – other reason' },
    ],
  },

  iqa0166: {
    id: 'IQA0166',
    name: 'iqa0166',
    type: 'textarea',
    legendSize: 'l',
    label: 'Provide clear justification for the deferral request.',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'Guidance needs to say already having registered is not a reason for deferral as not asking for a deferral.'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0167: {
    id: 'IQA0167',
    name: 'iqa0167',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Confirm the arrangements for registration of this project. Select all that apply:',
    items: [
      { value: 'OPT0256', text: 'The project will be registered in a registry' },
      { value: 'OPT0257', text: 'Other arrangements are in place' },
    ],
  },

  iqa0168: {
    id: 'IQA0168',
    name: 'iqa0168',
    type: 'textarea',
    legendSize: 'l',
    label: 'Provide details of other arrangements for project registration.',
    rows: 5,
  },

  iqa0169: {
    id: 'IQA0169',
    name: 'iqa0169',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Confirm the arrangements for registration of this project. Select all that apply.',
    recDataset: true,
    items: [
      { value: 'OPT0258', text: 'ISRCTN' },
      { value: 'OPT0259', text: 'Clinicaltrials.gov' },
      { value: 'OPT0033', text: 'Other' },
    ],
  },

  iqa0170: {
    id: 'IQA0170',
    name: 'iqa0170',
    type: 'input',
    legendSize: 'l',
    label: 'ISRCTN',
    recDataset: true,
  },

  iqa0171: {
    id: 'IQA0171',
    name: 'iqa0171',
    type: 'input',
    legendSize: 'l',
    label: 'Clinicaltrials.gov',
    recDataset: true,
  },

  iqa0172: {
    id: 'IQA0172',
    name: 'iqa0172',
    type: 'input',
    legendSize: 'l',
    label: 'Provide the name of any other registries and the reference number',
    recDataset: true,
  },

  iqa0173: {
    id: 'IQA0173',
    name: 'iqa0173',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Project public summary publication deferral request',
    items: [
      { value: 'OPT0253', text: 'No deferral requested' },
      { value: 'OPT0260', text: 'I request a deferral of research summary publication – for protection of commercially confidential information' },
      { value: 'OPT0261', text: 'I request deferral of research summary publication – other reason' },
    ],
  },

  iqa0174: {
    id: 'IQA0174',
    name: 'iqa0174',
    type: 'textarea',
    legendSize: 'l',
    label: 'Provide clear justification for the deferral request.',
    rows: 5,
  },

  iqa0175: {
    id: 'IQA0175',
    name: 'iqa0175',
    type: 'date',
    legendSize: 'l',
    legend: 'You should define the end of your project and notify relevant bodies at the end of the project.  What is the planned end date?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'rephrased existing CTIMP'
    },
    recDataset: true,
    studyWideDataset: true,
  },

  iqa0176: {
    id: 'IQA0176',
    name: 'iqa0176',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'A final report should be submitted to the Research Ethics Committee (REC) within 12 months of the end of the project, including a public summary of results. How else do you intend to report and disseminate the results of the project? Select all that apply:',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'cover expectations for public reporting'
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
      { value: 'OPT0033', text: 'Other' },
    ],
  },

  iqa0177: {
    id: 'IQA0177',
    name: 'iqa0177',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of other reporting and dissemination plans',
    recDataset: true,
    rows: 5,
  },

  iqa0178: {
    id: 'IQA0178',
    name: 'iqa0178',
    type: 'textarea',
    legendSize: 'l',
    label: 'Results of the research provide feedback to participants on the outcome and how they have contributed.  This information should be accessible and easy to understand.',
    recDataset: true,
    rows: 5,
  },

  iqa0179: {
    id: 'IQA0179',
    name: 'iqa0179',
    type: 'radios',
    legendSize: 'l',
    legend: 'You should enable the sharing of study data, with appropriate safeguards in place, to other interested groups and communities. Sharing data maximises and respects the contribution of participants and enables and supports further re-use. Do you plan to share de-identified individual participant-level data?',
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0180: {
    id: 'IQA0180',
    name: 'iqa0180',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of your plans for sharing de-identified individual participant-level data, or describe your alternative plans for making data available for scrutiny or re-use.',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'rephrased existing CTIMP'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0181: {
    id: 'IQA0181',
    name: 'iqa0181',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will you have any remaining human biological material at the end of the project?',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0182: {
    id: 'IQA0182',
    name: 'iqa0182',
    type: 'radios',
    legendSize: 'l',
    legend: 'The UK Clinical Research Collaboration (UKCRC) Tissue Directory and Coordination Centre advises researchers to register sample collections with them, to maximise the use of the samples. Will you be registering any remaining samples with them?',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0183: {
    id: 'IQA0183',
    name: 'iqa0183',
    type: 'textarea',
    legendSize: 'l',
    label: 'The Human Tissue Authority and Medical Research Council advise researchers to consider options for maximising use before disposal. You should enable the sharing of tissue samples, with appropriate safeguards in place, to other interested groups and communities. Sharing tissue maximises and respects the contribution of participants and enables and supports further research. Justify the post-study arrangements or destruction of the material.',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0184: {
    id: 'IQA0184',
    name: 'iqa0184',
    type: 'input',
    legendSize: 'l',
    label: 'What is the contact point for public queries about this project? This information will be made public so you should use generic contact details rather than naming an individual person.',
  },

  iqa0185: {
    id: 'IQA0185',
    name: 'iqa0185',
    type: 'input',
    legendSize: 'l',
    label: 'Email',
  },

  iqa0186: {
    id: 'IQA0186',
    name: 'iqa0186',
    type: 'input',
    legendSize: 'l',
    label: 'Telephone',
  },

  iqa0187: {
    id: 'IQA0187',
    name: 'iqa0187',
    type: 'input',
    legendSize: 'l',
    label: 'Postal address',
  },

  iqa0188: {
    id: 'IQA0188',
    name: 'iqa0188',
    type: 'input',
    legendSize: 'l',
    label: 'What is the contact point for scientific queries about this project? This information will be made public so you should use generic contact details rather than naming an individual person.',
  },

  iqa0189: {
    id: 'IQA0189',
    name: 'iqa0189',
    type: 'input',
    legendSize: 'l',
    label: 'Email',
  },

  iqa0190: {
    id: 'IQA0190',
    name: 'iqa0190',
    type: 'input',
    legendSize: 'l',
    label: 'Telephone',
  },

  iqa0191: {
    id: 'IQA0191',
    name: 'iqa0191',
    type: 'input',
    legendSize: 'l',
    label: 'Postal address',
  },

}
