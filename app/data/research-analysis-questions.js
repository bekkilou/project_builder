// ============================================================
//  research-analysis-questions.js
//
//  Section: Research analysis
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0013)
//
//  Pathway flags:
//  proportionateReview  – contributes towards Proportionate review
//  recBooking           – needed for REC Booking
//  recDataset           – contributes towards the REC dataset
//  studyWideDataset     – contributes towards the Study Wide Review dataset
// ============================================================

module.exports = {

  iqa0121: {
    id: 'IQA0121',
    name: 'iqa0121',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How has the quality of the research been assessed as part of the study design process?',
    hint: 'Select all that apply',
    recDataset: true,
    items: [
      { value: 'OPT0235', text: 'Independent external review' },
      { value: 'OPT0236', text: 'Review within a company' },
      { value: 'OPT0237', text: 'Review within a multi−centre research group' },
      { value: 'OPT0238', text: 'Review within the Chief Investigator\'s institution or host organisation' },
      { value: 'OPT0239', text: 'Review within the research team' },
      { value: 'OPT0240', text: 'Review by academic colleague or educational supervisor' },
      { value: 'OPT0033', text: 'Other' },
    ],
  },

  iqa0122: {
    id: 'IQA0122',
    name: 'iqa0122',
    type: 'input',
    legendSize: 'l',
    label: 'Give details of the other methods used to assess the quality quality of the research',
    recDataset: true,
  },

  iqa0123: {
    id: 'IQA0123',
    name: 'iqa0123',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain why this review process is appropriate to the nature of the project ',
	hint: 'Include whether any issues raised by the review have not been addressed, or if the review only relates to part of the project',
    recDataset: true,
    rows: 5,
  },

  iqa0124: {
    id: 'IQA0124',
    name: 'iqa0124',
    type: 'radios',
    legendSize: 'l',
    legend: 'What is the primary form of analysis?',
    hint: 'Just select the primary method, if you are using both forms of analysis you can explain this at the next question',
    recDataset: true,
    items: [
      { value: 'OPT0241', text: 'Qualititative' },
      { value: 'OPT0242', text: 'Quantitative' },
    ],
  },

  iqa0125: {
    id: 'IQA0125',
    name: 'iqa0125',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of the methods for analysing the data.',
    hint: 'If the research is qualitative, include how you will decide there is sufficient data',
    recDataset: true,
    rows: 5,
  },

  iqa0126: {
    id: 'IQA0126',
    name: 'iqa0126',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How have the statistical aspects of the project been reviewed?',
	hint: 'Select all that apply',
    recDataset: true,
    items: [
      { value: 'OPT0243', text: 'Review by independent statistician commissioned by funder or sponsor' },
      { value: 'OPT0244', text: 'Other review by independent statistician' },
      { value: 'OPT0245', text: 'Review by company statistician' },
      { value: 'OPT0246', text: 'Review by a statistician within the Chief Investigator’s institution' },
      { value: 'OPT0247', text: 'Review by a statistician within the research team or multi−centre group' },
      { value: 'OPT0240', text: 'Review by academic colleague or educational supervisor' },
      { value: 'OPT0248', text: 'Other review by individual with relevant statistical expertise' },
      { value: 'OPT0249', text: 'No review necessary as only frequencies and associations will be assessed' },
    ],
  },

  iqa0127: {
    id: 'IQA0127',
    name: 'iqa0127',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of the person or organisation who undertook the statistical review, and how you have addressed their recommendations',
    recDataset: true,
    rows: 5,
  },

  iqa0128: {
    id: 'IQA0128',
    name: 'iqa0128',
    type: 'textarea',
    legendSize: 'l',
    label: 'What are the outcome measures for this project?',
    hint: 'Include the name of the outcomes, the metrics or methods of measurement used, and timepoints',
    recDataset: true,
    rows: 5,
  },


  iqa0130: {
    id: 'IQA0130',
    name: 'iqa0130',
    type: 'textarea',
    legendSize: 'l',
    label: 'How many participants, samples, or data records do you plan to study in total?',
	hint: 'If there will be more than one group, provide details in your answer',
    recDataset: true,
    rows: 5,
  },

  iqa0131: {
    id: 'IQA0131',
    name: 'iqa0131',
    type: 'textarea',
    legendSize: 'l',
    label: 'How did you decide on the sample size?',
	hint: 'If a sample size calculation was used, explain why this calculation method was chosen, and how it can be reproduced',
    recDataset: true,
    rows: 5,
  },

  iqa0132: {
    id: 'IQA0132',
    name: 'iqa0132',
    type: 'textarea',
    legendSize: 'l',
    label: 'What are the criteria for electively stopping the project early?',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

}
