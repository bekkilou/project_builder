// ============================================================
//  pathway-progress.js
//  app/routes/helpers/pathway-progress.js
//
//  Calculates traffic light completion status for each
//  approvals pathway, based on how many pathway-flagged
//  questions have been answered in session data.
//
//  Used on the project overview / start page alongside
//  buildApprovalsPathway to show submission readiness.
//
//  Usage:
//    const { getPathwayProgress } = require('./helpers/pathway-progress')
//    const { buildApprovalsPathway } = require('../helpers/approvals-pathway')
//
//    router.get('/project/start', (req, res) => {
//      const pathway = buildApprovalsPathway(req.session.data)
//      res.locals.pathwayProgress  = getPathwayProgress(req.session.data, pathway.flags)
//      res.locals.submissionReady  = getSubmissionReadiness(req.session.data, sectionStatuses)
//      res.render('project/start')
//    })
// ============================================================

// ── Question keys per pathway flag ───────────────────────────
// Generated from the section question JS files.
// Update this list if questions are added or flags change.

const PATHWAY_QUESTIONS = {

  proportionateReview: [
    'iqa0054', 'iqa0055', 'iqa0088', 'iqa0093', 'iqa03273',
    'iqa0068', 'iqa0070', 'iqa0073', 'iqa0074', 'iqa0075',
    'iqa0076', 'iqa0138', 'iqa0251'
  ],

  recBooking: [
    'iqa0054', 'iqa0055', 'iqa0088', 'iqa0114', 'iqa0138'
  ],

  recDataset: [
    'iqa0040', 'iqa0045', 'iqa0046', 'iqa0048', 'iqa0042',
    'iqa0043', 'iqa0044', 'iqa03274', 'iqa0162', 'iqa0163',
    'iqa03275', 'iqa03276', 'iqa0049', 'iqa0050', 'iqa0051',
    'iqa0052', 'iqa0053', 'iqa0054', 'iqa0055', 'iqa0056',
    'iqa0057', 'iqa0058', 'iqa03277', 'iqa03278', 'iqa03279',
    'iqa03280', 'iqa03281', 'iqa0060', 'iqa0083', 'iqa0084',
    'iqa0085', 'iqa0086', 'iqa0087', 'iqa0088', 'iqa0089',
    'iqa0091', 'iqa0092', 'iqa0093', 'iqa0062', 'iqa0063',
    'iqa0064', 'iqa0065', 'iqa0066', 'iqa03273', 'iqa0068',
    'iqa0070', 'iqa0071', 'iqa0072', 'iqa0073', 'iqa0074',
    'iqa0075', 'iqa0076', 'iqa0077', 'iqa0078', 'iqa0079',
    'iqa0080', 'iqa0081', 'iqa0082', 'iqa0096', 'iqa0095',
    'iqa0097', 'iqa0098', 'iqa0099', 'iqa0100', 'iqa0102',
    'iqa0103', 'iqa0105', 'iqa0106', 'iqa0107', 'iqa0108',
    'iqa0110', 'iqa0111', 'iqa0112', 'iqa0113', 'iqa0114',
    'iqa0115', 'iqa0117', 'iqa0118', 'iqa0119', 'iqa0120',
    'iqa0039', 'iqa0121', 'iqa0122', 'iqa0123', 'iqa0124',
    'iqa0125', 'iqa0126', 'iqa0127', 'iqa0128', 'iqa0129',
    'iqa0130', 'iqa0131', 'iqa0132', 'iqa0133', 'iqa0135',
    'iqa0136', 'iqa0137', 'iqa0147', 'iqa0148', 'iqa0149',
    'iqa0150', 'iqa0151', 'iqa0152', 'iqa0153', 'iqa0154',
    'iqa0169', 'iqa0165', 'iqa0166', 'iqa0170', 'iqa0171',
    'iqa0172', 'iqa0175', 'iqa0176', 'iqa0177', 'iqa0178',
    'iqa0179', 'iqa0180', 'iqa0181', 'iqa0182', 'iqa0183'
  ],

  studyWideDataset: [
    'iqa0040', 'iqa0049', 'iqa0051', 'iqa0053', 'iqa0055',
    'iqa0057', 'iqa03277', 'iqa03278', 'iqa03279', 'iqa03280',
    'iqa03281', 'iqa0060', 'iqa0083', 'iqa0084', 'iqa0085',
    'iqa0088', 'iqa0089', 'iqa0090', 'iqa0091', 'iqa0062',
    'iqa0063', 'iqa0064', 'iqa03273', 'iqa0068', 'iqa0070',
    'iqa0071', 'iqa0077', 'iqa0079', 'iqa0080', 'iqa0081',
    'iqa0082', 'iqa0096', 'iqa0097', 'iqa0098', 'iqa0100',
    'iqa0104', 'iqa0105', 'iqa0106', 'iqa0108', 'iqa0111',
    'iqa0118', 'iqa0119', 'iqa0120', 'iqa0039', 'iqa0132',
    'iqa0133', 'iqa0135', 'iqa0136', 'iqa0137', 'iqa0138',
    'iqa0140', 'iqa0147', 'iqa0149', 'iqa0150', 'iqa0151',
    'iqa0152', 'iqa0153', 'iqa0155', 'iqa0156', 'iqa0157',
    'iqa0158', 'iqa0175', 'iqa0181', 'iqa0182', 'iqa0183',
    'iqa0251'
  ]
}

// ── Pathway → approval label mapping ─────────────────────────
// Maps buildApprovalsPathway flags to the question pathway flag
// and a display label for the panel.

const PATHWAY_MAP = [
  {
    flag:         'needsREC',
    questionFlag: 'recDataset',
    label:        'Research Ethics Committee (REC) review'
  },
  {
    flag:         'needsUKApprovals',
    questionFlag: 'recBooking',
    label:        'REC booking and UK approvals'
  },
  {
    flag:         null,  // Always shown — proportionate review eligibility
    questionFlag: 'proportionateReview',
    label:        'Proportionate review'
  },
  {
    flag:         'needsMHRA',
    questionFlag: 'studyWideDataset',
    label:        'Study wide review dataset'
  }
]

// ── Helpers ───────────────────────────────────────────────────

function isAnswered (val) {
  if (val === undefined || val === null) return false
  if (typeof val === 'string') return val.trim().length > 0
  if (Array.isArray(val)) return val.length > 0
  return false
}

function trafficLight (answered, total) {
  if (total === 0)                return { status: 'not-applicable', colour: 'grey',  label: 'Not applicable' }
  if (answered === 0)             return { status: 'not-started',    colour: 'grey',  label: 'Not started'    }
  if (answered < total)           return { status: 'in-progress',    colour: 'blue',  label: 'In progress'    }
  return                                 { status: 'completed',       colour: 'green', label: 'Completed'      }
}

// ── Main exports ──────────────────────────────────────────────

/**
 * Returns progress status for each approval pathway relevant
 * to this project (based on buildApprovalsPathway flags).
 *
 * @param {object} data     - req.session.data
 * @param {object} flags    - pathway.flags from buildApprovalsPathway
 * @returns {Array}         - array of { label, answered, total, light }
 */
function getPathwayProgress (data, flags) {
  return PATHWAY_MAP
    .filter(p => p.flag === null || flags[p.flag])
    .map(p => {
      const keys     = PATHWAY_QUESTIONS[p.questionFlag] || []
      const total    = keys.length
      const answered = keys.filter(k => isAnswered(data[k])).length
      return {
        label:    p.label,
        answered,
        total,
        light:    trafficLight(answered, total)
      }
    })
}

/**
 * Returns submission readiness checklist items.
 * Each item has: label, done (bool), colour, statusLabel
 *
 * @param {object} data            - req.session.data
 * @param {object} sectionStatuses - from getSectionStatuses
 * @returns {object}               - { items, allDone }
 */
function getSubmissionReadiness (data, sectionStatuses) {
  const allSectionsComplete = Object.values(sectionStatuses)
    .every(s => s.label === 'Completed')

  const documentsUploaded = !!(data._documentsUploaded)

  const items = [
    {
      label:       'Complete all required sections',
      done:        allSectionsComplete,
      colour:      allSectionsComplete ? 'green' : 'grey',
      statusLabel: allSectionsComplete ? 'Done'  : 'Not yet'
    },
    {
      label:       'Upload supporting documents',
      done:        documentsUploaded,
      colour:      documentsUploaded ? 'green' : 'grey',
      statusLabel: documentsUploaded ? 'Done'  : 'Not yet'
    }
  ]

  return {
    items,
    allDone: items.every(i => i.done)
  }
}

module.exports = { getPathwayProgress, getSubmissionReadiness }
