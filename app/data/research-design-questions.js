// ============================================================
//  research-design-questions.js
//
//  Section: Research design and methodology
//  Generated from: Master_-_Application_Questions_v0_10_20251027_WIP__2_.xlsx (sheet B, section IQT0007)
//
//  Pathway flags:
//  proportionateReview  – contributes towards Proportionate review
//  recBooking           – needed for REC Booking
//  recDataset           – contributes towards the REC dataset
//  studyWideDataset     – contributes towards the Study Wide Review dataset
// ============================================================

module.exports = {

  iqa0049: {
    id: 'IQA0049',
    name: 'iqa0049',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Which research methods will you use?',
	hint: 'Select all that apply',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0062', text: 'case series or case note review' },
      { value: 'OPT0063', text: 'case control' },
      { value: 'OPT0064', text: 'cohort observation' },
      { value: 'OPT0065', text: 'controlled trial without randomisation' },
      { value: 'OPT0066', text: 'cross-sectional study' },
      { value: 'OPT0067', text: 'database analysis' },
      { value: 'OPT0068', text: 'epidemiology' },
      { value: 'OPT0069', text: 'feasibility or pilot study' },
      { value: 'OPT0070', text: 'laboratory study' },
      { value: 'OPT0071', text: 'metanalysis' },
      { value: 'OPT0072', text: 'qualitative research' },
      { value: 'OPT0073', text: 'questionnaire, interview or observation study' },
      { value: 'OPT0074', text: 'randomised controlled trial' },
      { value: 'OPT0033', text: 'other', revealOn: 'iqa0050' },
    ],
  },
	  iqa0050: {
		id: 'IQA0050',
		name: 'iqa0050',
		type: 'input',
		legendSize: 'l',
		label: 'Give details of the methods you will use',
		recDataset: true,
	  },

  iqa0051: {
    id: 'IQA0051',
    name: 'iqa0051',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Which trial methods will you use?',
    hint: 'Select all that apply',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0075', text: 'basket trial' },
      { value: 'OPT0076', text: 'bayesian' },
      { value: 'OPT0077', text: 'blinded' },
      { value: 'OPT0078', text: 'cluster-randomised' },
      { value: 'OPT0079', text: 'comparative' },
      { value: 'OPT0080', text: 'cross-over' },
      { value: 'OPT0081', text: 'double-blinded' },
      { value: 'OPT0082', text: 'open' },
      { value: 'OPT0084', text: 'parallel arms' },
      { value: 'OPT0085', text: 'platform trial' },
      { value: 'OPT0086', text: 'real-world' },
      { value: 'OPT0087', text: 'targeted or stratified' },
      { value: 'OPT0088', text: 'umbrella trial' },
	  { value: 'OPT0083', text: 'other complex or innovative design', revealOn: 'iqa0052' },
    ],
  },
	  iqa0052: {
		id: 'IQA0052',
		name: 'iqa0052',
		type: 'input',
		legendSize: 'l',
		label: 'Specify the methodology',
		recDataset: true,
	  },

  iqa0053: {
    id: 'IQA0053',
    name: 'iqa0053',
    type: 'textarea',
    legendSize: 'l',
    label: 'Give more details of the methodology',
    guidance: {
      summary: 'Read guidance for this question',
      html: 'WHO guidance - Study type consists of: Type of study (interventional or observational) Study design including: Method of allocation (randomized/non-randomized) Masking (is masking used and, if so, who is masked) Assignment (single arm, parallel, crossover or factorial) Purpose Phase (if applicable)  For randomized trials: the allocation concealment mechanism and sequence generation will be documented.'
    },
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0054: {
    id: 'IQA0054',
    name: 'iqa0054',
    type: 'radios',
    legendSize: 'l',
    legend: 'Is this a clinical trial of a novel intervention?',
    hint: 'Select one option',
    proportionateReview: true,
    recBooking: true,
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0055: {
    id: 'IQA0055',
    name: 'iqa0055',
    type: 'radios',
    legendSize: 'l',
    legend: 'Is this a randomised clinical trial comparing interventions in clinical practice?',
    hint: 'Select one option',
    proportionateReview: true,
    recBooking: true,
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0056: {
    id: 'IQA0056',
    name: 'iqa0056',
    type: 'radios',
    legendSize: 'l',
    legend: 'Are all the interventions you are comparing routine or \'gold standard\'’ clinical care?',
    hint: 'Select one option',
    recDataset: true,
    items: [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' },
    ],
  },

  iqa0057: {
    id: 'IQA0057',
    name: 'iqa0057',
    type: 'textarea',
    legendSize: 'l',
    label: 'What is the main research question or objective?',
    hint: 'Use language understandable to a member of the public',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0058: {
    id: 'IQA0058',
    name: 'iqa0058',
    type: 'textarea',
    legendSize: 'l',
    label: 'What is the secondary research question or objective, if applicable',
	hint: 'Use language understandable to a member of the public',
    recDataset: true,
    rows: 5,
  },

  iqa03277: {
    id: 'IQA03277',
    name: 'iqa03277',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'Does your project use artificial intelligence (AI)?',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0089', text: 'designing, developing or testing an AI product or tool' },
      { value: 'OPT0090', text: 'using an existing AI product or tool for its intended purpose' },
      { value: 'OPT0091', text: 'the project does not involve the use of AI' },
	  { divider: 'or'},
	  { value: 'OPT0092', text: 'AI is not used in this project' },
    ],
  },

  iqa03278: {
    id: 'IQA03278',
    name: 'iqa03278',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'If you are designing, developing or testing AI, what type is it?',
    hint: 'Select all that apply',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0092', text: 'image analysis' },
      { value: 'OPT0093', text: 'other machine learning applications' },
      { value: 'OPT0094', text: 'natural language processing' },
      { value: 'OPT0095', text: 'generative AI or large language models' },
      { value: 'OPT0096', text: 'robotics' },
      { value: 'OPT0033', text: 'other', revealOn:'iqa03279' },
    ],
  },

  iqa03279: {
    id: 'IQA03279',
    name: 'iqa03279',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe the type of AI you will use',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa03280: {
    id: 'IQA03280',
    name: 'iqa03280',
    type: 'checkboxes',
    legendSize: 'l',
    legend: 'If you are using existing AI for its intended purpose, what type is it?',
    recDataset: true,
    studyWideDataset: true,
    items: [
      { value: 'OPT0092', text: 'image analysis' },
      { value: 'OPT0093', text: 'other machine learning applications' },
      { value: 'OPT0094', text: 'natural language processing' },
      { value: 'OPT0095', text: 'generative AI or large language models' },
      { value: 'OPT0096', text: 'robotics' },
      { value: 'OPT0033', text: 'other', revealOn: 'iqa03281' },
    ],
  },

  iqa03281: {
    id: 'IQA03281',
    name: 'iqa03281',
    type: 'textarea',
    legendSize: 'l',
    label: 'Describe the type of AI being used in your project.',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

  iqa0060: {
    id: 'IQA0060',
    name: 'iqa0060',
    type: 'textarea',
    legendSize: 'l',
    label: 'Explain what will happen to participants, their tissue or data - how many times and in what order',
	hint: 'Use language understandable to a member of the public',
    recDataset: true,
    studyWideDataset: true,
    rows: 5,
  },

}
