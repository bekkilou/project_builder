const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const { setFlash } = require('./helpers/flash')

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

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

// OPT0231 = unfavourable UK, OPT0232 = unfavourable other country
// OPT0233 = linked to another project, OPT0234 = none of these
function hasUnfavourableUK (data) {
  return asArray(data['iqa0118']).includes('OPT0231')
}

function hasUnfavourable (data) {
  const prev = asArray(data['iqa0118'])
  return prev.includes('OPT0231') || prev.includes('OPT0232')
}

function hasLinked (data) {
  return asArray(data['iqa0118']).includes('OPT0233')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/ethical-issues                           Entry redirect
//  /project/ethical-issues/iqa0323                   Full REC review? (if PR)
//    → if yes: /iqa0117
//    → if no:  /iqa0324
//  /project/ethical-issues/iqa0324                   Why no material ethical issues
//    → /iqa0118
//  /project/ethical-issues/iqa0117                   Ethical issues summary (if not PR, or PR + yes)
//    → if not non-clinical-only: /iqa0272
//    → else:                     /iqa0118
//  /project/ethical-issues/iqa0272                   Health-related findings notification (yes/no)
//    — iqa0273 / iqa0274 revealed inline via revealOn
//    → /iqa0118
//  /project/ethical-issues/iqa0118                   Previous applications (always)
//    → if OPT0231:   /iqa0119
//    → if OPT0231 or OPT0232: /iqa0120
//    → if OPT0233:   /iqa0039
//    → else:         /check
//  /project/ethical-issues/iqa0119                   Previous IRAS ID
//  /project/ethical-issues/iqa0120                   Unfavourable opinion reason
//  /project/ethical-issues/iqa0039                   Linked project information

// ─── Routes ──────────────────────────────────────────────────────────────────

// Entry point — skip iqa0323 if not PR
router.get('/project/ethical-issues', function (req, res) {
  const data = req.session.data
  if (isPR(data)) return res.redirect('/project/ethical-issues/iqa0323')
  clear(data, ['iqa0323', 'iqa0324'])
  return res.redirect('/project/ethical-issues/iqa0117')
})

router.post('/project/ethical-issues/iqa0323', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0323']) {
    addError(errors, 'iqa0323', questions['iqa0323'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/iqa0323', errors)

  if (data['iqa0323'] === 'yes') {
    clear(data, ['iqa0324'])
    return res.redirect('/project/ethical-issues/iqa0117')
  }

  return res.redirect('/project/ethical-issues/iqa0324')
})

router.post('/project/ethical-issues/iqa0324', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0324'] || !data['iqa0324'].trim()) {
    addError(errors, 'iqa0324', questions['iqa0324'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/iqa0324', errors)

  clear(data, ['iqa0117'])
  return res.redirect('/project/ethical-issues/iqa0118')
})

router.post('/project/ethical-issues/iqa0117', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0117'] || !data['iqa0117'].trim()) {
    addError(errors, 'iqa0117', questions['iqa0117'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/iqa0117', errors)

  if (!isNonClinicalInterviewsOnly(data)) {
    return res.redirect('/project/ethical-issues/iqa0272')
  }

  clear(data, ['iqa0272', 'iqa0273', 'iqa0274'])
  return res.redirect('/project/ethical-issues/iqa0118')
})

router.post('/project/ethical-issues/iqa0272', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0272']) {
    addError(errors, 'iqa0272', questions['iqa0272'].errorMessages.required)
  }

  // Validate the revealed textarea — whichever is relevant
  if (data['iqa0272'] === 'yes' && (!data['iqa0273'] || !data['iqa0273'].trim())) {
    addError(errors, 'iqa0273', questions['iqa0273'].errorMessages.required)
  }

  if (data['iqa0272'] === 'no' && (!data['iqa0274'] || !data['iqa0274'].trim())) {
    addError(errors, 'iqa0274', questions['iqa0274'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/iqa0272', errors)

  // Clear whichever revealed field wasn't used
  if (data['iqa0272'] === 'yes') clear(data, ['iqa0274'])
  if (data['iqa0272'] === 'no')  clear(data, ['iqa0273'])

  return res.redirect('/project/ethical-issues/iqa0118')
})

router.post('/project/ethical-issues/iqa0118', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0118']).length === 0) {
    addError(errors, 'iqa0118', questions['iqa0118'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/iqa0118', errors)

  // Clear answers for branches not taken
  if (!hasUnfavourableUK(data)) clear(data, ['iqa0119'])
  if (!hasUnfavourable(data))   clear(data, ['iqa0120'])
  if (!hasLinked(data))         clear(data, ['iqa0039'])

  // OPT0234 = none of these
  if (asArray(data['iqa0118']).includes('OPT0234')) {
    return res.redirect('/project/ethical-issues/check-ethical-issues')
  }

  if (hasUnfavourableUK(data)) {
    return res.redirect('/project/ethical-issues/iqa0119')
  }

  if (hasUnfavourable(data)) {
    return res.redirect('/project/ethical-issues/iqa0120')
  }

  if (hasLinked(data)) {
    return res.redirect('/project/ethical-issues/iqa0039')
  }

  return res.redirect('/project/ethical-issues/check-ethical-issues')
})

router.post('/project/ethical-issues/iqa0119', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0119'] || !data['iqa0119'].trim()) {
    addError(errors, 'iqa0119', questions['iqa0119'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/iqa0119', errors)

  if (hasUnfavourable(data)) {
    return res.redirect('/project/ethical-issues/iqa0120')
  }

  if (hasLinked(data)) return res.redirect('/project/ethical-issues/iqa0039')

  return res.redirect('/project/ethical-issues/check-ethical-issues')
})

router.post('/project/ethical-issues/iqa0120', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0120'] || !data['iqa0120'].trim()) {
    addError(errors, 'iqa0120', questions['iqa0120'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/iqa0120', errors)

  if (hasLinked(data)) return res.redirect('/project/ethical-issues/iqa0039')

  return res.redirect('/project/ethical-issues/check-ethical-issues')
})

router.post('/project/ethical-issues/iqa0039', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0039'] || !data['iqa0039'].trim()) {
    addError(errors, 'iqa0039', questions['iqa0039'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/ethical-issues/iqa0039', errors)

  return res.redirect('/project/ethical-issues/check-ethical-issues')
})

router.post('/project/ethical-issues/check-complete', (req, res) => {
  req.session.data['completed-ethicalIssues'] = 'true'
  setFlash(req, 'completed', 'Summary of ethical issues')
  res.redirect('/project/start01')
})

module.exports = router
