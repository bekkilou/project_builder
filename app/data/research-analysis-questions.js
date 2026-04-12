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
    legend: 'How has the quality of the research been assessed?  Select all that apply.',
    guidance: {
      summary: 'Read guidance for this question',
      html: '* guidance : geared towards commercial and how it relates to them (not interested in other regulatory reviews - this Q is more about pre-reg review)'
    },
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
    label: 'Give details of how the quality of the research has been assessed',
    recDataset: true,
  },

  iqa0123: {
    id: 'IQA0123',
    name: 'iqa0123',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain why this review process is appropriate to the nature of the project and if any issues raised by the review have not been addressed.  Give details if the review only relates to part of the project.',
    recDataset: true,
    rows: 5,
  },

  iqa0124: {
    id: 'IQA0124',
    name: 'iqa0124',
    type: 'radios',
    legendSize: 'l',
    legend: 'What will the primary form of analysis be?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'if analysis involves both, this is to be described in 3a - we are looking for primary form of analysis'
    },
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
    guidance: {
      summary: 'Read guidance for this question',
      html: 'If the research is qualitative we want to know how it will be decided that there is sufficient data'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0126: {
    id: 'IQA0126',
    name: 'iqa0126',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How have the statistical aspects of the project been reviewed?  Select all that apply.',
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
    label: 'Give details of the person or organisation who undertook the statistical review, and how you have addressed their recommendations.',
    recDataset: true,
    rows: 5,
  },

  iqa0128: {
    id: 'IQA0128',
    name: 'iqa0128',
    type: 'textarea',
    legendSize: 'l',
    label: 'What is the primary outcome measure for the project?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'Include: The name of the outcome (do not use abbreviations) The metric or method of measurement used (be as specific as possible) The timepoint(s) of interest'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0129: {
    id: 'IQA0129',
    name: 'iqa0129',
    type: 'textarea',
    legendSize: 'l',
    label: 'What are the secondary outcome measures (if any)?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'For each outcome include: The name of the outcome (do not use abbreviations) The metric or method of measurement used (be as specific as possible) The timepoint(s) of interest'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0130: {
    id: 'IQA0130',
    name: 'iqa0130',
    type: 'textarea',
    legendSize: 'l',
    label: 'How many participants, samples, or data records do you plan to study in total? Describe why you chose this number. If there is more than one group, give further details.',
    recDataset: true,
    rows: 5,
  },

  iqa0131: {
    id: 'IQA0131',
    name: 'iqa0131',
    type: 'textarea',
    legendSize: 'l',
    label: 'How was the sample size decided upon? If a formal sample size calculation was used, indicate how this was done, giving sufficient information to justify and reproduce the calculation.',
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
