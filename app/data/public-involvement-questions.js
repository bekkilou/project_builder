// ============================================================
//  public-involvement-questions.js
//
//  Section: Public involvement
//  Note: This section is under active development. The question
//  set has been updated and the flow is currently linear.
//  TBC IDs will be replaced with permanent IQA IDs when assigned.
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
//    addError(errors, 'tbc001', questions['tbc001'].errorMessages.required)
// ============================================================

module.exports = {

  tbc001: {
    id: 'TBC001',
    name: 'tbc001',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How have people with lived experience been actively involved in your research to date?',
    hint: 'Select all that apply',
    errorMessages: {
      required: 'Select at least one option for how people with lived experience have been involved'
    },
    recDataset: true,
    items: [
      { value: 'tbcq01', text: 'Identifying and prioritising the research question(s)', hint: 'For example, talking to the people with lived experience to explore issues/needs and developing a research question together around that topic' },
      { value: 'tbcq02', text: 'Developing an application for funding or ethics review', hint: 'For example, having a patient and public involvement member as a co-applicant and contributing to a review panel or agreeing on the patient and public involvement plan for the future' },
      { value: 'tbcq03', text: 'Design of the research', hint: 'For example, defining the outcome measures, agreeing on a recruitment strategy, or designing participant information' },
    ],
  },

  tbc002: {
    id: 'TBC002',
    name: 'tbc002',
    type: 'textarea',
    legendSize: 'l',
    label: 'Provide further details on your answers above',
    hint: 'Using the UK standards for Public Involvement, explain how people with lived experience—especially from underserved groups—have shaped this application. Please provide sufficient detail, including any training and support provided. You should describe who has been involved, how you found them, why this is appropriate, and what role(s) they have played. Include any challenges faced and how you would like to improve in future. If you have not involved people with lived experience at any one stage, please explain why not.',
    errorMessages: {
      required: 'Enter further details about how people with lived experience have been involved'
    },
    recDataset: true,
    rows: 5,
  },

  tbc003: {
    id: 'TBC003',
    name: 'tbc003',
    type: 'textarea',
    legendSize: 'l',
    label: 'How have people with lived experience shaped the development and design of your research?',
    hint: 'Please explain what you have learnt or changed, for example, a different hypothesis, a better perspective on lived experience challenges or cemented the current approach. Has working with people with lived experience had an impact so far? If so, how? This could be in areas such as identifying and prioritising the research question, designing the study protocols - including the outcomes, contributing to patient materials, or the application itself.',
    errorMessages: {
      required: 'Enter how people with lived experience have shaped the development and design of your research'
    },
    recDataset: true,
    rows: 5,
  },

  tbc004: {
    id: 'TBC004',
    name: 'tbc004',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'How will people with lived experience be actively involved throughout the various stages of your project?',
    hint: 'Select all that apply',
    errorMessages: {
      required: 'Select at least one option for how people with lived experience will be involved'
    },
    recDataset: true,
    items: [
      { value: 'tbcq04', text: 'Management of the research', hint: 'For example, part of a committee that makes key decisions' },
      { value: 'tbcq05', text: 'Undertaking the research', hint: 'For example, carrying out interviews or co-facilitating groups' },
      { value: 'tbcq06', text: 'Writing up the research', hint: 'For example, co-authoring publications or helping with lay summaries' },
      { value: 'tbcq07', text: 'Dissemination of outputs, including research findings', hint: 'For example, co-presenting or designing the communications plan' },
      { value: 'tbcq08', text: 'Implementing research findings or recommendations to change policy and practice', hint: 'For example, sharing and advocating for findings with key stakeholders, or sharing involvement practice' },
      { value: 'tbcq09', text: 'Developing future applications or research' },
    ],
  },

  tbc005: {
    id: 'TBC005',
    name: 'tbc005',
    type: 'textarea',
    legendSize: 'l',
    label: 'Provide further details on your answers above',
    hint: 'Using the UK standards for Public Involvement, describe how people with relevant lived experience—especially from underserved groups—will be involved in the research. Explain the aims of your involvement activity, and how you plan to measure your impact against them, for example, how you will listen to people with lived experience and how this will drive your decision-making. Share how you\'ll build equitable partnerships with people and communities, who and how many you plan to involve, and how you\'ll identify them. Justify your approach and level of involvement over the lifetime of the project and at specific timepoints. Outline how you\'ll engage, support, reward, and provide feedback to those involved. Please include how you plan to manage and coordinate this activity, showing how this is proportionate to your budget and resources. It is important to give as much detail as you can in this section to ensure that the reviewers are able to accurately score your application. If you do not plan to involve people with lived experience at any one stage, please explain why not.',
    errorMessages: {
      required: 'Enter further details about how people with lived experience will be involved'
    },
    recDataset: true,
    rows: 5,
  },

  tbc006: {
    id: 'TBC006',
    name: 'tbc006',
    type: 'textarea',
    legendSize: 'l',
    label: 'How will you try to involve people with lived experience who reflect the communities that your research seeks to directly benefit?',
    hint: 'Please share what you know about the communities your research is seeking to benefit, and how you plan to reach and involve them in the activities set out above. Consider equity, diversity and inclusion and how they individually relate to your research and involvement plans across their lifecycle. Outline some challenges or barriers you and people with lived experience may face and any plans you have to mitigate against them. Detail how you plan to improve the accessibility of your involvement activities throughout.',
    errorMessages: {
      required: 'Enter how you will involve people with lived experience who reflect the communities your research seeks to benefit'
    },
    recDataset: true,
    rows: 5,
  },

}
