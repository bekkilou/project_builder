// ============================================================
//  all-questions.js
//  app/data/all-questions.js
//
//  Central index of all question sections.
//  Import this wherever you need access to the full question
//  set — the export route, summary pages, etc.
//
//  Each key is the section name used in the CSV export.
//  Order here determines the order of rows in the export.
// ============================================================

const allQuestions = {
  'Scoping':                require('./scoping-questions'),
  'Project information':    require('./project-information-questions'),
  'Research design':        require('./research-design-questions'),
  'Research activities':    require('./research-activities-questions'),
  'Research analysis':      require('./research-analysis-questions'),
  'Participant':            require('./participant-questions'),
  'Consent':                require('./consent-questions'),
  'Confidentiality':        require('./confidentiality-questions'),
  'Risks and conflicts':    require('./risks-and-conflicts-questions'),
  'Ethical issues':         require('./ethical-issues-questions'),
  'Governance':             require('./governance-questions'),
  'Transparency':           require('./transparency-questions'),
  'Public involvement':     require('./public-involvement-questions')
}

module.exports = allQuestions
