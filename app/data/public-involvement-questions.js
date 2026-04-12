// ============================================================
//  public-involvement-questions.js
//
//  Section: Public involvement
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0006)
//
//  Pathway flags:
//  proportionateReview  – contributes towards Proportionate review
//  recBooking           – needed for REC Booking
//  recDataset           – contributes towards the REC dataset
//  studyWideDataset     – contributes towards the Study Wide Review dataset
// ============================================================

module.exports = {

  iqa0045: {
    id: 'IQA0045',
    name: 'iqa0045',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'In which aspects of the project have you already actively involved patients or their carers, service users or members of the public?',
    hint: 'Select all that apply',
    recDataset: true,
    items: [
      { value: 'OPT0035', text: 'identifying, developing, or prioritising the research question' },
      { value: 'OPT0036', text: 'being a member of a research advisory or reference group' },
      { value: 'OPT0037', text: 'being a member of the Trial Management Group or Data Monitoring Committee' },
      { value: 'OPT0038', text: 'developing the research methods (for example, designing questionnaires, or defining endpoints or outcome measures)' },
      { value: 'OPT0039', text: 'ensuring that the design of the research is feasible from the perspective of the participants (for example, identifying potential emotional or practical obstacles for research participants)' },
      { value: 'OPT0040', text: 'designing the inclusion and exclusion criteria including consideration of the demographic diversity of the study population' },
      { value: 'OPT0041', text: 'developing the risk or benefit analysis (for example, identifying and evaluating the probable risks and burden involved for research participants)' },
      { value: 'OPT0042', text: 'developing the recruitment and consent process (for example, how and when to approach potential participants)' },
      { value: 'OPT0043', text: 'developing participant information sheets, the consent forms, and other documents which are used to communicate with potential research participants' },
      { value: 'OPT0044', text: 'developing plain language research summaries' },
      { value: 'OPT0045', text: 'developing or delivering training to staff' },
      { value: 'OPT0046', text: 'developing the dissemination plan for the research' },
      { value: 'OPT0047', text: 'preparing regulatory submissions' },
      { value: 'OPT0048', text: 'planning to attend the Research Ethics Committee meetings to help explain how and why the research design is likely to be acceptable to research participants' },
      { value: 'OPT0033', text: 'other' },
      { value: 'OPT0049', text: 'patients, service users or their carers, or members of the public have not been involved' },
    ],
  },

  iqa0046: {
    id: 'IQA0046',
    name: 'iqa0046',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of how you involved public contributors',
    recDataset: true,
    rows: 5,
  },

  iqa0048: {
    id: 'IQA0048',
    name: 'iqa0048',
    type: 'textarea',
    legendSize: 'l',
    label: 'Insights from patients, carers, services users or members of the public could have helped to ensure that this research reflects the priorities, needs and concerns of both the intended participant population, and of the people the research is intended to benefit. What are your reasons for not involving these people?',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'guidance to refer to quality standards of PIS and wider programme of activity (eg pharma may do PPI on disease area in general to feed into this project but the PPI was not done specifically for this project)'
    },
    recDataset: true,
    rows: 5,
  },

  iqa0042: {
    id: 'IQA0042',
    name: 'iqa0042',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How did you identify the public contributors that you involved?  Select all that apply',
    recDataset: true,
    items: [
      { value: 'OPT0050', text: 'we have existing arrangements in our organisation or team for involving patients, carers, service users or members of the public' },
      { value: 'OPT0051', text: 'we asked an existing patient and public involvement group external to our organisation or team (for example, run by an NHS Trust, university, charity, local councils)' },
      { value: 'OPT0052', text: 'we set up a new arrangement to involve patients, carers, service users or members of the public in our project (for example, posted the opportunity on the People in Research website, local noticeboards, or through a community organisation)' },
      { value: 'OPT0053', text: 'we were approached by some patients, carers, service users, a patient group, or a charity with a suggestion for this research and we have worked with them to develop it' },
      { value: 'OPT0033', text: 'other' },
    ],
  },

  iqa0043: {
    id: 'IQA0043',
    name: 'iqa0043',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details how you identified the public contributors to that you involved.',
    recDataset: true,
    rows: 5,
  },

  iqa0044: {
    id: 'IQA0044',
    name: 'iqa0044',
    type: 'textarea',
    legendSize: 'l',
    label: 'Tell us about the public contributors you worked with:',
    recDataset: true,
    rows: 5,
  },

  iqa03274: {
    id: 'IQA03274',
    name: 'iqa03274',
    type: 'textarea',
    legendSize: 'l',
    label: 'What did your public contributors say was important to them about how this research is done?',
    recDataset: true,
    rows: 5,
  },

  iqa0162: {
    id: 'IQA0162',
    name: 'iqa0162',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How do you plan to involve public contributors in the remaining stages of the research process?  Select all that apply:',
    recDataset: true,
    items: [
      { value: 'OPT0036', text: 'being a member of research advisory or reference group' },
      { value: 'OPT0037', text: 'being a member of the Trial Management Group or Data Monitoring Committee' },
      { value: 'OPT0045', text: 'developing or delivering training to staff' },
      { value: 'OPT0055', text: 'helping to promote this research' },
      { value: 'OPT0056', text: 'carrying out research activities (for example, facilitating focus groups, interviewing or administering questionnaires)' },
      { value: 'OPT0057', text: 'analysing the research findings' },
      { value: 'OPT0058', text: 'contributing to further regulatory submissions (such as amendments)' },
      { value: 'OPT0059', text: 'sharing research results (for example, by presenting at conferences or disseminating the research findings via social media)' },
      { value: 'OPT0060', text: 'developing plain language summaries of the results' },
      { value: 'OPT0061', text: 'there is no plan to involve public contributors in the remaining stages of the research process' },
      { value: 'OPT0033', text: 'other' },
    ],
  },

  iqa0163: {
    id: 'IQA0163',
    name: 'iqa0163',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give details of other aspects public contributors will advise on or contribute to',
    recDataset: true,
    rows: 5,
  },

  iqa03275: {
    id: 'IQA03275',
    name: 'iqa03275',
    type: 'textarea',
    legendSize: 'l',
    label: 'Justify your approach and describe the benefits and challenges of involving public contributors',
    recDataset: true,
    rows: 5,
  },

  iqa03276: {
    id: 'IQA03276',
    name: 'iqa03276',
    type: 'textarea',
    legendSize: 'l',
    label: 'Justify the approach and absence of public involvement',
    recDataset: true,
    rows: 5,
  },

}
