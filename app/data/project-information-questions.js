// ============================================================
//  project-information-questions.js
//
//  Section: Project information
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0005)
//
//  Pathway flags:
//  proportionateReview  – contributes towards Proportionate review
//  recBooking           – needed for REC Booking
//  recDataset           – contributes towards the REC dataset
//  studyWideDataset     – contributes towards the Study Wide Review dataset
// ============================================================

module.exports = {

  iqa0036: {
    id: 'IQA0036',
    name: 'iqa0036',
    type: 'input',
    legendSize: 'l',
    label: 'Provide protocol reference number',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'guidance to be clear that we are not seeking registration numbers here (for ISRCTN etc that is requested in Project details: Transparency)'
    },
  },

  iqa0037: {
    id: 'IQA0037',
    name: 'iqa0037',
    type: 'input',
    legendSize: 'l',
    label: 'Provide the EU Clinical Trial (EUCT) number',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'EUCT covers EudraCT number'
    },
  },

  iqa0040: {
    id: 'IQA0040',
    name: 'iqa0040',
    type: 'textarea',
    legendSize: 'l',
    label: 'Research project public summary:',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

}
