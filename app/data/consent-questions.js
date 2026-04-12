
// ============================================================
//  consent-questions.js
//
//  Section: Consent
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0010)
//
//  Pathway flags:
//  proportionateReview  – contributes towards Proportionate review
//  recBooking           – needed for REC Booking
//  recDataset           – contributes towards the REC dataset
//  studyWideDataset     – contributes towards the Study Wide Review dataset
// ============================================================

module.exports = {

  iqa0096: {
    id: 'IQA0096',
    name: 'iqa0096',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Will you only include adults lacking capacity to consent for themselves as participants?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'disable rest of this section if answer is only adults lacking capacity to consent for themselves - add signpost to ALC section'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0134', text: 'only adults with capacity to consent for themselves as participants' },
      { value: 'OPT0135', text: 'only adults lacking capacity to consent for themselves' },
      { value: 'OPT0136', text: 'both adults with capacity and lacking capacity to consent for themselves' },
    ],
  },

  iqa0095: {
    id: 'IQA0095',
    name: 'iqa0095',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will you only include children as participants?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'disable rest of this section if answer is yes - add signpost to children section'
    },
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0097: {
    id: 'IQA0097',
    name: 'iqa0097',
    type: 'radios',
    legendSize: 'l',
    legend: 'Will you seek consent from participants prior to participation in the project?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'enable rest of this section if answer is yes. Guidance to be clear that this section applies only to the adults with capacity'
    },
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0137', text: 'Consent will be obtained from all participants' },
      { value: 'OPT0138', text: 'Consent will not be obtained from any participants' },
      { value: 'OPT0139', text: 'Consent will not be obtained in some situations' },
    ],
  },

  iqa0098: {
    id: 'IQA0098',
    name: 'iqa0098',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Select the reasons why consent will not be obtained.  Select all that apply:',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0140', text: 'Consent will not be obtained for the use of non-identifiable data or samples that are not identifiable' },
      { value: 'OPT0141', text: 'Consent will not be obtained for access to data by the usual care team' },
      { value: 'OPT0033', text: 'Other' },
    ],
  },

  iqa0099: {
    id: 'IQA0099',
    name: 'iqa0099',
    type: 'textarea',
    legendSize: 'l',
    label: 'Justify why you will not seek consent:',
    recDataset: true,
    rows: 5,
  },

  iqa0100: {
    id: 'IQA0100',
    name: 'iqa0100',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe any arrangements for seeking consent using simplified methods:',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'rephrased existing CTIMP - guidance needed for what simplifed methods refer to'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0102: {
    id: 'IQA0102',
    name: 'iqa0102',
    type: 'textarea',
    legendSize: 'l',
    label: 'How long will you allow potential participants to decide whether or not to take part?',
    recDataset: true,
    rows: 5,
  },

  iqa0103: {
    id: 'IQA0103',
    name: 'iqa0103',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain any payments, reimbursement of expenses or any other benefits or incentives to participants:',
    recDataset: true,
    rows: 5,
  },

  iqa0104: {
    id: 'IQA0104',
    name: 'iqa0104',
    type: 'textarea',
    legendSize: 'l',
    label: 'What arrangements will you make to comply with the principles of the Welsh Language Act in the provision of information to participants in Wales?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'need to make sure the text in the QSG is the one mandated by WG'
    },
    studyWideDataset: true,
    rows: 5,
  },

  iqa0105: {
    id: 'IQA0105',
    name: 'iqa0105',
    type: 'textarea',
    legendSize: 'l',
    label: 'What consent arrangements will you make for persons who:',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0106: {
    id: 'IQA0106',
    name: 'iqa0106',
    type: 'textarea',
    legendSize: 'l',
    label: 'What arrangements will you make for participants who are unable to confirm their consent in writing?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'rephrased existing CTIMP Guidance to clarify that this includes not being able to complete questionnaires where consent is implied by returning. In writing means ink or digitally.'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0107: {
    id: 'IQA0107',
    name: 'iqa0107',
    type: 'textarea',
    legendSize: 'l',
    label: 'What arrangements will you make to ensure participants receive any information that becomes available during the course of the project that may be relevant to their continued participation?',
    recDataset: true,
    rows: 5,
  },

  iqa0108: {
    id: 'IQA0108',
    name: 'iqa0108',
    type: 'radios',
    legendSize: 'l',
    legend: 'What steps would you take if a participant, who has given informed consent, loses capacity to consent during the research project? Select one option only.',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0142', text: 'The participant would be withdrawn from the project.  Identifiable data or tissue already collected with consent would be retained and used.  No further data or tissue would be collected or any other research procedures carried out on or in relation to the participant.' },
      { value: 'OPT0143', text: 'The participant would continue to be included in the project.' },
      { value: 'OPT0144', text: 'Not applicable – informed consent will not be sought from any participants in this project.' },
    ],
  },

  iqa0109: {
    id: 'IQA0109',
    name: 'iqa0109',
    type: 'input',
    legendSize: 'l',
    label: 'Proceed to complete Adults Lacking Capacity',
  },

}
