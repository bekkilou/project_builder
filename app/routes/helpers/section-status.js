// ============================================================
//  section-status.js
//  app/routes/helpers/section-status.js
//
//  Calculates not-started / in-progress / completed status
//  for each section on the project overview page.
//
//  Rules:
//    completed   — participant has clicked Confirm on check answers page
//                  (sets 'completed-[sectionKey]' = 'true' in session)
//    in-progress — at least one field for this section has a value
//    not-started — no data for any field in this section
//
//  To mark a section complete, add a POST handler in the relevant
//  route file and point the check answers form action at it:
//
//    router.post('/project/[section]/check-complete', (req, res) => {
//      req.session.data['completed-[sectionKey]'] = 'true'
//      res.redirect('/project/start')
//    })
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

// ── Field lists ──────────────────────────────────────────────
// One array per section listing all possible field names.
// Used to detect whether any data exists for a section.
// Does not need to mirror conditional logic — just needs to
// include every field that could ever be answered.

const SECTION_FIELDS = {
  projectInformation: [
    'iqa0036', 'iqa0037', 'iqa0040'
  ],

  publicInvolvement: [
    'tbc001', 'tbc002', 'tbc003', 'tbc004', 'tbc005', 'tbc006'
  ],

  researchDesign: [
    'iqa0049', 'iqa0050', 'iqa0051', 'iqa0052', 'iqa0053',
    'iqa0054', 'iqa0055', 'iqa0056', 'iqa0057', 'iqa0058',
    'iqa03277', 'iqa03278', 'iqa03279', 'iqa03280', 'iqa03281',
    'iqa0060'
  ],

  participants: [
    'iqa0083', 'iqa0322', 'iqa0084', 'iqa0085', 'iqa0086',
    'iqa0087', 'iqa0089', 'iqa0090', 'iqa0091', 'iqa0092',
    'iqa0093', 'tbc007'
  ],

  researchActivities: [
    'iqa0062', 'iqa0063', 'iqa0064', 'iqa0065', 'iqa0066',
    'iqa03273', 'iqa0068', 'iqa0070', 'iqa0071', 'iqa0072',
    'iqa0073', 'iqa0074', 'iqa0075', 'iqa0076', 'iqa0077',
    'iqa0078', 'iqa0079', 'iqa0080', 'iqa0081', 'iqa0082'
  ],

  consent: [
    'iqa0096', 'iqa0095', 'iqa0097', 'iqa0098', 'iqa0099',
    'iqa0100', 'iqa0102', 'iqa0103', 'iqa0104', 'iqa0105',
    'iqa0106', 'iqa0107', 'iqa0108', 'iqa0109'
  ],

  risksAndConflicts: [
    'iqa0110', 'iqa0111', 'iqa0112', 'iqa0113', 'iqa0114',
    'iqa0115', 'iqa0116'
  ],

  ethicalIssues: [
    'iqa0323', 'iqa0117', 'iqa0324', 'iqa0272', 'iqa0273',
    'iqa0274', 'iqa0118', 'iqa0119', 'iqa0120', 'iqa0039'
  ],

  researchAnalysis: [
    'iqa0121', 'iqa0122', 'iqa0123', 'iqa0124', 'iqa0125',
    'iqa0126', 'iqa0127', 'iqa0128', 'iqa0130', 'iqa0131',
    'iqa0132'
  ],

  governance: [
    'iqa0142', 'iqa0143', 'iqa0325', 'iqa0139', 'iqa0140',
    'iqa0147', 'iqa0148', 'iqa0149', 'iqa0150', 'iqa0151',
    'iqa0152', 'iqa0153', 'iqa0154', 'iqa0155', 'iqa0156',
    'iqa0157', 'iqa0158'
  ],

  transparency: [
    'iqa0169', 'iqa0165', 'iqa0166', 'iqa0167', 'iqa0168',
    'iqa0169b', 'iqa0170', 'iqa0171', 'iqa0172', 'iqa0173',
    'iqa0174', 'iqa0175', 'iqa0176', 'iqa0177', 'iqa0178',
    'iqa0179', 'iqa0180', 'iqa0181', 'iqa0182', 'iqa0183',
    'iqa0185', 'iqa0186', 'iqa0187', 'iqa0188', 'iqa0189',
    'iqa0190', 'iqa0191'
  ],

  confidentiality: [
    'iqa0251'
  ]
}

// ── Status helpers ───────────────────────────────────────────

function hasValue (val) {
  if (val === undefined || val === null) return false
  if (typeof val === 'string') return val.trim().length > 0
  if (Array.isArray(val)) return val.length > 0
  return false
}

function tag (status) {
  return {
    'not-started': { label: 'Not started', colour: 'grey'  },
    'in-progress':  { label: 'In progress', colour: 'blue'  },
    'completed':    { label: 'Completed',   colour: 'green' }
  }[status]
}

function getSectionStatus (sectionKey, data) {
  // Completed — participant confirmed answers on check answers page
  if (data['completed-' + sectionKey] === 'true') {
    return tag('completed')
  }

  // In progress — at least one field in this section has a value
  const fields = SECTION_FIELDS[sectionKey] || []
  const hasAnyData = fields.some(field => hasValue(data[field]))

  return hasAnyData ? tag('in-progress') : tag('not-started')
}

// ── Main export ──────────────────────────────────────────────

function getSectionStatuses (data) {
  return Object.fromEntries(
    Object.keys(SECTION_FIELDS).map(key => [key, getSectionStatus(key, data)])
  )
}

module.exports = { getSectionStatuses }
