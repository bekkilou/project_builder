const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

// OPT0242 = quantitative
function isQuantitative (data) {
  return data['iqa0124'] === 'OPT0242'
}

// OPT0249 = no review necessary
function needsStatReview (data) {
  return !asArray(data['iqa0126']).includes('OPT0249') &&
    asArray(data['iqa0126']).length > 0
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/research-analysis/iqa0121               Quality assessed (always)
//    — iqa0122 revealed inline via revealOn when OPT0033 selected
//  /project/research-analysis/iqa0123               Review process (always)
//  /project/research-analysis/iqa0124               Primary analysis (always)
//    → quantitative: /iqa0125 → /iqa0126
//    → qualitative:  /iqa0125 → /iqa0132
//  /project/research-analysis/iqa0125               Method analysis (always)
//  /project/research-analysis/iqa0126               Statistical aspects (if quantitative)
//    → if not OPT0249: /iqa0127
//    → else:           /iqa0128
//  /project/research-analysis/iqa0127               Who reviewed stats
//  /project/research-analysis/iqa0128               Outcome measures (if quantitative)
//  /project/research-analysis/iqa0130               Record numbers (if quantitative)
//  /project/research-analysis/iqa0131               Sample size (if quantitative)
//  /project/research-analysis/iqa0132               Stop early criteria (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/research-analysis/iqa0121', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0121']).length === 0) {
    addError(errors, 'iqa0121', questions['iqa0121'].errorMessages.required)
  }

  // Validate revealed field if OPT0033 (other) selected
  if (asArray(data['iqa0121']).includes('OPT0033') &&
    (!data['iqa0122'] || !data['iqa0122'].trim())) {
    addError(errors, 'iqa0122', questions['iqa0122'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0122'])
    return renderWithErrors(res, 'project/research-analysis/iqa0121', errors)
  }

  if (!asArray(data['iqa0121']).includes('OPT0033')) clear(data, ['iqa0122'])

  return res.redirect('/project/research-analysis/iqa0123')
})

router.post('/project/research-analysis/iqa0123', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0123'] || !data['iqa0123'].trim()) {
    addError(errors, 'iqa0123', questions['iqa0123'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/iqa0123', errors)

  return res.redirect('/project/research-analysis/iqa0124')
})

router.post('/project/research-analysis/iqa0124', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0124']) {
    addError(errors, 'iqa0124', questions['iqa0124'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/iqa0124', errors)

  // Clear quantitative-specific answers if switching to qualitative
  if (!isQuantitative(data)) {
    clear(data, ['iqa0126', 'iqa0127', 'iqa0128', 'iqa0130', 'iqa0131'])
  }

  return res.redirect('/project/research-analysis/iqa0125')
})

router.post('/project/research-analysis/iqa0125', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0125'] || !data['iqa0125'].trim()) {
    addError(errors, 'iqa0125', questions['iqa0125'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/iqa0125', errors)

  if (isQuantitative(data)) return res.redirect('/project/research-analysis/iqa0126')

  return res.redirect('/project/research-analysis/iqa0132')
})

router.post('/project/research-analysis/iqa0126', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0126']).length === 0) {
    addError(errors, 'iqa0126', questions['iqa0126'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/iqa0126', errors)

  if (needsStatReview(data)) {
    return res.redirect('/project/research-analysis/iqa0127')
  }

  clear(data, ['iqa0127'])
  return res.redirect('/project/research-analysis/iqa0128')
})

router.post('/project/research-analysis/iqa0127', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0127'] || !data['iqa0127'].trim()) {
    addError(errors, 'iqa0127', questions['iqa0127'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/iqa0127', errors)

  return res.redirect('/project/research-analysis/iqa0128')
})

router.post('/project/research-analysis/iqa0128', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0128'] || !data['iqa0128'].trim()) {
    addError(errors, 'iqa0128', questions['iqa0128'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/iqa0128', errors)

  return res.redirect('/project/research-analysis/iqa0130')
})

router.post('/project/research-analysis/iqa0130', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0130'] || !data['iqa0130'].trim()) {
    addError(errors, 'iqa0130', questions['iqa0130'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/iqa0130', errors)

  return res.redirect('/project/research-analysis/iqa0131')
})

router.post('/project/research-analysis/iqa0131', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0131'] || !data['iqa0131'].trim()) {
    addError(errors, 'iqa0131', questions['iqa0131'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/iqa0131', errors)

  return res.redirect('/project/research-analysis/iqa0132')
})

router.post('/project/research-analysis/iqa0132', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0132'] || !data['iqa0132'].trim()) {
    addError(errors, 'iqa0132', questions['iqa0132'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/iqa0132', errors)

  return res.redirect('/project/research-analysis/check-research-analysis')
})

module.exports = router
