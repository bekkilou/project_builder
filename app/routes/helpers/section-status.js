// ============================================================
//  section-status.js
//  app/routes/helpers/section-status.js
//
//  Calculates not-started / in-progress / completed status
//  for each section on the project overview page.
//
//  Because cleared fields are absent from session data, we
//  only need to check which fields are relevant given current
//  answers — cleared fields are never "unanswered".
//
//  Question keys and OPT option values match the generated
//  question JS files (sheet B of the master spreadsheet).
//
//  Usage in your start page route:
//
//    const { getSectionStatuses } = require('./helpers/section-status')
//
//    router.get('/project/start', (req, res) => {
//      res.locals.sectionStatuses = getSectionStatuses(req.session.data)
//      res.render('project/start')
//    })
// ============================================================

const { asArray } = require('./routing')

// ── Status resolver ──────────────────────────────────────────

function statusFromFields (fields, data) {
  if (!fields.length) return tag('not-started')

  const answered = fields.filter(name => {
    const val = data[name]
    if (val === undefined || val === null) return false
    if (typeof val === 'string') return val.trim().length > 0
    if (Array.isArray(val)) return val.length > 0
    return false
  })

  if (answered.length === 0)           return tag('not-started')
  if (answered.length < fields.length) return tag('in-progress')
  return tag('completed')
}

function tag (status) {
  return {
    'not-started': { label: 'Not started', colour: 'grey'  },
    'in-progress':  { label: 'In progress', colour: 'blue'  },
    'completed':    { label: 'Completed',   colour: 'green' }
  }[status]
}

// ── Section relevance functions ──────────────────────────────
// Each returns the array of field names relevant for this
// participant given their current answers. Mirrors the
// conditional logic in each section's routes file.

function projectInformationFields (data) {
  // All three questions are always shown
  return ['iqa0036', 'iqa0037', 'iqa0040']
}

function publicInvolvementFields (data) {
  const involved = !asArray(data['iqa0045']).includes('OPT0049')
  const hasAnswer = asArray(data['iqa0045']).length > 0

  const fields = ['iqa0045']
  if (!hasAnswer) return fields

  if (!involved) {
    // Not involved path
    fields.push('iqa0048')
  } else {
    // Involved path
    fields.push('iqa0042')
    if (asArray(data['iqa0042']).includes('OPT0033')) {
      fields.push('iqa0043')
    }
    fields.push('iqa0046', 'iqa0044', 'iqa03274')
  }

  fields.push('iqa0162')

  const future = asArray(data['iqa0162'])
  if (future.length > 0) {
    if (future.includes('OPT0033')) fields.push('iqa0163')
    if (future.includes('OPT0061')) {
      fields.push('iqa03276')
    } else {
      fields.push('iqa03275')
    }
  }

  return fields
}

function researchDesignFields (data) {
  const fields = ['iqa0049']

  // iqa0050: details of methodology — shown if 'other' selected
  if (asArray(data['iqa0049']).includes('OPT0033')) {
    fields.push('iqa0050')
  }

  // iqa0051: trial methodology — always shown alongside iqa0049
  fields.push('iqa0051')

  // iqa0052/0053: trial details — shown if trial methodology answered
  if (asArray(data['iqa0051']).length > 0) {
    fields.push('iqa0052', 'iqa0053')
  }

  fields.push('iqa0054', 'iqa0055', 'iqa0056', 'iqa0057', 'iqa0058')

  // AI questions
  fields.push('iqa03277')
  if (asArray(data['iqa03277']).length > 0) {
    fields.push('iqa03278', 'iqa03279', 'iqa03280', 'iqa03281')
  }

  fields.push('iqa0060')

  return fields
}

function participantsFields (data) {
  const fields = [
    'iqa0083', 'iqa0322', 'iqa0084', 'iqa0085',
    'iqa0086', 'iqa0087', 'iqa0088',
    'iqa0089', 'iqa0090', 'iqa0091', 'iqa0092'
  ]

  // iqa0093: additional participant question — always shown
  fields.push('iqa0093')

  return fields
}

function researchActivitiesFields (data) {
  const fields = ['iqa0062', 'iqa0063']

  // iqa0064/0065/0066: follow-up questions based on iqa0063
  if (data['iqa0063'] === 'yes') {
    fields.push('iqa0064', 'iqa0065', 'iqa0066')
  }

  fields.push('iqa03273', 'iqa0068')

  if (data['iqa0068'] === 'yes') {
    fields.push('iqa0070')
  }

  fields.push('iqa0071', 'iqa0072', 'iqa0073', 'iqa0074', 'iqa0075',
              'iqa0076', 'iqa0077', 'iqa0078', 'iqa0079', 'iqa0080',
              'iqa0081', 'iqa0082')

  return fields
}

function consentFields (data) {
  const fields = ['iqa0096', 'iqa0095', 'iqa0097']

  const consentAnswer = data['iqa0097']

  // iqa0098/0099: shown if consent not obtained in some situations
  if (consentAnswer === 'OPT0138' || consentAnswer === 'OPT0139') {
    fields.push('iqa0098')
    if (asArray(data['iqa0098']).includes('OPT0033')) {
      fields.push('iqa0099')
    }
  }

  fields.push('iqa0100', 'iqa0102', 'iqa0103', 'iqa0104',
              'iqa0105', 'iqa0106', 'iqa0107', 'iqa0108', 'iqa0109')

  return fields
}

function risksAndConflictsFields (data) {
  const fields = ['iqa0110', 'iqa0111']

  if (data['iqa0111'] === 'yes') fields.push('iqa0112')

  fields.push('iqa0113')

  if (data['iqa0113'] === 'yes') fields.push('iqa0114')

  fields.push('iqa0115')

  return fields
}

function ethicalIssuesFields (data) {
  const fields = ['iqa0323', 'iqa0117', 'iqa0324', 'iqa0118']

  // iqa0119/0120: linked project details — shown if linked
  if (asArray(data['iqa0118']).includes('OPT0233')) {
    fields.push('iqa0119', 'iqa0120')
  }

  fields.push('iqa0039')

  return fields
}

function researchAnalysisFields (data) {
  return [
    'iqa0121', 'iqa0122', 'iqa0123', 'iqa0124',
    'iqa0125', 'iqa0126', 'iqa0127', 'iqa0128',
    'iqa0129', 'iqa0130', 'iqa0131', 'iqa0132'
  ]
}

function governanceFields (data) {
  const fields = [
    'iqa0133', 'iqa0135', 'iqa0136', 'iqa0137',
    'iqa0138', 'iqa0325', 'iqa0139', 'iqa0140',
    'iqa0147', 'iqa0148', 'iqa0149', 'iqa0150',
    'iqa0151', 'iqa0152', 'iqa0153'
  ]

  if (data['iqa0153'] === 'yes') fields.push('iqa0154')

  fields.push('iqa0155')
  if (data['iqa0155'] === 'yes') fields.push('iqa0156')

  fields.push('iqa0157')
  if (data['iqa0157'] === 'yes') fields.push('iqa0158')

  return fields
}

function transparencyFields (data) {
  const fields = ['iqa0169', 'iqa0165']

  // Deferral justification — shown if deferral requested
  if (data['iqa0165'] && data['iqa0165'] !== 'OPT0253') {
    fields.push('iqa0166')
  }

  fields.push('iqa0167')

  if (asArray(data['iqa0167']).includes('OPT0257')) {
    fields.push('iqa0168')
  }

  // Registration details — shown if registering
  if (asArray(data['iqa0167']).includes('OPT0256')) {
    fields.push('iqa0169')  // second iqa0169 — checkboxes for registry type
    if (asArray(data['iqa0169']).includes('OPT0258')) fields.push('iqa0170')
    if (asArray(data['iqa0169']).includes('OPT0259')) fields.push('iqa0171')
    if (asArray(data['iqa0169']).includes('OPT0033')) fields.push('iqa0172')
  }

  fields.push('iqa0173')

  if (data['iqa0173'] && !asArray(data['iqa0173']).includes('OPT0253')) {
    fields.push('iqa0174')
  }

  fields.push('iqa0175', 'iqa0176')

  if (asArray(data['iqa0176']).includes('OPT0033')) {
    fields.push('iqa0177')  // Note: check OPT code for 'other' in dissemination
  }

  fields.push('iqa0178', 'iqa0179', 'iqa0180')

  if (data['iqa0180'] === 'yes') fields.push('iqa0181', 'iqa0182', 'iqa0183')

  fields.push('iqa0184', 'iqa0185', 'iqa0186', 'iqa0187',
              'iqa0188', 'iqa0189', 'iqa0190', 'iqa0191')

  return fields
}

function confidentialityFields (data) {
  return ['iqa0251']
}

// ── Main export ──────────────────────────────────────────────

function getSectionStatuses (data) {
  return {
    projectInformation: statusFromFields(projectInformationFields(data),  data),
    publicInvolvement:  statusFromFields(publicInvolvementFields(data),   data),
    researchDesign:     statusFromFields(researchDesignFields(data),      data),
    participants:       statusFromFields(participantsFields(data),        data),
    researchActivities: statusFromFields(researchActivitiesFields(data),  data),
    consent:            statusFromFields(consentFields(data),             data),
    risksAndConflicts:  statusFromFields(risksAndConflictsFields(data),   data),
    ethicalIssues:      statusFromFields(ethicalIssuesFields(data),       data),
    researchAnalysis:   statusFromFields(researchAnalysisFields(data),    data),
    governance:         statusFromFields(governanceFields(data),          data),
    transparency:       statusFromFields(transparencyFields(data),        data),
    confidentiality:    statusFromFields(confidentialityFields(data),     data)
  }
}

module.exports = { getSectionStatuses }
