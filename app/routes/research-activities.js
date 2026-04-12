const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

function isCTIMP (data) {
  return String(data['isCTIMP'] || '').toLowerCase() === 'yes'
}

function hasTreatment (data) {
  return asArray(data['researchActivities']).includes('treatment')
}

function hasClinicalOrTreatment (data) {
  const a = asArray(data['researchActivities'])
  return a.includes('clinical_people_activities') || a.includes('treatment')
}

function hasNonClinicalInterviews (data) {
  return asArray(data['researchActivities']).includes('non_clinical_people_interviews_surveys')
}

function hasNHSPatients (data) {
  return asArray(data['participantGroups']).includes('nhs_patients_service_users') ||
    asArray(data['participantGroups']).includes('care_home_residents')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/research-activities/iqa0062                Intervention description (if clinical/treatment)
//  /project/research-activities/iqa0063                First-in-human (if CTIMP)
//  /project/research-activities/iqa0064                Delay treatment (if NHS patients + clinical/treatment)
//  /project/research-activities/iqa0065                Compare standard (if treatment)
//    — iqa0066 revealed inline via revealOn when 'no' selected
//  /project/research-activities/iqa03273               Questionnaire type (if non-clinical interviews)
//  /project/research-activities/iqa0068                Sensitive topic (if non-clinical interviews)
//  /project/research-activities/iqa0070                Serious disclosure (if non-clinical interviews)
//    — iqa0071 revealed inline via revealOn when 'yes' selected
//  /project/research-activities/iqa0072                Society benefits (always)
//  /project/research-activities/iqa0074                Side effects (if clinical/treatment)
//  /project/research-activities/iqa0075                Risk delay treatment (if iqa0064 == yes)
//  /project/research-activities/iqa0076                Risk sensitive topic (if iqa0068 == yes)
//  /project/research-activities/iqa0077                Inform GP (if treatment)
//    — iqa0078 revealed inline via revealOn when 'yes' selected
//  /project/research-activities/iqa0079                Continue treatment (if treatment)
//    — iqa0080 / iqa0081 revealed inline via revealOn
//  /project/research-activities/iqa0082                Finish data collection (always)
//
//  Note: iqa0073 (safety handling) is in the questions file but was not
//  in the original route. Add a page and handler here when ready.

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/research-activities/start', function (req, res) {
  const data = req.session.data
  if (hasClinicalOrTreatment(data)) {
    return res.redirect('/project/research-activities/iqa0062')
  }
  if (hasNonClinicalInterviews(data)) {
    return res.redirect('/project/research-activities/iqa03273')
  }
  return res.redirect('/project/research-activities/iqa0072')
})

router.post('/project/research-activities/iqa0062', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0062'] || !data['iqa0062'].trim()) {
    addError(errors, 'iqa0062', questions['iqa0062'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa0062', errors)

  if (isCTIMP(data)) return res.redirect('/project/research-activities/iqa0063')

  clear(data, ['iqa0063'])

  if (hasNHSPatients(data) && hasClinicalOrTreatment(data)) {
    return res.redirect('/project/research-activities/iqa0064')
  }

  clear(data, ['iqa0064', 'iqa0075'])

  if (hasTreatment(data)) return res.redirect('/project/research-activities/iqa0065')

  clear(data, ['iqa0065', 'iqa0066'])
  return res.redirect('/project/research-activities/questionnaire-type-or-benefits')
})

router.post('/project/research-activities/iqa0063', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0063']) {
    addError(errors, 'iqa0063', questions['iqa0063'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa0063', errors)

  if (hasNHSPatients(data) && hasClinicalOrTreatment(data)) {
    return res.redirect('/project/research-activities/iqa0064')
  }

  clear(data, ['iqa0064', 'iqa0075'])

  if (hasTreatment(data)) return res.redirect('/project/research-activities/iqa0065')

  clear(data, ['iqa0065', 'iqa0066'])
  return res.redirect('/project/research-activities/questionnaire-type-or-benefits')
})

router.post('/project/research-activities/iqa0064', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0064']) {
    addError(errors, 'iqa0064', questions['iqa0064'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa0064', errors)

  if (data['iqa0064'] === 'no') clear(data, ['iqa0075'])

  if (hasTreatment(data)) return res.redirect('/project/research-activities/iqa0065')

  clear(data, ['iqa0065', 'iqa0066'])
  return res.redirect('/project/research-activities/questionnaire-type-or-benefits')
})

router.post('/project/research-activities/iqa0065', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0065']) {
    addError(errors, 'iqa0065', questions['iqa0065'].errorMessages.required)
  }

  // Validate revealed field if 'no' selected
  if (data['iqa0065'] === 'no' && (!data['iqa0066'] || !data['iqa0066'].trim())) {
    addError(errors, 'iqa0066', questions['iqa0066'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0066'])
    return renderWithErrors(res, 'project/research-activities/iqa0065', errors)
  }

  if (data['iqa0065'] === 'yes') clear(data, ['iqa0066'])

  return res.redirect('/project/research-activities/questionnaire-type-or-benefits')
})

// Internal redirect — routes to questionnaire-type if applicable, else society-benefits
router.get('/project/research-activities/questionnaire-type-or-benefits', function (req, res) {
  const data = req.session.data

  if (hasNonClinicalInterviews(data)) {
    return res.redirect('/project/research-activities/iqa03273')
  }

  clear(data, ['iqa03273', 'iqa0068', 'iqa0070', 'iqa0071', 'iqa0076'])
  return res.redirect('/project/research-activities/iqa0072')
})

router.post('/project/research-activities/iqa03273', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa03273']).length === 0) {
    addError(errors, 'iqa03273', questions['iqa03273'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa03273', errors)

  return res.redirect('/project/research-activities/iqa0068')
})

router.post('/project/research-activities/iqa0068', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0068']) {
    addError(errors, 'iqa0068', questions['iqa0068'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa0068', errors)

  if (data['iqa0068'] === 'no') clear(data, ['iqa0076'])

  return res.redirect('/project/research-activities/iqa0070')
})

router.post('/project/research-activities/iqa0070', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0070']) {
    addError(errors, 'iqa0070', questions['iqa0070'].errorMessages.required)
  }

  // Validate revealed field if 'yes' selected
  if (data['iqa0070'] === 'yes' && (!data['iqa0071'] || !data['iqa0071'].trim())) {
    addError(errors, 'iqa0071', questions['iqa0071'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0071'])
    return renderWithErrors(res, 'project/research-activities/iqa0070', errors)
  }

  if (data['iqa0070'] === 'no') clear(data, ['iqa0071'])

  return res.redirect('/project/research-activities/iqa0072')
})

router.post('/project/research-activities/iqa0072', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0072'] || !data['iqa0072'].trim()) {
    addError(errors, 'iqa0072', questions['iqa0072'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa0072', errors)

  if (hasClinicalOrTreatment(data)) return res.redirect('/project/research-activities/iqa0074')

  clear(data, ['iqa0074'])
  return res.redirect('/project/research-activities/risks-next')
})

router.post('/project/research-activities/iqa0074', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0074'] || !data['iqa0074'].trim()) {
    addError(errors, 'iqa0074', questions['iqa0074'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa0074', errors)

  return res.redirect('/project/research-activities/risks-next')
})

// Internal redirect — routes to applicable risk pages
router.get('/project/research-activities/risks-next', function (req, res) {
  const data = req.session.data

  if (data['iqa0064'] === 'yes') {
    return res.redirect('/project/research-activities/iqa0075')
  }

  if (data['iqa0068'] === 'yes') {
    return res.redirect('/project/research-activities/iqa0076')
  }

  return res.redirect('/project/research-activities/treatment-next')
})

router.post('/project/research-activities/iqa0075', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0075'] || !data['iqa0075'].trim()) {
    addError(errors, 'iqa0075', questions['iqa0075'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa0075', errors)

  if (data['iqa0068'] === 'yes') {
    return res.redirect('/project/research-activities/iqa0076')
  }

  return res.redirect('/project/research-activities/treatment-next')
})

router.post('/project/research-activities/iqa0076', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0076'] || !data['iqa0076'].trim()) {
    addError(errors, 'iqa0076', questions['iqa0076'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa0076', errors)

  return res.redirect('/project/research-activities/treatment-next')
})

// Internal redirect — routes to treatment-specific pages if applicable
router.get('/project/research-activities/treatment-next', function (req, res) {
  const data = req.session.data

  if (hasTreatment(data)) return res.redirect('/project/research-activities/iqa0077')

  clear(data, ['iqa0077', 'iqa0078', 'iqa0079', 'iqa0080', 'iqa0081'])
  return res.redirect('/project/research-activities/iqa0082')
})

router.post('/project/research-activities/iqa0077', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0077']) {
    addError(errors, 'iqa0077', questions['iqa0077'].errorMessages.required)
  }

  // Validate revealed field if 'yes' selected
  if (data['iqa0077'] === 'yes' && (!data['iqa0078'] || !data['iqa0078'].trim())) {
    addError(errors, 'iqa0078', questions['iqa0078'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0078'])
    return renderWithErrors(res, 'project/research-activities/iqa0077', errors)
  }

  if (data['iqa0077'] === 'no') clear(data, ['iqa0078'])

  return res.redirect('/project/research-activities/iqa0079')
})

router.post('/project/research-activities/iqa0079', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0079']) {
    addError(errors, 'iqa0079', questions['iqa0079'].errorMessages.required)
  }

  // Validate the relevant revealed field based on selection
  // OPT0132 = treatment continues, OPT0133 = treatment does not continue
  if (data['iqa0079'] === 'OPT0132' && (!data['iqa0080'] || !data['iqa0080'].trim())) {
    addError(errors, 'iqa0080', questions['iqa0080'].errorMessages.required)
  }

  if (data['iqa0079'] === 'OPT0133' && (!data['iqa0081'] || !data['iqa0081'].trim())) {
    addError(errors, 'iqa0081', questions['iqa0081'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0080', 'iqa0081'])
    return renderWithErrors(res, 'project/research-activities/iqa0079', errors)
  }

  if (data['iqa0079'] === 'OPT0132') clear(data, ['iqa0081'])
  if (data['iqa0079'] === 'OPT0133') clear(data, ['iqa0080'])

  return res.redirect('/project/research-activities/iqa0082')
})

router.post('/project/research-activities/iqa0082', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  const day   = data['iqa0082-day']
  const month = data['iqa0082-month']
  const year  = data['iqa0082-year']

  if (!day || !month || !year) {
    addError(errors, 'iqa0082', questions['iqa0082'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/iqa0082', errors)

  return res.redirect('/project/research-activities/check-research-activities')
})

module.exports = router
