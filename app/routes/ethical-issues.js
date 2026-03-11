const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

// Proportionate review: project is PR if it doesn't include treatment or clinical activities
// and is not CTIMP. Adjust this logic to match your actual PR determination.
function isPR (data) {
  const activities = asArray(data['researchActivities'])
  const hasClinicalOrTreatment = activities.includes('clinical_people_activities') ||
    activities.includes('treatment')
  const isCTIMP = String(data['isCTIMP'] || '').toLowerCase() === 'yes'
  return !hasClinicalOrTreatment && !isCTIMP
}

function isNonClinicalInterviewsOnly (data) {
  const activities = asArray(data['researchActivities'])
  return activities.length > 0 &&
    activities.every(a => a === 'non_clinical_people_interviews_surveys' ||
      a === 'non_clinical_staff_activities')
}

function hasUnfavourableUK (data) {
  return asArray(data['applicationPrevious']).includes('unfavourable_uk')
}

function hasUnfavourable (data) {
  const prev = asArray(data['applicationPrevious'])
  return prev.includes('unfavourable_uk') || prev.includes('unfavourable_other')
}

function hasLinked (data) {
  return asArray(data['applicationPrevious']).includes('linked_to_other')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/ethical-issues/full-rec-review         fullRecReview (if PR)
//    → if yes: /ethical-issues-summary
//    → if no:  /full-rec-review-no
//  /project/ethical-issues/full-rec-review-no      fullRecReviewNo
//    → /application-previous
//  /project/ethical-issues/ethical-issues-summary  ethicalIssues (if not PR, or PR + fullRec = yes)
//  /project/ethical-issues/health-findings         possibleHealthFindings (if not non-clinical-only)
//    → if yes: /health-findings-notify
//    → if no:  /health-findings-no (skip notify)
//  /project/ethical-issues/health-findings-notify  possibleHealthFindingsYes
//  /project/ethical-issues/health-findings-no      possibleHealthFindingsNo
//  /project/ethical-issues/application-previous    applicationPrevious (always)
//    → if unfavourable_uk:    /previous-iras-id
//    → if unfavourable:       /unfavourable-reason
//    → if linked:             /linked-project
//    → else:                  /check
//  /project/ethical-issues/previous-iras-id        previousIrasId
//  /project/ethical-issues/unfavourable-reason     unfavourableReason
//  /project/ethical-issues/linked-project          linkedToOther

// ─── Routes ──────────────────────────────────────────────────────────────────

// Entry point — skip full-rec-review question if not PR
router.get('/project/ethical-issues', function (req, res) {
  const data = req.session.data
  if (isPR(data)) return res.redirect('/project/ethical-issues/full-rec-review')
  clear(data, ['fullRecReview', 'fullRecReviewNo'])
  return res.redirect('/project/ethical-issues/ethical-issues-summary')
})

router.post('/project/ethical-issues/full-rec-review', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['fullRecReview']) {
    addError(errors, 'fullRecReview', 'Select whether your application has material ethical issues needing full REC review')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/full-rec-review', errors)

  if (data['fullRecReview'] === 'yes') {
    clear(data, ['fullRecReviewNo'])
    return res.redirect('/project/ethical-issues/ethical-issues-summary')
  }

  return res.redirect('/project/ethical-issues/full-rec-review-no')
})

router.post('/project/ethical-issues/full-rec-review-no', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['fullRecReviewNo'] || !data['fullRecReviewNo'].trim()) {
    addError(errors, 'fullRecReviewNo', 'Enter why you consider your application does not have material ethical issues')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/full-rec-review-no', errors)

  // PR with no full REC — skip the ethical issues summary, go straight to previous applications
  clear(data, ['ethicalIssues'])
  return res.redirect('/project/ethical-issues/application-previous')
})

router.post('/project/ethical-issues/ethical-issues-summary', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['ethicalIssues'] || !data['ethicalIssues'].trim()) {
    addError(errors, 'ethicalIssues', 'Enter a summary of the main ethical issues arising from the project')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/ethical-issues-summary', errors)

  if (!isNonClinicalInterviewsOnly(data)) {
    return res.redirect('/project/ethical-issues/health-findings')
  }

  clear(data, ['possibleHealthFindings', 'possibleHealthFindingsYes', 'possibleHealthFindingsNo'])
  return res.redirect('/project/ethical-issues/application-previous')
})

router.post('/project/ethical-issues/health-findings', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['possibleHealthFindings']) {
    addError(errors, 'possibleHealthFindings', 'Select whether the project could produce health related findings of clinical significance')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/health-findings', errors)

  if (data['possibleHealthFindings'] === 'yes') {
    clear(data, ['possibleHealthFindingsNo'])
    return res.redirect('/project/ethical-issues/health-findings-notify')
  }

  clear(data, ['possibleHealthFindingsYes'])
  return res.redirect('/project/ethical-issues/health-findings-no')
})

router.post('/project/ethical-issues/health-findings-notify', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['possibleHealthFindingsYes']) {
    addError(errors, 'possibleHealthFindingsYes', 'Select whether arrangements will be made to notify the individuals concerned')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/health-findings-notify', errors)

  return res.redirect('/project/ethical-issues/application-previous')
})

router.post('/project/ethical-issues/health-findings-no', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['possibleHealthFindingsNo'] || !data['possibleHealthFindingsNo'].trim()) {
    addError(errors, 'possibleHealthFindingsNo', 'Enter why the individuals concerned will not be notified')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/health-findings-no', errors)

  return res.redirect('/project/ethical-issues/application-previous')
})

router.post('/project/ethical-issues/application-previous', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['applicationPrevious']).length === 0) {
    addError(errors, 'applicationPrevious', 'Select at least one option, or select \'None of the above\'')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/application-previous', errors)

  // Cleanup: clear answers for branches not taken
  if (!hasUnfavourableUK(data)) clear(data, ['previousIrasId'])
  if (!hasUnfavourable(data)) clear(data, ['unfavourableReason'])
  if (!hasLinked(data)) clear(data, ['linkedToOther'])

  if (asArray(data['applicationPrevious']).includes('none')) {
    return res.redirect('/project/ethical-issues/check')
  }

  if (hasUnfavourableUK(data)) {
    return res.redirect('/project/ethical-issues/previous-iras-id')
  }

  if (hasUnfavourable(data)) {
    return res.redirect('/project/ethical-issues/unfavourable-reason')
  }

  if (hasLinked(data)) {
    return res.redirect('/project/ethical-issues/linked-project')
  }

  return res.redirect('/project/ethical-issues/check')
})

router.post('/project/ethical-issues/previous-iras-id', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['previousIrasId'] || !data['previousIrasId'].trim()) {
    addError(errors, 'previousIrasId', 'Enter the IRAS ID of the project that received an unfavourable opinion')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/previous-iras-id', errors)

  if (hasUnfavourable(data)) {
    return res.redirect('/project/ethical-issues/unfavourable-reason')
  }

  if (hasLinked(data)) return res.redirect('/project/ethical-issues/linked-project')

  return res.redirect('/project/ethical-issues/check')
})

router.post('/project/ethical-issues/unfavourable-reason', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['unfavourableReason'] || !data['unfavourableReason'].trim()) {
    addError(errors, 'unfavourableReason', 'Enter how the reasons for the unfavourable opinion have been addressed')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/unfavourable-reason', errors)

  if (hasLinked(data)) return res.redirect('/project/ethical-issues/linked-project')

  return res.redirect('/project/ethical-issues/check')
})

router.post('/project/ethical-issues/linked-project', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['linkedToOther'] || !data['linkedToOther'].trim()) {
    addError(errors, 'linkedToOther', 'Enter information about the linked project')
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/linked-project', errors)

  return res.redirect('/project/ethical-issues/check')
})

module.exports = router
